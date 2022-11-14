---
aliases:
- 63a-awx-lg9
- /security_monitoring/default_rules/63a-awx-lg9
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.7
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: Automated backups are configured for SQL Database Instances
type: security_rules
---

## Description: 
All SQL database instances should have automated backups enabled.

## Rationale: 
Backups provide a way to restore a Cloud SQL instance, to recover lost data, or to recover from
a problem with that instance. Enable automated backups for any instance that
contains data that should be protected from loss or damage. This recommendation is
applicable for SQL Server, PostgreSql, MySql generation 1 and MySql generation 2
instances.

## Impact: 
Automated backups increase the required storage size and may affect the costs associated with it.

## Remediation: 

### From the console
1. Go to the Cloud SQL Instances page in the Google Cloud Console:
[https://console.cloud.google.com/sql/instances][1]
2. Select the instance where the backups need to be configured.
3. Click `Edit`.
4. In the `Backups` section, check 'Enable automated backups', and choose a backup window.
5. Click `Save`.

### From the command line

1. List all Cloud SQL database instances using the following command:
   ```
   gcloud sql instances list
   ```
2. Enable automated backups for a Cloud SQL database instance by running:
   ```
   gcloud sql instances patch <INSTANCE_NAME> --backup-start-time <[HH:MM]>
   ```

The `backup-start-time` parameter is specified in 24-hour time, in the UTC±00 time zone,
and specifies the start of a 4-hour backup window. Backups can start any time during the
backup window.

## Default value:
By default, automated backups are not configured for Cloud SQL instances. Data backup is
not possible on any Cloud SQL instance unless Automated Backup is configured.

## References:
1. [https://cloud.google.com/sql/docs/mysql/backup-recovery/backups][2]
2. [https://cloud.google.com/sql/docs/postgres/backup-recovery/backing-up][3]

[1]: https://console.cloud.google.com/sql/instances
[2]: https://cloud.google.com/sql/docs/mysql/backup-recovery/backups
[3]: https://cloud.google.com/sql/docs/postgres/backup-recovery/backing-up

## CIS controls:

Version 8: _11.2 Perform Automated Backups_. Perform automated backups of in-scope enterprise assets. Run backups weekly,
or more frequently, based on the sensitivity of the data.
