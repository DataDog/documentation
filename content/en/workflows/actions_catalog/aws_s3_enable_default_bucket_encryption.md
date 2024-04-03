---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Configure default encryption and S3 bucket keys for an existing bucket.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/EnableDefaultBucketEncryptionInputs'
inputFieldOrder:
- region
- bucket
- keyType
- keyName
keywords:
- allow
- authorize
- enable
output: '#/$defs/EnableDefaultBucketEncryptionOutputs'
permissions:
- s3:PutEncryptionConfiguration
- s3:GetEncryptionConfiguration
source: amazon-s3
title: Enable default bucket encryption
---

Configure default encryption and S3 bucket keys for an existing bucket.

{{< workflows >}}
