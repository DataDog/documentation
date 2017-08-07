---
title: Datadog-PagerDuty Integration
integration_title: PagerDuty

kind: integration
doclevel: basic
---
## Overview

Connect PagerDuty to Datadog in order to:

  * Trigger and resolve incidents from your stream by mentioning @pagerduty in your post
  * See incidents and escalations in your stream as they occur
  * Get a daily reminder of who's on-call

You can also check out [this documentation][1] from Pagerduty.

Once you have Pagerduty integrated, you can check out our custom [Pagerduty Incident Trends][2].
{{< img src="integrations/pagerduty/pagerduty_incident_trends.png" >}}

## FAQ
### How do I automatically resolve a PagerDuty service when a monitor recovers?

To automatically resolve a PagerDuty service when a monitor recovers
you must include the PagerDuty notification in the `{{is_resolve}}` context of your **Say what's happening** section of your monitor as follows:
```
{{#is_resolve}} 

    This notification will only occur if the monitor resolves. 
    If  @pagerduty-trigger was triggered for the alert, it'll be resolved as well 

{{/is_resolve}}
```
   [1]: http://www.pagerduty.com/docs/guides/datadog-integration-guide/
   [2]: https://app.datadoghq.com/report/pagerduty
