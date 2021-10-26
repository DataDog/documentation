---
title: Incident Settings
kind: documentation
description: Configure and customize your Incident Management experience
aliases:
  - /monitors/incident_management/notification_rules
---

## Overview

Use [Incident Settings][1] to customize aspects of the Incident Management experience for your entire organization. The individual settings are categorized and divided into different sub-sections. The main categories are: General, Notifications, and Remediation.

## General

### Information

The Information subsection of Incident Settings is used to define your organization's severity levels and status levels, and to declare incident helper text.

{{< img src="monitors/incidents/severity_settings.jpeg" alt="Incident Severity Level Settings" style="width:80%;">}}

Use severity level settings to:

1. Define your most critical severity as `SEV-0` or `SEV-1` (defaults to `SEV-1`).
2. Customize the sub-labels of your severities (**Defaults:** Critical, High, Moderate, Low, Minor)
3. Customize the descriptions of your severities.
4. Add or delete severities from the bottom of your list, with a minimum of three and a maximum of ten. 

**Note**: If you attempt to delete a severity that is referenced in a notification rule, you are prompted to confirm your decision. Choosing to proceed disables the impacted notification rules as they are no longer valid. Deleting a severity or changing the starting severity does not automatically update any [Incident Management Analytics][2] queries.

{{< img src="monitors/incidents/status_settings.jpeg" alt="Incident Status Level Settings" style="width:80%;">}}

Use status level settings to:

1. Customize the descriptions of the statuses.
2. Choose whether to enable the optional `Completed` status.

**Note**: Deleting the `Completed` status does not automatically update any incidents that are already in the `Completed` status, nor does it automatically update any [Incident Management Analytics][2] queries that explicitly reference it. Any notification rule that references the `Completed` status is disabled, as that rule is no longer valid.

{{< img src="monitors/incidents/helper_text_settings.jpeg" alt="Declare Incident Helper Text Settings" style="width:80%;">}}

For the Declare Incident Helper Text settings, you can customize the helper text that appears alongside the severity and status level descriptions in the [Incident Creation Modal][3]. The helper text has Markdown support, which allows indented lists, text formatting, and hyperlinks to other instruction resources for incident responders.

### Property fields

{{< img src="monitors/incidents/property_field_settings.jpeg" alt="Property Field Settings" style="width:80%;">}}

Property fields are key pieces of metadata you can tag your incidents with. This makes it easier to search for specific subsets of incidents on the [Homepage][4] and make more robust queries in [Incident Management Analytics][2]. There are four default property fields:

1. `Root Cause`
2. `Services`
3. `Teams`
4. `Detection Method`

If you have [Datadog APM][5] configured, the `Services` property field automatically leverages your APM Service names. To edit the values of `Services` or `Teams`, upload a CSV of the values you wish to associate with each field. Your CSV file must start with your field's name in the top row, with the desired values listed immediately below it.

You can add more property fields to your settings by selecting one of your existing `key:value` pair [metric tags][6]. When you do this, the key of your property field is the start case of your metric tag's key (each word is capitalized and separated by spaces), and the values for the property field are equal to the values reported by the metric tag.

### Integrations

{{< img src="monitors/incidents/integration_settings.jpeg" alt="Integration Settings" style="width:80%;">}}

The integrations settings provide you with additional configurations for setting up the Incident Management features of the Datadog [Slack App][7]. There are two settings to configure:

1. Enabling automatic Slack channel creation for every new incident
2. Enabling the incident updates channel

You can configure either of these settings to use any Slack workspace you have configured in your organization's [Slack integration tile][8].

The incident updates channel sends a message whenever an incident is declared or changes status, severity, or incident commander.

## Notifications

### Message templates

{{< img src="monitors/incidents/message_templates_settings.jpeg" alt="Message Template Settings" style="width:80%;">}}

Message templates are dynamic, reusable messages that can be used in [manual incident notifications][9], or automated notification rules. Message templates leverage template variables, such as `{{incident.severity}}`, to dynamically inject the corresponding value from the incident that the notification is being sent for. Message templates have Markdown support so that incident notifications can include text formatting, tables, indented lists, and hyperlinks. To better organize a large number of message templates, each template requires a category during the creation process.

To create a message template:

1. Click the **+ New Message Template** button
2. Give the template a name
3. Assign it a new or existing category
4. Give the template a subject line (for emails)
5. Write the template's message
6. Click **Save**

**Note:** Template variables are supported in both the message's title and body.

### Rules

{{< img src="monitors/incidents/notification_rules_example.jpeg" alt="Notification Rules Example" style="width:80%;">}}

Notification rules allow you to configure scenarios when specific stakeholders should always be automatically notified of an incident. You can use notification rules to ensure key stakeholders are always made aware of high priority incidents, to notify external systems whenever a new incident is declared or updated, or to notify specific responders when a particular service or team experiences an incident.

**Example:** Set a notification rule to automatically notify team stakeholders whenever a SEV-1 or SEV-2 for `service:web-store` AND `application:purchasing` incident is declared and when that incident moves through different states of progression.

To configure a new notification rule:

1. Click **New Rule**
2. Select the incident property field `key:value` pairs you want notifications to be sent for. By default, a rule notifies your recipients on any incident.
3. Select your notification recipients. Notifications can be sent to any of Datadog's existing [notification integrations][10].
4. Select the desired message template you want the notification rule to use.
5. Choose whether you want recipients to be renotified when an incident changes its status.
6. Click **Save**

**Note**: Notification rules send messages only if an incident changes status (including when it is first declared) and are tagged with the property field values that match the filter of the notification rules.

You can perform the following operations to manage your notification rules.

- *Search* - Filter your list of notification rules by their recipients.
- *Toggle* - Enable or disable any individual notification rule by switching the toggle in that rule's row in the list.
- *Copy* - Hover over any individual notification rule and click the **Copy** icon button next to the rule's toggle.
- *Delete* - Hover over any individual notification rule and click the **Delete** icon button next to the rule's toggle.

{{< img src="monitors/incidents/notification_rules_list.jpeg" alt="Notification Rules List" style="width:80%;">}}

## Remediation

### Postmortem templates

{{< img src="monitors/incidents/postmortem_template_settings.jpeg" alt="Postmortem Template Settings" style="width:80%;">}}

Postmortem templates are dynamic, reusable templates used to create a [Datadog Notebook][11] that is automatically populated with incident information after an incident has been resolved. Postmortem templates leverage template variables, such as `{{incident.severity}}`, to dynamically inject the corresponding value from the incident that the postmortem is being created for. Postmortem templates have Markdown support so that the resulting notebook includes text formatting, tables, indented lists, and hyperlinks.

To create a postmortem template:

1. Click the **+ New Postmortem Template** button
2. Give the template a name
3. Write the template's content (available template variables are listed to the right of the textbox)
4. (Optional) Set the template as the default 
5. Click **Save**

[1]: https://app.datadoghq.com/incidents/settings
[2]: /monitors/incident_management/incident_management_analytics
[3]: /monitors/incident_management/#from-the-incidents-page
[4]: https://app.datadoghq.com/incidents
[5]: /tracing/
[6]: /getting_started/tagging/using_tags/?tab=assignment#metrics
[7]: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[8]: https://app.datadoghq.com/account/settings#integrations/slack
[9]: /monitors/incident_management/incident_details/#notifications-section
[10]: /monitors/notifications/?tab=is_alert#notify-your-team
[11]: /notebooks/
