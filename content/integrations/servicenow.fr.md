---
categories:
- issue tracking
ddtype: crawler
description: Have your Datadog alerts automatically generate and update tickets.
doc_link: https://docs.datadoghq.com/integrations/servicenow/
git_integration_title: servicenow
has_logo: true
integration_title: ServiceNow
is_public: true
kind: integration
manifest_version: '1.0'
name: servicenow
public_title: Datadog-ServiceNow Integration
short_description: Have your Datadog alerts automatically generate and update tickets.
version: '1.0'
---

## Overview

ServiceNow is an IT service management platform for recording, tracking, and managing a company’s enterprise-level IT processes in a single location. This integration allows you to create tickets from triggered alarms in Datadog. Additionally, you can add Datadog-generated graphs and comments to ServiceNow tickets, as well as manage the resolution workflow from within Datadog

## Setup
## Installation

To configure the ServiceNow integration, enter your ServiceNow instance name, and the username and password. We recommend creating a new user for the Datadog integration.

{{< img src="integrations/servicenow/servicenow-configuration.png" alt="servicenow integration" responsive="true">}}

## Data Collected
### Metrics

The ServiceNow integration does not include any metric at this time.

### Events
The ServiceNow integration does not include any event at this time.

### Service Checks
The ServiceNow integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
### Knowledge Base
#### Auto-generate support tickets from Datadog alerts

Now, you can set these alerts to automatically create support tickets and send them to the ServiceNow ticketing queue. From there, your support team will be notified of issues using the communication workflows that you have already established inside ServiceNow. All you have to do is mention @servicenow in the alert message or add @servicenow to the notification list for that monitor.

{{< img src="integrations/servicenow/servicenow-02-monitor-page.png" alt="ServiceNow" responsive="true">}}

#### Use variables in ticket payload and field mappings

Variables can be used in the body of your alerts or in field mappings to ensure rich details from the event are included in ServiceNow.  For example, you can include the title and severity in the appropriate ServiceNow field or you can include a link back to the specific incident in Datadog right from the ServiceNow ticket.

{{< img src="integrations/servicenow/servicenow-variables.png" alt="ServiceNow Variables" responsive="true">}}

#### Automate support resolution workflow

Once the monitor state returns to normal, the associated support ticket is automatically marked as “resolved”.

{{< img src="integrations/servicenow/servicenow-03-servicenow-resolved.png" alt="ServiceNow Resolved" responsive="true">}}

#### Send Datadog graphs to ServiceNow

In addition to automating ticket creation and resolution, you can also use Datadog to create ServiceNow tickets on an ad hoc basis whenever you see something in Datadog that needs your team’s attention. Just click the camera icon to share a snapshot of any Timeboard graph, add some context in the comment box to help your colleagues interpret the graph, and @mention ServiceNow to send the graph and your comments to ServiceNow.

{{< img src="integrations/servicenow/servicenow-04-mention-servicenow.png" alt="annotation" responsive="true">}}

