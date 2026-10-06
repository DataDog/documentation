---
title: Postgres Configurations
description: Configure Postgres instance scoping for Database Monitoring, including instance-level and database-level options for self-hosted and managed services.
further_reading:
- link: "/database_monitoring/architecture/"
  tag: "Documentation"
  text: "DBM Setup Architectures"
- link: "/database_monitoring/setup_postgres/"
  tag: "Documentation"
  text: "Setting up Postgres"
---

## Overview

Each check instance in the Datadog Agent configuration creates one Database Monitoring (DBM) instance. The [database_identifier](/database_monitoring/guide/database_identifier/) template determines what the Agent considers a distinct DBM instance.

| Configuration lever | Description |
|---|---|
| `dbname` | Which database to connect through (defaults to `postgres`) |
| `dbstrict` | Whether to restrict metric collection to only `dbname` |
| [database_identifier.template](/database_monitoring/guide/database_identifier/) | Controls what counts as a separate DBM instance |

Available template variables: `$resolved_hostname`, `$host`, `$port`, plus any key from tags.

**Scenario**: `pg-prod.example.com` with two Postgres instances:

| Instance | Port | Databases |
|---|---|---|
| Production | 5432 | `app_db`, `analytics_db`, `audit_db` |
| Reporting | 5433 | `reports_db`, `exports_db` |

## Option 1: Instance level (recommended)

<div class="alert alert-info">Use instance-level scoping (<code>$resolved_hostname:$port</code>). All databases on the instance are auto-discovered with no additional configuration. The <code>$port</code> variable keeps the identifier correct if a second Postgres instance is added to the host.</div>

One entry per Postgres instance, with port included in the identifier.

Based on the example scenario above, this counts as two DBM instances.

```yaml
instances:
  - host: pg-prod.example.com
    port: 5432
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database_identifier:
      template: "$resolved_hostname:$port"  # → "pg-prod.example.com:5432"

  - host: pg-prod.example.com
    port: 5433
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database_identifier:
      template: "$resolved_hostname:$port"  # → "pg-prod.example.com:5433"
```

## Option 2: Database level

<div class="alert alert-info">Use database-level scoping only if different teams own different databases and need isolated DBM views, or if billing requires per-database cost attribution.</div>

One entry per database with `dbstrict: true`. Each database is a separate DBM instance with fully isolated metric collection. `dbstrict: true` is required. Without it, the Agent discovers and queries all databases even when `dbname` is set.

Based on the example scenario above, this counts as five DBM instances.

```yaml
instances:
  - host: pg-prod.example.com
    port: 5432
    username: datadog
    password: "<PASSWORD>"
    dbname: app_db
    dbstrict: true
    dbm: true
    tags:
      - "db:app_db"
    database_identifier:
      template: "$resolved_hostname:$port-$db"  # → "pg-prod.example.com:5432-app_db"

  - host: pg-prod.example.com
    port: 5432
    username: datadog
    password: "<PASSWORD>"
    dbname: analytics_db
    dbstrict: true
    dbm: true
    tags:
      - "db:analytics_db"
    database_identifier:
      template: "$resolved_hostname:$port-$db"  # → "pg-prod.example.com:5432-analytics_db"

  - host: pg-prod.example.com
    port: 5432
    username: datadog
    password: "<PASSWORD>"
    dbname: audit_db
    dbstrict: true
    dbm: true
    tags:
      - "db:audit_db"
    database_identifier:
      template: "$resolved_hostname:$port-$db"  # → "pg-prod.example.com:5432-audit_db"

  - host: pg-prod.example.com
    port: 5433
    username: datadog
    password: "<PASSWORD>"
    dbname: reports_db
    dbstrict: true
    dbm: true
    tags:
      - "db:reports_db"
    database_identifier:
      template: "$resolved_hostname:$port-$db"  # → "pg-prod.example.com:5433-reports_db"

  - host: pg-prod.example.com
    port: 5433
    username: datadog
    password: "<PASSWORD>"
    dbname: exports_db
    dbstrict: true
    dbm: true
    tags:
      - "db:exports_db"
    database_identifier:
      template: "$resolved_hostname:$port-$db"  # → "pg-prod.example.com:5433-exports_db"
```

## Managed services

### Amazon Aurora for PostgreSQL

Use instance endpoints, not the cluster endpoint or reader endpoint. The check automatically disables replication metric collection on read replicas.

```yaml
instances:
  # Writer instance
  - host: mydb-instance-1.cfxgae8cilcf.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    aws:
      instance_endpoint: mydb-instance-1.cfxgae8cilcf.us-east-1.rds.amazonaws.com
    database_identifier:
      template: "$resolved_hostname:$port"

  # Reader instance
  - host: mydb-instance-2.cfxgae8cilcf.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    aws:
      instance_endpoint: mydb-instance-2.cfxgae8cilcf.us-east-1.rds.amazonaws.com
    database_identifier:
      template: "$resolved_hostname:$port"
```

### Amazon RDS for PostgreSQL

The check auto-detects RDS endpoints by the `.rds.amazonaws.com` suffix and auto-populates `instance_endpoint`.

```yaml
instances:
  - host: mydb.cfxgae8cilcf.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    aws:
      instance_endpoint: mydb.cfxgae8cilcf.us-east-1.rds.amazonaws.com
      region: us-east-1
      managed_authentication:
        enabled: true
    database_identifier:
      template: "$resolved_hostname:$port"
```

If connecting through RDS Proxy, set `reported_hostname` to the RDS instance endpoint.

### Azure Database for PostgreSQL (Flexible Server)

Single Server is deprecated by Microsoft. Use Flexible Server only. Managed identity authentication is supported.

```yaml
instances:
  - host: myserver.postgres.database.azure.com
    port: 5432
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    azure:
      deployment_type: flexible_server
      fully_qualified_domain_name: myserver.postgres.database.azure.com
    database_identifier:
      template: "$resolved_hostname:$port"
```

With managed identity authentication:

```yaml
instances:
  - host: myserver.postgres.database.azure.com
    port: 5432
    dbm: true
    azure:
      deployment_type: flexible_server
      fully_qualified_domain_name: myserver.postgres.database.azure.com
      managed_authentication:
        enabled: true
        client_id: "<MANAGED_IDENTITY_CLIENT_ID>"
    database_identifier:
      template: "$resolved_hostname:$port"
```

### Google Cloud AlloyDB

AlloyDB has no dedicated config block. Use specific instance endpoints rather than the AlloyDB cluster endpoint, and set `reported_hostname` when connecting through the AlloyDB Auth Proxy.

```yaml
instances:
  # Primary instance
  - host: 127.0.0.1
    port: 5432
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    reported_hostname: my-cluster-primary.us-central1.my-project
    database_identifier:
      template: "$resolved_hostname:$port"

  # Read pool instance
  - host: 127.0.0.1
    port: 5433
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    reported_hostname: my-cluster-readpool.us-central1.my-project
    database_identifier:
      template: "$resolved_hostname:$port"
```

### Google Cloud SQL for PostgreSQL

`reported_hostname` is required when using the Cloud SQL Auth Proxy. Without it, every proxy-connected instance has the same identifier.

```yaml
instances:
  - host: 127.0.0.1
    port: 5432
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    reported_hostname: my-instance.us-central1.my-project
    gcp:
      project_id: my-project
      instance_id: my-instance
    database_identifier:
      template: "$resolved_hostname:$port"
```

### Heroku Postgres

`reported_hostname` is required. Heroku connection hostnames are autogenerated EC2 addresses with no stable human-readable identity.

```yaml
instances:
  - host: ec2-xx-xx-xx-xx.compute-1.amazonaws.com
    port: 5432
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    reported_hostname: myapp-heroku-postgres
    database_identifier:
      template: "$resolved_hostname:$port"
```

### Supabase

Always use port 5432 for DBM. Port 6543 (PgBouncer transaction pooler) does not support prepared statements and session-level features required by DBM.

```yaml
instances:
  - host: db.xxxxxxxxxxxxxxxxxxxx.supabase.co
    port: 5432
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    reported_hostname: my-supabase-project
    database_identifier:
      template: "$resolved_hostname:$port"
```

{{< partial name="whats-next/whats-next.html" >}}
