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

{{< img src="/tracing/change_tracking/change-tracking-overview.png" alt="The details of a change on the Recent Changes timeline in the Service Summary" style="width:100%;" >}}

Change Tracking streamlines incident response by surfacing relevant changes to aid in detection and remediation steps during an incident.

## Types of changes currently tracked
<!-- To DO: revisit the names of these with the Team ahead of GA -->
Application Deployments
: Code Deployments (APM)
: Configuration Changes (Kubernetes Manifest Updates)

Feature-Flag Changes
: LaunchDarkly feature flag events
: Custom feature flag events sent to Datadog’s Events Management API

Performance and Stability Changes
: Watchdog Alerts (Error rate, latency, Cloud & API outages, etc.)
: CrashLoopBackOff Kubernetes pod crashes

Data Layer Modifications
: Database Updates (PostgreSQL Database Schema and Settings Changes)
: Data Stream Updates (Kafka and gRPC Schema Changes)

## Prerequisites for Change Tracking
- Monitors: Requires that “service” tag is set on the monitor alert.
- Dashboards: Changes overlay on time-series graphs filtered with service tag.
- Services: No prerequisites.

## How to use Change Tracking
Change Tracking is available on the following pages within Datadog:

### Monitor Status Page
The Change Tracking experience in the Monitor Status page enables quick resolution without leaving the Monitor page. In your Monitor Status page, look for the "Recent Changes" section at the top of the page. 
{{< img src="/tracing/change_tracking/change-tracking-monitor-status-page.png" alt="The details of a change displayed on the Monitor Status Page" style="width:100%;" >}}

To analyze changes, use the top panel above the monitor status dashboard graph to correlate the timeline of recent change events correlated to the monitor alert you are investigating.

To enable Change Tracking on the Monitor Status page, ensure a service tag is added to your monitor.
<!--TO DO: Add Error Rate Graph Screenshot from Example Monitor Status Page Here -->

If you believe a recent change is a probable root cause for the monitor alert, click on the change to open up the side panel where you can learn more and take remediation action from within Datadog.

For example, when you tap the “Feature Flag” update, you would open this side panel to see a timeline of recent changes, the rollout status, and the change in a side-by-side comparison. 

See pre-built actions to see more details on the change in your deployment tool, or rollback the change.

### Services
For any service page, see the Recent Changes component within the Service Summary section. Changes in timelines on the Service Summary and Monitor Status pages are filtered to the direct service by default, but changes isolated to the scope of the individual service do not always tell the whole story. To identify correlations between changes in dependencies impacting the service, change the dropdown to include dependencies.

{{< img src="/tracing/change_tracking/change-tracking-service-page.png" alt="Recent Changes component within the Service Summary section with dependency changes enabled" style="width:100%;" >}}


### Dashboards
On any Dashboard, you can enable overlays using the "Show Overlays" button at the top of the page. 
{{< img src="/tracing/change_tracking/change-tracking-show-overlays-inactive.png" alt="Inactive show overlays button" style="width:100%;" >}}


This enables change events as overlays on the graphs. Hovering over the change events provides additional context around the change made in that timeline.
{{< img src="/tracing/change_tracking/change-tracking-dashboard-show-overlays-active.png" alt="Change tracking displayed on the Dashboard" style="width:100%;" >}}

Tapping on the change overlay would pull up the backend deploy side-panel as above.
{{< img src="/tracing/change_tracking/change-tracking-deployment-details-side-panel.png" alt="Change tracking side panel open" style="width:100%;" >}}