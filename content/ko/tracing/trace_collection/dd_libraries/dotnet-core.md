---
aliases:
- /ko/tracing/dotnet-core
- /ko/tracing/languages/dotnet-core
- /ko/tracing/setup/dotnet-core
- /ko/agent/apm/dotnet-core/
- /ko/tracing/setup/dotnet-core
- /ko/tracing/setup_overview/dotnet-core
- /ko/tracing/setup_overview/setup/dotnet-core
code_lang: dotnet-core
code_lang_weight: 60
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: 설명서
  text: .NET 애플리케이션 로그를 트레이스에 연결
- link: /tracing/metrics/runtime_metrics/dotnet/
  tag: 설명서
  text: 런타임 메트릭
- link: /serverless/azure_app_services/
  tag: 설명서
  text: Microsoft Azure 앱 서비스 확장
- link: /tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스 및 트레이스 탐색
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: 블로그
  text: Datadog 애플리케이션 성능 모니터링(APM) 및 분산 추적을 통한 .NET 모니터링
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: 블로그
  text: 컨테이너형 ASP.NET 코어 애플리케이션 모니터링
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: 블로그
  text: ASP.NET Core 애플리케이션을 Azure App Service에 배포
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: 블로그
  text: Datadog 연속적인 프로파일러를 사용하여 .NET 애플리케이션 성능 최적화
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: GitHub
  text: 커스텀 계측의 예
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: GitHub
  text: 소스 코드
kind: documentation
title: .NET Core 애플리케이션 추적
type: multi-code-lang
---

## 호환성 요구 사항

### 지원되는 .NET 코어 런타임

NET 트레이서는 .NET Core 2.1, 3.1, .NET 5, .NET 6, NET 7.에서 계측을 지원합니다.

Datadog의 .NET 코어 라이브러리 및 프로세서 아키텍처 지원(레거시 및 유지 보수 버전 포함)에 대한 전체 목록은 [호환성 요구사항][1]을 참조하세요.

## 설치 및 시작하기

<div class="alert alert-info">
    AWS Lambda에서 Datadog 애플리케이션 성능 모니터링(APM)을 설정하려면 <strong><a href="/tracing/serverless_functions/">서버리스 기능 추적</a>을</strong>, Azure 앱 서비스에서 설정하려면 <strong><a href="/serverless/azure_app_services/">Azure 앱 서비스 추적</a>을 참조하세요</strong>.
</div>

<div class="alert alert-warning">
  <strong>참고:</strong> Datadog의 자동 계측은 .NET CLR 프로파일링 API에 의존합니다. 이 API는 가입자 한 명만(예: 프로파일러가 활성화된 Datadog의 .NET 트레이서) 허용합니다. 가시성을 최대한 확보하기 위해 애플리케이션 환경에서 하나의 애플리케이션 성능 모니터링(APM) 솔루션만 실행하세요.
</div>

<div class="alert alert-info">
  트리밍된 앱을 계측하려면 프로젝트에서 <a href="https://www.nuget.org/packages/Datadog.Trace.Trimming/">Datadog.Trace.Triming</a> NuGet 패키지를 참조하세요. 트리밍된 앱에 대한 지원은 베타 버전입니다.
</div>

### 설치

시작하기 전에 [Agent 설치 및 설정][12]을 이미 완료했는지 확인합니다.

1. [계측 메서드 선택](##choose-your-instrumentation-method)
2. [트레이서를 설치합니다.](#install-the-tracer)
3. [서비스에 대한 트레이서를 활성화합니다.](#enable-the-tracer-for-your-service)
4. [실시간 데이터를 확인합니다.](#view-your-live-data)

### 계측 메서드 선택

Datadog Agent를 배포하거나 설치 및 설정한 후 다음 단계는 애플리케이션을 계측하는 것입니다. 애플리케이션이 실행되는 인프라스트럭처, 애플리케이션에 기록된 언어 및 필요한 설정 수준에 따라 다음과 같은 방법으로 이 작업을 수행할 수 있습니다.

지원되는 배포 시나리오 및 언어는 다음 페이지를 참조하세요:

- [계측 라이브러리를 로컬로 삽입합니다][11] (Agent에서); 또는
- [트레이서 설치](#install-the-tracer) 섹션에 설명된 대로 애플리케이션에서 추적 라이브러리를 직접 추가합니다. [호환성 정보][1]에 대한 자세한 내용을 확인하세요.

### 트레이서 설치

Datadog .NET 트레이서를 시스템 전체에 설치하여 시스템의 모든 서비스가 계측되도록 하거나, 애플리케이션별로 설치하여 개발자가 애플리케이션의 종속성을 통해 계측을 관리할 수 있도록 할 수 있습니다. 시스템 전체 설치 지침을 보려면 Windows 또는 Linux 탭을 클릭하세요. 애플리케이션별 설치 지침을 보려면 NuGet 탭을 클릭하세요.

{{< tabs >}}

{{% tab "Windows" %}}

.NET 트레이서를 시스템 전체에 설치하려면:

1. [.NET 트레이서 MSI 설치 관리자][1]을 다운로드합니다. 운영 체제(x64 또는 x86)와 일치하는 아키텍처의 MSI 설치 관리자를 선택합니다.

2. 관리자 권한으로 .NET 트레이서 MSI 설치 관리자를 실행합니다.

PowerShell에서 다음을 실행하여 MSI 설정을 스크립팅할 수도 있습니다:`Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Linux" %}}

.NET 트레이서를 시스템 전체에 설치하려면:

1. 운영 체제 및 아키텍처를 지원하는 최신 [.NET 트레이서 패키지][1]를 다운로드합니다.

2. 다음 명령 중 하나를 실행하여 패키지를 설치하고 적합한 권한을 가진 .NET 트레이서 로그 디렉토리`/var/log/datadog/dotnet`를 생성합니다:

   Debian 또는 Ubuntu
   : `sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb && /opt/datadog/createLogPath.sh`

   CentOS 또는 Fedora
   : `sudo rpm -Uvh datadog-dotnet-apm<TRACER_VERSION>-1.x86_64.rpm && /opt/datadog/createLogPath.sh`

   Alpine 또는 기타 musl 기반 분포
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz && sh /opt/datadog/createLogPath.sh`

   기타 분포
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm<TRACER_VERSION>-tar.gz && /opt/datadog/createLogPath.sh`


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-warning">
  <strong>참고:</strong> 이 설치는 IIS에서 실행 중인 애플리케이션을 계측하지 않습니다. IIS에서 실행 중인 애플리케이션의 경우 Windows 시스템 전체 설치 프로세스를 따르세요.
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

1. .NET 트레이서 MSI 설치 관리자가 필요한 모든 환경 변수를 추가하므로 사용자가 설정해야 하는 환경 변수는 없습니다.

   <div class="alert alert-warning">
     <strong>Note:</strong> You must set the <strong>.NET CLR version</strong> for the application pool to <strong>No Managed Code</strong> as recommended by <a href='https://learn.microsoft.com/aspnet/core/host-and-deploy/iis/advanced#create-the-iis-site'> Microsoft</a>.
   </div>

2. IIS에서 호스팅되는 애플리케이션을 자동으로 계측하려면 관리자로서 다음 명령을 실행하여 IIS를 완전히 중지하고 시작합니다:

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Always use the commands above to completely stop and restart IIS to enable the tracer. Avoid using the IIS Manager GUI application or <code>iisreset.exe</code>.
   </div>


#### IIS에 없는 서비스

<div class="alert alert-info">버전 2.14.0부터는 MSI를 사용하여 트레이서를 설치한 경우 <code>CORECLR_PROFILER</code>를 설정할 필요가 없습니다.</div>

1. 애플리케이션에 자동 계측이 연결되도록 환경 변수를 다음과 같이 설정합니다:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```
2. 독립 실행형 애플리케이션 및 Windows 서비스의 경우 수동으로 애플리케이션을 다시 시작합니다.

{{% /tab %}}

{{% tab "Linux" %}}

1. 애플리케이션에 자동 계측이 연결되도록 환경 변수를 다음과 같이 설정합니다:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
   DD_DOTNET_TRACER_HOME=/opt/datadog
   ```

2. 독립 실행형 애플리케이션의 경우, 평소와 같이 애플리케이션을 수동으로 다시 시작합니다.

{{% /tab %}}

{{% tab "NuGet" %}}

[`dd-trace-dotnet` 리포지토리][1]에서도 확인 가능한 패키지 readme의 지침을 따르세요.
Docker 예제도 해당 [리포지토리][2]에서 확인할 수 있습니다.

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### 실시간 데이터 보기

서비스에 .NET 트레이서를 활성화한 후:

1. 서비스를 다시 시작합니다.

2. 애플리케이션 로드를 생성합니다.

3. Datadog에서 [**APM**> **APM Traces**][3]로 이동합니다.

## 설정

필요한 경우 통합 서비스 태깅 설정을 포함하여 필요에 따라 애플리케이션 성능 원격 측정 데이터를 전송하도록 추적 라이브러리를 설정합니다. 자세한 내용은 [라이브러리 설정][4]을 참조하세요.

## 커스텀 계측

커스텀 계측 설정은 자동 계측에 따라 다르며 메서드에 따라 추가 단계가 포함됩니다:

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-warning">
  <strong>참고:</strong> 자동 계측과 커스텀 계측을 모두 사용하는 경우 패키지 버전(예: MSI 및 NuGet)을 동기화 상태로 유지해야 합니다.
</div>

.NET 애플리케이션에서 커스텀 계측을 사용하려면:

1. `Datadog.Trace` [NuGet 패키지][1]를 애플리케이션에 추가합니다.
2. 애플리케이션 코드에서 `Datadog.Trace.Tracer.Instance` 속성을 통해 글로벌 트레이서에 액세스하여 새로운 스팬을 생성합니다.


[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "Linux" %}}

<div class="alert alert-warning">
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

커스텀 계측을 위한 스팬 및 태그 추가에 대한 자세한 내용은 [.NET 커스텀 계측 설명서][5]를 참조하세요.

## 프로세스 환경 변수 설정

서비스에 자동 계측을 연결하려면 애플리케이션을 시작하기 전에 필수 환경 변수를 설정해야 합니다. .NET 트레이서 설치 방법에 따라 설정할 환경 변수를 식별하려면 [서비스에 대해 트레이서 활성화](#enable-the-tracer-for-your-service) 섹션을 참조하고 아래 예제에 따라 환경 변수를 올바르게 설정하세요. 계측된 서비스의 환경을 기반으로 합니다.

### Windows

#### Windows 서비스

<div class="alert alert-info">버전 2.14.0부터는 MSI를 사용하여 트레이서를 설치한 경우 <code>CORECLR_PROFILER</code>를 설정할 필요가 없습니다.</div>

{{< tabs >}}

{{% tab "Registry Editor" %}}

레지스트리 편집기에서 `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>`키에 `Environment`가 호출된 다중 문자열 값을 생성하고 값 데이터를 다음과 같이 설정합니다:

```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="레지스트리 편집기를 사용하여 Windows 서비스의 환경 변수 생성" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
[string[]] $v = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
```
{{% /tab %}}

{{< /tabs >}}

#### IIS

MSI를 설치한 후에는 IIS 사이트를 자동으로 계측하기 위한 추가 설정이 필요하지 않습니다. 모든 IIS 사이트에서 상속되는 추가 환경 변수를 설정하려면 다음 단계를 수행합니다:

1. 레지스트리 편집기를 열고 `HKLM\System\CurrentControlSet\Services\WAS` 키에서 `Environment`가 호출된 다중 문자열 값을 찾은 다음 환경 변수를 행당 하나씩 추가합니다. 예를 들어 로그 삽입 및 런타임 메트릭을 추가하려면 값 데이터에 다음 행을 추가합니다:
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

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="레지스트리 편집기를 사용하여 모든 IIS 사이트에 대한 환경 변수 만들기" >}}

#### 콘솔 애플리케이션

콘솔 애플리케이션을 자동으로 계측하려면 애플리케이션을 시작하기 전에 batch 파일에서 환경 변수를 설정합니다:

```bat
rem 환경 변수 설정
SET CORECLR_ENABLE_PROFILING=1

rem 버전 2.14.0 이상이고 MSI로 트레이서를 설치하지 않은 경우
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem 추가 Datadog 환경 변수 설정
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem 애플리케이션 시작
dotnet.exe example.dll
```

### Linux

#### Bash 스크립트

애플리케이션을 시작하기 전에 bash 파일에서 필요한 환경 변수를 설정하려면:

```bash
# 환경 변수 설정
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_DOTNET_TRACER_HOME=/opt/datadog

# 추가 Datadog 환경 변수 설정
export DD_LOGS_INJECTION=true
export DD_RUNTIME_METRICS_ENABLED=true

# 애플리케이션 시작
dotnet example.dll
```

#### Linux Docker 컨테이너

Linux Docker 컨테이너에서 필요한 환경 변수를 설정하려면:

  ```docker
  # 환경변수 설정
  ENV CORECLR_ENABLE_PROFILING=1
  ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
  ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
  ENV DD_DOTNET_TRACER_HOME=/opt/datadog

  # 추가 Datadog 환경 변수 설정
  ENV DD_LOGS_INJECTION=true
  ENV DD_RUNTIME_METRICS_ENABLED=true

  # 애플리케이션 시작
  CMD ["dotnet", "example.dll"]
  ```

#### `systemctl` (서비스별)

`systemctl`를 사용하여 .NET 애플리케이션을 서비스로 실행할 때 특정 서비스에 대해 로드할 필수 환경 변수를 추가할 수 있습니다.

1. 다음을 포함하는 `environment.env`이라는 파일을 만듭니다:

    ```ini
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    DD_DOTNET_TRACER_HOME=/opt/datadog

    # Set additional Datadog environment variables
    DD_LOGS_INJECTION=true
    DD_RUNTIME_METRICS_ENABLED=true
    ```
2. 서비스의 설정 파일에서 이를 서비스 블록의 [`EnvironmentFile`][1]로 참조합니다:

    ```ini
    [Service]
    EnvironmentFile=/path/to/environment.env
    ExecStart=<command used to start the application>
    ```
3. 환경 변수 설정을 적용하려면 .NET 서비스를 다시 시작하세요.

#### `systemctl` (모든 서비스)

<div class="alert alert-warning">
  <strong>참고:</strong> .NET 런타임은 환경 변수를 설정한 상태에서 시작되는 <em>모든</em> .NET 프로세스에 프로파일러를 로드하려고 합니다. 계측은 추적이 필요한 애플리케이션으로만 제한해야 합니다. 이러한 환경 변수를 전체적으로 설정하면<strong> 호스트의 <em>모든</em> .NET 프로세스가 프로파일러를 로드하므로 설정하지 마세요.</strong>
</div>

`systemctl`를 사용하여 .NET 애플리케이션을 서비스로 실행하는 경우 `systemctl`가 실행하는 모든 서비스에 대해 로드되도록 환경 변수를 설정할 수 있습니다.

1. [`systemctl set-environment`][6]을 실행하여 필요한 환경 변수를 설정합니다:

    ```bash
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog

    # Set additional Datadog environment variables
    systemctl set-environment DD_LOGS_INJECTION=true
    systemctl set-environment DD_RUNTIME_METRICS_ENABLED=true
    ```
2. `systemctl show-environment` 를 실행하여 환경 변수가 설정되었는지 확인합니다.

3. 환경 변수를 적용하려면 .NET 서비스를 다시 시작합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/tracing/trace_collection/compatibility/dotnet-core
[2]: /ko/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /ko/tracing/trace_collection/library_config/dotnet-core/
[5]: /ko/tracing/trace_collection/custom_instrumentation/dotnet/
[6]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
[11]: /ko/tracing/trace_collection/library_injection_local/
[12]: /ko/tracing/trace_collection#install-and-configure-the-agent