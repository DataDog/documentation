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
terraform/<database>/<hosting>/<agent-runtime>/
```

For example, the ECS Fargate Agent against an RDS Postgres instance lives at `terraform/postgres/rds/ecs-fargate/`.

This page covers the **Agent** side of the setup. It does not provision the database, set database-side parameters, or create the `datadog` user inside the database. For those steps, see the per-database setup pages from [Database Monitoring][2].

{% if and(equals($database, "postgres"), or(equals($db_hosting, "rds"), equals($db_hosting, "aurora"), equals($db_hosting, "self_hosted")), equals($agent_runtime, "ecs_fargate")) %}

## Hosting note

The Terraform module for this combination was developed against RDS Postgres and uses RDS-flavored variable names (`rds_endpoint`, `rds_security_group_id`, `rds_port`). The same module also works for:

- **Amazon Aurora Postgres** — set `rds_endpoint` to the Aurora cluster writer endpoint and `rds_security_group_id` to the Aurora cluster's security group.
- **Self-hosted Postgres on EC2 in the same VPC** — set `rds_endpoint` to the EC2 instance hostname/IP and `rds_security_group_id` to the security group attached to the Postgres EC2 instance.

For self-hosted Postgres outside AWS (on-premises, in another cloud), this AWS-side example does not apply. Follow the manual setup in the per-database setup pages from [Database Monitoring][2].

## Architecture

A single Datadog Agent task runs on AWS ECS Fargate inside the same VPC as your Postgres database. The Agent uses Autodiscovery to connect to the database endpoint and ships metrics, query samples, and execution plans to Datadog.

## Prerequisites

- **Terraform 1.5 or later**, and AWS credentials with permission to create ECS, IAM, security group, and CloudWatch log group resources in the target region.
- **An existing Postgres instance** (Postgres 10 or later) — RDS, Aurora, or self-hosted on EC2.
- **A private subnet in the database's VPC** that has NAT egress to the internet — the Agent needs to reach `*.${DD_SITE}`.
- **A Datadog API key** for the destination organization.
- **A parameter group (RDS/Aurora) or `postgresql.conf` (self-hosted)** with the DBM-required parameters set:

  | Parameter | Value | Purpose |
  |---|---|---|
  | `shared_preload_libraries` | `pg_stat_statements` | Required for query metric collection |
  | `track_activity_query_size` | `4096` | Increases captured SQL text size |
  | `pg_stat_statements.track` | `ALL` | Captures statements inside functions and procedures |
  | `pg_stat_statements.max` | `10000` | Retains more normalized queries |
  | `pg_stat_statements.track_utility` | `off` | Skips PREPARE and EXPLAIN noise |

  Changing `shared_preload_libraries` requires a database restart (for RDS/Aurora, an instance reboot).

- **The `datadog` Postgres user** with the right grants and the `pg_stat_statements` extension installed in each monitored database. See [Set up Database Monitoring for Postgres on RDS][3] for the SQL.

## Apply the Terraform

The example for this combination lives at [`terraform/postgres/rds/ecs-fargate/`][4] in `dd-database-monitoring-example`.

```bash
git clone https://github.com/DataDog/dd-database-monitoring-example.git
cd dd-database-monitoring-example/terraform/postgres/rds/ecs-fargate

cp terraform.tfvars.example terraform.tfvars
# Fill in: vpc_id, subnet_ids, rds_security_group_id, rds_endpoint,
# database_name, datadog_user_password, datadog_api_key, datadog_site

terraform init
terraform plan
terraform apply
```

`terraform apply` creates an ECS cluster, a Fargate task definition, an ECS service, an Agent task security group, an ingress rule on the database security group for port 5432, an IAM execution role with the standard policy attached, and a CloudWatch log group.

To attach the Agent service to an ECS cluster you already operate, set `existing_ecs_cluster_name` in `terraform.tfvars` instead of letting the example create a new cluster.

### Required inputs

| Variable | Description |
|---|---|
| `vpc_id` | The VPC where the database lives |
| `subnet_ids` | One or more private subnets with NAT egress |
| `rds_security_group_id` | The security group attached to your database — the example adds an ingress rule on port 5432. For Aurora, this is the cluster SG; for self-hosted on EC2, the EC2 instance SG. |
| `rds_endpoint` | The database endpoint host (no port). For Aurora, the cluster writer endpoint; for self-hosted on EC2, the instance hostname or IP. |
| `database_name` | The Postgres database to monitor |
| `datadog_user_password` | The password for the Postgres `datadog` user |
| `datadog_api_key` | The API key for the destination organization |
| `datadog_site` | For example, `datadoghq.com` or `datadoghq.eu` |
| `existing_ecs_cluster_name` *(optional)* | Name of an existing ECS cluster to attach the Agent service to. Leave empty to provision a new cluster. |

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
   - **Databases > List**: the database host appears with DBM enabled.
   - **Databases > Query Metrics**: rows render within ~2 minutes of database traffic.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Agent logs show `connection refused` to the database | The database security-group ingress rule didn't apply, or the task is in a subnet with no route to the database |
| Agent logs show `pg_stat_statements is not loaded` | The parameter group / `postgresql.conf` is missing `shared_preload_libraries=pg_stat_statements`, or the database was not restarted after the change |
| Agent logs show `permission denied for relation pg_stat_activity` | The `pg_monitor` role is not granted to the `datadog` user |
| No data in the Datadog UI | The API key is wrong, `datadog_site` is mismatched, or the task can't reach `*.${DD_SITE}` (NAT egress missing) |
| `query_samples` is empty | The `datadog.explain_statement` function is not created in the monitored database |

{% /if %}

{% if and(equals($database, "postgres"), or(equals($db_hosting, "rds"), equals($db_hosting, "aurora"), equals($db_hosting, "self_hosted")), equals($agent_runtime, "amazon_eks")) %}

## Hosting note

The Terraform module for this combination was developed against RDS Postgres and uses RDS-flavored variable names (`rds_endpoint`, `rds_security_group_id`, `rds_port`). The same module also works for:

- **Amazon Aurora Postgres** — set `rds_endpoint` to the Aurora cluster writer endpoint and `rds_security_group_id` to the Aurora cluster's security group.
- **Self-hosted Postgres on EC2 in the same VPC** — set `rds_endpoint` to the EC2 instance hostname/IP and `rds_security_group_id` to the security group attached to the Postgres EC2 instance.

For self-hosted Postgres outside AWS (on-premises, in another cloud), this AWS-side example does not apply. Follow the manual setup in the per-database setup pages from [Database Monitoring][2].

## Architecture

The Datadog Agent is installed on Amazon EKS with EC2 node groups via the official Helm chart. The Postgres check is configured as a **cluster check**: the Cluster Agent dispatches it to a dedicated Cluster Check Runner pod, so DBM data is emitted **once cluster-wide** rather than duplicated per node. The runner pod connects to the Postgres database from inside the cluster's VPC.

The example supports two modes:

- **Bring your own EKS cluster (BYO)** — installs the Datadog Helm chart into your existing cluster and opens an ingress rule on the database security group from the node SG. Default mode.
- **Provision a new EKS cluster (greenfield)** — provisions an EKS cluster + managed node group + IAM roles, then installs the Agent. Adds ongoing AWS cost — see the [example README][7] for details.

## Prerequisites

### For both modes

- **Terraform 1.5 or later** with the `aws`, `helm`, and `kubernetes` providers.
- **An existing Postgres instance** (Postgres 10 or later) — RDS, Aurora, or self-hosted on EC2 — in a VPC reachable from the EKS nodes.
- **A Datadog API key** for the destination organization (and an app key if you want Cluster Agent features beyond DBM).
- **A parameter group (RDS/Aurora) or `postgresql.conf` (self-hosted)** with the DBM-required parameters set:

  | Parameter | Value | Purpose |
  |---|---|---|
  | `shared_preload_libraries` | `pg_stat_statements` | Required for query metric collection |
  | `track_activity_query_size` | `4096` | Increases captured SQL text size |
  | `pg_stat_statements.track` | `ALL` | Captures statements inside functions and procedures |
  | `pg_stat_statements.max` | `10000` | Retains more normalized queries |
  | `pg_stat_statements.track_utility` | `off` | Skips PREPARE and EXPLAIN noise |

  Changing `shared_preload_libraries` requires a database restart (for RDS/Aurora, an instance reboot).

- **The `datadog` Postgres user** with the right grants and the `pg_stat_statements` extension installed in each monitored database. See [Set up Database Monitoring for Postgres on RDS][3] for the SQL.

### Additionally for BYO mode

- **AWS credentials** with permission to create security-group rules and to call `eks:DescribeCluster` / `eks:GetToken` for the target cluster, plus `kubectl`-equivalent permissions inside the cluster (typically the same IAM principal mapped via `aws-auth` or an EKS access entry).
- **An existing EKS cluster with EC2 node groups.** The node group's security group ID is required.
- **Cluster networking** that lets the worker nodes reach `*.${DD_SITE}` over 443 (NAT gateway or a VPC endpoint).

### Additionally for greenfield mode

- **AWS credentials** with permission to create EKS clusters, IAM roles + policy attachments, EKS managed node groups, and security-group rules.
- **At least 2 private subnets in different AZs** in the database's VPC, with NAT egress so the control plane and worker nodes can reach Datadog and ECR.
- **Awareness of ongoing cost** — provisioning a new EKS cluster adds approximately $0.10/hr for the control plane plus the EC2 node hourly rate, billed continuously while the cluster exists. See the [example README][7] for the full breakdown.

## Apply the Terraform

The example for this combination lives at [`terraform/postgres/rds/amazon-eks/`][6] in `dd-database-monitoring-example`.

```bash
git clone https://github.com/DataDog/dd-database-monitoring-example.git
cd dd-database-monitoring-example/terraform/postgres/rds/amazon-eks

cp terraform.tfvars.example terraform.tfvars
# Pick BYO or greenfield in the file header, then fill in the rest:
# rds_security_group_id, rds_endpoint, database_name,
# datadog_user_password, datadog_api_key, datadog_site

terraform init
terraform plan
terraform apply
```

What gets created depends on the mode:

- **BYO mode** (`eks_cluster_name` set) — a Kubernetes namespace, the Datadog Helm release (which deploys the node Agent DaemonSet, the Cluster Agent, and a Cluster Check Runner Deployment), and an ingress rule on the database security group from the node SG. Apply takes about 3 minutes.
- **Greenfield mode** (`eks_cluster_name = ""`) — the BYO resources plus an `aws_eks_cluster`, `aws_eks_node_group`, two `aws_iam_role`s, and five `aws_iam_role_policy_attachment`s. Apply takes 15-20 minutes (most of it waiting for the EKS control plane to come up).

### Required inputs

**BYO mode**

| Variable | Description |
|---|---|
| `eks_cluster_name` | Name of the existing EKS cluster |
| `eks_node_security_group_id` | Security group attached to the EKS worker nodes — the example adds an ingress rule on the database SG from this SG |
| `rds_security_group_id` | The security group attached to your database — the example adds an ingress rule on port 5432. For Aurora, the cluster SG; for self-hosted on EC2, the EC2 instance SG. |
| `rds_endpoint` | The database endpoint host (no port). For Aurora, the cluster writer endpoint; for self-hosted on EC2, the instance hostname or IP. |
| `database_name` | The Postgres database to monitor |
| `datadog_user_password` | The password for the Postgres `datadog` user |
| `datadog_api_key` | The API key for the destination organization |
| `datadog_site` | For example, `datadoghq.com` or `datadoghq.eu` |

**Greenfield mode** — leave `eks_cluster_name` and `eks_node_security_group_id` empty, and add:

| Variable | Description |
|---|---|
| `private_subnet_ids` | At least 2 private subnets in different AZs for the EKS control plane ENIs and the managed node group |
| `kubernetes_version` *(optional)* | Kubernetes version for the new cluster (default `1.30`) |
| `node_instance_type` *(optional)* | EC2 instance type for the managed node group (default `t3.small`) |
| `node_desired_count`, `node_min_count`, `node_max_count` *(optional)* | Managed node group scaling configuration |

For the full input list and defaults, see [`variables.tf`][8] in the example directory.

## Verify

1. The Helm release is healthy:

   ```bash
   helm status -n $(terraform output -raw namespace) $(terraform output -raw helm_release_name)
   kubectl -n $(terraform output -raw namespace) get pods
   ```

2. The Postgres check is dispatched as a cluster check. From the Cluster Agent leader pod:

   ```bash
   kubectl -n $(terraform output -raw namespace) exec -it \
     deploy/$(terraform output -raw cluster_agent_deployment) -- \
     agent clusterchecks
   ```

   Look for a `postgres` entry assigned to one of the Cluster Check Runner pods.

3. The Agent's Postgres check runs cleanly. Tail the runner logs:

   ```bash
   kubectl -n $(terraform output -raw namespace) \
     logs -l app=$(terraform output -raw cluster_check_runner_deployment) -f
   ```

   Look for `Running check postgres` and the absence of `pg_stat_statements` errors.

4. In the Datadog UI:

   - **Infrastructure > Kubernetes**: the EKS cluster appears with node and pod metrics.
   - **Databases > List**: the database host appears with DBM enabled.
   - **Databases > Query Metrics**: rows render within ~2 minutes of database traffic.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Cluster Check Runner logs show `connection refused` to the database | The database security-group ingress rule didn't apply, or runner pods are on nodes whose SG isn't `eks_node_security_group_id` |
| Runner logs show `pg_stat_statements is not loaded` | The parameter group / `postgresql.conf` is missing `shared_preload_libraries=pg_stat_statements`, or the database was not restarted |
| Runner logs show `permission denied for relation pg_stat_activity` | The `pg_monitor` role is not granted to the `datadog` user |
| `agent clusterchecks` on the Cluster Agent shows the postgres check as unscheduled | `clusterChecksRunner.enabled` was disabled, or the runner deployment has zero ready pods |
| No data in the Datadog UI | The API key is wrong, `datadog_site` is mismatched, or pods can't reach `*.${DD_SITE}` (NAT egress / VPC endpoint missing) |
| `query_samples` is empty | The `datadog.explain_statement` function is not created in the monitored database |
| `terraform plan` fails reading the EKS cluster | The IAM principal running Terraform lacks `eks:DescribeCluster` / `eks:GetToken`, or is not mapped in `aws-auth` / EKS access entries for the cluster |

{% /if %}

{% if not(and(equals($database, "postgres"), or(equals($db_hosting, "rds"), equals($db_hosting, "aurora"), equals($db_hosting, "self_hosted")), or(equals($agent_runtime, "ecs_fargate"), equals($agent_runtime, "amazon_eks")))) %}

## Coming soon

A Terraform example for the selected combination is not yet published in [`dd-database-monitoring-example`][1]. As examples land, this page is updated with the matching directory, required inputs, verify steps, and troubleshooting.

For the manual setup today, see the per-database setup pages from [Database Monitoring][2].

{% /if %}

[1]: https://github.com/DataDog/dd-database-monitoring-example
[2]: /database_monitoring/
[3]: /database_monitoring/setup_postgres/rds/
[4]: https://github.com/DataDog/dd-database-monitoring-example/tree/main/terraform/postgres/rds/ecs-fargate
[5]: https://github.com/DataDog/dd-database-monitoring-example/blob/main/terraform/postgres/rds/ecs-fargate/variables.tf
[6]: https://github.com/DataDog/dd-database-monitoring-example/tree/main/terraform/postgres/rds/amazon-eks
[7]: https://github.com/DataDog/dd-database-monitoring-example/blob/main/terraform/postgres/rds/amazon-eks/README.md
[8]: https://github.com/DataDog/dd-database-monitoring-example/blob/main/terraform/postgres/rds/amazon-eks/variables.tf
