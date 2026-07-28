---
algolia:
  tags:
  - C#
  - APM
aliases:
- /ko/tracing/dotnet
- /ko/tracing/languages/dotnet
- /ko/tracing/setup/dotnet
- /ko/tracing/setup_overview/dotnet
- /ko/agent/apm/dotnet/
- /ko/tracing/dotnet-framework
- /ko/tracing/languages/dotnet-framework
- /ko/tracing/setup/dotnet-framework
- /ko/agent/apm/dotnet-framework/
- /ko/tracing/setup_overview/dotnet-framework
- /ko/tracing/setup_overview/setup/dotnet
- /ko/tracing/setup_overview/setup/dotnet-framework
- /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework
code_lang: dotnet-framework
code_lang_weight: 70
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: 설명서
  text: .NET 애플리케이션 로그를 트레이스에 연결하기
- link: /tracing/metrics/runtime_metrics/dotnet/
  tag: 설명서
  text: 런타임 메트릭
- link: /serverless/azure_app_services/
  tag: 설명서
  text: Microsoft Azure App Service 확장
- link: /tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 둘러보기
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: 블로그
  text: Datadog APM 및 분산 트레이싱을 사용한 .NET 모니터링
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: 블로그
  text: 컨테이너화된 ASP.NET Core 애플리케이션 모니터링
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-aws-fargate/
  tag: 블로그
  text: AWS Fargate에서 컨테이너화된 ASP.NET Core 애플리케이션 모니터링
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: 블로그
  text: Datadog Continuous Profiler로 .NET 애플리케이션 성능 최적화하기
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: 소스 코드
  text: 사용자 지정 계측 예시
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: 소스 코드
  text: 소스 코드
title: .NET Framework 애플리케이션 트레이싱
type: multi-code-lang
---
## 호환성 요구 사항 {#compatibility-requirements}

### 지원되는 .NET Framework 런타임 {#supported-net-framework-runtimes}

.NET Tracer는 .NET Framework >= 4.6.1에서의 계측을 지원합니다.

Datadog의 .NET Framework 라이브러리 및 프로세서 아키텍처 지원(레거시 버전 및 유지 관리 버전 포함) 전체 목록은 [호환성 요구 사항][1]을 참조하세요.

## 설치 및 시작하기 {#installation-and-getting-started}

<div class="alert alert-info">
  AWS Lambda 또는 Azure Functions와 같은 Serverless 환경에서 Datadog APM을 설정하려면 <a href="/serverless">Serverless</a>를 참조하세요.
</div>

<div class="alert alert-danger">
  <strong>참고:</strong> Datadog의 자동 계측은 .NET CLR 프로파일링 API를 사용합니다. 이 API는 하나의 구독자만 허용합니다(예: Datadog APM). 최대한의 가시성을 확보하려면 애플리케이션 환경에서 하나의 APM 솔루션만 실행해야 합니다.
</div>

### 설치 {#installation}

시작하기 전에 먼저 [Agent를 설치하고 구성][12]했는지 확인하세요.

1. [SDK를 설치합니다.](#install-the-sdk)
3. [서비스에 SDK를 활성화합니다.](#enable-the-sdk-for-your-service)
4. [실시간 데이터를 조회합니다.](#view-your-live-data)

### SDK 설치 {#install-the-sdk}

Datadog Agent를 설치하고 구성했으면, 다음 단계로 애플리케이션을 계측할 SDK를 애플리케이션에 직접 추가합니다. 자세한 정보는 [호환성 정보][1]를 참조하세요.

Datadog .NET Tracer를 시스템 전체에 설치하여 해당 시스템의 모든 서비스가 계측되게 하거나, 애플리케이션별로 설치하여 개발자가 애플리케이션의 종속성을 통해 계측을 관리하도록 합니다. 시스템 전체 설치 방법을 보려면 Windows 탭을 클릭하세요. 애플리케이션별 설치 지침을 보려면 NuGet 탭을 클릭하세요.

{{< tabs >}}

{{% tab "Windows" %}}

.NET Tracer를 시스템 전체에 설치하려면 다음 단계를 수행합니다.

1. [.NET Tracer MSI 설치 프로그램][1]을 다운로드합니다. 64비트 Windows를 실행 중인 경우 x64 MSI 설치 프로그램을 사용하세요. 이는 64비트 및 32비트 애플리케이션 모두를 계측할 수 있습니다. 32비트 Windows를 실행 중인 경우에만 x86 설치 프로그램을 선택하세요. v3.0.0부터는 32비트 운영 체제를 지원하지 않으므로 x64 설치 프로그램만 제공됩니다.

2. .NET Tracer MSI 설치 프로그램을 관리자 권한으로 실행합니다.

PowerShell에서 다음 명령을 실행하여 MSI 설치를 스크립트 방식으로 수행할 수도 있습니다. `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-danger">
  <strong>참고:</strong> 이 설치 방식은 IIS에서 실행되는 애플리케이션을 계측하지 않습니다. IIS에서 실행되는 애플리케이션의 경우, Windows 시스템 전체 설치 절차를 따르세요.
</div>

애플리케이션별로 .NET Tracer를 설치하는 방법:

1. 애플리케이션에 `Datadog.Trace.Bundle` [NuGet 패키지][1]를 추가합니다.


[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### 서비스에 SDK 활성화 {#enable-the-sdk-for-your-service}

서비스에 .NET Tracer를 활성화하려면 필요한 환경 변수를 설정한 후 애플리케이션을 다시 시작하세요.

환경 변수를 설정하는 다양한 방법에 대한 정보는 [프로세스 환경 변수 구성](#configuring-process-environment-variables)을 참조하세요.

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services(IIS) {#internet-information-services-iis}

1. .NET Tracer MSI 설치 프로그램은 모든 필요한 환경 변수를 추가합니다. 별도로 구성해야 하는 환경 변수는 없습니다.

2. IIS에서 호스팅되는 애플리케이션을 자동으로 계측하려면, 다음 명령을 관리자 권한으로 실행하여 IIS를 완전히 중지하고 시작합니다.

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-danger">
     <strong>참고:</strong> SDK를 활성화하려면 항상 위의 명령을 사용하여 IIS를 완전히 중지하고 재시작하세요. IIS Manager GUI 애플리케이션 또는 <code>iisreset.exe</code>사용은 피하세요.
   </div>


#### IIS 외부의 서비스 {#services-outside-iis}

<div class="alert alert-danger">
  <strong>참고:</strong> .NET 런타임은 이러한 환경 변수가 설정된 상태에서 시작되는 <em>모든</em> .NET 프로세스에 .NET 라이브러리를 로드하려고 시도합니다. 계측이 필요한 애플리케이션에만 적용되도록 범위를 제한해야 합니다. <strong>이 환경 변수를 전역적으로 설정하지 마세요. 이렇게 하면 호스트의 <em>모든</em> .NET 프로세스가 계측됩니다.</strong>
</div>

1. 애플리케이션에 자동 계측을 연결하려면 다음 필수 환경 변수를 설정합니다.

   ```
   COR_ENABLE_PROFILING=1
   ```
2. 독립 실행형 애플리케이션 및 Windows 서비스의 경우, 애플리케이션을 수동으로 다시 시작합니다.

{{% /tab %}}

{{% tab "NuGet" %}}

패키지 README의 지침을 따르세요. 이 README는 [`dd-trace-dotnet` 리포지토리][1]에서도 확인할 수 있습니다.
Docker 예제도 [리포지토리][2]에서 확인할 수 있습니다.

[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment

{{% /tab %}}

{{< /tabs >}}

### 실시간 데이터 조회 {#view-your-live-data}

서비스에 대해 .NET Tracer를 활성화한 후:

1. 서비스를 다시 시작합니다.

2. 애플리케이션 로드를 생성합니다.

3. Datadog에서 [**APM** > **APM Traces**][3]로 이동합니다.

## 구성 {#configuration}

필요한 경우 Unified Service Tagging을 설정하는 등 SDK가 애플리케이션 성능 텔레메트리 데이터를 전송하도록 구성합니다. 자세한 내용은 [라이브러리 구성][4]을 참조하세요.

## 사용자 지정 계측 {#custom-instrumentation}

사용자 지정 계측은 자동 계측에 따라 달라지며 사용 방법에 따라 추가 단계가 필요합니다.

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-danger">
<strong>참고:</strong> v3.0.0부터 사용자 지정 계측은 자동 계측을 함께 사용해야 합니다. 자동 계측 패키지(MSI)와 사용자 지정 계측 패키지(NuGet)의 버전은 가능한 한 동일하게 유지하고 서로 다른 주 버전을 혼용하지 않는 것이 좋습니다.
</div>

.NET 애플리케이션에서 사용자 지정 계측을 사용하려면:

1. 자동 계측을 사용하여 애플리케이션을 계측합니다.
2. 애플리케이션에 `Datadog.Trace` [NuGet 패키지][1]를 추가합니다.
3. 애플리케이션 코드에서 `Datadog.Trace.Tracer.Instance` 속성을 통해 전역 트레이서에 액세스하고 새 스팬을 생성합니다.

[1]: https://www.nuget.org/packages/Datadog.Trace

{{% /tab %}}

{{% tab "NuGet" %}}

.NET 애플리케이션에서 사용자 지정 계측을 사용하려면:

1. 애플리케이션 코드에서 `Datadog.Trace.Tracer.Instance` 속성을 통해 전역 트레이서에 액세스하고 새 스팬을 생성합니다.

{{% /tab %}}

{{< /tabs >}}

사용자 지정 계측에 스팬과 태그를 추가하는 방법에 대한 자세한 정보는 [.NET 사용자 지정 계측 설명서][5]를 참조하세요.

## 프로세스 환경 변수 구성 {#configuring-process-environment-variables}

자동 계측을 서비스에 연결하려면 애플리케이션을 시작하기 전에 필수 환경 변수를 설정합니다. [서비스에 SDK 활성화](#enable-the-sdk-for-your-service) 섹션을 참조하여 .NET Tracer 설치 방법에 따라 설정해야 할 환경 변수를 확인하고, 아래 예제를 따라 계측된 서비스의 환경에 따라 환경 변수를 올바르게 설정하세요.

<div class="alert alert-danger">
  <strong>참고:</strong> .NET 런타임은 이러한 환경 변수가 설정된 상태에서 시작되는 <em>모든</em> .NET 프로세스에 .NET 라이브러리를 로드하려고 시도합니다. 계측이 필요한 애플리케이션에만 적용되도록 범위를 제한해야 합니다. <strong>이 환경 변수를 전역적으로 설정하지 마세요. 이렇게 하면 호스트의 <em>모든</em> .NET 프로세스가 계측됩니다.</strong>
</div>

#### Windows 서비스 {#windows-services}

{{< tabs >}}

{{% tab "레지스트리 편집기" %}}

레지스트리 편집기에서 `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` 키 아래에 `Environment`라는 이름의 다중 문자열 값을 생성한 다음, 값 데이터에 다음 내용을 설정합니다.

```text
COR_ENABLE_PROFILING=1
```

{{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Windows 서비스에 대한 환경 변수를 생성하기 위해 레지스트리 편집기 사용" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value 'COR_ENABLE_PROFILING=1'
```
{{% /tab %}}

{{< /tabs >}}

#### IIS {#iis}

MSI를 설치한 후에는 IIS 사이트를 자동으로 계측하기 위해 추가 구성이 필요하지 않습니다. 모든 IIS 사이트에서 상속되는 추가 환경 변수를 설정하려면 다음 단계를 수행하세요.

1. 레지스트리 편집기를 열고 `HKLM\System\CurrentControlSet\Services\WAS` 키에 있는 `Environment`라는 다중 문자열 값을 찾아 환경 변수를 한 줄씩 추가합니다. 예를 들어, 로그 주입 및 런타임 메트릭을 추가하려면 값 데이터에 다음 줄을 추가합니다.
   ```text
   DD_LOGS_INJECTION=true
   DD_RUNTIME_METRICS_ENABLED=true
   ```
2. 다음 명령을 실행하여 IIS를 재시작합니다.
   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="모든 IIS 사이트에 대한 환경 변수를 생성하기 위해 레지스트리 편집기 사용" >}}

#### 콘솔 애플리케이션 {#console-applications}

콘솔 애플리케이션을 자동으로 계측하려면, 애플리케이션을 시작하기 전에 배치 파일에서 환경 변수를 설정하세요.

```bat
rem Set required environment variables
SET COR_ENABLE_PROFILING=1

rem (Optionally) Set additional Datadog environment variables, for example:
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Start application
dotnet.exe example.dll
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/tracing/compatibility_requirements/dotnet-framework
[2]: /ko/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /ko/tracing/trace_collection/library_config/dotnet-framework/
[5]: /ko/tracing/trace_collection/custom_instrumentation/dotnet/
[11]: /ko/tracing/trace_collection/library_injection_local/
[12]: /ko/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent