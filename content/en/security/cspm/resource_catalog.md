---
title: Datadog Resource Catalog
kind: documentation
aliases:
  - /security_platform/cspm/resource_catalog
further_reading:
- link: "/security/cspm/custom_rules/schema/"
  tag: "Documentation"
  text: "Cloud Resource Schema"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Resource Catalog is not currently available in this site.
</div>
{{< /site-region >}}

Datadog Resource Catalog provides a high-level overview of the hosts and resources in your cloud and hybrid environments. View information such as tags, configuration details, relationships between assets, misconfigurations, and threats. See what team is responsible for each resource, and what security findings have been reported. Access dashboards and Datadog views that receive and monitor telemetry and security data for each resource.

Resource Catalog leverages Datadog cloud integrations and the Datadog Agent to gather data from cloud resources such as databases, storage services, and hosts.

{{< img src="security/cspm/resource_catalog/resource_catalog2.png" alt="Resource Catalog map view displaying host and cloud resources grouped by category and region." style="width:100%;" >}}

## Adding resources to Resource Catalog

For cloud resources to appear in the Resource Catalog, enable [Cloud Security Management][1] for each cloud account.

The Resource Catalog is useful for:

- Training new site reliability and security engineers by providing a clear view of all resources, their relationships, and their security posture, along with information about teams responsible for them and services running on them.
- Speeding incident recovery by increasing confidence and simplifying locating owners of upstream and downstream resources.
- Ensuring proper security coverage by identifying resources that are most prone to misconfigurations or are not actively reporting security findings.
- Facilitating the practice of good tagging to optimize cross-telemetry insights.
- Providing engineering leadership with a high-level view of security practices across teams and cloud accounts.

## Browse the Resource Catalog

On the [Resource Catalog page][2], explore the cloud resources in your Datadog organization. The catalog detects a resource either because it has an Agent installed on it, or because a cloud integration is configured on it. Information about the resources in your organization is shown on two views: List and Map.

### List view

You can sort resources in the Resource Catalog list by cloud platform, resource type, account, team, region, findings, and threats. Sort by **Threats** to spot workloads impacted over the past four hours. Sort by **Findings** to identify cloud resources most prone to misconfigurations.

To find a particular resource, search by its name. To filter the list to see a subset of resources you're most interested in, select facets on the left panel. For example, you may find it helpful to filter by your team name, or to scope the findings to particular environments and clusters.

If you use [Datadog Teams][4], select the **Teams** toggle on the left panel, then select the toggle for the teams to which you're assigned to view only resources assigned to those teams.

### Map view

The Resource Catalog map provides a visualization of the resources in your organization. To find a particular resource, search by its name. You may find it helpful to group resources by region, and to apply filters such as cloud provider and resource type, to see only matching resources. You can also use the `Fill by` selector to fill the map elements by Findings or Threats.

If you use [Datadog Teams][4], select the **Teams** toggle on the left panel, then select the toggle for the teams to which you're assigned to view only resources assigned to those teams.

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

[1]: /security/cloud_security_management
[2]: https://app.datadoghq.com/infrastructure/catalog
[3]: /integrations/#cat-notification
[4]: /account_management/teams