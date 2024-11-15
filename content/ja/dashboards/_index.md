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
    - スナップショット
    - ダッシュボード
description: データを可視化して詳細な情報を把握
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Dashboards
  tag: リリースノート
  text: Datadog ダッシュボードの最新リリースをチェック！ (アプリログインが必要です)。
- link: /dashboards/sharing/
  tag: ドキュメント
  text: Datadogの外部でグラフを共有
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: ブログ
  text: ダッシュボードウィジェットをクリップボードに追加する
- link: https://www.datadoghq.com/blog/datadog-dashboards/
  tag: ブログ
  text: 新しい Datadog ダッシュボードエクスペリエンス
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: ベストプラクティス
  text: 優れたインテグレーションダッシュボードを作成する
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: ダッシュボードで視覚化を改善するためのインタラクティブセッションにご参加ください
title: ダッシュボード
---

## 概要

ダッシュボードは、組織内のシステムとアプリケーションのパフォーマンスと健全性に関するリアルタイムの洞察を提供します。これにより、ユーザーはデータを視覚的に分析し、キーパフォーマンス指標 (KPI) を追跡し、傾向を効率的に監視できます。ダッシュボードを使用することで、チームは異常の特定、問題の優先順位付け、問題のプロアクティブな検出、根本原因の診断、信頼性目標の達成を確実にすることができます。重要なメトリクスとパフォーマンス指標をモニタリングおよび分析するための一元化された使いやすいインターフェイスを提供することで、十分な情報に基づいた意思決定、システム運用の最適化、ビジネスの成功へと導く力をチームに与えます。

{{< whatsnext desc="ダッシュボード機能:">}}
    {{< nextlink href="/dashboards/configure" >}}Configure: ダッシュボードの構成オプションの概要{{< /nextlink >}}
    {{< nextlink href="/dashboards/list" >}}Dashboard List: ダッシュボードやリストを検索、表示、作成{{< /nextlink >}}
    {{< nextlink href="/dashboards/template_variables" >}}Template Variable: ダッシュボードのウィジェットを動的にフィルタリング{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/datadog_clipboard/" >}}Datadog Clipboard{{< /nextlink >}}
    {{< nextlink href="/api/latest/dashboards" >}}API: ダッシュボードをプログラムで管理{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="グラフ機能:">}}
    {{< nextlink href="/dashboards/widgets" >}}ウィジェット: さまざまな視覚化の構成を学ぶ{{< /nextlink >}}
    {{< nextlink href="/dashboards/querying" >}}クエリ: グラフクエリのフォーマットオプションを参照{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions" >}}関数: メトリクスクエリとその結果のグラフを修正{{< /nextlink >}}
    {{< nextlink href="/dashboards/change_overlays" >}}オーバーレイ: 変更イベントを自動的にグラフにオーバーレイ{{< /nextlink >}}
{{< /whatsnext >}}

## 詳細はこちら

{{< whatsnext desc="以下のリソースをご覧ください:" >}}
   {{< nextlink href="/getting_started/dashboards/" >}}ダッシュボードを始める{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}学習コース: ダッシュボード入門{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/building-better-dashboards" >}}学習コース: より良いダッシュボードの構築{{< /nextlink >}}
{{< /whatsnext >}}

ダッシュボードを作成するには、[ダッシュボードリスト][4]ページの **+New Dashboard** をクリックするか、ナビゲーションメニューから **New Dashboard** をクリックします。ダッシュボード名を入力し、レイアウトオプションを選択します。

{{< img src="dashboards/create-dashboard.png" alt="新しいダッシュボードの追加" style="width:70%;">}}

ダッシュボード
: 画像、グラフ、ログなどのさまざまなオブジェクトを含めることができるグリッドベースのレイアウト。これは通常、ステータスボードやストーリーテリングビューとして使用され、リアルタイムで更新され、過去の定点を表すことができます。グリッドの幅は最大 12 マスで、デバッグにも適しています。

タイムボード
: ダッシュボード全体を定刻またはリアルタイムで表示する自動レイアウト。通常、トラブルシューティング、共同作業、一般データの調査に使用します。

スクリーンボード
: 画像やグラフ、ログなど、様々なオブジェクトを含めることができる自由形式のレイアウトのダッシュボード。リアルタイムに更新されたり、過去の定点を示すステータスボードやストーリーテリングビューとして使われるのが一般的です。

## リフレッシュレート

プライベートダッシュボードのリフレッシュレートは、表示している時間枠によって異なります。時間枠が短ければ短いほど、データの更新頻度は高くなります。公開共有ダッシュボードは、選択した時間枠に関係なく、30 秒ごとに更新されます。

| 時間枠   | リフレッシュレート |
|--------------|--------------|
| 1 分     | 10 秒   |
| 2 分    | 10 秒   |
| 5 分    | 10 秒   |
| 10 分   | 10 秒   |
| 30 分   | 20 秒   |
| 1 時間       | 20 秒   |
| 3 時間      | 1 分     |
| 4 時間      | 1 分     |
| 1 日        | 3 分     |
| 2 日       | 10 分    |
| 1 週間       | 1 時間       |
| 1 か月      | 1 時間       |
| 3 か月     | 1 時間       |
| 6 か月     | 1 時間       |
| 1 年       | 1 時間       |

## モバイルデバイスでダッシュボードを表示する

[Apple App Store][2] および [Google Play Store][3] で入手可能な Datadog モバイルアプリを使用すると、モバイルフレンドリーな形式でダッシュボードを表示できます。モバイルアプリには、モバイルアプリを開かなくてもサービスの健全性やインフラストラクチャーを監視できるモバイルホームスクリーンウィジェットが装備されています。

**注**: ダッシュボードをセットアップまたは編集するには、Datadog ブラウザ UI にログインする必要があります。アプリのインストールの詳細については、[Datadog モバイルアプリ][1]のドキュメントを参照してください。

## その他の参考資料

{{< learning-center-callout header="Datadog ラーニングセンターでグラフウィジェットを作成してみる" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/dashboard-graph-widgets">}} 時系列、クエリ値、トップリスト、テーブル、分布、および円グラフのウィジェットを探索します。ウィジェットの構成方法を学び、各ウィジェットタイプをどのような場合に利用すべきかを理解します。 {{< /learning-center-callout >}}

{{< learning-center-callout header="Datadog ラーニングセンターでテーブル、リスト、SLO、アーキテクチャのウィジェットを作成してみる" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/discovering-table-list-widgets">}} テーブル、リスト、SLO、アーキテクチャのウィジェットを探索します。Web アプリケーションのメトリクスとパフォーマンスを追跡する方法を学び、重要なデータをどのように表示するかを理解します。 {{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/dashboard/lists