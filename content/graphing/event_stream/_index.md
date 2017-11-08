---
title: Event Stream
kind: documentation
autotocdepth: 3
customnav: graphingnav
aliases:
    - /guides/eventsemail
---

## Event Query Language

You can narrow down your search by filtering on certain event properties. See the list of filters below for more details. Please note that filters perform an exact match search and will not work with partial strings.

| Filter | Description |
|--------|-------------|
|user:pup@datadoghq.com|Find all events with comments by pup@datadoghq.com.|
|sources:github,chef|Show events from Github OR Chef.|
|tags:env-prod OR db|Show events tagged with #env-prod OR #db.|
|tags:security-group:sg-123 AND role:common-node|Show events tagged with #security-group:sg-123 AND #role:common-node.|
|hosts:i-0ade23e6,db.myapp.com|Show events from i-0ade23e6 OR db.myapp.com.|
|status:error|Show events with error status. (supports: 'error', 'warning', 'success')|
|priority:low|Show only low-priority events. (supports: 'low' or 'normal'. defaults to 'all')|
|incident:claimed|Show only claimed incidents. (supports: 'open', 'claimed', 'resolved', or 'all')|


Full text search works on all keywords provided in the search query after applying any filters. Full text search will look inside the event text, title, tags, users who commented on the event and host names and devices tied to the event for any related information.

You can use full text search to find all events with the same key tags. For example, to show all events with the #service key you would search #service.

In the example below, a full text search is performed to find all open chef or nagios errors that mention one or more redis instances that are currently down.

`sources:nagios,chef status:error redis_* AND down`

Please note that some of the advanced query language features (e.g. boolean logic) work only in the event stream page, and do not work in graph tiles or in screen board widgets.

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

## Acknowledge an event
Datadog refers to events that are generated from triggered monitors as Incidents. They're also known as a Monitor Alerts.

The best way to identify these in the Events page is to select the corresponding filter in the filter list:

{{< img src="graphing/events/filter_monitor_alert.png" alt="filter monitor alert" responsive="true" >}}

Incidents are unique to regular events and annotations in that they can be claimed/acknowledged by clicking the claim button (shown below) on the parent event or putting a #claim in the comments. 

{{< img src="graphing/events/claim_incident.png" alt="claim incident" responsive="true" >}}

By claiming an event a user is essentially assigning it to themselves and signaling to other users that it is being investigated. As an indicator of this, Datadog will pin the user's name and portrait to the record.

{{< img src="graphing/events/claimed_incident.png" alt="Claimed incident" responsive="true" >}}

Once claimed, an incident can be resolved by clicking the resolve button indicating to the team that the underlying issue has been addressed:

{{< img src="graphing/events/resolved_incident.png" alt="Resolved incident" responsive="true" >}}

## Events Email

When you need to integrate an application or system with Datadog, you have a
few choices. The first is using one of our many existing [integrations][integrations].
This will get you access to a wide variety of metrics and events with minimal
configuration effort on your part. If your application isn't one of the
integrated applications, then you can opt to create [a check using the agent][agentcheck].
This requires much more effort and potentially more knowledge on how the
application and how Datadog work.

There is another option available if you aren't using an application that has
an integration and you don't want to create an agent check. You can rely on
the application or system sending an email instead. There are two different ways
to use Events via Email, depending mostly on whether the application offers you
the ability to customize the format of the email body being sent.

<div class="alert alert-info">
<b>JSON-Formatted vs Plain Text:</b> <br>
If you have complete control over the email sent by the application to Datadog, then you will probably want to configure a JSON-formatted message to be sent.
This will allow you to set everything in the event that appears in the event
stream. See below fo examples of each.
</div>

## Plain Text Email
#### Source Email

In the source plain text email, you only have three fields you can control: sender
email address (required), subject (required), and body (optional).


{{< img src="graphing/events/plain-email.png" alt="plain email" responsive="true" >}}

#### Datadog Event

{{< img src="graphing/events/plain-event.png" alt="plain event" responsive="true" >}}

Note that the subject of the email becomes the title of the event and the body
of the email becomes the body of the event. Although it looks like a tag appears
at the end of the title and body of the event, neither instance are actually
tags. The sender of the email also appears at the bottom of the event, so be sure
to take advantage of that to help identify the sending application.

## JSON Email
#### Source Email

In the source JSON-formatted email, you have 10 fields you can control: sender
email address, and up to 9 JSON keys. Those keys are title, text, priority, tags,
alert type,  date happened,  host, aggregation key, and source type name.<br>**Note: If your JSON is not properly formatted or if your email is sent with a subject, the event will not appear on your Event Stream.**

{{< img src="graphing/events/json-email.png" responsive="true" >}}

#### Datadog Event

{{< img src="graphing/events/json-event.png" responsive="true" >}}

In a JSON-formatted email, the subject of the email message is irrelevant as it
will be replaced by the title in the JSON in the body of the email. All data that
appears in the event is defined in the JSON in the body of the email. This JSON
must be well-formed or the message will be ignored. This means that not only should
it look correct with commas separating key value pairs, it also must be pure JSON.
If you are testing the email with a standard email client, the body may be converted
to HTML as a convenience to the user. This will cause the JSON to no longer be
JSON and the email will be ignored by Datadog.

The allowable JSON keys can be found in the [events API documentation][eventsapi].

## Setting Up The Email Address

To set up the email, first log in to your Datadog account at
[https://app.datadoghq.com][dd-app]. From the *Integrations* menu, choose *APIs*,
then scroll down to *Events API Emails*. This section will show you all the emails
available for your applications and who created them. Choose the format for your
messages from the Format: dropdown, then click *Create API Email*.


{{< img src="graphing/events/event-email-api.png" alt="JSON Event Email API" responsive="true" >}}

[integrations]: /integrations
[agentcheck]: /agent/agent_checks
[eventsapi]: /api/#events
[dd-app]: https://app.datadoghq.com

## Markdown events
Datadog event text supports markdown. This guide help you better format Datadog events by using Markdown.

The detailed markdown syntax can be found <a href="http://daringfireball.net/projects/markdown/syntax#lin">here</a>.
Please note that embedding HTML in markdown is not supported with in Datadog.

To use Markdown in the event text, you need to begin the text block by `%%% \n` and end the text block with `\n %%%`

An example below:
<pre>
{
      "title": "Did you hear the news today?",
      "text": "%%% \n [an example link](http://catchpoint.com/session_id \"Title\") \n %%%",
      "priority": "normal",
      "tags": ["environment:test"],
      "alert_type": "info"
}
</pre>

Note: if you are embedding a link in a Markdown block, make sure the URL is encoded properly.

For example, the following url: "http://catchpoint.com/session_id:123456"

Should be encoded to: "http://catchpoint.com/session_id%3A123456"

## @ notifications


* `@support-datadog` – this will reach Datadog support directly when posted in your stream.
* `@all` – this will send a notification to all members of your organization.
* `@yourname` – this will notify the specific user named ‘yourname’.
* `@test@test.com` this will send an email to test@test.com.
* If you have HipChat, Slack, Webhooks, Pagerduty or VictorOps you can use:
    * `@hipchat-[room-name]` or `@slack-[room-name]` – posts the event or graph to that chat room.
    * `@webhook` – alerts or triggers whatever is attached to that webhook. Check out [our blogpost on Webhooks][events-1]!
    * `@pagerduty` – sends an alert to Pagerduty. You can also use `@pagerduty-acknowledge` and `@pagerduty-resolve`.


[events-1]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio

