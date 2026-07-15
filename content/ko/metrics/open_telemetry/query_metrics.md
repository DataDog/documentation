---
aliases:
- /ko/metrics/open_telemetry/otlp_metrics/
description: Semantic Mode를 사용하여 하이브리드 환경에서 Datadog 메트릭과 OpenTelemetry 메트릭을 함께 쿼리합니다.
further_reading:
- link: opentelemetry/
  tag: 설명서
  text: OpenTelemetry
title: Datadog 및 OpenTelemetry 메트릭 전체에서 쿼리
---
많은 조직에서 OpenTelemetry(OTel)를 Datadog와 함께 사용하여 일부 호스트는 OTel 메트릭을, 다른 호스트는 Datadog 메트릭을 내보내는 하이브리드 환경을 운영합니다. OTel 메트릭과 Datadog 메트릭은 이름 지정 규칙과 의미 체계 정의가 서로 다른 경우가 많기 때문에 이러한 환경에서 인프라를 통합된 형태로 파악하는 것은 어려울 수 있습니다.

Datadog는 다음 기능을 제공하여 이러한 차이를 해소할 수 있도록 지원합니다.

- OTel 메트릭과 Datadog 메트릭을 함께 쿼리합니다.
- 메트릭 소스 및 매핑을 파악합니다.

## 쿼리에서 OpenTelemetry 및 Datadog 메트릭 통합 {#unify-opentelemetry-and-datadog-metrics-in-queries}

{{< callout url="https://www.datadoghq.com/product-preview/otel-native-instrumentation/" btn_hidden="false" header="미리 보기에 참여하세요!" >}}
텔레메트리 소스 쿼리 수정자를 사용하려면 OTel Native Instrumentation 미리 보기에 참여해야 합니다. 이 양식을 사용하여 액세스를 요청합니다.
{{< /callout >}}

[Metrics Query Editor][1]와 대시보드 위젯에는 [Telemetry source][3] 쿼리 수정자가 포함되어 있어 OTel 및 Datadog 소스의 잠재적으로 동일한 메트릭을 Datadog에서 처리하는 방식을 제어할 수 있습니다. **Modify**를 선택한 다음 **Telemetry sources** 섹션에서 **Native telemetry** 또는 **Combined telemetry**를 선택합니다.

{{< img src="dashboards/functions/telemetry_source_combined.png" alt="Combined telemetry가 선택된 Telemetry sources 쿼리 수정자." style="width:100%;" >}}

다음 두 가지 모드 중에서 선택할 수 있습니다.

### Native telemetry(기본값) {#native-telemetry-default}

- 이 모드에서는 입력한 특정 메트릭 이름(Datadog 메트릭 또는 OTel 메트릭)만 쿼리합니다.
- 동등한 다른 메트릭의 데이터는 포함되지 않습니다.

### Combined telemetry {#combined-telemetry}

- 이 모드에서는 하나의 메트릭 이름만 입력하더라도 동등한 Datadog 메트릭과 OTel 메트릭의 데이터를 하나의 쿼리로 자동 결합합니다.
- 동등한 메트릭 간의 매핑(복잡한 매핑 포함)을 처리하고 관련된 모든 시계열을 하나의 메트릭으로 집계합니다.
- Datadog 메트릭에서 시작하든 OTel 메트릭에서 시작하든 동일하게 동작합니다.

### 예시 {#example}

두 가지 서로 다른 메트릭을 사용하여 시스템 부하를 모니터링한다고 가정해 보겠습니다.

- **OTel 네이티브**: `system.cpu.load_average.15m`
- **Datadog Agent**: `system.load.15`

`system.cpu.load_average.15m`을 쿼리하고, 최대 공간 집계를 적용한 다음, 텔레메트리 소스를 **Combined telemetry**로 설정하면 Datadog는 자동으로 다음을 수행합니다.

1. 동등한 Datadog 메트릭인 `system.load.15`를 식별합니다.
2. `system.cpu.load_average.15m`와 `system.load.15`의 시계열을 결합합니다.
3. 두 소스의 모든 데이터 포인트에 대해 최대 집계를 적용합니다.

## 메트릭 소스 및 매핑 파악 {#understand-metric-sources-and-mappings}

쿼리할 때 명확한 정보를 제공하기 위해 메트릭 소스와 동등한 메트릭이 표시됩니다.

- **소스 배지**: 쿼리 편집기에서 메트릭 이름 옆에 **Datadog** 또는 **OTel** 배지가 표시되어 메트릭의 출처를 나타냅니다.

- **동등한 메트릭 목록**: 편집기에는 쿼리한 메트릭과 동등한 것으로 간주되는 메트릭 목록도 표시됩니다. 여기에는 복잡한 일대다 매핑도 포함됩니다. 예를 들어 `system.cpu.utilization`은 여러 Datadog CPU 상태 메트릭(`system.cpu.idle`, `system.cpu.iowait` 등)에 매핑됩니다.

{{< img src="/metrics/otel/source.png" alt="소스 배지 및 동등한 메트릭 목록" style="width:75%;" >}}

## 상세 매핑 보기 {#view-detailed-mappings}

특정 OTel 메트릭과 Datadog 메트릭 간의 관계를 종합적으로 확인하려면 Metrics Summary 페이지를 확인합니다.

1. [**Metrics > Summary**][2]로 이동합니다.
2. 알려진 Datadog 메트릭 또는 OTel 메트릭을 검색합니다.
3. **Metric Details** 사이드 패널을 엽니다.

또는 쿼리 편집기에서 메트릭을 입력할 때 **Edit in Metrics Summary**를 클릭합니다.

이 패널에는 복잡한 관계를 포함한 메트릭 매핑이 표시됩니다. 예를 들어 `system.cpu.utilization`가 `system.cpu.idle`, `system.cpu.user` 등의 여러 Datadog 메트릭에 어떻게 매핑되는지 보여줍니다.

{{< img src="/metrics/otel/mappings.png" alt="OTel 및 Datadog 매핑을 보여주는 Metrics Summary 세부 정보 패널" style="width:100%;" >}}

이러한 매핑에 사용되는 태그 기반 논리도 확인할 수 있습니다. 동등한 메트릭 위에 마우스를 올리면 구체적인 조건이 표시됩니다. 예를 들어 `system.cpu.idle` 위에 마우스를 올리면 `state=idle`일 때 `system.cpu.utilization`에 매핑되며, 값에 100을 곱한다는 것을 확인할 수 있습니다.

{{< img src="/metrics/otel/tooltip.png" alt="태그 기반 매핑 논리를 보여주는 마우스 오버 툴팁" style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: https://app.datadoghq.com/metric/summary
[3]: /ko/dashboards/functions/telemetry_source/