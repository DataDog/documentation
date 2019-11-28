---
title: メトリクスの概要
kind: documentation
description: データ、集計、グラフ化メトリクスについて学ぶ
further_reading:
  - link: graphing/metrics/explorer
    tag: ドキュメント
    text: メトリクスエクスプローラー
  - link: graphing/metrics/summary
    tag: ドキュメント
    text: メトリクスの概要
  - link: graphing/metrics/distributions
    tag: ドキュメント
    text: ディストリビューションメトリクス
---

### メトリクスデータ

Datadog では、メトリクスデータは値とタイムスタンプを持つデータポイントとして収集され、格納されます。

```
[ 17.82,  22:11:01 ]
```

一連のデータポイントが 1 つの時系列として格納されます。

```
[ 17.82,  22:11:01 ]
[  6.38,  22:11:12 ]
[  2.87,  22:11:38 ]
[  7.06,  22:12:00 ]
```

### クエリ

クエリは格納された時系列を抽出し、定義された期間のデータポイントを報告します。15 分間の時系列をグラフ化したものを示します。

{{< img src="graphing/metrics/introduction/query.png" alt="Query" responsive="true" >}}

選択された期間が短い場合は、すべてのデータポイントが表示されます。しかし期間が長くなると、1 つのピクセルで数千もの未加工データポイントを表示することは不可能です。

### 時間集計

Datadog は時間集計を使用してこの表示問題を解決します。データポイントは、開始点と終了点がプリセットされた時間バケットに配置されます。たとえば、4 時間を調査する場合は、データポイントは 5 分バケットにまとめられます。データポイントのこのような結合方法は、**ロールアップ**と呼ばれます。

{{< img src="graphing/metrics/introduction/time-aggregation.png" alt="Time Aggregation" responsive="true" >}}

### 時系列の結合

複数の時系列をまとめて 1 つの時系列にすることがあります。たとえば、インフラストラクチャーの Web サーバーが受信した平均データを確認する場合を考えます。

2 つのホストが Datadog に同じメトリクスを送信しているとします。

{{< img src="graphing/metrics/introduction/adding-by-host.png" alt="Two hosts send metrics to Datadog" responsive="true" style="width:35%;" >}}

ホストごとにデータを見ると、`net.bytes_rcvd` が送信される時間がわずかに異なります。

{{< img src="graphing/metrics/introduction/mismatched-time-series.png" alt="Mismatched Time Series" responsive="true" >}}

### 空間集計

2 つの時系列を結合するには、データの時間が同期している必要があります。Datadog は以下のいずれかの方法を使用します。

  1. 時間集計が適用されない場合は、データポイントを補間する必要があります。まず、共通のタイムスタンプを決定します。これにより、その時点での各時系列の値が推計されます。

    {{< img src="graphing/metrics/introduction/interpolation.png" alt="Interpolation" responsive="true" style="width:80%;" >}}

  2. 時間集計が適用される場合は、ロールアップを使用して、各時系列で開始点と終了点を共有する時間バケットが作成されます。

    {{< img src="graphing/metrics/introduction/rollup.png" alt="Rollup" responsive="true" style="width:80%;" >}}

開始点と終了点が時間整合されると、時系列が空間集計されて、両方の平均を表す 1 つの時系列が生成されます。

{{< img src="graphing/metrics/introduction/combined-series.png" alt="Interpolation" responsive="true" >}}

### メトリクスクエリの分割

Datadog では、メトリクスクエリは以下のように表示されます。

{{< img src="graphing/metrics/introduction/ui-query.png" alt="UI Query" responsive="true" style="width:70%;" >}}

JSON を見ると、クエリは空間集計、メトリクス名、スコープ、およびグループ化によって分割できます。

{{< img src="graphing/metrics/introduction/color-query.png" alt="Query explained" responsive="true" style="width:70%;" >}}

* **Scope (スコープ)** は、クエリの時系列の選択に使用する一連のタグです。
* **Grouping (グループ化)** は、空間集計を適用する一連のタグです。
* **Time aggregation (時間集計)** は黙示的に行われますが、ロールアップ関数を使用して手動で設定できます。

{{< img src="graphing/metrics/introduction/color-query2.png" alt="Query explained" responsive="true" style="width:70%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
