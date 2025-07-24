---
title: Processors
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/"
  tag: "blog"
  text: "Transform and enrich your logs with Datadog Observability Pipelines"
---

## Overview

<div class="alert alert-info">The processors outlined in this documentation are specific to on-premises logging environments. To parse, structure, and enrich cloud-based logs, see the <a href="https://docs.datadoghq.com/logs/log_configuration/logs_to_metrics">Log Management</a> documentation.</div>

Use Observability Pipelines' processors to parse, structure, and enrich your logs. When you create a pipeline in the UI, pre-selected processors are added to your processor group based on the selected template. You can add additional processors and delete any existing ones based on your processing needs.

You can organize your processors into logical groups to help you manage them. Each processor group has a Group Filter so that those processors are only applied to specific logs. For example, if you want the group processors to only process logs coming from `vpc`, then use the group filter `source:vpc`. You can also add filters for each individual processor.

Processor groups and the processors within each group are executed from top to bottom. The order of the processors is important because logs are checked by each processor, but only logs that match the processor's filters are processed. To change the order of the processors, use the drag handle on the top left corner of the processor you want to move.

**Notes**:
- Configuring a pipeline with processor groups is only available for Worker versions 2.7 and later.
- There is a limit of 10 processor groups for a pipeline canvas. For example, if you have a dual ship pipeline, where there are two destinations and each destination has its own set of processor groups, the combined number of processor groups from both sets is limited to 10.

Select a processor in the left navigation menu to see more information about it.

{{% observability_pipelines/processors/filter_syntax %}}

[1]: https://app.datadoghq.com/observability-pipelines

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
