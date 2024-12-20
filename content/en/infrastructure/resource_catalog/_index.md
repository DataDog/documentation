---
title: Datadog Resource Catalog
is_beta: true
aliases:
  - /security_platform/cspm/resource_catalog
  - /security/cspm/resource_catalog
  - /security/misconfigurations/resource_catalog
further_reading:
- link: "/security/cloud_security_management/misconfigurations/"
  tag: "Documentation"
  text: "Cloud Security Management Misconfigurations"
- link: "/security/threats/"
  tag: "Documentation"
  text: "Cloud Security Management Threats"
- link: "https://www.datadoghq.com/blog/datadog-resource-catalog/"
  tag: "Blog"
  text: "Govern your infrastructure resources with the Datadog Resource Catalog"
- link: "https://www.datadoghq.com/blog/infrastructure-troubleshooting-recent-changes/"
  tag: "Blog"
  text: "Troubleshoot infrastructure issues faster with Recent Changes"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Resource Catalog is not available in this site.
</div>
{{< /site-region >}}

## Overview

Datadog Resource Catalog is the central hub of all your infrastructure resources. It can help you manage resource compliance, investigate root causes for incidents, and close observability gaps on your infrastructure. With the Resource Catalog, you can understand key resource information such as metadata, ownership, configurations, relationship between assets, and active security risks for your resources.

Resource Catalog leverages Datadog cloud integrations and the Datadog Agent to gather data from cloud resources such as hosts, databases, and storage services.

{{< img src="/infrastructure/resource_catalog/resource-catalog-doc_2.png" alt="The Resource Catalog page showing the Inventory tab, sorting by service" width="100%">}}

### Use Cases

#### Governance and reporting
- Gain visibility into the compliance of your infrastructure with regards to ownership, versioning, migrations, and so on.
- Facilitate good tagging practices to optimize cross-telemetry insights.
- Reduce application risks by identifying and fixing security vulnerabilities in the dependencies of your services.
- Provide engineering leadership with a high-level view of security practices across teams and cloud accounts.
- Export resources for record-keeping or auditing.

#### Troubleshoot incidents and performance issues
- Access telemetry, dashboards and other Datadog views with rich insights to understand the health and performance of your resources.
- Locate team and service owners of relevant resources to speed up incident recovery.
- View resource configuration changes to identify probable root causes.

#### Optimize observability
- Spot resources that can be better monitored by Datadog and bridge observability gaps.
- Ensure proper security coverage by identifying resources that are most prone to misconfigurations or are not actively reporting security misconfigurations.

## Setup

By default, when you navigate to the Resource Catalog, you are able to see Datadog Agent monitored hosts, as well as cloud resources crawled for other Datadog products such as CNM (Cloud Network Monitoring), and DBM (Database Monitoring). To view additional cloud resources in the Resource Catalog, extend resource collection from the [Resource Catalog][5] setup page. To gain insights into your security risks, enable [Cloud Security Management][1] for each cloud account.

{{< img src="/infrastructure/resource_catalog/resource-catalog-doc-img-2.png" alt="The Resource Catalog configuration page for extending resource collection" width="100%">}}

**Note**: 
- Extending resource collection does _not_ incur additional costs. The Resource Catalog is a free product for Infrastructure Monitoring customers.
- Enabling Cloud Security Management automatically enables resource collection for the Resource Catalog Inventory tab. Enabling resource collection for the Resource Catalog does _not_ enable the CSM product.

## Browse the Resource Catalog

On the [Resource Catalog page][2], explore the cloud resources in your Datadog organization. The catalog detects a resource either because it has an Agent installed on it, or because a cloud integration is configured on it. Information about the resources in your organization are shown in the Inventory and Security tabs, with two views: List and Map.

**Inventory Tab**:
The Inventory tab shows context for a resource, including team ownership and related services. It helps you proactively identify and provide missing ownership information before you need it in an incident. The Resource Catalog also shows resource attributes customized for each resource type. You can search resources by specific attributes such as the instance type for a host, or the version for a database.

**Security Tab**:
The Security tab provides a security-centric view of your infrastructure and allows you to understand how your resources are impacted by security risks. 

- [**Misconfigurations**][10]: Tracks the security hygiene and compliance posture of your production environment, automates audit evidence collection, and enables you to remediate misconfigurations that leave your organization vulnerable to attacks.

- [**Signals**][11]: Monitors file, network, and process activity across your environment to detect real-time threats to your infrastructure.

- [**Identity Risks**][12]: Provides in-depth visibility into your organization's AWS IAM risks and enables you to detect and resolve identity risks on an ongoing basis.

- [**Vulnerabilities**][13]: Leverages infrastructure observability to detect, prioritize, and manage vulnerabilities in your organization's containers and hosts.

By viewing misconfigurations, signals, identity risks, and vulnerabilities associated with resources, you can address security concerns without needing to spend time and effort to gather additional security context.

{{< img src="/infrastructure/resource_catalog/resource-catalog_security_tab.png" alt="The Resource Catalog page showing the Security tab, grouped by resource type" width="100%">}}

### List view

Under the Security tab, you can filter, sort, and group resources in the Resource Catalog list by cloud platform, resource type, account, team, region, tags, and security risks to scope down to the resources that matter to your current context. For example, you may find it helpful to filter by your team name, or to scope the misconfigurations to particular environments and clusters. 

To filter the list to see a subset of resources you're most interested in, select resource categories or types from the resource selector on the left, or use the query cards and individual facets at the top of your list view. To group by any default or resource specific attributes as well as tags, use the **Group by** dropdown on the top right of your list view. You can additionally sort by different columns or attributes by clicking on the column names. If you are looking for a particular resource, you can search for the resource name directly in the search bar. 

{{< img src="/infrastructure/resource_catalog/resource-catalog_security_tab_list.png" alt="Resource Catalog Security tab sorting by the list view" >}}

**Note**: If you use [Datadog Teams][4], select the **Teams** toggle on the left panel, then select the toggle for the teams to which you're assigned to view only the resources assigned to those teams. In addition, you can export your Resource Catalog list as a CSV file from the top right corner of the list.

To access the relevant cloud console for any resource in your list, click on a resource to open a side panel. Then, click the **Open Resource** dropdown in the top right corner to be redirected.

{{< img src="/infrastructure/resource_catalog/resource_catalog_sidepanel.png" alt="Resource Catalog side panel highlighting the Open Resource drop down" >}}

### Map view

The Resource Catalog map provides a visualization of the resources in your organization. To find a particular resource, search by its name. You may find it helpful to group resources by region, and to apply filters such as cloud provider and resource type, to see only matching resources. You can also use the **Fill by** selector to fill the map elements by Misconfigurations or Signals.

{{< img src="/infrastructure/resource_catalog/resource_catalog_map_view.png" alt="Resource Catalog map view filled by misconfigurations, grouped by resource type" width="100%">}}

## Investigate a host or resource

<div class="alert alert-info">No secrets are displayed in this panel. Any displayed "secrets" are randomly generated strings that do not pose a security risk.</div>

Clicking on a host opens a side panel with details including:

- **Host information** such as the name, account, OS, instance type, tags, and metadata associated with the resource
- **Telemetry** including metrics, logs, traces, processes, and so on
- **Active monitor alerts** and enabled monitors status on the host
- **Agent configuration** information

{{< img src="/infrastructure/resource_catalog/resource-catalog-doc-img-6.png" alt="Resource Catalog with the host side panel open" width="100%">}}

Clicking on any resource opens a side panel with details including:

- **Resource information** such as the resource type, name, account, and tags associated with the resource.
- **Resource definition** in JSON showing the full configuration of the asset.
- **Recent Changes** showing a 7-day history of changes to the resource
- **Relationship** view showing interdependencies between resources
- **Service and team ownership** of the resource
- **Security risks** that the resource is exposed to, including misconfigurations, signals, identity risks, and vulnerabilities

## Recent changes

{{< callout url="https://www.datadoghq.com/product-preview/recent-changes-tab/" >}}
  The <strong>Recent Changes</strong> tab is in Preview, but you can easily request access! Use this form to submit your request today.
{{< /callout >}} 

Use the **Recent Changes** tab on a resource's side panel to see a 7-day history of changes to the resource and its configuration. To forward change events from your cloud environments, follow the links for your cloud providers in the sections below.

**Prerequisites**: 
   - You have selected to `Enable Resource Collection` under the **Resource Collection** tab on the [cloud provider integration tile][7]. 
   - You have [access to the Preview][9].

#### AWS

See the [AWS Config integration page][6] to launch a CloudFormation template that sets up change event forwarding through AWS Config.

#### Azure

To collect resource configuration changes, enable **Resource Collection** for your Azure subscriptions in the [Azure integration tile][14].

#### Google Cloud Platform

See the [Resource change collection][8] section of the Google Cloud Platform integration page for instructions on forwarding change events through a Pub/Sub topic and subscription.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup
[2]: https://app.datadoghq.com/infrastructure/catalog
[3]: /integrations/#cat-notification
[4]: /account_management/teams
[5]: https://app.datadoghq.com/infrastructure/catalog/configuration
[6]: /integrations/amazon_config/#resource-change-collection
[7]: https://app.datadoghq.com/integrations
[8]: /integrations/google_cloud_platform/#resource-change-collection
[9]: https://www.datadoghq.com/product-preview/recent-changes-tab/
[10]: https://docs.datadoghq.com/security/cloud_security_management/misconfigurations/
[11]: https://docs.datadoghq.com/security/threats/
[12]: https://docs.datadoghq.com/security/cloud_security_management/identity_risks/
[13]: https://docs.datadoghq.com/security/cloud_security_management/vulnerabilities/
[14]: https://app.datadoghq.com/integrations/azure
