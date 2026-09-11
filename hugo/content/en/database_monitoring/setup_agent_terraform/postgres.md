---
title: "Provision the Datadog Agent for Postgres Database Monitoring with Terraform"
description: Provision the Datadog Agent for Postgres Database Monitoring with Terraform on AWS.
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

This page walks through provisioning the Datadog Agent for Postgres Database Monitoring with Terraform on AWS. Select the tab for where the **Agent runs**.

The Terraform examples used on this page are available in [`DataDog/dd-database-monitoring-example`][1]. Each combination has its own directory with `main.tf`, `variables.tf`, `outputs.tf`, `versions.tf`, and a `terraform.tfvars.example` you can copy and edit. The path scheme is:

```
terraform/<database>/<cloud>/<agent-runtime>/
```

The directory tree is keyed on **cloud** rather than the hosting type — one Terraform module typically covers all of a cloud's database hosting options that share the same VPC and security-group semantics. For example, the ECS Fargate Agent against any AWS-side Postgres is available at `terraform/postgres/aws/ecs-fargate/` and works for RDS, Aurora, and self-hosted Postgres on EC2.

This page covers the **Agent** side of the setup. It does not provision the database, set database-side parameters, or create the `datadog` user inside the database. For those steps, see the per-database setup pages from [Database Monitoring][2].

{{< tabs >}}
{{% tab "ECS Fargate" %}}

## Hosting note

The Terraform module for this combination works for any Postgres database reachable inside an AWS VPC by security group. Point `db_endpoint` and `db_security_group_id` at:

- **Amazon RDS Postgres**: The RDS endpoint and the RDS security group.
- **Amazon Aurora Postgres**: The Aurora cluster writer endpoint and the Aurora cluster's security group.
- **Self-hosted Postgres on EC2 in the same VPC**: The EC2 instance hostname/IP and the security group attached to the Postgres EC2 instance.

For Postgres self-hosted outside AWS (on-premises or in another cloud), this AWS-side example does not apply. Follow the manual setup in the per-database setup pages from [Database Monitoring][2].

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

- **The `datadog` Postgres user** with the required grants and the `pg_stat_statements` extension installed in each monitored database. See [Set up Database Monitoring for Postgres on RDS][3] for the SQL.

## Apply the Terraform

The example for this combination is available at [`terraform/postgres/aws/ecs-fargate/`][4] in `dd-database-monitoring-example`.

```bash
git clone https://github.com/DataDog/dd-database-monitoring-example.git
cd dd-database-monitoring-example/terraform/postgres/aws/ecs-fargate

cp terraform.tfvars.example terraform.tfvars
# Fill in: vpc_id, subnet_ids, db_security_group_id, db_endpoint,
# database_name, datadog_user_password, datadog_api_key, datadog_site

terraform init
terraform plan
terraform apply
```

`terraform apply` creates:
- An ECS cluster
- A Fargate task definition
- An ECS service
- An Agent task security group
- An ingress rule on the database security group for port 5432
- An IAM execution role with the standard policy attached
- A CloudWatch log group

To attach the Agent service to an ECS cluster you already operate, set `existing_ecs_cluster_name` in `terraform.tfvars` instead of letting the example create a new cluster.

### Required inputs

| Variable | Description |
|---|---|
| `vpc_id` | The VPC containing the database. |
| `subnet_ids` | One or more private subnets with NAT egress. |
| `db_security_group_id` | The security group attached to your database — the example adds an ingress rule on port 5432. For RDS, the RDS instance SG; for Aurora, the cluster SG; for self-hosted on EC2, the EC2 instance SG. |
| `db_endpoint` | The database endpoint host (no port). For RDS, the RDS endpoint; for Aurora, the cluster writer endpoint; for self-hosted on EC2, the instance hostname or IP. |
| `database_name` | The Postgres database to monitor. |
| `datadog_user_password` | The password for the Postgres `datadog` user. |
| `datadog_api_key` | The API key for the destination organization. |
| `datadog_site` | For example, `datadoghq.com` or `datadoghq.eu`. |
| `existing_ecs_cluster_name` *(optional)* | Name of an existing ECS cluster to attach the Agent service to. Leave empty to provision a new cluster. |

For the full input list and defaults, see [`variables.tf`][5] in the example directory.

## Verify

1. To verify that the ECS service is healthy:

   ```bash
   aws ecs describe-services \
     --cluster $(terraform output -raw ecs_cluster_name) \
     --services $(terraform output -raw ecs_service_name) \
     --query 'services[0].{running:runningCount,desired:desiredCount}'
   ```

2. To verify that the Agent's Postgres check runs cleanly, tail the Agent logs:

   ```bash
   aws logs tail $(terraform output -raw log_group_name) --follow
   ```

   Look for `Running check postgres` and the absence of `pg_stat_statements` errors.

3. In the Datadog UI, verify that:

   - **Infrastructure > Containers**: The `datadog-agent` container appears.
   - **Databases > List**: The database host appears with DBM enabled.
   - **Databases > Query Metrics**: Rows render within ~2 minutes of database traffic.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Agent logs show `connection refused` to the database | The database security-group ingress rule didn't apply, or the task is in a subnet with no route to the database. |
| Agent logs show `pg_stat_statements is not loaded` | The parameter group / `postgresql.conf` is missing `shared_preload_libraries=pg_stat_statements`, or the database was not restarted after the change. |
| Agent logs show `permission denied for relation pg_stat_activity` | The `pg_monitor` role is not granted to the `datadog` user. |
| No data in the Datadog UI | The API key is wrong, `datadog_site` is mismatched, or the task can't reach `*.${DD_SITE}` (NAT egress missing). |
| `query_samples` is empty | The `datadog.explain_statement` function is not created in the monitored database. |

[2]: /database_monitoring/
[3]: /database_monitoring/setup_postgres/rds/
[4]: https://github.com/DataDog/dd-database-monitoring-example/tree/main/terraform/postgres/aws/ecs-fargate
[5]: https://github.com/DataDog/dd-database-monitoring-example/blob/main/terraform/postgres/aws/ecs-fargate/variables.tf

{{% /tab %}}

{{% tab "Amazon EKS (EC2 nodes)" %}}

## Hosting note

The Terraform module for this combination works for any Postgres database reachable inside an AWS VPC by security group. Point `db_endpoint` and `db_security_group_id` at:

- **Amazon RDS Postgres**: The RDS endpoint and the RDS security group.
- **Amazon Aurora Postgres**: The Aurora cluster writer endpoint and the Aurora cluster's security group.
- **Self-hosted Postgres on EC2 in the same VPC**: The EC2 instance hostname/IP and the security group attached to the Postgres EC2 instance.

For Postgres self-hosted outside AWS (on-premises or in another cloud), this AWS-side example does not apply. Follow the manual setup in the per-database setup pages from [Database Monitoring][2].

## Architecture

The Datadog Agent is installed on Amazon EKS with EC2 node groups through the official Helm chart. The Postgres check is configured as a **cluster check**: the Cluster Agent dispatches it to a dedicated Cluster Check Runner pod, so DBM data is emitted **once cluster-wide** rather than duplicated per node. The runner pod connects to the Postgres database from inside the cluster's VPC.

The example supports two modes:

- **Bring your own EKS cluster (BYO)** — installs the Datadog Helm chart into your existing cluster and opens an ingress rule on the database security group from the node SG. Default mode.
- **Provision a new EKS cluster (greenfield)** — provisions an EKS cluster + managed node group + IAM roles, then installs the Agent. Adds ongoing AWS cost while the cluster exists.

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

- **The `datadog` Postgres user** with the required grants and the `pg_stat_statements` extension installed in each monitored database. See [Set up Database Monitoring for Postgres on RDS][3] for the SQL.

### Additional prerequisites for BYO mode

- **AWS credentials** with permission to create security-group rules and to call `eks:DescribeCluster` / `eks:GetToken` for the target cluster, plus `kubectl`-equivalent permissions inside the cluster (typically the same IAM principal mapped through `aws-auth` or an EKS access entry).
- **An existing EKS cluster with EC2 node groups.** The node group's security group ID is required.
- **Cluster networking** that lets the worker nodes reach `*.${DD_SITE}` over 443 (NAT gateway or a VPC endpoint).

### Additional prerequisites for greenfield mode

- **AWS credentials** with permission to create EKS clusters, IAM roles + policy attachments, EKS managed node groups, and security-group rules.
- **At least two private subnets in different AZs** in the database's VPC, with NAT egress so the control plane and worker nodes can reach Datadog and ECR.
- **Awareness of ongoing cost** — provisioning a new EKS cluster adds ongoing AWS charges for the control plane and worker nodes, billed continuously while the cluster exists.

## Apply the Terraform

The example for this combination is available at [`terraform/postgres/aws/amazon-eks/`][6] in `dd-database-monitoring-example`.

```bash
git clone https://github.com/DataDog/dd-database-monitoring-example.git
cd dd-database-monitoring-example/terraform/postgres/aws/amazon-eks

cp terraform.tfvars.example terraform.tfvars
# Pick BYO or greenfield in the file header, then fill in the rest:
# db_security_group_id, db_endpoint, database_name,
# datadog_user_password, datadog_api_key, datadog_site

terraform init
terraform plan
terraform apply
```

Depending on the mode, the Terraform creates:

**BYO mode** (`eks_cluster_name` is populated):
- A Kubernetes namespace
- The Datadog Helm release (which deploys the node Agent DaemonSet, the Cluster Agent, and a Cluster Check Runner Deployment)
- An ingress rule on the database security group from the node SG

`terraform apply` takes about 3 minutes.

**Greenfield mode** (`eks_cluster_name = ""`):
- All BYO resources
- `aws_eks_cluster`
- `aws_eks_node_group`
- Two `aws_iam_role` instances
- Five `aws_iam_role_policy_attachment` instances

`terraform apply` typically takes 15-20 minutes.

### Required inputs

**BYO mode**

| Variable | Description |
|---|---|
| `eks_cluster_name` | Name of the existing EKS cluster. |
| `eks_node_security_group_id` | Security group attached to the EKS worker nodes — the example adds an ingress rule on the database SG from this SG. |
| `db_security_group_id` | The security group attached to your database — the example adds an ingress rule on port 5432. For Aurora, the cluster SG; for self-hosted on EC2, the EC2 instance SG. |
| `db_endpoint` | The database endpoint host (no port). For Aurora, the cluster writer endpoint; for self-hosted on EC2, the instance hostname or IP. |
| `database_name` | The Postgres database to monitor. |
| `datadog_user_password` | The password for the Postgres `datadog` user. |
| `datadog_api_key` | The API key for the destination organization. |
| `datadog_site` | For example, `datadoghq.com` or `datadoghq.eu`. |

**Greenfield mode** — leave `eks_cluster_name` and `eks_node_security_group_id` empty, and add:

| Variable | Description |
|---|---|
| `private_subnet_ids` | At least 2 private subnets in different AZs for the EKS control plane ENIs and the managed node group. |
| `kubernetes_version` *(optional)* | Kubernetes version for the new cluster (default `1.30`). |
| `node_instance_type` *(optional)* | EC2 instance type for the managed node group (default `t3.small`). |
| `node_desired_count`, `node_min_count`, `node_max_count` *(optional)* | Managed node group scaling configuration. |

For the full input list and defaults, see [`variables.tf`][8] in the example directory.

## Verify

1. To verify that the Helm release is healthy:

   ```bash
   helm status -n $(terraform output -raw namespace) $(terraform output -raw helm_release_name)
   kubectl -n $(terraform output -raw namespace) get pods
   ```

2. Verify that the Postgres check is dispatched as a cluster check. From the Cluster Agent leader pod:

   ```bash
   kubectl -n $(terraform output -raw namespace) exec -it \
     deploy/$(terraform output -raw cluster_agent_deployment) -- \
     agent clusterchecks
   ```

   Look for a `postgres` entry assigned to one of the Cluster Check Runner pods.

3. To verify that the Agent's Postgres check runs cleanly, tail the runner logs:

   ```bash
   kubectl -n $(terraform output -raw namespace) \
     logs -l app=$(terraform output -raw cluster_check_runner_deployment) -f
   ```

   Look for `Running check postgres` and the absence of `pg_stat_statements` errors.

4. In the Datadog UI, verify that:

   - **Infrastructure > Kubernetes**: The EKS cluster appears with node and pod metrics.
   - **Databases > List**: The database host appears with DBM enabled.
   - **Databases > Query Metrics**: Rows render within ~2 minutes of database traffic.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Cluster Check Runner logs show `connection refused` to the database | The database security-group ingress rule didn't apply, or runner pods are on nodes whose SG isn't `eks_node_security_group_id`. |
| Runner logs show `pg_stat_statements is not loaded` | The parameter group / `postgresql.conf` is missing `shared_preload_libraries=pg_stat_statements`, or the database was not restarted. |
| Runner logs show `permission denied for relation pg_stat_activity` | The `pg_monitor` role is not granted to the `datadog` user. |
| `agent clusterchecks` on the Cluster Agent shows the postgres check as unscheduled | `clusterChecksRunner.enabled` was disabled, or the runner deployment has zero ready pods. |
| No data in the Datadog UI | The API key is wrong, `datadog_site` is mismatched, or pods can't reach `*.${DD_SITE}` (NAT egress / VPC endpoint missing). |
| `query_samples` is empty | The `datadog.explain_statement` function is not created in the monitored database. |
| `terraform plan` fails reading the EKS cluster | The IAM principal running Terraform lacks `eks:DescribeCluster` / `eks:GetToken`, or is not mapped in `aws-auth` / EKS access entries for the cluster. |

[2]: /database_monitoring/
[3]: /database_monitoring/setup_postgres/rds/
[6]: https://github.com/DataDog/dd-database-monitoring-example/tree/main/terraform/postgres/aws/amazon-eks
[8]: https://github.com/DataDog/dd-database-monitoring-example/blob/main/terraform/postgres/aws/amazon-eks/variables.tf

{{% /tab %}}

{{% tab "Amazon EC2" %}}

## Hosting note

The Terraform module for this combination works for any Postgres database reachable inside an AWS VPC by security group. Point `db_endpoint` and `db_security_group_id` at:

- **Amazon RDS Postgres**: The RDS endpoint and the RDS security group.
- **Amazon Aurora Postgres**: The Aurora cluster writer endpoint and the Aurora cluster's security group.
- **Self-hosted Postgres on EC2 in the same VPC**: The EC2 instance hostname/IP and the security group attached to the Postgres EC2 instance.

For Postgres self-hosted outside AWS (on-premises or in another cloud), this AWS-side example does not apply. Follow the manual setup in the per-database setup pages from [Database Monitoring][2].

## Architecture

A single Datadog Agent runs in a Docker container on a dedicated Amazon EC2 instance (Amazon Linux 2023) inside the same VPC as your Postgres database. `cloud-init` installs Docker, adds the Postgres check config to `/etc/datadog-agent/conf.d/postgres.d/conf.yaml`, and starts the Agent container with that directory bind-mounted.

You can run the host in either a **public subnet** (with SSH ingress from a CIDR you control) or a **private subnet** (with SSM Session Manager — no SSH key required, since the example attaches the `AmazonSSMManagedInstanceCore` policy to the instance profile).

## Prerequisites

- **Terraform 1.5 or later**, and AWS credentials with permission to create EC2, IAM, and security group resources in the target region.
- **An existing Postgres instance** (Postgres 10 or later) — RDS, Aurora, or self-hosted on EC2.
- **A subnet in the database's VPC** with internet egress (an Internet Gateway for a public subnet, or NAT for a private subnet) — the Agent needs to pull its container image and reach `*.${DD_SITE}`.
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

- **The `datadog` Postgres user** with the required grants and the `pg_stat_statements` extension installed in each monitored database. See [Set up Database Monitoring for Postgres on RDS][3] for the SQL.
- *(Optional)* An existing **EC2 key pair** if you want to SSH into the Agent host. Otherwise, leave `key_pair_name = ""` and use SSM Session Manager.

## Apply the Terraform

The example for this combination is available at [`terraform/postgres/aws/ec2/`][9] in `dd-database-monitoring-example`.

```bash
git clone https://github.com/DataDog/dd-database-monitoring-example.git
cd dd-database-monitoring-example/terraform/postgres/aws/ec2

cp terraform.tfvars.example terraform.tfvars
# Fill in: vpc_id, subnet_id, db_security_group_id, db_endpoint,
# database_name, datadog_user_password, datadog_api_key, datadog_site

terraform init
terraform plan
terraform apply
```

`terraform apply` creates:
- An EC2 instance running the Datadog Agent in Docker
- An Agent host security group
- An ingress rule on the database security group for port 5432 from the Agent host SG
- An IAM role with `AmazonSSMManagedInstanceCore` attached
- An EC2 instance profile

### Required inputs

| Variable | Description |
|---|---|
| `vpc_id` | The VPC containing the database. |
| `subnet_id` | A subnet in that VPC with internet egress (IGW for public, NAT for private). |
| `db_security_group_id` | The security group attached to your database — the example adds an ingress rule on port 5432. For RDS, the RDS instance SG; for Aurora, the cluster SG; for self-hosted on EC2, the EC2 instance SG. |
| `db_endpoint` | The database endpoint host (no port). For RDS, the RDS endpoint; for Aurora, the cluster writer endpoint; for self-hosted on EC2, the instance hostname or IP. |
| `database_name` | The Postgres database to monitor. |
| `datadog_user_password` | The password for the Postgres `datadog` user. |
| `datadog_api_key` | The API key for the destination organization. |
| `datadog_site` | For example, `datadoghq.com` or `datadoghq.eu`. |
| `assign_public_ip` *(optional)* | `true` for a public-subnet demo with SSH; `false` for a private subnet (use SSM). Default `true`. |
| `key_pair_name`, `ssh_ingress_cidrs` *(optional)* | Provide both to enable SSH access. Leave both empty to disable SSH and rely on SSM Session Manager. |

For the full input list and defaults, see [`variables.tf`][10] in the example directory.

## Verify

1. To verify that the instance is running:

   ```bash
   aws ec2 describe-instances --instance-ids $(terraform output -raw ec2_instance_id) \
     --query 'Reservations[0].Instances[0].{state:State.Name,ip:PublicIpAddress}'
   ```

2. Open a shell on the Agent host. Use whichever path matches your configuration:

   ```bash
   # SSH (assign_public_ip = true and key_pair_name set)
   $(terraform output -raw ec2_ssh_command)

   # SSM (any subnet, no SSH key needed)
   aws ssm start-session --target $(terraform output -raw ec2_instance_id)
   ```

3. To verify that the Agent container is healthy:

   ```bash
   docker ps
   docker logs datadog-agent | grep -E '(postgres|dbm)' | tail -50
   ```

   Look for `Running check postgres` and the absence of `pg_stat_statements` errors.

4. In the Datadog UI, verify that:

   - **Infrastructure > Hosts**: The EC2 host appears.
   - **Databases > List**: The database host appears with DBM enabled.
   - **Databases > Query Metrics**: Rows render within ~2 minutes of database traffic.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Agent logs show `connection refused` to the database | The database security-group ingress rule didn't apply, or the EC2 instance is in a subnet with no route to the database. |
| Agent logs show `pg_stat_statements is not loaded` | The parameter group / `postgresql.conf` is missing `shared_preload_libraries=pg_stat_statements`, or the database was not restarted after the change. |
| Agent logs show `permission denied for relation pg_stat_activity` | The `pg_monitor` role is not granted to the `datadog` user. |
| No data in the Datadog UI | The API key is wrong, `datadog_site` is mismatched, or the instance can't reach `*.${DD_SITE}` (no IGW or NAT egress). |
| `query_samples` is empty | The `datadog.explain_statement` function is not created in the monitored database. |
| `docker: command not found` on first SSH | `cloud-init` is still running. Wait ~60 seconds and re-check with `cloud-init status --wait`. |

[2]: /database_monitoring/
[3]: /database_monitoring/setup_postgres/rds/
[9]: https://github.com/DataDog/dd-database-monitoring-example/tree/main/terraform/postgres/aws/ec2
[10]: https://github.com/DataDog/dd-database-monitoring-example/blob/main/terraform/postgres/aws/ec2/variables.tf

{{% /tab %}}
{{< /tabs >}}

[1]: https://github.com/DataDog/dd-database-monitoring-example
[2]: /database_monitoring/
