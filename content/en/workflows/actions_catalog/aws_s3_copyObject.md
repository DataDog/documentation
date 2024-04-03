---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Create a copy of an object that is already stored in Amazon S3.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/CopyObjectInputs'
inputFieldOrder:
- region
- sourceBucket
- sourceKey
- destinationKey
- destinationBucket
- expectedSourceBucketOwner
- expectedBucketOwner
output: '#/$defs/CopyObjectOutputs'
permissions:
- s3:GetObject
- s3:PutObject
- s3:GetObjectVersion
source: amazon-s3
stability: stable
title: Copy object
---

Create a copy of an object that is already stored in Amazon S3.

{{< workflows >}}
