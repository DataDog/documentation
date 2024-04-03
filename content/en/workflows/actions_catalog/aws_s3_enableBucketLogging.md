---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Set the logging parameters for a bucket, and specify permissions for
  who can view and modify the logging parameters.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/EnableBucketLoggingInputs'
inputFieldOrder:
- region
- bucket
- targetBucket
- targetPrefix
- targetGrants
keywords:
- allow
- authorize
- enable
output: '#/$defs/EnableBucketLoggingOutputs'
permissions:
- s3:PutBucketLogging
- s3:GetBucketLogging
source: amazon-s3
stability: stable
title: Enable bucket logging
---

Set the logging parameters for a bucket, and specify permissions for who can view and modify the logging parameters.

{{< workflows >}}
