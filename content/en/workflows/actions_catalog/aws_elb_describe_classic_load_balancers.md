---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Describe the specified classic load balancers. If no load balancers are
  specified, the call describes all of your load balancers.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/DescribeClassicLoadBancersInputs'
inputFieldOrder:
- region
- loadBalancerNames
- pageSize
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeClassicLoadBalancersOutputs'
permissions:
- elasticloadbalancing:DescribeLoadBalancers
source: amazon-elb
title: List classic load balancers
---

Describe the specified classic load balancers. If no load balancers are specified, the call describes all of your load balancers.

{{< workflows >}}
