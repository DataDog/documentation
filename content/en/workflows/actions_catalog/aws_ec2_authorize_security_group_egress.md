---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Add outbound (egress) rules to a security group.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/AuthorizeSecurityGroupEgressInputs'
inputFieldOrder:
- region
- ipPermissions
- groupId
keywords:
- allow
- authorize
- enable
output: '#/$defs/AuthorizeSecurityGroupEgressOutputs'
permissions:
- ec2:AuthorizeSecurityGroupEgress
source: amazon-ec2
title: Authorize security group egress
---

Add outbound (egress) rules to a security group.

{{< workflows >}}
