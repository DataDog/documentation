---
title: 分布ウィジェット
kind: documentation
description: 1 つ以上のタグに対して集計されたメトリクスの分布をグラフ化する
aliases:
  - /ja/graphing/widgets/distribution/
further_reading:
  - link: /dashboards/timeboards/
    tag: ドキュメント
    text: Timeboards
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
分布の可視化は、1 つまたは複数のタグ (hosts など) に対して集計されたメトリクスを表示する方法の 1 つです。[ヒートマップ][1]と異なり、分布グラフの x 軸は時間ではなく数量を表します。

この可視化機能は、1 つのメトリクスクエリのみを表示します。追加のクエリは無視されます。

**注**: この可視化で外れ値の検出を行うことはできません。

{{< img src="dashboards/widgets/distribution/distribution.png" alt="Distribution"  >}}

## セットアップ

{{< img src="dashboards/widgets/distribution/distribution_setup.png" alt="ディストリビューション"  style="width:80%;">}}

### コンフィギュレーション

通常どおりにメトリクスクエリを構成します。この可視化タイプは、メトリクスが `host` ごとなどの複数のタグキーに対して集計される場合にのみ有用です。
`avg`/`max`/`min`/`sum by` のコントロールで選択を行い、関連付けられているタグのデータを表示します。

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

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][2] ドキュメントをご参照ください。

分布ウィジェット専用の[ウィジェット JSON スキーマ定義][3]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/widgets/heat_map/
[2]: /ja/api/v1/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/