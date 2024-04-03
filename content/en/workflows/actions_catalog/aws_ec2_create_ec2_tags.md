---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Add or overwrite tags for EC2 resources.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/CreateEc2TagsInputs'
inputFieldOrder:
- region
- resourceId
- tags
output: '#/$defs/CreateEc2TagsOutputs'
permissions:
- ec2:CreateTags
source: amazon-ec2
title: Create EC2 tags
---

Add or overwrite tags for EC2 resources.

{{< workflows >}}
