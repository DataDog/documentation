---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Describe one or more of your security group rules.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DescribeSecurityGroupRulesInputs'
inputFieldOrder:
- region
- filters
- securityGroupRuleIds
- maxResults
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeSecurityGroupRulesOutputs'
permissions:
- ec2:DescribeSecurityGroupRules
source: amazon-ec2
title: List security group rules
---

Describe one or more of your security group rules.

{{< workflows >}}
