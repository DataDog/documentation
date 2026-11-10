---
aliases:
- /ko/opentelemetry/otlp_metrics
- /ko/opentelemetry/setup/intake_endpoint/otlp_metrics
- /ko/opentelemetry/setup/agentless/metrics
further_reading:
- link: https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/
  tag: 외부 사이트
  text: 일반 OpenTelemetry SDK 구성
- link: https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/
  tag: 외부 사이트
  text: OpenTelemetry 환경 변수 사양
- link: https://opentelemetry.io/docs/specs/otel/protocol/exporter/
  tag: 외부 사이트
  text: OpenTelemetry 프로토콜 익스포터
- link: 'https://opentelemetry.io/docs/specs/otel/metrics/sdk_exporters/otlp/ '
  tag: 외부 사이트
  text: OTLP 메트릭 익스포터
- link: /opentelemetry/guide/otlp_delta_temporality/
  tag: 문서
  text: OpenTelemetry에서 델타 시간성 구성
- link: /metrics/otlp/?tab=summary#mapping
  tag: 문서
  text: Datadog의 OTLP 메트릭 매핑
- link: https://www.datadoghq.com/blog/otlp-metrics-api/
  tag: 블로그
  text: 새로운 OTLP 메트릭 API를 사용하여 OTLP 메트릭을 Datadog으로 직접 수집하기
title: Datadog OTLP 메트릭 수집 엔드포인트
---
## 개요 {#overview}

Datadog의 OpenTelemetry 프로토콜(OTLP) 메트릭 수집 API 엔드포인트를 사용하면 애플리케이션, 관리형 플랫폼 및 OpenTelemetry Collector가 OTLP HTTP를 통해 Datadog으로 메트릭을 보낼 수 있습니다.

[Datadog Agent][2] 또는 OpenTelemetry Collector 없이 메트릭을 보내야 할 때는 이 페이지의 직접 구성을 사용하세요. 프로덕션 컬렉터 배포의 경우 [OpenTelemetry Collector 설정][1]을 사용하세요.

이 엔드포인트는 특히 다음 시나리오에서 유용합니다.

- **OTLP 익스포터를 사용하는 OpenTelemetry 배포판**: [AWS Distro for OpenTelemetry (ADOT)][8]와 같은 일부 OpenTelemetry 배포판에서는 통합 OTLP 익스포터를 사용합니다. OTLP 메트릭 엔드포인트를 사용하면 이러한 배포판에서 Datadog으로 메트릭을 보낼 수 있습니다.

- **Agent 또는 컬렉터 사용 시 기술적 제약**: 직접 수집은 타사 관리형 서비스, 고객 장치의 애플리케이션 및 추가 소프트웨어를 실행하기 어려운 기타 환경을 지원합니다.

<div class="alert alert-info">관리형 플랫폼(Cloudflare, Vercel, Heroku 등)에서 메트릭을 보내는 경우 올바른 엔드포인트 구성은 <a href="/opentelemetry/setup/otlp_ingest/managed_platforms/">관리형 플랫폼</a>을 참조하세요.</div>

## 구성 {#configuration}

Datadog OTLP 메트릭 수집 엔드포인트로 OTLP 메트릭 데이터를 내보내려면 다음 단계를 따르세요.

1. [델타 메트릭만 전송되도록 합니다](#ensure-only-delta-metrics-are-sent).
1. [OTLP HTTP 익스포터를 구성합니다](#configure-the-exporter).
   - Datadog OTLP 메트릭 수집 엔드포인트를 설정합니다.
   - 필수 HTTP 헤더를 구성합니다.
1. (필요시) [메트릭 변환기 동작을 구성하려면 `dd-otel-metric-config` HTTP 헤더](#optional-configure-the-metric-translator)를 설정하세요.

<div class="alert alert-info">2026년 9월 1일부터 OTLP 메트릭 수집 엔드포인트는 명시적 버킷 및 지수 히스토그램을 기본적으로 저장하며, 원래 버킷을 유지합니다. Datadog은 원래 버킷에서 백분위수를 계산합니다. Metrics Summary 및 Metrics Explorer에는 각 히스토그램의 유형(명시적 히스토그램 또는 지수 히스토그램)이 표시됩니다. 히스토그램 메트릭에 대한 분포 쿼리는 변경 없이 작동합니다. 이 엔드포인트는 <code>histograms</code> 및 <code>summaries</code> 필드를 <a href="#optional-configure-the-metric-translator"><code>dd-otel-metric-config</code> 헤더</a>에서 무시합니다.</div>

### 익스포터 구성 {#configure-the-exporter}

OTLP 데이터를 Datadog OTLP 메트릭 수집 엔드포인트로 보내려면 OTLP HTTP 익스포터를 사용하세요. 메트릭의 경우 익스포터는 HTTP Protobuf와 HTTP JSON을 모두 지원합니다. 성능을 개선하려면 HTTP Protobuf를 사용하는 것이 좋습니다.

프로세스는 OpenTelemetry에 자동 또는 수동 계측을 사용하는지 여부에 따라 달라집니다.

<div class="alert alert-info">사용 중인 <a href="/getting_started/site/">Datadog 사이트</a>에 따라 {{< region-param key=dd_datacenter code="true" >}}: 다음 예시에서는 엔드포인트를 {{< region-param key="otlp_metrics_endpoint" code="true" >}} 엔드포인트로 바꾸세요.</div>

#### 델타 메트릭만 전송되도록 합니다. {#ensure-only-delta-metrics-are-sent}

Datadog OTLP 메트릭 수집 엔드포인트는 **델타** 메트릭만 허용합니다. **누적** 메트릭(대부분의 SDK에서 기본값)을 전송하려고 하면 오류가 발생합니다. OpenTelemetry SDK 또는 컬렉터가 델타 메트릭을 생성하도록 구성하세요.

- [지원되는 언어][7]의 경우 `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` 환경 변수를 `delta`로 설정하세요.
- 그렇지 않으면 코드에서 시간성 기본 설정을 지정합니다. 자세한 내용은 [OpenTelemetry에서 델타 시간성 구성][5]을 참조하세요.

#### 자동 계측 {#automatic-instrumentation}

[OpenTelemetry 자동 계측][3]을 사용하는 경우 다음 환경 변수를 설정하세요.

```shell
export OTEL_EXPORTER_OTLP_METRICS_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT="{{< region-param key="otlp_metrics_endpoint" >}}"
export OTEL_EXPORTER_OTLP_METRICS_HEADERS="dd-api-key=${DD_API_KEY}"
export OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE="delta"
```

#### 수동 계측 {#manual-instrumentation}

OpenTelemetry SDK와 함께 수동 계측을 사용하는 경우, OTLP HTTP Protobuf 익스포터를 프로그래밍 방식으로 구성하세요.

{{< tabs >}}
{{% tab "JavaScript" %}}

JavaScript 익스포터는 [`@opentelemetry/exporter-metrics-otlp-proto`][100]입니다. 익스포터를 구성하려면 다음 코드 스니펫을 사용하세요.

```javascript
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-proto');

const exporter = new OTLPMetricExporter({
  url: 'https://otlp.datadoghq.com/v1/metrics',
  temporalityPreference: AggregationTemporalityPreference.DELTA, // Ensure delta temporality
  headers: {
    'dd-api-key': process.env.DD_API_KEY,
    'dd-otel-metric-config': '{"resource_attributes_as_tags": true}',
  },
});
```

[100]: https://www.npmjs.com/package/@opentelemetry/exporter-metrics-otlp-proto

{{% /tab %}}

{{% tab "Java" %}}

Java 익스포터는 [`OtlpHttpMetricExporter`][200]입니다. 익스포터를 구성하려면 다음 코드 스니펫을 사용하세요.

```java
import io.opentelemetry.exporter.otlp.http.metrics.OtlpHttpMetricExporter;

OtlpHttpMetricExporter exporter = OtlpHttpMetricExporter.builder()
    .setEndpoint("https://otlp.datadoghq.com/v1/metrics")
    .setAggregationTemporalitySelector(
      AggregationTemporalitySelector.deltaPreferred()) // Ensure delta temporality
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otel-metric-config", "{\"resource_attributes_as_tags\": true}")
    .build();
```

[200]: https://javadoc.io/doc/io.opentelemetry/opentelemetry-exporter-otlp-http-metrics/

{{% /tab %}}

{{% tab "Go" %}}

Go 익스포터는 [`otlpmetrichttp`][300]입니다. 익스포터를 구성하려면 다음 코드 스니펫을 사용하세요.

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp"

metricExporter, err := otlpmetrichttp.New(
  ctx,
  otlpmetrichttp.WithEndpoint("otlp.datadoghq.com"),
  otlpmetrichttp.WithURLPath("/v1/metrics"),
      otlpmetrichttp.WithTemporalitySelector(deltaSelector), // Ensure delta temporality
  otlpmetrichttp.WithHeaders(
    map[string]string{
      "dd-api-key": os.Getenv("DD_API_KEY"),
      "dd-otel-metric-config": "{\"resource_attributes_as_tags\": true}",
    }),
)
```

[300]: https://pkg.go.dev/go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp

{{% /tab %}}

{{% tab "Python" %}}

Python 익스포터는 [`OTLPMetricExporter`][400]입니다. 익스포터를 구성하려면 다음 코드 스니펫을 사용하세요.

```python
from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter

exporter = OTLPMetricExporter(
    endpoint="https://otlp.datadoghq.com/v1/metrics",
    preferred_temporality=deltaTemporality, # Ensure delta temporality
    headers={
        "dd-api-key": os.environ.get("DD_API_KEY"),
        "dd-otel-metric-config": '{"resource_attributes_as_tags": true}',
    },
)
```

[400]: https://pypi.org/project/opentelemetry-exporter-otlp-proto-http/

{{% /tab %}}
{{< /tabs >}}

### (필요시) 메트릭 변환기 구성 {#optional-configure-the-metric-translator}

`dd-otel-metric-config` 헤더를 사용하여 메트릭이 변환되어 Datadog으로 전송되는 방식을 구성합니다. JSON 헤더에는 다음 필드가 포함되어 있습니다.

`resource_attributes_as_tags`
: **유형**: 불리언 <br>
**기본값**: `false` <br>
`true`로 설정하면 모든 리소스 속성을 메트릭 레이블로 변환합니다. 그런 다음 태그로 변환합니다.

`instrumentation_scope_metadata_as_tags`
: **유형**: 불리언 <br>
**기본값**: `false` <br>
`true`로 설정하면 메트릭을 생성한 계측 범위의 이름과 버전을 메트릭 태그에 추가합니다.

`histograms.mode`
: **유형**: 문자열 <br>
**지원 중단됨**: 2026년 9월 1일부터 무시됩니다. Datadog은 이 설정과 관계없이 히스토그램을 기본적으로 저장합니다. <br>
히스토그램을 내보내기 위한 모드입니다. 유효한 값은 다음과 같습니다.
  - `distributions`: 히스토그램을 Datadog 분포로 보냅니다.
  - `counters`: 히스토그램을 Datadog 카운트로 보냅니다(버킷당 메트릭 하나).
  - `nobuckets`: 버킷 히스토그램 메트릭을 보내지 않습니다.

`histograms.send_aggregation_metrics`
: **유형**: 불리언 <br>
**지원 중단됨**: 2026년 9월 1일부터 무시됩니다. Datadog은 별도의 `.sum`, `.count`, `.min`, `.max` 메트릭을 기록하지 않습니다. 대신 `count:<METRIC_NAME>{*}.as_count()`와 같이 일치하는 집계가 있는 히스토그램 메트릭을 쿼리하세요. <br>
`true`로 설정하면 히스토그램에 대한 추가 `.sum`, `.count`, `.min`, `.max` 메트릭을 기록합니다.

`summaries.mode`
: **유형**: 문자열 <br>
**지원 중단됨**: 2026년 9월 1일부터 무시됩니다. <br>
OTLP 요약을 내보내기 위한 모드입니다. 유효한 값은 다음과 같습니다.
  - `noquantiles`: `.quantile` 메트릭을 보내지 않습니다. `.sum` 및 `.count` 메트릭은 계속 보냅니다.
  - `gauges`: `.quantile` 메트릭을 분위수로 태그가 지정된 게이지로 보냅니다.

예시는 다음과 같습니다.

```json
{
  "resource_attributes_as_tags": true,
  "instrumentation_scope_metadata_as_tags": true
}
```

## OpenTelemetry Collector {#opentelemetry-collector}

사용 중인 OpenTelemetry Collector 배포판에 Datadog의 권장 컬렉터 설정에서 사용하는 모든 구성 요소가 포함되어 있지 않은 경우 자체 배포판에서 OTLP HTTP 익스포터를 구성하세요.

이러한 예시에서는 OpenTelemetry Collector Contrib v0.154.0의 구성 요소 식별자를 사용합니다. 다른 버전이나 배포판의 경우 해당 배포판이 지원하는 식별자를 사용하세요.

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318

processors:
  cumulativetodelta: {}

exporters:
  otlp_http:
    metrics_endpoint: {{< region-param key="otlp_metrics_endpoint" >}}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      dd-otel-metric-config: '{"resource_attributes_as_tags": true}'

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [cumulativetodelta]
      exporters: [otlp_http]
```

이 예시는 누적 메트릭을 Datadog OTLP 메트릭 수집 엔드포인트에 필요한 델타 시간성으로 변환합니다. Collector 배포판에 필요한 리시버와 프로세서를 추가합니다.

OpenTelemetry Collector Contrib을 사용하는 프로덕션 배포의 경우 [권장 OpenTelemetry Collector 설정][1]을 사용하세요. 또한 전송 큐 배치 처리, 리소스 탐지, 메트릭 태깅, 호스트 메타데이터 강화를 구성합니다.

## 문제 해결 {#troubleshooting}

### 오류: 403 Forbidden {#error-403-forbidden}

Datadog OTLP 메트릭 수집 엔드포인트로 메트릭을 보낼 때 `403 Forbidden` 오류가 발생하면 이는 다음 문제 중 하나를 나타냅니다.

- 엔드포인트 URL이 조직에 대해 올바르지 않습니다.  
   **해결 방법**: 조직에 맞는 올바른 메트릭 수집 엔드포인트 URL을 사용하세요. 현재 사이트는 다음과 같으니 {{< region-param key=dd_datacenter code="true" >}}, 따라서 다음 {{< region-param key="otlp_metrics_endpoint" code="true" >}} 엔드포인트를 사용하세요.

### 오류: 413 Request Entity Too Large {#error-413-request-entity-too-large}

Datadog OTLP 메트릭 수집 엔드포인트로 메트릭을 보낼 때 `413 Request Entity Too Large` 오류가 발생하면, 이는 OTLP 익스포터가 보낸 페이로드 크기가 Datadog 메트릭 수집 엔드포인트의 512 KiB 제한(압축된 상태)을 초과했음을 의미합니다.

이 오류는 일반적으로 OpenTelemetry SDK가 단일 요청 페이로드에 너무 많은 텔레메트리 데이터를 배치할 때 발생합니다.

**해결 방법**: SDK의 배치 프로세서에서 내보내기 배치 크기를 줄이세요. 예를 들어, OpenTelemetry Java SDK에서 `BatchMetricExportProcessor`를 조정할 수 있습니다.

### 문제: 데이터 포인트 누락 또는 예상보다 낮은 메트릭 값 {#issue-missing-datapoints-or-lower-than-expected-metric-values}

데이터 포인트가 누락되거나 메트릭 값이 예상보다 낮게 나타나는 경우 타임스탬프(단위: 초)와 차원이 동일한 메트릭에 대해 여러 데이터 포인트를 보내고 있기 때문일 수 있습니다. 이러한 경우 Datadog은 마지막 데이터 포인트만 수락하며 이전 데이터 포인트는 삭제됩니다(last-write-wins). Datadog은 메트릭의 시계열 데이터가 {timestamp + dimensions} 컨텍스트 내에서 고유할 것을 요구합니다.

**해결 방법**: 특정 타임스탬프에서 주어진 메트릭의 데이터 포인트에 태그가 고유하게 지정되어 있는지 확인하세요. 예를 들어, 여러 AWS Lambda 호출에서 동시에 하나의 메트릭에 대해 여러 데이터 포인트를 보내는 경우 메트릭에 고유 식별자(예: Lambda ARN)를 리소스 속성으로 포함해야 합니다. `resource_attributes_as_tags` 옵션을 사용하여 이러한 리소스 속성을 메트릭 태그로 추가하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/opentelemetry/collector_exporter/
[2]: /ko/opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/reference/specification/glossary/#automatic-instrumentation
[5]: /ko/opentelemetry/guide/otlp_delta_temporality/
[6]: /ko/metrics/otlp/?tab=summary#mapping
[7]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables
[8]: https://aws-otel.github.io/docs/getting-started/lambda