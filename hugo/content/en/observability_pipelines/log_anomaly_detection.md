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

The Observability Pipelines Worker can detect anomalies in logs sent to your destinations. These anomalies include:

- An emergence of logs with a warning or error status that have not been reported before
- A sudden increase of logs with a warning or error status

The Worker looks for these anomalies after logs have gone through all processors but before they are sent to their destinations. This gives you an aggregated view of your anomalies so that you can act on them. For example, if you see a lot of aggregated `status:warn` logs, you can add a [Sample processor][1] to sample those logs before they get sent to your destination.

## How anomalies are detected

The Worker sends the following data to Datadog:

- **Log signatures**: Tokenized representations of your logs that describe their structure, without including the actual log data.
- **Sample logs**: A sample of your logs every minute per pattern. See [How logs are grouped by patterns](#how-logs-are-grouped-by-patterns) for more information.

Datadog aggregates the logs into patterns as well as by `env`, `source`, `service`, and `status` fields to determine anomalous behaviors.

**Note**: If you are sending logs from a new service or to a new pipeline, it can take up to 24 hours to trigger the first anomaly while the algorithm establishes a baseline.

### How logs are grouped by patterns

Logs have the same pattern if they have the same values for the following:

- The signature (the tokenized `message` field)
- `env`
- `source`
- `service`
- `status`
- Pipeline ID
- Destination the log is sent to

Logs sent to different destinations have different patterns, even if all other values and the pipeline ID are the same.

## Enable log anomaly detection

To enable log anomaly detection, set the Worker environment variable `DD_OP_ANOMALY_DETECTION_ENABLED` to `true`.

## View log anomalies

1. Navigate to [Observability Pipelines][2].
1. Expand **Watchdog Insights**.
1. Review the anomalies found in your pipelines.
1. Click an anomaly to open the side panel and view details such as the number of error logs.

### View patterns for logs sent to the Datadog destination

For logs sent to the Datadog Logs destination and [indexed][3] in Datadog, you can see a visual breakdown of the log patterns found.

After you open the anomaly side panel, review the list of patterns in the **Next Steps** section. The aggregate values in the **Message** column are highlighted in yellow. Hover over an aggregate value to preview a visual distribution of its values.

{{< img src="observability_pipelines/log_anomaly_detection/pattern_distribution.png" alt="The Next steps section showing a list of log patterns and a distribution of values for a highlighted aggregate value." style="width:100%;" >}}

### Anomaly status

Anomalies have one of the following statuses:

- **Ongoing**: The Worker is still receiving logs with the anomalous patterns.
- **Resolved**: The Worker stopped receiving logs with the anomalous patterns in the last 48 hours.
- **Expired**: Because the anomaly had been in **Ongoing** status for more than 48 hours, logs with those patterns are no longer considered anomalous because no action was taken, such as adding a Sample processor.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/processors/sample/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /logs/log_configuration/indexes/
