---
title: MySQL Configurations
description: Configure MySQL instance scoping for Database Monitoring across self-hosted, RDS, Aurora, Cloud SQL, and Azure managed services.
further_reading:
- link: "/database_monitoring/architecture/"
  tag: "Documentation"
  text: "DBM Setup Architectures"
- link: "/database_monitoring/setup_mysql/"
  tag: "Documentation"
  text: "Setting up MySQL"
---

## Overview

Each check instance in the Datadog Agent configuration creates one Database Monitoring (DBM) instance. The [database_identifier](/database_monitoring/guide/database_identifier/) template determines what the Agent considers a distinct DBM instance.

MySQL DBM data comes from `performance_schema`, which is instance-wide. There is no `dbstrict` equivalent. DBM query metrics and samples always cover all schemas on an instance regardless of configuration.

Available template variables: `$resolved_hostname`, `$host`, `$port`, `$mysql_sock`, plus any key from tags.

**Scenario**: `mysql-prod.example.com` with two MySQL instances:

| Instance | Port | Schemas |
|---|---|---|
| Production | 3306 | app, users, orders |
| Reporting | 3307 | reports, archive |

## Instance level

<div class="alert alert-info">Use one entry per MySQL process (<code>$resolved_hostname:$port</code>). <code>performance_schema</code> is instance-wide. Database-level scoping is not supported.</div>

One entry per MySQL instance, with port included in the identifier.

Based on the example scenario above, this counts as two DBM instances.

```yaml
instances:
  - host: mysql-prod.example.com
    port: 3306
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database_identifier:
      template: "$resolved_hostname:$port"  # → "mysql-prod.example.com:3306"

  - host: mysql-prod.example.com
    port: 3307
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    database_identifier:
      template: "$resolved_hostname:$port"  # → "mysql-prod.example.com:3307"
```

## Managed services

### Amazon Aurora (MySQL-compatible)

Use one entry per Aurora instance (writer + each reader). Never use the cluster or reader endpoint. The check logs a warning when `SHOW ENGINE INNODB STATUS` returns no data on Aurora reader instances. InnoDB metrics are not available on Aurora readers.

```yaml
instances:
  # Writer instance
  - host: mydb-instance-1.cfxgae8cilcf.us-east-1.rds.amazonaws.com
    port: 3306
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    aws:
      instance_endpoint: mydb-instance-1.cfxgae8cilcf.us-east-1.rds.amazonaws.com
    database_identifier:
      template: "$resolved_hostname:$port"

  # Reader instance
  - host: mydb-instance-2.cfxgae8cilcf.us-east-1.rds.amazonaws.com
    port: 3306
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    aws:
      instance_endpoint: mydb-instance-2.cfxgae8cilcf.us-east-1.rds.amazonaws.com
    database_identifier:
      template: "$resolved_hostname:$port"
```

### Amazon RDS for MySQL

One entry per RDS instance.

```yaml
instances:
  - host: mydb.cfxgae8cilcf.us-east-1.rds.amazonaws.com
    port: 3306
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

### Azure Database for MySQL (Flexible Server)

Single Server is deprecated by Microsoft. Use Flexible Server only.

```yaml
instances:
  - host: myserver.mysql.database.azure.com
    port: 3306
    username: datadog
    password: "<PASSWORD>"
    dbm: true
    azure:
      deployment_type: flexible_server
      fully_qualified_domain_name: myserver.mysql.database.azure.com
    database_identifier:
      template: "$resolved_hostname:$port"
```

### Google Cloud SQL for MySQL

`reported_hostname` is required when using the Cloud SQL Auth Proxy.

```yaml
instances:
  - host: 127.0.0.1
    port: 3306
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

{{< partial name="whats-next/whats-next.html" >}}
