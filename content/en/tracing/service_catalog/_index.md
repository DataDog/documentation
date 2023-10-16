---
title: Datadog Service Catalog
kind: documentation
aliases:
  - /tracing/faq/service_catalog/
further_reading:
- link: "/tracing/service_catalog/service_definition_api/"
  tag: "Documentation"
  text: "Registering Services with the Service Definition API"
- link: "/tracing/service_catalog/guides/understanding-service-configuration"
  tag: "Guide"
  text: "Understanding Your Service Configuration"
- link: "/tracing/service_catalog/guides/upstream-downstream-dependencies"
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
  text: "I use GitHub Ac­tions for Data­dog's Service Catalog, and you should, too"
algolia:
  tags: ['service catalog']
---

{{< img src="tracing/service_catalog/service_catalog.mp4" video=true alt="Navigating around the Service Catalog" style="width:100%;" >}}

## Overview

Datadog Service Catalog is a centralized place to access important information about all services in your organization. Achieve end-to-end service ownership at scale, get real-time performance insights, detect and address reliability and security risks, and manage application dependencies all in one place. Access team communications tools such as Slack, source control such as GitHub, Datadog dashboards, and Datadog views that receive and monitor telemetry data for each service.

Compared to the APM Service List, the Service Catalog includes services that do not actively emit trace metrics, which means you do not need to instrument your service for it to appear. Service Catalog also automatically includes services detected by USM and RUM. Service Catalog supports a one hour look back window. If you do not see your APM services in Service Catalog, they most likely were not sending active trace metrics during the last hour. You may still find these services in APM Service List.

The Service Catalog is useful for:
- Training new developers and site reliability engineers by providing a clear view of all services, their structures, and links to more information.
- Improving the on-call experience for everyone by establishing correct ownership information and communication channels, alongside easy access to monitoring and troubleshooting details.
- Embedding links to solutions and troubleshooting tools such as runbooks and documentation directly in the observability tooling engineers are already using.
- Speeding incident recovery by increasing confidence and simplifying locating owners of upstream and downstream services and dependencies.
- Detecting which services aren't reporting observability data or having that data monitored.
- Facilitating the practice of good tagging to optimize cross-telemetry insights.
- Providing engineering leadership with a high-level view of reliability practices across teams and services.
- Spotting issues like missing SLOs, monitors, or services without ownership.
- Proactively identifying services exposed to application attacks.
- Reducing application risks by finding and fixing known security vulnerabilities in the dependencies of your services.
- Visualizing how changes to infrastructure can affect costs over time. 
- Understanding trends and identifying inefficiencies in the costs related to your services.

## Browse the Service Catalog

On the [Service Catalog page][1], see the list of services in your Datadog organization which are either detected from collected data or manually declared by someone [registering the service][8]. To find a particular service, search by its name. To filter the list, select one or more facets. For example, to see detected services without a service definition yet, click the **Ownership Info > Telemetry Only** facet. You may find it helpful to filter by your team name or scope the metrics displayed to particular environments and clusters in order to see only matching services in the list.

The Service Catalog list is sortable by service type, service name, and many of the other columns. You can find missing ownership by sorting by team in the Ownership view and looking for blanks. Or you can sort by urgency in the Reliability view and see services with the most triggered monitors.

Information about the service provided by the service definition or by Datadog products collecting observability data is organized into views: Ownership, Reliability, Performance, and Security.

### Ownership view

In the **Ownership** tab, you can click the icons in the **Contact** and **Repo** columns and be directed to the tools and projects specified in the service definition. For example, you can access the owning team's Slack channel or GitHub repository containing the service code.

The **Telemetry** column displays what types of telemetry data Datadog is collecting for the service. Clicking on the icons directs you into the corresponding Datadog product view. For example, the Agent sends traces to Datadog, and you can click the **Traces** icon to view them in APM.

Sort the table by **Team** or **On Call** columns to see which services each team is responsible for, and identify services where ownership and responsibility are not specified yet.

### Reliability view

The **Reliability** tab contains information about the stability of your services. Sort the table by clicking on columns in the list to reveal:

- Which services deployed most recently, or have not deployed for a long time.
- Which services are reporting the most errors, and whether they are new issues.
- Which services have ongoing incidents.
- Which services have monitors that are triggered.

Click the Settings icon on the right hand corner to hide columns from the service list.

### Performance view

The **Performance** tab provides several ways to view how your services are performing and what needs the most attention. 

The environment dropdown works as a filter. For example, when you select `env:prod`, the list displays only services that have performance data (APM/USM telemetry) in `env:prod` during the last hour. When you select `env:*`, you can see all environments where a service emits telemetry at a glance, and expand to see detailed performance metrics per environment. 
The second dropdown allows you to rescope any APM data you have in the Performance view to the [second primary tag][12] on APM [trace metrics][13]. This dropdown does not affect how many services you see in the list. RUM applications are not associated with specific environments (unlike APM or USM), and are only viewable when you select the `env*` option in the environment dropdown.  

You can change the default environment in **APM > Setup & Configuration > Settings**. 

{{< img src="tracing/service_catalog/svc-cat-perf-view.png" alt="Performance view filtered on env:* and scoped to cluster-name:*" style="width:100%;" >}}

The performance metrics are tied to services' [primary operations][14]. If a service is only detected by APM, the performance view shows the APM [trace metrics][13]. If a service is only detected by USM, the performance view shows the [USM metrics][15]. If a service is detected by USM and APM, the performance view shows the Trace Metrics instead of USM metrics.

Sort the table by clicking columns to reveal services that:
- Deployed most recently, or have not deployed for a long time
- Are receiving the most requests per second, or are not receiving any traffic
- Have the highest latency at various percentiles
- Have the highest error numbers or rates
- Are running on the most pods, hosts, or serverless environments
- Have related dashboards where you can see more performance data breakdowns, and identify which ones need to have dashboards added to their service definition
- Have the highest or lowest [Apdex scores][5]
- Have monitors that are triggered

Click the Settings icon on the right hand corner to hide metric columns from the list.

### Security view
The **Security tab** provides several ways to assess and improve the security posture of your services. This includes understanding the number and severity of known security vulnerabilities in the open source libraries, and viewing how your services are targeted by attackers. Sort the table by clicking columns to reveal services that:

- Expose known security vulnerabilities, including the individual severities.
- Are receiving the most attack attempts.
- Are targeted by the most attackers.
- Have the most severe threats, where the services are impacted by the attacks.
- Are monitored and protected by [Application Security Management][11]

To access additional details describing security vulnerabilities and signals, click on the service row to open a detailed side panel. Alternatively, click on the pop-over **View Service Details** button, which opens the service page, and in turn, its security tab.

Click the Settings icon on the right hand corner to hide metric columns from the service list.

### Costs view
The **Costs tab** provides several ways to understand the costs associated with your services.  Powered by [Cloud Cost Management][19], you can identify potential inefficiencies, saving opportunities, and change over time. Positioning costs data alongside metrics available in Service Catalog can improve visibility into how engineering changes affect overall cloud spend. Sort the table by clicking columns to reveal services that:

- Have the highest amortized AWS costs in the last month
- Show a significant change in the rate of cloud spending over time 

For more information on a service's cost changes, click on the service row to open a detailed side panel. To see this information on the Cloud Costs page, click the **View in Analytics** button. 

This information is only available for Cloud Cost Management customers who have configured the necessary [AWS Integration][20] and [Tag Pipelines][21]. 

Click the Settings icon on the right hand corner to hide metric columns from the service list.

## Investigate a service

Clicking on a service opens a side panel with details including:

- **Ownership information** from the service definition such as links to team contacts, source code, and supplemental information like documentation and dashboards.
- **Reliability information** including deployment status, SLOs, ongoing incidents, and error information.
- **Performance graphs** showing requests, errors, latency, and time spent by downstream services.
- **Security information** including known vulnerabilities exposed in the service's libraries, the timeline and type of attacks, identity of attackers, security threats impacting your services, and the ability to download the Software Bill of Materials (SBOM) from the libraries tab. 

  {{< img src="tracing/service_catalog/libraries_sbom.png" alt="Showing an individual service from Service Catalog, highlighting the libraries tab and ability to download the SBOM" style="width:100%;" >}}

- **Configuration completeness status** for Datadog products that can collect data for the service.
- **Service definition** in YAML with a link to the service's source code.
- An interactive service map displaying services upstream and downstream from this service.
- **Beta: Active library configuration** for Java and .NET services with the latest Agent configured with [Remote Configuration][16] enabled, you can adjust the [trace sampling rate][18] (from 0.0 to 1.0), enable [Log Injection][17] to correlate traces and logs data, and specify HTTP header tags to be applied to all traces coming into Datadog from this service. In the Setup Guidance tab, beside **Active Library Configuration**, click **Edit** to change these settings and immediately apply them without restarting the service.

  {{< img src="tracing/service_catalog/service_details_remote_config.png" alt="Configuration options for the service in the Datadog UI" style="width:80%;" >}}

Click **View Related** and select a page from the dropdown menu to navigate into related pages in Datadog, such as the APM Service page and service map for this service, or related telemetry data pages, such as Distributed Tracing, Infrastructure, Network Performance, Log Management, RUM, and Continuous Profiler.

## Role based access and permissions

For general information, see [Role Based Access Control][9] and [Role Permissions][10].
### Read permission

The Service Catalog read permission allows a user to read service catalog data, which enables the following features:
- Service Catalog list
- Discover UI
- Service Definition endpoint: `/api/v2/services/definition/<service_name>`

The permission is enabled by default in the **Datadog Read Only Role** and **Datadog Standard Role**.

### Write permission

The Service Catalog write permission allows a user to modify service catalog data. The write permission is required for the following features:
- Inserting or Updating a Service Definition with the `POST /api/v2/services/definitions` endpoint
- Deleting a Service Definition with the `DELETE /api/v2/services/definition/<service_name>` endpoint
- Completing the onboarding process in the Discover Services UI
- Updating service metadata in the UI

The permission is enabled by default in the **Datadog Admin Role** and **Datadog Standard Role**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /integrations/github/
[5]: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
[6]: https://www.datadoghq.com/blog/unified-service-tagging/
[7]: /tracing/service_catalog/service_definition_api/
[8]: /tracing/service_catalog/setup/
[9]: /account_management/rbac/
[10]: /account_management/rbac/permissions/
[11]: /security/application_security/how-appsec-works/
[12]: /tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog
[13]: /tracing/metrics/metrics_namespace/
[14]: /tracing/guide/configuring-primary-operation/
[15]: /universal_service_monitoring/guide/using_usm_metrics/#usm-metrics-vs-apm-metrics
[16]: /agent/remote_config/
[17]: /tracing/other_telemetry/connect_logs_and_traces/
[18]: /tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[19]: /cloud_cost_management/
[20]: /cloud_cost_management/?tab=aws
[21]: /cloud_cost_management/tag_pipelines
