---
title: Azure SQL Configurations
description: Configure Azure SQL instance scoping for Database Monitoring across SQL Database, Managed Instance, and Elastic Pool deployment types.
further_reading:
- link: "/database_monitoring/architecture/"
  tag: "Documentation"
  text: "DBM Setup Architectures"
- link: "/database_monitoring/setup_sql_server/"
  tag: "Documentation"
  text: "Setting up SQL Server"
---

## Overview

Each check instance in the Datadog Agent configuration creates one Database Monitoring (DBM) instance. Azure SQL is a family of three deployment types, each using the SQL Server check but with different behavior.

<table>
  <thead>
    <tr>
      <th style="min-width:180px">Deployment type</th>
      <th>Database Autodiscovery</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>sql_database</code></td>
      <td>Not supported</td>
      <td>One config entry per database required</td>
    </tr>
    <tr>
      <td><code>managed_instance</code></td>
      <td>Supported</td>
      <td>Behaves like on-premises SQL Server</td>
    </tr>
    <tr>
      <td>Elastic pool</td>
      <td>Not supported</td>
      <td>Elastic pool is a billing unit only; databases connect like <code>sql_database</code></td>
    </tr>
  </tbody>
</table>

The `$azure_name` template variable strips `.database.windows.net` from the host. For example: `myserver.database.windows.net` → `myserver`.

## Azure SQL Database

Azure SQL Database requires one config entry per database. `database_autodiscovery` is not supported for this deployment type. The Agent can only connect to one database per check instance.

**Scenario**: Logical server `myserver.database.windows.net` with three databases:

| Database | Notes |
|---|---|
| `app_db` | Production application database |
| `analytics_db` | Analytics workload |
| `audit_db` | Audit records |

### Option 1: Database level (recommended)

<div class="alert alert-info">Use database-level scoping (<code>$azure_name-$database</code>). This is the only option that delivers full DBM data for Azure SQL Database. Update the config manually when databases are added or removed.</div>

Based on the example scenario above, this counts as three DBM instances.

```yaml
instances:
  - host: myserver.database.windows.net
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database: app_db
    azure:
      deployment_type: sql_database
      fully_qualified_domain_name: myserver.database.windows.net
    database_identifier:
      template: "$azure_name-$database"   # → "myserver-app_db"

  - host: myserver.database.windows.net
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database: analytics_db
    azure:
      deployment_type: sql_database
      fully_qualified_domain_name: myserver.database.windows.net
    database_identifier:
      template: "$azure_name-$database"   # → "myserver-analytics_db"

  - host: myserver.database.windows.net
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database: audit_db
    azure:
      deployment_type: sql_database
      fully_qualified_domain_name: myserver.database.windows.net
    database_identifier:
      template: "$azure_name-$database"   # → "myserver-audit_db"
```

### Option 2: Logical server level

<div class="alert alert-info">Use logical server level only if per-database DBM data is not required. Query samples and explain plans are not collected at this scope.</div>

One entry connected to `master` covers server-level metadata only.

Based on the example scenario above, this counts as one DBM instance.

```yaml
instances:
  - host: myserver.database.windows.net
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database: master
    azure:
      deployment_type: sql_database
      fully_qualified_domain_name: myserver.database.windows.net
    database_identifier:
      template: "$azure_name"   # → "myserver"
```

## Azure SQL Managed Instance

Azure SQL Managed Instance uses engine edition 8, which supports `database_autodiscovery` and behaves like on-premises SQL Server.

**Scenario**: Managed instance `myinstance.a1b2c3d4e5f6.database.windows.net` with three databases:

| Database | Notes |
|---|---|
| `app_db` | Production application database |
| `analytics_db` | Analytics workload |
| `audit_db` | Audit records |

### Option 1: Instance level (recommended)

<div class="alert alert-info">Use instance-level scoping (<code>$azure_name</code>). One entry with <code>database_autodiscovery: true</code> requires no manual updates as databases are added or removed.</div>

One entry with `database_autodiscovery: true` covers all databases automatically.

Based on the example scenario above, this counts as one DBM instance.

```yaml
instances:
  - host: myinstance.a1b2c3d4e5f6.database.windows.net
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database_autodiscovery: true
    azure:
      deployment_type: managed_instance
      fully_qualified_domain_name: myinstance.a1b2c3d4e5f6.database.windows.net
    database_identifier:
      template: "$azure_name"   # → "myinstance"
```

With managed identity authentication:

```yaml
instances:
  - host: myinstance.a1b2c3d4e5f6.database.windows.net
    dbm: true
    database_autodiscovery: true
    azure:
      deployment_type: managed_instance
      fully_qualified_domain_name: myinstance.a1b2c3d4e5f6.database.windows.net
    managed_identity:
      client_id: "<MANAGED_IDENTITY_CLIENT_ID>"
      identity_scope: "https://database.windows.net/.default"
    database_identifier:
      template: "$azure_name"
```

### Option 2: Database level

<div class="alert alert-info">Use database-level scoping only if different teams own different databases and need isolated DBM views, or if billing requires per-database cost attribution.</div>

One entry per database. Use only if different teams own different databases and need isolated DBM views, or if billing requires per-database cost attribution.

Based on the example scenario above, this counts as three DBM instances.

```yaml
instances:
  - host: myinstance.a1b2c3d4e5f6.database.windows.net
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database: app_db
    azure:
      deployment_type: managed_instance
      fully_qualified_domain_name: myinstance.a1b2c3d4e5f6.database.windows.net
    database_identifier:
      template: "$azure_name-$database"   # → "myinstance-app_db"
    database_metrics:
      instance_metrics:
        enabled: false   # prevent duplicate instance-level metrics across entries
```

## Azure SQL Elastic Pools

Elastic pools are a resource allocation unit only. They are not visible at the connection layer. Each database in a pool connects exactly like a standalone Azure SQL Database. Pool-level metrics are available through the Datadog Azure Monitor integration, not the SQL Server check.

**Scenario**: Logical server `myserver.database.windows.net` with five databases across two elastic pools:

| Database | Pool |
|---|---|
| `app_db` | ElasticPool1 |
| `analytics_db` | ElasticPool1 |
| `audit_db` | ElasticPool1 |
| `reports_db` | ElasticPool2 |
| `exports_db` | ElasticPool2 |

### Option 1: Per-database with pool tags (recommended)

<div class="alert alert-info">Use per-database scoping with <code>pool:&lt;name&gt;</code> tags (<code>$azure_name-$database</code>). Per-database is the only viable approach. Elastic pools are invisible to the connection layer. Tags provide pool grouping for dashboards and monitors.</div>

Add a `pool:<name>` tag to each entry to enable filtering across a pool in dashboards and monitors.

Based on the example scenario above, this counts as five DBM instances.

```yaml
instances:
  - host: myserver.database.windows.net
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database: app_db
    azure:
      deployment_type: sql_database
      fully_qualified_domain_name: myserver.database.windows.net
    tags:
      - "pool:ElasticPool1"
    database_identifier:
      template: "$azure_name-$database"   # → "myserver-app_db"

  - host: myserver.database.windows.net
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database: analytics_db
    azure:
      deployment_type: sql_database
      fully_qualified_domain_name: myserver.database.windows.net
    tags:
      - "pool:ElasticPool1"
    database_identifier:
      template: "$azure_name-$database"   # → "myserver-analytics_db"

  - host: myserver.database.windows.net
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database: reports_db
    azure:
      deployment_type: sql_database
      fully_qualified_domain_name: myserver.database.windows.net
    tags:
      - "pool:ElasticPool2"
    database_identifier:
      template: "$azure_name-$database"   # → "myserver-reports_db"

  # Repeat for remaining databases with the appropriate pool tag
```

### Option 2: Per-database, no pool grouping

<div class="alert alert-info">Use this option if pool grouping in dashboards and monitors is not required.</div>

Based on the example scenario above, this counts as five DBM instances.

```yaml
instances:
  - host: myserver.database.windows.net
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database: app_db
    azure:
      deployment_type: sql_database
      fully_qualified_domain_name: myserver.database.windows.net
    database_identifier:
      template: "$azure_name-$database"   # → "myserver-app_db"

  # Repeat for remaining databases
```

{{< partial name="whats-next/whats-next.html" >}}
