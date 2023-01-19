---
title: Service Page
kind: documentation
aliases:
- /tracing/visualization/service/
further_reading:
- link: "/tracing/trace_collection/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/services/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "/tracing/services/resource_page/"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "/tracing/trace_explorer/trace_view/"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
- link: "https://www.datadoghq.com/blog/datadog-clipboard/"
  tag: "Blog"
  text: "Add an APM service page url to your clipboard"
- link: "https://www.datadoghq.com/blog/apm-security-view/"
  tag: "Blog"
  text: "Gain visibility into risks, vulnerabilities, and attacks with APM Security View"
---

{{< img src="tracing/visualization/service/overview_service_page.png" alt="Detailed service page" style="width:100%;">}}

## Overview

Selecting a service on the services page leads you to the detailed service page. A service is a set of processes that do the same job - for example a web framework or database (read more about how services are defined in [Getting Started with APM][1]).

Consult on this page:

* [Service monitor states](#service-monitor)
* [Summary cards and Watchdog Insights](#summary-cards)
* [Out-of-the-box graphs](#out-of-the-box-graphs)
* [Resources associated to this service][2]
* [Additional tabs](#additional-tabs)
    *  [Deployments](#deployments), [Error Tracking](#error-tracking), [Traces](#traces), [Security](#security), and more

## Service monitor

Datadog proposes a list of monitors depending on your service type:

{{< img src="tracing/visualization/service/service_monitors.png" alt="Service Monitors"  style="width:90%;">}}

Enable them directly or create your own [APM monitors][3].

**Note**: Tag any monitor with `service:<SERVICE_NAME>` to attach it to an APM service.

## Summary Cards

The service page features summary cards with highlights on your service health. Easily spot potential faulty deployments, click into the card to view details or traces of the latest deployment, or view all deployments on this service. See new issues flagged on your service through our integration with [Error Tracking][4], where errors are automatically aggregated into issues.

{{< img src="tracing/visualization/service/summary_cards.png" alt="Summary cards" style="width:100%;">}}

Our [Service Level Objectives (SLOs)][5] and [Incidents][6] summaries allow you to monitor the status of SLOs and ongoing incidents, so that you can keep performance goals top of mind. Click the cards to create a new SLO on the service or declare an incident. The [security signals][18] summary highlights how your services react to application threats.

{{< img src="tracing/visualization/service/watchdog_insights.png" alt="Watchdog Insights"  style="width:70%;">}}

The [Watchdog Insights][7] carousel surfaces anomalies detected on specific tags, enabling you to drill down straight to the root cause of an issue. 

## Out-of-the-box graphs

Datadog provides [out-of-the-box graphs][8] for any given Service:

* Requests - Choose to display:
    *  The **Total amount of requests and errors**
    *  The amount of **Requests and errors per second**
* Latency -  Choose to display:
    *  The Avg/p75/p90/p95/p99/Max latency of your traced requests
    *  The **Latency distribution**	
    *  The **Apdex score** for web services; [learn more about Apdex][9]
* Error - Choose to display:
    * The **Total amount of errors**
    * The amount of **Errors per second**
    * The **% Error Rate**
* Dependency Map:
    * The **Dependency Map** showing upstream and downstream services.
* **Sub-services**: When there are multiple services involved, a fourth graph (in the same toggle option as the Dependency Map) breaks down your **Total time spent**/**%of time spent**/**Avg time per request** of your service by *services* or *type*. 
    
    This represents the total, relative, and average time spent by traces in downstream services from the current service to the other *services* or *type*.
    
    **Note**: For services like *Postgres* or *Redis*, which are "final" operations that do not call other services, there is no sub-services graph.
[Watchdog][7] performs automatic anomaly detection on the Requests, Latency, and Error graphs. If there is an anomaly detected, there will be an overlay on the graph and a Watchdog icon you can click for more details in a side panel.

{{< img src="tracing/visualization/service/out_of_the_box_graphs.jpg" alt="Out of the box service graphs"  style="width:100%;">}}

### Export

On the upper-right corner of each graph click on the arrow in order to export your graph into a pre-existing [dashboard][10]:

{{< img src="tracing/visualization/service/save_to_dashboard.png" alt="Save to dashboard" style="width:60%;">}}

## Resources

See Requests, Latency, and Error graphs broken down by resource to identify problematic resources. Resources are particular actions for your services (typically individual endpoints or queries). Read more in [Getting Started with APM][1]. 

Below, there’s a list of [resources][11] associated with your service. Sort the resources for this service by requests, latency, errors, and time, to identify areas of high traffic or potential trouble. Note that these metric columns are configurable (see image below).

{{< img src="tracing/visualization/service/resources_tab.jpg" alt="Resources"  style="width:100%;">}}

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

{{< img src="tracing/visualization/service/resource_columns.png" alt="Resource columns"  style="width:40%;">}}

## Additional Tabs

### Deployments
A service configured with version tags will show versions in the Deployment tab. The version section shows all versions of the service that were active during the selected time interval, with active versions at the top.

By default, you can see:
* The version names deployed for this service over the timeframe.
* The times at which traces that correspond to this version were first and last seen.
* An Error Types indicator, which shows how many types of errors appear in each version that did not appear in the immediately previous version.

    **Note**: This indicator shows errors that were not seen in traces from the previous version. It doesn’t mean that this version necessarily introduced these errors. Looking into new error types can be a great way to begin investigating errors.

* Requests per second.
* Error rate as a percentage of total requests.

You can add columns to or remove columns from this overview table and your selections will be saved. The additional available columns are:

* Endpoints that are active in a version that were not in the previous version.
* Time active, showing the length of time from the first trace to the last trace sent to Datadog for that version.
* Total number of Requests.
* Total number of Errors.
* Latency measured by p50, p75, p90, p95, p99, or max.

{{< img src="tracing/visualization/service/deployments.png" alt="Deployments"  style="width:90%;">}}

Read more about Deployments [on the service page][12].

### Error Tracking
View issues on your service, which are similar errors aggregated together to turn a noisy stream of errors into manageable issues and help you assess the impact of your service’s errors. Read more about issues in [Error Tracking][4].

This tab has overview graphs that show which resources have the most issues and a list of the most common issues occurring in your service. Click on an issue in the list to see details in a side panel, including its stack trace, related code versions, and total error occurrences since inception.

{{< img src="tracing/visualization/service/error_tracking_side_panel.jpg" alt="Error Tracking tab"  style="width:90%;">}}

### Security
Understand the security posture of the service, including known vulnerabilities exposed in the service’s libraries and security signals on your service, which are automatically created when Datadog detects application attacks impacting your services. The signals identify meaningful threats for you to review instead of assessing each individual attack attempt. Read more about [Application Security][18].

The top section of the security tab has overview graphs that show the number and severity of vulnerabilities, a timeline of attacks, the types of attacks, and attacker information (client IP or authenticated user). 

The next section of the panel lists all the vulnerabilities and signals concerning the service. Click on a security vulnerability to open a side panel with relevant details to investigate further and remediate the vulnerability. Click on a security signal to get information about what the detected threat is and what actions you can take to remediate it.

{{< img src="tracing/visualization/service/security_tab.jpg" alt="Security" style="width:90%;">}}

### Infrastructure
If your service is running on Kubernetes, you can see an Infrastructure tab on the Service Page. The live Kubernetes Pods table displays detailed information on your pods, such as if memory usage is close to its limit, and allows you to improve resource allocation by seeing if provisioned compute resources exceed what is required for optimal application performance. 

{{< img src="tracing/visualization/service/infra_pods.png" alt="Kubernetes Pods"  style="width:90%;">}}

The Kubernetes Metrics section contains a high level summary of your infrastructure health for the selected time period, and includes CPU, Memory, Network, and Disk metrics.

{{< img src="tracing/visualization/service/infra_metrics.png" alt="Kubernetes Metrics"  style="width:90%;">}}

For non-Kubernetes environments (such as host-based installation), see the [Unified Service Tagging documentation][13].

### Runtime Metrics
If runtime metrics are enabled in the tracing client, you’ll see a Runtime metrics tab corresponding to the runtime language of your service. Read more in [Runtime Metrics][14].

{{< img src="tracing/visualization/service/runtime_metrics.png" alt="Runtime Metrics"  style="width:90%;">}}

### Profiling
You'll see a Profiling tab if the [Continuous Profiler][15] is set up for your service. Summary details like versions available and runtime language are at the top. Below are out-of-the-box profiling metrics by version, endpoint, and method to help you identify and debug resource-intensive methods. Click on any graph to view related traces, logs, and other data, or open a flame graph to inspect the code profile. [Learn more about APM and the Continuous Profiler][15]. 

{{< img src="tracing/visualization/service/profiler.jpg" alt="Profiling"  style="width:90%;">}}

### Traces
View the list of traces associated with the service in the traces tab, which is already filtered on your service, environment, and operation name. Drill down to problematic spans using core [facets][16] such as status, resource, and error type. For more information, click a span to view a flame graph of its trace and more details.

{{< img src="tracing/visualization/service/traces.png" alt="Traces"  style="width:90%;">}}

### Logs
View common patterns in your service’s logs, and use facets like status in the search bar to filter the list of patterns. Click on a pattern to open the side panel to view more details, such as what events triggered the cascade. Read more in [Log Patterns][17].

{{< img src="tracing/visualization/service/log_patterns.png" alt="Log patterns"  style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/
[2]: /tracing/services/resource_page/
[3]: /monitors/create/types/apm/
[4]: /tracing/error_tracking/
[5]: /monitors/service_level_objectives/
[6]: /monitors/incident_management/
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
