---
title: Organization Settings
kind: documentation
---
## Overview
The Organization Settings section is available to [Administrators][1] by clicking **Organization Settings** from the account menu in the bottom of the left side navigation or by selecting **Organization Settings** from the header dropdown at the top of the Personal Settings page.

Organization Settings allow you to manage users, groups, RBAC, keys, and tokens. This page outlines every section and where in the documentation you can learn about specific tasks in **Organization Settings**.
### Accounts
#### Users

Read the [user management][2] documentation to add, edit, and disable users.
#### Service Accounts

### Groups

#### Roles

To learn about default and custom roles in Datadog, read the [Role Based Access Control documentation][3].
#### SAML Group Mappings

When enabled, users logging in with SAML to your Datadog account are stripped of their current roles and reassigned to new roles based on the details in their SAML assertion passed on from your Identity Provider and the mappings you've created.

Users who log in with SAML and do not have the values that map to a Datadog role are stripped of all roles and are not allowed to log in.
To learn how to create and set mappings, read the [Mapping SAML attributes documentation][4].

##### SAML settings

For more information about configuring SAML, reference the [Single sign on with SAML documentation][5].
### Access

#### API Keys

This section allows you to view, copy, and revoke any API key in the list. Your API Keys are unique to your organization. An API key is required by the Datadog Agent to submit metrics and events to Datadog. Read the [API keys documentation][6] for more information on creating, editing, and revoking keys.

#### Application Keys

You can filter application keys by name, ID, or owner, or click the **Only My Keys** toggle to only view application keys you own. Read the [Application keys documentation][6] for more information on how to add or remove them.

#### Client Tokens

Client tokens are used to send events and logs from your user’s web and mobile applications. They are unique to your organization. Deleting a client token that is linked to a RUM Application causes your RUM Application to stop reporting. The [process to create them][7] is similar to API and Application Keys.

#### Events API Emails
If your application does not have an existing Datadog integration, and you don’t want to create a custom Agent check, you can send events with email. To learn how to set up events API emails, read the [Events with email guide][8].

### Security

#### Public Sharing

The **Public Sharing** tab contains lists of shared dashboards and shared graphs. You can also edit your sharing settings by clicking the **Enabled** toggles.

#### Authentication

The **Authentication** tab shows password, Google, and SAML authentication settings. You can toggle each with the **Enabled by Default** dropdowns.

#### Audit Logs

The **Audeit Logs** tab in the Organization Settings page opens a new tab to the Audit Events Explorer.

#### Audit Log Settings

The **Audit Log Settings** tab allows you to set the retention period of audit logs and enable archiving to other cloud storage services.

### General

#### Rename organization

To rename your organization, click the **Rename organization** tab, enter the new name, then click **Save**.

**Note: Your organization name may not exceed 32 characters.**

[1]: /account_management/users/default_roles/
[2]: /account_management/users/
[3]: /account_management/rbac/
[4]: /account_management/saml/#mapping-saml-attributes-to-datadog-roles
[5]: /account_management/saml/
[6]: /account_management/api-app-keys/
[7]: /account_management/api-app-keys/#client-tokens
[8]: /events/guides/email/
