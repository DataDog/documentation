---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Return the default encryption configuration for an S3 bucket.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/GetS3BucketEncryptionInputs'
inputFieldOrder:
- region
- bucket
- expectedBucketOwner
keywords:
- describe
- get
- lookup
output: '#/$defs/GetS3BucketEncryptionOutputs'
permissions:
- s3:GetEncryptionConfiguration
source: amazon-s3
title: Get bucket encryption
---

Return the default encryption configuration for an S3 bucket.

{{< workflows >}}
