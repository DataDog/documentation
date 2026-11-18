---
algolia:
  tags:
  - iac security
  - infrastructure as code
  - custom rule
  - rego
description: Rego を使用して、カスタム Infrastructure as Code Security ルールを作成、テスト、公開します。
further_reading:
- link: https://www.datadoghq.com/blog/custom-iac-security-rules/
  tag: ブログ
  text: Datadog IaC Security スキャンでのカスタムルールの適用
- link: /security/mcp_server/
  tag: ドキュメント
  text: Datadog MCP Server Security ツール
title: IaC カスタムルール
---
組織固有の要件を適用するためのカスタム Security ルールを作成します。

カスタムルールは Open Policy Agent (OPA) のポリシー言語である [Rego][1] を使用し、IaC スキャン中にデフォルトの Datadog ルールと並行して実行されます。*ルール* は保存されたオブジェクト (メタデータ、サンプル、説明) であり、*ポリシー* はエディターで評価される Rego ブロックです。

カスタムルールは、以下のプラットフォームで利用可能です。

- Ansible
- CI/CD (GitHub Actions)
- AWS CloudFormation
- Dockerfile
- Kubernetes
- Terraform

カスタムルールの作成、編集、または公開には、`appsec_vm_write` 権限が必要です。詳細については、[ロールベースの Access Control][6] を参照してください。ルールコントラクト、パースされた入力、およびプラットフォーム固有のパターンに関する詳細については、[IaC カスタムルールリファレンス][2]を参照してください。

カスタムルールを作成するには、既存のルールをクローンする方法と、一からルールを作成する方法の 2 つのオプションがあります。Datadog MCP Server に接続された AI エージェントを使用することもできます。[MCP を使用したルールの作成と管理](#create-and-manage-rules-with-mcp)を参照してください。

## 既存のルールのクローン {#clone-an-existing-rule}

既存のチェックを修正したい場合、既存のルールと同じリソースタイプを評価したい場合、またはプラットフォーム固有のパース、リソースの命名、ソースコードの場所のために共有 Datadog Rego ライブラリを使用したい場合は、デフォルトのルールをクローンします。

1. IaC ルールページで、同じプラットフォームおよびリソースタイプのデフォルトルールまたはカスタムルールを見つけ、ルールの操作メニューから {{< ui >}}Clone{{< /ui >}} を選択します。
1. コピーされたメタデータ、ポリシー、サンプルファイル、および説明を更新します。
1. {{< ui >}}Save as draft{{< /ui >}} をクリックして公開せずにルールを保存するか、{{< ui >}}Save and publish{{< /ui >}} をクリックしてルールをすぐに公開します。

   ドラフトルールはスキャンでは実行されません。ドラフトを後で公開するには、IaC Rules ページからそれを開き、公開します。

デフォルトでは、公開されたルールは、指定されたプラットフォームが適用される後続の IaC スキャンで実行されます。ルールの適用方法を微調整するには、[IaC Security Configuration][5] を参照してください。

## ルールの一から作成 {#create-a-rule-from-scratch}

特定の用途に特化したチェックが必要で、プラットフォームのパース構造を理解している場合は、ルールを一から作成します。エディターには、スターターポリシーとサンプルファイルが用意されています。

この例では、ステータスが明示的に `Suspended` に設定されている `aws_s3_bucket_versioning` リソースを検出する Terraform ルールを作成します。このルールは、セキュアでない属性を報告し、推奨される修正方法を提供します。

この手順は、どのプラットフォームにも適用されます。サンプルファイルと Rego ポリシーのみが変更されます。

### ルールの命名と構成 {#name-and-configure-the-rule}

1. IaC Rules ページで、{{< ui >}}Create rule{{< /ui >}} をクリックします。
1. ルール名を入力し、プラットフォーム、カテゴリ、重大度を選択します。

   オプションで **AWS** をプロバイダーとして設定し、Common Weakness Enumeration (CWE) 識別子を指定できます。

### サンプルファイルの追加 {#add-a-sample-file}

サンプルファイルはポリシーが実行される対象の入力であるため、検出したい設定ミスが含まれている必要があります。このルールについては、{{< ui >}}Test your policy{{< /ui >}} の下にあるスターターサンプルを次のように置き換えます。

```hcl
resource "aws_s3_bucket" "reports" {
  bucket = "example-reports-bucket"
}

resource "aws_s3_bucket_versioning" "reports" {
  bucket = aws_s3_bucket.reports.id

  versioning_configuration {
    status = "Suspended"
  }
}
```

Datadog は `input.document[i].resource` の下にある Terraform リソースをパースし、リソースタイプとリソースラベルごとにグループ化します。このルールでは、以下の方法でバージョニングリソースを選択できます。

```rego
some i, name
versioning := input.document[i].resource.aws_s3_bucket_versioning[name]
```

この式では、`i` はパースされたドキュメントを識別し、`name` は Terraform リソースラベルである `reports` です。

### 検出条件の記述 {#write-the-detection-condition}

検出条件とは、ルールが検出結果を報告するために真である必要がある式のことです。このルールは、バージョニングステータスが `Suspended` の場合に検出結果を生成します。

```rego
versioning.versioning_configuration.status == "Suspended"
```

ステータスフィールドがない場合、ルールは検出結果を報告しません。詳細については、[パースされた入力][3]を参照してください。

### 検出結果の作成 {#build-the-finding}

検出結果とは、検出条件が一致したときに Datadog が報告する内容です。これは、どのリソースが影響を受けているか、ソースのどこにあるか、そしてどのように修正するかを特定します。各要素を組み合わせて、完全なポリシーを作成します。

このポリシーの例には 4 つの部分があります。

-  検出条件を `DatadogPolicy` ルールでラップします。
-  各 `aws_s3_bucket_versioning` リソースを選択します。
-  ステータスが `Suspended` の場合のみ、検出結果を報告します。
-  推奨される修正方法を含む 4 つの必須フィールドを持つ `result` オブジェクトを追加します。

このポリシーはまた、リソース名の共有ライブラリ、正確な `searchKey`、および `replacement` 修正という 3 つの一般的なプラクティスに従っています。

{{< ui >}}Rego policy{{< /ui >}} の下で、スターターポリシーを次のように置き換えます。

```rego
package datadog

import data.generic.terraform as tf_lib

DatadogPolicy contains result if {
	some i, name
	versioning := input.document[i].resource.aws_s3_bucket_versioning[name]
	versioning.versioning_configuration.status == "Suspended"

	result := {
		"documentId": input.document[i].id,
		"resourceType": "aws_s3_bucket_versioning",
		"resourceName": tf_lib.resolve_s3_bucket_name(versioning, name),
		"searchKey": sprintf("aws_s3_bucket_versioning[%s].versioning_configuration.status", [name]),
		"remediation": json.marshal({
			"before": "Suspended",
			"after": "Enabled",
		}),
		"remediationType": "replacement",
	}
}
```

### ルールのテスト {#test-the-rule}

1. {{< ui >}}Run{{< /ui >}} をクリックします。
1.  エディターが `status` 属性に対して 1 つの検出結果を報告することを確認します。
1.  サンプル内の `status` を `Suspended` から `Enabled` に変更します。
1. {{< ui >}}Run{{< /ui >}} をクリックし、ポリシーが検出結果を報告しないことを確認します。
1. `status` を `Suspended` に復元し、例を保存する前にポリシーを再度実行します。

エディターが評価結果の代わりにエラーを報告する場合は、[検証][4] を参照してください。

### ルールの説明 {#describe-the-rule}

{{< ui >}}Say what's happening{{< /ui >}} フィールドを使用して、説明や修復のアドバイスを提供します。例:

```markdown
## Description

Suspending S3 bucket versioning prevents new object versions from being created and reduces protection against accidental deletion or overwrite.

## Remediation

Set `versioning_configuration.status` to `Enabled`.
```

### ルールの保存 {#save-the-rule}

- {{< ui >}}Save as draft{{< /ui >}} をクリックして、ルールを公開せずに保存します。ドラフトルールはスキャンでは実行されません。ドラフトを後で公開するには、IaC Rules ページからそれを開き、公開します。
- {{< ui >}}Save and publish{{< /ui >}} をクリックして、ルールをすぐに公開します。

デフォルトでは、公開されたルールは、指定されたプラットフォームが適用される後続の IaC スキャンで実行されます。ルールの適用方法を微調整するには、[IaC Security Configuration][5] を参照してください。

## MCP を使用したルールの作成と管理 {#create-and-manage-rules-with-mcp}

AI エージェントを [Datadog MCP Server][7] に接続して、自然言語による説明や独自の Rego から IaC カスタムルールを生成、検証、作成、更新、公開、削除します。[MCP Server に接続][8]する際に、`security` ツールセットを有効にします。利用可能なツールと必要な権限の一覧については、Datadog MCP Server セキュリティツールリファレンスの [Infrastructure as Code カスタムルール][9] を参照してください。

## ルールのリビジョン {#rule-revisions}

ルールを編集すると、新しいリビジョンが作成されます。ルールの詳細パネルから、次の操作を行えます。

- ルールのリビジョン履歴の確認
- 任意の 2 つのリビジョンを比較して変更点を確認
- 以前のリビジョンを復元してルールの現在の状態にする

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.openpolicyagent.org/docs/policy-language
[2]: /ja/security/code_security/iac_security/custom_rules/guide/
[3]: /ja/security/code_security/iac_security/custom_rules/guide/#parsed-input
[4]: /ja/security/code_security/iac_security/custom_rules/guide/#validation
[5]: /ja/security/code_security/iac_security/configuration/#rule-configuration
[6]: /ja/account_management/rbac/permissions/#cloud-security-platform
[7]: /ja/mcp_server/
[8]: /ja/security/mcp_server/#quickstart
[9]: /ja/security/mcp_server/#infrastructure-as-code-custom-rules