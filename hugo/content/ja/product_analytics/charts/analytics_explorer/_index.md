---
aliases:
- /ja/product_analytics/analytics_explorer/
- /ja/product_analytics/journeys
description: イベント、メジャー、フィルター、内訳を使用して、カスタム分析クエリを構築して可視化します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: ブログ
  text: ジオマップを使用して、場所ごとにアプリデータを視覚化する
title: 分析
---
分析チャートは、イベント、メジャー、任意のフィルターという単一のクエリから始まります。これらを一度定義してから、結果の可視化方法を選択します。

分析チャートを使用して、次のことを行います。

- イベントをトリガーしたユーザー数を確認し、機能の採用状況が時間の経過とともにどのように変化するかを把握します。
- ユーザーがアクションを実行する頻度と、製品への関与の深さを測定します。
- メトリクスをユーザーまたはイベントのプロパティ別に内訳表示し、イベントの構成を可視化します。
- 数式を使用してカスタムメトリクスを構築し、任意のイベントやメトリクスを組み合わせてレート、比率、またはスコアを作成します。
- 急上昇、急落、またはトレンドの要因となっているユーザーやセグメントを明確にします。

{{< img src="/product_analytics/analytics/analytics_chart.png" alt="分析チャートの例。" style="width:90%;" >}}

## クエリの構築 {#build-a-query}

クエリは、後でどのように表示するかに関係なく、分析チャートで何を測定するかを定義します。

{{< img src="/product_analytics/analytics/analytics_query_builder.png" alt="クエリの表示名、イベントピッカー、メジャーセレクター、およびフィルター、内訳、関数、その他のクエリコントロールの番号付き吹き出しが表示された分析クエリビルダー。" style="width:50%;" >}}
   
1. {{< ui >}}Product Analytics{{< /ui >}} で、{{< ui >}}Create New{{< /ui >}} > {{< ui >}}Analytics{{< /ui >}} を選択します。

2. (オプション) クエリにラベルを付けるための {{< ui >}}Query display name{{< /ui >}} を入力します。
   
3. イベントピッカーをクリックして、特定の表示やセッションなど、クエリに含めるイベントを選択します。ピッカー内のタブを使用して、イベントカテゴリ別に一覧を絞り込みます: {{< ui >}}Sessions{{< /ui >}}、{{< ui >}}Views{{< /ui >}}、{{< ui >}}Labeled actions{{< /ui >}}、{{< ui >}}Actions{{< /ui >}}、または {{< ui >}}Server actions{{< /ui >}}。

4. {{< ui >}}Viewed as count of{{< /ui >}} を使用して、クエリで選択したイベントの測定方法を選択します。すべての発生をカウントするには {{< ui >}}All events{{< /ui >}} を選択し、代わりに一意の値をカウントするには、{{< ui >}}User Id{{< /ui >}} などの特定のプロパティを選択します。

5. (オプション) {{< ui >}}Add filter{{< /ui >}} を使用して、サードパーティインテグレーションのカスタム属性を含む、イベント、ユーザー、セグメント、またはアカウントのプロパティでクエリをスコープします。

6. (オプション) {{< ui >}}Add breakdown{{< /ui >}} を使用して、国や表示名などのプロパティの値ごとに結果を比較します。

   <div class="alert alert-info">{{< ui >}}Query Value{{< /ui >}} グラフでは内訳が削除され、{{< ui >}}Geomap{{< /ui >}} グラフでは場所のファセットに変換されます。</div>

7. (オプション) {{< ui >}}Σ{{< /ui >}} を使用して、変化率の計算やデータの平滑化など、クエリを変換する関数を適用します。詳細については、[関数][1]を参照してください。
   
8. (オプション) {{< ui >}}Add Query{{< /ui >}} を使用して、最初のクエリと並行して 2 番目の独立したクエリを実行します。{{< ui >}}Add Formula{{< /ui >}} を使用して、複数のクエリを単一の結果に結合します。

## 分析グラフを理解する{#understand-an-analytics-chart}

クエリを作成すると、定義したイベント、メジャー、フィルター、内訳を使用してデータがグラフに表示されます。ここから、基になるクエリを変更せずに、そのデータの視覚化方法や表示方法を変更できます。

すべてのオプションがすべてのグラフタイプに適用されるわけではありません。たとえば、ロールアップ間隔と表示スタイルは {{< ui >}}Timeseries{{< /ui >}} グラフにのみ適用されます。

{{< img src="product_analytics/analytics/analytics_analysis.png" alt="グラフタイプセレクター、ロールアップ間隔、時間範囲セレクター、表示セレクター、データポイントオプションメニュー、および進行中の間隔に番号付きの吹き出しが付いた分析グラフ。" style="width:100%;" >}}

1. グラフタイプセレクターを使用して、[グラフタイプ][2]を切り替えます。

2. {{< ui >}}Timeseries{{< /ui >}} グラフの場合は、ロールアップセレクターを使用して、各データポイントが表す時間間隔を設定します。{{< ui >}}Default{{< /ui >}} を選択すると、間隔が時間範囲に合わせて調整されます。または、特定の値に固定することもできます。

3. 時間範囲セレクターを使用して、グラフが分析するデータの期間を {{< ui >}}Past 1 Hour{{< /ui >}} から {{< ui >}}Past 1 Year{{< /ui >}} の間で設定するか、カレンダーからカスタム範囲を選択します。

4. {{< ui >}}Timeseries{{< /ui >}} グラフの場合は、表示セレクターを使用して {{< ui >}}Bars{{< /ui >}}、{{< ui >}}Lines{{< /ui >}}、{{< ui >}}Areas{{< /ui >}} を切り替えます。

5. データポイントにカーソルを合わせると詳細を確認できます。クリックすると、ズームイン、基になるイベントの表示、その値の検索、またはクエリからの除外を行うオプションにアクセスできます。

6. ハッチングされたセグメントは、まだ進行中の間隔を示しています。

## 次のステップ {#next-steps}
{{< whatsnext desc="分析イベントの検索、グループ化、可視化の方法、および個々のイベントのエクスポートや調査方法について学びます。" >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/search_syntax" >}}検索構文{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/events" >}}イベント{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/visualize" >}}視覚化{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/group" >}}グループ{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/export" >}}エクスポート{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/functions/
[2]: /ja/product_analytics/charts/analytics_explorer/visualize/