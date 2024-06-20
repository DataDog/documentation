---
aliases:
- /ja/graphing/widgets/heat_map/
- /ja/dashboards/widgets/heat_map/
description: 特定のメトリクスの時系列ヒートマップを構築する
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: Documentation
  text: JSON を使用したダッシュボードの構築
- link: https://www.datadoghq.com/blog/visualize-behavior-datadog-heatmaps/
  tag: ブログ
  text: Datadog Heatmaps でユーザー行動を視覚化する
title: ヒートマップウィジェット
widget_type: ヒートマップ
---

{{< img src="dashboards/widgets/heatmap/heatmap.png" alt="ヒートマップグラフの視覚化例" style="width:100%;">}}

ヒートマップウィジェットは、複数のタグに集計されたメトリクスを表示します。ヒートマップウィジェットは、OpenTelemetry のヒストグラム、ディストリビューションメトリクス、高解像度、データ表示などを視覚化するために使用します。

## セットアップ

### コンフィギュレーション

通常通り、メトリクスクエリを構成します。'counters' ヒストグラムモードを使用して、OpenTelemetry ヒストグラムをグラフ化します。

`avg`/`max`/`min`/`sum by` のコントロールで選択を行い、関連付けられているタグのデータを表示します。

### オプション

#### Y 軸コントロール

Y 軸の制御は、UI または JSON エディターから使用できます。

以下を実行できます。

* Y 軸を特定の範囲にクリップできます。
* 絶対値しきい値に基づいて Y 軸の境界を自動的に変更します。このしきい値をグラフの両端 (下側と上側) または一方に適用することで、「外れ値」系列を除外できます。
* Y 軸の目盛を線形から対数、累乗、または平方根に変更できます。

Y 軸の目盛を変更するには、Y-Axis Controls ボタンを展開します。

使用できる構成オプションは、次のとおりです。

| オプション                | 必須 | 説明                                                                                                                                                                                                       |
|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`/`Max`           | ✕       | Y 軸に表示する最小値または最大値、またはその両方を指定します。数値または `Auto` (デフォルト値を使用) を指定します。                                                                                                   |
| `Scale`               | ✕       | 目盛のタイプを指定します。使用可能な値:<br>- linear: 線形目盛 (デフォルト)<br>- log: 対数目盛<br>- pow: 2 の累乗目盛 (2 はデフォルトです。JSON で変更できます)<br>- sqrt: 平方根目盛 |
| `Always include zero` | ✕       | 常に 0 を含めるか、軸をデータの範囲に合わせるかを指定します。デフォルトは、常に 0 を含めます。                                                                                                                     |

**注**: 対数関数には負の値を適用できないため、Datadog の対数目盛は、値の符号がすべて同じ (すべて正またはすべて負) の場合にのみ機能します。そうでない場合は、空のグラフが返されます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][2] を参照してください。

ヒートマップウィジェットの[ウィジェット JSON スキーマ定義][3]は、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/events/explorer/#search-syntax
[2]: /ja/api/latest/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/