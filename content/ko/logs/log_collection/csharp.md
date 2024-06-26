---
aliases:
- /ko/logs/languages/csharp
further_reading:
- link: https://www.datadoghq.com/blog/c-logging-guide/
  tag: 블로그
  text: C# 로그를 수집, 사용자 지정, 분석하는 방법
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: 설명서
  text: .NET 로그와 트레이스 연결
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 알아보기
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/explorer/#visualize
  tag: 설명서
  text: 로그 분석 실행하기
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: 로그 수집 문제 해결 가이드
- link: /glossary/#tail
  tag: 용어
  text: '"tail"에 대한 용어 항목'
kind: 설명서
title: C# 로그 수집
---

C# 로그를 Datadog으로 보내려면 다음 방법 중 하나를 이용하세요:

- [파일에 로그인한 다음 Datadog 에이전트로 해당 파일을 추적합니다](#file-tail-logging-with-the-datadog-agent).
- [에이전트 없는 로깅을 활성화]합니다(#agentless-logging-with-apm).
- [Serilog 싱크를 사용합니다](#agentless-logging-with-serilog-sink).

이 페이지에서는 위의 각 방법에 따른 `Serilog`, `NLog`, `log4net`, `Microsoft.Extensions.Logging` 로깅 라이브러리용 설정 예시를 자세히 설명합니다.

## Datadog 에이전트를 이용한 파일-테일 로깅

C# 로그 수집에 권장되는 접근 방식은 로그를 파일로 출력한 다음 Datadog 에이전트로 해당 파일을 [추적][20]하는 것입니다. 이렇게 하면 Datadog 에이전트가 추가 메타데이터로 로그를 보강할 수 있습니다.

Datadog에서는 [커스텀 파싱 규칙][1]이 필요하지 않도록 로깅 라이브러리를 설정하여 로그를 JSON 형식으로 생성하는 것을 권장합니다.

### 로거 설정

{{< tabs >}}
{{% tab "Serilog" %}}

대다수의 .NET용 라이브러리와 마찬가지로, Serilog는 진단 로깅을 파일, 콘솔 등에 제공합니다. 깔끔한 API를 제공하며 최신 .NET 플랫폼 간에 이식할 수 있습니다.

다른 로깅 라이브러리와 달리 Serilog는 강력하게 구조화된 이벤트 데이터를 염두에 두고 구축되었습니다.

NuGet으로 Serilog를 설치하고 패키지 매니저 콘솔에서 다음 명령을 실행하세요:

```text
PM> Install-Package Serilog.Sinks.File
```

그리고 다음 코드를 사용해 애플리케이션에서 바로 로거를 초기화합니다:

```csharp
// Instantiate the logger
var log = new LoggerConfiguration()  // using Serilog;

    // using Serilog.Formatting.Json;
    .WriteTo.File(new JsonFormatter(renderMessage: true), "log.json")

    // using Serilog.Formatting.Compact;
    // .WriteTo.File(new RenderedCompactJsonFormatter(), "log.json")

    .CreateLogger();

// An example
var position = new { Latitude = 25, Longitude = 134 };
var elapsedMs = 34;

log.Information("Processed {@Position} in {Elapsed:000} ms.", position, elapsedMs);
```

`log.json` 파일에서 로거가 성공적으로 인스턴스화되었는지 확인합니다:

- `JsonFormatter(renderMessage: true)`를 사용하는 경우 다음 이벤트가 있는지 확인합니다:

```json
{
  "MessageTemplate": "Processed {@Position} in {Elapsed:000} ms.",
  "Level": "Information",
  "Timestamp": "2016-09-02T15:02:29.648Z",
  "Renderings": {"Elapsed": [{"Format": "000", "Rendering": "034"}]},
  "RenderedMessage":"Processed { Latitude: 25, Longitude: 134 } in 034 ms.",
  "Properties": {"Position": {"Latitude": 25, "Longitude": 134}, "Elapsed": 34}
}
```

- `RenderedCompactJsonFormatter()`를 사용하는 경우 다음 이벤트가 있는지 확인합니다:

```json
{
  "@t": "2020-05-20T04:15:28.6898801Z",
  "@m": "Processed { Latitude: 25, Longitude: 134 } in 034 ms.",
  "@i": "d1eb2146",
  "Position": {"Latitude": 25, "Longitude": 134 },
  "Elapsed": 34
}
```

{{% /tab %}}
{{% tab "NLog" %}}

NLog는 로그 라우팅과 관리 능력이 뛰어난 .NET용 로깅 플랫폼입니다. 애플리케이션의 규모나 복잡성에 관계 없이 고품질 로그를 생성하고 관리할 수 있도록 도와줍니다.

NuGet으로 NLog를 설치하려면 패키지 매니저 콘솔에서 다음 명령을 실행하세요:

```text
PM> Install-Package NLog
```

클래스 경로에 라이브러리가 생기면 다음 레이아웃을 대상에 붙입니다. 프로젝트 루트 경로에 `NLog.config` 파일을 편집하거나 추가합니다. 그리고 다음 코드를 복사 및 붙여넣기 합니다(*로그는 `application-logs.json` 파일에 기록됨*):

```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <!--
로깅 규칙 및 출력 사용자 정의에 대한 자세한 내용은 
https://github.com/nlog/nlog/wiki/Configuration-file을 참조하세요.
   -->
  <targets async="true">
    <!-- 로그를 Json으로 파일에 쓰기 -->
    <target name="json-file" xsi:type="File" fileName="application-logs.json">
      <layout xsi:type="JsonLayout">
        <attribute name="date" layout="${date:universalTime=true:format=o}" />
        <attribute name="level" layout="${level:upperCase=true}"/>
        <attribute name="message" layout="${message}" />
        <attribute name="exception" layout="${exception:format=ToString}" />
      </layout>
    </target>

  </targets>
  <rules>
    <!-- 모든 이벤트를 json-file 대상에 기록 -->
    <logger name="*" writeTo="json-file" minlevel="Trace" />
  </rules>
</nlog>
```

첫 번째 이벤트를 실행하고 기록하려면 다음을 코드에 추가하세요:

```csharp
using NLog;

namespace Datadog
{
    class Program
    {
        // Initialize a logger
        private static Logger logger = LogManager.GetCurrentClassLogger();

        static void Main(string[] args)
        {
            // Log a simple debug message
            logger.Debug("This is my first step");

            // your code continues here ...
        }
    }
}
```

{{% /tab %}}
{{% tab "Log4Net" %}}
Log4Net은 Log4j의 영향을 받아 탄생한 .NET용 로깅 플랫폼으로, 로그 라우팅과 관리 능력이 뛰어납니다. 애플리케이션의 규모와 복잡성에 상관 없이 고품질 로그를 생성하고 관리하도록 도와줍니다.

Log4Net을 설치하려면 패키지 매니저 콘솔에서 다음 명령을 실행하세요:

```text
PM> Install-Package log4net
PM> Install-Package log4net.Ext.Json
```

라이브러리가 설치되면 다음 레이아웃을 대상에 첨부합니다. 프로젝트의 `App.config`를 편집하고 다음 섹션을 추가하세요:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>

  <configSections>
    <section name="log4net" type="log4net.Config.Log4NetConfigurationSectionHandler, log4net" />
  </configSections>

  <log4net>
    <root>
      <level value="DEBUG" />
      <appender-ref ref="JsonFileAppender" />
    </root>
    <appender name="JsonFileAppender" type="log4net.Appender.FileAppender">
      <threshold value="DEBUG"/>
      <file value="application-logs.json" />
      <encoding type="System.Text.UTF8Encoding" />
      <appendToFile value="true" />
      <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
        <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
        <default />
        <!--explicit default members-->
        <remove value="ndc" />
        <remove value="message" />
        <!--remove the default preformatted message member-->
        <member value="message:messageobject" />
        <!--add raw message-->
      </layout>
    </appender>
  </log4net>

  <!-- The rest of your configuration starts here ... -->
```

로거를 인스턴스화하고 이벤트를 실행합니다:

```csharp
using log4net;

namespace Datadog
{
    class Program
    {
        // Get the current class logger
        private static ILog logger = LogManager.GetLogger(typeof(Program));

        static void Main(string[] args)
        {

           // Load the configure fom App.config
           XmlConfigurator.Configure();

           // Log a simple debug message
           logger.Debug("This is my first debug message");

           // your code continues here ...
        }
    }
}
```

지침을 따랐다면 파일 (예: `C:\Projects\Datadog\Logs\log.json`)에 다음 이벤트가 표시되어야 합니다:

```json
{
  "level": "DEBUG",
  "message": "This is my debug message",
  "date": "2016-05-24 15:53:35.7175",
  "appname": "Datadog.vshost.exe",
  "logger": "Datadog.Program",
  "thread": "10"
}
```

JSON 형식으로 로깅할 때의 장점에도 불구하고 원시 문자열 형식으로 로깅하려면 다음과 같이 C# 통합 파이프라인을 통해 로그를 자동으로 구문 분석하도록 `log4net conversion pattern`을 업데이트하세요.

```text
<param name="ConversionPattern" value="%date{yyyy-MM-dd HH:mm:ss.SSS} %level [%thread] %logger %method:%line - %message%n" />
```

{{% /tab %}}
{{< /tabs >}}

### Datadog 에이전트 설정

[로그 수집이 활성화][2]되었으면 [커스텀 로그 수집][3]을 설정해 로그 파일을 추적하고 Datadog으로 전송합니다.

1. `conf.d/` [에이전트 설정 디렉토리][4]에서 `csharp.d/` 폴더를 생성합니다.
2. `csharp.d/`에 다음 컨텐츠로 `conf.yaml` 파일을 생성합니다:

    ```yaml
    init_config:

    instances:

    ##Log section
    logs:

      - type: file
        path: "<path_to_your_csharp_log>.log"
        service: <service_name>
        source: csharp
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
3. Agent 사용자에게 로그 파일에 대한 읽기 액세스 권한이 있는지 확인하세요.
4. [에이전트를 재시작합니다][5].
5. [에이전트 상태 하위 명령][6]을 실행해 `Checks` 섹션에서 `csharp`를 찾아 로그가 Datadog로 잘 전송되었는지 확인합니다.

로그가 JSON 형식이면 Datadog에서 자동으로 [로그 메시지 구문 분석][7]을 실행해 로그 특성을 추출합니다. [로그 익스플로러][8]를 사용해 로그를 확인하고 문제를 해결할 수 있습니다.

### 로그 및 트레이스에 서비스 연결

이 애플리케이션에 APM이 활성화되어 있으면 [APM .NET 지침을 따라][9] 트레이스 ID, 스팬 ID, `env`, `service`, `version`을 자동으로 로그에 추가해 로그와 트레이스를 연결하세요.

**참고**: APM 트레이서가 로그에 `service`를 삽입하면 에이전트 설정에서 값 집합이 재구성됩니다.

## APM으로 에이전트 없이 로깅

.NET APM 자동 계측 라이브러리를 사용하여 코드를 변경하지 않고 애플리케이션에서 Datadog으로 로그를 직접 스트리밍할 수 있습니다. 이 접근 방식은 로그를 직접 Datadog으로 전송하므로 Datadog 에이전트에서 제공하는 [중요 데이터 스크러빙 등의 기능][10]을 누릴 수 없습니다. 따라서 가능한 경우 파일 테일 로깅을 사용하는 것이 좋지만, 이것이 불가능한 환경(예: [Azure 앱 서비스][11]를 사용하는 경우)에서 유용합니다. [Sensitive Data Scanner][12]에서 수행하는 서버 측 스크러빙 기능을 계속 사용할 수 있습니다.

에이전트리스 로깅('직접 로그 제출'이라고도 함)은 다음 프레임워크를 지원합니다:
- Serilog (v1.0+)
- NLog (v2.1+)
- log4net (v1.0+)
- Microsoft.Extensions.Logging (2.0+)

애플리케이션 코드를 수정하거나 애플리케이션에 추가 종속성을 설치할 필요가 없습니다.

<div class="alert alert-warning">
  <strong>참고:</strong> log4net이나 NLog를 사용하는 경우 에이전트리스 로깅을 활성화하려면 어펜더(log4net)나 로거  (NLog)를 설정해야 합니다. 이러한 경우, 이 같은 종속성을 추가하거나 <a href="/logs/log_collection/csharp/?tab=log4net#agentless-logging-with-serilog-sink">Serilog 싱크로 에이전트리스 로깅</a>을 사용하세요.
</div>


### APM 라이브러리 설정

자동 계측이 있는 APM을 사용하는 경우에만 에이전트리스 로깅을 사용할 수 있습니다. 시작하려면 다음 설명서 대로 애플리케이션을 계측하세요:

- [.NET Core/.NET 5+ 애플리케이션][13]
- [.NET Framework 애플리케이션][14]

설치 후 트레이스가 올바르게 수신되는지 확인하세요.

### 에이전트리스 로깅 활성화

에이전트리스 로깅을 활성화하려면 다음 환경 변수를 설정하세요:

`DD_API_KEY`
: 로그를 Datadog으로 보내기 위한 [Datadog API 키][15].

`DD_SITE`
: [내 Datadog 사이트][16] 이름입니다. 다음 예 중 하나를 선택하세요:<br>
**예**:`datadoghq.com` (US1), `datadoghq.eu` (EU), `us3.datadoghq.com` (US3), `us5.datadoghq.com` (US5), `ddog-gov.com` (US1-FED) <br>
**기본값**: `datadoghq.com` (US1)

`DD_LOGS_INJECTION`
: [로그와 트레이스 연결][9] 활성화:<br>
**기본값**: `true` <br>
Tracer 버전 2.7.0에서 에이전트리스 로깅을 사용할 때 기본적으로 활성화됩니다.

`DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS`
: 에이전트리스 로깅을 활성화합니다. `Serilog`, `NLog`, `Log4Net` 또는 `ILogger`(`Microsoft.Extensions.Logging`을 사용하는 경우)로 설정해 로깅 프레임워크에 맞게 활성화하세요. 로깅 프레임워크를 여러 개 사용하는 경우 세미콜론으로 구분된 변수 목록을 사용합니다. <br>
**예**: `Serilog;Log4Net;NLog`

<div class="alert alert-warning">
  <strong>참고:</strong> 로깅 프레임워크를 <code>Microsoft.Extensions.Logging</code>와 함께 사용하는 경우, 일반적으로 프레임워크 이름을 사용해야 합니다. 예를 들어, <a href="https://github.com/serilog/serilog-extensions-logging">Serilog.Extensions.Logging</a>을 사용하면 <code>DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS=Serilog</code>와 같이 설정합니다.
</div>

이와 같은 환경 변수를 설정한 후 애플리케이션을 재시작합니다.

### 추가 설정

다음 환경 변수를 사용해 에이전트리스 로그 수집을 사용자 지정할 수 있습니다:

`DD_LOGS_DIRECT_SUBMISSION_MINIMUM_LEVEL`
: Datadog에 전송하기 _전에_ 로그를 수준별로 필터링하도록 허용합니다. `Verbose`, `Debug`, `Information`, `Warning`, `Error`, `Critical` 중 하나를 선택해 설정합니다. 지원하는 로깅 프레임워크 내에서 각 값과 동등한 수준이 적용됩니다.<br>
**기본값**: `Information`

`DD_LOGS_DIRECT_SUBMISSION_HOST`
: 로그와 연결된 호스트 컴퓨터 이름을 설정합니다. 이름을 설정하지 않으면 자동으로 호스트 이름을 찾습니다.<br>
**기본값**: 자동으로 결정

`DD_LOGS_DIRECT_SUBMISSION_TAGS`
: 이 값을 지정하면 지정한 태그 모두가 생성된 스팬에 추가됩니다. 값을 지정하지 않으면 `DD_TAGS`을 대신 사용합니다.<br>
**예**: `layer:api, team:intake`
구분 기호는 쉼표와 공백 (`, `)입니다.

다음은 꼭 필요한 경우를 제외하고 일반적으로 수정하지 않는 설정 값입니다.

{{< site-region region="us" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: 로그를 제출하는 URL을 설정합니다. 기본적으로 `DD_SITE`에서 제공하는 도메인을 사용합니다.<br>
**기본값**: `https://http-intake.logs.datadoghq.com:443`(`DD_SITE` 기반)

{{< /site-region >}}

{{< site-region region="us3" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: 로그를 제출하는 URL을 설정합니다. 기본적으로 `DD_SITE`에서 제공하는 도메인을 사용합니다.<br>
**기본값**: `https://http-intake.logs.us3.datadoghq.com:443`(`DD_SITE` 기반)

{{< /site-region >}}

{{< site-region region="us5" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: 로그를 제출하는 URL을 설정합니다. 기본적으로 `DD_SITE`에서 제공하는 도메인을 사용합니다.<br>
**기본값**: `https://http-intake.logs.us5.datadoghq.com:443`(`DD_SITE` 기반)

{{< /site-region >}}

{{< site-region region="ap1" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: 로그를 제출하는 URL을 설정합니다. 기본적으로 `DD_SITE`에서 제공하는 도메인을 사용합니다.<br>
**기본값**: `https://http-intake.logs.ap1.datadoghq.com:443`(`DD_SITE` 기반)

{{< /site-region >}}

{{< site-region region="eu" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: 로그를 제출하는 URL을 설정합니다. 기본적으로 `DD_SITE`에서 제공하는 도메인을 사용합니다.<br>
**기본값**: `https://http-intake.logs.datadoghq.eu:443`(`DD_SITE` 기반)

{{< /site-region >}}

{{< site-region region="gov" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: 로그를 제출하는 URL을 설정합니다. 기본적으로 `DD_SITE`에서 제공하는 도메인을 사용합니다.<br>
**기본값**: `https://http-intake.logs.ddog-gov.com:443`(`DD_SITE` 기반)

{{< /site-region >}}

`DD_LOGS_DIRECT_SUBMISSION_SOURCE`
: 제출하는 로그의 파싱 규칙을 설정합니다. [커스텀 파이프라인][17]이 있는 경우를 제외하고 항상 `csharp`로 설정해야 합니다.<br>
**기본값**: `csharp`

`DD_LOGS_DIRECT_SUBMISSION_MAX_BATCH_SIZE`
: 한 번에 보내는 로그의 최대 수를 설정합니다. [API 한도][18]를 고려하여 값을 지정하세요.<br>
**기본값**: `1000`

`DD_LOGS_DIRECT_SUBMISSION_MAX_QUEUE_SIZE`
: 로그 메시지를 삭제하기 전에 내부 큐에서 한 번에 대기시킬 수 있는 최대 로그 수를 설정합니다.<br>
**기본값**: `100000`

`DD_LOGS_DIRECT_SUBMISSION_BATCH_PERIOD_SECONDS`
: 새 로그 전송을 확인하기 전의 대기 시간(초 단위)을 설정합니다.<br>
**기본값**: `1`

`Microsoft.Extensions.Logging` 통합을 사용하는 경우,`ILogger`에서 기본으로 제공하는 표준 기능을 사용해 Datadog에 전송할 로그를 필터링할 수 있습니다. 키 `"Datadog"`를 사용해 직접 전송 공급자를 확인하고 각 네임스페이스에 최소 로그 수준을 설정하세요. 예를 들어, `appSettings.json`에 다음을 추가하면 `Warning` 수준 아래의 로그는 Datadog에 전송되지 않습니다. 이 기능은 .NET 트레이서 라이브러리 v2.20.0에 도입되었습니다.

```json
{
  "Logging": {
    "Datadog": {
      "LogLevel": {
        "Microsoft.AspNetCore": "Warning"
      },
    }
  }
}
```

## Serilog 싱크를 이용해 에이전트리스 로깅

파일 테일 로깅이나 APM 에이전트리스 로깅을 사용할 수 없으나 `Serilog` 프레임워크를 사용한다면, Datadog [Serilog 싱크][19]를 이용해 로그를  Datadog으로  바로 전송할 수 있습니다.

애플리케이션에 Datadog [Serilog 싱크][19]를 설치하면 이벤트와 로그가 Datadog으로 전송됩니다. 기본적으로 싱크는포트 443의 HTTPS를 통해 로그를 전달합니다.
패키지 매니저 콘솔에서 다음 명령을 실행하세요:

```text
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

그런 다음 애플리케이션에서 바로 로거를 초기화합니다. [`<API_KEY>`를 추가][15]했는지 확인하세요.

{{< site-region region="us" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.datadoghq.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.us3.datadoghq.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="ap1" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.ap1.datadoghq.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="us5" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.us5.datadoghq.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.datadoghq.eu" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="gov" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.ddog-gov.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="us" >}}

다음 필수 속성을 수동으로 지정하여 기본 동작을 재정의하고 TCP에서 로그를 전달할 수도 있습니다: `port`, `useSSL`, `useTCP`. 선택적으로, [`source`, `service`, `host`, 커스텀 태그를 지정합니다.][1]

예를 들어 TCP의 Datadog US 영역에 로그를 전달하려면 다음 싱크 설정을 사용합니다:

```csharp
var config = new DatadogConfiguration(url: "intake.logs.datadoghq.com", port: 10516, useSSL: true, useTCP: true);
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs(
        "<API_KEY>",
        source: "<SOURCE_NAME>",
        service: "<SERVICE_NAME>",
        host: "<HOST_NAME>",
        tags: new string[] {"<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"},
        configuration: config
    )
    .CreateLogger())
{
    // Some code
}
```

[1]: /ko/logs/log_configuration/attributes_naming_convention/#reserved-attributes

{{< /site-region >}}
{{< site-region region="eu" >}}

다음 필수 속성을 수동으로 지정하여 기본 동작을 재정의하고 TCP에서 로그를 전달할 수도 있습니다: `port`, `useSSL`, `useTCP`. 선택적으로, [`source`, `service`, `host`, 커스텀 태그를 지정합니다.][1]

예를 들어 TCP의 Datadog US 영역에 로그를 전달하려면 다음 싱크 설정을 사용합니다:

```csharp
var config = new DatadogConfiguration(url: "tcp-intake.logs.datadoghq.eu", port: 443, useSSL: true, useTCP: true);
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs(
        "<API_KEY>",
        source: "<SOURCE_NAME>",
        service: "<SERVICE_NAME>",
        host: "<HOST_NAME>",
        tags: new string[] {"<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"},
        configuration: config
    )
    .CreateLogger())
{
    // Some code
}
```
[1]: /ko/logs/log_configuration/attributes_naming_convention/#reserved-attributes

{{< /site-region >}}

이제 새 로그가 Datadog으로 바로 전송됩니다.

또는 `0.2.0`부터 `Serilog.Setting.Configuration` 패키지와 `appsettings.json` 파일을 사용해 Datadog 싱크를 설정할 수 있습니다.

`Serilog.WriteTo` 배열에서 `DatadogLogs` 항목을 추가합니다. 다음 예시를 참고하세요.

```json
"Serilog": {
  "Using": [ "Serilog.Sinks.Console", "Serilog.Sinks.Datadog.Logs" ],
  "MinimumLevel": "Debug",
  "WriteTo": [
    { "Name": "Console" },
    {
      "Name": "DatadogLogs",
      "Args": {
        "apiKey": "<API_KEY>",
        "source": "<SOURCE_NAME>",
        "host": "<HOST_NAME>",
        "tags": ["<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"],
      }
    }
  ],
  "Enrich": [ "FromLogContext", "WithMachineName", "WithThreadId" ],
  "Properties": {
    "Application": "Sample"
  }
}
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/parsing
[2]: /ko/agent/logs/?tab=tailfiles#activate-log-collection
[3]: /ko/agent/logs/?tab=tailfiles#custom-log-collection
[4]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[5]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[7]: /ko/logs/log_configuration/parsing/?tab=matchers
[8]: /ko/logs/explorer/#overview
[9]: /ko/tracing/other_telemetry/connect_logs_and_traces/dotnet/
[10]: /ko/agent/logs/advanced_log_collection
[11]: /ko/serverless/azure_app_services
[12]: /ko/sensitive_data_scanner/
[13]: /ko/tracing/trace_collection/dd_libraries/dotnet-core
[14]: /ko/tracing/trace_collection/dd_libraries/dotnet-framework
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: /ko/getting_started/site/
[17]: /ko/logs/log_configuration/pipelines/?tab=source
[18]: /ko/api/latest/logs/#send-logs
[19]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[20]: /ko/glossary/#tail