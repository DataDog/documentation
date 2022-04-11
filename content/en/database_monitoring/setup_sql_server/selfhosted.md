---
title: Setting Up Database Monitoring for self-hosted SQL Server
kind: documentation
description: Install and configure Database Monitoring for self-hosted SQL Server
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

1. [Configure the database](#configure-sql-server-settings)
2. [Grant the Agent access to the database](#grant-the-agent-access)
3. [Install the Agent](#install-the-agent)

## Before you begin

{{% dbm-sqlserver-before-you-begin %}}

## Configure SQL Server settings

In the server properties for your SQL Server instance, navigate to **Server Properties** -> **Security** -> **SQL Server and Windows Authentication mode** and ensure that your SQL Server instance supports SQL Server authentication by enabling `SQL Server and Windows Authentication mode`.

## Grant the Agent access

The Datadog Agent requires read-only access to the database server in order to collect statistics and queries.

Create a read-only login to connect to your server and grant the required permissions:

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
```

## Install the Agent

{{< tabs >}}
{{% tab "Windows Host" %}}
{{% dbm-sqlserver-agent-setup-windows-local %}}
{{% /tab %}}
{{% tab "Linux Host" %}}
{{% dbm-sqlserver-agent-setup-linux-local %}}
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
