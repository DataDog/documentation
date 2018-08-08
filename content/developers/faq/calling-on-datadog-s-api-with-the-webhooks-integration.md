---
title: Calling on Datadog's API with the Webhooks Integration
kind: faq
---

You can use the [Webhooks integration][1] to trigger webhooks from Datadog monitors and events--this is often useful for having your Datadog account communicate with your team using custom communication tools, or even [forwarding monitor alerts to text messages][2].

But you can also set up webhook notifications to call on [Datadog's API][3] if, for example, you wanted to submit a metric/event to your Datadog account every time a monitor triggered.

## How do to this:

Each webhook must be set up with a name (to be referenced in monitors) and a url (to be pinged by the webhook). For submitting a call to the Datadog API, you also need to select "Use custom payload" and add your custom payload to the subsequent field.

* The **name field**: can be whatever you like, although it should be unique among all the other webhook name fields.

* The **url field**: should be the url used when pinging the API. It looks like this:
`https://api.datadoghq.com/api/v1/<API_ENDPOINT>?api_key=<YOUR_API_KEY>`

* The **custom payload field**: contains the JSON with all the options you want to include in the API call. Which options are appropriate depend on the API call you're making. You can sometimes use the monitor's $symbol content to fill in parts of the option values.

## Example:

Imagine that you have a series of monitors that someone on your team would like to see a running, momentary count of, in terms of how many of these monitors are in an OK vs. a CRITICAL status. You could add a webhook notification to submit a "check_run" API call whenever one of these monitors went into an alert or OK state, and from there you could add a "check status" widget in a [screenboard][4] to show your teammate what the status of all these monitors were at any given moment.

In that case, you would need two separate webhooks, one for "mymonitorgroup-alert-check" and the other for "mymonitorgroup-ok-check". Both would use the same API endpoint, so their respective "name and url" values would be as follows:

* Name: mymonitorgroup-alert-check
    Url: `https://api.datadoghq.com/api/v1/check_run?api_key=<MY_API_KEY>`

* Name: mymonitorgroup-ok-check
    Url: `https://api.datadoghq.com/api/v1/check_run?api_key=<MY_API_KEY>`

The custom payload is where the name and tags of the check_run would be applied. For our "alert" webhook, something like the following might fit:

```json
{
"check": "mymonitorgroup.status",
"status": 2,
"host_name": "$HOSTNAME",
"tags": "[monitor:$ALERT_TITLE]"
}
```

With this custom payload, every time the @webhook-mymonitorgroup-alert-check was triggered by a monitor, it would submit a check run named "mymonitorgroup.status" with a CRITICAL state, tagged by the monitor's name and, if applicable, the name of the host that the monitor was triggered on.

You would then apply the same custom payload values for the "mymonitorgroup-ok-check" check, but with a "status" of "0" instead of "2" to indicate an "OK" state.

With both of those webhooks set, you would go to your monitors (the ones your teammate wants a quick status-view of) and add the webhook notification references, nested in their appropriate conditional logic tag, like so:

```
{{#is_alert}} @webhook-mymonitorgroup-alert-check {{/is_alert}}
{{#is_recovery}} @webhook-mymonitorgroup-ok-check {{/is_recovery}}
```

Once your monitors are set and alerting (they'll all need to alert at least once in either OK or CRITICAL state in order to be included in the complete status count), you can then set up a "check status" widget in a [screenboard][4] over your "mymonitorgroup.check", grouped out by, in this case, the "monitor" tag.

Here's an example of one such widget (although in this example, the check's name was "composite.status" and only one monitor in our group has yet triggered as "alert" and then "ok" again):

{{< img src="developers/faq/check_status_editor.png" alt="check_status_editor" responsive="true" >}}

[1]: /integrations/webhooks
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[3]: /api
[4]: /graphing/dashboards/screenboard
