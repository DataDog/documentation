---
title: Database Monitoring Quick Install for Postgres RDS
---

Database Monitoring Quick Install for RDS enables you to quickly set up Agents to monitor your RDS Postgres instances. After specifying a few options, Datadog generates a CloudFormation template that configures your instance for monitoring and deploys an Agent with recommended DBM configurations.

## Installation types

Datadog uses AWS ECS to deploy the Agent to the RDS instance. 

## Prerequisites

- The RDS instance's admin access username/password must be stored in an AWS Secret.
- A security group must be configured on the instance to allow incoming connections from its VPC and outgoing connections to the internet.

## Installation

1. Navigate to the [Database Monitoring Setup][1] page.
1. On the **Unmonitored Hosts** tab, click **Add Agent** for the RDS instance where you want to install the Agent.
1. If you don't have an ECS cluster installed for your account and region, click **Create Cluster**.
1. Select a security group from the **Security Group** dropdown list.
1. Click **Select API Key**, select an API key from the list, and then click **Use API Key**.
1. Click **Launch CloudFormation Stack in AWS Console**. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack. The template includes the configuration required to deploy the Agent to monitor your RDS instance.

[1]: https://app.datadoghq.com/databases/setup