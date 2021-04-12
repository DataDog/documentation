---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - AWS
  - cloud
  - 処理
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/appkeeper/README.md'
display_name: AppKeeper
draft: true
git_integration_title: appkeeper
guid: 3cde5eb5-eadb-4065-8235-fb035abc34be
integration_id: appkeeper
integration_title: AppKeeper
is_public: false
kind: インテグレーション
maintainer: rd-pd-1@sios.com
manifest_version: 1.0.0
metric_prefix: AppKeeper.
metric_to_check: ''
name: AppKeeper
public_title: Datadog-AppKeeper インテグレーション
short_description: Datadog からのアラートに基づき Appkeeper でサービスを再起動
support: contrib
supported_os:
  - linux
  - windows
---
## 概要

Datadog から Synthetics などの通知を受け取ると、SIOS AppKeeper で不具合が生じている Amazon EC2 サービスが自動的に再起動するため、高額な人為的介入の必要性を排除できます。

Datadog でアラートが見つかると、AppKeeper Recovery API を介してサービスを再起動します。

![スナップショット][1]

![スナップショット][2]

## セットアップ

### ステップ 1. SIOS AppKeeper API キーを取得する

AppKeeper GUI から SIOS AppKeeper API キーを取得します。

1. **Account Information** をクリックし、モーダルダイアログを開きます
2. **Get Token** をクリックします
3. トークンをコピーします

![スナップショット][3]

### ステップ 2. Datadog インテグレーションダッシュボードで Webhook を定義する

1. Integration をクリックします
2. Webhooks をクリックします（*Webhook をまだインストールしていない場合は、インストールしてください。）

![スナップショット][4]

### ステップ 3. ペイロードとカスタムヘッダーを定義します

1. **URL**: "https://api.appkeeper.sios.com/v2/integration/{AWS_account_ID}/actions/recover" を入力します
2. モニタリングインスタンスのインスタンス ID とサービス名を **Payload** に入力します
3. **Custom Headers** の "**appkeeper-integration-token**" に AppKeeper API トークンを入力します

![スナップショット][5]

### ステップ 4. Datadog モニタリングと統合します

例として、新しい Synthetic テストを作成し、AppKeeper. とのインテグレーションをセットアップします。

1. UX Monitoring に移動し、**Synthetic Test** を選択します。
2. **New Test** をクリックして Synthetics を新規作成します

![スナップショット][6]

3. モニタリングフィールドを設定します。

![スナップショット][7]

4. Notification 設定で、ステップ 2 およびステップ 3 で設定した Webhook を追加します（チームに通知）。

![スナップショット][8]

5. Datadog には、アラートが繰り返し発動すると通知を停止する機能があります。
これを設定した場合、AppKeeper のリカバリ API が Webhook により呼び出されなくなります。**禁止には設定しないでください**

![スナップショット][9]

6. AppKeeper によるリカバリ結果は、AppKeeper の GUI にリストアップされます。

![スナップショット][10]


AppKeeper インテグレーションの詳細については、Appkeeper の[ドキュメント][11]を参照してください。

## 収集データ

### メトリクス

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/integration.jpg
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/integration2.jpg
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/get_token.jpg
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/datadog_webhook.jpg
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/payload_header.jpg
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/synthetic_test.jpg
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/synthetic_test2.jpg
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/synthetic_test3.jpg
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/synthetic_test4.jpg
[10]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/history.jpg
[11]: https://sioscoati.zendesk.com/hc/en-us/articles/900000978443-Integration
[12]: https://docs.datadoghq.com/ja/help/