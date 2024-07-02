---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "embrace-mobile-license"
"app_uuid": "2996b6e0-1aed-46cc-9fe5-4ea72aeae636"
"assets": {}
"author":
  "homepage": "https://embrace.io"
  "name": Embrace
  "sales_email": datadogsupport@embrace.io
  "support_email": datadogsupport@embrace.io
  "vendor_id": embrace
"categories":
- marketplace
- mobile
- network
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "embrace_mobile_license"
"integration_id": "embrace-mobile-license"
"integration_title": "Embrace Mobile License"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "embrace_mobile_license"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.embrace.mobile_license
  "product_id": mobile-license
  "short_description": "Pro plan includes full access to the Embrace platform. Custom pricing for large volume apps can be discussed with the 
sales team. Please reach out to datadogsupport@embrace.io for any questions regarding discounts."
  "tag": session
  "unit_label": 500,000 Sessions
  "unit_price": !!int "500"
"public_title": "Embrace Mobile License"
"short_description": "Mobile observability for iOS, Android, React Native, and Unity"
"supported_os":
- android
- ios
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Marketplace"
  - "Category::Mobile"
  - "Category::Network"
  - "Offering::Software License"
  - "Supported OS::Android"
  - "Supported OS::iOS"
  "configuration": "README.md#Setup"
  "description": Mobile observability for iOS, Android, React Native, and Unity
  "media":
  - "caption": Experience an overview of Embrace, the only observability and data platform built exclusively for mobile. With actionable data and insights derived from every user experience, companies can make optimal business decisions by understanding the true drivers of retention and revenue.
    "image_url": images/video_thumbnail.jpg
    "media_type": video
    "vimeo_id": !!int "619368139"
  - "caption": Monitor Embrace crash and networking data directly from Datadog by adding widgets.
    "image_url": images/datadog_dashboard.jpg
    "media_type": image
  - "caption": Investigate crashes by accessing every stack trace from every affected user session, alongside app and session details. For more context, navigate directly to the full user session replay in Embrace. 
    "image_url": images/datadog_side_panel.jpg
    "media_type": image
  - "caption": Embrace's user session replays provide the full technical and behavioral details of every user session in a time-based visualization. Instantly identify the root cause without having to manually reproduce issues.
    "image_url": images/embrace_session.jpg
    "media_type": image
  - "caption": Optimize key user flows by tracking timing, outcome, and user actions. Quickly identify where frustrated users are abandoning slow or frozen experiences and fix them to boost engagement and revenue.
    "image_url": images/embrace_app_performance.jpg
    "media_type": image
  - "caption": Monitor key metrics with real-time dashboards. Easily track performance, stability, engagement, monetization, and more so teams can focus on the data they care about.
    "image_url": images/embrace_dashboard.jpg
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/mobile-application-monitoring-embrace-datadog/"
  - "resource_type": documentation
    "url": "https://embrace.io/docs/"
  "support": "README.md#Support"
  "title": Embrace Mobile License
  "uninstallation": "README.md#Uninstallation"
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

#### ネットワーキング

Embrace は、サーバーに到達しなかったものも含め、すべてのネットワークコールを収集します。4xx、5xx、タイムアウト、接続エラーなど、エンドポイントでのすべてのエラーを確認できます。

---

Datadog から、Embrace プラットフォーム内のモバイル体験を最適化するために必要な実用的なデータとインサイトにすぐに移動できます。これには以下が含まれます。

#### ユーザーセッションリプレイ

再現の手間なく、あらゆるユーザーセッションを体験することができます。技術的、行動的な詳細をすべて再現し、横断可能なビジュアルにすることで、どのチームメンバーもすぐに質問や苦情に答えられるようにします。

#### アプリのパフォーマンス

モバイルアプリの健全性を正しく測定し、改善するために、ユーザー体験が損なわれている原因を理解します。クラッシュだけでなく、強制終了や主要なユーザーフローの放棄につながる遅延またはフリーズエリアを取り除くために、パフォーマンスを最適化します。

#### ダッシュボード

リアルタイムダッシュボードで、適応、パフォーマンス、安定性、エンゲージメント、収益化など、ビジネスにとって重要なメトリクスを確認できます。個人またはチームでダッシュボードを作成し、気になる機能や実験に焦点を当てます。

#### エラーログ

セッションとログのプロパティを設定し、強力なフィルタリングで根本原因を切り分けます。デバイス、バージョン、OS、地域、ユーザーセグメント、イベント属性に渡るパターンを発見し、ビジネスへの影響や問題の改善の優先度を把握することができます。

#### プロアクティブアラート

機能やリリースのパフォーマンスや安定性の低下について、いち早くお知らせします。不具合の原因がコードにあるのか、バックエンドにあるのか、サードパーティの SDK やベンダーにあるのか、Embrace がリアルタイムで通知するので、ユーザーから苦情が来る前に対策を講じることができます。

## サポート
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
