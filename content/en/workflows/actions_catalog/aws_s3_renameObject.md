---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Rename an object's key in a bucket. For cases where users want to make
  changes across buckets they should use the move action first.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/RenameObjectInputs'
inputFieldOrder:
- region
- bucket
- originalKey
- newKey
output: '#/$defs/RenameObjectOutputs'
permissions:
- s3:GetObject
- s3:PutObject
- s3:GetObjectVersion
- s3:DeleteObject
- s3:DeleteObjectVersion
source: amazon-s3
stability: stable
title: Rename object
---

Rename an object's key in a bucket. For cases where users want to make changes across buckets they should use the move action first.

{{< workflows >}}
