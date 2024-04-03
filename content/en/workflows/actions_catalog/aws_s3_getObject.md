---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Retrieve objects from Amazon S3.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/GetObjectInputs'
inputFieldOrder:
- region
- bucket
- key
- versionId
- expectedBucketOwner
- responseParsing
- responseEncoding
keywords:
- describe
- get
- lookup
output: '#/$defs/GetObjectOutputs'
permissions:
- s3:GetObject
- s3:GetObjectVersion
source: amazon-s3
stability: stable
title: Get object
---

Retrieve objects from Amazon S3.

{{< workflows >}}
