---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-hpux-agent
app_uuid: 5e611b0d-a099-4823-a4ba-e42b1012b3b5
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: datadog.marketplace.rapdev.hpux_agent
      metadata_path: metadata.csv
      prefix: rapdev.hpux_agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10185
    source_type_name: RapDev Solaris Agent
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
git_integration_title: rapdev_hpux_agent
integration_id: rapdev-hpux-agent
integration_title: HP-UX Agent
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_hpux_agent
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.hpux_agent
  product_id: hpux-agent
  short_description: ホスト 1 個あたりの単価
  tag: ホスト
  unit_label: HP-UX Agent
  unit_price: 40
public_title: HP-UX Agent
short_description: hppa および itanium の HP-UX 11.31 メトリクスを提供するシステム Agent
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: hppa および itanium の HP-UX 11.31 メトリクスを提供するシステム Agent
  media:
  - caption: インフラストラクチャーリスト
    image_url: images/1.png
    media_type: image
  - caption: ホストメトリクス
    image_url: images/2.png
    media_type: image
  - caption: ログ
    image_url: images/3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: HP-UX Agent
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->

## 概要

HP-UX Agent を使用すると、Datadog 内のシステムメトリクスを収集してレポートできます。このインテグレーションは、PA-RISC と Itanium アーキテクチャの両方で HP-UX 11.31 をサポートします。HP-UX Agent はデフォルトの HP-UX Perl システムディストリビューションを使用し、追加のライブラリ依存関係を必要としないため、インストールと互換性が簡素化されます。

HP-UX Agent は、Datadog インフラストラクチャーリストをサポートするために必要なホストメタデータを提供し、組織が他のサポートされている Datadog ホストオペレーティングシステムと同様の HP-UX ホストシステムで作業できるようにします。

HP-UX Agent は、ネイティブ Agent と同じ URL とポートを使用します。HP-UX Agent は現在、コアインフラストラクチャーメトリクス、プロセスチェック、ログ追跡をサポートしています。カスタム Agent チェック、インテグレーション、またはサービスチェックはサポートしていません。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

 - メール: support@rapdev.io 
 - チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 電話: 855-857-0222 

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)からメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-hpux-agent" target="_blank">こちらをクリック</a>してください。