---  
title: Getting Started with Event Management Inbox  
further_reading:  
- link: "/service_management/events/ingest//"  
  tag: "doc"  
  text: "Send events to Datadog"  
- link: "/service_management/events/correlation/"  
  tag: "doc"  
  text: "Learn more about event correlation"  
- link: "https://www.datadoghq.com/blog/datadog-event-management/"  
  tag: "Blog"  
  text: "Aggregate, correlate, and act on alerts faster with AIOps-powered Event Management"  
---

## Overview  

Datadog Event Management [Triage Inbox][4] simplifies incident response by consolidating related events from any source into actionable cases. This centralized view reduces noise and helps teams triage, investigate, and collaborate more effectively. With customizable saved views, you can stay focused on high-priority cases and review correlated alerts, related changes, and telemetry, all in one place.


## Case triage and investigation

Case triage and investigation begins in the Triage Inbox, where you can sort, filter, and manage incoming cases. Collaborate seamlessly with teammates, both within and outside of Datadog, to coordinate responses. From there, you can prioritize, assign, investigate, and escalate cases as needed to drive faster resolution.

## Getting Started

1. Navigate to **Service Management** → **Event Management** → **Triage Inbox**.    
2. Select a project from the left-hand case project panel to display out-of-the-box status views such as **Open**, **In Progress**, **Closed**, **Archived**. To minimize the left-hand case status panel, click **Collapse.**    
3. Select between a **split view** display to work through individual case details or a higher-density **table view** to configure displayed columns and review cases in bulk.    
4. Use the **sort toggle** to customize your inbox ranking, for example by **Priority**, **Created At**, or **Last Updated**.  
5. Make inline updates to status, priority, and assignment from case cards while triaging.     
6. Reorganize your investigations by merging similar cases or splitting unrelated alerts.  
7. Tag teammates, comment on cases, or notify via integrations to collaborate.    
8. Escalate via Datadog [Incident Management][1], [On-Call][2], [Workflow Automation][3], or third-party integrations.  
9. When you resolve all alerts in the case, the system automatically closes the case, or you can manually mark it as resolved.  
    

### Manage Work

- **Collapsible Panels:** Maximize screen space by collapsing the left-hand case project panel and Datadog navigation bar.  
- **Display Options:** Select between a **split view** display to work through individual case details or a higher-density **table view** to configure displayed columns and review cases in bulk.  
- **Case Previews:** Hover over the case card alert count to preview correlated alerts.  
- **Saved Views:** Filter inbox to show curated sets of cases, such as only open cases with high priority or cases for a specific team.   
- **Sorting:** Organize cases to review in the right order, for example by **Priority**, **Created At**, or **Last Updated**.    
- **Keyboard Shortcuts:** Navigate quickly with shortcuts to switch between cases, set priority, set status, assign, and escalate.

### Collaborate and Integrate

- **Tagging and Comments:** Use the case timeline to collaborate with teammates by tagging users and adding notes.  
- **Notifications:** Send Slack, Microsoft Teams, Email, and Webhook notifications.  
- **Escalations:** Declare an Incident or Page an On-Call responder with Datadog [Incident Management][1], [On-Call][2], [Workflow Automation][3], and third-party integrations.  
- **Bidirectional Syncing:** Keep stakeholders outside of Datadog up-to-date with Jira and ServiceNow bidirectional record synchronization.

### Take Action

- **Marking Root Cause:** Select a related event such as a faulty change to mark it as root cause.  
- **Running Workflows:** Execute runbooks for remediation manually or conditionally with Case Automation Workflows.  
- **Merging Cases:** Combine related cases for more unified investigations.    
- **Splitting Cases:** Split alerts that you want to investigate separately.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}  

[1]: https://docs.datadoghq.com/service_management/incident_management/  
[2]: https://docs.datadoghq.com/service_management/on-call/  
[3]: https://docs.datadoghq.com/actions/workflows/
[4]: https://app.datadoghq.com/event/correlation