---
title: Watchdog Alerts
kind: documentation
---

## Overview

Watchdog proactively looks for anomalies on your systems and applications. Each anomaly is then displayed in the [Watchdog Alert Explorer][1] with more information about what happened, the possible impact on other systems, and the root cause.

{{< img src="watchdog/watchdog.png" alt="The Watchdog Alerts page with one ongoing log anomaly alert for error logs, one resolved log anomaly alert for error logs, and one resolved error rate alert resolved through root cause analysis" >}}

## Watchdog Alert details

An alert overview card contains the sections below:

{{< img src="watchdog/alerts/alerts_overview.png" alt="Screenshot of a Watchdog alert card, showing an elevated error rate on the send-sms endpoint in sms-service" style="width:100%;">}}

1. **Status**: The anomaly can be `ongoing`, `resolved`, or `expired`. (An anomaly is `expired` if it has been ongoing for over 48 hours.)
3. **Timeline**: Describes the time period over which the anomaly occurs.
4. **Message**: Describes the anomaly.
5. **Graph**: Visually represents the anomaly.
6. **Tags**: Shows the scope of the anomaly.
7. [**Impact**][4] (when available): Describes which users, views, or services the anomaly affects.

Clicking anywhere on an alert overview card opens the alerts details pane.

In addition to repeating the information in the alert overview card, the **Overview** tab may contain one or more of the following fields:

* **Expected Bounds**: Click the **Show expected bounds** checkbox. The graph changes color to differentiate between expected and anomalous behavior.
* **Suggested Next Steps**: Describes steps for investigation and triage of the anomalous behavior.
* **Monitors**: Lists monitors associated with your alert. Each monitor displayed has the metric of the current alert and its associated tags included in its scope.

Additionally, Watchdog suggests one or more monitors you can create to notify you if the anomaly happens again. These monitors do not exist yet, so the table lists their status as `suggested`. Click **Enable Monitor** to enable the suggested monitor for your organization. A series of icons pops up allowing you to open, edit, clone, mute, or delete the new monitor.

## Watchdog Alert Explorer

You can use the time range, search bar, or facets to filter your Watchdog Alerts feed.

* **Time range**: Use the time range selector in the upper right to view alerts detected in a specific time range. You can view any alert that happened in the last 6 months.
* **Search bar**: Enter text in the **Filter alerts** search box to search over alert titles.
* **Facets**: The left side of the Watchdog Alerts feed contains the search facets below. Check the corresponding boxes to filter your alerts by facet.

Available facets: 

| All Alerts Group    | Description                                                                     |
|---------------------|---------------------------------------------------------------------------------|
| Alert Category      | Display all `apm`, `infrastructure`, or `logs` alerts.                          |
| Alert Type          | Select alerts using metrics from APM or infrastructure integrations.            |
| Alert Status        | Select alerts based on their status (`ongoing`, `resolved`, or `expired`).     |
| APM Primary Tag     | The [defined APM primary tag][6] to display alerts from.                        |
| Environment         | The environment to display alerts from. See [Unified Service Tagging][5] for more information about the `env` tag.|
| Service             | The service to display alerts from. See [Unified Service Tagging][5] for more information about the `service` tag.|
| End User Impacted   | (Requires RUM). If Watchdog found any end users impacted. See [Impact Analysis][4] for more information. |
| Root Cause          | (Requires APM). If Watchdog found the root cause of the anomaly or the critical failure. See [Root Cause Analysis][9] for more information. |
| Team                | The team owning the impacted services. Enriched from the [Service Catalog][7].  |
| Log Anomaly Type    | Only display log anomalies of this type. The supported types are new log patterns and increases in existing log patterns.|
| Log Source          | Only display alerts containing logs from this source.                           |
| Log Status          | Only display alerts containing logs of this log status.                         |

## Watchdog Alerts coverage

Watchdog Alerts cover multiple application and infrastructure metrics:

{{< tabs >}}
{{% tab "Log Management" %}}

Ingested logs are analyzed at the intake level where Watchdog performs aggregations on detected patterns as well as `environment`, `service`, `source`, and `status` tags.
These aggregated logs are scanned for anomalous behaviors, such as the following:

* An emergence of logs with a warning or error status.
* A sudden increase of logs with a warning or error status.

All log anomalies are surfaced as [Insights][3] in the Log Explorer, matching the search context and any restrictions applied to your role.
Log anomalies that Watchdog determines to be particularly `severe` are surfaced in the [Watchdog Alert Explorer][1] and can be alerted on by setting up a [Watchdog logs monitor][2].
A `severe` anomaly is defined as:

* Containing error logs.
* Lasting at least 10 minutes (to avoid transient errors).
* Having a significant increase (to avoid small increases).
* Having a low `noise` score (to avoid having a lot of alerts for a given service). The `noise` score is calculated at the service level by:
    * Looking at the number of error patterns (the higher, the noisier).
    * Computing how close the patterns are to each other (the closer, the noisier).

#### Required data history

Watchdog requires some data to establish a baseline of expected behavior. For log anomalies, the minimum history is 24 hours. 
Watchdog starts finding anomalies after the minimum required history is available, and Watchdog improves as history grows. Best performances are obtained with six weeks of history. 

#### Disabling log anomaly detection

To disable log anomaly detection, go to the [Log Management pipeline page][4] and click the Log Anomalies toggle.

[1]: https://app.datadoghq.com/watchdog
[2]: /monitors/types/watchdog/
[3]: /watchdog/insights?tab=logmanagement#explore-insights
[4]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "APM" %}}

Watchdog scans all services and resources to look for anomalies on the following metrics:

  * Error rate
  * Latency
  * Hits (request rate)

Watchdog filters out barely-used endpoints or services to reduce noise and avoid anomalies on small amounts of traffic. Additionally, if an anomaly on hit rate is detected but has no impact on latency or error rate, the anomaly is then ignored. 

#### Required data history

Watchdog requires some data to establish a baseline of expected behavior. For metric anomalies, the minimum history is two weeks. 
Watchdog starts finding anomalies after the minimum required history is available, and Watchdog improves as history grows. Best performances are obtained with six weeks of history.

{{% /tab %}}
{{% tab "USM" %}}

Watchdog scans all services and resources to look for anomalies on the following metrics:

  * エラー率
  * レイテンシー
  * ヒット数（リクエスト率）

Watchdog filters out minimally-used endpoints and services to reduce noise and avoid anomalies on small amounts of traffic. Additionally, if an anomaly on hit rate is detected but has no impact on latency or error rate, the anomaly is ignored. 

#### Required data history

Watchdog requires data to establish a baseline of expected behavior. For metric anomalies, the minimum history is two weeks. 
Watchdog starts finding anomalies after the minimum required history is available, and Watchdog improves as history grows. Best performances are obtained with six weeks of history.

{{% /tab %}}
{{% tab "Infrastructure" %}}

Watchdog looks at infrastructure metrics from the following integrations:

  * [System][1], for host-level memory usage (memory leaks) and TCP retransmit rate.
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

#### Required data history

Watchdog requires some data to establish a baseline of expected behavior. For metric anomalies, the minimum history is two weeks. 
Watchdog starts finding anomalies after the minimum required history is available, and Watchdog improves as history grows. Best performances are obtained with six weeks of history.

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

### Custom anomaly detection

Watchdog uses the same seasonal algorithms that power monitors and dashboards. To look for anomalies on other metrics or to customize the sensitivity, the following algorithms are available:

* [Anomaly monitors][10]
* [予測モニター][11]
* [Outlier monitors][12]

## Where to find Watchdog Alerts

Datadog 内で Watchdog アラートが表示される場所は以下の通りです。

* The [Watchdog Alert Explorer][1]
* On any individual [APM Service Page][3]
* [サービスカタログ][7]内
* In the [Watchdog Insights panel][8], available on all explorers 

### Watchdog binoculars on APM pages

When Watchdog detects an irregularity in an APM metric, the pink Watchdog binoculars icon appears next to the impacted service in the [APM Service Catalog][7].

{{< img src="watchdog/service_list.png" alt="Screenshot of the Service Catalog, showing 5 services. A pink binoculars icon follows the name of the web-store service." style="width:75%;" >}}

You can see greater detail about a metric anomaly by navigating to the top of a [Service Page][3] with the [Watchdog Insights][8] carousel.

Watchdog のアイコンは、メトリクスグラフにも表示されます。

{{< img src="watchdog/latency_graph.png" alt="サービスのレイテンシー (秒) をY軸に、時間帯を X 軸にとったグラフ。グラフ全体がピンク色で表示され、上部に「May 2: 13:31 Ongoing」と表示されている" style="width:75%;" >}}

Click on the binoculars icon to see a Watchdog Alert card with more details.

## アーカイブされたアラートの管理

To archive a Watchdog Alert, open the side panel and click the folder icon in the upper-right corner. Archiving hides the alert from the explorer, as well as other places in Datadog, like the home page. If an alert is archived, the pink Watchdog binoculars icon does not show up next to the relevant service or resource.

To see archived alerts, select the checkbox option to **Show _N_ archived alerts** in the top left of the [Watchdog Alert Explorer][1]. The option is only available if at least one alert is archived. You can see who archived each alert and when it was archived, and restore archived alerts to your feed.

**注**: アーカイブ後であっても、Watchdog はサービスやリソースに関連する問題にフラグを立てます。

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
