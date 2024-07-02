---
title: Distribution Widget
widget_type: distribution
description: "Graph a metric distribution aggregated across one or several tags."
aliases:
- /graphing/widgets/distribution/
further_reading:
- link: /metrics/distributions/
  tag: Documentation
  text: Distributions
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
- link: /dashboards/graphing_json/widget_json/
  tag: Documentation
  text: Widget JSON schema
- link: /dashboards/graphing_json/request_json/
  tag: Documentation
  text: Request JSON schema
- link: /dashboards/querying/
  tag: Documentation
  text: Querying
---

分布を可視化することで、1 つまたは複数のタグ (*hosts* など) に対して集計されたメトリクスを表示します。[ヒートマップ][1]と異なり、分布グラフの x 軸は時間ではなく数量を表します。

この可視化機能は、1 つのクエリのみを表示します。追加のクエリは無視されます。

**注**: この可視化で外れ値の検出を行うことはできません。

{{< img src="/dashboards/widgets/distribution/distribution_fullscreen.png" alt="JVM ヒープ平均のホスト別分布グラフ">}}

## セットアップ

### 構成

1. グラフ化するデータを選択します。ディストリビューションの視覚化は、メトリクス、ライブプロセス、APM リクエストレイテンシー、ログイベント、および RUM イベントをサポートしています。
**注**: この可視化タイプは、データが `host` ごとなどの複数のタグキーに対して集計される場合にのみ有用です。
1. "`avg`/`max`/`min`/`sum by`/" のコントロールで選択を行い、関連付けられているタグのデータを表示します。
1. オプションを使用して、グラフをカスタマイズします。

### オプション

#### パーセンタイルマーカー

APM リクエスト分布で、X 軸にパーセンタイルマーカーを追加できます。

{{< img src="dashboards/widgets/options/distribution_marker_controls.jpg" alt="マーカーコントロール環境設定" style="width:80%;">}}

#### X 軸と Y 軸の制御

グラフ軸の制御は、UI または JSON エディターから使用できます。

以下を実行できます。

* X 軸および Y 軸を特定の範囲にカット。
* パーセンタイルしきい値または絶対しきい値に基づいて X 軸の境界を自動的に変更します。このしきい値をグラフの両端 (下側と上側) または一方に適用することで、「外れ値」のビンを除外できます。
* Y 軸の目盛を線形目盛から対数に変更します。

{{< img src="dashboards/widgets/options/distribution_axis_controls.jpg" alt="ディストリビューション軸のコントロール環境設定" style="width:80%;">}}

### 全画面

[標準の全画面オプション][2]のほかに、X 軸のコントロールを使用して特定のパーセンタイルにズームインすることができます。

## API

このウィジェットは **[Dashboards API][3]** で使用できます。[ウィジェット JSON スキーマ定義][4]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/heatmap/
[2]: /dashboards/widgets/#full-screen
[3]: /api/latest/dashboards/
[4]: /dashboards/graphing_json/widget_json/
