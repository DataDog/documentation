---
categories:
- monitoring
- notification
ddtype: crawler
description: Generate PagerDuty alerts from Datadog metrics and events.
doc_link: https://docs.datadoghq.com/integrations/pagerduty/
git_integration_title: pagerduty
has_logo: true
integration_title: PagerDuty
is_public: true
kind: integration
manifest_version: '1.0'
name: pagerduty
public_title: Datadog-PagerDuty Integration
short_description: Generate PagerDuty alerts from Datadog metrics and events.
version: '1.0'
---

{{< img src="integrations/pagerduty/pagerduty_incident_trends.png" alt="pagerduty incident trends" responsive="true" popup="true">}}

## Overview

Connect PagerDuty to Datadog in order to:

  * Trigger and resolve incidents from your stream by mentioning `@pagerduty` in your post
  * See incidents and escalations in your stream as they occur
  * Get a daily reminder of who's on-call

## Setup
Check out [this documentation](http://www.pagerduty.com/docs/guides/datadog-integration-guide/) from Pagerduty.

Once you have Pagerduty integrated, you can check out our custom [Pagerduty Incident Trends](https://app.datadoghq.com/report/pagerduty).

## Data Collected
### Metrics

The PagerDuty integration does not include any metric at this time.

### Events

Your PagerDuty Triggered/Resolved events appears in your [Event Stream](https://docs.datadoghq.com/graphing/event_stream/)

### Service Checks
The PagerDuty integration does not include any service check at this time.

## Troubleshooting
### How do I automatically resolve a PagerDuty service when a monitor recovers?

You must include the PagerDuty notification in the `{{#is_recovery}}` context of your **Say what's happening** section of your monitor as follows:

```
{{#is_recovery}}

    This notification will only occur if the monitor resolves. 
    If  @pagerduty-trigger was triggered for the alert, it'll be resolved as well 

{{/is_recovery}}
```

### How do I send a message/notification to a specific Pager Duty service when multiple are integrated ?

Use `@pagerduty-[serviceName]` in your monitor message. If you start typing it in your monitor **Say what's happening** section, you should see it autocomplete. 

{{< img src="integrations/pagerduty/pagerduty_faq_1.png" alt="pagerduty faq 1" responsive="true" popup="true">}}

### Why my alert description is truncated in PagerDuty ?

Datadog has an upper limit on your monitor notification lengths sent to PagerDuty, the limit is at **1024 characters**.

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

