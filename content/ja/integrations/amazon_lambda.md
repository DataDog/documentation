---
aliases:
  - /ja/integrations/awslambda/
  - /ja/serverless/real-time-enhanced-metrics/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Lambda の実行、エラー、呼び出しの回数などを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_lambda/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/how-to-monitor-lambda-functions/'
    tag: ブログ
    text: Lambda 関数の監視方法
  - link: 'https://www.datadoghq.com/blog/datadog-lambda-layer/'
    tag: ブログ
    text: 'Datadog の Lambda レイヤー: カスタムサーバーレスメトリクスの監視'
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

このインテグレーションを有効にすると、CloudWatch メトリクスが収集されるようになります。このページでは、Lambda 関数のカスタムメトリクス、ログ、トレースを設定する方法についても説明します。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

{{< img src="integrations/amazon_lambda/lambda_metrics.png" alt="AWS Lambda からランタイムメトリクスを収集するためのアーキテクチャ図" >}}

#### AWS Lambda メトリクス

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Lambda` をオンにします。
2. Amazon Lambda のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。Lambda ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

    | AWS アクセス許可     | 説明                                  |
    | ------------------ | -------------------------------------------- |
    | `lambda:List*`     | Lambda 関数、メタデータ、およびタグを一覧表示します。   |
    | `tag:GetResources` | Lambda 関数に適用されたカスタムタグを取得します。 |

3. [Datadog - AWS Lambda インテグレーション][5]をインストールします。

完了したら、[Datadog Serverless ビュー][6]にすべての Lambda 関数が表示されます。このページは、サーバーレスアプリケーションを実行している AWS Lambda 関数からのメトリクス、トレース、ログを 1 つのビューにまとめて表示します。この機能の詳細については、[Datadog Serverless のドキュメント][7]を参照してください。

#### リアルタイムの拡張 Lambda メトリクス

Datadog では、Node.js、Python、Ruby ランタイム用のリアルタイム Lambda ランタイムメトリクスを追加設定なしで生成できます。

Datadog は、Datadog Lambda レイヤーと Datadog Forwarder を使用して、低レイテンシー、数秒の粒度、およびコールドスタートとカスタムタグの詳細なメタデータを備えたメトリクスを生成できます。

| メトリクス                                  | 説明                                                                                                                                        |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **aws.lambda.enhanced.invocations**     | イベントまたは呼び出し API コールに応答して関数が呼び出された回数を測定します。                                                 |
| **aws.lambda.enhanced.errors**          | 関数のエラー（応答コード 4XX）が原因で失敗した呼び出しの数を測定します。                                                  |
| **aws.lambda.enhanced.max_memory_used** | 関数が使用するメモリの量を測定します。                                                                                                |
| **aws.lambda.enhanced.duration**        | 関数コードが呼び出しの結果として実行を開始してから、実行を停止するまでの平均経過時間を測定します。 |
| **aws.lambda.enhanced.billed_duration** | 請求対象となる関数が実行された時間を測定します（100 ミリ秒単位）。                                                                        |
| **aws.lambda.enhanced.init_duration** | コールドスタート時の関数の初期化時間を計測します。                                  |
| **aws.lambda.enhanced.estimated_cost**  | 関数呼び出しの推定総コスト（米ドル）を測定します。                                                                         |
| **aws.lambda.enhanced.timeouts**  | 関数がタイムアウトした回数を測定します。                        |
| **aws.lambda.enhanced.out_of_memory**  | 関数がメモリー不足になった回数を測定します。                        |

これらのメトリクスは、`functionname`、`cold_start`、`memorysize`、`region`、`account_id`、`allocated_memory`、`executedversion`、`resource`、`runtime` でタグ付けされています。これらは [DISTRIBUTION][8] タイプのメトリクスであるため、その `count`、`min`、`max`、`sum`、`avg` を表示できます。

##### 拡張リアルタイム Lambda メトリクスの有効化

1. [Datadog Forwarder][9] をバージョン 3.0.0 以上に設定または更新します。
2. [Datadog Lambda レイヤー][10] を、これらのメトリクスが必要な関数にインストールします（[Python の場合はレイヤーバージョン 9+][11]、[Node.js の場合はレイヤーバージョン 6+][12]、[Ruby の場合はレイヤーバージョン 5+][13]、[Go の場合はパッケージバージョン 0.5.0+][14]、[Java の場合はパッケージバージョン 0.0.2+][15]）。
3. Lambda 関数に適用されたカスタムタグでこれらのメトリクスに自動的にタグを付けるには、Datadog Forwarder のバージョン 3.0.0 以降を実行していることを確認してください。次に、Datadog Forwarder CloudFormation Stack でパラメーター `DdFetchLambdaTags` を `true` に設定します。
4. [サンプルコード](#custom-metrics-sample-code)に示すように、AWS Lambda 関数ハンドラーを Datadog ライブラリでラップします。[Datadog サーバーレスプラグイン][16]は、すべての Python および Node.js 関数ハンドラーを自動的にラップできます。
5. [Enhanced Lambda Metrics Default Dashboard][17] を参照します。

**注:** これらのメトリクスはデフォルトで有効になっていますが、[非同期](#synchronous-vs-asynchronous-custom-metrics)で**のみ**送信されます。これは CloudWatch Logs を介して Datadog Forwarder に送信されます。つまり、CloudWatch のログの量が増加します。これは AWS の請求額に影響する場合があります。オプトアウトするには、AWS Lambda 関数で `DD_ENHANCED_METRICS` 環境変数を `false` に設定します。

呼び出しとエラーメトリクスは Datadog Lambda レイヤーによって生成され、その他は Datadog Forwarder によって生成されます。

**注:** Lambda 関数に適用された[タグ][18]は、自動的にメトリクスを分析するための新しいディメンションにになります。Datadog で拡張メトリクスタグを表示するには、Datadog Forwarder CloudFormation Stack でパラメーター `DdFetchLambdaTags` を `true` に設定します。

### ログの収集

{{< img src="integrations/amazon_lambda/lambda_logging.png" alt="AWS Lambda からログを収集するためのアーキテクチャ図" >}}

1. まだ設定していない場合は、[Github リポジトリの DataDog/datadog-serverless-functions][9] の手順に従って、AWS アカウントで Datadog Forwarder を設定します。
2. Lambda を実行するトリガーを構成します。トリガーを構成する方法には、次の 2 つがあります。

    - [自動][19]: We manage the log collection Lambda triggers for you if you grant us a set of permissions.
    - [手動][20]: Set up each trigger yourself via the AWS console.
3. 完了したら、[Datadog Log セクション][21]に移動してログを確認します。

**注**: Datadog Forwarder CloudFormation Stack でパラメーター `DdFetchLambdaTags` を `true` に設定し、ログが元の Lambda 関数のリソースタグにタグ付けされるようにします。

**注**: AWS の us-east-1 リージョンにいる場合、[Datadog-AWS Private Link を活用][22]し、ログを Datadog へ転送します。その場合、Forwarder 関数には、[`VPCLambdaExecutionRole` アクセス許可が必要です][23]。

### トレースの収集

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="Datadog で AWS Lambda をトレースするためのアーキテクチャ図" >}}

Datadog は、[Datadog APM][24] または [AWS X-Ray][25] のいずれかを使用した AWS Lambda 関数の分散トレースをサポートします。いずれかのクライアントライブラリセットを使用してトレースを生成できます。[Datadog APM][24] は、ホスト、コンテナ、サーバーレス機能で実行されているアプリケーションからのトレースを自動的に接続します。

Datadog APM は Datadog にトレースデータをリアルタイムで送信するため、[Live Tail ビュー][26]で全くかほとんど遅延なくトレースを監視できます。Datadog APM はテールベースのサンプリングを使用して、より適切なサンプリング決定を行います。 

[サーバーレスページ][6]、[App Analytics][27]、[サービスマップ][28]でトレースを視覚化します。

**注:** Datadog APM または [AWS X-Ray インテグレーション][25] を有効にすると、請求に影響する可能性のある分析スパンの消費量が増加します。

#### Datadog APM を使用したトレース

Datadog [Node.js][29]、[Python][30]、[Ruby][31] トレースライブラリは、AWS Lambda の分散トレースをサポートし、より多くのランタイムが間もなく登場します。アプリケーションにトレースを追加する最も簡単な方法は、依存関係として Datadog トレースライブラリを含む [Datadog Lambda レイヤー][10] を使用することです。次の手順に従って、ランタイム用に APM を設定します。

**ステップ 1:** [Datadog Forwarder][9] の最新バージョンをインストール (または更新) します。

**ステップ 2:** 関数に [Datadog Lambda レイヤー][10] をインストールします。または、ランタイム用の Datadog トレースライブラリをインストールします。

{{< tabs >}}
{{% tab "Node.js" %}}

```bash
yarn add datadog-lambda-js
yarn add dd-trace

npm install datadog-lambda-js
npm install dd-trace
```

**ステップ 3:** コードをインスツルメントします。

```javascript
const { datadog } = require('datadog-lambda-js');
const tracer = require('dd-trace').init(); // 手動のトレーサー構成はここにあります。

// この関数はスパンでラップされます
const longCalculation = tracer.wrap('calculation-long-number', () => {
    // 費用がかさむ計算がここに入ります
});

// この関数もスパンでラップされます
module.exports.hello = datadog((event, context, callback) => {
    longCalculation();

    callback(null, {
        statusCode: 200,
        body: 'Hello from serverless!'
    });
});
```

Node.js ライブラリをインスツルメントし、トレースをカスタマイズするには、[Datadog Node.js APM のドキュメント][1]を参照してください。


[1]: https://docs.datadoghq.com/ja/tracing/setup/nodejs/
{{% /tab %}}

{{% tab "Python" %}}

```bash
pip install datadog-lambda
```

または、プロジェクトの `requirements.txt` に `datadog-lambda` を追加します。

**ステップ 3:** コードをインスツルメントします。

```python
from datadog_lambda.metric import lambda_metric
from datadog_lambda.wrapper import datadog_lambda_wrapper

from ddtrace import tracer

@datadog_lambda_wrapper
def hello(event, context):
  return {
    "statusCode": 200,
    "body": get_message()
  }

@tracer.wrap()
def get_message():
  return "Hello from serverless!"
```

Python ライブラリをインスツルメントし、トレースをカスタマイズするには、[Datadog Python APM のドキュメント][1]を参照してください。


[1]: https://docs.datadoghq.com/ja/tracing/setup/python/
{{% /tab %}}

{{% tab "Ruby" %}}

以下を `Gemfile` に追加するか、選択したパッケージマネージャーを使用して gem をインストールします。

```
gem 'datadog-lambda'
gem 'ddtrace'
```

**注**: `ddtrace` はパッケージ化されて AWS Lambda にアップロードされる前に Amazon Linux 用にコンパイルする必要があるネイティブ拡張機能を使用することに注意してください。このため、[Datadog Lambda レイヤー][51] の使用をお勧めします。

**ステップ 3:** コードをインスツルメントします。

```ruby
require 'ddtrace'
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# ここでインスツルメンテーションを有効にします
end

def handler(event:, context:)
  Datadog::Lambda::wrap(event, context) do
    # ここに関数コード
    some_operation()
  end
end

# ddtrace を使用して残りのコードをインスツルメントします

def some_operation()
    Datadog.tracer.trace('some_operation') do |span|
        # ここで何かをします
    end
end
```

Ruby ライブラリをインスツルメントし、トレースをカスタマイズするには、[Datadog Ruby APM のドキュメント][1]を参照してください。


[1]: https://docs.datadoghq.com/ja/tracing/setup/ruby/
{{% /tab %}}

{{< /tabs >}}

ユースケースで必要な場合は、AWS X-Ray インテグレーションによって生成されたトレースと Datadog トレースライブラリをマージできます。ただし、ほとんどの場合、必要なトレースライブラリは 1 つだけであり、これにより、Datadog は大量のユースケースに対してより適切な[サンプリング][32]決定を行うことができます。

AWS X-Ray と Datadog APM トレースの両方をマージする場合は、ランタイムに次のコンフィギュレーションを使用します。

{{< tabs >}}
{{% tab "Node.js" %}}
```javascript
module.exports.hello = datadog(
    (event, context, callback) => {
        longCalculation();

        callback(null, {
            statusCode: 200,
            body: 'Hello from serverless!'
        });
    },
    { mergeDatadogXrayTraces: true }
);
```
{{% /tab %}}

{{% tab "Python" %}}

Lambda 関数で `DD_MERGE_XRAY_TRACES` 環境変数を `True` に設定します。

{{% /tab %}}

{{% tab "Ruby" %}}

Lambda 関数で `DD_MERGE_DATADOG_XRAY_TRACES` 環境変数を `True` に設定します。

{{% /tab %}}

{{< /tabs >}}

#### AWS Lambda とホスト全体のトレース

該当する場合、Datadog は AWS X-Ray トレースをネイティブ Datadog APM トレースとマージします。これにより、AWS Lambda、コンテナ、オンプレミスホスト、マネージドサービスなど、インフラストラクチャーの境界を越えるリクエストの全体像がトレースに表示されることになります。

1. Lambda 関数をトレースするために [AWS X-Ray インテグレーション][25]を有効にします。
2. [Datadog Lambda レイヤー][10]を Lambda 関数に追加します。
3. ホストおよびコンテナベースのインフラストラクチャーで [Datadog APM をセットアップ][33]します。

**注**: X-Ray と Datadog APM トレースを同じフレームグラフに表示するには、すべてのサービスに[同じ `env` タグ](#the-env-tag)が必要です。

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="ホストから Lambda 関数へのリクエストのトレース" >}}

#### タグを使用したインフラストラクチャーの整理

Lambda 関数に適用された[タグ][18]は、自動的に新しいディメンションになり、このディメンションでトレースを分類できます。

タグは、Datadog APM、サービスマップ、サービス一覧画面で特に強力です。これらは、`env` および `service` タグの[ファーストクラスサポート][34]を備えています。

**注**: Datadog APM でトレースしている場合は、Datadog Forwarder CloudFormation Stack でパラメーター `DdFetchLambdaTags` を `true` に設定し、トレースが元の Lambda 関数のリソースタグにタグ付けされるようにします。Lambda 関数のリソースタグは、追加のコンフィギュレーションがなくても Datadog の X-Ray トレースに自動的に表示されます。

##### env タグ

`env` を使用すると、ステージング、開発、および本番環境を分離できます。これは、サーバーレス関数だけでなく、あらゆる種類のインフラストラクチャーで機能します。たとえば、本番環境の EU Lambda 関数に `env:prod-eu` タグを付けることができます。

デフォルトでは、Lambda 関数は Datadog で `env:none` でタグ付けされます。独自のタグを追加してこれをオーバーライドします。

##### service タグ

関連する Lambda 関数を[サービス][35]にグループ化するために、 `service` [タグ][28]を追加します。[サービスマップ][28]と[サービス一覧画面][36]は、このタグを使用して、サービスとモニターのヘルスとの関係を示します。サービスは、サービスマップ上の個々のノードとして表されます。

デフォルトでは、各 Lambda 関数は独自の `service` として扱われます。独自のタグを追加してこれをオーバーライドします。

**注**: Datadog を初めてご利用になるお客様には、デフォルトですべての Lambda 関数は `aws.lambda` サービス下にグループ化され、サービスマップでは単一ノードとして表示されます。これをオーバーライドするには、`service` で関数をタグ付します。

{{< img src="integrations/amazon_lambda/animated_service_map.gif" alt="Lambda 関数のアニメーション化されたサービスマップ" >}}

### サーバーレスインテグレーション

以下の Lambda 関数インテグレーションは、サーバーレスアプリケーションを監視するためのさらなる機能を提供します。

#### AWS Step Functions

[AWS Step Functions インテグレーション][37]を有効にすると、特定の関数が属するステートマシンを識別する Lambda メトリクスの追加タグを自動的に取得できます。これらのタグを使用して、[サーバーレスビュー][6]で Step Functions ごとの Lambda メトリクスとログの集計ビューを取得します。

1. [AWS Step Functions インテグレーション][37]をインストールします。
2. Lambda メトリクスにタグを追加するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    | AWS アクセス許可     | 説明                                  |
    | ------------------ | -------------------------------------------- |
    | `states:ListStateMachines`     | 有効な Step Functions を一覧表示します。   |
    | `states:DescribeStateMachine` | Step Function メタデータやタグを取得します。  |

#### Amazon EFS for Lambda

[Amazon EFS for Lambda][38]を有効にすると、特定の関数が属する EFS を識別する Lambda メトリクスの追加タグを自動的に取得できます。これらのタグを使用して、[サーバーレスビュー][6]で EFS ごとの Lambda メトリクスとログの集計ビューを取得します。

1. [Amazon EFS インテグレーション][39]をインストールします。
2. Lambda から EFS のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    | AWS アクセス許可     | 説明                                  |
    | ------------------ | -------------------------------------------- |
    | `elasticfilesystem:DescribeAccessPoints`     | Lambda 関数に接続された有効な EFS を一覧表示します。 |

3. 完了したら、[サーバレスビュー][6]に移動し、Lambda 関数で新しい `filesystemid` タグを使用します。

{{< img src="integrations/amazon_lambda/efs_for_lambda.gif" alt="Amazon EFS for Lambda" >}}

#### Lambda@Edge

`at_edge`、`edge_master_name`、`edge_master_arn` タグを使用し、エッジロケーションで実行中の Lambda 関数のメトリクスとロゴの集計ビューを取得します。

### カスタムメトリクス

{{< img src="integrations/amazon_lambda/lambda_custom_metrics.png" alt="AWS Lambda からカスタムメトリクスを収集するためのアーキテクチャ図" >}}

Datadog Lambda レイヤーをインストールして、カスタムメトリクスを収集して送信します。Datadog Lambda レイヤーから送信されたメトリクスは、自動的に[ディストリビューション][8]に集計されるため、`avg`、`sum`、`max`、`min`、`count` をグラフ化できます。また、[ディストリビューションメトリクス][8]ページで、50、75、95、99 パーセンタイル値のタグセットの集計を計算できます。

ディストリビューションメトリクスは、基底のホストとは無関係に、サービスなどの論理オブジェクトをインスツルメントするように設計されています。したがって、Agent を使用してローカルにメトリクスを集計するのではなく、サーバー側のメトリクスを集計するため、サーバーレスインフラストラクチャーに適しています。

#### ディストリビューションメトリクスへのアップグレード

ディストリビューションメトリクスでは、送信時に指定する代わりにグラフ化または照会するときに、集計を選択します。

以前に Datadog Lambda レイヤーのいずれかを使用せずに Lambda からカスタムメトリクスを送信した場合、それらを Datadog に送信するときに、**新しいメトリクス名**でカスタムメトリクスのインスツルメントを開始する必要があります。ディストリビューションと非ディストリビューションメトリクスタイプの両方として、同じメトリクス名を同時に存在させることはできません。

ディストリビューションメトリクスのパーセンタイル集計を有効にするには、[ディストリビューションメトリクス][40]のページを参照してください。

#### カスタムメトリクスのタグ付け

[Datadog Lambda レイヤー][10] を使用して送信する場合、カスタムメトリクスにタグを付ける必要があります。[ディストリビューションメトリクス][8]ページを使用して、カスタムメトリクスに適用される[タグのセットをカスタマイズ][40]します。

カスタムメトリクスに Lambda リソースタグを追加するには、Datadog Forwarder CloudFormation Stack でパラメーター `DdFetchLambdaTags` を `true` に設定します。

#### 同期カスタムメトリクスと非同期カスタムメトリクス

Datadog Lambda レイヤーは、Lambda で同期および非同期の両方によるカスタムメトリクスの送信をサポートしています。

**同期**: デフォルトの動作。このメソッドは、定期的（10 秒ごと）および Lambda 呼び出しの終了時に HTTP 経由でカスタムメトリクスを Datadog に送信します。そのため、呼び出しの継続時間が 10 秒未満の場合は、カスタムメトリクスは呼び出しの終了時に送信されます。

**非同期（推奨）**: レイテンシーオーバーヘッドなしでカスタムメトリクスを送信し、**かつ**それらをほぼリアルタイムで Datadog に表示することができます。これを実現するために、Lambda レイヤーはカスタムメトリクスを特別にフォーマットされたログ行として出力し、これを [Datadog Forwarder][9] が解析して Datadog に送信します。AWS Lambda でのロギングは 100% 非同期であるため、このメソッドにより、関数へのレイテンシーオーバーヘッドがゼロになります。

##### 非同期カスタムメトリクスの有効化

1. Lambda 関数で環境変数 `DD_FLUSH_TO_LOG` を `True` に設定します。
1. まだ設定していない場合は、[Github リポジトリの DataDog/datadog-serverless-functions][9] の手順に従って、AWS アカウントで Datadog Forwarder を設定します。
1. Lambda を実行するトリガーを構成します。トリガーを構成する方法には、次の 2 つがあります。
    - [自動][19]: We manage the log collection Lambda triggers for you if you grant us a set of permissions.
    - [手動][20]: Set up each trigger yourself via the AWS console.

Datadog ログを使用していない場合でも、非同期のカスタムメトリクス送信を使用できます。[Datadog ログコレクション AWS Lambda 関数][9]で環境変数 `DD_FORWARD_LOG` を `False` に設定します。これにより、カスタムメトリクスのみが Datadog にインテリジェントに転送され、通常のログは転送されません。

#### カスタムメトリクスのコード例

関数コードで、Lambda レイヤーから必要なメソッドをインポートし、関数ハンドラーのラッパーを追加します。ヘルパー関数をラップする必要はありません。

**注:** カスタムメトリクスを報告するメソッドの引数には次の要件があります。

- `<METRIC_NAME>` は、[メトリクス命名ポリシー][41]に従ってメトリクスを一意に識別します。
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

**注:** これらのカスタムメトリクスは、[ディストリビューション](#custom-metrics)として送信されます。以前に別の方法でカスタムメトリクスを送信していた場合は、[ディストリビューションへのアップグレードの影響に関するドキュメントを参照してください](#upgrading-to-distributions)。


[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#set-up-the-datadog-lambda-function
{{% /tab %}}
{{< /tabs >}}

#### VPC での実行

Datadog Lambda レイヤーは、カスタムメトリクスを**同期**送信するために[パブリックインターネットへのアクセス][42]を必要とします。Lambda 関数が VPC に関連付けられている場合は、代わりにカスタムメトリクスを**非同期**送信するか、関数がパブリックインターネットに到達できることを確認してください。

#### サードパーティライブラリの使用

カスタムメトリクスを Datadog に簡単に送信できるオープンソースライブラリは多数あります。ただし、多くは Lambda 用に最適化された[ディストリビューションメトリクス][8]を使用するように更新されていません。ディストリビューションメトリクスは、ホストまたはローカルで実行される[エージェント][43]に依存しないサーバー側の集計を可能にします。エージェントのないサーバーレス環境では、ディストリビューションメトリクスにより柔軟な集計とタグ付けが可能になります。

AWS Lambda 用のサードパーティのメトリクスライブラリを評価する場合は、それがディストリビューションメトリクスをサポートしていることを確認してください。

#### [非推奨] CloudWatch ログの使用

**このカスタムメトリクスの送信メソッドはもうサポートされておらず、すべての新しいお客様に対しては無効になっています。**Lambda からカスタムメトリクスを送信する場合は、[Datadog Lambda レイヤー][10]を使うことが推奨されます。

これには、[Datadog IAM ポリシー][3]で次の AWS アクセス許可が必要です。

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
- `<METRIC_NAME>` は、[メトリクス命名ポリシー][41]に従ってメトリクスを一意に識別します。
- `<タグリスト>` はオプションです。先頭に `#` が付いたカンマ区切りリストです。カスタムメトリクスには、自動的にタグ `function_name:<関数の名前>` が適用されます。

**注**: 各タイムスタンプに対する合計がカウントとして使用され、特定のタイムスタンプの最後の値がゲージとして使用されます。メトリクスをインクリメントするたびにログステートメントを出力することは、ログのパースにかかる時間が増大するため、お勧めしません。コードでメトリクスの値を継続的に更新し、関数が終了する前にメトリクスに 1 つのログステートメントを出力してください。

### Datadog Lambda レイヤー

Datadog Lambda レイヤーは以下を担当します。

- 呼び出し、エラー、コールドスタートなどのリアルタイム[拡張 Lambda メトリクス](#real-time-enhanced-lambda-metrics)を生成する
- カスタムメトリクスの送信（同期および非同期）
- アップストリームのリクエストからダウンストリームのサービスにトレースヘッダーを自動的に伝播します。これにより、Lambda 関数、ホスト、コンテナ、および Datadog Agent を実行している他のインフラストラクチャ全体で完全に分散されたトレースが可能になります。
- `dd-trace` ライブラリをパッケージ化すると、Datadog のトレースライブラリを使用して Lambda 関数をトレースできるようになります。現在、Node.js、Python、Ruby で利用可能で、今後ランタイムは増える予定です。

#### Datadog Lambda レイヤーのインストールと使用

Datadog Lambda レイヤーのインストールと使用には、[設定手順を参照][10]してください。

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

ご不明な点は、[Datadog のサポートチーム][45]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_lambda.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_lambda
[6]: https://app.datadoghq.com/functions
[7]: https://docs.datadoghq.com/ja/infrastructure/serverless/
[8]: https://docs.datadoghq.com/ja/metrics/distributions/
[9]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#installation
[10]: /ja/infrastructure/serverless/datadog_lambda_layer/
[11]: https://github.com/DataDog/datadog-lambda-python/releases
[12]: https://github.com/DataDog/datadog-lambda-js/releases
[13]: https://github.com/DataDog/datadog-lambda-rb/releases
[14]: https://github.com/DataDog/datadog-lambda-go/releases
[15]: https://github.com/datadog/datadog-lambda-java
[16]: https://github.com/datadog/serverless-plugin-datadog
[17]: https://app.datadoghq.com/screen/integration/30306/aws-lambda-enhanced-metrics
[18]: https://docs.datadoghq.com/ja/tagging/
[19]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#automatically-setup-triggers
[20]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#manually-setup-triggers
[21]: https://app.datadoghq.com/logs
[22]: https://docs.datadoghq.com/ja/agent/guide/private-link/?tab=logs
[23]: https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html
[24]: https://docs.datadoghq.com/ja/tracing/
[25]: https://docs.datadoghq.com/ja/integrations/amazon_xray/
[26]: https://docs.datadoghq.com/ja/tracing/livetail/
[27]: https://docs.datadoghq.com/ja/tracing/app_analytics/
[28]: https://docs.datadoghq.com/ja/tracing/visualization/services_map/#the-service-tag
[29]: https://docs.datadoghq.com/ja/tracing/setup/nodejs/
[30]: https://docs.datadoghq.com/ja/tracing/setup/python/
[31]: https://docs.datadoghq.com/ja/tracing/setup/ruby/
[32]: https://docs.datadoghq.com/ja/tracing/guide/trace_sampling_and_storage/
[33]: https://docs.datadoghq.com/ja/tracing/send_traces/
[34]: https://docs.datadoghq.com/ja/tracing/visualization/services_map/#filtering-vs-changing-scopes
[35]: https://docs.datadoghq.com/ja/tracing/visualization/#services
[36]: https://docs.datadoghq.com/ja/tracing/visualization/services_list/
[37]: https://docs.datadoghq.com/ja/integrations/amazon_step_functions/
[38]: /ja/integrations/amazon_efs/#amazon-efs-for-lambda
[39]: /ja/integrations/amazon_efs/
[40]: /ja/metrics/distributions/#customize-tagging
[41]: https://docs.datadoghq.com/ja/developers/metrics/
[42]: https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function
[43]: https://docs.datadoghq.com/ja/agent/
[44]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_lambda/amazon_lambda_metadata.csv
[45]: https://docs.datadoghq.com/ja/help/