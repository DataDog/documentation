---
aliases:
- /ja/integrations/amazon_auto_scaling
app_id: amazon-auto-scaling
categories:
- automation
- aws
- cloud
- configuration & deployment
- log collection
- provisioning
custom_kind: integration
description: ユーザー定義のポリシーに従って、EC2 インスタンスの起動と終了を自動化します。
media: []
title: AWS Auto Scaling
---
## 概要

AWS Auto Scaling は、ユーザー定義のポリシーに基づいて EC2 インスタンスを自動的に起動または終了するサービスです。

このインテグレーションを有効にすると、Datadog 上で Auto Scaling のメトリクスをまとめて確認できます。

- Auto Scaling グループに属するホストの EC2 メトリクスには、収集時に `autoscaling_group` タグが付きます。
- 特定のグループに関する Auto Scaling メトリクスには、収集時に `autoscaling_group` タグと `autoscalinggroupname` タグが付きます。

## セットアップ

### インストール

まだ設定していない場合は、先に [Amazon Web Services インテグレーション](https://docs.datadoghq.com/integrations/amazon_web_services/) をセットアップしてください。

### メトリクスの収集

1. Datadog の [AWS インテグレーション ページ](https://app.datadoghq.com/integrations/amazon-web-services) で、`Metric Collection` タブの `AutoScaling` が有効になっていることを確認します。

1. AWS 側では、Auto Scaling のデータを CloudWatch に送信する必要があります。[Auto Scaling グループのメトリクスを有効にする](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-monitoring.html#as-enable-group-metrics) を参照してください。

1. AWS Auto Scaling のメトリクスを収集するには、[Datadog IAM ポリシー](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) に以下の権限を追加してください。詳しくは、AWS サイトの [Auto Scaling ポリシー](https://docs.aws.amazon.com/autoscaling/plans/userguide/auth-and-access-control.html) を参照してください。

   | AWS 権限                          | 説明                                                                                                                                                                                                                                              |
   | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `autoscaling:DescribeAutoScalingGroups` | すべての Auto Scaling グループを一覧表示するために使用します。 |
   | `autoscaling:DescribePolicies` | 利用可能なポリシーを一覧表示します。イベントやモニターでオート コンプリートを行う際に使用されます。 |
   | `autoscaling:DescribeTags` | 指定した Auto Scaling グループのタグを一覧表示するために使用します。これにより、ASG のカスタム タグが ASG の CloudWatch メトリクスに追加されます。 |
   | `autoscaling:DescribeScalingActivities` | ASG がスケール アップまたはスケール ダウンしたときにイベントを生成するために使用します。 |
   | `autoscaling:ExecutePolicy` | 1 つのポリシーを実行するために使用します。モニターまたはイベント フィードから、スケール アップやスケール ダウン用のポリシーを実行できます。<br>これは [インストール用のポリシー ドキュメント](#installation) には含まれていません。モニターまたはイベントから Auto Scaling ポリシーを実行する場合にのみ追加してください。 |

1. [Datadog - AWS Auto Scaling インテグレーション](https://app.datadoghq.com/integrations/amazon-auto-scaling) をインストールします。

### ログ収集

#### ログを有効にする

AWS Auto Scaling がログを S3 バケットまたは CloudWatch へ送信するよう設定します。

**注**: S3 バケットにログを出力する場合は、_Target prefix_ に `amazon_auto_scaling` が設定されていることを確認してください。

#### ログを Datadog に送信する

1. まだ設定していない場合は、[Datadog Forwarder Lambda 関数](https://docs.datadoghq.com/logs/guide/forwarder/) をセットアップしてください。

1. Lambda 関数をインストールしたら、AWS コンソールで、AWS Auto Scaling のログが保存されている S3 バケットまたは CloudWatch ログ グループに手動でトリガーを追加します:

   - [S3 バケットに手動でトリガーを追加する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [CloudWatch ログ グループに手動でトリガーを追加する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.autoscaling.group_desired_capacity** <br>(gauge) | Auto Scaling グループが維持しようとする目標インスタンス数。|
| **aws.autoscaling.group_in_service_instances** <br>(gauge) | Auto Scaling グループに属する稼働中のインスタンス数。起動待ちや終了処理中のインスタンスは含まれません。|
| **aws.autoscaling.group_max_size** <br>(gauge) | Auto Scaling グループの最大サイズ。|
| **aws.autoscaling.group_min_size** <br>(gauge) | Auto Scaling グループの最小サイズ。|
| **aws.autoscaling.group_pending_instances** <br>(gauge) | 起動待ちのインスタンス数。まだ稼働状態に入っていないインスタンスが対象です。このメトリクスには、稼働中または終了処理中のインスタンスは含まれません。|
| **aws.autoscaling.group_terminating_instances** <br>(gauge) | 終了処理中のインスタンス数。このメトリクスには、稼働中または起動待ちのインスタンスは含まれません。|
| **aws.autoscaling.group_total_instances** <br>(gauge) | Auto Scaling グループ内のインスタンス総数。稼働中、起動待ち、終了処理中の各状態にあるインスタンスを合計した数です。|

AWS から取得した各メトリクスには、AWS コンソールに表示されるものと同じタグが付きます。これには、ホスト名や security-groups などが含まれます。

### イベント

AWS Auto Scaling インテグレーションでは、EC2 インスタンスの起動と終了に関するイベントも収集されます。以下はその例です:

{{< img src="integrations/amazon_auto_scaling/aws_auto_scaling_events.png" alt="AWS Auto Scaling のイベント" >}}

### サービス チェック

AWS Auto Scaling インテグレーションには、サービス チェックは含まれていません。

## トラブルシューティング

ASG メトリクスを Datadog に表示するには、まず AWS コンソールで有効化してください。[ASG メトリクスを有効にするための AWS の手順](http://docs.aws.amazon.com/autoscaling/latest/userguide/as-instance-monitoring.html#enable-detailed-instance-metrics) を参照してください。**注**: 有効化してからメトリクスが表示されるまで、少し時間がかかる場合があります。

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。