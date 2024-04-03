---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Describe the specified Load Balancers. You can specify either their ARNs
  or their names.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/DescribeLoadBancersInputs'
inputFieldOrder:
- region
- loadBalancerARNs
- pageSize
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeLoadBalancersOutputs'
permissions:
- elasticloadbalancing:DescribeLoadBalancers
source: amazon-elb
title: List load balancers
---

Describe the specified Load Balancers. You can specify either their ARNs or their names.

{{< workflows >}}
