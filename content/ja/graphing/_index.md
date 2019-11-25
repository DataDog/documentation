---
title: グラフの作成方法
kind: documentation
disable_toc: true
aliases:
  - /ja/guides/graphing
  - /ja/graphing/miscellaneous/metrics_arithmetic
  - /ja/graphing/faq/is-there-a-way-for-me-to-set-the-maximum-and-minimum-values-on-the-y-axis-of-a-graph
  - /ja/graphing/faq/is-it-possible-to-adjust-the-y-axis-for-my-graphs
description: データを可視化してインサイトを得る
further_reading:
  - link: 'https://learn.datadoghq.com/course/view.php?id=8'
    tag: ラーニング センター
    text: ダッシュボードの高度な活用法
---
グラフは、監視するシステムを見るための窓のようなもので、Datadog のあらゆる場所、電子メール通知、Slack、他のインテグレーションなどで使用されます。メトリクス、モニター、ダッシュボード、ノートブックを使用してグラフを定義することにより、インフラストラクチャーを監視できます。

## 概要

{{< whatsnext desc="This section includes the following topics:" >}}
    {{< nextlink href="/graphing/using_graphs/" >}}<u>グラフの使用</u>: メトリクス、モニター、ダッシュボード、またはノートブックを使用するかどうかにかかわらず、すべてのグラフには共通の機能があります。グラフをセットアップする際のベストプラクティスに従うために、こちらから開始してください。{{< /nextlink >}}
    {{< nextlink href="/graphing/dashboards" >}}<u>ダッシュボード</u>: ダッシュボードは Datadog のツールで、キーパフォーマンスメトリクスを視覚的に追跡、分析、表示し、インフラストラクチャーの健全性を監視します。ダッシュボード (Screenboard と Timeboard) の使用方法、テンプレート変数の使用方法、および社内または社外のチームメンバーとのグラフの共有方法について理解を深めます。{{< /nextlink >}}
    {{< nextlink href="/graphing/metrics/" >}}<u>メトリクス</u>: インテグレーションを Datadog に接続すると、インテグレーションはシステムに関するメトリクスを Datadog に送信します。Datadog がこのようなメトリクスを受信すると、グラフを作成してデータを調査できるようになります。{{< /nextlink >}}
    {{< nextlink href="/graphing/correlations/" >}}<u>Metric Correlations</u>: Correlations は、選択したメトリクスに関連する他のメトリクスに不規則な挙動がないか検索します。{{< /nextlink >}}
    {{< nextlink href="/graphing/notebooks" >}}<u>ノートブック</u>: ノートブックは、グラフとテキストを組み合わせて、1 列のセル形式で表示します。データの背景情報を調査したり共有するために便利なように設計されています。{{< /nextlink >}}
    {{< nextlink href="/graphing/event_stream/" >}}<u>イベントストリーム</u>: イベントストリームは、インフラストラクチャーと関連モニターによって生成された最新のイベントを表示します。{{< /nextlink >}}
    {{< nextlink href="/graphing/infrastructure/" >}}<u>インフラストラクチャー</u>: インフラストラクチャーリストページは、ホストマップとコンテナマップ、Process Monitoring、Serverless など、Datadog によって監視されるすべてのホストを表示します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/" >}}<u>クエリからグラフまで</u>: このセクションは複数のトピックで構成され、高度なグラフ化関数 (アルゴリズム、算術演算、カウント、補間、ランク、レート、回帰、ロールアップ、スムーシング、タイムシフト) を説明します。{{< /nextlink >}}
    {{< nextlink href="/graphing/graphing_json/" >}}<u>JSON を使用したグラフ作成</u>: Datadog API を使用してグラフを作成します。{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/" >}}<u>ウィジェット</u>: Datadog で作成できるすべてのタイプの可視化を説明します。{{< /nextlink >}}
    {{< nextlink href="/graphing/guide/" >}}<u>ガイド</u>: グラフの使用に関するステップバイステップの詳細なチュートリアルです。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}