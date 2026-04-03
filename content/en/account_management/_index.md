---
title: Account Management
description: "Manage your Datadog account and organization"
aliases:
    - /guides/billing
    - /account_management/settings
cascade:
    algolia:
        rank: 70
further_reading:
    - link: "https://www.datadoghq.com/blog/volkswagen-organizations/"
      tag: "Blog"
      text: "Best practices for managing Datadog organizations at scale"
---
{{< site-region region="gov" >}}
<div class="alert alert-danger">The Datadog for Government platform supports only SAML or basic authentication using a username/email and password. Before configuring SAML authentication, ensure that at least one username/email and password account is established to maintain access during the setup process. Datadog recommends enabling multi-factor authentication (MFA) for password-based accounts.

If you need SAML enabled for a trial account, contact <a href="https://docs.datadoghq.com/getting_started/support/">Datadog Support</a>.</div>

{{< /site-region >}}

## Personal settings

The personal settings pages in Datadog allow you to control how you appear to others in your organization, switch or leave organizations, and manage your notification preferences.

### Profile

Your profile is how others in your organization recognize you in Datadog. Set or update your name, email address, and title from the [Profile tab][11] within the **Personal Settings** page.

To update your picture, create an account on [Gravatar][1] and associate it with your email address.

If you log in to Datadog using Google authentication, your email address is provided by your Google account and is **not** editable within Datadog. To change your email address in Google, see the [Google documentation][2].

### Preferences

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
You can manage your time zone, time format, visual accessibility preference, and email subscriptions from the [Preferences tab][3] within the **Personal Settings** page.

#### Email subscriptions

Under email subscriptions, you have access to the following reports:
{{< site-region region="us3,us5,gov,ap1,ap2" >}}
<div class="alert alert-danger">Email digests are not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

* Daily Digest
* Weekly Digest

If you are unsure if an email digest is relevant to you, you can view an example by clicking the **Example** link next to each email subscription. You can also use the **Unsubscribe From All** button to unsubscribe from all email subscriptions.
{{% /site-region %}}


{{% site-region region="gov" %}}
You can manage your time zone, time format, and visual accessibility preference from the [**Preferences** tab][3] within the **Personal Settings** page.
{{% /site-region %}}

#### Time format

Choose whether times are shown in 12-hour or 24-hour format in Datadog (for example, "2:30 pm" or "14:30"). New accounts default to 12-hour format. Graphs and certain tabular data show in 24-hour format at all times.

#### Visual accessibility

The visual accessibility preference has five different settings to address color vision deficiency, low visual acuity, and sensitivity to bright colors. If you opt in to an accessible color setting, Datadog translates all graphs that use the classic color palette to an accessible set of colors catered to your visual needs.

**Note**: Your visual accessibility preference is saved locally in your browser. If you use a different browser or clear your cache, the preference is set to the default setting.

### Organizations

The [Organizations tab][12] in **Personal Settings** lists all of the organizations you are associated with. Switch between these organizations from this page or by hovering over the account menu in the left-side navigation.

**Note**: If you leave an organization, you cannot rejoin unless invited by an administrator in that organization.

To join an existing organization, you must be invited by an administrator. After you are invited, you are sent an email with the subject "You've been invited to join \<Organization Name>". Click the **Join Account** button in the email.

If you are an organization administrator, reference the additional documentation to:

* [Manage users in your organization][4]
* [Configure single sign on with SAML][5]
* [Rename your organization][6]
* [Manage multi-organization accounts][7]
* [Change your Datadog plan and view usage and billing history][8]

### Security

#### Application keys

The [Application Keys tab][13] in **Personal Settings** allows you to manage your application keys. To copy a key, hover over it until the **Copy Key** icon appears to the right, and click on it. You can also click into a specific key to edit its name, view when it was created, view the profile of the key's owner, copy it, or revoke it.

#### Apps

The [Apps tab][14] in **Personal Settings** allows you to manage apps that have been installed or created by members of your organization. You can filter apps with a search string, or choose to view only enabled or disabled apps using checkboxes.

When you hover over an app, the option to enable or disable it appears on the right of the app listing.

#### Email verification
Verify your email address for enhanced account security and access to additional management features. Verified users have greater control over their account security and can see all the organizations they belong to.

- **Google login users** are automatically verified during their first login.
- **Password-based users** verify their email when setting their password for the first time.
- **SAML users** must manually verify their email through Datadog.

After being verified, you gain access to:
- The ability to **log out of all active web sessions** across devices, ensuring security in case of credential compromise.
- The ability to **view and switch between organizations** outside of your current org hierarchy.

Unverified users can still access Datadog, but are limited to viewing organizations within their hierarchy and cannot revoke active sessions.

#### Verify your email

To verify your email:
1. Navigate to your **Profile Settings**.
2. Click on **Verify Account**.
3. Enter the **verification code** sent to your registered email.
4. Click **Submit** to complete the verification process.

#### Log out of all active web sessions

To log out of all active web sessions:
Logging out of all active web sessions logs you out of all current sessions across devices, including the one you're using.


To log out of all active sessions:
1. Go to **Personal Settings**.
2. Click **Log Out of All Web Sessions**.
3. Confirm the action.

After confirming, you are logged out from all devices and need to log back in.

## Appearance

View Datadog in dark mode by hovering over your avatar in the sidebar, or by pressing `Ctrl+Opt+D` / `Ctrl+Alt+D`.

To adapt to your computer's appearance setting, select the *System* option. This automatically matches Datadog's appearance to the theme you've set at the OS level.

## Connecting to GitHub

If you have installed the [GitHub integration][9] to create events in Datadog, link your personal GitHub account to your Datadog user account. By linking your accounts, any comments you post to GitHub events in Datadog are automatically posted back into the corresponding issue or pull request in GitHub.

## Disabling your organization's account

To disable your Datadog organization account, contact [Datadog support][10].

[1]: https://gravatar.com
[2]: https://support.google.com/accounts/answer/19870?hl=en
[3]: https://app.datadoghq.com/personal-settings/preferences
[4]: /account_management/users/
[5]: /account_management/saml/
[6]: /account_management/org_settings/#change-your-organization-name
[7]: /account_management/multi_organization/
[8]: /account_management/org_settings/
[9]: /integrations/github/
[10]: /help/
[11]: https://app.datadoghq.com/personal-settings/profile
[12]: https://app.datadoghq.com/personal-settings/organizations
[13]: https://app.datadoghq.com/personal-settings/application-keys
[14]: https://app.datadoghq.com/personal-settings/apps
