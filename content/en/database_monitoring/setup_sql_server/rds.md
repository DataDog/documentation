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

{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

<div class="alert alert-warning">Database Monitoring for SQL Server is in private beta. Contact your Customer Success Manager to request access to the beta.</div>

Database Monitoring provides deep visibility into your Microsoft SQL Server databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

Do the following steps to enable Database Monitoring with your database:

1. [Grant the Agent access to the database](#grant-the-agent-access)
2. [Install the Agent](#install-the-agent)
3. [Install the RDS integration](#install-the-rds-integration)

## Before you begin

{{% dbm-sqlserver-before-you-begin %}}

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

Since AWS does not grant direct host access, the Datadog Agent must be installed somewhere separately where it has access to the RDS host. There are several options for installing and running the agent.

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

## Install the RDS Integration

To collect more comprehensive database metrics and logs from AWS, install the [RDS integration][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_rds
