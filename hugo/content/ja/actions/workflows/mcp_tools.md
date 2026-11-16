---
description: Datadog MCP Server のワークフローツールセットを使用して、AI agent によるワークフローの構築、管理、実行、およびデバッグを行います。
further_reading:
- link: mcp_server/setup
  tag: ドキュメント
  text: Datadog MCP サーバーを設定する
- link: mcp_server
  tag: ドキュメント
  text: Datadog MCP サーバーの概要
- link: mcp_server/tools
  tag: ドキュメント
  text: Datadog MCP Server ツール
- link: actions/workflows/
  tag: ドキュメント
  text: Workflow Automation
title: Workflow Automation MCP ツール
---
{{< site-region region="gov2" >}}
<div class="alert alert-info">Workflow Automation は、選択した Datadog サイトでプレビュー版として提供されています ({{< region-param key=dd_site_name >}}) では利用できません。</div>
{{< /site-region >}}

## 概要 {#overview}

[Datadog MCP Server][1] は、AI agent が [Model Context Protocol (MCP)][2] を通じてワークフローを構築および管理できるようにします。

`workflows` ツールセットを使用すると、Claude Code、Cursor、OpenAI Codex などの AI クライアントが、ワークフロー、Action Catalog、ワークフロースキーマ、および実行データにアクセスできるようになります。自然言語を使用して、ワークフローの作成と更新、仕様の検証、公開済みワークフローの実行、および実行結果の調査を行うことができます。

## ユースケース{#use-cases}

`workflows` ツールセットを使用して、以下のような自動化を構築します。

- **モニターアラートの調査**: サービスのエラー率モニターがアラートを発した際に、Bits Investigation を実行してレイテンシ、最近のデプロイ、ダウンストリームサービスの健全性を関連付け、その結果を Slack で担当チームに送信します。
- **カスタム agent の使用**: 決済、データパイプライン、Kubernetes などの専門システム向けにカスタム Bits Agent Builder agent を作成し、ドメインの専門知識が必要なアラートが発生するたびにワークフローから呼び出します。
- **インシデントエスカレーションの自動化**: 重大なインシデントが発生した際に、関連するサービスコンテキストを収集し、適切なオンコールチームを呼び出し、ケースを作成して、関係者に通知します。
- **デプロイ回帰の調査**: デプロイ後、現在のサービスの動作を最近の変更と比較し、回帰の可能性が見つかった場合は、Bits Code セッションを開始して関連するコードを調査し、修正案を提示します。
- **アラートからの修復のトリガー**: モニターが既知の障害状態を検出した際に、サービスの再起動、AWS Lambda 関数の呼び出し、内部修復エンドポイントの呼び出しなどの修復アクションを実行します。
- **コード修正の作成**: 問題を調査し、Bits Code にコード変更案を提示させ、人間によるレビューを必須とし、修正案が承認された後に変更を実装します。
- **重大度の高いセキュリティ調査結果のエスカレーション**: 重大な調査結果が検出された際に、ケースまたはチケットを作成し、担当チームに通知し、適切な担当者を呼び出します。

## クイックスタート{#quickstart}

<div class="alert alert-info"> <code>workflows</code> ツールセットは、外部 MCP クライアントに対してデフォルトでは有効になっていません。</div>

1. [Datadog MCP Server をセットアップしてください][1]。
1. AI クライアントを Datadog MCP Server に接続する際は、`workflows` を `toolsets` パラメータに追加してください。例として、Datadog US1 サイトの場合:

    {{< code-block lang="none" >}}
https://mcp.datadoghq.com/v1/mcp?toolsets=core,workflows
{{< /code-block >}}

    **注**: アプリケーションキーを使用して認証を行う場合は、[**Organization Settings > Application Keys**][4] から、そのキーに対して [Actions API access][3] を有効にしてください。Actions API アクセスは、アプリケーションキーに対してデフォルトで無効になっており、Workflow Automation API にアクセスするために必要です。

1. 接続後、リクエストを行うと、AIクライアントがユーザーに代わって適切なツールを呼び出します。
    - 「私のチームが所有し、モニターアラートによってトリガーされるワークフローを見つけてください。」
    - 「このモニターがアラートを発したときにBits Investigationを実行し、その結果をSlackに投稿するワークフローを作成してください。」
    - 「最後に失敗したワークフローの実行をデバッグしてください。」

## 権限 {#permissions}

Workflow Automation MCPツールは、ユーザーの既存のDatadog権限を使用します。操作は、MCPの認証に使用されたDatadog組織内で実行されます。

| 権限       | 機能                                                                          |
|------------------|----------------------------------------------------------------------------------------|
| Workflows Read   | ワークフロー、スキーマ、アクションの検索と取得、仕様の検証、および実行の調査 |
| Workflows Write  | ワークフローの作成、更新、公開、公開取り消し、および完全削除                   |
| ワークフローの実行    | ワークフローの開始および実行中のワークフローのキャンセル                                          |

## 利用可能なツール{#available-tools}

`workflows`ツールセットは、ワークフローのライフサイクルの各段階ごとにグループ化された以下のツールを公開します。これには、ワークフローの検索と調査、仕様とアクションの検出、ワークフローの作成と管理、仕様の検証、実行および調査、ステップのデバッグが含まれます。自然言語で自動化リクエストを行うと、AIクライアントがユーザーに代わってこれらのツールを呼び出します。AIクライアントは、その結果を連結して、目的の出力を生成します。各ツールの詳細（権限やリクエスト例を含む）については、[Datadog MCP Server tools reference][5]を参照してください。

### ワークフローの検出 {#workflow-discovery}

- [`list_datadog_workflows`][6]
- [`get_datadog_workflow`][7]

### 仕様とアクションの検出 {#specification-and-action-discovery}

- [`get_datadog_workflow_spec_schema`][8]
- [`search_datadog_workflow_actions`][9]
- [`get_datadog_workflow_action`][10]

### ワークフローの作成と管理 {#workflow-creation-and-management}

- [`create_datadog_workflow`][11]
- [`update_datadog_workflow`][12]
- [`publish_datadog_workflow`][13]
- [`unpublish_datadog_workflow`][14]
- [`delete_datadog_workflow`][15]
- [`validate_datadog_workflow`][16]

### ワークフローの実行 {#workflow-execution}

- [`execute_datadog_workflow`][17]
- [`get_datadog_workflow_instance`][18]
- [`list_datadog_workflow_instances`][19]
- [`cancel_datadog_workflow_instance`][20]
- [`get_datadog_workflow_step_data`][21]

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/mcp_server/setup/
[2]: https://modelcontextprotocol.io/
[3]: /ja/account_management/api-app-keys/#actions-api-access
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /ja/mcp_server/tools/#workflows
[6]: /ja/mcp_server/tools/#list_datadog_workflows
[7]: /ja/mcp_server/tools/#get_datadog_workflow
[8]: /ja/mcp_server/tools/#get_datadog_workflow_spec_schema
[9]: /ja/mcp_server/tools/#search_datadog_workflow_actions
[10]: /ja/mcp_server/tools/#get_datadog_workflow_action
[11]: /ja/mcp_server/tools/#create_datadog_workflow
[12]: /ja/mcp_server/tools/#update_datadog_workflow
[13]: /ja/mcp_server/tools/#publish_datadog_workflow
[14]: /ja/mcp_server/tools/#unpublish_datadog_workflow
[15]: /ja/mcp_server/tools/#delete_datadog_workflow
[16]: /ja/mcp_server/tools/#validate_datadog_workflow
[17]: /ja/mcp_server/tools/#execute_datadog_workflow
[18]: /ja/mcp_server/tools/#get_datadog_workflow_instance
[19]: /ja/mcp_server/tools/#list_datadog_workflow_instances
[20]: /ja/mcp_server/tools/#cancel_datadog_workflow_instance
[21]: /ja/mcp_server/tools/#get_datadog_workflow_step_data
[22]: /ja/actions/actions_catalog/