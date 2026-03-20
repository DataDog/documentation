---
aliases:
- /ja/tracing/serverless_functions
- /ja/tracing/setup_overview/serverless_functions/
- /ja/serverless/troubleshooting/serverless_apm_metrics/
- /ja/serverless/distributed_tracing/serverless_trace_merging
- /ja/serverless/distributed_tracing/serverless_trace_propagation
- /ja/serverless/distributed_tracing
further_reading:
- link: /tracing/
  tag: ドキュメント
  text: Datadog APM の確認
- link: /tracing/trace_search_and_analytics/#live-search-for-15-minutes
  tag: ドキュメント
  text: Live Search
- link: https://www.datadoghq.com/blog/aws-lambda-tracing-go-java-functions/
  tag: ブログ
  text: Go および Java Lambda 関数のリアルタイム分散型トレーシング
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: ブログ
  text: サーバーレスビューでサーバーレススタックを監視する
- link: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
  tag: ブログ
  text: AWS フルマネージドサービス向け Datadog サーバーレスモニタリング
- link: https://www.datadoghq.com/blog/dotnet-lambda-functions-distributed-tracing/
  tag: ブログ
  text: .NET Lambda 関数のリアルタイム分散型トレーシング
title: AWS Lambda サーバーレスアプリケーションによる分散型トレーシング
---

{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="トレースサーバーレス関数" style="width:100%;">}}

Datadog では、サーバーレストレースをメトリクスに接続することで、アプリケーションのパフォーマンスに関する豊富な情報を提供します。これにより、サーバーレスアプリケーションの性質である分散型の環境でもパフォーマンスの問題を的確にトラブルシューティングできます。

Datadog Python、Node.js、Ruby、Go、Java、.NET トレーシングライブラリは、AWS Lambda の分散型トレーシングをサポートしています。

## サーバーレス アプリケーションからトレースを送信する

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Datadog で AWS Lambda をトレースするためのアーキテクチャ図" >}}

Datadog Python、Node.js、Ruby、Go、Java、.NET のトレーシングライブラリは、AWS Lambda の分散型トレーシングをサポートしています。トレーサーは[インストール手順][5]を使ってインストールできます。すでに拡張機能をインストールしている場合は、環境変数 `DD_TRACE_ENABLED` が `true` に設定されていることを確認してください。

### ランタイムの推奨事項

{{< partial name="serverless/serverless-apm-recommendations.html" >}}

#### Python と Node.js

Python および Node.js をサポートする Datadog Lambda ライブラリとトレースライブラリ:
- Lambda ログおよびトレースとトレース ID およびタグ挿入との自動相関。
- Serverless Framework、AWS SAM、AWS CDK インテグレーションを使用したコード変更なしのインストール。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストをトレース。
- AWS SDK で実行された連続 Lambda 呼び出しのトレース。
- コールド スタートのトレーシング
- AWS Managed Services を利用して非同期 Lambda 呼び出しをトレースする
  - API Gateway
  - SQS
  - SNS
  - SNS と SQS の直接インテグレーション
  - Kinesis
  - EventBridge
  - DynamoDB
  - S3
  - Step Functions
- すぐに使用できる数十の追加の [Python][3] および [Node.js][4] ライブラリをトレース。

Python と Node.js のサーバーレス アプリケーションでは、Datadog は [Datadog のトレーシング ライブラリをインストール][5] することを推奨します。

*上記にリストされていないサーバーレスリソースのトレースをご希望の場合は、[機能リクエストを開いてください][7]。*

#### Ruby

Ruby サポート用の Datadog Lambda ライブラリとトレースライブラリ:
- Lambda ログおよびトレースとトレース ID およびタグ挿入との自動相関。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストをトレース。
- すぐに使用できる数十の追加の [Ruby][8] ライブラリをトレース。

Datadog の [トレーシング ライブラリ][5] を使用すると、サーバーレス関数をトレースできます。

*上記にリストされていないサーバーレスリソースのトレースをご希望の場合は、[機能リクエストを開いてください][7]。*

#### Go

Go サポート用の Datadog Lambda ライブラリとトレースライブラリ:
- Lambda ログおよびトレースとトレース ID およびタグ挿入との手動相関。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストをトレース。
- すぐに使用できる数十の追加 [Go][9] ライブラリをトレース。

Go のサーバーレス アプリケーションでは、Datadog は [Datadog のトレーシング ライブラリのインストール][5] を推奨します。

*上記にリストされていないサーバーレスリソースのトレースをご希望の場合は、[機能リクエストを開いてください][7]。*

#### Java

Java サポート用の Datadog Lambda ライブラリとトレースライブラリ:
- Lambda ログおよびトレースとトレース ID およびタグ挿入との相関。詳細は、[Java ログとトレースの接続][10]を参照してください。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストをトレース。
- すぐに使用できる数十の追加 [Java][11] ライブラリをトレース。

Java のサーバーレス アプリケーションでは、Datadog は [Datadog のトレーシング ライブラリのインストール][5] を推奨します。

*Java Lambda 関数用の Datadog のトレースライブラリに関してフィードバックがございましたら、[Datadog Slack コミュニティ][13]の [#serverless][12] チャネルで行われているディスカッションをご確認ください。*

#### .NET

.NET 用のトレースライブラリは以下に対応しています。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストをトレース。
- すぐに使用できる数十の追加 [.NET][14] ライブラリをトレース。

.NET のサーバーレス アプリケーションでは、Datadog は [Datadog のトレーシング ライブラリのインストール][5] を推奨します。

[.NET Azure サーバーレスアプリケーションを介したトレース][15]の詳細をご覧ください。

## スパンの自動リンク
{{< img src="serverless/lambda/tracing/autolink.png" alt="Datadog での DynamoDB トレース。上部に 'This trace is linked to other traces' と表示されている。Span Links タブが開き、別の DynamoDB トレースへのクリック可能なリンクを表示している。" style="width:100%;" >}}

非同期リクエストの一部がトレース コンテキストを伝播できない場合、Datadog はリンクされたスパンを自動的に検出します。例えば、リクエストが [S3 変更イベント][28] や [DynamoDB Streams][29] をトリガーしたときに発生することがあります。自動リンクされたスパンは [Span Links タブ][30] に表示され、**Backward** または **Forward** のいずれかとして示されます。

_Backward_: 表示中のトレースによって発生したリンク スパンです。

_Forward_: リンク スパンが表示中のトレースを引き起こしました。


<div class="alert alert-info">サンプリングや <a href="/tracing/trace_pipeline/trace_retention/">トレースの保持フィルター</a> が自動リンクに影響することがあります。自動リンクされたスパンを確認できる可能性を高めるには、サンプル レートを上げるか、保持フィルターを調整してください。</div>

### 対応テクノロジー

スパンの自動リンクが利用可能な対象:
- Python の AWS Lambda 関数で、[`datadog-lambda-python`][33] レイヤー v101+ を使用してインスツルメントされたもの
- Python アプリケーションで、[`dd-trace-py`][31] v2.16+ を使用してインスツルメントされたもの
- Node.js の AWS Lambda 関数で、[`datadog-lambda-js`][34] レイヤー 118+ を使用してインスツルメントされたもの
- Node.js アプリケーションで、[`dd-trace-js`][32] v4.53.0+ または v5.29.0+ を使用してインスツルメントされたもの

### DynamoDB Change Streams の自動リンク

[DynamoDB Change Streams][29] に対して、スパンの自動リンクがサポートする操作は次のとおり:

- `PutItem`
- `UpdateItem`
- `DeleteItem`
- `BatchWriteItem`
- `TransactWriteItems`

<div class="alert alert-info"><code>PutItem</code> 操作には追加の設定が必要です。詳細は <a href="/serverless/aws_lambda/installation/python/#span-auto-linking">Python サーバーレス アプリケーションのインスツルメント</a> または <a href="/serverless/aws_lambda/installation/nodejs/#span-auto-linking">Node.js サーバーレス アプリケーションのインスツルメント</a> を参照してください。</div>

### S3 Change Notifications の自動リンク

[S3 Change Notifications][28] に対して、スパンの自動リンクがサポートする操作は次のとおり:

- `PutObject`
- `CompleteMultipartUpload`
- `CopyObject`


## ハイブリッド環境

Datadog のトレーシングライブラリ (`dd-trace`) を Lambda 関数とホストの両方にインストールした場合は、AWS Lambda、コンテナ、オンプレミスホスト、マネージドサービスなど、インフラストラクチャーの境界を越えてリクエストの全体像がトレースに自動的に表示されます。

Datadog Agent でホストに `dd-trace` がインストールされていて、サーバーレス関数が AWS X-Ray でトレースされる場合、インフラストラクチャー全体で接続された単一のトレースを表示するには、トレースのマージが必要です。`dd-trace` と AWS X-Ray からのトレースのマージの詳細については、[サーバーレストレースのマージ][6]のドキュメントをご覧ください。

Datadog の [AWS X-Ray インテグレーション][2]は、Lambda 関数のトレースのみを提供します。コンテナまたはホストベースの環境でのトレースの詳細については、[Datadog APM のドキュメント][16]をご覧ください。

## Lambda 関数のプロファイリング

Datadog の [Continuous Profiler][27] は、Python 向けにプレビューとして提供されています。バージョン 4.62.0 および レイヤー バージョン 62 以上で利用可能です。このオプション機能は、環境変数 `DD_PROFILING_ENABLED` を `true` に設定すると有効になります。

Continuous Profiler は、定期的にスレッドを起こして、実行中のすべての Python コードの CPU と ヒープのスナップショットを取得することで機能します。これには、プロファイラ自身が含まれる場合があります。プロファイラ自身を無視させたい場合は、`DD_PROFILING_IGNORE_PROFILER` を `true` に設定してください。

## トレースマージ

### ユースケース

Datadog は Datadog APM トレースライブラリ (`dd-trace`) のみの使用を推奨していますが、高度な状況ではトレースマージを使って Datadog トレースと AWS X-Ray を組み合わせて使用することもできます。トレースマージは、Node.js と Python の AWS Lambda 関数で利用可能です。どのトレーシングライブラリを使用するかわからない場合は、[トレーシングライブラリの選択][17]をお読みください。

`dd-trace` と AWS X-Ray トレーシングライブラリの両方をインスツルメントするのは、主に 2 つの理由からです。
- AWS サーバーレス環境では、`dd-trace` ですでに Lambda 関数をトレースしているため、AppSync や Step Functions など、AWS マネージドサービスの AWS X-Ray アクティブトレースを要求して `dd-trace` および AWS X-Ray スパンを単一トレースで視覚化します。
- Lambda 関数とホストの両方を使用するハイブリッド環境では、`dd-trace` がホストをインスツルメントし、AWS X-Ray が Lambda 関数をインスツルメントするため、Lambda 関数およびホスト全体のトランザクションの接続済みトレースを視覚化します。

**注:** この場合、使用料が高額になる可能性があります。X-Ray スパンは、トレースのマージ後 2～5 分間は引き続き使用可能です。Datadog では、通常は、単一のトレーシングライブラリの使用をおすすめしています。[トレーシングライブラリの選択方法][17]についてご覧ください。

上記のユースケースをセットアップする手順は以下のとおりです。

- [サーバーレスファースト環境でのトレースマージ](#trace-merging-in-an-AWS-serverless-environment)
- [AWS Lambda とホスト間でのトレースマージ](#tracing-across-aws-lambda-and-hosts)

### AWS サーバーレス環境におけるトレースのマージ

AWS X-Ray は、バックエンド AWS サービス (AWS X-Ray アクティブトレース) とクライアントライブラリ一式の両方を提供します。[Lambda コンソールでバックエンド AWS サービスのみを有効にすると][18]、AWS Lambda 関数に `Initialization` と `Invocation` スパンが与えられます。API Gateway および Step Function コンソールから、AWS X-Ray アクティブトレースを有効にすることも可能です。

AWS X-Ray SDK および Datadog APM クライアントライブラリ (`dd-trace`) は、いずれも関数に直接アクセスしてダウンストリームのコールのメタデータとスパンを追加します。`dd-trace` を使用してハンドラーレベルでトレースする場合は、以下のようなセットアップになります。

1. AWS Lambda コンソールおよび [Datadog 内の AWS X-Ray インテグレーション][19]で、Lambda 関数の [AWS X-Ray アクティブトレース][18]を有効にしてあります。 
2. [使用している Lambda ランタイム用のインストール手順][5]に従い、Datadog APM (`dd-trace`) を使用して Lambda 関数をインスツルメントしてあります。
3. `dd-trace` により、サードパーティライブラリにパッチが自動的に適用されているため、AWS X-Ray クライアントライブラリをインストールする必要はありません。
4. Lambda 関数で `DD_MERGE_XRAY_TRACES` 環境を `true` に設定し、X-Ray と `dd-trace` トレースをマージします (Ruby では `DD_MERGE_DATADOG_XRAY_TRACES`)。

### AWS Lambda とホスト全体のトレース

#### Datadog のトレーシング ライブラリによるコンテキストの伝播
Datadog のトレーシングライブラリ (`dd-trace`) を Lambda 関数とホストの両方にインストールした場合は、AWS Lambda、コンテナ、オンプレミスホスト、マネージドサービスなど、インフラストラクチャーの境界を越えてリクエストの全体像がトレースに自動的に表示されます。

#### X-Ray インテグレーションによるコンテキストの伝播
Datadog Agent でホストに `dd-trace` がインストールされていて、Node.js または Python サーバーレス関数が AWS X-Ray でトレースされる場合、セットアップは以下のようになります。

1. Lambda 関数のトレース用に [AWS X-Ray インテグレーション][18]がインストールされていて、AWS X-Ray アクティブトレースと X-Ray クライアントライブラリのインストールが可能です。
2. Lambda ランタイム用の [Datadog Lambda Library][5] をインストールしており、環境変数 `DD_TRACE_ENABLED` が `true` に設定されています。
3. ホストおよびコンテナベースのインフラストラクチャーで [Datadog APM][20] が構成されています。

そして、X-Ray と Datadog APM トレースを同じフレームグラフに表示するには、すべてのサービスに同じ `env` タグが必要です。

**注**: 分散型トレーシングはホストまたはコンテナベースアプリケーションにおけるすべてのランタイムでサポートされています。ホストおよび Lambda 関数が同じランタイムにある必要はありません。

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="ホストから Lambda 関数へのリクエストのトレース" >}}

## トレース伝搬
{{< img src="serverless/lambda-non-http-trace.png" alt="サーバーレスの分散型非 HTTP トレース" style="width:100%;" >}}

### 必須セットアップ

Lambda 関数を非同期でトリガーする Node や Python のサーバーレスアプリケーションで、1 つのつながったトレースを見るには、追加のインスツルメンテーションが必要になることがあります。Datadog でサーバーレスアプリケーションの監視を始めたばかりであれば、[こちらの主なインストール手順に従い][21]、[トレースライブラリの選択に関するこのページをお読みください][22]。[Datadog Lambda ライブラリ][23]を使って Lambda 関数から Datadog にトレースを送るようになったら、以下のようなケースではこれらの手順で 2 つの Lambda 関数間のトレースを繋ぐと良いかもしれません。
- Step Functions で Lambda 関数をトリガーする
- MQTT など HTTP 以外のプロトコルで Lambda 関数を呼び出す

多くの AWS Managed サービス ([こちら][24]を参照) のトレースは、最初からサポートされており、このページで説明されている手順を実行する必要はありません。

トレースを送信するリソース間でトレースコンテキストを正常に接続するために、以下のことが必要です。
- Datadog のトレースコンテキストを発信イベントに含める。発信イベントは、`dd-trace` をインストールしたホストや Lambda 関数から発生させることができます。
- コンシューマー Lambda 関数内のトレースコンテキストを抽出する。

### トレースコンテキストの受け渡し

以下のサンプルコードでは、HTTP ヘッダーをサポートしないサービスや、Datadog が Node や Python で[ネイティブ][24]に対応していないマネージドサービスに対して、発信ペイロードでトレースコンテキストを渡す方法について説明しています。

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

#### ホストから

Lambda 関数からトレースコンテキストを渡していない場合、`getTraceHeaders` と `get_dd_trace_context` ヘルパー関数の代わりに以下のコードテンプレートを使用すると、現在のスパンコンテキストを取得することができます。すべてのランタイムでこれを行う方法については、[ここ][25]で説明しています。

```js
const tracer = require("dd-trace");

exports.handler = async event => {
  const span = tracer.scope().active();
  const _datadog = {}
  tracer.inject(span, 'text_map', _datadog)

  // ...
```

### トレースコンテキストの抽出

上記のトレースコンテキストをコンシューマー Lambda 関数から抽出するには、Lambda 関数ハンドラーの実行前にトレースコンテキストをキャプチャするエクストラクター関数を定義する必要があります。これを行うには、エクストラクター関数の場所を指すように `DD_TRACE_EXTRACTOR` 環境変数を構成してください。フォーマットは `<FILE NAME>.<FUNCTION NAME>` です。例えば、`json` エクストラクターが `extractors.js` ファイルにある場合は、`extractors.json` となります。Datadog は、エクストラクターを複数の Lambda 関数で再利用できるように、エクストラクターメソッドを 1 つのファイルにまとめて配置することを推奨しています。これらのエクストラクターは、どんなユースケースにも合うように完全にカスタマイズ可能です。

**注**:
- TypeScript や webpack のようなバンドラーを使用している場合、エクストラクターが定義されている Node.js モジュールを `import` または `require` する必要があります。これにより、モジュールがコンパイルされ、Lambda のデプロイメントパッケージにバンドルされるようになります。
- Node.js の Lambda 関数が `arm64` 上で動作する場合、環境変数 `DD_TRACE_EXTRACTOR` を使用する代わりに、[関数コード内でエクストラクターを定義する][26]必要があります。

#### サンプルエクストラクター

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

## X-Ray インテグレーションで Datadog にトレースを送信する

すでに X-Ray でサーバーレス アプリケーションをトレースしており、今後も X-Ray を使用したい場合は、[AWS X-Ray インテグレーションをインストール][2] して、X-Ray から Datadog にトレースを送信できます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/distributed_tracing#distributed-tracing-with-datadog-apm
[2]: /ja/integrations/amazon_xray/#overview
[3]: /ja/tracing/trace_collection/compatibility/python
[4]: /ja/tracing/trace_collection/compatibility/nodejs
[5]: /ja/serverless/installation/
[6]: /ja/serverless/distributed_tracing/#trace-merging
[7]: https://docs.datadoghq.com/ja/help/
[8]: /ja/tracing/trace_collection/compatibility/ruby
[9]: /ja/tracing/trace_collection/compatibility/go
[10]: /ja/tracing/other_telemetry/connect_logs_and_traces/java/
[11]: /ja/tracing/trace_collection/compatibility/java
[12]: https://datadoghq.slack.com/archives/CFDPB83M4
[13]: https://chat.datadoghq.com/
[14]: /ja/tracing/trace_collection/compatibility/dotnet-core
[15]: /ja/serverless/azure_app_services
[16]: /ja/tracing/trace_collection/
[17]: /ja/serverless/distributed_tracing/
[18]: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
[19]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[20]: /ja/tracing/send_traces/
[21]: /ja/serverless/installation
[22]: /ja/serverless/distributed_tracing
[23]: /ja/serverless/datadog_lambda_library
[24]: /ja/serverless/distributed_tracing#runtime-recommendations
[25]: /ja/tracing/trace_collection/custom_instrumentation/
[26]: /ja/serverless/guide/handler_wrapper/
[27]: /ja/profiler/
[28]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html
[29]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[30]: https://docs.datadoghq.com/ja/tracing/trace_explorer/trace_view/?tab=spanlinksbeta
[31]: https://github.com/DataDog/dd-trace-py/
[32]: https://github.com/DataDog/dd-trace-js/
[33]: https://github.com/DataDog/datadog-lambda-python
[34]: https://github.com/DataDog/datadog-lambda-js