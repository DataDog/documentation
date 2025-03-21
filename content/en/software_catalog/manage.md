---
title: Manage a Component
aliases:
  - /tracing/software_catalog/investigating
  - /software_catalog/investigating/
  - /tracing/software_catalog/guides/understanding-service-configuration
  - /software_catalog/guides/understanding-service-configuration/
  - /tracing/service_catalog/investigating
  - /service_catalog/investigating/
  - /tracing/service_catalog/guides/understanding-service-configuration
  - /service_catalog/guides/understanding-service-configuration/
  - /api_catalog/add_metadata
  - /api_catalog/owners_and_tags
  - /service_catalog/manage
further_reading:
- link: "/tracing/software_catalog/service_definition_api/"
  tag: "Documentation"
  text: "Registering Services with the Service Definition API"
- link: "/tracing/software_catalog/guides/upstream-downstream-dependencies"
  tag: "Guide"
  text: "See Upstream and Downstream Dependencies During an Active Incident"
- link: "https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/"
  tag: "Blog"
  text: "Manage Service Catalog entries with the Service Definition JSON Schema"
- link: "https://www.datadoghq.com/blog/apm-security-view/"
  tag: "Blog"
  text: "Gain visibility into risks, vulnerabilities, and attacks with APM Security View"
- link: "https://www.datadoghq.com/blog/service-catalog-setup/"
  tag: "Blog"
  text: "Easily add tags and metadata to your services using the simplified Service Catalog setup"
- link: "https://www.datadoghq.com/blog/github-actions-service-catalog/"
  tag: "Blog"
  text: "I use GitHub Actions for Data­dog's Service Catalog, and you should, too"
- link: "/tracing/software_catalog/"
  tag: "Documentation"
  text: "Datadog Software Catalog"
algolia:
  tags: ['software catalog']
---
`Service` is the only component type in Software Catalog schema versions v2, v2.1, and v2.2. [v3.0][10] and above supports multiple kinds of components, including `kind:system`, `kind:service`, `kind:queue`, `kind:api`, and `kind:datastore`.

## Assigning an owner 

You can assign a `team` to entries in the Software Catalog either in the UI or by creating a [Service Definition][4]. Datadog recommends that you set up [Datadog Teams][5] so that you can specify individual members of the team and take advantage of *Teams* filters across common views like Dashboards and Notebook lists. The ability to sync Datadog Teams with your identity providers (IdPs) is in [Preview][11].

## Determining and communicating criticality 
Not all instances of observability carry the same level of importance. Some are mission-critical, while others are less so. By identifying the service tier, lifecycle, and the application ecosystem they belong to, you can determine if the observability coverage is adequate and quickly assess the severity of issues. 

## Understanding your service configuration

Following monitoring best practices such as tracing, logging, and code profiling helps you ensure that you have all the data you need during incident triage. Software Catalog provides automatic checks for these recommended setups. It helps you detect any monitoring gaps and helps you connect all available data for a service.

To view the configuration completeness for a service, click the service in the [Software Catalog][7], then find the **Setup Guidance** tab:

{{< img src="tracing/software_catalog/software-catalog-setup-guidance.png" alt="Software Catalog with the Setup Guidance tab highlighted." >}}

Alternatively, on the [*Service* page][8], click **Service Config** on the lower-left side:

{{< img src="tracing/software_catalog/service-page-service-config.png" alt="Service page with the Service Config link highlighted." >}}

Above the Setup Guidance section in the Service Information section, you can see the ownership, PagerDuty, and related links information you've specified for the service in its [service definition][9].

You can also find which Datadog features you are actively using for a given service, to help you find and close gaps in your monitoring completeness. 

The Setup Guidance table does not necessarily reflect billing for individual products, but rather activity for the service you are presently examining. For example, if the service does not emit infrastructure metrics for a long time, `Infrastructure Monitoring` might have `Not Detected` specified, even if you have hosts or containers running infrastructure monitoring. 

Click a service in Software Catalog to open the side panel with the following details: 

### Service details by views

- **Ownership information** from the [Service Definition][4], such as links to team, contacts, source code, and supplemental information like documentation and dashboards.
- **Reliability information** including deployment status, SLOs, ongoing incidents, and error information.
- **Performance graphs** showing requests, errors, latency, and time spent by downstream services.
- **Security information** including known vulnerabilities exposed in the service's libraries, the timeline and type of attacks, identity of attackers, and security threats impacting your services.
- **Costs information** showing the cloud spend for a service, broken down by resource types.
- **Pre-production information** regarding your software delivery process, such as the average build duration and success rate of CI pipelines related to your service, along with static analysis results from CI.

### Configuration details 
- **Setup completeness status** for Datadog products that can collect data for the service.
- **External libraries used** which includes the ability to download the Inventory of Libraries.
- **Service definition** in YAML with a link to the service's source code.
- An interactive service map displaying services upstream and downstream from this service.
- **Defined and Related Dashboards** showing a list of pre-defined and Watchdog recommended dashboards when available. 
- **Service Scorecards** showing a snapshot of the service's scores and last evaluation timestamp.


## Take actions on a given component
### Find Software Catalog actions in Action Catalog
To explore the complete set of actions specifically related to Software Catalog, navigate to the [Datadog Action Catalog][6]. Filter for the actions you need:

1. **Access the Action Catalog**: Go to the Action Catalog within your Datadog Workflow Automation environment.
2. **Search Functionality**: Use the search bar to search for keywords like "Software Catalog" or more specific terms related to desired actions (for example, "get service dependencies").

### Available Software Catalog actions
Below is a comprehensive list of actions available for Software Catalog in Datadog Workflow Automation:

- **Retrieve Service Information**
  - "Get service definition" for a single service
  - "List service definitions" to get all definitions from Datadog Software Catalog
  - "Get service dependencies" to get a service's immediate upstream and downstream services
- **Incident Triage**
  - "Get service PagerDuty on call"
  - When integrated with other actions, you can trigger workflows based on critical events (for example, execute runbooks)

## Investigating infrastructure
From the **Performance** tab, find the service you are investigating. In the **Infrastructure** column, click the resources related to this service to **View in Service Context Map**.

{{< img src="tracing/software_catalog/access_service_context_map.png" alt="Access the Service Context Map from the Software Catalog Performance tab, highlighting the Infrastructure column" style="width:90%;" >}}

The Service Context Map provides an overview of the relationships and dependencies between services and related infrastructure. Use this view to analyze the source of an issue by looking at upstream and downstream services and infrastructure.

### Linking infrastructure telemetries

The `service` tag is the primary key for Software Catalog entries. It's also the smallest common unit of analysis for Datadog telemetries with [Universal Service Tagging][12]. Set the `service` tag directly on [Kubernetes pod labels][14]. By setting the `service` tag within the `tags.datadoghq.com/service` label, all pod telemetry, like metrics and logs, receives the service tag in Datadog. This is the recommended Kubernetes service label. 

In comparison, setting the label on a Kubernetes service only affects metric tagging, not other telemetry. Applying [additional container labels][13] is essential for correctly tagging logs and traces, so Datadog does not recommend adding tags directly on containers



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config/
[2]: /tracing/other_telemetry/connect_logs_and_traces/
[3]: /tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[4]: /software_catalog/service_definitions/
[5]: /account_management/teams/
[6]: /tracing/services/service_page/
[7]: https://app.datadoghq.com/services
[8]: /tracing/services/service_page/
[9]: /tracing/software_catalog/service_definition_api/
[10]: /software_catalog/service_definitions/v3-0/
[11]: /account_management/teams/manage/#manage-teams-through-an-identity-provider
[12]: /getting_started/tagging/unified_service_tagging/
[13]: /containers/docker/tag/
[14]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#full-configuration
