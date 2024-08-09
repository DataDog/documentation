---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-validator
app_uuid: d66f715a-4218-40f0-af35-a147c45c1d11
assets:
  dashboards:
    RapDev Validator Dashboard: assets/dashboards/rapdev_validator_dashboard.json
    RapDev Validator Host Dashboard: assets/dashboards/host_dashboard.json
    RapDev Validator Synthetic Dashboard: assets/dashboards/synthetic_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.validator.agent.installed
      metadata_path: metadata.csv
      prefix: rapdev.validator.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10183
    source_type_name: RapDev Validator
  logs: {}
  monitors:
    Host has non-compliant value for tag key: assets/monitors/host_non_compliant_value.json
    Host is missing required tag key: assets/monitors/host_missing_tag_key.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- コンプライアンス
- 構成 & デプロイ
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_validator
integration_id: rapdev-validator
integration_title: Tag Validator
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_validator
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: validator
  short_description: このインテグレーションの定額料金
  unit_price: 500
public_title: Tag Validator
short_description: モニタータグを検証し、DD 環境での Agent コンプライアンスを確保します
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - カテゴリ::コンプライアンス
  - Category::Configuration & Deployment
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: モニタータグを検証し、DD 環境での Agent コンプライアンスを確保します
  media:
  - caption: Validator ダッシュボード
    image_url: images/validator.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Tag Validator
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
RapDev Validator は、Datadog 環境でのタグモニタリングと Agent のコンプライアンス問題を解決するのに役立ちます。インテグレーションはタグキーのリストと、お使いの環境のタグ付け戦略に基づく許容値を受け取り、それらをメトリクスおよびサービスチェックとして Datadog インスタンスに報告します。このようにして、お使いの環境内のホストに正しいタグが割り当てられているかを表示することができます。

### ライブラリ
1. RapDev Validator ホストダッシュボード
2. RapDev Validator Synthetic ダッシュボード
3. RapDev Validator ダッシュボード

### ログ管理
1. ホストに必要なタグキーが割り当てられていない
2. ホストのタグキーに非準拠の値が割り当てられている

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- メール: support@rapdev.io
- チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)からメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-validator" target="_blank">こちらをクリック</a>してください。