---
title: サーバーレスでのトレースのマージ
kind: documentation
description: Datadog APM を使用した AWS X-Ray トレーシングの増強
further_reading:
  - link: サーバーレス
    text: Datadog でのサーバーレスモニタリング
---
{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="トレースのサーバーレス関数"  style="width:100%;" >}}

## ユースケース

サーバーレスでのトレースのマージには、アプリケーションで Datadog のトレーシングライブラリ (`dd-trace`) と AWS X-Ray トレーシングライブラリの両方を構成するときに単一の接続済みトレースを確認する必要があります。使用するトレーシングライブラリがわからない場合は、[トレーシングライブラリの選択方法について、こちらのページをお読みください][1]。

`dd-trace` と AWS X-Ray トレーシングライブラリの両方をインスツルメントするのは、主に 2 つの理由からです。
- AWS サーバーレス環境では、`dd-trace` ですでに Lambda 関数をトレースしているため、API Gateway または Step Functions など、AWS マネージドサービスの AWS X-Ray アクティブトレースを要求して `dd-trace` および AWS X-Ray スパンを単一トレースで視覚化します。
- Lambda 関数とホストの両方を使用するハイブリッド環境では、`dd-trace` がホストをインスツルメントし、AWS X-Ray が Lambda 関数をインスツルメントするため、Lambda 関数およびホスト全体のトランザクションの接続済みトレースを視覚化します。

この場合、使用料が高額になる可能性がありますのでご注意ください。X-Ray スパンは、トレースのマージ後 2～5 分間は引き続き使用可能です。通常は、単一のトレーシングライブラリの使用をおすすめしています。トレーシングライブラリの選択方法について、詳しくは[こちら][1]をご覧ください。

上記のユースケースをセットアップする手順は以下のとおりです。

- [サーバーレスメイン環境におけるトレースのマージ](#trace-merging-in-a-serverless-first-environment)
- [AWS Lambda およびホスト全体でのトレースのマージ](#trace-merging-across-aws-lambda-and-hosts)

### AWS サーバーレス環境におけるトレースのマージ

AWS X-Ray は、バックエンド AWS サービス (AWS X-Ray アクティブトレース) とクライアントライブラリ一式の両方を提供します。[Lambda コンソールでバックエンド AWS サービスのみを有効にすると][2]、AWS Lambda 関数に `Initialization` と `Invocation` スパンが与えられます。API Gateway および Step Function コンソールから、AWS X-Ray アクティブトレースを有効にすることも可能です。

AWS X-Ray SDK および Datadog APM クライアントライブラリ (`dd-trace`) は、いずれも関数に直接アクセスしてダウンストリームのコールのメタデータとスパンを追加します。`dd-trace` を使用してハンドラーレベルでトレースする場合は、以下のようなセットアップになります。

1. AWS Lambda コンソールおよび [Datadog 内の AWS X-Ray インテグレーション][3]で、Lambda 関数の [AWS X-Ray アクティブトレース][2]を有効にしてあります。 
2. [使用している Lambda ランタイム用のインストール手順][4]に従い、Datadog APM (`dd-trace`) を使用して Lambda 関数をインスツルメントしてあります。
3. `dd-trace` により、サードパーティライブラリにパッチが自動的に適用されているため、AWS X-Ray クライアントライブラリをインストールする必要はありません。
4. Lambda 関数で `DD_MERGE_XRAY_TRACES` 環境を `true` に設定し、X-Ray と `dd-trace` トレースをマージします (Ruby では `DD_MERGE_DATADOG_XRAY_TRACES`)。

### AWS Lambda とホスト全体のトレース

Datadog のトレーシングライブラリ (`dd-trace`) を Lambda 関数とホストの両方にインストールした場合は、AWS Lambda、コンテナ、オンプレミスホスト、マネージドサービスなど、インフラストラクチャーの境界を越えてリクエストの全体像がトレースに自動的に表示されます。

Datadog Agent でホストに `dd-trace` がインストールされていて、サーバーレス関数が AWS X-Ray でトレースされる場合、セットアップは以下のようになります。

1. Lambda 関数のトレース用に [AWS X-Ray インテグレーション][2]がインストールされていて、AWS X-Ray アクティブトレースと X-Ray クライアントライブラリのインストールが可能です。
2. [Lambda ランタイム用の Datadog Lambda ライブラリ][4]がインストール済みで、`DD_TRACE_ENABLED` 環境変数が `false` に設定されています。
3. ホストおよびコンテナベースのインフラストラクチャーで [Datadog APM][5] が構成されています。

そして、X-Ray と Datadog APM トレースを同じフレームグラフに表示するには、すべてのサービスに同じ `env` タグが必要です。

**注**: 分散型トレーシングはホストまたはコンテナベースアプリケーションにおけるすべてのランタイムでサポートされています。ホストおよび Lambda 関数が同じランタイムにある必要はありません。

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="ホストから Lambda 関数へのリクエストのトレース" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/distributed_tracing/
[2]: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[4]: /ja/serverless/installation/
[5]: /ja/tracing/send_traces/