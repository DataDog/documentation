---
title: How do I add custom template variables to my monitor message?
kind: faq
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: Learn how to create a monitor
- link: "monitors/notifications"
  tag: "Documentation"
  text: Configure your monitor notifications
---

## Overview 

For multi-alert monitors, you can add [template variables][1] to include information in your alert message that's specific to the tag scope that triggered the alert. This is dependent on the tags you use in the "trigger a separate alert for each" field in Section 1 of your monitor.

For example, if you trigger by each **host** tag, then a number of template variables related to **host** are available to you in your Section 3: **Say what's happening**, such as `{{host.name}}`, `{{host.ip}}`, etc.  
Using those variables, when the alert is triggered, you can be told the name and IP of the specific host that breached the monitor threshold.

But this also works for custom tags as well. If you've added a custom tag that follows the `key:value` syntax, then you can group data by those tag keys.  
This means you'll be able to apply the tag's **key** to the list of tags that a multi alert has a separate trigger for. Which in turn means you can use that tag's ".name" variable in your monitor message. (Of course, template variables can get confusing, so take a look at the "[use message template variables](https://cl.ly/3Y3f1b1T2k3Y)" button for a list of available variables and a walkthrough of how to use them effectively).

You can also use these template variables to [set conditional contacts and messages within the same monitor][2].

## Examples

Here's an example of where a user had a number of hosts tagged by different `creator:` values, e.g, `creator:wes_anderson` and `creator:saint_exupéry`.  
Here, the user was able to set up a multi-alert monitor to trigger a separate alert for each `creator:` tag, so they were able to include the `{{creator.name}}` in their monitor message. When this monitor triggers, the recipient of the alert notification sees whether the monitor was triggered by **wes_anderson**, **saint_exupéry**, or some other `creator:` value.

{{< img src="monitors/faq/multi_alert_templating_notification.png" alt="multi_alert_templating_notification" responsive="true" >}}

### My tag key has dots in it

A word of warning: the period (".") is a reserved character for monitor template variables syntax.  
If your tag group's key has a period in it, you have to hardwire your template variables to include brackets around the full key. For example, if a user were to submit a metric tagged with dot.key.test:five and then set up a multi alert monitor triggered by the dot.ket.test group tag, this user would have to apply the following syntax in order to use the dot.key.test.name template variable:
{{< img src="monitors/faq/template_with_dot.png" alt="template_with_dot" responsive="true" >}}

This monitor resulted in the following event (tagged by dot.key.test:five):
{{< img src="monitors/faq/dot_template_event.png" alt="dot_template_event" responsive="true" >}}

## API Example

You can also set up multi alert monitors using the Datadog API. The following example creates a multi alert by host using curl:
```
#!/bin/sh
# Make sure you replace the API and APP keys below
# with the ones for your account
api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

curl -X POST -H "Content-type: application/json" \
-d '{
      "type": "metric alert",
      "query": "avg(last_5m):sum:system.net.bytes_rcvd{*} by {host} > 100",
      "name": "Network data received on {{host.name}}",
      "message": "On average, over the past five minutes, host {{host.name}} received >100 bytes per second of network traffic.",
      "tags": ["app:webserver", "frontend"],
      "options": {
          "notify_no_data": true,
          "no_data_timeframe": 20
      }
    }' \
    "https://api.datadoghq.com/api/v1/monitor?api_key=${api_key}&application_key=${app_key}"
```

The `by {host}` section of the monitor query creates a multi alert by host. You can also group by multiple tag keys, e.g. `by {host,env}`.

For more information about using our API to manage monitors, see [our API docs][3]

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/notifications
[2]: /monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
[3]: /api/#monitors
