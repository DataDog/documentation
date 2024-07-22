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
---

SLO 목록 위젯은 쿼리를 기반으로 [SLO][1]의 하위 집합을 표시합니다.

{{< img src="dashboards/widgets/slo_list/slo_list_widget.png" alt="SLO 목록을 표시하는 SLO 목록 위젯" style="width:90%;" >}}

## 설정

{{< img src="dashboards/widgets/slo_list/slo_list_editor.png" alt="SLO 목록 위젯 편집기에서 웹 스토어로 서비스를 정의하는 검색 쿼리" style="width:90%;" >}}

### 설정

1. 대시보드에 SLO 목록 위젯을 추가합니다.
2. 태그를 사용하여 SLO 목록을 필터링합니다(예: `service:foo, env:prod`). 템플릿 변수가 지원됩니다.
3. 표시할 최대 SLO 수를 선택합니다(기본값은 100). 가장 최근에 생성된 SLO가 목록 상단에 나타납니다.
4. (선택 사항) 위젯에 타이틀을 지정합니다.

위젯을 만들 준비가 되면 **Save**를 클릭합니다.

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 자세한 내용은 [대시보드 API 가이드][2]를 참조하세요.

SLO 목록 위젯의 전용 [위젯 JSON 스키마 정의][3]는 다음과 같습니다.

{{< dashboards-widgets-api >}}



{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/service_level_objectives/
[2]: /ko/api/v1/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/