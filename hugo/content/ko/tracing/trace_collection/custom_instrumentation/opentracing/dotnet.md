---
aliases:
- /ko/tracing/setup_overview/open_standards/dotnet
- /ko/tracing/trace_collection/open_standards/dotnet
- /ko/tracing/trace_collection/opentracing/dotnet/
code_lang: dotnet
code_lang_weight: 70
description: .NET용 OpenTracing 계측
further_reading:
- link: tracing/trace_collection/trace_context_propagation/dotnet/
  text: 트레이스 컨텍스트 전파
title: .NET OpenTracing 계측
type: multi-code-lang
---

<div class="alert alert-info">OpenTracing은 지원 중단된 사양에 기반해 지원됩니다. 공개 사양으로 코드를 계측하고 싶다면 대신 OpenTelemetry를 사용하세요. <a href="/tracing/trace_collection/otel_instrumentation/dotnet/">Datadog 추적 라이브러리에서 OpenTelemetry의 데이터 처리 베타 지원</a>을 받아보세요.</div>

자세한 정보는 [OpenTracing API][1]를 참고하세요.

## 설정
OpenTracing API 지원을 받으려면 애플리케이션에 `Datadog.Trace.OpenTracing` [NuGet 패키지][2]를 추가하세요. 애플리케이션 시작 시에 OpenTracing SDK를 초기화하세요.

```csharp
using Datadog.Trace.OpenTracing;

public void ConfigureServices(IServiceCollection services)
{
    // 기본 설정으로 OpenTracing ITracer를 생성
    OpenTracing.ITracer tracer = OpenTracingTracerFactory.CreateTracer();

    // ASP.NET Core 종속성을 삽입해 트레이서 사용
    services.AddSingleton<ITracer>(tracer);

    // OpenTracing.GlobalTracer.Instance와 함께 트레이서 사용
    GlobalTracer.Register(tracer);
}
```

## 메서드 수동으로 계측

OpenTracing을 사용해 스팬 생성

```csharp
using (IScope scope = GlobalTracer.Instance.BuildSpan("manual.sortorders").StartActive(finishSpanOnDispose: true))
{
    scope.Span.SetTag("resource.name", "<RESOURCE NAME>");
    SortOrders();
}
```

## 비동기 트레이스

비동기 작업에서 실행 중인 코드를 추적하려면 동기 코드를 래핑할 때와 동일하게 백그라운드 작업 내에서 새 범위를 생성하세요.
```csharp
 Task.Run(
     () =>
     {
         using (IScope scope = GlobalTracer.Instance.BuildSpan("manual.sortorders").StartActive(finishSpanOnDispose: true))
         {
             scope.Span.SetTag("resource.name", "<RESOURCE NAME>");
             SortOrders();
         }
     });

```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/opentracing/opentracing-csharp
[2]: https://www.nuget.org/packages/Datadog.Trace.OpenTracing