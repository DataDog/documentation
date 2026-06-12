---
description: 데이터를 필터링하여 반환된 메트릭의 범위를 좁힙니다.
further_reading:
- link: /getting_started/search/
  tag: 설명서
  text: Datadog에서 검색 시작하기
- link: /metrics/explorer/
  tag: 설명서
  text: Metrics Explorer
- link: /metrics/summary/
  tag: 설명서
  text: Metrics Summary
- link: /metrics/distributions/
  tag: 설명서
  text: Metrics Distributions
- link: /logs/explorer/search_syntax/
  tag: 설명서
  text: 로그 쿼리 필터 및 구문 검색
- link: /dashboards/functions/exclusion/
  tag: 설명서
  text: 제외 함수
title: 고급 필터링
---
## 개요 {#overview}

Metrics Explorer, 모니터 또는 대시보드를 사용하여 메트릭 데이터를 쿼리하는 경우, 데이터를 필터링하여 반환된 시계열의 범위를 좁힐 수 있습니다. 모든 메트릭은 해당 메트릭의 오른쪽에 있는 **from** 필드를 사용하여 태그 기준으로 필터링할 수 있습니다. 

부울 또는 Wildcard 태그 값 필터를 사용해 고급 필터링을 수행할 수도 있습니다. 로그, 트레이스, Network Monitoring, Real User Monitoring, Synthetics 또는 보안 등 메트릭 데이터 외의 쿼리의 경우 설정은 [로그 검색 구문][1] 설명서를 참조하세요

## 부울 연산자 필터링된 쿼리 {#boolean-filtered-queries}

부울 연산자로 필터링된 메트릭 쿼리에서는 다음 구문을 사용할 수 없습니다. 

- `!`
- `,`
- `NOT`, `not`
- `AND`, `and`
- `OR`, `or`
- `IN`, `in`
- `NOT IN`, `not in`

여러 태그를 포함하거나 제외할 때:
* 포함 시 `AND` 로직 사용
* 제외 시 `OR` 로직 사용

태그에 대한 자세한 정보는 [태그 사용 시작하기][2] 가이드를 참조하세요.

**참고:** 상징적 부울 구문(`!`, `,`) 은 함수 구문 연산자(`NOT`, `AND`, `OR`, `IN`, `NOT IN`)와 함께 사용할 수 없습니다. 다음 쿼리는 _잘못된_ 것으로 간주됨: 
`avg:mymetric{env:prod AND !region:us-east}`

### 부울 연산자 필터링된 쿼리 예시 {#boolean-filtered-query-examples}

아래 예시를 사용하려면 코드 아이콘 `</>`을 클릭하여 UI에서 쿼리 편집기를 확인합니다. 그런 다음 쿼리 예시를 복사하여 쿼리 편집기에 붙여 넣습니다.

```
avg:system.cpu.user{env:staging AND (availability-zone:us-east-1a OR availability-zone:us-east-1c)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/graph_editor_code_option.mp4" alt="원시 쿼리를 보려면 코드 아이콘 클릭" video=true >}}

```
avg:system.cpu.user{env:shop.ist AND availability-zone IN (us-east-1a, us-east-1b, us-east4-b)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/boolean_and_in.png" alt="부울 예시 AND IN" style="width:100%;" >}}

```
avg:system.cpu.user{env:prod AND location NOT IN (atlanta,seattle,las-vegas)}
```

{{< img src="metrics/advanced-filtering/boolean_not_in.png" alt="부울 예시 NOT IN" style="width:100%;" >}}

## Wildcard 필터링된 쿼리 {#wildcard-filtered-queries}

접두사, 접미사 및 하위 문자열 와일드카드 태그 필터링이 지원됩니다. 
-  `pod_name: web-*` 
-  `cluster:*-trace`
-  `node:*-prod-*`

### Wildcard 필터링된 쿼리 예시 {#wildcard-filtered-query-examples}

```
avg:system.disk.in_use{!device:/dev/loop*} by {device}
```

{{< img src="metrics/advanced-filtering/wildcard_suffix_example.png" alt="Wildcard가 접미사로 사용됨" style="width:100%;" >}}

```
sum:kubernetes.pods.running{service:*-canary} by {service}
```

{{< img src="metrics/advanced-filtering/wildcard_prefix_example.png" alt="Wildcard가 접두사로 사용됨" style="width:100%;" >}}

```
avg:system.disk.utilized{region:*east*} by {region}
```

{{< img src="metrics/advanced-filtering/wildcard_infix.png" alt="Wildcard가 삽입사로 사용됨" style="width:100%;" >}}

## 제외 함수 {#exclusion-functions}

[제외 함수][3]를 쿼리에 추가합니다. 
- N/A 값을 제외합니다.
- 임계값을 충족하는 메트릭에 최솟값 또는 최댓값을 적용합니다.
- 임계값 초과 또는 미만인 값을 제외합니다.

함수는 Datadog의 데이터 요소를 삭제하지 않지만 사용자가 보는 시각화 자료의 데이터 요소를 제거합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/explorer/search_syntax/
[2]: /ko/getting_started/tagging/using_tags/
[3]: /ko/dashboards/functions/exclusion/