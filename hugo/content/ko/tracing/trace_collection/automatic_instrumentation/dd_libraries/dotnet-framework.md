---
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
- /ko/tracing/trace_collection/dd_libraries/dotnet-framework
code_lang: dotnet-framework
code_lang_weight: 70
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: 설명서
  text: .NET 애플리케이션 로그를 트레이스에 연결
- link: /tracing/metrics/runtime_metrics/dotnet/
  tag: 설명서
  text: 런타임 메트릭
- link: /serverless/azure_app_services/
  tag: 설명서
  text: 마이크로소프트 Azure 앱 서비스 확장
- link: /tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스 및 트레이스 탐색
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: 블로그
  text: Datadog 애플리케이션 성능 모니터링(APM) 및 분산 추적을 통한 .NET 모니터링
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: 블로그
  text: 컨테이너형 ASP.NET 코어 애플리케이션 모니터링
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-aws-fargate/
  tag: 블로그
  text: AWS Fargate에서 컨테이너형 ASP.NET 코어 애플리케이션 모니터링
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: 블로그
  text: Datadog 연속적인 프로파일러를 사용하여 .NET 애플리케이션 성능 최적화
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: 소스 코드
  text: 커스텀 계측의 예
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: 소스 코드
  text: 소스 코드
title: .NET 프레임워크 애플리케이션 추적
type: multi-code-lang
---
## 호환성 요구사항

### 지원되는 .NET 프레임워크 런타임

.NET 트레이서는 .NET 프레임워크 >= 4.6.1에서 계측을 지원합니다.

Datadog의 .NET 프레임워크 라이브러리 및 프로세서 아키텍처 지원(레거시 및 유지보수 버전 포함)에 대한 전체 목록은 [호환성 요구사항][1]을 참조하세요.

## 설치 및 시작하기

<div class="alert alert-info">
  Datadog 애플리케이션 성능 모니터링(APM)을 설정하려면 AWS Lambda에서 <strong><a href="/tracing/serverless_functions/">서버리스 기능/함수 추적</a></strong>을, Azure 앱 서비스에서 <strong><a href="/serverless/azure_app_services/">Azure 앱 서비스 추적</a></strong>을 참조하세요.
</div>

<div class="alert alert-danger">
  <strong>참고:</strong> Datadog의 자동 계측은 .NET CLR 프로파일링 API를 사용합니다. 이 API는 하나의 구독자(예: Datadog APM)만 허용합니다. 가시성을 극대화하려면 애플리케이션 환경에서 하나의 APM 솔루션만 실행하세요.
</div>

### 설치

시작하기 전에 [에이전트 설치 및 설정][12]을 이미 완료했는지 확인합니다.

1. [트레이서를 설치합니다.](#install-the-tracer)
3. [서비스를 위한 트레이서를 활성화합니다.](#enable-the-tracer-for-your-service)
4. [실시간 데이터를 봅니다.](#view-your-live-data)

### 트레이서 설치

Datadog Agent를 설치하고 구성한 후 다음 단계는 추적 라이브러리를 애플리케이션에 직접 추가하여 계측하는 것입니다. [호환성 정보][1]에 대해 자세히 알아보세요.

Datadog.NET 트레이서를 시스템 전체에 설치하여 시스템의 모든 서비스가 기기화되거나 애플리케이션별로 설치되어 개발자가 애플리케이션의 종속성을 통해 계측을 관리할 수 있도록 합니다. 시스템 전체 설치 지침을 보려면 윈도우즈(Windows) 탭을 클릭하고 애플리케이션별 설치 지침을 보려면 NuGet 탭을 클릭합니다.

{{< tabs >}}

{{% tab "Windows" %}}

.NET 트레이서를 시스템 전체에 설치하려면:

1. [.NET 트레이서 MSI 설치 관리자][1]을 다운로드합니다. 운영 체제(x64 또는 x86)와 일치하는 아키텍처의 MSI 설치 관리자를 선택합니다.

2. 관리자 권한으로 .NET 트레이서 MSI 설치 관리자를 실행합니다.

PowerShell에서 다음을 실행하여 MSI 설정을 스크립팅할 수도 있습니다:`Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-danger">
  <strong>참고:</strong> 이 설치는 IIS에서 실행 중인 애플리케이션을 계측하지 않습니다. IIS에서 실행 중인 애플리케이션의 경우 윈도우즈(Windows) 시스템 전체 설치 프로세스를 따르세요.
</div>

애플리케이션별 .NET 트레이서를 설치하려면:

1. `Datadog.Trace.Bundle` [NuGet 패키지][1]를 애플리케이션에 추가합니다.


[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### 서비스를 위한 트레이서 활성화

서비스에 .NET 트레이서를 사용하도록 설정하려면 필요한 환경 변수를 설정하고 애플리케이션을 다시 시작합니다.

환경 변수 설정 방법에 대한 자세한 내용은 [프로세스 환경 변수 설정](#configuring-process-environment-variables)을 참조하세요.

{{< tabs >}}

{{% tab "Windows" %}}

#### 인터넷 정보 서비스 (IIS)

1. .NET 트레이서 MSI 설치 관리자가 필요한 모든 환경 변수를 추가합니다. 설정해야 하는 환경 변수가 없습니다.

2. IIS에서 호스팅되는 애플리케이션을 자동으로 계측하려면 관리자로서 다음 명령을 실행하여 IIS를 완전히 중지하고 시작합니다:

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-danger">
     <strong>Note:</strong> Always use the commands above to completely stop and restart IIS to enable the tracer. Avoid using the IIS Manager GUI application or <code>iisreset.exe</code>.
   </div>


#### IIS에 없는 서비스

<div class="alert alert-info">버전 2.14.0부터는 MSI를 사용하여 트레이서를 설치한 경우 <code>COR_PROFILER</code>를 설정할 필요가 없습니다.</div>

1. 애플리케이션에 자동 계측을 첨부하는 데 필요한 환경 변수를 다음과 같이 설정합니다:

   ```
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```
2. 독립 실행형 애플리케이션 및 윈도우즈(Windows) 서비스의 경우 수동으로 애플리케이션을 다시 시작합니다.

{{% /tab %}}

{{% tab "NuGet" %}}

[`dd-trace-dotnet` 리포지토리][1]에서도 사용 가능한 패키지 readme의 지침서를 따릅니다.
도커(Docker) 예시는 [리포지토리][2]에서도 사용할 수 있습니다.



[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### 실시간 데이터 보기

서비스에 .NET 트레이서를 활성화한 후:

1. 서비스를 다시 시작합니다.

2. 애플리케이션 로드를 생성합니다.

3. Datadog에서 [**APM**> **APM Traces**][3]으로 이동합니다.

## 구성

필요한 경우 통합 서비스 태깅 설정을 포함하여 애플리케이션 성능 원격 측정 데이터를 전송하도록 추적 라이브러리를 설정합니다. 자세한 내용은 [라이브러리 설정][4]을 참조하세요.

## 커스텀 계측

커스텀 계측 설정은 자동 계측에 따라 다르며 방법에 따라 추가 단계가 포함됩니다:

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-danger">
  <strong>참고:</strong> 자동 계측과 커스텀 계측을 모두 사용하는 경우 패키지 버전(예: MSI 및 NuGet)을 동기화 상태로 유지해야 합니다.
</div>

.NET 애플리케이션에서 커스텀 계측을 사용하려면:

1. `Datadog.Trace` [NuGet 패키지][1]를 애플리케이션에 추가합니다.
2. 애플리케이션 코드에서 `Datadog.Trace.Tracer.Instance` 속성을 통해 글로벌 트레이서에 액세스하여 새로운 스팬을 생성합니다.


[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "NuGet" %}}

.NET 애플리케이션에서 커스텀 계측을 사용하려면:

1. 애플리케이션 코드에서 `Datadog.Trace.Tracer.Instance` 속성을 통해 글로벌 트레이서에 액세스하여 새로운 스팬을 생성합니다.

{{% /tab %}}

{{< /tabs >}}

커스텀 계측을 위한 스팬(span) 및 태그 추가에 대한 자세한 내용은 [.NET 커스텀 계측 설명서][5]를 참조하세요.

## 프로세스 환경 변수 설정

서비스에 자동 계측을 첨부하려면 애플리케이션을 시작하기 전에 필요한 환경 변수를 설정하세요. .NET 트레이서 설치 방법에 따라 설정할 환경 변수를 식별하려면 [서비스에 대해 트레이서 사용](#Enable-the-tracer-for-service) 섹션을 참조하고 다음 예제를 따라 계측된 서비스의 환경에 따라 환경 변수를 올바르게 설정합니다.

### 윈도우즈(Windows)

<div class="alert alert-info">버전 2.14.0부터는 MSI를 사용하여 트레이서를 설치한 경우 <code>COR_PROFILER</code>를 설정할 필요가 없습니다.</div>

#### 윈도우즈(Windows) 서비스

{{< tabs >}}

{{% tab "레지스트리 편집기" %}}

레지스트리 편집기에서 `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>`키에 `Environment`가 호출된 다중 문자열 값을 생성하고 값 데이터를 다음과 같이 설정합니다:

```text
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

{{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="레지스트리 편집기를 사용하여 윈도우즈(Windows) 서비스의 환경 변수 생성" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
[string[]] $v = @("COR_ENABLE_PROFILING=1", "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
```
{{% /tab %}}

{{< /tabs >}}

#### IIS

MSI를 설치한 후에는 IIS 사이트를 자동으로 계측하기 위한 추가 설정이 필요하지 않습니다. 모든 IIS 사이트에서 상속되는 추가 환경 변수를 설정하려면 다음 단계를 수행합니다:

1. 레지스트리 편집기를 열고 `HKLM\System\CurrentControlSet\Services\WAS` 키에서 `Environment`가 호출된 다중 문자열 값을 찾은 다음 환경 변수를 행당 하나씩 추가합니다. 예를 들어 로그 주입 및 런타임 메트릭을 추가하려면 값 데이터에 다음 행을 추가합니다:
   ```text
   DD_LOGS_INJECTION=true
   DD_RUNTIME_METRICS_ENABLED=true
   ```
2. IIS를 다시 시작하려면 다음 명령을 실행합니다:
   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="레지스트리 편집기를 사용하여 모든 IIS 사이트에 대한 환경 변수 생성" >}}

#### 콘솔 애플리케이션

콘솔 애플리케이션을 자동으로 계측하려면 애플리케이션을 시작하기 전에 배치 파일에서 환경 변수를 설정합니다:

```bat
rem 환경 변수 설정
SET COR_ENABLE_PROFILING=1
rem v2.14.0+이고 MSI로 트레이서를 설치하지 않은 경우
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem 추가 Datadog 환경 변수 설정
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem 애플리케이션 시작
dotnet.exe example.dll
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/tracing/compatibility_requirements/dotnet-framework
[2]: /ko/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /ko/tracing/trace_collection/library_config/dotnet-framework/
[5]: /ko/tracing/trace_collection/custom_instrumentation/dotnet/
[11]: /ko/tracing/trace_collection/library_injection_local/
[12]: /ko/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent