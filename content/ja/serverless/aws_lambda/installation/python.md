---
algolia:
  tags:
  - python lambda traces
aliases:
- /ja/serverless/datadog_lambda_library/python/
- /ja/serverless/guide/python/
- /ja/serverless/installation/python
further_reading:
- link: /serverless/configuration
  tag: Documentation
  text: Configure Serverless Monitoring
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentation
  text: Troubleshoot Serverless Monitoring
- link: serverless/custom_metrics/
  tag: Documentation
  text: Submitting Custom Metrics from Serverless Applications
title: Instrumenting Python Serverless Applications
---

<div class="alert alert-warning">Python Lambda 関数が <a href="https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html">Python 3.6 以下</a>で書かれている場合、または以前に Datadog Forwarder を使って Lambda 関数をセットアップした場合は、<a href="/serverless/guide/datadog_forwarder_python">Datadog Forwarder を使ったインスツルメンテーション</a>をご覧ください。それ以外の場合は、このガイドの指示に従って、Datadog Lambda 拡張機能を使用してインスツルメンテーションを行います。</div>

<div class="alert alert-warning">If your Lambda functions are deployed in VPC without access to the public internet, you can send data either <a href="/agent/guide/private-link/">using AWS PrivateLink</a> for the <code>datadoghq.com</code> <a href="/getting_started/site/">Datadog site</a>, or <a href="/agent/configuration/proxy/">using a proxy</a> for all other sites.</div>

## インストール

Datadog は、サーバーレスアプリケーションのインスツルメンテーションを有効にするためのさまざまな方法を提供しています。以下からニーズに合った方法を選択してください。Datadog では、一般的に Datadog CLI の使用を推奨しています。アプリケーションがコンテナイメージとしてデプロイされる場合は、「コンテナイメージ」の指示に従うことが*必要です*。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI は、既存の Lambda 関数のコンフィギュレーションを修正し、新しいデプロイを必要とせずにインスツルメンテーションを可能にします。Datadog のサーバーレスモニタリングをすばやく開始するための最適な方法です。

1. Datadog CLI クライアントをインストールする

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Datadog サーバーレスモニタリングに慣れていない場合は、クイックスタートとして最初のインストールを導くためにインタラクティブモードで Datadog CLI を起動し、残りのステップを無視することができます。本番アプリケーションに Datadog を恒久的にインストールするには、このステップをスキップし、残りのステップに従って通常のデプロイの_後に_ CI/CD パイプラインで Datadog CLI コマンドを実行します。

    ```sh
    datadog-ci lambda instrument -i
    ```

3. AWS の認証情報を構成する

   Datadog CLI は、AWS Lambda サービスへのアクセスを必要とし、AWS JavaScript SDK に依存して[資格情報を解決][1]します。AWS CLI を呼び出すときに使用するのと同じ方法を使用して、AWS の資格情報が構成されていることを確認します。

4. Datadog サイトを構成する

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

   `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。(右側で正しい SITE が選択されていることを確認してください)。

5. Datadog API キーを構成する

   Datadog は、セキュリティと簡単なローテーションのために、AWS Secrets Manager に Datadog API キーを保存することを推奨します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。Lambda 関数に必要な `secretsmanager:GetSecretValue` IAM 権限があることを確認します。

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

   迅速なテスト目的のために、Datadog API キーをプレーンテキストで設定することも可能です。

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Lambda 関数をインスツルメントする

   **注**: Lambda 関数は、まず開発環境またはステージング環境でインスツルメントしてください。インスツルメンテーションの結果が思わしくない場合は、同じ引数で `uninstrument` を実行し、変更を元に戻してください。

   Lambda 関数をインスツルメントするには、次のコマンドを実行します。

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

   プレースホルダーを埋めるには
    - `<functionname>` と `<another_functionname>` は Lambda 関数の名前に置き換えます。また、`--functions-regex` を使用すると、指定した正規表現にマッチする名前を持つ複数の関数を自動的にインスツルメントすることができます。
    - `<aws_region>` を AWS リージョン名に置き換えます。

    その他のパラメーターは、[CLI ドキュメント][2]に記載されています。


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Plugin][1] は、[Datadog Lambda 拡張機能][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を自動的に構成します。

Datadog サーバーレスプラグインをインストールして構成するには、次の手順に従います。

1. Datadog サーバーレスプラグインをインストールします。

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

2. `serverless.yml` を更新します:

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

   プレースホルダーを埋めるには
    - `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。(右側で正しい SITE が選択されていることを確認してください)。
    - `<DATADOG_API_KEY_SECRET_ARN>` を、[Datadog API キー][3]が安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `apiKey` を使用して、Datadog API キーをプレーンテキストで設定することができます。

    詳細および追加設定については、[プラグインドキュメント][1]を参照してください。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog CloudFormation マクロ][1]は、SAM アプリケーションのテンプレートを自動的に変換して Lambda レイヤーを使用して関数に Datadog をインストールし、[Datadog Lambda 拡張機能][2]を通じて Datadog にメトリクス、トレース、ログを送信するように関数を構成します。

1. Datadog CloudFormation マクロのインストール

   [AWS 認証情報][3]で次のコマンドを実行して、マクロ AWS リソースをインストールする CloudFormation スタックをデプロイします。アカウントの特定のリージョンに**一度だけ**マクロをインストールする必要があります。マクロを最新バージョンに更新するには、`create-stack` を `update-stack` に置き換えます。

    ```sh
    aws cloudformation create-stack \
      --stack-name datadog-serverless-macro \
      --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
      --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
    ```

   マクロが表示され、使用を開始できます。

2. Lambda 関数をインスツルメントする

   SAM の `template.yml` ファイルの `Transform` セクションで、 `AWS::Serverless` 変換の後に `DatadogServerless` 変換を追加します。

    ```yaml
    Transform:
      - AWS::Serverless-2016-10-31
      - Name: DatadogServerless
        Parameters:
          stackName: !Ref "AWS::StackName"
          pythonLayerVersion: {{< latest-lambda-layer-version layer="python" >}}
          extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}}
          site: "<DATADOG_SITE>"
          apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    ```

   プレースホルダーを埋めるには
    - `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。(右側で正しい SITE が選択されていることを確認してください)。
    - `<DATADOG_API_KEY_SECRET_ARN>` を、[Datadog API キー][4]が安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `apiKey` を使用して、Datadog API キーをプレーンテキストで設定することができます。

    [マクロのドキュメント][1]に詳細と追加のパラメーターがあります。


[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog CDK コンストラクト][1] は、Lambda レイヤーを使用して Datadog を関数に自動的にインストールし、Datadog Lambda 拡張機能を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

1. Datadog CDK コンストラクトライブラリのインストール

    ```sh
    # For AWS CDK v1
    pip install datadog-cdk-constructs

    # For AWS CDK v2
    pip install datadog-cdk-constructs-v2
    ```

2. Lambda 関数をインスツルメントする

    ```python
    # For AWS CDK v1
    from datadog_cdk_constructs import Datadog

    # For AWS CDK v2
    from datadog_cdk_constructs_v2 import Datadog

    datadog = Datadog(self, "Datadog",
        python_layer_version={{< latest-lambda-layer-version layer="python" >}},
        extension_layer_version={{< latest-lambda-layer-version layer="extension" >}},
        site="<DATADOG_SITE>",
        api_key_secret_arn="<DATADOG_API_KEY_SECRET_ARN>",
      )
    datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>])
    ```

   プレースホルダーを埋めるには
    - `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。(右側で正しい SITE が選択されていることを確認してください)。
    - `<DATADOG_API_KEY_SECRET_ARN>` を、[Datadog API キー][2]が安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `apiKey` を使用して、Datadog API キーをプレーンテキストで設定することができます。

    [Datadog CDK のドキュメント][1]に詳細と追加のパラメーターがあります。

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Container Image" %}}

1. Datadog Lambda ライブラリのインストール

   Lambda 関数をコンテナイメージとしてデプロイする場合は、Datadog Lambda ライブラリを Lambda レイヤーとして使用できません。代わりに、Datadog Lambda ライブラリを、イメージ内の関数の依存関係としてインストールする必要があります。

    ```sh
    pip install datadog-lambda
    ```

   `datadog-lambda` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、`datadog-lambda v0.5.0` は、レイヤーバージョン 5 のコンテンツに一致します。

2. Datadog Lambda 拡張機能のインストール

   Dockerfile に以下を追加して、Datadog Lambda 拡張機能をコンテナイメージに追加します。

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

   `<TAG>` を特定のバージョン番号 (例えば `{{< latest-lambda-layer-version layer="extension" >}}`) または `latest` に置き換えてください。Alpine も特定のバージョン番号 (例えば `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) または `latest-alpine` でサポートされています。[Amazon ECR リポジトリ][1]で、使用可能なタグの完全なリストを見ることができます。

3. ハンドラー関数のリダイレクト

    - イメージの `CMD` 値を `datadog_lambda.handler.handler` に設定します。AWS で設定するか、Dockerfile 内で直接設定します。両方の値を設定した場合、AWS で設定した値が Dockerfile 内の値をオーバーライドします。
    - 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。

    **注**: Datadog ハンドラーのリダイレクトと互換性のないサードパーティのセキュリティツールやモニタリングツールを使用している場合、代わりに[関数コードで Datadog ラッパーを適用する][2]ことができます。

4. Dockerfile での Datadog サイト、API キー、トレーシングの構成

    - 環境変数 `DD_SITE` に {{< region-param key="dd_site" code="true" >}} を設定します。(右側で正しい SITE が選択されていることを確認してください)。
    - 環境変数 `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][3]が安全に保存されている AWS シークレットの ARN で設定します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。
    - 環境変数 `DD_TRACE_ENABLED` を `true` に設定します。


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://docs.datadoghq.com/ja/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Terraform" %}}

[`lambda-datadog`][1] Terraform モジュールは [`aws_lambda_function`][2] リソースをラップし、Datadog サーバーレスモニタリング用に以下の方法で Lambda 関数を自動的に設定します。

- Datadog Lambda レイヤーを追加する
- Lambda ハンドラーをリダイレクトする
- メトリクス、トレース、ログの収集と Datadog への送信を有効にする

```tf
module "lambda-datadog" {
  source  = "DataDog/lambda-datadog/aws"
  version = "1.1.0"

  environment_variables = {
    "DD_API_KEY_SECRET_ARN" : "<DATADOG_API_KEY_SECRET_ARN>"
    "DD_ENV" : "<ENVIRONMENT>"
    "DD_SERVICE" : "<SERVICE_NAME>"
    "DD_SITE": "<DATADOG_SITE>"
    "DD_VERSION" : "<VERSION>"
  }

  datadog_extension_layer_version = 58
  datadog_python_layer_version = 95

  # aws_lambda_function arguments
}
```

1. `aws_lambda_function` リソースを `lambda-datadog` Terraform モジュールに置き換えます。次に、モジュールの `source` と `version` を指定します。

2. `aws_lambda_function` 引数を設定します。

   `aws_lambda_function` リソースで利用可能なすべての引数は、この Terraform モジュールでも使用できます。`aws_lambda_function` リソースでブロックとして定義された引数は、ネストされた引数を含む変数として再定義されます。

   たとえば、`aws_lambda_function` では、`environment` は `variables` 引数を持つブロックとして定義されています。`lambda-datadog` Terraformモジュールでは、`environment_variables` の値が `aws_lambda_function` の `environment.variables` 引数に渡されます。このモジュールの変数の完全なリストは [Inputs][3] を参照してください。

3. 環境変数のプレースホルダーを埋めます。

   - `<DATADOG_API_KEY_SECRET_ARN>` を、[Datadog API キー][3]が安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに環境変数 `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。
   - `<ENVIRONMENT>` を `prod` や `staging` などの Lambda 関数の環境に置き換えます。　
   - `<SERVICE_NAME>` を Lambda 関数のサービス名に置き換えます。
   - `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。(このページで正しい [Datadog サイト][4]が選択されていることを確認してください。)
   - `<VERSION>` を Lambda 関数のバージョン番号に置き換えます。

4. 使用する Datadog 拡張機能 Lambda レイヤーと Datadog Python Lambda レイヤーのバージョンを選択します。空白の場合、最新のレイヤーが使用されます。

```
  datadog_extension_layer_version = 58
  datadog_python_layer_version = 95
```

[1]: https://registry.terraform.io/modules/DataDog/lambda-datadog/aws/latest
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
[3]: https://github.com/DataDog/terraform-aws-lambda-datadog?tab=readme-ov-file#inputs
[4]: /ja/getting_started/site/
{{% /tab %}}
{{% tab "Custom" %}}

<div class="alert alert-info">Datadog がサポートする Serverless Framework や AWS CDK などのサーバーレス開発ツールを使用していない場合、Datadog は <a href="./?tab=datadogcli">Datadog CLI</a> を使用してサーバーレスアプリケーションをインスツルメントすることを強く推奨します。</div>

1. Datadog Lambda ライブラリのインストール

   Datadog Lambda ライブラリは、レイヤー (推奨) _または_ Python パッケージのいずれかとしてインポートすることができます。

   `datadog-lambda` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、datadog-lambda v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致します。

    - オプション A: 以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

      ```sh
      # Use this format for x86-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

      # Use this format for arm64-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}

      # Use this format for x86-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

      # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}
      ```

      `<AWS_REGION>` を `us-east-1` などの有効な AWS リージョンに置き換えます。`<RUNTIME>` オプションは、{{< latest-lambda-layer-version layer="python-versions" >}} が利用可能です。

    - オプション B: ビルド済みの Datadog Lambda レイヤーを使用できない場合は、代わりに `pip` などのお好みの Python パッケージマネージャーを使用して、`datadog-lambda` パッケージとその依存関係を関数プロジェクトフォルダにローカルインストールします。

      ```sh
      pip install datadog-lambda -t ./
      ```

      **注**: `datadog-lambda` はネイティブ拡張機能を使用する `ddtrace` に依存しています。したがって、適切なアーキテクチャ (`x86_64` または `arm64`) の Linux 環境でインストールおよびコンパイルする必要があります。例えば、Serverless Framework では [dockerizePip][2] を、AWS SAM では [--use-container][3] を利用することができます。詳しくは、[関数デプロイパッケージへの依存関係の追加方法][4]をご参照ください。

      [最新リリース][5]をご覧ください。

2. Datadog Lambda 拡張機能のインストール

   以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

    ```sh
    # Use this format for x86-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for arm64-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for x86-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
    ```

   `<AWS_REGION>` を `us-east-1` などの有効な AWS リージョンに置き換えてください。

3. ハンドラー関数のリダイレクト

    - 関数のハンドラーを `datadog_lambda.handler.handler` に設定します。
    - 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。

    **注**: Datadog ハンドラーのリダイレクトと互換性のないサードパーティのセキュリティツールやモニタリングツールを使用している場合、代わりに[関数コードで Datadog ラッパーを適用する][6]ことができます。

4. Datadog サイト、API キー、トレーシングの構成

    - 環境変数 `DD_SITE` に {{< region-param key="dd_site" code="true" >}} を設定します。(右側で正しい SITE が選択されていることを確認してください)。
    - 環境変数 `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][7]が安全に保存されている AWS シークレットの ARN で設定します。キーは json blob の中ではなく、プレーンテキスト文字列として保存する必要があります。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。
    - 環境変数 `DD_TRACE_ENABLED` を `true` に設定します。

5. (AWS Chalice のみ) ミドルウェアの登録

   [AWS Chalice][8] を利用する場合は、`datadog-lambda` を `pip` でインストールし、`datadog_lambda_wrapper` を `app.py` に[ミドルウェア][9]として登録しておく必要があります。

    ```python
    from chalice import Chalice, ConvertToMiddleware
    from datadog_lambda.wrapper import datadog_lambda_wrapper

    app = Chalice(app_name='hello-chalice')

    app.register_middleware(ConvertToMiddleware(datadog_lambda_wrapper))

    @app.route('/')
    def index():
        return {'hello': 'world'}
    ```

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/UnitedIncome/serverless-python-requirements#cross-compiling
[3]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html
[4]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[5]: https://pypi.org/project/datadog-lambda/
[6]: https://docs.datadoghq.com/ja/serverless/guide/handler_wrapper
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://aws.github.io/chalice/
[9]: https://aws.github.io/chalice/topics/middleware.html
{{% /tab %}}
{{< /tabs >}}

## 次のステップ

- [Serverless Homepage][1] でメトリクス、ログ、トレースを見ることができるようになりました。
- サービスを標的にしている攻撃者についてアラートを受け取るには、[脅威の監視][6]を有効にします。
- [カスタムビジネスロジックの監視](#monitor-custom-business-logic)のサンプルコードを参照してください
- テレメトリーの収集に問題がある場合は、[トラブルシューティングガイド][2]を参照してください
- [高度な構成][3]を参照して以下のことを行ってください。
    - タグを使ったテレメトリー接続
    - Amazon API Gateway、SQS などのテレメトリーを収集する
    - Lambda のリクエストとレスポンスのペイロードを取得する
    - Lambda 関数のエラーをソースコードにリンクする
    - ログまたはトレースから機密情報をフィルタリングまたはスクラブする

### カスタムビジネスロジックの監視

カスタムビジネスロジックを監視するには、以下のサンプルコードを使用してカスタムメトリクスまたはスパンを送信します。その他のオプションについては、[サーバーレスアプリケーションのためのカスタムメトリクスの送信][4]および[カスタムインスツルメンテーション][5]のための APM ガイドを参照してください。

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /ja/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /ja/serverless/configuration/
[4]: /ja/serverless/custom_metrics?tab=python
[5]: /ja/tracing/custom_instrumentation/python/
[6]: /ja/security/application_security/enabling/serverless/?tab=serverlessframework