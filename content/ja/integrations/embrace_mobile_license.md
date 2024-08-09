---
algolia:
  subcategory: Marketplace インテグレーション
app_id: embrace-mobile-license
app_uuid: 2996b6e0-1aed-46cc-9fe5-4ea72aeae636
assets: {}
author:
  homepage: https://embrace.io
  name: Embrace
  sales_email: datadogsupport@embrace.io
  support_email: datadogsupport@embrace.io
  vendor_id: embrace
categories:
- マーケットプレイス
- モバイル
- ネットワーク
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: embrace_mobile_license
integration_id: embrace-mobile-license
integration_title: Embrace モバイルライセンス
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: embrace_mobile_license
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.embrace.mobile_license
  product_id: mobile-license
  short_description: Pro プランには、Embrace プラットフォームへのフルアクセスが含まれます。大容量アプリのカスタム価格は、営業チームと相談可能です。割引に関するご質問は、datadogsupport@embrace.io
    までご連絡ください。
  tag: セッション
  unit_label: 500,000 セッション
  unit_price: 500
public_title: Embrace モバイルライセンス
short_description: iOS、Android、React Native、Unity のためのモバイル可観測性
supported_os:
- android
- ios
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Mobile
  - Category::Network
  - Offering::Software License
  - Supported OS::Android
  - Supported OS::iOS
  configuration: README.md#Setup
  description: iOS、Android、React Native、Unity のためのモバイル可観測性
  media:
  - caption: モバイル専用に構築された唯一の可観測性とデータのプラットフォームである Embrace を体験してください。あらゆるユーザー体験から得られる実用的なデータと洞察により、企業はリ保持と収益の真のドライバーを理解することで、最適なビジネス決定を下すことができます。
    image_url: images/video_thumbnail.jpg
    media_type: ビデオ
    vimeo_id: 619368139
  - caption: ウィジェットを追加して、Datadog から直接 Embrace のクラッシュおよびネットワーキングデータを監視。
    image_url: images/datadog_dashboard.jpg
    media_type: image
  - caption: 影響を受けたすべてのユーザーセッションから、すべてのスタックトレースにアクセスして、アプリおよびセッションの詳細情報と共にクラッシュを調査。さらに、Embrace
      でユーザーセッションの完全なリプレイに直接移動し、詳しいコンテキストを把握できます。
    image_url: images/datadog_side_panel.jpg
    media_type: image
  - caption: Embrace のユーザーセッションリプレイにより、ユーザーセッションの技術的および行動的詳細を時間単位で視覚化。問題を手動で再生しなくても、根本原因をすばやく認識できます。
    image_url: images/embrace_session.jpg
    media_type: image
  - caption: タイミング、結果、そしてユーザーアクションを追跡して主要なユーザーフローを最適化。動作の遅延やフリーズに不満を感じたユーザーが使用を放棄した箇所をすばやく特定、修正し、エンゲージメントおよび収益の強化を図ります。
    image_url: images/embrace_app_performance.jpg
    media_type: image
  - caption: リアルタイムダッシュボードで主要なメトリクスを監視。パフォーマンス、安定性、エンゲージメント、収益化などを簡単に追跡できるため、チームは重要なデータに注力できます。
    image_url: images/embrace_dashboard.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Embrace モバイルライセンス
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

### Embrace とは？

[Embrace][1] は、モバイルチームが最高のユーザー体験を提供できるよう、パフォーマンスの最適化、問題の優先順位付けと修正作業、そして機能やリリース、カスタムセグメントの監視を可能にするモバイル可観測性およびデータのプラットフォームです。Embrace では、複雑なモバイルデータをアクションに変換できます。あらゆるすべてのユーザーエクスペリエンスの包括的なセッションレベルデータを収集することで、Embrace は強力なインサイトを抽出しビジネスの成長を促進します。

インテグレーションをインストールすると、Embrace のダッシュボードでモバイルの主要なヘルスメトリクスを追跡できるようになります。パフォーマンスの低下があった場合、手動でユーザーセッションを再生しなくても、影響のあったセッションの完全な詳細を調査することができます。

### Embrace Datadog ダッシュボード

Datadog ダッシュボードは、クラッシュやネットワークに関するクライアント側の Embrace データをサーバー側のデータに接続します。

#### クラッシュ

Datadog で直接、クラッシュの傾向を監視し、すべてのクラッシュのスタックトレースを調査します。さらに、Embrace でユーザーセッションの詳細を確認することができます。

#### SSL

Embrace は、サーバーに到達しなかったものも含め、すべてのネットワークコールを収集します。4xx、5xx、タイムアウト、接続エラーなど、エンドポイントでのすべてのエラーを確認できます。

---

Datadog から、Embrace プラットフォーム内のモバイル体験を最適化するために必要な実用的なデータとインサイトにすぐに移動できます。これには以下が含まれます。

#### ユーザーセッションリプレイ

再現の手間なく、あらゆるユーザーセッションを体験することができます。技術的、行動的な詳細をすべて再現し、横断可能なビジュアルにすることで、どのチームメンバーもすぐに質問や苦情に答えられるようにします。

#### アプリのパフォーマンス

モバイルアプリの健全性を正しく測定し、改善するために、ユーザー体験が損なわれている原因を理解します。クラッシュだけでなく、強制終了や主要なユーザーフローの放棄につながる遅延またはフリーズエリアを取り除くために、パフォーマンスを最適化します。

#### ライブラリ

リアルタイムダッシュボードで、適応、パフォーマンス、安定性、エンゲージメント、収益化など、ビジネスにとって重要なメトリクスを確認できます。個人またはチームでダッシュボードを作成し、気になる機能や実験に焦点を当てます。

#### エラーログ

セッションとログのプロパティを設定し、強力なフィルタリングで根本原因を切り分けます。デバイス、バージョン、OS、地域、ユーザーセグメント、イベント属性に渡るパターンを発見し、ビジネスへの影響や問題の改善の優先度を把握することができます。

#### プロアクティブアラート

機能やリリースのパフォーマンスや安定性の低下について、いち早くお知らせします。不具合の原因がコードにあるのか、バックエンドにあるのか、サードパーティの SDK やベンダーにあるのか、Embrace がリアルタイムで通知するので、ユーザーから苦情が来る前に対策を講じることができます。

## Agent
サポートやご質問は、以下のチャンネルから Embrace にお問い合わせください。

メール: [datadogsupport@embrace.io][4] 

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Marketplace の Embrace の製品を使ってモバイルアプリを監視する][6]
- [Embrace ドキュメント][2]

[1]: https://embrace.io
[2]: https://embrace.io/docs/
[3]: https://dash.embrace.io
[4]: mailto:datadogsupport@embrace.io
[5]: https://app.datadoghq.com/integrations/embrace-mobile
[6]: https://www.datadoghq.com/blog/mobile-application-monitoring-embrace-datadog/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/embrace-mobile-license" target="_blank">こちらをクリック</a>してください。