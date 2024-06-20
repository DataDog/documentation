---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-sophos
app_uuid: 86b68ae7-ba52-4160-bbf5-e1455fafa677
assets:
  dashboards:
    RapDev Sophos Dashboard: assets/dashboards/rapdev_sophos_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.sophos.endpoint.registered
      metadata_path: metadata.csv
      prefix: rapdev.sophos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10192
    source_type_name: RapDev Sophos
  logs: {}
  monitors:
    '[RapDev Sophos] Managed Endpoint Health has Changed': assets/monitors/sophos_endpoint_health.json
    '[RapDev Sophos] Sophos Service on Managed Endpoint is Stopped': assets/monitors/sophos_service_running.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- セキュリティ
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_sophos
integration_id: rapdev-sophos
integration_title: Sophos
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_sophos
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.sophos
  product_id: sophos
  short_description: エンドポイント 1 個あたりの単価
  tag: endpoint_name
  unit_label: 登録されたエンドポイント
  unit_price: 1
public_title: Sophos
short_description: Sophos が管理するエンドポイントの健全性を監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Sophos が管理するエンドポイントの健全性を監視
  media:
  - caption: Sophos ダッシュボード
    image_url: images/dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Sophos
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Sophos インテグレーションは、Sophos が管理するエンドポイント全体の健全性を監視し、管理対象デバイスが健全な状態にあることを確認します。このインテグレーションには、デバイスの健全性を監視するために使用できる複数のメトリクスの概要を提供する 1 つのダッシュボードがあらかじめ組み込まれています。また、Sophos インテグレーションには 2 つのモニターが付属しており、デバイスの健全性が悪くなった場合や、デバイス上の Sophos サービスの 1 つが停止した場合に、アラートを出すことができます。

### ログ管理
1. 管理対象エンドポイントの健全性が変化した
2. 管理対象エンドポイントの Sophos サービスが停止している

### ライブラリ
1. RapDev Sophos ダッシュボード

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: support@rapdev.io
- セールス: sales@rapdev.io
- チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？RapDev へ[お問い合わせ](mailto:support@rapdev.io)ください！導入のサポートをいたします。*

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/master/rapdev_sophos/datadog_checks/rapdev_sophos/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-sophos" target="_blank">こちらをクリック</a>してください。