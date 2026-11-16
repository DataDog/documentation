---
aliases:
- /ja/incident_response/case_management/ai/custom_agents/
description: Bits Agent Builder で構築したカスタムエージェントを使用して Datadog の Work Management ワークフローを自動化する方法を学びます。
further_reading:
- link: /actions/agents/
  tag: ドキュメント
  text: Bits Agent Builder
- link: /actions/actions_catalog/
  tag: ドキュメント
  text: Action Catalog
title: Datadog AI Agents
---
{{< site-region region="gov" >}}
<div class="alert alert-danger">Work Management の AI 機能は、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

<div class="alert alert-info">カスタムエージェントとの Work Management 統合はプレビュー版です。</div>

## 概要 {#overview}

Work Management は [Bits Agent Builder][1] と統合されており、作業項目の作成、トリアージ、解決を手動から自動に移行できます。さまざまなワークフローをサポートするために、作業項目をカスタムエージェントに割り当てます。

## カスタムエージェントを作成する {#create-custom-agents}

[Bits Agent Builder][1] を使用して、作業項目のトリアージと解決ができるカスタムエージェントを作成します。Agent は、作業項目の作成、更新、解決など、[Action Catalog][2] のあらゆるアクションを実行できます。Work Management で使用するために構築できるエージェントの例を以下に示します。

- **課題トリアージ**: 受信した作業項目に構造とコンテキストを追加し、人間が準備作業なしで対応できるようにします。
- **セキュリティシグナルアグリゲーター**: 関連するセキュリティシグナルを 1 つの統合された調査作業項目にグループ化し、分析のサイロ化を防ぎます。
- **機能実装**: 機能リクエストの仕様からドラフト PR を作成し、改善をより迅速にリリースできるように支援します。
- **IT アクセスリクエスト自動化**: 作業項目の詳細を確認し、不足している詳細を提出者に要求し、管理者からの必要な承認を自動的にリクエストします。
- **サポートファーストレスポンダー**: サポートチケットの初期回答案を作成し、調査プロセスを開始して、平均解決時間 (MTTR) の短縮を支援します。

## Work Management でカスタムエージェントを使用する {#using-custom-agents-in-work-management}

Bits Agent Builder のエージェントを作業項目に手動または自動で割り当てるには、作業項目の **Agent Assignee** フィールドを使用します。

### 手動割り当て {#manual-assignment}

作業項目で、**Agent Assignee** フィールドのドロップダウンからエージェントを選択します。

### 自動割り当て {#automated-assignment}

[作業項目自動化ルール][3] を使用して、作業項目をエージェントに自動的に割り当てます。

1. **[Work Management > Settings][4]** に移動します。
1. 自動化ルールを作成するプロジェクトを選択します。
1. **自動化ルール**を選択します。
1. **新しいルール**をクリックします。
1. ルールを実行するタイミングのトリガーを定義します。
1. **Assign Agent** を選択し、一致する作業項目を割り当てるカスタムエージェントを選択します。
1. ルールを有効にして名前を付けます。

**注**: Agent は、作業項目にエージェントを割り当てたユーザーの権限を使用して実行されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/actions/agents/
[2]: /ja/actions/actions_catalog/
[3]: /ja/incident_response/work_management/automation_rules/
[4]: https://app.datadoghq.com/work/settings