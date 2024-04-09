---
algolia:
  subcategory: Marketplace インテグレーション
app_id: statsig-statsig
app_uuid: 289b74cb-ad37-4a0e-98f5-4d5c6f3e3d19
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: statsig.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10188
    source_type_name: Statsig ライセンス
author:
  homepage: https://www.statsig.com
  name: Statsig
  sales_email: serviceadmin@statsig.com
  support_email: support@statsig.com
  vendor_id: statsig
categories:
- 構成 & デプロイ
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
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Marketplace
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
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
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

[Statsig][1] を使用すると、機能のリリース前に安全に A/B テストを実施し、製品に関する議論や納品ミスによるコストロスを削減できます。さらに、Statsig はイベントのログを作成するだけで試験が自動的に実行され、追加のコンフィギュレーションなしですべての新機能による影響が表示されるという点が特徴です。他のプラットフォームでは、実行するそれぞれの試験についてメトリクスを作成しサンプルサイズおよびセグメントのユーザーを計算する必要があるため、機能のパフォーマンスの確認が困難ですが、Statsig なら面倒な作業を省いて自動的に A/B テストが常に実行され、機能のパフォーマンスを常時確認できます。

Facebook のエンジニア経験者からなるチームにより、さまざまなチームが数千の機能を正確にローンチできる同等のインフラストラクチャーを提供できるよう、Statsig が作成されました。

Datadog Marketplace の製品には、Statsig のプラットフォームへのアクセスが含まれています。すでに Statsig をご利用の場合は、[Datadog Statsig インテグレーション][2]で アカウントを Datadog に接続してインテグレーションをセットアップできます。

{{< img src="marketplace/statsig-statsig/images/statsig_pulse.png" alt="Statsig Pulse" >}}

{{< img src="marketplace/statsig-statsig/images/statsig_gates.png" alt="Statsig Gates" >}}

{{< img src="marketplace/statsig-statsig/images/statsig_metrics.png" alt="Statsig メトリクス" >}}

## リアルユーザーモニタリング

### データセキュリティ

このインテグレーションによって提供されるメトリクスのリストについては、[metadata.csv][3] を参照してください。

### ヘルプ

Statsig インテグレーションにより、Statsig でのコンフィギュレーション変更イベントが Datadog に送信されます（たとえば、新規または更新された機能ゲートまたは新しいインテグレーションが有効になった時）。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Statsig サポートにお問い合わせください。

- メール: [support@statsig.com][4] 
- サポート: [Statsig][5]

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog マーケットプレイスの Statsig の提供とモニター機能のリリース][6]

[1]: https://www.statsig.com
[2]: https://app.datadoghq.com/integrations/statsig
[3]: https://console.statsig.com/sign_up
[4]: mailto:support@statsig.com
[5]: https://www.statsig.com/contact
[6]: https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/statsig-statsig" target="_blank">こちらをクリック</a>してください。