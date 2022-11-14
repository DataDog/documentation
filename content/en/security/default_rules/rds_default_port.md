---
aliases:
- 2fa-56b-77b
- /security_monitoring/default_rules/2fa-56b-77b
- /security_monitoring/default_rules/rds_default_port
disable_edit: true
integration_id: rds
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: rds
title: RDS instance is not using the default port
type: security_rules
---

## Description

Confirm [Amazon RDS database instances][1] are not using default ports. This includes default ports such as MySQL/Aurora port 3306, SQL Server port 1433, and PostgreSQL port 5432.

## Rationale

Using a custom port can protect against potential brute-force and dictionary attacks.

## Remediation

### From the console

Follow the [Modifying an Amazon RDS DB instance][4] docs to verify you're not using a default. You can modify your port by modifying that [DB instance settings][5].

### From the command line

1. Run `create-db-snapshot` with your database instance and snapshot identifiers to [create a snapshot][2].

    {{< code-block lang="bash" filename="create-db-snapshot.sh" >}}
    aws rds create-db-snapshot \
        --db-instance-identifier database-mysql \
        --db-snapshot-identifier snapshotidentifier
    {{< /code-block >}}

2. Run `modify-db-instance` with a new, valid port number. A [list of port numbers are available][3].

    {{< code-block lang="bash" filename="modify-db-instance.sh" >}}
    aws rds modify-db-instance \
        --db-instance-identifier database-identifier \
        --option-group-name test-group-name \
        --db-parameter-group-name test-sqlserver-name \
        --apply-immediately
    {{< /code-block >}}



[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/create-db-snapshot.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/modify-db-instance.html#options
[4]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html
[5]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html#USER_ModifyInstance.Settings
