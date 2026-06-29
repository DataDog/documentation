---
aliases:
- /ko/logs/languages/csharp
further_reading:
- link: https://www.datadoghq.com/blog/c-logging-guide/
  tag: 블로그
  text: C# 로그 수집, 사용자 지정 및 분석 방법
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: 설명서
  text: .NET 로그와 트레이스 연결
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 구문 분석에 대해 배우기
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
  text: '"테일링" 관련 용어 항목'
- link: https://github.com/DataDog/serilog-sinks-datadog-logs/
  tag: Github 패키지
  text: Serilog.Sinks.Datadog.Logs Package
title: C# 로그 수집
---
C# 로그를 Datadog으로 전송하려면 다음 중 한 가지 방식을 사용합니다.

- [파일에 로깅한 다음 해당 파일을 Datadog Agent로 테일링](#file-tail-logging-with-the-datadog-agent).
- [에이전트리스 로깅 활성화](#agentless-logging-with-apm).
- [Serilog 싱크 사용](#agentless-logging-with-serilog-sink).

## 테일 Datadog Agent를 사용한 파일-테일링 로깅 {#file-tail-logging-with-the-datadog-agent}

C# 로그 수집 시 권장되는 접근 방식은 로그를 파일로 출력한 다음, 해당 파일을 Datadog Agent로 [테일링][20]하는 것입니다. 이렇게 하면 Datadog Agent가 로그를 추가적인 메타데이터로 보강할 수 있습니다.

Datadog에서는 [사용자 지정 구문 분석 규칙][1]이 필요해질 가능성을 피하기 위해 로깅 라이브러리가 로그를 JSON 형식으로 생성하도록 설정할 것을 강력히 권장합니다.

파일-테일링 로깅은 다음 프레임워크를 지원합니다.
- Serilog
- NLog
- log4net

### 로거 구성 {#configure-your-logger}

{{< tabs >}}
{{% tab "Serilog" %}}

다른 많은 .NET용 라이브러리와 마찬가지로, Serilog는 파일, 콘솔 및 기타 위치에 진단 로깅을 제공합니다. 이 라이브러리에는 정리된 API가 있고 최신 .NET 플랫폼 간 이동이 가능합니다.

다른 로깅 라이브러리와는 달리 Serilog는 강력하고 구조화된 이벤트 데이터를 염두에 두고 구축되었습니다.

NuGet을 사용하여 Serilog를 설치하려면 Package Manager Console에서 다음 명령을 실행하세요.

```text
PM> Install-Package Serilog.Sinks.File
```

그리고 다음 코드를 추가하여 애플리케이션에서 바로 로거를 초기화합니다.

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

`log.json` 파일에서 로거가 초기화되었는지 확인하세요.

- `JsonFormatter(renderMessage: true)`를 사용하는 경우, 확인을 위해 다음 이벤트를 찾으세요.

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

- `RenderedCompactJsonFormatter()`를 사용하는 경우, 확인을 위해 다음 이벤트를 찾으세요.

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

NLog는 로그 라우팅 및 관리 기능이 많은 .NET용 로깅 플랫폼입니다. 애플리케이션의 크기 또는 복잡도와 관계없이 양질의 로그를 생성하고 관리하는 데 도움이 됩니다.

NuGet을 사용하여 NLog를 설치하려면 Package Manager Console에서 다음 명령을 실행하세요.

```text
PM> Install-Package NLog
```

classpath에 라이브러리가 추가되고 나면, 다음 레이아웃을 아무 대상에나 연결합니다. `NLog.config` 파일을 편집하거나 프로젝트 루트 경로에 추가합니다. 그리고 다음 코드를 그 안에 복사/붙여 넣습니다(*로그는 `application-logs.json` 파일 안에 작성됨*).

```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <!--
  See https://github.com/nlog/nlog/wiki/Configuration-file
  for information on customizing logging rules and outputs.
   -->
  <targets async="true">
    <!-- Write logs as Json into a file -->
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
    <!-- Log all events to the json-file target -->
    <logger name="*" writeTo="json-file" minlevel="Trace" />
  </rules>
</nlog>
```

첫 번째 이벤트를 실행하고 로깅하려면 다음을 코드에 추가하세요.

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
Log4Net는 로그 라우팅 및 관리 기능이 많은 .NET용 로깅 플랫폼으로, Log4j에서 아이디어를 얻어 제작했습니다. 애플리케이션의 크기 또는 복잡도와 관계없이 양질의 로그를 생성하고 관리하는 데 도움이 됩니다.

Log4Net을 설치하려면 Package Manager Console에서 다음 명령을 실행하세요.

```text
PM> Install-Package log4net
PM> Install-Package log4net.Ext.Json
```

라이브러리가 설치되면 다음 레이아웃을 아무 대상에나 연결합니다. 프로젝트의 `App.config`를 편집하고 다음 섹션을 추가합니다.

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

로거를 인스턴스화하고 이벤트 실행 시작:

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

지침을 따랐으면 파일에(예: `C:\Projects\Datadog\Logs\log.json`) 다음 이벤트가 표시되는 것이 정상입니다.

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

JSON으로 로깅하는 이점에도 불구하고 원시 문자열 형식으로 로깅하기를 원하는 경우, `log4net conversion pattern`을 업데이트하여 다음과 같이 C# 통합 파이프라인으로 로그를 자동으로 구문 분석하도록 설정해 보세요.

```text
<param name="ConversionPattern" value="%date{yyyy-MM-dd HH:mm:ss.SSS} %level [%thread] %logger %method:%line - %message%n" />
```

{{% /tab %}}
{{< /tabs >}}

### Datadog Agent 구성 {#configure-the-datadog-agent}

[로그 수집이 활성화][2]되었으면 [사용자 지정 로그 수집][3]이 로그 파일을 테일링하고 Datadog으로 전송하게 설정합니다.

1. `conf.d/` [Agent 구성 디렉터리][4]에 `csharp.d/` 폴더를 생성합니다.
2. `csharp.d/`에 다음과 같은 내용의 `conf.yaml` 파일을 생성합니다.

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
3. Agent 사용자에게 로그 파일에 대한 읽기 액세스 권한이 있어야 합니다.
4. [Agent를 재시작][5]합니다.
5. [Agent의 상태 하위 명령][6]을 실행하고 `Checks` 섹션 아래에서 `csharp`를 찾아 로그가 Datadog에 제출되었는지 확인합니다.

로그가 JSON 형식인 경우, Datadog이 자동으로 [로그 메시지를 구문 분석][7]하여 로그 속성을 추출합니다. [Log Explorer][8]를 사용하여 로그를 조회하고 문제를 해결하세요.

### 로그 및 트레이스 전체에 서비스 연결 {#connect-your-service-across-logs-and-traces}

이 애플리케이션에 APM이 활성화된 경우, 트레이스 ID, 스팬 ID,
`env`, `service`, `version`을 로그에 자동으로 추가하여([APM .NET 지침][9]을 따라) 로그와 트레이스를 연결합니다.

**참고**: Datadog SDK가 로그에 `service`를 주입하는 경우, 이것이 에이전트 구성에서 설정한 값을 재정의합니다.

## APM을 사용한 에이전트리스 로깅 {#agentless-logging-with-apm}

.NET APM 자동 계측 라이브러리를 사용하여 코드를 변경하지 않고 애플리케이션에서 Datadog으로 직접 로그를 스트리밍할 수 있습니다. 이 방식은 로그를 직접 Datadog으로 전송하므로, Datadog Agent가 제공하는 [민감한 데이터 스크러빙과 같은 기능][10]의 이점을 누릴 수 없습니다. 그 때문에 Datadog은 가능하면 파일 테일링 로깅을 사용할 것을 권장하지만, 해당 로깅이 불가능한 환경에서는(예를 들어 [Azure App Service][11]를 사용하는 경우) 이 방식이 유용합니다. 그래도 [Sensitive Data Scanner][12]가 수행하는 서버 측 스크러빙 기능은 이용할 수 있다는 점을 알아두는 것이 좋습니다.

에이전트리스 로깅("직접 로그 제출"이라고도 함)은 다음 프레임워크를 지원합니다.
- Serilog(v1.0+)
- NLog(v2.1+)
- log4net(v1.0+)
- Microsoft.Extensions.Logging(2.0+)

이 경우 애플리케이션 코드를 수정할 필요도 없고, 애플리케이션에 추가적인 종속성을 설치할 필요도 없습니다.

<div class="alert alert-danger">
  <strong>참고:</strong> log4net 또는 NLog를 사용하는 경우 appender(log4net) 또는 로거(NLog)를 구성해야만 에이전트 리스 로깅을 활성화할 수 있습니다. 그런 경우, 이러한 추가 종속성을 추가하거나 아니면 대신 <a href="/logs/log_collection/csharp/?tab=log4net#agentless-logging-with-serilog-sink">Serilog 싱크를 사용한 에이전트리스 로깅</a>을 사용할 수 있습니다.
</div>


### Datadog SDK 구성 {#configure-the-datadog-sdk}

에이전트리스 로깅은 자동 계측을 포함한 APM을 사용할 때만 사용할 수 있습니다. 시작하려면 다음 문서에 설명된 대로 애플리케이션을 계측하세요.

- [.NET Core/.NET 5+ 애플리케이션][13]
- [.NET Framework 애플리케이션][14]

설치 후 트레이스가 올바로 수신되는지 확인하세요.

### 에이전트리스 로깅 활성화 {#enable-agentless-logging}

에이전트리스 로깅을 활성화하려면 다음 환경 변수를 설정하세요.

`DD_API_KEY`
: 로그를 Datadog으로 보내기 위한 [Datadog API 키][15]입니다.

`DD_SITE`
: [Datadog 사이트][16] 이름입니다. 다음 예시 중에서 하나 선택:<br>
**예**: `datadoghq.com`(US1), `datadoghq.eu`(EU), `us3.datadoghq.com`(US3), `us5.datadoghq.com`(US5), `ap1.datadoghq.com`(AP1), `ap2.datadoghq.com`(AP2), `ddog-gov.com`(US1-FED), `us2.ddog-gov.com`(US2-FED) <br>
**기본값**: `datadoghq.com`(US1)

`DD_LOGS_INJECTION`
: [로그와 트레이스 연결][9] 활성화:<br>
**기본값**: `true` <br>
Tracer 버전 3.24.0부터 기본적으로 활성화됩니다.

`DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS`
: 에이전트리스 로깅을 활성화합니다. `Serilog`, `NLog`, `Log4Net`, `ILogger`를 설정하여(`Microsoft.Extensions.Logging`의 경우) 로깅 프레임워크에 맞춰 활성화하세요. 로깅 프레임워크를 여러 개 사용하는 경우, 변수를 세미콜론으로 구분한 목록을 사용합니다.<br>
**예시**: `Serilog;Log4Net;NLog`

<div class="alert alert-danger">
  <strong>참고:</strong> 로깅 프레임워크를 <code>Microsoft.Extensions.Logging</code>과 함께 사용하는 경우, 일반적으로 프레임워크 이름을 사용해야 합니다. 예를 들어 <a href="https://github.com/serilog/serilog-extensions-logging">Serilog.Extensions.Logging</a>을 사용하는 경우, <code>DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS=Serilog</code>를 설정해야 합니다.
</div>

이러한 환경 변수를 설정하고 나서 애플리케이션을 다시 시작하세요.

### 추가 구성 {#additional-configuration}

에이전트리스 로그 수집의 몇몇 측면을 더 자세히 사용자 지정하려면 다음 환경 변수를 사용합니다.

`DD_LOGS_DIRECT_SUBMISSION_MINIMUM_LEVEL`
: 로그를 Datadog으로 전송하기 _전에_ 수준별로 필터링할 수 있습니다. 다음 값 중 하나로 설정: `Verbose`, `Debug`, `Information`, `Warning`, `Error`, `Critical`. 이러한 값은 지원되는 로깅 프레임워크에서 해당하는 수준과 같습니다.<br>
**기본값**: `Information`

`DD_LOGS_DIRECT_SUBMISSION_HOST`
: 로그와 연결된 호스트 머신의 이름을 설정합니다. 제공하지 않으면 호스트 이름을 자동으로 찾으려 시도합니다.<br>
**기본값**: 자동으로 결정됨

`DD_LOGS_DIRECT_SUBMISSION_TAGS`
: 지정된 경우, 지정된 태그 모두를 생성된 스팬 모두에 추가합니다. 제공하지 않으면 대신 `DD_TAGS`를 사용합니다.<br>
**예시**: `layer:api, team:intake`
구분 기호는 쉼표 및 공백입니다. `, `.

다음 구성 값은 일반적으로 수정하지 않는 것이 좋지만, 필요한 경우 설정해도 됩니다.

`DD_LOGS_DIRECT_SUBMISSION_URL`
: 로그를 제출할 URL을 설정합니다. `DD_SITE`에서 기본적으로 제공된 도메인을 사용합니다.<br>
**기본값**: `{{< region-param key=http_endpoint_full >}}:443` (based on `DD_SITE`)

`DD_LOGS_DIRECT_SUBMISSION_SOURCE`
: 제출된 로그에 대한 구문 분석 규칙을 설정합니다. 항상 `csharp`로 설정해야 하며, [사용자 지정 파이프라인][17]이 있는 경우는 예외입니다.<br>
**기본값**: `csharp`

`DD_LOGS_DIRECT_SUBMISSION_MAX_BATCH_SIZE`
: 한 번에 전송할 로그 최대 수를 설정합니다. [API에 대하여 설정된 제한 사항][18]을 감안합니다.<br>
**기본값**: `1000`

`DD_LOGS_DIRECT_SUBMISSION_MAX_QUEUE_SIZE`
: 로그 메시지를 삭제하기 전에 내부 대기열에서 보류할 수 있는 로그 최대 수를 설정합니다.<br>
**기본값**: `100000`

`DD_LOGS_DIRECT_SUBMISSION_BATCH_PERIOD_SECONDS`
: 전송할 새 로그가 있는지 검사하기까지 기다리는 시간(초 단위)을 설정합니다.<br>
**기본값**: `1`

`Microsoft.Extensions.Logging` 통합을 사용하는 경우, `ILogger`에 기본 제공된 표준 기능을 사용하여 Datadog으로 전송되는 로그를 필터링할 수 있습니다. 키 `"Datadog"`으로 직접 제출 공급자를 식별한 다음, 각 네임스페이스에 최소 로그 수준을 설정합니다. 예를 들어 `appSettings.json`에 다음을 추가하면 수준이 `Warning` 미만인 로그가 Datadog으로 전송되지 않게 방지됩니다. .NET SDK v2.20.0에서 도입되었습니다.

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

## Serilog 싱크를 사용한 에이전트리스 로깅 {#agentless-logging-with-serilog-sink}

<div class="alert alert-info"> <code>0.2.0</code>부터는 <code>appsettings.json</code> 파일을 <a href="https://github.com/serilog/serilog-settings-configuration"><code>Serilog.Setting.Configuration</code></a> 패키지와 함께 사용하여 Datadog 싱크를 구성할 수 있습니다.
자세한 내용은 <a href="https://github.com/DataDog/serilog-sinks-datadog-logs/tree/master?tab=readme-ov-file#serilogsinksdatadoglogs">`Serilog.Sinks.Datadog.Logs`</a> 패키지를 참조하세요.</div>

파일-테일링 로깅 또는 APM 에이전트리스 로깅을 사용할 수 없고, `Serilog` 프레임워크를 사용 중인 경우 Datadog [Serilog 싱크][19]를 사용하여 로그를 직접 Datadog으로 전송할 수 있습니다.

애플리케이션에 [Datadog Serilog 싱크][19]를 설치하면 이것이 이벤트와 로그를 Datadog으로 전송합니다. 기본적으로 싱크는 포트 443에서 HTTPS를 통해 로그를 전달합니다.
Package Manager Console에서 다음 명령을 실행하세요.

```text
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

그런 다음, 애플리케이션에서 바로 로거를 초기화합니다. [`<API_KEY>`][15]를 추가해야 합니다.

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "{{< region-param key="http_endpoint_full" >}}" })
    .CreateLogger())
{
    // Some code
}
```

이제 새 로그가 Datadog으로 바로 전송됩니다.

## 추가 자료 {#further-reading}

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
[12]: /ko/security/sensitive_data_scanner/
[13]: /ko/tracing/trace_collection/dd_libraries/dotnet-core
[14]: /ko/tracing/trace_collection/dd_libraries/dotnet-framework
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: /ko/getting_started/site/
[17]: /ko/logs/log_configuration/pipelines/?tab=source
[18]: /ko/api/latest/logs/#send-logs
[19]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[20]: /ko/glossary/#tail