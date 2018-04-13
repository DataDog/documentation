---
description: This integration allows you to create tickets from triggered alerts in
  Datadog, and update existing tickets with new information as it arises. Additionally,
  you can see JIRA ticket creations as events within Datadog to overlay with all of
  your metrics.
doclevel: basic
integration_title: Jira
kind: integration
newhlevel: true
placeholder: true
title: Datadog-Jira Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

{{< img src="integrations/jira/JiraInstallation9.png" alt="settings" >}}

## Overview

JIRA is an issue and project tracking system for software teams. This integration allows you to create tickets from triggered alerts in Datadog, and update existing tickets with new information as it arises. Additionally, you can see JIRA ticket creations as events within Datadog to overlay with all of your metrics.

## Setup
### Installation

1. Navigate to your Jira account

2. Go to settings (Gear icon) –> Applications

	{{< img src="integrations/jira/JiraInstallation2.png" style="width:75%;" alt="settings" >}}

3. Under "Integrations" in left menu, Select Application Links

	{{< img src="integrations/jira/JiraInstallation3.png" style="width:75%;" alt="settings" >}}

4. Enter `https://app.datadoghq.com/` as the URL to link –> press "Create new link"

	{{< img src="integrations/jira/JiraInstallation4.png" style="width:75%;" alt="settings" >}}

5. Fill in Application Name with any name (used simply for identification)

6. Leave Generic Application Selected

7. Check "Create Incoming Link"

8. Press Continue

	{{< img src="integrations/jira/JiraInstallation5.png" style="width:75%;" alt="settings" >}}

9. Copy and Paste the Consumer Key, Consumer Name, and Public Key from the Jira tile

10. Press Continue

	{{< img src="integrations/jira/JiraInstallation6.png" style="width:75%;" alt="settings" >}}

### Configuration

11. Navigate back to the Jira Tile

12. Copy and paste the URL of your Jira account into the tile from http... to .net i.e https://some-account.atlassian.net

13. Press Install

	{{< img src="integrations/jira/JiraInstallation7.png" style="width:75%;" alt="settings" >}}

### Validation

Check to see if you can select a Project when creating a new Ticket Type. If this dropdown is empty, it means the integration is not properly installed (or your Jira account has no Projects!)

## Further Reading
### Knowledge Base
#### Setting up Ticket Types

After installing the JIRA integration, you can create custom tickets types that can be created within Datadog.

1. To begin, press "Add Ticket Type"
2. Each ticket type stems from a unique Project ID – Issue Type combination.
3. Select a Project ID and Issue Type for the ticket type you would like to create.
4. A list of required fields will show up for the selected combination.
5. Each of these fields must be filled out in order for tickets to be created.
6. Optionally, you can add Datadog tags in the form of key1:value1, key2:value2 for this ticket.
7. Press "Save Ticket Type".

Raw values as well as variables from the alert event can be used to fill in these fields.

A full list of variables can be seen below.

|Variable|Meaning|
|-----|-----|
|$ID | ID of the event *(ex: 1234567)*|
|$EVENT_TITLE| Title of the event *(ex: \[Triggered] \[Memory Alert])*|
|$EVENT_MSG| Text of the event *(ex: @webhook-url Sending to the webhook)*|
|$EVENT_TYPE| Type of the event *(ex: metric_alert_monitor)*|
|$LAST_UPDATED| Date when the event was last updated|
|$DATE| Date *(epoch) where the event happened *(ex: 1406662672000)*|
|$AGGREG_KEY| ID to aggregate events belonging together *(ex: 9bd4ac313a4d1e8fae2482df7b77628)*|
|$ORG_ID| ID of your organization *(ex: 11023)*|
|$ORG_NAME| Name of your organization *(ex: Datadog)*|
|$USER| User posting the event that triggered the webhook *(ex: rudy)*|
|$SNAPSHOT| Url of the image if the event contains a snapshot *(ex: https://url.to.snpashot.com/)*|
|$LINK| Url of the event *(ex: https://app.datadoghq.com/event/jump_to?event_id=123456)*|
|$PRIORITY| Priority of the event *(ex: normal)*|
|$TAGS| Comma-separated list of the event tags *(ex: monitor, name:myService, role:computing-node)*|
|$TEXT_ONLY_MSG| Text of the event without markdown formatting|
|$ALERT_ID| ID of alert *(ex: 1234)*|
|$ALERT_METRIC| Name of the metric if it's an alert *(ex: system.load.1)*|
|$ALERT_QUERY| Query of the monitor that triggered the webhook|
|$ALERT_STATUS| Summary of the alert status *(ex: system.load.1 over host:my-host was > 0 at least once during the last 1m)*|
|$ALERT_TRANSITION| Type of alert notification *(ex: Triggered)*|

#### Automatically Create Tickets from Datadog Alerts

To automatically have JIRA tickets created within Datadog alerts, use the @jira-projectname-issuetype command within the "Say what's happening" section of the new monitor creation process.

A new ticket will be created when this alert is triggered.

The @jira-update command can be used to update existing tickets. This command will add a comment to the JIRA ticket with the text followed by the @jira-update command.

TIP – It might be useful to use the @jira command within an #is_alert or #is_warning variable!

{{< img src="integrations/jira/JiraInstallation8.png" alt="settings" >}}
