---
aliases:
- qb7-1nm-smh
- /security_monitoring/default_rules/qb7-1nm-smh
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.3.4
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''user options'' database flag is not configured for SQL Server Instance'
type: security_rules
---

## Description
It is recommended that the `user options` database flag for SQL Server instance not be configured.

## Rationale

The `user options` flag specifies global defaults for all users. A list of default query processing options is established for the duration of a user's work session. The user options flag allows you to change the default values of the SET options (if the server's default settings are not appropriate).

A user can override these defaults by using the SET statement. You can configure user options dynamically for new logins. After you change the setting of user options, new login sessions use the new setting; current login sessions are not affected. This recommendation is applicable to SQL Server database instances.

## Impact

In some instances, setting custom flags via the command line causes all omitted flags to be reset to their defaults. This might cause you to lose custom flags and could result in unforeseen complications or instance restarts. Because of this, it is recommended you apply these flag changes during a period of low usage.

## Remediation

### From the console

1. Go to the **Cloud SQL Instances** page in the Google Cloud Console by visiting [https://console.cloud.google.com/sql/instances][1].
2. Select the SQL Server instance you want to configure.
3. Click **Edit**.
4. Scroll down to the **Flags** section.
5. Click the **X** next to the **user options** flag shown
6. Click **Save** to save your changes.
7. Confirm your changes under **Flags** on the **Overview** page.

### From the command line

1. List all Cloud SQL database Instances:
   
      ```
      gcloud sql instances list
      ```

2. Clear the user options database flag for every Cloud SQL SQL Server database instance using either of the below commands:

   - To clear all flags and reset them to their default values:

     ```
     gcloud sql instances patch <INSTANCE_NAME> --clear-database-flags
     ```

   - To clear only the `user options` database flag, re-enter all of database flags that you want to configure and exclude the `user options` flag and        its value:

     ```
     gcloud sql instances patch <INSTANCE_NAME> --database-flags [FLAG1=VALUE1,FLAG2=VALUE2]
     ```

   **Note**: This command overwrites all database flags previously set. To keep those flags and add new ones, include the values for all flags you want       set on the instance. Any flag not specifically included is set to its default value. For flags that do not take a value, specify the flag name followed by an equals sign ("=").

## Default value

By default, 'user options' is not configured.

## References

1. [https://cloud.google.com/sql/docs/sqlserver/flags][1]
2. [https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/configure-the-user-options-server-configuration-option?view=sql-server-ver15][2]
3. [https://www.stigviewer.com/stig/ms_sql_server_2016_instance/2018-03-09/finding/V-79335][3]


## Additional information

- Some database flag settings can affect instance availability or stability, and remove the instance from the Cloud SQL SLA. For information
about these flags, see [Operational Guidelines][4].

- Configuring the above flag does not restart the Cloud SQL instance.

[1]: https://cloud.google.com/sql/docs/sqlserver/flags
[2]: https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/configure-the-user-options-server-configuration-option?view=sql-server-ver15
[3]: https://www.stigviewer.com/stig/ms_sql_server_2016_instance/2018-03-09/finding/V-79335
[4]: https://cloud.google.com/sql/docs/operational-guidelines
