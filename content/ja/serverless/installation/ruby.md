---
aliases:
- /ja/serverless/datadog_lambda_library/ruby/
further_reading:
- link: serverless/datadog_lambda_library/ruby
  tag: Documentation
  text: Ruby 向け Datadog Lambda ライブラリ
- link: serverless/distributed_tracing/
  tag: Documentation
  text: サーバーレスアプリケーションのトレース
- link: serverless/custom_metrics/
  tag: Documentation
  text: サーバーレスアプリケーションからのカスタムメトリクスの送信
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: ドキュメント
  text: サーバーレスモニタリングのトラブルシューティング
kind: ドキュメント
title: Ruby サーバーレスアプリケーションのインスツルメンテーション
---

## 前提条件

[Datadog Forwarder Lambda 関数][1]は、AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要です。

## コンフィギュレーション

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI は、既存の Lambda 関数のコンフィギュレーションを修正し、新しいデプロイを必要とせずにインスツルメンテーションを可能にします。Datadog のサーバーレスモニタリングをすばやく開始するための最適な方法です。

CI/CD パイプラインに[インスツルメンテーションコマンド](#instrument)を追加してすべてのサーバーレスアプリケーションにインスツルメンテーションを有効化することも可能です。Datadog CLI コマンドによる変更が上書きされないよう、通常のサーバーレスアプリケーションのデプロイ_後_にコマンドを実行します。

### Install

NPM を使用して Datadog CLI をインストールします。

```sh
npm install -g @datadog/datadog-ci
```

### 資格情報を構成する

クイックスタートとして、[インスツルメンテーションコマンド](#instrument)を使用して Datadog と [AWS の資格情報][1]を構成します。本番アプリケーションでは、環境変数を使用して、より安全な方法で資格情報を提供します。例えば、以下のようになります。

```bash
export DATADOG_API_KEY="<DD_API_KEY>"
export DATADOG_SITE="<DD_SITE>" # datadoghq.com、datadoghq.eu、us3.datadoghq.com、ddog-gov.com など
export AWS_ACCESS_KEY_ID="<ACCESS KEY ID>"
export AWS_SECRET_ACCESS_KEY="<ACCESS KEY>"
```

### インスツルメントする

**注**: Lambda 関数は、まず開発環境またはステージング環境でインスツルメントしてください。インスツルメンテーションを元に戻す必要がある場合は、インスツルメンテーションに使用したものと同じ引数で `uninstrument` を実行します。

Lambda 関数をインスツルメントするには、次のコマンドを実行します。

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -e <extension_version>
```

関数をインスツルメントするには、AWS CDK アプリの `Stack` オブジェクトに `DatadogServerless` 変換と `CfnMapping` を追加します。以下の Python のサンプルコードを参照してください (他の言語での使用方法も同様です)。

-   `<functionname>` と `<another_functionname>` を Lambda 関数名に置き換えます。
-   `<aws_region>` を AWS リージョン名に置き換えます。
-   `<extension_version>` を目的のバージョンの Datadog Lambda 拡張機能に置き換えます。最新バージョンは `{{< latest-lambda-layer-version layer="extension" >}}` です。

例:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -e {{< latest-lambda-layer-version layer="extension" >}}
```

[CLI のドキュメント][2]に詳細と追加のパラメーターがあります。

### Lambda ライブラリのインストール

Datadog Lambda ライブラリは、レイヤーまたは gem としてインストールできます。Datadog では、ほとんどの関数でライブラリをレイヤーとしてインストールすることを推奨しています。お使いの Lambda 関数がコンテナイメージとしてデプロイされている場合は、ライブラリを gem としてインストールする必要があります。

`datadog-lambda` gem のマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、datadog-lambda v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致します。

#### レイヤーの使用

以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][3]します。

```
# 商用リージョンの場合
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}

# 米国政府リージョンの場合
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}
```

例:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}
```

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog Lambda ライブラリをレイヤーとして追加するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][4]に追加する必要があります。
#### Gem の使用

Gemfile に下記を追加します。

```Gemfile
gem 'datadog-lambda'
```

Datadog APM を使用するには、Gemfile で `ddtrace` を 2 番目の依存関係として追加する必要があります。

```Gemfile
gem 'datadog-lambda'
gem 'ddtrace'
```

`ddtrace` には、AWS Lambda で動作するよう Amazon Linux 用にコンパイルする必要のあるネイティブ拡張機能が含まれています。そのため、Datadog では Lambda をコンテナイメージとして構築しデプロイすることを推奨しています。AWS Lambda を使用するが関数をコンテナイメージとしてデプロイできない、という場合は、Lambda ライブラリを gem ではなくレイヤーとしてインストールすることをおすすめします。

お使いの関数の Dockerfile で `bundle install` を実行する前に、`gcc`、`gmp-devel`、`make` をインストールし、ネイティブ拡張機能を正常にコンパイルします。

```dockerfile
FROM <base image>

# コンテナイメージをアセンブル

RUN yum -y install gcc gmp-devel make
RUN bundle config set path 'vendor/bundle'
RUN bundle install
```

[1]: https://docs.aws.amazon.com/sdk-for-ruby/v3/developer-guide/setup-config.html
[2]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Plugin][1] は、[Datadog Lambda 拡張機能][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を自動的に構成します。

Datadog サーバーレスプラグインをインストールして構成するには、次の手順に従います。

1. Datadog サーバーレスプラグインをインストールします。
      ```sh
    npm install serverless-plugin-datadog --save-dev
    ```
2. `serverless.yml` に以下を追加します。
    ```yaml
    plugins:
      - serverless-plugin-datadog
    ```

<div class="alert alert-info">代わりに、<a href="https://www.serverless.com/framework/docs/providers/aws/guide/intro">JavaScript ファイルから JSON オブジェクトをネイティブにエクスポート</a>して (たとえば <code>serverless.ts</code> ファイルを使用して) Serverless Framework アプリをデプロイする場合は、<a href="https://docs.datadoghq.com/serverless/installation/ruby?tab=custom">カスタムインストール手順</a>に従います。</div>

3. `serverless.yml` に、以下のセクションも追加します。
    ```yaml
    custom:
      datadog:
        apiKey: # Your Datadog API Key goes here.
    ```
   Datadog API キーを [API Management ページ][3]で探します。追加の設定については、[プラグインのドキュメント][1]を参照してください。

#### レイヤーの使用

以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][4]します。

```
# 商用リージョンの場合
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="ruby" >}}

# 米国政府リージョンの場合
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="ruby" >}}
```

利用可能な `RUNTIME` は `Ruby2-7` です。例:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}
```

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog Lambda ライブラリをレイヤーとして追加するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][5]に追加する必要があります。``

`serverless.yml` に、各関数のレイヤーを追加します。
  ```yaml
  my-function:
    layers:
      - # lambda レイヤーはここに入れます。
  ```

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Custom" %}}
### Datadog Lambda 拡張機能のインストール

次の形式の ARN を使用して、Lambda 関数の Datadog Lambda 拡張機能レイヤーを追加します。

{{< site-region region="us,us3,eu" >}}
```
// x86 Lambda の場合
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```
// x86 Lambda の場合
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:<EXTENSION_VERSION>
```
{{< /site-region >}}

最新の `EXTENSION_VERSION` は {{< latest-lambda-layer-version layer="extension" >}} です。

### Lambda ライブラリのインストール

Datadog Lambda ライブラリは、レイヤーまたは gem としてインストールできます。Datadog では、ほとんどの関数でライブラリをレイヤーとしてインストールすることを推奨しています。お使いの Lambda 関数がコンテナイメージとしてデプロイされている場合は、ライブラリを gem としてインストールする必要があります。

`datadog-lambda` gem のマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、datadog-lambda v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致します。

#### レイヤーの使用

以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

```
# 商用リージョンの場合
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}

# 米国政府リージョンの場合
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}
```

例:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}
```

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog Lambda ライブラリをレイヤーとして追加するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][2]に追加する必要があります。
#### Gem の使用

Gemfile に下記を追加します。

```Gemfile
gem 'datadog-lambda'
```

Datadog APM を使用するには、Gemfile で `ddtrace` を 2 番目の依存関係として追加する必要があります。

```Gemfile
gem 'datadog-lambda'
gem 'ddtrace'
```

`ddtrace` には、AWS Lambda で動作するよう Amazon Linux 用にコンパイルする必要のあるネイティブ拡張機能が含まれています。そのため、Datadog では Lambda をコンテナイメージとして構築しデプロイすることを推奨しています。AWS Lambda を使用するが関数をコンテナイメージとしてデプロイできない、という場合は、Lambda ライブラリを gem ではなくレイヤーとしてインストールすることをおすすめします。

お使いの関数の Dockerfile で `bundle install` を実行する前に、`gcc`、`gmp-devel`、`make` をインストールし、ネイティブ拡張機能を正常にコンパイルします。

```dockerfile
FROM <base image>

# コンテナイメージをアセンブル

RUN yum -y install gcc gmp-devel make
RUN bundle config set path 'vendor/bundle'
RUN bundle install
```
[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{< /tabs >}}

### 関数の構成

Datadog APM を有効にし、Datadog Lambda ライブラリが提供するラッパーを使用して Lambda ハンドラー関数をラップします。

```ruby
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# インスツルメンテーションを有効にします
end

def handler(event:, context:)
    Datadog::Lambda.wrap(event, context) do
        return { statusCode: 200, body: 'Hello World' }
    end
end
```

### サブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブします。

1. [まだの場合は、Datadog Forwarder をインストールします][1]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][2]。

### タグ

オプションではありますが、Datadog では以下の[統合サービスタグ付けのドキュメント][3]に従いサーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けすることをお勧めします。

## 確認

以上の方法で関数を構成すると、[Serverless Homepage][4] でメトリクス、ログ、トレースを確認できるようになります。

## カスタムビジネスロジックの監視

カスタムメトリクスまたはスパンの送信をご希望の場合は、以下のコード例をご参照ください。

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

カスタムメトリクス送信の詳細については、[ここ][5]を参照してください。カスタムインスツルメンテーションの詳細については、[カスタムインスツルメンテーション][6]の Datadog APM ドキュメントを参照してください。

## トラブルシューティング

上記の手順で監視データを収集してもうまくいかない場合は、[サーバーレス監視のトラブルシューティングガイド][7]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/forwarder/
[2]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[3]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[4]: https://app.datadoghq.com/functions
[5]: /ja/serverless/custom_metrics?tab=ruby
[6]: /ja/tracing/custom_instrumentation/ruby/
[7]: /ja/serverless/guide/troubleshoot_serverless_monitoring/