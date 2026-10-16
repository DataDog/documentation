---
aliases:
- /ja/security/cloud_security_management/setup/iac_scanning/iac_scanning_exclusions/
- /ja/security/code_security/iac_security/exclusions/
further_reading:
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: ブログ
  text: Datadog IaC Security を使用して、クラウドの誤構成が本番環境に影響することを防ぐ
- link: /security/code_security/iac_security
  tag: ドキュメント
  text: IaC Security
- link: /security/code_security/iac_security/setup
  tag: ドキュメント
  text: Code Security の IaC Security をセットアップする
- link: /security/code_security/iac_security/iac_rules/
  tag: ドキュメント
  text: IaC Security のルール
title: IaC (Infrastructure as Code) Security 構成
---
IaC (Infrastructure as Code) Security は、IaC の誤構成を検出します。デフォルトでは、IaC Security は[サポートされているすべてのルール][3]を使用してリポジトリをスキャンします。実行するルール、ルールを実行するパス、重大度、ルールタイプをカスタマイズできます。これらの設定は、Datadog または `code-security.datadog.yaml` ファイルの Code Security 構成の `iac` キーで行います。

設定場所、優先順位、マージの詳細については、「[Code Security 構成リファレンス][1]」を参照してください。

## 構成方法 {#configuration-methods}

IaC Security は、以下を使用して構成できます。

- Datadog または `code-security.datadog.yaml` ファイル (リポジトリ全体のルール、重大度、ルールタイプ、パスの設定を行う場合)。リポジトリ全体または組織全体に同じ構成を適用する場合は、この方法を使用します。
- インラインコメント (IaC ファイルのみに適用する必要がある、ローカルでファイル固有の除外を設定する場合)。特定の行、ブロック、またはファイルに例外を適用する場合は、この方法を使用します。

## 構成形式 {#configuration-format}

下記の構成形式は、組織レベル、リポジトリレベル、およびリポジトリレベル (ファイル) のすべての設定場所に適用されます。

構成ファイルは `schema-version: v1.4` で始まり、その後に分析設定を含む `iac` キーが続く必要があります。

完全な構造は次のとおりです。

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  # Do not run these rules.
  ignore-rules:
    - A
    - B
  # Run only these rules. If this field is set, all other rules are ignored.
  use-rules:
    - A
  global-config:
    # Only analyze the following paths/files.
    only-paths:
      - "path/example"
      - "**/*.file"
    # Do not analyze the following paths/files.
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
    # Do not report findings with these severities.
    ignore-severities:
      - low
      - info
    # Report only findings with these severities.
    only-severities:
      - high
      - critical
    # Do not report findings with these rule types.
    ignore-categories:
      - "Best Practices"
    # Report only findings with these rule types.
    only-categories:
      - "Encryption"
    # Do not run rules from these platforms.
    ignore-platforms:
      - Dockerfile
    # Only run rules from these platforms.
    only-platforms:
      - Terraform
      - Kubernetes
      - CICD
  # Per-rule configurations.
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      ignore-paths:
        - "test/"
      severity: low
    kubernetes-deployment-without-resource-limits:
      only-paths:
        - "k8s/production/"
    cicd-github-unpinned-actions-full-length-commit-sha:
      arguments:
        allow:
          - libbpf/ci/run-qemu
{{< /code-block >}}

`iac` キーは、次のフィールドをサポートしています。

| **プロパティ** | **タイプ** | **説明** |
| --- | --- | --- |
| `ignore-rules` | 配列 | 無視するルール ID のリスト。|
| `use-rules` | 配列 | 実行するルール ID のリスト。指定した場合、_これらのルールのみ_が実行されます。`ignore-rules` は `use-rules` よりも優先され、両方の配列のルールが無視されます。|
| `global-config` | オブジェクト | IaC スキャナーのグローバル設定。|
| `rule-configs` | オブジェクト | ルールごとの設定。キーはルール ID です。|

## ルールの構成 {#rule-configuration}

実行するルールを変更するには、次のようにします。

- **特定のルールのみを実行する**: `use-rules` でルールを指定します。
- **特定のルールを無効にする**: `ignore-rules` でルールを指定します。

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  ignore-rules:
    - A
    - B
{{< /code-block >}}

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  use-rules:
    - A
{{< /code-block >}}

`A` や `B` などのプレースホルダーを Code Security ルール ID に置き換えます。下位互換性のために、レガシールール ID もサポートされています。

## グローバル構成 {#global-configuration}

`global-config` オブジェクトは、リポジトリ全体に適用する設定を指定します。

| **プロパティ** | **タイプ** | **説明** |
| --- | --- | --- |
| `only-paths` | Array | ファイルパスまたは glob パターン。一致するファイルのみが分析されます。|
| `ignore-paths` | Array | 除外するファイルパスまたは glob パターン。一致するファイルは分析されません。|
| `only-severities` | 配列 | 報告する重大度レベル。他の重大度の検出結果は報告されません。|
| `ignore-severities` | 配列 | 無視する重大度レベル。|
| `only-categories` | 配列 | 報告するルールタイプ。他のルールタイプの検出結果は報告されません。|
| `ignore-categories` | 配列 | 無視するルールタイプ。|
| `ignore-platforms` | 配列 | スキップするプラットフォーム。これらのプラットフォームのルールは適用されません。|
| `only-platforms` | 配列 | スキャンするプラットフォーム。他のプラットフォームのルールは適用されません。|

### 重大度 {#severities}

重大度レベルに基づいて検出結果を無視するには、`ignore-severities` を使用します。特定の重大度レベルのみを報告するには、`only-severities` を使用します。

**使用可能な値:**

- `critical`
- `high`
- `medium`
- `low`
- `info`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    ignore-severities:
      - info
      - low
{{< /code-block >}}

### パス {#paths}

特定のファイルまたはディレクトリをスキャンから除外するには、`ignore-paths` を使用します。特定のファイルまたはディレクトリのみをスキャンするには、`only-paths` を使用します。これらのオプションでは、グロブパターンがサポートされます。

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
{{< /code-block >}}

### ルールタイプ {#rule-types}

特定のルールタイプの検出結果を無視するには、`ignore-categories` を使用します。特定のルールタイプのみを報告するには、`only-categories` を使用します。

**使用可能な値:**

- `Access Control`
- `Availability`
- `Backup`
- `Best Practices`
- `Bill Of Materials`
- `Build Process`
- `Encryption`
- `Insecure Configurations`
- `Insecure Defaults`
- `Least Privilege`
- `Networking and Firewall`
- `Observability`
- `Resource Management`
- `Secret Management`
- `Structure and Semantics`
- `Supply-Chain`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    ignore-categories:
      - "Access Control"
      - "Best Practices"
{{< /code-block >}}

### プラットフォーム {#platforms}

特定のプラットフォームをスキップするには、`ignore-platforms` を使用します。スキャンを特定のプラットフォームに制限するには、`only-platforms` を使用します。

**使用可能な値:**

- `Ansible`
- `CICD`
- `CloudFormation`
- `Dockerfile`
- `Kubernetes`
- `Terraform`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    only-platforms:
      - Terraform
      - Kubernetes
{{< /code-block >}}

## ルールごとの構成 {#per-rule-configuration}

個々のルールを構成するには、`rule-configs` を使用します。

`rule-configs` に示されている各キーはルール ID です。ルールごとに以下のプロパティがサポートされています。

| **プロパティ** | **タイプ** | **説明** |
| --- | --- | --- |
| `only-paths` | Array | ファイルパスまたは glob パターン。ルールは、これらのパターンに一致するファイルにのみ適用されます。|
| `ignore-paths` | Array | 除外するファイルパスまたは glob パターン。これらのパターンに一致するファイルには、ルールは適用されません。|
| `arguments` | オブジェクト | ルールの動作を調整するルール固有のパラメーター。サポートされている引数名と値の型は、ルールによって異なります。|
| `severity` | 文字列 | このルールによって生成される検出結果の重大度を上書きします。指定可能な値は次のとおりです: `critical`、`high`、`medium`、`low`、`info`。|

### ルールごとのパススコープ {#per-rule-path-scoping}

特定のパスからルールを除外するか、特定のパスにルールを制限します。

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      # Do not apply this rule in test directories.
      ignore-paths:
        - "test/"
        - "**/testdata/"
    kubernetes-deployment-without-resource-limits:
      # Apply this rule only in production manifests.
      only-paths:
        - "k8s/production/"
{{< /code-block >}}

パスパターンでは、グロブ構文 (`*`、`**`、`?`) がサポートされます。パスはリポジトリのルートからの相対パスです。

### ルールごとの重大度の上書き {#per-rule-severity-override}

特定のルールによって生成される検出結果の重大度を変更します。

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      severity: low
{{< /code-block >}}

この重大度は、そのルールによって生成されるすべての検出結果に適用されます。

### ルールごとの引数 {#per-rule-arguments}

特定のルールのパラメーターを設定するには、`arguments` を使用します。サポートされている引数名と値の型は、ルールによって異なります。`rule-configs` で、ルール ID の下に引数を定義します。

次の例では、`cicd-github-unpinned-actions-full-length-commit-sha` ルールを設定し、`libbpf/ci/run-qemu` アクションを許可しています。

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    cicd-github-unpinned-actions-full-length-commit-sha:
      arguments:
        allow:
          - libbpf/ci/run-qemu
{{< /code-block >}}

## レガシー構成 {#legacy-configuration}

IaC Security は、以前は異なる構成ファイル (`dd-iac-scan.config`) とスキーマを使用していました。このスキーマは非推奨であり、新しい更新は行われませんが、`datadog-iac-scanner` リポジトリで[ドキュメント化][2]されています。

両方の構成ファイルが存在する場合、`iac` セクションのある `code-security.datadog.yaml` ファイルが `dd-iac-scan.config` よりも優先されます。

## インラインコメントによる除外設定 {#configure-exclusions-with-an-inline-comment}

ファイルのスキャン対象部分を制御するには、`dd-iac-scan` を含むコメントを追加し、その後にコマンドと必要な値を指定します。ファイル形式にはコメント構文を使用して、`dd-iac-scan` というプレフィックスを付けます。インライン除外は、それらが使用されているファイル内でのみ適用されます。

### サポートされるコマンド {#supported-commands}

| **コメント**                      | **説明**                 |
|----------------------------------|---------------------------------|
| `dd-iac-scan ignore`             | ファイル全体を無視します。       |
| `dd-iac-scan disable=<rule_id>`  | 特定のルールを無視します。        |
| `dd-iac-scan enable=<rule_id>`   | 特定のルールのみを含めます。  |
| `dd-iac-scan ignore-line`        | 1 行を無視します。         |
| `dd-iac-scan ignore-block`       | ブロック全体を無視します。       |

#### dd-iac-scan ignore {#dd-iac-scan-ignore}

スキャンからファイル全体を除外します。このコメントを有効にするには、ファイルの先頭に配置する必要があります。

{{< code-block lang="yaml" >}}
# dd-iac-scan ignore

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

#### dd-iac-scan disable=rule_id {#dd-iac-scan-disablerule-id}

このファイル内の指定されたルールのスキャン結果を除外します。このコメントを有効にするには、ファイルの先頭に配置する必要があります。

{{< code-block lang="yaml" >}}
# dd-iac-scan disable=A,B

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

指定したルールの検出結果は、このファイルでは無視されます。下位互換性のために、レガシールール ID もサポートされています。

#### dd-iac-scan enable=rule_id {#dd-iac-scan-enablerule-id}

指定したルールについてのみ、このファイルのスキャン結果を報告します。このコメントを有効にするには、ファイルの先頭に配置する必要があります。

{{< code-block lang="yaml" >}}
# dd-iac-scan enable=A

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

指定したルールの検出結果のみが、このファイルのスキャン結果に含まれます。下位互換性のために、レガシールール ID もサポートされています。

#### dd-iac-scan ignore-line {#dd-iac-scan-ignore-line}

このコメントの直後の行がスキャン結果から除外されます。このコメントは、ファイル内のどこにでも配置できます。

{{< highlight yaml "hl_lines=3" >}}
resource "google_storage_bucket" "example" {
  # dd-iac-scan ignore-line
  name          = "image-store.com"
  location      = "EU"
  force_destroy = true
}
{{< / highlight >}}

前の例では、強調表示された行の検出結果が無視されます。

#### dd-iac-scan ignore-block {#dd-iac-scan-ignore-block}

リソースブロック全体およびそのすべてのキーと値のペアがスキャン結果から除外されます。このコメントは、ファイル内のどこにでも配置できます。

{{< highlight yaml "hl_lines=2-6" >}}
# dd-iac-scan ignore-block
resource "google_storage_bucket" "example" {
  name          = "image-store.com"
  location      = "EU"
  force_destroy = true
}
{{< / highlight >}}

前の例では、強調表示されたブロックの検出結果が無視されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/code_security/guides/configuration/
[2]: https://github.com/DataDog/datadog-iac-scanner/blob/main/legacy_config.md
[3]: /ja/security/code_security/iac_security/iac_rules/