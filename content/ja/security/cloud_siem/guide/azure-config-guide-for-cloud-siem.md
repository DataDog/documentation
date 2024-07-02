---
title: Azure Configuration Guide for Cloud SIEM
further_reading:
- link: "/security/default_rules/#cat-cloud-siem-log-detection"
  tag: Documentation
  text: Explore Cloud SIEM default detection rules
- link: /security/cloud_siem/investigate_security_signals
  tag: Documentation
  text: Learn about the Security Signals Explorer
- link: /security/cloud_siem/log_detection_rules/
  tag: Documentation
  text: Create new detection rules
---

## 概要

Cloud SIEM は、Datadog で処理されたすべてのログに検出ルールを適用し、標的型攻撃や脅威インテリジェンスに記載された IP がシステムと通信している、あるいは安全でないリソース変更などの脅威を検出します。この脅威は、トリアージするためにセキュリティシグナルエクスプローラーでセキュリティシグナルとして表面化されます。

このガイドでは、Azure Platform のログから脅威の検出を開始できるように、Datadog にログを送信するための Microsoft Azure の構成を説明します。

<div class="alert alert-info">Azure Native インテグレーション (Datadog の US3 サイトのお客様向け) には、ログ収集の設定手順が異なります。Azure Native インテグレーションを使用する場合は、Datadog サイトドロップダウンメニューで <strong>US3</strong> を選択し、<a href="https://docs.datadoghq.com/logs/guide/azure-native-logging-guide/">Microsoft Azure ログ収集</a>の指示に従ってください。</div>

{{< tabs >}}
{{% tab "自動インストール" %}}

下のボタンをクリックし、Azure ポータルのフォームに記入してください。フォームを完了すると、アクティビティログを Datadog アカウントに送信するために必要な Azure リソースが、お客様のためにデプロイされます。

[![Azure にデプロイ](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Fmaster%2Fazure%2Fdeploy-to-azure%2Fparent_template.json)

1. 既存のリソースグループを選択するか、新規に作成します。
1. リージョンを選択します。
1. **Send Activity Logs** は **true** を選択します。
1. Datadog API キーを入力します。
1. リソースの名前を入力します。詳しくは、[オプションパラメーター][1]をご覧ください。
1. **Create + review** をクリックします。
1. 検証後、**Create** をクリックします。

デプロイが正常に完了したら、[ログエクスプローラー][2]で検索クエリに `service:azure` と入力し、Azure のログを表示します。

[1]: /logs/guide/azure-logging-guide/?tab=automatedinstallation#optional-parameters
[2]: https://app.datadoghq.com/logs

{{% /tab %}}

{{% tab "手動インストール" %}}

このセクションでは、Azure Platform のログを Datadog に送信できるように、手動インストールのステップを説明します。

1. [リソースグループの作成](#create-a-resource-group)
1. [Event Hubs ネームスペースの作成](#create-an-event-hubs-namespace)
1. [Azure イベントハブの作成](#create-an-event-hub)
1. [Azure Function アプリの作成](#create-an-azure-function-app)
1. [Function アプリに新しい関数を追加する](#add-a-new-function-to-your-function-app)
1. [Azure サービスのログをイベントハブに転送する](#forward-azure-services-logs-to-event-hub)

### リソースグループの作成

既存のリソースグループを使用する場合は、Event Hubs ネームスペースの作成に進んでください。

1. [Azure Resource groups][1] ページに移動します。
1. **作成**をクリックします。
1. リソースグループの名前を入力します。
1. オプションで、タグを追加したい場合は、**Next: Tags** をクリックします。
1. **Review + create** をクリックします。
1. 検証後、**Create** をクリックします。

### Event Hubs ネームスペースの作成

1. [Azure Event Hubs][2] に移動します。
1. **作成**をクリックします。
1. **Resource group** ドロップダウンメニューで、Event Hub を追加するリソースグループを選択します。
1. ネームスペースの名前を入力します。
1. ネームスペースの場所を選択します。
   **注**: Event Hub とログの送信元となるリソースは同じ場所になければなりません。アクティビティログや他のアカウント全体のログソースは、その限りではありません。
1. 価格帯を選択します。
1. スループットユニット (スタンダードティアの場合) またはプロセッシングユニット (プレミアムティアの場合) はそのままにしておいてください。
1. **Review + create** をクリックします。
1. 検証に成功したら、**Create** をクリックします。
1. デプロイが正常に完了したら、**Go to resource** をクリックします。

### イベントハブの作成

1. 先ほど作成した Event Hubs ネームスペースで、**+ Event Hub** をクリックします。
1. イベントハブの名前を入力します。
1. オプションで、パーティションカウントと保持オプションを構成します。
1. **Review + create** をクリックします。
1. 検証に成功したら、**Create** をクリックします。

### Azure Function アプリの作成
新しい Function アプリを作成します。既存の関数アプリを使用している場合は、Function アプリに新しい関数を追加するに進んでください。

1. [Function アプリ][3]に移動します。
1. **作成**をクリックします。
1. 関数アプリのリソースグループを選択します。
1. 関数アプリの名前を入力します。
1. コードにデプロイする場合は選択のままにしてください。
1. **Runtime stack** ドロップダウンメニューで、**Node.js** を選択します。
1. 関数アプリのリージョンを選択します。
1. オペレーティングシステムとプランタイプを選択します。
1. **Next: Storage** をクリックします。
1. ドロップダウンメニューで、ストレージアカウントを選択します。
1. **Review + create** をクリックします。
1. 検証に成功したら、**Create** をクリックします。
1. デプロイが正常に完了したら、**Create a function** をクリックします。

### Function アプリに新しい関数を追加する

1. 既存のものを使用している場合は、関数アプリに移動します。左サイドメニューの ** Functions** をクリックします。
1. **作成**をクリックします。
1. **Azure Event Hub trigger** を選択します。
1. 新しい関数の名前を入力します。
1. **Event Hub connection** で、**New** をクリックします。
1. **Event Hub connection** ドロップダウンメニューで、先に作成したイベントハブを選択します。
1. **OK** をクリックします。
1. **Event Hub name** には、先ほど作成したイベントハブの名前を入力します。
1. **作成**をクリックします。

### Datadog Azure 関数を追加する

1. 新しい関数で、左側のメニューから **Code + Test** を選択します。
1. [Datadog-Azure 関数コード][4]をコピーして `index.js` ファイルに貼り付けてください。
1. 関数コードの 22 行目の `<DATADOG_API_KEY>` をお使いの Datadog API に置き換えてください。
1. Datadog US1 サイトを使用していない場合は、関数コードの 23 行目で `DD_SITE` を [Datadog サイト][5]パラメーターに置き換えてください。
1. **Save** をクリックします。
1. 左サイドメニューの **Integrations** をクリックします。
1. **Azure Event Hubs** をクリックします。
1. `Event parameter name` を `eventHubMessages` に設定します
1. `Event Hub Cardinality` は、`Many` に設定する必要があります。
1. `Event Hub Data Type` を empty に設定します。
1. **Save** をクリックします。
1. 関数を実行し、Datadog ログエクスプローラーでテストメッセージをチェックし、設定が正しいことを確認します。テストログイベントは、有効な JSON 形式である必要があります。例:
    ```
    {
        is_test:true,
        name: "Datadog Test"
    }
    ```

### Azure サービスのログを Event Hub に転送する

#### Activity ログを Event Hub に転送する

1. [Azure Activity ログ][6]に移動します。
1. **Export Activity Logs** をクリックします。
1. **Add diagnostic settings** をクリックします。
1. 診断設定の名前を入力します。
1. Datadog に送信するログのカテゴリーを選択します。
1. **Stream to an event hub** を選択します。
1. 先に作成したイベントハブネームスペースを選択します。
1. **Save** をクリックします。

#### リソースログを Event Hub に転送する

1. リソースログを送信するリソースに移動します。
1. 左サイドメニューの **Monitor** の下にある、**Diagnostic settings** をクリックします。
1. **Add diagnostic setting** をクリックします。
1. 診断設定の名前を入力します。
1. **allLogs** を選択します。
1. **Destination details** セクションで、**Stream to an event hub** を選択します。
1. 先に作成したイベントハブネームスペースを選択します。
1. **Save** をクリックします。

[ログエクスプローラー][7]で検索クエリに `service:azure` と入力し、Azure のログを表示します。

[1]: https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups
[2]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.EventHub%2Fnamespaces
[3]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[5]: https://docs.datadoghq.com/getting_started/site/
[6]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/activityLog
[7]: https://app.datadoghq.com/logs

{{% /tab %}}
{{< /tabs >}}

## Cloud SIEM でセキュリティシグナルのトリアージを行う

Cloud SIEM は、設定した Azure Platform ログを含む、処理されたすべてのログに対して、すぐに検出ルールを適用します。検出ルールで脅威が検出されると、セキュリティシグナルが生成され、セキュリティシグナルエクスプローラーで確認することができます。

- Cloud SIEM シグナルエクスプローラーにアクセスして、脅威の表示とトリアージを行います。詳細はセキュリティシグナルエクスプローラーをご覧ください。
- ログに適用されるすぐに使える検出ルールをご覧ください。
- 新しいルールを作成し、特定のユースケースにマッチした脅威を検出することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
