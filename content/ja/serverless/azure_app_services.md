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
  - link: 'https://www.datadoghq.com/blog/azure-app-service-extension/'
    tag: ブログ
    text: Azure App Service の Datadog 拡張機能で Monitor .NET ウェブアプリを監視
  - link: 'https://www.datadoghq.com/pricing/?product=apm#apm-what-is-considered-as-a-host-for-azure-app-services'
    tag: 料金
    text: Azure App Service APM 価格設定
---
## 概要

Microsoft [Azure App Service][1] は、インフラストラクチャーを管理せずに Web アプリやモバイルバックエンド、イベント駆動型関数、RESTful API の構築とホスティングを行うことが可能な統合型のサーバーレスリソースです。あらゆる規模のワークロードのホスティングのほか、オートスケーリングと高可用性オプションにも対応しています。

Datadog では Azure App Service に属するすべてのリソースタイプのモニタリングが可能です。

- [Azure インテグレーション][2]を使用した[アプリ][2]および[関数][3]向けの Azure Monitor メトリクス。
- カスタムメトリクスは API 経由で送信可能です。
- [リソースログ][4]は [Event Hub][5] 経由で送信可能です。

Datadog の Azure App Service 向け拡張機能は、[Azure Web Apps][6] の追加モニタリングもサポートしています。これには以下の機能が含まれます。

- 自動インスツルメンテーションを用いた、完全分散型の APM トレーシング。
- スパンのカスタマイズが可能な、手動 APM インスツルメンテーション機能。
- アプリケーションログへの `Trace_ID` 挿入。
- [DogStatsD][7] を使用したカスタムメトリクス送信のサポート。

## セットアップ

### 要件

1. [Microsoft Azure インテグレーション][8]をまだセットアップしていない場合は、最初にセットアップします。

2. Datadog .NET APM 拡張機能は、Windows インスタンス上で稼働する x64 と x86 アーキテクチャの双方で以下の .NET ランタイムをサポートします (AAS は Linux での拡張機能をサポートしていません) 。自動的にインスツルメントされたライブラリの詳細については、[トレーサーのドキュメント][9]を参照してください。

    - .NET フレームワーク 4.5 以降
    - .NET Core 2.1
    - .NET Core 2.2 (Microsoft によるサポートは 2019 年 12 月 23 日に終了しました)
    - .NET Core 3.0 (Microsoft によるサポートは 2020 年 3 月 3 日に終了しました)
    - .NET Core 3.1
    - .NET 5

3. Datadog では、機能の最適なパフォーマンス、安定性、そして可用性を確保するため、拡張機能の最新バージョンへの定期的な更新を推奨しています。初期インストールおよびその後の更新には、ウェブアプリの再起動が必要です。。

**注**: Datadog 自動インスツルメンテーションは、.NET CLR Profiling API に依存します。この API に許可されるサブスクライバーは 1 つのみです（たとえば APM）。可視性を最大限に向上するため、アプリケーション環境内で 1 つの APM ソリューションのみを実行してください。

### インストール

1. Azure インテグレーションを構成してウェブアプリを監視し、ウェブアプリケーションの名前がタグ付けされた `azure.app_service.count` メトリクスが表示されることで適切に構成されたことを確認します。**注**: これは、メトリクス/トレースの相関、Datadog ポータルの機能的トレースパネルビュー、そして正確な請求に重要なステップです。

2. [Azure Portal][10] を開き、Datadog でインスツルメントする Azure App Services インスタンスのダッシュボードに移動します。

3. 'Configuration' ページで 'Application settings' タブを開きます。
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="Configuration ページ" >}}
4. Datadog API キーをアプリケーション設定の `DD_API_KEY` として追加し、[Datadog API キー][11]の値を追加します。
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="API キーページ" >}}
5. 任意のアプリケーション設定を構成します。
    - `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定（デフォルトは `datadoghq.com`）。
    - トレースとカスタム統計をグループ化するには `DD_ENV` を設定します。
    - `DD_SERVICE` を設定してサービス名を指定します（デフォルトはウェブアプリ名）。
    - ウェブアプリからのアプリケーションログと相関するよう `DD_LOGS_INJECTION:true` を設定します。
    - [任意のコンフィギュレーション変数][12]の全リストをご参照ください。
6. **Save** をクリック（アプリケーションが再起動します）。
7. **Stop** をクリックしてアプリケーションを停止します。このステップは必須です。実行しないと、インストールが完了しません。
8. Azure 拡張機能ページで Datadog APM 拡張機能を選択します。
    {{< img src="infrastructure/serverless/azure_app_services/choose_extension.png" alt="Datadog 拡張機能" >}}
9. 法的事項を承諾し、**OK** をクリックしてインストールの完了を待機します。**注**: このステップを正常に完了するには、ウェブアプリが停止した状態である必要があります。
10. **Restart** をクリックして、メインアプリケーションを起動します。
    {{< img src="infrastructure/serverless/azure_app_services/restart.png" alt="停止および再起動のページ" >}}

### Azure Web Apps からアプリケーションのログを記録

Azure App Services のアプリケーションから Datadog へログを送信するには、Serilog を使用する必要があります。このメソッドでログを送信すると、トレース ID の挿入が可能になり、Datadog でログとトレースを関連付けられるようになります。拡張機能によるトレース ID の挿入を有効にするには、アプリケーション設定 `DD_LOGS_INJECTION:true` を追加します。

**注**: この動作はアプリケーション内で発生するため、診断設定で送信する Azure Platform ログはトレース ID には含まれません。

詳しい手順は、[Serilog でエージェントレスロギングをセットアップ][13]するためのドキュメントを参照してください。

## DogStatsD を使用したカスタムメトリクス

App Services の拡張機能には、[DogStatsD][7] (Datadogのメトリクス集計サービス) のインスタンスが含まれます。拡張機能を利用して、Azure Web Apps から Datadog へ直接カスタムメトリクス、サービスチェック、イベントを送信できます。

ウェブアプリでカスタムメトリクスおよびチェックを書き込むことは、Datadog Agent が実行されているホスト上のアプリケーションでそれを実行するプロセスと同様です。拡張機能を使用して Azure App Services から Datadog へカスタムメトリクスを送信するには、以下を実行します。

1. [DogStatsD NuGet パッケージ][14]を Visual Studio プロジェクトに追加します。
2. アプリケーション内で DogStatdD を初期化し、カスタムメトリクスを作成します。
3. サポートされている Azure .NET ウェブアプリにコードをデプロイします。
4. Datadog App Service 拡張機能をインストールします。

**注**: [標準的な DogStatsD コンフィグプロセス][15]とは異なり、DogStatsD のコンフィギュレーションを開始するのにポートやサーバー名の設定は必要ありません。Azure App Service にはアンビエント環境変数があり、メトリクスの送信条件を決定します（DogStatsD クライアントには v6.0.0 以上が必要）。

メトリクスを送信するには、以下のコードを使用します。

```csharp
try
{
// DogStatsd クライアントと、任意のタグを構成します
DogStatsd.Configure(new StatsdConfig() { ConstantTags = new[] { "app:sample.mvc.aspnetcore" } });
}
catch (Exception ex)
{
// 必要な環境変数が存在しない場合、Configure 呼び出しにより例外がスローされます。
// 以下の環境変数は Azure App Services に存在しますが、
// カスタムメトリクスをテストするために設定される必要があります: DD_API_KEY:{api_key}, DD_AGENT_HOST:localhost
// 使用環境に合わせて例外を無視またはログに記録します
Console.WriteLine(ex);
}
// メトリクスを送信します
DogStatsd.Increment("sample.startup");
```

[カスタムメトリクス][16]に関する詳細を参照してください。

## トラブルシューティング

アプリケーションのトラブルシューティングをするには、以下のステップを試します。

1. `DD_SITE` および `DD_API_KEY` が正しく設定されていることを確認します。
2. アプリケーションを完全に停止してから起動します。
3. 解決しない場合は、拡張機能をアンインストールしてから再度インストールします（これにより、最新バージョンの実行も確認できます）。
4. さらにヘルプが必要な場合は、[Datadog サポート][17]までお問い合わせください。

**注**: サポートチームによるアプリケーションのエラー調査を迅速に進めるには、`DD_TRACE_DEBUG:true` を設定し、Datadog ログディレクトリのコンテンツ(`%AzureAppServiceHomeDirectory%\LogFiles\datadog`) をメールに追加します。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.microsoft.com/en-us/azure/app-service/
[2]: /ja/integrations/azure_app_services/
[3]: /ja/integrations/azure_functions/
[4]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/resource-logs
[5]: /ja/integrations/azure/?tab=eventhub#log-collection
[6]: https://azure.microsoft.com/en-us/services/app-service/web/
[7]: /ja/developers/dogstatsd
[8]: /ja/integrations/azure
[9]: /ja/tracing/setup/dotnet/
[10]: https://portal.azure.com
[11]: https://app.datadoghq.com/account/settings#api
[12]: /ja/tracing/setup_overview/setup/dotnet-framework/#additional-optional-configuration
[13]: /ja/logs/log_collection/csharp/?tab=serilog#agentless-logging
[14]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
[15]: /ja/developers/dogstatsd/?tab=net#code
[16]: /ja/developers/metrics/
[17]: /ja/help