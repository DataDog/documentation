---
further_reading:
- link: /tracing/trace_collection/library_config/java/
  tag: ドキュメント
  text: Additional tracing library configuration options
- link: /tracing/trace_collection/dd_libraries/java/
  tag: ドキュメント
  text: Detailed tracing library setup instructions
- link: /tracing/trace_collection/compatibility/java/
  tag: ドキュメント
  text: Supported Java frameworks for automatic instrumentation
- link: /tracing/trace_collection/custom_instrumentation/java/
  tag: ドキュメント
  text: Manually configuring traces and spans
- link: https://github.com/DataDog/dd-trace-java
  tag: ソースコード
  text: Tracing library open source code repository
title: Tutorial - Enabling Tracing for a Java Application and Datadog Agent in Containers
---

## 概要

This tutorial walks you through the steps for enabling tracing on a sample Java application installed in a container. In this scenario, the Datadog Agent is also installed in a container.

ホスト上のアプリケーションと Agent、コンテナ内のアプリケーションとホスト上の Agent、クラウドインフラストラクチャー上のアプリケーションと Agent、他の言語で書かれたアプリケーションなど、他のシナリオについては、その他の[トレース有効化のチュートリアル][1]を参照してください。

Java の一般的なトレース設定ドキュメントについては、[Java アプリケーションのトレース][2]を参照してください。

### 前提条件

- Datadog のアカウントと[組織の API キー][3]
- Git
- Docker
- Curl

## Docker 化されたサンプル Java アプリケーションのインストール

このチュートリアルのコードサンプルは、GitHub の [github.com/DataDog/apm-tutorial-java-host][9] にあります。まずは、このリポジトリを複製してください。

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

このリポジトリには、Docker コンテナ内で実行できるようにあらかじめ構成されたマルチサービスの Java アプリケーションが含まれています。サンプルアプリは、データの追加や変更を行うための REST API を備えた基本的なノートアプリです。`docker-compose` の YAML ファイルは `docker` ディレクトリに配置されます。

This tutorial uses the `all-docker-compose.yaml` file, which builds containers for both the application and the Datadog Agent.

`notes` と `calendar` の各ディレクトリには、アプリケーションをビルドするための Dockerfile が、Maven と Gradle の 2 つのセットで用意されています。このチュートリアルでは Maven を使用しますが、Gradle に慣れている場合は、ビルドコマンドを変更することで、Maven の代わりに Gradle を使用することができます。

### サンプルアプリケーションの起動と実行

1. アプリケーションのコンテナを構築するには、`/docker` ディレクトリの中から以下を実行します。

   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml build notes
{{< /code-block >}}

   ビルドに失敗した場合は、`Ctrl+C` で終了し、コマンドを再実行してください。

2. コンテナを起動します。

   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml up notes
{{< /code-block >}}

   You can verify that it's running by viewing the running containers with the `docker ps` command.

3. 別のターミナルを開いて、アプリを行使するために API リクエストを送信します。ノートアプリケーションは、同じコンテナで実行されているメモリ内 H2 データベースにデータを保存する REST API です。これにいくつかのコマンドを送信します。

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

### アプリケーションを停止します。

アプリケーションの実行を確認したら、それを停止して、トレースを有効にします。

1. コンテナを停止します。
   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml down
{{< /code-block >}}

2. コンテナを削除します。
   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml rm
{{< /code-block >}}

## トレースを有効にする

Java アプリケーションが動作するようになったので、トレースを有効にするための構成を行います。

1. Java tracing パッケージをプロジェクトに追加します。Agent はコンテナで動作するため、Dockerfile が適切に構成されていることを確認し、何もインストールする必要はありません。`notes/dockerfile.notes.maven` ファイルを開き、`dd-java-agent` をダウンロードする行のコメントを解除します。

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. 同じ `notes/dockerfile.notes.maven` ファイル内で、トレースなしで実行するための `ENTRYPOINT` 行をコメントアウトしてください。次に、トレースを有効にしてアプリケーションを実行する `ENTRYPOINT` 行のコメントを解除します。

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/notes-0.0.1-SNAPSHOT.jar"]
   ```

   これにより、アプリケーションは自動的に Datadog のサービスにインスツルメンテーションされます。

   <div class="alert alert-warning"><strong>注</strong>: これらのサンプルコマンドのフラグ、特にサンプルレートは、このチュートリアル以外の環境では、必ずしも適切ではありません。実際の環境で何を使うべきかについては、<a href="#tracing-configuration">トレース構成</a>を読んでください。</div>

3. 異なるバージョンやデプロイ環境間でトレースされたサービスを識別する[統合サービスタグ][10]により、Datadog 内で相関が取れるようになり、検索やフィルターに利用できるようになります。統合サービスタグ付けに使用する環境変数は、`DD_SERVICE`、`DD_ENV`、`DD_VERSION` の 3 つです。Docker でデプロイされたアプリケーションの場合、これらの環境変数を Dockerfile または `docker-compose` ファイル内に追加することができます。
   このチュートリアルでは、`all-docker-compose.yaml` ファイルにこれらの環境変数がすでに定義されています。

   ```yaml
     environment:
       - DD_SERVICE=notes
       - DD_ENV=dev
       - DD_VERSION=0.0.1
   ```

4. また、同じユニバーサルサービスタグの `service`、`env`、`version` の値に対する Docker ラベルが Dockerfile に設定されていることがわかります。これにより、アプリケーションを起動したら Docker メトリクスを取得することもできます。

   ```yaml
     labels:
       - com.datadoghq.tags.service="notes"
       - com.datadoghq.tags.env="dev"
       - com.datadoghq.tags.version="0.0.1"
   ```

## Agent コンテナの追加

`all-docker-compose.yaml` ファイルのサービスセクションに Datadog Agent を追加し、ビルドに Agent を追加します。

1. Agent の構成のコメントを解除し、自分の [Datadog API キー][3]と[サイト][6]を指定します。
   ```yaml
     datadog-agent:
       container_name: datadog-agent
       image: "gcr.io/datadoghq/agent:latest"
       pid: host
       environment:
         - DD_API_KEY=<DD_API_KEY_HERE>
         - DD_SITE=datadoghq.com  # Default. Change to eu.datadoghq.com, us3.datadoghq.com, us5.datadoghq.com as appropriate for your org
         - DD_APM_ENABLED=true
         - DD_APM_NON_LOCAL_TRAFFIC=true
       volumes:
         - /var/run/docker.sock:/var/run/docker.sock
         - /proc/:/host/proc/:ro
         - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
   ```

3. `notes` コンテナ内の `datadog-agent` の `depends_on` フィールドのコメントを解除してください。

2. `notes` サービスセクションで、`DD_AGENT_HOST` 環境変数に Agent コンテナのホスト名が設定されていることに注目してください。`notes` コンテナセクションはこのようになります。
   ```yaml
   notes:
     container_name: notes
     restart: always
     build:
       context: ../
       dockerfile: notes/dockerfile.notes.maven
     ports:
       - 8080:8080
     labels:
       - com.datadoghq.tags.service="notes"
       - com.datadoghq.tags.env="dev"
       - com.datadoghq.tags.version="0.0.1"
     environment:
       - DD_SERVICE=notes
       - DD_ENV=dev
       - DD_VERSION=0.0.1
       - DD_AGENT_HOST=datadog-agent
     # - CALENDAR_HOST=calendar
     depends_on:
     # - calendar
       - datadog-agent
   ```
   このチュートリアルの後半で、`calendar` セクションと変数を構成することになります。


## 自動トレースを見るためにコンテナを起動する

トレーシングライブラリがインストールされたので、アプリケーションを再起動し、トレースの受信を開始します。以下のコマンドを実行します。

```
docker-compose -f all-docker-compose.yaml build notes
docker-compose -f all-docker-compose.yaml up notes
```

Agent が動作しているかどうかは、ターミナルで連続出力を観察するか、Datadog の[イベントエクスプローラー][8]を開いて Agent の開始イベントを確認することで分かります。

{{< img src="tracing/guide/tutorials/tutorial-python-container-agent-start-event.png" alt="イベントエクスプローラーに表示される Agent の開始イベント" style="width:100%;" >}}

アプリケーションを起動した状態で、いくつかの curl リクエストを送信します。

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

しばらく待って、Datadog の [**APM > Traces**][11] にアクセスすると、API 呼び出しに対応するトレースの一覧が表示されます。

{{< img src="tracing/guide/tutorials/tutorial-java-container-traces2.png" alt="Traces from the sample app in APM Trace Explorer" style="width:100%;" >}}

`h2` はこのチュートリアルのために埋め込まれたメモリ内データベースで、`notes` は Spring Boot アプリケーションです。トレースリストには、すべてのスパン、いつ開始したか、どのリソースがスパンで追跡されたか、どれくらいの時間がかかったか、が表示されます。

もし、数分待ってもトレースが表示されない場合は、Traces Search フィールドのフィルターをクリアしてください (使用していない `ENV` などの環境変数にフィルターをかけている場合があります)。

### トレースの検証

Traces ページで、`POST /notes` トレースをクリックすると、各スパンにかかった時間や、あるスパンが完了する前に他のスパンが発生したことを示すフレームグラフが表示されます。グラフの上部にあるバーは、前の画面で選択したスパンです (この場合、ノートアプリケーションへの最初のエントリポイントです)。

バーの幅は、それが完了するまでにかかった時間を示します。低い深さのバーは、高い深さのバーの寿命の間に完了するスパンを表します。

`POST` トレースのフレームグラフは次のようになります。

{{< img src="tracing/guide/tutorials/tutorial-java-container-post-flame.png" alt="POST トレースのフレームグラフ。" style="width:100%;" >}}

`GET /notes` トレースは次のようになります。

{{< img src="tracing/guide/tutorials/tutorial-java-container-get-flame.png" alt="GET トレースのフレームグラフ。" style="width:100%;" >}}

### トレーシングのコンフィギュレーション

Java トレーシングライブラリは、Java のビルトイン Agent とモニタリングのサポートを利用します。Dockerfile のフラグ `-javaagent:../dd-java-agent.jar` は、JVM が Java Agent として実行できるように、Java トレーシングライブラリをどこで見つけるかを指示します。Java Agent については、[https://www.baeldung.com/java-instrumentation][7] で詳しく説明されています。

`dd.trace.sample.rate` フラグは、このアプリケーションのサンプルレートを設定します。Dockerfile の ENTRYPOINT コマンドでは、この値を `1` に設定しています。これは、`notes` サービスに対する全てのリクエストの 100% が、分析と表示のために Datadog のバックエンドに送信されることを意味します。低容量のテストアプリケーションの場合、これは問題ありません。実稼働時や大量のデータを扱う環境では、このようなことはしないでください。代わりに、リクエストの一部をサンプリングします。例えば、`-Ddd.trace.sample.rate=0.1` とすると、リクエストの 10% 分のトレースが Datadog に送信されます。[トレース構成設定][14]と[サンプリング機構][15]について詳しくお読みください。

このコマンドのサンプリングレートフラグは `-jar` フラグの_前に_表示されていることに注意してください。これは、このフラグがアプリケーションではなく、Java Virtual Machine のパラメーターだからです。アプリケーションに Java Agent を追加するときは、このフラグを正しい場所に指定するようにしてください。

## Java アプリケーションに手動インスツルメンテーションを追加する

自動インスツルメンテーションは便利ですが、より細かいスパンが欲しい場合もあります。Datadog の Java DD Trace API では、アノテーションやコードを使用してコード内のスパンを指定することができます。

次のステップでは、コードにアノテーションを追加して、いくつかのサンプルメソッドをトレースする方法を説明します。

1. `/notes/src/main/java/com/datadog/example/notes/NotesHelper.java` を開きます。このサンプルには、コードにカスタムトレースを設定するさまざまな方法を示す、コメントアウトされたコードがすでに含まれています。

2. 手動トレーシングをサポートするためのライブラリをインポートしている行のコメントを解除します。

   ```java
   import datadog.trace.api.Trace;
   import datadog.trace.api.DDTags;
   import io.opentracing.Scope;
   import io.opentracing.Span;
   import io.opentracing.Tracer;
   import io.opentracing.tag.Tags;
   import io.opentracing.util.GlobalTracer;
   import java.io.PrintWriter;
   import java.io.StringWriter
   ```

3. 2 つのパブリックプロセスを手動でトレースしている行のコメントを解除します。これらは、`@Trace` アノテーションを使用して、`operationName` や `resourceName` などのアスペクトをトレースで指定することを示しています。
   ```java
   @Trace(operationName = "traceMethod1", resourceName = "NotesHelper.doLongRunningProcess")
   // ...
   @Trace(operationName = "traceMethod2", resourceName = "NotesHelper.anotherProcess")
   ```

4. また、アプリケーション内の特定のコードブロックに対して、別のスパンを作成することもできます。スパン内には、サービスやリソース名のタグ、エラー処理タグを追加します。これらのタグは、Datadog の視覚化でスパンとメトリクスを表示するフレームグラフになります。プライベートメソッドを手動でトレースする行のコメントを解除します。

   ```java
           Tracer tracer = GlobalTracer.get();
           // Tags can be set when creating the span
           Span span = tracer.buildSpan("manualSpan1")
               .withTag(DDTags.SERVICE_NAME, "NotesHelper")
               .withTag(DDTags.RESOURCE_NAME, "privateMethod1")
               .start();
           try (Scope scope = tracer.activateSpan(span)) {
               // Tags can also be set after creation
               span.setTag("postCreationTag", 1);
               Thread.sleep(30);
               Log.info("Hello from the custom privateMethod1");
   ```
   また、エラー時にタグを設定する行も:
   ```java
        } catch (Exception e) {
            // Set error on span
            span.setTag(Tags.ERROR, true);
            span.setTag(DDTags.ERROR_MSG, e.getMessage());
            span.setTag(DDTags.ERROR_TYPE, e.getClass().getName());

            final StringWriter errorString = new StringWriter();
            e.printStackTrace(new PrintWriter(errorString));
            span.setTag(DDTags.ERROR_STACK, errorString.toString());
            Log.info(errorString.toString());
        } finally {
            span.finish();
        }
   ```

5. `notes/pom.xml` を開き、手動トレースの依存関係を構成する行のコメントを解除して、Maven ビルドを更新します。`dd-trace-api` ライブラリは `@Trace` アノテーションに使用され、`opentracing-util` と `opentracing-api` は手動でスパンを作成するために使用されます。

6. コンテナを再構築します。

   ```sh
   docker-compose -f all-docker-compose.yaml build notes
   docker-compose -f all-docker-compose.yaml up notes
   ```

7. いくつかの HTTP リクエスト、特にいくつかの `GET` リクエストを再送します。
8. トレースエクスプローラーで、新しい `GET` リクエストの 1 つをクリックすると、次のようなフレームグラフが表示されます。

   {{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="カスタムインスツルメンテーションを用いた GET トレースのフレームグラフ。" style="width:100%;" >}}

   `getAll` 関数にカスタムトレースが追加され、スタックトレースがより詳細になったことに注意してください。

   手動でスパンを作成した `privateMethod` は、他のコールとは別のブロックとして表示され、別の色でハイライトされています。`@Trace` アノテーションを使用した他のメソッドは、`GET` リクエスト (`notes` アプリケーション) と同じサービス、同じ色で表示されます。カスタムインスツルメンテーションは、ハイライトして監視する必要があるコードの重要な部分がある場合に有効です。

詳しくは、[カスタムインストルメンテーション][12]をご覧ください。

## 分散型トレーシングを見るために 2 つ目のアプリケーションを追加する

単一のアプリケーションをトレースすることは素晴らしいスタートですが、トレースの本当の価値は、リクエストがサービスを通じてどのように流れるかを見ることです。これは、_分散型トレーシング_と呼ばれています。

サンプルプロジェクトには `calendar` という 2 番目のアプリケーションが含まれており、呼び出されるたびにランダムな日付を返します。Notes アプリケーションの `POST` エンドポイントには、`add_date` という名前の 2 つ目のクエリパラメーターがあります。このパラメータが `y` に設定されると、Notes はカレンダーアプリケーションを呼び出して、ノートに追加する日付を取得します。

1. ノートアプリと同様に、Dockerfile の起動コマンドに `dd-java-agent` を追加して、トレース用のカレンダーアプリの構成を確認します。`calendar/Dockerfile.calendar.maven` を開き、すでに `dd-java-agent` がダウンロードされていることを確認します。

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. 同じ `calendar/dockerfile.calendar.maven` ファイル内で、トレースなしで実行するための `ENTRYPOINT` 行をコメントアウトしてください。次に、トレースを有効にしてアプリケーションを実行する `ENTRYPOINT` 行のコメントを解除します。

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/calendar-0.0.1-SNAPSHOT.jar"]
   ```

   <div class="alert alert-warning"><strong>注</strong>: 繰り返しになりますが、フラグ、特にサンプルレートは、このチュートリアル以外の環境では、必ずしも適切ではありません。実際の環境で何を使うべきかについては、<a href="#tracing-configuration">トレース構成</a>を読んでください。</div>

3. `docker/all-docker-compose.yaml` を開き、`calendar` サービス用の環境変数のコメントを解除して、アプリ用の Agent ホストと Docker 用の統合サービスタグをセットアップします。

   ```yaml
     calendar:
       container_name: calendar
       restart: always
       build:
         context: ../
         dockerfile: calendar/dockerfile.calendar.maven
       labels:
         - com.datadoghq.tags.service="calendar"
         - com.datadoghq.tags.env="dev"
         - com.datadoghq.tags.version="0.0.1"
       environment:
         - DD_SERVICE=calendar
         - DD_ENV=dev
         - DD_VERSION=0.0.1
         - DD_AGENT_HOST=datadog-agent
      ports:
        - 9090:9090
      depends_on:
        - datadog-agent
   ```

4. `notes` サービスセクションで、`CALENDAR_HOST` 環境変数と `depends_on` の `calendar` エントリのコメントを解除して、2 つのアプリの間で必要な接続を行います。

   ```yaml
     notes:
     ...
       environment:
         - DD_SERVICE=notes
         - DD_ENV=dev
         - DD_VERSION=0.0.1
         - DD_AGENT_HOST=datadog-agent
         - CALENDAR_HOST=calendar
       depends_on:
         - calendar
         - datadog-agent
   ```

5. コンテナを再起動し、マルチサービスアプリケーションを構築します。まず、実行中のコンテナをすべて停止します。
   ```
   docker-compose -f all-docker-compose.yaml down
   ```

   その後、以下のコマンドを実行して起動します。
   ```
   docker-compose -f all-docker-compose.yaml build
   docker-compose -f all-docker-compose.yaml up
   ```

6. すべてのコンテナが立ち上がった後、`add_date` パラメーターを指定して POST リクエストを送信します。

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `{"id":1,"description":"hello_again with date 2022-11-06"}`


7. トレースエクスプローラーで、この最新のトレースをクリックすると、2 つのサービス間の分散型トレーシングが表示されます。

   {{< img src="tracing/guide/tutorials/tutorial-java-container-distributed.png" alt="分散型トレーシングのフレームグラフ。" style="width:100%;" >}}

`notes` アプリケーションでは何も変更していないことに注意してください。Datadog は `notes` から `calendar` への HTTP コールに使用される `okHttp` ライブラリと、`notes` と `calendar` の HTTP リクエストをリッスンするために使用する Jetty ライブラリの両方を自動的にインスツルメントします。これにより、トレース情報を 1 つのアプリケーションから他のアプリケーションに渡すことができ、分散型トレースをキャプチャすることができます。

## トラブルシューティング

もし、期待通りのトレースが受信できない場合は、Java トレーサーのでデバッグモードを設定してください。詳しくは[デバッグモードの有効化][13]を読んでください。
## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/guide/#enabling-tracing-tutorials
[2]: /ja/tracing/trace_collection/dd_libraries/java/
[3]: /ja/account_management/api-app-keys/
[4]: /ja/tracing/trace_collection/compatibility/java/
[6]: /ja/getting_started/site/
[8]: https://app.datadoghq.com/event/explorer
[7]: https://www.baeldung.com/java-instrumentation
[9]: https://github.com/DataDog/apm-tutorial-java-host
[10]: /ja/getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/apm/traces
[12]: /ja/tracing/trace_collection/custom_instrumentation/java/
[13]: /ja/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[14]: /ja/tracing/trace_collection/library_config/java/
[15]: /ja/tracing/trace_pipeline/ingestion_mechanisms/?tab=java