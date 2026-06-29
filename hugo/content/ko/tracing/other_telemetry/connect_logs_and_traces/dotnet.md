---
aliases:
- /ko/tracing/connect_logs_and_traces/dotnet
code_lang: dotnet
code_lang_weight: 60
description: .NET 로그와 트레이스를 연결하여 Datadog에서 상호 연결합니다.
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: 설명서
  text: 애플리케이션을 수동으로 계측하여 트레이스를 생성합니다.
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 둘러보기
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: 블로그
  text: 로그 요청을 트레이스와 자동으로 상호 연결
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: 가이드
  text: 제품 간 상관관계를 활용한 간편하게 문제를 해결합니다.
title: .NET 로그와 트레이스 상호 연결
type: multi-code-lang
---
로깅 라이브러리와 .NET 트레이싱 구성을 설정하여 트레이스 및 스팬 ID가 애플리케이션 로그에 주입되도록 하세요. 이를 통해 로그 데이터와 애플리케이션 성능 모니터링 데이터를 상호 연결하여 확인할 수 있습니다.

애플리케이션 트레이스와 로그를 상호 연결하여 확인할 때 최적의 사용 경험과 유용한 컨텍스트를 얻을 수 있도록 [Unified Service Tagging][1]으로 .NET 트레이서를 구성하세요.

.NET 트레이서는 다음과 같은 로깅 라이브러리를 지원합니다.
- [Serilog][2](v1.4+)
- [log4net][3]
- [NLog][4]
- [Microsoft.Extensions.Logging][5](v1.28.6에서 추가됨)

## 로그 수집 구성 {#configure-log-collection}

로그 수집이 Datadog Agent에 구성되어 있고, 지정된 파일을 테일링을 위한 [로그 에이전트 구성][15]이 `source: csharp`로 설정되어 있어 로그 파이프라인이 로그 파일을 구문 분석할 수 있도록 합니다. 자세한 내용은 [C# 로그 수집][7]을 참조하세요. `source`가 `csharp` 이외의 값으로 설정된 경우, 상호 연결이 올바르게 작동하도록 적절한 로그 처리 파이프라인에 [트레이스 리매퍼][8]를 추가해야 할 수 있습니다.

<div class="alert alert-danger">자동 로그 수집은 JSON 형식으로 된 로그에만 적용됩니다. 또는 사용자 정의 구문 분석 규칙을 사용하세요.</div>

## 로그에 주입 구성 {#configure-injection-in-logs}

로그 메시지에 상관관계 식별자를 주입하려면 로그 라이브러리에 대한 지침을 따르세요.

<div class="alert alert-info">
  추가 예시는 <a href="https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/AutomaticTraceIdInjection">dd-trace-dotnet의 샘플</a>을 참조하세요.
</div>

{{< tabs >}}
{{% tab "Serilog" %}}

<div class="alert alert-danger">
  <strong>참고: </strong>.NET 트레이서 버전 2.0.1부터는 Serilog 로깅 라이브러리에 대한 자동 주입을 사용하려면 애플리케이션이 자동 계측되어 있어야 합니다.
</div>

로그 메시지에 상관관계 식별자를 자동으로 주입하는 방법은 다음과 같습니다.

1. 다음 트레이서 설정으로 .NET 트레이서를 구성하세요.
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. 앱의 자동 계측 추적을 활성화하려면 [.NET Tracer 설치 지침][1]을 따르세요.

[1]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/dotnet-core/
{{% /tab %}}
{{% tab "log4net" %}}

<div class="alert alert-danger">
  <strong>참고: </strong>.NET 트레이서 버전 1.29.0부터는 log4net 로깅 라이브러리에 대한 자동 주입을 사용하려면 애플리케이션이 자동 계측되어 있어야 합니다.
</div>

로그 메시지에 상관관계 식별자를 자동으로 주입하는 방법은 다음과 같습니다.

1. 다음 트레이서 설정으로 .NET 트레이서를 구성하세요.
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. 앱의 자동 계측 추적을 활성화하려면 [.NET Tracer 설치 지침][1]을 따르세요.

3. 로깅 출력에 `dd.env`, `dd.service`, `dd.version`, `dd.trace_id`, 및 `dd.span_id` 로그 속성을 추가하세요. 이 속성들은 _개별적으로_ 포함하거나 _모든_ 로그 속성을 포함하는 방식으로 추가할 수 있습니다. 두 가지 접근 방식은 다음 예제 코드에서 확인할 수 있습니다.

```xml
  <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
    <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
    <default />
    <!--explicit default members-->
    <remove value="ndc" />
    <!--remove the default preformatted message member-->
    <remove value="message" />
    <!--add raw message-->
    <member value="message:messageobject" />

    <!-- Include Datadog properties -->
    <!-- EITHER Include individual properties with value='<property_name>' -->
    <member value='dd.env' />
    <member value='dd.service' />
    <member value='dd.version' />
    <member value='dd.trace_id' />
    <member value='dd.span_id' />
    <!-- OR Include all properties with value='properties' -->
    <member value='properties'/>
  </layout>
```
추가 예제는 GitHub의 [log4net 자동 트레이스 ID 주입 프로젝트][2]를 참조하세요.


[1]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/Log4NetExample/log4net.config
{{% /tab %}}
{{% tab "NLog" %}}

<div class="alert alert-danger">
  <strong>참고: </strong>.NET 트레이서 버전 2.0.1부터는 NLog 로깅 라이브러리에 대한 자동 주입을 사용하려면 애플리케이션이 자동 계측되어 있어야 합니다.
</div>

로그 메시지에 상관관계 식별자를 자동으로 주입하는 방법은 다음과 같습니다.

1. 다음 트레이서 설정으로 .NET 트레이서를 구성하세요.
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. 앱의 자동 계측 추적을 활성화하려면 [.NET Tracer 설치 지침][1]을 따르세요.

3. 다음 NLog 버전 5.0+에 대한 예제 코드에서와 같이 MDC를 활성화하세요.

```xml
  <!-- Add includeScopeProperties="true" to emit ScopeContext properties -->
  <layout xsi:type="JsonLayout" includeScopeProperties="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

NLog 버전 4.6+의 경우:

```xml
  <!-- Add includeMdlc="true" to emit MDC properties -->
  <layout xsi:type="JsonLayout" includeMdlc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

NLog 버전 4.5의 경우:

```xml
  <!-- Add includeMdc="true" to emit MDC properties -->
  <layout xsi:type="JsonLayout" includeMdc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```
추가 예제는 GitHub의 [NLog 4.0][2], [NLog 4.5][3] 또는 [NLog 4.6][4]를 사용하는 자동 트레이스 ID 주입 프로젝트를 참조하세요.


[1]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog40Example/NLog.config
[3]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog45Example/NLog.config
[4]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog46Example/NLog.config
{{% /tab %}}
{{% tab "Microsoft.Extensions.Logging" %}}
로그 메시지에 상관관계 식별자를 자동으로 주입하는 방법은 다음과 같습니다.

1. 다음 트레이서 설정으로 .NET 트레이서를 구성하세요.
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. 앱의 자동 계측 추적을 활성화하려면 [.NET Tracer 설치 지침][1]을 따르세요.

3. 예제 코드에서와 같이 로깅 공급자에 대해 [로그 범위][2]를 활성화하세요. 로그 범위를 지원하는 공급자만 상관관계 식별자가 주입됩니다.

```csharp
Host.CreateDefaultBuilder(args)
    .ConfigureLogging(logging =>
    {
        logging.AddFile(opts =>
        {
            opts.IncludeScopes = true; // must include scopes so that correlation identifiers are added
            opts.FormatterName = "json";
        });
    }
```

로그가 기록될 때 활성 트레이스가 있으면 트레이스 및 스팬 ID가 `dd_trace_id` 및 `dd_span_id` 속성과 함께 애플리케이션 로그에 자동으로 주입됩니다. 활성 트레이스가 없으면 `dd_env`, `dd_service` 및 `dd_version` 속성만 주입됩니다.

**참고:** 기본 `LoggerFactory` 구현을 대체하는 로깅 라이브러리(예: [_Serilog.Extensions.Hosting_][3] 또는 [_Serilog.Extensions.Logging_][4] 패키지)를 사용하는 경우, 해당 프레임워크별 지침을 따르세요(이 예에서는 **Serilog**를 참조하세요).

추가 예제는 GitHub의 [Microsoft.Extensions.Logging 자동 트레이스 ID 주입 프로젝트][5]를 참조하세요.


[1]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://docs.microsoft.com/aspnet/core/fundamentals/logging/#log-scopes-1
[3]: https://github.com/serilog/serilog-extensions-hosting
[4]: https://github.com/serilog/serilog-extensions-logging
[5]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/MicrosoftExtensionsExample/Program.cs
{{% /tab %}}
{{< /tabs >}}

이제 자동 또는 수동 주입을 위한 설정을 완료하세요.

## 자동 주입 {#automatic-injection}

자동 상관관계 식별자 주입을 활성화하려면 `DD_LOGS_INJECTION`이 활성화되어 있는지 확인하세요.

버전 3.24.0부터는 `DD_LOGS_INJECTION`가 기본적으로 활성화됩니다. 이전 버전의 경우, .NET Tracer의 환경 변수에서 `DD_LOGS_INJECTION=true`를 설정하세요.

다른 방법으로 .NET Tracer를 구성하려면 [.NET Tracer 구성하기][6]를 참조하세요.

상관관계 식별자 주입을 구성한 후, [C# 로그 수집][7]을 참조하여 로그 수집을 구성하세요.

**참고:** 트레이스와 로그를 상호 연결하려면 `dd_trace_id`를 로그의 트레이스 ID로 구문 분석하기 위해 [트레이스 ID 리매퍼][8]를 설정해야 할 수 있습니다. 자세한 내용은 [트레이스 ID 패널에 상호 연결된 로그가 표시되지 않음][9]를 참조하세요.

<div class="alert alert-info">버전 2.35.0부터는 이 서비스가 실행되는 곳에서 <a href="/remote_configuration">Agent Remote Configuration</a>이 활성화되어 있으면 <code>DD_LOGS_INJECTION</code> 을 <a href="/internal_developer_portal/catalog/">카탈로그</a> UI에서 설정할 수 있습니다.</div>

## 수동 주입 {#manual-injection}

트레이스를 로그와 수동으로 상호 연결하면 로그에 상관관계 식별자를 추가할 수 있습니다.

  | 필수 키   | 설명                                  |
  | -------------- | -------------------------------------------- |
  | `dd.env`       | SDK 전체에 `env`를 구성합니다. 설정하지 않으면 기본값이 `""`로 설정됩니다. |
  | `dd.service`   | 루트 서비스 이름을 전역으로 구성합니다. 설정하지 않으면 기본값이 애플리케이션 이름 또는 IIS 사이트 이름으로 설정됩니다.  |
  | `dd.version`   | 서비스 전체에 `version`를 구성합니다. 설정하지 않으면 기본값이 `""`로 설정됩니다.  |
  | `dd.trace_id`  | 로그가 기록되는 도중의 활성 트레이스 ID(64비트 십진수로 표시). 트레이스가 없으면 기본값이 `0`로 설정됩니다.  |
  | `dd.span_id`   | 로그가 기록되는 도중의 활성 스팬 ID(64비트 십진수로 표시). 트레이스가 없으면 기본값이 `0`로 설정됩니다. |

**참고:** 로그를 구문 분석하는 데 [Datadog Log Integration][7]을 사용하지 않는 경우, 사용자 정의 로그 구문 분석 규칙은 `dd.trace_id` 및 `dd.span_id`을 문자열로 구문 분석해야 합니다. 자세한 내용은 [상호 연결된 로그가 트레이스 ID 패널에 표시되지 않는 경우][10]를 참조하세요.

**참고**: Serilog, NLog 또는 ILogger를 통해 log4net을 사용하는 경우, 이러한 속성을 `BeginScope()`을 사용하여 구성하려면 Microsoft.Extensions.Logging 섹션을 참조하세요.

[시작하기 위한 단계](#getting-started)를 완료한 후, 수동 로그 보강 설정을 마무리하세요.

1. 프로젝트에서 [`Datadog.Trace` NuGet 패키지][11]를 참조하세요.

2. 활성 스팬 동안 상관관계 식별자를 검색하고 이를 로그 컨텍스트에 추가하려면 `CorrelationIdentifier` API를 사용하세요.

마지막으로, [C# 로그 수집][7]을 참조하여 로그 수집을 구성하세요.

예:

{{< tabs >}}
{{% tab "Serilog" %}}

**참고**: Serilog 라이브러리는 메시지 속성 이름이 유효한 C# 식별자여야 합니다. 필수 속성 이름은 `dd_env`, `dd_service`, `dd_version`, `dd_trace_id`, 및 `dd_span_id`입니다.

```csharp
using Datadog.Trace;
using Serilog.Context;

// there must be spans started and active before this block.
using (LogContext.PushProperty("dd_env", CorrelationIdentifier.Env))
using (LogContext.PushProperty("dd_service", CorrelationIdentifier.Service))
using (LogContext.PushProperty("dd_version", CorrelationIdentifier.Version))
using (LogContext.PushProperty("dd_trace_id", CorrelationIdentifier.TraceId.ToString()))
using (LogContext.PushProperty("dd_span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Log something
}
```

{{% /tab %}}
{{% tab "log4net" %}}

```csharp
using Datadog.Trace;
using log4net;

// there must be spans started and active before this block.
try
{
    LogicalThreadContext.Properties["dd.env"] = CorrelationIdentifier.Env;
    LogicalThreadContext.Properties["dd.service"] = CorrelationIdentifier.Service;
    LogicalThreadContext.Properties["dd.version"] = CorrelationIdentifier.Version;
    LogicalThreadContext.Properties["dd.trace_id"] = CorrelationIdentifier.TraceId.ToString();
    LogicalThreadContext.Properties["dd.span_id"] = CorrelationIdentifier.SpanId.ToString();

    // Log something

}
finally
{
    LogicalThreadContext.Properties.Remove("dd.env");
    LogicalThreadContext.Properties.Remove("dd.service");
    LogicalThreadContext.Properties.Remove("dd.version");
    LogicalThreadContext.Properties.Remove("dd.trace_id");
    LogicalThreadContext.Properties.Remove("dd.span_id");
}
```

{{% /tab %}}
{{% tab "NLog" %}}

```csharp
using Datadog.Trace;
using NLog;

// there must be spans started and active before this block.
using (MappedDiagnosticsLogicalContext.SetScoped("dd.env", CorrelationIdentifier.Env))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.service", CorrelationIdentifier.Service))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.version", CorrelationIdentifier.Version))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.trace_id", CorrelationIdentifier.TraceId.ToString()))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Log something
}
```

{{% /tab %}}
{{% tab "Microsoft.Extensions.Logging" %}}

```csharp
using Datadog.Trace;
using Microsoft.Extensions.Logging;

ILogger _logger;

// there must be spans started and active before this block.
using(_logger.BeginScope(new Dictionary<string, object>
{
    {"dd.env", CorrelationIdentifier.Env},
    {"dd.service", CorrelationIdentifier.Service},
    {"dd.version", CorrelationIdentifier.Version},
    {"dd.trace_id", CorrelationIdentifier.TraceId.ToString()},
    {"dd.span_id", CorrelationIdentifier.SpanId.ToString()},
}))
{
    // Log something
}
```

{{% /tab %}}
{{< /tabs >}}

다음과 같은 로그 공급자에 대해 구조화된 로그 메시지를 생성하기 위해 BeginScope을 사용하는 방법은 해당 문서를 참조하세요.
- Serilog: [ILogger.BeginScope()의 의미][12]
- NLog: [Microsoft Extension Logging의 NLog 속성][13]
- log4net: [BeginScope 사용하기][14]

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/unified_service_tagging
[2]: http://serilog.net
[3]: https://logging.apache.org/log4net
[4]: http://nlog-project.org
[5]: https://docs.microsoft.com/en-us/dotnet/core/extensions/logging
[6]: /ko/tracing/trace_collection/library_config/dotnet-core/#configuring-the-net-tracer
[7]: /ko/logs/log_collection/csharp/
[8]: /ko/logs/log_configuration/processors/trace_remapper/
[9]: /ko/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=withlogintegration
[10]: /ko/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[11]: https://www.nuget.org/packages/Datadog.Trace/
[12]: https://nblumhardt.com/2016/11/ilogger-beginscope/
[13]: https://github.com/NLog/NLog.Extensions.Logging/wiki/NLog-properties-with-Microsoft-Extension-Logging
[14]: https://github.com/huorswords/Microsoft.Extensions.Logging.Log4Net.AspNetCore#using-beginscope
[15]: /ko/logs/log_collection/csharp/#configure-your-datadog-agent