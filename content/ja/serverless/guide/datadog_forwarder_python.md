---
kind: ガイド
title: Datadog Forwarder を使用した Python サーバーレスアプリケーションのインスツルメンテーション
---
## 概要

<div class="alert alert-warning">
Datadog Serverless の新規ユーザーの場合、代わりに <a href="/serverless/installation/python">Datadog Lambda Extension を使用して Lambda 関数をインスツルメントする手順</a>に従ってください。Lambda がすぐに使える機能を提供する前に、Datadog Forwarder で Datadog Serverless をセットアップした場合は、このガイドを使用してインスタンスを維持してください。
</div>

## 前提条件

[Datadog Forwarder Lambda 関数][1]は、AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要です。

## コンフィギュレーション

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI は、既存の Lambda 関数のコンフィギュレーションを修正し、新しいデプロイを必要とせずにインスツルメンテーションを可能にします。Datadog のサーバーレスモニタリングをすばやく開始するための最適な方法です。

CI/CD パイプラインにコマンドを追加してすべてのサーバーレスアプリケーションにインスツルメンテーションを有効化することも可能です。Datadog CLI コマンドによる変更が上書きされないよう、通常のサーバーレスアプリケーションのデプロイ*後*にコマンドを実行します。

### Install

NPM または Yarn を使用して Datadog CLI をインストールします。

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### インスツルメントする

関数をインスツルメントするには、[AWS 資格情報][1]を使用して次のコマンドを実行します。

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> --forwarder <forwarder_arn>
```

関数をインスツルメントするには、AWS CDK アプリの `Stack` オブジェクトに `DatadogServerless` 変換と `CfnMapping` を追加します。以下の Python のサンプルコードを参照してください (他の言語での使用方法も同様です)。
- `<functionname>` と `<another_functionname>` を Lambda 関数名に置き換えます。
- `<aws_region>` を AWS リージョン名に置き換えます。
- `<layer_version>` を目的のバージョンの Datadog Lambda ライブラリに置き換えます。最新バージョンは `{{< latest-lambda-layer-version layer="python" >}}` です。
- `<forwarder_arn>` を Forwarder ARN に置き換えます ([Forwarder のドキュメント][2]を参照)。

例:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v {{< latest-lambda-layer-version layer="python" >}} --forwarder "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
```

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog CLI でインスツルメントするには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][5]に追加する必要があります。

[CLI のドキュメント][4]に詳細と追加のパラメーターがあります。

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[4]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
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
        forwarderArn: # The Datadog Forwarder ARN goes here.
    ```
   Datadog Forwarder ARN またはインストールの詳細については、[こちら][2]を参照してください。追加の設定については、[プラグインのドキュメント][1]を参照してください。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog CloudFormation マクロ][1]は、SAM アプリケーションテンプレートを自動的に変換して、レイヤーを使用して Datadog Lambda ライブラリを関数に追加し、[Datadog Forwarder][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

### Install

[AWS 認証情報][3]で次のコマンドを実行して、マクロ AWS リソースをインストールする CloudFormation スタックをデプロイします。アカウントの特定のリージョンに**一度だけ**マクロをインストールする必要があります。マクロを最新バージョンに更新するには、`create-stack` を `update-stack` に置き換えます。

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

マクロが表示され、使用を開始できます。

### インスツルメントする

関数をインスツルメントするには、SAM の `AWS::Serverless` 変換の**後に**、`Transform` セクションの下の `template.yml` に以下を追加します。

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      pythonLayerVersion: "{{< latest-lambda-layer-version layer="python" >}}"
      stackName: !Ref "AWS::StackName"
      forwarderArn: "<FORWARDER_ARN>"
      service: "<SERVICE>" # オプション
      env: "<ENV>" # オプション
```

関数をインスツルメントするには、AWS CDK アプリの `Stack` オブジェクトに `DatadogServerless` 変換と `CfnMapping` を追加します。以下の Python のサンプルコードを参照してください (他の言語での使用方法も同様です)。
- `<FORWARDER_ARN>` を Forwarder ARN に置き換えます ([Forwarder のドキュメント][2]を参照)。
- `<SERVICE>` と `<ENV>` をサービスと環境の値に置き換えます。

Lambda 関数が、コード署名を使用するよう構成してある場合、マクロを使用するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][4]に追加する必要があります。

[マクロのドキュメント][1]に詳細と追加のパラメーターがあります。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog CloudFormation マクロ][1]は、AWS CDK によって生成された CloudFormation テンプレートを自動的に変換して、レイヤーを使用して Datadog Lambda ライブラリを関数に追加し、[Datadog Forwarder][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

### Install

[AWS 認証情報][3]で次のコマンドを実行して、マクロ AWS リソースをインストールする CloudFormation スタックをデプロイします。アカウントの特定のリージョンに**一度だけ**マクロをインストールする必要があります。マクロを最新バージョンに更新するには、`create-stack` を `update-stack` に置き換えます。

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

マクロが表示され、使用を開始できます。

### インスツルメントする

関数をインスツルメントするには、AWS CDK アプリの `Stack` オブジェクトに `DatadogServerless` 変換と `CfnMapping` を追加します。以下の Python のサンプルコードを参照してください (他の言語での使用方法も同様です)。

```python
from aws_cdk import core

class CdkStack(core.Stack):
  def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
    super().__init__(scope, id, **kwargs)
    self.add_transform("DatadogServerless")

    mapping = core.CfnMapping(self, "Datadog",
      mapping={
        "Parameters": {
          "pythonLayerVersion": "{{< latest-lambda-layer-version layer="python" >}}",
          "forwarderArn": "<FORWARDER_ARN>",
          "stackName": self.stackName,
          "service": "<SERVICE>",  # オプション
          "env": "<ENV>",  # オプション
        }
      })
```

関数をインスツルメントするには、AWS CDK アプリの `Stack` オブジェクトに `DatadogServerless` 変換と `CfnMapping` を追加します。以下の Python のサンプルコードを参照してください (他の言語での使用方法も同様です)。
- `<FORWARDER_ARN>` を Forwarder ARN に置き換えます ([Forwarder のドキュメント][2]を参照)。
- `<SERVICE>` と `<ENV>` をサービスと環境の値に置き換えます。

Lambda 関数が、コード署名を使用するよう構成してある場合、マクロを使用するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][4]に追加する必要があります。

[マクロのドキュメント][1]に詳細と追加のパラメーターがあります。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Zappa" %}}

### 設定の更新

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
1. レイヤー ARN のプレースホルダー `<AWS_REGION>`、`<RUNTIME>`、`<VERSION>` に適切な値を挿入します。利用可能な `RUNTIME` オプションは {{< latest-lambda-layer-version layer="python-versions" >}} です。最新の `VERSION` は `{{< latest-lambda-layer-version layer="python" >}}` です。例:
    ```
    # For regular regions
    arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="python-example-version" >}}:{{< latest-lambda-layer-version layer="python" >}}

    # For us-gov regions
    arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-{{< latest-lambda-layer-version layer="python-example-version" >}}:{{< latest-lambda-layer-version layer="python" >}}
    ```
1. Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][1]に追加します。

### サブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブします。

1. [まだの場合は、Datadog Forwarder をインストールします][2]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][3]。

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Chalice" %}}

### プロジェクトの更新

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

1. Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][5]に追加します。

### サブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブします。

1. [まだの場合は、Datadog Forwarder をインストールします][3]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][4]。

[1]: https://aws.github.io/chalice/topics/middleware.html?highlight=handler#registering-middleware
[3]: https://docs.datadoghq.com/ja/serverless/forwarder/
[4]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Container Image" %}}

### Install

Lambda 関数をコンテナイメージとしてデプロイする場合は、Datadog Lambda ライブラリをレイヤーとして使用できません。代わりに、Datadog Lambda ライブラリを、イメージ内の関数の依存関係としてインストールする必要があります。


```sh
pip install datadog-lambda
```

`datadog-lambda` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、`datadog-lambda v0.5.0` は、レイヤーバージョン 5 のコンテンツに一致します。

### 構成

以下の手順に従って、関数を構成します。

1. イメージの `CMD` 値を `datadog_lambda.handler.handler` に設定します。AWS で設定するか、Dockerfile 内で直接設定します。両方の値を設定した場合、AWS で設定した値が Dockerfile 内の値をオーバーライドします。
2. AWS で以下の環境変数を設定します。
  - 元のハンドラーに `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
  - `DD_TRACE_ENABLED` を `true` に設定します。
  - `DD_FLUSH_TO_LOG` を `true` に設定します。
3. オプションで、関数に `service` および `env` タグを適切な値とともに追加します。

### サブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブします。

1. [まだの場合は、Datadog Forwarder をインストールします][1]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][2]。


[1]: https://docs.datadoghq.com/ja/serverless/forwarder/
[2]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Custom" %}}

### Install

Datadog Lambda ライブラリは、レイヤー (推奨) または Python パッケージとしてインストールできます。

`datadog-lambda` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、datadog-lambda v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致します。

#### レイヤーの使用

以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

```
# us、us3、us5、ap1、eu リージョンの場合
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# 米国政府リージョンの場合
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

利用可能な `RUNTIME` オプションは {{< latest-lambda-layer-version layer="python-versions" >}} です。最新の `VERSION` は `{{< latest-lambda-layer-version layer="python" >}}` です。例:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="python-example-version" >}}:{{< latest-lambda-layer-version layer="python" >}}
```

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog Lambda ライブラリをレイヤーとして追加するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][9]に追加する必要があります。


#### パッケージの使用

`datadog-lambda` とその依存関係を、ローカルで関数プロジェクトフォルダーにインストールします。**注**: `datadog-lambda` はネイティブ拡張機能である `ddtrace` に依存するため、これらは Linux 環境でインストールおよびコンパイルを行う必要があります。例えば、Serverless Framework には [dockerizePip][3] を、AWS SAM には [--use-container][4] を使用することができます。詳しくは、[関数デプロイメントパッケージに依存関係を追加する方法][5]をご参照ください。

```
pip install datadog-lambda -t ./
```

[最新リリース][6]を参照。

### 構成

以下の手順に従って、関数を構成します。

1. 関数のハンドラーを `datadog_lambda.handler.handler` に設定します。
2. 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
3. 環境変数 `DD_TRACE_ENABLED` を `true` に設定します。
4. 環境変数 `DD_FLUSH_TO_LOG` を `true` に設定します。
5. オプションで、関数に `service` および `env` タグを適切な値とともに追加します。

### サブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブします。

1. [まだの場合は、Datadog Forwarder をインストールします][7]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][8]。


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: https://github.com/UnitedIncome/serverless-python-requirements#cross-compiling
[4]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html
[5]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[6]: https://pypi.org/project/datadog-lambda/
[7]: https://docs.datadoghq.com/ja/serverless/forwarder/
[8]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[9]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{< /tabs >}}

### タグ

オプションではありますが、Datadog では以下の[統合サービスタグ付けのドキュメント][2]に従いサーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けすることをお勧めします。

## 確認

以上の方法で関数を構成すると、[Serverless Homepage][3] でメトリクス、ログ、トレースを確認できるようになります。

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

カスタムメトリクス送信の詳細については、[ここ][4]を参照してください。カスタムインスツルメンテーションの詳細については、[カスタムインスツルメンテーション][5]の Datadog APM ドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/serverless/forwarder
[2]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[3]: https://app.datadoghq.com/functions
[4]: /ja/serverless/custom_metrics?tab=python
[5]: /ja/tracing/custom_instrumentation/python/