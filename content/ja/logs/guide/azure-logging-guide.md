---
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
title: Azure ログを Datadog に送信
---

## 概要

このガイドを使用して、Azure サブスクリプションから Datadog へのロギングを設定します。

Datadog では、Azure から Datadog へログを送信するには、Agent または DaemonSet を使うことを推奨しています。一部のリソースではできない場合があります。その場合、Azure Event Hub を使いログ転送パイプラインを作成し、[Azure プラットフォームログ][2]を収集することができます。Azure プラットフォームログを Event Hub にストリーミングできないリソースには、Blob Storage 転送オプションを使用できます。

**全サイト**: すべての Datadog サイトは、このページの手順を使用して、Azure ログを Datadog に送信することができます。

**US3**: 組織が Datadog US3 サイト上にある場合、Azure Native インテグレーションを使用して、Azure ログ転送の構成を簡素化することができます。Datadog では、可能な限りこの方法を使用することを推奨しています。構成は、[Azure の Datadog リソース][5]を通じて行います。これは、ログ転送のための Azure Event Hub プロセスを置き換えます。詳細は [Azure Native ロギングガイド][4]を参照してください。

{{< tabs >}}

{{% tab "自動インストール" %}}

開始するには、以下のボタンをクリックし、Azure Portal のフォームに入力します。Datadog アカウントにアクティビティログをストリーミングするために必要な Azure リソースが、自動的にデプロイされます。

[![Azure にデプロイ](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Fmaster%2Fazure%2Fdeploy-to-azure%2Fparent_template.json)

あるいは、Datadog は、Azure アクティビティログと Azure プラットフォームログ (リソースログを含む) の送信に使用できる自動化スクリプトを提供しています。

### Azure アクティビティログ

以下の手順に従って、アクティビティログを Datadog アカウントにストリーミングするために必要な Azure リソースを作成および構成するスクリプトを実行します。これらのリソースには、アクティビティログの診断設定、Azure Functions、Event Hub ネームスペース、および Event Hub が含まれます。

1. Azure ポータルで、**Cloud Shell** に移動します。

{{< img src="integrations/azure/azure_cloud_shell.png" alt="azure cloud shell" popup="true" style="width:100%">}}

2. 以下のコマンドを実行して、自動化スクリプトを Cloud Shell 環境にダウンロードします。

{{< code-block lang="powershell" filename="アクティビティログステップ 1" >}}

(New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1", "activity_logs_deploy.ps1")

{{< /code-block >}}

[スクリプトの内容を表示する](https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1)こともできます。

3. 以下のコマンドを実行し、**`<API_KEY>`** を [Datadog API トークン](https://app.datadoghq.com/organization-settings/api-keys)に、**`<SUBSCRIPTION_ID>`** を Azure サブスクリプション ID に置き換えてスクリプトを起動します。[Optional Parameters](#optional-parameters) を追加して、デプロイを構成します。

{{< code-block lang="powershell" filename="アクティビティログステップ 2" >}}

./activity_logs_deploy.ps1 -ApiKey <API_KEY> -SubscriptionId <SUBSCRIPTION_ID> 

{{< /code-block >}}

### Azure プラットフォームログ

Azure プラットフォームのログ (リソースログを含む) を送信するには、Event Hub とログフォワーダー関数のペアをデプロイします。
デプロイ後、ログを Datadog にストリーミングするために、各ログソースの診断設定を作成します。

1. Azure ポータルで、**Cloud Shell** に移動します。

2. 以下の Powershell コマンドを実行して、自動化スクリプトを Cloud Shell 環境にダウンロードします。

   {{< code-block lang="powershell" filename="プラットフォームログステップ 1" >}}

   (New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/resource_deploy.ps1", "resource_deploy.ps1")

   {{< /code-block >}}

   [スクリプトの内容を表示する](https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/resource_deploy.ps1)こともできます。

3. 以下の Powershell コマンドを実行し、**`<API_KEY>`** を [Datadog API トークン](https://app.datadoghq.com/organization-settings/api-keys)に、**`<SUBSCRIPTION_ID>`** を Azure サブスクリプション ID に置き換えてスクリプトを起動します。また、その他のオプションのパラメーターを追加して、デプロイを構成することもできます。[Optional Parameters](#optional-parameters) を参照してください。

   {{< code-block lang="powershell" filename="プラットフォームログステップ 2" >}}

   ./resource_deploy.ps1 -ApiKey <API_KEY> -SubscriptionId <SUBSCRIPTION_ID> 

   {{< /code-block >}}

4. Datadog にログを送信するすべての Azure リソースの診断設定を作成します。これらの診断設定を構成して、作成したばかりの Event Hub へストリーミングします。

プラットフォームログパイプライン用にデプロイされたすべての Azure リソースには、デフォルト名に追加された ResourceGroup-Location が含まれています。例: `datadog-eventhub-westus`。ただし、パラメーターをオーバーライドすれば、この規則を変更できます。

**注**: リソースは同じ Azure リージョン内の Event Hub にのみストリーミングできるため、リソースログをストリーミングするリージョンごとにステップ 2 を繰り返す必要があります。

### アクティビティログとリソースログの設定

アクティビティログとリソースログの両方をストリーミングするには、オプションのパラメーター `-ResourceGroupLocation 1` を含む最初のスクリプトを実行します。アクティビティログはサブスクリプションレベルのソースなので、どのリージョンでもパイプラインを作成できます。これがデプロイされたら、`westus` でリソースに診断設定を追加して、同じイベントハブを通してリソースログを送信します。

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

インストールでエラーが発生した場合は、[自動ログ収集][1]でよくあるエラーケースを参照してください。

[1]: /ja/integrations/guide/azure-troubleshooting/#automated-log-collection
{{% /tab %}}

{{% tab "手動インストール" %}}

Azure から Datadog にログを送信するには、以下の手順に従ってください。

1. [Azure Event Hub][1] を作成。
2. Datadog-Azure [関数を Event Hub トリガー][2]でセットアップし、Datadog へログを転送します。
3. [診断設定][3]を作成し、Azure サービスが Event Hub へログをストリーミングするように構成する。

以下の手順では、Azure Portal を使用した基本的な初期設定について説明します。手順はすべて、Azure ドキュメントを参照し、CLI、Powershell、リソーステンプレートで実行できます。

#### Azure Event Hub

[Azure Event Hub][1] を作成：

以下の手順に従って、新しいネームスペースを作成するか、既存のネームスペースに新しいイベントハブを追加します。

1. Azure ポータルで、**Event Hubs** 概要に移動し、**Create** をクリックします。
2. 名前、価格帯、サブスクリプション、リソースグループを入力します。
3. 場所を選択します。**注**: Event Hub とログの送信元となるリソースは同じ場所になければなりません。アクティビティログや他のアカウント全体のログソースは、その限りではありません。
4. スループット単位、アベイラビリティーゾーン、および自動インフレに必要なオプションを選択します。
5. **作成**をクリックします。

イベントハブをイベントハブネームスペースに追加します。

1. Azure ポータルで、新規または既存のネームスペースに移動します。
2. **+ Event Hub** をクリックします。
3. 名前、パーティション数、およびメッセージ保持に必要なオプションを選択します。
4. **作成**をクリックします。

#### Datadog Azure 関数

Datadog-Azure [関数を Event Hub トリガー][2]でセットアップし、Datadog へログを転送します。

新しい関数アプリを作成するか、既存の関数アプリを使用して、次のセクションにスキップします。

1. Azure ポータルで、**Function Apps** 概要に移動し、**Create** をクリックします。
2. サブスクリプション、リソースグループ、地域を選択し、関数アプリの名前を入力します。
3. **Publish to Code, Runtime stack to Node.js, and Version to 18 LTS** を選択します。
4. オペレーティングシステムとプランタイプを選択します。
5. **Next:Hosting** をクリックします。
6. ストレージアカウントを選択します。
7. 確認し、新しい関数アプリを作成します。
8. デプロイが完了するのを待ちます。

イベントハブトリガーテンプレートを使用して、関数アプリに新しい関数を追加します。

1. 関数アプリリストから新規/既存の関数アプリを選択します。
2. 関数メニューから **Functions** を選択し、**Create** をクリックします。
3. テンプレートメニューから [Azure イベントハブトリガー][2]を選択します。
4. **Event Hub connection** で、ネームスペースとイベントハブを選択します。
5. **作成**をクリックします。

イベントハブトリガーを Datadog にポイントします。

1. 関数ビューから新しいイベントハブトリガーを選択します。
2. 開発者側メニューの **Code + Test** をクリックします。
3. [Datadog-Azure 関数コード][4]を index.js ファイルに追加します。
4. 関数アプリのコンフィギュレーションタブで `DD_API_KEY` 環境変数を作成して API キーを追加するか、22 行目の `<DATADOG_API_KEY>` を置き換えて関数コードにコピーします。
5. Datadog US1 サイトを使用していない場合は、関数アプリの構成タブにある環境変数 `DD_SITE` で [Datadog サイト][7]を設定するか、23 行目の関数コードにサイトパラメーターをコピーしてください。
6. 関数を保存します。
7. トリガーの **Integration** をクリックしてから **Azure Event Hubs** をクリックし、次の設定を確認します。
    a. Event Parameter Name が `eventHubMessages` に設定されている。
    b. Event Hub Cardinality が `Many` に設定されている。
    c. Event Hub Data Type が空のままになっている。
8. **保存**をクリックします。
9. 関数を実行し、[Datadog ログエクスプローラー][6]でテストメッセージをチェックし、設定が正しいことを確認します。
**注**: テストログイベントは、有効な JSON 形式である必要があります。

#### アクティビティログ

1. Azure ポータルで、**Activity Log** に移動します。
2. **Diagnostic Settings** をクリックします。
3. **Add diagnostic setting** をクリックします。
4. カテゴリの詳細で、Datadog に送るログのカテゴリを選択します。
5. 送信先情報で、**Stream to an event hub** を選択します。
6. イベントハブのネームスペースと名前を設定します。これらは、ネームスペーストリガーの作成に使用したネームスペースネームのスペースおよび名前と一致する必要があります。
7. 共有アクセスキーを設定します。このキーは送信アクセスまたは管理アクセスで構成しなければなりません。
8. **保存**をクリックします。
9. [Datadog ログエクスプローラー][6]でこのリソースからのログをチェックして、正しくセットアップできたことを確認します。

#### リソースログ

[診断設定][3]を作成し、Azure サービスが Event Hub へログを転送するように構成する。

1. Azure ポータルで、Datadog に送るログのリソースへ移動します。
2. リソースブレードの監視セクションで、**Diagnostic settings** をクリックします。
3. **Add diagnostic setting** をクリックします。
4. カテゴリの詳細で、Datadog に送るログのカテゴリを選択します。
5. 送信先情報で、**Stream to an event hub** を選択します。
6. イベントハブのネームスペースと名前を設定します。これらは、ネームスペーストリガーの作成に使用したネームスペースネームのスペースおよび名前と一致する必要があります。
7. 共有アクセスキーを設定します。このキーは送信アクセスまたは管理アクセスで構成しなければなりません。
8. **保存**をクリックします。
9. [Datadog ログエクスプローラー][6]でこのリソースからのログをチェックして、正しくセットアップできたことを確認します。

[1]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create
[2]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs-trigger
[3]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/logs
[7]: https://docs.datadoghq.com/ja/getting_started/site/

{{% /tab %}}

{{% tab "Blob Storage" %}}

Datadog では、Azure ログ収集に Event Hub セットアップを使用することを推奨しています。ただし、以下の手順に従って、Blob ストレージからすべての Azure App Services ログを転送することもできます。

1. [Azure ポータル][2]、[Azure ストレージエクスプローラー][3]、[Azure CLI][4]、または [Powershell][5] から [Azure BLOB ストレージ][1]をセットアップします。
2. Blob ストレージから Datadog へログを転送する [Datadog-Azure 関数](#create-a-new-azure-blob-storage-function)をセットアップします。
3. [ログを Blob ストレージに転送する][6] Azure App Service を構成します。

#### 新しい Azure Blob ストレージ関数を作成する

Azure 関数に馴染みのない方は、[Azure 関数入門][7]をご覧ください。

1. [Azure ポータル][2]で、**Function Apps** 概要に移動し、**Create** をクリックします。
2. サブスクリプション、リソースグループ、地域を選択し、関数アプリの名前を入力します。
3. **Publish to Code, Runtime stack to Node.js, and Version to 18 LTS** を選択します。
4. オペレーティングシステム **Windows** とプランタイプを選択します。
5. **Next:Hosting** をクリックします。
6. ストレージアカウントを選択します。
7. 確認し、新しい関数を **Create** します。
8. デプロイが完了したら、関数アプリリストから新しい関数を選択します。
9. 関数を**ポータル内**で構築するように選択し、Blog Storage トリガーテンプレートを使用します (**More templates…** の下)。プロンプトが表示されたら、`Microsoft.Azure.WebJobs.Extensions.EventHubs` 拡張機能をインストールします。
10. **Storage account connection** を選択するか追加し、**Create** を作成します。
11. `index.js` ファイルを作成し、[Datadog-Azure 関数コード][8]を追加します (`<DATADOG_API_KEY>` はご使用の [Datadog API キー][9]に置き換えます)。
12. 関数を保存します。
13. **統合**で、**BLOB パラメーター名**を `blobContent` に設定し、**保存**をクリックします。
14. [Datadog ログエクスプローラー][10]でログをチェックして、正しくセットアップできたことを確認します。

[1]: https://azure.microsoft.com/en-us/services/storage/blobs/
[2]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[4]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli
[5]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-powershell
[6]: https://docs.microsoft.com/en-us/learn/modules/store-app-data-with-azure-blob-storage/
[7]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function
[8]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://app.datadoghq.com/logs

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