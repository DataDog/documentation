---
aliases:
- /ja/integrations/faq/aws-integration-with-terraform/
disable_toc: true
further_reading:
- link: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
  tag: ブログ
  text: Datadog を Terraform で管理する
title: AWS と Terraform のインテグレーション
---

[Terraform][1] を使うと、Datadog IAM ロール、ポリシードキュメント、Datadog-AWS インテグレーションを 1 つの `terraform apply` コマンドで作成することが可能です。


1. [Datadog Terraform プロバイダー][2]を構成し、Terraform の構成で Datadog API と対話するように設定します。

{{< site-region region="us,us3,us5,eu" >}}

2. 以下の例を基本テンプレートとして、Terraform の構成ファイルを設定します。変更を適用する前に、以下のパラメーターを確実に更新してください。
   * `AWS_PERMISSIONS_LIST`: Datadog AWS インテグレーションが必要とする IAM ポリシー。現在のリストは、[Datadog AWS インテグレーション][1]のドキュメントで確認できます。
   * `AWS_ACCOUNT_ID`: AWS アカウント ID。

   さらなる使用例やオプションパラメーターの全リスト、Datadog の追加リソースについては、Terraform レジストリの [Datadog AWS インテグレーションリソース][2]ページを参照してください。

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

   [1]: /integrations/amazon_web_services/?tab=manual#aws-iam-permissions
   [2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="ap1" >}}

2. 以下の例を基本テンプレートとして、Terraform の構成ファイルを設定します。変更を適用する前に、以下のパラメーターを確実に更新してください。
   * `AWS_PERMISSIONS_LIST`: Datadog AWS インテグレーションが必要とする IAM ポリシー。現在のリストは、[Datadog AWS インテグレーション][1]のドキュメントで確認できます。
   * `AWS_ACCOUNT_ID`: AWS アカウント ID。

   さらなる使用例やオプションパラメーターの全リスト、Datadog の追加リソースについては、[Terraform Registry][2] を参照してください。

   ```hcl
   data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
      statement {
      actions = ["sts:AssumeRole"]

      principals {
         type = "AWS"
         identifiers = ["arn:aws:iam::417141415827:root"]
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

[1]: /ja/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="gov" >}}

2. アクセスキーを使用して Datadog AWS インテグレーションをインストールする場合、[AWS マニュアルセットアップガイド][3]で説明されているように、[必要な権限][1]とアクセスキーを持つ IAM ユーザーを作成したことを確認してください。以下の例のプレースホルダーにアクセスキー ID とシークレットアクセスキーを追加します。Terraform を使用して AWS ユーザーと関連するアクセスキーを設定する方法については、Terraform Registry の [AWS Provider][2] リソースを参照してください。

   ```
   resource "datadog_integration_aws" "sandbox" {
      access_key_id = "<ACCESS_KEY_ID>"
      secret_access_key = "<SECRET_ACCESS_KEY>"
   }
   ```

[1]: /ja/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly#aws-integration-iam-policy
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs
[3]: /ja/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly#aws
{{< /site-region>}}

3. `terraform apply` を実行します。データ収集が開始されるまで最大 10 分待ち、すぐに使える [AWS 概要ダッシュボード][5]を表示し、AWS サービスやインフラストラクチャーから送信されるメトリクスを確認します。

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.terraform.io
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[5]: https://app.datadoghq.com/screen/integration/7/aws-overview