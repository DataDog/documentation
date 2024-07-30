---
title: RUM 分析
description: ''
aliases:
  - /ja/real_user_monitoring/rum_analytics
  - /ja/real_user_monitoring/analytics
further_reading:
  - link: https://www.datadoghq.com/blog/datadog-geomaps/
    tag: ブログ
    text: ジオマップを使用して、場所ごとにアプリデータを視覚化する
  - link: /real_user_monitoring/explorer/search/
    tag: Documentation
    text: Datadog でビューを検索する
---
## 概要

リアルユーザーモニタリング（RUM）分析は、RUM エクスプローラーページを、データの集計や分割の機能を備えたビューで拡張するため、トラブルシューティングや監視に使うことができます。以下を制御することが可能です。

* 分析するビューセットをフィルタリングするクエリ
* データの分割に使用するディメンション
* 集計や分割を可視化する方法

可視化された分析から、さらに以下を行うことができます。

* 可視化からダッシュボードでウィジェットを作成する。
* 可視化によって可能になる操作に応じて、イベントリストの各部を詳細に調べる。

## 分析クエリの構築

クエリを使用して、RUM 分析に何を表示するかを制御できます。

1. グラフ化する[メジャー][1]または[ファセット][2]を選択します。[メジャー][1]を選ぶと、集計関数を選択できます。[ファセット][2]を選ぶと、ユニーク数が表示されます。

    {{< img src="real_user_monitoring/explorer/analytics/measure_selection.png" alt="メジャーを選択"  style="width:50%;">}}
2. グラフ化する[メジャー][1]の集計関数を選択します。

    {{< img src="real_user_monitoring/explorer/analytics/aggregation.png" alt="RUM 分析の集計関数" style="width:50%;">}}

3. [ファセット][2]を使用して、グラフを分割します。

    {{< img src="real_user_monitoring/explorer/analytics/break_down.png" alt="ファセットで分割された RUM 分析" style="width:50%;">}}

4. グラフの時間間隔を選択します。
  グローバルタイムフレームを変更すると、使用可能なタイムステップ値のリストも変更されます。

    {{< img src="real_user_monitoring/explorer/analytics/roll_up.png" alt="rollup" style="width:50%;">}}

5. 選択した[メジャー][1]に応じて、上位 (**top**) X 個と下位 (**bottom**) X 個のどちらの値を表示するかを選択します。

    {{< img src="real_user_monitoring/explorer/analytics/top_bottom.png" alt="上位下位ボタン" style="width:50%;">}}

## 可視化方法

グラフセレクターを使用して、RUM 分析の可視化タイプを選択します。

{{< img src="real_user_monitoring/explorer/analytics/graph_selector.png" alt="RUM 分析のグラフセレクター" style="width:50%;">}}

使用できる可視化タイプは以下のとおりです。

{{< tabs >}}
{{% tab "Timeseries" %}}

選択したタイムフレーム内での 1 つの[メジャー][1] (または[ファセット][2]のユニーク値数) の動きを可視化し、オプションで、使用可能な[ファセット][2]で分割します。

時系列では、次の表示オプションを追加できます。

* 折れ線グラフ、棒グラフ、面グラフのどれを表示するか。
* データ積み上げオプション（値またはパーセント値）。
* カラーセット。

データ積み上げに関する注意点

* データの積み上げは、分割を含むクエリリクエストにのみ使用できます。
* 積み上げオプションは、棒グラフと面グラフの表示にのみ使用できます。折れ線グラフは、常に重ねて表示されます。
* データの一部が表示されないトップリストオプションを使用している場合、積み上げデータは全体合計を表しません。これは、単に上位または下位の系列の小計を表します。
* 分割されたファセット内に一意でない値がある場合は、データを積み上げても意味がない場合があります。
* メジャーの集計方法によっては、データを積み上げても意味がない場合があります。

次の時系列 RUM 分析は、以下を示しています。

**90 パーセンタイル**の **DOM インタラクティブ時間**に基づく、過去 7 日間の **ブラウザファミリー** の動きを示しています。

{{< img src="real_user_monitoring/explorer/analytics/rum_timeserie_example.png" alt="時系列 RUM の例" style="width:90%;">}}

[1]: /ja/real_user_monitoring/rum_explorer/?tab=measures#facets-measures
[2]: /ja/real_user_monitoring/rum_explorer/?tab=facets#facets-measures
{{% /tab %}}

{{% tab "Top List" %}}

選択した[メジャー][2]に基づいて、[ファセット][1]から上位の値を可視化します。

次の RUM 分析の上位リストは、以下を示しています。

**ユニークセッション ID** の数に基づく、過去 1 日間の**上位 10 の URL パス**の動き。

{{< img src="real_user_monitoring/explorer/analytics/top_list_rum.png" alt="RUM の上位リストの例" style="width:90%;">}}

[1]: /ja/real_user_monitoring/rum_explorer/?tab=facets#facets-measures
[2]: /ja/real_user_monitoring/rum_explorer/?tab=measures#facets-measures
{{% /tab %}}
{{% tab "Table" %}}

選択した[メジャー][2] (リストで選択した最初のメジャー) に基づいて[ファセット][1]から上位の値を可視化し、この上位の値に現れる要素に対して他のメジャーの値を表示します。検索クエリを更新したり、いずれかのディメンションに対応するイベントをドリルスルーすることができます。

* 複数のディメンションがある場合、上位の値は最初のディメンションに基づき決定されます。その後最初のディメンション内の上位値内の 2 番めのディメンション、次に 2 番目のディメンション内の上位値内の 3 番めのディメンションに基づき決定されます。
* メジャーが複数ある場合、最初のメジャーに応じて上位または下位リストが決定されます。
* サブセット（上位または下位）のみが表示されるため、小計がグループ内の実際の合計値とは異なる場合があります。このディメンジョンに対する、値が null または空欄のイベントは、サブグループとして表示されません。

 **注**: 単一のメジャーと単一のディメンジョンで使用されるテーブルの可視化は、表示が異なりますが、上位リストと同じです。

 次の RUM 分析テーブルは、**2 つの国**の**上位 5 の URL パス**です。つまり、**ユニークなセッション ID** の量と、90 パーセンタイルの**期間**に基づく、過去 1 日間の米国と日本の分析結果を示しています。

{{< img src="real_user_monitoring/explorer/analytics/rum_table_example.png" alt="RUM テーブルの例" style="width:90%;">}}

[1]: /ja/real_user_monitoring/rum_explorer/?tab=facets#facets-measures
[2]: /ja/real_user_monitoring/rum_explorer/?tab=measures#facets-measures
{{% /tab %}}

{{% tab "ジオマップ" %}}

世界地図上で単一の[メジャー][1] (または[ファセット][2]の一意の値のカウント) を視覚化します。

次の RUM 分析ジオマップは、過去 1 日間の **Largest Contentful Paint** の 75 パーセンタイルを示しています。

{{< img src="real_user_monitoring/explorer/analytics/rum_geomap_example.png" alt="RUM ジオマップの例" style="width:90%;">}}

[1]: /ja/real_user_monitoring/rum_explorer/?tab=facets#facets-measures
[2]: /ja/real_user_monitoring/rum_explorer/?tab=measures#facets-measures
{{% /tab %}}

{{< /tabs >}}

## 関連イベント

グラフの一部を選択またはクリックすると、グラフをズームインしたり、選択範囲に対応するイベントのリストを表示したりすることができます。

{{< img src="real_user_monitoring/explorer/analytics/view_events.png" alt="イベントの表示" style="width:30%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/rum_explorer/?tab=measures#facets-measures
[2]: /ja/real_user_monitoring/rum_explorer/?tab=facets#facets-measures