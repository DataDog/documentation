---
title: (LEGACY) Observability Pipelines Documentation
aliases:
  - /integrations/observability_pipelines/
further_reading:
  - link: /observability_pipelines/legacy/setup/
    tag: Documentation
    text: Set up Observability Pipelines
  - link: https://www.datadoghq.com/blog/datadog-observability-pipelines/
    tag: Blog
    text: Take control of your telemetry data with Observability Pipelines
  - link: /observability_pipelines/legacy/configurations/
    tag: Documentation
    text: Learn more about Observability Pipelines configurations
cascade:
    algolia:
        rank: 70
private: true
cascade:
    private: true
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

{{% observability_pipelines/legacy_warning %}}

The following documents are for the Observability Pipelines Worker 1.8 and older.

{{< whatsnext desc="Setup" >}}
    {{< nextlink href="observability_pipelines/legacy/setup/" >}}Quickstart{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/setup/datadog/" >}}Set up Datadog{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/setup/datadog_with_archiving/" >}}Set up Datadog with Archiving{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/setup/splunk/" >}}Set up Splunk{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/troubleshooting/" >}}Troubleshooting{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Deployment" >}}
    {{< nextlink href="observability_pipelines/legacy/production_deployment_overview/" >}}Design and Principles{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Working with Data" >}}
    {{< nextlink href="observability_pipelines/legacy/working_with_data/" >}}Transform Your Data{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Monitoring" >}}
    {{< nextlink href="observability_pipelines/legacy/monitoring/" >}}Health Statuses of Your Pipelines{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Reference: Configurations" >}}
    {{< nextlink href="observability_pipelines/legacy/configurations/" >}}Overview{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/reference/sources/" >}}Sources{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/reference/transforms/" >}}Transforms{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/reference/sinks/" >}}Sinks{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Reference: Datadog Processing Language " >}}
    {{< nextlink href="observability_pipelines/legacy/reference/processing_language/" >}}Overview{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/reference/processing_language/functions/" >}}Functions{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/reference/processing_language/errors/" >}}Errors{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Guides " >}}
    {{< nextlink href="observability_pipelines/legacy/guide/control_log_volume_and_size/" >}}Control Log Volume and Size{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/guide/ingest_aws_s3_logs_with_the_observability_pipelines_worker/" >}}Ingest Amazon S3 Logs with the Observability Pipelines Worker{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/guide/route_logs_in_datadog_rehydratable_format_to_amazon_s3" >}}Route Logs in Datadog-Rehydratable Format to Amazon S3{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Architecture" >}}
    {{< nextlink href="observability_pipelines/legacy/architecture/" >}}Overview{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/architecture/optimize/" >}}Optimizing the Instance{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/architecture/capacity_planning_scaling" >}}Capacity Planning and Scaling{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/architecture/networking" >}}Networking{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/architecture/preventing_data_loss" >}}Preventing Data Loss{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/architecture/availability_disaster_recovery" >}}High Availability and Disaster Recovery{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/legacy/architecture/advanced_configurations" >}}Advanced Configurations{{< /nextlink >}}

{{< /whatsnext >}}

# Legacy Observability Pipelines

{{< img src="observability_pipelines/obs_pipelines_new.png" alt="A graphic showing different data sources on the left that flows into three hexagons named transform, reduce, and route, with arrows pointing to different destinations for the modified data" style="width:100%;" >}}

## Overview

Observability Pipelines allow you to collect, process, and route logs from any source to any destination in infrastructure that you own or manage.

With Observability Pipelines, you can:

- Control your data volume before routing to manage costs.
- Route data anywhere to reduce vendor lock-in and simplify migrations.
- Transform logs by adding, parsing, enriching, and removing fields and tags.
- Redact sensitive data from your telemetry data.

The Observability Pipelines Worker is the software that runs in your infrastructure. It aggregates and centrally processes and routes your data. More specifically, the Worker can:

- Receive or pull all your observability data collected by your agents, collectors, or forwarders.
- Transform ingested data (for example: parse, filter, sample, enrich, and more).
- Route the processed data to any destination.

The Datadog UI provides a control plane to manage your Observability Pipelines Workers. You can monitor your pipelines to understand the health of your pipelines, identify bottlenecks and latencies, fine-tune performance, validate data delivery, and investigate your largest volume contributors. You can build or edit pipelines, whether it be routing a subset of data to a new destination or introducing a new sensitive data redaction rule, and roll out these changes to your active pipelines from the Datadog UI.

## Get started

1. [Set up the Observability Pipelines Worker][1].
2. [Create pipelines to collect, transform and route your data][2].
3. Discover how to deploy Observability Pipelines at production scale:
    - See [Deployment Design and Principles][3] for information on what to consider when designing your Observability Pipelines architecture.
    - See [Best Practices for OP Worker Aggregator Architecture][4].

## Explore Observability Pipelines

Start getting insights into your Observability Pipelines:

###  Collect data from any source and route data to any destination

Collect data[*](#support) from any source and route them to any destination to reduce vendor lock-in and simplify migrations.


{{< img src="observability_pipelines/component_panel.png" alt="The Datadog Logs component side panel showing a line graph of events in/out per second and a link graph of bytes in/out per second" style="width:100%;" >}}

### Control your data volume before it gets routed

Optimize volume and reduce the size of your observability data by sampling, filtering, deduplicating, and aggregating your logs.

{{< img src="observability_pipelines/transforms.png" alt="The list of transforms side panel showing the transforms available such as aggregate, Amazon EC2 Metadata, dedupe and more." style="width:100%;" >}}

### Redact sensitive data from your telemetry data

Redact sensitive data before they are routed outside of your infrastructure, using out-of-the-box patterns to scan for PII, PCI, private keys, and more.

{{< img src="observability_pipelines/scanning_rules.png" alt="The sensitive data scanner rules library panel showing the available rules for personal identifiable information and network and device information" style="width:85%;" >}}

### Monitor the health of your pipelines

Get a holistic view of all of your pipelines' topologies and monitor key performance indicators, such as average load, error rate, and throughput for each of your flows.

{{< img src="observability_pipelines/pipeline_health.png" alt="The pipeline configuration page showing a warning because components are experiencing errors and an event ingestion delay was detected" style="width:90%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/legacy/setup/
[2]: /observability_pipelines/legacy/configurations/
[3]: /observability_pipelines/legacy/production_deployment_overview/
[4]: /observability_pipelines/legacy/architecture/
