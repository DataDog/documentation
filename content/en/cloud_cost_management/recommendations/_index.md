---
title: Cloud Cost Recommendations
private: true
description: Learn how to reduce the spending of your organization's cloud resources with Cost Recommendations.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for this site.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Cloud Cost Recommendations is in public beta with support for AWS, and is automatically enabled if you have set up <a href="/cloud_cost_management/">Cloud Cost Management</a>.
{{< /callout >}}

## Overview

[Cloud Cost Recommendations][1] provide recommendations on reducing your cloud spending by optimizing the usage of your cloud resources.

{{< img src="cloud_cost/recommendations/cost_recommendations.png" alt="Overview tab with potential monthly savings, potential annual savings, and total number of open cases on the Cloud Cost Recommendations page" style="width:100%;" >}}

Recommendations combine billing data and observability data to identify orphaned, legacy, or over-provisioned cloud resources.

## Setup

For each AWS account that you would like to receive recommendations for:

1. Configure [Cloud Cost Management][2] to send bill data to Datadog.
1. Enable [resource collection][3] in the **Resource Collection** tab on the [AWS integration tile][4].
1. Install the [Datadog Agent][5] (required for over-provisioned resource recommendations).

## Recommendation types

Datadog generates a set of recommendations by combining your observability data with your underlying cloud provider's billing data. You can see the detailed logic for each recommendation type, along with observability metrics or cost data used to generate the recommendation, [on the **Recommendations** page][1].

{{< img src="cloud_cost/recommendations/overprovisioned_k8s_containers_sidepanel.png" alt="A side panel displaying a Kubernetes container that is over-provisioned in the ad-auction service with recommended next steps to change its usage as well as investigation metrics." style="width:100%;" >}}

Recommendations are run on a daily basis, and are automatically refreshed in your account. When new recommendations are released, Datadog automatically adds them to your account.

### Terminate resource recommendations

Datadog scans your cloud environment to identify and surface orphaned resources that can be removed.

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

### Migrate resource recommendations

Datadog surfaces resources that are running on legacy hardware, which you can consider upgrading to reduce your costs and improve the performance of your resources.

Legacy EC2 Instance
: EC2 Instances that are previous generation, and can be upgraded to a newer instance type.

GP2 EBS Volumes
: EBS volumes that are GP2 and can be upgraded to GP3 for cost reduction and performance improvement.

I01 EBS Volumes
: EBS volumes that are I01 and can be upgraded to GP3 for cost reduction and performance improvement.

### Rightsize resource recommendations

Datadog identifies individual resources that are under-utilized or over-provisioned, which you can consider adjusting the size and configuration to reduce your costs and improve the performance of your resources.

Downsize EC2 instances
: EC2 instances not in an auto-scaling group, with less than 50% CPU and memory utilization.


Overprovisioned Kubernetes Containers
: Containers with less than 30% CPU and memory utilization.


Overprovisioned EBS Volume Throughput
: EBS Volumes where the amount of throughput exceeds what is being used.


Overprovisioned EBS Volume IOPS
: EBS Volumes where the amount of IOPS exceeds what is being used.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/recommendations
[2]: /cloud_cost_management/aws/#setup
[3]: /integrations/amazon_web_services/#resource-collection
[4]: https://app.datadoghq.com/integrations/aws
[5]: /agent/
[6]: /integrations/amazon_s3_storage_lens/
