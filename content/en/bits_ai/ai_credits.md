---
title: AI Credits
description: "Understand how AI Credits work, which products consume them, pricing models, and how to manage usage for your organization."
further_reading:
- link: "/bits_ai/bits_assistant/"
  tag: "Documentation"
  text: "Bits AI Assistant"
- link: "/bits_ai/bits_ai_dev_agent/"
  tag: "Documentation"
  text: "Bits AI Dev Agent"
- link: "/bits_ai/bits_ai_sre/"
  tag: "Documentation"
  text: "Bits AI SRE"
- link: "/actions/agents/"
  tag: "Documentation"
  text: "Agent Builder"
---

## Overview

AI Credits are how Datadog meters and bills usage of its AI products. One AI Credit represents a unit of intelligent work performed by a Datadog AI product—for example, a [Bits AI Assistant][1] query, a [Bits AI Dev][2] code fix, or a [Bits AI SRE][3] investigation.

Use this page to understand which products consume AI Credits, how pricing works, how to track usage, and how to control access for your organization.

## AI products billed in AI Credits

The following products consume AI Credits:

| Product | What it does |
|---|---|
| [Bits AI Assistant][1] | Search, explore, and act across Datadog using natural language. |
| [Bits AI SRE][3] | Investigate production issues end to end to help on-call engineers pinpoint root causes. |
| [Bits AI Dev][2] | Diagnose issues and generate code fixes using Datadog observability data. |
| [Agent Builder][4] | Build custom AI agents that automate operational tasks using Datadog tools and integrations. |

## Pricing

See the [Datadog pricing page][5] for current rates. AI Credits are available in three pricing tiers, and you can use any combination.

| Pricing tier | How it works |
|---|---|
| Annual Commit | 12-month commitment, billed monthly. Credits are purchased in bundles of 500 per month. |
| Monthly Commit | Month-to-month, no annual commitment. Credits are purchased in bundles of 500 per month. |
| On-Demand | No commitment. Billed monthly based on actual usage. |

### Billing cycle

AI Credits reset on the first day of each calendar month. Unused Commit credits do not roll over to the next month.

### Overages

If your usage exceeds your monthly Commit, additional credits are billed automatically at the On-Demand rate—you do not need to switch pricing tiers or top up manually. Any task already in flight is allowed to complete (for example, a Bits AI SRE investigation that is already running finishes its work).

## Credit consumption by feature

These are average credit costs per feature. Actual consumption for any single request varies with task complexity and the amount of context the model processes, so use these as planning estimates rather than exact-per-call quotes.

| Feature | Avg. credits per use |
|---|---|
| Bits AI Assistant — search and explore telemetry | 0.6 |
| Bits AI Assistant — setup and optimize observability | 0.4 |
| Bits AI Assistant — root cause analysis | 0.8 |
| Bits AI Assistant — monitor creation | 0.5 |
| Bits AI Assistant — dashboard creation | 0.6 |
| Bits AI Assistant — notebook creation | 0.7 |
| Bits AI SRE — autonomous investigation | 6.5 |
| Bits AI Dev — code fix | 5 |
| Agent Builder — message | 0.3 |

<div class="alert alert-info">These are the credit consumption rates as of May 27, 2026. Costs for each feature may change as models are optimized or new models become available.</div>

## Admin controls

All AI Credit management lives in **Plan & Usage > AI Credits**. From there, admins can:

- **View usage**: See the current month's credit consumption, broken down by AI product.
- **Enable or disable billable AI products**: A single org-level toggle controls all billable AI products. When disabled, users can still see product surfaces and view past results (for example, previous Bits AI SRE investigations or Bits AI Assistant conversations), but new requests are blocked.

### Disable specific products

All AI Credits products are enabled by default with the Datadog Standard Role. To disable specific products, remove the following permissions per user or role:

| Product | Permission |
|---|---|
| [Bits AI Assistant][1] | Bits Assistant Access |
| [Bits AI SRE][3] | Bits SRE Investigations Write |
| [Bits AI Dev][2] | Bits Dev Write |
| [Agent Builder][4] | Agent Builder Write, Agent Builder Run |

To manage permissions, go to **Organization Settings > Roles**, select a role, and toggle the relevant permission.

## Availability

AI Credits are available to all Datadog customers except:

- **FedRAMP** customers, where AI Credit products are not supported.
- Customers who have explicitly opted out of AI features through their account team.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_assistant/
[2]: /bits_ai/bits_ai_dev_agent/
[3]: /bits_ai/bits_ai_sre/
[4]: /actions/agents/
[5]: https://www.datadoghq.com/pricing/
