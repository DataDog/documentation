---
aliases:
- /ja/llm_observability/experiments_preview
- /ja/llm_observability/experiments/
description: Agent Observability Experiments 機能の概要。
further_reading:
- link: /llm_observability/improve/experiments/setup
  tag: ドキュメント
  text: Agent Observability Experiments をセットアップして使用する
- link: https://www.datadoghq.com/blog/llm-experiments/
  tag: ブログ
  text: Datadog を使用して LLM 実験を作成および監視する
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: ブログ
  text: Datadog LLM Observability は OpenTelemetry GenAI セマンティック規約をネイティブにサポート
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: ブログ
  text: 'AI ROI の推進: 責任を持ってスケールできるように、Datadog がコスト、パフォーマンス、インフラストラクチャーを結び付ける方法'
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-nlq
  tag: ブログ
  text: LLM Observability を使用して NLQ エージェントのデバッグ時間を数時間から数分に短縮した方法
- link: https://www.datadoghq.com/blog/offline-llm-evaluations/
  tag: ブログ
  text: 'AI エージェントのオフライン評価: ベストプラクティス'
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: ブログ
  text: Datadog を使用して Google Cloud AI スタックを評価、最適化、保護する
- link: https://www.datadoghq.com/blog/llm-experimentation-autoresearch/
  tag: ブログ
  text: autoresearch と Agent Observability を使用して SQL クエリ最適化エージェントの精度を 59% 向上させた方法
- link: https://www.datadoghq.com/blog/from-traces-to-experiments-a-loop-for-improving-ai-agents/
  tag: ブログ
  text: 'トレースから実験へ: AI エージェントを改善するためのループ'
title: 実験
---
{{< img src="llm_observability/experiments/Experiments_LLMO.png" alt="Agent Observability、実験ビュー。見出し:「9 つのフィールドにわたる 6 つの実験の比較」。さまざまな実験の精度、正確性、期間、推定コスト、およびその他のメトリクスをグラフ化した折れ線グラフの可視化。" style="width:100%;" >}}

Agent Observability [Experiments][1] は、LLM アプリケーションおよびエージェントの構築のライフサイクル全体をサポートします。プロンプト、モデル、プロバイダー、またはシステムアーキテクチャへの変更がパフォーマンスにどのような影響を与えるかを理解する上で役立ちます。この機能を使用すると、次のことができます。

- データセットの作成とバージョン管理
- 実験の実行と管理
- 結果の比較と影響の評価

## クックブック {#cookbooks}

LLM Experiments で実行できることの詳細な例については、Datadog が提供する [Jupyter ノートブック][2]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/testing/experiments
[2]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks