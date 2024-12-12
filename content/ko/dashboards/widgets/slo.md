---
aliases:
- /ko/monitors/monitor_uptime_widget/
- /ko/monitors/slo_widget/
- /ko/graphing/widgets/slo/
- /ko/dashboards/faq/how-can-i-graph-host-uptime-percentage/
description: SLO 추적
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: 블로그
  text: Datadog에서 모든 SLO의 상태 추적
- link: /dashboards/guide/slo_graph_query
  tag: 설명서
  text: 메트릭 기반 SLO 쿼리 범위 지정
title: SLO 위젯
widget_type: slo
---

SLO(서비스 수준 개체)는 고객이 성공할 수 있는 최적의 환경을 제공하기 위해 각 활동, 기능, 프로세스별로 달성해야 한다고 합의된 목표입니다. SLO는 서비스의 성과 또는 상태를 표현합니다. SLO 위젯에서 상태, 예산, 기존 SLO 잔여 오류 예산 등을 가시화하여 확인할 수 있습니다. SLO 기본 그룹을 모두 표시하고 위젯 내에서 원하는 시간대로 정렬할 수 있습니다. 이 위젯을 사용해 가장 중요한 SLO 정보로 유용한 대시보드를 만들 수 있습니다.
- **위젯에서 바로 모든 SLO 그룹 확인**: 위젯에서 SLO 그룹과 관련된 핵심 정보를 제공하기 때문에 여러 그룹을 포함하고 있는 SLO의 경우 매우 유용합니다.
- **위젯에서 원하는 순서로 SLO 그룹 정렬 설정**: 모든 SLO 유형에 위젯에서 사용할 수 있는 시간대를 사용해 그룹을 정렬할 수 있습니다. 여러 시간대에서 최고 또는 최저 성능을 보이는 SLO를 파악할 수 있습니다.
- **SLO에 누락된 데이터로 시간대 파악**: 모든 SLO 유형은 SLO 위젯에서 "-"와 같이 누락된 데이터에 시간대를 보여줍니다. 전체 시간대에서 데이터가 누락된 경우 "-"가 나타납니다.

## 설정

SLO 위젯을 사용해 대시보드에서 [서비스 수준 개체(SLO)][1]를 시각화할 수 있습니다.

{{< img src="/dashboards/widgets/slo/slo-summary-widget-new.png" alt="메트릭 기반 SLO 요약 위젯 그래프 편집기" >}}

### 구성

1. 드롭다운 메뉴에서 SLO를 선택합니다.
2. **메트릭 기반 및 시간 슬라이스 SLO**: 쿼리를 필터링하고 [템플릿 변수][2]를 활용해 결과를 역동적으로 범위 지정할 수 있습니다.
    - *filter by* 필드를 이용해 위젯에 표시되는 SLO 상태의 범위를 지정하여 템플릿 변수의 장점을 활용해 보세요. 예를 들어 `filter by $env`를 선택하면 대시보드의 변수로 SLO 쿼리 선택 값을 *env* 템플릿으로 범위 지정할 수 있습니다.
    - 원본 SLO 구성에 태그가 포함되어 있지 않은 경우에도 SLO 메트릭 쿼리에 범위와 컨텍스트를 추가로 지정할 수 있습니다. 예"를 들어 원본 SLO 쿼리가 `sum:trace.flask.request.hits{*} by {resource_name}.as_count()`이고, 위젯에서 `env:prod`로 필터링하면 `prod` 환경으로만 데이터 범위가 지정됩니다.
3. 최대 3개 시간대를 설정할 수 있습니다.
4. 선호하는 디스플레이를 선택합니다.

### 옵션

#### 시간대 설정

다음 중에서 최대 3개 시간대를 선택할 수 있습니다.
- **롤링 시간대**: 7, 30, 또는 90일
- **달력 시간대**: 이번 주, 저번 주, 이번 달, 또는 저번 달
- **글로벌 시간**: 이 옵션을 이용하면 SLO 상태와 오류 예산을 임의 시간대로 표시할 수 있습니다. 모니터 기반 SLO의 최대 3개월 내역 정보를 볼 수 있습니다. 시간 슬라이스 및 메트릭 기반 SLO의 경우 지원되는 내역 보기가 계정의 메트릭 보유 기간과 일치합니다(기본값은 15개월).

**참고:** 오류 예산을 표시하고 `Global time` SLO 상태를 초록색 또는 빨간색의 색상 코드로 표시하려면 SLO 목표를 지정해야 합니다. SLO 입력 목표를 지정하지 않으면 SLO 상태만 나타나고 폰트 색상이 회색으로 표시됩니다.

#### 표시 기본 설정

`Show error budget` 옵션을 토글하여 나머지 오류 예산을 표시하거나 숨길 수 있습니다.

그룹 또는 모니터가 여럿인 모니터 기반 SLO를 가시화하는 경우 `View mode`를 선택합니다.

- 그룹이 있는 SLO(메트릭 기반 또는 그룹이 있는 시간 슬라이드 SLO, 또는 그룹별로 표시된 단일 모니터의 모니터 기반 SLO)의 경우, 다음 3가지 보기 모드를 선택할 수 있습니다.
  - `Overall`: 전체 SLO 상태 비율과 목표를 표시합니다.
  - `Groups`: 각 그룹의 상태 백분율 표를 표시합니다.
  - `Both`: 전체 SLO 상태 비율 및 목표와 각 그룹의 상태 비율 표를 모두 표시합니다.

- 여러 모니터로 설정된 모니터 기반 SLO의 경우 다음 세 가지 보기 모드가 있습니다.
  - `Overall`: 전체 SLO 상태 비율과 목표를 표시합니다.
  - `Monitors`: 각 모니터의 상태 백분율 표를 표시합니다.
  - `Both`: 각 모니터의 전체 SLO 상태 비율 및 목표와 상태 비율 표를 모두 표시합니다.

`View mode`를 `Groups`, `Monitors`, 또는 `Both`로 선택할 경우:
- 기본적으로 시간대가 적은 것부터 오름차순으로 그룹이 정렬됩니다. 대시보드를 위젯에 추가한 후에는 위젯 UI를 통해 구성된 시간대별로 상태를 정렬할 수 있습니다.
- 위젯에는 다음 내용이 표시됩니다.
  + 메트릭 기반 및 시간 슬라이스 SLO의 경우, SLO의 *모든* 기본 그룹이 표시됩니다.
  + 모니터가 여러 개인 모니터 기반 SLO의 경우, SLO에 있는 모든 기본 모니터가 표시됩니다.
  + 그룹이 있는 단일 모니터 기반 SLO의 경우, SLO에서 선택된 지정 그룹이 최대 20개까지 표시됩니다. SLO에서 그룹을 선택하지 않은 경우에는 SLO의 *모든* 기본 그룹이 표시됩니다.

**참고:** 그룹이 있는 모니터 기반 SLO의 경우, 최대 5,000개 그룹을 포함하고 있는 SLO를 모두 표시할 수 있습니다. SLO에 포함되어 있는 그룹이 5,000개 그룹 이상인 경우, 계산에는 모든 그룹이 포함되지만 UI에는 표시되지 않습니다.

## API

해당 위젯은 **[대시보드 API][3]**와 함께 사용할 수 있습니다.  [위젯 JSON 스키마 정의][4]에 대해서는 다음 표를 참고하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/service_level_objectives/
[2]: /ko/dashboards/template_variables/
[3]: /ko/api/latest/dashboards/
[4]: /ko/dashboards/graphing_json/widget_json/