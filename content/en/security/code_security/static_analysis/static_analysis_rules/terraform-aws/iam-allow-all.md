---
aliases:
- /continuous_integration/static_analysis/rules/terraform-aws/iam-allow-all
- /static_analysis/rules/terraform-aws/iam-allow-all
dependencies: []
disable_edit: true
group_id: terraform-aws
meta:
  category: Security
  id: terraform-aws/iam-allow-all
  language: Terraform
  severity: Warning
  severity_rank: 2
title: IAM policy should be scoped
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `terraform-aws/iam-allow-all`

**Language:** Terraform

**Severity:** Warning

**Category:** Security

## Description
The IAM policy should be scoped rule is crucial to ensure the principle of least privilege (PoLP). This means that IAM entities (users, groups, and roles) should have only the necessary permissions to perform their tasks, and no more. Overly permissive policies, like granting all actions (`"*"`) on all resources (`"*"`), can lead to unintended access, escalating privilege issues, and potential security vulnerabilities.

The importance of this rule lies in its role in maintaining a secure and manageable permission model. By scoping IAM policies, you can minimize the potential damage if an IAM entity is compromised. It also simplifies auditing and understanding the access that a particular entity has.

To adhere to this rule, avoid using wildcards for both actions and resources in your IAM policies. Instead, specify the necessary actions and resources that the IAM entity needs to access. For instance, if an IAM role only needs to read objects in a specific S3 bucket, grant only the `s3:GetObject` action on that bucket. This way, even if this role is compromised, the attacker cannot perform other actions or access other resources.

## Non-Compliant Code Examples
```terraform
data "aws_iam_policy_document" "failed" {
  version = "2012-10-17"

  statement {
    effect = "Allow"
    resources = [
      "*",
    ]
    actions = [
      "*"
    ]
  }
}
```

```terraform
data "aws_iam_policy_document" "failed" {
  version = "2012-10-17"

  statement {
    effect = "Allow"
    actions = [
      "*"
    ]
    resources = [
      "*",
    ]
  }
}
```

## Compliant Code Examples
```terraform
data "aws_iam_policy_document" "pass" {
  version = "2012-10-17"

  statement {
    effect = "Allow"
    actions = [
      "s3:Describe*",
    ]
    resources = [
      "*",
    ]
  }
}
```

```terraform
data "aws_iam_policy_document" "no_effect" {
  version = "2012-10-17"

  statement {
    actions = [
      "*"
    ]
    resources = [
      "*",
    ]
  }
}
```
