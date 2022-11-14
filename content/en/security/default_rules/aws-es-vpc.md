---
aliases:
- 3h4-mr3-76y
- /security_monitoring/default_rules/3h4-mr3-76y
- /security_monitoring/default_rules/aws-es-vpc
disable_edit: true
integration_id: elasticsearch
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: elasticsearch
title: Elasticsearch domain resides in a VPC
type: security_rules
---

## Description

Ensure your Amazon Elasticsearch (ES) domain is only accessible from an AWS VPC.

## Rationale

Using a VPC gives your Amazon ES domains an extra layer of security. Launching your clusters within a VPC ensures communication between your clusters and other AWS services is secure.

## Remediation

Once a domain is created with a public endpoint, it cannot be switched to VPC access. Follow the [Migrating from Public Access to VPC Access][1] docs to learn how to create a new domain and either manually reindex or migrate your data.

[1]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-vpc.html#es-migrating-public-to-vpc
