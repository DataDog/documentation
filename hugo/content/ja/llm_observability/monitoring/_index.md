---
description: Agent Observability でアプリケーションをさらに詳しく確認する方法。
further_reading:
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: ラーニングセンター
  text: Agent Observability で調査する
title: モニタリング
---
## 概要 {#overview}

トレース、クラスター、その他のリソース全体のデータをクエリ、可視化、相関分析、調査するためのツールを使用して、本番環境の LLM アプリケーションを探索および分析します。

トレース、メトリクス、オンライン評価全体にわたる統合された可視性により、LLM を活用したシステムのパフォーマンス監視、問題のデバッグ、品質評価、セキュリティ保護を行います。

### リアルタイムパフォーマンスモニタリング {#real-time-performance-monitoring}

組み込みのメトリクスとダッシュボードを使用して、LLM アプリケーションの運用健全性をモニタリングします。

{{< img src="llm_observability/index/llm_dashboard_light.png" alt="さまざまなメトリクスと可視化を表示する Agent Observability Operational Insights ダッシュボード。トレースとスパンの総数、成功率とエラー率などを含む概要セクション、およびモデル使用量のドーナツチャート、呼び出しごとの平均入力トークン数と出力トークン数などを含む LLM 呼び出しセクションが含まれています。" style="width:100%">}}

- **リクエスト量とレイテンシー**: さまざまなモデル、操作、エンドポイント全体で、1 秒あたりのリクエスト数、応答時間、パフォーマンスのボトルネックを追跡します。
- **エラー追跡**: 詳細なエラーコンテキストを使用して、HTTP エラー、モデルのタイムアウト、失敗したリクエストをモニタリングします。
- **トークン消費量**: プロンプトトークン、キャッシュトークン、完了トークン、総使用量を追跡して、コストを最適化します。
- **モデル使用状況分析**: 呼び出されているモデル、その頻度、およびパフォーマンス特性をモニタリングします。

すぐに使用できる [Agent Observability Operational Insights ダッシュボード][6] は、トレースレベルおよびスパンレベルのメトリクス、エラー率、レイテンシーの内訳、トークン消費の傾向、トリガーされたモニターの統合ビューを提供します。

### 本番環境のデバッグとトラブルシューティング {#production-debugging-and-troubleshooting}

詳細な実行可視化により、複雑な LLM ワークフローをデバッグします。

{{< img src="llm_observability/index/llm_trace_light.png" alt="Agent Observability におけるトレースの詳細ビュー。各サービス呼び出しを視覚的に表現するフレームグラフを備えています。'OpenAI.createResponse' が選択され、入力メッセージや出力メッセージを含む詳細なスパンビューが表示されます。" style="width:100%">}}

- **エンドツーエンドのトレース分析**: ユーザー入力からモデル呼び出し、ツール呼び出し、応答生成までの完全なリクエストフローを可視化します。
- **スパンレベルのデバッグ**: 前処理ステップ、モデル呼び出し、後処理ロジックなど、チェーン内の個々の操作を調査します。
- **エラーの根本原因の特定**: 詳細なエラーコンテキストとタイミング情報を使用して、マルチステップチェーン、ワークフロー、または Agent 操作における障害箇所を特定します。
- **パフォーマンスのボトルネックの特定**: 低速な操作を見つけ、ワークフローコンポーネント全体のレイテンシーの内訳に基づいて最適化します。

### 品質および安全性の評価 {#quality-and-safety-evaluations}

{{< img src="llm_observability/index/llm_example_eval_light.png" alt="Agent Observability の [Evaluations] タブにおけるスパンの詳細ビュー。[Confirmed Contradiction]、フラグが付けられた出力、コンテキスト引用、およびフラグが付けられた理由の説明を含む [Hallucination evaluation] を表示します。" style="width:100%">}}

オンライン評価を使用して、LLM Agent またはアプリケーションが品質基準を満たしていることを確認します。Datadog でホストおよび管理される評価、カスタム評価の取り込み、および安全性モニタリング機能に関する包括的な情報については、[評価ドキュメント][5] を参照してください。

### LLM アプリケーションのトレースとスパンをクエリする {#query-your-llm-applications-traces-and-spans}

{{< img src="llm_observability/index/llm_query_example_light.png" alt="Agent Observability > Traces view。ユーザーがクエリ `ml_app:shopist-chat-v2 'purchase' -'discount' @trace.total_tokens:>=20` を入力し、さまざまなトレースが表示されています。" style="width:100%">}}

Agent Observability のクエリインターフェースを使用して、LLM アプリケーションによって生成されたトレースとスパンを検索、フィルタリング、分析する方法を学びます。[クエリドキュメント][1] では、以下の方法について説明しています。

- 検索バーを使用して、モデル、ユーザー、エラー状態などの属性でトレースとスパンをフィルタリングします。
- 高度なフィルターを適用して、特定の LLM 操作や期間に焦点を絞ります。
- トレースの詳細を可視化および調査して、LLM ワークフローのトラブルシューティングと最適化を行います。

これにより、問題を迅速に特定し、パフォーマンスを監視し、本番環境における LLM アプリケーションの動作に関するインサイトを得ることができます。


### APM と Agent Observability の相関付け {#correlate-apm-and-agent-observability}

{{< img src="llm_observability/index/llm_apm_example_light.png" alt="Datadog APM のトレース。[Overview] タブには [LLM Observability] セクションが表示され、Agent Observability でスパンを表示するためのリンクと、入力テキストおよび出力テキストが含まれています。" style="width:100%">}}

Datadog APM でインスツルメンテーションされたアプリケーションでは、SDK を通じて [APM と Agent Observability を相関付ける][2] ことができます。APM と Agent Observability を相関付けることで、アプリケーションの問題から LLM 固有の根本原因に至るまで、完全なエンドツーエンドの可視性と詳細な分析が可能になります。

### Patterns {#patterns}

{{< img src="llm_observability/Patterns.png" alt="スコアとボリュームを含む階層的なトピックを表示する [Patterns] ページ。クラスター化されたインタラクション数、特定されたトピック数、およびクラスター化されたインタラクションの割合 (パーセント) を示す 3 つの KPI も表示されます。" style="width:100%">}}

[Patterns][3] は、LLM アプリケーションの本番トラフィックを階層的なトピックに自動的にクラスター化します。これにより、ユーザーが求めている内容を理解し、評価データセットのカバレッジギャップを特定し、障害モードを診断できます。

### Agent 型システムのモニタリング {#monitor-your-agentic-sytems}

複数のツールや推論チェーンを使用する Agent 型 LLM アプリケーションを、Datadog の [Agent Monitoring][4] でモニタリングする方法を学びます。この機能は、Agent のアクション、ツールの使用状況、推論ステップを追跡し、複雑な LLM ワークフローに対する可視性を提供することで、Agent 型システムの効果的なトラブルシューティングと最適化を可能にします。詳細については、[Agent Monitoring のドキュメント][4] を参照してください。

### Prompt Management {#prompt-management}

[Prompt Management][7] は、LLM アプリケーションで使用されるプロンプトの一元化されたレジストリを提供します。Datadog、Python SDK、または API を通じてプロンプトを作成およびバージョン管理し、実行時に SDK を使用して取得できます。これにより、プロンプトの反復作業をアプリケーションのデプロイサイクルから切り離すことができます。詳細については、[Prompt Management のドキュメント][7] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/monitoring/querying
[2]: /ja/llm_observability/monitoring/llm_observability_and_apm
[3]: /ja/llm_observability/monitoring/patterns/
[4]: /ja/llm_observability/monitoring/agent_monitoring
[5]: /ja/llm_observability/evaluations/
[6]: https://app.datadoghq.com/dash/integration/llm_operational_insights?fromUser=false&refresh_mode=sliding&from_ts=1758905575629&to_ts=1758909175629&live=true
[7]: /ja/llm_observability/monitoring/prompt_management