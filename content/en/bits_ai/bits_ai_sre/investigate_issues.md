---
title: Investigate issues
description: "Use Bits AI SRE to automatically investigate monitor alerts and provide root cause analysis for faster incident resolution."
aliases: 
- /bits_ai/bits_ai_sre/investigate_alerts/
---

## Start a Bits AI SRE investigation


You can start a Bits AI SRE investigation from:
- Monitor alerts, which you can trigger in two ways:
  - [**Manual**](#manual-monitor-alerts): Start from an individual monitor alert, APM latency graph, or APM Watchdog story
  - [**Automatic**](#enable-automatic-investigations): Configure monitors so that whenever they alert, Bits launches an investigation
- [APM latency graphs on service pages](#apm-latency-graphs-on-service-pages) (Preview)
- [APM latency Watchdog stories](#apm-latency-watchdog-stories) (Preview)

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

#### APM latency

{{< callout url="http://datadoghq.com/product-preview/bits-ai-sre-pilot-features" >}}
Bits AI SRE investigations from APM latency graphs and APM Watchdog stories are in Preview. Click <strong>Request Access</strong> to join the Preview program.
{{< /callout >}}

##### APM latency graphs on service pages

1. In Datadog, navigate to [APM][1] and open the service or resource page you want to investigate. Next to the latency graph, click **Investigate**.
1. Click and drag your cursor over the point plot visualization to make a rectangular selection over a region that shows unusual latency to seed the analysis. Initial diagnostics on the latency issue appear, including the observed user impact, anomalous tags contributing to the issue, and recent changes. For more information, see [APM Investigator][2].
1. Click **Investigate with Bits AI SRE** to run a deeper investigation. 

##### APM latency Watchdog stories

On a Watchdog APM latency story, click **Investigate with Bits AI SRE**. 

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
  - Synthetics API tests (Preview)

{{< callout url="http://datadoghq.com/product-preview/bits-ai-sre-pilot-features" >}}
Bits AI SRE investigations from Synthetic API tests are now in Preview. Click <strong>Request Access</strong> to join the Preview program.
{{< /callout >}}

### Best practices: Add investigation context to your monitors {#best-practices}
Think of onboarding Bits as you would a new teammate: the more context you provide, the better it can investigate.

- **Include Datadog telemetry links**: Add at least one helpful telemetry link in the monitor message. Think about the first place you'd normally look in Datadog when this monitor triggers. It could be a link to any of the following:
   - Datadog dashboard
   - Logs
   - Traces
   - Datadog notebook with helpful widgets
   - Confluence runbook page containing Datadog telemetry links (requires a configured [Confluence integration][3])

   Bits uses these links during the _Runbook_ steps of the initial investigation to identify potential problem areas. Because these links are user-defined, you have control over what Bits reviews, ensuring it focuses on the same data you would, and giving you the flexibility to tailor investigations to your team's workflows. You don't have to format the links in any particular way; plain links work.

- **Add service scoping**: For monitors associated with a service, add a service tag to the monitor, or filter or group the monitor query by service.

   {{< img src="bits_ai/optimization_example.png" alt="Example monitor with optimization steps applied" style="width:100%;" >}}

For additional suggestions on how to optimize investigations, see [Help Bits learn][9].

## How Bits AI SRE investigates

Investigations happen in two phases:

1. Bits begins by **gathering initial context** on the problem and any information that might help it troubleshoot further. Depending on the starting point of the investigation, you may see one or more of the following types of step:
   - **Runbook**: If the starting point is a monitor alert, Bits begins by parsing [Datadog or Confluence links](#best-practices) that you have added to the monitor's message, and uses them as entry points into the investigation.
   - **Memory**: If you have previously interacted with an investigation for the same monitor, Bits recalls any [memories][9] associated with the monitor to inform and accelerate the current investigation.
   - **General search**: Bits automatically scans your Datadog environment to gather additional context about what's happening around the alert.
   - **Trace Analysis**: If the starting point is an APM latency graph, Bits automatically inspects anomalous traces to identify the specific services or tags contributing to latency hotspots. 
   
   {{< img src="bits_ai/bits_ai_sre_investigation_context.png" alt="Flowchart showing Bits AI SRE combining runbook, memory, and general search into initial findings" style="width:100%;" >}}
1. Using the collected context, Bits **builds multiple root cause hypotheses and tests them concurrently**.
   Bits looks at the following data sources:
     - Metrics
     - Traces
     - Logs
     - Dashboards
     - [Change events][4]
     - Kubernetes events
   
   Each hypothesis ends in one of three states: validated, invalidated, or inconclusive. When a hypothesis is validated, Bits generates sub-hypotheses and repeats the same investigative process on them.

   {{< img src="bits_ai/bits_ai_sre_investigation_hypotheses.png" alt="Flowchart showing the hypotheses Bits AI SRE built and tested" style="width:100%;" >}}

## Reports

The Reports tab enables you to track the number of investigations run over time by monitor, user, service, and team. You can also track the mean time to initial findings and conclusion to assess the impact of Bits on your on-call efficiency.

[1]: https://app.datadoghq.com/apm/home
[2]: /tracing/guide/latency_investigator/
[3]: /bits_ai/bits_ai_sre/configure/#configure-knowledge-base-integrations
[4]: /change_tracking
[5]: https://app.datadoghq.com/bits-ai/monitors/supported
[6]: https://app.datadoghq.com/monitors/manage
[8]: /bits_ai/bits_ai_sre/configure#slack
[9]: /bits_ai/bits_ai_sre/help_bits_learn/
[10]: /service_management/on-call/pages/#page-from-notifications
[14]: /service_management/case_management/notifications_integrations/#third-party-tickets
[15]: /account_management/rbac/permissions/#bits-ai
