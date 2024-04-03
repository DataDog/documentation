---
bundle: com.datadoghq.aws.route53
bundle_title: AWS Route53
description: Associate a firewall rule group with a VPC, to provide DNS filtering
  for the VPC.
icon:
  integration_id: amazon-route-53
  type: integration_logo
input: '#/$defs/AssociateFirewallRuleGroupInputs'
inputFieldOrder:
- region
- firewallRuleGroupId
- name
- priority
- vpcId
- creatorRequestId
output: '#/$defs/AssociateFirewallRuleGroupOutputs'
permissions:
- route53resolver:AssociateFirewallRuleGroup
- route53resolver:ListFirewallRuleGroupAssociations
source: amazon-route-53
title: Associate firewall rule group
---

Associate a firewall rule group with a VPC, to provide DNS filtering for the VPC.

{{< workflows >}}
