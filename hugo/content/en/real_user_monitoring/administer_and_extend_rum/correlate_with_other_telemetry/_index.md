---
title: Correlate RUM with Other Telemetry
description: Learn how to connect RUM Events with telemetry collected by additional Datadog products.
aliases:
- /real_user_monitoring/correlate_with_other_telemetry/
further_reading:
  - link: '/logs/guide/ease-troubleshooting-with-cross-product-correlation/'
    tag: 'Documentation'
    text: 'Ease troubleshooting with cross-product correlation'
  - link: 'https://www.datadoghq.com/blog/unify-apm-rum-datadog/'
    tag: 'Blog'
    text: 'Correlate RUM events and APM telemetry for full-stack visibility'
---

Correlating data by various Datadog products gives context to help estimate the business impact and find the root cause of an issue in a few clicks. Set up connections between incoming data to facilitate pivots in your explorers and dashboards.

## Correlate RUM and Agent Observability

Correlate RUM sessions with Agent Observability traces to see how your web application interacts with AI agents, from frontend user interactions to backend AI processing. To set it up, see [Correlate Agent Observability with RUM][4].

## Correlate RUM and frontend logs

Correlate data collected from user sessions and view events with logs to gain deeper insights into application behavior and simplify troubleshooting. To set it up, see [Correlate RUM and Frontend Logs][1].

{{< img src="real_user_monitoring/correlate_rum_and_logs/rum_browser_logs.png" alt="Browser logs in a RUM action" style="width:100%;" >}}

## Correlate RUM and Synthetic tests

Follow the data from Synthetic tests directly through to the root causes by investigating related RUM events. [Correlate RUM and Synthetic Tests][3] to have better visibility of your Synthetic tests.

{{< img src="synthetics/guide/rum_in_synthetics/sessions_details_panel.png" alt="Sessions Details Side Panel" style="width:100%;" >}}

## Correlate RUM and traces

To connect frontend RUM events with backend traces, see [Track Frontend-to-Backend Traces][2].

## Next step

Continue to [Correlate Agent Observability with RUM](/real_user_monitoring/administer_and_extend_rum/correlate_with_other_telemetry/llm_observability/).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/administer_and_extend_rum/correlate_with_other_telemetry/logs/
[2]: /real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/
[3]: /real_user_monitoring/administer_and_extend_rum/correlate_with_other_telemetry/synthetics/
[4]: /real_user_monitoring/administer_and_extend_rum/correlate_with_other_telemetry/llm_observability/
