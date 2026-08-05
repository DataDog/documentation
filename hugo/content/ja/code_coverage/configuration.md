---
description: リポジトリ内の設定ファイルで Code Coverage の動作を構成します。
further_reading:
- link: /code_coverage
  tag: Documentation
  text: Code Coverage
- link: /code_coverage/setup
  tag: Documentation
  text: Code Coverage の設定
- link: /code_coverage/flags
  tag: Documentation
  text: フラグを使用したカバレッジデータを整理
title: Code Coverage の構成
---
## 概要

リポジトリのルートに `codecoverage.datadog.yml` または `codecoverage.datadog.yaml` という名前の設定ファイルを作成することで、Code Coverage の動作を構成できます。

構成ファイルの例:

```yaml
schema-version: v1
services:
  - id: frontend
    paths:
      - frontend/
      - shared/ui/**
  - id: backend-api
    paths:
      - backend/api/**
      - backend/.*\.go
ignore:
  - "test/**/*"
  - "**/*.pb.go"
gates:
  - type: total_coverage_percentage
    config:
      threshold: 85
  - type: patch_coverage_percentage
    config:
      threshold: 95
```

##サービスの構成

<div class="alert alert-info"> <a href="/code_coverage/monorepo_support#software-catalog-integration">Software Catalog インテグレーション</a>の使用をお勧めします。Software Catalog で設定されたコードの場所は、複数の Datadog 製品で使用できます。Software Catalog インテグレーションが利用できない場合のみ、手動設定を使用してください。</div>

構成ファイルでサービスを定義することで、モノレポ内でサービスごとにカバレッジデータを分割できます。これは、複数のプロジェクトやチームが単一のリポジトリを共有し、各サービスのカバレッジメトリクスを独立して表示したい場合に便利です。

```yaml
schema-version: v1
services:
  - id: frontend
    paths:
      - frontend/**
      - shared/ui/**
  - id: backend-api
    paths:
      - backend/api/**
```

 `schemaversion` (必須): `v1` である必要があります。
 `services`: サービス定義のリスト
   `id` (必須): サービスの一意の識別子
   `paths` (必須): このサービスに属するパターンのリスト (詳細は [パターン構文](#patternsyntax) を参照してください)

Software Catalog インテグレーションやコードオーナーベースの分割を含むモノレポのサポートの包括的な詳細については、[モノレポのサポート][1] を参照してください。

###例

{{% collapse-content title="JavaScript/TypeScript モノレポ" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
services:
  - id: web-app
    paths:
      - packages/web/**
      - packages/shared/ui/**
  - id: mobile-app
    paths:
      - packages/mobile/**
      - packages/shared/core/**
  - id: admin-dashboard
    paths:
      - packages/admin/**
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="多言語モノレポ" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
services:
  - id: backend-service
    paths:
      - services/backend/**
      - services/backend/.*\.go
  - id: frontend-web
    paths:
      - services/frontend/**
      - services/frontend/.*\.(ts|tsx)
  - id: data-processing
    paths:
      - services/data/**
      - scripts/.*\.py
{{< /code-block >}}
{{% /collapse-content %}}

##パスの無視

特定のファイルやディレクトリをコードカバレッジレポートから除外するには、`ignore` フィールドを使用します。これは、テストファイル、生成されたコード、ベンダー依存関係、およびカバレッジメトリクスに含めるべきでないその他のファイルを除外するのに便利です。パスパターンは、グロブ、正規表現、およびプレフィックスマッチングをサポートしています ([パターン構文](#patternsyntax) を参照)。

```yaml
ignore:
  - "test/**/*"           # Exclude all files in test directory
  - "*.pb.go"             # Exclude all protobuf generated files
  - "vendor/"             # Exclude vendor directory
```

###例外

パターンの前に `!` を追加して、無視ルールに対する例外を作成します。これにより、通常は除外される特定のファイルやフォルダーを含めることができます。

```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
```

**重要**: ネガティブパターンはポジティブパターンよりも優先されます。ネガティブパターンがファイルパスに一致する場合、そのパスが無視されることは_ありません_。

###例

{{% collapse-content title="テストファイルと生成されたコードの除外" level="h4" %}}

```yaml
ignore:
  - "**/*_test.go"        # Exclude Go test files
  - "**/*.pb.go"          # Exclude protobuf files
  - "vendor/"             # Exclude vendor directory
  - "mocks/"              # Exclude mock files
```
{{% /collapse-content %}}

{{% collapse-content title="除外と例外" level="h4" %}}

```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
  - "test/"               # Ignore test directory
  - "!test/integration/"  # Except integration tests
```
{{% /collapse-content %}}

{{% collapse-content title="混合パターンタイプ" level="h4" %}}

```yaml
ignore:
  - "^vendor/.*"          # Regex: exclude vendor (anchored)
  - "**/*.min.js"         # Glob: exclude minified JS files
  - "dist/"               # Prefix: exclude dist directory
  - ".*\\.pb\\.go$"       # Regex: exclude protobuf files
```
{{% /collapse-content %}}

##PR ゲート

プルリクエストに対して Code Coverage の閾値を強制するために、設定ファイルで [PR ゲート][2] を定義できます。ゲートが [Datadog UI][2] にも設定されている場合、PR がオープンまたは更新されるときに、Datadog は設定ファイルのルールと UI のルールの両方を評価します。

<div class="alert alert-info">設定ファイルと Datadog UI の両方が同じスコープのゲートを定義している場合、プルリクエストは定義されたすべての閾値を満たす必要があります。</div>

```yaml
gates:
  - type: total_coverage_percentage
    config:
      threshold: 85

  - type: patch_coverage_percentage
    config:
      threshold: 95
```

各ゲートには次のフィールドがあります。

 `type` (必須): カバレッジゲートのタイプ。サポートされている値:
   `total_coverage_percentage`: リポジトリ (またはスコープされたサービスやコードオーナー) の最小全体カバレッジ割合
   `patch_coverage_percentage`: プルリクエストで変更されたコードの最小カバレッジ割合
`config` (必須): ゲートの設定オプションサポートされている値:
   `threshold` (必須): 最小カバレッジ割合 (0 ～ 100)
   `services`: (オプション) ゲートをスコープするサービス名パターンのリスト。`*` をワイルドカードとして使用します。値の前に`!` を付けると、一致するサービスを除外できます。設定されている場合、カバレッジは一致する各サービスごとに別々に評価されます。
   `codeowners`: (オプション) ゲートをスコープするコードオーナーパターンのリスト。`*` をワイルドカードとして使用します。値の前に`!` を付けると、一致するコードオーナーを除外できます。設定されている場合、カバレッジは一致する各コードオーナーが別々に評価されます。
   `flags`: (オプション) ゲートをスコープする [フラグ][3] 名前パターンのリスト。`*` をワイルドカードとして使用します。値の前に`!` を付けると、一致するフラグを除外できます。設定されている場合、カバレッジは一致する各フラグが別々に評価されます。

###例

{{% collapse-content title="スコープのない全体 Code Coverage ゲートおよびパッチ Code Coverage ゲート" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: total_coverage_percentage
    config:
      threshold: 80

  - type: patch_coverage_percentage
    config:
      threshold: 90
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="サービスにスコープされたゲート" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
services:
  - id: backend-api
    paths:
      - backend/api/**
  - id: frontend-web
    paths:
      - frontend/**
gates:
  - type: patch_coverage_percentage
    config:
      threshold: 90
      services:
        - "*"

  - type: total_coverage_percentage
    config:
      threshold: 85
      services:
        - "backend-api"
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="コードオーナーにスコープされたゲート" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: patch_coverage_percentage
    config:
      threshold: 95
      codeowners:
        - "@DataDog/backend-team"
        - "@DataDog/api-*"

  - type: total_coverage_percentage
    config:
      threshold: 80
      codeowners:
        - "@DataDog/frontend-team"
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="フラグにスコープされたゲート" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: total_coverage_percentage
    config:
      threshold: 80
      flags:
        - "unit-tests"

  - type: patch_coverage_percentage
    config:
      threshold: 90
      flags:
        - "integration-tests"
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="否定を使用した除外" level="h4" %}}
特定のサービス、コードオーナー、またはフラグをゲートから除外するには、`!` プレフィックスを使用します。たとえば、実験的なものを除くすべてのサービスと、夜間テストを除くすべてのフラグに対して Code Coverage を強制する場合は以下を使用します。
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: total_coverage_percentage
    config:
      threshold: 80
      services:
        - "*"
        - "!experimental-*"

  - type: patch_coverage_percentage
    config:
      threshold: 90
      flags:
        - "*"
        - "!nightly-*"
{{< /code-block >}}
{{% /collapse-content %}}

##パターン構文

ファイルパスを受け入れる構成オプションは、以下の 3 種類のパターンをサポートしています。

 `regex`
 `glob`
 `path_prefix`

パターンタイプは、使用する構文に基づいて自動的に検出されます。

###正規表現パターン

正規表現特有の文字 (`+`、`{`、`}`、`|`、`(`、`)`、`^`、`$`、`\`) を含むパターンは、正規表現として扱われます。

 `".*\\.pb\\.go$"` - `.pb.go` で終わるファイルに一致
 `"^generated/.*"` - 生成されたディレクトリ内のファイルに一致
 `".*_test\\.go$"` - テストファイルに一致

**注意**: 正規表現パターンは、全パス一致のために自動的に `^...$` でアンカーされます。正規表現パターンでは、パスセパレーターとしてスラッシュ (`/`) を使用してください。

###グロブパターン

グロブ特有の文字 (`*`、`?`、`[`、`]`) を含むパターンは、グロブパターンとして扱われます。

 `"**/*.java"` - すべての Java ファイルに一致
 `"src/test/**/*"` - src/test 以下のすべてのファイルに一致
 `"*.pb.go"` - 任意のディレクトリ内の protobuf ファイルに一致

**注意**: ディレクトリを再帰的に一致させるには `**` を使用してください。パターン `folder/*`は直接の子のみ一致し、`folder/**/*` はすべての子孫に一致します。

###プレフィックスパターン

特別な文字を含まないシンプルなパスプレフィックスは、プレフィックス一致として扱われます。

 `"vendor/"` - vendorディレクトリ内のすべてのファイルに一致
 `"third_party/"` - サードパーティのコードに一致
 `"generated/"` - 生成されたコードに一致

##参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/code_coverage/monorepo_support
[2]: https://app.datadoghq.com/ci/prgates/rule/create?dataSource=code_coverage
[3]: /ja/code_coverage/flags