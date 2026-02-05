---
title: Post Incident
description: Manage postmortems and follow-up tasks after incident resolution
further_reading:
- link: "/incident_response/incident_management/incident_settings/templates"
  tag: "Documentation"
  text: "Configure postmortem and message templates"
- link: "/incident_response/incident_management/post_incident/follow-ups"
  tag: "Documentation"
  text: "Manage incident follow-up tasks"
- link: "/incident_response/case_management/"
  tag: "Documentation"
  text: "Track follow-ups with Case Management"
---

## Overview

After an incident is resolved or reaches a stable state, the post-incident phase begins. This critical phase focuses on documenting what happened, capturing lessons learned, and tracking follow-up actions to prevent similar incidents in the future. The post-incident workflow ensures continuous improvement of your incident response process and helps build organizational knowledge.

Use post-incident activities to:

- Generate postmortems documenting incident details, root cause, and learnings
- Create and manage follow-up tasks for remediation and process improvements
- Communicate incident status and resolution to stakeholders
- Build a knowledge base of incident patterns and resolutions

## Postmortems

Postmortems are essential for continuous improvement of your incident response process. After an incident is resolved, you can generate a postmortem that automatically populates with incident information using a Datadog Notebook or Confluence page.

An incident postmortem typically includes:

- **Incident summary**: High-level overview of what occurred
- **Timeline**: Chronological sequence of events during the incident
- **Root cause analysis**: Detailed investigation of underlying causes
- **Impact assessment**: Customer and service impact metrics
- **Action items**: Specific tasks to prevent recurrence
- **Lessons learned**: Key takeaways for the organization

After generating a postmortem, you can:

1. Assign an owner to complete the postmortem documentation
2. Track postmortem state (draft, in review, or published)
3. Collaborate with team members using Notebook features
4. Link related documents and resources

To configure postmortem templates and customize the structure of your postmortems, navigate to [Incident Settings][1] and define templates that match your organization's needs.

For more information, see [Postmortem Templates][2].

## Follow-ups

During an incident investigation, your team may identify issues that need attention but aren't directly related to resolving the immediate problem. Follow-ups allow you to capture these items for later action without losing track of them in the rush to restore service.

Common examples include infrastructure improvements, technical debt, process gaps, and root cause fixes that require more time than the immediate mitigation.

Follow-ups can be created at any point during or after an incident from the incident's **Remediation** tab or from Slack. After resolution, you can export follow-ups to [Jira][3] (unidirectional sync) or [Case Management][4] (bidirectional sync with Jira and ServiceNow) to integrate them into your team's existing workflows.

For detailed information on creating, managing, and exporting follow-ups, see [Incident Follow-ups][5].

## Status pages

Communicate incident status and resolution to stakeholders using status pages. You can create and update status page notices directly from incidents to share service availability and incident details with customers or internal teams. Status page updates can be connected to specific incident components to automatically reflect the impact of ongoing incidents.

For more information on integrating status pages with your incident workflow, see [Status Pages][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings
[2]: /incident_response/incident_management/incident_settings/templates#postmortems
[3]: /integrations/jira/
[4]: /incident_response/case_management/
[5]: /incident_response/incident_management/post_incident/follow-ups
[6]: /incident_response/status_pages/
