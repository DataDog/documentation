---
aliases:
- /ja/llm_observability/evaluations/evaluation_compatibility/
- /ja/llm_observability/configure/evaluations/compatibility/
description: 評価器の互換性要件について学習します。
title: 評価器の互換性
---
## 評価器の互換性 {#evaluator-compatibility}

サポートされているサードパーティ LLM プロバイダーは、OpenAI、Azure OpenAI、Anthropic、Amazon Bedrock、Vertex AI、およびカスタムプロバイダーです。

### マネージド評価器 {#managed-evaluators}

マネージド評価器は、以下の構成でサポートされています。

| 評価器                       | dd-trace バージョン  |  LLM プロバイダー                 | 適用可能なスパン |
| --------------------------------| ----------------- | ------------------------------| ----------------|
| [言語の不一致][10]         | 完全にサポート   | セルフホスト                   | 全種類のスパン  |

### カスタム LLM-as-a-judge 評価器 {#custom-llm-as-a-judge-evaluators}

カスタム LLM-as-a-judge 評価器は、以下の構成でサポートされています。

| 評価器        | dd-trace バージョン | LLM プロバイダー                  | 適用可能なスパン |
| ---------------- | ---------------- | ----------------------------- | --------------- |
| [Boolean][11]    | 完全にサポート  | すべてのサードパーティ LLM プロバイダー | 全種類のスパン  |
| [スコア][11]      | 完全にサポート  | すべてのサードパーティ LLM プロバイダー | 全種類のスパン  |
| [カテゴリ][11]| 完全にサポート  | すべてのサードパーティ LLM プロバイダー | 全種類のスパン  |
| [JSON][11]       | 完全にサポート  | すべてのサードパーティ LLM プロバイダー | 全種類のスパン  |

#### LLM-as-a-judge 評価器テンプレート {#llm-as-a-judge-evaluator-templates}

カスタム LLM-as-a-judge 評価器の既存のテンプレートは、以下の構成でサポートされています。

| 評価器               | dd-trace バージョン | LLM プロバイダー                  | 適用可能なスパン |
| ----------------------- | ---------------- | ----------------------------- | --------------- |
| [回答不能][5]  | 完全にサポート  | すべてのサードパーティ LLM プロバイダー | 全種類のスパン  |
| [ハルシネーション][4]      | 完全にサポート  | すべてのサードパーティ LLM プロバイダー | LLM のみ        |
| [センチメント][6]          | 完全にサポート  | すべてのサードパーティ LLM プロバイダー | 全種類のスパン  |
| [有害性][7]           | 完全にサポート  | すべてのサードパーティ LLM プロバイダー | 全種類のスパン  |
| [プロンプトインジェクション][8]   | 完全にサポート  | すべてのサードパーティ LLM プロバイダー | 全種類のスパン  |
| [トピックの関連性][9]    | 完全にサポート  | すべてのサードパーティ LLM プロバイダー | 全種類のスパン  |
| [ツールの選択][1]             | 完全にサポート | すべてのサードパーティ LLM プロバイダー | LLM のみ |
| [ツール引数の正確性][2]  | 完全にサポート | すべてのサードパーティ LLM プロバイダー | LLM のみ |
| [目標の達成度][3]          | 完全にサポート | すべてのサードパーティ LLM プロバイダー | LLM のみ |


[1]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#tool-selection
[2]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#tool-argument-correctness
[3]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#goal-completeness
[4]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#hallucination
[5]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#failure-to-answer
[6]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#sentiment
[7]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#toxicity
[8]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#prompt-injection
[9]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#topic-relevancy
[10]: /ja/llm_observability/investigate/evaluations/language_mismatch
[11]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations#define-the-evaluation-output