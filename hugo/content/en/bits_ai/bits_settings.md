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

<!-- DRAFT: Working draft for DOCS-16349. -->

## Overview

Use Bits AI Settings to control what Bits knows about your organization, how Bits connects to your tools, and how your team uses Bits.

To open Bits AI Settings, go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}.

<!-- TODO: Confirm the permissions required to view and change Bits AI Settings. Add the app link and screenshot once the URL is final. -->

Bits AI Settings are organized into two areas:

- [Knowledge](#knowledge): Give Bits context about your organization.
- [Administration](#administration): Control how Bits connects to your tools and what Bits can do.

## Knowledge

Knowledge settings give Bits context about your organization, so that Bits can use your terminology, follow your conventions, and learn from past work.

### Bits.md

`bits.md` is a Markdown file that gives Bits structured context about your environment. Use it to add team-specific knowledge such as tagging conventions, architectural patterns, glossary terms, and investigation best practices. This context helps Bits construct more accurate queries and use the same terms that your team uses.

Bits.md applies to [Bits Chat][9] and [Bits Investigation][10] only. In the Bits.md settings, use the {{< ui >}}Investigations{{< /ui >}} and {{< ui >}}Chat{{< /ui >}} options to choose which of these use the file.

For more information and a sample file, see [Bits.md][1].

### Skills

Skills are reusable domain knowledge and instructions for Bits and other AI agents. Skills give agents task-specific context, so you don't need to repeat the same information in each prompt. For example, create a skill that describes your incident response process or your service ownership conventions.

For more information, see [Skills Library][2].

### Memories

Bits Investigation learns from your feedback to improve future investigations. Positive feedback, and negative feedback that includes details about the correct root cause, creates a memory. In later investigations, Bits selects relevant memories to apply past corrections, reuse effective queries, and prioritize investigative steps.

You can view and delete memories.

<!-- TODO: Confirm where memories are managed. Current docs point to the Memories column on the Monitor Management page. If memories move to Bits AI Settings, update /bits_ai/bits_investigation/knowledge_sources/ as well. -->

For more information, see [Feedback and memories][3].

## Administration

Administration settings control how Bits connects to your tools and what Bits can do.

### Integrations

Integrations connect Bits Investigation to your observability data and source code. Bits Investigation integrates with GitHub, Grafana, Dynatrace, Splunk, Sentry, and ServiceNow. Source code access also lets [Bits Code][11] generate a code fix when Bits Investigation identifies an issue that can be resolved in code.

Bits also has out-of-the-box MCP integrations, such as Dynatrace MCP, Elastic Agent Builder MCP, and Grafana MCP. For the full list, see the {{< ui >}}Available{{< /ui >}} tab under {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}. You can also connect custom MCP servers that your team runs.

For more information, see [Integrations and Settings][4].

### Guardrails

Guardrails are rules that control what remediation actions Bits can take. A guardrail defines whether Bits must ask for approval or can't act at all. Each guardrail applies to specific actions and to resources that match its scope, such as an environment or service.

Guardrails are required to enable one-click infrastructure actions with Bits. For more information, see [Govern how Bits takes remediation action][5].

<!-- Update this xref ^ to point to the new page after https://github.com/DataDog/documentation/pull/41517 is merged -->

### Action history

Action history is an auditable record of every action that Bits has taken, including triage actions and infrastructure actions. Filter the list by action, integration, or investigation. Click an action to see:

- **Execution details**: The status, start and end time, duration, and connection used.
- **Scope and policy**: The guardrail that covered the action and who initiated it.
- **Original investigation**: The root cause and impact that led to the action, with a link to the investigation.

### Credit usage

View a breakdown of [AI Credits][6] usage for each user and autonomous agent.

To add tags from a reference table to your AI Credits billing data, use {{< ui >}}Billing enrichment{{< /ui >}}. For more information about reference tables, see [Reference Tables][7].

### Advanced

Use the Advanced settings to set rate limits for Bits Investigation. For more information, see [Configure rate limits][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_investigation/knowledge_sources/#bitsmd
[2]: /bits_ai/skills_library/
[3]: /bits_ai/bits_investigation/knowledge_sources/#feedback-and-memories
[4]: /bits_ai/bits_investigation/configure/
[5]: /bits_ai/bits_remediation/#govern-how-bits-takes-remediation-action
[6]: /account_management/billing/ai_credits/
[7]: /reference_tables/
[8]: /bits_ai/bits_investigation/configure/#configure-rate-limits
[9]: /bits_ai/bits_chat/
[10]: /bits_ai/bits_investigation/
[11]: /bits_ai/bits_code/
