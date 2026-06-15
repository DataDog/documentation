---
aliases:
- /ko/graphing/widgets/hostmap/
description: 대시보드에 Datadog 호스트 맵을 표시합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 호스트 맵 위젯
---

호스트 맵 위젯은 기본 [Host Map][1] 페이지에서 사용할 수 있는 것과 동일한 시각화를 사용하여 호스트 전체의 메트릭을 그래프화합니다.

{{< img src="dashboards/widgets/hostmap/hostmap.png" alt="호스트 맵"  >}}

## 구성

{{< img src="dashboards/widgets/hostmap/hostmap_setup.png" alt="호스트 맵 구성"  >}}

### 설정

호스트 맵 위젯의 설정은 기본 [Host Map][1] 페이지와 유사합니다.

1. **Type**: `hosts` 또는 `containers`를 표시하도록 선택합니다.
2. **Filter by**: 표시할 호스트 또는 컨테이너를 선택합니다.
3. **Group by**: 하나 이상의 태그로 호스트 또는 컨테이너를 집계합니다.
4. **Fill by**: 호스트 또는 컨테이너 맵 요소를 채울 메트릭을 선택합니다.
5. **Size by** (선택 사항): 메트릭을 선택하여 호스트 또는 컨테이너 맵 요소의 크기를 조정합니다.
6. **Palette** (선택 사항): 색상 팔레트를 선택합니다.
7. **Values** (선택 사항): 최소 및 최대 색상 팔레트 채우기 값을 정의합니다.

**참고**: 호스트 맵 위젯에서는 자유 텍스트 검색을 사용할 수 없습니다.

### 옵션

#### 타이틀

`Show a Title` 확인란을 활성화하여 위젯의 사용자 지정 제목을 표시하세요.

{{< img src="dashboards/widgets/options/title.png" alt="위젯 타이틀" style="width:80%;">}}

선택적으로 크기와 정렬을 정의할 수 있습니다.

## API

이 위젯은 **대시보드 API**와 함께 사용할 수 있습니다. 자세한 내용은 [대시보드 API 가이드][2]를 참조하세요.

호스트 맵 위젯의 전용 [위젯 JSON 스키마 정의][3]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/infrastructure/hostmap/
[2]: /ko/api/v1/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/