---
algolia:
  subcategory: Marketplace インテグレーション
app_id: flagsmith-platform
app_uuid: ad6a3059-12b6-4a11-a72c-336d732add15
assets: {}
author:
  homepage: https://flagsmith.com/
  name: Flagsmith
  sales_email: support@flagsmith.com
  support_email: support@flagsmith.com
  vendor_id: flagsmith
categories:
- 構成 & デプロイ
- マーケットプレイス
- テスト
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: flagsmith_flagsmith
integration_id: flagsmith-platform
integration_title: Flagsmith
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: flagsmith_flagsmith
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.flagsmith.seat
  product_id: flagsmith-license
  short_description: 価格は 1 シートあたり月額 75 ドル。
  tag: シート
  unit_label: シート
  unit_price: 75
public_title: Flagsmith
short_description: Flagsmith は、オープンソースの機能フラグおよびリモート構成サービスです。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Marketplace
  - Category::Testing
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Flagsmith は、オープンソースの機能フラグおよびリモート構成サービスです。
  media:
  - caption: 機能管理、リモート構成。デプロイとリリースの分離。
    image_url: images/dashboard_home.png
    media_type: image
  - caption: Flagsmith を使った A/B テストや多変量テストの推進。
    image_url: images/dashboard_mv_flags.png
    media_type: image
  - caption: Datadog のダッシュボードから Flagsmith のフラグと監査ログを直接インテグレーションし、制御することができます。
    image_url: images/dashboard_widget.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Flagsmith
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

[Flagsmith][1] は、安心して機能をリリースできるよう支援し、Web、モバイル、サーバーサイドのアプリケーションで機能フラグを管理します。Flagsmith がホストする API を使用したり、プライベートクラウドにデプロイしたり、オンプレミスで実行したりすることができます。

Flagsmith は、機能フラグの開発、実装、管理のためのオールインワンプラットフォームを提供します。社内のソリューションから移行する場合でも、初めてトグルを使用する場合でも、Flagsmith はパワーと効率の両方を提供します。

### 複数のプラットフォームでフラグを管理

Flagsmith は、Web、モバイル、サーバーサイドのアプリケーションで、機能トグルの作成と管理を容易にします。コードのセクションをフラグでラップし、Flagsmith を使ってその機能を管理します。

### 強力なセグメンテーションルール

機能フラグを開発環境ごと、ユーザーグループごと (個人ユーザー、ユーザーセグメント、パーセンテージなど) に管理することができます。これにより、カナリアデプロイのようなプラクティスを実装することができます。

### A/B テストや多変量テストの推進

多変量フラグにより、2 つ以上のバリエーションでパーセンテージ分割を行い、正確なA/B/n テストや実験が可能です。

### ライブラリ

Flagsmith のフラグを既存の Datadog ダッシュボードから直接表示し、制御することができます。

### ヘルプ

[Datadog Flagsmith インテグレーション][2]により、Flagsmith から Datadog のイベントストリームにフラグ変更イベントを送信します。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Flagsmith にお問い合わせください。

- [Flagsmith サポート][4]

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Flagsmith のインテグレーションと Datadog Marketplace の製品を使って、機能をより早くリリースし、その影響を追跡する][5]

[1]: https://flagsmith.com/
[2]: https://app.datadoghq.com/integrations/flagsmith
[3]: https://docs.flagsmith.com/integrations/datadog
[4]: https://flagsmith.com/contact-us/
[5]: https://www.datadoghq.com/blog/flagsmith-datadog-marketplace/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/flagsmith-platform" target="_blank">こちらをクリック</a>してください。