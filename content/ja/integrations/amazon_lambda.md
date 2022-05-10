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
doc_link: https://docs.datadoghq.com/integrations/amazon_lambda/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/how-to-monitor-lambda-functions/
  tag: ブログ
  text: Lambda 関数の監視方法
- link: https://www.datadoghq.com/blog/datadog-lambda-layer/
  tag: ブログ
  text: 'Datadog の Lambda レイヤー: カスタムサーバーレスメトリクスの監視'
- link: https://www.datadoghq.com/blog/datadog-lambda-extension/
  tag: ブログ
  text: Datadog の Lambda 関数について
git_integration_title: amazon_lambda
has_logo: true
integration_id: amazon-lambda
integration_title: Amazon Lambda
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_lambda
public_title: Datadog-Amazon Lambda インテグレーション
short_description: Lambda の実行、エラー、呼び出しの回数などを追跡
version: '1.0'
---

<div class="alert alert-warning">このページは、Amazon CloudWatch からの AWS Lambda メトリクスの取り込みに特化された文書となっています。Lambda 関数から直接リアルタイムにテレメトリーを収集することについては、<a href="/serverless">Datadog サーバーレスドキュメント</a>を参照してください。</div>

## 概要

Amazon Lambda は、イベントに応答してコードを実行し、そのコードが必要とするコンピューティングリソースを自動的に管理するコンピューティングサービスです。

このインテグレーションを有効にすると、CloudWatch メトリクスが収集されるようになります。このページでは、Lambda 関数のカスタムメトリクス、ログ、トレースを設定する方法についても説明します。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

#### AWS Lambda メトリクス

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Lambda` をオンにします。
2. Amazon Lambda のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。詳細については、AWS ウェブサイト上の [Lambda ポリシー][4]を参照してください。

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

### イベント

AWS Lambda インテグレーションは、[Datadog サーバーレスデプロイの追跡][9]を有効にすると、AWS CloudTrail から Lambda のデプロイイベントを収集することができます。

### サービスのチェック

AWS Lambda インテグレーションには、サービスのチェック機能は含まれません。

### リアルタイムの拡張 Lambda メトリクス

詳細は、[サーバーレスドキュメント][10]でご確認ください。

### カスタムメトリクス

詳細は、[サーバーレスドキュメント][11]でご確認ください。

### ログの収集

詳細は、[サーバーレスドキュメント][12]でご確認ください。

### トレースの収集

詳細は、[サーバーレスドキュメント][13]でご確認ください。

### Lambda@Edge

Datadog は、Lambda のメトリクスに `at_edge`、`edge_master_name`、`edge_master_arn` タグを自動的に追加し、Lambda 関数のメトリクスとログが Edge ロケーションで実行されると集約的に表示されるようにします。

Lambda@Edge 関数では、分散型トレーシングは_サポートされていません_。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][14]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}



[1]: /ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: /ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/lambda/latest/dg/lambda-permissions.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_lambda
[6]: https://app.datadoghq.com/functions
[7]: /ja/serverless
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_lambda/amazon_lambda_metadata.csv
[9]: /ja/serverless/deployment_tracking
[10]: /ja/serverless/enhanced_lambda_metrics/
[11]: /ja/serverless/custom_metrics/#custom-metrics
[12]: /ja/serverless/forwarder/
[13]: /ja/serverless/distributed_tracing/
[14]: /ja/help/