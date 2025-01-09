---
aliases:
- /continuous_integration/static_analysis/rules/terraform-aws/iam-all-privileges
- /static_analysis/rules/terraform-aws/iam-all-privileges
dependencies: []
disable_edit: true
group_id: terraform-aws
meta:
  category: Security
  id: terraform-aws/iam-all-privileges
  language: Terraform
  severity: Error
  severity_rank: 1
title: Do not allow all privilages
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `terraform-aws/iam-all-privileges`

**Language:** Terraform

**Severity:** Error

**Category:** Security

## Description
This rule is designed to prevent the assignment of all privileges to a single IAM policy in AWS, which is considered a high security risk. Allowing all privileges or actions can potentially expose the resources to unwanted manipulations or data breaches. This is especially important when managing access control for S3 buckets, which often store sensitive data.

This rule plays an important role in enforcing the principle of least privilege (PoLP), a computer security concept in which a user is given the minimum levels of access necessary to complete his or her job functions. This minimizes the potential damage that can result from error, unauthorized use, or compromise of user accounts.

To adhere to this rule, instead of using a wildcard (*) to denote all actions, specify the exact actions that the IAM policy should allow. For example, instead of using `"Action": ["*"]` in your IAM policy, use `"Action": ["s3:GetObject"]` to only allow the specific action of getting an object from an S3 bucket. This way, you can ensure that the IAM policy only has the privileges it needs, and no more.

## Non-Compliant Code Examples
```terraform
resource "aws_iam_policy" "mypolicy" {
  name = "mypolicyname"

  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Action   = [
          "*"
        ]
        Effect   = "Allow"
        Resource = [
          mybucket
        ]
      }
    ]
  })
}
```

## Compliant Code Examples
```terraform
resource "aws_iam_policy" "mypolicy" {
  name = "mypolicyname"

  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Action   = [
          "s3:GetObject"
        ]
        Effect   = "Allow"
        Resource = [
          mybucket
        ]
      }
    ]
  })
}
```
