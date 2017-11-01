---
title: Events FAQ
kind: documentation
autotocdepth: 3
hideguides: true
customnav: graphingnav
---

## Events

### What do @ notifications do in Datadog?


* `@support-datadog` – this will reach Datadog support directly when posted in your stream.
* `@all` – this will send a notification to all members of your organization.
* `@yourname` – this will notify the specific user named ‘yourname’.
* `@test@test.com` this will send an email to test@test.com.
* If you have HipChat, Slack, Webhooks, Pagerduty or VictorOps you can use:
    * `@hipchat-[room-name]` or `@slack-[room-name]` – posts the event or graph to that chat room.
    * `@webhook` – alerts or triggers whatever is attached to that webhook. Check out [our blogpost on Webhooks][events-1]!
    * `@pagerduty` – sends an alert to Pagerduty. You can also use `@pagerduty-acknowledge` and `@pagerduty-resolve`.

### Searching Events Help

Your query runs a full text search of events and their comments. You can also
target certain event properties, such as the event source or status, by using
the following search prefixes:

* **`user:`**`pup@datadoghq.com` Find all events with comments by pup@datadoghq.com.
* **`sources:`**`github,chef` Show events from Github and Chef.
* **`tags:`**`env-prod,db` Show events tagged with #env-prod AND #db.
* **`hosts:`**`db1.myapp.com,db2.myapp.com` Show events from db1.myapp.com OR db2.myapp.com.
* **`status:`**`error` Show only error status events. (**supports:** 'error', 'warning', 'success')
* **`priority:`**`low` Show only low-priority events. (**supports:** 'low' or 'normal'. defaults to 'all')
* **`incident:`**`claimed` Show only claimed incidents. (**supports:** 'open', 'claimed', 'resolved', or 'all')

Prefixes can easily be combined to make much more complex searches.  For example,
if you wanted to find all open chef or nagios errors that mention cassandra, you'd
have a search like:

`sources:nagios,chef status:error cassandra`

Note: no spaces after the colon or commas in these lists and anything not attached
to a prefix goes to full text search.

### Is it possible to submit events via email?

Yes! To get started you need to go the API tab in the [settings page][events-2],
create one or more API emails.

For a monitoring tool that does not allow you to edit the body of the email you
need to create a plain-text email, and have that system or tool send alarms or
notifications to this email.

For systems that allow you to edit the content of the notification emails, you
may use a JSON email. In the body of an email sent to a JSON API email you need
to include a well formatted JSON event request as per our existing events API.
For more details about our events API, visit our [API documentation][events-3].

Here is an example:

```
{
  "title": “Host CPU above 75% for 5 minutes",
  "text": "Host CPU has been above 75% for the last 5 minutes …etc",
  "priority": "normal",
  "tags": ["vsphere", "env:prod", "host:i-a4f761f0", "role:admin"],
  "alert_type": "error"
}
```

### What formatting is available for event text?

We have adopted Daring Fireball's Markdown throughout the site. To find out more
about Markdown, visit the [Markdown docs][events-4].

[events-1]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[events-2]: https://app.datadoghq.com/account/settings#api
[events-3]: /api#events
[events-4]: http://daringfireball.net/projects/markdown/syntax
