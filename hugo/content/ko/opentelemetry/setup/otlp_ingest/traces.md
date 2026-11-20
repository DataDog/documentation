---
aliases:
- /ko/opentelemetry/otlp_endpoint
- /ko/opentelemetry/setup/intake_endpoint/otlp_traces
- /ko/opentelemetry/setup/agentless/traces
further_reading:
- link: https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/
  tag: 외부 사이트
  text: 일반 OpenTelemetry SDK 구성
- link: https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/
  tag: 외부 사이트
  text: OpenTelemetry 환경 변수 사양
- link: 'https://opentelemetry.io/docs/reference/specification/protocol/exporter/ '
  tag: 외부 사이트
  text: OpenTelemetry 프로토콜 익스포터
title: Datadog OTLP 트레이스 수집 엔드포인트
---
## 개요 {#overview}

Datadog의 OpenTelemetry 프로토콜(OTLP) 트레이스 수집 API 엔드포인트를 사용하면 애플리케이션, 관리형 플랫폼 및 OpenTelemetry 컬렉터가 OTLP HTTP를 통해 Datadog으로 트레이스를 보낼 수 있습니다.

[Datadog Agent][2] 또는 OpenTelemetry 컬렉터 없이 트레이스를 보내야 할 때는 이 페이지의 직접 구성을 사용하세요. 프로덕션 컬렉터 배포의 경우 [OpenTelemetry 컬렉터 설정][1]을 사용하세요.

서버리스 워크로드의 경우 [서버리스를 위한 OTLP 수집][8]을 참조하세요. Cloudflare, Vercel, Heroku와 같은 관리형 플랫폼의 경우 [관리형 플랫폼을 위한 OTLP 수집][9]을 참조하세요.

<div class="alert alert-info">OTLP 트레이스 수집 엔드포인트는 다음을 지원합니다. <code>http/protobuf</code> 및 <code>http/json</code> 인코딩. <code>grpc</code> 은(는) 지원되지 않습니다.</div>

## 구성 {#configuration}

Datadog OTLP 트레이스 수집 엔드포인트로 OTLP 데이터를 내보내려면 다음 단계를 따르세요.

1. [OTLP HTTP Protobuf 익스포터를 구성합니다](#configure-the-exporter).
   - Datadog OTLP 트레이스 수집 엔드포인트를 설정합니다.
   - 필수 HTTP 헤더를 구성합니다.
1. (선택 사항) [스팬을 매핑하거나 필터링하려면 `dd-otel-span-mapping` HTTP 헤더](#optional-map-or-filter-span-names)를 설정합니다.

### 익스포터 구성 {#configure-the-exporter}

Datadog OTLP 트레이스 수집 엔드포인트로 OTLP 데이터를 보내려면 OTLP HTTP Protobuf 익스포터를 사용하세요. 프로세스는 OpenTelemetry에 자동 또는 수동 계측을 사용하는지 여부에 따라 다릅니다.

[트레이스 메트릭][7]은 Datadog OTLP 트레이스 수집 엔드포인트로 직접 전송된 트레이스에 대해 기본적으로 계산되지 않습니다. 다음 예시에는 트레이스 메트릭을 활성화하기 위한 `compute_stats=true`가 포함되어 있습니다.

#### 자동 계측 {#automatic-instrumentation}

[OpenTelemetry 자동 계측][3]을 사용하는 경우 다음 환경 변수를 설정하세요.

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},compute_stats=true"
```

#### 수동 계측 {#manual-instrumentation}

OpenTelemetry SDK와 함께 수동 계측을 사용하는 경우, OTLP HTTP Protobuf 익스포터를 프로그래밍 방식으로 구성하세요.

<div class="alert alert-info">사용 중인 <a href="/getting_started/site/">Datadog 사이트</a>에 따라 {{< region-param key=dd_datacenter code="true" >}}, 다음을 <code>${YOUR_ENDPOINT}</code> 아래와 같이 교체합니다 {{< region-param key="otlp_trace_endpoint" code="true" >}}.</div>

{{< tabs >}}
{{% tab "JavaScript" %}}

JavaScript 익스포터는 [`exporter-trace-otlp-proto`][100]입니다. 익스포터를 구성하려면 다음 코드 스니펫을 사용하세요.

```javascript
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');  // OTLP http/protobuf exporter

const exporter = new OTLPTraceExporter({
  url: '${YOUR_ENDPOINT}', // Replace this with the correct endpoint
  headers: {
    'dd-api-key': process.env.DD_API_KEY,
    'dd-otel-span-mapping': '{span_name_as_resource_name: true}',
    'compute_stats': 'true',
  },
});
```
[100]: https://www.npmjs.com/package/@opentelemetry/exporter-trace-otlp-proto

{{% /tab %}}

{{% tab "Java" %}}

Java 익스포터는 [`OtlpHttpSpanExporter`][200]입니다. 익스포터를 구성하려면 다음 코드 스니펫을 사용하세요.

```java
import io.opentelemetry.exporter.otlp.http.trace.OtlpHttpSpanExporter;

OtlpHttpSpanExporter exporter = OtlpHttpSpanExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}") // Replace this with the correct endpoint
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otel-span-mapping", "{span_name_as_resource_name: true}")
    .addHeader("compute_stats", "true")
    .build();
```

[200]: https://javadoc.io/doc/io.opentelemetry/opentelemetry-exporter-otlp-http-trace/

{{% /tab %}}
{{% tab "Go" %}}

Go 익스포터는 [`otlptracehttp`][300]입니다. 익스포터를 구성하려면 다음 코드 스니펫을 사용하세요.

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"

traceExporter, err := otlptracehttp.New(
	ctx,
	otlptracehttp.WithEndpoint("${YOUR_ENDPOINT}"), // Replace this with the correct endpoint
	otlptracehttp.WithURLPath("/v1/traces"),
	otlptracehttp.WithHeaders(
		map[string]string{
			"dd-api-key": os.Getenv("DD_API_KEY"),
			"dd-otel-span-mapping": "{span_name_as_resource_name: true}",
			"compute_stats": "true",
		}),
)
```

[300]: http://go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp

{{% /tab %}}
{{% tab "Python" %}}

Python 익스포터는 [`OTLPSpanExporter`][400]입니다. 익스포터를 구성하려면 다음 코드 스니펫을 사용하세요.

```python
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

exporter = OTLPSpanExporter(
    endpoint="${YOUR_ENDPOINT}", # Replace this with the correct endpoint
    headers={
        "dd-api-key": os.environ.get("DD_API_KEY"),
        "dd-otel-span-mapping": "{span_name_as_resource_name: true}",
        "compute_stats": "true",
    },
)
```

[400]: https://pypi.org/project/opentelemetry-exporter-otlp-proto-http/

{{% /tab %}}
{{< /tabs >}}

### (선택 사항) 스팬 이름 매핑 또는 필터링 {#optional-map-or-filter-span-names}

`dd-otel-span-mapping` 헤더를 사용하여 스팬 매핑 및 필터링을 구성하세요. JSON 헤더에는 다음 필드가 포함되어 있습니다.

- `ignore_resources`: 리소스 이름을 기반으로 트레이스를 비활성화하기 위한 정규식 목록입니다.
- `span_name_remappings`: Datadog 스팬 이름과 선호하는 이름의 매핑입니다.
- `span_name_as_resource_name`: OpenTelemetry 스팬 이름을 Datadog 스팬의 작업 이름으로 사용할지 여부를 지정합니다(기본값: true). false인 경우, 작업 이름은 계측 범위 이름과 스팬 종류의 조합에서 파생됩니다.

예:

```json
{
  "span_name_as_resource_name":false,
  "span_name_remappings":{
    "io.opentelemetry.javaagent.spring.client":"spring.client"
  },
  "ignore_resources":[
    "io.opentelemetry.javaagent.spring.internal"
  ]
}
```
## OpenTelemetry 컬렉터 {#opentelemetry-collector}

[권장 OpenTelemetry 컬렉터 설정][10]을 구성하여 이 엔드포인트로 트레이스를 내보내고 샘플링 전에 APM 트레이스 메트릭을 생성하세요.

## 문제 해결 {#troubleshooting}

### 오류: 403 Forbidden {#error-403-forbidden}

Datadog OTLP 트레이스 수집 엔드포인트로 트레이스를 보낼 때 `403 Forbidden` 오류가 발생하면, 엔드포인트가 Datadog 사이트와 일치하는지 확인하세요. 현재 사이트는 {{< region-param key=dd_datacenter code="true" >}}, 따라서 다음 {{< region-param key="otlp_trace_endpoint" code="true" >}} 엔드포인트를 사용하세요.

### 오류: 413 Request Entity Too Large {#error-413-request-entity-too-large}

Datadog OTLP 트레이스 수집 엔드포인트로 트레이스를 보낼 때 `413 Request Entity Too Large` 오류가 발생하면, 이는 OTLP 익스포터가 보낸 페이로드 크기가 Datadog 트레이스 수집 엔드포인트의 15 MiB 제한(압축되지 않은 상태)을 초과했음을 의미합니다.

이 오류는 일반적으로 OpenTelemetry SDK가 단일 요청 페이로드에 너무 많은 텔레메트리 데이터를 배치할 때 발생합니다.

**해결 방법**: SDK의 배치 스팬 프로세서에서 내보내기 배치 크기를 줄이세요. 다음은 OpenTelemetry Java SDK에서 `BatchSpanProcessorBuilder`를 수정하는 방법의 예입니다.

```java
CopyBatchSpanProcessor batchSpanProcessor =
    BatchSpanProcessor
        .builder(exporter)
        .setMaxExportBatchSize(10)  // Default is 512
        .build();
```
필요에 따라 `setMaxExportBatchSize` 값을 조정하세요. 값이 작을수록 더 작은 페이로드로 더 자주 내보내게 되어 15 MiB 제한을 초과할 가능성이 줄어듭니다.

### 경고: Go에서 "traces export: failed … 202 Accepted" {#warning-traces-export-failed-202-accepted-in-go}


OpenTelemetry Go SDK를 사용 중이고 `traces export: failed … 202 Accepted`와 유사한 경고 메시지가 표시된다면, 이는 OpenTelemetry Go OTLP HTTP 익스포터의 알려진 문제입니다.

OpenTelemetry Go OTLP HTTP 익스포터는 내보내기가 성공하더라도 200 이외의 모든 HTTP 상태 코드를 오류로 처리합니다([Issue 3706][5]). 반면, 다른 OpenTelemetry SDK는 [200, 300) 범위의 모든 상태 코드를 성공으로 간주합니다. Datadog OTLP 트레이스 수집 엔드포인트는 성공적인 내보내기에 대해 `202 Accepted` 상태 코드를 반환합니다.

OpenTelemetry 커뮤니티에서는 다른 `2xx` 상태 코드를 성공으로 처리해야 할지 여부를 여전히 논의 중입니다([Issue 3203][6]).

**해결 방법**: Datadog OTLP 트레이스 수집 엔드포인트를 OpenTelemetry Go SDK와 함께 사용하는 경우, 이 경고 메시지는 무시해도 안전합니다. 경고에도 불구하고 트레이스가 성공적으로 내보내지고 있습니다.

### 문제: 예상치 못한 스팬 작업 이름 {#issue-unexpected-span-operation-names}

Datadog OTLP 트레이스 수집 엔드포인트를 사용할 때 스팬 작업 이름이 Datadog Agent나 OpenTelemetry 컬렉터를 사용할 때 생성되는 이름과 다를 수 있습니다.

Datadog OTLP 트레이스 수집 엔드포인트는 기본적으로 `span_name_as_resource_name` 옵션이 `true`로 설정되어 있습니다. 즉, Datadog은 OpenTelemetry 스팬의 이름을 작업 이름으로 사용합니다. 반면, Datadog Agent와 OpenTelemetry 컬렉터는 이 옵션이 기본적으로 `false`로 설정되어 있습니다.

`span_name_as_resource_name`이 `false`로 설정되면 작업 이름은 계측 범위 이름과 스팬 종류의 조합에서 파생됩니다. 예를 들어, 작업 이름이 `opentelemetry.client`로 나타날 수 있습니다.

**해결 방법**: Datadog OTLP 트레이스 수집 엔드포인트에서 `span_name_as_resource_name` 옵션을 비활성화하여 Datadog Agent 또는 OpenTelemetry 컬렉터의 동작과 일치시키려면 다음 단계를 따르세요.

1. 이 문서의 [스팬 이름 매핑 또는 필터링](#optional-map-or-filter-span-names)을 참조합니다.
1. `dd-otel-span-mapping` 헤더에서 `span_name_as_resource_name` 옵션을 `false`로 설정합니다.

예:

```json
jsonCopy{
  "span_name_as_resource_name": false,
  ...
}
```

이렇게 하면 Datadog OTLP 트레이스 수집 엔드포인트, Datadog Agent 및 OpenTelemetry 컬렉터 전체에서 스팬 작업 이름이 일관되게 유지됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/opentelemetry/collector_exporter/
[2]: /ko/opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/specs/otel/glossary/#automatic-instrumentation
[5]: https://github.com/open-telemetry/opentelemetry-go/issues/3706
[6]: https://github.com/open-telemetry/opentelemetry-specification/issues/3203
[7]: /ko/tracing/metrics/
[8]: /ko/opentelemetry/setup/otlp_ingest/serverless/
[9]: /ko/opentelemetry/setup/otlp_ingest/managed_platforms/
[10]: /ko/opentelemetry/setup/collector_exporter/