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
title: チュートリアル - Datadog Agent と同じホスト上の Java アプリケーションのトレースを有効にする
---

## 概要

このチュートリアルでは、ホスト上にインストールされたサンプル Java アプリケーションでトレースを有効にするための手順を説明します。このシナリオでは、アプリケーションと同じホスト上に Datadog Agent をインストールします。

コンテナ内またはクラウドインフラストラクチャーのアプリケーション、コンテナ内の Agent、異なる言語で書かれたアプリケーションなど、その他のシナリオについては、その他の[トレース有効化のチュートリアル][1]を参照してください。

Java の一般的なトレース設定ドキュメントについては、[Java アプリケーションのトレース][2]を参照してください。

### 前提条件

- Datadog のアカウントと[組織の API キー][3]
- Git
- Curl
- sudo を使用する場合、root 権限を持つ物理または仮想 Linux ホスト
- ホスト上の Java 11 互換の JDK (単なる JRE ではありません)。このチュートリアルでは、同じマシン上でビルドし、同じマシンにデプロイしています。

## Agent のインストール

Datadog Agent をマシンにインストールしていない場合は、[**Integrations > Agent**][5] にアクセスし、お使いの OS を選択してください。例えば、ほとんどの Linux プラットフォームでは、`<YOUR_API_KEY>` を [Datadog API キー][3]に置き換えて、以下のスクリプトを実行することで Agent をインストールすることができます。

{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script.sh)"
{{< /code-block >}}

`datadoghq.com` 以外の Datadog サイトにデータを送信するには、`DD_SITE` 環境変数を [Datadog サイト][6]に置き換えてください。

[**Events &gt; Explorer**][8] を開き、オプションで `Datadog` ソースファセットでフィルタリングし、ホストへの Agent インストールを確認するイベントを探して、Agent が実行されており、Datadog にデータを送信していることを確認します。

{{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="Agent がホストにインストールされたことを示す Datadog からのメッセージを表示するイベントエクスプローラー。" style="width:70%;" >}}

<div class="alert alert-info">数分後、Datadog にホストが表示されない場合 (<strong>Infrastructure > Host map</strong>)、<a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>Organization Settings > API Keys</strong></a> にある組織の正しい API キーを使用したことを確認してください。</div>


## サンプル Java アプリケーションのインストールと実行

次に、トレースするためのサンプルアプリケーションをインストールします。このチュートリアルのコードサンプルは [github.com/DataDog/apm-tutorial-java-host][9] で見ることができます。以下を実行することで git リポジトリの複製を行います。

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

Maven または Gradle のどちらか使いやすい方を使用して、サンプルアプリをビルドします。`apm-tutorial-java-host` 内の `notes` ディレクトリに移動して、以下のいずれかを実行してください。

{{< tabs >}}

{{% tab "Maven" %}}

```sh
./mvnw clean package
```

{{< /tabs >}}

{{% tab "Gradle" %}}

```sh
./gradlew clean bootJar
```

これは、Spring Boot Jar プラグインを使用して、Java アプリケーションを実行するために必要なすべてのファイルを含む単一の Jar ファイルを作成するものです。

{{< /tabs >}}

{{< /tabs >}}

以下を実行することでアプリケーションを起動します。

{{< tabs >}}

{{% tab "Maven" %}}

```sh
java -jar target/notes-0.0.1-SNAPSHOT.jar
```

{{< /tabs >}}

{{% tab "Gradle" %}}

```sh
java -jar build/libs/notes-0.0.1-SNAPSHOT.jar
```

{{< /tabs >}}

{{< /tabs >}}

また、OS がサポートしていれば、`scripts` ディレクトリに用意されている以下のスクリプトを使って、アプリケーションをビルドして実行することもできます。

{{< tabs >}}

{{% tab "Maven" %}}

```sh
sh ./scripts/mvn_run.sh
```

{{< /tabs >}}

{{% tab "Gradle" %}}

```sh
sh ./scripts/gradle_run.sh
```

{{< /tabs >}}

{{< /tabs >}}

サンプルの `notes_app` アプリケーションは、インメモリデータベースにデータを保存する基本的な REST API です。別のターミナルを開き、`curl` を使っていくつかの API リクエストを送信します。

`curl localhost:8080/notes`
: まだデータベースに何もないので `[]` を返します

`curl -X POST 'localhost:8080/notes?desc=hello'`
: ノートに `hello` という説明と `1` という ID 値を追加します。`{"id":1,"description":"hello"}` を返します。

`curl localhost:8080/notes/1`
: `id` の値が `1` であるノートを返します: `{"id":1,"description":"hello"}`

`curl -X POST 'localhost:8080/notes?desc=otherNote'`
: ノートに `otherNote` という説明と `2` という ID 値を追加します。`{"id":2,"description":"otherNote"}` を返します。

`curl localhost:8080/notes`
: データベースの内容を返します: `[{"id":1,"description":"hello"},{"id";2,"description":"otherNote"}]`

さらに API コールを実行し、アプリケーションのアクションを確認します。終了したら、Ctrl+C でアプリケーションを停止します。

## Datadog トレーシングのインストール

次に、Java トレーシングライブラリ (Java Agent と呼ばれることもあります) をダウンロードします。`apm-tutorial-java-host` ディレクトリから、以下を実行します。

{{< code-block lang="sh" >}}
curl -Lo dd-java-agent.jar https://dtdg.co/latest-java-tracer
{{< /code-block >}}

お使いの OS が curl をサポートしていない場合は、直接 `https://dtdg.co/latest-java-tracer ` にアクセスして `dd-java-agent.jar` ファイルをダウンロードすることができます。

## 自動インスツルメンテーションによる Java アプリケーションの起動

トレースの生成と収集を開始するには、Datadog にトレースデータを送信させるフラグを追加してサンプルアプリケーションを再起動します。

<div class="alert alert-warning"><strong>注</strong>: これらのサンプルコマンドのフラグ、特にサンプルレートは、このチュートリアル以外の環境では、必ずしも適切ではありません。実際の環境で何を使うべきかについては、<a href="#tracing-configuration">トレース構成</a>を読んでください。</div>


{{< tabs >}}

{{% tab "Maven" %}}

`notes` ディレクトリから、以下を実行します。

```sh
java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 target/notes-0.0.1-SNAPSHOT.jar
```

または、提供されたスクリプトを使用します。

```sh
sh ./scripts/mvn_instrumented_run.sh
```

{{< /tabs >}}

{{% tab "Gradle" %}}

`notes` ディレクトリから、以下を実行します。

```sh
java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 build/libs/notes-0.0.1-SNAPSHOT.jar
```

または、提供されたスクリプトを使用します。

```sh
sh ./scripts/gradle_instrumented_run.sh
```

{{< /tabs >}}

{{< /tabs >}}


再びアプリケーションにリクエストを送るには、`curl` を使用します。

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

しばらく待って、Datadog の UI を見てみてください。[**APM > Traces**][11] に移動します。Traces リストには、次のように表示されます。

{{< img src="tracing/guide/tutorials/tutorial-java-host-traces.png" alt="Traces ビューには、ホストから入ってくるトレースデータが表示されます。" style="width:100%;" >}}

`h2` はこのチュートリアルのために埋め込まれたメモリ内データベースで、`notes` は Spring Boot アプリケーションです。トレースリストには、すべてのスパン、いつ開始したか、どのリソースがスパンで追跡されたか、どれくらいの時間がかかったか、が表示されます。

もし、トレースが表示されない場合は、Traces Search フィールドのフィルターをクリアしてください (使用していない `ENV` などの環境変数にフィルターをかけている場合があります)。

### トレースの検証

Traces ページで、`POST /notes` トレースをクリックすると、各スパンにかかった時間や、あるスパンが完了する前に他のスパンが発生したことを示すフレームグラフが表示されます。グラフの上部にあるバーは、前の画面で選択したスパンです (この場合、ノートアプリケーションへの最初のエントリポイントです)。

バーの幅は、それが完了するまでにかかった時間を示します。低い深さのバーは、高い深さのバーの寿命の間に完了するスパンを表します。

`POST` トレースのフレームグラフは次のようになります。

{{< img src="tracing/guide/tutorials/tutorial-java-host-post-flame.png" alt="POST トレースのフレームグラフ。" style="width:100%;" >}}

`GET /notes` トレースは次のようになります。

{{< img src="tracing/guide/tutorials/tutorial-java-host-get-flame.png" alt="GET トレースのフレームグラフ。" style="width:100%;" >}}


### トレーシングのコンフィギュレーション

Java トレーシングライブラリは、Java のビルトイン Agent とモニタリングのサポートを利用します。フラグ `-javaagent:../dd-java-agent.jar` は、JVM が Java Agent として実行できるように、Java トレーシングライブラリをどこで見つけるかを指示します。Java Agent については、[https://www.baeldung.com/java-instrumentation][7] で詳しく説明されています。

Java Agent を有効にする `javaagent` フラグに加え、起動コマンドでは、Datadog 内でアプリケーションを一意に識別するための 3 つの[統合サービスタグ付け][10]の設定を指定します。監視するアプリケーションには、必ず `env`、`service`、`version` タグを指定してください。

そして最後に、`dd.trace.sample.rate` フラグは、このアプリケーションのサンプルレートを設定します。上記の起動コマンドでは、この値を `1` に設定しています。これは、`notes` サービスに対する全てのリクエストの 100% が、分析と表示のために Datadog のバックエンドに送信されることを意味します。低容量のテストアプリケーションの場合、これは問題ありません。実稼働時や大量のデータを扱う環境では、このようなことはしないでください。代わりに、リクエストの一部をサンプリングします。例えば、`-Ddd.trace.sample.rate=0.1` とすると、リクエストの 10% 分のトレースが Datadog に送信されます。[トレース構成設定][14]と[サンプリング機構][15]について詳しくお読みください。

このコマンドのフラグは `-jar` フラグの前に表示されていることに注意してください。これは、このフラグがアプリケーションではなく、Java Virtual Machine のパラメーターだからです。アプリケーションに Java Agent を追加するときは、このフラグを正しい場所に指定するようにしてください。


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

5. ビルドスクリプトの構成を更新し、アプリケーションをビルドします。
{{< tabs >}}

{{% tab "Maven" %}}

a. `notes/pom.xml` を開き、手動トレースの依存関係を構成する行のコメントを解除します。`dd-trace-api` ライブラリは `@Trace` アノテーションに使用され、`opentracing-util` と `opentracing-api` は手動でスパンを作成するために使用されます。

b. 以下を実行します。

   ```sh
   ./mvnw clean package

   java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 target/notes-0.0.1-SNAPSHOT.jar
   ```

またはスクリプトを使用します。

   ```sh
   sh ./scripts/mvn_instrumented_run.sh
   ```

{{< /tabs >}}

{{% tab "Gradle" %}}

a. `notes/build.gradle` を開き、手動トレースの依存関係を構成する行のコメントを解除します。`dd-trace-api` ライブラリは `@Trace` アノテーションに使用され、`opentracing-util` と `opentracing-api` は手動でスパンを作成するために使用されます。

b. 以下を実行します。
   ```sh
   ./gradlew clean bootJar

   java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 build/libs/notes-0.0.1-SNAPSHOT.jar
   ```

またはスクリプトを使用します。

   ```sh
   sh ./scripts/gradle_instrumented_run.sh
   ```

{{< /tabs >}}

{{< /tabs >}}

6. いくつかの HTTP リクエスト、特にいくつかの `GET` リクエストを再送します。
7. トレースエクスプローラーで、新しい `GET` リクエストの 1 つをクリックすると、次のようなフレームグラフが表示されます。

   {{< img src="tracing/guide/tutorials/tutorial-java-host-custom-flame.png" alt="カスタムインスツルメンテーションを用いた GET トレースのフレームグラフ。" style="width:100%;" >}}

   `getAll` 関数にカスタムトレースが追加され、スタックトレースがより詳細になったことに注意してください。

   手動でスパンを作成した `privateMethod` は、他のコールとは別のブロックとして表示され、別の色でハイライトされています。`@Trace` アノテーションを使用した他のメソッドは、`GET` リクエスト (`notes` アプリケーション) と同じサービス、同じ色で表示されます。カスタムインスツルメンテーションは、ハイライトして監視する必要があるコードの重要な部分がある場合に有効です。

詳しくは、[カスタムインストルメンテーション][12]をご覧ください。

## 分散型トレーシングを見るために 2 つ目のアプリケーションを追加する

単一のアプリケーションをトレースすることは素晴らしいスタートですが、トレースの本当の価値は、リクエストがサービスを通じてどのように流れるかを見ることです。これは、_分散型トレーシング_と呼ばれています。

サンプルプロジェクトには `calendar` という 2 番目のアプリケーションが含まれており、呼び出されるたびにランダムな日付を返します。Notes アプリケーションの `POST` エンドポイントには、`add_date` という名前の 2 つ目のクエリパラメーターがあります。このパラメータが `y` に設定されると、Notes はカレンダーアプリケーションを呼び出して、ノートに追加する日付を取得します。

1. サンプルリポジトリの `/calendar` ディレクトリに移動し、カレンダーアプリをビルドして実行します。
{{< tabs >}}

{{% tab "Maven" %}}

次を実行します。

```sh
./mvnw clean package

java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=calendar -Ddd.env=dev -jar -Ddd.version=0.0.1 target/calendar-0.0.1-SNAPSHOT.jar
```

またはスクリプトを使用します。

```sh
sh ./scripts/mvn_instrumented_run.sh
```

{{< /tabs >}}

{{% tab "Gradle" %}}

次を実行します。
```sh
./gradlew bootJar

java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=calendar -Ddd.env=dev -jar -Ddd.version=0.0.1 build/libs/calendar-0.0.1-SNAPSHOT.jar
```

またはスクリプトを使用します。

```sh
sh ./scripts/gradle_instrumented_run.sh
```

{{< /tabs >}}

{{< /tabs >}}


2. `add_date` パラメーターを指定して、POST リクエストを送信します。

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `{"id":1,"description":"hello_again with date 2022-11-06"}`


3. トレースエクスプローラーで、この最新の `notes` トレースをクリックすると、2 つのサービス間の分散型トレーシングが表示されます。

   {{< img src="tracing/guide/tutorials/tutorial-java-host-distributed.png" alt="分散型トレーシングのフレームグラフ。" style="width:100%;" >}}

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
[10]: /ja/getting_started/tagging/unified_service_tagging/#non-containerized-environment
[11]: https://app.datadoghq.com/apm/traces
[12]: /ja/tracing/trace_collection/custom_instrumentation/java/
[13]: /ja/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[14]: /ja/tracing/trace_collection/library_config/java/
[15]: /ja/tracing/trace_pipeline/ingestion_mechanisms/?tab=java