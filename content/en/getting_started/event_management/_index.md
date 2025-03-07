---
title: Getting Started with Event Management Inbox
further_reading:
- link: "https://www.datadoghq.com/blog/monitoring-101-alerting/"
  tag: "Blog"
  text: "Monitoring 101: Alerting on what matters"
- link: "https://learn.datadoghq.com/courses/introduction-to-observability"
  tag: "Learning Center"
  text: "Introduction to Observability"
- link: "/monitors/types/metric/"
  tag: "Documentation"
  text: "Metric Monitors"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor Notifications"
- link: "https://dtdg.co/fe"
  tag: "Foundation Enablement"
  text: "Join an interactive session on creating effective monitors"
---

# Overview

Datadog Event Management Inbox helps correlate events from any source into actionable insights, enabling teams to contextualize investigations with events from Watchdog, Datadog Monitors, integrations, third-party tools, changes, and more - alongside related telemetry by the Datadog Agent. By consolidating these insights, teams can streamline incident response and improve operational efficiency.

Event Management provides a centralized inbox that helps teams efficiently triage, investigate, and resolve incidents. Users can quickly preview related events, identify root causes, and take appropriate actions. Filtering and sorting options allow teams to focus on the most critical cases, while collaboration features like tagging and case merging ensure seamless teamwork. An AI-powered correlation engine groups related events into cases, reducing alert fatigue and helping teams work with a manageable number of high-value incidents. 

By integrating with third-party tools such as ServiceNow, Jira, and PagerDuty, Datadog Event Management enhances collaboration and ensures that the right teams are involved in resolving issues on time. This structured workflow not only accelerates incident resolution but also improves operational efficiency, enabling teams to reduce time spent on event correlation and triage. With consolidated insights and automation-driven workflows, teams can streamline their incident response processes, reduce downtime, and improve overall system reliability.

# Key Features

## Case Triage and Investigation

- **Inbox for Centralized Triage:** View and manage all incoming cases in a single location.  
- **Related Events and Metrics**: Gain insights into correlated logs, metrics, and alerts.  
- **Root Cause Identification:** Preview linked cases to diagnose incidents.  
- **Bulk Actions:** Apply updates to cases by changing their priority, assigning them to team members, or escalating multiple cases at once. 

# Getting Started

1. Navigate to **Service Management** → **Event Management** → **Inbox**.  
2. Click **Show Control** to display current case statuses such as **Open**, **In Progress**, **Closed**, **Archived**. To minimize the left-hand case status panel, click **Collapse.**  
3. Select between a **structured table layout** or a **split view** for contextual details alongside case information.  
4. Use the **sort toggle** to organize your inbox to by high-urgency cases, status, or creation date.
5. Apply bulk actions to update multiple cases at once by changing priority, assigning cases, or escalating issues while triaging.   
6. Take action by claiming the case, merging similar cases, or split unrelated alerts to maintain an organized investigation.
7. Tag teammates, comment on cases, or copy case links to share in Slack, Teams, or incident threads.  
8. View related events and metrics relative to the current case.
9. Click to Declare an Incident, Create a Jira Issue or Create a Service Now Incident, or run a Workflow.
10. When the issue is resolved, the system automatically closes the case, or you can manually mark it as resolved.
  
With Datadog Event Management, teams can improve operational efficiency by reducing time spent on even correlations and triage, ensuring faster and more effective incident resolution.

## View and Navigation

- **Configurable Views:** Filter inbox to show high-urgency cases or specific statuses, such as only P1/P2 cases, Status, or Created at.  
- **Table and Split Views:** Choose between a structured table layout or a split view for contextual details.  
- **Sorting and Filtering:** Organize cases by priority, severity, or custom attributes.  
- **Collapsible Panel:** Maximize screen space for better efficient case management.  
- **Keyboard Shortcuts:** Navigate quickly with shortcuts.

## Collaboration and Insights

- **Tagging and Comments:** Collaborate with teammates by tagging users and assigning cases.  
- **Related Case Previews:** Quickly access linked cases for comprehensive investigations.  
- **Historical Context:** Review past events and resolutions to improve future responses.

## Merging & Splitting Cases

- **Merging Cases:** Combine duplicate or related cases for more efficient tracking.  
- **Splitting Cases:** Separate cases when multiple unrelated alerts are grouped together.

## Case Closure & Resolution

- **Auto-Closure:** Cases automatically resolve when all related alerts recover.  
- **Manual Closure:** Users can manually mark a case as resolved if remediation has been applied.  
- **Case sharing:**  
  - Copy cases links to share in Slack, Teams, or incident threads.  
  - Open cases in a new tab for side-by-side investigations.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}