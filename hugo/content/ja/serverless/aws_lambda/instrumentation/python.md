---
algolia:
  tags:
  - python lambda traces
aliases:
- /ja/serverless/datadog_lambda_library/python/
- /ja/serverless/guide/python/
- /ja/serverless/installation/python
- /ja/serverless/aws_lambda/installation/python
further_reading:
- link: /serverless/configuration
  tag: ドキュメント
  text: サーバーレスモニタリングの構成
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: ドキュメント
  text: サーバーレスモニタリングのトラブルシューティング
- link: serverless/custom_metrics/
  tag: ドキュメント
  text: サーバーレスアプリケーションからのカスタムメトリクスの送信
title: Python サーバーレスアプリケーションのインスツルメンテーション
---
<div class="alert alert-info">Datadog Lambda Extension バージョン 67 以降では、コールドスタート時間を大幅に短縮するよう最適化されています。<a href="/serverless/aws_lambda/configuration/?tab=datadogcli#using-datadog-lambda-extension-v67">さらに詳しく</a></div>

## セットアップ {#setup}

{{< tabs >}}
{{% tab "Datadog UI" %}}
Python AWS Lambda アプリケーションを Datadog 内で直接インスツルメントできます。[Serverless > AWS Lambda][2] ページに移動し、[**関数をインスツルメント**][3]を選択します。

詳細については、[AWS Lambda のリモートインスツルメンテーション][1]を参照してください。

[1]: /ja/serverless/aws_lambda/remote_instrumentation
[2]: https://app.datadoghq.com/functions?cloud=aws
[3]: https://app.datadoghq.com/serverless/aws/lambda/setup
{{% /tab %}}
{{% tab "Datadog CLI" %}}

Datadog CLI は、既存の Lambda 関数の構成を修正し、新しいデプロイを必要とせずにインスツルメンテーションを可能にします。Datadog のサーバーレスモニタリングをすばやく開始するための最適な方法です。

1. Datadog CLI クライアントをインストールします。

    ```sh
    npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-lambda
    ```

2. Datadog のサーバーレスモニタリングを初めて使用する場合は、Datadog CLI をインタラクティブモードで起動して初回インストールをガイドできます。その場合、以降のステップは省略できます。本番アプリケーションに Datadog を永続的にインストールするには、このステップをスキップし、残りのステップに従って、通常のデプロイ後に CI/CD パイプラインで Datadog CLI コマンドを実行してください。

    ```sh
    datadog-ci lambda instrument -i
    ```

3. AWS の認証情報を構成します。

    Datadog CLI は AWS Lambda サービスへのアクセスを必要とし、AWS JavaScript SDK に依存して[認証情報を解決][1]します。AWS CLI を呼び出すときと同じ方法で、AWS 認証情報が構成されていることを確認してください。

4. Datadog サイトを構成します。

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (右側で正しいサイトが選択されていることを確認してください)。

5. Datadog API キーを構成します。

    Datadog は、セキュリティと容易なローテーションのために、Datadog API キーを AWS Secrets Manager に保存することを推奨します。キーはプレーンテキストの文字列として保存する必要があります (JSON ブロブではありません)。Lambda 関数に必要な `secretsmanager:GetSecretValue` IAM 権限があることを確認してください。

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For quick testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Lambda 関数をインスツルメントします。

    **注**: まず、開発環境またはステージング環境で Lambda 関数をインスツルメントしてください。結果が満足できない場合は、同じ引数で `uninstrument` を実行して変更を元に戻してください。

    Lambda 関数をインスツルメントするには、次のコマンドを実行します。

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    

```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names. Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

    Additional parameters can be found in the [CLI documentation][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Plugin][1] は、[Datadog Lambda Extension][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を自動的に構成します。

Datadog サーバーレスプラグインをインストールして構成するには、次の手順に従います。

1. Datadog サーバーレスプラグインをインストールします。

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

2. `serverless.yml` を更新します。

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (右側で正しいサイトが選択されていることを確認してください)。
    - `<DATADOG_API_KEY_SECRET_ARN>` を、[Datadog API キー][3]が安全に保存されている AWS シークレットの ARN に置き換えてください。キーはプレーンテキストの文字列として保存する必要があります (JSON ブロブではありません)。`secretsmanager:GetSecretValue` の権限が必要です。迅速なテストのために、代わりに `apiKey` を使用し、Datadog API キーをプレーンテキストで設定できます。

    For more information and additional settings, see the [plugin documentation][1].

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog CloudFormation マクロ][1]は、SAM アプリケーションのテンプレートを自動的に変換して Lambda レイヤーを使用して関数に Datadog をインストールし、[Datadog Lambda Extension][2] を通じて Datadog にメトリクス、トレース、ログを送信するように関数を構成します。

1. Datadog CloudFormation マクロをインストールします。

    [AWS 認証情報][3]を使用して、マクロ AWS リソースをインストールする CloudFormation スタックをデプロイするために、次のコマンドを実行してください。特定のリージョンに対して、マクロを**一度だけ**インストールすれば十分です。`create-stack` を `update-stack` に置き換えて、マクロを最新バージョンに更新します。

    ```sh
    aws cloudformation create-stack \
      --stack-name datadog-serverless-macro \
      --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
      --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
    ```

    The macro is now deployed and ready to use.

2. Lambda 関数をインスツルメントします。

    `Transform` セクション内の `template.yml` ファイルにある `AWS::Serverless` 変換の後に、`DatadogServerless` 変換 ** を追加してください(SAM 用)。

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

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (右側で正しいサイトが選択されていることを確認してください)。
    - `<DATADOG_API_KEY_SECRET_ARN>` を、[Datadog API キー][4]が安全に保存されている AWS シークレットの ARN に置き換えてください。キーはプレーンテキストの文字列として保存する必要があります (JSON ブロブではありません)。`secretsmanager:GetSecretValue` の権限が必要です。迅速なテストのために、代わりに `apiKey` を使用し、Datadog API キーをプレーンテキストで設定できます。

    More information and additional parameters can be found in the [macro documentation][1].


[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "AWS CDK" %}}
{{< lambda-install-cdk language="python" layer="python" layerParamTypescript="pythonLayerVersion" layerParamPython="python_layer_version">}}

{{% /tab %}}
{{% tab "コンテナイメージ" %}}

1. Datadog Lambda ライブラリをインストールします。

    Lambda 関数をコンテナイメージとしてデプロイする場合、Datadog Lambda ライブラリを Lambda レイヤーとして使用することはできません。その代わりに、イメージ内の関数の依存関係として Datadog Lambda ライブラリをインストールする必要があります。

    ```sh
    pip install datadog-lambda
    ```

    Note that the minor version of the `datadog-lambda` package always matches the layer version. For example, `datadog-lambda v0.5.0` matches the content of layer version 5.

2. Datadog Lambda Extension をインストールします。

    Dockerfile に以下を追加して、Datadog Lambda Extension をコンテナイメージに追加します。

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. Alpine is also supported with specific version numbers (such as `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) or with `latest-alpine`.[Amazon ECR リポジトリ][1]で、使用可能なタグの完全なリストを確認できます。

3. ハンドラー関数をリダイレクトします。

    - イメージの `CMD` 値を `datadog_lambda.handler.handler` に設定します。これは AWS で設定するか、直接 Dockerfile で設定できます。両方を設定した場合、AWS で設定した値が Dockerfile の値より優先されることに注意してください。
    - 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。

    **注**: Datadog ハンドラーのリダイレクトと互換性のないサードパーティのセキュリティツールやモニタリングツールを使用している場合、代わりに[関数コードで Datadog ラッパーを適用する][2]ことができます。

4. Dockerfile で Datadog サイト、API キー、トレーシングを構成します。

    - 環境変数 `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定します。(右側で正しいサイトが選択されていることを確認してください)。
    - [Datadog API キー][3]が安全に保存されている AWS シークレットの ARN を環境変数 `DD_API_KEY_SECRET_ARN` に設定します。キーはプレーンテキストの文字列として保存する必要があります (JSON ブロブではありません)。`secretsmanager:GetSecretValue` の権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用し、Datadog API キーをプレーンテキストで設定できます。
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
  version = "4.0.0"

  environment_variables = {
    "DD_API_KEY_SECRET_ARN" : "<DATADOG_API_KEY_SECRET_ARN>"
    "DD_ENV" : "<ENVIRONMENT>"
    "DD_SERVICE" : "<SERVICE_NAME>"
    "DD_SITE": "<DATADOG_SITE>"
    "DD_VERSION" : "<VERSION>"
  }

  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
  datadog_python_layer_version = {{< latest-lambda-layer-version layer="python" >}}

  # aws_lambda_function arguments
}
```

1. `aws_lambda_function` リソースを `lambda-datadog` Terraform モジュールに置き換えます。その後、モジュールの `source` と `version` を指定します。

2. `aws_lambda_function` 引数を設定します。

   `aws_lambda_function` リソースで利用可能なすべての引数は、この Terraform モジュールでも利用可能です。`aws_lambda_function` リソースでブロックとして定義された引数は、ネストされた引数を持つ変数として再定義されます。

   例えば、`aws_lambda_function` では、`environment` は `variables` 引数を持つブロックとして定義されています。`lambda-datadog` Terraform モジュールでは、`environment_variables` の値が `aws_lambda_function` の `environment.variables` 引数に渡されます。このモジュールの変数の完全なリストについては、[入力][3]を参照してください。

3.  環境変数のプレースホルダーを埋めます。

   -  `<DATADOG_API_KEY_SECRET_ARN>` を、Datadog API キーが安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキストの文字列として保存する必要があります (JSON ブロブではありません)。`secretsmanager:GetSecretValue` の権限が必要です。迅速なテストのために、代わりに環境変数 `DD_API_KEY` を使用し、Datadog API キーをプレーンテキストで設定できます。
   - `<ENVIRONMENT>` を、`prod` や `staging` などの Lambda 関数の環境で置き換えます。
   -  `<SERVICE_NAME>` を、Lambda 関数のサービス名に置き換えます。
   - `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}}に置き換えます。(このページで正しい [Datadog サイト][4]が選択されていることを確認してください)
   - `<VERSION>` を Lambda 関数のバージョン番号に置き換えます。

4. 使用する Datadog Extension Lambda レイヤーと Datadog Python Lambda レイヤーのバージョンを選択します。空白の場合、最新のレイヤーが使用されます。

```
  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
  datadog_python_layer_version = {{< latest-lambda-layer-version layer="python" >}}
```

[1]: https://registry.terraform.io/modules/DataDog/lambda-datadog/aws/latest
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
[3]: https://github.com/DataDog/terraform-aws-lambda-datadog?tab=readme-ov-file#inputs
[4]: /ja/getting_started/site/
{{% /tab %}}
{{% tab "SST v3" %}}

SST v3 を使用して Datadog を構成するには、次のステップに従ってください。

  ```ts
  const app = new sst.aws.Function("MyApp", {
    handler: "lambda_function.lambda_handler",
    runtime: "python3.13",
    environment: {
      DD_ENV: "<ENVIRONMENT>",
      DD_SERVICE: "<SERVICE_NAME>",
      DD_VERSION: "<VERSION>",
      DATADOG_API_KEY_SECRET_ARN: "<DATADOG_API_KEY_SECRET_ARN>",
      DD_SITE: "<DATADOG_SITE>",
    },
    layers: [
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`,
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}`、
    ],
  });
  ```

  1. Configure the Datadog Lambda Library and Datadog Lambda Extension layers

     - The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="python-versions" >}}.

  2. 環境変数のプレースホルダーを埋めます。
     -  `<DATADOG_API_KEY_SECRET_ARN>` を、Datadog API キーが安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキストの文字列として保存する必要があります (JSON ブロブではありません)。`secretsmanager:GetSecretValue` の権限が必要です。迅速なテストのために、代わりに環境変数 `DD_API_KEY` を使用し、Datadog API キーをプレーンテキストで設定できます。
     - `<ENVIRONMENT>` を、`prod` や `staging` などの Lambda 関数の環境で置き換えます。
     -  `<SERVICE_NAME>` を、Lambda 関数のサービス名に置き換えます。
     - `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}}に置き換えます。(このページで正しい [Datadog サイト][1]が選択されていることを確認してください)
     - `<VERSION>`を Lambda 関数のバージョン番号に置き換えます。

  3. [関数コードで Datadog ラッパーを適用します][2]

[1]: /ja/getting_started/site/
[2]: https://docs.datadoghq.com/ja/serverless/guide/handler_wrapper

{{% /tab %}}
{{% tab "カスタム" %}}

<div class="alert alert-info">Serverless Framework や AWS CDK といった Datadog をサポートするサーバーレス開発ツールを使用していない場合は、Datadog はお使いのサーバーレスアプリケーションを <a href="./?tab=datadogcli">Datadog CLI</a> でインスツルメントすることを強く推奨します。</div>

1. Datadog Lambda ライブラリをインストールします。

    Datadog Lambda ライブラリは、レイヤー (推奨) _または_ Python パッケージのいずれかとしてインポートすることができます。

    `datadog-lambda` パッケージのマイナーバージョンは常にレイヤーバージョンと一致します。例えば、datadog-lambda v0.5.0 はレイヤーバージョン 5 の内容と一致します。

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

      Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`. The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="python-versions" >}}.

    - Option B: If you cannot use the prebuilt Datadog Lambda layer, alternatively install the `datadog-lambda` package and its dependencies locally to your function project folder using your favorite Python package manager, such as `pip`.

      ```sh
      pip install datadog-lambda -t ./
      ```

      **Note**: `datadog-lambda` depends on `ddtrace`, which uses native extensions; therefore it must be installed and compiled in a Linux environment on the right architecture (`x86_64` or `arm64`). For example, you can use [dockerizePip][2] for the Serverless Framework and [--use-container][3] for AWS SAM. For more details, see [how to add dependencies to your function deployment package][4].

      See the [latest release][5].

2. Datadog Lambda Extension をインストールします。

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

    Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`.

3. ハンドラー関数をリダイレクトします。

    - 関数のハンドラーを `datadog_lambda.handler.handler` に設定します。
    - 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。

    **注**: Datadog ハンドラーのリダイレクトと互換性のないサードパーティのセキュリティツールやモニタリングツールを使用している場合、代わりに[関数コードで Datadog ラッパーを適用する][6]ことができます。

4. Datadog サイト、API キー、トレーシングを構成します。

    - 環境変数 `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定します。(右側で正しいサイトが選択されていることを確認してください)。
    - [Datadog API キー][7]が安全に保存されている AWS シークレットの ARN を環境変数 `DD_API_KEY_SECRET_ARN` に設定します。キーは、JSON ブロブの中ではなく、プレーンテキスト文字列として保存する必要があります。`secretsmanager:GetSecretValue` の権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用し、Datadog API キーをプレーンテキストで設定できます。
    - 環境変数 `DD_TRACE_ENABLED` を `true` に設定します。

5. (AWS Chalice のみ) ミドルウェアを登録します。

    [AWS Chalice][8] を使用している場合、`datadog-lambda` を `pip` でインストールし、`datadog_lambda_wrapper` を `app.py` に[ミドルウェア][9]として登録する必要があります。

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

{{% svl-tracing-env %}}

## FIPS コンプライアンス {#fips-compliance}

{{% svl-lambda-fips %}}

## AWS Lambda と VPC {#aws-lambda-and-vpc}

{{% svl-lambda-vpc %}}

## 次のステップ{#whats-next}

- 環境変数 `DD_TAGS` を使用して、テレメトリにカスタムタグを追加します。
- [ペイロード収集][12]を構成して、関数の JSON リクエストおよびレスポンスペイロードをキャプチャします。
- Datadog Lambda Extension を使用している場合、Datadog Forwarder の Lambda ログをオフにします。
- さらなる機能については、[AWS Lambda 向けサーバーレスモニタリングの構成][3]を参照してください。

### カスタムビジネスロジックの監視 {#monitor-custom-business-logic}

カスタムビジネスロジックを監視するには、以下のサンプルコードを使用してカスタムメトリクスまたはスパンを送信します。追加のオプションについては、[サーバーレスアプリケーション向けカスタムメトリクス送信][4]および APM ガイドの[カスタムインスツルメンテーション][5]を参照してください。

```python
import time
from ddtrace import tracer
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    # add custom tags to the lambda function span,
    # does NOT work when X-Ray tracing is enabled
    current_span = tracer.current_span()
    if current_span:
        current_span.set_tag('customer.id', '123456')

    # submit a custom span
    with tracer.trace("hello.world"):
        print('Hello, World!')

    # submit a custom metric
    lambda_metric(
        metric_name='coffee_house.order_value',
        value=12.45,
        tags=['product:latte', 'order:online']
    )

    return {
        'statusCode': 200,
        'body': get_message()
    }

# trace a function
@tracer.wrap()
def get_message():
    return 'Hello from serverless!'
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /ja/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /ja/serverless/configuration/
[4]: /ja/serverless/aws_lambda/metrics/?code-lang=python
[5]: /ja/tracing/custom_instrumentation/python/
[6]: /ja/security/application_security/serverless/
[7]: https://github.com/DataDog/datadog-lambda-extension
[8]: https://github.com/DataDog/datadog-lambda-extension/issues
[9]: /ja/serverless/aws_lambda/distributed_tracing/#span-auto-linking
[10]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[11]: /ja/serverless/aws_lambda/remote_instrumentation
[12]: /ja/serverless/aws_lambda/configuration?tab=datadogcli#collect-the-request-and-response-payloads