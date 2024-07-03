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
title: Tutorial - Enabling Tracing for a Java Application on Google Kubernetes Engine
---

## 概要

This tutorial walks you through the steps for enabling tracing on a sample Java application installed in a cluster on Google Kubernetes Engine (GKE). In this scenario, the Datadog Agent is also installed in the cluster.

ホスト、コンテナ、他のクラウドインフラストラクチャー、他の言語で書かれたアプリケーションなど、他のシナリオについては、他の[トレース有効化のチュートリアル][1]を参照してください。

Java の一般的なトレース設定ドキュメントについては、[Java アプリケーションのトレース][2]を参照してください。

### 前提条件

- Datadog のアカウントと[組織の API キー][3]
- Git
- Kubectl
- GCloud - 以下のコマンドを実行して、`USE_GKE_GCLOUD_AUTH_PLUGIN` 環境変数を設定し、GCloud プロジェクトに追加のプロパティを構成します。
  {{< code-block lang="sh" >}}
export USE_GKE_GCLOUD_AUTH_PLUGIN=True
gcloud config set project <PROJECT_NAME>
gcloud config set compute/zone <COMPUTE_ZONE>
gcloud config set compute/region <COMPUTE_REGION>{{< /code-block >}}
- Helm - 以下のコマンドを実行してインストールします。
  {{< code-block lang="sh" >}}
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh{{< /code-block >}}
  以下のコマンドを実行し、Helm を構成します。
  {{< code-block lang="sh" >}}
helm repo add datadog-crds https://helm.datadoghq.com
helm repo add kube-state-metrics https://prometheus-community.github.io/helm-charts
helm repo add datadog https://helm.datadoghq.com
helm repo update{{< /code-block >}}

## サンプルの Kubernetes Java アプリケーションをインストールします。

このチュートリアルのコードサンプルは、GitHub の [github.com/DataDog/apm-tutorial-java-host][9] にあります。まずは、このリポジトリを複製してください。

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

The repository contains a multi-service Java application pre-configured to run inside a Kubernetes cluster. The sample app is a basic notes app with a REST API to add and change data. The `docker-compose` YAML files to make the containers for the Kubernetes pods are located in the `docker` directory. This tutorial uses the `service-docker-compose-k8s.yaml` file, which builds containers for the application.

`notes` と `calendar` の各ディレクトリには、アプリケーションをビルドするための Dockerfile が、Maven と Gradle の 2 つのセットで用意されています。このチュートリアルでは Maven を使用しますが、Gradle に慣れている場合は、ビルドコマンドを変更することで、Maven の代わりに Gradle を使用することができます。

`notes` アプリ、`calendar` アプリ、Datadog Agent の Kubernetes の構成ファイルは、`kubernetes` ディレクトリにあります。

サンプルアプリケーションを取得するまでの流れは、`docker` フォルダからイメージをビルドし、レジストリにアップロードし、`kubernetes` フォルダから kubernetes リソースを作成する、というものです。

### クラスターを起動する

1. 再利用したい GKE クラスターがまだない場合は、以下のコマンドを実行し、`<VARIABLES>` を使用したい値に置き換えて、クラスターを作成します。

   {{< code-block lang="sh" >}}
gcloud container clusters create <CLUSTER_NAME> --num-nodes=1 --network=<NETWORK> --subnetwork=<SUBNETWORK>{{< /code-block >}}

   **注**: 利用可能なネットワークとサブネットワークの一覧は、次のコマンドを使用してください。
   {{< code-block lang="sh" >}}
gcloud compute networks subnets list{{< /code-block >}}

2. 以下を実行してクラスターに接続します。

   {{< code-block lang="sh" >}}
gcloud container clusters get-credentials <CLUSTER_NAME>
gcloud config set container/cluster <CLUSTER_NAME>{{< /code-block >}}

3. デプロイされるアプリケーションとの通信を容易にするため、GKE クラスターがポート `30080` と `30090` の TCP トラフィックを許可するように、[ネットワークのファイアウォールルールを編集][17]します。

### アプリケーションイメージの構築とアップロード

If you're not familiar with Google Container Registry (GCR), it might be helpful to read [Quickstart for Container Registry][16].

サンプルプロジェクトの `/docker` ディレクトリで、以下のコマンドを実行します。

1. 以下を実行することで GCR で認証します。
   {{< code-block lang="sh" >}}
gcloud auth configure-docker{{< /code-block >}}

2. サンプルアプリの Docker イメージを構築し、プラットフォーム設定を合わせます。
   {{< code-block lang="sh" >}}
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build notes{{< /code-block >}}

3. コンテナに GCR 宛先のタグを付けます。
   {{< code-block lang="sh" >}}
docker tag docker-notes:latest gcr.io/<PROJECT_ID>/notes-tutorial:notes{{< /code-block >}}

4. コンテナを GCR レジストリにアップロードします。
   {{< code-block lang="sh" >}}
docker push gcr.io/<PROJECT_ID>/notes-tutorial:notes{{< /code-block >}}

アプリケーションはコンテナ化され、GKE クラスターがプルできるようになります。

### アプリケーションをローカルに構成してデプロイする

1. `kubernetes/notes-app.yaml` を開き、`image` の項目を、上記ステップ 4 でコンテナをプッシュした GCR イメージの URL で更新します。
   {{< code-block lang="yaml" >}}
    spec:
      containers:
        - name: notes-app
          image: gcr.io/<PROJECT_ID>/notes-tutorial:notes
          imagePullPolicy: Always
{{< /code-block >}}

2. `/kubernetes` ディレクトリから、以下のコマンドを実行して、`notes` アプリをデプロイします。
   {{< code-block lang="sh" >}}
kubectl create -f notes-app.yaml{{< /code-block >}}

3. アプリを実行するには、アプリの REST API を呼び出すための外部 IP アドレスを知っておく必要があります。まず、以下のコマンドで出力される一覧から `notes-app-deploy` というポッドを見つけ、そのノードをメモしておきます。

   {{< code-block lang="sh" >}}
kubectl get pods -o wide{{< /code-block >}}

   {{< img src="tracing/guide/tutorials/tutorial-java-gke-pods.png" alt="notes-app-deploy ポッドとその関連ノード名を示す kubectl コマンドの出力" style="width:100%;" >}}

   次に、次のコマンドの出力からそのノード名を見つけ、外部 IP の値をメモします。

      {{< code-block lang="sh" >}}
kubectl get nodes -o wide{{< /code-block >}}

   {{< img src="tracing/guide/tutorials/tutorial-java-gke-external-ip.png" alt="ノードの外部 IP 値を示す kubectl コマンドの出力" style="width:100%;" >}}

   この例では、`notes-app` はノード `gke-java-tracing-gke-default-pool-ccbd5526-dd3d` で動作しており、その外部 IP は `35.196.6.199` であることが示されています。

3. 別のターミナルを開いて、アプリを行使するために API リクエストを送信します。ノートアプリケーションは、同じコンテナで実行されているメモリ内 H2 データベースにデータを保存する REST API です。これにいくつかのコマンドを送信します。

`curl '<EXTERNAL_IP>:30080/notes'`
: `[]`

`curl -X POST '<EXTERNAL_IP>:30080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes?id=1'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes'`
: `[{"id":1,"description":"hello"}]`

4. アプリケーションの実行を確認したら、それを停止して、トレースを有効にします。
   {{< code-block lang="sh" >}}
kubectl delete -f notes-app.yaml{{< /code-block >}}

## トレースを有効にする

Java アプリケーションが動作するようになったので、トレースを有効にするための構成を行います。

1. Java tracing パッケージをプロジェクトに追加します。Agent は GKE クラスターで動作するため、Dockerfile が適切に構成されていることを確認し、何もインストールする必要はありません。`notes/dockerfile.notes.maven` ファイルを開き、`dd-java-agent` をダウンロードする行のコメントを解除します。

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. 同じ `notes/dockerfile.notes.maven` ファイル内で、トレースなしで実行するための `ENTRYPOINT` 行をコメントアウトしてください。次に、トレースを有効にしてアプリケーションを実行する `ENTRYPOINT` 行のコメントを解除します。

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/notes-0.0.1-SNAPSHOT.jar"]
   ```

   これにより、アプリケーションは自動的に Datadog のサービスにインスツルメンテーションされます。

   <div class="alert alert-warning"><strong>注</strong>: これらのサンプルコマンドのフラグ、特にサンプルレートは、このチュートリアル以外の環境では、必ずしも適切ではありません。実際の環境で何を使うべきかについては、<a href="#tracing-configuration">トレース構成</a>を読んでください。</div>

3. 異なるバージョンやデプロイ環境間でトレースされたサービスを識別する[統合サービスタグ][10]により、Datadog 内で相関が取れるようになり、検索やフィルターに利用できるようになります。統合サービスタグ付けに使用する環境変数は、`DD_SERVICE`、`DD_ENV`、`DD_VERSION` の 3 つです。Kubernetes でデプロイされるアプリケーションでは、これらの環境変数をデプロイメント YAML ファイル内、特にデプロイメントオブジェクト、ポッド仕様、ポッドコンテナテンプレートに追加することができます。

   このチュートリアルでは、`kubernetes/notes-app.yaml` ファイルに、デプロイメントオブジェクト、ポッド仕様、ポッドコンテナテンプレートなど、ノートアプリケーションのためのこれらの環境変数がすでに定義されています。

   ```yaml
   ...
   spec:
     replicas: 1
     selector:
       matchLabels:
         name: notes-app-pod
         app: java-tutorial-app
     template:
       metadata:
         name: notes-app-pod
         labels:
           name: notes-app-pod
           app: java-tutorial-app
           tags.datadoghq.com/env: "dev"
           tags.datadoghq.com/service: "notes"
           tags.datadoghq.com/version: "0.0.1"
      ...
   ```

### アプリケーションイメージの再構築とアップロード

`docker` ディレクトリで[前と同じ手順](#build-and-upload-the-application-image)で、トレースを有効にしてイメージを再構築します。
{{< code-block lang="sh" >}}
gcloud auth configure-docker
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build notes
docker tag docker-notes:latest gcr.io/<PROJECT_ID>/notes-tutorial:notes
docker push gcr.io/<PROJECT_ID>/notes-tutorial:notes{{< /code-block >}}

トレースを有効にしたアプリケーションはコンテナ化され、GKE クラスターがプルできるようになります。

## Helm を使用した Agent のインストールと実行

次に、インスツルメンテーションされたアプリケーションからトレースデータを収集するために、GKE に Agent をデプロイします。

1. `kubernetes/datadog-values.yaml` を開くと、GKE 上の Agent と APM に最低限必要な構成が表示されます。このコンフィギュレーションファイルは、次に実行するコマンドで使用されます。

2. `/kubernetes` ディレクトリから、API キーとクラスター名を入れて、以下のコマンドを実行します。
   {{< code-block lang="sh" >}}
helm upgrade -f datadog-values.yaml --install --debug latest --set datadog.apiKey=<DD_API_KEY> --set datadog.clusterName=<CLUSTER_NAME> --set datadog.site=datadoghq.com datadog/datadog{{< /code-block >}}

   API キーを公開しない、より安全なデプロイについては、[シークレットの使用に関するこのガイド][18]をお読みください。また、`us1` 以外の [Datadog サイト][6]を使用している場合は、`datadoghq.com` を自分のサイトに置き換えてください。
## 自動トレースを見るためにアプリを起動する

[前回と同じ手順](#configure the-application-locally-and-deploy)で、`notes` アプリを `kubectl create -f notes-app.yaml` でデプロイし、実行するノードの外部 IP アドレスを確認します。

アプリを動かすために、いくつかの curl コマンドを実行します。

`curl '<EXTERNAL_IP>:30080/notes'`
: `[]`

`curl -X POST '<EXTERNAL_IP>:30080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes?id=1'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes'`
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

次のステップでは、ビルドスクリプトを修正して Java トレーシングライブラリをダウンロードし、コードにいくつかのアノテーションを追加して、いくつかのサンプルメソッドにトレースする手順を説明します。

1. 現在のアプリケーションデプロイを削除します。
   {{< code-block lang="sh" >}}
kubectl delete -f notes-app.yaml{{< /code-block >}}

2. `/notes/src/main/java/com/datadog/example/notes/NotesHelper.java` を開きます。このサンプルには、コードにカスタムトレースを設定するさまざまな方法を示す、コメントアウトされたコードがすでに含まれています。

3. 手動トレーシングをサポートするためのライブラリをインポートしている行のコメントを解除します。

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

4. 2 つのパブリックプロセスを手動でトレースしている行のコメントを解除します。これらは、`@Trace` アノテーションを使用して、`operationName` や `resourceName` などのアスペクトをトレースで指定することを示しています。
   ```java
   @Trace(operationName = "traceMethod1", resourceName = "NotesHelper.doLongRunningProcess")
   // ...
   @Trace(operationName = "traceMethod2", resourceName = "NotesHelper.anotherProcess")
   ```

5. また、アプリケーション内の特定のコードブロックに対して、別のスパンを作成することもできます。スパン内には、サービスやリソース名のタグ、エラー処理タグを追加します。これらのタグは、Datadog の視覚化でスパンとメトリクスを表示するフレームグラフになります。プライベートメソッドを手動でトレースする行のコメントを解除します。

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

6. `notes/pom.xml` を開き、手動トレースの依存関係を構成する行のコメントを解除して、Maven ビルドを更新します。`dd-trace-api` ライブラリは `@Trace` アノテーションに使用され、`opentracing-util` と `opentracing-api` は手動でスパンを作成するために使用されます。

7. アプリケーションを再構築し、[前回と同じ手順](#build-and-upload-the-application-image)に従って GCR にアップロードし、`docker` ディレクトリで以下のコマンドを実行します。

   {{< code-block lang="sh" >}}
gcloud auth configure-docker
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build notes
docker tag docker-notes:latest  gcr.io/<PROJECT_NAME>/notes-tutorial:notes
docker push gcr.io/<PROJECT_NAME>/notes-tutorial:notes
{{< /code-block >}}

8. [前回と同じ手順](#configure the-application-locally-and-deploy)で、`notes` アプリを `kubectl create -f notes-app.yaml` でデプロイし、実行するノードの外部 IP アドレスを確認します。

9. いくつかの HTTP リクエスト、特にいくつかの `GET` リクエストを再送します。
10. トレースエクスプローラーで、新しい `GET` リクエストの 1 つをクリックすると、次のようなフレームグラフが表示されます。

    {{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="カスタムインスツルメンテーションを用いた GET トレースのフレームグラフ。" style="width:100%;" >}}

    `getAll` 関数にカスタムトレースが追加され、スタックトレースがより詳細になったことに注意してください。

    手動でスパンを作成した `privateMethod` は、他のコールとは別のブロックとして表示され、別の色でハイライトされています。`@Trace` アノテーションを使用した他のメソッドは、`GET` リクエスト (`notes` アプリケーション) と同じサービス、同じ色で表示されます。カスタムインスツルメンテーションは、ハイライトして監視する必要があるコードの重要な部分がある場合に有効です。

詳しくは、[カスタムインストルメンテーション][12]をご覧ください。

## 分散型トレーシングを見るために 2 つ目のアプリケーションを追加する

単一のアプリケーションをトレースすることは素晴らしいスタートですが、トレースの本当の価値は、リクエストがサービスを通じてどのように流れるかを見ることです。これは、_分散型トレーシング_と呼ばれています。

サンプルプロジェクトには `calendar` という 2 番目のアプリケーションが含まれており、呼び出されるたびにランダムな日付を返します。Notes アプリケーションの `POST` エンドポイントには、`add_date` という名前の 2 つ目のクエリパラメーターがあります。このパラメータが `y` に設定されると、Notes はカレンダーアプリケーションを呼び出して、ノートに追加する日付を取得します。

1. ノートアプリと同様に、Dockerfile の起動コマンドに `dd-java-agent` を追加して、トレース用の `calendar` アプリの構成を確認します。`calendar/dockerfile.calendar.maven` を開き、すでに `dd-java-agent` がダウンロードされていることを確認します。

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. 同じ `calendar/dockerfile.calendar.maven` ファイル内で、トレースなしで実行するための `ENTRYPOINT` 行をコメントアウトしてください。次に、トレースを有効にしてアプリケーションを実行する `ENTRYPOINT` 行のコメントを解除します。

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/calendar-0.0.1-SNAPSHOT.jar"]
   ```

   <div class="alert alert-warning"><strong>注</strong>: 繰り返しになりますが、フラグ、特にサンプルレートは、このチュートリアル以外の環境では、必ずしも適切ではありません。実際の環境で何を使うべきかについては、<a href="#tracing-configuration">トレース構成</a>を読んでください。</div>

3. 両方のアプリケーションをビルドし、GCR に公開します。`docker` ディレクトリから、以下を実行します。
   {{< code-block lang="sh" >}}
gcloud auth configure-docker
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build calendar
docker tag docker-calendar:latest  gcr.io/<PROJECT_NAME>/calendar-tutorial:calendar
docker push gcr.io/<PROJECT_NAME>/calendar-tutorial:calendar{{< /code-block >}}

4. `kubernetes/calendar-app.yaml` を開き、`image` エントリを GCR イメージの URL で更新します。これは前のステップで `calendar` アプリ をプッシュした場所です。
   {{< code-block lang="yaml" >}}
    spec:
      containers:
        - name: calendar-app
          image: gcr.io/<PROJECT_ID>/calendar-tutorial:calendar
          imagePullPolicy: Always
{{< /code-block >}}

5. `kubernetes` ディレクトリから、カスタムインスツルメンテーションを持つようになった `notes` と `calendar` の両アプリをクラスター上にデプロイします。
   {{< code-block lang="sh" >}}
kubectl create -f notes-app.yaml
kubectl create -f calendar-app.yaml{{< /code-block >}}

6. 先ほどの方法で、`notes` アプリの外部 IP を探します。

7. `add_date` パラメーターを指定して、POST リクエストを送信します。

`curl -X POST '<EXTERNAL_IP>:30080/notes?desc=hello_again&add_date=y'`
: `{"id":1,"description":"hello_again with date 2022-11-06"}`

8. トレースエクスプローラーで、この最新のトレースをクリックすると、2 つのサービス間の分散型トレーシングが表示されます。

   {{< img src="tracing/guide/tutorials/tutorial-java-container-distributed.png" alt="分散型トレーシングのフレームグラフ。" style="width:100%;" >}}

   `notes` アプリケーションでは何も変更していないことに注意してください。Datadog は `notes` から `calendar` への HTTP コールに使用される `okHttp` ライブラリと、`notes` と `calendar` の HTTP リクエストをリッスンするために使用する Jetty ライブラリの両方を自動的にインスツルメントします。これにより、トレース情報を 1 つのアプリケーションから他のアプリケーションに渡すことができ、分散型トレースをキャプチャすることができます。

9. 確認が終わったら、すべてのリソースをクリーンアップし、デプロイを削除してください。
   {{< code-block lang="sh" >}}
kubectl delete -f notes-app.yaml
kubectl delete -f calendar-app.yaml{{< /code-block >}}

   クラスターの削除については、[GKE のドキュメント][19]を参照してください。

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
[16]: https://cloud.google.com/container-registry/docs/quickstart
[17]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[18]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#create-and-provide-a-secret-that-contains-your-datadog-api-and-app-keys
[19]: https://cloud.google.com/kubernetes-engine/docs/how-to/deleting-a-cluster