---
title: Advanced Configuration
description: Learn about advanced deployment scenarios and customization options for CloudPrem
further_reading:
- link: "/cloudprem/"
  tag: "Documentation"
  text: "Learn more about CloudPrem"
- link: "/cloudprem/installation/"
  tag: "Documentation"
  text: "CloudPrem Installation"
- link: "/cloudprem/ingress/"
  tag: "Documentation"
  text: "Ingress Configuration"
- link: "/cloudprem/cluster/"
  tag: "Documentation"
  text: "Cluster Sizing and Operations"
- link: "/cloudprem/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting CloudPrem"
---

## Overview

This guide covers advanced configuration options and deployment scenarios for CloudPrem, including multiple cluster deployments, advanced processing features, and integration with external tools. For ingress configuration, refer to the [Ingress Configuration guide](/cloudprem/ingress/).

## AWS setup

Setting up a CloudPrem cluster on AWS requires the configuration of the following elements:

{{% collapse-content title="AWS credentials" level="h4" expanded=false %}}
When starting a node, CloudPrem attempts to find AWS credentials using the credential provider chain implemented by [rusoto\_core::ChainProvider](https://docs.rs/rusoto_credential/latest/rusoto_credential/struct.ChainProvider.html) and looks for credentials in this order:

1. Environment variables `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, or `AWS_SESSION_TOKEN` (optional).  
2. Credential profiles file, typically located at `~/.aws/credentials` or otherwise specified by the `AWS_SHARED_CREDENTIALS_FILE` and `AWS_PROFILE` environment variables if set and not empty.  
3. Amazon ECS container credentials, loaded from the Amazon ECS container if the environment variable `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI` is set.  
4. Instance profile credentials, used on Amazon EC2 instances, and delivered through the Amazon EC2 metadata service.

An error is returned if no credentials are found in the chain.
{{% /collapse-content %}}

{{% collapse-content title="AWS region" level="h4" expanded=false %}}
CloudPrem attempts to find an AWS region in multiple locations and with the following order of precedence:

1. Environment variables (`AWS_REGION` then `AWS_DEFAULT_REGION`)  
2. Config file, typically located at `~/.aws/config` or otherwise specified by the `AWS_CONFIG_FILE` environment variable if set and not empty.  
3. Amazon EC2 instance metadata service indicating the region of the currently running Amazon EC2 instance.  
4. Default value: `us-east-1`
{{% /collapse-content %}}

{{% collapse-content title="IAM permissions for Amazon S3" level="h4" expanded=false %}}
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
{{% /collapse-content %}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}} 