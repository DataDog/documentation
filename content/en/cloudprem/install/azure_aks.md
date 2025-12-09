---
title: Install CloudPrem on Azure AKS
description: Learn how to install and configure CloudPrem on Azure AKS
---

## Overview
{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

This document walks you through the process of installing CloudPrem on Azure AKS.

## Prerequisites

Before getting started with CloudPrem, ensure you have:

- Azure account with necessary permissions
- Kubernetes `1.32+` ([AKS][1] recommended)
- PostgreSQL database ([Azure Database for PostgreSQL][2] recommended)
- Azure Blob Storage container for storing logs
- Datadog Agent
- Kubernetes command line tool (`kubectl`)
- Helm command line tool (`helm`)

## Installation steps

1. [Prepare your Azure environment](#prepare-your-azure-environment)
2. [Install the CloudPrem Helm chart](#install-the-cloudprem-helm-chart)
3. [Verify installation](#verification)
4. [Configure your Datadog account](#configure-your-datadog-account)

## Prepare your Azure environment

Before installing CloudPrem on AKS, ensure your Azure environment is properly configured. For detailed Azure configuration instructions, see the [Azure Configuration guide][3].

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

**[Set up log ingestion with Datadog Agent][4]** - Configure the Datadog Agent to send logs to CloudPrem

<!-- ## Further reading

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://azure.microsoft.com/en-us/products/kubernetes-service
[2]: https://azure.microsoft.com/en-us/products/postgresql
[3]: /cloudprem/configure/azure_config/
[4]: /cloudprem/ingest_logs/datadog_agent
