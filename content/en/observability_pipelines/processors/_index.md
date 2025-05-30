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

#### Select a processor for more information:

{{< whatsnext desc=" " >}}
    {{< nextlink href="observability_pipelines/processors/add_environment_variables" >}}Add environment variables{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/add_hostname" >}}Add hostname{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/dedupe" >}}Deduplicate{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/edit_fields" >}}Edit fields{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/enrichment_table" >}}Enrichment table{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/filter" >}}Filter{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/generate_metrics" >}}Generate metrics{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/grok_parser" >}}Grok parser{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/parse_json" >}}Parse JSON{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/parse_xml" >}}Parse XML{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/quota" >}}Quota{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/reduce" >}}Reduce{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/remap_ocsf" >}}Remap to OCSF{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/sample" >}}Sample{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/split_array" >}}Split array{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/sensitive_data_scanner" >}}Sensitive Data Scanner{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/throttle" >}}Throttle{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/observability-pipelines

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
