---
aliases:
  - /ja/integrations/awselb/
  - /ja/integrations/faq/wrong-count-of-aws-elb-healthy-host-count
  - /ja/integrations/faq/does-datadog-support-aws-alb-application-load-balancer/
  - /ja/integrations/faq/where-are-my-elb-latency-metrics/
categories:
  - cloud
  - web
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: Amazon Load Balancer のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_elb/'
git_integration_title: amazon_elb
has_logo: true
integration_title: Amazon Load Balancer
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_elb
public_title: Datadog-Amazon Load Balancer インテグレーション
short_description: Amazon Load Balancer のキーメトリクスを追跡
version: '1.0'
---
{{< img src="integrations/amazon_elb/elb.png" alt="ELB default dashboard" responsive="true" responsive="true" popup="true">}}

## 概要

Elastic Load Balancing (ELB) は、アプリケーションから異なるアベイラビリティーゾーンにある複数の Amazon EC2 バックエンドインスタンスに受信 Web トラフィックをディスパッチするために使用される AWS サービスです。ELB は、スムーズなユーザーエクスペリエンスを保証しつつ、フォールトトレランスを向上させ、トラフィックのピークや機能停止した EC2 インスタンスを中断なく処理します。

Datadog は、AWS が提供する 3 つのバリエーションの Elastic Load Balancer (**Application、Classic、Network Load Balancer**) からメトリクスとメタデータを収集します。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`ELB` をオンにします。Application ELB メトリクスの `ApplicationELB` チェックボックスと、Network ELB メトリクスの `NetworkELB` チェックボックスもオンにします。

2. Amazon ELB のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `elasticloadbalancing:DescribeLoadBalancers`: ELB を一覧表示し、タグとメトリクスを追加します。
    - `elasticloadbalancing:DescribeTags`: ELB メトリクスにカスタム ELB タグを追加します。
    - `elasticloadbalancing:DescribeInstanceHealth`: インスタンスの状態を追加します。

    ELB ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

3. [Datadog - AWS ELB インテグレーション][5]をインストールします。

### ログの収集

#### AWS ELB および ALB ログの有効化

ログを収集するには、まず ELB または ALB でログを有効にします。ELB または ALB ログを AWS S3 バケットに書き込み、[Lambda 関数で使用][6]することができます。詳細については、[AWS のドキュメント][7]を参照してください。

{{< img src="integrations/amazon_elb/aws_elb_log_enable.png" alt="aws elb log enable" responsive="true" responsive="true" popup="true" style="width:70%;" >}}

間隔を 5 分に設定し、S3 バケットを定義します。

{{< img src="integrations/amazon_elb/aws_elb_configure_log.png" alt="aws elb log configuration" responsive="true" responsive="true" popup="true" style="width:70%;">}}

#### Datadog へのログの送信

1. [Datadog ログコレクション AWS Lambda 関数][8]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで ELB ログを含む S3 バケットに手動でトリガーを追加します。トリガーリストから S3 をクリックします。
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 trigger configuration" responsive="true" popup="true" style="width:70%;">}}
   ELB ログを含む S3 バケットを選択してトリガーを構成し、イベントタイプを `Object Created (All)` に変更して、Add ボタンをクリックします。
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda trigger configuration" responsive="true" popup="true" style="width:70%;">}}

完了したら、[Datadog Log セクション][9]に移動し、ログを確認します。

## 収集データ
メトリクスは次のネームスペースの下に収集されます。

| Datadog ネームスペース    | AWS サービス                    |
|----------------------|--------------------------------|
| `aws.applicationelb` | Application Load Balancer     |
| `aws.elb`            | Classic Elastic Load Balancing |
| `aws.network.elb`    | Network Load Balancer         |

### メトリクス

{{< get-metrics-from-git "amazon_elb" >}}

AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

AWS Elastic Load Balancing インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Elastic Load Balancing インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

ELB のパフォーマンスメトリクスを監視する方法については、[こちらの記事をご参照ください][11]。キーパフォーマンスメトリクス、その収集方法、Datadog を使用して ELB を監視する方法について詳しく説明しています。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticloadbalancing.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_elb
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#create-a-new-lambda-function
[7]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html
[8]: /ja/integrations/amazon_web_services/#create-a-new-lambda-function
[9]: https://app.datadoghq.com/logs
[10]: https://docs.datadoghq.com/ja/help
[11]: https://www.datadoghq.com/blog/top-elb-health-and-performance-metrics


{{< get-dependencies >}}