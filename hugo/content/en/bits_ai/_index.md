---
title: Bits AI
description: "Learn about Bits AI, your agentic teammate in Datadog that automates development, security, and operational workflows."
disable_toc: false
aliases:
    - /bits_ai/query_examples/
further_reading:
    - link: "/account_management/billing/ai_credits/"
      tag: "Documentation"
      text: "AI Credits"
    - link: "/mcp_server/"
      tag: "Documentation"
      text: "Get observability insights from AI agents with the Datadog MCP Server"
    - link: "https://www.datadoghq.com/blog/bits-ai-sre/"
      tag: "Blog"
      text: "Introducing Bits Investigation, your AI on-call teammate"
    - link: "https://www.datadoghq.com/blog/bits-ai-dev-agent/"
      tag: "Blog"
      text: "Automatically identify issues and generate fixes with Bits Code"
    - link: "https://www.datadoghq.com/blog/bits-ai-security-analyst/"
      tag: "Blog"
      text: "Automate Cloud SIEM investigations with Bits AI Security Analyst"
    - link: "https://www.datadoghq.com/blog/introducing-bits-assistant/"
      tag: "Blog"
      text: "Search and act across Datadog to resolve issues faster with Bits Chat"
    - link: "https://www.datadoghq.com/blog/how-to-use-ai-more-effectively/"
      tag: "Blog"
      text: "How to use AI tools more effectively: Tips from Datadog Engineers"
    - link: "https://www.datadoghq.com/product/ai/bits-ai-agents/"
      tag: "Product page"
      text: "Bits AI Agents"
---

## Overview

Bits AI is your agentic teammate in Datadog, built to automate development, security, and operational workflows. You can chat and collaborate with Bits in real time, or delegate tasks such as alert investigations, code fixes, or security triage.

The Bits AI home page is the central place in Datadog to work with Bits AI. From the Bits AI home page, you can:

- Chat with Bits
- Review the work Bits does autonomously across your environment
- Create custom automations
- Manage Bits AI settings and usage for your organization

Learn about Bits AI pricing on [AI Credits][1].

## Bits Chat

Use Bits Chat to search and act across Datadog in natural language. Ask Bits to investigate an incident, explore your telemetry, build a dashboard, or query your data with DDSQL.

For example, you can ask:

- `Why is the error rate spiking on the web-store service?`
- `Build me a dashboard to show latency, errors, and request rates for my service`
- `Investigate why EC2 costs changed between January and February`

Bits Chat is available in Datadog, the Datadog mobile app, Slack, and Microsoft Teams. Bits Chat uses your Datadog role to fetch data, so it can only access the resources that you have permission to view or modify.

For more information, see [Bits Chat][2].

## Autonomous Ops

Bits Autonomous Operations (Autonomous Ops) lets you assign ongoing operational work to Bits, instead of starting Bits on one incident at a time. Autonomous Ops connects [Bits Detection][5], [Bits Investigation][6], and [Bits Remediation][7] so that Bits can take an issue from detection through resolution.

With Autonomous Ops, Bits watches the system resources, monitor alerts, or Slack channels that you specify. For each issue, Bits:

1. Detects the issue from your existing telemetry and alerts, and adds monitoring where coverage is missing.
2. Triages the issue and investigates the root cause.
3. Fixes the issue within the guardrails that you set. If a guardrail requires approval, Bits asks an approver before it takes action.

Autonomous Ops handles service degradations, such as rising error rates or latency on an endpoint, as well as infrastructure issues across Kubernetes, Amazon ECS, AWS Lambda, and hosts.

You can work with Bits in Datadog, in Slack, or with the Datadog MCP Server.

For more information, see [Bits Autonomous Operations][8].

## Custom Automations

Use Custom Automations to rerun a [Bits Chat][2] request on a schedule and send the results to you or your team. For example, you can use Custom Automations to send a daily summary of error rates and p95 latency for a service.

When you create a custom automation, Bits:

- Runs a custom Bits agent with instructions to repeat the same queries, filters, and analysis on new data each time
- Runs on a schedule in your time zone, such as daily, every weekday, weekly, every other week, or monthly
- Sends the results to the specified destination, such as a Slack channel or email address

From the Custom Automations page, you can change an automation's schedule, destination, or report contents. You can also run, pause, resume, or delete an automation. To manage automations from Chat, ask Bits which reports you receive, or ask Bits to stop sending a report.

Custom Automations run on a schedule. For automations that run in response to an event, such as a monitor alert, use [Bits Agent Builder][10] or [Workflow Automation][11]. To automate code changes, use [Bits Code automations][3].

## Settings

Use Settings to control what Bits knows about your organization, how Bits connects to your tools, and how your team uses Bits.

### Knowledge settings

Knowledge settings give Bits context about your organization:

- {{< ui >}}Bits.md{{< /ui >}}: Instructions and context that Bits uses in Chat and in investigations.
- {{< ui >}}Skills{{< /ui >}}: Reusable domain knowledge and instructions from the [Skills Library][9].
- {{< ui >}}Memories{{< /ui >}}: What Bits learns from your feedback to improve future investigations.

### Administration settings

Administration settings control how Bits connects to your tools and what Bits can do:

- {{< ui >}}Integrations{{< /ui >}}: Connect Bits Investigation to your code repositories and to MCP servers. Use out-of-the-box integrations or connect custom MCP servers that your team runs.
- {{< ui >}}Guardrails{{< /ui >}}: Set rules for when Bits can act on its own, must ask for approval, or can't act at all.
- {{< ui >}}Action history{{< /ui >}}: Review the actions that Bits has taken.
- {{< ui >}}Credit usage{{< /ui >}}: View [AI Credits][1] usage for each user and autonomous agent, and add tags from a reference table to your billing data.
- {{< ui >}}Advanced{{< /ui >}}: Set rate limits for Bits Investigation.

For more information, see [Bits AI Settings][4].

## Features

{{< whatsnext desc="Learn about how you can use Bits AI:" >}}
   {{< nextlink href="bits_ai/bits_investigation" >}}Investigate alerts with Bits Investigation{{< /nextlink >}}
   {{< nextlink href="bits_ai/bits_code" >}}Automate code fixes with Bits Code{{< /nextlink >}}
   {{< nextlink href="bits_ai/bits_security_analyst" >}}Triage security threat signals with Bits Security Analyst{{< /nextlink >}}
   {{< nextlink href="bits_ai/bits_chat" >}}Explore your observability data with Bits Chat{{< /nextlink >}}
   {{< nextlink href="bits_ai/bits_data_analysis" >}}Explore your business data in natural language with Bits Data Analysis{{< /nextlink >}}
   {{< nextlink href="bits_ai/bits_detection" >}}Autonomously monitor for impactful service degradations with Bits Detection{{< /nextlink >}}
   {{< nextlink href="bits_ai/bits_remediation" >}}Take action on root causes with Bits Remediation{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/billing/ai_credits/
[2]: /bits_ai/bits_chat/
[3]: /bits_ai/bits_code/automations/
[4]: /bits_ai/bits_settings/
[5]: /bits_ai/bits_detection/
[6]: /bits_ai/bits_investigation/
[7]: /bits_ai/bits_remediation/
[8]: /bits_ai/bits_autonomous_operations/
[9]: /bits_ai/skills_library/
[10]: /actions/agents/
[11]: /actions/workflows/
