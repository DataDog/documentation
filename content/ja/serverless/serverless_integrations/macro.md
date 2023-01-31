---
dependencies:
- "https://github.com/DataDog/datadog-cloudformation-macro/blob/master/serverless/README.md"
kind: ドキュメント
title: Datadog のサーバーレスマクロ
---
![build_serverless](https://github.com/DataDog/datadog-cloudformation-macro/workflows/build_serverless/badge.svg)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)

Datadog では、AWS SAM または AWS CDK をご利用のお客様のサーバーレスアプリケーションのデプロイに、サーバーレスの CloudFormation マクロをおすすめしています。

以下を行うことで、サーバーレスアプリケーションからのメトリクス、トレース、ログの収集をプラグインで自動的に構成できます。

- [Python][1] および [Node.js][2] Lambda 関数用に Datadog Lambda ライブラリをインストールし構成。
- Lambda 関数からの拡張 Lambda メトリクスおよびカスタムメトリクスの収集を有効化。
- Datadog Forwarder から Lambda 関数ロググループへのサブスクリプションを管理。

## インストール

AWS アカウントでマクロを使用可能にするには、Datadog のテンプレートで CloudFormation スタックをデプロイします。このデプロイには、CloudFormation マクロリソースと、マクロを実行したときに呼び出される Lambda 関数が含まれます。このスタックを有効にすると、同じアカウントにデプロイされた他の CloudFormation スタックにマクロを使用できるようになります。アカウントのマクロ定義に関する詳細は、[CloudFormation ドキュメントページ][3]を参照してください。

初めてインストールする場合は、以下のようにデプロイします。
```bash
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

新しいリリース後にマクロを更新する場合は、同じパラメータを使い `update-stack` メソッドを使用します。また、最新の [リリース](https://github.com/DataDog/datadog-cloudformation-macro/releases) からマクロのバージョンを指定することもできます。それには、`latest.yml` をリリースバージョンに置き換えます（例、`0.1.2.yml`）。
```bash
aws cloudformation update-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

**注:** マクロは、アカウントのリージョンに 1 回デプロイするだけで、同じリージョンにデプロイされたすべての CloudFormation スタックに使用できます。

## 使用方法

### AWS SAM

SAM を使用してサーバーレスアプリケーションをデプロイするには、必要な SAM 変換の後に Datadog Serverless CloudFormation マクロを `template.yml` ファイルの `Transform` セクションに追加します。

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      pythonLayerVersion: "<LAYER_VERSION>" # Node.js には nodeLayerVersion を使用 
      stackName: !Ref "AWS::StackName"
      forwarderArn: "<FORWARDER_ARN>"
      service: "<SERVICE>" # オプション
      env: "<ENV>" # オプション
      # その他のパラメーターについては、コンフィギュレーションセクションを参照
```

### AWS CDK

CDK を使用してサーバーレスアプリケーションをデプロイするには、Datadog Serverless CloudFormation マクロを [Stack オブジェクト][4]コンストラクタに追加します。

**Typescript**
```typescript
import * as cdk from "@aws-cdk/core";

class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.addTransform("DatadogServerless");

    new cdk.CfnMapping(this, "Datadog", {
      mapping: {
        Parameters: {
          nodeLayerVersion: "<LAYER_VERSION>",
          forwarderArn: "<FORWARDER_ARN>",
          stackName: this.stackName,
          service: "<SERVICE>", // オプション
          env: "<ENV>", // オプション
          // その他のパラメーターについては、コンフィギュレーションセクションを参照
        },
      },
    });
  }
}
```

**Python**
```python
from aws_cdk import core

class CdkStack(core.Stack):
  def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
    super().__init__(scope, id, **kwargs)
    self.add_transform("DatadogServerless")

    mapping = core.CfnMapping(self, "Datadog",
      mapping={
        "Parameters": {
          "pythonLayerVersion": "<LAYER_VERSION>",
          "forwarderArn": "<FORWARDER_ARN>",
          "stackName": self.stackName,
          "service": "<SERVICE>",  # オプション
          "env": "<ENV>",  # オプション
          # その他のパラメーターについては、コンフィギュレーションセクションを参照
        }
      })
```

注: SAM および CDK のデプロイメントにおいて、マクロをインストールしたときに、提供された `template.yml` ファイルを変更しないと、アカウントに定義されたマクロ名は `DatadogServerless` になります。オリジナルのテンプレートを変更する場合は、個々に追加する変換の名前が `AWS::CloudFormation::Macro` リソースの `Name` プロパティと一致するようにしてください。

## コンフィギュレーション

プラグインをさらに構成するには、以下のカスタムパラメーターを使用します。

| パラメーター               | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `addLayers`             | Lambda レイヤーを追加またはユーザーが独自のレイヤーを使用。デフォルトは true。「true」の場合、Lambda ライブラリのバージョン変数も必要になります。「false」の場合は、関数のデプロイメントパッケージに Datadog Lambda ライブラリを含める必要があります。                                                                                                                                                                                                                                    |
| `pythonLayerVersion`    | インストールする Python Lambda レイヤーのバージョン（例: "21"）。Python で記述された Lambda 関数を 1 つ以上デプロイする場合で、`addLayers` が「true」のときは必須。最新バージョンの数字は、[https://github.com/DataDog/datadog-lambda-python/releases][5] で確認できます。                                                                                                                                                                                                                           |
| `nodeLayerVersion`      | インストールする Node.js Lambda レイヤーのバージョン（例: "29"）。Node.js で記述された Lambda 関数を 1 つ以上デプロイする場合で、`addLayers` が「true」のときは必須。最新バージョンの数字は、[https://github.com/DataDog/datadog-lambda-js/releases][6] で確認できます。                                                                                                                                                                                                                             |
| `forwarderArn:`         | 設定すると、プラグインにより関数のロググループが自動的に Datadog Forwarder にサブスクライブされます。または、[AWS::Logs::SubscriptionFilter][7] リソースを使用してログサブスクリプションを定義できます。**注**: ロググループおよびサブスクリプションフィルターの作成にはマクロに関数名が必要なため、初めてデプロイされる関数には 'FunctionName' プロパティが定義されている必要があります。'FunctionName' に、`!Sub` などの CloudFormation 関数を含めることはできません。 |
| `stackName`             | デプロイする CloudFormation スタックの名前。`forwarderArn` が提供されていて、Lambda 関数が動的に命名されている (`FunctionName` プロパティが Lambda に提供されていない) 場合のみ必須。このパラメーターを SAM および CDK に追加する方法については、以下の例を参照してください。                                                                                                                                                                                           |
| `flushMetricsToLogs`    | Datadog Forwarder Lambda 関数を使用して、ログ経由でカスタムメトリクスを送信します (推奨)。デフォルトは `true`。`false` に設定した場合、Datadog API キーを `apiKey` または `apiKMSKey` を使用して定義する必要があります。                                                                                                                                                                                                                                                                                       |
| `site`                  | データを送信する Datadog サイトを設定します。flushMetricsToLogs が `false` の場合にのみ必要です。可能な値は、`datadoghq.com`、`datadoghq.eu`、`us3.datadoghq.com`、`ddog-gov.com` です。デフォルトは `datadoghq.com` です。                                                                                                                                                                                                                                                                                                                                 |
| `apiKey`                | Datadog API キー。`flushMetricsToLogs` が `false` の場合のみ必要。                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `apiKMSKey`             | KMS を使用して暗号化された Datadog API キー。`flushMetricsToLogs` が「false」で、KMS 暗号化を使用している場合、`apiKey` の代わりにこのパラメーターを使用します。                                                                                                                                                                                                                                                                                                                                               |
| `enableEnhancedMetrics` | Lambda 関数の拡張メトリクスを有効にします。デフォルトは `true`。Datadog Forwarder Lambda 関数が関数ロググループにサブスクライブする必要があります。                                                                                                                                                                                                                                                                                                                                            |
| `enableXrayTracing`     | Lambda 関数のトレースを有効にします。デフォルトは「false」。                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `enableDDTracing`       | dd-trace、Datadog の APM ライブラリを使用して Lambda 関数のトレースを有効にします。デフォルトは `true`。Datadog Forwarder Lambda 関数が関数ロググループにサブスクライブする必要があります。                                                                                                                                                                                                                                                                                                                       |
| `service`               | 設定すると、マクロにより `service` タグがすべての Lambda 関数に、提供された値とともに追加されます。                                                                                                                                                                                                                                                                                                                                                                                                        |
| `env`                   | 設定すると、マクロにより `env` タグがすべての Lambda 関数に、提供された値とともに追加されます。                                                                                                                                                                                                                                                                                                                                                                                                           |
| `logLevel`              | ログのレベル。拡張ロギングの場合 `DEBUG` に設定します。デフォルトは`info`。                                                                                                                                                                                                                                                                                                                                                                                                                          |

## UDS の仕組み

このマクロにより CloudFormation テンプレートが変更され、[Node.js][2] および [Python][1] 用の Lambda レイヤーを関数にアタッチすることで Datadog Lambda ライブラリがインストールされます。そして、コードの変更を必要とせずに、Lambda ライブラリを初期化する置換ハンドラーへリダイレクトされます。


## トラブルシューティング

### エラーメッセージ: 'FunctionName' プロパティが未定義です...

このエラーは、`forwarderArn` を提供し、Lambda 関数を初めてデプロイする場合に発生します。ロググループが存在せず、マクロはこのロググループの作成または Forwarder へのサブスクライブができません。この問題を修正する一つの方法は、Lambda で `FunctionName` プロパティを明示的に定義することです（下記の例を参照）。

**AWS SAM**
```yml
Resources:
  MyLambda:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs12.x
      FunctionName: MyFunctionName # このプロパティを Lambda に追加します
```

**AWS CDK (Node.js)**
```js
import * as lambda from "@aws-cdk/aws-lambda";

const myLambda = new lambda.Function(this, "function-id", {
  runtime: lambda.Runtime.NODEJS_12_X,
  code: lambda.Code.fromAsset("lambda"),
  handler: "index.handler",
  functionName: "MyFunctionName", // このプロパティを Lambda に追加します
});
```

`FunctionName` を明示的に定義できない（または定義しない）場合は、SAM テンプレートまたは CDK ソースコードから `forwarderArn` パラメーターを削除し、以下のように [AWS::Logs::SubscriptionFilter][7] リソースを使用してサブスクリプションフィルターを定義します。

**AWS SAM**
```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

**AWS CDK (Node.js)**
```js
import {CfnSubscriptionFilter} from '@aws-cdk/aws-logs';

const subscription = new CfnSubscriptionFilter(this, `DatadogForwarderSubscriptionFilter`, {
    logGroupName: '<CLOUDWATCH_LOG_GROUP_NAME>',
    destinationArn: '<DATADOG_FORWARDER_ARN>',
    filterPattern: ''
});
```

### エラーメッセージ: 'logGroupNamePrefix' は制約を満たせませんでした...

`FunctionName` に、`!Sub` などの CloudFormation 関数が含まれる場合、`forwarderArn` オプションは機能しません。この場合、マクロは実際の関数名にアクセスできません（CloudFormation は変換後に関数を実行します）。そのため、関数にロググループやサブスクリプションフィルターを作成できません。

SAM テンプレートまたは CDK ソースコードから `forwarderArn` パラメーターを削除し、以下のように [AWS::Logs::SubscriptionFilter][7] リソースを使用してサブスクリプションフィルターを定義します。

**AWS SAM**
```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

**AWS CDK (Node.js)**
```js
import {CfnSubscriptionFilter} from '@aws-cdk/aws-logs';

const subscription = new CfnSubscriptionFilter(this, `DatadogForwarderSubscriptionFilter`, {
    logGroupName: '<CLOUDWATCH_LOG_GROUP_NAME>',
    destinationArn: '<DATADOG_FORWARDER_ARN>',
    filterPattern: ''
});
```

## コミュニティ

製品のフィードバックや質問については、[Slack の Datadog コミュニティ](https://chat.datadoghq.com/)の `#serverless` チャンネルに参加してください。

[1]: https://github.com/DataDog/datadog-lambda-layer-python
[2]: https://github.com/DataDog/datadog-lambda-layer-js
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html
[4]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.Stack.html
[5]: https://github.com/DataDog/datadog-lambda-python/releases
[6]: https://github.com/DataDog/datadog-lambda-js/releases
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
