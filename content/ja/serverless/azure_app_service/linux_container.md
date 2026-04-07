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
  text: Azure App Service 環境
title: Azure App Service Linux コンテナのインスツルメンテーション
---
## 概要

このページでは、Datadog Agent を使用して、コンテナ化された Linux Azure App Service アプリケーションをインスツルメンテーションする方法について説明します。

この文書では、Azure の [Azure App Service のカスタムコンテナのサイドカーコンテナを構成する][1]チュートリアルに従ってアプリケーションがサイドカー用に設定されていることを前提としています。

サイドカーアプローチを使用しないことを希望する場合 (非推奨)、代わりに [Azure App Service Linux コンテナを `serverlessinit` でインスツルメンテーションする][2]手順を実効してください。

## セットアップ

### Azure インテグレーション

まだインストールしていない場合は、メトリクスとログを収集できるよう [Datadog Azure インテグレーション][3]をインストールしてください。

### アプリケーション

{{< tabs >}}
{{% tab "Node.js" %}}
#### トレーシング
メインアプリケーションを`ddtracejs`ライブラリでインスツルメンテーションします。手順については[Node.js アプリケーションのトレーシング][101]を参照してください。

#### メトリクス
カスタムメトリクスもトレーサーを通じて収集されます。[コード例][102]を参照してください。

#### ログ
Datadog サイドカーはファイルテールを使用してログを収集します。Datadog は、アプリケーションログを `/home/LogFiles/` に書き込むことを推奨しています。このディレクトリは再起動しても保持されるからです。

Datadog に送信される内容をより細かく制御したい場合は、`/home/LogFiles/myapp` のように、サブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテールしないなら、Azure App Service アプリケーションの起動とエラーに関連するログは収集されません。

アプリケーションでログを設定するには、[Node.js のログの収集][103]を参照してください。トレースログの相関を設定するには、[Node.js ログとトレースの相関][104]を参照してください。

[101]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#gettingstarted
[102]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?codelang=nodejs#codeexamples
[103]: /ja/logs/log_collection/nodejs/?tab=winston30
[104]: /ja/tracing/other_telemetry/connect_logs_and_traces/nodejs
{{% /tab %}}
{{% tab "Python" %}}
#### トレーシング
メインアプリケーションを`ddtracepy`ライブラリでインスツルメンテーションします。手順については、[Python アプリケーションのトレーシング][201]を参照してください。

#### メトリクス
カスタムメトリクスもトレーサーを通じて収集されます。[コード例][202]を参照してください。

#### ログ
Datadog サイドカーはファイルテールを使用してログを収集します。Datadog は、アプリケーションログを `/home/LogFiles/` に書き込むことを推奨しています。このディレクトリは再起動しても保持されるからです。

Datadog に送信される内容をより細かく制御したい場合は、`/home/LogFiles/myapp` のように、サブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテールしないなら、Azure App Service アプリケーションの起動とエラーに関連するログは収集されません。

アプリケーションでログを設定するには、[Node.js のログの収集][203]を参照してください。トレースログの相関を設定するには、[Node.js ログとトレースの相関][204]を参照してください。

[201]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[202]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?codelang=python#codeexamples
[203]: /ja/logs/log_collection/python/
[204]: /ja/tracing/other_telemetry/connect_logs_and_traces/python
{{% /tab %}}
{{% tab "Java" %}}
#### トレーシング
メインアプリケーションを`ddtracejava`ライブラリでインスツルメンテーションします。手順については、[Java アプリケーションのトレーシング][301]を参照してください。

#### メトリクス
カスタムメトリクスもトレーサーを通じて収集されます。[コード例][302]を参照してください。

#### ログ
Datadog サイドカーはファイルテールを使用してログを収集します。Datadog は、アプリケーションログを `/home/LogFiles/` に書き込むことを推奨しています。このディレクトリは再起動しても保持されるからです。

Datadog に送信される内容をより細かく制御したい場合は、`/home/LogFiles/myapp` のように、サブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテールしないなら、Azure App Service アプリケーションの起動とエラーに関連するログは収集されません。

アプリケーションでログを設定するには、[Node.js のログの収集][303]を参照してください。トレースログの相関を設定するには、[Node.js ログとトレースの相関][304]を参照してください。

[301]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#gettingstarted
[302]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?codelang=java#codeexamples
[303]: /ja/logs/log_collection/java/?tab=winston30
[304]: /ja/tracing/other_telemetry/connect_logs_and_traces/java
{{% /tab %}}
{{% tab ".NET" %}}
#### トレーシング
メインアプリケーションを `ddtracedotnet` ライブラリをでインスツルメンテーションします。

1. メインアプリケーションの Dockerfile に下記の行を追加してください。これにより、アプリケーションコンテナ内に Datadog トレーサーがインストールおよび構成されます。
   {{< code-block lang="dockerfile" >}}
   RUN mkdir -p /datadog/tracer
   RUN mkdir -p /home/LogFiles/dotnet

   ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v3.30.0/datadog-dotnet-apm-3.30.0.tar.gz /datadog/tracer
   RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-3.30.0.tar.gz
   {{< /code-block >}}

2. イメージをビルドし、コンテナレジストリにプッシュします。

**Dockerfile の完全なサンプル**

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

詳細については、[.NET アプリケーションのトレーシング][401]を参照してください。

#### メトリクス
カスタムメトリクスもトレーサーを通じて収集されます。[コード例][402]を参照してください。

#### ログ
Datadog サイドカーはファイルテールを使用してログを収集します。Datadog は、アプリケーションログを `/home/LogFiles/` に書き込むことを推奨しています。このディレクトリは再起動しても保持されるからです。

Datadog に送信される内容をより細かく制御したい場合は、`/home/LogFiles/myapp` のように、サブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテールしないなら、Azure App Service アプリケーションの起動とエラーに関連するログは収集されません。

アプリケーションでのログ設定については、[C# のログの収集][403]を参照してください。トレースログの相関を設定するには、[.NET のログとトレースの相関][404]を参照してください。

[401]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnetcore
[402]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?codelang=dotnet#codeexamples
[403]: /ja/logs/log_collection/csharp
[404]: /ja/tracing/other_telemetry/connect_logs_and_traces/dotnet

{{% /tab %}}
{{% tab "Go" %}}
#### トレーシング
メインアプリケーションを `ddtracego` ライブラリでインスツルメンテーションします。手順については、[Go アプリケーションのトレーシング][501]を参照してください。

#### メトリクス
カスタムメトリクスもトレーサーを通じて収集されます。[コード例][502]を参照してください。

#### ログ
Datadog サイドカーはファイルテールを使用してログを収集します。Datadog は、アプリケーションログを `/home/LogFiles/` に書き込むことを推奨しています。このディレクトリは再起動しても保持されるからです。

Datadog に送信される内容をより細かく制御したい場合は、`/home/LogFiles/myapp` のように、サブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテールしないなら、Azure App Service アプリケーションの起動とエラーに関連するログは収集されません。

アプリケーションでログを設定するには、[Node.js のログの収集][503]を参照してください。トレースログの相関を設定するには、[Node.js ログとトレースの相関][504]を参照してください。

[501]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[502]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?codelang=go#codeexamples
[503]: /ja/logs/log_collection/go/
[504]: /ja/tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab "PHP" %}}
#### トレーシング
メインアプリケーションを `ddtracephp` ライブラリでインスツルメンテーションします。手順については、[PHP アプリケーションのトレーシング][601]を参照してください。

#### メトリクス
カスタムメトリクスもトレーサーを通じて収集されます。[コード例][602]を参照してください。

#### ログ
Datadog サイドカーはファイルテールを使用してログを収集します。Datadog は、アプリケーションログを `/home/LogFiles/` に書き込むことを推奨しています。このディレクトリは再起動しても保持されるからです。

Datadog に送信される内容をより細かく制御したい場合は、`/home/LogFiles/myapp` のように、サブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテールしないなら、Azure App Service アプリケーションの起動とエラーに関連するログは収集されません。

アプリケーションでログを設定するには、[Node.js のログの収集][603]を参照してください。トレースログの相関を設定するには、[Node.js ログとトレースの相関][604]を参照してください。

[601]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/#gettingstarted
[602]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?codelang=php#codeexamples
[603]: /ja/logs/log_collection/php/
[604]: /ja/tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### インスツルメンテーション

インスツルメンテーションはサイドカーコンテナを使用して行います。このサイドカーコンテナは、メインアプリケーションコンテナからトレース、メトリクス、ログを収集し、Datadog に送信します。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

#### ローカルで

[Datadog CLI][601] をインストールします。

```shell
npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-aas
```

[Azure CLI][602] をインストールし、`az login` で認証します。

次に、サイドカーコンテナを設定するために、下記のコマンドを実行します。

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

Datadog サイトを設定します。 {{< region-param key="dd_site" code="true" >}}デフォルトは `datadoghq.com` です。

**注:** .NET アプリケーションの場合、.NET トレーサーに必要な追加の環境変数を含めるために `dotnet` フラグを追加してください。コンテナが musl libc イメージ (Alpine Linuxなど) で dotnet を使用している場合は、さらに `musl` フラグも追加してください。

`service` や `env` などのほかのフラグも使用して、サービスや環境のタグを設定することができます。オプションの全一覧を表示するには、`datadogci aas instrument help` を実行してください。

#### Azure Cloud Shell

[Azure Cloud Shell][603] で Datadog CLI を使用するには、クラウドシェルを開き、`npx` を使用して CLI を直接実行します。API キーとサイトを `DD_API_KEY` と `DD_SITE` の環境変数に設定してから、下記の CLI を実行します。

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
npx @datadog/datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

[601]: https://github.com/DataDog/datadogci#howtoinstallthecli
[602]: https://learn.microsoft.com/enus/cli/azure/installazurecli
[603]: https://portal.azure.com/#cloudshell/
{{% /tab %}}
{{% tab "Terraform" %}}

<div class="alert alert-danger">Azure Web App for Containers リソースはサイトコンテナを直接サポートしていないため、構成にずれが生じることを予想してください。</div>

[Datadog Terraform module for Linux Web Apps][1] は、必要な環境変数と serverlessinit サイドカーを追加することで、[azurerm_linux_web_app][2] リソースをラップし、Datadog Serverless Monitoring 用に Web App を自動的に設定します。

まだ Terraform を設定していない場合は、[Terraform をインストール][3]し、新しいディレクトリを作成し、`main.tf` というファイルを作成してください。

次に、必要に応じて変更しながら、Terraform 構成に下記を追加します。

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

最後に、`terraform apply` を実行し、表示されるプロンプトがあればそれに従ってください。

[Datadog Linux Web App モジュール][1]は、Web App リソースのみをデプロイするため、コンテナを別途ビルドしてプッシュする必要があります。

[1]: https://registry.terraform.io/modules/DataDog/webappdatadog/azurerm/latest/submodules/linux
[2]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app
[3]: https://developer.hashicorp.com/terraform/install

{{% /tab %}}
{{% tab "Bicep" %}}

コンテナ用の Web Apps でサイドカーを使用するには、`kind` を `app,linux,container` に設定した状態で、`SITECONTAINERS` linuxFxVersion を使用する必要があります。既存の Web App を更新して、下記のように、必要な Datadog アプリ設定とサイドカーを含めてください。

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

すべての環境変数の説明については、[手動タブ](?tab=manual#instrumentation)をご覧ください。


{{% /tab %}}
{{% tab "ARM テンプレート" %}}

既存の Web App を更新して、下記のように、必要な Datadog アプリ設定とサイドカーを含めてください。

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

すべての環境変数の説明については、[手動タブ](?tab=manual#instrumentation)をご覧ください。

{{% /tab %}}
{{% tab "手動" %}}

#### サイドカーコンテナ

1. Azure Portal で、[**Deployment Center**] に移動し、[**Add**] を選択します。
2. [**Edit container**] フォームで、下記を入力してください。
    **Image source**: Docker Hub またはほかのレジストリ
    **Image type**: パブリック
    **Registry server URL**: `index.docker.io`
    **Image and tag**: `datadog/serverlessinit:latest`
    **ポート**: 8126
3. [**Apply**] を選択します。

#### アプリケーション設定

Azure の [**App settings**] で、メインコンテナとサイドカーコンテナの両方に下記の環境変数を設定します。または、メインコンテナにこれらの変数を設定し、[**Allow access to all app settings**] オプションを有効にします。

{{< img src="serverless/azure_app_service/app_settings.png" alt="Azure の環境変数セクション。[Allow access to all app settings] オプションがチェックボックスで有効になっています。" >}}

 `DD_API_KEY`: [Datadog API キー][701]
 `DD_SERVICE`: サービスにタグを付ける方法。例: `sidecarazure`。
 `DD_ENV`: 環境にタグを付ける方法。例: `prod`
 `WEBSITES_ENABLE_APP_SERVICE_STORAGE`: `true`。この環境変数を設定すると、`/home/` マウントが持続し、サイドカーと共有されます。
`DD_SERVERLESS_LOG_PATH`: ログを書き込む場所。例: `/home/LogFiles/*.log` または `/home/LogFiles/myapp/*.log`
 `DD_AAS_INSTANCE_LOGGING_ENABLED`: `true` の場合、ログ収集が追加のファイルパス `/home/LogFiles/*$COMPUTERNAME*.log` に対して自動的に設定されます。
 `DD_AAS_INSTANCE_LOG_FILE_DESCRIPTOR`: より正確なファイルテーリングに使用するオプションのファイルディスクリプタ。頻繁なログローテーションがあるシナリオに推奨されます。たとえば、`_default_docker` を設定すると、ログテイラーがローテーションされたファイルを無視し、Azure のアクティブなログファイルのみに集中するよう設定されます。


   <div class="alert alert-info">アプリケーションに複数のインスタンスがある場合、アプリケーションのログファイル名に <code>$COMPUTERNAME</code> 変数が含まれていることを確認してください。これにより、ログテーリングが同じファイルを読み取る複数のインスタンスから重複したログが作成されないようになります。</div>

<details open>
<summary>
<h4>.NET アプリケーション: 追加の必須環境変数</h4>
</summary>

.NET アプリケーションのモニタリングを設定する場合、次の**必須**の環境変数を設定してください。

| 変数名 | 値 |
|  |  |
| `DD_DOTNET_TRACER_HOME` | `/datadog/tracer` |
| `CORECLR_ENABLE_PROFILING` | `1` |
| `CORECLR_PROFILER` | `{846F5F1CF9AE4B07969E05C26BC060D8}` |
| `CORECLR_PROFILER_PATH` | `/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so` |
</details>

[701]: https://app.datadoghq.com/organizationsettings/apikeys
{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

## プロファイリング

<div class="alert alert-info">
Datadog の Continuous Profiler は、Linux Azure App Service の Python および Node.js 用プレビューで利用可能です。
</div>

[Continuous Profiler][4] を有効にするには、アプリケーションコンテナで環境変数 `DD_PROFILING_ENABLED=true` を設定してください。

## サンプルアプリケーション
次のサンプルには、トレース、メトリクス、ログがセットアップされた 1 つのアプリが含まれています。

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

[1]: https://learn.microsoft.com/ja-jp/azure/appservice/tutorialcustomcontainersidecar
[2]: /ja/serverless/guide/azure_app_service_linux_containers_serverless_init
[3]: https://app.datadoghq.com/integrations/azure
[4]: /ja/profiler/