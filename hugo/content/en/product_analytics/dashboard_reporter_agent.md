---
title: Dashboard Reporter Agent
description: Get scheduled AI-generated reports on your Product Analytics dashboards in Slack, Microsoft Teams, or email.
disable_toc: false
further_reading:
- link: "/product_analytics/dashboards/"
  tag: "Documentation"
  text: "Product Analytics dashboards"
- link: "/actions/agents/"
  tag: "Documentation"
  text: "Bits Agent Builder"
- link: "/account_management/billing/ai_credits/"
  tag: "Documentation"
  text: "AI Credits"
- link: "/bits_ai/bits_chat/usage/#slack"
  tag: "Documentation"
  text: "Use Bits Chat in Slack"
- link: "/monitors/"
  tag: "Documentation"
  text: "Monitors"
algolia:
  tags: ['dashboard reporter', 'agentic reporting', 'scheduled report', 'product analytics agent']
---

{{< callout url="https://www.datadoghq.com/product-preview/product-analytics-dashboard-reporter-agent/" btn_hidden="false" header="Join the Preview!">}}
Dashboard Reporter Agent is in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

The Dashboard Reporter Agent monitors the Product Analytics dashboards you choose and sends your team a scheduled report in Slack, Microsoft Teams, or email. Each report summarizes what changed, what needs attention, and what to do next, so you don't have to open each dashboard to check. As you ship more features, one agent can monitor many dashboards, including dashboards for past launches that no longer get regular attention.

Dashboard Reporter agents are built on [Bits Agent Builder][1].

<div class="alert alert-info">Dashboard Reporter agents consume <a href="/account_management/billing/ai_credits/">AI Credits</a>.</div>

Reports are text summaries delivered on a schedule. Charts aren't embedded in the report, but each item links to its source chart. To get notified when a metric crosses a threshold, use a [monitor][2].

## Use cases

Use the Dashboard Reporter Agent to:

- **Monitor many features at once**: One agent can cover many dashboards.
- **Keep launches visible**: Subscribe a launch dashboard so it continues to be reviewed after launch attention fades.
- **Share a weekly health update**: Post a weekly report to your team channel so everyone sees the same signals.
- **Brief leadership**: Send key metrics and overall product health without building a slide.
- **Catch regressions early**: A daily report surfaces drops and error spikes close to when they begin.

## How the agent builds a report

- **Full coverage**: The agent reviews every chart on the subscribed dashboards, not only the charts at the top of the page.
- **Period-over-period comparison**: Each report compares the current period to the previous one. A daily report covers the last 24 hours, a weekly report covers the last 7 days, and a monthly report covers the last month.
- **Key metrics first**: Key metrics appear at the top of every report, so your team can track progress from one period to the next.
- **Prioritized by severity**: The agent lists issues from most to least severe and limits the report to the most important items.
- **No filler**: If nothing meaningful changed, the report says so instead of listing minor changes.
- **Linked sources**: Each metric and issue in the report links to its underlying chart.

The agent reads dashboard data with the permissions of the user who created the agent. If that user loses access to a dashboard, the dashboard is no longer included in the report.

### What a report contains

Each report includes:

1. A title with the agent name and the time period covered.
2. Key metrics, compared to the previous period.
3. Notable changes, ranked by severity, each linked to its source chart.
4. Suggested next steps.

## Prerequisites

- Access to Product Analytics and to the dashboards you want to monitor.
- To deliver reports to Slack, the [Datadog Slack integration][3] must be installed in your organization.
- To deliver reports to Microsoft Teams, the [Microsoft Teams integration][4] must be installed in your organization.

## Create a Dashboard Reporter agent

You can start from a dashboard or from the Agents page in Product Analytics.

{{< tabs >}}
{{% tab "From a dashboard" %}}

1. Open the Product Analytics dashboard you want to monitor.
2. Click {{< ui >}}Set up report{{< /ui >}}. If the dashboard is already included in other agents' reports, they are listed here.

   {{< img src="product_analytics/dashboard_reporter_agent/from-dashboard.png" alt="A Product Analytics dashboard header with the Set Up Report button highlighted" style="width:100%;" >}}

**Note**: If more than one agent monitors the same dashboard, their reports can differ, because each agent writes its report independently.

{{% /tab %}}
{{% tab "From the Agents page" %}}

1. In Datadog, go to [**Product Analytics > Agents**][1].
2. Click {{< ui >}}\+ New Agent{{< /ui >}}.
3. Select the {{< ui >}}Dashboard Reporter{{< /ui >}} blueprint.

{{< img src="product_analytics/dashboard_reporter_agent/from-agents.png" alt="The new agent page with the Dashboard Reporter blueprint highlighted under Start from blueprint" style="width:60%;" >}}

[1]: https://app.datadoghq.com/product-analytics/agents
{{% /tab %}}
{{< /tabs >}}

### Configure the agent

1. **Name the agent.** Choose a name that tells readers what the report covers, such as "Checkout Weekly Health." The name appears in the title of every report.
2. **Choose the dashboards to monitor.** Select one or more dashboards. You can add more dashboards later.
3. **Select a report format.** Select a predefined report format, or write your own. For a custom format, describe the questions the report should answer on each run and any formatting requirements.
4. **Choose where to deliver reports.** Select a Slack channel, a Microsoft Teams channel, or an email address.
5. **Set the cadence.** Choose how often the agent runs (daily, weekly, or monthly), the time it sends the report, and the time zone.
6. **Create the agent.** Click {{< ui >}}Create{{< /ui >}}.

## Read reports

Reports arrive in the destination you configured. Each run is also saved on the agent's page, so you can review past reports.

### Ask follow-up questions about a report

You can open a report in Datadog and ask the agent follow-up questions. For example, ask which segment drove a change or what else changed at the same time.

1. Open the report:
   - **From the report message**: In the Slack, Microsoft Teams, or email message, click {{< ui >}}Chat with this report{{< /ui >}}.
   - **From Datadog**: Go to the Agents page and select the agent.
2. Enter your question in the message box and press <kbd>Enter</kbd>.

### Ask Bits AI in Slack

If your reports go to Slack, you can also ask Bits AI about a report without leaving Slack. Mention `@Datadog` with your question, for example: `@Datadog Why did checkout conversion drop this week?`

To use `@Datadog`, you need the Datadog Slack integration with Bits AI enabled. See [Use Bits Chat in Slack][5] for setup.

## Manage Dashboard Reporter agents

To view your agents, go to [**Product Analytics > Agents**][6].

### Edit an agent

You can change an agent's dashboards, report format, destination, or cadence.

1. From the Agents page, click the agent.
2. Make your changes in one of the following ways:
   - **Ask the agent**: Describe the change in the chat. For example: `Add the Checkout Funnel dashboard and send reports on Mondays at 9:00 AM.`
   - **Edit the instructions**: To change dashboards, report format, or destination, click the {{< ui >}}Instructions{{< /ui >}} panel and edit it in Markdown. To change the cadence, expand the {{< ui >}}Automation{{< /ui >}} panel.

### Pause or resume an agent

Pause an agent to stop reports temporarily, for example during a quiet period or while a dashboard is being rebuilt. A paused agent keeps its configuration.

- **To pause an agent**: On the Agents page, hover over the agent and click {{< ui >}}Pause{{< /ui >}}. In the confirmation window, click {{< ui >}}Pause{{< /ui >}} again.
- **To resume an agent**: On the Agents page, hover over the agent and click {{< ui >}}Resume{{< /ui >}}. In the confirmation window, click {{< ui >}}Resume{{< /ui >}}.

### Delete an agent

To stop reports temporarily, [pause the agent](#pause-or-resume-an-agent) instead.

<div class="alert alert-warning">Deleting an agent is permanent. The agent stops sending reports, and you can't restore it.</div>

To delete an agent, go to the Agents page, hover over the agent, and click {{< ui >}}Delete{{< /ui >}}.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/agents/
[2]: /monitors/
[3]: /integrations/slack/?tab=datadogforslack
[4]: /integrations/microsoft_teams/
[5]: /bits_ai/bits_chat/usage/#slack
[6]: https://app.datadoghq.com/product-analytics/agents
