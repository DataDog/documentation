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
2. Select a project from the left-hand panel to display out-of-the-box status views such as **Open**, **In Progress**, **Closed**, and **Archived**.   
3. Use the display settings icon to choose between **split view** (for detailed case investigation) or **table view** (for bulk case review and column configuration). Customize your inbox ranking with the **Sort By** dropdown-options include **Priority**, **Created at**, or **Last Updated**. Click **Save** to re-use your customized inbox for future use.
5. Update the status, priority, and assignment directly on case cards during triage.  
6. Maximize screen space by collapsing the left-hand case project panel and the Datadog navigation bar.  
7. Hover over the case card **alert** count to preview correlated alerts.  
    
## Next Steps

Now that you've learned how to triage and investigate cases, use these tools to [collaborate](#collaborate-and-integrate) with your team, [take action](#take-action) on root causes, and streamline response efforts.

## Collaborate and Integrate

On the right hand split-view side panel, you can perform the following:
  
- **Tag and comment**: Collaborate with teammates in the case timeline by tagging users and adding notes.
- **Send notifications**: Alert stakeholders with Slack, Microsoft Teams, email, or webhooks.
- **Escalate issues**: Trigger an incident or page an on-call responder using [Incident Management][1], [On-Call][2], [Workflow Automation][3], or third-party tools.
- **Sync with external tools**: Keep Jira and ServiceNow records in-sync to ensure external stakeholders stay up to date.

## Take Action

- **Mark root cause**: Identify and mark a related event, such as a faulty change, as the root cause.
- **Run workflows**: Execute remediation runbooks manually or trigger them conditionally with [Case Automation Workflows][5].
- **Merge cases**: Combine related cases to streamline investigations.
- **Split cases**: Separate alerts that require individual investigation.

**Note**: When all alerts in the case are resolved, the system automatically closes the case, or you can manually mark it as resolved.  

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}  

[1]: https://docs.datadoghq.com/service_management/incident_management/  
[2]: https://docs.datadoghq.com/service_management/on-call/  
[3]: https://docs.datadoghq.com/actions/workflows/
[4]: https://app.datadoghq.com/event/correlation
[5]: /service_management/case_management/automation_rules/