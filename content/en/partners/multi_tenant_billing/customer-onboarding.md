---
title: Onboarding a New Customer
description: "How a partner takes a prospective customer from a registered deal to a connected customer organization."
---

## Overview

When a partner has a prospect interested in Datadog, the path from that first conversation to a connected customer organization has three parts: register the opportunity, create a Trial Org for the prospect, and work with the partner account team through to a signed contract. An Admin Org is what makes the Trial Org step self-service.

## Register the opportunity

Register the opportunity on the [Partner Portal][1] as early as possible. Registering:

- Increases the chance the opportunity is recognized as partner-sourced.
- Gives Datadog visibility into the partner's involvement if Datadog is already engaged with the same prospect, enabling collaboration instead of overlap.
- Creates a shared, transparent record between Datadog and the partner for tracking the opportunity to close.

To register a deal:

1. Log in to the [Partner Portal][1].
2. From the {{< ui >}}Deal Dashboard{{< /ui >}}, click {{< ui >}}Register Deal{{< /ui >}}.
3. Complete the required fields, including as much detail as possible: opportunity name, customer name, expected close date, use cases, key stakeholders, and estimated ARR.
4. Click {{< ui >}}Submit{{< /ui >}}.

After submitting, notify the partner account team that a new opportunity was registered. Contact [partner-support@datadoghq.com][2] if unsure who to reach.

## Create a Trial Org

After the opportunity is registered, create a Trial Org for the prospect. This requires an Admin Org with the Trial Org Creator capability enabled; see [Getting started][3] if one isn't set up yet.

When selecting a region for the Trial Org, match the prospect's environment where possible: cloud provider, geography, and compliance needs. For example, a prospective Azure customer is a fit for the US3 (Azure) site. Default to US1 if there are no specific constraints, or align with the partner account team when unsure.

See [Trial Org Provisioning][4] for the full form walkthrough.

## Share the Trial Org with the account team

A Trial Org's usage is not visible from the Admin Org on its own. Share the new Trial Org's ID with the partner account team so it can be associated with the registered opportunity. Continue working with the partner account team as the opportunity progresses to a signed contract; the customer organization connects to the Admin Org, and its usage becomes visible, once that contract is active and associated with the partnership.

## What's next

See [Cost and Usage Visibility][5] for how usage and cost data appears from the Admin Org after a customer organization is connected, or [Troubleshooting][6] for common issues along the way.

[1]: https://partners.datadoghq.com
[2]: mailto:partner-support@datadoghq.com
[3]: /partners/multi_tenant_billing/#getting-started
[4]: /partners/multi_tenant_billing/trial-org-provisioning/
[5]: /partners/multi_tenant_billing/cost-and-usage-visibility/
[6]: /partners/multi_tenant_billing/troubleshooting/
