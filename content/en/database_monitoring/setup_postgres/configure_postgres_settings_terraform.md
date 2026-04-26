---
title: Configure Postgres Settings with Terraform
description: Configure server parameters required for Postgres Database Monitoring with Terraform.
further_reading:
- link: "/database_monitoring/setup_postgres/grant_agent_access_terraform/"
  tag: "Documentation"
  text: "Grant the Agent Access to Postgres with Terraform"
- link: "/database_monitoring/setup_postgres/rds/"
  tag: "Documentation"
  text: "Set up Database Monitoring for RDS"
- link: "/database_monitoring/setup_postgres/aurora/"
  tag: "Documentation"
  text: "Set up Database Monitoring for Aurora"
- link: "/database_monitoring/setup_postgres/gcsql/"
  tag: "Documentation"
  text: "Set up Database Monitoring for Cloud SQL"
- link: "/database_monitoring/setup_postgres/azure/"
  tag: "Documentation"
  text: "Set up Database Monitoring for Azure"
---

This page covers a Terraform-based alternative to setting Postgres server parameters through the cloud console. Use this approach if your team manages infrastructure with Terraform and you want to keep the parameters that Database Monitoring requires under version control.

For the matching grants and `datadog` user setup, see [Grant the Agent Access to Postgres with Terraform][1].

## Before you begin

Required parameters
: At a minimum, the Datadog Agent expects the following on every monitored server. Optional parameters tune the depth of telemetry — see each section below for the full list.

| Parameter | Value | Purpose |
|---|---|---|
| `shared_preload_libraries` | `pg_stat_statements` | Enables `pg_stat_statements`, the source of `postgresql.queries.*` metrics |
| `track_activity_query_size` | `4096` | Increases the SQL text length captured in `pg_stat_activity` |

Restart behavior
: Some parameters are **static** — they apply only after a database restart. `shared_preload_libraries` and `track_activity_query_size` are static on every cloud listed here. Plan for a brief restart window before the first apply.

What this page does not cover
: Provisioning the database itself. Granting the `datadog` user. Installing the Datadog Agent. Configuring `postgresql.conf` on a self-hosted instance — see the [self-hosted section](#self-hosted-postgres) below for the recommended approach.

## How to apply these snippets

The snippets below extend an existing Terraform configuration that already manages your Postgres instance — for example, an `aws_db_instance` for RDS or a `google_sql_database_instance` for Cloud SQL. Set up the standard cloud-provider Terraform first if you are not yet managing the database with Terraform.

You need Terraform 1.3 or later, plus the Terraform plugin for your cloud.

### Declare the provider

Add the provider for your cloud alongside your existing `terraform { ... }` block:

| Cloud | Provider source | Version |
|---|---|---|
| AWS RDS, Aurora | `hashicorp/aws` | `>= 5.0` |
| GCP Cloud SQL, AlloyDB | `hashicorp/google` | `>= 5.0` |
| Azure Flexible Server | `hashicorp/azurerm` | `>= 3.0` |

For example, on AWS:

```hcl
terraform {
  required_version = ">= 1.3.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}
```

### Apply

Add the snippet for your cloud to your existing configuration, then run:

```bash
terraform init
terraform plan
terraform apply
```

Review the plan, then type `yes` when prompted. Each cloud's restart behavior is described in its section below.

## AWS RDS

RDS exposes server parameters through DB parameter groups. Define a parameter group and attach it to the instance.

```hcl
resource "aws_db_parameter_group" "dbm_postgres" {
  name   = "dbm-postgres15"
  family = "postgres15"  # set to postgres16, postgres17, postgres18 to match your engine

  parameter {
    name         = "shared_preload_libraries"
    value        = "pg_stat_statements"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "track_activity_query_size"
    value        = "4096"
    apply_method = "pending-reboot"
  }

  parameter {
    name  = "pg_stat_statements.track"
    value = "ALL"
  }

  parameter {
    name         = "pg_stat_statements.max"
    value        = "10000"
    apply_method = "pending-reboot"
  }

  parameter {
    name  = "pg_stat_statements.track_utility"
    value = "off"
  }

  parameter {
    name  = "track_io_timing"
    value = "on"
  }
}

resource "aws_db_instance" "appdb" {
  # existing configuration
  parameter_group_name = aws_db_parameter_group.dbm_postgres.name
  apply_immediately    = true
}
```

Static vs dynamic for RDS Postgres
: Static — `shared_preload_libraries`, `track_activity_query_size`, `pg_stat_statements.max`. These trigger a reboot at the next apply when `apply_immediately = true`, or at the next maintenance window otherwise.
: Dynamic — `pg_stat_statements.track`, `pg_stat_statements.track_utility`, `track_io_timing`. These take effect after the parameter group reload, no reboot needed.

After applying, run `CREATE EXTENSION pg_stat_statements;` inside each monitored database. The grants module from [Grant the Agent Access with Terraform][1] handles this with the `datadog` schema setup.

## AWS Aurora Postgres

Aurora groups parameters at the cluster level. Use `aws_rds_cluster_parameter_group` and attach it to the cluster.

```hcl
resource "aws_rds_cluster_parameter_group" "dbm_aurora" {
  name   = "dbm-aurora-postgres15"
  family = "aurora-postgresql15"

  parameter {
    name         = "shared_preload_libraries"
    value        = "pg_stat_statements"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "track_activity_query_size"
    value        = "4096"
    apply_method = "pending-reboot"
  }

  parameter {
    name  = "pg_stat_statements.track"
    value = "ALL"
  }

  parameter {
    name         = "pg_stat_statements.max"
    value        = "10000"
    apply_method = "pending-reboot"
  }

  parameter {
    name  = "pg_stat_statements.track_utility"
    value = "off"
  }

  parameter {
    name  = "track_io_timing"
    value = "on"
  }
}

resource "aws_rds_cluster" "appdb" {
  # existing configuration
  db_cluster_parameter_group_name = aws_rds_cluster_parameter_group.dbm_aurora.name
  apply_immediately               = true
}
```

`shared_preload_libraries` is on by default in Aurora Postgres, but setting it explicitly through Terraform keeps the configuration self-documenting. The static-vs-dynamic split is the same as RDS.

For instance-level overrides, attach a separate `aws_db_parameter_group` to each `aws_rds_cluster_instance` through `db_parameter_group_name`.

## GCP Cloud SQL

Cloud SQL exposes parameters through `database_flags`. Two Cloud-SQL-specific notes:

- `pg_stat_statements` is enabled with the `cloudsql.enable_pg_stat_statements` flag, not `shared_preload_libraries`.
- Setting a static flag triggers a restart automatically — Cloud SQL handles the rolling restart for you.

```hcl
resource "google_sql_database_instance" "appdb" {
  name             = "appdb"
  database_version = "POSTGRES_15"
  region           = "us-central1"

  settings {
    tier = "db-custom-2-8192"

    database_flags {
      name  = "cloudsql.enable_pg_stat_statements"
      value = "on"
    }
    database_flags {
      name  = "track_activity_query_size"
      value = "4096"
    }
    database_flags {
      name  = "pg_stat_statements.track"
      value = "all"
    }
    database_flags {
      name  = "pg_stat_statements.max"
      value = "10000"
    }
    database_flags {
      name  = "pg_stat_statements.track_utility"
      value = "off"
    }
    database_flags {
      name  = "track_io_timing"
      value = "on"
    }
  }
}
```

After applying, run `CREATE EXTENSION pg_stat_statements;` in each monitored database. The Cloud SQL flag enables loading the extension; the `CREATE EXTENSION` SQL registers it inside the database.

## GCP AlloyDB

AlloyDB has `pg_stat_statements` pre-enabled, so no library-loading flag is needed. Set the optional parameters with the flat `database_flags` map on the instance:

```hcl
resource "google_alloydb_instance" "primary" {
  cluster       = google_alloydb_cluster.appdb.name
  instance_id   = "appdb-primary"
  instance_type = "PRIMARY"

  database_flags = {
    "track_activity_query_size"        = "4096"
    "pg_stat_statements.track"         = "all"
    "pg_stat_statements.max"           = "10000"
    "pg_stat_statements.track_utility" = "off"
    "track_io_timing"                  = "on"
  }
}
```

Run `CREATE EXTENSION pg_stat_statements;` once per monitored database.

## Azure Database for PostgreSQL Flexible Server

Azure exposes each parameter as a separate `azurerm_postgresql_flexible_server_configuration` resource. The cleanest pattern is `for_each` over a `locals` map.

```hcl
locals {
  dbm_postgres_settings = {
    "shared_preload_libraries"         = "pg_stat_statements"
    "azure.extensions"                 = "pg_stat_statements"
    "track_activity_query_size"        = "4096"
    "pg_stat_statements.track"         = "ALL"
    "pg_stat_statements.max"           = "10000"
    "pg_stat_statements.track_utility" = "off"
    "track_io_timing"                  = "on"
  }
}

resource "azurerm_postgresql_flexible_server_configuration" "dbm" {
  for_each  = local.dbm_postgres_settings
  server_id = azurerm_postgresql_flexible_server.appdb.id
  name      = each.key
  value     = each.value
}
```

`azure.extensions` allowlists the extension for the server. Combined with `shared_preload_libraries`, the extension loads at startup. Static parameters trigger an automatic restart at apply time.

After applying, run `CREATE EXTENSION pg_stat_statements;` inside each monitored database.

## Self-hosted Postgres

Terraform is not the right tool for editing `postgresql.conf` and restarting Postgres on a self-hosted instance — the operations are tightly coupled to the host's package manager, init system, and any HA setup. Use a configuration-management tool for this step:

| Tool | Approach |
|---|---|
| Ansible | A playbook that templates `postgresql.conf` and restarts the `postgresql` service |
| Chef / Puppet | A manifest that manages the config file and the service |
| Cloud-init / user-data | Bake the parameters into the host image, restart on first boot |

The required parameters are listed at the top of this page. Once they are in place, follow [Grant the Agent Access with Terraform][1] for the database-side setup.

## Verify

After applying, restart the database (or wait for the cloud provider's automatic restart on static parameters) and confirm the parameters are loaded:

```sql
SELECT name, setting, unit, source
FROM pg_settings
WHERE name IN (
  'shared_preload_libraries',
  'track_activity_query_size',
  'pg_stat_statements.track',
  'pg_stat_statements.max',
  'pg_stat_statements.track_utility',
  'track_io_timing'
);
```

Then run the Agent's diagnostic command, which checks every Database Monitoring prerequisite and reports remediation for anything missing:

```bash
sudo datadog-agent diagnose --include check-datadog
```

A clean diagnose helps confirm the server is ready for the Agent.

## Troubleshooting

`shared_preload_libraries` is set but `pg_stat_statements` views are empty
: The library loaded but the extension was not registered inside the database. Run `CREATE EXTENSION pg_stat_statements;` as a superuser, in every database the Agent monitors.

Parameter group changes did not apply
: For RDS and Aurora, set `apply_immediately = true` on the instance or cluster, or wait for the next maintenance window. Static parameters require a reboot.

Cloud SQL flag rejected at apply
: Confirm the flag name matches Cloud SQL's allowed flag list for your Postgres version. The Cloud SQL flag set is a curated subset of vanilla Postgres parameters.

Azure parameter is read-only
: A subset of Azure Postgres parameters is read-only or restricted. Check the parameter's `is_read_only` attribute in the Azure portal or `az postgres flexible-server parameter show`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/setup_postgres/grant_agent_access_terraform/
