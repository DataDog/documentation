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

In Datadog, Bits AI is the central place to work with Bits. From Bits AI, you can:

- Chat with Bits
- Review the work Bits does autonomously across your environment
- Create custom automations
- Manage Bits AI settings and usage for your organization

Learn about Bits AI pricing in [AI Credits][1].

## Bits Chat

Use Bits Chat to search and act across Datadog in natural language. For example, ask Bits to investigate an incident, explore your telemetry, build a dashboard, or query your data with DDSQL.

Bits Chat uses your Datadog role to fetch data, so it can only access the resources that you have permission to view or modify.

For more information, see [Bits Chat][2].

## Autonomous Ops

Autonomous Ops lets you assign Bits as the first on-call responder for your systems. When an issue occurs, Bits triages it and decides whether to handle the issue or hand it off to someone on your team.

For each issue, Bits:

1. Triages the alert to decide whether it needs action.
1. Investigates the root cause.
1. Recommends next steps, and can take remediation actions within the guardrails that you define.
1. Verifies that the issue is resolved.

For more information, see [Bits Autonomous Operations][8].

## Custom automations

Custom automations are agents built with [Bits Agent Builder][10] that do a specific task. For each custom automation, you define the trigger or schedule, the agent instructions, and the tools that the agent can use.

You can build a custom automation for almost any task in Datadog that requires an agent step. For example, a custom automation can send your team's Slack channel a daily summary of error rates for a service. Or, a custom automation can review the logs for each new security signal, decide if the signal is a false positive, then notify the team if the signal needs follow-up.

<div class="alert alert-info">For a preconfigured agent that handles ongoing operational work, use <a href="#autonomous-ops">Autonomous Ops</a> instead of a custom automation.</div>

## Settings

Use Settings to control what Bits knows about your organization, how Bits connects to your tools, and how your team uses Bits:

- **Knowledge** settings, such as Bits.md, skills, and memories, give Bits context about your organization.
- **Administration** settings control integrations, guardrails, action history, credit usage, and rate limits.

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
[8]: /bits_ai/bits_autonomous_operations/
[10]: /actions/agents/
[11]: /actions/workflows/
