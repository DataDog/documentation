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

<div class="alert alert-info">
  The Datadog site navigation varies based on the width of your browser. You can have up to three types of navigation. To change the navigation type, adjust your browser width.
  <br><br>
  You can press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> to search for pages and entities, like dashboards and monitors, across Datadog.
</div>

## Infrastructure

The [infrastructure list][2] serves as a central view of all your infrastructure resources (hosts, containers, processes, etc.) and their associated metadata. 

**Key capabilities:**

- Investigate infrastructure performance.
- Arrange, filter, and visualize hosts based on tags and metrics.
- Inspect hosts to review their tags, performance, health, and more.

Navigate to [**Infrastructure > Hosts**][3] in the app to get started. To learn more, read the [Infrastructure List documentation][2].

## Host and container maps

{{< img src="getting_started/application/host_map_2025.png" alt="Host Map Overview grouping by availability-zone." >}}

[Host and container maps][4] give you a visual overview of all your hosts and containers, color-coding them by key metrics like CPU usage so you can spot issues.

**Key capabilities**:

- View your entire infrastructure at once as a visual map.
- Color-code by a variety of metrics to help you spot performance issues, and filter and group by tags and metadata.
- Drill down into individual hosts or containers to troubleshoot.

Navigate to [**Infrastructure > Host Map**][5] in the app to get started. To learn more, read the [Host and Container Maps documentation][4].

## Log Management

[Datadog Log Management][6] lets you send and process every log produced by your applications and infrastructure. You can observe your logs in real-time using the [Live Tail][7], without indexing them.

**Key capabilities**:

- Automatically collect logs from all services, applications, and platforms.
- View and search logs in real time and filter by things like service, host, and error type.
- Choose which logs to keep and for how long, reducing storage costs.

Navigate to [Logs][8] in the app to get started. To learn more, read the [Log Management documentation][6].

## APM

[Datadog Application Performance Monitoring][9] (APM or tracing) provides you with deep insight into your application's performance side by side with your logs and infrastructure monitoring.

**Key capabilities**:

- Trace requests to an application from end to end across a distributed system.
- See performance bottlenecks by visualizing time spent at each step of the request.
- Visualize service dependencies and data flows with the Service Map.
- Correlate traces with corresponding logs, metrics, and user sessions for full-stack context.

Navigate to [APM][10] in the app to get started. To learn more, read the [APM documentation][9].

## RUM & Session Replay

Datadog [Real User Monitoring][11] (RUM) allows you to visualize and analyze real-time user activities and experiences across web and mobile applications. With [Session Replay][12], you can capture and view user sessions to better understand their behavior.

**Key capabilities**:
- Monitor performance across web browsers and mobile platforms (iOS, Android, React Native, Flutter, and more) with Core Web Vitals and Mobile Vitals.
- Track and troubleshoot errors with automated grouping, crash reporting, and suspect commit identification.
- Detect user frustration signals like rage clicks and error clicks to identify UX issues.
- Monitor feature flag performance and adoption.
- Correlate frontend issues with backend traces, logs, and infrastructure metrics for full-stack visibility.

Navigate to the [RUM explorer][13] in the app to get started. To learn more, read the [RUM documentation][11].

## Synthetic Monitoring

Datadog [Synthetic Monitoring][14] allows you to create and run API, browser, mobile, and Network Path tests that proactively monitor simulated requests and actions from around the globe. These tests monitor your applications and APIs to detect performance issues and downtime before they impact users.

**Key capabilities**:

- Test business-critical API endpoints and user journeys.
- Detect errors, identify regressions, and automate rollbacks to prevent issues from surfacing in production.
- Find and alert on performance issues for users in various locations.

Navigate to [Synthetic Monitoring & Testing][15] in the app to get started. To learn more, read the [Synthetic Monitoring documentation][14].

## Integrations

Use Datadog's {{< translate key="integration_count" >}} [integrations][16] to bring together all of the metrics and logs from your infrastructure and gain insights into your entire observability system.

{{< img src="getting_started/application/integrations-2025.png" alt="Integrations" >}}

**Key capabilities**:

- Available integrations cover cloud technologies, incident response, data layers, security, AI, and more.
- After integrations have been configured, all data is treated the same throughout Datadog, whether it is living in a data center or in an online service.
- Build your own integration using the [developer documentation][17].

Navigate to [Integrations][18] in the app to get started, or browse the list of integrations in the [documentation][19].

## Dashboards

[Dashboards][20] contain graphs with real-time performance metrics, unifying your view of data across metrics, logs, traces, and more.

**Key capabilities**:

- Start with out-of-the-box dashboards or build your own to suit your specific questions.
- Customize dashboards with drag-and-drop widgets, custom queries, and flexible layouts.
- Combine multiple data types (including metrics, logs, APM, and RUM) in one place and view data in real time.
- Annotate your graphs with comments or events for your team's context.

Navigate to the [Dashboard List][21] in the app to get started. To learn more, read the [Dashboards documentation][20].

## Monitors

[Monitors][22] provide alerts and notifications based on metric thresholds, integration availability, network endpoints, and more.

- Create monitors using any metric reporting to Datadog.
- Build complex alerting logic using multiple trigger conditions.
- Send alerts to Slack, email, PagerDuty, and more, by adding`@` in alert messages to direct notifications to the right people.
- Schedule downtimes to suppress notifications for system shutdowns, offline maintenance, and more.

Navigate to the [Monitors List][23] in the app to get started. To learn more, read the [Monitors documentation][22].

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
[12]: /session_replay/browser/
[13]: https://app.datadoghq.com/rum/sessions
[14]: /synthetics/
[15]: https://app.datadoghq.com/synthetics/tests
[16]: https://www.datadoghq.com/product/platform/integrations/
[17]: /developers/integrations/
[18]: https://app.datadoghq.com/integrations
[19]: /integrations/
[20]: /dashboards/
[21]: https://app.datadoghq.com/dashboard/lists
[22]: /monitors/
[23]: https://app.datadoghq.com/monitors/manage