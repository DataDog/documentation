---
aliases:
- 625-933-d8d
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: rds
security: compliance
source: rds
title: RDS database instance is encrypted
type: security_rules
---

## Description

Ensure that your AWS RDS database instances are encrypted.

## Rationale

Encrypting your AWS RDS clusters protects sensitive data from unauthorized access.

## Remediation

### Console

Follow the [Enabling Amazon RDS encryption for a DB instance][1] docs to ensure your database instances are encrypted.

### CLI

1. Run `describe-db-instances` with an instance identifier query to list RDS database names.

    {{< code-block lang="bash" filename="describe-db-instances.sh" >}}
    aws rds describe-db-instances
        --query 'DBInstances[*].DBInstanceIdentifier'
    {{< /code-block >}}

2. Run `create-db-snapshot` with any returned database instance you wish to modify.

    {{< code-block lang="bash" filename="create-db-snapshot.sh" >}}
    aws rds create-db-snapshot
        --db-snapshot-identifier my-db-snapshot
        --db-instance-identifier my-db-id
    {{< /code-block >}}

3. Run `list-aliases` to list KMS keys aliases by region.

    {{< code-block lang="bash" filename="list-aliases.sh" >}}
    aws kms list-aliases
        --region us-west-1
    {{< /code-block >}}

4. Run `copy-db-snapshot` with the `kms-key-id` returned in step 3.

    {{< code-block lang="bash" filename="copy-db-snapshot.sh" >}}
    aws rds copy-db-snapshot
        --region us-west-1
        --source-db-snapshot-identifier original-db-snapshot-id
        --target-db-snapshot-identifier encrypted-db-snapshot-id
        --copy-tags
        --kms-key-id 01234567-1a2b-1234a-b45c-abcdef123456
    {{< /code-block >}}

5. Run `restore-db-instance-from-db-snapshot` to restore the previously created snapshot.

    {{< code-block lang="bash" filename="restore-db-instance.sh" >}}
    aws rds restore-db-instance-from-db-snapshot
        --region us-west-1
        --db-instance-identifier encrypted-db-id
        --db-snapshot-identifier encrypted-db-snapshot-id
    {{< /code-block >}}

6. Run `describe-db-instances` with a query to ensure database encryption.

    {{< code-block lang="bash" filename="describe-db-instances.sh" >}}
    aws rds describe-db-instances
        --region us-west-1
        --db-instance-identifier encrypted-db-snapshot-id
        --query 'DBInstances[*].StorageEncrypted'
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html#Overview.Encryption.Enabling
