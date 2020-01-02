---
title: Events with Email
kind: documentation
aliases:
- /guides/eventsemail
---

If your application does not have an existing [Datadog integration][1], and you don't want to create a [custom Agent check][2], you can send events with Email.

## Setup

Before you can send events with Email, you need a dedicated Email address from Datadog:

1. Log in to your [Datadog account][3].
2. Go to the **Integrations** menu, choose **APIs**.
3. Expand **Events API Emails**.
4. Choose the format for your messages from the **Format** dropdown (`Plain text` or `JSON`).
5. Click the **Create API Email** button.

The **Events API Emails** section displays all the Emails available for your applications and who created them.

## Submission

There are two different ways to send events with Email:

{{< tabs >}}
{{% tab "JSON" %}}

If you have complete control over the Email sent by an application, then you can use configure a JSON-formatted message. This format allows you to set everything in the event that appears in Datadog.

### Source Email {#source-email-1}

With a JSON-formatted Email, the following fields are controllable:

* The sender's Email address
* All arguments from the [Datadog Events API][1]

**Note**: If your JSON is not properly formatted, or the Email is sent without a subject, the event won't show in your event stream.

### Datadog event {#datadog-event-1}

In a JSON-formatted Email, the subject of the Email doesn't appear in the event. The value of the title attribute is used for the event title. All data that appears in the event should be defined in JSON in the body of the Email. Furthermore, the body must be pure, well-formed JSON—if not, the message is ignored. Example event sent with JSON:

{{< img src="developers/events/json-event.png" alt="json event"  >}}

**Note**: If you are testing the Email with a standard Email client, the body may be converted to HTML. This causes the body to no longer be pure JSON, resulting in an ignored Email.

[1]: /api/#events
{{% /tab %}}
{{% tab "Plain text" %}}

If you have little control over the Email sent by an application, use a plain text formatted message.

### Source Email {#source-email-2}

With a plain text formatted Email, the following fields are controllable:

| Field                | Required | Description                     |
|----------------------|----------|---------------------------------|
| Sender Email address | Yes      | The Email address of the sender |
| Subject              | Yes      | The subject of the Email        |
| Body                 | No       | The body of the Email           |

For example, the Email below is a valid submission:
```text
Sender's Email: matt@datadog.com
Subject: Env:Test - System at 50% CPU - #test
Body: This is a test message showing that env:test is at 50% CPU - #test
```

### Datadog event {#datadog-event-2}

The subject of the Email becomes the title of the event and the body of the Email becomes the event message. The sender of the Email appears at the bottom of the event. Example event sent with plain text:

{{< img src="developers/events/plain-event.png" alt="plain event"  >}}

**Note**: Although it looks like a tag appears at the end of the title and body of the event, neither instance are actually tags.

{{% /tab %}}
{{< /tabs >}}

### Markdown

Datadog event text supports [Markdown][4] but embedding HTML in Markdown is not supported. To use Markdown in the event text, start the text block with `%%% \n` and end the text block with `\n %%%`:

```json
{
  "title": "Did you hear the news today?",
  "text": "%%% \n [an example link](http://catchpoint.com/session_id \"Title\") \n %%%",
  "priority": "normal",
  "tags": ["environment:test"],
  "alert_type": "info"
}
```

If you are embedding a link in a Markdown block, make sure the URL is encoded properly:

```text
# Not encoded
http://catchpoint.com/session_id:123456

# Encoded
http://catchpoint.com/session_id%3A123456
```

[1]: /integrations
[2]: /agent/agent_checks
[3]: https://app.datadoghq.com
[4]: http://daringfireball.net/projects/markdown/syntax#lin
