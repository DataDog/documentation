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

Use Observability Pipelines' processors to parse, structure, and enrich your logs. All processors are available for all templates. Set up your processors in the Observability Pipelines UI after you have selected a template, source, and destinations. This is step 5 in the pipeline setup process:

1. Navigate to [Observability Pipelines][1].
1. Select a template.
1. Select and set up your source.
1. Select and set up your destinations.
1. Set up your processors.
1. Install the Observability Pipelines Worker.
1. Enable monitors for your pipeline.

{{% observability_pipelines/processors/intro %}}

{{% observability_pipelines/processors/filter_syntax %}}

[1]: https://app.datadoghq.com/observability-pipelines

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
