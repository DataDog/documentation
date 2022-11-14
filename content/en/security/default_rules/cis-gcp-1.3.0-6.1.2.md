---
aliases:
- e1p-hge-10v
- /security_monitoring/default_rules/e1p-hge-10v
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.1.2
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''skip_show_database'' flag is set to ''on'' for MySQL Instance'
type: security_rules
---

## Description

It is recommended that for Cloud SQL Instances, you set the `skip_show_database` database flag to `ON`.

## Rationale

The `skip_show_database` database flag prevents people from using the `SHOW DATABASES`
statement if they do not have the `SHOW DATABASES` privilege. This can improve security if
you have concerns about users being able to see databases belonging to other users. The `skip_show_database` flag's effect depends on the `SHOW DATABASES` privilege: If the variable value is `ON`, the `SHOW
DATABASES` statement is permitted only for users who have the `SHOW DATABASES`
privilege, and the statement displays all database names. If the value is `OFF`, `SHOW
DATABASES` is permitted for all users, but displays the names of only those databases for
which the user has `SHOW DATABASES` or other privilege. This recommendation is
applicable to MySQL database instances.

## Remediation

## Using console

1. Go to the [Cloud SQL Instances page][1] in the Google Cloud Console.
2. Select the MySQL instance for which you want to enable the database flag.
3. Click **Edit**.
4. Scroll down to the **Flags** section.
5. To set a flag that has not been set on the instance before, click **Add item**, choose the flag `skip_show_database` from the drop-down menu, and set its value to `ON`.
6. Click **Save** to save your changes.
7. Confirm your changes under **Flags** on the **Overview** page.


## Using command line:
1. To list all Cloud SQL database Instances, run:
    `gcloud sql instances list`
2. Configure the `skip_show_database` database flag for every Cloud SQL MySQL database instance using the following command:
   
   ```
   gcloud sql instances patch INSTANCE_NAME --database-flags
   skip_show_database=on
   ```
    **Note**: This command overwrites all database flags previously set. To keep the previously set flags and add new ones, include the values for all flags you want set on the instance; any flag not specifically included is set to its default value. For flags that do not take a value, specify the flag name followed by an equals sign (`=`).

## References
1. [https://cloud.google.com/sql/docs/mysql/flags][2]
2. [https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_skip_show_database][3]


## Additional information

**Warning**: This patch modifies database flag values, which may require your instance to be restarted. Check the [list of supported flags][2] to see if your instance will be restarted when this patch is submitted.

**Note**: Some database flag settings can affect instance availability or stability, and remove the instance from the Cloud SQL SLA. For information about these flags, see Operational Guidelines.

**Note**: Configuring the above flag restarts the Cloud SQL instance.

## CIS controls
Version 8, 3.3 - Configure Data Access Control Lists
- Configure data access control lists based on a user’s need to know. Apply data
  access control lists, also known as access permissions, to local and remote file systems,
  databases, and applications.

  [1]: https://console.cloud.google.com/sql/instances
  [2]: https://cloud.google.com/sql/docs/mysql/flags
  [3]: https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_skip_show_database
