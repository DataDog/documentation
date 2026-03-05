---
title: Setting Up Datadog Database Monitoring with RDS Autodiscovery Using Terraform
---

This guide walks you through deploying a Datadog Agent on an EC2 instance with RDS Autodiscovery enabled, using Terraform. The Agent automatically discovers eligible RDS instances in your AWS account and begins collecting Database Monitoring metrics — no manual  configuration required.

## Before you begin

Supported databases
: Postgres, MySQL

Supported Agent versions
: 7.74.0+

What this provisions
: - An EC2 instance (`t3.medium`) running Datadog Agent 7
  - An IAM role assigned to the EC2 instance, granting it permission to call `rds:DescribeDBInstances`
  - A security group allowing outbound internet access, applied to the EC2 instance

Prerequisites
: - Existing RDS instances running in your account, with the tag `use_dbm:true` applied
  - Terraform >= 1.3.0

## Overview

1. [Create the Datadog monitoring user on each RDS instance](#1-create-the-datadog-monitoring-user-on-each-rds-instance)
2. [Set your secrets as environment variables](#2-set-your-secrets-as-environment-variables)
3. [Deploy the Agent with Terraform](#3-deploy-the-agent-with-terraform)

## 1. Create the Datadog monitoring user on each RDS instance

Follow the Datadog documentation to create the `datadog` monitoring user on each RDS instance:

- [Postgres][2]
- [MySQL][3]

Use the same password you will set for `TF_VAR_datadog_db_password` in the next step.

## 2. Set your secrets as environment variables

Export your secrets to the shell before running Terraform. This avoids storing sensitive values in files on disk.

```bash
export TF_VAR_datadog_api_key="<YOUR_DATADOG_API_KEY>"
export TF_VAR_datadog_db_password="<YOUR_DATADOG_DB_PASSWORD>"
```

Your Datadog API key can be found at **Organization Settings → API Keys** in the Datadog UI.

## 3. Deploy the Agent with Terraform

Create a file named `main.tf` with the following content. Replace the following values before applying:

- `region` — your AWS region
- `vpc_id` — the ID of your existing VPC
- `subnet_id` — the ID of the subnet to deploy the Agent into

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
# Variables — set via environment variables
# export TF_VAR_datadog_api_key="<your-api-key>"
# export TF_VAR_datadog_db_password="<your-db-password>"
# -------------------------------------------------------

variable "datadog_api_key" {
  description = "Datadog API key"
  type        = string
  sensitive   = true
}

variable "datadog_db_password" {
  description = "Password for the 'datadog' monitoring user on your RDS instances"
  type        = string
  sensitive   = true
}

# -------------------------------------------------------
# Look up the latest Amazon Linux 2 AMI
# -------------------------------------------------------

data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# -------------------------------------------------------
# IAM — let the agent call rds:DescribeDBInstances
# so it can autodiscover RDS instances in your account
# -------------------------------------------------------

resource "aws_iam_role" "agent" {
  name = "dd-dbm-agent-role" # replace with your preferred name

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "rds_autodiscovery" {
  name = "dd-dbm-agent-rds-autodiscovery"
  role = aws_iam_role.agent.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["rds:DescribeDBInstances"]
      Resource = "*"
    }]
  })
}

resource "aws_iam_instance_profile" "agent" {
  name = "dd-dbm-agent-profile"
  role = aws_iam_role.agent.name
}

# -------------------------------------------------------
# Security Group — outbound internet access only
# -------------------------------------------------------

resource "aws_security_group" "agent" {
  name   = "dd-dbm-agent-sg"
  vpc_id = "vpc-xxxxxxxxxxxxxxxxx" # replace with your VPC ID

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# -------------------------------------------------------
# EC2 Instance — Datadog agent with RDS autodiscovery
# -------------------------------------------------------

resource "aws_instance" "agent" {
  ami                         = data.aws_ami.amazon_linux_2.id
  instance_type               = "t3.medium"
  subnet_id                   = "subnet-xxxxxxxxxxxxxxxxx" # replace with your subnet ID
  iam_instance_profile        = aws_iam_instance_profile.agent.name
  vpc_security_group_ids      = [aws_security_group.agent.id]
  user_data_replace_on_change = true

  user_data = <<-EOF
    #!/bin/bash
    set -e

    # Install Datadog Agent 7
    DD_API_KEY="${var.datadog_api_key}" DD_SITE="datadoghq.com" \
      bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"

    # Enable RDS autodiscovery — the agent will poll rds:DescribeDBInstances
    # every 300 seconds and auto-configure monitoring for discovered instances
    cat >> /etc/datadog-agent/datadog.yaml <<DDCONFIG

    database_monitoring:
      autodiscovery:
        rds:
          enabled: true
          discovery_interval: 300
          tags:
            - "use_dbm:true"
          dbm_tag: "use_dbm:true"
    DDCONFIG

    # Postgres integration template
    # %%host%%, %%port%%, %%extra_*%% are filled in by the agent at runtime
    cat > /etc/datadog-agent/conf.d/postgres.d/conf_aws_rds.yaml <<PGCONF
    ad_identifiers:
      - _dbm_postgres
    init_config:
    instances:
      - host: "%%host%%"
        port: "%%port%%"
        username: datadog
        password: "${var.datadog_db_password}"
        dbm: "%%extra_dbm%%"
        database_autodiscovery:
          enabled: true
        collect_schemas:
          enabled: true
        collect_settings:
          enabled: ture
        aws:
          instance_endpoint: "%%host%%"
          region: "%%extra_region%%"
        tags:
          - "dbinstanceidentifier:%%extra_dbinstanceidentifier%%"
    PGCONF

    systemctl restart datadog-agent
  EOF

  tags = {
    Name = "dd-dbm-agent" # optional — replace or remove
  }
}
```

Initialize and apply:

```bash
terraform init
terraform apply
```

**Note**: The Agent autodiscovery can only discover RDS instances running within the same AWS region. The `use_dbm` field in the autodiscovery configuration controls which RDS instances are discovered. In this guide, `use_dbm:true` is used, but you can replace it with any custom tag applied to your RDS instances. To monitor all RDS instances in the account with database standard integration to get high level metrics, set `tags` to an empty array in `datadog.yaml`:

```yaml
database_monitoring:
  autodiscovery:
    rds:
      enabled: true
      tags: []
```

### Supported template variables

The following variables are populated automatically by the Agent at runtime from each discovered RDS instance:

| Template variable                | Source                                               |
|:---------------------------------|:-----------------------------------------------------|
| `%%host%%`                       | RDS instance endpoint                                |
| `%%port%%`                       | RDS instance port                                    |
| `%%extra_region%%`               | AWS region where the instance is located             |
| `%%extra_dbinstanceidentifier%%` | RDS instance identifier                              |
| `%%extra_dbm%%`                  | Whether DBM is enabled, based on the `dbm_tag` value |

[1]: https://app.datadoghq.com/databases
[2]: https://docs.datadoghq.com/database_monitoring/setup_postgres/rds/?tab=postgres15#grant-the-agent-access
[3]: https://docs.datadoghq.com/database_monitoring/setup_mysql/rds/?tab=mysql57#grant-the-agent-access
