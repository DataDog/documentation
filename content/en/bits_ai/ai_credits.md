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
| [Bits AI Assistant][1] | Conversational assistant for searching telemetry, exploring data, and generating dashboards across the Datadog platform. |
| [Bits AI Dev][2] | AI-assisted code fixes for application code, infrastructure-as-code, and Datadog configuration. |
| [Bits AI SRE][3] | Autonomous investigations triggered by monitors, incidents, and other signals. |
| [Agent Builder][4] | Custom agents built on Datadog telemetry and tools. |

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
| Bits AI Assistant — search and explore telemetry | 0.5 |
| Bits AI Assistant — dashboard generation | 3 |
| Bits AI Assistant — cloud cost investigation | 2.1 |
| Bits AI SRE — investigation | 6.5 |
| Bits AI Dev — code fix | 5 |
| Agent Builder — message | 0.3 |

<div class="alert alert-info">These are the credit consumption rates as of June 1, 2026. Costs for each feature may change as models are optimized or new models become available.</div>

## Admin controls

### Enable or disable billable AI products

Admins can disable all billable AI products with a single org-level toggle. When billable AI products are disabled, users in your organization can still see the product surfaces in Datadog and view past results (for example, previous Bits AI SRE investigations or Bits AI Assistant conversations). New requests are blocked, and users see a message directing them to ask an admin to enable AI.

### Manage AI Credits in Plan & Usage

All AI Credit configuration lives in **Plan & Usage > AI Credits**. From there, admins can:

- View the current month's credit consumption, broken down by AI product.
- Turn billable AI products on or off (single org-level toggle covering all billable AI products).
- Receive notifications as your organization approaches its monthly AI Credit limit, with time to add capacity before usage is impacted.
- **Coming soon**: Set a monthly AI Credit spend cap to block new requests after a configured threshold is reached.

### Track usage

Admins can view AI Credit consumption at any time in **Plan & Usage > AI Credits**, broken down by AI product.

## Availability

AI Credits are available to all Datadog customers except:

- **FedRAMP / Datadog for Government** customers, where AI Credit products are not supported.
- Customers who have explicitly opted out of AI features through their account team.

## Frequently asked questions

### Do AI Credits roll over month to month?

No. Unused Commit credits expire at the end of each monthly billing period. On-Demand credits are billed only when consumed, so there is nothing to roll over.

### What happens if I run out of Commit credits mid-month?

Usage automatically continues at the On-Demand rate ($1.30 per credit). You do not need to take any action.

### What happens if I run out of credits while an AI product is mid-task?

Any task already in flight is allowed to complete—for example, a Bits AI SRE investigation that is already running finishes its work. New tasks are blocked until your credit capacity is increased, additional credits are added, or your next monthly cycle resets.

### Can I see what a request costs before I run it?

Not exactly. Because the model decides which steps it needs to take to complete a task, the final credit cost is determined after the request completes. AI Credit consumption is visible in Plan & Usage at the AI product level, and the per-feature averages on this page are a reliable planning estimate.

### Can I disable AI Credits billing entirely?

Yes. An admin can disable all billable AI products from **Plan & Usage > AI Credits**. With billable AI products disabled, your organization is not billed for AI Credit consumption.

### What is the difference between AI Credits and other usage-based SKUs?

AI Credits unify billing across Datadog's billable AI products under a single, predictable unit. Instead of separate SKUs and pricing models per AI product, you purchase one currency (credits) that works across [Bits AI Assistant][1], [Bits AI Dev][2], [Bits AI SRE][3], and [Agent Builder][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_assistant/
[2]: /bits_ai/bits_ai_dev_agent/
[3]: /bits_ai/bits_ai_sre/
[4]: /actions/agents/
