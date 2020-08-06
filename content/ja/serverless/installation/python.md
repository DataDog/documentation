---
title: Python アプリケーションのインスツルメンテーション
kind: ドキュメント
further_reading:
  - link: serverless/installation/node
    tag: Documentation
    text: Node.js サーバーレスモニタリングのインストール
  - link: serverless/installation/ruby
    tag: Documentation
    text: Ruby サーバーレスモニタリングのインストール
---
AWS インテグレーションをインストール][1]したら、以下のいずれかの方法を選択してアプリケーションをインスツルメントし、Datadog にメトリクス、ログ、トレースを送信します。

## 構成

{{< tabs >}}
{{% tab "Serverless Framework" %}}

コードを変更せずにメトリクス、ログ、トレースをアプリケーションから Datadog へ送信するには、[Datadog サーバーレスプラグイン][1]を使用します。プラグインにより、Python 用 Datadog Lambda ライブラリがレイヤーを使用した関数に自動的にアタッチされます。そしてデプロイ時に、元の関数ハンドラーは、Datadog Lambda ライブラリを初期化し元の関数ハンドラーを呼び出す Datadog 提供ハンドラーに置き換えられます。また、これにより Lambda 関数の Datadog および X-Ray トレーシングが可能になります。

Datadog サーバーレスプラグインをインストールして構成するには、次の手順に従います。

1. Datadog サーバーレスプラグインをインストールします。
      ```
    yarn add --dev serverless-plugin-datadog
    ```
2. `serverless.yml` に以下を追加します。
    ```
    plugins:
      - serverless-plugin-datadog
    ```
3. `serverless.yml` に、以下のセクションも追加します。
    ```
    custom:
      datadog:
        flushMetricsToLogs: true
        forwarder: # The Datadog Forwarder ARN goes here.
    ```
    Forwarder ARN について、および Forwarder のインストール方法に関する詳細は、[Forwarder ドキュメント][2]をご参照ください。
4. サーバーレスアプリケーションを再デプロイします。

[1]: https://github.com/DataDog/serverless-plugin-datadog
[2]: https://docs.datadoghq.com/ja/serverless/troubleshooting/installing_the_forwarder
{{% /tab %}}
{{% tab "AWS SAM" %}}
<div class="alert alert-warning"> このサービスは公開ベータ版です。フィードバックがございましたら、<a href="/help">Datadog サポートチーム</a>までお寄せください。</div>

### Datadog CloudFormation マクロのデプロイ

コードをインスツルメントせずにアプリケーションからトレースを取り込むには、[Datadog CloudFormation マクロ][1]を使用します。マクロは、Node.js と Python 用の Datadog Lambda ライブラリを関数に自動的にアタッチします。デプロイ時に、既存の関数をラップする新しいハンドラー関数を生成し、Lambda ライブラリを初期化します。

マクロをインストールするには、次の手順に従います。

1. ローカル環境で Datadog CloudFormation マクロレポジトリのクローンを作成します。
```
git clone https://github.com/DataDog/datadog-cloudformation-macro.git
```
2. マクロとその依存関係をインストールします。
```
yarn install # Yarn users
npm install  # NPM users
```
3. ビルドスクリプトを実行します。
```
yarn build    # Yarn users
npm run build # NPM users
```

Lambda 関数と同じリージョンにマクロをデプロイします。Lambda 関数を監視するすべてのリージョンにマクロをデプロイする必要があります。

4. マクロ用に CloudFormation アーティファクトを保存するには S3 バケットが必要です。まだバケットがない場合は、以下を使用して作成できます。

   ```bash
      aws s3 mb s3://<bucket name>
   ```
5. 提供されている CloudFormation テンプレート (`macro_template.yml`) のパッケージを実行します。これには、Lambda 関数および CloudFormation マクロソースが含まれます。このテンプレートは AWS Serverless Application Model (SAM) を使用するため、デプロイ前に変化する必要があります。

  ```bash
    aws cloudformation package \
        --template-file macro_template.yml \
        --s3-bucket <your bucket name here> \
        --output-template-file packaged.template
    ```

6. パッケージ化された CloudFormation テンプレートを CloudFormation スタックにデプロイします。

    ```bash
    aws cloudformation deploy \
        --stack-name datadog-cfn-macro \
        --template-file packaged.template \
        --capabilities CAPABILITY_IAM
    ```

マクロが表示され、使用を開始できます。

### Datadog Lambda ライブラリのインストール

コードをインスツルメントせずにアプリケーションからトレース、ログ、拡張メトリクスを取り込むには、Datadog CloudFormation マクロを使用します。マクロは、Node.js と Python 用の Datadog Lambda ライブラリを関数に自動的にアタッチします。デプロイ時に、既存の関数をラップする新しいハンドラー関数を生成し、Lambda ライブラリを初期化します。

CloudFormation マクロを使用して Datadog Lambda ライブラリをインストールするには、次の手順に従います。

1. `template.yml` に以下を追加します。
  ```
  Transform:
    - Name: DatadogCfnMacro
      Parameters:
        enableDDTracing: true
        flushMetricsToLogs: true
        stackName: !Ref "AWS::StackName"
        forwarderArn: "arn:aws:lambda:<REGION>:<ACCOUNT-ID>:function:datadog-forwarder"
  ```
  Datadog Forwarder ARN は、[AWS コンソール][2]にあります。Forwarder のインストールに関する詳細は、[公式ドキュメント][3]をご参照ください。

2. サーバーレスアプリケーションを再デプロイします。

[1]: https://github.com/DataDog/datadog-cloudformation-macro
[2]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[3]: https://docs.datadoghq.com/ja/serverless/troubleshooting/installing_the_forwarder
{{% /tab %}}
{{% tab "AWS CDK" %}}

<div class="alert alert-warning"> このサービスは公開ベータ版です。フィードバックがございましたら、<a href="/help">Datadog サポートチーム</a>までお寄せください。</div>

### Datadog CloudFormation マクロのデプロイ

コードをインスツルメントせずにアプリケーションからトレースを取り込むには、[Datadog CloudFormation マクロ][1]を使用します。マクロは、Node.js と Python 用の Datadog Lambda ライブラリを関数に自動的にアタッチします。デプロイ時に、既存の関数をラップする新しいハンドラー関数を生成し、Lambda ライブラリを初期化します。

マクロをインストールするには、次の手順に従います。

1. ローカル環境で Datadog CloudFormation マクロレポジトリのクローンを作成します。

    ```
    git clone https://github.com/DataDog/datadog-cloudformation-macro.git
    ```

2. マクロとその依存関係をインストールします。

    ```
    yarn install # Yarn users
    npm install  # NPM users
    ```

3. ビルドスクリプトを実行します。

    ```
    yarn build    # Yarn users
    npm run build # NPM users
    ```

Lambda 関数と同じリージョンにマクロをデプロイします。Lambda 関数を監視するすべてのリージョンにマクロをデプロイする必要があります。

4. マクロ用に CloudFormation アーティファクトを保存するには S3 バケットが必要です。まだバケットがない場合は、作成できます。

    ```bash
      aws s3 mb s3://<bucket name>
    ```

5. 提供されている CloudFormation テンプレート (`macro_template.yml`) のパッケージを実行します。これには、Lambda 関数および CloudFormation マクロソースが含まれます。このテンプレートは AWS Serverless Application Model (SAM) を使用するため、デプロイ前に変化する必要があります。

    ```bash
    aws cloudformation package \
        --template-file macro_template.yml \
        --s3-bucket <your bucket name here> \
        --output-template-file packaged.template
    ```

6. パッケージ化された CloudFormation テンプレートを CloudFormation スタックにデプロイします。

    ```bash
    aws cloudformation deploy \
        --stack-name datadog-cfn-macro \
        --template-file packaged.template \
        --capabilities CAPABILITY_IAM
    ```

マクロが表示され、使用を開始できます。

### Datadog Lambda ライブラリのインストール

コードをインスツルメントせずにアプリケーションからトレース、ログ、拡張メトリクスを取り込むには、Datadog CloudFormation マクロを使用します。マクロは、Node.js と Python 用の Datadog Lambda ライブラリを関数に自動的にアタッチします。デプロイ時に、既存の関数をラップする新しいハンドラー関数を生成し、Lambda ライブラリを初期化します。

CloudFormation マクロを使用して Datadog Lambda ライブラリをインストールするには、次の手順に従います。

1. AWS CDK アプリで、`CfnMapping` を `Stack` オブジェクトに追加します。
  ```python
    from aws_cdk import core
  ```

  ```python

        self.add_transform("DatadogCfnMacro")

        mapping = core.CfnMapping(self, "Datadog",
          mapping={
            "Parameters": {
              "forwarderArn": "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder",
              "stackName": self.stackName,
              "enableDDTracing": "true",
              "flushMetricsToLogs": "true",
            }
          })
  ```

    Datadog Forwarder ARN は、[AWS コンソール][2]にあります。Forwarder のインストールに関する詳細は、[公式ドキュメント][3]をご参照ください。

2. サーバーレスアプリケーションを再デプロイします。

[1]: https://github.com/DataDog/datadog-cloudformation-macro
[2]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[3]: https://docs.datadoghq.com/ja/serverless/troubleshooting/installing_the_forwarder

{{% /tab %}}
{{% tab "Zappa" %}}

### Zappa 設定の更新

1. `zappa_settings.json` に下記の設定を追加します。
    ```json
    {
        "dev": {
            "layers": ["arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>"],
            "lambda_handler": "datadog_lambda.handler.handler",
            "aws_environment_variables": {
                "DD_LAMBDA_HANDLER": "handler.lambda_handler",
                "DD_TRACE_ENABLED": "true",
                "DD_FLUSH_TO_LOG": "true",
            },
        }
    }
    ```
1. レイヤー ARN のプレースホルダー `<AWS_REGION>`、`<RUNTIME>`、`<VERSION>` に適切な値を挿入します。`RUNTIME` には `Python27`、`Python36`、`Python37`、`Python38` のいずれかを使用できます。`VERSION` については、[最新リリース][1]をご確認ください。例:
    ```
    arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:19
    ```

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][2]。
2. [DdFetchLambdaTags のオプションが有効であることを確認します][3]。
3. [Datadog Forwarder を関数のロググループにサブスクライブします][4]。


[1]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[2]: https://docs.datadoghq.com/ja/serverless/troubleshooting/installing_the_forwarder
[3]: https://docs.datadoghq.com/ja/serverless/troubleshooting/installing_the_forwarder/#experimental-optional
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=automaticcloudformation#send-aws-service-logs-to-datadog
{{% /tab %}}
{{% tab "Custom" %}}

### Datadog Lambda ライブラリのインストール

Datadog Lambda ライブラリをレイヤーまたは Python パッケージとしてインポートすることができます。

`datadog-lambda` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。例: datadog-lambda v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致。

#### レイヤーの使用

以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```

使用できる `RUNTIME` オプションは、`Python27`、`Python36`、`Python37`、`Python38` です。`VERSION` については、[最新リリース][2]を参照してください。例:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:19
```

#### パッケージの使用

`datadog-lambda` とその依存関係を、ローカルで関数プロジェクトフォルダーにインストールします。詳しくは、[関数デプロイメントパッケージに依存関係を追加する方法][3]をご参照ください。

```
pip install datadog-lambda -t ./
```

[最新リリース][4]を参照。

### 関数の構成

1. 関数のハンドラーを `datadog_lambda.handler.handler` に設定します。
2. 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
3. 環境変数 `DD_TRACE_ENABLED` を `true` に設定します。
4. 環境変数 `DD_FLUSH_TO_LOG` を `true` に設定します。
5. オプションで、関数に `service` および `env` タグを適切な値とともに追加します。

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][5]。
2. [DdFetchLambdaTags のオプションが有効であることを確認します][6]。
3. [Datadog Forwarder を関数のロググループにサブスクライブします][7]。


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[3]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[4]: https://pypi.org/project/datadog-lambda/
[5]: https://docs.datadoghq.com/ja/serverless/troubleshooting/installing_the_forwarder
[6]: https://docs.datadoghq.com/ja/serverless/troubleshooting/installing_the_forwarder/#experimental-optional
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=automaticcloudformation#send-aws-service-logs-to-datadog
{{% /tab %}} 
{{< /tabs >}}

## Datadog サーバーレスモニタリングの利用

以上の方法で関数を構成すると、[Serverless ページ][2]でメトリクス、ログ、トレースを確認できるようになります。カスタムメトリクスの送信または関数の手動インスツルメントをご希望の場合は、以下のコード例をご参照ください。

```python
from ddtrace import tracer
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",  # metric name
        12.45,  # metric value
        tags=['product:latte', 'order:online']  # tags
    )
    return {
        "statusCode": 200,
        "body": get_message()
    }

@tracer.wrap()
def get_message():
    return "Hello from serverless!"
```

[1]: /ja/serverless/#1-install-the-cloud-integration
[2]: https://app.datadoghq.com/functions