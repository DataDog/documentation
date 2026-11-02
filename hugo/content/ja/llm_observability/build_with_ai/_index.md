---
description: Datadog MCPサーバー、CLI、およびClaude Codeスキルを使用して、開発環境からLLMアプリケーションを構築および分析します。
title: AIで構築する
---
Datadogは、Datadog MCPサーバー、Pup CLI、およびClaude Codeスキルを通じて、コーディングエージェントのワークフローをサポートします。これらを使用して、開発環境を離れることなく、Agent Observabilityデータを調査し、LLMアプリケーションを反復的に改善します。

## 開始する {#get-started}

### スキルをインストールする {#install-the-skills}

{{< code-block lang="shell" >}}
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
{{< /code-block >}}

### データバックエンドを選択 {#choose-a-data-backend}

これらのスキルは、Datadog MCPサーバーまたはPup CLIのいずれかを通じて、Agent Observabilityデータを読み取ります。いずれか一方をセットアップしてください。各スキルは起動時にMCPサーバーを検出し、MCPサーバーが利用できない場合はPup CLIにフォールバックします。

{{% collapse-content title="オプション A: Datadog MCPサーバー" level="h4" expanded=true id="option-a-mcp-server" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
MCPサーバーをClaude Codeセッションに接続します：

<pre><code>claude mcp add --scope user --transport http datadog-llmo-mcp \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトではこの製品はサポートされていません ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

認証オプションや利用可能なツールを含む完全なセットアップについては、[MCP Server][2]を参照してください。

{{% /collapse-content %}}

{{% collapse-content title="オプション B: pup CLI" level="h4" expanded=false id="option-b-pup-cli" %}}

Homebrew (macOS/Linux) を使用してPup CLIをインストールし、認証を行います：

{{< code-block lang="shell" >}}
brew tap datadog-labs/pack
brew install datadog-labs/pack/pup
pup auth login
{{< /code-block >}}

その他のインストール方法、サポートされているコマンド、および認証オプションについては、[Pup CLI][1]を参照してください。

{{% /collapse-content %}}

{{< whatsnext desc="Datadog MCPサーバーとスキルを使用して構築する：" >}}
    {{< nextlink href="/llm_observability/build_with_ai/mcp_server" >}}MCP サーバー{{< /nextlink >}}
    {{< nextlink href="/llm_observability/build_with_ai/claude_code_skills" >}}Claude Codeスキル{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/cli/
[2]: /ja/llm_observability/build_with_ai/mcp_server