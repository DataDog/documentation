---
aliases:
- /ko/opentelemetry/guide/service_entry_spans_mapping/
- /ko/opentelemetry/schema_semantics/service_entry_spans/
further_reading:
- link: /opentelemetry/integrations/trace_metrics
  tag: 설명서
  text: OpenTelemetry 트레이스 메트릭
title: OpenTelemetry 시맨틱 규칙을 Service-entry 스팬에 매핑
---
## 개요 {#overview}
Datadog은 [서비스 진입 스팬][1]을(를) [트레이스 메트릭][2] 및 [APM Trace Explorer][3]와 같은 기능을 위해 플랫폼 전반에서 사용합니다. 이 규약은 Datadog 고유의 것이지만, 아래의 옵트인 가이드에 따라 OpenTelemetry의 [`SpanKind`][4] 속성에서 매핑할 수 있습니다.

## 요구 사항 {#requirements}

- OTel Collector Contrib v0.100.0 이상
- Datadog Agent v7.53.0 이상

## 설정 {#setup}

수집 경로에 따라 설정 옵션을 활성화하십시오:

{{< tabs >}}
{{% tab "OTel Collector 및 Datadog Exporter" %}}

새로운 서비스 진입 스팬 식별 로직은 `traces::compute_top_level_by_span_kind`[Datadog exporter][2] 및 [Datadog connector][1]에서 설정 옵션을 true로 설정하여 활성화할 수 있습니다. 두 구성 요소를 모두 사용하는 경우 이 설정 옵션을 exporter와 connector 모두에서 활성화해야 합니다.

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/connector/datadogconnector/examples/config.yaml#L48-L53
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/exporter/datadogexporter/examples/collector.yaml#L365-L370
{{% /tab %}}
{{% tab "Datadog Agent의 OTLP 수집 파이프라인" %}}

새로운 서비스 진입 스팬 식별 로직은 Datadog Agent 설정의 [apm_config.features][1]에 `"enable_otlp_compute_top_level_by_span_kind"`을 추가하여 활성화할 수 있습니다.

[1]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
{{% /tab %}}
{{< /tabs >}}

## 지원되는 규약 {#supported-conventions}

[트레이스 메트릭][2]은(는) 서비스 진입 스팬 및 측정된 스팬에 대해 생성됩니다. 이러한 스팬 규약은 Datadog 고유의 것이므로, OpenTelemetry 스팬은 다음 매핑을 사용하여 식별됩니다:
| OpenTelemetry 규약 | Datadog 규약 |
| --- | --- |
| 루트 스팬 | 서비스 진입 스팬 |
| 서버 스팬 (`span.kind: server`) | 서비스 진입 스팬 |
| 컨슈머 스팬 (`span.kind: consumer`) | 서비스 진입 스팬 |
| 클라이언트 스팬 (`span.kind: client`) | 측정된 스팬 |
| 프로듀서 스팬 (`span.kind: producer`) | 측정된 스팬 |
| 내부 스팬 (`span.kind: internal`) | 트레이스 메트릭이 생성되지 않음 |

## 마이그레이션 {#migration}

이 새로운 서비스 진입 스팬 식별 로직은 트레이스 메트릭을 생성하는 스팬의 수를 증가시킬 수 있으며, 이는 트레이스 메트릭을 기반으로 하는 기존 모니터에 영향을 줄 수 있습니다. 내부 스팬만 있는 사용자는 트레이스 메트릭이 감소하는 것을 보게 됩니다.

트레이스 메트릭을 기반으로 하는 기존 모니터가 있는 경우, 이 변경 사항으로 인해 트레이스 메트릭의 일관성이 향상되므로 업그레이드 후 모니터를 업데이트할 수 있습니다. 내부 스팬만 있는 경우, 트레이스 메트릭과 서비스 진입 스팬을 받으려면 위 표에 따라 계측을 업데이트하십시오.

[`SpanKind`][4] 은 일반적으로 스팬이 생성될 때 설정되지만, OpenTelemetry Collector의 [transform processor][5]를 사용하여 위 매핑을 제어함으로써 업데이트할 수도 있습니다. 예를 들어, 내부 스팬에 대해 트레이스 메트릭이 필요한 경우, 다음 구성은 `http.path: "/health"`이 포함된 내부 스팬을 클라이언트 스팬으로 변환합니다:

```yaml
  transform:
    trace_statements:
      - context: span
        statements:
          - set(kind.string, "Client") where kind.string == "Internal" and attributes["http.path"] == "/health"
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/glossary/#service-entry-span
[2]: https://docs.datadoghq.com/ko/opentelemetry/integrations/trace_metrics/
[3]: https://docs.datadoghq.com/ko/tracing/trace_explorer
[4]: https://opentelemetry.io/docs/specs/otel/trace/api/#spankind
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md