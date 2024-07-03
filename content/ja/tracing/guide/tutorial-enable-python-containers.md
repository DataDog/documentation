---
further_reading:
- link: /tracing/trace_collection/library_config/python/
  tag: ドキュメント
  text: Additional tracing library configuration options
- link: /tracing/trace_collection/dd_libraries/python/
  tag: ドキュメント
  text: Detailed tracing library setup instructions
- link: /tracing/trace_collection/compatibility/python/
  tag: ドキュメント
  text: Supported Python frameworks for automatic instrumentation
- link: /tracing/trace_collection/custom_instrumentation/python/
  tag: ドキュメント
  text: Manually configuring traces and spans
- link: https://github.com/DataDog/dd-trace-py
  tag: ソースコード
  text: Tracing library open source code repository
title: Tutorial - Enabling Tracing for a Python Application and Datadog Agent in Containers
---

## 概要

このチュートリアルでは、コンテナにインストールされたサンプル Python アプリケーションでトレースを有効にするための手順を説明します。このシナリオでは、Datadog Agent はコンテナにもインストールされています。

{{< img src="tracing/guide/tutorials/tutorial-python-containers-overview.png" alt="このチュートリアルのインストールシナリオを示す図" style="width:100%;" >}}

ホスト上のアプリケーションと Agent、ホスト上のコンテナと Agent のアプリケーション、他の言語で書かれたアプリケーションなど、その他のシナリオについては、その他の[トレース有効化のチュートリアル][1]を参照してください。

Python の一般的なトレース設定ドキュメントについては、[Python アプリケーションのトレース][2]を参照してください。

### 前提条件

- Datadog のアカウントと[組織の API キー][3]
- Git
- [トレーシングライブラリの要件][4]を満たす Python

## Docker 化されたサンプル Python アプリケーションのインストール

このチュートリアルのコードサンプルは、GitHub の [github.com/Datadog/apm-tutorial-python][9] にあります。まずは、このリポジトリを複製してください。

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-python.git
{{< /code-block >}}

このリポジトリには、Docker コンテナ内で実行できるようにあらかじめ構成されたマルチサービスの Python アプリケーションが含まれています。サンプルアプリは、データの追加や変更を行うための REST API を備えた基本的なノートアプリです。

### サンプルアプリケーションの起動と実行

1. 以下を実行することでアプリケーションのコンテナを構築します。

   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
{{< /code-block >}}

2. コンテナを起動します。

   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml up db notes_app
{{< /code-block >}}

   ターミナルに次のような出力が表示されたら、アプリケーションの使用準備は完了です。

   ```
   notes          |  * Debug mode: on
   notes          | INFO:werkzeug:WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
   notes          |  * Running on all addresses (0.0.0.0)
   notes          |  * Running on http://127.0.0.1:8080
   notes          |  * Running on http://192.168.32.3:8080
   notes          | INFO:werkzeug:Press CTRL+C to quit
   notes          | INFO:werkzeug: * Restarting with stat
   notes          | WARNING:werkzeug: * Debugger is active!
   notes          | INFO:werkzeug: * Debugger PIN: 143-375-699
   ```

   また、`docker ps` コマンドで実行中のコンテナを表示することで、実行されていることを確認することができます。

3. 別のターミナルを開いて、アプリを行使するために API リクエストを送信します。ノートアプリケーションは、別のコンテナで実行されている Postgres データベースにデータを保存する REST API です。これにいくつかのコマンドを送信します。

`curl -X GET 'localhost:8080/notes'`
: `{}`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `(1, hello)`

`curl -X GET 'localhost:8080/notes?id=1'`
: `(1, hello)`

`curl -X GET 'localhost:8080/notes'`
: `{”1”, "hello"}`

`curl -X PUT 'localhost:8080/notes?id=1&desc=UpdatedNote'`
: `(1, UpdatedNote)`

`curl -X DELETE 'localhost:8080/notes?id=1'`
: `Deleted`

### アプリケーションを停止します。

アプリケーションの実行を確認したら、それを停止して、トレースを有効にします。

1. コンテナを停止します。
   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml down
{{< /code-block >}}

2. コンテナを削除します。
   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml rm
{{< /code-block >}}

## トレースを有効にする

Python アプリケーションが動作するようになったので、トレースを有効にするための構成を行います。

1. Python トレーシングパッケージをプロジェクトに追加します。ファイル `apm-tutorial-python/requirements.txt` を開き、`ddtrace` がなければ追加してください。

   ```
   flask==2.2.2
   psycopg2-binary==2.9.3
   requests==2.28.1
   ddtrace
   ```

2. ノートアプリケーションの Dockerfile (`docker/containers/exercise/Dockerfile.notes`) 内で、アプリケーションを起動する CMD 行を変更し、`ddtrace` パッケージを使用するようにしてください。

   ```
   # Run the application with Datadog 
   CMD ["ddtrace-run", "python", "-m", "notes_app.app"]
   ```

   これにより、アプリケーションは自動的に Datadog のサービスにインスツルメンテーションされます。

3. 異なるバージョンやデプロイ環境間でトレースされたサービスを識別する[統合サービスタグ][10]を適用することで、Datadog 内で相関が取れるようになり、検索やフィルターに利用できるようになります。統合サービスタグ付けに使用する環境変数は、`DD_SERVICE`、`DD_ENV`、`DD_VERSION` の 3 つです。Dockerfile に以下の環境変数を追加します。

   ```
   ENV DD_SERVICE="notes"
   ENV DD_ENV="dev"
   ENV DD_VERSION="0.1.0"
   ```

4. 統合サービスタグに対応する Docker ラベルを追加します。これにより、アプリケーションが実行されると、Docker のメトリクスも取得できるようになります。

   ```
   LABEL com.datadoghq.tags.service="notes"
   LABEL com.datadoghq.tags.env="dev"
   LABEL com.datadoghq.tags.version="0.1.0"
   ```

正しく設定されているか確認するために、サンプルリポジトリのソリューションファイル `docker/containers/solution/Dockerfile.notes` で提供されている Dockerfile ファイルと比較してみてください。

## Agent コンテナの追加

`docker/containers/exercise/docker-compose.yaml` ファイルのサービスセクションに Datadog Agent を追加します。

1. Agent の構成を追加し、自分の [Datadog API キー][3]と[サイト][6]を指定します。
   ```yaml
     datadog:
       container_name: dd-agent
       image: "gcr.io/datadoghq/agent:latest"
       environment:
          - DD_API_KEY=<DD_API_KEY>
          - DD_SITE=datadoghq.com  # Default. Change to eu.datadoghq.com, us3.datadoghq.com, us5.datadoghq.com as appropriate for your org
          - DD_APM_ENABLED=true    # Enable APM
       volumes: 
          - /var/run/docker.sock:/var/run/docker.sock:ro 
          - /proc/:/host/proc/:ro
          - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
   ```

2. 環境変数 `DD_AGENT_HOST` を追加し、監視したいコードを持つ各コンテナ (この場合は `notes_app` コンテナ) のセクションに、Agent コンテナのホスト名を指定します。
   ```yaml
       environment:
        - DD_AGENT_HOST=datadog
   ```

正しく設定されているか確認するために、サンプルリポジトリのソリューションファイル `docker/containers/solution/docker-compose.yaml` で提供されている `docker-compose.yaml` ファイルと比較してみてください。

## 自動トレースを見るためにコンテナを起動する

トレーシングライブラリがインストールされたので、アプリケーションを再起動し、トレースの受信を開始します。以下のコマンドを実行します。

```
docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
docker-compose -f docker/containers/exercise/docker-compose.yaml up db datadog notes_app
```

Agent が動作しているかどうかは、ターミナルで連続出力を観察するか、Datadog の[イベントエクスプローラー][8]を開いて Agent の開始イベントを確認することで分かります。

{{< img src="tracing/guide/tutorials/tutorial-python-container-agent-start-event.png" alt="イベントエクスプローラーに表示される Agent の開始イベント" style="width:100%;" >}}

アプリケーションを起動した状態で、いくつかの curl リクエストを送信します。

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `(1, hello)`

`curl -X GET 'localhost:8080/notes?id=1'`
: `(1, hello)`

`curl -X PUT 'localhost:8080/notes?id=1&desc=UpdatedNote'`
: `(1, UpdatedNote)`

`curl -X DELETE 'localhost:8080/notes?id=1'`
: `Deleted`

しばらく待って、Datadog の [**APM > Traces**][11] にアクセスすると、API 呼び出しに対応するトレースの一覧が表示されます。

{{< img src="tracing/guide/tutorials/tutorial-python-container-traces.png" alt="APM トレースエクスプローラーのサンプルアプリのトレース" style="width:100%;" >}}

もし、数分待ってもトレースが表示されない場合は、Traces Search フィールドのフィルターをクリアしてください (使用していない `ENV` などの環境変数にフィルターをかけている場合があります)。

### トレースの検証

Traces ページで、`POST /notes` トレースをクリックすると、各スパンにかかった時間や、あるスパンが完了する前に他のスパンが発生したことを示すフレームグラフが表示されます。グラフの上部にあるバーは、前の画面で選択したスパンです (この場合、ノートアプリケーションへの最初のエントリポイントです)。

バーの幅は、それが完了するまでにかかった時間を示します。低い深さのバーは、高い深さのバーの寿命の間に完了するスパンを表します。

`POST` トレースのフレームグラフは次のようになります。

{{< img src="tracing/guide/tutorials/tutorial-python-container-post-flame.png" alt="POST トレースのフレームグラフ。" style="width:100%;" >}}

`GET /notes` トレースは次のようになります。

{{< img src="tracing/guide/tutorials/tutorial-python-container-get-flame.png" alt="GET トレースのフレームグラフ。" style="width:100%;" >}}


## Python アプリケーションにカスタムインスツルメンテーションを追加する

自動インスツルメンテーションは便利ですが、より細かいスパンが欲しい場合もあります。Datadog の Python DD Trace API では、アノテーションやコードを使用してコード内のスパンを指定することができます。

次のステップでは、コードにアノテーションを追加して、いくつかのサンプルメソッドをトレースする方法を説明します。

1. `notes_app/notes_helper.py` を開きます。
2. 以下のインポートを追加します。
   {{< code-block lang="python" >}}
from ddtrace import tracer{{< /code-block >}}

3. `NotesHelper` クラスの中に、`notes_helper` というトレーサーラッパーを追加して、`notes_helper.long_running_process` メソッドがどのように動作するかを確認できるようにします。
   {{< code-block lang="python" >}}class NotesHelper:

    @tracer.wrap(service="notes_helper")
    def long_running_process(self):
        time.sleep(.3)
        logging.info("Hello from the long running process")
        self.__private_method_1(){{< /code-block >}}

   さて、トレーサーは自動的にリソースにラップされている関数名、この場合は `long_running_process` をラベル付けしています。

4. 以下を実行してコンテナを再構築します。
   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
docker-compose -f docker/containers/exercise/docker-compose.yaml up db datadog notes_app
{{< /code-block >}}
4. いくつかの HTTP リクエスト、特にいくつかの `GET` リクエストを再送します。
5. トレースエクスプローラーで、新しい `GET` リクエストの 1 つをクリックすると、次のようなフレームグラフが表示されます。

   {{< img src="tracing/guide/tutorials/tutorial-python-container-custom-flame.png" alt="カスタムインスツルメンテーションを用いた GET トレースのフレームグラフ。" style="width:100%;" >}}

   `get_notes` 関数にカスタムトレースが追加され、スタックトレースがより詳細になったことに注意してください。

詳しくは、[カスタムインストルメンテーション][12]をご覧ください。

## 分散型トレーシングを見るために 2 つ目のアプリケーションを追加する

単一のアプリケーションをトレースすることは素晴らしいスタートですが、トレースの本当の価値は、リクエストがサービスを通じてどのように流れるかを見ることです。これは、_分散型トレーシング_と呼ばれています。

サンプルプロジェクトには `calendar_app` という 2 番目のアプリケーションが含まれており、呼び出されるたびにランダムな日付を返します。Notes アプリケーションの `POST` エンドポイントには、`add_date` という名前の 2 つ目のクエリパラメーターがあります。このパラメータが `y` に設定されると、Notes はカレンダーアプリケーションを呼び出して、ノートに追加する日付を取得します。

1. Dockerfile の起動コマンドに `dd_trace` を追加して、カレンダーアプリをトレース用に構成します。`docker/containers/exercise/Dockerfile.calendar` を開き、CMD 行を以下のように更新します。
   ```
   CMD ["ddtrace-run", "python", "-m", "calendar_app.app"] 
   ```

3. ノートアプリと同様に、統合サービスタグを適用します。`Dockerfile.calendar` ファイルに、以下の環境変数を追加します。

   ```
   ENV DD_SERVICE="calendar"
   ENV DD_ENV="dev"
   ENV DD_VERSION="0.1.0"
   ```

4. 再び、統合サービスタグに対応する Docker ラベルを追加します。これにより、アプリケーションが実行されると、Docker のメトリクスも取得できるようになります。

   ```
   LABEL com.datadoghq.tags.service="calendar"
   LABEL com.datadoghq.tags.env="dev"
   LABEL com.datadoghq.tags.version="0.1.0"
   ```

2. Agent コンテナのホスト名である `DD_AGENT_HOST` をカレンダーアプリのコンテナに追加し、トレースを正しい場所に送信します。`docker/containers/exercise/docker-compose.yaml` を開き、`calendar_app` セクションに以下の行を追加してください。

   ```yaml
       environment:
        - DD_AGENT_HOST=datadog
   ```

   正しく設定されているか確認するために、サンプルリポジトリの `docker/containers/solution` ディレクトリで提供されている Dockerfile と `docker-config.yaml` ファイルと比較してみてください。

5. コンテナを再起動し、マルチサービスアプリケーションを構築します。まず、実行中のコンテナをすべて停止します。
   ```
   docker-compose -f docker/containers/exercise/docker-compose.yaml down
   ```

   その後、以下のコマンドを実行して起動します。
   ```
   docker-compose -f docker/containers/exercise/docker-compose.yaml build
   docker-compose -f docker/containers/exercise/docker-compose.yaml up
   ```

6. `add_date` パラメーターを指定して、POST リクエストを送信します。

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `(2, hello_again with date 2022-11-06)`


7. トレースエクスプローラーで、この最新のトレースをクリックすると、2 つのサービス間の分散型トレーシングが表示されます。

   {{< img src="tracing/guide/tutorials/tutorial-python-container-distributed.png" alt="分散型トレーシングのフレームグラフ。" style="width:100%;" >}}

## カスタムインスツルメンテーションの追加

コードを使って、カスタムのインスツルメンテーションを追加することができます。例えば、カレンダサービスをさらにインスツルメンテーションして、トレースを見やすくしたいとします。

1. `notes_app/notes_logic.py` を開きます。
2. 以下のインポートを追加します。

   ```python
   from ddtrace import tracer
   ```
3. `try` ブロックの内部、28 行目あたりに、次の `with` ステートメントを追加してください。

   ```python
   with tracer.trace(name="notes_helper", service="notes_helper", resource="another_process") as span:
   ```
   その結果、こうなりました。
   {{< code-block lang="python" >}}
def create_note(self, desc, add_date=None):
        if (add_date):
            if (add_date.lower() == "y"):
                try:
                    with tracer.trace(name="notes_helper", service="notes_helper", resource="another_process") as span:
                        self.nh.another_process()
                    note_date = requests.get(f"http://localhost:9090/calendar")
                    note_date = note_date.text
                    desc = desc + " with date " + note_date
                    print(desc)
                except Exception as e:
                    print(e)
                    raise IOError("Cannot reach calendar service.")
        note = Note(description=desc, id=None)
        note.id = self.db.create_note(note){{< /code-block >}}

4. コンテナを再構築します。
   ```
   docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
   docker-compose -f docker/containers/exercise/docker-compose.yaml up
   ```

5. 引数 `add_date` を指定して、より多くの HTTP リクエスト、特に `POST` リクエストを送信します。
6. トレースエクスプローラーで、これらの新しい `POST` トレースをクリックすると、複数のサービスにわたるカスタムトレースが表示されます。
   {{< img src="tracing/guide/tutorials/tutorial-python-container-cust-dist.png" alt="カスタムインスツルメンテーションを用いた分散型トレーシングのフレームグラフ。" style="width:100%;" >}}
   新しいスパンには `notes_helper.another_process` というラベルが付けられていることに注意してください。

もし、期待通りのトレースが受信できない場合は、Python パッケージの `ddtrace` でデバッグモードを設定してください。詳しくは[デバッグモードの有効化][13]を読んでください。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/guide/#enabling-tracing-tutorials
[2]: /ja/tracing/trace_collection/dd_libraries/python/
[3]: /ja/account_management/api-app-keys/
[4]: /ja/tracing/trace_collection/compatibility/python/
[6]: /ja/getting_started/site/
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-python
[10]: /ja/getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/apm/traces
[12]: /ja/tracing/trace_collection/custom_instrumentation/python/
[13]: /ja/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode