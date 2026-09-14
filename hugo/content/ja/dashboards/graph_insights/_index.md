---
description: Metric Correlations、Watchdog Explains、およびダッシュボードの異常検知を使用して、不規則なメトリックの動作を分析し、潜在的な根本原因を発見します。
disable_toc: false
further_reading:
- link: /watchdog/insights/
  tag: ドキュメント
  text: Watchdog Insights の詳細はこちら
- link: https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/
  tag: ブログ
  text: 異常検知、予測相関 - AI アシスタンスによるメトリクス監視
title: Graph Insights
---
## 概要 {#overview}

Graph Insights は、同時期に不規則な動作を示した他のメトリクスを検索することにより、観測された問題の潜在的な根本原因を見つける上で役立ちます。Metric Correlations は、ダッシュボード、インテグレーション、APM、カスタムメトリクスなど、さまざまなソースからメトリクスをスキャンします。

## Metric Correlations {#metric-correlations}

<div class="alert alert-info">Metric Correlations は、<strong>Metric</strong> データソースを使用する<a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">時系列ウィジェット</a>で利用できます。</div>

検索をより効果的に絞り込むために、Metric Correlations は関連するダッシュボードやサービスに関する情報を使用します。Correlations は、APM、インテグレーション、ダッシュボード、および選択した任意のメトリクス名前空間など、さまざまなソースからのメトリクスを精査できます。対応する期間にわたって他のメトリクスの異常を検索し、Datadog が自動的に手がかりを提供することで、より効率的な根本原因分析を促進します。

詳細については、[Metric Correlations][1] のドキュメントを参照してください。

## Watchdog Explains {#watchdog-explains}

<div class="alert alert-info">Watchdog Explains は、<strong>Metric</strong> データソースを使用する<a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">時系列ウィジェット</a>で利用できます。</div>

Datadog は、アプリケーションのパフォーマンスに関するインサイトを提供するために、メトリクス、トレース、ログなど、さまざまな種類のデータを収集しており、何が、どのように、なぜ発生しているかを把握できます。Watchdog Explains は、レイテンシー、エラー率、リクエスト数の推移などの高レベルな傾向を分析し、重要なシグナルを検知します。これらのグラフでスパイクが確認された場合、Watchdog Explains は、直ちに検証すべき疑問点の調査を支援します。
- スパイクのソースとは何ですか?
- この異常は全員に影響しますか? それとも孤立したインシデントですか?

詳細については、[Watchdog Explains][2] のドキュメントを参照してください。

## ダッシュボードの異常検知 {#dashboard-anomaly-detection}

<div class="alert alert-info">異常検知は、<strong>Metric</strong> データソースを使用する<a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">時系列ウィジェット</a>で利用できます。</div>

Datadog はダッシュボード上のグラフ全体で異常を検知し、同時に発生した異常をグループ化して問題としてまとめます。各問題について、Datadog は異常の主な原因となっているタグを特定します。Watchdog Explains を使用して単一のグラフを分析することも、Bits Investigation に根本原因分析を委任することもできます。

詳細については、[ダッシュボードの異常を調査する][3] を参照してください。

## 詳細情報 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/graph_insights/correlations/
[2]: /ja/dashboards/graph_insights/watchdog_explains/
[3]: /ja/dashboards/graph_insights/investigate_anomalies/