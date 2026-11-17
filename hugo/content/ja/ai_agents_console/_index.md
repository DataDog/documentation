---
description: Datadog Agent Console で、coding agent、knowledge agent、Bits AI agent を含む組織全体の
  AI agent の使用状況、コスト、生産性を監視し、分析します。
further_reading:
- link: /ai_agents_console/setup/
  tag: ドキュメント
  text: Agent Console のセットアップ
- link: /integrations/anthropic-usage-and-costs/
  tag: ドキュメント
  text: Anthropic の使用状況とコストインテグレーション
- link: /integrations/openai-codex/
  tag: ドキュメント
  text: OpenAI Codex インテグレーション
- link: /integrations/openai/
  tag: ドキュメント
  text: OpenAI インテグレーション
- link: /integrations/cursor/
  tag: ドキュメント
  text: Cursor インテグレーション
- link: https://github.com/datadog-labs/trajectory
  tag: ソースコード
  text: Trajectory
- link: https://www.datadoghq.com/blog/claude-code-monitoring
  tag: ブログ
  text: Datadog Agent の Agent Console で組織内の Claude Code の適応をモニターする
- link: https://www.datadoghq.com/blog/datadog-agent-console/
  tag: ブログ
  text: Datadog Agent Console で agent の導入状況を監視する
title: Agent Console
---
{{< callout url="#" btn_hidden="true" header="プレビュー">}}
Agent Console はプレビュー中で、すべての Datadog のお客様にご利用いただけます。
{{< /callout >}}

[Agent Console][1] では、組織全体の AI ツールの一元的な監視を提供します。coding agent、knowledge agent、desktop agent、および Datadog 独自の [Bits AI agent](#bits-ai-agents) から、使用状況、コスト、アクティビティデータを収集します。これを使用して、AI 関連の支出先、誰がどのツールを使用しているか、AI 支援による作業が成果物の提供にどのような影響を与えているかを把握できます。

## サポートされている AI ツール {#supported-ai-tools}

| ツール | タイプ | データソース |
|------|------|-------------|
| Claude Code | coding agent | [Anthropic Usage and Costs][2] インテグレーション、または Claude Team プラン用の OpenTelemetry |
| Cursor | coding agent | [Cursor][3] インテグレーション |
| GitHub Copilot | coding agent | [GitHub Copilot][4] インテグレーション |
| Codex | coding agent | [OpenAI Codex][5] インテグレーション |
| Claude Chat、Claude Cowork、Claude Design | knowledge agent | [Anthropic Usage and Costs][2] インテグレーション |
| ChatGPT Work | knowledge agent | [OpenAI][13] インテグレーション |
| Microsoft Copilot 365 (プレビュー) | knowledge agent | Microsoft Copilot インテグレーション。アクセスをリクエストするには、Datadog アカウントチームにお問い合わせください。|
| その他の coding agent および desktop agent | coding agent | [Trajectory][6] |

[Trajectory][6] は、Claude Desktop、Cline、Windsurf、Zed、Goose を含む 30 以上の coding agent や desktop agent からセッションをキャプチャするオープンソースツールです。完全なリストについては、[サポートされているクライアント][7]をご覧ください。

これらのツールを接続するには、[Agent Console の設定][8]をご覧ください。

## 概要 {#overview}

{{< ui >}}Overview{{< /ui >}} タブには、組織の AI 支出、導入状況、生産性が一元的に表示されます。

{{< img src="/ai_agents_console/agent_console_overview.png" alt="追跡された AI コスト、合計ユーザー数、観測された PR あたりのコスト、および製品領域と主なコスト要因別の追跡コストの内訳を表示する Agent Console の Overview タブ" style="width:100%;" >}}

上部のサマリータイルには、追跡された AI コスト、合計ユーザー数、観測されたプルリクエストあたりのコストが表示され、それぞれ前の期間と比較されます。

{{< ui >}}Tracked AI cost{{< /ui >}} チャートには、coding agent やその他の agent といった製品領域に支出がどのように分布しているか、またどのツールが最もコストに寄与しているかが表示されます。{{< ui >}}Trend{{< /ui >}}に切り替えるとコストの推移を確認でき、製品領域を選択すると詳細が表示されます。

### 生産性 {#productivity}

{{< ui >}}Productivity{{< /ui >}} セクションには、マージされたプルリクエスト、マージまでの時間、観測されたプルリクエストあたりのコスト、解決された Jira 課題が、AI コストに対してプロットされて表示されます。これらのメトリクスは、GitHub や Jira などの接続された[生産性ツール][9]から取得されます。

{{< img src="/ai_agents_console/agent_console_productivity_overview.png" alt="マージされた PR、マージまでの時間、観測された PR あたりのコスト、解決された Jira 課題をそれぞれコストに対してプロットした生産性セクション" style="width:100%;" >}}

### Integrations {#integrations}

{{< ui >}}Integrations{{< /ui >}} セクションには、接続された各データソースのカードが表示され、ステータス、合計ユーザー数、推定コスト、トークン使用量が示されます。{{< ui >}}Group by Provider{{< /ui >}} を有効にすると、Anthropic の下にある Claude Code、Chat、Design、Cowork など、同じプロバイダーの製品をまとめることができます。

{{< img src="/ai_agents_console/agent_console_integrations_overview.png" alt="Anthropic、OpenAI、Cursor、Claude Code (OTel)、GitHub Copilot、Microsoft Copilot、GitHub、Jira のカードが表示されたインテグレーションセクション" style="width:100%;" >}}

カードの {{< ui >}}View Dashboard{{< /ui >}} をクリックすると、そのインテグレーション専用のダッシュボードが開きます。各ダッシュボードは、チーム、ユーザー、モデルでフィルタリングできます。

たとえば、Anthropic ダッシュボードでは、推定コストとトークンが Claude 製品およびモデル別に内訳表示されます。

{{< img src="/ai_agents_console/agent_console_integrations_anthropic.png" alt="エンタープライズの推定コストとトークン、Claude 製品 (Claude Code、Chat、Design、Cowork) 別のコスト、コストの推移、モデル別のトークンを表示する Anthropic ダッシュボード" style="width:100%;" >}}

Codex ダッシュボードには、推定コスト、アクティブユーザー数、セッション数、クレジット、トークンが表示され、使用状況や導入傾向、トップユーザーも確認できます。

{{< img src="/ai_agents_console/agent_console_codex_integration.png" alt="推定コスト、アクティブユーザー数、セッション数、クレジット、合計トークン数、セッション数とターンの推移、タイプ別のトークン、ターン数とクレジット別のトップユーザーを表示する Codex ダッシュボード" style="width:100%;" >}}

## My Usage {#my-usage}

{{< ui >}}My Usage{{< /ui >}} タブには、ご自身の AI 使用状況が表示されます。これには、プロバイダー別に積み上げられた日々の支出と、AI agent を使用したタスクの内訳が含まれます。プロバイダーとモデルでフィルタリングします。

{{< img src="/ai_agents_console/agent_console_my_usage.png" alt="プロバイダー別に積み上げられた個人の日々の支出チャートとタスク内訳チャートが表示された My Usage タブ" style="width:100%;" >}}

サイドナビゲーションを使用して、{{< ui >}}Overview{{< /ui >}}、{{< ui >}}Tasks{{< /ui >}}、{{< ui >}}Productivity{{< /ui >}}、{{< ui >}}Models{{< /ui >}}、{{< ui >}}Skills{{< /ui >}}、{{< ui >}}Tools{{< /ui >}}、および {{< ui >}}Sessions{{< /ui >}} を切り替えます。Tasks、Skills、Tools、Sessions の各ビューは、[Trajectory][6] のセッションデータを使用します。Models ビューは、接続されたインテグレーションのデータを使用します。

My Usage と Usage は同じビューを共有しています。各ビューの説明については、[Usage](#usage) をご覧ください。

## Usage {#usage}

{{< ui >}}Usage{{< /ui >}} タブには、組織全体で集計された My Usage と同じビューが表示されます。これを使用して、チームが AI agent をどのような用途に使用しているかを把握し、パワーユーザーや外れ値を特定し、チーム間での導入状況を比較できます。

### Tasks {#tasks}

Agent Console は、[Trajectory][6] でキャプチャされた agent セッションを、コード実装、エンジニアリング運用、ナレッジアーティファクトなどのタスクカテゴリと、より具体的なサブカテゴリに分類します。{{< ui >}}Tasks{{< /ui >}} ビューでは、各カテゴリがタスクのシェアとアクティブユーザーあたりの支出に基づいてプロットされ、それぞれのコスト、タスクあたりのコスト、タスク数が一覧表示されます。

{{< img src="/ai_agents_console/agent_console_tasks.png" alt="タスクの割合とアクティブユーザーあたりの支出によるタスクカテゴリのバブルチャート、およびコスト、タスクあたりのコスト、タスク数を示すテーブルが表示された Tasks ビュー" style="width:100%;" >}}

タスクカテゴリを選択すると、そのサブカテゴリ、タスクあたりのコスト、タスク合計コスト、タスク数、平均ターン数が含まれる詳細パネルが開きます。

{{< img src="/ai_agents_console/agent_console_tasks_view.png" alt="サブカテゴリ別のタスク、タスクあたりのコスト、タスク合計コスト、タスク数、平均ターン数を表示する Engineering Operations のタスクカテゴリ詳細パネル" style="width:100%;" >}}

### ユーザーとチームの生産性 {#user-and-team-productivity}

{{< ui >}}Productivity{{< /ui >}} ビューでは、個々のエンジニアやチームが AI ツールをどのように使用しているかを可視化できます。以下の用途で使用します。
- 最も支出が多いユーザーと最も生産的な貢献者を特定する
- 支出が多いのに成果が少ないエンジニアなど、効率性の外れ値を特定する
- ユーザー、エージェント、モデルごとの完全なコスト内訳を確認する
- 任意のユーザーの支出、プルリクエスト履歴、モデルミックスを調べます。

{{< img src="/ai_agents_console/user_analytics_user_detail_panel.png" alt="agent 別の支出、モデルミックス、PR 履歴など、選択したユーザーの内訳を表示するユーザー詳細パネル" style="width:100%;" >}}

### Models、Skills、Tools、および Sessions {#models-skills-tools-and-sessions}

{{< ui >}}Models{{< /ui >}} ビューでは、接続されたインテグレーションのデータに基づいて、組織が使用しているモデルが表示されます。

[Trajectory][6] でキャプチャされた agent については、{{< ui >}}Skills{{< /ui >}}、{{< ui >}}Tools{{< /ui >}}、{{< ui >}}Sessions{{< /ui >}} ビューに agent が使用するスキルとツールが表示され、個々の agent セッションを確認できます。

## Bits AI Agent {#bits-ai-agents}

{{< img src="/ai_agents_console/bits_ai_agents.png" alt="時間の経過に伴うエージェントアクティビティの統合チャートと、最近の調査、セッション、実行を示す Bits Investigation、Bits Code、Bits Agent Builder の各カードがある Bits AI Agent タブ" style="width:100%;" >}}

{{< ui >}}Bits AI Agents{{< /ui >}} タブでは、Datadog の組み込み AI agent の使用状況が、他の AI ツールとともに表示されます。すべての Datadog Agent における調査、セッション、および実行の統合ビューにより、Bits AI のアクティビティを組織全体の他のアクティビティと関連付けることができます。

個々のカードは、[Bits Investigation][10]、[Bits Code][11]、および [Bits Agent Builder][12] を含む各 Bits AI Agent のアクティビティを要約します。カードで {{< ui >}}View Details{{< /ui >}} をクリックすると、そのエージェントを調査できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: /ja/integrations/anthropic-usage-and-costs/
[3]: /ja/integrations/cursor/
[4]: /ja/integrations/github-copilot/
[5]: /ja/integrations/openai-codex/
[6]: https://github.com/datadog-labs/trajectory
[7]: https://github.com/datadog-labs/trajectory/blob/main/docs/SUPPORTED-CLIENTS.md
[8]: /ja/ai_agents_console/setup/
[9]: /ja/ai_agents_console/setup/#connect-productivity-tools
[10]: /ja/bits_ai/bits_investigation/
[11]: /ja/bits_ai/bits_code/
[12]: /ja/actions/agents/
[13]: /ja/integrations/openai/?tab=apikey