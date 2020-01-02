---
title: クイックスタート - 分散型トレーシング
further_reading:
  - link: tracing/setup/
    tag: ドキュメント
    text: アプリケーションで APM トレーシングをセットアップする方法
  - link: tracing/visualization/
    tag: ドキュメント
    text: Datadog に報告するサービスの一覧
  - link: tracing/visualization/service
    tag: ドキュメント
    text: Datadog のサービスについて
  - link: tracing/visualization/resource
    tag: ドキュメント
    text: リソースのパフォーマンスとトレースの詳細
  - link: tracing/visualization/trace
    tag: ドキュメント
    text: Datadog トレースの読み方を理解する
kind: ガイド
aliases:
  - /ja/tracing/faq/distributed-tracing
---
[トレーシングの最初の例][1]を読み終わり、トレーシングの機能についてさらに理解を深めたい方のために、単純な API **thinker-api** とその背後のマイクロサービス **thinker-microservice** を扱っている例を挙げます。この API は、適切な subject パラメーターを含むリクエストを受信すると thought で応答し、それ以外の場合はエラーで応答します。

{{< img src="tracing/product_specs/distributed_tracing/tracing_overview_GS.png" alt="Tracing getting started overview"  style="width:70%;" >}}

* リクエスト:
    ```bash
    curl 'localhost:5000/think/?subject=technology&subject=foo_bar'
    ```

* 応答:
    ```json
    {
        "technology": {
            "error": false,
            "quote": "For a successful technology, reality must take precedence over public relations, for Nature cannot be fooled.",
            "author": "Richard Feynman"
        },
        "foo_bar": {
            "error": true,
            "reason": "Subject unknown"
        }
    }
    ```

### 使用するコード

2 つのモジュールがあります。

* **Thinker API**: ユーザーのリクエストをキャッチして **thinker-microservice** に転送します。
    ```python
    import blinker as _
    import requests

    from flask import Flask, Response
    from flask import jsonify
    from flask import request as flask_request

    from ddtrace import tracer
    from ddtrace.contrib.flask import TraceMiddleware

    # Configuring Datadog tracer
    app = Flask('API')
    traced_app = TraceMiddleware(app, tracer, service='thinker-api')

    @app.route('/think/')
    def think_handler():
        thoughts = requests.get('http://thinker:8000/', headers={
            'x-datadog-trace-id': str(tracer.current_span().trace_id),
            'x-datadog-parent-id': str(tracer.current_span().span_id),
        }, params={
            'subject': flask_request.args.getlist('subject', str),
        }).content
        return Response(thoughts, mimetype='application/json')

    ```

* **Thinker Microservice**: 1 つまたは複数の subject を含む 1 つのリクエストを **thinker-api** から取得し、subject が「technology」の場合は thought で応答します。
    ```python
    import asyncio

    from aiohttp import web
    from ddtrace import tracer
    from ddtrace.contrib.aiohttp import trace_app

    app = web.Application()
    app.router.add_get('/', handle)

    trace_app(app, tracer, service='thinker-microservice')
    app['datadog_trace']['distributed_tracing_enabled'] = True

    @tracer.wrap(name='think')
    async def think(subject):
        tracer.current_span().set_tag('subject', subject)

        await asyncio.sleep(0.5)
        return thoughts[subject]

    thoughts = {
        'technology': Thought(
            quote='For a successful technology, reality must take precedence over public relations, for Nature cannot be fooled.',
            author='Richard Feynman',
        ),
    }

    async def handle(request):
        response = {}
        for subject in request.query.getall('subject', []):
            await asyncio.sleep(0.2)
            try:
                thought = await think(subject)
                response[subject] = {
                    'error': False,
                    'quote': thought.quote,
                    'author': thought.author,
                }
            except KeyError:
                response[subject] = {
                    'error': True,
                    'reason': 'Subject unknown'
                }

        return web.json_response(response)
    ```

上記のコードは既にインストルメント化されています。アプリケーションをインストルメント化して Datadog Agent を構成する方法については、[セットアップドキュメントを参照][2]してください。

### Datadog APM

コードを実行すると、[APM][3] でデータの表示が開始されます。[サービスリスト][4]に 2 つのサービス (**thinker-api** と **thinker-microservice**) が表示され、パフォーマンスに関する複数のメトリクスも一緒に示されます。

{{< img src="tracing/product_specs/distributed_tracing/services_GS.png" alt="Services list getting started"  >}}

**thinker-api** をクリックすると、自動的に生成される[サービスダッシュボード][5]に移動します。ここでは、詳細なパフォーマンスデータと、この特定のサービスに関連付けられているすべてのリソースの一覧が表示されます。

* [サービスのパフォーマンスを示すグラフ][6]
* この特定のサービスにアタッチされている[リソースの一覧][7]:

{{< img src="tracing/product_specs/distributed_tracing/resources_thinker_api_GS.png" alt="Resources thinker api getting started"  style="width:80%;" >}}

この例で最初に実行される関数は `think_handler()` です。これは、リクエストを処理して **thinker-microservice** サービスに転送します。

**thinker_handler** リソースを選択すると、自動的に生成される[リソースダッシュボード][7]と、この特定のリソースのトレースの一覧に移動します。

* [リソースのパフォーマンスを示すグラフ][8]
* この特定のリソースにアタッチされている[サンプリングされたトレースの一覧][9]:

{{< img src="tracing/product_specs/distributed_tracing/traces_thinker_api_GS.png" alt="traces thinker api getting started"  style="width:50%;" >}}

トレースを選択すると、以下のような情報を含むトレースパネルが開きます。

* リクエストのタイムスタンプ
* リクエストのステータス (ここでは `200`)
* リクエストが遭遇した各種のサービス: (ここでは **thinker_hander** と **thinker-microservice**)
* トレースされた関数の処理のためにアプリケーションが費やした時間
* http.method や http.url などの追加のタグ

{{< img src="tracing/product_specs/distributed_tracing/trace_thinker_api_GS.png" alt="trace thinker api getting started"  style="width:80%;" >}}

上記の画像から、リクエストがまず **thinker-api** サービスによって `flask.request` [スパン][10]で受信され、このサービスが処理済みリクエストを **thinker-microservice** サービスに送信し、そこで関数 `think()` が 2 回実行されていることがわかります。

コードに以下を追加しました。

```
tracer.current_span().set_tag('subject', subject)
```

これにより、`think()` が呼び出されてトレースされるたびに、詳細なコンテキストを取得できます。

* 1 回目の `think` が実行されるときの subject は **technology** で、すべて順調に処理されます。
    {{< img src="tracing/product_specs/distributed_tracing/traces_thinker_mircroservice_GS_1.png" alt="Thinker microservice getting started 1"  style="width:80%;" >}}

* 2 回目の `think` が実行されるときの subject は **foo_bar** ですが、これは適切な値ではないのでエラーになります。
    {{< img src="tracing/product_specs/distributed_tracing/traces_thinker_mircroservice_GS_2.png" alt="Thinker microservice getting started 2"  style="width:80%;" >}}

    このエラーの実際の表示は Datadog インスツルメンテーションによって自動的に行われますが、[特別な意味のタグルール][11]を使用して上書きできます。

Datadog APM では、リクエストがアプリケーションのさまざまなサービスやリソースに対して実行したすべての操作をトレースできます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing
[2]: /ja/tracing/send_traces
[3]: https://app.datadoghq.com/apm/home
[4]: /ja/tracing/visualization/services_list
[5]: /ja/tracing/visualization/service
[6]: /ja/tracing/visualization/service/#out-of-the-box-graphs
[7]: /ja/tracing/visualization/resource
[8]: /ja/tracing/visualization/resource/#out-of-the-box-graphs
[9]: /ja/tracing/guide/trace_sampling_and_storage
[10]: /ja/tracing/visualization/trace
[11]: /ja/tracing/visualization/trace/#traces-special-meaning-tags