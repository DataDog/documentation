---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Retrieve all metadata from an object, without returning the object itself.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/GetObjectAttributesInputs'
inputFieldOrder:
- region
- bucket
- key
- versionId
- expectedBucketOwner
keywords:
- describe
- get
- lookup
output: '#/$defs/GetObjectAttributesOutputs'
permissions:
- s3:GetObject
- s3:GetObjectAttributes
- s3:GetObjectVersion
source: amazon-s3
stability: stable
title: Get object attributes
---

Retrieve all metadata from an object, without returning the object itself.

{{< workflows >}}
