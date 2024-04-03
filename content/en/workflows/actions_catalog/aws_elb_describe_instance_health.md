---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Describe the health of instances registered with a classic load balancer.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/DescribeInstanceHealthInputs'
inputFieldOrder:
- region
- name
- instanceIds
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeInstanceHealthOutputs'
permissions:
- elasticloadbalancing:DescribeInstanceHealth
source: amazon-elb
title: Describe classic load balancer instance health
---

Describe the health of instances registered with a classic load balancer.

{{< workflows >}}
