---
title: Correlate RUM Events with Other Telemetry
description: Learn how to connect RUM Events with telemetry collected by additional Datadog products.
further_reading:
  - link: '/logs/guide/ease-troubleshooting-with-cross-product-correlation/'
    tag: 'Documentation'
    text: 'Ease troubleshooting with cross-product correlation'
  - link: 'https://www.datadoghq.com/blog/unify-apm-rum-datadog/'
    tag: 'Blog'
    text: 'Seamlessly correlate RUM events and APM telemetry for full-stack visibility'
---

Correlating data by various Datadog products gives context to help estimate the business impact and find the root cause of an issue in a few clicks. Set up connections between incoming data to facilitate quick pivots in your explorers and dashboards.

## Correlate RUM and Logs

Correlate data collected from user sessions and view events with logs to gain deeper insights into application behavior and streamline troubleshooting. To set it up, see [Connect Logs and RUM][1].

{{< img src="real_user_monitoring/correlate_rum_and_logs/rum_browser_logs.png" alt="Browser logs in a RUM action" style="width:100%;" >}}

## Correlate RUM and Traces

Correlate data collected in front end views with trace and spans on the back end by connecting RUM and Traces. Pinpoint issues anywhere in your stack and understand what your users are experiencing. For more information, see [Connect RUM and Traces][2].

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM and Traces" style="width:100%;">}}


## Correlate RUM and Synthetic tests

Follow the data from Synthetic tests directly through to the root causes by digging into related rum events. [Connect Synthetics and RUM][3] to have better visibility of your Synthetic tests.

{{< img src="synthetics/guide/rum_in_synthetics/sessions_details_panel.png" alt="Sessions Details Side Panel" style="width:100%;" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/correlate_with_other_telemetry/logs/
[2]: /real_user_monitoring/correlate_with_other_telemetry/apm/
[3]: /synthetics/guide/explore-rum-through-synthetics/