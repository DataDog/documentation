---
title: Monitor Quality
kind: Documentation
disable_toc: false
further_reading:
- link: "https://app.datadoghq.com/monitors/quality"
  tag: "In-app"
  text: "Datadog Monitor Quality"
- link: "/monitors/"
  tag: "Documentation"
  text: "Learn more about Datadog monitors"
---

## Overview

Monitor Quality refers to the effectiveness and accuracy of monitoring setups within Datadog. This feature highlights monitors with quality issues, such as muted monitors or missing recipients. It enables teams to maintain alerting standards and prevent crucial alerts from being missed.  

## View misconfigured monitors

From the [**Manage Monitors**][8] page, click the [**Monitor Quality**][7] tab to access a list of monitors that need improvement. Datadog automatically enables this feature after you create your first monitor. 

Filter and view the [Monitor Quality page][7] based on the teams, creators, services, or environments to organize and manage the list. 

{{< img src="monitors/quality/filter_monitor_quality.png" alt="Filtering dropdown options for creators, teams, services, and env available on the Monitor Quality page" style="width:100%;" >}}

## Improve monitors and follow best practices

Monitor Quality displays your monitors with the following quality issues:
- [Muted for over 60 days](#muted-for-over-60-days)
- [Missing recipients](#monitors-are-missing-recipients)
- [Missing a delay](#missing-a-delay)
- [Have misconfigured notification channels](#misconfigured-notification-channels)
- [Composite monitors are missing consituents](#composite-monitors-are-missing-consituents)
- [Stuck in an alert state](#stuck-in-alert-state)

### Muted for over 60 days

[Downtimes][1] are useful for silencing alerts during scheduled maintenance, planned outages or system shutdowns, or to stop alerts during weekends and evenings. However, monitors that have been muted for an extended period (more than 60 days) may indicate a potential oversight. You can unmute these monitors to resume alerting and ensure comprehensive monitoring coverage.

See which monitors are not alerting due to downtime misconfigurations and unmute them.

### Monitors are missing recipients

When a monitor sets off an alert or notification, you want the alerts to go to the team or person that can resolve it and take action. If no recipients are added to the [monitor noficication][2], you decrease how proactive you can be with your services. Use the Monitor Quality page to review the monitors that are configured without any recipients.

### Missing a delay

Data from cloud integrations (such as AWS, Azure, or Google Cloud) are pulled in by an API with a crawler. These metrics arrive with a delay, which you can account for in your monitor configuration. Monitors with cloud data that do not have an [evaluation delay][3] can alert on false positives.

See all the monitors that are crawling cloud data but are missing the recommended delay. For more information on crawled data, see the [Cloud Metric Delay][4] page.

### Misconfigured notification channels

[`@notifications`][5] allow you to customize your monitors so that alerts are forwarded to integrations, workflows, or Datadog cases. If `@notifications` are misconfigured, the expected alerts are not sent to the appropriate channels.

See which monitors have misconfigured notifications channels and edit to resolve.

### Composite monitors are missing consituents

[Composite monitors][6] evaluate the combined state of multiple sub monitors (constituents)following user-defined logic. Composite monitors that reference deleted constituents do not evaluate or notify. Identify inactive composite monitors and delete them. 

### Stuck in alert state

Monitors in an `ALERT` state, are indications of an issue in your service that needs your attention. Multiple monitors in a constant `ALERT` state take the focus away from the issues that might actually need your attention. Investigate why these monitors are stuck in an alert state and edit your configuration accordingly.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: monitors/downtimes/
[2]: monitors/notify/
[3]: monitors/configuration/?tab=thresholdalert#evaluation-delay
[4]: integrations/guide/cloud-metric-delay/
[5]: monitors/notify/#notifications
[6]: monitors/types/composite/
[7]: https://app.datadoghq.com/monitors/quality
[8]: https://app.datadoghq.com/monitors/manage