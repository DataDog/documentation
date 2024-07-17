---
aliases:
- /ja/serverless/custom_metrics
- /ja/serverless/enhanced_lambda_metrics
- /ja/serverless/real-time-enhanced-metrics
- /ja/serverless/real_time_enhanced_metrics
kind: ドキュメント
title: AWS Lambda メトリクス
---

このページでは、AWS Lambda 上のサーバーレスアプリケーションを監視するためのメトリクスについて説明します。

[Serverless Monitoring for AWS Lambda をインストール][1]すると、Datadog は Lambda ランタイムから[拡張メトリクス](#enhanced-lambda-metrics)を生成します。また、Lambda 関数からDatadog に[カスタムメトリクスを送信](#submit-custom-metrics)することもできます。

{{< img src="serverless/serverless_custom_metrics.png" alt="AWS Lambda からの拡張メトリクスの収集" >}}

### 非 Lambda リソースからメトリクスを収集する

Datadog は、AWS が管理するリソース ([API Gateway][2]、[AppSync][3]、[SQS][4] など) のメトリクスを収集し、サーバーレスアプリケーション全体の監視を支援することもできます。これらのメトリクスは、対応する AWS リソースタグでリッチ化されています。

これらのメトリクスを収集するには、[Datadog AWS インテグレーション][5]をセットアップします。

[1]: /ja/serverless/aws_lambda/installation
[2]: /ja/integrations/amazon_api_gateway/#data-collected
[3]: /ja/integrations/amazon_appsync/#data-collected
[4]: /ja/integrations/amazon_sqs/#data-collected
[5]: /ja/integrations/amazon_web_services/

## 拡張 Lambda メトリクス

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Lambda 拡張メトリクスデフォルトダッシュボード" width="80%">}}

Datadog は、低レイテンシー、数秒単位の粒度、コールドスタートやカスタムタグの詳細なメタデータを備えた Lambda ランタイムから、強化された Lambda メトリクスをすぐに生成します。

拡張 Lambda メトリクスは、AWS Lambda インテグレーションで有効になるデフォルトの [Lambda メトリクス][6]に加えて提供されます。拡張メトリクスは `aws.lambda.enhanced.*` ネームスペースにあることで区別されます。これらのメトリクスは[拡張 Lambda メトリクスデフォルトダッシュボード][7]で確認できます。

次のリアルタイムの拡張 Lambda メトリクスが利用可能で、これらは対応する `aws_account`、`region`、`functionname`、`cold_start`、`memorysize`、`executedversion`、`resource`、`runtime` タグでタグ付けされています。

これらのメトリクスは[ディストリビューション][8]として提供されており、`count`、`min`、`max`、`sum`、`avg` といった集計関数を使用してクエリを行うことができます。

`aws.lambda.enhanced.invocations`
: イベントまたは API コールの呼び出しに応答して関数が呼び出された回数を測定します。

`aws.lambda.enhanced.errors`
: 関数のエラーが原因で失敗した呼び出しの数を測定します。

`aws.lambda.enhanced.max_memory_used`
: 関数が使用するメモリの最大量 (mb) を測定します。

`aws.lambda.enhanced.duration`
: 関数コードが呼び出しの結果として実行を開始してから、実行を停止するまでの経過秒数を測定します。

`aws.lambda.enhanced.billed_duration`
: 請求対象となる関数が実行された時間を測定します (100 ミリ秒単位)。

`aws.lambda.enhanced.init_duration`
: コールドスタート時の関数の初期化時間 (秒) を計測します。

`aws.lambda.enhanced.runtime_duration`
: 関数のコードが実行を開始してから、クライアントにレスポンスを返すまでの経過ミリ秒を測定します。ただし、Lambda 拡張機能の実行によって追加されるランタイム後の時間は除きます。

`aws.lambda.enhanced.post_runtime_duration`
: 関数コードがクライアントに応答を返してから、関数の実行が停止するまでの経過ミリ秒を測定し、Lambda 拡張機能の実行によって追加される時間を表します。

`aws.lambda.enhanced.response_latency`
: 呼び出しリクエストを受信してから、レスポンスの最初のバイトがクライアントに送信されるまでの経過時間をミリ秒単位で測定します。

`aws.lambda.enhanced.response_duration`
: レスポンスの最初のバイトがクライアントに送信されてから、レスポンスの最後のバイトがクライアントに送信されるまでの経過時間をミリ秒単位で測定します。

`aws.lambda.enhanced.produced_bytes`
: 関数が返すバイト数を測定します。

`aws.lambda.enhanced.estimated_cost`
: 関数呼び出しの推定総コスト (米ドル) を測定します。

`aws.lambda.enhanced.timeouts`
: 関数がタイムアウトした回数を測定します。

`aws.lambda.enhanced.out_of_memory`
: 関数がメモリー不足になった回数を測定します。

[6]: /ja/integrations/amazon_lambda/#metric-collection
[7]: https://app.datadoghq.com/screen/integration/aws_lambda_enhanced_metrics
[8]: /ja/metrics/distributions/

## カスタムメトリクスの送信

### ログまたはトレースからカスタムメトリクスを作成する
すでに Lambda 関数からトレースまたはログデータが Datadog に送信されていて、クエリを作成するデータが既存のログまたはトレースにキャプチャされている場合は、再デプロイしたりアプリケーションコードに変更を加えたりせずにログおよびトレースからカスタムメトリクスを作成できます。

ログベースのメトリクスを使用すると、クエリに一致するログの数を記録したり、リクエストの継続時間など、ログに含まれる数値を要約したりできます。ログベースのメトリクスは、インジェストストリーム全体からログデータを要約するコスト効率の高い方法です。[ログベースのメトリクスの生成][9]の詳細をご参照ください。

保持フィルターでインデックス化されているかどうかに関わらず、取り込まれたすべてのスパンからメトリクスを生成することもできます。[スパンベースのメトリクスの生成][10]の詳細をご覧ください。

### Lambda 関数から直接カスタムメトリクスを送信する

カスタムメトリクスは、すべて[ディストリビューション](#understanding-distribution-metrics)として送信されます。

**Note**: Distribution metrics must be submitted with a new name, do not re-use a name of a previously submitted metric.

1. [Serverless Monitoring for AWS Lambda をインストール][1]し、Datadog Lambda 拡張機能がインストールされていることを確認します。

2. ランタイムを選択します。

{{< programming-lang-wrapper langs="python,nodeJS,go,java,dotnet,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # メトリクス名
        12.45,                                  # メトリクス値
        tags=['product:latte', 'order:online']  # 関連タグ
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // メトリクス名
        12.45,                      // メトリクス値
        'product:latte',            // 最初のタグ
        'order:online'              // 2 番目のタグ
    );
}
```
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  ddlambda.Distribution(
    "coffee_house.order_value",     // メトリクス名
    12.45,                          // メトリクス値
    "product:latte", "order:online" // 関連付けられたタグ
  )
}
```
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

最新バージョンの [`java-dogstatsd-client`][1] をインストールします。

```java
package com.datadog.lambda.sample.java;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2ProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2ProxyResponseEvent;

// statsd クライアントビルダーをインポートする
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {

    // statsd クライアントのインスタンスを作成する
    private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").build();

    @Override
    public APIGatewayV2ProxyResponseEvent handleRequest(APIGatewayV2ProxyRequestEvent request, Context context) {

        // ディストリビューションメトリクスを送信する
        Statsd.recordDistributionValue("my.custom.java.metric", 1, new String[]{"tag:value"});

        APIGatewayV2ProxyResponseEvent response = new APIGatewayV2ProxyResponseEvent();
        response.setStatusCode(200);
        return response;
    }
}
```

[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

最新バージョンの [`dogstatsd-csharp-client`][1] をインストールします。

```csharp
using System.IO;

// statsd クライアントをインポートする
using StatsdClient;

namespace Example
{
  public class Function
  {
    static Function()
    {
        // statsd クライアントのインスタンスを作成する
        var dogstatsdConfig = new StatsdConfig
        {
            StatsdServerName = "127.0.0.1",
            StatsdPort = 8125,
        };
        if (!DogStatsd.Configure(dogstatsdConfig))
            throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
    }

    public Stream MyHandler(Stream stream)
    {
        // ディストリビューションメトリクスを送信する
        DogStatsd.Distribution("my.custom.dotnet.metric", 1, tags: new[] { "tag:value" });
        // 関数ロジック
    }
  }
}
```

[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

1. ランタイムに DogStatsD クライアントを[インストール][1]します
2. [サンプルコード][2]を参照して、カスタムメトリクスを送信します。

[1]: /ja/developers/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /ja/developers/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Datadog Forwarder を使って履歴メトリクスを送信する

ほとんどの場合、Datadog ではカスタムメトリクスの送信に Datadog Lambda 拡張機能を使用することを推奨しています。ただし、Lambda 拡張機能は、現在のタイムスタンプを持つメトリクスしか送信できません。

履歴メトリクスを送信するには、Datadog Forwarder を使用します。これらのメトリクスには、過去 1 時間以内のタイムスタンプが設定されている必要があります。

[Serverless Monitoring for AWS Lambda のインストール][1]から始めます。Datadog Lambda Forwarder がインストールされていることを確認します。

次に、ランタイムを選択します。

{{< programming-lang-wrapper langs="python,nodeJS,go,ruby,java,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # メトリクス名
        12.45,                                  # メトリクス値
        tags=['product:latte', 'order:online']  # 関連付けられたタグ
    )

    # 過去 20 分以内のタイムスタンプでメトリクスを送信します
    lambda_metric(
        "coffee_house.order_value",             # メトリクス名
        12.45,                                  # メトリクス値
        timestamp=int(time.time()),             # Unix エポック (秒)
        tags=['product:latte', 'order:online']  # 関連付けられたタグ
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // メトリクス名
        12.45,                      // メトリクス値
        'product:latte',            // 最初のタグ
        'order:online'              // 2 番目のタグ
    );

    // 過去 20 分以内のタイムスタンプでメトリクスを送信します 
    sendDistributionMetricWithDate(
        'coffee_house.order_value', // メトリクス名
        12.45,                      // メトリクス値
        new Date(Date.now()),       // 日付
        'product:latte',            // 最初のタグ
        'order:online',             // 2 番目のタグ
    );
}
```
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  ddlambda.Distribution(
    "coffee_house.order_value",     // メトリクス名
    12.45,                          // メトリクス値
    "product:latte", "order:online" // 関連付けられたタグ
  )

  // 過去 20 分以内のタイムスタンプでメトリクスを送信します
  ddlambda.MetricWithTimestamp(
    "coffee_house.order_value",     // メトリクス名
    12.45,                          // メトリクス値
    time.Now(),                     // タイムスタンプ
    "product:latte", "order:online" // 関連付けられたタグ
  )
}
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

```ruby
require 'datadog/lambda'

def handler(event:, context:)
    # ラップする必要があるのは関数ハンドラーだけです（ヘルパー関数ではありません）。
    Datadog::Lambda.wrap(event, context) do
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # メトリクス名
          12.45,                              # メトリクス値
          "product":"latte", "order":"online" # 関連付けられたタグ
        )

        # 過去 20 分以内のタイムスタンプでメトリクスを送信します
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # メトリクス名
          12.45,                              # メトリクス値
          time: Time.now.utc,                 # タイムスタンプ
          "product":"latte", "order":"online" # 関連付けられたタグ
        )
    end
end
```

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, lambda);

        Map<String,String> myTags = new HashMap<String, String>();
            myTags.put("product", "latte");
            myTags.put("order", "online");

        dd.metric(
            "coffee_house.order_value", // メトリクス名
            12.45,                      // メトリクス値
            myTags);                    // 関連タグ
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

次の形式でカスタムメトリクスをログする再利用可能な関数を作成します。

```json
{
    "m": "メトリクス名",
    "v": "メトリクス値",
    "e": "Unix タイムスタンプ（秒）",
    "t": "タグの配列"
}
```

例:

```json
{
    "m": "coffee_house.order_value",
    "v": 12.45,
    "e": 1572273854,
    "t": ["product:latte", "order:online"]
}
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### 多くのデータポイントを送信する

Forwarder を使用して、同じメトリクスと同じタグのセットに対して多くのデータポイントを送信すると (例えば、大きな `for` ループ内で)、Lambda のパフォーマンスと CloudWatch のコストに影響を与える可能性があります。

アプリケーションのデータポイントを集計して、オーバーヘッドを回避することができます。

例えば、Python の場合

```python
def lambda_handler(event, context):

    # event['Records'] に多数のレコードが含まれる場合、効率が悪い
    for record in event['Records']:
      lambda_metric("record_count", 1)

    # 実装の改善
    record_count = 0
    for record in event['Records']:
      record_count += 1
    lambda_metric("record_count", record_count)
```

### ディストリビューションメトリクスについて

Datadog が同じタイムスタンプとタグのセットを共有する複数のカウントまたはゲージメトリクスポイントを受信した場合、最新のものだけがカウントされます。これは、Datadog Agent によってメトリクスポイントが集計され、一意の `host` タグでタグ付けされるため、ホストベースのアプリケーションで動作します。

Lambda 関数は、トラフィックが増加すると多数の同時実行環境を起動することがあります。このような場合、関数はカウントやゲージのメトリクスポイントを送信しますが、これらは互いに上書きされ、カウント不足の結果を引き起こす可能性があります。この問題を回避するために、Lambda 関数によって生成されたカスタムメトリクスは[ディストリビューション][11]として提出されます。なぜなら、ディストリビューションのメトリクスポイントは Datadog バックエンドで集計され、すべてのメトリクスポイントがカウントされるからです。

ディストリビューションはデフォルトで `avg`、`sum`、`max`、`min`、`count` の集計を提供します。Metric Summary ページでは、パーセンタイル集計 (p50、p75、p90、p95、p99) を有効にすることができ、また[タグの管理][12]も可能です。ゲージメトリクスタイプのディストリビューションを監視するには、[時間集計と空間集計][13]の両方で `avg` を使用します。カウントメトリクスタイプのディストリビューションを監視するには、[時間集計と空間集計][13]の両方で `sum` を使用します。時間・空間集計がどのように機能するかは、ガイド[グラフへのクエリ][14]を参照してください。

[9]: /ja/logs/logs_to_metrics/
[10]: /ja/tracing/trace_pipeline/generate_metrics/
[11]: /ja/metrics/distributions/
[12]: /ja/metrics/distributions/#customize-tagging
[13]: /ja/metrics/#time-and-space-aggregation
[14]: /ja/dashboards/guide/query-to-the-graph/