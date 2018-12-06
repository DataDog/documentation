---
title: Event Stream
kind: documentation
aliases:
    - /guides/eventsemail
    - /guides/eventcorrelation/
    - /guides/markdown/
---

## Event Query Language

Narrow down your search by filtering on certain event properties. See the list of filters below for more details.
Note that filters perform an exact match search and don't work with partial strings.

| Filter                                            | Description                                                                              |
| --------                                          | -------------                                                                            |
| `user:pup@datadoghq.com`                          | Find all events with comments by pup@datadoghq.com.                                      |
| `sources:github,chef`                             | Show events from Github OR Chef.                                                         |
| `tags:env-prod OR db`                             | Show events tagged with #env-prod OR #db.                                                |
| `tags:security-group:sg-123 AND role:common-node` | Show events tagged with `#security-group:sg-123` AND `#role:common-node`.                |
| `hosts:i-0ade23e6,db.myapp.com`                   | Show events from i-0ade23e6 OR db.myapp.com.                                             |
| `status:error`                                    | Show events with error status. (supports: **error**, **warning**, **success**)           |
| `priority:low`                                    | Show only low-priority events. (supports: **low** or **normal**. defaults to **all**)    |
| `cloud_provider:* NOT "azure"`                    | Show all cloud providers except the ones tagged with "azure"                             |

Full text search works on all keywords provided in the search query after applying any filters. Full text search looks inside the event text, title, tags, users who commented on the event and host names and devices tied to the event for any related information.

Use tag search to find all events with the same key tag with the following query: 

| Filter               | Description                                                                    |
| ----                 | ---                                                                            |
| `tags:<KEY>:<VALUE>` | Shows events with the `<KEY>:<VALUE>` tag.                                     |
| `tags:<VALUE>`       | Shows all events with the `<VAlUE>` attached, whatever the `<KEY>`.            |
| `<KEY>:*`            | Shows all events with the `<KEY>` attached.                                    |
| `<KEY>`:`<REGEX>`    | Shows all events with `<KEY>:<VALUE>` tag where `<VALUE>` matches the `<REGEX>`|
| `tags:<KEY>`         | Doesn't return anything.                                                       |
| `<KEY>:<VALUE>`      | Doesn't return anything.                                                       |

To combine multiple terms into a complex query, use any of the following Boolean operators:

| Operator | Description                                                                                                                      | Example                             |
| ----     | ----                                                                                                                             | -----                               |
| `AND`    | **Intersection**: both terms are in the selected events (if nothing is added, `AND` is taken by default).                        | `redis_* AND down`                  |
| `OR`     | **Union**: either term is contained in the selected events.                                                                      | `sources:nagios OR sources:chef`    |
| `NOT`    | **Exclusion**: the following term is NOT in the event. This operator works for strings only—this does not work for tag searches. | `tags:<KEY>:<VALUE> NOT "<STRING>"` |

In the example below, a full text search is performed to find all open chef or Nagios errors that mention one or more Redis instances that are currently down.

`sources:nagios,chef status:error redis_* AND down`

Note that some of the advanced query language features (e.g. boolean logic) work only in the event stream page, and do not work in graph tiles or in screen board widgets.

Combine prefixes to construct more complex searches. For example, if you wanted to find all open `chef` or `nagios` errors that mention `cassandra`, you'd have a search like:

`sources:nagios,chef status:error cassandra`

Note: no spaces after the colon or commas in these lists and anything not attached to a prefix goes to full text search.

## Show events unaggregated

To show your events unaggregated in your event stream, change the following parameters in your event stream URL:

* Set `aggregate_up` to `false`
* Set `abstraction_level` to `1` 
* Set `use_date_happened` to `true`. 

[Here is an example link][3]

## Events Email

When you need to integrate an application or system with Datadog, you have a few choices. The first is using one of the existing [Datadog integrations][integrations].
This gets you access to a wide variety of metrics and events with minimal configuration effort on your part. If your application isn't one of the integrated applications, opt to create [a custom check using the Agent][agentcheck]. This requires  more effort and potentially more knowledge on how the application and Datadog work.

There is another option available if you aren't using an application that has an integration, and you don't want to create an Agent check. Rely on your application or system sending an email instead. There are two different ways to use events via email, depending on whether the application offers you the ability to customize the format of the email body being sent.

<div class="alert alert-info">
<b>JSON-Formatted vs Plain Text:</b> <br>
If you have complete control over the email sent by the application to Datadog, then you probably want to configure a JSON-formatted message to be sent.
This allows you to set everything in the event that appears in the event
stream. See below for examples of each.
</div>

### Plain Text Email
#### Source Email

In the source plain text email, you only have three fields to control: sender email address (required), subject (required), and body (optional).

{{< img src="graphing/events/plain-email.png" alt="plain email" responsive="true" >}}

#### Datadog Event

{{< img src="graphing/events/plain-event.png" alt="plain event" responsive="true" >}}

Note that the subject of the email becomes the title of the event and the body of the email becomes the body of the event. Although it looks like a tag appears at the end of the title and body of the event, neither instance are actually tags. The sender of the email also appears at the bottom of the event, so be sure to take advantage of that to help identify the sending application.

### JSON Email
#### Source Email

In the source JSON-formatted email, you have 10 fields you can control: sender email address, and up to 9 JSON keys. Those keys are title, text, priority, tags, alert type,  date happened,  host, aggregation key, and source type name.
**Note: If your JSON is not properly formatted or if your email is sent with a subject, the event won't appear on your Event Stream.**

{{< img src="graphing/events/json-email.png" alt="json email" responsive="true" >}}

#### Datadog Event

{{< img src="graphing/events/json-event.png" alt="json event" responsive="true" >}}

In a JSON-formatted email, the subject of the email message is irrelevant as it is replaced by the title in the JSON in the body of the email. All data that appears in the event is defined in the JSON in the body of the email. This JSON must be well-formed or the message is ignored. This means that not only should it look correct with commas separating key value pairs, it also must be pure JSON.
If you are testing the email with a standard email client, the body may be converted to HTML as a convenience to the user. This causes the JSON to no longer be JSON and the email is ignored by Datadog.

The allowable JSON keys can be found in the [events API documentation][eventsapi].

### Setting Up The Email Address

To set up the email, first log in to your Datadog account at [https://app.datadoghq.com][dd-app]. From the *Integrations* menu, choose *APIs*, then scroll down to *Events API Emails*. This section shows you all the emails available for your applications and who created them. Choose the format for your messages from the Format: dropdown, then click *Create API Email*.

{{< img src="graphing/events/event-email-api.png" alt="JSON Event Email API" responsive="true" >}}

[integrations]: /integrations
[agentcheck]: /agent/agent_checks
[eventsapi]: /api/#events
[dd-app]: https://app.datadoghq.com

## Markdown events
Datadog event text supports markdown ([Detailed markdown syntax](http://daringfireball.net/projects/markdown/syntax#lin)).
Note that embedding HTML in markdown is not supported with in Datadog.

To use Markdown in the event text, you need to begin the text block by `%%% \n` and end the text block with `\n %%%`

An example below:
```json
{
      "title": "Did you hear the news today?",
      "text": "%%% \n [an example link](http://catchpoint.com/session_id \"Title\") \n %%%",
      "priority": "normal",
      "tags": ["environment:test"],
      "alert_type": "info"
}
```

Note: if you are embedding a link in a Markdown block, make sure the URL is encoded properly.

For example, the following url: `http://catchpoint.com/session_id:123456`

Should be encoded to: `http://catchpoint.com/session_id%3A123456`

## @ notifications

* `@support-datadog` – Reaches Datadog support directly when posted in your stream.
* `@all` – Sends a notification to all members of your organization.
* `@yourname` – Notifies the specific user named 'yourname'.
* `@test@example.com` Sends an email to `test@example.com`.
* If you have HipChat, Slack, Webhooks, Pagerduty, or VictorOps, use:
    * `@hipchat-[room-name]` or `@slack-[room-name]` – posts the event or graph to that chat room.
    * `@webhook` – Alerts or triggers whatever is attached to that webhook. Check out [our blogpost on Webhooks][events-1]!
    * `@pagerduty` – Sends an alert to Pagerduty. You can also use `@pagerduty-acknowledge` and `@pagerduty-resolve`.

[events-1]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio

[1]: /monitors/
[2]: /graphing/event_stream
[3]: https://app.datadoghq.com/event/stream?show_private=true&aggregate_up=false&abstraction_level=1&use_date_happened=true&per_page=30&display_timeline=true&from_ts=1418047200000&to_ts=1418050800000&incident=true&codemirror_editor=true&live=true&bucket_size=60000
