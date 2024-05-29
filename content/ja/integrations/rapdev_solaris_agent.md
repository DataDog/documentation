---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-solaris-agent
app_uuid: a994f2cf-1f77-4e74-803d-fb833455e224
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: datadog.marketplace.rapdev.solaris_agent
      metadata_path: metadata.csv
      prefix: rapdev.solaris_agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10135
    source_type_name: RapDev Solaris Agent
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- oracle
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_solaris_agent
integration_id: rapdev-solaris-agent
integration_title: Solaris Agent
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_solaris_agent
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.solaris_agent
  product_id: solaris-agent
  short_description: ホスト 1 個あたりの単価
  tag: ホスト
  unit_label: Solaris Agent
  unit_price: 40
public_title: Solaris Agent
short_description: sparc と i86pc の Solaris 10 および 11 のメトリクスを提供する Agent
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Oracle
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: sparc と i86pc の Solaris 10 および 11 のメトリクスを提供する Agent
  media:
  - caption: インフラストラクチャーリスト
    image_url: images/1.png
    media_type: image
  - caption: ホストインフラストラクチャーの詳細
    image_url: images/2.png
    media_type: image
  - caption: ホストメトリクス
    image_url: images/3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Solaris Agent
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->

## 概要

Solaris Agent を使用すると、Datadog 内の Solaris システムメトリクスを収集してレポートできます。このインテグレーションは、Solaris 10 と 11 の両方、および SPARC と i86pc アーキテクチャをサポートします。Solaris Agent はデフォルトの Solaris Perl システムディストリビューションを使用し、追加のライブラリ依存関係を必要としないため、インストールと互換性が簡素化されます。

Solaris Agent は、Datadog インフラストラクチャーリストをサポートするために必要なホストメタデータを提供し、組織が他のサポートされている Datadog ホストオペレーティングシステムと同様の Solaris ホストシステムで作業できるようにします。

Solaris Agent は、ネイティブ Agent と同じ URL とポートを使用します。Solaris Agent は、コアインフラストラクチャーメトリクス、プロセスチェック、ログ追跡をサポートしています。インテグレーションまたはサービスチェックはサポートしていません。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

 - メール: support@rapdev.io 
 - チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 電話: 855-857-0222 

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)からメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-solaris-agent" target="_blank">こちらをクリック</a>してください。