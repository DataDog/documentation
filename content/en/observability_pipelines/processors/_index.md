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

Processor groups are executed from top to bottom. The order of the processors is important because logs are checked by each processor, but only logs that match the processor's filters are processed. To modify the order of the processors, use the drag handle on the top left corner of the processor you want to move.

Select a processor in the left navigation menu to see more information about it.

{{% observability_pipelines/processors/filter_syntax %}}

[1]: https://app.datadoghq.com/observability-pipelines

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
