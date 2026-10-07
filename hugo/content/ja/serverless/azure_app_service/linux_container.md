---
aliases:
- /ja/serverless/guide/azure_app_service_linux_sidecar
- /ja/serverless/azure_app_services/azure_app_services_container
further_reading:
- link: /integrations/azure_app_services/
  tag: ドキュメント
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: ドキュメント
  text: Azure App Service 環境
title: Azure App Service - Linux コンテナをインスツルメントする
---
## 概要 {#overview}

このページでは、Datadog Agent を使用して、コンテナ化された Linux Azure App Service アプリケーションをインスツルメンテーションする方法について説明します。

この文書では、Azure の [Azure App Service のカスタムコンテナのサイドカーコンテナを構成する][1]チュートリアルに従ってアプリケーションがサイドカー用に設定されていることを前提としています。

サイドカーアプローチを使用しない場合 (非推奨) は、代わりに [`serverless-init` を使って Azure App Service - Linux コンテナをインスツルメントする][2]手順に従ってください。

## セットアップ {#setup}

### Azure インテグレーション {#azure-integration}

まだ [Datadog-Azure インテグレーション][3] をインストールしていない場合は、メトリクスとログを収集するためにインストールしてください。

### アプリケーション {#application}

{{< tabs >}}
{{% tab "Node.js" %}}
#### トレーシング {#tracing}
メインアプリケーションを `dd-trace-js` ライブラリでインスツルメントします。手順については、[Node.js アプリケーションのトレーシング][101]を参照してください。

#### メトリクス {#metrics}
カスタムメトリクスも SDK を通じて収集されます。[コード例][102]を参照してください。

#### ログ {#logs}
Datadog サイドカーはファイルテールを使用してログを収集します。Datadog は、アプリケーションログを `/home/LogFiles/` に書き込むことを推奨しています。このディレクトリは再起動後も保持されるためです。

Datadog に送信する内容をより細かく制御したい場合は、`/home/LogFiles/myapp` のようなサブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテーリングしない場合、Azure App Service の起動やエラーに関連するアプリケーションログは収集されません。

アプリケーションでログを設定するには、[Node.js のログの収集][103]を参照してください。トレースログの相関を設定するには、[Node.js ログとトレースの相関][104]を参照してください。

[101]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[102]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs#code-examples
[103]: /ja/logs/log_collection/nodejs/?tab=winston30
[104]: /ja/tracing/other_telemetry/connect_logs_and_traces/nodejs
{{% /tab %}}
{{% tab "Python" %}}
#### トレーシング {#tracing-1}
メインアプリケーションを `dd-trace-py` ライブラリでインスツルメントします。手順については、[Python アプリケーションのトレーシング][201]を参照してください。

#### メトリクス {#metrics-1}
カスタムメトリクスも SDK を通じて収集されます。[コード例][202]を参照してください。

#### ログ {#logs-1}
Datadog サイドカーはファイルテールを使用してログを収集します。Datadog は、アプリケーションログを `/home/LogFiles/` に書き込むことを推奨しています。このディレクトリは再起動後も保持されるためです。

Datadog に送信する内容をより細かく制御したい場合は、`/home/LogFiles/myapp` のようなサブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテーリングしない場合、Azure App Service の起動やエラーに関連するアプリケーションログは収集されません。

アプリケーションでログを設定するには、[Node.js のログの収集][203]を参照してください。トレースログの相関を設定するには、[Node.js ログとトレースの相関][204]を参照してください。

[201]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[202]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=python#code-examples
[203]: /ja/logs/log_collection/python/
[204]: /ja/tracing/other_telemetry/connect_logs_and_traces/python
{{% /tab %}}
{{% tab "Java" %}}
#### トレーシング {#tracing-2}
メインアプリケーションを `dd-trace-java` ライブラリでインスツルメントします。手順については、[Java アプリケーションのトレーシング][301]を参照してください。

#### メトリクス {#metrics-2}
カスタムメトリクスも SDK を通じて収集されます。[コード例][302]を参照してください。

#### ログ {#logs-2}
Datadog サイドカーはファイルテールを使用してログを収集します。Datadog は、アプリケーションログを `/home/LogFiles/` に書き込むことを推奨しています。このディレクトリは再起動後も保持されるためです。

Datadog に送信する内容をより細かく制御したい場合は、`/home/LogFiles/myapp` のようなサブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテーリングしない場合、Azure App Service の起動やエラーに関連するアプリケーションログは収集されません。

アプリケーションでログを設定するには、[Node.js のログの収集][303]を参照してください。トレースログの相関を設定するには、[Node.js ログとトレースの相関][304]を参照してください。

[301]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[302]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=java#code-examples
[303]: /ja/logs/log_collection/java/?tab=winston30
[304]: /ja/tracing/other_telemetry/connect_logs_and_traces/java
{{% /tab %}}
{{% tab ".NET" %}}
#### トレーシング {#tracing-3}
メインアプリケーションを `dd-trace-dotnet` ライブラリでインスツルメントします。

1. メインアプリケーションの Dockerfile に以下の行を追加してください。これにより、アプリケーションコンテナ内に Datadog SDK がインストールされ、構成されます。
   {{< code-block lang="dockerfile" >}}
   RUN mkdir -p /datadog/tracer
   RUN mkdir -p /home/LogFiles/dotnet

   ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v3.30.0/datadog-dotnet-apm-3.30.0.tar.gz /datadog/tracer
   RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-3.30.0.tar.gz
   {{< /code-block >}}

2. イメージをビルドし、任意のコンテナレジストリにプッシュします。

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

#### メトリクス {#metrics-3}
カスタムメトリクスも SDK を通じて収集されます。[コード例][402]を参照してください。

#### ログ {#logs-3}
Datadog サイドカーはファイルテールを使用してログを収集します。Datadog は、アプリケーションログを `/home/LogFiles/` に書き込むことを推奨しています。このディレクトリは再起動後も保持されるためです。

Datadog に送信する内容をより細かく制御したい場合は、`/home/LogFiles/myapp` のようなサブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテーリングしない場合、Azure App Service の起動やエラーに関連するアプリケーションログは収集されません。

アプリケーションでのログ設定については、[C# のログの収集][403]を参照してください。トレースログの相関を設定するには、[.NET のログとトレースの相関][404]を参照してください。

[401]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[402]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=dotnet#code-examples
[403]: /ja/logs/log_collection/csharp
[404]: /ja/tracing/other_telemetry/connect_logs_and_traces/dotnet

{{% /tab %}}
{{% tab "Go" %}}
#### トレーシング {#tracing-4}
メインアプリケーションを `dd-trace-go` ライブラリでインスツルメントします。手順については、[Go アプリケーションのトレーシング][501]を参照してください。

#### メトリクス {#metrics-4}
カスタムメトリクスも SDK を通じて収集されます。[コード例][502]を参照してください。

#### ログ {#logs-4}
Datadog サイドカーはファイルテールを使用してログを収集します。Datadog は、アプリケーションログを `/home/LogFiles/` に書き込むことを推奨しています。このディレクトリは再起動後も保持されるためです。

Datadog に送信する内容をより細かく制御したい場合は、`/home/LogFiles/myapp` のようなサブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテーリングしない場合、Azure App Service の起動やエラーに関連するアプリケーションログは収集されません。

アプリケーションでログを設定するには、[Node.js のログの収集][503]を参照してください。トレースログの相関を設定するには、[Node.js ログとトレースの相関][504]を参照してください。

[501]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[502]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=go#code-examples
[503]: /ja/logs/log_collection/go/
[504]: /ja/tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab "PHP" %}}
#### トレーシング {#tracing-5}
メインアプリケーションを `dd-trace-php` ライブラリでインスツルメントします。手順については、[PHP アプリケーションのトレーシング][601]を参照してください。

#### メトリクス {#metrics-5}
カスタムメトリクスも SDK を通じて収集されます。[コード例][602]を参照してください。

#### ログ {#logs-5}
Datadog サイドカーはファイルテールを使用してログを収集します。Datadog は、アプリケーションログを `/home/LogFiles/` に書き込むことを推奨しています。このディレクトリは再起動後も保持されるためです。

Datadog に送信する内容をより細かく制御したい場合は、`/home/LogFiles/myapp` のようなサブディレクトリを作成することもできます。ただし、`/home/LogFiles` 内のすべてのログファイルをテーリングしない場合、Azure App Service の起動やエラーに関連するアプリケーションログは収集されません。

アプリケーションでログを設定するには、[Node.js のログの収集][603]を参照してください。トレースログの相関を設定するには、[Node.js ログとトレースの相関][604]を参照してください。

[601]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/#getting-started
[602]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=php#code-examples
[603]: /ja/logs/log_collection/php/
[604]: /ja/tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### インスツルメンテーション {#instrumentation}

インスツルメンテーションはサイドカーコンテナを使用して行います。このサイドカーコンテナは、メインアプリケーションコンテナからトレース、拡張メトリクス、カスタムメトリクス、ログを収集し、Datadog に送信します。[拡張メトリクス][5]は `azure.app_services.enhanced.*` 名前空間によって区別されます。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

#### ローカル {#locally}

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

Datadog サイトを設定します。 {{< region-param key="dd_site" code="true" >}}です。デフォルトは `datadoghq.com` です。

**注:** .NET アプリケーションの場合、`--dotnet` フラグを追加して .NET トレーサーに必要な追加の環境変数を含め、コンテナが musl libc イメージ (Alpine Linux など) で dotnet を使用している場合は、さらに `--musl` フラグも追加してください。

`--service` や `--env` などの他のフラグも使用して、サービスや環境のタグを設定することができます。すべてのオプションのリストを表示するには、`datadog-ci aas instrument --help` を実行してください。

`datadog-ci aas instrument`は、インスツルメンテーションを設定するために一度だけ実行する必要があります。コードをデプロイするたびに再実行する必要はありません。Datadog の構成を変更する場合にのみ再実行してください。

#### Azure Cloud Shell {#azure-cloud-shell}

[Azure Cloud Shell][603] で Datadog CLI を使用するには、Cloud Shell を開き、`npx` を使用して CLI を直接実行します。`DD_API_KEY` と `DD_SITE` の環境変数に API キーとサイトを設定してから、CLI を実行します。

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

<div class="alert alert-danger">Azure Web App for Containers リソースはサイトコンテナを直接サポートしていないため、構成にずれが生じることを予想してください。</div>

[Datadog Terraform module for Linux Web Apps][1] は、必要な環境変数と serverlessinit サイドカーを追加することで、[azurerm_linux_web_app][2] リソースをラップし、Datadog Serverless Monitoring 用に Web App を自動的に設定します。

まだ Terraform を設定していない場合は、[Terraform をインストール][3] し、新しいディレクトリを作成し、`main.tf` というファイルを作成してください。

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

最後に `terraform apply` を実行し、プロンプトに従って操作します。

[Datadog Linux Web App モジュール][1]は、Web App リソースのみをデプロイするため、コンテナを別途ビルドしてプッシュする必要があります。

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[2]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app
[3]: https://developer.hashicorp.com/terraform/install

{{% /tab %}}
{{% tab "Bicep" %}}

Web Apps for Containers でサイドカーを使用するには、`SITECONTAINERS` linuxFxVersion を使用し、`kind` を `app,linux,container` に設定する必要があります。既存の Web App を更新して、下記のように、必要な Datadog アプリ設定とサイドカーを含めてください。

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

すべての環境変数の説明については、[{{< ui >}}Manual{{< /ui >}} タブ](?tab=manual#instrumentation)を参照してください。


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

すべての環境変数の説明については、[{{< ui >}}Manual{{< /ui >}} タブ](?tab=manual#instrumentation)を参照してください。

{{% /tab %}}
{{% tab "手動" %}}

#### サイドカーコンテナ {#sidecar-container}

1. Azure Portal で {{< ui >}}Deployment Center{{< /ui >}} に移動し、{{< ui >}}Add{{< /ui >}} を選択します。
2. {{< ui >}}Edit container{{< /ui >}} フォームで、以下を指定します。
   - {{< ui >}}Image source{{< /ui >}}: Docker Hub またはその他のレジストリ
   - {{< ui >}}Image type{{< /ui >}} (イメージタイプ): Public (公開)
   - {{< ui >}}Registry server URL{{< /ui >}}: `index.docker.io`
   - {{< ui >}}Image and tag{{< /ui >}}: `datadog/serverless-init:latest`
   - {{< ui >}}Port{{< /ui >}}: 8126
   - [{{< ui >}}Environment variables{{< /ui >}}] (環境変数) で [{{< ui >}}Allow access to all app settings{{< /ui >}}] (すべてのアプリの設定へのアクセスを許可する) オプションを有効にします。

     {{< img src="serverless/azure_app_service/app_settings.png" alt="Azure の環境変数セクション。[Allow access to all app settings] (すべてのアプリ設定へのアクセスを許可する) オプションがチェックボックスで有効になっています。" >}}

3. {{< ui >}}Apply{{< /ui >}} を選択します。

#### アプリケーション設定 {#application-settings}

Azure の {{< ui >}}App settings{{< /ui >}} で、メインコンテナに以下の環境変数を設定します。

- `DD_API_KEY`: [Datadog API キー][701]
- `DD_SERVICE`: サービスをどのようにタグ付けするか。例: `sidecar-azure`
- `DD_ENV`: 環境をどのようにタグ付けするか。例: `prod`
- `WEBSITES_ENABLE_APP_SERVICE_STORAGE`: `true`。この環境変数を設定すると、`/home/` マウントが永続化され、サイドカーと共有されます。
- `DD_SERVERLESS_LOG_PATH`: ログの書き込み先。たとえば、`/home/LogFiles/*.log` や `/home/LogFiles/myapp/*.log` などです。
- `DD_AAS_INSTANCE_LOGGING_ENABLED`: `true` の場合、追加のファイルパス `/home/LogFiles/*$COMPUTERNAME*.log` に対してログ収集が自動的に構成されます。
- `DD_AAS_INSTANCE_LOG_FILE_DESCRIPTOR`: より正確なファイルテーリングに使用されるオプションのファイル記述子。頻繁なログローテーションがあるシナリオに推奨されます。たとえば、`_default_docker` を設定すると、ローテーションされたファイルを無視し、Azure のアクティブなログファイルのみを対象とするようにログテーラーが構成されます。


   <div class="alert alert-info">アプリケーションに複数のインスタンスがある場合、アプリケーションのログファイル名に <code>$COMPUTERNAME</code> 変数が含まれていることを確認してください。これにより、ログテーリングが同じファイルを読み取る複数のインスタンスから重複したログが作成されないようになります。</div>

<details open>
<summary>
<h4>.NET アプリケーション: 追加の必須環境変数</h4>
</summary>

.NET アプリケーションのモニタリングを設定する場合、次の **必須** 環境変数を設定してください。

| 変数名 | 値 |
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

### デプロイメントスロット {#deployment-slots}

<div class="alert alert-info">デプロイメントスロットのインスツルメンテーションはプレビュー版です。プレビュー中は、スロットからのテレメトリはメインの Web アプリの下に表示されます。スロットと本番環境のテレメトリを区別するには、各スロットに異なる値を設定して <a href="/getting_started/tagging/unified_service_tagging/">unified service tagging</a> を構成してください。</div>

{{% collapse-content title="デプロイメントスロットのインスツルメント" level="h4" %}}

メインの Web アプリではなく[デプロイメントスロット][901]をインスツルメントするには、以下のいずれかの方法を使用します。

[901]: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots

{{< tabs >}}
{{% tab "Datadog CLI" %}}

[Datadog CLI][1] (v5.9.0+) を使用して `--slot` フラグを追加します。`--service`、`--env`、および `--version` を使用して、スロットに個別の unified service tagging 値を設定します。

デプロイメントスロットの名前を確認するには、以下を実行します。

```shell
az webapp deployment slot list --query '[].name' -o tsv -g <resource-group> -n <web-app>
```

```shell
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name> \
  --slot <slot-name> \
  --service <service-name> --env <slot-env> --version <app-version>
```

または、`--resource-id` フラグを使用して完全なスロットリソース ID を指定します。

```shell
datadog-ci aas instrument --resource-id /subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Web/sites/<app-name>/slots/<slot-name> \
  --service <service-name> --env <slot-env> --version <app-version>
```

**注**: `--env` を渡すと、CLI は自動的に `DD_ENV` をスティッキー設定としてマークするため、`env` タグはスロットのスワップ後も保持されます。

[1]: https://github.com/DataDog/datadog-ci#how-to-install-the-cli

{{% /tab %}}
{{% tab "Terraform" %}}

[Datadog Linux Web App Slot モジュール][1] を使用します。

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

`terraform apply` を実行し、プロンプトに従って操作します。

**注**: メインの Web アプリモジュールで `datadog_env` が設定されている場合、そのモジュールは `DD_ENV` をスティッキー設定としてマークするため、`env` タグはスロットのスワップ後も保持されます。

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux-slot

{{% /tab %}}
{{% tab "Bicep" %}}

メインの Web アプリではなく、デプロイメントスロットをターゲットにするようにテンプレートを更新します。

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

更新したテンプレートを再デプロイします。

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**注**: デフォルトでは、Azure アプリ設定はスロット間でスワップされます。上記の `slotConfigNames` リソースは `DD_ENV` をスティッキーとしてマークするため、`env` タグはスロットのスワップ後も保持されます。

`slotConfigNames` リソースは、スティッキー設定リストを完全に置き換えます。`existingStickyAppSettingNames` ですでにスティッキーとしてマークされている設定、または新しいアプリの場合は `[]` を渡します。省略された名前はスティッキー設定が解除されます。

{{% /tab %}}
{{% tab "ARM テンプレート" %}}

メインの Web アプリではなく、デプロイメントスロットをターゲットにするようにテンプレートを更新します。

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

更新したテンプレートを再デプロイします。

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**注**: デフォルトでは、Azure アプリ設定はスロット間でスワップされます。上記の `slotConfigNames` リソースは `DD_ENV` をスティッキーとしてマークするため、`env` タグはスロットのスワップ後も保持されます。

`slotConfigNames` リソースは、スティッキー設定リストを完全に置き換えます。`existingStickyAppSettingNames` ですでにスティッキーとしてマークされている設定、または新しいアプリの場合は `[]` を渡します。省略された名前はスティッキー設定が解除されます。

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## トラブルシューティング{#troubleshooting}

App Service プランで自動スケーリングが有効になっており、関連のないトレースがマージされている場合、Azure プラットフォームのヘルスプローブ (`User-Agent: HttpScaleManager`) が古い W3C トレースコンテキストを保持している可能性があります。アプリへのすべての呼び出し元が Datadog でインスツルメントされている場合は、影響を受けるアプリで `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog` を設定し、トレースコンテキストの抽出を Datadog の形式に制限してください。Datadog でインスツルメントされていない呼び出し元を持つアプリの場合、この設定を行うと、Datadog はそれらの W3C トレースコンテキストを無視します。その結果、それらのリクエストは親トレースにマージされず、切断されたトレースになります。

## プロファイリング {#profiling}

<div class="alert alert-info">
Datadog の Continuous Profiler は、Linux Azure App Service の Python および Node.js 用プレビューで利用可能です。
</div>

[Continuous Profiler][4] を有効にするには、アプリケーションコンテナで環境変数 `DD_PROFILING_ENABLED=true` を設定してください。

## サンプルアプリケーション {#example-application}
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

[1]: https://learn.microsoft.com/en-us/azure/app-service/tutorial-custom-container-sidecar
[2]: /ja/serverless/guide/azure_app_service_linux_containers_serverless_init
[3]: https://app.datadoghq.com/integrations/azure
[4]: /ja/profiler/
[5]: /ja/integrations/azure-app-services/#metrics