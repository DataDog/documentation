---
aliases:
- /ja/tracing/opentracing/nodejs
- /ja/tracing/manual_instrumentation/nodejs
- /ja/tracing/custom_instrumentation/nodejs
- /ja/tracing/setup_overview/custom_instrumentation/nodejs
code_lang: nodejs
code_lang_weight: 40
description: Nodejs アプリケーションを手動でインスツルメントしてカスタムトレースを Datadog に送信します。
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: ドキュメント
  text: ログとトレースの接続
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
kind: documentation
title: NodeJS カスタムインスツルメンテーション
type: multi-code-lang
---

<div class="alert alert-info">
自動インスツルメンテーションとセットアップの手順をまだ読んでいない場合は、<a href="https://docs.datadoghq.com/tracing/setup/nodejs/">NodeJS セットアップ手順</a>からご覧ください。
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

`Scope` の API 詳細は[こちら][1]で確認できます。

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


[1]: https://datadoghq.dev/dd-trace-js/interfaces/scope.html
{{< /tabs >}}

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

{{< /tabs >}}

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
{{< /tabs >}}

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

`tracer.trace()` の API 詳細は[こちら][1]で確認できます。


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{< /tabs >}}

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

`tracer.trace()` の API 詳細は[こちら][1]で確認できます。


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{< /tabs >}}

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

`tracer.trace()` の API 詳細は[こちら][1]で確認できます。


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{< /tabs >}}

{{% tab "ラッパー" %}}

コードを変更せずに既存の関数をラップすることもできます。これは、コードを制御しない関数をトレースするのに役立ちます。これは、最後の引数がコールバックの代わりにラップする関数であることを除いて、 `tracer.trace()` と同じ引数を取る `tracer.wrap()` で実行できます。

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

`tracer.trace()` の API 詳細は[こちら][1]で確認できます。


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#wrap
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

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/nodejs/
[2]: /ja/tracing/glossary/#spans
[3]: /ja/tracing/security
[4]: /ja/tracing/guide/ignoring_apm_resources/