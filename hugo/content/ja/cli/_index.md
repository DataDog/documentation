---
description: Pup コマンドラインインターフェイスを使用すると、ターミナルや AI エージェントのワークフローから Datadog API を操作できます。
further_reading:
- link: https://github.com/DataDog/pup
  tag: GitHub
  text: Pup CLI リポジトリ
- link: https://github.com/DataDog/pup/blob/main/README.md
  tag: GitHub
  text: Pup CLI の完全なドキュメント
- link: https://github.com/DataDog/pup/blob/main/docs/COMMANDS.md
  tag: GitHub
  text: コマンドリファレンス
- link: mcp_server/
  tag: ドキュメント
  text: Datadog MCP サーバー
title: Pup CLI
---
## 概要 {#overview}

[Pup CLI][1]は、AI エージェントが Datadog の監視可能性プラットフォームにアクセスできる、包括的な AI エージェント対応のコマンドラインインターフェイスです。AI エージェントのワークフローや自動化パイプラインで使用するために、[Datadog の API サーフェス][9]が公開されています。

主な特徴:

- **自己発見可能なコマンド**; コマンドは、エージェントが外部ドキュメントなしでナビゲートできるように構成されています。
- **構造化された出力**: 応答は、信頼性のある解析のために JSON および YAML で利用可能です。
- **限定認証**: OAuth2 と PKCE は、長期 API キーを使わずに限定アクセスを提供します。
- **広範な製品カバレッジ**: Pupは、モニター、ログ、メトリクス、RUM、セキュリティなどをサポートします。

<div class="alert alert-info">このページは、Pup のコア機能をカバーしています。機能とコマンドの完全なリストは、<a href="https://github.com/DataDog/pup/blob/main/README.md" target="_blank">Pup リポジトリのドキュメント</a>を参照してください。</div>

## インストール {#installation}

### Homebrew (macOS/Linux) {#homebrew-macoslinux}

{{< code-block lang="bash" >}}
brew tap datadog-labs/pack
brew install datadog-labs/pack/pup
{{< /code-block >}}

### ソースからビルドする {#build-from-source}

{{< code-block lang="bash" >}}
git clone https://github.com/DataDog/pup.git && cd pup
cargo build --release
cp target/release/pup /usr/local/bin/pup
{{< /code-block >}}

### 手動ダウンロード {#manual-download}

[最新のリリース][2]から事前ビルドされたバイナリをダウンロードします。

## 使用例 {#usage-examples}

{{< code-block lang="bash" >}}
# Log in to Datadog
pup auth login

# List monitors filtered by tag
pup monitors list --tags="team:api-platform"

# Search logs for errors in the last hour
pup logs search --query="status:error" --from="1h"

# Query CPU metrics
pup metrics query --query="avg:system.cpu.user{*}" --from="1h"

# Get dashboard details
pup dashboards get <DASHBOARD_ID>

# Delete a dashboard
pup dashboards delete <DASHBOARD_ID> --yes
{{< /code-block >}}

## サポートされている製品領域 {#supported-product-areas}

Pup は主要な Datadog 製品サーフェスをほとんどカバーしています。標準的な製品固有のコマンドリストについては、[コマンドリファレンス][3]を参照してください。ライブのコマンドリストを表示するには、`pup --help` (または機械可読出力用の `pup agent schema`) を実行することもできます。

| カテゴリ | 例 |
|----------|----------|
| コア監視可能性 | メトリクス、ログ、イベント、RUM、APM、トレース |
| 監視とアラート | モニター、ダッシュボード、SLO、合成テスト、ダウンタイム、ワークフロー |
| セキュリティとコンプライアンス | セキュリティルール、シグナル、所見、監査ログ、CSM 脅威 |
| インフラストラクチャーとクラウド | ホスト、タグ、コンテナ、ネットワーク、AWS/GCP/Azure インテグレーション|
| インシデントとオペレーション | インシデント、オンコール、ケース管理、エラートラッキング、サービスカタログ |
| CI/CD と開発 | CIの可視性、テスト最適化、DORA メトリクス、デプロイメントゲート |
| 組織とアクセス | ユーザー、API キー、アプリケーションキー、組織 |
| プラットフォームと設定 | 使用量計測、コスト管理、機能フラグ、監視可能性パイプライン |

## エージェントモード {#agent-mode}

Pup が AI コーディングエージェントによって呼び出されると、自動的にエージェントモードに切り替わり、機械による使用に最適化された構造化 JSON 応答を返します。応答にはメタデータ、エラー詳細、およびヒントが含まれます。エージェントモードでは、確認プロンプトは自動的に承認されます。

[サポートされるコーディングエージェント][4]の場合、環境変数が設定されていれば、エージェントモードは自動検出されます。`--agent` フラグを使用するか、`FORCE_AGENT_MODE=1` を設定することで、明示的に有効にすることもできます。

## その他の機能 {#additional-features}

Pup には AI エージェントワークフローで使用できる追加機能が含まれています。詳細については、以下のリンクを参照してください。

- [**ランブック**][5]: `pup runbooks`は、YAMLで定義された運用手順のためのローカル実行エンジンであり、`pup`、シェル、HTTP、および Datadog ワークフローステップを使用してマルチステップタスクをエンコードします。
- [**エージェントスキル**][6]: Pup にはバイナリに埋め込まれたスキルとドメインエージェントが付属しており、`pup skills install` を使用して任意の AI コーディングアシスタントにインストール可能です。
- [**ACP サーバー**][7]: `pup acp serve` は、コーディングツールを ACP および OpenAI 互換プロトコルを通じて Datadog Bits AI に接続するローカル AI エージェントサーバーを実行します。

## 認証 {#authentication}

Pup は OAuth2 および API キー認証方法をサポートしています。OAuth2 が推奨されます。ブラウザを通じて認証するには `pup auth login` を実行してください。OAuth2 が利用できない場合、Pup は API キー (`DD_API_KEY` および `DD_APP_KEY`) にフォールバックします。詳細については[認証ドキュメント][8]を参照してください。

## グローバルフラグ {#global-flags}

| フラグ | 説明 |
|------|-------------|
| `-o, --output` | 出力形式 (`json`、`table`、`yaml`)。デフォルト: `json` |
| `-y, --yes` | 破壊的操作に対する確認プロンプトをスキップする |
| `--agent` | エージェントモードを有効にする |
| `--no-agent` | エージェントモードを無効にする |
| `--read-only` | すべての書き込み操作 (作成、更新、削除) をブロックする |
| `--org <org>` | マルチアカウントワークフローのために名前付き組織プロファイルを使用する (セットアップするには `pup auth login --org` を実行) |
| `-h, --help` | ヘルプを表示する |

## 環境変数 {#environment-variables}

| 変数 | 説明 |
|----------|-------------|
| `DD_ACCESS_TOKEN` | [ステートレス認証][10]のためのベアラートークン |
| `DD_API_KEY` | Datadog API キー (OAuth2 または`DD_ACCESS_TOKEN` を使用する場合はオプション) |
| `DD_APP_KEY` | Datadog アプリケーションキー (OAuth2 または `DD_ACCESS_TOKEN` を使用する場合はオプション) |
| `DD_SITE` | Datadog サイト (デフォルト: `datadoghq.com`)|
| `DD_AUTO_APPROVE` | 破壊的操作の自動承認 (`true`/`false`)|
| `DD_TOKEN_STORAGE` | トークンストレージバックエンド (`keychain`または`file`、デフォルト: 自動検出)|

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/pup
[2]: https://github.com/DataDog/pup/releases/latest
[3]: https://github.com/DataDog/pup/blob/main/docs/COMMANDS.md
[4]: https://github.com/DataDog/pup/blob/main/README.md#agent-mode
[5]: https://github.com/DataDog/pup/blob/main/README.md#runbooks
[6]: https://github.com/DataDog/pup/blob/main/README.md#agent-skills
[7]: https://github.com/DataDog/pup/blob/main/docs/EXAMPLES.md#acp-server-ai-agent-integration
[8]: https://github.com/DataDog/pup/blob/main/README.md#authentication
[9]: /ja/api/latest/
[10]: https://github.com/DataDog/pup#bearer-token-authentication-wasm--headless