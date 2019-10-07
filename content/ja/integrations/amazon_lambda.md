---
aliases:
  - /ja/integrations/awslambda/
categories:
  - cloud
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: Lambda の実行、エラー、呼び出しの回数などを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_lambda/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/how-to-monitor-lambda-functions/'
    tag: ブログ
    text: Lambda 関数の監視方法
  - link: 'https://www.datadoghq.com/blog/datadog-lambda-layer/'
    tag: ブログ
    text: Datadog
    の Lambda レイヤー: カスタムサーバーレスメトリクスの監視'
git_integration_title: amazon_lambda
has_logo: true
integration_title: Amazon Lambda
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_lambda
public_title: Datadog-Amazon Lambda インテグレーション
short_description: Lambda の実行、エラー、呼び出しの回数などを追跡
version: '1.0'
---
## 概要

Amazon Lambda は、イベントに応答してコードを実行し、そのコードが必要とするコンピューティングリソースを自動的に管理するコンピューティングサービスです。

このインテグレーションを有効にすると、Lambda 関数から Cloudwatch メトリクスやカスタムメトリクスが収集されるようになります。

Datadog は AWS Lambda の言語に応じて以下の機能をサポートします。

|                                    | Python                                                                                              | Node                                                                                               | Java                                    | Go                                                                                               | Ruby                                                     | .NET & Core                             |
|------------------------------------|----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|-----------------------------------------|--------------------------------------------------------------------------------------------------|----------------------------------------------------------|-----------------------------------------|
| [Lambda ランタイムメトリクス](#metrics) | {{< X >}}                                                                                          | {{< X >}}                                                                                          | {{< X >}}                               | {{< X >}}                                                                                        | {{< X >}}                                                | {{< X >}}                               |
| [トレーシング](#trace-collection)       | {{< X >}}                                                                                          | {{< X >}}                                                                                          | {{< X >}}                               | {{< X >}}                                                                                        | {{< X >}}                                                | {{< X >}}                               |
| [カスタムメトリクス](#custom-metrics)  | [Lambda レイヤー](#installing-and-using-the-datadog-layer)                                            | [Lambda レイヤー](#installing-and-using-the-datadog-layer)                                            | [ログから送信](#using-cloudwatch-logs) | [Go パッケージ](#installing-and-using-the-datadog-layer)                                            | [Lambda レイヤー](#installing-and-using-the-datadog-layer)  | [ログから送信](#using-cloudwatch-logs) |
| [ロギング](#log-collection)         | {{< X >}}                                                                                          | {{< X >}}                                                                                          | {{< X >}}                               | {{< X >}}                                                                                        | {{< X >}}                                                | {{< X >}}                               |

ホストに依存しないエンドツーエンドの分散型トレーシングを使用すると、Lambda 上でも Datadog Agent を実行しているホスト上でも、インフラストラクチャー全体を行き来するようなリクエストをトレースできます。基本的に、いくつかの X-Ray トレースが組み合わされて Datadog APM トレースに変換され、システムの全体像にアクセスできるようになります。

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Lambda` をオンにします。

2. Amazon Lambda のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。Lambda ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

    | AWS アクセス許可            | 説明                                                 |
    | ------------------------- | ----------------------------------------------------------- |
    | `lambda:List*`            | Lambda 関数、メタデータ、およびタグを一覧表示します。                |
    | `logs:DescribeLogGroups`  | 使用できるロググループを一覧表示します。                                |
    | `logs:DescribeLogStreams` | 特定のグループで使用できるログストリームを一覧表示します。                   |
    | `logs:FilterLogEvents`    | ストリームの特定のログイベントを取得してメトリクスを生成します。|
    | `tag:GetResources`        | Lambda 関数に適用されたカスタムタグを取得します。              |

3. [Datadog - AWS Lambda インテグレーション][5]をインストールします。

完了したら、[Datadog Serverless UI][6] にすべての Lambda 関数が表示されます。この UI は、サーバーレスアプリケーションを実行している AWS Lambda 関数からのメトリクス、トレース、ログを 1 つのビューにまとめて表示します。この機能の詳細については、[Datadog Serverless のドキュメント][7]を参照してください。

### ログの収集

1. [Datadog ログ収集 AWS Lambda 関数][8]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、Datadog に Lambda ログを転送する方法を以下の 2 つから選択します。

    * 自動: 必要なアクセス許可を Datadog に提供していただくことで、Datadog がログ収集 Lambda トリガーを管理します。[自動ログ収集を構成するには、メイン Amazon Web サービスを参照してください][9]。
    * 手動: [こちらの手順][10]に従って、AWS コンソールで Lambda ログを含む Cloudwatch ロググループに手動でトリガーを追加します。

完了したら、[Datadog Log セクション][11]に移動し、ログを確認します。

### トレースの収集

Datadog は [AWS X-Ray][12] と統合して、Lambda ベースのアプリケーションからサーバーレストレースを収集し、[サーバーレス UI][6] でそれらを視覚化します。このインテグレーションのセットアップの詳細については、[Datadog Serverless のドキュメント][7]を参照してください。

### カスタムメトリクス

Lambda 関数が Python ランタイムを使用する場合は、カスタムメトリクスを収集して送信するために、Datadog Lambda Layer をインストールします。Datadog Lambda レイヤーから送信されたメトリクスは自動的に[ディストリビューション][13]に集計され、平均、合計、最大、最小、カウントや、50、75、95、99 パーセンタイル値をグラフ化できます。別のランタイムを使用している場合は、Datadog によってピックアップされてメトリクスに解析される特殊な形式でカスタムメトリクスのログを収集します。

#### Datadog レイヤーのインストールと使用

Datadog の Lambda レイヤーは、Python、Node、および Ruby をサポートします。プロジェクトに[パッケージ][23]を含めることで Go もサポートされます。ほかにも Datadog のサポートを希望するランタイムがある場合は、[Datadog のサポートチーム][14]までお問い合わせください。

1. AWS コンソールでレイヤーを追加する対象の Lambda 関数に移動します。
2. 関数のメインページで **Layers** をクリックします。
3. 下にスクロールし、**Provide a layer version ARN** をクリックします。
4. 以下の形式で ARN を入力し、目的のリージョン、ランタイム、下の表にある最新の Lambda レイヤーバージョンを指定します。

    ~~~
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
    ~~~

    たとえば、以下のとおりです。

    ~~~
    arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:3
    ~~~

    | 言語 | ランタイム                                                    | リリース             |
    |----------|------------------------------------------------------------|----------------------|
    | Python   | `Python27`、`Python36`、`Python37`                         | [最新リリース][21] |
    | Node     | `Node8-10`、`Node10-x`                                     | [最新リリース][22] |
    | Ruby     | `Ruby`                                                     | [最新リリース][25] |

    **Go ユーザー:** Go は静的にコンパイルされるため、Lambda レイヤーを使用する代わりに、[このパッケージ][23]をプロジェクトに含める必要があります。

5. 関数の **Environment Variables** セクションに移動し、次の環境変数をご使用の [Datadog API キー][15]に設定します。
    * DD_API_KEY または DD_KMS_API_KEY (KMS によって暗号化される場合)
6. **完全に非同期の準リアルタイムのカスタムメトリクス**の場合は、オプションとして環境変数 `DD_FLUSH_TO_LOG` を `True` に設定します。これで、API 呼び出しではなく CloudWatch ログからメトリクスが送信されます。**注**: このオプションを使用するには、**最新版**の [Datadog ログ収集 AWS Lambda 関数][8]をセットアップする必要があります。常に CloudWatch ログからメトリクスを転送する場合は、通常のログが Datadog に転送されないように、[Datadog ログ収集 AWS Lambda 関数][8]で環境変数 `DD_FORWARD_LOG` を `False` に設定する**必要があります**。

関数コードで、レイヤーから必要なメソッドをインポートし、関数ハンドラーのラッパーを追加します。

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog_lambda.metric import lambda_metric
from datadog_lambda.wrapper import datadog_lambda_wrapper


@datadog_lambda_wrapper
def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # メトリクス名
        12.45,                                  # メトリクス値
        tags=['product:latte', 'order:online']  # 関連付けられたタグ
    )
```

{{% /tab %}}
{{% tab "Node" %}}

```javascript
const { datadog, sendDistributionMetric } = require("datadog-lambda-js");

async function myHandler(event, context) {
  sendDistributionMetric(
    "coffee_house.order_value",       // メトリクス名
    12.45,                            // メトリクス値
    "product:latte", "order:online"   // 関連付けられたタグ
  );
  return {
    statusCode: 200,
    body: "hello, dog!",
  };
}
// ハンドラー関数をラップします
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
  // ハンドラー関数をラップします
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
    # ハンドラー関数をラップします
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
{{< /tabs >}}

カスタムメトリクスを報告するメソッドの引数には次の要件があります。

```
lambda_metric(<METRIC_NAME>, <METRIC_VALUE>, tags=[<TAG_LIST>])
```

ここで、

* `<METRIC_NAME>` は、[メトリクス命名ポリシー][16]に従ってメトリクスを一意に識別します。

* `<METRIC_VALUE>` は、数値 (整数または浮動小数点数) でなければなりません。

* `<TAG_LIST>` はオプションです。`['owner:Datadog', 'env:demo', 'cooltag']` のように書式設定されます。

**注**: 現在、1 つのメトリクスに適用できるタグは最大 3 個です。これらのメトリクスに 4 個以上のタグが必要な場合、オーガニゼーションの制限を引き上げるには、[Datadog のサポートチーム][14]までお問合せください。

Lambda レイヤーのインストールと構成の詳細な手順については、[AWS のメインドキュメント][17]を参照してください。

#### VPC での実行

Lambda 関数が VPC と関連付けられ、カスタムメトリクスを同期的に送信する場合は、[公共のインターネットにアクセス][24]できる必要があります。


#### CloudWatch ログの使用

Lambda ログから Datadog にカスタムメトリクスを送信するには、次の形式を使用して、Lambda からログ行を出力します。

```
MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>
```

ここで、

* `MONITORING` は、このログエントリを収集する必要があることを Datadog インテグレーションに通知します。

* `<UNIX_EPOCH_TIMESTAMP>` は秒単位です。ミリ秒ではありません。

* `<METRIC_VALUE>` は、数値 (整数または浮動小数点数) でなければなりません。

* `<METRIC_TYPE>` は、`count`、`gauge`、`histogram`、または `check` です。

* `<METRIC_NAME>` は、[メトリクス命名ポリシー][16]に従ってメトリクスを一意に識別します。

* `<TAG_LIST>` はオプションです。先頭に `#` が付いたカンマ区切りリストです。
    カスタムメトリクスには、自動的にタグ `function_name:<name_of_the_function>` が適用されます。

**注**: 各タイムスタンプに対する合計がカウントとして使用され、特定のタイムスタンプの最後の値がゲージとして使用されます。メトリクスをインクリメントするたびにログステートメントを出力することは、ログのパースにかかる時間が増大するため、お勧めしません。コードでメトリクスの値を継続的に更新し、関数が終了する前にメトリクスに 1 つのログステートメントを出力してください。

[公共のインターネット][20]にアクセスできない場合、Lambda レイヤーは [VPC][19] で機能しません。VPC を使用している場合は、Datadog がカスタムメトリクスをパースできるように、CloudWatch ログにカスタムメトリクスを記録してください。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_lambda" >}}


AWS から取得される各メトリクスには、関数名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

カスタムメトリクスには関数名だけがタグ付けされます。

### イベント
AWS Lambda インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS Lambda インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][14]までお問合せください。

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_lambda.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_lambda
[6]: https://app.datadoghq.com/functions
[7]: https://docs.datadoghq.com/ja/graphing/infrastructure/serverless
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#set-up-the-datadog-lambda-function
[9]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#automatically-setup-triggers
[10]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#manually-setup-triggers
[11]: https://app.datadoghq.com/logs
[12]: https://aws.amazon.com/xray
[13]: https://docs.datadoghq.com/ja/developers/metrics/distributions
[14]: https://docs.datadoghq.com/ja/help
[15]: https://app.datadoghq.com/account/settings#api
[16]: https://docs.datadoghq.com/ja/developers/metrics
[17]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[18]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_lambda/amazon_lambda_metadata.csv
[19]: https://docs.datadoghq.com/ja/integrations/amazon_vpc/
[20]: https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function/
[21]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[22]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[23]: https://github.com/DataDog/datadog-lambda-go/releases
[24]: https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function/
[25]: https://github.com/DataDog/datadog-lambda-layer-rb/releases


{{< get-dependencies >}}