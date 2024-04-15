---

title: Datadog에 AppDynamics 이벤트 게시
---

이 문서에서는 AppDynamics 애플리케이션에서 Datadog 이벤트 익스플로러로 이벤트를 제출하는 방법을 다룹니다.
**참고**: 이 플러그인은 AppDynamics 팀에서 작성한 것이며 Datadog에서 지원하지 않습니다. 문제가 발생할 시 [AppDynamics 지원 팀][1]에 문의하세요.

필수 구성 요소: AppDynamics 4.1 이상 실행

먼저 Datadog 정책 단일 위반 전용 HTTP 템플릿을 만듭니다:

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

{{< img src="developers/faq/step_1_appdynamics.png" alt="step_1_appdynamics" >}}

최신 이벤트:

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

{{< img src="developers/faq/latest_event.png" alt="latest_event" >}}

이메일 템플릿을 사용할 수도 있습니다:

```json
{
  "title": "AppDynamicsEvent",
  "text": "ApplicationChangeEvent",
  "priority": "normal",
  "tags": ["os:windows"],
  "alert_type": "info"
}
```

{{< img src="developers/faq/email_template.png" alt="이메일 템플릿" >}}

[1]: https://www.appdynamics.com/support
