---
aliases:
- /continuous_integration/static_analysis/rules/terraform-aws/aws-elasticache-no-encryption
- /static_analysis/rules/terraform-aws/aws-elasticache-no-encryption
dependencies: []
disable_edit: true
group_id: terraform-aws
meta:
  category: Security
  id: terraform-aws/aws-elasticache-no-encryption
  language: Terraform
  severity: Warning
  severity_rank: 2
title: Ensure encryption is used for Elasticache
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `terraform-aws/aws-elasticache-no-encryption`

**Language:** Terraform

**Severity:** Warning

**Category:** Security

## Description
This rule is designed to ensure that traffic to and from your Elasticache instances is encrypted in transit, providing an additional layer of security to your data. Encryption is critical in protecting sensitive data from unauthorized access and potential data breaches. When transit encryption is enabled, all communication between clients and the server, as well as between the replication group nodes, is encrypted. 

The importance of this rule lies in its ability to protect your sensitive data from being exposed during transmission. If your Elasticache data is intercepted while in transit and it's not encrypted, the data could be read and used maliciously. This could have serious implications for your business, including loss of customer trust, regulatory penalties, and financial losses.

To adhere to this rule, make sure to set the `transit_encryption_enabled` attribute to `true` in your `aws_elasticache_replication_group` resource. This ensures that all data transmitted to and from your Elasticache instances is encrypted. Remember, security should be a primary concern in your code and infrastructure, and enabling encryption is a simple and effective way to enhance the security of your data.

## Non-Compliant Code Examples
```terraform
resource "aws_elasticache_replication_group" "example" {
    replication_group_id = "foo"
    replication_group_description = "bar"
}
```

```terraform
resource "aws_elasticache_replication_group" "example" {
    replication_group_id = "foo"
    replication_group_description = "bar"
    transit_encryption_enabled = false
}
```

## Compliant Code Examples
```terraform
resource "aws_elasticache_replication_group" "example" {
    replication_group_id = "foo"
    replication_group_description = "bar"
    transit_encryption_enabled = true
}
```
