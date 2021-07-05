---
title: ディストリビューション
kind: documentation
description: データセット全体のグローバルパーセンタイルを計算する
aliases:
  - /ja/developers/faq/characteristics-of-datadog-histograms/
  - /ja/graphing/metrics/distributions/
further_reading:
  - link: /developers/metrics/dogstatsd_metrics_submission/
    tag: ドキュメント
    text: DogStatsD でのディストリビューションの使用
---
## 概要

ディストリビューションは、フラッシュ間隔の間に複数のホストから送信された値を集計して、インフラストラクチャー全体の統計的分布を測定するメトリクスタイプです。

グローバルディストリビューションは、サービスなどの論理オブジェクトを基底のホストとは無関係に計測することを目的としています。Agent 側で集計する[ヒストグラム][1]とは異なり、グローバルディストリビューションはフラッシュ間隔内に収集されたすべての未加工データを送信し、集計はサーバー側で行われます。基になるデータ構造は集計されておらず、未加工データを表すため、ディストリビューションは 2 つの主要な機能を提供します。

* <mrk mid="17" mtype="seg"/><mrk mid="18" mtype="seg"/>

* **タグ付けのカスタマイズ**: この機能を使用すると、ホストレベルの詳細度を必要としない場合にカスタムメトリクスのタグ付けスキームを制御することができます (チェックアウトサービスの毎秒トランザクションなど)。

実装の詳細については、[開発ツールのセクション][1]を参照してください。

**注:** ディストリビューションは新しいメトリクスタイプであるため、Datadog への送信時に新しいメトリクス名の下でインスツルメンテーションを行う必要があります。

## 集計

`gauges` や `histograms` といったその他のメトリクスタイプと同様、ディストリビューションでも `count`、`min`、`max`、`sum`、`avg` を利用して集計を行うことができます。ディストリビューションはまず、その他のメトリクスと同じ方法で (カスタムタグをコードにセットして) タグ付けされ、メトリクスを報告したホストに基づくあらゆるホストタグで解決されます。また、[メトリクスの概要][2]ページに記載の通り、ディストリビューション上でクエリが可能なすべてのタグについてのパーセンタイル集計を計算することもできます。この方法で `p50`、`p75`、`p90`、`p95`、`p99` の集計を得ることができます。

{{< img src="metrics/distributions/percentiles.gif" alt="パーセンタイルを有効化"  style="width:80%;">}}

ディストリビューションメトリクスにパーセンタイル集計を適用することを選択すると、これらの集計を自動的にグラフ化 UI で使用できるようになります。

{{< img src="metrics/distributions/graph_percentiles.jpg" alt="ディストリビューションメトリクスの集計"  style="width:80%;">}}

## タグ付けのカスタマイズ

ディストリビューションには、ホストレベルの詳細度が意味を持たない場合にメトリクスへのタグ付けを制御する機能があります。タグのコンフィギュレーションは維持したいタグの_許可リスト_になります。

タグ付けをカスタマイズするには:

1. Metrics Summary テーブルでカスタムディストリビューションのメトリクス名をクリックし、メトリクス詳細のサイドパネルを開きます。
2. **Manage Tags** ボタンをクリックして、タグコンフィギュレーションモーダルを開きます。
3. **Custom...** タブをクリックして、クエリ用に維持したいタグをカスタマイズします。

**注**: 許可リストベースのタグのカスタマイズでは、タグの除外はサポートされていません。`!` で始まるタグは追加できません。

{{< img src="metrics/distributions/managetags.png" alt="ディストリビューションでタグを構成する"  style="width:80%;">}}

## 監査イベント
タグコンフィギュレーションまたはパーセンタイル集計の変更があった場合、[イベントストリーム][3]にイベントが作成されます。このイベントでは、変更内容が説明され、変更を行ったユーザーが表示されます。

ディストリビューションメトリクスでタグコンフィギュレーションを作成、更新、または削除した場合は、次のイベント検索の例を確認できます。
```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20tag%20configuration
```

パーセンタイル集計をディストリビューションメトリクスに追加または削除した場合、次のイベント検索の例を見ることができます。
```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20percentile%20aggregations
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/developers/metrics/types/
[2]: https://app.datadoghq.com/metric/distribution_metrics
[3]: https://app.datadoghq.com/event/stream