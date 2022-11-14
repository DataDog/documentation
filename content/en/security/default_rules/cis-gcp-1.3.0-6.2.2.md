---
aliases:
- 8gk-04l-mdb
- /security_monitoring/default_rules/8gk-04l-mdb
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.2.2
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''log_connections'' database flag is set to ''on'' for PostgreSQL Instance'
type: security_rules
---

## Description

By enabling the `log_connections` setting, every attempted server connection is logged along with the successful completion of client authentication. Once the session starts, you cannot change this parameter.

## Rationale

By default, PostgreSQL does not log attempted connections. By enabling the `log_connections` setting, you can create log entries for every attempted connection as well as the successful completion of client authentication. This can be useful in troubleshooting issues and determining any unusual connection attempts to the server. This recommendation is applicable to PostgreSQL database instances.

## Impact

By turning on logging, the required storage increaess over time. Mismanaged logs may cause your storage costs to increase. 

Setting custom flags through the command line on certain instances can cause all omitted flags to reset to defaults. This may cause you to lose
custom flags and can result in unforeseen complications or instance restarts. Because of this, Datadog recommends applying these flag changes during a period of low usage.

## Remediation

## From the console
1. In the Google Cloud Console, navigate to the [Cloud SQL Instances page][1].
2. Select the PostgreSQL instance that you want to enable the database flag for.
3. Click **Edit**.
4. Scroll down to the **Flags** section.
5. To set a flag that has not been set on the instance before, click **Add item**, choose the **log_connections** flag from the dropdown menu, and set the value as **on**.
6. Click **Save**.
7. Confirm the changes under **Flags** on the Overview page.

## From the command line

Configure the `log_connections` database flag for every Cloud SQL PosgreSQL database instance using the following command:

   ```
   gcloud sql instances patch <INSTANCE_NAME> --database-flags
   log_connections=on
   ```

This command overwrites all previously set database flags. To keep these flags and add new ones, include all flag values to be set on the instance. Otherwise, flags that are not specifically included are set to its default value. For flags that do not take a value, specify the flag name followed by an equals sign, for example: `=`.

You do not need to restart the Cloud SQL instance.

## Default Value

By default, `log_connections` is off.

## References

1. [https://cloud.google.com/sql/docs/postgres/flags][2]
2. [https://www.postgresql.org/docs/9.6/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHAT][3]

## Additional Information

This patch modifies database flag values, which may require you to restart your instance. Check the [list of supported flags][2] to see if your instance will restart when this patch is submitted.

Some database flag settings can affect instance availability or stability, and may remove the instance from the Cloud SQL SLA.

For information about these flags, see the Operational Guidelines.

## CIS Controls

Version 8, 8.5 - Collect Detailed Audit Logs
- Configure detailed audit logging for enterprise assets containing sensitive data. Include event source, date, username, timestamp, source addresses, destination addresses, and other useful elements that could assist in a forensic investigation.

[1]: https://console.cloud.google.com/sql/instances
[2]: https://cloud.google.com/sql/docs/postgres/flags
[3]: https://www.postgresql.org/docs/9.6/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHAT
