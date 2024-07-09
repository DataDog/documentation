---
aliases:
- /ja/infrastructure/serverless/azure_app_services/
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentation
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentation
  text: Azure App Service Environment
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: ブログ
  text: Azure App Service の Datadog 拡張機能で Monitor .NET ウェブアプリを監視
- link: https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler-what-is-considered-as-a-host-for-azure-app-services
  tag: 料金
  text: Azure App Service APM 価格設定
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: ブログ
  text: ASP.NET Core アプリケーションを Azure App Service にデプロイする
title: Azure App Service - Windows コード
---

## 概要

Datadog の Azure App Service 向け拡張機能は、追加モニタリングもサポートしています。

- 自動インスツルメンテーションを用いた、完全分散型の APM トレーシング。
- カスタマイズされた APM サービスとトレースビューは、関連する Azure App Service のメトリクスとメタデータを表示します。
- スパンのカスタマイズが可能な、手動 APM インスツルメンテーション機能。
- アプリケーションログへの `Trace_ID` 挿入。
- [DogStatsD][1] を使用したカスタムメトリクス送信のサポート。

## セットアップ

{{< tabs >}}
{{% tab ".NET" %}}

### 要件

1. [Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

2. この拡張機能は、以下のリソースタイプに対応しています。
    - Azure App Service Web Apps
    - Basic、Standard、Premium プランでホストされている Function App。

    <div class="alert alert-warning">消費プランの Function App には対応していません。他の App Service リソースタイプやランタイムのサポートに興味がありますか？ベータ版が利用可能になったら、<a href="https://forms.gle/n4nQcxEyLqDBMCDA7">サインアップ</a>してお知らせを受け取りましょう。</div>

3. Datadog .NET APM 拡張機能は、Windows OS 上で稼働する x64 と x86 アーキテクチャの双方で以下の .NET ランタイムをサポートします (AAS は Linux での拡張機能をサポートしていません) 。自動的にインスツルメントされたライブラリの詳細については、[トレーサーのドキュメント][2]を参照してください。

    - .NET フレームワーク 4.6.1 以降
    - .NET Core 2.1
    - .NET Core 2.2 (Microsoft によるサポートは 2019 年 12 月 23 日に終了しました)
    - .NET Core 3.0 (Microsoft によるサポートは 2020 年 3 月 3 日に終了しました)
    - .NET Core 3.1
    - .NET 5
    - .NET 6

4. Datadog では、機能の最適なパフォーマンス、安定性、そして可用性を確保するため、拡張機能の最新バージョンへの定期的な更新を推奨しています。初期インストールおよびその後の更新を正常に完了するには、ウェブアプリを一度完全に停止する必要があります。

**注**: Datadog の自動インスツルメンテーションは、.NET CLR Profiling API に依存します。この API に許可されるサブスクライバーは 1 つのみです（たとえば Datadog の .NET トレーサーでプロファイラーを有効にした状態）。可視性を最大限に向上するため、アプリケーション環境内で 1 つの APM ソリューションのみを実行してください。

v2.3.0 以降、.NET 拡張機能はセマンティックバージョニングに依存しなくなりました。拡張機能は次のスキームを使用します: `x.y.zAA` ここで、`x.y.z` は .Net Tracer バージョンであり、` AA` は拡張機能専用です。`zAA` の先行ゼロは、NuGet パッケージによってトリミングされるため、バージョンは ` x.y.A` になります。

例:

- 拡張機能 `2.3.0` は Tracer v`2.3.0` を使用します
- 拡張機能 `2.3.1` は Tracer v`2.3.0` を使用します
- 拡張機能 `2.3.2` は Tracer v`2.3.0` を使用します
- 拡張機能 `2.3.100` は Tracer v`2.3.1` を使用します
- 拡張機能 `2.3.101` は Tracer v`2.3.1` を使用します
- 拡張機能 `2.3.200` は Tracer v`2.3.2` を使用します

### インストール

1. Web アプリや関数を監視するために [Azure インテグレーション][1]を構成します。Datadog で対応する `azure.app_services.count` または `azure.functions.count` メトリクスが表示されることを確認し、正しく設定されていることを確認します。**注**: このステップは、メトリクス/トレースの相関、関数トレースパネル表示、および Azure App Services で Datadog を使用する際の全体的なエクスペリエンスを向上させるために重要です。

2. [Azure Portal][3] を開き、Datadog でインスツルメントする Azure アプリのダッシュボードに移動します。

**注**: Azure Native インテグレーションをご利用のお客様は、Azure の Datadog リソースを使用して、拡張機能を .NET アプリに追加することができます。手順については、Datadog の [Azure Portal ガイド][13]の [App Service 拡張機能のセクション][12]を参照してください。

3. 'Configuration' ページで 'Application settings' タブを開きます。
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="Configuration ページ" >}}
4. Datadog API キーに対応するアプリケーション設定 `DD_API_KEY` を追加し、[Datadog API キー][4]の値を設定します。
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="API キーページ" >}}
5. 任意のアプリケーション設定を構成します。
    - `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定（デフォルトは `datadoghq.com`）。
    - トレースとカスタム統計をグループ化するには `DD_ENV` を設定します。
    - `DD_SERVICE` を設定してサービス名を指定します（デフォルトはアプリ名）。
    - アプリからのアプリケーションログと相関するよう `DD_LOGS_INJECTION:true` を設定します。
    - .NET [Continuous Profiler][5] (公開ベータ版) を有効にするには、`DD_PROFILING_ENABLED:true` を設定します。
    - [任意のコンフィギュレーション変数][6]の全リストをご参照ください。
6. **Save** をクリック（アプリケーションが再起動します）。
7. <div class="alert alert-warning">[必須] <u>Stop</u> をクリックしてアプリケーションを停止します。</div>
8. Azure 拡張機能ページで Datadog APM 拡張機能を選択します。
    {{< img src="infrastructure/serverless/azure_app_services/choose_extension.png" alt="Datadog 拡張機能" >}}
9. 法的事項を承諾し、**OK** をクリックしてインストールの完了を待機します。**注**: このステップを正常に完了するには、アプリが停止した状態である必要があります。
10. **Start** をクリックして、メインアプリケーションを起動します。
    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="起動" >}}

### アプリケーションロギング

Azure App Service のアプリケーションから Datadog にログを送信するには、以下のいずれかの方法があります。
1. [自動インスツルメンテーションによるエージェントレスロギング][7]
2. [Serilog シンクによるエージェントレスロギング][8]

どちらの方法でもトレース ID の挿入が可能で、Datadog のログとトレースを連携させることができます。拡張機能でトレース ID の挿入を有効にするには、アプリケーション設定 `DD_LOGS_INJECTION:true` を追加してください。

**注**: この動作はアプリケーション内で発生するため、診断設定で送信する Azure Platform ログはトレース ID には含まれません。

### DogStatsD を使用したカスタムメトリクス

Azure App Service の拡張機能には、[DogStatsD][9] (Datadog のメトリクス集計サービス) のインスタンスが含まれます。拡張機能を利用して、Azure Web Apps および Functions から Datadog へ直接カスタムメトリクス、サービスチェック、イベントを送信できます。

Azure App Service でカスタムメトリクスおよびチェックを書き込むことは、Datadog Agent が実行されているホスト上のアプリケーションでそれを実行するプロセスと同様です。拡張機能を使用して Azure App Service から Datadog へカスタムメトリクスを送信するには、以下を実行します。

1. [DogStatsD NuGet パッケージ][10]を Visual Studio プロジェクトに追加します。
2. アプリケーション内で DogStatsD を初期化し、カスタムメトリクスを作成します。
3. Azure App Service にコードをデプロイします。
4. Datadog App Service 拡張機能をインストールします。

**注**: [標準的な DogStatsD コンフィグプロセス][11]とは異なり、DogStatsD のコンフィギュレーションを開始するのにポートやサーバー名の設定は必要ありません。Azure App Service にはアンビエント環境変数があり、メトリクスの送信条件を決定します（DogStatsD クライアントには v6.0.0 以上が必要）。

メトリクスを送信するには、以下のコードを使用します。

```csharp
// DogStatsd クライアントと、任意のタグを構成します
if (!DogStatsd.Configure(new StatsdConfig() { ConstantTags = new[] { "app:sample.mvc.aspnetcore" } }))
{
    // 必要な環境変数がない場合、`Configure` は false を返します.
    // 以下の環境変数は Azure App Service に存在しますが、
    // カスタムメトリクスをテストするために設定される必要があります: DD_API_KEY:{api_key}, DD_AGENT_HOST:localhost
    // 使用環境に合わせてエラーを無視またはログに記録します
    Console.WriteLine("Cannot initialize DogstatsD.");
}

// メトリクスを送信します
DogStatsd.Increment("sample.startup");
```

**注**: カスタムメトリクスのみを送信する場合 (トレースを無効にする場合)、アプリケーションの設定で次の変数を設定します。
  - `DD_TRACE_ENABLED` を `false` に設定します。
  - `DD_AAS_ENABLE_CUSTOM_METRICS` を `true` に設定します。
[カスタムメトリクス][12]に関する詳細を参照してください。


[1]: /ja/integrations/azure
[2]: /ja/tracing/setup/dotnet/
[3]: https://portal.azure.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /ja/profiler/
[6]: /ja/tracing/trace_collection/library_config/dotnet-framework/#additional-optional-configuration
[7]: /ja/logs/log_collection/csharp/#agentless-logging-with-apm
[8]: /ja/logs/log_collection/csharp/#agentless-logging-with-serilog-sink
[9]: /ja/developers/dogstatsd
[10]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
[11]: /ja/developers/dogstatsd/?tab=net#code
[12]: /ja/metrics/
[13]: /ja/integrations/guide/azure-portal/#app-service-extension
[14]: /ja/integrations/guide/azure-portal/
{{% /tab %}}
{{% tab "Java" %}}
### 要件

1. [Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

2. 拡張機能では、Azure App Service Web Apps がサポートされます。Function Apps はサポートされません。
    <div class="alert alert-warning">Support for Java Web Apps is in beta for extension v2.4+. There are no billing implications for tracing Java Web Apps during this period.<br/><br/>
    Interested in support for other App Service resource types or runtimes? <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Sign up</a> to be notified when a beta becomes available.</div>

3. Datadog Java APM 拡張機能は、Windows OS 上のすべての Java ランタイムをサポートします。Azure App Service は、Linux 上の拡張機能をサポートしていません。自動インスツルメンテーションされたライブラリの詳細については、[トレーサードキュメント][2]を参照してください。

4. Datadog では、機能の最適なパフォーマンス、安定性、そして可用性を確保するため、拡張機能の最新バージョンへの定期的な更新を推奨しています。初期インストールおよびその後の更新を正常に完了するには、ウェブアプリを一度完全に停止する必要があります。

### インストール

1. Web アプリや関数を監視するために [Azure インテグレーション][1]を構成します。Datadog で対応する `azure.app_service.count` または `azure.functions.count` メトリクスが表示されることを確認し、正しく設定されていることを確認します。**注**: このステップは、メトリクス/トレースの相関関係、機能的なトレース・パネル表示、Datadog サイトでの様々な壊れたユーザー体験の回避のために重要です。

2. [Azure Portal][3] を開き、Datadog でインスツルメントする Azure Web App のダッシュボードに移動します。

3. 'Configuration' ページで 'Application settings' タブを開きます。
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="Configuration ページ" >}}
4. Datadog API キーに対応するアプリケーション設定 `DD_API_KEY` を追加し、[Datadog API キー][4]の値を設定します。
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="API キーページ" >}}
5. 任意のアプリケーション設定を構成します。
    - `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定（デフォルトは `datadoghq.com`）。
    - トレースとカスタム統計をグループ化するには `DD_ENV` を設定します。
    - `DD_SERVICE` を設定してサービス名を指定します（デフォルトはウェブアプリ名）。
    - [任意のコンフィギュレーション変数][5]の全リストをご参照ください。
6. **Save** をクリック（アプリケーションが再起動します）。
7. <div class="alert alert-warning">[必須] <u>Stop</u> をクリックしてアプリケーションを停止します。</div>
8. Azure 拡張機能ページで Datadog APM 拡張機能を選択します。
9. 法的事項を承諾し、**OK** をクリックしてインストールの完了を待機します。**注**: このステップを正常に完了するには、ウェブアプリが停止した状態である必要があります。
10. **Start** をクリックして、メインアプリケーションを起動します。
    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="起動" >}}

### Azure Web Apps からのアプリケーションロギング

Azure App Service のアプリケーションから Datadog にログを送信するには、アプリから Datadog に直接ログをストリーミングする必要があります。この方法でログを送信すると、トレース ID の挿入が可能になり、Datadog でログとトレースの紐付けができるようになります。

**注**: トレース ID の挿入は、アプリケーションの内部で行われます。Azure Resource ログは、管理プレーンの Azure によって生成されるため、トレース ID は含まれません。

Azure App Service で Java のアプリケーションログを構成するには、[Java によるエージェントレスログ][6]の説明を参照してください。

### DogStatsD を使用したカスタムメトリクス

Azure App Service の拡張機能には、[DogStatsD][7] (Datadog のメトリクス集計サービス) のインスタンスが含まれます。拡張機能を利用して、Azure Web Apps から Datadog へ直接カスタムメトリクス、サービスチェック、イベントを送信できます。

この環境でカスタムメトリクスおよびチェックを書き込むことは、Datadog Agent が実行されている標準ホスト上のアプリケーションでそれを実行するプロセスと同様です。拡張機能を使用して Azure App Service から Datadog へカスタムメトリクスを送信するには、以下を実行します。

1. [DogStatsD クライアント][8]をプロジェクトに追加します。
2. アプリケーション内で DogStatsD を初期化し、カスタムメトリクスを作成します。
3. サポートされている Azure ウェブアプリにコードをデプロイします。
4. Datadog App Service 拡張機能をインストールします。

**注**: [標準的な DogStatsD コンフィグプロセス][9]とは異なり、DogStatsD のコンフィギュレーションを開始するのにポートやサーバー名の設定は必要ありません。Azure App Service にはアンビエント環境変数があり、メトリクスの送信条件を決定します（DogStatsD クライアントには v6.0.0 以上が必要）。

メトリクスを送信するには、以下のコードを使用します。

```java
// DogStatsd クライアントの構成と、任意のタグの構成
StatsDClient client = new NonBlockingStatsDClientBuilder()
                            .constantTags("app:sample.service")
                            .build();
// メトリクスを送信する
client.Increment("sample.startup");
```

[カスタムメトリクス][10]に関する詳細を参照してください。

[1]: /ja/integrations/azure
[2]: /ja/tracing/setup/java/
[3]: https://portal.azure.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /ja/tracing/trace_collection/library_config/dotnet-framework/#additional-optional-configuration
[6]: /ja/logs/log_collection/csharp/?tab=serilog#agentless-logging
[7]: /ja/developers/dogstatsd
[8]: https://search.maven.org/artifact/com.datadoghq/java-dogstatsd-client
[9]: /ja/developers/dogstatsd/?tab=java#code
[10]: /ja/metrics/
{{% /tab %}}
{{< /tabs >}}

## プログラムマネジメント

{{< tabs >}}
{{% tab ".NET" %}}

Datadog では、Powershell を使用して Azure App Service Extension をアップデートまたはインストールするためのスクリプトを提供しています。スクリプトによる拡張機能管理では、[リソースグループによる拡張機能の一括更新](#powershell-resource-group)や[サイト拡張機能の特定バージョンのインストールを指定する](#powershell-specific-version)ことができます。また、スクリプトを使って CI/CD パイプラインにプログラム的に拡張機能を追加したり、すでにインストールされている拡張機能を発見して更新したりすることもできます。

### 前提条件

- [Azure CLI][1] または [Azure Cloud Shell][2]。
- Azure App Service の[ユーザースコープの資格情報][3]を使用します。資格情報をお持ちでない場合は、[Azure ポータル][4]から Web App または Function App にアクセスしてください。**Deployment** > **Deployment Center** に移動して、ユーザースコープの資格情報を作成または取得します。

### 初めて拡張機能をインストールする{#powershell-first-time}



インストールスクリプトは、Azure Web App または Azure Function App に最新バージョンの拡張機能を追加します。これは、リソース グループ レベルではなく、アプリ単位で発生します。

1. Azure CLI または Azure Cloud Shell を開きます。
2. 以下のコマンドで、インストールスクリプトをダウンロードします。

    ```
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. 必要に応じて必要な引数とオプションの引数を渡し、以下のコマンドを実行します。

    ```
    .\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -DDSite <DATADOG_SITE> -DDEnv <DATADOG_ENV> -DDService <DATADOG_SERVICE> -DDVersion <DATADOG_VERSION>
    ```

**注**: 上記コマンドには、以下の引数が必要です。

- `<USERNAME>`: Azure ユーザースコープのユーザー名です。
- `<PASSWORD>`: Azure ユーザースコープのパスワードです。
- `<SUBSCRIPTION_ID>`: Azure [サブスクリプション ID][5] です。
- `<RESOURCE_GROUP_NAME>`: Azure のリソースグループ名です。
- `<SITE_NAME>`: アプリの名前です。
- `<DATADOG_API_KEY>`: [Datadog API キー][6]です。

また、`DATADOG_SITE` を [Datadog サイト][7]に設定します。`DATADOG_SITE` のデフォルトは ` datadoghq.com` です。あなたのサイトは次のとおりです: {{< region-param key="dd_site" code="true" >}}




### リソースグループの拡張機能を更新する{#powershell-resource-group}


更新スクリプトは、リソースグループ全体に適用されます。このスクリプトは、拡張機能がインストールされているすべての Web App または Function App を更新します。Datadog 拡張機能がインストールされていない App Service アプリは、影響を受けません。

1. Azure CLI または Azure Cloud Shell を開きます。
2. 以下のコマンドでアップデートスクリプトをダウンロードします。

    ```
    $baseUri="https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension"; Invoke-WebRequest -Uri "$baseUri/update-all-site-extensions.ps1" -OutFile "update-all-site-extensions.ps1"; Invoke-WebRequest -Uri "$baseUri/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. 以下のコマンドを実行します。引数はすべて必須です。

    ```
    .\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD>
    ```



### 特定のバージョンの拡張機能をインストールする{#powershell-specific-version}

Azure App Service UI は、拡張機能の特定のバージョンをインストールする機能をサポートしていません。インストールまたは更新スクリプトを使用して、これを行うことができます。


#### 特定のバージョンを単一のリソースにインストールする

特定のバージョンを単一のインスタンスにインストールするには、[拡張機能を初めてインストールする際の手順](#powershell-first-time)に従って、インストールコマンドに `-ExtensionVersion` パラメーターを追加してください。

```
.\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -ExtensionVersion <EXTENSION_VERSION>
```

`<EXTENSION_VERSION>` をインストールしたい拡張機能のバージョンに置き換えます。例: `1.4.0`

#### リソースグループ全体に特定のバージョンをインストールする

リソースグループに特定のバージョンをインストールするには、[リソースグループの拡張機能を更新する際の手順](#powershell-resource-group)に従い、インストールコマンドに `-ExtensionVersion` パラメーターを追加してください。

```
.\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD> -ExtensionVersion <EXTENSION_VERSION>
```

`<EXTENSION_VERSION>` をインストールしたい拡張機能のバージョンに置き換えます。例: `1.4.0`

### ARM テンプレート

多くの組織では、[Azure Resource Management (ARM) テンプレート][8]を使用して infrastructure-as-code の実践を実施しています。これらのテンプレートに App Service Extension を構築するには、デプロイメントに [Datadog の App Service Extension ARM テンプレート][9]を組み込み、App Service リソースと一緒に拡張機能を追加して構成します。

[1]: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
[2]: https://docs.microsoft.com/en-us/azure/cloud-shell/overview
[3]: https://docs.microsoft.com/en-us/azure/app-service/deploy-configure-credentials
[4]: https://portal.azure.com/
[5]: https://docs.microsoft.com/en-us/azure/media-services/latest/setup-azure-subscription-how-to
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /ja/getting_started/site/
[8]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview
[9]: https://github.com/DataDog/datadog-aas-extension/tree/master/ARM
[10]: https://learn.microsoft.com/en-us/azure/templates/microsoft.datadog/monitors?pivots=deployment-language-arm-template
{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-warning">Java Web Apps のサポートは、拡張機能 v2.4+ のベータ版です。プログラムによる管理は、Java Web Apps では利用できません。<br/><br/>
   他の App Service リソースタイプやランタイムのサポートに興味がありますか？ベータ版が利用可能になったら、<a href="https://forms.gle/n4nQcxEyLqDBMCDA7">サインアップ</a>してお知らせを受け取りましょう。</div>

{{% /tab %}}
{{< /tabs >}}

## トラブルシューティング

### サーバーレスビューでアプリの設定ミスが確認された場合、またはトレースに対応するメトリクスが見つからない場合

アプリケーションを監視するための Azure インテグレーションが構成されていない可能性があります。適切に構成することで、Datadog プラットフォームでメトリクス、トレース、ログを相関させる能力が向上します。Azure インテグレーションが構成されていないと、トレースの重要なコンテキストが失われます。これを解決するには:

1. Azure インテグレーションタイルに移動します。

2. アプリケーションが動作している Azure サブスクリプションの [Azureインテグレーション][2]がインストールされていることを確認します。

3. 適用した App Service プランのフィルタリングルールが、アプリが実行されている App Service プランを含んでいることを確認してください。App Service プランが含まれていない場合、そのプランでホストされているすべてのアプリと機能も含まれません。アプリ自体のタグは、Datadog によるフィルタリングに使用されません。


### APM のトレースが Datadog に表示されない場合

1. `DD_SITE` および `DD_API_KEY` が正しく設定されていることを確認します。

2. アプリケーションを完全に停止してから起動します。

3. 解決しない場合は、拡張機能をアンインストールしてから再度インストールします（これにより、最新バージョンの実行も確認できます）。

**注**: サポートチームによるアプリケーションのエラー調査を迅速に進めるには、`DD_TRACE_DEBUG:true` を設定し、Datadog ログディレクトリのコンテンツ(`%AzureAppServiceHomeDirectory%\LogFiles\datadog`) をメールに追加します。

さらにヘルプが必要な場合は、[Datadog サポート][3]までお問い合わせください。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/developers/dogstatsd
[2]: /ja/integrations/azure
[3]: /ja/help