---
disable_toc: false
further_reading:
- link: https://app.datadoghq.com/monitors/quality
  tag: App
  text: Datadog Monitor Quality
- link: /monitors/
  tag: 설명서
  text: Datadog 모니터에 대해 알아보기
title: 모니터 품질
---

## 개요

Datadog의 Monitor Quality 기능은 모니터링 설정에서 흔히 발생하는 구성 오류(예: 60일 이상 음소거된 경고나 지정된 수신자가 없는 모니터)를 식별합니다. 이를 통해 팀은 경고 기준을 유지하고 중요한 경고가 누락되는 것을 방지할 수 있습니다. Monitor Quality를 사용하면 잘못 구성된 모든 모니터를 한 번에 식별하고 해결할 수 있습니다.

## 잘못 구성된 모니터 확인하기

[**Manage Monitors**][8] 페이지에서 [**Monitor Quality**][7] 탭을 클릭하면 개선이 필요한 모니터 목록에 액세스할 수 있습니다. 첫 번째 모니터 생성 시 이 기능은 자동으로 활성화됩니다.

팀, 작성자, 서비스, 환경을 기준으로 [Monitor Quality 페이지][7]를 필터링하고 확인하여 목록을 정리 및 관리할 수 있습니다.

{{< img src="monitors/quality/filter_monitor_quality.png" alt="Monitor Quality 페이지에서 작성자, 팀, 서비스 , 환경별로 필터링할 수 있습니다." style="width:100%;" >}}

## 모니터 개선 및 모범 사례 적용

Monitor Quality는 다음과 같은 품질 문제가 있는 모니터를 표시합니다.
- [60일 이상 음소거됨](#muted-for-over-60-days)
- [수신자 누락](#monitors-are-missing-recipients)
- [지연 시간 없음](#missing-a-delay)
- [잘못 구성된 알림 채널](#misconfigured-notification-channels)
- [복합 모니터에 구성 요소가 없음](#composite-monitors-are-missing-constituents)
- [경고 상태 지속](#stuck-in-alert-state)

### 60일 이상 음소거됨

[Downtimes][1]는 예정된 유지보수, 계획된 장애, 시스템 종료 중 경고를 끄거나, 주말 및 야간 동안 경고를 중지하는 데 유용합니다. 그러나 장시간(60일 이상) 음소거되거나 부분적으로 음소거된 모니터는 간과된 것일 수 있습니다. 이러한 모니터의 음소거를 해제하여 경고를 다시 시작하고 포괄적인 모니터링 범위를 확보할 수 있습니다.

다운타임 오류로 인해 경고가 표시되지 않는 모니터를 확인하고 음소거를 해제합니다.

### 수신자가 없는 모니터

모니터가 경고나 알림을 발생시키면 해당 경고가 문제를 해결하고 조치를 취할 수 있는 팀이나 담당자에게 전달되도록 해야 합니다. [모니터 알림][2]에 수신자가 추가되지 않으면 서비스에 대한 사전 대응 능력이 저하됩니다. 수신자 없이 구성된 모니터를 확인하려면 Monitor Quality 페이지를 사용하세요.

### 지연 시간 없음

AWS, Azure, Google Cloud와 같은 클라우드 통합에서 생성된 데이터는 크롤러를 통해 해당 API에서 가져옵니다. 이러한 메트릭은 지연되어 도착하며, 이를 모니터 구성 시 고려해야 합니다. [평가 지연][3]이 없는 클라우드 데이터 모니터는 오탐지 경고를 발생시킬 수 있습니다.

권장 지연 시간 없이 클라우드 데이터를 크롤링하고 있는 모든 모니터를 확인할 수 있습니다. 크롤링된 데이터에 대한 자세한 내용은 [Cloud Metric Delay][4] 페이지를 참고하세요.

### 잘못 구성된 알림 채널

[`@notifications`][5]를 사용하면 통합, 워크플로, Datadog 케이스에 경고가 전달되도록 모니터를 맞춤 설정할 수 있습니다. `@notifications`가 잘못 구성된 경우 예정된 경고가 적절한 채널로 전송되지 않습니다.

어떤 모니터에 알림 채널이 잘못 구성되어 있는지 확인하고 필요에 따라 수정합니다.

### 복합 모니터에 구성 요소가 없음

[복합 모니터][6]는 사용자 정의 로직에 따라 여러 하위 모니터(구성 요소)의 결합된 상태를 평가합니다. 삭제된 구성 요소를 참조하는 복합 모니터는 평가되지 않으며 알림도 전송되지 않습니다. 비활성 복합 모니터를 식별하고 삭제하세요.

### 경고 상태 지속

`ALERT` 상태인 모니터는 서비스에 문제가 발생하여 주의가 필요하다는 것을 나타냅니다. 여러 대의 모니터가 지속적으로 `ALERT` 상태를 유지하면 실제로 주의가 필요한 문제에 집중할 수 없습니다. 이러한 모니터가 계속 경고 상태인 이유를 파악하고 그에 따라 구성을 수정해야 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/downtimes/
[2]: /ko/monitors/notify/
[3]: /ko/monitors/configuration/?tab=thresholdalert#evaluation-delay
[4]: /ko/integrations/guide/cloud-metric-delay/
[5]: /ko/monitors/notify/#notifications
[6]: /ko/monitors/types/composite/
[7]: https://app.datadoghq.com/monitors/quality
[8]: https://app.datadoghq.com/monitors/manage