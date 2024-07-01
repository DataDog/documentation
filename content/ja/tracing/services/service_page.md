---
title: Service Page
kind: documentation
aliases:
- /tracing/visualization/service/
further_reading:
- link: /tracing/trace_collection/
  tag: Documentation
  text: Learn how to setup APM tracing with your application
- link: /tracing/service_catalog/
  tag: Documentation
  text: Discover and catalog the services reporting to Datadog
- link: /tracing/services/resource_page/
  tag: Documentation
  text: Dive into your resource performance and traces
- link: /tracing/trace_explorer/trace_view/
  tag: Documentation
  text: Understand how to read a Datadog Trace
- link: "https://www.datadoghq.com/blog/datadog-clipboard/"
  tag: Blog
  text: Add an APM service page URL to your clipboard
- link: "https://www.datadoghq.com/blog/apm-security-view/"
  tag: Blog
  text: Gain visibility into risks, vulnerabilities, and attacks with APM Security View
algolia:
  tags: [service page]
---

{{< img src="tracing/visualization/service/overview_service_page_1.png" alt="Detailed service page" style="width:100%;">}}

## Overview

Selecting a service on the Service Catalog leads you to the detailed service page. A service is a set of processes that do the same job - for example a web framework or database (read more about how services are defined in [Getting Started with APM][1]).

Consult on this page:

* [Service health](#service-health) (private beta)
* [Service monitor states](#service-monitor)
* [Watchdog Insights](#watchdog-insights)
* [Summary cards](#summary-cards)
* [Dependencies](#dependencies)
* [Out-of-the-box graphs](#out-of-the-box-graphs)
* [Resources associated to this service][2]
* [Additional sections](#additional-sections)
    *  [Deployments](#deployments), [Error Tracking](#error-tracking), [Traces](#traces), [Security](#security), and more

## Service health

{{< callout header="Opt in to the private beta!" url="https://www.datadoghq.com/private-beta/service-health/" >}}
  Service health is in private beta. To request access, complete the form.
{{< /callout >}}

The **Service Health** panel provides a real-time summary of service signals to help you understand if a service needs your attention.

Service health considers many types of signals (including monitors, incidents, Watchdog insights, and error tracking issues) and surfaces the most critical alerts. Additionally, the Service Health panel provides links to associated incidents, which helps you to take necessary actions.

{{< img src="/tracing/services/service_page/service-health.png" alt="Service Health panel on service page showing an active incident." style="width:100%;" >}}

To access service health:

1. Go to [APM > Service Catalog][23].
2. Hover over a service and click **Full Page**.
3. Select **Service Health**.

The Service Health panel displays the status of your service as *Ok*, *Warning*, or *Alert* if at least one of the following conditions is met:

|   Status    |                         Condition                          |
|-------------|------------------------------------------------------------|
|  **Alert**  | **Monitors**: <br>- A non-muted alerting P1 monitor is triggered.<br>- A non-muted monitor with a paging integration setup (PagerDuty or Opsgenie) is triggered.<br><br>**Incidents**: <br>- An incident of any severity is active.<br><br>**Watchdog Insights**: <br>- A faulty deployment is active.<br>- An ongoing APM latency/error rate alert is active.  |
| **Warning** | **Monitors**: <br>- A non-muted alerting P2 monitor is triggered.<br>- A non-muted warning P1 monitor is triggered.<br>- A non-muted warning monitor with a paging integration setup (PagerDuty or Opsgenie) is triggered.<br><br>**Incidents**: <br>- An incident of any severity is in a stable state.<br><br>**Watchdog Insights**: <br>- An ongoing log anomaly alert is active.<br><br>**Error Tracking Issues**: <br>- A new issue (within 48 hours) requires review. |                                                                                                                                                                                                   |
|   **Ok**    |    No signal from critical or alert state is active.     |                                                                                                                                                                       ||

## Service monitor

The Service monitor panel surfaces active Monitors and Synthetics tests linked to your service.
Datadog also proposes a list of monitors depending on your service type:

{{< img src="tracing/visualization/service/service_monitors.png" alt="Service Monitors" style="width:90%;">}}

Enable them directly or create your own [APM monitors][3].

**Note**: Tag any monitor or Synthetic Test with `service:<SERVICE_NAME>` to attach it to an APM service.

## Watchdog Insights

The [Watchdog Insights][7] carousel surfaces anomalies and outliers detected on specific tags, enabling you to investigate the root cause of an issue. Insights are discovered from APM, Continuous Profiler, Log Management, and Infrastructure data that include the service tag. These insights are the same insights that appear in each of the product pages. For example, the same Log outliers on the service page can be found in the [Logs Explorer][19].

{{< img src="tracing/visualization/service/cross_product_insight_1.jpg" alt="Watchdog Insights" style="width:100%;">}}

Click on an insight to see more details, such as the time frame of the insight, related logs or traces, and suggested next steps.

{{< img src="tracing/visualization/service/watchdog_details_1.jpg" alt="Watchdog Insights details" style="width:100%;">}}

## Summary cards

The service page features summary cards with highlights on your service health. Easily spot potential faulty deployments, click into the card to view details or traces of the latest deployment, or view all deployments on this service. See new issues flagged on your service through our integration with [Error Tracking][4], where errors are automatically aggregated into issues.

{{< img src="tracing/visualization/service/summary_cards.png" alt="Summary cards" style="width:100%;">}}

Our [Service Level Objectives (SLOs)][5] and [Incidents][6] summaries allow you to monitor the status of SLOs and ongoing incidents, so that you can keep performance goals top of mind. Click the cards to create a new SLO on the service or declare an incident. The [security signals][18] summary highlights how your services react to application threats.

## Out-of-the-box graphs

Datadog provides [out-of-the-box graphs][8] for any given Service:

* Requests - Choose to display:
    *  The **Total amount of requests and errors**
    *  The amount of **Requests and errors per second**
* Latency - Choose to display:
    * The **Latency** by Version
    * The **Latency** by Percentile (Avg/p75/p90/p95/p99/p99.9/Max latency of your traced requests) as a timeseries
    * The **Historical Latency** to compare the Latency distribution with the day and week before
    * The **Latency Distribution** over the selected timeframe
    * The **Latency** by Error to evaluate the latency impact of an error on traced requests
    * The **Apdex score** for web services; [learn more about Apdex][9]
* Error - Choose to display:
    * The **Total amount of errors**
    * The amount of **Errors per second**
    * The **% Error Rate**
* Dependency Map:
    * The **Dependency Map** showing upstream and downstream services.
* **Sub-services**: When there are multiple services involved, a fourth graph (in the same toggle option as the Dependency Map) breaks down your **%of time spent** of your service by *services* or *type*.

    This represents the relative time spent by traces in downstream services from the current service to the other *services* or *type*.

    **Note**: For services like *Postgres* or *Redis*, which are "final" operations that do not call other services, there is no sub-services graph.
[Watchdog][7] performs automatic anomaly detection on the Requests, Latency, and Error graphs. If there is an anomaly detected, there will be an overlay on the graph and a Watchdog icon you can click for more details in a side panel.

{{< img src="tracing/visualization/service/out_of_the_box_graphs.jpg" alt="Out of the box service graphs" style="width:100%;">}}

### Export

On the upper-right corner of each graph click on the arrow in order to export your graph into a pre-existing [dashboard][10]:

{{< img src="tracing/visualization/service/save_to_dashboard.png" alt="Save to dashboard" style="width:60%;">}}

## Resources

See Requests, Latency, and Error graphs broken down by resource to identify problematic resources. Resources are particular actions for your services (typically individual endpoints or queries). Read more in [Getting Started with APM][1].

Below, there's a list of [resources][11] associated with your service. Sort the resources for this service by requests, latency, errors, and time, to identify areas of high traffic or potential trouble. Note that these metric columns are configurable (see image below).

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
Understand the security posture of the service, including known vulnerabilities exposed in the service's libraries and security signals on your service, which are automatically created when Datadog detects application attacks impacting your services. The signals identify meaningful threats for you to review instead of assessing each individual attack attempt. Read more about [Application Security][18].

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
[9]: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
[10]: /dashboards/
[11]: /tracing/glossary/#resources
[12]: /tracing/services/deployment_tracking/#versions-deployed
[13]: /getting_started/tagging/unified_service_tagging/?tab=systemmetrics#non-containerized-environment
[14]: /tracing/metrics/runtime_metrics/
[15]: /profiler/
[16]: /tracing/trace_explorer/query_syntax/#facets
[17]: https://www.datadoghq.com/blog/log-patterns/
[18]: /security/application_security/how-appsec-works/
[19]: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
[21]: /database_monitoring/connect_dbm_and_apm/
[22]: /cloud_cost_management/
[23]: https://app.datadoghq.com/services
