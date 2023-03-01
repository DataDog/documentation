---
further_reading:
- link: /tracing/trace_collection/library_config/java/
  tags: ドキュメント
  text: トレーシングライブラリの追加構成オプション
- link: /tracing/trace_collection/dd_libraries/java/
  tags: ドキュメント
  text: トレーシングライブラリの詳細設定手順
- link: /tracing/trace_collection/compatibility/java/
  tags: ドキュメント
  text: 自動インスツルメンテーションのためにサポートされている Java フレームワーク
- link: /tracing/trace_collection/custom_instrumentation/java/
  tags: ドキュメント
  text: トレースとスパンを手動で構成する
- link: https://github.com/DataDog/dd-trace-java
  tags: GitHub
  text: トレーシングライブラリオープンソースコードリポジトリ
kind: ガイド
title: チュートリアル - コンテナ内の Java アプリケーションとホスト上の Agent のトレースを有効にする
---

## 概要

このチュートリアルでは、コンテナにインストールされたサンプル Java アプリケーションでトレースを有効にするための手順を説明します。このシナリオでは、Datadog Agent はホストにインストールされています。

ホスト上のアプリケーションと Agent、コンテナまたはクラウドインフラストラクチャー内のアプリケーションと Agent、異なる言語で書かれたアプリケーションなど、その他のシナリオについては、その他の[トレース有効化のチュートリアル][1]を参照してください。

Java の一般的なトレース設定ドキュメントについては、[Java アプリケーションのトレース][2]を参照してください。

### 前提条件

- Datadog のアカウントと[組織の API キー][3]
- Git
- Docker バージョン 20.10 以上
- Curl

## Agent のインストール

Datadog Agent をマシンにインストールしていない場合は、今すぐインストールしてください。

1. [**Integrations > Agent**][5] にアクセスし、お使いの OS を選択してください。例えば、ほとんどの Linux プラットフォームでは、`<YOUR_API_KEY>` を [Datadog API キー][3]に置き換えて、以下のスクリプトを実行することで Agent をインストールすることができます。

   {{< code-block lang="bash" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
   {{< /code-block >}}

   `datadoghq.com` 以外の Datadog サイトにデータを送信するには、`DD_SITE` 環境変数を [Datadog サイト][6]に置き換えてください。

2. Agent がコンテナからトレースデータを受信するように構成されていることを確認します。その[コンフィギュレーションファイル][15]を開き、`apm_config:` がコメント解除されていること、そして `apm_non_local_traffic` がコメント解除されており、`true` に設定されていることを確認します。

3. ホスト上で Agent サービスを開始します。コマンドは、[演算子によって異なります][14]。例:

   **MacOS**: `launchctl start com.datadoghq.agent`<br/>
   **Linux**: `sudo service datadog-agent start`

4. [**Events &gt; Explorer**][8] を開き、オプションで `Datadog` ソースファセットでフィルタリングし、ホストへの Agent インストールを確認するイベントを探して、Agent が実行されており、Datadog にデータを送信していることを確認します。

   {{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="Agent がホストにインストールされたことを示す Datadog からのメッセージを表示するイベントエクスプローラー。" style="width:70%;" >}}

<div class="alert alert-info">数分後、Datadog にホストが表示されない場合 (<strong>Infrastructure > Host map</strong>)、<a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>Organization Settings > API Keys</strong></a> にある組織の正しい API キーを使用したことを確認してください。</div>


## Docker 化されたサンプル Java アプリケーションのインストール

このチュートリアルのコードサンプルは、GitHub の [github.com/Datadog/apm-tutorial-java-host][9] にあります。まずは、このリポジトリを複製してください。

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

このリポジトリには、Docker コンテナ内で実行できるようにあらかじめ構成されたマルチサービスの Java アプリケーションが含まれています。サンプルアプリは、データの追加や変更を行うための REST API を備えた基本的なノートアプリです。

このチュートリアルでは、`docker-compose` の YAML ファイルは `apm-tutorial-java-host/docker` フォルダに格納されています。この後の説明は、Agent が Linux ホストで動作していることを想定していますので、`service-docker-compose-linux.yaml` ファイルを使用します。もし、お使いの Agent が macOS や Windows のホスト上にある場合は、同じ手順で、代わりに `service-docker-compose.yaml` ファイルを使用します。Linux ファイルには Linux 固有の Docker 設定が含まれており、ファイル内のコメントで説明されています。

`notes` と `calendar` の各ディレクトリには、アプリケーションをビルドするための Dockerfile が、Maven と Gradle の 2 つのセットで用意されています。このチュートリアルでは Maven を使用しますが、Gradle に慣れている場合は、ビルドコマンドを変更することで、Maven の代わりに Gradle を使用することができます。

### サンプルアプリケーションの起動と実行

1. アプリケーションのコンテナを構築するには、`/docker` ディレクトリの中から以下を実行します。

   {{< code-block lang="sh" >}}
docker-compose -f service-docker-compose-linux.yaml build notes
{{< /code-block >}}

2. コンテナを起動します。

   {{< code-block lang="sh" >}}
docker-compose -f service-docker-compose-linux.yaml up notes
{{< /code-block >}}

   `docker ps` コマンドでコンテナを表示することで、実行されていることを確認することができます。

3. 別のターミナルを開いて、アプリを行使するために API リクエストを送信します。`notes` アプリケーションは、同じコンテナで実行されているメモリ内 H2 データベースにデータを保存する REST API です。これにいくつかのコマンドを送信します。

`curl 'localhost:8080/notes'`
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
docker-compose -f service-docker-compose-linux.yaml down
{{< /code-block >}}

2. コンテナを削除します。
   {{< code-block lang="sh" >}}
docker-compose -f service-docker-compose-linux.yaml rm
{{< /code-block >}}

## トレースを有効にする

Java アプリケーションが動作するようになったので、トレースを有効にするための構成を行います。

1. Java トレーシングパッケージをプロジェクトに追加します。`notes/dockerfile.notes.maven` ファイルを開き、`dd-java-agent` をダウンロードする行のコメントを解除してください。

   ```
   RUN curl -Lo dd-java-agent.jar https://dtdg.co/latest-java-tracer
   ```

2. 同じ `notes/dockerfile.notes.maven` ファイル内で、トレースなしで実行するための `ENTRYPOINT` 行をコメントアウトしてください。次に、トレースを有効にしてアプリケーションを実行する `ENTRYPOINT` 行のコメントを解除します。

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/notes-0.0.1-SNAPSHOT.jar"]
   ```

   これにより、アプリケーションは自動的に Datadog のサービスにインスツルメンテーションされます。

   <div class="alert alert-warning"><strong>注</strong>: これらのサンプルコマンドのフラグ、特にサンプルレートは、このチュートリアル以外の環境では、必ずしも適切ではありません。実際の環境で何を使うべきかについては、<a href="#tracing-configuration">トレース構成</a>を読んでください。</div>

3. 異なるバージョンやデプロイ環境間でトレースされたサービスを識別する[統合サービスタグ][10]により、Datadog 内で相関が取れるようになり、検索やフィルターに利用できるようになります。統合サービスタグ付けに使用する環境変数は、`DD_SERVICE`、`DD_ENV`、`DD_VERSION` の 3 つです。Docker でデプロイされたアプリケーションの場合、これらの環境変数を Dockerfile または `docker-compose` ファイル内に追加することができます。
   このチュートリアルでは、`service-docker-compose-linux.yaml` ファイルにこれらの環境変数がすでに定義されています。

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

## Agent にトレースを送信するためのコンテナの構成

1. コンテナのコンポーズファイルである `docker/service-docker-compose-linux.yaml` を開いてください。

2. コンテナセクションの `notes` に、環境変数 `DD_AGENT_HOST` を追加し、Agent のホスト名を指定します。Docker 20.10 以降では、`host.docker.internal` を使用して、Docker を実行しているホストであることも指定します。
   ```yaml
       environment:
        - DD_AGENT_HOST=host.docker.internal
   ```
   Docker が 20.10 より古い場合、以下のコマンドを実行し、返された IP を `host.docker.internal` に構成されている任意の場所で使用してください。
   ```sh
   docker network inspect bridge --format='{{(index .IPAM.Config 0).Gateway}}'
   ```

3. **Linux の場合**: YAML には `extra_hosts` も指定されており、Docker の内部ネットワークでの通信を許可していることに注意してください。Docker が 20.10 より古い場合、この `extra_hosts` の構成行を削除してください。

コンポーズファイルの `notes` セクションは次のような感じになっているはずです。

   ```yaml
     notes:
       container_name: notes
       restart: always
       build: 
         context: ../
         dockerfile: notes/dockerfile.notes.maven
       ports:
         - 8080:8080
       extra_hosts:                             # Linux のみ
         - "host.docker.internal:host-gateway"  # Linux のみ
       labels:
         - com.datadoghq.tags.service="notes"
         - com.datadoghq.tags.env="dev"
         - com.datadoghq.tags.version="0.0.1"
       environment:
         - DD_SERVICE=notes
         - DD_ENV=dev
         - DD_VERSION=0.0.1
         - DD_AGENT_HOST=host.docker.internal
   ```

## 自動トレースを見るためにコンテナを起動する

トレーシングライブラリがインストールされ、Agent が動作しているので、アプリケーションを再起動し、トレースの受信を開始します。以下のコマンドを実行します。

```
docker-compose -f service-docker-compose.yaml build notes
docker-compose -f service-docker-compose.yaml up notes
```

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

{{< img src="tracing/guide/tutorials/tutorial-java-container-traces.png" alt="APM トレースエクスプローラーのサンプルアプリのトレース" style="width:100%;" >}}

`h2` はこのチュートリアルのために埋め込まれたインメモリデータベースで、`notes` は Spring Boot アプリケーションです。トレースリストには、すべてのスパン、いつ開始したか、どのリソースがスパンで追跡されたか、どれくらいの時間がかかったか、が表示されます。

もし、数分待ってもトレースが表示されない場合は、Agent が実行していることを確認してください。Traces Search フィールドのフィルターをクリアしてください (使用していない `ENV` などの環境変数にフィルターをかけている場合があります)。

### トレースの検証

Traces ページで、`POST /notes` トレースをクリックすると、各スパンにかかった時間や、あるスパンが完了する前に他のスパンが発生したことを示すフレームグラフが表示されます。グラフの上部にあるバーは、前の画面で選択したスパンです (この場合、ノートアプリケーションへの最初のエントリポイントです)。

バーの幅は、それが完了するまでにかかった時間を示します。低い深さのバーは、高い深さのバーの寿命の間に完了するスパンを表します。

`POST` トレースのフレームグラフは次のようになります。

{{< img src="tracing/guide/tutorials/tutorial-java-container-post-flame.png" alt="POST トレースのフレームグラフ。" style="width:100%;" >}}

`GET /notes` トレースは次のようになります。

{{< img src="tracing/guide/tutorials/tutorial-java-container-get-flame.png" alt="GET トレースのフレームグラフ。" style="width:100%;" >}}

### トレーシングのコンフィギュレーション

Java トレーシングライブラリは、Java のビルトイン Agent とモニタリングのサポートを利用します。Dockerfile のフラグ `-javaagent:../dd-java-agent.jar` は、JVM が Java Agent として実行できるように、Java トレーシングライブラリをどこで見つけるかを指示します。Java Agent については、[https://www.baeldung.com/java-instrumentation][7] で詳しく説明されています。

`dd.trace.sample.rate` フラグは、このアプリケーションのサンプルレートを設定します。Dockerfile の ENTRYPOINT コマンドでは、この値を `1` に設定しています。これは、`notes` サービスに対する全てのリクエストの 100% が、分析と表示のために Datadog のバックエンドに送信されることを意味します。低容量のテストアプリケーションの場合、これは問題ありません。実稼働時や大量のデータを扱う環境では、このようなことはしないでください。代わりに、リクエストの一部をサンプリングします。例えば、`-Ddd.trace.sample.rate=0.1` とすると、リクエストの 10% 分のトレースが Datadog に送信されます。[トレース構成設定][17]と[サンプリング機構][16]について詳しくお読みください。

このコマンドのサンプリングレートフラグは `-jar` フラグの前に表示されていることに注意してください。これは、このフラグがアプリケーションではなく、Java Virtual Machine のパラメーターだからです。アプリケーションに Java Agent を追加するときは、このフラグを正しい場所に指定するようにしてください。


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

6. コンテナを再構築します (Linux では `service-docker-compose-linux.yaml` を使用します)。

   ```sh
   docker-compose -f service-docker-compose.yaml build notes
   docker-compose -f service-docker-compose.yaml up notes
   ```

7. いくつかの HTTP リクエスト、特にいくつかの `GET` リクエストを再送します。
5. トレースエクスプローラーで、新しい `GET` リクエストの 1 つをクリックすると、次のようなフレームグラフが表示されます。

   {{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="カスタムインスツルメンテーションを用いた GET トレースのフレームグラフ。" style="width:100%;" >}}

   `getAll` 関数にカスタムトレースが追加され、スタックトレースがより詳細になったことに注意してください。

詳しくは、[カスタムインストルメンテーション][12]をご覧ください。

## 分散型トレーシングを見るために 2 つ目のアプリケーションを追加する

単一のアプリケーションをトレースすることは素晴らしいスタートですが、トレースの本当の価値は、リクエストがサービスを通じてどのように流れるかを見ることです。これは、_分散型トレーシング_と呼ばれています。

サンプルプロジェクトには `calendar` という 2 番目のアプリケーションが含まれており、呼び出されるたびにランダムな日付を返します。Notes アプリケーションの `POST` エンドポイントには、`add_date` という名前の 2 つ目のクエリパラメーターがあります。このパラメータが `y` に設定されると、Notes はカレンダーアプリケーションを呼び出して、ノートに追加する日付を取得します。

1. ノートアプリと同様に、Dockerfile の起動コマンドに `dd-java-agent` を追加して、トレース用のカレンダーアプリの構成を確認します。`calendar/Dockerfile.calendar.maven` を開き、すでに `dd-java-agent` がダウンロードされていることを確認します。
   ```
   RUN curl -Lo dd-java-agent.jar https://dtdg.co/latest-java-tracer 
   ```

2. 同じ `calendar/dockerfile.calendar.maven` ファイル内で、トレースなしで実行するための `ENTRYPOINT` 行をコメントアウトしてください。次に、トレースを有効にしてアプリケーションを実行する `ENTRYPOINT` 行のコメントを解除します。

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/calendar-0.0.1-SNAPSHOT.jar"]
   ```

   <div class="alert alert-warning"><strong>注</strong>: 繰り返しになりますが、フラグ、特にサンプルレートは、このチュートリアル以外の環境では、必ずしも適切ではありません。実際の環境で何を使うべきかについては、<a href="#tracing-configuration">トレース構成</a>を読んでください。</div>

3. `docker/service-docker-compose-linux.yaml` を開き、`calendar` サービス用の環境変数のコメントを解除して、アプリ用と Docker 用の Agent ホストと統合サービスタグをセットアップしてください。`notes` コンテナで行ったように、Docker が必要とするものに合わせて `DD_AGENT_HOST` 値を設定し、Linux でない場合は `extra_hosts` を削除してください。

   ```yaml
     calendar:
       container_name: calendar
       restart: always
       build: 
         context: ../
         dockerfile: calendar/dockerfile.calendar.maven
       ports:
         - 9090:9090
       labels:
         - com.datadoghq.tags.service="calendar"
         - com.datadoghq.tags.env="dev"
         - com.datadoghq.tags.version="0.0.1"
       environment:
         - DD_SERVICE=calendar
         - DD_ENV=dev
         - DD_VERSION=0.0.1
         - DD_AGENT_HOST=host.docker.internal
       extra_hosts:                            # Linux only
         - "host.docker.internal:host-gateway" # Linux only
   ```

4. `notes` サービスセクションで、`CALENDAR_HOST` 環境変数と `depends_on` の `calendar` エントリのコメントを解除して、2 つのアプリの間で必要な接続を行います。

   ```yaml
     notes:
     ...
       environment:
         - DD_SERVICE=notes
         - DD_ENV=dev
         - DD_VERSION=0.0.1
         - DD_AGENT_HOST=host.docker.internal
         - CALENDAR_HOST=calendar
       depends_on:
         - calendar
   ```

5. コンテナを再起動し、マルチサービスアプリケーションを構築します。まず、実行中のコンテナをすべて停止します。
   ```
   docker-compose -f service-docker-compose-linux.yaml down
   ```

   その後、以下のコマンドを実行して起動します。
   ```
   docker-compose -f service-docker-compose-linux.yaml build
   docker-compose -f service-docker-compose-linux.yaml up

   ```

6. `add_date` パラメーターを指定して、POST リクエストを送信します。

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `{"id":1,"description":"hello_again with date 2022-11-06"}`


7. トレースエクスプローラーで、この最新のトレースをクリックすると、2 つのサービス間の分散型トレーシングが表示されます。

   {{< img src="tracing/guide/tutorials/tutorial-java-container-distributed.png" alt="分散型トレーシングのフレームグラフ。" style="width:100%;" >}}

`notes` アプリケーションでは何も変更していないことに注意してください。Datadog は `notes` から `calendar` への HTTP コールに使用される `okHttp` ライブラリと、`notes` と `calendar` の HTTP リクエストをリッスンするために使用する Jetty ライブラリの両方を自動的にインスツルメントします。これにより、トレース情報を 1 つのアプリケーションから他のアプリケーションに渡すことができ、分散型トレースをキャプチャすることができます。

## トラブルシューティング

もし、期待通りのトレースが受信できない場合は、Java トレーサーのでデバッグモードを設定してください。詳しくは[デバッグモードの有効化][13]を読んでください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/guide/#enabling-tracing-tutorials
[2]: /ja/tracing/trace_collection/dd_libraries/java/
[3]: /ja/account_management/api-app-keys/
[4]: /ja/tracing/trace_collection/compatibility/java/
[5]: https://app.datadoghq.com/account/settings#agent/overview
[6]: /ja/getting_started/site/
[7]: https://www.baeldung.com/java-instrumentation
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-java-host
[10]: /ja/getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/apm/traces
[12]: /ja/tracing/trace_collection/custom_instrumentation/java/
[13]: /ja/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[14]: /ja/agent/guide/agent-commands/?tab=agentv6v7#start-the-agent
[15]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[16]: /ja/tracing/trace_pipeline/ingestion_mechanisms/?tab=java
[17]: /ja/tracing/trace_collection/library_config/java/