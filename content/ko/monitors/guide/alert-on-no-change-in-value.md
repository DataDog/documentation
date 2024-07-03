---
aliases:
- /ko/monitors/faq/how-can-i-configure-a-metric-monitor-to-alert-on-no-change-in-value
further_reading:
- link: /monitors/
  tag: 설명서
  text: 모니터 생성 방법 알아보기
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림 구성
title: 값에 변화가 없을 시 경고
---

정해진 기간 내에 메트릭 값이 변하지 않을 때 알림을 받고 싶은 경우, 가장 간단한 방법은 쿼리에서 `diff()` 함수를 사용하는 것입니다. 그러면 연속적인 데이터 포인트에서 델타 값이 생성됩니다.

* `diff(avg:system.mem.free{*})`

그런 다음 abs() 함수를 적용해 이 델타 값의 절대 값을 구합니다.

* `abs(diff(avg:system.mem.free{*}))`

UI에서 이 함수를 적용할 수 있습니다.

{{< img src="monitors/guide/alert_value_difference.png" alt="시그마 아이콘 > Rate > Value difference에서 여러 함수 적용" >}}

또는 'edit monitor' UI의 Source 탭에서 수동으로 복잡한 쿼리를 입력할 수 있습니다(또는 [API][1]를 통해 프로그램 방법으로 적용할 수 있음). 다음 이미지를 참고하세요.

메트릭 모니터 자체 [알림 조건][2]의 경우 다음과 같이 구성하세요.

* 임계값 알림 선택
* "Trigger when the metric is..." 드롭다운 메뉴에서 **below**나 **equal to**로 설정하세요.
* "Alert Threshold" 필드를 0(영)으로 설정하세요.

이렇게 구성하면 선택한 시간대에서 값의 변화가 없을 경우 알림을 트리거합니다.

원하는 경우 다른 [알림 조건/옵션][2]을 설정할 수 있습니다. 다음은 모니터의 UI 구성 예시이니 참고하세요.

{{< img src="monitors/faq/zero_alert.png" alt="zero_alert" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/
[2]: /ko/monitors/configuration/