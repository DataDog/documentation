---
aliases:
- /ja/real_user_monitoring/product_analytics
- /ja/real_user_monitoring/guide/rum-for-product-analytics
description: Product Analytics は、アプリケーションの使用状況を一目で把握するのに役立ちます。
further_reading:
- link: /product_analytics/analytics_explorer/
  tag: ドキュメント
  text: Analytics Explorer
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: ラーニングセンター
  text: Product Analytics の利用を開始する
- link: https://learn.datadoghq.com/courses/define-user-behavior-with-labeled-actions-in-product-analytics
  tag: ラーニングセンター
  text: Product Analytics でラベル付きアクションを使用してユーザーの行動を定義する
- link: https://www.datadoghq.com/blog/product-signal-latency-gap/
  tag: ブログ
  text: 成長を鈍化させる製品シグナルのレイテンシーギャップ
- link: https://www.datadoghq.com/blog/ai-summaries-and-smart-chapters/
  tag: ブログ
  text: AI 要約とスマートチャプターで Session Replay をより迅速に把握する
- link: https://www.datadoghq.com/blog/product-data-best-practices
  tag: ブログ
  text: 製品データが実際に示していること
- link: https://www.datadoghq.com/blog/guardrail-metrics
  tag: ブログ
  text: ガードレールメトリクスを活用してリリースの過剰なモニタリングを避ける
- link: https://www.datadoghq.com/blog/product-analytics-faster-decisions
  tag: ブログ
  text: Datadog Product Analytics を使用して、より迅速かつ的確な製品に関する意思決定を行う
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: ブログ
  text: 'パフォーマンスからインパクトへ: 共有コンテキストを通じてフロントエンドチームをつなぐ'
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: ブログ
  text: Product Analytics を活用してデータドリブンな設計の意思決定を行う
title: Product Analytics
---
{{< learning-center-callout header="ラーニングセンターで Product Analytics を利用し始めてみてください" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/getting-started-product-analytics">}}
  Datadog のトライアルアカウントを使用して、有意義なデジタル製品メトリクスを定義し、Product Analytics で視覚化する方法を学習します。今すぐ無料で登録しましょう
{{< /learning-center-callout >}}

## 概要{#overview}

Product Analytics は、ユーザー行動に関する洞察を得て、データに基づく意思決定を行うのに役立ちます。アプリケーションにおける以下のユースケースをサポートしています。

- [製品の定着状況の把握 ](#understand-product-adoption)
- [コンバージョン率とその経時的な変化の追跡 ](#track-conversion-rates-and-their-evolution-over-time)
- [主要なユーザー行動パターンの追跡 ](#track-key-user-behavior-patterns)
- [ユーザーインタラクションの視覚化 ](#visualize-user-interactions)

## アプリケーションのインスツルメンテーション {#instrument-your-application}

Product Analytics は、Datadog SDK を通じてクライアント側のユーザーアクティビティデータを収集します。API を通じてサーバー側イベントを送信し、クライアント側データを補完することもできます。

開始するには、アプリケーションに[Datadog SDK を追加](#track-client-side-events-sdk)し、Datadog で[Product Analytics を有効](#enable-product-analytics)にします。[API 経由でサーバー側イベントを送信](#track-server-side-events-api)することもできます。

<div class="alert alert-info">Product Analytics は、<a href="/real_user_monitoring/#what-is-real-user-monitoring">Real User Monitoring (RUM) </a>と同じ SDK および構成を使用し、デフォルトで 15 か月間データを保持します。詳細については、<a href="/data_security/data_retention_periods/">Datadog のデータ保持期間</a>を参照してください。</div>

### クライアント側イベントの追跡 (SDK) {#track-client-side-events-sdk}

ユーザーのデバイスからページビューやボタンクリックなどのイベントを収集し、Datadog に送信します。

Datadog SDK をアプリケーションに追加して、ユーザーアクティビティデータの収集を開始します。すでに RUM を構成している場合、Product Analytics に再度アプリケーションをインスツルメントする必要はありません。

Datadog でまだアプリケーションを設定していない場合は、プラットフォームの手順に従ってください。

- [Browser][14]
- [iOS][15]
- [Android][16]

コーディングアシスタントを使用してアプリケーションを設定するには、[Agentic onboarding][17] を参照してください。

### サーバー側イベントの追跡 (API) {#track-server-side-events-api}

クライアント側の収集を設定した後、[Product Analytics API][21] を使用して、チェックアウトの完了や支払い処理などのカスタムイベントをサーバーから送信できます。詳細については、[サーバー側イベントの追跡][22]を参照してください。

<div class="alert alert-warning">Datadog はサーバー側イベントに個別に課金します。詳細については、<a href="https://www.datadoghq.com/pricing/?product=product-analytics#products">料金ページ</a>を参照してください。さらにご質問がございましたら、カスタマーサクセスマネージャーまでお問い合わせください。</div>

## Product Analytics の有効化 {#enable-product-analytics}

ユーザーの行動を監視するアプリケーションごとに、Product Analytics を有効にします。

1. Datadog で、{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Real User Monitoring{{< /ui >}} > [{{< ui >}}Manage Applications{{< /ui >}}][9] に移動します。{{< ui >}}Active{{< /ui >}} の下にあるアプリケーションリストで、監視するアプリケーションを選択します。
2. {{< ui >}}PRODUCT SETTINGS{{< /ui >}} の下で、{{< ui >}}Product Analytics{{< /ui >}} をクリックします。
3. [{{< ui >}}Enable{{< /ui >}}] ボタンをクリックします。

{{< img src="product_analytics/enable-product-analytics.png" alt="アプリケーション管理ページから Product Analytics を有効にします。">}}

## データを把握する {#understand-your-data}
Datadog SDK は、セッション、ビュー、アクションという 3 つのレベルのクライアント側ユーザーデータ: を自動的に収集します。RUM イベントの詳細については、[RUM イベント階層を理解する][19] を参照してください。SDK を設定してから、[Product Analytics API][21] 経由でサーバー側イベントを送信することもできます。

**セッション**
: セッションとは、ユーザーがアプリケーションを開いてから離れるまでの、ジャーニー全体のことです。

**ビュー**
: ビューとは、ユーザーがセッション内でアクセスする各ページや画面のことです。

**アクション**
: アクションとは、クリック、タップ、スクロールなど、ユーザーがページ上で行う操作のことです。アクションは、RUM SDK に自動的に収集されます。[ファネル][4]や[セグメント][6]などの機能を構成する際、特定のアクションをステップやフィルターとして選択できます。利用可能なアクションを確認するには、[RUM Explorer][20] を開き、{{< ui >}}Actions{{< /ui >}} でフィルターします。

**サーバー側イベント**
: サーバー側イベントとは、チェックアウトの完了や支払い処理など、[Product Analytics API][21] 経由で送信されるカスタムイベントのことです。イベントピッカーで {{< ui >}}Server Events{{< /ui >}} を選択し、分析のスコープをサーバー側データに絞り込みます。

## Product Analytics UI の操作 {#navigate-the-product-analytics-ui}
Product Analytics の各機能は、ユーザーのジャーニーに関するコンテキストを提供します。

### 製品の定着状況の把握 {#understand-product-adoption}
[ホーム][3]ページでは、ユーザーのアクティビティと製品の定着状況を俯瞰できます。Product Analytics にアクセスした際に最も頻繁に表示されるページです。

{{< img src="/product_analytics/pana_home_page.png" alt="ファネル分析でエンドツーエンドのコンバージョンを把握します。">}}

デフォルトでは、このページには `active users`、`page views`、および `average time spent by user` のチャートが表示されますが、それ以外のチャートやダッシュボードを追加することもできます。ホームページには、製品のユーザーや使用状況に関するコンテキストを提供する、以下の標準サブセクションも含まれています。

[ユーザー ](https://app.datadoghq.com/product-analytics/user-trends)
: どのユーザーが製品を使用しているかを一目で確認できます。

[アプリとデバイス ](https://app.datadoghq.com/product-analytics/app-and-devices)
: デスクトップとモバイルの使用割合を視覚化し、使用中のバージョンを特定し、非推奨にできるものを特定します。

[エンゲージメント ](https://app.datadoghq.com/product-analytics/engagement-and-features)
: ユーザーが製品とどのように関わっているかを把握し、ユーザーがページに滞在している時間や、最も頻繁に行っているアクションなどの質問に答えます。

[トラフィック ](https://app.datadoghq.com/product-analytics/traffic-and-acquisition)
: 直帰率、主要なトラフィックソース、および真の増加要因を確認できます。

[パフォーマンス ](https://app.datadoghq.com/product-analytics/performance)
: よくあるエラーや不満を表示し、それらが具体的にどのビューに影響を与えているかを確認できます。

<br>


### コンバージョン率とその経時的な変化の追跡 {#track-conversion-rates-and-their-evolution-over-time}
Product Analytics のチャートは、ユーザーが製品を使用する際のジャーニーを視覚化するのに役立ちます。

{{< img src="/product_analytics/pana_charts_video.mp4" alt="チャートを使用してユーザージャーニーを視覚化します。" video="true">}}

各チャートタイプは、ユーザーのジャーニーに異なるビューを提供します。

[Pathways][5]
: アプリケーション全体ですべてのユーザージャーニーを視覚化し、クリティカルパスを分析します。

[ファネル][4]
: エンドツーエンドのユーザージャーニーにおける重要なワークフロー全体のコンバージョン率を追跡し、ボトルネックを特定して対処します。<br>たとえば、Web サイトのパフォーマンス低下により、ある時点で顧客が離れてしまったかどうかを確認したり、ワークフローに新しいステップを追加することが離脱率にどのような影響を与えるかを測定したりすることができます。

[リテンション][2]
: ユーザーが、ページやアクションにどれくらいの頻度で戻ってきているかを測定し、全体的なユーザー満足度に関するインサイトを得ます。

[Analytics][13]
: 使用状況のデータを集計し、ユーザーが製品とどのように関わっているかを表示します。

<br>

### 主要なユーザー行動パターンの追跡 {#track-key-user-behavior-patterns}
[ユーザーとセグメント][6]を使用して、共通の特性に基づいてユーザーをグループ化します。たとえば、ユーザーが商品をカートに追加しているにもかかわらずチェックアウトしていないことに気付いた場合、それらのユーザーのセグメントを作成し、購入を完了するように促すメールを送信します。

{{< img src="/product_analytics/segmentation/userprofiles_pana-ga.png" alt="ユーザーの個別プロファイルを表示し、これらのプロファイルからセグメントを作成します。">}}

### ユーザーインタラクションの視覚化 {#visualize-user-interactions}
ユーザーがどのようにページをナビゲートしているか、他のパスよりも多く利用されているパスがあるか、あるいはアクションやフローをよりスムーズにできる箇所はどこかを確認することで、アプリケーション UI の変更など、製品変更の意思決定に役立てるために以下の機能を使用してください。

{{< img src="/product_analytics/pana_session_replay_page.png" alt="ユーザーのブラウジング体験をキャプチャして再生し、製品設計の意思決定に役立てます。">}}

[Session Replay][11] 
: ユーザーの Web ブラウジングまたはモバイルアプリ体験をキャプチャして再生します。<br><br>これにより、エラーの特定、再現、解決に役立ち、アプリケーションの使用パターンや設計上の落とし穴に関する洞察を把握することができます。

[ヒートマップ][10]
: Session Replay データに重ね合わせて、ユーザーのインタラクションを視覚化します。Product Analytics には、: クリックマップ、トップ要素、スクロールマップという 3 種類のヒートマップがあります。<br><br>ヒートマップを使用して複雑なデータを一目で確認し、ユーザーエクスペリエンスの最適化に関するインサイトを得ることができます。

[プレイリスト][12]
: Session Replay のプレイリストを作成して、気づいたパターンで整理することができます。[Session Replay プレイリスト][12]について詳しくはこちらをご覧ください。
<br>


## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/product_analytics/charts/retention_analysis
[3]: https://app.datadoghq.com/product-analytics
[4]: /ja/product_analytics/charts/funnel_analysis
[5]: /ja/product_analytics/charts/pathways
[6]: /ja/product_analytics/segmentation/
[9]: https://app.datadoghq.com/rum/list
[10]: /ja/session_replay/heatmaps
[11]: /ja/session_replay/
[12]: /ja/session_replay/playlists
[13]: /ja/product_analytics/charts/analytics_explorer
[14]: /ja/real_user_monitoring/application_monitoring/browser
[15]: /ja/real_user_monitoring/application_monitoring/ios
[16]: /ja/real_user_monitoring/application_monitoring/android
[17]: /ja/product_analytics/agentic_onboarding
[19]: /ja/real_user_monitoring/guide/understanding-the-rum-event-hierarchy
[20]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aaction
[21]: /ja/api/latest/product-analytics/#send-server-side-events
[22]: /ja/product_analytics/data_collected/server_side_events/