---
aliases:
- /ja/serverless/custom_metrics
- /ja/serverless/enhanced_lambda_metrics
- /ja/serverless/real-time-enhanced-metrics
- /ja/serverless/real_time_enhanced_metrics
title: AWS Lambda メトリクス
---
このページでは、AWS Lambda 上のサーバーレスアプリケーションを監視するためのメトリクスについて説明します。AWS Lambda からメトリクスを取得する方法は 3 つあります。

- [Datadog AWS インテグレーション][5]から Cloudwatch Lambda メトリクスを取得できます。
- Datadog Lambda Extension を通じて [Serverless Monitoring for AWS Lambda をインストール][1]することで[拡張メトリクス](#enhanced-lambda-metrics)を取得できます。
- Lambda 関数から Datadog に[カスタムメトリクスを送信](#submit-custom-metrics)できます。

{{< img src="serverless/serverless_custom_metrics.png" alt="AWS Lambda からの拡張メトリクスの収集" >}}

### 非 Lambda リソースからメトリクスを収集する {#collect-metrics-from-non-lambda-resources}

Datadog は、AWS が管理するリソース ([API Gateway][2]、[AppSync][3]、[SQS][4] など) のメトリクスを収集し、サーバーレスアプリケーション全体の監視を支援することもできます。これらのメトリクスは、対応する AWS リソースタグでリッチ化されています。

これらのメトリクスを収集するには、[Datadog AWS インテグレーション][5]を設定します。

[1]: /ja/serverless/aws_lambda/installation
[2]: /ja/integrations/amazon_api_gateway/#data-collected
[3]: /ja/integrations/amazon_appsync/#data-collected
[4]: /ja/integrations/amazon_sqs/#data-collected
[5]: /ja/integrations/amazon_web_services/

## 拡張 Lambda メトリクス {#enhanced-lambda-metrics}

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Lambda 拡張メトリクスのデフォルトダッシュボード" width="80%">}}

Datadog は、低レイテンシー、数秒単位の粒度、コールドスタートやカスタムタグの詳細なメタデータを備えた Lambda ランタイムから、強化された Lambda メトリクスをすぐに生成します。

拡張 Lambda メトリクスは、AWS Lambda インテグレーションで有効になるデフォルトの [Lambda メトリクス][6]に加えて提供されます。拡張メトリクスは `aws.lambda.enhanced.*` ネームスペースにあることで区別されます。これらのメトリクスは[拡張 Lambda メトリクスデフォルトダッシュボード][7]で確認できます。

次のリアルタイムの拡張 Lambda メトリクスが利用可能で、これらは対応する `aws_account`、`region`、`functionname`、`cold_start`、`memorysize`、`executedversion`、`resource`、`runtime` の各タグでタグ付けされています。

これらのメトリクスは[分布][8]: で、`count`、`min`、`max`、`sum`、`avg` 集計を使用してクエリを実行できます。拡張メトリクスは [Serverless Monitoring][1] で自動的に有効になりますが、Lambda 関数で `DD_ENHANCED_METRICS` 環境変数を `false` に設定することで無効にできます。

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
: 関数のコードが実行を開始してから、クライアントに応答を返すまでの経過ミリ秒を測定します。ただし、Lambda 拡張機能の実行によって追加されるランタイム後の時間は除きます。

`aws.lambda.enhanced.post_runtime_duration`
: 関数コードがクライアントに応答を返してから、関数の実行が停止するまでの経過ミリ秒を測定し、Lambda 拡張機能の実行によって追加される時間を表します。

`aws.lambda.enhanced.response_latency`
: 呼び出しリクエストを受信してから、応答の最初のバイトがクライアントに送信されるまでの経過時間をミリ秒単位で測定します。

`aws.lambda.enhanced.response_duration`
: 応答の最初のバイトがクライアントに送信されてから、応答の最後のバイトがクライアントに送信されるまでの経過時間をミリ秒単位で測定します。

`aws.lambda.enhanced.produced_bytes`
: 関数が返すバイト数を測定します。

`aws.lambda.enhanced.estimated_cost`
: 関数呼び出しの推定総コスト (米ドル) を測定します。

`aws.lambda.enhanced.timeouts`
: 関数がタイムアウトした回数を測定します。

`aws.lambda.enhanced.out_of_memory`
: 関数がメモリ不足になった回数を測定します。
: メモリ不足エラーには多くのバリエーションがあるため、最善を尽くしても対処できない場合があります。そのような場合は、[Datadog Lambda Extension GitHub リポジトリ][18]に問題を作成してください。

`aws.lambda.enhanced.cpu_total_utilization`
: 関数の総 CPU 使用量をコア数として測定します。

`aws.lambda.enhanced.cpu_total_utilization_pct`
: 関数の総 CPU 使用量をパーセントとして測定します。

`aws.lambda.enhanced.cpu_max_utilization`
: 最も使用率が高いコアの CPU 使用量を測定します。

`aws.lambda.enhanced.cpu_min_utilization`
: 最も使用率が低いコアの CPU 使用量を測定します。

`aws.lambda.enhanced.cpu_system_time`
: CPU のカーネルモードでの実行時間を測定します。

`aws.lambda.enhanced.cpu_user_time`
: CPU のユーザーモードでの実行時間を測定します。

`aws.lambda.enhanced.cpu_total_time`
: CPU の合計実行時間を測定します。

`aws.lambda.enhanced.num_cores`
: 利用可能なコアの数を測定します。

`aws.lambda.enhanced.rx_bytes`
: 関数の受信バイト数を測定します。

`aws.lambda.enhanced.tx_bytes`
: 関数の送信バイト数を測定します。

`aws.lambda.enhanced.total_network`
: 関数の送信バイト数と受信バイト数の合計を測定します。

`aws.lambda.enhanced.tmp_max`
: /tmp ディレクトリの合計空きスペースを測定します。

`aws.lambda.enhanced.tmp_used`
: /tmp ディレクトリの使用スペースを測定します。

`aws.lambda.enhanced.fd_max`
: 使用可能なファイルディスクリプタの合計数を測定します。

`aws.lambda.enhanced.fd_use`
: 関数の呼び出し中に使用されたファイルディスクリプタの最大数を測定します。

`aws.lambda.enhanced.threads_max`
: 使用可能なスレッドの合計数を測定します。

`aws.lambda.enhanced.threads_use`
: 関数の呼び出し中に使用されたスレッドの最大数を測定します。

[6]: /ja/integrations/amazon_lambda/#metric-collection
[7]: https://app.datadoghq.com/screen/integration/aws_lambda_enhanced_metrics
[8]: /ja/metrics/distributions/
[18]: https://github.com/DataDog/datadog-lambda-extension

## カスタムメトリクスの送信 {#submit-custom-metrics}

### ログまたはトレースからカスタムメトリクスを作成 {#create-custom-metrics-from-logs-or-traces}
すでに Lambda 関数からトレースまたはログデータが Datadog に送信されていて、クエリを作成するデータが既存のログまたはトレースにキャプチャされている場合は、再デプロイしたりアプリケーションコードに変更を加えたりせずにログおよびトレースからカスタムメトリクスを作成できます。

ログベースのメトリクスを使用すると、クエリに一致するログの数を記録したり、リクエストの継続時間など、ログに含まれる数値を要約したりできます。ログベースのメトリクスは、取り込みストリーム全体のログデータを要約するためのコスト効率の高い方法です。ログベースのメトリクスの作成については、[こちら][9]をご覧ください。

保持フィルターでインデックス化されているかどうかに関係なく、取り込んだ全スパンからメトリクスを生成することもできます。スパンベースのメトリクスの作成については、[こちら][10]をご覧ください。

### カスタムメトリクスを Lambda 関数から直接送信 {#submit-custom-metrics-directly-from-a-lambda-function}

カスタムメトリクスはいずれも[ディストリビューション](#understanding-distribution-metrics)として送信されます。

**注**: ディストリビューションメトリクスは新しい名前で送信する必要があります。前に送信したメトリクスの名前は使用しないでください。

1. [Serverless Monitoring for AWS Lambda][1] をインストールし、Datadog Lambda Extension がインストールされていることを確認します。

2. ランタイムを選択します。

{{< programming-lang-wrapper langs="python,nodeJS,go,java,dotnet,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # Metric name
        12.45,                                  # Metric value
        tags=['product:latte', 'order:online']  # Associated tags
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // Metric name
        12.45,                      // Metric value
        'product:latte',            // First tag
        'order:online'              // Second tag
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
    "coffee_house.order_value",     // Metric name
    12.45,                          // Metric value
    "product:latte", "order:online" // Associated tags
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

// import the statsd client builder
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {

    // instantiate the statsd client
    private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").build();

    @Override
    public APIGatewayV2ProxyResponseEvent handleRequest(APIGatewayV2ProxyRequestEvent request, Context context) {

        // submit a distribution metric
        Statsd.recordDistributionValue("my.custom.java.metric", 1, new String[]{"tag:value"});

        APIGatewayV2ProxyResponseEvent response = new APIGatewayV2ProxyResponseEvent();
        response.setStatusCode(200);
        return response;
    }

    static {
        // ensure all metrics are flushed before shutdown
        Runtime.getRuntime().addShutdownHook(new Thread() {
            @Override
            public void run() {
                System.out.println("[runtime] shutdownHook triggered");
                try {
                    Thread.sleep(300);
                } catch (InterruptedException e) {
                    System.out.println("[runtime] sleep interrupted");
                }
                System.out.println("[runtime] exiting");
            }
        });
    }
}
```

[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

最新バージョンの [`dogstatsd-csharp-client`][1] をインストールします。

```csharp
using System.IO;

// import the statsd client
using StatsdClient;

namespace Example
{
  public class Function
  {
    static Function()
    {
        // instantiate the statsd client
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
        // submit a distribution metric
        DogStatsd.Distribution("my.custom.dotnet.metric", 1, tags: new[] { "tag:value" });
        // your function logic
    }
  }
}
```

[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

1. ランタイムの DogStatsD クライアントを[インストール][1]します。
2. [サンプルコード][2]に従ってカスタムメトリクスを送信します。

[1]: /ja/extend/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /ja/extend/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 過去のメトリクスを送信 {#submit-historical-metrics}

過去のメトリクスを送信するには Datadog Lambda Extension を使用します。これらのメトリクスは、最大で 1 時間前のタイムスタンプを持ちます。

まず、[Serverless Monitoring for AWS Lambda][1] をインストールします。最新の Datadog Lambda Extension がインストールされていることを確認してください。

次に、ランタイムを選択します。

{{< programming-lang-wrapper langs="python,nodeJS,go,ruby,java,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # Metric name
        12.45,                                  # Metric value
        tags=['product:latte', 'order:online']  # Associated tags
    )

    # Submit a metric with a timestamp that is within the last 20 minutes
    lambda_metric(
        "coffee_house.order_value",             # Metric name
        12.45,                                  # Metric value
        timestamp=int(time.time()),             # Unix epoch in seconds
        tags=['product:latte', 'order:online']  # Associated tags
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // Metric name
        12.45,                      // Metric value
        'product:latte',            // First tag
        'order:online'              // Second tag
    );

    // Submit a metric with a timestamp that is within the last 20 minutes
    sendDistributionMetricWithDate(
        'coffee_house.order_value', // Metric name
        12.45,                      // Metric value
        new Date(Date.now()),       // date
        'product:latte',            // First tag
        'order:online',             // Second tag
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
    "coffee_house.order_value",     // Metric name
    12.45,                          // Metric value
    "product:latte", "order:online" // Associated tags
  )

  // Submit a metric with a timestamp that is within the last 20 minutes
  ddlambda.MetricWithTimestamp(
    "coffee_house.order_value",     // Metric name
    12.45,                          // Metric value
    time.Now(),                     // Timestamp
    "product:latte", "order:online" // Associated tags
  )
}
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

```ruby
require 'datadog/lambda'

def handler(event:, context:)
    # You only need to wrap your function handler (Not helper functions).
    Datadog::Lambda.wrap(event, context) do
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # Metric name
          12.45,                              # Metric value
          "product":"latte", "order":"online" # Associated tags
        )

        # Submit a metric with a timestamp that is within the last 20 minutes
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # Metric name
          12.45,                              # Metric value
          time: Time.now.utc,                 # Timestamp
          "product":"latte", "order":"online" # Associated tags
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
            "coffee_house.order_value", // Metric name
            12.45,                      // Metric value
            myTags);                    // Associated tags
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

次の形式でカスタムメトリクスをログする再利用可能な関数を作成します。

```json
{
    "m": "Metric name",
    "v": "Metric value",
    "e": "Unix timestamp (seconds)",
    "t": "Array of tags"
}
```

たとえば、以下のとおりです。

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

### ディストリビューションメトリクスについて {#understanding-distribution-metrics}

Datadog が同じタイムスタンプとタグのセットを共有する複数のカウントまたはゲージメトリクスポイントを受信した場合、最新のものだけがカウントされます。これは、Datadog Agent によってメトリクスポイントが集計され、一意の `host` タグでタグ付けされるため、ホストベースのアプリケーションで動作します。

Lambda 関数は、トラフィックが増加すると多数の同時実行環境を起動することがあります。このような場合、関数はカウントやゲージのメトリクスポイントを送信しますが、これらは互いに上書きされ、カウント不足の結果を引き起こす可能性があります。この問題を回避するために、Lambda 関数によって生成されたカスタムメトリクスは[ディストリビューション][11]として送信されます。ディストリビューションのメトリクスポイントは Datadog バックエンドで集計され、すべてのメトリクスポイントがカウントされるからです。

ディストリビューションはデフォルトで `avg`、`sum`、`max`、`min`、`count` の集約を提供します。メトリクスサマリーページで、パーセンタイル集計 (p50、p75、p90、p95、p99) を有効にし、[タグを管理][12]することもできます。ディストリビューションメトリクスタイプのディストリビューションを監視するには、[時間集計とスペース集計][13]の両方に `avg` を使用します。カウントメトリクスタイプのディストリビューションを監視するには、[時間集計とスペース集計][13]の両方に `sum` を使用します。時間集計とスペース集計の動作については、[クエリからグラフまで][14]のガイドを参照してください。

### Datadog でメトリクスの使用状況、ボリューム、料金を確認 {#understanding-your-metrics-usage-volume-and-pricing-in-datadog}

Datadog アプリの [Metrics Summary ページ][15]で、取り込んでいるカスタムメトリクス、タグカーディナリティ、およびカスタムメトリクスの管理ツールに関する詳細な情報が提供されます。すべてのサーバーレスカスタムメトリクスは、Distribution Metric Origin [ファセットパネル][16]の 'Serverless' タグで確認できます。[Metrics without Limits™][17] で、カスタムメトリクスのボリュームとコストを制御することもできます。

[9]: /ja/logs/logs_to_metrics/
[10]: /ja/tracing/trace_pipeline/generate_metrics/
[11]: /ja/metrics/distributions/
[12]: /ja/metrics/distributions/#customize-tagging
[13]: /ja/metrics/#time-and-space-aggregation
[14]: /ja/dashboards/guide/query-to-the-graph/
[15]: https://app.datadoghq.com/metric/summary
[16]: /ja/metrics/summary/#facet-panel
[17]: /ja/metrics/summary/#metrics-without-limits