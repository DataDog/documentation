---
"categories":
- "collaboration"
- "incidents"
- "notifications"
"custom_kind": "integration"
"dependencies": []
"description": "Generate PagerDuty alerts from Datadog metrics and events."
"doc_link": "https://docs.datadoghq.com/integrations/pagerduty/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/mobile-incident-management-datadog/"
  "tag": "Blog"
  "text": "Manage incidents on the go with the Datadog mobile app"
- "link": "https://www.datadoghq.com/blog/how-pagerduty-deploys-safely-with-datadog/"
  "tag": "Blog"
  "text": "How PagerDuty deploys safely with Datadog"
- "link": "https://docs.datadoghq.com/tracing/service_catalog/integrations/#pagerduty-integration"
  "tag": "Blog"
  "text": "Using Integrations with Service Catalog"
- "link": "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_pagerduty"
  "tag": "Terraform"
  "text": "Create and manage the Datadog Pagerduty integration with Terraform"
"git_integration_title": "pagerduty"
"has_logo": true
"integration_id": ""
"integration_title": "PagerDuty"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "pagerduty"
"public_title": "Datadog-PagerDuty Integration"
"short_description": "Generate PagerDuty alerts from Datadog metrics and events."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-warning">The Datadog PagerDuty integration has limited support in the Datadog for Government site. Service Catalog integration and auto-resolution from Incident Management and Workflow Automation are not supported.</div>
{{< /site-region >}}

## Overview

Connect PagerDuty to Datadog in order to:

- Trigger and resolve incidents from your stream by mentioning `@pagerduty` in your post
- See incidents and escalations in your stream as they occur
- Get a daily reminder of who's on-call

## Setup

See the [Datadog Integration Guide][1] from Pagerduty.

{{< site-region region="us" >}}
Once you have Pagerduty integrated, you can check out Datadog's custom Pagerduty Incident Trends.
{{< /site-region >}}

## Data Collected

### Metrics

The PagerDuty integration does not include any metrics.

### Events

Your PagerDuty Triggered/Resolved events appear in the [Events Explorer][2].

### Service Checks

The PagerDuty integration does not include any service checks.

## Troubleshooting

### Send a notification to a specific PagerDuty service

To send a message or notification to a specific PagerDuty service when multiple services are integrated, use `@pagerduty-[serviceName]` in your monitor message. If you start typing it in your monitor **Say what's happening** section, you should see it autocomplete.

{{< img src="integrations/pagerduty/pagerduty_faq_1.png" alt="pagerduty faq 1" popup="true">}}

When a monitor recovers, it automatically resolves the Pagerduty service if you include the notification handle in the monitor recover message but won't if it's only included in the`{{#is_alert}}` context.

### Mapping of PagerDuty incident severities

The severity of PagerDuty incidents is determined by the status of the monitor that is causing the alert. The following table illustrates how the alert status is mapped to a PagerDuty incident severity.

| Monitor status     | PagerDuty incident severity             |
|--------------------|-----------------------------------------|
| `ALERT`            | `error`                                 |
| `NODATA`           | `error`                                 |
| `WARNING`          | `warning`                               |
| `OK` or others     | `info`                                  |

For example, if the monitor transitions from `OK` to `WARNING` and notifies a `@pagerduty-[serviceName]`, the created PagerDuty incident will be of severity `warning`.

**Note**: This mapping happens automatically, and cannot be modified.

### Alert description truncated

Datadog has an upper limit on your monitor notification lengths sent to PagerDuty. The limit is at **1024 characters**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://www.pagerduty.com/docs/guides/datadog-integration-guide
[2]: https://docs.datadoghq.com/events/explorer/

