---
title: Configuration
disable_toc: false
further_reading:
- link: "observability_pipelines/configuration/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up pipelines"
- link: "observability_pipelines/configuration/install_the_worker/"
  tag: "Documentation"
  text: "Install the Worker"
- link: "observability_pipelines/configuration/live_capture/"
  tag: "Documentation"
  text: "Learn more about Live Capture"
- link: "observability_pipelines/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting"
---

## Overview

{{< img src="observability_pipelines/setup/pipeline_ui.png" alt="The pipelines page with a source going to two processors groups and two destinations" style="width:100%;" >}}

Observability Pipelines lets you collect and process logs and metrics ({{< tooltip glossary="preview" >}}) within your own infrastructure, and then route them to different destinations. A pipeline consists of three core components:

- [Source][1]: Receives data from a tool like the Datadog Agent.
- [Processors][2]: Transform, enrich, or filter data.
- [Destinations][3]: Where data is sent (for example, Datadog, Amazon S3, Splunk, Google Security Operations, and Microsoft Sentinel).

Build and deploy pipelines to collect, transform, and route your data using one of these methods:

 - [Pipeline UI][4]
 - [API][5]
 - [Terraform][6]

## Pipeline types

There are two types of pipelines:

{{< tabs >}}
{{% tab "Logs" %}}

Use one of the [logs templates][1] to create a log pipeline.

- Archive Logs
- Dual Ship Logs
- Generate Log-based Metrics
- Log Enrichment
- Log Volume Control
- Sensitive Data Redaction
- Split Logs

See [Set Up Pipelines][2] for more information on setting up a source, processors and destinations.

[1]: /observability_pipelines/configuration/explore_templates/?tab=logs#templates
[2]: /observability_pipelines/configuration/set_up_pipelines/

{{% /tab %}}

{{% tab "Metrics" %}}

<div class="alert alert-info">
Metrics Volume and Cardinality Control is in Preview. Fill out the <a href="https://www.datadoghq.com/product-preview/metrics-ingestion-and-cardinality-control-in-observability-pipelines/">form</a> to request access.</div>

Use the [Metrics Volume and Cardinality Control][1] template to create a metrics pipeline.

See [Set Up Pipelines][2] for more information on setting up a source, processors and destination.

#### Metrics data

Metrics sent to Observability Pipelines include the following:

- `name`: The metric name
- `kind`: There are two kinds of metrics:
  - Absolute metrics: Represents the current value of a measurement at the time it is reported.
  - Incremental metrics: Represents the change in a measurement since the last reported value, which the system aggregates over time.
- The [metric types](#metric-types):
	- `counter`
	- `gauge`
	- `distribution`
	- `histogram`
- `timestamp`: The date and time the metric is created.
- `tags`: Includes tags such as `host`.

The `counter` metric type is the only `incremental` metric. `gauge`, `distribution`, and `histogram` metric types are `absolute` metrics.

An example of a metric:

```
{
"name":"datadog.agent.retry_queue_duration.bytes_per_sec",
  "tags":{
    "agent":"core",
    "domain":"https://7-72-3-app.agent.datadoghq.com",
    "host":"COMP-YGVQDJG75L",
    "source_type_name":"System",
    "env:prod"
  },
  "timestamp":"2025-11-28T13:03:09Z",
  "kind":"absolute",
  "gauge":{"value":454.1372767857143}
}
```

#### Metric types

The available metric types:

| Metric type | Description | Example |
| ----------- | ----------- | ------- |
| COUNTER     | Represents the total number of event occurrences in one time interval. This value can be reset to zero, but cannot be decreased. | You want to count the number of logs with `status:error`. |
| GAUGE       | Represents a snapshot of events in one time interval. | You want to measure the latest CPU utilization per host for all logs in the production environment. |
| DISTRIBUTION | Represent the global statistical distribution of a set of values calculated across your entire distributed infrastructure in one time interval. | You want to measure the average time it takes for an API call to be made. |
| HISTOGRAM   | Represents the statistical distribution of a set of values calculated in one time interval. | You want to measure response time distributions for a service or endpoint. |

See [Metric Types][3] for more information.

[1]: /observability_pipelines/configuration/explore_templates/?tab=metrics#metrics-volume-and-cardinality-control
[2]: /observability_pipelines/configuration/set_up_pipelines/
[3]: /metrics/types/?tab=gauge#metric-types

{{% /tab %}}
{{< /tabs >}}

 ## Further reading

 {{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/sources/
[2]: /observability_pipelines/processors/
[3]: /observability_pipelines/destinations/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /api/latest/observability-pipelines/#create-a-new-pipeline
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
