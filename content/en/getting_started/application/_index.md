---
title: Getting Started in Datadog
kind: documentation
further_reading:
    - link: 'https://learn.datadoghq.com/enrol/index.php?id=18'
      tag: 'Learning Center'
      text: 'Introduction to Datadog'
    - link: 'https://www.datadoghq.com/blog/datadog-quick-nav-menu/'
      tag: 'Blog'
      text: 'Introducing the Datadog quick nav menu'

---

This page provides a high-level overview of capabilities available on the [Datadog site][1].

## Overview

The Datadog site navigation varies based on the width of your browser. You can have up to three types of navigation. 

To change the navigation type, adjust your browser width.

## Integrations

{{< img src="getting_started/integrations.png" alt="Integrations" >}}

- Datadog has over {{< translate key="integration_count" >}} integrations [officially listed][2].
- Custom integrations are available through the [Datadog API][3].
- The Agent is [open source][4].
- Once integrations have been configured, all data is treated the same throughout Datadog, whether it is living in a datacenter or in an online service.

## Log Management

{{< img src="getting_started/logs.png" alt="Logs" >}}

[Datadog Log Management][5] lets you send and process every log produced by your applications and infrastructure. You can observe your logs in real-time using the Live Tail, without indexing them. You can ingest all of the logs from your applications and infrastructure, decide what to index dynamically with filters, and then store them in an archive.

## APM & Continuous Profiler

{{< img src="getting_started/apm.png" alt="APM Dashboard" >}}

[Datadog Application Performance Monitoring][6] (APM or tracing) provides you with deep insight into your application’s performance—from automatically generated dashboards for monitoring key metrics, like request volume and latency, to detailed traces of individual requests—side by side with your logs and infrastructure monitoring. When a request is made to an application, Datadog can see the traces across a distributed system, and show you systematic data about precisely what is happening to this request.

## Infrastructure

{{< img src="getting_started/infrastructure.png" alt="Infrastructure" >}}

- All machines show up in the [infrastructure list][7].
- You can see the tags applied to each machine. Tagging allows you to indicate which machines have a particular purpose.
- Datadog attempts to automatically categorize your servers. If a new machine is tagged, you can immediately see the stats for that machine based on what was previously set up for that tag. [Read more on tagging][8].

## Host map

{{< img src="getting_started/hostmap-overview.png" alt="Host Map Overview" >}}

The [host map][9] can be found under the Infrastructure menu. It offers the ability to:

- Quickly visualize your environment
- Identify outliers
- Detect usage patterns
- Optimize resources

See [Host Map][9] for more details.

## Events

{{< img src="dashboards/widgets/event_stream/event_stream_setup.png" alt="Event Stream" style="width:80%;" >}}

[The Event Stream][10] is based on the same conventions as a blog:

- Any event in the stream can be commented on.
- Can be used for distributed [teams][11] and maintaining the focus of an investigation.
- You can [filter][12] by `user`, `source`, `tag`, `host`, `status`, `priority`, and `incident`.

{{< img src="getting_started/event_stream_event.png" alt="event stream event" style="width:80%;" >}}

For each incident, users can:

- Increase/decrease priority
- Comment
- See similar incidents
- [@ notify team members][13], who receive an email
- `@support-datadog` to ask for [assistance][14]

## Dashboards

{{< img src="getting_started/dashboard.png" alt="Dashboards" >}}

[Dashboards][12] contain graphs with real-time performance metrics.

- Synchronous mousing across all graphs in a [screenboard][13].
- Vertical bars are events. They put a metric into context.
- Click and drag on a graph to zoom in on a particular timeframe.
- As you hover over the graph, the event stream moves with you.
- Display by zone, host, or total usage.
- Datadog exposes a JSON editor for the graph, allowing for [arithmetic][14] and [functions][15] to be applied to metrics.
- Share a graph snapshot that appears in the stream.
- Graphs can be embedded in an iframe. This enables you to give a 3rd party access to a live graph without also giving access to your data or any other information.

## Monitors

[Monitors][16] provide alerts and notifications based on metric thresholds, integration availability, network endpoints, and more.

- Use any metric reporting to Datadog
- Set up multi-alerts by device, host, and more
- Use `@` in alert messages to direct notifications to the right people
- Schedule downtimes to suppress notifications for system shutdowns, off-line maintenance, and more

{{< img src="getting_started/application/metric_monitor.png" alt="Alert setup" >}}

## Network Performance Monitoring

{{< img src="getting_started/npm.png" alt="NPM" >}}

Datadog [Network Performance Monitoring][17] (NPM) gives you visibility into your network traffic across any tagged object in Datadog: from containers to hosts, services, and availability zones. Group by anything—from datacenters to teams to individual containers. Use tags to filter traffic by source and destination. The filters then aggregate into flows, each showing traffic between one source and one destination, through a customizable network page and network map. Each flow contains network metrics such as throughput, bandwidth, retransmit count, and source/destination information down to the IP, port, and PID levels. It then reports key metrics such as traffic volume and TCP retransmits.

## RUM & Session Replay

{{< img src="getting_started/rum.png" alt="RUM" >}}

Datadog [Real User Monitoring][18] (RUM) allows you to visualize and analyze real-time user activities and experiences. With [Session Replay][19], you can capture and view the web browsing sessions of your users to better understand their behavior. In the RUM Explorer, you can not only visualize load times, frontend errors, and page dependencies, but also you can correlate business and application metrics to troubleshoot issues with application, infrastructure, and business metrics in one dashboard. 

## Serverless

[Serverless][20] lets you write event-driven code and upload it to a cloud provider, which manages all of the underlying compute resources. Datadog Serverless brings together metrics, traces, and logs from your AWS Lambda functions running serverless applications into one view, so that you can optimize performance by filtering to functions that are generating errors, high latency, or cold starts.

## Cloud SIEM

{{< img src="getting_started/security.png" alt="security" >}}

Datadog [Cloud SIEM][21] (Security Information and Event Management) automatically detects threats to your application or infrastructure. For example, a targeted attack, an IP communicating with your systems matching a threat intel list, or an insecure configuration. These threats are surfaced in Datadog as Security Signals and can be correlated and triaged in the Security Explorer.

## Synthetic Monitoring

{{< img src="getting_started/synthetics.png" alt="Synthetics" >}}

Datadog [Synthetic Monitoring][22] allow you to create and run API and browser tests that proactively simulate user transactions on your applications and monitor all internal and external network endpoints across your system's layers. You can detect errors, identify regressions, and automate rollbacks to prevent issues from surfacing in production. 

## Datadog on Mobile

The [Datadog Mobile App][23], available on the [Apple App Store][24] and [Google Play Store][25], gives key data for on-call engineers and business users to follow their service health and triage issues quickly without opening their laptop. Access your organization’s Dashboards, Monitors, Incidents, SLOs and more directly from your mobile device.

{{< img src="getting_started/application/mobile-app-store-screens.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Mobile App on iOS">}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: http://www.datadoghq.com/integrations
[3]: /api/
[4]: https://github.com/DataDog/datadog-agent
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
[16]: /dashboards/#screenboards
[17]: /dashboards/functions/
[18]: /real_user_monitoring/
[19]: /real_user_monitoring/session_replay/
[20]: /monitors/
[21]: /security_platform/cloud_siem/
[22]: /synthetics/
[23]: /mobile/
[24]: https://apps.apple.com/app/datadog/id1391380318
[25]: https://play.google.com/store/apps/details?id=com.datadog.app
