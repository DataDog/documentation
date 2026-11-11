---
aliases:
- /ja/service_management/case_management/mcp_server/
- /ja/incident_response/case_management/mcp_server/
- /ja/incident_response/case_management/ai/
description: Datadog Work Management は AI ツールと統合されており、MCP Server とカスタムエージェントを使用して、作業項目のトリアージ、割り当て、解決の自動化を支援します。
site_support_id: work_management_ai_site_support
title: Work Management 向け AI ツール
---
Datadog Work Management では、作業項目を人に加えて AI エージェントにも割り当てることができます。Datadog MCP Server および Bits Agent Builder で構築されたカスタムエージェントと統合して、作業項目のトリアージ、割り当て、解決を自動化します。

## MCP Server {#mcp-server}

Datadog MCP Server は `cases` ツールセットを公開しており、[Model Context Protocol (MCP)][2] をサポートする AI エージェントが Work Management データにアクセスできるようになっています。`cases`ツールセットを使用すると、AI エージェントは作業項目の作成、検索、更新、管理を行うことができます。サポートされているワークフローには以下が含まれます。

- **ステータス、優先度、プロジェクト、その他のフィルターに基づいた作業項目の検索**
- **アクションの最新のタイムラインと残りの作業を把握するための作業項目の詳細の取得**
- **進行中の調査に関連する情報を追跡するための新しい作業項目の作成**
- **新しい調査結果、関連する Jira チケットへのリンク、またはエスカレーションされた優先度を追加するための、既存の作業項目の更新**

セットアップ手順および `cases` ツールセットの詳細については、[Datadog MCP Server に関するドキュメント][1] を参照してください。

## カスタムエージェント {#custom-agents}

{{< callout url="https://www.datadoghq.com/product-preview/custom-agents-in-case-management/" btn_hidden="false" header="プレビューに参加しましょう">}} カスタムエージェントとの Work Management 統合はプレビュー版です。{{< /callout >}}

[Bits Agent Builder][3] で構築された専門エージェントに作業項目を割り当て、初期トリアージからフォローアップ、解決まで、作業項目のライフサイクル全体を自動化します。使用例、エージェントのアーキタイプ、手動および自動割り当てについては、[Custom Agents][4] を参照してください。

[1]: /ja/mcp_server
[2]: https://modelcontextprotocol.io/
[3]: /ja/actions/agents/
[4]: /ja/incident_response/work_management/ai/custom_agents/