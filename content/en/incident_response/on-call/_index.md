---
title: On-Call
aliases:
- /service_management/on-call/
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

## Granular access control

Use [granular access controls][3] to limit the [roles][4], teams, or users that can access On-Call resources. By default, access to On-Call schedules, escalation policies, and team routing rules is unrestricted.

Granular access controls are available for the following On-Call resources:
- **Schedules**: Control who can view, edit, and override schedules
- **Escalation policies**: Control who can view and edit escalation policies
- **Team routing rules**: Control who can view and edit team routing rules

### Supported resources and permissions

| On-Call resource | Viewer | Overrider | Editor |
|------------------|--------|-----------|--------|
| **Schedules** | Can view schedules | Can view schedules and override shifts | Can view, edit schedules, and override shifts |
| **Escalation policies** | Can view escalation policies | - | Can view and edit escalation policies |
| **Team routing rules** | Can view team rules | - | Can view and edit team rules |

### Restrict access to On-Call resources

To restrict access to an On-Call resource:

1. Navigate to the specific On-Call resource (schedule, escalation policy, or team routing rules).
1. Click **Manage**.
1. Select **Permissions** from the dropdown menu.
1. Click **Restrict Access**.
1. Select one or more roles, teams, or users from the dropdown menu.
1. Click **Add**.
1. Select the level of access you want to associate with each of them from the dropdown menu next to their name:
   - **Viewer**: Read-only access to view the resource
   - **Overrider** (schedules only): Can view and create schedule overrides
   - **Editor**: Full access to view and modify the resource
1. Click **Save**.

**Note**: To maintain your edit access to the resource, Datadog requires you to include at least one role that you are a member of before saving.

## Start using Datadog On-Call

<div class="alert alert-danger">To preserve incident history, Datadog On-Call does not support deletion of resources like Pages, escalation policies, or schedules. To test On-Call without affecting your production environment, create a trial organization as a sandbox.</div>

To get started with On-Call, [onboard an On-Call Team][1] and ensure that all Team members configure their [On-Call profile settings][2] to receive notifications.

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/incident_response/on-call/teams">}}<u>Onboard a Team</u>: Create a new On-Call Team, add an existing Datadog Team to On-Call, or import a team from PagerDuty.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/triggering_pages">}}<u>Trigger a Page</u>: Page a team through monitors, incidents, security signals, etc.; or manually send a Page through Datadog, Slack, Microsoft Teams, or the Datadog API. {{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/escalation_policies">}}<u>Escalation Policies</u>: Define steps for how a Page is sent to different schedules. {{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/schedules">}}<u>Schedules</u>: Define timetables for Team members' on-call rotations.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/profile_settings">}}<u>Profile Settings</u>: Configure your contact methods and notification preferences to ensure you receive timely and effective Pages.{{< /nextlink >}}
{{< /whatsnext >}}

## Billing

On-Call is a seat-based SKU. To learn more about how On-Call is billed and how to manage seats within Datadog, visit our [pricing page][5] and the [Incident Response billing documentation][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/on-call/teams
[2]: /incident_response/on-call/profile_settings
[3]: /account_management/rbac/granular_access/
[4]: /account_management/rbac/#role-based-access-control
[5]: https://www.datadoghq.com/pricing/?product=incident-response#products
[6]: /account_management/billing/incident_response/
