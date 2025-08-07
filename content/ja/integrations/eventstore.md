---
app_id: eventstore
categories:
- キャッシュ
- data stores
custom_kind: インテグレーション
description: Eventstore のメトリクスを収集
integration_version: 2.1.0
media: []
supported_os:
- linux
- windows
- macos
title: Eventstore
---
## 概要

EventStore からメトリクスをリアルタイムに取得して、以下のことができます。

- EventStore のキューを視覚化および監視できます。
- 以下の API エンドポイントで、使用可能なすべてのメトリクスをキャプチャします。統計、ノード情報、非過渡的な予測、サブスクリプション、クラスターゴシップ（スクレープするエンドポイントのリストは構成できます）

## セットアップ

The EventStore check is not included in the [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the EventStore check on your host. See [Use Community Integrations](https://docs.datadoghq.com/agent/guide/use-community-integrations/) to install with the Docker Agent or earlier versions of the Agent.

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-eventstore==<INTEGRATION_VERSION>
   ```

1. Configure your integration similar to core [integrations](https://docs.datadoghq.com/getting_started/integrations/).

### 設定

1. Edit the `eventstore.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) to start collecting your EventStore [metrics](#metrics).
   See the [sample eventstore.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/eventstore/datadog_checks/eventstore/data/conf.yaml.example) for all available configuration options.

1. [Restart the Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-restart-the-agent).

### 検証

[Run the Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#service-status) and look for `eventstore` under the Checks section.

## 互換性

このチェックは、すべての主要プラットフォームと互換性があります。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **eventstore.proc.mem** <br>(gauge) | Current memory usage<br>_Shown as byte_ |
| **eventstore.proc.cpu** <br>(gauge) | Current CPU usage|
| **eventstore.proc.threads** <br>(gauge) | Current threads|
| **eventstore.proc.contentions_rate** <br>(gauge) | current contentions|
| **eventstore.proc.thrown_exceptions_rate** <br>(gauge) | number of exceptions|
| **eventstore.proc.disk.read_bytes** <br>(gauge) | Disk Reads (Bytes)<br>_Shown as byte_ |
| **eventstore.proc.disk.write_bytes** <br>(gauge) | Disk Writes (Bytes)<br>_Shown as byte_ |
| **eventstore.proc.disk.read_ops** <br>(gauge) | Disk Reads (Ops)|
| **eventstore.proc.disk.write_ops** <br>(gauge) | Disk Writes (Ops)|
| **eventstore.tcp.connections** <br>(gauge) | Tcp Connections|
| **eventstore.tcp.receiving_speed** <br>(gauge) | Tcp Receiving|
| **eventstore.tcp.sending_speed** <br>(gauge) | Tcp Sending|
| **eventstore.tcp.in_send** <br>(gauge) | Tcp In|
| **eventstore.tcp.measure_time** <br>(gauge) | Tcp Measure|
| **eventstore.tcp.pending_received** <br>(gauge) | Tcp Pending|
| **eventstore.tcp.pending_send** <br>(gauge) | Tcp Pending|
| **eventstore.tcp.received_bytes.since_last_run** <br>(gauge) | Received_Bytes Since_Last|
| **eventstore.tcp.received_bytes.total** <br>(gauge) | Received_Bytes Bytes|
| **eventstore.tcp.sent_bytes.since_last_run** <br>(gauge) | Sent_Bytes Since_Last|
| **eventstore.tcp.sent_bytes.total** <br>(gauge) | Sent_Bytes total|
| **eventstore.gc.allocation_speed** <br>(gauge) | Allocation Speed|
| **eventstore.gc.items_count.gen0** <br>(gauge) | Items Count.Gen0|
| **eventstore.gc.size.gen0** <br>(gauge) | Gen0 Gen0|
| **eventstore.gc.items_count.gen1** <br>(gauge) | Items Count.Gen1|
| **eventstore.gc.size.gen1** <br>(gauge) | Gen1 Gen1|
| **eventstore.gc.items_count.gen2** <br>(gauge) | Items Count.Gen2|
| **eventstore.gc.size.gen2** <br>(gauge) | Gen2 Gen2|
| **eventstore.gc.large_heap_size** <br>(gauge) | Large_Heap Size|
| **eventstore.gc.time_in_gc** <br>(gauge) | Time_In Gc|
| **eventstore.gc.total_bytes_in_heaps** <br>(gauge) | Total_Bytes_In Heaps<br>_Shown as byte_ |
| **eventstore.sys.free_mem** <br>(gauge) | Free Mem|
| **eventstore.es.queue.avg_items_per_second** <br>(gauge) | Queue Avg items per second|
| **eventstore.es.queue.avg_processing_time** <br>(gauge) | Queue Avg processing Time|
| **eventstore.es.queue.current_idle_time** <br>(gauge) | Queue Current idle Time|
| **eventstore.es.queue.current_processing_time** <br>(gauge) | Queue Current processing Time|
| **eventstore.es.queue.idle_time_percent** <br>(gauge) | Queue Idle time Percent|
| **eventstore.es.queue.length** <br>(gauge) | Queue Length queue Length|
| **eventstore.es.queue.length_current_try_peak** <br>(gauge) | Queue Length current try peak|
| **eventstore.es.queue.length_lifetime_peak** <br>(gauge) | Queue Length lifetime Peak|
| **eventstore.es.queue.total_items_processed** <br>(gauge) | Queue Total items Processed|
| **eventstore.es.writer.flush_size.last** <br>(gauge) | Writer Last Flush Size|
| **eventstore.es.writer.flush_delay_ms.last** <br>(gauge) | Writer Last flush delay (ms)<br>_Shown as millisecond_ |
| **eventstore.es.writer.flush_size.mean** <br>(gauge) | Writer Mean flush size|
| **eventstore.es.writer.flush_delay_ms.mean** <br>(gauge) | Writer Mean flush delay (ms)|
| **eventstore.es.writer.flush_size.max** <br>(gauge) | Writer Max flush size (size)|
| **eventstore.es.writer.flush_delay_ms.max** <br>(gauge) | Writer Max flush delay (ms)|
| **eventstore.es.writer.queued_flush_messages** <br>(gauge) | Writer Queued Flush Messages|
| **eventstore.es.read_index.cached_record** <br>(gauge) | Read Index Cached Record|
| **eventstore.es.read_index.not_cached_record** <br>(gauge) | Read Index Not Cached Record|
| **eventstore.es.read_index.cached_stream_info** <br>(gauge) | Read Index Cached Stream Info|
| **eventstore.es.read_index.not_cached_stream_info** <br>(gauge) | Read Index Not Cached Stream Info|
| **eventstore.es.read_index.cached_trans_info** <br>(gauge) | Read Index Cached Trans Info|
| **eventstore.es.read_index.not_cached_trans_info** <br>(gauge) | Read Index Not Cached Trans Info|
| **eventstore.is_leader** <br>(gauge) | Cluster Node is a Leader|
| **eventstore.is_follower** <br>(gauge) | Cluster Node is a Follower|
| **eventstore.is_readonlyreplica** <br>(gauge) | Cluster Node is a Read Only Replica|
| **eventstore.running_projections.none** <br>(gauge) | Node does not run Projections|
| **eventstore.running_projections.system** <br>(gauge) | Node runs System Projections|
| **eventstore.running_projections.all** <br>(gauge) | Node runs all kinds of Projections|
| **eventstore.projection.core_processing_time** <br>(gauge) | Projection Core Processing Time|
| **eventstore.projection.version** <br>(gauge) | Projection Version|
| **eventstore.projection.epoch** <br>(gauge) | Projection Epoch|
| **eventstore.projection.reads_in_progress** <br>(gauge) | Projection Reads in Progress|
| **eventstore.projection.writes_in_progress** <br>(gauge) | Projection Writes in Progress|
| **eventstore.projection.partitions_cached** <br>(gauge) | Projection Partitions Cached|
| **eventstore.projection.running** <br>(gauge) | Projection is Running|
| **eventstore.projection.progress** <br>(gauge) | Projection Progress|
| **eventstore.projection.events_processed_after_restart** <br>(gauge) | Projection Events Processed after Restart|
| **eventstore.projection.buffered_events** <br>(gauge) | Projection Events Buffered|
| **eventstore.projection.write_pending_events_before_checkpoint** <br>(gauge) | Projection Write Pending Events before Checkpoint|
| **eventstore.projection.write_pending_events_after_checkpoint** <br>(gauge) | Projection Write Pending Events after Checkpoint|
| **eventstore.subscription.live** <br>(gauge) | Subscription is Live|
| **eventstore.subscription.average_items_per_second** <br>(gauge) | Subscription Average Items per Second|
| **eventstore.subscription.items_processed** <br>(gauge) | Subscription Items Processed|
| **eventstore.subscription.last_processed_event_number** <br>(gauge) | Subscription Last Processed Event Number|
| **eventstore.subscription.last_known_event_number** <br>(gauge) | Subscription Last Known Event Number|
| **eventstore.subscription.connections** <br>(gauge) | Subscription Connections|
| **eventstore.subscription.messages_in_flight** <br>(gauge) | Subscription Messages in Flight|
| **eventstore.cluster.member_alive** <br>(gauge) | Cluster Member is Alive|
| **eventstore.cluster.last_commit_position** <br>(gauge) | Cluster Member Last Commit Position|
| **eventstore.cluster.writer_checkpoint** <br>(gauge) | Cluster Member Writer Checkpoint|
| **eventstore.cluster.chaser_checkpoint** <br>(gauge) | Cluster Member Chaser Checkpoint|
| **eventstore.cluster.epoch_position** <br>(gauge) | Cluster Member Epoch Position|
| **eventstore.cluster.epoch_number** <br>(gauge) | Cluster Member Epoch Number|
| **eventstore.cluster.node_priority** <br>(gauge) | Cluster Member Node Priority|

### イベント

eventstore チェックには、イベントは含まれません。

### サービス チェック

eventstore チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

Need help? Contact the [maintainer](https://github.com/DataDog/integrations-extras/blob/master/eventstore/manifest.json) of this integration.