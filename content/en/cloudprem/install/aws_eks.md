---
title: Install CloudPrem on AWS EKS
description: Learn how to install and configure CloudPrem on AWS EKS
further_reading:
- link: "/cloudprem/configure/aws_config/"
  tag: "Documentation"
  text: "AWS Configuration"
- link: "/cloudprem/configure/ingress/"
  tag: "Documentation"
  text: "Configure CloudPrem Ingress"
- link: "/cloudprem/ingest_logs/"
  tag: "Documentation"
  text: "Configure Log Ingestion"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

This document walks you through the process of installing CloudPrem on AWS EKS.

## Prerequisites

Before getting started with CloudPrem, ensure you have:

- AWS account with necessary permissions
- Kubernetes `1.25+` ([EKS][1] recommended)
- [AWS Load Balancer Controller installed][2] (optional)
- PostgreSQL database ([RDS][3] recommended)
- S3 bucket for log storage
- Datadog Agent
- Kubernetes command line tool (`kubectl`)
- Helm command line tool (`helm`)

## Installation steps

1. [Prepare your AWS environment](#prepare-your-aws-environment)
2. [Install the CloudPrem Helm chart](#install-the-cloudprem-helm-chart)
3. [Verify installation](#verification)
4. [Configure your Datadog account](#configure-your-datadog-account)

## Prepare your AWS environment

Before installing CloudPrem on EKS, ensure your AWS environment is properly configured. For detailed AWS configuration instructions, see the [AWS Configuration guide][7].

Key requirements:
- AWS credentials configured (IAM role or access keys)
- Appropriate IAM permissions for S3 access
- EKS cluster with AWS Load Balancer Controller installed
- RDS PostgreSQL instance or compatible database

### Create an RDS database

You can create a micro RDS instance with the following command. For production environments, a small instance deployed across multiple Availability Zones (multi-AZ) is enough.

```shell
# Micro RDS instance for testing purposes. Takes around 5 min.
aws rds create-db-instance --db-instance-identifier cloudprem-postgres --db-instance-class db.t3.micro --engine postgres --engine-version 16.3 --master-username cloudprem --master-user-password 'FixMeCloudPrem' --allocated-storage 20 --storage-type gp2 --db-subnet-group-name <VPC-ID> --vpc-security-group-ids <VPC-SECURITY-GROUP-ID> --db-name cloudprem --backup-retention-period 0 --no-multi-az
```

You can retrieve RDS info by executing the following shell commmands:

```shell
# Get RDS instance details
RDS_INFO=$(aws rds describe-db-instances --db-instance-identifier cloudprem-demo-postgres --query 'DBInstances[0].{Status:DBInstanceStatus,Endpoint:Endpoint.Address,Port:Endpoint.Port,Database:DBName}' --output json 2>/dev/null)

STATUS=$(echo $RDS_INFO | jq -r '.Status')
ENDPOINT=$(echo $RDS_INFO | jq -r '.Endpoint')
PORT=$(echo $RDS_INFO | jq -r '.Port')
DATABASE=$(echo $RDS_INFO | jq -r '.Database')

echo ""
echo "🔗 Full URI:"
echo "postgres://cloudprem:FixMeCloudPrem@$ENDPOINT:$PORT/$DATABASE"
echo ""
```

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
   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
   -n <NAMESPACE_NAME> \
   --from-literal QW_METASTORE_URI="postgres://<USERNAME>:<PASSWORD>@<ENDPOINT>:<PORT>/<DATABASE>"
   ```

1. Customize the Helm chart

   Create a `datadog-values.yaml` file to override the default values with your custom configuration. This is where you define environment-specific settings such as the image tag, AWS account ID, service account, ingress setup, resource requests and limits, and more.

   Any parameters not explicitly overridden in `datadog-values.yaml` fall back to the defaults defined in the chart's `values.yaml`.

   ```shell
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

   # Datadog configuration
   datadog:
      # The Datadog [site](https://docs.datadoghq.com/getting_started/site/) to connect to. Defaults to `datadoghq.com`.
      # site: datadoghq.com
      # The name of the existing Secret containing the Datadog API key. The secret key name must be `api-key`.
      apiKeyExistingSecret: datadog-secret

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

   # Internal ingress configuration for access within the VPC
   # The ingress provisions an Application Load Balancers (ALBs) in AWS which is created in private subnets.
   #
   # Additional annotations can be added to customize the ALB behavior.
   ingress:
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

To uninstall CloudPrem:

```shell
helm uninstall <RELEASE_NAME>
```

## Next step

**[Set up log ingestion with Datadog Agent][8]** - Configure the Datadog Agent to send logs to CloudPrem

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/eks/
[2]: https://kubernetes-sigs.github.io/aws-load-balancer-controller
[3]: https://aws.amazon.com/rds/
[4]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/deploy/installation/
[5]: /getting_started/containers/datadog_operator/#installation-and-deployment
[6]: /help/
[7]: /cloudprem/configure/aws_config
[8]: /cloudprem/ingest_logs/datadog_agent/
