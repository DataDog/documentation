---
categories:
  - monitoring
  - notification
ddtype: クローラー
dependencies: []
description: OpsGenie を Datadog のアラートとイベントで通知チャンネルとして使用
doc_link: 'https://docs.datadoghq.com/integrations/opsgenie/'
git_integration_title: opsgenie
has_logo: true
integration_title: OpsGenie
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: opsgenie
public_title: Datadog-OpsGenie インテグレーション
short_description: OpsGenie を Datadog のアラートとイベントで通知チャンネルとして使用
version: '1.0'
---
## 概要

@opsgenie を使用して、次の方法でアラートを作成できます。

  * イベントストリームから
  * スナップショットを取得して
  * メトリクスアラートがトリガーされたときに

## セットアップ
### コンフィグレーション
#### OpsGenie で Datadog インテグレーションを作成する

  1. OpsGenie アカウントにログインし、[OpsGenie のインテグレーション][1]ページに移動します。
  2. 下に示すように、Datadog を検索して見つけ、タイルをクリックします。
  {{< img src="integrations/opsgenie/opsgenie-int-index.png" alt="opsgenie int index" responsive="true" popup="true">}}

  3. [Integrations > APIs ページ][2]にある Datadog API キーを専用のフィールドに入力します。
  4. OpsGenie で受信者を選択し、フィルターをセットアップします。
  5. 必要に応じて、インテグレーションの名前を変更します。
  6. 構成を保存します。
  7. 後で Datadog で使用するため、キーと名前をコピーします。
  {{< img src="integrations/opsgenie/opsgenie-add-api-key.png" alt="opsgenie add api key" responsive="true" popup="true">}}
  8. OpsGenie でさらに DataDog インテグレーションを追加するには、[OpsGenie のインテグレーション][3]ページに移動し、上の手順を繰り返します。

#### OpsGenie で作成したインテグレーションを Datadog でリストする

  1. Datadog の [Account Integrations][4] で OpsGenie タイルを選択します。
  2. 表示されるダイアログボックスで、Configuration タブをクリックします。
  3. Datadog インテグレーションごとに提供されたキー (OpsGenie で作成される) を「**Datadog Integration Key**」フィールドに貼り付け、**Datadog Integration Name** にインテグレーション名を入力します。
  {{< img src="integrations/opsgenie/datadog-add-opsgenie-key.png" alt="datadog add opsgenie key" responsive="true" popup="true">}}

## 収集データ
### メトリクス

Opsgenie インテグレーションには、メトリクスは含まれません。

### イベント
Opsgenie インテグレーションには、イベントは含まれません。

### サービスのチェック
Opsgenie インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## その他の参考資料
### ナレッジベース
#### Datadog と OpsGenie を組み合わせて使用する方法
##### Datadog から OpsGenie アラートを作成/確認/閉じる

Edit Metric Alert で、セクション 5 の Say What’s Happening フィールドに @opsgenie-service_name または @opsgenie を入力して、OpsGenie アラートを作成します。Datadog でこのアラートがトリガーされると、OpsGenie サービスの受信者にアラートが送信されます。

OpsGenie アラートを Datadog から確認または閉じるには、Datadog で、OpsGenie イベントのコメントフィールドで @opsgenie-acknowledge または @opsgenie-close メンションを使用します。
{{< img src="integrations/opsgenie/dd_ack_og_alert.png" alt="dd ack og alert" responsive="true" popup="true">}}

##### OpsGenie によって作成された Datadog アラートを受信/確認/閉じる

OpsGenie でアラートをセットアップします。そのアラートがトリガーされると、Datadog でイベントが作成されます。OpsGenie アラートのタグと説明フィールドが Datadog に渡されます。

{{< img src="integrations/opsgenie/og_create_alert_dd_updated.png" alt="og create alert dd updated" responsive="true" popup="true">}}

OpsGenie から OpsGenie アラートを確認して閉じます。これにより、Datadog で、関連付けられたイベントがアラートを閉じたユーザーの名前で更新されます。

{{< img src="integrations/opsgenie/og_closed_dd_updated.png" alt="og closed dd updated" responsive="true">}}

[1]: https://www.opsgenie.com/integrations
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://www.opsgenie.com/integrations
[4]: https://app.datadoghq.com/account/settings
[5]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}