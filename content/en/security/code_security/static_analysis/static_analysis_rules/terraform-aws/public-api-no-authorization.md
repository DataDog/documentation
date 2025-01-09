---
aliases:
- /continuous_integration/static_analysis/rules/terraform-aws/public-api-no-authorization
- /static_analysis/rules/terraform-aws/public-api-no-authorization
dependencies: []
disable_edit: true
group_id: terraform-aws
meta:
  category: Security
  id: terraform-aws/public-api-no-authorization
  language: Terraform
  severity: Warning
  severity_rank: 2
title: Public API must have authorization
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `terraform-aws/public-api-no-authorization`

**Language:** Terraform

**Severity:** Warning

**Category:** Security

## Description
This rule mandates that all public APIs must have an authorization mechanism in place. The authorization attribute in the `aws_api_gateway_method` resource determines the authorization type for the API method. When it's set to "NONE", it means that the API is public and can be accessed by anyone, which is a major security risk.

The importance of this rule lies in its potential to prevent unauthorized access to your APIs. APIs often provide a gateway to sensitive information and systems, and leaving them unprotected can lead to data breaches, system disruptions, and other serious issues. 

To avoid violating this rule, always ensure that your APIs have an appropriate level of authorization. In the AWS API Gateway, for instance, you can set the authorization to "AWS_IAM" to use AWS Identity and Access Management (IAM) for authorization. This ensures that only authenticated and authorized users can access your APIs. Here is an example of how to do this: `resource "aws_api_gateway_method" "compliantapi" { authorization = "AWS_IAM" http_method = "GET" }`. Always ensure to review the authorization settings of your APIs to conform to best security practices.

## Non-Compliant Code Examples
```terraform
resource "aws_api_gateway_method" "noncompliantapi" {
  authorization = "NONE"
  http_method   = "GET"
}
```

## Compliant Code Examples
```terraform
resource "aws_api_gateway_method" "compliantapi" {
  authorization = "AWS_IAM"
  http_method   = "GET"
}
```
