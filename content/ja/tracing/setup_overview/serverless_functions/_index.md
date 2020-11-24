---
title: サーバーレス関数のトレース
kind: documentation
description: サーバーレス関数からトレースを Datadog へ送信する
aliases:
  - /ja/tracing/serverless_functions
further_reading:
  - link: サーバーレス
    text: Datadog でのサーバーレスモニタリング
---
{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="トレースサーバーレス関数"  style="width:100%;">}}

ハイブリッドアーキテクチャでは、サーバーレス関数がアプリケーションにおいて重要な役割を果たします。分散型システムでのパフォーマンスボトルネックとサービス障害を検知するためには、分散型トレースでこれらの関数を利用することが不可欠です。

## トレーシングライブラリを選択する

言語設定とコンフィギュレーションに応じて、トレースにDatadog APM か AWS X-Ray のどちらを設定するかを選択してください。それぞれの行のヘッダーにあるリンクをクリックして、お使いの環境に応じた設定手順をご確認ください。

| [Datadog APM][1]          | [AWS X-Ray][2]                                                        |
|---------------------------------|-------------------------------------------------------------------------|
| Datadog APM のインテグレーションライブラリを使用してエンドツーエンドのトレーシングを行います。  | AWS X-Ray からトレースを取得します。|
| 開発ツールを使用して、サーバーレスフレームワークと AWS SAM インテグレーションのコードを変更せずに設定を行います。 | AWS X-Ray クライアントライブラリを Lambda ランタイムにインストールします。 |
| Python、Node.js、Ruby をサポートしています。 |  すべての Lambda ランタイムをサポートしています。 |

## Datadog APM を使用した AWS X-Ray トレーシングの増強

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="AWS Lambda を Datadog でトレースするためのアーキテクチャダイアグラム" >}}

AWS X-Ray トレーシングと Datadog APM の_双方_を構成することも可能ですが、使用料が高額になる可能性があります。この場合のセットアップ手順は以下のとおりです。

- [サーバーレス環境でのトレーシング](#tracing-in-a-serverless-first-environment)
- [AWS Lambda とホスト全体のトレース](#tracing-across-aws-lambda-and-hosts)

#### サーバーレス環境でのトレーシング

AWS X-Ray はバックエンド AWS サービスとクライアントライブラリの両方を提供します。バックエンド AWS サービスのみを有効にすると、お使いの AWS Lambda 関数および Amazon API Gateway、メッセージキュー全体のトレースに呼び出し用のスパンを生成します。

AWS X-Ray と Datadog APM の両クライアントライブラリは、コード内のインテグレーションをトレースします。AWS X-Ray クライアントライブラリの代わりに Datadog APM クライアントライブラリを使用してトレース作業とそのトレースの可視化を行っている場合は、以下の 2 つのステップを実施してください。

1. Lambda 関数のトレースができるよう、[AWS X-Ray インテグレーション][2]を有効にします。
2. Lambda 関数で [Datadog APM を設定][1]します。
3. AWS X-Ray インテグレーションおよび Datadog APM により生成されたトレースをマージします。


{{< tabs >}}
{{% tab "Node.js" %}}
```javascript
module.exports.hello = datadog(
    (event, context, callback) => {
        longCalculation();

        callback(null, {
            statusCode: 200,
            body: 'Hello from serverless!'
        });
    },
    { mergeDatadogXrayTraces: true }
);
```
{{% /tab %}}

{{% tab "Python" %}}

Lambda 関数で `DD_MERGE_XRAY_TRACES` 環境変数を `True` に設定します。

{{% /tab %}}

{{% tab "Ruby" %}}

Lambda 関数で `DD_MERGE_DATADOG_XRAY_TRACES` 環境変数を `True` に設定します。

{{% /tab %}}

{{< /tabs >}}

#### AWS Lambda とホスト全体のトレース

該当する場合、Datadog は AWS X-Ray トレースをネイティブ Datadog APM トレースとマージします。これにより、AWS Lambda、コンテナ、オンプレミスホスト、マネージドサービスなど、インフラストラクチャーの境界を越えるリクエストの全体像がトレースに表示されることになります。

1. Lambda 関数のトレースができるよう、[AWS X-Ray インテグレーション][2]を有効にします。
2. ホストおよびコンテナベースのインフラストラクチャーで [Datadog APM をセットアップ][3]します。

**注**: 分散型トレーシングはホストまたはコンテナベースアプリケーションにおけるすべてのランタイムでサポートされています。

**注**: X-Ray と Datadog APM トレースを同じフレームグラフに表示するには、すべてのサービスに[同じ `env` タグ](#the-env-tag)が必要です。

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="ホストから Lambda 関数へのリクエストのトレース" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/
[2]: /ja/tracing/guide/serverless_enable_aws_xray/
[3]: /ja/tracing/send_traces/