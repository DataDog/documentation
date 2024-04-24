---
aliases:
- /ko/graphing/faq/there-are-too-many-lines-on-my-graph-can-i-only-display-the-most-important-ones
kind: faq
title: 그래프에 라인이 너무 많은데 가장 중요한 라인만 표시할 수 있나요?
---

## 문제

그룹화된 쿼리를 사용할 때 그래프에 라인이 너무 많이 표시되어 데이터를 읽는 데 혼란을 겪는 경우가 있습니다. 예:

{{< img src="dashboards/faq/too_many_metrics_1.png" alt="too_many_metrics_1" >}}

... 여기서는 가중치가 높은 호스트에 집중하세요.

## 해결 방법

상단 함수는 다음과 같이 그래프에 연관된 라인 몇 개만 표시하는 데 적합합니다.

{{< img src="dashboards/faq/too_many_metrics_2.png" alt="too_many_metrics_2" >}}

자세한 내용을 확인하려면 [상위 함수 문서][1]를 참조하세요.

[1]: /ko/dashboards/functions/rank/