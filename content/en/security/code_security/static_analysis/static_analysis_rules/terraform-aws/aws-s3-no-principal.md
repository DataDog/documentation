---
aliases:
- /continuous_integration/static_analysis/rules/terraform-aws/aws-s3-no-principal
- /static_analysis/rules/terraform-aws/aws-s3-no-principal
dependencies: []
disable_edit: true
group_id: terraform-aws
meta:
  category: Security
  id: terraform-aws/aws-s3-no-principal
  language: Terraform
  severity: Warning
  severity_rank: 2
title: Specify the principal for S3 buckets
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `terraform-aws/aws-s3-no-principal`

**Language:** Terraform

**Severity:** Warning

**Category:** Security

## Description
This rule pertains to the specification of principals in the policy of S3 buckets in AWS. The principal is a crucial aspect of any AWS policy as it defines who is allowed to access the resource, in this case, the S3 bucket. It is important because specifying a broad principal such as '*' opens the bucket to access from any AWS account, which can be a serious security risk.

Non-compliance with this rule can lead to unauthorized access to your S3 buckets and potential data breaches. You should always specify a principal that is as narrow as possible to limit access to only those entities that absolutely need it. 

To adhere to this rule, ensure that you specify a specific AWS Amazon Resource Name (ARN) instead of using a wildcard ('*'). This way, you grant access only to the specified AWS account or user. For instance, instead of `Principal = { AWS = "*" }`, use `Principal = { AWS = ["arn:aws:iam::something:user"] }`. This helps you maintain the security of your AWS resources while ensuring that only authorized entities have access.

## Non-Compliant Code Examples
```terraform
resource "aws_s3_bucket_policy" "mypolicy" {
  bucket = aws_s3_bucket.mybucket.id
  policy = jsonencode({
    Id = "something"
    Version = "2012-10-17"
    Statement = [{
            Effect = "Allow"
            Principal = {
                AWS = "*"
            }
            Action = [
                "s3:PutObject"
            ]
            Resource: "${aws_s3_bucket.mybucket.arn}/*"
        }
    ]
  })
}
```

## Compliant Code Examples
```terraform
resource "aws_s3_bucket_policy" "mypolicy" {
  bucket = aws_s3_bucket.mybucket.id
  policy = jsonencode({
    Id = "something"
    Version = "2012-10-17"
    Statement = [{
            Effect = "Allow"
            Principal = {
                AWS = [
                    "arn:aws:iam::something:user"
                ]
            }
            Action = [
                "s3:PutObject"
            ]
            Resource: "${aws_s3_bucket.mybucket.arn}/*"
        }
    ]
  })
}
```
