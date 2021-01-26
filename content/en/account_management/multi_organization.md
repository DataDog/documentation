---
title: Managing Multiple-Organization Accounts
kind: documentation
aliases:
  - /guides/multiaccountorg
  - /account_management/mult_account
  - /account_management/faq/what-data-from-my-sub-organizations-can-i-see-in-my-parent-account
  - /account_management/multi_organisations
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "/account_management/billing/usage_details"
  tag: "Documentation"
  text: "Learn about Usage Details"
- link: "/account_management/billing/usage_attribution"
  tag: "Documentation"
  text: "Set-up Usage Attribution"
---

It is possible to manage multiple child-organizations from one parent-organization account. This is typically used by Managed Service Providers that have customers which should not have access to each others' data. Users can be added to the parent-organization and/or multiple child-organizations and switch between them from the [user account settings menu][1]. The parent-organization can view the usage of individual child-organizations, allowing them to track trends in usage.

Account settings, such as whitelisted IP addresses, are not inherited by child-organizations from their parent-organization.

The Multi-organization Account feature is not enabled by default. Contact [Datadog support][2] to have it enabled.

Here's a two-minute video walkthrough:

{{< wistia tg9ufqbin9>}}
<br>

## Child organizations

### Create

1. After the feature is enabled, visit the [New Account Page][3].
2. Enter the name of the child-organization you wish to create and click the **Create** button. **The child-organization name cannot exceed 32 characters.**

The new child-organization inherits the parent-organization's plan and is added to the parent-organization's billing account. If you want to update the child-organization's billing, [contact your sales representative][4].

### Content

Onboarding a new sub-organization with a set of baseline dashboards and monitors can be done programmatically with the [Datadog API][5] and tools such as Terraform, see [Managing Datadog with Terraform][6]. Additionally, scripts can be used to backup existing [dashboards][7] and [monitors][8] as code.

### Custom sub-domains

The custom sub-domain feature is not enabled by default. Contact [Datadog support][2] to have it enabled.

If you are a member of multiple organizations, custom sub-domains help you identify the source of an alert or notification. Also, they can immediately switch you to the organization associated with the sub-domain.

For example, the URL `https://app.datadoghq.com/event/event?id=1` is associated with an event in Organization A. If a user is a member of both Organization A and Organization B, but is currently viewing Datadog within the context of Organization B, then that URL returns a `404 Not Found error`. The user must switch to Organization A using the [user account settings menu][1], then revisit the URL. However, with custom sub-domains, the user could visit `https://org-a.datadoghq.com/event/event?id=1` which would automatically switch the user's context to Organization A and display the correct page.

## Setting up SAML

SAML setup is _not_ inherited by child-organizations from the parent-organization. SAML must be configured for each child-organization individually. 

To configure SAML for multi-organizations:

1. Create a new organization as a different user, with a different username/password.
2. Invite SAML users.
3. Login as a SAML user and set SAML.

## Multi-org usage

The parent-organization can view the total and billable usage of all their organizations (child and parent organizations) by hovering over their username at the bottom left and then navigating to: `Plan & Usage`--> `Multi-Org Usage`.

The Multi-Org Usage tab shows the aggregate usage of the parent-organization and all its child-organizations. There are two sub-tabs on the Multi-Org Usage tab:

* Month-to-date Usage
* Long-Term Trends

### Month-to-date usage

This view contains an Overall Usage section and an Individual Organization Usage section.

The Overall Usage section summarizes your month-to-date usage of hosts, containers, custom metrics, and any other part of the platform you’ve used during the month, across your parent-organization and all its child-organizations.

{{< img src="account_management/managing-multiorgs-01.png" alt="Month-to-Date Usage" >}}

The Individual Organization Usage section contains two views that breaks down your month-to-date usage of products by organization. The "All" view is a table that lists by product the unadjusted, raw usage of your parent-organization and all child-organizations. To view the [Usage Details][9] of a child-organization, you can click on the child-organization's name.

{{< img src="account_management/managing-multiorgs-02.png" alt="Month-to-Date Usage" >}}

To view only the usage that will count toward your bill, you can switch to the "Billable" view. This removes organizations that are not billable such as trial organizations in addition to other adjustments that will provide a more accurate summary of what drives your bill.

The month-to-date usage and last month’s usage can be downloaded as a CSV file.

### Long-term trends

This tab shows the monthly aggregate usage across all organizations over the past 6 months. The usage shown here is "All" usage not "Billable" usage, which means it does not adjust for trial periods or other billing changes used to calculate your final bill.

This information can be downloaded as a CSV file.

## Usage attribution

The parent-organization can view the usage of child-organizations by existing tag keys in the [Usage Attribution][10] page. Admins can hover over their username at the bottom left, then navigate to: `Plan & Usage`--> `Usage Attribution`.

When enabled at the parent-organization level, usage attribution will show usage aggregated across all organizations. This can be useful if you would like to attribute the usage of your child-organizations to certain projects, teams, or other groupings.

Functionalities include:

* Changing and adding new tag keys (up to three).
* Accessing monthly usage in both the UI and as a .tsv download (tab separated values)
* Accessing daily usage in a .tsv file for most usage types.

{{< img src="account_management/billing/advanced-usage-reporting-03.png" alt="Usage Summary Table" >}}

Usage attribution can also be enabled at the child-organization level. When enabled at this level, the tags are only applied to that specific child-organization and can only be viewed in that child-organization. Tags applied at the child-organization level do not rollup and cannot be viewed in the parent-organization.

Note: the following usage types are not supported in this tool:

* Indexed Log Events
* Ingested Logs
* Indexed Spans

**Note:** Indexed Spans were formerly known as Analyzed Spans and renamed with the launch of Tracing Without Limits on October 20th, 2020.

Usage Attribution is an advanced feature included in the Enterprise plan. For all other plans, contact your account representative or <a href="mailto:success@datadoghq.com">success@datadoghq.com</a>.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/#managing-your-organizations
[2]: /help/
[3]: https://app.datadoghq.com/account/new_org
[4]: mailto:success@datadoghq.com
[5]: /api/
[6]: https://www.datadoghq.com/blog/managing-datadog-with-terraform
[7]: /dashboards/screenboards/#backup-my-screenboard
[8]: /monitors/manage_monitor/
[9]: /account_management/billing/usage_details/
[10]: /account_management/billing/usage_attribution/
