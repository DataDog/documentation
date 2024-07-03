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
title: Tutorial - Enabling Tracing for a Go Application and Datadog Agent in Containers
---

## 概要

このチュートリアルでは、コンテナにインストールされたサンプル Go アプリケーションでトレースを有効にするための手順を説明します。このシナリオでは、Datadog Agent はコンテナにもインストールされています。

ホスト上のアプリケーションと Agent、クラウドインフラストラクチャー上、および異なる言語で書かれたアプリケーション上のアプリケーションと Agent など、その他のシナリオについては、その他の[トレース有効化のチュートリアル][1]を参照してください。

Go の一般的なトレース設定ドキュメントについては、[Go アプリケーションのトレース][2]を参照してください。

### 前提条件

- Datadog のアカウントと[組織の API キー][3]
- Git
- Docker
- Curl
- Go バージョン 1.18+
- Make と GCC

## コンテナ化されたサンプル Go アプリケーションのインストール

このチュートリアルのコードサンプルは、GitHub の [github.com/DataDog/apm-tutorial-golang.git][9] にあります。まずは、git リポジトリを複製してください。

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-golang.git
{{< /code-block >}}

このリポジトリには、Docker コンテナ内で実行できるようにあらかじめ構成されたマルチサービスの Go アプリケーションが含まれています。サンプルアプリは、それぞれデータの追加や変更を行うための REST API を備えた基本的なノートアプリとカレンダーアプリで構成されます。`docker-compose` の YAML ファイルは `docker` ディレクトリに配置されます。

このチュートリアルでは、ノートとカレンダーの両アプリケーションと Datadog Agent のコンテナをビルドする `all-docker-compose.yaml` ファイルを使用します。

### サンプルアプリケーションの起動と実行

1. 以下を実行することでアプリケーションコンテナを構築します。
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml build{{< /code-block >}}

1. コンテナを起動します。

   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

1. コンテナが動作していることを `docker ps` コマンドで確認します。このようなものが表示されるはずです。
   {{< code-block lang="shell" disable_copy="true" >}}
   CONTAINER ID   IMAGE                           COMMAND                  CREATED              STATUS                          PORTS                    NAMES
   0a4704ebed09   docker-notes                    "./cmd/notes/notes"      About a minute ago   Up About a minute               0.0.0.0:8080->8080/tcp   notes
   9c428d7f7ad1   docker-calendar                 "./cmd/calendar/cale..."   About a minute ago   Up About a minute               0.0.0.0:9090->9090/tcp   calendar
   b2c2bafa6b36   gcr.io/datadoghq/agent:latest   "/bin/entrypoint.sh"     About a minute ago   Up About a minute (unhealthy)   8125/udp, 8126/tcp       datadog-ag
   {{< /code-block >}}

1. サンプルの `notes` アプリケーションは、インメモリデータベースにデータを保存する基本的な REST API です。`curl` を使っていくつかの API リクエストを送信します。

   `curl localhost:8080/notes`
   : まだデータベースに何もないので `[]` を返します

   `curl -X POST 'localhost:8080/notes?desc=hello'`
   : ノートに `hello` という説明と `1` という ID 値を追加します。`{"id":1,"description":"hello"}` を返します

   `curl localhost:8080/notes/1`
   : `id` の値が `1` であるノートを返します: `{"id":1,"description":"hello"}`

   `curl -X POST 'localhost:8080/notes?desc=otherNote'`
   : ノートに `otherNote` という説明と `2` という ID 値を追加します。`{"id":2,"description":"otherNote"}` を返します。

   `curl localhost:8080/notes`
   : データベースの内容を返します: `[{"id":1,"description":"hello"},{"id";2,"description":"otherNote"}]`

1. さらに API コールを実行し、アプリケーションのアクションを確認します。終わったら、シャットダウンしてコンテナを削除、削除されたことを確認します。
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml down
   docker-compose -f all-docker-compose.yaml rm{{< /code-block >}}

## トレースを有効にする

次に、トレースを有効にするために Go アプリケーションを構成します。Container Agent はコンテナで実行されるため、何もインストールする必要はありません。

トレースサポートを有効にするには、`apm-tutorial-golang/cmd/notes/main.go` で以下のインポートのコメントを解除してください。

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
{{< /code-block >}}

`main()` 関数で、以下の行のコメントを解除します。

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
tracer.Start()
defer tracer.Stop()
{{< /code-block >}}

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
client = httptrace.WrapClient(client, httptrace.RTWithResourceNamer(func(req *http.Request) string {
   return fmt.Sprintf("%s %s", req.Method, req.URL.Path)
}))
{{< /code-block >}}

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
r.Use(chitrace.Middleware(chitrace.WithServiceName("notes")))
{{< /code-block >}}

`setupDB()` で、以下の行のコメントを解除します。

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
sqltrace.Register("sqlite3", &sqlite3.SQLiteDriver{}, sqltrace.WithServiceName("db"))
db, err := sqltrace.Open("sqlite3", "file::memory:?cache=shared")
{{< /code-block >}}

次の行のコメントを解除します。
{{< code-block lang="go" filename="cmd/notes/main.go" >}}
db, err := sql.Open("sqlite3", "file::memory:?cache=shared")
{{< /code-block >}}

## Agent コンテナの追加

`all-docker-compose.yaml` ファイルのサービスセクションに Datadog Agent を追加し、ビルドに Agent を追加します。

1. Agent の構成のコメントを解除し、自分の [Datadog API キー][3]を指定します。
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml">}}
     datadog-agent:
     container_name: datadog-agent
     image: "gcr.io/datadoghq/agent:latest"
     pid: host
     environment:
       - DD_API_KEY=<DD_API_KEY_HERE>
       - DD_APM_ENABLED=true
       - DD_APM_NON_LOCAL_TRAFFIC=true
     volumes:
       - /var/run/docker.sock:/var/run/docker.sock
       - /proc/:/host/proc/:ro
       - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
   {{< /code-block >}}

1. `notes` コンテナ内の `datadog-agent` の `depends_on` フィールドのコメントを解除してください。

1. `notes` サービスセクションで、`DD_AGENT_HOST` 環境変数に Agent コンテナのホスト名が設定されていることに注目してください。`notes` コンテナセクションはこのようになるはずです。
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml">}}
   notes:
    container_name: notes
    restart: always
    build:
      context: ../
      dockerfile: ../dockerfile.notes
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
#     - CALENDAR_HOST=calendar
    depends_on:
#     - calendar
      - datadog-agent
   {{< /code-block >}}
   このチュートリアルの後半で、`calendar` セクションと変数を構成することになります。

## コンテナを起動して自動インスツルメンテーションを探る

トレーシングライブラリがインストールされたので、アプリケーションコンテナをスピンアップし、トレースの受信を開始します。以下のコマンドを実行します。

{{< code-block lang="shell" >}}
docker-compose -f all-docker-compose.yaml build
docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

トレースの生成と収集を開始するには、`make run` で再度アプリケーションを起動します。

Agent が動作しているかどうかは、ターミナルで連続出力を観察するか、Datadog の[イベントエクスプローラー][8]を開いて Agent の開始イベントを確認することで分かります。

{{< img src="tracing/guide/tutorials/tutorial-python-container-agent-start-event.png" alt="イベントエクスプローラーに表示される Agent の開始イベント" style="width:100%;" >}}

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

## トレーシングのコンフィギュレーション

トレーシングライブラリは、Datadog に送信するテレメトリーにタグを追加するように構成することができます。タグは、データをグループ化し、フィルターをかけ、ダッシュボードやグラフで有意義に表示するのに役立ちます。タグを追加するためには、アプリケーションを実行する際に環境変数を指定します。プロジェクトの `Makefile` には、環境変数 `DD_ENV`、`DD_SERVICE`、`DD_VERSION` が含まれており、これらは[統合サービスタグ付け][17]を有効にするように設定されています。

{{< code-block lang="go" filename="docker/all-docker-compose.yaml" disable_copy="true" >}}
environment:
  - DD_API_KEY=<DD_API_KEY_HERE>
  - DD_APM_ENABLED=true
  - DD_APM_NON_LOCAL_TRAFFIC=true
{{< /code-block >}}

利用可能な構成オプションの詳細については、[Go トレーシングライブラリの構成][14]を参照してください。

### 自動トレーシングライブラリの使用

Datadog には Go 用に完全にサポートされたライブラリがいくつかあり、コードに実装することで自動トレーシングが可能になります。`cmd/notes/main.go` ファイルでは、`go-chi`、`sql`、`http` ライブラリが対応する Datadog ライブラリ (それぞれ `chitrace`、`sqltrace`、`httptrace`) にエイリアスされているのが確認できます。

{{< code-block lang="go" filename="cmd/notes/main.go" disable_copy="true" collapsible="true" >}}
import (
  ...

  sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
  chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
  ...
)
{{< /code-block >}}

`cmd/notes/main.go` では、Datadog ライブラリは `WithServiceName` オプションで初期化されます。例えば、`chitrace` ライブラリは以下のように初期化されます。

{{< code-block lang="go" filename="cmd/notes/main.go" disable_copy="true" collapsible="true" >}}
r := chi.NewRouter()
r.Use(middleware.Logger)
r.Use(chitrace.Middleware(chitrace.WithServiceName("notes")))
r.Mount("/", nr.Register())
{{< /code-block >}}

`chitrace.WithServiceName("notes")` を使用すると、ライブラリによってトレースされるすべての要素がサービス名 `notes` に該当することを保証します。

`main.go` ファイルには、これら各ライブラリの実装例がより多く含まれています。ライブラリの拡張機能については、[Go 互換性要件][16]を参照してください。

### カスタムトレースをコンテキストで使用する

コードがサポートされているライブラリに該当しない場合、スパンを手動で作成することができます。

`notes/notesController.go` の `makeSpanMiddleware` 関数の周りのコメントを削除してください。この関数は、リクエストを指定された名前のスパンでラップするミドルウェアを生成します。この関数を使用するには、以下の行をコメントアウトしてください。

{{< code-block lang="go" filename="notes/notesController.go" disable_copy="true" collapsible="true" >}}
r.Get("/notes", nr.GetAllNotes)                // GET /notes
r.Post("/notes", nr.CreateNote)                // POST /notes
r.Get("/notes/{noteID}", nr.GetNoteByID)       // GET /notes/123
r.Put("/notes/{noteID}", nr.UpdateNoteByID)    // PUT /notes/123
r.Delete("/notes/{noteID}", nr.DeleteNoteByID) // DELETE /notes/123
{{< /code-block >}}

以下の行の周りのコメントを削除します。

{{< code-block lang="go" disable_copy="true" filename="notes/notesController.go" collapsible="true" >}}
r.Get("/notes", makeSpanMiddleware("GetAllNotes", nr.GetAllNotes))               // GET /notes
r.Post("/notes", makeSpanMiddleware("CreateNote", nr.CreateNote))                // POST /notes
r.Get("/notes/{noteID}", makeSpanMiddleware("GetNote", nr.GetNoteByID))          // GET /notes/123
r.Put("/notes/{noteID}", makeSpanMiddleware("UpdateNote", nr.UpdateNoteByID))    // PUT /notes/123
r.Delete("/notes/{noteID}", makeSpanMiddleware("DeleteNote", nr.DeleteNoteByID)) // DELETE /notes/123
{{< /code-block >}}

また、以下のインポート周りのコメントも削除してください。

{{< code-block lang="go" filename="notes/notesController.go" disable_copy="true" collapsible="true" >}}
"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
{{< /code-block >}}

サンプルアプリケーションには、カスタムトレースの例がいくつかあります。ここでは、さらにいくつかの例を紹介します。これらのスパンを有効にするには、コメントを削除してください。

`doLongRunningProcess` 関数は、親コンテキストから子スパンを作成します。

{{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
func doLongRunningProcess(ctx context.Context) {
    childSpan, ctx := tracer.StartSpanFromContext(ctx, "traceMethod1")
    childSpan.SetTag(ext.ResourceName, "NotesHelper.doLongRunningProcess")
    defer childSpan.Finish()

    time.Sleep(300 * time.Millisecond)
    log.Println("Hello from the long running process in Notes")
    privateMethod1(ctx)
}
{{< /code-block >}}

`privateMethod1` 関数は、コンテキストから完全に独立したサービスを作成することを示します。

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
}
{{< /code-block >}}

カスタムトレースの詳細については、[Go カスタムインスツルメンテーション][12]を参照してください。

## 分散型トレーシングを見るために 2 つ目のアプリケーションを追加する

単一のアプリケーションをトレースすることは素晴らしいスタートですが、トレースの本当の価値は、リクエストがサービスを通じてどのように流れるかを見ることです。これは、_分散型トレーシング_と呼ばれています。

サンプルプロジェクトには `calendar` という 2 番目のアプリケーションが含まれており、呼び出されるたびにランダムな日付を返します。ノートアプリケーションの `POST` エンドポイントには、`add_date` という名前の 2 つ目のクエリパラメーターがあります。このパラメータが `y` に設定されると、ノートアプリケーションはカレンダーアプリケーションを呼び出して、ノートに追加する日付を取得します。

カレンダーアプリケーションでトレースを有効にするには

1. `cmd/calendar/main.go` の以下の行のコメントを解除します。
   {{< code-block lang="go" filename="cmd/calendar/main.go" disable_copy="true" collapsible="true" >}}
   chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   {{< /code-block >}}

   {{< code-block lang="go" filename="cmd/calendar/main.go" disable_copy="true" collapsible="true" >}}
   tracer.Start()
   defer tracer.Stop()
   {{< /code-block >}}

   {{< code-block lang="go" filename="cmd/calendar/main.go" disable_copy="true" collapsible="true" >}}
   r.Use(chitrace.Middleware(chitrace.WithServiceName("calendar")))
   {{< /code-block >}}

1. `docker/all-docker-compose.yaml` を開き、`calendar` サービスのコメントを解除して、アプリ用の Agent ホストと Docker 用の統合サービスタグをセットアップします。
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml" >}}
   calendar:
     container_name: calendar
     restart: always
     build:
       context: ../
       dockerfile: ../dockerfile.calendar
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
   {{< /code-block >}}
1. `notes` サービスセクションで、`CALENDAR_HOST` 環境変数と `depends_on` の `calendar` エントリのコメントを解除して、2 つのアプリの間で必要な接続を行います。ノートサービスはこのようになるはずです。
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml" >}}
   notes:
     container_name: notes
     restart: always
     build:
       context: ../
       dockerfile: ../dockerfile.notes
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
       - CALENDAR_HOST=calendar
     depends_on:
       - calendar
       - datadog-agent
   {{< /code-block >}}

1. 実行中のコンテナをすべて停止します。
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml down{{< /code-block >}}

1. アプリケーションコンテナをスピンアップします。
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml build
   docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

1. `add_date` パラメーターを指定して、POST リクエストを送信します。
   {{< code-block lang="go">}}curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'{{< /code-block >}}

1. トレースエクスプローラーで、この最新の `notes` トレースをクリックすると、2 つのサービス間の分散型トレーシングが表示されます。
   {{< img src="tracing/guide/tutorials/tutorial-go-host-distributed.png" alt="分散型トレーシングのフレームグラフ。" style="width:100%;" >}}

複数のアプリケーションからのインタラクションを組み合わせたフレームグラフです。
- 最初のスパンは、ユーザーが送信した POST リクエストで、サポートされている `go-chi` ライブラリを通じて `chi` ルーターが処理します。
- 2 つ目のスパンは、`makeSpanMiddleware` 関数によって手動でトレースされた `createNote` 関数です。この関数は、HTTP リクエストのコンテキストからスパンを作成します。
- 次のスパンは、サポートされている `http` ライブラリと `main.go` ファイルで初期化されたクライアントを使用して、ノートアプリケーションから送信されたリクエストです。この GET リクエストは、カレンダーアプリケーションに送信されます。カレンダーアプリケーションのスパンは、別のサービスであるため、青色で表示されます。
- カレンダーアプリケーションの内部では、`go-chi` ルーターが GET リクエストを処理し、`GetDate` 関数は GET リクエストの下にある独自のスパンで手動でトレースされます。
- 最後に、紫の `db` 呼び出しは、サポートされている `sql` ライブラリからの独自のサービスです。`GET /Calendar` リクエストと同じレベルに表示されますが、これはどちらも親スパンの `CreateNote` から呼び出されるからです。

## トラブルシューティング

もし、期待通りのトレースが受信できない場合は、Go トレーサーのでデバッグモードを設定してください。詳しくは[デバッグモードの有効化][13]を読んでください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/guide/#enabling-tracing-tutorials
[2]: /ja/tracing/trace_collection/dd_libraries/go/
[3]: /ja/account_management/api-app-keys/
[4]: /ja/tracing/trace_collection/compatibility/go/
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: /ja/getting_started/site/
[7]: https://www.baeldung.com/go-instrumentation
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-golang
[10]: /ja/getting_started/tagging/unified_service_tagging/#non-containerized-environment
[11]: https://app.datadoghq.com/apm/traces
[12]: /ja/tracing/trace_collection/custom_instrumentation/go/
[13]: /ja/tracing/troubleshooting/tracer_debug_logs/?code-lang=go
[14]: /ja/tracing/trace_collection/library_config/go/
[15]: /ja/tracing/trace_pipeline/ingestion_mechanisms/?tab=Go
[16]: /ja/tracing/trace_collection/compatibility/go/#library-compatibility
[17]: /ja/getting_started/tagging/unified_service_tagging/