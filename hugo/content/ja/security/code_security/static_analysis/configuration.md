---
description: Datadog Static Code Analysis (SAST) 構成のリファレンスドキュメント。ルールセットの選択、ルールのカスタマイズ、重大度、パスについて説明します。
title: Static Code Analysis (SAST) 構成
---
デフォルトでは、Datadog Static Code Analysis (SAST) は、各プログラミング言語に対して [Datadog のデフォルトルールセット][6] を使用してリポジトリをスキャンします。実行するルールセットやルール、重大度、パス、その他のパラメータをカスタマイズできます。これらの設定は、Datadog または `code-security.datadog.yaml` ファイルの Code Security 構成で、`sast` キーの下に指定します。

設定場所、優先順位、マージの詳細については、「[Code Security 構成リファレンス][26]」を参照してください。

## デフォルトのルールセット {#default-rulesets}

デフォルトでは、Datadog はリポジトリのプログラミング言語に対応するデフォルトルールセットを有効にします (`use-default-rulesets: true`)。有効なルールセットを変更するには、次のように設定します。

- **ルールセットを追加する**: `use-rulesets` の下にルールセットを一覧表示します。
- **特定のルールセットを無効にする**: `ignore-rulesets` の下にルールセットを一覧表示します。
- **すべてのデフォルトのルールセットを無効にする**: `use-default-rulesets: false` を設定し、`use-rulesets` の下に必要なルールセットを一覧表示します。

デフォルトのルールセットの詳細なリストは、[Static Code Analysis (SAST) ルール][6] を参照してください。

## AI-native SAST を設定する{#configure-ai-native-sast}

AI-native SAST は、他の Static Code Analysis ルールと同じ `sast` 設定を使用し、Datadog ホスト型スキャンでのみ利用可能です。`sast` 設定は、どの AI-native SAST ルールセットを実行するかを制御します。Datadog ホスト型スキャンを有効にしたり、AI-native SAST へのアクセス権を付与したりすることはありません。

AI-native SAST を有効にすると、リポジトリで検出されたサポート対象言語に対して、そのデフォルトのルールセットが実行されます。AI-native SAST のルールセット名は、`<language>-ai_sast` の形式です。

| 言語 | ルールセット |
| --- | --- |
| C# | `csharp-ai_sast` |
| C++ | `cpp-ai_sast` |
| Dart | `dart-ai_sast` |
| Elixir | `elixir-ai_sast` |
| Go | `go-ai_sast` |
| Java | `java-ai_sast` |
| JavaScript | `javascript-ai_sast` |
| Kotlin | `kotlin-ai_sast` |
| PHP | `php-ai_sast` |
| Python | `python-ai_sast` |
| Ruby | `ruby-ai_sast` |
| Rust | `rust-ai_sast` |
| Swift | `swift-ai_sast` |
| TypeScript | `typescript-ai_sast` |

`use-default-rulesets` 設定は、従来の SAST ルールセットと AI-native SAST ルールセットの両方に適用されます。`use-default-rulesets: false` に設定する場合は、実行するすべての従来の SAST ルールセットと AI-native SAST ルールセットを指定してください。たとえば、次の設定では Ruby のセキュリティルールセットと AI-native SAST ルールセットが実行されます。

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - ruby-security
    - ruby-ai_sast
{{< /code-block >}}

他のデフォルトルールセットを維持したまま特定の AI-native SAST ルールセットを無効にするには、そのルールセットを `ignore-rulesets` に追加します。

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: true
  ignore-rulesets:
    - ruby-ai_sast
{{< /code-block >}}

## 構成形式 {#configuration-format}

下記の構成形式は、組織レベル、リポジトリレベル、およびリポジトリレベル (ファイル) のすべての設定場所に適用されます。

構成ファイルは、サポートされている `schema-version` (`v1.0`、`v1.1`、`v1.2`、`v1.3`、または `v1.4`) で始まり、その後に分析設定を含む `sast` キーが続く必要があります。すべての新しい構成には `v1.4` を使用してください。構成は次のような構造になっています。

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: true
  use-rulesets:
    - ruleset-name
  ignore-rulesets:
    # Always ignore these rulesets (even if it is a default ruleset or listed in `use-rulesets`)
    - ignored-ruleset-name
  ruleset-configs:
    ruleset-name:
      # Only apply this ruleset to the following paths/files
      only-paths:
        - "path/example"
        - "**/*.file"
      # Do not apply this ruleset in the following paths/files
      ignore-paths:
        - "path/example/directory"
        - "**/config.file"
      rule-configs:
        rule-name:
          # Only apply this rule to the following paths/files
          only-paths:
            - "path/example"
            - "**/*.file"
          # Do not apply this rule to the following paths/files
          ignore-paths:
            - "path/example/directory"
            - "**/config.file"
          arguments:
            # Set the rule's argument to value.
            argument-name: value
          severity: ERROR
          category: CODE_STYLE
        rule-name:
          arguments:
            # Set different argument values in different subtrees
            argument-name:
              # Set the rule's argument to value_1 by default (root path of the repo)
              /: value_1
              # Set the rule's argument to value_2 for specific paths
              path/example: value_2
  global-config:
    # Only analyze the following paths/files
    only-paths:
      - "path/example"
      - "**/*.file"
    # Do not analyze the following paths/files
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
    use-gitignore: true
    ignore-generated-files: true
    max-file-size-kb: 200
{{< /code-block >}}

`sast`キーは、次のフィールドをサポートしています。

| **プロパティ** | **タイプ** | **説明** | **デフォルト** |
| --- | --- | --- | --- |
| `use-default-rulesets` | Boolean | Datadog のデフォルトルールセットを有効にするかどうか。| `true` |
| `use-rulesets` | Array | 有効にするルールセット名のリスト。| なし|
| `ignore-rulesets` | Array | 無効にするルールセット名のリスト。`use-rulesets` や `use-default-rulesets` よりも優先されます。| なし|
| `ruleset-configs` | Object | ルールセット名とその構成へのマッピング。| なし|
| `global-config` | Object | リポジトリのグローバル設定。| なし|

## ルールセットの構成{#ruleset-configuration}

`ruleset-configs` マップの各エントリは、特定のルールセットを構成します。構成を適用するルールセットを `use-rulesets` に一覧表示する必要はありません。ルールセットが有効になっている場合は、`use-default-rulesets` によって有効になっている場合も含め、構成が常に適用されます。

| **プロパティ** | **タイプ** | **説明** | **デフォルト** |
| --- | --- | --- | --- |
| `only-paths` | Array | ファイルパスまたは glob パターン。これらのパターンに一致するファイルのみが、このルールセットの処理対象となります。| なし|
| `ignore-paths` | Array | このルールセットの分析から除外するファイルパスまたは glob パターン。| なし|
| `rule-configs` | Object | ルール名とらその構成へのマッピング。| なし|

## ルールの構成 {#rule-configuration}

ルールセットの `rule-configs` マップ内の各エントリは、特定のルールを構成します。

| **プロパティ** | **タイプ** | **説明** | **デフォルト** |
| --- | --- | --- | --- |
| `only-paths` | Array | ファイルパスまたは glob パターン。ルールは、これらのパターンに一致するファイルにのみ適用されます。| なし|
| `ignore-paths` | Array | 除外するファイルパスまたは glob パターン。これらのパターンに一致するファイルには、ルールは適用されません。| なし|
| `arguments` | Object | ルールのパラメーターと値。値にはスカラー値を指定することも、パスごとに指定することもできます。| なし|
| `severity` | String または Object | ルールの重大度。有効な値は、`ERROR`、`WARNING`、`NOTICE`、`NONE` です。単一の値を指定することも、パスごとに指定することもできます。| なし|
| `category` | String | ルールのカテゴリー。有効な値は、`BEST_PRACTICES`、`CODE_STYLE`、`ERROR_PRONE`、`PERFORMANCE`、`SECURITY` です。| なし|

## 引数および重大度の構成 {#argument-and-severity-configuration}

引数と重大度は、次の 2 つの形式のいずれかで定義できます。

1. **単一の値:** リポジトリ全体に適用されます。

   {{< code-block lang="yaml" >}}
   arguments:
     argument-name: value
   severity: ERROR
   {{< /code-block >}}

2. **パスごとのマッピング:** サブツリーごとに異なる値を指定します。最も長く一致するパスのプレフィックスが適用されます。包括的なデフォルト値として、`/` を使用します。

   {{< code-block lang="yaml" >}}
   arguments:
     argument-name:
       /: value_default
       path/example: value_specific
   severity:
     /: WARNING
     path/example: ERROR
   {{< /code-block >}}

   | **キー** | **タイプ** | **説明** | **デフォルト** |
   | --- | --- | --- | --- |
   | `/` | 任意 | 特定のパスが一致しない場合のデフォルト値。| なし|
   | `specific path` | 任意 | 指定されたパスまたは glob パターンに一致するファイルの値を指定します。| なし|

`category` フィールドには、リポジトリ全体に適用する単一の文字列値を指定します。

## グローバル構成 {#global-configuration}

`global-config` オブジェクトは、リポジトリ全体に適用する設定を指定します。

| **プロパティ** | **タイプ** | **説明** | **デフォルト** |
| --- | --- | --- | --- |
| `only-paths` | Array | ファイルパスまたは glob パターン。一致するファイルのみが分析されます。| なし|
| `ignore-paths` | Array | 除外するファイルパスまたは glob パターン。一致するファイルは分析されません。| なし|
| `use-gitignore` | Boolean | `.gitignore` ファイルのエントリを `ignore-paths` に含めるかどうか。| `true` |
| `ignore-generated-files` | Boolean | 一般的な生成ファイルパターンを `ignore-paths` に含めるかどうか。| `true` |
| `max-file-size-kb` | Number | 分析する最大ファイルサイズ (kB)。これより大きいファイルは無視されます。| `200` |

構成の例

この例ではデフォルトのルールセットを無効にしているため、Python の AI-native SAST を保持するために `python-ai_sast` を明示的に指定しています。

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - python-best-practices
    - python-security
    - python-code-style
    - python-inclusive
    - python-django
    - python-ai_sast
    - custom-python-ruleset
  ruleset-configs:
    python-code-style:
      rule-configs:
        max-function-lines:
          # Do not apply the rule max-function-lines to the following files
          ignore-paths:
            - "src/main/util/process.py"
            - "src/main/util/datetime.py"
          arguments:
            # Set the max-function-lines rule's threshold to 150 lines
            max-lines: 150
          # Override this rule's severity
          severity: NOTICE
        max-class-lines:
          arguments:
            # Set different thresholds for the max-class-lines rule in different subtrees
            max-lines:
              # Set the rule's threshold to 200 lines by default (root path of the repo)
              /: 200
              # Set the rule's threshold to 100 lines in src/main/backend
              src/main/backend: 100
          # Override this rule's severity with different values in different subtrees
          severity:
            # Set the rule's severity to NOTICE by default
            /: NOTICE
            # Set the rule's severity to NONE in tests/
            tests: NONE
    python-django:
      # Only apply the python-django ruleset to the following paths
      only-paths:
        - "src/main/backend"
        - "src/main/django"
      # Do not apply the python-django ruleset in files matching the following pattern
      ignore-paths:
        - "src/main/backend/util/*.py"
  global-config:
    # Only analyze source files
    only-paths:
      - "src/main"
      - "src/tests"
      - "**/*.py"
    # Do not analyze third-party files
    ignore-paths:
      - "lib/third_party"
{{< /code-block >}}

## レガシー構成 {#legacy-configuration}

Datadog Static Code Analysis (SAST) は以前、異なる構成ファイル (`static-analysis.datadog.yml`) とスキーマを使用していました。このスキーマは非推奨であり、新しい更新は行われませんが、`datadog-static-analyzer` リポジトリで [ドキュメント化][25] されています。

両方のファイルが存在する場合、`static-analysis.datadog.yml` よりも `code-security.datadog.yaml` が優先されます。

### 違反を無視する {#ignoring-violations}

#### リポジトリで無視する{#ignore-for-a-repository}

`code-security.datadog.yaml` ファイルにルール構成を追加します。次の例では、すべてのディレクトリでルール `javascript-express/reduce-server-fingerprinting` を無視します。

{{< code-block lang="yaml" >}}
schema-version: v1.0
sast:
  ruleset-configs:
    javascript-express:
      rule-configs:
        reduce-server-fingerprinting:
          ignore-paths:
            - "**"
{{< /code-block >}}

#### ファイルまたはディレクトリで無視する{#ignore-for-a-file-or-directory}

`code-security.datadog.yaml` ファイルにルール構成を追加します。次の例では、特定のファイルでルール `javascript-express/reduce-server-fingerprinting` を無視します。パスによる無視方法の詳細については、[構成のカスタマイズ](#customize-your-configuration)を参照してください。

{{< code-block lang="yaml" >}}
schema-version: v1.0
sast:
  ruleset-configs:
    javascript-express:
      rule-configs:
        reduce-server-fingerprinting:
          ignore-paths:
            - "ad-server/src/app.js"
{{< /code-block >}}

#### 特定のインスタンスを無視する{#ignore-for-a-specific-instance}

違反の特定のインスタンスを無視するには、コード行の上に `no-dd-sa` とコメントを追加します。`no-dd-sa` で抑制された違反は完全に除外されるのではなく、**suppressed** と表示されるため、検索や監査を行うことができます。

[Repositories (リポジトリ) ページ][1] では、抑制された違反は `is_suppressed: true` として表示されます。[脆弱性エクスプローラー][2] では、`status: muted` および `workflow.mute.reason: muted_in_code` として表示されます。

たとえば、次の Python コードスニペットでは、`foo = 1` の行は Static Code Analysis のスキャンで抑制されます。

{{< code-block lang="python" >}}
#no-dd-sa
foo = 1
bar = 2
{{< /code-block >}}

また、`no-dd-sa` を使用して、すべてのルールではなく、特定のルールのみを抑制することもできます。その場合は、次のテンプレートを使用して、`<rule-name>` の部分に抑制するルール名を指定します。

`no-dd-sa:<rule-name>`

たとえば、次の JavaScript コードスニペットでは、`my_foo = 1` の行は `javascript-code-style/assignment-name` ルールに対してのみ抑制され、他のすべてのルールでは引き続き分析されます。

{{< code-block lang="javascript" >}}
// no-dd-sa:javascript-code-style/assignment-name
my_foo = 1
myBar = 2
{{< /code-block >}}

[1]: https://app.datadoghq.com/security/code-security/repositories
[2]: https://app.datadoghq.com/security/code-security/sca
[6]: /ja/security/code_security/static_analysis/static_analysis_rules
[25]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/legacy_config.md
[26]: /ja/security/code_security/guides/configuration/