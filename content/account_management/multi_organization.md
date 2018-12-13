---
title: Managing Multiple-Organization Accounts
kind: documentation
aliases:
  - /guides/multiaccountorg
  - /account_management/mult_account
  - /account_management/faq/what-data-from-my-sub-organizations-can-i-see-in-my-parent-account
further_reading:
- link: "account_management/saml"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
---

It is possible to manage multiple child-organizations from one parent-organization account.  
This is typically used by Managed Service Providers that have customers which should not have access to each others' data. Users can be added to the parent-organization and/or multiple child-organizations and easily switch between them from the [user account settings menu][1].

The Multi-organization Account feature must be enabled by support. If this is a feature you need, [contact us][2]!

Here's a two-minute video walkthrough:

{{< wistia tg9ufqbin9>}} 

## Create a new child-organization

1. After the feature has been enabled, visit the [New Account Page][3].
2. Enter the name of the child-organization you wish to create and click the **Create** button. **The child-organization name cannot exceed 32 characters.**

The new child-organization will be created as a 14-day free trial account. You can change the billing plan on the [Organization account settings page][4]. If you wish to add the child-organization's billing to your parent-organization's billing account, [contact your sales representative][5].

## Custom domains for each child-organization

The custom domain feature must be enabled by support. [Contact The Datadog support team to enable it][2].

If you are a member of multiple organizations, custom sub-domains help you quickly identify the source of an alert or notification. They will also immediately switch you to the organization associated with the sub-domain.

For example, The URL `https://app.datadoghq.com/event/event?id=1` is associated with an event in Organization A. If a user is a member of both Organization A and Organization B, but is currently viewing Datadog within the context of Organization B, then that URL will return a 404 Not Found error. The user must switch to Organization A using the [user account settings menu][6], then revisit the URL. However, with custom sub-domains, the user could visit `https://org-a.datadoghq.com/event/event?id=1` which would automatically switch the user's context to Organization A and display the correct page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/#managing-your-organizations
[2]: /help
[3]: https://app.datadoghq.com/account/new_org
[4]: https://app.datadoghq.com/account/billing
[5]: mailto:success@datadoghq.com
[6]: /account_management/#managing-your-organizations
