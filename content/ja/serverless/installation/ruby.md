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

## インストール

1. Datadog Lambda ライブラリのインストール

   Datadog Lambda ライブラリは、レイヤーまたは gem としてインストールできます。Datadog では、ほとんどの関数でライブラリをレイヤーとしてインストールすることを推奨しています。お使いの Lambda 関数がコンテナイメージとしてデプロイされている場合は、ライブラリを gem としてインストールする必要があります。

   `datadog-lambda` gem のマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、datadog-lambda v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致します。

    - オプション A: 以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][2]します。

{{< site-region region="us,us3,us5,eu,gov" >}}
      ```
      # 通常のリージョンの場合
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}

      # us-gov リージョンの場合
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}
      ```
{{< /site-region >}}

{{< site-region region="ap1" >}}
      ```
      # 通常のリージョンの場合
      arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}

      # us-gov リージョンの場合
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}
      ```
{{< /site-region >}}

      `<AWS_REGION>` は、`us-east-1` のように有効な AWS リージョンに置き換えてください。

    - オプション B: 構築済みの Datadog Lambda レイヤーを使用できない場合、代替案として以下を Gemfile に追加することができます。

      ```Gemfile
      gem 'datadog-lambda'
      gem 'ddtrace'
      ```

      `ddtrace` にはネイティブ拡張機能が含まれており、AWS Lambda で動作させるためには Amazon Linux でコンパイルする必要があります。そのため、Datadog は Lambda をコンテナイメージとしてビルドし、デプロイすることを推奨しています。関数をコンテナイメージとしてデプロイできず、Datadog APM を使用したい場合、Datadog は Lambda ライブラリを gem としてではなく、レイヤーとしてインストールすることを推奨しています。

      ネイティブ拡張機能が正常にコンパイルできるように、関数の Dockerfile で `bundle install` を実行する前に、`gcc`、`gmp-devel`、`make` をインストールしておいてください。

      ```dockerfile
      FROM <base image>

      # コンテナイメージを組み立てる

      RUN yum -y install gcc gmp-devel make
      RUN bundle config set path 'vendor/bundle'
      RUN bundle install
      ```

2. Lambda 関数を構成する

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

3. Datadog Forwarder をロググループにサブスクライブ

   メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブします。

    1. [まだの場合は、Datadog Forwarder をインストールします][1]。
    2. [Datadog Forwarder を関数のロググループにサブスクライブします][3]。


## 次のステップ

- [Serverless Homepage][4] でメトリクス、ログ、トレースを見ることができるようになりました。
- [カスタムビジネスロジックの監視](#monitor-custom-business-logic)のサンプルコードを参照してください
- テレメトリーの収集に問題がある場合は、[トラブルシューティングガイド][5]を参照してください
- [高度な構成][6]を参照して以下のことを行ってください。
    - タグを使ったテレメトリー接続
    - AWS API Gateway、SQS などのテレメトリーを収集する
    - Lambda のリクエストとレスポンスのペイロードを取得する
    - Lambda 関数のエラーをソースコードにリンクする
    - ログまたはトレースから機密情報をフィルタリングまたはスクラブする

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