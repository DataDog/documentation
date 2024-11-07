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

### Types of changes currently tracked:
<!-- To DO: revisit the names of these with the Team ahead of GA -->
- APM Deployments
- Feature-Flag Changes
<!--Open Question: Should we mention we only have support for Launch Darkly? Need to configure Launch Darkly to send events to Datadog. -->
<!-- We also have an API that is already in prod from the Events Management Team that currently support sending feature flag events (customers with homegrown feature flag solutions) -->
- Watchdog Stories (error rate, latency, third party monitoring, etc.)
- Database Changes (postgres table, postgres settings)
<!--Open Question: This is only available for customers with Database Monitoring already set up. Should we link out to a setup page for DBM?  -->
<!--Open Question: Should we reference future database changes we will support or limit it to what is available now? -->
- Kubernetes Deployments (Manifest Updates)
<!--Open Question: For Kubernetes Deployments, need to have the agent configured for Kubernetes. Should we link out to kubernetes set up for Agent docs? -->
- CrashLoopBackOff Kubernetes Pod Crashes 
- Data Stream Monitoring Changes (Schema Updates)
<!--Open Question: This is only available for customers with Data Stream Monitoring already set up. Should we link out to a setup page for DSM?  -->

### Prerequisites for Change Tracking
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

See pre-built actions to see more details on the change in your deployment tool, or rollback the change. To learn more about these customizable actions, please reach out to us.

To get started with configuring your repository, see the [Source Code Integration documentation][6].


### Services
For any service page, see the Recent Changes component within the Service Summary section. To view recent changes from service dependencies, click the "Dependencies" toggle.
<!-- TO DO: Dependencies toggle may change to a dropdown prior to GA -->
{{< img src="/tracing/change_tracking/change-tracking-service-page.png" alt="Recent Changes component within the Service Summary section with dependency changes enabled" style="width:100%;" >}}


### Dashboards
On any Dashboard, you can enable overlays using the "Show Overlays" button at the top of the page. 
{{< img src="/tracing/change_tracking/change-tracking-show-overlays-inactive.png" alt="Inactive show overlays button" style="width:100%;" >}}


This enables change events as overlays on the graphs. Hovering over the change events provides additional context around the change made in that timeline.
{{< img src="/tracing/change_tracking/change-tracking-dashboard-show-overlays-active.png" alt="Change tracking displayed on the Dashboard" style="width:100%;" >}}

Tapping on the change overlay would pull up the backend deploy side-panel as above.
{{< img src="/tracing/change_tracking/change-tracking-deployment-details-side-panel.png" alt="Change tracking side panel open" style="width:100%;" >}}

## How does Change Tracking work?
Change Tracking overlays introduce changes associated with the service or metric. There is no Generative AI involved for Change Tracking. The Root Cause Analysis, powered by Watchdog and featured in Change Tracking, runs a causation analysis based on statistical signals such as anomalies in KPIs and identifies if a change has caused an issue. None of this involves any interaction with Open AI or any Generative AI foundation Models.