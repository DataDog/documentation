---
title: The AWS Integration with Terraform
kind: faq
further_reading:
- link: "https://www.datadoghq.com/blog/managing-datadog-with-terraform/"
  tag: "Blog"
  text: "Managing Datadog with Terraform"
---

If you use [Terraform][1], the script below creates the Datadog IAM policy inside your AWS account. Update these parameters before running the script:

* `YOUR_DD_EXTERNAL_ID`: A unique ID located in your [Datadog AWS Integration tile][2].
* `AWS_PERMISSIONS_LIST`: The IAM policies needed by Datadog AWS integrations. The current list is available in the [Datadog AWS integration][3] documentation.

```hcl
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
```

[1]: https://www.terraform.io
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: /integrations/amazon_web_services/?tab=manual#all-permissions
