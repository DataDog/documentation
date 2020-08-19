---
title: トレースサーバーレス関数
kind: ドキュメント
description: サーバーレス関数からトレースを Datadog へ送信する
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


## タグを使用したサーバーレスインフラストラクチャーの整理

AWS Lambda 関数に適用された[タグ][3]は、自動的に新しいディメンションになり、このディメンションでトレースを分類できます。

タグは Datadog プラットフォーム間の一貫性を確保するのに特に役立ちます。これらは、`env` および `service` タグの[ファーストクラスサポート][4]を備えています。

**注**: Datadog APM でトレースしている場合は、Datadog Forwarder CloudFormation Stack でパラメーター `DdFetchLambdaTags` を `true` に設定し、トレースが元の Lambda 関数のリソースタグにタグ付けされるようにします。Lambda 関数のリソースタグは、追加のコンフィギュレーションがなくても Datadog の X-Ray トレースに自動的に表示されます。

### env タグ

`env` を使用すると、ステージング、開発、および本番環境を分離できます。これは、サーバーレス関数だけでなく、あらゆる種類のインフラストラクチャーで機能します。たとえば、本番環境の EU Lambda 関数に `env:prod-eu` タグを付けることができます。

デフォルトでは、AWS Lambda 関数は Datadog で `env:none` でタグ付けされます。独自のタグを追加してこれをオーバーライドします。

### service タグ

関連する Lambda 関数を[サービス][5]にグループ化するために、 `service` [タグ][6]を追加します。[サービスマップ][5]と[サービス一覧画面][7]は、このタグを使用して、サービスとモニターのヘルスとの関係を示します。サービスは、サービスマップ上の個々のノードとして表されます。

デフォルトでは、各 Lambda 関数は独自の `service` として扱われます。独自のタグを追加してこれをオーバーライドします。

**注**: Datadog を初めてご利用になるお客様には、デフォルトですべての Lambda 関数は `aws.lambda` サービス下にグループ化され、サービスマップでは単一ノードとして表示されます。これをオーバーライドするには、`service` で関数をタグ付します。

{{< img src="integrations/amazon_lambda/animated_service_map.gif" alt="Lambda 関数のアニメーション化されたサービスマップ" >}}

## Datadog APM を使用した AWS X-Ray トレーシングの増強

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="AWS Lambda を Datadog でトレースするためのアーキテクチャダイアグラム" >}}

AWS X-Ray トレーシングと Datadog APM の_双方_を構成することも有用ですが、使用料が高額になる可能性があります。Datadog APM または AWS X-Ray のどちらを使用するかが明確でない場合は、[サポートチーム][8]にご相談ください。

両方の構成を行う場合の設定手順は以下よりご覧いただけます。

- [サーバーレス環境でのトレーシング](#tracing-in-a-serverless-first-environment)
- [AWS Lambda とホスト全体のトレース](#tracing-across-aws-lambda-and-hosts)

#### サーバーレス環境でのトレーシング

AWS X-Ray はバックエンド AWS サービスとクライアントライブラリの両方として機能し、お使いの AWS Lambda 関数と Amazon API Gateway、メッセージキュー全体のトレースに呼び出し用のスパンを生成します。

クライアントライブラリはコード内のインテグレーションをトレースします。AWS X-Ray クライアントライブラリの代わりに Datadog APM クライアントライブラリを使用してトレース作業とそのトレースの可視化を行っている場合は、以下の 2 つのステップを実施してください。

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
2. ホストおよびコンテナベースのインフラストラクチャーで [Datadog APM をセットアップ][9]します。

**注**: 分散型トレーシングはホストまたはコンテナベースアプリケーションにおけるすべてのランタイムでサポートされています。

**注**: X-Ray と Datadog APM トレースを同じフレームグラフに表示するには、すべてのサービスに[同じ `env` タグ](#the-env-tag)が必要です。

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="ホストから Lambda 関数へのリクエストのトレース" >}}


[1]: /ja/serverless/
[2]: /ja/tracing/serverless_functions/enable_aws_xray/
[3]: /ja/getting_stared/tagging/
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: /ja/tracing/visualization/services_map/#the-service-tag
[6]: /ja/tracing/visualization/#services
[7]: /ja/tracing/visualization/services_list/
[8]: /ja/help
[9]: /ja/tracing/send_traces/