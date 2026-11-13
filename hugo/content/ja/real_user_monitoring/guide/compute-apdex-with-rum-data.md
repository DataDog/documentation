---
description: RUM データによる Apdex スコアとカスタムパフォーマンス指標の算出ガイド
further_reading:
- link: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
  tag: ドキュメント
  text: サービスごとに Apdex スコアを構成する
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM ダッシュボード
- link: /real_user_monitoring/application_monitoring/browser/data_collected
  tag: ドキュメント
  text: RUM ブラウザデータ収集
- link: /real_user_monitoring/android/data_collected
  tag: ドキュメント
  text: RUM Android データ収集
- link: /real_user_monitoring/ios/data_collected
  tag: ドキュメント
  text: RUM iOS データ収集
title: RUM データによる Apdex とカスタムパフォーマンス指標の算出
---
## 概要 {#overview}

Datadog は、ブラウザやモバイルの RUM SDK から Real User Monitoring (RUM) イベントを収集し、簡単なグラフの作成や Apdex などのパフォーマンス指標メトリクスを計算するために使用することができます。

Apdex スコアを計算するには、APM のサービスモニタリングまたは RUM SDK のユーザーモニタリングデータを使用できます。このガイドでは、RUM データと[クイックグラフ][1]の {{< ui >}}Query Value{{< /ui >}} ウィジェットを使用してアプリケーションの Apdex を計算する手順を説明します。

サービスモニタリングデータを用いた Apdex の計算については、[サービスごとに Apdex スコアを構成する][2]をご覧ください。

## 前提条件{#prerequisites}

- 利用している Web またはモバイルアプリケーションは RUM SDK でインスツルメントされています。インスツルメンテーションを設定するには、[RUM ブラウザモニタリング][3]、[RUM Android モニタリング][4]、および [RUM iOS モニタリング][5]を参照してください。
- アプリケーションからのイベントは、Datadog で利用できます。

## Apdex スコアを計算する {#compute-an-apdex-score}

以下の例では、RUM イベントの Largest Contentful Paint パフォーマンスメトリクスと `T = 2 sec` の仮想のしきい値を使用して Apdex スコアを計算しています。フラストレーションレイテンシーの最小値は `4T = 8 sec` です。結果の値は、ダッシュボードやノートブックにエクスポートできるクエリ値ウィジェットのクイックグラフに表示されます。

### クイックグラフを作成する {#create-a-quick-graph}

1. {{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}Quick Graph{{< /ui >}} に移動します。
2. RUM クエリを 3 つ作成します。
   * [クエリ `a`](#query-a) は、すべての満足なページロード (Largest Contentful Paint のロードに 2 秒かからない RUM ビュー) に対するものです。
   * [クエリ `b`](#query-b) は、すべての許容ページロード (Largest Contentful Paint のロードに 8 秒かからない RUM ビュー) に対するものです。
   * [クエリ `c`](#query-c) は、すべてのページロード (すべての RUM ビュー) に対するものです。
3. {{< ui >}}Formula{{< /ui >}} フィールドに、Apdex の数式 `(a + 0.5 * b) / c` を入力します。
4. {{< ui >}}Select a visualization{{< /ui >}} で、{{< ui >}}Query Value{{< /ui >}} をクリックします。クエリ値ウィジェットが表示されます。
5. 時間枠セレクターで、{{< ui >}}Past 1 Day{{< /ui >}} を選択します。デフォルトでは、ウィジェットはグローバルタイムで表示されます。
6. グラフの名前を入力します (`Apdex Score` など)。
7. オプションで、クイックグラフをダッシュボードまたはノートブックにエクスポートまたはコピーアンドペーストするか、{{< ui >}}Export{{< /ui >}} > {{< ui >}}New Dashboard{{< /ui >}} をクリックして、このクイックグラフを使ったダッシュボードを作成することができます。

#### クエリ A {#query-a}

1. {{< ui >}}Graph your data{{< /ui >}} で、クエリ `a` のデータソースとして `RUM` を選択し、`@view.largest_contentful_paint:<2s` を入力します。
2. Enter キーを押すか、ドロップダウンメニューから**クエリを更新**をクリックします。クエリ `a` の `RUM` の隣に、`Largest Contentful Paint:<2s` クエリが表示されます。

#### クエリ B {#query-b}

1. クエリ `b` を作成するには、{{< ui >}}\+ Add Query{{< /ui >}} をクリックします。
2. クエリ `b` のデータソースとして `RUM` を選択し、`@view.largest_contentful_paint:[2s TO 8s]` を入力します。
3. Enter キーを押すか、ドロップダウンメニューから**クエリを更新**をクリックします。クエリ `b` の `RUM` の隣に、`Largest Contentful Paint:[2s - 8s]` クエリが表示されます。

#### クエリ C {#query-c}

1. クエリ `c` を作成するには、{{< ui >}}\+ Add Query{{< /ui >}} をクリックします。
2. クエリ `c` のデータソースとして `RUM` を選択し、`@Type:view` を入力します。
3. Enter キーを押すか、ドロップダウンメニューから**クエリを更新**をクリックします。クエリ `c` の `RUM` の隣に、`Type:view` クエリが表示されます。

{{< img src="real_user_monitoring/guide/quick-graph.png" alt="クイックグラフでの Apdex スコア" style="width:100%;">}}

### JSON コンフィギュレーション {#json-configuration}

このグラフの JSON コードにアクセスするには、{{< ui >}}Edit{{< /ui >}} の隣にある {{< ui >}}JSON{{< /ui >}} タブをクリックします。

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

## その他の視覚化と Apdex スコア {#additional-visualizations-and-apdex-scores}

上記の例では、Apdex スコアは、View RUM イベントと Largest Contentful Paint のパフォーマンスメトリクスに関連しています。 

その他の Apdex スコアは、以下の方法で算出することができます。

- Apdex スコアの経時変化を確認するには、{{< ui >}}Select your visualization{{< /ui >}}で {{< ui >}}Query Value{{< /ui >}} の代わりに {{< ui >}}Timeseries{{< /ui >}} を選択します。
- 特定のアプリケーションの Apdex スコアを計算するには、`@application.name` クエリを追加し、計算式を更新します。
- Apdex スコアを First Contentful Paint のような別の RUM パフォーマンスメトリクスで計算するには、クエリ内の `@view.LargestContentfulPaint` を `@view.FirstContentfulPaint` に置き換えます。

アプリケーションの追加パフォーマンス指標を計算するには、[クイックグラフを作成する](#create-a-quick-graph)前に、どのデータポイントが必要で、どの RUM イベントが関連するかを決定します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/guide/quick-graphs/
[2]: /ja/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
[3]: /ja/real_user_monitoring/application_monitoring/browser/
[4]: /ja/real_user_monitoring/android/
[5]: /ja/real_user_monitoring/ios/