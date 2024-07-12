---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-syntheticemail
app_uuid: c3b29bd1-fb32-44ed-aaf5-34d6b8d84bbb
assets:
  dashboards:
    Synthetic Email: assets/dashboards/synthetic_email.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.syntheticemail.rtt
      metadata_path: metadata.csv
      prefix: rapdev.syntheticemail.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10111
    source_type_name: Synthetic Email
  monitors:
    Hop-count change: assets/monitors/hop_count_change.json
    Performance degraded: assets/monitors/performance_degraded.json
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
git_integration_title: syntheticemail
integration_id: rapdev-syntheticemail
integration_title: Synthetic Email
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: syntheticemail
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.syntheticemail
  product_id: syntheticemail
  short_description: メールボックス 1 個あたりの単価
  tag: mailbox
  unit_label: Mailbox
  unit_price: 250
public_title: Synthetic Email
short_description: 世界中からのメールメールボックスのラウンドトリップパフォーマンスを監視する
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: 世界中からのメールメールボックスのラウンドトリップパフォーマンスを監視する
  media:
  - caption: Synthetic Email の紹介
    image_url: images/video.png
    media_type: ビデオ
    vimeo_id: 630489712
  - caption: Synthetic Email と応答時間
    image_url: images/1.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Synthetic Email
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## 概要

このインテグレーションは、メールボックスを監視し、Synthetic メッセージの送受信配信を測定します。このインテグレーションでは、Synthetic メール配信に 3 つの地理的なソースの場所である、バージニア (US)、フランクフルト (EU)、シドニー (AP) を使用します。このチェックは、アドレス `probe@synth-rapdev.io` からテストメールを送信し、メールボックスからの自動返信を待つことで機能します。このインテグレーションでは、ホップ数、ラウンドトリップ時間、テスト結果 (合格/不合格) を測定します。

## Agent
サポートまたは機能リクエストについては、以下のチャンネルで RapDev.io までお問い合わせください。

 - メール: support@rapdev.io 
 - チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 電話: 855-857-0222 

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)からメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-syntheticemail" target="_blank">こちらをクリック</a>してください。