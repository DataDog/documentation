---
title: Watchdog
kind: Documentation
description: Automatically detect potential application and infrastructure issues
aliases:
  - /tracing/watchdog
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Watchdog"
    tag: "Release Notes"
    text: "Check out the latest Datadog Watchdog releases! (App login required)."
  - link: "/logs/"
    tag: "Documentation"
    text: "Collect your logs"
  - link: "/infrastructure/process/"
    tag: "Documentation"
    text: "Collect your processes"
  - link: "/tracing/"
    tag: "Documentation"
    text: "Collect your traces"
  - link: "https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/"
    tag: "Blog"
    text: "Automated root cause analysis with Watchdog RCA"
  - link: "https://www.datadoghq.com/blog/watchdog-impact-analysis/"
    tag: "Blog"
    text: "Understand user impact scope with Watchdog Impact Analysis"
---

{{< img src="watchdog/watchdog.png" alt="The Watchdog Alerts page with two ongoing critical alerts for error rates" >}}

## Overview

Watchdog is an algorithmic feature for APM performance and infrastructure metrics that automatically detects potential application and infrastructure issues. It leverages the same seasonal algorithms that power anomalies and dashboards. Watchdog observes trends and patterns in:

* APM metrics:
  * Hits (request rate)
  * Error rate
  * Latency

* Infrastructure metrics from integrations:
  * [System][1], for the Host-level memory usage (memory leaks) and TCP retransmit rate.
  * [Redis][2]
  * [PostgreSQL][3]
  * [NGINX][4]
  * [Amazon Web Services][5], for the [S3][6], [ELB/ALB/NLB][7], [CloudFront][8], and [DynamoDB][9] Amazon services.
  * [Alerting][10]

Watchdog looks for irregularities in metrics, like a sudden spike in the hit rate. For each irregularity, the [Watchdog page][11] displays a Watchdog alert. Each alert includes a graph of the detected metric irregularity and gives more information about the relevant time frame and endpoint or endpoints. Watchdog automatically monitors data sent by the Datadog Agent or by integrations. 

## Alert details

Clicking on a Watchdog alert shows further details about the detected irregularity.

### Archiving alerts

In the Watchdog alert's side panel, click the folder icon in the upper-right corner to archive it. Archiving hides the alert from the feed, as well as other places in the Datadog site, like the home page. If an alert is archived, the pink Watchdog binoculars icon does not show up next to the relevant service or resource.

To see archived alerts, select the checkbox option to "Show N archived alerts" in the top left. The option is only available if there is at least one alert archived. You can also see who archived each alert and when it was archived, and restore archived alerts to your feed.

**Note**: Archiving does not prevent Watchdog from flagging future issues related to the service or resource.

### Correlated dashboards

To speed up further investigations, Datadog may suggest some of your dashboards that are related to the alert. In this case, Datadog highlights which of the dashboard's metrics are related to the insights in the alert.

### Monitors

Monitors associated with your alerts are displayed on the Monitors tab. Each monitor displayed has the metric of the current alert and its associated tags included in its scope.

Additionally, Watchdog suggests one or more monitors that are configured to trigger if the alert happens again. Click **Enable Monitor** to enable them for your organization. See [Watchdog Monitor][12] to learn how to create a Watchdog monitor.

## Filter Watchdog alerts

You can use the time range, search bar, or facets to filter your Watchdog alerts:

### Time range

Use the time range selector in the upper right to view alerts detected in a specific time range. You can view any alert that happened in the last 13 months.

### Search bar

Typing in the **Filter alerts** search box enables you to search over your alert titles.

### Facets

Facets are associated with your Watchdog alerts, allowing you to filter them by:

| Facet           | Description                                                                        |
|-----------------|------------------------------------------------------------------------------------|
| Alert Category  | Display all `apm` or all `infrastructure` alerts.                                 |
| Alert Type      | Which metrics from APM or infrastructure integrations alerts should be displayed. |
| APM Environment | The [APM Environment][13] to display alerts from.                                 |
| APM Primary Tag | The [defined APM primary tag][14] to display alerts from.                         |
| APM Service     | The [APM Service][15] to display alerts from.                                     |

## Watchdog in the services list

When an irregularity in a metric is detected, the yellow Watchdog binoculars icon appears next to the affected service in the [APM services list][16]. The number next to the binoculars indicates the number of issues Watchdog has noticed within that service.

{{< img src="watchdog/service_list.png" alt="Watchdog service list" style="width:75%;" >}}

If Watchdog has discovered something out of the ordinary in a specific service, viewing the corresponding [Service page][16] reveals a dedicated Watchdog section in the middle of the page, between the application performance graphs and the latency distribution section. The Watchdog section displays any relevant Watchdog alerts.

{{< img src="watchdog/watchdog_story_bis.png" alt="Watchdog story bis" style="width:75%;">}}

## Troubleshooting

Need help? Contact [Datadog support][17].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/system/
[2]: /integrations/redis/
[3]: /integrations/postgres/
[4]: /integrations/nginx/
[5]: /integrations/amazon_web_services/
[6]: /integrations/amazon_s3/
[7]: /integrations/amazon_elb/
[8]: /integrations/amazon_cloudfront/
[9]: /integrations/amazon_dynamodb/
[10]: /monitors/
[11]: https://app.datadoghq.com/watchdog
[12]: /monitors/create/types/watchdog/
[13]: /tracing/send_traces/#configure-your-environment
[14]: /tracing/guide/setting_primary_tags_to_scope/
[15]: /tracing/visualization/#services
[16]: /tracing/visualization/services_list/
[17]: /help/
