---
title: AWS Lambda サーバーレスアプリケーションからのカスタムメトリクス
---

## 概要

Lambda 関数から Datadog へカスタムメトリクスを送信するにはいくつかの異なる方法があります。

- **[ログまたはトレースからカスタムメトリクスを作成](#creating-custom-metrics-from-logs-or-traces)**: すでに Lambda 関数からトレースまたはログデータが Datadog に送信されていて、クエリを作成するデータが既存のログまたはトレースにキャプチャされている場合は、再デプロイしたりアプリケーションコードに変更を加えたりせずにログおよびトレースからカスタムメトリクスを作成できます。
- **[Datadog Lambda 拡張機能を使ったカスタムメトリクスの送信](#with-the-datadog-lambda-extension)**: Lambda 関数から直接カスタムメトリクスを送信したい場合、Datadog では [Datadog Lambda 拡張機能][1]の使用を推奨しています。
- **[Datadog Forwarder Lambda を使用したカスタムメトリクスの送信](#with-the-datadog-forwarder)**: Lambda 関数から Datadog Forwarder Lambda 経由でテレメトリーを送信する場合、Datadog が提供するヘルパー関数を使用してログ経由で顧客のメトリクスを送信することができます。
- **[(非推奨) CloudWatch ログからカスタムメトリクスを送信](#deprecated-cloudwatch-logs)**: `MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>` 形式のログを出力してカスタムメトリクスを送信する方法は非推奨となりました。Datadog では、代わりに [Datadog Lambda 拡張機能](#with-the-datadog-lambda-extension)を使用することを推奨しています。
- **(非推奨) Datadog Lambda ライブラリを使用したカスタムメトリクスの送信**: Python、Node.js、Go 用の Datadog Lambda ライブラリは、`DD_FLUSH_TO_LOG` を `false` に設定すると呼び出しをブロックし、ランタイムから Datadog にカスタムメトリクスを同期的に送ることをサポートしています。パフォーマンスのオーバーヘッドに加え、メトリクス送信は、過渡的なネットワークの問題のためにリトライができないため、断続的にエラーが発生する可能性があります。Datadog では、代わりに [Datadog Lambda 拡張機能](#with-the-datadog-lambda-extension)を使用することを推奨しています。
- **(非推奨) サードパーティライブラリの使用について**: ほとんどのサードパーティライブラリは、ディストリビューションとしてメトリクスを送信しないため、カウント不足の結果になることがあります。また、一過性のネットワークの問題でリトライが行われないため、断続的なエラーが発生することがあります。

### ディストリビューションメトリクスについて

Datadog が同じタイムスタンプとタグのセットを共有する複数のカウントまたはゲージメトリクスポイントを受信した場合、最新のものだけがカウントされます。これは、Datadog Agent によってメトリクスポイントが集計され、一意の `host` タグでタグ付けされるため、ホストベースのアプリケーションで動作します。

Lambda 関数は、トラフィックが増加すると多数の同時実行環境を起動することがあります。このような場合、関数はカウントやゲージのメトリクスポイントを送信しますが、これらは互いに上書きされ、カウント不足の結果を引き起こす可能性があります。この問題を回避するために、Lambda 関数によって生成されたカスタムメトリクスは[分布][2]として提出されます。なぜなら、分布のメトリクスポイントは Datadog バックエンドで集計され、すべてのメトリクスポイントがカウントされるからです。

分布はデフォルトで `avg`、`sum`、`max`、`min`、`count` の集計を提供します。Metric Summary ページでは、パーセンタイル集計 (p50、p75、p90、p95、p99) を有効にすることができ、また[タグの管理][3]も可能です。ゲージメトリクスタイプの分布を監視するには、[時間集計と空間集計][4]の両方で `avg` を使用します。カウントメトリクスタイプの分布を監視するには、[時間集計と空間集計][4]の両方で `sum` を使用します。時間・空間集計がどのように機能するかは、ガイド[グラフへのクエリ][5]を参照してください。

### 履歴メトリクスの送信

履歴メトリクス (過去 20 分以内のタイムスタンプのみ許可) を送信するには、[Datadog Forwarder](#with-the-datadog-forwarder) を使用する必要があります。[Datadog Lambda 拡張機能](#with-the-datadog-lambda-extension)は、StatsD プロトコルの制限により、現在のタイムスタンプを持つメトリクスしか送信できません。

### 多くのデータポイントを送信する

Forwarder を使用して、同じメトリクスと同じタグのセットに対して多くのデータポイントを送信する場合、例えば大きな `for` ループの内部では、Lambda に顕著なパフォーマンスの影響があり、CloudWatch のコストにも影響が出る可能性があります。アプリケーション内でデータポイントを集計することで、オーバーヘッドを回避することができます。

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

## ログまたはトレースからカスタムメトリクスを作成

ログベースのメトリクスを使用すると、クエリに一致するログの数を記録したり、リクエストの継続時間など、ログに含まれる数値を要約したりできます。ログベースのメトリクスは、インジェストストリーム全体からログデータを要約するコスト効率の高い方法です。[ログベースのメトリクスの生成][6]の詳細をご参照ください。

保持フィルターによりインデックス化されたかどうかにかわらず、取り込んだスパンのすべてからメトリクスを生成することも可能です。[スパンベースのメトリクスの生成][7]の詳細をご覧ください。
## Datadog Lambda 拡張機能を使用する

{{< img src="serverless/serverless_custom_metrics.png" alt="AWS Lambda からのカスタムメトリクスの収集" >}}

Datadog では、サポートされている Lambda ランタイムからの[**ディストリビューション**](#understanding-distribution-metrics)としてのカスタムメトリクスの送信には [Datadog Lambda 拡張機能][1]を使用することをお勧めしています。

1. Lambda ランタイムに適した一般的な[サーバーレスインストール手順][8]に従ってください。
1. Lambda 関数からトレースを収集しない場合は、環境変数 `DD_TRACE_ENABLED` を `false` に設定します。
1. Lambda 関数からログを収集しない場合は、環境変数 `DD_SERVERLESS_LOGS_ENABLED` を `false` に設定します。
1. 以下のサンプルコードまたは説明に従って、カスタムメトリクスを送信してください。

{{< programming-lang-wrapper langs="python,nodeJS,go,ruby,java,dotnet,other" >}}
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
    end
end
```

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

[java-dogstatsd-client][1] の最新版をインストールし、以下のサンプルコードに従ってカスタムメトリクスを[**ディストリビューション**](#understanding-distribution-metrics)として送信します。

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

[dogstatsd-csharp-client][1] の最新版をインストールし、以下のサンプルコードに従ってカスタムメトリクスを[**ディストリビューションメトリクス**](#understanding-distribution-metrics)として送信します。

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
2. [サンプルコード][2]に従って、カスタムトリクスを[**ディストリビューション**](#understanding-distribution-metrics)として送信します


[1]: /ja/developers/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /ja/developers/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Datadog Forwarder を使用する

Datadog では、Datadog Lambda 拡張機能によりサポートされていない Lambda ランタイムからのカスタムメトリクスの送信に [Datadog Forwarder Lambda][9] を使用することをおすすめしています。

1. 一般的な[サーバーレスのインストール手順][8]に従って、Datadog Forwarder Lambda 関数を使用して Lambda 関数をインスツルメントします。
1. Lambda 関数からトレースを収集しない場合は、Lambda 関数で環境変数 `DD_TRACE_ENABLED` を `false` に設定します。
1. Lambda 関数からログを収集しない場合は、Forwarder の CloudFormation スタックパラメーター `DdForwardLog` を `false` に設定します。
1. Datadog Lambda ライブラリから、`lambda_metric` または `sendDistributionMetric` などのヘルパー関数をインポートして使用し、以下のサンプルコードに従ってカスタムメトリクスを送信します。

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

## [非推奨] CloudWatch ログ

**このカスタムメトリクスの送信メソッドはもうサポートされておらず、すべての新しいお客様に対しては無効になっています。推奨ソリューションのいずれかに移行してください。**

**注**: いずれかの推奨ソリューションに移行する場合、Datadog に送信する際に、**新しいメトリクス名**でカスタムメトリクスのインスツルメントを開始する必要があります。ディストリビューションと非ディストリビューションメトリクスタイプの両方として、同じメトリクス名を同時に存在させることはできません。

これには、[Datadog IAM ポリシー][10]で次の AWS アクセス許可が必要です。

| AWS アクセス許可            | 説明                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `logs:DescribeLogGroups`  | 使用可能なロググループを一覧表示します。                                  |
| `logs:DescribeLogStreams` | グループで使用可能なログストリームを一覧表示します。                     |
| `logs:FilterLogEvents`    | ストリームの特定のログイベントを取得してメトリクスを生成します。 |

Lambda ログから Datadog にカスタムメトリクスを送信するには、次の形式を使用してログ行を出力します。

```text
MONITORING|<UNIX_EPOCH_タイムスタンプ>|<メトリクス値>|<メトリクスタイプ>|<メトリクス名>|#<タグリスト>
```

ここで、

- `MONITORING` は、このログエントリを収集する必要があることを Datadog インテグレーションに通知します。
- `<UNIX_EPOCH_TIMESTAMP>` は秒単位です。ミリ秒ではありません。
- `<METRIC_VALUE>` は、数値 (整数または浮動小数点数) でなければなりません。
- `<METRIC_TYPE>` は、`count`、`gauge`、`histogram`、または `check` です。
- `<METRIC_NAME>` は、[メトリクス命名ポリシー][11]に従ってメトリクスを一意に識別します。
- `<タグリスト>` はオプションです。先頭に `#` が付いたカンマ区切りリストです。カスタムメトリクスには、自動的にタグ `function_name:<関数の名前>` が適用されます。

**注**: 各タイムスタンプに対する合計がカウントとして使用され、特定のタイムスタンプの最後の値がゲージとして使用されます。メトリクスをインクリメントするたびにログステートメントを出力することは、ログのパースにかかる時間が増大するため、お勧めしません。コードでメトリクスの値を継続的に更新し、関数が終了する前にメトリクスに 1 つのログステートメントを出力してください。

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