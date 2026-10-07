---
aliases: null
description: SLO 목록 표시
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: 블로그
  text: Datadog에서 모든 SLO의 상태 추적
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: SLO 목록 위젯
widget_type: slo_list
---

서비스 수준 목표(SLO)는 각 활동( 기능/함수, 프로세스 )에 대해 달성해야 하는 합의된 목표로 고객 성공을 위한 최상의 기회를 제공합니다. SLO는 서비스 상태나 성능을 대표합니다.

SLO 목록 위젯은 기본 시간 동안 SLO 하위 집합을 표시합니다. 설정된 다른 모든 시간(기간)은 SLO의 사이드 패널에서 사용할 수 있습니다. 자세한 설명은 [SLO][1] 설명서를 참조하세요.

{{< img src="dashboards/widgets/slo_list/slo-list-widget-latest.png" alt="SLO 목록을 표시하는 SLO 목록 위젯" style="width:90%;" >}}

## 설정

{{< img src="dashboards/widgets/slo_list/slo-list-widget-editor-latest.png" alt="SLO 목록 위젯 편집기의 웹 스토어형 서비스로 정의되는 검색 쿼리" style="width:90%;" >}}

### 구성

1. 대시보드에 SLO 목록 위젯을 추가합니다.
2. 태그를 사용하여 SLO 목록을 필터링합니다(예: `service:foo, env:prod`). 템플릿 변수가 지원됩니다.
3. 표시할 최대 수의 SLO를 선택합니다(기본값은 100). 그런 다음 상태나 오류 예산별로 정렬합니다.
4. (선택 사항) 위젯에 타이틀을 지정합니다.

위젯을 만들 준비가 되면 **Save**를 클릭합니다.

## API

이 위젯은 **[대시보드 API][2]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][3]에 대한 다음 표를 참조하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/service_level_objectives/
[2]: /ko/api/latest/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/