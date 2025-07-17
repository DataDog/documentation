---
aliases:
- /ko/tracing/trace_collection/otel_instrumentation/nodejs/
- /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/nodejs
code_lang: otel
code_lang_weight: 2
description: OpenTelemetry API를 사용하여 Node.js 애플리케이션을 계측하고 Datadog로 트레이스를 전송합니다.
further_reading:
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 탐색
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: 설명서
  text: OpenTelemetry API 상호 운용성 및 Datadog의 계측된 트레이스
title: OpenTelemetry API를 사용한 Node.js 커스텀 계측
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}


## 설정

OpenTelemetry를 설정하여 Datadog 트레이스 공급자를 사용하려면,

1. [OpenTelemetry Node.js 수동 계측 설명서][1]에 따라 원하는 수동 OpenTelemetry 계측을 Node.js 코드에 추가하세요. **참고**: 해당 지침에 따라 코드가 OpenTelemetry SDK를 호출해야 하는 경우, 대신 Datadog 추적 라이브러리 을 호출하세요.

2. package.json에 `dd-trace` 모듈을 추가합니다.

    ```sh
    npm install dd-trace
    ```

3. 애플리케이션에서 `dd-trace` 모듈을 초기화합니다.

    ```js
    const tracer = require('dd-trace').init({
      // ...
    })
    ```

4. `tracer`에서 `TracerProvider`를 가져옵니다.

    ```js
    const { TracerProvider } = tracer
    ```

5. `TracerProvider`를 만들고 등록합니다.

    ```js
    const provider = new TracerProvider()
    provider.register()
    ```

6. OpenTelemetry API를 가져와 OpenTelemetry 트레이서 인스턴스를 생성합니다.

    ```js
    const ot = require('@opentelemetry/api')
    const otelTracer = ot.trace.getTracer(
      'my-service'
    )
    ```

7. 애플리케이션을 실행합니다.

Datadog는 이러한 OpenTelemetry 스팬(span)과 다른 Datadog 애플리케이션 성능 모니터링(APM) 스팬(span)을 단일 애플리케이션 트레이스로 결합합니다. 또한 [통합 계측][2] 및 [OpenTelemetry 자동 계측][3]도 지원합니다.

## 스팬(span) 태그 추가하기

스팬(span)에 커스텀 속성을 추가하여 추가 컨텍스트를 제공합니다.

{{< highlight js "hl_lines=6" >}}
function processData(i, param1, param2) {
  return tracer.startActiveSpan(`processData:${i}`, (span) => {
    const result = someOperation(param1, param2);

    // Add an attribute to the span
    span.setAttribute('app.processedData', result.toString());

    span.end();
    return result;
    });
}
{{< /highlight >}}

## 스팬(span) 생성하기

새로운 스팬(span)을 생성하고 제대로 닫으려면 `startActiveSpan` 메서드를 사용합니다.

{{< highlight js "hl_lines=3 9" >}}
function performTask(iterations, param1, param2) {
  // Create a span. A span must be closed.
  return tracer.startActiveSpan('performTask', (span) => {
    const results = [];
    for (let i = 0; i < iterations; i++) {
      results.push(processData(i, param1, param2));
    }
    // Be sure to end the span!
    span.end();
    return results;
  });
}
{{< /highlight >}}

## 요청 필터링하기

경우에 따라 상태 점검 또는 신서틱(Synthetic) 트래픽과 같은 특정 요청을 계측 대상에서 제외할 수 있습니다. `http` 플러그인에서 `blocklist` 또는 `allowlist` 옵션을 사용하여 이러한 요청을 무시할 수 있습니다.

애플리케이션 수준에서 요청을 제외하려면 트레이서를 초기화한 후 다음을 추가합니다.

```javascript
// at the top of the entry point right after tracer.init()
tracer.use('http', {
  blocklist: ['/health', '/ping']
})
```

필요한 경우 클라이언트와 서버 간 설정을 분리할 수도 있습니다.

```javascript
tracer.use('http', {
  server: {
    blocklist: ['/ping']
  }
})
```

또한 리소스 이름에 따라 트레이스를 제외하여 에이전트가 Datadog로 리소스를 보내지 않도록 할 수 있습니다. 보안 및 에이전트 설정 조정에 대한 자세한 내용은 [보안][4] 또는 [원치 않는 리소스 무시][5]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/js/instrumentation/
[2]: /ko/tracing/trace_collection/dd_libraries/nodejs#integration-instrumentation
[3]: https://opentelemetry.io/docs/instrumentation/js/automatic/
[4]: /ko/tracing/security
[5]: /ko/tracing/guide/ignoring_apm_resources/