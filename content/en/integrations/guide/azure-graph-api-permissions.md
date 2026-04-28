---
title: Microsoft Graph API Permissions for Monitoring Azure

further_reading:
  - link: "/integrations/azure/"
    tag: "Documentation"
    text: "Datadog-Azure Integration"
---

To fetch Azure app registration details, the [Datadog-Azure integration][1] requires access to the [Microsoft Graph API][2], which is queried at the tenant level.

**Note**: On the Azure integration tile in Datadog, if there are several app registrations (client IDs) used for the same tenant, you only need permissions on one app registration.

## Required permissions

The Datadog-Azure integration requires the following Application permissions on Microsoft Graph:

| Permission | What Datadog reads |
|---|---|
| `Application.Read.All` | App registration metadata (display names and IDs) used to associate Azure resources with their owning applications. |
| `Directory.Read.All` | Tenant directory metadata, including organization details and read-only access to directory objects (users, groups, applications). Used for tenant-level discovery context. |
| `Group.Read.All` | Group identifiers and display names used to associate Azure resources with the groups that own them. |
| `Policy.Read.All` | Identity-related policies in the tenant, such as Conditional Access and sign-in policies. Used for security and compliance context. |
| `User.Read.All` | User identifiers and display names used to associate Azure resources with the users that created or own them. |

## What Datadog does not access

Microsoft Graph permissions such as `Group.Read.All` and `User.Read.All` technically grant access to a wider scope of data than the Datadog-Azure integration uses. The integration does not read:

- Mailbox content, including Office 365 group conversations, email bodies, and calendar items
- Files in OneDrive, SharePoint, or Microsoft Teams
- Message attachments

## Setup

1. In your Azure portal, go to the **App registrations** page. Click on the app registration you want to modify.
2. In the left sidebar, under the _Manage_ section, click on **API permissions**.
3. Click **+ Add a permission**.
4. In the panel that opens, select **Microsoft Graph**.
5. On the next page, select **Application permissions**. Under _Select permissions_, search for and enable each permission listed in [Required permissions](#required-permissions).

   Click the checkbox on the left, and click the **Add permissions** button at the bottom to add each permission.
   {{< img src="integrations/guide/azure-graph-api-permissions/permission-select-1.png" alt="Panel for adding Microsoft Graph API permissions. 'Application permissions' is selected. Under the 'Select permissions' section, a user has typed in 'Application.Read.All'. In the section below, under 'Application (1)', the Application.Read.All permission appears next to a selected checkbox.">}}

## Reviewing for security teams

The questions below address topics that come up during security review of the Datadog-Azure integration.

### Does Datadog read emails or chat content?

No. `Group.Read.All` technically grants access to Microsoft 365 group conversations and shared mailboxes, but the Datadog integration only reads group identifiers and display names. See [What Datadog does not access](#what-datadog-does-not-access) for the full list of data the integration does not read.

### Why is `Group.Read.All` required?

Datadog uses group identifiers to associate Azure resources with the groups that own them, which surfaces ownership context in Datadog dashboards and tags. Microsoft Graph does not provide a more narrowly scoped read-only permission for group identifiers alone.

### Can these permissions be reduced?

The five permissions in [Required permissions](#required-permissions) are the minimum set required for the integration's tenant-level resource discovery and ownership attribution. Removing any permission disables the corresponding feature in Datadog.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/azure
[2]: https://learn.microsoft.com/en-us/graph/permissions-reference
