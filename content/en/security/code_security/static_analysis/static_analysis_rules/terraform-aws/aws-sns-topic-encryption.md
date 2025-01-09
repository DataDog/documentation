---
aliases:
- /continuous_integration/static_analysis/rules/terraform-aws/aws-sns-topic-encryption
- /static_analysis/rules/terraform-aws/aws-sns-topic-encryption
dependencies: []
disable_edit: true
group_id: terraform-aws
meta:
  category: Security
  id: terraform-aws/aws-sns-topic-encryption
  language: Terraform
  severity: Warning
  severity_rank: 2
title: Check that SNS topics are encrypted
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `terraform-aws/aws-sns-topic-encryption`

**Language:** Terraform

**Severity:** Warning

**Category:** Security

## Description
This rule checks that all Simple Notification Service (SNS) topics created in your Terraform scripts are encrypted using a Key Management Service (KMS) key. SNS is a web service that coordinates and manages the delivery or sending of messages to subscribing endpoints or clients. As such, it is crucial to ensure that all messages sent via SNS topics are encrypted to protect sensitive data from unauthorized access.

Encryption is an essential step in securing your AWS SNS topics. Without encryption, any data sent through your SNS topics is vulnerable to interception and unauthorized access. This can lead to data breaches and non-compliance with data protection regulations.

To avoid violating this rule, ensure that you specify a `kms_master_key_id` for each `aws_sns_topic` in your Terraform scripts. This key ID should reference a valid AWS KMS key that you have permissions to use. By doing so, you ensure that all messages sent through your SNS topics are encrypted using the specified KMS key. This is a best practice for maintaining the security and integrity of your data.

## Non-Compliant Code Examples
```terraform
resource "aws_sns_topic" "default" {
  name = "example"
}
```

## Compliant Code Examples
```terraform
resource "aws_sns_topic" "default" {
  name = "example"

  kms_master_key_id = "aws_kms_key.arn"
}
```
