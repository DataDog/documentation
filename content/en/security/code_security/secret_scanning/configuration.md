---
title: Secret Scanning Configuration
algolia:
  tags: ['static analysis', 'ci pipeline', 'SAST', 'secret scanning']
description: Reference documentation for Datadog Secret Scanning (SAST) configuration, covering rule CRUD.
---

By default, Datadog Secret Scanning scans enabled repositories with all rules in the managed scanning group, which contains all [rules in the Secrets & Credentials category of Sensitive Data Scanner](https://docs.datadoghq.com/security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials). You can customize which rules run, modify default rules, and create custom rules in the ['Code' configuration page](https://app.datadoghq.com/sensitive-data-scanner/configuration/code) in SDS.

## Managed scanning group
The managed scanning group is managed by Datadog's security team. It automatically receives new rules and updates to rules, and is enabled by default for all organizations.

{{< img src="/code_security/secret_scanning/managed_scanning_group_not_customized.png" alt="Managed scanning group" style="width:100%;">}}

## Custom rule scanning group
The custom scanning group is managed by user orgs. You can [create and test custom regex rules](https://docs.datadoghq.com/security/sensitive_data_scanner/scanning_rules/custom_rules/) or add rules from the SDS rules library.

{{< img src="/code_security/secret_scanning/custom_scanning_group.png" alt="Managed scanning group" style="width:100%;">}}

## Configuring rules
### Customizing default rules
You can customize the severity and keywords of managed default rules by hovering over the specific rule, then clicking the pencil icon at the right.

{{< img src="/code_security/secret_scanning/configure_default_rule.png" alt="Edit rule" style="width:100%;">}}

After editing and pressing **Update** at the bottom right, the edited rule appears as **Customized** in the managed scanning group.

{{< img src="/code_security/secret_scanning/managed_scanning_group.png" alt="Customized secret scanning rule in managed group" style="width:100%;">}}

<div class="alert alert-info">Customized rules do not automatically receive severity/default keyword updates from Datadog's security team. To restore a rule to its managed state, hover over a customized rule and click the restore icon at the right. </div>

### Creating custom rules
You can create custom rules in the custom scanning group. Click 'Add scanning rule' at the bottom or 'Add rule' at the top right, create your regex rule, then configure the severity and keywords. After they're enabled, new rules are scanned for in your repositories upon the next commit.

{{< img src="/code_security/secret_scanning/add_to_custom.png" alt="Add rule to custom group" style="width:100%;">}}

You can update custom rules by hovering over the rule, then clicking the pencil icon at the right.

### Disabling rules
Disable a rule by clicking the blue toggle on the right.

<div class="alert alert-info">Once a specific rule is disabled, existing findings from that rule are auto-closed in Secret Scanning upon the next commit.</div>
