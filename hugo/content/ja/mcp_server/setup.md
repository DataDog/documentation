---
algolia:
  rank: 75
  tags:
  - mcp
  - mcp server
  - setup
aliases:
- /ja/bits_ai/mcp_server/setup/
description: AI エージェントを Datadog MCP Server に接続する方法を学びます。
further_reading:
- link: mcp_server
  tag: ドキュメント
  text: Datadog MCP Server
- link: mcp_server/tools
  tag: ドキュメント
  text: Datadog MCP Server ツール
- link: https://www.datadoghq.com/blog/kubernetes-mcp-tools/
  tag: ブログ
  text: Datadog MCP ツールを使用して Kubernetes リソースを調査する
- link: https://www.datadoghq.com/blog/datadog-ai-agent-integrations/
  tag: ブログ
  text: ネイティブインテグレーションにより Datadog のライブテレメトリを AI エージェントに取り込む
title: Datadog MCP Server を設定する
---
Datadog MCP Server を設定および構成する方法を学びます。これにより、AI 搭載クライアントから直接テレメトリのインサイトを取得し、プラットフォーム機能を管理できます。クライアントを選択します。

{{< tabs >}}
{{% tab "ChatGPT" %}}

ChatGPT に Datadog を接続するには、ChatGPT のアプリディレクトリから [Datadog アプリ][1]をインストールします。アプリは OAuth フローを通じて Datadog 組織で認証を行います。

{{< site-region region="us" >}}
<div class="alert alert-info">Datadog ChatGPT アプリはプレビュー中です。プレビュー中は、US1 のお客様のみが利用可能です。</div>

1. ChatGPT で、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}Apps{{< /ui >}} > {{< ui >}}Browse Apps{{< /ui >}} の順に移動し、**Datadog** を検索します。Datadog アプリが利用できない場合は、組織の ChatGPT 管理者に承認を依頼します。
1. アプリを選択し、{{< ui >}}Connect{{< /ui >}} をクリックし、ガイドに従って設定を行います。
1. プロンプトが表示されたら、OAuth ログインフローを完了してください。
1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。
{{< /site-region >}}

{{< site-region region="us3,us5,eu,ap1,ap2,uk1,gov,gov2" >}}
<div class="alert alert-danger">Datadog ChatGPT アプリは、選択した <a href="/getting_started/site/">Datadog サイト</a>ではサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

[1]: https://chatgpt.com/apps/datadog--preview/asdk_app_69e8c7f174a08191a28b6da96c8062c4
{{% /tab %}}

{{% tab "Claude" %}}

[Datadog コネクタ](https://claude.ai/directory/connectors/datadog)を Claude コネクタディレクトリからインストールします。公式コネクタは、Datadog を Claude (Claude Cowork を含む) に接続するための推奨方法であり、製品内の視覚化のための MCP アプリを含んでいます。以前に Datadog をカスタムコネクタとして追加している場合は、競合を避けるために削除してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Claude で、任意のプロンプトの下部にある {{< ui >}}\+{{< /ui >}} アイコンをクリックし、次に [{{< ui >}}Add Connector{{< /ui >}}] (コネクタを追加) をクリックします。
1. ディレクトリで **Datadog** を見つけて、コネクタを有効にします。
1. プロンプトが表示されたら、OAuth ログインフローを完了してください。
1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

{{% collapse-content title="カスタムコネクタによる手動セットアップ" level="h4" expanded=false id="claude-custom-connector" %}}
ディレクトリコネクタが利用できない場合は、[Datadog サイト](/getting_started/site/)のリモート MCP URL を使用して、[カスタムコネクタ](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)として Datadog を追加できます ({{< region-param key="dd_site_name" >}})。正しい手順については、このドキュメントページの右側にある{{< ui >}}Datadog Site{{< /ui >}}セレクターを使用して、サイトを選択してください。

1. 新しいカスタムコネクタを追加するには、[カスタムコネクタ](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)に関する Claude ヘルプセンターガイドに従います。

1. URL の入力を求められたら、次のように入力します。
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

   [製品特有のツール](#toolsets) を有効にするには、エンドポイント URL の末尾に`toolsets` クエリパラメーターを含めてください。たとえば、この URL は APM および Agent Observability ツール_のみ_を有効にします (すべての一般に利用可能なツールセットを有効にするには `toolsets=all` を使用してください。これは、ツールフィルタリングをサポートするクライアントに最適です)。

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. プロンプトが表示されたら、OAuth ログインフローを完了してください。
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server は、選択した <a href="/getting_started/site/">Datadog サイト</a>ではサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Claude Code" %}}

[公式 Anthropic Plugin Marketplace](https://code.claude.com/docs/en/discover-plugins#official-anthropic-marketplace) から Datadog プラグインをインストールします。プラグインは、Datadog MCP Server をバンドルされたスキルでパッケージ化し、新しいプラグインバージョンがリリースされると自動的に更新を行います。詳細については、[プラグインリポジトリ](https://github.com/datadog-labs/claude-code-plugin)を参照してください。

**注**: 以前に手動で Datadog MCP Server をインストールした場合は、競合を避けるために Claude Code 構成から削除してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Datadog プラグインをインストールします。
    <pre><code>/plugin install datadog@claude-plugins-official</code></pre>

1. 初回設定では、`/ddsetup` を実行するか、Datadog 関連プロンプトを入力します。セットアップ中に、[Datadog サイト](/getting_started/site/)を選択し、OAuth ログインを完了します。または、Claude Code を起動する前に、MCP サーバードメイン (オプションで Datadog API およびアプリケーションキー) を環境変数として設定します。

1. `/ddtoolsets` を実行して、[製品固有の MCP ツール](#toolsets)のグループを有効または無効にします。

1. 構成を変更した後は `/reload-plugins` を実行し、`/plugin` を開いて Datadog プラグインを選択することで再認証します。

1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

<div class="alert alert-info">使用可能なすべてのスラッシュコマンドと構成オプションについては、<a href="https://github.com/datadog-labs/claude-code-plugin">プラグインリポジトリ</a>を参照してください。</div>

{{% collapse-content title="手動 MCP サーバー構成" level="h4" expanded=false id="claudecode-manual" %}}
プラグインが使用できない場合は、Claude Code を直接地域の [Datadog サイト](/getting_started/site/)の MCP サーバーエンドポイントに向けてください。選択したエンドポイント ({{< region-param key="dd_site_name" >}}):<code>{{< region-param key="mcp_server_endpoint" >}}</code>。

1. ターミナルで実行:
    <pre><code>claude mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   または、`~/.claude.json` に追加します。
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
         }
       }
    }</code></pre>

1. [製品特有のツール](#toolsets) を有効にするには、エンドポイント URL の末尾に `toolsets` クエリパラメーターを含めてください。たとえば、この URL は APM および Agent Observability ツール_のみ_を有効にします (すべての一般に利用可能なツールセットを有効にするには `toolsets=all` を使用してください。これは、ツールフィルタリングをサポートするクライアントに最適です)。

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

<div class="alert alert-info">リモート認証が利用できない場合は、<a href="#local-binary-authentication">ローカルバイナリ認証</a>を代わりに使用してください。</div>
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">選択したサイトでは Datadog MCP Server はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>

{{< /site-region >}}

{{% /tab %}}

{{% tab "Codex" %}}

AI エージェントを地域の [Datadog サイト][1]の MCP サーバーエンドポイントに向けてください。正しい手順については、このドキュメントページの右側にある{{< ui >}}Datadog Site{{< /ui >}}セレクターを使用して、サイトを選択してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
選択したエンドポイント ({{< region-param key="dd_site_name" >}}):<code>{{< region-param key="mcp_server_endpoint" >}}</code>。

`~/.codex/config.toml`Datadog MCP Server を HTTP トランスポートとサイトのエンドポイント URL で追加するには、1.  (または Codex CLI 構成ファイル) を編集します。例:

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

   [製品固有のツール](#toolsets)を有効にするには、`config.toml` ファイル内の URL の後の行に `X-Datadog-MCP-Toolsets` ヘッダーを定義します。たとえば、このヘッダーは APM および Agent Observability ツール_のみ_を有効にします (すべての一般に利用可能なツールセットを有効にするには `X-Datadog-MCP-Toolsets = "all"` を使用してください。これは、ツールフィルタリングをサポートするクライアントに最適です)。

   <pre><code>http_headers = { "X-Datadog-MCP-Toolsets" = "apm,llmobs" }</code></pre>

1. Datadog MCP Server にログインします。

   ```shell
   codex mcp login datadog
   ```

   これにより、OAuth フローを完了するためにブラウザが開きます。Codex は、トークンが期限切れになるまで再度ログインする必要がないように、取得した資格情報を保存します。

1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

<div class="alert alert-info">この <a href="https://github.com/openai/plugins/tree/main/plugins/datadog">Codex プラグイン (プレビュー)</a> は、US1 地域の Codex デスクトップアプリでのみ使用できます。インストールするには、<a href="?tab=chatgpt">ChatGPT アプリの手順</a>を使用してください。ChatGPT アプリをインストールすると、Codex プラグインも自動的に含まれます。
</div>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトでは Datadog MCP Server はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

[1]: /ja/getting_started/site/
{{% /tab %}}

{{% tab "Copilot CLI" %}}

[`awesome-copilot`](https://awesome-copilot.github.com/) プラグインマーケットプレイスから Datadog プラグインをインストールします。プラグインは、Datadog MCP Server をバンドルされたスキルでパッケージ化し、新しいプラグインバージョンがリリースされると自動的に更新を行います。詳細については、Datadog の [copilot-plugin](https://github.com/datadog-labs/copilot-plugin) リポジトリを参照してください。

**注**: 以前に手動で Datadog MCP Server をインストールした場合は、競合を避けるために、プラグインをインストールする前に Copilot の構成から削除してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Datadog プラグインをインストールします。
    <pre><code>copilot plugin install datadog@awesome-copilot</code></pre>

1. 初回設定では、`/ddsetup` を実行するか、Datadog 関連プロンプトを入力します。セットアップ中に、[Datadog サイト](/getting_started/site/)を選択し、OAuth ログインを完了します。または、Copilot を起動する前に、MCP サーバードメイン (オプションで Datadog API およびアプリケーションキー) を環境変数として設定します。

1. `/ddtoolsets` を実行して、[製品固有の MCP ツール](#toolsets)のグループを有効または無効にします。

1. 構成を変更した後は、`copilot` を再起動し、Datadog MCP Server の再認証を行ってください。

1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

<div class="alert alert-info">使用可能なすべてのスラッシュコマンドと構成オプションについては、<a href="https://github.com/datadog-labs/copilot-plugin">copilot-plugin</a> リポジトリを参照してください。</div>

{{% collapse-content title="手動 MCP サーバー構成" level="h4" expanded=false id="copilot-manual" %}}
プラグインが使用できない場合は、Copilot をリージョン別の [Datadog サイト](/getting_started/site/)の MCP サーバーエンドポイントに直接向けてください。選択したエンドポイント ({{< region-param key="dd_site_name" >}}):<code>{{< region-param key="mcp_server_endpoint" >}}</code>。

1. ターミナルで実行:
    <pre><code>copilot mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   または、`~/.copilot/mcp-config.json` に追加します。
    <pre><code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
         }
       }
    }</code></pre>

1. [製品特有のツール](#toolsets) を有効にするには、エンドポイント URL の末尾に `toolsets` クエリパラメーターを含めてください。たとえば、この URL は APM および Agent Observability ツール_のみ_を有効にします (すべての一般に利用可能なツールセットを有効にするには `toolsets=all` を使用してください。これは、ツールフィルタリングをサポートするクライアントに最適です)。

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">選択したサイトでは Datadog MCP Server はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>

{{< /site-region >}}

{{% /tab %}}

{{% tab "Cursor" %}}

[Datadog プラグイン][1]を Cursor Marketplace からインストールします。このプラグインには Datadog MCP Server などのリソースが含まれています。

**注**: 以前に手動で Datadog MCP Server をインストールした場合は、競合を避けるために IDE の設定から削除してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. プラグインは Cursor Marketplace から、または Cursor 内からインストールできます。
   - Cursor Marketplace から [Datadog プラグイン][1]を開き、[{{< ui >}}Add to Cursor{{< /ui >}}] をクリックします。
   - Cursor で {{< ui >}}Cursor Settings{{< /ui >}} > {{< ui >}}Plugins{{< /ui >}} に移動し、Datadog プラグインを検索して [{{< ui >}}Add to Cursor{{< /ui >}}] をクリックします。

1. プラグインをインストールしたら、エージェントチャットに `/ddsetup` と入力して初回セットアップをします。
1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

[1]: https://cursor.com/marketplace/datadog
[2]: /ja/ide_plugins/vscode/?tab=cursor#installation
[3]: /ja/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトでは Datadog MCP Server はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

[1]: https://cursor.com/marketplace/datadog
{{% /tab %}}

{{% tab "Devin" %}}

Devin の MCP Marketplace から Datadog MCP Server を有効にすることにより、それを接続します。正しい手順については、このドキュメントページの右側にある{{< ui >}}Datadog Site{{< /ui >}}セレクターを使用して、サイトを選択してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Devin で、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Marketplace{{< /ui >}} の順に移動し、`Datadog` を検索します。
1. {{< ui >}}Server URL{{< /ui >}} のための Datadog サイトを選択してください。選択するサイトの例 ( {{< region-param key="dd_site_name" code="true" >}})。
1. Datadog API とアプリケーションキーを入力します。
1. サーバーをインストールして有効にし、プロンプトに従って OAuth ログインフローを完了します。
1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

<div class="alert alert-info">製品固有のツールセットを使用するには、Devin で<a href="https://docs.devin.ai/work-with-devin/mcp#setting-up-a-custom-mcp-server">カスタム MCP サーバー</a>を設定し、 <code>toolsets</code> クエリをエンドポイント URL の末尾に含めてください。詳細については、<a href="#toolsets">ツールセット</a>を参照してください。
</div>

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトでは Datadog MCP Server はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Gemini CLI" %}}

AI エージェントを地域の [Datadog サイト][1]の MCP サーバーエンドポイントに向けてください。正しい手順については、このドキュメントページの右側にある{{< ui >}}Datadog Site{{< /ui >}}セレクターを使用して、サイトを選択してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
選択したエンドポイント ({{< region-param key="dd_site_name" >}}):<code>{{< region-param key="mcp_server_endpoint" >}}</code>)。

1. ターミナルで実行:
    <pre><code>gemini mcp add --transport http datadog {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   または、`~/.gemini/settings.json` に追加します。
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "httpUrl": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. [製品特有のツール](#toolsets) を有効にするには、エンドポイント URL の末尾に `toolsets` クエリパラメーターを含めてください。たとえば、この URL は APM および Agent Observability ツール_のみ_を有効にします (すべての一般に利用可能なツールセットを有効にするには `toolsets=all` を使用してください。これは、ツールフィルタリングをサポートするクライアントに最適です)。

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

<div class="alert alert-info">リモート認証が利用できない場合は、<a href="#local-binary-authentication">ローカルバイナリ認証</a>を代わりに使用してください。</div>

[1]: /ja/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトでは Datadog MCP Server はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

[1]: /ja/getting_started/site/
{{% /tab %}}

{{% tab "Goose" %}}

AI エージェントを地域の [Datadog サイト][3]の MCP サーバーエンドポイントに向けてください。正しい手順については、このドキュメントページの右側にある{{< ui >}}Datadog Site{{< /ui >}}セレクターを使用して、サイトを選択してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
選択したエンドポイント ({{< region-param key="dd_site_name" >}}):<code>{{< region-param key="mcp_server_endpoint" >}}</code>)。

1. 次のいずれかの方法を使用して、Goose に Datadog MCP Server を追加します。
   - **ワンクリックインストール (推奨):** Datadog MCP Server を使用します {{< region-param key="goose_mcp_install_deeplink" link="true" text="install deeplink" >}})。
   - **手動設定:** このセクションに記載されているエンドポイントをストリーミング可能 HTTP サーバー URL として使用し、Goose で [MCP サーバーを追加する][2]ための手順に従います。設定を直接編集するには、`~/.config/goose/config.yaml` を修正します。

1. [製品固有のツール][1]を有効にするには、エンドポイント URL の末尾に `toolsets` クエリパラメーターを含めます。たとえば、この URL で有効になるのは、APM と Agent Observability のツール_のみ_です。

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

    To enable all generally available toolsets, use `toolsets=all`. This works best for clients that support tool filtering.

1. 初回セッション起動時に認証を求められたら、Datadog アカウントを選択します。

1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

[1]: #toolsets
[2]: https://goose-docs.ai/docs/getting-started/using-extensions#mcp-servers
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトでは Datadog MCP Server はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

[3]: /ja/getting_started/site/
{{% /tab %}}

{{% tab "Grok Build" %}}

Grok Build プラグインマーケットプレイスから Datadog プラグインをインストールします。プラグインは、Datadog MCP Server をパッケージ化し、新しいプラグインバージョンがリリースされると自動的に更新を行います。詳細については、「[プラグインマーケットプレイスリポジトリ][1]」を参照してください。

**注**: 以前に手動で Datadog MCP Server をインストールした場合は、競合を避けるために Grok Build 構成から削除してください。

[1]: https://github.com/xai-org/plugin-marketplace

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Grok Build で `/marketplace` と入力して、マーケットプレイスカタログを開きます。xAI Official の下で、Datadog プラグインを見つけてインストールします。

1. [**MCP Servers**] タブを開くか、`/mcps` と入力します。[**Plugin: datadog**] の下で [**datadog-grok**] を見つけ、[`i`] を押して認証します。[Datadog サイト][2]を選択し、OAuth ログインフローを完了します。

1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

[2]: /ja/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトでは Datadog MCP Server はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "JetBrains IDE" %}}

JetBrains は、さまざまな IDE 向けに [Junie][1] および [AI Assistant][2] プラグインを提供しています。GitHub は [Copilot][4] プラグインを提供しています。また、多くの開発者は IDE と一緒に Claude Code、Codex、または Gemini CLI などのエージェント CLI を使用しています。

プラグインを地域の [Datadog サイト][3]の MCP サーバーエンドポイントに向けてください。正しい手順については、このドキュメントページの右側にある{{< ui >}}Datadog Site{{< /ui >}}セレクターを使用して、サイトを選択してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
選択したエンドポイント ({{< region-param key="dd_site_name" >}}):<code>{{< region-param key="mcp_server_endpoint" >}}</code>)。

{{% collapse-content title="Junie" level="h4" expanded=false id="jetbrains-junie" %}}
1. {{< ui >}}Tools{{< /ui >}} > {{< ui >}}Junie{{< /ui >}} > {{< ui >}}MCP Settings{{< /ui >}} の順に移動し、次のブロックを追加します。

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. [製品特有のツール](#toolsets) を有効にするには、エンドポイント URL の末尾に `toolsets` クエリパラメーターを含めてください。たとえば、この URL は APM および Agent Observability ツール_のみ_を有効にします (すべての一般に利用可能なツールセットを有効にするには `toolsets=all` を使用してください。これは、ツールフィルタリングをサポートするクライアントに最適です)。

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. OAuth を通じてログインするように求められます。設定のステータスインジケーターは、接続が成功すると緑のチェックマークを表示します。

1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

{{% /collapse-content %}}

{{% collapse-content title="JetBrains AI Assistant" level="h4" expanded=false id="jetbrains-ai-assistant" %}}
1. {{< ui >}}Tools{{< /ui >}} > {{< ui >}}AI Assistant{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} の順に移動し、次のブロックを追加します。

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}",
          "headers": {
            "DD_API_KEY": "&lt;YOUR_API_KEY&gt;",
            "DD_APPLICATION_KEY": "&lt;YOUR_APP_KEY&gt;"
          }
        }
      }
    }
    </code></pre>

1. [製品特有のツール](#toolsets) を有効にするには、エンドポイント URL の末尾に `toolsets` クエリパラメーターを含めてください。たとえば、この URL は APM および Agent Observability ツール_のみ_を有効にします (すべての一般に利用可能なツールセットを有効にするには `toolsets=all` を使用してください。これは、ツールフィルタリングをサポートするクライアントに最適です)。

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. 設定のステータスインジケーターは、接続が成功すると緑のチェックマークを表示します。

1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

{{% /collapse-content %}}

{{% collapse-content title="GitHub Copilot" level="h4" expanded=false id="github-copilot" %}}
1. {{< ui >}}Tools{{< /ui >}} > {{< ui >}}GitHub Copilot{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} の順に移動し、次のブロックを追加します。

    <pre><code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. [製品特有のツール](#toolsets) を有効にするには、エンドポイント URL の末尾に `toolsets` クエリパラメーターを含めてください。たとえば、この URL は APM および Agent Observability ツール_のみ_を有効にします (すべての一般に利用可能なツールセットを有効にするには `toolsets=all` を使用してください。これは、ツールフィルタリングをサポートするクライアントに最適です)。

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. エディターに表示される {{< ui >}}Start{{< /ui >}} 要素をクリックしてサーバーを起動します。OAuth を通じてログインするように求められます。

1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

{{% /collapse-content %}}

{{% collapse-content title="Agent CLI" level="h4" expanded=false id="jetbrains-agent-clis" %}}
多くの開発者は、JetBrains IDE と一緒に Claude Code、Codex、または Gemini CLI などのエージェント CLI を使用しています。これらの CLI ツールの設定を参照してください。
- [Claude Code][4]
- [Codex][5]
- [Gemini CLI][6]

[JetBrains IDE 用の Datadog プラグイン][3]は、これらのエージェント CLI と統合されています。中断のない体験のために、Datadog MCP Server を設定する際にプラグインを同時にインストールしてください。

[3]: /ja/ide_plugins/idea/
[4]: /ja/mcp_server/setup/?tab=claudecode
[5]: /ja/mcp_server/setup/?tab=codex
[6]: /ja/mcp_server/setup/?tab=geminicli
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトでは Datadog MCP Server はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

[1]: https://plugins.jetbrains.com/plugin/26104-junie-the-ai-coding-agent-by-jetbrains
[2]: https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant
[3]: /ja/getting_started/site/
[4]: https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer
{{% /tab %}}

{{% tab "Kiro" %}}

AI エージェントを地域の [Datadog サイト][3]の MCP サーバーエンドポイントに向けてください。正しい手順については、このドキュメントページの右側にある{{< ui >}}Datadog Site{{< /ui >}}セレクターを使用して、サイトを選択してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
選択したエンドポイント ({{< region-param key="dd_site_name" >}}):<code>{{< region-param key="mcp_server_endpoint" >}}</code>)。

1. 次の内容を [Kiro MCP 設定ファイル][2]に追加します (`~/.kiro/settings/mcp.json` はユーザー範囲の設定用)。

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. [製品特有のツール](#toolsets) を有効にするには、エンドポイント URL の末尾に `toolsets` クエリパラメーターを含めてください。たとえば、この URL は APM および Agent Observability ツール_のみ_を有効にします (すべての一般に利用可能なツールセットを有効にするには `toolsets=all` を使用してください。これは、ツールフィルタリングをサポートするクライアントに最適です)。

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

[2]: https://kiro.dev/docs/mcp/configuration/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトでは Datadog MCP Server はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

[3]: /ja/getting_started/site/
{{% /tab %}}

{{% tab "OpenCode" %}}

公式の [Datadog OpenCode Plugin][2] (プレビュー中) を使用して、[OpenCode][3] を Datadog MCP Server に接続します。プラグインは、`opencode.json` 内の MCP サーバーエントリを作成および維持し、エージェントがセットアップ、サイト変更、および [ツールセット](#toolsets) の選択を処理するために使用する `ddsetup`、`ddconfig`、および `ddtoolsets` のツールを公開します。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}

1. プラグインを `opencode.json` 構成ファイルに追加します。このファイルが存在しない場合は、それを作成します。

   <pre><code>{
     "plugin": ["@datadog/opencode-plugin"]
   }</code></pre>

    If a `plugin` array already exists, add `"@datadog/opencode-plugin"` to it.

    If you previously configured the Datadog MCP Server manually in `opencode.json`, remove or disable that entry to avoid conflicts with the plugin.

1. OpenCode を再起動します。パッケージは起動時に npm から取得されます。

1. `ddsetup` を実行するようエージェントに依頼します。プラグインにより、サイト選択が処理されます。

1. MCP サーバーを有効にするためにもう一度 OpenCode を再起動し、プロンプトが表示されたら OAuth ログインフローを完了します。

1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

1. [製品固有のツール](#toolsets)を有効にするには、`ddtoolsets` を実行するようエージェントに依頼します。

セットアップ後、`ddconfig` を実行するようエージェントに依頼して、Datadog サイトを変更するか、接続のトラブルシューティングを実行します。

{{% collapse-content title="手動構成" level="h4" expanded=false id="opencode-manual" %}}
プラグインなしで MCP サーバーを構成するには、`opencode.json` 構成ファイルに次の内容を追加します。

選択したエンドポイント ({{< region-param key="dd_site_name" >}}):<code>{{< region-param key="mcp_server_endpoint" >}}</code>)。

<pre><code>{
  "mcp": {
    "datadog": {
      "type": "remote",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "enabled": true
    }
  }
}</code></pre>

[製品特有のツール](#toolsets) を有効にするには、エンドポイント URL の末尾に`toolsets` クエリパラメーターを含めてください。たとえば、この URL で有効になるのは、APM と Agent Observability のツール_のみ_です。

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

一般に利用可能なすべてのツールセットを有効にするには、`toolsets=all` を使用します。これは、ツールフィルタリングをサポートするクライアントに最適です。
{{% /collapse-content %}}

[1]: /ja/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトでは Datadog MCP Server はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

[2]: https://github.com/datadog-labs/opencode-plugin
[3]: https://opencode.ai/
{{% /tab %}}

{{% tab "VS Code" %}}

Copilot の場合は、マーケットプレイスから [Datadog Copilot プラグイン][2]をインストールします。詳細については、[Copilot CLI][3] の手順を参照してください。

その他の拡張機能や CLI については、Datadog の [Cursor および VS Code 拡張機能][1] が Datadog MCP Server の構成アシスタントを提供します。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. [Datadog 拡張機能][2]をインストールします。既に拡張機能がインストールされている場合は、最新バージョンであることを確認してください。
1. Datadog アカウントにサインインします。
1. **IDE を再起動します。**
1. {{< ui >}}Datadog: Open MCP Configuration Assistant{{< /ui >}} を実行し、ガイダンスに従って Datadog MCP Server を構成します。
1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

Datadog MCP Server の接続は、Datadog 拡張機能ではなく、Copilot (または使用しているエージェント) によって管理されます。そのため、Datadog MCP Server は、拡張機能とは独立して承認する必要があります。

[2]: /ja/ide_plugins/vscode/?tab=vscode#installation
[3]: /ja/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトでは Datadog MCP Server はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

[1]: /ja/ide_plugins/vscode/
[2]: https://awesome-copilot.github.com/plugins/#file=plugins%2Fdatadog
[3]: /ja/mcp_server/setup/?tab=copilot-cli
{{% /tab %}}

{{% tab "Warp" %}}

[Warp][1] は、組み込みの MCP サポートを持つエージェント端末です。Warp エージェントを地域の [Datadog サイト][2]の MCP サーバーエンドポイントに向けてください。正しい手順については、このドキュメントページの右側にある{{< ui >}}Datadog Site{{< /ui >}}セレクターを使用して、サイトを選択してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
選択したエンドポイント ({{< region-param key="dd_site_name" >}}):<code>{{< region-param key="mcp_server_endpoint" >}}</code>)。

1. Warp アプリで、{{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Servers{{< /ui >}} の順に移動し、{{< ui >}}+ Add{{< /ui >}} をクリックします。

1. 次の構成を貼り付けます。

    <pre><code>{
      "Datadog": {
        "url": "{{< region-param key="mcp_server_endpoint" >}}"
      }
    }</code></pre>

    To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Datadog サーバーで {{< ui >}}Start{{< /ui >}} をクリックします。Warp は、OAuth ログインフローを完了するためにブラウザを開きます。資格情報はデバイスに安全に保存され、将来のセッションで再利用されます。

1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトでは Datadog MCP Server はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

[1]: https://www.warp.dev/
[2]: /ja/getting_started/site/
{{% /tab %}}

{{% tab "その他" %}}

ほとんどの他の[サポートされているクライアント](#supported-clients)については、リモート認証のためのこれらの指示を使用してください。Cline またはリモート認証が信頼できない、または利用できない場合は、[ローカルバイナリ認証](#local-binary-authentication)を使用してください。

AI エージェントを地域の [Datadog サイト][1]の MCP サーバーエンドポイントに向けてください。正しい手順については、このドキュメントページの右側にある{{< ui >}}Datadog Site{{< /ui >}}セレクターを使用して、サイトを選択してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
選択したエンドポイント ({{< region-param key="dd_site_name" >}}):<code>{{< region-param key="mcp_server_endpoint" >}}</code>)。

1. HTTP トランスポートとサイトのエンドポイント URL を使用して、クライアントの設定ファイルに Datadog MCP Server を追加します。例:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. [製品特有のツール](#toolsets) を有効にするには、エンドポイント URL の末尾に `toolsets` クエリパラメーターを含めてください。たとえば、この URL は APM および Agent Observability ツール_のみ_を有効にします (すべての一般に利用可能なツールセットを有効にするには `toolsets=all` を使用してください。これは、ツールフィルタリングをサポートするクライアントに最適です)。

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Datadog リソースにアクセスするために必要な[権限](#required-permissions)があることを確認してください。

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトでは Datadog MCP Server はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>

{{< /site-region >}}

[1]: /ja/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## ツールセット {#toolsets}

Datadog MCP Server は、_ツールセット_をサポートしており、必要な [MCP ツール][49]のみを使用できるようにし、貴重なコンテキストウィンドウのスペースを節約します。ツールセットを使用するには、MCP サーバーに接続する際にエンドポイント URL に`toolsets`クエリパラメーターを含めてください ([リモート認証](#authentication)のみ)。`toolsets=all` を使用して、一般に利用可能なすべてのツールセットを一度に有効にします。

<div class="alert alert-info">Codex CLI の場合は、 <code>X-Datadog-MCP-Toolsets</code> <a href="?tab=codex">Codex セットアップ手順</a>で説明されているヘッダーを使用してください。ここで説明されているクエリパラメーターは使用しないでください。</div>

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
たとえば、選択した [Datadog サイト][17]に基づいて ({{< region-param key="dd_site_name" >}}):

- コアツールのみを取得します (`toolsets` が指定されていない場合はこれがデフォルトです)。
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Synthetic Testing 関連のツールのみを取得します。
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- コア、Synthetic Testing、および Software Delivery ツールを取得します。
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

- 一般に利用可能なすべてのツールを取得します。
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all</code></pre>

<div class="alert alert-info">すべてのツールセットを有効にすると、AI クライアントに送信されるツール定義の数が増加し、コンテキストウィンドウのスペースを消費します。<code>toolsets=all</code> ツールフィルタリングをサポートするクライアント (例: Claude Code) で最適に動作します。</div>

[17]: /ja/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

### 特定のツールを削除する {#omit-specific-tools}

最終的なツールリストから特定のツールを削除するには、`omit_tools` クエリパラメーターを使用します。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
選択したサイトの例 ({{< region-param key="dd_site_name" >}}):

- デフォルトセットからツールを削除する:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?omit_tools=search_datadog_logs,search_datadog_spans</code></pre>

- ツールセットを選択してから 1 つのツールを削除する:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,software-delivery&omit_tools=search_datadog_incidents</code></pre>

- 一般的に利用可能なツールセットから開始してから書き込みツールを削除する:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all&omit_tools=create_datadog_notebook,edit_datadog_notebook</code></pre>
{{< /site-region >}}

ツール名をカンマ区切りのリストとして提供します。両方のパラメーターが存在する場合、サーバーはまず `toolsets` を解決し、その後 `omit_tools` で一致するツールを削除します。`omit_tools` に不明なツール名が含まれている場合、サーバーは警告を表示し、処理を続行します。

### 利用可能なツールセット {#available-toolsets}

これらのツールセットは一般に利用可能です。[Datadog MCP Server ツール][49]を参照して、ツールセットごとに整理された利用可能なツールの完全なリファレンスと例のプロンプトを確認してください。

- `core`: ログ、メトリクス、トレース、ダッシュボード、モニター、インシデント、ホスト、サービス、イベント、およびノートブックのデフォルトツールセット
- `alerting`: モニターの検証と作成、モニターグループの検索、モニターテンプレートの取得、モニターのカバレッジ分析、および SLO の検索のためのツール
- `audit-trail`: Audit Trail イベントの検索や取得、および Audit Trail 検索クエリの作成など、[Audit Trail][70] 用のツール
- `code-exec`: マルチシグナル調査とアドホックデータ探索を 1 回の呼び出しで行うための、エージェントが作成した TypeScript を Datadog API への直接アクセスを持つ Datadog 管理のサンドボックスで実行する単一のツール
- `cost`: 推定される 1 日あたりの削減可能額順に、コスト削減の推奨事項を一覧表示する [Cloud Cost Management][63] 用のツール
- `dashboards`: [ダッシュボード][46]の取得、作成、更新、削除のためのツール。ウィジェットスキーマのリファレンスと検証も含む
- `data-observability`: [Data Observability][69] 用のツール。データカタログ検索、リネージ分析、データ品質監視、およびデータウェアハウスや Spark ジョブのコストとパフォーマンスに関する推奨事項を含む
- `dbm`: [Database Monitoring][33] と対話するためのツール
- `ddsql`: インフラストラクチャーリソース、ログ、メトリクス、RUM、スパン、その他の Datadog データソースをサポートする SQL 方言である [DDSQL][44] を使用して Datadog データをクエリするためのツール
- `error-tracking`: Datadog [Error Tracking][32] と対話するためのツール
- `feature-flags`: [feature flags][35] を管理するためのツール、フラグとその環境の作成、リスト表示、更新を含む
- `kubernetes`: すべてのクラスターの中から [Kubernetes][51] リソースを検索し、説明し、マニフェストを取得するためのツール
- `llmobs`: [Agent Observability][36] のスパンと実験を検索および分析するためのツール
- `networks`: [Cloud Network Monitoring][37] 分析および [Network Device Monitoring][38] のためのツール
- `notebooks`: [ノートブック][54] 用の拡張ツール。`core` ツールセットに含まれるノートブックツールを拡張する
- `onboarding`: エージェンティックなオンボーディングツールによる Datadog のセットアップと構成のガイド
- `product-analytics`: [Product Analytics][41] クエリと対話するためのツール
- `profiling`: [Continuous Profiler][58] データの発見、探索、分析のためのツール
- `reference-tables`: [リファレンステーブル][48]を管理するためのツール。テーブルのリスト表示、行の読み取り、行の追加、クラウドストレージからのテーブル作成を含む
- `rum`: [Real User Monitoring][57] 用のツール。アプリケーションの解決、パフォーマンスの要約、集約されたインサイトの提示、運用の監視と管理、メトリクスの探索、保持フィルターの管理、カスタム RUM メトリクスの管理などを含む
- `security`: コードセキュリティスキャンと[セキュリティシグナル][39]および[セキュリティファインディング][40]を検索するためのツール
- `software-delivery`: Software Delivery ([CI Visibility][30] および [Test Optimization][31]) と対話するためのツール
- `synthetics`: Datadog の [Synthetic テスト][29]と対話するためのツール
- `widgets`: [ダッシュボード][46]および[ノートブック][54]ウィジェットの視覚化、検証、タイプ変換のためのツール。
- `workflows`: [Workflow Automation][43] のためのツール。エージェント使用のためのワークフローのリスト表示、検査、実行、構成を含む

### プレビュー版ツールセット {#preview-toolsets}

これらのツールセットはプレビュー版であり、`all` エイリアスには含まれていません。利用するには、それぞれの名前を明示的に指定する必要があります。アクセス要件はツールセットによって異なります (下記参照)。Product Preview フォームが記載されている場合は、そのフォームから登録するか、[Datadog サポート][47]に連絡してアクセスをリクエストしてください。
- `apm`: ([サインアップ][45]) 詳細な [APM][34] トレース分析、スパン検索、Watchdog インサイト、パフォーマンス調査のためのツール
- `cases`: [Case Management][42] 用のツール。ケースの作成、検索、更新、プロジェクトの管理、および Jira の課題のリンクを含む。サインアップやアクセスリクエストは不要。
- `remote-actions`: ([サインアップ][62]) ファイルの読み取り、ディレクトリのリストの取得、および Agent を通してインスツルメントされたホスト上で安全な読み取り専用シェルコマンドを直接実行する機能を含むホスト上診断用ツール

## サポートされているクライアント {#supported-clients}

| クライアント | 開発者 | ノート |
|--------|------|------|
| [ChatGPT][59] | OpenAI | プレビュー中で、US1 のお客様のみが利用可能です。|
| [Cursor][3] | Cursor | Datadog [Cursor プラグイン][15]を推奨します。|
| [Claude Code][4] | Anthropic | Datadog [Claude Code プラグイン][55]を推奨します。|
| [Claude][19] | Anthropic | Datadog [Claude コネクタ][56]を推奨します。Claude Cowork が含まれます。|
| [Codex CLI][6] | OpenAI | |
| [Copilot CLI][64] | Microsoft | Datadog [Copilot プラグイン][16]を推奨します。|
| [Gemini CLI][50] | Google | |
| [Grok Build][71] | SpaceXAI | Datadog [Grok Build プラグイン][72]を推奨します。|
| [Warp][28] | Warp | |
| [VS Code][7] | Microsoft | Datadog [Copilot プラグイン][16]を推奨します。|
| [JetBrains IDEs][18] | JetBrains | [Datadog プラグイン][18]を推奨します。|
| [Kiro][9]、[Kiro CLI][10] | Amazon Web Services | |
| [Goose][8] | Agentic AI Foundation | |
| [OpenCode][52] | SST | Datadog [OpenCode プラグイン][53]を推奨します。|
| [Cline][11] | Various | 上記の {{< ui >}}Other{{< /ui >}} タブを参照してください。リモート認証が信頼できない場合は、Cline でローカルバイナリ認証を使用してください。|

<div class="alert alert-info">Datadog MCP Server は大規模な開発中であり、追加のサポートクライアントが利用可能になる場合があります。</div>

## 必要な権限 {#required-permissions}

MCP サーバーツールには、以下の [Datadog ユーザーロール権限][22]が必要です。

| 権限 | |必須
|------------|-------------|
| <code style="white-space:nowrap">mcp_read</code> | Datadog からデータを読み取るツール (例: モニターのクエリ、ログの検索、ダッシュボードの取得) |
| <code style="white-space:nowrap">mcp_write</code> | Datadog 内のリソースを作成または変更するツール (例: モニターの作成、ホストのミュート) |

`mcp_read` または `mcp_write` に加えて、ユーザーは基盤となるリソースの標準 Datadog 権限が必要です。たとえば、モニターを読み取る MCP ツールを使用するには、`mcp_read` と[モニター読み取り][24]権限の両方が必要です。リソースレベルの権限の完全なリストについては、[Datadog ロール権限][25]を参照してください。

{{< ui >}}Datadog Standard Role{{< /ui >}} を持つユーザーは、デフォルトで両方の MCP サーバー権限を持ちます。組織が[カスタムロール][23]を使用している場合は、権限を手動で追加してください。
1. 管理者として [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Roles{{< /ui >}}][26] に移動し、更新するロールをクリックします。
1. {{< ui >}}Edit Role{{< /ui >}} (鉛筆アイコン) をクリックします。
1. 権限リストの下で、{{< ui >}}MCP Read{{< /ui >}} と {{< ui >}}MCP Write{{< /ui >}} のチェックボックスを選択します。
1. ロールに必要な他のリソースレベルの権限を選択します。
1. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

組織の管理者は、[組織設定][27]からグローバル MCP アクセスと書き込み機能を管理できます。

### ネットワークアクセスを制限する {#restrict-network-access}

Datadog MCP Server への接続を許可するネットワークを制御するには、[IP 許可リスト][68]を有効にします。これにより、必要な権限を持つユーザーであっても、承認されていないオリジンからの MCP サーバーへの接続を防止できます。

## 認証 {#authentication}

ほとんどのユーザーにとって、OAuth 2.0 は推奨される認証方法です。MCP クライアントはセットアップ時にこの認証を処理します。サーバー環境や CI 環境など、OAuth フローを完了できない場合にのみ、以下のヘッダーベースの認証方法を使用してください。

### OAuth 2.0 (推奨) {#oauth-20-recommended}

ほとんどのクライアントは、セットアップ中に OAuth 2.0 フローを自動的に完了します。手順については、このページ上部でクライアントを選択してください。OAuth を使用する場合、有効期限の長い認証情報を直接管理する必要はありません。詳細については、「[MCP 認可仕様][14]」を参照してください。

### 個人用アクセストークンまたはサービスアクセストークン{#personal-or-service-access-token}

ヘッダーベースの認証には、Datadog の[個人用アクセストークン (PAT)][66] または[サービスアクセストークン (SAT)][67] を使用することをお勧めします。`Authorization` ヘッダーに Bearer トークンとしてトークンを渡します。API キーは不要です。

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
たとえば、選択した [Datadog サイト][17]に基づいて ({{< region-param key="dd_site_name" >}}):

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "headers": {
          "Authorization": "Bearer &lt;YOUR_ACCESS_TOKEN&gt;"
      }
    }
  }
}
</code></pre>

[17]: /ja/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

個々のユーザーには PAT を、[サービスアカウント][13]には SAT を使用してください。スコープ、トークン管理、その他の認証方法については、[PAT][66] および [SAT][67] のドキュメントを参照してください。

### API キーとアプリケーションキー {#api-and-application-keys}

あるいは、Datadog の [API キーとアプリケーションキー][1]を、それぞれ `DD_API_KEY` および`DD_APPLICATION_KEY` HTTP ヘッダーとして指定することも可能です。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
たとえば、選択した [Datadog サイト][17]に基づいて ({{< region-param key="dd_site_name" >}}):

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "headers": {
          "DD_API_KEY": "&lt;YOUR_API_KEY&gt;",
          "DD_APPLICATION_KEY": "&lt;YOUR_APPLICATION_KEY&gt;"
      }
    }
  }
}
</code></pre>

[17]: /ja/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

セキュリティのために、必要な権限のみを持つ[サービスアカウント][13]からスコープが設定された API キーとアプリケーションキーを使用してください。

### OAuth クライアントの追加 {#adding-oauth-clients}

[{{< ui >}}MCP OAuth Redirect URLs{{< /ui >}}] の下にある [{{< ui >}}Organization Preferences{{< /ui >}}][27] で、リダイレクト URL を許可リストに登録できます。

AI エージェントプラットフォームの MCP ディレクトリに Datadog を追加しているパートナーまたはベンダーである場合、関心があるものを Datadog の[テクノロジーパートナーサインアップ][61]から送信してください。

### ローカルバイナリ認証 {#local-binary-authentication}

Cline の場合、またはリモート認証が信頼できない、あるいは利用できない場合、ローカル認証の利用が推奨されます。インストール後、通常は MCP サーバーの更新の恩恵を受けるためにローカルバイナリを更新する必要はありません。ツールはリモートで動作します。

{{% collapse-content title="Datadog MCP Server のローカルバイナリを設定する" level="h4" expanded=false id="mcp-local-binary" %}}

1. Datadog MCP Server バイナリをインストールします (macOS と Linux)。
   ```bash
   curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
   ```
   これにより、バイナリが `~/.local/bin/datadog_mcp_cli` にインストールされます。

   Windows の場合、[Windows バージョン][20]をダウンロードします。

2. `datadog_mcp_cli login` を手動で実行して OAuth ログインフローを実施し、[Datadog サイト][21]を選択します。

3. AI クライアントを設定することにより、`datadog_mcp_cli` をコマンドとして stdio トランスポートを使用するようにします。たとえば、macOS の場合 (`<USERNAME>` を自分の OS ユーザー名に置き換えます):
   ```json
   {
     "mcpServers": {
       "datadog": {
         "type": "stdio",
         "command": "/Users/<USERNAME>/.local/bin/datadog_mcp_cli",
         "args": [],
         "env": {}
       }
     }
   }
   ```

   他のオペレーティングシステムの場合、`command` パスをダウンロードしたバイナリの場所に置き換えます。
   - Linux: `/home/<USERNAME>/.local/bin/datadog_mcp_cli`
   - Windows: `<USERNAME>\bin\datadog_mcp_cli.exe`

   <div class="alert alert-tip">Claude Code の場合は、次のように実行できます。
   <pre><code>claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli</code></pre></div>

4. 構成を適用して MCP サーバーをロードするには、AI クライアントを完全に再起動してください。
{{% /collapse-content %}}

## MCP サーバーへのアクセスをテストする {#test-access-to-the-mcp-server}

1. [MCP インスペクター][2]をインストールします。これは、MCP サーバーのテストとデバッグのための開発者ツールです。

   ```bash
   npx @modelcontextprotocol/inspector
   ```
2. インスペクターの Web UI で、{{< ui >}}Transport Type{{< /ui >}} については {{< ui >}}Streamable HTTP{{< /ui >}} を選択します。
3. {{< ui >}}URL{{< /ui >}} については地域の Datadog サイト用の MCP サーバーエンドポイントを入力します。
   {{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
   例: {{< region-param key="dd_site_name" >}}: <code>{{< region-param key="mcp_server_endpoint" >}}</code>
   {{< /site-region >}}
4. {{< ui >}}Connect{{< /ui >}} をクリックした後、{{< ui >}}Tools{{< /ui >}} > {{< ui >}}List Tools{{< /ui >}} の順に移動します。
5. [利用可能なツール][12]が表示されるかチェックしてください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/api-app-keys/
[2]: https://github.com/modelcontextprotocol/inspector
[3]: https://cursor.com
[4]: https://claude.com/product/claude-code
[5]: https://claude.com/download
[6]: https://chatgpt.com/codex
[7]: https://code.visualstudio.com/
[8]: https://github.com/block/goose
[9]: https://kiro.dev/
[10]: https://kiro.dev/cli/
[11]: https://cline.bot/
[12]: /ja/mcp_server/tools
[13]: /ja/account_management/org_settings/service_accounts/
[14]: https://modelcontextprotocol.io/specification/draft/basic/authorization
[15]: https://cursor.com/marketplace/datadog
[16]: https://awesome-copilot.github.com/plugins/#file=plugins%2Fdatadog
[17]: /ja/getting_started/site/#navigate-the-datadog-documentation-by-site
[18]: /ja/ide_plugins/idea/
[19]: https://claude.ai
[20]: https://coterm.datadoghq.com/mcp-cli/datadog_mcp_cli.exe
[21]: /ja/getting_started/site/
[22]: /ja/account_management/rbac/permissions/#mcp
[23]: /ja/account_management/rbac/?tab=datadogapplication#custom-roles
[24]: /ja/account_management/rbac/permissions/#monitors
[25]: /ja/account_management/rbac/permissions/
[26]: https://app.datadoghq.com/organization-settings/roles
[27]: https://app.datadoghq.com/organization-settings/preferences
[28]: https://www.warp.dev/
[29]: /ja/synthetics/
[30]: /ja/continuous_integration/
[31]: /ja/tests/
[32]: /ja/error_tracking/
[33]: /ja/database_monitoring/
[34]: /ja/tracing/
[35]: /ja/feature_flags/
[36]: /ja/llm_observability/build_with_ai/mcp_server/
[37]: /ja/network_monitoring/cloud_network_monitoring/
[38]: /ja/network_monitoring/devices/
[39]: /ja/security/threats/security_signals/
[40]: /ja/security/misconfigurations/findings/
[41]: /ja/product_analytics
[42]: /ja/service_management/case_management/
[43]: /ja/actions/workflows/
[44]: /ja/ddsql_editor/
[45]: https://www.datadoghq.com/product-preview/apm-mcp-toolset/
[46]: /ja/dashboards/
[47]: /ja/help/
[48]: /ja/reference_tables/
[49]: /ja/mcp_server/tools
[50]: https://github.com/google-gemini/gemini-cli
[51]: /ja/containers/monitoring/kubernetes_explorer/
[52]: https://opencode.ai/
[53]: https://github.com/datadog-labs/opencode-plugin
[54]: /ja/notebooks/
[55]: https://claude.com/plugins/datadog
[56]: https://claude.ai/directory/connectors/datadog
[57]: /ja/real_user_monitoring/
[58]: /ja/getting_started/profiler/
[59]: https://chatgpt.com/
[61]: https://partners.datadoghq.com/s/login/SelfRegister
[62]: https://www.datadoghq.com/product-preview/datadog-agent-mcp/
[63]: /ja/cloud_cost_management/
[64]: https://github.com/features/copilot/cli
[65]: https://awesome-copilot.github.com/plugins/#file=plugins%2Fdatadog
[66]: /ja/account_management/personal-access-tokens/
[67]: /ja/account_management/service-access-tokens/
[68]: /ja/account_management/org_settings/ip_allowlist/
[69]: /ja/data_observability/
[70]: /ja/account_management/audit_trail/
[71]: https://x.ai/build 
[72]: https://github.com/xai-org/plugin-marketplace