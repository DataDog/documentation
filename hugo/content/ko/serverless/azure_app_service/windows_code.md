---
aliases:
- /ko/infrastructure/serverless/azure_app_services/
- /ko/serverless/azure_app_services/azure_app_services_windows
further_reading:
- link: /integrations/guide/azure-native-integration/
  tag: 설명서
  text: Azure 네이티브 통합 가이드
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: 블로그
  text: Azure App Service용 Datadog 확장 프로그램을 이용해 .NET 웹 앱 모니터링하기
- link: https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler-what-is-considered-as-a-host-for-azure-app-services
  tag: 요금
  text: Azure App Service APM 가격
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: 블로그
  text: ASP.NET Core 애플리케이션을 Azure App Service에 배포하기
- link: /serverless/azure_functions/dotnet_extension/
  tag: 설명서
  text: Azure Functions .NET APM Extension
title: Azure App Service - Windows 코드
---
## 개요 {#overview}

Azure App Service용 Datadog 확장 프로그램은 메트릭과 로그를 제공하는 [Datadog-Azure 통합][5] 외에도 모니터링 기능을 제공합니다.

- 자동 계측을 사용한 전체 분산 APM 트레이싱
- 관련 Azure App Service 메트릭과 메타데이터를 보여주는 사용자 지정 APM 서비스 및 트레이스 보기
- 스팬을 사용자 지정할 수 있는 수동 APM 계측 지원
- `Trace_ID` 애플리케이션 로그에 삽입
- [DogStatsD][1]를 사용한 사용자 지정 메트릭 전송 지원

<div class="alert alert-info">
이 확장 프로그램은 다음을 지원합니다.
<ul>
  <li>App Service Web Apps: Basic, Standard 및 Premium 플랜에서 .NET, Java 및 Node.js 런타임 지원</li>
  <li>Azure Functions: Dedicated(App Service) 또는 Premium 플랜에서 .NET 런타임만 지원 <a href="/serverless/azure_functions/dotnet_extension/">Azure Functions의 Windows Extension에 대한 구체적인 구성 및 문제 해결 방법을 참조하세요.</a></li>
</ul>

.NET이 아닌 Azure Functions 또는 Dedicated/Premium 플랜이 아닌 환경의 .NET 구성에서는 <a href="/serverless/azure_functions">Serverless Compatibility Layer</a>를 사용해야 합니다.

<strong>다른 App Service 리소스 유형이나 런타임에 대한 지원이 필요하신가요?</strong> <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">가입</a>하여 미리 보기가 제공되면 알림을 받으세요.</div>

### 지원되는 런타임 {#supported-runtimes}

Datadog .NET, Java 및 Node.js APM 확장 프로그램은 다음 런타임을 지원합니다.

| 프레임워크 | 지원되는 런타임 |
| --------- | ------------------ |
| .NET      | `ASPNET:V3.5`, `ASPNET:V4.8`, `dotnet:8`, `dotnet:9`, `dotnet:10`  |
| Java      | `JAVA:8`, `JAVA:11`, `JAVA:17`, `JAVA:21`, `TOMCAT:9.0-java8`, `TOMCAT:9.0-java11`, `TOMCAT:9.0-java17`, `TOMCAT:9.0-java21`, `TOMCAT:10.1-java8`, `TOMCAT:10.1-java11`, `TOMCAT:10.1-java17`, `TOMCAT:10.1-java21`, `TOMCAT:11.0-java8`, `TOMCAT:11.0-java11`, `TOMCAT:11.0-java17`, `TOMCAT:11.0-java21` |
| Node.js   | `NODE:20LTS`, `NODE:22LTS` |

### 확장 프로그램별 참고 사항 {#extension-specific-notes}

{{< tabs >}}
{{% tab ".NET" %}}

Datadog의 자동 계측은 .NET CLR 프로파일링 API를 사용합니다. 이 API는 하나의 구독자만 허용합니다(예: 프로파일러가 활성화된 Datadog의 .NET 트레이서). 최대한의 가시성을 확보하려면 애플리케이션 환경에서 APM 솔루션을 하나만 실행하세요.

또한 Azure Native 통합을 사용하는 경우 Azure의 Datadog 리소스를 사용하여 .NET 앱에 확장 프로그램을 추가할 수 있습니다. 지침은 Datadog의 [Azure Native 통합 가이드][2] 중 [App Service 확장 프로그램 섹션][1]을 참조하세요.

[1]: /ko/integrations/guide/azure-native-integration/#app-service-extension
[2]: /ko/integrations/guide/azure-native-integration/

{{% /tab %}}
{{% tab "Java" %}}
Java Web Apps에 대한 지원은 확장 프로그램 v2.4+에서 미리 보기로 제공되고 있습니다.

이 기간 동안 Java Web Apps를 트레이싱해도 추가 청구에는 영향을 미치지 않습니다.

{{% /tab %}}
{{< /tabs >}}

## 설치 {#installation}

Datadog은 최적의 성능, 안정성 및 기능 가용성을 유지할 수 있도록 확장 프로그램을 정기적으로 최신 버전으로 업데이트할 것을 권장합니다. 초기 설치와 이후 업데이트를 성공적으로 수행하려면 웹 앱을 완전히 중지해야 합니다.

아직 설정하지 않았다면 [Datadog-Azure 통합][3]을 설정하세요. Datadog에서 `azure.app_services.count` 또는 `azure.functions.count` 메트릭이 표시되는지 확인하여 Azure 통합이 올바르게 구성되었는지 검증할 수 있습니다.

<div class="alert alert-info">이 단계는 메트릭/트레이스 상관관계와 트레이스 패널 보기 기능에 매우 중요하며, Azure App Services와 함께 Datadog을 사용하는 전반적인 환경을 개선합니다.
</div>

{{< tabs >}}
{{% tab "Datadog CLI" %}}

#### 로컬 {#locally}

[Datadog CLI][201] 설치

```shell
npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-aas
```

[Azure CLI][202]를 설치하고 `az login`으로 인증하세요.

그런 다음, 아래의 명령어를 실행하여 사이드카 컨테이너를 설정핫요.

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

Datadog 사이트를 다음과 같이 설정하세요. {{< region-param key="dd_site" code="true" >}}기본값은 `datadoghq.com`입니다.

Datadog CLI는 앱의 런타임을 자동으로 추론하고 해당 애플리케이션을 설치합니다. 어떤 이유로든 실패할 경우 `--windows-runtime` 플래그로 런타임을 지정하여 이 동작을 재정의할 수 있습니다.

`--service` 및 `--env`와 같은 추가 플래그를 사용하여 서비스 및 환경 태그를 설정할 수 있습니다. 전체 옵션 목록을 보려면 `datadog-ci aas instrument --help`를 실행하세요.

`datadog-ci aas instrument` 계측 설정 시 한 번만 실행하면 됩니다. 코드를 배포할 때마다 다시 실행할 필요는 없으며, Datadog 구성을  변경할 경우에만 다시 실행하세요.

#### Azure Cloud Shell {#azure-cloud-shell}

[Azure Cloud Shell][203]에서 Datadog CLI를 사용하려면 클라우드 셸을 열고 `DD_API_KEY` 및 `DD_SITE` 환경 변수에 API 키와 사이트를 설정한 다음, `npx`를 사용하여 CLI를 직접 실행하세요.

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

[Windows Web Apps용 Datadog Terraform 모듈][4]은 [azurerm_windows_web_app][5] 리소스를 래핑하고 필수 환경 변수 및 런타임용 Windows Web App 확장 프로그램을 추가하여 Datadog Serverless Monitoring을 위해 웹 앱을 자동으로 구성합니다.

Terraform을 아직 설정하지 않은 경우 [Terraform을 설치][1]하고 새 디렉터리를 만든 후 `main.tf`라는 파일을 생성하세요.

그런 다음, 필요에 따라 업데이트하여 Terraform 구성에 다음을 추가하세요

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
  resource_group_name = "my-resource-group"   // Replace with your resource group
  os_type             = "Windows"
  location            = "eastus"
  sku_name            = "P1v2"
}

module "my_web_app" {
  source  = "DataDog/web-app-datadog/azurerm//modules/windows"
  version = "~> 1.0"

  name                = "my-web-app"        // Replace with your web app name
  resource_group_name = "my-resource-group" // Replace with your resource group
  service_plan_id     = azurerm_service_plan.my_asp.id
  location            = "eastus"

  datadog_api_key = var.datadog_api_key
  datadog_service = "my-service" // Replace with your service name
  datadog_env     = "prod"       // Replace with your environment (e.g. prod, staging)
  datadog_version = "0.0.0"      // Replace with your application version

  site_config = {
    application_stack = {
      node_version = "~22" // change for your specific runtime
    }
  }
  app_settings = {
    DD_TRACE_ENABLED = "true" // Example setting
  }
}
```

마지막으로 `terraform apply`를 실행하고 프롬프트를 따르세요.

[Datadog Windows Web App 모듈][2]은 Web App 리소스와 확장 프로그램만 배포하므로, [코드 배포][3] 작업은 별도로 수행해야 합니다.

[1]: https://developer.hashicorp.com/terraform/install
[2]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/windows
[3]: https://learn.microsoft.com/en-us/azure/app-service/getting-started
[4]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/windows
[5]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/windows_web_app

{{% /tab %}}
{{% tab "Bicep" %}}

다음과 같이 기존 Web App을 업데이트하여 필요한 Datadog App Settings와 확장 프로그램을 포함하세요.

```bicep
// Version: 1.0.0
@secure()
param datadogApiKey string

resource webApp 'Microsoft.Web/sites@2025-03-01' = {
  // ...
  properties: {
    // ...
    siteConfig: {
      // ...
      appSettings: [
        //... Your existing app settings
        { name: 'DD_API_KEY', value: datadogApiKey }
        { name: 'DD_SITE', value: 'datadoghq.com' }  // Replace with your Datadog site
        { name: 'DD_SERVICE', value: 'my-service' }  // Replace with your service name
        { name: 'DD_ENV', value: 'prod' }            // Replace with your environment (e.g. prod, staging)
        { name: 'DD_VERSION', value: '0.0.0' }       // Replace with your application version
        // Add any additional options here
      ]
    }
  }
}

resource datadogExtension 'Microsoft.Web/sites/siteextensions@2025-03-01' = {
  parent: webApp
  // Uncomment the extension for your runtime:
  // name: 'Datadog.AzureAppServices.Node.Apm'
  // name: 'Datadog.AzureAppServices.DotNet'
  // name: 'Datadog.AzureAppServices.Java.Apm'
}
```

업데이트된 템플릿을 배포하세요.

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**참고**: 앱을 수동으로 또는 스크립트를 통해 중지했다가 다시 시작해야 합니다. 그렇지 않으면 자동 트레이싱이 작동하지 않습니다. 업데이트 시에는 템플릿을 배포하기 전에 앱을 중지하고, 배포가 완료된 후 다시 시작해야 합니다.

모든 환경 변수에 대한 설명은 [{{< ui >}}Manual{{< /ui >}} 탭](?tab=manual#instrumentation)을 참조하세요.


{{% /tab %}}
{{% tab "ARM 템플릿" %}}

다음과 같이 기존 웹 앱을 업데이트하여 필요한 Datadog 앱 설정과 사이드카를 포함하세요.

```jsonc
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "metadata": { "version": "1.0.0" },
  "parameters": {
    "webAppName": {
      "type": "string"
    },
    // ...
    "datadogApiKey": {
      "type": "securestring"
    }
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
          "appSettings": [
            //... Your existing app settings
            { "name": "DD_API_KEY", "value": "[parameters('datadogApiKey')]" },
            { "name": "DD_SITE", "value": "datadoghq.com" }, // Replace with your Datadog site
            { "name": "DD_SERVICE", "value": "my-service" }, // Replace with your service name
            { "name": "DD_ENV", "value": "prod" },           // Replace with your environment (e.g. prod, staging)
            { "name": "DD_VERSION", "value": "0.0.0" },      // Replace with your application version
            // Add any additional options here
          ]
        }
      }
    },
    "datadogExtension": {
      "type": "Microsoft.Web/sites/siteextensions",
      "apiVersion": "2025-03-01",
      // Uncomment the extension for your runtime:
      // "name": "[concat(parameters('webAppName'), '/Datadog.AzureAppServices.Node.Apm')]"
      // "name": "[concat(parameters('webAppName'), '/Datadog.AzureAppServices.DotNet')]"
      // "name": "[concat(parameters('webAppName'), '/Datadog.AzureAppServices.Java.Apm')]"
    }
  }
}
```

업데이트된 템플릿을 배포하세요.

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**참고**: 앱을 수동으로 또는 스크립트를 통해 중지했다가 다시 시작해야 합니다. 그렇지 않으면 자동 트레이싱이 작동하지 않습니다. 업데이트 시에는 템플릿을 배포하기 전에 앱을 중지하고, 배포가 완료된 후 다시 시작해야 합니다.

모든 환경 변수에 대한 설명은 [{{< ui >}}Manual{{< /ui >}} 탭](?tab=manual#instrumentation)을 참조하세요.

{{% /tab %}}
{{% tab "수동" %}}

1. [Azure 포털][1]을 열고 Datadog으로 계측하려는 Azure 앱의 대시보드로 이동합니다.

2. 다음 Application Settings를 구성합니다.

   **필수 환경 변수**

   `DD_API_KEY`
   : **값**: Datadog API 키입니다.<br>
   Datadog에서 [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}API Keys{{< /ui >}}][2]를 참조하세요.<br>

   `DD_SITE`
   : **값**: Datadog 사이트<br>
   [Datadog 사이트][3]입니다. 기본값은 `datadoghq.com`입니다.<br>

   **Unified Service Tagging**

   Datadog은 [unified service tagging][4]을 위해 애플리케이션에 `env`, `service`, `version` 태그를 지정할 것을 권장합니다.

   `DD_SERVICE`
   : **값**: 애플리케이션의 서비스 이름입니다.<br>

   `DD_ENV`
   : **값**: 애플리케이션의 환경 이름입니다.<br>
   이 필드에는 기본값이 없습니다.<br>

   `DD_VERSION`
   : **값**: 애플리케이션의 버전입니다.<br>
   이 필드에는 기본값이 없습니다.<br>

   **추가 환경 변수**

   `DD_LOGS_INJECTION`
   : **값**: `true`(권장)<br>
   애플리케이션 로그에 트레이스 ID를 삽입하여 트레이스-로그 상관관계를 활성화합니다.<br>
   이를 통해 Datadog UI에서 로그와 트레이스를 연결할 수 있습니다.<br>

3. {{< ui >}}Save{{< /ui >}}를 클릭합니다. 이렇게 하면 애플리케이션이 다시 시작됩니다.

4. {{< ui >}}Stop{{< /ui >}}을 클릭하여 애플리케이션을 중지합니다.
   <div class="alert alert-danger">Datadog을 성공적으로 설치하려면 <u>반드시</u> 애플리케이션을 중지해야 합니다.</div>

5. Azure 포털l에서 {{< ui >}}Extensions{{< /ui >}} 페이지로 이동하여 Datadog APM 확장 프로그램을 선택합니다.

   {{< img src="infrastructure/serverless/azure_app_services/choose_extension.png" alt=".NET Datadog APM 확장 프로그램이 표시된 Azure 포털의 Extensions 페이지 예시입니다." style="width:100%;" >}}

6. 법적 약관에 동의하고 {{< ui >}}OK{{< /ui >}}를 클릭한 다음 설치가 완료될 때까지 기다립니다.
   <div class="alert alert-danger">이 단계를 수행하려면 애플리케이션이 중지된 상태여야 합니다.</div>

7.  {{< ui >}}Start{{< /ui >}}를 클릭하여 메인 애플리케이션을 시작합니다.

    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Azure 시작 버튼" style="width:100%;" >}}

8.  Azure 포털의 {{< ui >}}Extensions{{< /ui >}} 페이지를 확인하여 확장 프로그램이 설치되어 실행 중인지 확인합니다.

<div class="alert alert-info">가동 중지 시간을 방지하려면 <a href="https://learn.microsoft.com/en-us/azure/app-service/deploy-best-practices#use-deployment-slots">배포 슬롯</a>을 사용하세요. <a href="https://github.com/marketplace/actions/azure-cli-action">GitHub Action for Azure CLI</a>를 사용하는 워크플로를 만들 수 있습니다. 샘플 <a href="/resources/yaml/serverless/aas-workflow-windows.yaml">GitHub 워크플로</a>를 참조하세요.</div>

[1]: https://portal.azure.com/
[2]: /ko/account_management/api-app-keys/
[3]: /ko/getting_started/site/
[4]: /ko/getting_started/tagging/unified_service_tagging

{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

### 배포 슬롯 {#deployment-slots}

<div class="alert alert-info">배포 슬롯 계측은 미리 보기 상태입니다. 미리 보기 기간 동안에는 기본 웹 앱 아래에 슬롯의 텔레메트리가 표시됩니다. 슬롯과 프로덕션 텔레메트리를 구분하려면 각 슬롯에 대해 서로 다른 값으로 <a href="/getting_started/tagging/unified_service_tagging/">unified service tagging</a>을 구성합니다.</div>

{{% collapse-content title="배포 슬롯 계측" level="h4" %}}

기본 웹 앱 대신 [배포 슬롯][101]을 계측하려면 다음 방법 중 하나를 사용합니다.

[101]: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots

{{< tabs >}}
{{% tab "Datadog CLI" %}}

[Datadog CLI][1](v5.9.0 이상)를 사용하여 `--slot` 플래그를 추가합니다. `--service`, `--env` 및 `--version`을 사용하여 슬롯에 대해 서로 다른 unified service tagging 값을 설정합니다.

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

[Datadog Windows Web App Slot 모듈][1]을 사용하세요.

```tf
module "my_web_app_slot" {
  source  = "DataDog/web-app-datadog/azurerm//modules/windows-slot"
  version = "~> 1.0"

  name                = "staging"             // Replace with your slot name
  app_service_id      = module.my_web_app.id  // Reference to your main web app
  resource_group_name = "my-resource-group"   // Replace with your resource group

  datadog_api_key = var.datadog_api_key
  datadog_service = "my-service" // Replace with your service name
  datadog_env     = "staging"    // Set a distinct value for each slot
  datadog_version = "0.0.0"      // Replace with your application version

  site_config = {
    application_stack = {
      node_version = "~22" // change for your specific runtime
    }
  }
  app_settings = {
    DD_TRACE_ENABLED = "true" // Example setting
  }
}
```

`terraform apply`을 실행하고 모든 프롬프트를 따르세요.

**참고**: 메인 웹 앱 모듈에 `datadog_env`가 설정되면, 모듈은 `DD_ENV`를 고정 설정으로 표시하므로, 슬롯 교체 시에도 `env` 태그가 동일하게 유지됩니다.

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/windows-slot

{{% /tab %}}
{{% tab "Bicep" %}}

메인 웹 앱 대신 배포 슬롯을 대상으로 지정하도록 템플릿을 업데이트하세요.

```bicep
// Version: 1.0.0
@secure()
param datadogApiKey string

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
      appSettings: [
        //... Your existing app settings
        { name: 'DD_API_KEY', value: datadogApiKey }
        { name: 'DD_SITE', value: 'datadoghq.com' }  // Replace with your Datadog site
        { name: 'DD_SERVICE', value: 'my-service' }  // Replace with your service name
        { name: 'DD_ENV', value: 'staging' }          // Set a distinct value for each slot
        { name: 'DD_VERSION', value: '0.0.0' }       // Replace with your application version
        // Add any additional options here
      ]
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

resource datadogExtension 'Microsoft.Web/sites/slots/siteextensions@2025-03-01' = {
  parent: slot
  // Uncomment the extension for your runtime:
  // name: 'Datadog.AzureAppServices.Node.Apm'
  // name: 'Datadog.AzureAppServices.DotNet'
  // name: 'Datadog.AzureAppServices.Java.Apm'
}
```

업데이트된 템플릿을 배포하세요.

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**참고**: 확장 프로그램이 적용되려면 슬롯(메인 앱 아님)을 중지했다가 다시 시작해야 합니다.

**참고**: Azure 앱 설정은 기본적으로 슬롯 간에 전환됩니다. 상기 `slotConfigNames` 리소스는 `DD_ENV`를 고정 설정으로 표시하므로, 슬롯 교체 시에도 `env` 태그가 동일하게 유지됩니다.

`slotConfigNames` 리소스는 고정 설정 목록을 완전히 대체합니다. `existingStickyAppSettingNames`에 이미 고정으로 표시된 설정을 전달하거나, 새 앱의 경우 `[]`을 전달합니다. 생략된 이름은 고정이 해제됩니다.

{{% /tab %}}
{{% tab "ARM 템플릿" %}}

메인 웹 앱 대신 배포 슬롯을 대상으로 지정하도록 템플릿을 업데이트하세요.

```jsonc
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "metadata": { "version": "1.0.0" },
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
          "appSettings": [
            //... Your existing app settings
            { "name": "DD_API_KEY", "value": "[parameters('datadogApiKey')]" },
            { "name": "DD_SITE", "value": "datadoghq.com" }, // Replace with your Datadog site
            { "name": "DD_SERVICE", "value": "my-service" }, // Replace with your service name
            { "name": "DD_ENV", "value": "staging" },        // Set a distinct value for each slot
            { "name": "DD_VERSION", "value": "0.0.0" },      // Replace with your application version
            // Add any additional options here
          ]
        }
      }
    },
    "datadogExtension": {
      "type": "Microsoft.Web/sites/slots/siteextensions",
      "apiVersion": "2025-03-01",
      // Uncomment the extension for your runtime:
      // "name": "[concat(parameters('webAppName'), '/', parameters('slotName'), '/Datadog.AzureAppServices.Node.Apm')]"
      // "name": "[concat(parameters('webAppName'), '/', parameters('slotName'), '/Datadog.AzureAppServices.DotNet')]"
      // "name": "[concat(parameters('webAppName'), '/', parameters('slotName'), '/Datadog.AzureAppServices.Java.Apm')]"
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

업데이트된 템플릿을 배포하세요.

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**참고**: 확장 프로그램이 적용되려면 슬롯(메인 앱 아님)을 중지했다가 다시 시작해야 합니다.

**참고**: Azure 앱 설정은 기본적으로 슬롯 간에 전환됩니다. 상기 `slotConfigNames` 리소스는 `DD_ENV`를 고정 설정으로 표시하므로, 슬롯 교체 시에도 `env` 태그가 동일하게 유지됩니다.

`slotConfigNames` 리소스는 고정 설정 목록을 완전히 대체합니다. `existingStickyAppSettingNames`에 이미 고정으로 표시된 설정을 전달하거나, 새 앱의 경우 `[]`을 전달합니다. 생략된 이름은 고정이 해제됩니다.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

<div class="alert alert-info">Azure Functions를 사용하시나요? 확장 프로그램 설치 중 파일 잠금 오류를 방지하는 방법을 포함한 Function App별 설치 지침은 <a href="/serverless/azure_functions/dotnet_extension/">Azure Functions .NET APM Extension</a>을 참조하세요.</div>

## 사용자 지정 메트릭 {#custom-metrics}

Azure App Service 확장 프로그램에는 Datadog의 메트릭 집계 서비스인 [DogStatsD][1] 인스턴스가 포함되어 있습니다. 이 확장 프로그램을 사용하면 Azure Web Apps 및 Functions에서 Datadog으로 사용자 지정 메트릭, 서비스 검사 및 이벤트를 직접 전송할 수 있습니다.

Azure App Service에서 사용자 지정 메트릭과 검사를 작성하는 과정은 Datadog Agent가 실행 중인 호스트의 애플리케이션에서 수행하는 과정과 유사합니다. [표준 DogStatsD 구성 프로세스][1]와 **달리**, DogStatsD 구성을 초기화할 때 포트나 서버 이름을 설정할 필요가 없습니다. Azure App Service에는 메트릭 전송 방식을 결정하는 환경 변수가 있습니다(DogStatsD 클라이언트 v6.0.0 이상 필요).

확장 프로그램을 사용하여 Azure App Service에서 Datadog으로 사용자 지정 메트릭을 전송하려면 다음 단계를 따르세요.

{{< tabs >}}
{{% tab ".NET" %}}

{{% aas-custom-metrics-dotnet %}}

{{% /tab %}}
{{% tab "Java" %}}

1. [DogStatsD 클라이언트](https://search.maven.org/artifact/com.datadoghq/java-dogstatsd-client)를 프로젝트에 추가합니다.
2. DogStatsD를 초기화하고 애플리케이션에서 사용자 지정 메트릭을 작성합니다.
3. 지원되는 Azure Web App에 코드를 배포합니다.
4. 아직 설치하지 않았다면 Datadog App Service 확장 프로그램을 설치합니다.

메트릭을 전송하려면 다음 코드를 사용하세요.

```java
// Configure your DogStatsd client and configure any tags
StatsDClient client = new NonBlockingStatsDClientBuilder()
                            .constantTags("app:sample.service")
                            .build();
// Send a metric
client.Increment("sample.startup");
```

{{% /tab %}}
{{% tab "Node.js" %}}

1. 애플리케이션에서 [DogStatsD를 초기화하고 사용자 지정 메트릭을 작성][1]합니다.
2. 지원되는 Azure Web App에 코드를 배포합니다.
3. 아직 설치하지 않았다면 Datadog의 Azure App Service Node.js 확장 프로그램을 설치합니다.

<div class="alert alert-info">Node.js DogStatsD 클라이언트는 Node.js 트레이서(<code>dd-trace</code>)에 포함되어 있으며, 이 트레이서는 Azure App Service 확장 프로그램에 패키지되어 있으므로 별도로 설치할 필요가 없습니다.</div>

메트릭을 전송하려면 다음 코드를 사용하세요.

```javascript
const tracer = require('dd-trace');
tracer.init();

tracer.dogstatsd.increment('example_metric.increment', 1, { environment: 'dev' });
tracer.dogstatsd.decrement('example_metric.decrement', 1, { environment: 'dev' });
```

<div class="alert alert-info">Datadog의 Node.js 트레이서는 <code>dd-trace</code>Azure App Services 확장 프로그램에 패키지되어 있습니다. 이는 자동으로 <code>NODE_PATH</code>에 추가됩니다.<br/><br/> <strong></strong> <code>dd-trace</code> <strong>을 </strong>의 종속성으로 추가할 필요가 없습니다. <code>package.json</code>. 명시적으로 <code>dd-trace</code> 종속성으로 추가하면 확장 프로그램에서 제공하는 버전이 재정의될 수 있습니다. 로컬 테스트의 경우 <a href="https://github.com/DataDog/datadog-aas-extension/releases">릴리스 노트</a>를 참조하여 Azure App Service 확장 프로그램 버전에 적합한 Node.js 트레이서 버전을 확인하세요.</div>

[1]: /ko/extend/dogstatsd/

{{% /tab %}}
{{< /tabs >}}

**참고**: 트레이싱을 비활성화하고 사용자 지정 메트릭만 전송하려면 애플리케이션 구성에 다음 변수를 설정하세요.
  - `DD_TRACE_ENABLED`를 `false`로 설정합니다.
  - `DD_AAS_ENABLE_CUSTOM_METRICS`를 `true`로 설정합니다.

[사용자 지정 메트릭][2]에 대해 자세히 알아보세요.

## 로깅 {#logging}

### 애플리케이션 로깅 {#application-logging}

{{< tabs >}}
{{% tab ".NET" %}}

{{% aas-logging-dotnet %}}

{{% /tab %}}
{{% tab "Java" %}}

Azure App Service의 애플리케이션에서 Datadog으로 로그를 전송하려면 앱에서 Datadog으로 직접 로그를 스트리밍해야 합니다. 이 방법으로 로그를 제출하면 트레이스 ID 주입이 가능해져 Datadog에서 로그와 트레이스를 연결할 수 있습니다.

{{% /tab %}}
{{% tab "Node.js" %}}

Azure App Service의 애플리케이션에서 Datadog으로 로그를 전송하려면 앱에서 Datadog으로 직접 로그를 스트리밍해야 합니다. 이 방법으로 로그를 제출하면 트레이스 ID 주입이 가능해져 Datadog에서 로그와 트레이스를 연결할 수 있습니다.

{{% /tab %}}
{{< /tabs >}}

<br/>

### 로깅용 환경 변수 {#environment-variables-for-logging}

최적의 로그 수집을 위해 Azure App Service Application Settings에서 다음 환경 변수를 구성하세요.

| 변수 | 설명 | 예시 |
|----------|-------------|---------|
| `DD_SERVICE` | 애플리케이션의 서비스 이름 | `my-web-app` |
| `DD_ENV` | 애플리케이션의 환경 | `production`, `staging`, `development` |
| `DD_LOGS_INJECTION` | 트레이스-로그 상관관계 활성화 | `true` |

### 로깅 모범 사례 {#logging-best-practices}

- **트레이스 상관관계 활성화**: 로그와 트레이스를 연결하려면 `DD_LOGS_INJECTION=true`를 설정하세요.
- **적절한 서비스 이름 설정**: 로그가 올바른 서비스 이름으로 표시되도록 `DD_SERVICE`를 사용하세요.
- **구조적 로깅 사용**: 더 나은 로그 구문 분석을 위해 애플리케이션에 구조적 로깅을 구현하세요.

**참고**: 트레이스 ID 주입은 애플리케이션 내부에서 발생합니다. Azure 리소스 로그는 관리 평면에서 Azure에 의해 생성되므로 트레이스 ID를 포함하지 않습니다.

{{< tabs >}}
{{% tab ".NET" %}}

**코드 예시: Microsoft 네이티브 로깅**

Microsoft.Extensions.Logging을 사용하여 .NET 애플리케이션에서 로깅을 설정하는 방법의 예시는 다음과 같습니다.

```csharp
using Microsoft.Extensions.Logging;

public class WeatherForecastController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        _logger.LogInformation("Processing weather forecast request");

        // Your business logic here
        var forecast = GetWeatherForecast();

        _logger.LogInformation("Weather forecast retrieved for user: {UserId}", userId);

        return Ok(forecast);
    }
}
```

**Program.cs 구성**

```csharp
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Add structured logging with JSON format
builder.Logging.AddJsonConsole(options =>
{
    options.JsonWriterOptions = new JsonWriterOptions
    {
        Indented = true
    };
});

var app = builder.Build();
// ... rest of your application configuration
```

**appsettings.json 구성**

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    },
    "Console": {
      "FormatterName": "json",
      "FormatterOptions": {
        "IncludeScopes": true,
        "TimestampFormat": "yyyy-MM-dd HH:mm:ss "
      }
    }
  }
}
```

이 설정은 Azure App Service Application Settings에서 `DD_LOGS_INJECTION=true`가 설정된 경우 트레이스 상관관계를 자동으로 활성화합니다.

{{% /tab %}}
{{% tab "Java" %}}

Azure App Service에서 Java 애플리케이션 로깅을 구성하려면 [Agent로 직접 로그 스트리밍][1]을 참조하세요.

## [1]: /logs/log_collection/java/ stream-logs-directly-to-the-agent
{{% /tab %}}
{{% tab "Node.js" %}}

Azure App Service에서 Node.js 애플리케이션 로깅을 구성하려면 [Node.js를 사용한 Agentless 로깅][1]을 참조하세요.

[1]: /ko/logs/log_collection/nodejs/#agentless-logging

{{% /tab %}}
{{< /tabs >}}

## 프로그래밍 방식의 관리 {#programmatic-management}

{{< tabs >}}
{{% tab ".NET" %}}

Datadog은 PowerShell을 사용하여 Azure App Service Extension을 업데이트하거나 설치하는 스크립트를 제공합니다. 스크립트 기반 확장 프로그램 관리를 통해 [리소스 그룹별로 확장 프로그램을 일괄 업데이트](#powershell-resource-group)하고 [특정 버전의 사이트 확장 프로그램을 설치하도록 지정](#powershell-specific-version)할 수 있습니다. 또한 스크립트를 사용하여 CI/CD 파이프라인에 확장 프로그램을 프로그래밍 방식으로 추가하고, 이미 설치된 확장 프로그램을 검색하고 업데이트할 수 있습니다.

### 전제 조건 {#prerequisites}

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) 또는 [Azure Cloud Shell](https://docs.microsoft.com/en-us/azure/cloud-shell/overview)
- Azure App Service [사용자 범위 자격 증명](https://docs.microsoft.com/en-us/azure/app-service/deploy-configure-credentials) 아직 자격 증명이 없다면 [Azure 포털](https://portal.azure.com/)로 이동하여 Web App 또는 Function App에 액세스하세요. {{< ui >}}Deployment{{< /ui >}} > {{< ui >}}Deployment Center{{< /ui >}}로 이동하여 사용자 범위 자격 증명을 생성하거나 검색하세요.

### 확장 프로그램 최초 설치 {#powershell-first-time}

설치 스크립트는 Azure Web App 또는 Azure Function App에 최신 버전의 확장 프로그램을 추가합니다. 이는 리소스 그룹 단위가 아닌 앱 단위로 수행됩니다.

1. Azure CLI 또는 Azure Cloud Shell을 엽니다.
2. 다음 명령을 사용하여 설치 스크립트를 다운로드합니다.

    ```
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. 다음 명령을 실행하고 필요에 따라 필수 및 선택 인수를 전달합니다.

    ```
    .\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -DDSite <DATADOG_SITE> -DDEnv <DATADOG_ENV> -DDService <DATADOG_SERVICE> -DDVersion <DATADOG_VERSION> [-SlotName <SLOT_NAME>]
    ```

**참고**: 위 명령을 실행할 때 다음 인수가 필요합니다.

- `<USERNAME>`: Azure 사용자 범위 사용자 이름입니다.
- `<PASSWORD>`: Azure 사용자 범위 암호입니다.
- `<SUBSCRIPTION_ID>`: Azure [구독 ID](https://docs.microsoft.com/en-us/azure/media-services/latest/setup-azure-subscription-how-to)입니다.
- `<RESOURCE_GROUP_NAME>`: Azure 리소스 그룹 이름입니다.
- `<SITE_NAME>`: 앱 이름입니다.
- `<DATADOG_API_KEY>`: [Datadog API 키](https://app.datadoghq.com/organization-settings/api-keys)입니다.

또한 `DATADOG_SITE`를 [Datadog 사이트][32]로 설정하세요. `DATADOG_SITE`의 기본값은 `datadoghq.com`입니다. 현재 사이트는 다음과 같습니다. {{< region-param key="dd_site" code="true" >}}.

기본 앱 대신 배포 슬롯을 대상으로 지정하려면 `-SlotName <SLOT_NAME>`을 추가하세요. Azure Function Apps에서는 확장 프로그램 설치 실패를 방지하기 위해 `WEBSITE_PRIVATE_EXTENSIONS=0` 고정 슬롯 설정도 자동으로 적용됩니다. 자세한 내용은 [Azure Functions .NET APM Extension](/serverless/azure_functions/dotnet_extension/)을 참조하세요.

[32]: /ko/getting_started/site/

### 리소스 그룹의 확장 프로그램 업데이트 {#powershell-resource-group}

업데이트 스크립트는 전체 리소스 그룹에 적용됩니다. 이 스크립트는 확장 프로그램이 설치된 모든 Web App 또는 Function App을 업데이트합니다. Datadog 확장 프로그램이 설치되지 않은 App Service 앱에는 영향을 주지 않습니다.

1. Azure CLI 또는 Azure Cloud Shell을 엽니다.
2. 다음 명령을 실행하여 업데이트 스크립트를 다운로드합니다.

    ```
    $baseUri="https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension"; Invoke-WebRequest -Uri "$baseUri/update-all-site-extensions.ps1" -OutFile "update-all-site-extensions.ps1"; Invoke-WebRequest -Uri "$baseUri/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. 다음 명령을 실행합니다. 모든 인수는 필수입니다.

    ```
    .\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD>
    ```

### 특정 버전의 확장 프로그램 설치 {#powershell-specific-version}

Azure App Service UI에서는 특정 버전의 확장 프로그램을 설치할 수 없습니다. 설치 또는 업데이트 스크립트를 사용하면 특정 버전을 설치할 수 있습니다.

#### 단일 리소스에 특정 버전 설치 {#install-specific-version-on-a-single-resource}

단일 인스턴스에 특정 버전을 설치하려면 [확장 프로그램 최초 설치 지침](#powershell-first-time)을 따르고 설치 명령에 `-ExtensionVersion` 파라미터를 추가합니다.

```
.\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -ExtensionVersion <EXTENSION_VERSION>
```

`<EXTENSION_VERSION>`을 설치하려는 확장 프로그램 버전으로 바꿉니다. 예를 들어, `1.4.0`입니다.

#### 전체 리소스 그룹에 특정 버전 설치 {#install-specific-version-on-an-entire-resource-group}

리소스 그룹에 특정 버전을 설치하려면 [리소스 그룹의 확장 프로그램 업데이트 지침](#powershell-resource-group)을 따르고 설치 명령에 `-ExtensionVersion` 파라미터를 추가합니다.

```
.\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD> -ExtensionVersion <EXTENSION_VERSION>
```

`<EXTENSION_VERSION>`을 설치하려는 확장 프로그램 버전으로 바꿉니다. 예를 들어, `1.4.0`입니다.

### ARM 템플릿 {#arm-template}

많은 조직에서 [Azure Resource Management(ARM) 템플릿](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview)을 사용하여 코드형 인프라 관행을 구현합니다. 이러한 템플릿에 App Service Extension을 포함하려면 [Datadog의 App Service Extension 설치 템플릿](https://github.com/DataDog/datadog-aas-extension/tree/master/install-templates)을 배포에 통합하여 확장 프로그램을 추가하고 App Service 리소스와 함께 구성하세요.

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-danger">Java Web Apps에 대한 지원은 확장 프로그램 v2.4+에서 미리 보기로 제공되고 있습니다. Java 웹 앱에 대한 프로그래밍 방식 관리는 지원되지 않습니다.<br/><br/>
    다른 App Service 리소스 유형이나 런타임에 대한 지원이 필요하신가요? <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">가입</a>하여 미리 보기가 제공되면 알림을 받으세요.</div>

{{% /tab %}}
{{< /tabs >}}

## 프로파일링 {#profiling}

<div class="alert alert-info">
Datadog의 Continuous Profiler는 Windows Azure App Service에서 .NET 및 Node.js에 대해 미리 보기로 제공되고 있습니다.
</div>

[Continuous Profiler][6]를 활성화하려면 환경 변수 `DD_PROFILING_ENABLED=true`를 설정합니다.

## 배포 {#deployment}

{{% aas-workflow-windows %}}

## 문제 해결 {#troubleshooting}

### Serverless 보기에서 앱이 잘못 구성된 것으로 식별되거나 트레이스에 해당하는 메트릭이 누락된 경우 {#if-your-apps-are-identified-as-being-misconfigured-in-the-serverless-view-andor-you-are-missing-corresponding-metrics-for-your-traces}

애플리케이션을 모니터링하도록 Azure 통합이 구성되지 않았을 가능성이 높습니다. 적절하게 구성하면 Datadog 플랫폼에서 메트릭, 트레이스 및 로그를 더 효과적으로 연결할 수 있습니다. Azure 통합이 구성되지 않으면 트레이스에 필요한 중요한 컨텍스트가 누락됩니다. 문제를 해결하려면 다음 단계를 따르세요.

1. Azure 통합 타일로 이동합니다.

2. 애플리케이션이 실행 중인 Azure 구독에 [Azure 통합][3]을 설치했는지 확인합니다.

3. 적용한 App Service 플랜 필터링 규칙에 앱이 실행 중인 App Service 플랜이 포함되어 있는지 확인합니다. App Service 플랜이 포함되지 않으면 해당 플랜에서 호스팅되는 모든 앱과 함수도 제외됩니다. 앱 자체의 태그는 Datadog의 필터링에 사용되지 않습니다.

### APM 트레이스가 Datadog에 나타나지 않을 경우 {#if-apm-traces-are-not-appearing-in-datadog}

1. `DD_SITE` 및 `DD_API_KEY`를 올바르게 설정했는지 확인합니다.

2. 애플리케이션을 완전히 중지했다가 다시 시작합니다.

3. 문제가 해결되지 않으면 확장 프로그램을 제거한 후 다시 설치하세요(이렇게 하면 최신 버전을 실행 중인지도 확인할 수 있습니다).

**참고**: 지원팀과 애플리케이션 오류를 더 빠르게 조사하려면 `DD_TRACE_DEBUG:true`를 설정하고 Datadog 로그 디렉터리(`%AzureAppServiceHomeDirectory%\LogFiles\datadog`)의 내용을 이메일에 첨부하세요.

도움이 더 필요하신가요? [Datadog 지원팀][4]에 문의하세요.

### 트레이스에서 관련 없는 스팬이 표시되는 경우 {#if-you-see-an-unrelated-span-in-a-trace}

App Service 플랜에서 Automatic Scaling이 활성화되어 있고 관련 없는 트레이스가 서로 병합되는 경우 Azure 플랫폼 상태 프로브(`User-Agent: HttpScaleManager`)에 이전 W3C 트레이스 컨텍스트가 포함되어 있을 수 있습니다. 앱을 호출하는 모든 호출자가 Datadog으로 계측된 경우, 영향을 받는 앱에서 `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog`을 설정하여 트레이스 컨텍스트 추출을 Datadog 형식으로 제한하세요. Datadog으로 계측되지 않은 호출자가 있는 앱에서는 이 설정으로 인해 Datadog이 해당 호출자의 W3C 트레이스 컨텍스트를 무시하므로, 해당 요청이 상위 트레이스에 병합되지 않고 별도의 트레이스로 분리됩니다.

### 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/extend/dogstatsd
[2]: /ko/metrics/custom_metrics/
[3]: /ko/integrations/azure/
[4]: /ko/help
[5]: https://app.datadoghq.com/integrations/azure
[6]: /ko/profiler/