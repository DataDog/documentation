---
title: Datadog Resource Catalog
kind: documentation
is_beta: true
private: true
further_reading:
- link: "/security_platform/cspm/custom_rules/schema/"
  tag: "Documentation"
  text: "Cloud Resource Schema"
---

{{< beta-callout url="https://google.com" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
  Resource Catalog is currently in private beta. Fill out this form if you would like to access it.
{{< /beta-callout >}}

{{< img src="security_platform/cspm/resource_catalog/resource_catalog.png" alt="Resource Catalog map view displaying host and cloud resources grouped by category and region." style="width:100%;" >}}

## Overview

Datadog Resource Catalog provides a high-level overview of the hosts and resources in your cloud and hybrid environments. View information such as tags, configuration details, relationship between assets, misconfigurations, and threats. See what team is responsible for each resource, and what security findings have been found. Access dashboards and Datadog views that receive and monitor telemetry and security data for each resource.

The Resource Catalog leverages existing Datadog cloud integrations and the Datadog agent and includes cloud resources such as databases, storage services, and hosts.

**Note**: In order for cloud resources to appear in the Resource Catalog, you must first enable [Cloud Security Management][1] for each cloud account.

The Resource Catalog is useful for:

- Training new site reliability and security engineers by providing a clear view of all resources, their relationships, and their security posture, along with information about teams responsible for them and services running on them.
- Speeding incident recovery by increasing confidence and simplifying locating owners of upstream and downstream resources.
- Ensuring proper security coverage by identifying resources that are most prone to misconfigurations or are not actively reporting security findings.
- Facilitating the practice of good tagging to optimize cross-telemetry insights.
- Providing engineering leadership with a high-level view of security practices across teams and cloud accounts.

## Browse the Resource Catalog

On the [Resource Catalog page][2], explore the cloud resources in your Datadog organization which are either detected from an Agent on a host, or from configuring a cloud integration on the resource. Information about the resources in your organization is organized into two views: List and Map.

### List view

The Resource Catalog list is sortable by cloud platform, resource type, account, team, region, findings, and threats. Sort by **Threats** to spot workloads impacted over the past four hours. Or you can sort by **Findings** to identify cloud resources most prone to misconfigurations.

To find a particular resource, search by its name. To filter the list, select one or more facets. You may find it helpful to filter by your team name or scope the findings displayed to particular environments and clusters in order to see only matching resources in the list.

### Map view

The Resource Catalog map provides a visualization of the resources in your organization. To find a particular resource, search by its name. You may find it helpful to group resources by region and apply filters such as cloud provider and resource type to see only matching resources in the map. You can also use the `Fill by` selector to fill the map elements by Findings or Threats.

#### Findings

Each color corresponds to the highest severity misconfiguration detected on the resource. Green indicates a resource is configured correctly. White is displayed for resources that are not monitored by Cloud Security Posture Management.

#### Threats

Threats reflect data from the past four hours and are only available for compute instances such as AWS EC2 and Azure VM. White indicates there are no active threats detected. Shades of blue to red reflect the highest-severity threat detected on the resource.

## Investigate a resource

Clicking on a resource opens a side panel with details including:

- **Resource information** such as the resource type, name, account, and tags associated with the resource.
- **Security findings** including the security rules and latest status.
- **Real-time threat signals** detected on the asset by Cloud Workload Security.
- **Resource definition** in JSON showing the full configuration of the asset.
- An interactive asset relationship graph displaying the assets connected to the resource.

Click the **Share** button and select **Share Findings** to share a link to the current resource with your teammates through email, Slack, and more. See all of the [Datadog notification integrations][3] available for this feature.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/security_platform/cloud_security_management
[2]: https://app.datadoghq.com/infrastructure/catalog
[3]: /integrations/#cat-notification