---
aliases:
- /ko/graphing/widgets/group/
description: 대시보드 위젯에서 위젯을 그룹화합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 그룹 위젯
widget_type: 그룹
---

## 개요
<div class="alert alert-info">스크린보드 위젯은 그룹에 배치할 수 없습니다. </a></div>

그룹 위젯을 사용하면 대시보드에 유사한 그래프들을 함께 보관할 수 있습니다. 각 그룹에는 커스텀 헤더가 있고, 접어서 축소할 수도 있습니다. 그룹을 사용하여 대시보드의 위젯을 구성해 보세요.

## 설정

1. 대시보드에 위젯을 여러 개 추가합니다.
2. 클릭 앤 드래그하여 위젯을 여러 개 선택하거나 Shift 키를 누른 상태에서 클릭합니다.
3. **그룹** 옵션을 클릭합니다.
  {{< img src="dashboards/widgets/group/widget-group-button.png" alt="위젯을 여러 개 선택한 후에 표시되는 그룹 옵션" style="width:100%;" >}}
4. 그룹 오른쪽 상단의 연필 아이콘을 클릭하여 이름을 선택하고 그룹에 스타일을 적용합니다.

## API
<div class="alert alert-info">스크린보드 위젯은 그룹에 배치할 수 없습니다. </a></div>

이 위젯은 **[대시보드 API][2]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][3]에 대한 다음 표를 참조하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/#timeboards
[2]: /ko/api/latest/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/