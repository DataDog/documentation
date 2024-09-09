---
title: Incident Management
description: Create and manage incidents
aliases:
- /monitors/incident_management/
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Incident%20Management"
    tag: "Release Notes"
    text: "Check out the latest Incident Management releases! (App login required)."
  - link: "dashboards/querying/#incident-management-analytics"
    tag: "Documentation"
    text: "Incident Management Analytics"
  - link: 'https://dtdg.co/fe'
    tag: 'Foundation Enablement'
    text: 'Join an interactive session to improve your Incident Management'
  - link: 'https://www.datadoghq.com/blog/pair-programming-coscreen-datadog/'
    tag: 'Blog'
    text: 'More efficient pair programming with Datadog CoScreen'
  - link: 'https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/'
    tag: 'Blog'
    text: 'Best practices for writing incident postmortems'
  - link: "https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/"
    tag: "blog"
    text: "Automate common security tasks and stay ahead of threats with Datadog Workflows and Cloud SIEM"
---

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Incidents">}}
  Explore and register for Foundation Enablement sessions. Learn how Datadog Incident Management enables DevOps teams and SREs to more effectively manage their incident response workflows from start to finish, saving time and reducing frustration when it matters most.
{{< /learning-center-callout >}}

Any event that may lead to a disruption in your organization's services can be described as an incident, and it is often necessary to have a set framework for handling these events. Datadog's Incident Management feature provides a system through which your organization can effectively identify and mitigate incidents.

Incidents live in Datadog alongside the metrics, traces, and logs you are collecting. You can view and filter incidents that are relevant to you.

## Get Started

Incident Management requires no installation. Get started by taking a Learning Center course, reading our guided walkthrough, or declaring an incident.

{{< whatsnext desc="Learn more about Incident Management:">}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-to-incident-management" >}}Learn about Datadog Incident Management by working through a hands-on examples{{< /nextlink >}}
    {{< nextlink href="https://docs.datadoghq.com/getting_started/incident_management/" >}}Guided walkthrough of an Incident workflow{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/declare" >}}Declare an incident{{< /nextlink >}}
{{< /whatsnext >}}

## View your incidents
To view your incidents, go to the [Incidents][1] page to see a feed of all ongoing incidents. 
- Filter your incidents through the properties listed on the left, including Status, Severity, and Time To Repair (hours). 
- Use the Search field to enter tag attributes or keywords.
- Export your search results with the Export button at the top of the incident list.
- Configure additional fields that appear for all incidents in [Incident Settings][2].

You can also view your Incidents list from your mobile device home screen and manage/create incidents by downloading the [Datadog Mobile App][3], available on the [Apple App Store][4] and [Google Play Store][5].

## Describing the incident

No matter where you create an incident, it's important to describe it as thoroughly as possible to share the information with other people involved in your company's incident management process.

When you create an incident, an incident modal comes up. This modal has several core elements:

| Incident elements    | Description |
| ----------- | ----------- |
| Title | (Required) Give your incident a descriptive title. |
| Severity Level| (Required) Denotes the severity of your incident, from SEV-1 (most severe) to SEV-5 (least severe). If your incident is under initial investigation, and you do not know the severity yet, select UNKNOWN. <br> **Note**: You can customize the description of each severity level to fit the requirements of your organization.|
| Incident Commander | This person is assigned as the leader of the incident investigation. |
| Attributes (Teams) | Assign the appropriate group of users to an incident using [Datadog Teams][9]. Members of the assigned team are automatically invited to the Slack channels. |
| Notifications | Specify a user, Slack channel or external email to send notifications of this incident to.  |
| Notes & Links | You can customize the description of each severity level to fit the requirements of your organization. Include links to graphs, monitors, or security signals for additional awareness. |

### Updating the incident and the incident timeline

An incident's status can be updated directly on the incident's overview page, or from Slack within the dedicated incident channel. To update an incident from its Slack channel, use this slash command to open the update modal: `/datadog incident update`

Update the impact section to specify customer impact, the start and end times of the impact, and whether the incident is still active. This section also requires a description of the scope of impact to be completed.

In the incident header, you can see the incident's state, severity, timestamp, impact, and duration, as well as who has responded to the incident. You can also notify responders of updates. There are quick links to chat channels (if not using the Datadog Slack App, video conferencing, and attached postmortem (if one has been added).

Timeline data is automatically categorized, so you can use the facets to filter through timeline content. This is particularly useful for long incidents with longer investigations. This makes it easier for ICs and responders to filter through for who is involved, what progress has been made, and what's already investigated. As the author of the timeline notes, you can edit the timestamps and message notes as they are created. You can also flag timeline calls to highlight them to other people monitoring the incident.

#### Status levels

The default includes the statuses **Active**, **Stable**, and **Resolved**. **Completed** can be enabled or disabled. You can customize the description of each status level to fit the requirements of your organization.

* Active: Incident affecting others.
* Stable: Incident no longer affecting others, but investigations incomplete.
* Resolved: Incident no longer affecting others and investigations complete.
* Completed: All remediation complete.

As the status of an incident changes, Datadog tracks time-to-resolution as follows:

| Status Transition | Resolved Timestamp |
| ------------------ | -----------|
| `Active` to `Resolved`, `Active` to `Completed` | Current time |
| `Active` to `Resolved` to `Completed`, `Active` to `Completed` to `Resolved` | Unchanged |
| `Active` to `Completed` to `Active` to `Resolved` | Overridden on last transition |

#### Assessment fields

Assessment fields are the metadata and context that you can define per incident. These fields are [key:value metric tags][10]. These field keys are added in settings, and the values are then available when you are assessing the impact of an incident on the overview page. For example, you can add an Application field. The following fields are available for assessment in all incidents:

* **Root Cause**: This text field allows you to enter the description of the root cause, triggers, and contributing factors of the incident.
* **Detection Method**: Specify how the incident was detected with these default options: customer, employee, monitor, other, or unknown.
* **Services**: If you have APM configured, your APM services are available for incident assessment. To learn more about configuring your services in APM, see [the docs][11].
    * If you are not using Datadog APM, you can upload service names as a CSV. Any values uploaded via CSV are only be available within Incident Management for incident assessment purposes.
    * Datadog deduplicates service names case-insensitively, so if you use "My Service" or "my service", only the manually added one is shown.
    * Datadog overrides APM service names in favor of the manually uploaded list.
    * Note that if the service is an APM service and no metrics are posted in the past seven days, it does not appear in the search results.
    * Further integrate with Datadog products and accurately assess service impact. The Services property field is automatically populated with APM services for customers using Datadog APM.
* **Teams**: Choose from the [teams][9] defined in your organization. It is not necessary to upload a list of teams from a CSV file.

## Data collected

Incident Management collects the following analytic measures:

* Incident Count
* Customer Impact Duration
* Status Active Duration
* Status Stable Duration
* Time to Repair (customer impact end time - created time)
* Time to Resolve (resolved time - created time)

For more information about Incident Management graphs, see [Incident Management Analytics][12].

## Integrations

In addition to integrating with [Slack][7], Incident Management also integrates with:

- [PagerDuty][13] and [OpsGenie][14] to send incident notifications to your on-call engineers.
- [CoScreen][21] to launch collaborative meetings with multi-user screen sharing, remote control, and built-in audio and video chat.
- [Jira][15] to create a Jira ticket for an incident.
- [Webhooks][16] to send incident notifications using webhooks (for example, [sending SMS to Twilio][17]).
- [Statuspage][19] to create and update Statuspage incidents.
- [ServiceNow][20] to create a ServiceNow ticket for an incident.

## Ready to try it out?

Work through an example workflow in the [Getting Started with Incident Management][18] guide.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /mobile
[4]: https://apps.apple.com/app/datadog/id1391380318
[5]: https://play.google.com/store/apps/details?id=com.datadog.app
[6]: /service_management/incident_management/incident_settings#information
[7]: /integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[8]: /integrations/slack/
[9]: /account_management/teams/
[10]: /getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[11]: /tracing/#2-instrument-your-application
[12]: /service_management/incident_management/analytics/#overview
[13]: /integrations/pagerduty/
[14]: /integrations/opsgenie/
[15]: /integrations/jira/
[16]: /integrations/webhooks/
[17]: /integrations/webhooks/#sending-sms-through-twilio
[18]: /getting_started/incident_management
[19]: /integrations/statuspage/
[20]: /integrations/servicenow/
[21]: /coscreen
