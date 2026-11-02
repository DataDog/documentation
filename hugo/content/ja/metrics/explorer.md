---
aliases:
- /ja/graphing/metrics/explorer/
description: すべてのメトリクスを調査し分析する
further_reading:
- link: /metrics/summary/
  tag: ドキュメント
  text: Metrics Summary
- link: /metrics/distributions/
  tag: ドキュメント
  text: ディストリビューションメトリクス
- link: /dashboards/guide/quick-graphs/
  tag: ドキュメント
  text: Quick Graphs
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: ブログ
  text: Observability Pipelines を使用して、環境内のメトリクス量とタグを管理する
- link: https://www.datadoghq.com/blog/metrics-natural-language-queries/
  tag: ブログ
  text: 自然言語クエリを使用して、Datadog メトリクスを調べる
title: Metrics Explorer
---
## 概要{#overview}

[Metrics Explorer][1] は、Datadog でメトリクスを調査するための基本的なインターフェイスです。より高度なオプションを使用するには、[ノートブック][2]またはダッシュボード ([スクリーンボード][3]または[タイムボード][4]) を作成してください。

## 自然言語クエリ {#natural-language-queries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">Metrics Explorer の自然言語クエリは、選択した Datadog サイト ({{< region-param key="dd_site_name" >}}) では利用できません。</div>
{{< /site-region >}}

NLQ (自然言語クエリ) を使用すると、探している内容を通常の言葉で説明できます。Datadog は、サービス、属性、タグなどのコンテキストを理解し、リクエストを構造化されたメトリクスクエリに自動的に変換します。そのため、複雑な構文を記述することなく、メトリクスを簡単に調べることができるようになります。

この機能を利用するには、検索フィールドで [{{< ui >}}Ask{{< /ui >}}] (質問する) をクリックし、クエリを入力します。

{{< img src="/metrics/explorer/metrics_nlq_example_10152025.mp4" alt="Metrics Explorer の自然言語クエリ。通常の言葉を使用してメトリクスを検索する方法が示されています。" video=true >}}

組織で NLQ を無効にするには、[org_management 権限][11]が必要です。[{{< ui >}}Organization Settings{{< /ui >}}] (組織設定) > [{{< ui >}}Preferences{{< /ui >}}] (設定) に移動し、自然言語クエリ機能をオフに切り替えます。

## セッション {#sessions}

Metrics Explorer は最近の調査履歴を自動的に保持するため、前に行った作業をやり直すことなく、さまざまな質問を簡単に調べて共有できます。

セッションを使用して、以下の操作を行います。

- **別の調査を開始する:** [{{< ui >}}New Session{{< /ui >}}] (新規セッション) をクリックすると、現在の作業を失うことなく別の質問を調べることができます。
- **以前の作業に戻る:** 最近のセッションを選択または検索して、調査を続行します。
- **重要な調査を保存する:** セッションをピン留めして名前を変更すると、後で他のセッションと区別して見つけやすくなります。
- **代替案を探索する:** セッションをコピーし、元のセッションを保持したままコピーを変更します。
- **調査を共有する:** セッションリンクをコピーして、他のユーザーと共有します。
- **使用していないセッションを削除する:** 不要になったセッションを削除します。

{{< img src="metrics/explorer/09282026_metric_explorer_sessions.png" alt="Metrics Explorer セッションの例" style="width:80%;" >}}

## Graphing {#graphing}

クエリエディターを使用して、Metrics Explorer ページに表示されるグラフをカスタマイズします。

ページの右上にある時間帯を指定することができます。デフォルトは [{{< ui >}}Past 1 Hour{{< /ui >}}] (過去 1 時間) です。

{{< img src="metrics/explorer/metrics_explorer.png" alt="棒グラフで 2 つのクエリが表示されている Metrics Explorer" style="width:80%;" >}}

過去 24 時間以内に報告されていないメトリクスは、クエリエディターには表示されません。メトリクス名または完全なクエリを入力することで、これらのメトリクスをグラフに手動で追加できます。

### スコープ {#scope}

[{{< ui >}}from{{< /ui >}}] (取得元) テキストボックスでタグ値を選択または検索して、フィルタリングスコープを定義します。たとえば、[{{< ui >}}from{{< /ui >}}] テキストボックスを使用して、特定のホスト、クラスター、環境、またはリージョンからのメトリクス値をフィルタリングできます。

### スペース集計 {#space-aggregation}

メトリクスの値を結合するために使用される[スペース集計][5]を定義します。

利用可能なオプションは次のとおりです。

* 報告された値の平均値 (デフォルト)
* 報告された値の最大値
* 報告された値の最小値
* 報告された値の合計値

**注**: これらのオプションは、選択したメトリクスのタイプによって変わります。

### 関数と数式 {#functions-and-formulas}

関数ボタンを使用して、クエリに関数を追加することもできます。すべての関数をすべてのメトリクスタイプで使用できるわけではありません。詳細については、[クエリ][6]のドキュメントを参照してください。

### スプリットグラフ {#split-graph}

[{{< ui >}}Split Graph{{< /ui >}}] (スプリットグラフ) ボタンを使用すると、リージョン、サービス、環境などのタグの値でデータを分割して異なるグラフで表示できます。

### エクスポート {#export}

[{{< ui >}}Export{{< /ui >}}] (エクスポート) ボタン (<i class="icon-export"></i>) を使用してグラフをエクスポートします。

- グラフを共有するためのリンクをコピーする
- [インシデント][8]に追加する
- [モニター][9]を作成する
- [ダッシュボード][10]に保存する
- [ノートブック][2]に保存する 

### Quick Graphs {#quick-graphs}

Quick Graphs を使用すると、[ダッシュボード][4]や[ノートブック][2]を作成することなく、データを視覚化するためのさらに多くのオプションを利用できます。これらのグラフを利用すると、永続的なダッシュボードを作成したり、複雑な視覚化の設定を行ったりすることなく、問題を理解してトラブルシューティングすることができます。

詳細については、[Quick Graphs][7] のドキュメントをご覧ください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /ja/notebooks/
[3]: /ja/dashboards/#screenboards
[4]: /ja/dashboards/#get-started
[5]: /ja/metrics/introduction/#space-aggregation
[6]: /ja/dashboards/querying/#advanced-graphing
[7]: /ja/dashboards/guide/quick-graphs/
[8]: /ja/incident_response/incident_management/
[9]: /ja/monitors/
[10]: /ja/dashboards/
[11]: /ja/account_management/rbac/permissions/#access-management