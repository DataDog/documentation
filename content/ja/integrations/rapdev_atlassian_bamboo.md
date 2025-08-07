---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-atlassian-bamboo
app_uuid: 8368c74f-4620-490f-aba2-f4eb296adb72
assets:
  dashboards:
    Rapdev - Atlassian Bamboo: assets/dashboards/rapdev_atlassian_bamboo.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.atlassian_bamboo.status
      metadata_path: metadata.csv
      prefix: rapdev.atlassian_bamboo.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 13192871
    source_type_name: rapdev_atlassian_bamboo
  logs: {}
  monitors:
    Cannot connect to Atlassian Bamboo: assets/monitors/monitor.json
author:
  contact_link: https://meetings.hubspot.com/ewilliams/rapdev-marketplace
  homepage: https://rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- コラボレーション
- marketplace
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_atlassian_bamboo
integration_id: rapdev-atlassian-bamboo
integration_title: Atlassian Bamboo
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_atlassian_bamboo
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.atlassian_bamboo
  product_id: bamboo
  short_description: 課金対象の Atlassian Bamboo エンティティあたりの単価
  tag: billable_entity
  unit_label: Bamboo プロジェクト
  unit_price: 1
public_title: Atlassian Bamboo
short_description: プロジェクト、プラン、ブランチ全体で Atlassian Bamboo の失敗したビルド メトリクスを監視します
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Marketplace
  - Category::Metrics
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: プロジェクト、プラン、ブランチ全体で Atlassian Bamboo の失敗したビルド メトリクスを監視します
  media:
  - caption: Bamboo 概要
    image_url: images/image1.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Atlassian Bamboo
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Atlassian Bamboo は、ソフトウェア プロジェクトのビルド、テスト、デプロイのプロセスを自動化する継続的インテグレーション / 継続的デプロイ (CI/CD) サーバーです。このインテグレーションは Bamboo インスタンスからデータを収集し、ビルド、リモート エージェント、および一般的な Bamboo 統計情報を取得します。

このインテグレーションを使用すると、リモート エージェントの運用状況と効率、ビルドの実行状況、Bamboo インスタンスの全体的な健全性についてインサイトを得ることができます。


## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: support@rapdev.io
- セールス: sales@rapdev.io
- チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 電話: 855-857-0222
- [Atlassian Bamboo ドキュメント][1]

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？RapDev へ[お問い合わせ](mailto:support@rapdev.io)ください！導入のサポートをいたします。*

[1]: https://confluence.atlassian.com/bamboo/bamboo-documentation-289276551.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[4]: https://github.com/DataDog/integrations-core/blob/master/rapdev_atlassian_bamboo/datadog_checks/atlassian_bamboo/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://confluence.atlassian.com/bamboo/personal-access-tokens-976779873.html
[9]: https://docs.datadoghq.com/ja/help/

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-atlassian-bamboo" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。