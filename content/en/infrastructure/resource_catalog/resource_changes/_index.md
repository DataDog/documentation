---
title: Resource Changes
further_reading:
- link: "/infrastructure/resource_catalog/"
  tag: "Documentation"
  text: "Datadog Resource Catalog Overview"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Resource Changes is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/recent-changes-tab/" >}}
Resource Changes is in Preview. Click <strong>Request Access</strong> and complete the form to request access.
{{< /callout >}} 

## Overview

Resource Changes provides visibility and control over configuration changes to your cloud infrastructure. It helps you monitor modifications to resources, aiding in troubleshooting incidents and understanding the evolution of your environment.

{{< img src="/infrastructure/resource_catalog/resource-changes.png" alt="Datadog Resource Changes interface showing a list of infrastructure configuration changes. The table shows multiple resources with timestamps, change types, and details of the modifications. Filters are available at the top for cloud, region, environment, and other attributes." width="100%">}}

Resource Changes supports a variety of resources, including:
- Hosts
- Containers
- Serverless Functions
- Databases
- Queues
- Storage
- Networking
- Monitoring
- Identity
- Data Processing

For a comprehensive list of supported resources, see the [Supported resources](#supported-resources) section.

## Setup

To view configuration changes for your resources, ensure that resource collection is enabled for your cloud resources so they are visible within the Resource Catalog. You can manage this setting from the [Resource Catalog settings page][2] or the relevant [cloud provider integration tile][3]. This step automatically enables [Snapshot Changes](#snapshot-changes) for your resources.

### Snapshot Changes

Snapshot Changes represent configuration and relationship updates that Datadog detects by comparing snapshots of your cloud resources, taken approximately every 5-15 minutes.

To view Snapshot Changes, toggle **Snapshot Changes** on [**Infrastructure > Resources > Resource Changes**][8].

Key characteristics of Snapshot Changes:
- **No Additional Setup**: Requires no extra configuration beyond enabling resource collection.
- **Reflects Net Changes**: Since changes come from snapshots (5-15 minutes apart), they show the net difference, omitting intermediate states.
- **Retention**: Datadog Snapshot Changes are retained for one week.
- **Cost**: Generating Snapshot Changes does not incur additional event charges.

## Navigating and viewing Resource Changes

You can access Resource Changes in the Datadog platform in the following ways:

-  **Main Navigation**: Go to [**Infrastructure > Resources > Resource Changes**][8].
-  **Within a Resource's Side Panel**:
    1. Open the side panel for a specific resource (for example, by clicking on a host in the Resource Catalog or a related host view).
    2. Scroll down to the **Recent Changes** section.

## Querying Resource Changes

The Resource Changes view allows you to search and filter changes using various attributes.

| Query Parameter         | Description                                                                 | Example                                                                          |
| :---------------------- | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| Change Type             | Filter by the type of change (Update, Create, Delete).                      | `latest_change_type:Update`                                                      |
| Resource Category       | Query across cloud providers for a general category of resource.            | `resource_category:hosts` (shows EC2, Azure VMs, GCP Compute instances, etc.)   |
| Resource Type           | Query for specific resource types.                                          | `resource_type:aws_ec2_instance`                                                 |
| First-Class Attributes  | Filter by attributes like Cloud Provider, Region, Environment, Account, etc. | `cloud_provider:aws region:us-east-1 env:staging account_id:123456789012`     |
| Resource Name           | Search for resources by their display name.                                 | `display_name:*bucket*`                                                          |
| Tags                    | Filter resources based on assigned tags.                                    | `tags:"application:frontend" "owner:team-alpha"`                                   |

### Supported search query types

- **Wildcard**: Use asterisks `*` for partial matching (before and after the term). Example: `service:*example*`
- **Union (OR)**: Use `OR` for multiple values (not available for resource types or categories). Example: `service:(service_a OR service_b)`
- **Exclusion (Empty/Not Empty)**: Use `-` prefix to exclude. Example: `-service:*` (shows resources where the service tag is not set).

## Troubleshooting with Resource Changes

During an incident, the most critical question is often "What changed?". Resource Changes helps you answer this.

When a monitor alerts, you are linked directly to the **Resource Changes** page. This page is pre-filtered with important context from the alert, such as the relevant time frame and any associated tags (like `service`, `env`, or `team`).

Use this centralized page to:

- **Identify risky changes**: Scan the list of modifications that occurred during the incident window for the impacted service, environment, and related shared infrastructure.
- **Investigate the details**: Select any suspicious change to view a side-by-side configuration diff and related logs (such as AWS CloudTrail) that help identify who made the change and why.

## Supported resources

Resource Changes supports a wide array of resources across [AWS](#aws-resources), [Azure](#azure-resources), and [Google Cloud Platform](#gcp-resources).

{{% collapse-content title="AWS" level="h4" expanded=false id="aws-resources" %}}

AWS resource types:

- `ec2 instance`
- `docdb cluster`
- `dynamodb table`
- `ebs volume`
- `eks cluster`
- `elasticache cluster`
- `elb load balancer`
- `elbv2 load balancer`
- `iam account settings`
- `iam policy`
- `iam role`
- `iam user`
- `lambda function`
- `mq broker`
- `rds instance`
- `redshift cluster`
- `s3 bucket`
- `sqs queue`
- `acm certificate`
- `ami image`
- `cloudfront distribution`
- `cloudtrail trail`
- `ebs snapshot`
- `elasticsearch domain`
- `iam server certificate`
- `kms key`
- `network acl`
- `rds db snapshot`
- `s3 account public access block`
- `security group`
- `sns topic`
- `vpc endpoint`
- `eni`
- `vpc nat gateway`
- `vpc`
{{% /collapse-content %}}

{{% collapse-content title="Azure" level="h4" expanded=false id="azure-resources" %}}

Azure resource types:
- `virtual machine instance`
- `aks cluster`
- `app service plan` / `app service`
- `function app`
- `managed disk`
- `mysql server`
- `policy assignment`
- `postgresql server`
- `sql server`
- `sql server database`
- `storage account`
- `storage blob container`
- `activity log alert`
- `automation account`
- `container apps`
- `container registry`
- `diagnostic setting`
- `key vault key`
- `key vault secret`
- `key vault`
- `load balancer probe`
- `log analytics storage insight`
- `log analytics workspace`
- `network interface`
- `network public ip address`
- `network subnet`
- `network vnet peering`
- `network vnet`
- `network watcher`
- `postgresql firewall rule`
- `role assignment`
- `role definition`
- `security center auto provisioning`
- `security contact`
- `security group`
- `sql firewall rule`
- `subscription`
{{% /collapse-content %}}

{{% collapse-content title="Google Cloud Platform" level="h4" expanded=false id="gcp-resources" %}}

Google Cloud Platform resource types:

- `bigquery table`
- `cloudfunctions function`
- `compute disk`
- `sql database instance`
- `storage bucket`
- `compute instance`
- `bigquery dataset`
- `compute external vpn gateway`
- `compute firewall`
- `compute network`
- `compute project metadata`
- `compute route`
- `compute router`
- `compute ssl policy`
- `compute subnetwork`
- `compute target http proxy`
- `compute target https proxy`
- `compute target ssl proxy`
- `compute target vpn gateway`
- `compute vpn gateway`
- `compute vpn tunnel`
- `dataproc cluster`
- `dns managed zone`
- `dns policy`
- `folder`
- `iam policy`
- `iam service account key`
- `iam service account`
- `kms crypto key`
- `logging log bucket`
- `logging log metric`
- `logging log sink`
- `monitoring alert policy`
- `organization`
- `project`
{{% /collapse-content %}}

If you have a request for an additional resource type, contact [Datadog Support][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/infrastructure/catalog
[2]: https://app.datadoghq.com/infrastructure/catalog/configuration
[3]: https://app.datadoghq.com/integrations
[7]: /help/
[8]: https://app.datadoghq.com/infrastructure/catalog/changes
