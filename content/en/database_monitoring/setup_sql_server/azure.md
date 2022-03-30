---
title: Setting Up Database Monitoring for Azure SQL Server
kind: documentation
description: Install and configure Database Monitoring for SQL Server managed on Azure.
further_reading:
- link: "/integrations/sqlserver/"
  tag: "Documentation"
  text: "Basic SQL Server Integration"
- link: "/database_monitoring/troubleshooting/?tab=sqlserver"
  tag: "Documentation"
  text: "Troubleshoot Common Issues"


---

{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

<div class="alert alert-warning">Database Monitoring for SQL Server is in private beta. Contact your Customer Success Manager to request access to the beta.</div>

Database Monitoring provides deep visibility into your Microsoft SQL Server databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

Do the following steps to enable Database Monitoring with your database:

1. [Grant the Agent access to the database](#grant-the-agent-access)
2. [Install the Agent](#install-the-agent)
3. [Install the Azure integration](#install-the-azure-integration)

## Before you begin

{{% dbm-sqlserver-before-you-begin %}}

## Grant the Agent access

The Datadog Agent requires read-only access to the database server in order to collect statistics and queries.

{{< tabs >}}

{{% tab "Azure SQL Database" %}}

Create a read-only login to connect to your server and grant the required [Azure SQL Roles][1]:
```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
ALTER SERVER ROLE ##MS_ServerStateReader## ADD MEMBER datadog;
ALTER SERVER ROLE ##MS_DefinitionReader## ADD MEMBER datadog;
```


[1]: https://docs.microsoft.com/en-us/azure/azure-sql/database/security-server-roles
{{% /tab %}}

{{% tab "Azure SQL Managed Instance" %}}

Create a read-only login to connect to your server and grant the required permissions:

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
```

{{% /tab %}}

{{% tab "SQL Server on Windows Azure VM" %}}

For [SQL Server on Windows Azure VM][1] follow the [Self-hosted instructions][2] to install the Datadog Agent directly on the Windows Server host VM.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview
[2]: /database_monitoring/setup_sql_server/selfhosted/
{{% /tab %}}

{{< /tabs >}}

## Install the Agent

{{< tabs >}}
{{% tab "Windows Host" %}}
{{% dbm-sqlserver-agent-setup-windows %}}
{{% /tab %}}
{{% tab "Linux Host" %}}
{{% dbm-sqlserver-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-sqlserver-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-sqlserver-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

## Install the Azure integration

To collect more comprehensive database metrics and logs from Azure, install the [Azure integration][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/azure
