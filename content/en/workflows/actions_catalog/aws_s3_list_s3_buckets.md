---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Return a list of all buckets owned by the authenticated sender of the
  request.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/ListS3BucketsInputs'
inputFieldOrder:
- region
keywords:
- all
- list
output: '#/$defs/ListS3BucketsOutputs'
permissions:
- s3:ListBucket
source: amazon-s3
title: List buckets
---

Return a list of all buckets owned by the authenticated sender of the request.

{{< workflows >}}
