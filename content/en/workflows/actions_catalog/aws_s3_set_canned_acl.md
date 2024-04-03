---
bundle: com.datadoghq.aws.s3
bundle_title: AWS S3
description: Set the permissions on an existing bucket using access control lists
  (ACL).
icon:
  integration_id: amazon-s3
  type: integration_logo
input: '#/$defs/SetCannedAclInputs'
inputFieldOrder:
- region
- bucket
- cannedAcl
keywords:
- modify
- put
- set
- update
output: '#/$defs/SetCannedAclOutputs'
permissions:
- s3:PutBucketAcl
source: amazon-s3
title: Set canned ACL
---

Set the permissions on an existing bucket using access control lists (ACL).

{{< workflows >}}
