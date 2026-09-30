---
aliases:
- /ja/guides/templating/
- /ja/graphing/dashboards/
- /ja/guides/graphing
- /ja/graphing/miscellaneous/metrics_arithmetic
- /ja/graphing/faq/is-there-a-way-for-me-to-set-the-maximum-and-minimum-values-on-the-y-axis-of-a-graph
- /ja/graphing/faq/is-it-possible-to-adjust-the-y-axis-for-my-graphs
- /ja/graphing/
- /ja/dashboards/dashboards/
- /ja/dashboards/screenboards/
- /ja/dashboards/timeboards/
cascade:
  algolia:
    rank: 70
    tags:
    - snapshot
    - dashboards
description: データを可視化してインサイトを得る
further_reading:
- link: /dashboards/sharing/
  tag: ドキュメント
  text: Datadog 以外とグラフを共有
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: ベストプラクティス
  text: 優れたインテグレーションダッシュボードを作成する
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: ダッシュボードで視覚化を改善するためのインタラクティブセッションにご参加ください
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: ブログ
  text: ダッシュボードウィジェットをクリップボードに追加する
- link: https://www.datadoghq.com/blog/datadog-dashboards/
  tag: ブログ
  text: 新しい Datadog ダッシュボードエクスペリエンス
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: ブログ
  text: Datadog を使用して効果的なエグゼクティブ向けダッシュボードを設計する
- link: https://app.datadoghq.com/release-notes?category=Dashboards
  tag: リリースノート
  text: 最新の Datadog ダッシュボードのリリースをチェック！(アプリログインが必要です)
title: ダッシュボード
---
## 概要 {#overview}

ダッシュボードは、組織内のシステムやアプリケーションのパフォーマンスと健全性に関するインサイトをリアルタイムで提供します。それらを利用することによりユーザーは、データを視覚的に分析し、主要パフォーマンス指標 (KPI) を追跡したり、トレンドを効率的に監視したりすることができます。ダッシュボードを使用することでチームは、異常を特定し、問題を優先し、問題を事前に検出し、根本原因を診断し、信頼性目標が達成されることを確保できます。チームが情報に基づいた意思決定をし、システムの運用を最適化し、ビジネスの成功を促進できるように、重要な指標やパフォーマンス指標を監視・分析するための集中化された使いやすいインターフェースを提供します。

{{< whatsnext desc="ダッシュボードの機能:">}}
    {{< nextlink href="/dashboards/configure" >}}構成: ダッシュボードの構成オプションの概要{{< /nextlink >}}
    {{< nextlink href="/dashboards/list" >}}Dashboard List: ダッシュボードやリストを検索、表示、作成する{{< /nextlink >}}
    {{< nextlink href="/dashboards/template_variables" >}}テンプレート変数: ダッシュボード内のウィジェットを動的にフィルタリングする{{< /nextlink >}}
    {{< nextlink href="/dashboards/guide/datadog_clipboard/" >}}Datadog クリップボード{{< /nextlink >}}
    {{< nextlink href="/api/latest/dashboards" >}}API: プログラムでダッシュボードを管理する{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="グラフ機能:">}}
    {{< nextlink href="/dashboards/widgets" >}}ウィジェット: さまざまな視覚化の設定を学ぶ{{< /nextlink >}}
    {{< nextlink href="/dashboards/querying" >}}クエリ: グラフクエリのフォーマットオプションを見る{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions" >}}関数: メトリクスクエリと結果のグラフを修正する{{< /nextlink >}}
    {{< nextlink href="/dashboards/change_overlays" >}}オーバーレイ: グラフに変更イベントを自動的にオーバーレイする{{< /nextlink >}}
{{< /whatsnext >}}

## 始める {#get-started}

ダッシュボードを作成するには、次のようにします。
1. [Dashboard List][4] ページで、**+新しいダッシュボード**をクリックするか、ナビゲーションメニューから**新しいダッシュボード**を選択します。
2. ダッシュボードの名前を入力し、レイアウトオプションを選択します。

{{< img src="dashboards/create-dashboard.png" alt="新しいダッシュボードの追加" style="width:70%;">}}

ダッシュボード 
: 画像、グラフ、ログなどのさまざまなオブジェクトを含めることができるグリッドベースのレイアウト。これらは、リアルタイムで更新されるステータスボードやストーリーテリングビューとして広く使用されます。これにより過去の固定時点を表すことができます。最大幅は 12 グリッド平方であり、デバッグにも適しています。

タイムボード
: ダッシュボード全体で、固定またはリアルタイムのいずれかの単一時点を表す自動レイアウト。これらは、トラブルシューティング、相関関係、一般的なデータ探索のために広く使用されます。

スクリーンボード
: 画像、グラフ、ログなどのさまざまなオブジェクトを含めることができる自由形式のレイアウトのダッシュボード。これらは、リアルタイムで更新されるステータスボードや過去の固定ポイントを表すストーリーテリングビューとして広く使用されます。

{{< whatsnext desc="次の資料をご覧ください。" >}}
   {{< nextlink href="/getting_started/dashboards/" >}}ダッシュボードの概要{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}学習コース: ダッシュボードの紹介{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/building-better-dashboards" >}}学習コース: ダッシュボードの高度な活用法{{< /nextlink >}}
{{< /whatsnext >}}

## リフレッシュレート {#refresh-rate}

プライベートダッシュボードのリフレッシュレートは、表示している時間枠に依存します。時間枠が短いほど、データがより頻繁に更新されます。公開共有ダッシュボードは、選択された時間枠に関係なく、30 秒ごとに更新されます。

| 時間枠   | リフレッシュレート |
|--------------|--------------|
| 1 分     | 10 秒   |
| 2 分    | 10 秒   |
| 5 分    | 10 秒   |
| 10 分   | 10 秒   |
| 30 分   | 20 秒   |
| 1 時間     | 20 秒   |
| 3 時間     | 1 分      |
| 4 時間     | 1 分      |
| 1 日       | 3 分      |
| 2 日       | 10 分     |
| 1 週間     | 1 時間    |
| 1 か月     | 1 時間    |
| 3 か月     | 1 時間    |
| 6 か月     | 1 時間    |
| 1 年       | 1 時間    |

## モバイルデバイスでダッシュボードを表示する {#view-dashboards-on-mobile-devices}

[Apple App Store][2] や [Google Play Store][3] で提供されている Datadog モバイルアプリにより、モバイルフレンドリーなフォーマットでダッシュボードを表示することができます。モバイルアプリには、モバイルアプリを開かずにサービスの健全性やインフラストラクチャーを監視できるモバイルホーム画面ウィジェットが装備されています。

**注**: ダッシュボードの設定や編集を実行するには、Datadog のブラウザ UI にログインする必要があります。アプリのインストールに関する詳細は、[Datadog モバイルアプリ][1]のドキュメントを参照してください。

## 参考資料 {#further-reading}

{{< learning-center-callout header="Datadog ラーニングセンターでグラフウィジェットを作成してみてください。" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/dashboard-graph-widgets">}} 時系列、値のクエリ、トップリスト、テーブル、分布、円グラフのウィジェットを試してみてください。ウィジェットを設定する方法を学び、各ウィジェットタイプはどんな場面で使うのかを理解してください。{{< /learning-center-callout >}}

{{< learning-center-callout header="Datadog 学習センターでテーブル、リスト、SLO、アーキテクチャウィジェットを作成してみてください。" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/discovering-table-list-widgets">}} テーブル、リスト、SLO、アーキテクチャウィジェットを試してみてください。ウェブアプリケーションのメトリクスとパフォーマンスを追跡する方法、重要なデータをどのように提示するのかについて、詳細をご確認ください。{{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/dashboard/lists