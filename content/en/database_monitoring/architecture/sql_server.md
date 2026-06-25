---
title: SQL Server Configurations
description: Configure SQL Server instance scoping for Database Monitoring, covering named instances, port-based instances, and database-level options.
further_reading:
- link: "/database_monitoring/architecture/"
  tag: "Documentation"
  text: "DBM Setup Architectures"
- link: "/database_monitoring/setup_sql_server/"
  tag: "Documentation"
  text: "Setting up SQL Server"
---

## Overview

Each check instance in the Datadog Agent configuration creates one Database Monitoring (DBM) instance. The [database_identifier](/database_monitoring/guide/database_identifier/) template determines what the Agent considers a distinct DBM instance.

| Key difference | Details |
|---|---|
| Host format | `HOST,PORT` (comma, not colon) |
| Named instances | Use `HOST\INSTANCENAME` with port `0` to trigger SQL Server Browser Service (SSBS) |
| DBM scope | DMVs (`sys.dm_exec_*`) are instance-wide. There is no `dbstrict` equivalent |

Available template variables: `$resolved_hostname`, `$host`, `$port`, `$azure_name`, `$database`, `$server_name`, `$instance_name`, `$full_server_name` (from `@@SERVERNAME`), plus any key from tags.

**Scenario**: `sql-prod.example.com` with three SQL Server instances:

| Instance | Port | Databases |
|---|---|---|
| Default instance | 1433 | AppDB, ReportsDB |
| Named instance (SQLEXPRESS) | Dynamic (SSBS) | DevDB, TestDB |
| Secondary instance | 1434 | LegacyDB |

## Option 1: All instances (recommended)

<div class="alert alert-info">Cover every SQL Server instance on the host with one entry each. Use <code>database_autodiscovery: true</code> on each entry so new databases are picked up automatically. <code>$full_server_name</code> is the best identifier because it encodes <code>@@SERVERNAME</code>, naturally distinguishing named instances from the default instance.</div>

One entry per SQL Server instance, including named instances.

Based on the example scenario above, this counts as three DBM instances.

```yaml
instances:
  - host: sql-prod.example.com,1433
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database_autodiscovery: true
    database_identifier:
      template: "$resolved_hostname:$port"

  - host: sql-prod.example.com,1434
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database_autodiscovery: true
    database_identifier:
      template: "$resolved_hostname:$port"

  - host: "sql-prod.example.com\\SQLEXPRESS,0"  # port 0 triggers SSBS dynamic port discovery
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database_autodiscovery: true
    database_identifier:
      template: "$full_server_name"  # → "SQL-PROD\SQLEXPRESS"
```

## Option 2: Instance level (port-based)

<div class="alert alert-info">Use this option when named instances are not present and only port-based instances need coverage.</div>

Covers port-based instances only. Named instances are not included.

Based on the example scenario above, this counts as two DBM instances.

```yaml
instances:
  - host: sql-prod.example.com,1433
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database_autodiscovery: true
    database_identifier:
      template: "$resolved_hostname:$port"  # → "sql-prod.example.com:1433"

  - host: sql-prod.example.com,1434
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database_autodiscovery: true
    database_identifier:
      template: "$resolved_hostname:$port"  # → "sql-prod.example.com:1434"
```

## Option 3: Database level

<div class="alert alert-info">Use database-level scoping only if different teams own different databases and need isolated DBM views, or if billing requires per-database cost attribution. DMV data is always instance-wide regardless of the <code>database</code> field.</div>

One entry per database. Set `instance_metrics.enabled: false` to prevent server-level metrics from being duplicated across entries that share the same SQL Server instance.

**Note**: DBM query metrics and samples remain instance-wide. The `database` field narrows the connection context but does not filter DMV data the way Postgres's `dbstrict` does.

Based on the example scenario above, this counts as five DBM instances.

```yaml
instances:
  # Default instance (:1433), AppDB
  - host: sql-prod.example.com
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database: AppDB
    database_identifier:
      template: "$full_server_name-$database"  # → "SQL-PROD-AppDB"
    database_metrics:
      instance_metrics:
        enabled: false

  # Default instance (:1433), ReportsDB
  - host: sql-prod.example.com
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database: ReportsDB
    database_identifier:
      template: "$full_server_name-$database"  # → "SQL-PROD-ReportsDB"
    database_metrics:
      instance_metrics:
        enabled: false

  # :1434 instance, LegacyDB
  - host: sql-prod.example.com,1434
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database: LegacyDB
    database_identifier:
      template: "$full_server_name-$database"  # → "SQL-PROD-LegacyDB"
    database_metrics:
      instance_metrics:
        enabled: false

  # SQLEXPRESS, DevDB
  - host: "sql-prod.example.com\\SQLEXPRESS,0"
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database: DevDB
    database_identifier:
      template: "$full_server_name-$database"  # → "SQL-PROD\SQLEXPRESS-DevDB"
    database_metrics:
      instance_metrics:
        enabled: false

  # SQLEXPRESS, TestDB
  - host: "sql-prod.example.com\\SQLEXPRESS,0"
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database: TestDB
    database_identifier:
      template: "$full_server_name-$database"  # → "SQL-PROD\SQLEXPRESS-TestDB"
    database_metrics:
      instance_metrics:
        enabled: false
```

## Managed services

### Amazon RDS for SQL Server

```yaml
instances:
  - host: mydb.cfxgae8cilcf.us-east-1.rds.amazonaws.com
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database_autodiscovery: true
    aws:
      instance_endpoint: mydb.cfxgae8cilcf.us-east-1.rds.amazonaws.com
    database_identifier:
      template: "$resolved_hostname"
```

If connecting through RDS Proxy, set `reported_hostname` to the RDS instance endpoint.

### Google Cloud SQL for SQL Server

`reported_hostname` is required when using the Cloud SQL Auth Proxy. Named instances and custom ports are not supported on Cloud SQL.

```yaml
instances:
  - host: 127.0.0.1,1433
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    reported_hostname: my-instance.us-central1.my-project
    database_autodiscovery: true
    gcp:
      project_id: my-project
      instance_id: my-instance
    database_identifier:
      template: "$resolved_hostname"
```

For Azure SQL Database, Managed Instance, and Elastic Pools, see [Azure SQL Configurations](/database_monitoring/architecture/azure_sql/).

| | RDS SQL Server | Cloud SQL SQL Server | Azure SQL Managed Instance |
|---|---|---|---|
| Config block | `aws` | `gcp` | `azure` |
| Managed auth | IAM (`aws.managed_authentication`) | None | Managed identity (`managed_identity`) |
| `database_autodiscovery` | Yes | Yes | Yes |
| Named instances | No | No | Rare |
| `reported_hostname` needed | If using RDS Proxy | Yes (Auth Proxy) | No |
| Recommended identifier | `$resolved_hostname` | `$resolved_hostname` (through `reported_hostname`) | `$azure_name` |

{{< partial name="whats-next/whats-next.html" >}}
