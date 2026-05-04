---
algolia:
  rank: 90
  tags:
  - mcp
  - mcp server
description: MCPサーバーを使用して、AIエージェントをDatadogの可観測性データに接続し、メトリクス、ログ、トレース、その他のインサイトをクエリします。
further_reading:
- link: ide_plugins/vscode/?tab=cursor
  tag: よくあるご質問
  text: Datadogカーソル用拡張機能
- link: bits_ai/mcp_server/setup
  tag: よくあるご質問
  text: Datadog MCPサーバーの設定
- link: bits_ai/mcp_server/tools
  tag: よくあるご質問
  text: Datadog MCPサーバーツール
- link: bits_ai/
  tag: よくあるご質問
  text: Bits AI 概要
- link: https://www.datadoghq.com/blog/datadog-mcp-server-use-cases
  tag: 英語ブログ
  text: エンジニアリングチームがAIエージェントを活用するためにDatadog MCPサーバーを使用する4つの方法
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: 英語ブログ
  text: Datadog MCPサーバーを使用して、AIエージェントをDatadogツールとコンテキストに接続します。
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: 英語ブログ
  text: Datadogカーソル拡張機能を使用して、ライブプロダクションの問題をデバッグします。
- link: https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/
  tag: 英語ブログ
  text: 'Datadog + OpenAI: AI支援DevOpsのためのCodex CLI統合'
title: Datadog MCPサーバー
---
Datadog MCPサーバーは、Datadogの可観測性データと[モデルコンテキストプロトコル（MCP）][1]をサポートするAIエージェントとの間の橋渡しを行います。MCPサーバーは、関連するDatadogのコンテキスト、機能、およびツールへの構造化されたアクセスを提供し、Cursor、OpenAI Codex、Claude Code、または独自のAIエージェントなどのAI駆動クライアントから直接可観測性のインサイトをクエリして取得できます。

**始める準備はできましたか？**以下からエージェントを選択するか、接続手順については[Datadog MCPサーバーの設定][27]をご覧ください。

{{< partial name="mcp_server/mcp_server_agents.html" >}}

このデモでは、CursorとClaude Codeで使用されているDatadog MCPサーバーを示しています（音声をオンにしてください）：

{{< img src="bits_ai/mcp_server/mcp_cursor_demo_3.mp4" alt="CursorとClaude CodeにおけるDatadog MCPサーバーのデモ" video="true" >}}


##免責事項{#disclaimers}

-Datadog MCPサーバーはHIPAA適格です。Datadog MCPサーバーに接続するAIツールが、HIPAAなどのコンプライアンス要件を満たしていることを確認する責任があります。
-Datadog MCPサーバーはGovCloud互換ではありません。
-Datadogは、リモートDatadog MCPサーバーの使用に関する特定の情報を収集します。これには、どのように相互作用しているか、使用中にエラーが発生したかどうか、エラーの原因、ユーザー識別子が含まれます。これは、<a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Datadogプライバシーポリシー</a>およびDatadogの<a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a>に従います。このデータは、サーバーのパフォーマンスと機能を改善するために使用され、サーバーへの移行やサーバーからの移行、サービスにアクセスするための適用可能なDatadogログインページ、そしてMCPツールの使用につながるコンテキスト（例えば、ユーザーのプロンプト）を含みます。データは120日間保存されます。

##フェアユースのレート制限 {#fair-use-rate-limits}

MCPサーバーには、以下のフェアユース制限があります：
- 10秒あたり50リクエストのツールコールバースト制限
- 1日あたり5000ツールコール
- 1か月あたり50,000ツールコール。

これらの制限は**変更される可能性があり**、使用ケースに応じて調整できます。リクエストや質問については、[Datadogサポート][37]にお問い合わせください。

## Datadog MCPサーバーツールコールの監視 {#monitoring-the-datadog-mcp-server-tool-calls}

Datadogメトリクスと監査トレイルを使用して、組織のDatadog MCPサーバーの使用状況を追跡できます。

すべてのツールコールは、ツール名、引数、ユーザーの識別情報、使用されたMCPクライアントを含むメタデータと共に、Datadogの[監査トレイル][16]に記録されます。詳細については、[監査トレイルでのツールコールの追跡](#track-tool-calls-in-audit-trail)を参照してください。

Datadogは、MCPサーバーのアクティビティを監視するために使用できる2つの標準メトリクスも発信します：

- `datadog.mcp.session.starts`: 各セッションの初期化時に発信されます。
- `datadog.mcp.tool.usage`: 各ツールコール時に発信される分布メトリクス。

両方のメトリクスには、`user_id`、`user_email`、`client`（MCPクライアント名、例えば`claude`または`cursor`）などの属性がタグ付けされています。

`datadog.mcp.tool.usage`は分布メトリクスであるため、ツールコールの数を取得するには`count`（`sum`ではなく）を`.as_count()`と一緒に使用してください。例えば、ユーザーのメールアドレスでグループ化されたツールコールの総数をクエリするには：

```
count:datadog.mcp.tool.usage{*} by {user_email}.as_count()
```

## 利用可能なツール {#available-tools}

利用可能なツールをツールセットごとに整理し、例のプロンプトとともに、完全なリファレンスについては[Datadog MCPサーバーツール][2]を参照してください。特定のツールセットを有効にするには、[Datadog MCPサーバーのセットアップ][28]を参照して手順を確認してください。

##コンテキスト効率 {#context-efficiency}

Datadog MCPサーバーは、AIエージェントが関連するコンテキストを受け取り、不要な情報で圧倒されないように応答を最適化しています。たとえば、以下のとおりです。

- 応答は、各ツールが提供する応答の推定長に基づいて切り捨てられます。ツールは、応答が切り捨てられた場合に、AIエージェントが追加情報をリクエストする方法についての指示を提供します。
-ほとんどのツールには、AIエージェントが少ない情報または多くの情報をリクエストできるようにする`max_tokens`パラメータがあります。

##監査トレイル {#track-tool-calls-in-audit-trail} でツールの呼び出しを追跡します。

Datadogの[監査トレイル][16]で、MCPサーバーツールによって行われた呼び出しに関する情報を表示できます。イベント名 `MCP Server` で検索またはフィルタリングします。

##フィードバック

Datadog MCPサーバーは、重要な開発が進行中です。[このフィードバックフォーム][19]を使用して、プロンプトやクエリで遭遇したフィードバック、ユースケース、または問題を共有してください。

##参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: /ja/bits_ai/mcp_server/tools
[16]: /ja/account_management/audit_trail/
[19]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[27]: /ja/bits_ai/mcp_server/setup
[28]: /ja/bits_ai/mcp_server/setup#toolsets
[37]: https://help.datadoghq.com/hc/en-us/requests/new