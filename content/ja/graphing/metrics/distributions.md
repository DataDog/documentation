---
title: ディストリビューションメトリクス
kind: documentation
description: データセット全体のグローバルパーセンタイルを計算する
aliases:
  - /ja/developers/faq/characteristics-of-datadog-histograms/
further_reading:
  - link: developers/metrics/dogstatsd_metrics_submission
    tag: Documentation
    text: DogStatsD でのディストリビューションの使用
---
<div class="alert alert-warning">
この機能はベータ版です。<a href="https://docs.datadoghq.com/help/">ご使用のアカウントでディストリビューションメトリクスを有効にしたい場合は、Datadog のサポートチームにお問い合わせください</a>。
</div>

## 概要

ディストリビューションは、フラッシュ間隔の間に複数のホストから送信された値を集計して、インフラストラクチャー全体の統計的分布を測定するメトリクスタイプです。

グローバルディストリビューションは、サービスなどの論理オブジェクトを基底のホストとは無関係に計測することを目的としています。Agent 側で集計する[ヒストグラム][1]とは異なり、グローバルディストリビューションはフラッシュ間隔内に収集されたすべての未加工データを送信し、集計はサーバー側で行われます。基になるデータ構造は集計されておらず、未加工データを表すため、ディストリビューションは 2 つの主要な機能を提供します。

* <mrk mid="17" mtype="seg"/><mrk mid="18" mtype="seg"/>

* <mrk mid="19" mtype="seg"/><mrk mid="20" mtype="seg"/>

実装の詳細については、[開発ツールのセクション][1]を参照してください。ディストリビューションは新しいメトリクスタイプなので、Datadog への送信時には新しいメトリクス名でインストルメント化する必要があることに注意してください。

## 集計

`gauges` や `histograms` などのメトリクスタイプと同様に、ディストリビューションでは集計 `count`、`min`、`max`、`sum`、`avg` を使用できます。ディストリビューションは、まず他のメトリクスと同様にタグ付けられ (コードで設定されたカスタムタグを使用)、メトリクスを報告したホストに基づいてホストタグに解決されます。[ディストリビューションメトリクス][2]のページで指定された一連のタグ (最大 10 個) のパーセンタイル集計も計算できます。提供される集計は `p50`、`p75`、`p90`、`p95`、`p99` です。

{{< img src="graphing/metrics/distributions/global_metrics_selection.png" alt="Distribution Metric UI"  style="width:80%;">}}

ディストリビューションメトリクスにパーセンタイル集計を適用することを選択すると、これらの集計を自動的にグラフ化 UI で使用できるようになります。

{{< img src="graphing/metrics/distributions/dogweb_latency_bis.png" alt="Distribution metric bis"  style="width:80%;">}}

## タグ付けのカスタマイズ

ディストリビューションには、ホストレベルの詳細度が意味を持たない場合にメトリクスへのタグ付けを制御する機能があります。

タグ付けをカスタマイズするには、テーブル内のメトリクスにカーソルを置いて鉛筆アイコンをクリックし、編集します。表示されるモーダルウィンドウで、Custom... を選択します。デフォルトで、コードで定義したタグのホワイトリストが表示されます。これらのタグは自由に削除でき、また、ホストレベルの任意のタグを追加して戻すこともできます。

**注**: ホワイトリストベースのタグのカスタマイズでは、タグの除外はサポートされていません。`!` で始まるタグは追加できません。

{{< img src="graphing/metrics/distributions/distribution_metric.png" alt="Distribution metric"  style="width:80%;">}}

## ディストリビューションメトリクスのカウント

パーセンタイル集計付きディストリビューションメトリクス (`p50`、`p75`、`p90`、`p95`、`p99`) は、カスタムメトリクスまたは時系列を生成します。この点で、ゲージ、カウント、ヒストグラム、非パーセンタイル集計付きディストリビューション (`sum`、`count`、`min`、`max`、`avg`) とは異なります。パーセンタイルは再集計できないので、クエリされる可能性のあるすべてのタグの組み合わせに対して、Datadog は 5 つの時系列を維持します。これは、ゲージ、カウント、ヒストグラム、または非パーセンタイル集計付きディストリビューションから生成されるカスタムメトリクスの数とは別のものです (データに現れるタグ値組み合わせの一意の数に依存)。

ゲージ、カウント、ヒストグラム、または非パーセンタイル集計付きディストリビューションから生成されるカスタムメトリクスのカウントの詳細については、[カスタムメトリクス][2]のページを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/metrics/types
[2]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics