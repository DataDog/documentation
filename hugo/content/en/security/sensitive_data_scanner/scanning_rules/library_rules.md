---
title: Sensitive Data Scanner Library Rules
description: Browse Sensitive Data Scanner's predefined rule library for detecting email addresses, credit card numbers, API keys, credentials, IP addresses, and other sensitive patterns across logs, APM, RUM, and cloud storage.
aliases:
  - /sensitive_data_scanner/library_rules/
  - /sensitive_data_scanner/scanning_rules/library_rules
further_reading:
    - link: "/security/sensitive_data_scanner/"
      tag: "Documentation"
      text: "Set up Sensitive Data Scanner"
---

## Overview
The Scanning Rule Library is a collection of predefined rules for detecting common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more. The recommended keywords are used by default when library rules are created.

These rules can also be viewed in Datadog:

1. Navigate to [Sensitive Data Scanner][1].
1. Click {{< ui >}}Scanning Rules Library{{< /ui >}} on the top right side of the page.
1. To add rules from the library to a scanning group:<br />
   1. Select the rules you want to add.<br />
   1. Click {{< ui >}}Add Rules to Scanning Group{{< /ui >}}.<br />
   1. Follow the steps in [Set Up Sensitive Data Scanner][2] to finish the setup.

<div class="alert alert-info">Most library rules are available for all data sources (Logs, APM, RUM, Agent Observability, Observability Pipelines, Secret Scanning, and Cloud Storage). Check the <b>Available For</b> column to see which data sources each rule supports.</div>

{{< multifilter-search resource="sds_rules" >}}

## Reference library rules by ID

Each library rule has a stable **Rule ID** (the standard pattern ID), shown in the table above. Datadog may rename a library rule to correct or clarify it, but the rule ID never changes. When you manage scanning rules with Terraform or the API, reference library rules by rule ID instead of by name so that a rename does not break your configuration.

### Terraform

In the [`datadog_sensitive_data_scanner_standard_pattern`][3] data source, set `standard_pattern_id` instead of `filter`. This requires Datadog Terraform provider v4.5.0 or later.

```terraform
data "datadog_sensitive_data_scanner_standard_pattern" "aws_access_key" {
  # AWS Access Key ID Scanner
  standard_pattern_id = "OfGqX8R9TRqAcorxenl2fQ"
}

resource "datadog_sensitive_data_scanner_rule" "aws_access_key" {
  name                = "AWS Access Key ID Scanner"
  group_id            = datadog_sensitive_data_scanner_group.mygroup.id
  standard_pattern_id = data.datadog_sensitive_data_scanner_standard_pattern.aws_access_key.id
  is_enabled          = true
}
```

### API

When you [create a scanning rule][4] from a library rule, set the rule ID in `relationships.standard_pattern.data.id`. To list all library rules and their IDs, use the [List standard patterns][5] endpoint.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/
[2]: /security/sensitive_data_scanner/?#add-scanning-rules
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/sensitive_data_scanner_standard_pattern
[4]: /api/latest/sensitive-data-scanner/#create-scanning-rule
[5]: /api/latest/sensitive-data-scanner/#list-standard-patterns
