---
further_reading:
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: ブログ
  text: Datadog で Azure App Service 上の Linux Web アプリを監視する
kind: documentation
title: Azure App Service - Linux コード
---
## 概要

このインスツルメンテーション手法により、Linux Azure App Service ワークロードに対して、以下の追加監視機能が提供されます。

- 自動インスツルメンテーションを用いた完全分散型 APM トレーシング。
- カスタマイズされた APM サービスとトレースビューは、関連する Azure App Service のメトリクスとメタデータを表示します。
- スパンのカスタマイズが可能な、手動 APM インスツルメンテーション機能。
- アプリケーションログへの `Trace_ID` 挿入。
- [DogStatsD][1] を使用したカスタムメトリクス送信のサポート。

このソリューションは、Linux Azure App Service の起動コマンド設定とアプリケーション設定を使用して、アプリケーションのインスツルメンテーションと構成の管理を行います。Java、Node、.NET、PHP、Python がサポートされています。

### セットアップ
#### アプリケーションの設定を行う
アプリケーションをインスツルメンテーションするには、まず、Azure 構成設定の **Application Settings** に、以下のキーと値のペアを追加します。

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Azure App Service の構成: Azure UI の Settings の Configuration セクションの下にある Application Settings です。DD_API_KEY、DD_SERVICE、DD_START_APP の 3 つの設定が記載されています。" style="width:80%;" >}}

- `DD_API_KEY` は Datadog の API キーです。
- `DD_CUSTOM_METRICS_ENABLED` (オプション) は[カスタムメトリクス](#custom-metrics)を有効にします。
- `DD_SITE` は Datadog サイト[パラメーター][2]です。サイトは {{< region-param key="dd_site" code="true" >}} です。この値のデフォルトは `datadoghq.com` です。
- `DD_SERVICE` はこのプログラムで使用するサービス名です。デフォルトは `package.json` の名前フィールドの値です。
- `DD_START_APP` はアプリケーションの起動に使用するコマンドです。例えば、`node ./bin/www` です (Tomcat で動作するアプリケーションでは不要です)。
- `DD_PROFILING_ENABLED` (オプション) .NET 固有の [Continuous Profiler][15] を有効にします。

### 起動コマンドを特定する

Linux Azure App Service の Web アプリは、組み込みランタイムのコードデプロイオプションを使用して構築され、言語によって異なる起動コマンドに依存しています。デフォルト値の概要は、[Azure のドキュメント][7]に記載されています。以下に例を示します。

これらの値を `DD_START_APP` 環境変数に設定します。以下の例は、関連する場合、`datadog-demo` という名前のアプリケーションの場合です。

| ランタイム   | `DD_START_APP` 値の例                                                               | 説明                                                                                                                                                                                                                        |
|-----------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Node.js   | `node ./bin/www`                                                                           | [Node PM2 構成ファイル][12]、またはスクリプトファイルを実行します。                                                                                                                                                                   |
| .NET Core | `dotnet datadog-demo.dll`                                                                  | デフォルトで Web アプリ名を使用する `.dll` ファイルを実行します。<br /><br /> **注**: コマンドの `.dll` ファイル名は `.dll` ファイルのファイル名と一致する必要があります。場合によっては、これは Web アプリとは一致しないことがあります。         |
| PHP       | `cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload` | スクリプトを正しい場所にコピーし、アプリケーションを起動します。                                                                                                                                                                           |
| Python    | `gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi`                             | カスタム[起動スクリプト][13]。この例では、Django アプリを起動するための Gunicorn コマンドを示します。                                                                                                                                      |
| Java      | `java -jar /home/site/wwwroot/datadog-demo.jar`                                            | アプリを起動するためのコマンドです。Tomcat で動作するアプリケーションでは不要です。                                                                                                                                                                                                  |

[7]: https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/faqs-app-service-linux#what-are-the-expected-values-for-the-startup-file-section-when-i-configure-the-runtime-stack-
[12]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#configure-nodejs-server
[13]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-php?pivots=platform-linux#customize-start-up
[15]: /ja/profiler/enabling/dotnet/?tab=azureappservice


**注**: 新しい設定を保存すると、アプリケーションは再起動します。

#### 一般設定を行う

{{< tabs >}}
{{% tab "Node、.NET、PHP、Python" %}}
**General settings** で、**Startup Command** のフィールドに以下を追加します。

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.7.0/datadog_wrapper | bash
```

{{< img src="serverless/azure_app_service/startup-command-1.jpeg" alt="Azure App Service の構成: Azure UI の Settings の Configuration セクションにある、Stack の設定です。スタック、メジャーバージョン、マイナーバージョンのフィールドの下には、上記の curl コマンドで入力される Startup Command フィールドがあります。" style="width:100%;" >}}
{{% /tab %}}
{{% tab "Java" %}}
リリースから [`datadog_wrapper`][8] ファイルをダウンロードし、Azure CLI コマンドでアプリケーションにアップロードします。

```
  az webapp deploy --resource-group <group-name> --name <app-name> --src-path <path-to-datadog-wrapper> --type=startup
```

[8]: https://github.com/DataDog/datadog-aas-linux/releases
{{% /tab %}}
{{< /tabs >}}

### トレースを表示する

新しい Application Settings が保存されると、Azure はアプリケーションを再起動します。ただし、起動コマンドを追加して保存した場合は、再起動が必要な場合があります。

アプリケーション再起動後、Datadog の [APM サービスページ][4]でサービス名 (`DD_SERVICE`) を検索するとトレースを見ることができます。

### カスタムメトリクス

DogStatsD でアプリケーションのカスタムメトリクスを有効にするには、Application Settings に `DD_CUSTOM_METRICS_ENABLED` を追加して `true` と設定します。

メトリクスを送信するようにアプリケーションを構成するには、ランタイムに応じた適切な手順を実行します。

- [Java][9]
- [Node][5]
- [.NET][6]
- [PHP][10]
- [Python][11]

## トラブルシューティング

トレースやカスタムメトリクスデータを期待通りに受信できない場合は、**App Service logs** を有効にしてデバッグログを受信してください。

{{< img src="serverless/azure_app_service/app-service-logs.png" alt="Azure App Service の構成: Azure UI の Settings の Monitoring セクションにある App Service ログです。'Application logging' オプションが 'File System' に設定されています。" style="width:100%;" >}}

[Datadog サポート][14]と **Log stream** の内容を共有してください。
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/dogstatsd
[2]: /ja/getting_started/site/#access-the-datadog-site
[3]: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
[4]: /ja/tracing/services/service_page/
[5]: https://github.com/brightcove/hot-shots
[6]: /ja/developers/dogstatsd/?tab=hostagent&code-lang=dotnet#code
[9]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=hostagent&code-lang=java
[10]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=hostagent&code-lang=php
[11]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=hostagent&code-lang=python
[14]: /ja/help