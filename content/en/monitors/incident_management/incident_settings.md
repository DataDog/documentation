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

The Information subsection of Incident Settings is used to define your organization's severity levels, status levels, and declare incident helper text.

{{< img src="monitors/incidents/severity_settings.jpeg" alt="Incident Severity Level Settings" style="width:80%;">}}

For the Severity Levels settings, you are able to:

1. Decide whether your Severity Levels start at `SEV-0` or `SEV-1` as your most critical Severity (**Default:** `SEV-1`)
2. Customize the sub-labels of your severities (**Defaults:** Critical, High, Moderate, Low, Minor)
3. Customize the descriptions of your severities
4. Add or delete severities from the bottom of your list, with a minimum of 3 and a maximum of 10. 

**Note:** If you attempt to delete a Severity that is referenced in a Notification Rule, you will be prompted to confirm your decision. Choosing to proceed will disable the impacted Notification Rules as they are no longer valid. Deleting a severity or changing the starting severity will not automatically update any [Incident Management Analytics][2] queries.

{{< img src="monitors/incidents/status_settings.jpeg" alt="Incident Status Level Settings" style="width:80%;">}}

For the Status Levels settings, you are able to:

1. Customize the descriptions of the statuses
2. Choose whether to enable the optional `Completed` status

**Note:** Deleting the `Completed` status will not automatically update any incidents that are already in the `Completed` status, nor will it automatically update any [Incident Management Analytics][2] queries that explicitly reference it. Any Notification Rule that references the `Completed` status will also be disabled as they are no longer valid.

{{< img src="monitors/incidents/helper_text_settings.jpeg" alt="Declare Incident Helper Text Settings" style="width:80%;">}}

For the Declare Incident Helper Text settings, you can customize the helper text that appears alongside the Severity and Status Level descriptions in the [Incident Creation Modal][3]. The helper text has Markdown support to allow you to include indented lists, text formatting and hyperlinks to other instruction resources for incident responders.

### Property Fields

{{< img src="monitors/incidents/property_field_settings.jpeg" alt="Property Field Settings" style="width:80%;">}}

Property Fields are key pieces of metadata you can tag your incidents with. This makes it easier to search for specific subsets of incidents in the [Homepage][4] as well as for making more robust queries in [Incident Management Analytics][2]. There are 4 default property fields:

1. `Root Cause`
2. `Services`
3. `Teams`
4. `Detection Method`

If you have [Datadog APM][5] configured, the `Services` Property Field will automatically leverage your APM Service names. To edit the values of `Services` or `Teams`, upload a CSV of the values you wish to associate with each field. Your CSV file must start with your field's name in the top row, with the desired values listed immediately below it.

You can add additional Property Fields to your settings by selecting one of your existing key:value pair [metric tags][6]. When you do this the key of your Property Field will be the start case of your metric tag's key (each word is capitalized and separated by spaces) and the values for the Property Field will be equal to the values reported by the metric tag.

### Integrations

{{< img src="monitors/incidents/integration_settings.jpeg" alt="Integration Settings" style="width:80%;">}}

The Integrations settings provide you with additional configurations for setting up the Incident Management features of the Datadog [Slack App][7]. There are two settings to configure:

1. Enabling automatic Slack channel creation for every new incident
2. Enabling the Incident Updates channel 

Both of these settings can be configured to use any Slack Workspace you have configured in your organization's [Slack Integration Tile][8].

The Incident Updates channel will send a message whenever an incident gets declared or changes Status, Severity, or Incident Commander.

## Notifications

### Message Templates

{{< img src="monitors/incidents/message_templates_settings.jpeg" alt="Message Template Settings" style="width:80%;">}}

Message Templates are dynamic, reusable messages that can be used in [manual incident notifications][9], or automated Notification Rules. Message Templates leverage template variables (e.g. `{{incident.severity}}`) to dynamically inject the corresponding value from the incident that the notification is being sent for. Message Templates have Markdown support so that incident notifications can include text formatting, tables, indented lists, and hyperlinks as desired. To better organize a large number of Message Templates, each template requires a category during its creation process.

To create a Message Template:

1. Click the **+ New Message Template** button
2. Give the template a name
3. Assign it a new or existing category
4. Give the template a subject line (for emails)
5. Write the template's message
6. Click **Save**

**Note:** Template variables are supported in both the message's title and body.

### Rules

{{< img src="monitors/incidents/notification_rules_example.jpeg" alt="Notification Rules Example" style="width:80%;">}}

Notification Rules allow you to configure scenarios when specific stakeholders should always be automatically notified of an incident. You can use Notification Rules to ensure key stakeholders are always made aware of high priority incidents, to notify external systems whenever a new incident is declared or updated, or to notify specific responders when a particular service or team experiences an incident.

**Example:** Set a Notification Rule to automatically notify team stakeholder whenever a SEV-1 or SEV-2 for `service:web-store` AND `application:purchasing` incident is declared and when that incident moves through different states of progression.

To configure a new Notification Rule:

1. Click **New Rule**
2. Select the incident Property Field key:value pairs you want notifications to be sent for. By default, a rule will notify your recipients on any incident.
3. Select your notification recipients. Notifications can be sent to any of Datadog's existing [notification integrations][10].
4. Select the desired Message Template you want the Notification Rule to use.
5. Choose whether you want recipients to be renotified when an incident changes its status.
6. Click **Save**

**Note:** Notification Rules will send messages only if an incident changes status (including when it is first declared) and has been tagged with the Property Fields values that match the filter of the Notification Rules.

You can perform the following operations to manage your Notification Rules.

- *Search* - Filter your list of Notification Rules by their recipients
- *Toggle* - Enable or disable any individual Notification Rule by switching the toggle in that Rule's row in the list
- *Copy* - Hover over any individual Notification Rule and click the **Copy** icon button next to the Rule's toggle
- *Delete* - Hover over any individual Notification Rule and click the **Delete** icon button next to the Rule's toggle

{{< img src="monitors/incidents/notification_rules_list.jpeg" alt="Notification Rules List" style="width:80%;">}}

## Remediation

### Postmortem Templates

{{< img src="monitors/incidents/postmortem_template_settings.jpeg" alt="Postmortem Template Settings" style="width:80%;">}}

Postmortem Templates are dynamic, reusable templates that can be used to create a [Datadog Notebook][11] that is automatically populated with incident information after an incident has been resolved. Postmortem Templates leverage template variables (e.g. `{{incident.severity}}`) to dynamically inject the corresponding value from the incident that the postmortem is being created for. Postmortem Templates have Markdown support so that the resulting Notebook includes text formatting, tables, indented lists, and hyperlinks as desired.

To create a Postmortem Template:

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
