---
title: Setting Up Database Monitoring for self-hosted SQL Server
description: Install and configure Database Monitoring for self-hosted SQL Server
further_reading:
- link: /integrations/sqlserver/
  tag: Documentation
  text: Basic SQL Server Integration
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: Documentation
  text: Troubleshoot Common Issues
- link: "https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/"
  tag: Blog
  text: Strategize your Azure migration for SQL workloads with Datadog
- link: "https://www.datadoghq.com/blog/datadog-monitoring-always-on/"
  tag: Blog
  text: Monitor your AlwaysOn availability groups with Datadog Database Monitoring

---

Database Monitoring provides deep visibility into your Microsoft SQL Server databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

Do the following steps to enable Database Monitoring with your database:

1. [Grant the Agent access](#grant-the-agent-access)
1. [Install the Agent](#install-the-agent)

## Before you begin

Supported SQL Server versions
: 2012, 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## Grant the Agent access

The Datadog Agent requires read-only access to the database server in order to collect statistics and queries.

Create a read-only login to connect to your server and grant the required permissions:

{{< tabs >}}
{{% tab "SQL Server 2014+" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- To use Log Shipping Monitoring (available in Agent v7.50+), uncomment the next three lines:
-- USE msdb;
-- CREATE USER datadog FOR LOGIN datadog;
-- GRANT SELECT to datadog;
```
{{% /tab %}}
{{% tab "SQL Server 2012" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- To use Log Shipping Monitoring (available in Agent v7.50+), uncomment the next three lines:
-- USE msdb;
-- CREATE USER datadog FOR LOGIN datadog;
-- GRANT SELECT to datadog;
```

Create the `datadog` user in each additional application database:
```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```
{{% /tab %}}
{{< /tabs >}}

## Install the Agent

It's recommended to install the agent directly on the SQL Server host as that enables the agent to collect a variety of system telemetry (CPU, memory, disk, network) in addition to SQL Server specific telemetry.

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
