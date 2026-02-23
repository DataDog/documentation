---
algolia:
  subcategory: Marketplace インテグレーション
app_id: seagence-seagence
app_uuid: 194f32bb-fc70-41e5-a742-bcacc3db13ed
assets: {}
author:
  homepage: https://www.seagence.com
  name: Seagence Technologies
  sales_email: sales@seagence.com
  support_email: support@seagence.com
  vendor_id: seagence
categories:
- alerting
- 自動化
- マーケットプレイス
- 開発ツール
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: seagence_seagence
integration_id: seagence-seagence
integration_title: seagence
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: seagence_seagence
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.seagence.seagence
  product_id: seagence
  short_description: Seagence ライセンス/ホスト/月
  tag: ホスト
  unit_label: ホスト
  unit_price: 21
public_title: seagence
short_description: Realtime Defect Detection & Resolution tool that eliminates debugging.
supported_os:
- any
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Any
  - Category::Alerting
  - Category::Automation
  - Category::Marketplace
  - Category::Developer Tools
  - Offering::Software License
  configuration: README.md#Setup
  description: Realtime Defect Detection & Resolution tool that eliminates debugging.
  media:
  - caption: Seagence 欠陥概要ダッシュボード
    image_url: images/datadog-dashboard.png
    media_type: image
  - caption: トランザクションタイムラインビューは、欠陥トランザクションと成功トランザクションをハイライトします
    image_url: images/timeline.png
    media_type: image
  - caption: Seagence のクラスタリングは、欠陥トランザクションと成功トランザクションを別々のクラスターにグループ化します
    image_url: images/defect-and-success-clusters.png
    media_type: image
  - caption: トランザクションと例外のリスト
    image_url: images/list-of-transactions-and-exceptions.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: seagence
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

[Seagence][1] は、Java アプリケーション向けの本番運用レベルのリアルタイム不具合検出・解決ツールです。Seagence は独自のアプローチにより、マルチスレッドの問題や、飲み込まれた例外・処理済みの例外・未処理の例外などに起因する既知および未知の不具合をリアルタイムで検出します。これには、HTTP 200 (成功) ステータスコードに偽装された不具合も含まれます。不具合が検出されると、[すぐに使えるインテグレーション][5] によって Datadog にイベントを送信し、チームにアラート通知します。すぐに使えるダッシュボードは、検出された不具合とその根本原因の可視性を提供し、デバッグやトラブルシューティングを不要にします。不具合の詳細は [SeagenceWeb][2] をご覧ください。

Seagence は、Kubernetes デプロイ、マイクロサービス、モノリス、コンテナ、サーバーレスアプリケーションなどの本番環境および最新のアーキテクチャ向けにゼロから設計されています。

**リアルタイムの不具合検出**: Seagence は独自のアプローチにより、マルチスレッドの問題や、スローされたあらゆる例外 (処理済み・未処理・飲み込まれた) に起因する不具合をリアルタイムで検出します。Seagence の唯一の前提条件は、不具合が約 5 回発生することです (これが **Seagence の Think Time** です)。この前提条件が満たされると、Seagence は 6 回目以降のすべての発生をリアルタイムで検出し始めます。Seagence は、エンドユーザーが報告を開始する前でも、ログファイルに **トレースがない** 場合でも、不具合を検出します。

**デバッグとトラブルシューティングの排除**: デバッグやトラブルシューティングは必要ありません。Seagence が提供する欠陥と根本原因があれば、壊れたコードを修正し、MTTR を 3 日から半日に短縮できます。

**コードの変更は不要**: Seagence は小さな Java Agent を使用しているため、コードの変更は必要ありません。Seagence は、処理された例外、処理されていない例外、飲み込まれた例外を含め、すべてのエラーとスローされた例外を記録します。すべてのトランザクションに必要なすべてのコンテキストを得ることができます。

**クラスタリング**: クラスタリングを使うことで、ノイズの分析を排除できます。クラスタリングは類似したトランザクションをグループ化します。クラスター内のトランザクションを 1 件だけ分析すれば、そのクラスター内の 100 万件のトランザクションがどのように処理されているかがすぐにわかります。

## サポート

ご不明な点は、[Seagence のサポートチーム][4]までお問い合わせください。

[1]: https://www.seagence.com
[2]: https://app.seagence.com/SeagenceWeb/
[3]: https://seagence.com/product/getting-started/
[4]: mailto:support@seagence.com
[5]: https://app.datadoghq.com/integrations/seagence

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/seagence-seagence" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。