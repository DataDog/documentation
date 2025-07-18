---
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentation
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentation
  text: Azure App Service Environment
kind: documentation
title: Azure App Service - Linux コンテナ
---
## 概要

このインスツルメンテーション手法により、コンテナ化された Linux Azure App Service ワークロードに対して、以下の追加監視機能が提供されます。

- 自動インスツルメンテーションを用いた完全分散型 APM トレーシング。
- カスタマイズされた APM サービスとトレースビューは、関連する Azure App Service のメトリクスとメタデータを表示します。
- スパンのカスタマイズが可能な、手動 APM インスツルメンテーション機能。
- アプリケーションログへの `Trace_ID` 挿入。
- [DogStatsD][1] を使用したカスタムメトリクス送信のサポート。

## セットアップ
### 前提条件
[Datadog API キー][1]を取得済みであることと、[Datadog トレーシングライブラリがサポートする][2]プログラミング言語を使用していることを確認してください。

[1]: /ja/account_management/api-app-keys/#api-keys
[2]: /ja/tracing/trace_collection/#for-setup-instructions-select-your-language

### アプリケーションをインスツルメントする

#### Dockerfile で Agent をインストールする

{{< programming-lang-wrapper langs="nodejs,python,go" >}}
{{< programming-lang lang="nodejs" >}}

Dockerfile に次の記述を追加することで、Datadog Agent を使用してアプリケーションをインスツルメントします。以下の例は、既存の Dockerfile のセットアップに応じて調整が必要になる場合があります。

```
# Datadog `serverless-init` を Docker イメージにコピーします
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# Datadog js トレーシングライブラリをこちらか package.json でインストールします
npm i dd-trace@2.2.0

# Datadog トレーシングライブラリを有効にします
ENV NODE_OPTIONS="--require dd-trace/init"

# Datadog serverless-init プロセスにアプリケーションをラップするために、エントリポイントを変更します
ENTRYPOINT ["/app/datadog-init"]

# エントリポイントにラップされたバイナリアプリケーションを実行します
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]

```

#### トレーシングライブラリをインストールする

トレースは、前のステップの Dockerfile で動作するはずです。代わりに、[こちらの説明][2]に従って、アプリケーションに Node トレーシングライブラリをインストールし、構成して、トレースをキャプチャして送信することもできます。

[サンプル Node.js アプリケーションのサンプルコード][1]。

[1]: https://github.com/DataDog/serverless-self-monitoring/tree/main/self_monitor/azure/App_Service_Linux/container/nodejs/express
[2]: /ja/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Dockerfile に次の記述を追加することで、Datadog Agent を使用してアプリケーションをインスツルメントします。以下の例は、既存の Dockerfile のセットアップに応じて調整が必要になる場合があります。

```
# Datadog `serverless-init` を Docker イメージにコピーします
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# python トレーシングライブラリをこちらか requirements.txt でインストールします
RUN pip install --no-cache-dir ddtrace==1.7.3

# Datadog serverless-init プロセスにアプリケーションをラップするために、エントリポイントを変更します
ENTRYPOINT ["/app/datadog-init"]

# エントリポイントにラップされたバイナリアプリケーションを実行します
CMD ["ddtrace-run", "python", "app.py"]
```

#### トレーシングライブラリをインストールする

トレースは、前のステップの Dockerfile で動作するはずです。代わりに、[こちらの説明][2]に従って、アプリケーションに Python トレーシングライブラリをインストールし、構成して、トレースをキャプチャして送信することもできます。

[サンプル Python アプリケーションのサンプルコード][1]。

[1]: https://github.com/DataDog/serverless-self-monitoring/tree/main/self_monitor/azure/App_Service_Linux/container/python/flask
[2]: /ja/tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Dockerfile に次の記述を追加することで、Datadog Agent を使用してアプリケーションをインスツルメントします。以下の例は、既存の Dockerfile のセットアップに応じて調整が必要になる場合があります。

```
# Datadog `serverless-init` を Docker イメージにコピーします
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# Datadog serverless-init プロセスにアプリケーションをラップするために、エントリポイントを変更します
ENTRYPOINT ["/app/datadog-init"]

# エントリポイントにラップされたバイナリアプリケーションを実行します
CMD ["/path/to/your-go-binary"]
```

#### トレーシングライブラリをインストールする

[以下の手順][2]に従って、アプリケーションに Go トレーシングライブラリをインストールし、構成して、トレースをキャプチャして送信します。

[サンプル Go アプリケーションのサンプルコード][1]。

[1]: https://github.com/DataDog/serverless-self-monitoring/tree/main/self_monitor/azure/App_Service_Linux/container/go
[2]: /ja/tracing/trace_collection/dd_libraries/go/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### アプリケーションを構成する

アプリケーションをインスツルメンテーションするには、まず、Azure 構成設定の **Application Settings** に、以下のキーと値のペアを追加します。

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Azure App Service の構成: Azure UI の Settings の Configuration セクションの下にある Application Settings です。DD_API_KEY、DD_SERVICE、DD_START_APP の 3 つの設定が記載されています。" style="width:80%;" >}}

- `DD_API_KEY` は Datadog API キーで、Datadog アカウントにデータを送信するために使用します。
- `DD_SITE` は Datadog サイト[パラメーター][2]です。サイトは {{< region-param key="dd_site" code="true" >}} です。この値のデフォルトは `datadoghq.com` です。
- `DD_SERVICE` はこのプログラムで使用するサービス名です。デフォルトは `package.json` の名前フィールドの値です。

**注**: 新しい設定が保存されると、アプリケーションは再起動します。これらの設定は、代わりに Dockerfile に含めることができます。唯一の欠点は、設定を更新して再起動するのではなく、アプリケーションを再デプロイする必要があることです。

### 結果

デプロイが完了すると、メトリクスとトレースが Datadog に送信されます。Datadog で **Infrastructure -> Serverless** に移動すると、サーバーレスメトリクスとトレースを確認できます。

## 追加の構成

### トレースを表示する

新しい Application Settings が保存されると、Azure はアプリケーションを再起動します。アプリケーション再起動後、Datadog の [APM サービスページ][4]でサービス名 (`DD_SERVICE`) を検索するとトレースを見ることができます。

### ログ管理

[Azure インテグレーション][1]を使用している場合は、すでにログが収集されています。また、環境変数 `DD_LOGS_ENABLED` を `true` に設定することで、サーバーレスインスツルメンテーションを通じて直接アプリケーションログをキャプチャすることも可能です。

### カスタムメトリクス

DogStatsD でアプリケーションのカスタムメトリクスを有効にするには、Application Settings に `DD_CUSTOM_METRICS_ENABLED` を追加して `true` と設定します。

メトリクスを送信するようにアプリケーションを構成するには、ランタイムに応じた適切な手順を実行します。

- [Node][5]
- [Python][11]
- [Go][12]

## トラブルシューティング

トレースやカスタムメトリクスデータを期待通りに受信できない場合は、**App Service logs** を有効にしてデバッグログを受信してください。

{{< img src="serverless/azure_app_service/app-service-logs.png" style="width:100%;" >}}

[Datadog サポート][14]と **Log stream** の内容を共有してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/dogstatsd
[2]: /ja/getting_started/site/#access-the-datadog-site
[3]: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
[4]: /ja/tracing/services/service_page/
[5]: https://github.com/brightcove/hot-shots
[6]: /ja/integrations/azure/#log-collection
[11]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=hostagent&code-lang=python#setup
[12]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=hostagent&code-lang=go#setup
[14]: /ja/help