---
further_reading:
- link: /security/application_security/how-it-works/
  tag: ドキュメント
  text: App and API Protection の仕組み
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
- link: /security/application_security/threats/
  tag: ドキュメント
  text: App and API Protection
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: ブログ
  text: Datadog Security による Google Cloud のコンプライアンスと脅威対策機能の拡張
title: Go での AWS Lambda 関数に対する App and API Protection の有効化
---
AWS Lambda の App and API Protection を構成するには、以下を行います。

1. 脆弱性がある、または攻撃を受けており、App and API Protection から最も恩恵を受ける関数を特定します。[カタログのセキュリティタブ][1]で確認します。
2. [Datadog CLI][8]、[AWS CDK][9]、[Datadog Serverless Framework プラグイン][2]のいずれかを使用するか、Datadog トレースレイヤーを使用して手動で、App and API Protection のインスツルメンテーションをセットアップします。
3. アプリケーションでセキュリティシグナルをトリガーし、その結果の情報を Datadog がどのように表示するかを確認します。

## 対応するトリガータイプ {#supported-trigger-types}
脅威検知は、関数入力としての HTTP リクエストのみをサポートしています。これは、そのチャネルが攻撃者によるサーバーレスアプリケーションの悪用において最も可能性が高いためです。HTTP リクエストは通常、以下のような AWS サービスから送信されます。
- Application Load Balancer (ALB)
- API Gateway v1 (Rest API)
- API Gateway v2 (HTTP API)
- 関数 URL

<div class="alert alert-info">サポートされていない機能のサポート追加をご希望の場合は、こちらの <a href="https://forms.gle/gHrxGQMEnAobukfn7">フォーム</a> に記入してフィードバックをお送りください。</div>


## 始める{#get-started}

{{< tabs >}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Framework プラグイン][1]を使用すれば、Lambda を App and API Protection で自動的に構成、デプロイすることができます。

Datadog Serverless Framework プラグインをインストールして構成するには、

1. Datadog Serverless Framework プラグインをインストールします。
   ```sh
   serverless plugin install --name serverless-plugin-datadog
   ```

2. `serverless.yml` を `enableASM` 構成パラメーターで更新して、App and API Protection を有効にします。
   ```yaml
   custom:
     datadog:
       appSecMode: on
   ```

   全体として、新しい `serverless.yml` ファイルには少なくとも以下が含まれている必要があります。
   ```yaml
   custom:
     datadog:
       apiKeySecretArn: "{Datadog_API_Key_Secret_ARN}" # or apiKey
       appSecMode: on
   ```
   さらに Lambda の設定を構成する場合は、[プラグインパラメーター][2]の一覧も参照してください。

4. 関数を再デプロイし、呼び出します。数分後、[App and API Protection ビュー][3]に表示されます。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/plugin/#configuration-parameters
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc
{{% /tab %}}
{{% tab "Datadog CLI" %}}

Datadog CLI は、既存の Lambda 関数の構成を修正し、新しいデプロイを必要とせずにインスツルメンテーションを可能にします。Datadog のサーバーレスモニタリングを素早く開始するための最適な方法です。

**関数の初期トレースを設定する場合**は、以下の手順を実行します。

1. Datadog CLI クライアントをインストールします。

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Datadog のサーバーレスモニタリングを初めて利用する場合は、Datadog CLI をインタラクティブモードで起動して初回インストールを案内します。その場合、以降のステップは省略できます。本番アプリケーションに Datadog を永続的にインストールするには、このステップをスキップし、残りのステップに従って、通常のデプロイ後に CI/CD パイプラインで Datadog CLI コマンドを実行します。

    ```sh
    datadog-ci lambda instrument -i --appsec
    ```

3. AWS の認証情報を構成します。

    Datadog CLI は AWS Lambda サービスへのアクセスを必要とし、AWS JavaScript SDK に依存して[認証情報を解決][1]します。AWS CLI を呼び出すときと同じ方法で、AWS 認証情報が構成されていることを確認してください。

4. Datadog サイトを構成します。

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (このページの右側で正しい **Datadog サイト** が選択されていることを確認します)。

5. Datadog API キーを構成します。

    Datadog は、セキュリティのために Datadog API キーを AWS Secrets Manager に保存することを推奨します。キーはプレーンテキストの文字列として保存する必要があります (JSON ブロブではありません)。Lambda 関数に必要な `secretsmanager:GetSecretValue` IAM 権限があることを確認してください。

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Lambda 関数にインスツルメンテーションを適用します。

    Lambda 関数をインスツルメントするには、次のコマンドを実行します。

    ```sh
    datadog-ci lambda instrument --appsec -f <functionname> -f <another_functionname> -r <aws_region> -e {{< latest-lambda-layer-version layer="extension" >}}
    

```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names.
    - Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

   **注**: まず、開発環境またはステージング環境で Lambda 関数にインスツルメンテーションを適用します。結果が満足できない場合は、同じ引数で `uninstrument` を実行して変更を元に戻してください。CLI が完了したら、App and API Protection を有効にするために、最新の `datadog-lambda-go` モジュールリリースに依存するようにソースコードを更新します。

    Additional parameters can be found in the [CLI documentation][2].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog CDK コンストラクト][1] は、Lambda レイヤーを使用して Datadog を関数に自動的にインストールし、Datadog Lambda 拡張機能を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

1. Datadog CDK コンストラクトライブラリをインストールします。

    ```sh
    npm install datadog-cdk-constructs-v2 --save-dev
    ```

2. Lambda 関数をインスツルメントします。

    ```typescript
    import { Datadog, DatadogAppSecMode } from "datadog-cdk-constructs-v2";

    const datadog = new Datadog(this, "Datadog", {
        extension_layer_version: {{< latest-lambda-layer-version layer="extension" >}},
        site: \"<DATADOG_SITE>\",
        api_key_secret_arn: "<DATADOG_API_KEY_SECRET_ARN>", // or api_key
        enable_asm: true,
        datadog_app_sec_mode: DatadogAppSecMode.ON,
      });
    datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>]);
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (右側で正しいサイトが選択されていることを確認してください)。
    - `<DATADOG_API_KEY_SECRET_ARN>` を、[Datadog API キー][2]が安全に保存されている AWS シークレットの ARN に置き換えてください。キーはプレーンテキストの文字列として保存する必要があります (JSON ブロブではありません)。`secretsmanager:GetSecretValue` の権限が必要です。迅速なテストのために、代わりに `apiKey` を使用し、Datadog API キーをプレーンテキストで設定できます。

    More information and additional parameters can be found on the [Datadog CDK documentation][1].

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "カスタム" %}}

1. 最新の Go トレーサーを使用するように関数コードを更新します。
   ```sh
   go get -u github.com/DataDog/datadog-lambda-go
   ```

2. 以下のいずれかの形式の ARN を使用して、Lambda 関数のレイヤーを設定し、Datadog Lambda Extension をインストールします。`<AWS_REGION>`を、`us-east-1` のような有効な AWS リージョンに置き換えてください。
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # AWS 商用リージョンの arm64 ベースの Lambda
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   # AWS GovCloud リージョンの x86 ベースの Lambda
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # AWS GovCloud リージョンの arm64 ベースの Lambda
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   ```

3. Enable App and API Protection by adding the following environment variables on your function deployment:
   ```yaml
   environment:
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```

4. 関数を再デプロイし、呼び出します。数分後、[App and API Protection ビュー][1]に表示されます。
[1]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
[5]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/plugin/#configuration-parameters
[6]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[7]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[8]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
[9]: https://github.com/DataDog/datadog-cdk-constructs
[10]: https://app.datadoghq.com/organization-settings/api-keys