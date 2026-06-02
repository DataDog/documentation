---
title: Agent Console
description: Monitor coding agent and Bits AI agent usage, cost, and performance across your organization in Datadog Agent Console.
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
| [GitHub Copilot][10] | GitHub's AI-powered code completion tool |


## Coding agents

The {{< ui >}}Coding Agents{{< /ui >}} tab gives you a top-level view of coding agent activity across your organization. By default, the view aggregates all coding agents and can be filtered to a single agent.

### Agent findings

The {{< ui >}}Agent Findings{{< /ui >}} panel summarizes high-level activity for the selected time range, including total spend, total users, sessions, time to merge, lines of code, and average turns per session. The stacked chart breaks down activity by agent (for example, Claude Code and Cursor) so you can compare adoption over time.

{{< img src="ai_agents_console/agent-findings.png" alt="Agent Findings panel showing summary tiles for Total Spend, Total Users, Sessions, Time to Merge, Lines of Code, and Average Turns, with a stacked bar chart of agent activity over a week" style="width:100%;" >}}

### Impact metrics

The {{< ui >}}Impact Metrics{{< /ui >}} panel measures the effect of AI-assisted development on your software delivery lifecycle using DORA-style metrics, with side-by-side comparisons between AI-assisted and non-AI work.

- **Adoption**: track how much code is being produced by AI, including AI-assisted commits and AI-assisted PRs.
- **Velocity**: measure how fast changes reach production, including change lead time and PR review time.
- **Stability**: track how reliable changes are after release, including change failure rate and recovery time.

{{< img src="ai_agents_console/impact-metrics.png" alt="Impact Metrics panel with three cards for Adoption, Velocity, and Stability, each containing two trend charts comparing AI-assisted to non-AI work" style="width:100%;" >}}

### Detected problems

The {{< ui >}}Detected Problems{{< /ui >}} panel highlights common problem patterns your team is encountering and recommends fixes. The Sankey diagram shows how problem patterns (such as skipped checks, retry loops, and file rereads) flow from individual agents into specific repositories, with an estimated monthly cost for each pattern.

{{< img src="ai_agents_console/detected-problems.png" alt="Detected Problems Sankey diagram mapping Claude Code, Cursor, and GitHub Copilot sessions to problem patterns such as Skipped checks, Retry loops, and File rereads, then to affected repositories, with a side panel showing cost breakdowns per repository" style="width:100%;" >}}

Select a pattern to open a detail view that includes the pattern definition, estimated monthly cost across your organization, a list of flagged sessions, and a recommended fix.

{{< img src="ai_agents_console/detected-pattern-detail.png" alt="Detected Pattern detail view for Skipped Checks, showing the pattern definition, an $8.5K per month estimated cost, a View Recommendation button, and a list of 12 flagged sessions with users, agents, durations, and costs" style="width:100%;" >}}

### Individual agent dashboards

Select an agent tile to open a dedicated dashboard for that coding agent. Each dashboard includes summary tiles for total spend, sessions, commits, and lines added, along with performance charts covering request volume, latency, model usage patterns, lines added vs. removed, and tool accepts vs. rejects.

Filter each dashboard by team, user, repository, and time range.

{{< img src="ai_agents_console/coding-agent-dashboard.png" alt="Claude Code dashboard in the Coding Agents tab with Teams, Users, and Repository filters; summary tiles for Total Spend, Sessions, Commits, and Lines Added; and Performance charts for Commits Over Time, Pull Requests Over Time, Lines Added vs Removed, and Tool Accepts vs Rejects" style="width:100%;" >}}

## Analyze agent usage

The {{< ui >}}Analytics{{< /ui >}} tab provides granular details for individuals and teams, helping you identify power users, outliers, and team-level adoption patterns.

### Team comparison

The {{< ui >}}Comparison{{< /ui >}} panel shows your team's spend, cost per line, and model usage relative to other teams and the broader organization. The line chart shows the selected metric per engineer over time, and the table breaks down spend per engineer, cost per PR, time to merge, and sessions for each team. Insights on the right highlight notable trends, such as teams that are running well above or below the organization average.

Select {{< ui >}}Team Details{{< /ui >}} on a row to open that team's view.

{{< img src="ai_agents_console/team-comparison.png" alt="Comparison panel with a line chart of spend per engineer across teams over time, insight callouts on the right, and a table comparing spend per engineer, cost per PR, time to merge, and sessions for each team" style="width:100%;" >}}

### User analytics

The {{< ui >}}User Analytics{{< /ui >}} panel breaks down activity by individual user.

#### Top users

Three leaderboards rank your top contributors by spend, lines generated, and merged PRs.

{{< img src="ai_agents_console/top-users.png" alt="User Analytics panel showing three leaderboards: Top Users by Spend, Top Users by Lines Generated, and Top Users by Merged PRs" style="width:100%;" >}}

#### Lines generated vs. spend

The {{< ui >}}Lines Generated vs Spend{{< /ui >}} chart plots each user as a point, with point size reflecting the number of sessions. Both axes are configurable so you can compare lines generated, PRs, or spend.

{{< img src="ai_agents_console/lines-vs-spend.png" alt="Scatter plot of Lines Generated vs Spend, with each user as a bubble sized by number of sessions and labeled with email addresses" style="width:100%;" >}}

#### User cost across agents

The {{< ui >}}User Cost Across Agents{{< /ui >}} table lists every user, the agents they use, their model cost (with a per-model breakdown), lines of code generated, and number of sessions. Search for a specific user or sort by any column.

{{< img src="ai_agents_console/user-cost-across-agents.png" alt="User Cost Across Agents table showing per-user model cost, agents used, lines of code generated, and sessions for 98 users" style="width:100%;" >}}

Select a user to open a detail view that includes their spend, lines generated, pull requests, AI adoption percentage, model mix, and recent pull requests. Switch to the {{< ui >}}GitHub Pull Requests{{< /ui >}} tab to see the user's full PR history.

{{< img src="ai_agents_console/user-detail.png" alt="User detail view for an individual user, showing summary tiles for User Spend, Lines Generated, and Pull Requests; an AI Adoption and Model Mix breakdown; and a Recent Pull Requests table" style="width:100%;" >}}

## Bits AI agents

The {{< ui >}}Bits AI Agents{{< /ui >}} tab shows usage of Datadog's built-in AI agents alongside your coding agents. The combined view of investigations, sessions, and executions across all Datadog agents lets you correlate Bits AI activity with the rest of your organization.

Individual cards summarize activity for each Bits AI agent, including [Bits Investigation][11], [Bits Code][12], and [Bits Agent Builder][13]. Select {{< ui >}}View Details{{< /ui >}} on a card to examine that agent.

{{< img src="ai_agents_console/bits-ai-agents.png" alt="Bits AI Agents tab with a combined agent activity chart over time and individual cards for Bits Investigation, Bits Code, and Bits Agent Builder showing recent investigations, sessions, and executions" style="width:100%;" >}}

## Set up

To start sending data to Agent Console, see [Set Up Agent Console][14].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[10]: /integrations/github-copilot/
[11]: /bits_ai/bits_ai_sre/
[12]: /bits_ai/bits_ai_dev_agent/
[13]: /actions/agents/
[14]: /ai_agents_console/setup/
