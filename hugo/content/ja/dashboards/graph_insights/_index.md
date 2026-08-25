---
disable_toc: false
further_reading:
- link: /watchdog/insights/
  tag: ドキュメント
  text: Watchdog Insights について
title: グラフインサイト
---

## 概要

グラフインサイトは、同時期に不規則な動作を示した他のメトリクスを検索することで、観察された問題の潜在的な根本原因を見つけるのに役立ちます。Metric Correlations は、ダッシュボード、インテグレーション、APM、カスタムメトリクスなどのさまざまなソースからメトリクスをスキャンします。

## Metric Correlations

<div class="alert alert-info">Metric Correlations は、<strong>メトリクス</strong>データソースを持つ<a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">時系列ウィジェット</a>で利用できます。</div>

検索をより効果的に行うために、Metric Correlations は関連するダッシュボードやサービスに関する情報を活用します。 Metric Correlations では、APM、インテグレーション、ダッシュボード、任意に選択したメトリクスネームスペースなど、さまざまなソースからメトリクスを抽出し、対応する期間内で他のメトリクスの異常を検出します。これにより、Datadog が自動的に手がかりを提供し、より効率的な根本原因分析を促進します。

詳細については、[Metric Correlations][1] のドキュメントを参照してください。

## Watchdog の説明

<div class="alert alert-info">Watchdog Explains は、<strong>メトリクス</strong>データソースを持つ<a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">時系列ウィジェット</a>で利用できます。</div>

Datadog は、メトリクス、トレース、ログなど、アプリケーションパフォーマンスに関するさまざまなデータを収集し、「何が」「どのように」「なぜ」起こっているのかを明らかにします。Watchdog Explains は、レイテンシー、エラー率、リクエスト数の推移などの大まかなトレンドを分析し、重要なシグナルを検出します。これらのグラフでスパイクが確認された際、Watchdog Explains は次のような重要な疑問を迅速に解明する手助けをします。
- このスパイクの原因は？
- この異常は全体に影響しているのか、それとも単独の事象なのか？

詳細については、[Watchdog Explains][2] のドキュメントを参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/graph_insights/correlations/
[2]: /ja/dashboards/graph_insights/watchdog_explains/