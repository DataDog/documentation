---
algolia:
  tags:
  - static analysis
  - ci pipeline
  - SAST
  - secret scanning
description: Datadog Secret Scanningのルールとスキャン対象のファイルを構成します。
title: 構成
---
デフォルトでは、Datadog Secret Scanningは、[Sensitive Data ScannerのSecrets & Credentialsカテゴリにあるすべてのルール][1]を使用して、有効なリポジトリをスキャンします。SDSの[{{< ui >}}Code{{< /ui >}}構成ページ][2]で、実行するルールのカスタマイズ、デフォルトルールの変更、カスタムルールの作成を行うことができます。

このページで説明されているルール、スキャニンググループ、カスタムルールは、Datadogで構成されます。リポジトリ内の構成ファイルにより、スキャン対象のファイルに対する個別の制御が追加されます。[ファイル構成](#file-configuration)を参照してください。
## スキャニンググループ {#scanning-groups}
Secret Scanningルールを構成するスキャニンググループは2つあります。
### マネージドスキャングループ {#managed-scanning-group}
マネージドスキャングループは、Datadogのセキュリティチームによって管理されています。新しいルールやルールの更新が自動的に適用され、すべての組織でデフォルトで有効になっています。

{{< img src="/code_security/secret_scanning/managed_scanning_group_not_customized.png" alt="マネージドスキャングループ" style="width:100%;">}}

### カスタムスキャングループ {#custom-rule-scanning-group}
カスタムスキャングループは、ユーザー組織によって管理されます。[カスタム正規表現ルールを作成してテストする][3]か、SDSルールライブラリからルールを追加できます。

{{< img src="/code_security/secret_scanning/custom_scanning_group.png" alt="カスタムスキャングループ" style="width:100%;">}}

## ルールの構成 {#configuring-rules}
### デフォルトルールのカスタマイズ {#customizing-default-rules}
マネージドデフォルトルールの重大度やキーワードをカスタマイズするには、ルールにカーソルを合わせ、右側の鉛筆アイコンをクリックします。
{{< img src="/code_security/secret_scanning/customize_default_rule.png" alt="ルールの編集" style="width:100%;">}}

編集ダイアログが開きます。
{{< img src="/code_security/secret_scanning/configure_default_rule.png" alt="ルール編集ポップアップ" style="width:100%;">}}

ルールを編集して右下の {{< ui >}}Update{{< /ui >}} をクリックすると、変更されたルールがマネージドスキャングループに {{< ui >}}Customized{{< /ui >}} として表示されます。

{{< img src="/code_security/secret_scanning/disable_rule.png" alt="マネージドスキャングループ内のカスタマイズされたSecret Scanningルール" style="width:100%;">}}

<div class="alert alert-info">カスタマイズされたルールは、Datadogのセキュリティチームから重要度やデフォルトのキーワードの更新を自動的に受け取ることはありません。ルールをマネージド状態に戻すには、カスタマイズされたルールにカーソルを合わせ、右側の復元アイコンをクリックします。</div>

### カスタムルールの作成{#creating-custom-rules}
カスタムルールを作成するには、カスタムスキャングループに移動し、下部の {{< ui >}}Add scanning rule{{< /ui >}} または右上の {{< ui >}}Add rule{{< /ui >}} をクリックします。正規表現ルールを作成し、重大度とキーワードを設定します。有効にすると、次のコミット時に新しいルールでリポジトリがスキャンされます。

{{< img src="/code_security/secret_scanning/add_to_custom.png" alt="カスタムスキャングループにルールを追加する" style="width:100%;">}}

カスタムルールを更新するには、ルールにカーソルを合わせ、右側の鉛筆アイコンをクリックします。

### ルールの無効化{#disabling-rules}
右側の青いトグルをクリックして、ルールを無効にします。

<div class="alert alert-info">特定のルールを無効にすると、そのルールによる既存の検出結果は、次のコミット時にSecret Scanningで自動的にクローズされます。</div>

## ファイル構成{#file-configuration}

ルールは、「[ルールの構成](#configuring-rules)」セクションで説明されているようにDatadogで構成されます。Secret Scanningがどのファイルを読み取るかは、Code Security構成の `secrets` キーの下で構成されます。Datadogで定義するか、リポジトリのルートにある `code-security.datadog.yaml` ファイルで定義します。

設定場所、優先順位、マージの詳細については、「[Code Security 構成リファレンス][4]」を参照してください。

構成は `schema-version: v1.5` で始まり、その後に `secrets` キーがあり、その中に `global-config` オブジェクトを含む必要があります。`global-config` オブジェクトは、リポジトリ全体に適用する設定を指定します。

| **プロパティ** | **タイプ** | **説明** | **デフォルト** |
| --- | --- | --- | --- |
| `only-paths` | Array | ファイルパスまたは glob パターン。一致するファイルのみが分析されます。| なし|
| `ignore-paths` | Array | 除外するファイルパスまたは glob パターン。一致するファイルは分析されません。| なし|
| `use-gitignore` | Boolean | `.gitignore` ファイルのエントリを `ignore-paths` に含めるかどうか。| `true` |
| `ignore-generated-files` | Boolean | 一般的な生成ファイルパターンを `ignore-paths` に含めるかどうか。| `true` |
| `max-file-size-kb` | Number | 分析する最大ファイルサイズ (kB)。これより大きいファイルは無視されます。| `10240` |

### 構成サンプル{#example-configuration}

{{< code-block lang="yaml" >}}
schema-version: v1.5
secrets:
  global-config:
    # Only analyze the following paths/files
    only-paths:
      - "src"
      - "**/*.py"
    # Do not analyze the following paths/files
    ignore-paths:
      - "tests"
      - "**/*.lock"
    use-gitignore: true
    ignore-generated-files: true
    max-file-size-kb: 10240
{{< /code-block >}}

[1]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials
[2]: https://app.datadoghq.com/sensitive-data-scanner/configuration/code
[3]: /ja/security/sensitive_data_scanner/scanning_rules/custom_rules/
[4]: /ja/security/code_security/guides/configuration/