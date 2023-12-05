---
title: Notifications
kind: Documentation
disable_toc: false
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Learn more about notification options"
---

## Overview

Datadog supports `@notifications` in the messages of events when [posted by the API][1]. For example:

`@all`
: Sends a notification to all members of your organization.

`@test@example.com`
: Sends an email to `test@example.com`.

`@slack-<SLACK_ACCOUNT>-<CHANNEL_NAME>`
: Posts the event or graph to the specified Slack channel.

`@webhook`
: Alerts or triggers the webhook. See the [blog post on webhooks][2].

See [Notifications][3] to learn more.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /api/latest/events/#post-an-event
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[3]: /monitors/notify/
