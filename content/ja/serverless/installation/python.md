---
title: Python アプリケーションのインスツルメンテーション
kind: ドキュメント
further_reading:
  - link: /serverless/serverless_integrations/plugin/
    tag: Documentation
    text: Datadog サーバーレスプラグイン
  - link: /serverless/serverless_integrations/macro/
    tag: Documentation
    text: Datadog のサーバーレスマクロ
  - link: /serverless/serverless_integrations/cli/
    tag: Documentation
    text: Datadog サーバーレス CLI
  - link: serverless/serverless_tagging/
    tag: Documentation
    text: サーバーレスアプリケーションのタグ付け
  - link: serverless/distributed_tracing/
    tag: Documentation
    text: サーバーレスアプリケーションのトレース
  - link: serverless/custom_metrics/
    tag: Documentation
    text: サーバーレスアプリケーションからのカスタムメトリクスの送信
---
## 必須セットアップ

未構成の場合:

- [AWS インテグレーション][1]をインストールします。これにより、Datadog は AWS から Lambda メトリクスを取り込むことができます。
- AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要な [Datadog Forwarder Lambda 関数][2]をインストールします。

[AWS インテグレーション][1]と [Datadog Forwarder][2] をインストールしたら、手順に従ってアプリケーションをインスツルメントし、Datadog にメトリクス、ログ、トレースを送信します。

## コンフィギュレーション

{{< tabs >}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Plugin][1] は、レイヤーを使用して Datadog Lambda ライブラリを関数に自動的に追加し、[Datadog Forwarder][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog Serverless Plugin をインストールする前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][3]に追加する必要があります。

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
        forwarder: # The Datadog Forwarder ARN goes here.
    ```
   Datadog Forwarder ARN またはインストールの詳細については、[こちら][2]を参照してください。追加の設定については、[プラグインのドキュメント][1]を参照してください。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog CloudFormation マクロ][1]は、SAM アプリケーションテンプレートを自動的に変換して、レイヤーを使用して Datadog Lambda ライブラリを関数に追加し、[Datadog Forwarder][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

### Datadog CloudFormation マクロのインストール

[AWS 認証情報][3]で次のコマンドを実行して、マクロ AWS リソースをインストールする CloudFormation スタックをデプロイします。アカウントの特定のリージョンに**一度だけ**マクロをインストールする必要があります。マクロを最新バージョンに更新するには、`create-stack` を `update-stack` に置き換えます。

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

マクロが表示され、使用を開始できます。

### 関数をインスツルメントする

`template.yml` で、SAM の `AWS::Serverless` 変換の**後に**、`Transform` セクションの下に以下を追加します。

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      pythonLayerVersion: "<LAYER_VERSION>"
      stackName: !Ref "AWS::StackName"
      forwarderArn: "<FORWARDER_ARN>"
      service: "<SERVICE>" # オプション
      env: "<ENV>" # オプション
```

`<SERVICE>` と `<ENV>` を適切な値に置き換え、`<LAYER_VERSION>` を目的のバージョンの Datadog Lambda レイヤーに置き換え ([最新リリース][4]を参照)、`<FORWARDER_ARN>` を Forwarder ARN に置き換えます ([Forwarder のドキュメント][2]を参照)。

Lambda 関数が、コード署名を使用するよう構成してある場合、マクロを使用するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][5]に追加する必要があります。

[マクロのドキュメント][1]に詳細と追加のパラメーターがあります。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://github.com/DataDog/datadog-lambda-python/releases
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog CloudFormation マクロ][1]は、AWS CDK によって生成された CloudFormation テンプレートを自動的に変換して、レイヤーを使用して Datadog Lambda ライブラリを関数に追加し、[Datadog Forwarder][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

### Datadog CloudFormation マクロのインストール

[AWS 認証情報][3]で次のコマンドを実行して、マクロ AWS リソースをインストールする CloudFormation スタックをデプロイします。アカウントの特定のリージョンに**一度だけ**マクロをインストールする必要があります。マクロを最新バージョンに更新するには、`create-stack` を `update-stack` に置き換えます。

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

マクロが表示され、使用を開始できます。

### 関数をインスツルメントする

AWS CDK アプリの `Stack` オブジェクトに `DatadogServerless` 変換と `CfnMapping` を追加します。以下の Python のサンプルコードを参照してください (他の言語での使用方法も同様です)。

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
        }
      })
```

`<SERVICE>` と `<ENV>` を適切な値に置き換え、`<LAYER_VERSION>` を目的のバージョンの Datadog Lambda レイヤーに置き換え ([最新リリース][4]を参照)、`<FORWARDER_ARN>` を Forwarder ARN に置き換えます ([Forwarder のドキュメント][2]を参照)。

Lambda 関数が、コード署名を使用するよう構成してある場合、マクロを使用するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][5]に追加する必要があります。

[マクロのドキュメント][1]に詳細と追加のパラメーターがあります。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://github.com/DataDog/datadog-lambda-python/releases
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
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
    # For regular regions
    arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:19

    # For us-gov regions
    arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Python37:19
    ```
1. Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][2]に追加します。

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][3]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][4]。


[1]: https://github.com/DataDog/datadog-lambda-python/releases
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[3]: https://docs.datadoghq.com/ja/serverless/forwarder/
[4]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Chalice" %}}

### Chalice プロジェクトを更新する

1. `config.json` で環境変数 `DD_TRACE_ENABLED` と `DD_FLUSH_TO_LOG` を `"true"` に設定します。
    ```json
    {
      "version": "2.0",
      "app_name": "hello-chalice",
      "stages": {
        "dev": {
          "api_gateway_stage": "api",
          "environment_variables": {
            "DD_TRACE_ENABLED": "true",
            "DD_FLUSH_TO_LOG": "true"
          }
        }
      }
    }
    ```
1. `requirements.txt` に `datadog_lambda` を追加します。
1. `app.py` の[ミドルウェア][1]として `datadog_lambda_wrapper` を登録します。
    ```python
    from chalice import Chalice, ConvertToMiddleware
    from datadog_lambda.wrapper import datadog_lambda_wrapper

    app = Chalice(app_name='hello-chalice')

    app.register_middleware(ConvertToMiddleware(datadog_lambda_wrapper))

    @app.route('/')
    def index():
        return {'hello': 'world'}
    ```
1. Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][2]に追加します。

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに対して Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][3]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][4]。


[1]: https://aws.github.io/chalice/topics/middleware.html?highlight=handler#registering-middleware
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[3]: https://docs.datadoghq.com/ja/serverless/forwarder/
[4]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Datadog CLI" %}}

<div class="alert alert-warning"> このサービスは公開ベータ版です。フィードバックがございましたら、<a href="/help">Datadog サポートチーム</a>までお寄せください。</div>

Datadog CLI を使用して、CI/CD パイプラインの Lambda 関数にインスツルメンテーションを設定します。CLI コマンドは、レイヤーを使用して Datadog Lambda ライブラリを関数に自動的に追加し、メトリクス、トレース、ログを Datadog に送信するように関数を構成します。

### Datadog CLI のインストール

NPM または Yarn を使用して Datadog CLI をインストールします。

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### 関数をインスツルメントする

[AWS 認証情報][1]を使用して次のコマンドを実行します。`<functionname>` と `<another_functionname>` を Lambda 関数名に置き換え、`<aws_region>` を AWS リージョン名に置き換え、`<layer_version>` を目的のバージョンの Datadog Lambda レイヤーに置き換え ([最新リリース][2]を参照)、`<forwarder_arn>` を Forwarder ARN に置き換えます ([Forwarder のドキュメント][3]を参照)。

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> --forwarder <forwarder_arn>
```

例:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v 19 --forwarder arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
```

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog CLI でインスツルメントするには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][4]に追加する必要があります。

[CLI のドキュメント][5]に詳細と追加のパラメーターがあります。

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-lambda-python/releases
[3]: https://docs.datadoghq.com/ja/serverless/forwarder/
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[5]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Container Image" %}}

### Datadog Lambda ライブラリのインストール

Lambda 関数をコンテナイメージとしてデプロイする場合は、Datadog Lambda ライブラリをレイヤーとして使用できません。代わりに、Datadog Lambda ライブラリを直接イメージ内にインストールする必要があります。


```sh
pip install datadog-lambda
```

`datadog-lambda` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、`datadog-lambda v0.5.0` は、レイヤーバージョン 5 のコンテンツに一致します。

### 関数の構成

1. イメージの `CMD` 値を `datadog_lambda.handler.handler` に設定します。Dockerfile で直接設定するか、AWS を使用して値を上書きします。
2. 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
3. 環境変数 `DD_TRACE_ENABLED` を `true` に設定します。
4. 環境変数 `DD_FLUSH_TO_LOG` を `true` に設定します。
5. オプションで、関数に `service` および `env` タグを適切な値とともに追加します。

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][1]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][2]。


[1]: https://docs.datadoghq.com/ja/serverless/forwarder/
[2]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Custom" %}}

### Datadog Lambda ライブラリのインストール

Datadog Lambda ライブラリをレイヤー (推奨) または Python パッケージとしてインポートすることができます。

`datadog-lambda` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。例: datadog-lambda v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致。

#### レイヤーの使用

以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

```
# 通常のリージョンの場合
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# 米国政府リージョンの場合
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

使用できる `RUNTIME` オプションは、`Python27`、`Python36`、`Python37`、`Python38` です。`VERSION` については、[最新リリース][2]を参照してください。例:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:19
```

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog Lambda ライブラリをレイヤーとして追加するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][3]に追加する必要があります。

#### パッケージの使用

`datadog-lambda` とその依存関係を、ローカルで関数プロジェクトフォルダーにインストールします。**注**: `datadog-lambda` はネイティブ拡張機能である `ddtrace` に依存するため、これらは Linux 環境でインストールおよびコンパイルを行う必要があります。例えば、Serverless Framework には [dockerizePip][4] を、AWS SAM には [--use-container][5] を使用することができます。詳しくは、[関数デプロイメントパッケージに依存関係を追加する方法][6]をご参照ください。

```
pip install datadog-lambda -t ./
```

[最新リリース][7]を参照。

### 関数の構成

1. 関数のハンドラーを `datadog_lambda.handler.handler` に設定します。
2. 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
3. 環境変数 `DD_TRACE_ENABLED` を `true` に設定します。
4. 環境変数 `DD_FLUSH_TO_LOG` を `true` に設定します。
5. オプションで、関数に `service` および `env` タグを適切な値とともに追加します。

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][8]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][9]。


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-python/releases
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[4]: https://github.com/UnitedIncome/serverless-python-requirements#cross-compiling
[5]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html
[6]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[7]: https://pypi.org/project/datadog-lambda/
[8]: https://docs.datadoghq.com/ja/serverless/forwarder/
[9]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{< /tabs >}}

### 統合サービスタグ付け

これはオプションですが、Datadog は、[統合サービスタグ付けのドキュメント][3]に従って、サーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けすることを強くお勧めします。

## Datadog サーバーレスモニタリングの利用

以上の方法で関数を構成すると、[Serverless Homepage][4] でメトリクス、ログ、トレースを確認できるようになります。

## カスタムビジネスロジックの監視

カスタムメトリクスまたはスパンの送信をご希望の場合は、以下のコード例をご参照ください。

```python
import time
from ddtrace import tracer
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    # Lambda 関数スパンにカスタムタグを追加します
    # X-Ray トレーシングが有効になっている場合は機能しません
    current_span = tracer.current_span()
    if current_span:
        current_span.set_tag('customer.id', '123456')

    # カスタムスパンを送信します
    with tracer.trace("hello.world"):
        print('Hello, World!')

    # カスタムメトリクスを送信します
    lambda_metric(
        metric_name='coffee_house.order_value',
        value=12.45,
        timestamp=int(time.time()), # オプション、過去 20 分以内である必要があります
        tags=['product:latte', 'order:online']
    )

    return {
        'statusCode': 200,
        'body': get_message()
    }

# 関数をトレースします
@tracer.wrap()
def get_message():
    return 'Hello from serverless!'
```

カスタムメトリクス送信の詳細については、[ここ][5]を参照してください。カスタムインスツルメンテーションの詳細については、[カスタムインスツルメンテーション][6]の Datadog APM ドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_web_services/
[2]: /ja/serverless/forwarder
[3]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[4]: https://app.datadoghq.com/functions
[5]: /ja/serverless/custom_metrics?tab=python
[6]: /ja/tracing/custom_instrumentation/python/