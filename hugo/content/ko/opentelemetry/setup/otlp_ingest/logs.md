---
aliases:
- /ko/opentelemetry/otlp_logs
- /ko/opentelemetry/setup/intake_endpoint/otlp_logs
- /ko/opentelemetry/setup/agentless/logs
further_reading:
- link: https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/
  tag: 외부 사이트
  text: 일반 OpenTelemetry SDK 구성
- link: https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/
  tag: 외부 사이트
  text: OpenTelemetry 환경 변수 사양
- link: https://opentelemetry.io/docs/reference/specification/protocol/exporter/
  tag: 외부 사이트
  text: OpenTelemetry 프로토콜 익스포터
title: Datadog OTLP 로그 수집 엔드포인트
---
## 개요 {#overview}

Datadog의 OpenTelemetry 프로토콜(OTLP) 로그 수집 API 엔드포인트를 사용하면 애플리케이션, 관리형 플랫폼 및 OpenTelemetry Collector가 OTLP HTTP를 통해 Datadog으로 로그를 보낼 수 있습니다.

[Datadog Agent][2] 또는 OpenTelemetry Collector 없이 로그를 보내야 할 때는 이 페이지의 직접 구성을 사용하세요. 프로덕션 컬렉터 배포의 경우 [OpenTelemetry Collector 설정][1]을 사용하세요.

<div class="alert alert-info">관리형 플랫폼(Cloudflare, Vercel, Heroku 등)에서 로그를 보내는 경우 올바른 엔드포인트 구성은 <a href="/opentelemetry/setup/otlp_ingest/managed_platforms/">관리형 플랫폼</a>을 참조하세요.</div>

## 구성 {#configuration}

Datadog OTLP 로그 수집 엔드포인트로 OTLP 데이터를 보내려면 OTLP HTTP Protobuf 익스포터를 구성해야 합니다. 프로세스는 OpenTelemetry에 자동 또는 수동 계측을 사용하는지 여부에 따라 다릅니다.

<div class="alert alert-info">사용 중인 <a href="/getting_started/site/">Datadog 사이트</a>가 {{< region-param key=dd_datacenter code="true" >}}: 다음 예시에서 <code>${YOUR_ENDPOINT}</code> 값을 {{< region-param key="otlp_logs_endpoint" code="true" >}} 엔드포인트로 바꾸세요.</div>

#### 자동 계측 {#automatic-instrumentation}

[OpenTelemetry 자동 계측][3]을 사용하는 경우 다음 환경 변수를 설정하세요.

```shell
export OTEL_EXPORTER_OTLP_LOGS_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_LOGS_ENDPOINT="${YOUR_ENDPOINT}" // Replace this with the correct endpoint
export OTEL_EXPORTER_OTLP_LOGS_HEADERS="dd-api-key=${DD_API_KEY}"
```

#### 수동 계측 {#manual-instrumentation}

OpenTelemetry SDK와 함께 수동 계측을 사용하는 경우, 다음 예제를 사용하여 OTLP HTTP Protobuf 익스포터를 프로그래밍 방식으로 구성하세요.

<div class="alert alert-info">JavaScript 및 Python에 대한 OpenTelemetry SDK 로그 지원은 개발 중입니다. 최신 상태는 <a href="https://opentelemetry.io/docs/languages/#status-and-releases">OpenTelemetry 상태 및 릴리스</a>를 참조하세요.</div>

{{< tabs >}}
{{% tab "Java" %}}
Java 익스포터는 `OtlpHttpLogRecordExporter`입니다. 익스포터를 구성하려면 다음 코드 스니펫을 사용하세요.

```java
import io.opentelemetry.exporter.otlp.http.logs.OtlpHttpLogRecordExporter;

OtlpHttpLogRecordExporter exporter = OtlpHttpLogRecordExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}") // Replace this with the correct endpoint
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .build();
```
{{% /tab %}}

{{% tab "Go" %}}
Go 익스포터는 `otlploghttp`입니다. 익스포터를 구성하려면 다음 코드 스니펫을 사용하세요.

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlplog/otlploghttp"

logExporter, err := otlploghttp.New(
    ctx,
    otlploghttp.WithEndpointURL("${YOUR_ENDPOINT}"), // Replace this with the correct endpoint, minus the URL path
    otlploghttp.WithURLPath("/v1/logs"),
    otlploghttp.WithHeaders(
        map[string]string{
            "dd-api-key": os.Getenv("DD_API_KEY"),
        }),
)
```
{{% /tab %}}
{{< /tabs >}}

## OpenTelemetry Collector {#opentelemetry-collector}

사용 중인 OpenTelemetry Collector 배포판에 Datadog의 권장 Collector 설정에서 사용하는 모든 구성 요소가 포함되어 있지 않은 경우 자체 배포판에서 OTLP HTTP 익스포터를 구성하세요.

이러한 예시에서는 OpenTelemetry Collector Contrib v0.154.0의 구성 요소 식별자를 사용합니다. 다른 버전이나 배포판의 경우 해당 배포판이 지원하는 식별자를 사용하세요.

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318

exporters:
  otlp_http:
    logs_endpoint: {{< region-param key="otlp_logs_endpoint" >}}
    headers:
      dd-api-key: ${env:DD_API_KEY}

service:
  pipelines:
    logs:
      receivers: [otlp]
      exporters: [otlp_http]
```

Collector 배포판에 필요한 수신기와 프로세서를 추가합니다.

OpenTelemetry Collector Contrib을 사용하는 프로덕션 배포의 경우 [권장 OpenTelemetry Collector 설정][1]을 사용하세요. 또한 전송 큐 배치 처리, 리소스 탐지 및 호스트 메타데이터 강화를 구성합니다.

## 로그 처리 구성(선택 사항) {#configure-log-processing-optional}

`dd-otel-log-config` 헤더를 사용하여 Datadog이 수집 시 OTLP 로그 레코드를 처리하는 방법을 구성하세요. 헤더 값은 다음 필드를 포함하는 JSON 객체입니다.

`keep_raw_message`
: **유형**: 불리언<br>
**기본값**: `false`<br>
**설명**: 기본적으로 Datadog은 JSON 로그 본문을 로그 속성으로 구문 분석하여 메시지에 대해 전체 텍스트 검색을 실행하는 대신 개별 필드(예: `@key:value`)를 검색할 수 있도록 합니다. `keep_raw_message`가 `true`로 설정된 경우, Datadog은 본문을 구문 분석하지 않고 `message` 속성에 문자열로 유지합니다. 로그 파이프라인에서 로그 메시지를 사용자 지정 구문 분석하거나 JSON 본문의 필드가 기존 로그 속성과 충돌하는 경우 이 옵션을 사용하세요.

예를 들어, JSON 로그 본문을 원시 문자열로 유지하려면 다음과 같이 합니다.

```json
{
  "keep_raw_message": true
}
```

`dd-api-key`와 함께 OTLP 요청에 헤더를 설정합니다. 예를 들어, 자동 계측을 사용하는 경우에는 다음과 같습니다.

```shell
export OTEL_EXPORTER_OTLP_LOGS_HEADERS="dd-api-key=${DD_API_KEY},dd-otel-log-config={\"keep_raw_message\":true}"
```

수동 계측의 경우, 내보내기 구성에 헤더를 추가합니다. 예를 들어, Java에서는 다음과 같습니다.

```java
import io.opentelemetry.exporter.otlp.http.logs.OtlpHttpLogRecordExporter;

OtlpHttpLogRecordExporter exporter = OtlpHttpLogRecordExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}")
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otel-log-config", "{\"keep_raw_message\": true}")
    .build();
```

OpenTelemetry Collector에서는 `otlp_http` 익스포터의 `headers` 아래에 헤더를 추가합니다.

```yaml
exporters:
  otlp_http:
    logs_endpoint: {{< region-param key="otlp_logs_endpoint" >}}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      dd-otel-log-config: '{"keep_raw_message": true}'
```

## 문제 해결 {#troubleshooting}

### 오류: 403 Forbidden {#error-403-forbidden}

Datadog OTLP 로그 수집 엔드포인트로 로그를 보낼 때 `403 Forbidden` 오류가 발생하면, 이는 1가지 잠재적인 문제를 나타냅니다.

- 엔드포인트 URL이 조직에 대해 올바르지 않습니다.  
   **해결 방법**: 조직에 맞는 올바른 메트릭 수집 엔드포인트 URL을 사용하세요. 현재 사이트는 {{< region-param key=dd_datacenter code="true" >}}이므로, {{< region-param key="otlp_logs_endpoint" code="true" >}} 엔드포인트를 사용해야 합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/opentelemetry/collector_exporter/
[2]: /ko/opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/specs/otel/glossary/#automatic-instrumentation