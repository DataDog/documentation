---
aliases:
  - /ja/integrations/awsroute53/
categories:
  - cloud
  - network
  - web
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Route 53 メトリクスを追跡し、健全性チェックを監視。
doc_link: 'https://docs.datadoghq.com/integrations/amazon_route53/'
draft: false
git_integration_title: amazon_route53
has_logo: true
integration_title: Amazon Route 53
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_route53
public_title: Datadog-Amazon Route 53 インテグレーション
short_description: Route 53 メトリクスを追跡し、健全性チェックを監視。
version: '1.0'
---
{{< img src="integrations/amazon_route53/route53_graph.png" alt="Route 53 のグラフ" popup="true">}}

## 概要

AWS Route 53 は DNS 管理およびトラフィック管理と共に、健全性チェックによる可用性とパフォーマンスの監視を提供します。Datadog に健全性チェック情報を表示して、環境内の他のメトリクスやイベントとの関連性を提供できます。Route 53 の健全性チェックステータスグラフのダッシュボードの例を挙げます。

その他の AWS サービスの詳細については、[AWS タイル][1]を参照してください。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Route53` をオンにします。
2. Amazon Route53 のメトリクスを収集するため、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `route53:listHealthChecks`: 使用できる健全性チェックを一覧表示します。
    - `route53:listTagsForResources`: Route53 CloudWatch メトリクスにタグを追加します。

    Route53 ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

3. [Datadog - AWS Route53 インテグレーション][5]をインストールします。

**注**: CloudWatch を使用して Amazon Route 53 メトリクスを取得するには、US East (N. Virginia) をリージョンとして選択する必要があります。他のリージョンを選択した場合、Amazon Route 53 メトリクスは使用できません。詳細は[こちらを参照してください][6]。

### ログの収集

Route 53 が受信する以下のようなクエリに関する情報をログに記録するように、Amazon Route 53 を構成します。

- リクエストされたドメインまたはサブドメイン
- リクエストの日時
- DNS レコードタイプ (A、AAAA など)
- DNS クエリに応答した Route 53 エッジの場所
- DNS 応答コード (NoError、ServFail など)
- VPC 用リゾルバークエリのログ

#### Route53 DNS クエリのログの有効化

Route 53 AWS コンソールに移動し、ログを構成するホストゾーンを選択します。ラジオボタンをクリックし、「Configure query logging」を選択します。
{{< img src="integrations/amazon_route53/amazon_route_53_log_enable.png" alt="Route 53 ログの有効化" popup="true" style="width:70%;">}}

次に、Cloudwatch ロググループを選択するか、ログの送信先になる新しいロググループを作成します。ロググループ名には「route53」を入れてください。

#### Route53 Resolver クエリのログの有効化

Route 53 の設定ペインの *Resolver* で *Query Logging* を選択します。

*Configure Query Logging* をクリックして、リゾルバークエリのログを作成する VPC を定義する手順に従い、送信先の CloudWatch ロググループを選択します（オプションでタグを定義します）。ロググループ名に “route53” が含まれていることを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][7]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから手動で Route53 ログを含む Cloudwatch ロググループにトリガーを追加します。
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="CloudWatch Logs グループ" popup="true" style="width:70%;">}}
   対応する CloudWatch ロググループを選択し、フィルター名を追加して (空にすることも可能)、トリガーを追加します。
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="Cloudwatch トリガー" popup="true" style="width:70%;">}}

完了したら、[Datadog Log セクション][8]に移動し、ログを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_route53" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS Route 53 インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Route 53 インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_route53.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_route53
[6]: http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-monitor-view-status.html#monitoring-health-checks
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#create-a-new-lambda-function
[8]: https://app.datadoghq.com/logs
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_route53/amazon_route53_metadata.csv
[10]: https://docs.datadoghq.com/ja/help/