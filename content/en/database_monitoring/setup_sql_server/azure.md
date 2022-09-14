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

Database Monitoring provides deep visibility into your Microsoft SQL Server databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

Do the following steps to enable Database Monitoring with your database:

1. [Grant the Agent access to the database](#grant-the-agent-access)
2. [Install the Agent](#install-the-agent)
3. [Install the Azure integration](#install-the-azure-integration)

## Before you begin

Supported SQL Server versions
: 2012, 2014, 2016, 2017, 2019

{{% dbm-sqlserver-before-you-begin %}}

## Grant the Agent access

The Datadog Agent requires read-only access to the database server to collect statistics and queries.

{{< tabs >}}

{{< tab "Azure SQL Database" >}}
{{< /tab >}}

{{< tab "Azure SQL Managed Instance" >}}
{{< /tab >}}

{{< tab "SQL Server on Windows Azure VM" >}}
{{< /tab >}}

{{< /tabs >}}

## Install the Agent

Since Azure does not grant direct host access, the Datadog Agent must be installed on a separate host where it is able to talk to the SQL Server host. There are several options for installing and running the Agent.

{{< tabs >}}
{{< tab "Windows Host" >}}
{{< /tab >}}
{{< tab "Linux Host" >}}
{{< /tab >}}
{{< tab "Docker" >}}
{{< /tab >}}
{{< tab "Kubernetes" >}}
{{< /tab >}}
{{< /tabs >}}

## Install the Azure integration

To collect more comprehensive database metrics and logs from Azure, install the [Azure integration][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/azure
