---
title: Events with email
kind: documentation
aliases:
- /guides/eventsemail
---

If your application does not have an existing [Datadog integration][1], and you don't want to create a [custom Agent check][2], you can send events with email.

## Setup

Before you can send events with email, you need a dedicated email address from Datadog:

1. Log in to your [Datadog account][3].
2. Go to the **Integrations** menu, choose **APIs**.
3. Expand **Events API emails**.
4. Choose the format for your messages from the **Format** dropdown (`Plain text` or `JSON`).
5. Click the **Create API email** button.

The **Events API emails** section displays all the emails available for your applications and who created them.

## Submission

There are two different ways to send events with email:

{{< tabs >}}
{{% tab "JSON" %}}

If you have complete control over the email sent by an application, then you can use configure a JSON-formatted message. This format allows you to set everything in the event that appears in Datadog.

### Source email {#source-email-1}

With a JSON-formatted email, the following fields are controllable:

* The sender's email address
* All arguments from the [Datadog Events API][1]

**Note**: If your JSON is not properly formatted, or the email is sent without a subject, the event won't show in your event stream.

### Datadog event {#datadog-event-1}

In a JSON-formatted email, the subject of the email doesn't appear in the event. The value of the title attribute is used for the event title. All data that appears in the event should be defined in JSON in the body of the email. Furthermore, the body must be pure, well-formed JSON—if not, the message is ignored. Example event sent with JSON:

{{< img src="developers/events/json-event.png" alt="json event"  >}}

**Note**: If you are testing the email with a standard email client, the body may be converted to HTML. This causes the body to no longer be pure JSON, resulting in an ignored email.

[1]: /api/v1/events/
{{% /tab %}}
{{% tab "Plain text" %}}

If you have little control over the email sent by an application, use a plain text formatted message.

### Source email {#source-email-2}

With a plain text formatted email, the following fields are controllable:

| Field                | Required | Description                     |
|----------------------|----------|---------------------------------|
| Sender email address | Yes      | The email address of the sender |
| Subject              | Yes      | The subject of the email        |
| Body                 | Yes      | The body of the email           |

For example, the email below is a valid submission:

```text
Sender's email: matt@datadog.com
Subject: Env:Test - System at 50% CPU - #test
Body: This is a test message showing that env:test is at 50% CPU - #test
```

### Datadog event {#datadog-event-2}

The subject of the email becomes the title of the event and the body of the email becomes the event message. The sender of the email appears at the bottom of the event. Tags can be added by using `#` in message body. Example event sent with plain text:

{{< img src="developers/events/plain-event.png" alt="plain event"  >}}

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

[1]: /integrations/
[2]: /agent/agent_checks/
[3]: https://app.datadoghq.com
[4]: http://daringfireball.net/projects/markdown/syntax#lin
