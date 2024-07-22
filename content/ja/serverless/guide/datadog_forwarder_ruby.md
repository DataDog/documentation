---
title: Datadog Forwarder を使用した Ruby サーバーレスアプリケーションのインスツルメンテーション
---

## 概要

<div class="alert alert-warning">
Datadog Serverless の新規ユーザーの場合、代わりに <a href="/serverless/installation/ruby">Datadog Lambda Extension を使用して Lambda 関数をインスツルメントする手順</a>に従ってください。Lambda がすぐに使える機能を提供する前に、Datadog Forwarder で Datadog Serverless をセットアップした場合は、このガイドを使用してインスタンスを維持してください。
</div>

## 前提条件

[Datadog Forwarder Lambda 関数][1]は、AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要です。

## コンフィギュレーション

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI は、既存の Lambda 関数のコンフィギュレーションを修正し、新しいデプロイを必要とせずにインスツルメンテーションを可能にします。Datadog のサーバーレスモニタリングをすばやく開始するための最適な方法です。

CI/CD パイプラインにコマンドを追加してすべてのサーバーレスアプリケーションにインスツルメンテーションを有効化することも可能です。Datadog CLI コマンドによる変更が上書きされないよう、通常のサーバーレスアプリケーションのデプロイ*後*にコマンドを実行します。

### Install

NPM または Yarn を使用して Datadog CLI をインストールします。

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### インスツルメントする

関数をインスツルメントするには、[AWS 資格情報][1]を使用して次のコマンドを実行します。

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> --forwarder <forwarder_arn>
```

関数をインスツルメントするには、AWS CDK アプリの `Stack` オブジェクトに `DatadogServerless` 変換と `CfnMapping` を追加します。以下の Python のサンプルコードを参照してください (他の言語での使用方法も同様です)。
- `<functionname>` と `<another_functionname>` を Lambda 関数名に置き換えます。
- `<aws_region>` を AWS リージョン名に置き換えます。
- `<layer_version>` を目的のバージョンの Datadog Lambda ライブラリに置き換えます。最新バージョンは `{{< latest-lambda-layer-version layer="ruby" >}}` です。
- `<forwarder_arn>` を Forwarder ARN に置き換えます ([Forwarder のドキュメント][2]を参照)。

例:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v {{< latest-lambda-layer-version layer="ruby" >}} --forwarder "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
```

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog CLI でインスツルメントするには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名構成][4]に追加する必要があります。

[CLI のドキュメント][3]に詳細と追加のパラメーターがあります。

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Plugin][1] は、レイヤーを使用して Datadog Lambda ライブラリを関数に自動的に追加し、[Datadog Forwarder][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog Serverless Plugin をインストールする前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名構成][3]に追加する必要があります。

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
        forwarderArn: # The Datadog Forwarder ARN goes here.
    ```
   Datadog Forwarder ARN またはインストールの詳細については、[こちら][2]を参照してください。追加の設定については、[プラグインのドキュメント][1]を参照してください。


[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Custom" %}}

### インストール

Datadog Lambda ライブラリは、レイヤーまたは gem としてインストールできます。Datadog では、ほとんどの関数でライブラリをレイヤーとしてインストールすることを推奨しています。お使いの Lambda 関数がコンテナイメージとしてデプロイされている場合は、ライブラリを gem としてインストールする必要があります。

`datadog-lambda` gem のマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、datadog-lambda v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致します。

#### レイヤーの使用

以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

```
# us、us3、us5、eu リージョンの場合
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# 米国政府リージョンの場合
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

使用できる `RUNTIME` オプションは、`Ruby2-7` と `Ruby3-2` です。最新の `VERSION` は `{{< latest-lambda-layer-version layer="ruby" >}}` です。例:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Ruby3-2:{{< latest-lambda-layer-version layer="ruby" >}}
```

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog Lambda ライブラリをレイヤーとして追加するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名構成][4]に追加する必要があります。

#### Gem の使用

構築済みの Datadog Lambda レイヤーを使用できない場合、代替として以下を Gemfile に追加することができます。

```Gemfile
gem 'datadog-lambda'
gem 'ddtrace'
```

`ddtrace` には、AWS Lambda で動作するよう Amazon Linux 用にコンパイルする必要のあるネイティブ拡張機能が含まれています。そのため、Datadog では Lambda をコンテナイメージとして構築しデプロイすることを推奨しています。AWS Lambda を使用するが関数をコンテナイメージとしてデプロイできない、という場合は、Lambda ライブラリを gem ではなくレイヤーとしてインストールすることをお勧めします。

お使いの関数の Dockerfile で `bundle install` を実行する前に、`gcc`、`gmp-devel`、`make` をインストールし、ネイティブ拡張機能を正常にコンパイルします。

```dockerfile
FROM <base image>

# コンテナイメージをアセンブル

RUN yum -y install gcc gmp-devel make
RUN bundle config set path 'vendor/bundle'
RUN bundle install
```

### 構成

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

関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブします。これにより、メトリクス、トレース、ログを Datadog へ送信できるようになります。

1. [まだの場合は、Datadog Forwarder をインストールします][2]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][3]。


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{< /tabs >}}

### タグ

オプションではありますが、Datadog では以下の[統合サービスタグ付けのドキュメント][2]に従いサーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けすることをお勧めします。

## 確認

以上の方法で関数を構成すると、[Serverless Homepage][3] でメトリクス、ログ、トレースを確認できるようになります。

### カスタムビジネスロジックの監視

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

カスタムメトリクス送信の詳細については、[Serverless Custom Metrics][4] を参照してください。カスタムインスツルメンテーションの詳細については、[カスタムインスツルメンテーション][5]の Datadog APM ドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/serverless/forwarder
[2]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[3]: https://app.datadoghq.com/functions
[4]: /ja/serverless/custom_metrics?tab=ruby
[5]: /ja/tracing/custom_instrumentation/ruby/