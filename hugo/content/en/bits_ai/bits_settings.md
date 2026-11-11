---
title: Bits AI Settings
description: "Configure what Bits AI knows about your organization, how it integrates with your tools, and how your team uses it."
further_reading:
- link: "/bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "/account_management/billing/ai_credits/"
  tag: "Documentation"
  text: "AI Credits"
---

## Overview

Use Bits AI Settings to control what Bits knows about your organization, how Bits connects to your tools, and how your team uses Bits.

To open Bits AI Settings, go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}.

## Knowledge settings

Knowledge settings give Bits context about your organization, so that Bits can use your terminology, follow your conventions, and learn from past work.

### Bits.md

Bits.md is a Markdown file that gives Bits structured context about your environment. Use it to add team-specific knowledge such as tagging conventions, architectural patterns, glossary terms, and investigation best practices. This context helps Bits construct more accurate queries and use the same terms that your team uses.

Bits.md applies to [Bits Chat][9] and [Bits Investigation][10] only. In the Bits.md settings, use the {{< ui >}}Investigations{{< /ui >}} and {{< ui >}}Chat{{< /ui >}} options to choose which uses the file.

For more information, see [Bits.md][1].

### Skills

Skills are reusable domain knowledge and instructions for Bits and other AI agents. Skills give agents task-specific context, so you don't need to repeat the same information in each prompt. For example, create a skill that describes your incident response process or your service ownership conventions.

For more information, see [Skills Library][2].

### Memories

Bits Investigation learns from your feedback to improve future investigations. Bits selects relevant memories to apply past corrections, reuse effective queries, and prioritize investigative steps.

For more information, see [Feedback and memories][3].

## Administration settings

Administration settings control how Bits connects to your tools and what Bits can do.

### Integrations

Integrations connect Bits Investigation to your observability data and source code. You can also connect custom and out-of-the-box MCP integrations.

For more information, see [Integrations and Settings][4].

### Guardrails

Guardrails are rules that control what remediation actions Bits can take on your infrastructure after an investigation. Each guardrail applies to specific actions and resources that match its scope. For example, you can create a guardrail that allows Bits to roll back deployments for `service:checkout` after someone on the checkout team approves the action.

For more information, see [Bits Guardrails][5].

### Action history

Action history is an auditable record of every action that Bits has taken. Filter the list by action, integration, or investigation. Click an action to see:

- **Execution details**: The status, start and end time, duration, and connection used.
- **Scope and policy**: The guardrail that covered the action and who initiated it.
- **Original investigation**: The root cause and impact that led to the action, with a link to the investigation.

### Credit usage

Use the credit usage settings to track and govern AI Credits usage for your organization. AI Credits are shared across Bits Chat, Bits Investigation, Bits Code, Bits Agent Builder, and Bits Database Optimization.

From {{< ui >}}Bits AI > Settings > Credit usage{{< /ui >}}, you can:

- **View usage**: See a breakdown of [AI Credits][6] usage for each user and for autonomous agents. Usage that doesn't come from a person counts toward {{< ui >}}Autonomous Agents{{< /ui >}}. For example, automatically triggered investigations count toward autonomous agents.
- **Set limits**: Set monthly AI Credit limits for your organization, for roles, for individual users, and for service accounts. Setting limits requires the `billing_edit` permission. For more information, see [AI Credit Limits][12].
- **Enrich billing data**: Use {{< ui >}}Billing enrichment{{< /ui >}} to add tags to your AI Credits usage data. For example, add a team or cost center tag. For more information, see [Billing enrichment][13].

To get notified before users reach a limit, create a metric monitor on the AI Credits usage metrics. For more information, see [Monitor usage][14].

### Advanced

Use the Advanced settings to set rate limits for Bits Investigation. For more information, see [Configure rate limits][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_investigation/knowledge_sources/#bitsmd
[2]: /bits_ai/skills_library/
[3]: /bits_ai/bits_investigation/knowledge_sources/#feedback-and-memories
[4]: /bits_ai/bits_investigation/configure/
[5]: /bits_ai/bits_remediation/guardrails/
[6]: /account_management/billing/ai_credits/
[8]: /bits_ai/bits_investigation/configure/#configure-rate-limits
[9]: /bits_ai/bits_chat/
[10]: /bits_ai/bits_investigation/
[12]: /account_management/billing/ai_credit_limits/
[13]: /account_management/billing/ai_credits/#billing-enrichment
[14]: /account_management/billing/ai_credits/#monitor-usage
