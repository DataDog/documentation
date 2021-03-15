---
title: Account Management
kind: documentation
description: "Manage your Datadog account and organization"
aliases:
    - /guides/billing
    - /account_management/settings
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">The Datadog for Government site only supports SAML login.</div>
{{< /site-region >}}

## Account settings

The *[account settings][1]* page in Datadog allows you to control how you appear to others in your organization; switch or leave organizations; manage your notification preferences and more.

### Profile

Your profile is how others in your organization recognize you in Datadog. Set or update your name, email address and organizational role here.

To update your picture, create an account on [Gravatar][2] and associate it with your email address.

If you log in to Datadog using Google authentication, your email address is provided by your Google account and is *not* editable within Datadog. To change your email address in Google, refer to the [Google documentation][3].

### Organizations

The *account settings* page also lists all of the organizations you are associated with. Switch between these organizations from this page or by hovering over the account menu in the left-side navigation.

**Note**: If you leave an organization, you cannot rejoin unless invited by an administrator in that organization.

To join an existing organization, you must be invited by an administrator. Once invited, you'll receive an email with the subject `You've been invited to join <Organization Name>`. Click the **Join Account** button in the email.

If you are an organization administrator, reference the additional documentation to:

* [Manage users in your organization][4]
* [Configure single sign on with SAML][5]
* [Rename your organization][6]
* [Manage multi-organization accounts][7]
* [Change your Datadog plan and view usage and billing history][8]

### Preferences

You can set your timezone, desktop notifications, and email subscriptions from the [*Preferences* tab][9] within the *account settings* page. Under email subscriptions, you have access to the following reports:

* Daily Digest
* Weekly Digest
* Weekly Monitor Report
* Weekly Pagerduty Report
* Weekly Nagios Report

## Appearance

View Datadog in dark mode by hovering over your avatar in the sidebar, or by pressing `Ctrl+Opt+D` / `Ctrl+Alt+D`.

To adapt to your computer's appearance setting, select the *System* option. This automatically matches Datadog’s appearance to the theme you’ve set at the OS level:

{{< img src="account_management/dark-mode-toggle.png" alt="Dark mode"  style="width:60%;">}}

## Connecting to GitHub

If you have installed the [GitHub integration][10] to create events in Datadog, link your personal GitHub account to your Datadog user account. By linking your accounts, any comments you post to GitHub events in Datadog are automatically posted back into the corresponding issue or pull request in GitHub.

## Deleting your account

To delete your Datadog account completely, [contact our support team][11].

[1]: https://app.datadoghq.com/account/profile
[2]: https://gravatar.com
[3]: https://support.google.com/accounts/answer/19870?hl=en
[4]: /account_management/users/
[5]: /account_management/saml/
[6]: /account_management/org_settings/#change-your-organization-name
[7]: /account_management/multi_organization/
[8]: /account_management/org_settings/
[9]: https://app.datadoghq.com/account/preferences
[10]: /integrations/github/
[11]: /help/
