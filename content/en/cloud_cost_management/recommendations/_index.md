---
title: Cloud Cost Recommendations
private: true
description: Learn how to reduce the spending of your organization's cloud resources with Cost Recommendations.
algolia:
  tags: ['cloud cost recommendations', 'cloud cost recommendation', 'cost recommendations', 'cost recommendation', 'cloud resources', 'cloud resource']
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
---

{{< callout btn_hidden="true" header="Join the Preview!">}}
Cloud Cost Recommendations are in Preview with support for AWS, and are automatically enabled if you have set up <a href="/cloud_cost_management/">Cloud Cost Management</a>.
{{< /callout >}}

## Overview

[Cloud Cost Recommendations][1] provide recommendations on reducing your cloud spending by optimizing the usage of your cloud resources.

{{< img src="cloud_cost/recommendations/cost_recommendations_1.png" alt="Overview tab with potential monthly savings, potential annual savings, and total number of open cases on the Cloud Cost Recommendations page" style="width:100%;" >}}

Recommendations combine billing data and observability data to identify orphaned, legacy, or over-provisioned cloud resources.

## Setup

For each AWS account that you would like to receive recommendations for:

1. Configure [Cloud Cost Management][2] to send bill data to Datadog.
1. Enable [resource collection][3] in the **Resource Collection** tab on the [AWS integration tile][4].
1. Install the [Datadog Agent][5] (required for over-provisioned resource recommendations).

## Recommendation types

Datadog generates a set of recommendations by combining your observability data with your underlying cloud provider's billing data. You can see the detailed logic for each recommendation type, along with observability metrics or cost data used to generate the recommendation, [on the **Recommendations** page][1].

{{< img src="cloud_cost/recommendations/overprovisioned_k8s_containers_sidepanel_1.png" alt="A side panel displaying a Kubernetes container that is over-provisioned in the ad-auction service with recommended next steps to change its usage as well as investigation metrics." style="width:100%;" >}}

Recommendations are run on a daily basis, and are automatically refreshed in your account. When new recommendations are released, Datadog automatically adds them to your account.

### Unused resource recommendations

Datadog identifies resources that are running on legacy hardware or are not utilized efficiently in your cloud environment. You can consider upgrading or removing these resources to reduce your costs and improve the performance of your resources.

Unused EC2 Instances
: EC2 instances with less than 5% CPU utilization, and less than 10% memory utilization.

Unattached EBS Volumes
: Volumes that have been detached from an EC2 instance.

Unused EBS Volumes
: Volumes attached to a non-running EC2 instance.

Unused RDS Instances
: RDS instances with 0 database connections and 0 replica lag.

Abandoned S3 Multipart Uploads
: Incomplete multipart uploads (requires [Storage Lens metrics][6]).

Unused Redshift Cluster
: Redshift cluster with 0 database connections.

Unused Elasticache Redis Cluster
: Elasticache Redis Cluster with 0 cache hits and 0 replication bytes.

Unused MQ Broker
: An MQ broker with 0 connections.

Old ECR Images
: ECR Image bytes are older than 180 days.

OpenSearch Cluster
: An OpenSearch cluster with 0 connections.

Unused Classic Elastic Load Balancers
: Classic Elastic Load Balancer with no active connections that is not attached to an EC2 instance.

Unused Network Elastic Load Balancer
: A network load balancer with 0 processed bytes.

Unused Application Load Balancer
: An application load balancer with no traffic being processed.

Unused NAT Gateway
: A NAT Gateway that has no bytes sent out.

Idle Elastic IP Address
: Elastic IP addresses with idle charges in your AWS cost and usage report.

Unused DynamoDB Recommendations
: A DynamoDB table has 0 consumed reads and 0 consumed non-replica writes.

Unused DynamoDB Global Secondary Index
: A DynamoDB table's Global Secondary Index (GSI) has 0 consumed reads.

ASGs with legacy instance types
: An autoscaling group that includes legacy instance types.

DynamoDB Delete Extra On-Demand Backups
: A DynamoDB table has charges for more than 2 on-demand backups.

### Previous generation resource recommendations

Datadog surfaces resources that are running on legacy hardware, which you can consider upgrading to reduce your costs and improve the performance of your resources.

Legacy EC2 Instance
: EC2 Instances that are previous generation, and can be upgraded to a newer instance type.

GP2 EBS Volumes
: EBS volumes that are GP2 and can be upgraded to GP3 for cost reduction and performance improvement.

I01 EBS Volumes
: EBS volumes that are I01 and can be upgraded to GP3 for cost reduction and performance improvement.

Extended Support for RDS
: An RDS running an engine version that is no longer supported and incurring [extended support charges][7].

### Over-provisioned resource recommendations

Datadog identifies individual resources that are under-utilized or over-provisioned, which you can consider adjusting the size and configuration to reduce your costs and improve the performance of your resources.

Over-provisioned EC2 instances
: EC2 instances not in an auto-scaling group, with less than 50% CPU and memory utilization.

Over-provisioned Kubernetes Containers
: Containers with less than 30% CPU and memory utilization.

Over-provisioned EBS Volume IOPS
: EBS Volumes where the amount of IOPS exceeds what is being used.

Over-provisioned RDS IOPS
: An RDS instance using less than 80% of the provisioned IOPS for reads and writes.

Over-provisioned EBS IOPS
: An EBS volume using less than 80% of the provisioned IOPS for reads and writes.

Over-provisioned EBS Storage
: An EBS volume with less than 20% of its storage capacity used.

Over-provisioned EBS Throughput
: An EBS volume using less than 80% of the provisioned throughput for reads and writes.

Over-provisioned DynamoDB Capacity
: A provisioned DynamoDB table using less than 80% of its read and write capacity more than 80% of the time.

### Rate optimization recommendations

Datadog identifies resources that are charged at on-demand rates or could benefit from rate optimization. You can consider modifying these resources to reduce your costs. 

Purchase RDS RI
: An RDS instance older than 45 days is still charged with on-demand rates.

Purchase ElastiCache RI
: An ElastiCache node older than 45 days is still charged with on-demand rates.

Purchase OpenSearch RI
: An OpenSearch instance older than 45 days is still charged with on-demand rates.

Purchase Redshift RI
: An Redshift cluster older than 45 days is still charged with on-demand rates.

S3 Intelligent Tiering
: A bucket's costs are almost entirely in per-GB standard storage, but GET requests indicate few objects are accessed.

S3 Current Version Expiration Lifecycle Rule
: A standard S3 bucket without a current version expiration lifecycle and that does not serve a website contains current version storage bytes older than 30 days.

S3 Non-current Version Expiration Lifecycle Rule
: A standard S3 bucket without a non-current version expiration lifecycle and that does not serve a website contains non-current version storage bytes older than 30 days.

Migrate DynamoDB to On-Demand Capacity Mode
: A provisioned DynamoDB table has an hourly read and write capacity consumption below 18% at least once in the last two weeks.

Migrate DynamoDB to Provisioned Capacity Mode
: An on-demand DynamoDB table has an hourly read and write capacity consumption that is always greater than 18%.

Migrate DynamoDB to Standard Table Class
: Migrating to the Standard table class offers potential savings from capacity rates compared to the additional costs from storage rates, or it uses the Standard table class' free tier for storage.

Migrate DynamoDB to Infrequent Access Table Class
: Migrating to the Infrequent Access (IA) table class offers more potential savings from storage rates compared to the additional costs from capacity rates.

### Architecture recommendations

Datadog identifies individual resources related to NAT gateways, which you can consider optimizing to reduce unnecessary charges.

NAT Gateway within VPC transfer charges
: Resources in the same VPC should avoid communicating with each other through a NAT gateway because that incurs unnecessary NAT gateway processing charges.

NAT Gateway cross-zone transfer charges
: Resources that need a NAT gateway should use one that is in the same availability zone, or they can incur unnecessary cross-zone transfer charges.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/recommendations
[2]: /cloud_cost_management/aws/#setup
[3]: /integrations/amazon_web_services/#resource-collection
[4]: https://app.datadoghq.com/integrations/aws
[5]: /agent/
[6]: /integrations/amazon_s3_storage_lens/
[7]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support-charges.html
