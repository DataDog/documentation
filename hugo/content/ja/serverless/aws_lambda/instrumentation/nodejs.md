---
aliases:
- /ja/serverless/datadog_lambda_library/nodejs/
- /ja/serverless/guide/nodejs/
- /ja/serverless/installation/nodejs
- /ja/serverless/aws_lambda/installation/nodejs
further_reading:
- link: /serverless/configuration
  tag: ドキュメント
  text: サーバーレスモニタリングの構成
- link: /serverless/guide/serverless_tracing_and_bundlers/
  tag: ドキュメント
  text: Node.js Lambda トレースとバンドラーの互換性
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: ドキュメント
  text: サーバーレスモニタリングのトラブルシューティング
- link: serverless/custom_metrics/
  tag: ドキュメント
  text: サーバーレスアプリケーションからのカスタムメトリクスの送信
title: Node.js サーバーレスアプリケーションのインスツルメンテーション
---
<div class="alert alert-info">Datadog Lambda Extension バージョン 67 以降では、コールドスタート時間を大幅に短縮するよう最適化されています。<a href="/serverless/aws_lambda/configuration/?tab=datadogcli#using-datadog-lambda-extension-v67">さらに詳しく</a></div>

## セットアップ {#setup}

{{< tabs >}}
{{% tab "Datadog UI" %}}
Node.js AWS Lambda アプリケーションを Datadog 内で直接インスツルメントできます。[Serverless > AWS Lambda][2] ページに移動し、[**Instrument Functions**][3] を選択します。

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

2. Datadog のサーバーレスモニタリングを初めて使用する場合は、Datadog CLI をインタラクティブモードで起動して初回インストールをガイドできます。その場合、以降のステップは省略できます。本番アプリケーションに Datadog を永続的にインストールするには、このステップをスキップし、残りのステップに従って、通常の_デプロイ後_に CI/CD パイプラインで Datadog CLI コマンドを実行してください。

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

    ***注**: Lambda 関数は、まず開発環境またはステージング環境でインスツルメントしてください。インスツルメンテーションの結果が思わしくない場合は、同じ引数で `uninstrument` を実行し、変更を元に戻してください。

    Lambda 関数をインスツルメントするには、次のコマンドを実行します。

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    

```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names. Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

    Additional parameters can be found in the [CLI documentation][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

<div class="alert alert-info">代わりに、<a href="https://www.serverless.com/framework/docs/providers/aws/guide/intro">JavaScript ファイルから JSON オブジェクトをネイティブにエクスポート</a>して (たとえば <code>serverless.ts</code> ファイルを使用して) Serverless Framework アプリをデプロイする場合は、<a href="./?tab=custom">カスタムインストール手順</a>に従います。</div>

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

    `Transform` セクション内の `template.yml` ファイルにある `AWS::Serverless` 変換の**後**に、`DatadogServerless` 変換を追加してください(SAM 用)。

    ```yaml
    Transform:
      - AWS::Serverless-2016-10-31
      - Name: DatadogServerless
        Parameters:
          stackName: !Ref "AWS::StackName"
          nodeLayerVersion: {{< latest-lambda-layer-version layer="node" >}}
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
{{< lambda-install-cdk language="node" layer="node" layerParamTypescript="nodeLayerVersion" layerParamPython="node_layer_version">}}
{{% /tab %}}

{{% tab "コンテナイメージ" %}}

1. Datadog Lambda ライブラリをインストールします。

    Datadog Lambda と SDK をイメージ内にパッケージ化します。

    ```sh
    npm install datadog-lambda-js dd-trace
    ```

    Note that the minor version of the `datadog-lambda-js` package always matches the layer version. For example, `datadog-lambda-js v0.5.0` matches the content of layer version 5.

    You cannot install the Datadog Lambda Library as a layer if you are deploying your Lambda function as a container image.

2. Datadog Lambda Extension をインストールします。

    Dockerfile に以下を追加して、Datadog Lambda Extension をコンテナイメージに追加します。

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. Alpine is also supported with specific version numbers (such as `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) or with `latest-alpine`.[Amazon ECR リポジトリ][1]で、使用可能なタグの完全なリストを確認できます。

3. ハンドラー関数をリダイレクトします。

    - イメージの `CMD` 値を `node_modules/datadog-lambda-js/dist/handler.handler` に設定します。これは AWS で設定するか、直接 Dockerfile で設定できます。両方を設定した場合、AWS で設定した値が Dockerfile の値より優先されることに注意してください。
    - 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
    - コンテナで ESModule を使用している場合、`handler.js` ファイルを削除する必要があります。このファイルは Node 12 用に存在し、AWS が Node 12 のサポートを非推奨にしたときに削除されます。
      ```dockerfile
      RUN rm node_modules/datadog-lambda-js/dist/handler.js
      CMD ["node_modules/datadog-lambda-js/dist/handler.handler"]
      ```

    **Note**: If your Lambda function runs on `arm64`, you must either build your container image in an arm64-based Amazon Linux environment or [apply the Datadog wrapper in your function code][2] instead. You may also need to do that if you are using a third-party security or monitoring tool that is incompatible with the Datadog handler redirection.

4. Datadog サイトと API キーを構成します。

    - 環境変数 `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定します (右側で正しいサイトが選択されていることを確認してください)。
    - [Datadog API キー][3]が安全に保存されている AWS シークレットの ARN を環境変数 `DD_API_KEY_SECRET_ARN` に設定します。キーはプレーンテキストの文字列として保存する必要があります (JSON ブロブではありません)。`secretsmanager:GetSecretValue` の権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用し、Datadog API キーをプレーンテキストで設定できます。


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://docs.datadoghq.com/ja/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Terraform" %}}

[`lambda-datadog`][1] Terraform モジュールは [`aws_lambda_function`][2] リソースをラップし、Datadog サーバーレスモニタリング用に次の方法で Lambda 関数を自動的に設定します。

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
  datadog_node_layer_version = {{< latest-lambda-layer-version layer="node" >}}

  # aws_lambda_function arguments
}
```

1. `aws_lambda_function` リソースを `lambda-datadog` Terraform モジュールに置き換えます。次に、モジュールの `source` と `version` を指定します。

2. `aws_lambda_function` 引数を設定します。

   `aws_lambda_function` リソースで利用可能なすべての引数は、この Terraform モジュールでも利用可能です。`aws_lambda_function` リソースでブロックとして定義された引数は、ネストされた引数を持つ変数として再定義されます。

   たとえば、`aws_lambda_function` では、`environment` は `variables` 引数を持つブロックとして定義されています。`lambda-datadog` Terraform モジュールでは、`environment_variables` の値が `aws_lambda_function` の `environment.variables` 引数に渡されます。このモジュールの変数の完全なリストについては、[入力][3]を参照してください。

3. 環境変数のプレースホルダーを埋めます。

   -  `<DATADOG_API_KEY_SECRET_ARN>` を、Datadog API キーが安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキストの文字列として保存する必要があります (JSON ブロブではありません)。`secretsmanager:GetSecretValue` の権限が必要です。迅速なテストのために、代わりに環境変数 `DD_API_KEY` を使用し、Datadog API キーをプレーンテキストで設定できます。
   - `<ENVIRONMENT>` を、`prod` や `staging` などの Lambda 関数の環境で置き換えます。
   -  `<SERVICE_NAME>` を、Lambda 関数のサービス名に置き換えます。
   - `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}}に置き換えます (このページで正しい [Datadog サイト][4]が選択されていることを確認してください)。
   - `<VERSION>` を Lambda 関数のバージョン番号に置き換えます。

4. 使用する Datadog Extension Lambda レイヤーと Datadog Node.js Lambda レイヤーのバージョンを選択します。デフォルトは、レイヤーの最新バージョンになります。

```
  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
  datadog_node_layer_version = {{< latest-lambda-layer-version layer="node" >}}
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
    handler: "index.handler",
    nodejs : {
      install: [
        "datadog-lambda-js",
        "dd-trace",
      ]
    },
    environment: {
      DD_ENV: "<ENVIRONMENT>",
      DD_SERVICE: "<SERVICE_NAME>",
      DD_VERSION: "<VERSION>",
      DATADOG_API_KEY_SECRET_ARN: "<DATADOG_API_KEY_SECRET_ARN>",
      DD_SITE: "<DATADOG_SITE>",
    },
    layers: [
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`,
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}`,
    ],
  });
  ```

  1. Configure the Datadog Lambda Library and Datadog Lambda Extension layers

     - The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="node-versions" >}}.

  2. `dd-trace` と `datadog-lambda-js` を `nodejs.install` リストに追加します。

  3. 環境変数のプレースホルダーを埋めます。

     -  `<DATADOG_API_KEY_SECRET_ARN>` を、Datadog API キーが安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキストの文字列として保存する必要があります (JSON ブロブではありません)。`secretsmanager:GetSecretValue` の権限が必要です。迅速なテストのために、代わりに環境変数 `DD_API_KEY` を使用し、Datadog API キーをプレーンテキストで設定できます。
     - `<ENVIRONMENT>` を、`prod` や `staging` などの Lambda 関数の環境で置き換えます。
     -  `<SERVICE_NAME>` を、Lambda 関数のサービス名に置き換えます。
     - `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}}に置き換えます (このページで正しい [Datadog サイト][1]が選択されていることを確認してください)。
     - `<VERSION>`を Lambda 関数のバージョン番号に置き換えます。

  4. [関数コードで Datadog ラッパーを適用][2]します。

[1]: /ja/getting_started/site/
[2]: https://docs.datadoghq.com/ja/serverless/guide/handler_wrapper
{{% /tab %}}
{{% tab "カスタム" %}}

<div class="alert alert-info">Serverless Framework や AWS CDK といった Datadog をサポートするサーバーレス開発ツールを使用していない場合は、Datadog はお使いのサーバーレスアプリケーションを <a href="./?tab=datadogcli">Datadog CLI</a> でインスツルメントすることを強く推奨します。</div>

1. Datadog Lambda ライブラリをインストールします。

    Datadog Lambda ライブラリは、レイヤー (推奨) _または_ JavaScript パッケージのどちらかとしてインポートすることができます。

    `datadog-lambda-js` パッケージのマイナーバージョンは常にレイヤーバージョンと一致します。たとえば、datadog-lambda-js v0.5.0 はレイヤーバージョン 5 の内容と一致します。

    - オプション A: 次のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

      ```sh
      # Use this format for AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

      # Use this format for AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
      ```

      Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`. The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="node-versions" >}}.

    - Option B: If you cannot use the prebuilt Datadog Lambda layer, alternatively you can install the packages `datadog-lambda-js` and `dd-trace` using your favorite package manager.

      ```
      npm install datadog-lambda-js dd-trace
      ```

2. Datadog Lambda Extension をインストールします。

    次のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

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

    - 関数のハンドラーを、レイヤーを使用する場合は `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` に、パッケージを使用する場合は `node_modules/datadog-lambda-js/dist/handler.handler` に設定します。
    - 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。

    **注**: Lambda 関数が `arm64` で実行され、`datadog-lambda-js` ライブラリが NPM パッケージとしてインストールされている場合 (ステップ 1 のオプション B)、代わりに[関数コードで Datadog ラッパーを適用][2]する必要があります。また、Datadog ハンドラーのリダイレクトと互換性のないサードパーティのセキュリティツールや監視ツールを使用している場合、そのようなことが必要になる場合があります。

4. Datadog サイトと API キーを構成します。

    - 環境変数 `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定します (右側で正しいサイトが選択されていることを確認してください)。
    - [Datadog API キー][3]が安全に保存されている AWS シークレットの ARN を環境変数 `DD_API_KEY_SECRET_ARN` に設定します。キーはプレーンテキストの文字列として保存する必要があります (JSON ブロブではありません)。`secretsmanager:GetSecretValue` の権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用し、Datadog API キーをプレーンテキストで設定できます。

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/ja/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

<div class="alert alert-danger">Datadog Lambda ライブラリは、レイヤーとしても JavaScript パッケージとしても<i>インストールしない</i>でください。Datadog Lambda ライブラリをレイヤーとしてインストールした場合は、 <code>datadog-lambda-js</code> を <code>package.json</code>に含めないでください。あるいは、開発依存としてインストールして <code>npm install --production</code> を実行してからデプロイしてください。</div>

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

カスタムビジネスロジックを監視するには、次のサンプルコードを使用してカスタムメトリクスまたはスパンを送信します。追加のオプションについては、[サーバーレスアプリケーション向けカスタムメトリクス送信][4]および APM ガイドの[カスタムインスツルメンテーション][5]を参照してください。

```javascript
const { sendDistributionMetric, sendDistributionMetricWithDate } = require('datadog-lambda-js');
const tracer = require('dd-trace');

// submit a custom span named "sleep"
const sleep = tracer.wrap('sleep', (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
});

exports.handler = async (event) => {
    // add custom tags to the lambda function span,
    // does NOT work when X-Ray tracing is enabled
    const span = tracer.scope().active();
    span.setTag('customer_id', '123456');

    await sleep(100);

    // submit a custom span
    const sandwich = tracer.trace('hello.world', () => {
        console.log('Hello, World!');
    });

    // submit a custom metric
    sendDistributionMetric(
        'coffee_house.order_value', // metric name
        12.45, // metric value
        'product:latte', // tag
        'order:online' // another tag
    );

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from serverless!')
    };
    return response;
};
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /ja/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /ja/serverless/configuration/
[4]: /ja/serverless/custom_metrics?tab=nodejs
[5]: /ja/tracing/custom_instrumentation/nodejs/
[6]: /ja/security/application_security/serverless/
[7]: https://github.com/DataDog/datadog-lambda-extension
[8]: https://github.com/DataDog/datadog-lambda-extension/issues
[9]: /ja/serverless/aws_lambda/distributed_tracing/#span-auto-linking
[10]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[11]: /ja/serverless/aws_lambda/remote_instrumentation
[12]: /ja/serverless/aws_lambda/configuration?tab=datadogcli#collect-the-request-and-response-payloads