---
title: Datadog-ServiceNow Integration
integration_title: ServiceNow
kind: integration
---

ServiceNow is an IT service management platform for recording, tracking, and managing a company’s enterprise-level IT processes in a single location. This integration allows you to create tickets from triggered alarms in Datadog. Additionally, you can add Datadog-generated graphs and comments to ServiceNow tickets, as well as manage the resolution workflow from within Datadog

## Auto-generate support tickets from Datadog alerts

Now, you can set these alerts to automatically create support tickets and send them to the ServiceNow ticketing queue. From there, your support team will be notified of issues using the communication workflows that you have already established inside ServiceNow. All you have to do is mention @servicenow in the alert message or add @servicenow to the notification list for that monitor.

{{< img src="servicenow-02-monitor-page.png" >}}

## Use variables in ticket payload and field mappings

Variables can be used in the body of your alerts or in field mappings to ensure rich details from the event are included in ServiceNow.  For example, you can include the title and severity in the appropriate ServiceNow field or you can include a link back to the specific incident in Datadog right from the ServiceNow ticket.

{{< img src="servicenow-variables.png" >}}

## Automate support resolution workflow

Once the monitor state returns to normal, the associated support ticket is automatically marked as “resolved”.

{{< img src="servicenow-03-servicenow-resolved.png" >}}

## Send Datadog graphs to ServiceNow

In addition to automating ticket creation and resolution, you can also use Datadog to create ServiceNow tickets on an ad hoc basis whenever you see something in Datadog that needs your team’s attention. Just click the camera icon to share a snapshot of any Timeboard graph, add some context in the comment box to help your colleagues interpret the graph, and @mention ServiceNow to send the graph and your comments to ServiceNow.

{{< img src="servicenow-04-mention-servicenow.png" >}}

## Configure ServiceNow

To configure the ServiceNow integration, enter your ServiceNow instance name, and the username and password. We recommend creating a new user for the Datadog integration.

{{< img src="servicenow-configuration.png" >}}
