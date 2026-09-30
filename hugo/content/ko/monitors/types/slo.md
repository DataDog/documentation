---
aliases:
- /ko/monitors/create/types/slo/
further_reading:
- link: /service_management/service_level_objectives/burn_rate
  tag: 설명서
  text: 버닝 속도 경고
- link: /service_management/service_level_objectives/error_budget
  tag: 설명서
  text: 예산 알림 오류
title: SLO 알림
---

<div class="alert alert-info">
본 모니터링은 메트릭 기반 SLOs, Time Slice SLOs, 메트릭 모니터링 유형(메트릭, 통합, APM 메트릭, 이상, 예측, 또는 이상값 모니터)으로 구성된  모니터 기반 SLOs에서 사용할 수 있습니다.
</div>

## 개요

[서비스 수준 목표(Service Level Objectives)][1] 또는 SLO는 사이트 안정성 엔지니어링 툴킷의 핵심이며, 애플리케이션 성능에 대해 명확한 목표를 정의할 수 있는 프레임 워크를 제공합니다. 이를 통해 각 팀이 일관된 고객 경험을 제공하고 기능 개발과 플랫폼 안정성의 균형을 유지하며 내부 및 외부 사용자와의 커뮤니케이션을 개선할 수 있도록 합니다. 

## 모니터링 생성

Datadog에서 [SLO 알림][2]을 설정하려면 메인 내비게이션을 통해 *Monitors --> New Monitor --> SLO*로 이동합니다.

### SLO 선택

[Service Level Objective][1]를 선택합니다.

### 경고 조건 설정

다음 두 가지 알림 유형을 사용할 수 있습니다.

[오류 예산 알림][3]은 SLO의 오류 예산이 특정 비율 이상 소진되면 알림을 보냅니다.

[경비 지출 알림][4]은 SLO 오류 예산의 소진률이 지정된 임계값을 초과하고 일정 기간 동안 지속될 때 알림을 보냅니다.

### 알림

**Configure notifications and automations** 섹션과 관련한 자세한 지침은 [알림][5] 페이지를 참조하세요.

모든 모니터링 유형에서 사용할 수 있는 [표준 템플릿 변수][6] 외에 SLO 알림은 다음 변수를 지원합니다. 

| 변수   | 설명   |
| ---------- | ------------- |
| `{{timeframe}}` | SLO 시간대(7일, 30일, 90일)입니다. |
| `{{value}}` | 소진된 오류 예산의 비율입니다(오류 예산 알림만 해당). |
| `{{short_window_burn_rate}}` | 짧은 기간에 관측된 경비 지출 값입니다(경비 지출 알림에만 해당). |
| `{{long_window_burn_rate}}` | 장기간 동안 관측된 경비 지출 값입니다(경비 지출 알림에만 해당). |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/service_level_objectives/
[2]: https://app.datadoghq.com/monitors/create/slo
[3]: /ko/service_management/service_level_objectives/error_budget/
[4]: /ko/service_management/service_level_objectives/burn_rate/
[5]: /ko/monitors/notify/#overview
[6]: /ko/monitors/notify/variables/?tab=is_alert#template-variables