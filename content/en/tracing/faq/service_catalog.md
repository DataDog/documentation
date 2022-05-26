---
title: Datadog Service Catalog
kind: faq
is_beta: true
further_reading:
- link: "/tracing/faq/service_definition_api/"
  tag: "Documentation"
  text: "Service Definition API"
---

{{< img src="tracing/service_catalog/service_catalog.mp4" video=true alt="Navigating around the Service Catalog" style="width:100%;" >}}

<div class="alert alert-warning">This feature is in private beta and the endpoints are likely to change.</div>

## Overview

Datadog Service Catalog is a centralized place to access important information about all services in your organization. Achieve end-to-end service ownership at scale, get real-time performance insights, detect and address reliability and security risks, and manage application dependencies all in one place. Pivot quickly into team communications tools (Slack), source control (Github), dashboards, and Datadog views that receive and monitor telemetry data for each service.

In contrast to the current APM Service List, Service Catalog includes services that are not actively emitting trace metrics, meaning your service needn't be instrumented to be listed in the catalog, and also that you can quickly spot instrumentation issues for services that should have trace data.

The Service Catalog is useful for:
- Training new developers and site reliability engineers by providing a clear view of all services, their structures, and links to more information.
- Improving the on-call experience for everyone by establishing correct ownership information and communication channels, alongside easy access to monitoring and troubleshooting details.
- Embedding links to solutions and troubleshooting tools such as runbooks and documentation directly in the observability tooling engineers are already using.
- Speeding incident recovery by increasing confidence and simplifying locating owners of upstream and downstream services and dependencies.
- Detecting which services aren't reporting observability data or having that data monitored.
- Facilitating the practice of good tagging to optimize cross-telemetry insights.
- Providing engineering leadership with a high-level view of reliability practices across teams and services. 
- Spotting issues like missing SLOs, monitors, or services without ownership.

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

The Reliability view brings together key information about the stability of your services. Sort the table by clicking on columns to reveal:

- Which services deployed most recently, or have not deployed for a long time.
- Which services are reporting the most errors, and are they new issues.
- Which services have ongoing incidents.
- Which services have monitors that are triggered.

Click the cog menu on the right to hide columns you don't use.

### Performance view

The Performance view provides various ways for you to view how your services are performing and what needs attention most. Sort the table by clicking columns to reveal services that:

- deployed most recently, or have not deployed for a long time.
- are receiving the most requests per second, or aren't getting any traffic.
- have the highest latency at various percentiles.
- have the highest error numbers or rates.
- are running on the most pods, hosts, or serverless environments.
- have related dashboards where you can see more performance data breakdowns, and which ones need to have dashboards added to their service definition.
- have the highest or lowest [Apdex scores][3].
- have monitors that are triggered.

Click the cog menu on the right to customize which metrics columns you see.

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

A service is an independently deployable unit of software. Datadog [Unified Service Tagging][4], and specifically the `DD_SERVICE` tag, provides a standard way to manage and monitor services consistently across multiple telemetry types, including infrastructure metrics, logs, and traces. If you want to define a service using other criteria, you can customize a service definition to fit your architectural style.

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

Add service ownership information such as team name, Slack channels, and source code repositories, by using the [Service Definition API][5].

### Registering a new service

You can manage service ownership information even for services that are not emitting any Datadog telemetry. Specify service ownership, on-call info, and custom tags with the [Service Definition API][5], and the information is reflected in the Service Catalog UI. 

The following YAML shows an example service definition:

```yaml
---
schema-version: v2
dd-service: product-recommendation-lite
team: Shopist
contacts:
  - type: slack
    contact: https://exampleco.slack.com/archives/S319HSDB32
links: 
  - name: Demo Dashboard
    type: dashboard
    url: https://app.datadoghq.com/dashboard/abc-def-ghi
repos: 
  - name: Source 
    provider: github 
    url: https://github.com/DataDog/shopist/tree/prod/product-recommendation-lite
  - name: Deployment 
    provider: github 
    url: https://github.com/DataDog/shopist/blob/prod/k8s/dd-trace-demo/templates/product-recommendation-lite-deployment.yaml
docs: 
  - name: Datadog Doc
    provider: link
    url: https://docs.datadoghq.com/tracing/faq/service_catalog/
tags: []
```

You can register multiple services with a single YAML file by separating each service definition with a line containing three hyphens: `---`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /integrations/github/
[3]: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
[4]: https://www.datadoghq.com/blog/unified-service-tagging/
[5]: /tracing/faq/service_definition_api/
