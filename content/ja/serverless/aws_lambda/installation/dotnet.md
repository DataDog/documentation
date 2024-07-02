---
title: Instrumenting .NET Serverless Applications
aliases:
    - /serverless/installation/dotnet
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
---

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
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="dd-trace-dotnet" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

   プレースホルダーを埋めるには
    - `<functionname>` と `<another_functionname>` は Lambda 関数の名前に置き換えます。また、`--functions-regex` を使用すると、指定した正規表現にマッチする名前を持つ複数の関数を自動的にインスツルメントすることができます。
    - `<aws_region>` を AWS リージョン名に置き換えます。

    その他のパラメーターは、[CLI ドキュメント][2]に記載されています。

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
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

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/serverless/libraries_integrations/extension
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
          dotnetLayerVersion: {{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
          extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}}
          site: "<DATADOG_SITE>"
          apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    ```

   プレースホルダーを埋めるには
    - `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。(右側で正しい SITE が選択されていることを確認してください)。
    - `<DATADOG_API_KEY_SECRET_ARN>` を、[Datadog API キー][4]が安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `apiKey` を使用して、Datadog API キーをプレーンテキストで設定することができます。

    [マクロのドキュメント][1]に詳細と追加のパラメーターがあります。


[1]: https://docs.datadoghq.com/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "コンテナイメージ" %}}

1. Datadog Lambda 拡張機能のインストール

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

   `<TAG>` を特定のバージョン番号 (例えば `{{< latest-lambda-layer-version layer="extension" >}}`) または `latest` に置き換えてください。Alpine も特定のバージョン番号 (例えば `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) または `latest-alpine` でサポートされています。[Amazon ECR リポジトリ][1]で、使用可能なタグの完全なリストを見ることができます。

2. Datadog .NET APM クライアントをインストールする

    ```dockerfile
    RUN yum -y install tar wget gzip
    RUN wget https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>.tar.gz
    RUN mkdir /opt/datadog
    RUN tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz
    ENV AWS_LAMBDA_EXEC_WRAPPER /opt/datadog_wrapper
    ```

   `<TRACER_VERSION>` を使用したい `dd-trace-dotnet` のバージョン番号に置き換えてください (例: `2.3.0`)。サポートされる最小バージョンは `2.3.0` です。最新の `dd-trace-dotnet` のバージョンは [GitHub][2] で確認することができます。

3. 必要な環境変数を設定する

    - 環境変数 `DD_SITE` に {{< region-param key="dd_site" code="true" >}} を設定します。(右側で正しい SITE が選択されていることを確認してください)。
    - 環境変数 `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][3]が安全に保存されている AWS シークレットの ARN で設定します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://github.com/DataDog/dd-trace-dotnet/releases
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Terraform" %}}

[Terraform リソース][1]にはこのフォーマットを使用します。

```sh
resource "aws_lambda_function" "lambda" {
  "function_name" = ...
  ...

  # Lambda アーキテクチャと AWS リージョンに基づいて適切なレイヤーを選択することを忘れないでください

  layers = [
    <DATADOG_TRACER_ARN>,
    <DATADOG_EXTENSION_ARN>
  ]

  environment {
    variables = {
      DD_SITE                     = <DATADOG_SITE>
      DD_API_KEY_SECRET_ARN       = <API_KEY>
      AWS_LAMBDA_EXEC_WRAPPER     = "/opt/datadog_wrapper"
    }
  }
}
```

適宜、変数を入力します。

1. `<DATADOG_TRACER_ARN>` を、リージョンとアーキテクチャに適した Datadog トレーサーの ARN に置き換えます。

    <table>
        <tr>
            <th>AWS REGIONS</th>
            <th>ARCHITECTURE</th>
            <th>LAYER</th>
        </tr>
        <tr>
            <td rowspan=2>Commercial</td>
            <td>x86_64</td>
            <td><code>arn:aws:lambda:&lt;AWS_REGION&gt;:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}</code></td>
        <tr>
            <td>arm64</td>
            <td><code>arn:aws:lambda:&lt;AWS_REGION&gt;:464622532012:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}</code></td>
        </tr>
        <tr>
            <td rowspan=2>GovCloud</td>
            <td>x86_64</td>
            <td><code>arn:aws:lambda:&lt;AWS_REGION&gt;:002406178527:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}</code></td>
        <tr>
            <td>arm64</td>
            <td><code>arn:aws:lambda:&lt;AWS_REGION&gt;:002406178527:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}</code></td>
        </tr>
    </table>

   ARN で、`<AWS_REGION>` を `us-east-1` などの有効な AWS リージョンに置き換えます。

2. `<DATADOG_EXTENSION_ARN>` を、リージョンとアーキテクチャに適した Datadog Lambda 拡張機能の ARN に置き換えます。

    <table>
        <tr>
            <th>AWS REGIONS</th>
            <th>ARCHITECTURE</th>
            <th>LAYER</th>
        </tr>
        <tr>
            <td rowspan=2>Commercial</td>
            <td>x86_64</td>
            <td><code>arn:aws:lambda:&lt;AWS_REGION&gt;:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}</code></td>
        <tr>
            <td>arm64</td>
            <td><code>arn:aws:lambda:&lt;AWS_REGION&gt;:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}</code></td>
        </tr>
        <tr>
            <td rowspan=2>GovCloud</td>
            <td>x86_64</td>
            <td><code>arn:aws-us-gov:lambda:&lt;AWS_REGION&gt;:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}</code></td>
        </tr>
        <tr>
            <td>arm64</td>
            <td><code>arn:aws-us-gov:lambda:&lt;AWS_REGION&gt;:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}</code></td>
        </tr>
    </table>

   ARN で、`<AWS_REGION>` を `us-east-1` などの有効な AWS リージョンに置き換えます。

3. `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。(右側で正しい SITE が選択されていることを確認してください)。

4. `<API_KEY>` を、Datadog API キーが安全に保存されている AWS シークレットの ARN に置き換えます。キーは (JSON blob ではなく) プレーンテキスト文字列として保存する必要があります。`secretsmanager:GetSecretValue` 権限が必要です。簡単なテストのために、 `DD_API_KEY_SECRET_ARN` の代わりに `DD_API_KEY` を使用し、値をプレーンテキストで Datadog API キーに設定します。


#### 完全な例

```sh
resource "aws_lambda_function" "lambda" {
  "function_name" = ...
  ...

  # Lambda アーキテクチャと AWS リージョンに基づいて適切なレイヤーを選択することを忘れないでください

  layers = [
    "arn:aws:lambda:us-east-1:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}",
    "arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}"
  ]


  environment {
    variables = {
      DD_SITE                     = "datadoghq.com"
      DD_API_KEY_SECRET_ARN       = "arn:aws..."
      AWS_LAMBDA_EXEC_WRAPPER     = "/opt/datadog_wrapper"
    }
  }
}
```

[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function.html#lambda-layers
{{% /tab %}}

{{% tab "Custom" %}}

1. Datadog トレーサーのインストール

   以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

    ```sh
    # Use this format for x86-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}

    # Use this format for arm64-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}

    # Use this format for x86-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}

    # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
    ```

   `<AWS_REGION>` を `us-east-1` などの有効な AWS リージョンに置き換えてください。

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

3. 必要な環境変数を設定する

    - `AWS_LAMBDA_EXEC_WRAPPER` を `/opt/datadog_wrapper` に設定します。
    - `DD_SITE` に {{< region-param key="dd_site" code="true" >}} を設定します。(右側で正しい SITE が選択されていることを確認してください)。
    - `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][2]が安全に保存されている AWS シークレットの ARN に設定します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## 次のステップ
- [Serverless Homepage][1] でメトリクス、ログ、トレースを見ることができるようになりました。
- サービスを標的にしている攻撃者についてアラートを受け取るには、[脅威の監視][6]を有効にします。
- [カスタムメトリクス][2]または [APM スパン][3]を送信して、ビジネスロジックを監視します。
- テレメトリーの収集に問題がある場合は、[トラブルシューティングガイド][4]を参照してください
- [高度な構成][5]を参照して以下のことを行ってください。
    - タグを使ったテレメトリー接続
    - collect telemetry for Amazon API Gateway, SQS, and so on.
    - Lambda のリクエストとレスポンスのペイロードを取得する
    - Lambda 関数のエラーをソースコードにリンクする
    - ログまたはトレースから機密情報をフィルタリングまたはスクラブする

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/metrics/dogstatsd_metrics_submission/
[3]: /tracing/custom_instrumentation/dotnet/
[4]: /serverless/guide/troubleshoot_serverless_monitoring/
[5]: /serverless/configuration/
[6]: /security/application_security/enabling/serverless/?tab=serverlessframework
