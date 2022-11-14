---
aliases:
- 392-b4t-w0w
- /security_monitoring/default_rules/392-b4t-w0w
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.3.2
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''cross db ownership chaining'' database flag is set to ''off'' for SQL Server
  Instance'
type: security_rules
---

## Description
It is recommended that you set the `cross db ownership chaining` database flag for SQL Server instance to `off`.

## Rationale
The `cross db ownership` option is used to configure cross-database ownership chaining for an instance of Microsoft SQL Server. This server option allows you to control cross-database ownership chaining at the database level or to allow cross-database ownership chaining for all databases. Enabling `cross db ownership` is not recommended unless all of the databases hosted by the instance of SQL Server must participate in cross-database ownership chaining, and you are aware of the security implications of this setting. This recommendation is applicable to SQL Server database instances.

### Impact
Updating flags may cause the database to restart. This may cause the database to be unavailable for a short amount of time, so this is best done at a time of low usage. You should also determine if the tables in your databases reference another table without using credentials for that database, as turning off cross database ownership will break this relationship.

   - Some database flag settings can affect instance availability or stability, and remove the instance from the Cloud SQL SLA. For information about these flags, see Operational Guidelines.

   - Configuring the `cross db ownership chaining` flag does not restart the Cloud SQL instance.

   - Note: The command to set database flags overwrites all database flags previously set. To keep the existing settings while adding new flags, include the values for all flags to be set on the instance. Cloud SQL sets any flag not specifically included in the list to its default value. For flags that do not take a value, specify the flag name followed by an equals sign ("=").

## Remediation

### From the console
1. Go to the [Cloud SQL Instances page][1] in Google Cloud Console.
2. Select the SQL Server instance for which you want to enable to database flag.
3. Click **Edit**.
4. Scroll down to the **Flags** section.
5. To set a flag that has not been set on the instance before, click **Add item**, choose the flag `cross db ownership chaining` from the drop-down menu, and set its value to `off`.
6. Click **Save**.
7. Confirm the changes under **Flags** on the Overview page.

### From the command line
Configure the `cross db ownership chaining` database flag for every SQL Server database instance using the below command:
   
```
gcloud sql instances patch <INSTANCE_NAME> --database-flags "cross db ownership chaining=off"
```

## References
1. [https://cloud.google.com/sql/docs/sqlserver/flags][2]
2. [https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/cross-db-ownership-chaining-server-configuration-option?view=sql-server-ver15][3]

[1]: https://console.cloud.google.com/sql/instances
[2]: https://cloud.google.com/sql/docs/sqlserver/flags
[3]: https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/cross-db-ownership-chaining-server-configuration-option?view=sql-server-ver15
