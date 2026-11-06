---
description: 보존 할당량을 사용하여 하루에 보존할 RUM 세션 수를 제한하는 방법을 알아봅니다.
further_reading:
- link: /real_user_monitoring/rum_without_limits/
  tag: 설명서
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: 설명서
  text: 보존 필터로 데이터 보존
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: 설명서
  text: 메트릭으로 성능 분석
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: 가이드
  text: 보존 필터 모범 사례
title: 보존 할당량으로 비용 제어
---
## 개요 {#overview}

보존 할당량을 사용하면 전체 보존 필터에 걸쳐 하루에 보존할 세션 수의 상한을 설정할 수 있습니다.

이를 통해 비용을 더욱 효과적으로 관리하고 트래픽 급증이나 잘못 구성된 필터로 인해 요금이 예상치 못하게 급증하는 것을 방지할 수 있습니다.

## 할당량의 작동 방식 {#how-quotas-work}

하루에 보존할 최대 세션 수를 일일 할당량으로 설정합니다. 할당량에 도달했을 때 적용할 동작을 다음 두 가지 중에서 선택할 수 있습니다.

- {{< ui >}}Stop retention{{< /ui >}}: Datadog은 해당 날짜의 남은 시간 동안 추가 세션을 보존하지 않고 할당량이 재설정될 때까지 수신되는 모든 세션을 삭제합니다.
- {{< ui >}}Slow down retention{{< /ui >}}: 세션 보존은 계속되지만 보존 비율이 낮아집니다. Datadog은 평소라면 보존할 세션 중 10%만 보존합니다.

## 설정 {#setup}

애플리케이션의 보존 할당량을 설정하려면 다음 단계를 따르세요.

1. Datadog에서 {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Real User Monitoring{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}로 이동합니다.
2. 애플리케이션을 선택합니다.
3. {{< ui >}}Product Settings{{< /ui >}} > {{< ui >}}Retention Filters{{< /ui >}}로 이동합니다.
4. 일일 할당량 임계값, 재설정 시간, 할당량 도달 시 동작을 설정합니다.

{{< img src="real_user_monitoring/rum_without_limits/retention-quotas-configuration.png" alt="일일 할당량 임계값, 재설정 시간 및 동작 옵션이 표시된 보존 할당량 구성 패널" style="width:65%" >}}

<div class="alert alert-info">할당량은 <a href="/real_user_monitoring/rum_without_limits/retention_filters/#permanent-retention-filters">영구 보존 필터</a>에 의해 보존된 세션에는 적용되지 않습니다.</div>

애플리케이션 수준에서 구성하므로 애플리케이션마다 서로 다른 보존 전략을 적용할 수 있습니다. 할당량 제한, 보존 동작, 재설정 시간 등 구성 변경 사항은 즉시 적용됩니다.

## 할당량 사용량 모니터링 {#monitor-quota-usage}

보존 필터 페이지에는 할당량 도달 후 차단된 세션을 포함한 사용자 세션 보존 현황이 세부적으로 표시됩니다. 대시보드 및 경보에는 `rum.measure.usage.quota_blocked_sessions` 메트릭을 사용합니다.

{{< img src="real_user_monitoring/rum_without_limits/retention-quotas-usage.png" alt="사용자 지정 필터로 보존된 세션, 영구 보존 필터로 보존된 세션, 할당량 도달 후 차단된 세션을 날짜별로 보여주는 차트" style="width:100%" >}}

## API {#api}

보존 할당량은 [API][1]를 통해서도 관리할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/rum-retention-quotas/