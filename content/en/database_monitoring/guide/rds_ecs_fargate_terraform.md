---
title: Setting Up Datadog Database Monitoring on Amazon ECS Fargate Using Terraform
---

This guide walks you through deploying a Datadog Agent as an Amazon ECS Fargate task that monitors RDS or Aurora databases, using Terraform. The Agent runs as a long-lived Fargate service and uses [Autodiscovery container labels][1] declared directly on its task definition to configure the Database Monitoring check — no host filesystem and no Docker socket are required.

This is the recommended approach when you do not run EC2 instances. If you have an EC2 fleet, see [Setting Up Datadog Database Monitoring with RDS Autodiscovery Using Terraform][2] instead.

## Before you begin

Supported databases
: Postgres (including Aurora), MySQL (including Aurora)

Supported Agent versions
: 7.50+

What this provisions
: - A VPC with one public and one private subnet, an Internet Gateway, and a NAT Gateway with an Elastic IP (so the Agent has a stable egress IP for the RDS security group and for `datadoghq.com`)
  - An ECS cluster, a Fargate task definition for the Agent, and an ECS service that keeps one Agent task running
  - An IAM execution role granting the Fargate task permission to pull the Datadog Agent image, write logs to CloudWatch, and read the database password from AWS Secrets Manager
  - An AWS Secrets Manager secret holding the password for the `datadog` monitoring user
  - A security group allowing outbound traffic from the Fargate task

Prerequisites
: - Familiarity with Terraform, ECS Fargate, and VPC networking
  - One or more existing RDS or Aurora instances reachable from the VPC you deploy into (peered, shared, or co-located)
  - Terraform >= 1.3.0
  - The endpoint, port, and engine of the database you want to monitor. For Aurora, point at the writer or cluster endpoint — not a reader endpoint

## Overview

1. [Create the Datadog monitoring user on each RDS instance](#create-the-datadog-monitoring-user-on-each-rds-instance)
2. [Set your secrets as environment variables](#set-your-secrets-as-environment-variables)
3. [Deploy the Agent with Terraform](#deploy-the-agent-with-terraform)

## Create the Datadog monitoring user on each RDS instance

Follow the Datadog documentation to create the `datadog` monitoring user on each RDS instance:

- [Postgres][3]
- [MySQL][4]

Use the same password you will set for `TF_VAR_datadog_db_password` in the next step.

## Set your secrets as environment variables

Export your secrets to the shell before running Terraform. This avoids storing sensitive values in files on disk.

```shell
export TF_VAR_datadog_api_key="<YOUR_DATADOG_API_KEY>"
export TF_VAR_datadog_db_password="<YOUR_DATADOG_DB_PASSWORD>"
```

Your Datadog API key can be found at **Organization Settings → API Keys** in the Datadog UI.

## Deploy the Agent with Terraform

Create a file named `main.tf` with the following content. Replace the following values before applying:

- `region` — your AWS region
- `engine` — set to `"postgres"` or `"mysql"` for the database you are monitoring
- `db_endpoint` — the RDS endpoint or Aurora writer/cluster endpoint
- `db_port` — the database port (`5432` for Postgres, `3306` for MySQL)
- `db_instance_identifier` — the RDS instance identifier, used as a Datadog tag
- `db_region` — the AWS region the database is in (often the same as `region`)

```hcl
terraform {
  required_version = ">= 1.3.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1" # replace with your AWS region
}

# -------------------------------------------------------
# Variables — sensitive values come from environment vars
# export TF_VAR_datadog_api_key="<your-api-key>"
# export TF_VAR_datadog_db_password="<your-db-password>"
# -------------------------------------------------------

variable "datadog_api_key" {
  description = "Datadog API key"
  type        = string
  sensitive   = true
}

variable "datadog_db_password" {
  description = "Password for the 'datadog' monitoring user on your RDS instance"
  type        = string
  sensitive   = true
}

variable "datadog_site" {
  description = "Datadog site (datadoghq.com, datadoghq.eu, etc.)"
  type        = string
  default     = "datadoghq.com"
}

variable "engine" {
  description = "Database engine to monitor — postgres or mysql"
  type        = string
  default     = "postgres"

  validation {
    condition     = contains(["postgres", "mysql"], var.engine)
    error_message = "engine must be either \"postgres\" or \"mysql\"."
  }
}

variable "db_endpoint" {
  description = "RDS endpoint, or Aurora writer/cluster endpoint"
  type        = string
}

variable "db_port" {
  description = "Database port (5432 for Postgres, 3306 for MySQL)"
  type        = number
}

variable "db_instance_identifier" {
  description = "RDS instance identifier — applied as a Datadog tag"
  type        = string
}

variable "db_region" {
  description = "AWS region the database is in"
  type        = string
}

# -------------------------------------------------------
# VPC, subnets, NAT gateway
# The Agent runs in the private subnet and reaches both
# the RDS instance and datadoghq.com via the NAT Gateway.
# The NAT Gateway's Elastic IP is the address you allow
# in your RDS security group.
# -------------------------------------------------------

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags                 = { Name = "dd-dbm-vpc" }
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${data.aws_region.current.name}a"
  tags              = { Name = "dd-dbm-public-subnet" }
}

resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "${data.aws_region.current.name}a"
  tags              = { Name = "dd-dbm-private-subnet" }
}

data "aws_region" "current" {}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "dd-dbm-igw" }
}

resource "aws_eip" "nat" {
  domain = "vpc"
  tags   = { Name = "dd-dbm-nat-eip" }
}

resource "aws_nat_gateway" "main" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public.id
  tags          = { Name = "dd-dbm-nat-gw" }
  depends_on    = [aws_internet_gateway.main]
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main.id
  }
}

resource "aws_route_table_association" "private" {
  subnet_id      = aws_subnet.private.id
  route_table_id = aws_route_table.private.id
}

resource "aws_security_group" "agent" {
  name   = "dd-dbm-agent-sg"
  vpc_id = aws_vpc.main.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# -------------------------------------------------------
# Secrets Manager — holds the datadog monitoring user
# password. The Fargate task reads this at startup and
# injects it as DD_DB_PASSWORD inside the container.
# -------------------------------------------------------

resource "aws_secretsmanager_secret" "datadog_db_password" {
  name                    = "dd-dbm-datadog-user-password"
  recovery_window_in_days = 0
}

resource "aws_secretsmanager_secret_version" "datadog_db_password" {
  secret_id     = aws_secretsmanager_secret.datadog_db_password.id
  secret_string = var.datadog_db_password
}

# -------------------------------------------------------
# CloudWatch Logs — Agent task logs go here
# -------------------------------------------------------

resource "aws_cloudwatch_log_group" "agent" {
  name              = "/ecs/dd-dbm-agent"
  retention_in_days = 14
}

# -------------------------------------------------------
# IAM — execution role lets ECS pull the image, write
# logs, and fetch the DB password from Secrets Manager.
# -------------------------------------------------------

resource "aws_iam_role" "ecs_execution" {
  name = "dd-dbm-ecs-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_execution" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy" "ecs_secrets" {
  name = "dd-dbm-ecs-secrets-policy"
  role = aws_iam_role.ecs_execution.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "secretsmanager:GetSecretValue"
      Resource = aws_secretsmanager_secret.datadog_db_password.arn
    }]
  })
}

# -------------------------------------------------------
# ECS Cluster
# -------------------------------------------------------

resource "aws_ecs_cluster" "main" {
  name = "dd-dbm-cluster"
}

# -------------------------------------------------------
# Autodiscovery instance config — switches on var.engine.
# These maps become the JSON-encoded value of
# com.datadoghq.ad.instances on the Agent container.
# %%env_DD_DB_PASSWORD%% is replaced at runtime by the
# Agent with the value of the DD_DB_PASSWORD env var,
# which itself comes from Secrets Manager.
# -------------------------------------------------------

locals {
  ad_check_name = var.engine == "postgres" ? "postgres" : "mysql"

  ad_instance = var.engine == "postgres" ? {
    dbm      = true
    host     = var.db_endpoint
    port     = var.db_port
    username = "datadog"
    password = "%%env_DD_DB_PASSWORD%%"
    aws = {
      instance_endpoint = var.db_endpoint
      region            = var.db_region
    }
    tags = ["dbinstanceidentifier:${var.db_instance_identifier}"]
  } : {
    dbm      = true
    host     = var.db_endpoint
    port     = var.db_port
    username = "datadog"
    password = "%%env_DD_DB_PASSWORD%%"
    aws = {
      instance_endpoint = var.db_endpoint
      region            = var.db_region
    }
    tags = ["dbinstanceidentifier:${var.db_instance_identifier}"]
  }
}

# -------------------------------------------------------
# ECS Task Definition — single Datadog Agent container.
# The Database Monitoring check is configured via
# Autodiscovery docker labels on the Agent container
# itself; no Docker socket access is required.
# -------------------------------------------------------

resource "aws_ecs_task_definition" "agent" {
  family                   = "dd-dbm-agent"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 512
  memory                   = 1024
  execution_role_arn       = aws_iam_role.ecs_execution.arn

  container_definitions = jsonencode([
    {
      name      = "datadog-agent"
      image     = "public.ecr.aws/datadog/agent:7"
      essential = true

      environment = [
        { name = "DD_API_KEY",     value = var.datadog_api_key },
        { name = "DD_SITE",        value = var.datadog_site },
        { name = "DD_HOSTNAME",    value = "dd-dbm-agent" },
        { name = "ECS_FARGATE",    value = "true" },
        { name = "DD_APM_ENABLED", value = "false" },
      ]

      secrets = [
        {
          name      = "DD_DB_PASSWORD"
          valueFrom = aws_secretsmanager_secret.datadog_db_password.arn
        },
      ]

      dockerLabels = {
        "com.datadoghq.ad.check_names"  = jsonencode([local.ad_check_name])
        "com.datadoghq.ad.init_configs" = jsonencode([{}])
        "com.datadoghq.ad.instances"    = jsonencode([local.ad_instance])
      }

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.agent.name
          "awslogs-region"        = data.aws_region.current.name
          "awslogs-stream-prefix" = "datadog-agent"
        }
      }
    }
  ])
}

# -------------------------------------------------------
# ECS Service — keeps exactly one Agent task running.
# -------------------------------------------------------

resource "aws_ecs_service" "agent" {
  name            = "dd-dbm-agent"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.agent.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.private.id]
    security_groups  = [aws_security_group.agent.id]
    assign_public_ip = false
  }
}

output "nat_gateway_ip" {
  description = "Allow this IP in your RDS security group so the Agent can connect"
  value       = aws_eip.nat.public_ip
}
```

Initialize and apply:

```shell
terraform init
terraform apply
```

After `apply`, allow `nat_gateway_ip` (printed as a Terraform output) in the inbound rules of your RDS security group on the database port.

## Monitoring multiple databases

The example above declares a single instance in the Autodiscovery `instances` array. To monitor multiple databases of the same engine with the same Agent task, expand `local.ad_instance` into a list and pass it directly to the `com.datadoghq.ad.instances` label:

```hcl
locals {
  ad_instances = [
    {
      dbm      = true
      host     = "<endpoint-1>"
      port     = 5432
      username = "datadog"
      password = "%%env_DD_DB_PASSWORD%%"
      tags     = ["dbinstanceidentifier:db-1"]
    },
    {
      dbm      = true
      host     = "<endpoint-2>"
      port     = 5432
      username = "datadog"
      password = "%%env_DD_DB_PASSWORD%%"
      tags     = ["dbinstanceidentifier:db-2"]
    },
  ]
}
```

Then in the task definition: `"com.datadoghq.ad.instances" = jsonencode(local.ad_instances)`.

To monitor a mix of Postgres and MySQL instances, deploy a second Agent service with `engine = "mysql"` rather than mixing engines in one task — `com.datadoghq.ad.check_names` accepts only one check per Agent container in this pattern.

## Notes

- The Agent autodiscovers the Database Monitoring check from the docker labels declared on its own container — Docker socket access is not required, which is why this pattern works on Fargate.
- The NAT Gateway is what gives the Agent task a stable source IP (`nat_gateway_ip`) — that is the address you allow in your RDS security group, not the Fargate task's ENI, which changes on every restart.
- For Aurora clusters, point `db_endpoint` at the writer or cluster endpoint. Pointing at a reader endpoint causes the check to fail because `pg_stat_statements` and `EXPLAIN`-based introspection both require the writer.
- IAM database authentication is supported. Replace the `password` field with `aws.managed_authentication.enabled = true` in the Autodiscovery instance config and grant the task role the appropriate `rds-db:connect` permission. See [Connecting with Managed Authentication][5].
- This guide configures only the Database Monitoring integration. To collect RDS-level CPU, memory, and connection metrics, also configure the [AWS integration][6] for your account.

[1]: /agent/guide/ad_identifiers/
[2]: /database_monitoring/guide/rds_autodiscovery_terraform/
[3]: /database_monitoring/setup_postgres/rds/?tab=postgres15#grant-the-agent-access
[4]: /database_monitoring/setup_mysql/rds/?tab=mysql57#grant-the-agent-access
[5]: /database_monitoring/guide/managed_authentication/
[6]: /integrations/amazon_web_services/
