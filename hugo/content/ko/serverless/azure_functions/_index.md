---
further_reading:
- link: /serverless/guide/disable_serverless
  tag: 문서
  text: Serverless Monitoring 비활성화
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=azure#azure-functions
  tag: 문서
  text: OTLP를 사용하여 Azure Functions 트레이스를 Datadog으로 전송
- link: http://datadoghq.com/blog/azure-well-architected-serverless-applications-best-practices/
  tag: 블로그
  text: Well-Architected Framework를 사용하여 안전하고 확장 가능한 Azure Serverless 애플리케이션 구축
- link: https://www.datadoghq.com/blog/monitor-azure-functions-hosting-plans/
  tag: 블로그
  text: Datadog을 사용하여 모든 호스팅 플랜에서 Azure Functions 모니터링하기
title: Azure Functions용 Serverless Monitoring 설치
---
## 개요 {#overview}
이 페이지에서는 Azure Functions에서 트레이스, 트레이스 메트릭, 런타임 메트릭, 향상된 메트릭 및 사용자 지정 메트릭을 수집하는 방법을 설명합니다. [향상된 메트릭][11]은 `azure.functions.enhanced.*` 네임스페이스로 구분됩니다. 추가 메트릭을 수집하려면 [Datadog Azure 통합][5]을 설치하세요.

다음은 Azure Functions 모니터링에서 지원되는 런타임, 운영 체제(OS) 및 호스팅 플랜 목록입니다.
- **런타임**: .NET, Node.js, Python, Java
- **운영 체제(OS)**: Windows, Linux
- **호스팅 플랜**: Dedicated(App Service) 플랜, Premium 플랜, Consumption 플랜, Flex Consumption 플랜

권장 설치 방법은 Azure Function의 구성에 따라 다릅니다.
- Dedicated/App Service 플랜 또는 Premium 플랜에서 실행되는 .NET Windows Azure Functions의 경우: [Datadog .NET APM 확장][9]을 사용하세요.
- 기타 모든 구성(다른 런타임, 운영 체제 또는 호스팅 플랜 포함)의 경우: 아래 지침에 따라 Serverless Compatibility Layer를 설치하세요.

## 설정 {#setup}

아직 설치하지 않았다면 [Datadog-Azure 통합][5]을 설치하여 메트릭 및 로그를 수집하세요. 그리고 다음 단계에 따라 애플리케이션을 계측하세요.

{{< programming-lang-wrapper langs="nodejs,python,java,dotnet" >}}
{{< programming-lang lang="nodejs" >}}
1. **종속성 설치**. 다음 명령을 실행합니다.
   ```shell
   npm install @datadog/serverless-compat
   npm install dd-trace
   ```

   Datadog은 기능 향상 및 버그 수정을 위해 패키지 버전을 고정하고 `@datadog/serverless-compat` 및 `dd-trace`의 최신 버전으로 정기적으로 업그레이드할 것을 권장합니다.

2. **Datadog Serverless Compatibility Layer를 시작하고 Datadog Node.js SDK를 초기화하세요**.
   
   `--require` 옵션을 사용하여 한 단계로 Serverless Compatibility Layer와 Datadog Node.js SDK를 로드하고 초기화하세요. Azure Functions의 Node 옵션은 환경 변수 `languageWorkers__node__arguments`를 사용하여 구성할 수 있습니다.

   ```
   languageWorkers__node__arguments='--require @datadog/serverless-compat/init --require dd-trace/init'
   ```

3. **Datadog Node.js SDK 구성**

   [Node.js SDK 구성][1]

[1]:/ko/tracing/trace_collection/library_config/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
1. **종속성 설치**. 다음 명령을 실행합니다.
   ```shell
   pip install datadog-serverless-compat
   pip install ddtrace
   ```

   Datadog은 기능 향상 및 버그 수정을 위해 `datadog-serverless-compat` 및 `ddtrace`의 최신 버전을 사용할 것을 권장합니다.

2. **Datadog Serverless Compatibility Layer를 시작하고 Datadog Python SDK를 초기화하세요**. 메인 애플리케이션 진입점 파일에 다음 줄을 추가합니다.

   ```python
   from datadog_serverless_compat import start
   start()

   import ddtrace.auto # noqa: E402, F401
   ```

3. **Datadog Python SDK 구성**

   [Python SDK 구성][1]

[1]:/ko/tracing/trace_collection/library_config/python
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
1. **종속성 설치**. Datadog JAR을 다운로드하고 함수와 함께 배포하세요.
   ```bash
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   wget -O dd-serverless-compat-java-agent.jar 'https://dtdg.co/latest-serverless-compat-java-agent'
   ```
   특정 버전의 Datadog Serverless Compatibility Layer는 Datadog의 [Maven 리포지토리][1]를 참조하세요.

   Datadog은 기능 향상 및 버그 수정을 위해 `dd-serverless-compat-java-agent` 및 `dd-java-agent`의 최신 버전으로 정기적으로 업그레이드할 것을 권장합니다.

2. **Datadog Serverless Compatibility Layer를 시작하고 Datadog Java SDK를 초기화하세요**. 다음 `-javaagent` 인수를 JVM 옵션에 추가합니다.

   ```bash
   -javaagent:/path/to/dd-serverless-compat-java-agent.jar -javaagent:/path/to/dd-java-agent.jar
   ```

   **참고**: JVM 옵션을 설정하기 위한 환경 변수는 호스팅 플랜(예: Consumption, Elastic Premium, Dedicated)에 따라 다릅니다. 호스팅 플랜에 적합한 환경 변수에 대한 자세한 내용은 [Azure Functions Java 개발자 가이드][2]를 참조하세요.

3. **Datadog Java SDK 구성**

   [Java SDK 구성][3]

[1]: https://repo1.maven.org/maven2/com/datadoghq/dd-serverless-compat-java-agent/
[2]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-java?tabs=bash%2Cconsumption#customize-jvm
[3]: /ko/tracing/trace_collection/library_config/java
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
1. **종속성 설치**. 다음 명령을 실행합니다.
   ```shell
   dotnet package add Datadog.AzureFunctions
   ```

   Datadog은 기능 향상 및 버그 수정을 위해 `Datadog.AzureFunctions`의 최신 버전으로 정기적으로 업그레이드할 것을 권장합니다.

2. **Datadog Serverless Compatibility Layer를 시작하세요**.

   Azure Function 앱이 Isolated Worker 모델을 사용하는 경우, 메인 애플리케이션 진입점 파일에 다음 줄을 추가합니다.
   ```csharp
   Datadog.Serverless.CompatibilityLayer.Start();
   ```

   Azure Function 앱이 [레거시 인프로세스 모델][3]을 사용하는 경우, `Microsoft.Azure.Functions.Extensions`에 대한 NuGet 패키지 참조를 추가합니다.
   ```shell
   dotnet package add Microsoft.Azure.Functions.Extensions
   ```

   그리고 애플리케이션에 다음 `.cs` 파일을 추가합니다.
   ```csharp
   using Datadog.Serverless;
   using Microsoft.Azure.Functions.Extensions.DependencyInjection;

   [assembly: FunctionsStartup(typeof(MyFunctionApp.Startup))]

   namespace MyFunctionApp
   {
      public class Startup : FunctionsStartup
      {
         public override void Configure(IFunctionsHostBuilder builder)
         {
               Datadog.Serverless.CompatibilityLayer.Start();
         }
      }
   }
   ```

3. **자동 계측 구성**

   Azure Function 앱이 Windows에서 실행되는 경우, Function 앱에 다음 환경 변수를 추가합니다.
   ```
   CORECLR_ENABLE_PROFILING=1

   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

   CORECLR_PROFILER_PATH_64=
   C:\home\site\wwwroot\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll

   CORECLR_PROFILER_PATH_32=
   C:\home\site\wwwroot\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll

   DD_DOTNET_TRACER_HOME=C:\home\site\wwwroot\datadog

   ```

   Azure Function 앱이 Linux에서 실행되는 경우, Function 앱에 다음 환경 변수를 추가합니다.
   ```
   CORECLR_ENABLE_PROFILING=1

   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

   CORECLR_PROFILER_PATH=
      /home/site/wwwroot/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so

   DD_DOTNET_TRACER_HOME=/home/site/wwwroot/datadog

   ```

4. **Datadog .NET SDK 구성**

   - [Datadog .NET Core SDK 구성][1]
   - [Datadog .NET Framework SDK 구성][2]

[1]: /ko/tracing/trace_collection/library_config/dotnet-core
[2]: /ko/tracing/trace_collection/library_config/dotnet-framework
[3]: https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-in-process-differences
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

5. **함수 배포**.

6. **Datadog 수집을 구성하세요**. 함수의 애플리케이션 설정에 다음 환경 변수를 추가합니다.

   | 이름 | 값 |
   | ---- | ----- |
   | `DD_API_KEY` | [Datadog API 키][1]. |
   | `DD_SITE` | [Datadog 사이트][2]. 예를 들어, {{< region-param key=dd_site code="true" >}}. |
   | `DD_AZURE_RESOURCE_GROUP` | Azure 리소스 그룹. [Flex Consumption 플랜][8]의 Azure Functions의 경우에만 필요합니다. |

   {{% svl-tracing-env %}}

7. **Unified Service Tagging을 구성합니다**. [Datadog Azure 통합][5]을 설치하여 Azure Functions에서 메트릭을 수집할 수 있습니다. 이 메트릭을 트레이스와 연관시키려면 먼저 Azure의 리소스에 `env`, `service`, `version` 태그를 설정하세요. 그리고 다음 환경 변수를 설정하세요.

   | 이름 | 값 |
   | ---- | ----- |
   | `DD_ENV` | [Unified Service Tagging][7]을 위해 환경에 태그를 지정하는 방법. 예를 들어, `prod`입니다. |
   | `DD_SERVICE` | [Unified Service Tagging][7]을 위해 서비스에 태그를 지정하는 방법.  |
   | `DD_VERSION` | [Unified Service Tagging][7]을 위해 버전에 태그를 지정하는 방법. |

## 다음 단계는? {#whats-next}

- [{{< ui >}}Trace Explorer{{< /ui >}}][3]에서 Azure Functions 트레이스를 볼 수 있습니다. 트레이스를 보려면 `DD_SERVICE` 환경 변수에 설정한 서비스 이름을 검색하세요.
- [Datadog Azure 통합][5]에서 수집한 텔레메트리로 보강된 트레이스를 보려면 [{{< ui >}}Serverless{{< /ui >}} > {{< ui >}}Azure Functions{{< /ui >}}][4] 페이지를 사용할 수 있습니다.

## 프로파일링 {#profiling}

<div class="alert alert-info">
Datadog의 Continuous Profiler는 Azure Functions에서 Python 및 Node.js용으로 미리 보기로 제공되고 있습니다.
</div>

[Continuous Profiler][10]를 활성화하려면 환경 변수 `DD_PROFILING_ENABLED=true`를 설정하세요.

## 문제 해결 {#troubleshooting}

### 디버그 로그 활성화{#enable-debug-logs}

문제 해결을 위해 [디버그 로그][6]를 수집할 수 있습니다. 디버그 로그를 구성하려면 다음 환경 변수를 사용하세요.

`DD_TRACE_DEBUG`
: Datadog SDK의 디버그 로깅을 활성화(`true`)하거나 비활성화(`false`)합니다. 기본값은 `false`입니다.

  **값**: `true`, `false`

`DD_LOG_LEVEL`
: Datadog Serverless Compatibility Layer의 로깅 수준을 설정합니다. 기본값은 `info`입니다.

  **값**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off`

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/api-app-keys/#add-an-api-key-or-client-token
[2]: /ko/getting_started/site
[3]: https://app.datadoghq.com/apm/traces
[4]: https://app.datadoghq.com/functions?cloud=azure&entity_view=function
[5]: /ko/integrations/azure/
[6]: /ko/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[7]: /ko/getting_started/tagging/unified_service_tagging/
[8]: https://learn.microsoft.com/en-us/azure/azure-functions/flex-consumption-plan
[9]: /ko/serverless/azure_functions/dotnet_extension/
[10]: /ko/profiler/
[11]: /ko/integrations/azure-functions/#metrics