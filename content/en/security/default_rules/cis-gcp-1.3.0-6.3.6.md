---
aliases:
- 008-g5p-l0g
- /security_monitoring/default_rules/008-g5p-l0g
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.3.6
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''3625 (trace flag)'' database flag is set to ''off'' for SQL Server Instance'
type: security_rules
---

## Description

It is recommended to set `3625 (trace flag)` database flag  to `off` for GCP SQL Server instance.

## Rationale

Microsoft SQL trace flags are frequently used to diagnose performance issues or to debug stored procedures or complex computer systems, but they may also be recommended by Microsoft Support to address behavior that is negatively impacting a specific workload. All documented trace flags and those recommended by Microsoft Support are fully supported in a production environment when used as directed. `3625 (trace log)` limits the information returned to users who are not members of the sysadmin fixed server role, by masking the parameters of some error messages using '******'. Setting this in a Google Cloud flag for the instance allows for security through obscurity and prevents the disclosure of sensitive information. Hence, it is recommended to set this flag to `off` globally to prevent the flag from being left on or turned on by bad actors. This recommendation is applicable to SQL Server database instances.

## Impact

Changing flags on a database may cause it to be restarted. The best time to do this is when there is low usage.

## Remediation

### From the console

1. Go to the [Cloud SQL Instances][1] page in the Google Cloud Console.
2. Select the SQL Server instance for which you want to enable the database flag.
3. Click **Edit**.
4. Scroll down to the Flags section.
5. Click **Add item** to set a flag that has not been set on the instance before. Choose the flag `3625` from the drop-down menu, and set its value to `off`.
6. Click **Save**.
7. Confirm your changes under the Flags section on the Overview page.

### From the command line

Configure the `3625` database flag for every GCP SQL Server database instance using the below command.
```
gcloud sql instances patch <INSTANCE_NAME> --database-flags "3625=off"
```

#### Note
This command will overwrite all database flags previously set. To keep the flags previously set and add new ones, include the values for all flags you want set on the instance; any flag not specifically included is set to its default value. For flags that do not take a value, specify the flag name followed by an equals sign (=).


## Additional Information

- Configuring the above flag restarts the GCP SQL Server instance.

- Some database flag settings can affect instance availability or stability, and remove the instance from the Cloud SQL SLA. For information about these flags, see Operational Guidelines.

## References

1. [https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-traceon-trace-flags-transact-sql?view=sql-server-ver15#trace-flags][2]

[1]: https://console.cloud.google.com/sql/instances
[2]: https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-traceon-trace-flags-transact-sql?view=sql-server-ver15#trace-flags
