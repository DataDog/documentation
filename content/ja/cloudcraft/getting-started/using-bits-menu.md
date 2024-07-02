---
title: Using the Bits menu
---

## 概要

Using Cloudcraft's Bits menu, you can seamlessly move from any resource within Cloudcraft to the most relevant views in Datadog. This feature enables quick access to relevant information tailored to the specific resource you're examining. Whether it's logs, APM traces, or other data in Datadog, accessing it from your Cloudcraft diagram is a click away.

<div class="alert alert-info">To access this feature, log into Cloudcraft using your Datadog account. If you are logging in using another login method, <a href="https://app.cloudcraft.co/app/support">contact our support team</a> for assistance.</div>

## The Bits menu

Start by clicking on a [supported component](#supported-components) in your diagram. After you've selected a component, the Bits menu appears on the right-hand side of the screen.

{{< img src="cloudcraft/getting-started/using-bits-menu/bits-menu.png" alt="Screenshot showing the Cloudcraft interface with a red arrow highlighting the Bits menu." responsive="true" style="width:100%;">}}

Click on the Bits menu to view the available options for the selected component.

{{< img src="cloudcraft/getting-started/using-bits-menu/bits-menu-clicked.png" alt="Screenshot of Cloudcraft with the Bits menu clicked showing several options, including Host dashboard, Database monitoring, Query metrics, and MySQL dashboard." responsive="true" style="width:100%;">}}

Click on any of the options to open the relevant view in Datadog.

## Supported components

The Bits menu is available for the following Cloudcraft components:

**From AWS:**

- Cloudfront.
- DocumentDB.
- DynamoDB.
- EBS.
- EC2.
- EKS Cluster.
- ELB/ALB.
- Elasticache.
- Lambda.
- NAT Gateway.
- OpenSearch.
- RDS.
- Redshift.
- S3.
- SNS Topic.
- SQS.
- VPC Endpoint.

**From Azure:**

- AKS Cluster.
- Database for MySQL.
- Database for PostgreSQL.
- Function App.
- Managed Disk.
- SQL Database.
- Virtual Machine.
- Web App.

Support for additional components is coming soon.

**Note**: To view telemetry in Datadog for a component, the component must have Datadog Agents or other integrations installed and configured.
