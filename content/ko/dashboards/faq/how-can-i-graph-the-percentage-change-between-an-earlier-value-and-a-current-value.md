---
aliases:
- /ko/graphing/faq/how-can-i-graph-the-percentage-change-between-an-earlier-value-and-a-current-value
kind: faq
title: 이전 값과 현재 값 사이의 백분율 변화를 그래프로 표시하려면 어떻게 해야 하나요?
---

메트릭 값이 이전 기간과 비교하여 어떻게 변화했는지 시각화하려면 [타임시프트 함수][1]를 활용합니다. 메트릭 값을 한 시간, 하루, 주 또는 한 달 전 단위로 캡처할 수 있습니다.

해당 값을 계산하려면 다음과 같이 쿼리를 생성합니다.

```text
((current_value - old_value) / old_value) * 100
```

다음은 하루 전부터 현재까지의 시스템 메트릭 백분율 변화를 확인할 수 있는 예제입니다.

{{< img src="dashboards/faq/percentage_timeshift.png" alt="퍼센테이지 타임시프트" >}}

[1]: /ko/dashboards/functions/timeshift/