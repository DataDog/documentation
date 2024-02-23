---
further_reading:
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: GitHub
  text: Cloud Run サービスからのトレース、ログ、カスタムメトリクスの収集
kind: documentation
title: Google Cloud Run
---

## 概要

Google Cloud Run は、コンテナベースのアプリケーションをデプロイし、スケーリングするためのフルマネージドサーバーレスプラットフォームです。Datadog は、[Google Cloud インテグレーション][1]を通して Cloud Run のモニタリングとログ収集を提供しています。また、Datadog は、トレース、カスタムメトリクス、直接ログ収集を可能にする専用 Agent で Cloud Run アプリケーションをインスツルメントするソリューションも提供しています。

### 前提条件

[Datadog API キー][6]を取得済みであることと、[Datadog トレーシングライブラリがサポートする][2]プログラミング言語を使用していることを確認してください。

## アプリケーションをインスツルメントする

アプリケーションをインスツルメンテーションするには、[Dockerfile](#dockerfile) と[ビルドパック](#buildpack)の 2 つの方法があります。

### Dockerfile

Datadog は、`serverless-init` コンテナイメージの新しいリリースを Google の gcr.io、AWS の ECR、および Docker Hub に公開しています。

| dockerhub.io | gcr.io | public.ecr.aws |
| ------------ | ------ | -------------- |
| datadog/serverless-init | gcr.io/datadoghq/serverless-init | public.ecr.aws/datadog/serverless-init |

イメージはセマンティックバージョニングに基づいてタグ付けされ、新しいバージョンごとに 3 つの関連タグが付与されます。

* `1`、`1-alpine`: 重大な変更がない最新のマイナーリリースを追跡する場合、これらを使用します
* `1.x.x`、`1.x.x-alpine`: ライブラリの正確なバージョンにピン留めする場合、これらを使用します
* `latest`、`latest-alpine`: 重大な変更が含まれる可能性がある最新のバージョンリリースに従う場合、これらを使用します

## `serverless-init` の動作

`serverless-init` アプリケーションはプロセスをラップし、サブプロセスとしてこれを実行します。このアプリケーションはメトリクス用の DogStatsD リスナーとトレース用の Trace Agent リスナーを起動します。アプリケーションの stdout/stderr ストリームをラップすることでログを収集します。ブートストラップの後、serverless-init はサブプロセスとしてコマンドを起動します。

完全なインスツルメンテーションを得るには、Docker コンテナ内で実行する最初のコマンドとして `datadog-init` を呼び出していることを確認します。これを行うには、エントリーポイントとして設定するか、CMD の最初の引数として設定します。

{{< programming-lang-wrapper langs="nodejs,python,java,go,dotnet,ruby,php" >}}
{{< programming-lang lang="nodejs" >}}

Dockerfile に以下の指示と引数を追加します。

```dockerfile
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

   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog Node.JS トレーサーを Docker イメージにコピーします。

   ```dockerfile
   COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
   ```

   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。

   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-nodejs
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-node)を参照してください。

   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```dockerfile
   CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
   ```
#### 代替構成 {#alt-node}
Dockerfile 内にすでにエントリーポイントが定義されている場合は、代わりに CMD 引数を変更することができます。

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "/nodejs/bin/node", "/path/to/your/app.js"]
{{< /highlight >}}

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", "/nodejs/bin/node", "/path/to/your/app.js"]
{{< /highlight >}}

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

[1]: /ja/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Dockerfile に以下の指示と引数を追加します。
```dockerfile
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
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog Python トレーサーをインストールします。
   ```dockerfile
   RUN pip install --target /dd_tracer/python/ ddtrace
   ```
   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-python
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-python)を参照してください。
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Datadog トレーシングライブラリによって起動されたエントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```dockerfile
   CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
   ```
#### 代替構成 {#alt-python}
Dockerfile 内にすでにエントリーポイントが定義されている場合は、代わりに CMD 引数を変更することができます。

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
{{< /highlight >}}

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
{{< /highlight >}}

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

[1]: /ja/tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

Dockerfile に以下の指示と引数を追加します。

```dockerfile
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
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog Java トレーサーを Docker イメージに追加します。
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
   ```
   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-java
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-java)を参照してください。
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```dockerfile
   CMD ["./mvnw", "spring-boot:run"]
   ```

#### 代替構成 {#alt-java}
Dockerfile 内にすでにエントリーポイントが定義されている場合は、代わりに CMD 引数を変更することができます。

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "./mvnw", "spring-boot:run"]
{{< /highlight >}}

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "./mvnw", "spring-boot:run"]
{{< /highlight >}}

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

[1]: /ja/tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

アプリケーションをデプロイする前に、Go トレーサーを[手動でインストール][1]してください。以下の指示と引数を Dockerfile に追加してください。

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/path/to/your-go-binary"]
```

#### 説明

1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-go)を参照してください。
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

3. (オプション) Datadog タグを追加します。
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-go
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```dockerfile
   CMD ["/path/to/your-go-binary"]
   ```

#### 代替構成 {#alt-go}
Dockerfile 内にすでにエントリーポイントが定義されている場合は、代わりに CMD 引数を変更することができます。

{{< highlight dockerfile "hl_lines=5" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "/path/to/your-go-binary"]
{{< /highlight >}}

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

{{< highlight dockerfile "hl_lines=5-6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/path/to/your-go-binary"]
{{< /highlight >}}

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

**注**: Go コードを自動的にインスツルメントするツールである [Orchestrion][2] を使うこともできます。Orchestrion は非公開ベータ版です。詳細については、Orchestrion リポジトリで GitHub イシューを開くか、[サポートに連絡][3]してください。

[1]: /ja/tracing/trace_collection/library_config/go/
[2]: https://github.com/DataDog/orchestrion
[3]: /ja/help
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Dockerfile に以下の指示と引数を追加します。

```dockerfile
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
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog .NET トレーサーを Docker イメージにコピーします。
   ```dockerfile
   COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
   ```
   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-dotnet
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-dotnet)を参照してください。
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```dockerfile
   CMD ["dotnet", "helloworld.dll"]
   ```
#### 代替構成 {#alt-dotnet}
Dockerfile 内にすでにエントリーポイントが定義されている場合は、代わりに CMD 引数を変更することができます。

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "dotnet", "helloworld.dll"]
{{< /highlight >}}

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "dotnet", "helloworld.dll"]
{{< /highlight >}}

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

[1]: /ja/tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

アプリケーションをデプロイする前に、Ruby トレーサーを[手動でインストール][1]します。[サンプルアプリケーション][2]を参照してください。

Dockerfile に以下の指示と引数を追加します。

```dockerfile
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
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. (オプション) Datadog タグを追加します
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

3. この環境変数は、 トレース伝搬が Cloud Run で正しく動作するために必要です。Datadog でインスツルメンテーションされたすべてのダウンストリームサービスにこの変数を設定してください。
   ```dockerfile
   ENV DD_TRACE_PROPAGATION_STYLE=datadog
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-ruby)を参照してください。
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```dockerfile
   CMD ["rails", "server", "-b", "0.0.0.0"]
   ```
#### 代替構成 {#alt-ruby}
Dockerfile 内にすでにエントリーポイントが定義されている場合は、代わりに CMD 引数を変更することができます。

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
CMD ["/app/datadog-init", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

[1]: /ja/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Dockerfile に以下の指示と引数を追加します。
```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# Apache と mod_php ベースのイメージには以下を使用します
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["apache2-foreground"]

# Nginx と php-fpm ベースのイメージには以下を使用します
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD php-fpm; nginx -g daemon off;
```

**注**: `datadog-init` エントリーポイントはプロセスをラップし、そこからログを収集します。ログを正しく取得するには、Apache、Nginx、PHP プロセスが `stdout` に出力を書いていることを確認する必要があります。

#### 説明


1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog PHP トレーサーをコピーしてインストールします。
   ```dockerfile
   ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
   RUN php /datadog-setup.php --php-bin=all
   ```
   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-php
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-php)を参照してください。
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. アプリケーションを実行します。

   Apache と mod_php ベースのイメージには以下を使用します。
   ```dockerfile
   RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
   EXPOSE 8080
   CMD ["apache2-foreground"]
   ```

   Nginx と php-fpm ベースのイメージには以下を使用します。
   ```dockerfile
   RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
   EXPOSE 8080
   CMD php-fpm; nginx -g daemon off;
   ```
#### 代替構成 {#alt-php}
Dockerfile 内にすでにエントリーポイントが定義されていて、Apache と mod_php ベースのイメージを使用している場合は、代わりに CMD 引数を変更することができます。

{{< highlight dockerfile "hl_lines=9" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["/app/datadog-init", "apache2-foreground"]
{{< /highlight >}}

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

{{< highlight dockerfile "hl_lines=7 12 17" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# Apache と mod_php ベースのイメージには以下を使用します
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["your_entrypoint.sh", "apache2-foreground"]

# Nginx と php-fpm ベースのイメージには以下を使用します
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD your_entrypoint.sh php-fpm; your_entrypoint.sh nginx -g daemon off;
{{< /highlight >}}

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

[1]: /ja/tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Buildpack

[`Pack Buildpacks`][3] は Dockerfile を使用せずに、コンテナをパッケージ化する便利な手段を提供します。

まず、トレーサーを手動でインストールします。
- [Node.JS][14]
- [Python][13]
- [Java][15]
- [Go][12]
- [.NET][18]
- [Ruby][16]
- [PHP][17]

次に、以下のコマンドを実行して、アプリケーションを構築します。

```shell
pack build --builder=gcr.io/buildpacks/builder \
--buildpack from=builder \
--buildpack datadog/serverless-buildpack:latest \
gcr.io/YOUR_PROJECT/YOUR_APP_NAME
```

**注**: ビルドパックのインスツルメンテーションは Alpine イメージと互換性がありません

## アプリケーションを構成する

コンテナが構築され、レジストリにプッシュされたら、最後の手順として Datadog Agent 用に必要な環境変数を設定します。
- `DD_API_KEY`: データを Datadog アカウントに送信するために使用する Datadog API キー。プライバシーと安全性の問題を考慮して、[Google Cloud シークレット][11]に設定する必要があります。
- `DD_SITE`: Datadog のエンドポイントと Web サイト。このページの右側で自分のサイトを選択します。あなたのサイトは {{< region-param key="dd_site" code="true" >}} です。
- `DD_TRACE_ENABLED`: `true` に設定してトレースを有効にします
- `DD_TRACE_PROPAGATION_STYLE`: これを `datadog` に設定することで、コンテキスト伝搬とログトレースの相関を利用できます。

環境変数とその機能の詳細については、[追加の構成](#additional-configurations)を参照してください。

次のコマンドでサービスをデプロイし、どの外部接続からもそのサービスにアクセスできるようにします。`DD_API_KEY` を環境変数として設定し、サービスのリスニングポートを 8080 に設定します。

```
shell
gcloud run deploy APP_NAME --image=gcr.io/YOUR_PROJECT/APP_NAME \
  --port=8080 \
  --update-env-vars=DD_API_KEY=$DD_API_KEY \
  --update-env-vars=DD_TRACE_ENABLED=true \
  --update-env-vars=DD_SITE='datadoghq.com' \
  --update-env-vars=DD_TRACE_PROPAGATION_STYLE='datadog' \
```

## 結果

デプロイが完了すると、メトリクスとトレースが Datadog に送信されます。Datadog で **Infrastructure->Serverless** に移動すると、サーバーレスメトリクスとトレースを確認できます。

## 追加の構成

- **高度なトレース:** Datadog Agent は、一般的なフレームワーク向けに基本的なトレース機能をすでにいくつか提供しています。さらに詳しい情報については、[高度なトレースガイド][2]に従ってください。

- **ログ:** [Google Cloud インテグレーション][1]を使用している場合は、すでにログが収集されています。また、環境変数 `DD_LOGS_ENABLED` を `true` に設定することで、サーバーレスインスツルメンテーションを通じて直接アプリケーションログをキャプチャすることも可能です。

- **カスタムメトリクス:** [DogStatsd クライアント][4]を使って、カスタムメトリクスを送信することができます。Cloud Run やその他のサーバーレスアプリケーションの監視には、[ディストリビューション][9]メトリクスを使用します。ディストリビューションは、デフォルトで `avg`、`sum`、`max`、`min`、`count` の集計データを提供します。Metric Summary ページでは、パーセンタイル集計 (p50、p75、p90、p95、p99) を有効にすることができ、タグの管理も可能です。ゲージメトリクスタイプの分布を監視するには、[時間集計と空間集計][11]の両方で `avg`を使用します。カウントメトリクスタイプの分布を監視するには、時間集計と空間集計の両方で `sum` を使用します。

### 環境変数

| 変数 | 説明 |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API キー][7] - **必須**|
| `DD_SITE` | [Datadog サイト][5] - **必須** |
| `DD_LOGS_ENABLED` | true の場合、ログ (stdout と stderr) を Datadog に送信します。デフォルトは false です。 |
| `DD_LOGS_INJECTION`| true の場合、[Java][19]、[Node][20]、[.NET][21]、および [PHP][22] でサポートされているロガーのトレースデータですべてのログをリッチ化します。[Python][23]、[Go][24]、[Ruby][25] については追加のドキュメントを参照してください。 |
| `DD_TRACE_SAMPLE_RATE`|  トレース取り込みのサンプルレート `0.0` と `1.0` をコントロールします。 |
| `DD_SERVICE`      | [統合サービスタグ付け][6]を参照してください。                                  |
| `DD_VERSION`      | [統合サービスタグ付け][6]を参照してください。                                  |
| `DD_ENV`          | [統合サービスタグ付け][6]を参照してください。                                  |
| `DD_SOURCE`       | [統合サービスタグ付け][6]を参照してください。                                  |
| `DD_TAGS`         | [統合サービスタグ付け][6]を参照してください。                                  |

## 保存ビュー

このインテグレーションは、ランタイムに完全な SSL 実装があることが前提です。slim イメージを使用している場合、証明書を含めるために Dockerfile に次のコマンドを追加する必要があります。

```
RUN apt-get update && apt-get install -y ca-certificates
```


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/integrations/google_cloud_platform/#log-collection
[2]: /ja/tracing/trace_collection/#for-setup-instructions-select-your-language
[3]: https://buildpacks.io/docs/tools/pack/
[4]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[5]: /ja/getting_started/site/
[6]: /ja/getting_started/tagging/unified_service_tagging/
[7]: /ja/account_management/api-app-keys/#api-keys
[8]: https://github.com/DataDog/crpb/tree/main
[9]: /ja/metrics/distributions/
[10]: /ja/metrics/#time-and-space-aggregation
[11]: https://cloud.google.com/run/docs/configuring/secrets
[12]: /ja/tracing/trace_collection/library_config/go/
[13]: /ja/tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application
[14]: /ja/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application
[15]: /ja/tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application
[16]: /ja/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[17]: /ja/tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension
[18]: /ja/tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation
[19]: /ja/tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[20]: /ja/tracing/other_telemetry/connect_logs_and_traces/nodejs
[21]: /ja/tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[22]: /ja/tracing/other_telemetry/connect_logs_and_traces/php
[23]: /ja/tracing/other_telemetry/connect_logs_and_traces/python
[24]: /ja/tracing/other_telemetry/connect_logs_and_traces/go
[25]: /ja/tracing/other_telemetry/connect_logs_and_traces/ruby