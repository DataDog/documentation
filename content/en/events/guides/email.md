---
title: Events with email

aliases:
- /developers/events/email/
- /guides/eventsemail
- /service_management/events/guides/email/
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Events with email is not supported on {{< region-param key=dd_datacenter code="true" >}}</div>
{{< /site-region >}}

If your application does not have an existing [Datadog integration][1], and you don't want to create a [custom Agent check][2], you can send events with email. This can also be done with messages published to an Amazon SNS topic; read the [Create Datadog Events from Amazon SNS Emails][6] guide for more information.

## Setup

Before you can send events with email, you need a dedicated email address from Datadog:

1. Log in to your [Datadog account][3].
2. From the **Account** menu at the bottom left, select **Organization Settings**.
3. Click the **Events API emails** tab.
4. Choose the format for your messages from the **Format** dropdown (`Plain text` or `JSON`).
5. Optionally, define any of the other attributes listed in this page's [attribute definitions section](#attribute-definitions).
6. Click the **Create Email** button.

The **Events API emails** section displays all the emails available for your applications and who created them.

### Attribute definitions

| Name | Description | Example |
|---|---|---|
| Description | A description of the email's purpose. | "Used for MyService notifications" |
| Tags | List of tags to be appended to each event received through the email. If other tags are present in the JSON message, they are all added.<br>There is a limit of **20** tags per email. | `tag1:val1`, `tag2:val2` |
| Recipients | List of handles to be added to the beginning of the message for all events created through the email, without `@` prefix. For more information, see [Notification recipients][7].<br>There is a limit of **10** recipients per email. | `my@email.com`, `slack-acc-ch` |
| Alert Type | The alert type for events created from the event email. When present, the `alertType` field in a JSON email takes precedence over any other `alertType` values. | `Info` |

## Submission

There are two different ways to send events with email:

{{< tabs >}}
{{% tab "JSON" %}}

If you have complete control over the email sent by an application, then you can use configure a JSON-formatted message. This format allows you to set everything in the event that appears in Datadog.

### Source email {#source-email-1}

With a JSON-formatted email, the following fields are controllable:

* The sender's email address
* All arguments from the [Datadog Events API][1]

**Note**: If your JSON is not properly formatted, or the email is sent without a subject, the event doesn't show in your event stream.

### Datadog event {#datadog-event-1}

In a JSON-formatted email, the subject of the email doesn't appear in the event. The value of the title attribute is used for the event title. All data that appears in the event should be defined in JSON in the body of the email. Furthermore, the body must be pure, well-formed JSON—if not, the message is ignored. Example event sent with JSON:

{{< img src="developers/events/json-event.png" alt="json event" >}}

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

### Email body processing {#email-body-2}
The email body goes through several cleanup steps to enhance readability and security. The expected changes include:

- **HTML to Markdown**: HTML content is converted to its markdown equivalent.
- **HTML sanitization**: For security, email bodies are sanitized, allowing only specific HTML tags: `a`, `br`, `code`, `div`, `em`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `hr`, `iframe`, `img`,
`li`, `ol`, `p`, `pre`, `span`, `strong`, `ul`. Any other HTML tag, including strings enclosed in `<>`, are removed.
- **Strip reply/forward content**: Only the most recent email in a thread is retained, with older replies and forwards removed.

### Datadog event {#datadog-event-2}

The subject of the email becomes the title of the event and the body of the email becomes the event message. The sender of the email appears at the bottom of the event. Tags can be added by using `#` in message body. Example event sent with plain text:

{{< img src="developers/events/plain-event.png" alt="plain event" >}}

{{% /tab %}}
{{< /tabs >}}

### Markdown

Datadog event text supports [Markdown][5] but embedding HTML in Markdown is not supported. To use Markdown in the event text, start the text block with `%%% \n` and end the text block with `\n %%%`:

```json
{
  "title": "Did you hear the news today?",
  "text": "%%% \n [an example link](http://example.com/session_id \"Title\") \n %%%",
  "priority": "normal",
  "tags": ["environment:test"],
  "alert_type": "info"
}
```

If you are embedding a link in a Markdown block, make sure the URL is encoded properly:

```text
# Not encoded
http://example.com/session_id:123456

# Encoded
http://example.com/session_id%3A123456
```

### Email size
The maximum allowed email size, including content and attachments, is 20MB. Emails exceeding this limit are ignored.

### Usage tracking
To understand which emails are being used and receiving events, check the `Last Used` column in the **Events API Emails** tab in organization settings. This displays the most recent date that an email was processed for each address, or `No data` if there are no records of it being used.

[1]: /integrations/
[2]: /agent/agent_checks/
[3]: https://app.datadoghq.com
[5]: http://daringfireball.net/projects/markdown/syntax#lin
[6]: /integrations/guide/events-from-sns-emails/
[7]: /monitors/notify/#notification-recipients
