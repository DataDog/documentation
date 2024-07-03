---
aliases:
- /ja/serverless/datadog_lambda_library/ruby/
- /ja/serverless/installation/ruby
further_reading:
- link: serverless/datadog_lambda_library/ruby
  tag: Documentation
  text: Datadog Lambda Library for Ruby
- link: serverless/distributed_tracing/
  tag: Documentation
  text: Tracing Serverless Applications
- link: serverless/custom_metrics/
  tag: Documentation
  text: Submitting Custom Metrics from Serverless Applications
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentation
  text: Troubleshoot Serverless Monitoring
title: Instrumenting Ruby Serverless Applications
---

<div class="alert alert-warning">以前に Datadog Forwarder を使用して Lambda 関数をセットアップした場合は、<a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_ruby">Datadog Forwarder を使用したインスツルメント</a>を参照してください。それ以外の場合は、このガイドの指示に従って、Datadog Lambda 拡張機能を使用してインスツルメンテーションを行います。</div>

<div class="alert alert-warning">If your Lambda functions are deployed in VPC without access to the public internet, you can send data either <a href="/agent/guide/private-link/">using AWS PrivateLink</a> for the <code>datadoghq.com</code> <a href="/getting_started/site/">Datadog site</a>, or <a href="/agent/configuration/proxy/">using a proxy</a> for all other sites.</div>

## インストール

Datadog は、サーバーレスアプリケーションのインスツルメンテーションを有効にするためのさまざまな方法を提供しています。以下からニーズに合った方法を選択してください。Datadog では、一般的に Datadog CLI の使用を推奨しています。アプリケーションがコンテナイメージとしてデプロイされる場合は、「コンテナイメージ」の指示に従うことが*必要です*。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI は、既存の Lambda 関数のコンフィギュレーションを修正し、新しいデプロイを必要とせずにインスツルメンテーションを可能にします。Datadog のサーバーレスモニタリングをすばやく開始するための最適な方法です。

1. Lambda 関数を構成する

   Datadog APM を有効にし、Datadog Lambda ライブラリが提供するラッパーを使用して Lambda ハンドラー関数をラップします。

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

2. Datadog CLI クライアントをインストールする

    ```sh
    npm install -g @datadog/datadog-ci
    ```

3. Datadog サーバーレスモニタリングに慣れていない場合は、クイックスタートとして最初のインストールを導くためにインタラクティブモードで Datadog CLI を起動し、残りのステップを無視することができます。本番アプリケーションに Datadog を恒久的にインストールするには、このステップをスキップし、残りのステップに従って通常のデプロイの_後に_ CI/CD パイプラインで Datadog CLI コマンドを実行します。

    ```sh
    datadog-ci lambda instrument -i
    ```

4. AWS の認証情報を構成する

   Datadog CLI は、AWS Lambda サービスへのアクセスを必要とし、AWS JavaScript SDK に依存して[資格情報を解決][1]します。AWS CLI を呼び出すときに使用するのと同じ方法を使用して、AWS の資格情報が構成されていることを確認します。

5. Datadog サイトを構成する

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

   `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。(右側で正しい SITE が選択されていることを確認してください)。

6. Datadog API キーを構成する

   Datadog は、セキュリティと簡単なローテーションのために、AWS Secrets Manager に Datadog API キーを保存することを推奨します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。Lambda 関数に必要な `secretsmanager:GetSecretValue` IAM 権限があることを確認します。

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

   迅速なテスト目的のために、Datadog API キーをプレーンテキストで設定することも可能です。

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

7. Lambda 関数をインスツルメントする

   **注**: Lambda 関数は、まず開発環境またはステージング環境でインスツルメントしてください。インスツルメンテーションの結果が思わしくない場合は、同じ引数で `uninstrument` を実行し、変更を元に戻してください。

   Lambda 関数をインスツルメントするには、次のコマンドを実行します。

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="ruby" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
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

1. Lambda 関数を構成する

   Datadog APM を有効にし、Datadog Lambda ライブラリが提供するラッパーを使用して Lambda ハンドラー関数をラップします。

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

2. Datadog サーバーレスプラグインをインストールします。

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

3. `serverless.yml` を更新します:

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
{{% tab "Container Image" %}}

1. Datadog Lambda ライブラリのインストール

   Lambda 関数をコンテナイメージとしてデプロイする場合は、Datadog Lambda ライブラリを Lambda レイヤーとして使用できません。代わりに、イメージ内に Datadog Lambda とトレーシングライブラリをパッケージ化する必要があります。

   Gemfile に下記を追加します。

    ```Gemfile
    gem 'datadog-lambda'
    gem 'ddtrace'
    ```

   `ddtrace` は、Amazon Linux が AWS Lambda で動作するためにコンパイルする必要があるネイティブ拡張機能を含んでいます。

   お使いの関数の Dockerfile で `bundle install` を実行する前に、`gcc`、`gmp-devel`、`make` をインストールし、ネイティブ拡張機能を正常にコンパイルします。

    ```dockerfile
    FROM <base image>

    # assemble your container image

    RUN yum -y install gcc gmp-devel make
    RUN bundle config set path 'vendor/bundle'
    RUN bundle install
    ```

2. Datadog Lambda 拡張機能のインストール

   Dockerfile に以下を追加して、Datadog Lambda 拡張機能をコンテナイメージに追加します。

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

   `<TAG>` を特定のバージョン番号 (例えば `{{< latest-lambda-layer-version layer="extension" >}}`) または `latest` に置き換えてください。Alpine も特定のバージョン番号 (例えば `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) または `latest-alpine` でサポートされています。[Amazon ECR リポジトリ][1]で、使用可能なタグの完全なリストを見ることができます。

3. Lambda 関数を構成する

   Datadog APM を有効にし、Datadog Lambda ライブラリが提供するラッパーを使用して Lambda ハンドラー関数をラップします。

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

4. Datadog サイトと API キーの構成

    - 環境変数 `DD_SITE` に {{< region-param key="dd_site" code="true" >}} を設定します。(右側で正しい SITE が選択されていることを確認してください)。
    - 環境変数 `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][3]が安全に保存されている AWS シークレットの ARN で設定します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Custom" %}}

<div class="alert alert-info">Serverless Framework などの Datadog をサポートするサーバーレス開発ツールを使用していない場合は、Datadog はお使いのサーバーレスアプリケーションを <a href="./?tab=datadogcli">Datadog CLI</a> でインスツルメントすることを強く推奨します。</div>

1. Datadog Lambda ライブラリのインストール

   Datadog Lambda ライブラリは、レイヤーまたは gem としてインストールできます。Datadog では、ほとんどの関数でライブラリをレイヤーとしてインストールすることを推奨しています。お使いの Lambda 関数がコンテナイメージとしてデプロイされている場合は、ライブラリを gem としてインストールする必要があります。

   `datadog-lambda` gem のマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、datadog-lambda v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致します。

    - オプション A: 以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

      ```sh
      # Use this format for x86-based Lambda deployed in AWS commercial regions

      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="ruby" >}}

      # Use this format for arm64-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="ruby" >}}


      # Use this format for x86-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="ruby" >}}

      # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="ruby" >}}
      ```

      Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`. The available `RUNTIME` options are `Ruby2-7`, and `Ruby3-2`.

    - Option B: If you cannot use the prebuilt Datadog Lambda layer, alternatively you can install the gems `datadog-lambda` and `ddtrace` by adding them to your Gemfile as an alternative:

      ```Gemfile
      gem 'datadog-lambda'
      gem 'ddtrace'
      ```

      `ddtrace` contains native extensions that must be compiled for Amazon Linux to work with AWS Lambda. Datadog therefore recommends that you build and deploy your Lambda as a container image. If your function cannot be deployed as a container image and you would like to use Datadog APM, Datadog recommends installing the Lambda Library as a layer instead of as a gem.

      Install `gcc`, `gmp-devel`, and `make` prior to running `bundle install` in your function's Dockerfile to ensure that the native extensions can be successfully compiled.

      ```dockerfile
      FROM <base image>

      # assemble your container image

      RUN yum -y install gcc gmp-devel make
      RUN bundle config set path 'vendor/bundle'
      RUN bundle install
      ```

2. Datadog Lambda 拡張機能のインストール

    - オプション A: 以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

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

    - オプション B: Dockerfile に以下を追加して、Datadog Lambda 拡張機能をコンテナイメージに追加します。

      ```dockerfile
      COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
      ```

      `<TAG>` を特定のバージョン番号 (たとえば `{{< latest-lambda-layer-version layer="extension" >}}`) または `latest` に置き換えます。利用可能なタグのリストは、[Amazon ECR リポジトリ][2]で確認できます。

3. Lambda 関数を構成する

   Datadog APM を有効にし、Datadog Lambda ライブラリが提供するラッパーを使用して Lambda ハンドラー関数をラップします。

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

4. Datadog サイトと API キーの構成

    - 環境変数 `DD_SITE` に {{< region-param key="dd_site" code="true" >}} を設定します。(右側で正しい SITE が選択されていることを確認してください)。
    - 環境変数 `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][3]が安全に保存されている AWS シークレットの ARN で設定します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://gallery.ecr.aws/datadog/lambda-extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## 次のステップ

- [Serverless Homepage][4] でメトリクス、ログ、トレースを見ることができるようになりました。
- サービスを標的にしている攻撃者についてアラートを受け取るには、[脅威の監視][9]を有効にします。
- [カスタムビジネスロジックの監視](#monitor-custom-business-logic)のサンプルコードを参照してください
- テレメトリーの収集に問題がある場合は、[トラブルシューティングガイド][5]を参照してください
- [高度な構成][6]を参照して以下のことを行ってください。
    - タグを使ったテレメトリー接続
    - Amazon API Gateway、SQS などのテレメトリーを収集する
    - Lambda のリクエストとレスポンスのペイロードを取得する
    - Lambda 関数のエラーをソースコードにリンクする
    - ログまたはトレースから機密情報をフィルタリングまたはスクラブする

### カスタムビジネスロジックの監視

カスタムビジネスロジックを監視するには、以下のサンプルコードを使用してカスタムメトリクスまたはスパンを送信します。その他のオプションについては、[サーバーレスアプリケーションのためのカスタムメトリクスの送信][7]および[カスタムインスツルメンテーション][8]のための APM ガイドを参照してください。

```ruby
require 'ddtrace'
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# インスツルメンテーションを有効にします
end

def handler(event:, context:)
    # Datadog ラッパーを適用します
    Datadog::Lambda::wrap(event, context) do
        # Lambda 関数スパンにカスタムタグを追加します
        # X-Ray トレーシングが有効になっている場合は機能しません
        current_span = Datadog::Tracing.active_span
        current_span.set_tag('customer.id', '123456')

        some_operation()

        Datadog::Tracing.trace('hello.world') do |span|
          puts "Hello, World!"
        end

        # カスタムメトリクスを送信します
        Datadog::Lambda.metric(
          'coffee_house.order_value', # メトリクス名
          12.45, # メトリクス値
          time: Time.now.utc, # オプション、過去 20 分以内である必要があります
          "product":"latte", # タグ
          "order":"online" # タグ
        )
    end
end

# 関数をインスツルメントします
def some_operation()
    Datadog::Tracing.trace('some_operation') do |span|
        # ここで何かをします
    end
end
```

カスタムメトリクス送信の詳細については、[Serverless Custom Metrics][7] を参照してください。カスタムインスツルメンテーションの詳細については、[カスタムインスツルメンテーション][8]の Datadog APM ドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/serverless/forwarder/
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[4]: https://app.datadoghq.com/functions
[5]: /ja/serverless/guide/troubleshoot_serverless_monitoring/
[6]: /ja/serverless/configuration
[7]: /ja/serverless/custom_metrics?tab=ruby
[8]: /ja/tracing/custom_instrumentation/ruby/
[9]: /ja/security/application_security/enabling/serverless/?tab=serverlessframework