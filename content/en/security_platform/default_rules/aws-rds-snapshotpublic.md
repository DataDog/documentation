---
aliases:
- fo0-6re-l0f
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: rds
security: compliance
source: rds
title: RDS snapshot is not publicly accessible
type: security_rules
---

## Description

Secure your Amazon Relational Database Service (RDS) database snapshots.

## Rationale

Snapshots that are publicly available give other AWS accounts permission to copy a snapshot and create database instances from it, potentially exposing your private data.

## Remediation

### Console

Follow the [Stop sharing a manual DB snapshot with an AWS account][1] AWS Console docs.

### CLI

Run `modify-db-snapshot-attribute` with the [snapshot identifier, attribute name, and values to remove][2]. This removes permission from a particular AWS account to restore the DB snapshot.

    {{< code-block lang="bash" filename="modify-db-snapshot-attribute.sh" >}}
    aws rds modify-db-snapshot-attribute
        --db-snapshot-identifier yourdbsnapshot
        --attribute-name restore
        --values-to-remove 1111222233333
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ShareSnapshot.html#USER_ShareSnapshot.Sharing
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/modify-db-snapshot-attribute.html#synopsis
