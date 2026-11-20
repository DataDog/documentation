---
title: AWS Lambda Serverless アプリケーションからの Custom Metrics
---
## 概要 {#overview}

Lambda 関数から Datadog にカスタムメトリクスを送信する方法はいくつかあります。

- **[ログまたはトレースからのカスタムメトリクスの作成](#creating-custom-metrics-from-logs-or-traces)**: すでに Lambda 関数からトレースまたはログデータが Datadog に送信されていて、クエリを作成するデータが既存のログまたはトレースにキャプチャされている場合は、再デプロイしたりアプリケーションコードに変更を加えたりせずにログおよびトレースからカスタムメトリクスを作成できます。
- **[Datadog Lambda Extension を使用したカスタムメトリクスの送信](#with-the-datadog-lambda-extension)**: Lambda 関数から直接カスタムメトリクスを送信する場合、Datadog は [Datadog Lambda Extension][1] の使用を推奨しています。
- **[Datadog Forwarder Lambda を使用したカスタムメトリクスの送信](#with-the-datadog-forwarder)**: Datadog Forwarder Lambda を介して Lambda 関数からテレメトリを送信している場合は、Datadog が提供するヘルパー関数を使用してログ経由でカスタムメトリクスを送信できます。
- **[(非推奨) CloudWatch ログからのカスタムメトリクスの送信](#deprecated-cloudwatch-logs)**: `MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>` 形式のログを出力してカスタムメトリクスを送信する方法は推奨されなくなりました。Datadog は代わりに [Datadog Lambda Extension](#with-the-datadog-lambda-extension) の使用を推奨しています。
- **(非推奨) Datadog Lambda ライブラリを使用したカスタムメトリクスの送信**: Python、Node.js、Go 用の Datadog Lambda ライブラリは、`DD_FLUSH_TO_LOG` が `false` に設定されている場合に呼び出しをブロックすることで、ランタイムから Datadog へのカスタムメトリクスの同期送信をサポートしています。パフォーマンスのオーバーヘッドに加え、一時的なネットワークの問題が発生しても再試行されないため、メトリクスの送信時に断続的なエラーが発生する可能性もあります。Datadog は代わりに [Datadog Lambda Extension](#with-the-datadog-lambda-extension) の使用を推奨しています。
- **(非推奨) サードパーティライブラリの使用**: ほとんどのサードパーティライブラリはメトリクスをディストリビューションとして送信しないため、カウントが実際より少なくなる可能性があります。また、一時的なネットワークの問題が発生しても再試行されないため、断続的なエラーが発生する可能性もあります。

### ディストリビューションメトリクスについて {#understanding-distribution-metrics}

Datadog が同じタイムスタンプとタグのセットを共有する複数のカウントまたはゲージメトリクスポイントを受信した場合、最新のものだけがカウントされます。これは、Datadog Agent によってメトリクスポイントが集計され、一意の `host` タグでタグ付けされるため、ホストベースのアプリケーションで動作します。

Lambda 関数は、トラフィックが増加すると多数の同時実行環境を起動することがあります。このような場合、関数はカウントやゲージのメトリクスポイントを送信しますが、これらは互いに上書きされ、カウント不足の結果を引き起こす可能性があります。この問題を回避するために、Lambda 関数によって生成されたカスタムメトリクスは[ディストリビューション][2]として送信されます。ディストリビューションのメトリクスポイントは Datadog バックエンドで集計され、すべてのメトリクスポイントがカウントされるからです。

ディストリビューションはデフォルトで `avg`、`sum`、`max`、`min`、`count` の集約を提供します。{{< ui >}}Metrics Catalog{{< /ui >}} ページで、パーセンタイル集計 (p50、p75、p90、p95、p99) を有効にし、[タグを管理][3]することもできます。ディストリビューションメトリクスタイプのディストリビューションを監視するには、[時間集計とスペース集計][4]の両方に `avg` を使用します。カウントメトリクスタイプのディストリビューションを監視するには、[時間集計とスペース集計][4]の両方に `sum` を使用します。時間集計とスペース集計の動作については、[クエリからグラフまで][5]のガイドを参照してください。

### 多数のデータポイントの送信 {#submitting-many-data-points}

Forwarder を使用して同じメトリクスとタグセットに対して多数のデータポイントを送信する場合 (例えば、大きな `for` ループ内など)、Lambda のパフォーマンスや CloudWatch のコストに顕著な影響が出る可能性があります。オーバーヘッドを回避するためにアプリケーション内でデータポイントを集計できます。以下の Python の例を参照してください。

```python
def lambda_handler(event, context):

    # Inefficient when event['Records'] contains many records
    for record in event['Records']:
      lambda_metric("record_count", 1)

    # Improved implementation
    record_count = 0
    for record in event['Records']:
      record_count += 1
    lambda_metric("record_count", record_count)
```

## ログまたはトレースからのカスタムメトリクスの作成 {#creating-custom-metrics-from-logs-or-traces}

ログベースのメトリクスを使用すると、クエリに一致するログの数を記録したり、リクエストの継続時間などログに含まれる数値を要約したりできます。ログベースのメトリクスは、取り込みストリーム全体のログデータを要約するためのコスト効率の高い方法です。[ログベースのメトリクスの作成][6]についてはこちらをご覧ください。

保持フィルターでインデックス化されているかどうかに関係なく、取り込んだ全スパンからメトリクスを生成することもできます。[スパンベースのメトリクスの作成][7]について詳しくはこちらをご覧ください。
## Datadog Lambda Extension を使用する場合 {#with-the-datadog-lambda-extension}

{{< img src="serverless/serverless_custom_metrics.png" alt="AWS Lambda からの Custom Metrics の収集" >}}

Datadog では、サポートされている Lambda ランタイムからカスタムメトリクスを[**ディストリビューション**](#understanding-distribution-metrics)として送信するために、[Datadog Lambda Extension][1] の使用を推奨しています。

1. お使いの Lambda ランタイムに適した一般的な[サーバーレスインストール手順][8]に従ってください。
1. Lambda 関数からトレースを収集する必要がない場合は、環境変数 `DD_TRACE_ENABLED` を `false` に設定します。
1. Lambda 関数からログを収集する必要がない場合は、環境変数 `DD_SERVERLESS_LOGS_ENABLED` を `false` に設定します。
1. 以下のサンプルコードまたは手順に従ってカスタムメトリクスを送信します。

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

[java-dogstatsd-client][1] の最新バージョンをインストールし、以下のサンプルコードに従ってカスタムメトリクスを[**ディストリビューション**](#understanding-distribution-metrics)として送信します。

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

[dogstatsd-csharp-client][1] の最新バージョンをインストールし、以下のサンプルコードに従ってカスタムメトリクスを[**ディストリビューションメトリクス**](#understanding-distribution-metrics)として送信します。

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
2. [サンプルコード][2]に従って、カスタムメトリクスを[**ディストリビューション**](#understanding-distribution-metrics)として送信します


[1]: /ja/extend/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /ja/extend/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Datadog Forwarder を使用する場合 {#with-the-datadog-forwarder}

Datadog では、Datadog Lambda Extension でサポートされていない Lambda ランタイムからカスタムメトリクスを送信するために、[Datadog Forwarder Lambda][9] を使用することを推奨しています。

1. 一般的な[サーバーレスインストール手順][8]に従って、Datadog Forwarder Lambda 関数を使用して Lambda 関数をインスツルメントします。
1. Lambda 関数からトレースを収集する必要がない場合は、独自の Lambda 関数で環境変数 `DD_TRACE_ENABLED` を `false` に設定します。
1. Lambda 関数からログを収集する必要がない場合は、Forwarder の CloudFormation スタックパラメーター `DdForwardLog` を `false` に設定します。
1. Datadog Lambda ライブラリのヘルパー関数 (`lambda_metric` や `sendDistributionMetric` など) をインポートして使用し、以下のサンプルコードに従ってカスタムメトリクスを送信します。

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

次の形式でカスタムメトリクスを記録する再利用可能な関数を作成します。

```json
{
    "m": "Metric name",
    "v": "Metric value",
    "e": "Unix timestamp (seconds)",
    "t": "Array of tags"
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

## [非推奨] CloudWatch ログ {#deprecated-cloudwatch-logs}

**このカスタムメトリクスの送信方法はサポートが終了しており、すべての新規顧客に対して無効になっています。推奨されるソリューションのいずれかに移行してください。**

**注**: 推奨されるソリューションのいずれかに移行する場合は、Datadog に送信する際に**新しいメトリクス名**でカスタムメトリクスのインスツルメントを開始する必要があります。同じメトリクス名を、ディストリビューションメトリクスタイプと非ディストリビューションメトリクスタイプの両方として同時に存在させることはできません。

これには、[Datadog IAM ポリシー][10]で以下の AWS 権限が必要です。

| AWS 権限            | 説明                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `logs:DescribeLogGroups`  | 利用可能なロググループを一覧表示します。                                 |
| `logs:DescribeLogStreams` | グループの利用可能なログストリームを一覧表示します。                    |
| `logs:FilterLogEvents`    | メトリクスを生成するためにストリームの特定のログイベントを取得します。|

Lambda ログから Datadog にカスタムメトリクスを送信するには、次の形式を使用してログ行を出力します。

```text
MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>
```

Where:

- `MONITORING` は、このログエントリを収集するよう Datadog インテグレーションに通知します。
- `<UNIX_EPOCH_TIMESTAMP>`はミリ秒単位ではなく秒単位です。
- `<METRIC_VALUE>`は数値 (整数または浮動小数点数) である必要があります。
- `<METRIC_TYPE>`は、`count`、`gauge`、`histogram`、または `check` です。
- `<METRIC_NAME>`はメトリクスを一意に識別するものであり、[メトリクス命名ポリシー][11]に従う必要があります。
- `<TAG_LIST>`はオプションで、カンマ区切りです。前に `#` を付ける必要があります。タグ `function_name:<name_of_the_function>` はカスタムメトリクスに自動的に適用されます。

**注**: カウントには各タイムスタンプの合計が使用され、ゲージには特定のタイムスタンプの最後の値が使用されます。メトリクスをインクリメントするたびにログステートメントを出力することは推奨されません。ログの解析にかかる時間が増加するためです。コード内のメトリクスの値を継続的に更新し、関数が終了する前にそのメトリクスのログステートメントを 1 つ出力してください。

[1]: /ja/serverless/libraries_integrations/extension/
[2]: /ja/metrics/distributions/
[3]: /ja/metrics/distributions/#customize-tagging
[4]: /ja/metrics/#time-and-space-aggregation
[5]: /ja/dashboards/guide/query-to-the-graph/
[6]: /ja/logs/logs_to_metrics/
[7]: /ja/tracing/trace_pipeline/generate_metrics/
[8]: /ja/serverless/installation/
[9]: /ja/serverless/forwarder/
[10]: /ja/integrations/amazon_web_services/?tab=roledelegation#datadog-aws-iam-policy
[11]: /ja/metrics/