---
title: Create a Dashboard to track and correlate APM metrics
kind: guide
disable_toc: true
further_reading:
- link: "/tracing/guide/alert_anomalies_p99_database/"
  tag: "3 mins"
  text: "Alert on anomalous p99 latency of a database service"
- link: "tracing/guide/week_over_week_p50_comparison/"
  tag: "2 mins"
  text: "Compare a service’s latency to the previous week"
- link: "/tracing/guide/slowest_request_daily/"
  tag: "3 mins"
  text: "Debug the slowest trace on the slowest endpoint of a web service"
- link: "tracing/guide/add_span_md_and_graph_it/"
  tag: "7 mins"
  text: "Add span tags and slice and dice your application performance"
- link: "tracing/guide/"
  tag: ""
  text: "All guides"
---
_4 minutes to complete_

{{< img src="tracing/guide/apm_dashboard/dashboard_7.gif" alt="" responsive="true" style="width:90%;">}}

Datadog APM allows you to create dashboards based on your business priorities and metrics important to you. You can create widgets on these dashboards to keep track of any traditional infrasctructure metric like host memory usage alongside critical APM metrics based on throughput, latency and error rate to correlate these and identify when a database is slowing down on account of low memory. Next to these you can track latency of the user experience of your top customers or largest transactions and alongside these keep track of the throughput of your main web-server ahead of any major events like Black Friday.

In this example we'll create a new dashboard and add widgets to it in three ways: by copying an existing APM graph, by creating it manually and by exporting a Trace Analytics query. Combined, these widgets will give us a holisitc view of the throughput to our main web service, a breakdown of the most common errors, a combination of runtime and request metrics to quickly investigate outages and finally a list of the top customers by latency.

1. **Open the Service List page** and choose a central service in your application.

    In this example we'll choose the `web-store` service which is the entry-point service that calls other services in our stack.

2. **Find the Total Requests Graph** and click on the `export` button on the top right to choose `Export to Dashboard`. **Click `New Timeboard`**.

    {{< img src="tracing/guide/apm_dashboard/dashboard_2.png" alt="" responsive="true" style="width:90%;">}}

3. **Click on `View Dashboard`** in the success message. 

    In the new dashboard we can now see the `Hit/error count on service` graph. This shows us the entire throughput of our core service as well as the total amount of errors there. This is the start of our dashboard but there are still many more metrics to add.

    {{< img src="tracing/guide/apm_dashboard/dashboard_3.png" alt="" responsive="true" style="width:90%;">}}

    **Note**: If you click on the pencil icon to edit this graph you'll be able to see what precise metrics are being used. These are a great place to start adding your own metrics.

4. **Click on the `Add graph` placeholder tile** on the dashboard space and then **Drag a `Timeseries` to this space**.

    This is the dashboard widget edit screen. It empowers you to create any type of visualization across all of the metrics available to you. You can always find more documentation about it by clicking [Graph Primer][1]. We'll now add a breakdown of errors by status codes.

5. **Click on the `system.cpu.user` box** and choose the metric and parameters relavant for you.
    
    In this case, we're looking at:
    - Metric `trace.rack.reqesusts.erorrs`: this is the Ruby Rack total set of erroneous requests.
    - from `service:web-store`: this is the main service in our stack, it is a Ruby service and all the information in the chart with come from it.
    - sum by `http.status_code`: this means we break down the chart by the error code.

    {{< img src="tracing/guide/apm_dashboard/dashboard_4.gif" alt="" responsive="true" style="width:90%;">}}

    This specific breakdown is just one example of the many you get to choose. It is important to note that any metric that starts with `trace.` contains APM information. We'll now proceed to add a more complex widget to our board based on these metrics.

6. **Drag another timeseries to the placeholder tile**
    
    In this example we'll add two different types of metrics to a graph: a `trace.*` metrics and a `runtime.*` metric. Combined, these metrics allow us to correlate information from our request performance and our code. Specificallly, we'll chart the latency of a service next to the thread count, knowing that latency spikes might be assocaited with an increase in the thraed count.
    - Metric `runtime.ruby.thread_count`: thread count taken from the Ruby runtime metrics.
    - from `service:web-store`: the main web service in our app.
    Click on the `Graph additional: Metrics` to add another metric to the chart.
    - Metric `trace.rack.request.duration.by.service.99p`: this is the 99th percentile of latency of requests in our service.
    - from `service:web-store`: the main web service in our app, this makes sure that the metrics displayed revolve around the same context.

    {{< img src="tracing/guide/apm_dashboard/dashboard_5.gif" alt="" responsive="true" style="width:90%;">}}

    This can now easily show whether a spike in latency is assocaited with a spike in the ruby thread count, immediately pointing out the cause for latency allowing for fast resolution.

7. **Go to Trace Analytics**. 
    
    In this example we'll query for the latency across our application, break it down by merchants on our platform and view the top-10 merchants with highest latency.
    
    From the Trace Analytics screen we can easily export the graph to the dashboard and view it there.

    {{< img src="tracing/guide/apm_dashboard/dashboard_6.gif" alt="" responsive="true" style="width:90%;">}}

8. **Return to your dashboard**.

    You can now see multiple widget providing you with deep observability into your application from both a technical perspective and a business one. But this is only the start of what you can do: add infrastructure metrics, use multiple types of visualizations and add calculations and projections.

    With the dashboard you can also explore related events.

9. **Click on the `Search Events or Logs`** button and add search for a relevant event stream.
    
    **Note**: in this example we use Ansible, your [event stream][2] might be different.

    {{< img src="tracing/guide/apm_dashboard/dashboard_1.png" alt="" responsive="true" style="width:90%;">}}

    Here we can the full view of our dashboard alongside any recent events that have happen such as deployments, task completions or monitors alerting. We can quickly correlated these events happening to the metrics we've set up in the dashboard.

    One final capability to make sure you use are template variables. There are a set of values that dynamically control the widgets on the dashboards that every users can use without having to edit the widgets themselves.

10. **Click on `Add Template Variables`** in the control panel. **Click `Add Variable +`**, name the template variable and choose the tag that the variable will control.

    In this example we'll add a template variable for `Region` and see how the dashboard behaves across `us-east1` and `europe-west-4`, out two primary areas of opeation.

    {{< img src="tracing/guide/apm_dashboard/dashboard_8.gif" alt="" responsive="true" style="width:90%;">}}

    You can now add this template variable to each of the graphs.

    {{< img src="tracing/guide/apm_dashboard/dashboard_9.png" alt="" responsive="true" style="width:90%;">}}

    When you change the value in the control panel, you'll see all the values update in the dashboard.

    {{< img src="tracing/guide/apm_dashboard/dashboard_10.gif" alt="" responsive="true" style="width:90%;">}}

    Be sure to explore all the metrics available to you and take full advantage of the Datadog 3 pillars of observability. You can easily turn this basic dashboard into a powerful tool that is a one-stop-shop for monitoring and observability in your organization.

    {{< img src="tracing/guide/apm_dashboard/dashboard_7.gif" alt="" responsive="true" style="width:90%;">}}



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://docs.datadoghq.com/graphing
[2]: https://docs.datadoghq.com/graphing/event_stream
