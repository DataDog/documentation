---
description: 패싯 분류를 추가하여 Product Analytics 쿼리를 여러 값으로 분할하세요.
title: Product Analytics 이벤트 그룹화
---
분류가 없는 쿼리는 총 조회수와 같은 단일 값을 반환합니다. *분류*를 추가하여 해당 값을 범주별로 분할하세요. 예를 들어, 총 조회수 쿼리의 경우 국가별 분류를 추가하여 조회수가 발생한 위치를 확인할 수 있습니다.

## 분류 추가 {#add-a-breakdown}

{{< ui >}}Add breakdown{{< /ui >}}을 클릭하여 단일 쿼리에 최대 4개의 분류를 추가하세요. 각 분류는 쿼리 빌더의 {{< ui >}}compared by{{< /ui >}} 아래에 행으로 나타납니다.

추가하는 각 분류는 결과를 더 세분화합니다. 예를 들어, 브라우저와 국가별로 분류된 쿼리는 Chrome/미국, Chrome/독일과 같이 데이터의 각 브라우저 및 국가 조합에 대해 하나의 버킷을 반환합니다.

{{< img src="product_analytics/analytics/group/analytics-breakdown-1.png" alt="Product Analytics 차트 빌더에서 브라우저 및 국가별로 분류된 쿼리입니다." style="width:90%;" >}}

## 측정값 선택{#choose-a-measure}

기본적으로 쿼리는 {{< ui >}}All events{{< /ui >}}의 수를 측정합니다.

{{< img src="product_analytics/analytics/group/analytics-measure-count-1.png" alt="Product Analytics 차트 빌더의 모든 이벤트에 대한 기본 개수입니다." style="width:90%;" >}}

{{< ui >}}All events{{< /ui >}}를 다른 값으로 변경하여 지정된 값의 고유 개수를 확인하세요. 예를 들어, {{< ui >}}Browser Name{{< /ui >}}을 선택하면 페이지를 조회한 고유 브라우저 수가 반환됩니다.

{{< img src="product_analytics/analytics/group/analytics-measure-count-unique-1.png" alt="Product Analytics 차트 빌더에서 브라우저별 고유 개수입니다." style="width:90%;" >}}

측정값을 로딩 시간과 같은 수치형 패싯의 통계 집계로 변경하세요. 평균, 최솟값, 최댓값, 중앙값, 합계 또는 백분위수(75, 90, 95, 98, 99백분위수) 중에서 선택하세요.

{{< img src="product_analytics/analytics/group/analytics-measure-statistical-1.png" alt="Product Analytics 차트 빌더에서 로딩 시간에 대한 통계 집계 옵션입니다." style="width:90%;" >}}