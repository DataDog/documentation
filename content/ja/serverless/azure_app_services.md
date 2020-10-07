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
- ログは [Eventhub または Blob ストレージ][3]経由で送信可能です。

Datadog の Azure App Service 向け拡張機能は、[Azure Web Apps][4] の追加モニタリングもサポートしています。これには以下の機能が含まれます。

- 自動インスツルメンテーションを用いた、完全分散型の APM トレーシング。
- スパンのカスタマイズが可能な、手動 APM インスツルメンテーション機能。
- アプリケーションログへの `Trace_ID` 挿入。

## セットアップ

### 要件

Datadog .NET APM 拡張機能は、Windows インスタンス上で稼働する x64 と x86 アーキテクチャの双方で以下の .NET ランタイムをサポートしています (AAS は Linux での拡張機能をサポートしていません) 。自動的にインスツルメントされたライブラリの詳細については、[トレーサーのドキュメント][5]を参照してください。

- .NET フレームワーク 4.7 以降
- .NET Core 2.1
- .NET Core 2.2 (Microsoft によるサポートは 2019 年 12 月 23 日に終了しました)
- .NET Core 3.0 (Microsoft によるサポートは 2020 年 3 月 3 日に終了しました)
- .NET Core 3.1

### インストール

1. [Azure ポータル][6]を開き、ダッシュボードで Datadog にインスツルメントしたい Azure App Service インスタンスを選択します。
2. 'Configuration' ページで 'Application settings' タブを開きます。
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="Configuration ページ" >}}
3. Datadog API キーに対応するアプリケーション設定 `DD_API_KEY` を追加し、[Datadog API キー][7]の値を設定します。
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="API キーページ" >}}
4. EU 版の Datadog サイト (datadoghq.eu ドメイン) をお使いの場合は、アプリケーション設定 `DD_SITE` を追加し、値に datadoghq.eu を設定してください。
    デフォルトでは、この拡張機能は US 版の Datadog サイト (datadoghq.com ドメイン) にデータを送信します。US 版の Datadog サイトをお使いの場合は、追加のアプリケーション設定は不要です。
5. 拡張機能ページで **Add** をクリックします。
6. Datadog APM 拡張機能を選択します。
    {{< img src="infrastructure/serverless/azure_app_services/extension.png" alt="Datadog 拡張機能" >}}
7. 規約に同意し、**OK** をクリックします。インストールは間もなく完了します。
8. メインのアプリケーションを再起動して **Stop** をクリックします。その後、完全にアプリケーションが停止してから **Start** をクリックします。
    {{< img src="infrastructure/serverless/azure_app_services/restart.png" alt="このページで停止および再起動を実行" >}}

### Azure Web Apps からのロギング

Azure Web Apps のログは、[Azure インテグレーションドキュメント][8] に記載するプロセスを使用して、Eventhub 経由で Datadog に送信できます。**注**: Eventhub はお使いの Web アプリケーションと同じリージョンに所在している必要があります。

Eventhub と Forwarder の機能設定が完了したら、Web アプリケーション向けの診断設定を作成します。以下のように、Datadog に送信したいログを選択します。

{{< img src="serverless/azure_diagnostics.png" alt="診断設定" >}}

アプリケーションに対するロギングパイプラインを構築したら、トレース ID を挿入して Datadog で[ログとトレースを接続][9]します。拡張機能でこれを有効にするには、アプリケーション設定 `DD_LOGS_INJECTION:true` を追加します。

**注**: トレース ID 挿入はアプリケーションの内部で実行されるため、トレース ID はアプリケーションログに含まれます。HTTP ログや監査ログなど、[Azure で利用可能な診断ログ][10]のその他のカテゴリにトレース ID が含まれることはありません。

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

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/integrations/azure_app_services/
[2]: /ja/integrations/azure_functions/
[3]: /ja/integrations/azure/?tab=azurecliv20#log-collection
[4]: https://azure.microsoft.com/en-us/services/app-service/web/
[5]: /ja/tracing/setup/dotnet/
[6]: https://portal.azure.com
[7]: https://app.datadoghq.com/account/settings#api
[8]: /ja/integrations/azure/?tab=eventhub#log-collection
[9]: /ja/tracing/connect_logs_and_traces/
[10]: https://docs.microsoft.com/en-us/azure/app-service/troubleshoot-diagnostic-logs
[11]: /ja/help/