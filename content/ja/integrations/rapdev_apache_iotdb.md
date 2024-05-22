---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-apache-iotdb
app_uuid: dfc14c35-0fb0-457c-abf2-cde174b9e113
assets:
  dashboards:
    RapDev Apache IoTDB Dashboard: assets/dashboards/rapdev_apache_iotdb_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.apache_iotdb.connections
      metadata_path: metadata.csv
      prefix: rapdev.apache_iotdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10430
    source_type_name: RapDev Apache IoTDB
  monitors:
    Connection to Prometheus Metrics Endpoint is failing: assets/monitors/failed_prometheus_health.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- 開発ツール
- iot
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_apache_iotdb
integration_id: rapdev-apache-iotdb
integration_title: Apache IoTDB
integration_version: ''
is_public: true
kind: インテグレーション
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_apache_iotdb
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.apache_iotdb
  product_id: apache-iotdb
  short_description: インスタンス 1 個あたりの単価。
  tag: apache_iotdb_endpoint
  unit_label: ApacheIoTDB Node
  unit_price: 10
public_title: Apache IoTDB
short_description: Apache IoTDB の構成ノードとデータノードを監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Developer Tools
  - Category::IoT
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Apache IoTDB の構成ノードとデータノードを監視する
  media:
  - caption: Apache IoTDB ダッシュボード - クラスター概要
    image_url: images/cluster_overview.png
    media_type: image
  - caption: Apache IoTDB ダッシュボード - 書き込みパフォーマンス
    image_url: images/write_performance.png
    media_type: image
  - caption: Apache IoTDB ダッシュボード - クエリインターフェイス
    image_url: images/query_interface.png
    media_type: image
  - caption: Apache IoTDB ダッシュボード - JVM
    image_url: images/jvm.png
    media_type: image
  - caption: Apache IoTDB ダッシュボード - 接続とネットワーキング
    image_url: images/connections_networking.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Apache IoTDB
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Apache IoTDB (Internet of Things Database) は、時系列データ用に設計された統合データ管理エンジンで、データの収集、保存、分析に特化したサービスをユーザーに提供できます。Apache IoTDB インテグレーションにより、ユーザーは構成ノードとデータノードのコンパクション、クエリ、メタデータ、スケジューリング操作、および JVM 全体の健全性を監視できます。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: support@rapdev.io
- セールス: sales@rapdev.io
- チャット: [rapdev.io][4]
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織にとって重要な機能が欠けていますか？[こちら][5]から RapDev にメッセージをお送りいただければ、我々が作成いたします！！*

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://www.rapdev.io/#Get-in-touch
[5]: mailto:support@rapdev.io
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-apache-iotdb" target="_blank">こちらをクリック</a>してください。