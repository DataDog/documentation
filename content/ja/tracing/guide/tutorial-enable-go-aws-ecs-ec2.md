---
further_reading:
- link: /tracing/trace_collection/library_config/go/
  tag: ドキュメント
  text: Additional tracing library configuration options
- link: /tracing/trace_collection/dd_libraries/go/
  tag: ドキュメント
  text: Detailed tracing library setup instructions
- link: /tracing/trace_collection/compatibility/go/
  tag: ドキュメント
  text: Supported Go frameworks for automatic instrumentation
- link: /tracing/trace_collection/custom_instrumentation/go/
  tag: ドキュメント
  text: Manually configuring traces and spans
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: ドキュメント
  text: Ingestion mechanisms
- link: https://github.com/DataDog/dd-trace-Go
  tag: ソースコード
  text: Tracing library open source code repository
title: Tutorial - Enabling Tracing for a Go Application on Amazon ECS with EC2
---

## 概要

このチュートリアルでは、AWS Elastic Container Service (ECS) 上のクラスターにインストールされたサンプル Go アプリケーションでトレースを有効にするための手順を説明します。このシナリオでは、Datadog Agent もクラスターにインストールされています。

ホスト上のアプリケーションと Agent、コンテナ内のアプリケーションとホスト上の Agent、クラウドインフラストラクチャー上のアプリケーションと Agent、他の言語で書かれたアプリケーションなど、他のシナリオについては、他の[トレース有効化のチュートリアル][1]を参照してください。例えば、コンテナや EKS を使用したチュートリアルの中には、Datadog で見られる自動インスツルメンテーションとカスタムインスツルメンテーションの違いを説明するものがあります。このチュートリアルでは、完全にカスタムインスツルメンテーションされた例までスキップします。

このチュートリアルでは、中級レベルの AWS トピックも使用しているので、AWS のネットワークとアプリケーションにある程度慣れていることが必要です。もしあなたが AWS にそれほど精通しておらず、Datadog APM のセットアップの基本を学ぼうとしているならば、代わりにホストまたはコンテナのチュートリアルのいずれかを使用してください。

Go の一般的なトレース設定ドキュメントについては、[Go アプリケーションのトレース][2]を参照してください。

### 前提条件

- Datadog のアカウントと[組織の API キー][3]
- Git
- Docker
- Terraform
- Amazon ECS
- an Amazon ECR repository for hosting images
- `AdministratorAccess` 権限を持つ AWS IAM ユーザー。アクセスキーとシークレットアクセスキーを使用して、ローカルの資格情報ファイルにプロファイルを追加する必要があります。詳しくは、[AWS SDK for Go V2 の構成][4]をご覧ください。

## サンプルの Go アプリケーションをインストールする

次に、トレースするためのサンプルアプリケーションをインストールします。このチュートリアルのコードサンプルは [github.com/DataDog/apm-tutorial-golang.git][5] で見ることができます。以下を実行することで git リポジトリの複製を行います。

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-golang.git
{{< /code-block >}}

リポジトリには、Docker コンテナ内で動作するようにあらかじめ構成されたマルチサービスの Go アプリが含まれています。コンテナを作成するための `docker-compose` YAML ファイルは `docker` ディレクトリに配置されています。このチュートリアルでは、サンプルアプリケーションを構成する `notes` および `calendar` サービス用のコンテナをビルドする `service-docker-compose-ECS.yaml` ファイルを使用します。

### ECS の初期設定

The application requires some initial configuration, including adding your AWS profile (already configured with the correct permissions to create an ECS cluster and read from ECR), AWS region, and Amazon ECR repository.

`terraform/EC2/global_constants/variables.tf` を開きます。以下の変数の値を、正しい AWS アカウント情報に置き換えます。

```tf
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

`datadog_api_key` セクションは、とりあえずコメントにしておきます。Datadog の設定はチュートリアルの後半で行うことになります。

### アプリケーションイメージの構築とアップロード

コンテナイメージのレジストリである Amazon ECR に馴染みがない方は、[Amazon ECR を AWS CLI で使う][6]を読むとよいかもしれません。

サンプルプロジェクトの `/docker` ディレクトリで、以下のコマンドを実行します。

1. このコマンドでユーザー名とパスワードを入力し、ECR で認証します。
   {{< code-block lang="shell" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>{{< /code-block >}}

2. サンプルアプリの Docker イメージを構築し、プラットフォーム設定を合わせます。
   {{< code-block lang="shell" >}}
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build{{< /code-block >}}

3. コンテナに ECR 宛先のタグを付けます。
   {{< code-block lang="shell" >}}
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

4. コンテナを ECR レジストリにアップロードします。
   {{< code-block lang="shell" >}}
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

(トレースを有効にしていない) アプリケーションはコンテナ化され、ECS がプルできるようになります。

### アプリケーションをデプロイする

アプリケーションを起動し、トレースせずにいくつかのリクエストを送信します。アプリケーションがどのように動作するかを確認した後、トレーシングライブラリと Datadog Agent を使用してインスツルメントを行います。

To start, use a Terraform script to deploy to Amazon ECS:

1. `terraform/EC2/deployment` ディレクトリで、以下のコマンドを実行します。

   ```shell
   terraform init
   terraform apply
   terraform state show 'aws_alb.application_load_balancer'
   ```

   **注**: `terraform apply` コマンドが CIDR ブロックメッセージを返す場合、IP アドレスを取得するスクリプトはローカルマシンでは動作しませんでした。これを解決するには、`terraform/EC2/deployment/security.tf` ファイルで値を手動で設定します。`load_balancer_security_group` の `ingress` ブロック内で、どの `cidr_blocks` 行がコメントアウトされているかを切り替え、コメントアウトされていない例の行をマシンの IP4 アドレスで更新してください。

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
   {{< code-block lang="shell" >}}
terraform destroy{{< /code-block >}}


## トレースを有効にする

次に、トレースを有効にするために Go アプリケーションを構成します。

トレースサポートを有効にするには

1. 自動トレーシングを有効にするには、`apm-tutorial-golang/cmd/notes/main.go` で以下のインポートのコメントを解除してください。

   {{< code-block lang="go" filename="cmd/notes/main.go">}}
     sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
     chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
     httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
     "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   {{< /code-block >}}

1. `main()` 関数で、以下の行のコメントを解除します。

   {{< code-block lang="go" filename="cmd/notes/main.go">}}
   tracer.Start()
   defer tracer.Stop(){{< /code-block >}}

   {{< code-block lang="go" >}}
   client = httptrace.WrapClient(client, httptrace.RTWithResourceNamer(func(req *http.Request) string {
      return fmt.Sprintf("%s %s", req.Method, req.URL.Path)
   }))
   {{< /code-block >}}

   {{< code-block lang="go" filename="cmd/notes/main.go">}}
   r.Use(chitrace.Middleware(chitrace.WithServiceName("notes"))){{< /code-block >}}

1. `setupDB()` で、以下の行のコメントを解除します。
   {{< code-block lang="go" filename="cmd/notes/main.go">}}
   sqltrace.Register("sqlite3", &sqlite3.SQLiteDriver{}, sqltrace.WithServiceName("db"))
   db, err := sqltrace.Open("sqlite3", "file::memory:?cache=shared"){{< /code-block >}}

   {{< code-block lang="go" filename="cmd/notes/main.go">}}
   db, err := sql.Open("sqlite3", "file::memory:?cache=shared"){{< /code-block >}}

1. 上記の手順で、完全にサポートされているライブラリでの自動トレーシングが可能になりました。コードがサポートされているライブラリに該当しない場合、スパンを手動で作成することができます。

   `notes/notesController.go` を開きます。このサンプルには、コードにカスタムトレースを設定するさまざまな方法を示す、コメントアウトされたコードがすでに含まれています。

1. `notes/notesController.go` の `makeSpanMiddleware` 関数は、リクエストを指定された名前のスパンでラップするミドルウェアを生成します。以下の行のコメントを解除します。

   {{< code-block lang="go" disable_copy="true" filename="notes/notesController.go" collapsible="true" >}}
     r.Get("/notes", nr.GetAllNotes)                // GET /notes
     r.Post("/notes", nr.CreateNote)                // POST /notes
     r.Get("/notes/{noteID}", nr.GetNoteByID)       // GET /notes/123
     r.Put("/notes/{noteID}", nr.UpdateNoteByID)    // PUT /notes/123
     r.Delete("/notes/{noteID}", nr.DeleteNoteByID) // DELETE /notes/123{{< /code-block >}}

   {{< code-block lang="go" disable_copy="true" filename="notes/notesController.go" collapsible="true" >}}
     r.Get("/notes", makeSpanMiddleware("GetAllNotes", nr.GetAllNotes))               // GET /notes
     r.Post("/notes", makeSpanMiddleware("CreateNote", nr.CreateNote))                // POST /notes
     r.Get("/notes/{noteID}", makeSpanMiddleware("GetNote", nr.GetNoteByID))          // GET /notes/123
     r.Put("/notes/{noteID}", makeSpanMiddleware("UpdateNote", nr.UpdateNoteByID))    // PUT /notes/123
     r.Delete("/notes/{noteID}", makeSpanMiddleware("DeleteNote", nr.DeleteNoteByID)) // DELETE /notes/123
   {{< /code-block >}}

   また、以下のインポート周りのコメントも削除してください。

   {{< code-block lang="go" disable_copy="true" filename="notes/notesController.go" collapsible="true" >}}
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"{{< /code-block >}}

1. `doLongRunningProcess` 関数は、親コンテキストから子スパンを作成します。コメントを削除して有効にします。
   {{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
   func doLongRunningProcess(ctx context.Context) {
    childSpan, ctx := tracer.StartSpanFromContext(ctx, "traceMethod1")
    childSpan.SetTag(ext.ResourceName, "NotesHelper.doLongRunningProcess")
    defer childSpan.Finish()

    time.Sleep(300 * time.Millisecond)
    log.Println("Hello from the long running process in Notes")
    privateMethod1(ctx)
  }{{< /code-block >}}

1. `privateMethod1` 関数は、コンテキストから完全に独立したサービスを作成することを示します。コメントを削除して有効にします。

   {{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
   func privateMethod1(ctx context.Context) {
    childSpan, _ := tracer.StartSpanFromContext(ctx, "manualSpan1",
      tracer.SpanType("web"),
      tracer.ServiceName("noteshelper"),
    )
    childSpan.SetTag(ext.ResourceName, "privateMethod1")
    defer childSpan.Finish()

    time.Sleep(30 * time.Millisecond)
    log.Println("Hello from the custom privateMethod1 in Notes")
   }{{< /code-block >}}

   カスタムトレースの詳細については、[Go カスタムインスツルメンテーション][7]を参照してください。

1. 異なるバージョンやデプロイ環境間でトレースされたサービスを識別する[統合サービスタグ][8]により、Datadog 内で相関が取れるようになり、検索やフィルターに利用できるようになります。統合サービスタグ付けに使用する環境変数は、`DD_SERVICE`、`DD_ENV`、`DD_VERSION` の 3 つです。ECS 上にデプロイされたアプリケーションの場合、これらの環境変数はコンテナのタスク定義内で設定されます。

   このチュートリアルでは、`/terraform/EC2/deployment/main.tf` ファイルに、ノートとカレンダーアプリケーションのためのこれらの環境変数がすでに定義されています。例えば `notes` の場合:

   ```yaml
   {
    ...

      name : "notes-task",
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
          value : "calendar.apmlocalgo"
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
    },

    ...
   ```
   そして `calendar` の場合:

   ```yaml
   ...

      name : "calendar-task",
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

### アプリケーションイメージの再構築とアップロード

[前回と同じ手順](#build-and-upload-the-application-images)でトレースを有効にしてイメージを再構築します。

{{< code-block lang="shell" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

トレースを有効にしたマルチサービスアプリケーションはコンテナ化され、ECS がプルできるようになります。

## ECS に Agent をデプロイする

次に、インスツルメンテーションされたアプリケーションからトレースデータを収集するために、Datadog Agent をデプロイします。ECS 環境では、Agent を実行するために何かをダウンロードする必要はありません。代わりに、以下の手順に従って Datadog Agent のタスク定義を作成し、タスク定義を AWS にアップロードし、そのタスク定義を使用してクラスター上に Agent サービスを作成します。

1. APM トレースを有効にして Agent を実行するための基本構成を提供する `terraform/EC2/dd_agent_task_definition.json` を開きます。Datadog の組織の API キーと Datadog のサイトを適宜指定します。

   ```yaml
   ...
   "environment": [
     {
       "name": "DD_API_KEY",
       "value": "<API_KEY_HERE>"
     },
     {
       "name": "DD_SITE",
       "value": "datadoghq.com"
     },
     ...
   ```

2. Agent タスクの定義を登録し、プロファイルとリージョンをあなたの情報に置き換えます。`terraform/EC2` フォルダから、以下を実行します。

   {{< code-block lang="shell" >}}
   aws ecs register-task-definition --cli-input-json file://dd_agent_task_definition.json --profile <AWS_PROFILE> --region <AWS_REGION>{{< /code-block >}}

   出力から、次のステップで使用される `taskDefinitionArn` の値をメモしておいてください。

3. このコマンドを実行し、前のステップのタスク定義 ARN、AWS プロファイル、AWS リージョンを指定して、クラスターに Agent サービスを作成します。

   {{< code-block lang="shell" >}}
   aws ecs create-service --cluster apm-tutorial-ec2-go --task-definition <TASK_DEFINITION_ARN> --launch-type EC2 --scheduling-strategy DAEMON --service-name datadog-agent --profile <PROFILE> --region <AWS_REGION>{{< /code-block >}}

## トレースを見るためにアプリを起動する

アプリケーションを再デプロイし、API を実行します。

1. Redeploy the application to Amazon ECS using the [same terraform commands as before](#deploy-the-application), but with the instrumented version of the configuration files. From the `terraform/EC2/deployment` directory, run the following commands:

   ```shell
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

4. しばらく待って、Datadog の UI を見てみてください。[**APM > Traces**][9] に移動します。Traces リストには、次のように表示されます。
   {{< img src="tracing/guide/tutorials/tutorial-go-host-traces2.png" alt="Traces view shows trace data coming in from host." style="width:100%;" >}}

   データベース (`db`) と `notes` アプリのエントリがあります。トレースリストには、すべてのスパン、いつ開始したか、どのリソースがスパンで追跡されたか、どれくらいの時間がかかったか、が表示されます。

もし、トレースが表示されない場合は、**Traces** Search フィールドのフィルターをクリアしてください (使用していない `ENV` などの環境変数にフィルターをかけている場合があります)。

### トレースの検証

Traces ページで、`POST /notes` トレースをクリックすると、各スパンにかかった時間や、あるスパンが完了する前に他のスパンが発生したことを示すフレームグラフが表示されます。グラフの上部にあるバーは、前の画面で選択したスパンです (この場合、ノートアプリケーションへの最初のエントリポイントです)。

バーの幅は、それが完了するまでにかかった時間を示します。低い深さのバーは、高い深さのバーの寿命の間に完了するスパンを表します。

`POST` トレースのフレームグラフは次のようになります。

{{< img src="tracing/guide/tutorials/tutorial-go-host-post-flame.png" alt="POST トレースのフレームグラフ。" style="width:100%;" >}}

`GET /notes` トレースは次のようになります。

{{< img src="tracing/guide/tutorials/tutorial-go-host-get-flame.png" alt="GET トレースのフレームグラフ。" style="width:100%;" >}}

詳しくは、[カスタムインストルメンテーション][7]をご覧ください。

単一のアプリケーションをトレースすることは素晴らしいスタートです。しかし、トレースの本当の価値は、リクエストがサービスを通じてどのように流れているかを見ることです。これを_分散型トレーシング_と呼びます。最後の API コール (ノートに日付を追加したコール) のトレースをクリックすると、2 つのサービス間の分散型トレースを見ることができます。

{{< img src="tracing/guide/tutorials/tutorial-go-host-distributed.png" alt="分散型トレーシングのフレームグラフ。" style="width:100%;" >}}

複数のアプリケーションからのインタラクションを組み合わせたフレームグラフです。
- 最初のスパンは、ユーザーが送信した POST リクエストで、サポートされている `go-chi` ライブラリを通じて `chi` ルーターが処理します。
- 2 つ目のスパンは、`makeSpanMiddleware` 関数によって手動でトレースされた `createNote` 関数です。この関数は、HTTP リクエストのコンテキストからスパンを作成します。
- 次のスパンは、サポートされている `http` ライブラリと `main.go` ファイルで初期化されたクライアントを使用して、ノートアプリケーションから送信されたリクエストです。この GET リクエストは、カレンダーアプリケーションに送信されます。カレンダーアプリケーションのスパンは、別のサービスであるため、青色で表示されます。
- カレンダーアプリケーションの内部では、`go-chi` ルーターが GET リクエストを処理し、`GetDate` 関数は GET リクエストの下にある独自のスパンで手動でトレースされます。
- 最後に、紫の `db` 呼び出しは、サポートされている `sql` ライブラリからの独自のサービスです。`GET /Calendar` リクエストと同じレベルに表示されますが、これはどちらも親スパンの `CreateNote` から呼び出されるからです。

確認が終わったら、すべてのリソースをクリーンアップし、デプロイを削除してください。

{{< code-block lang="shell" >}}
terraform destroy
{{< /code-block >}}

## トラブルシューティング

もし、期待通りのトレースが受信できない場合は、Go トレーサーのでデバッグモードを設定してください。詳しくは[デバッグモードの有効化][10]を読んでください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/guide/#enabling-tracing-tutorials
[2]: /ja/tracing/trace_collection/dd_libraries/go/
[3]: /ja/account_management/api-app-keys/
[4]: https://aws.github.io/aws-sdk-go-v2/docs/configuring-sdk/#specifying-credentials
[5]: https://github.com/DataDog/apm-tutorial-golang
[6]: https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html
[7]: /ja/tracing/trace_collection/custom_instrumentation/go/
[8]: /ja/getting_started/tagging/unified_service_tagging/
[9]: https://app.datadoghq.com/apm/traces
[10]: /ja/tracing/troubleshooting/tracer_debug_logs/?code-lang=go