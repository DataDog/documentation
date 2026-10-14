---
description: Agent Observability Insights は、既存のトレースからコストや信頼性に関する繰り返し発生する問題を特定し、修正案を提示します。
further_reading:
- link: /llm_observability/investigate/cost/
  tag: ドキュメント
  text: LLM コストを監視する
- link: /llm_observability/investigate/evaluations/
  tag: ドキュメント
  text: LLM アプリケーションを評価する
- link: /llm_observability/build_with_ai/mcp_server/
  tag: ドキュメント
  text: AI エージェントを Agent Observability に接続する
title: Insights
---
## 概要 {#overview}

Agent Observability Insights は、Agent Observability がアプリケーションから受信したトレースを自動的に分析し、繰り返されるコストや信頼性の問題を検出します。Insights を使用すると、トレースを 1 つずつ確認することなく、修正の優先順位を判断することができます。

各インサイトには以下が含まれます。

- 繰り返される動作を説明する根本原因
- 影響を受けた呼び出しやセッションに基づく影響評価
- その検出結果を裏付けるトレースおよびスパンの証拠
- 推奨される修正方法とそれを検証する手段

<div class="alert alert-info">Insights に特別な設定は不要です。Datadog は、ご利用のアプリケーションがすでに Agent Observability に送信しているトレースを分析します。</div>

## Insights の仕組み {#how-insights-works}

Datadog は、複数の呼び出しやセッションにわたる最近のトレースを分析し、繰り返し発生するコストや信頼性に関する問題を特定します。その際、成功したリトライや、タスクの性質上長時間を要するレスポンスなど、想定される動作も考慮に入れます。

Datadog は、同じ根本原因を持つ検出結果を 1 つのインサイトにグループ化します。その後の分析でインサイトは更新され、問題が発生しなくなると自動的に解決されます。問題が再発した場合、Datadog は再びその問題を提示します。

### インサイトの種類{#insight-types}

| Category | インサイトの種類| 特定される内容 |
|---|---|---|
| Cost | 非効率なプロンプトキャッシュ | プロバイダーのキャッシュを利用できず、入力トークンコストを増加させる、再利用可能なプロンプトコンテンツ。|
| Cost | 大規模なツール実行結果 | 後続のモデルリクエストに不要なコンテンツを追加し、トークン使用量やコンテキスト負荷を増大させるツール実行結果。|
| Cost | 冗長なモデル出力 | タスクが必要とする以上の出力トークンを使用するモデルの応答や推論。|
| Reliability | ツール呼び出しの再試行ループ | ほぼ同一の引数を使用し、進捗が見られない同じツールへの繰り返しの呼び出し。|
| Reliability | プロンプトルールの違反 | プロンプト、スキル、またはツールの説明にある明示的なルールに違反する Agen の動作。|

## 影響と証拠を理解する {#understand-impact-and-evidence}

Cost Insight では、その種類に応じて、回収可能な推定支出額や、実用的な結果をもたらさなかったモデル処理にかかった実際のコストが表示されます。Reliability Insight では、問題の影響を受けた、確定済みの呼び出しやセッションが表示されます。

リンクされたトレースとスパンを開き、証拠と示された根本原因を比較します。調査の痕跡には、その検出結果を導き出した手順と裏付けとなる証拠が示されています。

## インサイトを確認して対応する {#review-and-act-on-insights}

1. Datadog で、[**AI Observability > Agent Observability > Insights**][1] に移動します。
2. 概要とフィルターを使用して、アプリケーション、タイプ、重大度、ステータス、または影響度別にインサイトの優先順位を付けます。
3. インサイトを開いて、検出結果を確認します。
4. 推奨される修正を適用し、検証します。**Fix with Bits** または MCP 互換のコーディングエージェントを使用できます。Work Management の読み取りおよび書き込みアクセス権があれば、Jira チケットや Linear Issue を作成またはリンクすることも可能です。
5. ステータスを [**For Review**]、[**In Progress**]、[**Completed**]、または [**Ignored**] に設定して、決定内容を記録します。その後の分析で問題が検出されなくなった場合、Datadog はステータスを [**Automatically Resolved**] に設定します。

インサイトは、アプリケーションの概要ページに表示されます。Cost Insights は、関連する支出の横にある [**Cost**] ページにも表示されます。

## コーディングエージェントでインサイトを使用する{#use-insights-with-a-coding-agent}

[Datadog MCP Server][2] を MCP 互換のコーディングエージェントに接続します。エージェントは、インサイトの根本原因、証拠、推奨される修正、および検証ガイダンスを取得し、変更の実装とテストを行うことができます。

### インサイトのレビューと修正を自動化する{#automate-insight-reviews-and-fixes}

コーディングエージェントで、インサイトの確認と修正を行う定期的なワークフローを設定します。例:

```text
Use Datadog MCP to list Agent Observability insights with status `for_review` for `<ML_APP>`. Prioritize the returned Insights by severity. For each Insight, review the evidence, implement and validate the recommended fix, and update the insight status based on the result.
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/insights
[2]: /ja/llm_observability/build_with_ai/mcp_server/