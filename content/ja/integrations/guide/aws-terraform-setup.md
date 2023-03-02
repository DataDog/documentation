---
aliases:
- /ja/integrations/faq/aws-integration-with-terraform/
disable_toc: true
further_reading:
- link: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
  tag: ブログ
  text: Datadog を Terraform で管理する
kind: ガイド
title: AWS と Terraform のインテグレーション
---

[Terraform][1] を使うと、Datadog IAM ロール、ポリシードキュメント、Datadog-AWS インテグレーションを 1 つの `terraform apply` コマンドで作成することが可能です。


1. [Datadog Terraform プロバイダー][2]を構成し、Terraform の構成で Datadog API と対話するように設定します。

2. 以下の例を基本テンプレートとして、Terraform の構成ファイルを設定します。変更を適用する前に、以下のパラメーターを確実に更新してください。
    * `AWS_PERMISSIONS_LIST`: Datadog AWS インテグレーションが必要とする IAM ポリシー。現在のリストは、[Datadog AWS インテグレーション][3]のドキュメントで確認できます。
    * `AWS_ACCOUNT_ID`: AWS アカウント ID。

さらなる使用例やオプションパラメーターの全リスト、Datadog の追加リソースについては、[Terraform Registry][4] を参照してください。

```hcl
data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "AWS"
      identifiers = ["arn:aws:iam::464622532012:root"]
    }
    condition {
      test = "StringEquals"
      variable = "sts:ExternalId"

      values = [
        "${datadog_integration_aws.sandbox.external_id}"
      ]
    }
  }
}

data "aws_iam_policy_document" "datadog_aws_integration" {
  statement {
    actions = [<AWS_PERMISSIONS_LIST>]

    resources = ["*"]
  }
}

resource "aws_iam_policy" "datadog_aws_integration" {
  name = "DatadogAWSIntegrationPolicy"
  policy = "${data.aws_iam_policy_document.datadog_aws_integration.json}"
}

resource "aws_iam_role" "datadog_aws_integration" {
  name = "DatadogAWSIntegrationRole"
  description = "Role for Datadog AWS Integration"
  assume_role_policy = "${data.aws_iam_policy_document.datadog_aws_integration_assume_role.json}"
}

resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  role = "${aws_iam_role.datadog_aws_integration.name}"
  policy_arn = "${aws_iam_policy.datadog_aws_integration.arn}"
}

resource "datadog_integration_aws" "sandbox" {
  account_id  = "<AWS_ACCOUNT_ID>"
  role_name   = "DatadogAWSIntegrationRole"
}
```

3. `terraform apply` を実行します。データ収集が開始されるまで最大 10 分待ち、すぐに使える [AWS 概要ダッシュボード][5]を表示し、AWS サービスやインフラストラクチャーから送信されるメトリクスを確認します。

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.terraform.io
[2]: https://docs.datadoghq.com/ja/integrations/terraform/#overview
[3]: /ja/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
[5]: https://app.datadoghq.com/screen/integration/7/aws-overview