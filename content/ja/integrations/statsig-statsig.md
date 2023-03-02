---
app_id: statsig-statsig
app_uuid: 289b74cb-ad37-4a0e-98f5-4d5c6f3e3d19
assets:
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: ''
      metadata_path: metadata.csv
      prefix: statsig.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Statsig ライセンス
author:
  homepage: https://www.statsig.com
  name: Statsig
  sales_email: serviceadmin@statsig.com
  support_email: support@statsig.com
  vendor_id: statsig
categories:
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: statsig-statsig
integration_id: statsig-statsig
integration_title: Statsig
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: statsig-statsig
oauth: {}
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.statsig.log
  product_id: statsig
  short_description: Statsig ログイベント 1000 件あたりの単価
  tag: イベント
  unit_label: 1000 件の Statsig ログイベント
  unit_price: 0.1
public_title: Statsig
short_description: 顧客が必要とする機能をすばやく構築、計測、そして納品
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: 顧客が必要とする機能をすばやく構築、計測、そして納品
  media:
  - caption: Feature Gates を使用した新機能の安全なロールアウトとターゲット設定
    image_url: images/tile_gates.png
    media_type: image
  - caption: Feature Gate で自動的に生成される Pulse の結果から、機能がトップラインのメトリクスに与える影響を観察します
    image_url: images/tile_pulse.png
    media_type: image
  - caption: Ultrasound を使用して、メトリクスにポジティブまたはネガティブな影響を与える機能を特定します
    image_url: images/tile_ultrasound.png
    media_type: image
  - caption: Datadog で機能のデプロイメントが他のプロダクションスタックにどのような影響を与えるかを確認します
    image_url: images/tile_datadog_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Statsig
---



## 概要

[Statsig](https://www.statsig.com) を使用すると、機能のリリース前に安全に AB テストを実施し、製品に関する議論や納品ミスによるコストロスを削減できます。さらに、Statsig はイベントのログを作成するだけで試験が自動的に実行され、追加のコンフィギュレーションなしですべての新機能による影響が表示されるという点が特徴です。他のプラットフォームでは、実行するそれぞれの試験についてメトリクスを作成しサンプルサイズおよびセグメントのユーザーを計算する必要があるため、機能のパフォーマンスの確認が困難ですが、Statsig なら面倒な作業を省いて自動的に AB テストが常に実行され、機能のパフォーマンスを常時確認できます。

Facebook のエンジニア経験者からなるチームにより、さまざまなチームが数千の機能を正確にローンチできる同等のインフラストラクチャーを提供できるよう、Statsig が作成されました。

マーケットプレイスでのご提供には、Statsig のプラットフォームへのアクセスが含まれています。すでに Statsig をご利用の場合は、[Datadog Statsig インテグレーション](https://app.datadoghq.com/account/settings#integrations/statsig)で アカウントを Datadog に接続してインテグレーションをセットアップできます。

{{< img src="marketplace/statsig-statsig/images/statsig_pulse.png" alt="Statsig Pulse" >}}

{{< img src="marketplace/statsig-statsig/images/statsig_gates.png" alt="Statsig Gates" >}}

{{< img src="marketplace/statsig-statsig/images/statsig_metrics.png" alt="Statsig メトリクス" >}}

## 収集データ

### メトリクス

このインテグレーションにより提供されるメトリクスのリストおよびそれぞれの説明については、[metadata.csv](https://github.com/DataDog/marketplace/blob/master/statsig/metadata.csv) をご参照ください。

### イベント

Statsig インテグレーションにより、Statsig でのコンフィギュレーション変更イベントが Datadog に送信されます（たとえば、新規または更新された機能ゲートまたは新しいインテグレーションが有効になった時）。

## サポート

ヘルプが必要な場合は、Statsig サポート（support@statsig.com）または[弊社までお問い合わせ](https://www.statsig.com/contact)ください。

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/statsig-statsig" target="_blank">こちらをクリック</a>してください。