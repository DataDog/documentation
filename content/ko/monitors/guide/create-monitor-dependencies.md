---
aliases:
- /ko/monitors/faq/can-i-create-monitor-dependencies
further_reading:
- link: /monitors/
  tag: 설명서
  text: 모니터 생성 방법 알아보기
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림 설정
- link: /monitors/downtimes/
  tag: 설명서
  text: 다운타임을 예약하여 모니터 음소거
title: 모니터 종속성 생성
---

Datadog은 [컴포짓 모니터][1]를 완전히 지원하지만, 경고 트리를 생성하는 공식적인 방법은 없습니다.

일부 Datadog 사용자는 유사한 결과를 얻기 위해 Datadog API를 통해 웹후크 알림을 다운타임 범위 지정과 결합합니다.

개략적인 구성은 다음과 같습니다.

* 경고 A가 트리거되고 `@webhook-notification`이 발생합니다.
* 알림은 다른 경고를 음소거하기 위해 `$scope`를 통해 [Datadog 다운타임 API][2]에 도달합니다.
* 경고 A가 해결되면 다른 @webhook-알림을 사용하여 동일한 $scope에서 다운타임을 제거합니다.
정의된 [$scope][3]와 겹치는 활성 다운타임이 존재하는 경우 이전에 예약된 다운타임에 영향을 미칠 수 있습니다.

먼저, [웹후크를 생성합니다][4].
{{< img src="monitors/guide/mute_demo_webhook.png" alt="음소거_데모_웹후크"  >}}

API 엔드포인트의 전체 텍스트(왼쪽 열에 있는 각각의 두 번째 입력란):

음소거: `https://api.datadoghq.com/api/v1/downtime?api_key=XXX&application_key=XXX`

음소거 해제: `https://api.datadoghq.com/api/v1/downtime/cancel/by_scope?api_key=XXX&application_key=XXX`

그리고 둘 모두의 웹후크 콘텐츠:

```json
{"scope": "$ALERT_SCOPE"}
```

그런 다음 "경고 A"(예: 각 가용성 영역에 대한 호스트의 그룹화된 백분율 데이터 없음 경고)를 생성합니다.
{{< img src="monitors/guide/alert_example.png" alt="경고_예시" >}}

그런 다음 경고 메시지에서 @notify 웹후크를 사용하여 트리거될 때 해당 가용성 영역에서 모든 후속 호스트를 음소거하고, 경고가 해결되면 음소거를 해제할 수 있습니다.
{{< img src="monitors/guide/mute_demo_msg.png" alt="음소거_데모_메시지" >}}

전체 샘플 마크업은 다음과 같습니다.

```text
누락된 데이터가 많습니다. 먼저 AWS 중단이 있는지 확인하세요.
{{#is_alert}}
{{availability-zone.name}}에서 데이터의 50%가 누락되었습니다!! {{availability-zone.name}}에 대한 다른 모든 알림은 자동으로 음소거됩니다.
@webhook-mute-ALL-monitor-scope
{{/is_alert}}

{{#is_alert_recovery}}
{{availability-zone.name}}에서 더 이상 50%의 데이터가 누락되지 않습니다!! {{availability-zone.name}}에 대한 다른 모든 경고는 음소거 해제됩니다.
@webhook-unmute-ALL-monitor-scope
{{/is_alert_recovery}}
```

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types/composite/
[2]: /ko/api/v1/downtimes/
[3]: /ko/api/v1/downtimes/#cancel-downtimes-by-scope
[4]: https://app.datadoghq.com/account/settings#integrations/webhooks