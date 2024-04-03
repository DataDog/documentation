---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Describe the attributes of a load balancer.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/DescribeLoadBalancerAttributesInputs'
inputFieldOrder:
- region
- loadBalancerARN
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeLoadBalancerAttributesOutputs'
permissions:
- elasticloadbalancing:DescribeLoadBalancerAttributes
source: amazon-elb
title: Describe load balancer attributes
---

Describe the attributes of a load balancer.

{{< workflows >}}
