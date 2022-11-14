---
aliases:
- 3sh-02u-5ju
- /security_monitoring/default_rules/3sh-02u-5ju
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.2.9
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''cloudsql.enable_pgaudit'' database flag is set to ''on'' for centralized
  logging on Postgresql Instance'
type: security_rules
---

## Description

Enable the `cloudsql.enable_pgaudit` database flag so that each Cloud SQL PostgreSQL instance has centralized logging.

## Rationale

Because many other recommendations in this section involve turning on flags for logging
purposes, your organization needs a way to manage these logs. If you do not already have a solution in 
place, consider enabling database auditing in PostgreSQL by installing the open source pgAudit extension and enabling the `cloudsql.enable_pgaudit` flag. The extension provides
detailed session and object logging to comply with government, financial, and ISO standards. It provides 
auditing capabilities to mitigate threats by monitoring security events on the
instance. Enabling the flag and the settings described below sends the logs to
Google Logs Explorer so that you can access them in a central location. This
recommendation is applicable only to PostgreSQL database instances.

## Impact

Enabling the pgAudit extension can lead to increased data storage requirements. To
ensure durability of pgAudit log records in the event of unexpected storage issues, 
enable the **Enable automatic storage increases** setting on the
instance. Enabling flags on the command line will overwrite all existing flags, so you
should apply _all_ needed flags in each CLI command. You might need to restart the
server to see the effects of enabling flags, so update your servers at a
time of low usage.

## Remediation

### Initialize the pgAudit flag

#### From the console
1. Go to [GCP console][1].
2. Select the instance to open its Overview page.
3. Click **Edit**.
4. Scroll down and expand Flags.
5. To set a flag that has not been set on the instance before, click **Add item**.
6. Enter `cloudsql.enable_pgaudit` for the flag name and set the flag to on.
7. Click **Done**.
8. Click **Save** to update the configuration.
9. Confirm your changes under Flags on the Overview page.

#### From the command line
Run the following command by providing <INSTANCE_NAME> to enable `cloudsql.enable_pgaudit` flag:
```
gcloud sql instances patch <INSTANCE_NAME> --database-flags=cloudsql.enable_pgaudit=on
```
   
**Note**: Restart the database server for this configuration change to take effect.

### Create the extension
1. Connect to the the server running PostgreSQL or through a SQL client of your choice.
2. Open the PostgreSQL shell. For example, if you're using SSH to access the server, run:
3. Run the following command as a superuser:
   ```
   CREATE EXTENSION pgaudit;
   ```
### Update the `pgaudit.log` flag

#### From the console
**Note**: There are multiple options for updating the flag. The following instructions enable logging for all databases
on a server. Read [Customizing database audit logging][4] for more flag
options.

1. Go to [GCP console][1].
2. Select the instance to open its Overview page.
3. Click **Edit**.
4. Scroll down and expand Flags.
5. To set a flag that has not been set on the instance before, click **Add item**.
6. Enter `pgaudit.log=all` for the flag name and set the flag to on.
7. Click **Done**.
8. Click **Save** to update the configuration.
9. Confirm your changes under Flags on the Overview page.

#### From the command line

Run the command:
```
gcloud sql instances patch <INSTANCE_NAME> --database-flags \
cloudsql.enable_pgaudit=on,pgaudit.log=all
```

### Check for the logs in Google Logs Explorer
1. From the Google Console home page, open the menu in the top left.
2. In the menu's Operations section, select Logs Explorer.
3. In the query box, copy in the following query:

   ```
   resource.type="cloudsql_database"
   logName="projects//logs/cloudaudit.googleapis.com%2Fdata_access"
   protoPayload.request.@type="type.googleapis.com/google.cloud.sql.audit.v1.PgAuditEntry
   ```
If it returns any log sources, they are correctly set up.

## Default value
By default `cloudsql.enable_pgaudit` database flag is set to off and the extension is not enabled.

## References
1. [https://cloud.google.com/sql/docs/postgres/flags#list-flags-postgres][2]
2. [https://cloud.google.com/sql/docs/postgres/pg-audit#enable-auditing-flag][3]
3. [https://cloud.google.com/sql/docs/postgres/pg-audit#customizing-database-audit-logging][4]
4. [https://cloud.google.com/logging/docs/audit/configure-data-access#config-console-enable][5]

## Additional Information
**WARNING**: This extension modifies database flag values, which may require your instance to be
restarted. Check the [List of supported flags][6] to see if your instance needs to be restarted
when this extension is set up.
**Note**: Configuring the `cloudsql.enable_pgaudit` database flag requires restarting the Cloud
SQL PostgreSQL instance.

## CIS controls

Version 8
8.5 - Collect Detailed Audit Logs
- Configure detailed audit logging for enterprise assets containing sensitive data.
Include event source, date, username, timestamp, source addresses, destination
addresses, and other useful elements that could assist in a forensic investigation.

8.9 - Centralize Audit Logs
- Centralize, to the extent possible, audit log collection and retention across
enterprise assets.

[1]: https://console.cloud.google.com/sql/instances
[2]: https://cloud.google.com/sql/docs/postgres/flags#list-flags-postgres
[3]: https://cloud.google.com/sql/docs/postgres/pg-audit#enable-auditing-flag
[4]: https://cloud.google.com/sql/docs/postgres/pg-audit#customizing-database-audit-logging
[5]: https://cloud.google.com/logging/docs/audit/configure-data-access#config-console-enable
[6]: https://cloud.google.com/sql/docs/postgres/flags
