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

Use this page to understand what AI Credits cost, which products consume them, how to track usage, and how to control access for your organization.

## AI products billed in AI Credits

The following products consume AI Credits:

| Product | What it does |
|---|---|
| [Bits AI Assistant][1] | AI-powered assistant that helps you search, explore, and act across Datadog using natural language. |
| [Bits AI SRE][3] | Autonomous AI agent that investigates production issues end to end to help on-call engineers pinpoint root causes. |
| [Bits AI Dev][2] | AI coding assistant that uses Datadog observability data to diagnose issues and generate code fixes. |
| [Agent Builder][4] | Build custom AI agents that use Datadog tools and integrations to automate operational tasks. |

## Pricing

Pick the model that matches how you want to consume AI Credits. You can use any combination.

| Pricing model | Per credit | Per 500-credit bundle | Commitment |
|---|---|---|---|
| Annual Commit | $1.00 | $500 / month | 12-month commitment, billed monthly |
| Monthly Commit | $1.15 | $575 / month | Month-to-month, no annual commitment |
| On-Demand | $1.30 | — | None. Billed monthly on actual usage |

### How Commit purchases work

Commit Bundles are purchased in increments of 500 credits per month, and most customers purchase multiple bundles to match their forecasted usage. For example, a team that expects to use 2,000 credits per month on the Annual Commit would purchase four bundles, for a total of $2,000 per month.

### Billing cycle

AI Credits reset on the first day of each calendar month. Unused Commit credits do not roll over.

### Overages

If your usage exceeds your monthly Commit, additional credits are billed automatically at the On-Demand rate—you do not need to switch pricing models or top up manually.

## Credit consumption by feature

These are average credit costs per feature. Actual consumption for any single request varies with task complexity and the amount of context the model processes, so use these as planning estimates rather than exact-per-call quotes.

| Feature | Avg. credits per use |
|---|---|
| Bits AI Assistant — search and explore telemetry | 0.6 |
| Bits AI Assistant — setup and optimize observability | 0.4 |
| Bits AI Assistant — root cause analysis | 0.8 |
| Bits AI SRE — autonomous investigation | 6.5 |
| Bits AI Dev — code fix | 5 |
| Agent Builder — message | 0.3 |

<div class="alert alert-info">These are the credit consumption rates as of May 26, 2026. Costs for each feature may change as models are optimized or new models become available.</div>

## Admin controls

All AI Credit management lives in **Plan & Usage > AI Credits**. From there, admins can:

- **View usage**: See the current month's credit consumption, broken down by AI product.
- **Enable or disable billable AI products**: A single org-level toggle controls all billable AI products. When disabled, users can still see product surfaces and view past results (for example, previous Bits AI SRE investigations or Bits AI Assistant conversations), but new requests are blocked.
- **Coming soon**: Set a monthly AI Credit spend cap to block new requests after a configured threshold is reached.

## Availability

AI Credits are available to all Datadog customers except:

- **FedRAMP** customers, where AI Credit products are not supported.
- Customers who have explicitly opted out of AI features through their account team.

## Frequently asked questions

### Do AI Credits roll over month to month?

No. Unused Commit credits expire at the end of each monthly billing period. On-Demand credits are billed only when consumed, so there is nothing to roll over.

### What happens if I run out of Commit credits mid-month?

Usage automatically continues at the On-Demand rate. You do not need to take any action.

### What happens if I run out of credits while an AI product is mid-task?

Any task already in flight is allowed to complete—for example, a Bits AI SRE investigation that is already running finishes its work. New tasks are blocked until your credit capacity is increased, additional credits are added, or your next monthly cycle resets.

### Can I see what a request costs before I run it?

No. The final credit cost is determined after the request completes, because the model decides which steps to take. AI Credit consumption is visible in Plan & Usage at the AI product level, and the per-feature averages on this page are a reliable planning estimate.

### Can I disable AI Credits billing entirely?

Yes. An admin can disable all billable AI products from **Plan & Usage > AI Credits**. With billable AI products disabled, your organization is not billed for AI Credit consumption.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_assistant/
[2]: /bits_ai/bits_ai_dev_agent/
[3]: /bits_ai/bits_ai_sre/
[4]: /actions/agents/
