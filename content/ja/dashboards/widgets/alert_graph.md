---
aliases:
- /ja/graphing/widgets/alert_graph/
description: システムで定義されているモニターの現在のステータスをグラフ化する
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
title: アラートグラフウィジェット
widget_type: alert_graph
---

アラートグラフは、システムで定義されているほとんどのモニターの現在のステータスを表示する時系列グラフです。

{{< img src="dashboards/widgets/alert_graph/alert_graph.png" alt="アラートグラフ" >}}

このウィジェットは、メトリクス、異常値、外れ値、予測、APM、インテグレーションなどのデフォルトのスケジュール済みクエリアラートモニターでサポートされています。

## セットアップ

### 構成

1. これまでに作成したモニターから、グラフ化するモニターを選択します。
2. タイムフレームを選択します。
3. 次のいずれかの可視化方法を選択します。
    * Timeseries
    * Toplist

## API

このウィジェットは **[Dashboards API][1]** で使用できます。[ウィジェット JSON スキーマ定義][2]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/