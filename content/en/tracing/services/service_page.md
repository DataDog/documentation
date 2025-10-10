---
title: Service Page
description: Comprehensive service overview with health metrics, dependencies, deployments, error tracking, and security insights.
aliases:
- /tracing/visualization/service/
further_reading:
- link: "/tracing/trace_collection/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/software_catalog/"
  tag: "Documentation"
  text: "Discover and catalog the services reporting to Datadog"
- link: "/tracing/services/resource_page/"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "/tracing/trace_explorer/trace_view/"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
- link: "https://www.datadoghq.com/blog/datadog-clipboard/"
  tag: "Blog"
  text: "Add an APM service page URL to your clipboard"
- link: "https://www.datadoghq.com/blog/apm-security-view/"
  tag: "Blog"
  text: "Gain visibility into risks, vulnerabilities, and attacks with APM Security View"
algolia:
  tags: ['service page']
---

{{< img src="tracing/visualization/service/overview_service_page_1.png" alt="Detailed service page" style="width:100%;">}}

## Overview

Selecting a service on the Software Catalog leads you to the detailed service page. A service is a set of processes that do the same job - for example a web framework or database (read more about how services are defined in [Getting Started with APM][1]).

Consult on this page:

* [Service health](#service-health)
* [Service monitor states](#service-monitor)
* [Watchdog Insights](#watchdog-insights)
* [Summary cards](#summary-cards)
{{< site-region region="ap1,us3,us5,eu,us,ap2" >}}
* [Dependencies](#dependencies)
{{< /site-region >}}
* [Out-of-the-box graphs](#out-of-the-box-graphs)
* [Resources associated to this service][2]
* [Additional sections](#additional-sections)
    *  [Deployments](#deployments), [Error Tracking](#error-tracking), [Traces](#traces), [Security](#security), and more

## Service health

**Service health** provides a real-time summary of service status to help you identify services that need immediate attention.

Service health integrates multiple signals (monitors, incidents, and Watchdog Insights) into a single alert. See which services are in a critical state to detect and troubleshoot issues faster.

{{< img src="/tracing/services/service_page/service-health3.png" alt="Service health on the service page and service dependency map." style="width:100%;" >}}

Service health is available in several places in Datadog:

1. [Software Catalog][23]
2. Service pages
3. Service dependendency maps, if Watchdog detects that an issue spans multiple service dependencies.
4. Service pills

Service health displays the status of your service as *Critical* or *Warning* if at least one of the following conditions is met:

|   Status    |                         Condition                          |
|-------------|------------------------------------------------------------|
|  **Critical**  | **Monitors**: <br>- A non-muted monitor with a paging integration setup (PagerDuty or Opsgenie) is in an `ALERT` state and triggered within the `past 2 days`.<br><br>**Incidents**: <br>- An incident of any severity is active.<br><br>**Watchdog Insights**: <br>- A faulty deployment is ongoing.<br>- An APM latency/error rate alert is ongoing.  |
| **Warning** | **Monitors**: <br>- A non-muted warning monitor with a paging integration setup (PagerDuty or Opsgenie) is in a `WARN` state and triggered within the `past 2 days`.<br><br>**Incidents**: <br>- An incident of any severity is stable .<br><br>**Watchdog Insights**: <br>- A log anomaly alert is ongoing. |                                                                                                                                                                                                   |
|   **Ok**    |    No alerts from the critical or warning state are active.     |                                                                                                                                                                       ||

## Service monitor

The Service monitor panel surfaces active Monitors and Synthetics tests linked to your service.
Datadog also proposes a list of monitors depending on your service type:

{{< img src="tracing/visualization/service/service_monitors.png" alt="Service Monitors" style="width:90%;">}}

Enable them directly or create your own [APM monitors][3].

**Note**: Monitors are attached to an APM service if `service:<SERVICE_NAME>` is tagged in the metadata, included in the monitor query, or if the query is grouped-by service. You can also tag any Synthetic Test with `service:<SERVICE_NAME>` to attach it to an APM service.

## Watchdog Insights

The [Watchdog Insights][7] carousel surfaces anomalies and outliers detected on specific tags, enabling you to investigate the root cause of an issue. Insights are discovered from APM, Continuous Profiler, Log Management, and Infrastructure data that include the service tag. These insights are the same insights that appear in each of the product pages. For example, the same Log outliers on the service page can be found in the [Log Explorer][19].

{{< img src="tracing/visualization/service/cross_product_insight_1.jpg" alt="Watchdog Insights" style="width:100%;">}}

Click on an insight to see more details, such as the time frame of the insight, related logs or traces, and suggested next steps.

{{< img src="tracing/visualization/service/watchdog_details_1.jpg" alt="Watchdog Insights details" style="width:100%;">}}

## Summary cards

The service page features summary cards with highlights on your service health. Easily spot potential faulty deployments, click into the card to view details or traces of the latest deployment, or view all deployments on this service. See new issues flagged on your service through our integration with [Error Tracking][4], where errors are automatically aggregated into issues.

{{< img src="tracing/visualization/service/summary_cards.png" alt="Summary cards" style="width:100%;">}}

Our [Service Level Objectives (SLOs)][5] and [Incidents][6] summaries allow you to monitor the status of SLOs and ongoing incidents, so that you can keep performance goals top of mind. Click the cards to create a new SLO on the service or declare an incident. The [security signals][18] summary highlights how your services react to application threats.

## Out-of-the-box graphs

Datadog provides out-of-the-box graphs for any given service. Use the dropdown above each graph to change the displayed information.

{{< img src="tracing/visualization/service/out_of_the_box_graphs.jpg" alt="Out of the box service graphs" style="width:100%;">}}

{{% apm-ootb-graphs %}}

### Export

On the upper-right corner of each graph click on the arrow in order to export your graph into a pre-existing [dashboard][10]:

{{< img src="tracing/visualization/service/save_to_dashboard.png" alt="Save to dashboard" style="width:60%;">}}

## Resources

See Requests, Latency, and Error graphs broken down by resource to identify problematic resources. Resources are particular actions for your services (typically individual endpoints or queries).

Below, there's a list of [resources][11] associated with your service. Note: If the resource represents an external interface of an HTTP service, the list displays endpoints instead.

Sort the service's resources by requests, latency, errors, or time to identify high-traffic areas or potential issues. You can configure these metric columns, as shown in the following example:

{{< img src="tracing/visualization/service/resources_tab_1.jpg" alt="Resources" style="width:100%;">}}

Click on a resource to open a side panel that displays the resource's out-of-the-box graphs (about requests, errors, and latency), a resource dependency map, and a span summary table. Use keyboard navigation keys to toggle between resources on the **Resources** list and compare resources in a service. To view the full resource page, click **Open Full Page**.

[Refer to the dedicated resource documentation to learn more][2].

### Columns

Choose what to display in your resources list:

* **Requests**: Absolute amount of requests traced (per seconds)
* **Requests per second**: Absolute amount of requests traced per second
* **Total time**: Sum of all time spend in this resource
* **Avg/p75/p90/p95/p99/Max Latency**: The Avg/p75/p90/p95/p99/Max latency of your traced requests
* **Errors**: Absolute amount of error for a given resource
* **Error Rate**: Percent of error for a given resource

{{< img src="tracing/visualization/service/resource_columns.png" alt="Resource columns" style="width:40%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
## Dependencies

Visualize upstream and downstream dependencies that the service interacts with from the dependency map. The map is powered by [APM metrics][1] to surface accurate request counts, error rates, and latency numbers. The map automatically groups dependencies by operation name. For instance, if a service calls two downstream services using gRPC, these services are grouped together. The table on the left-hand side of the map shows requests and error rates over time, useful to identify failing dependencies.

[Inferred service dependencies][2] like databases, queues, or third-party services are represented with a purple background node.

{{< img src="tracing/visualization/service/dependencies_section.png" alt="Service page dependency map" style="width:100%;">}}

**Note**: [Service overrides][3] display along the edges (connecting lines) between nodes in the dependency map to keep visibility over the actual remote service, database, or queue the service is interacting with.

### Investigating a specific service dependency

Click on a dependency service node to investigate one of the service's dependencies. In the side panel, request count, errors, and latency metrics are scoped to requests going from the service to the downstream dependency.

Use the following table to see which resources are invoked in client calls from the service to the downstream dependency. For instance, if the service is calling a database, see the breakdown of queries that are made to the database, and use the table to identify slow or failing queries.

{{< img src="tracing/visualization/service/dependencies_side_panel.png" alt="Service page service dependency map" style="width:100%;">}}

[1]: /tracing/metrics/metrics_namespace/
[2]: /tracing/services/inferred_services/
[3]: /tracing/guide/service_overrides/
{{< /site-region >}}

## Additional sections

### Deployments
A service configured with version tags will show versions in the Deployment tab. The version section shows all versions of the service that were active during the selected time interval, with active versions at the top.

By default, you can see:
* The version names deployed for this service over the timeframe.
* The times at which traces that correspond to this version were first and last seen.
* An Error Types indicator, which shows how many types of errors appear in each version that did not appear in the immediately previous version.

    **Note**: This indicator shows errors that were not seen in traces from the previous version. It doesn't mean that this version necessarily introduced these errors. Looking into new error types can be a great way to begin investigating errors.

* Requests per second.
* Error rate as a percentage of total requests.

You can add columns to or remove columns from this overview table and your selections will be saved. The additional available columns are:

* Endpoints that are active in a version that were not in the previous version.
* Time active, showing the length of time from the first trace to the last trace sent to Datadog for that version.
* Total number of Requests.
* Total number of Errors.
* Latency measured by p50, p75, p90, p95, p99, or max.

{{< img src="tracing/visualization/service/deployments_1.png" alt="Deployments" style="width:90%;">}}

Read more about Deployments [on the service page][12].

### Error Tracking
View issues on your service, which are similar errors aggregated together to turn a noisy stream of errors into manageable issues and help you assess the impact of your service's errors. Read more about issues in [Error Tracking][4].

This tab has overview graphs that show which resources have the most issues and a list of the most common issues occurring in your service. Click on an issue in the list to see details in a side panel, including its stack trace, related code versions, and total error occurrences since inception.

{{< img src="tracing/visualization/service/error_tracking_side_panel_1.jpg" alt="Error Tracking tab" style="width:90%;">}}

### Security
Understand the security posture of the service, including known vulnerabilities exposed in the service's libraries and security signals on your service, which are automatically created when Datadog detects application attacks impacting your services. The signals identify meaningful threats for you to review instead of assessing each individual attack attempt. Read more about [App and API Protection][18].

The top section of the security tab has overview graphs that show the number and severity of vulnerabilities, a timeline of attacks, the types of attacks, and attacker information (client IP or authenticated user).

The next section of the panel lists all the vulnerabilities and signals concerning the service. Click on a security vulnerability to open a side panel with relevant details to investigate further and remediate the vulnerability. Click on a security signal to get information about what the detected threat is and what actions you can take to remediate it.

{{< img src="tracing/visualization/service/security_tab_1.jpg" alt="Security" style="width:90%;">}}

### Databases
View the list of downstream database dependencies identified by Database Monitoring and identify latency or load outliers.
[Learn more about connecting DBM and APM][21].

{{< img src="tracing/visualization/service/databases_tab_1.png" alt="Databases" style="width:90%;">}}

### Infrastructure
If your service is running on Kubernetes, you can see an Infrastructure tab on the Service Page. The live Kubernetes Pods table displays detailed information on your pods, such as if memory usage is close to its limit, and allows you to improve resource allocation by seeing if provisioned compute resources exceed what is required for optimal application performance.

{{< img src="tracing/visualization/service/infra_pods.png" alt="Kubernetes Pods" style="width:90%;">}}

The Kubernetes Metrics section contains a high level summary of your infrastructure health for the selected time period, and includes CPU, Memory, Network, and Disk metrics.

{{< img src="tracing/visualization/service/infra_metrics_1.png" alt="Kubernetes Metrics" style="width:90%;">}}

For non-Kubernetes environments (such as host-based installation), see the [Unified Service Tagging documentation][13].

### Runtime Metrics
If runtime metrics are enabled in the tracing client, you'll see a Runtime metrics tab corresponding to the runtime language of your service. Read more in [Runtime Metrics][14].

{{< img src="tracing/visualization/service/runtime_metrics_1.png" alt="Runtime Metrics" style="width:90%;">}}

### Profiling
You'll see a Profiling tab if the [Continuous Profiler][15] is set up for your service.

Use the information in the **Profiling** tab to correlate a latency and throughput change to a code performance change.

In this example, you can see how latency is linked to a lock contention increase on `/GET train` that is caused by the following line of code:

```java
Thread.sleep(DELAY_BY.minus(elapsed).toMillis());
```

{{< img src="profiler/apm_service_page_pivot_to_contention_comparison_1.mp4" alt="Pivoting from APM service page to Profiling comparison page to find the line of code causing latency" video=true >}}

### Memory Leaks
If you set up the [Continuous Profiler][15] and the service is running in a containerized environment, the [Memory Leaks][24] tab becomes available.

It guides you through a workflow for identifying potential memory leaks and shows the most actionable data.

{{< img src="profiler/apm_service_page_memory_leaks.png" alt="Memory Leaks" style="width:90%;">}}

### Traces
View the list of traces associated with the service in the traces tab, which is already filtered on your service, environment, and operation name. Drill down to problematic spans using core [facets][16] such as status, resource, and error type. For more information, click a span to view a flame graph of its trace and more details.

{{< img src="tracing/visualization/service/traces_1.png" alt="Traces" style="width:90%;">}}

### Log patterns
View common patterns in your service's logs, and use facets like status in the search bar to filter the list of patterns. Click on a pattern to open the side panel to view more details, such as what events triggered the cascade. Read more in [Log patterns][17].

{{< img src="tracing/visualization/service/log_patterns_1.png" alt="Log patterns" style="width:90%;">}}

### Costs
Visualize the cost associate with your service's infrastructure used in the Costs tab.
[Learn More about Cloud Cost Management][22].

{{< img src="tracing/visualization/service/costs_tab_1.png" alt="Costs" style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/
[2]: /tracing/services/resource_page/
[3]: /monitors/types/apm/
[4]: /tracing/error_tracking/
[5]: /service_management/service_level_objectives/
[6]: /service_management/incident_management/
[7]: /watchdog/
[8]: /tracing/metrics/metrics_namespace/
[10]: /dashboards/
[11]: /tracing/glossary/#resources
[12]: /tracing/services/deployment_tracking/#versions-deployed
[13]: /getting_started/tagging/unified_service_tagging/?tab=systemmetrics#non-containerized-environment
[14]: /tracing/metrics/runtime_metrics/
[15]: /profiler/
[16]: /tracing/trace_explorer/query_syntax/#facets
[17]: https://www.datadoghq.com/blog/log-patterns/
[18]: /security/application_security/how-it-works/
[19]: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
[21]: /database_monitoring/connect_dbm_and_apm/
[22]: /cloud_cost_management/
[23]: https://app.datadoghq.com/services
[24]: /profiler/guide/solve-memory-leaks/
