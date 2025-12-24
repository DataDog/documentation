---
title: Templates
aliases:
- /service_management/incident_management/incident_settings/templates/
further_reading:
- link: "/incident_response/incident_management/notification"
  tag: "Documentation"
  text: "Learn more about Incident Management Notifications"
---

## Overview

Dynamic templates offer a comprehensive framework for improving incident response and operational efficiency. Using custom message templates for both ad-hoc and automated notifications can save time during high-stress incidents. This ensures that messages are consistently accurate and contain relevant context, enabling quicker understanding and action by the recipients. 

Customizable settings for postmortem analysis can provide valuable information and long-term optimization. By tailoring reports and dashboards to your organization's unique context, you can identify recurring issues and implement preventative measures more effectively.

## Messages

Message templates are dynamic, reusable messages that can be used in [manual incident notifications][1], or automated notification rules. Message templates leverage template variables, such as `{{incident.severity}}`, to dynamically inject the corresponding value from the incident that the notification is being sent for. Message templates have Markdown support so that incident notifications can include text formatting, tables, indented lists, and hyperlinks. To better organize a large number of message templates, each template requires a category during the creation process.

To create a message template:

1. Click the **+ New Message Template** button
2. Give the template a name
3. Assign it a new or existing category
4. Give the template a subject line (for emails)
5. Write the template's message
6. Click **Save**

**Note:** Template variables are supported in both the message's title and body.

## Postmortems

Postmortem templates are dynamic, reusable templates used to create a [Datadog Notebook][2] or [Confluence page][3] that is automatically populated with incident information after an incident has been resolved. Postmortem templates leverage template variables, such as `{{incident.severity}}`, to dynamically inject the corresponding value from the incident that the postmortem is being created for. 

To create a postmortem template:

1. Click the **+ New Postmortem Template** button
2. Give the template a name
3. Select either a Datadog Notebook or a Confluence page to be created at generation
4. Write the template's content (available template variables are listed to the right of the textbox)
5. (Optional) Set the template as the default 
6. Click **Save**

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/incident_management/notifications
[2]: /notebooks/
[3]: /integrations/confluence/