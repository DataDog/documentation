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
    tag: "Blog"
    text: "Automate common security tasks and stay ahead of threats with Datadog Workflows and Cloud SIEM"
  - link: "https://www.datadoghq.com/blog/datadog-service-management/"
    tag: "Blog"
    text: "Ensure high service availability with Datadog Service Management"
  - link: "https://www.datadoghq.com/blog/datadogs-approach-sre-security/"
    tag: "Blog"
    text: "Security and SRE: How Datadog's combined approach aims to tackle security and reliability challenges"
  - link: "https://www.datadoghq.com/blog/incidents-ai-workbench-status-page/"
    tag: "Blog"
    text: "Unify remediation and communication with Datadog Incident Response"
---



{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Incidents">}}
  Explore and register for Foundation Enablement sessions. Learn how Datadog Incident Management enables DevOps teams and SREs to more effectively manage their incident response workflows from start to finish, saving time and reducing frustration when it matters most.
{{< /learning-center-callout >}}

Datadog Incident Management helps your team members identify, mitigate, and analyze disruptions and threats to your organization's services. With Incident Management, you can design an automation-enhanced response process that helps your teams assemble around a shared framework and toolkit. You can also use incident analytics to evaluate the effectiveness of your incident response process. 

Incidents live in Datadog alongside your metrics, traces, and logs. Your teams can declare incidents from monitor alerts, security signals, events, cases, and more. You can also configure monitors to [declare incidents automatically][30].

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

{{< img src="service_management/mobile/iOS_Incident_V2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Two views in the Datadog Mobile App: one showing an incidents list with high-level details about each incident, and one showing a detailed panel for a single incident">}}


## Describing the incident

When declaring an incident, it is critical to provide a comprehensive description, detailing what happened, why it occurred, and related attributes to ensure all stakeholders in the incident management process are fully informed. The essential elements of an incident declaration include a title, severity level, and incident commanders. Effective incident management documentation includes:
- Updating incident details, including its status, impact, root cause, detection methods, and service impacts.
- Forming and managing a response team, using custom responder roles, and leveraging metadata attributes for detailed incident assessment.
- Configuring notifications to keep all stakeholders informed throughout the incident resolution process.

For more information, see the [Describe an Incident][20] documentation.

## Evaluate incident data

Incident Analytics provides insights into the efficiency and performance of your incident response process by allowing you to aggregate and analyze statistics from past incidents. Key metrics, such as time to resolution and customer impact, can be tracked over time. You can query these analytics using graph widgets in dashboards and notebooks. Datadog offers customizable templates, such as the Incident Management Overview Dashboard and a Notebook Incident Report, to help you get started.

For more details on the measures collected and step-by-step graph configurations to visualize your data, see [Incident Management Analytics][10].

## Integrations

Incident Management integrates closely with other Datadog products, including:

- [Datadog Status Pages][26] to create public or private status pages and connect them to incidents.
- [Datadog On-Call][27] to escalate pages into incidents and manually or automatically page teams from an incident.
- [Datadog Notebooks][28] to draft and review postmortems.
- [Datadog Workflow Automation][29] to build and execute automations.

### Third-party integrations

Incident Management integrates with third-party applications, including:

- [Atlassian Statuspage][25] to create and update Statuspage incidents.
- [Confluence][22] to generate incident postmortems.
- [CoScreen][14] to launch collaborative meetings with multi-user screen sharing, remote control, and built-in audio and video chat.
- [CoTerm][21] to follow terminal-based incident remediation activities in real time.
- [Jira][15] to create a Jira ticket for an incident.
- [Microsoft Teams][23] to create channels and video meetings for incidents.
- [PagerDuty][12] and [OpsGenie][13] to page your on-call engineers and auto-resolve pages upon incident resolution.
- [ServiceNow][19] to create a ServiceNow tickets for incidents.
- [Slack][11] to create channels for incidents.
- [Webhooks][16] to send incident notifications using webhooks (for example, [sending SMS to Twilio][17]).
- [Zoom][24] to launch video calls for incidents.

## Billing

Incident Management is a seat-based SKU. Customers who want to learn more about how Incident Management is billed and how to manage seats within Datadog should visit our [pricing page][31] and the [Incident Response billing documentation][32].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /mobile
[4]: https://apps.apple.com/app/datadog/id1391380318
[5]: https://play.google.com/store/apps/details?id=com.datadog.app
[6]: /service_management/incident_management/declare
[7]: /account_management/teams/
[8]: /getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[9]: /tracing/#2-instrument-your-application
[10]: /service_management/incident_management/analytics/
[11]: /integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[12]: /integrations/pagerduty/
[13]: /integrations/opsgenie/
[14]: /coscreen
[15]: /integrations/jira/
[16]: /integrations/webhooks/
[17]: /integrations/webhooks/#sending-sms-through-twilio
[18]: /integrations/statuspage/
[19]: /integrations/servicenow/
[20]: /service_management/incident_management/describe
[21]: /coterm
[22]: /integrations/confluence/
[23]: /integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[24]: /integrations/zoom-incident-management/
[25]: /integrations/statuspage/
[26]: /service_management/status_pages/
[27]: /service_management/on-call/
[28]: /notebooks/
[29]: /actions/workflows/
[30]: /service_management/incident_management/declare#from-a-monitor
[31]: https://www.datadoghq.com/pricing/?product=incident-response#products
[32]: /account_management/billing/incident_response/
