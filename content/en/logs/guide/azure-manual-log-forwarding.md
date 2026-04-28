---
title: Azure Manual Log Forwarding Setup
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/guide/reduce_data_transfer_fees"
  tag: "Guide"
  text: "How to send logs to Datadog while reducing data transfer fees"
---

## Overview

Use this guide to manually set up log forwarding from Azure to any Datadog site.

**Note**: To collect logs from Azure Log Analytics workspaces, use the [automated ARM template][1] or [Azure Container App][2] process.

## Setup

You can forward your logs through an [Azure Container App][4] or an [Azure Blob Storage][3] account. The Container App path is the recommended setup. Use the Blob Storage path when the log source you want to forward writes only to a Storage Account.

{{< tabs >}}

{{% tab "Container App (recommended)" %}}

1. Click the button below, and fill in the form on the Azure Portal. Datadog automatically deploys the Azure resources required to forward logs into your Datadog account.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)][200]

2. After the template deployment finishes, set up [diagnostic settings][201] for each log source to send Azure platform logs (including resource logs) to the Storage Account created during deployment.

**Note**: Resources can only stream to a Storage Account in the same Azure region.

[200]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fforwarder.json
[201]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings
{{% /tab %}}

{{% tab "Blob Storage" %}}

Use the Blob Storage path when the log source you want to forward writes to a Storage Account rather than to an Event Hub. For example, App Service application logs forwarded to Blob Storage.

The instructions below use the Azure CLI to create the Function App and deploy the [Datadog Blob log forwarder][105]. The CLI path is more stable than the Azure portal path because Azure regularly changes the Function App UI. A portal-based fallback is provided at the end of this section.

<div class="alert alert-info">
<strong>Migrating an existing deployment from Node.js 18:</strong> Azure ended Node.js 18 support on April 30, 2025. If you previously deployed the manual log forwarder on Node.js 18, redeploy your Function App on Node.js 20 LTS or later. Follow the steps below.
</div>

##### Prerequisites

- The [Azure CLI][100] (`az`) installed locally, or use the [Azure Cloud Shell][101].
- A source Storage Account that holds the logs you want to forward. To create one, see [Create a storage account][102]. To send App Service logs to Blob Storage, see [Configure App Service logs][103].
- Your [Datadog API key][104].

##### Set up the Datadog Blob log forwarder with the Azure CLI

1. Sign in and select your subscription:

   {{< code-block lang="bash" >}}
az login
az account set --subscription <SUBSCRIPTION_ID>
   {{< /code-block >}}

2. Set environment variables for the resources to be created. Replace the placeholders with your own values:

   {{< code-block lang="bash" >}}
RESOURCE_GROUP=<RESOURCE_GROUP_NAME>
LOCATION=<AZURE_REGION>
STORAGE_ACCOUNT=<STORAGE_ACCOUNT_FOR_FUNCTION_APP_RUNTIME>
FUNCTION_APP=<FUNCTION_APP_NAME>
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE=<DATADOG_SITE>
   {{< /code-block >}}

   For valid `DD_SITE` values, see [Datadog sites][106]. The Storage Account in this step is for the Function App's runtime state. It is separate from the source Storage Account that holds your logs.

3. Create the resource group and the Function App's runtime Storage Account:

   {{< code-block lang="bash" >}}
az group create --name $RESOURCE_GROUP --location $LOCATION
az storage account create --name $STORAGE_ACCOUNT --resource-group $RESOURCE_GROUP --location $LOCATION --sku Standard_LRS
   {{< /code-block >}}

4. Create the Function App on Node.js 20 LTS with the Functions v4 runtime:

   {{< code-block lang="bash" >}}
az functionapp create \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --consumption-plan-location $LOCATION \
  --runtime node \
  --runtime-version 20 \
  --functions-version 4 \
  --storage-account $STORAGE_ACCOUNT \
  --os-type Windows
   {{< /code-block >}}

5. Set the Datadog environment variables on the Function App:

   {{< code-block lang="bash" >}}
az functionapp config appsettings set \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --settings DD_API_KEY=$DD_API_KEY DD_SITE=$DD_SITE
   {{< /code-block >}}

6. Download the [Datadog Blob log forwarder code][105], update the Blob trigger binding to point at your source Storage Account container, and deploy:

   {{< code-block lang="bash" >}}
git clone --depth 1 https://github.com/DataDog/datadog-serverless-functions.git
cd datadog-serverless-functions/azure/blobs_logs_monitoring
   {{< /code-block >}}

   Edit `function.json` to set the `path` and `connection` values to the source container and a connection name you define in the next step. See [Azure Blob storage trigger for Azure Functions][107] for the binding reference.

7. Add the source Storage Account connection string to the Function App, then deploy the function:

   {{< code-block lang="bash" >}}
SOURCE_CONNECTION=$(az storage account show-connection-string \
  --name <SOURCE_STORAGE_ACCOUNT> \
  --resource-group <SOURCE_RESOURCE_GROUP> \
  --query connectionString -o tsv)

az functionapp config appsettings set \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --settings <CONNECTION_NAME>=$SOURCE_CONNECTION

zip function.zip index.js function.json
az functionapp deployment source config-zip \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --src function.zip
   {{< /code-block >}}

   Replace `<CONNECTION_NAME>` with the connection name you set in `function.json`.

8. Verify the setup by checking the [Datadog Log Explorer][108] for logs from the source Storage Account.

##### Logs not appearing in Datadog

If you completed the setup but do not see logs in Datadog:

1. **Verify blobs are being written.** In the Azure portal, open the source Storage Account, then **Containers**, and confirm that new blobs are arriving in the expected container.
2. **Verify the Function App is invoking.** Open the Function App, then **Functions**, then the blob-trigger function, then **Invocations**. Recent invocations confirm the trigger is firing.
3. **Verify the Function App can read the source container.** The connection string referenced in `function.json` must grant at least the **Storage Blob Data Reader** role on the source container.
4. **Check the Function App logs for errors.** Open **Functions**, then the function, then **Monitor**, then **Logs**. Errors from the Datadog forwarder script appear here.
5. **Confirm `DD_API_KEY` and `DD_SITE` are set correctly.** A wrong site value causes silent ingestion failures because logs are sent to the wrong Datadog region.
6. **Confirm region alignment.** A Storage Account's diagnostic settings can only target Storage Accounts in the same Azure region.

##### Set up using the Azure portal (fallback)

The Azure portal Function App UI changes frequently. Use this path only if the CLI path is not available, and adapt the steps to whatever the current portal version exposes.

1. In the Azure portal, navigate to **Function App** and click **Create**.
2. Configure the runtime stack as **Node.js**, version **20 LTS** or later, with operating system **Windows**.
3. Complete the create flow.
4. After the Function App is created, deploy the [Datadog Blob log forwarder code][105] to it using one of:
   - The [Azure Functions extension for VS Code][109]
   - The [Azure Functions Core Tools CLI][110] (`func azure functionapp publish`)
5. On the Function App, set the application settings `DD_API_KEY` and `DD_SITE`, and add the source Storage Account connection string under the connection name referenced in `function.json`.
6. Confirm the Blob storage trigger points at the container that holds the logs you want to forward.

[100]: https://learn.microsoft.com/cli/azure/install-azure-cli
[101]: https://learn.microsoft.com/azure/cloud-shell/overview
[102]: https://learn.microsoft.com/azure/storage/common/storage-account-create
[103]: https://learn.microsoft.com/azure/app-service/troubleshoot-diagnostic-logs
[104]: https://app.datadoghq.com/organization-settings/api-keys
[105]: https://github.com/DataDog/datadog-serverless-functions/tree/master/azure/blobs_logs_monitoring
[106]: /getting_started/site/
[107]: https://learn.microsoft.com/azure/azure-functions/functions-bindings-storage-blob-trigger
[108]: https://app.datadoghq.com/logs
[109]: https://learn.microsoft.com/azure/azure-functions/create-first-function-vs-code-node
[110]: https://learn.microsoft.com/azure/azure-functions/functions-run-local
{{% /tab %}}

{{< /tabs >}}

{{% azure-log-archiving %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/guide/azure-automated-log-forwarding/
[2]: /getting_started/integrations/azure/#container-app-log-forwarding-setup
[3]: https://learn.microsoft.com/azure/storage/blobs/
[4]: https://learn.microsoft.com/azure/container-apps/
