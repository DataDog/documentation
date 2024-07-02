---
title: Node.js Custom Instrumentation using Datadog API
aliases:
    - /tracing/opentracing/nodejs
    - /tracing/manual_instrumentation/nodejs
    - /tracing/custom_instrumentation/nodejs
    - /tracing/setup_overview/custom_instrumentation/nodejs
    - /tracing/trace_collection/custom_instrumentation/nodejs
    - /tracing/trace_collection/custom_instrumentation/dd_libraries/nodejs
description: 'Manually instrument your Node.js application to send custom traces to Datadog.'
code_lang: dd-api
code_lang_weight: 1
type: multi-code-lang
further_reading:
    - link: /tracing/trace_collection/trace_context_propagation/nodejs/
      tag: Documentation
      text: Propagating trace context
    - link: tracing/other_telemetry/connect_logs_and_traces
      tag: Documentation
      text: Connect your Logs and Traces together
    - link: tracing/glossary/
      tag: Documentation
      text: Explore your services, resources, and traces
---

<div class="alert alert-info">
自動インスツルメンテーションとセットアップの手順をまだ読んでいない場合は、<a href="/tracing/setup/nodejs/">Node.js セットアップ手順</a>からご覧ください。
</div>

対応するライブラリインスツルメンテーションを使用しない場合（ [ライブラリの互換性][1]参照）、手動でコードをインスツルメントする必要があります。

`dd-trace` ライブラリの機能性を拡張したり、アプリケーションのインスツルメントをより精確に制御するのに役立つ方法がライブラリにあります。

## `ddtrace` ライブラリの機能性を拡張したり、アプリケーションのインスツルメントをより精確に制御するのに役立つ方法がライブラリにあります。

内蔵のインスツルメンテーションおよびカスタムインスツルメンテーションは、有意義なオペレーションに関連するスパンを作成します。

{{< tabs >}}
{{% tab "ローカル" %}}

タグを追加することで、意味のあるデータを含めるためにアクティブスパンにアクセスすることができます。

```javascript
const span = tracer.scope().active()
```

詳しくは [`Scope` の API 詳細][1]をご覧ください。

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


[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.Scope.html
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

// すべてのスパンにこれらのタグが追加されます
```

{{% /tab %}}

{{% tab "コンポーネント" %}}

一部の Datadog インテグレーションでは、スパンフックをサポートしています。スパンフックを使用すると、スパンが完了する直前に更新できます。これは、タグを変更したり、コードからアクセスできないスパンにタグを追加する場合に役立ちます。

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

詳しくは、[個々のプラグインの API 詳細][1]をご覧ください。


[1]: https://datadoghq.dev/dd-trace-js/modules/export_.plugins.html
{{% /tab %}}

{{% tab "エラー" %}}

エラーは、エラーオブジェクトをサポートする特別な `error` タグを使用してスパンに追加できます。これは、3 つのタグ (`error.type`、`error.msg`、`error.stack`) にエラーを分割します。

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

## スパンの作成

`dd-trace` ライブラリは、`tracer.init()` で[多くのライブラリとフレームワーク][1]に対応する[スパン][2]を自動生成します。しかし、使用しているコードを可視化したい場合はスパンの利用が便利です。

Web リクエスト (例: `/make-sandwich`) 内で、`getIngredients()` や `assembleSandwich()` など、測定に役立つさまざまなオペレーションを行うことができます。

{{< tabs >}}
{{% tab "Synchronous" %}}

Synchronous コードは、`tracer.trace()` でトレースできます。これにより、コールバックが戻ったときに自動的にスパンが終了し、スローされたエラーが自動的にキャプチャされます。

```javascript
app.get('/make-sandwich', (req, res) => {
  const sandwich = tracer.trace('sandwich.make', { resource: 'resource_name' }, () => {
    const ingredients = tracer.trace('get_ingredients', { resource: 'resource_name' }, () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', { resource: 'resource_name' }, () => {
      assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

詳しくは [`tracer.trace()` の API 詳細][1]をご覧ください。


[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.Tracer.html#trace
{{% /tab %}}

{{% tab "Promise" %}}

Promise は `tracer.trace()` でトレースできます。これにより、返された Promise が解決したときに自動的にスパンが終了し、拒否エラーが自動的にキャプチャされます。

```javascript
const getIngredients = () => {
    return new Promise((resolve, reject) => {
        resolve('Salami');
    });
};

app.get('/make-sandwich', (req, res) => {
  return tracer.trace('sandwich.make', { resource: 'resource_name' }, () => {
    return tracer.trace('get_ingredients', { resource: 'resource_name' }, () => getIngredients())
      .then((ingredients) => {
        return tracer.trace('assemble_sandwich', { resource: 'resource_name' }, () => {
          return assembleSandwich(ingredients)
        })
      })
  }).then(sandwich => res.end(sandwich))
})
```

詳しくは [`tracer.trace()` の API 詳細][1]をご覧ください。


[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.Tracer.html#trace
{{% /tab %}}

{{% tab "Async/await" %}}

Async/await は `tracer.trace()` でトレースできます。これにより、返された Promise が解決したときに自動的にスパンが終了し、拒否エラーが自動的にキャプチャされます。

```javascript
app.get('/make-sandwich', async (req, res) => {
  const sandwich = await tracer.trace('sandwich.make', { resource: 'resource_name' }, async () => {
    const ingredients = await tracer.trace('get_ingredients', { resource: 'resource_name' }, () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', { resource: 'resource_name' }, () => {
      return assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

詳しくは [`tracer.trace()` の API 詳細][1]をご覧ください。


[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.Tracer.html#trace
{{% /tab %}}

{{% tab "ラッパー" %}}

コードを変更せずに既存の関数をラップすることができます。これは、コードを自分で制御できない関数をトレースするのに役立ちます。これは、最後の引数がコールバックの代わりにラップする関数であることを除いて、 `tracer.trace()` と同じ引数を取る `tracer.wrap()` で実行できます。

```javascript

// 関数が定義された後
getIngredients = tracer.wrap('get_ingredients', { resource: 'resource_name' }, getIngredients)
assembleSandwich = tracer.wrap('assemble_sandwich', { resource: 'resource_name' }, assembleSandwich)

// ルートが定義されている場所
app.get('/make-sandwich', (req, res) => {

  const sandwich = tracer.trace('sandwich.make', { resource: 'resource_name' }, () => {
    const ingredients = getIngredients()

    return assembleSandwich(ingredients)
  })

  res.end(sandwich)
})
```

詳しくは [`tracer.trace()` の API 詳細][1]をご覧ください。


[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.Tracer.html#wrap
{{% /tab %}}
{{< /tabs >}}

## リクエストのフィルタリング

アプリケーションのいくつかのリクエストはインスツルメンテーションすべきでない場合があります。よくあるケースは、ヘルスチェックやその他の合成トラフィックでしょう。これらのリクエストは `http` プラグインの `blocklist` や `allowlist` オプションで無視することができます。

```javascript
// tracer.init() の直後のエントリポイントの上部
tracer.use('http', {
  blocklist: ['/health', '/ping']
})
```

この構成は、必要に応じてクライアントとサーバーで分割することができます。例:

```javascript
tracer.use('http', {
  server: {
    blocklist: ['/ping']
  }
})
```

さらに、Agent が Datadog に送信しないように、リソース名に基づいてトレースを除外することができます。この他、セキュリティや Agent の細かい設定については、[セキュリティ][3]ページや[不要なリソースの無視][4]で確認することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/nodejs/
[2]: /tracing/glossary/#spans
[3]: /tracing/security
[4]: /tracing/guide/ignoring_apm_resources/
