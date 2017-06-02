---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-OpsGenie Integration
integration_title: OpsGenie
kind: integration
doclevel:
---

<!-- <style>
.class {
  padding-bottom: 5px;
}
</style> -->

<!-- ## Overview
{:#int-overview}

Create alerts using @opsgenie:

- From your event stream
- By taking a snapshot
- When a metric alert is triggered -->

### 概要
{:#int-overview}

OpenGineインテグレーションを使用すると、`@opengenie:`を使ってOpengenieへアラートを送信できます:

- Datadogのイベントストリームへコメントを書き込む時
- グラフのスナップショットを撮った時 (メッセージ欄)
- メトリクスを基にした、アラートが発生した時　(通知メッセージ欄)


<!-- ### Configuration
{:#int-configuration}

#### Create a Datadog integration in OpsGenie

1. Log in to your OpsGenie account and go to the [OpsGenie Integrations](https://www.opsgenie.com/integration/index) page.
2. As seen below, filter for Datadog and click on the tile.
        <img src="/static/images/opsgenie-int-index.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:10px;" />
3. Enter your Datadog API key from the [Integrations > APIs page](https://app.datadoghq.com/account/settings#api) in the dedicated field. The key looks like this:
        <img src="/static/images/where-is-dd-key.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:10px;" />
4. Choose the recipients in OpsGenie and set up your filters.
5. Change the name of the integration if necessary.
6. Save the configuration.
7. Copy the red key and the name. You will use this in Datadog.
        <img src="/static/images/opsgenie-add-api-key.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:10px;" />
8. Add more DataDog integrations on OpsGenie by going to the [OpsGenie Integration](https://www.opsgenie.com/integration/index) page and repeating the steps above.

#### List the integration(s) you made in OpsGenie in Datadog

1. In Datadog, select the OpsGenie tile on <a href="https://app.datadoghq.com/account/settings">Account Integrations</a>.

2. In the dialog box that pops up, click on the Configuration tab.

3. Paste the key(s) provided for each Datadog integration (created in OpsGenie) in the **"Datadog Integration Key"** field, and enter the **"Datadog Integration Name"**.

<img src="/static/images/datadog-add-opsgenie-key.png" style="width:100% border:1px #777777;padding-top:15px;" />

### How to Use Datadog and OpsGenie Together

#### Create, acknowledge and close  OpsGenie alerts from Datadog

Create an OpsGenie alert by putting @opsgenie-service_name or @opsgenie in the **Say What’s Happening** field, section 5, in the Edit Metric Alert. When this alert is triggered in Datadog, an alert will be sent to the recipients in your OpsGenie service.

<img src="/static/images/og_metric_alert.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:20px;" />

Acknowledge or close OpsGenie alerts from Datadog using @opsgenie-acknowledge or @opsgenie-close mentions in the Comments field of an OpsGenie event in Datadog.

<img src="/static/images/dd_ack_og_alert.png" style="width:100% border:1px #777777;padding-bottom:10px;" />

#### Receive, acknowledge and close Datadog alerts created by OpsGenie

Set-up alerts in OpsGenie. When that alert is triggered, an event will be created in Datadog. The tags and description field from the OpsGenie alert will be carried over to Datadog.

<img src="/static/images/og_create_alert_dd_updated.png" style="width:100% border:1px #777777;padding-bottom:10px;" />

Acknowledge and close OpsGenie alerts from OpsGenie. When you do this, the associated event in Datadog will be updated with the username of the person who closed this alert.

<img src="/static/images/og_closed_dd_updated.png" style="width:100% border:1px #777777;padding-bottom:10px;" /> -->

### 設定
{:#int-configuration}

#### OpsGenie側でDatadogインテグレーションを作成する

1. OpsGenieアカウントにログインし、[OpsGenie Integrations](https://www.opsgenie.com/integration/index) ページに移動します。
2. 以下の図のようにDatadogのサービスインテグレーションを検索します。
        <img src="/static/images/opsgenie-int-index.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:10px;" />
3. Datadogサイトの[Integrations > APIs page](https://app.datadoghq.com/account/settings#api)で生成したAPI keyを入力します。
        <img src="/static/images/where-is-dd-key.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:10px;" />
4. OpsGenie内での受信者を選択し、フィルタを設定します。
5. 必要に応じてのDatadog側に表示するインテグレーションの名前を変更します。
6. 設定を保存します。
7. 以下に赤色で表示されているOpsGenie側のAPI keyとステップ4で決めたインテグレーション名をコピーします。
        <img src="/static/images/opsgenie-add-api-key.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:10px;" />
8. 更に別のDatadogインテグレーションを[OpsGenie Integration](https://www.opsgenie.com/integration/index)に追加する場合は、ステップ2からステップ7を繰り返します。

#### OpsGenie側で作成したインテグレーションをDatadog側に追加していきます

1. Datadog側の[`Integrations`](https://app.datadoghq.com/account/settings)ページから、OpsGenieのタイルを選択します。

2. ポップアップの中で、`Configuration`タブを選択します。

3. OpsGenie側で作成したDatadogインテグレーションのAPI keyと名前を、**"Datadog Integration Key"** 欄と　**"Datadog Integration Name"** 欄へ入力します。

<img src="/static/images/datadog-add-opsgenie-key.png" style="width:100% border:1px #777777;padding-top:15px;" />

### DatadogとOpsGenieを連携して使う方法

#### DatadogからOpsGenieアラートを作成、承認、クローズする方法

Datadog側のMonitor設定のセクション5 **Say What’s Happening** の部分に @opsgenie-service_name や @opsgenie とメッセージに送信先を書き、OpsGenieへのアラートを作成していきます。Datadog側でこのアラートが動作した際に、OpsGenie側の受診者に通知が送られます。

<img src="/static/images/og_metric_alert.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:20px;" />

Datadog側からOpsGenieに通知したアラートを承認やクローズするには、 DatadogのイベントストリームのOpsGenieの該当するイベントに @opsgenie-acknowledge や @opsgenie-close を付けてコメントを書き込みます。

<img src="/static/images/dd_ack_og_alert.png" style="width:100% border:1px #777777;padding-bottom:10px;" />

#### Receive, acknowledge and close Datadog alerts created by OpsGenie

次の画像は、OpsGenie側でアラートが動作した際に表示したい内容を設定する画面です。OpsGenie側でアラートが動作すると、OpsGenie側でアラートに設定したタグと詳細が付されたイベントがDatadog側にも登録されます。

<img src="/static/images/og_create_alert_dd_updated.png" style="width:100% border:1px #777777;padding-bottom:10px;" />

発生したOpsGenieのアラートにOpsGenie上で承認やクローズすると、Datadog上の関連イベントは、OpsGenieのアラートを処理を行った人の名前で更新されます。

<img src="/static/images/og_closed_dd_updated.png" style="width:100% border:1px #777777;padding-bottom:10px;" />
