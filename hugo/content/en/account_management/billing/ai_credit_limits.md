---
title: AI Credit Limits
description: "Set monthly AI Credit limits at the organization, role, per-user, or service account level."
further_reading:
- link: "/account_management/billing/ai_credits/"
  tag: "Documentation"
  text: "AI Credits"
---

## Overview

Organization admins can set monthly caps on AI Credit usage for the organization, for roles, and for individual users. A default per-user limit applies to every user, and admins can override it for individual users. Admins can also set limits for individual service accounts. AI Credits are shared across [Bits Chat][1], [Bits Investigation][2], [Bits Code][3], [Bits Agent Builder][4], and [Bits Database Optimization][13].

## Permissions

To view and set AI Credit limits, a user needs the [`billing_edit` permission][6].

## Where to set limits

AI Credit limits are configured in [**Bits AI > AI Credits Management**][5].

## Types of limits

You can configure the following types of monthly limits:

| Limit type | Description |
|---|---|
| Organization-wide limit | Caps total AI Credit usage across the organization for the month. No organization-wide limit is set by default. |
| Default per-user limit | Caps monthly AI Credit usage for each user who isn't covered by a role-based limit or an override. |
| Role-based limit | Caps monthly AI Credit usage for each user with a given [role][11]. |
| Per-user override | Sets a custom monthly limit for an individual user, replacing any role-based or default per-user limit for that user. |
| Service account override | Sets a custom monthly limit for an individual [service account][12]. |

## How limits are applied

When more than one limit applies, Datadog checks them in the following order:

| Check | Users | Service accounts |
|---|---|---|
| Always applied | Organization limit | Organization limit |
| Priority order | 1. Per-user override<br>2. Highest role-based limit<br>3. Default per-user limit | 1. Service account override |

Within the organization limit, Datadog applies the first limit in the priority order that's set and skips the rest.

- Raising a limit unblocks users who reached the previous limit. Lowering a limit blocks users whose usage already exceeds the new value.
- When a user or the organization reaches a limit, affected users can't use Bits Chat, Bits Investigation, Bits Code, Bits Agent Builder, or Bits Database Optimization. A banner shows the reset date.
- When a limit is reached, requests to start an investigation through the [Bits AI API][7] return HTTP `429` with the error code `AI_CREDITS_EXHAUSTED`. A `429` with the error code `INVESTIGATION_RATE_LIMIT_EXCEEDED` means an [investigation rate limit][8] was reached instead.

### Service accounts

Datadog reports [service account][12] usage separately from user usage. Service accounts have no default limit. Role-based limits and the default per-user limit don't apply to service accounts, even if a service account has a role with a limit.

### Examples

#### How the organization limit caps total usage

These examples show how the organization limit and the per-user limit combine to cap total billable usage in a 20-user organization. In the second row, the per-user limits add up to more than the organization limit, so the organization limit becomes the effective cap.

| Organization limit | Per-user limit | Users | Maximum hypothetical usage | Maximum billable AI Credits | Result |
|---|---|---|---|---|---|
| 2,000 AI Credits | 50 AI Credits per user | 20 | 50 × 20 = 1,000 AI Credits | 1,000 AI Credits | Each user can use up to 50 AI Credits without other restrictions. |
| 2,000 AI Credits | 200 AI Credits per user | 20 | 200 × 20 = 4,000 AI Credits<sup>*</sup> | 2,000 AI Credits | Each user can use up to 200 AI Credits until the organization-wide limit of 2,000 AI Credits is reached. |
| Not set | 200 AI Credits per user | 20 | 200 × 20 = 4,000 AI Credits | 4,000 AI Credits | Each user can use up to 200 AI Credits without other restrictions. |

<sup>*</sup> A configured organization limit acts as the ceiling for the organization, regardless of the sum of hypothetical per-user limits.

#### Which limit applies to a user

In this organization, the Standard role limit is 200 AI Credits and the Admin role limit is 400 AI Credits. Each row shows a different user and the limit that applies to them, based on the priority order in the [How limits are applied](#how-limits-are-applied) section.

| Per-user override | User's roles | Default per-user limit | Limit applied | Why |
|---|---|---|---|---|
| 50 AI Credits | Standard and Admin | 100 AI Credits | 50 AI Credits | The override is checked first, so it applies even though it's lower than both role limits. |
| None | Standard and Admin | 100 AI Credits | 400 AI Credits | With no override, the highest of the user's role limits applies. |
| None | Standard | 100 AI Credits | 200 AI Credits | With no override, the Standard role limit applies. |
| None | No role with a limit | 100 AI Credits | 100 AI Credits | With no override and no role limit, the default per-user limit applies. |
| None | No role with a limit | Not set | Organization limit | With no user-level limit configured, the user is capped only by the organization limit. |

## Usage attribution

Attribution determines whose limit applies to a given unit of AI usage, and who the AI Credit spend is attributed to.

| Product | Attribution |
|---|---|
| [Bits Chat][1] | All Bits Chat usage, including chats inside an investigation, rolls up to the email address of the user interacting with Bits Chat. |
| [Bits Investigation][2] | Manually started investigations roll up to the email address of the user who initiated the action.<br>Investigations started through the API roll up to the user or service account that owns the API key, and count toward that account's limits.<br>Automatically triggered investigations (for example, from a monitor firing) roll up to **Autonomous Agents**. |
| [Bits Code][3] | All Bits Code usage rolls up to the email address of the user interacting with Bits Code. |
| [Bits Agent Builder][4] | Agent runs for workflows roll up to the email address of the user who created the workflow.<br>Agent runs for workflows created by service accounts roll up to **Autonomous Agents**. Named service accounts are broken out from **Autonomous Agents**. |

## Get alerted before reaching a limit

To get notified before users reach their limit, use the AI Credits [usage metrics][10], grouped by `user_handle`, in a [metric monitor][9].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_chat/
[2]: /bits_ai/bits_investigation/
[3]: /bits_ai/bits_code/
[4]: /actions/agents/
[5]: https://app.datadoghq.com/bits-ai/ai-credits-management
[6]: /account_management/rbac/permissions/#billing-and-usage
[7]: /api/latest/bits-ai/
[8]: /bits_ai/bits_investigation/configure/#configure-rate-limits
[9]: /monitors/types/metric/
[10]: /account_management/billing/ai_credits/#monitor-usage
[11]: /account_management/rbac/
[12]: /account_management/org_settings/service_accounts/
[13]: /database_monitoring/bits_database_optimization/
