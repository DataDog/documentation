---
bundle: com.datadoghq.aws.route53
bundle_title: AWS Route53
description: Disassociate a firewall rule group from a VPC, to remove DNS filtering
  from the VPC.
icon:
  integration_id: amazon-route-53
  type: integration_logo
input: '#/$defs/DisassociateFirewallRuleGroupInputs'
inputFieldOrder:
- region
- associationId
output: '#/$defs/DisassociateFirewallRuleGroupOutputs'
permissions:
- route53resolver:DisassociateFirewallRuleGroup
source: amazon-route-53
title: Disassociate firewall rule group
---

Disassociate a firewall rule group from a VPC, to remove DNS filtering from the VPC.

{{< workflows >}}
