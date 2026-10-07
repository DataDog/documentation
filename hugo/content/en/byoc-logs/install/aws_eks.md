---
title: Install BYOC Logs on AWS EKS
aliases:
- /cloudprem/configure/aws_config/
- /cloudprem/install/aws_eks/
description: Learn how to install and configure BYOC Logs on AWS EKS
further_reading:
- link: "/byoc-logs/configure/ingress/"
  tag: "Documentation"
  text: "Configure BYOC Logs Ingress"
- link: "/byoc-logs/ingest/"
  tag: "Documentation"
  text: "Configure Log Ingestion"
---

## Overview

This document walks you through the process of configuring your AWS environment and installing BYOC (Bring Your Own Cloud) Logs on AWS EKS.

## Prerequisites

To deploy BYOC Logs on AWS, you must configure:
- AWS credentials and authentication.
- AWS region selection.
- IAM permissions for S3 object storage.
- RDS PostgreSQL database (recommended).
- EKS cluster.
  - See the [Cluster Sizing][1] documentation for guidelines on planning your node groups for your expected TB/day.
- If you are not using EKS auto-mode, the [EKS Pod Identity Agent][2] and [EBS CSI driver][3] are required to use persistent volumes and claims from `searcher.persistentVolume` or `indexer.persistentVolume`.

### AWS credentials

When starting a node, BYOC Logs uses the default credential provider chain from the [AWS SDK for Rust][4] to find AWS credentials in this order:

1. Environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, with `AWS_SESSION_TOKEN` as an optional addition for temporary credentials.
2. Credential profiles file, typically located at `~/.aws/credentials` or otherwise specified by the `AWS_SHARED_CREDENTIALS_FILE` and `AWS_PROFILE` environment variables if set and not empty.
3. Web Identity Token, loaded when `AWS_WEB_IDENTITY_TOKEN_FILE` and `AWS_ROLE_ARN` are set. This is the mechanism used by [EKS IAM Roles for Service Accounts][5] (IRSA). To use IRSA, annotate the BYOC service account with `eks.amazonaws.com/role-arn` and configure an OIDC trust policy on the target IAM role.
4. Amazon ECS container credentials, loaded from the Amazon ECS container if the environment variable `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI` is set.
5. Instance profile credentials, used on Amazon EC2 instances and delivered through the Amazon EC2 metadata service.

An error is returned if no credentials are found in the chain.

### AWS Region

BYOC Logs attempts to find the AWS region from multiple sources, using the following order of precedence:

1. **Environment variables**: Checks `AWS_REGION`, then `AWS_DEFAULT_REGION`.
2. **AWS config file**: Typically located at `~/.aws/config`, or at the path specified by the `AWS_CONFIG_FILE` environment variable (if set and not empty).
3. **EC2 instance metadata**: Uses the region of the currently running Amazon EC2 instance.
4. **Default**: Falls back to `us-east-1` if no other source provides a region.

<div class="alert alert-warning">The resolved AWS region must match the region of the S3 bucket used for BYOC Logs storage.</div>


### IAM access for S3

Required authorized actions:

- `ListBucket` (on the bucket directly)
- `GetObject`
- `PutObject`
- `DeleteObject`
- `ListMultipartUploadParts`
- `AbortMultipartUpload`

1. Copy the following JSON to a file, replacing `<S3_BUCKET_NAME>` with your bucket name:

```json
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Effect": "Allow",
     "Action": [
       "s3:ListBucket"
     ],
     "Resource": [
       "arn:aws:s3:::<S3_BUCKET_NAME>"
     ]
   },
   {
     "Effect": "Allow",
     "Action": [
       "s3:GetObject",
       "s3:PutObject",
       "s3:DeleteObject",
       "s3:ListMultipartUploadParts",
       "s3:AbortMultipartUpload"
     ],
     "Resource": [
       "arn:aws:s3:::<S3_BUCKET_NAME>/*"
     ]
   }
 ]
}
```

2. Create the IAM policy, replacing `<JSON_FILENAME>` with the name of the file you created in Step 1:

```bash
aws iam create-policy \
  --policy-name <POLICY_NAME> \
  --policy-document file://<JSON_FILENAME> \
  --region <AWS_REGION>
```

3. Get the policy ARN for role creation:

```bash
POLICY_ARN=$(aws iam list-policies --query \
  "Policies[?PolicyName=='<POLICY_NAME>'].Arn" \
  --output text)
```

4. Create the IAM role and service account:

```bash
eksctl create iamserviceaccount \
  --name byoclogs \
  --namespace <NAMESPACE_NAME> \
  --cluster <CLUSTER_NAME> \
  --role-name byoclogs \
  --region <AWS_REGION> \
  --attach-policy-arn $POLICY_ARN \
  --approve
```

This creates an IAM role called `byoclogs` and a Kubernetes service account called `byoclogs` in the `<NAMESPACE_NAME>` namespace. If the namespace does not already exist, the command creates it.

### Create an RDS database

Create an RDS instance with the following command, replacing `<PASSWORD>` with your desired password:

```shell
aws rds create-db-instance \
  --db-instance-identifier byoclogs-demo-postgres \
  --db-instance-class db.t4g.medium \
  --engine postgres \
  --engine-version 18.3 \
  --master-username byoclogs \
  --master-user-password '<PASSWORD>' \
  --allocated-storage 20 \
  --storage-type gp3 \
  --db-subnet-group-name <DB-SUBNET-GROUP-NAME> \
  --vpc-security-group-ids <EKS-CLUSTER-SECURITY-GROUP-ID> \
  --db-name byoclogs \
  --backup-retention-period 7 \
  --region <AWS_REGION> \
  --no-multi-az
```

The `--backup-retention-period 7` flag enables automated backups with a 7-day retention period. Enable backups for disaster recovery in production deployments.

You can retrieve RDS information by executing the following shell commands. The below commands retrieve information for the RDS instance created above:

```shell
# Get RDS instance details
RDS_INFO=$(aws rds describe-db-instances --db-instance-identifier byoclogs-demo-postgres --query 'DBInstances[0].{Status:DBInstanceStatus,Endpoint:Endpoint.Address,Port:Endpoint.Port,Database:DBName}' --output json 2>/dev/null)

STATUS=$(echo $RDS_INFO | jq -r '.Status')
ENDPOINT=$(echo $RDS_INFO | jq -r '.Endpoint')
PORT=$(echo $RDS_INFO | jq -r '.Port')
DATABASE=$(echo $RDS_INFO | jq -r '.Database')

echo ""
echo "Full URI:"
# Replace <PASSWORD> with the master-user-password you set for the instance
echo "postgres://byoclogs:<PASSWORD>@$ENDPOINT:$PORT/$DATABASE"
echo ""
```

## Installation steps

1. [Install the BYOC Logs Helm chart](#install-the-byoc-logs-helm-chart)
2. [Verify installation](#verification)

## Install the BYOC Logs Helm chart

1. Add and update the Datadog Helm repository:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. Store your Datadog API key as a Kubernetes secret:

   ```shell
   kubectl create secret generic datadog-secret \
   -n <NAMESPACE_NAME> \
   --from-literal api-key="<DD_API_KEY>"
   ```

   <div class="alert alert-tip"><p>You can set a default namespace for your current context to avoid having to type <code>-n &lt;NAMESPACE_NAME&gt;</code> with every command:</p>
   <pre><code>kubectl config set-context --current --namespace=&lt;NAMESPACE_NAME&gt;</code></pre></div>

1. Store the PostgreSQL database connection string as a Kubernetes secret:
   ```shell
   kubectl create secret generic byoclogs-metastore-uri \
   -n <NAMESPACE_NAME> \
   --from-literal QW_METASTORE_URI="postgres://<USERNAME>:<PASSWORD>@<ENDPOINT>:<PORT>/<DATABASE>"
   ```

1. Customize the Helm chart

   Create a `datadog-values.yaml` file to override the default values with your custom configuration. This is where you define environment-specific settings such as the image tag, AWS account ID, service account, ingress setup, resource requests and limits, and more.

   <div class="alert alert-info"><p>The <code>storageClass</code> (<code>sc</code>) used in the example file below is <code>gp3</code>, which is not installed by default and is not the default <code>sc</code> for EKS. To create the gp3 storage class, follow the instructions in this <a href="https://docs.aws.amazon.com/eks/latest/userguide/create-storage-class.html">AWS guide</a>. If you do not want to set gp3 as the default (and migrate from gp2), set <code>storageclass.kubernetes.io/is-default-class: "false"</code>.</p>
   
   <p>Datadog recommends gp3 storage volumes for BYOC Logs to provide the IOPS and throughput flexibility to support higher indexing rates.</p>
   </div>

   Any parameters not explicitly overridden in `datadog-values.yaml` fall back to the defaults defined [in the chart's `values.yaml`][6].

   ```shell
   # Show default values
   helm show values datadog/cloudprem
   ```

   Here is an example of a `datadog-values.yaml` file with overrides:

   ```yaml
   aws:
     accountId: "123456789012"

   # Environment variables
   # Any environment variables defined here are available to all pods in the deployment
   # Replace the "us-west-1" example below with your AWS region.
   environment:
     - name: AWS_REGION
       value: "us-west-1"

   # Datadog configuration
   datadog:
      # The Datadog [site](https://docs.datadoghq.com/getting_started/site/) to connect to. Defaults to `datadoghq.com`.
      # site: datadoghq.com
      # The name of the existing Secret containing the Datadog API key. The secret key name must be `api-key`.
      apiKeyExistingSecret: datadog-secret

   # Service account configuration
   # `serviceAccount.create: false` references the service account created with eksctl.
   # The chart uses this service account to access S3.
   serviceAccount:
     create: false
     name: byoclogs
     # eksRoleName is the name of the IAM role to use for the service account.
     # If serviceAccount.create is set to true, the following annotations will be added to the service account:
     # - eks.amazonaws.com/role-arn:arn:aws:iam::<aws.accountId>:role/<serviceAccount.eksRoleName>
     # - eks.amazonaws.com/sts-regional-endpoints:"true"
     eksRoleName: byoclogs
     extraAnnotations: {}

   # BYOC Logs node configuration
   config:
     # The root URI where index data is stored. This should be an S3 path.
     # All indexes created in BYOC Logs are stored under this location.
     default_index_root_uri: s3://<BUCKET_NAME>/indexes

   # Internal ingress configuration for access within the VPC
   # The ingress provisions an Application Load Balancer (ALB) in AWS which is created in private subnets.
   #
   # Additional annotations can be added to customize the ALB behavior.
   ingress:
     internal:
       enabled: true
       name: byoclogs-internal
       host: byoclogs.example.internal
       extraAnnotations:
         alb.ingress.kubernetes.io/load-balancer-name: byoclogs-internal

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
           name: byoclogs-metastore-uri

   # Indexer configuration
   # The indexer is responsible for processing and indexing incoming data. It receives data from various sources (for example, Datadog Agents, log collectors)
   # and transforms it into searchable files called "splits" stored in S3.
   #
   # The indexer is horizontally scalable - you can increase `replicaCount` to handle higher indexing throughput.
   # The `podSize` parameter sets vCPU, memory, and component-specific settings automatically.
   # See the sizing guide for available tiers and their configurations.
   indexer:
     replicaCount: 2
     podSize: xlarge
     persistentVolume:
       enabled: true
       storage: 250Gi
       storageClass: gp3

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
     podSize: xlarge
   ```

1. Install or upgrade the Helm chart:

   ```shell
   helm upgrade --install <RELEASE_NAME> datadog/cloudprem \
   -n <NAMESPACE_NAME> \
   -f datadog-values.yaml
   ```

   <div class="alert alert-info">If a pod remains pending with a warning about insufficient memory or CPU and no available nodes, change <code>indexer.podSize</code> to <code>medium</code> in <code>datadog-values.yaml</code> and run the <code>helm upgrade --install</code> command again.</div>

## Verification

### Check deployment status

Verify that all BYOC Logs components are running:

```shell
kubectl get pods -n <NAMESPACE_NAME>
kubectl get ingress -n <NAMESPACE_NAME>
kubectl get services -n <NAMESPACE_NAME>
```

## Uninstall

To uninstall BYOC Logs:

```shell
helm uninstall <RELEASE_NAME> \
-n <NAMESPACE_NAME>
```

## Next step

**[Set up log ingestion with Datadog Agent][7]** - Configure the Datadog Agent to send logs to BYOC Logs

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /byoc-logs/operate/sizing/
[2]: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-agent-setup.html
[3]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
[4]: https://docs.aws.amazon.com/sdk-for-rust/latest/dg/credentials.html
[5]: https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html
[6]: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/values.yaml
[7]: /byoc-logs/ingest/agent/
