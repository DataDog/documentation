---
aliases:
- /ja/serverless/datadog_lambda_library/nodejs/
- /ja/serverless/guide/nodejs/
- /ja/serverless/installation/nodejs
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
kind: ドキュメント
title: Node.js サーバーレスアプリケーションのインスツルメンテーション
---

<div class="alert alert-warning">以前に Datadog Forwarder を使用して Lambda 関数をセットアップした場合は、<a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_node">Datadog Forwarder を使用したインスツルメント</a>を参照してください。それ以外の場合は、このガイドの指示に従って、Datadog Lambda 拡張機能を使用してインスツルメンテーションを行います。</div>

<div class="alert alert-warning">Lambda 関数が公共のインターネットにアクセスできない VPC にデプロイされている場合、<code>datadoghq.com</code> <a href="/getting_started/site/">Datadog サイト</a>には <a href="/agent/guide/private-link/">AWS PrivateLink</a> を、それ以外のサイトには<a href="/agent/configuration/proxy/">プロキシを使用</a>してデータを送信することができます。</div>

<div class="alert alert-warning">webpack や esbuild を使ってバンドルしている場合、<a href="/serverless/guide/serverless_tracing_and_bundlers/">Datadog のライブラリを external としてマークする</a>必要があるかもしれません。</div>

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
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

   プレースホルダーを埋めるには
    - `<functionname>` と `<another_functionname>` は Lambda 関数の名前に置き換えます。また、`--functions-regex` を使用すると、指定した正規表現にマッチする名前を持つ複数の関数を自動的にインスツルメントすることができます。
    - `<aws_region>` を AWS リージョン名に置き換えます。

    その他のパラメーターは、[CLI ドキュメント][2]に記載されています。


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

<div class="alert alert-info">代わりに、<a href="https://www.serverless.com/framework/docs/providers/aws/guide/intro">JavaScript ファイルから JSON オブジェクトをネイティブにエクスポート</a>して (たとえば <code>serverless.ts</code> ファイルを使用して) Serverless Framework アプリをデプロイする場合は、<a href="./?tab=custom">カスタムインストール手順</a>に従います。</div>

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

   SAM の `template.yml` の `Transform` セクションで、 `AWS::Serverless` 変換の後に `DatadogServerless` 変換を追加します。

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
    npm install datadog-cdk-constructs --save-dev

    # For AWS CDK v2
    npm install datadog-cdk-constructs-v2 --save-dev
    ```

2. Lambda 関数をインスツルメントする

    ```javascript
    // For AWS CDK v1
    import { Datadog } from "datadog-cdk-constructs";

    // For AWS CDK v2
    import { Datadog } from "datadog-cdk-constructs-v2";

    const datadog = new Datadog(this, "Datadog", {
        nodeLayerVersion: {{< latest-lambda-layer-version layer="node" >}},
        extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}},
        site: "<DATADOG_SITE>",
        apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
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

   Lambda 関数をコンテナイメージとしてデプロイする場合は、Datadog Lambda ライブラリを Lambda レイヤーとして使用できません。代わりに、イメージ内に Datadog Lambda とトレーシングライブラリをパッケージ化する必要があります。

    ```sh
    npm install datadog-lambda-js dd-trace
    ```

   `datadog-lambda-js` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、`datadog-lambda-js v0.5.0` は、レイヤーバージョン 5 のコンテンツに一致します。

2. Datadog Lambda 拡張機能のインストール

   Dockerfile に以下を追加して、Datadog Lambda 拡張機能をコンテナイメージに追加します。

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

   `<TAG>` を特定のバージョン番号 (例えば `{{< latest-lambda-layer-version layer="extension" >}}`) または `latest` に置き換えてください。Alpine も特定のバージョン番号 (例えば `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) または `latest-alpine` でサポートされています。[Amazon ECR リポジトリ][1]で、使用可能なタグの完全なリストを見ることができます。

3. ハンドラー関数のリダイレクト

    - イメージの `CMD` 値を `node_modules/datadog-lambda-js/dist/handler.handler` に設定します。AWS で設定するか、Dockerfile 内で直接設定します。なお、両方の値を設定した場合、AWS で設定した値が Dockerfile 内の値をオーバーライドします。
    - 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
    - コンテナで ESModule を使用している場合、`handler.js` ファイルを削除する必要があります。このファイルは Node 12 用に存在し、AWS が Node 12 のサポートを非推奨にしたときに削除されます。
      ```dockerfile
      RUN rm node_modules/datadog-lambda-js/dist/handler.js
      CMD ["node_modules/datadog-lambda-js/dist/handler.handler"]
      ```

    **注**: Lambda 関数が `arm64` で実行される場合、コンテナイメージを arm64 ベースの Amazon Linux 環境で構築するか、代わりに[関数コードで Datadog ラッパーを適用する][2]必要があります。また、Datadog ハンドラーのリダイレクトと互換性のないサードパーティのセキュリティツールや監視ツールを使用している場合、そのようなことが必要になる場合があります。

4. Datadog サイトと API キーの構成

    - 環境変数 `DD_SITE` に {{< region-param key="dd_site" code="true" >}} を設定します。(右側で正しい SITE が選択されていることを確認してください)。
    - 環境変数 `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][3]が安全に保存されている AWS シークレットの ARN で設定します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。


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
  datadog_node_layer_version = 112

  # aws_lambda_function arguments
}
```

1. `aws_lambda_function` リソースを `lambda-datadog` Terraform モジュールに置き換えます。次に、モジュールの `source` と `version` を指定します。

2. `aws_lambda_function` 引数を設定します。

   `aws_lambda_function` リソースで利用可能な引数は、この Terraform モジュールでもすべて利用可能です。`aws_lambda_function` リソースでブロックとして定義された引数は、ネストされた引数とともに変数として再定義されます。

   たとえば、`aws_lambda_function` では、`environment` は `variables` 引数を持つブロックとして定義されています。`lambda-datadog` Terraformモジュールでは、`environment_variables` の値が `aws_lambda_function` の `environment.variables` 引数に渡されます。このモジュールの変数の完全なリストは [Inputs][3] を参照してください。

3. 環境変数のプレースホルダーを埋めていきます。

   - `<DATADOG_API_KEY_SECRET_ARN>` を、[Datadog API キー][3]が安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに環境変数 `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。
   - `<ENVIRONMENT>` を、`prod` や `staging` などの Lambda 関数の環境で置き換えます。　
   - `<SERVICE_NAME>` を、Lambda 関数のサービス名に置き換えます。
   - `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。(このページで正しい [Datadog サイト][4]が選択されていることを確認してください。)
   - `<VERSION>` を Lambda 関数のバージョン番号に置き換えます。

4. 使用する Datadog 拡張機能 Lambda レイヤーと Datadog Node.js Lambda レイヤーのバージョンを選択します。デフォルトは、レイヤーの最新バージョンになります。

```
  datadog_extension_layer_version = 58
  datadog_node_layer_version = 112
```

[1]: https://registry.terraform.io/modules/DataDog/lambda-datadog/aws/latest
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
[3]: https://github.com/DataDog/terraform-aws-lambda-datadog?tab=readme-ov-file#inputs
[4]: /ja/getting_started/site/
{{% /tab %}}
{{% tab "Custom" %}}

<div class="alert alert-info">Serverless Framework や AWS CDK といった Datadog をサポートするサーバーレス開発ツールを使用していない場合は、Datadog はお使いのサーバーレスアプリケーションを <a href="./?tab=datadogcli">Datadog CLI</a> でインスツルメントすることを強く推奨します。</div>

1. Datadog Lambda ライブラリのインストール

   Datadog Lambda ライブラリは、レイヤー (推奨) _または_ JavaScript パッケージのどちらかとしてインポートすることができます。

   `datadog-lambda-js` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、datadog-lambda-js v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致します。

    - オプション A: 以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

      ```sh
      # Use this format for AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

      # Use this format for AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
      ```

      `<AWS_REGION>` を `us-east-1` などの有効な AWS リージョンに置き換えます。`<RUNTIME>` オプションは、{{< latest-lambda-layer-version layer="node-versions" >}} が利用可能です。

    - オプション B: もし、ビルド済みの Datadog Lambda レイヤーを使用できない場合は、お気に入りのパッケージマネージャーを使用して、パッケージ `datadog-lambda-js` と `dd-trace` をインストールすることができます。

      ```
      npm install datadog-lambda-js dd-trace
      ```

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

    - 関数のハンドラーを、レイヤーを使用する場合は `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` に、パッケージを使用する場合は `node_modules/datadog-lambda-js/dist/handler.handler` に設定します。
    - 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。

    **注**: Lambda 関数が `arm64` で実行され、`datadog-lambda-js` ライブラリが NPM パッケージとしてインストールされている場合 (ステップ 1 のオプション B)、代わりに[関数コードで Datadog ラッパーを適用する][2]必要があります。また、Datadog ハンドラーのリダイレクトと互換性のないサードパーティのセキュリティツールや監視ツールを使用している場合、そのようなことが必要になる場合があります。

4. Datadog サイトと API キーの構成

    - 環境変数 `DD_SITE` に {{< region-param key="dd_site" code="true" >}} を設定します。(右側で正しい SITE が選択されていることを確認してください)。
    - 環境変数 `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][3]が安全に保存されている AWS シークレットの ARN で設定します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/ja/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## 次のステップ

- おめでとうございます。[Serverless Homepage][1] でメトリクス、ログ、トレースを見ることができるようになりました。
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

```javascript
const { sendDistributionMetric, sendDistributionMetricWithDate } = require('datadog-lambda-js');
const tracer = require('dd-trace');

// カスタムスパン "sleep" を送信
const sleep = tracer.wrap('sleep', (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
});

exports.handler = async (event) => {
    // Lambda 関数 span にカスタムタグを追加
    // X-Rayトレースが有効な場合、動作しない
    const span = tracer.scope().active();
    span.setTag('customer_id', '123456');

    await sleep(100);

    // カスタムスパンを送信
    const sandwich = tracer.trace('hello.world', () => {
        console.log('Hello, World!');
    });

    // カスタムメトリクスを送信
    sendDistributionMetric(
        'coffee_house.order_value', // メトリクス名
        12.45, // メトリクス値
        'product:latte', // タグ
        'order:online' // 他のタグ
    );

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from serverless!')
    };
    return response;
};
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /ja/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /ja/serverless/configuration/
[4]: /ja/serverless/custom_metrics?tab=nodejs
[5]: /ja/tracing/custom_instrumentation/nodejs/
[6]: /ja/security/application_security/enabling/serverless/?tab=serverlessframework