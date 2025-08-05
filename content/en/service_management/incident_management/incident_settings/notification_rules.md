---
title: Notification Rules
further_reading:
- link: "/service_management/incident_management/incident_settings/templates"
  tag: "Documentation"
  text: "Customize message templates"
---

## Overview

Automated, customizable notification rules ensure the right stakeholders are alerted based on specific criteria. This removes the burden from the individual declaring the incident and ensures prompt involvement of the necessary parties, expediting the resolution process. For example, you can set a notification rule to automatically notify team stakeholders whenever a SEV-1 or SEV-2 incident for `service:web-store` AND `application:purchasing` is declared and when that incident moves through different states of progression.

Use notification rules to:
 - Ensure key stakeholders are always made aware of high priority incidents
 - Notify external systems whenever a new incident is declared or updated
 - Notify specific responders when a particular service or team experiences an incident

## Configure notification rules

1. Navigate to [Incident Settings Notification Rules][1].
1. Click **New Rule**.
1. Configure the conditions for this notification rule. Select the incident property field `key:value` pairs you want notifications to be sent for. By default, these filters are empty, and a notification rule triggers when an incident is declared or when it's attributes are update.
1. **Notify**: Select your notification recipients.
    - Notifications can be sent to any of Datadog's existing [notification integrations][2].
    - Notifications can be sent to existing [Datadog On-Call teams][4] using `@oncall-` handles.
    - If you want to notify a recipient's mobile device, select the option for their name that includes **(Mobile Push Notification)**. The recipient must have enabled notifications in the [Datadog mobile app][3] for this option to appear.
    - If you want to notify the incident Slack channel, use handle `@incident-slack-channel`.
4. **With Template**: Select the desired message template you want the notification rule to use.
5. **Renotify on updates to**: Select the incident properties that trigger notifications. A new notification is sent whenever one or more of the selected properties change. **Note**: properties already in your filters (see step 2) are automatically included in these rules.
6. Click **Save**

You can perform the following operations to manage your notification rules.

- *Search* - Filter your list of notification rules by their recipients.
- *Toggle* - Enable or disable any individual notification rule by switching the toggle in that rule's row in the list.
- *Copy* - Hover over any individual notification rule and click the **Copy** icon button next to the rule's toggle.
- *Delete* - Hover over any individual notification rule and click the **Delete** icon button next to the rule's toggle.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings#Rules
[2]: /monitors/notifications/?tab=is_alert#configure-notifications-and-automations
[3]: /mobile/
[4]: /service_management/on-call/