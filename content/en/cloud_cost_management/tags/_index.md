---
title: Tags
description: Learn how tags are sourced, enriched, and managed in Cloud Cost Management.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/cloud_cost_management/tags/tag_pipelines"
  tag: "Documentation"
  text: "Tag Pipelines"
- link: "/cloud_cost_management/tags/tag_explorer"
  tag: "Documentation"
  text: "Tag Explorer"
- link: "/getting_started/tagging/"
  tag: "Documentation"
  text: "Getting Started with Tags"
---

## Overview

Tags help you investigate and understand your cloud and SaaS costs across any dimensions. Tags consist of tag keys and values (for example: in `aws_product:ec2`, the tag key is `aws_product`, and the value is `ec2`.)

Cloud Cost Management automatically enriches your cost data with tags from multiple sources, to help you achieve higher cost allocation and get deeper insight into who owns infrastructure costs in your ever changing cloud environments. Using tags, you can allocate shared costs fairly, create accurate reports, and track costs by team, service, or environment. 

## Where tags come from

Across all cloud and SaaS providers, Datadog collects tags from the following sources (including enriching cost data with data from other Datadog products) and adds them to your cost data:

| Source | What tags are collected | Description |
|---|---|---|
| All Providers | Bill columns | Such as AWS Cost and Usage Report (CUR) columns, Google Billing Export columns, etc |
| Datadog Enrichment | Host Agent | Tags added to host metadata by the Datadog agent running on the host |
| Datadog Enrichment | Software Catalog | Tags associated with this service in the APM Service Catalog |
| Datadog Enrichment | Integration Tiles | Tags added to the Datadog integration tile for a specific cloud account. Integration tile tags apply to all costs in that account. Requires enabling the provider integration for each account |
<<<<<<< HEAD
| Datadog Enrichment | Data Observability | Tags from the Datadog Data Observability product, powering BigQuery cost allocation. Requires enabling BigQuery monitoring |
| Datadog Enrichment | Cloud Network Monitoring | Source and destination dimensions from the [Datadog Cloud Network][12] product. Requires enabling Cloud Network in the Datadog agent. See [data transfer cost allocation][13] for more details |
=======
| Datadog Enrichment | Data Observability | Tags from the Datadog’s Data Observability product, powering BigQuery cost allocation. Requires enabling BigQuery monitoring |
| Datadog Enrichment | Cloud Network Monitoring | Source and destination dimensions from the Datadog Cloud Network product. Requires enabling Cloud Network in the Datadog agent |
>>>>>>> 30e05c6471ac26d86998fc56bab3398d012956a6
| Kubernetes Enrichment | Kubernetes Node | User-defined tags found on Kubernetes nodes monitored with Datadog | 
| Kubernetes Enrichment | Kubernetes Pod | User-defined tags found on Kubernetes pods monitored with Datadog | 
| Kubernetes Enrichment | Kubernetes Persistent Volume | User-defined tags found on Persistent Volumes in Kubernetes clusters monitored with Datadog |
| Kubernetes Enrichment | Kubernetes Persistent Volume Claim | User-defined tags found on Persistent Volume Claims in Kubernetes clusters monitored with Datadog | 
| Cloud Cost Management | Cloud Cost Aliases | Some aliases are tags derived from provider cost data, used to simplify the cost data model, such as `aws_product`, which is an alias of `lineItem/ProductCode`. Additional tags that exist on both cost data and integration metrics are added, allowing cost data and usage data to be combined in Custom Allocation Rules, dashboards, and notebooks |
| Cloud Cost Management | Cloud Cost Allocation | Tags created during [cost allocation][11] that specify the split of shared resources, such as `allocated_spend_type` |
| Cloud Cost Management | FOCUS | Provider-agnostic tags compliant with [FOCUS][8], the unifying format for cloud billing data |
| Tag Pipelines | Rules defined by user | Tags created by applying your Tag Pipelines to cost data |
| Custom Allocation Rules | Rules defined by user | Tags created by applying your Custom Allocation Rules to cost data (do not apply to SaaS costs) |

Datadog also adds provider specific tags:

| Provider | What tags are collected | Description |
|---|---|---|
| AWS | Cost Allocation Tags | Any tag defined by the user in [AWS Cost Allocation][1] tags that show up in the AWS CUR |
| AWS | AWS Resource Groups Tagging API | User-defined tags on a cloud resource in AWS, pulled by Cloud Cost Management using the [Groups Tagging API][10] |
| AWS | AWS Organizational Units | User-defined tags on an AWS organizational units using [AWS Organizations][7] |
| AWS | AWS Organizations - Accounts | User-defined tags on an AWS account using [AWS Organizations][7] |
| Amazon ECS | Amazon ECS Task | User-defined tags on an ECS task definition |
| Amazon ECS | Amazon ECS Container | User-defined tags on a container running in an ECS task |
| Azure | Azure Cost Export - User Resource Tags | User-defined tags on a cloud resource in Azure, found in the Tags column in the Azure cost export. Does not include Resource Group tags |
| Azure | Azure Cost Export - System Resource Tags | Azure-defined tags on a cloud resource, found in the AdditionalInfo column in the Azure cost export |
| Google Cloud | Google Billing Export - Project Labels| User-defined labels on a project in Google Cloud, found in the project.labels column in the billing export |
| Google Cloud | Google Billing Export - System Resource Labels | System-generated labels on a resource in Google Cloud, found in the system_labels column in the billing export |
| Google Cloud | Google Billing Export - User Resource Labels | User-defined labels on a cloud resource in Google Cloud, found in the labels column in the billing export |
| Google Cloud | Google Billing Export - User Resource Tags | User-defined tags on a cloud resource in Google Cloud, found in the tags column in the billing export. The `goog-originating-sku-description` tag is added leveraging Google's SKU APIs, to provide more granular SKU details for commitment line items. |
| Google Cloud | GKE Pod | User-defined labels found on pods running in Google Kubernetes Engine | 
| Oracle Cloud | OCI Cost Export - User Resource Tags | User-defined tags on a cloud resource in Oracle Cloud Infrastructure, from the Tags column in the OCI FOCUS cost export |
| Datadog | Datadog Usage Attribution | User-defined tags for Usage Attribution in Datadog Plan and Usage |
| Custom Costs | Cost File Tags | User-defined tags for every provider, found on [cost files][9] uploaded to Cloud Cost Management |

## How tags are normalized

Tag keys and/or values may look slightly different in Cloud Cost Management compared to the providers or other parts of Datadog because of tag normalization. 

Cloud Cost Management normalizes tag **keys** largely the same as Datadog Metrics:
- Drop leading characters that are not letters
- Lower-case all characters
- Replace special characters and spaces with single underscore
- Remove any trailing underscore
- Reduce contiguous underscores to a single underscore
- Tag keys up to 5000 characters are supported, and any characters up until a letter are dropped so that tag keys start with letters (differs from Datadog Metrics)

Cloud Cost Management normalizes tag **values** as well, while maintaining human readable tag values for cost reporting. For example, `aws_instance_family:Machine Learning ASIC Instances` remains readable rather than being converted to something like `machine_learning_asic_instances`. The normalization follows this logic:
- Convert any consecutive whitespace to a single space
- Keep all letters, marks, numbers, punctuation, and symbols
- Replace any other characters with an underscore `_`
- Tag values up to 5000 characters are supported

## How tags are prioritized

It's possible for a cost data row to have multiple values for the same tag key, if tag values from 2+ sources are combined, and one is not prioritized over the other.

<<<<<<< HEAD
To resolve conflicts and mitigate this, Cloud Cost Management replaces existing tags instead of adding duplicates using the most specific source for each tag key. For example, a Kubernetes Pod tag `team:shopist` would take precedence and replace an Kubernetes node tag `team:compute`.
=======
To resolve conflicts and mitigate this, Cloud Cost Management replaces existing tags instead of adding duplicates using the most specific source for each tag key. For example, a Kubernetes Pod tag `team:shopist` would take precedence and replace a Kubernetes node tag `team:compute`.
>>>>>>> 30e05c6471ac26d86998fc56bab3398d012956a6

Sources higher in this list replace tag values from sources lower in this list, if there are conflicts:
- Custom Allocation Rules
- FOCUS
- Service Catalog
- Amazon ECS Container
- Amazon ECS Task
- Kubernetes Pod
- Kubernetes Persistent Volume
- Kubernetes Node 
- Host Agent

Other tag sources (such as AWS Organization tags, integration tile tags, and such) can be overridden by these sources. Bill columns and FOCUS columns are reserved and cannot be overridden. Tag Pipelines add new tags but do not override existing tags.

## Improving tagging

1. **Understand what tags exist** - Use [Tag Explorer][5] to discover which tags are already available in your cost data.
2. **Identify gaps in cost allocation** - In Explorer, group by any tag to see how many dollars are allocated to that tag, or are unallocated (which show up as `N/A`). Make sure to have "Container Allocated" enabled so that you are looking at cost allocation including tags on pods.
3. **Split up shared costs** - Use [Custom Allocation Rules][6] to split and assign shared costs back to teams, services, or more. You can use observability data to split costs accurately based on infrastructure usage.
4. **Address missing or incorrect tags** - Use [Tag Pipelines][4] to alias tags, or create a new tag, for incorrect tagging. For example, if your organization wants to use the standard `application` tag key, but teams use variations (like app, webapp, or apps), you can clean up those tags to become `application` for more accurate cost reporting.
5. **Add new tags** - Use [Tag Pipelines][4] to automatically create new inferred tags that align with specific business logic, such as a `business-unit` tag based on team structure.

{{< img src="cloud_cost/tag_explorer/aws_1.png" alt="Tag Explorer interface showing available AWS tags and their usage" style="width:80%;" >}}
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html
[2]: /cloud_cost_management/container_cost_allocation
[3]: /cloud_cost_management/setup/aws/#aws-resource-tags
[4]: /cloud_cost_management/tags/tag_pipelines
[5]: /cloud_cost_management/tags/tag_explorer
[6]: /cloud_cost_management/custom_allocation_rules
[7]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
[8]: https://focus.finops.org/
[9]: /cloud_cost_management/setup/custom?tab=csv
[10]: https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/overview.html
[11]: /cloud_cost_management/cost_allocation/container_cost_allocation/?tab=aws#understanding-spend
[12]: /network_monitoring/
[13]: /cloud_cost_management/cost_allocation/container_cost_allocation/?tab=aws#data-transfer