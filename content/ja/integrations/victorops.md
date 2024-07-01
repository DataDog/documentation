---
"categories":
- "alerting"
- "notifications"
"custom_kind": "integration"
"dependencies": []
"description": "Use VictorOps as a notification channel in Datadog alerts and events."
"doc_link": "https://docs.datadoghq.com/integrations/victorops/"
"draft": false
"git_integration_title": "victorops"
"has_logo": true
"integration_id": "victorops"
"integration_title": "VictorOps"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "victorops"
"public_title": "Datadog-VictorOps Integration"
"short_description": "Use VictorOps as a notification channel in Datadog alerts and events."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Use the Datadog-VictorOps integration to send Datadog alerts to VictorOps and gain precise control over routing and escalation. See the problems faster, and reduce time to resolution by creating alerts using **@victorops**:

- From your event stream
- By taking a snapshot
- When a metric alert is triggered

## Setup

### Installation

1. On your VictorOps settings page, click "Integrations"
2. Click "Datadog", then "Enable Integration"
3. Copy your key
4. Back to Datadog, paste the API key in the next section here

## Data Collected

### Metrics

The VictorOps integration does not include any metric.

### Events

The VictorOps integration does not include any events.

### Service Checks

The VictorOps integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][1].

## Further Reading

### Knowledge base

#### Routing keys

To direct alerts to specific VictorOps users, list all your routing keys in Datadog. If no keys are set up, VictorOps sends the alert to the default group. Then, choose the VictorOps endpoint that should receive the alert by using `@victorops`.

Special characters are not allowed in the names. Upper/lower case letters, numbers, '\_' and '-' are allowed.

### Choose a custom endpoint

If this field is empty, the default endpoint is 'https://alert.victorops.com/integrations/datadog/20140523/alert'

[1]: https://docs.datadoghq.com/help/

