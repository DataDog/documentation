---
aliases:
- sbe-9d2-21s
- /security_monitoring/default_rules/sbe-9d2-21s
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.2.6
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''log_min_messages'' database flag is set to at least ''WARNING'' for PostgreSQL
  Instance'
type: security_rules
---

## Description
The `log_min_messages` flag defines the minimum message severity level that is considered
as an error statement. Messages for error statements are logged with the SQL statement.
Valid values include `debug5`, `debug4`, `debug3`, `debug2`, `debug1`, `info`, `notice`, `warning`, `error`,
`log`, `fatal`, and `panic`. Each severity level includes the subsequent levels mentioned above.
For best practices, set the value to `error`. Changes should only be made in accordance
with the organization's logging policy.

### Default value
By default `log_min_error_statement` is `warning`.

## Rationale
Auditing helps in troubleshooting operational problems and also permits forensic analysis.
If `log_min_error_statement` is not set to the correct value, messages may not be classified
as error messages appropriately. An organization will need to decide their own threshold
for logging `log_min_messages` flag.

### Impact
Setting the threshold too low will might result in increased log storage size and length,
making it difficult to find actual errors. Setting the threshold to `warning` logs
most needed error messages. Setting the threshold to a higher severity level may result in some errors (that need troubleshooting) to not be logged.

Note: To effectively turn off logging failing statements, set this parameter to `panic`.

Note: Configuring the above flag does not require restarting the Cloud SQL instance.

## Remediation

### From the console
1. Go to the [Cloud SQL Instances page][1] in the Google Cloud console.
2. Select the PostgreSQL instance for which you want to enable the database flag.
3. Click **Edit**.
4. Scroll down to the Flags section.
5. Click **Add item** to set a flag that has not been set on the instance before. Choose the
flag `log_min_messages` from the drop-down menu and set appropriate value.
6. Click **Save**.
7. Confirm your changes under the Flags section on the Overview page.

### From the command line
1. Configure the `log_min_messages` database flag for every Cloud SQL PosgreSQL database
instance using the below command.
```
gcloud sql instances patch <INSTANCE_NAME> --database-flags
log_min_messages=<DEBUG5|DEBUG4|DEBUG3|DEBUG2|DEBUG1|INFO|NOTICE|WARNING|ERROR|LOG|FATAL|PANIC>
```

Note: This command overwrites all database flags previously set. To keep
flags previously set and add new ones, include the values for all flags you want set on the
instance; any flag not specifically included is set to its default value. For
flags that do not take a value, specify the flag name followed by an equals
sign (=).


## References
1. [https://cloud.google.com/sql/docs/postgres/flags][2]
2. [https://www.postgresql.org/docs/9.6/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHEN][3]

[1]: https://console.cloud.google.com/sql/instances
[2]: https://cloud.google.com/sql/docs/postgres/flags
[3]: https://www.postgresql.org/docs/9.6/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHEN
