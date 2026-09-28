---
description: Rego コントラクト、解析済み入力、共有ライブラリ、検出結果フィールド、テスト手法など、カスタム IaC ルールに関する情報を参照してください。
title: IaC カスタムルールリファレンス
---
この IaC カスタムルールリファレンスでは、ルールコントラクト、解析済み入力、およびプラットフォーム固有のパターンについて説明します。

カスタムルールの作成に関するガイダンスおよびゼロからルールを作成する例については、[IaC カスタムルール][2]を参照してください。

## ルールコントラクト{#rule-contract}

Datadog はカスタムルールを [Rego][1] v1 として評価します。すべてのカスタムルールは以下を満たす必要があります。

- `package datadog` を宣言する。
- `DatadogPolicy` という名前のパーシャルセットルールを少なくとも 1 つ定義する。

   同じポリシー内に複数の `DatadogPolicy` ルールを定義できます。評価が成功するたびに、個別の検出結果が生成されます。

- 違反ごとに `result` オブジェクトを 1 つ `DatadogPolicy` に追加する。
- すべての[必須結果フィールド](#result-fields)を設定する。

この Terraform ルールはコントラクトを満たしています。

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

## 解析済み入力{#parsed-input}

Datadog はサンプルファイルを解析し、`input.document` の下で Rego に公開します。各項目には、`id` およびプラットフォーム固有のフィールドが含まれています。以下に例を示します。

```rego
some i, document in input.document
```

すべてのプラットフォームにおいて、検出結果を生成した解析済みドキュメントの `id` に `documentId` を設定します。プラットフォームはドキュメントの残りの部分をどのようにトラバースするかを決定しますが、`documentId` をどのように導出するかは決定しません。

Rego は、欠落しているフィールドへの参照を未定義として扱います。未定義のフィールドに対する等価式は、検出結果を生成しません。欠落している属性と明示的な値をルールで区別する必要がある場合は、`object.get`、`not`、または `data.generic.common.valid_key` などのヘルパーを使用してください。

## 結果フィールド {#result-fields}

| フィールド | 必須 | 説明 |
| ----- | -------- | ----------- |
| `documentId` | はい | 違反を含む解析済みドキュメントの `id`。|
| `resourceType` | はい | 報告されるリソースの実際のタイプ (`aws_s3_bucket`、`Pod`、`AWS::S3::Bucket` など)。|
| `resourceName` | はい | リソースの有用な名前 (Terraform リソースラベル、Kubernetes メタデータ名、CloudFormation 論理 ID など)。 |
| `searchKey` | はい | 強調表示するソースのプラットフォーム固有のロケーター。|
| `remediation` | いいえ | マシンで適用可能なソース変更。`remediationType` と一緒に設定してください。|
| `remediationType` | いいえ | 修復によって適用される操作。`remediation` と一緒に設定してください。|

ルール説明の `## Remediation` セクションは、人間が読むためのガイダンスです。オプションの結果フィールド `remediation` および `remediationType` は、自動化されたソース変更について説明します。

### 修復フォーマット {#remediation-formats}

欠落している属性またはブロックを挿入するには `addition` を使用します。挿入するソースを `remediation` に設定します。

```rego
"remediation": "versioning {\n\tenabled = true\n}",
"remediationType": "addition",
```

既存の値を変更するには `replacement` を使用します。受け入れられた現在の値とその置換値をエンコードします。

```rego
"remediation": json.marshal({
	"before": "Suspended",
	"after": "Enabled",
}),
"remediationType": "replacement",
```

検出場所によって特定されたコンテンツを削除するには `removal` を使用します。何が削除されるかについての短い説明を `remediation` に設定します。

```rego
"remediation": "Remove the insecure resource.",
"remediationType": "removal",
```

ルールで信頼性の高い自動編集を提供できない場合は、両方の修正フィールドを省略し、ルール説明で手動修正について説明してください。

### 場所の検索 {#finding-locations}

`searchKey` はスキャナー固有のソースロケーターであり、Rego パスではありません。その形式はプラットフォームによって異なります。

いくつかのプラットフォームのデフォルトのルールでは、フォーマット文字列内で挿入値を二重中括弧で囲みます (例: <code>sprintf("run=&#123;&#123;%s&#125;&#125;", [run])</code>)。これにより、`run={{checkout}} のようなロケーターが生成されます。`. The platform input patterns include equivalent `concat` or nested `sprintf` 構造は、エディターに貼り付けることができます。

利用可能な最も正確で安定した場所を使用してください。

- 安全でない属性が存在する場合は、その属性を正確に指し示してください。
- 属性が欠落している場合は、それを含むリソースまたはプロパティブロックを指し示してください。
- ファイルに重複するキーが含まれる可能性がある場合は、`={{...}}` で識別値を含めてください。
- ネストされたオブジェクトを報告する際は、ワークロード、タスク、ステージ、ジョブ、またはコンテナの識別情報を含めてください。

`"tasks"` や `"metadata.name"` のような不正確なロケーターは、ファイルに複数のリソースやコンテナが含まれている場合に、誤った行を強調表示する可能性があります。エディターのマーカーを使用して、代表的なサンプルに対して場所を確認してください。

## 共有ライブラリ {#shared-libraries}

カスタムルールは、共通の Datadog ライブラリおよびプラットフォーム固有の Datadog ライブラリをインポートできます。

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

共有ライブラリは、直接的なフィールドアクセスでは再現が困難な動作を処理します。例として、Ansible モジュールのエイリアス、GitHub Actions のトリガー形式、Kubernetes ワークロードの Pod 仕様、Terraform のリソース名、CloudFormation の参照などが挙げられます。

## プラットフォーム入力パターン {#platform-input-patterns}

このセクションの例は、デフォルトルールから得られる本番環境向けのパターンを示しています。エディター内のスターターポリシーは意図的に小さく構成されており、提供されたサンプルのみを処理する場合があります。デフォルトルールで類似のリソースを評価する場合は、プラットフォームヘルパー、ソースの場所、およびリソース相関制約を保持するために、そのルールを複製してください。

### Ansible {#ansible}

Ansible モジュールは、短い名前、完全修飾コレクション名、その他のエイリアスで表示されることがあります。タスクとモジュールのバリエーションを反復処理するには Ansible ライブラリを使用します。

```rego
import data.generic.ansible as ans_lib

canonical := "uri"

some id, task_index
task := ans_lib.tasks[id][task_index]
some variant in ans_lib.variants_for(canonical)
module := task[variant]
ans_lib.checkState(module)
```

`resourceType` として正規のモジュール名を使用し、リソース名に `ans_lib.resource_name` を使用して、タスクとモジュールのバリエーションを `searchKey` に含めます。デフォルトルールでは、多くの場合、次のような単一のフォーマット文字列が使用されます: <code>sprintf("name=&#123;&#123;%s&#125;&#125;.&#123;&#123;%s&#125;&#125;.url", [task.name, variant])</code>。これと同等の構成は次のとおりです。

```rego
"searchKey": sprintf("name=%s.%s.url", [
	concat("", ["{{", task.name, "}}"]),
	concat("", ["{{", variant, "}}"]),
])
```

### CI/CD {#cicd}

CI/CD カスタムルールは、GitHub Actions ワークフローを評価します。ワークフローのトリガーには文字列、配列、オブジェクトを使用できるため、特定の YAML 形式を想定するのではなく、CI/CD ライブラリを使用してください。

```rego
import data.generic.cicd as cicd_lib

some document in input.document
cicd_lib.check_provider(document) == "github"
cicd_lib.has_dangerous_trigger(document)
```

デフォルトルールでは、`github_action`、`github_workflow`、`github_job`、`github_step` などのリソースタイプが使用されます。ステップ値の場合、 <code>sprintf("uses=&#123;&#123;%s&#125;&#125;", [uses])</code> などのリテラルロケーターで正確なソース行を特定します。

### AWS CloudFormation {#aws-cloudformation}

CloudFormation リソースは、`Resources` の下で論理 ID によってキー指定されます。

```rego
import data.generic.cloudformation as cf_lib

some document in input.document
some logical_id, resource in document.Resources
resource.Type == "AWS::S3::Bucket"
```

リソースタイプとして `resource.Type` を、名前として `cf_lib.resource_name(resource, logical_id)` を使用します。欠落しているプロパティは、それを含むブロックにアンカーを設定できます。

```rego
"searchKey": sprintf("Resources.%s.Properties", [logical_id])
```

### Dockerfile {#dockerfile}

Dockerfile の命令は、`document.command` の下でビルドステージごとにグループ化されます。

```rego
import data.generic.dockerfile as dockerfile_lib

some i, stage
instruction := input.document[i].command[stage][_]
instruction.Cmd == "add"
not dockerfile_lib.arrayContains(instruction.Value, {".tar", ".tar."})
```

ロケーターにビルドステージと元の命令を含めます。デフォルトルールでは、多くの場合、 <code>sprintf("FROM=&#123;&#123;%s&#125;&#125;.&#123;&#123;%s&#125;&#125;", [stage, instruction.Original])</code>が使用されます。

```rego
"searchKey": sprintf("FROM=%s.%s", [
	concat("", ["{{", stage, "}}"]),
	concat("", ["{{", instruction.Original, "}}"]),
])
```

### Kubernetes {#kubernetes}

Kubernetes のチェックは、多くの場合、Pod や、Deployment などのワークロード内にネストされた Pod 仕様に適用されます。有効な Pod 仕様を特定するには `spec_info` を使用します。

```rego
import data.generic.k8s as k8s_lib

some document in input.document
spec_info := k8s_lib.spec_info(document)
some container in spec_info.spec.containers
container.securityContext.privileged == true
```

`searchKey` に、ワークロード名、Pod 仕様パス、コンテナ名、および安全でないフィールドを含めます。デフォルトルールでは、多くの場合、 <code>sprintf("metadata.name=&#123;&#123;%s&#125;&#125;.%s.containers.name=&#123;&#123;%s&#125;&#125;.securityContext.privileged", [document.metadata.name, spec_info.path, container.name])</code>が使用されます。

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

初期化コンテナに同じ要件が適用される場合は、`initContainers` を個別にチェックしてください。

### Terraform {#terraform}

Terraform リソースは、リソースタイプとラベルでグループ化されます。

```rego
some i, name
resource := input.document[i].resource.aws_s3_bucket[name]
```

`resourceType` としてプロバイダーリソースタイプを使用します。プラットフォームヘルパーは、`bucket`、`cluster_id`、`name` などのフィールドを使用するリソースの名前を解決できます。

```rego
import data.generic.terraform as tf_lib

"resourceName": tf_lib.resolve_s3_bucket_name(resource, name)
```

Terraform の `searchKey` 値は、通常、リソースタイプとラベルで始まります。

```rego
"searchKey": sprintf("aws_s3_bucket[%s].acl", [name])
```

プロバイダーバージョンによって、構成が別のリソースに移動される場合があります。チェックで複数のプロバイダーバージョン、モジュール、関連リソース、または Terraform プラン JSON をカバーする必要がある場合は、同等のデフォルトルールを出発点として使用してください。明示的な属性値 (`Suspended` のバージョニングステータスなど) のみをチェックするルールでは、欠落しているリソースを検出できません。

## リソースの相関関係 {#resource-correlation}

一部のチェックでは、複数のリソース、モジュール、ジョブ、またはワークロードを比較します。`input.document` 全体にわたる制約のない結合は避けてください。関連のないリソースが関連付けられ、重複した検出結果が生成される可能性があるためです。

既存のルールを適合させる際は、ドキュメント、名前空間、ワークフロー、ビルドステージ、およびリソース参照の制約を維持してください。

## テストカバレッジ {#test-coverage}

少なくとも以下をテストしてください。

- 検出結果を生成する必要がある構成。
- 検出結果を生成してはならない準拠構成。
- 欠落している値および明示的な値 (デフォルト値が重要な場合)。
- 1 つのファイル内の複数のリソース。
- プラットフォームでサポートされている代替構文 (Ansible モジュールのエイリアスや GitHub Actions のトリガー形式など)。
- 別々のスコープにある関連リソース (ルールが相関を行う場合)。

## 検証 {#validation}

エディターは Rego 構文以外もチェックします。サンプルを評価する前に、Datadog はポリシーが[ルールコントラクト](#rule-contract)セクションの要件を満たしているか、さらに以下の条件を満たしているかを確認します。

- `sprintf` 呼び出しで正しい数の引数を使用していること。
- 共通ライブラリおよび選択されたプラットフォームのライブラリでコンパイルできること。
- `http.send` や `opa.runtime` などの制限された組み込み関数を呼び出さないこと。

検出結果がない評価を解釈する前に、報告されたすべてのエラーを修正してください。検証エラーは、ポリシーが正常に実行されなかったことを意味します。

[1]: https://www.openpolicyagent.org/docs/policy-language
[2]: /ja/security/code_security/iac_security/custom_rules/