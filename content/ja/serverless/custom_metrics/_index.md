---
title: カスタムメトリクス
kind: ドキュメント
---
## 概要

Lambda 関数から Datadog へカスタムメトリクスを送信するにはいくつかの異なる方法があります。

- **ログまたはトレースからカスタムメトリクスを作成**: すでに Lambda 関数からトレースまたはログデータが Datadog に送信されていて、クエリを作成するデータが既存のログまたはトレースにキャプチャされている場合は、再デプロイしたりアプリケーションコードに変更を加えたりせずに[ログおよびトレースからカスタムメトリクスを作成](#creating-custom-metrics-from-logs-or-traces)できます。
- **Datadog Lambda 拡張機能を使用してカスタムメトリクスを送信**: カスタムメトリクスを直接 Lambda 関数から送信する場合、Datadog では [Datadog Lambda 拡張機能](#with-the-datadog-lambda-extension)の使用をおすすめしています。お使いの Lambda 関数ランタイムで [Datadog Lambda 拡張機能がサポートされているかどうかをご確認][1]ください。
- **Datadog Forwarder Lambda を使用してカスタムメトリクスを送信**: Datadog Lambda 拡張機能でサポートされていないランタイムからカスタムメトリクスを送信する場合は、[Datadog Forwarder Lambda](#with-the-datadog-forwarder) を使用します。
- **(非推奨) CloudWatch ログからカスタムメトリクスを送信**: `MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>` 形式のログを出力してカスタムメトリクスを送信する方法は[非推奨](#deprecated-cloudwatch-logs)となりました。上記のいずれかの方法に移行してください。
- **(非推奨) サードパーティのライブラリを使用**: ほとんどのサードパーティライブラリは、メトリクスをディストリビューションとして送信しないため、実際数より少なく数えられる恐れがあります。

### ディストリビューションメトリクスについて

Lambda 関数から送信されたカスタムメトリクスは、基底のホストからは独立してアプリケーションをインスツルメントするよう設計されているため、[ディストリビューション][2]として集計されます。メトリクスのクエリは、`avg`、`sum`、`max`、`min`、`count` の集計を使用して作成できます。また、パーセンタイル集計 (p50、p75、p90、p95、p99) を有効にしたり、Metric Summary ページで集計用に[タグを管理][3]したりすることも可能です。

## ログまたはトレースからカスタムメトリクスを作成

ログベースのメトリクスを使用すると、クエリに一致するログの数を記録したり、リクエストの継続時間など、ログに含まれる数値を要約したりできます。ログベースのメトリクスは、インジェストストリーム全体からログデータを要約するコスト効率の高い方法です。ログベースのメトリクスの生成について、詳しくは[こちら][4]をご参照ください。

保持フィルターによりインデックス化されたかどうかにかわらず、取り込んだスパンのすべてからメトリクスを生成することも可能です。スパンベースのメトリクスの生成について、詳しくは[こちら][5]を参照してください。
## Datadog Lambda 拡張機能を使用する

{{< img src="serverless/serverless_custom_metrics.png" alt="AWS Lambda からのカスタムメトリクスの収集" >}}

Datadog では、サポートされている Lambda ランタイムからのカスタムメトリクスの送信には [Datadog Lambda 拡張機能][1]を使用することをお勧めしています。

1. 標準の[サーバーレスインストール手順][6]に従い Lambda 関数を構成し、Datadog Lambda ライブラリおよび拡張機能をインストールします。
1. Lambda 関数からトレースを収集しない場合は、環境変数 `DD_TRACE_ENABLED` を `false` に設定します。
1. Lambda 関数からログを収集しない場合は、環境変数 `DD_SERVERLESS_LOGS_ENABLED` を `false` に設定します。
1. Datadog Lambda ライブラリから、`lambda_metric` または `sendDistributionMetric` などのヘルパー関数をインポートして使用し、[サンプルコード](#custom-metrics-sample-code)に続けてカスタムメトリクスを送信します。

Lambda 関数が VPC で実行している場合、パブリックインターネット、[PrivateLink][7]、または[プロキシ][8]のいずれかを使用して関数が Datadog API エンドポイントに到達することを確認します。

## Datadog Forwarder を使用する

Datadog では、Datadog Lambda 拡張機能によりサポートされていない Lambda ランタイムからのカスタムメトリクスの送信に [Datadog Forwarder Lambda][9] を使用することをおすすめしています。

1. 標準の[サーバーレスインストール手順][6]に従い Lambda 関数を構成し、Datadog Lambda ライブラリおよび Datadog Forwarder Lambda 拡張機能をインストールして Forwarder を関数のロググループにサブスクライブします。
1. Lambda 関数からトレースを収集しない場合は、Lambda 関数で環境変数 `DD_TRACE_ENABLED` を `false` に設定します。
1. Lambda 関数からログを収集しない場合は、Forwarder の CloudFormation スタックパラメーター `DdForwardLog` を `false` に設定します。
1. Datadog Lambda ライブラリから、`lambda_metric` または `sendDistributionMetric` などのヘルパー関数をインポートして使用し、[サンプルコード](#custom-metrics-sample-code)に続けてカスタムメトリクスを送信します。

Datadog Lambda ライブラリをランタイムに使用できない場合は、予期される JSON 形式でメトリクスを CloudWatch ログに出力できます。[サンプルコード](#custom-metrics-sample-code)セクションで「Other」タブを選択します。

## カスタムメトリクスのコード例

**注:** カスタムメトリクスを報告するメソッドの引数には次の要件があります。

- `<METRIC_NAME>` は、[メトリクス命名ポリシー][10]に従ってメトリクスを一意に識別します。
- `<METRIC_VALUE>` は、数値 (整数または浮動小数点数) でなければなりません。
- `<TAG_LIST>` はオプションです。`['owner:Datadog', 'env:demo', 'cooltag']` のように書式設定されます。

{{< programming-lang-wrapper langs="python,nodeJS,go,ruby,java,other" >}}
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
        12.45, // メトリクス値
        'product:latte', // 最初のタグ
        'order:online' // 2 番目のタグ
    );
    return {
        statusCode: 200,
        body: 'hello, dog!'
    };
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
  // ラップする必要があるのは関数ハンドラーだけです（ヘルパー関数ではありません）。
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
  /* または、手動構成オプションを使用します
  lambda.Start(ddlambda.WrapFunction(myHandler, &ddlambda.Config{
    BatchInterval: time.Second * 15
    APIKey: "my-api-key",
  }))
  */
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  ddlambda.Distribution(
    "coffee_house.order_value",     // メトリクス名
    12.45,                          // メトリクス値
    "product:latte", "order:online" // 関連付けられたタグ
  )
  // ...
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
        return { statusCode: 200, body: 'Hello World' }
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

これには、[Datadog IAM ポリシー][0]で次の AWS アクセス許可が必要です。

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
- `<METRIC_NAME>` は、[メトリクス命名ポリシー][10]に従ってメトリクスを一意に識別します。
- `<タグリスト>` はオプションです。先頭に `#` が付いたカンマ区切りリストです。カスタムメトリクスには、自動的にタグ `function_name:<関数の名前>` が適用されます。

**注**: 各タイムスタンプに対する合計がカウントとして使用され、特定のタイムスタンプの最後の値がゲージとして使用されます。メトリクスをインクリメントするたびにログステートメントを出力することは、ログのパースにかかる時間が増大するため、お勧めしません。コードでメトリクスの値を継続的に更新し、関数が終了する前にメトリクスに 1 つのログステートメントを出力してください。

[1]: /ja/serverless/libraries_integrations/extension/
[2]: /ja/metrics/distributions/
[3]: /ja/metrics/distributions/#customize-tagging
[4]: /ja/logs/logs_to_metrics/
[5]: /ja/tracing/generate_metrics/
[6]: /ja/serverless/installation/
[7]: /ja/agent/guide/private-link/
[8]: /ja/agent/proxy/
[9]: /ja/serverless/forwarder/
[10]: /ja/developers/metrics/
