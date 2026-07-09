---
title: Agent Console
description: Monitor and analyze coding agent and Bits AI agent usage, cost, and performance across your organization in Datadog Agent Console.
further_reading:
  - link: '/ai_agents_console/setup/'
    tag: 'Documentation'
    text: 'Set Up Agent Console'
  - link: '/integrations/anthropic-usage-and-costs/'
    tag: 'Documentation'
    text: 'Anthropic Usage and Costs integration'
  - link: '/integrations/cursor/'
    tag: 'Documentation'
    text: 'Cursor integration'
  - link: "https://www.datadoghq.com/blog/claude-code-monitoring"
    tag: "Blog"
    text: "Monitor Claude Code adoption in your organization with Datadog's Agent Console"
---

{{< callout url="#" btn_hidden="true" header="Preview">}}
Agent Console is in Preview and available to all Datadog customers.
{{< /callout >}}

The [Agent Console][1] provides centralized monitoring for AI agents across your organization. It collects logs and metrics from coding agents and Datadog's own [Bits AI agents](#bits-ai-agents), surfacing them in real time to give you visibility into usage, cost, latency, productivity impact, and emerging problem patterns.

Agent Console supports the following coding agents:

| Tool | Description |
|------|-------------|
| [Claude Code][2] | Anthropic's agentic coding tool |
| [Cursor][3] | AI-powered code editor |
| [GitHub Copilot][4] | GitHub's AI-powered code completion tool |


## Coding agents

The {{< ui >}}Coding Agents{{< /ui >}} tab gives you a top-level view of coding agent activity across your organization. By default, the view aggregates all coding agents and can be filtered to a single agent.

{{< img src="/ai_agents_console/agent_console_agent_findings.png" alt="Agent Console Coding Agents tab showing summary of agent findings with metrics and trends for Claude Code, Cursor, and GitHub Copilot" style="width:100%;" >}}

### Agent findings

The {{< ui >}}Agent Findings{{< /ui >}} panel summarizes high-level activity for the selected time range, including total spend, total users, sessions, time to merge, lines of code, and average turns per session. The stacked chart breaks down activity by agent (for example, Claude Code and Cursor) so you can compare adoption over time.

### Impact metrics

The {{< ui >}}Impact Metrics{{< /ui >}} panel measures the effect of AI-assisted development on your software delivery lifecycle using DORA-style metrics, with side-by-side comparisons between AI-assisted and non-AI work.

- **Adoption**: track how much code is being produced by AI, including AI-assisted commits and AI-assisted PRs.
- **Velocity**: measure how fast changes reach production, including change lead time and PR review time.
- **Stability**: track how reliable changes are after release, including change failure rate and recovery time.

### Detected problems

The {{< ui >}}Detected Problems{{< /ui >}} panel highlights common problem patterns your team is encountering and recommends fixes. The Sankey diagram shows how problem patterns (such as skipped checks, retry loops, and file rereads) flow from individual agents into specific repositories, with an estimated monthly cost for each pattern.

{{< img src="/ai_agents_console/detected_problems_skipped_checks.png" alt="Detected Problems Sankey diagram showing how sessions from Claude Code, Cursor, and GitHub Copilot map to problem patterns, highlighting skipped checks" style="width:90%;" >}}

Click a {{< ui >}}Problem Pattern{{< /ui >}} node to open a detail view that includes the pattern definition, estimated monthly cost across your organization, a list of flagged sessions, and a recommended fix.

### Individual agent dashboards

The {{< ui >}}Coding Agents{{< /ui >}} tab displays a tile for each connected coding agent (such as Claude Code, GitHub Copilot, and Cursor). Each tile shows a summary of that agent's activity, including total users, total spend, and cost per line of code.

{{< img src="/ai_agents_console/coding_agent_dashboard_claude.png" alt="The Claude Code dashboard displays widgets for lines added, sessions, commits, and performance metrics" style="width:100%;" >}}

Click an agent tile, or select from the {{< ui >}}All Coding Agents{{< /ui >}} dropdown at the top of the page, to open a dedicated dashboard for that agent. The dedicated dashboard includes summary tiles for total spend, sessions, commits, and lines added, along with performance charts covering request volume, latency, model usage patterns, lines added vs. removed, and tool accepts vs. rejects.

## Analyze agent usage

The {{< ui >}}Analytics{{< /ui >}} tab provides granular details for individuals and teams, helping you identify power users, outliers, and team-level adoption patterns.

{{< img src="/ai_agents_console/agent_console_analytics.png" alt="Agent Console Analytics tab displaying detailed user and team analytics for coding agent usage, including leaderboards and charts" style="width:100%;" >}}

### Team comparison

The {{< ui >}}Comparison{{< /ui >}} panel helps you identify teams that are over- or under-investing in AI tooling relative to their output. Compare spend, cost per line, and model usage across teams and against your organization baseline to find where efficiency gains are possible or where costs are running unexpectedly high.

### User analytics

{{< img src="/ai_agents_console/user_analytics_user_detail_panel.png" alt="Agent Console User Analytics panel showing detailed breakdown for a selected user, including spend by agent, model mix, and PR history" style="width:100%;" >}}

The {{< ui >}}User Analytics{{< /ui >}} panel gives you visibility into how individual engineers are using AI tooling across your organization. Use the panel to:
- Identify your highest spenders and most productive contributors
- Spot efficiency outliers — engineers with high spend but low output, or vice versa
- See a full cost breakdown by user, agent, and model
- Examine any individual's spend, PR history, and model mix

## Bits AI agents

{{< img src="/ai_agents_console/bits_ai_agents.png" alt="Bits AI Agents tab with a combined agent activity chart over time and individual cards for Bits Investigation, Bits Code, and Bits Agent Builder showing recent investigations, sessions, and executions" style="width:100%;" >}}

The {{< ui >}}Bits AI Agents{{< /ui >}} tab shows usage of Datadog's built-in AI agents alongside your coding agents. The combined view of investigations, sessions, and executions across all Datadog agents lets you correlate Bits AI activity with the rest of your organization.

Individual cards summarize activity for each Bits AI agent, including [Bits Investigation][5], [Bits Code][6], and [Bits Agent Builder][7]. Click {{< ui >}}View Details{{< /ui >}} on a card to examine that agent.

## Set up

To start sending data to Agent Console, see [Set Up Agent Console][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[4]: /integrations/github-copilot/
[5]: /bits_ai/bits_investigation/
[6]: /bits_ai/bits_code/
[7]: /actions/agents/
[8]: /ai_agents_console/setup/
