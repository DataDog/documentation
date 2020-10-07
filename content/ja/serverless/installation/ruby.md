---
title: Ruby アプリケーションのインスツルメント
kind: ドキュメント
further_reading:
  - link: serverless/installation/node
    tag: Documentation
    text: Node.js サーバーレスモニタリングのインストール
  - link: serverless/installation/ruby
    tag: Documentation
    text: Ruby サーバーレスモニタリングのインストール
---
[AWS インテグレーション][1]と [Datadog Forwarder][2] をインストールしたら、以下のいずれかの方法を選択してアプリケーションをインスツルメントし、Datadog にメトリクス、ログ、トレースを送信します。

## 構成

### Datadog Lambda ライブラリのインストール

Datadog Lambda ライブラリは、レイヤーまたは gem としてインポートすることができます。

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

#### Gem の使用

次の行を Gemfile に追加します。[最新リリース][5]をご覧ください。

```
gem 'datadog-lambda'
gem 'ddtrace'
```

`ddtrace` はパッケージ化されて Lambda にアップロードされる前に Amazon Linux 用にコンパイルする必要があるネイティブ拡張機能を使用することに注意してください。このため、レイヤーの使用をお勧めします。

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][2]。
2. [DdFetchLambdaTags のオプションが有効であることを確認します][6]。
3. [Datadog Forwarder を関数のロググループにサブスクライブします][7]。

## Datadog サーバーレスモニタリングの利用

以上の方法で関数を構成すると、[Serverless Homepage][8] でメトリクス、ログ、トレースを確認できるようになるはずです。

### カスタムビジネスメトリクスの監視

カスタムメトリクスの送信または関数の手動インスツルメントをご希望の場合は、以下のコード例をご参照ください。

```ruby
require 'ddtrace'
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# インスツルメンテーションを有効にします
end

def handler(event:, context:)
    # Datadog ラッパーを適用します
    Datadog::Lambda::wrap(event, context) do
        some_operation()
        # カスタムメトリクスを送信します
        Datadog::Lambda.metric(
            'coffee_house.order_value', # metric name
            12.45, # metric value
            "product":"latte", # タグ
            "order":"online" # 別のタグ
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
[カスタムメトリクスの送信を有効化][3]してはじめます。

### AWS X-Ray インテグレーションを有効にする

Datadog の AWS X-Ray インテグレーションはエンドツーエンドのサーバーレストランザクションを可視化します。発生したエラーや遅延に的を絞り、関数のパフォーマンスがユーザーエクスペリエンスにどう影響しているかを確認することができます。言語とコンフィギュレーションに応じて、[Datadog APM または AWS X-Ray インテグレーションの中から選択][5]してトレースを実行してください。 

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="AWS Lambda を Datadog でトレースするためのアーキテクチャダイアグラム" >}}

[1]: /ja/serverless/#1-install-the-cloud-integration
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[4]: https://github.com/DataDog/datadog-lambda-layer-rb/releases
[5]: https://rubygems.org/gems/datadog-lambda
[6]: https://docs.datadoghq.com/ja/serverless/forwarder/#experimental-optional
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://app.datadoghq.com/functions
[9]: /ja/serverless/custom_metrics
[10]: /ja/serverless/distributed_tracing