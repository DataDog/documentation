---
title: Cloud Cost Recommendations
description: Learn how to reduce the spending of your organization's cloud resources with Cost Recommendations.
algolia:
  tags:
    - cloud cost recommendations
    - cloud cost recommendation
    - cost recommendations
    - cost recommendation
    - cloud resources
    - cloud resource
further_reading:
  - link: "/cloud_cost_management/"
    tag: "Documentation"
    text: "Learn about Cloud Cost Management"
  - link: "/integrations/guide/aws-integration-and-cloudwatch-faq/"
    tag: "Documentation"
    text: "AWS Integration and CloudWatch FAQ"
  - link: "https://www.datadoghq.com/blog/finops-at-datadog/"
    tag: "Blog"
    text: "How we've created a successful FinOps practice at Datadog"


multifiltersearch:
  # "id" must match the corresponding key in the "data" object
  headers:
    - name: Recommendation Category
      id: category
      filter_by: true
    - name: Cloud Provider
      id: cloud_provider
      filter_by: true
    - name: Resource Type
      id: resource_type
      filter_by: true
    - name: Recommendation Type
      id: recommendation_type
    - name: Recommendation Description
      id: recommendation_description
    - name: Recommendation Prerequisites
      id: recommendation_prerequisites
  data:
    - category: Unused resource
      cloud_provider: AWS
      resource_type: EC2
      recommendation_type: Unused EC2 Instances
      recommendation_description: EC2 instances with less than 5% CPU utilization, and less than 10% memory utilization.
      recommendation_prerequisites: "[Datadog Agent](/agent/)"
    - category: Unused resource
      cloud_provider: AWS
      resource_type: EC2
      recommendation_type: Unused EC2 instance running Redis
      recommendation_description: EC2 instance running Redis with 0 keyspace hits and is not containerized, a leader, a follower, nor a shard.
      recommendation_prerequisites: "[Redis Integration](https://docs.datadoghq.com/integrations/redisdb/?tab=host)"
    - category: Unused resource
      cloud_provider: AWS
      resource_type: EC2
      recommendation_type: Unused EC2 instance running memcached
      recommendation_description: EC2 instance running memcached with 0 keyspace hits and is not containerized.
      recommendation_prerequisites: "[Memcache Integration](https://docs.datadoghq.com/integrations/redisdb/?tab=host)"
    - category: Unused resource
      cloud_provider: AWS
      resource_type: EC2
      recommendation_type: Unused EC2 instance running Postgres
      recommendation_description: EC2 instance running Postgres with less than 1 concurrent connection and is not containerized nor a replica.
      recommendation_prerequisites: "[Postgres Integration](https://docs.datadoghq.com/integrations/mcache/?tab=host)"
    - category: Unused resource
      cloud_provider: AWS
      resource_type: EC2
      recommendation_type: Unused EC2 instance running MySQL
      recommendation_description: EC2 instance running MySQL with less than 1 concurrent connection and is not containerized nor a replica.
      recommendation_prerequisites: "[MySQL Integration](https://docs.datadoghq.com/integrations/postgres/?tab=host)"
    - category: Unused resource
      cloud_provider: AWS
      resource_type: EBS
      recommendation_type: Unattached EBS Volumes
      recommendation_description: Volumes that have been detached from an EC2 instance.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: EBS
      recommendation_type: Unused EBS Volumes
      recommendation_description: Volumes attached to a non-running EC2 instance.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: RDS
      recommendation_type: Unused RDS Instances
      recommendation_description: RDS instances with 0 database connections and 0 replica lag.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: S3
      recommendation_type: Abandoned S3 Multipart Uploads
      recommendation_description: Incomplete multipart uploads.
      recommendation_prerequisites: "[Storage Lens](/integrations/amazon_s3_storage_lens/)"
    - category: Unused resource
      cloud_provider: AWS
      resource_type: Redshift
      recommendation_type: Unused Redshift Cluster
      recommendation_description: Redshift cluster with 0 database connections.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: Elasticache Redis
      recommendation_type: Unused Elasticache Redis Cluster
      recommendation_description: Elasticache Redis Cluster with 0 cache hits and 0 replication bytes.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: MQ
      recommendation_type: Unused MQ Broker
      recommendation_description: An MQ broker with 0 connections.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: ECR
      recommendation_type: Old ECR Images
      recommendation_description: ECR Image bytes are older than 180 days.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: OpenSearch
      recommendation_type: OpenSearch Cluster
      recommendation_description: An OpenSearch cluster with 0 connections.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: Classic Elastic Load Balancer
      recommendation_type: Unused Classic Elastic Load Balancers
      recommendation_description: Classic Elastic Load Balancer with no active connections that is not attached to an EC2 instance.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: Network Elastic Load Balancer
      recommendation_type: Unused Network Elastic Load Balancer
      recommendation_description: A network load balancer with 0 processed bytes.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: Application Load Balancer
      recommendation_type: Unused Application Load Balancer
      recommendation_description: An application load balancer with no traffic being processed.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: NAT Gateway
      recommendation_type: Unused NAT Gateway
      recommendation_description: A NAT Gateway that has no bytes sent through it.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: Elastic IP Address
      recommendation_type: Idle Elastic IP Address
      recommendation_description: Elastic IP addresses with idle charges in your AWS cost and usage report.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: DynamoDB
      recommendation_type: Unused DynamoDB
      recommendation_description: A DynamoDB table has 0 consumed reads and 0 consumed non-replica writes.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: DynamoDB
      recommendation_type: Unused DynamoDB Global Secondary Index
      recommendation_description: A DynamoDB table's Global Secondary Index (GSI) has 0 consumed reads.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: AWS
      resource_type: Autoscaling groups (ASG)
      recommendation_type: ASGs with legacy instance types
      recommendation_description: An autoscaling group that includes legacy instance types.
      recommendation_prerequisites: "[Datadog Agent](/agent/)"
    - category: Unused resource
      cloud_provider: AWS
      resource_type: DynamoDB
      recommendation_type: DynamoDB Delete Extra On-Demand Backups
      recommendation_description: A DynamoDB table has charges for more than 2 on-demand backups.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: Azure
      resource_type: Azure AKS Cluster
      recommendation_type: Terminate AKS Cluster
      recommendation_description: An AKS cluster with less than 5% CPU usage
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: Azure
      resource_type: Azure Container Registry
      recommendation_type: Terminate Azure Container Registry
      recommendation_description: A container registry that has never received successful pulls
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: Azure
      resource_type: Azure Load Balancer
      recommendation_type: Delete Azure Load Balancer
      recommendation_description: Azure load balancer with 0 bytes transferred
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: Azure
      resource_type: Azure Managed Disk
      recommendation_type: Delete Unattached Azure Managed Disk
      recommendation_description: Azure-managed disk is unattached and can be deleted
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: Azure
      resource_type: Azure Managed Disk
      recommendation_type: Delete Unused Azure Managed Disk
      recommendation_description: Azure-managed disk with no read/write operations, which can be deleted
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: Azure
      resource_type: Azure MySQL
      recommendation_type: Terminate Database for MySQL
      recommendation_description: Database server with no connections, which can be terminated
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: Azure
      resource_type: Azure SQL Server Database
      recommendation_type: Terminate SQL Server Database
      recommendation_description: Azure SQL Server Database with no successful connections and very minimal CPU, which can be terminated
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: Azure
      resource_type: Azure VM Instance
      recommendation_type: Terminate VM Instance
      recommendation_description: VM instance with less than 5% user CPU and over 90% usable memory
      recommendation_prerequisites: "[Datadog Agent](/agent/)"
    - category: Previous generation resource
      cloud_provider: AWS
      resource_type: EC2
      recommendation_type: Legacy EC2 Instance
      recommendation_description: EC2 Instances that are previous generation, and can be upgraded to a newer instance type.
      recommendation_prerequisites: "[Datadog Agent](/agent/)"
    - category: Previous generation resource
      cloud_provider: AWS
      resource_type: GP2 EBS
      recommendation_type: GP2 EBS Volumes
      recommendation_description: EBS volumes that are GP2 and can be upgraded to GP3 for cost reduction and performance improvement.
      recommendation_prerequisites: ""
    - category: Previous generation resource
      cloud_provider: AWS
      resource_type: I01 EBS
      recommendation_type: I01 EBS Volumes
      recommendation_description: EBS volumes that are I01 and can be upgraded to GP3 for cost reduction and performance improvement.
      recommendation_prerequisites: ""
    - category: Previous generation resource
      cloud_provider: AWS
      resource_type: RDS
      recommendation_type: Extended Support RDS Instance
      recommendation_description: An RDS running an engine version that is no longer supported and incurring [extended support charges](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support-charges.html)
      recommendation_prerequisites: ""
    - category: Over-provisioned resource
      cloud_provider: AWS
      resource_type: EC2
      recommendation_type: Over-provisioned EC2 instances
      recommendation_description: Migrate legacy autoscaling group instances to new types.
      recommendation_prerequisites: "[Datadog Agent](/agent/)"
    - category: Over-provisioned resource
      cloud_provider: AWS
      resource_type: EC2
      recommendation_type: Over-provisioned EC2 instances running Redis
      recommendation_description: EC2 instance running Redis with less than 25% user CPU and is not containerized, a leader, a follower, nor a shard.
      recommendation_prerequisites: "[Redis Integration](https://docs.datadoghq.com/integrations/redisdb/?tab=host)"
    - category: Over-provisioned resource
      cloud_provider: AWS
      resource_type: EC2
      recommendation_type: Over-provisioned EC2 instance running memcached
      recommendation_description: EC2 instance running memcached with less than 25% user CPU and is not containerized.
      recommendation_prerequisites: "[Memcache Integration](https://docs.datadoghq.com/integrations/redisdb/?tab=host)"
    - category: Over-provisioned resource
      cloud_provider: AWS
      resource_type: EC2
      recommendation_type: Over-provisioned EC2 instance running Postgres
      recommendation_description: EC2 instance running Postgres with less than 25% user CPU and greater than 25% usable memory and is not containerized nor a replica.
      recommendation_prerequisites: "[Postgres Integration](https://docs.datadoghq.com/integrations/mcache/?tab=host)"
    - category: Over-provisioned resource
      cloud_provider: AWS
      resource_type: EC2
      recommendation_type: Over-provisioned EC2 running MySQL
      recommendation_description: EC2 instance running MySQL with less than 25% user CPU and greater than 25% usable memory and is not containerized nor a replica.
      recommendation_prerequisites: "[MySQL Integration](https://docs.datadoghq.com/integrations/postgres/?tab=host)"
    - category: Over-provisioned resource
      cloud_provider: AWS
      resource_type: Kubernetes containers
      recommendation_type: Over-provisioned Kubernetes Containers
      recommendation_description: Containers with less than 30% max CPU or memory utilization.
      recommendation_prerequisites: "[Datadog profiling agent](/profiler/enabling/)"
    - category: Over-provisioned resource
      cloud_provider: AWS
      resource_type: Kubernetes Deployment
      recommendation_type: Downsize Kubernetes Deployments
      recommendation_description: Containers are using only a fraction of their requested CPU or memory
      recommendation_prerequisites: "[Datadog Agent](/agent/)"
    - category: Over-provisioned resource
      cloud_provider: Azure
      resource_type: Kubernetes Deployment
      recommendation_type: Downsize Kubernetes Deployments
      recommendation_description: Containers are using only a fraction of their requested CPU or memory
      recommendation_prerequisites: "[Datadog Agent](/agent/)"
    - category: Over-provisioned resource
      cloud_provider: GCP
      resource_type: Kubernetes Deployment
      recommendation_type: Downsize Kubernetes Deployments
      recommendation_description: Containers are using only a fraction of their requested CPU or memory
      recommendation_prerequisites: "[Datadog Agent](/agent/)"
    - category: Over-provisioned resource
      cloud_provider: AWS
      resource_type: EBS
      recommendation_type: Over-provisioned EBS Volume IOPS
      recommendation_description: EBS Volumes where the amount of IOPS exceeds what is being used.
      recommendation_prerequisites: "[Amazon EC2 integration](/integrations/amazon_ec2/)"
    - category: Over-provisioned resource
      cloud_provider: AWS
      resource_type: RDS IOPS
      recommendation_type: Over-provisioned RDS IOPS
      recommendation_description: An RDS instance using less than 80% of the provisioned IOPS for reads and writes.
      recommendation_prerequisites: ""
    - category: Over-provisioned resource
      cloud_provider: AWS
      resource_type: EBS IOPS
      recommendation_type: Over-provisioned EBS IOPS
      recommendation_description: An EBS volume using less than 80% of the provisioned IOPS for reads and writes.
      recommendation_prerequisites: "[Amazon EC2 integration](/integrations/amazon_ec2/)"
    - category: Over-provisioned resource
      cloud_provider: AWS
      resource_type: EBS Storage
      recommendation_type: Over-provisioned EBS Storage
      recommendation_description: An EBS volume with less than 20% of its storage capacity used.
      recommendation_prerequisites: "[Amazon EC2 integration](/integrations/amazon_ec2/)"
    - category: Over-provisioned resource
      cloud_provider: AWS
      resource_type: EBS Throughput
      recommendation_type: Over-provisioned EBS Throughput
      recommendation_description: An EBS volume using less than 80% of the provisioned throughput for reads and writes.
      recommendation_prerequisites: "[Amazon EC2 integration](/integrations/amazon_ec2/)"
    - category: Over-provisioned resource
      cloud_provider: AWS
      resource_type: ECS Task Definition
      recommendation_type: Downsize ECS Task Size
      recommendation_description: An ECS task using less than 50% of its requested CPU or memory.
      recommendation_prerequisites: "[Container Monitoring](/containers/)"
    - category: Over-provisioned resource
      cloud_provider: AWS
      resource_type: DynamoDB
      recommendation_type: Over-provisioned DynamoDB Capacity
      recommendation_description: A provisioned DynamoDB table using less than 80% of its read and write capacity more than 80% of the time.
      recommendation_prerequisites: ""
    - category: Over-provisioned resource
      cloud_provider: Azure
      resource_type: Azure Container App
      recommendation_type: Downsize Azure Container App
      recommendation_description: An Azure Container App has higher than necessary minimum replicas
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: AWS
      resource_type: RDS Reserved Instances
      recommendation_type: Purchase RDS RI
      recommendation_description: An RDS instance older than 45 days is still charged with on-demand rates.
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: AWS
      resource_type: ElastiCache Reserved Instances
      recommendation_type: Purchase ElastiCache RI
      recommendation_description: An ElastiCache node older than 45 days is still charged with on-demand rates.
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: AWS
      resource_type: OpenSearch Reserved Instances
      recommendation_type: Purchase OpenSearch RI
      recommendation_description: An OpenSearch instance older than 45 days is still charged with on-demand rates.
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: AWS
      resource_type: Redshift Reserved Instances
      recommendation_type: Purchase Redshift RI
      recommendation_description: A Redshift cluster older than 45 days is still charged with on-demand rates.
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: AWS
      resource_type: S3
      recommendation_type: S3 Tiering
      recommendation_description: A bucket's costs are almost entirely in per-GB standard storage, but GET requests indicate few objects are accessed.
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: AWS
      resource_type: S3
      recommendation_type: S3 Non-current Version Expiration Lifecycle Rule
      recommendation_description: A standard S3 bucket without a non-current version expiration lifecycle and that does not serve a website contains non-current version storage bytes older than 30 days.
      recommendation_prerequisites: "[Storage Lens](/integrations/amazon_s3_storage_lens/)"
    - category: Rate optimization
      cloud_provider: AWS
      resource_type: DynamoDB
      recommendation_type: Migrate DynamoDB to On-Demand Capacity Mode
      recommendation_description: A provisioned DynamoDB table has an hourly read and write capacity consumption below 18% at least once in the last two weeks.
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: AWS
      resource_type: DynamoDB
      recommendation_type: Migrate DynamoDB to Provisioned Capacity Mod
      recommendation_description: An on-demand DynamoDB table has an hourly read and write capacity consumption that is always greater than 18%.
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: AWS
      resource_type: DynamoDB
      recommendation_type: Migrate DynamoDB to Standard Table Class
      recommendation_description: Migrating to the Standard table class offers potential savings from capacity rates compared to the additional costs from storage rates, or it uses the Standard table class' free tier for storage.
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: Azure
      resource_type: SQL Server Database
      recommendation_type: Purchase Reservation for SQL Server Database
      recommendation_description: SQL server database has no reservation coverage and is more than 45 days old
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: Azure
      resource_type: Database for MySQL
      recommendation_type: Purchase Reservation for Azure MySQL
      recommendation_description: Database for MySQL has no reservation coverage and is more than 45 days old
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: Azure
      resource_type: Database for PostgreSQL
      recommendation_type: Purchase Reservation for PostgreSQL
      recommendation_description: Database for PostgreSQL has no reservation coverage and is more than 45 days old
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: Azure
      resource_type: SQL Server Managed Instance
      recommendation_type: Purchase Reservation for SQL Server Managed Instance
      recommendation_description: Purchase reservation for SQL Server Managed Instance with no reservation coverage and is more than 45 days old
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: AWS
      resource_type: DynamoDB
      recommendation_type: Migrate DynamoDB to Infrequent Access Table Class
      recommendation_description: Migrating to the Infrequent Access (IA) table class offers more potential savings from storage rates compared to the additional costs from capacity rates.
      recommendation_prerequisites: ""
    - category: Architecture
      cloud_provider: AWS
      resource_type: NAT Gateway
      recommendation_type: NAT Gateway within VPC transfer charges
      recommendation_description: Resources in the same VPC should avoid communicating with each other through a NAT gateway because that incurs unnecessary NAT gateway processing charges.
      recommendation_prerequisites: "[NPM](/network_monitoring/performance/setup/)"
    - category: Architecture
      cloud_provider: AWS
      resource_type: NAT Gateway
      recommendation_type: NAT Gateway cross-zone transfer charges
      recommendation_description: Resources that need a NAT gateway should use one that is in the same availability zone, or they can incur unnecessary cross-zone transfer charges.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: GCP
      resource_type: CloudSQL Instance
      recommendation_type: Terminate CloudSQL Instance
      recommendation_description: CloudSQL instances with minimal usage that can be terminated.
      recommendation_prerequisites: "[Datadog Agent](/agent/)"
    - category: Over-provisioned resource
      cloud_provider: GCP
      resource_type: CloudSQL Instance
      recommendation_type: Downsize CloudSQL Database
      recommendation_description: CloudSQL instances that are over-provisioned and can be downsized.
      recommendation_prerequisites: "[Datadog Agent](/agent/)"
    - category: Rate optimization
      cloud_provider: GCP
      resource_type: CloudSQL Instance
      recommendation_type: Purchase CUD for Cloud SQL
      recommendation_description: CloudSQL instances that benefit from committed use discounts.
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: GCP
      resource_type: Cloud Run Job
      recommendation_type: Purchase Flexible CUD for Cloud Run Job
      recommendation_description: Cloud Run Jobs that benefit from flexible committed use discounts.
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: GCP
      resource_type: Storage Bucket
      recommendation_type: Transition Cloud Storage Bucket to Autoclass
      recommendation_description: Objects in the storage bucket can be automatically migrated to archival tiers for better rates.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: GCP
      resource_type: Compute Address
      recommendation_type: Delete Unused Compute IP Address
      recommendation_description: Unused compute IP addresses can be deleted.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: GCP
      resource_type: Compute Global Address
      recommendation_type: Delete Unused Compute Global IP Address
      recommendation_description: Unused compute global IP addresses can be deleted.
    - category: Unused resource
      cloud_provider: GCP
      resource_type: Compute Disk
      recommendation_type: Delete Unattached Compute Disk
      recommendation_description: Compute disks that are unattached and can be deleted.
      recommendation_prerequisites: ""
    - category: Unused resource
      cloud_provider: GCP
      resource_type: Compute Disk
      recommendation_type: Delete Unused Compute Disk
      recommendation_description: Compute disks that are unused and can be deleted.
      recommendation_prerequisites: ""
    - category: Rate optimization
      cloud_provider: GCP
      resource_type: Storage Bucket
      recommendation_type: Delete Non-Current Cloud Storage objects
      recommendation_description: Cloud Storage buckets that benefit from lifecycle rules to automatically delete non-current object versions.
      recommendation_prerequisites: ""
---


## Overview

[Cloud Cost Recommendations][1] provides recommendations on reducing your cloud spending by optimizing the usage of your cloud resources. Datadog generates a set of recommendations by combining your observability data with your underlying cloud provider billing data to identify orphaned, legacy, or over-provisioned cloud resources.

Recommendations are run on a daily basis and are automatically refreshed in your account as soon as the recommendations are released.

- For **all resources**, [cloud cost metrics][6] are also pulled for that resource
- For all **AWS resources** besides Kubernetes and EC2, AWS metrics are also pulled from [AWS CloudWatch][7]

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

- Cloud provider accounts (for all desired Cloud Cost recommendations)
- [AWS integration and resource collection][3] (for AWS recommendations)
- [Azure integration and resource collection][8] (for Azure recommendations)

## Setup

For each cloud account that you would like to receive recommendations for:

1. Configure [Cloud Cost Management][2] to send billing data to Datadog.
   - For Azure, this requires using the App Registration method to collect billing data.
1. Enable [resource collection][3] for recommendations.
   - For AWS, enable resource collection in the **Resource Collection** tab on the [AWS integration tile][4].
   - For Azure, enable resource collection with the appropriate integration. If your organization is on the Datadog US3 site, the [Azure Native Integration][9] enables this automatically through metrics collection. For all other sites, enabling resource collection within the [Azure integration tile][8] is required.
1. Install the [Datadog Agent][5] (required for over-provisioned resource recommendations).

**Note**: Cloud Cost Recommendations supports billing in customers' non-USD currencies.

## Recommendation action-taking
You can act on recommendations to save money and optimize costs. Cloud Cost Recommendations support Jira, 1-click Workflow Automation, and Datadog Case Management. Unused EBS and GP2 EBS volume recommendations also support 1-click Workflow Automation. See the following details for each action-taking options:

- **Jira**: Jira issue creation is available in both the recommendation side panel and the "Active Recommendations" list. You can create a Jira issue by clicking "Create Jira issue" in the side panel or by selecting multiple recommendations in the "Active Recommendations" list. Created Jira issues are automatically tagged to indicate their connection to a cost recommendation and include a link back to the referenced recommendation.
- **1-click Workflow Automation actions**: Actions are available for a limited set of recommendations, allowing users to execute suggested actions, such as clicking "Delete EBS Volume", directly within Cloud Cost Management.
- **Datadog Case Management**: Users can go to the recommendation side panel and click "Create Case" to generate a case to manage and take action on recommendations.

## Recommendation and resource descriptions

{{< multifilter-search >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/recommendations
[2]: /cloud_cost_management/setup/aws/#setup
[3]: /integrations/amazon_web_services/#resource-collection
[4]: https://app.datadoghq.com/integrations/aws
[5]: /agent/
[6]: /cloud_cost_management/container_cost_allocation/?tab=aws#cost-metrics
[7]: /integrations/amazon_s3_storage_lens/
[8]: https://app.datadoghq.com/integrations/azure
[9]: /integrations/azure/
