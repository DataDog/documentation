---
title: Events via Email
kind: guide
listorder: 15
sidebar:
  nav:
    - header: Events via Email guide
    - text: Overview
      href: "#overview"
    - text: JSON-Formatted vs Plain Text
      href: "#json-vs-plain"
    - text: Setting up the Email Address
      href: "#setup-address"
    - text: Formatting The JSON Data
      href: "#json-data"

---
## Overview {#overview}

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

## JSON-Formatted vs Plain Text {#json-vs-plain}

If you have complete control over the email sent by the application to Datadog,
then you will probably want to configure a JSON-formatted message to be sent.
This will allow you to set everything in the event that appears in the event
stream. Here are examples of each:

### Plain Text


#### Source Email

In the source plain text email, you only have three fields you can control: sender
email address, subject, and body.


![Plain Text Email](/static/images/plain-email.png)

#### Datadog Event

![Plain Text Event](/static/images/plain-event.png)


Note that the subject of the email becomes the title of the event and the body
of the email becomes the body of the event. Although it looks like a tag appears
at the end of the title and body of the event, neither instance are actually
tags. The sender of the email also appears at the bottom of the event, so be sure
to take advantage of that to help identify the sending application.

### JSON

#### Source Email

In the source JSON-formatted email, you have 10 fields you can control: sender
email address, and up to 9 JSON keys. Those keys are title, text, priority, tags,
alert type,  date happened,  host, aggregation key, and source type name.

![JSON Email](/static/images/json-email.png)

#### Datadog Event

![JSON Event](/static/images/json-event.png)


In a JSON-formatted email, the subject of the email message is irrelevant as it
will be replaced by the title in the JSON in the body of the email. All data that
appears in the event is defined in the JSON in the body of the email. This JSON
must be well-formed or the message will be ignored. This means that not only should
it look correct with commas separating key value pairs, it also must be pure JSON.
If you are testing the email with a standard email client, the body may be converted
to HTML as a convenience to the user. This will cause the JSON to no longer be
JSON and the email will be ignored by Datadog.

The allowable JSON keys can be found in the [events API documentation][eventsapi].

## Setting Up The Email Address {#setup-address}

To set up the email, first log in to your Datadog account at
[https://app.datadoghq.com][dd-app]. From the *Integrations* menu, choose *APIs*,
then scroll down to *Events API Emails*. This section will show you all the emails
available for your applications and who created them. Choose the format for your
messages from the Format: dropdown, then click *Create API Email*.

![JSON Event Email API](/static/images/event-email-api.png)



[integrations]: /integrations
[agentcheck]: /guides/agent_checks
[eventsapi]: /api/#events
[dd-app]: https://app.datadoghq.com
