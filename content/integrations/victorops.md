---
aliases: []
description: Use VictorOps as a notification channel in Datadog alerts and events.
git_integration_title: victorops
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-VictorOps Integration
---


## Overview
Send Datadog alerts to VictorOps and gain fine-grained control over routing and escalation.
Get the right eyes on a problem faster, and reduce time to resolution.
Create alerts using **@victorops**
* From your event stream
* By taking a snapshot
* When a metric alert is triggered

## Setup
### Installation

1. On your VictorOps settings page, click "Integrations"
2. Click "Datadog", then "Enable Integration"
3. Copy your key
4. Back to Datadog, paste the API key in the next section here

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The VictorOps integration does not include any event at this time.

### Service Checks
The VictorOps integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
### Knowledge Base
#### VictorOps Routing Keys

Direct alerts to certain VictorOps users
Please list all the routing keys to be used on Datadog (if none are set up here, VictorOps will send the alert to the default group).

You will then be able to choose which VictorOps endpoint should receive the alert by using @victorops

Special characters are not allowed in the names. Upper/lower case letters, numbers, '_' and '-' are allowed.

### Choose a custom endpoint

If this field is left empty, the default endpoint will be 'https://alert.victorops.com/integrations/datadog/20140523/alert'
