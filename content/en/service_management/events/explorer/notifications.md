---
title: Doc Title
kind: <UPDATE>
disable_toc: false
aliases:
- /path-to-old-doc/
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
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



[3]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[4]: /monitors/notify/
