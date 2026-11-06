---
description: 관리자 조직에서 연결된 모든 고객 조직의 사용량 메트릭을 모니터링합니다.
title: 중앙 집중식 사용량 메트릭
---
## 개요 {#overview}

중앙 집중식 사용량 메트릭을 통해 파트너 관리자 조직(관리자 조직)에서 연결된 모든 고객 조직의 사용량 메트릭과 추정 사용량 메트릭을 모니터링할 수 있습니다. 메트릭은 고객별로 태그가 지정되어 관리자 조직으로 집계되므로 파트너는 대시보드, 모니터 및 경보를 한곳에서 사용하여 모든 고객 조직의 사용량을 필터링하고 고객별로 구분할 수 있습니다.

Datadog은 두 가지 종류의 사용량 메트릭을 생성합니다.

`datadog.estimated_usage.*` 네임스페이스의 - **추정 사용량 메트릭** 이 메트릭은 몇 분 내에 업데이트되며 거의 실시간으로 사용량을 확인할 수 있습니다. 추정 사용량 메트릭은 실제 청구 대상 사용량과 평균 약 10~20% 차이가 날 수 있으며, 사용량이 적은 조직에서는 차이가 더 클 수 있습니다. 전체 메트릭에 대한 자세한 내용은 [추정 사용량 메트릭][1]을 참조하세요.
{{< ui >}}Usage{{< /ui >}} 쿼리 소스의 - **사용량 메트릭** 이 메트릭은 청구서를 생성하는 동일한 사용량 측정 및 요금 청구 파이프라인에서 생성되므로 Plan & Usage 데이터와 거의 일치합니다. 사용량 메트릭은 추정 사용량 메트릭보다 업데이트가 느리지만 요금 청구 관련 논의에 사용할 만큼 정확합니다.

추정 사용량 메트릭을 사용하여 사용량 급증을 조기에 파악하고, 사용량 메트릭을 사용하여 청구서와 일치하는 수치를 보고합니다.

## 속성 태그 {#attribution-tags}

집계된 메트릭에는 다음 두 가지 태그가 포함됩니다.

- `account_name`: 상위 조직 이름(관리자 조직)
- `child_org_name`: 상위 조직에 속한 하위 조직의 이름(고객 조직)

## 사용량 메트릭 쿼리 {#query-usage-metrics}

대시보드 위젯이나 모니터를 생성할 때는 다음과 같이 설정합니다.

- 추정 사용량 메트릭의 경우 {{< ui >}}Metrics{{< /ui >}}를 소스로 선택하고 `datadog.estimated_usage.*` 메트릭을 사용합니다.
- 사용량 메트릭의 경우 {{< ui >}}Usage{{< /ui >}}를 소스로 선택하고 {{< ui >}}Infra Hosts{{< /ui >}}와 같은 사용 유형을 선택합니다.

추정 사용량 메트릭의 경우 `child_org_name` 태그를 사용하여 쿼리를 필터링하거나 그룹화합니다. 예를 들어, 다음과 같이 모든 고객의 추정 인프라 호스트 사용량을 쿼리합니다.

```
sum:datadog.estimated_usage.hosts{*} by {child_org_name}
```

{{< img src="partners/multi_tenant_billing/usage_metrics_rollup.png" alt="추정 사용량 메트릭과 child_org_name 태그가 표시된 메트릭 소스" style="width:100%;" >}}

사용량 메트릭의 경우 `child_org_name`으로 필터링하여 쿼리 범위를 단일 고객으로 제한하거나 `child_org_name`으로 그룹화하여 고객 간 사용량을 비교합니다.

{{< img src="partners/multi_tenant_billing/usage_source_infra_hosts.png" alt="Infra Hosts가 선택된 사용량 쿼리 소스" style="width:100%;" >}}

Plan & Usage 합계와 일치시키려면 호스트 기반 제품에 1시간 단위 롤업을 적용하고 그래프의 시간대를 UTC로 설정합니다. Plan & Usage는 UTC를 기준으로 보고되기 때문입니다.

## 관련 문서 {#related-docs}

- [비용 및 사용량 가시성][2]: 연결된 고객 조직 전반의 비용 및 청구 가능한 사용량 데이터를 확인할 수 있습니다.

[1]: /ko/account_management/billing/usage_metrics/
[2]: /ko/partners/multi_tenant_billing/cost-and-usage-visibility/