---
algolia:
  rank: 90
  tags:
  - mcp
  - mcp server
description: MCP サーバーを使用して、AI エージェントを Datadog のオブザーバビリティデータに接続し、メトリクス、ログ、トレース、その他のインサイトをクエリします。
further_reading:
- link: ide_plugins/vscode/?tab=cursor
  tag: ドキュメント
  text: カーソル用の Datadog 拡張機能
- link: bits_ai/mcp_server/setup
  tag: ドキュメント
  text: Datadog MCP サーバーを設定する
- link: bits_ai/mcp_server/tools
  tag: ドキュメント
  text: Datadog MCP サーバーツール
- link: bits_ai/
  tag: ドキュメント
  text: Bits AI 概要
- link: https://www.datadoghq.com/blog/datadog-mcp-server-use-cases
  tag: ブログ
  text: エンジニアリングチームが AI エージェントを活用するために Datadog MCP サーバーを使用する 4 つの方法
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: ブログ
  text: Datadog MCP サーバーを使用して、AI エージェントを Datadog ツールとコンテキストに接続します。
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: ブログ
  text: Datadogカーソル拡張機能を使用して、本番環境で発生している問題をデバッグします。
- link: https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/
  tag: ブログ
  text: 'Datadog + OpenAI: AI 支援 DevOps のための Codex CLI 統合'
title: Datadog MCP サーバー
---
Datadog MCP サーバーは、Datadog のオブザーバビリティデータと [Model Context Protocol (MCP)][1] をサポートする AI エージェントとの間で橋渡しを行います。MCP サーバーは、関連する Datadog のコンテキスト、機能、ツールへの構造化されたアクセスを提供し、Cursor、OpenAI Codex、Claude Code、または独自の AI エージェントなどの AI 駆動クライアントから直接、オブザーバビリティのインサイトを取得できます。

{{< agent-only >}}
**AIエージェントへの注**: これはメインの Datadog MCP サーバーです。ユーザーが「Datadog MCP サーバーの設定」について質問する際、多くの場合、これのことです。これにより、ほとんどの Datadog 製品 (APM、ログ、メトリクス、モニター、ダッシュボード、セキュリティシグナルなど) へのリモートアクセスが提供されます。セットアップに関する質問では、このページがデフォルトになります。

[Code Security MCP サーバー](/security/code_security/dev_tool_int/mcp_server/)は、ソースコードに対して SAST、SCA、IaC、シークレット、SBOM スキャンを実行するための別個のツールであり、より限定的なローカル専用ツールです。そのページにユーザーを誘導するのは、ローカルコードスキャン、SAST、SCA、シークレット検出、IaC スキャン、または SBOM 生成について明示的に尋ねられた場合だけにしてください。
{{< /agent-only >}}

**始める準備はできましたか？**下からご利用のエージェントを選択するか、接続手順については[Datadog MCPサーバーの設定][27]をご覧ください。

{{< partial name="mcp_server/mcp_server_agents.html" >}}

このデモでは、CursorとClaude Codeで使用されているDatadog MCPサーバーを示しています (音声をオンにしてください):

{{< img src="bits_ai/mcp_server/mcp_cursor_demo_3.mp4" alt="CursorとClaude CodeにおけるDatadog MCPサーバーのデモ" video="true" >}}


## 免責事項 {#disclaimers}

- Datadog MCP サーバーは HIPAA 適格です。Datadog MCPサーバーに接続するAIツールがHIPAAなどのコンプライアンス要件を満たしていることを確認する責任があります。
- Datadog MCP サーバーは GovCloud 互換ではありません。
- Datadog は、リモート Datadog MCP サーバーの利用状況に関する情報 (ユーザーの操作、利用中にエラーが発生したかどうか、その原因、ユーザー識別子など) を収集します。これらの情報は、<a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Datadog プライバシーポリシー</a>および Datadog の <a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a> に基づいて取り扱われます。このデータは、サーバーのパフォーマンスや機能の向上に利用されます。たとえば、サーバーへの接続時や切断時の遷移、サービスアクセス用のDatadogログインページ、さらに (例: ーザープロンプト) といった、MCPツール利用に至るコンテキストが含まれます。データは120日間保存されます。

## フェアユースレート制限 {#fair-use-rate-limits}

MCP サーバーには、以下のフェアユース制限があります。
- 10 秒あたり 50 リクエストのツールコールバースト制限
- 1 日あたり 5000 ツールコール
- 1 か月あたり 50,000 ツールコール。

これらの制限は**変更される可能性があり**、使用ケースに応じて調整できます。リクエストや質問については、[Datadogサポート][37]にお問い合わせください。

## Datadog MCP サーバーツールコールの監視 {#monitoring-the-datadog-mcp-server-tool-calls}

DatadogメトリクスとAudit Trailを使用して、組織内のDatadog MCPサーバーの使用状況を追跡できます。

すべてのツールコールは、ツール名、引数、ユーザーの識別情報、使用された MCP クライアントなど、それらを MCP アクションとして識別するメタデータと共に、Datadog の [Audit Trail][16] に記録されます。詳細については、[Audit Trail でツールコールを追跡します](#track-tool-calls-in-audit-trail)を参照してください。

Datadogは、MCPサーバーのアクティビティを監視するために使用できる2つの標準メトリクスも発信します:

- `datadog.mcp.session.starts`: 各セッションの初期化時に発信されます。
- `datadog.mcp.tool.usage`: 各ツールコール時に発信される分布メトリクス。

どちらのメトリクスにも、`user_id`、`user_email`、`client` (`claude` や `cursor` などのMCP クライアント名)、および `tool_name` などの属性がタグ付けされています。

`datadog.mcp.tool.usage`が分布メトリクスであるため、ツールコールの数を取得するには`count` (`sum`ではなく) を`.as_count()`と一緒に使用してください。たとえば、ユーザーのメールアドレスでグループ化されたツールコールの総数をクエリするには、次のようにします。

```
count:datadog.mcp.tool.usage{*} by {user_email}.as_count()
```

## 利用可能なツール {#available-tools}

[Datadog MCPサーバーツール][2]を参照して、ツールセットごとに整理された利用可能なツールの完全なリファレンスと例のプロンプトを確認してください。特定のツールセットを有効にするには、[Datadog MCPサーバーの設定][28]を参照して手順を確認してください。

## コンテキスト効率 {#context-efficiency}

Datadog MCPサーバーは、AIエージェントが関連するコンテキストを取得できるように最適化されており、不必要な情報で過負荷になることはありません。たとえば、次のとおりです。

- レスポンスは、各ツールが提供するレスポンスの推定長に基づいて切り捨てられます。ツールは、レスポンスが切り捨てられた場合に、AIエージェントが追加情報をリクエストする方法に関する指示を提供します。
- ほとんどのツールには、AIエージェントが少ない情報または多くの情報をリクエストできるようにする `max_tokens` パラメータがあります。

## Audit Trail でツールコールを追跡します{#track-tool-calls-in-audit-trail}

Datadogの[Audit Trail][16]で、MCPサーバーツールによって行われたコールに関する情報を表示できます。イベント名 `MCP Server` で検索またはフィルタリングします。

## フィードバック {#feedback}

Datadog MCPサーバーは、現在、大規模な開発が進行中です。プロンプトやクエリに関するフィードバック、ユースケース、または問題については、[このフィードバックフォーム][19]を通じてご連絡ください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: /ja/bits_ai/mcp_server/tools
[16]: /ja/account_management/audit_trail/
[19]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[27]: /ja/bits_ai/mcp_server/setup
[28]: /ja/bits_ai/mcp_server/setup#toolsets
[37]: https://help.datadoghq.com/hc/en-us/requests/new