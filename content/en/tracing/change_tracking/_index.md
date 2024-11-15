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
---

## Overview

Change Tracking streamlines troubleshooting and incident response by surfacing relevant changes to your service and its dependencies, enabling faster detection and remediation when issues arise.

{{< img src="/tracing/change_tracking/change-tracking-overview.png" alt="The details of a change on the Recent Changes timeline in the Service Summary" style="width:100%;" >}}

Change Tracking supports monitoring of a range of modifications to your service and its dependencies including:
- Deployments
- Feature Flags
- Database Modifications
- Schema Changes
- Scale Adjustments
- Kubernetes Adjustments
- Kubernetes Pod Crashes
- Watchdog Alerts

For details on specific types of supported changes and setup requirements [see below](#tracked-changes).

## Prerequisites

To use Change Tracking, ensure the following:

- **Monitors**: Confirm the service is specified in the monitor query, selected as part of a group, or set the `service` tag.
- **Dashboards**: Set at least one time series widget on the dashboard to see relevant changes within the timeline and as overlays.
- **Services**: No prerequisites.

## Using Change Tracking

Change Tracking is available on several pages in Datadog:

### Monitor status page

View and analyze changes from the [monitor status page][1].

{{< img src="/tracing/change_tracking/change-tracking-monitor-status-page.png" alt="The details of a change displayed on the Monitor Status Page" style="width:100%;" >}}

To analyze changes from the monitor status page:

1. Go to the monitor status page for the monitor you are analyzing.
1. Locate the **Recent Changes** section.
1. Use the **Recent Changes** timeline together with the **Status & History** graphs to correlate change events with the alert.
1. Click the change indicator in the **Recent Changes** timeline to view more details about the change in the side panel.
1. From the side panel, you can investigate more details and take the following actions:
   - View the deployment in your CI/CD system.
   - View the latest commits in your repository.
   - Compare changes between deployments to identify potential issues.
   - Set context-aware, **Custom Links** allow quick access to relevant resources.

### Services

View and analyze changes from the [service page][2].

{{< img src="/tracing/change_tracking/change-tracking-service-page.png" alt="Recent Changes component within the Service Summary section with dependency changes enabled" style="width:100%;" >}}

To analyze changes from the service page:

1. Navigate to the service page you want to investigate.
1. Locate the changes timeline in the **Service Summary** section.
1. Use the dropdown to view either:
   - Changes limited to the specific service (**Changes by Service**)
   - Changes to the specific service and dependent services that might impact this service (**Changes by Service & Dependencies**)
   - Changes to the specific servce and to all team dependencies (**Changes by Service & Team Dependencies**)
1. Click the change indicator to view detailed information and take remediation actions.

### Dashboards

View and analyze changes from any [dashboard][3].

{{< img src="/tracing/change_tracking/change-tracking-dashboard-show-overlays-active.png" alt="Change Tracking displayed on the Dashboard" style="width:100%;" >}}

To analyze changes from dashboards:

1. Navigate to your dashboard.
2. Click **Show Overlays** at the top of the page to enable the change timeline and change overlays on supported widgets.
3. Hover over any change indicator or overlay to view a summary of the change.
4. Click the change indicator or overlay to view detailed information and take remediation actions.

{{< img src="/tracing/change_tracking/change-tracking-deployment-details-side-panel.png" alt="Change Tracking side panel open" style="width:100%;" >}}

## Tracked changes

Change Tracking follows these types of changes across your infrastructure:

| Change Type | Tracking Requirements |
| ----------- | ----------- |
| Code Deployments (APM) | Works out of the box for APM customers as the agent injects the version if not provided.
| Kubernetes Deployment Manifest Updates | Datadog Agent Set Up for Kubernetes
| LaunchDarkly Feature Flag Events | Third Party Datadog Integrations (LaunchDarkly only)
| Custom Feature Flag Events | Events Management API (V2) 
| Watchdog Alerts (Error Rate Spike, Latency Spike, Cloud & API Outage) | Watchdog
| CrashLoopBackOff Kubernetes Pod Crashes | Datadog Agent, Kubernetes Integration
| PostgreSQL Database Table Change | Datadog Agent, Database Monitoring (DBM)
| PostgreSQL Database Settings Change | Datadog Agent, Database Monitoring (DBM)
|  Kafka Schema Updates | Datadog Agent, Data Streams Monitoring (DSM)
| Manual Kubernetes Deployment Scale Events | Datadog Agent, Kubernetes Audit Logging

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/status/
[2]: /tracing/services/service_page/
[3]: /dashboards/