---
title: Change Tracking
description: "Streamline troubleshooting with Change Tracking by monitoring deployments, feature flags, configuration changes, and other modifications to your services."
further_reading:
- link: "/monitors/status/"
  tag: "Documentation"
  text: "Monitor Status Page"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Dashboards"
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Service Page"
- link: "/api/latest/events/"
  tag: "Documentation"
  text: "Event Management API"
- link: "/tracing/services/deployment_tracking/"
  tag: "Documentation"
  text: "Deployment Tracking"
- link: "/integrations/launchdarkly/#feature-flag-tracking-integration/"
  tag: "Documentation"
  text: "LaunchDarkly"
- link: "/watchdog/"
  tag: "Documentation"
  text: "Watchdog"
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/data_streams/"
  tag: "Documentation"
  text: "Data Streams Monitoring"
- link: "https://www.datadoghq.com/blog/change-tracking/"
  tag: "Blog"
  text: "Unify visibility into changes to your services and dependencies"
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Change Tracking is not available in the selected site ({{< region-param key="dd_site_name" >}})</div>
{{< /site-region >}}

## Overview

Change Tracking streamlines troubleshooting and incident response by surfacing relevant changes to your service and its dependencies, enabling faster detection and remediation when issues arise.

{{< img src="/change_tracking/change-tracking-overview-2.png" alt="The details of a change on the Recent Changes timeline in the Service Summary" style="width:100%;" >}}

Change Tracking supports monitoring of a range of modifications to your service and its dependencies including:
- Deployments
- [Feature Flags][14]
- Traffic Spikes
- Configuration Changes
- Database Modifications
- Schema Changes
- Scale Adjustments
- Kubernetes Adjustments
- Kubernetes Pod Crashes
- Watchdog Alerts

For details on specific types of supported changes and setup requirements, see the [Tracked changes](#tracked-changes) section.

## Using Change Tracking

Change Tracking is available on several pages in Datadog:

### Monitor status page

View and analyze changes from the [monitor status page][1].

{{< img src="/change_tracking/change-tracking-monitor-status-page-2.png" alt="Change Tracking displayed on the Monitor Status Page" style="width:100%;" >}}

#### Prerequisites

To use change tracking on the Monitor Status Page, ensure the appropriate service has been:
- Specified in the monitor query.
- Selected as part of a group.
- Added as a `service` tag on the monitor.

#### To analyze changes from the monitor status page:

1. Go to the monitor status page for the monitor you are analyzing.
1. Locate the change tracking timeline at the top of the page.
   - For monitors with multiple graphs (dictated by the group by in the monitor query), filter to an individual group.
1. Use the timeline together with the event graphs to correlate change events with the alert.
1. Click the change indicator in the timeline to view more details about the change in the side panel.
1. From the side panel, you can investigate more details about the change and take the following actions:
   - View the deployment in your CI/CD system.
   - View the latest commits in your repository.
   - Compare changes between deployments to identify potential issues.
   - Configure additional custom links in the deployment side panel to quickly access other resources relevant to you.

### Services

View and analyze changes from the [service page][2].

{{< img src="/change_tracking/change-tracking-service-page-2.png" alt="Recent Changes component within the Service Summary section with dependency changes shown" style="width:100%;" >}}

#### To analyze changes from the service page:

1. Navigate to the service page you want to investigate.
1. Locate the changes timeline in the **Service Summary** section.
1. Use the service and dependencies tabs to view either:
   - Changes limited to the specific service (**Changes by Service**)
   - Changes to the specific service and dependent services that might impact this service (**Changes by Service + Dependencies**)
1. Click the change indicator to view detailed information and take remediation actions.

### Dashboards

View and analyze changes from any [dashboard][3].

{{< img src="/change_tracking/change-tracking-dashboard-show-overlays-active-2.png" alt="Change Tracking displayed on the Dashboard" style="width:100%;" >}}

#### Prerequisites
To see relevant changes within the timeline and as overlays on your dashboard, ensure you have set at least one timeseries widget.

#### To analyze changes from dashboards:

1. Navigate to your dashboard.
2. Click **Show Overlays** at the top of the page to enable the change timeline and change overlays on supported widgets.
3. Hover over any change indicator or overlay to view a summary of the change.
4. Click the change indicator or overlay to view detailed information and take remediation actions.

### Visualize Change Tracking data in widgets

In addition to the out-of-the-box integrations described above, **Change Tracking is available as a data source for widgets** across Datadog, including Dashboards and Notebooks.

To configure a widget using Change Tracking data:

1.	In a dashboard or notebook, add or edit a  supported widget type (Timeseries, Query Value, Table, Tree Map, Top List, Pie, Change, or Bar Chart).
3.	From the **Data source** dropdown, select **Change Tracking**.
4.	Configure your filters (**Service** is required).
5.	(Optional) For widgets that support grouping, use **Group by** to split results.

{{< img src="/change_tracking/change-tracking-datasource-widget.png" alt="Change Tracking datasource widgets" style="width:50%;" >}}

For Timeseries widgets, Change Tracking can also be enabled as an **event overlay** from the **Event Overlays** section. This displays changes overlaid on top of a timeseries to help correlate them with metric behavior.

{{< img src="/change_tracking/change-tracking-datasource-overlay.png" alt="Change Tracking datasource as Event Overlay" style="width:50%;" >}}


#### View change details

To view information about a change or set of changes, click a datapoint in the widget and select **View Changes**. This opens the Change Tracking side panel with additional details.

## Tracked changes
Change Tracking follows these types of changes across your infrastructure:

| Change Type                                                                      | Tracking Requirements                                                                                                                                                                   |
|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Code Deployments (APM)                                                           | APM & [Deployment Tracking][4]. A version must be available on the service.                                                                                                             |
| Kubernetes Deployment Manifest Updates                                           | Datadog Agent Set Up for Kubernetes (Add service label to Kubernetes yaml file if possible).                                                                                             |
| Feature Flags                                                                    | Use the LaunchDarkly integration or send custom events using the Events API. See the [Feature Flag Tracking documentation][14] for setup and advanced options.                          |
| Custom Configuration Change Events                                               | [Event Management API][6].                                                                                                                                                               |
| Watchdog Alerts (Error Rate Spikes, Latency Spikes, Cloud and API Outages, etc.) | See [Watchdog][7] documentation to learn more about requirements for specific Watchdog Alerts.                                                                                          |
| Traffic Spikes (APM)                                                             | [Application Performance Monitoring (APM)][15]
| CrashLoopBackOff Kubernetes Pod Crashes                                          | Kubernetes Integration (Add service label to Kubernetes yaml file if possible).                                                                                                          |
| PostgreSQL, SQL Server and MySQL Database Table (Schemas) Change                 | See [Exploring Database Schemas][12] documentation to learn more about tracking schemas using DBM, and [Correlate Database Monitoring and Traces][10] to set up APM and DBM correlation. |
| MongoDB Index & SearchIndex Changes                                              | [Database Monitoring (DBM)][8], [Correlate Database Monitoring and Traces][10].                                                                                                          |
| PostgreSQL Database Settings Change                                              | [Database Monitoring (DBM)][8], [Correlate Database Monitoring and Traces][10].                                                                                                          |
| SQL Server Database Settings Change                                              | [Database Monitoring (DBM)][8], [Correlate Database Monitoring and Traces][10].                                                                                                          |
| Kafka Schema Updates                                                             | [Data Streams Monitoring (DSM)][9].                                                                                                                                                      |
| Manual Kubernetes Deployment Scale Events                                        | Kubernetes Audit Logging.                                                                                                                                                               |
| Cloud Infrastructure Resource Changes ({{< tooltip text="in Preview" tooltip="This feature is in Preview and currently limited to a small sample of cloud resource changes. To request access, see the Resource Changes documentation linked in Tracking Requirements." >}}) | [Resource Changes][13] - Enable Resource Collection and optionally cloud provider event forwarding.       

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/status/
[2]: /tracing/services/service_page/
[3]: /dashboards/
[4]: /tracing/services/deployment_tracking/
[5]: /integrations/launchdarkly/#feature-flag-tracking-integration/
[6]: /api/latest/events/
[7]: /watchdog/
[8]: /database_monitoring/
[9]: /data_streams/
[10]: /database_monitoring/connect_dbm_and_apm/
[11]: /service_management/workflows/connections/#work-with-connections
[12]: /database_monitoring/schema_explorer
[13]: /infrastructure/resource_catalog/resource_changes/
[14]: /change_tracking/feature_flags
[15]: /tracing