---
title: Agent Console
description: Monitor and analyze AI agent usage, cost, and productivity across your organization in Datadog Agent Console, including coding agents, knowledge agents, and Bits AI agents.
further_reading:
  - link: '/ai_agents_console/setup/'
    tag: 'Documentation'
    text: 'Set Up Agent Console'
  - link: '/integrations/anthropic-usage-and-costs/'
    tag: 'Documentation'
    text: 'Anthropic Usage and Costs integration'
  - link: '/integrations/openai-codex/'
    tag: 'Documentation'
    text: 'OpenAI Codex integration'
  - link: '/integrations/openai/'
    tag: 'Documentation'
    text: 'OpenAI integration'
  - link: '/integrations/cursor/'
    tag: 'Documentation'
    text: 'Cursor integration'
  - link: "https://github.com/datadog-labs/trajectory"
    tag: "Source Code"
    text: "Trajectory"
  - link: "https://www.datadoghq.com/blog/claude-code-monitoring"
    tag: "Blog"
    text: "Monitor Claude Code adoption in your organization with Datadog's Agent Console"
  - link: "https://www.datadoghq.com/blog/datadog-agent-console/"
    tag: "Blog"
    text: "Monitor agent adoption with Datadog Agent Console"
---

{{< callout url="#" btn_hidden="true" header="Preview">}}
Agent Console is in Preview and available to all Datadog customers.
{{< /callout >}}

The [Agent Console][1] provides centralized monitoring for AI tools across your organization. It collects usage, cost, and activity data from coding agents, knowledge agents, desktop agents, and Datadog's own [Bits AI agents](#bits-ai-agents). Use it to understand where your AI spend goes, who uses which tools, and how AI-assisted work affects delivery.

## Supported AI tools

| Tool | Type | Data source |
|------|------|-------------|
| Claude Code | Coding agent | [Anthropic Usage and Costs][2] integration or OpenTelemetry |
| Cursor | Coding agent | [Cursor][3] integration |
| GitHub Copilot | Coding agent | [GitHub Copilot][4] integration |
| Codex | Coding agent | [OpenAI Codex][5] integration |
| Claude Chat, Claude Cowork, Claude Design | Knowledge agent | [Anthropic Usage and Costs][2] integration |
| ChatGPT Work | Knowledge agent | [OpenAI][6] integration |
| Microsoft Copilot 365 (Preview) | Knowledge agent | Microsoft Copilot integration. To request access, contact your Datadog account team. |
| Other coding and desktop agents | Coding agent | [Trajectory][7] |

[Trajectory][7] is an open source tool that captures sessions from more than 30 coding and desktop agents, including Claude Desktop, Cline, Windsurf, Zed, and Goose. For the full list, see [Supported Clients][8].

To connect these tools, see [Set Up Agent Console][9].

## Overview

The {{< ui >}}Overview{{< /ui >}} tab shows your organization's AI spend, adoption, and productivity in one place.

{{< img src="/ai_agents_console/agent_console_overview.png" alt="Agent Console Overview tab with tiles for tracked AI cost, total users, and cost per observed PR, and a cost breakdown by product area." style="width:100%;" >}}

The summary tiles at the top show tracked AI cost, total users, and cost per observed pull request, each compared with the previous period.

The {{< ui >}}Tracked AI cost{{< /ui >}} chart shows how spend is distributed across product areas, such as coding agents and other agents, and which tools contribute the most. Switch to {{< ui >}}Trend{{< /ui >}} to see how cost changes over time, and select a product area to see more details.

### Productivity

The {{< ui >}}Productivity{{< /ui >}} section shows merged pull requests, time to merge, cost per observed pull request, and resolved Jira issues, plotted against AI cost. These metrics come from your connected [productivity tools][10], such as GitHub and Jira.

{{< img src="/ai_agents_console/agent_console_productivity_overview.png" alt="Productivity section plotting merged PRs, time to merge, cost per observed PR, and resolved Jira issues against cost." style="width:100%;" >}}

### Integrations

The {{< ui >}}Integrations{{< /ui >}} section displays a card for each connected data source, with its status, total users, estimated cost, and token usage. Enable {{< ui >}}Group by Provider{{< /ui >}} to combine products from the same provider, such as Claude Code, Chat, Design, and Cowork under Anthropic.

{{< img src="/ai_agents_console/agent_console_integrations_overview.png" alt="Integrations section with a card for each connected data source, such as Anthropic, OpenAI, Cursor, GitHub, and Jira." style="width:100%;" >}}

Click {{< ui >}}View Dashboard{{< /ui >}} on a card to open a dedicated dashboard for that integration. Filter each dashboard by team, user, and model.

For example, the Anthropic dashboard breaks down estimated cost and tokens by Claude product and model:

{{< img src="/ai_agents_console/agent_console_integrations_anthropic.png" alt="Anthropic dashboard showing estimated cost and tokens, cost by Claude product, cost over time, and tokens by model." style="width:100%;" >}}

The Codex dashboard shows estimated cost, active users, sessions, credits, and tokens, along with usage and adoption trends and top users:

{{< img src="/ai_agents_console/agent_console_codex_integration.png" alt="Codex dashboard showing estimated cost, active users, sessions, credits, tokens, usage trends, and top users." style="width:100%;" >}}

## My Usage

The {{< ui >}}My Usage{{< /ui >}} tab shows your own AI usage. It includes your daily spend, stacked by provider, and a breakdown of the tasks you used AI agents for. Filter by provider and model.

{{< img src="/ai_agents_console/agent_console_my_usage.png" alt="My Usage tab showing a personal daily spend chart stacked by provider and a task breakdown chart." style="width:100%;" >}}

Use the side navigation to switch between {{< ui >}}Overview{{< /ui >}}, {{< ui >}}Tasks{{< /ui >}}, {{< ui >}}Productivity{{< /ui >}}, {{< ui >}}Models{{< /ui >}}, {{< ui >}}Skills{{< /ui >}}, {{< ui >}}Tools{{< /ui >}}, and {{< ui >}}Sessions{{< /ui >}}. The Tasks, Skills, Tools, and Sessions views use session data from [Trajectory][7]. The Models view uses data from your connected integrations.

## Usage

The {{< ui >}}Usage{{< /ui >}} tab provides the same views as My Usage, aggregated across your organization. Use it to understand what teams use AI agents for, identify power users and outliers, and compare adoption across teams.

### Tasks

Agent Console classifies agent sessions captured with [Trajectory][7] into task categories, such as code implementation, engineering operations, and knowledge artifacts, and into more specific subcategories. The {{< ui >}}Tasks{{< /ui >}} view plots each category by its share of tasks and spend per active user, and lists the cost, cost per task, and number of tasks for each one.

{{< img src="/ai_agents_console/agent_console_tasks.png" alt="Tasks view with a bubble chart of task categories by share of tasks and spend per user, and a table of cost per category." style="width:100%;" >}}

Select a task category to open a detail panel with its subcategories, cost per task, total task cost, number of tasks, and average turns.

{{< img src="/ai_agents_console/agent_console_tasks_view.png" alt="Engineering Operations task category panel showing tasks by subcategory, cost per task, total cost, and average turns." style="width:100%;" >}}

### Productivity and user analytics

The {{< ui >}}Productivity{{< /ui >}} view gives you visibility into how individual engineers and teams use AI tooling. Use it to:
- Identify your highest spenders and most productive contributors
- Spot efficiency outliers, such as engineers with high spend but low output
- See a full cost breakdown by user, agent, and model
- Examine any individual's spend, pull request history, and model mix

{{< img src="/ai_agents_console/user_analytics_user_detail_panel.png" alt="User detail panel showing a breakdown for a selected user, including spend by agent, model mix, and PR history." style="width:100%;" >}}

### Models, skills, tools, and sessions

The {{< ui >}}Models{{< /ui >}} view shows which models your organization uses, based on data from your connected integrations.

For agents captured with [Trajectory][7], the {{< ui >}}Skills{{< /ui >}}, {{< ui >}}Tools{{< /ui >}}, and {{< ui >}}Sessions{{< /ui >}} views show which skills and tools agents use, and let you examine individual agent sessions.

## Bits AI agents

{{< img src="/ai_agents_console/bits_ai_agents.png" alt="Bits AI Agents tab with a combined agent activity chart over time and individual cards for Bits Investigation, Bits Code, and Bits Agent Builder showing recent investigations, sessions, and executions" style="width:100%;" >}}

The {{< ui >}}Bits AI Agents{{< /ui >}} tab shows usage of Datadog's built-in AI agents alongside your other AI tools. The combined view of investigations, sessions, and executions across all Datadog agents lets you correlate Bits AI activity with the rest of your organization.

Individual cards summarize activity for each Bits AI agent, including [Bits Investigation][11], [Bits Code][12], and [Bits Agent Builder][13]. Click {{< ui >}}View Details{{< /ui >}} on a card to examine that agent.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: /integrations/anthropic-usage-and-costs/
[3]: /integrations/cursor/
[4]: /integrations/github-copilot/
[5]: /integrations/openai-codex/
[6]: /integrations/openai/?tab=apikey
[7]: https://github.com/datadog-labs/trajectory
[8]: https://github.com/datadog-labs/trajectory/blob/main/docs/SUPPORTED-CLIENTS.md
[9]: /ai_agents_console/setup/
[10]: /ai_agents_console/setup/#connect-productivity-tools
[11]: /bits_ai/bits_investigation/
[12]: /bits_ai/bits_code/
[13]: /actions/agents/
