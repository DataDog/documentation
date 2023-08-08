---
further_reading:
- link: /tracing/trace_collection/library_config/python/
  tags: ドキュメント
  text: トレーシングライブラリの追加構成オプション
- link: /tracing/trace_collection/dd_libraries/python/
  tags: ドキュメント
  text: トレーシングライブラリの詳細設定手順
- link: /tracing/trace_collection/compatibility/python/
  tags: ドキュメント
  text: 自動インスツルメンテーションのためにサポートされている Python フレームワーク
- link: /tracing/trace_collection/custom_instrumentation/python/
  tags: ドキュメント
  text: トレースとスパンを手動で構成する
- link: https://github.com/DataDog/dd-trace-php
  tags: GitHub
  text: トレーシングライブラリオープンソースコードリポジトリ
kind: ガイド
title: チュートリアル - コンテナ内の Python アプリケーションとホスト上の Agent のトレースを有効にする
---

## 概要

このチュートリアルでは、コンテナにインストールされたサンプル Python アプリケーションでトレースを有効にするための手順を説明します。このシナリオでは、Datadog Agent はホストにインストールされています。

{{< img src="tracing/guide/tutorials/tutorial-python-container-agent-host-overview.png" alt="このチュートリアルのインストールシナリオを示す図" style="width:100%;" >}}

ホスト上のアプリケーションと Agent、コンテナ内のアプリケーションと Agent、異なる言語で書かれたアプリケーションなど、その他のシナリオについては、その他の[トレース有効化のチュートリアル][1]を参照してください。

Python の一般的なトレース設定ドキュメントについては、[Python アプリケーションのトレース][2]を参照してください。

### 前提条件

- Datadog のアカウントと[組織の API キー][3]
- Git
- [トレーシングライブラリの要件][4]を満たす Python

## Agent のインストール

Datadog Agent をマシンにインストールしていない場合は、[**Integrations > Agent**][5] にアクセスし、お使いの OS を選択してください。例えば、ほとんどの Linux プラットフォームでは、`<YOUR_API_KEY>` を [Datadog API キー][3]に置き換えて、以下のスクリプトを実行することで Agent をインストールすることができます。

{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script.sh)"
{{< /code-block >}}

`datadoghq.com` 以外の Datadog サイトにデータを送信するには、`DD_SITE` 環境変数を [Datadog サイト][6]に置き換えてください。

Agent がコンテナからトレースデータを受信するように構成されていることを確認します。その[コンフィギュレーションファイル][15]を開き、`apm_config:` がコメント解除されていること、そして `apm_non_local_traffic` がコメント解除されており、`true` に設定されていることを確認します。


もしホストに既に Agent がインストールされている場合は、少なくともバージョン 7.28 であることを確認してください。Python アプリケーションをトレースするために `ddtrace` を使用するために必要な Datadog Agent の最小バージョンは、[トレーシングライブラリ開発者向けドキュメント][7]に記載されています。


## Docker 化されたサンプル Python アプリケーションのインストール

このチュートリアルのコードサンプルは、GitHub の [github.com/Datadog/apm-tutorial-python][9] にあります。まずは、このリポジトリを複製してください。

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-python.git
{{< /code-block >}}

このリポジトリには、Docker コンテナ内で実行できるようにあらかじめ構成されたマルチサービスの Python アプリケーションが含まれています。サンプルアプリは、データの追加や変更を行うための REST API を備えた基本的なノートアプリです。

### サンプルアプリケーションの起動と実行

1. 以下を実行することでアプリケーションのコンテナを構築します。

   {{< code-block lang="sh" >}}
docker-compose -f docker/host-and-containers/exercise/docker-compose.yaml build notes_app
{{< /code-block >}}

2. コンテナを起動します。

   {{< code-block lang="sh" >}}
docker-compose -f docker/host-and-containers/exercise/docker-compose.yaml up db notes_app
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

   また、`docker ps` コマンドでコンテナを表示することで、実行されていることを確認することができます。

3. 別のターミナルを開いて、アプリを行使するために API リクエストを送信します。ノートアプリケーションは、別のコンテナで実行されている Postgres データベースにデータを保存する REST API です。これにいくつかのコマンドを送信します。

`curl -X GET 'localhost:8080/notes'`
: `{}`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `(1, hello)`

`curl -X GET 'localhost:8080/notes?id=1'`
: `(1, hello)`

`curl -X GET 'localhost:8080/notes'`
: `{"1", "hello"}`

`curl -X PUT 'localhost:8080/notes?id=1&desc=UpdatedNote'`
: `(1, UpdatedNote)`

`curl -X DELETE 'localhost:8080/notes?id=1'`
: `Deleted`

### アプリケーションを停止します。

アプリケーションの実行を確認したら、それを停止して、トレースを有効にします。

1. コンテナを停止します。
   {{< code-block lang="sh" >}}
docker-compose -f docker/host-and-containers/exercise/docker-compose.yaml down
{{< /code-block >}}

2. コンテナを削除します。
   {{< code-block lang="sh" >}}
docker-compose -f docker/host-and-containers/exercise/docker-compose.yaml rm
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

2. ノートアプリケーションの Dockerfile (`docker/host-and-containers/exercise/Dockerfile.notes`) 内で、アプリケーションを起動する CMD 行を変更し、`ddtrace` パッケージを使用するようにしてください。

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

正しく設定されているか確認するために、サンプルリポジトリのソリューションファイル `docker/host-and-containers/solution/Dockerfile.notes` で提供されている Dockerfile ファイルと比較してみてください。

## Agent にトレースを送信するためのコンテナの構成

1. コンテナのコンポーズファイルである `docker/host-and-containers/exercise/docker-compose.yaml` を開いてください。

2. `notes_app` コンテナセクションに、環境変数 `DD_AGENT_HOST` を追加し、Agent コンテナのホスト名を指定します。
   ```yaml
       environment:
        - DD_AGENT_HOST=host.docker.internal
   ```

3. **Linux の場合**: また、Docker の内部ネットワークで通信できるように、コンポーズファイルに `extra_host` を追加してください。コンポーズファイルの `notes-app` セクションは、以下のようになります。

   ```yaml
     notes_app:
       container_name: notes
       restart: always
       build:
          context: ../../..
          dockerfile: docker/host-and-containers/exercise/Dockerfile.notes
       ports:
          - "8080:8080"
       depends_on:
          - db
       extra_hosts:                             # Linux only configuration
         - "host.docker.internal:host-gateway"  # Linux only configuration
      environment:
         - DB_HOST=test_postgres                 # the Postgres container
         - CALENDAR_HOST=calendar                # the calendar container
         - DD_AGENT_HOST=host.docker.internal    # the Agent running on the local machine using docker network
   ```


正しく設定されているか確認するために、サンプルリポジトリのソリューションファイル `docker/host-and-containers/solution/docker-compose.yaml` で提供されている `docker-compose.yaml` ファイルと比較してみてください。

## Agent の起動

ホスト上で Agent サービスを開始します。コマンドは、[演算子によって異なります][14]。例:

MacOS
: `launchctl start com.datadoghq.agent`

Linux
: `sudo service datadog-agent start`

[**Events &gt; Explorer**][8] を開き、オプションで `Datadog` ソースファセットでフィルタリングし、ホストへの Agent インストールを確認するイベントを探して、Agent が実行されており、Datadog にデータを送信していることを確認します。

{{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="Agent がホストにインストールされたことを示す Datadog からのメッセージを表示するイベントエクスプローラー。" style="width:70%;" >}}

<div class="alert alert-info">数分後、Datadog にホストが表示されない場合 (<strong>Infrastructure > Host map</strong>)、<a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>Organization Settings > API Keys</strong></a> にある組織の正しい API キーを使用したことを確認してください。</div>


## 自動トレースを見るためにコンテナを起動する

トレーシングライブラリがインストールされ、Agent が動作しているので、アプリケーションを再起動し、トレースの受信を開始します。以下のコマンドを実行します。

```
docker-compose -f docker/host-and-containers/exercise/docker-compose.yaml build notes_app
docker-compose -f docker/host-and-containers/exercise/docker-compose.yaml up db notes_app
```

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
docker-compose -f docker/host-and-containers/exercise/docker-compose.yaml build notes_app
docker-compose -f docker/host-and-containers/exercise/docker-compose.yaml up db notes_app
{{< /code-block >}}
4. いくつかの HTTP リクエスト、特にいくつかの `GET` リクエストを再送します。
5. トレースエクスプローラーで、新しい `GET` リクエストの 1 つをクリックすると、次のようなフレームグラフが表示されます。

   {{< img src="tracing/guide/tutorials/tutorial-python-container-custom-flame.png" alt="カスタムインスツルメンテーションを用いた GET トレースのフレームグラフ。" style="width:100%;" >}}

   `get_notes` 関数にカスタムトレースが追加され、スタックトレースがより詳細になったことに注意してください。

詳しくは、[カスタムインストルメンテーション][12]をご覧ください。

## 分散型トレーシングを見るために 2 つ目のアプリケーションを追加する

単一のアプリケーションをトレースすることは素晴らしいスタートですが、トレースの本当の価値は、リクエストがサービスを通じてどのように流れるかを見ることです。これは、_分散型トレーシング_と呼ばれています。

サンプルプロジェクトには `calendar_app` という 2 番目のアプリケーションが含まれており、呼び出されるたびにランダムな日付を返します。Notes アプリケーションの `POST` エンドポイントには、`add_date` という名前の 2 つ目のクエリパラメーターがあります。このパラメータが `y` に設定されると、Notes はカレンダーアプリケーションを呼び出して、ノートに追加する日付を取得します。

1. Dockerfile の起動コマンドに `dd_trace` を追加して、カレンダーアプリをトレース用に構成します。`docker/host-and-containers/exercise/Dockerfile.calendar` を開き、CMD 行を以下のように更新します。
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

2. 先ほどのノートアプリと同様に、Agent コンテナのホスト名である `DD_AGENT_HOST` をカレンダーアプリのコンテナに追加し、トレースを正しい場所に送信できるようにします。`docker/host-and-containers/exercise/docker-compose.yaml` を開き、`calendar_app` セクションに以下の行を追加してください。

   ```yaml
       environment:
        - DD_AGENT_HOST=host.docker.internal
   ```
   また、Linux を使用している場合は、`extra_host` も追加してください。

   ```yaml
       extra_hosts:
         - "host.docker.internal:host-gateway"
   ```


正しく設定されているか確認するために、サンプルリポジトリの `docker/host-and-containers/solution` ディレクトリで提供されている Dockerfile と `docker-config.yaml` ファイルと比較してみてください。

5. コンテナを再起動し、マルチサービスアプリケーションを構築します。まず、実行中のコンテナをすべて停止します。
   ```
   docker-compose -f docker/host-and-containers/exercise/docker-compose.yaml down
   ```

   その後、以下のコマンドを実行して起動します。
   ```
   docker-compose -f docker/host-and-containers/exercise/docker-compose.yaml build
   docker-compose -f docker/host-and-containers/exercise/docker-compose.yaml up
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
                    note_date = requests.get(f"https://{CALENDAR_HOST}/calendar")
                    note_date = note_date.text
                    desc = desc + " with date " + note_date
                    print(desc)
                except Exception as e:
                    print(e)
                    raise IOError("Cannot reach calendar service.")
        note = Note(description=desc, id=None)
        return self.db.create_note(note){{< /code-block >}}

4. コンテナを再構築します。
   ```
   docker-compose -f docker/host-and-containers/exercise/docker-compose.yaml build notes_app
   docker-compose -f docker/host-and-containers/exercise/docker-compose.yaml up
   ```

5. 引数 `add_date` を指定して、より多くの HTTP リクエスト、特に `POST` リクエストを送信します。
6. トレースエクスプローラーで、これらの新しい `POST` トレースをクリックすると、複数のサービスにわたるカスタムトレースが表示されます。
   {{< img src="tracing/guide/tutorials/tutorial-python-container-cust-dist.png" alt="カスタムインスツルメンテーションを用いた分散型トレーシングのフレームグラフ。" style="width:100%;" >}}
   新しいスパンには `notes_helper.another_process` というラベルが付けられていることに注意してください。

もし、期待通りのトレースが受信できない場合は、Python パッケージの `ddtrace` でデバッグモードを設定してください。詳しくは[デバッグモードの有効化][13]を読んでください。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/guide/#enabling-tracing-tutorials
[2]: /ja/tracing/trace_collection/dd_libraries/python/
[3]: /ja/account_management/api-app-keys/
[4]: /ja/tracing/trace_collection/compatibility/python/
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: /ja/getting_started/site/
[7]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-python
[10]: /ja/getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/apm/traces
[12]: /ja/tracing/trace_collection/custom_instrumentation/python/
[13]: /ja/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[14]: /ja/agent/guide/agent-commands/?tab=agentv6v7#start-the-agent
[15]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7