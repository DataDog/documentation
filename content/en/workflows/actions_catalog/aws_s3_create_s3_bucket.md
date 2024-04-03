---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Create a new S3 bucket.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/CreateS3BucketInputs'
inputFieldOrder:
- region
- bucket
- cannedAcl
output: '#/$defs/CreateS3BucketOutputs'
permissions:
- s3:CreateBucket
source: amazon-s3
title: Create bucket
---

Create a new S3 bucket.

{{< workflows >}}
