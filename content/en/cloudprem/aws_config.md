---
title: AWS Configuration
description: Learn how to configure AWS for CloudPrem
private: true
further_reading:
- link: "/cloudprem/"
  tag: "Documentation"
  text: "CloudPrem Overview"
- link: "/cloudprem/installation/"
  tag: "Documentation"
  text: "Install CloudPrem and Send Logs with the Agent"
- link: "/cloudprem/ingress/"
  tag: "Documentation"
  text: "Configure CloudPrem Ingress"
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

## Overview

This guide covers how to configure your AWS account for CloudPrem. For ingress configuration, see [CloudPrem Ingress Configuration][1].

To deploy CloudPrem on AWS, you need to configure:
- AWS credentials
- AWS region
- IAM permissions for S3

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloudprem/ingress/
[2]: https://docs.rs/rusoto_credential/latest/rusoto_credential/struct.ChainProvider.html
