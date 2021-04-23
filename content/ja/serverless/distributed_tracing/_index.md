---
title: 分散型トレーシング
kind: ドキュメント
aliases:
  - /ja/tracing/serverless_functions
  - /ja/tracing/setup_overview/serverless_functions/
further_reading:
  - link: /tracing/
    tag: Documentation
    text: Datadog APM の確認
  - link: '/tracing/trace_search_and_analytics/#live-search-for-15-minutes'
    tag: Documentation
    text: Live Search
---
{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="トレースサーバーレス関数"  style="width:100%;">}}

Datadog では、サーバーレストレースをメトリクスに接続することで、アプリケーションのパフォーマンスに関する豊富な情報を提供します。これにより、サーバーレスアプリケーションの性質である分散型の環境でもパフォーマンスの問題を的確にトラブルシューティングできます。

Datadog Python、Node.js、Ruby、Go、Java トレースライブラリは、AWS Lambda の分散トレースをサポートします。アプリケーションにトレースを追加する最も簡単な方法は、依存関係として Datadog トレースライブラリを含む [Datadog Lambda ライブラリ][1]を使用することです。

## トレーシングライブラリを選択

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="Datadog で AWS Lambda をトレースするためのアーキテクチャ図" >}}

<div class="alert alert-info"> サーバーレスモニタリングは初めてですか？<a href="/serverless/installation/">こちら</a>のインストール手順に従って開始します。</div>

サーバーレスアプリケーションで Datadog APM の使用を開始するには、Lambda ランタイムと個々の要件に基づいて Datadog のトレースライブラリ (`dd-trace`) または AWS X-Ray トレースライブラリをインストールするかを選択できます。ライブ検索ビューで Datadog のすべてのトレースをリアルタイムで表示するには、Datadog のトレースライブラリを使用する必要があります。

| [dd-trace を使用した Datadog APM][2]          | [AWS X-Ray を使用した Datadog APM][3]           |
|---------------------------------|-------------------------------------------------------------------------|
| Datadog APM のインテグレーションライブラリを使用してエンドツーエンドのトレーシングを行います。  | AWS X-Ray からトレースを取得します。 |
| Datadog でトレースをリアルタイムで視覚化します。 | トレースデータは数分後に Datadog で利用可能。 |
| テールベースのサンプリングと完全にカスタマイズ可能なタグベースの保持フィルター。 | サンプリングレートは構成できません。 |
| Python、Node.js、Ruby、Go、Java をサポートしています。 |  すべての Lambda ランタイムをサポートしています。 |

### ランタイムの推奨事項

{{< partial name="serverless/serverless-apm-recommendations.html" >}}

#### Python と Node.js

Python および Node.js をサポートする Datadog Lambda ライブラリとトレースライブラリ:
- Lambda ログおよびトレースとトレース ID およびタグ挿入との自動相関。
- Serverless Framework、AWS SAM、AWS CDK インテグレーションを使用したコード変更なしのインストール。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストをトレース。
- AWS SDK で実行された連続 Lambda 呼び出しのトレース。
- AWS SQS を介した非同期 Lambda 呼び出しのトレース。
- すぐに使用できる数十の追加の [Python][4] および [Node.js][5] ライブラリをトレース。
- SNS、Kinesis、EventBridge、MQTT などを介して作成された非 HTTP リクエストのトレース（[こちら][6]の追加インスツルメンテーションが必要）。

Python および Node.js サーバーレスアプリケーションの場合、Datadog では [Datadog のトレースライブラリをインストールする][7]ことをお勧めします。アプリケーションで API Gateway や Step Functions などの AWS マネージドサービスで AWS X-Ray アクティブトレースが必要な場合は、[こちら][8]で説明されているように AWS X-Ray と Datadog APM の_両方_のトレースライブラリを構成して、Datadog APM で AWS X-Ray トレースを拡張することをお勧めします。

すでに X-Ray でサーバーレス関数をトレースしていて、X-Ray を引き続き使用したい場合は、[AWS X-Ray インテグレーションをインストール][3]できます。

*上記にリストされていないサーバーレスリソースのトレースをご希望の場合は、[こちら][9]から機能リクエストを開いてください。*

#### Ruby

Ruby サポート用の Datadog Lambda ライブラリとトレースライブラリ:
- Lambda ログおよびトレースとトレース ID およびタグ挿入との自動相関。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストをトレース。
- すぐに使用できる数十の追加 [Ruby][10] ライブラリをトレース。

[Datadog のトレースライブラリ][7]または [AWS X-Ray インテグレーションのインストール][3]を使用して、Datadog でサーバーレス関数をトレースできます。[Datadog のトレースライブラリ][7]を使用していて、AWS マネージドサービス間で Lambda 関数トレースを接続する必要がある場合は、[こちら][8]で説明されているように AWS X-Ray と Datadog APM の_両方_のトレースライブラリを構成して、トレースを拡張することをお勧めします。

*上記にリストされていないサーバーレスリソースのトレースをご希望の場合は、[こちら][9]から機能リクエストを開いてください。*

#### Go

Go サポート用の Datadog Lambda ライブラリとトレースライブラリ:
- Lambda ログおよびトレースとトレース ID およびタグ挿入との手動相関。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストをトレース。
- すぐに使用できる数十の追加 [Go][11] ライブラリをトレース。

[Datadog のトレースライブラリ][7]または [AWS X-Ray インテグレーションのインストール][3]を使用して、Datadog でサーバーレス関数をトレースできます。[Datadog のトレースライブラリ][7]を使用していて、イベント駆動型アーキテクチャで複数の Lambda 関数トレースを接続する必要がある場合は、[こちら][8]で説明されているように AWS X-Ray と Datadog APM の_両方_のトレースライブラリを構成して、トレースを拡張することをお勧めします。

*上記にリストされていないサーバーレスリソースのトレースをご希望の場合は、[こちら][9]から機能リクエストを開いてください。*

#### Java

Java サポート用の Datadog Lambda ライブラリとトレースライブラリ:
- Lambda ログおよびトレースとトレース ID およびタグ挿入との相関。詳細は、[Java ログとトレースの接続][12]を参照してください。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストをトレース。
- すぐに使用できる数十の追加 [Java][13] ライブラリをトレース。

[Datadog のトレースライブラリ][7]または [AWS X-Ray インテグレーションのインストール][3]を使用して、Datadog でサーバーレス関数をトレースできます。[Datadog のトレースライブラリ][7]を使用していて、イベント駆動型アーキテクチャで複数の Lambda 関数トレースを接続する必要がある場合は、[こちら][8]で説明されているように AWS X-Ray と Datadog APM の_両方_のトレースライブラリを構成して、トレースを拡張することをお勧めします。

*Java Lambda 関数用の Datadog のトレースライブラリに関してフィードバックがございましたら、[Datadog Slack コミュニティ][15]の [#serverless][14] チャネルで行われているディスカッションをご確認ください。*

#### .NET

Datadog は、[AWS X-Ray インテグレーションをインストールする][3]ことにより、.NET AWS Lambda サーバーレスアプリケーションのトレースを構成することをお勧めします。

.NET Azure サーバーレスアプリケーションを介したトレースの詳細については、[こちら][16]をご覧ください。

*Datadog トレースライブラリを使用した .NET AWS Lambda サーバーレスアプリケーションのトレースをご希望の場合は、[こちら][9]から機能リクエストを開いてください。*

### ハイブリッド環境

Datadog のトレーシングライブラリ (`dd-trace`) を Lambda 関数とホストの両方にインストールした場合は、AWS Lambda、コンテナ、オンプレミスホスト、マネージドサービスなど、インフラストラクチャーの境界を越えてリクエストの全体像がトレースに自動的に表示されます。

Datadog Agent でホストに `dd-trace` がインストールされていて、サーバーレス関数が AWS X-Ray でトレースされる場合、インフラストラクチャー全体で接続された単一のトレースを表示するには、トレースのマージが必要です。`dd-trace` と AWS X-Ray からのトレースのマージの詳細については[こちら][8]をご覧ください。

Datadog の [AWS X-Ray インテグレーション][3]は、Lambda 関数のトレースのみを提供します。コンテナまたはホストベースの環境でのトレースの詳細については、[こちら][17]をご覧ください。

## Datadog APM を有効にする

{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

Datadog Python、Node.js、Ruby、Go、Java トレースライブラリは、AWS Lambda の分散トレースをサポートします。ご使用の関数にトレースを有効にするには、[インストール手順][7]に従ってください。

ご使用の関数のログを有効にせずに Datadog APM を有効にするには、Datadog Forwarder で `DdForwarderLog` 環境変数が `false` に設定することをご確認ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/datadog_lambda_library/
[2]: /ja/serverless/distributed_tracing#distributed-tracing-with-datadog-apm
[3]: /ja/integrations/amazon_xray/#overview
[4]: /ja/tracing/setup_overview/compatibility_requirements/python
[5]: /ja/tracing/setup_overview/compatibility_requirements/nodejs
[6]: /ja/serverless/distributed_tracing/serverless_trace_propagation
[7]: /ja/serverless/installation/
[8]: /ja/serverless/distributed_tracing/serverless_trace_merging
[9]: https://docs.datadoghq.com/ja/help/
[10]: /ja/tracing/setup_overview/compatibility_requirements/ruby
[11]: /ja/tracing/setup_overview/compatibility_requirements/go
[12]: /ja/tracing/connect_logs_and_traces/java/
[13]: /ja/tracing/setup_overview/compatibility_requirements/java
[14]: https://datadoghq.slack.com/archives/CFDPB83M4
[15]: https://chat.datadoghq.com/
[16]: /ja/serverless/azure_app_services
[17]: /ja/tracing/setup_overview/