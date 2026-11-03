---
aliases:
- /ko/serverless/guide/azure_app_service_linux_sidecar
- /ko/serverless/azure_app_services/azure_app_services_container
further_reading:
- link: /integrations/azure_app_services/
  tag: 문서
  text: Azure 앱 서비스
- link: /integrations/azure_app_service_environment/
  tag: 문서
  text: Azure App Service 환경
title: Azure App Service - Linux 컨테이너 계측하기
---
## 개요 {#overview}

이 페이지에서는 Datadog Agent를 사용해 컨테이너화된 Linux Azure App Service 애플리케이션을 계측하는 방법을 설명합니다.

이 문서에서는 Azure의 [Azure App Service에서 커스텀 컨테이너에 대한 사이드카 컨테이너 구성][1] 튜토리얼에 따라 애플리케이션이 사이드카에 대해 설정되었다고 가정합니다.

사이드카 접근 방법을 사용하지 않으려는 경우(권장하지 않음), 대신 [`serverless-init`를 사용한 Azure App Service - Linux 컨테이너 계측][2] 안내를 따르세요.

## 설정 {#setup}

### Azure 통합 {#azure-integration}

아직 설치하지 않았다면 [Datadog-Azure 통합][3]을 설치하여 메트릭과 로그를 수집하세요.

### 애플리케이션 {#application}

{{< tabs >}}
{{% tab "Node.js" %}}
#### 트레이싱 {#tracing}
`dd-trace-js` 라이브러리를 사용하여 메인 애플리케이션을 계측하세요. 지침은 [Node.js 애플리케이션 트레이싱][101]을 참고하세요.

#### 메트릭 {#metrics}
사용자 지정 메트릭도 SDK를 통해 수집됩니다. [코드 예시][102]를 참조하세요.

#### 로그 {#logs}
Datadog 사이드카는 파일 테일링을 사용하여 로그를 수집합니다. Datadog에서는 이 디렉터리가 다시 시작해도 유지되므로 애플리케이션 로그를 `/home/LogFiles/`에 작성할 것을 권장합니다.

Datadog으로 전송되는 내용을 더 효과적으로 제어하려면 `/home/LogFiles/myapp`와 같은 하위 디렉터리를 생성하세요. 그러나 모든 로그 파일을 `/home/LogFiles`에서 테일링하지 않으면 시작 및 오류와 관련된 Azure App Service 애플리케이션 로그가 수집되지 않습니다.

애플리케이션에서 로깅을 설정하려면 [Node.js 로그 수집][103]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [Node.js 로그와 트레이스 상관관계][104]를 참조하세요.

[101]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[102]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs#code-examples
[103]: /ko/logs/log_collection/nodejs/?tab=winston30
[104]: /ko/tracing/other_telemetry/connect_logs_and_traces/nodejs
{{% /tab %}}
{{% tab "Python" %}}
#### 트레이싱 {#tracing-1}
`dd-trace-py` 라이브러리를 사용하여 메인 애플리케이션을 계측하세요. [Python 애플리케이션 추적][201]을 참고하여 지침을 확인하세요.

#### 메트릭 {#metrics-1}
사용자 지정 메트릭도 SDK를 통해 수집됩니다. [코드 예시][202]를 참조하세요.

#### 로그 {#logs-1}
Datadog 사이드카는 파일 테일링을 사용하여 로그를 수집합니다. Datadog에서는 이 디렉터리가 다시 시작해도 유지되므로 애플리케이션 로그를 `/home/LogFiles/`에 작성할 것을 권장합니다.

Datadog으로 전송되는 내용을 더 효과적으로 제어하려면 `/home/LogFiles/myapp`와 같은 하위 디렉터리를 생성하세요. 그러나 모든 로그 파일을 `/home/LogFiles`에서 테일링하지 않으면 시작 및 오류와 관련된 Azure App Service 애플리케이션 로그가 수집되지 않습니다.

애플리케이션에서 로깅을 설정하려면 [Node.js 로그 수집][203]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [Node.js 로그와 트레이스 상관관계][204]를 참조하세요.

[201]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[202]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=python#code-examples
[203]: /ko/logs/log_collection/python/
[204]: /ko/tracing/other_telemetry/connect_logs_and_traces/python
{{% /tab %}}
{{% tab "Java" %}}
#### 트레이싱 {#tracing-2}
`dd-trace-java` 라이브러리를 사용하여 메인 애플리케이션을 계측하세요. [Java 애플리케이션 추적][301]을 참고하여 지침을 확인하세요.

#### 메트릭 {#metrics-2}
사용자 지정 메트릭도 SDK를 통해 수집됩니다. [코드 예시][302]를 참조하세요.

#### 로그 {#logs-2}
Datadog 사이드카는 파일 테일링을 사용하여 로그를 수집합니다. Datadog에서는 이 디렉터리가 다시 시작해도 유지되므로 애플리케이션 로그를 `/home/LogFiles/`에 작성할 것을 권장합니다.

Datadog으로 전송되는 내용을 더 효과적으로 제어하려면 `/home/LogFiles/myapp`와 같은 하위 디렉터리를 생성하세요. 그러나 모든 로그 파일을 `/home/LogFiles`에서 테일링하지 않으면 시작 및 오류와 관련된 Azure App Service 애플리케이션 로그가 수집되지 않습니다.

애플리케이션에서 로깅을 설정하려면 [Node.js 로그 수집][303]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [Node.js 로그와 트레이스 상관관계][304]를 참조하세요.

[301]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[302]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=java#code-examples
[303]: /ko/logs/log_collection/java/?tab=winston30
[304]: /ko/tracing/other_telemetry/connect_logs_and_traces/java
{{% /tab %}}
{{% tab ".NET" %}}
#### 트레이싱 {#tracing-3}
`dd-trace-dotnet` 라이브러리를 사용하여 메인 애플리케이션을 계측하세요.

1. 메인 애플리케이션의 Dockerfile에 다음 라인을 추가하세요. 이렇게 하면 애플리케이션 컨테이너 내에서 Datadog SDK가 설치 및 구성됩니다.
   {{< code-block lang="dockerfile" >}}
   RUN mkdir -p /datadog/tracer
   RUN mkdir -p /home/LogFiles/dotnet

   ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v3.30.0/datadog-dotnet-apm-3.30.0.tar.gz /datadog/tracer
   RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-3.30.0.tar.gz
   {{< /code-block >}}

2. 이미지를 빌드하여 선호하는 컨테이너 레지스트리에 푸시하세요.

**전체 Dockerfile 예시**

{{< highlight dockerfile "hl_lines=22-27" >}}
# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the remaining source code
COPY . .

# Build the application
RUN dotnet publish -c Release -o out

# Stage 2: Create a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the build output from stage 1
COPY --from=build /app/out ./

# Datadog specific
RUN mkdir -p /datadog/tracer
RUN mkdir -p /home/LogFiles/dotnet

ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v3.30.0/datadog-dotnet-apm-3.30.0.tar.gz /datadog/tracer
RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-3.30.0.tar.gz

# Set the entry point for the application
ENTRYPOINT ["dotnet", "<your dotnet app>.dll"]
{{< /highlight >}}

자세한 정보는 [.NET 애플리케이션 추적][401]을 참조하세요.

#### 메트릭 {#metrics-3}
사용자 지정 메트릭도 SDK를 통해 수집됩니다. [코드 예시][402]를 참조하세요.

#### 로그 {#logs-3}
Datadog 사이드카는 파일 테일링을 사용하여 로그를 수집합니다. Datadog에서는 이 디렉터리가 다시 시작해도 유지되므로 애플리케이션 로그를 `/home/LogFiles/`에 작성할 것을 권장합니다.

Datadog으로 전송되는 내용을 더 효과적으로 제어하려면 `/home/LogFiles/myapp`와 같은 하위 디렉터리를 생성하세요. 그러나 모든 로그 파일을 `/home/LogFiles`에서 테일링하지 않으면 시작 및 오류와 관련된 Azure App Service 애플리케이션 로그가 수집되지 않습니다.

애플리케이션에서 로깅을 설정하려면 [C# 로그 수집][403]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [.NET 로그와 트레이스 상관관계][404]를 참조하세요.

[401]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[402]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=dotnet#code-examples
[403]: /ko/logs/log_collection/csharp
[404]: /ko/tracing/other_telemetry/connect_logs_and_traces/dotnet

{{% /tab %}}
{{% tab "Go" %}}
#### 트레이싱 {#tracing-4}
`dd-trace-go` 라이브러리를 사용하여 메인 애플리케이션을 계측하세요. [Go 애플리케이션 추적][501]을 참고하여 지침을 확인하세요.

#### 메트릭 {#metrics-4}
사용자 지정 메트릭도 SDK를 통해 수집됩니다. [코드 예시][502]를 참조하세요.

#### 로그 {#logs-4}
Datadog 사이드카는 파일 테일링을 사용하여 로그를 수집합니다. Datadog에서는 이 디렉터리가 다시 시작해도 유지되므로 애플리케이션 로그를 `/home/LogFiles/`에 작성할 것을 권장합니다.

Datadog으로 전송되는 내용을 더 효과적으로 제어하려면 `/home/LogFiles/myapp`와 같은 하위 디렉터리를 생성하세요. 그러나 모든 로그 파일을 `/home/LogFiles`에서 테일링하지 않으면 시작 및 오류와 관련된 Azure App Service 애플리케이션 로그가 수집되지 않습니다.

애플리케이션에서 로깅을 설정하려면 [Node.js 로그 수집][503]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [Node.js 로그와 트레이스 상관관계][504]를 참조하세요.

[501]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[502]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=go#code-examples
[503]: /ko/logs/log_collection/go/
[504]: /ko/tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab "PHP" %}}
#### 트레이싱 {#tracing-5}
`dd-trace-php` 라이브러리를 사용하여 메인 애플리케이션을 계측하세요. 지침은 [PHP 애플리케이션 추적][601]을 참조하세요.

#### 메트릭 {#metrics-5}
사용자 지정 메트릭도 SDK를 통해 수집됩니다. [코드 예시][602]를 참조하세요.

#### 로그 {#logs-5}
Datadog 사이드카는 파일 테일링을 사용하여 로그를 수집합니다. Datadog에서는 이 디렉터리가 다시 시작해도 유지되므로 애플리케이션 로그를 `/home/LogFiles/`에 작성할 것을 권장합니다.

Datadog으로 전송되는 내용을 더 효과적으로 제어하려면 `/home/LogFiles/myapp`와 같은 하위 디렉터리를 생성하세요. 그러나 모든 로그 파일을 `/home/LogFiles`에서 테일링하지 않으면 시작 및 오류와 관련된 Azure App Service 애플리케이션 로그가 수집되지 않습니다.

애플리케이션에서 로깅을 설정하려면 [Node.js 로그 수집][603]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [Node.js 로그와 트레이스 상관관계][604]를 참조하세요.

[601]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/#getting-started
[602]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=php#code-examples
[603]: /ko/logs/log_collection/php/
[604]: /ko/tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### 계측 {#instrumentation}

계측은 사이드카 컨테이너를 사용하여 수행됩니다. 이 사이드카 컨테이너는 메인 애플리케이션 컨테이너에서 트레이스, 향상된 메트릭, 사용자 지정 메트릭 및 로그를 수집하여 Datadog에 전송합니다. [향상된 메트릭][5]은 `azure.app_services.enhanced.*` 네임스페이스로 구분됩니다.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

#### 로컬 {#locally}

[Datadog CLI][601] 설치

```shell
npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-aas
```

[Azure CLI][602]를 설치하고 `az login`으로 인증하세요.

그런 다음, 아래의 명령어를 실행하여 사이드카 컨테이너를 설정합니다.

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

Datadog 사이트를 다음과 같이 설정합니다. {{< region-param key="dd_site" code="true" >}}기본값은 `datadoghq.com`입니다.

**참고:** .NET 애플리케이션의 경우, .NET 트레이서에 필요한 추가 환경 변수를 포함하도록 `--dotnet` 플래그를 추가하고, 컨테이너가 musl libc 이미지(예: Alpine Linux)에서 dotnet을 사용하는 경우 `--musl` 플래그도 추가하세요.

`--service` 및 `--env`와 같은 추가 플래그를 사용하여 서비스 및 환경 태그를 설정할 수 있습니다. 전체 옵션 목록을 보려면 `datadog-ci aas instrument --help`를 실행합니다.

`datadog-ci aas instrument` 계측 설정 시 한 번만 실행하면 됩니다. 코드를 배포할 때마다 다시 실행할 필요는 없으며, Datadog 구성 변경 시에만 다시 실행합니다.

#### Azure Cloud Shell {#azure-cloud-shell}

[Azure Cloud Shell][603]에서 Datadog CLI를 사용하려면 Cloud Shell을 열고 `npx`를 사용하여 CLI를 직접 실행하세요. `DD_API_KEY` 및 `DD_SITE` 환경 변수에 API 키와 사이트를 설정한 후 CLI를 실행하세요.

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
npx @datadog/datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

[601]: https://github.com/DataDog/datadog-ci#how-to-install-the-cli
[602]: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli
[603]: https://portal.azure.com/#cloudshell/
{{% /tab %}}
{{% tab "Terraform" %}}

<div class="alert alert-danger">Azure Web App for Containers 리소스는 사이트 컨테이너를 직접 지원하지 않으므로 구성에 변동이 있을 수 있습니다.</div>

[Linux Web Apps용 Datadog Terraform 모듈][1]은 [azurerm_linux_web_app][2] 리소스를 래핑하고 필수 환경 변수 및 serverless-init 사이드카를 추가하여 Datadog Serverless Monitoring을 위해 웹 앱을 자동으로 구성합니다.

Terraform을 아직 설정하지 않은 경우, [Terraform을 설치][3]하고 새 디렉터리를 만들고 `main.tf`라는 파일을 생성합니다.

그런 다음, 필요에 따라 업데이트하여 Terraform 구성에 다음을 추가합니다.

```tf
variable "datadog_api_key" {
  description = "Your Datadog API key"
  type        = string
  sensitive   = true
}

provider "azurerm" {
  features {}
  subscription_id = "00000000-0000-0000-0000-000000000000" // Replace with your subscription ID
}

resource "azurerm_service_plan" "my_asp" {
  name                = "my-app-service-plan" // Replace with your app service plan name
  resource_group_name = "my-resource-group"   // Replace with your resource group name
  os_type             = "Linux"
  location            = "eastus"
  sku_name            = "P1v2"
}

module "my_web_app" {
  source  = "DataDog/web-app-datadog/azurerm//modules/linux"
  version = "~> 1.0"

  name                = "my-web-app"        // Replace with your web app name
  resource_group_name = "my-resource-group" // Replace with your resource group name
  service_plan_id     = azurerm_service_plan.my_asp.id
  location            = "eastus"

  datadog_api_key = var.datadog_api_key
  datadog_service = "my-service" // Replace with your service name
  datadog_env     = "prod"       // Replace with your environment (e.g. prod, staging)
  datadog_version = "0.0.0"      // Replace with your application version

  site_config = {
    application_stack = {
      docker_registry_url = "https://index.docker.io" // Replace with your registry URL
      docker_image_name   = "my-app:latest"           // Replace with your image name
    }
  }
  app_settings = {
    DD_TRACE_ENABLED = "true" // Example setting
  }
}
```

마지막으로 `terraform apply`를 실행하고 프롬프트를 따릅니다.

[Datadog Linux Web App 모듈][1]은 Web App 리소스만 배포하므로, 컨테이너를 개별적으로 빌드 및 푸시해야 합니다.

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[2]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app
[3]: https://developer.hashicorp.com/terraform/install

{{% /tab %}}
{{% tab "Bicep" %}}

Web Apps for Containers에서 사이드카를 사용하려면 `kind`를 `app,linux,container`로 설정한 `SITECONTAINERS` linuxFxVersion을 사용해야 합니다. 다음과 같이 기존 웹 앱을 업데이트하여 필요한 Datadog 앱 설정과 사이드카를 포함하세요.

```bicep
resource webApp 'Microsoft.Web/sites@2025-03-01' = {
  kind: 'app,linux,container'
  // ...
  properties: {
    // ...
    siteConfig: {
      // ...
      linuxFxVersion: 'SITECONTAINERS'
      appSettings: concat(datadogAppSettings, [
        //... Your existing app settings
      ])
    }
  }
}

resource mainContainer 'Microsoft.Web/sites/sitecontainers@2025-03-01' = {
  parent: webApp
  name: 'main'
  properties: {
    isMain: true
    image: 'index.docker.io/your/image:tag' // Replace with your Application Image
    targetPort: '8080'                      // Replace with your Application's Port
  }
}

@secure()
param datadogApiKey string

var datadogAppSettings = [
  { name: 'DD_API_KEY', value: datadogApiKey }
  { name: 'DD_SITE', value: 'datadoghq.com' }  // Replace with your Datadog site
  { name: 'DD_SERVICE', value: 'my-service' }  // Replace with your service name
  { name: 'DD_ENV', value: 'prod' }            // Replace with your environment (e.g. prod, staging)
  { name: 'DD_VERSION', value: '0.0.0' }       // Replace with your application version
  { name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE', value: 'true' }
  // Uncomment for .NET applications
  // { name: 'DD_DOTNET_TRACER_HOME', value: '/datadog/tracer' }
  // { name: 'CORECLR_ENABLE_PROFILING', value: '1' }
  // { name: 'CORECLR_PROFILER', value: '{846F5F1C-F9AE-4B07-969E-05C26BC060D8}' }
  // { name: 'CORECLR_PROFILER_PATH', value: '/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so' }
  { name: 'DD_LOGS_INJECTION', value: 'true' }
  { name: 'DD_TRACE_ENABLED', value: 'true' }
  // Add any additional options here
]

resource sidecar 'Microsoft.Web/sites/sitecontainers@2025-03-01' = {
  parent: webApp
  name: 'datadog-sidecar'
  properties: {
    image: 'index.docker.io/datadog/serverless-init:latest'
    isMain: false
    targetPort: '8126'
    environmentVariables: [for v in datadogAppSettings: { name: v.name, value: v.name }]
  }
}
```

업데이트된 템플릿을 다시 배포합니다.

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

모든 환경 변수에 대한 설명은 [{{< ui >}}Manual{{< /ui >}} 탭](?tab=manual#instrumentation)을 참조하세요.


{{% /tab %}}
{{% tab "ARM 템플릿" %}}

다음과 같이 기존 웹 앱을 업데이트하여 필요한 Datadog 앱 설정과 사이드카를 포함하세요.

```jsonc
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "webAppName": {
      "type": "string"
    },
    // ...
    "datadogApiKey": {
      "type": "securestring"
    }
  },
  "variables": {
    "datadogAppSettings": [
      { "name": "DD_API_KEY", "value": "[parameters('datadogApiKey')]" },
      { "name": "DD_SITE", "value": "datadoghq.com" }, // Replace with your Datadog site
      { "name": "DD_SERVICE", "value": "my-service" }, // Replace with your service name
      { "name": "DD_ENV", "value": "prod" },           // Replace with your environment (e.g. prod, staging)
      { "name": "DD_VERSION", "value": "0.0.0" },      // Replace with your application version
      { "name": "WEBSITES_ENABLE_APP_SERVICE_STORAGE", "value": "true" },
      // Uncomment for .NET applications
      // { "name": "DD_DOTNET_TRACER_HOME", "value": "/datadog/tracer" }
      // { "name": "CORECLR_ENABLE_PROFILING", "value": "1" }
      // { "name": "CORECLR_PROFILER", "value": "{846F5F1C-F9AE-4B07-969E-05C26BC060D8}" }
      // { "name": "CORECLR_PROFILER_PATH", "value": "/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so" }
      { "name": "DD_LOGS_INJECTION", "value": "true" },
      { "name": "DD_TRACE_ENABLED", "value": "true" }
      // Add any additional options here
    ],
    "yourAppSettings": [
      // Add your app settings here
    ]
  },
  "resources": {
    "webApp": {
      "type": "Microsoft.Web/sites",
      "apiVersion": "2025-03-01",
      "name": "[parameters('webAppName')]",
      "kind": "app,linux,container",
      // ...
      "properties": {
        // ...
        "siteConfig": {
          // ...
          "linuxFxVersion": "SITECONTAINERS",
          "appSettings": "[concat(variables('datadogAppSettings'), variables('yourAppSettings'))]"
        }
      }
    },
    "mainContainer": {
      "type": "Microsoft.Web/sites/sitecontainers",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/main')]",
      "properties": {
        "isMain": true,
        "image": "index.docker.io/your/image:tag", // Replace with your Application Image
        "targetPort": "8080"                       // Replace with your Application's Port
      }
    },
    "sidecar": {
      "type": "Microsoft.Web/sites/sitecontainers",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/datadog-sidecar')]",
      "properties": {
        "image": "index.docker.io/datadog/serverless-init:latest",
        "isMain": false,
        "targetPort": "8126",
        "copy": [{
          "name": "environmentVariables", "count": "[length(variables('datadogAppSettings'))]",
          "input": {
            "name": "[variables('datadogAppSettings')[copyIndex('environmentVariables')].name]",
            "value": "[variables('datadogAppSettings')[copyIndex('environmentVariables')].name]"
          }
        }]
      }
    }
  }
}
```

업데이트된 템플릿을 다시 배포합니다.

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

모든 환경 변수에 대한 설명은 [{{< ui >}}Manual{{< /ui >}} 탭](?tab=manual#instrumentation)을 참조하세요.

{{% /tab %}}
{{% tab "수동" %}}

#### 사이드카 컨테이너{#sidecar-container}

1. Azure 포털에서 {{< ui >}}Deployment Center{{< /ui >}}로 이동하여 {{< ui >}}Add{{< /ui >}}를 선택합니다.
2. {{< ui >}}Edit container{{< /ui >}} 양식에 다음 정보를 입력합니다.
   - {{< ui >}}Image source{{< /ui >}}: Docker Hub 또는 기타 레지스트리
   - {{< ui >}}Image type{{< /ui >}}: 공개
   - {{< ui >}}Registry server URL{{< /ui >}}: `index.docker.io`
   - {{< ui >}}Image and tag{{< /ui >}}: `datadog/serverless-init:latest`
   - {{< ui >}}Port{{< /ui >}}: 8126
   - {{< ui >}}Environment variables{{< /ui >}} 아래에서 {{< ui >}}Allow access to all app settings{{< /ui >}} 옵션을 활성화합니다.

     {{< img src="serverless/azure_app_service/app_settings.png" alt="Azure의 Environment Variables 섹션에서 활성화된 'Allow access to all app settings' 옵션 확인란" >}}

3. {{< ui >}}Apply{{< /ui >}}를 선택합니다.

#### 애플리케이션 설정{#application-settings}

Azure의 {{< ui >}}App settings{{< /ui >}}에서 메인 컨테이너에 다음 환경 변수를 설정하세요.

- `DD_API_KEY`: [Datadog API 키][701]
- `DD_SERVICE`: 서비스에 적용할 태그. 예: `sidecar-azure`
- `DD_ENV`: 환경에 적용할 태그. 예: `prod`
- `WEBSITES_ENABLE_APP_SERVICE_STORAGE`: `true`. 이 환경 변수를 설정하면 `/home/` 마운트가 지속되고 사이드카와 공유됩니다.
- `DD_SERVERLESS_LOG_PATH`: 로그를 기록할 위치. 예: `/home/LogFiles/*.log` 또는 `/home/LogFiles/myapp/*.log`
- `DD_AAS_INSTANCE_LOGGING_ENABLED`: `true`인 경우, 추가 파일 경로 `/home/LogFiles/*$COMPUTERNAME*.log`에 대해 로그 수집이 자동으로 구성됩니다.
- `DD_AAS_INSTANCE_LOG_FILE_DESCRIPTOR`: 보다 정확한 파일 테일링을 위해 사용되는 선택 사항인 파일 설명자입니다. 로그 로테이션이 빈번하게 발생하는 시나리오에 권장됩니다. 예를 들어, `_default_docker`를 설정하면 로그 테일러가 로테이션된 파일을 무시하고 Azure의 활성 로그 파일만 테일링하도록 구성됩니다.


   <div class="alert alert-info">애플리케이션에 여러 인스턴스가 있는 경우, 애플리케이션의 로그 파일 이름에 <code>$COMPUTERNAME</code> 변수를 포함하세요. 이를 통해 로그 테일링이 동일한 파일을 읽는 여러 인스턴스에서 중복 로그를 생성하지 않도록 합니다.</div>

<details open>
<summary>
<h4>.NET 애플리케이션의 경우: 추가로 필요한 환경 변수</h4>
</summary>

.NET 애플리케이션에 대한 모니터링을 설정하는 경우, 다음 **필수** 환경 변수를 구성하세요.

| 변수 이름 | 값 |
| ------------- | ----- |
| `DD_DOTNET_TRACER_HOME` | `/datadog/tracer` |
| `CORECLR_ENABLE_PROFILING` | `1` |
| `CORECLR_PROFILER` | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` |
| `CORECLR_PROFILER_PATH` | `/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so` |
</details>

[701]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

### 배포 슬롯 {#deployment-slots}

<div class="alert alert-info">배포 슬롯 계측은 미리 보기로 제공되고 있습니다. 미리 보기 기간 동안에는 기본 웹 앱 아래에 슬롯의 텔레메트리가 표시됩니다. 슬롯과 프로덕션 텔레메트리를 구분하려면 각 슬롯에 대해 서로 다른 값으로 <a href="/getting_started/tagging/unified_service_tagging/">unified service tagging</a>을 구성하세요.</div>

{{% collapse-content title="배포 슬롯 계측" level="h4" %}}

기본 웹 앱 대신 [배포 슬롯][901]을 계측하려면 다음 방법 중 하나를 사용하세요.

[901]: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots

{{< tabs >}}
{{% tab "Datadog CLI" %}}

[Datadog CLI][1](v5.9.0 이상)를 사용하여 `--slot` 플래그를 추가하세요. `--service`, `--env` 및 `--version`을 사용하여 슬롯에 대해 서로 다른 unified service tagging 값을 설정하세요.

배포 슬롯의 이름을 찾으려면 다음을 실행하세요.

```shell
az webapp deployment slot list --query '[].name' -o tsv -g <resource-group> -n <web-app>
```

```shell
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name> \
  --slot <slot-name> \
  --service <service-name> --env <slot-env> --version <app-version>
```

또는 `--resource-id` 플래그와 함께 전체 슬롯 리소스 ID를 제공하세요.

```shell
datadog-ci aas instrument --resource-id /subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Web/sites/<app-name>/slots/<slot-name> \
  --service <service-name> --env <slot-env> --version <app-version>
```

**참고**: `--env`를 전달하면 CLI가 자동으로 `DD_ENV`를 고정 설정으로 표시하므로, 슬롯 교체 시에도 `env` 태그가 동일하게 유지됩니다.

[1]: https://github.com/DataDog/datadog-ci#how-to-install-the-cli

{{% /tab %}}
{{% tab "Terraform" %}}

[Datadog Linux Web App Slot 모듈][1]을 사용하세요.

```tf
module "my_web_app_slot" {
  source  = "DataDog/web-app-datadog/azurerm//modules/linux-slot"
  version = "~> 1.0"

  name                = "staging"             // Replace with your slot name
  app_service_id      = module.my_web_app.id  // Reference to your main web app
  resource_group_name = "my-resource-group"   // Replace with your resource group name

  datadog_api_key = var.datadog_api_key
  datadog_service = "my-service" // Replace with your service name
  datadog_env     = "staging"    // Set a distinct value for each slot
  datadog_version = "0.0.0"      // Replace with your application version

  site_config = {
    application_stack = {
      docker_registry_url = "https://index.docker.io" // Replace with your registry URL
      docker_image_name   = "my-app:latest"           // Replace with your image name
    }
  }
  app_settings = {
    DD_TRACE_ENABLED = "true" // Example setting
  }
}
```

`terraform apply`을 실행하고 모든 프롬프트를 따르세요.

**참고**: 메인 웹 앱 모듈에 `datadog_env`가 설정되면, 모듈은 `DD_ENV`를 고정 설정으로 표시하므로, 슬롯 교체 시에도 `env` 태그가 동일하게 유지됩니다.

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux-slot

{{% /tab %}}
{{% tab "Bicep" %}}

메인 웹 앱 대신 배포 슬롯을 대상으로 지정하도록 템플릿을 업데이트하세요.

```bicep
param webAppName string
param slotName string

@description('Names of app settings already marked slot-sticky on this web app. Pass [] for a new app with no existing sticky settings. This template does a full replace of slotConfigNames — omitting an existing sticky setting name will de-sticky it.')
param existingStickyAppSettingNames array = []

resource webApp 'Microsoft.Web/sites@2025-03-01' existing = {
  name: webAppName
}

resource slot 'Microsoft.Web/sites/slots@2025-03-01' = {
  parent: webApp
  name: slotName
  kind: 'app,linux,container'
  // ...
  properties: {
    // ...
    siteConfig: {
      // ...
      linuxFxVersion: 'SITECONTAINERS'
      appSettings: concat(datadogAppSettings, [
        //... Your existing app settings
      ])
    }
  }
}

// Marks DD_ENV as slot-sticky so your `env` tag persists across slot swaps. Replaces the
// full slotConfigNames list — existingStickyAppSettingNames must include any settings already
// marked sticky or they will be de-stickied.
resource stickySettings 'Microsoft.Web/sites/config@2025-03-01' = {
  parent: webApp
  name: 'slotConfigNames'
  properties: {
    appSettingNames: union(existingStickyAppSettingNames, ['DD_ENV'])
  }
  dependsOn: [slot]
}

resource mainContainer 'Microsoft.Web/sites/slots/sitecontainers@2025-03-01' = {
  parent: slot
  name: 'main'
  properties: {
    isMain: true
    image: 'index.docker.io/your/image:tag' // Replace with your Application Image
    targetPort: '8080'                      // Replace with your Application's Port
  }
}

@secure()
param datadogApiKey string

var datadogAppSettings = [
  { name: 'DD_API_KEY', value: datadogApiKey }
  { name: 'DD_SITE', value: 'datadoghq.com' }  // Replace with your Datadog site
  { name: 'DD_SERVICE', value: 'my-service' }  // Replace with your service name
  { name: 'DD_ENV', value: 'staging' }          // Set a distinct value for each slot
  { name: 'DD_VERSION', value: '0.0.0' }       // Replace with your application version
  { name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE', value: 'true' }
  // Uncomment for .NET applications
  // { name: 'DD_DOTNET_TRACER_HOME', value: '/datadog/tracer' }
  // { name: 'CORECLR_ENABLE_PROFILING', value: '1' }
  // { name: 'CORECLR_PROFILER', value: '{846F5F1C-F9AE-4B07-969E-05C26BC060D8}' }
  // { name: 'CORECLR_PROFILER_PATH', value: '/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so' }
  { name: 'DD_LOGS_INJECTION', value: 'true' }
  { name: 'DD_TRACE_ENABLED', value: 'true' }
  // Add any additional options here
]

resource sidecar 'Microsoft.Web/sites/slots/sitecontainers@2025-03-01' = {
  parent: slot
  name: 'datadog-sidecar'
  properties: {
    image: 'index.docker.io/datadog/serverless-init:latest'
    isMain: false
    targetPort: '8126'
    environmentVariables: [for v in datadogAppSettings: { name: v.name, value: v.name }]
  }
}
```

업데이트된 템플릿을 다시 배포하세요.

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**참고**: Azure 앱 설정은 기본적으로 슬롯 간에 전환됩니다. 상기 `slotConfigNames` 리소스는 `DD_ENV`를 고정 설정으로 표시하므로, 슬롯 교체 시에도 `env` 태그가 동일하게 유지됩니다.

`slotConfigNames` 리소스는 고정 설정 목록을 완전히 대체합니다. `existingStickyAppSettingNames`에 이미 고정으로 표시된 설정을 전달하거나, 새 앱의 경우 `[]`을 전달합니다. 생략된 이름은 고정이 해제됩니다.

{{% /tab %}}
{{% tab "ARM 템플릿" %}}

메인 웹 앱 대신 배포 슬롯을 대상으로 지정하도록 템플릿을 업데이트하세요.

```jsonc
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "webAppName": {
      "type": "string"
    },
    "slotName": {
      "type": "string"
    },
    // ...
    "datadogApiKey": {
      "type": "securestring"
    },
    "existingStickyAppSettingNames": {
      "type": "array",
      "defaultValue": [],
      "metadata": { "description": "Names of app settings already marked slot-sticky on this web app. Pass [] for a new app with no existing sticky settings. This template does a full replace of slotConfigNames — omitting an existing sticky setting name will de-sticky it." }
    }
  },
  "variables": {
    "datadogAppSettings": [
      { "name": "DD_API_KEY", "value": "[parameters('datadogApiKey')]" },
      { "name": "DD_SITE", "value": "datadoghq.com" }, // Replace with your Datadog site
      { "name": "DD_SERVICE", "value": "my-service" }, // Replace with your service name
      { "name": "DD_ENV", "value": "staging" },        // Set a distinct value for each slot
      { "name": "DD_VERSION", "value": "0.0.0" },      // Replace with your application version
      { "name": "WEBSITES_ENABLE_APP_SERVICE_STORAGE", "value": "true" },
      // Uncomment for .NET applications
      // { "name": "DD_DOTNET_TRACER_HOME", "value": "/datadog/tracer" }
      // { "name": "CORECLR_ENABLE_PROFILING", "value": "1" }
      // { "name": "CORECLR_PROFILER", "value": "{846F5F1C-F9AE-4B07-969E-05C26BC060D8}" }
      // { "name": "CORECLR_PROFILER_PATH", "value": "/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so" }
      { "name": "DD_LOGS_INJECTION", "value": "true" },
      { "name": "DD_TRACE_ENABLED", "value": "true" }
      // Add any additional options here
    ],
    "yourAppSettings": [
      // Add your app settings here
    ]
  },
  "resources": {
    "slot": {
      "type": "Microsoft.Web/sites/slots",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/', parameters('slotName'))]",
      "kind": "app,linux,container",
      // ...
      "properties": {
        // ...
        "siteConfig": {
          // ...
          "linuxFxVersion": "SITECONTAINERS",
          "appSettings": "[concat(variables('datadogAppSettings'), variables('yourAppSettings'))]"
        }
      }
    },
    "mainContainer": {
      "type": "Microsoft.Web/sites/slots/sitecontainers",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/', parameters('slotName'), '/main')]",
      "properties": {
        "isMain": true,
        "image": "index.docker.io/your/image:tag", // Replace with your Application Image
        "targetPort": "8080"                       // Replace with your Application's Port
      }
    },
    "sidecar": {
      "type": "Microsoft.Web/sites/slots/sitecontainers",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/', parameters('slotName'), '/datadog-sidecar')]",
      "properties": {
        "image": "index.docker.io/datadog/serverless-init:latest",
        "isMain": false,
        "targetPort": "8126",
        "copy": [{
          "name": "environmentVariables", "count": "[length(variables('datadogAppSettings'))]",
          "input": {
            "name": "[variables('datadogAppSettings')[copyIndex('environmentVariables')].name]",
            "value": "[variables('datadogAppSettings')[copyIndex('environmentVariables')].name]"
          }
        }]
      }
    },
    // Marks DD_ENV as slot-sticky so your `env` tag persists across slot swaps. Replaces the
    // full slotConfigNames list — existingStickyAppSettingNames must include any settings
    // already marked sticky or they will be de-stickied.
    "stickySettings": {
      "type": "Microsoft.Web/sites/config",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/slotConfigNames')]",
      "properties": {
        "appSettingNames": "[union(parameters('existingStickyAppSettingNames'), createArray('DD_ENV'))]"
      },
      "dependsOn": [
        "[resourceId('Microsoft.Web/sites/slots', parameters('webAppName'), parameters('slotName'))]"
      ]
    }
  }
}
```

업데이트된 템플릿을 다시 배포하세요.

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**참고**: Azure 앱 설정은 기본적으로 슬롯 간에 전환됩니다. 상기 `slotConfigNames` 리소스는 `DD_ENV`를 고정 설정으로 표시하므로, 슬롯 교체 시에도 `env` 태그가 동일하게 유지됩니다.

`slotConfigNames` 리소스는 고정 설정 목록을 완전히 대체합니다. `existingStickyAppSettingNames`에 이미 고정으로 표시된 설정을 전달하거나, 새 앱의 경우 `[]`을 전달합니다. 생략된 이름은 고정이 해제됩니다.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## 문제 해결 {#troubleshooting}

App Service 플랜에서 자동 크기 조정이 활성화되어 있고 관련 없는 트레이스가 함께 병합되는 경우, Azure 플랫폼 상태 프로브(`User-Agent: HttpScaleManager`)가 오래된 W3C 트레이스 컨텍스트를 전달할 수 있습니다. 앱에 대한 모든 호출자가 Datadog으로 계측된 경우, 영향을 받는 앱에서 `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog`을 설정하여 트레이스 컨텍스트 추출을 Datadog 형식으로 제한하세요. Datadog으로 계측되지 않은 호출자가 있는 앱의 경우, 이 설정을 사용하면 Datadog이 해당 호출자의 W3C 트레이스 컨텍스트를 무시하여 해당 요청을 상위 트레이스로 병합하는 대신 연결되지 않은 트레이스로 분리합니다.

## 프로파일링 {#profiling}

<div class="alert alert-info">
Datadog의 Continuous Profiler는 Linux Azure App Service에서 Python 및 Node.js용으로 미리 보기로 제공되고 있습니다.
</div>

[Continuous Profiler][4]를 활성화하려면 애플리케이션 컨테이너에 `DD_PROFILING_ENABLED=true` 환경 변수를 설정하세요.

## 예시 애플리케이션 {#example-application}
다음 예에는 추적, 메트릭 및 로그가 설정된 단일 앱이 포함되어 있습니다.

{{< tabs >}}
{{% tab "Node.js" %}}

```js
const tracer = require('dd-trace').init({
 logInjection: true,
});
const express = require("express");
const app = express();
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
 level: 'info',
 exitOnError: false,
 format: format.json(),
 transports: [new transports.File({ filename: `/home/LogFiles/app-${process.env.COMPUTERNAME}.log`}),
  ],
});

app.get("/", (_, res) => {
 logger.info("Welcome!");
 res.sendStatus(200);
});

app.get("/hello", (_, res) => {
 logger.info("Hello!");
 metricPrefix = "nodejs-azure-sidecar";
 // Send three unique metrics, just so we're testing more than one single metric
 metricsToSend = ["sample_metric_1", "sample_metric_2", "sample_metric_3"];
 metricsToSend.forEach((metric) => {
   for (let i = 0; i < 20; i++) {
     tracer.dogstatsd.distribution(`${metricPrefix}.${metric}`, 1);
   }
 });
 res.status(200).json({ msg: "Sending metrics to Datadog" });
});

const port = process.env.PORT || 8080;
app.listen(port);
```
{{% /tab %}}
{{% tab "Python" %}}

```python
from flask import Flask, Response
from datadog import initialize, statsd
import os
import ddtrace
import logging

ddtrace.patch(logging=True)

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
         '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
         '- %(message)s')
logging.basicConfig(filename=f'/home/LogFiles/app-{os.getenv(COMPUTERNAME)}.log', format=FORMAT)
log = logging.getLogger(__name__)
log.level = logging.INFO

options = {
   'statsd_host':'127.0.0.1',
   'statsd_port':8125
}

initialize(**options)

app = Flask(__name__)

@app.route("/")
def home():
   statsd.increment('page.views')
   log.info('Hello Datadog!!')
   return Response('💜 Hello Datadog!! 💜', status=200, mimetype='application/json')

app.run(host="0.0.0.0", port=8080)
```
{{% /tab %}}
{{% tab "Java" %}}

```java
package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

@RestController
public class HelloController {
   private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").port(8125).build();
   private static final Log logger = LogFactory.getLog(HelloController.class);
   @GetMapping("/")
   public String index() {
       Statsd.incrementCounter("page.views");
       logger.info("Hello Azure!");
       return "💜 Hello Azure! 💜";
   }

}

```
{{% /tab %}}
{{% tab "Go" %}}

```go
package main

import (
   "fmt"
   "log"
   "net/http"
   "os"
   "path/filepath"
   "github.com/DataDog/datadog-go/v5/statsd"
   "github.com/DataDog/dd-trace-go/v2/ddtrace"
   "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

const logDir = "/home/LogFiles"

var logFile *os.File
var logCounter int
var dogstatsdClient *statsd.Client

func handler(w http.ResponseWriter, r *http.Request) {
   log.Println("Hello Datadog!")
   span := tracer.StartSpan("maincontainer", tracer.ResourceName("/handler"))
   defer span.Finish()
   logCounter++
   writeLogsToFile(fmt.Sprintf("received request %d", logCounter), span.Context())
   dogstatsdClient.Incr("request.count", []string{}, 1)
   fmt.Fprintf(w, "💜 Hello Datadog! 💜")
}

func writeLogsToFile(log_msg string, context ddtrace.SpanContext) {
   span := tracer.StartSpan(
       "writeLogToFile",
       tracer.ResourceName("/writeLogsToFile"),
       tracer.ChildOf(context))
   defer span.Finish()
   _, err := logFile.WriteString(log_msg + "\n")
   if err != nil {
       log.Println("Error writing to log file:", err)
   }
}

func main() {
   log.Print("Main container started...")

   err := os.MkdirAll(logDir, 0755)
   if err != nil {
       panic(err)
   }

   logFilePath := filepath.Join(logDir, fmt.Sprintf("app-%s.log", os.Getenv("COMPUTERNAME")))
   log.Println("Saving logs in ", logFilePath)
   logFileLocal, err := os.OpenFile(logFilePath, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
   if err != nil {
       panic(err)
   }
   defer logFileLocal.Close()

   logFile = logFileLocal

   dogstatsdClient, err = statsd.New("localhost:8125")
   if err != nil {
       panic(err)
   }
   defer dogstatsdClient.Close()

   tracer.Start()
   defer tracer.Stop()

   http.HandleFunc("/", handler)
   log.Fatal(http.ListenAndServe(":8080", nil))
}

```
{{% /tab %}}
{{% tab "PHP" %}}

```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Formatter\JsonFormatter;

$statsd = new DogStatsd(
   array('host' => '127.0.0.1',
         'port' => 8125,
    )
 );

$log = new logger('datadog');
$formatter = new JsonFormatter();

$stream = new StreamHandler('/home/LogFiles/app-'.getenv("COMPUTERNAME").'.log', Logger::DEBUG);
$stream->setFormatter($formatter);

$log->pushHandler($stream);

$log->pushProcessor(function ($record) {
 $record['message'] .= sprintf(
     ' [dd.trace_id=%s dd.span_id=%s]',
     \DDTrace\logs_correlation_trace_id(),
     \dd_trace_peek_span_id()
 );
 return $record;
});

$log->info("Hello Datadog!");
echo '💜 Hello Datadog! 💜';

$log->info("sending a metric");
$statsd->increment('page.views', 1, array('environment'=>'dev'));

?>

```
{{% /tab %}}
{{< /tabs >}}

[1]: https://learn.microsoft.com/en-us/azure/app-service/tutorial-custom-container-sidecar
[2]: /ko/serverless/guide/azure_app_service_linux_containers_serverless_init
[3]: https://app.datadoghq.com/integrations/azure
[4]: /ko/profiler/
[5]: /ko/integrations/azure-app-services/#metrics