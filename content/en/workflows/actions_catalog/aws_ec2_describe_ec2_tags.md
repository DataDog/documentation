---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Describe tags for EC2 resources.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DescribeEc2TagsInputs'
inputFieldOrder:
- region
- resourceId
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeEc2TagsOutputs'
permissions:
- ec2:DescribeTags
source: amazon-ec2
title: Describe EC2 tags
---

Describe tags for EC2 resources.

{{< workflows >}}
