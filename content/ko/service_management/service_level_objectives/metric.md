---
aliases:
- /ko/monitors/service_level_objectives/event/
- /ko/monitors/service_level_objectives/metric/
description: 서비스 수준 목표 정의를 위한 메트릭 사용
further_reading:
- link: /metrics/
  tag: 설명서
  text: 메트릭에 대한 자세한 정보
- link: /service_management/service_level_objectives/
  tag: 설명서
  text: SLO 개요, 설정, 계산
title: 메트릭 기반 SLO
---

## 개요

메트릭 기반 SLO는 좋은 이벤트와 나쁜 이벤트를 구분해야 하는 개수 기반 데이터 스트림에 유용합니다. 메트릭 쿼리는 좋은 이벤트의 총계를 시간에 따른 총 이벤트 합계로 나누는 데 사용해 서비스 수준 지표(SLI)를 계산합니다. 모든 메트릭을 사용해 SLO를 생성할 수 있습니다. 여기에는 [APM 스팬][1], [RUM 이벤트][2] 및 [로그][3]에서 생성된 커스텀 로그가 포함됩니다. SLO가 설정되고 계산된 방법에 대한 개요를 보려면 [서비스 수준 목표][4] 페이지를 참조하세요.

{{< img src="service_management/service_level_objectives/metric_slo_side_panel.png" alt="메트릭 기반 SLP 예시" >}}

## 설정

[SLO 상태 페이지][5]에서 **+ 새 SLO**를 클릭합니다. 그런 다음 [**개수별**][6]을 선택합니다.

### 쿼리 정의

1. 정의할 쿼리가 2개 있습니다. 분자 쿼리는 좋은 이벤트의 총계을 정의하고 분모 쿼리는 전체 이벤트의 총계를 정의합니다. 쿼리는 개수, 비율 또는 백분위수 사용 분포 메트릭를 사용하여 SLO 계산이 올바르게 작동하도록 합니다. 자세한 내용은 [쿼리][9] 설명서를 참조하세요. 
1. 태그를 통해 `FROM` 필드를 사용하여 특정 그룹을 포함하거나 제외하세요.
1. 백분위수를 활성화한 분포 메트릭의 경우 `count values...` 어그리게이터(aggregator) 을 사용하여 계산할 메트릭에 대한 숫자 임계값을 지정해야 합니다. 이 기능을 임계값 쿼리라고 하며 숫자 임계값과 일치하는 원시 값의 수를 계산하여 분자와 분모에 대한 개수를 생성할 수 있습니다. 자세한 내용은 [임계값 쿼리 ][7]를 참조하세요.
1. 선택적으로 백분위수를 활성화하는 경우 분포 메트릭 , `count values..` 어그리게이터 바로 오른쪽에 있는 드롭다운을 사용하여 특정 그룹별로 SLI를 구분할 수 있습니다.
1. 선택적으로 개수 또는 요금 메트릭, `sum by` 어그리게이터를 사용하여 특정 그룹별로 SLI를 구분할 수 있습니다.

**예:** HTTP 반환 코드를 추적하고 메트릭에 `code:2xx OR code:3xx OR code:4xx`와 같은 태그가 포함된 경우. 좋은 이벤트의 총계는 `sum:httpservice.hits{code:2xx} + sum:httpservice.hits{code:4xx}`입니다.  `total` 이벤트는 `sum:httpservice.hits{!code:3xx}`가 됩니다.

`HTTP 3xx`가 제외되는 이유는 무엇인가요? 이는 일반적으로 리디렉션이며 SLI에 포함되거나 포함되지 않아야 하지만 3xx 기반이 아닌 다른 오류 코드는 포함해야 합니다. `total`의 경우 `HTTP 3xx`을 제외한 모든 유형이 필요하고 `numerator`의 경우 `OK` 유형 상태 코드만 필요합니다.

#### 메트릭 기반 SLI용 멀티 그룹

메트릭 기반 SLI를 사용하면 SLI의 가장 중요한 속성에 집중할 수 있습니다. 편집기에서 `datacenter`, `env`, `availability-zone`, `resource`와 같은 태그 또는 기타 관련 그룹을 사용하여 메트릭 기반 SLI에 그룹을 추가할 수 있습니다:

{{< img src="service_management/service_level_objectives/metric_slo_creation.png" alt="그룹화된 메트릭 기반 SLO 편집기" >}}

이러한 SLI를 그룹화하여 각 개별 그룹의 상태, 정상 요청 개수, 남은 오류 예산을 세부 정보 패널에서 시각화할 수 있습니다.

{{< img src="service_management/service_level_objectives/metric_slo_history_groups.png" alt="메트릭 기반 SLO 그룹 결과" >}}

기본적으로 막대 그래프에는 전체 SLO에 대한 좋은 요청과 나쁜 요청의 전체 개수가 표시됩니다. 표에서 해당 행을 클릭하면 개별 그룹별로 좋은 요청과 나쁜 요청 개수로 범위가 지정된 막대 그래프를 확인할 수 있습니다. 또한 막대 그래프 바로 아래에 있는 범례에서 적절한 옵션을 선택하여 좋은 요청 개수 또는 나쁜 요청 개수를 표시하거나 숨길 수도 있습니다. 

### SLO 목표 설정

SLO 목표는 목표 백분율과 기간으로 구성됩니다. 메트릭 기반 SLO의 목표를 설정할 때 목표 백분율은 SLO의 분모에 지정된 전체 이벤트 중 어느 부분이 좋은 이벤트인지 나타내고, 기간은 목표가 추적되어야 하는 기간을 지정합니다. 

예: `99% of requests should be error-free over the past 7 days`.

SLO가 목표 비율을 초과하는 동안에는 SLO 상태가 녹색 글꼴로 표시됩니다. 목표 비율을 위반하면 SLO의 상태가 빨간색 글꼴로 표시됩니다. 또는, 선택적으로 목표 비율보다 큰 경고 비율을 포함하여, SLO 위반에 가까워졌을 때 알림을 받을 수 있습니다. 경고 비율을 위반했지만 목표 비율은 위반하지 않은 경우 SLO 상태는 노란색 글꼴로 표시됩니다.

**참고: 메트릭 기반 SLO 목표에는 소수점 이하 세 자리까지 허용됩니다. SLO의 세부정보 UI에 표시되는 정밀도는 최대 `num_target_decimal_places + 1 = 4 decimal places`입니다. 표시되는 정확한 정밀도는 분모 쿼리 값의 크기에 따라 달라집니다. 분모의 크기가 클수록 소수점 이하 네 자리까지 표시할 수 있는 정밀도가 높아집니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/tracing/generate_metrics/
[2]: https://docs.datadoghq.com/ko/real_user_monitoring/platform/generate_metrics
[3]: https://docs.datadoghq.com/ko/logs/log_configuration/logs_to_metrics/#overview
[4]: /ko/service_management/service_level_objectives
[5]: https://app.datadoghq.com/slo
[6]: https://app.datadoghq.com/slo/new/metric
[7]: /ko/metrics/distributions/#threshold-queries
[8]: /ko/service_management/service_level_objectives/monitor/
[9]: https://docs.datadoghq.com/ko/dashboards/querying/#advanced-graphing