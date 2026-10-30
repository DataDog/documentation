---
title: Investigate Issues
description: "Use Bits Investigation to automatically investigate monitor alerts and provide root cause analysis for faster incident resolution."
aliases:
- /bits_ai/bits_ai_sre/investigate_alerts/
- /bits_ai/bits_investigation/investigate_alerts/
- /bits_ai/bits_ai_sre/investigate_issues/
further_reading:
- link: "https://www.datadoghq.com/blog/bits-ai-sre-deeper-reasoning"
  tag: "Blog"
  text: "Meet the new Bits Investigation: Deeper reasoning, twice as fast"
---

## Start a Bits investigation

You can launch a Bits investigation from several entry points in the Datadog UI:

- Monitor alerts, which you can trigger in two ways:
  - [**Manual**](#manual-monitor-alerts): Start from an individual monitor alert
  - [**Automatic**](#enable-automatic-investigations): Configure monitors to automatically launch a Bits investigation whenever they enter an alert state
- [Synthetic test details page](#from-the-synthetic-test-details-page)
- [Real User Monitoring](#real-user-monitoring)
- [Error Tracking](#error-tracking)
- [General prompt](#general-prompt)

You can also use Bits Investigation from AI assistants, applications, and the command line. For more information, see the [Use Bits Investigation from MCP, the API, or the CLI](#use-bits-investigation-from-mcp-the-api-or-the-cli) section.

### Monitor alerts {#manual-monitor-alerts}

You can invoke Bits on an individual monitor alert or warn event from several entry points:

#### Option 1: Bits Investigation Monitors list {#monitor-list}
1. Go to [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Supported{{< /ui >}}][5].
1. Click {{< ui >}}Investigate Recent Alerts{{< /ui >}} and select an alert.

#### Option 2: Monitor status page
Navigate to the monitor status page of a [Bits Investigation-supported monitor](#supported-monitors) and click {{< ui >}}Investigate with Bits Investigation{{< /ui >}} in the top-right corner.

#### Option 3: Monitor event side panel
In the monitor event side panel of a [Bits Investigation-supported monitor](#supported-monitors), click {{< ui >}}Investigate with Bits Investigation{{< /ui >}}.

#### Option 4: Slack
To use the Slack integration, [connect your Slack workspace to Bits Investigation][8].

In Slack, reply to a monitor notification with `@Datadog Investigate this alert`.

### Synthetic tests

When a Synthetic Browser or API test monitor triggers, you can launch a Bits investigation to identify the root cause. Bits analyzes Synthetic test results and history alongside traces, logs, and metrics. It surfaces a likely root cause and identifies whether the failure reflects a real regression or a misconfiguration.

#### From the Synthetic test details page

1. On the [Synthetic Tests][18] page, open the Synthetic test you want to investigate and go to the {{< ui >}}Timeline{{< /ui >}} section.
1. Select the {{< ui >}}Alert Triggered{{< /ui >}} event for the failing test run.
1. Click {{< ui >}}Investigate with Bits{{< /ui >}}.

The investigation opens in a new page, and you can also view it from the test details page after it runs.

#### From a Synthetic monitor

Synthetic monitors support the same monitor-based entry points as other supported monitor types. See [Monitor alerts](#manual-monitor-alerts) for the available options, or toggle {{< ui >}}Auto-Investigate{{< /ui >}} on a Synthetic monitor to start investigations automatically. For details, see [Enable automatic investigations](#enable-automatic-investigations).

### Real User Monitoring

You can launch a Bits investigation from several places in Real User Monitoring (RUM):

- Recommendation cards on the RUM **Optimization** page and in Operations Monitoring. For details, see [Optimize Performance with Bits AI][19].
- The **Anomaly · Investigate** button on a RUM vital chart. For details, see [Investigate Regressions and Alerts with Bits AI][20].
- RUM monitors, which support the same monitor-based entry points as other supported monitor types, including [automatic investigations](#enable-automatic-investigations). For details, see [Investigate Regressions and Alerts with Bits][20].

### Error Tracking

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Bits Investigation in Error Tracking is in Preview.
{{< /callout >}}

You can launch a Bits investigation from an Error Tracking issue. To start an investigation, click {{< ui >}}Investigate this issue{{< /ui >}} on the {{< ui >}}Review{{< /ui >}} tab of the issue panel. Bits analyzes the error, its stack trace, and related telemetry. If you set up [Source Code Integration][17], Bits also analyzes your source code. It then summarizes the root cause and impact in the issue panel. For details, see [Investigate Errors with Bits AI][21].

### General prompt

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

You can also trigger an investigation from Slack.  Mention Datadog in a message: `@Datadog Investigate high CPU in ai-gateway in prod over the last 30 minutes`. If invoked within a Slack thread, Bits Investigation automatically uses the entire thread as investigation context.


### Enable automatic investigations

In addition to manual investigations, you can configure Bits to run automatically when a monitor transitions to the alert state:

#### From the Bits Investigation Monitors list
1. Go to [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Supported{{< /ui >}}][5].
1. Toggle {{< ui >}}Auto-Investigate{{< /ui >}} on for a single monitor, or bulk-edit multiple monitors by selecting multiple monitors, then clicking {{< ui >}}Auto-Investigate All{{< /ui >}}.

#### For a single monitor
1. Open the monitor's status page and click {{< ui >}}Edit{{< /ui >}}.
1. Scroll to {{< ui >}}Configure notifications & automations{{< /ui >}} and toggle {{< ui >}}Investigate with Bits Investigation{{< /ui >}}.

<div class="alert alert-info"><ul><li>You can't enable automatic investigations on a monitor through the Datadog API or Terraform. To trigger an individual investigation programmatically, see <a href="#use-bits-investigation-from-mcp-the-api-or-the-cli">Use Bits Investigation from MCP, the API, or the CLI</a>.</li><li>An investigation initiates when a monitor transitions to the alert state.</li><li>Transitions to the warn or no data state, <a href="/monitors/notify/#renotify">renotifications</a>, and test notifications do not trigger automatic investigations.
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
  - Composites
  - SLOs
  - Synthetics API and Browser tests
  - RUM

## Use Bits Investigation from MCP, the API, or the CLI

### Requirements

Triggering and steering investigations requires the `Bits Investigations Write` [permission][15]. Searching and retrieving investigations requires `Bits Investigations Read`.

### Datadog MCP Server

The Datadog Model Context Protocol (MCP) Server's `investigator` toolset lets AI assistants trigger investigations for monitor alerts, incidents, or a natural-language description. The tools also support searching investigations, retrieving findings, and steering a running investigation with additional context.

For available tools, required permissions, and example prompts, see [Investigations in the MCP tools reference][22]. To connect an AI assistant and enable the toolset, see [Set Up the Datadog MCP Server][23].

Paste the following prompt into your AI assistant to enable the `investigator` toolset:

{{< code-block lang="text" wrap="true" >}}
Enable the "investigator" toolset (Bits AI investigations) on my Datadog MCP server.

1. Find my Datadog MCP server config. It's the server whose URL is on a Datadog "mcp." host and ends in /api/unstable/mcp-server/mcp. Look in, for example, ~/.cursor/mcp.json or .cursor/mcp.json for Cursor, `claude mcp list` or ~/.claude.json for Claude Code, and ~/.codex/config.toml for Codex.
2. Add "investigator" to the toolsets, keeping every toolset that's already there:
   - If the URL has a `toolsets` query parameter, append `,investigator` to it.
   - If the URL has no `toolsets` parameter, add `?toolsets=core,investigator`. Setting toolsets replaces the defaults, so `core` has to stay.
   - If it uses `toolsets=all`, change it to `toolsets=all,investigator`. "all" doesn't include investigator yet.
   - If the config sets an `X-Datadog-MCP-Toolsets` header instead, add `investigator` there. The header overrides the URL.
3. Don't change anything else: not the host, auth, or other servers.
4. Show me the before and after, then tell me to restart or reload the MCP server. Once it reconnects, confirm that tools like trigger_bits_ai_investigation, trigger_general_investigation, search_investigations, and get_bits_ai_investigation show up.
{{< /code-block >}}

### Bits AI API

Use the Bits AI API to trigger, list, and retrieve investigations from applications and automation scripts. For request parameters, authentication, and code examples, see the [Bits AI API reference][24].

### Pup CLI

Use [pup][25], the Datadog command-line tool, to list, retrieve, and trigger investigations: `pup investigations list`, `pup investigations get`, and `pup investigations trigger`. The trigger command accepts an investigation request from a JSON file with `--file`.

Run `pup investigations --help` for command usage and options.

## How Bits investigates
When Bits investigates an issue, it operates in a continuous loop of observation, reasoning, and action. It begins by forming hypotheses about the potential root cause, then uses its tools to query telemetry data to validate or invalidate those hypotheses. Each step builds on prior findings. As new evidence emerges, Bits updates its understanding, refines its reasoning, and chains together additional investigative steps—adapting and course-correcting until it converges on the most likely root cause.

At the end of an investigation, Bits either presents a clear, evidence-backed conclusion or marks the investigation as inconclusive when the available data is insufficient to support a defensible conclusion.

{{< img src="bits_ai/bits_ai_sre_investigation_hypotheses.png" alt="Flowchart showing the hypotheses Bits built and tested" style="width:100%;" >}}

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
- Error Tracking
- Network Path
- Database Monitoring
- Continuous Profiler

<div class="alert alert-tip"><b>Add service scoping:</b> For monitors associated with a service, add a service tag to the monitor, or filter or group the monitor query by service. This helps Bits correlate data more accurately.</div>

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
There are two display modes: Investigation Steps and Hypothesis Tree.

While an investigation is in progress, Bits captures every step it takes—including how it evaluates evidence and makes decisions—in the {{< ui >}}Investigation Steps{{< /ui >}} view. This provides a real-time, detailed record of the agent’s reasoning process.

Once the investigation is complete, you can switch to the {{< ui >}}Hypothesis Tree{{< /ui >}} view to explore a structured, tree-based visualization of the investigative path, making it easier to understand findings and conclusions at a glance.


## Reports

The {{< ui >}}Reports{{< /ui >}} tab enables you to track the number of investigations run over time by monitor, user, service, and team. You can also track the mean time to conclusion to assess the impact of Bits Investigation on your on-call efficiency.

[3]: /bits_ai/bits_investigation/configure/#configure-knowledge-base-integrations
[4]: /change_tracking
[5]: https://app.datadoghq.com/bits-ai/monitors/supported
[6]: https://app.datadoghq.com/monitors/manage
[8]: /bits_ai/bits_investigation/configure#slack
[9]: /bits_ai/bits_investigation/knowledge_sources/
[10]: /incident_response/on-call/pages/#page-from-notifications
[14]: /incident_response/work_management/notifications_integrations/#third-party-tickets
[15]: /account_management/rbac/permissions/#bits-ai
[16]: https://app.datadoghq.com/bits-ai/investigations/new
[17]: /source_code/#tag-your-apm-telemetry-with-git-information
[18]: https://app.datadoghq.com/synthetics/tests
[19]: /real_user_monitoring/bits_ai/optimize_performance/
[20]: /real_user_monitoring/bits_ai/investigate_regressions/
[21]: /error_tracking/bits_investigation/
[22]: /mcp_server/tools/#investigations
[23]: /mcp_server/setup/
[24]: /api/latest/bits-ai/
[25]: https://github.com/DataDog/pup

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
