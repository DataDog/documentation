---
kind: faq
title: AppDynamics のイベントを Datadog に投稿する
---

この記事では、AppDynamics アプリケーションから Datadog イベントエクスプローラーにイベントを送信することができます。
**注**: このプラグインは AppDynamics のチームによって作成され、Datadog ではサポートされていません。何か問題が発生した場合は、[AppDynamics のサポートチームに連絡してください][1]。

前提条件: AppDynamics 4.1 以降が稼動していること

まず、Datadog Policy Single Violation Only HTTP Template を作成します。

```json
{
  "title": "${latestEvent.displayName} - ${policy.name} ",
  "text": "${latestEvent.summaryMessage} ${latestEvent.guid} ${latestEvent.eventTypeKey} Policy Name - ${policy.name} Policy ID - ${policy.id}  Policy Digest : ${policy.digest} ${policy.digestDurationInMins} ",
  "alert_type": "${topSeverity}",
  "priority": "${priority}",
  "aggregation_key": " ${policy.id} ",
  "tags": [
    "guid:${latestEvent.guid}",
    "eventid:${latestEvent.id}",
    "environment:${Environment}",
    "os:${OS}",
    "platform:${Platform}"
  ]
}
```

{{< img src="developers/faq/step_1_appdynamics.png" alt="step_1_appdynamics"  >}}

最新イベント:

```json
{
  "title": "${latestEvent.displayName}",
  "text": "${latestEvent.summaryMessage} ${latestEvent.eventTypeKey}",
  "alert_type": "${topSeverity}",
  "priority": "${priority}",
  "aggregation_key": "${latestEvent.guid}",
  "tags": [
    "guid:${latestEvent.guid}",
    "eventid:${latestEvent.id}",
    "environment:${Environment}",
    "os:${OS}",
    "platform:${Platform}"
  ]
}
```

{{< img src="developers/faq/latest_event.png" alt="latest_event"  >}}

また、メールテンプレートを利用することもできます。

```json
{
  "title": "AppDynamicsEvent",
  "text": "ApplicationChangeEvent",
  "priority": "normal",
  "tags": ["os:windows"],
  "alert_type": "info"
}
```

{{< img src="developers/faq/email_template.png" alt="email_template"  >}}

[1]: https://www.appdynamics.com/support