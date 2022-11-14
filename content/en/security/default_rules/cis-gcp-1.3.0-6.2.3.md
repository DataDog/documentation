---
aliases:
- 9a0-5kz-0g1
- /security_monitoring/default_rules/9a0-5kz-0g1
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.2.3
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''log_disconnections'' database flag is set to ''on'' for PostgreSQL Instance'
type: security_rules
---

## Description

Enabling the `log_disconnections` setting logs the end of each session, including the
session duration.

## Rationale

PostgreSQL does not log session details such as duration and session end by default.
Enabling the `log_disconnections` setting will create log entries at the end of each session,
which can be useful in troubleshooting issues and determining any unusual activity across a
time period. The `log_disconnections` and `log_connections` settings work together and
generally, the pair would be enabled or disabled together. This recommendation is applicable
to PostgreSQL database instances.

## Impact

Turning on logging will increase the required storage over time. Mismanaged logs may
cause your storage costs to increase. Setting custom flags via command line on certain
instances will cause all omitted flags to be reset to defaults. This may cause you to lose
custom flags and could result in unforeseen complications or instance restarts. Because of
this, it is recommended you apply these flags changes during a period of low usage.


## Remediation

## From the console

1. Go to the [Cloud SQL Instances][1] page.
2. Select the PostgreSQL instance where the database flag needs to be enabled.
3. Click **Edit**.
4. Scroll down to the **Flags** section.
5. To set a flag that has not been set on the instance before, click **Add item**, choose the
flag `log_disconnections` from the drop-down menu and set the value as **on**.
6. Click **Save**.
7. Confirm the changes under **Flags** on the **Overview** page.

## From the command line

1. Configure the `log_disconnections` database flag for every Cloud SQL PosgreSQL
database instance using the below command:

   ```
   gcloud sql instances patch <INSTANCE_NAME> --database-flags
   log_disconnections=on
   ```

    **Note:** This command will overwrite all previously set database flags. To keep
    those and add new ones, include the values for all flags to be set on the
    instance; any flag not specifically included is set to its default value. For
    flags that do not take a value, specify the flag name followed by an equals
    sign ("=").

## Default Value

By default, `log_disconnections` is off.

## References

1. [https://cloud.google.com/sql/docs/postgres/flags][2]
2. [https://www.postgresql.org/docs/9.6/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHAT][3]


## Additional Information

- Configuring the `log_disconnections` flag does not require restarting the Cloud SQL instance.
- Although the `log_disconnections` flag does not require a restart, you might modify other database flag values when you apply this patch. **Many database flags require restarting the Cloud SQL instance.** Before you modify a database flag, check the [list of supported flags][2] to see if your instance will be restarted when this patch is submitted.
- Some database flag settings can affect instance availability or stability and remove the instance from the Cloud SQL SLA. For information about these flags, see [Operational Guidelines][4].


## CIS controls

Version 8, 8.5 Collect Detailed Audit Logs
- Configure detailed audit logging for enterprise assets containing sensitive data. Include event source, date, username, timestamp, source addresses, destination addresses, and other useful elements that could assist in a forensic investigation.

[1]: https://console.cloud.google.com/sql/instances
[2]: https://cloud.google.com/sql/docs/postgres/flags
[3]: https://console.cloud.google.com/sql/instances
[4]: https://cloud.google.com/sql/docs/operational-guidelines
