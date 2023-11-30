---
title: Watchdog Alerts
kind: documentation
---

## Overview

Watchdog pro-actively looks for anomalies on your systems and applications. Each anomaly is then surfaced in the [Watchdog Alert Explorer][1] with more information about what happened and when possible the impact on other systems and the root cause.

{{< img src="watchdog/watchdog.png" alt="The Watchdog Alerts page with one ongoing log anomaly alert for error logs, one resolved log anomaly alert for error logs, and one resolved error rate alert resolved through root cause analysis" >}}

## Watchdog Alert details

{{< img src="watchdog/alerts/alerts_overview.png" alt="Screenshot of a Watchdog alert card, showing an elevated error rate on the send-sms endpoint in sms-service" style="width:100%;">}}

An alert overview card contains the sections below:

1. Status: The anomaly can be **ongoing** or **resolved** or **expired** (an expired story
3. Timeline: Describes over what time period the anomaly occurs.
4. Message: Describes the anomaly.
5. Graph: Visually represents the anomaly.
6. Tags: Shows the scope of the anomaly.
7. [Impact][4] (when available): Describes which users, views, or services the anomaly affects.

Clicking anywhere on an alert overview card opens the alerts details pane.

In addition to repeating the information in the alert overview card, the **Overview** tab may contain one or more of the following fields:
* **Expected Bounds**: Click the **Show expected bounds** checkbox. The graph changes color to differentiate between expected and anomalous behavior.
* **Suggested Next Steps**: Describes steps for investigation and triage of the anomalous behavior.
* **Monitors** tab lists monitors associated with your alert. Each monitor displayed has the metric of the current alert and its associated tags included in its scope.

Additionally, Watchdog suggests one or more monitors you can create to notify you if the anomaly happens again. These monitors do not exist yet, so the table lists their status as **suggested**. Click **Enable Monitor** to enable the suggested monitor for your organization. A series of icons pops up allowing you to open, edit, clone, mute, or delete the new monitor.
 
### Watchdog alert explorer

You can use the time range, search bar, or facets to filter your Watchdog alerts feed.

* **Time range**: Use the time range selector in the upper right to view alerts detected in a specific time range. You can view any alert that happened in the last 6 months.
* **Search bar**: Enter text in the **Filter alerts** search box to search over your alert `titles`.
* **Facets**: The left side of the Watchdog alerts feed contains the search facets below. Check the corresponding boxes to filter your alerts by facet.

Available facets: 

| All Alerts Group    | Description                                                                     |
|---------------------|---------------------------------------------------------------------------------|
| Alert Category      | Display all `apm`, `infrastructure`, or `logs` alerts.                          |
| Alert Type          | Select alerts using metrics from APM or infrastructure integrations.            |
| Alert Status        | Select alerts based on their status (`ongoing` or `resolved` or `expired`).     |
| APM Primary Tag     | The [defined APM primary tag][6] to display alerts from.                        |
| Environment         | The environment to display alerts from. See [Unified Service Tagging][5] for more information about the `env` tag.|
| Service             | The service to display alerts from. See [Unified Service Tagging][5] for more information about the `service` tag.|
| End User Impacted   | If Watchdog found any end users impacted (requires RUM) - see [Impact Analysis][4] for more information|
| Root Cause          | If Watchdog found the root cause of the anomaly or the critical failure (requires APM) - see [Root Cause Analysis][9] for more information|
| Team                | The team owning the impacted services. Enriched from the [Service Catalog][7]  |
| Log Anomaly Type    | Only display log anomalies of this type. The supported types are new log patterns and increases in existing log patterns.|
| Log Source          | Only display alerts containing logs from this source.                           |
| Log Status          | Only display alerts containing logs of this log status.                         |

## Watchdog Alerts coverage

Watchdog Alerts cover multiple products as well as key application and infrastructure metrics:

{{< tabs >}}
{{% tab "Log Management" %}}

Ingested logs are analyzed at the intake level where Watchdog performs aggregations on detected patterns as well as `environment`, `service`, `source` and `status` tags.
These aggregated logs are scanned for anomalous behaviors, such as the following:

* An emergence of logs with a warning or error status.
* A sudden increase of logs with a warning or error status.

All log anomalies are surfaced as [Insights][3] in the Log Explorer, matching the search context and any restrictions applied to your role.
Log anomalies that Watchdog determines to be particularly `severe` are surfaced in the [Watchdog Alerts explorer][1] and can be alerted on by setting up a [Watchdog logs monitor][2].
A `severe` anomaly is defined as:

* containing error logs
* lasting at least 10 minutes (to avoid transient errors)
* having a significant increase (to avoid small increases)

[1]: https://app.datadoghq.com/watchdog
[2]: /monitors/types/watchdog/
[3]: /watchdog/insights?tab=logmanagement#explore-insights
{{% /tab %}}
{{% tab "APM" %}}

* APM metrics:
  * Hits (request rate)
  * Error rate
  * Latency

{{% /tab %}}
{{% tab "Infrastructure" %}}

* Infrastructure metrics from integrations:
  * [System][1], for the Host-level memory usage (memory leaks) and TCP retransmit rate.
  * [Redis][2]
  * [PostgreSQL][3]
  * [NGINX][4]
  * [Docker][13]
  * [Kubernetes][14]
  * [Amazon Web Services][5]:
    * [S3][6]
    * [ELB/ALB/NLB][7]
    * [CloudFront][8]
    * [DynamoDB][9]
    * [RDS][10]
    * [ECS][11]
    * [Lambda][12]

[1]: /integrations/system/
[2]: /integrations/redisdb/
[3]: /integrations/postgres/
[4]: /integrations/nginx/
[5]: /integrations/amazon_web_services/
[6]: /integrations/amazon_s3/
[7]: /integrations/amazon_elb/
[8]: /integrations/amazon_cloudfront/
[9]: /integrations/amazon_dynamodb/
[10]: /integrations/amazon_rds/
[11]: /containers/amazon_ecs/?tab=awscli
[12]: /serverless/
[13]: /containers/docker/?tab=standard
[14]: /containers/kubernetes/installation/?tab=operator
{{% /tab %}}
{{< /tabs >}}
 
### Required data history

Watchdog requires some data to establish a baseline of expected behaviour. It starts finding anomalies once the minimum required history is available and then keeps improving as history grows. Best performances are obtained with 6 weeks of history. 
The minimum amount of required data history to establish a baseline of expected behaviour differs based on the source:

* For **Metric** based anomalies: 2 weeks
* For **Log** based anomalies: 24h

### Custom Anomaly detection

Watchdog leverages the same seasonal algorithms that power monitors and dashboards. To look for anomalies on other metrics or to fine tune the sensitivity the following algorithms are available:

* [Anomaly monitors][10]
* [Forecast monitors][11]
* [Outlier monitors][12]

## Where to find Watchdog alerts

Watchdog alerts appear in three places within the Datadog site:

* The [Watchdog Alerts explorer][1]
* On any individual [APM Service Page][3]
* In the [Service Catalog][7]
* In the [Watchdog insight panel][8] available on all explorers 

### Watchdog Binoculars in APM pages

When Watchdog detects an irregularity in an APM metric, the pink Watchdog binoculars icon appears next to the impacted service in the [APM Service Catalog][7].

{{< img src="watchdog/service_list.png" alt="Screenshot of the Service Catalog, showing 5 services. A pink binoculars icon follows the name of the web-store service." style="width:75%;" >}}

You can see greater detail about a metric anomaly by navigating to the top of the [Service page][3] with the [Watchdog Insights][8] carousel.

You can also find the Watchdog icon on metric graphs.

{{< img src="watchdog/latency_graph.png" alt="A graph showing service latency, in seconds, on the y-axis and the time of day on the x-axis. The entire graph is highlighted in pink, and the words May 2: 13:31 Ongoing appear at the top" style="width:75%;" >}}

Click on the binoculars icon to see a Watchdog alert card with more details.

## Manage archived alerts

In a Watchdog alert's side panel, click the folder icon in the upper-right corner to archive it. Archiving hides the alert from the explorer, as well as other places in the Datadog site, like the home page. If an alert is archived, the pink Watchdog binoculars icon does not show up next to the relevant service or resource.

To see archived alerts, select the checkbox option to "Show N archived alerts" in the top left of the [Watchdog Alerts explorer][1]. The option is only available if there is at least one alert archived. You can also see who archived each alert and when it was archived, and restore archived alerts to your feed.

**Note**: Archiving does not prevent Watchdog from flagging future issues related to the service or resource.

[1]: /watchdog
[3]: /tracing/services/service_page/
[4]: /watchdog/impact_analysis/
[5]: /getting_started/tagging/unified_service_tagging/
[6]: /tracing/guide/setting_primary_tags_to_scope/
[7]: /tracing/service_catalog/
[8]: /watchdog/insights?tab=logmanagement#explore-insights
[9]: /watchdog/rca/
[10]: /monitors/types/anomaly/
[11]: /monitors/types/forecasts/?tab=linear
[12]: /monitors/types/outlier/?tab=dbscan
