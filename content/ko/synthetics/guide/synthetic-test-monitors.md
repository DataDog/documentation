---
description: 신서틱 테스트로 생성한 신서틱 모니터에 대해 알아보기
further_reading:
- link: /monitors/manage/
  tag: 설명서
  text: 모니터 관리 방법 알아보기
- link: /monitors/guide/integrate-monitors-with-statuspage/
  tag: 설명서
  text: Statuspage로 모니터를 통합하는 방법 알아보기
- link: /synthetics/metrics/
  tag: 설명서
  text: 신서틱 모니터링 메트릭에 대해 알아보기
title: 신서틱 테스트 모니터 사용
---

## 개요

신서틱 테스트를 생성하면 Datadog에서 자동으로 관련 모니터를 생성합니다. 신서틱 테스트 모니터에 알림이 있을 때 알림을 받도록 설정할 수 있습니다.

{{< img src="synthetics/guide/synthetics_test_monitors/synthetic_test_monitor.png" alt="신서틱 테스트 모니터" style="width:100%;">}}

## 신서틱 테스트 모니터 생성

<div class="alert alert-info"><a href="/monitors/">Monitors</a>에서 신서틱 테스트 모니터를 생성하거나 가져올 수 없습니다.</div>

**Configure the monitor for this test** 섹션에서 모니터를 생성해 신서틱 테스트가 실패할 때 알림을 전송할 수 있습니다. 모니터가 생성한 신서틱 테스트와 신서틱 테스트 구성에서 설정한 알림 조건과 연결됩니다. 모니터 속성과 태그 변수를 사용하려면 [메트릭 모니터][1]를 생성하세요.

{{< img src="synthetics/guide/synthetics_test_monitors/configure_the_monitor_for_this_test.png" alt="신서틱 테스트에 모니터 생성" style="width:90%;">}}

[**Manage Monitors**][2] 페이지에서 검색할 때 사용할 모니터 이름을 사용자 정의하세요. 신서틱 테스트 모니터를 찾으려면 검색 창에서 `type:synthetics` 필터를 사용하세요. 모니터 [조건 변수][3]를 사용해 테스트 상태에 따라 알림 메시지의 특징을 정할 수 있습니다.

신서틱 테스트는 이메일, Slack, Pagerduty, Microsoft Teams와 같은 알림 채널과 통합됩니다. 자세한 정보는 [알림][4]을 참고하세요.

Datadog에서는 알림 층이 여럿인 경우(예: 신서틱 테스트 알림이 길어질수록 더 많은 팀에게 알림) [재알림][5]을 사용할 것을 권고합니다.

## 모니터 알림 맞추기

인시던트 관리 전략에 따라 신서틱 테스트 알림이 있을 때 여러 팀에게 알림을 보내야 할 수 있습니다. Team B에게 두 번째 알림부터 가게 하려면 알림에서 Team B를 `{{#is_renotify}}` 및 `{{/is_renotify}`로 감쌉니다. [조건 변수][3]를 사용해 모니터 속성에 기반한 알림 메시지의 특징을 조정할 수 있습니다.

{{< img src="synthetics/guide/synthetics_test_monitors/renotification_toggle.png" alt="알림 모니터가 재알림을 할 시간 선택" style="width:90%;">}}

알림 모니터에서 재알림을 사용하려면 `If this monitor stays in alert status renotify every` 옆에 있는 버튼을 클릭해 토글하고 드롭다운 메뉴에서 시간 옵션을 선택하세요.

## Statuspage로 신서틱 테스트 모니터 통합하기

[Atlassian Statuspage][6]을 사용해 내 애플리케이션과 서비스의 작동 시간을 가시화하고 있는 경우 신서틱 테스트 모니터 알림으로 시스템 상태를 업데이트할 수 있습니다.

{{< img src="synthetics/guide/synthetics_test_monitors/statuspage_monitor_setup.png" alt="신서틱 테스트의 모니터 이름에 Statuspage 이메일 주소와 상태 추가" style="width:95%;">}}

1. 구성 요소별 이메일 주소를 생성하려면 [Statuspage 설명서][7]를 참고하세요.
2. 생성한 이메일 주소를 테스트 알림 메시지에 추가하세요(예: `@custom-statuspage-email@notifications.statuspage.io`).
3. 모니터 이름을 사용자 지정해 테스트 상태에 따라 `UP` 또는 `DOWN`을 반환하도록 합니다(예: `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`).
4. 모니터 알림 섹션을 작성하고 모니터 이름에 요약을 추가하세요(예: `Shopist Checkout Functionality`).
5. 모니터 구성을 완료했다면 **Save & Exit**을 클릭하세요.

자세한 정보는 [Statuspage와 모니터 통합][8]을 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types/metric/
[2]: /ko/monitors/manage/
[3]: /ko/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: /ko/monitors/notify/#integrations/
[5]: /ko/monitors/notify/#renotify
[6]: https://support.atlassian.com/statuspage/
[7]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[8]: /ko/monitors/guide/integrate-monitors-with-statuspage/