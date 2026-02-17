---
title: Processors
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/rehydrate-archived-logs-with-observability-pipelines
  tag: Blog
  text: Rehydrate archived logs in any SIEM or logging vendor with Observability Pipelines
- link: "https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/"
  tag: "blog"
  text: "Transform and enrich your logs with Datadog Observability Pipelines"
---

## Overview

<div class="alert alert-info">The processors outlined in this documentation are specific to on-premises logging environments. To parse, structure, and enrich cloud-based logs, see the <a href="https://docs.datadoghq.com/logs/log_configuration/logs_to_metrics">Log Management</a> documentation.</div>

Use Observability Pipelines' processors to parse, structure, and enrich your logs and metrics ({{< tooltip glossary="preview" case="title" >}}). When you create a pipeline in the UI, pre-selected processors are added to your processor group based on the selected template. You can add additional processors and delete any existing ones based on your processing needs.

Processor groups are executed from top to bottom. The order of the processors is important because events are checked by each processor, but only events that match the processor's filters are processed. To modify the order of the processors, use the drag handle on the top left corner of the processor you want to move.

**Note**: For a pipeline canvas, there is a limit of 25 processors groups and a total of 150 processors.

Select a processor in the left navigation menu to see more information about it.

## Processors

These are the available processors:

{{< tabs >}}
{{% tab "Logs" %}}

- [Add Environment Variables Processor][1]
- [Add Hostname Processor][2]
- [Custom Processor][3]
- [Deduplicate Processor][4]
- [Edit Fields Processor][5]
- [Enrichment Table Processor][6]
- [Filter Processor][7]
- [Generate Metrics Processor][8]
- [Grok Parser Processor][9]
- [Parse JSON Processor][10]
- [Parse XML Processor][11]
- [Quota Processor][12]
- [Reduce Processor][13]
- [Remap to OCSF Processor][14]
- [Sample Processor][15]
- [Sensitive Data Scanner Processor][16]
- [Split Array][17]
- [Tags][18]
- [Throttle][19]

[1]: /observability_pipelines/processors/add_environment_variables/
[2]: /observability_pipelines/processors/add_hostname/
[3]: /observability_pipelines/processors/custom_processor/
[4]: /observability_pipelines/processors/dedupe/
[5]: /observability_pipelines/processors/edit_fields/
[6]: /observability_pipelines/processors/enrichment_table/
[7]: /observability_pipelines/processors/filter/
[8]: /observability_pipelines/processors/generate_metrics/
[9]: /observability_pipelines/processors/grok_parser/
[10]: /observability_pipelines/processors/parse_json/
[11]: /observability_pipelines/processors/parse_xml/
[12]: /observability_pipelines/processors/quota/
[13]: /observability_pipelines/processors/reduce/
[14]: /observability_pipelines/processors/remap_ocsf/
[15]: /observability_pipelines/processors/sample/
[16]: /observability_pipelines/processors/sensitive_data_scanner/
[17]: /observability_pipelines/processors/split_array/
[18]: /observability_pipelines/processors/tag_control/logs/
[19]: /observability_pipelines/processors/throttle/

{{% /tab %}}
{{% tab "Metrics" %}}

- [Filter][1]
- [Tag Control][2]

[1]: /observability_pipelines/processors/filter/
[2]: /observability_pipelines/processors/tag_control/

{{% /tab %}}
{{< /tabs >}}

## Processor groups

<div class="alert alert-info">Configuring a pipeline with processor groups is only available for Worker versions 2.7 and later.</div>

{{< img src="observability_pipelines/processors/processor_groups.png" alt="Your image description" style="width:100%;" >}}

You can organize your processors into logical groups to help you manage them. Each processor group has a Group Filter so that those processors are only applied to specific events. For example, if you want the group processors to only process events coming from `vpc`, then use the group filter `source:vpc`. You can also add filters for each individual processor.

Processor groups and the processors within each group are executed from top to bottom. The order of the processors is important because events are checked by each processor, but only events that match the processor's filters are processed. To change the order of the processors, use the drag handle on the top left corner of the processor you want to move.

**Note**: There is a limit of 25 processor groups for a pipeline canvas. For example, if you have a dual ship pipeline, where there are two destinations and each destination has its own set of processor groups, the combined number of processor groups from both sets is limited to 10.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
