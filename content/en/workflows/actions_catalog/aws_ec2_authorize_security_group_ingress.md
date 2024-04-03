---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Add inbound (ingress) rules to a security group.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/AuthorizeSecurityGroupIngressInputs'
inputFieldOrder:
- region
- ipPermissions
- groupId
- groupName
keywords:
- allow
- authorize
- enable
output: '#/$defs/AuthorizeSecurityGroupIngressOutputs'
permissions:
- ec2:AuthorizeSecurityGroupIngress
source: amazon-ec2
title: Authorize security group ingress
---

Add inbound (ingress) rules to a security group.

{{< workflows >}}
