---
title: Setting Up Database Monitoring for Google Cloud SQL managed SQL Server
kind: documentation
description: Install and configure Database Monitoring for SQL Server managed on Google Cloud SQL
further_reading:
- link: "/integrations/sqlserver/"
  tag: "Documentation"
  text: "SQL Server Integration"
- link: "/database_monitoring/troubleshooting/?tab=sqlserver"
  tag: "Documentation"
  text: "Troubleshoot Common Issues"


---

{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

<div class="alert alert-warning">Database Monitoring for SQL Server is in private beta. Contact your Customer Success Manager to request access to the beta.</div>

Database Monitoring provides deep visibility into your Microsoft SQL Server databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

Complete the following steps to enable Database Monitoring with your database:

1. [Grant the Agent access to the database](#grant-the-agent-access)
2. [Install the Agent](#install-the-agent)
3. [Install the Cloud SQL integration](#install-the-cloud-sql-integration)

## Before you begin

{{% dbm-sqlserver-before-you-begin %}}

## Grant the Agent access

The Datadog Agent requires read-only access to the database server to collect statistics and queries.

Create a `datadog` user [on the Cloud SQL instance][1].

To maintain read-only access for the agent, remove the `datadog` user from the default `CustomerDbRootRole`. Instead, grant only the explicit permissions required by the agent.

```SQL
GRANT VIEW SERVER STATE to datadog as CustomerDbRootRole;
GRANT VIEW ANY DEFINITION to datadog as CustomerDbRootRole;
ALTER SERVER ROLE CustomerDbRootRole DROP member datadog;
```

Create the `datadog` user in each additional application database:
```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```

This is required because Cloud SQL does not permit granting `CONNECT ANY DATABASE`. The Datadog Agent needs to connect to each database to collect database-specific file I/O statistics.

## Install the Agent

GCP does not grant direct host access, meaning the Datadog Agent must be installed on a separate host where it is able to talk to the SQL Server host. There are several options for installing and running the Agent.

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

## Install the Cloud SQL integration

To collect more comprehensive database metrics from Google Cloud SQL, install the [Google Cloud SQL integration][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/sql/docs/sqlserver/create-manage-users#creating
[2]: /integrations/google_cloudsql
