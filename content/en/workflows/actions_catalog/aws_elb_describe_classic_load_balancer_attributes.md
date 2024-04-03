---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Describe the attributes of a classic load balancer.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/DescribeClassicLoadBalancerAttributesInputs'
inputFieldOrder:
- region
- name
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeClassicLoadBalancerAttributesOutputs'
permissions:
- elasticloadbalancing:DescribeLoadBalancerAttributes
source: amazon-elb
title: Describe classic load balancer attributes
---

Describe the attributes of a classic load balancer.

{{< workflows >}}
