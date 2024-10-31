---
title: Cloud Cost Recommendations
description: Learn how to reduce the spending of your organization's cloud resources with Cost Recommendations.
algolia:
  tags: ['cloud cost recommendations', 'cloud cost recommendation', 'cost recommendations', 'cost recommendation', 'cloud resources', 'cloud resource']
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/integrations/guide/aws-integration-and-cloudwatch-faq/"
  tag: "Documentation"
  text: "AWS Integration and CloudWatch FAQ"
---

{{< callout url="#" btn_hidden="true" >}}
Cloud Cost Recommendations is in public beta with support for AWS, and is automatically enabled if you have set up <a href="/cloud_cost_management/">Cloud Cost Management</a>.
{{< /callout >}}

## Overview

[Cloud Cost Recommendations][1] provide recommendations on reducing your cloud spending by optimizing the usage of your cloud resources. Datadog generates a set of recommendations by combining your observability data with your underlying cloud provider's billing data to identify orphaned, legacy, or over-provisioned cloud resources.

Recommendations are run on a daily basis and are automatically refreshed in your account as soon as the recommendations are released.

- For **all resources**, [cloud cost metrics][11] are also pulled for that resource
- For all **AWS resources** besides Kubernetes and EC2, AWS metrics are also pulled from [AWS CloudWatch][11]

{{< img src="cloud_cost/recommendations/cost_recommendations_1.png" alt="Overview tab with potential monthly savings, potential annual savings, and total number of open cases on the Cloud Cost Recommendations page" style="width:100%;" >}}

You can see the detailed logic for each recommendation type, along with observability metrics or cost data shown on this page.

## Recommendation categories

Below are the available cloud cost recommendation categories and their descriptions.

| Recommendation Category | Description |
|----------|-------------|
| Unused resource | Identified resources that are running on legacy hardware or are not utilized efficiently in your cloud environment. You can consider upgrading or removing these resources to reduce your costs and improve the performance of your resources. |
| Previous generation resource | Resources that are running on legacy hardware, which you can consider upgrading to reduce your costs and improve the performance of your resources. |
| Over-provisioned resource | Resources that are under-utilized or over-provisioned, which you can consider adjusting the size and configuration of to reduce your costs and improve the performance of your resources. |
| Rate optimization | Resources that are charged at on-demand rates or could benefit from rate optimization. You can consider modifying these resources to reduce your costs. |
| Architecture | Resources related to NAT gateways, which you can consider optimizing to reduce unnecessary charges. |

## Prerequisites

The following are requirements necessary to receive Cloud Cost recommendations:

- Cloud provider accounts (for all Cloud Cost recommendations)
- AWS integration and resource collections (for AWS recommendations)

## Setup

For each AWS account that you would like to receive recommendations for:

1. Configure [Cloud Cost Management][2] to send bill data to Datadog.
1. Enable [resource collection][3] in the **Resource Collection** tab on the [AWS integration tile][4].
1. Install the [Datadog Agent][5] (required for over-provisioned resource recommendations).

## Recommendation and resource descriptions

| Recommendation Category | Cloud Provider | Resource Type | Recommendation Type | Recommendation Description | Recommendation Prerequisites |
|-------------------------|----------------|---------------|---------------------|----------------------------|------------------------------|
| Unused resource | AWS | EC2 | Unused EC2 Instances | EC2 instances with less than 5% CPU utilization, and less than 10% memory utilization. | [Datadog agent][5] |
| Unused resource | AWS | EBS | Unattached EBS Volumes | Volumes that have been detached from an EC2 instance. | |
| Unused resource | AWS | EBS | Unused EBS Volumes | Volumes attached to a non-running EC2 instance. | |
| Unused resource | AWS | RDS | Unused RDS Instances | RDS instances with 0 database connections and 0 replica lag. | |
| Unused resource | AWS | S3 | Abandoned S3 Multipart Uploads | Incomplete multipart uploads. | [Storage Lens][6] |
| Unused resource | AWS | Redshift | Unused Redshift Cluster | Redshift cluster with 0 database connections.
| Unused resource | AWS | Elasticache Redis | Unused Elasticache Redis Cluster | Elasticache Redis Cluster with 0 cache hits and 0 replication bytes. | |
| Unused resource | AWS | MQ | Unused MQ Broker | An MQ broker with 0 connections. | |
| Unused resource | AWS | ECR | Old ECR Images | ECR Image bytes are older than 180 days. | |
| Unused resource | AWS | OpenSearch | OpenSearch Cluster | An OpenSearch cluster with 0 connections. | |
| Unused resource | AWS | Classic Elastic Load Balancer | Unused Classic Elastic Load Balancers | Classic Elastic Load Balancer with no active connections that is not attached to an EC2 instance. | |
| Unused resource | AWS | Network Elastic Load Balancer | Unused Network Elastic Load Balancer | A network load balancer with 0 processed bytes. | |
| Unused resource | AWS | Application Load Balancer | Unused Application Load Balancer | An application load balancer with no traffic being processed. | |
| Unused resource | AWS | NAT Gateway | Unused NAT Gateway | A NAT Gateway that has no bytes sent through it. | |
| Unused resource | AWS | Elastic IP Address | Idle Elastic IP Address | Elastic IP addresses with idle charges in your AWS cost and usage report. |
| Unused resource | AWS | DynamoDB | Unused DynamoDB | A DynamoDB table has 0 consumed reads and 0 consumed non-replica writes. | 
| Unused resource | AWS | DynamoDB | Unused DynamoDB Global Secondary Index | A DynamoDB table's Global Secondary Index (GSI) has 0 consumed reads. |
| Unused resource | AWS | Autoscaling groups (ASG) | ASGs with legacy instance types | An autoscaling group that includes legacy instance types. | [Datadog agent][5] |
| Unused resource | AWS | DynamoDB | DynamoDB Delete Extra On-Demand Backups | A DynamoDB table has charges for more than 2 on-demand backups. | |
| Previous generation resource | AWS | EC2 | Legacy EC2 Instance | EC2 Instances that are previous generation, and can be upgraded to a newer instance type. | [Datadog agent][5] |
| Previous generation resource | AWS | GP2 EBS | GP2 EBS Volumes | EBS volumes that are GP2 and can be upgraded to GP3 for cost reduction and performance improvement. | |
| Previous generation resource | AWS | I01 EBS | I01 EBS Volumes | EBS volumes that are I01 and can be upgraded to GP3 for cost reduction and performance improvement. |
| Previous generation resource | AWS | Extended Support for RDS | An RDS running an engine version that is no longer supported and incurring [extended support charges][7] |
| Over-provisioned resource | AWS | EC2 | Over-provisioned EC2 instances | 
| Over-provisioned resource | AWS | EC2 instances not in an auto-scaling group, with less than 50% CPU and memory utilization. | [Datadog agent][5] |
| Over-provisioned resource | AWS | Kubernetes containers | Over-provisioned Kubernetes Containers | Containers with less than 30% CPU and memory utilization. | [Datadog profiling agent][8] |
| Over-provisioned resource | AWS | EBS | Over-provisioned EBS Volume IOPS | EBS Volumes where the amount of IOPS exceeds what is being used. | *[Also requires AWS EC2 integration][9] |
| Over-provisioned resource | AWS | RDS IOPS | Over-provisioned RDS IOPS | An RDS instance using less than 80% of the provisioned IOPS for reads and writes. | 
| Over-provisioned resource | AWS | EBS IOPS | Over-provisioned EBS IOPS | An EBS volume using less than 80% of the provisioned IOPS for reads and writes. | *[Also requires AWS EC2 integration][9] |
| Over-provisioned resource | AWS | EBS Storage | Over-provisioned EBS Storage | An EBS volume with less than 20% of its storage capacity used. | *[Also requires AWS EC2 integration][9] |
| Over-provisioned resource | AWS | EBS Throughput | Over-provisioned EBS Throughput | An EBS volume using less than 80% of the provisioned throughput for reads and writes. | *[Also requires AWS EC2 integration][9] |
| Over-provisioned resource | AWS | DynamoDB | Over-provisioned DynamoDB Capacity | A provisioned DynamoDB table using less than 80% of its read and write capacity more than 80% of the time. | |
| Rate optimization | AWS | RDS Reserved Instances | Purchase RDS RI | An RDS instance older than 45 days is still charged with on-demand rates. | |
| Rate optimization | AWS | ElastiCache Reserved Instances | Purchase ElastiCache RI | An ElastiCache node older than 45 days is still charged with on-demand rates. | | 
| Rate optimization | AWS | OpenSearch Reserved Instances | Purchase OpenSearch RI | An OpenSearch instance older than 45 days is still charged with on-demand rates. | |
| Rate optimization | AWS | Redshift Reserved Instances | Purchase Redshift RI | A Redshift cluster older than 45 days is still charged with on-demand rates. | |
| Rate optimization | AWS | S3 | S3 Tiering | A bucket's costs are almost entirely in per-GB standard storage, but GET requests indicate few objects are accessed. | |
| Rate optimization | AWS | S3 | S3 Non-current Version Expiration Lifecycle Rule | A standard S3 bucket without a non-current version expiration lifecycle and that does not serve a website contains non-current version storage bytes older than 30 days. | [Storage Lens][6] | |
| Rate optimization | AWS | DynamoDB | Migrate DynamoDB to On-Demand Capacity Mode | A provisioned DynamoDB table has an hourly read and write capacity consumption below 18% at least once in the last two weeks. | |
| Rate optimization | AWS | DynamoDB | Migrate DynamoDB to Provisioned Capacity Mod | An on-demand DynamoDB table has an hourly read and write capacity consumption that is always greater than 18%. | |
| Rate optimization | AWS | DynamoDB | Migrate DynamoDB to Standard Table Class | Migrating to the Standard table class offers potential savings from capacity rates compared to the additional costs from storage rates, or it uses the Standard table class' free tier for storage. | |
| Rate optimization | AWS | DynamoDB | Migrate DynamoDB to Infrequent Access Table Class | Migrating to the Infrequent Access (IA) table class offers more potential savings from storage rates compared to the additional costs from capacity rates. | |
| Architecture | NAT Gateway | NAT Gateway within VPC transfer charges | Resources in the same VPC should avoid communicating with each other through a NAT gateway because that incurs unnecessary NAT gateway processing charges. | [NPM][10] |
| Architecture | NAT Gateway | NAT Gateway cross-zone transfer charges | Resources that need a NAT gateway should use one that is in the same availability zone, or they can incur unnecessary cross-zone transfer charges. | |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/recommendations
[2]: /cloud_cost_management/aws/#setup
[3]: /integrations/amazon_web_services/#resource-collection
[4]: https://app.datadoghq.com/integrations/aws
[5]: /agent/
[6]: /integrations/amazon_s3_storage_lens/
[7]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support-charges.html
[8]: /profiler/enabling/
[9]: /integrations/amazon_ec2/
[10]: /network_monitoring/performance/setup/
[11]: /integrations/guide/aws-integration-and-cloudwatch-faq/