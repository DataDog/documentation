---
title: Set up Database Monitoring with Terraform
description: Provision the Datadog Agent for Database Monitoring with Terraform across managed and self-hosted databases.
content_filters:
  - trait_id: database
    option_group_id: dbm_database_options
    label: "Database"
  - trait_id: db_hosting
    option_group_id: dbm_db_hosting_options
    label: "Database hosting"
  - trait_id: agent_runtime
    option_group_id: dbm_agent_runtime_options
    label: "Agent runtime"
further_reading:
- link: "/database_monitoring/setup_postgres/rds/"
  tag: "Documentation"
  text: "Set up Database Monitoring for Postgres on RDS"
- link: "/database_monitoring/data_collected/"
  tag: "Documentation"
  text: "Database Monitoring data collected"
- link: "https://github.com/DataDog/dd-database-monitoring-example"
  tag: "Source code"
  text: "dd-database-monitoring-example on GitHub"
---

## Overview

This page walks through provisioning the Datadog Agent for Database Monitoring (DBM) with Terraform. Use the dropdowns at the top to pick your **database**, where it is **hosted**, and where the **Agent runs**.

The Terraform examples used on this page live in [`DataDog/dd-database-monitoring-example`][1]. Each combination has its own directory with `main.tf`, `variables.tf`, `outputs.tf`, `versions.tf`, and a `terraform.tfvars.example` you can copy and edit. Path scheme:

```
<database>/<hosting>/<agent-runtime>/
```

For example, the AWS Fargate Agent against an RDS Postgres instance lives at `postgres/rds/ecs-fargate/`.

This page covers the **Agent** side of the setup. It does not provision the database, set database-side parameters, or create the `datadog` user inside the database. For those steps, see the per-database setup pages from [Database Monitoring][2].

{% if and(equals($database, "postgres"), equals($db_hosting, "rds"), equals($agent_runtime, "aws_fargate")) %}

## Architecture

A single Datadog Agent task runs on AWS ECS Fargate inside the same VPC as your RDS Postgres instance. The Agent uses Autodiscovery to connect to the RDS endpoint and ships metrics, query samples, and execution plans to Datadog.

## Prerequisites

- **Terraform 1.5 or later**, and AWS credentials with permission to create ECS, IAM, security group, and CloudWatch log group resources in the target region.
- **An existing RDS Postgres instance** (Postgres 10 or later).
- **A private subnet in the RDS VPC** that has NAT egress to the internet — the Agent needs to reach `*.${DD_SITE}`.
- **A Datadog API key** for the destination organization.
- **An RDS parameter group** with the DBM-required parameters set:

  | Parameter | Value | Purpose |
  |---|---|---|
  | `shared_preload_libraries` | `pg_stat_statements` | Required for query metric collection |
  | `track_activity_query_size` | `4096` | Increases captured SQL text size |
  | `pg_stat_statements.track` | `ALL` | Captures statements inside functions and procedures |
  | `pg_stat_statements.max` | `10000` | Retains more normalized queries |
  | `pg_stat_statements.track_utility` | `off` | Skips PREPARE and EXPLAIN noise |

  Changing `shared_preload_libraries` requires an RDS reboot.

- **The `datadog` Postgres user** with the right grants and the `pg_stat_statements` extension installed in each monitored database. See [Set up Database Monitoring for Postgres on RDS][3] for the SQL.

## Apply the Terraform

The example for this combination lives at [`postgres/rds/ecs-fargate/`][4] in `dd-database-monitoring-example`.

```bash
git clone https://github.com/DataDog/dd-database-monitoring-example.git
cd dd-database-monitoring-example/postgres/rds/ecs-fargate

cp terraform.tfvars.example terraform.tfvars
# Fill in: vpc_id, subnet_ids, rds_security_group_id, rds_endpoint,
# database_name, datadog_user_password, datadog_api_key, datadog_site

terraform init
terraform plan
terraform apply
```

`terraform apply` creates an ECS cluster, a Fargate task definition, an ECS service, an Agent task security group, an ingress rule on the RDS security group for port 5432, an IAM execution role with the standard policy attached, and a CloudWatch log group.

### Required inputs

| Variable | Description |
|---|---|
| `vpc_id` | The VPC where the RDS instance lives |
| `subnet_ids` | One or more private subnets with NAT egress |
| `rds_security_group_id` | The security group attached to your RDS instance — the example adds an ingress rule on port 5432 |
| `rds_endpoint` | The RDS endpoint host (no port) |
| `database_name` | The Postgres database to monitor |
| `datadog_user_password` | The password for the Postgres `datadog` user |
| `datadog_api_key` | The API key for the destination organization |
| `datadog_site` | For example, `datadoghq.com` or `datadoghq.eu` |

For the full input list and defaults, see [`variables.tf`][5] in the example directory.

## Verify

1. The ECS service is healthy:

   ```bash
   aws ecs describe-services \
     --cluster $(terraform output -raw ecs_cluster_name) \
     --services $(terraform output -raw ecs_service_name) \
     --query 'services[0].{running:runningCount,desired:desiredCount}'
   ```

2. The Agent's Postgres check runs cleanly. Tail the Agent logs:

   ```bash
   aws logs tail $(terraform output -raw log_group_name) --follow
   ```

   Look for `Running check postgres` and the absence of `pg_stat_statements` errors.

3. In the Datadog UI:

   - **Infrastructure > Containers**: the `datadog-agent` container appears.
   - **Databases > List**: the RDS host appears with DBM enabled.
   - **Databases > Query Metrics**: rows render within ~2 minutes of database traffic.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Agent logs show `connection refused` to RDS | The RDS security-group ingress rule didn't apply, or the task is in a subnet with no route to RDS |
| Agent logs show `pg_stat_statements is not loaded` | The RDS parameter group is missing `shared_preload_libraries=pg_stat_statements`, or the instance was not rebooted after the change |
| Agent logs show `permission denied for relation pg_stat_activity` | The `pg_monitor` role is not granted to the `datadog` user |
| No data in the Datadog UI | The API key is wrong, `datadog_site` is mismatched, or the task can't reach `*.${DD_SITE}` (NAT egress missing) |
| `query_samples` is empty | The `datadog.explain_statement` function is not created in the monitored database |

{% /if %}

{% if not(and(equals($database, "postgres"), equals($db_hosting, "rds"), equals($agent_runtime, "aws_fargate"))) %}

## Coming soon

A Terraform example for the selected combination is not yet published in [`dd-database-monitoring-example`][1]. As examples land, this page is updated with the matching directory, required inputs, verify steps, and troubleshooting.

For the manual setup today, see the per-database setup pages from [Database Monitoring][2].

{% /if %}

[1]: https://github.com/DataDog/dd-database-monitoring-example
[2]: /database_monitoring/
[3]: /database_monitoring/setup_postgres/rds/
[4]: https://github.com/DataDog/dd-database-monitoring-example/tree/main/postgres/rds/ecs-fargate
[5]: https://github.com/DataDog/dd-database-monitoring-example/blob/main/postgres/rds/ecs-fargate/variables.tf
