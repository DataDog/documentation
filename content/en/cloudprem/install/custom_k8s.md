---
title: Install CloudPrem on Kubernetes with PostgreSQL and MinIO
description: Learn how to install and configure CloudPrem on any Kubernetes cluster using PostgreSQL and MinIO for object storage
further_reading:
- link: "/cloudprem/configure/ingress/"
  tag: "Documentation"
  text: "Configure CloudPrem Ingress"
- link: "/cloudprem/ingest/"
  tag: "Documentation"
  text: "Configure Log Ingestion"
- link: "/cloudprem/operate/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting CloudPrem"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

This documentation walks you through the process of installing CloudPrem on any Kubernetes cluster using PostgreSQL for metadata storage and MinIO for S3-compatible object storage.

This setup is ideal for environments where you manage your own infrastructure or don't use a major cloud provider's managed services.

## Prerequisites

Before you begin, confirm you have:

- **kubectl** installed and configured to access your Kubernetes cluster
  ```shell
  kubectl version --client
  ```

- **Helm 3.x** installed
  ```shell
  helm version
  ```

- A **Kubernetes cluster** (v1.25 or higher) up and running
  ```shell
  kubectl get nodes
  ```

- A **Datadog account** with the CloudPrem feature enabled

- A **[Datadog API key][1]**

- A **PostgreSQL database** (v13 or higher) accessible from your Kubernetes cluster. Note the following connection details:
  - Host
  - Port (default: `5432`)
  - Database name
  - Username
  - Password

- A **MinIO instance** accessible from your Kubernetes cluster, with:
  - A bucket created for CloudPrem data (for example, `cloudprem`)
  - An access key and secret key with read/write permissions on the bucket
  - The MinIO endpoint URL (for example, `http://minio.minio.svc.cluster.local:9000`)

### Verify connectivity

Before proceeding, confirm that your Kubernetes cluster can reach both PostgreSQL and MinIO.

**PostgreSQL**:
```shell
kubectl run psql-client \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- psql "host=<HOST> port=<PORT> dbname=<DATABASE> user=<USERNAME> password=<PASSWORD>"
```

If successful, you should see a `psql` prompt.

**MinIO**:
```shell
kubectl run minio-client \
  --rm -it \
  --image=minio/mc:latest \
  --command -- bash -c "mc alias set myminio <MINIO_ENDPOINT> <ACCESS_KEY> <SECRET_KEY> && mc ls myminio/<BUCKET_NAME>"
```

If successful, the command lists the contents of your MinIO bucket.

## Installation steps

1. [Install the CloudPrem Helm chart](#install-the-cloudprem-helm-chart)
2. [Verify installation](#verification)

## Install the CloudPrem Helm chart

1. Add and update the Datadog Helm repository:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. Create a Kubernetes namespace for the chart:
   ```shell
   kubectl create namespace <NAMESPACE_NAME>
   ```

   For example, to create a `cloudprem` namespace:
   ```shell
   kubectl create namespace cloudprem
   ```

   **Note**: You can set a default namespace for your current context to avoid having to type `-n <NAMESPACE_NAME>` with every command:
   ```shell
   kubectl config set-context --current --namespace=cloudprem
   ```

1. Store your Datadog API key as a Kubernetes secret:

   ```shell
   kubectl create secret generic datadog-secret \
   -n <NAMESPACE_NAME> \
   --from-literal api-key="<DD_API_KEY>"
   ```

1. Store the PostgreSQL database connection string as a Kubernetes secret:

   <div class="alert alert-danger">If your password contains special characters, URL-encode them first. For example: <code>/</code> → <code>%2F</code>, <code>+</code> → <code>%2B</code>, <code>=</code> → <code>%3D</code>.</div>

   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
   -n <NAMESPACE_NAME> \
   --from-literal QW_METASTORE_URI="postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>"
   ```

1. Store the MinIO credentials as a Kubernetes secret:

   ```shell
   kubectl create secret generic cloudprem-minio-credentials \
   -n <NAMESPACE_NAME> \
   --from-literal AWS_ACCESS_KEY_ID="<MINIO_ACCESS_KEY>" \
   --from-literal AWS_SECRET_ACCESS_KEY="<MINIO_SECRET_KEY>"
   ```

1. Customize the Helm chart:

   Create a `datadog-values.yaml` file to override the default values with your custom configuration. This is where you define environment-specific settings such as the service account, ingress setup, resource requests and limits, and more.

   Any parameters not explicitly overridden in `datadog-values.yaml` fall back to the defaults defined in the chart's `values.yaml`.

   ```shell
   # Show default values
   helm show values datadog/cloudprem
   ```

   The following is an example `datadog-values.yaml` file with overrides for a vanilla Kubernetes setup with MinIO:

   {{< code-block lang="yaml" filename="datadog-values.yaml">}}
# Datadog configuration
datadog:
  # The Datadog site (https://docs.datadoghq.com/getting_started/site/) to connect to. Defaults to `datadoghq.com`.
  # site: datadoghq.com
  # The name of the existing Secret containing the Datadog API key. The secret key name must be `api-key`.
  apiKeyExistingSecret: datadog-secret

# Environment variables
# The MinIO credentials are mounted from the Kubernetes secret.
# Any environment variables defined here are available to all pods in the deployment.
environment:
  AWS_REGION: us-east-1

# Service account configuration
serviceAccount:
  create: true
  name: cloudprem

# CloudPrem node configuration
config:
  # The root URI where index data is stored. This should be an S3-compatible path pointing to your MinIO bucket.
  # All indexes created in CloudPrem are stored under this location.
  default_index_root_uri: s3://<BUCKET_NAME>/indexes
  storage:
    s3:
      endpoint: <MINIO_ENDPOINT>
      # force_path_style_access must be true for MinIO.
      force_path_style_access: true

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
    - secretRef:
        name: cloudprem-minio-credentials

# Indexer configuration
# The indexer is responsible for processing and indexing incoming data it receives data from various sources
# (for example, Datadog Agents, log collectors) and transforms it into searchable files called "splits"
# stored in MinIO.
#
# The indexer is horizontally scalable - you can increase `replicaCount` to handle higher indexing throughput.
# Resource requests and limits should be tuned based on your indexing workload.
#
# The default values are suitable for moderate indexing loads of up to 20 MB/s per indexer pod.
indexer:
  replicaCount: 2
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

  resources:
    requests:
      cpu: "4"
      memory: "8Gi"
    limits:
      cpu: "4"
      memory: "8Gi"

# Searcher configuration
# The searcher is responsible for executing search queries against the indexed data stored in MinIO.
# It handles search requests from Datadog's query service and returns matching results.
#
# The searcher is horizontally scalable - you can increase `replicaCount` to handle more concurrent searches.
# Resource requirements for searchers are highly workload-dependent and should be determined empirically.
# Key factors that impact searcher performance include:
# - Query complexity (for example, number of terms, use of wildcards or regex)
# - Query concurrency (number of simultaneous searches)
# - Amount of data scanned per query
# - Data access patterns (cache hit rates)
#
# Memory is particularly important for searchers as they cache frequently accessed index data in memory.
searcher:
  replicaCount: 2
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

  resources:
    requests:
      cpu: "4"
      memory: "16Gi"
    limits:
      cpu: "4"
      memory: "16Gi"

# Control plane configuration
controlPlane:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

# Janitor configuration
janitor:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials
{{< /code-block >}}

   Replace the following placeholders with your actual values:
   - `<BUCKET_NAME>`: The name of your MinIO bucket (for example, `cloudprem`)
   - `<MINIO_ENDPOINT>`: The MinIO endpoint URL (for example, `http://minio.minio.svc.cluster.local:9000`)

1. Install or upgrade the Helm chart:

   ```shell
   helm upgrade --install <RELEASE_NAME> datadog/cloudprem \
   -n <NAMESPACE_NAME> \
   -f datadog-values.yaml
   ```

## Verification

### Check deployment status

Verify that all CloudPrem components are running:

```shell
kubectl get pods -n <NAMESPACE_NAME>
kubectl get ingress -n <NAMESPACE_NAME>
kubectl get services -n <NAMESPACE_NAME>
```

All pods should be in `Running` state:
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

### Check metastore connectivity

Verify the metastore can connect to PostgreSQL by checking its logs:
```shell
kubectl logs -n <NAMESPACE_NAME> -l app.kubernetes.io/component=metastore --tail=50
```

You should see log entries indicating successful cluster joining and split operations, with no connection errors.

### Check storage connectivity

Verify that indexers can write to MinIO by checking indexer logs:
```shell
kubectl logs -n <NAMESPACE_NAME> -l app.kubernetes.io/component=indexer --tail=50
```

## Uninstall

To uninstall CloudPrem:

```shell
helm uninstall <RELEASE_NAME> -n <NAMESPACE_NAME>
```

Additionally, to remove the namespace and associated secrets:

```shell
kubectl delete namespace <NAMESPACE_NAME>
```

## Next step

**[Set up log ingestion with Datadog Agent][2]** - Configure the Datadog Agent to send logs to CloudPrem

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /cloudprem/ingest/agent/
