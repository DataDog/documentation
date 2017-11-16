---
title: How to @user in Slack from monitor alert
kind: faq
customnav: monitornav
---

## Scenario

You want to [notify](/monitors/notifications) users within slack notifications using `@username`.

## Solution

Within the message template wrap the `@username` in `< >` as seen below.  Slack then correctly parses this and will then **@ notify** the defined user.

{{< img src="monitors/faq/notification_template.png" alt="notification_template" responsive="true">}}

{{< img src="monitors/faq/notification_slack_preview.png" alt="notification_slack_preview" responsive="true">}}
