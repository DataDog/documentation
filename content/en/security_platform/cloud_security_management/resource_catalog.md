---
title: Datadog Resource Catalog
kind: documentation
further_reading:
- link: "/security_platform/cspm/custom_rules/schema/"
  tag: "Documentation"
  text: "Cloud Resource Schema"
---


{{< img src="tbd.mp4" video=true alt="Navigating around the Resource Catalog" style="width:100%;" >}}

## Overview

Datadog Resource Catalog is a centralized place to access important information about all host and cloud infrastructure in your organization. See what team is responsible for each resource, and what security findings have been found. Access dashboards and Datadog views that receive and monitor telemetry and security data for each resource.

Compared to the Infrastructure List, the Resource Catalog ...

The Resource Catalog is useful for:
- Training new site reliability and security engineers by providing a clear view of all resources, their relationships, and their security findings, along with information about teams responsible for them and services running on them.
- Speeding incident recovery by increasing confidence and simplifying locating owners of upstream and downstream resources.
- Detecting which resources aren't reporting security findings so that you can rectify the oversight.
- Facilitating the practice of good tagging to optimize cross-telemetry insights.
- Providing engineering leadership with a high-level view of security practices across teams and services.
- Spotting issues like ....

## Browse the Resource Catalog

On the [Resource Catalog page][1], see the list of cloud resources in your Datadog organization which are .... either detected from an Agent on a host, or from configuring a cloud integration on the resource.. To find a particular service, search by its name. To filter the list, select one or more facets. You may find it helpful to filter by your team name or scope the findings displayed to particular environments and clusters in order to see only matching services in the list.

The Resource Catalog list is sortable by ..., and many of the other columns. You can find missing ownership by sorting by team in the Ownership view and looking for blanks. Or you can sort by urgency in the Reliability view and see resources with the most triggered monitors.

Information about the resource provided ... Datadog products collecting observability data is organized into Ownership and Security views.

### Ownership view

In the **Ownership** tab, you can .... For example, you can ....

The **x** column displays... Clicking on the icons .... For example, ....

Click the kebab menu to the right hand corner to ....

Sort the table by **y** or **z** columns to see which resources each team is responsible for, and identify resources where ownership and responsibility are not specified yet.

### Security view

The **Security** tab contains information about the configured security of your resources. Sort the table by clicking on columns in the list to reveal:

- Which resources .....
- Which resources are reporting the most errors, and whether they are new issues.
- Which resources ....
- Which resources have monitors that are triggered.

Click the Settings icon on the right hand corner to hide columns from the resources list.

## Investigate a resource

Clicking on a resource opens a side panel with details including:

...
- **Ownership information** from the service definition such as links to team contacts, source code, and supplemental information like documentation and dashboards.
- **Reliability information** including deployment status, SLOs, ongoing incidents, and error information.
- **Performance graphs** showing requests, errors, latency, and time spent by downstream services.
- **Configuration completeness status** for Datadog products that can collect data for the service.
- **Service definition** in YAML with a link to the service's source code.
- An interactive service map displaying services upstream and downstream from this service.
...

Click **View Related** and select a page from the dropdown menu to navigate into related pages in Datadog, ...

## Resource definitions

A resource is .... Datadog [Unified Service Tagging][6], provides a standard way to manage and monitor resources consistently across multiple telemetry types including ...


## Registering a new resource

...

## Role based access and permissions

For general information, see [Role Based Access Control][2] and [Role Permissions][3]. 

### Read permission

The Resource Catalog read permission allows a user to read resource catalog data, which enables the following features:
...

The permission is enabled by default in the **Datadog Read Only Role** and **Datadog Standard Role**.

### Write permission

The Resource Catalog write permission allows a user to modify resource catalog data. The write permission is required for the following features: 
...

The permission is enabled by default in the **Datadog Admin Role** and **Datadog Standard Role**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/infrastructure/catalog
[2]: /account_management/rbac/
[3]: /account_management/rbac/permissions/
