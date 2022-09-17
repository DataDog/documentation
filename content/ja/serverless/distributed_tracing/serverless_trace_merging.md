---
further_reading:
- link: /tracing/
  tag: ドキュメント
  text: Datadog APM の確認
- link: /tracing/trace_search_and_analytics/#live-search-for-15-minutes
  tag: ドキュメント
  text: Live Search
- link: https://www.datadoghq.com/blog/aws-serverless-tracing-datadog-apm/
  tag: ブログ
  text: Datadog APM で AWS のイベントドリブンサーバーレスアプリケーションをトレースする
kind: documentation
title: サーバーレストレースの伝搬
---


{{< img src="serverless/lambda-non-http-trace.png" alt="サーバーレスの分散型非 HTTP トレース"  style="width:100%;" >}}

## 必須セットアップ

Node や Python のサーバーレスアプリケーションで、Lambda 関数を非同期でトリガーして、1 つのつながったトレースを見るには、追加のインスツルメンテーションが必要になることがあります。Datadog でサーバーレスアプリケーションの監視を始めたばかりであれば、[こちらの主なインストール手順に従い][1]、[トレースライブラリの選択に関するこのページをお読みください][2]。[Datadog Lambda ライブラリ][3]を使って Lambda 関数から Datadog にトレースを送るようになったら、以下のようなケースではこれらの手順で 2 つの Lambda 関数間のトレースを繋ぐと良いかもしれません。
- Step Functions で Lambda 関数をトリガーする
- MQTT など HTTP 以外のプロトコルで Lambda 関数を呼び出す

多くの AWS Managed サービス ([こちら][4]を参照) は、すぐにサポートされ、このページで説明されている手順を実行する必要はありません。

トレースを送信するリソース間でトレースコンテキストを正常に接続するために、以下のことが必要です。
- Datadog のトレースコンテキストを発信イベントに含める。発信イベントは、`dd-trace` をインストールしたホストや Lambda 関数から発生させることができます。
- コンシューマー Lambda 関数内のトレースコンテキストを抽出する。

## トレースコンテキストの受け渡し

以下のコードサンプルでは、HTTP ヘッダーをサポートしないサービスや、Datadog が Node や Python で[ネイティブ][4]に対応していないマネージドサービスに対して、発信ペイロードでトレースコンテキストを渡す方法について説明しています。

{{< tabs >}}
{{% tab "Python" %}}

Python では、`get_dd_trace_context` ヘルパー関数を使用して、Lambda 関数内の発信イベントにトレースコンテキストを渡すことができます。

```py
import json
import boto3
import os

from datadog_lambda.tracing import get_dd_trace_context  # Datadog トレースヘルパー関数

def handler(event, context):
    my_custom_client.sendRequest(
        {
          'myCustom': 'data',
          '_datadog': {
              'DataType': 'String',
              'StringValue': json.dumps(get_dd_trace_context()) # 発信ペイロードにトレースコンテキストを含めます。
          },
        },
    )
```

{{% /tab %}}
{{% tab "Node.js" %}}

Node では、`getTraceHeaders` ヘルパー関数を使用して、Lambda 関数内の発信イベントにトレースコンテキストを渡すことができます。

```js
const { getTraceHeaders } = require("datadog-lambda-js"); // Datadog トレースヘルパー関数

module.exports.handler = async event => {
  const _datadog = getTraceHeaders(); // 現在の Datadog のトレースコンテキストをキャプチャします。

  var payload = JSON.stringify({ data: 'sns', _datadog });
  await myCustomClient.sendRequest(payload)
```

{{% /tab %}}
{{< /tabs >}}

### ホストから

Lambda 関数からトレースコンテキストを渡していない場合、`getTraceHeaders` と `get_dd_trace_context` ヘルパー関数の代わりに以下のコードテンプレートを使用すると、現在のスパンコンテキストを取得することができます。すべてのランタイムでこれを行う方法については、[ここ][5]で説明しています。

```js
const tracer = require("dd-trace");

exports.handler = async event => {
  const span = tracer.scope().active();
  const _datadog = {}
  tracer.inject(span, 'text_map', _datadog)

  // ...
```

## トレースコンテキストの抽出

上記のトレースコンテキストをコンシューマー Lambda 関数から抽出するには、Lambda 関数ハンドラーの実行前にトレースコンテキストをキャプチャするエクストラクター関数を定義する必要があります。これを行うには、エクストラクター関数の場所を指すように `DD_TRACE_EXTRACTOR` 環境変数を構成してください。フォーマットは `<FILE NAME>.<FUNCTION NAME>` です。例えば、`json` エクストラクターが `extractors.js` ファイルにある場合は、`extractors.json` となります。Datadog は、エクストラクターを複数の Lambda 関数で再利用できるように、エクストラクターメソッドを 1 つのファイルにまとめて配置することを推奨しています。これらのエクストラクターは、どんなユースケースにも合うように完全にカスタマイズ可能です。

**注**:
- TypeScript や webpack のようなバンドラーを使用している場合、エクストラクターが定義されている Node.js モジュールを `import` または `require` する必要があります。これにより、モジュールがコンパイルされ、Lambda のデプロイメントパッケージにバンドルされるようになります。
- Node.js の Lambda 関数が `arm64` 上で動作する場合、環境変数 `DD_TRACE_EXTRACTOR` を使用する代わりに、[関数コード内でエクストラクターを定義する][6]必要があります。

### サンプルエクストラクター

以下のコードサンプルでは、サードパーティシステムや標準的な HTTP ヘッダーをサポートしない API にトレースコンテキストを伝達するために使用するエクストラクターのサンプルについて説明します。

{{< tabs >}}
{{% tab "Python" %}}
```py
def extractor(payload):
    trace_headers = json.loads(payload["_datadog"]);
    trace_id = trace_headers["x-datadog-trace-id"];
    parent_id = trace_headers["x-datadog-parent-id"];
    sampling_priority = trace_headers["x-datadog-sampling-priority"];
    return trace_id, parent_id, sampling_priority
```
{{% /tab %}}
{{% tab "Node.js" %}}

```js
exports.json = (payload) => {
    const traceData = payload._datadog
    const traceID = traceData["x-datadog-trace-id"];
    const parentID = traceData["x-datadog-parent-id"];
    const sampledHeader = traceData["x-datadog-sampling-priority"];
    const sampleMode = parseInt(sampledHeader, 10);

    return {
      parentID,
      sampleMode,
      source: 'event',
      traceID,
    };
};
```
{{% /tab %}}
{{% tab "Go" %}}
```go
var exampleSQSExtractor = func(ctx context.Context, ev json.RawMessage) map[string]string {
    eh := events.SQSEvent{}

    headers := map[string]string{}

    if err := json.Unmarshal(ev, &eh); err != nil {
        return headers
    }

    // SQS を batchSize=1 のトリガーとして使用すると、1 つの SQS メッセージが
  // ハンドラーの実行を駆動するため、これをチェックすることが重要です。
    if len(eh.Records) != 1 {
        return headers
    }

    record := eh.Records[0]

    lowercaseHeaders := map[string]string{}
    for k, v := range record.MessageAttributes {
        if v.StringValue != nil {
            lowercaseHeaders[strings.ToLower(k)] = *v.StringValue
        }
    }

    return lowercaseHeaders
}

cfg := &ddlambda.Config{
    TraceContextExtractor: exampleSQSExtractor,
}
ddlambda.WrapFunction(handler, cfg)
```
{{% /tab %}}
{{< /tabs >}}

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/installation
[2]: /ja/serverless/distributed_tracing
[3]: /ja/serverless/datadog_lambda_library
[4]: /ja/serverless/distributed_tracing#runtime-recommendations
[5]: /ja/tracing/trace_collection/custom_instrumentation/
[6]: /ja/serverless/guide/handler_wrapper/