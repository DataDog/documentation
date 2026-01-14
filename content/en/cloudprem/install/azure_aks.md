---
title: Install CloudPrem on Azure AKS
aliases:
- /cloudprem/configure/azure_config/
description: Learn how to install and configure CloudPrem on Azure AKS
---

## Overview
{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

This document walks you through the process of configuring your Azure environment and installing CloudPrem on Azure AKS.

## Prerequisites

Before you install CloudPrem on Azure, you must set up a set of supporting infrastructure resources. These components provide the foundational compute, storage, database, and networking services that CloudPrem depends on.

### Infrastructure Requirements
Here are the components you must provision:

- [**Azure Kubernetes Service (AKS)**](#azure-kubernetes-service-aks): A running AKS cluster sized for your expected CloudPrem workload.
- [**PostgreSQL Flexible Server**](#azure-postgresql-flexible-server): An Azure Database for PostgreSQL instance that CloudPrem will use to store its metadata.
- [**Blob Storage container**](#blob-storage-container): An Azure Storage container to hold CloudPrem logs.
- [**Client Identity and permissions**](#client-identity-and-permissions): An Azure AD application with read/write access to the storage container.
- [**NGINX Ingress Controller**](#nginx-ingress-controller): Installed on the AKS cluster to route external traffic to CloudPrem services.
- **Datadog Agent**: Deployed on the AKS cluster to collect and send logs to CloudPrem.

### Azure Kubernetes Service (AKS)

CloudPrem runs entirely on Kubernetes. You need an AKS cluster with sufficient CPU, memory, and disk space configured for your workload. See the Kubernetes cluster sizing recommendations for guidance.

#### Deploy the AKS cluster

- [Deploy an AKS cluster with the Azure CLI][2]
- [Deploy an AKS cluster with Terraform][3]

#### Verify cluster connectivity and health
To confirm the cluster is reachable and nodes are in the `Ready` state, run the following command:
```shell
kubectl get nodes -o wide
```

### Azure PostgreSQL Flexible Server

CloudPrem stores its metadata and configuration in a PostgreSQL database. Datadog recommends the Azure Database for PostgreSQL Flexible Server. It must be reachable from the AKS cluster, ideally with private networking enabled. See the Postgres sizing recommendations for details.

#### Create the PostgreSQL database

- [Create an Azure Database for PostgreSQL Flexible Server using the Azure CLI][4]
- [Create an Azure Database for PostgreSQL Flexible Server using Terraform][5]

#### Verify database connectivity

<div class="alert alert-info">For security, create a dedicated database and user for CloudPrem, and grant the user rights only on that database, not cluster-wide.</div>

Connect to your PostgreSQL database from within the AKS network using the PostgreSQL client, `psql`. First, start an interactive pod in your Kubernetes cluster using an image that includes `psql`:
```shell
kubectl run psql-client \
  -n <NAMESPACE_NAME> \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- bash
```

Then, run the following command directly from the shell, replacing the placeholder values with your actual values:

```shell
psql "host=<HOST> \
      port=<PORT> \
      dbname=<DATABASE> \
      user=<USERNAME> \
      password=<PASSWORD>"
```

If successful, you should see a prompt similar to:
```shell
psql (15.2)
SSL connection (protocol: TLS...)
Type "help" for help.

<DATABASE>=>
```

### Blob Storage Container

CloudPrem uses Azure Blob Storage to persist logs. Create a dedicated container for this purpose.

#### Create a Blob Storage container
Use a dedicated container per environment (for example, `cloudprem-prod`, `cloudprem-staging`), and assign least-privilege RBAC roles at the container level, rather than at the storage account scope.

- [Create an Blob Storage container using the Azure CLI][6]
- [Create a Blob Storage container using Terraform][7]

### Client Identity and permissions

An Azure AD application must be granted read/write access to the Blob Storage container. Register a dedicated application for CloudPrem and assign the corresponding service principal the `Contributor` role on the Blob Storage container created above.

#### Register the application
[Register an application in Microsoft Entra ID][8]

#### Assign Contributor role
[Assign an Azure role for access to blob data][9]

### NGINX Ingress Controller

#### Public NGINX Ingress Controller

The public ingress is essential for enabling Datadog's control plane and query service to manage and query CloudPrem clusters over the public internet. It provides secure access to the CloudPrem gRPC API through the following mechanisms:
- Creates an internet-facing Azure Load Balancer that accepts traffic from Datadog services
- Implements TLS encryption with termination at the ingress controller level
- Uses HTTP/2 (gRPC) for communication between Datadog and CloudPrem clusters
- Requires mutual TLS (mTLS) authentication where Datadog services must present valid client certificates
- Configures the controller in TLS passthrough mode to forward client certificates to CloudPrem pods with the `ssl-client-cert` header
- Rejects requests that are missing valid client certificates or the certificate header

Use the following `nginx-public.yaml` Helm values file in order to create the public NGINX Ingress Controller:

{{< code-block lang="yaml" filename="nginx-public.yaml" >}}
controller:
  electionID: public-ingress-controller-leader
  ingressClass: nginx-public
  ingressClassResource:
    name: nginx-public
    enabled: true
    default: false
    controllerValue: k8s.io/public-ingress-nginx
  service:
    type: LoadBalancer
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: /healthz
{{< /code-block >}}

Then, install the controller with Helm using the following command:

```shell
helm upgrade --install nginx-public ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-public \
  --create-namespace \
  -f nginx-public.yaml
```

Verify that the controller pod is running:
```shell
kubectl get pods -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

Verify that the service exposes an external IP:
```shell
kubectl get svc -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

#### Internal NGINX Ingress Controller

The internal ingress enables log ingestion from Datadog Agents and other log collectors within your environment through HTTP. Use the following `nginx-internal.yaml` Helm values file in order to create the public NGINX Ingress Controller:

{{< code-block lang="yaml" filename="nginx-internal.yaml" >}}
controller:
  electionID: internal-ingress-controller-leader
  ingressClass: nginx-internal
  ingressClassResource:
    name: nginx-internal
    enabled: true
    default: false
    controllerValue: k8s.io/internal-ingress-nginx
  service:
    type: LoadBalancer
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-internal: true
      service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: /healthz
{{< /code-block >}}

Then, install the controller with Helm using the following command:

```shell
helm upgrade --install nginx-internal ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-internal \
  --create-namespace \
  -f nginx-internal.yaml
```

Verify that the controller pod is running:
```shell
kubectl get pods -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

Verify that the service exposes an external IP:
```shell
kubectl get svc -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

### DNS

Optionally, you can add a DNS entry pointing to the IP of the public load balancer, so future IP changes won't require updating the configuration on the Datadog side.

## Installation steps

1. [Install the CloudPrem Helm chart](#install-the-cloudprem-helm-chart)
2. [Verify installation](#verification)
3. [Configure your Datadog account](#configure-your-datadog-account)

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
   To retrieve your PostgreSQL connection details, go the Azure Portal, navigate to **All resources**, then click on your _Azure Database for PostgreSQL flexible server_ instance. Finally, in the **Getting started** tab, click on the _View connection strings_ link in the **Connect card**.

   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
     -n <NAMESPACE_NAME> \
     --from-literal QW_METASTORE_URI=postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
   ```

   For example, to store a `metastore-uri` secret in the `cloudprem` namespace:
   ```shell
   USERNAME=cloudprem-prod
   PASSWORD=1234567890
   HOST=cloudprem-prod.postgres.database.azure.com
   PORT=5432
   DATABASE=cloudprem_prod
   kubectl create secret generic metastore-uri \
     -n cloudprem \
     --from-literal QW_METASTORE_URI="postgres://$USERNAME:$PASSWORD@$HOST:$PORT/$DATABASE"
   ```

1. Store the client secret or storage account access key as a Kubernetes secret:
   ```shell
   kubectl create secret generic <SECRET_NAME> \
     -n <NAMESPACE_NAME> \
     --from-literal <SECRET_KEY>=<SECRET_VALUE>
   ```

1. Customize the Helm chart:

   Create a `datadog-values.yaml` file to override the default values with your custom configuration. This is where you define environment-specific settings such as the image tag, Azure tenant ID, service account, ingress setup, resource requests and limits, and more.

   Any parameters not explicitly overridden in `datadog-values.yaml` fall back to the defaults defined in the chart's `values.yaml`.

   ```shell
    # Show default values
    helm show values datadog/cloudprem
   ```
   Here is an example of a `datadog-values.yaml` file with overrides for Azure:

   {{< code-block lang="yaml" filename="datadog-values.yaml">}}
# Datadog configuration
datadog:
  # The Datadog site (https://docs.datadoghq.com/getting_started/site/) to connect to. Defaults to `datadoghq.com`.
  # site: datadoghq.com
  # The name of the existing Secret containing the Datadog API key. The secret key name must be `api-key`.
  apiKeyExistingSecret: datadog-secret

azure:
  tenantId: <TENANT_ID> # required
  clientId: <CLIENT_ID> # required when using AD App to authenticate with Blob Storage
  clientSecretRef:
    name: <SECRET_NAME>
    key: <SECRET_KEY>
  storageAccount:
    name: <STORAGE_ACCOUNT_NAME> # required
    # If you are using a storage account access key to authenticate with Blob Storage,
    # comment out the `clientSecretRef` section above,
    # and uncomment the `storageAccount` section below:
    # accessKeySecretRef:
      # name: <SECRET_NAME>
      # key: <SECRET_KEY>

   # Service account configuration
   # If `serviceAccount.create` is set to `true`, a service account is created with the specified name.
   # Additional annotations can be added using serviceAccount.extraAnnotations.
   serviceAccount:
     create: true
     name: cloudprem

# CloudPrem node configuration
config:
  # The root URI where index data is stored. This should be an Azure path.
  # All indexes created in CloudPrem are stored under this location.
  default_index_root_uri: azure://<CONTAINER_NAME>/indexes

# Internal ingress configuration
# The internal ingress NLB is created in private subnets.
#
# Additional annotations can be added to customize the ALB behavior.
ingress:
  # The internal ingress is used by Datadog Agents and other collectors running outside
  # the Kubernetes cluster to send their logs to CloudPrem.
  internal:
    enabled: true
    ingressClassName: nginx-internal
    host: cloudprem.acme.internal
    extraAnnotations: {}

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
# The indexer is horizontally scalable - you can increase `replicaCount` to handle higher indexing throughput.
# Resource requests and limits should be tuned based on your indexing workload.
#
# The default values are suitable for moderate indexing loads of up to 20 MB/s per indexer pod.
indexer:
  replicaCount: 2

  resources:
    requests:
      cpu: "4"
      memory: "8Gi"
    limits:
      cpu: "4"
      memory: "8Gi"

   # Searcher configuration
   # The searcher is responsible for executing search queries against the indexed data stored in S3.
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

     resources:
       requests:
         cpu: "4"
         memory: "16Gi"
       limits:
         cpu: "4"
         memory: "16Gi"
{{< /code-block >}}

1. Install or upgrade the Helm chart
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

## Uninstall

To uninstall CloudPrem, execute the following command:

```shell
helm uninstall <RELEASE_NAME>
```

## Next step

**[Set up log ingestion with Datadog Agent][10]** - Configure the Datadog Agent to send logs to CloudPrem

[2]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli
[3]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-terraform?pivots=development-environment-azure-cli
[4]: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server?tabs=portal-create-flexible%2Cportal-get-connection%2Cportal-delete-resources
[5]: https://learn.microsoft.com/en-us/azure/developer/terraform/deploy-postgresql-flexible-server-database?tabs=azure-cli
[6]: https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-cli#create-a-container
[7]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container
[8]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
[9]: https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access?tabs=portal
[10]: /cloudprem/ingest/agent/
