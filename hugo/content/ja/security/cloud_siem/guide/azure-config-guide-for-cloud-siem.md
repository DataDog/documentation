---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: ドキュメント
  text: Cloud SIEM のデフォルト検出ルールを確認する
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: ドキュメント
  text: セキュリティシグナルエクスプローラーについて学ぶ
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: ドキュメント
  text: カスタム検出ルールを作成する
title: Cloud SIEM の Azure 構成ガイド
---
## 概要 {#overview}

Cloud SIEM は、Datadog で処理されたすべてのログに検出ルールを適用し、標的型攻撃や脅威インテリジェンスに記載された IP がシステムと通信している、あるいは安全でないリソース変更などの脅威を検出します。この脅威は、トリアージするためにセキュリティシグナルエクスプローラーでセキュリティシグナルとして表面化されます。

このガイドでは、Azure Platform のログから脅威の検出を開始できるように、Datadog にログを送信するための Microsoft Azure の構成を説明します。

<div class="alert alert-info">Azure Native インテグレーション (Datadog の US3 サイトでお客様向けに提供) には、異なるログ収集のセットアップ手順があります。Azure Native インテグレーションを使用している場合は、Datadog サイトドロップダウンメニューで <strong>US3</strong> を選択し、<a href="https://docs.datadoghq.com/integrations/guide/azure-native-integration/#log-collection">Microsoft Azure ログ収集</a>の手順に従ってください。</div>

{{< tabs >}}
{{% tab "自動インストール" %}}

下記のボタンをクリックし、Azure ポータルのフォームに入力します。フォームへの入力が完了すると、アクティビティログを Datadog アカウントに送信するために必要な Azure リソースがデプロイされます。

[![Azure にデプロイする](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Frefs%2Fheads%2Fmaster%2Fazure%2Feventhub_log_forwarder%2Fparent_template.json)

1. 既存のリソースグループを選択するか、新規に作成します。
1. リージョンを選択します。
1. **アクティビティログを送信する**は **true** を選択します。
1. Datadog API キーを入力します。
1. リソースの名前を入力します。
1. {{< ui >}}Create + review{{< /ui >}} をクリックします。
1. 検証に成功したら、{{< ui >}}Create{{< /ui >}} をクリックします。

デプロイが正常に完了したら、[ログエクスプローラー][1]に移動し、検索クエリに `service:azure` と入力して Azure ログを表示します。


[1]: https://app.datadoghq.com/logs

{{% /tab %}}

{{% tab "手動インストール" %}}

このセクションでは、Azure Platform のログを Datadog に送信できるように、手動インストールのステップを説明します。

1. [リソースグループを作成する](#create-a-resource-group)
1. [イベントハブネームスペースを作成する](#create-an-event-hubs-namespace)
1. [Azure イベントハブを作成する](#create-an-event-hub)
1. [Azure 関数アプリを作成する](#create-an-azure-function-app)
1. [関数アプリに新しい関数を追加する](#add-a-new-function-to-your-function-app)
1. [Azure サービスのログをイベントハブに転送する](#forward-azure-services-logs-to-event-hub)

### リソースグループを作成する {#create-a-resource-group}

既存のリソースグループを使用する場合は、[イベントハブネームスペースを作成する]に進んでください。

1. [Azure リソースグループ][1]ページに移動します。
1. {{< ui >}}Create{{< /ui >}} をクリックします。
1. リソースグループの名前を入力します。
1. オプションで、タグを追加したい場合は {{< ui >}}Next: Tags{{< /ui >}} をクリックします。
1. {{< ui >}}Review + create{{< /ui >}} をクリックします。
1. 検証に成功したら、{{< ui >}}Create{{< /ui >}} をクリックします。

### イベントハブネームスペースを作成する {#create-an-event-hubs-namespace}

1. [Azure イベントハブ][2]に移動します。
1. {{< ui >}}Create{{< /ui >}} をクリックします。
1. **リソースグループ**ドロップダウンメニューで、イベントハブを追加するリソースグループを選択します。
1. ネームスペースの名前を入力します。
1. ネームスペースの場所を選択します。
     **注**: イベントハブは、ログの送信元となるリソースと同じ場所になければなりません。アクティビティログやその他のアカウント全体のログソースについては、任意のリージョンを選択できます。
1. 価格帯を選択します。
1. スループットユニット (スタンダードティアの場合) またはプロセッシングユニット (プレミアムティアの場合) はそのままにしておいてください。
1. {{< ui >}}Review + create{{< /ui >}} をクリックします。
1. 検証に成功したら、{{< ui >}}Create{{< /ui >}} をクリックします。
1. デプロイが正常に完了したら、{{< ui >}}Go to resource{{< /ui >}} をクリックします。

### イベントハブを作成する {#create-an-event-hub}

1. 先ほど作成したイベントハブネームスペースで、{{< ui >}}\+ Event Hub{{< /ui >}} をクリックします。
1. イベントハブの名前を入力します。
1. オプションで、パーティションカウントと保持オプションを構成します。
1. {{< ui >}}Review + create{{< /ui >}} をクリックします。
1. 検証に成功したら、{{< ui >}}Create{{< /ui >}} をクリックします。

### Azure 関数アプリを作成する {#create-an-azure-function-app}
新しい関数アプリを作成します。既存の関数アプリを使用している場合は、[関数アプリに新しい関数を追加する]に進んでください。

1. [関数アプリ][3]に移動します。
1. {{< ui >}}Create{{< /ui >}} をクリックします。
1. 関数アプリのリソースグループを選択します。
1. 関数アプリの名前を入力します。
1. コードにデプロイする場合は選択のままにします。
1. **ランタイムスタック**ドロップダウンメニューで、{{< ui >}}Node.js{{< /ui >}} を選択します。
1. 関数アプリのリージョンを選択します。
1. オペレーティングシステムとプランタイプを選択します。
1. {{< ui >}}Next: Storage{{< /ui >}} をクリックします。
1. ドロップダウンメニューで、ストレージアカウントを選択します。
1. {{< ui >}}Review + create{{< /ui >}} をクリックします。
1. 検証に成功したら、{{< ui >}}Create{{< /ui >}} をクリックします。
1. デプロイが正常に完了したら、{{< ui >}}Create a function{{< /ui >}} をクリックします。

### 関数アプリに新しい関数を追加する {#add-a-new-function-to-your-function-app}

1. 既存のものを使用している場合は、関数アプリに移動します。左側のメニューで {{< ui >}}Functions{{< /ui >}} をクリックします。
1. {{< ui >}}Create{{< /ui >}} をクリックします。
1. {{< ui >}}Azure Event Hub trigger{{< /ui >}} を選択します。
1. 新しい関数の名前を入力します。
1. **イベントハブコネクション**で、{{< ui >}}New{{< /ui >}} をクリックします。
1. **イベントハブコネクション**ドロップダウンメニューで、先に作成したイベントハブを選択します。
1. {{< ui >}}OK{{< /ui >}} をクリックします。
1. **イベントハブ名**で、先ほど作成したイベントハブの名前を入力します。
1. {{< ui >}}Create{{< /ui >}} をクリックします。

### Datadog Azure 関数を追加する {#add-the-datadog-azure-function}

<br />**注**: 以下の手順は、Azure 関数プログラミングモデル v3 に基づいています。Datadog の最新の [Azure 関数コード][8]は、Azure 関数プログラミングモデル v4 をサポートするように更新されています。v4 互換バージョンのデプロイに関するガイダンスが必要な場合や、v3 と v4 の違いについて質問がある場合は、Datadog テクニカルサポートにお問い合わせください。

1. 新しい関数で、左側のメニューから {{< ui >}}Code + Test{{< /ui >}} を選択します。
1. [Datadog-Azure 関数コード][4]をコピーして `index.js` ファイルに貼り付けます。
1. 関数コードの 22 行目の `<DATADOG_API_KEY>` をお使いの Datadog API に置き換えます。
1. Datadog US1 サイトを使用していない場合は、関数コードの 23 行目で `DD_SITE` を [Datadog サイト][5]パラメーターに置き換えます。
1. {{< ui >}}Save{{< /ui >}} をクリックします。
1. 左側のメニューで {{< ui >}}Integrations{{< /ui >}} をクリックします。
1. {{< ui >}}Azure Event Hubs{{< /ui >}} をクリックします。
1. `Event parameter name` を `eventHubMessages` に設定します。
1. `Event Hub Cardinality`を `Many` に設定する必要があります。
1. `Event Hub Data Type` を空白に設定します。
1. {{< ui >}}Save{{< /ui >}} をクリックします。
1. 関数を実行し、Datadog ログエクスプローラーでテストメッセージをチェックし、設定が正しいことを確認します。テストログイベントは、有効な JSON 形式である必要があります。例:
    ```
    {
        is_test:true,
        name: "Datadog Test"
    }
    ```

### Azure サービスのログをイベントハブに転送する {#forward-azure-services-logs-to-event-hub}

#### アクティビティログをイベントハブに転送する {#forward-activity-logs-to-event-hub}

1. [Azure アクティビティログ][6]に移動します。
1. {{< ui >}}Export Activity Logs{{< /ui >}} をクリックします。
1. {{< ui >}}Add diagnostic settings{{< /ui >}} をクリックします。
1. 診断設定の名前を入力します。
1. Datadog に送信するログのカテゴリーを選択します。
1. {{< ui >}}Stream to an event hub{{< /ui >}} を選択します。
1. 先に作成したイベントハブネームスペースを選択します。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

#### リソースログをイベントハブに転送する {#forward-resource-logs-to-event-hub}

1. リソースログを送信するリソースに移動します。
1. 左側のメニューの**モニター**の下にある {{< ui >}}Diagnostic settings{{< /ui >}} をクリックします。
1. {{< ui >}}Add diagnostic setting{{< /ui >}} をクリックします。
1. 診断設定の名前を入力します。
1. {{< ui >}}allLogs{{< /ui >}} を選択します。
1. **送信先の詳細** セクションで、{{< ui >}}Stream to an event hub{{< /ui >}} を選択します。
1. 先に作成したイベントハブネームスペースを選択します。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

[ログエクスプローラー][7]で検索クエリに `service:azure` と入力し、Azure のログを表示します。

[1]: https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups
[2]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.EventHub%2Fnamespaces
[3]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/aws-dd-forwarder-4.5.0/azure/activity_logs_monitoring/index.js
[5]: https://docs.datadoghq.com/ja/getting_started/site/
[6]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/activityLog
[7]: https://app.datadoghq.com/logs
[8]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js

{{% /tab %}}
{{< /tabs >}}

## Cloud SIEM でセキュリティシグナルをトリアージする {#use-cloud-siem-to-triage-security-signals}

Cloud SIEM は、設定した Azure プラットフォームログを含む、処理されたすべてのログに対して、すぐに検出ルールを適用します。検出ルールで脅威が検出されると、セキュリティシグナルが生成され、セキュリティシグナルエクスプローラーで確認することができます。

- Cloud SIEM シグナルエクスプローラーに移動して、脅威を表示し、トリアージします。詳細については、セキュリティシグナルエクスプローラーを参照してください。
- ログに適用されるすぐに使える検出ルールを参照してください。
- セキュリティシグナル新しいルールを作成し、特定のユースケースにマッチした脅威を検出することができます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}