---
title: 散布図ウィジェット
kind: documentation
description: 2 つのメトリクスとそれぞれの集計を使用して、選択したスコープをグラフ化する
widget_type: scatterplot
aliases:
  - /ja/graphing/widgets/scatter_plot/
further_reading:
  - link: /dashboards/timeboards/
    tag: ドキュメント
    text: Timeboards
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
散布図可視化機能では、2 つのメトリクスに対し、それぞれの集計を使用して、選択したスコープをグラフ化できます。

{{< img src="dashboards/widgets/scatterplot/scatterplot.png" alt="散布図" >}}

## セットアップ

{{< img src="dashboards/widgets/scatterplot/scatterplot_setup.png" alt="散布図のセットアップ"  style="width:80%;">}}

### コンフィギュレーション

1. X 軸と Y 軸それぞれのメトリクスと集計を選択します。
2. 散布図の各ポイントのスコープ (`host`、`service`、`app`、`region` など) を定義します。
3. オプション: color-by タグを有効にします。
4. オプション: X 軸および Y 軸コントロールを設定します。

## オプション

#### グローバルタイム

スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][1] ドキュメントをご参照ください。

散布図ウィジェットの[ウィジェット JSON スキーマ定義][2]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/v1/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/