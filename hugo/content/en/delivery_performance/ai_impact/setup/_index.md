---
title: Set Up AI Impact
description: "Configure AI detection sources and AI Impact settings so Datadog can classify pull requests as AI-assisted."
further_reading:
- link: '/delivery_performance/ai_impact/'
  tag: 'Documentation'
  text: 'Learn about AI Impact'
- link: '/delivery_performance/dora_metrics/setup/'
  tag: 'Documentation'
  text: 'Set up DORA Metrics'
- link: '/ai_agents_console/setup/'
  tag: 'Documentation'
  text: 'Set up Agent Console for coding agents'
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
AI Impact is available to all Datadog customers in Preview.
{{< /callout >}}

[AI Impact][1] classifies each pull request as AI-assisted or non-AI based on the sources it detects for your AI coding tools. A source is a signal that an AI coding tool contributed to a commit. 

Configure your AI coding tools and sources at [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Delivery Performance{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}AI Impact{{< /ui >}}][2]. Datadog points you to the recommended source for the most accurate classification for each tool.

## Prerequisites

- AI Impact requires setting up [DORA Metrics][3] with deployment, commit, and pull request data.

- No AI-specific configuration is required to see initial data. For more complete measurement, configure your AI coding tools and sources as described below.

## How AI detection works

Datadog classifies AI activity from the following types of AI tools:

| AI tools | How detection works |
|---|---|
| [Coding assistants](#set-up-coding-assistants) | Detected by co-author patterns, configured integrations, pull request labels, or other data that indicate contributions from an AI tool. AI attribution can be either [direct or inferred](#ai-attribution-modes-for-coding-assistants), depending on the tool's source. |
| [Review agents](#set-up-review-agents) | Detected using mapping rules for pull request comments and GitHub reactions. A review agent is attributed to a pull request when a rule matches a review author to a named agent. |
| [Autonomous agents](#set-up-autonomous-agents) | Detected using mapping rules for author logins, author emails, or commit trailers. An autonomous agent is attributed to a pull request when it creates the first commit in the PR. |

### AI attribution modes for coding assistants

AI Impact classifies each pull request as AI-assisted or non-AI, and every metric is built on that classification. A PR is AI-assisted when at least one of its commits is AI-assisted.

Two attribution modes are available, depending on the signal your tools provide: **direct attribution** and **inferred from user activity**.

| | Direct attribution | Inferred from user activity |
|---|---|---|
| A commit is AI-assisted when | The tool reports AI contribution to that specific commit, for example, Cursor integration reporting AI-generated lines | The commit author created lines of code with the AI tool on the day the commit was created |
| Evidence is tied to | The commit | The author and the calendar day |
| What the metrics tell you | How AI-assisted code performs compared to code written without AI, and how users of one tool compare to users of another | How developers working with AI perform against those working without it, and how users of one tool compare to users of another |

Direct attribution is more precise, because the signal is attached to the change itself. Inferred attribution covers tools that report usage without per-commit detail, and classifies every commit an active author made that day as AI-assisted. A user is active only on days the tool reports lines of code created by that user.

By default, Datadog selects the most precise attribution mode that all [integrated tools](#supported-ai-coding-assistants-and-sources) have in common, so that metrics are comparable across tools on an equal basis. For example, if you're using only Cursor, metrics use direct attribution because that's the most precise method available. If you're using both Cursor and Claude Code, metrics are inferred from user activity because direct attribution is not available for Claude Code.

To select which attribution mode your metrics use in the [AI Impact dashboard][1], set the {{< ui >}}Default AI attribution UI filter{{< /ui >}} in AI Impact settings. The setting affects only how data is displayed in the AI Impact UI, not what Datadog ingests. Both modes continue to collect data regardless of which mode you select.

## Set up coding assistants

[{{< ui >}}AI Impact Settings{{< /ui >}}][2] show which coding assistants and sources Datadog detects. Some coding assistants are detected automatically, when they add themselves as a co-author to the commits they generate.

Co-author detection can undercount AI activity, as not all coding assistants add themselves as co-authors, and a rebase or squash can strip the co-author signature. To measure an AI coding tool more fully, configure a source for it.

### Supported AI coding assistants and sources

Each supported coding assistant has one recommended source per context, listed in the following table. The recommended source is the most accurate one that most users can configure without manual work per pull request, and it ingests data automatically after setup.

| Coding assistant | Recommended Source | Attribution |
|------------------|--------|-------------|
| Claude Code (API or Platform) | [Anthropic Usage and Costs integration][4] | Inferred |
| Claude Code (Enterprise plan) | [Claude Enterprise User Analytics integration][5] | Inferred |
| Claude Code (Teams plan) | [OpenTelemetry](#opentelemetry) | Inferred |
| Claude Code (Amazon Bedrock or Google Vertex AI) | [OpenTelemetry](#opentelemetry) | Inferred |
| Codex | [OpenAI Codex integration][6] | Inferred |
| Cursor | [Cursor integration][7] | Direct |
| GitHub Copilot | [GitHub Copilot integration][8] | Inferred |

To track other coding assistants or use a different source for a supported coding assistant, the following sources are available for all coding assistants:

- [PR labels](#pr-label-detection): (Direct attribution) PRs with a designated label are marked as AI-assisted.
- [Public API](#datadog-public-api): (Inferred from user activity) Send your own event data, and Datadog infers AI attribution from it.

### Configure a source for a coding assistant

1. In [{{< ui >}}AI Impact Settings{{< /ui >}}][2], open the {{< ui >}}Coding assistants{{< /ui >}} tab. The tab lists the AI tools automatically detected through co-author detection, as well as any other configured assistants.
1. If the coding assistant you want to track is already listed, select it to configure a source. Otherwise, click {{< ui >}}Add a coding assistant{{< /ui >}} and select the coding assistant.
1. For Claude Code, select the plan you use or the gateway you route through. The [recommended source](#supported-ai-coding-assistants-and-sources) differs for each.
1. Follow the UI guidance to set up the source. Expand the following sections for details on each source type:

{{% collapse-content title="Datadog integrations" level="h4" id="datadog-integrations" %}}
In many cases, the recommended source is a Datadog integration for the coding tool, which reports AI usage directly to Datadog. Of these, only the Cursor integration reports AI contribution directly per commit. The other integrations report user activity, which Datadog uses to infer AI assistance for the commits an active author created that day.

When configuring a coding assistant in {{< ui >}}AI Impact Settings{{< /ui >}}, click the relevant button in the {{< ui >}}Integration{{< /ui >}} section to open the integration tile in Datadog and complete the setup.
{{% /collapse-content %}}

{{% collapse-content title="OpenTelemetry" level="h4" id="opentelemetry" %}}
Use OpenTelemetry to report AI usage data from certain coding assistant deployments, such as Claude Code's Teams plan. Additional configuration is required for Claude Code running through an external gateway such as Amazon Bedrock or Google Vertex AI.

1. Configure Claude Code to send OpenTelemetry data to Datadog, following either [Option 2: OpenTelemetry (OTLP)][10] or [Option 3: Forward data through the Datadog Agent][11].
1. Amazon Bedrock or Google Vertex AI: Set a per-user resource attribute in your Claude Code settings file, for example `~/.claude/settings.json`:

   ```json
   "OTEL_RESOURCE_ATTRIBUTES": "user.email=user@company.com"
   ```

   AI Impact needs `user.email` to tie activity back to an individual developer and infer AI assistance for that developer's commits.
1. Restart Claude Code.

Because `user.email` differs for every developer, it cannot ship in a single shared configuration file. Distribute the settings file with a Mobile Device Management (MDM) system or a provisioning script that writes the value at login.
{{% /collapse-content %}}

{{% collapse-content title="PR label detection" level="h4" id="pr-label-detection" %}}
Pull request labels give direct attribution for any coding assistant, including assistants with no Datadog integration. Datadog marks every commit in a labeled pull request as AI-assisted.

1. When configuring a coding assistant in {{< ui >}}AI Impact Settings{{< /ui >}}, click {{< ui >}}Set Up{{< /ui >}} in the {{< ui >}}PR Labels{{< /ui >}} section.
1. Enter one or more labels that your team uses to identify AI-assisted pull requests, and click {{< ui >}}Save{{< /ui >}}.

Each rule applies to the whole pull request, so it also marks commits written without AI assistance. Label detection depends on consistent labeling by your team, which is difficult to sustain across a large organization. Use it for a coding assistant with no integration, or for a single team that can maintain the practice.
{{% /collapse-content %}} 

{{% collapse-content title="Datadog public API" level="h4" id="datadog-public-api" %}}
Use the [Datadog public API][13] to send your own AI usage data to Datadog when your organization routes AI coding tools through an internal gateway. The API is also an option for tracking a coding assistant that has no Datadog integration. Datadog infers AI assistance from the user activity you report.
{{% /collapse-content %}}

{{% collapse-content title="Co-author signatures" level="h4" id="co-author-signatures" %}}
Some coding assistants add themselves as a co-author to the commits they generate. Datadog detects these co-author signatures automatically—no additional setup is required. Because the signature is attached to the commit, co-author detection provides direct attribution.

Co-author detection can undercount AI activity, as not all coding assistants add themselves as co-authors, and a rebase or squash can strip the co-author signature. To measure a coding assistant more fully, configure another source for it.
{{% /collapse-content %}}

## Set up review agents

Review agents are detected from pull request comments and GitHub reactions. Define mapping rules to match review comment authors to named agents.

## Set up autonomous agents

Autonomous agents open pull requests on their own rather than assisting a developer in an editor. Datadog detects most autonomous agents automatically from known agent patterns. You can also define mapping rules to identify agents that Datadog does not automatically detect.

To track an agent with a mapping rule:

1. Open the {{< ui >}}Autonomous agents{{< /ui >}} tab in AI Impact settings.
1. Click {{< ui >}}Add Autonomous Agent{{< /ui >}}.
1. Enter an {{< ui >}}Agent name{{< /ui >}} to identify the autonomous agent in the UI.
1. Define one or more rules that identify the agent's pull requests.

### Identify automation bots

Automation bots, such as dependency updaters and release bots, are not AI agents, and their activity is not relevant to AI Impact. Identifying a bot keeps its activity out of your AI Impact baseline.

Enable automatic bot detection (for GitHub) and define custom mapping rules in [Delivery Performance general settings][12] to detect automation bot-authored commits and PRs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/dora/ai-impact
[2]: https://app.datadoghq.com/ci/settings/dora/integrations
[3]: /delivery_performance/dora_metrics/setup/
[4]: /integrations/anthropic-usage-and-costs/
[5]: /integrations/claude-enterprise-user-analytics/
[6]: /integrations/openai-codex/
[7]: /integrations/cursor/?tab=cursorintegrationindatadog#overview
[8]: /integrations/github-copilot/
[9]: /delivery_performance/ai_impact/#ai-attribution
[10]: /ai_agents_console/setup/#option-2-opentelemetry-otlp
[11]: /ai_agents_console/setup/#option-3-forward-data-through-the-datadog-agent
[12]: https://app.datadoghq.com/ci/settings/dora
[13]: /api/latest/
