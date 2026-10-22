---
description: Datadog Code Security MCP サーバーで利用可能なすべてのツールの詳細リファレンス (パラメーター、必要なバイナリ、出力形式を含む)。
further_reading:
- link: /security/code_security/dev_tool_int/mcp_server/
  tag: ドキュメント
  text: Code Security MCP サーバーの概要とセットアップ
- link: /security/code_security/dev_tool_int/mcp_server/troubleshooting/
  tag: ドキュメント
  text: Code Security MCP サーバーのトラブルシューティング
is_beta: true
title: ツールリファレンス
---
[Datadog Code Security MCP サーバー][1]には、AI コーディングアシスタントおよびCLI 使用向けに以下のツールが公開されています。スキャンツールは、1 つ以上の Datadog セキュリティバイナリをラップし、スキャン対象のファイルパスまたはディレクトリを受け入れます。`datadog_library_vulnerability_scan` はパッケージ URL によって Datadog にクエリを実行し、ローカルツリーはスキャンしません。

<div class="alert alert-info">この MCP サーバーは、Datadog の機能やデータへのクラウドベースのアクセスを提供する <a href="/mcp_server">Datadog MCP Server</a> とは別のものです。Code Security MCP サーバーはローカルで実行され、コードレベルのセキュリティスキャンに重点を置いています。Datadog にすでに保存されている検出結果をクエリするには、<a href="/security/code_security/dev_tool_int/mcp_server/#query-findings-already-in-datadog">Datadogにすでに存在する検出結果をクエリする</a>を参照してください。</div>

## `datadog_code_security_scan` {#datadog-code-security-scan}

SAST、シークレット検出、SCA、および IaC スキャンを並行して実行します。

`min_sast_severity`スキャンの SAST 部分にのみ適用されます。デフォルトは `LOW` です。ソース内で抑制された検出結果は除外されます。一部のスキャナーがインストールされていない場合、ツールは成功したスキャナーからの結果と、失敗した各スキャナーのエラーを返します。

### パラメーター{#parameters}

| パラメーター            | 型            | 必須 | 説明                                                                                          |
| -------------------- | --------------- | :------: | ---------------------------------------------------------------------------------------------------- |
| `file_paths`         | `array[string]` |   はい    | スキャンするファイルパスまたはディレクトリ                                                                    |
| `working_dir`        | `string`        |    いいえ    | 相対パスを解決するためのベースディレクトリ (デフォルトは現在のディレクトリ)                      |
| `min_sast_severity`  | `string`        |    いいえ    | 返す最小 SAST 重大度: `LOW`、`MEDIUM`、`HIGH`、または `CRITICAL`。デフォルト: `LOW`。SAST のみ。|

### 必要なバイナリ{#required-binaries}

`datadog-static-analyzer`、`datadog-sbom-generator`、`datadog-security-cli`、`datadog-iac-scanner`

## `datadog_sast_scan` {#datadog-sast-scan}

Static Application Security Testing (SAST) を実行して、ファーストパーティコード内のセキュリティ脆弱性を検出します。

`min_sast_severity`デフォルトは `LOW` です。ソース内で抑制された検出結果は除外されます。

### パラメーター{#parameters-1}

| パラメーター            | 型            | 必須 | 説明                                                                                          |
| -------------------- | --------------- | :------: | ---------------------------------------------------------------------------------------------------- |
| `file_paths`         | `array[string]` |   はい    | スキャンするファイルパスまたはディレクトリ                                                                    |
| `working_dir`        | `string`        |    いいえ    | 相対パスを解決するためのベースディレクトリ                                                          |
| `min_sast_severity`  | `string`        |    いいえ    | 返す最小 SAST 重大度: `LOW`、`MEDIUM`、`HIGH`、または `CRITICAL`。デフォルト: `LOW`。            |

### 必要なバイナリ {#required-binary}

`datadog-static-analyzer`

## `datadog_secrets_scan` {#datadog-secrets-scan}

ソースコードおよび構成ファイル内のハードコードされた認証情報、API キー、パスワード、トークンを検出します。

### パラメーター{#parameters-2}

| パラメーター     | 型            | 必須 | 説明                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   はい    | スキャンするファイルパスまたはディレクトリ           |
| `working_dir` | `string`        |    いいえ    | 相対パスを解決するためのベースディレクトリ |

### 必要なバイナリ {#required-binary-1}

`datadog-static-analyzer`

## `datadog_sca_scan` {#datadog-sca-scan}

SCA を実行して、プロジェクトの依存関係にある既知の脆弱性 (CVE) を検出します。このツールは、次の 2 段階のプロセスを実行します。

1. 指定されたディレクトリからソフトウェア部品表 (SBOM) を生成します。
2. Datadog の脆弱性データベースを使用して、SBOM に既知の脆弱性がないかスキャンします。

### パラメーター {#parameters-3}

| パラメーター     | 型            | 必須 | 説明                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   はい    | 依存関係をスキャンするディレクトリ        |
| `working_dir` | `string`        |    いいえ    | 相対パスを解決するためのベースディレクトリ |

### 出力内容{#output}

脆弱性と、CVE ID、重大度、影響を受けるコンポーネント、バージョン、および説明。

### 必要なバイナリ{#required-binaries-1}

`datadog-sbom-generator`、`datadog-security-cli`

## `datadog_iac_scan` {#datadog-iac-scan}

IaC ファイル内の構成ミス、コンプライアンスの問題、およびセキュリティ脆弱性を検出します。

### パラメーター{#parameters-4}

| パラメーター     | 型            | 必須 | 説明                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   はい    | スキャンする IaC ファイルがあるディレクトリ    |
| `working_dir` | `string`        |    いいえ    | 相対パスを解決するためのベースディレクトリ |

### 出力内容{#output-1}

セキュリティ所見と、重大度、ルール、ファイル場所、および修正ガイダンス。

### 必要なバイナリ{#required-binary-2}

`datadog-iac-scanner`

### サポートされる IaC 形式{#supported-iac-formats}

- Terraform
- CloudFormation
- Kubernetes マニフェスト
- Dockerfiles
- GitHub Actions

## `datadog_generate_sbom` {#datadog-generate-sbom}

リポジトリ内のすべてのソフトウェアコンポーネント、依存関係、バージョン、およびライセンスを一覧表示する包括的な SBOM を生成します。

### パラメーター{#parameters-5}

| パラメーター     | 型     | 必須 | 説明                                                                |
| ------------- | -------- | :------: | -------------------------------------------------------------------------- |
| `path`        | `string` |    いいえ    | 分析対象のリポジトリまたはディレクトリへのパス (デフォルトは現在のディレクトリ) |
| `working_dir` | `string` |    いいえ    | スキャンのベースディレクトリ (デフォルトは現在のディレクトリ)                |

### 出力内容{#output-2}

要約 (合計コンポーネント数、言語/パッケージマネージャー別の内訳、ライセンス統計) および詳細なコンポーネントリスト (名前、バージョン、タイプ、ライセンス、パッケージ URL) を含む JSON。

### サポートされるパッケージマネージャー{#supported-package-managers}

| 言語   | パッケージマネージャー                          |
| ---------- | ----------------------------------------- |
| .NET       | NuGet                                     |
| C++        | Conan                                     |
| Go         | Go modules                                |
| Java       | Gradle, Maven                             |
| JavaScript | npm, pnpm, Yarn                            |
| PHP        | Composer                                  |
| Python     | pdm, pipenv, poetry, requirements.txt, uv |
| Ruby       | Bundler                                   |
| Rust       | Cargo                                     |

<div class="alert alert-info">リポジトリが上記以外のパッケージマネージャーを使用している場合、またはツールが返すコンポーネントがゼロの場合、AI アシスタントはロックファイル (<code>package.json</code>、<code>requirements.txt</code>、<code>go.mod</code>、<code>pom.xml</code>、<code>Gemfile.lock</code>、<code>Cargo.lock</code>、<code>composer.lock</code>、および類似のファイル) を読み取り、依存関係を直接抽出することにより SBOM を生成できます。</div>

## `datadog_library_vulnerability_scan` {#datadog-library-vulnerability-scan}

パッケージ URL (PURL) を使用して、特定のライブラリの既知の脆弱性を検索します。このツールは Datadog API を呼び出すものであり、ローカルのコードベースをスキャンしません。プロジェクトツリーをスキャンする場合は、[`datadog_sca_scan`](#datadog_sca_scan) を使用してください。

`DD_API_KEY` と `DD_APP_KEY` が必要です。

### パラメーター{#parameters-6}

| パラメーター     | 型            | 必須 | 説明                                                                 |
| ------------- | --------------- | :------: | --------------------------------------------------------------------------- |
| `libraries`   | `array[object]` |   はい    | スキャンするライブラリ。各オブジェクトは、下のテーブルのフィールドを使用します。        |
| `working_dir` | `string`        |    いいえ    | Git コンテキスト検出用の作業ディレクトリ (デフォルトは現在のディレクトリ) |

`libraries` の各エントリ:

| フィールド             | 型      | 必須 | 説明                                                      |
| ----------------- | --------- | :------: | ---------------------------------------------------------------- |
| `purl`            | `string`  |   はい    | パッケージURL (例: `pkg:maven/com.cronutils/cron-utils@9.1.2` |)
| `is_direct`       | `boolean` |    いいえ    | 直接依存関係かどうか                              |
| `is_dev`          | `boolean` |    いいえ    | 開発専用の依存関係かどうか                    |
| `package_manager` | `string`  |    いいえ    | パッケージマネージャー (例: `MAVEN`、`NPM`、または `GOLANG`         |)

### 出力内容{#output-3}

脆弱性、および CVE ID、GHSA ID、深刻度、CVSS スコア、影響を受けるライブラリ、修正方法、修正バージョン、エクスプロイトの利用可能性。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/code_security/dev_tool_int/mcp_server/