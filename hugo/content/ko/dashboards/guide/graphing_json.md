---
aliases:
- /ko/graphingjson/
- /ko/graphing/miscellaneous/graphingjson
- /ko/graphing/graphing_json/
- /ko/dashboards/graphing_json/
- /ko/dashboards/graphing_json/request_json/
- /ko/dashboards/graphing_json/widget_json/
further_reading:
- link: https://docs.datadoghq.com/api/latest/dashboards/
  tag: API
  text: 대시보드 API
- link: /dashboards/widgets/
  tag: 설명서
  text: 위젯
title: JSON으로 그래프화하기
---

## 개요

{{< img src="/dashboards/graphing_json/json_editor.png" alt="JSON 편집기로 시계열 위젯 구성" style="width:100%;" >}}

대시보드 위젯에서 [GUI 그래프 편집기][6]와 더불어 JSON 편집기를 사용하여 시각화를 구성해 보세요. JSON 편집기에 나타나는 스키마는 대시보드 API 스키마 본문에 있는 요청을 그대로 나타냅니다. JSON 파라미터와 필수 필드에 관한 자세한 내용은 [대시보드 API 설명서][2]를 참고하세요.

## 위젯 JSON 스키마

대시보드에 추가하고 싶은 위젯 유형을 찾아보고 설명서 목록에 있는 JSON 필드에 적용해 보세요. 위젯 유형 전체 목록은 [위젯 인덱스][7]에서 볼 수 있습니다.

### Y축 스키마

Datadog Y축 관리 기능을 사용하면 다음과 같이 할 수 있습니다.

*   Y축을 특정 범위로 자르기
*   백분율 또는 절대값을 지정하여 시리즈를 필터링
*   Y축 스케일을 선형에서 로그,  제곱근 또는 파워 스케일로 변경

### 마커 스키마

마커를 사용하면 그래프에 시각적 조건부 형식을 추가할 수 있습니다(예: ALERT, WARNING, 또는 OK).

{{< img src="dashboards/graphing_json/markers.png" alt="마커" style="width:80%;">}}

## 템플릿 변수 스키마

대시보드 템플릿 변수는 대시보드에 있는 하나 이상의 그래프에 새 범위를 적용합니다. 이를 통해 특정 태그 대신 변수를 사용하여 상이한 태그 집합에서 메트릭을 동적으로 탐색할 수 있습니다. [Datadog UI의 템플릿 변수][4]에 대해 더 자세히 알아보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/#timeboards
[2]: /ko/api/v1/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/
[4]: /ko/dashboards/template_variables/
[6]: /ko/dashboards/querying/#graphing-editor
[7]: /ko/dashboards/widgets/