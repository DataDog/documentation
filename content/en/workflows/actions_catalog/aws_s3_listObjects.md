---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Return up to 1,000 objects in a bucket with each request.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/ListObjectsInputs'
inputFieldOrder:
- region
- bucket
- prefix
- startAfter
- expectedBucketOwner
- maxKeys
keywords:
- all
- list
output: '#/$defs/ListObjectsOutputs'
permissions:
- s3:ListBucket
source: amazon-s3
stability: stable
title: List objects
---

Return up to 1,000 objects in a bucket with each request.

{{< workflows >}}
