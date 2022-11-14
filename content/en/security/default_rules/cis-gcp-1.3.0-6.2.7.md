---
aliases:
- 353-8ds-0ud
- /security_monitoring/default_rules/353-8ds-0ud
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.2.7
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''log_min_error_statement'' database flag is set to ''ERROR'' or stricter
  for PostgreSQL Instance'
type: security_rules
---

## Description
The `log_min_error_statement` flag defines the minimum message severity level that is
considered an error statement. Messages for error statements are logged with the SQL
statement. Valid values include `DEBUG5`, `DEBUG4`, `DEBUG3`, `DEBUG2`, `DEBUG1`, `INFO`, `NOTICE`,
`WARNING`, `ERROR`, `LOG`, `FATAL`, and `PANIC`. Each severity level includes the subsequent levels
mentioned above. Ensure a value of `ERROR` or stricter is set.

## Rationale
Auditing helps with troubleshooting operational problems and also permits forensic analysis.
If `log_min_error_statement` is not set to the correct value, messages may not be classified
as error messages appropriately. If general log messages are considered as error messages,
it would be difficult to determine the actual errors. If only stricter severity levels are considered as
error messages, true errors might not be logged with their SQL statements. The
`log_min_error_statement` flag should be set to `ERROR` or stricter. This recommendation is
applicable to PostgreSQL database instances.

## Impact
Turning on logging will increase the required storage over time. Mismanaged logs may
cause your storage costs to increase. Setting custom flags using the command line on certain
instances will cause all omitted flags to be reset to defaults. This may cause you to lose
custom flags and could result in unforeseen complications or instance restarts. Because of
this, it is recommended that you apply these flag changes during a period of low usage.

## Remediation

### From the console
1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting [https://console.cloud.google.com/sql/instances][1].
2. Select the PostgreSQL instance for which you want to enable the database flag.
3. Click **Edit**.
4. Scroll down to the `Flags` section.
5. Click **Add item** to set a flag that has not been set on the instance before. Choose the
flag `log_min_error_statement` from the drop-down menu and set the appropriate
value.
6. Click `Save` to save your changes.
7. Confirm your changes under the `Flags` section on the Overview page.

### From Command Line:
1. Configure the `log_min_error_statement` database flag for every Cloud SQL
PosgreSQL database instance using the below command.

   ```
   gcloud sql instances patch <INSTANCE_NAME> --database-flags log_min_error_statement=<DEBUG5|DEBUG4|DEBUG3|DEBUG2|DEBUG1|INFO|NOTICE|WARNING|ERROR>
   ```

   Note: This command will overwrite all database flags previously set. To keep those and add new ones, include the values for all flags you want set on the instance; any flag not specifically included is set to its default value. For flags that do not take a value, specify the flag name followed by an equals sign (=).

## Default value
By default `log_min_error_statement` is `ERROR`.

## References
1. [https://cloud.google.com/sql/docs/postgres/flags][2]
2. [https://www.postgresql.org/docs/9.6/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHEN][3]

## Additional Information
WARNING: This patch modifies database flag values, which may require your
instance to be restarted. Check the list of supported flags -
[https://cloud.google.com/sql/docs/postgres/flags][2] - to see if your instance
will be restarted when this patch is submitted.

Note: Some database flag settings can affect instance availability or
stability and remove the instance from the Cloud SQL SLA. For information
about these flags, see Operational Guidelines.

Note: Configuring the above flag does not require restarting the Cloud SQL
instance.

## CIS controls

Version 8, 8.5: Collect Detailed Audit Logs
- Configure detailed audit logging for enterprise assets containing sensitive data.
Include event source, date, username, timestamp, source addresses, destination
addresses, and other useful elements that could assist in a forensic investigation.

Version 7, 6.3: Enable Detailed Logging
- Enable system logging to include detailed information such as an event source,
date, user, timestamp, source addresses, destination addresses, and other useful
elements.

[1]: https://console.cloud.google.com/sql/instances
[2]: https://cloud.google.com/sql/docs/postgres/flags
[3]: https://www.postgresql.org/docs/9.6/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHEN
