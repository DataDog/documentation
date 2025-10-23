---
further_reading:
- link: /metrics/custom_metrics/
  tag: 문서
  text: 커스텀 메트릭
- link: /metrics/guide/custom_metrics_governance/
  tag: 문서
  text: 사용자 지정 메트릭 거버넌스 모범 사례
private: true
title: 속도 제한 메트릭에서 생성된 이벤트
---

## 개요

특정 키에 고유 태그 값을 포함하는 메트릭을 Datadog에 많이 제출하면 높은 [카디널리티][1]가 발생할 수 있습니다. 이는 대부분 태그를 제한하지 않아 발생합니다.

무제한이거나 높은 카디널리티 태그는 계정 성능과 안정성에 영향을 미칠 수 있습니다. Datadog은 계정을 보호하기 위해 메트릭 증가를 모니터링하며, 이와 같은 제출 작업 때문에 속도 제한이 발생할 때 알림을 보냅니다.

이 가이드에서는 다음 내용을 다룹니다.
- 속도 제한 이벤트
- 속도 제한 이벤트 모니터링 및 속도 제한 메트릭 식별
- 무제한 태그 관리 및 메트릭 속도 제한 해제


## Datadog 속도 제한 이벤트

{{< img src="/metrics/guide/rate_limit/rate_limit_events.png" alt="세부 정보 사이드 패널에 예제 이벤트가 있는 Events Explorer의 속도 제한 이벤트" style="width:100%;" >}}

Datadog이 카디널리티 증가를 감지하면 속도 제한이 적용되기 전에 경고 [이벤트][2]가 생성됩니다. 메트릭 카디널리티가 계속 증가하면 속도 제한이 적용될 수 있습니다. 메트릭에 속도 제한이 적용된 경우, 속도 제한이 적용되었음을 알리는 두 번째 이벤트가 생성됩니다. [Event Explorer][3]에서 해당 이벤트를 확인할 수 있습니다.

<div class="alert alert-danger">Datadog은 이후의 모든 속도 제한 이벤트에 관한 알림을 전송하지 않습니다. 메트릭의 속도 제한이 발생할 때 경고을 전송하는 Event Monitor를 구축하는 것이 가장 좋습니다.</div>

## 속도 제한 이벤트 모니터링

모든 속도 제한 이벤트에 관한 알림을 보내도록 [Event Monitor][3]를 구성할 수 있습니다.

1. 쿼리를 다음과 같이 정의합니다.
   ```
   tags:metric-rate-limit source:datadog
   ```
1. 알림 임계값을 `above or equal to 1`로 설정합니다.
1. 모니터 메시지에서 모니터가 트리거될 때 수신자에게 알림을 보내도록 구성합니다.

{{< img src="/metrics/guide/rate_limit/event_monitor_config.png" alt="속도 제한 이벤트에 대한 이벤트 모니터 구성" style="width:90%;" >}}

## 무제한 태그 관리하기

속도 제한을 해제하려면 이벤트에 표시되는 무제한 태그를 검토해야 합니다. 먼저 이벤트에 보고된 모든 태그 값이 필요한지 확인합니다. 다음으로, 의미있는 인사이트를 제공하는 태그만 사용하도록 메트릭 제출을 조정합니다.

자세한 내용은 [사용자 지정 메트릭 거버넌스 모범 사례][4] 가이드를 참고하세요.

## 속도 제한 해제 요청 제출하기

<div class="alert alert-danger">Datadog Admin만 메트릭 속도 제한 해제를 요청할 수 있습니다. Admin이 아니라면 지원 티켓에 Admin을 포함하여 요청을 확인하도록 합니다.</div>

무제한 태그를 제거하는 변경 작업 후 [Datadog Support][5]에 요청하여 속도 제한을 해제합니다. 요청 시 다음 정보를 포함하세요.
- 속도 제한 메트릭 이름
- Event Platform에서 속도 제한 이벤트로 연결되는 링크
- 구성 변경으로 무제한 태그 제거가 되었음을 확인


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/billing/custom_metrics/?tab=countrate#effect-of-adding-tags
[2]: https://docs.datadoghq.com/ko/service_management/events/
[3]: https://docs.datadoghq.com/ko/monitors/types/event/
[4]: https://docs.datadoghq.com/ko/metrics/guide/custom_metrics_governance/
[5]: https://docs.datadoghq.com/ko/help/