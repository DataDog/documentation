---
title: Log Anomaly Detection
description: Learn how the Observability Pipelines Worker detects anomalies in logs.
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

{{< callout url="#" btn_hidden="true" header="Join the Preview!">}}
Log Anomaly Detection is in Preview. Contact your account manager to request access.
{{< /callout >}}

## Overview

The Observability Pipelines Worker can detect anomalies in logs sent to your destinations. The Worker detects two types of anomalies:

- New patterns of logs with a warning or error status
- A sudden increase in logs with a warning or error status

The Worker looks for these anomalies after logs have gone through all processors but before they are sent to their destinations. Anomaly detection gives you an aggregated view of your anomalies so that you can act on them. For example, if you see a large number of aggregated `status:warn` logs, you can add a [Sample processor][1] to sample those logs before they are sent to your destination.

## How anomalies are detected

The Worker sends the following data to Datadog:

- **Log signatures**: Tokenized representations of your logs that describe their structure, without including the actual log data.
- **Sample logs**: A sample log for each log pattern, sent every minute. See [How logs are grouped by patterns](#how-logs-are-grouped-by-patterns) for more information. Unlike signatures, sample logs include log data.

Datadog groups the logs into patterns to determine anomalous behavior. For details, see the [How logs are grouped by patterns](#how-logs-are-grouped-by-patterns) section.

**Note**: When you send logs from a new service or to a new pipeline, Datadog first establishes a baseline. Datadog can take up to 24 hours to detect the first anomaly.

### How logs are grouped by patterns

Logs have the same pattern if they have the same values for the following:

- The signature (the tokenized `message` field)
- `env`
- `source`
- `service`
- `status`
- Pipeline ID
- Destination

For example, if the same logs are sent to two destinations, they form two separate patterns.

### Anomaly statuses

Each anomaly has one of the following statuses:

- {{< ui >}}Ongoing{{< /ui >}}: The Worker is still receiving logs with the anomalous patterns.
- {{< ui >}}Resolved{{< /ui >}}: The Worker has not received logs with the anomalous patterns for 48 hours.
- {{< ui >}}Expired{{< /ui >}}: The anomaly was in {{< ui >}}Ongoing{{< /ui >}} status for more than 48 hours with no action taken, such as adding a [Sample processor][1]. Logs with those patterns are no longer considered anomalous.

## Enable log anomaly detection

To enable log anomaly detection:

1. Navigate to [Observability Pipelines][2].
1. Select your pipeline.
1. Click the cog on the upper right side of your pipeline's page and select {{< ui >}}Pipeline Settings{{< /ui >}}.
1. Toggle on {{< ui >}}Anomaly Detection{{< /ui >}}.
1. Click {{< ui >}}Done{{< /ui >}}.

## View log anomalies

To view log anomalies:

1. Navigate to [Observability Pipelines][2].
1. Expand {{< ui >}}Watchdog Insights{{< /ui >}}.
1. Click an anomaly in the list to open the side panel and view details, such as the number of error logs.

### View patterns for logs sent to the Datadog Logs destination

For logs sent to the Datadog Logs destination and [indexed][3] in Datadog, you can see a visual breakdown of the log patterns found. To view the patterns:

1. In the anomaly side panel, go to the {{< ui >}}Next steps{{< /ui >}} section to see the list of patterns.
1. In the {{< ui >}}Message{{< /ui >}} column, hover over an aggregate value to open {{< ui >}}Distribution of values by Pattern Inspector{{< /ui >}} and preview a distribution of its values.

{{< img src="observability_pipelines/log_anomaly_detection/pattern_distribution.png" alt="The Next steps section showing a list of log patterns and a distribution of values for a highlighted aggregate value." style="width:100%;" >}}

[1]: /observability_pipelines/processors/sample/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /logs/log_configuration/indexes/
