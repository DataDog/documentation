---
title: Delivering value
kind: documentation
description: "Recommended steps after you have data flowing into Datadog."
private: true
---

After you've set up data ingestion, you can take several additional steps to maximize the value for your clients. Here are some key areas to focus on.

## Setting up monitors and downtimes

Monitors and alerts draw human attention to particular systems and services that require inspection and intervention. To generate alerts, Datadog offers:
- Monitors - the definitions for alert conditions
- Downtimes - time periods when alerts should be raised or suppressed

To familiarize yourself with the concept of monitors in general, see the following resources:
- [Alerting][1]
- [Monitoring 101 - Alerting on what matters][2] (blog).
- [Intro to Monitoring][3] (Training).

### Monitor migrations

Service providers often need to migrate a client from a different monitoring or observability platform to Datadog. In such cases, it might seem logical to replicate any monitor from the previous solution in Datadog. This approach often results in many of Datadog's most useful features going unused. In particular, you don't want to miss features that improve issue detection and resolution times or reduce alert fatigue.

Before starting a migration project, review existing alert and threshold definitions to answer the following questions:
- Does the metric have a time-based variation? An [anomaly monitor][4] might be a better approach.
- Does the metric have a load-based variation? An [arithmetic monitor][5] might be the best approach by combining a metric with a load-indicating metric. For example, load on the systems might be higher if there are more users using a service.
- Is the absolute value of the metric less important than the rate of change? A [change monitor][6] or a [forecast monitor][7] might be the best approach.
- Is the value of the metric itself less important than whether it is different from the value for other hosts or entities? For example, is one node in a cluster experiencing high latency while other nodes are not? The [outlier monitor][8] is the best approach in this scenario.
- Do only a combination of multiple metrics present an actionable situation? [Composite monitors][9] offer a solution that doesn't require scripting.

### Programmatic monitor management

As a service provider, management of monitors for you and your clients is best accomplished programmatically through one of the following ways:
- [Datadog Monitors API][10]
- Terraform
  - [How to Manage Datadog Resources Using Terraform][11] (Video)
  - [Automate Monitoring with the Terraform Datadog Provider][12] (HashiCorp Tutorial)

Ensure that you [tag monitors][13] to make the management of large numbers of monitors easier.

### Recommended monitors

You might run into technologies your clients operate that you do not have a lot of experience with. Datadog offers [Recommended Monitors][14] to help you onboard new technologies quickly and confidently.

To find out more about monitors, see:
- [Manage Monitors][15]
- [Monitors][16]
- [Creating Dynamic Alerts Using Tag Values][17] (Video)
- [Monitor settings changes not taking effect][18]

### Downtimes

A common problem with monitors and alerts is alert fatigue, where an overabundance of alarms or notifications causes desensitization to the alarms. One way to combat alert fatigue is to limit the number of false positive alarms. This is especially pertinent in controlled situations such as planned system shutdowns, maintenance, or upgrade windows.

Datadog's Downtimes offer you and your clients a way to mute monitors during times of planned (or ad hoc) maintenance.

To find out more about managing downtimes, especially programmatically, see:
- [Downtime][19]
- [Mute Datadog Alerts for Planned Downtimes][20] (Blog)
- [Managing Datadog with Terraform][21] (Blog)
- [Downtime API][22]
- [Prevent alerts from Monitors that were in downtime][23]

### Notifications

Some general guidelines for notifications:
- Alert liberally; page judiciously
- Page on symptoms, rather than causes

Datadog offers various channels through which you or your clients can notify users about important alerts:

- Email notifications
- Integrations, such as:
  - [Slack][24]
  - [PagerDuty][25]
  - [Flowdock][26]
  - [ServiceNow][27]
  - [Google Chat][28]
  - [Microsoft Teams][29]
  - And [many more][19]

You can also invoke any REST API using the generic [Webhooks integration][30]. You use a Webhooks integration to not only notify users, but also to trigger automatic remediation workflows.

To find out more about notifications, see:
- [Notifications][31]
- [Send SMS Alerts with Webhooks and Twilio][32] (Blog)

## Setting up visualizations with dashboards

Visualizations are a great way to give your clients a clear picture of complex tech stacks and the abundance of metrics and events being collected. Dashboards are a natural starting point to investigate a potential issue you or your client was notified about by a monitor.

### Out-of-the-box dashboards

The moment that an Agent or Cloud Integration is set up, Datadog automatically enables out-of-the-box dashboards for the newly integrated service or technology, providing immediate insights. You can also clone an out-of-the-box dashboard, giving you a great starting point for a custom dashboard.

### Building custom dashboards

You can provide extra value and distinguish yourself from your competitors by providing a business-centric perspective, tailored to different personas.

Here are some dashboard best practices to take into consideration when building your dashboards:
- Focus on work metrics rather than too many resource metrics. To understand the difference, see [Monitoring 101: Collecting the right data][33] (blog).
- Make use of [event overlays][34] to correlate metrics and events.
- Annotate the dashboards with [free text information][35] on what data is shown and what to do in case the dashboard indicates an issue.

To find out more about Dashboards, see:
- [Building Better Dashboards][36] (Training)
- Use the [Datadog Notebooks][37] feature to gather data in an exploratory fashion and draft dashboards
- [Monitor Datacenters and Networks with Datadog][38] (Blog)
- [Use Associated Template Variables][39] (Blog)
- [The Datadog Dashboard API][40]
- [Configure Observability as Code with Terraform & Datadog][41] (HashiCorp webinar)

### Visualizations for users without Datadog access

Depending on your business model, your clients might not require access to Datadog themselves. However, you might still want to provide Datadog visualizations to your clients. You have the following options for providing Datadog visualizations:
- [Dashboard sharing][42]: Provide a status page to your clients by sharing a public URL to a read-only dashboard, or share the dashboard privately using an individual email address.
  - As a service provider, your business needs to be able to scale. [Managing shared dashboards using Datadog's APIs][40] is the most efficient approach.
- Embeddable graphs: If you have a client portal in which you want to present Datadog information, embeddable graphs are the way to go. Using parameters, you can filter data according to your needs. For more information, see:
  - [Embeddable Graphs API][43]
  - [Embeddable Graphs with Template Variables][44]

### Setting up service-level objectives

It is a good idea to continually present the quality and level of your services to your clients in a transparent way. Service-level objectives (SLOs) are a great way to monitor and visualize the service quality on behalf of your clients, and also help your clients implement service level-based reporting internally.

The following material might be helpful for you when setting up and managing SLOs:
- To get started, see [Service Level Objectives 101: Establishing Effective SLOs][45] (Blog).
- [SLO Checklist][46]
- [Best practices for managing your SLOs with Datadog][47] (Blog)
- [Track the status of all your SLOs in Datadog][48] (Blog)
- [The Datadog SLO API][49]

## Using Watchdog

Watchdog is an algorithmic feature that automatically detects potential application and infrastructure issues.

Set up a Watchdog Monitor for your own staff or your client with a notification whenever Watchdog has detected a new irregularity.

For more information, see [Watchdog][50].

## What's next?

Find out how to monitor individual client and aggregate usage of the Datadog platform in multi-organization account setups with [Billing and Usage Reporting][51].

[1]: /monitors
[2]: https://www.datadoghq.com/blog/monitoring-101-alerting/
[3]: https://learn.datadoghq.com/courses/introduction-to-observability
[4]: /monitors/types/anomaly/
[5]: /monitors/guide/monitor-arithmetic-and-sparse-metrics/
[6]: /monitors/types/metric/?tab=change
[7]: /monitors/types/forecasts/?tab=linear
[8]: /monitors/types/outlier/?tab=dbscan
[9]: /monitors/types/composite/
[10]: /api/latest/monitors/
[11]: https://www.youtube.com/watch?v=Ell_kU4gEGI
[12]: https://learn.hashicorp.com/tutorials/terraform/datadog-provider
[13]: https://www.datadoghq.com/blog/tagging-best-practices-monitors/
[14]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[15]: /monitors/manage/
[16]: /monitors/
[17]: https://www.youtube.com/watch?v=Ma5pr-u9bjk
[18]: /monitors/guide/why-did-my-monitor-settings-change-not-take-effect/
[19]: /monitors/downtimes/
[20]: https://www.datadoghq.com/blog/mute-datadog-alerts-planned-downtime/
[21]: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
[22]: /api/latest/downtimes/
[23]: /monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime/
[24]: /integrations/slack/?tab=slackapplication
[25]: /integrations/pagerduty/
[26]: /integrations/flowdock/
[27]: /integrations/servicenow/
[28]: /integrations/google_hangouts_chat/
[29]: /integrations/microsoft_teams/
[30]: /integrations/webhooks/
[31]: /monitors/notify/
[32]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio/
[33]: https://www.datadoghq.com/blog/monitoring-101-collecting-data/
[34]: /dashboards/widgets/timeseries/
[35]: /dashboards/widgets/free_text/
[36]: https://learn.datadoghq.com/courses/building-better-dashboards
[37]: /notebooks/
[38]: https://www.datadoghq.com/blog/network-device-monitoring/
[39]: https://www.datadoghq.com/blog/template-variable-associated-values/
[40]: /api/latest/dashboards/
[41]: https://www.hashicorp.com/resources/configure-observability-as-code-with-terraform-and-datadog
[42]: /dashboards/sharing/
[43]: /api/latest/embeddable-graphs/
[44]: /dashboards/guide/embeddable-graphs-with-template-variables/
[45]: https://www.datadoghq.com/blog/establishing-service-level-objectives/
[46]: /service_management/service_level_objectives/guide/slo-checklist
[47]: https://www.datadoghq.com/blog/define-and-manage-slos/
[48]: https://www.datadoghq.com/blog/slo-monitoring-tracking/
[49]: /api/latest/service-level-objectives/
[50]: /monitors/types/watchdog/
[51]: /partners/billing-and-usage-reporting/
