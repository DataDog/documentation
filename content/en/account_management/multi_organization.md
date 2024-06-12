---
title: Managing Multiple-Organization Accounts
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
- link: "/account_management/org_settings/cross_org_visibility"
  tag: "Documentation"
  text: "Cross-Organization Visibility"
---

## Overview

It is possible to manage multiple child-organizations from one parent-organization account. This is typically used by managed service providers that have customers which should not have access to each others' data. 

The multi-organization account feature is not enabled by default. Contact [Datadog support][1] to have it enabled.

## Capabilities

Users can be added to the parent-organization and multiple child-organizations. Users switch between organizations from the [user account settings menu][2]. 

Organizations within a parent organization do not have access to each other's data. To enable cross-organization metric queries, see [cross-organization visibility][3].

The parent-organization can view the usage of individual child-organizations, allowing the parent to track usage trends.

Account settings, such as allow-listed IP addresses, are not inherited by child-organizations from their parent-organization.

## Child organizations

### Create

1. After the feature is enabled, see the [New Organization Page][4].
2. Enter the name of the child-organization you wish to create. **The child-organization name cannot exceed 32 characters.**
3. Optionally, invite admin users to your child-organization:
    - Enter one or more email addresses.
    - Invited users are assigned the [Datadog Admin role][5]. You can invite more users in
Organization Settings after creating your organization.
    - If the user does not have a password, Datadog sends an email invitation with a link to set a password and join the new child-organization.
4. Click **Create**.

The new child-organization inherits the parent-organization's plan and is added to the parent-organization's billing account. If you want to update the child-organization's billing, [contact your sales representative][6].

### Content

Onboarding a new sub-organization with a set of baseline dashboards and monitors can be done programmatically with the [Datadog API][7] and tools such as Terraform, see [Managing Datadog with Terraform][8]. Additionally, scripts can be used to backup existing dashboards and [monitors][9] as code.

### Custom sub-domains

The custom sub-domain feature is not enabled by default. Contact [Datadog support][1] to have it enabled.

If you are a member of multiple organizations, custom sub-domains help you identify the source of an alert or notification. Also, they can immediately switch you to the organization associated with the sub-domain.

For example, the URL `https://app.datadoghq.com/event/event?id=1` is associated with an event in Organization A. If a user is a member of both Organization A and Organization B, but is viewing Datadog within the context of Organization B, then that URL returns a `404 Not Found error`. The user must switch to Organization A using the [user account settings menu][2], then revisit the URL. However, with custom sub-domains, the user could navigate to `https://org-a.datadoghq.com/event/event?id=1` which would automatically switch the user's context to Organization A and display the correct page.

**Note**: If you have a custom Datadog subdomain, manually edit the links from the Datadog documentation with your subdomain name. For example, a link redirecting to `https://**app**.datadoghq.com/account/settings` becomes `https://**<custom_sub-domain_name>**.datadoghq.com/account/settings`.

## Set up SAML

SAML setup is _not_ inherited by child-organizations from the parent-organization. SAML must be configured for each child-organization individually.

To configure SAML for multi-organizations:

1. Create a new organization.
2. Invite SAML users.
3. Login as a SAML user and [set up SAML][10].

### SAML strict parent organizations

Under some circumstances, you may be unable to access a newly created child organization. When an organization requires users to log in using SAML, its user accounts may lack passwords. Since child organizations do not inherit SAML settings from their parents, logging into the child organization requires a password that does not exist.

To ensure that you can log into a child organization created from a SAML strict parent organization, take the following steps in the parent organization:
1. Click **Organization Settings** from the account menu in the bottom of the left side navigation, or select **Organization Settings** from the header dropdown at the top of the Personal Settings page.
2. In the left page menu, select **Users**.
3. Select your user profile.
4. Set the **Override Default Login Methods** toggle to the on position.
5. Under **Select user's login methods**, place a checkmark in the **Password** checkbox.
6. Ensure your account has a password. If you need help setting a password, contact [Datadog support][1].

Following the steps above ensures that you can log into the parent account using an email and password combination. After creating your child organization, you can also log into it using your email and password.

If you already created the child organization and are locked out, following the procedure allows you to log in.

## Multi-org usage

The parent-organization can view the total and billable usage of all their organizations (child and parent organizations) by hovering over their username on the bottom left corner and navigating to **Plan & Usage** > **Usage**.

The Usage page shows the aggregate usage of the parent-organization and all its child-organizations. There are two tabs on the Usage page:

* Overall
* Individual Organizations

### Overall usage

This tab contains a Month-to-Date Total Usage section and an Overall Usage section.

The Month-to-Date Total Usage section summarizes your month-to-date usage of hosts, containers, custom metrics, and any other part of the platform you've used during the month, across your parent-organization and all its child-organizations.

{{< img src="account_management/multi-org-v2.png" alt="Month-to-Date Usage" >}}

Most accounts by default can view "Billable" usage, which shows usage that contributes to your final bill. This view also breaks out on-demand usage above your commitments and allocations. The "All" view shows you all usage, including non-billable usage such as product trials.

The Overall Usage section shows the monthly aggregate usage across all organizations over the past 6 months. The usage shown here is "All" usage not "Billable" usage, which means it does not adjust for trial periods or other billing changes used to calculate your final bill. This information can be downloaded as a CSV file.

{{< img src="account_management/multi-org-v2-trends.png" alt="Overall Usage Long-term trends" >}}

Both the Month-to-Date Total Usage section and the Overall Usage section can be filtered by clicking on product specific sub-tabs. In the "Log Management" sub-tab, you can view the Logs Usage by Index table, which displays your month-to-date and last month's indexed log usage by:

* Index name
* Organization
* Retention period in days
* Indexed log count broken down between live and rehydrated logs
* The index's contribution percentage to the overall indexed log usage

This data can be downloaded as a CSV file.

{{< img src="account_management/multi-org-v2-logs-by-index.png" alt="Multi-org Logs Usage by Index" >}}

### Individual organization usage

On the **Individual Organizations** usage tab, you can view the usage of your child organizations in absolute units or as a percentage of total usage.

{{< img src="account_management/multi-org-percent-billable-v2.png" alt="Individual Percent Usage" >}}

The default view is the "Billable" view, which shows usage that contributes to your final bill. This view removes child organizations that are not billable such as trial organizations, and other adjustments that provide a more accurate summary of what drives your bill. Switch to the "All" view to see the unadjusted, raw usage of your parent-organization and all child-organizations. Both views can be downloaded as a CSV file.

To view the [Usage Details][11] of a child-organization, you can click on the child-organization's name.

## Usage attribution

The parent-organization can view the usage of child-organizations by existing tag keys in the [Usage Attribution][12] page. Admins can hover over their username at the bottom left, then navigate to: `Plan & Usage`--> `Usage Attribution`.

When enabled at the parent-organization level, usage attribution shows usage aggregated across all organizations. This can be useful if you would like to attribute the usage of your child-organizations to certain projects, teams, or other groupings.

Functionalities include:

* Changing and adding new tag keys (up to three).
* Accessing monthly usage in both the UI and as a .tsv download (tab separated values)
* Accessing daily usage in a .tsv file for most usage types.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="Monthly Usage Attribution Report" style="width:100%;" >}}

Usage attribution can also be enabled at the child-organization level. When enabled at this level, the tags are only applied to that specific child-organization and can only be viewed in that child-organization. Tags applied at the child-organization level do not rollup and cannot be viewed in the parent-organization.

Usage Attribution is an advanced feature included in the Enterprise plan. For all other plans, contact your account representative or <a href="mailto:success@datadoghq.com">success@datadoghq.com</a>.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /account_management/#managing-your-organizations
[3]: /account_management/org_settings/cross_org_visibility/
[4]: https://app.datadoghq.com/account/new_org
[5]: /account_management/rbac/permissions/#advanced-permissions
[6]: mailto:success@datadoghq.com
[7]: /api/
[8]: https://www.datadoghq.com/blog/managing-datadog-with-terraform
[9]: /monitors/manage/
[10]: /account_management/saml/
[11]: /account_management/plan_and_usage/usage_details/
[12]: /account_management/billing/usage_attribution/
