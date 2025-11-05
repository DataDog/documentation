---
title: Getting Started in Datadog
description: Overview of Datadog's UI navigation, key features including dashboards, monitors, integrations, and core platform capabilities.
further_reading:
  - link: 'https://learn.datadoghq.com/bundles/frontend-engineer-learning-path'
    tag: 'Learning Center'
    text: 'Frontend Engineer Learning Path'
  - link: 'https://learn.datadoghq.com/bundles/backend-engineer-learning-path'
    tag: 'Learning Center'
    text: 'Backend Engineer Learning Path'
  - link: 'https://learn.datadoghq.com/bundles/site-reliability-engineer-learning-path'
    tag: 'Learning Center'
    text: 'Site Reliability Engineer Learning Path'
  - link: 'https://dtdg.co/fe'
    tag: 'Foundation Enablement'
    text: 'Join an interactive session to build a solid foundation of Datadog'
  - link: 'https://www.datadoghq.com/blog/datadog-quick-nav-menu/'
    tag: 'Blog'
    text: 'Introducing the Datadog quick nav menu'
---

{{< learning-center-callout header="Try Datadog Core Skills in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/bundles/core-skills-learning-path">}}
  Learn without cost on real cloud compute capacity and a Datadog trial account. Start these hands-on labs to get up to speed with tagging, metrics, monitors, and dashboards.
{{< /learning-center-callout >}}

## Overview

This page provides a high-level overview of capabilities available on the [Datadog site][1].

The Datadog site navigation varies based on the width of your browser. You can have up to three types of navigation. To change the navigation type, adjust your browser width.

**Tip**: You can press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> to search for pages and entities, like dashboards and monitors, across Datadog.

## Infrastructure

- All machines show up in the [infrastructure list][7].
- You can see the tags applied to each machine. Tagging allows you to indicate which machines have a particular purpose.
- Datadog attempts to automatically categorize your servers. If a new machine is tagged, you can immediately see the stats for that machine based on what was previously set up for that tag. [Read more on tagging][8].

## Host map

{{< img src="getting_started/application/host_map_2024.png" alt="Host Map Overview" >}}

The [host map][9] can be found under the Infrastructure menu. It offers the ability to:

- Quickly visualize your environment
- Identify outliers
- Detect usage patterns
- Optimize resources

See [Host Map][9] for more details.

## Log Management

[Datadog Log Management][5] lets you send and process every log produced by your applications and infrastructure. You can observe your logs in real-time using the Live Tail, without indexing them. You can ingest all of the logs from your applications and infrastructure, decide what to index dynamically with filters, and then store them in an archive.

## APM & Continuous Profiler

[Datadog Application Performance Monitoring][6] (APM or tracing) provides you with deep insight into your application's performance—from automatically generated dashboards for monitoring key metrics, like request volume and latency, to detailed traces of individual requests—side by side with your logs and infrastructure monitoring. When a request is made to an application, Datadog can see the traces across a distributed system, and show you systematic data about precisely what is happening to this request.

## RUM & Session Replay

Datadog [Real User Monitoring][18] (RUM) allows you to visualize and analyze real-time user activities and experiences. With [Session Replay][19], you can capture and view the web browsing sessions of your users to better understand their behavior. In the RUM Explorer, you can not only visualize load times, frontend errors, and page dependencies, but also you can correlate business and application metrics to troubleshoot issues with application, infrastructure, and business metrics in one dashboard.

## Synthetic Monitoring

Datadog [Synthetic Monitoring][22] allow you to create and run API and browser tests that proactively simulate user transactions on your applications and monitor all internal and external network endpoints across your system's layers. You can detect errors, identify regressions, and automate rollbacks to prevent issues from surfacing in production.

## Integrations

{{< img src="getting_started/application/integrations-2024.png" alt="Integrations" >}}

- Datadog has over {{< translate key="integration_count" >}} integrations [officially listed][2].
- Custom integrations are available through the [Datadog API][3].
- The Agent is [open source][4].
- After integrations have been configured, all data is treated the same throughout Datadog, whether it is living in a data center or in an online service.

## Dashboards

[Dashboards][12] contain graphs with real-time performance metrics.

- Synchronous mousing across all graphs in a [screenboard][13].
- Vertical bars are events. They put a metric into context.
- Click and drag on a graph to zoom in on a particular time frame.
- As you hover over the graph, the Event Stream moves with you.
- Display by zone, host, or total usage.
- Datadog exposes a JSON editor for the graph, allowing for [arithmetic][14] and [functions][15] to be applied to metrics.
- Share a graph snapshot that appears in the stream.
- Graphs can be embedded in an iframe. This enables you to give a third party access to a live graph without also giving access to your data or any other information.

## Monitors

[Monitors][16] provide alerts and notifications based on metric thresholds, integration availability, network endpoints, and more.

- Use any metric reporting to Datadog
- Set up multi alerts by device, host, and more
- Use `@` in alert messages to direct notifications to the right people
- Schedule downtimes to suppress notifications for system shutdowns, offline maintenance, and more

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
[12]: /dashboards/
[13]: /dashboards/#screenboards
[14]: /dashboards/functions/arithmetic/
[15]: /dashboards/functions/
[16]: /monitors/
[18]: /real_user_monitoring/
[19]: /real_user_monitoring/session_replay/browser/
[22]: /synthetics/
