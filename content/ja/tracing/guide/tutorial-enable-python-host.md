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
title: チュートリアル - Datadog Agent と同じホスト上の Python アプリケーションのトレースを有効にする
---

## 概要

このチュートリアルでは、ホスト上にインストールされたサンプル Python アプリケーションでトレースを有効にするための手順を説明します。このシナリオでは、アプリケーションと同じホスト上に Datadog Agent をインストールします。

{{< img src="tracing/guide/tutorials/tutorial-python-host-overview.png" alt="このチュートリアルのインストールシナリオを示す図" style="width:100%;" >}}

コンテナ内のアプリケーション、コンテナ内の Agent、異なる言語で書かれたアプリケーションなど、その他のシナリオについては、その他の[トレース有効化のチュートリアル][1]を参照してください。

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

もしホストに既に Agent がインストールされている場合は、少なくともバージョン 7.28 であることを確認してください。Python アプリケーションをトレースするために `ddtrace` を使用するために必要な Datadog Agent の最小バージョンは、[トレーシングライブラリ開発者向けドキュメント][7]に記載されています。

[**Events &gt; Explorer**][8] を開き、オプションで `Datadog` ソースファセットでフィルタリングし、ホストへの Agent インストールを確認するイベントを探して、Agent が実行されており、Datadog にデータを送信していることを確認します。

{{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="Agent がホストにインストールされたことを示す Datadog からのメッセージを表示するイベントエクスプローラー。" style="width:70%;" >}}

<div class="alert alert-info">数分後、Datadog にホストが表示されない場合 (<strong>Infrastructure > Host map</strong>)、<a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>Organization Settings > API Keys</strong></a> にある組織の正しい API キーを使用したことを確認してください。</div>


## サンプル Python アプリケーションのインストールと実行

次に、トレースするためのサンプルアプリケーションをインストールします。このチュートリアルのコードサンプルは [github.com/Datadog/apm-tutorial-python][9] で見ることができます。以下を実行することで git リポジトリの複製を行います。

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-python.git
{{< /code-block >}}

Poetry または pip のいずれかを使用して、サンプルに必要な Python の依存関係を設定し、構成し、インストールします。以下のいずれかを実行します。

{{% tabs %}}

{{< tab "Poetry" >}}

```shell
poetry install
```

{{< /tab >}}

{{< tab "pip" >}}

```shell
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

{{< /tab >}}

{{% /tabs %}}

以下を実行することでアプリケーションを起動します。

{{< code-block lang="shell" >}}
python -m notes_app.app
{{< /code-block >}}

サンプルの `notes_app` アプリケーションは、インメモリデータベースにデータを保存する基本的な REST API です。別のターミナルを開き、`curl` を使っていくつかの API リクエストを送信します。

`curl -X GET 'localhost:8080/notes'`
: まだデータベースに何もないので `{}` を返します

`curl -X POST 'localhost:8080/notes?desc=hello'`
: ノートに `hello` という説明と `1` という ID 値を追加します。`( 1, hello)` を返します。

`curl -X GET 'localhost:8080/notes?id=1'`
: `id` の値が `1` であるノートを返します: `( 1, hello)`

`curl -X POST 'localhost:8080/notes?desc=otherNote'`
: `otherNote` という説明と `2` という ID 値を持つノートを追加します。`( 2, otherNote)` を返します

`curl -X GET 'localhost:8080/notes'`
: データベースの内容を返します: `{ "1": "hello", "2": "otherNote" }`

`curl -X PUT 'localhost:8080/notes?id=1&desc=UpdatedNote'`
: 最初のノートの説明の値を `UpdatedNote` に更新します。

`curl -X DELETE 'localhost:8080/notes?id=1'`
: データベースから最初のノートを削除します。

さらに API コールを実行し、アプリケーションのアクションを確認します。終了したら、Ctrl+C でアプリケーションを停止します。

## Datadog トレーシングのインストール

次に、トレーシングライブラリを Poetry または pip (最小バージョン 18) を使ってインストールします。`apm-tutorial-python` ディレクトリから、以下を実行します。

{{% tabs %}}

{{< tab "Poetry" >}}

```shell
poetry add ddtrace
poetry install

```

{{< /tab >}}

{{< tab "pip" >}}

```shell
pip install ddtrace
```

{{< /tab >}}

{{% /tabs %}}

## 自動インスツルメンテーションによる Python アプリケーションの起動

トレースの生成と収集を開始するには、前回とは少し異なる方法でサンプルアプリケーションを再起動します。以下を実行します。

{{< code-block lang="shell" >}}DD_SERVICE=notes DD_ENV=dev DD_VERSION=0.1.0 \
 ddtrace-run python -m notes_app.app{{< /code-block >}}

このコマンドは、`DD_SERVICE`、`DD_VERSION`、`DD_ENV` 環境変数を設定して[統合サービスタグ付け][10]を有効にし、Datadog 全体のデータ相関を可能にするものです。

再びアプリケーションにリクエストを送るには、`curl` を使用します。

`curl -X GET 'localhost:8080/notes'`
: `{}`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `( 1, hello)`

`curl -X GET 'localhost:8080/notes?id=1'`
: `( 1, hello)`

`curl -X POST 'localhost:8080/notes?desc=newNote'`
: `( 2, newNote)`

`curl -X GET 'localhost:8080/notes'`
: `{ "1": "hello", "2": "newNote" }`

しばらく待って、Datadog の UI を見てみてください。[**APM > Traces**][11] に移動します。Traces リストには、次のように表示されます。

{{< img src="tracing/guide/tutorials/tutorial-python-host-traces.png" alt="Traces ビューには、ホストから入ってくるトレースデータが表示されます。" style="width:100%;" >}}

もし、トレースが表示されない場合は、Traces Search フィールドのフィルターをクリアしてください (使用していない `ENV` などの環境変数にフィルターをかけている場合があります)。

### トレースの検証

Traces ページで、`POST /notes` トレースをクリックすると、各スパンにかかった時間や、あるスパンが完了する前に他のスパンが発生したことを示すフレームグラフが表示されます。グラフの上部にあるバーは、前の画面で選択したスパンです (この場合、ノートアプリケーションへの最初のエントリポイントです)。

バーの幅は、それが完了するまでにかかった時間を示します。低い深さのバーは、高い深さのバーの寿命の間に完了するスパンを表します。

`POST` トレースのフレームグラフは次のようになります。

{{< img src="tracing/guide/tutorials/tutorial-python-host-post-flame.png" alt="POST トレースのフレームグラフ。" style="width:100%;" >}}

`GET /notes` トレースは次のようになります。

{{< img src="tracing/guide/tutorials/tutorial-python-host-get-flame.png" alt="GET トレースのフレームグラフ。" style="width:100%;" >}}


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

4. いくつかの HTTP リクエスト、特にいくつかの `GET` リクエストを再送します。
5. トレースエクスプローラーで、新しい `GET` リクエストの 1 つをクリックすると、次のようなフレームグラフが表示されます。

   {{< img src="tracing/guide/tutorials/tutorial-python-host-custom-flame.png" alt="カスタムインスツルメンテーションを用いた GET トレースのフレームグラフ。" style="width:100%;" >}}

   `get_notes` 関数にカスタムトレースが追加され、スタックトレースがより詳細になったことに注意してください。

詳しくは、[カスタムインストルメンテーション][12]をご覧ください。

## 分散型トレーシングを見るために 2 つ目のアプリケーションを追加する

単一のアプリケーションをトレースすることは素晴らしいスタートですが、トレースの本当の価値は、リクエストがサービスを通じてどのように流れるかを見ることです。これは、_分散型トレーシング_と呼ばれています。

サンプルプロジェクトには `calendar_app` という 2 番目のアプリケーションが含まれており、呼び出されるたびにランダムな日付を返します。Notes アプリケーションの `POST` エンドポイントには、`add_date` という名前の 2 つ目のクエリパラメーターがあります。このパラメータが `y` に設定されると、Notes はカレンダーアプリケーションを呼び出して、ノートに追加する日付を取得します。

1. 以下を実行することでカレンダーアプリケーションを起動します。

   {{< code-block lang="shell" >}}
   DD_SERVICE=calendar DD_ENV=dev DD_VERSION=0.1.0 \
   ddtrace-run python -m calendar_app.app
   {{< /code-block >}}

2. `add_date` パラメーターを指定して、POST リクエストを送信します。

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `(2, hello_again with date 2022-11-06)`


3. トレースエクスプローラーで、この最新のトレースをクリックすると、2 つのサービス間の分散型トレーシングが表示されます。

   {{< img src="tracing/guide/tutorials/tutorial-python-host-distributed.png" alt="分散型トレーシングのフレームグラフ。" style="width:100%;" >}}

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

4. 引数 `add_date` を指定して、より多くの HTTP リクエスト、特に `POST` リクエストを送信します。
5. トレースエクスプローラーで、これらの新しい `POST` トレースをクリックすると、複数のサービスにわたるカスタムトレースが表示されます。
   {{< img src="tracing/guide/tutorials/tutorial-python-host-cust-dist.png" alt="カスタムインスツルメンテーションを用いた分散型トレーシングのフレームグラフ。" style="width:100%;" >}}
   新しいスパンには `notes_helper.another_process` というラベルが付けられていることに注意してください。

もし、期待通りのトレースが受信できない場合は、Python パッケージの `ddtrace` でデバッグモードを設定してください。詳しくは[デバッグモードの有効化][13]を読んでください。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/guide/#enabling-tracing-tutorials
[2]: /ja/tracing/trace_collection/dd_libraries/python/
[3]: /ja/account_management/api-app-keys/
[4]: /ja/tracing/trace_collection/compatibility/python/
[5]: https://app.datadoghq.com/account/settings#agent/overview
[6]: /ja/getting_started/site/
[7]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-python
[10]: /ja/getting_started/tagging/unified_service_tagging/#non-containerized-environment
[11]: https://app.datadoghq.com/apm/traces
[12]: /ja/tracing/trace_collection/custom_instrumentation/python/
[13]: /ja/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode