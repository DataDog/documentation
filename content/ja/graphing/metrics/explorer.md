---
title: メトリクスエクスプローラー
kind: documentation
description: すべてのメトリクスを調査し分析する
further_reading:
  - link: graphing/metrics/summary
    tag: Documentation
    text: メトリクスの概要
  - link: graphing/metrics/distributions
    tag: Documentation
    text: ディストリビューションメトリクス
---
Datadog がアプリケーションから収集した[メトリクス][2]を調査するには、最初に [Metrics Explorer ページ][1]を使用します。

"Graph" テキストボックス内をクリックすると、Datadog がアプリケーションから収集したすべてのメトリクスがリストされます。テキストボックスに入力して、リスト内を検索することもできます。メトリクスを選択すると、メトリクスが右側にリアルタイムのグラフとして表示されます。デフォルトでは、最大 20 個のグラフを表示できます。この個数は、"Options" の歯車アイコンをクリックして変更できます。

{{< img src="graphing/metrics/explorer/explorer.png" alt="Metrics Explorer" responsive="true" style="width:60%;" >}}

"Over" では、結果をタグで絞り込むことができます。"One graph per" では、メトリクスをホスト、コンテナ、リージョン、チームなどで複数のグラフに分割するかどうかを選択できます。

{{< img src="graphing/metrics/explorer/split-by-team.png" alt="Split By Team" responsive="true" style="width:60%;">}}

グラフを新規および既存のタイムボードにエクスポートすることもできます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /ja/developers/metrics