---
aliases:
- /ja/tracing/serverless_functions
- /ja/tracing/setup_overview/serverless_functions/
- /ja/serverless/troubleshooting/serverless_apm_metrics/
further_reading:
- link: /tracing/
  tag: Documentation
  text: Datadog APM の確認
- link: /tracing/trace_search_and_analytics/#live-search-for-15-minutes
  tag: Documentation
  text: Live Search
- link: https://www.datadoghq.com/blog/aws-lambda-tracing-go-java-functions/
  tag: ブログ
  text: Go および Java Lambda 関数のリアルタイム分散型トレーシング
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: ブログ
  text: サーバーレスビューでサーバーレススタックを監視する
- link: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
  tag: ブログ
  text: AWS フルマネージドサービス向け Datadog サーバーレスモニタリング
- link: https://www.datadoghq.com/blog/dotnet-lambda-functions-distributed-tracing/
  tag: ブログ
  text: .NET Lambda 関数のリアルタイム分散型トレーシング
kind: ドキュメント
title: サーバーレスアプリケーションによる分散型トレーシング
---

{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="トレースサーバーレス関数"  style="width:100%;">}}

Datadog では、サーバーレストレースをメトリクスに接続することで、アプリケーションのパフォーマンスに関する豊富な情報を提供します。これにより、サーバーレスアプリケーションの性質である分散型の環境でもパフォーマンスの問題を的確にトラブルシューティングできます。

Datadog Python、Node.js、Ruby、Go、Java、.NET トレーシングライブラリは、AWS Lambda の分散型トレーシングをサポートしています。

## トレーシングソリューションの選択

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Datadog で AWS Lambda をトレースするためのアーキテクチャ図" >}}

<div class="alert alert-info"> サーバーレスモニタリングは初めてですか？<a href="/serverless/installation/">こちら</a>のインストール手順に従って開始します。</div>

サーバーレスアプリケーションで Datadog APM を使い始めるには、Datadog のトレーシングクライアント (`dd-trace`) を使ってトレースを生成するか、AWS から X-Ray トレースを引っ張ってくるかを選択できます。

| [dd-trace を使用した Datadog APM][1]          | [AWS X-Ray を使用した Datadog APM][2]           |
|---------------------------------|-------------------------------------------------------------------------|
| Datadog APM のインテグレーションライブラリを使用してエンドツーエンドのトレーシングを行います。  | AWS X-Ray からトレースを取得します。 |
| Datadog でトレースをリアルタイムで視覚化します。 | トレースデータは数分後に Datadog で利用可能。 |
| テールベースのサンプリングと完全にカスタマイズ可能なタグベースの保持フィルター。 | サンプリングレートは構成できません。 |
| すべての Lambda ランタイムをサポートしています。 |  すべての Lambda ランタイムをサポートしています。 |

### ランタイムの推奨事項

{{< partial name="serverless/serverless-apm-recommendations.html" >}}

#### Python と Node.js

Python および Node.js をサポートする Datadog Lambda ライブラリとトレースライブラリ:
- Lambda ログおよびトレースとトレース ID およびタグ挿入との自動相関。
- Serverless Framework、AWS SAM、AWS CDK インテグレーションを使用したコード変更なしのインストール。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストをトレース。
- AWS SDK で実行された連続 Lambda 呼び出しのトレース。
- AWS Managed Services を利用して非同期 Lambda 呼び出しをトレースする
  - API Gateway
  - SQS
  - SNS
  - SNS と SQS の直接インテグレーション
  - Kinesis
  - EventBridge
- すぐに使用できる数十の追加の [Python][3] および [Node.js][4] ライブラリをトレース。

Python および Node.js サーバーレスアプリケーションの場合、Datadog では [Datadog のトレースライブラリをインストールする][5]ことをお勧めします。Datadog では、アプリケーションで AppSync や Step Functions などの AWS マネージドサービスで AWS X-Ray アクティブトレースが必要な場合は、[サーバーレストレースマージ][6]で説明されているように AWS X-Ray と Datadog APM の_両方_のトレースライブラリを構成して、Datadog APM で AWS X-Ray トレースを拡張することをお勧めします。

すでに X-Ray でサーバーレス関数をトレースしていて、X-Ray を引き続き使用したい場合は、[AWS X-Ray インテグレーションをインストール][2]できます。

*上記にリストされていないサーバーレスリソースのトレースをご希望の場合は、[機能リクエストを開いてください][7]。*

#### Ruby

Ruby サポート用の Datadog Lambda ライブラリとトレースライブラリ:
- Lambda ログおよびトレースとトレース ID およびタグ挿入との自動相関。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストをトレース。
- すぐに使用できる数十の追加の [Ruby][8] ライブラリをトレース。

[Datadog のトレースライブラリ][5]または [AWS X-Ray インテグレーションのインストール][2]を使用して、Datadog でサーバーレス関数をトレースできます。Datadog では、[Datadog のトレースライブラリ][5]を使用していて、AWS マネージドサービス間で Lambda 関数トレースを接続する必要がある場合は、[AWS X-Ray と Datadog APM][6] の_両方_のトレースライブラリを構成して、トレースを拡張することをお勧めします。

*上記にリストされていないサーバーレスリソースのトレースをご希望の場合は、[機能リクエストを開いてください][7]。*

#### Go

Go サポート用の Datadog Lambda ライブラリとトレースライブラリ:
- Lambda ログおよびトレースとトレース ID およびタグ挿入との手動相関。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストをトレース。
- すぐに使用できる数十の追加 [Go][9] ライブラリをトレース。

Go サーバーレスアプリケーションの場合、Datadog では [Datadog のトレースライブラリ][5]をインストールすることをお勧めします。アプリケーションで API Gateway や Step Functions などの AWS マネージドサービスで AWS X-Ray アクティブトレースが必要な場合は、代わりに、[Datadog APM と AWS X-Ray トレース][2]の使用を検討することをお勧めします。

*上記にリストされていないサーバーレスリソースのトレースをご希望の場合は、[機能リクエストを開いてください][7]。*

#### Java

Java サポート用の Datadog Lambda ライブラリとトレースライブラリ:
- Lambda ログおよびトレースとトレース ID およびタグ挿入との相関。詳細は、[Java ログとトレースの接続][10]を参照してください。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストをトレース。
- すぐに使用できる数十の追加 [Java][11] ライブラリをトレース。

Java サーバーレスアプリケーションの場合、Datadog では [Datadog のトレースライブラリ][5]をインストールすることをお勧めします。アプリケーションで API Gateway や Step Functions などの AWS マネージドサービスで AWS X-Ray アクティブトレースが必要な場合は、代わりに、[Datadog APM と AWS X-Ray トレース][2]の使用を検討することをお勧めします。

*Java Lambda 関数用の Datadog のトレースライブラリに関してフィードバックがございましたら、[Datadog Slack コミュニティ][13]の [#serverless][12] チャネルで行われているディスカッションをご確認ください。*

#### .NET

.NET 用のトレースライブラリは以下に対応しています。
- ダウンストリームの Lambda 関数またはコンテナを呼び出す HTTP リクエストをトレース。
- すぐに使用できる数十の追加 [.NET][14] ライブラリをトレース。

.NET サーバーレスアプリケーションの場合、Datadog では [Datadog のトレースライブラリ][5]をインストールすることをお勧めします。アプリケーションで API Gateway や Step Functions などの AWS マネージドサービスで AWS X-Ray アクティブトレースが必要な場合は、代わりに、[Datadog APM と AWS X-Ray トレース][2]の使用を検討することをお勧めします。

[.NET Azure サーバーレスアプリケーションを介したトレース][15]の詳細をご覧ください。

### ハイブリッド環境

Datadog のトレーシングライブラリ (`dd-trace`) を Lambda 関数とホストの両方にインストールした場合は、AWS Lambda、コンテナ、オンプレミスホスト、マネージドサービスなど、インフラストラクチャーの境界を越えてリクエストの全体像がトレースに自動的に表示されます。

Datadog Agent でホストに `dd-trace` がインストールされていて、サーバーレス関数が AWS X-Ray でトレースされる場合、インフラストラクチャー全体で接続された単一のトレースを表示するには、トレースのマージが必要です。`dd-trace` と AWS X-Ray からのトレースのマージの詳細については、[サーバーレストレースのマージ][6]のドキュメントをご覧ください。

Datadog の [AWS X-Ray インテグレーション][2]は、Lambda 関数のトレースのみを提供します。コンテナまたはホストベースの環境でのトレースの詳細については、[Datadog APM のドキュメント][16]をご覧ください。

## Datadog APM を有効にする

{{< img src="tracing/live_search/livesearchmain.mp4" alt="Live Search" video=true >}}

Datadog Python、Node.js、Ruby、Go、Java、.NET トレースライブラリは、AWS Lambda の分散トレースをサポートします。ご使用の関数にトレースを有効にするには、[インストール手順][5]に従ってください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/distributed_tracing#distributed-tracing-with-datadog-apm
[2]: /ja/integrations/amazon_xray/#overview
[3]: /ja/tracing/setup_overview/compatibility_requirements/python
[4]: /ja/tracing/setup_overview/compatibility_requirements/nodejs
[5]: /ja/serverless/installation/
[6]: /ja/serverless/distributed_tracing/serverless_trace_merging
[7]: https://docs.datadoghq.com/ja/help/
[8]: /ja/tracing/setup_overview/compatibility_requirements/ruby
[9]: /ja/tracing/setup_overview/compatibility_requirements/go
[10]: /ja/tracing/connect_logs_and_traces/java/
[11]: /ja/tracing/setup_overview/compatibility_requirements/java
[12]: https://datadoghq.slack.com/archives/CFDPB83M4
[13]: https://chat.datadoghq.com/
[14]: /ja/tracing/setup_overview/compatibility_requirements/dotnet-core
[15]: /ja/serverless/azure_app_services
[16]: /ja/tracing/setup_overview/