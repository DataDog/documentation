---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Block all public access to an existing S3 bucket and its contents.
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/BlockPublicAccessInputs'
inputFieldOrder:
- region
- bucket
output: '#/$defs/BlockPublicAccessOutputs'
permissions:
- s3:PutBucketPublicAccessBlock
source: amazon-s3
title: Block public access
---

Block all public access to an existing S3 bucket and its contents.

{{< workflows >}}
