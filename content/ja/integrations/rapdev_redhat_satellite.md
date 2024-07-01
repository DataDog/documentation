---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-redhat-satellite
app_uuid: fad53c37-82aa-466c-a2b6-cfa27a6c7d45
assets:
  dashboards:
    RapDev RedHat Satellite Inventory Dashboard: assets/dashboards/inventory_dashboard.json
    RapDev RedHat Satellite OpenMetrics Dashboard: assets/dashboards/openmetrics_dashboard.json
    RapDev RedHat Satellite Tasks & Jobs Dashboard: assets/dashboards/tasks_&_jobs_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - rapdev.redhat_satellite.openmetrics.http_requests.count
      - rapdev.redhat_satellite.organization.count
      metadata_path: metadata.csv
      prefix: rapdev.redhat_satellite.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14094169
    source_type_name: RapDev RedHat Satellite
  logs:
    source: rapdev_redhat_satellite
  monitors:
    Foreman Task Failure: assets/monitors/foreman_task_failure.json
    HTTP 5xx Errors: assets/monitors/5xx_errors.json
    Job Invocation Failure: assets/monitors/job_invocation_failure.json
    OpenMetrics Connection: assets/monitors/openmetrics_connection.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- 開発ツール
- 構成とデプロイ
- ログの収集
- モニター
custom_custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_redhat_satellite
integration_id: rapdev-redhat-satellite
integration_title: RedHat Satellite
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_redhat_satellite
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.redhat_satellite
  product_id: redhat-satellite
  short_description: RedHat Satellite インスタンス 1 個あたりの単価
  tag: satellite_host
  unit_label: RedHat Satellite インスタンス
  unit_price: 1000
public_title: RedHat Satellite
short_description: RedHat Satellite の健全性とパフォーマンスの監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Developer Tools
  - Category::Configuration & Deployment
  - Category::Log Collection
  - Category::Metrics
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: RedHat Satellite の健全性とパフォーマンスの監視
  media:
  - caption: Satellite OpenMetrics ダッシュボード
    image_url: images/openmetrics_dashboard.png
    media_type: image
  - caption: Satellite インベントリーダッシュボード
    image_url: images/inventory_dashboard.png
    media_type: image
  - caption: Satellite タスク & ジョブダッシュボード
    image_url: images/tasks_jobs_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: RedHat Satellite
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

RedHat Satellite は、RedHat インフラストラクチャーを効率的に、セキュリティを確保しながら、組織の管理基準に準拠して稼動させるインフラストラクチャー管理製品です。このインテグレーションには、すぐに使えるダッシュボードがいくつか付属しており、RedHat Satellite のさまざまなコンポーネント (コンテンツホストのエラッタ、Foreman のタスクとジョブの起動ステータス、Satellite サービスのステータスなど) の全体的な状態が表示されます。

RedHat Satellite アプリケーションの監視を始めやすいように、このインテグレーションには、すぐに使えるモニターと Satellite 関連のログファイルを処理するためのログパイプラインも含まれています。

このインテグレーションは、Foreman v1.24.1.32 が動作する Satellite v6.7.5 でテストされており、それ以前のメジャーバージョンで機能することを保証するものではありません。


## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: [support@rapdev.io][7]
- セールス: sales@rapdev.io
- チャット: [rapdev.io][8]
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら][7]から RapDev にメッセージをお送りいただければ、導入をサポートいたします！*

[0]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[1]: https://access.redhat.com/documentation/en-us/red_hat_satellite/6.7/html/monitoring_red_hat_satellite/installing-pcp-packages_monitoring-guide#configure-pcp-data-collection_monitoring-guide
[2]: https://access.redhat.com/documentation/en-us/red_hat_satellite/6.7/html-single/administering_red_hat_satellite/index#creating-a-user_admin
[3]: https://access.redhat.com/documentation/en-us/red_hat_satellite/6.7/html-single/administering_red_hat_satellite/index#creating-a-role_admin
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: mailto:support@rapdev.io
[8]: https://www.rapdev.io/#Get-in-touch
[9]: mailto:sales@rapdev.io
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-redhat-satellite" target="_blank">こちらをクリック</a>してください。