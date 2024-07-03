---
description: Graph proportions of one or more datasets.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
- link: /dashboards/widgets/treemap/
  tag: Documentation
  text: Treemap Widget
title: Pie Chart Widget
widget_type: sunburst
---

円グラフウィジェットは、単一のデータセットとそれに対応する比率、または複数のデータセットを入れ子にして比率を表示することができます。

{{< img src="dashboards/widgets/pie_chart/pie_chart_overview.png" alt="円グラフのウィジェットです。一番内側のリングにはユーザーの国が表示され、一番外側のリングは各国で使用されているブラウザのシェアを示すように比例配分されています。" style="width:60%;">}}


## 構成

1. 利用可能なデータソースから選択します。
2. クエリを構成します。詳しくは、次の資料をご覧ください。
    * メトリクス: メトリクスのクエリを構成するには、[クエリ作成][1]のドキュメントを参照してください。
    * イベント: ログイベントクエリの構成については、[ログ検索][2]に関するドキュメントを参照してください。
3. (オプション) [式][3]でクエリを修正します。
4. グラフをカスタマイズします。

## グラフのカスタマイズ

### 総量表示

グラフの中央にトータルカウントを表示するかどうかをトグルします。デフォルトでは、**Automatic** オプションは、グラフが一定のサイズに達すると、トータルカウントを表示します。

### 凡例のコンフィギュレーション

凡例はオフにしたり、**Aside** オプションでチャートセグメントの上に直接表示したり、各値とその色、比率を一覧表示する **Table** として表示することができます。

デフォルトでは、**Automatic** オプションは、ダッシュボード内にラベル付きの Aside 凡例を表示し、フルスクリーンで開いたときに **Aside** と **Table** の両方の凡例を表示します。

{{< img src="dashboards/widgets/pie_chart/legend_automatic.png" alt="円グラフの凡例とラベルのオプション: Automatic、Table、Aside、None" style="width:80%;">}}

### コンテキストリンク

[コンテキストリンク][4]は、デフォルトで有効になっており、オンまたはオフに切り替えることができます。コンテキストリンクは、ダッシュボードウィジェットと他のページ (Datadog 内、またはサードパーティ製) の橋渡しをします。

## 表示とインタラクション

### フィルターとフォーカス

複数のデータ群を一度にプロットする場合、1 つのカテゴリーを選択し、その中での比率を表示することが可能です。

1 つのカテゴリーを表示するには、カテゴリーリングの外側にカーソルを合わせ、クリックします。前の表示に戻るには、カーソルをグラフの中央に移動し、クリックします。

{{< img src="dashboards/widgets/pie_chart/interaction_animation.mp4" alt="円グラフのインタラクションをアニメーション化し、フィルターをかけて 1 つのカテゴリーにフォーカスする" video="true" style="width:80%;">}}

### 全画面

円グラフウィジェットを全画面表示すると、標準の[全画面表示オプション][5]のセットが表示されます。

## API

このウィジェットは **[Dashboards API][6]** で使用できます。[ウィジェット JSON スキーマ定義][7]については、以下の表を参照してください。

<div class="alert alert-info">円グラフのウィジェットタイプは <strong>sunburst</strong> です。</div>

{{< dashboards-widgets-api >}}

## ツリーマップウィジェット

円グラフウィジェットのように、[ツリーマップ][8]もネストされた比率を表示するために使用することができます。両者の主な違いは、円グラフは放射状のスライスで比率を表示し、ツリーマップはネストされた長方形として比率を表示する点です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/dashboards/querying
[2]: /ja/logs/explorer/search_syntax/
[3]: /ja/dashboards/functions/
[4]: /ja/dashboards/guide/context-links/
[5]: /ja/dashboards/widgets/#full-screen
[6]: /ja/api/latest/dashboards/
[7]: /ja/dashboards/graphing_json/widget_json/
[8]: /ja/dashboards/widgets/treemap/