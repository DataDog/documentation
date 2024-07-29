---
title: Correlate APM Data with Other Telemetry
description: Learn how to connect APM data with telemetry collected by additional Datadog products.
further_reading:
  - link: '/logs/guide/ease-troubleshooting-with-cross-product-correlation/'
    tag: 'Documentation'
    text: 'Ease troubleshooting with cross-product correlation'
  - link: 'https://www.datadoghq.com/blog/link-dbm-and-apm/'
    tag: 'Blog'
    text: 'Seamlessly correlate DBM and APM telemetry to understand end-to-end query performance'
---

Correlating data by various Datadog products gives context to help estimate the business impact and find the root cause of an issue in a few clicks. Set up connections between incoming data to facilitate quick pivots in your explorers and dashboards.

## Correlate Database Monitoring and traces

Inject trace IDs into DBM data collection to correlate the two data sources. View database information in APM and APM information in DBM to see a comprehensive, unified view of your system's performance. See [Connect DBM and Traces][4] to set it up.

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="Filter your database hosts by the APM services that call them.">}}


## Correlate logs and traces

Inject trace IDs into logs, and leverage unified service tagging to find the exact logs associated with a specific service and version, or all logs correlated to an observed trace. See [Connect Logs and Traces][1] to set it up.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Connect Logs And Traces" style="width:100%;">}}

## Correlate RUM and traces

Correlate data collected in front end views with trace and spans on the back end by [Connecting RUM and Traces][2]. Pinpoint issues anywhere in your stack and understand what your users are experiencing. 

{{< img src="tracing/index/RumTraces.png" alt="Connect RUM sessions and traces" style="width:100%;">}}

## Correlate synthetic tests and traces

Follow the data from failing synthetic tests directly through to the root causes by digging into related traces. [Connect Synthetics and Traces][3] to speed up troubleshooting your code.

{{< img src="tracing/index/Synthetics.png" alt="Synthetic tests" style="width:100%;">}}

## Correlate profiles and traces

Performance data for application code that has both tracing and profiling enabled is automatically correlated, letting you move between the two types of analysis to troubleshoot and problem solve. You can move directly from span information to profiling data on the Code Hotspots tab, and find specific lines of code related to performance issues. Similarly, you can debug slow and resource-consuming endpoints directly in the Profiling UI. 

Read [Investigate Slow Traces or Endpoints][5] for more information.

{{< img src="profiler/code_hotspots_tab-2.mp4" alt="Code Hotspots tab shows profiling information for a APM trace span" video=true >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/other_telemetry/connect_logs_and_traces/
[2]: /real_user_monitoring/platform/connect_rum_and_traces/
[3]: /synthetics/apm/
[4]: /database_monitoring/connect_dbm_and_apm/
[5]: /profiler/connect_traces_and_profiles/