---
title: Sensitive Data Scanner Processor
disable_toc: false
further_reading:
- link: "/logs/guide/regex_log_parsing/"
  tag: "guide"
  text: "Writing Effective Grok Parsing Rules with Regular Expressions"
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

The Sensitive Data Scanner processor scans logs to detect and redact or hash sensitive information such as PII, PCI, and custom sensitive data. You can pick from Datadog's library of predefined rules, or input custom Regex rules to scan for sensitive data.

You can set up the pipeline and processor in the [UI](#set-up-the-processor-in-the-ui), [API][10], or [Terraform](#set-up-the-processor-using-terraform).

See [Best practices to optimize performance](#best-practices-to-optimize-performance) for tips on reducing resource usage.

## Set up the processor in the UI

To set up the processor:

1. Define a filter query. Only logs that match the specified filter query are scanned and processed. All logs are sent to the next step in the pipeline, regardless of whether they match the filter query. See [Search Syntax][1] for more information.
1. Click {{< ui >}}Add Scanning Rule{{< /ui >}}.
1. Select one of the following:

{{< tabs >}}
{{% tab "Library rules" %}}

1. In the dropdown menu, select the library rule you want to use.
1. Recommended keywords are automatically added based on the library rule selected. After the scanning rule has been added, you can [add additional keywords or remove recommended keywords](#add-additional-keywords).
1. In the {{< ui >}}Define rule target and conditions{{< /ui >}} section, select if you want to scan the {{< ui >}}Entire Event{{< /ui >}}, {{< ui >}}Specific Attributes{{< /ui >}}, or {{< ui >}}Exclude Attributes{{< /ui >}} in the dropdown menu.
    - If you are scanning the entire event, you can optionally exclude specific attributes from getting scanned. Use [path notation](#path-notation-example) (`outer_key.inner_key`) to access nested keys. For specified attributes with nested data, all nested data is excluded.
    - If you are scanning specific attributes, specify which attributes you want to scan. Use [path notation](#path-notation-example) (`outer_key.inner_key`) to access nested keys. For specified attributes with nested data, all nested data is scanned.
1. For {{< ui >}}Define actions on match{{< /ui >}}, select the action you want to take for the matched information. **Note**: Redaction, partial redaction, and hashing are all irreversible actions.
    - {{< ui >}}Redact{{< /ui >}}: Replaces all matching values with the text you specify in the {{< ui >}}Replacement text{{< /ui >}} field.
    - {{< ui >}}Partially Redact{{< /ui >}}: Replaces a specified portion of all matched data. In the {{< ui >}}Redact{{< /ui >}} section, specify the number of characters you want to redact and which part of the matched data to redact.
    - {{< ui >}}Hash{{< /ui >}}: Replaces all matched data with a unique identifier. The UTF-8 bytes of the match are hashed with the 64-bit fingerprint of FarmHash.
1. Optionally, click {{< ui >}}Add Field{{< /ui >}} to add tags you want to associate with the matched events.
1. Add a name for the scanning rule.
1. Optionally, add a description for the rule.
1. Click {{< ui >}}Save{{< /ui >}}.

### Add additional keywords

After adding scanning rules from the library, you can edit each rule separately and add additional keywords to the keyword dictionary.

1. Navigate to your [pipeline][1].
1. In the Sensitive Data Scanner processor with the rule you want to edit, click {{< ui >}}Manage Scanning Rules{{< /ui >}}.
1. Toggle {{< ui >}}Use recommended keywords{{< /ui >}} if you want the rule to use them. Otherwise, add your own keywords to the {{< ui >}}Create keyword dictionary{{< /ui >}} field. You can also require that these keywords be within a specified number of characters of a match. By default, keywords must be within 30 characters before a matched value.
1. Click {{< ui >}}Update{{< /ui >}}.

[1]: https://app.datadoghq.com/observability-pipelines

{{% /tab %}}
{{% tab "Custom rules" %}}

1. In the {{< ui >}}Define match conditions{{< /ui >}} section, specify the regex pattern to use for matching against events in the {{< ui >}}Define the regex{{< /ui >}} field. See [Writing Effective Grok Parsing Rules with Regular Expressions][1] for more information.
    Sensitive Data Scanner supports Perl Compatible Regular Expressions (PCRE), but the following patterns are not supported:
    - Backreferences and capturing sub-expressions (lookarounds)
    - Arbitrary zero-width assertions
    - Subroutine references and recursive patterns
    - Conditional patterns
    - Backtracking control verbs
    - The `\C` "single-byte" directive (which breaks UTF-8 sequences)
    - The `\R` newline match
    - The `\K` start of match reset directive
    - Callouts and embedded code
    - Atomic grouping and possessive quantifiers
1. Enter sample data in the {{< ui >}}Add sample data{{< /ui >}} field to verify that your regex pattern is valid.
1. For {{< ui >}}Create keyword dictionary{{< /ui >}}, add keywords to refine detection accuracy when matching regex conditions. For example, if you are scanning for a sixteen-digit Visa credit card number, you can add keywords like `visa`, `credit`, and `card`. You can also require that these keywords be within a specified number of characters of a match. By default, keywords must be within 30 characters before a matched value.
1. In the {{< ui >}}Define rule target and conditions{{< /ui >}} section, select if you want to scan the {{< ui >}}Entire Event{{< /ui >}}, {{< ui >}}Specific Attributes{{< /ui >}}, or {{< ui >}}Exclude Attributes{{< /ui >}} in the dropdown menu.
    - If you are scanning the entire event, you can optionally exclude specific attributes from getting scanned. Use [path notation](#path-notation-example) (`outer_key.inner_key`) to access nested keys. For specified attributes with nested data, all nested data is excluded.
    - If you are scanning specific attributes, specify which attributes you want to scan. Use [path notation](#path-notation-example-custom) (`outer_key.inner_key`) to access nested keys. For specified attributes with nested data, all nested data is scanned.
1. For {{< ui >}}Define actions on match{{< /ui >}}, select the action you want to take for the matched information. **Note**: Redaction, partial redaction, and hashing are all irreversible actions.
    - {{< ui >}}Redact{{< /ui >}}: Replaces all matching values with the text you specify in the {{< ui >}}Replacement text{{< /ui >}} field.
    - {{< ui >}}Partially Redact{{< /ui >}}: Replaces a specified portion of all matched data. In the {{< ui >}}Redact{{< /ui >}} section, specify the number of characters you want to redact and which part of the matched data to redact.
    - {{< ui >}}Hash{{< /ui >}}: Replaces all matched data with a unique identifier. The UTF-8 bytes of the match is hashed with the 64-bit fingerprint of FarmHash.
1. Optionally, click {{< ui >}}Add Field{{< /ui >}} to add tags you want to associate with the matched events.
1. Add a name for the scanning rule.
1. Optionally, add a description for the rule.
1. Click {{< ui >}}Add Rule{{< /ui >}}.

[1]: /logs/guide/regex_log_parsing/

{{% /tab %}}
{{< /tabs >}}

### Delete a rule

To delete a rule in the Sensitive Data Scanner:

1. Navigate to [Observability Pipelines][2].
1. Select your pipeline.
1. Click the Sensitive Data Scanner processor to expand it.
1. Click {{< ui >}}Manage Scanning Rules{{< /ui >}}.
1. Select the rule you want to delete.
1. Click {{< ui >}}Delete{{< /ui >}}.

### Path notation example

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

## Set up the processor using Terraform

You can use the [Datadog Observability Pipeline Terraform resource][4] to set up a pipeline with the Sensitive Data Scanner processor. To add a rule to the Sensitive Data Scanner processor using Terraform:

1. Use the [Datadog Sensitive Data Scanner Standard Pattern][5] data source to retrieve the rule ID of the Sensitive Data Scanner [library rule][6].

   {{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "<RULE_IDENTIFIER>" {
  filter = "<RULE_NAME>"
}
   {{< /code-block >}}

   Replace the placeholders:

   - `<RULE_IDENTIFIER>` with a name to use when you later set up the Sensitive Data Scanner processor in the Observability Pipeline resource.
   - `<RULE_NAME>` with the exact name of the rule. See [Library Rules][6] for the full list of rules.

   For example, if you want to use the [AWS Access Key ID Scanner][7], configure the data source as follows:

   {{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "aws_access_key" {
  filter = "AWS Access Key ID Scanner"
}
   {{< /code-block >}}
    See the [full configuration example](#full-configuration-example) on how to add data sources for multiple rules.

1. Add a [rule][9] block in your Observability Pipeline resource for the library rule.

   {{< code-block lang="terraform" >}}
...
  sensitive_data_scanner {
    rule {
      name = "<YOUR_RULE_NAME>"
      tags = []
      on_match {
        redact {
          replace = "***"
        }
      }
      pattern {
        library {
          id                       = data.datadog_sensitive_data_scanner_standard_pattern.<RULE_IDENTIFIER>.id
          use_recommended_keywords = true
        }
      }
      scope {
        all = true
      }
    }
  }
   {{< /code-block >}}

   Replace the placeholders:

   - `<YOUR_RULE_NAME>` with a name for the rule. This name is shown in the Pipelines UI.
   - `<RULE_IDENTIFIER>` with the rule identifier you used in the data source in step 1.

   For example, if you use the [AWS Access Key ID Scanner][7] data source from step 1, configure the rule block as follows:

   {{< code-block lang="terraform" >}}
...
  sensitive_data_scanner {
    rule {
      name = "Redact AWS Access Key IDs"
      tags = []
      on_match {
        redact {
          replace = "***"
        }
      }
      pattern {
        library {
          id                       = data.datadog_sensitive_data_scanner_standard_pattern.aws_access_key.id
          use_recommended_keywords = true
        }
      }
      scope {
        all = true
      }
    }
  }
   {{< /code-block >}}

   See the [full configuration example](#full-configuration-example) on how to add multiple rules.

1. Repeat steps 1 and 2 for all library rules you want to add.

### Full configuration example

{{< img src="observability_pipelines/processors/sds_tf_ui.png" alt="The Sensitive Data Scanner processor panel showing two scanning rules: Redact AWS Access Key IDs and Redact US SSNs" style="width:60%;" >}}

If you want to use the Sensitive Data Scanner processor to scan for AWS Access Key IDs and US Social Security Numbers, and redact them by replacing them with the string `***`:

1. Use the [Datadog Sensitive Data Scanner Standard Pattern][5] data source to retrieve the rule IDs for the [AWS Access Key ID Scanner][7] and the [US Social Security Number Scanner][8].
1. In your [Datadog Observability Pipeline][4] resource's Sensitive Data Scanner processor, use the Sensitive Data Scanner rules defined in the data sources.

{{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "aws_access_key" {
  filter = "AWS Access Key ID Scanner"
}
data "datadog_sensitive_data_scanner_standard_pattern" "us_ssn" {
  filter = "US Social Security Number Scanner"
}

resource "datadog_observability_pipeline" "sensitive_data_pipeline" {
  name = "Sensitive Data Pipeline"

  config {
    source {
      id = "source-0"
      datadog_agent {}
    }

    processor_group {
      display_name = "Processors"
      enabled      = true
      id           = "group-0"
      include      = "*"
      inputs       = ["source-0"]

      processor {
        display_name = "Sensitive Data Scanner"
        enabled      = true
        id           = "processor-sds-0"
        include      = "*"

        sensitive_data_scanner {
          rule {
            name = "Redact AWS Access Key IDs"
            tags = []
            on_match {
              redact {
                replace = "***"
              }
            }
            pattern {
              library {
                id                       = data.datadog_sensitive_data_scanner_standard_pattern.aws_access_key.id
                use_recommended_keywords = true
              }
            }
            scope {
              all = true
            }
          }
          rule {
            name = "Redact US SSNs"
            tags = []
            on_match {
              redact {
                replace = "***"
              }
            }
            pattern {
              library {
                id                       = data.datadog_sensitive_data_scanner_standard_pattern.us_ssn.id
                use_recommended_keywords = true
              }
            }
            scope {
              all = true
            }
          }
        }
      }
    }

    destination {
      id     = "destination-0"
      inputs = ["group-0"]
      datadog_logs {}
    }
  }
}
{{< /code-block >}}

## Best practices to optimize performance

The Sensitive Data Scanner processor is CPU intensive. Use the following best practices to optimize performance.

### View scanning rule usage with the out-of-the-box Observability Pipelines dashboard

Observability Pipelines includes an out-of-the-box [Observability Pipelines Overview][13] dashboard with a **Sensitive data found by Observability Pipelines** section. Use the widgets in that section to see which scanning rules are matching data and which ones might need to be refined or could be disabled. For example:
- NEED EXAMPLE of when you'd refine a rule
- If you don't ingest TKTK logs, disable those rules to prevent them from adding unnecessary CPU overhead.

1. Navigate to Dashboards > [Observability Pipelines Overview][13].
1. Use the template variables (`pipeline_id`, `host`, `worker_uuid`, `component_type`, `component_kind`, `component_id`) at the top of the dashboard to scope the view to a specific pipeline or Worker.
1. Use the time selector to scope to a wider time frame.

Use these widgets to evaluate your Sensitive Data Scanners' scanning rule usage:

- **Logs containing sensitive data per scanning rule**: Lists each rule by name (for example, `visa_card_scanner_1x16_1x19_digits` or `redact_ipv4`) with the number of matches over the selected time frame. Rules with high counts are actively protecting data. This is the primary widget to see which rules are in use.
- **Total count of logs containing sensitive data**: Shows the overall volume of matches across all rules, so you can gauge how much sensitive data the processor is matching. Use this widget to confirm the Sensitive Data Scanner processor is working as expected before looking into individual rules.
- **Logs containing sensitive data by Pipeline**: Breaks matches down by `pipeline_id`, which helps you see whether a rule is used in all pipelines or only in specific pipelines. A rule matching in one pipeline but not others may be a candidate to scope more narrowly.
- **Logs containing sensitive data per host**: Breaks matches down by Worker host. Use this widget to confirm coverage across your deployment and identify hosts where a rule is or is not matching.
- **Patterns containing sensitive information** and **List of logs containing sensitive data**: Show the log patterns and sample events where sensitive data was found, so you can verify a rule is matching the data you expect (and not producing false positives).

After you identify rules with no matches over a representative time frame, confirm they are not needed and remove them. See [Delete a rule](#delete-a-rule).

**Note**: A rule with zero matches means the rule did not match in the selected time frame, not that the rule is invalid. Before removing a rule, widen the time frame and confirm the data it scans for is absent, so you do not remove a rule that catches rare but important sensitive data.

### Only enable rules you need

Rules that are enabled but not used consume unnecessary resources. Check the Sensitive Data Scanner processor to view how many matches each rule has had over the past 24 hours.

1. Navigate to [Observability Pipelines][2].
1. Select your pipeline.
1. Click the Sensitive Data Scanner processor to expand it.
1. Click {{< ui >}}View Scanning Rules{{< /ui >}} to open the side panel and see {{< ui >}}Matches in the last 24 hours{{< /ui >}} for each rule.

See [Delete a rule](#delete-a-rule) to delete an unused rule.

### Only scan the events and fields that need to be scanned for sensitive data

The time it takes the Sensitive Data Scanner to scan an event roughly scales with the size of the event. To optimize processor performance:

- If you know the types of events you want to scan, define a processor query that only sends the events you want to the processor.

- Reduce scanning time by targeting specific event attributes for scanning or excluding event attributes from being scanned. See the {{< ui >}}Define rule target and conditions{{< /ui >}} step in [Set up the processor](#set-up-the-processor-in-the-ui).

### Evaluate and benchmark performance optimizations

Use the `pipelines.component_latency_seconds` metric to:

- Benchmark processor performance when you add a rule
- Evaluate performance after making optimization changes, such as reducing the number of fields being scanned and removing unused rules

To view the `pipelines.component_latency_seconds` metric:

1. Navigate to [Metrics Explorer][11].
1. In the metric field, enter `pipelines.component_latency_seconds`.
1. In the {{< ui >}}from{{< /ui >}} field, enter the tag `component_id:<COMPONENT_ID>`, where `<COMPONENT_ID>` is the ID for your Sensitive Data Scanner processor.

**Note**: `pipelines.component_latency_seconds` is a distribution metric so you must enable percentiles for that metric. See [Enabling advanced query functionality][12] for instructions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/search_syntax/logs/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /logs/guide/regex_log_parsing/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/sensitive_data_scanner_standard_pattern
[6]: /security/sensitive_data_scanner/scanning_rules/library_rules/
[7]: /security/sensitive_data_scanner/scanning_rules/library_rules/?search=AWS+Access+Key+ID+Scanner
[8]: /security/sensitive_data_scanner/scanning_rules/library_rules/?search=US+Social+Security+Number+Scanner
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline#nested-schema-for-configprocessor_groupprocessorsensitive_data_scanner
[10]: /api/latest/observability-pipelines/#create-a-new-pipeline
[11]: https://app.datadoghq.com/metric/explorer
[12]: /metrics/distributions/#enabling-advanced-query-functionality
[13]: https://app.datadoghq.com/dash/integration/32326/observability-pipelines-overview
