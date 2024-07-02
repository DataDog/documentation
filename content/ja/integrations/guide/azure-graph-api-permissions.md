---
title: Microsoft Graph API Permissions for Monitoring Azure
kind: guide
further_reading:
  - link: /integrations/azure/
    tag: Documentation
    text: Datadog-Azure Integration
---

To fetch Azure app registration details, the [Datadog-Azure integration][1] requires access to the [Microsoft Graph API][2], which is queried at the tenant level.

**Note**: On the Azure integration tile in Datadog, if there are several app registrations (client IDs) used for the same tenant, you only need permissions on one app registration.

## セットアップ

1. In your Azure portal, go to the **App registrations** page. Click on the app registration you want to modify.
2. In the left sidebar, under the _Manage_ section, click on **API permissions**. 
3. Click **+ Add a permission**.
4. In the panel that opens, select **Microsoft Graph**.
5. On the next page, select **Application permissions**. Then, under _Select permissions_, search for and enable each of the following permissions. 
   - `Application.Read.All`
   - `Directory.Read.All`
   - `Group.Read.All`
   - `Policy.Read.All`
   - `User.Read.All`

   Click the checkbox on the left, and click the **Add permissions** button at the bottom to add each permission.
   {{< img src="integrations/guide/azure-graph-api-permissions/permission-select-1.png" alt="Panel for adding Microsoft Graph API permissions. 'Application permissions' is selected. Under the 'Select permissions' section, a user has typed in 'Application.Read.All'. In the section below, under 'Application (1)', the Application.Read.All permission appears next to a selected checkbox.">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/azure
[2]: https://learn.microsoft.com/en-us/graph/permissions-reference
