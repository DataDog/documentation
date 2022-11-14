---
aliases:
- p4g-0d9-ncl
- /security_monitoring/default_rules/p4g-0d9-ncl
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.1.3
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''local_infile'' database flag is set to ''off'' for MySQL Instance'
type: security_rules
---

## Description

Datadog recommends setting the `local_infile` database flag for a Cloud SQL MySQL instance to off.

## Rationale

The `local_infile` flag controls the server-side LOCAL capability for LOAD DATA statements. Depending on the `local_infile` setting, the server refuses or permits local data loading by clients that have LOCAL enabled on the client side.

To explicitly cause the server to refuse LOAD DATA LOCAL statements (regardless of how client programs and libraries are configured at build time or runtime), start mysqld with `local_infile` disabled. `local_infile` can also be set at runtime.

Due to security issues associated with the `local_infile` flag, Datadog recommends disabling it. This recommendation is applicable to MySQL database instances.

## Impact

Disabling `local_infile` causes the server to refuse local data loading by clients that have LOCAL enabled on the client side.


## Remediation

## From Console

1. In the Google Cloud Console, navigate to [Cloud SQL Instances page][1].
2. Select the MySQL instance where the database flag needs to be enabled.
3. Click **Edit**.
4. Scroll down to the **Flags** section.
5. To set a flag that has not been set on the instance before, click **Add item**, choose the `local_infile` flag from the dropdown menu, and set its value to **off**.
6. Click **Save**.
7. Confirm the changes under **Flags** on the Overview page.

## From Command Line

1. List all Cloud SQL database instances using 
   ```
   `gcloud sql instances list`.
   ```
2. Configure the `local_infile` database flag for every Cloud SQL MySQL database instance using 
   ```
   `gcloud sql instances patch INSTANCE_NAME --database-flags local_infile=off`
   ```
   Note:
   This command overwrites all previously set database flags. To keep these flags and add new ones, include all flag values to be set on the instance. Otherwise, flags that are not specifically included are set to its default value. For flags that do not take a value, specify the flag name followed by an equals sign, for example: `=`.


## Default Value

By default, `local_infile` is on.

## References

1. [https://cloud.google.com/sql/docs/mysql/flags][2]
2. [https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_local_infile][3]
3. [https://dev.mysql.com/doc/refman/5.7/en/load-data-local.html][4]

## Additional Information

This patch modifies database flag values, which may require you to restart your instance. Check the [list of supported flags][2] to see if your instance will restart when this patch is submitted.
    
[1]: https://console.cloud.google.com/sql/instances
[2]: https://cloud.google.com/sql/docs/mysql/flags
[3]: https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_local_infile
[4]: https://dev.mysql.com/doc/refman/5.7/en/load-data-local.html
