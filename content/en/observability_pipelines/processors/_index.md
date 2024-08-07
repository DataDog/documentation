---
title: Processors
disable_toc: false
---

## Overview

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

## Processors

{{< whatsnext desc="Set up each processor in the pipeline UI. The available processors are:" >}}
    {{< nextlink href="observability_pipelines/processors/#add-hostname" >}}Add hostname{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/#edit-fields" >}}Edit fields{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/#enrichment-table" >}}Enrichment table{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/#filter" >}}Filter{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/#grok-parser" >}}Grok parser{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/#parse-json" >}}Parse JSON{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/#quota" >}}Quota{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/#reduce" >}}Reduce{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/#sample" >}}Sample{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/#sensitive-data-scanner" >}}Sensitive Data Scanner{{< /nextlink >}}
{{< /whatsnext >}}

## Add hostname

{{% observability_pipelines/processors/add_hostname %}}

## Edit fields

{{% observability_pipelines/processors/remap %}}

## Enrichment table

{{% observability_pipelines/processors/enrichment_table %}}

## Filter

{{% observability_pipelines/processors/filter %}}

## Grok parser

{{% observability_pipelines/processors/grok_parser %}}

## Parse JSON

{{% observability_pipelines/processors/parse_json %}}

## Quota

{{% observability_pipelines/processors/quota %}}

## Reduce

{{% observability_pipelines/processors/reduce %}}

## Sample

{{% observability_pipelines/processors/sample %}}

## Sensitive Data Scanner

{{% observability_pipelines/processors/sensitive_data_scanner %}}

[1]: https://app.datadoghq.com/observability-pipelines