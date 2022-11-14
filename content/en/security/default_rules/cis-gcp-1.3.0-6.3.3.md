---
aliases:
- 507-k4f-e0f
- /security_monitoring/default_rules/507-k4f-e0f
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.3.3
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: '''user connections'' database flag is set to a non-limiting value for SQL
  Server Instance'
type: security_rules
---

## Description
It is recommended to check the `user connections` option for a GCP SQL Server instance to
ensure that it is not artificially limiting connections.

## Rationale

The `user connections` option specifies the maximum number of simultaneous user
connections that are allowed on an instance of SQL Server. The actual number of user
connections allowed also depends on the version of SQL Server that you are using, and also
the limits of your application(s) and hardware. SQL Server allows a maximum
of 32,767 user connections. Because user connections is by default a self-configuring value,
SQL Server adjusts the maximum number of user connections automatically as
needed, up to the maximum value allowed. For example, if only 10 users are logged in, then 10
user connection objects are allocated. In most cases, you do not have to change the value
for this option. The default is `0`, which means that the maximum (32,767) user connections
are allowed. However, if there is a number defined here that limits connections, SQL Server
will not allow any connections above this limit. If the connections are at the limit, any new
requests will be dropped, potentially causing lost data or outages for those using the
database.

## Impact
Setting custom flags using the command line on certain instances will cause all omitted flags to be
reset to defaults. This may cause you to lose custom flags and could result in unforeseen
complications or instance restarts. Because of this, it is recommended you apply these flag
changes during a period of low usage.

## Remediation

### Using the console
1. Go to the [Cloud SQL Instances page][1] in the Google Cloud Console.
2. Select the SQL Server instance for which you want to enable to database flag.
3. Click **Edit**.
4. Scroll down to the Flags section.
5. Click **Add item** to set a flag that has not been set on the instance before. Choose the
flag `user connections` from the drop-down menu, and set its value to your organization's recommended value.
6. Click **Save** to save your changes.
7. Confirm your changes under the Flags section on the Overview page.

### Using the command line
1. Configure the `user connections` database flag for every GCP SQL Server
database instance using the below command.
   ```
   gcloud sql instances patch <INSTANCE_NAME> --database-flags "userconnections=[0-32,767]"
   ```
   


Note: This command will overwrite all database flags previously set. To keep the flags previously set and add new ones, include the values for all flags you want set on the instance; any flag not specifically included is set to its default value. For flags that do not take a value, specify the flag name followed by an equals sign (=).

## Default value
By default `user connections` is set to '0', which does not limit the number of connections
and allows the server to facilitate a maximum of 32,767 connections.

## References
1. [https://cloud.google.com/sql/docs/sqlserver/flags][2]
2. [https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/configure-the-user-connections-server-configuration-option?view=sql-server-ver15][3]
3. [https://www.stigviewer.com/stig/ms_sql_server_2016_instance/2018-03-09/finding/V-79119][4]

## Additional Information

WARNING: This patch modifies database flag values, which may require your instance to be restarted. Check the list of [supported flags][2] to see if your instance will be restarted when this patch is submitted. 

Note: Some database flag settings can affect instance availability or stability, and remove the instance from the Cloud SQL SLA. For information about these flags, see Operational Guidelines.

Note: Configuring the above flag does not restart the GCP SQL instance.


[1]: https://console.cloud.google.com/sql/instances
[2]: https://cloud.google.com/sql/docs/sqlserver/flags
[3]: https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/configure-the-user-connections-server-configuration-option?view=sql-server-ver15
[4]: https://www.stigviewer.com/stig/ms_sql_server_2016_instance/2018-03-09/finding/V-79119
