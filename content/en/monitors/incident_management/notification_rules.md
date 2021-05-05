---
title: Notification Rules
kind: documentation
description: Configure automatic notifications for incidents
---

<div class="alert alert-warning">
This feature is in open beta. Email <a href="mailto:support@datadoghq.com">support@datadoghq.com</a> to ask questions or to provide feedback on this feature.
</div>

# Overview

Notification Rules allow you to configure scenarios when specific stakeholders should always be automatically notified of an incident. You can use Notification Rules to ensure key stakeholders are always made aware of high priority incidents or to notify external systems whenever a new incident is declared or updated.

## Configuring Notification Rules

To configure a new Notification Rule:

1. Go to the *Notification Rules* section of your [Incident Settings][1]
2. Click **New Rule**
3. Pick your notification recipients. Notifications can be sent to any of Datadog's existing [notification integrations][2].
4. Pick the Incident severities you want notifications to be sent for. By default, a rule will notify your recipients on any incident severity.
5. Choose whether you want recipients to be renotified when an incident changes its status.
6. Click **Save**

**Example:** Set a Notification Rule to automatically notify executives whenever a SEV-1 incident is declared and when that incident moves through different states of progression.

{{< img src="monitors/incidents/placeholder.png" alt="Placeholder"  style="width:80%;">}}

## Managing Notification Rules

In the *Notification Rules* section of your [Incident Settings][1], you can perform the following operations to manage your Notification Rules.

- *Search* - Filter your list of Notification Rules by their recipients
- *Toggle* - Enable or disable any individual Notification Rule by switching the toggle in that Rule's row in the list
- *Copy* - Hover over any individual Notification Rule and click the **Copy** icon button next to the Rule's toggle
- *Delete* - Hover over any individual Notification Rule and click the **Delete** icon button next to the Rule's toggle

{{< img src="monitors/incidents/placeholder.png" alt="Placeholder"  style="width:80%;">}}

[1]: https://app.datadoghq.com/incidents/settings
[2]: /monitors/notifications/?tab=is_alert#notify-your-team
