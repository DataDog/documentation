---
aliases:
- /continuous_integration/static_analysis/rules/terraform-aws/aws-opensearch-enforce-https
- /static_analysis/rules/terraform-aws/aws-opensearch-enforce-https
dependencies: []
disable_edit: true
group_id: terraform-aws
meta:
  category: Security
  id: terraform-aws/aws-opensearch-enforce-https
  language: Terraform
  severity: Warning
  severity_rank: 2
title: Ensure that elasticsearch domains enforce HTTPS
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `terraform-aws/aws-opensearch-enforce-https`

**Language:** Terraform

**Severity:** Warning

**Category:** Security

## Description
No description found

## Non-Compliant Code Examples
```terraform
resource "aws_elasticsearch_domain" "mydomain" {
  domain_name = "foobar"
  domain_endpoint_options {
  }
  node_to_node_encryption {
    enabled = false
  }
}
```

```terraform
resource "aws_elasticsearch_domain" "mydomain" {
  domain_name = "foobar"
  domain_endpoint_options {
    enforce_https = false
  }
  node_to_node_encryption {
    enabled = false
  }
}
```

## Compliant Code Examples
```terraform
resource "aws_elasticsearch_domain" "mydomain" {
  domain_name = "foobar"
  domain_endpoint_options {
    enforce_https = true
  }
  node_to_node_encryption {
    enabled = false
  }
}
```
