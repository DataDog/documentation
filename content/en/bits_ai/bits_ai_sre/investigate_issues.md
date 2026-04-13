---
title: Investigate Issues
description: "Use Bits AI SRE to automatically investigate monitor alerts and provide root cause analysis for faster incident resolution."
aliases:
- /bits_ai/bits_ai_sre/investigate_alerts/
---

## Start a Bits AI SRE investigation

You can launch a Bits AI SRE investigation from several entry points:

- Monitor alerts, which you can trigger in two ways:
  - [**Manual**](#manual-monitor-alerts): Start from an individual monitor alert
  - [**Automatic**](#enable-automatic-investigations): Configure monitors to automatically launch a Bits investigation whenever they enter an alert state
- [APM latency graphs on service pages](#apm-latency-graphs-on-service-pages)
- [APM latency Watchdog stories](#apm-latency-watchdog-stories)
- [General prompt](#general-prompt)

### Manually start an investigation

#### Monitor alerts {#manual-monitor-alerts}

You can invoke Bits on an individual monitor alert or warn event from several entry points:

##### Option 1: Bits AI SRE Monitors list {#monitor-list}
1. Go to [**Bits AI SRE** > **Monitors** > **Supported**][5].
1. Click **Investigate Recent Alerts** and select an alert.

##### Option 2: Monitor status page
Navigate to the monitor status page of a [Bits AI SRE-supported monitor](#supported-monitors) and click **Investigate with Bits AI SRE** in the top-right corner.

##### Option 3: Monitor event side panel
In the monitor event side panel of a [Bits AI SRE-supported monitor](#supported-monitors), click **Investigate with Bits AI SRE**.

##### Option 4: Slack
To use the Slack integration, [connect your Slack workspace to Bits AI SRE][8].

In Slack, reply to a monitor notification with `@Datadog Investigate this alert`.

#### APM latency (Preview)

{{< callout url="http://datadoghq.com/product-preview/bits-ai-sre-pilot-features" >}}
Bits AI SRE investigations started from APM latency graphs and APM Watchdog stories are in Preview. Click <strong>Request Access</strong> to join the Preview program.
{{< /callout >}}

##### APM latency graphs on service pages

1. In Datadog, navigate to [APM][1] and open the service or resource page you want to investigate. Next to the latency graph, click **Investigate**.
1. Click and drag your cursor over the point plot visualization to make a rectangular selection over a region that shows unusual latency to seed the analysis. Initial diagnostics on the latency issue appear, including the observed user impact, anomalous tags contributing to the issue, and recent changes. For more information, see [APM Investigator][2].
1. Click **Investigate with Bits AI SRE** to run a deeper investigation.

##### APM latency Watchdog stories

On a Watchdog APM latency story, click **Investigate with Bits AI SRE**.

#### General prompt (Preview)

Click on [New Investigation][16] and describe the issue you want to troubleshoot. Include as much relevant context as possible:
- Observed symptoms (e.g., errors, latency) including any links to Datadog telemetry that indicate this
- Relevant tags such as service, application, or environment that isolate the issue
- A time window (default is past 4 hours)

The more specific your prompt, the more accurate and useful the investigation will be.

Good examples:
- Investigate requests to search-service in prod. Some requests are returning empty results when they should not. The issue began around 10:00 UTC.
- Investigate what's causing these errors: https://app.datadoghq.com/logs?query=service%3Asearch-service%20status%3Aerror They started appearing about 5 minutes ago.

Bad example:
- App is slow. What’s wrong?

You can also trigger an investigation from Slack.  Mention Datadog in a message: `@Datadog Investigate high CPU in ai-gateway in prod over the last 30 minutes`. If invoked within a Slack thread, Bits AI SRE automatically uses the entire thread as investigation context.

<div class="alert alert-info">
Starting Bits AI SRE investigations from a prompt is in Preview for all customers. During this period, the number of investigations per day is rate-limited. This limit does not apply to generally available entry points, such as monitors.</div>

### Enable automatic investigations

In addition to manual investigations, you can configure Bits to run automatically when a monitor transitions to the alert state:

#### From the Bits AI SRE Monitors list
1. Go to [**Bits AI SRE** > **Monitors** > **Supported**][5].
1. Toggle **Auto-Investigate** on for a single monitor, or bulk-edit multiple monitors by selecting multiple monitors, then clicking **Auto-Investigate All**.

#### For a single monitor
1. Open the monitor's status page and click **Edit**.
1. Scroll to **Configure notifications & automations** and toggle **Investigate with Bits AI SRE**.

<div class="alert alert-info"><ul><li>Enabling automatic investigations using the Datadog API or Terraform is not supported.</li><li>An investigation initiates when a monitor transitions to the alert state.</li><li>Transitions to the warn or no data state, <a href="/monitors/notify/#renotify">renotifications</a>, and test notifications do not trigger automatic investigations.
</li></ul></div>

### Supported monitors

Bits is able to run investigations on the following monitor types:
  - Metric
  - Anomaly
  - Forecast
  - Integration
  - Outlier
  - Logs
  - APM (`APM Metrics` type only; `Trace Analytics` is not supported)
  - Synthetics API and Browser tests (Preview)

<div class="alert alert-info">
Starting Bits AI SRE investigations from Synthetic tests is in Preview for all customers.</div>

## How Bits AI SRE investigates
When Bits AI SRE investigates an issue, it operates in a continuous loop of observation, reasoning, and action. It begins by forming hypotheses about the potential root cause, then uses its tools to query telemetry data to validate or invalidate those hypotheses. Each step builds on prior findings. As new evidence emerges, Bits AI SRE updates its understanding, refines its reasoning, and chains together additional investigative steps—adapting and course-correcting until it converges on the most likely root cause.

At the end of an investigation, Bits AI SRE either presents a clear, evidence-backed conclusion or marks the investigation as inconclusive when the available data is insufficient to support a defensible conclusion.

{{< img src="bits_ai/bits_ai_sre_investigation_hypotheses.png" alt="Flowchart showing the hypotheses Bits AI SRE built and tested" style="width:100%;" >}}

### Supported data sources
Bits uses the following data sources during investigations:

#### Datadog products
- Metrics
- APM traces
- Logs
- Dashboards
- Events
- [Change Tracking][4]
- [Source code][17] (GitHub only)
- Watchdog
- Real User Monitoring
- Network Path
- Database Monitoring
- Continuous Profiler

<div class="alert alert-tip"><b>Add service scoping:</b> For monitors associated with a service, add a service tag to the monitor, or filter or group the monitor query by service. This helps Bits AI SRE correlate data more accurately.</div>

#### Third-party integrations
- Grafana
- Dynatrace
- Sentry
- Splunk
- ServiceNow
- Confluence

<div class="alert alert-info">
Third-party integrations are in Preview for all customers.</div>

For best practices on maximizing the effectiveness of investigations, see [Knowledge sources][9].

### Investigation display modes
There are two display modes: Agent Trace and Investigation.

While an investigation is in progress, Bits captures every step it takes—including how it evaluates evidence and makes decisions—in the **Agent Trace** view. This provides a real-time, detailed record of the agent’s reasoning process.

Once the investigation is complete, you can switch to the **Investigation** view to explore a structured, tree-based visualization of the investigative path, making it easier to understand findings and conclusions at a glance.


## Reports

The Reports tab enables you to track the number of investigations run over time by monitor, user, service, and team. You can also track the mean time to conclusion to assess the impact of Bits AI SRE on your on-call efficiency.

[1]: https://app.datadoghq.com/apm/home
[2]: /tracing/guide/latency_investigator/
[3]: /bits_ai/bits_ai_sre/configure/#configure-knowledge-base-integrations
[4]: /change_tracking
[5]: https://app.datadoghq.com/bits-ai/monitors/supported
[6]: https://app.datadoghq.com/monitors/manage
[8]: /bits_ai/bits_ai_sre/configure#slack
[9]: /bits_ai/bits_ai_sre/knowledge_sources/
[10]: /incident_response/on-call/pages/#page-from-notifications
[14]: /incident_response/case_management/notifications_integrations/#third-party-tickets
[15]: /account_management/rbac/permissions/#bits-ai
[16]: https://app.datadoghq.com/bits-ai/investigations/new
[17]: /source_code/#tag-your-apm-telemetry-with-git-information
