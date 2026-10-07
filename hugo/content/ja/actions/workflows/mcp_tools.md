---
description: Datadog MCP Server の workflows ツールセットを使用して、ワークフローの構築、管理、実行、デバッグを AI エージェントで行います。
further_reading:
- link: mcp_server/setup
  tag: ドキュメント
  text: Datadog MCP Server を設定する
- link: mcp_server
  tag: ドキュメント
  text: Datadog MCP Server の概要
- link: mcp_server/tools
  tag: ドキュメント
  text: Datadog MCP Server ツール
- link: actions/workflows/
  tag: ドキュメント
  text: Workflow Automation
title: Workflow Automation MCP ツール
---
## 概要{#overview}

[Datadog MCP Server][1] を使用すると、[Model Context Protocol (MCP)][2] を通じて AI エージェントでワークフローを構築および管理できます。

`workflows` ツールセットを使用すると、Claude Code、Cursor、OpenAI Codex などの AI クライアントから、ワークフロー、Action Catalog、ワークフロースキーマ、および実行データにアクセスできるようになります。自然言語を使用して、ワークフローの作成や更新、仕様の検証、公開済みワークフローの実行、実行結果の調査を行うことができます。

## ユースケース{#use-cases}

`workflows` ツールセットを使用して、次のような自動化を構築できます。

- **モニターアラートの調査**: サービスエラー率モニターがアラートを発した際に Bits Investigation を実行して、レイテンシ、最近のデプロイ、ダウンストリームサービスの健全性を関連付け、その調査結果を Slack で担当チームに送信します。
- **カスタムエージェントの使用**: 決済、データパイプライン、Kubernetes などの専門システム向けのカスタム Bits Agent Builder エージェントを作成して、アラートがそのドメインの専門知識を必要とするたびにワークフローから呼び出します。
- **インシデントエスカレーションの自動化**: 重大なインシデントが宣言された際に、関連するサービスコンテキストを収集し、適切なオンコールチームを呼び出し、ケースを作成して、関係者に通知します。
- **デプロイのリグレッションの調査**: デプロイ後、現在のサービスの動作を最近の変更と比較して、リグレッションの可能性が見つかった場合は、Bits Code セッションを開始して関連コードを調査し、修正案を提示します。
- **アラートから修復アクションをトリガー**: モニターが既知の障害状態を検出した際に、サービスの再起動、AWS Lambda 関数の呼び出し、内部修復エンドポイントの呼び出しなどの修復アクションを実行します。
- **コード修正の作成**: 問題を調査し、Bits Code にコード変更案を提示させ、人間によるレビューを経て修正案が承認された後、変更を実装します。
- **重大度の高いセキュリティ検出結果のエスカレーション**: 重大な検出結果が検出された際に、ケースまたはチケットを作成し、担当チームに通知して、適切な対応担当者を呼び出します。

## クイックスタート {#quickstart}

<div class="alert alert-info"> <code>workflows</code> ツールセットは、外部 MCP クライアントに対してデフォルトでは有効になっていません。</div>

1. [Datadog MCP Server を設定][1]します。
1. AI クライアントを Datadog MCP Server に接続する際に、`workflows` を `toolsets` パラメーターに追加します。たとえば、Datadog US1 サイトの場合は次のようになります。

    {{< code-block lang="none" >}}
https://mcp.datadoghq.com/v1/mcp?toolsets=core,workflows
{{< /code-block >}}

    **注**: アプリケーションキーを使用して認証する場合は、[**[Organization Settings] (組織設定) > [Application Keys] (アプリケーションキー)**][4] でそのキーの[アクション API アクセス][3]を有効にしてください。アクション API アクセスは、アプリケーションキーに対してデフォルトで無効になっていますが、Workflow Automation API にアクセスするために必要です。

1. 接続後、リクエストを行うと、AI クライアントがユーザーに代わって適切なツールを呼び出します。
    - “モニターアラートによってトリガーされた、私のチームが所有するワークフローを見つけて。”
    - “このモニターがアラートを発したときに Bits Investigation を実行し、その結果を Slack に投稿するワークフローを作成して。”
    - “最後に失敗したワークフローの実行をデバッグして。”

## 権限 {#permissions}

Workflow Automation MCP ツールは、ユーザーの既存の Datadog 権限を使用します。操作は、MCP の認証に使用された Datadog 組織内で実行されます。

| 権限       | 機能                                                                          |
|------------------|----------------------------------------------------------------------------------------|
| ワークフローの読み取り   | ワークフロー、スキーマ、アクションの検索と取得、仕様の検証、および実行の調査 |
| ワークフローの書き込み  | ワークフローの作成、更新、公開、公開取り消し、および完全削除                   |
| ワークフローの実行    | ワークフローの開始および実行後のキャンセル                                          |

## 利用可能なツール {#available-tools}

`workflows` ツールセットは、以下のツールを公開します。これらのツールは、ワークフローのライフサイクルのどの部分をサポートするかによってグループ化されています。これには、ワークフローの検索と調査、仕様とアクションの検出、ワークフローの作成と管理、仕様の検証、実行の開始と調査、およびステップのデバッグが含まれます。自然言語で自動化をリクエストすると、AI クライアントがユーザーに代わってこれらのツールを呼び出します。それらの結果が連結されて、目的の出力が生成されます。各ツールの詳細 (権限やリクエスト例を含む) については、[Datadog MCP Server ツールのリファレンス][5]を参照してください。

### ワークフローの検出{#workflow-discovery}

- [`list_datadog_workflows`][6]
- [`get_datadog_workflow`][7]

### 仕様とアクションの検出{#specification-and-action-discovery}

- [`get_datadog_workflow_spec_schema`][8]
- [`search_datadog_workflow_actions`][9]
- [`get_datadog_workflow_action`][10]

### ワークフローの作成と管理{#workflow-creation-and-management}

- [`create_datadog_workflow`][11]
- [`update_datadog_workflow`][12]
- [`publish_datadog_workflow`][13]
- [`unpublish_datadog_workflow`][14]
- [`delete_datadog_workflow`][15]
- [`validate_datadog_workflow`][16]

### ワークフローの実行{#workflow-execution}

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