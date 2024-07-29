---
aliases:
- /ko/infrastructure/serverless/azure_app_services/
further_reading:
- link: /integrations/azure_app_services/
  tag: 설명서
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: 설명서
  text: Azure App Service 환경
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: 블로그
  text: Azure\u0008 App Service용 Datadog 확장을 이용해 .NET 웹 앱 모니터링
- link: https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler-what-is-considered-as-a-host-for-azure-app-services
  tag: 가격
  text: Azure App Service APM 가격
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: 블로그
  text: ASP.NET Core 애플리케이션을 Azure App Service에 배포
title: Azure App Service - Windows 코드
---

## 개요

Azure App Service용 Datadog 확장에는 추가 모니터링 기능이 있습니다.

- 자동 계측을 사용한 전체 분산 APM 추적
- 관련 Azure App Service 메트릭과 메타데이터를 보여주는 사용자 지정 APM 서비스 및 트레이스
- 스팬을 사용자 지정할 수 있는 수동 APM 계측 지원
- 애플리케이션 로그에 `Trace_ID` 삽입
- [DogStatsD][1]를 이용해 커스텀 메트릭 제출 지원

## 설정

{{< tabs >}}
{{% tab ".NET" %}}

### 요구 사항

1. 아직 설정하지 않은 경우, [Microsoft Azure 통합][1]을 먼저 설정하세요.

2. 이 확장은 다음 리소스 유형을 지원합니다.
    - Azure App Service Web Apps
    - 베이직, 스탠다드, 프리미엄 플랜에서 호스팅되는 Function 앱.

    <div class="alert alert-warning">소비 플랜의 Function 앱은 지원되지 않습니다. 다른 앱 서비스 리소스 유형 또는 런타임 지원에 관심이 있으신가요? 베타 버전이 제공될 때 알림을 받으려면 <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">등록</a>하세요.</div>

3. Datadog .NET APM 확장은 Windows OS에서 실행하는 경우 x64와 x86 아키텍처 모두에서 다음 .NET 런타임을 지원합니다 (AAS는 아직 Linux에서 확장을 지원하지 않음). 자동으로 계측된 라이브러리에 대한 자세한 내용을 보려면 [트레이서 설명서][2]를 참고하세요. 

    - .NET Framework 4.6.1 버전 이상
    - .NET Core 2.1
    - .NET Core 2.2 (2019년 12월 23일 Microsoft 지원 종료)
    - .NET Core 3.0 (2020년 3월 3일 Microsoft 지원 종료)
    - .NET Core 3.1
    - .NET 5
    - .NET 6

4. Datadog은 최적의 성능, 안정성 및 기능 가용성을 보장하기 위해 확장 프로그램의 최신 버전으로 정기적으로 업데이트할 것을 권장합니다. 최초 설치와 후속 업데이트 모두 성공적으로 설치/업데이트하려면 웹 앱을 완전히 중지해야 합니다.



**참고**: Datadog은 자동 계측을 할 때 .NET CLR Profiling API에 의존합니다. 이 API에는 구독자가 하나만 있어야 합니다 (예: 프로파일러가 활성화된 Datadog의 .NET Tracer). 가시성을 극대화하려면 애플리케이션 환경 내에서 하나의 APM 솔루션만 실행하세요.

v2.3.0부터 .NET 확장은 더 이상 시맨틱 버전 관리에 의존하지 않습니다. `x.y.z`이 .Net Tracer 버전일 경우 `x.y.zAA`이며, `AA`는 확장에만 사용됩니다. `zAA`에서 앞에 있는 0은 NuGet 패키징에서 잘라내기 때문에 버전은 `x.y.A`가 됩니다.

예를 들면 다음과 같습니다.

- 확장 `2.3.0`은 Tracer v`2.3.0`를 사용함
- 확장 `2.3.1`은 Tracer v`2.3.0`을 사용함
- 확장 `2.3.2`는 Tracer v`2.3.0`을 사용함
- 확장 `2.3.100`은 Tracer v`2.3.1`을 사용함
- 확장 `2.3.101`은 Tracer v`2.3.1`을 사용함
- 확장 `2.3.200`은 Tracer v`2.3.2`를 사용함

### 설치

1. [Azure 통합][1]을 구성해 웹 앱이나 기능을 모니터링합니다. Datadog에서 `azure.app_service.count`이나 `azure.functions.count`에 해당하는 메트릭이 보이는지 확인하여 올바르게 설정되었는지 점검합니다. **참고**: 이 단계는 메트릭/트레이스 상관 관계, 트레이스 패널 보기 기능에 중요하며, Azure App Services로 Datadog을 사용할 때의 경험을 개선합니다. 

2. [Azure Portal][3]을 열고 대시보드에서 Datadog를 이용해 계측하고자 하는 Azure 앱을 탐색합니다.

**참고**: Azure Native 통합을 사용하는 고객은 Azure에서 Datadog 리소스를 사용해 .NET 앱에 확장을 추가할 수 있습니다. 이와 관련된 지침은 Datadog [Azure Portal 가이드][13]의 [App Service 확장 섹션][12]을 참고하세요.

3. 설정 페이지의 애플리케이션 설정 탭으로 이동합니다.
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="설정 페이지" >}}
4. `DD_API_KEY` 애플리케이션 설정을 위해 Datadog API 키를 입력하고, [Datadog API 키][4] 값을 추가합니다.
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="api 키 페이지" >}}
5. (선택 사항) 필요 시 애플리케이션을 다음과 같이 설정합니다:
    - `DD_SITE`를 {{< region-param key="dd_site" code="true" >}}로 설정합니다 (기본값 `datadoghq.com`).
    - `DD_ENV`를 설정해 트레이스와 커스텀 통계를 그룹화합니다.
    - `DD_SERVICE`를 설정해 서비스 이름을 지정합니다 (기본값은 앱 이름).
    - `DD_LOGS_INJECTION:true`을 설정해 앱에서 애플리케이션 로그와 상관 관계를 만듭니다.
    - `DD_PROFILING_ENABLED:true`를 설정해 .NET [Continuous Profiler][5] (공용 베타)를 활성화합니다.
    - [부수적인 설정 변수][6] 전체 목록을 확인해 보세요.
6. **저장**을 클릭합니다 (애플리케이션 재시작).
7. <div class="alert alert-warning">[필수] <u>중지</u>를 클릭해 애플리케이션을 중지하세요.</div>
8. Azure 확장 페이지에서 Datadog APM 확장을 선택합니다.
    {{< img src="infrastructure/serverless/azure_app_services/choose_extension.png" alt="Datadog 확장" >}}
9. 약관을 수락하고 **확인**을 클릭한 후 설치가 완료될 때까지 기다립니다. **참고**: 이 단계를 완료하려면 앱이 중지 상태여야 합니다.
10. 메인 애플리케이션을 시작하고 **시작**을 클릭합니다:
    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="시작" >}}

### 애플리케이션 로깅

다음 방법 중 하나를 사용해 Azure App Services 애플리케이션에서 Datadog으로 로그를 전송할 수 있습니다:
1. [자동 계측으로 에이전트리스 로깅][7]
2. [Serilog 싱크로 에이전트리스 로깅][8]

이 두 방식에서는 트레이스 ID 삽입이 가능하기 때문에 Datadog로 로그와 트레이스를 연결할 수 있습니다. 확장으로 트레이스 ID 삽입을 활성화하려면 애플리케이션 설정 `DD_LOGS_INJECTION:true`를 추가하세요.

**참고**: 이는 애플리케이션 내에서 실행되기 때문에 진단 설정으로 제출하는 Azure Platform 로그에는 트레이스 ID가 포함되어 있지 않습니다.

### DogStatsD로 커스텀 메트릭 사용

Azure App Service 확장에는  [DogStatsD][9](Datadog의 메트릭 집계 서비스) 인스턴스가 포함되어 있습니다. 이에 따라 확장을 이용해 커스텀 메트릭, 서비스 검사, 이벤트를 Azure Web Apps 및  Functions에서 Datadog으로 바로 전송할 수 있습니다.

Azure App Service에서 커스텀 메트릭과 검사를 작성하는 것은 Datadog 에이전트를 실행하는 호스트의 애플리케이션에서 하는 것과 비슷합니다. 확장을 사용해 Azure App Service에서 커스텀 메트릭을 Datadog으로 보내려면 다음을 실행하세요:

1. [DogStatsD NuGet 패키지][10]를 Visual Studio 프로젝트에 추가합니다.
2. DogStatsD를 초기화하고 애플리케이션에 커스텀 메트릭을 작성합니다.
3. 코드를 Azure App Service에 배포합니다.
4. Datadog App Service 확장을 설치합니다.

**참고**: [표준 DogStatsD 설정 프로세스][11]와 달리 DagStatsD 설정을 초기화할 때 포트나 서버 이름을 설정할 필요가 없습니다. Azure App Service에는 메트릭을 어떻게 전송할지 결정하는 앰비언트 환경 변수가 있습니다(DogStatsD 클라이언트 v6.0.0+ 필요).

메트릭을 전송하려면 다음 코드를 사용하세요:

```csharp
// Configure your DogStatsd client and configure any tags
if (!DogStatsd.Configure(new StatsdConfig() { ConstantTags = new[] { "app:sample.mvc.aspnetcore" } }))
{
    // `Configure` returns false if the necessary environment variables are not present.
    // These environment variables are present in Azure App Service, but
    // need to be set in order to test your custom metrics: DD_API_KEY:{api_key}, DD_AGENT_HOST:localhost
    // Ignore or log the error as it suits you
    Console.WriteLine("Cannot initialize DogstatsD.");
}

// Send a metric
DogStatsd.Increment("sample.startup");
```

**참고**: 추적을 비활성화한 상태에서 커스텀 메트릭만 전송하려면 애플리케이션 설정에 다음 변수를 설정하세요:
  - `DD_TRACE_ENABLED`를 `false`로 설정합니다.
  - `DD_AAS_ENABLE_CUSTOM_METRICS`를 `true`로 설정합니다.
[커스텀 메트릭][12]에 대해 자세히 알아보세요.


[1]: /ko/integrations/azure
[2]: /ko/tracing/setup/dotnet/
[3]: https://portal.azure.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /ko/profiler/
[6]: /ko/tracing/trace_collection/library_config/dotnet-framework/#additional-optional-configuration
[7]: /ko/logs/log_collection/csharp/#agentless-logging-with-apm
[8]: /ko/logs/log_collection/csharp/#agentless-logging-with-serilog-sink
[9]: /ko/developers/dogstatsd
[10]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
[11]: /ko/developers/dogstatsd/?tab=net#code
[12]: /ko/metrics/
[13]: /ko/integrations/guide/azure-portal/#app-service-extension
[14]: /ko/integrations/guide/azure-portal/
{{% /tab %}}
{{% tab "Java" %}}
### 요구 사항

1. 아직 설정하지 않은 경우, [Microsoft Azure 통합][1]을 설정하세요.

2. 확장은 Azure App Service Web Apps를 지원하나  Function 앱은 지원하지 않습니다.
    <div class="alert alert-warning">Support for Java Web Apps is in beta for extension v2.4+. There are no billing implications for tracing Java Web Apps during this period.<br/><br/>
    Interested in support for other App Service resource types or runtimes? <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Sign up</a> to be notified when a beta becomes available.</div>

3. Datadog Java APM 확장은 Windows OS에서 모든 Java 런타임을 지원합니다. Azure App Service는 Linux에서 확장을 지원하지 않습니다. 자동으로 계측된 라이브러리에 대한 자세한 내용을 보려면 [트레이서 설명서][2]를 참고하세요.

4. Datadog은 최적의 성능, 안정성 및 기능 가용성을 보장하기 위해 확장 프로그램의 최신 버전으로 정기적으로 업데이트할 것을 권장합니다. 최초 설치와 후속 업데이트 모두 성공적으로 설치/업데이트하려면 웹 앱을 완전히 중지해야 합니다.



### 설치

1. [Azure 통합][1]을 설정해 웹 앱이나 기능을 모니터링하세요. Datadog에서 `azure.app_service.count`이나 `azure.functions.count`에 해당하는 메트릭이 보이는지 확인하여 올바르게 설정되었는지 점검합니다. **참고**: 이 단계는 메트릭/트레이스 상관 관계, 트레이스 패널 보기 기능에는 물론 Datadog 사이트의 다양한 사용자 경험 장애를 방지하는 데도 매우 중요합니다.

2. [Azure Portal][3]을 열고 Datadog으로 계측하려는 Azure Web App의 대시보드로 이동합니다.

3. 설정 페이지에서 애플리케이션 설정 탭으로 이동합니다.
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="설정 페이지" >}}
4. `DD_API_KEY` 애플리케이션 설정을 위해 Datadog API 키를 입력하고, [Datadog API 키][4] 값을 추가합니다.
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="api 키 페이지" >}}
5. (선택 사항) 필요 시 애플리케이션을 다음과 같이 설정합니다:
    - `DD_SITE`를 {{< region-param key="dd_site" code="true" >}}로 설정합니다 (기본값 `datadoghq.com`).
    - `DD_ENV`를 설정해 트레이스와 커스텀 통계를 그룹화합니다.
    - `DD_SERVICE`를 설정해 서비스 이름을 지정합니다 (기본값은 앱 이름).
    - [부수적인 설정 변수][5] 전체 목록을 확인해 보세요.
6. **저장**을 클릭합니다 (애플리케이션 재시작).
7. <div class="alert alert-warning">[필수] <u>중지</u>를 클릭해 애플리케이션을 중지하세요.</div>
8. Azure 확장 페이지에서 Datadog APM 확장을 선택합니다.
9. 약관을 수락하고 **확인**을 클릭한 후 설치가 완료될 때까지 기다립니다. **참고**: 이 단계를 완료하려면 웹 앱이 중지 상태여야 합니다.
10. 메인 애플리케이션을 시작하고 **시작**을 클릭합니다:
    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="시작" >}}

### Azure Web Apps에서 애플리케이션 로깅

Azure App Service 애플리케이션에서 Datadog으로 로그를 전송하려면 앱에서 직접 로그를 Datadog으로 스트리밍해야 합니다. 이 방법으로 로그를 전송하면 트레이스 ID를 삽입할 수 있어 Datadog에서 로그와 트레이스를 연결할 수 있습니다.

**참고**: 트레이스 ID 삽입은 애플리케이션 내부에서 발생합니다. Azure 리소스 로그는 관리 영역에서 Azure에 의해 생성되므로 트레이스 ID가 포함되지 않습니다.

Azure App Service에서 Java용 애플리케이션 로깅을 설정하려면 [Java로 에이전트리스 로깅][6] 지침을 확인하세요.

### DogStatsD로 커스텀 메트릭 사용

Azure App Service 확장에는 [DogStatsD][7](Datadog의 메트릭 애그리게이션 서비스) 인스턴스가 포함되어 있습니다. 이에 따라 확장을 이용해 커스텀 메트릭, 서비스 검사, 이벤트를 Azure Web Apps에서 Datadog으로 바로 제출할 수 있습니다.

이 환경에서 커스텀 메트릭과 검사를 작성하는 것은 Datadog 에이전트를 실행하는 표준 호스트의 애플리케이션에서 하는 것과 비슷합니다. 확장을 사용해 Azure App Service에서 커스텀 메트릭을 Datadog으로 보내려면 다음을 실행하세요:

1. [DogStatsD 클라이언트][8]를 프로젝트에 추가합니다.
2. DogStatsD를 초기화하고 애플리케이션에 커스텀 메트릭을 씁니다.
3. 지원되는 Azure 웹 앱에 코드를 배포합니다.
4. Datadog App Service 확장을 설치합니다.

**참고**: [표준 DogStatsD 설정 프로세스][9]와 달리 DagStatsD 설정을 초기화할 때 포트나 서버 이름을 설정할 필요가 없습니다. Azure App Service에는 메트릭을 어떻게 전송할지 결정하는 앰비언트 환경 변수가 있습니다(DogStatsD 클라이언트 v6.0.0+ 필요).

메트릭을 전송하려면 다음 코드를 사용하세요:

```java
// Configure your DogStatsd client and configure any tags
StatsDClient client = new NonBlockingStatsDClientBuilder()
                            .constantTags("app:sample.service")
                            .build();
// Send a metric
client.Increment("sample.startup");
```

[커스텀 메트릭][10]에 대해 자세히 알아보세요.

[1]: /ko/integrations/azure
[2]: /ko/tracing/setup/java/
[3]: https://portal.azure.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /ko/tracing/trace_collection/library_config/dotnet-framework/#additional-optional-configuration
[6]: /ko/logs/log_collection/csharp/?tab=serilog#agentless-logging
[7]: /ko/developers/dogstatsd
[8]: https://search.maven.org/artifact/com.datadoghq/java-dogstatsd-client
[9]: /ko/developers/dogstatsd/?tab=java#code
[10]: /ko/metrics/
{{% /tab %}}
{{< /tabs >}}

## 프로그래밍 방식 관리

{{< tabs >}}
{{% tab ".NET" %}}

Datadog은 Powershell을 이용해 Azure App Service 확장을 업데이트하거나 설치하는 스크립트를 제공합니다. 스크립화된 확장을 관리하면 [리소스 그룹별로 확장을 일괄 업데이트](#powershell-resource-group)할 수 있고 [사이트 확장의 특정 버전을 설치하도록 지정](#powershell-specific-version)할 수 있습니다. 또 스크립트를 사용하여 CI/CD 파이프라인에 프로그래밍 방식으로 확장을 추가하고, 이미 설치된 확장을 검색하거나 업데이트할 수 있습니다.

### 전제 조건

- [Azure CLI][1] 또는 [Azure Cloud Shell][2].
- Azure App Service [user-scope 크리덴셜][3]. 크리덴셜이 없다면 [Azure 포털][4]에서 Web App이나 Function App으로 이동한 후 **디플로이먼트** > **디플로이먼트 센터**에서 user-scope 크리덴셜을 생성하거나 검색할 수 있습니다.

### 처음으로 확장 설치 {#powershell-first-time}



설치 스크립트가 Azure Web App이나 Azure Function App에 확장 최신 버전을 추가합니다. 이는 리소스 그룹 레벨이 아닌 앱 단위로 발생합니다.

1. Azure CLI이나 Azure Cloud Shell을 엽니다.
2. 다음 명령을 실행해 설치 스크립트를 다운로드합니다:

    ```
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. 다음 명령을 실행하여 필요에 따라 필수 및 선택 인수를 전달합니다.

    ```
    .\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -DDSite <DATADOG_SITE> -DDEnv <DATADOG_ENV> -DDService <DATADOG_SERVICE> -DDVersion <DATADOG_VERSION>
    ```

**참고**: 위 명령을 실행할 때 다음 인수가 필요합니다:

- `<USERNAME>`: Azure 사용자 범위 사용자 이름입니다.
- `<PASSWORD>`: Azure 사용자 범위 암호입니다.
- `<SUBSCRIPTION_ID>`: Azure [구독 ID][5]입니다.
- `<RESOURCE_GROUP_NAME>`: Azure 리소스 그룹 이름입니다.
- `<SITE_NAME>`: 앱 이름입니다.
- `<DATADOG_API_KEY>`: [Datadog API 키][6]입니다.

또 `DATADOG_SITE`를 [Datadog 사이트][7]로 설정합니다. `DATADOG_SITE`의 기본값은 `datadoghq.com`입니다. 내 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.




### 리소스 그룹 확장 업데이트하기 {#powershell-resource-group}


업데이트 스크립트는 전체 리소스 그룹에 적용됩니다. 이 스크립트는 확장 프로그램이 설치된 모든 Web App 또는  Function App을 업데이트합니다. Datadog 확장 프로그램이 설치되어 있지 않은 App Service 앱은 영향을 받지 않습니다.

1. Azure CLI이나 Azure Cloud Shell을 엽니다.
2. 다음 명령을 실행해 업데이트 스크립트를 다운로드합니다:

    ```
    $baseUri="https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension"; Invoke-WebRequest -Uri "$baseUri/update-all-site-extensions.ps1" -OutFile "update-all-site-extensions.ps1"; Invoke-WebRequest -Uri "$baseUri/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. 다음 명령을 실행합니다. 모든 인수가 필수입니다.

    ```
    .\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD>
    ```



### 확장 특정 버전 설치하기 {#powershell-specific-version}

Azure App Service UI에는 확장 특정 버전을 설치할 수 있는 기능이 없습니다. 이는 설치 스크립트나 업데이트 스크립트를 통해 가능합니다.


#### 단일 리소스에 특정 버전 설치

단일 인스턴스에 특정 버전을 설치하려면 [처음으로 확장 설치 시의 지침](#powershell-first-time)을 따르고 `-ExtensionVersion` 파라미터를 설치 명령에 추가합니다.

```
.\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -ExtensionVersion <EXTENSION_VERSION>
```

`<EXTENSION_VERSION>`을 설치하고자 하는 확장 버전으로 대체하세요 (예: `1.4.0`).

#### 전체 리소스 그룹에 특정 버전 설치

리소스 그룹에 특정 버전을 설치하려면 [리소스 그룹 확장 업데이트 시의 지침](#powershell-resource-group)을 따르고 설치 명령에 `-ExtensionVersion` 파라미터를 추가하세요.

```
.\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD> -ExtensionVersion <EXTENSION_VERSION>
```

`<EXTENSION_VERSION>`을 설치하고자 하는 확장 버전으로 대체하세요 (예: `1.4.0`).

### ARM 템플릿

많은 조직이 [Azure Resource Management (ARM) 템플릿][8]을 사용해 코드형 인프라스트럭처를 구축합니다. 이 같은 템플릿에 App Service 확장을 구축하려면 [Datadog의 App Service 확장 ARM 템플릿][9]을 배포에 포함해 확장을 추가하고 App Service 리소스와 함께 설정하세요.

[1]: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
[2]: https://docs.microsoft.com/en-us/azure/cloud-shell/overview
[3]: https://docs.microsoft.com/en-us/azure/app-service/deploy-configure-credentials
[4]: https://portal.azure.com/
[5]: https://docs.microsoft.com/en-us/azure/media-services/latest/setup-azure-subscription-how-to
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /ko/getting_started/site/
[8]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview
[9]: https://github.com/DataDog/datadog-aas-extension/tree/master/ARM
[10]: https://learn.microsoft.com/en-us/azure/templates/microsoft.datadog/monitors?pivots=deployment-language-arm-template
{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-warning"> Java Web Apps에 대한 지원은 확장 v2.4 이상에서 베타 버전으로 제공됩니다. Java Web Apps에는 프로그래밍 방식의 관리를 사용할 수 없습니다.<br/><br/>
  다른 App Service 리소스 유형이나 런타임 지원에 관심이 있으신가요? 베타 버전이 제공될 때 알림을 받으려면<a href="https://forms.gle/n4nQcxEyLqDBMCDA7">등록</a>하세요.</div>

{{% /tab %}}
{{< /tabs >}}

## 문제 해결

### 서버리스 보기에서 앱이 잘못 설정된 것으로 식별되거나 트레이스에 대한 해당 메트릭이 누락된 경우

애플리케이션을 모니터링하도록 Azure 통합을 설정하지 않은 것입니다. 적절한 설정은 Datadog 플랫폼에서 메트릭, 트레이스, 로그를 상호 연관 시키는 능력을 향상시킵니다. Azure 통합을 설정하지 않으면 트레이스에 대한 매우 중요한 컨텍스트를 놓치게 됩니다. 이 문제를 해결하려면 다음을 실행하세요:

1. Azure 통합 타일로 이동합니다.

2. 애플리케이션이 실행 중인 Azure 구독에 대한 [Azure 통합][2]을 설치했는지 확인합니다.

3. 적용한 App Service 플랜 필터링 규칙에 앱이 실행 중인 App Service 플랜이 포함되어 있는지 확인합니다. App Service 플랜이 포함되지 않으면 해당 플랜에서 호스팅되는 모든 앱과 기능이 포함되지 않습니다. 앱 자체의 태그는 Datadog 필터링에 사용되지 않습니다.



### APM 트레이스가 Datadog에 나타나지 않을 경우

1.  `DD_SITE`와 `DD_API_KEY`를 올바르게 설정했는지 확인합니다.

2. 애플리케이션을 종료하고 다시 시작합니다.

3. 문제가 지속되면 확장을 제거하고 다시 설치하세요 (이를 통해 최신 버전이 설치되었는지도 확인할 수 있음).

**참고**: 애플리케이션 오류에 대한 신속한 지원을 위해 `DD_TRACE_DEBUG:true`를 설정하고 Datadog 로그 디렉토리 (`%AzureAppServiceHomeDirectory%\LogFiles\datadog`)의 내용을 이메일에 추가하세요.

도움이 더 필요하신가요? [Datadog 고객 지원팀][3]에 문의하세요.

### 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/developers/dogstatsd
[2]: /ko/integrations/azure
[3]: /ko/help