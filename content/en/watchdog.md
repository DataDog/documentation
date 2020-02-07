---
title: Watchdog
kind: Documentation
description: Automatically detect potential application and infrastructure issues
aliases:
  - /tracing/watchdog
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
---

{{< img src="watchdog/watchdog_page.png" alt="Watchdog page" responsive="true" >}}

## Overview

Watchdog is an algorithmic feature for APM performances and infrastructure metrics that automatically detects potential application and infrastructure issues. Watchdog observes trends and patterns in:

* APM metrics:
  * Hits (request rate)
  * Error rate
  * Latency

* Infrastructure metrics from integrations:
  * [System][1], for the Host-level memory usage (memory leaks), TCP retransmit rate, etc.
  * [Redis][2]
  * [PostgreSQL][3]
  * [NGINX][4]
  * [Amazon Web Services][5], for the [S3][6], [ELB/ALB/NLB][7], [CloudFront][8], and [DynamoDB][9] Amazon services.

Watchdog looks for irregularities in metrics, like a sudden spike in the hit rate. For each irregularity, the [Watchdog page][10] displays a Watchdog story. Each story includes a graph of the detected metric irregularity and gives more information about the relevant timeframe and endpoint or endpoints. To avoid false alarms, Watchdog only reports issues after observing your data for a sufficient amount of time to establish a high degree of confidence.

## Story details

Clicking on the story shows further details about the detected irregularity:

{{< img src="watchdog/watchdog_story.png" alt="Watchdog story"  >}}

The graph in this story shows the latency values of the ELB in three different availability zones. Watchdog detected similar anomalies in this metric from a single load balancer enabled in three availability zones, and automatically grouped these findings together in a single story. After a period of consistently low latency, the metric in all three AZs rises sharply—in the highlighted area of the graph, which indicates the timeframe of the anomaly.

##### Expected bounds

Selecting *Show expected bounds* in the upper-right corner reveals upper and lower thresholds of expected behavior on the graph.

##### Archiving Stories

Use the folder icon in the upper-right corner of a story to archive it. Archiving hides the story from the feed, as well as other places in the Datadog application, like the home page. If a story is archived, the yellow Watchdog binoculars icon does not show up next to the relevant service or resource.

To see archived stories, select the checkbox option to "Show N archived stories" in the top left. You can also see who archived each story and when, and restore archived stories to your feed.

**Note**: Archiving does not prevent Watchdog from flagging future issues related to the service or resource.

##### Monitors

Monitors associated with your stories are displayed at the bottom. Each monitor displayed has the metric of the current story and its associated tags included in its scope.

{{< img src="watchdog/watchdog_monitors.png" alt="Watchdog monitors" responsive="true" style="width:75%;">}}

Additionally, Watchdog suggests one or more monitors that are configured to trigger if the story happens again. Click the **Enable Monitor** button to enable them for your organization. See the [Watchdog monitor documentation][11] to learn how to create a Watchdog monitor.

## Filter Stories

You can use the time range, search bar, or facets to filter your Watchdog stories:

##### Time range

Use the time range selector in the upper right to view stories detected in a specific time range. You can view any story that happened in the last 13 months, going back to March 2019.

##### Search bar

Typing in the **Filter stories** search box enables you to search over your story titles.

##### Facets

Facets are associated with your Watchdog stories, allowing you to filter them by:

| Facet           | Description                                                                        |
|-----------------|------------------------------------------------------------------------------------|
| Story Category  | Display all `apm` or all `infrastructure` stories.                                 |
| Story Type      | Which metrics from APM or infrastructure integrations stories should be displayed. |
| APM Environment | The [APM Environment][12] to display stories from.                                 |
| APM Primary Tag | The [defined APM primary tag][13] to display stories from.                         |
| APM Service     | The [APM Service][14] to display stories from.                                     |

## Watchdog in the Services List

When an irregularity in a metric is detected, the yellow Watchdog binoculars icon appears next to the affected service in the [APM Services List][15]. The number next to the binoculars indicates the number of issues Watchdog has noticed within that service.

{{< img src="watchdog/service_list.png" alt="Watchdog service list" style="width:75%;" >}}

If Watchdog has discovered something out of the ordinary in a specific service, viewing the corresponding [Service page][15] reveals a dedicated Watchdog section in the middle of the page, between the application performance graphs and the latency distribution section. The Watchdog section displays any relevant Watchdog Stories.

{{< img src="watchdog/watchdog_story_bis.png" alt="Watchdog story bis" style="width:75%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/system
[2]: /integrations/redis
[3]: /integrations/postgres
[4]: /integrations/nginx
[5]: /integrations/amazon_web_services
[6]: /integrations/amazon_s3
[7]: /integrations/amazon_elb
[8]: /integrations/amazon_cloudfront
[9]: /integrations/amazon_dynamodb
[10]: https://app.datadoghq.com/apm/watchdog
[11]: /monitors/monitor_types/watchdog/
[12]: /tracing/send_traces/#configure-your-environment
[13]: /tracing/guide/setting_primary_tags_to_scope/
[14]: /tracing/visualization/#services
[15]: /tracing/visualization/services_list
