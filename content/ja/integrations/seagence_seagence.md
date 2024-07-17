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
custom_kind: integration
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
  unit_label: Host
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

[Seagence][1] is a production-grade Realtime Defect Detection and Resolution tool for Java applications. Using a unique approach, Seagence detects known and unknown defects in real time caused by multithreading issues, swallowed, handled, and unhandled exceptions, and others, including defects disguised in a 200 success HTTP response code. When a defect is detected, our [out-of-the-box integration][5] will send an event to Datadog to alert your team. The out-of-the-box dashboard provides visibility into the detected defects and root causes to eliminate debugging and troubleshooting. More details about the defect can be found on [SeagenceWeb][2].

Seagence は、Kubernetes デプロイ、マイクロサービス、モノリス、コンテナ、サーバーレスアプリケーションなどの本番環境および最新のアーキテクチャ向けにゼロから設計されています。

**Realtime Defect Detection**: Using a unique approach, Seagence detects defects in real time due to multithreading issues, and any thrown exception including handled, unhandled, and swallowed exceptions. The only prerequisite for Seagence is, the defect needs to occur approximately 5 times (This is **Seagence's Think Time**). When that prerequisite is met, Seagence will start detecting every occurrence of the defect from the 6th occurrence onward in real time. Seagence detects defects even before end users start reporting them and even if log files have **no trace**.

**デバッグとトラブルシューティングの排除**: デバッグやトラブルシューティングは必要ありません。Seagence が提供する欠陥と根本原因があれば、壊れたコードを修正し、MTTR を 3 日から半日に短縮できます。

**コードの変更は不要**: Seagence は小さな Java Agent を使用しているため、コードの変更は必要ありません。Seagence は、処理された例外、処理されていない例外、飲み込まれた例外を含め、すべてのエラーとスローされた例外を記録します。すべてのトランザクションに必要なすべてのコンテキストを得ることができます。

**Clustering**: Using clustering you stop analyzing noise. Clustering groups similar transactions. Analyze 1 transaction of the cluster and immediately come to know how 1 million transactions of that cluster are processed.

## サポート

ご不明な点は、[Seagence のサポートチーム][4]までお問い合わせください。

[1]: https://www.seagence.com
[2]: https://app.seagence.com/SeagenceWeb/
[3]: https://seagence.com/product/getting-started/
[4]: mailto:support@seagence.com
[5]: https://app.datadoghq.com/integrations/seagence

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/seagence-seagence" target="_blank">こちらをクリック</a>してください。