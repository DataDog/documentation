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
aliases:
  - /ja/serverless/datadog_lambda_library/python/
  - /ja/serverless/guide/python/
---
## 必須セットアップ

まだ構成が済んでいない場合は、[AWS インテグレーション][1]をインストールします。これにより、Datadog は AWS から Lambda メトリクスを取り込むことができます。[AWS インテグレーション][1]をインストールしたら、手順に従いアプリケーションをインスツルメントし、Datadog にメトリクス、ログ、トレースを送信します。

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="AWS サーバーレスアプリケーションをインスツルメントする"  style="width:100%;">}}

Python Lambda 関数が [Python 3.6 以前][2]のバージョンで記述されていて、以前に Datadog Forwarder 使用して Datadog サーバーレスをセットアップした場合や、Lambda 関数が `us-east-1`、`eu-west-1`、`eu-south-1` リージョンにデプロイされない場合は、[こちら][3]のインストール手順を参照してください。

## コンフィギュレーション

{{< tabs >}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Plugin][1] は、Lambda レイヤーを使用して Datadog Lambda ライブラリを関数に自動的に追加し、[Datadog Lambda 拡張機能][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

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
        addExtension: true
        apiKey: # Your Datadog API Key goes here.
    ```
   Datadog API キーを [API Management ページ][3]で探します。追加の設定については、[プラグインのドキュメント][1]を参照してください。


[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog CloudFormation マクロ][1]は、SAM アプリケーションテンプレートを自動的に変換して、レイヤーを使用して Datadog Lambda ライブラリを関数に追加し、[Datadog Lambda 拡張機能][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

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
      stackName: !Ref "AWS::StackName"
      nodeLayerVersion: "<LAYER_VERSION>"
      extensionLayerVersion: "<EXTENSION_VERSION>"
      service: "<SERVICE>" # オプション
      env: "<ENV>" # オプション
```

`<SERVICE>` と `<ENV>` を適切な値に、`<LAYER_VERSION>` を [目的のバージョン][4] の Datadog Lambda ライブラリに、`<EXTENSION_VERSION>` を [目的のバージョン][5] の Datadog Lambda 拡張機能にそれぞれ置き換えます。

[マクロのドキュメント][1]に詳細と追加のパラメーターがあります。


[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://github.com/DataDog/datadog-lambda-python/releases
[5]: https://gallery.ecr.aws/datadog/lambda-extension
{{% /tab %}}
{{% tab "AWS CDK" %}}


[Datadog CDK コンストラクト][1] は、Lambda レイヤーを使用して Datadog Lambda ライブラリを関数に自動的に追加し、[Datadog Lambda 拡張機能][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

### Datadog CDK コンストラクトライブラリをインストール

CDK プロジェクトで以下のコマンドを実行します。

```sh
#PyPI
pip install datadog-cdk-constructs
```

### 関数をインスツルメントする

AWS CDK アプリで `datadog-cdk-construct` モジュールをインポートして、以下のコンフィギュレーションを追加します。

```python
from datadog_cdk_constructs import Datadog

datadog = Datadog(self, "Datadog",
    python_layer_version=<LAYER_VERSION>,
    extension_layer_version=<EXTENSION_LAYER_VERSION>,
    dd_api_key=<DATADOG_API_KEY>
)
datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>])
```

関数をインスツルメントするには、AWS CDK アプリの `Stack` オブジェクトに `DatadogServerless` 変換と `CfnMapping` を追加します。以下の Python のサンプルコードを参照してください (他の言語での使用方法も同様です)。

- `<DATADOG_API_KEY>` を [API Management ページ][3]の Datadog API キーに置き換えます。
- `<LAYER_VERSION>` を目的のバージョンの Datadog Lambda レイヤーに置き換えます（[最新リリース]を参照ください[2]）。
- `<EXTENSION_VERSION>` を目的のバージョンの Datadog Lambda 拡張機能に置き換えます（[最新リリース]を参照ください[4]）。

さらに詳しい情報や、追加パラメーターについては、[Datadog CDK NPM ページ][1]をご覧ください。


[1]: https://www.npmjs.com/package/datadog-cdk-constructs
[2]: https://github.com/DataDog/datadog-lambda-python/releases
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://gallery.ecr.aws/datadog/lambda-extension
{{% /tab %}}
{{% tab "Zappa" %}}

### 設定の更新

1. `zappa_settings.json` に下記の設定を追加します。
   {{< site-region region="us,us3,eu" >}}  
    ```json
    {
        "dev": {
            "layers": ["arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<LIBRARY_VERSION>", "arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>"],
            "lambda_handler": "datadog_lambda.handler.handler",
            "aws_environment_variables": {
                "DD_LAMBDA_HANDLER": "handler.lambda_handler",
                "DD_TRACE_ENABLED": "true",
                "DD_FLUSH_TO_LOG": "true",
                "DD_API_KEY": "<DATADOG_API_KEY>",
            },
        }
    }
    ```
  {{< /site-region >}}
  {{< site-region region="gov" >}}
      ```json
    {
        "dev": {
            "layers": ["arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<LIBRARY_VERSION>", "arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:<EXTENSION_VERSION>"],
            "lambda_handler": "datadog_lambda.handler.handler",
            "aws_environment_variables": {
                "DD_LAMBDA_HANDLER": "handler.lambda_handler",
                "DD_TRACE_ENABLED": "true",
                "DD_FLUSH_TO_LOG": "true",
                "DD_API_KEY": "<DATADOG_API_KEY>",
            },
        }
    }
    ```
  {{< /site-region >}}
2. 以下のプレイスホルダーを適切な値に置き換えます。

- `<AWS_REGION>` を Lambda 関数をデプロイする AWS リージョンに置き換えます。
- `<RUNTIME>` を適切な Python ランタイムに置き換えます。利用可能な `RUNTIME` オプションは、`Python27`、`Python36`、`Python37`、`Python38`です。
- `<LIBRARY_VERSION>` を [Datadog Lambda ライブラリの最新リリース][1]に置き換えます。
- `<EXTENSION_VERSION>` を [Datadog Lambda 拡張機能の最新リリース][2]に置き換えます。
- `<DATADOG_API_KEY>` を [API Management ページ][3]の Datadog API キーに置き換えます。 

例:

{{< site-region region="us,us3,eu" >}} 
    ```
    arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python38:36
    arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension:7
    ```
{{< /site-region >}}
{{< site-region region="gov" >}}
    ```
    arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Python38:36
    arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Extension:7
    ```
{{< /site-region >}}


[1]: https://github.com/DataDog/datadog-lambda-python/releases
[2]: https://gallery.ecr.aws/datadog/lambda-extension
[3]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Chalice" %}}

### プロジェクトの更新

1. [Datadog Lambda 拡張機能][1]と以下の環境変数を `config.json` に追加します。
    {{< site-region region="us,us3,eu" >}} 
    ```json
    {
      "version": "2.0",
      "app_name": "hello-chalice",
      "stages": {
        "dev": {
          "api_gateway_stage": "api",
          "environment_variables": {
            "DD_TRACE_ENABLED": "true",
            "DD_FLUSH_TO_LOG": "true",
            "DD_API_KEY": "<DATADOG_API_KEY>",
          },
          "layers": ["arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>"],
        }
      }
    }
    ```
    {{< /site-region >}}
    {{< site-region region="gov" >}}
    ```json
    {
      "version": "2.0",
      "app_name": "hello-chalice",
      "stages": {
        "dev": {
          "api_gateway_stage": "api",
          "environment_variables": {
            "DD_TRACE_ENABLED": "true",
            "DD_FLUSH_TO_LOG": "true",
            "DD_API_KEY": "<DATADOG_API_KEY>",
          },
          "layers": ["arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:<VERSION_NUMBER>"],
        }
      }
    }
    ```
    {{< /site-region >}}
2. 以下のプレイスホルダーを適切な値に置き換えます。

- `<DATADOG_API_KEY>` を [API Management ページ][2]にある Datadog API キーに置き換えます。
-  `<AWS_REGION>` を Lambda 関数をデプロイする AWS リージョンに置き換えます。
- `<EXTENSION_VERSION>` を [Datadog Lambda 拡張機能の最新リリース][3]に置き換えます。

3. `requirements.txt` に `datadog_lambda` を追加します。
4. `datadog_lambda_wrapper`を `app.py` の[ミドルウェア][4]として登録します。
    ```python
    from chalice import Chalice, ConvertToMiddleware
    from datadog_lambda.wrapper import datadog_lambda_wrapper

    app = Chalice(app_name='hello-chalice')

    app.register_middleware(ConvertToMiddleware(datadog_lambda_wrapper))

    @app.route('/')
    def index():
        return {'hello': 'world'}
    ```

[1]: /ja/serverless/libraries_integrations/extension/
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://gallery.ecr.aws/datadog/lambda-extension
[4]: https://aws.github.io/chalice/topics/middleware.html?highlight=handler#registering-middleware
{{% /tab %}}
{{% tab "Datadog CLI" %}}

<div class="alert alert-warning"> このサービスは公開ベータ版です。フィードバックがございましたら、<a href="/help">Datadog サポートチーム</a>までお寄せください。</div>

Datadog CLI を使用して、CI/CD パイプラインの Lambda 関数にインスツルメンテーションを設定します。CLI コマンドは、Lambda レイヤーを使用して Datadog Lambda ライブラリを関数に自動的に追加し、メトリクス、トレース、ログを Datadog に送信するように関数を構成します。

### Install

NPM または Yarn を使用して Datadog CLI をインストールします。

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### インスツルメントする

関数をインスツルメントするには、[AWS 認証情報][1]を使用して次のコマンドを実行します。`<functionname>`と `<another_functionname>` を Lambda 関数名に、`<aws_region>` を AWS リージョン名に、`<layer_version>` を [目的のバージョン][2]の Datadog Lambda ライブラリに、`<extension_version>` を  [目的のバージョン][3]の Datadog Lambda 拡張機能にそれぞれ置き換えます。

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> -e <extension_version>
```

例:

{{< site-region region="us,us3,eu" >}}
```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v 19 -e 8
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v 19 -e 8
```
{{< /site-region >}}

[CLI のドキュメント][4]に詳細と追加のパラメーターがあります。

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-lambda-python/releases
[3]: https://gallery.ecr.aws/datadog/lambda-extension
[4]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Container Image" %}}

### Install

Lambda 関数をコンテナイメージとしてデプロイする場合は、Datadog Lambda ライブラリを Lambda レイヤーとして使用できません。代わりに、Datadog Lambda ライブラリを、イメージ内の関数の依存関係としてインストールする必要があります。

```sh
pip install datadog-lambda
```

`datadog-lambda` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、`datadog-lambda v0.5.0` は、レイヤーバージョン 5 のコンテンツに一致します。

### Datadog Lambda 拡張機能のインストール

Dockerfile に以下を追加して、Datadog Lambda 拡張機能をコンテナイメージに追加します。

```
COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
```

`<TAG>` を特定のバージョン番号（たとえば `7`) または `latest` に置き換えます。利用可能なタグのリストは、[Amazon ECR リポジトリ][1]で確認できます。

### 関数の構成

1. イメージの `CMD` 値を `datadog_lambda.handler.handler` に設定します。AWS で設定するか、Dockerfile 内で直接設定します。両方の値を設定した場合、AWS で設定した値が Dockerfile 内の値をオーバーライドします。
2. AWS で以下の環境変数を設定します。
  - 元のハンドラーに `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
  - `DD_TRACE_ENABLED` を `true` に設定します。
  - `DD_API_KEY`を [API Management ページ][2]にある Datadog API キーを使い設定します。
3. オプションで、関数に `service` および `env` タグを適切な値とともに追加します。

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Custom" %}}

### Install

Datadog Lambda ライブラリは、レイヤー (推奨) または Python パッケージとしてインストールできます。

`datadog-lambda` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。例: datadog-lambda v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致。

#### レイヤーの使用

以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

{{< site-region region="us,us3,eu" >}}
```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```
{{< /site-region >}}

使用できる `RUNTIME` オプションは、`Python27`、`Python36`、`Python37`、`Python38` です。`VERSION` については、[最新リリース][2]を参照してください。例:

{{< site-region region="us,us3,eu" >}} 
```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:19
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```
arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-Python37:19
```
{{< /site-region >}}

#### パッケージの使用

`datadog-lambda` とその依存関係を、ローカルで関数プロジェクトフォルダーにインストールします。**注**: `datadog-lambda` はネイティブ拡張機能である `ddtrace` に依存するため、これらは Linux 環境でインストールおよびコンパイルを行う必要があります。例えば、Serverless Framework には [dockerizePip][3] を、AWS SAM には [--use-container][4] を使用することができます。詳しくは、[関数デプロイメントパッケージに依存関係を追加する方法][5]をご参照ください。

```
pip install datadog-lambda -t ./
```

[最新リリース][6]を参照。

### Datadog Lambda 拡張機能のインストール

以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

{{< site-region region="us,us3,eu" >}}
```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:<EXTENSION_VERSION>
```
{{< /site-region >}}

`EXTENSION_VERSION`については、[最新リリース][7]を参照してください。

### 構成

以下の手順に従って、関数を構成します。

1. 関数のハンドラーを `datadog_lambda.handler.handler` に設定します。
2. 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
3. 環境変数 `DD_TRACE_ENABLED` を `true` に設定します。
4. 環境変数 `DD_API_KEY` を [API Management ページ][8]の Datadog API キーに設定します。 
5. オプションで、関数に `service` および `env` タグを適切な値とともに追加します。


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-python/releases
[3]: https://github.com/UnitedIncome/serverless-python-requirements#cross-compiling
[4]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html
[5]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[6]: https://pypi.org/project/datadog-lambda/
[7]: https://gallery.ecr.aws/datadog/lambda-extension
[8]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{< /tabs >}}

## Datadog サーバーレスモニタリングの利用

以上の方法で関数を構成すると、[Serverless Homepage][4] でメトリクス、ログ、トレースを確認できるようになります。

### 統合サービスタグ付け

オプションではありますが、Datadog では以下の[統合サービスタグ付けのドキュメント][5]に従いサーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けすることを強くお勧めします。

### AWS サーバーレスリソースからログを収集

AWS Lambda 関数以外のマネージドリソースで生成されたサーバーレスログは、サーバーレスアプリケーションの問題の根本的な原因を特定するのに役立ちます。お使いの環境の以下のマネージドリソースからログを転送することをお勧めします。
- API: API Gateway、AppSync、ALB
- キューとストリーム: SQS、SNS、Kinesis
- データストア: DynamoDB、S3、RDS など

Lambda 以外の AWS リソースからログを収集するには、[Datadog Forwarder][6] をインストールして構成し、マネージドリソースの各 CloudWatch ロググループにサブスクライブさせます。

### カスタムビジネスロジックの監視

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

カスタムメトリクス送信の詳細については、[ここ][7]を参照してください。カスタムインスツルメンテーションの詳細については、[カスタムインスツルメンテーション][8]の Datadog APM ドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html
[3]: /ja/serverless/guide/datadog_forwarder_python
[4]: https://app.datadoghq.com/functions
[5]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[6]: /ja/serverless/libraries_integrations/forwarder
[7]: /ja/serverless/custom_metrics?tab=python
[8]: /ja/tracing/custom_instrumentation/python/