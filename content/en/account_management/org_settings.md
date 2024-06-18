---
title: Organization Settings
further_reading:
    - link: "/account_management/api-app-keys/"
      tag: "Documentation"
      text: "API and application keys"
    - link: "/account_management/users/"
      tag: "Documentation"
      text: "User management"
---
## Overview
The Organization Settings section is available to [Administrators][1] by clicking **Organization Settings** from the account menu in the bottom of the left side navigation or by selecting **Organization Settings** from the header dropdown at the top of the Personal Settings page.

{{< img src="account_management/org_settings/nav.png" alt="Navigate to your Organization Settings in Datadog" style="width:80%;" >}}

Organization Settings allow you to manage users, groups, RBAC, keys, and tokens. This page outlines every section and where in the documentation you can learn about specific tasks in **Organization Settings**.

## Identity & Accounts

### Users

Read the [user management][2] documentation to add, edit, and disable users.

### Teams

Read the [Teams][3] documentation to manage teams for organizing your assets within Datadog.

### Service accounts


[Service accounts][4] are non-interactive accounts that you can use to own application keys and other resources that are shared across your teams. Service account application keys can only be viewed once by the individual who created the key. You can use service accounts to access Datadog APIs without associating your application or script with a particular person.

## Authentication

### Login methods


The **Login Methods** tab shows password, Google, and SAML authentication settings. You can toggle each with the **Enabled by Default** dropdowns. In order to be "SAML Strict" or strict for any other type of login, disable the other login method types. You can allow per-user overrides in the User Management tab to allow users to login with another login method if needed.

Read the [Configuring Login Methods][5] documentation to authenticate users to log into your Datadog organization.

#### SAML settings

To learn how to configure SAML, read the [Single sign on with SAML documentation][6].

### SAML group mappings

When enabled, users logging in with SAML to your Datadog account are permanently stripped of their current roles and reassigned to new roles. The SAML assertion passed on from the Identity Provider and the mappings you create determine each user's new roles.

Users who log in with SAML and do not have values that map to a Datadog role are permanently stripped of all roles. That user may no longer log in.
To learn how to create and set mappings, read the [Mapping SAML attributes documentation][7].

## Access

### API keys

This section allows you to view, copy, and revoke any API key in the list. Your API keys are unique to your organization. An API key is required by the Datadog Agent to submit metrics and events to Datadog. Read the [API keys documentation][8] for more information on creating, editing, and revoking keys.

### Application keys

You can filter application keys by name, ID, or owner, or click the **Only My Keys** toggle to only view application keys you own. Read the [Application keys documentation][8] for more information on adding and removing keys.

### Roles

To learn about default and custom roles in Datadog, read the [Role Based Access Control documentation][9].

### Remote Configuration

To learn how to remotely configure the behavior or Datadog components deployed in your infrastructure, read [How Remote Configuration Works][10].

### Client tokens

Client tokens are used to send events and logs from your user's web and mobile applications. They are unique to your organization. Deleting a client token that is linked to a RUM Application causes your RUM Application to stop reporting. The [process to create client tokens][11] is similar to that for API and application keys.

### Events API emails

If your application does not have an existing Datadog integration, and you don't want to create a custom Agent check, you can send events with email. To learn how to set up events API emails, read the [Events with email guide][12].

## Products

### Logs


##### Out-of-contract retention periods for log indexes

Users with `Org Management` permission can enable the out-of-contract retention periods feature for log indexes. This feature is enabled on a per-org basis. This means that if a user enables the feature on a parent org, the feature is not automatically enabled for all child orgs.

{{< img src="account_management/out-of-contract-retention.png" alt="The out-of-contract retention periods for log indexes setting showing enabled." style="width:70%;" >}}

When enabled, users with `Modify Index` permission can choose any of the 3-, 7-, 15-, 30-, 45-, and 60-day retention periods, even if it is not in the contract. This can be useful when troubleshooting a potential long standing issue or meeting compliance requirements for which customers need a higher retention period that is not part of the current contract.

**Note**: Using out-of-contract retention periods incur on-demand charges. If an out-of-contract retention period is often used, Datadog recommends that customers contact their account manager to have it added to their contract.

### Monitors

#### Monitors time zone preference


Users with the `Org Management` permission can customize the time zone used in alert graph snapshots within Monitor alert notifications.

{{< img src="account_management/monitors-time-zone-preference.png" alt="Monitors Time Zone Preferences" style="width:70%;" >}}

The setting applies to **all** Monitor alert notifications, as it's an org-wide setting.

### Synthetic tests

Learn how to access and control [Synthetic Monitoring Settings][13].

## Security

### Safety Center

The **Safety Center** page contains security alerts, warnings, and recommendations to review in your organization. You can also set **Security Contacts** to receive security notifications for your organization by clicking **Configuration**, entering up to two email addresses, then clicking the **Save** button.

### Public sharing

The **Public Sharing** tab contains lists of shared dashboards and shared graphs. You can also edit your sharing settings by clicking the **Enabled** toggles.

### OAuth Apps

The [**OAuth Apps**][14] page allows you to view or manage OAuth applications in your organization.

## Compliance

### Audit trail

The **Audit Trail** tab in the Organization Settings page opens a new tab to the Audit Events Explorer.

### Audit trail settings

The **Audit Trail Settings** tab allows you to set the retention period of audit trails and enable archiving to other cloud storage services.

## General

### Preferences

#### Organization name

To rename your organization, click the **Edit** button in the **Preferences** tab of **Organization Settings**, enter the new name, then click the **Save** button.

**Note**: Your organization name must not exceed 32 characters.

#### Datadog homepage

You can choose to set your organization homepage to a Dashboard List or an individual dashboard.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/users/default_roles/
[2]: /account_management/users/
[3]: /account_management/teams/?s=login%20methods
[4]: /account_management/org_settings/service_accounts
[5]: /account_management/login_methods/
[6]: /account_management/saml/
[7]: /account_management/saml/mapping
[8]: /account_management/api-app-keys/
[9]: /account_management/rbac/
[10]: /agent/remote_config/?tab=configurationyamlfile#how-it-works
[11]: /account_management/api-app-keys/#client-tokens
[12]: /service_management/events/guides/email/
[13]: /synthetics/settings/?tab=specifyvalue#overview
[14]: /account_management/org_settings/oauth_apps
