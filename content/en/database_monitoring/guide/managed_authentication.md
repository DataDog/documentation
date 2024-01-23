---
title: Connecting with Managed Authentication
kind: guide
algolia:
  tags: ["Microsoft Entra ID", "Azure Managed Identity", "Azure AD", "Azure Active Directory"]
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}


This guide assumes that you have configured [Database Monitoring][1].


[Datadog Database Monitoring (DBM)][8] allows you to view explain plans and query samples running on your database hosts. This guide shows you how to use cloud managed authentication features, such as IAM, to connect the Agent to your database. This provides a more secure way to authenticate and saves you from having to manage database credentials across your agent hosts.


## Before you begin


Supported databases
: Postgres, SQL Server


Supported authentication types and Agent versions
:


| Authentication Type                      | Agent Version | Postgres  | SQL Server |
|:-----------------------------------------|:--------------|:---------:|:----------:|
| [IAM][2]                                 |               |           |            |
|                                          | 7.46          | {{< X >}} |            |
| [Microsoft Entra ID Managed Identity][9] |               |           |            |
|                                          | 7.48          | {{< X >}} | {{< X >}}  |




## Configure IAM authentication


AWS supports IAM authentication to RDS and Aurora databases. In order to configure the Agent to connect using IAM, do the following:


1. Turn on IAM authentication on your [RDS][3] or [Aurora][4] instance.
2. Create an IAM role, and then attach the following policy, replacing `<YOUR_IAM_ROLE>` with the IAM role information:
```json
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
               "rds-db:connect"
           ],
           "Resource": [
               "arn:aws:rds-db:REGION:ACCOUNT:dbuser:RESOURCE_ID/<YOUR_IAM_ROLE>"
           ]
       }
   ]
}
```

For example, if you wanted to use the `datadog` user, you would use the following resource ARN:

```json
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
               "rds-db:connect"
           ],
           "Resource": [
               "arn:aws:rds-db:REGION:ACCOUNT:dbuser:RESOURCE_ID/datadog"
           ]
       }
   ]
}
```

AWS also supports wildcards for specifying the resource, for example if you wanted to allow the `datadog` user to authenticate across all instances for an account add the following:

```json
  "Resource": [
    "arn:aws:rds-db:*:ACCOUNT:dbuser:cluster-*/datadog",
    "arn:aws:rds-db:*:ACCOUNT:dbuser:db-*/datadog"
  ],
```

3. Log in to your database instance as the root user, and grant the `rds_iam` [role][20] to the new user:


```tsql
CREATE USER <YOUR_IAM_ROLE> WITH LOGIN;
GRANT rds_iam TO <YOUR_IAM_ROLE>;
```

For example, for the `datadog` user you would run:

```tsql
CREATE USER datadog WITH LOGIN;
GRANT rds_iam TO datadog;
```


**Note:** this has to be a new user created without a password, or IAM authentication will fail.

4. Complete the Agent setup steps for your [RDS][6] or [Aurora][7] instance.


5. [Attach the role][5] with each EC2 instance that is running the agent. Note, this can be done at EC2 launch time.


6. Update your Postgres instance config with an `aws` block specifying the `region` of the RDS instance:


```yaml
instances:
- dbm: true
 host: example-endpoint.us-east-2.rds.amazonaws.com
 port: 5432
 username: datadog
 aws:
   instance_endpoint: example-endpoint.us-east-2.rds.amazonaws.com
   region: us-east-2
   managed_authentication:
    enabled: true
```


## Configure Microsoft Entra ID managed identity authentication


Azure allows users to configure managed identity authentication for any resource that can access [Microsoft Entra ID][15], formerly Azure Active Directory. The Datadog Agent supports both [user and system assigned][10] managed identity authentication to your cloud databases.


### Connect to PostgreSQL


In order to configure authentication to your PostgreSQL Flexible or Single Server instance, do the following:


1. Create your [managed identity][11] in the Azure portal, and assign it to your Azure Virtual Machine where the agent is deployed.
2. Configure a [Microsoft Entra ID admin user][12] on your PostgreSQL instance.
3. Connect to your PostgreSQL instance as the [Microsoft Entra ID admin user][13], and run the following command:


```tsql
select * from pgaadauth_create_principal('<IDENTITY_NAME>', false, false);
```
4. Proceed with the normal [Agent setup steps][14] for Azure. For example:


Create the following schema **in every database**:


```tsql
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO "<IDENTITY_NAME>";
GRANT USAGE ON SCHEMA public TO "<IDENTITY_NAME>";
GRANT pg_monitor TO datadog;
```


Create the function **in every database** to enable the Agent to collect explain plans.


```tsql
CREATE OR REPLACE FUNCTION datadog.explain_statement(
  l_query TEXT,
  OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
curs REFCURSOR;
plan JSON;


BEGIN
  OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
  FETCH curs INTO plan;
  CLOSE curs;
  RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER
```


5. Configure your instance config with the `managed_identity` YAML block, where the `CLIENT_ID` is the Client ID of the Managed Identity:


```yaml
instances:
 - host: example-flex-server.postgres.database.azure.com
   dbm: true
   username: "<IDENTITY_NAME>"
   ssl: "require"
   managed_identity:
     client_id: "<CLIENT_ID>"
     # Optionally set the scope from where to request the identity token
     identity_scope: "https://ossrdbms-aad.database.windows.net/.default"
   azure:
     deployment_type: flexible_server
     fully_qualified_domain_name: example-flex-server.postgres.database.azure.com
```


### Connect to SQL Server


In order to configure authentication to your Azure SQL DB or Azure Managed Instance, do the following:


1. Create your [managed identity][11] in the Azure portal, and assign it to your Azure Virtual Machine where the agent is deployed.
2. Configure a [Microsoft Entra ID admin user][16] on your SQL Server instance.
3. Connect to your SQL Server instance as the Microsoft Entra ID admin user, and run the following command in the `master` database:


```tsql
CREATE LOGIN <MANAGED_IDENTITY_NAME> FROM EXTERNAL PROVIDER;
```
4. Proceed with the normal Agent setup steps, for Azure. For example, for [Azure Managed Instance][17]:


```tsql
CREATE USER <MANAGED_IDENTITY_NAME> FOR LOGIN <MANAGED_IDENTITY_NAME>;
GRANT CONNECT ANY DATABASE to <MANAGED_IDENTITY_NAME>;
GRANT VIEW SERVER STATE to <MANAGED_IDENTITY_NAME>;
GRANT VIEW ANY DEFINITION to <MANAGED_IDENTITY_NAME>;
GO
```


If you are using [Azure SQL DB][19], run the following from the `master` database:


```tsql
CREATE LOGIN <MANAGED_IDENTITY_NAME> FROM EXTERNAL PROVIDER;
CREATE USER datadog FOR LOGIN <MANAGED_IDENTITY_NAME>;
ALTER SERVER ROLE ##MS_ServerStateReader## ADD MEMBER <MANAGED_IDENTITY_NAME>;
ALTER SERVER ROLE ##MS_DefinitionReader## ADD MEMBER <MANAGED_IDENTITY_NAME>;
```


And then create the user **in every database**:


```tsql
CREATE USER <DBM_DATADOG_TEST_IDENTITY> FOR LOGIN <DBM_DATADOG_TEST_IDENTITY>;
```


5. Update your instance config with the `managed_identity` config block:


**Note**: [ODBC Driver 17 for SQL Server][18] or greater is required to use this feature.


```yaml
instances:
 - host: "example.cfcc2366ab90.database.windows.net,1433"
   connector: "odbc"
   driver: "{ODBC Driver 18 for SQL Server}"
   dbm: true
   connection_string: "TrustServerCertificate=no;Encrypt=yes;"
   managed_identity:
     client_id: "<CLIENT_ID>"
   azure:
     deployment_type: managed_instance
     fully_qualified_domain_name: example.cfcc2366ab90.database.windows.net
```


[1]: /database_monitoring/#getting-started
[2]: https://repost.aws/knowledge-center/rds-postgresql-connect-using-iam
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.Enabling.html
[4]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.Enabling.html
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[6]: /database_monitoring/setup_postgres/rds/#grant-the-agent-access
[7]: /database_monitoring/setup_postgres/aurora/#grant-the-agent-access
[8]: /database_monitoring
[9]: https://learn.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview
[10]: https://learn.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview#managed-identity-types
[11]: https://learn.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/how-manage-user-assigned-managed-identities?pivots=identity-mi-methods-azp#create-a-user-assigned-managed-identity
[12]: https://learn.microsoft.com/en-us/azure/postgresql/single-server/how-to-configure-sign-in-azure-ad-authentication
[13]: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/how-to-configure-sign-in-azure-ad-authentication#authenticate-with-azure-ad
[14]: /database_monitoring/setup_postgres/azure/#grant-the-agent-access
[15]: https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/whatis
[16]: https://learn.microsoft.com/en-us/azure/azure-sql/database/authentication-aad-configure?view=azuresql&tabs=azure-powershell#provision-azure-ad-admin-sql-managed-instance
[17]: /database_monitoring/setup_sql_server/azure/?tab=azuresqlmanagedinstance
[18]: https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16
[19]: /database_monitoring/setup_sql_server/azure/?tab=azuresqldatabase
[20]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html#UsingWithRDS.IAMDBAuth.DBAccounts.PostgreSQL
