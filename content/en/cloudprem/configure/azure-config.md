---
title: Azure Configuration
description: Learn how to configure Azure for CloudPrem
private: true
further_reading:
- link: "/cloudprem/install/azure-aks/"
  tag: "Documentation"
  text: "Install CloudPrem on Azure AKS"
- link: "/cloudprem/ingest-logs/"
  tag: "Documentation"
  text: "Configure Log Ingestion"
---

## Overview

Before you install CloudPrem on your Azure account, you’ll need to set up a set of supporting infrastructure components. These resources provide the compute, storage, database, and networking services that CloudPrem depends on. This page lists everything you need to provision in your Azure account before moving on to the installation steps described in the [Azure AKS Installation Guide](../install/azure-aks/).

## Prerequites
- Azure Kubernetes Service (AKS) – A running AKS cluster sized for your expected CloudPrem workload.
- PostgreSQL Flexible Server – An Azure Database for PostgreSQL instance that CloudPrem will use to store its metadata.
- Blob Storage Container – An Azure Storage container to hold CloudPrem logs.
- Client Identity & Permissions – An Azure AD application with read/write access to the storage container.
- NGINX Ingress Controller – Installed on the AKS cluster to route external traffic to CloudPrem services.
- Datadog Agent – Deployed on the AKS cluster to collect and send logs to CloudPrem.

1. Azure Kubernetes Service (AKS)

CloudPrem runs entirely on Kubernetes. You’ll need an AKS cluster with sufficient CPU, memory, and disk space configured for your workload. See the Kubernetes cluster sizing recommendations for guidance.

	•	Quickstart: [Deploy an AKS cluster with the Azure CLI](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli)
	•	Quickstart: [Deploy an AKS cluster with Terraform](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-terraform?pivots=development-environment-azure-cli)

Check:
Run `kubectl get nodes` and confirm the cluster is reachable and nodes are in `Ready` state.

2. PostgreSQL Flexible Server

CloudPrem stores its metadata and configuration in a PostgreSQL database. An Azure Database for PostgreSQL Flexible Server is recommended. It must be reachable from the AKS cluster, ideally with private networking enabled. See the Postgres sizing recommendations for details.

	•	Quickstart: Create an Azure Database for PostgreSQL Flexible Server using the Azure CLI (https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server?tabs=portal-create-flexible%2Cportal-get-connection%2Cportal-delete-resources)
	•	Quickstart: Create an Azure Database for PostgreSQL Flexible Server using Terraform  (https://learn.microsoft.com/en-us/azure/developer/terraform/deploy-postgresql-flexible-server-database?tabs=azure-cli)

Check:
Verify you can connect with psql from a bastion or from inside the AKS network, and that credentials work. Replace placeholders with your actual values:
```bash
psql "host=<SERVER_NAME>.postgres.database.azure.com \
      port=5432 \
      dbname=<DB_NAME> \
      user=<ADMIN_USER>@<SERVER_NAME> \
      password=<PASSWORD> \
      sslmode=require"
```

If successful, you should see a prompt like:
```
psql (15.2)
SSL connection (protocol: TLS, cipher: ...)
Type "help" for help.

<DB_NAME>=>
```

👉 For security, create a dedicated database and user for CloudPrem, and grant the user rights only on that database, not cluster-wide.

3. Blob Storage Container

CloudPrem uses Azure Blob Storage to persist logs. Create a dedicated container for this purpose.

	•	Quickstart: Create a Blob container with the Azure CLI
	•	Tutorial: Create Blob storage resources with Terraform

Check:
Upload a test file with az storage blob upload and confirm you can list and read it back.

Use a dedicated container per environment (e.g. cloudprem-prod, cloudprem-staging) and apply least-privilege IAM roles at the container scope, not account-wide.

4. Client Identity & Permissions

An Azure AD application must be granted read/write access to the Blob container. CloudPrem will use this identity to interact with storage.
Check:
Ensure the identity has the Storage Blob Data Contributor role assigned on the container or storage account.

5. NGINX Ingress Controller

CloudPrem services are exposed via HTTP(S). An NGINX ingress controller should be installed in your AKS cluster to provide routing and TLS termination.
Check:
Run `kubectl get pods -n ingress-nginx` and confirm controller pods are healthy.

6. Datadog Agent

<!-- For observability, deploy the Datadog Agent on your AKS cluster. The Agent collects metrics, logs, and traces from CloudPrem workloads.
Check:
Run kubectl get pods -n datadog and confirm the Agent pods are running, and check Datadog to see cluster metrics appearing. -->


<!-- This guide covers how to configure your AWS account prerequisites for CloudPrem deployment. This configuration is required before installing CloudPrem on AWS EKS.

For the complete AKS installation process, see the [Azure AKS Installation Guide](../install/azure-aks/).

## AWS prerequisites

To deploy CloudPrem on AWS, you need to configure:
- AWS credentials and authentication
- AWS region selection
- IAM permissions for S3 object storage
- RDS PostgreSQL database (recommended)
- EKS cluster with AWS Load Balancer Controller

## AWS credentials

When starting a node, CloudPrem attempts to find AWS credentials using the credential provider chain implemented by [rusoto\_core::ChainProvider][2] and looks for credentials in this order:

1. Environment variables `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, or `AWS_SESSION_TOKEN` (optional).
2. Credential profiles file, typically located at `~/.aws/credentials` or otherwise specified by the `AWS_SHARED_CREDENTIALS_FILE` and `AWS_PROFILE` environment variables if set and not empty.
3. Amazon ECS container credentials, loaded from the Amazon ECS container if the environment variable `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI` is set.
4. Instance profile credentials, used on Amazon EC2 instances, and delivered through the Amazon EC2 metadata service.

An error is returned if no credentials are found in the chain.

## AWS Region

CloudPrem attempts to find the AWS region from multiple sources, using the following order of precedence:

1. **Environment variables**: Checks `AWS_REGION`, then `AWS_DEFAULT_REGION`.
2. **AWS config file**: Typically located at `~/.aws/config`, or at the path specified by the `AWS_CONFIG_FILE` environment variable (if set and not empty).
3. **EC2 instance metadata**: Uses the region of the currently running Amazon EC2 instance.
4. **Default**: Falls back to `us-east-1` if no other source provides a region.

## IAM permissions for S3

Required authorized actions:

* `ListBucket` (on the bucket directly)
* `GetObject`
* `PutObject`
* `DeleteObject`
* `ListMultipartUploadParts`
* `AbortMultipartUpload`

Here is an example of a bucket policy:

```

{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Effect": "Allow",
     "Action": [
       "s3:ListBucket"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket"
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
       "arn:aws:s3:::my-bucket/*"
     ]
   }
 ]
}
```

## Next steps

After completing the AWS configuration:

1. **Install CloudPrem on EKS** - Follow the [AWS EKS Installation Guide](../install/aws-eks/) to deploy CloudPrem
2. **Configure ingress** - Set up [ingress configuration](./ingress/) for external access
3. **Set up log ingestion** - Configure [log ingestion](../ingest-logs/) to start sending logs to CloudPrem

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloudprem/configure/ingress/
[2]: https://docs.rs/rusoto_credential/latest/rusoto_credential/struct.ChainProvider.html -->
