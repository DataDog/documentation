---
title: Connect APM Data with Other Telemetry
kind: documentation
description: '.'
further_reading:
    - link: '/logs/guide/ease-troubleshooting-with-cross-product-correlation/'
      tag: "Documentation"
      text: 'Ease troubleshooting with cross-product correlation'
---

Correlating data by various Datadog products gives context to help estimate the business impact and find the root cause of an issue in a few clicks. Set up connections between incoming data to facilitate quick pivots in your explorers and dashboards.

## Connect Logs and Traces

Inject trace IDs into logs, and leverage unified service tagging to find the exact logs associated with a specific service and version, or all logs correlated to an observed trace. See [Connect Logs and Traces][1] to set it up.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Connect Logs And Traces"  style="width:100%;">}}

## Connect RUM and Traces

Correlate data collected in front end views with trace and spans on the back end by [Connecting RUM and Traces][2]. Pinpoint issues anywhere in your stack and understand what your users are experiencing. 

{{< img src="tracing/index/RumTraces.png" alt="Connect RUM sessions and traces" style="width:100%;">}}

## Connect Synthetics and Traces

Follow the data from failing synthetic tests directly through to the root causes by digging into related traces. [Connect Synthetics and Traces][3] to speed up troubleshooting your code.

{{< img src="tracing/index/Synthetics.png" alt="Synthetic tests" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/other_telemetry/connect_logs_and_traces/
[2]: /real_user_monitoring/connect_rum_and_traces/
[3]: /synthetics/apm/
