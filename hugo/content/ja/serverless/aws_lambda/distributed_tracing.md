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

Datadog Python、Node.js、Ruby、Go、Java、.NET SDK は、AWS Lambda の分散型トレーシングをサポートしています。

## サーバーレスアプリケーションからトレースを送信する {#send-traces-from-your-serverless-application}

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Datadog を使用した AWS Lambda のトレースのアーキテクチャ図" >}}

Datadog Python、Node.js、Ruby、Go、Java、.NET SDK は、AWS Lambda の分散型トレーシングをサポートしています。SDK は[インストール手順][5]に従ってインストールできます。

### ランタイムの推奨事項 {#runtime-recommendations}

{{< card-grid card_width="30%" image_width="200">}}
  {{< image-card href="/serverless/distributed_tracing#python-and-nodejs" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/serverless/distributed_tracing#python-and-nodejs" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/serverless/distributed_tracing#ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/serverless/distributed_tracing#java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/serverless/distributed_tracing#go" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="/serverless/distributed_tracing#net" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
{{< /card-grid >}}

#### Python と Node.js {#python-and-nodejs}

Python および Node.js 用の Datadog Lambda ライブラリと SDK は、次の機能をサポートしています。
- Lambda ログおよびトレースとトレース ID およびタグ挿入との自動相関。
- Serverless Framework、AWS SAM、AWS CDK インテグレーションを使用したコード変更なしのインストール。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストのトレース。
- AWS SDK で実行された Lambda の連続呼び出しのトレース。
- コールドスタートのトレース
- AWS Managed Services を介した非同期 Lambda 呼び出しのトレース
  - API Gateway
  - SQS
  - SNS
  - SNS と SQS の直接インテグレーション
  - Kinesis
  - EventBridge
  - DynamoDB
  - S3
  - Step Functions
- すぐに使用できる数十の追加の [Python][3] および [Node.js][4] ライブラリのトレース。

Datadog では、Python および Node.js のサーバーレスアプリケーション用に [Datadog SDK をインストール][5]することを推奨します。

*上記にリストされていないサーバーレスリソースのトレースをご希望の場合は、[機能リクエストを開いてください][7]。*

#### Ruby {#ruby}

Ruby 用の Datadog Lambda ライブラリと SDK は、次の機能をサポートしています。
- Lambda ログおよびトレースとトレース ID およびタグ挿入との自動相関。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストのトレース。
- すぐに使用できる数十の追加の [Ruby][8] ライブラリのトレース。

Datadog では [Datadog SDK][5] を使用してサーバーレス関数をトレースできます。

*上記にリストされていないサーバーレスリソースのトレースをご希望の場合は、[機能リクエストを開いてください][7]。*

#### Go {#go}

Go 用の Datadog Lambda ライブラリと SDK は、次の機能をサポートしています。
- Lambda ログおよびトレースとトレース ID およびタグ挿入との手動相関。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストのトレース。
- すぐに使用できる数十の追加の [Go][9] ライブラリのトレース。

Datadog では、Go のサーバーレスアプリケーション用に [Datadog SDK][5] をインストールすることを推奨します。

*上記にリストされていないサーバーレスリソースのトレースをご希望の場合は、[機能リクエストを開いてください][7]。*

#### Java {#java}

Java 用の Datadog Lambda ライブラリと SDK は、次の機能をサポートしています。
- Lambda ログおよびトレースとトレース ID およびタグ挿入との相関。詳細については、[Java ログとトレースの接続][10]を参照してください。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストのトレース。
- すぐに使用できる数十の追加の [Java][11] ライブラリのトレース。

Datadog では、Java のサーバーレスアプリケーション用に [Datadog SDK をインストール][5]することを推奨します。

*Java Lambda 関数用の Datadog SDK に関してフィードバックがございましたら、[Datadog Slack コミュニティ][13]の [#serverless][12] チャネルで行われているディスカッションをご確認ください。*

#### .NET {#net}

.NET 用の SDK は、次の機能をサポートしています。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストのトレース。
- すぐに使用できる数十の追加の [.NET][14] ライブラリのトレース。

Datadog では、.NET のサーバーレスアプリケーション用に [Datadog SDK をインストール][5]することを推奨します。

[.NET Azure サーバーレスアプリケーションを介したトレース][15]の詳細をご覧ください。

## スパンの自動リンク {#span-auto-linking}
{{< img src="serverless/lambda/tracing/autolink.png" alt="Datadog での DynamoDB のトレース。上部に「This trace is linked to other traces」というメッセージが表示されています。Span Links タブが開いており、別の DynamoDB トレースへのクリック可能なリンクが表示されています。" style="width:100%;" >}}

Datadog は、非同期リクエストのセグメントがトレースコンテキストを伝播できない場合に、リンクされたスパンを自動的に検出します。たとえば、リクエストによって [S3 変更イベント][28] や [DynamoDB ストリーム][29] がトリガーされる場合などです。自動リンクされたスパンは [Span Links タブ][30]に表示されます。**Backward** または **Forward** のいずれかとして示されます。

_Backward_: 表示されているトレースによって発生したリンクスパン。

_Forward_: 表示されているトレースを発生させたリンクスパン。


<div class="alert alert-info">サンプリングや<a href="/tracing/trace_pipeline/trace_retention/">トレース保持フィルター</a>が自動リンクに干渉することがあります。自動リンクされたスパンが表示される可能性を高めるには、サンプルレートを上げるか、保持フィルターを調整してください。</div>

### 対応テクノロジー {#supported-technologies}

スパンの自動リンクは、次の対象に利用可能です。
- Python AWS Lambda 関数で、[`datadog-lambda-python`][33] レイヤー v101 以上を使用してインスツルメントされたもの
- Python アプリケーションで、[`dd-trace-py`][31] v2.16 以上を使用してインスツルメントされたもの
- Node.js AWS Lambda 関数で、[`datadog-lambda-js`][34] レイヤー 118 以上を使用してインスツルメントされたもの
- Node.js アプリケーションで、[`dd-trace-js`][32] v4.53.0 以上または v5.29.0 以上を使用してインスツルメントされたもの

### DynamoDB 変更ストリームの自動リンク{#dynamodb-change-stream-auto-linking}

[DynamoDB Change Stream][29] について、スパンの自動リンクは次の操作をサポートしています。

- `PutItem`
- `UpdateItem`
- `DeleteItem`
- `BatchWriteItem`
- `TransactWriteItems`

<div class="alert alert-info"> <code>PutItem</code> 操作には追加の設定が必要です。詳細については、<a href="/serverless/aws_lambda/installation/python/#span-auto-linking">Python サーバーレスアプリケーションのインスツルメンテーション</a>または <a href="/serverless/aws_lambda/installation/nodejs/#span-auto-linking">Node.js サーバーレスアプリケーションのインスツルメンテーション</a>を参照してください。</div>

### S3 Change Notification の自動リンク{#s3-change-notification-auto-linking}

[S3 Change Notification][28]について、スパンの自動リンクは次の操作をサポートしています。

- `PutObject`
- `CompleteMultipartUpload`
- `CopyObject`


## ハイブリッド環境 {#hybrid-environments}

Lambda 関数、ホスト、コンテナ、およびマネージドサービス全体でエンドツーエンドの可視性を得るには、Datadog SDK (`dd-trace`) を Lambda 関数とホストの両方にインストールします。これにより、インフラストラクチャーの境界を越えてリクエストの全体像がトレースに表示されます。

Lambda で、[Datadog Lambda Extension][35] を使用して `dd-trace` をインストールします。これにより、Lambda 実行環境内で Datadog Agent が実行され、最小限のオーバーヘッドでトレースが Datadog に直接送信されます。Lambda Extension は、新規と既存のどちらのサーバーレスアプリケーションにも推奨されるインストール方法です。

コンテナおよびホストベースの環境でのトレースのセットアップについては、[Datadog APM のドキュメント][16]を参照してください。

## Lambda 関数のプロファイリング {#profiling-your-lambda-functions}

Datadog の [Continuous Profiler][27] は、Python 向けにプレビュー版として提供されています。バージョン 4.62.0 およびレイヤーバージョン 62 以上で利用可能です。このオプション機能は、`DD_PROFILING_ENABLED` 環境変数を `true` に設定することで有効になります。

Continuous Profiler は、定期的にスレッドを起こして、実行中のすべての Python コードの CPU と ヒープのスナップショットを取得することで機能します。これにはプロファイラー自身も含まれる場合があります。プロファイラーが自分自身を無視するようにしたい場合は、`DD_PROFILING_IGNORE_PROFILER` を `true` に設定します。

## トレースマージ {#trace-merging}

### ユースケース {#use-cases}

Datadog は Datadog APM トレースライブラリ (`dd-trace`) のみの使用を推奨していますが、高度な状況ではトレースマージを使って Datadog トレースと AWS X-Ray を組み合わせて使用することもできます。トレースマージは、Node.js と Python の AWS Lambda 関数で利用可能です。どの SDK を使用するかわからない場合は、[SDK の選択][17]をお読みください。

<div class="alert alert-info">AWS Step Functions のトレースは、Datadog によってネイティブにサポートされており、X-Ray を必要としません。<a href="/serverless/step_functions/">AWS Step Functions のサーバーレスモニタリング</a>および <a href="/serverless/step_functions/merge-step-functions-lambda/">Step Functions と Lambda トレースのマージ</a>を参照してください。</div>

`dd-trace` と AWS X-Ray トレーシングライブラリの両方をインスツルメントするのは、主に 2 つの理由からです。
- AWS サーバーレス環境では、`dd-trace` ですでに Lambda 関数をトレースしているため、Datadog APM がまだインスツルメントしていない AWS マネージドサービス (AppSync など) の AWS X-Ray アクティブトレースを要求して、`dd-trace` および AWS X-Ray スパンを単一トレースで視覚化します。
- Lambda 関数とホストの両方を使用するハイブリッド環境では、`dd-trace` がホストをインスツルメントし、AWS X-Ray が Lambda 関数をインスツルメントするため、Lambda 関数およびホスト全体のトランザクションの接続済みトレースを視覚化します。

**注:** この場合、使用料が高額になる可能性があります。X-Ray スパンは、トレースのマージ後 2～5 分間は引き続き使用可能です。Datadog では、通常は、単一の SDK の使用をおすすめしています。[SDK の選択方法][17]についてご覧ください。

上記のユースケースをセットアップする手順は以下のとおりです。

- [サーバーレスメイン環境におけるトレースのマージ](#trace-merging-in-an-AWS-serverless-environment)
- [AWS Lambda およびホスト全体でのトレースのマージ](#tracing-across-aws-lambda-and-hosts)

### AWS サーバーレス環境におけるトレースのマージ {#trace-merging-in-an-aws-serverless-environment}

AWS X-Ray は、バックエンド AWS サービス (AWS X-Ray アクティブトレース) とクライアントライブラリ一式の両方を提供します。[Lambda コンソールでバックエンド AWS サービスのみを有効にする][18]と、AWS Lambda 関数に `Initialization` と `Invocation` スパンが与えられます。API Gateway および Step Functions コンソールからも AWS X-Ray アクティブトレースを有効にできます。

AWS X-Ray SDK および Datadog APM クライアントライブラリ (`dd-trace`) は、いずれも関数に直接アクセスしてダウンストリームのコールのメタデータとスパンを追加します。`dd-trace` を使用してハンドラーレベルでトレースする場合は、次のようなセットアップになります。

1. AWS Lambda コンソールおよび [Datadog 内の AWS X-Ray インテグレーション][19]で、Lambda 関数の [AWS X-Ray アクティブトレース][18]を有効にしてあります。
2. [使用している Lambda ランタイム用のインストール手順][5]に従い、Datadog APM (`dd-trace`) を使用して Lambda 関数をインスツルメントしてあります。
3. `dd-trace` により、サードパーティライブラリにパッチが自動的に適用されているため、AWS X-Ray クライアントライブラリをインストールする必要はありません。
4. Lambda 関数で `DD_MERGE_XRAY_TRACES` 環境変数を `true` に設定し、X-Ray と `dd-trace` トレースをマージします (Ruby では `DD_MERGE_DATADOG_XRAY_TRACES`)。

### AWS Lambda とホスト全体のトレース {#tracing-across-aws-lambda-and-hosts}

#### Datadog SDK によるコンテキストの伝播 (推奨) {#context-propagation-with-the-datadog-sdks-recommended}
Datadog SDK (`dd-trace`) を Lambda 関数とホストの両方にインストールします。これにより、AWS Lambda、コンテナ、オンプレミスホスト、マネージドサービスなど、インフラストラクチャーの境界を越えてリクエストの全体像がトレースに自動的に表示されます。

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="ホストから Lambda 関数へのリクエストのトレース" >}}

## トレース伝搬 {#trace-propagation}
{{< img src="serverless/lambda-non-http-trace.png" alt="サーバーレス分散型の HTTP 以外のトレース" style="width:100%;" >}}

### 必須セットアップ {#required-setup}

Lambda 関数を非同期でトリガーする Node や Python のサーバーレスアプリケーションで、1 つのつながったトレースを見るには、追加のインスツルメンテーションが必要になることがあります。Datadog でサーバーレスアプリケーションの監視を始めたばかりであれば、[こちらの主なインストール手順に従い][21]、[SDK の選択に関するこのページをお読みください][22]。[Datadog Lambda Library][23]を使って Lambda 関数から Datadog にトレースを送るようになったら、以下のようなケースではこれらの手順で 2 つの Lambda 関数間のトレースをつなぐとよいかもしれません。
- Step Functions で Lambda 関数をトリガーする
- MQTT など HTTP 以外のプロトコルで Lambda 関数を呼び出す

多くの AWS Managed サービス ([こちら][24]を参照) のトレースは、最初からサポートされており、このページで説明されている手順を実行する必要はありません。

トレースを送信するリソース間でトレースコンテキストを正常に接続するために、次のことが必要です。
- Datadog のトレースコンテキストを発信イベントに含める。発信イベントは、`dd-trace` をインストールしたホストや Lambda 関数から発生させることができます。
- コンシューマー Lambda 関数内のトレースコンテキストを抽出する。

### トレースコンテキストの受け渡し {#passing-trace-context}

以下のサンプルコードでは、HTTP ヘッダーをサポートしないサービスや、Datadog が Node や Python で[ネイティブ][24]に対応していないマネージドサービスに対して、発信ペイロードでトレースコンテキストを渡す方法について説明しています。

{{< tabs >}}
{{% tab "Python" %}}

Python では、`get_dd_trace_context` ヘルパー関数を使用して、Lambda 関数内の発信イベントにトレースコンテキストを渡すことができます。

```py
import json
import boto3
import os

from datadog_lambda.tracing import get_dd_trace_context  # Datadog tracing helper function

def handler(event, context):
    my_custom_client.sendRequest(
        {
          'myCustom': 'data',
          '_datadog': {
              'DataType': 'String',
              'StringValue': json.dumps(get_dd_trace_context()) # Includes trace context in outgoing payload.
          },
        },
    )
```

{{% /tab %}}
{{% tab "Node.js" %}}

Node では、`getTraceHeaders` ヘルパー関数を使用して、Lambda 関数内の発信イベントにトレースコンテキストを渡すことができます。

```js
const { getTraceHeaders } = require("datadog-lambda-js"); // Datadog tracing helper function

module.exports.handler = async event => {
  const _datadog = getTraceHeaders(); // Captures current Datadog trace context.

  var payload = JSON.stringify({ data: 'sns', _datadog });
  await myCustomClient.sendRequest(payload)
```

{{% /tab %}}
{{< /tabs >}}

#### ホストから {#from-hosts}

Lambda 関数からトレースコンテキストを渡していない場合、`getTraceHeaders` と `get_dd_trace_context` ヘルパー関数の代わりに次のコードテンプレートを使用すると、現在のスパンコンテキストを取得することができます。すべてのランタイムでこれを行う方法については、[ここ][25]で説明しています。

```js
const tracer = require("dd-trace");

exports.handler = async event => {
  const span = tracer.scope().active();
  const _datadog = {}
  tracer.inject(span, 'text_map', _datadog)

  // ...
```

### トレースコンテキストの抽出 {#extracting-trace-context}

上記のトレースコンテキストをコンシューマー Lambda 関数から抽出するには、Lambda 関数ハンドラーの実行前にトレースコンテキストをキャプチャするエクストラクター関数を定義する必要があります。これを行うには、エクストラクター関数の場所を指すように `DD_TRACE_EXTRACTOR` 環境変数を構成してください。フォーマットは `<FILE NAME>.<FUNCTION NAME>` です。たとえば、`json` エクストラクターが `extractors.js` ファイルにある場合は、`extractors.json` となります。Datadog は、エクストラクターを複数の Lambda 関数で再利用できるように、エクストラクターメソッドを 1 つのファイルにまとめて配置することを推奨しています。これらのエクストラクターは、どんなユースケースにも合うように完全にカスタマイズ可能です。

**注**:
- TypeScript や webpack のようなバンドラーを使用している場合、エクストラクターが定義されている Node.js モジュールを `import` または `require` する必要があります。これにより、モジュールがコンパイルされ、Lambda のデプロイメントパッケージにバンドルされるようになります。
- Node.js の Lambda 関数が `arm64` 上で動作する場合、環境変数 `DD_TRACE_EXTRACTOR` を使用する代わりに、[関数コード内でエクストラクターを定義][26]する必要があります。

#### サンプルエクストラクター {#sample-extractors}

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

	// Using SQS as a trigger with a batchSize=1 so it's important we check
  // for this as a single SQS message will drive the execution of the handler.
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

## X-Ray インテグレーションで Datadog にトレースを送信する {#sending-traces-to-datadog-with-the-x-ray-integration}

すでに X-Ray インスツルメンテーションがあり、引き続き利用する場合は、[AWS X-Ray インテグレーションをインストール][2]して、X-Ray から Datadog にトレースを送信できます。新しいサーバーレスアプリケーションの場合は、代わりに [Datadog Lambda Extension][35] を使用して Lambda 関数をインスツルメントすることをおすすめします。

## 参考資料 {#further-reading}

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
[35]: /ja/serverless/libraries_integrations/extension/