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

6. **Datadog API and APP Keys**:
   - API Key: https://app.datadoghq.com/organization-settings/api-keys
   - APP Key: https://app.datadoghq.com/organization-settings/application-keys

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

```
export PROJECT_ID="your-gcp-project-id"
export REGION="us-central1"
export CLUSTER_NAME="cloudprem-cluster"
export DATADOG_SITE="{{< region-param key=dd_site >}}"  # your selected Datadog site
```
### Step 2: Create GKE cluster

Create a GKE cluster with Workload Identity enabled:

```shell
gcloud container clusters create ${CLUSTER_NAME} \
  --region ${REGION} \
  --node-locations ${REGION}-a,${REGION}-b,${REGION}-c \
  --num-nodes 1 \
  --machine-type n1-standard-4 \
  --disk-type pd-ssd \
  --disk-size 100 \
  --enable-autorepair \
  --enable-autoupgrade \
  --enable-ip-alias \
  --workload-pool=${PROJECT_ID}.svc.id.goog \
  --addons HorizontalPodAutoscaling,HttpLoadBalancing,GcePersistentDiskCsiDriver \
  --release-channel stable
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

gsutil mb -p ${PROJECT_ID} \
  -c STANDARD \
  -l ${REGION} \
  gs://${BUCKET_NAME}
```

Verify bucket creation:
```shell
gsutil ls -L gs://${BUCKET_NAME}
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
  --tier=db-custom-2-7680 \
  --region=${REGION} \
  --root-password="${DB_PASSWORD}" \
  --storage-type=SSD \
  --storage-size=10GB \
  --storage-auto-increase \
  --backup
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

Create secret for Datadog API keys:

```shell
kubectl create secret generic datadog-secret \
  --from-literal=api-key='YOUR_DATADOG_API_KEY' \
  --from-literal=app-key='YOUR_DATADOG_APP_KEY' \
  --namespace=datadog-cloudprem
```

Create secret for PostgreSQL connection:

<div class="alert alert-danger">The password must be URL-encoded. For example: <code>/</code> → <code>%2F</code>, <code>+</code> → <code>%2B</code>, <code>=</code> → <code>%3D</code>.</div>

```shell
# URL-encode the password first
# Example: if password is "abc/def+ghi=" it becomes "abc%2Fdef%2Bghi%3D"

kubectl create secret generic cloudprem-metastore-config \
  --from-literal=QW_METASTORE_URI="postgresql://postgres:URL_ENCODED_PASSWORD@${DB_PUBLIC_IP}:5432/cloudprem" \
  --namespace=datadog-cloudprem
```

### Step 7: Install CloudPrem with Helm

Add the Datadog Helm repository:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

Create a `values.yaml` file:

```yaml
# values.yaml
datadog:
  site: datadoghq.com  # Change to your Datadog site
  apiKeyExistingSecret: datadog-secret

# Service Account with Workload Identity
serviceAccount:
  create: false
  name: cloudprem-ksa
  extraAnnotations:
    iam.gke.io/gcp-service-account: cloudprem-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com

# Metastore configuration
metastore:
  replicaCount: 2
  extraEnvFrom:
    - secretRef:
        name: cloudprem-metastore-config
  resources:
    limits:
      cpu: 2
      memory: 4Gi
    requests:
      cpu: 1
      memory: 2Gi

# Searcher configuration
searcher:
  enabled: true
  replicaCount: 2
  resources:
    limits:
      cpu: 2
      memory: 8Gi
    requests:
      cpu: 1
      memory: 4Gi

# Indexer configuration
indexer:
  replicaCount: 2
  resources:
    limits:
      cpu: 2
      memory: 8Gi
    requests:
      cpu: 1
      memory: 4Gi

# Quickwit configuration
quickwit:
  version: 0.8
  listen_address: 0.0.0.0

  # Storage configuration for GCS
  storage:
    gcs:
      bucket: YOUR_BUCKET_NAME

  cloudprem:
    index:
      retention: 30d
      minShards: 12
    reverseConnection:
      enabled: true
```

Install CloudPrem:

```shell
helm install cloudprem datadog/cloudprem \
  --namespace datadog-cloudprem \
  --values values.yaml \
  --timeout 10m \
  --wait
```

### Step 8: Install Datadog Agent (Recommended)

Install the Datadog Agent to collect metrics from CloudPrem components and send them to Datadog.

Create a separate namespace for the Datadog Agent:

```shell
kubectl create namespace datadog

# Copy the API key secret to the datadog namespace
kubectl get secret datadog-secret -n datadog-cloudprem -o yaml | \
  sed 's/namespace: datadog-cloudprem/namespace: datadog/' | \
  kubectl apply -f -
```

Create a values file for the Datadog Agent (`datadog-agent-values.yaml`):

```yaml
# Datadog Agent Helm Values for GKE Autopilot
datadog:
  site: datadoghq.com  # Change to your Datadog site
  apiKeyExistingSecret: datadog-secret
  clusterName: cloudprem-cluster

  # Autopilot-compatible settings
  criSocketPath: /var/run/containerd/containerd.sock

  logs:
    enabled: true
    containerCollectAll: false
    containerCollectUsingFiles: false

  apm:
    portEnabled: true
    port: 8126
    socketEnabled: false

  # DogStatsD configuration
  dogstatsd:
    port: 8125
    useHostPort: false  # Must be false in Autopilot
    nonLocalTraffic: true
    originDetection: false
    tagCardinality: low

  networkMonitoring:
    enabled: false

# Cluster Agent
clusterAgent:
  enabled: true
  replicas: 2
  resources:
    requests:
      cpu: 200m
      memory: 256Mi
    limits:
      cpu: 500m
      memory: 512Mi

# Node Agents
agents:
  enabled: true
  useHostNetwork: false

  containers:
    agent:
      env:
        - name: DD_SYSTEM_PROBE_ENABLED
          value: "false"
        - name: DD_PROCESS_AGENT_ENABLED
          value: "false"
        - name: DD_APM_ENABLED
          value: "true"
        - name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC
          value: "true"

  resources:
    requests:
      cpu: 200m
      memory: 256Mi
    limits:
      cpu: 500m
      memory: 512Mi

  volumes: []
  volumeMounts: []

# GKE Autopilot settings
providers:
  gke:
    autopilot: true

systemProbe:
  enabled: false

# Cluster Checks Runner
clusterChecksRunner:
  enabled: true
  replicas: 2
  resources:
    requests:
      cpu: 100m
      memory: 128Mi
    limits:
      cpu: 200m
      memory: 256Mi
```

Install the Datadog Agent:

```shell
helm install datadog-agent datadog/datadog \
  --namespace datadog \
  --values datadog-agent-values.yaml \
  --timeout 10m \
  --wait
```

Verify the Datadog Agent is running:

```shell
kubectl get pods -n datadog
```

You should see:
- Node agents (DaemonSet) running on each node
- Cluster agents (2 replicas)
- Cluster checks runners (2 replicas)

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

### Step 9: Verify deployment

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

Check services:
```shell
kubectl get svc -n datadog-cloudprem
```

Check metastore logs for successful database connection:
```shell
kubectl logs -n datadog-cloudprem -l app.kubernetes.io/component=metastore --tail=50
```

You should see log entries indicating successful cluster joining and split operations, with no connection errors.

Verify reverse connection to Datadog:
```shell
kubectl logs -n datadog-cloudprem -l app.kubernetes.io/component=control-plane --tail=50 | grep -i "reverse connection\|datadog"
```

## Configure scaling

Scale indexers and searchers based on your data volume:

```shell
# Scale indexers
kubectl scale statefulset cloudprem-indexer \
  -n datadog-cloudprem \
  --replicas=4

# Scale searchers
kubectl scale statefulset cloudprem-searcher \
  -n datadog-cloudprem \
  --replicas=4
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
