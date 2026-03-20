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

## Overview

<div class="alert alert-warning">To process logs with the Grok Parser processor, the logs <b>must</b> have a <code>source</code> field with the source name. If this field is not added when the log is sent to the Observability Pipelines Worker, you can use the <a href="/observability_pipelines/processors/edit_fields#add-field">Add field</a> processor to add it.</div>

The Grok Parser processor parses logs using the grok parsing rules available for a set of sources. If the `source` field of a log matches one of the grok parsing rule sets, the log's `message` field is checked against those rules. If a rule matches, the resulting parsed data is added in the `message` field as a JSON object, overwriting the original `message`.

If there isn't a `source` field on the log, or no rule matches the log `message`, then no changes are made to the log and it is sent to the next step in the pipeline.

Datadog's Grok patterns differ from the standard Grok pattern, where Datadog's Grok implementation provides:
- Matchers that include options for how you define parsing rules
- Filters for post-processing of extracted data
- A set of built-in patterns tailored to common log formats

See [Parsing][1] for more information on Datadog's Grok patterns.

## Setup

To set up the grok parser, define a **filter query**. Only logs that match the specified filter query are processed. All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline. See [Search Syntax][3] for more information.

To test log samples for out-of-the-box rules:
1. Click the **Preview Library Rules** button.
1. Search or select a source in the dropdown menu.
1. Enter a log sample to test the parsing rules for that source.

To add a custom parsing rule:

1. Click **Add Custom Rule**.
1. If you want to clone a library rule, select **Clone library rule** and then the library source from the dropdown menu.
1. If you want to create a custom rule, select **Custom** and then enter the `source`. The parsing rules are applied to logs with that `source`.
1. Enter log samples to test the parsing rules.
1. Enter the rules for parsing the logs. See [Parsing][1] for more information on writing parsing rules with Datadog Grok patterns.<br>**Note**: The `url`, `useragent`, and `csv` filters are not available.
1. Click **Advanced Settings** if you want to add helper rules. See [Using helper rules to reuse common patterns][2] for more information.
1. Click **Add Rule**.

[1]: /logs/log_configuration/parsing/
[2]: /logs/log_configuration/parsing/?tab=matchers#using-helper-rules-to-reuse-common-patterns
[3]: /observability_pipelines/search_syntax/logs/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
