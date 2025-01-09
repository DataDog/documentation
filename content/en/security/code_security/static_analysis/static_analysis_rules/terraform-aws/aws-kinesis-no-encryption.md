---
aliases:
- /continuous_integration/static_analysis/rules/terraform-aws/aws-kinesis-no-encryption
- /static_analysis/rules/terraform-aws/aws-kinesis-no-encryption
dependencies: []
disable_edit: true
group_id: terraform-aws
meta:
  category: Security
  id: terraform-aws/aws-kinesis-no-encryption
  language: Terraform
  severity: Warning
  severity_rank: 2
title: Ensure encryption is used for Kinesis
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `terraform-aws/aws-kinesis-no-encryption`

**Language:** Terraform

**Severity:** Warning

**Category:** Security

## Description
This rule is designed to ensure that encryption is enabled for your AWS Kinesis data streams. Encryption in transit is a vital security measure that protects your data from unauthorized access as it moves from one location to another. Without it, your sensitive data could be exposed to potential threats. 

The importance of this rule cannot be overstated. In today's digital landscape, data breaches are increasingly common and can have significant impacts on your organization's reputation and bottom line. Therefore, enabling encryption for your Kinesis data streams is a crucial step in safeguarding your data. 

To avoid violating this rule, ensure that you specify the `encryption_type` attribute in your `aws_kinesis_stream` resource block and set it to `KMS`. This enables AWS Key Management Service (KMS) encryption for your data stream. An example of compliant code would be: 
```resource "aws_kinesis_stream" "mystream" {
    encryption_type = "KMS"
}```. By adhering to this practice, you can keep your data secure and maintain compliance with this Terraform static analysis rule.

## Non-Compliant Code Examples
```terraform
resource "aws_kinesis_stream" "mystream" {   
}
```

```terraform
resource "aws_kinesis_stream" "mystream" {
    encryption_type = "NONE"
}
```

## Compliant Code Examples
```terraform
resource "aws_kinesis_stream" "mystream" {
    encryption_type = "KMS"
}
```
