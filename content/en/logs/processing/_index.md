---
title: Processing
kind: documentation
description: "Parse & Enrich your logs to create valuable facets & metrics in the Logs Explorer."
aliases:
  - /logs/faq/integration-pipeline-reference
further_reading:
- link: "/logs/processing/pipelines/"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/logs/processing/processors/"
  tag: "Documentation"
  text: "Consult the full list of available Processors"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog log attributes naming convention"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

## Overview

Control how your logs are processed from the [log configuration page][1].

* A [Pipeline][2] takes a filtered subset of incoming logs and applies a list of sequential processors.
* A [Processor][3] executes within a [Pipeline][2] to complete a data-structuring action ([Remapping an attribute][4], [Grok parsing][5], etc.) on a log.

{{< img src="logs/processing/processors/processing_overview.png" alt="Processing" >}}

Pipelines and Processors can be applied to any type of log. You don't need to change logging configuration or deploy changes to any server-side processing rules. Everything can be configured within the [Pipeline configuration page][1].

Implementing a log processing strategy is beneficial as it introduces an [attribute naming convention][6] for your organization.

## Custom logs

Define custom processing rules for custom log formats. Use any log syntax to extract all attributes and, when necessary, remap them to global or canonical attributes.

For example, with custom processing rules you can transform this log:

{{< img src="logs/processing/log_pre_processing.png" alt="Log pre processing"  style="width:50%;">}}

Into this one:

{{< img src="logs/processing/log_post_processing.png" alt="Log post processing"  style="width:50%;">}}

Consult the [Pipelines documentation page][2] to learn more about how to perform actions on a subset of your logs with the [Pipeline filters][7].

To discover the full list of Processors available, refer to the dedicated [Processor documentation page][3].

If you want to learn more about parsing capabilities, follow the [parsing][8] docs. There is also a [parsing best practices][9] and [parsing troubleshooting][10] guide.

**Notes**:

- For optimal use of the Log Management solution, Datadog recommends using at most 20 processors per pipeline and 10 parsing rules within a grok processor.

- Datadog reserves the right to disable underperforming parsing rules, processors, or pipelines that might impact Datadog's service performance.

## Processing pipelines

A processing pipeline takes a filtered subset of incoming logs and applies them over a list of sequential Processors. See the [Logs pipelines][11] docs to learn more about preprocessing for JSON logs and integrations pipelines.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /logs/processing/pipelines/
[3]: /logs/processing/processors/
[4]: /logs/processing/processors/#attribute-remapper
[5]: /logs/processing/processors/#grok-parser
[6]: /logs/processing/attributes_naming_convention/
[7]: /logs/processing/pipelines/#pipeline-filters
[8]: /logs/processing/parsing/
[9]: /logs/faq/log-parsing-best-practice/
[10]: /logs/faq/how-to-investigate-a-log-parsing-issue/
[11]: /logs/processing/pipelines/#special-pipelines
