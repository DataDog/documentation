---
description: Datadog Agent Console で、コーディングエージェントと Bits AI エージェントの使用状況、コスト、パフォーマンスを組織全体でモニターします。
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
  text: Datadog Agent の Agent Console で組織内の Claude Code の適応をモニターします。
title: Agent Console
---
{{< callout url="#" btn_hidden="true" header="プレビュー">}}
エージェントコンソールはプレビュー中で、すべての Datadog のお客様にご利用いただけます。
{{< /callout >}}

[Agent Console][1] は、組織全体の AI エージェントの一元化されたモニタリングを提供します。コーディングエージェントと、Datadog の独自の [Bits AI エージェント](#bits-ai-agents)からログとメトリクスを収集し、リアルタイムで表示して、使用状況、コスト、レイテンシー、生産性への影響、新たな問題パターンを把握できます。

Agent Console は以下のコーディングエージェントをサポートします。

| ツール | 説明 |
|------|-------------|
| [Claude Code][2] | Anthropic のエージェンティックコーディングツール |
| [Cursor][3] | AI 駆動のコードエディタ |
| [GitHub Copilot][10] | GitHub の AI 駆動のコード補完ツール |


## コーディングエージェント {#coding-agents}

{{< ui >}}Coding Agents{{< /ui >}} タブでは、組織全体のコーディングエージェントのアクティビティをトップレベルで表示できます。デフォルトビューでは、すべてのコーディングエージェントを集約し、単一のエージェントにフィルタリングできます。

### エージェントの検出結果 {#agent-findings}

{{< ui >}}Agent Findings{{< /ui >}} パネルでは、合計支出、合計ユーザー数、セッション数、マージまでの時間、コード行数、セッションあたりの平均ターン数を含む、選択された時間範囲のハイレベルのアクティビティを要約します。積み上げチャートは、エージェント (例: Claude Code と Cursor) ごとにアクティビティが分割されるので、時間の経過に伴う適応を比較できます。

{{< img src="ai_agents_console/agent-findings.png" alt="合計支出、合計ユーザー数、セッション数、マージまでの時間、コード行数、および平均ターンの概要タイルが表示され、1 週間のエージェントアクティビティの積み上げ棒グラフが表示される、エージェントの検出結果パネル" style="width:100%;" >}}

### インパクトメトリクス {#impact-metrics}

{{< ui >}}Impact Metrics{{< /ui >}} パネルは、DORA スタイルのメトリクスを使用して、AI 支援開発がソフトウェア配信ライフサイクルに与える影響を測定し、AI 支援作業と非 AI 作業の比較を行います。

- **Adoption**: AI 支援のコミットと AI 支援の PR を含む、AI によって生成されているコードの量を追跡します。
- **Velocity**: 変更のリードタイムと PR レビュー時間を含む、変更が本番環境にリーチする速さを測定します。
- **Stability**: 変更失敗率と復旧時間を含む、リリース後の変更の信頼性を追跡します。

{{< img src="ai_agents_console/impact-metrics.png" alt="Adoption、Velocity、Stability の 3 つのカードがあり、それぞれ AI 支援作業と非 AI 作業を比較する 2 つのトレンドチャートが含まれる、インパクトメトリクスパネル" style="width:100%;" >}}

### 検出された問題 {#detected-problems}

{{< ui >}}Detected Problems{{< /ui >}} パネルは、チームが直面している一般的な問題パターンを強調し、修正を推奨します。サンキーダイアグラムは、問題パターン (スキップされたチェック、再試行ループ、ファイルの再読み込みなど) が個々のエージェントから特定のリポジトリに流れる様子を示し、各パターンの推定月額コストを示します。

{{< img src="ai_agents_console/detected-problems.png" alt="Claude Code、Cursor、GitHub Copilot セッションを、スキップされたチェック、再試行ループ、ファイルの再読み込みなどの問題パターンにマッピングし、その後、影響を受けたリポジトリにマッピングし、各リポジトリのコスト内訳を表示するサイドパネルがある、検出された問題のサンキーダイアグラム" style="width:100%;" >}}

パターンを選択すると、パターンの定義、組織全体の推定月額コスト、フラグが付けられたセッションのリスト、および推奨される修正を含む詳細ビューが開きます。

{{< img src="ai_agents_console/detected-pattern-detail.png" alt="パターンの定義、月額推定コスト $8,500、推奨を表示するボタン、ユーザー、エージェント、期間、コストを含む 12 のフラグ付きセッションのリストが表示された、スキップされたチェックの検出されたパターン詳細ビュー" style="width:100%;" >}}

### 個々のエージェントダッシュボード {#individual-agent-dashboards}

エージェントタイルを選択すると、そのコーディングエージェントの専用ダッシュボードが開きます。各ダッシュボードには、合計支出、セッション、コミット、追加された行の概要タイルとともに、リクエスト量、レイテンシー、モデル使用パターン、追加された行と削除された行の比較、ツールの受け入れと拒否の比較に関するパフォーマンスチャートが含まれます。

チーム、ユーザー、リポジトリ、時間範囲で、各ダッシュボードをフィルタリングします。

{{< img src="ai_agents_console/coding-agent-dashboard.png" alt="チーム、ユーザー、リポジトリのフィルタがあるコーディングエージェントタブの Claude Code ダッシュボード。合計支出、セッション、コミット、追加された行の概要タイル。時間経過に伴うコミット、時間経過に伴うプルリクエスト、追加された行と削除された行の比較、ツールの受け入れと拒否の比較に関するパフォーマンスチャート" style="width:100%;" >}}

## エージェントの使用状況を分析する {#analyze-agent-usage}

{{< ui >}}Analytics{{< /ui >}} タブは、個人とチームの詳細な情報を提供します。パワーユーザー、外れ値、チームレベルの適応パターンを特定するのに役立ちます。

### チーム比較 {#team-comparison}

{{< ui >}}Comparison{{< /ui >}} パネルには、チームの支出、行あたりのコスト、および他のチームや組織全体に対するモデルの使用状況が表示されます。折れ線グラフには時間の経過に伴うエンジニアごとの選択された指標が表示され、テーブルには各チームのエンジニアごとの支出、PR あたりのコスト、マージまでの時間、およびセッションの内訳が表示されます。右側のインサイトは、組織の平均を大きく上回るまたは下回るチームなど、注目すべきトレンドを強調します。

行の {{< ui >}}Team Details{{< /ui >}} を選択すると、そのチームのビューが開きます。

{{< img src="ai_agents_console/team-comparison.png" alt="時間の経過に伴うチーム間のエンジニアごとの支出の折れ線グラフ、右側のインサイトコールアウト、および各チームのエンジニアごとの支出、PR あたりのコスト、マージまでの時間、セッションを比較するテーブルが含まれる比較パネル" style="width:100%;" >}}

### ユーザー分析 {#user-analytics}

{{< ui >}}User Analytics{{< /ui >}} パネルには、個々のユーザーによるアクティビティの内訳が表示されます。

#### トップユーザー {#top-users}

3 つのリーダーボードが、支出、生成された行、マージされた PR によってトップコントリビューターをランク付けします。

{{< img src="ai_agents_console/top-users.png" alt="支出ごとのトップユーザー、生成された行ごとのトップユーザー、マージされた PR ごとのトップユーザーの 3 つのリーダーボードが表示されたユーザー分析パネル" style="width:100%;" >}}

#### 生成された行と支出の比較 {#lines-generated-vs-spend}

{{< ui >}}Lines Generated vs Spend{{< /ui >}} チャートは、各ユーザーをポイントとしてプロットします。ポイントサイズはセッションの数を反映します。両方の軸は設定可能なので、生成された行、PR、または支出を比較できます。

{{< img src="ai_agents_console/lines-vs-spend.png" alt="各ユーザーがセッションの数に応じてサイズが異なるバブルとして表示され、メールアドレスでラベル付けされた、生成された行と支出の散布図" style="width:100%;" >}}

#### エージェントのユーザーコスト {#user-cost-across-agents}

{{< ui >}}User Cost Across Agents{{< /ui >}} テーブルは、すべてのユーザー、使用しているエージェント、モデルコスト (モデルごとの内訳付き)、生成されたコード行、およびセッションの数をリストします。特定のユーザーを検索するか、任意の列でソートします。

{{< img src="ai_agents_console/user-cost-across-agents.png" alt="ユーザーごとのモデルコスト、使用されているエージェント、生成されたコード行、および 98 人のユーザーのセッションが表示されたエージェントのユーザーコストテーブル" style="width:100%;" >}}

ユーザーを選択すると、支出、生成された行、プルリクエスト、AI 採用率、モデルミックス、最近のプルリクエストを含む詳細ビューが開きます。{{< ui >}}GitHub Pull Requests{{< /ui >}} タブに切り替えると、ユーザーの全 PR 履歴が表示されます。

{{< img src="ai_agents_console/user-detail.png" alt="ユーザーの支出、生成行数、プルリクエストの要約タイル、AI の採用状況とモデルミックスの内訳、最近のプルリクエストのテーブルが表示された個々のユーザーの詳細ビュー" style="width:100%;" >}}

## Bits AI Agent {#bits-ai-agents}

{{< ui >}}Bits AI Agents{{< /ui >}} タブでは、Datadog のビルトイン AI Agent の使用状況がコーディングエージェントとともに表示されます。すべての Datadog Agent における調査、セッション、および実行の統合ビューにより、Bits AI のアクティビティを組織全体の他のアクティビティと関連付けることができます。

個々のカードは、[Bits AI SRE][11]、[Bits AI Dev Agent][12]、および [Agent Builder][13] を含む各 Bits AI Agent のアクティビティを要約します。カードで {{< ui >}}View Details{{< /ui >}} を選択すると、そのエージェントを調査できます。

{{< img src="ai_agents_console/bits-ai-agents.png" alt="時間の経過に伴うエージェント活動の統合チャートと、最近の調査、セッション、実行を示す Bits AI SRE、Bits AI Dev、Agent Builder の各カードがある Bits AI Agent タブ" style="width:100%;" >}}

## セットアップ {#set-up}

Agent Console へのデータ送信を開始するには、[Agent Console のセットアップ][14]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[10]: /ja/integrations/github-copilot/
[11]: /ja/bits_ai/bits_ai_sre/
[12]: /ja/bits_ai/bits_ai_dev_agent/
[13]: /ja/actions/agents/
[14]: /ja/ai_agents_console/setup/