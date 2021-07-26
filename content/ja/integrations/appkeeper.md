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
draft: false
git_integration_title: appkeeper
guid: 3cde5eb5-eadb-4065-8235-fb035abc34be
integration_id: appkeeper
integration_title: AppKeeper
is_public: true
kind: integration
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

SIOS AppKeeper は、Datadog から通知を受信すると、失敗した Amazon EC2 サービスを自動的に再起動し、費用のかかる手動介入の必要性を排除します。Datadog がアラートをトリガーすると、AppKeeper Recovery API を介して EC2 サービスを再起動します。

## セットアップ

### SIOS AppKeeper API キーを取得する

AppKeeper GUI から SIOS AppKeeper API キーを取得します。

1. **Account Information** をクリックし、モーダルダイアログを開きます。
2. **Get Token** をクリックします。
3. トークンをコピーします。

![スナップショット][1]

### Webhooks インテグレーションをインストールして構成する

1. Datadog アプリで、[Webhooks インテグレーション][2]に移動し、インテグレーションをインストールします。
2. **Configuration** タブを選択します。
3. **Webhooks** ヘッダーの下で、**New** をクリックします。
4. 次の URL を入力します: "https://api.appkeeper.sios.com/v2/integration/{AWS_account_ID}/actions/recover"
5. **Payload** セクションに監視インスタンスの `id` と `name` の名前を入力します。
3. AppKeeper API トークンを **Custom Headers** セクションに登録します。

![スナップショット][3]

### Datadog モニタリングと統合する

1. 新しい Datadog [Synthetic テスト][4]を作成します。右上隅にある **New Test** をクリックします。
2. **Define requests** ステップで、監視する URL を入力します。
3. **Define assertions** ステップで、**New Assertion** をクリックし、パラメータ When `status code` is `200` を追加します。これにより、ステータスコードが 200 ではない場合にアラートがトリガーされます。リクエストで別のステータスに基づく通知が必要な場合は、200 を使用するステータスコードに置き換えてください。
4. もう一度 **New Assertion** をクリックして、2 番目のパラメータセット And `response time` is less than `2000` ms を追加します。これにより、応答時間が 2000ms より長い場合にアラートがトリガーされます。これより長いまたは短い期間が必要な場合は、`2000` を使用する期間に置き換えてください。
5. **Notify your team** ステップで、`@webhook-name_of_the_webhook` の形式で Webhook を追加します。通知のメッセージを含めます。**注**: このステップの **renotify if the monitor has not been resolved** (モニターが解決されていない場合に再通知) 設定の最小監視間隔は `Every 10 Minutes` です。**Never** に設定すると、Webhook が AppKeeper のリカバリ API を呼び出すことが禁止されます。

![スナップショット][5]

AppKeeper によるリカバリ結果は、AppKeeper の GUI にリストアップされます。

![スナップショット][6]

AppKeeper インテグレーションの詳細については、AppKeeper の[ドキュメント][7]を参照してください。

## 収集データ

### メトリクス

このインテグレーションによって提供されるメトリクスのリストについては、[metadata.csv][8] を参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/get_token.jpg
[2]: https://app.datadoghq.com/account/settings#integrations/webhooks
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/payload_header.jpg
[4]: https://app.datadoghq.com/synthetics/list
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/synthetic_test_params.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/history.jpg
[7]: https://sioscoati.zendesk.com/hc/en-us/articles/900000978443-Integration
[8]: https://github.com/DataDog/integrations-extras/blob/master/appkeeper/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/