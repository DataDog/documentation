---
title: CloudPrem Installation
description: Learn how to install and configure CloudPrem in your environment
further_reading:
- link: "/cloudprem/"
  tag: "Documentation"
  text: "Learn more about CloudPrem"
- link: "/cloudprem/ingress/"
  tag: "Documentation"
  text: "CloudPrem Ingress Configuration"
- link: "/cloudprem/cluster/"
  tag: "Documentation"
  text: "Cluster Sizing and Operations"
- link: "/cloudprem/aws_config"
  tag: "Documentation"
  text: "AWS Configuration"
- link: "/cloudprem/processing/"
  tag: "Documentation"
  text: "CloudPrem Log Processing"
- link: "/cloudprem/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"
---

## Overview

This document walks you through the process of installing CloudPrem in your environment. CloudPrem can be installed on any Kubernetes cluster that meets the prerequisites.

## Prerequisites

- AWS account
- Kubernetes `1.25+` ([EKS][1] preferred)
- [AWS Load Balancer Controller installed][2]
- PostgreSQL database ([RDS][3] preferred)
- S3 bucket
- Datadog agent
- Kubernetes command line tool (`kubectl`)
- Helm command line tool (`helm`)

## Installation steps

1. [Install CloudPrem Helm chart](#install-cloudprem-helm-chart).
2. [Configure Ingress][6].
3. [Configure Datadog Agent to send Kubernetes logs](#send-kubernetes-logs-to-cloudprem-with-the-datadog-agent).
4. [Configure your Datadog account](#configure-your-datadog-account).

## Install CloudPrem Helm chart 

1. Add and update the Datadog Helm repository

   ```bash
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

2. Create Kubernetes namespace for the chart

   ```bash
   kubectl create namespace <namespace name>
   ```

3. Store the PostgreSQL database connection string as a Kubernetes secret

   ```bash
   kubectl create secret generic <secret name> \
   -n <namespace name> \
   --from-literal QW_METASTORE_URI=postgres://<username>:<password>@<endpoint>:<port>/<database> 
   ```

4. Customize the Helm chart

   Create a `datadog-values.yaml` file to override the default values with your custom configuration. This is where you define environment-specific settings such as the image tag, AWS account ID, service account, ingress setup, resource requests and limits, and more.

   Any parameters not explicitly overridden in `datadog-values.yaml` will fall back to the defaults defined in the chart's `values.yaml`.

   ```bash
   # Show default values
   helm show values datadog/cloudprem
   ```

   Here is an example of a `datadog-values.yaml` file with such overrides:

   ```yaml
   aws:
     accountId: "123456789012"

   # Environment variables
   # Any environment variables defined here will be available to all pods in the deployment
   environment:
     AWS_REGION: us-east-1

   # Service account configuration
   # If `serviceAccount.create` is set to `true`, a service account will be created with the specified name.
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
     # The root URI where index data will be stored. This should be an S3 path.
     # All indexes created in CloudPrem will be stored under this location.
     default_index_root_uri: s3://<bucket name>/indexes

   # Ingress configuration
   # The chart supports two ingress configurations:
   # 1. A public ingress for external access via the internet that will be used exclusively by Datadog's controle plane and query service.
   # 2. An internal ingress for access within the VPC
   #
   # Both ingresses will provision Application Load Balancers (ALBs) in AWS.
   # The public ingress ALB will be created in public subnets.
   # The internal ingress ALB will be created in private subnets.
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

     # The internal ingress is used by Datadog agents and other collectors running outside
     # the Kubernetes cluster to send their logs to CloudPrem.
     internal:
       enabled: true
       name: cloudprem-internal
       host: cloudprem.acme.internal
       extraAnnotations:
         alb.ingress.kubernetes.io/load-balancer-name: cloudprem-internal

   # Metastore configuration
   # The metastore is responsible for storing and managing index metadata.
   # It requires a PostgreSQL database connection string to be provided via a Kubernetes secret.
   # The secret should contain a key named `QW_METASTORE_URI` with a value in the format:
   # postgresql://<username>:<password>@<host>:<port>/<database>
   #
   # The metastore connection string is mounted into the pods using extraEnvFrom to reference the secret.
   metastore:
     extraEnvFrom:
       - secretRef:
           name: cloudprem-metastore-uri

   # Indexer configuration
   # The indexer is responsible for processing and indexing incoming data it receives data from various sources (e.g., Datadog agents, log collectors)
   # and transforms it into searchable files called "splits" stored in S3.
   #
   # The indexer is horizontally scalable - you can increase `replicaCount` to handle higher indexing throughput.
   # Resource requests and limits should be tuned based on your indexing workload.
   #
   # The default values are suitable for moderate indexing loads of up to 20MB/s per indexer pod.
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
   # - Query complexity (e.g., number of terms, use of wildcards or regex)
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

   To check if the deployment went well:
   - Look at the logs from the metastore or indexer pod.
   - Look at the deployment resources status like the ingress ones.
   If you spot some errors, check out our troubleshooting section.

## Send Kubernetes logs to CloudPrem with the Datadog Agent

Follow the [Getting started with Datadog Operator guide][5] and use the following configuration datadog-agent.yaml:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <cluster name>
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    env:
      - name: DD_LOGS_CONFIG_LOGS_DD_URL
        value: http://<release name>-indexer.<namespace>.svc.cluster.local:7280

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

- Within the cluster, use the indexer service for the logs endpoint url. `DD_LOGS_CONFIG_LOGS_DD_URL:http://<release name>-indexer.<namespace>.svc.cluster.local:7280`
- Outside the cluster, use the host of the internal ingress.
- To send cluster metrics to Datadog, enable `prometheusScrape`.
- To send cluster logs to Datadog, enable `OTLP/gRPC`.

## Configure your Datadog account

You need to reach out to [Datadog support][7] and give the public DNS of CloudPrem so that you can search into your CloudPrem cluster from Datadog UI.

### Searching your CloudPrem logs in the Logs Explorer

After your Datadog account is configured, you are ready to search into the `cloudprem` index by typing it in the search bar or selecting it in facets.
**Note**: You cannot query the CloudPrem index and other indexes together. 

<!-- {{< img src="path/to/your/image-name-here.png" alt="TBD Log Explorer filtered by index:cloudprem" style="width:100%;" >}} -->

## Uninstall

To uninstall CloudPrem:

```bash
helm uninstall <deployment name>
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/eks/
[2]: https://kubernetes-sigs.github.io/aws-load-balancer-controller
[3]: https://aws.amazon.com/rds/
[4]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/deploy/installation/
[5]:/getting_started/containers/datadog_operator/
[6]: /cloudprem/ingress/
[7]: /getting_started/support/
