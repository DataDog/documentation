---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Set the logging parameters for a bucket, and specify permissions for
  who can view and modify the logging parameters.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/DisableBucketLoggingInputs'
inputFieldOrder:
- region
- bucket
keywords:
- deactivate
- disable
- cancel
output: '#/$defs/DisableBucketLoggingOutputs'
permissions:
- s3:PutBucketLogging
source: amazon-s3
stability: stable
title: Disable bucket logging
---

Set the logging parameters for a bucket, and specify permissions for who can view and modify the logging parameters.

{{< workflows >}}
