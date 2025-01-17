---
title: Destinations
disable_toc: false
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Use the Observability Pipelines Worker to send your processed logs to different destinations.

Select and set up your destinations when you [set up a pipeline][1]. This is step 4 in the pipeline setup process:

1. Navigate to [Observability Pipelines][2].
1. Select a template.
1. Select and set up your source.
1. Select and set up your destinations.
1. Set up your processors.
1. Install the Observability Pipelines Worker.

{{< whatsnext desc="Select a destination for more information:" >}}
    {{< nextlink href="observability_pipelines/destinations/amazon_opensearch" >}}Amazon OpenSearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/amazon_s3" >}}Amazon S3{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/azure_storage" >}}Azure Storage{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/datadog_logs" >}}Datadog Logs{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/elasticsearch" >}}Elasticsearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/google_chronicle" >}}Google Chronicle{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/google_cloud_storage" >}}Google Cloud Storage{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/new_relic" >}}New Relic{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/microsoft_sentinel" >}}Microsoft Sentinel{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/opensearch" >}}OpenSearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/syslog" >}}rsyslog or syslog-ng{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/sentinelone" >}} SentinelOne {{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/splunk_hec" >}}Splunk HTTP Event Collector (HEC){{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/sumo_logic_hosted_collector" >}}Sumo Logic Hosted Collector{{< /nextlink >}}
{{< /whatsnext >}}

## Template syntax

Logs are often stored in separate indexes based on log data, such as the service or environment the logs are coming from or another log attribute. In Observability Pipelines, you can use template syntax to route your logs to different indexes based on specific log fields. The following destinations and fields support template syntax:

| Destination       | Fields that support template syntax |
| ----------------- | -------------------------------------|
| Amazon Opensearch | Index                                |
| Amazon S3         | Prefix                               |
| Azure Blob        | Prefix                               |
| Elasticsearch     | Source type                          |
| Google Chronicle  | Log type                             |
| Google Cloud      | Prefix                               |
| Opensearch        | Index                                |
| Splunk HEC        | Index<br>Source type                 |

#### Example

If you want to route logs based on the log's application ID field (for example, `application_id`) to the Amazon S3 destination, use the event fields syntax in the **Prefix to apply to all object keys** field.

{{< img src="observability_pipelines/amazon_s3_prefix.png" alt="The Amazon S3 destination showing the prefix field using the event fields syntax /application_id={{ application_id }}/" style="width:40%;" >}}

### Syntax

#### Event fields

Use `{{ <field_name> }}` to access individual log event fields. For example:

```
{{ application_id }}
```

#### Strftime specifiers

Use [strftime specifiers][3] for the date and time. For example:

```
year=%Y/month=%m/day=%d
```

#### Escape characters

Prefix a character with `\` to escape the character. This example escapes the event field syntax:

```
\{{ field_name }}
```

This example escapes the strftime specifiers:

```
year=\%Y/month=\%m/day=\%d/
```

## Event batching

Observability Pipelines destinations send events in batches to the downstream integration. A batch of events is flushed when one of the following parameters is met:

- Maximum number of events
- Maximum number of bytes
- Timeout (seconds)

For example, if a destination's parameters are:

- Maximum number of events = 2
- Maximum number of bytes = 100,000
- Timeout (seconds) = 5

And the destination receives 1 event in a 5-second window, it flushes the batch at the 5-second timeout.

If the destination receives 3 events within 2 seconds, it flushes a batch with 2 events and then flushes a second batch with the remaining event after 5 seconds. If the destination receives 1 event that is more than 100,000 bytes, it flushes this batch with the 1 event.

{{% observability_pipelines/destination_batching %}}

[1]: /observability_pipelines/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: https://docs.rs/chrono/0.4.19/chrono/format/strftime/index.html#specifiers