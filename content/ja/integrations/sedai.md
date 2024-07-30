---
app_id: sedai
app_uuid: fa7de455-fef8-4cb2-af30-9baa50e351f2
assets:
  dashboards:
    Sedai Overview: assets/dashboards/sedai_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: sedai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10249
    source_type_name: Sedai
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Sedai
  sales_email: praveen.prakash@sedai.io
  support_email: praveen.prakash@sedai.io
categories:
- 自動化
- cloud
- コスト管理
- notifications
- orchestration
- プロビジョニング
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sedai/README.md
display_on_public_website: true
draft: false
git_integration_title: sedai
integration_id: sedai
integration_title: Sedai
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: sedai
public_title: Sedai
short_description: クラウドアプリケーションをインテリジェントに管理する自律的なプラットフォーム
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Cloud
  - Category::Cost Management
  - Category::Notifications
  - Category::Orchestration
  - Category::Provisioning
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: クラウドアプリケーションをインテリジェントに管理する自律的なプラットフォーム
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Sedai
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

Sedai は、本番環境をプロアクティブに管理し、問題を防止して可用性、パフォーマンス、およびクラウドコストを改善する自律型クラウドプラットフォームです。SRE のためのインテリジェントな オートパイロットとして、Sedai は監視データを独自に検出、優先順位付け、分析し、しきい値なしに本番環境で安全かつ自律的に行動します。

このインテグレーションを有効にすると、Sedai が本番環境で自律的に実行するアクションについて、Datadog で通知を受け取ることができます。

### オートディスカバリーの動作

* **エージェントレス:** クラウドアカウントにシームレスに接続し、本番環境を自動的に検知・把握します。

* **構成不要:** Datadog API に簡単に接続し、メトリクス動作をインテリジェントに識別し、優先順位をつけて学習します。

* **プロアクティブアクション:** お客様に代わって本番稼動を安全に行い、リソースの可用性問題を回避し、常に最適な状態で稼動することを保証します。

## 計画と使用

Sedai で、

1. Settings > Notifications > Add Integration > Datadog アイコンに移動します

   ![Datadog インテグレーションの追加][1]

2. Datadog アカウントのニックネームと API キーを入力します。インテグレーションを有効化し、テストします。

   ![Datadog API キーの設定][2]

3. テストが正常に行われたことを確認したら、Save をクリックします。

   ![動作中の Datadog インテグレーションの保存][3]

4. Settings > Notifications で、Datadog に送信する[通知を選択][4]します。

   ![Datadog 通知の有効化][5]

## リアルユーザーモニタリング

このインテグレーションは、Datadog にイベントを送信します。

## Agent

このインテグレーションに関するサポートは、[Datadog サポート][6]にお問い合わせください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/DataDog_Notification_Integration.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Add_DataDog_Channel.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Add_DataDog_Channel-Working_REC.png
[4]: https://sedai.gitbook.io/sedai/sedai-user-guide/controls/notifications
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Enable_Notifications.png
[6]: https://docs.datadoghq.com/ja/help/