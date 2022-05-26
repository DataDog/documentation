---
title: Datadog Service Catalog
kind: faq
is_beta: true
---

{{< img src="tracing/service_catalog/service_catalog.mp4" video=true alt="Navigating around the Service Catalog" style="width:100%;" >}}

<div class="alert alert-warning">This feature is in private beta and the endpoints are likely to change.</div>

## Overview

Datadog Service Catalog is a centralized place to access important information about all services in your organization. Achieve end-to-end service ownership at scale, get real-time performance insights, detect and address reliability and security risks, and manage application dependencies all in one place. Pivot quickly into team communications tools (Slack), source control (Github), and Datadog views that receive and monitor telemetry data for each service.

In contrast to the current APM Service List, Service Catalog includes services that are not actively emitting trace metrics, meaning your service needn't be instrumented to be listed in the catalog, and also that you can quickly spot instrumentation issues for services that should have trace data.


Ownership and grouping services by applications, teams, and more

Productivity 
On-call training for new engineers 
Improve on-call experience for all
 knowing where to find runbooks/documentation pages
easily find on-call for dependencies
Respond to incidents confidently 

Detect monitoring/observability blindspots
Teams can use Service Catalog to make sure that all telemetry types are properly tagged to reveal cross-telemetry insights
Figure out the coverage of your visibility in the ‘Configuration’ tab in the side panel

Reliability / Better Availability
SREs/Engineering leaders can get a birds’ eye view of reliability practices across teams and services 
Spot issues like missing SLOs, monitors, or orphan services


## Browse the Service Catalog

On the [Service Catalog page][1], see the list of services in your Datadog organization, either detected from collected data, or defined by someone [registering the service](#registering-a-new-service). To find a particular service, search by its name. To filter the list, select one or more facets. For example, to see detected services that don't yet have a service definition, click the **Ownership Info > Telemetry Only** facet. You might find it helpful to filter by your team name. Or scope the metrics shown to particular environments and clusters to see only matching services in the list.

The list of services in the catalog is sortable service type, service name, as well as many of the other columns, making it quick to find specific or missing details (for example owning team on the Ownership view), and to sort by urgency (for example, number of triggered monitors on the Reliability view).

Useful information about the service provided either by the service definition or by Datadog products collecting observability data from the service, is organized into three views: Ownership, Reliability, and Performance.

### Ownership view

Clicking the icons in the Contact and Source code columns take you directly to the tools and projects specified in the service's definition. For example, you can access the owning team's Slack channel, or click directly into the Github repository that contains the service code.

The Telemetry column instantly shows you what types of telemetry data Datadog is collecting for the service, and clicking the icons takes you into the corresponding Datadog product view for the service. For example, the Agent has sent traces to Datadog, click the Traces icon to view them in APM.

Clicking the three-dot menu lets you edit the service definition, if it exists, or link to one if the service hasn't yet been defined. You might have to first [set up an integration with your source code system][2] if you haven't yet.

Sort the table by the Team or On Call columns to quickly spot services where ownership and responsibility have not been specified, or to see which services each team is responsible for.

### Reliability view



## Investigate a service

Click a service name to open its details page, which provides:

- **Ownership information** from the service definition, including links to team contacts, source code, and supplemental information like documentation and dashboards.
- **Reliability information** including deployment status, SLOs, ongoing incidents, and error information.
- **Performance graphs** showing requests, errors, latency, and time spent by downstream services.
- **Configuration completeness status** for Datadog products that can collect data for the service.
- The service definition YAML.
- A clickable service map that shows services that are upstream and downstream from this service. 

Also, the drop-down menu at the top of the page lets you pivot to related pages within Datadog, including the APM Service page and service map for this service, and the related telemetry data pages, such as Logs, Infrastructure, or Error Tracking.

## Service definitions

A service is an independently deployable unit of software. Datadog [Unified Service Tagging][3], and specifically the `DD_SERVICE` tag, provides a standard way to manage and monitor services consistently across multiple telemetry types, including infrastructure metrics, logs, and traces. If you want to define a service using other criteria, you can customize a service definition to fit your architectural style.

Service definitions include the following elements, all optional except the service name:

Service name
: An identifier for the service, unique within Datadog. By default, this is the `DD_SERVICE` value from the incoming data.

Team
: Your name for the team responsible for developing and maintaining the service.

Contacts
: One or more ways to contact the team, such as Slack channels or email addresses.

Links
: A list of links to important resources for the service, such as runbooks.

Repos
: A list of source control repositories that contain source code and related files for maintaining, testing, and deploying the service.

Docs
: Links to documentation for the service.

Tags
: Like all Datadog tags, these help you find, filter, and group whatever they are applied to, in this case service definitions.

Integrations
: Custom strings for hooking up to integrations such as PagerDuty for identifying on-call for the service.

### Enriching a listed service 

Initially, services that are sending data to Datadog through one of the telemetry products (for example, traces, logs, profiles, infrastructure, or network device monitoring) are listed in the Service Catalog with an `UNDEFINED` label. The `UNDEFINED` label means that no service definition has been associated with that service yet. 

Add service ownership information such as team name, Slack channels, and source code repositories, by using the [Service Definition API][4].

### Registering a new service

You can manage service ownership information even for services that are not emitting any Datadog telemetry. Specify service ownership, on-call info, and custom tags with the [Service Definition API][4], and the information is reflected in the Service Catalog UI. 


[1]: https://app.datadoghq.com/services
[2]: /integrations/github/
[3]: https://www.datadoghq.com/blog/unified-service-tagging/
[4]: /tracing/faq/service_definition_api/
