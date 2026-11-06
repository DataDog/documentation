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

<!-- DRAFT: Working outline for DOCS-16325. -->

Use Settings to control what Bits knows about your organization and who can use it.

## Knowledge

Knowledge settings control...

### Bits.md

Bits.md applies only to Chats and Investigations.

For more information, see [Bits.md][1].

### Skills

For more information, see [Skills Library][2].

### Memories (Investigations only)

Bits Investigation learns from your investigation feedback to improve future responses.

For more information, see [Feedback and memories][3].

<!-- TODO: Document memories under Investigations -->

## Administration

Administration settings control...

### Integrations (Investigations only)

Integrations apply only to Bits Investigations.

Connect Bits to your codebase. Link repositories, map services to code, and enable Bits to suggest fixes.

Bits has out-of-the-box integrations for services such as Dynatrace MCP, Elastic Agent Builder MCP, Grafana MCP, and more. See the **Bits AI** > **Settings** > **Integrations** > **Available** tab for the full list.

Bits also supports connecting any custom MCP servers that your team already runs.

For more information about how to configure a custom MCP server integration for Bits Investigations, see [Integrations and Settings][4]. <!-- TODO: Document how to configure custom MCP on that page -->

### Guardrails (Remediations only)

Guardrails apply only to Bits Remediations.

Set rules for when Bits can act on its own, must ask for approval, or can't act at all. For more information, see [Govern how Bits takes remediation action][5].

### Action history

### Credit usage

Get a credit usage breakdown per user and autonomous agent.

Go to **Billing enrichment** to enrich billing data for AI Credits with tags from a reference table. For more information about reference tables, see [Reference Tables][6].

### Advanced

From the Advanced settings, you can set rate limits for your Bits Investigations. For more information, see [Configure rate limits][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_investigation/knowledge_sources/#bitsmd
[2]: /bits_ai/skills_library/
[3]: /bits_ai/bits_investigation/knowledge_sources/#feedback-and-memories
[4]: /bits_ai/bits_investigation/configure/
[5]: /bits_ai/bits_remediation/#govern-how-bits-takes-remediation-action
[6]: /reference_tables/?tab=manualupload
[7]: /bits_ai/bits_investigation/configure/#configure-rate-limits
