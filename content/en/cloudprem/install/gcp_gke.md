---
title: CloudPrem on Google Kubernetes Engine (GKE)
further_reading:
- link: "/cloudprem/configure/ingress/"
  tag: "Documentation"
  text: "Configure CloudPrem Ingress"
- link: "/cloudprem/ingest/"
  tag: "Documentation"
  text: "Configure Log Ingestion"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

This installation setup walks you through deploying Datadog CloudPrem on Google Kubernetes Engine (GKE).

CloudPrem on GKE uses the following Google Cloud services:
- **Google Kubernetes Engine (GKE)**: Container orchestration platform for running CloudPrem components
- **Cloud Storage (GCS)**: Object storage for telemetry data and indexes
- **Cloud SQL for PostgreSQL**: Managed PostgreSQL database for metadata storage
- **Workload Identity**: Secure authentication between GKE workloads and Google Cloud services

## Prerequisites

Before you begin, confirm you have:

1. **Google Cloud CLI** installed and configured
   ```shell
   gcloud version
   ```

2. **kubectl** installed
   ```shell
   kubectl version --client
   ```

3. **Helm 3.x** installed
   ```shell
   helm version
   ```

4. **GCP Project** with billing enabled
   ```shell
   gcloud config set project YOUR_PROJECT_ID
   ```

5. **Required IAM Permissions**:
   - `roles/container.admin` (Kubernetes Engine Admin)
   - `roles/iam.serviceAccountAdmin` (Service Account Admin)
   - `roles/compute.admin` (Compute Admin)

6. **[Create or retrieve your API key][1]**.

7. **APIs Enabled**:
   ```shell
   gcloud services enable container.googleapis.com \
     compute.googleapis.com \
     sqladmin.googleapis.com \
     storage.googleapis.com
   ```

## Installation steps

### Step 1: Set environment variables

Set the following environment variables to simplify subsequent commands and reduce copy-paste errors.

```shell
export PROJECT_ID="your-gcp-project-id"
export REGION="us-central1"
export CLUSTER_NAME="cloudprem-cluster"
export DATADOG_SITE="datadoghq.com"  # or datadoghq.eu, us3.datadoghq.com, us5.datadoghq.com
export BUCKET_NAME="${PROJECT_ID}-cloudprem"
```

### Step 2: Create GKE cluster

Create a GKE cluster with Workload Identity enabled:

```shell
gcloud container clusters create ${CLUSTER_NAME} \
  --region ${REGION} \
  --num-nodes 1 \
  --workload-pool=${PROJECT_ID}.svc.id.goog \
  --machine-type n1-standard-4
```

{{% collapse-content title="Cluster sizing recommendations" level="h4" %}}
- **Small (Dev/Test)**: 3 nodes, n1-standard-4 (~100GB/day)
- **Medium (Production)**: 5 nodes, n1-standard-8 (~500GB/day)
- **Large (Enterprise)**: 7+ nodes, n1-standard-16 (~1TB+/day)
{{% /collapse-content %}}

Get cluster credentials:
```shell
gcloud container clusters get-credentials ${CLUSTER_NAME} --region ${REGION}
```

Install GKE auth plugin:
```shell
gcloud components install gke-gcloud-auth-plugin
export USE_GKE_GCLOUD_AUTH_PLUGIN=True
```

Verify cluster access:
```shell
kubectl cluster-info
kubectl get nodes
```

### Step 3: Create Cloud Storage bucket

Create a GCS bucket for CloudPrem data storage:

```shell
export BUCKET_NAME="cloudprem-data-${PROJECT_ID}"

gcloud storage buckets create gs://${BUCKET_NAME} \
  --project=${PROJECT_ID} \
  --location=${REGION} \
  --uniform-bucket-level-access
```

### Step 4: Create Cloud SQL PostgreSQL instance

Create a Cloud SQL PostgreSQL instance for metadata storage:

```shell
# Generate a secure password
export DB_PASSWORD=$(openssl rand -base64 32)
echo "Database password: ${DB_PASSWORD}"
# Save this password securely - you'll need it later

# Create Cloud SQL instance
gcloud sql instances create cloudprem-postgres \
  --database-version=POSTGRES_15 \
  --region=${REGION} \
  --root-password="${DB_PASSWORD}"
```

This can take a few minutes. Wait for the instance to be ready:

```shell
gcloud sql instances describe cloudprem-postgres \
  --format="value(state)"
# Should output: RUNNABLE
```

Create the CloudPrem database:
```shell
gcloud sql databases create cloudprem \
  --instance=cloudprem-postgres
```

Get the connection details:
```shell
export DB_CONNECTION_NAME=$(gcloud sql instances describe cloudprem-postgres \
  --format="value(connectionName)")
export DB_PUBLIC_IP=$(gcloud sql instances describe cloudprem-postgres \
  --format="value(ipAddresses[0].ipAddress)")

echo "Connection Name: ${DB_CONNECTION_NAME}"
echo "Public IP: ${DB_PUBLIC_IP}"
```

Authorize GKE nodes to connect to Cloud SQL:
```shell
# Get GKE node external IPs
export NODE_IPS=$(kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}' | tr ' ' ',')

# Authorize the IPs
gcloud sql instances patch cloudprem-postgres \
  --authorized-networks=${NODE_IPS} \
  --quiet
```

### Step 5: Configure IAM and Workload Identity

Create a GCP service account for CloudPrem:

```shell
export SERVICE_ACCOUNT_NAME="cloudprem-sa"

gcloud iam service-accounts create ${SERVICE_ACCOUNT_NAME} \
  --display-name="CloudPrem Service Account" \
  --project=${PROJECT_ID}
```

Grant necessary IAM roles:

```shell
# Cloud SQL Client role
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"

# Storage Object Admin role for GCS bucket
gsutil iam ch \
  serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com:objectAdmin \
  gs://${BUCKET_NAME}
```

Create Kubernetes namespace and service account:

```shell
kubectl create namespace datadog-cloudprem

kubectl create serviceaccount cloudprem-ksa \
  --namespace datadog-cloudprem

kubectl annotate serviceaccount cloudprem-ksa \
  --namespace datadog-cloudprem \
  iam.gke.io/gcp-service-account=${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
```

Bind GCP service account to Kubernetes service account:

```shell
gcloud iam service-accounts add-iam-policy-binding \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
  --role=roles/iam.workloadIdentityUser \
  --member="serviceAccount:${PROJECT_ID}.svc.id.goog[datadog-cloudprem/cloudprem-ksa]"
```

### Step 6: Create Kubernetes secrets

Create secret for Datadog API key:

```shell
kubectl create secret generic datadog-secret \
  --from-literal=api-key=${DD_API_KEY} \
  --namespace=datadog-cloudprem
```

Create secret for PostgreSQL connection:

<div class="alert alert-danger">The password must be URL-encoded. For example: <code>/</code> → <code>%2F</code>, <code>+</code> → <code>%2B</code>, <code>=</code> → <code>%3D</code>.</div>

```shell
# URL-encode the password first
# Example: if password is "abc/def+ghi=" it becomes "abc%2Fdef%2Bghi%3D"

kubectl create secret generic cloudprem-metastore-config \
  --from-literal=QW_METASTORE_URI="postgresql://postgres:${DB_PASSWORD}@${DB_PUBLIC_IP}:5432/cloudprem" \
  --namespace=datadog-cloudprem
```

### Step 7: Install CloudPrem with Helm

Add the Datadog Helm repository:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

Create a `values.yaml` file:

Set your [Datadog site][2] to {{< region-param key="dd_site" code="true" >}}.

```yaml
# Datadog configuration
datadog:
   # The Datadog site to connect to. Defaults to `datadoghq.com`.
   # site: datadoghq.com
   # The name of the existing Secret containing the Datadog API key. The secret key name must be `api-key`.
   apiKeyExistingSecret: datadog-secret

# Service Account with Workload Identity
serviceAccount:
  create: false
  name: cloudprem-ksa
  extraAnnotations:
    iam.gke.io/gcp-service-account: cloudprem-sa@${YOUR_PROJECT_ID}.iam.gserviceaccount.com

# CloudPrem node configuration
config:
  # The root URI where index data is stored. This should be an gs path.
  # All indexes created in CloudPrem are stored under this location.
  default_index_root_uri: gs://${BUCKET_NAME}/indexes

# Internal ingress configuration for access within the VPC
# Helm chart does not support yet GKE ingress
#
# Additional annotations can be added to customize the ALB behavior.
ingress:
  internal:
    enabled: false

# Metastore configuration
# The metastore is responsible for storing and managing index metadata.
# It requires a PostgreSQL database connection string to be provided by a Kubernetes secret.
# The secret should contain a key named `QW_METASTORE_URI` with a value in the format:
# postgresql://<username>:<password>@<host>:<port>/<database>
#
# The metastore connection string is mounted into the pods using extraEnvFrom to reference the secret.
metastore:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-metastore-uri

# Indexer configuration
# The indexer is responsible for processing and indexing incoming data it receives data from various sources (for example, Datadog Agents, log collectors)
# and transforms it into searchable files called "splits" stored in S3.
#
# The indexer is horizontally scalable - you can increase `replicaCount` to handle higher indexing throughput. Resource requests and limits should be tuned based on your indexing workload.
#
# The `podSize` parameter sets vCPU, memory, and component-specific settings automatically. The default values are suitable for moderate indexing loads of up to 20 MB/s per indexer pod.
# See the sizing guide for available tiers and their configurations.
indexer:
  replicaCount: 2
  podSize: xlarge

# Searcher configuration
# The `podSize` parameter sets vCPU, memory, and component-specific settings automatically.
# Choose a tier based on your query complexity, concurrency, and data access patterns.
searcher:
  replicaCount: 2
  podSize: xlarge
```

Install CloudPrem:

```shell
helm install cloudprem datadog/cloudprem \
  --namespace datadog-cloudprem \
  --values values.yaml
```

### Step 8: Add internal GCE ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: cloudprem-internal
  namespace: datadog-cloudprem
  annotations:
    kubernetes.io/ingress.class: "gce-internal"
spec:
  rules:
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: cloudprem-indexer
            port:
              number: 7280
```

```shell
kubectl apply -f ingress-values.yaml
```

### Step 9: Install Datadog Agent (Recommended)

Install the Datadog Agent to collect metrics from CloudPrem components and send them to Datadog.

Create a separate namespace for the Datadog Agent:

```shell
kubectl create namespace datadog

# Copy the API key secret to the datadog namespace
kubectl get secret datadog-secret -n datadog-cloudprem -o yaml | \
  sed 's/namespace: datadog-cloudprem/namespace: datadog-agent/' | \
  kubectl apply -f -
```

Install Datadog operator:

```yaml
# Datadog Agent Helm Values for GKE Autopilot
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    env:
      - name: DD_LOGS_CONFIG_LOGS_DD_URL
        value: http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
      - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
        value: "1000000h"

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

    dogstatsd:
        port: 8125
        useHostPort: false  # Must be false in Autopilot
        nonLocalTraffic: true

```

Install the Datadog Agent:

```shell
kubectl apply -f datadog-operator-values.yaml
```

Verify the Datadog Agent is running:

```shell
kubectl get pods -n datadog
```

Update CloudPrem to send metrics to the Datadog Agent's DogStatsD service. Add this to your `values.yaml`:

```yaml
# DogStatsD configuration - send metrics to Datadog Agent
dogstatsdServer:
  host:
    value: "datadog-agent.datadog.svc.cluster.local"
  port: 8125
```

Upgrade CloudPrem with the new configuration:

```shell
helm upgrade cloudprem datadog/cloudprem \
  --namespace datadog-cloudprem \
  --values values.yaml \
  --timeout 10m
```

Verify the DogStatsD configuration:

```shell
kubectl get pod -n datadog-cloudprem -l app.kubernetes.io/component=metastore -o jsonpath='{.items[0].spec.containers[0].env[?(@.name=="CP_DOGSTATSD_SERVER_HOST")].value}'
# Should output: datadog-agent.datadog.svc.cluster.local
```

### Step 10: Verify deployment

Check pod status:
```shell
kubectl get pods -n datadog-cloudprem
```

All pods should be in `Running` state with `READY` status:
```
NAME                                   READY   STATUS    RESTARTS   AGE
cloudprem-control-plane-xxx            1/1     Running   0          5m
cloudprem-indexer-0                    1/1     Running   0          5m
cloudprem-indexer-1                    1/1     Running   0          5m
cloudprem-janitor-xxx                  1/1     Running   0          5m
cloudprem-metastore-xxx                1/1     Running   0          5m
cloudprem-metastore-yyy                1/1     Running   0          5m
cloudprem-searcher-0                   1/1     Running   0          5m
cloudprem-searcher-1                   1/1     Running   0          5m
```

Check metastore logs for successful database connection:
```shell
kubectl logs -n datadog-cloudprem -l app.kubernetes.io/component=metastore --tail=50
```

## Uninstall

To completely remove CloudPrem:

```shell
# Uninstall Helm release
helm uninstall cloudprem --namespace datadog-cloudprem

# Delete namespace
kubectl delete namespace datadog-cloudprem

# Delete Cloud SQL instance
gcloud sql instances delete cloudprem-postgres --quiet

# Delete GCS bucket
gsutil -m rm -r gs://${BUCKET_NAME}

# Delete GCP service account
gcloud iam service-accounts delete \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
  --quiet

# Delete GKE cluster
gcloud container clusters delete ${CLUSTER_NAME} \
  --region ${REGION} \
  --quiet
```

## Best practices

- **Use Workload Identity** instead of service account keys for better security.
- **Enable Cloud SQL backups** for disaster recovery.
- **Use regional GKE clusters** for high availability.
- **Monitor disk usage** on indexer nodes and enable auto-scaling.
- **Set up alerts** in Datadog for CloudPrem component health.
- **Use private GKE clusters** for enhanced security in production.
- **Regularly update** CloudPrem to the latest version for bug fixes and features.
- **Test scaling** in a staging environment before production changes.
- **Store the database password** in Secret Manager and use External Secrets Operator (ESO) or the Secrets Store CSI Driver to provide the password to metastore pods.

## Next steps

- Configure your applications to send telemetry to CloudPrem
- Set up dashboards in Datadog to monitor CloudPrem performance
- Review CloudPrem logs and metrics in your Datadog account
- Plan capacity based on your data volume

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/