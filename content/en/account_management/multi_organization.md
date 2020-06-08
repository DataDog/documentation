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
---

It is possible to manage multiple child-organizations from one parent-organization account. This is typically used by Managed Service Providers that have customers which should not have access to each others' data. Users can be added to the parent-organization and/or multiple child-organizations and switch between them from the [user account settings menu][1].

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

To configure SAML for multi-organizations, use the following procedure:

1. Create a new organization as a different user, with a different username/password.
2. Invite SAML users.
3. Login as a SAML user and set SAML.

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
