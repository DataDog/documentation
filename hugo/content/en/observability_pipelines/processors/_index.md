---
title: Processors
description: Learn about the processors available for parsing, structuring, and enriching logs, metrics, and traces in Observability Pipelines.
disable_toc: false
aliases:
  - /observability_pipelines/processors/tail_based_sampling/
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

Use Observability Pipelines' processors to parse, structure, and enrich your logs and metrics. When you create a pipeline in the UI, pre-selected processors are added to your processor group based on the selected template. You can add additional processors and delete any existing ones based on your processing needs.

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

**Note**: The Generate Metrics processor and the Quota processor with an overflow destination aren't available for [pre-processing](#pre-processing-for-multiple-sources).

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
[18]: /observability_pipelines/processors/tags/
[19]: /observability_pipelines/processors/throttle/

{{% /tab %}}
{{% tab "Metrics" %}}

- [Aggregate][1]
- [Edit Tags][2]
- [Filter][3]
- [Tag Allow/Block List][4]
- [Tag Cardinality Control][5]

[1]: /observability_pipelines/processors/aggregate/
[2]: /observability_pipelines/processors/edit_tags/
[3]: /observability_pipelines/processors/filter/
[4]: /observability_pipelines/processors/tag_allow_block_list/
[5]: /observability_pipelines/processors/tag_cardinality_control/

{{% /tab %}}
{{< /tabs >}}

## Pre-processing for multiple sources

{{< callout url="#" btn_hidden="true" header="Join the Preview!">}}
Pre-processors is in Preview. Contact your account manager to request access.
{{< /callout >}}

When you have multiple sources for a pipeline, you might want to modify events from specific sources or all sources before the Worker sends them through different branches. Each branch has its own processor groups. By using pre-processors, you can avoid adding the same processors to each processor group.

{{< img src="observability_pipelines/processors/pre-processors_diagram.png" alt="A diagram showing logs from the Datadog Agent and Amazon Data Firehose going through source-specific pre-processors, then logs from all three sources going through pre-processors for all sources before being sent to the processor groups for branch 1 and branch 2 and then to their destinations." style="width:100%;" >}}

For example, the log pipeline in this image has three sources: Datadog Agent, Amazon Data Firehose, and HTTP/S Client.

{{< img src="observability_pipelines/processors/multiple_sources_branches.png" alt="A pipeline with three sources sending logs to two processor groups, one for pipeline branch 1 and one for pipeline branch 2. Branch 1 sends logs to Datadog and Datadog Archives, and branch 2 sends logs to CrowdStrike NG-SIEM." style="width:100%;" >}}

The Worker sends all logs in this pipeline to two different branches: branch 1 and branch 2. Each branch has its own processor group and destinations.

If you want to do the following in this example:
- Sample all logs from the Datadog Agent source
- Deduplicate logs from all sources

Instead of having to add duplicate processors in branch 1 and 2's processor groups.

{{< img src="observability_pipelines/processors/pre-processor_tab.png" alt="The Pre-Processor tab for the Datadog Agent source, showing a Datadog Agent only group with Sample and Tags processors and an All sources group with a Dedupe processor." style="width:50%;" >}}

When you add pre-processing for individual sources and all sources, logs are sent through processors for individual sources first and then to processors for all sources.

The following are not available for pre-processing:

- Generate Metrics processor
- Quota processor with an overflow destination
- Packs

**Note**: Processor groups for specific sources and all sources count toward the 25 processor group limit per canvas.

## Processor groups

<div class="alert alert-info">Configuring a pipeline with processor groups is only available for Worker versions 2.7 and later.</div>

{{< img src="observability_pipelines/processors/processor_groups.png" alt="Your image description" style="width:100%;" >}}

You can organize your processors into logical groups to help you manage them. Each processor group has a Group Filter so that those processors are only applied to specific events. For example, if you want the group processors to only process events coming from `vpc`, then use the group filter `source:vpc`. You can also add filters for each individual processor.

Processor groups and the processors within each group are executed from top to bottom. The order of the processors is important because events are checked by each processor, but only events that match the processor's filters are processed. To change the order of the processors, use the drag handle on the top left corner of the processor you want to move.

**Note**: There is a limit of 25 processor groups per pipeline canvas. For example, in a dual-ship pipeline with two destinations, the combined number of processor groups across both destinations cannot exceed 25. You can have the groups in any combination, such as 15 on one destination and 10 on the other.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
