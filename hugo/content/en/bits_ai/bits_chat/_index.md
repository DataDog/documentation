---
title: Bits Chat
description: "Use Bits Chat in Datadog to explore and act on your observability data using natural language."
further_reading:
- link: "bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "/incident_response/incident_management/investigate/incident_ai"
  tag: "Documentation"
  text: "Coordinate incidents with Incident AI"
- link: "/cloud_cost_management/cloud_cost_skill/"
  tag: "Documentation"
  text: "Cloud Cost Skill in Bits Chat"
- link: "/account_management/billing/ai_credits/"
  tag: "Documentation"
  text: "AI Credits"
- link: "https://www.datadoghq.com/blog/datadog-mcp-apps/"
  tag: "Blog"
  text: "Datadog MCP Apps: Interactive experiences in AI workflows"
- link: "https://www.datadoghq.com/blog/introducing-bits-chat/"
  tag: "Blog"
  text: "Search and act across Datadog to resolve issues faster with Bits Chat"
- link: "https://www.datadoghq.com/blog/cloud-cost-skill-bits-chat/"
  tag: "Blog"
  text: "Answer any cost question faster with the Cloud Cost skill in Bits Chat"
aliases:
- /bits_ai/getting_started/
- /bits_ai/chat_with_bits_ai
- /bits_ai/bits_assistant/
- /tracing/guide/latency_investigator/
---

## Overview

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="Full-page Bits Chat interface with suggested tasks" style="width:100%;">}}

Bits Chat helps you search and act across Datadog using natural language. Bits Chat is available across the web application, mobile app, and Slack.

Ask Bits Chat questions like:
- `Why is the error rate spiking on the web-store service?`
- `Summarize the key findings from the Kubernetes overview dashboard`
- `Build me a dashboard to show latency, errors, and request rates for my service`
- `Write a DDSQL query that shows the top 10 services by error count in the last hour`
- `Investigate why EC2 costs changed between January and February`

## Permissions

### Access to Bits Chat

To use Bits Chat, your role must have the **Bits Chat Access** permission. This permission is enabled by default for all three standard Datadog roles: Datadog Admin, Datadog Standard, and Datadog Read Only.

To manage this permission for custom roles, you can [update the role][1] to enable **Bits Chat Access**. 

### Data access through Bits Chat

Bits Chat uses your Datadog role to fetch data, so it can only access the resources you have permission to view or modify. For example, if your role restricts access to a specific set of logs indexes, Bits Chat can only query logs from those indexes. Similarly, if you do not have permission to edit a dashboard, Bits Chat cannot edit that dashboard on your behalf.

## Chat History

Bits Chat saves your conversations. To see past chats, open {{< ui >}}History{{< /ui >}} in [Bits Chat][2], or click {{< img src="bits_ai/icons/clock_historical.svg" inline="true" style="width:16px;" alt="History icon" >}} in the Bits Chat panel.

## Manage and share chats

Click {{< ui >}}...{{< /ui >}} next to a chat in {{< ui >}}History{{< /ui >}}, or in an open chat's header, to {{< ui >}}Rename{{< /ui >}}, {{< ui >}}Share{{< /ui >}}, or {{< ui >}}Delete{{< /ui >}} it. Deleting a chat cannot be undone.

Chats are private by default. To share one, click {{< ui >}}...{{< /ui >}} > {{< ui >}}Share{{< /ui >}} > {{< ui >}}Shared Chat{{< /ui >}}, then click {{< ui >}}Copy Link{{< /ui >}}. Anyone with the link can view the chat, including new messages, but only you can reply.

<div class="alert alert-warning">Shared chats show data retrieved with your permissions. Check the chat before you share it.</div>

Shared links expire automatically (see the expiration date in the {{< ui >}}Share Chat{{< /ui >}} dialog). To stop sharing, open {{< ui >}}Share Chat{{< /ui >}} and select {{< ui >}}Private Chat{{< /ui >}}.

## Reports

The Bits Chat Reports page provides visibility into how your organization uses Bits Chat. Go to [**Bits AI** > **Chat** > **Reports**][3] to view:

- **Top users**: See which team members use Bits Chat the most, ranked by conversation count.
- **Usage trends**: Track conversation volume over time to understand adoption and identify usage patterns.
- **Conversation intent distribution**: See how conversations break down by intent category, such as investigating issues, exploring telemetry, learning Datadog concepts, and configuring observability.

Use these insights to understand adoption patterns, identify power users for best-practice sharing, and assess which use cases deliver the most value for your organization.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/?tab=datadogapplication#update-a-role
[2]: https://app.datadoghq.com/ask
[3]: https://app.datadoghq.com/ask/usage
