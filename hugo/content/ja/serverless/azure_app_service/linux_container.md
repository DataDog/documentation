---
aliases:
- /ja/serverless/guide/azure_app_service_linux_sidecar
- /ja/serverless/azure_app_services/azure_app_services_container
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentation
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentation
  text: Azure App Service Environment
title: Azure App Service のインスツルメンテーション - Linux コンテナ
---
## 概要 {#overview}

このページでは、Datadog Agent を使用して、コンテナ化された Linux Azure App Service アプリケーションをインスツルメンテーションする方法について説明します。

このドキュメントは、Azure のチュートリアル [Azure App Service でカスタム コンテナーのサイドカー コンテナーを構成する][1]に従って、アプリケーションがサイドカー用にセットアップされていることを前提としています。

サイドカー方式を使用しない場合 (非推奨)、代わりに [`serverless-init` による Azure App Service のインスツルメンテーション - Linux コンテナ][2]の手順に従うことができます。

## セットアップ {#setup}

### Azure インテグレーション {#azure-integration}

[Datadog-Azure インテグレーション][3]をまだインストールしていない場合はインストールし、メトリクスとログを収集します。

### アプリケーション {#application}

{{< tabs >}}
{{% tab "Node.js" %}}
#### トレース {#tracing}
`dd-trace-js` ライブラリを使用してメインアプリケーションをインスツルメンテーションします。手順については、[Node.js アプリケーションのトレース][101]を参照してください。

#### メトリクス {#metrics}
カスタムメトリクスもトレーサーを通じて収集されます。[コード例][102]を参照してください。

#### ログ {#logs}
Datadog サイドカーは、ファイルテーリングを使用してログを収集します。Datadog ではアプリケーションログを `/home/LogFiles/` に書き込むことをお勧めします。このディレクトリは再起動後も保持されるからです。

Datadog に送信する内容をより細かく制御したい場合は、`/home/LogFiles/myapp` などのサブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテールしない場合、起動やエラーに関連する Azure App Service アプリケーションログは収集されません。

アプリケーションでログ収集をセットアップするには、[Node.js ログ収集][103]を参照してください。トレースとログの相関をセットアップするには、[Node.js のログとトレースの相関][104]を参照してください。

[101]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[102]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs#code-examples
[103]: /ja/logs/log_collection/nodejs/?tab=winston30
[104]: /ja/tracing/other_telemetry/connect_logs_and_traces/nodejs
{{% /tab %}}
{{% tab "Python" %}}
#### トレース {#tracing-1}
`dd-trace-py` ライブラリを使用してメインアプリケーションをインスツルメンテーションします。手順については、[Python アプリケーションのトレース][201]を参照してください。

#### メトリクス {#metrics-1}
カスタムメトリクスもトレーサーを通じて収集されます。[コード例][202]を参照してください。

#### ログ {#logs-1}
Datadog サイドカーは、ファイルテーリングを使用してログを収集します。Datadog ではアプリケーションログを `/home/LogFiles/` に書き込むことをお勧めします。このディレクトリは再起動後も保持されるからです。

Datadog に送信する内容をより細かく制御したい場合は、`/home/LogFiles/myapp` などのサブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテールしない場合、起動やエラーに関連する Azure App Service アプリケーションログは収集されません。

アプリケーションでログ収集をセットアップするには、[Node.js ログ収集][203]を参照してください。トレースとログの相関をセットアップするには、[Node.js のログとトレースの相関][204]を参照してください。

[201]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[202]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=python#code-examples
[203]: /ja/logs/log_collection/python/
[204]: /ja/tracing/other_telemetry/connect_logs_and_traces/python
{{% /tab %}}
{{% tab "Java" %}}
#### トレース {#tracing-2}
`dd-trace-java` ライブラリを使用してメインアプリケーションをインスツルメンテーションします。手順については、[Java アプリケーションのトレース][301]を参照してください。

#### メトリクス {#metrics-2}
カスタムメトリクスもトレーサーを通じて収集されます。[コード例][302]を参照してください。

#### ログ {#logs-2}
Datadog サイドカーは、ファイルテーリングを使用してログを収集します。Datadog ではアプリケーションログを `/home/LogFiles/` に書き込むことをお勧めします。このディレクトリは再起動後も保持されるからです。

Datadog に送信する内容をより細かく制御したい場合は、`/home/LogFiles/myapp` などのサブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテールしない場合、起動やエラーに関連する Azure App Service アプリケーションログは収集されません。

アプリケーションでログ収集をセットアップするには、[Node.js ログ収集][303]を参照してください。トレースとログの相関をセットアップするには、[Node.js のログとトレースの相関][304]を参照してください。

[301]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[302]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=java#code-examples
[303]: /ja/logs/log_collection/java/?tab=winston30
[304]: /ja/tracing/other_telemetry/connect_logs_and_traces/java
{{% /tab %}}
{{% tab ".NET" %}}
#### トレース {#tracing-3}
`dd-trace-dotnet` ライブラリを使用してメインアプリケーションをインスツルメンテーションします。

1.メインアプリケーションの Dockerfile に次の行を追加します。これにより、アプリケーションコンテナ内に Datadog トレーサーがインストールされて構成されます。
   {{< code-block lang="dockerfile" >}}
   RUN mkdir -p /datadog/tracer
   RUN mkdir -p /home/LogFiles/dotnet

   ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v3.30.0/datadog-dotnet-apm-3.30.0.tar.gz /datadog/tracer
   RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-3.30.0.tar.gz
   {{< /code-block >}}

2. イメージをビルドし、任意のコンテナレジストリにプッシュします。

**Dockerfile の完全な例**

{{< highlight dockerfile "hl_lines=22-27" >}}
# Stage 1: Build the application HEADANCHOR:stage-1-build-the-application:ENDANCHOR
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the project file and restore dependencies HEADANCHOR:copy-the-project-file-and-restore-dependencies:ENDANCHOR
COPY *.csproj ./
RUN dotnet restore

# Copy the remaining source code HEADANCHOR:copy-the-remaining-source-code:ENDANCHOR
COPY . .

# Build the application HEADANCHOR:build-the-application:ENDANCHOR
RUN dotnet publish -c Release -o out

# Stage 2: Create a runtime image HEADANCHOR:stage-2-create-a-runtime-image:ENDANCHOR
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the build output from stage 1 HEADANCHOR:copy-the-build-output-from-stage-1:ENDANCHOR
COPY --from=build /app/out ./

# Datadog specific HEADANCHOR:datadog-specific:ENDANCHOR
RUN mkdir -p /datadog/tracer
RUN mkdir -p /home/LogFiles/dotnet

ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v3.30.0/datadog-dotnet-apm-3.30.0.tar.gz /datadog/tracer
RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-3.30.0.tar.gz

# Set the entry point for the application HEADANCHOR:set-the-entry-point-for-the-application:ENDANCHOR
ENTRYPOINT ["dotnet", "<your dotnet app>.dll"]
{{< /highlight >}}

詳細については、[.NET アプリケーションのトレース][401]を参照してください。

#### メトリクス {#metrics-3}
カスタムメトリクスもトレーサーを通じて収集されます。[コード例][402]を参照してください。

#### ログ {#logs-3}
Datadog サイドカーは、ファイルテーリングを使用してログを収集します。Datadog ではアプリケーションログを `/home/LogFiles/` に書き込むことをお勧めします。このディレクトリは再起動後も保持されるからです。

Datadog に送信する内容をより細かく制御したい場合は、`/home/LogFiles/myapp` などのサブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテールしない場合、起動やエラーに関連する Azure App Service アプリケーションログは収集されません。

アプリケーションでログ収集をセットアップするには、[C# ログ収集][403]を参照してください。トレースとログの相関をセットアップするには、[.NET のログとトレースの相関][404]を参照してください。

[401]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[402]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=dotnet#code-examples
[403]: /ja/logs/log_collection/csharp
[404]: /ja/tracing/other_telemetry/connect_logs_and_traces/dotnet

{{% /tab %}}
{{% tab "Go" %}}
#### トレース {#tracing-4}
`dd-trace-go` ライブラリを使用してメインアプリケーションをインスツルメンテーションします。手順については、[Go アプリケーションのトレース][501]を参照してください。

#### メトリクス {#metrics-4}
カスタムメトリクスもトレーサーを通じて収集されます。[コード例][502]を参照してください。

#### ログ {#logs-4}
Datadog サイドカーは、ファイルテーリングを使用してログを収集します。Datadog ではアプリケーションログを `/home/LogFiles/` に書き込むことをお勧めします。このディレクトリは再起動後も保持されるからです。

Datadog に送信する内容をより細かく制御したい場合は、`/home/LogFiles/myapp` などのサブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテールしない場合、起動やエラーに関連する Azure App Service アプリケーションログは収集されません。

アプリケーションでログ収集をセットアップするには、[Node.js ログ収集][503]を参照してください。トレースとログの相関をセットアップするには、[Node.js のログとトレースの相関][504]を参照してください。

[501]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[502]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=go#code-examples
[503]: /ja/logs/log_collection/go/
[504]: /ja/tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab "PHP" %}}
#### トレース {#tracing-5}
`dd-trace-php` ライブラリを使用してメインアプリケーションをインスツルメンテーションします。手順については、[PHP アプリケーションのトレース][601]を参照してください。

#### メトリクス {#metrics-5}
カスタムメトリクスもトレーサーを通じて収集されます。[コード例][602]を参照してください。

#### ログ {#logs-5}
Datadog サイドカーは、ファイルテーリングを使用してログを収集します。Datadog ではアプリケーションログを `/home/LogFiles/` に書き込むことをお勧めします。このディレクトリは再起動後も保持されるからです。

Datadog に送信する内容をより細かく制御したい場合は、`/home/LogFiles/myapp` などのサブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテールしない場合、起動やエラーに関連する Azure App Service アプリケーションログは収集されません。

アプリケーションでログ収集をセットアップするには、[Node.js ログ収集][603]を参照してください。トレースとログの相関をセットアップするには、[Node.js のログとトレースの相関][604]を参照してください。

[601]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/#getting-started
[602]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=php#code-examples
[603]: /ja/logs/log_collection/php/
[604]: /ja/tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### インスツルメンテーション {#instrumentation}

インスツルメンテーションは、サイドカーコンテナを使用して行われます。このサイドカーコンテナは、メインアプリケーションコンテナからトレース、メトリクス、ログを収集し、Datadog に送信します。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

#### ローカル {#locally}

[Datadog CLI][601] をインストールします

```shell
npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-aas
```

[Azure CLI][602] をインストールし、`az login` で認証します。

次に、以下のコマンドを実行してサイドカーコンテナをセットアップします。

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

Datadog サイトを {{< region-param key="dd_site" code="true" >}}に設定します。デフォルトは `datadoghq.com` です。

**注:** .NET アプリケーションの場合は、`--dotnet` フラグを追加して .NET トレーサーに必要な追加の環境変数を含めます。また、コンテナが musl libc イメージ (Alpine Linux など) で dotnet を使用している場合は、さらに `--musl` フラグを追加します。

`--service` や `--env` などの追加フラグを使用して、サービスおよび環境のタグを設定できます。オプションの完全なリストについては、`datadog-ci aas instrument --help` を実行してください。

#### Azure Cloud Shell {#azure-cloud-shell}

[Azure Cloud Shell][603] で Datadog CLI を使用するには、Cloud Shell を開き、`npx` を使用して CLI を直接実行します。`DD_API_KEY` および `DD_SITE` 環境変数に API キーとサイトを設定し、CLI を実行します。

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

<div class="alert alert-danger">Azure Web App for Containers リソースは sitecontainers を直接サポートしていないため、構成にドリフトが発生することを想定しておく必要があります。</div>

[Datadog Terraform module for Linux Web Apps][1] は [azurerm_linux_web_app][2] リソースをラップし、必要な環境変数と serverless-init サイドカーを追加することで、Datadog Serverless Monitoring 用に Web App を自動的に構成します。

Terraform をまだセットアップしていない場合は、[Terraform をインストール][3]し、新しいディレクトリを作成して、`main.tf` という名前のファイルを作成します。

次に、次のものを Terraform 構成に追加し、必要に応じて更新します。

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

最後に、`terraform apply` を実行し、プロンプトに従います。

[Datadog Linux Web App モジュール][1]は Web App リソースのみをデプロイするため、コンテナのビルドとプッシュは別途行う必要があります。

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[2]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app
[3]: https://developer.hashicorp.com/terraform/install

{{% /tab %}}
{{% tab "Bicep" %}}

Web Apps for Containers でサイドカーを使用するには、`kind` を `app,linux,container` に設定した `SITECONTAINERS` linuxFxVersion を使用する必要があります。既存の Web App を更新して、次のように必要な Datadog アプリ設定とサイドカーを含めます。

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

更新したテンプレートを再デプロイします。

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

すべての環境変数の説明については、[手動タブ](?tab=manual#instrumentation)を参照してください。


{{% /tab %}}
{{% tab "ARM テンプレート" %}}

既存の Web App を更新して、次のように必要な Datadog アプリ設定とサイドカーを含めます。

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

更新したテンプレートを再デプロイします。

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

すべての環境変数の説明については、[手動タブ](?tab=manual#instrumentation)を参照してください。

{{% /tab %}}
{{% tab "手動" %}}

#### サイドカーコンテナ {#sidecar-container}

1. Azure Portal で **[Deployment Center]** (デプロイ センター) に移動し、**[Add]** (追加) を選択します。
2.**[Edit container]** (コンテナーの編集) フォームで、次のように入力します。
   - **[Image source]** (イメージ ソース): Docker Hub またはその他のレジストリ
   - **[Image type]** (イメージの種類): [Public] (パブリック)
   - **[Registry server URL]** (レジストリ サーバーの URL): `index.docker.io`
   - **[Image and tag]** (イメージとタグ): `datadog/serverless-init:latest`
   - **[Port]** (ポート): 8126
3. [**Apply**] (適用) を選択します。

#### アプリケーション設定 {#application-settings}

Azure の [**App settings**] (アプリ設定) で、メインコンテナとサイドカーコンテナの両方に次の環境変数を設定します。または、メインコンテナにこれらの変数を設定し、[**Allow access to all app settings**] (すべてのアプリ設定へのアクセスを許可する) オプションを有効にします。

{{< img src="serverless/azure_app_service/app_settings.png" alt="Azure の [Environment Variables] (環境変数) セクション。[Allow access to all app settings] オプションがチェックボックスで有効になっている。" >}}

- `DD_API_KEY`: [Datadog API キー][701]
- `DD_SERVICE`: サービスに付けるタグ。例: `sidecar-azure`
- `DD_ENV`: 環境に付けるタグ。例: `prod`
- `WEBSITES_ENABLE_APP_SERVICE_STORAGE`: `true`。この環境変数を設定することで、`/home/` マウントを永続化し、サイドカーと共有できるようになります。
- `DD_SERVERLESS_LOG_PATH`: ログの書き込み先。例: `/home/LogFiles/*.log` または `/home/LogFiles/myapp/*.log`
- `DD_AAS_INSTANCE_LOGGING_ENABLED`: `true` の場合、ログ収集は追加のファイルパス `/home/LogFiles/*$COMPUTERNAME*.log` に対して自動的に構成されます。
- `DD_AAS_INSTANCE_LOG_FILE_DESCRIPTOR`: より正確なファイルテーリングに使用されるオプションのファイル記述子。ログローテーションが頻繁に発生するシナリオで推奨されます。たとえば、`_default_docker` を設定すると、ログテーラーはローテーションされたファイルを無視し、Azure のアクティブなログファイルのみに注目するように構成されます。


   <div class="alert alert-info">アプリケーションに複数のインスタンスがある場合は、アプリケーションのログファイル名に <code>$COMPUTERNAME</code> 変数が含まれていることを確認してください。これにより、ログテーリングは、複数のインスタンスが同じファイルを読み取ることで生じる重複したログを作成しないようになります。</div>

<details open>
<summary>
<h4>.NET アプリケーションの場合: 追加の必須環境変数</h4>
</summary>

.NET アプリケーションのモニタリングをセットアップする場合は、次の**必須**環境変数を構成してください。

|変数名 | 値 |
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

### デプロイスロット {#deployment-slots}

<div class="alert alert-info">デプロイスロットのインスツルメンテーションはプレビュー版です。プレビュー期間中、スロットからのテレメトリーはメインの Web アプリの下に表示されます。スロットと本番環境のテレメトリーを区別するには、各スロットに個別の値を指定して <a href="/getting_started/tagging/unified_service_tagging/">unified service tagging</a> を構成してください。</div>

{{% collapse-content title="デプロイスロットのインスツルメンテーション" level="h4" %}}

メインの Web アプリではなく [デプロイスロット][901]をインスツルメンテーションするには、次のいずれかの方法を使用します。

[901]: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots

{{< tabs >}}
{{% tab "Datadog CLI" %}}

[Datadog CLI][1] (v5.9.0 以降) を使用して、`--slot` フラグを追加します。`--env` を使用して、スロットに個別の環境タグを設定します。

```shell
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name> --slot <slot-name> --env <slot-env>
```

または、`--resource-id` フラグを使用して完全なスロットリソース ID を指定します。

```shell
datadog-ci aas instrument --resource-id /subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Web/sites/<app-name>/slots/<slot-name> --env <slot-env>
```

[1]: https://github.com/DataDog/datadog-ci#how-to-install-the-cli

{{% /tab %}}
{{% tab "Terraform" %}}

[Datadog Linux Web App Slot モジュール][1]を使用します。

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

`terraform apply` を実行し、プロンプトに従います。

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux-slot

{{% /tab %}}
{{% tab "Bicep" %}}

メインの Web アプリではなくデプロイスロットをターゲットにするようにテンプレートを更新します。

```bicep
param webAppName string
param slotName string

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

更新したテンプレートを再デプロイします。

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

{{% /tab %}}
{{% tab "ARM テンプレート" %}}

メインの Web アプリではなくデプロイスロットをターゲットにするようにテンプレートを更新します。

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
    }
  }
}
```

更新したテンプレートを再デプロイします。

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## プロファイリング {#profiling}

<div class="alert alert-info">
Datadog の Continuous Profiler は、Linux Azure App Service 上の Python および Node.js でプレビュー版として利用可能です。
</div>

[Continuous Profiler][4] を有効にするには、アプリケーションコンテナで環境変数 `DD_PROFILING_ENABLED=true` を設定します。

## アプリケーションの例 {#example-application}
次の例には、トレース、メトリクス、ログがセットアップされた単一のアプリが含まれています。

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
[2]: /ja/serverless/guide/azure_app_service_linux_containers_serverless_init
[3]: https://app.datadoghq.com/integrations/azure
[4]: /ja/profiler/