---
app_id: harness-harness-notifications
app_uuid: 0194c0d4-f822-7117-be7a-1ed1ccf587e7
assets:
  dashboards:
    Harness Notifications Integration Overview: assets/dashboards/harness_notifications_integration_overview.json
  integration:
    auto_install: true
    events:
      creates_events: true
    process_signatures: []
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 38607293
    source_type_name: harness_notifications
author:
  homepage: https://www.harness.io/
  name: Harness
  sales_email: sales@harness.io
  support_email: support@harness.io
  vendor_id: harness
categories:
- notifications
- event management
- alerting
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/harness_harness_notifications/README.md
display_on_public_website: true
draft: false
git_integration_title: harness_harness_notifications
integration_id: harness-harness-notifications
integration_title: Harness Notifications
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: harness_harness_notifications
public_title: Harness Notifications
short_description: Harness のパイプライン通知を Datadog Events に取り込む
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Notifications
  - Category::Event Management
  - Category::Alerting
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Harness のパイプライン通知を Datadog Events に取り込む
  media:
  - caption: Datadog の Harness Notifications Integration Overview ダッシュ ボード
    image_url: images/Screenshot 2025-03-05 at 11.45.07 PM-2560x1440.png
    media_type: image
  - caption: Datadog に取り込まれた Harness のパイプライン通知
    image_url: images/Screenshot 2025-03-05 at 9.18.27 AM-2560x1440.png
    media_type: image
  - caption: Harness で通知対象のパイプライン イベントを選択する
    image_url: images/Screenshot 2025-02-03 at 2.34.46 PM-2560x1440.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Harness Notifications
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Harness は、エンジニアや DevOps チームが必要なときにソフトウェアをビルド、テスト、デプロイし、検証まで行えるセルフ サービス型の CI/CD プラットフォームです。このインテグレーションを使うと、Harness のパイプライン イベント通知を Datadog にシームレスに送信でき、既存のモニタリング ワークフローの中で重要なパイプライン更新をリアル タイムに把握できます。これらの通知は Datadog の [Events Explorer][1] で確認でき、標準で用意されているダッシュ ボードにも表示されます。

**注**: Datadog 通知を Harness 内で設定する機能は Feature Flag によって制御されています。機能を有効化するには [Harness サポート][2] に問い合わせてください。このインテグレーションの詳細については [Harness ドキュメント][3] を参照してください。

## セットアップ

インテグレーションをインストールすると、これらのイベントには `source:harness_notifications` というタグが付きます。

### Harness で Datadog パイプライン通知を設定する

1. Harness の Pipeline Studio で、右側のサイドバーにある **Notify** をクリックします。
2. 新しいチャネルを作成するには、**+ Notifications** をクリックします。
3. Datadog 通知チャネルの名前を入力します。
4. 監視したい Pipeline Events を選択します。
5. Notification Method で、Channel Type として **Datadog(/v1/events API)** を選択します。
6. Datadog の URL を入力します。末尾は `/api/v1/events` にする必要があります (例 : `https://app.datadoghq.com/api/v1/events/`)。
7. [Datadog API キー][4] を入力します。
8. (任意) 必要に応じてヘッダーを追加します。
9. 設定をテストし、**Finish** をクリックします。

## アンインストール

Notifications ページから、通知チャネルを有効化・無効化したり、削除したりできます。
-   通知ルールを有効化または無効化するには、**Enabled** スイッチを切り替えます。
-   削除するには、その他のオプションで **:** を選択し、**Delete** をクリックします。


## サポート

サポートが必要な場合は [Harness サポート][5]にお問い合わせください。


[1]: https://docs.datadoghq.com/ja/service_management/events/explorer/
[2]: mailto:support@harness.io
[3]: https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/#datadog-notifications
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[5]: https://www.harness.io/support