---
aliases:
  - /ja/integrations/awslambda/
  - /ja/serverless/real-time-enhanced-metrics/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Lambda の実行、エラー、呼び出しの回数などを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_lambda/'
draft: false
further_reading:
  - link: 'https://www.datadoghq.com/blog/how-to-monitor-lambda-functions/'
    tag: ブログ
    text: Lambda 関数の監視方法
  - link: 'https://www.datadoghq.com/blog/datadog-lambda-layer/'
    tag: ブログ
    text: 'Datadog の Lambda レイヤー: カスタムサーバーレスメトリクスの監視'
git_integration_title: amazon_lambda
has_logo: true
integration_id: amazon-lambda
integration_title: Amazon Lambda
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_lambda
public_title: Datadog-Amazon Lambda インテグレーション
short_description: Lambda の実行、エラー、呼び出しの回数などを追跡
version: '1.0'
---
<div class="alert alert-warning">このページは、Amazon CloudWatch からの AWS Lambda メトリクスの取り込みに特化された文書となっています。最新の Datadog サーバーレスドキュメントは、<a href="docs.datadoghq.com/serverless/">こちら</a>をご覧ください。</div>

## 概要

Amazon Lambda は、イベントに応答してコードを実行し、そのコードが必要とするコンピューティングリソースを自動的に管理するコンピューティングサービスです。

このインテグレーションを有効にすると、CloudWatch メトリクスが収集されるようになります。このページでは、Lambda 関数のカスタムメトリクス、ログ、トレースを設定する方法についても説明します。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

{{< img src="integrations/amazon_lambda/lambda_metrics.png" alt="AWS Lambda からランタイムメトリクスを収集するためのアーキテクチャ図" >}}

#### AWS Lambda メトリクス

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Lambda` をオンにします。
2. Amazon Lambda のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。Lambda ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

    | AWS アクセス許可     | 説明                                  |
    | ------------------ | -------------------------------------------- |
    | `lambda:List*`     | Lambda 関数、メタデータ、およびタグを一覧表示します。   |
    | `tag:GetResources` | Lambda 関数に適用されたカスタムタグを取得します。 |
    | `cloudtrail:LookupEvents` | CloudTrail History を使用して Lambda 関数への変更を検出 |

3. [Datadog - AWS Lambda インテグレーション][5]をインストールします。

完了したら、[Datadog Serverless ビュー][6]にすべての Lambda 関数が表示されます。このページは、サーバーレスアプリケーションを実行している AWS Lambda 関数からのメトリクス、トレース、ログを 1 つのビューにまとめて表示します。この機能の詳細については、[Datadog Serverless のドキュメント][7]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_lambda" >}}


AWS から取得される各メトリクスには、関数名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

カスタムメトリクスには関数名だけがタグ付けされます。

### イベント

AWS Lambda インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Lambda インテグレーションには、サービスのチェック機能は含まれません。

## サーバーレス

#### リアルタイムの拡張 Lambda メトリクス

Datadog では、Node.js、Python、Ruby ランタイム用のリアルタイム Lambda ランタイムメトリクスを追加設定なしで生成できます。詳細は、最新のサーバーレス[ドキュメント][9]でご確認ください。

##### 拡張リアルタイム Lambda メトリクスの有効化

詳細は、最新のサーバーレス[ドキュメント][9]でご確認ください。

### ログの収集

詳細は、最新のサーバーレス[ドキュメント][10]でご確認ください。

### トレースの収集

Datadog では、[Datadog APM][11] または [AWS X-Ray][12] のいずれかを使用した AWS Lambda 関数の分散トレースをサポートします。いずれかのクライアントライブラリセットを使用してトレースを生成できます。[Datadog APM][11] は、ホスト、コンテナ、サーバーレス機能で実行されているアプリケーションからのトレースを自動的に接続します。詳細は、最新のサーバーレス[ドキュメント][13]でご確認ください。

#### Datadog APM を使用したトレース

Datadog [Node.js][14]、[Python][15]、[Ruby][16] トレースライブラリは、AWS Lambda の分散トレースをサポートし、より多くのランタイムが間もなく登場します。アプリケーションにトレースを追加する最も簡単な方法は、依存関係として Datadog トレースライブラリを含む [Datadog Lambda ライブラリ][17] を使用することです。詳細は、最新のサーバーレス[ドキュメント][13]でご確認ください。

#### AWS Lambda とホスト全体のトレース

該当する場合、Datadog は AWS X-Ray トレースをネイティブ Datadog APM トレースとマージします。これにより、AWS Lambda、コンテナ、オンプレミスホスト、マネージドサービスなど、インフラストラクチャーの境界を越えるリクエストの全体像がトレースに表示されることになります。詳細は、最新のサーバーレス[ドキュメント][18]でご確認ください。

#### タグを使用したインフラストラクチャーの整理

Lambda 関数に適用された[タグ][19]は、自動的に新しいディメンションになり、このディメンションでトレースを分類できます。詳細は、最新のサーバーレス[ドキュメント][20]でご確認ください。

### サーバーレスインテグレーション

以下の Lambda 関数インテグレーションは、サーバーレスアプリケーションを監視するためのさらなる機能を提供します。詳細は、サーバレスドキュメントでご確認ください。

- [AWS Step Functions][21]
- [Amazon EFS for Lambda][22]
- [Lambda@Edge][23]

### カスタムメトリクス

Datadog Lambda ライブラリをインストールし、カスタムメトリクスを収集して送信します。詳細は、最新のサーバーレス[ドキュメント][24]でご確認ください。

#### ディストリビューションメトリクスへのアップグレード

ディストリビューションメトリクスでは、送信時に指定する代わりにグラフ化または照会するときに、集計を選択します。詳細は、最新のサーバーレス[ドキュメント][25]でご確認ください。

#### カスタムメトリクスのタグ付け

詳細は、最新のサーバーレス[ドキュメント][26]でご確認ください。

#### 同期カスタムメトリクスと非同期カスタムメトリクス

詳細は、最新のサーバーレス[ドキュメント][27]でご確認ください。

##### 非同期カスタムメトリクスの有効化

詳細は、最新のサーバーレス[ドキュメント][28]でご確認ください。

#### カスタムメトリクスのコード例

関数コードで、Lambda レイヤーから必要なメソッドをインポートし、関数ハンドラーのラッパーを追加します。詳細は、最新のサーバーレス[ドキュメント][29]でご確認ください。

#### VPC での実行

詳細は、最新のサーバーレス[ドキュメント][30]でご確認ください。

#### サードパーティライブラリ

詳細は、最新のサーバーレス[ドキュメント][31]でご確認ください。

#### [非推奨] CloudWatch ログ

詳細は、最新のサーバーレス[ドキュメント][32]でご確認ください。

### Datadog Lambda レイヤー

詳細は、最新のサーバーレス[ドキュメント][33]でご確認ください。

#### Datadog Lambda レイヤーのインストールと使用

詳細は、最新のサーバーレス[ドキュメント][33]でご確認ください。

## トラブルシューティング

ご不明な点は、[Datadog サポート][34]までお問い合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_lambda.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_lambda
[6]: https://app.datadoghq.com/functions
[7]: https://docs.datadoghq.com/ja/infrastructure/serverless/
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_lambda/amazon_lambda_metadata.csv
[9]: /ja/serverless/enhanced_lambda_metrics/
[10]: /ja/serverless/forwarder/
[11]: https://docs.datadoghq.com/ja/tracing/
[12]: https://docs.datadoghq.com/ja/integrations/amazon_xray/
[13]: /ja/serverless/distributed_tracing/
[14]: https://docs.datadoghq.com/ja/tracing/setup/nodejs/
[15]: https://docs.datadoghq.com/ja/tracing/setup/python/
[16]: https://docs.datadoghq.com/ja/tracing/setup/ruby/
[17]: /ja/serverless/datadog_lambda_library/
[18]: /ja/tracing/serverless_functions/#tracing-across-aws-lambda-and-hosts
[19]: https://docs.datadoghq.com/ja/tagging/
[20]: /ja/tracing/serverless_functions/#organizing-your-serverless-infrastructure-with-tags
[21]: /ja/serverless/serverless_integrations#aws-step-functions
[22]: /ja/serverless/serverless_integrations#amazon-efs-for-lambda
[23]: /ja/serverless/serverless_integrations#lambda-edge
[24]: /ja/serverless/custom_metrics/#custom-metrics
[25]: /ja/serverless/custom_metrics/#understanding-distribution-metrics
[26]: /ja/serverless/custom_metrics/#tagging-custom-metrics
[27]: /ja/serverless/custom_metrics/#synchronous-vs-asynchronous-custom-metrics
[28]: /ja/serverless/custom_metrics/#enabling-asynchronous-custom-metrics
[29]: /ja/serverless/custom_metrics/#custom-metrics-sample-code
[30]: /ja/serverless/custom_metrics/#running-in-a-vpc
[31]: /ja/serverless/custom_metrics/#using-third-party-libraries
[32]: /ja/serverless/custom_metrics/#deprecated-using-cloudwatch-logs
[33]: /ja/serverless/installation/
[34]: https://docs.datadoghq.com/ja/help/