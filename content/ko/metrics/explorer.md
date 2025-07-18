---
aliases:
- /ko/graphing/metrics/explorer/
description: 모든 메트릭을 살펴보고 분석을 수행하세요.
further_reading:
- link: /metrics/summary/
  tag: 설명서
  text: 메트릭 요약
- link: /metrics/distributions/
  tag: 설명서
  text: 메트릭 배포
kind: 설명서
title: 메트릭 탐색기
---

## 개요

[메트릭 탐색기][1]는 Datadog에서 메트릭을 검사하기 위한 기본적인 인터페이스입니다. 더 많은 고급 옵션을 이용하려면 [노트북][2]이나 대시보드([스크린보드][3], 또는 [타임보드][4])를 생성하세요.

## 그래프화

쿼리 편집기를 사용하여 메트릭 탐색기 페이지에 표시된 그래프를 커스터마이즈하세요.

페이지 오른쪽 상단에서 타임프레임을 지정할 수 있습니다. 기본값은 **지난 1시간**입니다.

{{< img src="metrics/explorer/metrics_explorer.png" alt="막대 그래프에 두 쿼리가 표시된 메트릭 탐색기" style="width:80%;" >}}

지난 24시간 내에 보고하지 않은 메트릭은 쿼리 편집기에 표시되지 않습니다. 메트릭 이름이나 전체 쿼리를 입력하여 이러한 메트릭을 그래프에 직접 추가할 수 있습니다.

### 범위

태그 값을 선택하거나 검색하고 **소스" 텍스트 상자를 사용해 필터링 범위를 지정하세요. 예를 들어 **소스" 텍스트 상자를 사용해 특정 호스트, 클러스터, 환경 또는 지역별로 메트릭 값을 필터링할 수 있습니다.

### 공간 집계

메트릭 값을 결합하는 데 사용되는 [공간 집계][5]를 정의하세요.

가능한 옵션:

* 보고된 값의 평균(기본값)
* 보고된 값의 최대값
* 보고된 값의 최소값
* 보고된 값의 합계

**참고**: 옵션은 선택한 메트릭 유형에 따라 달라질 수 있습니다.

### 함수

선택적으로 함수 버튼을 사용하여 쿼리에 함수를 추가할 수 있습니다. 일부 메트릭 유형의 경우 특정 함수만 사용할 수 있습니다.

### 내보내기

오른쪽 상단의 대시보드나 노트북으로 그래프를 내보내세요. 또한 **노트북에서 그래프 분할**을 사용하여 지역, 서비스 또는 환경 등으로 개별 그래프를 분할한 데이터를 표시할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /ko/notebooks/
[3]: /ko/dashboards/#screenboards
[4]: /ko/dashboards/#timeboards
[5]: /ko/metrics/introduction/#space-aggregation