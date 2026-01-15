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

{{< tabs >}}

{{% tab "Azure CLI" %}}

1. Go to **Storage Management** > **Azure Blob Storage** > **Enable buckets**.
2. Select the storage accounts you want to enable for Storage Management.
3. Run the CLI commands in your [Azure Cloud Shell][301] generated at the bottom of the table. Before running the script, set your shell environment to Bash. 
4. After running the script, click **Confirm** and wait 24-48 hours for Storage Management metrics to become available.

[301]: https://shell.azure.com
[302]: /integrations/azure/#setup
[303]: https://learn.microsoft.com/en-us/azure/cloud-shell/get-started/classic?tabs=azurecli#select-your-shell-environment
{{% /tab %}}

{{% tab "Azure Portal" %}}

For Each Storage Account you wish to monitor, follow all of the steps here:

### Create a blob inventory policy
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

### Add the role assignment
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
8.  Go to **Datadog** -> **Storage Management** > **Azure Blob Storage** > **Enable buckets**. Select the storage accounts you enabled inventory on and click **Confirm**.

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
