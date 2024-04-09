---
aliases:
- /ja/graphing/widgets/alert_graph/
description: システムで定義されているモニターの現在のステータスをグラフ化する
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
kind: documentation
title: アラートグラフウィジェット
---

アラートグラフは、システムで定義されているほとんどのモニターの現在のステータスを表示する時系列グラフです。

{{< img src="dashboards/widgets/alert_graph/alert_graph.png" alt="アラートグラフ" >}}

このウィジェットは、メトリクス、異常値、外れ値、予測値、APM、インテグレーションモニターでサポートされます。

## セットアップ

### コンフィギュレーション

1. これまでに作成したモニターから、グラフ化するモニターを選択します。
2. タイムフレームを選択します。
3. 次のいずれかの可視化方法を選択します。
    * Timeseries
    * Toplist

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][1] ドキュメントをご参照ください。

アラートグラフウィジェット専用の[ウィジェット JSON スキーマ定義][2]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/