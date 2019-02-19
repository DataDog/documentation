---
title: What do @ notifications do in Datadog?
kind: faq
---

When you create an event in Datadog you can also use `@` to notify users via the API or UI. There are also a set of reserved addresses which may be used to contact Datadog or all members of your account.

Examples:

* `@support-datadog` – reaches Datadog support directly when posted in your stream.
* `@all` – sends a notification to all members of your organization.
* `@someonesname` – notifies the specific user named 'someonesname'.
* `@test@example.com` -sends an email to `test@example.com`.

Furthermore, if you have [HipChat][1], [Slack][2], [Webhooks][3], [Pagerduty][4], or [VictorOps][5] you can use:

* `@hipchat-<ROOM_NAME>` or `@slack-<ROOM_NAME>` or `@microsoft_team-<TEAM_NAME>` – posts the event or graph to that chat room.
* `@webhook` – alerts or triggers whatever is attached to that webhook. [Check out this blogpost on Webhooks][6]!
* `@pagerduty` or `@oncall` – sends an alert to Pagerduty. You can also use `@pagerduty-acknowledgeand` `@pagerduty-resolve`.

**Note**: that an @-notification in a comment doesn't send an email to the user posting that comment. So, you cannot @-notify yourself in a comment, but configuring an @-notification to yourself still works in a monitor message.

[1]: /integrations/hipchat
[2]: /integrations/slack
[3]: /integrations/webhooks
[4]: /integrations/pagerduty
[5]: /integrations/victorops
[6]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
