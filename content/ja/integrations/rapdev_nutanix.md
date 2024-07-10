---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-nutanix
app_uuid: 53711ca7-b5f8-4472-b921-e70a3103ede4
assets:
  dashboards:
    RapDev Nutanix Cluster Overview: assets/dashboards/rapdev_nutanix_overview_dashboard.json
    RapDev Nutanix Clusters Dashboard: assets/dashboards/rapdev_nutanix_clusters_dashboard.json
    RapDev Nutanix Hosts and Disks Dashboard: assets/dashboards/rapdev_nutanix_hosts_and_disks_dashboard.json
    RapDev Nutanix Protection Domain Dashboard: assets/dashboards/rapdev_nutanix_protection_domain_dashboard.json
    RapDev Nutanix VMs Dashboard: assets/dashboards/rapdev_nutanix_vms_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.nutanix.clusters.count
      metadata_path: metadata.csv
      prefix: rapdev.nutanix.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10138
    source_type_name: RapDev Nutanix
  logs: {}
  monitors:
    Nutanix Cluster CPU: assets/monitors/nutanix_cpu_monitor.json
    Nutanix Compression Saving: assets/monitors/nutanix_compression_saving_monitor.json
    Nutanix Deduplication: assets/monitors/nutanix_deduplication_monitor.json
    Nutanix Storage Usage: assets/monitors/nutanix_storage_monitor.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_nutanix
integration_id: rapdev-nutanix
integration_title: Nutanix
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_nutanix
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.nutanix
  product_id: nutanix
  short_description: コア 1 個あたりの単価
  tag: コア
  unit_label: Nutanix ホストコア
  unit_price: 5
public_title: Nutanix
short_description: Nutanix リソースの使用量を監視して、お使いの環境をより良く理解しましょう。
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
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Nutanix リソースの使用量を監視して、お使いの環境をより良く理解しましょう。
  media:
  - caption: Nutanix 概要ダッシュボード
    image_url: images/4.png
    media_type: image
  - caption: Nutanix VM ダッシュボード
    image_url: images/5.png
    media_type: image
  - caption: Nutanix Clusters ダッシュボード
    image_url: images/6.png
    media_type: image
  - caption: Nutanix ホスト & ディスクダッシュボード
    image_url: images/7.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Nutanix
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
Nutanix インテグレーションではストレージ、CPU 使用量、読み取り/書き込み IOPS、および Nutanix Clusters 内のその他のメトリクスを監視し、お使いの環境が常に最適なパフォーマンスで稼働しているかどうかを確認することができます。インテグレーションは 4 つのダッシュボードで構成されており、Nutanix Clusters を俯瞰的に可視化するとともに、潜在的なパフォーマンスの劣化をピンポイントかつ詳細に表示します。また、Nutanix インテグレーションには、ストレージの使用率やデータ重複除去といった、Nutanix 環境の総合的なパフォーマンス維持に欠かせない主要なメトリクスの監視機能も搭載されています。

### ログ管理

1. Nutanix Cluster ストレージ使用率
2. Nutanix Cluster CPU 使用率
3. Nutanix Cluster データ重複除去率
4. Nutanix Cluster データ圧縮率

### ライブラリ

RapDev Nutanix 概要
RapDev Nutanix Clusters
RapDev Nutanix ホスト & ディスク
RapDev Nutanix VM

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- メール: support@rapdev.io
- チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)からメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-nutanix" target="_blank">こちらをクリック</a>してください。