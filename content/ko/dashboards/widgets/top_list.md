---
aliases:
- /ko/graphing/widgets/top_list/
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /notebooks/
  tag: 설명서
  text: 노트북
kind: 설명서
title: 상위 목록 위젯
widget_type: toplist
---

상위 목록 시각화를 사용하면 `hostname` 또는 `service`와 같이 모든 메트릭 값이 가장 많거나 가장 적은 태그 값의 목록을 표시할 수 있습니다(예: 가장 많은 CPU 소비자, 디스크 공간이 가장 적은 호스트 등).

{{< img src="dashboards/widgets/toplist/toplist.png" alt="상위 목록" >}}

## 구성

{{< img src="dashboards/widgets/toplist/toplist_setup.png" alt="상위 목록" style="width:80%;">}}

### 설정

1. 그래프화할 데이터를 선택합니다.
    * 메트릭: 메트릭 쿼리를 설정하려면 [쿼리][1] 가이드를 참조하세요.
    * 인덱싱 스팬: 인덱싱 스팬 쿼리를 구성하려면 [트레이스 검색 가이드][2]를 참조하세요.
    * 로그 이벤트: 로그 이벤트 쿼리를 구성하려면 [로그 검색 가이드][3]를 참조하세요.

2. 선택 사항: 입력 값에 따라 조건부 형식을 설정하세요.

### 옵션

#### 글로벌 시간

스크린보드 및 노트북에서 위젯에 커스텀 타임프레임이 있는지 또는 글로벌 타임프레임을 사용하는지를 선택하세요.

#### 타이틀

`Show a Title` 확인란을 활성화하여 위젯의 커스텀 타이틀을 표시하세요.

{{< img src="dashboards/widgets/options/title.png" alt="위젯 타이틀" style="width:80%;">}}

선택적으로 크기와 정렬을 정의할 수 있습니다.

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 더 많은 정보를 원하신다면 [대시보드 API 가이드][4]를 참조하세요.

상위 목록 위젯의 전용 [위젯 JSON 스키마 정의][5]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/querying/
[2]: /ko/tracing/app_analytics/search/#search-bar
[3]: /ko/logs/search_syntax/
[4]: /ko/api/v1/dashboards/
[5]: /ko/dashboards/graphing_json/widget_json/