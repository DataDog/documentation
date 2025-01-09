---
aliases:
- /continuous_integration/static_analysis/rules/terraform-aws/aws-msk-broker-no-encryption
- /static_analysis/rules/terraform-aws/aws-msk-broker-no-encryption
dependencies: []
disable_edit: true
group_id: terraform-aws
meta:
  category: Security
  id: terraform-aws/aws-msk-broker-no-encryption
  language: Terraform
  severity: Warning
  severity_rank: 2
title: Ensure broker communication is encrypted
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `terraform-aws/aws-msk-broker-no-encryption`

**Language:** Terraform

**Severity:** Warning

**Category:** Security

## Description
This rule is designed to ensure that all broker communication within your AWS MSK Cluster is encrypted. It is important because unencrypted communication within your broker can expose sensitive data and make your system vulnerable to unauthorized access and data breaches.

In the context of AWS MSK (Managed Streaming for Apache Kafka), the `client_broker` argument in the `encryption_in_transit` block should be set to "TLS". This ensures that all data transmitted between the client and the broker is encrypted. By doing so, you are adding an extra layer of security to your data, making it harder for unauthorized users to gain access.

The non-compliant code samples show that the `client_broker` argument is either set to "TLS_PLAINTEXT", which means that the data is not encrypted, or the `client_broker` argument is missing entirely. Both of these scenarios do not comply with the rule and can lead to security vulnerabilities.

To comply with this rule, ensure that the `client_broker` argument in the `encryption_in_transit` block is always set to "TLS". This ensures that all broker communication is encrypted, thus enhancing the security of your data.

## Non-Compliant Code Examples
```terraform
resource "aws_msk_cluster" "my_kafka_cluster" {
    encryption_info {
        encryption_in_transit {
            client_broker = "TLS_PLAINTEXT"
            in_cluster = true
        }
    }
}
```

```terraform
resource "aws_msk_cluster" "my_kafka_cluster" {
    encryption_info {
        encryption_in_transit {
            in_cluster = true
        }
    }
}
```

## Compliant Code Examples
```terraform
resource "aws_msk_cluster" "my_kafka_cluster" {
    encryption_info {
        encryption_in_transit {
            client_broker = "TLS"
            in_cluster = true
        }
    }
}
```
