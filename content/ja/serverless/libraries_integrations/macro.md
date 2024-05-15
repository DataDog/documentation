---
aliases:
- /ja/serverless/serverless_integrations/macro/
dependencies:
- https://github.com/DataDog/datadog-cloudformation-macro/blob/main/serverless/README.md
kind: documentation
title: Datadog のサーバーレスマクロ
---
![build_serverless](https://github.com/DataDog/datadog-cloudformation-macro/workflows/build_serverless/badge.svg)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)

Datadog では、AWS SAM をご利用のお客様のサーバーレスアプリケーションのデプロイに、サーバーレスの CloudFormation マクロをおすすめしています。

以下を行うことで、サーバーレスアプリケーションからのメトリクス、トレース、ログの収集をマクロで自動的に構成できます。

- [Python][1]、[Node.js][2]、[.NET][9]、および [Java][10] Lambda 関数用に Datadog Lambda ライブラリおよび Lambda 拡張機能をインストールし構成。
- Lambda 関数からの拡張 Lambda メトリクスおよびカスタムメトリクスの収集を有効化。
- 必要に応じて、Datadog Forwarder から Lambda 関数ロググループへのサブスクリプションを管理。

## インストール

AWS アカウントで Datadog サーバーレスマクロを使用可能にするには、Datadog のテンプレートで CloudFormation スタックをデプロイします。このデプロイには、CloudFormation マクロリソースと、マクロを実行したときに呼び出される Lambda 関数が含まれます。このスタックを有効にすると、同じアカウントにデプロイされた他の CloudFormation スタックにマクロを使用できるようになります。アカウントのマクロ定義に関する詳細は、[CloudFormation ドキュメントページ][3]を参照してください。

**注:** Datadog サーバーレスマクロは、変換したいスタックを含む各リージョンで一度だけ作成する必要があります。

### オプション 1: AWS Console

[![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home?region=sa-east-1#/stacks/quickCreate?stackName=datadog-serverless-macro&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml)

上記の `Launch Stack` テンプレートリンクを使用して、AWS アカウントで Datadog サーバーレスマクロスタックを作成します。

### オプション 2: AWS CLI

初めてインストールする場合は、以下のようにデプロイします。

```bash
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

## AWS SAM での使用

SAM を使用してサーバーレスアプリケーションをデプロイするには、必要な SAM 変換の後に Datadog Serverless CloudFormation マクロを `template.yml` ファイルの `Transform` セクションに追加します。また、パラメーターを追加してマクロに渡すことで、Datadog ソースコードインテグレーションを有効化します。

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      stackName: !Ref "AWS::StackName"
      apiKey: "<DATADOG_API_KEY>"
      pythonLayerVersion: "<LAYER_VERSION>" # 他のランタイムには適切なパラメーターを使用
      extensionLayerVersion: "<LAYER_VERSION>"
      service: "<SERVICE>" # オプション
      env: "<ENV>" # オプション
      version: "<VERSION>" # オプション
      tags: "<TAGS>" # オプション
      # ソースコードインテグレーションのタグ付けを有効にするには、ここで DDGitData を渡す
      gitData: !Ref DDGitData
      # その他のパラメーターについては、構成セクションを参照

Parameters:
  DDGitData:
    Type: String
    Default: ""
    Description: "The output of $(git rev-parse HEAD),$(git config --get remote.origin.url). Used for Datadog Source Code Integration tagging"
```

Datadog のソースコードインテグレーションで `DDGitData` パラメーターを設定するには、SAM の `--parameter-overrides` オプションを使用します。

```bash
sam deploy --parameter-overrides  DDGitData="$(git rev-parse HEAD),$(git config --get remote.origin.url)"
```

注: マクロをインストールしたときに、提供された `template.yml` ファイルを変更しないと、アカウントに定義されたマクロ名は `DatadogServerless` になります。オリジナルのテンプレートを変更する場合は、個々に追加する変換の名前が `AWS::CloudFormation::Macro` リソースの `Name` プロパティと一致するようにしてください。

注: 構成の一部を一度だけ指定したい場合は、`template.yml` を修正して、そのリージョンに設定したい環境変数を追加することができます。これは、追加のデフォルト値を制御するための方法です。以下の例では、`DD_API_KEY_SECRET_ARN` と `DD_ENV` を設定していますが、マクロはこれをデフォルト値として扱います。

```yaml
Resources:
  MacroFunction:
    Type: AWS::Serverless::Function
    DependsOn: MacroFunctionZip
    Properties:
      FunctionName:
        Fn::If:
          - SetFunctionName
          - Ref: FunctionName
          - Ref: AWS::NoValue
      Description: Processes a CloudFormation template to install Datadog Lambda layers for Lambda functions.
      Handler: src/index.handler
      ...
      Environment:
        Variables:
          DD_API_KEY_SECRET_ARN: "arn:aws:secretsmanager:us-west-2:123456789012:secret:DdApiKeySecret-e1v5Yn7TvIPc-d1Qc4E"
          DD_ENV: "dev"
```

## 更新

新リリース後にマクロを更新する場合は、`update-stack` メソッドを使用します。

```bash
aws cloudformation update-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

また、最新の [リリース](https://github.com/DataDog/datadog-cloudformation-macro/releases)からマクロのバージョンを指定することもできます。それには、`latest.yml` をリリースバージョンに置き換えます (例: `0.1.2.yml`)。

## コンフィギュレーション

プラグインをさらに構成するには、以下のカスタムパラメーターを使用します。

| パラメーター                   | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addLayers`                 | Lambda レイヤーを追加またはユーザーが独自のレイヤーを使用。デフォルトは true。「true」の場合、Lambda ライブラリのバージョン変数も必要になります。「false」の場合は、関数のデプロイメントパッケージに Datadog Lambda ライブラリを含める必要があります。                                                                                                                                                                                                                                        |
| `pythonLayerVersion`        | インストールする Python Lambda レイヤーのバージョン（例: "21"）。Python で記述された Lambda 関数を 1 つ以上デプロイする場合で、`addLayers` が「true」のときは必須。最新バージョンの数字は、[https://github.com/DataDog/datadog-lambda-python/releases][5] で確認できます。                                                                                                                                                                                                                              |
| `nodeLayerVersion`          | インストールする Node.js Lambda レイヤーのバージョン（例: "29"）。Node.js で記述された Lambda 関数を 1 つ以上デプロイする場合で、`addLayers` が「true」のときは必須。最新バージョンの数字は、[https://github.com/DataDog/datadog-lambda-js/releases][6] で確認できます。                                                                                                                                                                                                                                |
| `dotnetLayerVersion`        | インストールする .NET Lambda レイヤーのバージョン（例: "14"）。.NET で記述された Lambda 関数を 1 つ以上デプロイする場合で、`addLayers` が「true」のときは必須。最新バージョンの数字は、[https://github.com/DataDog/dd-trace-dotnet-aws-lambda-layer/releases][9] で確認できます。
| `javaLayerVersion`        | インストールする Java Lambda レイヤーのバージョン（例: "12"）。Java で記述された Lambda 関数を 1 つ以上デプロイする場合で、`addLayers` が「true」のときは必須。最新バージョンの数字は、[https://github.com/DataDog/datadog-lambda-java/releases][10] で確認できます。
| `extensionLayerVersion`     | "5" など、インストールする Datadog Lambda Extension レイヤーのバージョン。`extensionLayerVersion` が設定されている場合は、`apiKey` (暗号化の場合は `apiKMSKey` または `apiKeySecretArn`) の設定も必要となります。`extensionLayerVersion` を使用する場合は、`forwarderArn` を設定しないでください。Lambda Extension の詳細は[こちら][8]。                                                                                                                                                                                   |
| `forwarderArn`              | 設定すると、プラグインにより関数のロググループが自動的に Datadog Forwarder にサブスクライブされます。または、[AWS::Logs::SubscriptionFilter][7] リソースを使用してログサブスクリプションを定義できます。**注**: ロググループおよびサブスクリプションフィルターの作成にはマクロに関数名が必要なため、初めてデプロイされる関数には 'FunctionName' プロパティが定義されている必要があります。'FunctionName' に、`!Sub` などの CloudFormation 関数を含めることはできません。 |
| `stackName`                 | デプロイする CloudFormation スタックの名前。`forwarderArn` が提供されていて、Lambda 関数が動的に命名されている (`FunctionName` プロパティが Lambda に提供されていない) 場合のみ必須。このパラメーターを SAM および CDK に追加する方法については、以下の例を参照してください。                                                                                                                                                                                          |
| `flushMetricsToLogs`        | Datadog Forwarder Lambda 関数を使用して、ログ経由でカスタムメトリクスを送信します (推奨)。デフォルトは `true`。`false` に設定した場合、Datadog API キーを `apiKey` (暗号化の場合は `apiKMSKey` または `apiKeySecretArn`) を使用して定義する必要があります。                                                                                                                                                                                                                                                             |
| `site`                      | データを送信する Datadog サイトを設定します。flushMetricsToLogs が `false` の場合にのみ必要です。可能な値は、`datadoghq.com`、`datadoghq.eu`、`us3.datadoghq.com`、`us5.datadoghq.com`、`ap1.datadoghq.com`、`ddog-gov.com` です。デフォルトは `datadoghq.com` です。                                                                                                                                                                                                                                        |
| `apiKey`                    | Datadog API キー。`flushMetricsToLogs` が `false` の場合のみ必要。                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `apiKeySecretArn`           | AWS Secrets Manager で Datadog の API キーを保存しているシークレットの ARN。`flushMetricsToLogs` が `false` の場合や `extensionLayerVersion` が設定されている場合に、`apiKey` の代わりにこのパラメータを使用することができます。Lambda  の実行ロールに `secretsmanager:GetSecretValue` アクセス許可を追加することを忘れないようにしましょう。                                                                                                                                                                                                              |
| `apiKMSKey`                 | KMS を使用して暗号化された Datadog API キー。`flushMetricsToLogs` が「false」で、KMS 暗号化を使用している場合、`apiKey` の代わりにこのパラメーターを使用します。                                                                                                                                                                                                                                                                                                                                                  |
| `enableEnhancedMetrics`     | Lambda 関数の拡張メトリクスを有効にします。デフォルトは `true`。Datadog Forwarder Lambda 関数が関数ロググループにサブスクライブする必要があります。                                                                                                                                                                                                                                                                                                                                                      |
| `enableXrayTracing`         | Lambda 関数のトレースを有効にします。デフォルトは「false」。                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `enableDDTracing`           | dd-trace、Datadog の APM ライブラリを使用して Lambda 関数のトレースを有効にします。デフォルトは `true`。Datadog Forwarder Lambda 関数が関数ロググループにサブスクライブする必要があります。                                                                                                                                                                                                                                                                                                                           |
| `enableDDLogs`              | Lambda 関数の Datadog ログ収集を有効にします。注: この設定は、Datadog Forwarder を介して送信されるログには影響しません。デフォルトは true です。                                                                                                                                                                                                                                                                                                                                                   |
| `service`                   | `extensionLayerVersion` と共に設定すると、マクロによって指定した値を持つすべての Lambda 関数に `DD_SERVICE` 環境変数が追加されます。`forwarderArn` と共に設定すると、マクロによって指定した値を持つすべての Lambda 関数に `service` タグが追加されます。                                                                                                                                                                                                                        |
| `env`                       | `extensionLayerVersion` と共に設定すると、マクロによって指定した値を持つすべての Lambda 関数に `DD_ENV` 環境変数が追加されます。`forwarderArn` と共に設定すると、マクロによって指定した値を持つすべての Lambda 関数に `env` タグが追加されます。                                                                                                                                                                                                                               |
| `version`                   | `extensionLayerVersion` と共に設定すると、マクロによって指定した値を持つすべての Lambda 関数に `DD_VERSION` 環境変数が追加されます。`forwarderArn` と共に設定すると、マクロによって指定した値を持つすべての Lambda 関数に `version` タグが追加されます。                                                                                                                                                                                                                        |
| `tags`                      | 1 つの文字列としての key:value のペアのカンマ区切りのリスト。`extensionLayerVersion` と共に設定すると、すべての Lambda 関数に `DD_TAGS` 環境変数が追加され、指定した値が設定されます。`forwarderArn` と共に指定すると、マクロは文字列をパースして、各 key:value ペアをタグとしてすべての Lambda 関数に設定します。                                                                                                                                                                |
| `logLevel`                  | ログのレベルを設定します。拡張ロギングの場合 `DEBUG` に設定します。                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `captureLambdaPayload`      | 関数の実行スパンにリクエストと応答のペイロードを自動的にタグ付けして、APM アプリケーションに表示できるようにします。                                                                                                                                                                                                                                                                                                                                                                 |
| `enableColdStartTracing`    | コールドスタートトレースを無効にするには、`false` に設定します。NodeJS と Python で使用されます。デフォルトは `true` です。                                                                                                                                                                                                                                                                                                                                                                                                        |
| `coldStartTraceMinDuration` | コールドスタートトレースでトレースするモジュールロードイベントの最小継続時間 (ミリ秒) を設定します。数値。デフォルトは `3` です。                                                                                                                                                                                                                                                                                                                                                                   |
| `coldStartTraceSkipLibs`    | オプションで、カンマで区切られたライブラリのリストに対してコールドスタートスパンの作成をスキップすることができます。深さを制限したり、既知のライブラリをスキップするのに便利です。デフォルトはランタイムに依存します。                                                                                                                                                                                                                                                                                                                                       |
| `enableProfiling`           | Datadog Continuous Profiler を `true` で有効にします。NodeJS と Python のベータ版でサポートされています。デフォルトは `false` です。                                                                                                                                                                                                                                                                                                                                                                                   |
| `encodeAuthorizerContext`   | Lambda オーサライザーで `true` に設定すると、トレースコンテキストがレスポンスにエンコードされて伝搬されます。NodeJS と Python でサポートされています。デフォルトは `true` です。                                                                                                                                                                                                                                                                                                                              |
| `decodeAuthorizerContext`   | Lambda オーサライザーで認可された Lambda に対して `true` を設定すると、エンコードされたトレースコンテキストをパースして使用します (見つかった場合)。NodeJS と Python でサポートされています。デフォルトは `true` です。                                                                                                                                                                                                                                                                                                       |
| `apmFlushDeadline`          | タイムアウトが発生する前にスパンを送信するタイミングをミリ秒単位で決定するために使用されます。AWS Lambda の呼び出しの残り時間が設定された値よりも小さい場合、トレーサーは、現在のアクティブなスパンとすべての終了したスパンの送信を試みます。NodeJS と Python でサポートされています。デフォルトは `100` ミリ秒です。                                                                                                                                                                                    |

## UDS の仕組み

このマクロにより CloudFormation テンプレートが変更され、[Node.js][2]、[Python][1]、[.NET][9]、および [Java][10] 用の Lambda レイヤーを関数にアタッチすることで Datadog Lambda ライブラリがインストールされます。そして、コードの変更を必要とせずに、Lambda ライブラリを初期化する置換ハンドラーへリダイレクトされます。

## ヘルプ

### デバッグログ

デバッグの問題が発生した場合は、CloudWatch ログでマクロ Lambda 関数を確認することができます。CloudWatch ログへのアクセス方法:

- マクロ CloudFormation スタック (手順に従ってコマンドをコピーした場合、名称は `datadog-serverless-macro` となります) を検索します
- 「Resources」タブをクリックして、論理 ID が`MacroFunctionLogGroup` のCloudWatch ロググループを見つけます

### エラーメッセージ: 'FunctionName' プロパティが未定義です...

このエラーは、`forwarderArn` を提供し、Lambda 関数を初めてデプロイする場合に発生します。ロググループが存在せず、マクロはこのロググループの作成または Forwarder へのサブスクライブができません。この問題を修正する一つの方法は、Lambda で `FunctionName` プロパティを明示的に定義することです（下記の例を参照）。

```yml
Resources:
  MyLambda:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs12.x
      FunctionName: MyFunctionName # このプロパティを Lambda に追加します
```

`FunctionName` を明示的に定義できない（または定義しない）場合は、SAM テンプレートまたは CDK ソースコードから `forwarderArn` パラメーターを削除し、以下のように [AWS::Logs::SubscriptionFilter][7] リソースを使用してサブスクリプションフィルターを定義します。

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

### エラーメッセージ: 'logGroupNamePrefix' は制約を満たせませんでした...

`FunctionName` に、`!Sub` などの CloudFormation 関数が含まれる場合、`forwarderArn` オプションは機能しません。この場合、マクロは実際の関数名にアクセスできません（CloudFormation は変換後に関数を実行します）。そのため、関数にロググループやサブスクリプションフィルターを作成できません。

SAM テンプレートまたは CDK ソースコードから `forwarderArn` パラメーターを削除し、以下のように [AWS::Logs::SubscriptionFilter][7] リソースを使用してサブスクリプションフィルターを定義します。

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

### エラーメッセージ: 'Failed to execute transform DatadogServerless'

このエラーは、コマンドを実行する IAM ユーザーに `lambda:InvokeFunction` 権限がない場合に発生する可能性があります。そのユーザーの IAM ロールに権限を追加してください。

## ヘルプ

製品のフィードバックや質問については、[Slack の Datadog コミュニティ](https://chat.datadoghq.com/)の `#serverless` チャンネルに参加してください。

[1]: https://github.com/DataDog/datadog-lambda-layer-python
[2]: https://github.com/DataDog/datadog-lambda-layer-js
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html
[4]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.Stack.html
[5]: https://github.com/DataDog/datadog-lambda-python/releases
[6]: https://github.com/DataDog/datadog-lambda-js/releases
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[8]: https://docs.datadoghq.com/ja/serverless/datadog_lambda_library/extension/
[9]: https://github.com/DataDog/dd-trace-dotnet-aws-lambda-layer/releases
[10]: https://github.com/DataDog/datadog-lambda-java/releases