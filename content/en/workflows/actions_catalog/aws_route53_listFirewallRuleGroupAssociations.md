---
bundle: com.datadoghq.aws.route53
bundle_title: AWS Route53
description: Retrieve any defined firewall rule group associations. Each association
  enables DNS filtering for a VPC with one rule group.
icon:
  integration_id: amazon-route-53
  type: integration_logo
input: '#/$defs/ListFirewallRuleGroupAssociationsInputs'
inputFieldOrder:
- region
- firewallRuleGroupId
- vpcId
keywords:
- all
- list
output: '#/$defs/ListFirewallRuleGroupAssociationsOutputs'
permissions:
- route53resolver:ListFirewallRuleGroupAssociations
source: amazon-route-53
title: List firewall rule group associations
---

Retrieve any defined firewall rule group associations. Each association enables DNS filtering for a VPC with one rule group.

{{< workflows >}}
