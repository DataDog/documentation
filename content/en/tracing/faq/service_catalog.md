---
title: Datadog Service Catalog
kind: faq
is_beta: true
further_reading:
- link: "/tracing/faq/service_definition_api/"
  tag: "Documentation"
  text: "Service Definition API"
---

<div class="alert alert-warning">This feature is in private beta and the endpoints are likely to change.</div>

{{< img src="tracing/service_catalog/service_catalog.mp4" video=true alt="Navigating around the Service Catalog" style="width:100%;" >}}

## Overview

Datadog Service Catalog is a centralized place to access important information about all services in your organization. Achieve end-to-end service ownership at scale, get real-time performance insights, detect and address reliability and security risks, and manage application dependencies all in one place. Access team communications tools such as Slack, source control such as GitHub, Datadog dashboards, and Datadog views that receive and monitor telemetry data for each service.

Compared to the APM Service List, the Service Catalog includes services that do not actively emit trace metrics, which means you do not need to instrument your service for it to appear. You can also examine instrumentation issues for services that should have trace data.

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

On the [Service Catalog page][1], see the list of services in your Datadog organization which are either detected from collected data or defined by someone [registering the service](#registering-a-new-service). To find a particular service, search by its name. To filter the list, select one or more facets. For example, to see detected services without a service definition yet, click the **Ownership Info > Telemetry Only** facet. You may find it helpful to filter by your team name or scope the metrics displayed to particular environments and clusters in order to see only matching services in the list.

The Service Catalog list is sortable by service type, service name, and many of the other columns. You can find missing ownership by sorting by team in the Ownership view and looking for blanks. Or you can sort by urgency in the Reliability view and see services with the most triggered monitors.

Information about the service provided by the service definition or by Datadog products collecting observability data is organized into three views: Ownership, Reliability, and Performance.

### Ownership view

In the **Ownership** tab, you can click the icons in the **Contact** and **</>** columns and be directed to the tools and projects specified in the service definition. For example, you can access the owning team's Slack channel or GitHub repository containing the service code.

The **Telemetry** column displays what types of telemetry data Datadog is collecting for the service. Clicking on the icons directs you into the corresponding Datadog product view. For example, the Agent sends traces to Datadog, and you can click the **Traces** icon to view them in APM.

Click the kebab menu to the right hand corner to edit the service definition (if it exists) or link to one if the service is not defined. You may have to [set up an integration with your source code system][2] first.

Sort the table by **Team** or **On Call** columns to see which services each team is responsible for, and identify services where ownership and responsibility are not specified yet.

### Reliability view

The **Reliability** tab contains information about the stability of your services. Sort the table by clicking on columns in the list to reveal:

- Which services deployed most recently, or have not deployed for a long time.
- Which services are reporting the most errors, and whether they are new issues.
- Which services have ongoing incidents.
- Which services have monitors that are triggered.

Click the Settings icon on the right hand corner to hide columns from the service list.

## Reliability view

#### PagerDuty Integration
You can add PagerDuty metadata to Service Catalog to complete the Reliability view. 

- Set up PagerDuty integration by following the instructions [here][6].
- Get your [API acccess key][7].
- Link PagerDuty service to Service Definition YAML.
```yaml
schema-version: v2
dd-service: product-recommendation-lite
team: Shopist
integrations:
  pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
tags: []
```

### Performance view

The **Performance** tab provides several ways to view how your services are performing and what needs the most attention. Sort the table by clicking columns to reveal services that:

- Deployed most recently, or have not deployed for a long time
- Are receiving the most requests per second, or are not receiving any traffic
- Have the highest latency at various percentiles
- Have the highest error numbers or rates
- Are running on the most pods, hosts, or serverless environments
- Have related dashboards where you can see more performance data breakdowns, and identify which ones need to have dashboards added to their service definition
- Have the highest or lowest [Apdex scores][3]
- Have monitors that are triggered

Click the Settings icon on the right hand corner to hide metric columns from the service list.

## Investigate a service

Clicking on a service opens a side panel with details including:

- **Ownership information** from the service definition such as links to team contacts, source code, and supplemental information like documentation and dashboards.
- **Reliability information** including deployment status, SLOs, ongoing incidents, and error information.
- **Performance graphs** showing requests, errors, latency, and time spent by downstream services.
- **Configuration completeness status** for Datadog products that can collect data for the service.
- **Service definition** in YAML with a link to the service's source code.
- An interactive service map displaying services upstream and downstream from this service. 


Click **View Related** and select a page from the dropdown menu to navigate into related pages in Datadog, such as the APM Service page and service map for this service, or related telemetry data pages, such as Distributed Tracing, Infrastructure, Network Performance, Log Management, RUM, and Continuous Profiler.

## Service definitions

A service is an independent, deployable unit of software. Datadog [Unified Service Tagging][4], and the `DD_SERVICE` tag, provides a standard way to manage and monitor services consistently across multiple telemetry types including infrastructure metrics, logs, and traces. To define a service using additional criteria, you can customize a service definition that fits your architectural style.

Service definitions include the following elements which are all optional (except the service name):

Service name
: An identifier for the service, unique within Datadog. By default, this is the `DD_SERVICE` value from incoming data.

Team
: The name of the team responsible for developing and maintaining the service.

Contacts
: One or more ways to contact the team, such as Slack channels or email addresses.

Links
: A list of links to important resources for the service, such as runbooks.

Repos
: A list of source control repositories that contain source code and related files for maintaining, testing, and deploying the service.

Docs
: Links to documentation for the service.

Tags
: Like all Datadog tags, these help you find, filter, and group whatever they are applied to, such as service definitions.

Integrations
: Custom strings to connect integrations such as PagerDuty for identifying the service on-call.

### Enriching a listed service 

Initially, services sending data to Datadog through one of the telemetry products (Traces, Logs, Profiles, Infrastructure, Network Performance, and RUM) are listed with an `UNDEFINED` label, which means that no service definition has been associated with the service yet. 

To add service ownership information such as team name, Slack channels, and source code repositories, use the [Service Definition API][5].

### Registering a new service

You can also manage service ownership information for services that do not emit any Datadog telemetry. To register a service, specify the service ownership, on-call information, and custom tags using the [Service Definition API][5]. 

See the example service definition YAML:

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

To register multiple services in one YAML file, separate each service definition with a line containing three hyphens: `---`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /integrations/github/
[3]: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
[4]: https://www.datadoghq.com/blog/unified-service-tagging/
[5]: /tracing/faq/service_definition_api/
[6]: https://docs.datadoghq.com/integrations/pagerduty/
[7]: https://support.pagerduty.com/docs/api-access-keys
