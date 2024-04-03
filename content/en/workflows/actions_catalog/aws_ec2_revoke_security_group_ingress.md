---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Remove inbound (ingress) rules from a security group.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/RevokeSecurityGroupIngressInputs'
inputFieldOrder:
- region
- ipPermissions
- groupId
- groupName
output: '#/$defs/RevokeSecurityGroupIngressOutputs'
permissions:
- ec2:RevokeSecurityGroupIngress
source: amazon-ec2
title: Revoke security group ingress
---

Remove inbound (ingress) rules from a security group.

{{< workflows >}}
