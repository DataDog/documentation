---
description: カスタム IaC ルールの Rego コントラクト、解析済み入力、共有ライブラリ、検出フィールド、およびテスト手法を参照してください。
further_reading:
- link: https://www.datadoghq.com/blog/custom-iac-security-rules/
  tag: ブログ
  text: Datadog IaC Security スキャンでのカスタムルールの適用
title: IaC カスタムルールリファレンス
---
IaC カスタムルールのこのリファレンスでは、ルールコントラクト、解析済み入力、およびプラットフォーム固有のパターンについて説明します。

カスタムルールの作成方法と、ゼロからルールを作成する例については、[IaC カスタムルール][2] を参照してください。

## ルールコントラクト{#rule-contract}

Datadog はカスタムルールを [Rego][1] v1 として評価します。すべてのカスタムルールは、以下を行う必要があります。

- `package datadog` を宣言します。
- `DatadogPolicy` という名前のパーシャルセットルールを少なくとも 1 つ定義します。

   同じポリシー内で複数の `DatadogPolicy` ルールを定義できます。評価が成功するたびに、個別の検出結果が生成されます。

- 違反ごとに 1 つの `result` オブジェクトを`DatadogPolicy` に追加します。
- すべての[必須結果フィールド](#result-fields)を設定してください。

この Terraform ルールは、コントラクトを満たしています。

```rego
package datadog

import data.generic.terraform as tf_lib

DatadogPolicy contains result if {
	some i, name
	resource := input.document[i].resource.aws_s3_bucket[name]
	resource.acl == "public-read"

	result := {
		"documentId": input.document[i].id,
		"resourceType": "aws_s3_bucket",
		"resourceName": tf_lib.resolve_s3_bucket_name(resource, name),
		"searchKey": sprintf("aws_s3_bucket[%s].acl", [name]),
	}
}
```

## 解析済み入力 {#parsed-input}

Datadog はサンプルファイルを解析し、Rego で `input.document` として参照できるようにします。各項目には、`id` およびプラットフォーム固有のフィールドが含まれています。例:

```rego
some i, document in input.document
```

すべてのプラットフォームについて、`documentId` には、検出結果を生成した解析済みドキュメントの `id` を設定してください。プラットフォームは、ドキュメントの残りの部分をどのようにトラバースするかを決定しますが、`documentId` をどのように導出するかは決定しません。

Rego は、欠落しているフィールドへの参照を未定義として扱います。未定義のフィールドに対する等価式は、検出結果を生成しません。ルールで欠落している属性と明示的な値を区別する必要がある場合は、`object.get`、`not`、または `data.generic.common.valid_key` などのヘルパーを使用します。

## 結果フィールド {#result-fields}

| フィールド | 必須 | 説明 |
| ----- | -------- | ----------- |
| `documentId` | はい | 違反を含む解析済みドキュメントの `id`。|
| `resourceType` | はい | 報告されるリソースの実際の型 (`aws_s3_bucket`、`Pod`、または `AWS::S3::Bucket` など)。|
| `resourceName` | はい | Terraform リソースラベル、Kubernetes メタデータ名、CloudFormation 論理 ID など、リソースを識別しやすい名前。|
| `searchKey` | はい | 強調表示するソースのプラットフォーム固有のロケーター。|
| `remediation` | いいえ | マシンに適用可能なソースの変更。`remediationType` と一緒に設定します。|
| `remediationType` | いいえ | 修復によって適用される操作。`remediation` と一緒に設定します。|

ルール説明にある `## Remediation` セクションは、人が読んで理解できるガイダンスです。オプションの結果フィールド `remediation` および `remediationType` は、自動的に行われるソース変更について説明します。

### 修復形式 {#remediation-formats}

欠落している属性またはブロックを挿入するには、`addition` を使用します。挿入するソーステキストを `remediation` に設定します。

```rego
"remediation": "versioning {\n\tenabled = true\n}",
"remediationType": "addition",
```

既存の値を変更するには、`replacement` を使用します。受け入れられる現在の値と、その置換値をエンコードします。

```rego
"remediation": json.marshal({
	"before": "Suspended",
	"after": "Enabled",
}),
"remediationType": "replacement",
```

検出結果の位置によって特定されたコンテンツを削除するには、`removal` を使用します。削除される内容についての簡単な説明を `remediation` に設定します。

```rego
"remediation": "Remove the insecure resource.",
"remediationType": "removal",
```

ルールで信頼性の高い自動編集を提供できない場合は、両方の修正フィールドを省略し、ルール説明で手動修正について説明してください。

### 検出結果の位置 {#finding-locations}

`searchKey` はスキャナー固有のソースロケーターであり、Rego パスではありません。形式はプラットフォームによって異なります。

いくつかのプラットフォームでは、デフォルトルールで、フォーマット文字列内の挿入値を二重中括弧で囲みます。たとえば、 <code>sprintf("run=&#123;&#123;%s&#125;&#125;", [run])</code>のようにします。これにより、`run="{{checkout}} のようなロケーターが生成されます。プラットフォームの入力パターンには、エディターに貼り付けて使用できる、同等の`. The platform input patterns include equivalent `concat` or nested `sprintf` 構造が含まれています。

利用可能な最も正確で安定した場所を使用します。

- 安全でない属性が存在する場合は、その属性を正確に特定します。
- 属性が欠落している場合は、その属性を含むリソースまたはプロパティブロックを特定します。
- ファイルに同じキーが複数含まれる可能性がある場合は、`={{...}}` を使用して識別用の値を含めます。
- ネストされたオブジェクトを報告する場合は、ワークロード、タスク、ステージ、ジョブ、またはコンテナを識別する情報を含めます。

`"tasks"` や `"metadata.name"` のような不正確なロケーターでは、ファイルに複数のリソースまたはコンテナが含まれている場合、誤った行が強調表示されることがあります。エディターのマーカーを使用して、代表的なサンプルに対して位置が正しいことを確認します。

## 共有ライブラリ {#shared-libraries}

カスタムルールでは、Datadog の共通ライブラリおよびプラットフォームライブラリをインポートできます。

```rego
import data.generic.common as common_lib
import data.generic.terraform as tf_lib
```

以下のプラットフォームパッケージが利用可能です。

- `data.generic.ansible`
- `data.generic.cicd`
- `data.generic.cloudformation`
- `data.generic.dockerfile`
- `data.generic.k8s`
- `data.generic.terraform`

共有ライブラリは、フィールドへの直接アクセスでは再現が難しい処理を扱います。Ansible モジュールのエイリアス、GitHub Actions のトリガー形式、Kubernetes ワークロードの Pod 仕様、Terraform リソース名、CloudFormation 参照などがあります。

## プラットフォームの入力パターン {#platform-input-patterns}

このセクションの例では、デフォルトルールで使用されている本番環境向けのパターンを示します。エディター内のスターターポリシーは意図的に簡略化されており、提供されたサンプルのみを処理する場合があります。デフォルトルールが類似のリソースを評価する場合は、そのルールを複製して、プラットフォームヘルパー、ソースの位置、およびリソース相関の制約を保持します。

### Ansible {#ansible}

Ansible モジュールは、短い名前、完全修飾コレクション名、およびその他のエイリアスで記述される場合があります。Ansible ライブラリを使用して、タスクとモジュールのバリエーションを順に処理します。

```rego
import data.generic.ansible as ans_lib

canonical := "uri"

some id, task_index
task := ans_lib.tasks[id][task_index]
some variant in ans_lib.variants_for(canonical)
module := task[variant]
ans_lib.checkState(module)
```

正規のモジュール名を `resourceType` として使用し、リソース名を `ans_lib.resource_name` として設定し、タスクとモジュールのバリエーションを `searchKey` に含めます。デフォルトルールでは、多くの場合、 <code>sprintf("name=&#123;&#123;%s&#125;&#125;.&#123;&#123;%s&#125;&#125;.url", [task.name, variant])</code>のような単一のフォーマット文字列を使用します。これと同等の記述は次のとおりです。

```rego
"searchKey": sprintf("name=%s.%s.url", [
	concat("", ["{{", task.name, "}}"]),
	concat("", ["{{", variant, "}}"]),
])
```

### CI/CD {#cicd}

CI/CD カスタムルールは、GitHub Actions ワークフローを評価します。ワークフロートリガーは文字列、配列、またはオブジェクトになる場合があるため、1 つの YAML 形式を想定せず、CI/CD ライブラリを使用します。

```rego
import data.generic.cicd as cicd_lib

some document in input.document
cicd_lib.check_provider(document) == "github"
cicd_lib.has_dangerous_trigger(document)
```

デフォルトルールでは、`github_action`、`github_workflow`、`github_job`、`github_step` などのリソースタイプが使用されます。ステップ値の場合、 <code>sprintf("uses=&#123;&#123;%s&#125;&#125;", [uses])</code> のようなリテラルロケーターが正確なソース行を識別します。

### AWS CloudFormation {#aws-cloudformation}

CloudFormation リソースは、`Resources` の下で論理 ID をキーとして管理されます。

```rego
import data.generic.cloudformation as cf_lib

some document in input.document
some logical_id, resource in document.Resources
resource.Type == "AWS::S3::Bucket"
```

リソースタイプとして `resource.Type` を、名前として `cf_lib.resource_name(resource, logical_id)` を使用します。欠落しているプロパティは、そのプロパティを含むブロックにアンカーできます。

```rego
"searchKey": sprintf("Resources.%s.Properties", [logical_id])
```

### Dockerfile {#dockerfile}

Dockerfile の命令は、ビルドステージごとに `document.command` の下にグループ化されます。

```rego
import data.generic.dockerfile as dockerfile_lib

some i, stage
instruction := input.document[i].command[stage][_]
instruction.Cmd == "add"
not dockerfile_lib.arrayContains(instruction.Value, {".tar", ".tar."})
```

ロケーターにビルドステージと元の命令を含めます。デフォルトルールでは、多くの場合、 <code>sprintf("FROM=&#123;&#123;%s&#125;&#125;.&#123;&#123;%s&#125;&#125;", [stage, instruction.Original])</code>を使用します。

```rego
"searchKey": sprintf("FROM=%s.%s", [
	concat("", ["{{", stage, "}}"]),
	concat("", ["{{", instruction.Original, "}}"]),
])
```

### Kubernetes {#kubernetes}

Kubernetes のチェックは、多くの場合、Pod や Deployment などのワークロード内にネストされた Pod 仕様に適用されます。有効な Pod 仕様を特定するには、`spec_info` を使用します。

```rego
import data.generic.k8s as k8s_lib

some document in input.document
spec_info := k8s_lib.spec_info(document)
some container in spec_info.spec.containers
container.securityContext.privileged == true
```

`searchKey` に、ワークロード名、Pod 仕様のパス、コンテナ名、および安全でないフィールドを含めます。デフォルトルールでは、多くの場合、 <code>sprintf("metadata.name=&#123;&#123;%s&#125;&#125;.%s.containers.name=&#123;&#123;%s&#125;&#125;.securityContext.privileged", [document.metadata.name, spec_info.path, container.name])</code>を使用します。

```rego
"searchKey": sprintf(
	"metadata.name=%s.%s.containers.name=%s.securityContext.privileged",
	[
		concat("", ["{{", document.metadata.name, "}}"]),
		spec_info.path,
		concat("", ["{{", container.name, "}}"]),
	],
)
```

初期化コンテナにも同じ要件が適用される場合は、`initContainers` を個別に確認します。

### Terraform {#terraform}

Terraform リソースは、リソースタイプとラベルごとにグループ化されます。

```rego
some i, name
resource := input.document[i].resource.aws_s3_bucket[name]
```

プロバイダーのリソースタイプを `resourceType` として使用します。プラットフォームヘルパーは、`bucket`、`cluster_id`、`name` などのフィールドを使用するリソースの名前を解決できます。

```rego
import data.generic.terraform as tf_lib

"resourceName": tf_lib.resolve_s3_bucket_name(resource, name)
```

Terraform の `searchKey` 値は通常、リソースタイプとラベルで始まります。

```rego
"searchKey": sprintf("aws_s3_bucket[%s].acl", [name])
```

プロバイダーバージョンによっては、構成が別のリソースに移される場合があります。チェックで複数のプロバイダーバージョン、モジュール、関連リソース、または Terraform plan JSON を対象とする必要がある場合は、同等のデフォルトルールを出発点として使用します。`Suspended` のバージョニングステータスなど、明示的な属性値のみをチェックするルールでは、欠落しているリソースを検出できません。

## リソースの相関関係 {#resource-correlation}

複数のリソース、モジュール、ジョブ、またはワークロードを比較するチェックもあります。`input.document` 全体で制約のない結合を行うと、無関係なリソースが関連付けられ、重複した検出結果が生成される可能性があるため、避けてください。

既存のルールを調整する際は、ドキュメント、名前空間、ワークフロー、ビルドステージ、およびリソース参照の制約を維持してください。

## テストカバレッジ {#test-coverage}

少なくとも以下の項目をテストしてください。

- 検出結果が生成される必要がある構成
- 検出結果が生成されてはならない準拠構成
- デフォルト値が重要な場合の値の欠落と明示的な値
- 1 つのファイル内の複数のリソース
- Ansible モジュールのエイリアスや GitHub Actions のトリガー形式など、プラットフォームがサポートする代替構文
- ルールが関連付けを行う場合の、異なるスコープにある関連リソース

## 検証 {#validation}

エディターは Rego 構文以外もチェックします。サンプルを評価する前に、Datadog はポリシーが[ルールコントラクト](#rule-contract)セクションの要件を満たしていること、さらに次の条件も満たしていることを確認します。

- 呼び出しで正しい数の引数を使用していること`sprintf`
- 共通ライブラリおよび選択プラットフォームのライブラリでコンパイルできること
- `http.send` や `opa.runtime` などの制限された組み込み関数を呼び出さないこと

検出結果がない評価を解釈する前に、報告されたすべてのエラーを修正してください。検証エラーは、ポリシーが正常に実行されなかったことを意味します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.openpolicyagent.org/docs/policy-language
[2]: /ja/security/code_security/iac_security/custom_rules/