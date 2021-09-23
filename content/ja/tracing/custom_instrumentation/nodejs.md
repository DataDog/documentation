---
title: NodeJS カスタムインスツルメンテーション
kind: ドキュメント
aliases:
  - /ja/tracing/opentracing/nodejs
  - /ja/tracing/manual_instrumentation/nodejs
description: Nodejs アプリケーションを手動でインスツルメントしてカスタムトレースを Datadog に送信します。
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: ログとトレースの接続
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースの詳細
---
{{< alert type="info" >}}
自動インスツルメンテーションとセットアップの手順をまだ読んでいない場合は、<a href="https://docs.datadoghq.com/tracing/setup/nodejs/">NodeJS セットアップ手順</a>からご覧ください。
{{< /alert >}}

対応するライブラリインスツルメンテーションを使用しない場合（ [ライブラリの互換性][1]参照）、手動でコードをインスツルメントする必要があります。

`dd-trace` ライブラリの機能性を拡張したり、アプリケーションのインスツルメントをより精確に制御するのに役立つ方法がライブラリにあります。

## スパンの作成

`dd-trace` ライブラリは、`tracer.init()` で[多くのライブラリとフレームワーク][1]に対応する[スパン][2]を自動生成します。しかし、使用しているコードを可視化したい場合はスパンの利用が便利です。

Web リクエスト (例: `/make-sandwich`) 内で、`getIngredients()` や `assembleSandwich()` など、測定に役立つさまざまなオペレーションを行うことができます。

{{< tabs >}}
{{% tab "Synchronous" %}}

Synchronous コードは、`tracer.trace()` でトレースできます。これにより、コールバックが戻ったときに自動的にスパンが終了し、スローされたエラーが自動的にキャプチャされます。

```javascript
app.get('/make-sandwich', (req, res) => {
  const sandwich = tracer.trace('sandwich.make', () => {
    const ingredients = tracer.trace('get_ingredients', () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', () => {
      assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

`tracer.trace()` の API 詳細は[こちら][1]で確認できます。


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{% /tab %}}

{{% tab "Promise" %}}

Promise は `tracer.trace()` でトレースできます。これにより、返された Promise が解決したときに自動的にスパンが終了し、拒否エラーが自動的にキャプチャされます。

```javascript
app.get('/make-sandwich', (req, res) => {
  return tracer.trace('sandwich.make', () => {
    return tracer.trace('get_ingredients', () => getIngredients())
      .then(() => {
        return tracer.trace('assemble_sandwich', () => {
          return assembleSandwich(ingredients)
        })
      })
  }).then(sandwich => res.end(sandwich))
})
```

`tracer.trace()` の API 詳細は[こちら][1]で確認できます。


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{% /tab %}}

{{% tab "Async/await" %}}

Async/await は `tracer.trace()` でトレースできます。これにより、返された Promise が解決したときに自動的にスパンが終了し、拒否エラーが自動的にキャプチャされます。

```javascript
app.get('/make-sandwich', async (req, res) => {
  const sandwich = await tracer.trace('sandwich.make', async () => {
    const ingredients = await tracer.trace('get_ingredients', () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', () => {
      return assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

`tracer.trace()` の API 詳細は[こちら][1]で確認できます。


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{% /tab %}}

{{% tab "ラッパー" %}}

コードを変更せずに既存の関数をラップすることもできます。これは、コードを制御しない関数をトレースするのに役立ちます。これは、最後の引数がコールバックの代わりにラップする関数であることを除いて、 `tracer.trace()` と同じ引数を取る `tracer.wrap()` で実行できます。

```javascript
app.get('/make-sandwich', (req, res) => {
  getIngredients = tracer.wrap('get_ingredients', getIngredients)
  assembleSandwich = tracer.wrap('assemble_sandwich', assembleSandwich)

  const sandwich = tracer.trace('sandwich.make', () => {
    const ingredients = getIngredients()

    return assembleSandwich(ingredients))
  })

  res.end(sandwich)
})
```

`tracer.trace()` の API 詳細は[こちら][1]で確認できます


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#wrap
{{% /tab %}}

{{% tab "手動" %}}

他のトレーシング方法として、スパンの開始と終了を可能にする手動 API があります。これに必要なのは、

```javascript
app.get('/make-sandwich', (req, res) => {
  const sandwichSpan = tracer.startSpan('sandwich.make')

  const ingredientsSpan = tracer.startSpan('get_ingredients')
  const ingredients = getIngredients()
  ingredientsSpan.finish()

  const assembleSpan = tracer.startSpan('assemble_sandwich')
  const assemble = assembleSandwich()
  assembleSpan.finish()

  sandwichSpan.finish()

  res.end(sandwich)
})
```

`tracer.startSpan()` の API 詳細は[こちら][1]で確認できます。


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#startspan
{{% /tab %}}
{{< /tabs >}}

## アクティブなスパンへのアクセス

内蔵のインスツルメンテーションおよびカスタムインスツルメンテーションは、有意義なオペレーションに関連するスパンを作成します。アクティブなスパンにアクセスして、これらの有意義なデータを含めるよう設定できます。スコープマネージャーの `activate` メソッドを使用して、新しいスコープにアクティブなスパンを設定することもできます。

```javascript
tracer.trace('sandwich.make', () => {
  const span = tracer.scope().active() // the sandwich.make span
  const child = tracer.startSpan('get_ingredients')

  tracer.scope().activate(child, () => {
    const span = tracer.scope().active() // the get_ingredients span
  })
})
```

`Scope` の API 詳細は[こちら][3]で確認できます。

## タグの追加

{{< tabs >}}
{{% tab "ローカル" %}}

タグはスパンで `setTag` または `addTags` メソッドを使用してスパンに追加できます。サポートされている値のタイプは、文字列、数値、オブジェクトです。

```javascript
// foo:bar タグを追加します
span.setTag('foo', 'bar')

// user_id:5 タグを追加します
span.setTag('user_id', 5)

// obj.first:foo および obj.second:bar タグを追加します
span.setTag('obj', { first: 'foo', second: 'bar' })

// foo:bar および baz:qux タグを追加します
span.addTags({
  foo: 'bar',
  baz: 'qux'
})
```

{{% /tab %}}

{{% tab "グローバル" %}}

タグは、トレーサーで直接構成することにより、すべてのスパンに追加できます。これは、カンマ区切りの `DD_TAGS` 環境変数を使用するか、トレーサーの初期化で `tags` オプションを使用して実行できます。

```javascript
// DD_TAGS=foo:bar,baz:qux と同等
tracer.init({
  tags: {
    foo: 'bar',
    baz: 'qux'
  }
})

// このスパンには上記のタグがあります
const span = tracer.startSpan()
```

{{% /tab %}}

{{% tab "コンポーネント" %}}

一部のインテグレーションでは、スパンフックをサポートしています。スパンフックを使用すると、スパンが完了する直前に更新できます。これは、タグを変更したり、コードからアクセスできないスパンにタグを追加する場合に役立ちます。

```javascript
// tracer.init() の直後のエントリポイントの上部
tracer.use('express', {
  // リクエストスパンが終了する直前にフックが実行されます
  hooks: {
    request: (span, req, res) => {
      span.setTag('customer.id', req.query.customer_id)
    }
  }
})
```

個々のプラグインの API 詳細は[こちら][1]で確認できます。


[1]: https://datadoghq.dev/dd-trace-js/modules/plugins.html
{{% /tab %}}

{{% tab "エラー" %}}

エラーは、エラーオブジェクトをサポートする特別な `error` タグを使用してスパンに追加できます。これは、3 つの異なるタグ (`error.type`、`error.msg`、`error.stack`) にエラーを分割します。

```javascript
try {
  getIngredients()
} catch (e) {
  span.setTag('error', e)
}

```

`tracer.trace()` または `tracer.wrap()` を使用している場合、これはエラーがスローされたときに自動的に行われます。

{{% /tab %}}
{{< /tabs >}}

## リクエストのフィルタリング

ほとんどのアプリケーションでは、リクエストの一部をインスツルメントするべきではありません。一般的なケースは、ヘルスチェックです。これらは、`http` プラグインで `blacklist` または `whitelist` オプションを使用して無視できます。

```javascript
// tracer.init() の直後のエントリポイントの上部
tracer.use('http', {
  blacklist: ['/health', '/ping']
})
```

さらに、トレースは、Datadog にレポートされるトレースから Datadog Agent で破棄することもできます。この設定およびその他のセキュリティ/微調整に関する Agent コンフィギュレーションについては[セキュリティ][4]ページを参照してください。

## OpenTracing

OpenTracing のサポートは `dd-trace` パッケージに含まれています。

```javascript
const tracer = require('dd-trace').init()
const opentracing = require('opentracing')

opentracing.initGlobalTracer(tracer)
```

トレーサーが、その他の OpenTracing アプリケーションと同様に使用できるようになりました。

以下のタグを使用して、Datadog 固有のオプションをオーバーライドできます。

* `service.name`: スパンに使用されるサービス名。これを指定しなかった場合、トレーサーからのサービス名が使用されます。
* `resource.name`: スパンに使用されるリソース名。これを指定しなかった場合、オペレーション名が使用されます。
* `span.type`: スパンに使用されるスパンタイプ。指定しなかった場合、`custom` にフォールバックします。

OpenTracing NodeJS の使用については、[opentracing.io][5] を参照してください。

## OpenTelemetry

OpenTelemetry のサポートは、`opentelemetry-exporter-datadog` パッケージを使用してトレースを OpenTelemetry から Datadog にエクスポートすることで利用できます。

{{< alert >}}
現在、この機能はベータ版です。期待どおりに機能しない場合は、<a href="https://docs.datadoghq.com/help/">サポートにお問い合わせください。</a>。
{{< /alert >}}

### インストール

インストールするには

```
npm install --save opentelemetry-exporter-datadog
```

### 使用方法

アプリケーションに Datadog プロセッサーとエクスポーターをインストールし、オプションを構成します。次に、OpenTelemetry インターフェイスを使用して、トレースおよびその他の情報を生成します。

```javascript
const opentelemetry = require('@opentelemetry/api');
const { BasicTracerProvider } = require('@opentelemetry/tracing');
const { DatadogSpanProcessor, DatadogExporter, DatadogProbabilitySampler, DatadogPropagator } = require('opentelemetry-exporter-datadog');

const provider = new BasicTracerProvider();

const exporterOptions = {
  serviceName: 'my-service', // オプション
  agentUrl: 'http://localhost:8126', // オプション
  tags: 'example_key:example_value,example_key_two:value_two', // オプション
  env: 'production', // オプション
  version: '1.0' // オプション
};

const exporter = new DatadogExporter(exporterOptions);
const processor = new DatadogSpanProcessor(exporter);

provider.addSpanProcessor(processor);

// 次に、分散型トレーシング用の Datadog Propagator を追加します 
provider.register({
  propagator: new DatadogPropagator()
});

const tracer = opentelemetry.trace.getTracer('example-basic-tracer-node');

// スパンを作成します。スパンを閉じる必要があります。
const parentSpan = tracer.startSpan('main');

doWork(parentSpan);

setTimeout(() => {
  parentSpan.end();

  setTimeout(() => {
    processor.shutdown()
  },4000);
}, 5000);

function doWork(parent) {
  const span = tracer.startSpan('doWork', {
    parent,
  });

  // ランダムな作業をシミュレートします。
  for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
    // empty
  }
  // 属性をスパンに設定します。
  span.setAttribute('key', 'value');
  setTimeout( () => {
    span.end();
  }, 1000)
}
```

### 構成オプション

Datadog Agent の URL とスパンタグの値は、環境と Agent の場所次第で必要または希望に応じて構成できます。

#### Datadog Agent URL

デフォルトでは、OpenTelemetry Datadog Exporter はトレースを `http://localhost:8126` に送信します。次の環境変数を構成して、トレースを別の URL に送信します。

- `DD_TRACE_AGENT_URL`: Datadog Agent がトレースをリッスンする `<host>:<port>`。例: `agent-host:8126`

これらの値は、トレースエクスポーターレベルでオーバーライドできます。

```js
// Datadog トレース Agent の URL を構成します
new DatadogExporter({agentUrl: 'http://dd-agent:8126'});
```

#### タグ付け

次の環境変数を設定して、Datadog がエクスポートしたトレースに自動的にタグを付けるようにアプリケーションを構成します。

- `DD_ENV`: アプリケーション環境。例: `production`、`staging`
- `DD_SERVICE`: アプリケーションのデフォルトのサービス名。例: `billing-api`
- `DD_VERSION`: アプリケーションのバージョン。例: `2.5`、`202003181415`、`1.3-alpha`
- `DD_TAGS`: カンマで区切られた値ペアのカスタムタグ。例: `layer:api,team:intake`
- `DD_ENV`、`DD_SERVICE`、または `DD_VERSION` が設定されている場合、`DD_TAGS` で定義されている対応する `env`、`service`、または `version` タグをオーバーライドします。
- `DD_ENV`、`DD_SERVICE`、`DD_VERSION` が設定されて_いない_場合、`DD_TAGS` の対応するタグを使用して、環境、サービス、バージョンを構成できます。

タグ値は、トレースエクスポーターレベルでもオーバーライドできます。これにより、アプリケーションごとに値を設定できるため、同じホスト上の異なる環境について複数のアプリケーションレポートを作成できます。

```javascript

new DatadogExporter({
  serviceName: 'my-service', // オプション
  agentUrl: 'http://localhost:8126', // オプション
  tags: 'example_key:example_value,example_key_two:value_two', // オプション
  env: 'production', // オプション
  version: '1.1' // オプション
});
```

個々のスパンに直接設定できるタグは、アプリケーションレベルで定義された競合するタグに優先します。

### OpenTelemetry リンク

- OpenTelemetry NodeJS Datadog Exporter の使用法については、[npm][6] または [github][7] を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/nodejs/
[2]: /ja/tracing/visualization/#spans
[3]: https://datadoghq.dev/dd-trace-js/interfaces/scope.html
[4]: /ja/tracing/security
[5]: https://opentracing.io/guides/javascript/
[6]: https://www.npmjs.com/package/opentelemetry-exporter-datadog
[7]: https://github.com/Datadog/dd-opentelemetry-exporter-js