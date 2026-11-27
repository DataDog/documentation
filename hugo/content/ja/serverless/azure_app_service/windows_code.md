---
aliases:
- /ja/infrastructure/serverless/azure_app_services/
- /ja/serverless/azure_app_services/azure_app_services_windows
further_reading:
- link: /integrations/guide/azure-native-integration/
  tag: ドキュメント
  text: Azure Native インテグレーションガイド
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: ブログ
  text: Azure App Service の Datadog 拡張機能で Monitor .NET Web アプリを監視
- link: https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler-what-is-considered-as-a-host-for-azure-app-services
  tag: 料金
  text: Azure App Service APM 価格設定
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: ブログ
  text: ASP.NET Core アプリケーションを Azure App Service にデプロイする
- link: /serverless/azure_functions/dotnet_extension/
  tag: ドキュメント
  text: Azure Functions .NET APM Extension
title: Azure App Service - Windows コード
---
## 概要 {#overview}

Azure App Service 用 Datadog Extension は、メトリクスとログを提供する [Datadog-Azure インテグレーション][5]に加えて、監視機能を提供します。

- 自動インスツルメンテーションによる完全分散型 APM トレース。
- 関連する Azure App Service のメトリクスとメタデータを表示する、カスタマイズされた APM サービスおよびトレースビュー。
- スパンをカスタマイズするための手動 APM インスツルメンテーションをサポート。
- `Trace_ID`アプリケーションログへの挿入。
- [DogStatsD][1] を使用したカスタムメトリクスの送信をサポート。

<div class="alert alert-info">
この拡張機能は以下をサポートしています。
<ul>
  <li>App Service Web Apps: Basic、Standard、Premium プランの .NET、Java、Node.js ランタイムでサポートされています。</li>
  <li>Azure Functions: Dedicated (App Service) または Premium プランの .NET ランタイムでのみサポートされています。<a href="/serverless/azure_functions/dotnet_extension/">Azure Functions 上の Windows 拡張機能に関する具体的な設定とトラブルシューティングを参照してください</a></li>
</ul>

.NET 以外の Azure Functions、または Dedicated/Premium プラン以外の .NET 設定については、<a href="/serverless/azure_functions">Serverless Compatibility Layer</a> を使用する必要があります。

<strong>他の App Service リソースタイプやランタイムのサポートに関心がありますか?</strong><a href="https://forms.gle/n4nQcxEyLqDBMCDA7">サインアップ</a>して、プレビューが利用可能になった際に通知を受け取ってください。</div>

### サポート対象のランタイム {#supported-runtimes}

Datadog の .NET、Java、および Node.js APM 拡張機能は、以下のランタイムをサポートしています。

| フレームワーク | サポート対象のランタイム |
| --------- | ------------------ |
| .NET      | `ASPNET:V3.5`、`ASPNET:V4.8`、`dotnet:8`、`dotnet:9`、`dotnet:10`  |
| Java      | `JAVA:8`、`JAVA:11`、`JAVA:17`、`JAVA:21`、`TOMCAT:9.0-java8`、`TOMCAT:9.0-java11`、`TOMCAT:9.0-java17`、`TOMCAT:9.0-java21`、`TOMCAT:10.1-java8`、`TOMCAT:10.1-java11`、`TOMCAT:10.1-java17`、`TOMCAT:10.1-java21`、`TOMCAT:11.0-java8`、`TOMCAT:11.0-java11`、`TOMCAT:11.0-java17`、`TOMCAT:11.0-java21` |
| Node.js   | `NODE:20LTS`、`NODE:22LTS` |

### 拡張機能固有の注記 {#extension-specific-notes}

{{< tabs >}}
{{% tab ".NET" %}}

Datadog 自動インスツルメンテーションは、.NET CLR Profiling API に依存します。この API は、1 つのサブスクライバーのみを許可します (例: プロファイラーが有効な Datadog の .NET Tracer)。可視性を最大限に確保するため、アプリケーション環境では 1 つの APM ソリューションのみを実行してください。

さらに、Azure Native Integration を使用している場合は、Azure の Datadog リソースを利用して、.NET アプリに拡張機能を追加できます。手順については、Datadog の [Azure Native Integration Guide][2] の [App Service 拡張機能セクション][1] を参照してください。

[1]: /ja/integrations/guide/azure-native-integration/#app-service-extension
[2]: /ja/integrations/guide/azure-native-integration/

{{% /tab %}}
{{% tab "Java" %}}
Java Web Apps のサポートは、拡張機能 v2.4 以降でプレビュー版として提供されています。

この期間中、Java Web Apps のトレースに対する課金の影響はありません。

{{% /tab %}}
{{< /tabs >}}

## インストール {#installation}

Datadog は、最適なパフォーマンス、安定性、および機能の可用性を確保するために、拡張機能を定期的に最新バージョンに更新することを推奨しています。初回インストールとその後の更新のいずれの場合も、正常にインストールまたは更新するには Web アプリを完全に停止する必要があることに注意してください。

まだ設定していない場合は、[Datadog-Azure インテグレーション][3]を構成してください。Datadog で `azure.app_services.count` または `azure.functions.count` メトリクスが表示されていることを確認することで、Azure インテグレーションが正しく構成されていることを検証できます。

<div class="alert alert-info">このステップは、メトリクスとトレースの相関および機能的なトレースパネルビューにとって重要であり、Azure App Services で Datadog を使用する際の全体的なエクスペリエンスを向上させます。
</div>

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

Datadog CLI は、アプリのランタイムを自動的に推測し、対応するアプリケーションをインストールします。何らかの理由でこれが失敗した場合は、`--windows-runtime` フラグを使用してランタイムを指定することで、この動作をオーバーライドできます。

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

[Datadog Terraform module for Windows Web Apps][4] は、必要な環境変数とランタイム用の Windows Web App 拡張機能を追加することで、[azurerm_windows_web_app][5] リソースをラップし、Datadog Serverless Monitoring 用に Web App を自動的に設定します。

まだ Terraform を設定していない場合は、[Terraform をインストール][1]し、新しいディレクトリを作成し、`main.tf` というファイルを作成してください。

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

最後に `terraform apply` を実行し、プロンプトに従って操作します。

[Datadog Windows Web App モジュール][2] は、Web App リソースと拡張機能のみをデプロイするため、別途 [コードをデプロイ][3] する必要があります。

[1]: https://developer.hashicorp.com/terraform/install
[2]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/windows
[3]: https://learn.microsoft.com/en-us/azure/app-service/getting-started
[4]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/windows
[5]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/windows_web_app

{{% /tab %}}
{{% tab "Bicep" %}}

既存の Web App を更新して、下記のように、必要な Datadog アプリ設定と拡張機能を含めてください。

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

更新したテンプレートをデプロイします。

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**注**: アプリを手動 (またはスクリプト経由) で停止および開始する必要があります。そうしないと、自動トレースは機能しません。更新を行う際は、テンプレートをデプロイする前にアプリが停止していることを確認し、デプロイ完了後に再度開始してください。

すべての環境変数の説明については、[{{< ui >}}Manual{{< /ui >}} タブ](?tab=manual#instrumentation)を参照してください。


{{% /tab %}}
{{% tab "ARM テンプレート" %}}

既存の Web App を更新して、下記のように、必要な Datadog アプリ設定とサイドカーを含めてください。

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

更新したテンプレートをデプロイします。

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**注**: アプリを手動 (またはスクリプト経由) で停止および開始する必要があります。そうしないと、自動トレースは機能しません。更新を行う際は、テンプレートをデプロイする前にアプリが停止していることを確認し、デプロイ完了後に再度開始してください。

すべての環境変数の説明については、[{{< ui >}}Manual{{< /ui >}} タブ](?tab=manual#instrumentation)を参照してください。

{{% /tab %}}
{{% tab "手動" %}}

1. [Azure Portal][1] で、Datadog を利用してインスツルメンテーションを行う Azure アプリのダッシュボードに移動してください。

2. 以下のアプリケーション設定を構成します。

   **必要な環境変数**

   `DD_API_KEY`
   : **値**: Datadog API キー。<br>
   Datadog の [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}API Keys{{< /ui >}}][2] を参照してください。<br>

   `DD_SITE`
   : **値**: Datadog サイト<br>
   [Datadog サイト][3]。デフォルトは `datadoghq.com` です。<br>

   **Unified Service Tagging**

   Datadog では、[unified service tagging][4] のために、アプリケーションに `env`、`service`、`version` タグを付けることを推奨しています。

   `DD_SERVICE`
   : **値**: アプリケーションのサービス名。<br>

   `DD_ENV`
   : **値**: アプリケーションの環境名。<br>
   このフィールドにはデフォルト値はありません。<br>

   `DD_VERSION`
   : **値**: アプリケーションのバージョン。<br>
   このフィールドにはデフォルト値はありません。<br>

   **追加の環境変数**

   `DD_LOGS_INJECTION`
   : **値**: `true` (推奨)<br>
   アプリケーションログにトレース ID を挿入することで、トレースとログの相関付けを有効にします。<br>
   これにより、Datadog UI でログとトレースを相関付けることができます。<br>

3. {{< ui >}}Save{{< /ui >}} をクリックします。これでアプリケーションが再起動します。

4. {{< ui >}}Stop{{< /ui >}} をクリックして、アプリケーションを停止します。
   <div class="alert alert-danger">Datadog を正常にインストールするには、<u>アプリケーションを停止する</u>必要があります。</div>

5. Azure ポータルで {{< ui >}}Extensions{{< /ui >}} ページに移動し、Datadog APM 拡張機能を選択します。

   {{< img src="infrastructure/serverless/azure_app_services/choose_extension.png" alt="Azure ポータルの [Extensions] ページの例 (.NET Datadog APM 拡張機能が表示されています)。" style="width:100%;" >}}

6. 利用規約に同意し、{{< ui >}}OK{{< /ui >}} をクリックして、インストールが完了するのを待ちます。
   <div class="alert alert-danger">このステップでは、アプリケーションが停止状態である必要があります。</div>

7.  {{< ui >}}Start{{< /ui >}} をクリックして、メインアプリケーションを起動します。

    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Azure の開始ボタン" style="width:100%;" >}}

8.  Azure ポータルの {{< ui >}}Extensions{{< /ui >}} ページを確認し、拡張機能がインストールされ、実行されていることを確認します。

<div class="alert alert-info">ダウンタイムを回避するには、<a href="https://learn.microsoft.com/en-us/azure/app-service/deploy-best-practices#use-deployment-slots">デプロイメントスロット</a>を使用します。<a href="https://github.com/marketplace/actions/azure-cli-action">GitHub Action for Azure CLI</a> を使用するワークフローを作成できます。サンプルの <a href="/resources/yaml/serverless/aas-workflow-windows.yaml">GitHub ワークフロー</a> を参照してください。</div>

[1]: https://portal.azure.com/
[2]: /ja/account_management/api-app-keys/
[3]: /ja/getting_started/site/
[4]: /ja/getting_started/tagging/unified_service_tagging

{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

### デプロイメントスロット {#deployment-slots}

<div class="alert alert-info">デプロイメントスロットのインスツルメンテーションはプレビュー版です。プレビュー中は、スロットからのテレメトリはメインの Web アプリの下に表示されます。スロットと本番環境のテレメトリを区別するには、各スロットに異なる値を設定して <a href="/getting_started/tagging/unified_service_tagging/">unified service tagging</a> を構成してください。</div>

{{% collapse-content title="デプロイメントスロットのインスツルメント" level="h4" %}}

メインの Web アプリではなく[デプロイメントスロット][101]をインスツルメントするには、以下のいずれかの方法を使用します。

[101]: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots

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

[Datadog Windows Web App Slot モジュール][1] を使用します。

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

`terraform apply` を実行し、プロンプトに従って操作します。

**注**: メインの Web アプリモジュールで `datadog_env` が設定されている場合、そのモジュールは `DD_ENV` をスティッキー設定としてマークするため、`env` タグはスロットのスワップ後も保持されます。

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/windows-slot

{{% /tab %}}
{{% tab "Bicep" %}}

メインの Web アプリではなく、デプロイメントスロットをターゲットにするようにテンプレートを更新します。

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

更新したテンプレートをデプロイします。

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**注**: 拡張機能を有効にするには、メインアプリではなくスロットを停止して開始する必要があります。

**注**: デフォルトでは、Azure アプリ設定はスロット間でスワップされます。上記の `slotConfigNames` リソースは `DD_ENV` をスティッキーとしてマークするため、`env` タグはスロットのスワップ後も保持されます。

`slotConfigNames` リソースは、スティッキー設定リストを完全に置き換えます。`existingStickyAppSettingNames` ですでにスティッキーとしてマークされている設定、または新しいアプリの場合は `[]` を渡します。省略された名前はスティッキー設定が解除されます。

{{% /tab %}}
{{% tab "ARM テンプレート" %}}

メインの Web アプリではなく、デプロイメントスロットをターゲットにするようにテンプレートを更新します。

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

更新したテンプレートをデプロイします。

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**注**: 拡張機能を有効にするには、メインアプリではなくスロットを停止して開始する必要があります。

**注**: デフォルトでは、Azure アプリ設定はスロット間でスワップされます。上記の `slotConfigNames` リソースは `DD_ENV` をスティッキーとしてマークするため、`env` タグはスロットのスワップ後も保持されます。

`slotConfigNames` リソースは、スティッキー設定リストを完全に置き換えます。`existingStickyAppSettingNames` ですでにスティッキーとしてマークされている設定、または新しいアプリの場合は `[]` を渡します。省略された名前はスティッキー設定が解除されます。

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

<div class="alert alert-info">Azure Functions を使用していますか?拡張機能のインストール中にファイルロックエラーを回避するためのガイダンスなど、Function App 固有のインストール手順については、<a href="/serverless/azure_functions/dotnet_extension/">Azure Functions .NET APM Extension</a> を参照してください。</div>

## カスタムメトリクス {#custom-metrics}

Azure App Service 拡張機能には、Datadog のメトリクス集約サービスである [DogStatsD][1] のインスタンスが含まれています。これにより、拡張機能を使用して Azure Web Apps および Functions からカスタムメトリクス、サービスチェック、イベントを Datadog に直接送信できるようになります。

Azure App Service でカスタムメトリクスやチェックを作成するプロセスは、Datadog Agent が実行されているホスト上のアプリケーションでそれを行うプロセスと似ています。**標準の DogStatsD 設定プロセス**とは異なり、DogStatsD 設定を初期化する際にポートやサーバー名を設定する必要はありません。Azure App Service には、メトリクスの送信方法を決定する環境変数が用意されています (DogStatsD クライアントの v6.0.0 以降が必要です)。

拡張機能を使用して Azure App Service から Datadog にカスタムメトリクスを送信するには、次の手順に従います。

{{< tabs >}}
{{% tab ".NET" %}}

{{% aas-custom-metrics-dotnet %}}

{{% /tab %}}
{{% tab "Java" %}}

1. [DogStatsD クライアント](https://search.maven.org/artifact/com.datadoghq/java-dogstatsd-client)をプロジェクトに追加します。
2. アプリケーション内で DogStatsD を初期化し、カスタムメトリクスを作成します。
3. サポートされている Azure Web App にコードをデプロイします。
4. Datadog App Service 拡張機能をまだインストールしていない場合は、先にインストールしてください。

メトリクスを送信するには、以下のコードを使用します。

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

1. アプリケーション内で [DogStatsD を初期化し、カスタムメトリクスを作成][1]します。
2. サポートされている Azure Web App にコードをデプロイします。
3. Datadog の Azure App Service Node.js 拡張機能をまだインストールしていない場合は、先にインストールしてください。

<div class="alert alert-info">Node.js DogStatsD クライアントをインストールする必要はありません。これは、Azure App Service 拡張機能にパッケージ化されている Node.js トレーサー (<code>dd-trace</code>) に含まれています。</div>

メトリクスを送信するには、以下のコードを使用します。

```javascript
const tracer = require('dd-trace');
tracer.init();

tracer.dogstatsd.increment('example_metric.increment', 1, { environment: 'dev' });
tracer.dogstatsd.decrement('example_metric.decrement', 1, { environment: 'dev' });
```

<div class="alert alert-info">Datadog の Node.js トレーサーは、<code>dd-trace</code>Azure App Services 拡張機能にパッケージ化されています。これは自動的に <code>NODE_PATH</code>に追加されます。<br/><br/> <code>dd-trace</code> の依存関係として<code>package.json</code><strong>を追加する必要はありません。</strong> <code>dd-trace</code> を依存関係として追加すると、拡張機能によって提供されるバージョンが上書きされる可能性があります。ローカルテストについては、<a href="https://github.com/DataDog/datadog-aas-extension/releases">リリースノート</a>を参照して、お使いの Azure App Service 拡張機能のバージョンに適した Node.js トレーサーのバージョンを確認してください。</div>

[1]: /ja/extend/dogstatsd/

{{% /tab %}}
{{< /tabs >}}

**注**: カスタムメトリクスのみを送信する場合 (トレースを無効にする場合)、アプリケーションの設定で次の変数を設定します。
  - `DD_TRACE_ENABLED` を `false` に設定します。
  - `DD_AAS_ENABLE_CUSTOM_METRICS` を `true` に設定します。

[カスタムメトリクス][2]に関する詳細を参照してください。

## ログ {#logging}

### アプリケーションログ {#application-logging}

{{< tabs >}}
{{% tab ".NET" %}}

{{% aas-logging-dotnet %}}

{{% /tab %}}
{{% tab "Java" %}}

Azure App Service のアプリケーションから Datadog にログを送信するには、アプリから Datadog に直接ログをストリーミングする必要があります。この方法でログを送信するとトレース ID のインジェクションが可能になり、Datadog でログとトレースを関連付けることができます。

{{% /tab %}}
{{% tab "Node.js" %}}

Azure App Service のアプリケーションから Datadog にログを送信するには、アプリから Datadog に直接ログをストリーミングする必要があります。この方法でログを送信するとトレース ID のインジェクションが可能になり、Datadog でログとトレースを関連付けることができます。

{{% /tab %}}
{{< /tabs >}}

<br/>

### ログ用の環境変数 {#environment-variables-for-logging}

最適なログ収集のために、Azure App Service のアプリケーション設定でこれらの環境変数を構成します。

| 変数 | 説明 | 例 |
|----------|-------------|---------|
| `DD_SERVICE` | アプリケーションのサービス名 | `my-web-app` |
| `DD_ENV` | アプリケーションの環境 | `production`、`staging`、`development` |
| `DD_LOGS_INJECTION` | トレースとログの相関を有効にする | `true` |

### ログのベストプラクティス {#logging-best-practices}

- **トレース相関を有効にする**: ログとトレースを関連付けるために `DD_LOGS_INJECTION=true` を設定します
- **適切なサービス名を設定する**: ログが正しいサービス名で表示されるように `DD_SERVICE` を使用します
- **構造化ログを使用する**: ログのパースを容易にするため、アプリケーションに構造化ログを実装します。

**注**: トレース ID の挿入は、アプリケーション内で行われます。Azure リソースログは管理プレーンで Azure によって生成されるため、トレース ID は含まれません。

{{< tabs >}}
{{% tab ".NET" %}}

**コード例: Microsoft ネイティブロギング**

Microsoft.Extensions.Logging を使用して .NET アプリケーションでログをセットアップする方法の例を次に示します。

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

**Program.cs の構成**

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

**appsettings.json の構成**

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

このセットアップでは、Azure App Service のアプリケーション設定で `DD_LOGS_INJECTION=true` が設定されている場合、トレース相関が自動的に含まれます。

{{% /tab %}}
{{% tab "Java" %}}

Azure App Service で Java のアプリケーションロギングを構成するには、[Agent への直接ログストリーミング][1]を参照してください。

## [1]: /logs/log_collection/java/ stream-logs-directly-to-the-agent
{{% /tab %}}
{{% tab "Node.js" %}}

Azure App Service の Node.js でアプリケーションロギングを構成するには、[Agentless logging with Node.js][1] を参照してください。

[1]: /ja/logs/log_collection/nodejs/#agentless-logging

{{% /tab %}}
{{< /tabs >}}

## プログラムマネジメント {#programmatic-management}

{{< tabs >}}
{{% tab ".NET" %}}

Datadog は、PowerShell を使用して Azure App Service 拡張機能を更新またはインストールするためのスクリプトを提供しています。スクリプトによる拡張機能の管理により、[リソースグループごとに拡張機能を一括更新](#powershell-resource-group)したり、[特定のバージョンのサイト拡張機能のインストールを指定](#powershell-specific-version)したりできます。すでリプトを使用して、CI/CD パイプラインでプログラムから拡張機能を追加したり、すでにインストールされている拡張機能を検出および更新したりすることもできます。

### 前提条件{#prerequisites}

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) または [Azure Cloud Shell](https://docs.microsoft.com/en-us/azure/cloud-shell/overview)。
- Azure App Service [ユーザースコープの資格情報](https://docs.microsoft.com/en-us/azure/app-service/deploy-configure-credentials)。資格情報をまだお持ちでない場合は、[Azure portal](https://portal.azure.com/) に移動し、Web アプリまたは関数アプリにアクセスしてください。{{< ui >}}Deployment{{< /ui >}} > {{< ui >}}Deployment Center{{< /ui >}} に移動して、ユーザースコープの資格情報を作成または取得します。

### 初めて拡張機能をインストールする {#powershell-first-time}

インストールスクリプトは、最新バージョンの拡張機能を Azure Web アプリまたは Azure 関数アプリに追加します。これは、リソースグループ単位ではなく、アプリ単位で行われます。

1. Azure CLI または Azure Cloud Shell を開きます。
2. 以下のコマンドで、インストールスクリプトをダウンロードします。

    ```
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. 必要な引数やオプションの引数を適宜渡し、以下のコマンドを実行してください。

    ```
    .\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -DDSite <DATADOG_SITE> -DDEnv <DATADOG_ENV> -DDService <DATADOG_SERVICE> -DDVersion <DATADOG_VERSION> [-SlotName <SLOT_NAME>]
    ```

**注**: 上記コマンドには、以下の引数が必要です。

- `<USERNAME>`: Azure ユーザースコープのユーザー名。
- `<PASSWORD>`: Azure ユーザースコープのパスワード。
- `<SUBSCRIPTION_ID>`: Azure [サブスクリプション ID](https://docs.microsoft.com/en-us/azure/media-services/latest/setup-azure-subscription-how-to)。
- `<RESOURCE_GROUP_NAME>`: Azure リソースグループ名。
- `<SITE_NAME>`: アプリの名前。
- `<DATADOG_API_KEY>`: [Datadog API キー](https://app.datadoghq.com/organization-settings/api-keys)。

また、`DATADOG_SITE` を [Datadog サイト][32]に設定します。`DATADOG_SITE` のデフォルトは `datadoghq.com` です。サイトは以下のとおりです。{{< region-param key="dd_site" code="true" >}}。

メインアプリではなくデプロイメントスロットをターゲットにするには、`-SlotName <SLOT_NAME>` を追加します。Azure Function Apps では、拡張機能のインストール失敗を防ぐために、`WEBSITE_PRIVATE_EXTENSIONS=0` スティッキースロット設定も自動的に適用されます。詳細については、[Azure Functions .NET APM Extension](/serverless/azure_functions/dotnet_extension/) を参照してください。

[32]: /ja/getting_started/site/

### リソースグループの拡張機能を更新する {#powershell-resource-group}

アップデートスクリプトはリソースグループ全体に適用されます。このスクリプトは、拡張機能がインストールされているすべての Web App または Function App を更新します。Datadog 拡張機能がインストールされていない App Service アプリは影響を受けません。

1. Azure CLI または Azure Cloud Shell を開きます。
2. 以下のコマンドでアップデートスクリプトをダウンロードします。

    ```
    $baseUri="https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension"; Invoke-WebRequest -Uri "$baseUri/update-all-site-extensions.ps1" -OutFile "update-all-site-extensions.ps1"; Invoke-WebRequest -Uri "$baseUri/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. 次のコマンドを実行してください。すべての引数が必要です。

    ```
    .\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD>
    ```

### 特定のバージョンの拡張機能をインストールする {#powershell-specific-version}

Azure App Service UI は、拡張機能の特定のバージョンをインストールする機能をサポートしていません。これは、インストールスクリプトまたはアップデートスクリプトを使用して実行できます。

#### 単一のリソースに特定のバージョンをインストールする {#install-specific-version-on-a-single-resource}

単一のインスタンスに特定のバージョンをインストールするには、[拡張機能を初めてインストールする際の手順](#powershell-first-time)に従って、インストールコマンドに `-ExtensionVersion` パラメーターを追加してください。

```
.\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -ExtensionVersion <EXTENSION_VERSION>
```

`<EXTENSION_VERSION>` をインストールする拡張機能のバージョンに置き換えてください。例: `1.4.0`。

#### リソースグループ全体に特定のバージョンをインストールする {#install-specific-version-on-an-entire-resource-group}

リソースグループに特定のバージョンをインストールするには、[リソースグループの拡張機能を更新する際の手順](#powershell-resource-group)に従い、インストールコマンドに `-ExtensionVersion` パラメーターを追加してください。

```
.\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD> -ExtensionVersion <EXTENSION_VERSION>
```

`<EXTENSION_VERSION>` をインストールする拡張機能のバージョンに置き換えてください。例: `1.4.0`。

### ARM テンプレート {#arm-template}

多くの組織では、インフラストラクチャー・アズ・コードの実践を導入するために [Azure Resource Management (ARM) テンプレート](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) を使用しています。App Service 拡張機能をこれらのテンプレートに組み込むには、[Datadog の App Service 拡張機能インストールテンプレート](https://github.com/DataDog/datadog-aas-extension/tree/master/install-templates) をデプロイメントに組み込み、拡張機能を追加して App Service リソースと併せて構成します。

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-danger">Java Web Apps のサポートは、拡張機能 v2.4 以降でプレビュー版として提供されています。Java Web Apps では、プログラムマネジメントは利用できません。<br/><br/>
    他の App Service リソースタイプやランタイムのサポートに関心がありますか?<a href="https://forms.gle/n4nQcxEyLqDBMCDA7">サインアップ</a>して、プレビューが利用可能になった際に通知を受け取ってください。</div>

{{% /tab %}}
{{< /tabs >}}

## プロファイリング {#profiling}

<div class="alert alert-info">
Datadog の Continuous Profiler は、Windows Azure App Service の .NET および Node.js でプレビューとして利用できます。
</div>

[Continuous Profiler][6] を有効にするには、環境変数 `DD_PROFILING_ENABLED=true` を設定します。

## デプロイメント {#deployment}

{{% aas-workflow-windows %}}

## トラブルシューティング {#troubleshooting}

### Serverless ビューでアプリの誤構成が確認された場合、またはトレースに対応するメトリクスが見つからない場合 {#if-your-apps-are-identified-as-being-misconfigured-in-the-serverless-view-andor-you-are-missing-corresponding-metrics-for-your-traces}

アプリケーションを監視するための Azure インテグレーションが構成されていない可能性があります。適切に構成することで、Datadog プラットフォームでメトリクス、トレース、ログを関連付けやすくなります。Azure インテグレーションが構成されていないと、トレースに必要な重要なコンテキストが不足します。これを修正するには、

1. Azure インテグレーションタイルに移動してください。

2. アプリケーションが実行されている Azure サブスクリプションに [Azure インテグレーション][3]がインストールされていることを確認してください。

3. 適用した App Service プランのフィルタリングルールに、アプリが実行されている App Service プランが含まれていることを確認してください。App Service プランが含まれていない場合、そのプランでホストされているすべてのアプリと関数も含まれません。アプリ自体のタグは、Datadog によるフィルタリングには使用されません。

### APM のトレースが Datadog に表示されない場合 {#if-apm-traces-are-not-appearing-in-datadog}

1. `DD_SITE` と `DD_API_KEY` が正しく設定されていることを確認してください。

2. アプリケーションを完全に停止してから起動してください。

3. 解決しない場合は、拡張機能をアンインストールしてから再インストールしてください (これにより、最新バージョンを実行していることも確認できます)。

**注**: サポートチームによるアプリケーションエラーの調査を迅速化するため、`DD_TRACE_DEBUG:true` を設定し、Datadog ログディレクトリ (`%AzureAppServiceHomeDirectory%\LogFiles\datadog`) の内容をメールに追加してください。

サポートが必要な場合は、[Datadog サポート][4]にお問い合わせください。

### トレースに無関係なスパンが表示される場合 {#if-you-see-an-unrelated-span-in-a-trace}

App Service プランで自動スケーリングが有効になっており、無関係なトレースがマージされている場合、Azure プラットフォームのヘルスプローブ (`User-Agent: HttpScaleManager`) が古い W3C トレースコンテキストを保持している可能性があります。アプリへのすべての呼び出し元が Datadog でインスツルメントされている場合は、影響を受けるアプリで `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog` を設定し、トレースコンテキストの抽出を Datadog の形式に制限してください。Datadog でトレースされていない呼び出し元を持つアプリの場合、この設定により、Datadog はそれらの W3C トレースコンテキストを無視します。その結果、それらのリクエストは親トレースにマージされず、個別のトレースとして分断されます。

### 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/extend/dogstatsd
[2]: /ja/metrics/custom_metrics/
[3]: /ja/integrations/azure/
[4]: /ja/help
[5]: https://app.datadoghq.com/integrations/azure
[6]: /ja/profiler/