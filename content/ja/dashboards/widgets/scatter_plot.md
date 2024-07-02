---
title: Scatter Plot Widget
description: "Graph a chosen scope over two different metrics with their respective aggregation"
widget_type: "scatterplot"
aliases:
- /graphing/widgets/scatter_plot/
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
---

A scatter plot identifies a possible relationship between changes observed in two different sets of variables. It provides a visual and statistical means to test the strength of a relationship between two variables. The scatter plot visualization allows you to graph a chosen scope over two different metrics with their respective aggregations.

{{< img src="dashboards/widgets/scatterplot/scatterplot.png" alt="散布図" >}}

## セットアップ

### 構成

1. X 軸と Y 軸それぞれのメトリクスまたはその他のデータセットと、集計を選択します。
1. 散布図の各ポイントのスコープ (`host`、`service`、`app`、または `region` など) を定義します。
1. オプション: color-by タグを有効にします。
1. オプション: X 軸および Y 軸コントロールを設定します。
1. ウィジェットにカスタムタイムフレームがあるか、ダッシュボードのグローバルタイムフレームがあるかを選択します。
1. グラフにタイトルを付けるか、提案されたタイトルを使用するにはボックスを空白のままにします。

### オプション

#### コンテキストリンク

[コンテキストリンク][4]は、デフォルトで有効になっており、オンまたはオフに切り替えることができます。コンテキストリンクは、ダッシュボードウィジェットと Datadog またはサードパーティアプリケーションの他のページの橋渡しをします。

#### グローバルタイム

ウィジェットにカスタムタイムフレームがあるか、ダッシュボードのグローバルタイムフレームがあるかを選択します。

## API

このウィジェットは **[Dashboards API][2]** で使用できます。[ウィジェット JSON スキーマ定義][3]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/guide/context-links/
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
