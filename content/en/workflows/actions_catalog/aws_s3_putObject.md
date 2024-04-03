---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Add an object to a bucket. You must have `WRITE` permissions on a bucket
  to add an object.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/PutObjectInputs'
inputFieldOrder:
- region
- bucket
- key
- body
- cannedAcl
- contentType
- serverSideEncryption
- storageClass
- expectedBucketOwner
keywords:
- modify
- put
- set
- update
output: '#/$defs/PutObjectOutputs'
permissions:
- s3:PutObject
source: amazon-s3
stability: stable
title: Put object
---

Add an object to a bucket. You must have `WRITE` permissions on a bucket to add an object.

{{< workflows >}}
