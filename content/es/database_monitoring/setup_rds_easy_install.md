---
title: Database Monitoring RDS Easy Install
---

Database Monitoring Easy Install for RDS allows users to quickly setup agents to monitor their RDS Postgres instances. After specifying a few options, Datadog will provide a CloudFormation template that will configure your instance for monitoring and deploy an agent to monitor the database with recommended DBM configurations.

## Installation types

RDS instance
RDS cluster

## Prerequisites

- A username/password with admin access to the RDS instance must be stored in an AWS Secret
- The instance must be configured with a security group that allows incoming connections from within the instance’s VPC, and outgoing connections to the Internet
- Currently only individual RDS instances can be monitored

## Installation

### RDS instance

### RDS cluster