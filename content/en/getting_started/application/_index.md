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

<div class="alert alert-info">You can press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> to search for pages and entities, like dashboards and monitors, across Datadog.</div>

## Infrastructure

The [infrastructure list][2] serves as a central view of all your infrastructure resources (hosts, containers, processes, etc.) and their associated metadata. 

**Key capabilities:**

- Investigate infrastructure performance
- Arrange, filter, and visualize hosts based on tags and metrics
- Inspect hosts to review their tags, performance, health, and more

Navigate to [**Infrastructure > Hosts**][3] in the app to get started. To learn more, read the [Infrastructure List documentation][2].

## Host and container maps

<!-- Todo: retake screenshot -->

{{< img src="getting_started/application/host_map_2024.png" alt="Host Map Overview" >}}

[Host and container maps][4] give you a visual overview of all your hosts and containers, color-coding them by key metrics like CPU usage so you can quickly spot issues.

**Key capabilities**:

- View your entire infrastructure at once as a visual map
- Color-code by a variety of metrics to help you spot performance issues, and filter and group by tags and metadata
- Drill down into individual hosts or containers to troubleshoot

Navigate to [**Infrastructure > Host Map**][5] in the app to get started. To learn more, read the [Host and Container Maps documentation][4].

## Log Management

[Datadog Log Management][6] lets you send and process every log produced by your applications and infrastructure. You can observe your logs in real-time using the [Live Tail][7], without indexing them. You can ingest all of the logs from your applications and infrastructure, decide what to index dynamically with filters, and then store them in an archive.
<!-- cut down this paragraph? a bit redundant with the list below -->

**Key capabilities**:

- Automatically collect logs from all services, applications, and platforms
- View and search logs in real time and filter by things like service, host, and error type
- Choose which logs to keep and for how long, reducing storage costs

Navigate to [Logs][8] in the app to get started. To learn more, read the [Log Management documentation][6].

## APM & Continuous Profiler

[Datadog Application Performance Monitoring][9] (APM or tracing) provides you with deep insight into your application's performance—from automatically generated dashboards for monitoring key metrics, like request volume and latency, to detailed traces of individual requests—side by side with your logs and infrastructure monitoring.

**Key capabilities**:

- Trace requests to an application from end to end across a distributed system
- See performance bottlenecks by visualizing time spent at each step of the request
- Configure your sampling rate to cut down on noise
- Automatically discover dependencies for an instrumented service, without having to directly instrument the dependency

Navigate to [APM][10] in the app to get started. To learn more, read the [APM documentation][9]
<!-- is this the right link in the product? -->


## RUM & Session Replay

Datadog [Real User Monitoring][11] (RUM) allows you to visualize and analyze real-time user activities and experiences. With [Session Replay][12], you can capture and view the web browsing sessions of your users to better understand their behavior. In the RUM Explorer, you can not only visualize load times, frontend errors, and page dependencies, but also you can correlate business and application metrics to troubleshoot issues with application, infrastructure, and business metrics in one dashboard.
<!-- cut down? -->

**Key capabilities**:
- Visualize load times, frontend errors, and resources for every user session
- Filter and analyze data using custom attributes
- Unify frontend and backend metrics in one view for faster troubleshooting

Navigate to the [RUM explorer][x] in the app to get started. To learn more, read the [RUM documentation][11]

## Synthetic Monitoring

Datadog [Synthetic Monitoring][13] allows you to create and run API, browser, and mobile tests that proactively simulate user transactions on your applications. These tests monitor all internal and external network endpoints across your system's layers. 

**Key capabilities**:

- Test business-critical API endpoints and user journeys
- Detect errors, identify regressions, and automate rollbacks to prevent issues from surfacing in production
- Find and alert on performance issues for users in various locations

Navigate to [Synthetic Monitoring &Testing][y] in the app to get started. To learn more, read the [Synthetic Monitoring documentation][13].

## Integrations

{{< img src="getting_started/application/integrations-2024.png" alt="Integrations" >}}

- Datadog has over {{< translate key="integration_count" >}} integrations [officially listed][14].
- Custom integrations are available through the [Datadog API][15].
- The Agent is [open source][16].
- After integrations have been configured, all data is treated the same throughout Datadog, whether it is living in a data center or in an online service.

## Dashboards

[Dashboards][17] contain graphs with real-time performance metrics.

- Synchronous mousing across all graphs in a [screenboard][18].
- Vertical bars are events. They put a metric into context.
- Click and drag on a graph to zoom in on a particular time frame.
- As you hover over the graph, the Event Stream moves with you.
- Display by zone, host, or total usage.
- Datadog exposes a JSON editor for the graph, allowing for [arithmetic][19] and [functions][20] to be applied to metrics.
- Share a graph snapshot that appears in the stream.
- Graphs can be embedded in an iframe. This enables you to give a third party access to a live graph without also giving access to your data or any other information.

## Monitors

[Monitors][21] provide alerts and notifications based on metric thresholds, integration availability, network endpoints, and more.

- Use any metric reporting to Datadog
- Set up multi alerts by device, host, and more
- Use `@` in alert messages to direct notifications to the right people
- Schedule downtimes to suppress notifications for system shutdowns, offline maintenance, and more

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: /infrastructure/list/
[3]: https://app.datadoghq.com/infrastructure
[4]: /infrastructure/hostmap/
[5]: https://app.datadoghq.com/infrastructure/map
[6]: /logs/
[7]: /logs/explorer/live_tail/
[8]: https://app.datadoghq.com/logs
[9]: /tracing/
[10]: https://app.datadoghq.com/apm/home
[11]: /real_user_monitoring/
[12]: /real_user_monitoring/session_replay/browser/
[x]: https://app.datadoghq.com/rum/sessions
[13]: /synthetics/
[y]: https://app.datadoghq.com/synthetics/tests
[14]: https://www.datadoghq.com/product/platform/integrations/
[15]: /api/
[16]: https://github.com/DataDog/datadog-agent
[17]: /dashboards/
[18]: /dashboards/#screenboards
[19]: /dashboards/functions/arithmetic/
[20]: /dashboards/functions/
[21]: /monitors/
