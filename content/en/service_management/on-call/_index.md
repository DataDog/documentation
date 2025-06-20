---
title: On-Call
further_reading:
- link: 'https://www.datadoghq.com/blog/datadog-on-call/'
  tag: 'Blog'
  text: 'Enrich your on-call experience by using Datadog On-Call'
- link: 'https://www.datadoghq.com/blog/on-call-paging/'
  tag: 'Blog'
  text: 'How to create an effective paging strategy'
- link: "https://www.datadoghq.com/blog/incidents-ai-workbench-status-page/"
  tag: "Blog"
  text: "Unify remediation and communication with Datadog Incident Response"
cascade:
    algolia:
        rank: 70
---

Datadog On-Call integrates monitoring, paging, and incident response into one platform.

{{< img src="service_management/oncall/oncall_overview.png" alt="Overview of how Pages are routed. From a monitor, incident, security signal, or API call, the Page is sent to a Team (e.g. 'payments-team'), then to routing rules (e.g. based on priority) then to an escalation policy. There, it can be sent to a schedule or directly to a user." style="width:100%;" >}}

## Concepts

- **Pages** represent something to get alerted for, such as a monitor, incident, or security signal. A Page can have a status of `Triggered`, `Acknowledged`, or `Resolved`.
- **Teams** are groups configured within Datadog to handle specific types of Pages, based on expertise and operational roles.
- **Routing rules** allow Teams to finely adjust their reactions to specific types of incoming events. These rules can set a Page's urgency level and route Pages to different escalation policies depending on the event's metadata.
- **Escalation policies** determine how Pages are escalated within or across Teams.
- **Schedules** set timetables for when specific Team members are on-call to respond to Pages.

## How it works

**Teams** are the central organizational unit of Datadog On-Call. When a notification is triggered in Datadog, a **Page** is sent to the designated On-Call Team.

{{< img src="service_management/oncall/notification_page.png" alt="Notification that mentions an On-Call Team." style="width:80%;" >}}

Each Team owns **escalation policies** and **schedules**. Escalation policies define how a Page is sent to various schedules, such as _Checkout Operations - Interrupt Handler_, _Primary_, and _Secondary_ in the following screenshot. Each Team can also configure **routing rules** to route Pages to different escalation policies.

{{< img src="service_management/oncall/escalation_policy.png" alt="A sample escalation policy." style="width:80%;" >}}

A schedule defines specific times when Team members are assigned to respond to Pages. Schedules organize and manage the availability of Team members across different time zones and shifts.

{{< img src="service_management/oncall/schedule.png" alt="A sample schedule, with multiple layers for JP, EU, and US business hours." style="width:80%;" >}}

## Start using Datadog On-Call

To get started with On-Call, [onboard an On-Call Team][1] and ensure that all Team members configure their [On-Call profile settings][2] to receive notifications.

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/service_management/on-call/teams">}}<u>Onboard a Team</u>: Create a new On-Call Team, add an existing Datadog Team to On-Call, or import a team from PagerDuty.{{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/pages">}}<u>Send a Page</u>: Page a team through monitors, incidents, security signals, etc.; or manually send a Page through Datadog, Slack, Microsoft Teams, or the Datadog API. {{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/escalation_policies">}}<u>Escalation Policies</u>: Define steps for how a Page is sent to different schedules. {{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/schedules">}}<u>Schedules</u>: Define timetables for Team members' on-call rotations.{{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/profile_settings">}}<u>Profile Settings</u>: Configure your contact methods and notification preferences to ensure you receive timely and effective Pages.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/on-call/teams
[2]: /service_management/on-call/profile_settings
