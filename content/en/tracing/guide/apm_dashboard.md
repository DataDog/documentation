---
title: Create a Dashboard to track and correlate APM metrics
kind: guide
further_reading:
- link: "/tracing/guide/alert_anomalies_p99_database/"
  tag: "3 mins"
  text: "Alert on anomalous p99 latency of a database service"
- link: "/tracing/guide/week_over_week_p50_comparison/"
  tag: "2 mins"
  text: "Compare a service's latency to the previous week"
- link: "/tracing/guide/slowest_request_daily/"
  tag: "3 mins"
  text: "Debug the slowest trace on the slowest endpoint of a web service"
- link: "/tracing/guide/"
  tag: ""
  text: "All guides"
---

_4 minutes to complete_

{{< img src="tracing/guide/apm_dashboard/dashboard_7_cropped.mp4" alt="dashboard 7" video="true" style="width:90%;">}}

Datadog APM allows you to create dashboards based on your business priorities and metrics important to you:
You can create widgets on these dashboards to keep track of any traditional infrastructure, logs and custom metrics like host memory usage alongside critical APM metrics based on throughput, latency, and error rate for correlation.
Next to these you can track latency of the user experience of your top customers or largest transactions and alongside these keep track of the throughput of your main web server ahead of any major events like Black Friday.

This guides walks you through adding trace metrics to a dashboard, correlating them with infrastructure metrics and then how to export an Analytics query. This guide covers adding widgets to the dashboard in three ways:

* Copying an existing APM graph _( Step 1. 2. & 3.)_
* Creating it manually. _(Step 4. & 5. )_
* Exporting an Analytics query. _(Step 7.)_

1. **Open the [Service Catalog][1]** and choose the `web-store` service.

2. **Find the Total Requests Graph** and click on the `export` button on the top right to choose `Export to Dashboard`. **Click `New Timeboard`**.

    {{< img src="tracing/guide/apm_dashboard/dashboard_2_cropped.png" alt="dashboard 2" style="width:90%;">}}

3. **Click on `View Dashboard`** in the success message.

    In the new dashboard, the `Hit/error count on service` graph for the `web-store` service is now available. It shows the entire throughput of this service as well as its total amount of errors.

    {{< img src="tracing/guide/apm_dashboard/dashboard_3_cropped.png" alt="dashboard 3" style="width:90%;">}}

    **Note**: You can click on the pencil icon to edit this graph and see what precise metrics are being used.

4. **Click on the `Add graph` placeholder tile** on the dashboard space and then **Drag a `Timeseries` to this space**.

    This is the dashboard widget edit screen. It empowers you to create any type of visualization across all of the metrics available to you. See the [Timeseries widget documentation][2] to learn more.

5. **Click on the `system.cpu.user` box** and choose the metric and parameters relevant to you, in this example:

    | Parameter | Value                         | Description                                                                                                          |
    | ------    | -----                         | -----                                                                                                                |
    | `metric`  | `trace.rack.requests.errors` | The Ruby Rack total set of erroneous requests.                                                                       |
    | `from`    | `service:web-store`           | The main service in this example stack, it is a Ruby service and all the information in the chart with come from it. |
    | `sum by`  | `http.status_code`            | Breaking down the chart by http status codes.                                                                        |

    {{< img src="tracing/guide/apm_dashboard/dashboard_4.mp4" video="true" alt="dashboard 4" style="width:90%;">}}

    This specific breakdown is just one example of the many can choose. It is important to note that any metric that starts with `trace.` contains APM information. See the [APM metric documentation to learn more][3].

6. **Drag another timeseries to the placeholder tile**

    In this example two different types of metrics are added to a graph, a `trace.*` and a `runtime.*` one. Combined, these metrics allow you to correlate information between requests and code runtime performances. Specifically, the latency of a service is displayed next to the thread count, knowing that latency spikes might be associated with an increase in the thread count:

    1. First, add `trace.rack.requests.errors` metric into the widget:

        | Parameter | Value                                        | Description                                                                                                          |
        | ------    | -----                                        | -----                                                                                                                |
        | `metric`  | `trace.rack.request.duration.by.service.99p` | The 99th percentile of latency of requests in our service.                                                           |
        | `from`    | `service:web-store`                          | The main service in this example stack, it is a Ruby service and all the information in the chart with come from it. |

    2. Then click on the `Graph additional: Metrics` to add another metric to the chart:

        | Parameter | Value                       | Description                                                                                                          |
        | ------    | -----                       | -----                                                                                                                |
        | `metric`  | `runtime.ruby.thread_count` | Thread count taken from the Ruby runtime metrics.                                                                    |
        | `from`    | `service:web-store`         | The main service in this example stack, it is a Ruby service and all the information in the chart with come from it. |

        {{< img src="tracing/guide/apm_dashboard/dashboard_5.mp4" alt="dashboard_5" video="true" style="width:90%;">}}

    This setup can show whether a spike in latency is associated with a spike in the ruby thread count, immediately pointing out the cause for latency allowing for fast resolution.

7. **Go to [Analytics][4]**.

    This example shows how to query the latency across the example application: breaking it down by merchants on the platform and view the top-10 merchants with highest latency. From the Analytics screen, export the graph to the dashboard and view it there:

    {{< img src="tracing/guide/apm_dashboard/dashboard_6_cropped.mp4" video="true" alt="dashboard 6" style="width:90%;">}}

8. **Return to your dashboard**.

    Multiple widgets can now be seen providing deep observability into the example application from both a technical perspective and a business one. But this is only the start of what you can do: add infrastructure metrics, use multiple types of visualizations and add calculations and projections.

    With the dashboard you can also explore related events.

9. **Click on the `Search Events or Logs`** button and add search for a relevant event explorer. **Note**: in this example Ansible is used, your [event explorer][5] might be different.

    {{< img src="tracing/guide/apm_dashboard/dashboard_1_cropped.png" alt="dashboard 1" style="width:90%;">}}

    Here, alongside the view of our dashboard, recent events that have happened (in datadog or in external services like Ansible, Chef, etc.) can be seen such as: deployments, task completions, or monitors alerting. These events can then be correlated to what is happening to the metrics setup in the dashboard.

    Finally, make sure to use template variables. These are a set of values that dynamically control the widgets on the dashboards that every user can use without having to edit the widgets themselves. For more information, see the [Template Variable][6] documentation.

10. Click on **Add Variable** in the header. Choose the tag that the variable will control, and configure its name, default value, or available values.

    In this example a template variable for `Region` is added to see how the dashboard behaves across `us-east1` and `europe-west-4`, out two primary areas of operation.

    {{< img src="tracing/guide/apm_dashboard/dashboard_add_template_variable_cropped.png" alt="Add Variable popover showing field options to add variable name and variable tags" style="width:90%;">}}

    You can now add this template variable to each of the graphs:

    {{< img src="tracing/guide/apm_dashboard/dashboard_dynamic_template_variable.png" alt="Add dynamic template variables to your query, this example shows '$RG' to dynamically scope to the region template variable" style="width:90%;">}}

    When you select template variable values, all values update in the applicable widgets of the dashboard.

    Be sure to explore all the metrics available to you and take full advantage of the Datadog 3 pillars of observability. You can turn this basic dashboard into a powerful tool that is a one-stop-shop for monitoring and observability in your organization.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /dashboards/widgets/timeseries/
[3]: /tracing/metrics/metrics_namespace/
[4]: https://app.datadoghq.com/apm/traces?viz=timeseries
[5]: /events/
[6]: /dashboards/template_variables/
