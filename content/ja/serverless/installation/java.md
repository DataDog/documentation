---
aliases:
- /ja/serverless/datadog_lambda_library/java/
further_reading:
- link: /serverless/configuration
  tag: Documentation
  text: サーバーレスモニタリングの構成
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentation
  text: サーバーレスモニタリングのトラブルシューティング
- link: serverless/custom_metrics/
  tag: Documentation
  text: サーバーレスアプリケーションからのカスタムメトリクスの送信
kind: ドキュメント
title: Java サーバーレスアプリケーションのインスツルメンテーション
---

分散型トレーシングでサーバーレスアプリケーションを完全にインスツルメントするには、Java Lambda 関数が Java 8 Corretto (`java8.al2`)、Java 11 (`java11`) または Java 17 (`java17`) ランタイムを使用し、少なくとも 1024 MB のメモリが必要です。

Lambda 関数が公衆インターネットにアクセスできない VPC にデプロイされている場合、`datadoghq.com` [Datadog サイト][7]の場合は [AWS PrivateLink を使用][6]し、その他のサイトの場合は[プロキシを使用][8]してデータを送信することができます。

以前に Datadog Forwarder を使用して Lambda 関数をセットアップした場合は、[Datadog Forwarder を使用したインスツルメント][9]を参照してください。それ以外の場合は、このガイドの指示に従って、Datadog Lambda 拡張機能を使用してインスツルメンテーションを行います。

Datadog Lambda レイヤーの `dd-trace-java:4` (またはそれ以前) と `Datadog-Extension:24` (またはそれ以前) を使用している場合、[アップグレードに関する特別指示][10]に従ってください。

## インストール

Datadog は、サーバーレスアプリケーションのインスツルメンテーションを有効にするためのさまざまな方法を提供しています。以下からニーズに合った方法を選択してください。Datadog では、一般的に Datadog CLI の使用を推奨しています。アプリケーションがコンテナイメージとしてデプロイされる場合は、「コンテナイメージ」の指示に従うことが*必要です*。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI は、既存の Lambda 関数のコンフィギュレーションを修正し、新しいデプロイを必要とせずにインスツルメンテーションを可能にします。Datadog のサーバーレスモニタリングをすばやく開始するための最適な方法です。

1. Datadog CLI クライアントをインストールする

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Datadog サーバーレスモニタリングに慣れていない場合は、クイックスタートとして最初のインストールを導くためにインタラクティブモードで Datadog CLI を起動し、このページの残りのステップを無視することができます。本番アプリケーションに Datadog を恒久的にインストールするには、このステップをスキップし、残りのステップに従って通常のデプロイの_後に_ CI/CD パイプラインで Datadog CLI コマンドを実行します。

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

   **注**: Lambda 関数は、まず開発環境またはステージング環境でインスツルメントしてください。インスツルメンテーションの結果が思わしくない場合は、同じ引数で `uninstrument` を実行し、変更を元に戻すことができます。

   Lambda 関数をインスツルメントするには、次のコマンドを実行します。

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="dd-trace-java" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
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
{{% tab "AWS CDK" %}}

<div class="alert alert-info">Datadog CDK コンストラクトによる Java 関数のインスツルメンテーションは、Node.js と Python で書かれた AWS CDK アプリでのみ利用可能です。</div>

[Datadog CDK コンストラクト][1] は、Lambda レイヤーを使用して Datadog を関数に自動的にインストールします。これは、Datadog Lambda 拡張機能を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

1. Datadog CDK コンストラクトライブラリのインストール

    **Node.js**:
    ```sh
    # For AWS CDK v1
    npm install datadog-cdk-constructs --save-dev

    # For AWS CDK v2
    npm install datadog-cdk-constructs-v2 --save-dev
    ```

    **Python**:
    ```sh
    # For AWS CDK v1
    pip install datadog-cdk-constructs

    # For AWS CDK v2
    pip install datadog-cdk-constructs-v2
    ```

2. Lambda 関数をインスツルメントする

    **Node.js**:
    ```javascript
    // For AWS CDK v1
    import { Datadog } from "datadog-cdk-constructs";

    // For AWS CDK v2
    import { Datadog } from "datadog-cdk-constructs-v2";

    const datadog = new Datadog(this, "Datadog", {
        javaLayerVersion: {{< latest-lambda-layer-version layer="dd-trace-java" >}},
        extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}},
        site: "<DATADOG_SITE>",
        apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
    ```

    **Python**:
    ```python
    # For AWS CDK v1
    from datadog_cdk_constructs import Datadog

    # For AWS CDK v2
    from datadog_cdk_constructs_v2 import Datadog

    datadog = Datadog(self, "Datadog",
        java_layer_version={{< latest-lambda-layer-version layer="dd-trace-java" >}},
        extension_layer_version={{< latest-lambda-layer-version layer="extension" >}},
        site="<DATADOG_SITE>",
        api_key_secret_arn="<DATADOG_API_KEY_SECRET_ARN>",
      )
    datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>])
    ```

   プレースホルダーを埋めるには
    - `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。(右側で正しい SITE が選択されていることを確認してください)。
    - `<DATADOG_API_KEY_SECRET_ARN>` を、[Datadog API キー][2]が安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、Lambda の実行ロールが、シークレット値を読み取るための `secretsmanager:GetSecretValue` IAM 権限を持つことを確認します。迅速なテストのために、代わりに `apiKey` を使用して、Datadog API キーをプレーンテキストで設定することができます。

    [Datadog CDK のドキュメント][1]に詳細と追加のパラメーターがあります。

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "コンテナイメージ" %}}

1. Datadog Lambda 拡張機能のインストール

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

   `<TAG>` を特定のバージョン番号 (たとえば `{{< latest-lambda-layer-version layer="extension" >}}`) または `latest` に置き換えます。利用可能なタグのリストは、[Amazon ECR リポジトリ][1]で確認できます。

2. Datadog Java APM クライアントをインストールする

    ```dockerfile
    RUN yum -y install tar wget gzip
    RUN wget -O /opt/java/lib/dd-java-agent.jar https://dtdg.co/latest-java-tracer
    ```

3. 必要な環境変数を設定する

    - `AWS_LAMBDA_EXEC_WRAPPER` を `/opt/datadog_wrapper` に設定します。
    - `DD_SITE` に {{< region-param key="dd_site" code="true" >}} を設定します。(右側で正しい SITE が選択されていることを確認してください)。
    - `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][2]が安全に保存されている AWS シークレットの ARN に設定します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Custom" %}}

{{< site-region region="us,us3,us5,eu,gov" >}}
1. Datadog トレーサーのインストール

   以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

    ```sh
    # Use this format for Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}

    # Use this format for Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
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

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

{{< site-region region="ap1" >}}
1. Datadog トレーサーのインストール

   以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

    ```sh
    # Use this format for Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}

    # Use this format for Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
    ```

   `<AWS_REGION>` を `us-east-1` などの有効な AWS リージョンに置き換えてください。

2. Datadog Lambda 拡張機能のインストール

   以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

    ```sh
    # Use this format for x86-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for arm64-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for x86-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
    ```

   `<AWS_REGION>` を `us-east-1` などの有効な AWS リージョンに置き換えてください。

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

3. 必要な環境変数を設定する

    - `AWS_LAMBDA_EXEC_WRAPPER` を `/opt/datadog_wrapper` に設定します。
    - `DD_SITE` に {{< region-param key="dd_site" code="true" >}} を設定します。(右側で正しい SITE が選択されていることを確認してください)。
    - `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][2]が安全に保存されている AWS シークレットの ARN に設定します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。

[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## 次のステップ

- [Serverless Homepage][1] でメトリクス、ログ、トレースを見ることができるようになりました。
- サービスを標的にしている攻撃者についてアラートを受け取るには、[脅威の監視][11]を有効にします。
- [カスタムメトリクス][2]または [APM スパン][3]を送信して、ビジネスロジックを監視します。
- テレメトリーの収集に問題がある場合は、[トラブルシューティングガイド][4]を参照してください
- [高度な構成][5]を参照して以下のことを行ってください。
    - タグを使ったテレメトリー接続
    - Amazon API Gateway、SQS などのテレメトリーを収集する
    - Lambda のリクエストとレスポンスのペイロードを取得する
    - Lambda 関数のエラーをソースコードにリンクする
    - ログまたはトレースから機密情報をフィルタリングまたはスクラブする

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/ja/metrics/dogstatsd_metrics_submission/
[3]: /ja/tracing/custom_instrumentation/java/
[4]: /ja/serverless/guide/troubleshoot_serverless_monitoring/
[5]: /ja/serverless/configuration/
[6]: /ja/agent/guide/private-link/
[7]: /ja/getting_started/site/
[8]: /ja/agent/proxy/
[9]: /ja/serverless/guide/datadog_forwarder_java
[10]: /ja/serverless/guide/upgrade_java_instrumentation
[11]: /ja/security/application_security/enabling/serverless/?tab=serverlessframework