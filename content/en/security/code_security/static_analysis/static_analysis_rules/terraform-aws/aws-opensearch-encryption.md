---
aliases:
- /continuous_integration/static_analysis/rules/terraform-aws/aws-opensearch-encryption
- /static_analysis/rules/terraform-aws/aws-opensearch-encryption
dependencies: []
disable_edit: true
group_id: terraform-aws
meta:
  category: Security
  id: terraform-aws/aws-opensearch-encryption
  language: Terraform
  severity: Warning
  severity_rank: 2
title: Ensure that elasticsearch domains enforce HTTPS
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `terraform-aws/aws-opensearch-encryption`

**Language:** Terraform

**Severity:** Warning

**Category:** Security

## Description
This rule ensures that all Elasticsearch domains are configured to enforce Hypertext Transfer Protocol Secure (HTTPS). HTTPS is the secure version of HTTP, the protocol over which data is sent between your browser and the website that you are connected to. Enforcing HTTPS ensures that any data sent between your Elasticsearch domain and its clients is encrypted, which is crucial for preserving the integrity and confidentiality of the data.

The importance of this rule lies in the security of your Elasticsearch domains. Without enforcing HTTPS, data sent between your domain and its clients would be sent in plain text, which could be read by anyone who intercepts the data. This could lead to sensitive information being exposed, such as user credentials or personal data.

To avoid violating this rule, always ensure that the `enforce_https` attribute within the `domain_endpoint_options` block is set to `true` when defining your `aws_elasticsearch_domain` resources. This guarantees that all connections to your Elasticsearch domain are made securely over HTTPS. Additionally, enabling `node_to_node_encryption` ensures that data is encrypted as it moves between nodes in your domain.

## Non-Compliant Code Examples
```terraform
resource "aws_elasticsearch_domain" "mydomain" {
  domain_name = "foobar"
  domain_endpoint_options {
  }
  node_to_node_encryption {
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
    enabled = true
  }
}
```
