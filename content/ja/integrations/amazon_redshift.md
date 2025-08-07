---
aliases:
- /ja/integrations/awsredshift/
app_id: amazon_redshift
categories:
- aws
- クラウド
- data stores
- ログの収集
custom_kind: インテグレーション
description: Amazon Redshift のキーメトリクスを追跡
title: Amazon Redshift
---
## 概要

Amazon Redshift は、ペタバイトスケールの高速なフルマネージド型データウェアハウスサービスです。あらゆるデータをシンプルかつコスト効率よく能率的に分析できます。

このインテグレーションを有効にすると、Datadog にすべての Redshift メトリクスを表示できます。

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### メトリクスの収集

1. In the [AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services), ensure that `Redshift` is enabled under the `Metric Collection` tab.

1. Add these permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon Redshift metrics:

   - `redshift:DescribeClusters`: アカウント内のすべての Redshift クラスターを一覧表示します。
   - `redshift:DescribeLoggingStatus`: Redshift ログが格納されている S3 バケットを取得します。
   - `tag:GetResources`: Redshift クラスターのカスタムタグを取得します。

   For more information, see the [Redshift policies](https://docs.aws.amazon.com/redshift/latest/mgmt/redshift-iam-authentication-access-control.html) on the AWS website.

1. Install the [Datadog - Amazon Redshift integration](https://app.datadoghq.com/integrations/amazon-redshift).

### ログ収集

#### ログの有効化

Enable the logging on your Redshift Cluster first to collect your logs. Redshift logs can be written to an Amazon S3 bucket and [consumed by a Lambda function](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets). For more information, see [Configuring auditing using the console](https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing-console.html).

#### ログを Datadog に送信する方法

1. If you haven't already, set up the [Datadog Forwarder Lambda function](https://docs.datadoghq.com/logs/guide/forwarder/) in your AWS account.

1. Lambda 関数がインストールされたら、Redshift ログを収集する方法を以下の 2 つから選択します。

   - Automatically: Redshift logs are managed automatically if you grant Datadog access with a set of permissions. See [Automatically Set Up Triggers](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers) for more information on configuring automatic log collection on the Datadog Forwarder Lambda function.
   - 手動: AWS コンソールで、Redshift のログが格納されている S3 バケットにトリガーを追加します。[手動インストール手順](#manual-installation-steps)を参照してください。

#### 手動インストールの手順

1. If you haven't already, set up the [Datadog Forwarder Lambda function](https://docs.datadoghq.com/logs/guide/forwarder/) in your AWS account.
1. 設定したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
1. Trigger Configuration で **S3** トリガーを選択します。
1. Redshift のログが格納されている S3 バケットを選択します。
1. イベントの種類は `All object create events` のままにしておきます。
1. **Add** をクリックすると、Lambda にトリガーが追加されます。

Go to the [Log Explorer](https://app.datadoghq.com/logs) to start exploring your logs.

For more information on collecting AWS Services logs, see [Send AWS Services Logs with the Datadog Lambda Function](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/).

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.redshift.commit_queue_length** <br>(count) | The number of transactions ahead of a transaction in the commit queue.<br>_Shown as transaction_ |
| **aws.redshift.concurrency_scaling_active_clusters** <br>(count) | The number of concurrency scaling clusters that are actively processing queries at any given time.|
| **aws.redshift.concurrency_scaling_seconds** <br>(gauge) | The number of seconds used by concurrency scaling clusters that have active query processing activity.<br>_Shown as second_ |
| **aws.redshift.cpuutilization** <br>(gauge) | The percentage of CPU utilization. For clusters, this metric represents an aggregation of all nodes (leader and compute) CPU utilization values.<br>_Shown as percent_ |
| **aws.redshift.database_connections** <br>(gauge) | The number of database connections to a cluster.<br>_Shown as connection_ |
| **aws.redshift.health_status** <br>(gauge) | Indicates the health of the cluster. 1 indicates healthy, and 0 indicates unhealthy.|
| **aws.redshift.maintenance_mode** <br>(gauge) | Indicates whether the cluster is in maintenance mode. 1 indicates on, and 0 indicates off.|
| **aws.redshift.max_configured_concurrency_scaling_clusters** <br>(count) | The maximum number of concurrency scaling clusters configured from the parameter group.|
| **aws.redshift.network_receive_throughput** <br>(rate) | The rate at which the node or cluster receives data.<br>_Shown as byte_ |
| **aws.redshift.network_transmit_throughput** <br>(rate) | The rate at which the node or cluster writes data.<br>_Shown as byte_ |
| **aws.redshift.num_exceeded_schema_quotas** <br>(count) | The number of schemas with exceeded quotas.|
| **aws.redshift.percentage_disk_space_used** <br>(gauge) | The percent of disk space used.<br>_Shown as percent_ |
| **aws.redshift.percentage_quota_used** <br>(gauge) | The percentage of disk or storage space used relative to the configured schema quota.<br>_Shown as percent_ |
| **aws.redshift.queries_completed_per_second** <br>(count) | The average number of queries completed per second. Reported in five-minute intervals.<br>_Shown as query_ |
| **aws.redshift.query_duration** <br>(gauge) | The average amount of time to complete a query. Reported in five-minute intervals.<br>_Shown as microsecond_ |
| **aws.redshift.query_runtime_breakdown** <br>(gauge) | AWS Redshift query runtime breakdown|
| **aws.redshift.read_iops** <br>(rate) | The average number of disk read operations per second.<br>_Shown as operation_ |
| **aws.redshift.read_latency** <br>(gauge) | The average amount of time taken for disk read I/O operations.<br>_Shown as second_ |
| **aws.redshift.read_throughput** <br>(rate) | The average number of bytes read from disk per second.<br>_Shown as byte_ |
| **aws.redshift.schema_quota** <br>(gauge) | The configured quota for a schema.<br>_Shown as byte_ |
| **aws.redshift.storage_used** <br>(gauge) | The disk or storage space used by a schema.<br>_Shown as byte_ |
| **aws.redshift.total_table_count** <br>(count) | The number of user tables open at a particular point in time. This total does not include Spectrum tables.<br>_Shown as table_ |
| **aws.redshift.wlmqueries_completed_per_second** <br>(count) | The average number of queries completed per second for a workload management (WLM) queue. Reported in five-minute intervals.<br>_Shown as query_ |
| **aws.redshift.wlmquery_duration** <br>(gauge) | The average length of time to complete a query for a workload management (WLM) queue. Reported in five-minute intervals.<br>_Shown as microsecond_ |
| **aws.redshift.wlmqueue_length** <br>(count) | The number of queries waiting to enter a workload management (WLM) queue.<br>_Shown as query_ |
| **aws.redshift.wlmqueue_wait_time** <br>(gauge) | The total time queries spent waiting in the workload management (WLM) queue.<br>_Shown as millisecond_ |
| **aws.redshift.wlmrunning_queries** <br>(count) | The number of queries running from both the main cluster and Concurrency Scaling cluster per WLM queue.<br>_Shown as query_ |
| **aws.redshift.write_iops** <br>(rate) | The average number of write operations per second.<br>_Shown as operation_ |
| **aws.redshift.write_latency** <br>(gauge) | The average amount of time taken for disk write I/O operations.<br>_Shown as second_ |
| **aws.redshift.write_throughput** <br>(rate) | The average number of bytes written to disk per second.<br>_Shown as byte_ |

AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

Amazon Redshift インテグレーションには、イベントは含まれません。

### サービス チェック

Amazon Redshift インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。