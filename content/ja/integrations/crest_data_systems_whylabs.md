---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-whylabs
app_uuid: a53f983e-7d18-4e25-98d9-35cb3ce7c181
assets:
  dashboards:
    WhyLabs - Datasets: assets/dashboards/crest_data_systems_whylabs_datasets.json
    WhyLabs - Models: assets/dashboards/crest_data_systems_whylabs_models.json
    WhyLabs Overview: assets/dashboards/crest_data_systems_whylabs_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.whylabs.dataset_metric.classification_prediction_count
      metadata_path: metadata.csv
      prefix: cds.whylabs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39158566
    source_type_name: crest_data_systems_whylabs
  logs:
    source: crest-data-systems-whylabs
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- log collection
- ai/ml
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_whylabs
integration_id: crest-data-systems-whylabs
integration_title: WhyLabs
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_whylabs
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: whylabs
  short_description: 月額の定額料金。
  unit_price: 50.0
public_title: WhyLabs
short_description: アノマリー フィード、入力/出力、列、セグメント、モデル パフォーマンス メトリクスなどを含むリソース データを収集します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - Category::Log Collection
  - Category::AI/ML
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: アノマリー フィード、入力/出力、列、セグメント、モデル パフォーマンス メトリクスなどを含むリソース データを収集します。
  media:
  - caption: WhyLabs Overview
    image_url: images/crest_data_systems_whylabs_overview.png
    media_type: image
  - caption: WhyLabs - Models
    image_url: images/crest_data_systems_whylabs_models.png
    media_type: image
  - caption: WhyLabs - Datasets
    image_url: images/crest_data_systems_whylabs_datasets.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: WhyLabs
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
[**WhyLabs**][1] は、組織が人工知能 (AI) アプリケーションを監視し、管理し、最適化できるように設計されたプラットフォームです。機械学習 (ML) モデルがライフ サイクル全体を通じて信頼性、透明性、公平性を保てるように、各種ツールを提供します。また、監視と可観測性の手法を活用してモデルのパフォーマンスを追跡し、データ ドリフトやアノマリーといった問題を特定しながら、高品質な予測を維持するためにチームを支援します。

このインテグレーションは、WhyLabs のデータを Datadog に Logs、Metrics、Events として取り込みます:

### メトリクス
  - 分類のパフォーマンス
  - 回帰のパフォーマンス

### ログ
  - リソース
  - エンティティ スキーマ
  - 異常値
  - セグメント

### イベント
Datadog インテグレーションの設定は、処理を進める前に必須項目がすべて正しく構成されていることを検証します。さらに、データ取り込み中の認証イベントを追跡することで、設定検証後も安全なアクセスと適切なユーザー検証を担保します。

### ダッシュボード
このインテグレーションには、**すぐに使えるダッシュボードが 3 つ**含まれます:

 1. **WhyLabs Overview**: プラットフォームを俯瞰できるビューを提供し、機械学習 モデルとデータ セットの監視・管理を支援します。リソース、アノマリー、セグメント、入力、出力、列などの主要領域を強調表示します。
 2. **WhyLabs - Models**: モデル サマリー、検出されたアノマリー、セグメント、アクティブ モニター、入力、出力などの重要要素にフォーカスします。本番環境におけるモデルのパフォーマンスと挙動を詳しく確認できます。
 3. **WhyLabs - Datasets**: データ セットのデータ タイプの概要を表示し、モデル サマリー、アノマリー、セグメント、アクティブ モニター、列、離散性ステータスといった領域を中心に可視化します。

## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポート用メール: [datadog.integrations@crestdata.ai][9]
- 営業メール: [datadog-sales@crestdata.ai][10]
- Web サイト: [crestdata.ai][11]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][3]


[1]: https://whylabs.ai/
[2]: https://docs.crestdata.ai/datadog-integrations-readme/whylabs.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[5]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/
[6]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[7]: https://docs.datadoghq.com/ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/configuration/agent-commands/#agent-status-and-information
[9]: mailto:datadog.integrations@crestdata.ai
[10]: mailto:datadog-sales@crestdata.ai
[11]: https://www.crestdata.ai/

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-whylabs" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。