---
title: Service Accounts
further_reading:
    - link: "https://docs.datadoghq.com/api/latest/service-accounts/"
      tag: Documentation
      text: Service accounts API reference
---

## Overview

Service accounts are non-interactive accounts you can use to own application keys and other resources that are shared across your teams. Service account application keys can only be viewed once by the individual who created the key.

Suppose an employee at your company sets up an automated script to send requests to the Datadog API, using their personal application key. When that employee leaves the company, you deactivate their Datadog account, and their application key stops working. The automated script also stops working, until someone updates it with a valid application key. Using a service account application key instead of a personal application key for automated requests to the Datadog API avoids this problem.

## Navigation

Service accounts exist in [Organization Settings][1]. 

To access service accounts in the UI:

1. Navigate to **Organization Settings** from your account menu.
2. Under **Accounts**, select **Service Accounts**.

The [Service Accounts page][2] contains a list of all service accounts in your organization. Users with the Service Account Write permission, including users with the Datadog Admin Role, may create service accounts. Users without the Service Account Write permission see a read-only view.

### View service accounts

By default, the Service Accounts page shows only active service accounts. To include disabled service accounts in the list below, select **Disabled**.

Use the search box at the top of the page to filter service accounts. The filter searches name, email, and role fields.

Click on an account to access a detailed side panel view with the following information: 

- Status (active or disabled)
- Created and last modified dates
- Roles
- Application keys
- Permissions

### Create service account

To create a service account, perform the following steps:

1. Click **New Service Account**. A dialog box appears.
2. Enter a name and email address for your service account.
3. Use the **Assign Roles** dropdown menu to choose one or more roles for your service account.
4. To save, click **Create Service Account**.

Unlike the email addresses for Datadog users, service account email addresses do not need to be unique across an organization.

### Edit service account

To modify a service account, click on one in the service accounts list. 

1. In the side panel, click **Edit** next to the service account name. A dialog box appears.
2. Update any fields you would like to change. You can edit the name, email address, status, and roles.
3. Click **Save**.

To disable a service account, the user must have the User Manage Access permission in addition to Service Account Write.

To disable a service account, follow the previous procedure to edit the service account and set the status to **Disabled**.

### Create or revoke application keys

To create or revoke service account application keys, select an account from the service account list. The service account's side panel appears.

To create a new application key, follow the steps below:

- Click **New Key**. A dialog box appears.
- Give the key a descriptive name.
- Click **Create Key**. 

The dialog box refreshes, showing you the key. Copy and paste the key into your desired location. After you close the dialog box, you cannot retrieve the value of the key.

To revoke an application key, find the key in the service account detailed view side panel and hover over it. Pencil and trash can icons appear on the right. Click the trash can to revoke the key. After the key is revoked, click **Confirm**.

### API

See the [Service accounts API reference][3] to use service accounts through the Datadog API.

## Service account application keys

You can view a service account applications key exactly once, immediately after you create it. Limiting the access to the application key prevents any problems that may occur when another user accesses the key. If you lose or forget a service account key, revoke it and create a new one.

## Permissions

By creating a service account, you create an actor that interacts with Datadog on your behalf. Your capabilities on the Service Accounts page vary depending on your Datadog roles and permissions.

Creating a service account requires the Service Account Write permission. The Datadog Admin role includes Service Account Write, so anyone with the Datadog Admin role can create service accounts.

When creating a service account, you can give it any subset of the roles and permissions that you have. The exception is if you have the User Access Manage permission, which effectively gives you administrator access to do anything in Datadog. Datadog accounts with the User Access Manage permission have no restrictions on the roles and permissions they can assign to service accounts.


## Notifications

Datadog sends a notification to the email address associated with the service account when the following actions occur:
- Create an application key
- Revoke an application key
- Disable the service account


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/org_settings/
[2]: https://app.datadoghq.com/organization-settings/service-accounts
[3]: /api/latest/service-accounts/
