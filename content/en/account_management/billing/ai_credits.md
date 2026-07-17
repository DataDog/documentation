---
title: AI Credits
description: "Understand how AI Credits work, which products consume them, pricing models, and how to manage usage for your organization."
aliases:
- /bits_ai/ai_credits/
further_reading:
- link: "/bits_ai/bits_chat/"
  tag: "Documentation"
  text: "Bits Chat"
- link: "/bits_ai/bits_code/"
  tag: "Documentation"
  text: "Bits Code"
- link: "/bits_ai/bits_investigation/"
  tag: "Documentation"
  text: "Bits Investigation"
- link: "/actions/agents/"
  tag: "Documentation"
  text: "Bits Agent Builder"
---

## Overview

AI Credits are how Datadog meters and bills usage of its AI products. One AI Credit represents a unit of intelligent work performed by a Datadog AI product.

Use this page to understand which products consume AI Credits, how pricing works, how to track usage, and how to control access for your organization.

## AI products billed in AI Credits

The following products consume AI Credits:

| Product | What it does |
|---|---|
| [Bits Chat][1] | Search and analyze telemetry, create dashboards and notebooks, and inspect monitors with natural language. |
| [Bits Investigation][3] | Automatically investigate alerts, correlate telemetry, identify root causes, summarize impact, and apply remediations. |
| [Bits Code][2] | Turn Datadog context into faster fixes with AI-assisted code generation, review, and debugging. |
| [Bits Agent Builder][4] | Build custom AI agents that automate high-value workflows like incident response and custom reporting. |

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

If your usage exceeds your monthly Commit, additional credits are billed automatically at the On-Demand rate.

## Admin controls

All AI Credit management lives in [**Plan & Usage > AI Credits**][6]. From there, admins can:

- **View usage**: See the current month's credit consumption, broken down by AI product.
- **Enable or disable AI products powered by AI Credits**: A single org-level toggle controls all AI products powered by AI Credits. When disabled, users can still see product surfaces and view past results, but new requests are blocked.

{{< img src="account_management/billing/view-ai-credit-usage.png" alt="The AI Credits page showing the AI Products toggle enabled, a Cost Overview section, and a Usage Overview section with a bar chart broken down by Bits Agent Builder, Bits Chat, Bits Code, and Bits Investigations AI Credits." >}}

### Disable specific products

All AI Credits products are enabled by default with the Datadog Standard Role. To disable specific products, remove the following permissions per user or role:

| Product | Permission |
|---|---|
| [Bits Chat][1] | Bits Chat Access |
| [Bits Investigation][3] | Bits Investigations Write |
| [Bits Code][2] | Bits Code Write |
| [Bits Agent Builder][4] | Bits Agent Builder Write, Bits Agent Builder Run |

To manage permissions, go to [**Organization Settings > Roles**][7], select a role, and toggle the relevant permission.

## Monitor usage

| Product | Metric | Description |
|---|---|---|
| [Bits Chat][1] | `datadog.estimated_usage.bits_chat.ai_credits` | AI Credits consumed by Bits Chat. |
| [Bits Investigation][3] | `datadog.estimated_usage.bits_investigation.ai_credits` | AI Credits consumed by Bits Investigation. |
| [Bits Code][2] | `datadog.estimated_usage.bits_code.ai_credits` | AI Credits consumed by Bits Code. |
| [Bits Agent Builder][4] | `datadog.estimated_usage.bits_agent_builder.ai_credits` | AI Credits consumed by Bits Agent Builder. |

## Availability

AI Credits are available to all Datadog customers except:

- **FedRAMP** customers, where AI Credit products are not supported.
- Customers who have explicitly opted out of AI features through their account team.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_chat/
[2]: /bits_ai/bits_code/
[3]: /bits_ai/bits_investigation/
[4]: /actions/agents/
[5]: https://www.datadoghq.com/pricing/?site=us&product=ai-credits#products
[6]: https://app.datadoghq.com/billing/ai-credits
[7]: https://app.datadoghq.com/account/login?next=%2Forganization-settings%2Froles
