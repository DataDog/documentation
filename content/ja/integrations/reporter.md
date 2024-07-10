---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-reporter
app_uuid: debb66b8-6675-4273-85a2-55d806e68e1b
assets:
  dashboards:
    Reporter: assets/dashboards/reporter_dashboard.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: ''
    service_checks:
      metadata_path: service_checks.json
    source_type_id: 10110
    source_type_name: Reporter
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
git_integration_title: reporter
integration_id: rapdev-reporter
integration_title: Reporter
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: reporter
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: reporter
  short_description: このインテグレーションの定額料金
  unit_price: 299
public_title: Reporter
short_description: Datadog ダッシュボードのメールレポートを生成する
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Marketplace
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog ダッシュボードのメールレポートを生成する
  media:
  - caption: レポーターの紹介
    image_url: images/video.png
    media_type: ビデオ
    vimeo_id: 630489700
  - caption: サンプルのメールレポート
    image_url: images/3.png
    media_type: image
  - caption: レポートコンフィギュレーションページ
    image_url: images/1.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Reporter
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

[{{< img src="marketplace/reporter/images/video.png" alt="Reporter の紹介" >}}](https://www.youtube.com/watch?v=GK5cGDUr1CA)

Datadog Reporter を使用すると、レポートをスケジュールして、設定した間隔でメールで送信できます。既存のダッシュボードのいずれかを選択し、レポーター Web アプリケーションに URL を追加し、それを送信するためのメール間隔を設定できます。レポートは、ユーザーが開いて表示できる添付ファイルとしてユーザーにメールで送信されます。現在、生成および送信できるレポートの数に制限はありません。

このインテグレーションにより、**Datadog Reporter** と呼ばれる新しいダッシュボードが Datadog インスタンスにセットアップされます。ダッシュボードに移動し、その iFrame から新しいユーザーを作成することで、アプリケーションに直接アクセスできます。*Datadog アカウントは DD Reporter アプリケーションでは機能しません。別のアカウントを登録する必要があります*

## Agent

サポートまたは機能リクエストについては、以下のチャンネルで RapDev.io までお問い合わせください。

 - メール: support@rapdev.io 
 - チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 電話: 855-857-0222 

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)からメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-reporter" target="_blank">こちらをクリック</a>してください。