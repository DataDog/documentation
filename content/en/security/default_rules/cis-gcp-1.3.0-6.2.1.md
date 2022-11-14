---
aliases:
- reb-pe4-yoz
- /security_monitoring/default_rules/reb-pe4-yoz
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.2.1
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''log_error_verbosity'' database flag is set to ''DEFAULT or Stricter'' for
  PostgreSQL Instance'
type: security_rules
---

## Description
The `log_error_verbosity` flag controls the verbosity/details of messages logged. Valid values are:
- `TERSE`
- `DEFAULT`
- `VERBOSE`

`TERSE` excludes the logging of `DETAIL`, `HINT`, `QUERY`, and `CONTEXT` error information.
`VERBOSE` output includes the `SQLSTATE` error code, source code file name, function name, and line number that generated the error.

Ensure an appropriate value is set to `DEFAULT` or stricter.

## Rationale
Auditing helps in troubleshooting operational problems and also permits forensic analysis.
If `log_error_verbosity` is not set to the correct value, too many details or too few details
may be logged. This flag should be configured with a value of `DEFAULT` or stricter. This
recommendation is applicable to PostgreSQL database instances.

### Impact
Turning on logging will increase the required storage over time. Mismanaged logs may
cause your storage costs to increase. Setting custom flags via the command line on certain
instances will cause all omitted flags to be reset to defaults. This may cause you to lose
custom flags and could result in unforeseen complications or instance restarts. Because of
this, it is recommended you apply these flag changes during a period of low usage.

- **WARNING**: This patch modifies database flag values, which may require your instance to be restarted. Check the list of supported flags -[https://cloud.google.com/sql/docs/postgres/flags][1] - to see if your instance will be restarted when this patch is submitted.
- Note: some database flag settings can affect instance availability orn stability and remove the instance from the Cloud SQL SLA. For information about these flags, see Operational Guidelines.
- Note: Configuring the above flag does not require restarting the Cloud SQL instance.

### Default value
By default, `log_error_verbosity` is `DEFAULT`.

## Remediation

### From the console 
1. Go to the Cloud SQL Instances page by visiting [https://console.cloud.google.com/sql/instances][2]
2. Select the **PostgreSQL instance** for which you want to enable the database flag.
3. Click **Edit**.
4. Scroll down to the **Flags** section.
5. To set a flag that has not been set on the instance before, click **Add item**, choose the
flag `log_error_verbosity` from the drop-down menu and set appropriate **value**.
6. Click **Save**
7. Confirm your changes under Flags on the **Overview** page.

### From the command line
1. Configure the `log_error_verbosity` database flag for every Cloud SQL PosgreSQL database instance using the below command.
   ```
   gcloud sql instances patch <INSTANCE_NAME> --database-flags
   log_error_verbosity=<TERSE|DEFAULT|VERBOSE>
   ```

   **Note**: This command will overwrite all database flags previously set. To keep
   those and add new ones, include the values for all flags you want set on the
   instance; any flag not specifically included is set to its default value. For
   flags that do not take a value, specify the flag name followed by an equals sign (`=`).

## References
1. [https://cloud.google.com/sql/docs/postgres/flags][1]
2. [https://www.postgresql.org/docs/current/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHAT][3]

[1]: https://cloud.google.com/sql/docs/postgres/flags
[2]: https://console.cloud.google.com/sql/instances
[3]: https://www.postgresql.org/docs/current/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHAT
