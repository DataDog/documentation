---
aliases:
- /ja/integrations/amazon_dynamodb
app_id: amazon-dynamodb
categories:
- aws
- metrics
- cloud
custom_kind: integration
description: Amazon DynamoDB は、高速で柔軟な NoSQL データベース サービスです
integration_version: 1.0.0
media: []
title: Amazon DynamoDB
---
![DynamoDB デフォルト ダッシュボード](images/dynamodb.png)

## 概要

Amazon DynamoDB は、AWS のサービス群に含まれるフル マネージド型の NoSQL データベース クラウド サービスです。高速でスケーラビリティにも優れ、大量のデータを扱う場合でも極めて低いレイテンシーが求められるアプリケーション向けに設計されています。ドキュメント モデルとキー バリュー ストア モデルの両方をサポートしており、データベースと分散ハッシュ テーブルの両方の特性を備えています。

## セットアップ

### インストール

まだ設定していない場合は、[Amazon Web Services インテグレーション](https://docs.datadoghq.com/integrations/amazon_web_services/) を設定してください。

### メトリクス収集

1. [AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services) の `Metric Collection` タブで、`DynamoDB` が有効になっていることを確認します。

1. Amazon DynamoDB のメトリクスを収集するには、[Datadog IAM ポリシー](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) に次の権限を追加します:

   - `dynamodb:ListTables`: 利用可能な DynamoDB テーブルを一覧表示するために使用します。
   - `dynamodb:DescribeTable`: テーブル サイズとアイテム数のメトリクスを追加するために使用します。
   - `dynamodb:ListTagsOfResource`: DynamoDB リソースに付与されたすべてのタグを収集するために使用します。

   詳しくは、AWS サイトの [DynamoDB ポリシー](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/authentication-and-access-control.html) を参照してください。

1. [Datadog - Amazon DynamoDB インテグレーション](https://app.datadoghq.com/integrations/amazon-dynamodb) をインストールします。

### ログ収集

#### ログを有効にする

AWS CloudTrail で [Trail を作成し](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html)、ログの書き込み先として S3 バケットを選択します。

#### ログを Datadog に送信する

1. まだ設定していない場合は、AWS アカウントで [Datadog Forwarder Lambda 関数](https://docs.datadoghq.com/logs/guide/forwarder/) を設定してください。
1. 設定が完了したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで **Add Trigger** をクリックします。
1. Trigger Configuration では **S3** トリガーを選択します。
1. Amazon DynamoDB のログが保存されている S3 バケットを選択します。
1. イベント タイプは `All object create events` のままにします。
1. **Add** をクリックして、Lambda にトリガーを追加します。

[Log Explorer](https://app.datadoghq.com/logs) を開いて、ログの確認を開始します。

AWS Services のログ収集について詳しくは、[Datadog Lambda 関数で AWS Services Logs を送信する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/) を参照してください。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.dynamodb.account_max_reads** <br>(count) | アカウントで使用できる読み取りキャパシティ ユニットの最大数<br>_単位は read_ |
| **aws.dynamodb.account_max_table_level_reads** <br>(count) | アカウント内のテーブル、またはグローバル セカンダリ インデックスで使用できる読み取りキャパシティ ユニットの最大数<br>_単位は read_ |
| **aws.dynamodb.account_max_table_level_writes** <br>(count) | アカウント内のテーブル、またはグローバル セカンダリ インデックスで使用できる書き込みキャパシティ ユニットの最大数<br>_単位は write_ |
| **aws.dynamodb.account_max_writes** <br>(count) | アカウントで使用できる書き込みキャパシティ ユニットの最大数<br>_単位は write_ |
| **aws.dynamodb.account_provisioned_read_capacity_utilization** <br>(gauge) | アカウントにおけるプロビジョニング済み読み取りキャパシティ ユニットの使用率<br>_単位は percent_ |
| **aws.dynamodb.account_provisioned_write_capacity_utilization** <br>(gauge) | アカウントにおけるプロビジョニング済み書き込みキャパシティ ユニットの使用率<br>_単位は percent_ |
| **aws.dynamodb.conditional_check_failed_requests** <br>(count) | 条件付き書き込みの失敗回数<br>_単位は request_ |
| **aws.dynamodb.consumed_read_capacity_units** <br>(gauge) | 1 秒あたりに消費された読み取りキャパシティ ユニットの平均数。プロビジョニング済み読み取りキャパシティ ユニット数と直接比較できます。<br>_単位は unit_ |
| **aws.dynamodb.consumed_write_capacity_units** <br>(gauge) | 1 秒あたりに消費された書き込みキャパシティ ユニットの平均数。プロビジョニング済み書き込みキャパシティ ユニット数と直接比較できます。<br>_単位は unit_ |
| **aws.dynamodb.max_provisioned_table_read_capacity_utilization** <br>(gauge) | アカウント内で最も大きな読み取りキャパシティがプロビジョニングされているテーブル、またはグローバル セカンダリ インデックスにおける、プロビジョニング済み読み取りキャパシティ ユニットの使用率<br>_単位は unit_ |
| **aws.dynamodb.max_provisioned_table_write_capacity_utilization** <br>(gauge) | アカウント内で最も大きな書き込みキャパシティがプロビジョニングされているテーブル、またはグローバル セカンダリ インデックスにおける、プロビジョニング済み書き込みキャパシティ ユニットの使用率<br>_単位は unit_ |
| **aws.dynamodb.online_index_consumed_write_capacity** <br>(gauge) | テーブルに新しいグローバル セカンダリ インデックスを追加する際に消費された書き込みキャパシティ ユニット数<br>_単位は unit_ |
| **aws.dynamodb.online_index_percentage_progress** <br>(gauge) | テーブルに新しいグローバル セカンダリ インデックスを追加している際の進捗率<br>_単位は percent_ |
| **aws.dynamodb.online_index_throttle_events** <br>(gauge) | テーブルに新しいグローバル セカンダリ インデックスを追加している際に発生した書き込みスロットリング イベント数<br>_単位は event_ |
| **aws.dynamodb.pending_replication_count** <br>(count) | (このメトリクスは DynamoDB グローバル テーブル向けです。) あるレプリカ テーブルには書き込まれたものの、グローバル テーブル内の別のレプリカにはまだ書き込まれていないアイテム更新数<br>_単位は unit_ |
| **aws.dynamodb.provisioned_read_capacity_units** <br>(gauge) | テーブル、またはグローバル セカンダリ インデックスに対してプロビジョニングされた読み取りキャパシティ ユニット数<br>_単位は unit_ |
| **aws.dynamodb.provisioned_write_capacity_units** <br>(gauge) | テーブル、またはグローバル セカンダリ インデックスに対してプロビジョニングされた書き込みキャパシティ ユニット数<br>_単位は unit_ |
| **aws.dynamodb.read_throttle_events** <br>(count) | 指定期間中に、設定済みのプロビジョニング スループット上限を超えた読み取りイベント数<br>_単位は read_ |
| **aws.dynamodb.replication_latency** <br>(gauge) | (このメトリクスは DynamoDB グローバル テーブル向けです。) あるレプリカ テーブルの DynamoDB Streams に更新済みアイテムが現れてから、そのアイテムがグローバル テーブル内の別のレプリカに現れるまでの経過時間<br>_単位は millisecond_ |
| **aws.dynamodb.returned_bytes** <br>(gauge) | 指定期間中に GetRecords 操作 (Amazon DynamoDB Streams) で返されたバイト数<br>_単位は byte_ |
| **aws.dynamodb.returned_item_count** <br>(gauge) | scan または query 操作で返されたアイテム数の平均<br>_単位は item_ |
| **aws.dynamodb.returned_item_count.maximum** <br>(gauge) | scan または query 操作で返されたアイテム数の最大値<br>_単位は item_ |
| **aws.dynamodb.returned_item_count.minimum** <br>(gauge) | scan または query 操作で返されたアイテム数の最小値<br>_単位は item_ |
| **aws.dynamodb.returned_item_count.samplecount** <br>(count) | scan または query 操作の回数<br>_単位は item_ |
| **aws.dynamodb.returned_item_count.sum** <br>(count) | scan または query 操作で返されたアイテム総数<br>_単位は item_ |
| **aws.dynamodb.returned_records_count** <br>(count) | 指定期間中に GetRecords 操作 (Amazon DynamoDB Streams) で返されたストリーム レコード数<br>_単位は item_ |
| **aws.dynamodb.successful_request_latency** <br>(gauge) | 成功したリクエストの平均レイテンシー<br>_単位は millisecond_ |
| **aws.dynamodb.successful_request_latency.maximum** <br>(gauge) | 成功したリクエストの最大レイテンシー<br>_単位は millisecond_ |
| **aws.dynamodb.successful_request_latency.minimum** <br>(gauge) | 成功したリクエストの最小レイテンシー<br>_単位は millisecond_ |
| **aws.dynamodb.successful_request_latency.samplecount** <br>(count) | 成功したリクエスト総数<br>_単位は request_ |
| **aws.dynamodb.system_errors** <br>(count) | 500 ステータス コードのレスポンスを返したリクエスト数<br>_単位は request_ |
| **aws.dynamodb.throttled_requests** <br>(count) | 設定済みのプロビジョニング スループット上限を超えたユーザー リクエスト数<br>_単位は request_ |
| **aws.dynamodb.time_to_live_deleted_item_count** <br>(count) | 指定期間中に Time To Live (TTL) によって削除されたアイテム数<br>_単位は item_ |
| **aws.dynamodb.transaction_conflict** <br>(count) | 同じアイテムに対する同時リクエスト間のトランザクション競合によって拒否されたアイテム レベル リクエスト数<br>_単位は request_ |
| **aws.dynamodb.user_errors** <br>(count) | 現在のリージョンおよび AWS アカウントにおける、DynamoDB または Amazon DynamoDB Streams へのリクエストで発生した HTTP 400 エラーの合計<br>_単位は request_ |
| **aws.dynamodb.write_throttle_events** <br>(count) | 指定期間中に、設定済みのプロビジョニング スループット上限を超えた書き込みイベント数<br>_単位は write_ |
| **aws.dynamodb.global_secondary_indexes.index_size_bytes** <br>(gauge) | 指定したセカンダリ インデックスの総サイズ<br>_単位は byte_ |
| **aws.dynamodb.global_secondary_indexes.item_count** <br>(gauge) | 指定したセカンダリ インデックス内のアイテム数<br>_単位は item_ |
| **aws.dynamodb.item_count** <br>(gauge) | テーブル内のおおよそのアイテム数 (6 時間ごとに更新)<br>_単位は item_ |
| **aws.dynamodb.table_size** <br>(gauge) | テーブルのおおよそのサイズ (6 時間ごとに更新)<br>_単位は byte_ |

AWS から取得した各メトリクスには、AWS console に表示されるものと同じタグが付与されます。これには host name、security-groups などが含まれますが、これらに限りません。

### イベント

Amazon DynamoDB インテグレーションにはイベントは含まれません。

### サービス チェック

Amazon DynamoDB インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。