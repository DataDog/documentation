---
description: Datadog Agent Console で、組織全体のコーディング エージェントおよび Bits AI エージェントの使用状況、コスト、パフォーマンスを監視し、分析します。
further_reading:
- link: /ai_agents_console/setup/
  tag: ドキュメント
  text: Agent Console のセットアップ
- link: /integrations/anthropic-usage-and-costs/
  tag: ドキュメント
  text: Anthropic の使用状況とコストの統合
- link: /integrations/cursor/
  tag: ドキュメント
  text: Cursor インテグレーション
- link: https://www.datadoghq.com/blog/claude-code-monitoring
  tag: ブログ
  text: Datadog の Agent Console で組織内での Claude Code 導入状況を監視する
- link: https://www.datadoghq.com/blog/datadog-agent-console/
  tag: ブログ
  text: Datadog Agent Console でエージェントの導入状況を監視する
title: Agent Console
---
{{< callout url="#" btn_hidden="true" header="プレビュー">}}
Agent Console は現在プレビュー版としてすべての Datadog のお客様にご利用いただけます。
{{< /callout >}}

[Agent Console][1] では、組織全体の AI エージェントを一元的に監視できます。このコンソールはコーディングエージェントおよび Datadog 独自の [Bits AI エージェント](#bits-ai-agents)からログとメトリクスを収集してリアルタイムで表示し、使用状況、コスト、レイテンシ、生産性への影響、および新たな問題のパターンを可視化します。

Agent Console は、次のコーディングエージェントをサポートしています。

| ツール | 説明 |
|------|-------------|
| [Claude Code][2] | Anthropic のエージェント型コーディングツール |
| [Cursor][3] | AI を活用したコードエディター |
| [GitHub Copilot][4] | GitHub の AI を活用したコード補完ツール |


## コーディングエージェント {#coding-agents}

{{< ui >}}Coding Agents{{< /ui >}} タブでは、組織全体のコーディングエージェントのアクティビティを包括的に把握できます。デフォルトではビューにすべてのコーディングエージェントが集計されますが、単一のエージェントに絞り込んで表示することも可能です。

{{< img src="/ai_agents_console/agent_console_agent_findings.png" alt="Claude Code、Cursor、GitHub Copilot のメトリクスと傾向に基づくエージェントの調査結果の概要を表示する、Agent Console の [Coding Agents] タブ" style="width:100%;" >}}

### エージェントの調査結果 {#agent-findings}

{{< ui >}}Agent Findings{{< /ui >}}パネルには、選択した期間のアクティビティが要約されます。表示される情報には、合計支出、合計ユーザー数、セッション数、マージまでの時間、コード行数、セッションあたりの平均ターン数が含まれます。積み上げグラフでは、エージェント (例: Claude Code と Cursor) ごとのアクティビティが分類されるため、時間の経過に伴う導入状況を比較できます。

### インパクトメトリクス {#impact-metrics}

{{< ui >}}Impact Metrics{{< /ui >}} パネルでは、DORA スタイルのメトリクスを使用して、AI で支援された開発がソフトウェアデリバリーライフサイクルに与える影響を測定し、AI 支援による作業とそうでない作業を並べて比較できます。

- **導入**: AI 支援によるコミットや AI 支援による PR など、AI によって生成されているコードの量を追跡します。
- **ベロシティ**: 変更のリードタイムや PR レビュー時間など、変更が本番環境に適用されるまでの速さを測定します。
- **安定性**: 変更失敗率や復旧時間など、リリースされた後の変更の信頼性を追跡します。

### 検出された問題{#detected-problems}

{{< ui >}}Detected Problems{{< /ui >}} パネルでは、チームが直面している一般的な問題パターンが強調表示され、修正案が提示されます。サンキーダイアグラムは、問題パターン (チェックのスキップ、再試行ループ、ファイルの再読み込みなど) が個々のエージェントから特定のリポジトリにどのようにつながっているかを示し、パターンごとの推定月間コストを表示します。

{{< img src="/ai_agents_console/detected_problems_skipped_checks.png" alt="Claude Code、Cursor、GitHub Copilot からのセッションがどのように問題パターンにマッピングされるかを示す、検出された問題のサンキーダイアグラム。チェックのスキップが強調表示されています。" style="width:90%;" >}}

{{< ui >}}Problem Pattern{{< /ui >}} ノードをクリックすると詳細ビューが表示され、パターンの定義、組織全体の推定月間コスト、フラグが立てられたセッションのリスト、推奨される修正案を確認できます。

### 個別エージェントのダッシュボード {#individual-agent-dashboards}

{{< ui >}}Coding Agents{{< /ui >}} タブには、接続されている各コーディングエージェント (Claude Code、GitHub Copilot、Cursor など) のタイルが表示されます。各タイルには、合計ユーザー数、合計支出、コード 1 行あたりのコストなど、そのエージェントのアクティビティの概要が表示されます。

{{< img src="/ai_agents_console/coding_agent_dashboard_claude.png" alt="Claude Code ダッシュボードには、追加された行数、セッション数、コミット数、パフォーマンスメトリクスを示すウィジェットが表示されます。" style="width:100%;" >}}

エージェントのタイルをクリックするか、ページ上部の {{< ui >}}All Coding Agents{{< /ui >}} ドロップダウンからエージェントを選択して、そのエージェント専用のダッシュボードを開きます。専用ダッシュボードには、合計支出、セッション数、コミット数、追加行数のサマリータイルに加え、リクエストのボリューム、レイテンシ、モデル使用パターン、追加行数対削除行数、ツール承認数対拒否数を網羅したパフォーマンスチャートが組み込まれています。

## エージェント使用状況の分析{#analyze-agent-usage}

{{< ui >}}Analytics{{< /ui >}} タブには、個人やチームに関する詳細な情報が提示されるため、パワーユーザー、外れ値、チームレベルの導入パターンを特定するのに役立ちます。

{{< img src="/ai_agents_console/agent_console_analytics.png" alt="Agent Console の [Analytics] (分析) タブ。リーダーボードやチャートなどに、コーディングエージェント使用に関する詳細なユーザーおよびチームの分析結果が表示されます。" style="width:100%;" >}}

### チーム比較 {#team-comparison}

{{< ui >}}Comparison{{< /ui >}} パネルは、成果に対して AI ツールへの投資が過剰であるか、または過少であるチームを特定するのに役立ちます。チーム間や組織の基準値と照らし合わせて、支出、1 行あたりのコスト、モデル使用量を比較し、効率化の余地がある部分や、コストが予期せず高騰している部分を見つけます。

### ユーザー分析 {#user-analytics}

{{< img src="/ai_agents_console/user_analytics_user_detail_panel.png" alt="選択したユーザーに関する詳細な内訳 (エージェント別の支出、モデル構成、PR 履歴など) を表示する、Agent Console の [User Analytics] パネル" style="width:100%;" >}}

{{< ui >}}User Analytics{{< /ui >}} パネルでは、組織全体で各エンジニアがどのように AI ツールを利用しているかを確認できます。このパネルは次の目的で使用できます。
- 最も支出が多いユーザーや最も生産性の高い貢献者を特定する
- 効率性の外れ値 (支出は多いが成果が低い、またはその逆のエンジニア) を見つける
- ユーザー、エージェント、モデル別の詳細なコスト内訳を確認する
- 個人の支出、PR 履歴、モデル構成を調査する

## Bits AI エージェント {#bits-ai-agents}

{{< img src="/ai_agents_console/bits_ai_agents.png" alt="[Bits AI Agents] タブでは、時間の経過に伴うエージェントアクティビティの統合チャートと、Bits Investigation、Bits Code、Bits Agent Builder それぞれのカードで、最近の調査、セッション、実行内容を確認できます。" style="width:100%;" >}}

{{< ui >}}Bits AI Agents{{< /ui >}} タブには、Datadog の組み込み AI エージェントとコーディングエージェントの使用状況が表示されます。Datadog のすべてのエージェントにわたる調査、セッション、実行のビューにより、Bits AI のアクティビティと組織の他の活動を関連付けることができます。

[Bits Investigation][5]、[Bits Code][6]、[Bits Agent Builder][7] などの個別のカードに、各 Bits AI エージェントのアクティビティが要約されます。カードの {{< ui >}}View Details{{< /ui >}} をクリックすると、そのエージェントを確認できます。

## セットアップ {#set-up}

Agent Console へのデータ送信を開始するには、[Agent Console のセットアップ][8] を参照してください。

## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[4]: /ja/integrations/github-copilot/
[5]: /ja/bits_ai/bits_investigation/
[6]: /ja/bits_ai/bits_code/
[7]: /ja/actions/agents/
[8]: /ja/ai_agents_console/setup/