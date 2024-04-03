---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Move an object from one bucket to another. To make changes to the key
  name, use the `Rename` action next.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/MoveObjectInputs'
inputFieldOrder:
- region
- sourceBucket
- destinationBucket
- key
output: '#/$defs/MoveObjectOutputs'
permissions:
- s3:GetObject
- s3:PutObject
- s3:GetObjectVersion
- s3:DeleteObject
- s3:DeleteObjectVersion
source: amazon-s3
stability: stable
title: Move object
---

Move an object from one bucket to another. To make changes to the key name, use the `Rename` action next.

{{< workflows >}}
