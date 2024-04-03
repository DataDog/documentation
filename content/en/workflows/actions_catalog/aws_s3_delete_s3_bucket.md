---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Delete an S3 bucket.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/DeleteS3BucketInputs'
inputFieldOrder:
- region
- bucket
- expectedBucketOwner
keywords:
- delete
- remove
output: '#/$defs/DeleteS3BucketOutputs'
permissions:
- s3:DeleteBucket
source: amazon-s3
title: Delete bucket
---

Delete an S3 bucket.

{{< workflows >}}
