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
title: SLO 요약 위젯
---

## 구성

SLO 요약 위젯을 사용하여 대시보드에서 [서비스 수준 목표(SLO)][1]를 시각화합니다.

{{< img src="dashboards/widgets/slo/slo_summary_editor.png" alt="SLO 요약 위젯"  >}}

### 설정

1. 대시보드 페이지에서 SLO 요약 위젯을 추가합니다.
2. 드롭다운 메뉴에서 SLO를 선택합니다.
3. 최대 3개의 서로 다른 타임윈도우를 선택합니다.

**참고:** `Global Time`을(를) 사용하면 지난 90일 내의 임의 기간에 속하는 SLO의 상태 및 오류 예산을 표시할 수 있습니다. 또한 임의의 기간에서 부수적인 고유 SLO 목표를 지정할 수 있습니다. 오류 예산을 표시하고 SLO 상태 값을 녹색 또는 빨간색으로 색상 코드화할 수 있으려면 SLO 목표를 지정해야 합니다. SLO 목표가 지정되지 않은 경우 SLO 상태만 표시되고 글꼴 색상은 회색으로 유지됩니다.

### 옵션

#### 디스플레이 기본 설정

`Show error budget` 옵션을 전환하여 남은 오류 예산을 표시할지 여부를 선택합니다. 여러 그룹 또는 여러 모니터로 모니터 기반 SLO를 시각화하는 경우 `View mode`을(를) 선택합니다.

- 여러 그룹으로 나누어진 단일 모니터로 설정된 모니터 기반 SLO의 경우 다음 세 가지 보기 모드가 있습니다.
  - `Status`: 전체 SLO 상태 비율 및 목표를 표시합니다.
  - `Groups`: 각 그룹의 상태 백분율 표를 표시합니다.
  - `Both`: 전체 SLO 상태 비율 및 목표와 각 그룹의 상태 비율 표를 모두 표시합니다.

- 여러 모니터로 설정된 모니터 기반 SLO의 경우 다음 세 가지 보기 모드가 있습니다.
  - `Status`: 전체 SLO 상태 비율 및 목표를 표시합니다.
  - `Monitors`: 각 모니터의 상태 백분율 표를 표시합니다.
  - `Both`: 각 모니터의 전체 SLO 상태 비율 및 목표와 상태 비율 표를 모두 표시합니다.

**참고:** `Global Time` 타윈도우 옵션을 선택하면 `Status` 보기 모드만 사용할 수 있습니다.

{{< img src="dashboards/widgets/slo/slo_summary-view_mode.png" alt="보기 모드"  >}}

#### 타이틀

`Show a title` 확인란을 선택하여 위젯의 커스텀 타이틀을 표시하세요.

{{< img src="dashboards/widgets/slo/slo_summary-show_title.png" alt="위젯 타이틀"  >}}

선택적으로 타이틀의 크기와 정렬을 정의할 수 있습니다.

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 자세한 내용은 [대시보드 API 가이드][2]를 참조하세요.

SLO 요약 위젯의 전용 [위젯 JSON 스키마 정의][3]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/service_level_objectives/
[2]: /ko/api/v1/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/