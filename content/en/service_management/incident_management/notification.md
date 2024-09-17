---
title: Incident Notification
further_reading:
- link: "/service_management/incident_management/incident_settings"
  tag: "Documentation"
  text: "Customize notifications in Incident Settings"
- link: "/monitors/notify/variables/?tab=is_alert"
  tag: "Documentation"
  text: "Monitor notification variables"
---

## Overview

All stakeholder notifications for an incident are consolidated in the incident’s Notifications tab. You can manually create, save as draft, and send notifications directly from this page. Automated notifications sent by [Notification Rules][1] for the incident in question are also listed in this section.

## Add a notification

To create a manual notification:
1. Navigate to the **Notifications** tab of an incident.
1. Click the **+ New Notification** button in the top right of the section.
1. Enter your desired recipients. These can be any notification handles supported by Datadog, including emails, Slack channels, PagerDuty handles, and webhooks.
1. Select a [Message Template](#message-template).
1. Edit the title and message of your notification using Markdown and any supported incident template variable by typing `{{`.
    - [Template variables][2] are based on the properties of an incident. Before a message is sent, all template variables are replaced by the corresponding value of the referenced property that is available to the message when it was sent.
1. Use the `{{incident.created}}` variable to customize your message timezone. This template variable will display the option to set your variable time zone.
1. Send your notification or save it as a draft.

## View all notifications

{{< img src="/service_management/incidents/notification/incident_notifications_sent.png" alt="Notification tab of an incident showing example list of sent messages" style="width:90%;" >}}

The Notifications tab of an incident lists notifications as **Drafts** and **Sent**. Both lists display:
- The (intended) recipients of a notification.
- The contents of the notification’s message and any renotification messages that were sent.
- When the notification was last updated.
- The original author of the notification.

The **Sent** list also displays if a notification was manually or automatically sent by a [notification rule](#customizable-rules). If the notification was automated, the rule that triggered the notification is displayed.

## Customize notification rules

Notification Rules allows you to notify stakeholders automatically based on the matching criteria of the incident. Matching criteria include incident severity, affected services, status, root cause category, and a specific resource name. For example, you can set up a rule that automatically notifies your leadership team by email every time there is a SEV-1 incident. With this rule, the individual declaring the incident does not have to know whom to involve in every scenario.

For more information on how to configure a new notification rule, see the [Incident Settings][1] documentation.

## Message templates

Message templates are dynamic, reusable messages that can be used in [manual incident notifications](#add-a-notification), or automated [notification rules](#customize-notification-rules). Message templates leverage template variables, such as `{{incident.severity}}`, to dynamically inject the corresponding value from the incident that the notification is being sent for. Message templates have Markdown support so that incident notifications can include text formatting, tables, indented lists, and hyperlinks. Template variables are supported in both the message’s title and body.

For more information on how to create a message template, see the [Incident Settings][3] documentation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/incident_management/incident_settings#rules
[2]: /monitors/notify/variables/?tab=is_alert
[3]: /service_management/incident_management/incident_settings/#message-templates
