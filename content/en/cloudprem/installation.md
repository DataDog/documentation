---
title: CloudPrem Installation
description: Learn how to install and configure CloudPrem in your environment
private: true
further_reading:
- link: "/cloudprem/"
  tag: "Documentation"
  text: "CloudPrem Overview"
- link: "/cloudprem/ingress/"
  tag: "Documentation"
  text: "Configure CloudPrem Ingress"
- link: "/cloudprem/aws_config"
  tag: "Documentation"
  text: "Configure AWS"
- link: "/cloudprem/processing/"
  tag: "Documentation"
  text: "Configure CloudPrem Log Processing"
- link: "/cloudprem/cluster/"
  tag: "Documentation"
  text: "Learn more about Cluster Sizing and Operations"
- link: "/cloudprem/architecture/"
  tag: "Documentation"
  text: "Learn more about CloudPrem Architecture"
- link: "/cloudprem/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"
---

<div class="alert alert-warning">CloudPrem is in Preview.</div>

## Overview

This document walks you through the process of installing CloudPrem in your environment. CloudPrem can be installed on any Kubernetes cluster that meets the prerequisites.

## Prerequisites

Before getting started with CloudPrem, ensure you have:

- AWS account with necessary permissions
- Kubernetes `1.25+` ([EKS][1] recommended)
- [AWS Load Balancer Controller installed][2]
- PostgreSQL database ([RDS][3] recommended)
- S3 bucket for log storage
- Datadog Agent
- Kubernetes command line tool (`kubectl`)
- Helm command line tool (`helm`)

## Installation steps

1. [Install the CloudPrem Helm chart](#install-the-cloudprem-helm-chart).
3. [Configure the Datadog Agent to send Kubernetes logs](#send-kubernetes-logs-to-cloudprem-with-the-datadog-agent).
4. [Configure your Datadog account](#configure-your-datadog-account).

## Install the CloudPrem Helm chart

1. Add and update the Datadog Helm repository:

   ```bash
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

2. Create a Kubernetes namespace for the chart:

   ```bash
   kubectl create namespace <NAMESPACE_NAME>
   ```

3. Store the PostgreSQL database connection string as a Kubernetes secret:

   ```bash
   kubectl create secret generic <SECRET_NAME> \
   -n <NAMESPACE_NAME> \
   --from-literal QW_METASTORE_URI=postgres://<USERNAME>:<PASSWORD>@<ENDPOINT>:<PORT>/<DATABASE>
   ```

4. Customize the Helm chart

   Create a `datadog-values.yaml` file to override the default values with your custom configuration. This is where you define environment-specific settings such as the image tag, AWS account ID, service account, ingress setup, resource requests and limits, and more.

   Any parameters not explicitly overridden in `datadog-values.yaml` fall back to the defaults defined in the chart's `values.yaml`.

   ```bash
   # Show default values
   helm show values datadog/cloudprem
   ```

   Here is an example of a `datadog-values.yaml` file with such overrides:

   ```yaml
   aws:
     accountId: "123456789012"

   # Environment variables
   # Any environment variables defined here are available to all pods in the deployment
   environment:
     AWS_REGION: us-east-1

   # Service account configuration
   # If `serviceAccount.create` is set to `true`, a service account is created with the specified name.
   # The service account will be annotated with the IAM role ARN if `aws.accountId` and serviceAccount.eksRoleName` are set.
   # Additional annotations can be added using serviceAccount.extraAnnotations.
   serviceAccount:
     create: true
     name: cloudprem
     # The name of the IAM role to use for the service account. If set, the following annotations will be added to the service account:
     # - eks.amazonaws.com/role-arn: arn:aws:iam::<aws.accountId>:role/<serviceAccount.eksRoleName>
     # - eks.amazonaws.com/sts-regional-endpoints: "true"
     eksRoleName: cloudprem
     extraAnnotations: {}

   # CloudPrem node configuration
   config:
     # The root URI where index data is stored. This should be an S3 path.
     # All indexes created in CloudPrem are stored under this location.
     default_index_root_uri: s3://<BUCKET_NAME>/indexes

   # Ingress configuration
   # The chart supports two ingress configurations:
   # 1. A public ingress for external access through the internet that will be used exclusively by Datadog's control plane and query service.
   # 2. An internal ingress for access within the VPC
   #
   # Both ingresses provision Application Load Balancers (ALBs) in AWS.
   # The public ingress ALB is created in public subnets.
   # The internal ingress ALB is created in private subnets.
   #
   # Additional annotations can be added to customize the ALB behavior.
   ingress:
     # The public ingress is configured to only accept TLS traffic and requires mutual TLS (mTLS) authentication.
     # Datadog's control plane and query service authenticate themselves using client certificates,
     # ensuring that only authorized Datadog services can access CloudPrem nodes through the public ingress.
     public:
       enabled: true
       name: cloudprem-public
       host: cloudprem.acme.corp
       extraAnnotations:
         alb.ingress.kubernetes.io/load-balancer-name: cloudprem-public

     # The internal ingress is used by Datadog Agents and other collectors running outside
     # the Kubernetes cluster to send their logs to CloudPrem.
     internal:
       enabled: true
       name: cloudprem-internal
       host: cloudprem.acme.internal
       extraAnnotations:
         alb.ingress.kubernetes.io/load-balancer-name: cloudprem-internal

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
   ```

5. Install or upgrade the Helm chart

   ```bash
   helm upgrade --install <RELEASE_NAME> datadog/cloudprem \
   -n <NAMESPACE_NAME> \
   -f datadog-values.yaml
   ```

   To check if the deployment went well:
   - Look at the logs from the metastore or indexer pod.
   - Look at the status of deployment resources, such as the ingress status.
   If you spot some errors, check out our troubleshooting section.

## Send Kubernetes logs to CloudPrem with the Datadog Agent

Follow the [Getting Started with Datadog Operator][5] guide for installation and deployment. When you reach Step 3, use the following `datadog-agent.yaml` configuration instead of the example provided in the guide.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
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

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

    otlp:
      receiver:
        protocols:
          grpc:
            enabled: true
            endpoint: 0.0.0.0:4417

    prometheusScrape:
      enabled: true
      enableServiceEndpoints: true

```

- Within the cluster, use the indexer service for the logs endpoint URL: `DD_LOGS_CONFIG_LOGS_DD_URL:http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280`.
- Outside the cluster, use the host of the internal ingress.
- To send cluster metrics to Datadog, enable `prometheusScrape`.
- To send cluster logs to Datadog, enable `OTLP/gRPC`.

## Configure your Datadog account

You need to reach out to [Datadog support][6] and give the public DNS of CloudPrem so that you can search into your CloudPrem cluster from Datadog UI.

### Searching your CloudPrem logs in the Logs Explorer

After your Datadog account is configured, you are ready to search into the `cloudprem` index by typing it in the search bar or selecting it in facets.

**Note**: You cannot query CloudPrem indexes alongside other indexes. Additionally, Flex Logs are not supported with CloudPrem indexes.

{{< img src="/cloudprem/installation/filter_index_cloudprem.png" alt="Screenshot of the Logs Explorer interface showing how to filter logs by selecting the cloudprem index in the facets panel" style="width:70%;" >}}

## Uninstall

To uninstall CloudPrem:

```bash
helm uninstall <RELEASE_NAME>
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/eks/
[2]: https://kubernetes-sigs.github.io/aws-load-balancer-controller
[3]: https://aws.amazon.com/rds/
[4]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/deploy/installation/
[5]: /getting_started/containers/datadog_operator/#installation-and-deployment
[6]: /getting_started/support/
