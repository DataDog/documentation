---
title: AI Credit Limits
description: "Set monthly AI Credit limits at the organization level, the per-user level, or both, and override limits for individual users."
further_reading:
- link: "/account_management/billing/ai_credits/"
  tag: "Documentation"
  text: "AI Credits"
---

## Overview

Organization admins can set monthly caps on AI Credit usage at the organization level, the per-user level, or both. Admins can also override the default per-user limit for individual users. AI Credits are shared across [{{< prodname >}}Bits Chat{{< /prodname >}}][1], [Bits Investigation][2], [{{< prodname >}}Bits Code{{< /prodname >}}][3], and [Bits Agent Builder][4].

## Permissions

To view and set AI Credit limits, a user needs all of the following [permissions][6]:

- `user_access_manage`
- `billing_edit`
- `org_management`

## Where to set limits

AI Credit limits are configured in [**Bits AI > AI Credits Management**][5].

## Types of limits

You can configure three types of monthly limits:

| Limit type | Description |
|---|---|
| Organization-wide limit | Caps total AI Credit usage across the organization for the month. No organization-wide limit is set by default. |
| Default per-user limit | Caps monthly AI Credit usage for each user who doesn't have an individual override. |
| Per-user override | Sets a custom monthly limit for an individual user, replacing the default per-user limit for that user. |

## How limits are applied

- When both an organization limit and a user limit (or override) are configured, the most restrictive applicable limit applies to a user.
- If a user has both a default per-user limit and an override configured, the higher of the two applies, and the user's usage is still subject to the organization-wide limit.
- Raising a limit unblocks users who reached the previous limit. Lowering a limit blocks users whose usage already exceeds the new value.
- When a user or the organization reaches a limit, affected users can't use {{< prodname >}}Bits Chat{{< /prodname >}}, Bits Investigation, {{< prodname >}}Bits Code{{< /prodname >}}, or Bits Agent Builder, and a banner shows the reset date.

### Examples

| Organization limit | Per-user limit | Users | Maximum hypothetical usage | Maximum billable AI Credits | Result |
|---|---|---|---|---|---|
| 2,000 AI Credits | 50 AI Credits per user | 20 | 50 × 20 = 1,000 AI Credits | 1,000 AI Credits | Each user can use up to 50 AI Credits without other restrictions. |
| 2,000 AI Credits | 200 AI Credits per user | 20 | 200 × 20 = 4,000 AI Credits<sup>*</sup> | 2,000 AI Credits | Each user can use up to 200 AI Credits until the organization-wide limit of 2,000 AI Credits is reached. |
| Not set | 200 AI Credits per user | 20 | 200 × 20 = 4,000 AI Credits | 4,000 AI Credits | Each user can use up to 200 AI Credits without other restrictions. |

<sup>*</sup> A configured organization limit acts as the ceiling for the organization, regardless of the sum of hypothetical per-user limits.

## Usage attribution

Attribution determines whose limit applies to a given unit of AI usage, and who the AI Credit spend is attributed to.

| Product | Attribution |
|---|---|
| [Bits Chat][1] | All Bits Chat usage rolls up to the email address of the user interacting with Bits Chat. |
| [Bits Investigation][2] | Manually started investigations roll up to the email address of the user who initiated the action.<br>Automatically triggered investigations (for example, from a monitor firing) roll up to **Autonomous Agents**. |
| [Bits Code][3] | All Bits Code usage rolls up to the email address of the user interacting with Bits Code. |
| [Bits Agent Builder][4] | Agent runs for workflows roll up to the email address of the user who created the workflow.<br>Agent runs for workflows created by service accounts roll up to **Autonomous Agents**. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_chat/
[2]: /bits_ai/bits_investigation/
[3]: /bits_ai/bits_code/
[4]: /actions/agents/
[5]: https://app.datadoghq.com/bits-ai/ai-credits-management
[6]: /account_management/rbac/permissions/
