---
title: Change Tracking
description: "Streamline troubleshooting with Change Tracking by monitoring deployments, feature flags, configuration changes, and other modifications to your services."
further_reading:
- link: "https://www.datadoghq.com/blog/change-tracking/"
  tag: "Blog"
  text: "Unify visibility into changes to your services and dependencies"
- link: "/monitors/status/"
  tag: "Documentation"
  text: "Monitor Status Page"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Dashboards"
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Service Page"
---

## Overview

Change Tracking streamlines troubleshooting and incident response by surfacing relevant changes to your service and its dependencies, enabling faster detection and remediation when issues arise.

{{< img src="/change_tracking/change-tracking-overview-2.png" alt="The details of a change on the Recent Changes timeline in the Service Summary" style="width:100%;" >}}

Change Tracking supports monitoring of a range of modifications to your service and its dependencies including:
- Deployments
- Feature Flags
- Traffic Spikes
- Configuration Changes
- Database Modifications
- Schema Changes
- Scale Adjustments
- Kubernetes Adjustments
- Kubernetes Pod Crashes
- Watchdog Alerts

For details on specific types of supported changes and setup requirements, see [Tracked Change Types][16].

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
1. Locate the changes timeline in the {{< ui >}}Service Summary{{< /ui >}} section.
1. Use the service and dependencies tabs to view either:
   - Changes limited to the specific service ({{< ui >}}Changes by Service{{< /ui >}})
   - Changes to the specific service and dependent services that might impact this service ({{< ui >}}Changes by Service + Dependencies{{< /ui >}})
1. Click the change indicator to view detailed information and take remediation actions.

### Dashboards

View and analyze changes from any [dashboard][3].

{{< img src="/change_tracking/change-tracking-dashboard-show-overlays-active-2.png" alt="Change Tracking displayed on the Dashboard" style="width:100%;" >}}

#### Prerequisites
To see relevant changes within the timeline and as overlays on your dashboard, ensure you have set at least one timeseries widget.

#### To analyze changes from dashboards:

1. Navigate to your dashboard.
2. Click {{< ui >}}Show Overlays{{< /ui >}} at the top of the page to enable the change timeline and change overlays on supported widgets.
3. Hover over any change indicator or overlay to view a summary of the change.
4. Click the change indicator or overlay to view detailed information and take remediation actions.

### Widgets

In addition to the out-of-the-box integrations, Change Tracking is available as a data source for widgets across Datadog, including Dashboards and Notebooks.

{{< img src="/change_tracking/change-tracking-datasource-examples.png" alt="Change Tracking datasource examples" style="width:100%;" >}}

To configure a widget using Change Tracking data:

1.	In a dashboard or notebook, add or edit a supported widget type (Timeseries, Query Value, Table, Tree Map, Top List, Pie, Change, or Bar Chart).
3.	From the {{< ui >}}data source{{< /ui >}} dropdown, select {{< ui >}}Change Tracking{{< /ui >}}.
4.	Configure your filters ({{< ui >}}Service{{< /ui >}} is required).
5.	(Optional) For widgets that support grouping, use {{< ui >}}Group by{{< /ui >}} to split results.

{{< img src="/change_tracking/change-tracking-datasource-edit-widget.png" alt="Change Tracking datasource widgets" style="width:100%;" >}}

For Timeseries widgets, you can also enable Change Tracking as an {{< ui >}}Event Overlay{{< /ui >}}, which displays changes on top of the timeseries to help correlate them with metric behavior.

{{< img src="/change_tracking/change-tracking-datasource-edit-overlay.png" alt="Change Tracking datasource as Event Overlay" style="width:100%;" >}}


#### View change details

To view information about a change or set of changes, click a datapoint in the widget and select {{< ui >}}View Changes{{< /ui >}}. This opens the Change Tracking side panel with additional details.

## Change types you can track

Change Tracking covers deployments, feature flags, database changes, streaming/application behavior, infrastructure changes, and any custom change you send yourself.

For the full list of change types, the Datadog feature each one comes from, and what you need to enable it, see [Tracked Change Types][16].
  

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
[11]: /actions/connections/#work-with-connections
[12]: /database_monitoring/schema_explorer
[13]: /infrastructure/resource_catalog/resource_changes/
[15]: /tracing
[16]: /change_tracking/change_types/
