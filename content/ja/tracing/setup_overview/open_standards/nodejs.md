---
title: NodeJS オープン標準
kind: documentation
description: 'NodeJS のオープン標準'
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 40
---

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

OpenTracing NodeJS の使用については、[opentracing.io][1] を参照してください。

## OpenTelemetry

OpenTelemetry のサポートは、`opentelemetry-exporter-datadog` パッケージを使用してトレースを OpenTelemetry から Datadog にエクスポートすることで利用できます。

<div class="alert alert-warning">
現在、この機能はベータ版です。期待どおりに機能しない場合は、<a href="https://docs.datadoghq.com/help/">サポートにお問い合わせください。</a>。
</div>

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

- OpenTelemetry NodeJS Datadog Exporter の使用法については、[npm][2] または [github][3] を参照してください。


[1]: https://opentracing.io/guides/javascript/
[2]: https://www.npmjs.com/package/opentelemetry-exporter-datadog
[3]: https://github.com/Datadog/dd-opentelemetry-exporter-js
