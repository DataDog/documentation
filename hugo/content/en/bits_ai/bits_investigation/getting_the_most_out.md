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

Bits Investigation is built to handle uncertainty. It forms hypotheses, chases down evidence across your telemetry, and reasons through incomplete signals rather than following a fixed script. That reasoning is only as good as what it knows about your organization. Two orgs running the same products, but with different tagging schemes, different escalation channels, and different tribal knowledge, will get noticeably different results out of the same agent until someone teaches it the difference.

Datadog gives you four places to do that teaching: [`bits.md`][1], your monitors and runbooks, [Skills][11], and the feedback you leave on completed investigations. This guide covers how to use each one well, plus how to confirm the changes you make actually land.

## Write bits.md as rules, not background reading

[`bits.md`][1] is read on every investigation, so it works best as a short list of specific rules Bits should follow, not general background about your systems. The difference matters:

- **Good**: "The billing team's alerts tag the service as `billing-svc`, but our APM and log pipelines emit `billing_service`; treat them as the same service when correlating."
- **Not useful**: "Checkout is our payments service." (True, but not something Bits needs corrected or can act on differently.)

Entries that tend to move accuracy the most:
- **Cross-system name mapping.** The same service, environment, or team often has a different spelling in monitors, APM, logs, and any connected ticketing system. Write the mapping down once instead of relying on Bits to guess it every time.
- **Known noise.** Recurring patterns that resemble an incident but are actually routine for your systems, such as a weekly reindex job, a maintenance window, or a load test, along with the conditions that would make one worth flagging as a real problem.
- **Standing scope rules.** How to handle an alert that doesn't specify environment or region explicitly. Without a rule, Bits has to infer scope from the alert alone.

Keep it in rule form ("when X, do Y") rather than prose. See [Knowledge sources][1] for a full sample file.

## Start with the monitors that matter most

Tuning takes effort per monitor: a good runbook link, correct tags, a `bits.md` entry that covers its quirks. Rather than spreading that effort across every monitor in your org, start with the ones where an investigation actually saves someone time. On the [Supported Monitors][8] page, two filters are useful for finding them:

- **High-priority monitors.** Filter by [`priority:p1`][9] (or `p2`) to see the monitors most likely to represent a real incident.
- **Monitors with notifications configured.** Filter by [`notification:*`][10] to see monitors that already alert a person or a channel. If a human is watching it, an investigation on it is worth the setup.

Enable {{< ui >}}Auto-Investigate{{< /ui >}} on this narrower list first, and put your tuning effort into their runbooks and `bits.md` entries. Once investigations on these are reliably accurate, expand to the rest of your monitors.

## Make your monitors self-sufficient

Bits reads whatever is in the monitor message at investigation time, which means the monitor itself is one of your highest-leverage knowledge sources, and one that's easy to leave thin.

Link the dashboard, log query, or notebook you'd personally check first. Plain URLs are enough; no special formatting is needed. For anything longer than a link or two, use a notebook instead: notebooks mix markdown and live Datadog queries, so they double as both a runbook and a data source Bits can query directly.

It also helps to name the blast radius. State which downstream services or dependencies are typically affected so Bits doesn't have to rediscover your architecture on every alert.

Finally, make sure the monitor's query is scoped or grouped by `service`. That's the tag Bits leans on most to jump from the alert into APM, logs, RUM, and [Catalog][2] for the right service. Leave it out, and Bits has to fall back on weaker signals, like the monitor name, to figure out what's affected.

A monitor with a stale runbook link is worse than one with none: it actively points Bits at the wrong dashboard or a decommissioned service. Treat monitor messages as something that gets reviewed, not written once.

## Package repeatable procedures as Skills

Some knowledge doesn't fit neatly into a single monitor's runbook or a line in `bits.md`. A multi-step diagnostic procedure for a particular subsystem, or the specific way your team queries a third-party tool, is better captured as a [Skill][11], created at [{{< ui >}}Actions{{< /ui >}} > {{< ui >}}Skills{{< /ui >}}][11].

A skill is a named, reusable procedure that Bits Investigation invokes automatically when its name and description match the situation, the same way Bits Code discovers custom skills in your repository. Reach for a skill instead of repeating the same instructions across multiple monitors, or when you want a procedure to stay consistent across Bits Investigation, Bits Chat, and other Bits products that share it.

## Connect the systems where the answer already lives

If root causes are documented somewhere Bits can't see, no amount of tuning inside Datadog closes that gap.

- **Confluence.** [Connect your Confluence account][3] and link relevant pages in monitor messages. Bits extracts telemetry links and troubleshooting steps from the page during an investigation. Turning on account crawling also lets [Bits Chat][4] search your Confluence space directly, not just the pages you've linked.
- **Source code.** Connect [GitHub][5] and [tag your APM telemetry with Git information][6] so Bits can tie a regression to the commit or deploy that introduced it, rather than stopping at "this service's error rate changed." This is also what lets Bits Code pick up the investigation and propose a fix.
- **Other observability tools.** If telemetry or history lives in Grafana, Dynatrace, Splunk, Sentry, or ServiceNow, connect those too. See [Integrate with third-party observability and SCM platforms][7]. An investigation into a service that's only half-instrumented in Datadog will stay incomplete until both sides are visible.

When you write documentation meant for Bits to read (a Confluence page, a notebook), write it the way you'd want a new hire to read it: name the actual service and system, not "the usual suspect," and make the remediation steps explicit rather than assumed.

## Correct it, and let the correction stick

At the end of an investigation, tell Bits whether the conclusion was right.

Confirm what's correct, too. Positive feedback still becomes a memory Bits can reuse; it's not just a formality. When the conclusion is wrong, be specific: name the actual root cause, the services or metrics involved, and link the telemetry that shows it. "That's wrong" gives Bits nothing to change, while naming the failing dependency and linking the query that confirms it does.

Both kinds of feedback become **memories**, which Bits selectively applies to similar future investigations by reusing effective queries, applying past corrections, and adjusting how it prioritizes steps. You can review or delete individual memories from the {{< ui >}}Memories{{< /ui >}} column on the [Monitor Management][8] page, which is worth checking periodically to make sure a correction still reflects reality (services get renamed, causes get fixed).

## Confirm Bits actually picked it up

Don't assume an update to `bits.md`, a runbook, or an integration took effect. Check it. [Bits Chat][4] gives you a direct answer without waiting on a full investigation:

| Goal | Example prompt |
|------|-----------------|
| Confirm a naming rule in `bits.md` is applied | `If I ask about billing-svc, what service does that map to in APM and logs?` |
| Confirm a noise pattern is recognized | `Is a spike in reindex job duration on Sundays something I should worry about for <service>?` |
| Confirm a runbook or Confluence page is being read | `What does our documentation say about diagnosing <service> issues?` |
| Confirm a skill is being invoked | Ask a question that should trigger the skill and check whether the response follows the procedure you defined |
| Confirm a past correction is being reused | Ask a question tied to the earlier feedback (e.g. `What's your read on the current memory pressure on <service>?`) and check whether the response references your correction |
| Surface any remaining gaps | `What information would have made this investigation faster or more accurate?` |

If the answer doesn't reflect what you documented, the most common causes are: the `bits.md` entry is descriptive rather than rule-like, the relevant integration isn't connected or is missing permissions, or the monitor/runbook link is stale. Fix the specific gap and re-test with the same prompt rather than rewriting broadly.

Once Bits reflects the change in chat, re-run a known investigation to confirm it also changes the actual conclusion. Chat and investigations don't always draw on knowledge the same way, so a good chat answer isn't a guarantee the investigation itself improved.

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
