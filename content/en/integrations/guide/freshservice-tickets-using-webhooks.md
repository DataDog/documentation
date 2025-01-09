---
title: Freshservice Tickets using Webhooks

author: "Trevor Veralrud"
further_reading:
- link: "/integrations/webhooks/"
  tag: "Documentation"
  text: "Webhooks integration"
---

This guide shows you how to use the Datadog Webhooks integration to open new tickets in Freshservice when a monitor alerts.

## Setup

To begin, open the [Webhooks integration tile][1], go to the Configuration tab, then scroll to the bottom form to add a new Webhook.

### Name

Provide your Webhook with a name. This name is used in your monitor message (see [Usage](#usage)) with `@webhook-<NAME>`. For example, if you name your Webhook freshservice, you can open a ticket from your monitor by mentioning `@webhook-freshservice` in the monitor message.

### URL

Freshservice has 2 different versions of their API. This guide uses V2, but it is possible to use V1 with slight modifications to your JSON payload.

In the URL field enter the following endpoint:

`https://<YOUR_DOMAIN>.freshservice.com/api/v2/tickets`

### Payload

Enter a new ticket JSON payload. The following example uses only the required fields, so review [Freshservice's ticket endpoint][2] for more options on customizing your payload:

```json
{
  "email": "[email address to associate with ticket]",
  "subject": "$EVENT_TITLE",
  "description": "<img src=\"$SNAPSHOT\" /><hr/>$TEXT_ONLY_MSG",
  "status": 2,
  "priority": 2
}
```

**Note**:

* Values such as `$EVENT_TITLE` are variables used by the Webhook integration. For a full list of these variables and their meaning, see the Webhook integration tile or [Webhook integration documentation][3].
* Manually enter an email address for the email field instead of using the variable of `$EMAIL`, which is only populated when mentioning the Webhook in an *Event Stream* comment and not used within *Monitor Alerts*.
* The `description` field of the payload accepts HTML. The `$EVENT_MSG` variable renders your monitor's message in Markdown, which is not supported by Freshservice's API, so `$TEXT_ONLY_MSG` is used instead, along with a graph snapshot.
* The `status` and `priority` fields are numbers mapped to different values. To see these values, review [Freshservice's ticket endpoint][2].

### Authentication

Freshservice's API uses [Basic Access Authentication][4]. Your Base64 encoded credentials should be sent in the `Authorization` request header. Accepted credentials are your username and password in `username:password` format, or your Freshservice API key.

To set this up in your Webhook, add the following to your **Headers** section:

```json
{"Authorization": "Basic <BASE64_ENCODED_CREDENTIALS>"}
```

### Finishing up

In the Webhook integration tile, click **Install Integration** or **Update Configuration** (if you previously entered a Webhook definition) to save your changes.

## Usage

Add the `@webhook-<NAME>` to your monitor message. The Webhook is triggered when the monitor changes state.

It is recommended to add your @-mention inside of `{{#is_alert}}` or `{{#is_warning}}` conditionals, for example:

```text
{{#is_alert}}
    {{host.name}} is down!
    @webhook-freshservice
{{/is_alert}}
```

When your monitor triggers an alert, a new ticket appears in your Freshservice dashboard. If you choose not to use a conditional statement, a new ticket is created when the monitor recovers because the Webhook is triggered again.

## Limitations

### Ticket creation

The Webhooks integration can only create tickets. Updating an existing ticket requires a `PUT` method and the Webhooks integration only supports `POST` methods.

### Status and priority

The `$ALERT_STATUS` and `$PRIORITY` variables return strings (such as `ALERT` and `NORMAL`) instead of a numerical value expected by Freshservice's API. To setup different levels of status and priorities, create duplicate Webhooks with hard-coded status and priority fields. Then, `@-mention` those Webhooks inside of related conditional statements, for example:

```text
{{#is_warning}}
    Disk space usage is above 80%
    @webhook-freshservice-warning
{{/is_warning}}
{{#is_alert}}
    Disk space usage is above 95%
    @webhook-freshservice-alert
{{/is_alert}}
```

### Tagging

Tagging is supported in Freshservice's API, but note the following:

* The tags parameter in your JSON payload must be an array. That means you cannot use the `$TAGS` Webhook variable because it returns a comma separated list of strings.
* Tags added to your JSON payload must not contain a `:` character, so you may not be able to map all of your Datadog tags to Freshservice. If a `:` character exists in your tags, your request fails.
* Review the [Webhook integration documentation][3] for more variables that may be useful for Freshservice tags. In the following example, `$HOSTNAME` and `$ORG_ID` are used:

```json
{
  "email": "<EMAIL_ADDRESS_TO_ASSOCIATE_WITH_TICKET>",
  "subject": "$EVENT_TITLE",
  "description": "<img src=\"$SNAPSHOT\" /><hr/>$TEXT_ONLY_MSG",
  "status": 2,
  "priority": 2,
  "tags": ["$HOSTNAME", "$ORG_ID"]
}
```

### Troubleshooting

If your Webhooks fail to send after your monitor triggers, go to your Event Stream and search for `sources:webhooks` `status:error`. This searches for events with failed Webhooks that contain troubleshooting information, for example:

```text
- Reply status code was: HTTP 401
- Reply content was:
  {"code":"invalid_credentials","message":"You have to be logged in to perform this action."}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#integrations/webhooks
[2]: https://api.freshservice.com/v2/#create_ticket
[3]: /integrations/webhooks/#usage
[4]: https://en.wikipedia.org/wiki/Basic_access_authentication
