---
title: Change Tracking
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
---

## Overview

Change Tracking streamlines troubleshooting and incident response by surfacing relevant changes to your service and its dependencies, enabling faster detection and remediation when issues arise.

{{< img src="/change_tracking/change-tracking-overview.png" alt="The details of a change on the Recent Changes timeline in the Service Summary" style="width:100%;" >}}

Change Tracking supports monitoring of a range of modifications to your service and its dependencies including:
- Deployments
- Feature Flags
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

{{< img src="/change_tracking/change-tracking-monitor-status-page.png" alt="Change Tracking displayed on the Monitor Status Page" style="width:100%;" >}}

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

{{< img src="/change_tracking/change-tracking-service-page.png" alt="Recent Changes component within the Service Summary section with dependency changes shown" style="width:100%;" >}}

#### To analyze changes from the service page:

1. Navigate to the service page you want to investigate.
1. Locate the changes timeline in the **Service Summary** section.
1. Use the dropdown to view either:
   - Changes limited to the specific service (**Changes by Service**)
   - Changes to the specific service and dependent services that might impact this service (**Changes by Service & Dependencies**)
1. Click the change indicator to view detailed information and take remediation actions.

### Dashboards

View and analyze changes from any [dashboard][3].

{{< img src="/change_tracking/change-tracking-dashboard-show-overlays-active.png" alt="Change Tracking displayed on the Dashboard" style="width:100%;" >}}

#### Prerequisites
To see relevant changes within the timeline and as overlays on your dashboard, ensure you have set at least one timeseries widget.

#### To analyze changes from dashboards:

1. Navigate to your dashboard.
2. Click **Show Overlays** at the top of the page to enable the change timeline and change overlays on supported widgets.
3. Hover over any change indicator or overlay to view a summary of the change.
4. Click the change indicator or overlay to view detailed information and take remediation actions.

## Tracked changes
Change Tracking follows these types of changes across your infrastructure:

| Change Type | Tracking Requirements |
| ----------- | ----------- |
| Code Deployments (APM) | APM & [Deployment Tracking][4]. A version must be available on the service.
| Kubernetes Deployment Manifest Updates | Datadog Agent Set Up for Kubernetes (Add service label to kubernetes yaml file if possible)
| LaunchDarkly Feature Flag Events (service tag must be defined on event) | Third Party Datadog Integrations ([LaunchDarkly only][5])
| Custom Feature Flag Events | [Event Management API][6]
| Watchdog Alerts (Error Rate Spikes, Latency Spikes, Cloud and API Outages, etc.). | See [Watchdog][7] documentation to learn more about requirements for specific Watchdog Alerts.
| CrashLoopBackOff Kubernetes Pod Crashes | Kubernetes Integration (Add service label to kubernetes yaml file if possible)
| PostgreSQL Database Table Change | [Database Monitoring (DBM)][8], [Correlate Database Monitoring and Traces][10]
| PostgreSQL Database Settings Change | [Database Monitoring (DBM)][8], [Correlate Database Monitoring and Traces][10]
|  Kafka Schema Updates | [Data Streams Monitoring (DSM)][9]
| Manual Kubernetes Deployment Scale Events | Kubernetes Audit Logging

### Optional enrichment for feature flag changes
Change Tracking offers an optional way to enhance visibility into feature flag changes by automatically detecting affected services when tracing is set up for the feature flag client. This enhancement enables faster and more precise root cause analysis, especially when feature flag changes impact multiple services.

#### To enable auto-enrichment of feature flag changes

Auto-enrichment helps you identify which services are affected by feature flag changes by automatically detecting service dependencies through tracing. To set this up:

1. Add tracing around your feature flag client code.
2. Name the trace operation **experiments.IsEnabled**.
3. Add a tag called **experiment_id**. Set its value to match the ID of the relevant feature flag.

#### To toggle LaunchDarkly feature flags from the details panel

If you discover that a feature flag change is causing issues, you can remediate it by toggling the flag directly from the Change Tracking side panel.

To enable and use this feature:

1. Set up workflow connections following the [Workflow Connections documentation][11].
1. Navigate to the service page you want to investigate.
1. Locate the changes timeline in the **Service Summary** section.
1. Click any feature flag change in the Change Tracking timeline to open the details panel.
  {{< img src="/change_tracking/feature-flag-toggle.png" alt="Click feature flag events to view more detail and toggle the feature flag." style="width:90%;" >}}

1. Click **Toggle Feature Flag** to turn the feature flag on or off.

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