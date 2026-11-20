---
title: Storage Management for Microsoft Azure Blob Storage
further_reading:
    - link: "https://www.datadoghq.com/blog/datadog-storage-monitoring/"
      tag: "Blog"
      text: "Optimize and troubleshoot cloud storage at scale with Storage Monitoring"
    - link: "https://www.datadoghq.com/blog/storage-monitoring-recommendations/"
      tag: "Blog"
      text: "Reduce cloud storage costs and improve operational efficiency with Datadog Storage Monitoring"
---

{{< callout url="https://www.datadoghq.com/product-preview/storage-monitoring/" >}}
  Storage Management is in Preview. Request access to start monitoring your object storage.
{{< /callout >}}

## Setup

<div class="alert alert-info">Azure Marketplace integration is not supported with Storage Management. You must use an <a href="/integrations/azure">App Registration</a> to connect Azure to Datadog.</div>

{{< tabs >}}

{{% tab "Azure CLI" %}}

1. Go to **Storage Management** > **Azure Blob Storage** > [**Enable buckets**][304].
2. Select the storage accounts you want to enable for Storage Management.
3. Run the CLI commands in your [Azure Cloud Shell][301] generated at the bottom of the table. Before running the script, set your shell environment to Bash. 
4. After running the script, click **Confirm** and wait 24-48 hours for Storage Management metrics to become available.

[301]: https://shell.azure.com
[302]: /integrations/azure/#setup
[303]: https://learn.microsoft.com/en-us/azure/cloud-shell/get-started/classic?tabs=azurecli#select-your-shell-environment
[304]: https://app.datadoghq.com/storage-management?mConfigure=true&mView=azure

{{% /tab %}}

{{% tab "Azure Portal" %}}

For each storage account you want to monitor, follow these steps:

{{% collapse-content title="1. Create a blob inventory policy" level="h4" expanded=false id="azure-portal-step1" %}}

1. In the Azure portal, navigate to your Storage Account.
2. Go to **Data management** > **Blob inventory**.
3. Click **Add**.
4. Configure the policy:
   - Name: **datadog-storage-monitoring**
   - Destination container:
      - Click **Create new**, and enter the name `datadog-storage-monitoring`.
   - Object type to inventory: **Blob**
   - Schedule: **Daily**
   - Blob types: Select **Block blobs**, **Append blobs**, and **Page blobs**.
   - Subtypes: Select **Include blob versions**
   - Schema fields: Select All, or ensure that at least the following are selected:
      - **Name**
      - **Access tier**
      - **Last modified**
      - **Content length**
      - **Server encrypted**
      - **Current version status**
      - **Version ID**
   - Exclude prefix: datadog-storage-monitoring
5. Click **Add**.

{{% /collapse-content %}}

{{% collapse-content title="2. Add the role assignment" level="h4" expanded=false id="azure-portal-step2" %}}

1. In the Azure portal, navigate to your Storage Account.
2. Go to **Data storage** > **Containers**.
3. Click on the **datadog-storage-monitoring** container.
4. Click on **Access control (IAM)** in the left-hand menu.
5. Click **Add** > **Add role assignment**.
6. Fill out the role assignment:
    - Role: Select **Storage Blob Data Reader**. Click **Next**.
    - Assign access to: **User, group, or service principal**.
    - Members: Click **+ Select members** and search for your App Registration by its name and select it.
    - **Note**: This should be an App Registration set up in the Datadog Azure integration. Keep in mind the Client ID for later.
7.  Click **Review + assign**.

{{% /collapse-content %}}

### Enable storage accounts in Datadog

After you configure the blob inventory policy and role assignment, enable each storage account in Datadog. Use either the Datadog UI or the API.

#### Datadog UI

Go to **Datadog** > **Storage Management** > **Azure Blob Storage** > [**Enable buckets**][401]. Select the storage accounts you enabled inventory on and click **Confirm**.

#### API

Register each storage account with Storage Management by calling the [Enable Storage Management for a bucket][402] endpoint. The App Registration must be connected to Datadog through the [Azure integration][403].

Before running the following `curl` command, set these environment variables:
- `DD_SITE`: Your [Datadog site][404], {{< region-param key="dd_site" code="true" >}}. To show the value for a different site, use the site selector on this page.
- `DD_API_KEY`: A Datadog [API key][405].
- `DD_APP_KEY`: A Datadog [application key][406] with the **Cloud Inventory Write** [permission][407].

```bash
curl -X PUT "https://api.${DD_SITE}/api/v2/cloudinventoryservice/syncconfigs" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "data": {
      "id": "azure",
      "type": "cloud_provider",
      "attributes": {
        "azure": {
          "client_id": "<CLIENT_ID>",
          "tenant_id": "<TENANT_ID>",
          "subscription_id": "<SUBSCRIPTION_ID>",
          "resource_group": "<RESOURCE_GROUP>",
          "storage_account": "<STORAGE_ACCOUNT>",
          "container": "<INVENTORY_CONTAINER>"
        }
      }
    }
  }'
```

To use the preceding `curl` command:
- Replace `<CLIENT_ID>` with the **Application (client) ID** of the App Registration that has the **Storage Blob Data Reader** role on the inventory container.
- Replace `<TENANT_ID>` with the **Directory (tenant) ID** of that App Registration.
- Replace `<SUBSCRIPTION_ID>` with the ID of the Azure subscription that contains the storage account.
- Replace `<RESOURCE_GROUP>` with the name of the resource group that contains the storage account.
- Replace `<STORAGE_ACCOUNT>` with the name of the storage account the blob inventory policy is configured on.
- Replace `<INVENTORY_CONTAINER>` with the name of the destination container for the blob inventory reports, for example, `datadog-storage-monitoring`. Datadog reads inventory reports from the entire container.

All fields are required. Make one request per storage account. A `200` response confirms that Storage Management is enabled for the storage account.

[401]: https://app.datadoghq.com/storage-management?mConfigure=true&mView=azure
[402]: /api/latest/storage-management/#enable-storage-management-for-a-bucket
[403]: /integrations/azure/#setup
[404]: /getting_started/site/
[405]: /account_management/api-app-keys/#api-keys
[406]: /account_management/api-app-keys/#application-keys
[407]: /account_management/rbac/permissions/

{{% /tab %}}
{{< /tabs >}}

### Validation

To verify your setup:
1. Wait for the first inventory report to generate. Storage Management metrics can take 24-48 hours to become available.
2. Navigate to **Infrastructure** > [**Storage Management**][1], select **Monitored buckets**, and confirm that the storage accounts you configured appear in the explorer list.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/storage-management
