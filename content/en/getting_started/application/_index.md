---
title: Getting Started in Datadog
kind: documentation
further_reading:
    - link: 'https://learn.datadoghq.com/course/view.php?id=2'
      tag: 'Learning Center'
      text: 'Introduction to Datadog'
    - link: 'https://www.datadoghq.com/blog/datadog-quick-nav-menu/'
      tag: 'Blog'
      text: 'Introducing the Datadog quick nav menu'
      
---

This page gives a high level overview of the capabilities for the [Datadog site][1].

**Note**: The navigation of the Datadog application switches based on browser width. It's possible to get three different types of navigation. To change navigation types, adjust the width of your browser.

## Integrations

{{< img src="getting_started/integrations.png" alt="integrations"  >}}

- Datadog has over {{< translate key="integration_count" >}} integrations [officially listed][2].
- Custom integrations are available [via the Datadog API][3].
- The Agent is [open source][4].
- Once integrations have been configured, all data is treated the same throughout Datadog, whether it is living in a datacenter or in an online service.

## Log Management

{{< img src="getting_started/logs.png" alt="logs"  >}}

[Datadog Log Management][5] lets you send and process every log produced by your applications and infrastructure. You can observe your logs in real-time using the Live Tail, without indexing them. You can ingest all of the logs from your applications and infrastructure, decide what to index dynamically with filters, and then store them in an archive.

## APM & Distributed Tracing

{{< img src="getting_started/apm.png" alt="apm dashboard"  >}}

[Datadog Application Performance Monitoring][6] (APM or tracing) provides you with deep insight into your application’s performance—from automatically generated dashboards for monitoring key metrics, like request volume and latency, to detailed traces of individual requests—side by side with your logs and infrastructure monitoring. When a request is made to an application, Datadog can see the traces across a distributed system, and show you systematic data about precisely what is happening to this request.

## Infrastructure

{{< img src="getting_started/infrastructure.png" alt="infrastructure"  >}}

- All machines show up in the [infrastructure list][7].
- You can see the tags applied to each machine. Tagging allows you to indicate which machines have a particular purpose.
- Datadog attempts to automatically categorize your servers. If a new machine is tagged, you can immediately see the stats for that machine based on what was previously set up for that tag. [Read more on tagging][8].

## Host map

{{< img src="getting_started/hostmap-overview.png" alt="hostmap overview"  >}}

The [host map][9] can be found under the Infrastructure menu. It offers the ability to:

- Quickly visualize your environment
- Identify outliers
- Detect usage patterns
- Optimize resources

To learn more about the host map, visit the [host map documentation][9].

## Events

{{< img src="getting_started/event_stream.png" alt="Event stream"  >}}

[The Event Stream][10] is based on the same conventions as a blog:

- Any event in the stream can be commented on.
- Can be used for distributed [teams][11] and maintaining the focus of an investigation.
- You can [filter][12] by `user`, `source`, `tag`, `host`, `status`, `priority`, and `incident`.

For each incident, users can:

- Increase/decrease priority
- Comment
- See similar incidents
- [@ notify team members][13], who receive an email
- `@support-datadog` to ask for [assistance][14]

{{< img src="getting_started/event_stream_event.png" alt="event stream event"  style="width:70%;">}}

## Dashboards

{{< img src="getting_started/dashboard.png" alt="dashboard"  >}}

[Dashboards][15] contain graphs with real-time performance metrics.

- Synchronous mousing across all graphs in a [screenboard][16].
- Vertical bars are events. They put a metric into context.
- Click and drag on a graph to zoom in on a particular timeframe.
- As you hover over the graph, the event stream moves with you.
- Display by zone, host, or total usage.
- Datadog exposes a JSON editor for the graph, allowing for [arithmetic][17] and [functions][18] to be applied to metrics.
- Share a graph snapshot that appears in the stream.
- Graphs can be embedded in an iframe. This enables you to give a 3rd party access to a live graph without also giving access to your data or any other information.

## Monitors

[Monitors][19] provide alerts and notifications based on metric thresholds, integration availability, network endpoints, and more.

- Use any metric reporting to Datadog
- Set up multi-alerts (by device, host, etc.)
- Use `@` in alert messages to direct notifications to the right people
- Schedule downtimes to suppress notifications for system shutdowns, off-line maintenance, etc.

{{< img src="getting_started/application/metric_monitor.png" alt="alert setup" >}}

## Network Performance Monitoring

{{< img src="getting_started/npm.png" alt="npm"  >}}

Datadog [Network Performance Monitoring][20] (NPM) gives you visibility into your network traffic across any tagged object in Datadog: from containers to hosts, services, and availability zones. Group by anything—from datacenters to teams to individual containers. Use tags to filter traffic by source and destination. The filters then aggregate into flows, each showing traffic between one source and one destination, through a customizable network page and network map. Each flow contains network metrics such as throughput, bandwidth, retransmit count, and source/destination information down to the IP, port, and PID levels. It then reports key metrics such as traffic volume and TCP retransmits.

## Real User Monitoring

{{< img src="getting_started/rum.png" alt="rum"  >}}

Datadog [Real User Monitoring][21] (RUM) enables you to visualize and analyze the real-time activities and experiences of individual users to prioritize engineering work on the features with the highest business impact.
You can visualize load times, frontend errors, and page dependencies, and then correlate business and application metrics so that you can troubleshoot quickly with application, infrastructure, and business metrics in a single dashboard.

## Serverless

[Serverless][22] lets you write event-driven code and upload it to a cloud provider, which manages all of the underlying compute resources. Datadog Serverless brings together metrics, traces, and logs from your AWS Lambda functions running serverless applications into one view, so that you can optimize performance by filtering to functions that are generating errors, high latency, or cold starts.

## Security Monitoring

{{< img src="getting_started/security.png" alt="security"  >}}

Datadog [Security Monitoring][23] automatically detects threats to your application or infrastructure. For example, a targeted attack, an IP communicating with your systems matching a threat intel list, or an insecure configuration. These threats are surfaced in Datadog as Security Signals and can be correlated and triaged in the Security Explorer.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: http://www.datadoghq.com/integrations
[3]: /api/
[4]: https://github.com/DataDog/dd-agent
[5]: /logs/
[6]: /tracing/
[7]: /infrastructure/
[8]: /getting_started/tagging/
[9]: /infrastructure/hostmap/
[10]: /events/
[11]: /account_management/users/
[12]: https://www.datadoghq.com/blog/filter-datadog-events-stream-pinpoint-events-infrastructure
[13]: /events/#@-notifications
[14]: /help/
[15]: /dashboards/
[16]: /dashboards/screenboard/
[17]: /dashboards/functions/
[18]: https://www.datadoghq.com/blog/rank-filter-performance-monitoring-metrics-top-function
[19]: /monitors/
[20]: /network_monitoring/performance
[21]: /real_user_monitoring/
[22]: /infrastructure/serverless/
[23]: /security_monitoring/
