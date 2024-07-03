---
aliases:
- /ja/graphing/widgets/timeseries/
- /ja/dashboards/widgets/network/
- /ja/graphing/widgets/network/
description: Display the evolution of one or more metrics, log events, indexed spans,
  or process metrics over time.
further_reading:
- link: https://www.datadoghq.com/blog/full-screen-graphs
  tag: Blog
  text: Explore your data in full-screen graph mode
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
- link: /dashboards/guide/slo_data_source
  tag: Guide
  text: Graph historical SLO data on Dashboards
title: Timeseries Widget
widget_type: timeseries
---

時系列可視化機能を使用すると、1 つ以上のメトリクス、ログイベント、Indexed Span などの動きを経時的に表示できます。タイムウィンドウは、[タイムボード][1]または[スクリーンボード][2]で選択した内容によって異なります。

{{< img src="dashboards/widgets/timeseries/timeseries.png" alt="ホストの平均的な system.cpu.user を表示する時系列ウィジェット" style="width:90%;" >}}

## セットアップ

### 構成

{{< img src="dashboards/widgets/timeseries/timeseries_setup.png" alt="時系列のセットアップ" style="width:90%;" >}}

1. グラフ化するデータを選択します。
   * メトリクス: メトリクスクエリの構成については、[クエリ作成のドキュメント][3]を参照してください。
   * Indexed Span: Indexed Span クエリの構成については、[トレース検索に関するドキュメント][4]を参照してください。
   * ログイベント: ログイベントクエリの構成については、[ログ検索に関するドキュメント][5]を参照してください。

2. [オプション](#display-options)を使用して、グラフをカスタマイズします。

## 表示オプション

グラフは、折れ線、面積、棒グラフで表示することができます。折れ線グラフには、さらにパラメーターが含まれています。

| パラメーター | オプション                  |
|-----------|--------------------------|
| Style     | 実線、破線、点線 |
| Stroke    | 標準、細線、太線   |

### 色

Datadog では、どの種類のグラフについても、同じグラフ内に表示された複数のメトリクスを識別できるように、さまざまなカラーオプションを提供しています。

| パレット     | 説明                                                                                                 |
|-------------|-------------------------------------------------------------------------------------------------------------|
| Classic     | 薄い青色、濃い青色、薄い紫色、薄い黄色、黄色 (以降、これの繰り返し) の単色を使用します。    |
| Consistent | 16 色のセットを使用して、各タググループのすべてのウィジェットで、データの各シリーズに一貫した色を適用します。 |

折れ線グラフの場合、JSON でクエリを区切ることで、異なるメトリクスに特定のパレットを割り当てることができます。詳しくは、[グラフに適した色を選択する][6]のガイドを参照してください。

### Sorting

Order the graph by **Tags** or by **Values** to sort timeseries legends and stacked graphs. This only sorts the graph visualization, and does not impact the query. Toggle the **Reverse** option to sort by reverse alphabetical order or by descending values. 

### メトリクスのエイリアス作成

任意の[絞り込みタグ][7]を使用して、クエリまたは式ごとにエイリアスを作成できます。エイリアスは、グラフや凡例の表示を上書きし、メトリクス名やフィルターのリストが長い場合に便利です。クエリまたは式の末尾にある **as...** をクリックして、メトリクスのエイリアスを入力します。

{{< img src="dashboards/widgets/timeseries/metric_alias.png" alt="Timeseries ウィジェットエディターで、検索クエリにエイリアスを追加する" style="width:100%;" >}}

### イベントオーバーレイ

イベントオーバーレイは、すべてのデータソースをサポートしています。これにより、ビジネスイベントと Datadog のあらゆるサービスからのデータとの相関を容易にすることができます。

イベントオーバーレイを使えば、組織内のアクションがアプリケーションやインフラストラクチャーのパフォーマンスにどのような影響を与えるかを確認することができます。以下に、使用例をいくつか紹介します。
- デプロイメントイベントを重ね合わせた RUM のエラーレート
- 余分なサーバーのプロビジョニングに関連するイベントと CPU 使用率を相関させる
- egress トラフィックと疑わしいログインアクティビティを相関させる
- Datadog が適切なアラートで構成されていることを確認するために、あらゆる時系列データとモニターアラートを相関させる

{{< img src="/dashboards/querying/event_overlay_example.png" alt="RUM のエラーレートをデプロイイベントと重ね合わせて表示する時系列ウィジェット" style="width:100%;" >}}

GitHub コミット、Jenkins デプロイ、Docker 作成イベントなど、関連システムのイベントを追加して、グラフにコンテキストを追加することができます。**Event Overlays** セクションの **Add Event Overlay** をクリックし、これらのイベントを表示するためのクエリを入力します。

[イベントエクスプローラー][8]と同じクエリ形式を使用します。例:

| クエリ                       | 説明                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Jenkins ソースから取得されたすべてのイベントを表示します。                  |
| `tag:role:web`              | `role:web` タグが付いたすべてのイベントを表示します。                  |
| `tags:$<TEMPLATE_VARIABLE>` | 選択された[テンプレート変数][9]から取得されたすべてのイベントを表示します。 |

### マーカー

追加のデータセットにマーカーを追加するには、**Markers** セクションの **Add Marker** をクリックします。

1. Line または Range を選択し、値または値の範囲を入力します。
2. **Show as** フィールドで、アラートステータス/カラーを選択し、水平線を実線、太線、破線から選択します。
3. 時系列ウィジェットの左下に表示するラベルを追加するには、Y 軸の値を定義して、**Label** チェックボックスをクリックします。

### Y 軸コントロール

Y 軸コントロールは、UI と JSON エディタで使用できます。Y 軸の値とタイプは次のように設定できます。

* Y 軸を特定の範囲にクリップできます。
* 絶対値しきい値に基づいて Y 軸の境界を自動的に変更します。このしきい値をグラフの両端 (下側と上側) または一方に適用することで、「外れ値」系列を除外できます。
* Y 軸の目盛を線形から対数、累乗、または平方根に変更できます。

使用できる構成オプションは、次のとおりです。

| オプション                | 必須 | 説明                                                                                                                                                                                                               |
|-----------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`                 | いいえ       | Y 軸に表示する最小値を指定します。数値または `Auto` (デフォルト値を使用) を指定します。                                                                                                                |
| `Max`                 | いいえ       | Y 軸に表示する最大値を指定します。数値または `Auto` (デフォルト値を使用) を指定します。                                                                                                                        |
| `Scale`               | いいえ       | 目盛のタイプを指定します。使用可能な値には以下などがあります。<br>- linear: 線形目盛 (デフォルト)。<br>- log: 対数目盛。<br>- pow: 2 の累乗目盛 (2 はデフォルトです。JSON で変更できます)。<br>- sqrt: 平方根目盛。 |
| `Always include zero` | いいえ       | 常に 0 を含めるか、Y 軸をデータの範囲に合わせるかを指定します。デフォルトは、常に 0 を含めます。                                                                                                                             |

対数関数には負の値を適用できないため、Datadog の対数目盛は、値の符号がすべて同じ (すべて正またはすべて負) の場合にのみ機能します。そうでない場合は、空のグラフが返されます。

### 凡例のコンフィギュレーション

スクリーンボードに構成可能な凡例を追加するには、**Legend** セクションで以下のオプションから選択します。

* 自動 (デフォルト)
* コンパクト
* 拡張: 構成可能な値、平均、合計、最小、および最大の列
* なし

タイムボードの場合、ダッシュボードが L または XL に設定されると凡例が自動的に表示されます。

### コンテキストリンク

ダッシュボードウィジェット内をクリックすると表示されるドロップダウンメニューにコンテキストリンクを追加するには、**Context Links** セクションの **Add a Context Link** をクリックします。

コンテキストリンクの編集と削除については、[コンテキストリンク][10]を参照してください。

### 全画面

[標準の全画面オプション][11]のほかに、前回の期間と比較する、Y 軸の目盛を調整する、変更を保存する、新しいグラフとして保存するなどの簡単な関数を適用できます。

詳しくは、[フルスクリーングラフモードでデータを探る][12]をご覧ください。

## API

このウィジェットは **[Dashboards API][13]** で使用できます。[ウィジェット JSON スキーマ定義][14]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/#get-started
[2]: /ja/dashboards/#screenboards
[3]: /ja/dashboards/querying/
[4]: /ja/tracing/trace_explorer/query_syntax/#search-bar
[5]: /ja/logs/search_syntax/
[6]: /ja/dashboards/guide/widget_colors/
[7]: /ja/dashboards/querying/#filter
[8]: /ja/events/
[9]: /ja/dashboards/template_variables/
[10]: /ja/dashboards/guide/context-links/
[11]: /ja/dashboards/widgets/#full-screen
[12]: https://www.datadoghq.com/blog/full-screen-graphs
[13]: /ja/api/latest/dashboards/
[14]: /ja/dashboards/graphing_json/widget_json/