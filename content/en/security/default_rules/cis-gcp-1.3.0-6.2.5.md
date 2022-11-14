---
aliases:
- lbf-712-i9x
- /security_monitoring/default_rules/lbf-712-i9x
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.2.5
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''log_hostname'' database flag is set to ''on'' for PostgreSQL Instance'
type: security_rules
---

## Description
PostgreSQL only logs the IP address of the connecting hosts. The `log_hostname` flag
controls the logging of hostnames, in addition to the IP addresses logged. The performance
hit depends on the configuration of the environment and the host name resolution
setup. This parameter can only be set in the `postgresql.conf` file or on the server's
command line.

## Rationale
Logging hostnames allows for the association of a hostname with the IP address at the time of
connection. This information helps with incident response efforts, particularly in an
environment that utilizes dynamic IP addresses. Logging hostnames may incur overhead
on server performance because DNS resolution will be required to
convert the IP address to hostname. Depending on the setup, the overhead may be non-negligible.
Enabling the log_hostname flag on PostgreSQL databases is recommended.

## Impact
Using the command line to set custom flags on certain instances will cause all omitted flags to be
reset to defaults. This may cause you to lose custom flags and could result in unforeseen
complications or instance restarts. Because of this, it is recommended that you apply these flag
changes during a period of low usage.

## Remediation

### From the console
1. Go to the [Cloud SQL Instances page][1] in the Google Cloud console.
2. Select the PostgreSQL instance for which you want to enable the database flag.
3. Click **Edit**.
4. Scroll down to the Flags section.
5. Click **Add item** to set a flag that has not been set on the instance before. Choose the
flag `log_hostname` from the drop-down menu and select the value **On**.
6. Click **Save**.
7. Confirm your changes under the Flags section on the Overview page.

### From the command line
1. Configure the `log_hostname` database flag for every Cloud SQL PosgreSQL database
instance using the below command.
```
 gcloud sql instances patch <INSTANCE_NAME> --database-flags log_hostname=on
```

Note: This command will overwrite all database flags previously set. To keep
flags previously set and add new ones, include the values for all flags you want set on the
instance; any flag not specifically included is set to its default value. For
flags that do not take a value, specify the flag name followed by an equals
sign (=).


## Default value
By default `log_hostname` is off.

## References
1. [https://cloud.google.com/sql/docs/postgres/flags][2]
2. [https://www.postgresql.org/docs/current/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHAT][3]

## Additional Information
WARNING: This patch modifies database flag values, which may require your
instance to be restarted. Check the list of [supported flags][2] to see if your instance
will be restarted when this patch is submitted.

Note: Some database flag settings can affect instance availability or
stability and remove the instance from the Cloud SQL SLA. For information
about these flags, see Operational Guidelines.

Note: Configuring the above flag does not require restarting the Cloud SQL
instance.

## CIS controls

Version 8, 8.5 - Collect Detailed Audit Logs
- Configure detailed audit logging for enterprise assets containing sensitive data.
Include event source, date, username, timestamp, source addresses, destination
addresses, and other useful elements that could assist in a forensic investigation.

[1]: https://console.cloud.google.com/sql/instances
[2]: https://cloud.google.com/sql/docs/postgres/flags
[3]: https://www.postgresql.org/docs/current/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHAT
