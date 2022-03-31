---
title: The AWS Integration with Terraform
kind: documentation
further_reading:
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: "Integration"
  text: "AWS Integration"
- link: "https://www.datadoghq.com/blog/managing-datadog-with-terraform/"
  tag: "Blog"
  text: "Managing Datadog with Terraform"
- link: "https://docs.datadoghq.com/integrations/faq/how-to-import-datadog-resources-into-terraform/"
  tag: "FAQ"
  text: "Importing Datadog resources into Terraform"
- link: "https://www.datadoghq.com/blog/aws-monitoring/"
  tag: "Blog"
  text: "Key metrics for AWS monitoring"
- link: "https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog/"
  tag: "Blog"
  text: "How to monitor EC2 instances with Datadog"
- link: 'https://www.datadoghq.com/blog/datadog-serverless-view/'
  tag: 'Blog'
  text: 'Monitor your entire serverless stack in the Serverless view'
---

You can use [Terraform][1] to install and manage the AWS integration with Datadog. The sections below detail the requirements, and provide basic templates for creating resources in Datadog.

## Setup Terraform provider

Configure the [Datadog Terraform provider][2] with your Datadog [API and Application keys][3]. These allow the Terraform provider to access your Datadog account and create resources through Datadog APIs.

## Setup Datadog integration IAM role

Configure permissions for the IAM role used by Datadog to query AWS APIs on your behalf. Use [All Permissions][4] to take advantage of every AWS integration offered by Datadog. As other components are added to an integration, these permissions may change. If you would like to use Datadog’s Cloud Security Posture Management product, you must also add additional permissions by attaching the AWS [SecurityAudit Policy][5] to the role. 

The script below creates the Datadog IAM policy inside your AWS account. Update these parameters before running the script:

* `YOUR_DD_EXTERNAL_ID`: A unique ID located in your [Datadog AWS Integration tile][6].
* `AWS_PERMISSIONS_LIST`: The IAM policies needed by Datadog AWS integrations. 

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="true" >}}
variable "datadog_aws_integration_external_id" {
  default = "<YOUR_DD_EXTERNAL_ID>"
  description = ""
}

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
        "${var.datadog_aws_integration_external_id}"
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
{{< /code-block >}}

## Create resources

Use templates to create and manage the Datadog - Amazon Web Services integration.

### Datadog - Amazon Web Services integration

Provides a Datadog - Amazon Web Services integration resource. This can be used to create and manage the Datadog - Amazon Web Services integration.

#### Example usage

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="true" >}}
resource "datadog_integration_aws" "sandbox" {
  account_id  = "1234567890"
  role_name   = "DatadogAWSIntegrationRole"
  filter_tags = ["key:value"]
  host_tags   = ["key:value", "key2:value2"]
  account_specific_namespace_rules = {
    auto_scaling = false
    opsworks     = false
  }
  excluded_regions = ["us-east-1", "us-west-2"]
}
{{< /code-block >}}
Find additional information on the Terraform registry:

- [Schema][7]
- [Import Command][8] 

### Datadog - Amazon Web Services integration Lambda ARN

Provides a Datadog - Amazon Web Services integration Lambda ARN resource. This can be used to create and manage the log collection Lambdas for an account.
Update operations are currently not supported with the Datadog API so any change forces a new resource.

#### Example usage

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="true" >}}
resource "datadog_integration_aws_lambda_arn" "main_collector" {
  account_id = "1234567890"
  lambda_arn = "arn:aws:lambda:us-east-1:1234567890:function:datadog-forwarder-Forwarder"
}
{{< /code-block >}}
Find additional information on the Terraform registry:

- [Schema][9]
- [Import Command][10] 

### Datadog - Amazon Web Services integration log collection

Provides a Datadog - Amazon Web Services integration log collection resource. This can be used to manage which AWS services logs are collected from for an account.

#### Example usage

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="true" >}}
resource "datadog_integration_aws_log_collection" "main" {
  account_id = "1234567890"
  services   = ["lambda"]
}
{{< /code-block >}}
Find additional information on the Terraform registry:

- [Schema][11]
- [Import Command][12] 

### Datadog - Amazon Web Services tag filter

Provides a Datadog AWS tag filter resource. This can be used to create and manage Datadog AWS tag filters.

#### Example usage

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="true" >}}
resource "datadog_integration_aws_tag_filter" "foo" {
  account_id     = "123456789010"
  namespace      = "sqs"
  tag_filter_str = "key:value"
}
{{< /code-block >}}

Find additional information on the Terraform registry:

- [Schema][13]
- [Import Command][14] 

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.terraform.io
[2]: /integrations/terraform/#configuration
[3]: /account_management/api-app-keys/
[4]: /integrations/amazon_web_services/?tab=roledelegation#all-permissions
[5]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[6]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws#schema
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws#import
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_lambda_arn#schema
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_lambda_arn#import
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_log_collection#schema
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_log_collection#import
[13]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_tag_filter#schema
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_tag_filter#import
