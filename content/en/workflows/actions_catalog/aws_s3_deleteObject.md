---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Remove the null version (if there is one) of an object and insert a `delete`
  marker. If there isn't a null version, Amazon S3 does not remove any objects but
  still responds that the command was successful.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/DeleteObjectInputs'
inputFieldOrder:
- region
- bucket
- key
- versionId
- expectedBucketOwner
keywords:
- delete
- remove
output: '#/$defs/DeleteObjectOutputs'
permissions:
- s3:DeleteObject
- s3:DeleteObjectVersion
source: amazon-s3
stability: stable
title: Delete object
---

Remove the null version (if there is one) of an object and insert a `delete` marker. If there isn't a null version, Amazon S3 does not remove any objects but still responds that the command was successful.

{{< workflows >}}
