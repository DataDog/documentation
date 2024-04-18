---
aliases:
- /ja/integrations/awsroute53/
categories:
- aws
- cloud
- log collection
- network
- notifications
dependencies: []
description: Route 53 メトリクスを追跡し、健全性チェックを監視。
doc_link: https://docs.datadoghq.com/integrations/amazon_route53/
draft: false
git_integration_title: amazon_route53
has_logo: true
integration_id: ''
integration_title: Amazon Route 53
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_route53
public_title: Datadog-Amazon Route 53 インテグレーション
short_description: Route 53 メトリクスを追跡し、健全性チェックを監視。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/amazon_route53/route53_graph.png" alt="route53 グラフ" popup="true">}}

## 概要

Amazon Route 53 は DNS 管理およびトラフィック管理に加え、健全性チェックによる可用性とパフォーマンスの監視を提供します。Datadog に健全性チェック情報を表示して、環境内の他のメトリクスやイベントとの関連性を提供できます。Route 53 の健全性チェックステータスグラフのダッシュボードの例を挙げます。

その他の AWS サービスの詳細については、[AWS タイル][1]を参照してください。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Route53` が有効になっていることを確認します。
2. Amazon Route 53 のメトリクスを収集するため、次の権限を [Datadog IAM ポリシー][3]に追加します。

    - `route53:listHealthChecks`: 使用できる健全性チェックを一覧表示します。
    - `route53:listTagsForResources`: Route53 CloudWatch メトリクスにタグを追加します。

    詳細については、AWS ウェブサイト上の [Route53 ポリシー][4]を参照してください。

3. [Datadog - Amazon Route53 インテグレーション][5]をインストールします。

**注**: CloudWatch を使用して Amazon Route 53 メトリクスを取得するには、US East (N. Virginia) をリージョンとして選択する必要があります。他のリージョンを選択した場合、Amazon Route 53 メトリクスは使用できません。詳細は、[健全性チェックステータスのモニタリングと通知の受信][6]を参照してください。

### ログの収集

Route 53 が受信する以下のようなクエリに関する情報をログに記録するように、Amazon Route 53 を構成します。

- リクエストされたドメインまたはサブドメイン
- リクエストの日時
- DNS レコードタイプ (A、AAAA など)
- DNS クエリに応答した Route 53 エッジの場所
- DNS 応答コード (NoError、ServFail など)
- VPC 用リゾルバークエリのログ

#### Route53 DNS クエリのログの有効化

1. Route 53 の AWS コンソールにアクセスし、**Hosted zones** をクリックします。
2. ログを構成するホストゾーンのラジオボタンをクリックします。
3. **View Details** をクリックします。
4. **Configure query logging** をクリックします。
5. CloudWatch ロググループを選択するか、ログの送信先になる新しいロググループを作成します。ロググループ名には「route53」を入れてください。

#### Route53 Resolver クエリのログの有効化

1. 左側の Route 53 の設定ペインで、Resolver の下にある **Query Logging** を選択します。
2. **Configure Query Logging** をクリックします。
3. Resolver クエリの名前を入力します。
4. Resolver がクエリログを送信する CloudWatch ロググループを選択します。ロググループ名には「route53」を入れてください。
5. Resolver のクエリを記録する VPC を追加します。
6. オプションで、タグを追加します。
7. **Configure query logging** をクリックします。

#### ログを Datadog に送信する方法

1. AWS アカウントで [Datadog Forwarder Lambda 関数][7] をまだセットアップしていない場合は、セットアップします。
2. 設定したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **CloudWatch Logs** トリガーを選択します。
4. Route53 のログを含む CloudWatch のロググループを選択します。
5. フィルターの名前を入力します。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

[ログエクスプローラー][8]に移動して、ログを確認します。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][9]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_route53" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

Amazon Route 53 インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Route 53 インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/auth-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-route53
[6]: http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-monitor-view-status.html#monitoring-health-checks
[7]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[8]: https://app.datadoghq.com/logs
[9]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_route53/amazon_route53_metadata.csv
[11]: https://docs.datadoghq.com/ja/help/