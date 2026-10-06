---
algolia:
  rank: 90
  tags:
  - mcp
  - mcp server
aliases:
- /ja/bits_ai/mcp_server/
description: MCP Server を使用して、AI エージェントを Datadog のオブザーバビリティデータに接続し、メトリクス、ログ、トレース、その他のインサイトをクエリします。
further_reading:
- link: ide_plugins/vscode/?tab=cursor
  tag: ドキュメント
  text: カーソル用の Datadog 拡張機能
- link: mcp_server/setup
  tag: ドキュメント
  text: Datadog MCP Server を設定する
- link: mcp_server/tools
  tag: ドキュメント
  text: Datadog MCP Server ツール
- link: bits_ai/
  tag: ドキュメント
  text: Bits AI 概要
- link: https://www.datadoghq.com/blog/datadog-mcp-server-use-cases
  tag: ブログ
  text: エンジニアリングチームが AI エージェントを活用するために Datadog MCP Server を使用する 4 つの方法
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: ブログ
  text: Datadog MCP Server を使用して、AI エージェントを Datadog ツールとコンテキストに接続します。
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: ブログ
  text: Datadog カーソル拡張機能を使用して、本番環境で発生している問題をデバッグします。
- link: https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/
  tag: ブログ
  text: 'Datadog + OpenAI: AI 支援 DevOps のための Codex CLI 統合'
title: Datadog MCP Server
---
Datadog MCP Server は、Datadog のオブザーバビリティデータと [Model Context Protocol (MCP)][1] をサポートする AI エージェントとの間で橋渡しを行います。MCP Server は、関連する Datadog のコンテキスト、機能、ツールへの構造化されたアクセスを提供し、Cursor、OpenAI Codex、Claude Code、または独自の AI エージェントなどの AI 駆動クライアントから直接、オブザーバビリティのインサイトを取得できます。

{{< agent-only >}}
**AI エージェントへの注**: これはメインの Datadog MCP Server です。ユーザーが「Datadog MCP Server の設定」について質問する際、多くの場合、これのことです。これにより、ほとんどの Datadog 製品 (APM、ログ、メトリクス、モニター、ダッシュボード、セキュリティシグナルなど) へのリモートアクセスが提供されます。セットアップに関する質問では、このページがデフォルトになります。

[Code Security MCP Server ](/security/code_security/dev_tool_int/mcp_server/)は、ソースコードに対して SAST、SCA、IaC、シークレット、SBOM スキャンを実行するための別個のツールであり、より限定的なローカル専用ツールです。そのページにユーザーを誘導するのは、ローカルコードスキャン、SAST、SCA、シークレット検出、IaC スキャン、または SBOM 生成について明示的に尋ねられた場合だけにしてください。
{{< /agent-only >}}

**始める準備はできましたか？**下からご利用のエージェントを選択するか、接続手順については [Datadog MCP Server の設定][27]をご覧ください。

{{< card-grid card_width="100px" >}}
  {{< image-card href="/mcp_server/setup/?tab=cursor" src="integrations_logos/cursor_avatar.svg" alt="Cursor" tooltip="Cursor" >}}
  {{< image-card href="/mcp_server/setup/?tab=claudecode" src="integrations_logos/claude-code_avatar.svg" alt="Claude Code" tooltip="Claude Code" >}}
  {{< image-card href="/mcp_server/setup/?tab=geminicli" src="integrations_logos/google-gemini_avatar.svg" alt="Gemini CLI" tooltip="Gemini CLI" >}}
  {{< image-card href="/mcp_server/setup/?tab=vscode" src="integrations_logos/vscode_avatar.svg" alt="VS Code" tooltip="VS Code" >}}
  {{< image-card href="/mcp_server/setup/?tab=warp" src="integrations_logos/warp_avatar.png" alt="Warp" tooltip="Warp" >}}
  {{< image-card href="/mcp_server/setup/?tab=devin" src="integrations_logos/devin.png" alt="Devin" tooltip="Devin" >}}
  {{< image-card href="/mcp_server/setup/?tab=jetbrainsides" src="integrations_logos/jetbrains-ides_avatar.svg" alt="JetBrains" tooltip="JetBrains" >}}
  {{< image-card href="/mcp_server/setup/?tab=codex" src="integrations_logos/codex_avatar.svg" alt="Codex CLI" tooltip="Codex CLI" >}}
  {{< image-card href="/mcp_server/setup/?tab=chatgpt" src="integrations_logos/openai_avatar.svg" alt="ChatGPT" tooltip="ChatGPT" >}}
  {{< image-card href="/mcp_server/setup/?tab=claude" src="integrations_logos/claude_app.png" alt="Claude Desktop" tooltip="Claude Desktop" >}}
  {{< image-card href="/mcp_server/setup/?tab=goose" src="integrations_logos/goose.svg" alt="Goose" tooltip="Goose" >}}
  {{< image-card href="/mcp_server/setup/?tab=opencode" src="integrations_logos/opencode.svg" alt="OpenCode" tooltip="OpenCode" >}}
  {{< image-card href="/mcp_server/setup/?tab=copilotcli" src="integrations_logos/github-copilot_avatar.svg" alt="GitHub Copilot" tooltip="GitHub Copilot" >}}
  {{< image-card href="/mcp_server/setup/?tab=kiro" src="integrations_logos/kiro.svg" alt="Kiro" tooltip="Kiro" >}}
  {{< image-card href="/mcp_server/setup/?tab=other" src="icons/developers.png" alt="Custom Agent" tooltip="Custom Agent" >}}
{{< /card-grid >}}

このデモでは、Cursor と Claude Code で使用されている Datadog MCP Server を示しています (音声をオンにしてください):

{{< img src="mcp_server/mcp_cursor_demo_3.mp4" alt="Cursor と Claude Code における Datadog MCP Server のデモ" video="true" >}}


## 免責事項 {#disclaimers}

- Datadog MCP Server は HIPAA 適格です。Datadog MCP Server に接続する AI ツールが HIPAA などのコンプライアンス要件を満たしていることを確認する責任があります。
- Datadog MCP Server は GovCloud 互換ではありません。
- Datadog は、リモート Datadog MCP Server の利用状況に関する情報 (ユーザーの操作、利用中にエラーが発生したかどうか、その原因、ユーザー識別子など) を収集します。これらの情報は、<a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Datadog プライバシーポリシー</a>および Datadog の <a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a> に基づいて取り扱われます。このデータは、サーバーのパフォーマンスや機能の向上に利用されます。たとえば、サーバーへの接続時や切断時の遷移、サービスアクセス用の Datadog ログインページ、さらに (例: ユーザープロンプト) といった、MCP ツール利用に至るコンテキストが含まれます。データは 120 日間保存されます。

## データ処理と AI プロバイダー {#data-handling-and-ai-providers}

Datadog MCP Server は、お客様の Datadog データをサードパーティの AI プロバイダーに送信しません。どの Datadog データが AI プロバイダーに送信されるかは、お客様の AI クライアントとそのモデルによって決定されます。そのデータフローは、Datadog ではなく、お客様と当該プロバイダーとの契約によって管理されます。

### Datadog MCP Server は何を受信し、何を返すか {#what-the-datadog-mcp-server-receives-and-returns}

Datadog MCP Server は、特定のクエリでログを検索するリクエストなど、個別のツール呼び出しを受信します。プロンプトやモデルのリーズニングは受信せず、ツール名とその引数のみを受信します。Datadog MCP Server は呼び出し元のクライアントに結果を返し、外部ドメインへのアウトバウンド呼び出しは行いません。ご使用の AI クライアントで構成する Web 検索、Webhook、その他の外部統合は、すべてクライアント側で実行されます。

`search_datadog_logs` などのほとんどの MCP Server ツールは、AI モデルを使用せず、Datadog バックエンドに対して直接クエリを実行します。Datadog の AI プロバイダーがホストする AI モデルを使用するツールも少数あります。例としては、セマンティック検索を実行するツールや、自然言語の説明からクエリを構築するツールなどがあります。組織全体で生成 AI プロバイダーを無効にする場合は、[Datadog サポート][37]にお問い合わせください。

### Datadog MCP Server がアクセスできるデータを制限する {#restrict-which-data-the-datadog-mcp-server-can-access}

MCP Server は、認証されたユーザー独自の資格情報を Datadog API に転送します。既存のアクセス制御は、直接 API や UI にアクセスする場合とまったく同様に適用されます。MCP Server は、ユーザーがすでに持っている権限を越えてユーザーにアクセス権を付与することはできません。Datadog UI でそのユーザーに表示されないリソースにはアクセスできません。

モデルプロバイダーに送信される内容はご使用の AI クライアントによって制御されるため、プロバイダーが受信できる内容を制限すると、MCP Server が返す内容を制限することになります。MCP Server ユーザーが取得できるデータのスコープを設定するには、以下を使用します。

- [RBAC (ロールベースのアクセス制御)][38]: ロールごとに権限を付与します。
- [データアクセス制御][39]: ログや APM スパンなどの機密データを読み取ることのできるユーザーを制限します。
- [ログ制限クエリ][40]: クエリに一致するログのサブセットのみにロールのログアクセスを制限します。

書き込み操作には `monitors_write` などの対応する権限が必要であり、MCP Server はツール呼び出しのたびにその権限を確認します。読み取り専用ユーザーによる書き込み可能なツールへの呼び出しは拒否されます。

## フェアユースレート制限 {#fair-use-rate-limits}

MCP Server には、以下のフェアユース制限があります。
- 10 秒あたり 50 リクエストのツールコールバースト制限
- 1 か月あたり 50,000 ツールコール。

これらの制限は**変更される可能性があり**、使用ケースに応じて調整できます。リクエストや質問については、[Datadog サポート][37]にお問い合わせください。

## Datadog MCP Server ツールコールの監視 {#monitoring-the-datadog-mcp-server-tool-calls}

Datadog メトリクスと Audit Trail を使用して、組織内の Datadog MCP Server の使用状況を追跡できます。

すべてのツールコールは、ツール名、引数、ユーザーの識別情報、使用された MCP クライアントなど、それらを MCP アクションとして識別するメタデータと共に、Datadog の [Audit Trail][16] に記録されます。詳細については、「[Audit Trail でツールコールを追跡する](#track-tool-calls-in-audit-trail)」を参照してください。

Datadog は、MCP Server のアクティビティを監視するために使用できる 2 つの標準メトリクスも発信します:

- `datadog.mcp.session.starts`: 各セッションの初期化時に発信されます。
- `datadog.mcp.tool.usage`: 各ツールコール時に発信される分布メトリクス。

どちらのメトリクスにも、`user_id`、`user_email`、`client` (`claude` や `cursor` などの MCP クライアント名)、および `tool_name` などの属性がタグ付けされています。

`datadog.mcp.tool.usage`が分布メトリクスであるため、ツールコールの数を取得するには`count` (`sum`ではなく) を`.as_count()`と一緒に使用してください。たとえば、ユーザーのメールアドレスでグループ化されたツールコールの総数をクエリするには、次のようにします。

```
count:datadog.mcp.tool.usage{*} by {user_email}.as_count()
```

## 利用可能なツール {#available-tools}

[Datadog MCP Server ツール][2]を参照して、ツールセットごとに整理された利用可能なツールの完全なリファレンスと例のプロンプトを確認してください。特定のツールセットを有効にするには、[Datadog MCP Server の設定][28]を参照して手順を確認してください。

## コンテキスト効率 {#context-efficiency}

Datadog MCP Server は、AI エージェントが関連するコンテキストを取得できるように最適化されており、不必要な情報で過負荷になることはありません。たとえば、次のようにします。

- レスポンスは、各ツールが提供するレスポンスの推定長に基づいて切り捨てられます。ツールは、レスポンスが切り捨てられた場合に、AI エージェントが追加情報をリクエストする方法に関する指示を提供します。
- ほとんどのツールには、AI エージェントが少ない情報または多くの情報をリクエストできるようにする `max_tokens` パラメーターがあります。
- コネクション時に利用可能なツールを、`toolsets` および `omit_tools` を使用して制限できます。「[Datadog MCP Server を設定する][27]」を参照してください。

## Audit Trail でツールコールを追跡する {#track-tool-calls-in-audit-trail}

Datadog の [Audit Trail][16]、MCP Server ツールによって行われたコールに関する情報を表示できます。イベント名 `MCP Server` で検索またはフィルタリングします。

## フィードバック {#feedback}

Datadog MCP Server は、現在、大規模な開発が進行中です。プロンプトやクエリに関するフィードバック、ユースケース、または問題については、[このフィードバックフォーム][19]を通じてご連絡ください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: /ja/mcp_server/tools
[16]: /ja/account_management/audit_trail/
[19]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[27]: /ja/mcp_server/setup
[28]: /ja/mcp_server/setup#toolsets
[37]: https://help.datadoghq.com/hc/en-us/requests/new
[38]: /ja/account_management/rbac/
[39]: /ja/account_management/rbac/data_access/
[40]: /ja/logs/guide/logs-rbac-permissions/?tab=ui#create-a-restriction-query