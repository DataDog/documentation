---
further_reading:
- link: /logs/explorer/
  tag: ドキュメント
  text: ログの調査方法
- link: /logs/guide/reduce_data_transfer_fees
  tag: ガイド
  text: データ転送料金を削減しながら Datadog にログを送信する方法
title: Azure 手動ログ転送のセットアップ
---
## 概要 {#overview}

このガイドを使用して、Azure から任意の Datadog サイトへログ転送を手動でセットアップします。

**注**: Azure Log Analytics ワークスペースからログを収集するには、[自動 ARM テンプレート][1]または [Azure Container App][2] プロセスを使用してください。

<div class="alert alert-info">
2025 年 4 月 30 日以降、Azure は Node.js 18 に対応しなくなります。互換性を確保するため、同じパラメーターで Azure Resource Manager (ARM) テンプレートを使用して更新してください。
</div>

## セットアップ {#setup}

[Azure Container App][4] または [Azure Blob Storage][3] アカウントを介してログを転送できます。

{{< tabs >}}

{{% tab "Container App (推奨)" %}}

1. 下記のボタンをクリックし、Azure ポータルのフォームに入力します。ログを Datadog アカウントに転送するために必要な Azure リソースが Datadog によって自動的にデプロイされます。

[![Azure にデプロイする ](https://aka.ms/deploytoazurebutton)][200]

2. テンプレートのデプロイメントが完了したら、デプロイメント中に作成されたストレージアカウントに Azure プラットフォームログ (リソースログを含む) を送信するように各ログソースの[診断設定][201]をセットアップします。

**注**: リソースは同じ Azure リージョン内のストレージアカウントにのみストリーミングできます。

[200]: https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fforwarder.json/uiFormDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FmanualForwarderUiDefinition.json
[201]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings
{{% /tab %}}

{{% tab "Blob Storage" %}}

1. [Azure Blob Storage][100] をまだセットアップしていない場合は、次のいずれかの方法で開始してください。
   - [Azure ポータル][101]
   - [Azure Storage Explorer][102]
   - [Azure CLI][103]
   - [PowerShell][104]
2. 以下の手順で、Datadog-Azure 関数をセットアップして、Blob Storage からログを転送します。
3. [ログを Blob Storage に転送する][105]ように Azure App Services を構成します。

##### 関数アプリを作成する {#create-a-function-app}

この目的のためにすでに関数アプリを構成している場合は、[Event Hub トリガーテンプレートを使用して関数アプリに新しい関数を追加する](#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template)に進んでください。

1. Azure ポータルで [Function App の概要][106]に移動し、{{< ui >}}Create{{< /ui >}} をクリックします。
2. {{< ui >}}Instance Details{{< /ui >}} セクションで、以下の設定を構成します。
   1. {{< ui >}}Code{{< /ui >}} ラジオボタンを選択します。
   1. {{< ui >}}Runtime stack{{< /ui >}} の場合、`Node.js` を選択します。
   1. {{< ui >}}Version{{< /ui >}} の場合、`18 LTS` を選択します。
   1. {{< ui >}}Operating System{{< /ui >}} の場合、`Windows` を選択します。
3. 必要に応じてその他の設定を行います。
4. {{< ui >}}Review + create{{< /ui >}} をクリックしてリソースを検証します。検証が成功したら、{{< ui >}}Create{{< /ui >}} をクリックします。

##### Azure Blob Storage トリガーテンプレートを使用して新しい関数を関数アプリに追加する {#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template}

1. [Function App の概要][106]から新規または既存の関数アプリを選択します。
2. {{< ui >}}Functions{{< /ui >}} タブで、{{< ui >}}Create{{< /ui >}} をクリックします。
3. {{< ui >}}Development environment{{< /ui >}} フィールドの場合、{{< ui >}}Develop in portal{{< /ui >}} を選択します。
4. {{< ui >}}Select a template{{< /ui >}} で、[Azure Blob ストレージトリガー][107]を選択します。
5. {{< ui >}}Storage account connection{{< /ui >}} を選択します。
   **注**: 詳細は、[Azure ストレージアカウントのコネクション文字列を構成する][108]を参照してください。
6. {{< ui >}}Create{{< /ui >}} をクリックします。

詳細は、[Azure 関数の概要][109]を参照してください。

##### Blob Storage トリガーを Datadog に指定する {#point-your-blob-storage-trigger-to-datadog}

1. Event Hub トリガー関数の詳細ページで、{{< ui >}}Developer{{< /ui >}} サイドメニューの {{< ui >}}Code + Test{{< /ui >}} をクリックします。
2. 関数の `index.js` ファイルに [Datadog-Azure 関数コード][110]を追加します。
3. 環境変数 `DD_API_KEY` で Datadog API キーを追加するか、20 行目の `<DATADOG_API_KEY>` を置き換えて関数コードにコピーします。
4. Datadog US1 サイトを使用していない場合は、関数アプリの構成タブにある `DD_SITE` 環境変数で [Datadog サイト][111]を設定するか、21 行目の関数コードにサイトパラメーターをコピーします。
5. {{< ui >}}Save{{< /ui >}} 関数を保存します。
6.  {{< ui >}}Developer{{< /ui >}} サイドメニューの下の {{< ui >}}Integration{{< /ui >}} をクリックします。
7. {{< ui >}}Trigger and inputs{{< /ui >}} の下の {{< ui >}}Azure Blob Storage{{< /ui >}} をクリックします。
8. {{< ui >}}Blob Parameter Name{{< /ui >}} を `blobContent` に設定し、{{< ui >}}Save{{< /ui >}} をクリックします。
9. このリソースからのログを [Datadog ログエクスプローラー][112]でチェックして、セットアップが正しいことを確認します。


[100]: https://learn.microsoft.com/azure/storage/blobs/
[101]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal
[102]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[103]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-cli
[104]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-powershell
[105]: https://learn.microsoft.com/training/modules/store-app-data-with-azure-blob-storage/
[106]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[107]: https://learn.microsoft.com/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp
[108]: https://learn.microsoft.com/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[109]: https://learn.microsoft.com/azure/azure-functions/functions-get-started
[110]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[111]: https://docs.datadoghq.com/ja/getting_started/site/
[112]: https://app.datadoghq.com/logs
{{% /tab %}}

{{< /tabs >}}

{{% azure-log-archiving %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/guide/azure-automated-log-forwarding/
[2]: /ja/getting_started/integrations/azure/#container-app-log-forwarding-setup
[3]: https://learn.microsoft.com/azure/storage/blobs/
[4]: https://learn.microsoft.com/azure/container-apps/