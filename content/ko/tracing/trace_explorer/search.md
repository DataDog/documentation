---
description: 스팬(span) 필터로 현재 관심을 두는 스팬(span)의 하위집합으로 범위를 좁히거나, 넓히거나 초점을 전환할 수 있습니다.
further_reading:
- link: tracing/trace_explorer/query_syntax
  tag: 설명서
  text: 쿼리 구문
kind: 설명서
title: 스팬(span) 검색
---

## 개요

개별 스팬(span)의 정보는 목록으로 시각화하여 유용하게 사용할 수 있으나, 때로는 집계 기능을 통해 중요한 정보에 접근할 수 있습니다. 해당 정보에 접근하려면 트레이스 익스플로러에서 스팬(span)을 검색하고 시계열, 상위 목록 또는 테이블로 표시를 선택합니다.

트레이스 익스플로러 검색은 시간 범위 및 `key:value`와 전체 텍스트 검색을 결합한 검색 쿼리로 구성됩니다. 시각화할 차원((스팬(span))의 수, 고유 값의 수, 정량 차원 측정값)을 선택하고 타임프레임을 선택한 다음, 쿼리를 하나 또는 다중 차원으로 그룹화합니다.

## 쿼리 검색

예를 들어, 지난 30분 간 오류 상태인 웹스토어 서비스에서 스팬(span)을 찾으려면 `service:web-store status:error`와 같이 커스텀 쿼리를 생성하고 시간 범위를 `Past 30 minutes`로 설정합니다.

{{< img src="tracing/trace_explorer/search/trace_explorer_list_search.png" alt="사용자가 'service:web-store' 및 'status:error'으로 검색했을 시 트레이스 익스플로러 목록 검색. 요청 바 차트, 오류 바 차트, 레이턴시 라인 차트 표시됨. 시각화 옵션이 목록으로 설정되어 있음." style="width:100%;">}}

상위 목록 보기를 선택하고 쿼리를 `resource`로 그룹화하여 어떤 특정 리소스가 가장 큰 영향을 받는지 식별합니다.

{{< img src="tracing/trace_explorer/search/trace_explorer_top_list_search.png" alt="트레이스 익스플로러 목록 검색. 시각화 옵션이 목록으로 설정되어 있음." style="width:100%;">}}

{{< site-region region="us,eu,us3,us5,ap1" >}}
**참고**: `key:value` 쿼리는 사전에 [패싯을 선언][1]할 필요가 **없습니다**.

[1]: /ko/tracing/trace_explorer/query_syntax/#facets
{{< /site-region >}}

## 쿼리 구문

트레이스 익스플로러에서 스팬(span)을 검색하려면 [쿼리 구문 문서][2]와 [타임프레임 문서][3]에서 사용자 지정 타임프레임에 대한 자세한 내용을 참조하세요.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_explorer/query_syntax/#facets
[2]: /ko/tracing/trace_explorer/query_syntax
[3]: /ko/dashboards/guide/custom_time_frames