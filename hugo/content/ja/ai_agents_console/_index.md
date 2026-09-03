---
description: Datadog Agent Console で、コーディングエージェントと Bits AI エージェントの使用状況、コスト、パフォーマンスを組織全体でモニターおよび分析します。
further_reading:
- link: /ai_agents_console/setup/
  tag: ドキュメント
  text: Agent Console のセットアップ
- link: /integrations/anthropic-usage-and-costs/
  tag: ドキュメント
  text: Anthropic の使用状況とコストインテグレーション
- link: /integrations/cursor/
  tag: ドキュメント
  text: カーソルインテグレーション
- link: https://www.datadoghq.com/blog/claude-code-monitoring
  tag: ブログ
  text: Datadog Agent の Agent Console で組織内の Claude Code の適応をモニターする
title: Agent Console
---
{{< callout url="#" btn_hidden="true" header="プレビュー">}}
Agent Console はプレビュー中で、すべての Datadog のお客様にご利用いただけます。
{{< /callout >}}

[Agent Console][1] は、組織全体の AI エージェントの一元化されたモニタリングを提供します。コーディングエージェントと、Datadog の独自の [Bits AI エージェント](#bits-ai-agents)からログとメトリクスを収集し、リアルタイムで表示して、使用状況、コスト、レイテンシー、生産性への影響、新たな問題パターンを把握できます。

Agent Console は以下のコーディングエージェントをサポートします。

| ツール | 説明 |
|------|-------------|
| [Claude Code][2] | Anthropic のエージェンティックコーディングツール |
| [Cursor][3] | AI 駆動のコードエディタ |
| [GitHub Copilot][4] | GitHub の AI 駆動のコード補完ツール |


## コーディングエージェント {#coding-agents}

{{< ui >}}Coding Agents{{< /ui >}} タブでは、組織全体のコーディングエージェントのアクティビティをトップレベルで表示できます。デフォルトビューでは、すべてのコーディングエージェントを集約し、単一のエージェントにフィルタリングできます。

{{< img src="/ai_agents_console/agent_console_agent_findings.png" alt="Agent Console コーディングエージェントタブに、Claude Code、Cursor、GitHub Copilot のメトリクスとトレンドを含むエージェントの検出結果の概要が表示されます。" style="width:100%;" >}}

### エージェントの検出結果 {#agent-findings}

{{< ui >}}Agent Findings{{< /ui >}} パネルでは、合計支出、合計ユーザー数、セッション数、マージまでの時間、コード行数、セッションあたりの平均ターン数を含む、選択された時間範囲のハイレベルのアクティビティを要約します。積み上げチャートは、エージェント (例: Claude Code とCursor) ごとにアクティビティが分割されるので、時間の経過に伴う適応を比較できます。

### インパクトメトリクス {#impact-metrics}

{{< ui >}}Impact Metrics{{< /ui >}} パネルは、DORA スタイルのメトリクスを使用して、AI 支援開発がソフトウェア配信ライフサイクルに与える影響を測定し、AI 支援作業と非 AI 作業の比較を行います。

- **適応**: AI 支援のコミットとAI 支援の PR を含む、AI によって生成されているコードの量を追跡します。
- **速度**: 変更のリードタイムと PR レビュー時間を含む、変更が本番環境にリーチする速さを測定します。
- **安定性**: 変更失敗率と復旧時間を含む、リリース後の変更の信頼性を追跡します。

### 検出された問題 {#detected-problems}

{{< ui >}}Detected Problems{{< /ui >}} パネルは、チームが直面している一般的な問題パターンを強調し、修正を推奨します。サンキーダイアグラムは、問題パターン (スキップされたチェック、再試行ループ、ファイルの再読み込みなど) が個々のエージェントから特定のリポジトリに流れる様子を示し、各パターンの推定月額コストを示します。

{{< img src="/ai_agents_console/detected_problems_skipped_checks.png" alt="Claude Code、Cursor、GitHub Copilot からのセッションが問題パターンにどのようにマッピングされるかを示し、スキップされたチェックを強調表示する、検出された問題のサンキーダイアグラム" style="width:90%;" >}}

{{< ui >}}Problem Pattern{{< /ui >}} ノードをクリックすると、パターンの定義、組織全体の推定月額コスト、フラグが付けられたセッションのリスト、および推奨される修正を含む詳細ビューが開きます。

### 個々のエージェントダッシュボード {#individual-agent-dashboards}

{{< ui >}}Coding Agents{{< /ui >}} タブに、接続された各コーディングエージェント (Claude Code、GitHub Copilot、Cursor など) のタイルが表示されます。各タイルには、そのエージェントのアクティビティの概要が表示され、合計ユーザー数、合計支出、コード行あたりのコストが含まれます。

{{< img src="/ai_agents_console/coding_agent_dashboard_claude.png" alt="追加された行、セッション、コミット、およびパフォーマンスメトリクスのウィジェットが表示される Claude Code ダッシュボード" style="width:100%;" >}}

エージェントタイルをクリックするか、ページ上部の {{< ui >}}All Coding Agents{{< /ui >}} ドロップダウンから選択して、そのエージェント専用のダッシュボードを開きます。専用ダッシュボードには、合計支出、セッション、コミット、追加された行の概要タイルとともに、リクエスト量、レイテンシー、モデル使用パターン、追加された行と削除された行の比較、ツールの受け入れと拒否の比較に関するパフォーマンスチャートが含まれます。

## エージェントの使用状況を分析する {#analyze-agent-usage}

{{< ui >}}Analytics{{< /ui >}} タブは、個人とチームの詳細な情報を提供します。パワーユーザー、外れ値、チームレベルの適応パターンを特定する上で役立ちます。

{{< img src="/ai_agents_console/agent_console_analytics.png" alt="リーダーボードやチャートを含む、コーディングエージェントの使用に関する詳細なユーザーおよびチーム分析が表示される Agent Console 分析タブ" style="width:100%;" >}}

### チーム比較 {#team-comparison}

{{< ui >}}Comparison{{< /ui >}} パネルは、出力に対して AI ツールに過剰投資または過少投資しているチームを特定する上で役立ちます。チーム間および組織のベースラインに対して、支出、1 行あたりのコスト、モデル利用率を比較して、効率の向上が可能な場所や予想外に高いコストが発生している場所を見つけます。

### ユーザー分析 {#user-analytics}

{{< img src="/ai_agents_console/user_analytics_user_detail_panel.png" alt="エージェントごとの支出、モデルミックス、PR 履歴を含む、選択されたユーザーの詳細な内訳が表示される Agent Console ユーザー分析パネル" style="width:100%;" >}}

{{< ui >}}User Analytics{{< /ui >}} パネルは、組織全体で個々のエンジニアが AI ツールをどのように使用しているかを可視化します。パネルを使用して以下のことを行います。
- 最も支出が多いユーザーと最も生産的な貢献者を特定する
- 効率性の外れ値を特定する — 支出が多いのに成果が少ない、またはその逆のエンジニア
- ユーザー、エージェント、モデルごとの完全なコスト内訳を確認する
- 任意の個人の支出、PR 履歴、およびモデルミックスを調査する

## Bits AI Agent {#bits-ai-agents}

{{< img src="/ai_agents_console/bits_ai_agents.png" alt="時間の経過に伴うエージェントアクティビティの統合チャートと、最近の調査、セッション、実行を示す Bits Investigation、Bits Code、Bits Agent Builder の各カードがある Bits AI Agent タブ" style="width:100%;" >}}

{{< ui >}}Bits AI Agents{{< /ui >}} タブでは、Datadog のビルトイン AI Agent の使用状況がコーディングエージェントとともに表示されます。すべての Datadog Agent における調査、セッション、および実行の統合ビューにより、Bits AI のアクティビティを組織全体の他のアクティビティと関連付けることができます。

個々のカードは、[Bits Investigation][5]、[Bits Code][6]、および [Bits Agent Builder][7] を含む各 Bits AI Agent のアクティビティを要約します。カードで {{< ui >}}View Details{{< /ui >}} をクリックすると、そのエージェントを調査できます。

## セットアップ {#set-up}

Agent Console へのデータ送信を開始するには、[Agent Console のセットアップ][8]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[4]: /ja/integrations/github-copilot/
[5]: /ja/bits_ai/bits_ai_sre/
[6]: /ja/bits_ai/bits_ai_dev_agent/
[7]: /ja/actions/agents/
[8]: /ja/ai_agents_console/setup/