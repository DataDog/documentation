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

Change Tracking highlights relevant system changes to help you identify and resolve incidents. It automatically surfaces changes across your infrastructure, enabling faster detection and remediation of issues.

{{< img src="/tracing/change_tracking/change-tracking-overview.png" alt="The details of a change on the Recent Changes timeline in the Service Summary" style="width:100%;" >}}

## Tracked changes

Change Tracking follows these types of changes across your infrastructure:
<!-- To DO: revisit the names of these with the Team ahead of GA -->
Application Deployments
: Code Deployments (APM)
: Configuration Changes (Kubernetes Manifest Updates)

Feature-Flag Changes
: LaunchDarkly feature flag events
: Custom feature flag events sent to Datadog's Events Management API

Performance and Stability Changes
: Watchdog Alerts (Error rate, latency, Cloud & API outages)
: CrashLoopBackOff Kubernetes pod crashes

Data Layer Modifications
: Database Updates (PostgreSQL database schema and settings changes)
: Data Stream Updates (Kafka and gRPC schema changes)

## Prerequisites

To use Change Tracking, ensure the following:

- **Monitors**: Set the `service` tag on the monitor alert.
- **Dashboards**: Filter timeseries graphs by the `service` tag to see change overlays.
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
1. Click the change indictor in the **Recent Changes** timeline to view more details about the change.
1. From the side panel, you can investigate more details and take remediation actions.
1. Use the buttons in **Take actions** to:
   - View the deployment in your CI/CD system.
   - View the latest commits in your repository.
   - Compare changes between deployments to identify potential issues.

<div class="alert alert-info">To enable Change Tracking on the monitor status page, ensure a <code>service</code> tag is added to your monitor.
</div>

<!--TO DO: Add Error Rate Graph Screenshot from Example Monitor Status Page Here -->

### Services

View and analyze changes from the [service page][2].

{{< img src="/tracing/change_tracking/change-tracking-service-page.png" alt="Recent Changes component within the Service Summary section with dependency changes enabled" style="width:100%;" >}}

To analyze changes from the service page:

1. Navigate to the service page you want to investigate.
1. Locate the recent changes timeline in the **Service Summary** section.
1. Use the dropdown to view either:
   - Changes specific to this service (**only**)
   - Changes in dependent services that might impact this service (**and its dependencies**)
1. Click the change indicator to view detailed information and take remediation actions.

### Dashboards

View and analyze changes from any [dashboard][3].

{{< img src="/tracing/change_tracking/change-tracking-dashboard-show-overlays-active.png" alt="Change Tracking displayed on the Dashboard" style="width:100%;" >}}

To analyze changes from dashboards:

1. Navigate to your dashboard.
2. Click **Show Overlays** at the top of the page to enable change indicators.
3. Hover over any change indicator to view a summary of the change.
4. Click the change indicator to view detailed information and take remediation actions.

<div class="alert alert-info">To enable Change Tracking on dashboards, ensure your timeseries graphs are filtered by the <code>service</code> tag.</div>

{{< img src="/tracing/change_tracking/change-tracking-deployment-details-side-panel.png" alt="Change Tracking side panel open" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/status/
[2]: /tracing/services/service_page/
[3]: /dashboards/