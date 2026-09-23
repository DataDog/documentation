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
Bits Chat helps you search and act across Datadog using natural language. Bits Chat is available across the web application, mobile app, and Slack.

Ask Bits Chat questions across these categories:

### Investigate issues and remediate
- `Summarize high severity incidents that have occurred in the last day`
- `What's causing 400 errors on the checkout endpoint in the last hour?`
- `Why is the error rate spiking on the web-store service?`
- `What is the root cause of this error? How did it propagate and what is the impact on users?`
- `What could cause 500 errors on this API endpoint?`

### Explore and analyze telemetry
- `Which services have the most errors right now?`
- `Summarize the key findings from the Kubernetes overview dashboard`
- `What's the success rate for my top API endpoints over the past week?`
- `Show me error rates for the checkout service over the last 24 hours`
- `Are there any incidents related to Kafka lag?`

### Learn Datadog concepts and how-to
- `How do I configure log collection for the Datadog Agent?`
- `What is the difference between a metric monitor and an anomaly monitor?`
- `What permission do I need to create a new connection?`
- `Can I set the timepicker on a notebook to read-only?`

### Set up and optimize observability
- `Do we already have monitors for high latency on the payments service?`
- `Build me a dashboard to show latency, errors, and request rates for my service`
- `How can I put a team tag on this monitor?`
- `Add a timeseries widget for request count over time to this notebook`

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="Full-page Bits Chat interface with suggested tasks" style="width:100%;">}}

## Permissions

### Access to Bits Chat

To use Bits Chat, your role must have the **Bits Chat Access** permission. This permission is enabled by default for all three standard Datadog roles: Datadog Admin, Datadog Standard, and Datadog Read Only.

To manage this permission for custom roles, go to **Organization Settings** > **Roles**, select a role, and toggle **Bits Chat Access** under **General Permissions**.

### Data access through Bits Chat

Bits Chat uses your Datadog role to fetch data, so it can only access the resources you have permission to view or modify. For example, if your role restricts access to a specific set of logs indexes, Bits Chat can only query logs from those indexes. Similarly, if you do not have permission to edit a dashboard, Bits Chat cannot edit that dashboard on your behalf.

## Features

{{< whatsnext desc="Learn about how you can use Bits Chat:" >}}
   {{< nextlink href="bits_ai/bits_chat/access" >}}Access Bits Chat{{< /nextlink >}}
   {{< nextlink href="bits_ai/bits_chat/skills" >}}Skills{{< /nextlink >}}
   {{< nextlink href="bits_ai/bits_chat/chat_history" >}}Chat history{{< /nextlink >}}
   {{< nextlink href="bits_ai/bits_chat/reports" >}}Reports{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading
{{< partial name="whats-next/whats-next.html" >}}
