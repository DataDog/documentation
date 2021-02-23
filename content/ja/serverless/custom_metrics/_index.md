---
title: カスタムメトリクス
kind: ドキュメント
---
Lambda 関数でトレースまたはログデータを Datadog に送信していて、クエリを作成したいデータが既存のログまたはトレースに取得される場合、アプリケーションのコードを再デプロイまたは変更せずに、[ログおよびトレースからカスタムメトリクスを生成](#creating-custom-metrics-from-logs-or-traces)することが可能です。既存のログまたはトレースに取得されなかった新しいデータを送信する場合は、[Datadog Lambda ライブラリを使用してカスタムメトリクスを送信](#sending-custom-metrics-from-the-datadog-lambda-library)できます。

## ログまたはトレースからカスタムメトリクスを作成

ログベースのメトリクスを使用すると、クエリに一致するログの数を記録したり、リクエストの継続時間など、ログに含まれる数値を要約したりできます。ログベースのメトリクスは、インジェストストリーム全体からログデータを要約するコスト効率の高い方法です。ログベースのメトリクスの生成について、詳しくは[こちら][1]をご参照ください。 

保持フィルターによりインデックス化されたかどうかにかわらず、取り込んだスパンのすべてからメトリクスを生成することも可能です。スパンベースのメトリクスの生成について、詳しくは[こちら][2]を参照してください。

## Datadog Lambda ライブラリからカスタムメトリクスを送信

{{< img src="integrations/amazon_lambda/lambda_custom_metrics.png" alt="AWS Lambda からカスタムメトリクスを収集するためのアーキテクチャ図" >}}

Datadog Lambda ライブラリをインストールして、カスタムメトリクスを収集して送信します。Datadog Lambda ライブラリから送信されたメトリクスは、自動的に[ディストリビューション][3]に集計されるため、`avg`、`sum`、`max`、`min`、`count` をグラフ化できます。また、[ディストリビューションメトリクス][3]ページで、50、75、95、99 パーセンタイル値のタグセットの集計を計算できます。

ディストリビューションメトリクスは、基底のホストとは無関係に、サービスなどの論理オブジェクトをインスツルメントするように設計されています。したがって、Agent を使用してローカルにメトリクスを集計するのではなく、サーバー側のメトリクスを集計するため、サーバーレスインフラストラクチャーに適しています。

### 同期カスタムメトリクスと非同期カスタムメトリクス

Datadog Lambda ライブラリは、Lambda で同期および非同期の両方によるカスタムメトリクスの送信をサポートしています。

**同期**: デフォルトの動作。このメソッドは、定期的（10 秒ごと）および Lambda 呼び出しの終了時に HTTP 経由でカスタムメトリクスを Datadog に送信します。呼び出しの継続時間が 10 秒未満の場合、カスタムメトリクスは呼び出しの終了時に送信されます。

**非同期（推奨）**: レイテンシーオーバーヘッドなしでカスタムメトリクスを送信し、**かつ**それらをほぼリアルタイムで Datadog に表示することができます。これを実現するために、Lambda ライブラリはカスタムメトリクスを特別にフォーマットされたログとして出力し、これを [Datadog Forwarder][4] が解析して Datadog に送信します。AWS Lambda でのロギングは 100% 非同期であるため、このメソッドにより、関数へのレイテンシーオーバーヘッドがゼロになります。

### 非同期カスタムメトリクスの有効化

1. Lambda 関数で環境変数 `DD_FLUSH_TO_LOG` を `True` に設定します。
2. [Datadog Forwarder][4] をバージョン 1.4.0 以上に更新します。

Datadog ログを使用していない場合でも、非同期のカスタムメトリクス送信を使用できます。[Datadog ログコレクション AWS Lambda 関数][4]で環境変数 `DD_FORWARD_LOG` を `False` に設定します。これにより、カスタムメトリクスのみが Datadog にインテリジェントに転送され、通常のログは転送されません。

### カスタムメトリクスのコード例

関数コードで、Lambda ライブラリから必要なメソッドをインポートし、関数ハンドラーのラッパーを追加します。ヘルパー関数をラップする必要はありません。

**注:** カスタムメトリクスを報告するメソッドの引数には次の要件があります。

- `<METRIC_NAME>` は、[メトリクス命名ポリシー][5]に従ってメトリクスを一意に識別します。
- `<METRIC_VALUE>` は、数値 (整数または浮動小数点数) でなければなりません。
- `<TAG_LIST>` はオプションです。`['owner:Datadog', 'env:demo', 'cooltag']` のように書式設定されます。

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog_lambda.metric import lambda_metric
from datadog_lambda.wrapper import datadog_lambda_wrapper

# ラップする必要があるのは関数ハンドラーだけです（ヘルパー関数ではありません）。 
@datadog_lambda_wrapper
def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # メトリクス名
        12.45,                                  # メトリクス値
        tags=['product:latte', 'order:online']  # 関連付けられたタグ
    )
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
const { datadog, sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // メトリクス名
        12.45, // メトリクス値
        'product:latte',
        'order:online' // 関連付けられたタグ
    );
    return {
        statusCode: 200,
        body: 'hello, dog!'
    };
}
// ラップする必要があるのは関数ハンドラーだけです（ヘルパー関数ではありません）。
module.exports.myHandler = datadog(myHandler);

/* または、手動構成オプションを使用します
module.exports.myHandler = datadog(myHandler, {
    apiKey: "my-api-key"
});
*/
```

{{% /tab %}}
{{% tab "Go" %}}

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  // ラップする必要があるのは関数ハンドラーだけです（ヘルパー関数ではありません）。
  lambda.Start(ddlambda.WrapHandler(myHandler, nil))
  /* または、手動構成オプションを使用します
  lambda.Start(ddlambda.WrapHandler(myHandler, &ddlambda.Config{
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

{{% /tab %}}
{{% tab "Ruby" %}}

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

{{% /tab %}}
{{% tab "Java" %}}

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, lambda);

        Map<String,String> myTags = new HashMap<String, String>();
            myTags.put("product", "latte");
            myTags.put("order","online");

        dd.metric(
            "coffee_house.order_value", // メトリクス名
            12.45,                      // メトリクスの値
            myTags);                    // 関連タグ
    }
}
```

{{% /tab %}}
{{% tab "他のランタイム" %}}


[非同期カスタムメトリクス](#synchronous-vs-asynchronous-custom-metrics)の発行は、任意の言語またはカスタムランタイムで可能です。[Datadog Forwarder][1] が識別し、Datadog に送信する Lambda 関数に特別な JSON 形式の文字列を出力することで機能します。これを使用するには:

1. [非同期カスタムメトリクスを有効にします](#enabling-asynchronous-custom-metrics)
2. 次の形式でカスタムメトリクスをログする再利用可能な関数を作成します。

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

**注:** これらのカスタムメトリクスは、[ディストリビューション](#custom-metrics)として送信されます。以前に別の方法でカスタムメトリクスを送信していた場合は、[ディストリビューションへのアップグレードの影響に関するドキュメントを参照してください](#understanding-distribution-metrics)。

[1]: /ja/serverless/forwarder/
{{% /tab %}}
{{< /tabs >}}

### カスタムメトリクスのタグ付け

[Datadog Lambda ライブラリ][6] を使用して送信する場合、カスタムメトリクスにタグを付ける必要があります。[ディストリビューションメトリクス][3]ページを使用して、カスタムメトリクスに適用される[タグのセットをカスタマイズ][7]します。

カスタムメトリクスに Lambda リソースタグを追加するには、Datadog Forwarder CloudFormation Stack でパラメーター `DdFetchLambdaTags` を `true` に設定します。

### ディストリビューションメトリクスについて

ディストリビューションメトリクスでは、送信時に指定する代わりにグラフ化または照会するときに、集計を選択します。

以前に Datadog Lambda ライブラリのいずれかを使用せずに Lambda からカスタムメトリクスを送信した場合、それらを Datadog に送信するときに、**新しいメトリクス名**でカスタムメトリクスのインスツルメントを開始する必要があります。ディストリビューションと非ディストリビューションメトリクスタイプの両方として、同じメトリクス名を同時に存在させることはできません。

ディストリビューションメトリクスのパーセンタイル集計を有効にするには、[ディストリビューションメトリクス][7]のページを参照してください。

## その他の送信方法

### VPC での実行

Datadog Lambda ライブラリは、カスタムメトリクスを**同期**送信するために[パブリックインターネットへのアクセス][8]を必要とします。Lambda 関数が VPC に関連付けられている場合は、代わりにカスタムメトリクスを**非同期**送信するか、関数がパブリックインターネットに到達できることを確認してください。

### サードパーティライブラリの使用

カスタムメトリクスを Datadog に簡単に送信できるオープンソースライブラリは多数あります。ただし、多くは Lambda 用に最適化された[ディストリビューションメトリクス][3]を使用するように更新されていません。ディストリビューションメトリクスは、ホストまたはローカルで実行される[エージェント][9]に依存しないサーバー側の集計を可能にします。エージェントのないサーバーレス環境では、ディストリビューションメトリクスにより柔軟な集計とタグ付けが可能になります。

AWS Lambda 用のサードパーティのメトリクスライブラリを評価する場合は、それがディストリビューションメトリクスをサポートしていることを確認してください。

### [非推奨] CloudWatch ログの使用

**このカスタムメトリクスの送信メソッドはもうサポートされておらず、すべての新しいお客様に対しては無効になっています。**Lambda からカスタムメトリクスを送信する場合は、[Datadog Lambda ライブラリ][6]を使うことが推奨されます。

これには、[Datadog IAM ポリシー][10]で次の AWS アクセス許可が必要です。

| AWS アクセス許可            | 説明                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `logs:DescribeLogGroups`  | 使用可能なロググループを一覧表示します。                                  |
| `logs:DescribeLogStreams` | グループで使用可能なログストリームを一覧表示します。                     |
| `logs:FilterLogEvents`    | ストリームの特定のログイベントを取得してメトリクスを生成します。 |

**[非推奨]** Lambda ログから Datadog にカスタムメトリクスを送信するには、次の形式を使用してログ行を出力します。

```text
MONITORING|<UNIX_EPOCH_タイムスタンプ>|<メトリクス値>|<メトリクスタイプ>|<メトリクス名>|#<タグリスト>
```

ここで、

- `MONITORING` は、このログエントリを収集する必要があることを Datadog インテグレーションに通知します。
- `<UNIX_EPOCH_TIMESTAMP>` は秒単位です。ミリ秒ではありません。
- `<METRIC_VALUE>` は、数値 (整数または浮動小数点数) でなければなりません。
- `<METRIC_TYPE>` は、`count`、`gauge`、`histogram`、または `check` です。
- `<METRIC_NAME>` は、[メトリクス命名ポリシー][5]に従ってメトリクスを一意に識別します。
- `<タグリスト>` はオプションです。先頭に `#` が付いたカンマ区切りリストです。カスタムメトリクスには、自動的にタグ `function_name:<関数の名前>` が適用されます。

**注**: 各タイムスタンプに対する合計がカウントとして使用され、特定のタイムスタンプの最後の値がゲージとして使用されます。メトリクスをインクリメントするたびにログステートメントを出力することは、ログのパースにかかる時間が増大するため、お勧めしません。コードでメトリクスの値を継続的に更新し、関数が終了する前にメトリクスに 1 つのログステートメントを出力してください。

[1]: /ja/logs/logs_to_metrics/
[2]: /ja/tracing/generate_metrics/
[3]: https://docs.datadoghq.com/ja/metrics/distributions/
[4]: /ja/serverless/forwarder/
[5]: /ja/developers/metrics/
[6]: /ja/serverless/installation/
[7]: /ja/metrics/distributions/#customize-tagging
[8]: https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function
[9]: /ja/agent/
[10]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation