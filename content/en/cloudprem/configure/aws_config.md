---
title: AWS Configuration
description: Learn how to configure AWS for CloudPrem
further_reading:
- link: "/cloudprem/install/aws_eks/"
  tag: "Documentation"
  text: "Install CloudPrem on AWS EKS"
- link: "/cloudprem/ingest_logs/"
  tag: "Documentation"
  text: "Configure Log Ingestion"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

This guide covers how to configure your AWS account prerequisites for CloudPrem deployment. This configuration is required before installing CloudPrem on AWS EKS.

For the complete EKS installation process, see the [AWS EKS Installation Guide][1].

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

1. **Install CloudPrem on EKS** - Follow the [AWS EKS Installation Guide][1] to deploy CloudPrem
2. **Configure ingress** - Set up [ingress configuration][3] for external access
3. **Set up log ingestion** - Configure [log ingestion][4] to start sending logs to CloudPrem

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloudprem/install/aws_eks
[2]: https://docs.rs/rusoto_credential/latest/rusoto_credential/struct.ChainProvider.html
[3]: /cloudprem/configure/ingress/
[4]: /cloudprem/ingest_logs/
