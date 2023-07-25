---
aliases:
- /ja/integrations/awselb/
- /ja/integrations/faq/wrong-count-of-aws-elb-healthy-host-count
- /ja/integrations/faq/does-datadog-support-aws-alb-application-load-balancer/
- /ja/integrations/faq/where-are-my-elb-latency-metrics/
categories:
- aws
- cloud
- log collection
- network
dependencies: []
description: Amazon Elastic Load Balancing のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_elb/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/top-elb-health-and-performance-metrics
  tag: ブログ
  text: 上位の ELB ヘルスメトリクスとパフォーマンスメトリクス
git_integration_title: amazon_elb
has_logo: true
integration_id: amazon-elb
integration_title: Amazon Elastic Load Balancing
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_elb
public_title: Datadog-Amazon Elastic Load Balancing インテグレーション
short_description: Amazon Elastic Load Balancing のキーメトリクスを追跡します。
version: '1.0'
---

{{< img src="integrations/amazon_elb/elb.png" alt="ELB デフォルトダッシュボード" popup="true">}}

## 概要

Elastic Load Balancing (ELB) は、アプリケーションから異なるアベイラビリティーゾーンにある複数の Amazon EC2 バックエンドインスタンスに受信 Web トラフィックをディスパッチするために使用される AWS サービスです。ELB は、スムーズなユーザーエクスペリエンスを保証しつつ、フォールトトレランスを向上させ、トラフィックのピークや機能停止した EC2 インスタンスを中断なく処理します。

Datadog は、AWS が提供する 3 つのバリエーションの Elastic Load Balancer (**Application、Classic、Network Load Balancer**) からメトリクスとメタデータを収集します。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]の `Metric Collection` タブで、`ELB` が有効になっていることを確認します。Application ELB と Network ELB のメトリクスをそれぞれ `ApplicationELB` と `NetworkELB` に設定します。
2. Amazon ELB のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。詳細については、AWS ウェブサイト上の [ELB ポリシー][4]を参照してください。

    | AWS アクセス許可                                | 説明                                                        |
    | --------------------------------------------- | ------------------------------------------------------------------ |
    | `elasticloadbalancing:DescribeLoadBalancers`  | ELB を一覧表示し、タグとメトリクスを追加します。                        |
    | `elasticloadbalancing:DescribeTags`           | ELB メトリクスにカスタム ELB タグを追加します。                                |
    | `elasticloadbalancing:DescribeInstanceHealth` | インスタンスの状態を追加します。                                       |
    | `elasticloadbalancing:DescribeTargetGroups`   | 指定したターゲットグループまたはすべてのターゲットグループを説明します。 |

3. [Datadog - Amazon Elastic Load Balancing インテグレーション][5]をインストールします。

### ログの収集

#### AWS ELB および ALB ログの有効化

ログを収集するには、まず ELB または ALB でログを有効にします。ELB または ALB ログを AWS S3 バケットに書き込み、[Lambda 関数で使用][6]することができます。詳細については、[Classic Load Balancer のアクセスログを有効にする][7]を参照してください。

{{< img src="integrations/amazon_elb/aws_elb_log_enable.png" alt="AWS ELB ログ有効" popup="true" style="width:70%;" >}}

間隔を 5 分に設定し、S3 バケットとプレフィックスを定義します。[S3 イベント通知設定をあいまいに定義する][8]のを回避するには、他のロードバランサーのログの場所と重複しない**一意の場所**を使用してください。複数のロードバランサーが同じバケットにログを記録している場合は、必ず `my-bucket-for-elb-logs/my-elb-name` などの**一意のプレフィックス**を使用して、ログを別々の場所に保存してください。

{{< img src="integrations/amazon_elb/aws_elb_configure_log.png" alt="AWS ELB ログ構成" popup="true" style="width:70%;">}}

#### ログを Datadog に送信する方法

1. AWS アカウントで [Datadog Forwarder Lambda 関数][9]をまだセットアップしていない場合は、セットアップします。
2. 設定が完了したら、Datadog Forwarder Lambda 関数に移動します。ELB ログを含む S3 バケットで、[自動][10]または [手動][11]のトリガーをセットアップします。手動セットアップでは、`All object create events` のイベントタイプを使用します。
3. [ログエクスプローラー][12]を使って、ログを確認します。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][13]を参照してください。

## 収集データ

メトリクスは次のネームスペースの下に収集されます。

| Datadog ネームスペース    | AWS サービス                    |
| -------------------- | ------------------------------ |
| `aws.applicationelb` | Application Load Balancer     |
| `aws.elb`            | Classic Elastic Load Balancing |
| `aws.networkelb`     | Network Load Balancer         |

### メトリクス

{{< get-metrics-from-git "amazon_elb" >}}

AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

Amazon Elastic Load Balancing インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Elastic Load Balancing インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][14]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/load-balancer-authentication-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-elb
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[7]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html
[8]: https://aws.amazon.com/premiumsupport/knowledge-center/lambda-s3-event-configuration-error/
[9]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[10]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[11]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
[12]: https://app.datadoghq.com/logs
[13]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[14]: https://docs.datadoghq.com/ja/help/