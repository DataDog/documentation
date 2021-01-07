---
title: Ruby アプリケーションのインスツルメント
kind: ドキュメント
further_reading:
  - link: serverless/serverless_tagging/
    tag: Documentation
    text: サーバーレスアプリケーションのタグ付け
  - link: serverless/distributed_tracing/
    tag: Documentation
    text: サーバーレスアプリケーションのトレース
  - link: serverless/custom_metrics/
    tag: Documentation
    text: サーバーレスアプリケーションからのカスタムメトリクスの送信
---
## 必須セットアップ

未構成の場合:

- [AWS インテグレーション][1]をインストールします。これにより、Datadog は AWS から Lambda メトリクスを取り込むことができます。
- AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要な [Datadog Forwarder Lambda 関数][2]をインストールします。

[AWS インテグレーション][1]と [Datadog Forwarder][2] をインストールしたら、手順に従ってアプリケーションをインスツルメントし、Datadog にメトリクス、ログ、トレースを送信します。

## コンフィギュレーション

### Datadog Lambda ライブラリのインストール

Datadog Lambda ライブラリは、レイヤーまたは gem としてインストールできます。Datadog では、ほとんどの関数でライブラリをレイヤーとしてインストールすることを推奨しています。お使いの Lambda 関数がコンテナイメージとしてデプロイされている場合は、ライブラリを gem としてインストールする必要があります。

`datadog-lambda` gem のマイナーバージョンは、常にレイヤーのバージョンに一致します。例: datadog-lambda v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致。

#### レイヤーの使用

以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][3]します。

```
# 通常のリージョンの場合
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# 米国政府リージョンの場合
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

使用できる `RUNTIME` オプションは、`Ruby2-5` と `Ruby2-7` です。`VERSION` については、[最新リリース][4]を参照してください。例:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Ruby2-7:5
```

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog Lambda ライブラリをレイヤーとして追加するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][5]に追加する必要があります。

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

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][2]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][6]。

### 統合サービスタグ付け

これはオプションですが、Datadog は、[統合サービスタグ付けのドキュメント][7]に従って、サーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けすることを強くお勧めします。

## Datadog サーバーレスモニタリングの利用

以上の方法で関数を構成すると、[Serverless Homepage][8] でメトリクス、ログ、トレースを確認できるようになるはずです。

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
        current_span = Datadog.tracer.active_span
        current_span.set_tag('customer.id', '123456')

        some_operation()

        Datadog.tracer.trace('hello.world') do |span|
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
    Datadog.tracer.trace('some_operation') do |span|
        # ここで何かをします
    end
end
```

カスタムメトリクス送信の詳細については、[ここ][9]を参照してください。カスタムインスツルメンテーションの詳細については、[カスタムインスツルメンテーション][10]の Datadog APM ドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_web_services/
[2]: /ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[4]: https://github.com/DataDog/datadog-lambda-layer-rb/releases
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[6]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[8]: https://app.datadoghq.com/functions
[9]: /ja/serverless/custom_metrics?tab=ruby
[10]: /ja/tracing/custom_instrumentation/ruby/