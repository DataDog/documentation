---
further_reading:
- link: /opentelemetry/compatibility/
  tag: 설명서
  text: Datadog과 OpenTelemetry 호환성
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: 설명서
  text: 사용자 지정 OpenTelemetry 구성 요소 사용
- link: /opentelemetry/instrument/
  tag: 설명서
  text: OpenTelemetry를 사용하여 애플리케이션 계측
title: OpenTelemetry를 사용하여 지원되지 않는 런타임 계측
---
## 개요 {#overview}

애플리케이션의 런타임이 [Datadog SDK][1]에서 기본적으로 지원되지 않는 경우, OpenTelemetry SDK를 사용하여 Datadog으로 텔레메트리를 보낼 수 있습니다. 이 접근 방식을 사용하면 기본 런타임 지원을 기다릴 필요 없이 트레이스와 메트릭을 얻을 수 있습니다.

이 가이드에서는 예시로 [Bun][2] 애플리케이션을 계측하는 방법을 살펴봅니다. Bun은 대부분의 Node.js API와 호환되므로 [OpenTelemetry Node.js SDK][3]를 사용하여 Bun 애플리케이션을 계측할 수 있습니다. OpenTelemetry SDK와 호환되는 다른 지원되지 않는 런타임에도 동일한 패턴을 적용할 수 있습니다.

## 지원 수준 {#support-level}

<div class="alert alert-info">
이 가이드는 <strong>사용자 지정 구성 요소</strong> <a href="/opentelemetry/compatibility/#support-levels">지원 수준</a>에 해당합니다. Datadog은 이 문서를 시작점으로 제공하지만, 런타임의 기능이나 그 안에서 OpenTelemetry SDK의 동작을 직접 지원하지는 않습니다. 런타임 관련 이슈는 <a href="https://opentelemetry.io/community/">OpenTelemetry 커뮤니티</a> 또는 런타임 관리자에게 문의하세요.
</div>

## 전제 조건 {#prerequisites}

- Datadog으로 데이터를 보내도록 구성된 OpenTelemetry 호환 백엔드. DDOT Collector, Datadog Exporter가 포함된 OTel Collector 또는 직접 OTLP 수집을 포함한 설정 옵션은 [Datadog으로 OpenTelemetry 데이터 전송][4]을 참조하세요.
- [Bun][2] 설치됨(v1.0 이상).
- 계측하려는 Bun 애플리케이션.

## Bun 애플리케이션 계측 {#instrument-a-bun-application}

### OpenTelemetry 패키지 설치 {#install-opentelemetry-packages}

프로젝트의 루트 디렉터리에서 필요한 OpenTelemetry 패키지를 설치합니다.

```shell
bun add @opentelemetry/api \
  @opentelemetry/sdk-node \
  @opentelemetry/sdk-metrics \
  @opentelemetry/auto-instrumentations-node \
  @opentelemetry/exporter-trace-otlp-http \
  @opentelemetry/exporter-metrics-otlp-http \
  @opentelemetry/resources \
  @opentelemetry/semantic-conventions
```

### 텔레메트리 초기화 모듈 생성 {#create-a-telemetry-initialization-module}

Node.js에서 OpenTelemetry는 일반적으로 `--require` 플래그를 통해 로드되며, 이때 애플리케이션 코드가 실행되기 전에 계측을 미리 로드합니다. Bun의 모듈 확인 시스템은 다르게 작동하므로 대신 프로그래밍 방식으로 OpenTelemetry를 초기화해야 합니다.

OpenTelemetry Node.js SDK를 구성하는 `tracing.ts` 파일을 만듭니다:

{{< code-block lang="typescript" filename="tracing.ts" >}}
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || '<YOUR_SERVICE_NAME>',
  [ATTR_SERVICE_VERSION]: process.env.OTEL_SERVICE_VERSION || '1.0.0',
  'telemetry.sdk.runtime': 'bun',
});

const sdk = new NodeSDK({
  resource,
  traceExporter: new OTLPTraceExporter(),
  metricReaders: [new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
  })],
  instrumentations: [getNodeAutoInstrumentations({
    // Disable fs instrumentation to avoid compatibility issues with Bun
    '@opentelemetry/instrumentation-fs': { enabled: false },
  })],
});

sdk.start();

process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry SDK shut down'))
    .catch((err) => console.error('Error shutting down OpenTelemetry SDK', err))
    .finally(() => process.exit(0));
});
{{< /code-block >}}

`<YOUR_SERVICE_NAME>`을 애플리케이션의 서비스 이름으로 바꿉니다.

### 애플리케이션 진입점에서 텔레메트리 초기화 {#initialize-telemetry-at-your-application-entry-point}

`tracing.ts` 모듈을 다른 애플리케이션이 가져오기 **전에** 먼저 가져옵니다. 자동 계측을 위해 라이브러리를 패치하려면 OpenTelemetry SDK가 먼저 초기화되어야 합니다.

{{< code-block lang="typescript" filename="index.ts" >}}
import './tracing';

// Import your application code after tracing is initialized
import { startApp } from './app';

startApp();
{{< /code-block >}}

### 환경 변수 구성 {#configure-environment-variables}

OTLP 내보내기 엔드포인트와 서비스 식별자를 구성하려면 다음 환경 변수를 설정하세요.

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_SERVICE_NAME="<YOUR_SERVICE_NAME>"
```

`OTEL_EXPORTER_OTLP_ENDPOINT` 값은 설정에 따라 달라집니다.
- **로컬 수집기**(DDOT 또는 OTel Collector): `http://localhost:4318` (기본 HTTP) 또는 `http://localhost:4317`(gRPC)
- **원격 수집기**: 수집기의 주소와 포트를 사용합니다.

추가 구성 옵션은 [OpenTelemetry 환경 변수 사양][5]을 참조하세요.

### 애플리케이션 실행{#run-your-application}

Bun 애플리케이션을 시작합니다.

```shell
bun run index.ts
```

### Bun 네이티브 API에 대한 수동 계측 추가{#add-manual-instrumentation-for-bun-native-apis}

`Bun.serve()`, `bun:sqlite` 및 네이티브 파일 I/O API와 같은 내장 Bun API는 자동으로 계측되지 않습니다. 이러한 API에서 텔레메트리를 캡처하려면 `@opentelemetry/api` 패키지를 사용하여 수동으로 스팬을 생성합니다.

다음 예시는 `Bun.serve()` 경로 핸들러를 사용자 지정 스팬으로 래핑합니다.

{{< code-block lang="typescript" filename="server.ts" >}}
import { trace, SpanKind } from '@opentelemetry/api';

const tracer = trace.getTracer('bun-app');

export function startServer() {
  Bun.serve({
    port: 3000,
    fetch(req) {
      return tracer.startActiveSpan('handleRequest', { kind: SpanKind.SERVER }, (span) => {
        try {
          span.setAttribute('http.method', req.method);
          span.setAttribute('http.url', req.url);
          return new Response('Hello from Bun!');
        } finally {
          span.end();
        }
      });
    },
  });
}
{{< /code-block >}}

더 많은 수동 계측 패턴은 [OpenTelemetry JS 계측 문서][7]를 참조하세요.

### Datadog에서 트레이스 확인 {#verify-traces-in-datadog}

애플리케이션이 몇 가지 요청을 처리한 후:

1. Datadog에서 [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][6]로 이동합니다.
2. 서비스 이름을 검색합니다.
3. 예상되는 스팬 및 메타데이터와 함께 트레이스가 나타나는지 확인합니다.

## 제한 사항 {#limitations}

- **자동 계측 적용 범위**: OpenTelemetry Node.js 자동 계측 라이브러리는 Bun의 Node.js 호환성 계층을 사용합니다. 가장 일반적인 라이브러리(HTTP 클라이언트, Express, 데이터베이스 드라이버)는 작동하지만 일부 계측 패키지는 예상대로 작동하지 않을 수 있습니다.
- **Bun 네이티브 API**: `Bun.serve()`, `bun:sqlite` 및 네이티브 파일 I/O API와 같은 내장 Bun API는 자동으로 계측되지 않습니다. 예시는 [Bun 네이티브 API에 대한 수동 계측 추가](#add-manual-instrumentation-for-bun-native-apis)를 참조하세요.
- **라이브러리 호환성**: 모든 Node.js 계측 라이브러리가 Bun에서 작동한다고 보장할 수는 없습니다. 특정 종속성을 테스트하고 `getNodeAutoInstrumentations()`에 구성 옵션을 전달하여 오류를 일으키는 계측을 비활성화합니다. `@opentelemetry/instrumentation-fs` 패키지는 이슈의 일반적인 소스이므로 위의 예시 구성에서는 비활성화되어 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/
[2]: https://bun.com/docs/installation
[3]: https://opentelemetry.io/docs/languages/js/getting-started/nodejs/
[4]: /ko/opentelemetry/setup/
[5]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/
[6]: https://app.datadoghq.com/apm/traces
[7]: https://opentelemetry.io/docs/languages/js/instrumentation/