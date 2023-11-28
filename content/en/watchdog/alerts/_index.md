---
title: Watchdog Alerts
kind: documentation
---

## Overview

The Watchdog alerts feature proactively detects service, infrastructure, and log anomalies. Watchdog scans all of your monitored technologies for unusual behavior. If the unusual behavior matches one of Watchdog's anomaly patterns, Watchdog creates an alert.

## Alerts

### Where to find Watchdog alerts

Watchdog alerts appear in three places within the Datadog site:
- The [Watchdog alerts feed][1]
- The [APM home page][2]
- On an individual [APM Service Page][3]

### Alert overview

Each alert overview card communicates information about one anomaly. 

{{< img src="watchdog/alerts/alerts_overview.png" alt="Screenshot of a Watchdog alert card, showing an elevated error rate on the send-sms endpoint in sms-service" style="width:100%;">}}

An alert overview card contains the sections below:

1. Status: The anomaly can be **ongoing** or **resolved**.
2. Timeline: Describes over what time period the anomaly occurs.
3. Message: Describes the anomaly.
4. Graph: Visually represents the anomaly.
5. Tags: Shows the scope of the anomaly.
6. [Impact][4] (when available): Describes which users, views, or services the anomaly affects.

To hide an irrelevant alert, hover over it. Click the folder icon that appears in the upper right corner.

### Alert details

Clicking anywhere on an alert overview card opens the alerts details pane.

In addition to repeating the information in the alert overview card, the **Overview** tab may contain one or more of the following fields:
- Expected Bounds: Click the **Show expected bounds** checkbox. The graph changes color to differentiate between expected and anomalous behavior.
- Suggested Next Steps: Describes steps for investigation and triage of the anomalous behavior.
- Related dashboards: Suggests some of your dashboards that are correlated to the alert. Datadog highlights which of the dashboard's metrics are related to the insights in the alert.

The **Monitors** tab lists monitors associated with your alert. Each monitor displayed has the metric of the current alert and its associated tags included in its scope.

Additionally, Watchdog suggests one or more monitors you can create to notify you if the anomaly happens again. These monitors do not exist yet, so the table lists their status as **suggested**. Click **Enable Monitor** to enable the suggested monitor for your organization. A series of icons pops up allowing you to open, edit, clone, mute, or delete the new monitor.

## Filter alerts

You can use the time range, search bar, or facets to filter your Watchdog alerts feed.

### Time range

Use the time range selector in the upper right to view alerts detected in a specific time range. You can view any alert that happened in the last 13 months.

### Search bar

Enter text in the **Filter alerts** search box to search over your alert titles.

### Facets

The left side of the Watchdog alerts feed contains the search facets below. Check the corresponding boxes to filter your alerts by facet.

| All Alerts Group    | Description                                                           |
|---------------------|-----------------------------------------------------------------------|
| Alert Category      | Display all `apm`, `infrastructure`, or `logs` alerts.                |
| Alert Type          | Select alerts using metrics from APM or infrastructure integrations.  |
| Alert Status        | Select alerts based on their status (ongoing or resolved).
| APM Primary Tag     | The [defined APM primary tag][6] to display alerts from.              |
| Environment         | The environment to display alerts from. See [Unified Service Tagging][5] for more information about the `env` tag.                                                                                          |
| Service             | The service to display alerts from. See [Unified Service Tagging][5] for more information about the `service` tag.                                                                                          |

| Logs Group      | Description                                                           |
|-----------------|-----------------------------------------------------------------------|
| Log Anomaly Type| Only display log anomalies of this type. The supported types are new log patterns and increases in existing log patterns.                                                                                 |
| Log Source      | Only display alerts containing logs from this source.                 |
| Log Status      | Only display alerts containing logs of this log status.               |



## Manage archived alerts

In a Watchdog alert's side panel, click the folder icon in the upper-right corner to archive it. Archiving hides the alert from the feed, as well as other places in the Datadog site, like the home page. If an alert is archived, the pink Watchdog binoculars icon does not show up next to the relevant service or resource.

To see archived alerts, select the checkbox option to "Show N archived alerts" in the top left of the [Watchdog alerts feed][1]. The option is only available if there is at least one alert archived. You can also see who archived each alert and when it was archived, and restore archived alerts to your feed.

**Note**: Archiving does not prevent Watchdog from flagging future issues related to the service or resource.

[1]: https://app.datadoghq.com/watchdog
[2]: https://app.datadoghq.com/apm/home
[3]: /tracing/services/service_page/
[4]: /watchdog/impact_analysis/
[5]: /getting_started/tagging/unified_service_tagging/
[6]: /tracing/guide/setting_primary_tags_to_scope/
