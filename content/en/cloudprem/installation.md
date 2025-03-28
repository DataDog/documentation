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
- link: "/cloudprem/advanced/"
  tag: "Documentation"
  text: "Advanced Configurations"
- link: "/cloudprem/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"
---

## Overview

This document walks you through the process of installing CloudPrem in your environment. CloudPrem can be installed on any Kubernetes cluster that meets the prerequisites.

## Prerequisites

- AWS account
- Kubernetes `1.25+` ([EKS][1] preferred)
- [AWS Load Balancer Controller][2]
- PostgreSQL database ([RDS][3] preferred)
- S3 bucket
- Datadog agent
- Kubernetes command line tool (`kubectl`)
- Helm command line tool (`helm`)

## Installation steps

1. Install and configure [AWS Load Balancer Controller][4] on Kubernetes cluster.
2. Create an S3 bucket.
3. [Install CloudPrem Helm chart](#install-cloudprem-helm-chart).
4. Set up DNS records.
<!-- Does this have separate instructions? -->
5. [Configure Datadog Agent to send Kuberentes logs](#5-send-kubernetes-logs-to-cloudprem).
6. [Configure your Datadog account](#6-configure-your-datadog-agent).
7. [Search your CloudPrem logs in the Logs Explorer](#7-search-your-cloudprem-logs-in-the-logs-explorer).
8. [Uninstall](#8-uninstall).

## Install CloudPrem Helm chart 
<!-- Can you verify the ordering of these instructions? Right now they're all listed under Install CloudPrem Helm chart, but in the installation steps above, they're split out into separate steps. Which of the following is actually installing the CloudPrem Helm chart? -->

### 1. Add and update the Datadog Helm repository

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

### 2. Create Kubernetes namespace for the chart

```bash
kubectl create namespace <namespace name>
```

### 3. Store the PostgreSQL database connection string as a Kubernetes secret

```bash
kubectl create secret generic <secret name> \
-n <namespace name> \
--from-literal QW_METASTORE_URI=postgres://<username>:<password>@<endpoint>:<port>/<database> 
```

### 4. Customize the Helm chart

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
```

### 5. Send Kubernetes logs to CloudPrem

Configure your Kubernetes cluster to send logs to CloudPrem:

```yaml
# In your Agent configuration
logs:
  enabled: true
  config:
    logs_config:
      use_cloudprem: true
      cloudprem_endpoint: <your-cloudprem-internal-endpoint>
```

### 6. Configure your Datadog account

Configure your Datadog account to use CloudPrem for log management:

1. Navigate to your [Datadog organization settings][10].
2. Under "CloudPrem Configuration", add your CloudPrem endpoint.
3. Verify the connection status.

### 7. Search your CloudPrem logs in the Logs Explorer

After configuration, you can search your logs in the Logs Explorer:

1. Navigate to [**Logs > Explorer**][11].
2. Use the Index filter on the left hand side to find CloudPrem logs.
<!-- To verify, the original doc list this as Source, but the image shows Index -->
3. Verify that logs are being indexed and are searchable.

<!-- {{< img src="path/to/your/image-name-here.png" alt="TBD Log Explorer filtered by index:cloudprem" style="width:100%;" >}} -->

### 8. Uninstall

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
[10]: https://app.datadoghq.com/organization-settings
[11]: https://app.datadoghq.com/logs