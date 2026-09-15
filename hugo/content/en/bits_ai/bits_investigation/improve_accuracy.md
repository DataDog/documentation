---
title: Improve Bits Investigation Accuracy
description: "Learn best practices for configuring Bits Investigation to get more accurate investigations."
further_reading:
- link: "/bits_ai/bits_investigation/knowledge_sources/"
  tag: "Documentation"
  text: "Knowledge sources"
- link: "/bits_ai/bits_investigation/configure/"
  tag: "Documentation"
  text: "Integrations and settings"
- link: "/bits_ai/bits_investigation/chat_bits_investigation/"
  tag: "Documentation"
  text: "Chat with Bits Investigation"
---

## Overview

Bits Investigation reasons through incomplete signals rather than following a fixed script, so its accuracy depends on how well it's configured for your environment. No two organizations share the same tagging, escalation paths, or tribal knowledge, so getting good results means tailoring Bits Investigation for your organization.

This guide covers the practices with the biggest impact on accuracy:
- [Strengthen your knowledge sources](#strengthen-your-knowledge-sources)
- [Enable Auto-Investigate on your critical monitors](#enable-auto-investigate-on-your-critical-monitors)
- [Connect external tools and documentation](#connect-external-tools-and-documentation)
- [Test your changes with Bits Chat](#test-your-changes-with-bits-chat)

## Strengthen your knowledge sources

Bits Investigation reads from four places during an investigation: `bits.md`, monitor messages and runbooks, Skills, and past feedback. The more specific each one is, the more accurate future investigations get.

### Write specific rules

Bits Investigation reads [`bits.md`][1] on every investigation. Write specific rules, not general descriptions — a description repeats what Bits can already infer from telemetry, while a rule resolves something it can't infer on its own, like a naming mismatch across tools.

| Good | Needs improvement |
|------|--------------------|
| "The billing team's alerts tag the service as `billing-svc`, but APM and logs use `billing_service`. Treat them as the same service." | "Checkout is our payments service." |

Prioritize these entries:
- **Cross-system name mapping**: The same service, environment, or team often has different names in monitors, APM, logs, and any connected ticketing system. Write the mapping down once.
- **Known noise**: Patterns that look like incidents but are routine, such as a weekly reindex job or a load test. Document them, along with when they'd actually count as a real problem.
- **Standing scope rules**: Alerts that don't specify an environment or region are ambiguous. Define the default Bits should assume.

For a full sample file, see [Knowledge sources][1].

### Make your monitors self-sufficient

Bits reads the monitor message at investigation time. Configure monitors so Bits can investigate them from the message alone, without you filling in context by hand afterward.

Add to the monitor message:
- The dashboard, log query, or notebook you'd check first (plain URLs work, no formatting needed).
- A notebook instead of a plain link if you need more than a link or two — notebooks support markdown alongside live Datadog queries.
- Downstream services or dependencies typically affected.

Also scope or group the monitor query by `service`. This is what lets Bits pivot into APM, logs, RUM, and [Catalog][2] for the right service. Without the `service` tag, Bits falls back on weaker signals like the monitor name.

Review monitor messages periodically. A stale runbook link is worse than no link, since it points Bits at the wrong dashboard or a decommissioned service.

### Package repeatable procedures as Skills

A multi-step diagnostic procedure, or the specific way your team queries a third-party tool, doesn't fit cleanly in one monitor's runbook or a `bits.md` line. Capture it as a [Skill][11] instead, created at [{{< ui >}}Actions{{< /ui >}} > {{< ui >}}Skills{{< /ui >}}][11].

Bits Investigation invokes a skill automatically when its name and description match the situation. Use a skill when you'd otherwise repeat the same instructions across monitors, or when a procedure needs to stay consistent across Bits Investigation, Bits Chat, and other Bits products.

### Give feedback on investigations

At the end of an investigation, tell Bits whether the conclusion was right. Confirm what's correct, not just what's wrong; positive feedback still becomes a memory Bits reuses. When Bits gets it wrong, name the actual root cause, the services or metrics involved, and link the telemetry that proves it. "That's wrong" gives Bits nothing to change.

Both positive feedback and corrections become **memories**, which Bits selectively reuses in similar future investigations. Review or delete them from the {{< ui >}}Memories{{< /ui >}} column on the [Monitor Management][8] page, and check periodically that older corrections still hold (services get renamed, causes get fixed).

## Enable Auto-Investigate on your critical monitors

On the [Supported Monitors][8] page, scope {{< ui >}}Auto-Investigate{{< /ui >}} to monitors where an investigation is worth running, and where you have the bandwidth to keep its context accurate:

- Filter by [`priority:p1`][9] (or `p2`) for monitors most likely to represent a real incident.
- Filter by [`notification:*`][10] for monitors that already page a person or channel.

[Enable {{< ui >}}Auto-Investigate{{< /ui >}}][13] on this filtered list. Turning it on for every monitor spreads investigations across noisy, low-priority alerts and dilutes the signal you actually care about. It also means you can't realistically curate `bits.md` rules, runbooks, and feedback for all of them.

## Connect external tools and documentation

Bits Investigation can only reason over telemetry and documentation it can reach. Connecting these sources gives it more to work with:

- **Confluence**: [Connect your Confluence account][3] and link relevant pages in monitor messages. Bits extracts telemetry links and troubleshooting steps from the page. Enable account crawling to let [Bits Chat][4] search your Confluence space directly, not just linked pages.
- **Source code**: Connect [GitHub][5] and [tag your APM telemetry with Git information][6] so Bits can tie a regression to the commit or deploy that caused it. This also lets Bits Code pick up the investigation and propose a fix.
- **Other observability tools**: Connect Grafana, Dynatrace, Splunk, Sentry, or ServiceNow if telemetry lives there. See [Integrate with third-party observability and SCM platforms][7].

For setting up Slack, Microsoft Teams, or other destinations for investigation findings, see [Send investigation findings to ITSM and collaboration platforms][12].

## Test your changes with Bits Chat

After you make a change to `bits.md`, a monitor message, or a skill, use [Bits Chat][4] to confirm it lands before you find out during a real investigation. Chat draws on the same knowledge sources, so you can check your change without waiting for a full investigation to run. You can also ask Bits Chat directly for suggestions on how to improve `bits.md`, a runbook, or a skill.

| Goal | Example prompt |
|------|-----------------|
| Check a `bits.md` naming rule | `If I ask about billing-svc, what service does that map to in APM and logs?` |
| Check a noise pattern | `Is a spike in reindex job duration on Sundays something I should worry about for <service>?` |
| Check a runbook or Confluence page | `What does our documentation say about diagnosing <service> issues?` |
| Check a skill | Ask a question that should trigger it, and see if the response follows the procedure |
| Check a past correction | Ask a related question (e.g. `What's your read on memory pressure on <service>?`) and see if it references your correction |

If the answer doesn't reflect what you wrote, check whether the `bits.md` entry is a rule or just description, whether the integration is connected with the right permissions, or whether a link is stale. Fix the specific gap and re-test with the same prompt.

To surface gaps you haven't thought to fix yet, ask after a real investigation: `What information would have made this investigation faster or more accurate?`

After chat reflects the change, re-run a known investigation to confirm the conclusion itself improves. Chat and investigations don't always draw on knowledge the same way.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_investigation/knowledge_sources/
[2]: /internal_developer_portal/catalog/
[3]: https://app.datadoghq.com/integrations/confluence
[4]: /bits_ai/bits_investigation/chat_bits_investigation/
[5]: /integrations/github/
[6]: /source_code/service-mapping
[7]: /bits_ai/bits_investigation/configure/#integrate-with-third-party-observability-and-scm-platforms
[8]: https://app.datadoghq.com/bits-ai/monitors/supported
[9]: https://app.datadoghq.com/bits-ai/monitors/supported?q=priority%3Ap1&auto_only=false
[10]: https://app.datadoghq.com/bits-ai/monitors/supported?q=notification%3A%2A&auto_only=false
[11]: https://app.datadoghq.com/actions/skills
[12]: /bits_ai/bits_investigation/configure/#send-investigation-findings-to-itsm-and-collaboration-platforms
[13]: /bits_ai/bits_investigation/investigate_issues/#enable-automatic-investigations
