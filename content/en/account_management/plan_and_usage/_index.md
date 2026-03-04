---
title: Plan and Usage Settings
description: Access usage reports, plan settings, and billing history for your Datadog account, including multi-organization usage tracking and cost analysis.
---

[Administrators][1] can access the [organization settings][2] by clicking Plan & Usage from the Account menu in the bottom of the left side navigation or by selecting Plan & Usage from the header dropdown at the top of the Personal Settings page.

## Usage reports

View hourly usage of your account across all billable parameters as well as the top 5000 custom metrics submitted. If your organization is the parent-organization in a [multi-org account][3], you can also view the usage of child-organization accounts by toggling between "Overall" and "Individual Organizations" at the top of the page. Individual child-organization accounts are isolated. They are only able to view their own usage and custom metrics.

**Note**: Allow up to 72 hours for this section to update.

Further detailed usage reports can also be created [on request][4] by your account representative.

## Plan settings

Upgrade or downgrade your account from the **Plan** tab on the Plan & Usage section.

**Note**: Contact your account representative or [success@datadoghq.com][4] to add or remove paid features that are not part of standard plans.


## Billing history

Your account billing history is available from the **Billing History** tab in the [Plan & Usage section][2]. For specific billing questions, contact your account representative or [success@datadoghq.com][4].

## Trial management

If your organization has access to product trials, users can manage their trials from the **Trial Management** tab in the [Plan & Usage section][2]. Product trials let you try out new products for a limited time without incurring costs. There is no charge during the free trial period, but you are charged for any post-trial usage.

If no product trials are available, the **Trial Management** tab is not displayed for administrator users.

<div class="alert alert-info">This tab only displays self-service trials that users can start themselves. Sales-led trials initiated by Datadog account representatives are not included.</div>

{{< img src="account_management/plan_and_usage/trial-management-tab.png" alt="Trial Management tab showing available trials, and active and past trials with end dates" >}}

From the **Trial Management** tab, you can start new available trials and view your active and past trials. The tab displays each trial's end date and includes links to each trial product and its documentation.

Usage data for trial products appears in the **Usage & Cost** tab. You are not billed for this usage, but it represents the estimated cost if no trial were active. Usage metrics from trial products are marked with an indicator icon.

{{< img src="account_management/plan_and_usage/trial-management-usage.png" width="70%" alt="Usage & Cost section showing a trial product metric with an indicator icon and tooltip explaining the estimated cost" >}}

[1]: /account_management/users/default_roles/
[2]: https://app.datadoghq.com/account/billing
[3]: /account_management/multi_organization/
[4]: mailto://success@datadoghq.com
