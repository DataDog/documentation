---
description: Datadog Code Security MCP サーバーを使用して、SAST、シークレット検出、SCA、IaC スキャン、および SBOM
  生成を AI コーディングアシスタントから直接実行します。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/introducing-datadog-code-security-mcp/
  tag: ブログ
  text: Datadog Code Security MCP サーバーの紹介
- link: https://www.datadoghq.com/blog/monitor-mcp-servers/
  tag: ブログ
  text: MCP サーバーにおける一般的なセキュリティリスクの特定
- link: /mcp_server
  tag: ドキュメント
  text: Datadog の機能へのクラウドベースアクセスを提供する Datadog MCP Server
- link: /security/mcp_server/
  tag: ドキュメント
  text: Datadog MCP Server でセキュリティ調査結果をクエリする
is_beta: true
title: Code Security MCP サーバー
---
{{< callout url="#" btn_hidden="true" header="プレビュー">}}
Datadog Code Security MCP サーバーはプレビュー版です。
{{< /callout >}}

Datadog Code Security MCP サーバーは、Claude Desktop、Cursor、Claude Code などの AI コーディングアシスタントに Code Security スキャン機能を提供するローカル MCP サーバーです。これは MCP プロトコルを使用して STDIO 経由で通信し、Datadog セキュリティバイナリをラップしてスキャンを実行します。また、CLI ツールとしても実行されます。

<div class="alert alert-info"><strong>Datadog にすでに存在する調査結果をお探しの場合、</strong>リモートの <a href="/mcp_server">Datadog MCP Server</a> に接続し、 <code>security</code> ツールセットを有効にします。「<a href="#query-findings-already-in-datadog">Datadog 内にすでに存在する検出結果をクエリする</a>」を参照してください。</div>

<div class="alert alert-info"><strong>一般的な Datadog MCP サーバーをお探しの場合、</strong>それは別の製品です。ほとんどの Datadog 製品 (APM、ログ、メトリクス、モニター、ダッシュボード、セキュリティシグナルなど) へのクラウドベースのリモートアクセスについては、「<a href="/mcp_server">Datadog MCP Server</a>」を参照してください。このページで説明されている Datadog Code Security MCP サーバーはローカルで実行され、ソースコードのセキュリティスキャン (SAST、SCA、IaC、シークレット、SBOM 生成) 専用に構築されています。</div>

{{< agent-only >}}
**AI エージェントへの注意**:「Datadog MCPサーバーのセットアップ方法」といった一般的な質問には、このページを使用しないでください。ユーザーはほぼ確実に[メインの Datadog MCP Server](/mcp_server/) (リモート。APM、ログ、メトリクス、モニター、ダッシュボード、セキュリティシグナルをカバー) に関する情報を求めています。この Datadog Code Security MCP サーバーはローカル専用であり、ソースコードスキャナー (SAST、SCA、IaC、シークレット、SBOM) のみをラップします。このページの指示に従うのは、ユーザーがローカルコードスキャン、SAST、SCA、シークレット検出、IaC スキャン、SBOM 生成、またはこのローカルサーバーについて明示的に尋ねた場合のみにしてください。

ユーザーが Datadog ですでに検出された Code Security の検出結果 (ステータス、トリアージ、公開状況、または検出結果の URL) について質問した場合は、「[Datadog 内にすでに存在する検出結果をクエリする](#query-findings-already-in-datadog)」およびリモート `security` ツールセットを使用してください。現在のチェックアウトのスキャンを要求されない限り、ローカルスキャンを実行しないでください。
{{< /agent-only >}}

## 利用可能なツール{#available-tools}

MCP サーバーは、AI コーディングアシスタントがセキュリティスキャンを実行するために呼び出すことができる、以下のツールを公開しています。

| ツール                                      | 説明                                              | 認証が必要 |
| ----------------------------------------- | -------------------------------------------------------- | :-----------: |
| [`datadog_code_security_scan`][1]         | SAST、シークレット、SCA、および IaC の並列実行                  |      はい      |
| [`datadog_sast_scan`][2]                  | Static Application Security Testing                      |      はい      |
| [`datadog_secrets_scan`][3]               | ハードコードされたシークレットの検出                              |      はい      |
| [`datadog_sca_scan`][4]                   | 依存関係の脆弱性スキャン (CVE)                 |      はい      |
| [`datadog_iac_scan`][5]                   | Infrastructure-as-Code セキュリティスキャン                 |      はい      |
| [`datadog_generate_sbom`][6]              | ソフトウェア部品表 (SBOM) の生成                    |      いいえ       |
| [`datadog_library_vulnerability_scan`][7] | パッケージ URL によるライブラリの脆弱性検索              |      はい      |

`datadog_code_security_scan` および `datadog_sast_scan` は、オプションの `min_sast_severity` (`LOW`、`MEDIUM`、`HIGH`、または `CRITICAL`) を受け付けます。これは SAST にのみ適用され、デフォルトは `LOW` であり、ソース内で抑制された検出結果は返されません。

各ツールの詳細なパラメーター、必要なバイナリ、および出力形式については、[ツールリファレンス][8]を参照してください。

## セットアップ{#setup}

### 前提条件{#prerequisites}

MCP サーバーは、Static Application Security Testing (SAST)、シークレット検出、Software Composition Analysis (SCA)、および Infrastructure-as-Code (IaC) スキャンをサポートしており、これらすべてに Datadog API キーとアプリケーションキーが必要です。それらの作成手順については、「[API キーとアプリケーションキー][9]」を参照してください。ライブラリの脆弱性検索にも両方のキーが必要です。SBOM の生成は認証なしで機能します。

### MCP サーバーをインストールする{#install-the-mcp-server}

MCP サーバーは、以下のプラットフォームで利用可能です。

| プラットフォーム | アーキテクチャ    |
| -------- | ---------------- |
| macOS    | `amd64`、`arm64` |
| Linux    | `amd64`、`arm64` |
| Windows  | `amd64`          |

#### Homebrew (推奨){#homebrew-recommended}

```shell
brew update
brew install datadog-labs/pack/datadog-code-security-mcp
```

#### GitHub リリース {#github-releases}

以下のコマンドは macOS および Linux 用です。これらは `x86_64` を `amd64` リリースアセットにマッピングします。

```shell
OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
case "$(uname -m)" in
  x86_64)        ARCH="amd64" ;;
  arm64|aarch64) ARCH="arm64" ;;
  *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
esac

ASSET="datadog-code-security-mcp-${OS}-${ARCH}.tar.gz"
curl -fL \
  "https://github.com/datadog-labs/datadog-code-security-mcp/releases/latest/download/${ASSET}" \
  -o "/tmp/${ASSET}"
tar -xzf "/tmp/${ASSET}"
sudo install -m 755 datadog-code-security-mcp /usr/local/bin/
rm -f "/tmp/${ASSET}" datadog-code-security-mcp
```

インストールを確認するには、以下のコマンドを実行してください。`version --detailed` には必要なスキャナーがすべて含まれます。

```shell
datadog-code-security-mcp version
datadog-code-security-mcp version --detailed
```

### セキュリティバイナリをインストールする {#install-security-binaries}

MCP サーバーは、スキャンを実行するために以下の Datadog セキュリティバイナリを呼び出します。使用するスキャンタイプに必要なものをインストールしてください。

| バイナリ                    | 用途      | インストール方法                                |
| ------------------------- | ------------- | --------------------------------------------- |
| `datadog-static-analyzer` | SAST、シークレット | `brew install datadog-static-analyzer`        |
| `datadog-sbom-generator`  | SBOM、SCA     | [GitHub リリース][10]                         |
| `datadog-security-cli`    | SCA           | `brew install --cask datadog-security-cli`    |
| `datadog-iac-scanner`     | IaC           | [GitHub リリース][11]                         |

<div class="alert alert-info"><code>datadog-security-cli</code> は Windows では利用できず、SCA スキャンはサポートされません。<code>datadog-iac-scanner</code> は macOS <code>amd64</code>では利用できません。</div>

### クライアントを構成する {#configure-your-client}

各クライアントの構成には、以下の環境変数が必要です。

| 変数     | 必須 | 説明                                                                      |
| ------------ | :------: | -------------------------------------------------------------------------------- |
| `DD_API_KEY` |  はい*   | [Datadog API キー][9]                                                        |
| `DD_APP_KEY` |  はい*   | [Datadog アプリケーションキー][9]                                                |
| `DD_SITE`    |    いいえ    | [Datadog サイト][12]のドメイン (US1 の場合、デフォルトは `datadoghq.com`)             |

*SAST、シークレット、SCA、IaCスキャン、およびライブラリの脆弱性検索に必須です。SBOM の生成は認証なしで機能します。

この MCP 構成内のキーは、MCP サーバープロセスで使用可能です。直接的な CLI コマンドはこれらを継承しません。CLI を実行する際は、シェルで `DD_API_KEY` と `DD_APP_KEY` をエクスポートしてください。

{{< tabs >}}
{{% tab "Claude Code" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Claude CLI を使用して MCP サーバーを追加します。

<pre><code>claude mcp add datadog-code-security \
  -e DD_API_KEY=&lt;DATADOG_API_KEY&gt; \
  -e DD_APP_KEY=&lt;DATADOG_APP_KEY&gt; \
  -e DD_SITE={{< region-param key="dd_site" >}} \
  -- datadog-code-security-mcp start</code></pre>

構成を検証するには、以下の手順を実行します。

```shell
claude mcp list | grep datadog-code-security
```
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイト ({{< region-param key="dd_site_name" >}}) ではこの製品はサポートされません。</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Claude Desktop" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Claude Desktop 構成ファイルに以下を追加します。

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

<pre><code>{
    "mcpServers": {
        "datadog-code-security": {
            "command": "datadog-code-security-mcp",
            "args": ["start"],
            "env": {
                "DD_API_KEY": "&lt;DATADOG_API_KEY&gt;",
                "DD_APP_KEY": "&lt;DATADOG_APP_KEY&gt;",
                "DD_SITE": "{{< region-param key="dd_site" >}}"
            }
        }
    }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイト ({{< region-param key="dd_site_name" >}}) ではこの製品はサポートされません。</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Cursor" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Cursor MCP 設定 (`~/.cursor/mcp.json`) に以下を追加します。

<pre><code>{
    "mcpServers": {
        "datadog-code-security": {
            "command": "datadog-code-security-mcp",
            "args": ["start"],
            "env": {
                "DD_API_KEY": "&lt;DATADOG_API_KEY&gt;",
                "DD_APP_KEY": "&lt;DATADOG_APP_KEY&gt;",
                "DD_SITE": "{{< region-param key="dd_site" >}}"
            }
        }
    }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイト ({{< region-param key="dd_site_name" >}}) ではこの製品はサポートされません。</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "VS Code" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
VS Code 設定 (`.vscode/settings.json` またはユーザー設定) に以下を追加します。

<pre><code>{
    "mcp": {
        "servers": {
            "datadog-code-security": {
                "command": "datadog-code-security-mcp",
                "args": ["start"],
                "env": {
                    "DD_API_KEY": "&lt;DATADOG_API_KEY&gt;",
                    "DD_APP_KEY": "&lt;DATADOG_APP_KEY&gt;",
                    "DD_SITE": "{{< region-param key="dd_site" >}}"
                }
            }
        }
    }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイト ({{< region-param key="dd_site_name" >}}) ではこの製品はサポートされません。</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Codex" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
`~/.codex/config.toml` に以下を追加します。

<pre><code>[mcp_servers.datadog-code-security]
command = "datadog-code-security-mcp"
args = ["start"]

[mcp_servers.datadog-code-security.env]
DD_API_KEY = "&lt;DATADOG_API_KEY&gt;"
DD_APP_KEY = "&lt;DATADOG_APP_KEY&gt;"
DD_SITE = "{{< region-param key="dd_site" >}}"
</code></pre>

ファイルを保存した後、Codex を再起動します。
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイト ({{< region-param key="dd_site_name" >}}) ではこの製品はサポートされません。</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "その他" %}}

その他の MCP 互換クライアントについては、以下の構成パターンを使用してください。

- **コマンド:** `datadog-code-security-mcp`
- **引数:** `["start"]`
- **トランスポート:** STDIO
- **環境変数:** `DD_API_KEY`、`DD_APP_KEY`、`DD_SITE`

{{% /tab %}}
{{< /tabs >}}

## Agent スキルをインストールする{#install-agent-skills}

サーバーには、互換性のある AI コーディングクライアント用の 3 つの Agent スキルが含まれています。

{{< skill-callout
    title="Code Security スキルをインストールする"
    text="Install `dd-codesec-scan-and-fix`, `dd-codesec-verify-findings`, and `dd-codesec-setup-toolchain`."
    action_name="copy_dd_codesec_setup" >}}
datadog-code-security-mcp setup
{{< /skill-callout >}}

| スキル                        | 何をするか                                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `dd-codesec-scan-and-fix`    | ローカルコードをスキャンし、SAST、Secret Scanning、SCA、または IaC の検出結果を説明し、承認した修正を適用します |
| `dd-codesec-verify-findings` | リモートの Datadog MCP Server が利用可能な場合に、ローカルの検出結果を Datadog プラットフォームのコンテキストと比較します |
| `dd-codesec-setup-toolchain` | `datadog-code-security-mcp` とそれが使用するスキャナーバイナリのインストール、更新、および診断を行います                    |

`dd-codesec-setup-toolchain` は、ラッパー CLI と `datadog-static-analyzer`、`datadog-sbom-generator`、`datadog-iac-scanner`、および `datadog-security-cli` をカバーします。

`setup` コマンドは、Cursorや Agent スキル規約に従うその他のクライアントが使用する共有ディレクトリである `~/.agents/skills` にスキルをインストールします。また、Claude Code や Codex を検出した場合は、`~/.claude/skills` (または `$CLAUDE_CONFIG_DIR/skills`) および `~/.codex/skills` にもインストールします。セットアップ後、更新されたクライアントを再起動してください。

便利なオプション:

```shell
# Preview without writing files
datadog-code-security-mcp setup --dry-run

# Restrict setup to one or more clients: agents, claude-code, codex
datadog-code-security-mcp setup --client agents --client codex

# Remove only skills managed by this binary
datadog-code-security-mcp setup --remove-skills
```

スキルのインストールでは、MCP サーバーは登録されません。サーバーは個別に構成してください。スキルは、ローカルの Code Security MCP サーバーが利用可能な場合はそれを使用し、それらのツールが利用できない場合にのみ CLI にフォールバックします。CLI フォールバックには、シェル内に `DD_API_KEY` と `DD_APP_KEY` が必要です。

タスクがセキュリティ関連のファイルを変更した後、`dd-codesec-scan-and-fix` は変更されたファイルの 1 回のスキャンを提案し、確認を待ちます。編集のたびにスキャンすることはありません。

セットアップ後に Claude Code を再起動してください。スキルが一覧表示されているにもかかわらず自動トリガーされない場合は、`skillListingBudgetFraction` を `~/.claude/settings.json` (または `$CLAUDE_CONFIG_DIR/settings.json`) で上げてください。セットアップにより、この値は少なくとも `0.02` に設定されます。詳細については、「[Claude Code: スキルがないか、自動トリガーされない][13]」を参照してください。

## Datadog 内にすでに存在する検出結果をクエリする{#query-findings-already-in-datadog}

ローカルサーバーはディスク上のコードをスキャンします。Datadog がすでに検出した Code Security の検出結果をクエリするには、リモートの [Datadog MCP Server][14] に接続し、`security` ツールセットを有効にしてください。ツールの一覧表示については、「[Security MCP ツール][15]」を参照してください。

1. [Datadog MCP Server をセットアップします][16]。
2. 接続時に、`toolsets` パラメーターに `security` を追加してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
選択した [Datadog サイト](/getting_started/site/) ({{< region-param key="dd_site_name" >}}) の場合、以下を使用します。

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,security</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイト ({{< region-param key="dd_site_name" >}}) では Datadog MCP Server はサポートされません。</div>
{{< /site-region >}}

<div class="alert alert-warning">有効にするツールセットに <code>security</code> を含めてください。これがないと、Datadog MCP Server が接続されていてもこれらのツールを使用できません。Codex CLI の場合は、 <code>X-Datadog-MCP-Toolsets</code> ヘッダーを設定してください。「<a href="/mcp_server/setup/?tab=codex">Datadog MCP Server をセットアップする</a>」を参照してください。</div>

クエリを実行する前に [`get_datadog_security_findings_schema`][17] を呼び出し、完全な検出オブジェクトを取得するには [`search_datadog_security_findings`][18] を使用してください。これらの検出タイプは、Code Security の結果と一致します。

| 検出タイプ                | 製品                                      | 例                                                                 |
| --------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `static_code_vulnerability` | [静的コード解析][19]                   | [静的コード脆弱性の例][20]                                 |
| `secret`                    | [Secret Scanning][21]                        | [シークレットの例][22]                                                    |
| `library_vulnerability`     | [Software Composition Analysis][23]          | [ライブラリ脆弱性の例][24]                                     |
| `iac_misconfiguration`      | [IaC Security][25]                           | [IaC 設定ミスの例][26]                                      |

## 使用例 {#usage-examples}

### AI アシスタントのプロンプト {#ai-assistant-prompts}

構成後、自然言語を使用して AI アシスタントにスキャンを実行するよう依頼してください。

| スキャンタイプ         | プロンプトの例                                          |
| ----------------- | ------------------------------------------------------- |
| 包括的     | 「このプロジェクトでフルセキュリティスキャンを実行して」              |
| SAST              | 「`src/` にセキュリティ脆弱性がないかスキャンして」              |
| シークレット検出| 「`config/` にハードコードされたシークレットがないか確認して」|
| SCA               | 「プロジェクトの依存関係に既知の CVE がないか確認して」|
| IaC               | 「Terraform ファイルに設定ミスがないか確認して」       |
| SBOM 生成   | 「このプロジェクトの SBOM を生成して」                     |

### CLI コマンド {#cli-commands}

サーバーを CLI ツールとして直接実行します。`DD_API_KEY` と `DD_APP_KEY` を同じシェルでエクスポートします。CLI コマンドは、MCP サーバー構成のみで設定されたキーを継承しません。

すべてのスキャンタイプにわたって包括的なスキャンを実行します。

```shell
datadog-code-security-mcp scan all ./src
```

個別のスキャンタイプを実行します。

```shell
datadog-code-security-mcp scan sast ./src
datadog-code-security-mcp scan secrets ./config
datadog-code-security-mcp scan sca ./
datadog-code-security-mcp scan iac ./terraform
```

`min_sast_severity` は SAST に適用されます (`scan all` の SAST 部分を含みます)。他のスキャンタイプでは無視されます。デフォルトは `LOW` です。

```shell
datadog-code-security-mcp scan sast ./src --min-sast-severity HIGH
```

SBOM を生成します。

```shell
datadog-code-security-mcp generate-sbom .
```

JSON 出力のために、任意のコマンドに `--json` を追加します。

```shell
datadog-code-security-mcp scan all ./src --json
datadog-code-security-mcp generate-sbom . --json
```

## 使用状況テレメトリを無効にする {#disable-usage-telemetry}

使用状況テレメトリを無効にするには、以下のいずれかを使用します。

```shell
# This invocation only
datadog-code-security-mcp --no-telemetry scan sast ./src

# Shell environment
export DD_CODE_SECURITY_TELEMETRY_DISABLED=1

# Or the DO_NOT_TRACK convention
export DO_NOT_TRACK=1
```

収集されるフィールドは、プロジェクトの[テレメトリリファレンス][27]に記載されています。Datadog が個人データをどのように取り扱うかについては、Datadog [プライバシーポリシー][28]を参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_code_security_scan
[2]: /ja/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_sast_scan
[3]: /ja/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_secrets_scan
[4]: /ja/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_sca_scan
[5]: /ja/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_iac_scan
[6]: /ja/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_generate_sbom
[7]: /ja/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_library_vulnerability_scan
[8]: /ja/security/code_security/dev_tool_int/mcp_server/tools_reference/
[9]: /ja/account_management/api-app-keys/
[10]: https://github.com/DataDog/datadog-sbom-generator/releases
[11]: https://github.com/DataDog/datadog-iac-scanner/releases
[12]: /ja/getting_started/site/
[13]: https://github.com/datadog-labs/datadog-code-security-mcp#claude-code-skills-missing-or-not-auto-triggering
[14]: /ja/mcp_server/
[15]: /ja/security/mcp_server/
[16]: /ja/mcp_server/setup/
[17]: /ja/mcp_server/tools/#get_datadog_security_findings_schema
[18]: /ja/mcp_server/tools/#search_datadog_security_findings
[19]: /ja/security/code_security/static_analysis/
[20]: /ja/security/guide/findings-schema/?tab=staticcodevulnerability
[21]: /ja/security/code_security/secret_scanning/
[22]: /ja/security/guide/findings-schema/?tab=secret
[23]: /ja/security/code_security/software_composition_analysis/
[24]: /ja/security/guide/findings-schema/?tab=libraryvulnerability
[25]: /ja/security/code_security/iac_security/
[26]: /ja/security/guide/findings-schema/?tab=iacmisconfiguration
[27]: https://github.com/datadog-labs/datadog-code-security-mcp/blob/main/docs/TELEMETRY.md
[28]: https://www.datadoghq.com/legal/privacy/