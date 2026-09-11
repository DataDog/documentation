---
title: Configuration
algolia:
  tags: ['static analysis', 'ci pipeline', 'SAST', 'secret scanning']
description: Configure Datadog Secret Scanning rules and the files that are scanned.
---

By default, Datadog Secret Scanning scans enabled repositories with all [rules in the Secrets & Credentials category of Sensitive Data Scanner][1]. You can customize which rules run, modify default rules, and create custom rules on the [{{< ui >}}Code{{< /ui >}} configuration page][2] in SDS.

The rules, scanning groups, and custom rules described on this page are configured in Datadog. A configuration file in your repository adds separate control over which files are scanned. See [File configuration](#file-configuration).
## Scanning groups
There are two scanning groups that configure Secret Scanning rules.
### Managed scanning group
The managed scanning group is managed by Datadog's security team. It automatically receives new rules and updates to rules, and is enabled by default for all organizations.

{{< img src="/code_security/secret_scanning/managed_scanning_group_not_customized.png" alt="Managed scanning group" style="width:100%;">}}

### Custom rule scanning group
The custom scanning group is managed by user orgs. You can [create and test custom regex rules][3] or add rules from the SDS rules library.

{{< img src="/code_security/secret_scanning/custom_scanning_group.png" alt="Custom scanning group" style="width:100%;">}}

## Configuring rules
### Customizing default rules
To customize the severity and keywords of a managed default rule, hover over the rule and click the pencil icon on the right.
{{< img src="/code_security/secret_scanning/customize_default_rule.png" alt="Edit rule" style="width:100%;">}}

The edit dialog opens.
{{< img src="/code_security/secret_scanning/configure_default_rule.png" alt="Edit rule popup" style="width:100%;">}}

After editing the rule and clicking {{< ui >}}Update{{< /ui >}} at the bottom right, the modified rule appears as {{< ui >}}Customized{{< /ui >}} in the managed scanning group.

{{< img src="/code_security/secret_scanning/disable_rule.png" alt="Customized secret scanning rule in managed group" style="width:100%;">}}

<div class="alert alert-info">Customized rules do not automatically receive severity/default keyword updates from Datadog's security team. To restore a rule to its managed state, hover over a customized rule and click the restore icon at the right. </div>

### Creating custom rules
To create a custom rule, go to the custom scanning group and click {{< ui >}}Add scanning rule{{< /ui >}} at the bottom or {{< ui >}}Add rule{{< /ui >}} at the top right. Create your regex rule, then configure the severity and keywords. After they're enabled, your repositories are scanned with the new rules on the next commit.

{{< img src="/code_security/secret_scanning/add_to_custom.png" alt="Add rule to custom group" style="width:100%;">}}

To update a custom rule, hover over the rule and click the pencil icon on the right.

### Disabling rules
Disable a rule by clicking the blue toggle on the right.

<div class="alert alert-info">After a specific rule is disabled, existing findings from that rule are auto-closed in Secret Scanning on the next commit.</div>

## File configuration

Rules are configured in Datadog as described in the [Configuring rules](#configuring-rules) section. Which files Secret Scanning reads is configured under the `secrets` key in the Code Security configuration. Define it in Datadog, or in a `code-security.datadog.yaml` file at the root of your repository.

For information on configuration locations, precedence, and merging, see [Code Security Configuration Reference][4].

The configuration must begin with `schema-version: v1.5`, followed by a `secrets` key containing a `global-config` object. The `global-config` object controls repository-wide settings:

| **Property** | **Type** | **Description** | **Default** |
| --- | --- | --- | --- |
| `only-paths` | Array | File paths or glob patterns. Only matching files are analyzed. | None |
| `ignore-paths` | Array | File paths or glob patterns to exclude. Matching files are not analyzed. | None |
| `use-gitignore` | Boolean | Whether to include entries from the `.gitignore` file in `ignore-paths`. | `true` |
| `ignore-generated-files` | Boolean | Whether to include common generated file patterns in `ignore-paths`. | `true` |
| `max-file-size-kb` | Number | Maximum file size (in kB) to analyze. Larger files are ignored. | `10240` |

### Example configuration

{{< code-block lang="yaml" >}}
schema-version: v1.5
secrets:
  global-config:
    # Only analyze the following paths/files
    only-paths:
      - "src"
      - "**/*.py"
    # Do not analyze the following paths/files
    ignore-paths:
      - "tests"
      - "**/*.lock"
    use-gitignore: true
    ignore-generated-files: true
    max-file-size-kb: 10240
{{< /code-block >}}

[1]: /security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials
[2]: https://app.datadoghq.com/sensitive-data-scanner/configuration/code
[3]: /security/sensitive_data_scanner/scanning_rules/custom_rules/
[4]: /security/code_security/guides/configuration/
