---
title: AI Agents Console
private: true
further_reading:
  - link: '/integrations/anthropic-usage-and-costs/'
    tag: 'Documentation'
    text: 'Anthropic Usage and Costs integration'
  - link: '/integrations/cursor/'
    tag: 'Documentation'
    text: 'Cursor integration'
  - link: "https://www.datadoghq.com/blog/claude-code-monitoring"
    tag: "Blog"
    text: "Monitor Claude Code adoption in your organization with Datadog's AI Agents Console"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-agents-console/" btn_hidden="false" header="Join the Preview!">}}
AI Agents Console is in Preview. Complete the form to request access.
{{< /callout >}}

The [AI Agents Console][1] provides centralized monitoring for agentic developer tools. It collects logs and metrics from developer environments and surfaces them in real time within Datadog, giving you visibility into usage, cost, latency, and errors across your organization.

AI Agents Console supports the following integrations:

| Tool | Description |
|------|-------------|
| [Claude Code][2] | Anthropic's agentic coding tool |
| [Cursor][3] | AI-powered code editor |
| GitHub Copilot | Coming soon |

## Set up an integration

### Claude Code

To monitor Claude Code with AI Agents Console, set up the [Anthropic Usage and Costs][4] integration.

After setup, navigate to the [AI Agents Console][1] and click the **Claude Code** tile to view metrics.

### Cursor

To monitor Cursor with AI Agents Console, set up the [Cursor][5] integration using the Datadog Extension for Cursor.

After setup, navigate to the [AI Agents Console][1] and click the **Cursor** tile to view metrics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[4]: /integrations/anthropic-usage-and-costs/
[5]: /integrations/cursor/?tab=datadogextensionforcursor
