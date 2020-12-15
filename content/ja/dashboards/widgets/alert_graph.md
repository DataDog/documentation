---
title: アラートグラフウィジェット
kind: documentation
description: システムで定義されているモニターの現在のステータスをグラフ化する
aliases:
  - /ja/graphing/widgets/alert_graph/
further_reading:
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/timeboards/
    tag: ドキュメント
    text: Timeboards
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
アラートグラフは、システムで定義されているほとんどのモニターの現在のステータスを表示する時系列グラフです。

{{< img src="dashboards/widgets/alert_graph/alert_graph.png" alt="アラートグラフ" >}}

## セットアップ

{{< img src="dashboards/widgets/alert_graph/alert_graph_setup.png" alt="アラートグラフのセットアップ"  style="width:80%;">}}

### コンフィギュレーション

1. これまでに作成したモニターから、グラフ化するモニターを選択します。
2. タイムフレームを選択します。
3. 次のいずれかの可視化方法を選択します。
    * Timeseries
    * Toplist

### オプション

#### 表示設定

{{< img src="dashboards/widgets/options/display_preferences.png" alt="表示設定"  style="width:80%;">}}

##### グローバルタイム

スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

##### 凡例

Show legend on graph を使用して、ウィジェットの凡例の表示/非表示を切り替えます。オプションで、表示するエントリ数を選択できます。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][1] ドキュメントをご参照ください。

アラートグラフウィジェット専用の[ウィジェット JSON スキーマ定義][2]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/v1/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/