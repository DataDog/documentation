---
title: Watchdog
kind: Documentation
description: Automatically detect potential application and infrastructure issues
aliases:
  - /tracing/watchdog
further_reading:
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
---

{{< img src="watchdog/watchdog_page.png" alt="Watchdog page"  >}}

## Overview

Watchdog is an algorithmic feature for APM performances and infrastructure metrics that automatically detects potential application and infrastructure issues. Watchdog observes trends and patterns in:

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

Watchdog looks for irregularities in metrics, like a sudden spike in the hit rate. For each irregularity, the [Watchdog page][11] displays a Watchdog story. Each story includes a graph of the detected metric irregularity and gives more information about the relevant timeframe and endpoint or endpoints. To avoid false alarms, Watchdog only reports issues after observing your data for a sufficient amount of time to establish a high degree of confidence.

## Root Cause Analysis for APM (beta)

<div class="alert alert-warning">
Watchdog Root Cause Analysis (RCA) is currently in beta. <a href="https://docs.google.com/forms/d/1gKdjVslrxMv_St7sIH7c47FJuf_hKvKAt_G9SXnE4Nw/edit?ts=5fbd5390&gxids=7628">Use this form</a> to request access.
</div>

Watchdog RCA enables APM customers to identify causal relationships between different symptoms across your applications and infrastructures. This information helps you to speed up your root cause analysis and reduce your mean time to recovery (MTTR). 

Watchdog can group related data together, draw connections between groups, and prioritize the most important areas to focus on.

Watchdog considers the relationships between the following types of signals:

* APM error rate latency and hit rate increases 
* New deployments with APM service version changes
* APM error traces
* Introduction of new APM resources 
* Changes to traced database queries
* Agent based infrastructure metrics (high CPU usage, high memory usage, high disk usage, unreachable hosts, etc.)
* Error logs patterns anomalies
* Triggered alerts from your own monitors

Watchdog also correlates signals and anomalies from the different parts of your infrastructure (logs, traces, and metrics) and adds them as evidence to each RCA story. To enable this, it is recommended that you set up [unified tagging][12] across your telemetry.

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

##### Dependency Map

When an anomaly appears in one service, there’s often a corresponding anomaly in a related service. For example, if one service’s database queries get throttled, any downstream service will experience elevated latency. You need to troubleshoot this not as two separate issues, but rather as one issue stemming from a single root cause.

Watchdog automatically groups related APM anomalies into a single story whenever it detects an issue that affects multiple services. The story will include a dependency map that shows the service where the issue originated and the downstream dependencies that were affected. This gives you visibility on  the impact of the issue and a quick path to the source of the issue and to move on resolution.

The screenshot below shows a Watchdog story, starting with a summary of the issue and a graph highlighting the anomaly. Below that, a dependency map illustrates the full scope of the problem: the issue is rooted in the `ad-server-http-client` service, and it also affects the downstream services `web-store` and `web-store-mongo`. Clicking on a service node in the map will open a bottom panel where you will be able to explore the different evidences, side effects and root causes that Watchdog identified for that service.

(screenshot tk)

##### Related Dashboards

To speed up further investigations, Datadog may suggest some of your dashboards that are related to the story. In this case, Datadog will highlight which of the dashboard's metrics are related to the insights in the story. 

##### Monitors

Monitors associated with your stories are displayed at the bottom. Each monitor displayed has the metric of the current story and its associated tags included in its scope.

{{< img src="watchdog/watchdog_monitors.png" alt="Watchdog monitors"  style="width:75%;">}}

Additionally, Watchdog suggests one or more monitors that are configured to trigger if the story happens again. Click the **Enable Monitor** button to enable them for your organization. See the [Watchdog monitor documentation][13] to learn how to create a Watchdog monitor.

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
| APM Environment | The [APM Environment][14] to display stories from.                                 |
| APM Primary Tag | The [defined APM primary tag][15] to display stories from.                         |
| APM Service     | The [APM Service][16] to display stories from.                                     |

## Watchdog in the Services List

When an irregularity in a metric is detected, the yellow Watchdog binoculars icon appears next to the affected service in the [APM Services List][17]. The number next to the binoculars indicates the number of issues Watchdog has noticed within that service.

{{< img src="watchdog/service_list.png" alt="Watchdog service list" style="width:75%;" >}}

If Watchdog has discovered something out of the ordinary in a specific service, viewing the corresponding [Service page][17] reveals a dedicated Watchdog section in the middle of the page, between the application performance graphs and the latency distribution section. The Watchdog section displays any relevant Watchdog Stories.

{{< img src="watchdog/watchdog_story_bis.png" alt="Watchdog story bis" style="width:75%;">}}

## Watchdog with alerts

When Watchdog RCA detects an anomaly with your application, it creates a story and link it with user defined monitors that have triggered. The Watchdog story is visible directly at the top of the triggered monitor page.

{{< img src="watchdog/watchdog_rca_alerts.jpeg" alt="Watchdog RCA with alerts" style="width:75%;">}}

## Troubleshooting

Need help? Contact [Datadog support][18].

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
[11]: https://app.datadoghq.com/apm/watchdog
[12]: /getting_started/tagging/unified_service_tagging
[13]: /monitors/monitor_types/watchdog/
[14]: /tracing/send_traces/#configure-your-environment
[15]: /tracing/guide/setting_primary_tags_to_scope/
[16]: /tracing/visualization/#services
[17]: /tracing/visualization/services_list/
[18]: /help/
