---
title: Datadog Resource Catalog
kind: documentation
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
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Resource Catalog is not available in this site.
</div>
{{< /site-region >}}

<div class="alert alert-info">Resource Catalog is in beta.</div>

## Overview

Datadog Resource Catalog provides a high-level overview of the hosts and resources in your cloud and hybrid environments. View information such as tags, configuration details, relationships between assets, misconfigurations, and threats. See what team is responsible for each resource, and what security misconfigurations have been reported. Access dashboards and Datadog views that receive and monitor telemetry and security data for each resource.

Resource Catalog leverages Datadog cloud integrations and the Datadog Agent to gather data from cloud resources such as databases, storage services, and hosts.

{{< img src="/infrastructure/resource_catalog/resource_catalog_2.png" alt="The Resource Catalog page showing the Inventory tab, sorting by service" width="100%">}}

## Setup

By default, when you navigate to the Resource Catalog, you are able to see Datadog Agent monitored hosts, as well as cloud resources crawled for other Datadog products such as NPM (Network Performance Monitoring), and DBM (Database Monitoring). To view additional cloud resources in the Resource Catalog, enable resource collection from the [Resource Catalog][5] setup page. To gain insights into your security risks, enable [Cloud Security Management][1] for each cloud account.

**Note**: Enabling Cloud Security Management automatically enables resource collection for the Resource Catalog Inventory tab.
Enabling resource collection for the Resource Catalog does _not_ enable the CSM product.

The Resource Catalog is useful for:

- Training new site reliability and security engineers by providing a clear view of all resources, their relationships, and their security posture, along with information about teams responsible for them and services running on them.
- Speeding incident recovery by increasing confidence and simplifying locating owners of upstream and downstream resources.
- Ensuring proper security coverage by identifying resources that are most prone to misconfigurations or are not actively reporting security misconfigurations.
- Facilitating the practice of good tagging to optimize cross-telemetry insights.
- Providing engineering leadership with a high-level view of security practices across teams and cloud accounts.

## Browse the Resource Catalog

On the [Resource Catalog page][2], explore the cloud resources in your Datadog organization. The catalog detects a resource either because it has an Agent installed on it, or because a cloud integration is configured on it. Information about the resources in your organization is shown in the ownership and security tabs, with two views: List and Map.

**Inventory Tab**:
The Inventory tab shows context for a resource, including team ownership and related services. It helps you proactively identify and provide missing ownership information before you need it in an incident. The Resource Catalog shows configuration information customized for each resource type. You can search resources by specific configuration attributes such as `instance_type` for a host, or a `version` for a database.

**Security Tab**:
The security tab allows you to gain a clear understanding of resources with security risk. By viewing misconfigurations and threats associated with resources, you can address the issue without needing to spend time and effort to gather security context. 

### List view

You can sort resources in the Resource Catalog list by cloud platform, resource type, account, team, region, misconfigurations, and threats. Sort by **Threats** to spot workloads impacted over the past four hours. Sort by **Misconfigurations** to identify cloud resources most prone to misconfigurations. In addition, you can export your Resource Catalog list as a CSV file from the top right corner of the list.

To find a particular resource, search by its name. To filter the list to see a subset of resources you're most interested in, select facets on the left panel. For example, you may find it helpful to filter by your team name, or to scope the misconfigurations to particular environments and clusters. To access the relevant cloud console, select the cloud console icon for the desired resource. 

If you use [Datadog Teams][4], select the **Teams** toggle on the left panel, then select the toggle for the teams to which you're assigned to view only resources assigned to those teams.

### Map view

The Resource Catalog map provides a visualization of the resources in your organization. To find a particular resource, search by its name. You may find it helpful to group resources by region, and to apply filters such as cloud provider and resource type, to see only matching resources. You can also use the `Fill by` selector to fill the map elements by Misconfigurations or Threats.

If you use [Datadog Teams][4], select the **Teams** toggle on the left panel, then select the toggle for the teams to which you're assigned to view only resources assigned to those teams.

#### Misconfigurations

Each color corresponds to the highest severity misconfiguration detected on the resource. Green indicates a resource is configured correctly. White is displayed for resources that are not monitored by Cloud Security Management Misconfigurations.

#### Threats

Threats reflect data from the past four hours and are only available for compute instances such as Amazon EC2 and Azure VM. White indicates there are no active threats detected. If a resource has several threat levels on it, the color used is the highest-severity threat detected on the resource.

## Investigate a resource

Clicking on a resource opens a side panel with details including:

- **Resource information** such as the resource type, name, account, and tags associated with the resource.
- **Security misconfigurations** including the security rules and latest status.
- **Real-time threat signals** detected on the asset by Cloud Security Management Threats.
- **Resource definition** in JSON showing the full configuration of the asset.
- An interactive asset relationship graph displaying the assets connected to the resource.

Click the **Share** button and select **Share event** to share a link to the current resource with your teammates through email, Slack, and more. See all of the [Datadog notification integrations][3] available for this feature.

### Recent changes

Use the **Recent Changes** tab on a resource's side panel to see a 7-day history of changes to the resource and its configuration. To forward change events from your cloud environments, follow the links or instructions for your cloud providers below:

**Note**: Contact [Datadog support][7] to enable change event forwarding from your Azure environment.

#### AWS

See the [AWS Config integration page][6] to launch a CloudFormation template that sets up change event forwarding through AWS Config.

#### Google Cloud Platform

See the [Resource change collection][8] section of the Google Cloud Platform integration page for instructions on forwarding change events through a Pub/Sub topic and subscription.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup
[2]: https://app.datadoghq.com/infrastructure/catalog
[3]: /integrations/#cat-notification
[4]: /account_management/teams
[5]: https://app.datadoghq.com/infrastructure/catalog/configuration
[6]: /integrations/amazon_config/#events
[7]: https://docs.datadoghq.com/help/
[8]: https://docs.datadoghq.com/infrastructure/resource_catalog/#recent-changes


