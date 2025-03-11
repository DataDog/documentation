---
description: Atlassian Statuspage를 사용해 Datadog 모니터를 통합하는 방법을 알아보세요.
further_reading:
- link: /integrations/statuspage
  tag: 설명서
  text: Statuspage 통합에 대해 자세히 알아보기
- link: /synthetics/guide/synthetic-test-monitors/
  tag: 설명서
  text: Synthetic 테스트 모니터에 대해 알아보기
title: Statuspage를 사용해 모니터 통합하기
---

## 개요

[Atlassian Statuspage][1]는 상태 및 인시던트 관리 도구로 애플리케이션 및 서비스 업타임에 대한 가시성을 제공합니다. 상태 페이지는 Datadog의 커스텀 메트릭과 이벤트를 표시할 수 있으며 Datadog 모니터 알림을 통해 시스템 상태를 업데이트할 수도 있습니다.

## Datadog 이벤트로 Statuspage 알림 추가

[Statuspage 통합][2]을 설정해 [이벤트 탐색기][3]에서 Statuspage 알림을 추적할 수 있습니다.

1. [통합][4] 페이지로 이동하여 통합 목록에서 `statuspage`를 검색합니다.
2. StatusPage 통합 타일을 선택한 다음 **새 항목 추가**를 클릭합니다.
3. 예를 들어, `https://status.datadoghq.com` 또는 `https://datadogintegrations.statuspage.io/`나 `datadog`, `test` 및 `test1` 태그 등 모니터링하려는 상태 URL과 커스텀 태그를 추가합니다. 페이지당 최소 하나의 커스텀 태그를 포함해야 합니다.
3. **저장** 아이콘을 클릭합니다.

5분 후 [이벤트 탐색기][5]에 표시된 Statuspage에서 모니터 알림을 참조할 수 있습니다. 오른쪽 상단에서 [타임프레임][6]을 설정하고 **코어(Core)** 아래의 소스 목록에서 **Statuspage**를 선택합니다.

{{< img src="monitors/guide/statuspage_integration_configuration.png" alt="Datadog에서 Statuspage 통합 설정" style="width:90%;" >}}

알림을 클릭하여 이벤트의 메시지, 태그 및 속성을 포함하는 측면 패널을 표시합니다.

{{< img src="monitors/guide/statuspage_side_panel.png" alt="이벤트 소스, 메시지, 태그 및 속성을 포함하는 이벤트 측면 패널" style="width:90%;" >}}

## Datadog 모니터에서 Statuspage 알림 추가

### Statuspage 이메일 주소 생성

구성 요소별 이메일 주소를 생성하려면 [Statuspage 설명서][7]를 참조하세요.

### 메트릭 모니터 생성

Statuspage 알림을 트리거하는 [메트릭 모니터][8]을 생성하는 방법:

1. [**모니터** > **새 모니터**][9]로 이동한 다음 **메트릭**을 클릭합니다.
2. [메트릭 모니터 설명서][8]를 참조해 탐지 방법을 선택하고, 메트릭을 정의하고, 알림 조건과 고급 모니터 옵션을 설정하세요.
3. 모니터 이름을 커스터마이즈하여 테스트 상태에 따라 `UP` 또는 `DOWN`을 반환하도록 합니다. 예: `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`
4. **팀에 알리기** 섹션에서 메시지의 `@custom-statuspage-email@notifications.statuspage.io` 등 생성된 이메일 주소를 추가합니다. 이를 통해 자동으로 **재알림** 위에 있는 `Notify your services and your team members` 필드를 채울 수 있습니다.
5. 모니터 알림 섹션을 작성하고 `Shopist Checkout Functionality` 등 모니터 이름에 요약을 추가합니다.
6. 모니터 재알림 조건을 설정하고 `service:status-page` 등 태그를 추가하세요.
7. 팀을 선택하고 모니터에 우선순위를 할당하세요.
8. 모니터의 편집 권한과 알림 조건을 정의하세요.
9. 모니터를 설정하면 **생성**을 클릭합니다.

{{< img src="monitors/guide/statuspage_alerts_metric_monitor.png" alt="Statuspage에서 알림을 포함하는 메트릭 모니터 생성" style="width:90%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.atlassian.com/software/statuspage
[2]: /ko/integrations/statuspage
[3]: /ko/service_management/events/explorer/
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/event/explorer
[6]: /ko/dashboards/guide/custom_time_frames/
[7]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[8]: /ko/monitors/types/metric/
[9]: https://app.datadoghq.com/monitors/create/metric