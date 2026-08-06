---
aliases:
- /ja/tracing/llm_observability/
further_reading:
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-dashboards
  tag: ブログ
  text: Datadog LLM Observability を使用した信頼性の高いダッシュボードエージェントの構築
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: ブログ
  text: 'AI ROI の推進: 責任を持ってスケールできるように、Datadog がコスト、パフォーマンス、インフラストラクチャーを結び付ける方法'
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: ブログ
  text: Datadog LLM Observability は、OpenTelemetry GenAI セマンティック規約をネイティブにサポートしています
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: ブログ
  text: Datadog LLM Observability を使用して Strands Agents のワークフローを可視化する
- link: https://www.datadoghq.com/blog/anthropic-integration-datadog-llm-observability/
  tag: ブログ
  text: Datadog LLM Observability で Anthropic アプリケーションを監視する
- link: https://www.datadoghq.com/blog/monitor-llm-prompt-injection-attacks/
  tag: ブログ
  text: LLM プロンプトインジェクション攻撃監視で機密データを保護するベストプラクティス
- link: https://www.datadoghq.com/blog/vllm-integration/
  tag: ブログ
  text: Datadog の vLLM インテグレーションを使った LLM アプリケーションのパフォーマンスの最適化
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: ブログ
  text: Datadog GPU モニタリングを使った AI インフラストラクチャーの最適化とトラブルシューティング
- link: https://www.datadoghq.com/blog/llm-observability-bedrock-agents/
  tag: ブログ
  text: Datadog LLM Observability を使った Amazon Bedrock 上に構築されたエージェントの監視
- link: https://www.datadoghq.com/blog/monitor-mcp-servers/
  tag: ブログ
  text: MCP サーバーにおける一般的なセキュリティリスクの特定
- link: https://www.datadoghq.com/blog/detect-abuse-ai-infrastructure/
  tag: ブログ
  text: 'AI インフラストラクチャーの悪用: 管理が不十分な認証情報とリソースが LLM アプリケーションをどのように危険にさらすか'
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-nlq
  tag: ブログ
  text: LLM Observability を使用して NLQ エージェントのデバッグ時間を数時間から数分に短縮した方法
- link: https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications
  tag: ラーニングセンター
  text: LLM アプリケーションのトレース
title: LLM Observability
---
{{< learning-center-callout header="ラーニングセンターで LLM Observability を使い始めてみてください" btn_title="今すぐ登録する" btn_url="https://learn.datadoghq.com/courses/llm-obs-getting-started">}}
  LLM アプリケーションのパフォーマンス、コスト、トレース、トークン使用量、エラーを監視して、問題を特定して解決する方法を学びます。
{{< /learning-center-callout >}}

## 概要 {#overview}

LLM Observability を使用すると、チャットボットなど LLM を活用したアプリケーションを監視、トラブルシューティング、評価できます。問題の根本原因を調査し、運用パフォーマンスを監視し、LLM アプリケーションの品質、プライバシー、安全性を評価できます。

アプリケーションによって実行された各リクエストは、Datadog の [**LLM Observability** ページ][1] にトレースとして表示されます。

{{< img src="llm_observability/traces.png" alt="LLM Observability ページ上のプロンプト-レスポンスペアトレースのリスト" style="width:100%;" >}}

トレースは次のものを表します。

- トークン、エラー情報、レイテンシーを含む個々の LLM 推論
- LLM 呼び出しとそのコンテキスト操作 (ツール呼び出しや前処理ステップなど) のグループ化である所定の LLM ワークフロー
- LLM エージェントによって実行される動的な LLM ワークフロー

各トレースには、エージェントによって行われた各選択や特定のワークフローの各ステップを表すスパンが含まれています。特定のトレースには、入力と出力、レイテンシー、プライバシーの問題、エラーなども含まれる場合があります。詳細については、[用語と概念][2] を参照してください。

## エンドツーエンドのトレースによるトラブルシューティング {#troubleshoot-with-end-to-end-tracing}

LLM アプリケーションのチェーンと呼び出しのすべてのステップを表示して、問題のあるリクエストとエラーの根本原因を特定します。

{{< img src="llm_observability/errors.png" alt="トレースのサイドパネル内の [Error] (エラー) タブに表示されるトレース内で発生したエラー" style="width:100%;" >}}

## 運用メトリクスを監視してコストを最適化する {#monitor-operational-metrics-and-optimize-cost}

[すぐに使えるダッシュボード][7] を利用して、すべての LLM アプリケーションのコスト、レイテンシー、パフォーマンス、使用傾向を監視しましょう。

{{< img src="llm_observability/dashboard_1.png" alt="Datadog のすぐに使える LLM Observability Operational Insights ダッシュボード" style="width:100%;" >}}

## LLM アプリケーションの品質と効果の評価 {#evaluate-the-quality-and-effectiveness-of-your-llm-applications}

ユーザーが LLM アプリケーションに何を求めているかを理解し、カバレッジのギャップを特定し、[Patterns][10] (パターン) を使って時間の経過とともに応答の品質を継続的に監視しましょう。これは、本番環境トラフィックの自動階層トピッククラスタリングです。

{{< img src="llm_observability/topic-detail.png" alt="インタラクション埋め込みの散布図と、トピックラベルと信頼度スコア付きのインタラクションのテーブルが表示されているトピック詳細ビュー。" style="width:100%;" >}}

## 機密データを保護し、悪意のあるユーザーを特定する {#safeguard-sensitive-data-and-identify-malicious-users}

AI アプリケーション内の機密データを自動的にスキャンしてマスキングし、プロンプトインジェクションを識別するなど、さまざまな評価を実施します。

{{< img src="llm_observability/prompt_injection.png" alt="LLM Observability によって検出されたプロンプトインジェクション試行の例" style="width:100%;" >}}

## インサイトとして強調表示される異常を確認する {#see-anomalies-highlighted-as-insights}

LLM Observability Insights は、ユーザーが運用メトリクス (期間やエラー率など) の異常を特定できるよう支援する監視機能とそのための [out-of-the-box (OOTB) 評価][9] を提供します。

外れ値検出は、主要な次元ごとに実施されます。
- スパン名
- ワークフロータイプ
- [Patterns の入力/出力トピック][10]

これらの外れ値は過去 1 週間にわたって分析され、ユーザーが選択した対応する時間ウィンドウに自動的に表示されます。これにより、チームは自らの LLM アプリケーションにおける回帰、パフォーマンスの変動、または予期しない動作をプロアクティブに検出できるようになります。

{{< img src="llm_observability/Overview_LLMO.png" alt="LLM Observability Monitor ページの上部に「Insights」バナーがあります。バナーには 8 つのインサイトが表示され、詳細情報が記載されたサイドパネルに移動する [View Insights] (インサイトの表示) ボタンがあります。" style="width:100%;" >}}

## LLM Observability との統合を活用する {#use-integrations-with-llm-observability}

[LLM Observability SDK for Python][3] は、OpenAI、LangChain、AWS Bedrock、Anthropic などのフレームワークと統合されます。コードの変更なしで、LLM 呼び出しを自動的に追跡し、注釈を付け、レイテンシー、エラー、トークン使用量のメトリクスをキャプチャします。

<div class="alert alert-info">Datadog はさまざまな人工知能 (AI) および機械学習 (ML) 機能を提供しています。<a href="/integrations/#cat-aiml">Integrations ページおよび Datadog Marketplace の AI/ML 統合</a>は、プラットフォーム全体の Datadog 機能です。<br><br> たとえば、APM は OpenAI の使用状況を監視するためのネイティブ統合を提供し、Infrastructure Monitoring は計算集約型 AI ワークロードを監視するための NVIDIA DCGM エクスポーターとの統合を提供します。これらの統合は LLM Observability のサービスとは異なります。</div>

詳細については、[自動インスツルメンテーションのドキュメント][8] を参照してください。

## 始める準備はできましたか{#ready-to-start}

[セットアップドキュメント][5] を参照して LLM アプリケーションのインスツルメンテーション手順を確認するか、[LLM アプリケーションのトレースガイド][6] に従って、[LLM Observability SDK for Python][3] を使用してトレースを生成してください。

##  参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /ja/llm_observability/terms
[3]: /ja/llm_observability/setup/sdk
[4]: /ja/llm_observability/setup/api
[5]: /ja/llm_observability/setup
[6]: /ja/llm_observability/quickstart
[7]: https://app.datadoghq.com/dash/integration/llm_operational_insights
[8]: /ja/llm_observability/setup/auto_instrumentation
[9]: /ja/llm_observability/evaluations/managed_evaluations
[10]: /ja/llm_observability/monitoring/patterns