---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Modify the rules of a security group.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/ModifySecurityGroupRulesInputs'
inputFieldOrder:
- region
- groupId
- securityGroupRules
keywords:
- modify
- put
- set
- update
output: '#/$defs/ModifySecurityGroupRulesOutputs'
permissions:
- ec2:ModifySecurityGroupRules
source: amazon-ec2
title: Modify security group rules
---

Modify the rules of a security group.

{{< workflows >}}
