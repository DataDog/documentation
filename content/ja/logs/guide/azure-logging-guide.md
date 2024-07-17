---
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
kind: documentation
title: Azure ログを Datadog に送信
---

## 概要

このガイドを使用して、Azure サブスクリプションから Datadog へのロギングを設定します。

Datadog は、Azure から Datadog へログを送信するのに Agent または DaemonSet を使うことを推奨しています。一部のリソースではできない場合があります。その場合、Azure Event Hub を使いログ転送パイプラインを作成し、[Azure プラットフォームログ][2]を収集することができます。Azure プラットフォームログを Event Hub にストリーミングできないリソースには、Blob Storage 転送オプションを使用できます。

**全サイト**: すべての Datadog サイトは、このページの手順を使用して、Azure ログを Datadog に送信することができます。

**US3**: 組織が Datadog US3 サイト上にある場合、Azure Native インテグレーションを使用して、Azure ログ転送の構成を簡素化することができます。Datadog では、可能な限りこの方法を使用することを推奨しています。構成は、[Azure の Datadog リソース][5]を通じて行います。これは、ログ転送のための Azure Event Hub プロセスを置き換えます。詳細は [Azure Native Logging Guide][4] を参照してください。

{{< tabs >}}

{{% tab "自動インストール" %}}

開始するには、以下のボタンをクリックし、Azure Portal のフォームに入力します。Datadog アカウントにアクティビティログをストリーミングするために必要な Azure リソースが、自動的にデプロイされます。

[![Azure にデプロイ](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Fmaster%2Fazure%2Fdeploy-to-azure%2Fparent_template.json)

あるいは、Datadog は、Azure アクティビティログと Azure プラットフォームログ (リソースログを含む) の送信に使用できる自動化スクリプトを提供しています。

### Azure アクティビティログ

以下の手順に従って、アクティビティ ログを Datadog アカウントにストリーミングするために必要な Azure リソースを作成および構成するスクリプトを実行します。これらのリソースには、アクティビティログの診断設定、Azure Functions、Event Hub ネームスペース、Event Hub が含まれます。

1. Azure ポータルで、**Cloud Shell** に移動します。

{{< img src="integrations/azure/azure_cloud_shell.png" alt="azure cloud shell" popup="true" style="width:100%">}}

2. 以下のコマンドを実行して、自動化スクリプトを Cloud Shell 環境にダウンロードします。

{{< code-block lang="powershell" filename="アクティビティログステップ 1" >}}

(New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1", "activity_logs_deploy.ps1")

{{< /code-block >}}

[スクリプトの内容を表示する](https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1)こともできます。

3. 以下のコマンドを実行し、**`<API_KEY>`** を [Datadog API トークン](https://app.datadoghq.com/organization-settings/api-keys)に、**`<SUBSCRIPTION_ID>`** を Azure サブスクリプション ID に置き換えてスクリプトを起動します。[オプションパラメーター](#optional-parameters)を追加して、デプロイを構成します。

{{< code-block lang="powershell" filename="アクティビティログステップ 2" >}}

./activity_logs_deploy.ps1 -ApiKey <API_KEY> -SubscriptionId <SUBSCRIPTION_ID> 

{{< /code-block >}}

### Azure プラットフォームログ

Azure プラットフォームのログ (リソースログを含む) を送信するには、Event Hub とログ転送機能のペアをデプロイします。
デプロイ後、ログを Datadog にストリーミングするために、各ログソースの診断設定を作成します。

1. Azure ポータルで、**Cloud Shell** に移動します。

2. 以下の Powershell コマンドを実行して、自動化スクリプトを Cloud Shell 環境にダウンロードします。

   {{< code-block lang="powershell" filename="プラットフォームログステップ 1" >}}

   (New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/resource_deploy.ps1", "resource_deploy.ps1")

   {{< /code-block >}}

   [スクリプトの内容を表示する](https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/resource_deploy.ps1)こともできます。

3. 以下の Powershell コマンドを実行し、**`<API_KEY>`** を [Datadog API トークン](https://app.datadoghq.com/organization-settings/api-keys)に、**`<SUBSCRIPTION_ID>`** を Azure サブスクリプション ID に置き換えてスクリプトを起動します。その他のオプションパラメーターを追加して、デプロイを構成することもできます。[オプションパラメーター](#optional-parameters)を参照してください。

   {{< code-block lang="powershell" filename="プラットフォームログステップ 2" >}}

   ./resource_deploy.ps1 -ApiKey <API_KEY> -SubscriptionId <SUBSCRIPTION_ID> 

   {{< /code-block >}}

4. Datadog にログを送信するすべての Azure リソースの診断設定を作成します。これらの診断設定を構成して、作成したばかりの Event Hub へのストリーミングします。

プラットフォームログパイプライン用にデプロイされたすべての Azure リソースには、デフォルト名に追加された ResourceGroup-Location が含まれています。例: `datadog-eventhub-westus`。ただし、パラメーターをオーバーライドすれば、この規則を変更できます。

**注**: リソースは同じ Azure リージョン内の Event Hub にのみストリーミングできるため、リソースログをストリーミングするリージョンごとにステップ 2 を繰り返す必要があります。

### アクティビティログとリソースログの設定

アクティビティログとリソースログの両方をストリーミングするには、オプションのパラメーター `-ResourceGroupLocation <REGION>` を含む最初のスクリプトを実行します。アクティビティログはサブスクリプションレベルのソースなので、どのリージョンでもパイプラインを作成できます。これがデプロイされたら、`-westus` でリソースに診断設定を追加して、同じイベントハブを通してリソースログを送信します。

**注**: このインテグレーションは、イベントを収集しません。

### オプションパラメーター

**注**: 以下のパラメーターをカスタマイズするときは、カスタムリソース名が一意であることを確認してください。リソース名が他の Azure リソースのリスト内にまだ存在していないことを確認します。

| -Flag `<Default Parameter>`                                         | 説明                                                                                                                                                           |
|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -DatadogSite `<datadoghq.com>`                                      | このフラグを別の Datadog サイトを使用してパラメーターとして追加して、Datadog インスタンスをカスタマイズします。Datadog サイト: {{< region-param key="dd_site" code="true" >}}    |
| -Environment `<AzureCloud>`                                         | このフラグをパラメーターとして追加して、Azure 独立クラウドのストレージを管理します。追加のオプションは、`AzureChinaCloud`、`AzureGermanCloud`、`AzureUSGovernment` です。 |
| -ResourceGroupLocation `<westus2>`                                  | 更新された Azure-region を使用してこのフラグを追加することにより、Azure リソースグループとリソースがデプロイされるリージョンを選択できます。                     |
| -ResourceGroupName `<datadog-log-forwarder-rg>`                     | 更新されたパラメーターを使用してこのフラグを追加することにより、Azure リソースグループの名前をカスタマイズします。                                                                        |
| -EventhubNamespace `<datadog-ns-4c6c53b4-1abd-4798-987a-c8e671a5c25e>` | 更新済みのパラメーターでこのフラグを追加し、Azure Event Hub の名前空間をカスタマイズします。デフォルトで、`datadog-ns-<globally-unique-ID>` が生成されています。                              |
| -EventhubName `<datadog-eventhub>`                                  | 更新されたパラメーターを使用してこのフラグを追加することにより、Azure Event Hub の名前をカスタマイズします。                                                                             |
| -FunctionAppName `<datadog-functionapp-1435ad2f-7c1f-470c-a4df-bc7289d8b249>`                            | 更新済みのパラメーターでこのフラグを追加し、Azure 関数の名前をカスタマイズします。デフォルトで、`datadog-functionapp-<globally-unique-ID>` が生成されています。                                                                         |
| -FunctionName `<datadog-function>`                                  | 更新されたパラメーターを使用してこのフラグを追加することにより、Azure Function の名前をカスタマイズします。                                                                              |
| -DiagnosticSettingName `<datadog-activity-logs-diagnostic-setting>` | 更新されたパラメーターを使用してこのフラグを追加することにより、Azure 診断設定の名前をカスタマイズします。**(アクティビティログの送信にのみ関連)**                      |

インストールでエラーが発生した場合は、よくあるエラーケースについて、[自動ログ収集][1]を参照してください。

[101]: /ja/integrations/guide/azure-troubleshooting/#automated-log-collection
{{% /tab %}}

{{% tab "手動インストール" %}}

This section describes the manual setup process to forward your Azure logs to Datadog:

1. Create an [Azure Event Hub](#create-an-azure-event-hub).
2. Set up the [Datadog-Azure function with an Event hub trigger](#create-the-datadog-azure-function) to forward logs to Datadog.
3. Create [diagnostic settings](#create-diagnostic-settings) to forward your Azure [Activity logs](#activity-logs), [resource logs](#resource-logs), or both to your Event Hub.

以下の手順では、Azure Portal を使用した基本的な初期設定について説明します。手順はすべて、Azure ドキュメントを参照し、CLI、Powershell、リソーステンプレートで実行できます。

#### Create an Azure Event Hub

##### Event Hubs ネームスペースの作成

If you already have an Event Hubs namespace configured with an Event Hub connection string, skip to [Add an Event Hub to your Event Hubs namespace](#add-an-event-hub-to-your-event-hubs-namespace).

1. In the Azure portal, navigate to the [Event Hubs][208] overview and click **Create**.
2. Fill in the **Project Details** and **Instance Details** sections as desired.  
  **Note**: If you plan to collect [Azure resource logs][209], the Event Hub must be in the same **Location** as the resource you want to collect logs from. For activity logs or other account-wide log sources, you can choose any region.
3. Click **Review + create** to validate the resource. If validation is successful, click **Create**.

See the [Azure Event Hubs Quickstart][201] for additional information.

##### Add an Event Hub to your Event Hubs namespace

1. In the Azure portal, navigate to your new or existing Event Hubs namespace.
2. **+ Event Hub** をクリックします。
3. Configure the **Basics** and **Capture** tabs as desired.
4. Click **Review + create** to validate the resource. If validation is successful, click **Create**.

##### Configure shared access

1. In the detail page of your Event Hub, click **Shared access policies** under the **Settings** tab to the left.
2. **+ Add** をクリックします。
3. Provide a policy name and select **Listen**.
4. Copy the **Connection string-primary key** value and keep it somewhere safe. This is needed to allow the Datadog-Azure function to communicate with the Event Hub.

{{< img src="integrations/azure/eventhub_connection_string.png" alt="The connection string primary-key value of an event hub's shared access policy" popup="true" style="width:100%">}}

#### Create the Datadog-Azure function

##### Create a function app

If you already have a function app configured with an Event Hub connection string, skip to [Add a new function to your Function App using the Event Hub trigger template](#add-a-new-function-to-your-function-app-using-the-event-hub-trigger-template).

1. In the Azure portal, navigate to the [Function App overview][211] and click **Create**.
2. In the **Instance Details** section, configure the following settings:
   a. Select the **Code** radio button
   b. For **Runtime stack**, select `Node.js` 
   c. For **Version**, select `18 LTS`.
3. Configure other settings as desired.
4. Click **Review + create** to validate the resource. If validation is successful, click **Create**.

See [Azure Event Hubs trigger for Azure Functions][202] for more information.

##### Configure your function app with the Event Hub connection string

1. In the detail page of your function app, click **Environment variables** under the **Settings** tab to the left.
2. In the **App settings** tab, provide a name for the connection string.
3. Paste the value obtained earlier from the [Configure shared access section](#configure-shared-access).
4. **Apply** をクリックします。

**Note**: If you don't want to paste your Datadog API key value directly into the function's code, create an additional environment variable for the Datadog API key value.

##### Add a new function to your Function App using the Event Hub trigger template

1. Select your new or existing function app from the [Function App overview][211].
2. Under the **Functions** tab, click **Create**. 
3. For the **Development environment** field, select **Develop in portal**.
3. Under **Select a template**, choose [Azure Event Hub trigger][202].
4. **Event Hub connection** で、ネームスペースとイベントハブを選択します。
5. Click **Create**.

See [Getting started with Azure functions][215] for more information.

##### Point your Event Hub trigger to Datadog

1. On the detail page of your Event Hub trigger function, click **Code + Test** under the **Developer** side menu.
2. Add the [Datadog-Azure Function code][204] to the function's `index.js` file.
3. Add your Datadog API key through a `DD_API_KEY` environment variable, or copy it into the function code by replacing `<DATADOG_API_KEY>` on line 21.  
4. If you're not using the Datadog US1 site, set your [Datadog site][207] with a `DD_SITE` environment variable under the configuration tab of your function app, or copy the site parameter into the function code on line 22.
5. **Save** the function.
6. Click **Integration** under the **Developer** side menu.
7. Click **Azure Event Hubs** under **Trigger and inputs**.
8. Confirm the following settings are in place:  
  a. **Event hub connection** is set to the name of your connection string environment variable.  
  b. **Event parameter name** is set to `eventHubMessages`.  
  c. **Event hub name** is set to the name of your Event Hub.  
  d. **Event hub cardinality** is set to `Many`.  
  e. **Event hub data type** is left empty.  
9. To validate your setup, click **Code + Test** under the **Developer** side menu.
10. Click **Test/Run** and enter a test message in valid JSON format. 
11. Find your test message in the [Datadog Log Explorer][206].  

#### Create diagnostic settings

##### アクティビティログ

1. In the Azure portal, navigate to the [Activity log][212].
2. **Export Activity Logs** をクリックします。
3. Click **+ Add diagnostic setting**.
4. Under **Categories**, select the categories of logs you want to send to Datadog.
5. Under **Destination details**, select **Stream to an event hub**.
6. Set the **Event hub namespace** and **Event hub name** with the names of the Event Hub namespace and Event Hub name, respectively, that were used to create your Event Hub trigger.
7. For **Event hub policy name**, you can select `RootManageSharedAccessKey` if desired. **Optionally**, create your own shared access policy at the Event Hub **namespace** level:  
  a. In the Event Hub **namespace**, click **Shared access policies** under the **Settings** tab to the left.  
  b. Click **+ Add**.  
  c. Provide a policy name and select **Send** or **Manage**.  
  d. Click **Save**.  
  e. Return to the diagnostic setting page and select your shared access policy for the **Event hub policy name** field. You may need to refresh the page.  
  **Note**: See [Authorizing access to Event Hubs resources using Shared Access Signatures][214] for more information.  
8. Verify your setup is correct by checking the [Datadog Log Explorer][206] for your activity logs.

See [Diagnostic settings in Azure monitor][213] for more information.

##### リソースログ

Configure your Azure resources to forward their logs to the Event Hub with a [diagnostic setting][203].

1. In the Azure portal, navigate to the resource that you want to forward logs to Datadog.
2. In the **Monitoring** section of the resource blade, click **Diagnostic settings**.
3. **Add diagnostic setting** をクリックします。
4. Provide a name and select the sources of the data you want to forward..
5. Under **Destination details**, select **Stream to an event hub**.
6. Set the **Event hub namespace** and **Event hub name** with the names of the Event Hub namespace and Event Hub name, respectively, that were used to create your Event Hub trigger.
7. For **Event hub policy name**, you can select `RootManageSharedAccessKey` if desired. **Optionally**, create your own shared access policy at the Event Hub **namespace** level:  
  a. In the Event Hub **namespace**, click **Shared access policies** under the **Settings** tab to the left.  
  b. Click **+ Add**.  
  c. Provide a policy name and select **Send** or **Manage**.  
  d. Click **Save**.  
  e. Return to the diagnostic setting page and select your shared access policy for the **Event hub policy name** field. You may need to refresh the page.  
  **Note**: See [Authorizing access to Event Hubs resources using Shared Access Signatures][214] for more information.  
8. **Save** をクリックします。
9. Verify your setup is correct by checking the [Datadog Log Explorer][206] for logs from this resource.

See [Diagnostic settings in Azure monitor][213] for more information.

[201]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create
[202]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs-trigger
[203]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings
[204]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[205]: https://app.datadoghq.com/organization-settings/api-keys
[206]: https://app.datadoghq.com/logs
[207]: https://docs.datadoghq.com/ja/getting_started/site/
[208]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.EventHub%2Fnamespaces
[209]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/tutorial-resource-logs
[210]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function
[211]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[212]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/activityLog
[213]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?WT.mc_id=Portal-Microsoft_Azure_Monitoring
[214]: https://learn.microsoft.com/en-us/azure/event-hubs/authorize-access-shared-access-signature
[215]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-get-started
{{% /tab %}}

{{% tab "Blob Storage" %}}

{{% site-region region="us3,us5,gov,ap1" %}}
<div class="alert alert-warning">
  Datadog {{< region-param key="dd_site_name" >}} サイトではサポートされていません。
</div>
{{% /site-region %}}

Datadog recommends using the Event Hub setup for Azure log collection. However, you can also follow the steps in this section to forward all of your Azure App Services logs from Azure Blob Storage:

1. If you haven't already set up [Azure Blob Storage][301], use one of the following methods to get started: 
   - [Azure portal][302]
   - [Azure Storage Explorer][303]
   - [Azure CLI][304]
   - [Powershell][305]
2. Set up the Datadog-Azure Function to forward logs from Blob Storage using the instructions below.
3. Configure your Azure App Services to [forward their logs to Blob Storage][306].

##### Create a function app

If you already have a function app configured for this purpose, skip to [Add a new function to your Function App using the Event Hub trigger template](#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template).

1. In the Azure portal, navigate to the [Function App overview][309] and click **Create**.
2. In the **Instance Details** section, configure the following settings:  
  a. Select the **Code** radio button  
  b. For **Runtime stack**, select `Node.js`  
  c. For **Version**, select `18 LTS`.  
  d. For **Operating System**, select `Windows`.  
3. Configure other settings as desired.
4. Click **Review + create** to validate the resource. If validation is successful, click **Create**.

##### Add a new function to your Function App using the Azure Blob Storage trigger template

1. Select your new or existing function app from the [Function App overview][309].
2. Under the **Functions** tab, click **Create**. 
3. For the **Development environment** field, select **Develop in portal**.
4. Under **Select a template**, choose [Azure Blob storage trigger][313].
5. Select your **Storage account connection**.
   **Note**: See [Configure a connection string for an Azure storage account][311] for more information.
6. Click **Create**.

See [Getting started with Azure Functions][307] for more information.

##### Point your Blob Storage trigger to Datadog

1. On the detail page of your Event Hub trigger function, click **Code + Test** under the **Developer** side menu.
2. Add the [Datadog-Azure Function code][308] to the function's `index.js` file.
3. Add your Datadog API key with a `DD_API_KEY` environment variable, or copy it into the function code by replacing `<DATADOG_API_KEY>` on line 20.  
4. If you're not using the Datadog US1 site, set your [Datadog site][312] with a `DD_SITE` environment variable under the configuration tab of your function app, or copy the site parameter into the function code on line 21.
5. **Save** the function.
6. Click **Integration** under the **Developer** side menu.
7. Click **Azure Blob Storage** under **Trigger and inputs**.
8. Set the **Blob Parameter Name** to `blobContent` and click **Save**.
9. Verify your setup is correct by checking the [Datadog Log Explorer][310] for logs from this resource.

[301]: https://azure.microsoft.com/en-us/services/storage/blobs/
[302]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal
[303]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[304]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli
[305]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-powershell
[306]: https://learn.microsoft.com/en-us/training/modules/store-app-data-with-azure-blob-storage/
[307]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-get-started
[308]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[309]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[310]: https://app.datadoghq.com/logs
[311]: https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[312]: https://docs.datadoghq.com/ja/getting_started/site/
[313]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp
{{% /tab %}}
{{< /tabs >}}

## ログアーカイブ

Azure Native インテグレーションを使用している場合でも、Azure Blob Storage にログをアーカイブするには、App Registration が必要です。Azure Blob Storage にログをアーカイブするには、設定手順に従って、App Registration を使用してインテグレーションを構成します。アーカイブ目的で作成された App Registration には、`Monitoring Reader` ロールを割り当てる必要はありません。

App Registration を構成したら、Azure Blob Storage に書き込む[ログアーカイブを作成][3]することができます。

**注**: ストレージバケットが Azure Native インテグレーションで監視されているサブスクリプションにある場合、Azure Integration Tile に App Registration が冗長である旨の警告が表示されます。この警告は無視することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/platform-logs-overview
[3]: /ja/logs/log_configuration/archives/
[4]: /ja/logs/guide/azure-native-logging-guide/
[5]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview