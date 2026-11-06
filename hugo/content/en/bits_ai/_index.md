---
title: Bits AI
description: "Learn about Bits AI, your agentic teammate in Datadog that automates development, security, and operational workflows."
disable_toc: false
is_beta: true
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

Bits AI is your agentic teammate in Datadog, built to automate development, security, and operational workflows. You can chat and collaborate with Bits in real time, or delegate full tasks—like alert investigations, code fixes, or security triage—and let it take care of the details.

Learn about Bits AI pricing on [AI Credits][1].

The Bits AI home page is the central place in Datadog to work with Bits AI. From Bits AI Home, you can:

- Chat with Bits
- Review the work Bits does autonomously across your environment
- Create custom automations
- Manage Bits AI settings for your organization

<!-- TODO: Add how to get to Bits AI Home in the Datadog UI and a screenshot of the landing page. -->

<!-- TODO: Screenshot how Bits Detection, Bits Investigation, and Bits Remediation fit under Autonomous Ops. Waiting on UI organization. -->

## Bits Chat

Use Chat to ask questions about your observability data and take action in natural language.

For more information, see [Bits Chat][2].

## Autonomous Ops

Bits Autonomous Operations (Autonomous Ops) allows you to assign ongoing operational work to Bits. 

It combines [Bits Detection][5], [Bits Investigation][6], and [Bits Remediation][7] in a single operational loop.

With Autonomous Operations, Bits watches the system resources, monitor alerts, or Slack channels that you specify, and automatically detects and triages any issues.

Bits then investigates critical alerts, and proposes a fix for the issue within the guardrails you set. After you approve the fix, Bits verifies that the issue is resolved.

For more information, see [Bits Autonomous Operations][8].

## Custom Automations

Use Custom Automations to define workflows that Bits runs for your team. For more information, see [Automations][3] in the Bits Code section.

<!-- TODO: Confirm scope and how this relates to existing automation docs (for example, Bits Code automations). -->

## Settings

Use Settings to control what Bits knows about your organization and who can use it. For more information, see [Bits AI Settings][4].

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
