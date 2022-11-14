---
aliases:
- 3jh-9ds-93j
- /security_monitoring/default_rules/3jh-9ds-93j
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.2.8
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''log_min_duration_statement'' database flag is set to ''-1'' (disabled) for
  PostgreSQL Instance'
type: security_rules
---

## Description
The `log_min_duration_statement` flag defines the minimum execution time (milliseconds) of a
statement, where the total duration of the statement is logged. Ensure that
`log_min_duration_statement` is disabled by setting the value to `-1`. This will disable statement logging.

## Rationale
SQL statement logs may include sensitive information that should not be recorded in
the logs. This recommendation is applicable to PostgreSQL database instances.

## Impact
Turning on logging will increase the required storage over time. Mismanaged logs may
cause your storage costs to increase. Setting custom flags using the command line on certain
instances will cause all omitted flags to be reset to defaults. This may cause you to lose
custom flags and could result in unforeseen complications or instance restarts. Because of
this, it is recommended that you apply these flag changes during a period of low usage.

## Remediation

### From the console
1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting
[https://console.cloud.google.com/sql/instances][1].
2. Select the PostgreSQL instance where the database flag needs to be enabled.
3. Click **Edit**.
4. Scroll down to the Flags section.
5. Click **Add item** to set a flag that has not been set on the instance before. Choose the
flag `log_min_duration_statement` from the drop-down menu and set a value of `-1`.
6. Click **Save**.
7. Confirm the changes under the Flags section on the Overview page.

### From the command line
1. List all Cloud SQL database instances using the following command:

   ```
   gcloud sql instances list
   ```

2. Configure the `log_min_duration_statement` flag for every PosgreSQL
database instance using the below command:

   ```
   gcloud sql instances patch <INSTANCE_NAME> --database-flags log_min_duration_statement=-1
   ```
   Note: This command will overwrite all database flags previously set. To keep
those and add new ones, include the values for all flags to be set on the
instance; any flag not specifically included is set to its default value. For
flags that do not take a value, specify the flag name followed by an equals
sign (=).

## Default value
By default `log_min_duration_statement` is set to `-1`.

## References
1. [https://cloud.google.com/sql/docs/postgres/flags][2]
2. [https://www.postgresql.org/docs/current/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHAT][3]

## Additional Information
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
[3]: https://www.postgresql.org/docs/current/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHAT
