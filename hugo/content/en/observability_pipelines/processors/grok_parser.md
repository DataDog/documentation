---
title: Grok Parser Processor
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types

further_reading:
- link: "https://www.datadoghq.com/blog/observability-pipelines-mssp"
  tag: "Blog"
  text: "Simplify log collection and aggregation for MSSPs with Datadog Observability Pipelines"

---

{{< product-availability >}}

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Per-rule filters and AI-generated parsing rules are in Preview. Contact your account manager to request access.
{{< /callout >}}

## Overview

Custom application or non-standard logs can often be hard to parse into structured formats. To address this issue, use the Grok Parser processor to generate parsing rules using AI, apply library rules for vendor-specific formats (such as Apache, Airflow, and MySQL), or create your own parsing rules. Then, test the rules on sample data to validate the syntax and preview the parsed log output.

**Notes**:
- You must create a separate Grok Parser for each field you want to parse.
- A log is only parsed by the first rule it matches, so [the order of your rules matters](#order-of-custom-rules).
- If you are using Worker versions older than 2.17, your logs must have the `source` or `ddsource` field and the `message` field for the processor to parse them.

## Setup

The Grok Parser processor does the following:

1. Uses the processor-level filter query to determine which logs are sent to the parser.
1. Identifies the specified field to parse on the log.
1. (Preview) Uses the rule-level filter query to apply the first parsing rule that matches the log.
1. Overwrites the specified log field with the rule's output, and then sends the log to the next step in the pipeline.

{{< img src="observability_pipelines/processors/grok_parser_setup.png" alt="The Grok Parser processor panel showing the filter query and field-to-parse settings." style="width:50%;" >}}

To set up the Grok Parser processor:

1. Define a processor-level filter query. Only logs that match this filter query are sent to the parser. All logs, regardless of whether they are parsed by the processor, are sent to the next step in the pipeline. See [Logs Search Syntax][3] for information on creating queries.
1. Enter the log field to parse on. For example, if you enter `logmessage`, the content of the `logmessage` attribute is parsed. If no field is specified, `message` is the default field used.
1. Toggle {{< ui >}}Enable Library Rules{{< /ui >}} off to disable all library parsing rules.
   <br>**Notes**:
   - You must create a custom parsing rule before you can disable library rules.
   - Library rules are applied by default. Disable library rules only if you are relying on custom parsing rules.
1. Click {{< ui >}}View Library Rules{{< /ui >}} to preview preset rules for integrations. You can test out-of-the-box parsing rules with your log samples. See [Library rules](#library-rules) for more information.

### Create an AI-generated or custom parsing rule

To set up an AI-assisted or custom parsing rule, click {{< ui >}}Create Parsing Rules{{< /ui >}} on the Grok Parser processor:

1. Enter a name for the parsing rule.
1. (Preview) Enter a filter query to define which logs this rule applies to. The Grok Parser runs a rule only if a log matches the per-rule filter query, which lets you apply different parsing rules on different log formats. See [Logs Search Syntax][3] for information on creating queries.
1. Enter a log sample you want to parse. Samples can be copied from Live Capture or pasted in from another source.
1. (Preview) Click {{< ui >}}Generate New Rule{{< /ui >}} to have AI generate a new parsing rule based on the sample log. Otherwise, see [Manually write rules](#manually-write-rules) to write your own rules.
    1. Review the parsed log in the {{< ui >}}Preview Changes{{< /ui >}} panel.
    1. Click {{< ui >}}Generate New Rule{{< /ui >}} to re-run the AI rule generator or manually update the rule so the log is parsed correctly. See [Parsing][1] for information on writing parsing rules.
    <br>**Notes**:
        - If you re-run the AI rule generator, a new rule is created. You must manually delete previously AI-created rules if you don't want them.
        - You can run the AI rule generator a maximum of three times per sample.
    1. Repeat step 4 to create rules based on additional sample logs. See [Order of custom rules](#order-of-custom-rules) for information on how rule order determines which rule parses a log.
1. After you add a rule, you can add library rules by selecting a library rule from the {{< ui >}}reference a library rule{{< /ui >}} dropdown menu. You can add multiple library rules. See [Library rules](#library-rules) for more information.
1. Click {{< ui >}}Advanced Settings{{< /ui >}} if you want to add helper rules. See [Using helper rules to reuse common patterns][2] for more information.
1. Click {{< ui >}}Create Rule{{< /ui >}}.

{{< img src="observability_pipelines/processors/grok_parser_create_rule.png" alt="The Create Parsing Rule modal in the Grok Parser processor." style="width:50%;" >}}

If a log is sent to the parser but is not parsed by any rules, the Worker generates a log with the error: `The parser failed to apply rule`.

#### Order of custom rules

When you have multiple custom rules for a Grok Parser processor, a log is parsed by the first rule whose query it matches, and then sent to the next step in the pipeline. The processor does not try to match the log to subsequent rules. Therefore, the order of the rules matters if a log might match multiple rules. To reorder rules, drag and drop them into the desired order.

##### Example

Consider a parser with these parsing rules:

1. Rule Example 1
1. Rule Example 2
1. Rule Example 3

If a log sent to the parser matches all three rule queries, the log is _only_ parsed by Rule Example 1, because it's listed before rules 2 and 3.

{{< img src="observability_pipelines/processors/grok_parser_rule_order.png" alt="Three parsing rules listed in order in the Grok Parser processor." style="width:50%;" >}}

#### Manually write rules

To write parsing rules manually, in the {{< ui >}}Create Parsing Rule{{< /ui >}} modal:

1. Click {{< ui >}}write rules manually{{< /ui >}}.
1. Enter the rules for parsing the logs. See [Parsing][1] for information on writing parsing rules with Datadog Grok patterns. **Note**: The `url`, `useragent`, and `csv` filters are not available.
1. Review the parsed log in the {{< ui >}}Preview Changes{{< /ui >}} panel and update the rule until the log is parsed as expected.
1. Click {{< ui >}}Add rule{{< /ui >}} to manually write another rule.

### Library rules

When a log is sent to the parser, library rules are automatically applied to the log if there is a `source` or `ddsource` field. For example, if a log has `source:mysql`, the parser applies the MySQL library rules to that log. To browse all available library rules, click {{< ui >}}View Library Rules{{< /ui >}} in the Grok Parser processor. You can search the table of library rules and click any rule to preview how it is applied to your logs.

You can also add library rules when you create a custom rule. See [Create an AI-assisted or custom parsing rule](#create-an-ai-assisted-or-custom-parsing-rule) for more information.

## Metrics

For [component metrics][4] and [processor buffer metrics][5] emitted by all processors, see the [Pipelines Usage Metrics][6] documentation. To filter or group by Parse processor metrics, use the tag `component_type:parse`.

[1]: /logs/log_configuration/parsing/
[2]: /logs/log_configuration/parsing/?tab=matchers#using-helper-rules-to-reuse-common-patterns
[3]: /observability_pipelines/search_syntax/logs/
[4]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[5]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[6]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
