---
title: Setting up Postgres
description: Setting up Database Monitoring on a Postgres database
content_filters:
  - trait_id: postgres_version
    option_group_id: postgres_version_options
  - trait_id: host
    option_group_id: postgres_hosting_options
---

### Postgres versions supported

| Version      | Self-hosted | Amazon RDS | Amazon Aurora | Google Cloud SQL | Google AlloyDB | Azure     | Supabase  |
| ------------ | ----------- | ---------- | ------------- | ---------------- | -------------- | --------- | --------- |
| Postgres 9.6 | {{< X >}}   | {{< X >}}  | {{< X >}}     |                  |                | {{< X >}} |           |
| Postgres 10  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        |                | {{< X >}} |           |
| Postgres 11  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        |                | {{< X >}} |           |
| Postgres 12  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        |                | {{< X >}} |           |
| Postgres 13  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        |                | {{< X >}} |           |
| Postgres 14  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        | {{< X >}}      | {{< X >}} | {{< X >}} |
| Postgres 15  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        | {{< X >}}      | {{< X >}} | {{< X >}} |
| Postgres 16  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        | {{< X >}}      | {{< X >}} | {{< X >}} |
| Postgres 17  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        | {{< X >}}      |           | {{< X >}} |
| Postgres 18  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        | {{< X >}}      | {{< X >}} |           |

{% if equals($host, "self_hosted") %}
Database Monitoring provides deep visibility into your Postgres databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your Postgres database:

1. [Configure database parameters](#configure-postgres-settings)
1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install the Agent](#install-the-agent)

## Before you begin

Supported PostgreSQL versions
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17, 18

Prerequisites
: Postgres additional supplied modules must be installed. For most installations, this is included by default but less conventional installations might require an additional installation of your version of [the `postgresql-contrib` package][1].

Supported Agent versions
: 7.36.1+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][2]).

Proxies, load balancers, and connection poolers
: The Datadog Agent must connect directly to the host being monitored. For self-hosted databases, use `127.0.0.1` or the socket. The Agent should not connect to the database through a proxy, load balancer, or connection pooler such as `pgbouncer`. If the Agent connects to different hosts while it is running (as in the case of failover, load balancing, and so on), the Agent calculates the difference in statistics between two hosts, producing inaccurate metrics.

Data security considerations
: See [Sensitive information][3] for information about what data the Agent collects from your databases and how to ensure it is secure.

## Configure Postgres settings

Configure the following [parameters][4] in the `postgresql.conf` file and then **restart the server** for the settings to take effect. For more information about these parameters, see the [Postgres documentation][5].

**Required parameters**

| Parameter | Value | Description |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Required for `postgresql.queries.*` metrics. Enables collection of query metrics using the [pg_stat_statements][5] extension. |
| `track_activity_query_size` | `4096` | Required for collection of larger queries. Increases the size of SQL text in `pg_stat_activity`. If left at the default value then queries longer than `1024` characters will not be collected. |

{% /if %}
{% if equals($host, "rds") %}
RDS Content!!

Database Monitoring provides deep visibility into your Postgres databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your Postgres database:

1. [Configure the AWS integration](#configure-the-aws-integration)
1. [Configure database parameters](#configure-postgres-settings)
1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install and configure the Agent](#install-and-configure-the-agent)
1. [Install the RDS integration](#install-the-rds-integration)

<div class="alert alert-info">
<a href="/database_monitoring/setup_postgres/rds/quick_install">RDS Quick Install</a> is our recommended installation method for smaller environments (for example 20 database hosts) or those new to DBM and want to try it out quickly. For those managing large fleets of databases where deploying the agent via UI doesn't scale as well we recommend the standard installation, to manually manage the agent yourself or integrate with your automation practices.
</div>

## Before you begin

Supported PostgreSQL versions
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17, 18

Supported Agent versions
: 7.36.1+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][1]).

Proxies, load balancers, and connection poolers
: The Datadog Agent must connect directly to the host being monitored. For self-hosted databases, use `127.0.0.1` or the socket. The Agent should not connect to the database through a proxy, load balancer, or connection pooler such as `pgbouncer`. If the Agent connects to different hosts while it is running (as in the case of failover, load balancing, and so on), the Agent calculates the difference in statistics between two hosts, producing inaccurate metrics.

Data security considerations
: See [Sensitive information][2] for information about what data the Agent collects from your databases and how to ensure it is secure.

## Configure the AWS integration

Enable {{< ui >}}Resource Collection{{< /ui >}} in the {{< ui >}}Resource Collection{{< /ui >}} section of your [Amazon Web Services integration tile][3].
{% /if %}

### Setup instructions by hosting type

To learn how to set up Database Monitoring on a Postgres database, select your hosting type:

{{< card-grid card_width="200px" >}}
  {{< image-card href="/database_monitoring/setup_postgres/selfhosted" src="integrations_logos/postgres.png" alt="Selfhosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_postgres/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_postgres/aurora" src="integrations_logos/aurora.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_postgres/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/alloydb" src="integrations_logos/google_cloud_alloydb.png" alt="Google Cloud SQL" image_width="100">}}
  {{< image-card href="/database_monitoring/setup_postgres/azure" src="integrations_logos/azure_db_for_postgresql.png" alt="PostgreSQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/heroku" src="integrations_logos/heroku.png" alt="PostgreSQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/supabase" src="integrations_logos/supabase.png" alt="Supabase" >}}
{{< /card-grid >}}
