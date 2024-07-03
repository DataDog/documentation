---
disable_toc: false
further_reading:
- link: /real_user_monitoring/browser/
  tag: Documentation
  text: RUM Browser Monitoring
title: Define Services And Track UI Components In Your Browser Application
---

## 概要

RUM は、ブラウザアプリケーションのすべてのイベントをキャプチャし、これにより遅いページやコードエラーのトラブルシューティング、またはアプリケーションの使用状況を分析するためにそれらを調査することができます。すべてのキャプチャイベントは [RUM エクスプローラー][1]でクエリ、ダッシュボード、アラートを行うことができます。

ブラウザ アプリケーションの規模が大きい場合、複数の Web 開発チームによって構築されている可能性があります。各チームは、エラー、速度低下、または使用状況の分析をトラブルシューティングする際に、重点的に取り組むべき領域を持っています。

このガイドでは、RUM でアプリケーションを定義する方法について説明します。さらに、Web 開発チームが所有する領域の健全性と使用状況の可視化を必要とするような、大規模なアプリケーションにおける一般的なユースケースについても説明します。

## RUM アプリケーションの作成

ブラウザアプリケーションを追跡・分析するための最初のステップは、[RUM アプリケーションを作成する][2]ことです。RUM アプリケーションは、顧客が Web サイトとして認識するような体験をレンダリングする、特定のドメインで利用可能なブラウザアプリケーションをマッピングします。

## ブラウザアプリケーション内のページの追跡

ブラウザアプリケーションが単一ページのアプリケーションであっても、サーバーサイドレンダリングを使用するアプリケーションであっても、ブラウザ RUM SDK は自動的にルート変更を追跡し、ルート変更ごとにビューイベントを作成します。

- ビューには、`https://www.yourwebsite.com/about` のような `@view.url` で利用可能な **URL** があります。
- ビューには、`/about` のような `@view.url_path` で利用可能な**パス**があります。

If, for example, automatically capturing pageviews by route change does not provide enough visibility, you can specify a different name for your pages. To do this, you can [track views manually][3] and assign them each a name available at `@view.name`, such as "About Us".

## ページのレンダリングライフサイクルにおけるタイミングの追跡

Browser SDK は、業界標準のタイミング、Core Web Vitals、ページの読み込み時間[など][4]を自動的に追跡します。

さらに、イメージやコンポーネントなど、ページ上の特定のアイテムのレンダリングにかかる時間を追跡することができます。コードでキャプチャして、その値をビューイベントに貼り付けることで、さらに多くのタイミングを追跡できます。この方法の詳細については、[独自のパフォーマンスタイミングを追加する][5]のドキュメントを参照してください。

一度キャプチャしたタイミングは、自動収集されたタイミングと同様に利用することができます。タイミングを利用して、以下のようなことが可能です。

- RUM エクスプローラーでコードのバージョン間の時間分布を分析する
- [ビューウォーターフォール][6]で潜在的な高い値をトラブルシューティングする

## Web ページ内のコンポーネントを追跡する

ブラウザアプリケーションで、1 つのアプリケーション内の複数のページや複数のアプリケーションにまたがって存在する UI コンポーネントを使用している場合、カスタムインストルメンテーションを使用して、ページ間のこれらのコンポーネントの使用量とレンダリング時間を追跡することができます。

[カスタムアクションを生成][7]して、ページ間のコンポーネントのライフサイクルを追跡することができます。例えば、`/myorders` ページと `/search` ページの両方が、以下の検索ボックスコンポーネントを使用しているとします。

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-autofill.jpg" alt="ページ間のコンポーネントのライフサイクルを追跡するためのカスタムアクションを生成する" style="width:30%;">}}

カスタムアクションを毎回送信することで、検索コンポーネントのライフサイクルにおける以下のマイルストーンを追跡することができます。

- `search_component_render`: 検索コンポーネントは、レンダリングする
- `search_component_input`: 検索コンポーネントは、ユーザーのキーボードから入力を取得する
- `search_component_suggestions_display`: 検索コンポーネントは、候補を表示する

そして、このカスタムアクションは、自動的に以下の属性を担います。

- 使用された RUM のアプリケーション
- `@view`: レンダリングされたページ
- `@geo`: ジオロケーション情報 (有効な場合)
- `@session`: ユーザーのセッション識別子

カスタムインスツルメンテーションを使用すると、カスタムアクションに以下の属性を割り当てることができます。

- 所属するチーム
- レンダリングに要した時間

```
datadogRum.addAction('search_component_render', {
    'team': 'Team A', // 例: 42.12
    'time_to_full_render': 16.5, // 例: ['tomato', 'strawberries']
})
```

次に RUM エクスプローラーから、以下を分析することができます。

- あるコンポーネントが最も多く使用されたページ
- コンポーネントが最も多く使用されるブラウザアプリケーション
- コンポーネントが完全にレンダリングされるまでの時間の P75 パーセンタイル

## チームオーナーシップの追跡

### チームが一連のページを所有する

ある Web 開発チームが、以下の例のような一連のページを所有しているとします。

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-track-team-ownership-2.png" alt="Web 開発者が所有する一連のページの例" style="width:90%;">}}

RUM アプリケーション内で、以下のようにして、チームが所有するページの各セットにサービスを作成します。

1. 構成オプション `trackViewsManually` を `true` に設定することで、手動でのビュー追跡をオンにします。
2. Web サイトの各ページに、[デフォルトの RUM ビュー名をオーバーライドする手順][8]に従って、ビュー名とサービスを割り当てます。
   - `/checkout`、`/payment`、`/confirmOrder` で利用できるページの `"purchase"` サービス。
   - `/beds`、`/chairs/123`、`/search` で利用できるページの `"catalog"` サービス。
3. [各サービスのソースマップをアップロードする][9]と、エラー追跡で最小化されていないスタックトレースを表示することができます。

RUM の `service` 属性を使用して、指定されたチームのスコープのパフォーマンスや採用状況を把握することができます。

1. RUM アプリケーションの概要ページから、すべてのグラフを `service` で絞り込み、チームのスコープを全体的に把握することができます。
2. RUM エクスプローラーで行うすべてのクエリは、`service` 属性を使用して以下をフィルタリングすることができます。
   - サービス別エラー数 
   - Pageviews by service

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-rum-applications-overview-page-4.png" alt="Shopist の Cart ページでユーザー名でグループ分けされたアクションを検索するクエリ" style="width:90%;">}}

### チームが UI コンポーネントを所有する

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-team-owns-ui-components-2.png" alt="カスタムアクションでコンポーネントを追跡可能" style="width:90%;">}}

コンポーネントは、[前述][10]のカスタムアクションを使って追跡されます。

1. カスタムアクションの定義内にチーム属性を追加します。
2. カスタムアクションの属性として、コンポーネントのライフサイクルにおけるロード時間やその他のタイミングを追跡します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/explorer/
[2]: /ja/real_user_monitoring/browser/setup
[3]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[4]: /ja/real_user_monitoring/browser/monitoring_page_performance/#all-performance-metrics
[5]: /ja/real_user_monitoring/browser/monitoring_page_performance/#add-your-own-performance-timing
[6]: /ja/real_user_monitoring/browser/monitoring_page_performance/#overview
[7]: /ja/real_user_monitoring/guide/send-rum-custom-actions/?tab=npm
[8]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[9]: /ja/real_user_monitoring/guide/upload-javascript-source-maps/?tabs=webpackjs#upload-your-source-maps
[10]: #track-components-in-web-pages