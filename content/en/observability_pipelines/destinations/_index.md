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
    {{< nextlink href="observability_pipelines/destinations/opensearch" >}}OpenSearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/syslog" >}}rsyslog or syslog-ng{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/splunk_hec" >}}Splunk HTTP Event Collector (HEC){{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/sumo_logic_hosted_collector" >}}Sumo Logic Hosted Collector{{< /nextlink >}}
{{< /whatsnext >}}


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