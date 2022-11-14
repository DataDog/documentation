---
aliases:
- b48-4xm-roq
- /security_monitoring/default_rules/b48-4xm-roq
- /security_monitoring/default_rules/aws-es-version
disable_edit: true
integration_id: elasticsearch
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: elasticsearch
title: Elasticsearch cluster is using the latest engine version
type: security_rules
---

## Description

Upgrade to the latest version of Amazon Elasticsearch (ES) engine.

## Rationale

Using the latest version of Amazon ES ensures you receive the latest bug fixes, security patches, and features.

## Remediation

### From the console

Follow the [To upgrade a domain to a later version of Elasticsearch (console)][1] docs to learn about the upgrade process and how to complete an upgrade from the AWS Console.

### From the command line

Follow the [To upgrade a domain to a later version of Elasticsearch (AWS CLI)][1] docs to being an upgrade using the AWS CLI.

[1]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-version-migration.html#starting-upgrades
[2]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-version-migration.html#starting-upgrades
