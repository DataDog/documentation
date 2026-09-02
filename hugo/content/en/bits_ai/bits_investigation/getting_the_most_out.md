---
title: Getting the Most Out of Bits Investigations
description: "Learn how to teach Bits Investigation about your environment, systems, and best practices to improve investigation accuracy over time."
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

Bits Investigation reasons through incomplete signals rather than following a fixed script, so its accuracy depends on how well it knows your environment. Two orgs with the same products but different tagging, escalation paths, and tribal knowledge get different results from the same agent, until someone teaches it the difference.

You can teach it through four places: [`bits.md`][1], your monitors and runbooks, [Skills][11], and feedback on completed investigations.

## Write bits.md as rules, not generic descriptions

[`bits.md`][1] is read on every investigation. Write specific rules, not general descriptions of your systems.

- **Good**: "The billing team's alerts tag the service as `billing-svc`, but APM and logs use `billing_service`. Treat them as the same service."
- **Not useful**: "Checkout is our payments service."

The entries that matter most:
- **Cross-system name mapping.** The same service, environment, or team often has different names in monitors, APM, logs, and any connected ticketing system. Write the mapping down once.
- **Known noise.** Patterns that look like incidents but are routine, such as a weekly reindex job or a load test, and when they'd actually count as a real problem.
- **Standing scope rules.** How to handle an alert that doesn't specify environment or region.

See [Knowledge sources][1] for a full sample file.

## Start with your most critical monitors

Start with monitors where an investigation actually saves time by focusing on your most critical alerts. On the [Supported Monitors][8] page:

- Filter by [`priority:p1`][9] (or `p2`) for monitors most likely to represent a real incident.
- Filter by [`notification:*`][10] for monitors that already page a person or channel.

Enable {{< ui >}}Auto-Investigate{{< /ui >}} on this list first and tune it before expanding to the rest of your monitors.

## Make your monitors self-sufficient

Bits reads the monitor message at investigation time, so the monitor itself is a knowledge source.

- Link the dashboard, log query, or notebook you'd check first. Plain URLs work, no formatting needed.
- Use a notebook for anything longer than a link or two. Notebooks mix markdown with live Datadog queries.
- Note which downstream services or dependencies are typically affected.
- Scope or group the monitor query by `service`. This is what lets Bits pivot into APM, logs, RUM, and [Catalog][2] for the right service. Without it, Bits falls back on weaker signals like the monitor name.

Review monitor messages periodically. A stale runbook link is worse than no link, since it points Bits at the wrong dashboard or a decommissioned service.

## Package repeatable procedures as Skills

A multi-step diagnostic procedure, or the specific way your team queries a third-party tool, doesn't fit cleanly in one monitor's runbook or a `bits.md` line. Capture it as a [Skill][11] instead, created at [{{< ui >}}Actions{{< /ui >}} > {{< ui >}}Skills{{< /ui >}}][11].

Bits Investigation invokes a skill automatically when its name and description match the situation. Use a skill when you'd otherwise repeat the same instructions across monitors, or when a procedure needs to stay consistent across Bits Investigation, Bits Chat, and other Bits products.

## Connect external tools and documentation

- **Confluence.** [Connect your Confluence account][3] and link relevant pages in monitor messages. Bits extracts telemetry links and troubleshooting steps from the page. Enable account crawling to let [Bits Chat][4] search your Confluence space directly, not just linked pages.
- **Source code.** Connect [GitHub][5] and [tag your APM telemetry with Git information][6] so Bits can tie a regression to the commit or deploy that caused it. This also lets Bits Code pick up the investigation and propose a fix.
- **Notifications.** Connect Slack or MS Teams to get Bits' findings posted into your existing ops channels. You can also @Datadog for follow up questions without having to open the web.
- **Other observability tools.** Connect Grafana, Dynatrace, Splunk, Sentry, or ServiceNow if telemetry lives there. See [Integrate with third-party observability and SCM platforms][7].

## Give feedback on investigations

At the end of an investigation, tell Bits whether the conclusion was right.

Confirm what's correct, not just what's wrong; positive feedback still becomes a memory Bits reuses. When Bits gets it wrong, name the actual root cause, the services or metrics involved, and link the telemetry that proves it. "That's wrong" gives Bits nothing to change.

Both become **memories**, which Bits selectively reuses in similar future investigations. Review or delete them from the {{< ui >}}Memories{{< /ui >}} column on the [Monitor Management][8] page, and check periodically that older corrections still hold (services get renamed, causes get fixed).

## Test your changes with Bits Chat

Use [Bits Chat][4] to check your changes by asking about what you wrote, instead of waiting on a full investigation. You can also ask Bits Chat directly for suggestions on how to improve `bits.md`, a runbook, or a skill.

| Goal | Example prompt |
|------|-----------------|
| Check a `bits.md` naming rule | `If I ask about billing-svc, what service does that map to in APM and logs?` |
| Check a noise pattern | `Is a spike in reindex job duration on Sundays something I should worry about for <service>?` |
| Check a runbook or Confluence page | `What does our documentation say about diagnosing <service> issues?` |
| Check a skill | Ask a question that should trigger it, and see if the response follows the procedure |
| Check a past correction | Ask a related question (e.g. `What's your read on memory pressure on <service>?`) and see if it references your correction |
| Find remaining gaps | `What information would have made this investigation faster or more accurate?` |

If the answer doesn't reflect what you wrote, check whether the `bits.md` entry is a rule or just description, whether the integration is connected with the right permissions, or whether a link is stale. Fix the specific gap and re-test with the same prompt.

Once chat reflects the change, re-run a known investigation to confirm the conclusion itself improves. Chat and investigations don't always draw on knowledge the same way.

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
