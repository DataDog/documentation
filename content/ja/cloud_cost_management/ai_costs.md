---
description: 複数のプロバイダーに渡る AI 費用を統一的に可視化し、コストデータを正規化し、使用状況をユーザーやチームに帰属させます。
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/saas_costs
  tag: ドキュメント
  text: SaaS および AI コスト
- link: /cloud_cost_management/allocation/custom_allocation_rules
  tag: ドキュメント
  text: Custom Allocation Rules
- link: /cloud_cost_management/allocation/tag_pipelines
  tag: ドキュメント
  text: タグパイプライン
- link: /cloud_cost_management/reporting
  tag: ドキュメント
  text: レポート
- link: /cloud_cost_management/cost_changes/monitors
  tag: ドキュメント
  text: クラウドコストモニター
- link: /cloud_cost_management/planning/budgets
  tag: ドキュメント
  text: 予算
- link: /cloud_cost_management/planning/forecasting
  tag: ドキュメント
  text: 予測
title: AI コスト
---
## 概要 {#overview}

Cloud Cost Management における AI コストは、FinOps およびエンジニアリングチームに、Amazon Bedrock、Anthropic、Google Gemini、OpenAI、Vertex AI、GitHub Copilot、Cursor など複数のプロバイダーに渡る AI 支出を分析するための統一された方法を提供します。既存のクラウドインフラストラクチャーコストとともに総 AI 費用を表示し、正規化されたタグで分析し、コストの異常を追跡し、特定のユーザーや API キーに使用状況を帰属させます。

## 前提条件 {#prerequisites}

AI コストを使用するには、[Cloud Cost Management][1] のために、以下のサポートされているプロバイダーのいずれかをセットアップする必要があります。

| AI プロバイダー | セットアップ方法 |
|---|---|
| Amazon Bedrock | [AWS インテグレーション][2] |
| Anthropic | [SaaS インテグレーション][3] |
| Google Gemini | [Google Cloud インテグレーション][4] |
| OpenAI     | [SaaS インテグレーション][5] |
| Vertex AI | [Google Cloud インテグレーション][4] |
| GitHub Copilot | [GitHub Copilot][15] |
| Cursor | [Cursor][16] |

## AI コストサマリー {#ai-cost-summary}

AI プロバイダーを接続した後、[**Cloud Cost** > **要約** > **AI**][6]に移動して AI コストサマリーページを表示します。

{{< img src="cloud_cost/ai_costs/ccm-ai-costs-overview.png" alt="1 か月間の支出トレンド、上位の支出ドライバーのリスト、および異常グラフを表示する AI コストサマリーダッシュボードです。" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

AI コストサマリーページには以下が含まれます。

- **総 AI コスト**: 選択した期間における集約された AI コストとコストの変化。
- **日次 AI コスト**: 選択した期間における選択されたプロバイダーの日次コストの傾向。[**フィルター**] ドロップダウンを使用して、グラフに表示されるプロバイダーを定義します。
- **上位のコストドライバー**: 最も多くの支出を生み出しているモデル、プロジェクト、サービス、ユーザー。
- **アクティブな AI コストの異常**: 接続されているすべてのプロバイダーにおいて、積極的に検出されたコストの[異常][7]。異常を選択すると、サイドパネルが開き、詳細およびさらなるアクションのためのオプションが表示されます。
- **AI コストダッシュボード**: サポートされている各プロバイダー向けの、すぐに使えるダッシュボードテンプレート。コストデータと使用状況シグナル (トークン消費、モデル分布、ユーザー分析など) が組み合わされています。

## 正規化された AI タグ{#normalized-ai-tags}

サポートされているすべてのプロバイダーからの AI コストデータは、一貫したタグのセットに正規化されます。これらのタグを使用して、ダッシュボード、[モニター][8]、[予算][9]、[予測][10]、およびその他の Datadog ツール全体で AI 費用をフィルタリング、グループ化、比較、計画します。[Cloud Cost Explorer][11] を使用して、プロバイダーごとのロジックを記述することなく、費用を照会および比較できます。

以下のタグが、サポートされているすべての AI プロバイダーで利用可能です。

| タグ名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | タグの説明 |
|---|---|
| `providername` | AI プロバイダー。|
| `model` | AI モデル識別子 (例: `claude-opus-4-6`、`gpt-4.1`)。|
| `model_name` | 人間が読めるモデル名 (例: `Claude Opus 4.6`)。|
| `token_direction` | サービスまたはアプリケーション内でトークンが消費されている (入力) か、生成されている (出力) か。|
| `token_category` | 消費されるトークンの特定のカテゴリ。例えば、入力トークン、出力トークン、キャッシングおよび検索操作に関連するトークン (例: `cached input`、`cache write`、`standard input`、`output`)。|
| `project` | AI コストが属するプロジェクト、ワークスペース、または環境。|

## AI 費用をソースに帰属させる {#attribute-ai-spend-to-sources}

[すぐに使える (OOTB) 配分ルール][12]は、Datadog の監視可能性データを使用して、AI コストを、それを生成したユーザー、API キー、およびその他のソースに帰属させます。OOTB 配分ルールは設定が必要でなく、Anthropic および OpenAI で利用可能です。

次のタグは OOTB 配分ルールを通じて利用可能です。

{{< tabs >}}
{{% tab "Anthropic" %}}

- `api_key_id`
- `api_key_name`
- `context_window`
- `model`
- `model_id`
- `org_id`
- `org_name`
- `service_tier`
- `user_email`
- `user_id`
- `user_name`
- `workspace_id`
- `workspace_name`

{{% /tab %}}
{{% tab "OpenAI" %}}

- `account_id`
- `account_name`
- `api_key_id`
- `batch`
- `endpoint`
- `model`
- `org_id`
- `project_id`
- `project_name`
- `user_email`
- `user_id`

{{% /tab %}}
{{< /tabs >}}

[タグパイプライン][13]を設定して、OOTB タグ (`user_email` など) をチーム、サービス、またはビジネスユニットにマッピングして、集計レポートを作成します。

{{< img src="cloud_cost/ai_costs/ccm-tag-pipeline-ai-costs.png" alt="既存の参照テーブルを通じてチーム値にマッピングされた user_email 値と、追加のタグマッピングオプションを示す、[Tag Pipelines Rule Setup] (タグパイプラインルールのセットアップ) ページ" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

マッピング後、帰属された費用はプロバイダー固有のダッシュボードおよび[コストレポート][14]に表示されます。

{{< img src="cloud_cost/ai_costs/ccm-anthropic-ai-cost-reporting.png" alt="チームおよびモデル名によって帰属された日次プロバイダー費用を示す積み上げ棒グラフと、支出帰属の要約リストが表示されている、プロバイダー固有のダッシュボード。" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/
[2]: /ja/cloud_cost_management/setup/aws
[3]: /ja/cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts
[4]: /ja/cloud_cost_management/setup/google_cloud
[5]: /ja/cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts
[6]: https://app.datadoghq.com/cost/summarize/ai-costs
[7]: /ja/cloud_cost_management/cost_changes/anomalies/
[8]: /ja/cloud_cost_management/cost_changes/monitors
[9]: /ja/cloud_cost_management/planning/budgets
[10]: /ja/cloud_cost_management/planning/forecasting
[11]: https://app.datadoghq.com/cost/explorer
[12]: /ja/cloud_cost_management/allocation/custom_allocation_rules/?tab=even
[13]: /ja/cloud_cost_management/allocation/tag_pipelines
[14]: /ja/cloud_cost_management/reporting
[15]: /ja/cloud_cost_management/setup/saas_costs/?tab=github#configure-your-saas-accounts
[16]: /ja/cloud_cost_management/setup/saas_costs/?tab=cursor#configure-your-saas-accounts