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

Datadog supports `@notifications` in the messages of events when posted by the API. For example:

`@all`
: Sends a notification to all members of your organization.

`@test@example.com`
: Sends an email to `test@example.com`.

`@slack-<SLACK_ACCOUNT>-<CHANNEL_NAME>`
: Posts the event or graph to the specified Slack channel.

`@webhook`
: Alerts or triggers the webhook. See the [blog post on webhooks][3].

See [Notifications][4] to learn more.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[3]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[4]: /monitors/notify/
