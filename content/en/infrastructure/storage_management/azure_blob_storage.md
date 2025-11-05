---
title: Storage Management for Microsoft Azure Blob Storage
further_reading:
    - link: "https://www.datadoghq.com/blog/datadog-storage-monitoring/"
      tag: "Blog"
      text: "Optimize and troubleshoot cloud storage at scale with Storage Monitoring"
    - link: "https://www.datadoghq.com/blog/storage-monitoring-recommendations/"
      tag: "Blog"
      text: "Reduce cloud storage costs and improve operational efficiency with Datadog Storage Monitoring"
aliases:
    - /integrations/guide/storage-monitoring-setup/#setup-for-azure-blob-storage
---

{{< callout url="https://www.datadoghq.com/product-preview/storage-monitoring/" >}}
  Storage Management is in Preview. Request access to start monitoring your object storage.
{{< /callout >}}

## Setup

{{< tabs >}}
{{% tab "Azure CLI" %}}

Enable inventories for the selected storage accounts in each subscription by running the following script in your [Azure Cloud Shell][301]:

```shell
curl https://datadogstoragemonitoring.blob.core.windows.net/scripts/install.sh \
  | bash -s -- <CLIENT_ID> <SUBSCRIPTION_ID> <COMMA_SEPARATED_STORAGE_ACCOUNT_NAMES>
```

Before running the script, set your [shell environment][302] to Bash and replace the various placeholder inputs with the correct values:
- `<CLIENT_ID>`: The client ID of an App Registration already set up using the [Datadog Azure integration][302]
- `<SUBSCRIPTION_ID>`: The subscription ID of the Azure subscription containing the storage accounts
- `<COMMA_SEPARATED_STORAGE_ACCOUNT_NAMES>`: A comma-separated list of the storage accounts you want to monitor (for example, `storageaccount1,storageaccount2`)

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

{{% /tab %}}
{{< /tabs >}}

### Post-Installation

After you finish with the above steps, fill out the [post-setup form][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://forms.gle/WXFbGyBwWfEo3gbM7