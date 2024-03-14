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

### 前提条件

[Datadog API キー][6]を取得済みであることと、[Datadog トレーシングライブラリがサポートする][2]プログラミング言語を使用していることを確認してください。

## アプリケーションをインスツルメントする

### Dockerfile

Datadog は、serverless-init コンテナイメージの新しいリリースを Google の gcr.io、AWS の ECR、および Docker Hub に公開しています。

| dockerhub.io | gcr.io | public.ecr.aws |
| ---- | ---- | ---- |
| datadog/serverless-init | gcr.io/datadoghq/serverless-init | public.ecr.aws/datadog/serverless-init |

イメージはセマンティックバージョニングに基づいてタグ付けされ、新しいバージョンごとに 3 つの関連タグが付与されます。

* `1`、`1-alpine`: 重大な変更がない最新のマイナーリリースを追跡する場合、これらを使用します
* `1.x.x`、`1.x.x-alpine`: ライブラリの正確なバージョンにピン留めする場合、これらを使用します
* `latest`, `latest-apline`: 重大な変更が含まれる可能性がある最新のバージョンリリースに従う場合、これらを使用します

{{< programming-lang-wrapper langs="nodejs,python,java,go,dotnet,ruby,php" >}}
{{< programming-lang lang="nodejs" >}}

Dockerfile に以下の指示と引数を追加します。

```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
```

#### 説明

1. Datadog `serverless-init` を Docker イメージにコピーします。

   ```
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog Node.JS トレーサーを Docker イメージにコピーします。

   ```
   COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
   ```

   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。

   ```
   ENV DD_SERVICE=datadog-demo-run-nodejs
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。

   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```
   CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
   ```

[1]: /ja/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Dockerfile に以下の指示と引数を追加します。
```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
```

#### 説明

1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog Python トレーサーをインストールします。
   ```
   RUN pip install --target /dd_tracer/python/ ddtrace
   ```
   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。
   ```
   ENV DD_SERVICE=datadog-demo-run-python
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します
   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Datadog トレーシングライブラリによって起動されたエントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```
   CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
   ```

[1]: /ja/tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

Dockerfile に以下の指示と引数を追加します。

```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["./mvnw", "spring-boot:run"]
```

#### 説明

1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog Java トレーサーを Docker イメージに追加します。
   ```
   ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
   ```
   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。
   ```
   ENV DD_SERVICE=datadog-demo-run-java
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します
   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```
   CMD ["./mvnw", "spring-boot:run"]
   ```

[1]: /ja/tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

アプリケーションをデプロイする前に、Go トレーサーを[手動でインストール][1]してください。以下の指示と引数を Dockerfile に追加してください。

```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/path/to/your-go-binary"]
```

#### 説明

1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

3. (オプション) Datadog タグを追加します。
   ```
   ENV DD_SERVICE=datadog-demo-run-go
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```
   CMD ["/path/to/your-go-binary"]
   ```

**注**: Go コードを自動的にインスツルメントするツールである [Orchestrion][2] を使うこともできます。Orchestrion は非公開ベータ版です。詳細については、Orchestrion リポジトリで GitHub イシューを開くか、[サポートに連絡][3]してください。

[1]: /ja/tracing/trace_collection/library_config/go/
[2]: https://github.com/DataDog/orchestrion
[3]: /ja/help
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Dockerfile に以下の指示と引数を追加します。

```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["dotnet", "helloworld.dll"]
```

#### 説明

1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog .NET トレーサーを Docker イメージにコピーします。
   ```
   COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
   ```
   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。
   ```
   ENV DD_SERVICE=datadog-demo-run-dotnet
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```
   CMD ["dotnet", "helloworld.dll"]
   ```

[1]: /ja/tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

アプリケーションをデプロイする前に、Ruby トレーサーを[手動でインストール][1]します。[サンプルアプリケーション][2]を参照してください。

Dockerfile に以下の指示と引数を追加します。

```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"]
```

#### 説明

1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. (オプション) Datadog タグを追加します
   ```
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

3. この環境変数は、 トレース伝搬が Cloud Run で正しく動作するために必要です。Datadog でインスツルメンテーションされたすべてのダウンストリームサービスにこの変数を設定してください。
   ```
   ENV DD_TRACE_PROPAGATION_STYLE=datadog
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```
   CMD ["rails", "server", "-b", "0.0.0.0"]
   ```


[1]: /ja/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Dockerfile に以下の指示と引数を追加します。
```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# apache と mod_php ベースのイメージには以下を使用します
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["apache2-foreground"]

# nginx と php-fpm ベースのイメージには以下を使用します
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD php-fpm; nginx -g daemon off;
```

**注**: datadog-init ENTRYPOINT はプロセスをラップし、そこからログを収集します。ログを正しく動作させるには、apache、nginx、php プロセスが標準出力に出力を書いていることを確認する必要があります。

#### 説明


1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog PHP トレーサーをコピーしてインストールします。
   ```
   ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
   RUN php /datadog-setup.php --php-bin=all
   ```
   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。
   ```
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Datadog serverless-init プロセスでアプリケーションをラップするようにエントリポイントを変更します
   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. アプリケーションを実行します。

   apache と mod_php ベースのイメージには以下を使用します。
   ```
   RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
   EXPOSE 8080
   CMD ["apache2-foreground"]
   ```

   nginx と php-fpm ベースのイメージには以下を使用します。
   ```
   RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
   EXPOSE 8080
   CMD php-fpm; nginx -g daemon off;
   ```

[1]: /ja/tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 2. アプリケーションを構成する

コンテナが構築され、レジストリにプッシュされたら、最後の手順として Datadog Agent 用に必要な環境変数を設定します。
- `DD_API_KEY`: データを Datadog アカウントに送信するために使用する Datadog API キー。プライバシーと安全性の問題を考慮して、[Azure シークレット][7]に設定する必要があります。
- `DD_SITE`: Datadog のエンドポイントと Web サイト。このページの右側で自分のサイトを選択します。あなたのサイトは {{< region-param key="dd_site" code="true" >}} です。
- `DD_TRACE_ENABLED`: `true` に設定してトレースを有効にします。

環境変数とその機能の詳細については、[追加の構成](#additional-configurations)を参照してください。

### 3. 結果

デプロイが完了すると、メトリクスとトレースが Datadog に送信されます。Datadog で **Infrastructure->Serverless** に移動すると、サーバーレスメトリクスとトレースを確認できます。

## Python

{{% aas-workflow-linux %}}

## 追加の構成

- **高度なトレース:** Datadog Agent は、一般的なフレームワーク向けに基本的なトレース機能をすでにいくつか提供しています。さらに詳しい情報については、[高度なトレースガイド][2]に従ってください。

- **ログ:** [Azure インテグレーション][1]を使用している場合は、すでにログが収集されています。また、環境変数 `DD_LOGS_ENABLED` を `true` に設定することで、サーバーレスインスツルメンテーションを通じて直接アプリケーションログをキャプチャすることも可能です。

- **カスタムメトリクス:** [DogStatsd クライアント][3]を使って、カスタムメトリクスを送信することができます。Cloud Run やその他のサーバーレスアプリケーションの監視には、[ディストリビューション][8]メトリクスを使用します。ディストリビューションは、デフォルトで `avg`、`sum`、`max`、`min`、`count` の集計データを提供します。Metric Summary ページでは、パーセンタイル集計 (p50、p75、p90、p95、p99) を有効にすることができ、タグの管理も可能です。ゲージメトリクスタイプの分布を監視するには、[時間集計と空間集計][9]の両方で `avg` を使用します。カウントメトリクスタイプの分布を監視するには、時間集計と空間集計の両方で `sum` を使用します。

- **トレースサンプリング:** サーバーレスアプリケーションの APM トレースリクエストサンプリングレートを管理するには、関数の DD_TRACE_SAMPLE_RATE 環境変数を 0.000 (コンテナアプリのリクエストをトレースしない) から 1.000 (すべてのコンテナアプリのリクエストをトレースする) の間の値に設定します。

メトリクスは、アプリケーションの 100% のトラフィックに基づいて計算され、どのようなサンプリング構成であっても正確な値を維持します。

### 環境変数

| 変数 | 説明 |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API キー][6] - **必須**|
| `DD_SITE` | [Datadog サイト][4] - **必須** |
| `DD_LOGS_ENABLED` | true の場合、ログ (stdout と stderr) を Datadog に送信します。デフォルトは false です。 |
| `DD_LOGS_INJECTION`| true の場合、[Java][10]、[Node.js][11]、[.NET][12]、および [PHP][13] でサポートされているロガーのトレースデータですべてのログをリッチ化します。[Python][14]、[Go][15]、[Ruby][16] については追加のドキュメントを参照してください。 |
| `DD_TRACE_SAMPLE_RATE`|  トレース取り込みのサンプルレート `0.0` と `1.0` をコントロールします|
| `DD_SERVICE`      | [統合サービスタグ付け][5]を参照してください。                                       |
| `DD_VERSION`      | [統合サービスタグ付け][5]を参照してください。                                       |
| `DD_ENV`          | [統合サービスタグ付け][5]を参照してください。                                       |
| `DD_SOURCE`       | [統合サービスタグ付け][5]を参照してください。                                       |
| `DD_TAGS`         | [統合サービスタグ付け][5]を参照してください。                                       |

## トラブルシューティング

トレースやカスタムメトリクスデータを期待通りに受信できない場合は、**App Service logs** を有効にしてデバッグログを受信してください。

{{< img src="serverless/azure_app_service/app-service-logs.png" style="width:100%;" >}}

[Datadog サポート][14]と **Log stream** の内容を共有してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/integrations/azure/#log-collection
[2]: /ja/tracing/trace_collection/library_config
[3]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /ja/getting_started/site/
[5]: /ja/getting_started/tagging/unified_service_tagging/
[6]: /ja/account_management/api-app-keys/
[7]: https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets
[8]: /ja/metrics/distributions/
[9]: /ja/metrics/#time-and-space-aggregation
[10]: /ja/tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[11]: /ja/tracing/other_telemetry/connect_logs_and_traces/nodejs
[12]: /ja/tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[13]: /ja/tracing/other_telemetry/connect_logs_and_traces/php
[14]: /ja/tracing/other_telemetry/connect_logs_and_traces/python
[15]: /ja/tracing/other_telemetry/connect_logs_and_traces/go
[16]: /ja/tracing/other_telemetry/connect_logs_and_traces/ruby