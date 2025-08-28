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
  - link: https://www.datadoghq.com/blog/cloud-cost-recommendations/
    tag: "Blog"
    text: "Eliminate cloud waste across AWS, Azure, and Google Cloud with Cloud Cost Recommendations"


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
    - category: Downsize
      cloud_provider: AWS
      resource_type: Autoscaling Group
      recommendation_type: Downsize Autoscaling Group
      recommendation_description: An autoscaling group with less than 5% CPU and 10% memory usage.
      recommendation_prerequisites: '[Datadog Agent](/agent/)'
    - category: Migrate
      cloud_provider: AWS
      resource_type: Autoscaling Group
      recommendation_type: Migrate Legacy Autoscaling Group instances to new types
      recommendation_description: An autoscaling group that includes legacy instance types.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: DynamoDB
      recommendation_type: Delete DynamoDB Global Secondary Index
      recommendation_description: A DynamoDB table's Global Secondary Index (GSI) has 0 consumed reads.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: DynamoDB
      recommendation_type: Delete DynamoDB Table
      recommendation_description: A DynamoDB table has 0 consumed reads and 0 consumed non-replica writes.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: DynamoDB
      recommendation_type: Delete Extra On-Demand Backups
      recommendation_description: A DynamoDB table has charges for more than 2 on-demand backups.
      recommendation_prerequisites: ""
    - category: Downsize
      cloud_provider: AWS
      resource_type: DynamoDB
      recommendation_type: Downsize DynamoDB Capacity
      recommendation_description: A provisioned DynamoDB table using less than 80% of its read and write capacity more than 80% of the time.
      recommendation_prerequisites: ""
    - category: Migrate
      cloud_provider: AWS
      resource_type: DynamoDB
      recommendation_type: Migrate DynamoDB to Infrequent Access Table Class
      recommendation_description: Migrating to the Infrequent Access (IA) table class offers more potential savings from storage rates compared to the additional costs from capacity rates.
      recommendation_prerequisites: ""
    - category: Migrate
      cloud_provider: AWS
      resource_type: DynamoDB Table
      recommendation_type: Migrate DynamoDB to On-Demand Capacity Mode
      recommendation_description: A provisioned DynamoDB table has an hourly read and write capacity consumption below 18% at least once in the last two weeks.
      recommendation_prerequisites: ""
    - category: Migrate
      cloud_provider: AWS
      resource_type: DynamoDB Table
      recommendation_type: Migrate DynamoDB to Provisioned Capacity Mode
      recommendation_description: An on-demand DynamoDB table has an hourly read and write capacity consumption that is always greater than 18%.
      recommendation_prerequisites: ""
    - category: Migrate
      cloud_provider: AWS
      resource_type: DynamoDB Table
      recommendation_type: Migrate DynamoDB to Standard Table Class
      recommendation_description: Migrating to the Standard table class offers potential savings from capacity rates compared to the additional costs from storage rates, or it uses the Standard table class' free tier for storage.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: EBS Snapshot
      recommendation_type: Delete Old EBS Snapshots
      recommendation_description: EBS Snapshots that are at least 90 days old and can be deleted.
      recommendation_prerequisites: ""
    - category: Downsize
      cloud_provider: AWS
      resource_type: EBS Volume
      recommendation_type: Downsize EBS Volume Provisioned IOPS
      recommendation_description: An EBS volume using less than 80% of the provisioned IOPS for reads and writes.
      recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    - category: Downsize
      cloud_provider: AWS
      resource_type: EBS Volume
      recommendation_type: Downsize EBS Volume Provisioned Throughput
      recommendation_description: An EBS volume using less than 80% of the provisioned throughput for reads and writes.
      recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    - category: Downsize
      cloud_provider: AWS
      resource_type: EBS Volume
      recommendation_type: Downsize EBS volume storage capacity
      recommendation_description: An EBS volume with less than 20% of its storage capacity used.
      recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    - category: Migrate
      cloud_provider: AWS
      resource_type: EBS Volume
      recommendation_type: Migrate EBS Volume from GP2 to GP3
      recommendation_description: EBS volumes that are GP2 and can be upgraded to GP3 for cost reduction and performance improvement.
      recommendation_prerequisites: ""
    - category: Migrate
      cloud_provider: AWS
      resource_type: EBS Volume
      recommendation_type: Migrate EBS Volume from IO1 to GP3
      recommendation_description: EBS volumes that are IO1 and can be upgraded to GP3 for cost reduction and performance improvement.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: EBS Volume
      recommendation_type: Terminate Unattached EBS Volume
      recommendation_description: Volume that is not attached to an EC2 instance.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: EBS Volume
      recommendation_type: Terminate Unused EBS Volume
      recommendation_description: Volume that has no read or write activity.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: Elastic IP
      recommendation_type: Delete Idle Elastic IP
      recommendation_description: Elastic IP addresses with idle charges in your AWS cost and usage report.
      recommendation_prerequisites: ""
    - category: Downsize
      cloud_provider: AWS
      resource_type: EC2 Instance
      recommendation_type: Downsize EC2 Instance Running Memcached
      recommendation_description: EC2 instance running memcached with less than 25% user CPU and is not containerized.
      recommendation_prerequisites: '[Memcache Integration](/integrations/memcached)'
    - category: Downsize
      cloud_provider: AWS
      resource_type: EC2 Instance
      recommendation_type: Downsize EC2 Instance Running MySQL
      recommendation_description: EC2 instance running MySQL with less than 25% user CPU and greater than 25% usable memory and is not containerized nor a replica.
      recommendation_prerequisites: '[MySQL Integration](/integrations/mysql)'
    - category: Downsize
      cloud_provider: AWS
      resource_type: EC2 Instance
      recommendation_type: Downsize EC2 Instance Running Postgres
      recommendation_description: EC2 instance running Postgres with less than 25% user CPU and greater than 25% usable memory and is not containerized nor a replica.
      recommendation_prerequisites: '[Postgres Integration](/integrations/postgres)'
    - category: Downsize
      cloud_provider: AWS
      resource_type: EC2 Instance
      recommendation_type: Downsize EC2 Instance Running Redis
      recommendation_description: EC2 instance running Redis with less than 25% user CPU and is not containerized, a leader, a follower, nor a shard.
      recommendation_prerequisites: '[Redis Integration](/integrations/redis)'
    - category: Downsize
      cloud_provider: AWS
      resource_type: EC2 Instance
      recommendation_type: Downsize EC2 instance
      recommendation_description: EC2 instances with less than 50% CPU utilization and less than 50% memory utilization.
      recommendation_prerequisites: '[Datadog Agent](/agent/)'
    - category: Migrate
      cloud_provider: AWS
      resource_type: EC2 Instance
      recommendation_type: Migrate Legacy EC2 instance
      recommendation_description: EC2 instances that are of a previous generation and can be upgraded to a newer instance type.
      recommendation_prerequisites: '[Datadog Agent](/agent/)'
    - category: Terminate
      cloud_provider: AWS
      resource_type: EC2 Instance
      recommendation_type: Terminate EC2 Instance running MySQL
      recommendation_description: EC2 instance running MySQL with less than 1 concurrent connection and is not containerized nor a replica.
      recommendation_prerequisites: '[MySQL Integration](/integrations/mysql)'
    - category: Terminate
      cloud_provider: AWS
      resource_type: EC2 Instance
      recommendation_type: Terminate EC2 instance
      recommendation_description: EC2 instances with less than 5% CPU utilization and less than 10% memory utilization.
      recommendation_prerequisites: '[Datadog Agent](/agent/)'
    - category: Terminate
      cloud_provider: AWS
      resource_type: EC2 Instance
      recommendation_type: Terminate EC2 instance running Memcached
      recommendation_description: EC2 instance running Memcached with 0 keyspace hits and is not containerized.
      recommendation_prerequisites: '[Memcache Integration](/integrations/memcached)'
    - category: Terminate
      cloud_provider: AWS
      resource_type: EC2 Instance
      recommendation_type: Terminate EC2 instance running Postgres
      recommendation_description: EC2 instance running Postgres with less than 1 concurrent connection and is not containerized nor a replica.
      recommendation_prerequisites: '[Postgres Integration](/integrations/postgres)'
    - category: Terminate
      cloud_provider: AWS
      resource_type: EC2 Instance
      recommendation_type: Terminate EC2 instance running Redis
      recommendation_description: EC2 instance running Redis with 0 keyspace hits and is not containerized, a leader, a follower, nor a shard.
      recommendation_prerequisites: '[Redis Integration](/integrations/redis)'
    - category: Terminate
      cloud_provider: AWS
      resource_type: ECR Repository
      recommendation_type: Delete ECR Repository
      recommendation_description: ECR Repository with 0 image pulls.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: ECR Repository
      recommendation_type: Delete old ECR Images
      recommendation_description: ECR Image bytes older than 180 days.
      recommendation_prerequisites: ""
    - category: Downsize
      cloud_provider: AWS
      resource_type: ECS Task Definition
      recommendation_type: Downsize ECS Task Size
      recommendation_description: An ECS task using less than 50% of its requested CPU or memory.
      recommendation_prerequisites: '[Container Monitoring](/containers/)'
    - category: Purchase
      cloud_provider: AWS
      resource_type: ElastiCache Cluster
      recommendation_type: Purchase Reserved ElastiCache Node
      recommendation_description: An ElastiCache node older than 45 days is still charged with on-demand rates.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: ElastiCache Cluster
      recommendation_type: Terminate ElastiCache Cluster
      recommendation_description: ElastiCache Redis Cluster with 0 cache hits and 0 replication bytes.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: Classic Load Balancer
      recommendation_type: Terminate Classic Load Balancer
      recommendation_description: Classic Elastic Load Balancer with no active connections that is not attached to an EC2 instance.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: Application Load Balancer
      recommendation_type: Terminate Application Load Balancer
      recommendation_description: An application load balancer with no traffic being processed.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: Network Load Balancer
      recommendation_type: Terminate Network Load Balancer
      recommendation_description: A network load balancer with 0 processed bytes.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: MQ Broker
      recommendation_type: Terminate MQ Broker
      recommendation_description: An MQ broker with 0 connections.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: OpenSearch
      recommendation_type: Delete OpenSearch Domain
      recommendation_description: An OpenSearch domain with 0 connections.
      recommendation_prerequisites: ""
    - category: Purchase
      cloud_provider: AWS
      resource_type: OpenSearch Domain
      recommendation_type: Purchase Reserved OpenSearch Instance
      recommendation_description: An OpenSearch instance older than 45 days is still charged with on-demand rates.
      recommendation_prerequisites: ""
    - category: Downsize
      cloud_provider: AWS
      resource_type: RDS Instance
      recommendation_type: Downsize RDS Instance Provisioned IOPS
      recommendation_description: RDS instances using less than 80% of provisioned IOPS over the past two weeks.
      recommendation_prerequisites: ""
    - category: Migrate
      cloud_provider: AWS
      resource_type: RDS Instance
      recommendation_type: Migrate the RDS Instance Engine
      recommendation_description: An RDS running an engine version that is no longer supported and incurring [extended support charges](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support-charges.html)
      recommendation_prerequisites: ""
    - category: Purchase
      cloud_provider: AWS
      resource_type: RDS Instance
      recommendation_type: Purchase Reserved RDS Instance
      recommendation_description: An RDS instance older than 45 days is still charged with on-demand rates.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: RDS Instance
      recommendation_type: Terminate Unused RDS Instance
      recommendation_description: RDS instance with 0 database connections and 0 replica lag.
      recommendation_prerequisites: ""
    - category: Purchase
      cloud_provider: AWS
      resource_type: Redshift
      recommendation_type: Purchase Reserved Redshift Cluster Node
      recommendation_description: Redshift cluster node older than 45 days is still charged with on-demand rates.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: Redshift
      recommendation_type: Terminate Redshift Cluster
      recommendation_description: Redshift cluster with 0 database connections.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: AWS
      resource_type: S3 Bucket
      recommendation_type: Delete S3 non-current version objects
      recommendation_description: A standard S3 bucket without a non-current version expiration lifecycle and that does not serve a website contains non-current version storage bytes older than 30 days.
      recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    - category: Terminate
      cloud_provider: AWS
      resource_type: S3 Bucket
      recommendation_type: Delete abandoned S3 multipart uploads
      recommendation_description: S3 buckets with incomplete multipart uploads older than 7 days that are consuming storage space.
      recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    - category: Migrate
      cloud_provider: AWS
      resource_type: S3 Bucket
      recommendation_type: Transition S3 IA and Glacier objects to Intelligent-Tiering
      recommendation_description: A bucket has large early deletion charges.
      recommendation_prerequisites: ""
    - category: Migrate
      cloud_provider: AWS
      resource_type: S3 Bucket
      recommendation_type: Transition S3 Standard objects to Intelligent Tiering
      recommendation_description: A bucket's costs are almost entirely in per-GB standard storage, but GET requests indicate few objects are accessed.
      recommendation_prerequisites: ""
    - category: Downsize
      cloud_provider: AWS
      resource_type: NAT Gateway
      recommendation_type: Reduce NAT Gateway Cross-Zone Transfers
      recommendation_description: Resources that need a NAT gateway should use one that is in the same availability zone, or they can incur unnecessary cross-zone transfer charges.
      recommendation_prerequisites: ""
    - category: Downsize
      cloud_provider: AWS
      resource_type: VPC NAT Gateway
      recommendation_type: Reduce NAT Within-VPC Transfers
      recommendation_description: Resources in the same VPC should avoid communicating with each other through a NAT gateway because that incurs unnecessary NAT gateway processing charges.
      recommendation_prerequisites: '[NPM](/network_monitoring/performance/setup/)'
    - category: Terminate
      cloud_provider: AWS
      resource_type: NAT Gateway
      recommendation_type: Terminate NAT Gateway
      recommendation_description: A NAT Gateway that has no bytes sent through it.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: Azure
      resource_type: AKS Cluster
      recommendation_type: Terminate AKS Cluster
      recommendation_description: An AKS cluster with less than 5% CPU usage.
      recommendation_prerequisites: ""
    - category: Purchase
      cloud_provider: Azure
      resource_type: Azure App Service
      recommendation_type: Purchase Reservation for App Service
      recommendation_description: App Service older than 45 days is charged with on-demand rates.
      recommendation_prerequisites: ""
    - category: Downsize
      cloud_provider: Azure
      resource_type: Container App
      recommendation_type: Downsize Container App
      recommendation_description: A Container App has higher than necessary minimum replicas.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: Azure
      resource_type: Load Balancer
      recommendation_type: Delete Load Balancer
      recommendation_description: Load Balancer with 0 bytes transferred.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: Azure
      resource_type: Managed Disk
      recommendation_type: Delete Unattached Managed Disk
      recommendation_description: Managed disk is unattached and can be deleted.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: Azure
      resource_type: Managed Disk
      recommendation_type: Delete Unused Managed Disk
      recommendation_description: Managed disk with no read/write operations, which can be deleted.
      recommendation_prerequisites: ""
    - category: Downsize
      cloud_provider: Azure
      resource_type: Managed Disk
      recommendation_type: Downsize Managed Disk IOPS
      recommendation_description: Managed disk using less than 80% of the provisioned IOPS.
      recommendation_prerequisites: ""
    - category: Downsize
      cloud_provider: Azure
      resource_type: Managed Disk
      recommendation_type: Downsize Managed Disk Throughput
      recommendation_description: Managed disk using less than 80% of the provisioned throughput.
      recommendation_prerequisites: ""
    - category: Purchase
      cloud_provider: Azure
      resource_type: MySQL Database
      recommendation_type: Purchase Reservation for MySQL
      recommendation_description: Database for MySQL has no reservation coverage and is more than 45 days old.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: Azure
      resource_type: MySQL Database
      recommendation_type: Terminate Database for MySQL
      recommendation_description: Database server with no connections, which can be terminated.
      recommendation_prerequisites: ""
    - category: Purchase
      cloud_provider: Azure
      resource_type: Database for PostgreSQL
      recommendation_type: Purchase Reservation for PostgreSQL
      recommendation_description: Database for PostgreSQL has no reservation coverage and is more than 45 days old.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: Azure
      resource_type: SQL Server
      recommendation_type: Terminate SQL Server
      recommendation_description: SQL Server with no connections, which can be terminated.
      recommendation_prerequisites: ""
    - category: Downsize
      cloud_provider: Azure
      resource_type: SQL Server Database
      recommendation_type: Downsize SQL Server Database DTU
      recommendation_description: SQL Server database with low DTU usage that can be downsized.
      recommendation_prerequisites: ""
    - category: Purchase
      cloud_provider: Azure
      resource_type: SQL Server Database
      recommendation_type: Purchase Reservation for SQL Server Database
      recommendation_description: SQL server database has no reservation coverage and is more than 45 days old.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: Azure
      resource_type: SQL Server Database
      recommendation_type: Terminate SQL Server Database
      recommendation_description: SQL Server Database with no successful connections and very minimal CPU, which can be terminated.
      recommendation_prerequisites: ""
    - category: Purchase
      cloud_provider: Azure
      resource_type: SQL Server Managed Instance
      recommendation_type: Purchase Reservation for SQL Server Managed Instance
      recommendation_description: Purchase reservation for SQL Server Managed Instance with no reservation coverage and is more than 45 days old.
      recommendation_prerequisites: ""
    - category: Downsize
      cloud_provider: Azure
      resource_type: VM Instance
      recommendation_type: Downsize Azure VM Instance
      recommendation_description: VM instance that can be downsized to a smaller instance type.
      recommendation_prerequisites: '[Datadog Agent](/agent/)'
    - category: Terminate
      cloud_provider: Azure
      resource_type: VM Instance
      recommendation_type: Terminate Azure VM Instance
      recommendation_description: VM instance with less than 5% user CPU and over 90% usable memory.
      recommendation_prerequisites: '[Datadog Agent](/agent/)'
    - category: Downsize
      cloud_provider: Azure
      resource_type: VM Instance
      recommendation_type: Downsize Azure VM Instance
      recommendation_description: VM instance that can be downsized to a smaller instance type.
      recommendation_prerequisites: '[Datadog Agent](/agent/)'
    - category: Purchase
      cloud_provider: GCP
      resource_type: Cloud Run Job
      recommendation_type: Purchase Flexible CUD for Cloud Run Job
      recommendation_description: Cloud Run Jobs that benefit from flexible committed use discounts.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: GCP
      resource_type: Compute Address
      recommendation_type: Delete Unused Compute IP Address
      recommendation_description: Unused compute IP addresses can be deleted.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: GCP
      resource_type: Compute Disk
      recommendation_type: Delete Unattached Compute Disk
      recommendation_description: Compute disks that are unattached and can be deleted.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: GCP
      resource_type: Compute Disk
      recommendation_type: Delete Unused Compute Disk
      recommendation_description: Compute disks that are unused and can be deleted.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: GCP
      resource_type: Compute Global Address
      recommendation_type: Delete Unused Compute Global IP Address
      recommendation_description: Unused compute global IP addresses can be deleted.
      recommendation_prerequisites: ""
    - category: Downsize
      cloud_provider: GCP
      resource_type: Compute Instance
      recommendation_type: Downsize Compute Instance
      recommendation_description: Compute instance with low CPU and memory usage that can be downsized to a smaller instance type.
      recommendation_prerequisites: '[Datadog Agent](/agent/)'
    - category: Terminate
      cloud_provider: GCP
      resource_type: Compute Instance
      recommendation_type: Terminate Compute Instance
      recommendation_description: Compute instance with low CPU usage, high available memory, and minimal network activity.
      recommendation_prerequisites: '[Datadog Agent](/agent/)'
    - category: Downsize
      cloud_provider: GCP
      resource_type: CloudSQL Instance
      recommendation_type: Downsize CloudSQL Database
      recommendation_description: CloudSQL instances that are over-provisioned and can be downsized.
      recommendation_prerequisites: ""
    - category: Purchase
      cloud_provider: GCP
      resource_type: CloudSQL Instance
      recommendation_type: Purchase CUD for Cloud SQL
      recommendation_description: CloudSQL instances that benefit from committed use discounts.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: GCP
      resource_type: CloudSQL Instance
      recommendation_type: Terminate CloudSQL Instance
      recommendation_description: CloudSQL instances with minimal usage that can be terminated.
      recommendation_prerequisites: ""
    - category: Terminate
      cloud_provider: GCP
      resource_type: Storage Bucket
      recommendation_type: Delete Non-Current Cloud Storage Objects
      recommendation_description: Cloud Storage buckets that benefit from lifecycle rules to automatically delete non-current object versions.
      recommendation_prerequisites: ""
    - category: Migrate
      cloud_provider: GCP
      resource_type: Storage Bucket
      recommendation_type: Transition Cloud Storage Bucket to Autoclass
      recommendation_description: Objects in the storage bucket can be automatically migrated to archival tiers for better rates.
      recommendation_prerequisites: ""
    - category: Downsize
      cloud_provider: AWS
      resource_type: Kubernetes Deployment
      recommendation_type: Downsize Deployment
      recommendation_description: Containers are using only a fraction of their requested CPU or memory.
      recommendation_prerequisites: '[Datadog Agent](/agent/)'
    - category: Downsize
      cloud_provider: Azure
      resource_type: Kubernetes Deployment
      recommendation_type: Downsize Deployment
      recommendation_description: Containers are using only a fraction of their requested CPU or memory.
      recommendation_prerequisites: '[Datadog Agent](/agent/)'
    - category: Downsize
      cloud_provider: GCP
      resource_type: Kubernetes Deployment
      recommendation_type: Downsize Deployment
      recommendation_description: Containers are using only a fraction of their requested CPU or memory.
      recommendation_prerequisites: '[Datadog Agent](/agent/)'

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
| Terminate | Resources with signals that the resource is unused or very low utilization signals. Consider terminating or deleting these resources to reduce your costs. |
| Migrate | Resources with moderately low utilization signals or other inefficiencies. Consider adjusting the instance type or other parameters. |
| Downsize | Resources that are under-utilized or over-provisioned. Consider adjusting the size or other parameters to reduce costs. |
| Purchase | Resources with on-demand charges and extended uptime. Purchasing a reservation or Savings Plan can reduce the amortized cost of the resource. |

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
1. Install the [Datadog Agent][5] (required for Downsize recommendations).

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
