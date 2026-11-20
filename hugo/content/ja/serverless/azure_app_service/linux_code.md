---
aliases:
- /ja/serverless/azure_app_services/azure_app_services_linux
further_reading:
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: ブログ
  text: Datadog で Azure App Service 上の Linux Web アプリを監視する
title: Azure App Service - Linux コード
---
## 概要 {#overview}

このページでは、Datadog Agent を使用して Linux Azure App Service アプリケーションをインスツルメントする方法について説明します。このページの手順では、サイドカーコンテナと Linux Azure App Service のアプリケーション設定を使用して、アプリケーションのインスツルメンテーションとその構成の管理を行います。

サイドカーアプローチを使用しないことを希望する場合 (非推奨)、代わりに [Datadog ラッパーを使用して Azure App Service - Linux コードデプロイメントをインスツルメントする][1] 手順に従うことができます。

**サポートされているランタイム**: Java、Node.js、.NET、PHP、Python

## セットアップ {#setup}

### Azure インテグレーション {#azure-integration}

[Datadog-Azure インテグレーション][10] をまだインストールしていない場合は、メトリクスとログを収集するためにこのインテグレーションをインストールしてください。

### アプリケーション {#application}

ご使用の言語に対応した SDK をインストールします。

{{< tabs >}}
{{% tab "Java" %}}

Java は、コマンドライン引数 `javaagent` を使用したインスツルメンテーションコードの追加をサポートしています。

1. [Datadog Java SDK の最新バージョン][101] をダウンロードします。
1. SDK をプロジェクト内に配置します。これをデプロイメントに含める必要があります。
   `azure-webapp-maven` プラグインを使用している場合は、Java SDK をタイプ `lib` のリソースエントリーとして追加できます。
1. 環境変数 `JAVA_OPTS` に `--javaagent:/home/site/lib/dd-java-agent.jar` を設定します。アプリケーションがデプロイされると、Java トレーサーが `/home/site/lib/dd-java-agent.jar` にコピーされます。

アプリケーションの起動時にインスツルメンテーションが開始されます。

[101]: https://dtdg.co/latest-java-tracer

{{% /tab %}}
{{% tab "Node.js" %}}

1. パッケージをインストールします。`dd-trace`
   ```
   npm install dd-trace
   ```
2. `NODE_OPTIONS` 環境変数を使用して Node.js トレーサーを初期化します。
   ```
   NODE_OPTIONS='--require dd-trace/init'
   ```

{{% /tab %}}
{{% tab ".NET" %}}

`Datadog.Trace.Bundle` Nuget パッケージをプロジェクトに追加します。詳細については、[Nuget パッケージページ][102] を参照してください。

たとえば、次のようになります。

```shell
dotnet add package Datadog.Trace.Bundle --version 3.21.0
```

[102]: https://www.nuget.org/packages/Datadog.Trace.Bundle#readme-body-tab

{{% /tab %}}
{{% tab "PHP" %}}

次のスクリプトを実行して、Datadog の PHP SDK をインストールします。
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

この bash スクリプトは、トレースモジュールを PHP にインストールしてから NGINX サービスを再起動する起動コマンドとして実行されることを想定しています。

{{% /tab %}}
{{% tab "Python" %}}

1. プロジェクトに `ddtrace` を追加します。
1. 起動コマンドを変更します。新しいコマンドは、古いコマンドが引数として指定された `ddtrace-run` を実行する必要があります。つまり、起動コマンドが `foo` である場合、`ddtrace-run foo` を実行するようにこのコマンドを変更します。

   たとえば、次のようになります。
   ```ssh
   ddtrace-run gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi
   ```

{{% /tab %}}
{{< /tabs >}}

### インスツルメンテーション {#instrumentation}

{{< tabs >}}
{{% tab "Datadog CLI" %}}

#### ローカル {#locally}

[Datadog CLI][201] をインストールします。

```shell
npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-aas
```

[Azure CLI][202] をインストールし、`az login` で認証します。

次に、サイドカーコンテナを設定するために、下記のコマンドを実行します。

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

Datadog サイトを設定します。 {{< region-param key="dd_site" code="true" >}}です。デフォルトは `datadoghq.com` です。

`--service` や `--env` などのほかのフラグも使用して、サービスや環境のタグを設定することができます。すべてのオプションのリストを表示するには、`datadog-ci aas instrument --help` を実行してください。

`datadog-ci aas instrument`は、インスツルメンテーションを設定するために一度だけ実行する必要があります。コードをデプロイするたびに再実行する必要はありません。Datadog の構成を変更する場合にのみ再実行してください。

#### Azure Cloud Shell {#azure-cloud-shell}

[Azure Cloud Shell][203] で Datadog CLI を使用するには、クラウドシェルを開き、`DD_API_KEY` 環境変数に API キーを指定し、`DD_SITE` 環境変数にサイトを設定し、`npx` を使用して CLI を直接実行します。

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
      python_version = "3.13" // change for your specific runtime
    }
  }
  app_settings = {
    DD_TRACE_ENABLED = "true" // Example setting
  }
}
```

最後に `terraform apply` を実行し、プロンプトに従って操作します。

[Datadog Linux Web App モジュール][4] は、Web App リソースのみをデプロイするため、別途 [コードをデプロイ][5] する必要があります。

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[2]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app
[3]: https://developer.hashicorp.com/terraform/install
[4]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[5]: https://learn.microsoft.com/en-us/azure/app-service/getting-started

{{% /tab %}}
{{% tab "Bicep" %}}

既存の Web App を更新して、下記のように、必要な Datadog アプリ設定とサイドカーを含めてください。

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

更新したテンプレートを再デプロイします。

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

すべての環境変数の説明については、[[手動] タブ](?tab=manual#instrumentation)を参照してください。


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

更新したテンプレートを再デプロイします。

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

すべての環境変数の説明については、[[手動] タブ](?tab=manual#instrumentation)を参照してください。

{{% /tab %}}
{{% tab "手動" %}}

1. **Datadog 用のサイドカーコンテナを構成します**。

   1. Azure で [{{< ui >}}Deployment{{< /ui >}}] (デプロイメント) > [{{< ui >}}Deployment Center{{< /ui >}}] に移動します。[{{< ui >}}Containers{{< /ui >}}] (コンテナ) タブを選択します。
   1. [{{< ui >}}Add{{< /ui >}}] (追加) をクリックして [{{< ui >}}Custom container{{< /ui >}}] (カスタムコンテナ) を選択します。
   1.  [{{< ui >}}Edit container{{< /ui >}}] (コンテナの編集) フォームで以下のように指定します。
      - {{< ui >}}Image source{{< /ui >}} (イメージソース): Other container registries (その他のコンテナレジストリ)
      - {{< ui >}}Image type{{< /ui >}} (イメージタイプ): Public (公開)
      - {{< ui >}}Registry server URL{{< /ui >}}: `index.docker.io`
      - {{< ui >}}Image and tag{{< /ui >}}: `datadog/serverless-init:latest`
      - {{< ui >}}Port{{< /ui >}}: 8126
      - [{{< ui >}}Environment variables{{< /ui >}}] (環境変数) で [{{< ui >}}Allow access to all app settings{{< /ui >}}] (すべてのアプリの設定へのアクセスを許可する) オプションを有効にします。

        {{< img src="serverless/azure_app_service/app_settings.png" alt="Azure の環境変数セクション。[Allow access to all app settings] (すべてのアプリ設定へのアクセスを許可する) オプションがチェックボックスで有効になっています。" >}}

   1. [{{< ui >}}Apply{{< /ui >}}] (適用) を選択します。

2. **環境変数を構成します**。
   Azure の [{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Environment Variables{{< /ui >}}] (環境変数) > [{{< ui >}}App Settings{{< /ui >}}] (アプリの設定) で、以下のキーと値のペアを追加します。

`DD_API_KEY`
: **値**: Datadog API キー。<br>
Datadog の [[Organization Settings] (オーガニゼーション設定) > [API Keys] (API キー)][301] を参照してください。<br>

`DD_SITE`
: **値**:{{< region-param key="dd_site" code="true" >}}<br>
[Datadog サイト][302]。デフォルトは `datadoghq.com` です。<br>
このページの右ナビゲーションバーにある [Datadog Site] (Datadog サイト) ドロップダウンメニューを使用して、サイトを選択します。<br>

`DD_SERVICE`
: **値**: アプリケーションのサービス名。<br>
デフォルトでは `package.json` の name フィールドの値が使用されます。<br>
`service` タグの詳細については、[Unified Service Tagging][303] を参照してください。<br>

`DD_ENV`
: **値**: アプリケーションの環境名。<br>
このフィールドにはデフォルト値はありません。<br>
`env` タグの詳細については、[Unified Service Tagging][303] を参照してください。<br>

`DD_VERSION`
: **値**: アプリケーションのバージョン。<br>
このフィールドにはデフォルト値はありません。<br>
`version` タグの詳細については、[Unified Service Tagging][303] を参照してください。<br>

`WEBSITES_ENABLE_APP_SERVICE_STORAGE`
: **値**: `true`<br>
この環境変数を `true` に設定すると、`/home/` マウントが持続し、サイドカーと共有されます。<br>

`DD_SERVERLESS_LOG_PATH`
: **値**: サイドカーがログを収集するために使用するログパス。<br>
ログの書き込み先。たとえば、`/home/LogFiles/*.log` や `/home/LogFiles/myapp/*.log` などです。<br>

`DD_AAS_INSTANCE_LOGGING_ENABLED`
: **値**: false <br>
`true` の場合、追加のファイルパス (`/home/LogFiles/*$COMPUTERNAME*.log`) に対してログ収集が自動的に構成されます。

`DD_AAS_INSTANCE_LOG_FILE_DESCRIPTOR`
: **値**: より正確なログテーリングのために使用されるオプションのファイル記述子。<br>
頻繁なログローテーションがあるシナリオに推奨されます。たとえば `_default_docker` を設定すると、ローテーションされたファイルを無視し、Azure のアクティブなログファイルのみに集中するようにログテーラーが構成されます。<br>

<div class="alert alert-info">アプリケーションに複数のインスタンスがある場合、アプリケーションのログファイル名に <code>$COMPUTERNAME</code> 変数が含まれていることを確認してください。。これにより、ログテーリングによって、同じファイルを読み取る複数のインスタンスから重複したログが作成されないようになります。この機能変数を有効にすると、 <code>DD_SERVERLESS_LOG_PATH</code> が設定されることがなくなります。これは、重複するログの取り込みを防ぐことを目的としています。</div>




{{% collapse-content title=".NET: 必要な追加の環境変数" level="h4" id="dotnet-additional-settings" %}}

.NET アプリケーションの場合、以下の環境変数が**必須**です。詳細については、`Datadog.Tracer.Bundle` [Nuget パッケージの README ファイル][1] を参照してください。

`DD_DOTNET_TRACER_HOME`
: **値**: `/home/site/wwwroot/datadog`<br>
Datadog .NET SDK を含むディレクトリのパス。<br>

`CORECLR_ENABLE_PROFILING`
: **値**: `1`<br>
.NET ランタイムのインスツルメンテーション API を有効にします。<br>

`CORECLR_PROFILER`
: **値**: `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`<br>
Datadog の .NET インスツルメンテーションライブラリの識別子。<br>

`CORECLR_PROFILER_PATH`
: **値**: `/home/site/wwwroot/datadog/`<br>
`linux-x64/Datadog.Trace.ClrProfiler.Native.so` (単一行)<br>
.NET ランタイムによって読み込まれるインスツルメンテーションライブラリのパス。<br>

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle#readme-body-tab

{{% /collapse-content %}}

[301]: https://app.datadoghq.com/organization-settings/api-keys
[302]: /ja/getting_started/site/
[303]: /ja/getting_started/tagging/unified_service_tagging

{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

### デプロイメントスロット {#deployment-slots}

<div class="alert alert-info">デプロイメントスロットのインスツルメンテーションはプレビュー版です。プレビュー中は、スロットからのテレメトリはメインの Web アプリの下に表示されます。スロットと本番環境のテレメトリを区別するには、各スロットに異なる値を設定して <a href="/getting_started/tagging/unified_service_tagging/">unified service tagging</a> を構成してください。</div>

{{% collapse-content title="デプロイメントスロットのインスツルメント" level="h4" %}}

メインの Web アプリではなく [デプロイメントスロット][801] をインスツルメントするには、以下のいずれかの方法を使用します。

[801]: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots

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
      python_version = "3.13" // change for your specific runtime
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

更新したテンプレートを再デプロイします。

```shell
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

更新したテンプレートを再デプロイします。

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**注**: デフォルトでは、Azure アプリ設定はスロット間でスワップされます。上記の `slotConfigNames` リソースは `DD_ENV` をスティッキーとしてマークするため、`env` タグはスロットのスワップ後も保持されます。

`slotConfigNames` リソースは、スティッキー設定リストを完全に置き換えます。`existingStickyAppSettingNames` ですでにスティッキーとしてマークされている設定、または新しいアプリの場合は `[]` を渡します。省略された名前はスティッキー設定が解除されます。

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

### Datadog でのトレースの表示 {#view-traces-in-datadog}

アプリケーションの再起動後、Datadog の [[APM Service] (APM サービス) ページ][2] に移動し、アプリケーションに設定したサービス名 (`DD_SERVICE`) を検索します。

### カスタムメトリクス {#custom-metrics}

カスタムメトリクスを送信するようにアプリケーションを構成するには、ランタイムに応じた適切な手順を実行します。

- [Java][3]
- [Node.js][4]
- [.NET][5]
- [PHP][6]
- [Python][7]

### Continuous Profiler {#continuous-profiler}

<div class="alert alert-info">
Datadog の Continuous Profiler は、Linux Azure App Service の Python および Node.js 用プレビューで利用可能です。
</div>

Continuous Profiler を有効にするには、環境変数 `DD_PROFILING_ENABLED=true` を設定します。詳細については、[Continuous Profiler のドキュメント][8] を参照してください。

## デプロイメント {#deployment}

{{% aas-workflow-linux %}}

## トラブルシューティング {#troubleshooting}

トレースやカスタムメトリクスデータが期待どおりに受信されない場合は、サイドカー構成オプションで `DD_LOG_LEVEL` を設定して、エージェントのデバッグログを有効にしてください。トレーサーのデバッグを行うには、`DD_TRACE_DEBUG` を true に設定します。これにより、サイドカーと SDK の追加デバッグログが生成されます。

デバッグログを受信するには、{{< ui >}}App Service logs{{< /ui >}} を必ず有効にしてください。

{{< img src="serverless/azure_app_service/app-service-logs.png" alt="Azure App Service 構成: Azure UI の [Settings] (設定) の [Monitoring] (監視) セクションにある App Service ログ。[Application logging] (アプリケーションロギング) オプションが [File System] (ファイルシステム) に設定されています。" style="width:100%;" >}}

[{{< ui >}}Log stream{{< /ui >}}] (ログストリーム) の内容を [Datadog サポート][9] と共有してください。

App Service Planで自動スケーリングが有効になっており、関連のないトレースがマージされている場合、Azureプラットフォームのヘルスプローブ (`User-Agent: HttpScaleManager`) が古いW3Cトレースコンテキストを保持している可能性があります。アプリへのすべての呼び出し元がDatadogでインストルメント化されている場合は、影響を受けるアプリで `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog` を設定し、トレースコンテキストの抽出をDatadog形式に制限してください。Datadogでインストルメント化されていない呼び出し元を持つアプリの場合、この設定を行うと、DatadogはそれらのW3Cトレースコンテキストを無視し、それらのリクエストを親トレースにマージするのではなく、切断されたトレースに分割します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/guide/azure_app_service_linux_code_wrapper_script
[2]: /ja/tracing/services/service_page/
[3]: /ja/extend/dogstatsd/?tab=java#dogstatsd-client
[4]: https://github.com/brightcove/hot-shots
[5]: /ja/extend/dogstatsd/?tab=dotnet#dogstatsd-client
[6]: /ja/extend/dogstatsd/?tab=php#dogstatsd-client
[7]: /ja/extend/dogstatsd/?tab=python#dogstatsd-client
[8]: /ja/profiler/
[9]: /ja/help
[10]: https://app.datadoghq.com/integrations/azure