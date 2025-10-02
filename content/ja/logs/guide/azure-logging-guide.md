---
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
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

 | -Flag `<Default Parameter>`                                                   | 説明                                                                                                                                                                          |
 |-------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | -DatadogSite `<datadoghq.com>`                                                | このフラグを別の Datadog サイトを使用してパラメーターとして追加して、Datadog インスタンスをカスタマイズします。Datadog サイト: {{< region-param key="dd_site" code="true" >}} |
 | -Environment `<AzureCloud>`                                                   | このフラグをパラメーターとして追加して、Azure 独立クラウドのストレージを管理します。追加のオプションは、`AzureChinaCloud`、`AzureGermanCloud`、`AzureUSGovernment` です。     |
 | -ResourceGroupLocation `<westus2>`                                            | 更新された Azure-region を使用してこのフラグを追加することにより、Azure リソースグループとリソースがデプロイされるリージョンを選択できます。                                  |
 | -ResourceGroupName `<datadog-log-forwarder-rg>`                               | 更新されたパラメーターを使用してこのフラグを追加することにより、Azure リソースグループの名前をカスタマイズします。                                                            |
 | -EventhubNamespace `<datadog-ns-4c6c53b4-1abd-4798-987a-c8e671a5c25e>`        | 更新済みのパラメーターでこのフラグを追加し、Azure Event Hub の名前空間をカスタマイズします。デフォルトで、`datadog-ns-<globally-unique-ID>` が生成されています。              |
 | -EventhubName `<datadog-eventhub>`                                            | 更新されたパラメーターを使用してこのフラグを追加することにより、Azure Event Hub の名前をカスタマイズします。                                                                  |
 | -FunctionAppName `<datadog-functionapp-1435ad2f-7c1f-470c-a4df-bc7289d8b249>` | 更新済みのパラメーターでこのフラグを追加し、Azure 関数の名前をカスタマイズします。デフォルトで、`datadog-functionapp-<globally-unique-ID>` が生成されています。               |
 | -FunctionName `<datadog-function>`                                            | 更新されたパラメーターを使用してこのフラグを追加することにより、Azure Function の名前をカスタマイズします。                                                                   |
 | -DiagnosticSettingName `<datadog-activity-logs-diagnostic-setting>`           | 更新されたパラメーターを使用してこのフラグを追加することにより、Azure 診断設定の名前をカスタマイズします。**(アクティビティログの送信にのみ関連)**                            |

インストールでエラーが発生した場合は、よくあるエラーケースについて、[自動ログ収集][1]を参照してください。

[101]: /ja/integrations/guide/azure-troubleshooting/#automated-log-collection
{{% /tab %}}

{{% tab "Blob Storage" %}}

{{% site-region region="us3,us5,gov,ap1" %}}
<div class="alert alert-warning">
  Datadog {{< region-param key="dd_site_name" >}} サイトではサポートされていません。
</div>
{{% /site-region %}}

Datadog は、Azure ログ収集に Event Hub セットアップを使用することを推奨します。ただし、このセクションの手順に従って、Azure Blob Storage からすべての Azure App Services ログを転送することもできます。

1. [Azure Blob Storage][301] をまだセットアップしていない場合は、次のいずれかの方法で開始してください。
   - [Azure ポータル][302]
   - [Azure Storage Explorer][303]
   - [Azure CLI][304]
   - [Powershell][305]
2. 以下の手順で、Datadog-Azure 関数をセットアップして、Blob Storage からログを転送します。
3. [ログを Blob Storage に転送する][306]ようにAzure App Services を構成します。

##### 関数アプリを作成

この目的のためにすでに関数アプリを構成している場合は、[Event Hub トリガーテンプレートを使用して関数アプリに新しい関数を追加](#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template)に進んでください。

1. Azure ポータルで [Function App overview][309] に移動し、**Create** をクリックします。
2. **Instance Details** セクションで、以下の設定を構成します。
  a. **Code** ラジオボタンを選択します。
  b. **Runtime stack** では、`Node.js` を選択します。
  c. **Version** では、`18 LTS` を選択します。
  d. **Operating System** では、`Windows` を選択します。
3. その他の設定は必要に応じて行ってください。
4. **Review + create** をクリックしてリソースを検証します。検証が成功したら、**Create** をクリックします。

##### Azure Blob Storage トリガーテンプレートを使用して新しい関数を関数アプリに追加

1. [Function App overview][309] から新規または既存の関数アプリを選択します。
2. **Functions** タブで、**Create** をクリックします。
3. **Development environment** フィールドで、**Develop in portal** を選択します。
4. **Select a template** で、[Azure Blob storage trigger][313] を選択します。
5. **Storage account connection** を選択します。
   **注**: 詳細は、[Azure ストレージアカウントの接続文字列を構成][311]を参照してください。
6. **Create** をクリックします。

詳細は、[Azure 関数の概要][307]を参照してください。

##### Blob Storage トリガーを Datadog に指定

1. Event Hub トリガー関数の詳細ページで、**Developer** サイドメニューの **Code + Test** をクリックします。
2. 関数の `index.js` ファイルに [Datadog-Azure 関数コード][308]を追加します。
3. 環境変数 `DD_API_KEY` で Datadog API キーを追加するか、20 行目の `<DATADOG_API_KEY>` を置き換えて関数コードにコピーします。
4. Datadog US1 サイトを使用していない場合は、関数アプリの構成タブにある `DD_SITE` 環境変数で [Datadog サイト][312]を設定するか、21 行目の関数コードにサイトパラメーターをコピーします。
5. 関数を保存します。
6. **Developer** サイドメニューの **Integration** をクリックします。
7. **Trigger and inputs** の下にある **Azure Blob Storage** をクリックします。
8. **Blob Parameter Name** を `blobContent` に設定し、**Save** をクリックします。
9. このリソースからのログを [Datadog Log Explorer][310] で確認して、セットアップが正しいことを確認します。

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
