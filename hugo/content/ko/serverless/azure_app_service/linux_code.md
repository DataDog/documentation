---
aliases:
- /ko/serverless/azure_app_services/azure_app_services_linux
further_reading:
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: 블로그
  text: Datadog을 통해 Azure App Service에서 Linux 웹 앱 모니터링
title: Azure App Service - Linux 코드
---
## 개요 {#overview}

이 페이지에서는 Datadog Agent를 사용해 Linux Azure App Service 애플리케이션을 계측하는 방법을 설명합니다. 이 페이지에 명시된 절차는 사이드카 컨테이너와 Linux Azure App Service 애플리케이션 설정을 통해 애플리케이션을 계측하고 구성을 관리합니다.

사이드카 접근 방법을 사용하지 않으려는 경우(권장하지 않음), 대신 [Datadog 래퍼를 사용한 Azure App Service - Linux 코드 배포 계측][1] 안내를 따를 수 있습니다.

**지원 런타임**: Java, Node.js, .NET, PHP, Python

## 설정 {#setup}

### Azure 통합 {#azure-integration}

아직 설치하지 않았다면 [Datadog Azure 통합][10]을 설치하여 메트릭과 로그를 수집하세요.

### 애플리케이션 {#application}

사용 중인 언어에 맞는 SDK를 설치하세요.

{{< tabs >}}
{{% tab "Java" %}}

Java는 명령줄 인수 `javaagent`를 사용하여 계측 코드를 추가하는 기능을 지원합니다.

1. [Datadog Java SDK 최신 버전][101]을 다운로드합니다.
1. SDK를 프로젝트 내부에 배치합니다. 배포 시 반드시 포함해야 합니다.
   `azure-webapp-maven` 플러그인을 사용하는 경우, Java SDK를 `lib` 유형의 리소스 항목으로 추가할 수 있습니다.
1. 환경 변수 `JAVA_OPTS`를 `--javaagent:/home/site/lib/dd-java-agent.jar`로 설정합니다. 애플리케이션이 배포되면 Java 트레이서가 `/home/site/lib/dd-java-agent.jar`로 복사됩니다.

애플리케이션이 실행되면 계측이 시작됩니다.

[101]: https://dtdg.co/latest-java-tracer

{{% /tab %}}
{{% tab "Node.js" %}}

1. `dd-trace` 패키지를 설치합니다.
   ```
   npm install dd-trace
   ```
2. Node.js 트레이서를 `NODE_OPTIONS` 환경 변수로 초기화합니다.
   ```
   NODE_OPTIONS='--require dd-trace/init'
   ```

{{% /tab %}}
{{% tab ".NET" %}}

`Datadog.Trace.Bundle` Nuget 패키지를 프로젝트에 추가합니다. 자세한 내용은 [Nuget 패키지 페이지][102]를 참조하세요.

예:

```shell
dotnet add package Datadog.Trace.Bundle --version 3.21.0
```

[102]: https://www.nuget.org/packages/Datadog.Trace.Bundle#readme-body-tab

{{% /tab %}}
{{% tab "PHP" %}}

다음 스크립트를 실행하여 Datadog PHP SDK를 설치합니다.
startup.sh:

```bash
#!/usr/bin/env bash

echo "Setting up Datadog tracing for PHP"
DD_PHP_TRACER_VERSION=1.8.3
DD_PHP_TRACER_URL=https://github.com/DataDog/dd-trace-php/releases/download/${DD_PHP_TRACER_VERSION}/datadog-setup.php

echo "Installing PHP tracer from ${DD_PHP_TRACER_URL}"
if curl -LO --fail "${DD_PHP_TRACER_URL}"; then
    eval "php datadog-setup.php --php-bin=all"
else
    echo "Downloading the tracer was unsuccessful"
    return
fi

# This line is can be uncommented if the project contains an nginx configuration in the project root
# cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload

service nginx reload
```

이 bash 스크립트는 시작 명령으로 실행되도록 구성되었으며, PHP에 추적 모듈을 설치한 다음 NGINX 서비스를 다시 시작합니다.

{{% /tab %}}
{{% tab "Python" %}}

1. 프로젝트에 `ddtrace`를 추가합니다.
1. 시작 명령을 수정합니다. 새 명령은 이전 명령을 인수로 사용하여 `ddtrace-run`을 실행해야 합니다. 즉, 시작 명령이 `foo`인 경우, `ddtrace-run foo`를 실행하도록 수정합니다.

   예:
   ```ssh
   ddtrace-run gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi
   ```

{{% /tab %}}
{{< /tabs >}}

### 계측 {#instrumentation}

{{< tabs >}}
{{% tab "Datadog CLI" %}}

#### 로컬 {#locally}

[Datadog CLI][201] 설치

```shell
npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-aas
```

[Azure CLI][202]를 설치하고 `az login`으로 인증합니다.

그런 다음, 아래의 명령어를 실행하여 사이드카 컨테이너를 설정합니다.

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

Datadog 사이트를 다음과 같이 설정합니다. {{< region-param key="dd_site" code="true" >}}기본값은 `datadoghq.com`입니다.

`--service` 및 `--env`와 같은 추가 플래그를 사용하여 서비스 및 환경 태그를 설정할 수 있습니다. 전체 옵션 목록을 보려면 `datadog-ci aas instrument --help`를 실행합니다.

`datadog-ci aas instrument` 계측 설정 시 한 번만 실행하면 됩니다. 코드를 배포할 때마다 다시 실행할 필요는 없으며, Datadog 구성 변경 시에만 다시 실행합니다.

#### Azure Cloud Shell {#azure-cloud-shell}

[Azure Cloud Shell][203]에서 Datadog CLI를 사용하려면 클라우드 셸을 열고 `DD_API_KEY` 및 `DD_SITE` 환경 변수에 API 키와 사이트를 설정한 다음, `npx`를 사용하여 CLI를 직접 실행합니다.

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
npx @datadog/datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```


[201]: https://github.com/DataDog/datadog-ci#how-to-install-the-cli
[202]: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli
[203]: https://portal.azure.com/#cloudshell/

{{% /tab %}}
{{% tab "Terraform" %}}

[Linux Web Apps용 Datadog Terraform 모듈][1]은 [azurerm_linux_web_app][2] 리소스를 래핑하고 필수 환경 변수 및 serverlessinit 사이드카를 추가하여 Datadog Serverless Monitoring을 위해 웹 앱을 자동으로 구성합니다.

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
      python_version = "3.13" // change for your specific runtime
    }
  }
  app_settings = {
    DD_TRACE_ENABLED = "true" // Example setting
  }
}
```

마지막으로 `terraform apply`를 실행하고 프롬프트를 따릅니다.

[Datadog Linux Web App 모듈][4]은 Web App 리소스만 배포하므로, [코드 배포][5] 작업은 별도로 수행해야 합니다.

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[2]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app
[3]: https://developer.hashicorp.com/terraform/install
[4]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[5]: https://learn.microsoft.com/en-us/azure/app-service/getting-started

{{% /tab %}}
{{% tab "Bicep" %}}

다음과 같이 기존 웹 앱을 업데이트하여 필요한 Datadog 앱 설정과 사이드카를 포함하세요.

```bicep
resource webApp 'Microsoft.Web/sites@2025-03-01' = {
  // ...
  properties: {
    // ...
    siteConfig: {
      // ...
      appSettings: concat(datadogAppSettings, [
        //... Your existing app settings
      ])
    }
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

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

모든 환경 변수에 대한 설명은 [매뉴얼 탭](?tab=manual#instrumentation)을 참조하세요.


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
      // ...
      "properties": {
        // ...
        "siteConfig": {
          // ...
          "appSettings": "[concat(variables('datadogAppSettings'), variables('yourAppSettings'))]"
        }
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
        }],
      }
    }
  }
}
```

업데이트된 템플릿을 다시 배포합니다.

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

모든 환경 변수에 대한 설명은 [매뉴얼 탭](?tab=manual#instrumentation)을 참조하세요.

{{% /tab %}}
{{% tab "수동" %}}

1. **Datadog용 사이드카 컨테이너를 구성합니다.**

   1. Azure에서 {{< ui >}}Deployment{{< /ui >}} > {{< ui >}}Deployment Center{{< /ui >}}로 이동합니다. {{< ui >}}Containers{{< /ui >}} 탭을 선택합니다.
   1. , {{< ui >}}Add{{< /ui >}}를 클릭하고 {{< ui >}}Custom container{{< /ui >}}를 선택합니다.
   1. {{< ui >}}Edit container{{< /ui >}} 양식에 다음 정보를 입력합니다.
      - {{< ui >}}Image source{{< /ui >}}: 기타 컨테이너 레지스트리
      - {{< ui >}}Image type{{< /ui >}}: 공개
      - {{< ui >}}Registry server URL{{< /ui >}}: `index.docker.io`
      - {{< ui >}}Image and tag{{< /ui >}}: `datadog/serverless-init:latest`
      - {{< ui >}}Port{{< /ui >}}: 8126
      - {{< ui >}}Environment variables{{< /ui >}} 아래에서 {{< ui >}}Allow access to all app settings{{< /ui >}} 옵션을 활성화합니다.

        {{< img src="serverless/azure_app_service/app_settings.png" alt="Azure의 Environment Variables 섹션으로, 체크박스가 있는 'Allow access to all app settings' 옵션이 활성화되어 있습니다." >}}

   1. {{< ui >}}Apply{{< /ui >}}를 선택합니다.

2. **환경 변수 구성**
   Azure의 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Environment Variables{{< /ui >}} > {{< ui >}}App Settings{{< /ui >}}에서 다음 키 값 쌍을 추가합니다.

`DD_API_KEY`
: **값**: Datadog API 키입니다.<br>
Datadog의 [조직 설정 > API 키][301]를 참조하세요.<br>

`DD_SITE`
: **값**: {{< region-param key="dd_site" code="true" >}}<br>
[Datadog 사이트][302]입니다. 기본값은 `datadoghq.com`입니다.<br>
이 페이지의 오른쪽 탐색 모음에서 "Datadog 사이트" 드롭다운 메뉴를 사용하여 사이트를 선택합니다.<br>

`DD_SERVICE`
: **값**: 애플리케이션의 서비스 이름입니다.<br>
기본값은 `package.json`의 이름 필드 값입니다.<br>
`service` 태그에 대한 자세한 내용은 [Unified Service Tagging][303]을 참조하세요.<br>

`DD_ENV`
: **값**: 애플리케이션의 환경 이름입니다.<br>
이 필드에는 기본값이 없습니다.<br>
`env` 태그에 대한 자세한 내용은 [Unified Service Tagging][303]을 참조하세요.<br>

`DD_VERSION`
: **값**: 애플리케이션의 버전입니다.<br>
이 필드에는 기본값이 없습니다.<br>
`version` 태그에 대한 자세한 내용은 [Unified Service Tagging][303]을 참조하세요.<br>

`WEBSITES_ENABLE_APP_SERVICE_STORAGE`
: **값**: `true`<br>
이 환경 변수를 `true`로 설정하면 `/home/` 마운트가 지속되고 사이드카와 공유됩니다.<br>

`DD_SERVERLESS_LOG_PATH`
: **값**: 사이드카가 로그를 수집할 때 사용하는 로그 경로입니다.<br>
로그를 기록하는 위치입니다. 예를 들어, `/home/LogFiles/*.log` 또는 `/home/LogFiles/myapp/*.log`입니다.<br>

`DD_AAS_INSTANCE_LOGGING_ENABLED`
: **값**: false <br>
`true`인 경우, 추가 파일 경로에 대해 로그 수집이 자동으로 구성됩니다. `/home/LogFiles/*$COMPUTERNAME*.log`

`DD_AAS_INSTANCE_LOG_FILE_DESCRIPTOR`
: **값**: 보다 정확한 로그 테일링을 위해 사용되는 선택적 파일 설명자입니다.<br>
로그 로테이션이 빈번하게 발생하는 시나리오에 권장됩니다. 예를 들어, `_default_docker`를 설정하면 로그 테일러가 로테이션된 파일을 무시하고 Azure의 활성 로그 파일에만 집중하도록 구성됩니다.<br>

<div class="alert alert-info">애플리케이션에 여러 인스턴스가 있는 경우, 애플리케이션의 로그 파일 이름에 변수가 포함되어 있는지 <code>$COMPUTERNAME</code> 확인하세요. 이를 통해 로그 테일링이 동일한 파일을 읽는 여러 인스턴스에서 중복 로그를 생성하지 않도록 합니다. 이 기능 변수를 활성화하면 <code>DD_SERVERLESS_LOG_PATH</code> 설정 기능도 차단됩니다. 이는 중복 로그 수집을 방지하기 위함입니다.</div>




{{% collapse-content title=".NET: 추가로 필요한 환경 변수" level="h4" id="dotnet-additional-settings" %}}

.NET 애플리케이션에는 다음 환경 변수를 **필수**로 설정해야 합니다. 자세한 내용은 `Datadog.Tracer.Bundle` [Nuget 패키지 README 파일][1]을 참조하세요.

`DD_DOTNET_TRACER_HOME`
: **값**: `/home/site/wwwroot/datadog`<br>
Datadog .NET SDK가 포함된 디렉터리의 경로입니다.<br>

`CORECLR_ENABLE_PROFILING`
: **값**: `1`<br>
.NET 런타임에서 계측 API를 활성화합니다.<br>

`CORECLR_PROFILER`
: **값**: `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`<br>
Datadog .NET 계측 라이브러리의 식별자입니다.<br>

`CORECLR_PROFILER_PATH`
: **값**: `/home/site/wwwroot/datadog/`<br>
`linux-x64/Datadog.Trace.ClrProfiler.Native.so` (하나의 줄)<br>
.NET 런타임에 의해 로드되는 계측 라이브러리의 경로입니다.<br>

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle#readme-body-tab

{{% /collapse-content %}}

[301]: https://app.datadoghq.com/organization-settings/api-keys
[302]: /ko/getting_started/site/
[303]: /ko/getting_started/tagging/unified_service_tagging

{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

### 배포 슬롯 {#deployment-slots}

<div class="alert alert-info">배포 슬롯 계측은 미리 보기 상태입니다. 미리 보기 기간 동안에는 기본 웹 앱 아래에 슬롯의 텔레메트리가 표시됩니다. 슬롯과 프로덕션 텔레메트리를 구분하려면 각 슬롯에 대해 서로 다른 값으로 <a href="/getting_started/tagging/unified_service_tagging/">unified service tagging</a>을 구성합니다.</div>

{{% collapse-content title="배포 슬롯 계측" level="h4" %}}

기본 웹 앱 대신 [배포 슬롯][801]을 계측하려면 다음 방법 중 하나를 사용합니다.

[801]: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots

{{< tabs >}}
{{% tab "Datadog CLI" %}}

[Datadog CLI][1](v5.9.0 이상)를 사용하여 `--slot` 플래그를 추가합니다. `--service`, `--env` 및 `--version`을 사용하여 슬롯에 대해 서로 다른 unified service tagging 값을 설정합니다.

배포 슬롯의 이름을 찾으려면 다음을 실행합니다.

```shell
az webapp deployment slot list --query '[].name' -o tsv -g <resource-group> -n <web-app>
```

```shell
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name> \
  --slot <slot-name> \
  --service <service-name> --env <slot-env> --version <app-version>
```

또는 `--resource-id` 플래그와 함께 전체 슬롯 리소스 ID를 제공합니다.

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
      python_version = "3.13" // change for your specific runtime
    }
  }
  app_settings = {
    DD_TRACE_ENABLED = "true" // Example setting
  }
}
```

`terraform apply`을 실행하고 모든 프롬프트를 따릅니다.

**참고**: 메인 웹 앱 모듈에 `datadog_env`가 설정되면, 모듈은 `DD_ENV`를 고정 설정으로 표시하므로, 슬롯 교체 시에도 `env` 태그가 동일하게 유지됩니다.

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux-slot

{{% /tab %}}
{{% tab "Bicep" %}}

메인 웹 앱 대신 배포 슬롯을 대상으로 지정하도록 템플릿을 업데이트합니다.

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
  // ...
  properties: {
    // ...
    siteConfig: {
      // ...
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

업데이트된 템플릿을 다시 배포합니다.

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**참고**: Azure 앱 설정은 기본적으로 슬롯 간에 전환됩니다. 상기 `slotConfigNames` 리소스는 `DD_ENV`를 고정 설정으로 표시하므로, 슬롯 교체 시에도 `env` 태그가 동일하게 유지됩니다.

`slotConfigNames` 리소스는 고정 설정 목록을 완전히 대체합니다. `existingStickyAppSettingNames`에 이미 고정으로 표시된 설정을 전달하거나, 새 앱의 경우 `[]`을 전달합니다. 생략된 이름은 고정이 해제됩니다.

{{% /tab %}}
{{% tab "ARM 템플릿" %}}

메인 웹 앱 대신 배포 슬롯을 대상으로 지정하도록 템플릿을 업데이트합니다.

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
      // ...
      "properties": {
        // ...
        "siteConfig": {
          // ...
          "appSettings": "[concat(variables('datadogAppSettings'), variables('yourAppSettings'))]"
        }
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

업데이트된 템플릿을 다시 배포합니다.

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**참고**: Azure 앱 설정은 기본적으로 슬롯 간에 전환됩니다. 상기 `slotConfigNames` 리소스는 `DD_ENV`를 고정 설정으로 표시하므로, 슬롯 교체 시에도 `env` 태그가 동일하게 유지됩니다.

`slotConfigNames` 리소스는 고정 설정 목록을 완전히 대체합니다. `existingStickyAppSettingNames`에 이미 고정으로 표시된 설정을 전달하거나, 새 앱의 경우 `[]`을 전달합니다. 생략된 이름은 고정이 해제됩니다.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

### Datadog에서 트레이스 확인 {#view-traces-in-datadog}

애플리케이션이 다시 시작되면 Datadog의 [APM 서비스 페이지][2]로 이동하여 애플리케이션에 설정한 서비스 이름(`DD_SERVICE`)을 검색합니다.

### 사용자 지정 메트릭 {#custom-metrics}

사용자 지정 메트릭을 전송하도록 애플리케이션을 설정하려면 사용하는 런타임에 맞는 단계를 따르세요.

- [Java][3]
- [Node.js][4]
- [.NET][5]
- [PHP][6]
- [Python][7]

### Continuous Profiler {#continuous-profiler}

<div class="alert alert-info">
Datadog의 Continuous Profiler는 Linux Azure App Service에서 Python 및 Node.js 미리 보기로 확인할 수 있습니다.
</div>

Continuous Profiler를 활성화하려면 `DD_PROFILING_ENABLED=true` 환경 변수를 설정합니다. 자세한 내용은 [Continuous Profiler 설명서][8]를 참조하세요.

## 배포 {#deployment}

{{% aas-workflow-linux %}}

## 문제 해결 {#troubleshooting}

트레이스나 사용자 지정 메트릭 데이터를 예상대로 수신하지 못하는 경우, 사이드카 구성 옵션에서 `DD_LOG_LEVEL`을 설정하여 에이전트 디버그 로깅을 활성화합니다. 트레이서 디버깅을 활성화하려면 `DD_TRACE_DEBUG`를 true로 설정합니다. 이렇게 하면 사이드카와 SDK에 대해 디버그 로그가 추가로 생성됩니다.

디버깅 로그를 수신하려면 반드시 {{< ui >}}App Service logs{{< /ui >}}를 활성화해야 합니다.

{{< img src="serverless/azure_app_service/app-service-logs.png" alt="Azure App Service 구성: Azure UI 설정의 모니터링 섹션에 있는 App Service 로그 'Application logging' 옵션이 'File System'으로 설정되어 있습니다." style="width:100%;" >}}

{{< ui >}}Log stream{{< /ui >}}의 내용을 [Datadog 고객 지원팀][9]과 공유하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/serverless/guide/azure_app_service_linux_code_wrapper_script
[2]: /ko/tracing/services/service_page/
[3]: /ko/extend/dogstatsd/?tab=java#dogstatsd-client
[4]: https://github.com/brightcove/hot-shots
[5]: /ko/extend/dogstatsd/?tab=dotnet#dogstatsd-client
[6]: /ko/extend/dogstatsd/?tab=php#dogstatsd-client
[7]: /ko/extend/dogstatsd/?tab=python#dogstatsd-client
[8]: /ko/profiler/
[9]: /ko/help
[10]: https://app.datadoghq.com/integrations/azure