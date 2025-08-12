---
aliases:
- /ko/tracing/trace_collection/otel_instrumentation/java/
- /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/java
code_lang: otel
code_lang_weight: 2
description: OpenTelemetry API를 사용하여 자바 애플리케이션을 계측하고 Datadog로 트레이스를 전송합니다.
further_reading:
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 탐색
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: 설명서
  text: OpenTelemetry API 상호 운용성 및 Datadog의 계측된 트레이스
title: OpenTelemetry API를 사용한 자바(Java) 커스텀 계측
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}

## 설정

<div class="alert alert-info">OpenTelemetry는 자바 버전 1.24.0 이후 이상에서 지원됩니다.</div>

OpenTelemetry를 설정하여 Datadog 트레이스 공급자를 사용하려면,

1. 자동-계측 및 설정에 대한 지침을 아직 읽지 않았다면 [자바 설정 지침][15]부터 시작하세요.

1. OpenTelemetry SDK가 아닌 OpenTelemetry API만 사용하는 것을 기억하세요.

1. `dd.trace.otel.enabled` 시스템 속성 또는 `DD_TRACE_OTEL_ENABLED` 환경 변수를 `true`로 설정합니다.

## 스팬(span) 태그 추가하기

### 커스텀 스팬(span) 태그 추가
애플리케이션 코드 내의 동적 값(예: `customer.id`)에 해당하는 스팬(span)에 커스텀 태그를 추가합니다.

```java
import io.opentelemetry.api.trace.Span;

public void doSomething() {
  Span span = Span.current();
  span.setAttribute("user-name", "Some User");
}
```

### 모든 스팬(span)에 글로벌 태그 추가

`dd.tags` 속성을 사용하면 애플리케이션에 대해 생성된 모든 스팬(span)에 태그를 설정할 수 있습니다. 애플리케이션, 데이터 센터 또는 Datadog에서 확인히려는 다른 태그의 통계를 그룹화하는 데 유용합니다.

```shell
java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
    -Ddd.tags=datacenter:njc,<TAG_KEY>:<TAG_VALUE> \
    -jar <YOUR_APPLICATION_PATH>.jar

```

### 하위 스팬에서 루트 스팬의 오류 설정하기

하위 스팬에서 루트 스팬의 오류를 설정하려면 이와 같이 현재 스팬에서 `setStatus` 메서드를 사용할 수 있습니다.

```java
import static io.opentelemetry.api.trace.StatusCode.ERROR;
import io.opentelemetry.api.trace.Span;

public void doSomething() {
  Span span = Span.current();
  span.setStatus(ERROR, "Some error details...");
}
```

### 하위 스팬에서 루트 스팬에 태그와 오류 설정하기

이 예는 하위 스팬에서 루트 스팬에 태그와 오류를 설정하는 방법을 보여줍니다.

```java
import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Context;
import io.opentelemetry.context.ContextKey;
import io.opentelemetry.context.Scope;
import io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.resources.Resource;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;
import io.opentelemetry.semconv.ResourceAttributes;
import java.util.concurrent.TimeUnit;

public class Example {

  private final static ContextKey<Span> CONTEXT_KEY =
    ContextKey.named("opentelemetry-traces-local-root-span");

  public void begin() {
    tracer = GlobalOpenTelemetry.getTracer("my-scope", "0.1.0");
    Span parentSpan = tracer.spanBuilder("begin").startSpan();
    try (Scope scope = parentSpan.makeCurrent()) {
      createChildSpan();
    } finally {
      parentSpan.end();
    }
  }

  private void createChildSpan() {
    Span childSpan = tracer.spanBuilder("child-span").startSpan();
    try {
      Span rootSpan = Context.current().get(CONTEXT_KEY);
        if (null != rootSpan) {
          rootSpan.setAttribute("my-attribute", "my-attribute-value");
          rootSpan.setStatus(StatusCode.ERROR, "Some error details...");
        } 
    } finally {
      childSpan.end();
    }
  }

}
```

## 스팬(span) 추가

[지원되는 프레임워크 계측][17]를 사용하지 않거나 애플리케이션의 [트레이스][16]에 깊이를 더하고 싶은 경우, 코드에 커스텀 계측을 추가하여 완전한 불꽃 그래프를 보거나 코드 조각들의 실행 시간을 측정할 수 있습니다.

애플리케이션 코드를 수정할 수 없는 경우 환경 변수 dd.trace 메서드를 사용하여 이러한 메서드를 구체화합니다.

기존 @트레이스 또는 이와 유사한 주석이 있는 경우나 주석을 사용하여 Datadog 내에서 불완전한 트레이스를 완성하려는 경우, 트레이스 주석을 사용하세요.

트레이스는 또한 [트레이스 주석](#trace-annotations)에서 설명된 대로 OpenTelemetry `@WithSpan` 주석을 사용하여 생성할 수도 있습니다.

### 트레이스 주석

메서드에 `@WithSpan` 을 추가하여 OpenTelemetry 및 `dd-java-agent.jar`을 실행할 때 추적하도록 합니다. 에이전트가 첨부되지 않은 경우 이 주석은 애플리케이션에 영향을 미치지 않습니다.
OpenTelemetry의 `@WithSpan` 주석은 `opentelemetry-instrumentation-annotations` 종속성으로 제공됩니다.

```java
import io.opentelemetry.instrumentation.annotations.WithSpan;

public class SessionManager {

  @WithSpan
  public static void saveSession() {
    // your method implementation here
  }
}
```

### 신규 스팬(span) 수동 생성

현재 트레이스 컨텍스트 내에서 새로운 스팬을 수동으로 생성하려면 다음을 수행하세요.

```java
import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Scope;
import io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.resources.Resource;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;
import io.opentelemetry.semconv.ResourceAttributes;
import java.util.concurrent.TimeUnit;

public class Example {

  public void doSomething() {
    Tracer tracer = GlobalOpenTelemetry.getTracer("my-scope", "0.1.0");
    Span span = tracer.spanBuilder("my-resource").startSpan();
    try (Scope scope = span.makeCurrent()) {
      // do some work
    } catch (Throwable t) {
      span.recordException(t);
      throw t;
    } finally {
      span.end();
    }
  }

}
```

## 트레이스 클라이언트 및 에이전트 설정

추적 클라이언트 및 Datadog 에이전트 모두 컨텍스트 전파를 위한 추가 설정 옵션을 제공합니다. 상태 점검과 관련된 트레이스 등 트레이스가 산출된 메트릭에 포함되지 않도록 하려면, 특정 리소스를 제외하여 트레이스를 Datadog에 전송하지 않을 수도 있습니다.

### 헤더를 추출 및 삽입하여 컨텍스트 전파

헤더를 삽입하고 추출하여 분산된 트레이스 컨텍스트 전파를 설정할 수 있습니다. 자세한 내용은 [트레이스 컨텍스트 전파][18]를 참조하세요.

### 리소스 필터링

트레이스는 리소스 이름을 기준으로 제외할 수 있습니다. 이를 통해 상태 점검과 같은 신서틱(Synthetic) 트래픽을 제거하여 Datadog에 트레이스를 보고하지 않도록 할 수 있습니다. 이와 더불어 보안 및 설정 조정은 [보안][19] 또는 [원치 않는 리소스 무시][20]를 참조할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[15]: /ko/tracing/setup/java/
[16]: /ko/tracing/glossary/#trace
[17]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget#compatibility
[18]: /ko/tracing/trace_collection/trace_context_propagation/java/
[19]: /ko/tracing/security
[20]: /ko/tracing/guide/ignoring_apm_resources/