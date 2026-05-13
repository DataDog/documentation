---
title: Secret Scanning Configuration
algolia:
  tags: ['static analysis', 'ci pipeline', 'SAST', 'secret scanning']
description: Reference documentation for Datadog Secret Scanning (SAST) configuration, covering rule CRUD.
---

By default, Datadog Secret Scanning will scan enabled repositories with all rules in the managed scanning group, which contains all [rules in the Secrets & Credentials category of Sensitive Data Scanner](https://docs.datadoghq.com/security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials). You can customize which rules run, modify default rules, and create custom rules in the ['Code' configuration page](https://app.datadoghq.com/sensitive-data-scanner/configuration/code) in SDS.

## Managed scanning group
The managed scanning group is managed by Datadog's security team. It automatically receives new rules and updates to rules, and is enabled by default for all organizations.

## Custom rule scanning group
The custom scanning group is managed by user orgs. You can [create and test custom regex rules](https://docs.datadoghq.com/security/sensitive_data_scanner/scanning_rules/custom_rules/) or add rules from the SDS rules library.

## Configuring rules
### Customizing default rules
You can customize the severity and keywords of managed default rules by hovering over the specific rule, then clicking the pencil icon at the right. After editing and pressing **Update** at the bottom right, the edited rule will appear as **Customized** in the managed scanning group.
<div class="alert alert-info">Customized rules will **not** automatically receive severity/default keyword updates from the Datadog's security team. To restore a rule to its managed state, hover over a customized rule and click the restore icon at the right. </div>

### Creating custom rules
You can create custom rules in the custom scanning group. Click 'Add scanning rule' at the bottom or 'Add rule' at the top right, create your regex rule, then configure the severity and keywords. Once enabled, new rules will be scanned for in your repositories upon the next commit.
Once created, you can update custom rules by hovering over the rule, then clicking the pencil icon at the right.

### Disabling rules
Disable a rule by clicking the blue toggle on the right.
<div class="alert alert-info">Once a specific rule is disabled, existing findings from that rule will be auto-closed in Secret Scanning upon the next commit.</div>
