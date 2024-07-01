---
aliases:
- /ja/graphing/metrics/explorer/
description: すべてのメトリクスを調査し分析する
further_reading:
- link: /metrics/summary/
  tag: ドキュメント
  text: メトリクスの概要
- link: /metrics/distributions/
  tag: ドキュメント
  text: ディストリビューションメトリクス
title: メトリクスエクスプローラー
---

## 概要

[メトリクスエクスプローラー][1]は、メトリクスを Datadog で調査するための基本のインターフェースです。より高度なオプションを使用するには、[ノートブック][2]またはダッシュボード（[スクリーンボード][3]や[タイムボード][4]）を作成します。

## グラフ

クエリエディタを使用して、Metrics Explorer ページに表示されるグラフをカスタマイズします。

ページの右上にある時間帯を指定することができます。デフォルトは **Past 1 Hour** です。

{{< img src="metrics/explorer/metrics_explorer.png" alt="2 つのクエリを棒グラフで表示するメトリクスエクスプローラー" style="width:80%;" >}}

過去 24 時間に報告されていないメトリクスは、クエリエディタに表示されません。メトリクス名または完全なクエリを入力することで、これらのメトリクスをグラフに手動で追加することができます。

### スコープ

**from** テキストボックスでタグの値を選択または検索すると、スコープを定義できます。たとえば、**from** テキストボックスを使用して、メトリクスの値を特定のホスト、クラスター、環境、リージョンで絞り込むことができます。

### 空間集計

メトリクスの値を結合するために使用される[空間集計][5]を定義します。

利用可能なオプションは次のとおりです。

* 報告された値の平均値（デフォルト）
* 報告された値の最大値
* 報告された値の最小値
* 報告された値の合計値

**注**: これらのオプションは、選択したメトリクスのタイプによって変わります。

### 関数と数式

関数ボタンを使って、オプションで関数をクエリに追加することができます。すべての関数が、すべてのメトリクスタイプで利用できるわけではありません。詳しくは[クエリ][6]のドキュメントをご覧ください。

### エクスポート

右上のボタンで、グラフをダッシュボードやノートブックにエクスポートします。また、**Split Graph in Notebook** を使用すると、データをリージョン、サービス、環境などで個別のグラフに分割して表示することも可能です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /ja/notebooks/
[3]: /ja/dashboards/#screenboards
[4]: /ja/dashboards/#timeboards
[5]: /ja/metrics/introduction/#space-aggregation
[6]: https://docs.datadoghq.com/ja/dashboards/querying/#advanced-graphing