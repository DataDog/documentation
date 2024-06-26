---
aliases:
- /ko/real_user_monitoring/rum_explorer
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: RUM Explorer의 검색법을 자세히 알아보세요
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: 블로그
  text: RUM으로 코어 웹 바이탈을 모니터링하세요
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: 블로그
  text: 단일 페이지 애플리케이션 모니터링 시작
kind: 설명서
title: RUM  탐색기
---

## 개요

[실제 사용자 모니터링(RUM) 탐색기][1]를 사용하면 애플리케이션에서 수집된 데이터와 RUM 이벤트에 대한 세부 정보를 확인할 수 있습니다.

다음을 수행할 수 있습니다.

- 사용자 세션 탐색
- 보기, 리소스 또는 액션에 영향을 미치는 성능 이슈 조사
- 애플리케이션 오류 및 긴 작업에 관한 문제 해결

{{< img src="real_user_monitoring/explorer/rum-explorer-2.png" alt="RUM Explorer" style="width:95%;" >}}

## 애플리케이션별 보기

상단 탐색에서 애플리케이션 선택기를 사용하여 특정 애플리케이션에 대한 모든 RUM 데이터를 선택하고 볼 수 있습니다.

{{< img src="real_user_monitoring/explorer/application-selector-2.png" alt="특정 애플리케이션에 대한 모든 RUM 데이터를 보려면 애플리케이션 선택기를 클릭하세요." style="width:95%;" >}}

## 검색 및 필터링

검색창에 입력하고 [RUM 탐색기][1]에서 시각화 유형을 선택하여 RUM 이벤트를 검색 및 필터링할 수 있습니다. 관심 있는 이벤트의 하위 집합으로 범위를 좁히거나 넓히고 초점을 전환할 수 있습니다.

## 수집한 데이터

쿼리한 RUM 이벤트를 이슈에 대한 정보를 도출하거나 통합하는 데 도움이 될 수 있는 상위 수준의 엔터티로 그룹화하세요. 이벤트 패턴을 식별하고 하위 집합별로 이벤트를 집계하려면 [RUM 이벤트 그룹화][2]를 참조하세요.

쿼리 작성 및 패싯 사용을 시작하려면 [검색 구문][3]을 참조하세요.

## 시각화하기

결정적인 정보를 발견하는 데 도움이 되는 관점에서 RUM 이벤트를 표시하는 필터 및 집계에 대한 시각화를 선택합니다.

예를 들어 목록으로 RUM 이벤트를 보고, RUM 데이터 열로 정리하고, 시간에 따른 RUM 텔레메트리를 표시하는 시계열 그래프로 RUM 데이터를 확인할 수 있습니다.

RUM 탐색기에서 RUM 데이터 시각화를 시작하려면 [RUM 시각화 생성하기][4]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/sessions
[2]: /ko/real_user_monitoring/explorer/group
[3]: /ko/real_user_monitoring/explorer/search_syntax
[4]: /ko/real_user_monitoring/explorer/visualize