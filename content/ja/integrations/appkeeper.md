---
app_id: appkeeper
app_uuid: fc54f5f2-0ce1-4d4e-b1e0-191eece029d3
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: AppKeeper.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10130
    source_type_name: AppKeeper
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: SIOS AppKeeper
  sales_email: rd-pd-1@sios.com
  support_email: rd-pd-1@sios.com
categories:
- AWS
- cloud
- notifications
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/appkeeper/README.md
display_on_public_website: true
draft: false
git_integration_title: appkeeper
integration_id: appkeeper
integration_title: AppKeeper
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: appkeeper
public_title: AppKeeper
short_description: Datadog からのアラートに基づき Appkeeper でサービスを再起動
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Notifications
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Datadog からのアラートに基づき Appkeeper でサービスを再起動
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AppKeeper
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

SIOS AppKeeper は、Datadog から通知を受信すると、失敗した Amazon EC2 サービスを自動的に再起動し、費用のかかる手動介入の必要性を排除します。Datadog がアラートをトリガーすると、AppKeeper Recovery API を使って EC2 サービスを再起動します。

## 計画と使用

### SIOS AppKeeper API キーを取得する

AppKeeper GUI から SIOS AppKeeper API キーを取得します。

1. **Account Information** をクリックし、モーダルダイアログを開きます。
2. **Get Token** をクリックします。
3. トークンをコピーします。

![スナップショット][1]

### Webhooks インテグレーションをインストールして構成する

1. Datadog サイトで、[Webhooks インテグレーション][2]に移動し、インテグレーションをインストールします。
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

詳細については、[AppKeeper のインテグレーションドキュメント][7]を参照してください。

## リアルユーザーモニタリング

### データセキュリティ

このインテグレーションによって提供されるメトリクスのリストについては、[metadata.csv][8] を参照してください。

## ヘルプ

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