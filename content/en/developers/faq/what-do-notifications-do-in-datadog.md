---
title: What do @-notifications do in Datadog?
kind: faq
further_reading:
- link: "https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio/"
  tag: "Blog"
  text: "Send SMS alerts with customizable WebHooks and Twilio"
---

When you create an event in Datadog you can also use `@` to notify users with the API or UI. There are also a set of reserved addresses which may be used to contact Datadog or all members of your account.

**Examples**:

* `@support-datadog` – reaches Datadog support directly when posted in your stream.
* `@all` – sends a notification to all members of your organization.
* `@someonesname` – notifies the specific user named `someonesname`.
* `@test@example.com` - sends an email to `test@example.com`.

Additionally, if you have [Slack][1], [Microsoft Teams][2], [Webhooks][3], [PagerDuty][4], or [VictorOps][5] use:

* `@slack-<ROOM_NAME>` or `@teams-<TEAM_NAME>` – posts the event or graph to that chat room.
* `@webhook` – alerts or triggers whatever is attached to that webhook.
* `@pagerduty` or `@oncall` – sends an alert to PagerDuty. You can also use `@pagerduty-acknowledge` and `@pagerduty-resolve`.

**Note**: An @-notification in a comment doesn't send an email to the user posting that comment. You cannot @-notify yourself in a comment, but configuring an @-notification to yourself works in a monitor message.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/slack
[2]: /integrations/microsoft_teams
[3]: /integrations/webhooks
[4]: /integrations/pagerduty
[5]: /integrations/victorops
