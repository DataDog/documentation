---
title: Events
kind: documentation
aliases:
- /guides/eventsemail
---

## Events email

When you need to integrate an application or system with Datadog, you have a few choices. The first is using one of the existing [Datadog integrations][1].
This gets you access to a wide variety of metrics and events with minimal configuration effort on your part. If your application isn't one of the integrated applications, opt to create [a custom check using the Agent][2]. This requires  more effort and potentially more knowledge on how the application and Datadog work.
You have the option to email events to Datadog if your an application does not have an existing [Datadog integration][1], and you don't want to create an [Agent check][2]. There are two different ways to use events with email, depending on whether the application offers you the ability to customize the format of the email body being sent.
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

```
Sender's email: Matt@Datadog
Subject: Env:Test - System at 50% CPU - #test
Body: This is a test message showing that env:test is at 50% CPU - #test
```

#### Datadog Event

{{< img src="developers/events/plain-event.png" alt="plain event" responsive="true" >}}

The subject of the email becomes the title of the event and the body of the email becomes the body of the event. Although it looks like a tag appears at the end of the title and body of the event, neither instance are actually tags. The sender of the email appears at the bottom of the event.

### JSON Email
#### Source Email

In the source JSON-formatted email, the following fields are available to control:

- Sender email address
- All arguments from the [Datadog Events API][3]

**Note**: If your JSON is not properly formatted or the email is sent without a subject, the event won't appear in your Event Stream.

#### Datadog Event

{{< img src="developers/events/json-event.png" alt="json event" responsive="true" >}}

In a JSON-formatted email, the subject of the email message is irrelevant. It is replaced by the title in the JSON in the body of the email. All data that appears in the event is defined in JSON in the body of the email. This JSON must be well-formed or the message is ignored. This means it should be formatted properly with commas separating key value pairs and it must be pure JSON.
**Note**: If you are testing the email with a standard email client, the body may be converted to HTML as a convenience to the user. This causes the JSON to no longer be JSON and the email is ignored by Datadog.


### Setting Up The Email Address

To set up the email, first log in to your [Datadog account][4]. From the **Integrations** menu, choose **APIs**, then scroll down to **Events API Emails**. This section shows you all the emails available for your applications and who created them. Choose the format for your messages from the **Format** dropdown, then click **Create API Email**.

## Markdown events
Datadog event text supports [Markdown][5].
**Note**: Embedding HTML in markdown is not supported in Datadog.

To use Markdown in the event text, start the text block with `%%% \n` and end the text block with `\n %%%`

**Example**:
```json
{
      "title": "Did you hear the news today?",
      "text": "%%% \n [an example link](http://catchpoint.com/session_id \"Title\") \n %%%",
      "priority": "normal",
      "tags": ["environment:test"],
      "alert_type": "info"
}
```

**Note**: If you are embedding a link in a Markdown block, make sure the URL is encoded properly.

**Example**:
```
# Not encoded
http://catchpoint.com/session_id:123456
# Encoded
http://catchpoint.com/session_id%3A123456
```

[1]: /integrations
[2]: /agent/agent_checks
[3]: /api/#events
[4]: https://app.datadoghq.com
[5]: http://daringfireball.net/projects/markdown/syntax#lin
