---
aliases:
- 9cq-130-xdk
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: elasticache
security: compliance
source: elasticache
title: ElastiCache cluster is using the latest engine version
type: security_rules
---

## Description

Update your Amazon ElastiCache cluster to the latest, stable version of the Redis/Memcached cache engine.

## Rationale

Using the latest version allows for security patches, bug fixes, better performance, and memory management.

## Remediation

### Console

Follow the [Upgrading engine versions][1] docs to learn how to modify your ElastiCache cluster or replication group in the console.

### CLI

Follow the [Modify an ElastiCache cluster (AWS CLI)][2] or [Modify a replication group (AWS CLI)][3] docs for configuration options.

For example, to modify an ElastiCache cluster, run `modify-replication-group` with your replication group ID and enable Multi-AZ.

  {{< code-block lang="bash" filename="list-buckets.sh" >}}
  aws elasticache modify-replication-group
    --replication-group-id myReplGroup
    --multi-az-enabled = true
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/VersionManagement.html
[2]: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Clusters.Modify.html#Clusters.Modify.CLI
[3]: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Replication.Modify.html#Replication.Modify.CLI
