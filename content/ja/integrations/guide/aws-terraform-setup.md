---
title: The AWS Integration with Terraform
kind: guide
aliases:
    - /integrations/faq/aws-integration-with-terraform/
disable_toc: true
further_reading:
- link: "https://www.datadoghq.com/blog/managing-datadog-with-terraform/"
  tag: Blog
  text: Managing Datadog with Terraform
---

Using [Terraform][1], you can create the Datadog IAM role, policy document, and the Datadog-AWS integration with a single `terraform apply` command.


1. Configure the [Datadog Terraform provider][2] to interact with the Datadog API through a Terraform configuration.

{{< site-region region="us,us3,us5,eu" >}}

2. Set up your Terraform configuration file using the example below as a base template. Ensure to update the following parameters before you apply the changes:
   * `AWS_PERMISSIONS_LIST`: The IAM policies needed by Datadog AWS integrations. The current list is available in the [Datadog AWS integration][1] documentation.
   * `AWS_ACCOUNT_ID`: Your AWS account ID.

   See the [Datadog AWS integration resource][2] page in the Terraform registry for further example usage and the full list of optional parameters, as well as additional Datadog resources.

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

2. Set up your Terraform configuration file using the example below as a base template. Ensure to update the following parameters before you apply the changes:
   * `AWS_PERMISSIONS_LIST`: The IAM policies needed by Datadog AWS integrations. The current list is available in the [Datadog AWS integration][1] documentation.
   * `AWS_ACCOUNT_ID`: Your AWS account ID.

   See the [Terraform Registry][2] for further example usage and the full list of optional parameters, as well as additional Datadog resources.

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

[1]: /integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="gov" >}}

2. If you are using access keys to install the Datadog AWS integration, ensure that you have created an IAM user with the [necessary permissions][1] and access key as described in the [AWS manual setup guide][3]. Add your access key ID and secret access key to the placeholders in the example below. For information about using Terraform to set up the AWS user and associated access key, see the [AWS Provider][2] resources in the Terraform Registry.

   ```
   resource "datadog_integration_aws" "sandbox" {
      access_key_id = "<ACCESS_KEY_ID>"
      secret_access_key = "<SECRET_ACCESS_KEY>"
   }
   ```

[1]: /integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly#aws-integration-iam-policy
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs
[3]: /integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly#aws
{{< /site-region>}}

3. Run `terraform apply`. Wait up to 10 minutes for data to start being collected, and then view the out-of-the-box [AWS overview dashboard][5] to see metrics sent by your AWS services and infrastructure.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.terraform.io
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[5]: https://app.datadoghq.com/screen/integration/7/aws-overview
