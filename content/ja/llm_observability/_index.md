---
aliases:
- /ja/tracing/llm_observability/
further_reading:
- link: https://www.datadoghq.com/blog/anthropic-integration-datadog-llm-observability/
  tag: ブログ
  text: Datadog LLM Observability で Anthropic アプリケーションを監視する
- link: https://www.datadoghq.com/blog/monitor-llm-prompt-injection-attacks/
  tag: ブログ
  text: 機密データを保護するための LLM プロンプトインジェクション攻撃監視のベストプラクティス
- link: https://www.datadoghq.com/blog/vllm-integration/
  tag: ブログ
  text: Datadog の vLLM インテグレーションで LLM アプリケーションのパフォーマンスを最適化
title: LLM Observability
---

## 概要

LLM Observability を使用すると、チャットボットなどの LLM 対応アプリケーションを監視、トラブルシューティング、および評価できます。これにより、問題の根本原因を特定し、運用パフォーマンスを監視し、LLM アプリケーションの品質・プライバシー・安全性を評価することが可能です。

アプリケーションが処理した各リクエストは、Datadog の [**LLM Observability** ページ][1]にトレースとして表示されます。

{{< img src="llm_observability/traces.png" alt="LLM Observability ページ上で表示されるプロンプトとレスポンスのペアを示すトレース一覧" style="width:100%;" >}}

トレースは以下のような要素を表せます。

- トークン、エラー情報、レイテンシーを含む個々の LLM 推論
- LLM コールやツールコール、前処理ステップなどを含む、あらかじめ定義された LLM ワークフロー
- LLM エージェントによって実行される動的な LLM ワークフロー

各トレースには、エージェントが下した選択や特定のワークフロー内の各ステップを表すスパンが含まれます。また、入力および出力、レイテンシー、プライバシー上の懸念点、エラーなどの情報が含まれる場合もあります。詳細は[用語と概念][2]を参照してください。

## エンドツーエンドトレーシングによるトラブルシューティング

LLM アプリケーション内のあらゆるチェーンやコールを可視化し、問題のあるリクエストを特定してエラーの根本原因を突き止めることができます。

{{< img src="llm_observability/errors.png" alt="トレースのサイドパネル内の Errors タブで表示されるエラー" style="width:100%;" >}}

## 運用メトリクスの監視とコスト最適化

[すぐに使えるダッシュボード][7]を用いて、すべての LLM アプリケーションにおけるコスト、レイテンシー、パフォーマンス、使用状況の傾向を監視できます。

{{< img src="llm_observability/dashboard_1.png" alt="Datadog のすぐに使える LLM Observability Operational Insights ダッシュボード" style="width:100%;" >}}

## LLM アプリケーションの品質と有効性の評価

トピック別のクラスタリングや感情分析、回答不能チェックなどの手法を用いて、問題のあるクラスターを特定し、時間経過によるレスポンス品質を追跡できます。

{{< img src="llm_observability/cluster_map/box.png" alt="ボックスパッキングレイアウトで表示されるトレースのクラスター。カラーで表された円と、トピック、トレース数、失敗率などを表示するパネルが含まれる。" style="width:100%;" >}}

## 機密データの保護と悪意あるユーザーの特定

AI アプリケーション内で機密データを自動的にスキャンおよびマスキングし、プロンプトインジェクションなどの潜在的脅威を特定できます。

{{< img src="llm_observability/prompt_injection.png" alt="LLM Observability によって検出されたプロンプトインジェクション試行の例" style="width:100%;" >}}

LLM Observability とのインテグレーション活用

[LLM Observability SDK for Python][3] は、OpenAI、LangChain、AWS Bedrock、Anthropic などのフレームワークと統合できます。コード変更不要で、LLM コールを自動的にトレースし、レイテンシー、エラー、トークン使用状況などのメトリクスを取得できます。

<div class="alert alert-info">Datadog では、AI および ML に関するさまざまな機能を提供しています。<a href="/integrations/#cat-aiml">Integrations ページおよび Datadog Marketplace 上の AI/ML インテグレーション</a>は、Datadog 全体で利用できる機能です。<br><br> 例えば、APM は OpenAI の利用状況を監視するためのネイティブインテグレーションを提供し、Infrastructure Monitoring は NVIDIA DCGM Exporter と統合して計算集約的な AI ワークロードを監視します。これらは LLM Observability が提供する機能とは異なります。</div>

詳細については、[自動インスツルメンテーションのドキュメント][8]を参照してください。

## 準備はいいですか？

[セットアップドキュメント][5]を参照して LLM アプリケーションへのインスツルメンテーション手順を確認するか、[LLM アプリケーションのトレースガイド][6]に従って [LLM Observability SDK for Python][3] を使用してトレースを生成してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /ja/llm_observability/terms
[3]: /ja/llm_observability/setup/sdk
[4]: /ja/llm_observability/setup/api
[5]: /ja/llm_observability/setup
[6]: /ja/llm_observability/quickstart
[7]: https://app.datadoghq.com/dash/integration/llm_operational_insights
[8]: /ja/llm_observability/setup/auto_instrumentation