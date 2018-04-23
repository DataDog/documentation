---
title: Que font les notifications @ dans Datadog?
kind: faq
---

Lorsque vous créez un événement dans Datadog, vous pouvez également utiliser `@` pour avertir les utilisateurs via l'API ou l'interface utilisateur. Il existe également un ensemble d'adresses réservées pouvant être utilisées pour contacter Datadog ou tous les membres de votre compte.

Exemples:

* `@support-datadog` – contacte le support de Datadog directement lors de sa publication dans votre flux.
* `@all` – envoie une notification à tous les membres de votre organisation.
* `@someonesname` – notifies the specific user named ‘someonesname’.
* `@test@test.com` Envoie un courriel à test@test.com.

Furthermore, if you have HipChat, Slack, Webhooks, Pagerduty or VictorOps you can use:

* `@hipchat-[room-name]` ou `@slack-[room-name]` – affiche l'événement ou le graphique dans cette room de conversation.
* `@webhook` – alerts or triggers whatever is attached to that webhook. [Check out this blogpost on Webhooks][1]!
* `@pagerduty` or `@oncall` – sends an alert to Pagerduty. You can also use `@pagerduty-acknowledgeand` `@pagerduty-resolve`.

**Note**: that an @-notification in a comment doesn't send an email to the user posting that comment. So, you cannot @-notify yourself in a comment, but configuring an @-notification to yourself still works in a monitor message.

[1]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio/
