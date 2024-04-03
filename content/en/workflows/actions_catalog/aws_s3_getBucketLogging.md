---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Return the logging status of a bucket, and the permissions users have
  to view and modify that status.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/GetBucketLoggingInputs'
inputFieldOrder:
- region
- bucket
keywords:
- describe
- get
- lookup
output: '#/$defs/GetBucketLoggingOutputs'
permissions:
- s3:GetBucketLogging
source: amazon-s3
stability: stable
title: Get bucket logging
---

Return the logging status of a bucket, and the permissions users have to view and modify that status.

{{< workflows >}}
