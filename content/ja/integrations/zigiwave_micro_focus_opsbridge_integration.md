---
algolia:
  subcategory: Marketplace インテグレーション
app_id: zigiwave-micro-focus-opsbridge-integration
app_uuid: b904a102-65fe-4e4d-b693-e4ab98086277
assets:
  dashboards:
    ZigiWave Incidents Dashboard: assets/dashboards/ZigiWaveOpsBridge_DataDogIncidentDashboard.json
author:
  homepage: https://zigiwave.com
  name: ZigiWave
  sales_email: info@zigiwave.com
  support_email: support@zigiwave.com
  vendor_id: zigiwave
categories:
- event management
- インシデント
- マーケットプレイス
- メトリクス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: zigiwave_micro_focus_opsbridge_integration
integration_id: zigiwave-micro-focus-opsbridge-integration
integration_title: OpsBridge
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: zigiwave_micro_focus_opsbridge_integration
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: micro-focus-opsbridge-integration
  short_description: 接続された Datadog/MF OpsBridge インスタンス 1 対の月額ライセンス
  unit_price: 750.0
public_title: OpsBridge
short_description: Datadog と OpsBridge のノーコードインテグレーション
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Event Management
  - Category::Incidents
  - Category::Marketplace
  - Category::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  - Submitted Data Type::Incidents
  configuration: README.md#Setup
  description: Datadog と OpsBridge のノーコードインテグレーション
  media:
  - caption: Datadog で利用可能なインテグレーションテンプレート
    image_url: images/datadog_market_2.jpg
    media_type: image
  - caption: ZigiOps トポロジーダッシュボード
    image_url: images/datadog_marketplace_dashboard_6.jpg
    media_type: image
  - caption: ZigiOps メトリクスダッシュボード
    image_url: images/datadog_marketplace_4.jpg
    media_type: image
  - caption: Datadog にインシデントを転送するための ZigiOps のインテグレーション
    image_url: images/OpsBridge-DataDog-Incidents.jpg
    media_type: image
  - caption: Datadog インシデントダッシュボード
    image_url: images/ddog_mf_integration-dashboard.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: OpsBridge
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->



## 概要

ZigiOps は、最も柔軟でコード不要のインテグレーションプラットフォームです。ZigiOps 製品は、お客様のビジネスが IT 環境における問題をこれまで以上に迅速に特定し、報告し、解決することを支援します。ZigiOps をソフトウェアエコシステムに統合することで、ITSM、ITOM、DevOps のための一般的な企業向けソフトウェアツール (Jira、ServiceNow、VMware vROps、Micro Focus Ops Bridge、BMC、チャーウェル、スプランク、その他) に接続することが可能です。

### ZigiOps による Datadog – Micro Focus OBM インテグレーション

ZigiWave Datadog - OpsBridge のインテグレーションにより、OpsBridge からインシデントを抽出し、Datadog に入力することができます。ZigiOps は、インシデントの概要、検出方法、深刻度、ステータスなど、すべてのフィールドを同期します。このインテグレーションは双方向なので、Datadog または OpsBridge のいずれかに更新があると、ZigiOps は自動的にその更新を関連システムに送信します。


Datadog オートディスカバリーは、OpsBridge データベースにないものの、監視が必要なホストを検出します。ZigiOps は、ホスト情報を取得して OpsBridge RTSM にレポートし、Datadog からのデータでトポロジー情報をリッチ化します。トポロジーは、ZigiOps による定期的なチェックで最新に保たれます。

ZigiOps は、Datadog のイベントを収集し、イベントとして OpsBridge に報告します。
このプラットフォームは、メトリクスやトポロジーなど、関連するホストの詳細をすべて同期します。

ZigiOps は Datadog のメトリクスを収集し、関連するホスト情報とともに MF Operations Connector にレポートします。これらのメトリクスは、OpsBridge Performance Perspective からアクセスでき、ダッシュボードの構築に使用することができます。

このインテグレーションにより、IT 運用チームは OpsBridge インフラストラクチャーを俯瞰的に把握し、問題が現実の問題となる前に検出できるようになります。

### トポロジー、メトリクス、イベント、インシデント

ZigiOps では、Datadog - Micro Focus OBM インテグレーションの 4 つのユースケースに対して、完全にカスタマイズ可能なインテグレーションテンプレートを提供しています。このテンプレートにより、ユーザーはデータの流れを素早く確認し始めることができます。ユーザーは、テンプレートで提供されるデータマッピングとフィルターを、ユースケースに合わせて変更することができます。現在利用できるテンプレートは、OpsBridge イベント - Datadog インシデント、Datadog イベント - OpsBridge イベント、Datadog メトリクス - OBM メトリクス、Datadog ホスト - OBM トポロジーです。ユースケースがこれらのテンプレートのどれにも当てはまらない場合、ゼロから独自のインテグレーションを作成することもできます。インテグレーションコンサルタントが、その方法を指導します。

## Agent

ZigiWave は、ユーザーの皆様に最高のカスタマーエクスペリエンスを提供することに専念しています。 既存ユーザーの方は、support.zigiwave.com からチケットを送信していただくか、弊社チームまでメール (support@zigiwave.com) をお送りください。

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/zigiwave-micro-focus-opsbridge-integration" target="_blank">こちらをクリック</a>してください。