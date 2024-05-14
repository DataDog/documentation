---
title: Setting Up Database Monitoring for SQL Server on Amazon RDS
kind: documentation
description: Install and configure Database Monitoring for SQL Server managed on RDS.
further_reading:
- link: "/integrations/sqlserver/"
  tag: "Documentation"
  text: "Basic SQL Server Integration"
- link: "/database_monitoring/troubleshooting/?tab=sqlserver"
  tag: "Documentation"
  text: "Troubleshoot Common Issues"


---

Database Monitoring provides deep visibility into your Microsoft SQL Server databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

Do the following steps to enable Database Monitoring with your database:

1. [Configure the AWS integration](#configure-the-aws-integration)
1. [Grant the Agent access](#grant-the-agent-access)
1. [Install the Agent](#install-the-agent)
1. [Install the RDS integration](#install-the-rds-integration)

## Before you begin

Supported SQL Server versions
: 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## Configure the AWS integration

Enable **Standard Collection** in the **Resource Collection** section of your [Amazon Web Services integration tile][2].

## Grant the Agent access

The Datadog Agent requires read-only access to the database server to collect statistics and queries.

Create a read-only login to connect to your server and grant the required permissions:

```SQL
USE [master];
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
GO
--Set context to msdb database and create datadog user
USE [msdb];
CREATE USER datadog FOR LOGIN datadog;
-- To use Log Shipping Monitoring (available in Agent v7.50+), uncomment the next line:
-- GRANT SELECT to datadog;
GO
--Switch back to master and grant datadog user server permissions
USE [master];
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
GO
```

Create the `datadog` user in each additional application database:
```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```

This is required because RDS does not permit granting `CONNECT ANY DATABASE`. The Datadog Agent needs to connect to each database to collect database-specific file I/O statistics.

## Install the Agent

Because AWS does not grant direct host access, the Datadog Agent must be installed on a separate host where it is able to talk to the SQL Server host. There are several options for installing and running the Agent.

{{< tabs >}}
{{% tab "Windows Host" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-windows %}}
{{% /tab %}}
{{% tab "Linux Host" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

## Example Agent Configurations
{{% dbm-sqlserver-agent-config-examples %}}

## Install the RDS integration

To collect more comprehensive database metrics and logs from AWS, install the [RDS integration][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_rds
[2]: https://app.datadoghq.com/integrations/amazon-web-services
