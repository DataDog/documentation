---
app_id: azure_data_explorer
categories:
- azure
- クラウド
- ネットワーク
custom_kind: インテグレーション
description: Azure Data Explorer のキーメトリクスを追跡
title: Microsoft Azure Data Explorer
---
## 概要

Azure Data Explorer は非常にスケーラブルで安全な分析サービスで、構造化されたデータと構造化されていないデータを精査して、即座に詳細な情報を得ることができます。アドホッククエリ用に最適化された Azure Data Explorer は、生データ、構造化データ、半構造化データのデータ探索を可能にし、詳細な情報を獲得するまでの時間を短縮します。Datadog を使用して、Azure Data Explorer のパフォーマンスと使用状況を、他のアプリケーションやインフラストラクチャーとの関連で監視します。

Azure Data Explorer からメトリクスを取得すると、以下のことができます。

- Data Explorer インスタンスの取り込み、処理、レイテンシーのパフォーマンスを追跡する。
- Data Explorer のコンピューティング、メモリ、ネットワークリソースの使用状況を監視する。

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration](https://docs.datadoghq.com/integrations/azure/) first. There are no other installation steps.

## 収集データ

### メトリクス

| | |
| --- | --- |
| **azure.kusto_clusters.batch_blob_count** <br>(gauge) | Number of data sources in an aggregated batch for ingestion.|
| **azure.kusto_clusters.batch_duration** <br>(gauge) | Duration of the aggregation phase in the ingestion flow.<br>_Shown as second_ |
| **azure.kusto_clusters.batches_processed** <br>(count) | Number of batches aggregated for ingestion. Batching Type: whether the batch reached batching time; data size or number of files limit set by batching policy.|
| **azure.kusto_clusters.batch_size** <br>(gauge) | Uncompressed expected data size in an aggregated batch for ingestion.<br>_Shown as byte_ |
| **azure.kusto_clusters.blobs_dropped** <br>(count) | Number of blobs permanently rejected by a component.|
| **azure.kusto_clusters.blobs_processed** <br>(count) | Number of blobs processed by a component.|
| **azure.kusto_clusters.blobs_received** <br>(count) | Number of blobs received from input stream by a component.|
| **azure.kusto_clusters.cache_utilization** <br>(gauge) | Utilization level in the cluster scope.<br>_Shown as percent_ |
| **azure.kusto_clusters.cache_utilization_factor** <br>(gauge) | Percentage difference between the current number of instances and the optimal number of instances (per cache utilization).<br>_Shown as percent_ |
| **azure.kusto_clusters.continuous_export_max_lateness_minutes** <br>(gauge) | Lateness (in minutes) reported by the continuous export jobs in the cluster.|
| **azure.kusto_clusters.continuous_export_num_of_records_exported** <br>(count) | Number of records exported; fired for every storage artifact written during the export operation.|
| **azure.kusto_clusters.continuous_export_pending_count** <br>(gauge) | Number of pending continuous export jobs ready for execution.|
| **azure.kusto_clusters.continuous_export_result** <br>(count) | Indicates whether Continuous Export succeeded or failed.|
| **azure.kusto_clusters.cpu** <br>(gauge) | CPU utilization level.<br>_Shown as percent_ |
| **azure.kusto_clusters.discovery_latency** <br>(gauge) | Reported by data connections (if exist). Time in seconds from when a message is enqueued or event is created until it is discovered by data connection. This time is not included in the Azure Data Explorer total ingestion duration.<br>_Shown as second_ |
| **azure.kusto_clusters.events_dropped** <br>(count) | Number of events dropped permanently by data connection. An Ingestion result metric with a failure reason will be sent.|
| **azure.kusto_clusters.events_processed** <br>(count) | Number of events processed by the cluster.|
| **azure.kusto_clusters.events_processed_for_event_hubs** <br>(count) | Number of events processed by the cluster when ingesting from Event/IoT Hub.|
| **azure.kusto_clusters.events_received** <br>(count) | Number of events received by data connection.|
| **azure.kusto_clusters.export_utilization** <br>(gauge) | Export utilization.<br>_Shown as percent_ |
| **azure.kusto_clusters.ingestion_latency_in_seconds** <br>(gauge) | Latency of data ingested; from the time the data was received in the cluster until it's ready for query. The ingestion latency period depends on the ingestion scenario.<br>_Shown as second_ |
| **azure.kusto_clusters.ingestion_result** <br>(count) | Total number of sources that either failed or succeeded to be ingested. Splitting the metric by status; you can get detailed information about the status of the ingestion operations.|
| **azure.kusto_clusters.ingestion_utilization** <br>(gauge) | Ratio of used ingestion slots in the cluster.<br>_Shown as percent_ |
| **azure.kusto_clusters.ingestion_volume_in_mb** <br>(count) | Overall volume of ingested data to the cluster.<br>_Shown as byte_ |
| **azure.kusto_clusters.instance_count** <br>(gauge) | Total instance count.|
| **azure.kusto_clusters.keep_alive** <br>(gauge) | Sanity check indicates the cluster responds to queries.|
| **azure.kusto_clusters.materialized_view_age_minutes** <br>(gauge) | Materialized view age in minutes.|
| **azure.kusto_clusters.materialized_view_age_seconds** <br>(gauge) | Materialized view age in seconds.<br>_Shown as second_ |
| **azure.kusto_clusters.materialized_view_data_loss** <br>(gauge) | Indicates potential data loss in materialized view.|
| **azure.kusto_clusters.materialized_view_extents_rebuild** <br>(gauge) | Number of extents rebuild.|
| **azure.kusto_clusters.materialized_view_health** <br>(gauge) | Health of the materialized view (1 for healthy; 0 for non-healthy).|
| **azure.kusto_clusters.materialized_view_records_in_delta** <br>(gauge) | Number of records in the non-materialized part of the view.|
| **azure.kusto_clusters.materialized_view_result** <br>(gauge) | Result of the materialization process.|
| **azure.kusto_clusters.query_duration** <br>(gauge) | Queriesduration in seconds.<br>_Shown as millisecond_ |
| **azure.kusto_clusters.query_result** <br>(count) | Total number of queries.|
| **azure.kusto_clusters.queue_length** <br>(gauge) | Number of pending messages in a component's queue.|
| **azure.kusto_clusters.queue_oldest_message** <br>(gauge) | Time in seconds from when the oldest message in queue was inserted.|
| **azure.kusto_clusters.received_data_size_bytes** <br>(gauge) | Size of data received by data connection. This is the size of the data stream; or of raw data size if provided.<br>_Shown as byte_ |
| **azure.kusto_clusters.stage_latency** <br>(gauge) | Cumulative time from when a message is discovered until it is received by the reporting component for processing (discovery time is set when message is enqueued for ingestion queue; or when discovered by data connection).<br>_Shown as second_ |
| **azure.kusto_clusters.streaming_ingest_data_rate** <br>(gauge) | Streaming ingest data rate (MB per second).|
| **azure.kusto_clusters.streaming_ingest_duration** <br>(gauge) | Streaming ingest duration in milliseconds.<br>_Shown as millisecond_ |
| **azure.kusto_clusters.streaming_ingest_results** <br>(count) | Streaming ingest result.|
| **azure.kusto_clusters.total_number_of_concurrent_queries** <br>(gauge) | Total number of concurrent queries.|
| **azure.kusto_clusters.total_number_of_extents** <br>(gauge) | Total number of data extents.|
| **azure.kusto_clusters.total_number_of_throttled_commands** <br>(count) | Total number of throttled commands.|
| **azure.kusto_clusters.total_number_of_throttled_queries** <br>(gauge) | Total number of throttled queries.|
| **azure.kusto_clusters.weak_consistency_latency** <br>(gauge) | Max latency between the previous metadata sync and the next one (in db/node scope).<br>_Shown as second_ |
| **azure.kusto_clusters.count** <br>(gauge) | Count of Kusto clusters.|

### イベント

Azure Data Explorer インテグレーションには、イベントは含まれません。

### サービス チェック

Azure Data Explorer インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。