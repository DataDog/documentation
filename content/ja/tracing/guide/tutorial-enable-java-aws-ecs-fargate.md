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
title: チュートリアル - AWS ECS with Fargate 上の Java アプリケーションのトレースを有効にする
---

## 概要

このチュートリアルでは、AWS Elastic Container Service (ECS) with Fargate 上のクラスターにインストールされたサンプル Java アプリケーションでトレースを有効にするための手順を説明します。このシナリオでは、Datadog Agent もクラスターにインストールされています。

ホスト、コンテナ、クラウドインフラストラクチャー、他の言語で書かれたアプリケーションなど、他のシナリオについては、他の[トレース有効化のチュートリアル][1]を参照してください。例えば、コンテナや EKS を使用したチュートリアルの中には、Datadog で見られる自動インスツルメンテーションとカスタムインスツルメンテーションの違いを説明するものがあります。このチュートリアルでは、完全にカスタムインスツルメンテーションされた例までスキップします。

このチュートリアルでは、中級レベルの AWS トピックも使用しているので、AWS のネットワークとアプリケーションにある程度慣れていることが必要です。もしあなたが AWS にそれほど精通しておらず、Datadog APM のセットアップの基本を学ぼうとしているならば、代わりにホストまたはコンテナのチュートリアルのいずれかを使用してください。

Java の一般的なトレース設定ドキュメントについては、[Java アプリケーションのトレース][2]を参照してください。

### 前提条件

- Datadog のアカウントと[組織の API キー][3]
- Git
- Docker
- Terraform
- AWS ECS
- イメージをホスティングするための AWS ECR リポジトリ
- `AdministratorAccess` 権限を持つ AWS IAM ユーザー。アクセスキーとシークレットアクセスキーを使用して、ローカルの資格情報ファイルにプロファイルを追加する必要があります。詳しくは、[AWS の資格情報ファイルと資格情報プロファイルの使用][20]を参照してください。

## サンプルの Java アプリケーションをインストールする

このチュートリアルのコードサンプルは、GitHub の [github.com/DataDog/apm-tutorial-java-host][9] にあります。まずは、このリポジトリを複製してください。

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

リポジトリには、Docker コンテナ内で動作するようにあらかじめ構成されたマルチサービスの Java アプリが含まれています。コンテナを作成するための `docker-compose` YAML ファイルは `docker` ディレクトリに配置されています。このチュートリアルでは、アプリケーション用のコンテナをビルドする `service-docker-compose-ECS.yaml` ファイルを使用します。

`notes` と `calendar` の各ディレクトリには、アプリケーションをビルドするための Dockerfile が、Maven と Gradle の 2 つのセットで用意されています。このチュートリアルでは Maven を使用しますが、Gradle に慣れている場合は、ビルドコマンドを変更することで、Maven の代わりに Gradle を使用することができます。

サンプルアプリケーションはシンプルなマルチサービスの Java アプリケーションで、2 つの API (`notes` サービスと `calendar` サービス) を備えています。`notes` サービスには、メモリ内 H2 データベースに保存されたノートに対する `GET`、`POST`、`PUT`、`DELETE` のエンドポイントがあります。`calendar` サービスはリクエストを受け、ノートで使用するランダムな日付を返します。両方のアプリケーションには、それぞれ関連する Docker イメージがあり、AWS ECS に別々のサービスとして、それぞれ独自のタスクとそれぞれのコンテナを持ってデプロイします。ECS は、ビルド後にイメージを公開するアプリケーションイメージのリポジトリである ECR からイメージを取得します。

### ECS の初期設定

このアプリケーションでは、AWS プロファイル (ECS クラスターを作成し、ECR から読み取るための正しい権限で構成済み)、AWS リージョン、AWS ECR リポジトリの追加など、いくつかの初期構成が必要です。

`terraform/Fargate/global_constants/variables.tf` を開きます。以下の変数の値を、正しい AWS アカウント情報に置き換えます。

```
output "aws_profile" {
    value = "<AWS_PROFILE>"
    sensitive = true
}

output "aws_region" {
    value = "<AWS_REGION>"
    sensitive = true
}

output "aws_ecr_repository" {
    value = "<AWS_ECR_REPOSITORY_URL>"
    sensitive = true
}
```

### アプリケーションイメージの構築とアップロード

コンテナイメージのレジストリである Amazon ECR に馴染みがない方は、[Amazon ECR を AWS CLI で使う][17]を読むとよいかもしれません。

サンプルプロジェクトの `/docker` ディレクトリで、以下のコマンドを実行します。

1. このコマンドでユーザー名とパスワードを入力し、ECR で認証します。
   {{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>{{< /code-block >}}

2. サンプルアプリの Docker イメージを構築し、プラットフォーム設定を合わせます。
   {{< code-block lang="sh" >}}
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build{{< /code-block >}}

3. コンテナに ECR 宛先のタグを付けます。
   {{< code-block lang="sh" >}}
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

4. コンテナを ECR レジストリにアップロードします。
   {{< code-block lang="sh" >}}
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

(トレースを有効にしていない) アプリケーションはコンテナ化され、ECS がプルできるようになります。


### アプリケーションをデプロイする

アプリケーションを起動し、トレースせずにいくつかのリクエストを送信します。アプリケーションがどのように動作するかを確認した後、トレーシングライブラリと Datadog Agent を使用してインスツルメントを行います。

まずは、Terraform スクリプトを使用して AWS ECS にデプロイします。

1. `terraform/Fargate/Uninstrumented` ディレクトリで、以下のコマンドを実行します。

   ```sh
   terraform init
   terraform apply
   terraform state show 'aws_alb.application_load_balancer'
   ```

   **注**: `terraform apply` コマンドが CIDR ブロックメッセージを返す場合、IP アドレスを取得するスクリプトはローカルマシンでは動作しませんでした。これを解決するには、`terraform/Fargate/Uninstrumented/security.tf` ファイルで値を手動で設定します。`load_balancer_security_group` の `ingress` ブロック内で、どの `cidr_blocks` 行がコメントアウトされているかを切り替え、コメントアウトされていない例の行をマシンの IP4 アドレスで更新してください。

2. ロードバランサーの DNS 名をメモしておきます。サンプルアプリの API コールでは、そのベースドメインを使用します。インスタンスが起動するまで数分待ちます。

3. 別のターミナルを開いて、アプリを行使するために API リクエストを送信します。ノートアプリケーションは、同じコンテナで実行されているメモリ内 H2 データベースにデータを保存する REST API です。これにいくつかのコマンドを送信します。

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=hello'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes?id=1'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"hello"}]`

   `curl -X PUT 'BASE_DOMAIN:8080/notes?id=1&desc=UpdatedNote'`
   : `{"id":1,"description":"UpdatedNote"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"UpdatedNote"}]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=NewestNote&add_date=y'`
   : `{"id":2,"description":"NewestNote with date 12/02/2022."}`

   このコマンドは `notes` と `calendar` の両方のサービスを呼び出します。

4. アプリケーションの実行を確認したら、以下のコマンドを実行してアプリケーションを停止し、AWS リソースをクリーンアップして、トレースを有効にできるようにします。
   {{< code-block lang="sh" >}}
terraform destroy{{< /code-block >}}

## トレースを有効にする

Java アプリケーションが動作するようになったので、トレースを有効にするための構成を行います。

1. dockerfile を編集して、アプリケーションがトレースを生成するために必要な Java トレーシングパッケージを追加します。`notes/dockerfile.notes.maven` ファイルを開き、`dd-java-agent` をダウンロードする行のコメントを解除します。

   ```
   RUN curl -Lo dd-java-agent.jar https://dtdg.co/latest-java-tracer
   ```

2. 同じ `notes/dockerfile.notes.maven` ファイル内で、トレースなしで実行するための `ENTRYPOINT` 行をコメントアウトしてください。次に、トレースを有効にしてアプリケーションを実行する `ENTRYPOINT` 行のコメントを解除します。

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/notes-0.0.1-SNAPSHOT.jar"]
   ```

   もう一つのサービスである `calendar` でこのステップを繰り返します。`calendar/dockerfile.calendar.maven` を開き、トレースなしで実行するための `ENTRYPOINT` 行をコメントアウトしてください。次に、トレースを有効にしてアプリケーションを実行する `ENTRYPOINT` 行のコメントを解除します。

   ```
   ENTRYPOINT ["java", "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/calendar-0.0.1-SNAPSHOT.jar"] 
   ```

   これで、どちらのサービスも自動インスツルメンテーションが行われるようになります。

   <div class="alert alert-warning"><strong>注</strong>: これらのサンプルコマンドのフラグ、特にサンプルレートは、このチュートリアル以外の環境では、必ずしも適切ではありません。実際の環境で何を使うべきかについては、<a href="#tracing-configuration">トレース構成</a>を読んでください。</div>

3. 自動インスツルメンテーションは便利ですが、より細かいスパンが欲しい場合もあります。Datadog の Java DD Trace API では、アノテーションやコードを使用してコード内のスパンを指定することができます。コードにアノテーションを追加し、いくつかのサンプルメソッドにトレースします。

   `/notes/src/main/java/com/datadog/example/notes/NotesHelper.java` を開きます。このサンプルには、コードにカスタムトレースを設定するさまざまな方法を示す、コメントアウトされたコードがすでに含まれています。

4. 手動トレーシングをサポートするためのライブラリをインポートしている行のコメントを解除します。

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

5. 2 つのパブリックプロセスを手動でトレースしている行のコメントを解除します。これらは、`@Trace` アノテーションを使用して、`operationName` や `resourceName` などのアスペクトをトレースで指定することを示しています。
   ```java
   @Trace(operationName = "traceMethod1", resourceName = "NotesHelper.doLongRunningProcess")
   // ...
   @Trace(operationName = "traceMethod2", resourceName = "NotesHelper.anotherProcess")
   ```

6. また、アプリケーション内の特定のコードブロックに対して、別のスパンを作成することもできます。スパン内には、サービスやリソース名のタグ、エラー処理タグを追加します。これらのタグは、Datadog の視覚化でスパンとメトリクスを表示するフレームグラフになります。プライベートメソッドを手動でトレースする行のコメントを解除します。

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

7. `notes/pom.xml` を開き、手動トレースの依存関係を構成する行のコメントを解除して、Maven ビルドを更新します。`dd-trace-api` ライブラリは `@Trace` アノテーションに使用され、`opentracing-util` と `opentracing-api` は手動でスパンを作成するために使用されます。

8. Datadog Agent を `notes` と `calendar` の各タスク定義に追加します。Agent はどこかにインストールするのではなく、各 AWS タスクの横にあるコンテナ内に追加してください。`terraform/Fargate/Instrumented/main.tf` を開き、このサンプルには ECS Fargate 上で Datadog Agent を実行しトレースを収集するために必要な基本構成が既にあることが確認できます。つまり、ECS Fargate を有効にし APM を有効にする API キー (次のステップで構成する) です。この定義は、`notes` タスクと `calendar` タスクの両方で提供されています。

9. API キー変数に値を指定します。`terraform/Fargate/global_constants/variables.tf` を開き、`output "datadog_api_key"` セクションのコメントを解除し、組織の Datadog API キーを提供します。

10. 異なるバージョンやデプロイ環境間でトレースされたサービスを識別する[統合サービスタグ][10]により、Datadog 内で相関が取れるようになり、検索やフィルターに利用できるようになります。統合サービスタグ付けに使用する環境変数は、`DD_SERVICE`、`DD_ENV`、`DD_VERSION` の 3 つです。ECS 上にデプロイされたアプリケーションの場合、これらの環境変数はコンテナのタスク定義内で設定されます。

    このチュートリアルでは、`/terraform/Fargate/Instrumented/main.tf` ファイルに、ノートとカレンダーアプリケーションのためのこれらの環境変数がすでに定義されています。例えば `notes` の場合:

    ```yaml
    ...

       name : "notes",
       image : "${module.settings.aws_ecr_repository}:notes",
       essential : true,
       portMappings : [
         {
           containerPort : 8080,
           hostPort : 8080
         }
       ],
       memory : 512,
       cpu : 256,
       environment : [
         {
           name : "CALENDAR_HOST",
           value : "calendar.apmlocaljava"
         },
         {
           name : "DD_SERVICE",
           value : "notes"
         },
         {
           name : "DD_ENV",
           value : "dev"
         },
         {
           name : "DD_VERSION",
           value : "0.0.1"
         }
       ],
       dockerLabels : {
         "com.datadoghq.tags.service" : "notes",
         "com.datadoghq.tags.env" : "dev",
         "com.datadoghq.tags.version" : "0.0.1"
       },
       ...
    ```
    そして `calendar` の場合:

    ```yaml
     ...
        name : "calendar",
        image : "${module.settings.aws_ecr_repository}:calendar",
        essential : true,
        environment : [
          {
            name : "DD_SERVICE",
            value : "calendar"
          },
          {
            name : "DD_ENV",
            value : "dev"
          },
          {
            name : "DD_VERSION",
            value : "0.0.1"
          }
       ],
       dockerLabels : {
         "com.datadoghq.tags.service" : "calendar",
         "com.datadoghq.tags.env" : "dev",
         "com.datadoghq.tags.version" : "0.0.1"
       },
      ...
     ```

    また、同じユニバーサルサービスタグの `service`、`env`、`version` の値に対する Docker ラベルが設定されていることがわかります。これにより、アプリケーションを起動したら Docker メトリクスを取得することもできます。

### トレーシングのコンフィギュレーション

Java トレーシングライブラリは、Java のビルトイン Agent とモニタリングのサポートを利用します。Dockerfile のフラグ `-javaagent:../dd-java-agent.jar` は、JVM が Java Agent として実行できるように、Java トレーシングライブラリをどこで見つけるかを指示します。Java Agent については、[https://www.baeldung.com/java-instrumentation][7] で詳しく説明されています。

`dd.trace.sample.rate` フラグは、このアプリケーションのサンプルレートを設定します。Dockerfile の ENTRYPOINT コマンドでは、この値を `1` に設定しています。これは、全てのサービスリクエストの 100% が、分析と表示のために Datadog のバックエンドに送信されることを意味します。低容量のテストアプリケーションの場合、これは問題ありません。実稼働時や大量のデータを扱う環境では、このようなことはしないでください。代わりに、リクエストの一部をサンプリングします。例えば、`-Ddd.trace.sample.rate=0.1` とすると、リクエストの 10% 分のトレースが Datadog に送信されます。[トレース構成設定][14]と[サンプリング機構][15]について詳しくお読みください。

このコマンドのサンプリングレートフラグは `-jar` フラグの前に表示されていることに注意してください。これは、このフラグがアプリケーションではなく、Java Virtual Machine のパラメーターだからです。アプリケーションに Java Agent を追加するときは、このフラグを正しい場所に指定するようにしてください。

### アプリケーションイメージの再構築とアップロード

[前と同じ手順](#build-and-upload-the-application-images)で、トレースを有効にしてイメージを再構築します。
{{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

トレースを有効にしたマルチサービスアプリケーションはコンテナ化され、ECS がプルできるようになります。

## トレースを見るためにアプリを起動する

アプリケーションを再デプロイし、API を実行します。

1. [先ほどと同じ terraform コマンド](#deploy-the-application)を使って、AWS ECS にアプリケーションを再デプロイしてください。ただし、インスツルメンテーション版のコンフィギュレーションファイルを使います。`terraform/Fargate/Instrumented` ディレクトリから、以下のコマンドを実行します。

   ```sh
   terraform init
   terraform apply
   terraform state show 'aws_alb.application_load_balancer'
   ```

2. ロードバランサーの DNS 名をメモしておきます。サンプルアプリの API コールでは、そのベースドメインを使用します。

3. インスタンスが起動するまで数分待ちます。アプリケーション用のコンテナが準備できたことを確認するため、数分間待ちます。いくつかの curl コマンドを実行して、インスツルメンテーションされたアプリを実行します。

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=hello'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes?id=1'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"hello"}]`

   `curl -X PUT 'BASE_DOMAIN:8080/notes?id=1&desc=UpdatedNote'`
   : `{"id":1,"description":"UpdatedNote"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"hello"}]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=NewestNote&add_date=y'`
   : `{"id":2,"description":"NewestNote with date 12/02/2022."}`
   : このコマンドは `notes` と `calendar` の両方のサービスを呼び出します。

4. しばらく待って、Datadog の [**APM > Traces**][11] にアクセスすると、API 呼び出しに対応するトレースの一覧が表示されます。

   {{< img src="tracing/guide/tutorials/tutorial-java-container-traces.png" alt="APM トレースエクスプローラーのサンプルアプリのトレース" style="width:100%;" >}}

   `h2` はこのチュートリアルのために埋め込まれたインメモリデータベースで、`notes` は Spring Boot アプリケーションです。トレースリストには、すべてのスパン、いつ開始したか、どのリソースがスパンで追跡されたか、どれくらいの時間がかかったか、が表示されます。

もし、数分待ってもトレースが表示されない場合は、Traces Search フィールドのフィルターをクリアしてください (使用していない `ENV` などの環境変数にフィルターをかけている場合があります)。

### トレースの検証

Traces ページで、`POST /notes` トレースをクリックすると、各スパンにかかった時間や、あるスパンが完了する前に他のスパンが発生したことを示すフレームグラフが表示されます。グラフの上部にあるバーは、前の画面で選択したスパンです (この場合、ノートアプリケーションへの最初のエントリポイントです)。

バーの幅は、それが完了するまでにかかった時間を示します。低い深さのバーは、高い深さのバーの寿命の間に完了するスパンを表します。

トレースエクスプローラーで、`GET` リクエストの 1 つをクリックすると、次のようなフレームグラフが表示されます。

{{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="カスタムインスツルメンテーションを用いた GET トレースのフレームグラフ。" style="width:100%;" >}}

手動でスパンを作成した `privateMethod` は、他のコールとは別のブロックとして表示され、別の色でハイライトされています。`@Trace` アノテーションを使用した他のメソッドは、`GET` リクエスト (`notes` アプリケーション) と同じサービス、同じ色で表示されます。カスタムインスツルメンテーションは、ハイライトして監視する必要があるコードの重要な部分がある場合に有効です。

詳しくは、[カスタムインストルメンテーション][12]をご覧ください。

単一のサービスをトレースすることは素晴らしいスタートです。しかし、トレースの本当の価値は、リクエストがサービスを通じてどのように流れているかを見ることです。これを_分散型トレーシング_と呼びます。最後の API コール (ノートに日付を追加したコール) のトレースをクリックすると、2 つのサービス間の分散型トレースを見ることができます。

{{< img src="tracing/guide/tutorials/tutorial-java-container-distributed.png" alt="分散型トレーシングのフレームグラフ。" style="width:100%;" >}}

`notes` アプリケーションでは何も変更していないことに注意してください。Datadog は `notes` から `calendar` への HTTP コールに使用される `okHttp` ライブラリと、`notes` と `calendar` の HTTP リクエストをリッスンするために使用する Jetty ライブラリの両方を自動的にインスツルメントします。これにより、トレース情報を 1 つのアプリケーションから他のアプリケーションに渡すことができ、分散型トレースをキャプチャすることができます。

確認が終わったら、すべてのリソースをクリーンアップし、デプロイを削除してください。

```sh
aws ecs delete-service --cluster apm-tutorial-ec2-java --service datadog-agent --profile <PROFILE> --region <REGION>
terraform destroy
```

## トラブルシューティング

もし、期待通りのトレースが受信できない場合は、Java トレーサーのでデバッグモードを設定してください。詳しくは[デバッグモードの有効化][13]を読んでください。

## その他の参考資料

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
[17]: https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html
[18]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#create-and-provide-a-secret-that-contains-your-datadog-api-and-app-keys
[20]: https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html