---
description: RUM データによる Apdex スコアとカスタムパフォーマンス指標の算出ガイド
further_reading:
- link: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
  tag: ドキュメント
  text: サービスごとに Apdex スコアを構成する
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM ダッシュボード
- link: /real_user_monitoring/browser/data_collected
  tag: ドキュメント
  text: 収集された RUM ブラウザデータ
- link: /real_user_monitoring/android/data_collected
  tag: ドキュメント
  text: 収集された RUM Android データ
- link: /real_user_monitoring/ios/data_collected
  tag: ドキュメント
  text: 収集された RUM iOS データ
title: RUM データによる Apdex とカスタムパフォーマンス指標の算出
---

## 概要

Datadog は、ブラウザやモバイルの RUM SDK から Real User Monitoring (RUM) イベントを収集し、簡単なグラフの作成や Apdex などのパフォーマンス指標を計算するために使用することができます。

Apdex スコアを計算するには、APM のサービスモニタリング、または RUM SDK のユーザーモニタリングデータを使用することができます。このガイドでは、RUM データと[クイックグラフ][1]の **Query Value** ウィジェットを使用して、アプリケーションの Apdex を計算する手順を説明します。

サービスモニタリングデータを用いた Apdex の計算については、[サービス別 Apdex スコア構成][2]をご覧ください。

## 前提条件

- お客様の Web またはモバイルアプリケーションは、RUM SDK でインスツルメンテーションされています。インスツルメンテーションを設定するには、[RUM Browser Monitoring][3]、[RUM Android Monitoring][4]、および [RUM iOS Monitoring][5] を参照してください。
- アプリケーションからのイベントは、Datadog で利用できます。

## Apdex スコアの算出

以下の例では、RUM イベントの Largest Contentful Paint のパフォーマンスメトリクスと、`T = 2 sec` という仮想の閾値を使用して Apdex スコアを算出しています。イライラする待ち時間の最小値は `4T = 8 sec` です。結果の値は、ダッシュボードやノートブックにエクスポートできるクエリ値ウィジェットのクイックグラフに表示されます。

### クイックグラフの作成

1. **Dashboards** > **Quick Graph** の順に移動します。
2. RUM クエリを 3 つ作成します。
   * [クエリ `a`](#query-a) は、すべての満足なページロード (Largest Contentful Paint のロードに 2 秒かからない RUM ビュー) に対するものです。
   * [クエリ `b`](#query-b) は、すべての許容ページロード (Largest Contentful Paint のロードに 8 秒を要する RUM ビュー) に対するものです。
   * [クエリ `c`](#query-c) は、すべてのページロード (すべての RUM ビュー) に対するものです。
3. **Formula** フィールドに、Apdex の数式 `(a + 0.5 * b) / c` を入力します。
4. **Select a visualization** の下で、**Query Value** をクリックします。クエリ値ウィジェットが表示されます。
5. タイムフレームセレクタで、**Past 1 Day** を選択します。デフォルトでは、ウィジェットはグローバルタイムで表示されます。
6. グラフの名前を入力します (`Apdex Score` など)。
7. オプションで、クイックグラフをダッシュボードまたはノートブックにエクスポートまたはコピーアンドペーストするか、**Export** > **New Dashboard** をクリックして、このクイックグラフを使ったダッシュボードを作成することができます。

#### クエリ A

1. **Graph your data** で、クエリ `a` のデータソースとして `RUM` を選択し、`@view.largest_contentful_paint:<2s` と入力します。
2. Enter キーを押すか、ドロップダウンメニューから **Update query** をクリックします。クエリ `a` の `RUM` の隣に、`Largest Contentful Paint:<2s` クエリが表示されます。

#### クエリ B

1. クエリ `b` を作成するには、**+ Add Query** をクリックします。
2. クエリ `b` のデータソースとして `RUM` を選択し、 `@view.largest_contentful_paint:[2s TO 8s]` と入力します。
3. Enter キーを押すか、ドロップダウンメニューから **Update query** をクリックします。クエリ `b` の `RUM` の隣に、`Largest Contentful Paint:[2s - 8s]` クエリが表示されます。

#### クエリ C

1. クエリ `c` を作成するには、**+ Add Query** をクリックします。
2. クエリ `c` のデータソースとして `RUM` を選択し、`@Type:view` と入力します。
3. Enter キーを押すか、ドロップダウンメニューから **Update query** をクリックします。クエリ `c` の `RUM` の隣に、`Type:view` クエリが表示されます。

{{< img src="real_user_monitoring/guide/quick-graph.png" alt="Apdex スコアをクイックグラフで見る" style="width:100%;">}}

### JSON コンフィギュレーション

このグラフの JSON コードにアクセスするには、**Edit** の隣にある **JSON** タブをクリックします。

右端のコピーアイコンをクリックすると、クイックグラフの JSON がクリップボードにコピーされます。

{{< code-block lang="json" filename="JSON" disable_copy="false" collapsible="true" >}}
{
    "viz": "query_value",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "(query1 + 0.5 * query2) / query3"
                }
            ],
            "queries": [
                {
                    "search": {
                        "query": "@type:view @view.largest_contentful_paint:<2000000000"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query1",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                },
                {
                    "search": {
                        "query": "@type:view @view.largest_contentful_paint:[2000000000 TO 8000000000]"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query2",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                },
                {
                    "search": {
                        "query": "@type:view"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query3",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                }
            ],
            "response_format": "scalar",
            "conditional_formats": []
        }
    ],
    "autoscale": true,
    "precision": 2
}
{{< /code-block >}}

## その他の視覚化と Apdex スコア

上記の例では、Apdex スコアは、View RUM イベントと Largest Contentful Paint のパフォーマンスメトリクスに関連しています。 

その他の Apdex スコアは、以下の方法で算出することができます。

- Apdex スコアの経時変化を見るには、**Select your visualization** で `Query Value` の代わりに `Timeseries` を選択します。
- 特定のアプリケーションの Apdex スコアを計算するには、`@application.name` クエリを追加し、計算式を更新します。
- Apdex スコアを First Contentful Paint のような別の RUM パフォーマンスメトリクスで計算するには、クエリ内の `@view.LargestContentfulPaint` を `@view.FirstContentfulPaint` に置き換えます。

アプリケーションの追加パフォーマンス指標を計算するには、[クイックグラフを作成する](#create-a-quick-graph)前に、どのデータポイントが必要で、どの RUM イベントが関連するかを決定します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/guide/quick-graphs/
[2]: /ja/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
[3]: /ja/real_user_monitoring/browser/
[4]: /ja/real_user_monitoring/android/
[5]: /ja/real_user_monitoring/ios/