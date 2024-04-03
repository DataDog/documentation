---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Delete tags from EC2 resources.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DeleteEc2TagsInputs'
inputFieldOrder:
- region
- resourceId
- tags
keywords:
- delete
- remove
output: '#/$defs/DeleteEc2TagsOutputs'
permissions:
- ec2:DeleteTags
source: amazon-ec2
title: Delete EC2 tags
---

Delete tags from EC2 resources.

{{< workflows >}}
