---
title: Microsoft Azure App Service 拡張機能
kind: ドキュメント
aliases:
  - /ja/infrastructure/serverless/azure_app_services/
further_reading:
  - link: /integrations/azure_app_services/
    tag: Documentation
    text: Azure App Service
  - link: /integrations/azure_app_service_environment/
    tag: Documentation
    text: Azure App Service Environment
---
<div class="alert alert-warning"> このサービスは公開ベータ版です。フィードバックがございましたら、<a href="/help">Datadog サポートチーム</a>までお寄せください。ベータ期間中は、この拡張機能に対する従量制課金は発生しません。</div>

## 概要

Microsoft Azure App Service は、インフラストラクチャーを管理せずに Web アプリやモバイルバックエンド、イベント駆動型関数、RESTful API の構築とホスティングを行うことが可能な統合型のサーバーレスリソースです。あらゆる規模のワークロードのホスティングのほか、オートスケーリングと高可用性オプションにも対応しています。

Datadog では Azure App Service に属するすべてのリソースタイプのモニタリングが可能です。

- [Azure インテグレーション][1]を使用した[アプリ][1]および[関数][2]向けの Azure Monitor メトリクス。
- カスタムメトリクスは API 経由で送信可能です。
- [リソースログ][3]は [Event Hub][4] 経由で送信可能です。

Datadog の Azure App Service 向け拡張機能は、[Azure Web Apps][5] の追加モニタリングもサポートしています。これには以下の機能が含まれます。

- 自動インスツルメンテーションを用いた、完全分散型の APM トレーシング。
- スパンのカスタマイズが可能な、手動 APM インスツルメンテーション機能。
- アプリケーションログへの `Trace_ID` 挿入。
- [DogStatsD][6] を使用したカスタムメトリクス送信のサポート。

## セットアップ

### 要件

[Microsoft Azure インテグレーション][7]をまだセットアップしていない場合は、最初にセットアップします。

Datadog .NET APM 拡張機能は、Windows インスタンス上で稼働する x64 と x86 アーキテクチャの双方で以下の .NET ランタイムをサポートします (AAS は Linux での拡張機能をサポートしていません) 。自動的にインスツルメントされたライブラリの詳細については、[トレーサーのドキュメント][8]を参照してください。

- .NET フレームワーク 4.7 以降
- .NET Core 2.1
- .NET Core 2.2 (Microsoft によるサポートは 2019 年 12 月 23 日に終了しました)
- .NET Core 3.0 (Microsoft によるサポートは 2020 年 3 月 3 日に終了しました)
- .NET Core 3.1

### インストール

1. [Azure Portal][9] を開き、ダッシュボードで Datadog にインスツルメントしたい Azure App Service インスタンスを選択します。
2. 'Configuration' ページで 'Application settings' タブを開きます。
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="Configuration ページ" >}}
3. Datadog API キーに対応するアプリケーション設定 `DD_API_KEY` を追加し、[Datadog API キー][10]の値を設定します。
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="API キーページ" >}}
4. `DD_SITE` を `{{< region-param key="dd_site" code="true" >}}` に設定します。デフォルトは `datadoghq.com`。
5. 拡張機能ページで **Add** をクリックします。
6. Datadog APM 拡張機能を選択します。
    {{< img src="infrastructure/serverless/azure_app_services/extension.png" alt="Datadog 拡張機能" >}}
7. 規約に同意し、**OK** をクリックします。インストールは間もなく完了します。
8. メインのアプリケーションを再起動して **Stop** をクリックします。その後、完全にアプリケーションが停止してから **Start** をクリックします。
    {{< img src="infrastructure/serverless/azure_app_services/restart.png" alt="このページで停止および再起動を実行" >}}

### Azure Web Apps からのアプリケーションロギング

Azure App Services のアプリケーションから Datadog へログを送信するには、Serilog を使用する必要があります。このメソッドでログを送信すると、トレース ID の挿入が可能になり、Datadog でログとトレースを関連付けられるようになります。拡張機能によるトレース ID の挿入を有効にするには、アプリケーション設定 `DD_LOGS_INJECTION:true` を追加します。

**注**: これはお使いのアプリケーション内で行われるため、診断設定によって送信される Azure プラットフォームのログにトレース ID は含まれません。

[Datadog Serilog シンク][11] NuGet パッケージをインストールします。これにより、イベントとログが Datadog に送信されます。デフォルトでは、ポート 443 の HTTPS 経由でシンクがログを転送します。アプリケーションのパッケージマネージャーコンソールで、次のコマンドを実行します。

```
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

次に、アプリケーションでロガーを直接初期化します。 `<DD_API_KEY>` は、お使いの [Datadog API キー][10]に置き換えます。

```
using Serilog;
using Serilog.Sinks.Datadog.Logs;

          Serilog.Log.Logger = new LoggerConfiguration()
              .WriteTo.DatadogLogs("<DD_API_KEY>")
              .Enrich.FromLogContext()
              .CreateLogger();
```

デフォルトの動作を上書きして、必須プロパティ url、port、useSSL、useTCP を手動で指定することで、TCP でログを転送することもできます。また、オプションで、[source、service、カスタムタグ][12]を指定できます。

たとえば、TCP で Datadog US リージョンにログを転送する場合は、次のようなシンクコンフィギュレーションを使用します。

{{< code-block lang="text" wrap="false" disable_copy="true" >}}
using Serilog; 
using Serilog.Sinks.Datadog.Logs;

          var config = new DatadogConfiguration(
              url:"https://http-intake.logs.datadoghq.com", 
              port:10516, 
              useSSL:true, 
              useTCP:false);

          Serilog.Log.Logger = new LoggerConfiguration()
              .WriteTo.DatadogLogs(
                  "eb7c615e5fca779871203b7de9209b6c",
                  source: "<SOURCE_NAME>",
                  service: "<SERVICE_NAME>",
                  tags: new string[] { "<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>" },
                  configuration: config
              )
              .Enrich.FromLogContext()
              .CreateLogger();
{{< /code-block >}}

これで、新しいログが Datadog に直接送信されるようになります。

または、0.2.0 以降、Serilog.Setting.Configuration NuGet パッケージで `appsettings.json` ファイルを使用して Datadog シンクを構成できます。

`Serilog.WriteTo()` 配列で、DatadogLogs のエントリを追加します。以下に例を示します。

```json
"Serilog": {
  "Using": [ "Serilog.Sinks.Console", "Serilog.Sinks.Datadog.Logs" ],
  "MinimumLevel": "Debug",
  "WriteTo": [
    { "Name": "Console" },
    {
      "Name": "DatadogLogs",
      "Args": {
        "apiKey": "<API_キー>",
        "source": "<ソース名>",
        "host": "<ホスト名>",
        "tags": ["<タグ_1>:<値_1>", "<タグ_2>:<値_2>"],
      }
    }
  ],
  "Enrich": [ "FromLogContext", "WithMachineName", "WithThreadId" ],
  "Properties": {
    "Application": "Sample"
  }
}
```

## DogStatsD とカスタムメトリクス

バージョン `0.3.14-prerelease` 以降、App Services 拡張には [DogStatsD][6] (Datadog のメトリクス集計サービス) のインスタンスが含まれます。これにより、拡張機能でカスタムメトリクス、サービスチェック、イベントを Azure Web Apps から直接 Datadog へ送信できます。

ウェブアプリにカスタムメトリクスやチェックを作成することは、Datadog Agent を実行しているホスト上のアプリケーションで書き込むプロセスと同様です。ただし、拡張機能により自動的に実行されるため、ポートを構成する必要がないという違いがあります。拡張機能を使用してカスタムメトリクスを Azure App Services から Datadog へ送信するには、以下を実行します。

1. [DogStatsD Nuget パッケージ][13]を Visual Studio プロジェクトに追加します。
2. アプリケーション内で [DogStatdD を初期化し、カスタムメトリクスを作成][14]します。
3. サポートされている Azure .NET ウェブアプリにコードをデプロイします。
4. Datadog App Service 拡張機能をインストールします。

[カスタムメトリクス][15]の詳細。

## トラブルシューティング

### 500 番台のエラー

インストール直後にアプリで 500 番台のエラーが発生したら、まずはアプリケーションが完全に停止した状態で再起動を行ってください。操作は以下の通りです。

1. アプリケーションを停止します。
2. Datadog 拡張機能を削除します。
3. Datadog 拡張機能を再インストールします。
4. アプリケーションを再起動します。

通常はアプリを停止し、再インストールを行うことで問題の解決が可能です。しかし、その後も引き続き 500 番台のエラーが発生する場合は、有効化したデバッグ設定関連でアプリケーションの起動時間が遅延し、結果としてエラーにつながっている可能性があります。この場合は以下の方法もお試しください。

- ロギングおよびアプリケーション設定を調整する
- アプリケーションをさらに強力な App Service のプランへ移行する

### トレースの消失

トレースが消失している、またはトレースが全く受信できない場合は、ポート設定が手動で変更されていないかをご確認ください。拡張機能においては、Tracer Agent がアプリケーションと通信し、外部トラフィック向けに使用可能な正しいポートを特定します。手動でポートを設定すると、このプロセスが阻害されてトレースの消失につながる可能性があります。

ご不明な点は、[Datadog のサポートチーム][16]までお問合せください。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/integrations/azure_app_services/
[2]: /ja/integrations/azure_functions/
[3]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/resource-logs
[4]: /ja/integrations/azure/?tab=eventhub#log-collection
[5]: https://azure.microsoft.com/en-us/services/app-service/web/
[6]: /ja/developers/dogstatsd
[7]: /ja/integrations/azure
[8]: /ja/tracing/setup/dotnet/
[9]: https://portal.azure.com
[10]: https://app.datadoghq.com/account/settings#api
[11]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[12]: /ja/logs/log_collection/#reserved-attributes
[13]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
[14]: /ja/developers/dogstatsd/?tab=net#code
[15]: developers/metrics/
[16]: /ja/help