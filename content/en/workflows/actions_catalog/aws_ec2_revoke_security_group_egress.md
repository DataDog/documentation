---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Remove outbound (egress) rules from a security group.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/RevokeSecurityGroupEgressInputs'
inputFieldOrder:
- region
- groupId
- ipPermissions
output: '#/$defs/RevokeSecurityGroupEgressOutputs'
permissions:
- ec2:RevokeSecurityGroupEgress
source: amazon-ec2
title: Revoke security group egress
---

Remove outbound (egress) rules from a security group.

{{< workflows >}}
