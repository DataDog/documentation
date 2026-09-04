---
description: Datadog Static Code Analysis (SAST) 構成のリファレンスドキュメントです。ルールセットの選択、ルールのカスタマイズ、重大度、パスについて説明しています。
title: Static Code Analysis (SAST) 構成
---
デフォルトでは、Datadog Static Code Analysis (SAST) は、各プログラミング言語に対する [Datadog のデフォルトルールセット][6]を使用してリポジトリをスキャンします。実行するルールセットやルール、重大度、パス、その他のパラメータをカスタマイズできます。これらの設定は、Datadog または `code-security.datadog.yaml` ファイルのいずれかで、Code Security 構成の `sast` キーで構成します。

構成の場所、優先順位、マージに関する情報については、[Code Security 構成リファレンス][26]を参照してください。

## デフォルトルールセット {#default-rulesets}

デフォルトでは、Datadog はリポジトリのプログラミング言語に対してデフォルトルールセットを有効にします (`use-default-rulesets: true`)。有効なルールセットを変更する方法は次のとおりです。

- **ルールセットを追加する**: `use-rulesets` の下にリストします。
- **特定のルールセットを無効にする**: `ignore-rulesets` の下にリストします。
- **すべてのデフォルトルールセットを無効にする**: `use-default-rulesets: false` を設定し、目的のルールセットを `use-rulesets` の下にリストします。

デフォルトルールセットの全リストについては、[Static Code Analysis (SAST) ルール][6]を参照してください。

## AI ネイティブ SAST の構成{#configure-ai-native-sast}

AI ネイティブ SAST は、他の Static Code Analysis ルールと同じ `sast` 構成を使用し、Datadog ホスト型スキャンでのみ利用可能です。`sast` 構成は、どの AI ネイティブ SAST ルールセットを実行するかを制御します。Datadog ホスト型スキャンを有効にしたり、AI ネイティブ SAST へのアクセスを付与したりするものではありません。

AI ネイティブ SAST が有効な場合、リポジトリで検出されたサポート対象言語に対して、そのデフォルトルールセットが実行されます。AI ネイティブ SAST ルールセットの名前の形式は `<language>-ai_sast` です。

| 言語 | ルールセット |
| --- | --- |
| C# | `csharp-ai_sast` |
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

`use-default-rulesets` 設定は、従来の SAST ルールセットと AI ネイティブ SAST ルールセットの両方に適用されます。`use-default-rulesets: false` を設定する場合は、実行するすべての従来の SAST ルールセットと AI ネイティブ SAST ルールセットを含めてください。たとえば、次の構成では、Ruby Security ルールセットと AI ネイティブ SAST ルールセットが実行されます。

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - ruby-security
    - ruby-ai_sast
{{< /code-block >}}

他のデフォルトルールセットを保持したまま特定の AI ネイティブ SAST ルールセットを無効にするには、それを `ignore-rulesets` に追加します。

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: true
  ignore-rulesets:
    - ruby-ai_sast
{{< /code-block >}}

## 構成形式 {#configuration-format}

次の構成形式は、組織レベル、リポジトリレベル、およびリポジトリレベル (ファイル) のすべての構成場所に適用されます。

構成ファイルは、サポートされている `schema-version` (`v1.0`、`v1.1`、`v1.2`、`v1.3`、または `v1.4`) で始まり、その後に分析構成を含む `sast` キーが続く必要があります。新しい構成には、いずれも `v1.4` を使用してください。構成は次のように構造化されています。

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

`sast` キーは、次のフィールドをサポートしています。

| **プロパティ** | **型** | **説明** | **デフォルト** |
| --- | --- | --- | --- |
| `use-default-rulesets` | ブール値 | Datadog のデフォルトルールセットを有効にするかどうか。| `true` |
| `use-rulesets` | 配列 | 有効にするルールセット名のリスト。| なし |
| `ignore-rulesets` | 配列 | 無効にするルールセット名のリスト。`use-rulesets` および `use-default-rulesets` よりも優先されます。| なし |
| `ruleset-configs` | オブジェクト | ルールセット名からその構成へのマップ。| なし |
| `global-config` | オブジェクト | リポジトリのグローバル設定。| なし |

## ルールセット構成 {#ruleset-configuration}

`ruleset-configs` マップの各エントリは、特定のルールセットを構成します。ルールセットの構成を適用するために、そのルールセットを `use-rulesets` にリストする必要はありません。構成は、`use-default-rulesets` を通じて有効化された場合を含め、ルールセットが有効化されるたびに使用されます。

| **プロパティ** | **型** | **説明** | **デフォルト** |
| --- | --- | --- | --- |
| `only-paths` | 配列 | ファイルパスまたはグロブパターン。これらのパターンに一致するファイルのみが、このルールセットの処理対象となります。| なし |
| `ignore-paths` |  配列 | このルールセットの分析から除外するファイルパスまたはグロブパターン。| なし |
| `rule-configs` | オブジェクト | ルール名からその構成へのマップ。| なし |

## ルール構成 {#rule-configuration}

ルールセットの `rule-configs` マップ内の各エントリは、特定のルールを構成します。

| **プロパティ** | **型** | **説明** | **デフォルト** |
| --- | --- | --- | --- |
| `only-paths` | 配列 | ファイルパスまたはグロブパターン。これらのパターンに一致するファイルにのみルールが適用されます。| なし |
| `ignore-paths` | 配列 | 除外するファイルパスまたはグロブパターン。これらのパターンに一致するファイルにはルールは適用されません。| なし |
| `arguments` | オブジェクト | ルールのパラメータと値。値はスカラーにするか、パスごとに定義できます。| なし |
| `severity` | 文字列またはオブジェクト | ルールの重大度。有効な値: `ERROR`、`WARNING`、`NOTICE`、`NONE`。単一の値にするか、パスごとに定義できます。| なし |
| `category` | 文字列 | ルールのカテゴリ。有効な値: `BEST_PRACTICES`、`CODE_STYLE`、`ERROR_PRONE`、`PERFORMANCE`、`SECURITY`。| なし |

## 引数と重大度の構成 {#argument-and-severity-configuration}

引数と重大度は、次の 2 つの形式のいずれかで定義できます。

1. **単一値:** リポジトリ全体に適用されます。

   {{< code-block lang="yaml" >}}
   arguments:
     argument-name: value
   severity: ERROR
   {{< /code-block >}}

2. **パスごとのマッピング:** サブツリーごとに異なる値。最も長く一致するパスプレフィックスが適用されます。`/` を包括的なデフォルトとして使用します。

   {{< code-block lang="yaml" >}}
   arguments:
     argument-name:
       /: value_default
       path/example: value_specific
   severity:
     /: WARNING
     path/example: ERROR
   {{< /code-block >}}

   | **キー** | **型** | **説明** | **デフォルト** |
   | --- | --- | --- | --- |
   | `/` | Any | 特定のパスが一致しない場合のデフォルト値。| なし |
   | `specific path` | Any | 指定されたパスまたはグロブパターンに一致するファイルの値。| なし |

`category` フィールドは、リポジトリ全体に対して単一の文字列値をとります。

## グローバル構成 {#global-configuration}

`global-config` オブジェクトは、リポジトリ全体の設定を制御します。

| **プロパティ** | **型** | **説明** | **デフォルト** |
| --- | --- | --- | --- |
| `only-paths` | 配列 | ファイルパスまたはグロブパターン。一致するファイルのみが分析されます。| なし |
| `ignore-paths` | 配列 | 除外するファイルパスまたはグロブパターン。一致するファイルは分析されません。| なし |
| `use-gitignore` | ブール値 | `.gitignore` ファイルのエントリを `ignore-paths` に含めるかどうか。| `true` |
| `ignore-generated-files` | ブール値 | 一般的な生成ファイルパターンを `ignore-paths` に含めるかどうか。| `true` |
| `max-file-size-kb` | 数値 | 分析する最大ファイルサイズ (kB 単位)。これより大きなファイルは無視されます。| `200` |

構成例:

この例では、デフォルトルールセットを無効にしているため、Python 向けの AI ネイティブSAST を保持するために `python-ai_sast` を明示的に含めています。

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

Datadog Static Code Analysis (SAST) では、以前は異なる構成ファイル (`static-analysis.datadog.yml`) とスキーマを使用していました。このスキーマは非推奨であり、新しい更新は行われませんが、`datadog-static-analyzer` リポジトリで[ドキュメント化][25]されています。

両方のファイルが存在する場合、`code-security.datadog.yaml` が `static-analysis.datadog.yml` よりも優先されます。

### 違反の無視 {#ignoring-violations}

#### リポジトリの無視 {#ignore-for-a-repository}

`code-security.datadog.yaml` ファイルにルール構成を追加します。次の例では、すべてのディレクトリに対してルール `javascript-express/reduce-server-fingerprinting` を無視します。

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

#### ファイルまたはディレクトリの無視 {#ignore-for-a-file-or-directory}

`code-security.datadog.yaml` ファイルにルール構成を追加します。次の例では、特定のファイルに対してルール `javascript-express/reduce-server-fingerprinting` を無視します。パスによる無視の詳細については、[構成のカスタマイズ](#customize-your-configuration)を参照してください。

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

#### 特定のインスタンスの無視 {#ignore-for-a-specific-instance}

違反の特定のインスタンスを無視するには、コード行の上に `no-dd-sa` とコメントします。`no-dd-sa` で抑制された違反は完全に省略されるのではなく **suppressed** と表示されるため、検索や監査を行うことができます。

[[Repositories] (リポジトリ) ページ][1]では、抑制された違反は `is_suppressed: true` と表示されます。[[Vulnerabilities] (脆弱性) エクスプローラー][2]では、`status: muted` および `workflow.mute.reason: muted_in_code` と表示されます。

たとえば、次の Python コードスニペットでは、`foo = 1` の行が Static Code Analysis スキャンで抑制されます。

{{< code-block lang="python" >}}
#no-dd-sa
foo = 1
bar = 2
{{< /code-block >}}

また、`no-dd-sa` を使用して、すべてのルールを抑制するのではなく、特定のルールのみを抑制することもできます。その場合は、次のテンプレートを使用して、`<rule-name>` の代わりに抑制するルール名を指定します。

`no-dd-sa:<rule-name>`

たとえば、次の JavaScript コードスニペットでは、`my_foo = 1` の行は `javascript-code-style/assignment-name` ルールに対してのみ抑制されますが、他のすべてのルールでは引き続き解析されます。

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