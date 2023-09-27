---
is_beta: false
kind: faq
title: 메트릭 태그 설정 시 "저장" 버튼이 왜 비활성화되어 있나요?
---
제안된 설정으로 인해 인덱싱된 커스텀 메트릭 볼륨이 원래 수집된 볼륨보다 클 수 있습니다. "저장" 버튼은 Metrics without Limits™을 사용하지 않고 메트릭을 완전히 설정하지 않은 상태로 두는 것이 더 비용 효율적인 경우 의도적으로 비활성화됩니다

[Metrics without Limits™][1]을 사용하면, 코드 레벨 변경 없이 원래 제출한 메트릭 볼륨을 Datadog에 계속 보낼 수 있고, 인덱싱할 커스텀 메트릭의 더 작은 하위 집합만을 유지하기 위해 태그 설정을 정의합니다. 

원본 메트릭 데이터는 Metrics without Limits™을 통해 더 작은 볼륨의 인덱싱된 커스텀 메트릭에 재결합, 재집계 및 저장됩니다. 이를 통해 수학적으로 정확한 쿼리 결과를 보존합니다. 따라서 나머지 인덱싱된 커스텀 메트릭 각각에 대해 Datadog은 지정된 수의 시간/공간 집계를 저장합니다.

Metrics without Limits™ 설정에 대해 인덱싱된 커스텀 메트릭의 결과 수는 (`the number of remaining tag value combinations`—태그 설정에 의해 지정) x (`the number of time/space aggregations`—사용자 정의 애그리게이션 섹션에서 지정)

**예시**
`shopist.basket.size` 메트릭의 카디널리티를 줄이기 위해 Metrics without Limits™을 사용한다고 가정합니다.

{{< img src="metrics/faq/all-tags.jpg" alt="모든 태그 설정">}}

{host: a, region: us, env: prod}와 같은 4개의 태그 값 조합에 대한 값을 `shopist.basket.size`가 보고한다고 가정하면 —즉, `shopist.basket.size`는 다음 도표와 같이 원래의 **4개 커스텀 메트릭**을 내보냅니다:

{{< img src="metrics/faq/all-tags-diagram.jpg" alt="모든 태그 설정의 커스텀 메트릭 분류">}}

Metrics without Limits™을 사용하여 `{region, env}` 태그만 설정하면, 3개의 태그 값 조합만 남습니다:
* `{region:us, env:prod}`
* `{region:eu, env:prod}`
* `{region:us, env:dev}`

{{< img src="metrics/faq/disabled-save.png" alt="저장 설정 비활성화">}}

이 제안된 설정으로 인한 커스텀 메트릭 수는 다음과 같습니다: (`the number of remaining tag value combinations`) x (`the number of time/space aggregations`) = `(3) x (2)` = **6 커스텀 메트릭**.

{{< img src="metrics/faq/mwl-diagram.jpg" alt="MWL 설정 커스텀 메트릭 분류">}}

따라서, 제안된 설정으로 인해 원래 수집된 볼륨(커스텀 메트릭 4개)보다 더 큰 색인된 커스텀 메트릭 볼륨(커스텀 메트릭 6개)이 될 수 있습니다. **이러한 경우, 이 메트릭을 가장 비용 최적화된 상태로 설정하기 위해 '모든 태그' 토글 옵션을 사용하여 메트릭을 미설정 상태로 두는 것이 좋습니다.**

[1]: /ko/metrics/metrics-without-limits/