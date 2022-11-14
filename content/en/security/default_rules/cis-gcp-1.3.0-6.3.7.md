---
aliases:
- 007-0mg-lul
- /security_monitoring/default_rules/007-0mg-lul
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.3.7
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''contained database authentication'' database flag is set to ''off'' for
  SQL Server Instance'
type: security_rules
---

## Description

It is recommended to set `contained database authentication` database flag for SQL Server instances to `off`.

## Rationale

A contained database includes all database settings and metadata required to define the database and has no configuration dependencies on the instance of the Database Engine where the database is installed. Users can connect to the database without authenticating a login at the Database Engine level. Isolating the database from the Database Engine makes it possible to easily move the database to another instance of SQL Server. Contained databases have some unique threats that should be understood and mitigated by SQL Server Database Engine administrators. Most of the threats are related to the `USER WITH PASSWORD` authentication process, which moves the authentication boundary from the Database Engine level to the database level. Hence, disabling this flag is recommended. This recommendation is applicable to SQL Server database instances.

## Impact

When `contained database authentication` is off (`0`) for the instance, contained databases cannot be created, or attached to the Database Engine. Turning on logging will increase the required storage over time. Mismanaged logs may cause your storage costs to increase. Setting custom flags via the command line on certain instances will cause all omitted flags to be reset to defaults. This may cause you to lose custom flags and could result in unforeseen complications or instance restarts. Because of this, it is recommended that you apply these flag changes during a period of low usage.

## Remediation

### From the console

1. Go to the [Cloud SQL Instances][1] page in the Google Cloud Console.
2. Select the SQL Server instance for which you want to enable the database flag.
3. Click **Edit**.
4. Scroll down to the **Flags** section.
5. To set a flag that has not been set on the instance before, click **Add item**, choose the flag `contained database authentication` from the drop-down menu, and set its value to `off`.
6. Click **Save**.
7. Confirm the changes under **Flags** on the Overview page.

### From the command line

Configure the `contained database authentication` database flag for every SQL Server database instance using the below command.
```
gcloud sql instances patch <INSTANCE_NAME> --database-flags "contained database authentication=off"
```

**Note**: This command will overwrite all database flags previously set. To keep the flags previously set and add new ones, include the values for all flags you want set on the instance; any flag not specifically included is set to its default value. For flags that do not take a value, specify the flag name followed by an equals sign (`=`).


## Additional Information

- Configuring this flag does not restart the SQL Server instance.

- Some database flag settings can affect instance availability or stability and remove the instance from the Cloud SQL SLA. For information about these flags, see Operational Guidelines.

## References

1. [https://cloud.google.com/sql/docs/sqlserver/flags][2]
2. [https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/contained-database-authentication-server-configuration-option?view=sql-server-ver15][3]
3. [https://docs.microsoft.com/en-us/sql/relational-databases/databases/security-best-practices-with-contained-databases?view=sql-server-ver15][4]

[1]: https://console.cloud.google.com/sql/instances
[2]: https://cloud.google.com/sql/docs/sqlserver/flags
[3]: https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/contained-database-authentication-server-configuration-option?view=sql-server-ver15
[4]: https://docs.microsoft.com/en-us/sql/relational-databases/databases/security-best-practices-with-contained-databases?view=sql-server-ver15
