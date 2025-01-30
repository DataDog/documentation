---
title: Sources
disable_toc: false
further_reading:
- link: "/observability_pipelines/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up pipelines"
- link: "/observability_pipelines/processors/"
  tag: "Documentation"
  text: "Processors for your pipelines"
- link: "/observability_pipelines/destinations/"
  tag: "Documentation"
  text: "Observability Pipelines destinations"
---

## Overview

Use Observability Pipelines' sources to receive logs from your different log sources.

Select and set up your source when you build a pipeline in the UI. This is step 3 in the pipeline setup process:

1. Navigate to [Observability Pipelines][1].
1. Select a template.
1. Select and set up your source.
1. Select and set up your destinations.
1. Set up your processors.
1. Install the Observability Pipelines Worker.

Sources have different prerequisites and settings. Some sources also need to be configured to send logs to the Observability Pipelines Worker.

{{< whatsnext desc="Select a source for more information:" >}}
    {{< nextlink href="observability_pipelines/sources/datadog_agent/" >}}Datadog Agent{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/fluent/" >}}Fluentd and Fluent Bit{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/google_pubsub/" >}}Google Pub/Sub{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/http_client/" >}}HTTP/S Client{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/http_server/" >}}HTTP/S Server{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/logstash/" >}}Logstash (includes Filebeat){{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/splunk_hec/" >}}Splunk HTTP Event Collector (HEC){{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/splunk_tcp/" >}}Splunk Heavy or Universal Forwarders (TCP){{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/sumo_logic/" >}}Sumo Logic{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/syslog/" >}}rsyslog or syslog-ng (includes Fortinet and Palo Alto Networks){{< /nextlink >}}
{{< /whatsnext >}}

## Standard metadata fields

All sources add the following standard metadata fields to ingested events:

| Field name     | Value type     | Example                      |
| -------------- | -------------- | ---------------------------- |
| `hostname`     | String         | `"ip-34-2-553.us.test"`      |
| `timestamp`    | String         | `"2024-06-17T22:25:55.439Z"` |
| `source_type`  | String         | `"splunk_tcp"`               |

For example, if this is the raw event:

```
{
  "foo": "bar"
}
```

Then the enriched event with the standard metadata fields is:

```
{
  "foo": "bar",
  "hostname": "ip-34-2-553.us.test",
  "timestamp": "2024-06-17T22:25:55.439Z",
  "source_type": "splunk_tcp"
}
```

You can see these standard metadata fields when you use the [`tap` command][2] to see the events sent through the source.

After events are ingested by the source, they get sent to different processors and destinations that might update those fields. For example, if the event is sent to the Datadog Logs destination, the timestamp field gets converted to UNIX format.

**Note**: The `bytes in per second` metric in the UI is for ingested raw events, not enriched events.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/troubleshooting/#use-tap-to-see-your-data
