---
aliases:
- /ko/developers/faq/calling-on-datadog-s-api-with-the-webhooks-integration
title: 웹훅 통합으로 Datadog API 호출하기
---

[웹훅 통합][1]을 사용하여 Datadog 모니터 및 이벤트에서 웹훅을 트리거할 수 있으며, 이 기능은 커스텀 커뮤니케이션 도구를 사용하거나 [모니터 알림을 텍스트 메시지로 전달][2]하여 Datadog 계정이 팀과 통신하는 데 유용합니다.

예를 들어 모니터가 트리거될 때마다 메트릭이나 이벤트를 Datadog 계정에 제출하려는 경우, [Datadog의 API][3]에서 호출하도록 웹훅 알림을 설정할 수도 있습니다.

## 실행 방법

각 웹훅은 이름(모니터에서 참조할 이름)과 URL(웹훅에서 전달할 URL)로 설정해야 합니다. Datadog API에 호출을 제출하려면 "커스텀 페이로드 사용"을 선택하고 다음 필드에 커스텀 페이로드를 추가합니다.

* **이름 필드**: 다른 모든 웹훅 이름 필드 중에서 고유한 것이면 무엇이든 가능합니다.

* **url 필드**: API를  보낼 때 사용되는 URL입니다. 다음과 같이 표시됩니다:
`https://api.datadoghq.com/api/v1/<API_ENDPOINT>?api_key=<DATADOG_API_KEY>`

* **커스텀 페이로드 필드**: API 호출에 포함하고자 하는 모든 옵션을 가진 JSON을 포함합니다. API 호출 유형에 따라 적절한 옵션이 결정됩니다. 모니터의 `$symbol` 콘텐츠를 사용하여 옵션 값의 일부를 채울 수도 있습니다.

## 예시

당신이 가지고 있는 일련의 모니터에서 실행 중인 순간 카운트를 보고 싶어하는 팀원이 있다고 가정해 보겠습니다. 그들은 얼마나 많은 모니터들이 정상 상태인지 또는 위험 상태인지를 기준으로 계산하기를 원합니다. 웹훅 알림을 추가하여 이러한 모니터 중 하나가 경고 또는 확인 상태가 될 때마다 "check_run" API 호출을 제출하고, 여기에서 [스크린보드][4]에 "상태 확인" 위젯을 추가하여 팀원에게 특정 시점의 모든 모니터 상태를 보여줄 수 있습니다.

이 경우 두 개의 개별 웹훅이 필요한데, 하나는 "mymonitorgroup-alert-check"용이고 다른 하나는 "mymonitorgroup-ok-check"용입니다. 둘 다 동일한 API 엔드포인트를 사용하므로 각각의 이름과 URL 값은 다음과 같습니다:

* 이름: mymonitorgroup-alert-check
    URL: `https://api.datadoghq.com/api/v1/check_run?api_key=<DATADOG_API_KEY>`

* 이름: mymonitorgroup-ok-check
    URL: `https://api.datadoghq.com/api/v1/check_run?api_key=<DATADOG_API_KEY>`

커스텀 페이로드는 check_run의 이름과 태그가 적용되는 곳입니다. "알림" 웹훅의 경우 다음을 고려하세요:

```json
{
  "check": "mymonitorgroup.status",
  "status": 2,
  "host_name": "$HOSTNAME",
  "tags": "[monitor:$ALERT_TITLE]"
}
```

이 커스텀 페이로드를 사용하면 모니터에 의해 @webhook-mymonitorgroup-alert-check가 트리거될 때마다 모니터 이름과 또는 모니터가 트리거된 호스트 이름으로 태그가 지정된 Critical 상태의 "mymonitorgroup.status" 검사 실행을 제출합니다.

그런 다음 "mymonitorgroup-ok-check" 검사에 대해 동일한 커스텀 페이로드 값을 적용하되 "상태"를 "2" 대신 "0"으로 설정하여 "OK" 상태를 표시할 수 있습니다.

이 두 웹훅을 모두 설정한 상태에서 팀원이 빠른 상태 보기를 원하는 모니터로 이동합니다. 그리고 다음과 같이 적절한 조건부 논리 태그에 내포된 웹훅 알림 참조를 추가할 수 있습니다:

```text
{{#is_alert}} @webhook-mymonitorgroup-alert-check {{/is_alert}}
{{#is_recovery}} @webhook-mymonitorgroup-ok-check {{/is_recovery}}
```

모니터가 설정되어 알림을 보내면(전체 상태 수에 포함되려면 OK 또는 CRITICAL 상태에서 최소 한 번 이상 알림을 보내야 함), "모니터" 태그로 그룹화된 "mymonitorgroup.check"를 통해 [스크린보드][4]에서 "상태 확인" 위젯을 설정할 수 있습니다.

다음은 이러한 위젯 중 하나의 예입니다(검사 이름이 "composite.status"이고 그룹에서 아직 한 대의 모니터만 "경고"로 트리거되었다가 다시 "확인"으로 트리거됨).:

{{< img src="developers/faq/check_status_editor.png" alt="check_status_editor" >}}

[1]: /ko/integrations/webhooks/
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[3]: /ko/api/
[4]: /ko/dashboards/#screenboards