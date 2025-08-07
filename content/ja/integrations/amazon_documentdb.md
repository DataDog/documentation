---
app_id: amazon_documentdb
categories:
- クラウド
- data stores
- aws
- log collection
custom_kind: integration
description: Amazon DocumentDB のメトリクスとログを監視
further_reading:
- link: https://www.datadoghq.com/blog/monitor-documentdb-with-datadog/
  tag: ブログ
  text: Amazon DocumentDB のメトリクスとログを Datadog で収集
title: Amazon DocumentDB
---
## 概要

Amazon DocumentDB は、MongoDB のワークロードをサポートする、高速で、スケーラブル、高可用性、フルマネージド型のドキュメントデータベースサービスです。

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration](https://docs.datadoghq.com/integrations/amazon_web_services/) first.

### メトリクスの収集

1. In the [AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services), ensure that `DocumentDB` is enabled under the `Metric Collection` tab.
1. Install the [Datadog - Amazon DocumentDB integration](https://app.datadoghq.com/integrations/amazon-documentdb).

### ログ収集

#### ログの有効化

Amazon DocumentDB から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_documentdb` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. If you haven’t already, set up the [Datadog Forwarder Lambda function](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Lambda 関数がインストールされたら、AWS コンソールから、Amazon DocumentDB ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

   - [Add a manual trigger on the S3 bucket](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Add a manual trigger on the CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.docdb.backup_retention_period_storage_used** <br>(gauge) | Average backup storage in GiB used to support the point-in-time restore feature within the rention window.<br>_Shown as gibibyte_ |
| **aws.docdb.backup_retention_period_storage_used.maximum** <br>(gauge) | Maximum backup storage in GiB used to support the point-in-time restore feature within the rention window.<br>_Shown as gibibyte_ |
| **aws.docdb.backup_retention_period_storage_used.minimum** <br>(gauge) | Minimum backup storage in GiB used to support the point-in-time restore feature within the rention window.<br>_Shown as gibibyte_ |
| **aws.docdb.backup_retention_period_storage_used.samplecount** <br>(gauge) | Sample count of backup storage in GiB used to support the point-in-time restore feature within the rention window.<br>_Shown as gibibyte_ |
| **aws.docdb.backup_retention_period_storage_used.sum** <br>(gauge) | Total backup storage in GiB used to support the point-in-time restore feature within the rention window.<br>_Shown as gibibyte_ |
| **aws.docdb.buffer_cache_hit_ratio** <br>(gauge) | Average percentage of requests that are served by the buffer cache.|
| **aws.docdb.buffer_cache_hit_ratio.maximum** <br>(gauge) | Maximum percentage of requests that are served by the buffer cache.|
| **aws.docdb.buffer_cache_hit_ratio.minimum** <br>(gauge) | Minimum percentage of requests that are served by the buffer cache.|
| **aws.docdb.buffer_cache_hit_ratio.samplecount** <br>(gauge) | Sample count of percentage of requests that are served by the buffer cache.|
| **aws.docdb.buffer_cache_hit_ratio.sum** <br>(gauge) | Sum of the percentage of requests that are served by the buffer cache.|
| **aws.docdb.change_stream_log_size** <br>(gauge) | The amount of storage used by your cluster to store the change stream log in megabytes.<br>_Shown as mebibyte_ |
| **aws.docdb.change_stream_log_size.average** <br>(gauge) | The amount of storage used by your cluster to store the change stream log in megabytes.<br>_Shown as mebibyte_ |
| **aws.docdb.change_stream_log_size.maximum** <br>(gauge) | The amount of storage used by your cluster to store the change stream log in megabytes.<br>_Shown as mebibyte_ |
| **aws.docdb.change_stream_log_size.minimum** <br>(gauge) | The amount of storage used by your cluster to store the change stream log in megabytes.<br>_Shown as mebibyte_ |
| **aws.docdb.change_stream_log_size.samplecount** <br>(gauge) | The amount of storage used by your cluster to store the change stream log in megabytes.<br>_Shown as mebibyte_ |
| **aws.docdb.change_stream_log_size.sum** <br>(gauge) | The amount of storage used by your cluster to store the change stream log in megabytes.<br>_Shown as mebibyte_ |
| **aws.docdb.cpucredit_balance** <br>(gauge) | The number of CPU credits that an instance has accrued. This balance is depleted when the CPU bursts and CPU credits are spent more quickly than they are earned.|
| **aws.docdb.cpucredit_balance.average** <br>(gauge) | The number of CPU credits that an instance has accrued. This balance is depleted when the CPU bursts and CPU credits are spent more quickly than they are earned.|
| **aws.docdb.cpucredit_balance.maximum** <br>(gauge) | The number of CPU credits that an instance has accrued. This balance is depleted when the CPU bursts and CPU credits are spent more quickly than they are earned.|
| **aws.docdb.cpucredit_balance.minimum** <br>(gauge) | The number of CPU credits that an instance has accrued. This balance is depleted when the CPU bursts and CPU credits are spent more quickly than they are earned.|
| **aws.docdb.cpucredit_balance.samplecount** <br>(gauge) | The number of CPU credits that an instance has accrued. This balance is depleted when the CPU bursts and CPU credits are spent more quickly than they are earned.|
| **aws.docdb.cpucredit_balance.sum** <br>(gauge) | The number of CPU credits that an instance has accrued. This balance is depleted when the CPU bursts and CPU credits are spent more quickly than they are earned.|
| **aws.docdb.cpucredit_usage** <br>(count) | The number of CPU credits spent during the measurement period.|
| **aws.docdb.cpucredit_usage.average** <br>(count) | The number of CPU credits spent during the measurement period.|
| **aws.docdb.cpucredit_usage.maximum** <br>(count) | The number of CPU credits spent during the measurement period.|
| **aws.docdb.cpucredit_usage.minimum** <br>(count) | The number of CPU credits spent during the measurement period.|
| **aws.docdb.cpucredit_usage.samplecount** <br>(count) | The number of CPU credits spent during the measurement period.|
| **aws.docdb.cpucredit_usage.sum** <br>(count) | The number of CPU credits spent during the measurement period.|
| **aws.docdb.cpusurplus_credit_balance** <br>(gauge) | The number of surplus CPU credits spent to sustain CPU performance when the CPUCreditBalance value is zero.|
| **aws.docdb.cpusurplus_credit_balance.average** <br>(gauge) | The number of surplus CPU credits spent to sustain CPU performance when the CPUCreditBalance value is zero.|
| **aws.docdb.cpusurplus_credit_balance.maximum** <br>(gauge) | The number of surplus CPU credits spent to sustain CPU performance when the CPUCreditBalance value is zero.|
| **aws.docdb.cpusurplus_credit_balance.minimum** <br>(gauge) | The number of surplus CPU credits spent to sustain CPU performance when the CPUCreditBalance value is zero.|
| **aws.docdb.cpusurplus_credit_balance.samplecount** <br>(gauge) | The number of surplus CPU credits spent to sustain CPU performance when the CPUCreditBalance value is zero.|
| **aws.docdb.cpusurplus_credit_balance.sum** <br>(gauge) | The number of surplus CPU credits spent to sustain CPU performance when the CPUCreditBalance value is zero.|
| **aws.docdb.cpusurplus_credits_charged** <br>(count) | The number of surplus CPU credits exceeding the maximum number of CPU credits that can be earned in a 24-hour period, and thus attracting an additional charge.|
| **aws.docdb.cpusurplus_credits_charged.average** <br>(count) | The number of surplus CPU credits exceeding the maximum number of CPU credits that can be earned in a 24-hour period, and thus attracting an additional charge.|
| **aws.docdb.cpusurplus_credits_charged.maximum** <br>(count) | The number of surplus CPU credits exceeding the maximum number of CPU credits that can be earned in a 24-hour period, and thus attracting an additional charge.|
| **aws.docdb.cpusurplus_credits_charged.minimum** <br>(count) | The number of surplus CPU credits exceeding the maximum number of CPU credits that can be earned in a 24-hour period, and thus attracting an additional charge.|
| **aws.docdb.cpusurplus_credits_charged.samplecount** <br>(count) | The number of surplus CPU credits exceeding the maximum number of CPU credits that can be earned in a 24-hour period, and thus attracting an additional charge.|
| **aws.docdb.cpusurplus_credits_charged.sum** <br>(count) | The number of surplus CPU credits exceeding the maximum number of CPU credits that can be earned in a 24-hour period, and thus attracting an additional charge.|
| **aws.docdb.cpuutilization** <br>(gauge) | Average percentage of CPU used by an instance.|
| **aws.docdb.cpuutilization.maximum** <br>(gauge) | Maximum percentage of CPU used by an instance.|
| **aws.docdb.cpuutilization.minimum** <br>(gauge) | Minimum percentage of CPU used by an instance.|
| **aws.docdb.cpuutilization.samplecount** <br>(gauge) | Sample count of the percentage of CPU used by an instance.|
| **aws.docdb.cpuutilization.sum** <br>(gauge) | Sum of the percentage of CPU used by an instance.|
| **aws.docdb.database_connections** <br>(gauge) | The average number of connections to an instance.|
| **aws.docdb.database_connections.maximum** <br>(gauge) | The maximum number of connections to an instance.|
| **aws.docdb.database_connections.minimum** <br>(gauge) | The minimum number of connections to an instance.|
| **aws.docdb.database_connections.samplecount** <br>(gauge) | Sample count of the number of connections to an instance.|
| **aws.docdb.database_connections.sum** <br>(gauge) | The sum of the number of connections to an instance.|
| **aws.docdb.database_connections_max** <br>(gauge) | The maximum number of open database connections on an instance in a one-minute period.|
| **aws.docdb.database_connections_max.average** <br>(gauge) | The maximum number of open database connections on an instance in a one-minute period.|
| **aws.docdb.database_connections_max.maximum** <br>(gauge) | The maximum number of open database connections on an instance in a one-minute period.|
| **aws.docdb.database_connections_max.minimum** <br>(gauge) | The maximum number of open database connections on an instance in a one-minute period.|
| **aws.docdb.database_connections_max.samplecount** <br>(gauge) | The maximum number of open database connections on an instance in a one-minute period.|
| **aws.docdb.database_connections_max.sum** <br>(gauge) | The maximum number of open database connections on an instance in a one-minute period.|
| **aws.docdb.database_cursors** <br>(gauge) | The number of cursors open on an instance taken at a one-minute frequency.|
| **aws.docdb.database_cursors.average** <br>(gauge) | The number of cursors open on an instance taken at a one-minute frequency.|
| **aws.docdb.database_cursors.maximum** <br>(gauge) | The number of cursors open on an instance taken at a one-minute frequency.|
| **aws.docdb.database_cursors.minimum** <br>(gauge) | The number of cursors open on an instance taken at a one-minute frequency.|
| **aws.docdb.database_cursors.samplecount** <br>(gauge) | The number of cursors open on an instance taken at a one-minute frequency.|
| **aws.docdb.database_cursors.sum** <br>(gauge) | The number of cursors open on an instance taken at a one-minute frequency.|
| **aws.docdb.database_cursors_max** <br>(gauge) | The maximum number of open cursors on an instance in a one-minute period.|
| **aws.docdb.database_cursors_max.average** <br>(gauge) | The maximum number of open cursors on an instance in a one-minute period.|
| **aws.docdb.database_cursors_max.maximum** <br>(gauge) | The maximum number of open cursors on an instance in a one-minute period.|
| **aws.docdb.database_cursors_max.minimum** <br>(gauge) | The maximum number of open cursors on an instance in a one-minute period.|
| **aws.docdb.database_cursors_max.samplecount** <br>(gauge) | The maximum number of open cursors on an instance in a one-minute period.|
| **aws.docdb.database_cursors_max.sum** <br>(gauge) | The maximum number of open cursors on an instance in a one-minute period.|
| **aws.docdb.database_cursors_timed_out** <br>(gauge) | The number of cursors that timed out in a one-minute period.|
| **aws.docdb.database_cursors_timed_out.average** <br>(gauge) | The number of cursors that timed out in a one-minute period.|
| **aws.docdb.database_cursors_timed_out.maximum** <br>(gauge) | The number of cursors that timed out in a one-minute period.|
| **aws.docdb.database_cursors_timed_out.minimum** <br>(gauge) | The number of cursors that timed out in a one-minute period.|
| **aws.docdb.database_cursors_timed_out.samplecount** <br>(gauge) | The number of cursors that timed out in a one-minute period.|
| **aws.docdb.database_cursors_timed_out.sum** <br>(gauge) | The number of cursors that timed out in a one-minute period.|
| **aws.docdb.db_instance_replica_lag** <br>(gauge) | The average amount of lag when replicating updates from the primary instance of a replica.<br>_Shown as millisecond_ |
| **aws.docdb.db_instance_replica_lag.maximum** <br>(gauge) | The maximum amount of lag when replicating updates from the primary instance of a replica.<br>_Shown as millisecond_ |
| **aws.docdb.db_instance_replica_lag.minimum** <br>(gauge) | The minimum amount of lag when replicating updates from the primary instance of a replica.<br>_Shown as millisecond_ |
| **aws.docdb.db_instance_replica_lag.samplecount** <br>(gauge) | Sample count of the amount of lag when replicating updates from the primary instance of a replica.<br>_Shown as millisecond_ |
| **aws.docdb.db_instance_replica_lag.sum** <br>(gauge) | The sum of the amount of lag when replicating updates from the primary instance of a replica.<br>_Shown as millisecond_ |
| **aws.docdb.dbcluster_replica_lag_maximum** <br>(gauge) | The maximum amount of lag, in milliseconds, between the primary instance and each Amazon DocumentDB instance in the cluster.<br>_Shown as millisecond_ |
| **aws.docdb.dbcluster_replica_lag_maximum.average** <br>(gauge) | The maximum amount of lag, in milliseconds, between the primary instance and each Amazon DocumentDB instance in the cluster.<br>_Shown as millisecond_ |
| **aws.docdb.dbcluster_replica_lag_maximum.maximum** <br>(gauge) | The maximum amount of lag, in milliseconds, between the primary instance and each Amazon DocumentDB instance in the cluster.<br>_Shown as millisecond_ |
| **aws.docdb.dbcluster_replica_lag_maximum.minimum** <br>(gauge) | The maximum amount of lag, in milliseconds, between the primary instance and each Amazon DocumentDB instance in the cluster.<br>_Shown as millisecond_ |
| **aws.docdb.dbcluster_replica_lag_maximum.samplecount** <br>(gauge) | The maximum amount of lag, in milliseconds, between the primary instance and each Amazon DocumentDB instance in the cluster.<br>_Shown as millisecond_ |
| **aws.docdb.dbcluster_replica_lag_maximum.sum** <br>(gauge) | The maximum amount of lag, in milliseconds, between the primary instance and each Amazon DocumentDB instance in the cluster.<br>_Shown as millisecond_ |
| **aws.docdb.dbcluster_replica_lag_minimum** <br>(gauge) | The minimum amount of lag, in milliseconds, between the primary instance and each replica instance in the cluster.<br>_Shown as millisecond_ |
| **aws.docdb.dbcluster_replica_lag_minimum.average** <br>(gauge) | The minimum amount of lag, in milliseconds, between the primary instance and each replica instance in the cluster.<br>_Shown as millisecond_ |
| **aws.docdb.dbcluster_replica_lag_minimum.maximum** <br>(gauge) | The minimum amount of lag, in milliseconds, between the primary instance and each replica instance in the cluster.<br>_Shown as millisecond_ |
| **aws.docdb.dbcluster_replica_lag_minimum.minimum** <br>(gauge) | The minimum amount of lag, in milliseconds, between the primary instance and each replica instance in the cluster.<br>_Shown as millisecond_ |
| **aws.docdb.dbcluster_replica_lag_minimum.samplecount** <br>(gauge) | The minimum amount of lag, in milliseconds, between the primary instance and each replica instance in the cluster.<br>_Shown as millisecond_ |
| **aws.docdb.dbcluster_replica_lag_minimum.sum** <br>(gauge) | The minimum amount of lag, in milliseconds, between the primary instance and each replica instance in the cluster.<br>_Shown as millisecond_ |
| **aws.docdb.disk_queue_depth** <br>(gauge) | The number of outstanding read/write requests waiting to access the disk.|
| **aws.docdb.disk_queue_depth.maximum** <br>(gauge) | The maximum number of outstanding read/write requests waiting to access the disk.|
| **aws.docdb.disk_queue_depth.minimum** <br>(gauge) | The minimum of the number of outstanding read/write requests waiting to access the disk.|
| **aws.docdb.disk_queue_depth.samplecount** <br>(gauge) | Sample count of the number of outstanding read/write requests waiting to access the disk.|
| **aws.docdb.disk_queue_depth.sum** <br>(gauge) | The sum of the number of outstanding read/write requests waiting to access the disk.|
| **aws.docdb.documents_deleted** <br>(count) | The number of deleted documents in a one-minute period.|
| **aws.docdb.documents_deleted.average** <br>(count) | The number of deleted documents in a one-minute period.|
| **aws.docdb.documents_deleted.maximum** <br>(count) | The number of deleted documents in a one-minute period.|
| **aws.docdb.documents_deleted.minimum** <br>(count) | The number of deleted documents in a one-minute period.|
| **aws.docdb.documents_deleted.samplecount** <br>(count) | The number of deleted documents in a one-minute period.|
| **aws.docdb.documents_deleted.sum** <br>(count) | The number of deleted documents in a one-minute period.|
| **aws.docdb.documents_inserted** <br>(count) | The number of inserted documents in a one-minute period.|
| **aws.docdb.documents_inserted.average** <br>(count) | The number of inserted documents in a one-minute period.|
| **aws.docdb.documents_inserted.maximum** <br>(count) | The number of inserted documents in a one-minute period.|
| **aws.docdb.documents_inserted.minimum** <br>(count) | The number of inserted documents in a one-minute period.|
| **aws.docdb.documents_inserted.samplecount** <br>(count) | The number of inserted documents in a one-minute period.|
| **aws.docdb.documents_inserted.sum** <br>(count) | The number of inserted documents in a one-minute period.|
| **aws.docdb.documents_returned** <br>(count) | The number of returned documents in a one-minute period.|
| **aws.docdb.documents_returned.average** <br>(count) | The number of returned documents in a one-minute period.|
| **aws.docdb.documents_returned.maximum** <br>(count) | The number of returned documents in a one-minute period.|
| **aws.docdb.documents_returned.minimum** <br>(count) | The number of returned documents in a one-minute period.|
| **aws.docdb.documents_returned.samplecount** <br>(count) | The number of returned documents in a one-minute period.|
| **aws.docdb.documents_returned.sum** <br>(count) | The number of returned documents in a one-minute period.|
| **aws.docdb.documents_updated** <br>(count) | The number of updated documents in a one-minute period.|
| **aws.docdb.documents_updated.average** <br>(count) | The number of updated documents in a one-minute period.|
| **aws.docdb.documents_updated.maximum** <br>(count) | The number of updated documents in a one-minute period.|
| **aws.docdb.documents_updated.minimum** <br>(count) | The number of updated documents in a one-minute period.|
| **aws.docdb.documents_updated.samplecount** <br>(count) | The number of updated documents in a one-minute period.|
| **aws.docdb.documents_updated.sum** <br>(count) | The number of updated documents in a one-minute period.|
| **aws.docdb.engine_uptime** <br>(gauge) | The amount of time that the instance has been running.<br>_Shown as second_ |
| **aws.docdb.engine_uptime.maximum** <br>(gauge) | The maximum amount of time that the instance has been running.<br>_Shown as second_ |
| **aws.docdb.engine_uptime.minimum** <br>(gauge) | The minimum amount of time that the instance has been running.<br>_Shown as second_ |
| **aws.docdb.engine_uptime.samplecount** <br>(gauge) | Sample count of the amount of time that the instance has been running.<br>_Shown as second_ |
| **aws.docdb.engine_uptime.sum** <br>(gauge) | The sum of the amount of time that the instance has been running.<br>_Shown as second_ |
| **aws.docdb.free_local_storage** <br>(gauge) | The amount of storage available to each instance for temporary tables and logs.|
| **aws.docdb.free_local_storage.maximum** <br>(gauge) | The maximum amount of storage available to each instance for temporary tables and logs.|
| **aws.docdb.free_local_storage.minimum** <br>(gauge) | The minimum amount of storage available to each instance for temporary tables and logs.|
| **aws.docdb.free_local_storage.samplecount** <br>(gauge) | Sample count of the amount of storage available to each instance for temporary tables and logs.|
| **aws.docdb.free_local_storage.sum** <br>(gauge) | The sum of the amount of storage available to each instance for temporary tables and logs.|
| **aws.docdb.freeable_memory** <br>(gauge) | The amount of available random access memory.<br>_Shown as byte_ |
| **aws.docdb.freeable_memory.maximum** <br>(gauge) | The maximum amount of available random access memory.<br>_Shown as byte_ |
| **aws.docdb.freeable_memory.minimum** <br>(gauge) | The minimum amount of available random access memory.<br>_Shown as byte_ |
| **aws.docdb.freeable_memory.samplecount** <br>(gauge) | Sample count of the amount of available random access memory.<br>_Shown as byte_ |
| **aws.docdb.freeable_memory.sum** <br>(gauge) | The sum of the amount of available random access memory.<br>_Shown as byte_ |
| **aws.docdb.index_buffer_cache_hit_ratio** <br>(gauge) | The percentage of index requests that are served by the buffer cache.|
| **aws.docdb.index_buffer_cache_hit_ratio.average** <br>(gauge) | The percentage of index requests that are served by the buffer cache.|
| **aws.docdb.index_buffer_cache_hit_ratio.maximum** <br>(gauge) | The percentage of index requests that are served by the buffer cache.|
| **aws.docdb.index_buffer_cache_hit_ratio.minimum** <br>(gauge) | The percentage of index requests that are served by the buffer cache.|
| **aws.docdb.index_buffer_cache_hit_ratio.samplecount** <br>(gauge) | The percentage of index requests that are served by the buffer cache.|
| **aws.docdb.index_buffer_cache_hit_ratio.sum** <br>(gauge) | The percentage of index requests that are served by the buffer cache.|
| **aws.docdb.low_mem_num_operations_throttled** <br>(count) | The number of requests that are throttled due to low available memory in a one-minute period.|
| **aws.docdb.low_mem_num_operations_throttled.average** <br>(count) | The number of requests that are throttled due to low available memory in a one-minute period.|
| **aws.docdb.low_mem_num_operations_throttled.maximum** <br>(count) | The number of requests that are throttled due to low available memory in a one-minute period.|
| **aws.docdb.low_mem_num_operations_throttled.minimum** <br>(count) | The number of requests that are throttled due to low available memory in a one-minute period.|
| **aws.docdb.low_mem_num_operations_throttled.samplecount** <br>(count) | The number of requests that are throttled due to low available memory in a one-minute period.|
| **aws.docdb.low_mem_num_operations_throttled.sum** <br>(count) | The number of requests that are throttled due to low available memory in a one-minute period.|
| **aws.docdb.low_mem_throttle_max_queue_depth** <br>(gauge) | The maximum queue depth for requests that are throttled due to low available memory in a one-minute period.|
| **aws.docdb.low_mem_throttle_max_queue_depth.average** <br>(gauge) | The maximum queue depth for requests that are throttled due to low available memory in a one-minute period.|
| **aws.docdb.low_mem_throttle_max_queue_depth.maximum** <br>(gauge) | The maximum queue depth for requests that are throttled due to low available memory in a one-minute period.|
| **aws.docdb.low_mem_throttle_max_queue_depth.minimum** <br>(gauge) | The maximum queue depth for requests that are throttled due to low available memory in a one-minute period.|
| **aws.docdb.low_mem_throttle_max_queue_depth.samplecount** <br>(gauge) | The maximum queue depth for requests that are throttled due to low available memory in a one-minute period.|
| **aws.docdb.low_mem_throttle_max_queue_depth.sum** <br>(gauge) | The maximum queue depth for requests that are throttled due to low available memory in a one-minute period.|
| **aws.docdb.low_mem_throttle_queue_depth** <br>(gauge) | The queue depth for requests that are throttled due to low available memory taken at a one-minute frequency.|
| **aws.docdb.low_mem_throttle_queue_depth.average** <br>(gauge) | The queue depth for requests that are throttled due to low available memory taken at a one-minute frequency.|
| **aws.docdb.low_mem_throttle_queue_depth.maximum** <br>(gauge) | The queue depth for requests that are throttled due to low available memory taken at a one-minute frequency.|
| **aws.docdb.low_mem_throttle_queue_depth.minimum** <br>(gauge) | The queue depth for requests that are throttled due to low available memory taken at a one-minute frequency.|
| **aws.docdb.low_mem_throttle_queue_depth.samplecount** <br>(gauge) | The queue depth for requests that are throttled due to low available memory taken at a one-minute frequency.|
| **aws.docdb.low_mem_throttle_queue_depth.sum** <br>(gauge) | The queue depth for requests that are throttled due to low available memory taken at a one-minute frequency.|
| **aws.docdb.network_receive_throughput** <br>(gauge) | The amount of network throughput both receieved from and transmitted to clients by each instance in a cluster.<br>_Shown as byte_ |
| **aws.docdb.network_receive_throughput.maximum** <br>(gauge) | The maximum amount of network throughput both receieved from and transmitted to clients by each instance in a cluster.<br>_Shown as byte_ |
| **aws.docdb.network_receive_throughput.minimum** <br>(gauge) | The minimum amount of network throughput both receieved from and transmitted to clients by each instance in a cluster.<br>_Shown as byte_ |
| **aws.docdb.network_receive_throughput.samplecount** <br>(gauge) | Sample count of the amount of network throughput both receieved from and transmitted to clients by each instance in a cluster.<br>_Shown as byte_ |
| **aws.docdb.network_receive_throughput.sum** <br>(gauge) | The sum amount of network throughput both receieved from and transmitted to clients by each instance in a cluster.<br>_Shown as byte_ |
| **aws.docdb.network_throughput** <br>(gauge) | The amount of network throughput, in bytes per second, both received from and transmitted to clients by each instance in the Amazon DocumentDB cluster. This throughput doesn't include network traffic between instances in the cluster and the cluster volume.<br>_Shown as byte_ |
| **aws.docdb.network_throughput.maximum** <br>(gauge) | The maximum amount of network throughput, in bytes per second, both received from and transmitted to clients by each instance.<br>_Shown as byte_ |
| **aws.docdb.network_throughput.minimum** <br>(gauge) | The minimum amount of network throughput, in bytes per second, both received from and transmitted to clients by each instance.<br>_Shown as byte_ |
| **aws.docdb.network_throughput.samplecount** <br>(gauge) | Sample count of network throughput both received from and transmitted to clients by each instance.<br>_Shown as byte_ |
| **aws.docdb.network_throughput.sum** <br>(gauge) | The sum of the amount of network throughput, in bytes per second, both received from and transmitted to clients by each instance.<br>_Shown as byte_ |
| **aws.docdb.network_transmit_throughput** <br>(gauge) | The average amount of network throughput sent to clients by each instance in a cluster.<br>_Shown as byte_ |
| **aws.docdb.network_transmit_throughput.maximum** <br>(gauge) | The maximum amount of network throughput sent to clients by each instance in a cluster.<br>_Shown as byte_ |
| **aws.docdb.network_transmit_throughput.minimum** <br>(gauge) | The minimum amount of network throughput sent to clients by each instance in a cluster.<br>_Shown as byte_ |
| **aws.docdb.network_transmit_throughput.samplecount** <br>(gauge) | Sample count of the amount of network throughput sent to clients by each instance in a cluster.<br>_Shown as byte_ |
| **aws.docdb.network_transmit_throughput.sum** <br>(gauge) | The sum of the amount of network throughput sent to clients by each instance in a cluster.<br>_Shown as byte_ |
| **aws.docdb.opcounters_command** <br>(count) | The number of commands issued in a one-minute period.|
| **aws.docdb.opcounters_command.average** <br>(count) | The number of commands issued in a one-minute period.|
| **aws.docdb.opcounters_command.maximum** <br>(count) | The number of commands issued in a one-minute period.|
| **aws.docdb.opcounters_command.minimum** <br>(count) | The number of commands issued in a one-minute period.|
| **aws.docdb.opcounters_command.samplecount** <br>(count) | The number of commands issued in a one-minute period.|
| **aws.docdb.opcounters_command.sum** <br>(count) | The number of commands issued in a one-minute period.|
| **aws.docdb.opcounters_delete** <br>(count) | The number of delete operations issued in a one-minute period.|
| **aws.docdb.opcounters_delete.average** <br>(count) | The number of delete operations issued in a one-minute period.|
| **aws.docdb.opcounters_delete.maximum** <br>(count) | The number of delete operations issued in a one-minute period.|
| **aws.docdb.opcounters_delete.minimum** <br>(count) | The number of delete operations issued in a one-minute period.|
| **aws.docdb.opcounters_delete.samplecount** <br>(count) | The number of delete operations issued in a one-minute period.|
| **aws.docdb.opcounters_delete.sum** <br>(count) | The number of delete operations issued in a one-minute period.|
| **aws.docdb.opcounters_getmore** <br>(count) | The number of getmores issued in a one-minute period.|
| **aws.docdb.opcounters_getmore.average** <br>(count) | The number of getmores issued in a one-minute period.|
| **aws.docdb.opcounters_getmore.maximum** <br>(count) | The number of getmores issued in a one-minute period.|
| **aws.docdb.opcounters_getmore.minimum** <br>(count) | The number of getmores issued in a one-minute period.|
| **aws.docdb.opcounters_getmore.samplecount** <br>(count) | The number of getmores issued in a one-minute period.|
| **aws.docdb.opcounters_getmore.sum** <br>(count) | The number of getmores issued in a one-minute period.|
| **aws.docdb.opcounters_insert** <br>(count) | The number of insert operations issued in a one-minute period.|
| **aws.docdb.opcounters_insert.average** <br>(count) | The number of insert operations issued in a one-minute period.|
| **aws.docdb.opcounters_insert.maximum** <br>(count) | The number of insert operations issued in a one-minute period.|
| **aws.docdb.opcounters_insert.minimum** <br>(count) | The number of insert operations issued in a one-minute period.|
| **aws.docdb.opcounters_insert.samplecount** <br>(count) | The number of insert operations issued in a one-minute period.|
| **aws.docdb.opcounters_insert.sum** <br>(count) | The number of insert operations issued in a one-minute period.|
| **aws.docdb.opcounters_query** <br>(count) | The number of queries issued in a one-minute period.|
| **aws.docdb.opcounters_query.average** <br>(count) | The number of queries issued in a one-minute period.|
| **aws.docdb.opcounters_query.maximum** <br>(count) | The number of queries issued in a one-minute period.|
| **aws.docdb.opcounters_query.minimum** <br>(count) | The number of queries issued in a one-minute period.|
| **aws.docdb.opcounters_query.samplecount** <br>(count) | The number of queries issued in a one-minute period.|
| **aws.docdb.opcounters_query.sum** <br>(count) | The number of queries issued in a one-minute period.|
| **aws.docdb.opcounters_update** <br>(count) | The number of update operations issued in a one-minute period.|
| **aws.docdb.opcounters_update.average** <br>(count) | The number of update operations issued in a one-minute period.|
| **aws.docdb.opcounters_update.maximum** <br>(count) | The number of update operations issued in a one-minute period.|
| **aws.docdb.opcounters_update.minimum** <br>(count) | The number of update operations issued in a one-minute period.|
| **aws.docdb.opcounters_update.samplecount** <br>(count) | The number of update operations issued in a one-minute period.|
| **aws.docdb.opcounters_update.sum** <br>(count) | The number of update operations issued in a one-minute period.|
| **aws.docdb.read_iops** <br>(count) | The number of bytes read from disk per second.|
| **aws.docdb.read_iops.maximum** <br>(count) | The maximum number of bytes read from disk per second.|
| **aws.docdb.read_iops.minimum** <br>(count) | The minimum number of bytes read from disk per second.|
| **aws.docdb.read_iops.samplecount** <br>(count) | Sample count of the number of bytes read from disk per second.|
| **aws.docdb.read_iops.sum** <br>(count) | The sum of the number of bytes read from disk per second.|
| **aws.docdb.read_latency** <br>(gauge) | The average amount of time taken per disk I/O operation.|
| **aws.docdb.read_latency.maximum** <br>(gauge) | The maximum average amount of time taken per disk I/O operation.|
| **aws.docdb.read_latency.minimum** <br>(gauge) | The minimum average amount of time taken per disk I/O operation.|
| **aws.docdb.read_latency.samplecount** <br>(gauge) | Sample count of the average amount of time taken per disk I/O operation.|
| **aws.docdb.read_latency.sum** <br>(gauge) | The sum of the average amount of time taken per disk I/O operation.|
| **aws.docdb.read_throughput** <br>(gauge) | The amount of network throughput both receieved from and transmitted to clients by each instance in a cluster.|
| **aws.docdb.read_throughput.maximum** <br>(gauge) | The maximum amount of network throughput both receieved from and transmitted to clients by each instance in a cluster.|
| **aws.docdb.read_throughput.minimum** <br>(gauge) | The minimum amount of network throughput both receieved from and transmitted to clients by each instance in a cluster.|
| **aws.docdb.read_throughput.samplecount** <br>(gauge) | Sample count of the amount of network throughput both receieved from and transmitted to clients by each instance in a cluster.|
| **aws.docdb.read_throughput.sum** <br>(gauge) | The sum of the amount of network throughput both receieved from and transmitted to clients by each instance in a cluster.|
| **aws.docdb.snapshot_storage_used** <br>(gauge) | The total amount of backup storage consumed by all snapshots for a given cluster outside its backup retention window.<br>_Shown as gibibyte_ |
| **aws.docdb.snapshot_storage_used.maximum** <br>(gauge) | The maximum total amount of backup storage consumed by all snapshots for a given cluster outside its backup retention window.<br>_Shown as gibibyte_ |
| **aws.docdb.snapshot_storage_used.minimum** <br>(gauge) | The minimum total amount of backup storage consumed by all snapshots for a given cluster outside its backup retention window.<br>_Shown as gibibyte_ |
| **aws.docdb.snapshot_storage_used.samplecount** <br>(gauge) | Sample count of the total amount of backup storage consumed by all snapshots for a given cluster outside its backup retention window.<br>_Shown as gibibyte_ |
| **aws.docdb.snapshot_storage_used.sum** <br>(gauge) | The sum of the total amount of backup storage consumed by all snapshots for a given cluster outside its backup retention window.<br>_Shown as gibibyte_ |
| **aws.docdb.swap_usage** <br>(gauge) | The amount of swap space used on the instance.|
| **aws.docdb.swap_usage.maximum** <br>(gauge) | The maximum amount of swap space used on the instance.|
| **aws.docdb.swap_usage.minimum** <br>(gauge) | The minimum amount of swap space used on the instance.|
| **aws.docdb.swap_usage.samplecount** <br>(gauge) | Sample count of the amount of swap space used on the instance.|
| **aws.docdb.swap_usage.sum** <br>(gauge) | The sum of the amount of swap space used on the instance.|
| **aws.docdb.total_backup_storage_billed** <br>(gauge) | The total amount of backup storage for which you are billed for a given cluster.<br>_Shown as gibibyte_ |
| **aws.docdb.total_backup_storage_billed.maximum** <br>(gauge) | The maximum amount of backup storage for which you are billed for a given cluster.<br>_Shown as gibibyte_ |
| **aws.docdb.total_backup_storage_billed.minimum** <br>(gauge) | The minimum amount of backup storage for which you are billed for a given cluster.<br>_Shown as gibibyte_ |
| **aws.docdb.total_backup_storage_billed.samplecount** <br>(gauge) | Sample count of the amount of backup storage for which you are billed for a given cluster.<br>_Shown as gibibyte_ |
| **aws.docdb.total_backup_storage_billed.sum** <br>(gauge) | The sum of the total amount of backup storage for which you are billed for a given cluster.<br>_Shown as gibibyte_ |
| **aws.docdb.transactions_aborted** <br>(count) | The number of transactions aborted on an instance in a one-minute period.|
| **aws.docdb.transactions_aborted.average** <br>(count) | The number of transactions aborted on an instance in a one-minute period.|
| **aws.docdb.transactions_aborted.maximum** <br>(count) | The number of transactions aborted on an instance in a one-minute period.|
| **aws.docdb.transactions_aborted.minimum** <br>(count) | The number of transactions aborted on an instance in a one-minute period.|
| **aws.docdb.transactions_aborted.samplecount** <br>(count) | The number of transactions aborted on an instance in a one-minute period.|
| **aws.docdb.transactions_aborted.sum** <br>(count) | The number of transactions aborted on an instance in a one-minute period.|
| **aws.docdb.transactions_committed** <br>(count) | The number of transactions committed on an instance in a one-minute period.|
| **aws.docdb.transactions_committed.average** <br>(count) | The number of transactions committed on an instance in a one-minute period.|
| **aws.docdb.transactions_committed.maximum** <br>(count) | The number of transactions committed on an instance in a one-minute period.|
| **aws.docdb.transactions_committed.minimum** <br>(count) | The number of transactions committed on an instance in a one-minute period.|
| **aws.docdb.transactions_committed.samplecount** <br>(count) | The number of transactions committed on an instance in a one-minute period.|
| **aws.docdb.transactions_committed.sum** <br>(count) | The number of transactions committed on an instance in a one-minute period.|
| **aws.docdb.transactions_open** <br>(gauge) | The number of transactions open on an instance taken at a one-minute frequency.|
| **aws.docdb.transactions_open.average** <br>(gauge) | The number of transactions open on an instance taken at a one-minute frequency.|
| **aws.docdb.transactions_open.maximum** <br>(gauge) | The number of transactions open on an instance taken at a one-minute frequency.|
| **aws.docdb.transactions_open.minimum** <br>(gauge) | The number of transactions open on an instance taken at a one-minute frequency.|
| **aws.docdb.transactions_open.samplecount** <br>(gauge) | The number of transactions open on an instance taken at a one-minute frequency.|
| **aws.docdb.transactions_open.sum** <br>(gauge) | The number of transactions open on an instance taken at a one-minute frequency.|
| **aws.docdb.transactions_open_max** <br>(gauge) | The maximum number of transactions open on an instance in a one-minute period.|
| **aws.docdb.transactions_open_max.average** <br>(gauge) | The maximum number of transactions open on an instance in a one-minute period.|
| **aws.docdb.transactions_open_max.maximum** <br>(gauge) | The maximum number of transactions open on an instance in a one-minute period.|
| **aws.docdb.transactions_open_max.minimum** <br>(gauge) | The maximum number of transactions open on an instance in a one-minute period.|
| **aws.docdb.transactions_open_max.samplecount** <br>(gauge) | The maximum number of transactions open on an instance in a one-minute period.|
| **aws.docdb.transactions_open_max.sum** <br>(gauge) | The maximum number of transactions open on an instance in a one-minute period.|
| **aws.docdb.transactions_started** <br>(count) | The number of transactions started on an instance in a one-minute period.|
| **aws.docdb.transactions_started.average** <br>(count) | The number of transactions started on an instance in a one-minute period.|
| **aws.docdb.transactions_started.maximum** <br>(count) | The number of transactions started on an instance in a one-minute period.|
| **aws.docdb.transactions_started.minimum** <br>(count) | The number of transactions started on an instance in a one-minute period.|
| **aws.docdb.transactions_started.samplecount** <br>(count) | The number of transactions started on an instance in a one-minute period.|
| **aws.docdb.transactions_started.sum** <br>(count) | The number of transactions started on an instance in a one-minute period.|
| **aws.docdb.ttldeleted_documents** <br>(count) | The number of documents deleted by a TTLMonitor in a one-minute period.|
| **aws.docdb.ttldeleted_documents.average** <br>(count) | The number of documents deleted by a TTLMonitor in a one-minute period.|
| **aws.docdb.ttldeleted_documents.maximum** <br>(count) | The number of documents deleted by a TTLMonitor in a one-minute period.|
| **aws.docdb.ttldeleted_documents.minimum** <br>(count) | The number of documents deleted by a TTLMonitor in a one-minute period.|
| **aws.docdb.ttldeleted_documents.samplecount** <br>(count) | The number of documents deleted by a TTLMonitor in a one-minute period.|
| **aws.docdb.ttldeleted_documents.sum** <br>(count) | The number of documents deleted by a TTLMonitor in a one-minute period.|
| **aws.docdb.volume_bytes_used** <br>(count) | The amount of storage used by your cluster.<br>_Shown as byte_ |
| **aws.docdb.volume_bytes_used.maximum** <br>(count) | The maximum amount of storage used by your cluster.<br>_Shown as byte_ |
| **aws.docdb.volume_bytes_used.minimum** <br>(count) | The minimum amount of storage used by your cluster.<br>_Shown as byte_ |
| **aws.docdb.volume_bytes_used.samplecount** <br>(count) | Sample count of the amount of storage used by your cluster.<br>_Shown as byte_ |
| **aws.docdb.volume_bytes_used.sum** <br>(count) | The sum of the amount of storage used by your cluster.<br>_Shown as byte_ |
| **aws.docdb.volume_read_iops** <br>(count) | The average number of billed read I/O operations from a cluster volume.|
| **aws.docdb.volume_read_iops.maximum** <br>(count) | The maximum average number of billed read I/O operations from a cluster volume.|
| **aws.docdb.volume_read_iops.minimum** <br>(count) | The minimum average number of billed read I/O operations from a cluster volume.|
| **aws.docdb.volume_read_iops.samplecount** <br>(count) | Sample count of the average number of billed read I/O operations from a cluster volume.|
| **aws.docdb.volume_read_iops.sum** <br>(count) | The sum of the average number of billed read I/O operations from a cluster volume.|
| **aws.docdb.volume_write_iops** <br>(count) | The average number of disk I/O operations per second.|
| **aws.docdb.volume_write_iops.maximum** <br>(count) | The maximum average number of disk I/O operations per second.|
| **aws.docdb.volume_write_iops.minimum** <br>(count) | The minimum average number of disk I/O operations per second.|
| **aws.docdb.volume_write_iops.samplecount** <br>(count) | Sample count of the average number of disk I/O operations per second.|
| **aws.docdb.volume_write_iops.sum** <br>(count) | The sum of the average number of disk I/O operations per second.|
| **aws.docdb.write_iops** <br>(count) | The average number of disk I/O operations per second.|
| **aws.docdb.write_iops.maximum** <br>(count) | The maximum average number of disk I/O operations per second.|
| **aws.docdb.write_iops.minimum** <br>(count) | The minimum average number of disk I/O operations per second.|
| **aws.docdb.write_iops.samplecount** <br>(count) | Sample count of the average number of disk I/O operations per second.|
| **aws.docdb.write_iops.sum** <br>(count) | The sum of the average number of disk I/O operations per second.|
| **aws.docdb.write_latency** <br>(gauge) | The average amount of time taken per disk I/O operation.<br>_Shown as millisecond_ |
| **aws.docdb.write_latency.maximum** <br>(gauge) | The maximum amount of time taken per disk I/O operation.<br>_Shown as millisecond_ |
| **aws.docdb.write_latency.minimum** <br>(gauge) | The minimum amount of time taken per disk I/O operation.<br>_Shown as millisecond_ |
| **aws.docdb.write_latency.samplecount** <br>(gauge) | Sample count of the amount of time taken per disk I/O operation.<br>_Shown as millisecond_ |
| **aws.docdb.write_latency.sum** <br>(gauge) | The sum of the average amount of time taken per disk I/O operation.<br>_Shown as millisecond_ |
| **aws.docdb.write_throughput** <br>(gauge) | The average number of bytes written to disk per second.|
| **aws.docdb.write_throughput.maximum** <br>(gauge) | The maximum average number of bytes written to disk per second.|
| **aws.docdb.write_throughput.minimum** <br>(gauge) | The minimum average number of bytes written to disk per second.|
| **aws.docdb.write_throughput.samplecount** <br>(gauge) | Sample count of the average number of bytes written to disk per second.|
| **aws.docdb.write_throughput.sum** <br>(gauge) | The sum of the average number of bytes written to disk per second.|

AWS から取得される各メトリクスには、dbinstanceidentifier、dbclusteridentifier など、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

Amazon DocumentDB インテグレーションには、イベントは含まれません。

### サービス チェック

Amazon DocumentDB インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}