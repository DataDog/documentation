---
title: Incident Notification
further_reading:
- link: "/service_management/incident_management/incident_settings"
  tag: "Documentation"
  text: "Customize notifications in Incident Settings"
---

## Overview

All stakeholder notifications for an incident are consolidated in the incident’s Notifications tab. You can manually create, save as draft, and send notifications directly from this page. Automated notifications sent by [Notification Rules][1] for the incident in question are also listed in this section.

## Add a notification

To create a manual notification:
1. Navigate to the **Notifications** tab of an incident.
1. Click the **+ New Notification** button in the top right of the section.
1. Enter your desired recipients. These can be any notification handles supported by Datadog including emails, Slack channels, PagerDuty handles, and webhooks.
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

{{< img src="/service_management/incidents/notification/notification_rule.png" alt="Example configuration for a notification rule that sends a message for SEV-1 or SEV-2 incidents" style="width:80%;" >}}

To configure a new notification rule:
1. Navigate to the [Incident Settings Notifications Rules][3] page.
1. Click **New Rule**.
1. Select the incident property field `key:value` pairs you want notifications to be sent for (such as severity or service). By default, these filters are empty, and a notification rule triggers for any incident.
1. **Notify**: Select your notification recipients. Notifications can be sent to any of Datadog's existing [notification integrations][4]. If you want to notify a recipient's mobile device, select the option for their name that includes **(Mobile Push Notification)**. The recipient must have enabled notifications in the [Datadog mobile app][5] for this option to appear.
1. **With Template**: Select the desired message template you want the notification rule to use.
1. **Renotify on updates to**: Select the incident properties that trigger notifications. A new notification is sent whenever one or more of the selected properties change. **Note**: properties already in your filters (see step 2) are automatically included in these rules.
1. Click **Save**.

From Incident Settings, you can search, toggle to enable or disable, copy, and delete rules.

## Message templates

Message templates are dynamic, reusable messages that can be used in [manual incident notifications](#add-a-notification), or automated [notification rules](#customize-notification-rules). Message templates leverage template variables, such as `{{incident.severity}}`, to dynamically inject the corresponding value from the incident that the notification is being sent for. Message templates have Markdown support so that incident notifications can include text formatting, tables, indented lists, and hyperlinks. To organize a large number of message templates, each template requires a category during the creation process.

To create a message template:
1. Navigate to the [Incident Settings Templates Messages][6] page.
1. Click the **+ New Message Template** button.
1. Give the template a name.
1. Assign it a new or existing category. For new categories, start typing in the **Category** field and select the **Add option: \<your new category\> option**.
1. Give the template a subject line (for emails).
1. Write the template’s message.
1. Click **Save**.

**Note**: Template variables are supported in both the message’s title and body.

[1]: /service_management/incident_management/incident_settings#rules
[2]: /monitors/notify/variables/?tab=is_alert
[3]: https://app.datadoghq.com/incidents/settings#Rules
[4]: /monitors/notify/#integrations
[5]: /mobile/?tab=ios
[6]: https://app.datadoghq.com/incidents/settings#Messages