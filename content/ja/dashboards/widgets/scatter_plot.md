---
aliases:
- /ja/graphing/widgets/scatter_plot/
description: 2 つのメトリクスとそれぞれの集計を使用して、選択したスコープをグラフ化する
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
kind: documentation
title: 散布図ウィジェット
widget_type: scatterplot
---

散布図可視化機能では、2 つのメトリクスに対し、それぞれの集計を使用して、選択したスコープをグラフ化できます。

{{< img src="dashboards/widgets/scatterplot/scatterplot.png" alt="散布図" >}}

## セットアップ

### コンフィギュレーション

1. X 軸と Y 軸それぞれのメトリクスと集計を選択します。
1. 散布図の各ポイントのスコープ (`host`、`service`、`app`、または `region` など) を定義します。
1. オプション: color-by タグを有効にします。
1. オプション: X 軸および Y 軸コントロールを設定します。
1. ウィジェットにカスタムタイムフレームがあるか、ダッシュボードのグローバルタイムフレームがあるかを選択します。
1. グラフにタイトルを付けるか、提案されたタイトルを使用するにはボックスを空白のままにします。

### オプション

#### コンテキストリンク

[コンテキストリンク][4]は、デフォルトで有効になっており、オンまたはオフに切り替えることができます。コンテキストリンクは、ダッシュボードウィジェットと Datadog またはサードパーティアプリケーションの他のページの橋渡しをします。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][2] ドキュメントをご参照ください。

散布図ウィジェットの[ウィジェット JSON スキーマ定義][3]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/guide/context-links/
[2]: /ja/api/v1/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/