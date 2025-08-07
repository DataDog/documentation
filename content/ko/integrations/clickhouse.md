---
app_id: clickhouse
categories:
- 캐싱
- 데이터 저장소
- 로그 수집
custom_kind: 통합
description: ClickHouse 클러스터의 서비스 상태 및 성능을 모니터링하세요.
integration_version: 5.3.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: ClickHouse
---
## 개요

This check monitors [ClickHouse](https://clickhouse.yandex) through the Datadog Agent.

## 설정

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates](https://docs.datadoghq.com/agent/kubernetes/integrations/) for guidance on applying these instructions.

### 설치

The ClickHouse check is included in the [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) package. No additional installation is needed on your server.

### 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

#### 메트릭 수집

1. To start collecting your ClickHouse performance data, edit the `clickhouse.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's configuration directory. See the [sample clickhouse.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/clickhouse/datadog_checks/clickhouse/data/conf.yaml.example) for all available configuration options.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### 로그 수집

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. 원하는 로그 파일을 `clickhouse.d/conf.yaml` 파일에 추가하여 ClickHouse 로그 수집을 시작하세요.

   ```yaml
     logs:
       - type: file
         path: /var/log/clickhouse-server/clickhouse-server.log
         source: clickhouse
         service: "<SERVICE_NAME>"
   ```

   Change the `path` and `service` parameter values and configure them for your environment. See the [sample clickhouse.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/clickhouse/datadog_checks/clickhouse/data/conf.yaml.example) for all available configuration options.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

For containerized environments, see the [Autodiscovery Integration Templates](https://docs.datadoghq.com/agent/kubernetes/integrations/) for guidance on applying the parameters below.

#### 메트릭 수집

| 파라미터            | 값                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `clickhouse`                                                   |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%", "port": "%%port%%", "username": "<USER>", "password": "<PASSWORD>"}`       |

##### 로그 수집

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes log collection](https://docs.datadoghq.com/agent/kubernetes/log/).

| 파라미터      | 값                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "clickhouse", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### 검증

[Run the Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `clickhouse` under the **Checks** section.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **clickhouse.CompiledExpressionCacheCount** <br>(gauge) | Total entries in the cache of JIT-compiled code.<br>_Shown as item_ |
| **clickhouse.MarkCacheFiles** <br>(gauge) | The number of mark files cached in the mark cache.<br>_Shown as item_ |
| **clickhouse.ReplicasMaxInsertsInQueue** <br>(gauge) | Maximum number of INSERT operations in the queue (still to be replicated) across Replicated tables.<br>_Shown as item_ |
| **clickhouse.ReplicasMaxMergesInQueue** <br>(gauge) | Maximum number of merge operations in the queue (still to be applied) across Replicated tables.<br>_Shown as item_ |
| **clickhouse.ReplicasMaxQueueSize** <br>(gauge) | Maximum queue size (in the number of operations like get, merge) across Replicated tables.<br>_Shown as item_ |
| **clickhouse.ReplicasSumInsertsInQueue** <br>(gauge) | Sum of INSERT operations in the queue (still to be replicated) across Replicated tables.<br>_Shown as item_ |
| **clickhouse.ReplicasSumMergesInQueue** <br>(gauge) | Sum of merge operations in the queue (still to be applied) across Replicated tables.<br>_Shown as item_ |
| **clickhouse.UncompressedCacheBytes** <br>(gauge) | Total size of uncompressed cache in bytes. Uncompressed cache does not usually improve the performance and should be mostly avoided.<br>_Shown as byte_ |
| **clickhouse.UncompressedCacheCells** <br>(gauge) | Total number of entries in the uncompressed cache. Each entry represents a decompressed block of data. Uncompressed cache does not usually improve performance and should be mostly avoided.<br>_Shown as item_ |
| **clickhouse.addresses.active** <br>(gauge) | Total count of addresses which are used for creation connections with connection pools|
| **clickhouse.aggregator.threads** <br>(gauge) | Number of threads in the Aggregator thread pool.|
| **clickhouse.aggregator.threads.active** <br>(gauge) | Number of threads in the Aggregator thread pool running a task.|
| **clickhouse.aggregator.threads.scheduled** <br>(gauge) | Number of queued or active jobs in the Aggregator thread pool.|
| **clickhouse.aio.read.count** <br>(count) | Number of reads with Linux or FreeBSD AIO interface.<br>_Shown as read_ |
| **clickhouse.aio.read.size.count** <br>(count) | Number of bytes read with Linux or FreeBSD AIO interface.<br>_Shown as byte_ |
| **clickhouse.aio.read.size.total** <br>(gauge) | Total number of bytes read with Linux or FreeBSD AIO interface.<br>_Shown as byte_ |
| **clickhouse.aio.read.total** <br>(gauge) | Total number of reads with Linux or FreeBSD AIO interface.<br>_Shown as read_ |
| **clickhouse.aio.write.count** <br>(count) | Number of writes with Linux or FreeBSD AIO interface.<br>_Shown as write_ |
| **clickhouse.aio.write.size.count** <br>(count) | Number of bytes read with Linux or FreeBSD AIO interface.<br>_Shown as byte_ |
| **clickhouse.aio.write.size.total** <br>(gauge) | Total number of bytes read with Linux or FreeBSD AIO interface.<br>_Shown as byte_ |
| **clickhouse.aio.write.total** <br>(gauge) | Total number of writes with Linux or FreeBSD AIO interface.<br>_Shown as write_ |
| **clickhouse.async.read.time** <br>(gauge) | Time spent in waiting for asynchronous reads in asynchronous local read.<br>_Shown as microsecond_ |
| **clickhouse.async.reader.ignored.bytes.count** <br>(count) | Number of bytes ignored during asynchronous reading|
| **clickhouse.async.reader.ignored.bytes.total** <br>(gauge) | Number of bytes ignored during asynchronous reading|
| **clickhouse.async.remote_read.time** <br>(gauge) | Time spent in waiting for asynchronous remote reads.<br>_Shown as microsecond_ |
| **clickhouse.attached.database** <br>(gauge) | Active database, used by current and upcoming SELECTs.|
| **clickhouse.attached.table** <br>(gauge) | Active table, used by current and upcoming SELECTs.|
| **clickhouse.azure.blob_storage.copy_object.count** <br>(count) | Number of Azure blob storage API CopyObject calls|
| **clickhouse.azure.blob_storage.copy_object.total** <br>(gauge) | Number of Azure blob storage API CopyObject calls|
| **clickhouse.azure.blob_storage.delete_object.count** <br>(count) | Number of Azure blob storage API DeleteObject(s) calls.|
| **clickhouse.azure.blob_storage.delete_object.total** <br>(gauge) | Number of Azure blob storage API DeleteObject(s) calls.|
| **clickhouse.azure.blob_storage.list_object.count** <br>(count) | Number of Azure blob storage API ListObjects calls.|
| **clickhouse.azure.blob_storage.list_object.total** <br>(gauge) | Number of Azure blob storage API ListObjects calls.|
| **clickhouse.azure.blob_storage.upload_part.count** <br>(count) | Number of Azure blob storage API UploadPart calls|
| **clickhouse.azure.blob_storage.upload_part.total** <br>(gauge) | Number of Azure blob storage API UploadPart calls|
| **clickhouse.background_pool.buffer_flush_schedule.task.active** <br>(gauge) | Number of active tasks in BackgroundBufferFlushSchedulePool. This pool is used for periodic Buffer flushes<br>_Shown as task_ |
| **clickhouse.background_pool.buffer_flush_schedule.task.limit** <br>(gauge) | Limit on number of tasks in BackgroundBufferFlushSchedulePool|
| **clickhouse.background_pool.common.task.active** <br>(gauge) | Number of active tasks in an associated background pool<br>_Shown as task_ |
| **clickhouse.background_pool.common.task.limit** <br>(gauge) | Limit on number of tasks in an associated background pool|
| **clickhouse.background_pool.distributed.task.active** <br>(gauge) | Number of active tasks in BackgroundDistributedSchedulePool. This pool is used for distributed sends that is done in background.<br>_Shown as task_ |
| **clickhouse.background_pool.distributed.task.limit** <br>(gauge) | Limit on number of tasks in BackgroundDistributedSchedulePool|
| **clickhouse.background_pool.fetches.task.active** <br>(gauge) | Number of active tasks in BackgroundFetchesPool<br>_Shown as task_ |
| **clickhouse.background_pool.fetches.task.limit** <br>(gauge) | Limit on number of simultaneous fetches in an associated background pool|
| **clickhouse.background_pool.merges.task.active** <br>(gauge) | Number of active merges and mutations in an associated background pool<br>_Shown as task_ |
| **clickhouse.background_pool.merges.task.limit** <br>(gauge) | Limit on number of active merges and mutations in an associated background pool|
| **clickhouse.background_pool.message_broker.task.active** <br>(gauge) | Number of active tasks in BackgroundProcessingPool for message streaming<br>_Shown as task_ |
| **clickhouse.background_pool.message_broker.task.limit** <br>(gauge) | Limit on number of tasks in BackgroundProcessingPool for message streaming|
| **clickhouse.background_pool.move.memory** <br>(gauge) | Total amount of memory (bytes) allocated in background processing pool (that is dedicated for background moves). Note that this value may include a drift when the memory was allocated in a context of background processing pool and freed in other context or vice-versa. This happens naturally due to caches for tables indexes and doesn't indicate memory leaks.<br>_Shown as byte_ |
| **clickhouse.background_pool.move.task.active** <br>(gauge) | The number of active tasks in BackgroundProcessingPool for moves.<br>_Shown as task_ |
| **clickhouse.background_pool.move.task.limit** <br>(gauge) | Limit on number of tasks in BackgroundProcessingPool for moves|
| **clickhouse.background_pool.processing.memory** <br>(gauge) | Total amount of memory allocated in background processing pool (that is dedicated for background merges, mutations and fetches). Note that this value may include a drift when the memory was allocated in a context of background processing pool and freed in other context or vice-versa. This happens naturally due to caches for tables indexes and doesn't indicate memory leaks.<br>_Shown as byte_ |
| **clickhouse.background_pool.processing.task.active** <br>(gauge) | The number of active tasks in BackgroundProcessingPool (merges, mutations, fetches, or replication queue bookkeeping)<br>_Shown as task_ |
| **clickhouse.background_pool.schedule.memory** <br>(gauge) | Total amount of memory allocated in background schedule pool (that is dedicated for bookkeeping tasks of Replicated tables).<br>_Shown as byte_ |
| **clickhouse.background_pool.schedule.task.active** <br>(gauge) | The number of active tasks in BackgroundSchedulePool. This pool is used for periodic ReplicatedMergeTree tasks, like cleaning old data parts, altering data parts, replica re-initialization, etc.<br>_Shown as task_ |
| **clickhouse.background_pool.schedule.task.limit** <br>(gauge) | Limit on number of tasks in BackgroundSchedulePool. This pool is used for periodic ReplicatedMergeTree tasks, like cleaning old data parts, altering data parts, replica re-initialization, etc.|
| **clickhouse.backup.post_tasks.time** <br>(gauge) | Time spent running post tasks after making backup entries<br>_Shown as microsecond_ |
| **clickhouse.backup.read.time** <br>(gauge) | Time spent reading backup metadata from .backup file<br>_Shown as microsecond_ |
| **clickhouse.backup.tables.time** <br>(gauge) | Time spent making backup entries for tables data<br>_Shown as microsecond_ |
| **clickhouse.backup.time** <br>(gauge) | Time spent making backup entries<br>_Shown as microsecond_ |
| **clickhouse.backup.write.time** <br>(gauge) | Time spent writing backup metadata to .backup file<br>_Shown as microsecond_ |
| **clickhouse.backups.read.open.count** <br>(count) | Number of backups opened for reading|
| **clickhouse.backups.read.open.total** <br>(gauge) | Number of backups opened for reading|
| **clickhouse.backups.threads.active** <br>(gauge) | Number of threads in thread pool for BACKUP running a task.|
| **clickhouse.backups.threads.scheduled** <br>(gauge) | Number of queued or active jobs for BACKUP.|
| **clickhouse.backups.threads.total** <br>(gauge) | Number of threads in the thread pool for BACKUP.|
| **clickhouse.backups.write.open.count** <br>(count) | Number of backups opened for writing|
| **clickhouse.backups.write.open.total** <br>(gauge) | Number of backups opened for writing|
| **clickhouse.backups_io.threads.active** <br>(gauge) | Number of threads in the BackupsIO thread pool running a task.|
| **clickhouse.backups_io.threads.scheduled** <br>(gauge) | Number of queued or active jobs in the BackupsIO thread pool.|
| **clickhouse.backups_io.threads.total** <br>(gauge) | Number of threads in the BackupsIO thread pool.|
| **clickhouse.buffer.write.discard.count** <br>(count) | The number of stack traces dropped by query profiler or signal handler because pipe is full or cannot write to pipe during the last interval.<br>_Shown as error_ |
| **clickhouse.buffer.write.discard.total** <br>(gauge) | The total number of stack traces dropped by query profiler or signal handler because pipe is full or cannot write to pipe.<br>_Shown as error_ |
| **clickhouse.cache.async.insert** <br>(gauge) | Number of async insert hash id in cache|
| **clickhouse.cache.buffer.time** <br>(gauge) | Prepare buffer time<br>_Shown as microsecond_ |
| **clickhouse.cache.distributed.client_access.count** <br>(count) | Number of client access times|
| **clickhouse.cache.distributed.client_access.total** <br>(gauge) | Number of client access times|
| **clickhouse.cache.distributed.connection.time** <br>(gauge) | The time spent to connect to distributed cache<br>_Shown as microsecond_ |
| **clickhouse.cache.distributed.connections.used.count** <br>(count) | The number of used connections to distributed cache|
| **clickhouse.cache.distributed.connections.used.total** <br>(gauge) | The number of used connections to distributed cache|
| **clickhouse.cache.distributed.new_read_range.time** <br>(gauge) | Time spent to start a new read range with distributed cache<br>_Shown as microsecond_ |
| **clickhouse.cache.distributed.packets.received.count** <br>(count) | Total number of packets received from distributed cache|
| **clickhouse.cache.distributed.packets.received.total** <br>(gauge) | Total number of packets received from distributed cache|
| **clickhouse.cache.distributed.packets.skipped.count** <br>(count) | Number of skipped unused packets from distributed cache|
| **clickhouse.cache.distributed.packets.skipped.total** <br>(gauge) | Number of skipped unused packets from distributed cache|
| **clickhouse.cache.distributed.read.compute.time** <br>(gauge) | Time spent to precompute read ranges<br>_Shown as microsecond_ |
| **clickhouse.cache.distributed.read.time** <br>(gauge) | Time spent reading from distributed cache<br>_Shown as microsecond_ |
| **clickhouse.cache.distributed.read_buffer_next_impl.time** <br>(gauge) | Time spend in ReadBufferFromDistributedCache::nextImpl<br>_Shown as microsecond_ |
| **clickhouse.cache.distributed.registry.update.time** <br>(gauge) | Time spent updating distributed cache registry<br>_Shown as microsecond_ |
| **clickhouse.cache.distributed.registry.updates.count** <br>(count) | Number of distributed cache registry updates|
| **clickhouse.cache.distributed.registry.updates.total** <br>(gauge) | Number of distributed cache registry updates|
| **clickhouse.cache.distributed.registry_lock.time** <br>(gauge) | Time spent to take DistributedCacheRegistry lock<br>_Shown as microsecond_ |
| **clickhouse.cache.distributed.response.time** <br>(gauge) | Time spend to wait for response from distributed cache<br>_Shown as microsecond_ |
| **clickhouse.cache.distributed.server.switches.count** <br>(count) | Number of server switches between distributed cache servers in read/write-through cache|
| **clickhouse.cache.distributed.server.switches.total** <br>(gauge) | Number of server switches between distributed cache servers in read/write-through cache|
| **clickhouse.cache.file_segments** <br>(gauge) | Number of existing cache file segments<br>_Shown as segment_ |
| **clickhouse.cache.mark.entry.found.count** <br>(count) | Number of times an entry has been found in the mark cache, so we didn't have to load a mark file.|
| **clickhouse.cache.mark.entry.found.total** <br>(gauge) | Number of times an entry has been found in the mark cache, so we didn't have to load a mark file.|
| **clickhouse.cache.mark.entry.missed.count** <br>(count) | Number of times an entry has not been found in the mark cache, so we had to load a mark file in memory, which is a costly operation, adding to query latency.|
| **clickhouse.cache.mark.entry.missed.total** <br>(gauge) | Number of times an entry has not been found in the mark cache, so we had to load a mark file in memory, which is a costly operation, adding to query latency.|
| **clickhouse.cache.mmap.file.found.count** <br>(count) | Number of times a file has been found in the MMap cache (for the 'mmap' read_method), so we didn't have to mmap it again.|
| **clickhouse.cache.mmap.file.found.total** <br>(gauge) | Number of times a file has been found in the MMap cache (for the 'mmap' read_method), so we didn't have to mmap it again.|
| **clickhouse.cache.mmap.file.missed.count** <br>(count) | Number of times a file has not been found in the MMap cache (for the 'mmap' read_method), so we had to mmap it again.|
| **clickhouse.cache.mmap.file.missed.total** <br>(gauge) | Number of times a file has not been found in the MMap cache (for the 'mmap' read_method), so we had to mmap it again.|
| **clickhouse.cache.opened_file.hits.count** <br>(count) | Number of times a file has been found in the opened file cache, so we didn't have to open it again.|
| **clickhouse.cache.opened_file.hits.total** <br>(gauge) | Number of times a file has been found in the opened file cache, so we didn't have to open it again.|
| **clickhouse.cache.opened_file.misses.count** <br>(count) | Number of times a file has been found in the opened file cache, so we had to open it again.|
| **clickhouse.cache.opened_file.misses.total** <br>(gauge) | Number of times a file has been found in the opened file cache, so we had to open it again.|
| **clickhouse.cache.opened_file.time** <br>(gauge) | Amount of time spent executing OpenedFileCache methods.<br>_Shown as microsecond_ |
| **clickhouse.cache.page.chunk.evicted.count** <br>(count) | Number of times a chunk has been found in the userspace page cache, not in use, but all its pages were evicted by the OS.|
| **clickhouse.cache.page.chunk.evicted.total** <br>(gauge) | Number of times a chunk has been found in the userspace page cache, not in use, but all its pages were evicted by the OS.|
| **clickhouse.cache.page.chunk.hits.count** <br>(count) | Number of times a chunk has been found in the userspace page cache, not in use, with all pages intact.|
| **clickhouse.cache.page.chunk.hits.partial.count** <br>(count) | Number of times a chunk has been found in the userspace page cache, not in use, but some of its pages were evicted by the OS.|
| **clickhouse.cache.page.chunk.hits.partial.total** <br>(gauge) | Number of times a chunk has been found in the userspace page cache, not in use, but some of its pages were evicted by the OS.|
| **clickhouse.cache.page.chunk.hits.total** <br>(gauge) | Number of times a chunk has been found in the userspace page cache, not in use, with all pages intact.|
| **clickhouse.cache.page.chunk.misses.count** <br>(count) | Number of times a chunk has not been found in the userspace page cache.|
| **clickhouse.cache.page.chunk.misses.total** <br>(gauge) | Number of times a chunk has not been found in the userspace page cache.|
| **clickhouse.cache.page.chunk.shared.count** <br>(count) | Number of times a chunk has been found in the userspace page cache, already in use by another thread.|
| **clickhouse.cache.page.chunk.shared.total** <br>(gauge) | Number of times a chunk has been found in the userspace page cache, already in use by another thread.|
| **clickhouse.cache.page.thread_pool_reader.prepare.time** <br>(gauge) | Time spent on preparation (e.g. call to reader seek() method)<br>_Shown as microsecond_ |
| **clickhouse.cache.page.thread_pool_reader.read.miss.time** <br>(gauge) | Time spent reading data inside the asynchronous job in ThreadPoolReader - when read was not done from the page cache.<br>_Shown as microsecond_ |
| **clickhouse.cache.page.thread_pool_reader.read.time** <br>(gauge) | Time spent reading data from page cache in ThreadPoolReader.<br>_Shown as microsecond_ |
| **clickhouse.cache.query.hits.count** <br>(count) | Number of times a query result has been found in the query cache (and query computation was avoided). Only updated for SELECT queries with SETTING use_query_cache = 1.|
| **clickhouse.cache.query.hits.total** <br>(gauge) | Number of times a query result has been found in the query cache (and query computation was avoided). Only updated for SELECT queries with SETTING use_query_cache = 1.|
| **clickhouse.cache.query.misses.count** <br>(count) | Number of times a query result has not been found in the query cache (and required query computation). Only updated for SELECT queries with SETTING use_query_cache = 1.|
| **clickhouse.cache.query.misses.total** <br>(gauge) | Number of times a query result has not been found in the query cache (and required query computation). Only updated for SELECT queries with SETTING use_query_cache = 1.|
| **clickhouse.cache.read.bytes.count** <br>(count) | Bytes read from filesystem cache|
| **clickhouse.cache.read.bytes.total** <br>(gauge) | Bytes read from filesystem cache|
| **clickhouse.cache.read.hits.count** <br>(count) | Number of times the read from filesystem cache hit the cache.|
| **clickhouse.cache.read.hits.total** <br>(gauge) | Number of times the read from filesystem cache hit the cache.|
| **clickhouse.cache.read.misses.count** <br>(count) | Number of times the read from filesystem cache miss the cache.|
| **clickhouse.cache.read.misses.total** <br>(gauge) | Number of times the read from filesystem cache miss the cache.|
| **clickhouse.cache.read.time** <br>(gauge) | Time reading from filesystem cache<br>_Shown as microsecond_ |
| **clickhouse.cache.remote_file_segments.waiting** <br>(gauge) | Total size of remote file segments waiting to be asynchronously loaded into filesystem cache.|
| **clickhouse.cache.schema.evitcted.count** <br>(count) | Number of times a schema from cache was evicted due to overflow|
| **clickhouse.cache.schema.evitcted.total** <br>(gauge) | Number of times a schema from cache was evicted due to overflow|
| **clickhouse.cache.schema.found.count** <br>(count) | Number of times the requested source is found in schema cache|
| **clickhouse.cache.schema.found.total** <br>(gauge) | Number of times the requested source is found in schema cache|
| **clickhouse.cache.schema.found_schemas.count** <br>(count) | Number of times the schema is found in schema cache during schema inference|
| **clickhouse.cache.schema.found_schemas.total** <br>(gauge) | Number of times the schema is found in schema cache during schema inference|
| **clickhouse.cache.schema.invalid.count** <br>(count) | Number of times a schema in cache became invalid due to changes in data|
| **clickhouse.cache.schema.invalid.total** <br>(gauge) | Number of times a schema in cache became invalid due to changes in data|
| **clickhouse.cache.schema.missed.count** <br>(count) | Number of times the requested source is not in schema cache|
| **clickhouse.cache.schema.missed.total** <br>(gauge) | Number of times the requested source is not in schema cache|
| **clickhouse.cache.schema.missed_schemas.count** <br>(count) | Number of times the requested source is in cache but the schema is not in cache during schema inference|
| **clickhouse.cache.schema.missed_schemas.total** <br>(gauge) | Number of times the requested source is in cache but the schema is not in cache during schema inference|
| **clickhouse.cache.schema.rows.found.count** <br>(count) | Number of times the number of rows is found in schema cache during count from files|
| **clickhouse.cache.schema.rows.found.total** <br>(gauge) | Number of times the number of rows is found in schema cache during count from files|
| **clickhouse.cache.schema.rows.missed.count** <br>(count) | Number of times the requested source is in cache but the number of rows is not in cache while count from files|
| **clickhouse.cache.schema.rows.missed.total** <br>(gauge) | Number of times the requested source is in cache but the number of rows is not in cache while count from files|
| **clickhouse.cache.source.read.bytes.count** <br>(count) | Bytes read from filesystem cache source (from remote fs, etc)|
| **clickhouse.cache.source.read.bytes.total** <br>(gauge) | Bytes read from filesystem cache source (from remote fs, etc)|
| **clickhouse.cache.source.read.time** <br>(gauge) | Time reading from filesystem cache source (from remote filesystem, etc)<br>_Shown as microsecond_ |
| **clickhouse.cache.source.write.bytes.count** <br>(count) | Bytes written from source (remote fs, etc) to filesystem cache|
| **clickhouse.cache.source.write.bytes.total** <br>(gauge) | Bytes written from source (remote fs, etc) to filesystem cache|
| **clickhouse.cache.source.write.time** <br>(gauge) | Time spent writing data into filesystem cache<br>_Shown as microsecond_ |
| **clickhouse.cache.uncompressed.block_data.count** <br>(count) | Number of times a block of data has been found in the uncompressed cache (and decompression was avoided).|
| **clickhouse.cache.uncompressed.block_data.miss.count** <br>(count) | Number of times a block of data has not been found in the uncompressed cache (and required decompression).|
| **clickhouse.cache.uncompressed.block_data.miss.total** <br>(gauge) | Number of times a block of data has not been found in the uncompressed cache (and required decompression).|
| **clickhouse.cache.uncompressed.block_data.total** <br>(gauge) | Number of times a block of data has been found in the uncompressed cache (and decompression was avoided).|
| **clickhouse.cache.write.bytes.count** <br>(count) | Bytes written from source (remote fs, etc) to filesystem cache|
| **clickhouse.cache.write.bytes.total** <br>(gauge) | Bytes written from source (remote fs, etc) to filesystem cache|
| **clickhouse.cache.write.time** <br>(gauge) | Time spent writing data into filesystem cache<br>_Shown as microsecond_ |
| **clickhouse.cache_dictionary.threads.active** <br>(gauge) | Number of threads in the CacheDictionary thread pool running a task.|
| **clickhouse.cache_dictionary.threads.scheduled** <br>(gauge) | Number of queued or active jobs in the CacheDictionary thread pool.|
| **clickhouse.cache_dictionary.threads.total** <br>(gauge) | Number of threads in the CacheDictionary thread pool.|
| **clickhouse.cache_dictionary.update_queue.batches** <br>(gauge) | Number of 'batches' (a set of keys) in update queue in CacheDictionaries.|
| **clickhouse.cache_dictionary.update_queue.keys** <br>(gauge) | Exact number of keys in update queue in CacheDictionaries.<br>_Shown as key_ |
| **clickhouse.cache_file_segments.detached** <br>(gauge) | Number of existing detached cache file segments<br>_Shown as segment_ |
| **clickhouse.cachewarmer.bytes.downloaded.count** <br>(count) | Amount of data fetched into filesystem cache by dedicated background threads.|
| **clickhouse.cachewarmer.bytes.downloaded.total** <br>(gauge) | Amount of data fetched into filesystem cache by dedicated background threads.|
| **clickhouse.compilation.attempt.count** <br>(count) | The number of times a compilation of generated C++ code was initiated during the last interval.<br>_Shown as event_ |
| **clickhouse.compilation.attempt.total** <br>(gauge) | The total number of times a compilation of generated C++ code was initiated.<br>_Shown as event_ |
| **clickhouse.compilation.function.execute.count** <br>(count) | The number of times a compiled function was executed during the last interval.<br>_Shown as execution_ |
| **clickhouse.compilation.function.execute.total** <br>(gauge) | The total number of times a compiled function was executed.<br>_Shown as execution_ |
| **clickhouse.compilation.llvm.attempt.count** <br>(count) | The number of times a compilation of generated LLVM code (to create fused function for complex expressions) was initiated during the last interval.<br>_Shown as event_ |
| **clickhouse.compilation.llvm.attempt.total** <br>(gauge) | The total number of times a compilation of generated LLVM code (to create fused function for complex expressions) was initiated.<br>_Shown as event_ |
| **clickhouse.compilation.regex.count** <br>(count) | The number of regular expressions compiled during the last interval. Identical regular expressions are compiled just once and cached forever.<br>_Shown as event_ |
| **clickhouse.compilation.regex.total** <br>(gauge) | The total number of regular expressions compiled. Identical regular expressions are compiled just once and cached forever.<br>_Shown as event_ |
| **clickhouse.compilation.size.count** <br>(count) | The number of bytes used for expressions compilation during the last interval.<br>_Shown as byte_ |
| **clickhouse.compilation.size.total** <br>(gauge) | The total number of bytes used for expressions compilation.<br>_Shown as byte_ |
| **clickhouse.compilation.success.count** <br>(count) | The number of times a compilation of generated C++ code was successful during the last interval.<br>_Shown as event_ |
| **clickhouse.compilation.success.total** <br>(gauge) | The total number of times a compilation of generated C++ code was successful.<br>_Shown as event_ |
| **clickhouse.compilation.time** <br>(gauge) | The percentage of time spent for compilation of expressions to LLVM code during the last interval.<br>_Shown as percent_ |
| **clickhouse.configuration.main.reloaded.count** <br>(count) | Number of times the main configuration was reloaded.|
| **clickhouse.configuration.main.reloaded.total** <br>(gauge) | Number of times the main configuration was reloaded.|
| **clickhouse.connection.http** <br>(gauge) | The number of connections to HTTP server<br>_Shown as connection_ |
| **clickhouse.connection.http.create.count** <br>(count) | The number of created HTTP connections (closed or opened) during the last interval.<br>_Shown as connection_ |
| **clickhouse.connection.http.create.total** <br>(gauge) | The total number of created HTTP connections (closed or opened).<br>_Shown as connection_ |
| **clickhouse.connection.http.stored** <br>(gauge) | Total count of sessions stored in the session pool for http hosts|
| **clickhouse.connection.http.total** <br>(gauge) | Total count of all sessions: stored in the pool and actively used right now for http hosts|
| **clickhouse.connection.interserver** <br>(gauge) | The number of connections from other replicas to fetch parts<br>_Shown as connection_ |
| **clickhouse.connection.mysql** <br>(gauge) | Number of client connections using MySQL protocol.<br>_Shown as connection_ |
| **clickhouse.connection.send.external** <br>(gauge) | The number of connections that are sending data for external tables to remote servers. External tables are used to implement GLOBAL IN and GLOBAL JOIN operators with distributed subqueries.<br>_Shown as connection_ |
| **clickhouse.connection.send.scalar** <br>(gauge) | The number of connections that are sending data for scalars to remote servers.<br>_Shown as connection_ |
| **clickhouse.connection.tcp** <br>(gauge) | The number of connections to TCP server (clients with native interface).<br>_Shown as connection_ |
| **clickhouse.connections.alive.total** <br>(gauge) | Number of alive connections<br>_Shown as connection_ |
| **clickhouse.connections.http.created.count** <br>(count) | Number of created http connections|
| **clickhouse.connections.http.created.time** <br>(gauge) | Total time spend on creating http connections<br>_Shown as microsecond_ |
| **clickhouse.connections.http.created.total** <br>(gauge) | Number of created http connections|
| **clickhouse.connections.http.expired.count** <br>(count) | Number of expired http connections|
| **clickhouse.connections.http.expired.total** <br>(gauge) | Number of expired http connections|
| **clickhouse.connections.http.failed.count** <br>(count) | Number of cases when creation of a http connection failed|
| **clickhouse.connections.http.failed.total** <br>(gauge) | Number of cases when creation of a http connection failed|
| **clickhouse.connections.http.preserved.count** <br>(count) | Number of preserved http connections|
| **clickhouse.connections.http.preserved.total** <br>(gauge) | Number of preserved http connections|
| **clickhouse.connections.http.reset.count** <br>(count) | Number of reset http connections|
| **clickhouse.connections.http.reset.total** <br>(gauge) | Number of reset http connections|
| **clickhouse.connections.http.reused.count** <br>(count) | Number of reused http connections|
| **clickhouse.connections.http.reused.total** <br>(gauge) | Number of reused http connections|
| **clickhouse.connections.outstanding.total** <br>(gauge) | Number of outstanding requests<br>_Shown as connection_ |
| **clickhouse.cpu.time** <br>(gauge) | The percentage of CPU time spent seen by OS during the last interval. Does not include involuntary waits due to virtualization.<br>_Shown as percent_ |
| **clickhouse.data.part.replicated.obsolete.count** <br>(count) | Number of times a data part was covered by another data part that has been fetched from a replica (so, we have marked a covered data part as obsolete and no longer needed).|
| **clickhouse.data.part.replicated.obsolete.total** <br>(gauge) | Number of times a data part was covered by another data part that has been fetched from a replica (so, we have marked a covered data part as obsolete and no longer needed).|
| **clickhouse.database.total** <br>(gauge) | The current number of databases.<br>_Shown as instance_ |
| **clickhouse.ddl.max_processed** <br>(gauge) | Max processed DDL entry of DDLWorker.|
| **clickhouse.dictionary.cache.keys.expired.count** <br>(count) | Number of keys looked up in the dictionaries of 'cache' types and found in the cache but they were obsolete.|
| **clickhouse.dictionary.cache.keys.expired.total** <br>(gauge) | Number of keys looked up in the dictionaries of 'cache' types and found in the cache but they were obsolete.|
| **clickhouse.dictionary.cache.keys.found.count** <br>(count) | Number of keys looked up in the dictionaries of 'cache' types and found in the cache.|
| **clickhouse.dictionary.cache.keys.found.total** <br>(gauge) | Number of keys looked up in the dictionaries of 'cache' types and found in the cache.|
| **clickhouse.dictionary.cache.keys.not_found.count** <br>(count) | Number of keys looked up in the dictionaries of 'cache' types and not found.|
| **clickhouse.dictionary.cache.keys.not_found.total** <br>(gauge) | Number of keys looked up in the dictionaries of 'cache' types and not found.|
| **clickhouse.dictionary.cache.keys.requested.count** <br>(count) | Number of keys requested from the data source for the dictionaries of 'cache' types.|
| **clickhouse.dictionary.cache.keys.requested.total** <br>(gauge) | Number of keys requested from the data source for the dictionaries of 'cache' types.|
| **clickhouse.dictionary.cache.read.waiting.time** <br>(gauge) | Number of nanoseconds spend in waiting for read lock to lookup the data for the dictionaries of 'cache' types.<br>_Shown as nanosecond_ |
| **clickhouse.dictionary.cache.request.time** <br>(gauge) | Number of nanoseconds spend in querying the external data sources for the dictionaries of 'cache' types.<br>_Shown as nanosecond_ |
| **clickhouse.dictionary.cache.requests.count** <br>(count) | Number of bulk requests to the external data sources for the dictionaries of 'cache' types.|
| **clickhouse.dictionary.cache.requests.total** <br>(gauge) | Number of bulk requests to the external data sources for the dictionaries of 'cache' types.|
| **clickhouse.dictionary.cache.write.waiting.time** <br>(gauge) | Number of nanoseconds spend in waiting for write lock to update the data for the dictionaries of 'cache' types.<br>_Shown as nanosecond_ |
| **clickhouse.dictionary.item.current** <br>(gauge) | The number of items stored in a dictionary.<br>_Shown as item_ |
| **clickhouse.dictionary.load** <br>(gauge) | The percentage filled in a dictionary (for a hashed dictionary, the percentage filled in the hash table).<br>_Shown as percent_ |
| **clickhouse.dictionary.memory.used** <br>(gauge) | The total amount of memory used by a dictionary.<br>_Shown as byte_ |
| **clickhouse.dictionary.request.cache** <br>(gauge) | The number of requests in fly to data sources of dictionaries of cache type.<br>_Shown as request_ |
| **clickhouse.disk.azure.copy_object.count** <br>(count) | Number of Disk Azure blob storage API CopyObject calls|
| **clickhouse.disk.azure.copy_object.total** <br>(gauge) | Number of Disk Azure blob storage API CopyObject calls|
| **clickhouse.disk.azure.upload_part.count** <br>(count) | Number of Disk Azure blob storage API UploadPart calls|
| **clickhouse.disk.azure.upload_part.total** <br>(gauge) | Number of Disk Azure blob storage API UploadPart calls|
| **clickhouse.disk.connectioned.active** <br>(gauge) | Total count of all sessions: stored in the pool and actively used right now for disks|
| **clickhouse.disk.connections.created.count** <br>(count) | Number of created connections for disk|
| **clickhouse.disk.connections.created.time** <br>(gauge) | Total time spend on creating connections for disk<br>_Shown as microsecond_ |
| **clickhouse.disk.connections.created.total** <br>(gauge) | Number of created connections for disk|
| **clickhouse.disk.connections.errors.count** <br>(count) | Number of cases when creation of a connection for disk is failed|
| **clickhouse.disk.connections.errors.total** <br>(gauge) | Number of cases when creation of a connection for disk is failed|
| **clickhouse.disk.connections.expired.count** <br>(count) | Number of expired connections for disk|
| **clickhouse.disk.connections.expired.total** <br>(gauge) | Number of expired connections for disk|
| **clickhouse.disk.connections.preserved.count** <br>(count) | Number of preserved connections for disk|
| **clickhouse.disk.connections.preserved.total** <br>(gauge) | Number of preserved connections for disk|
| **clickhouse.disk.connections.reset.count** <br>(count) | Number of reset connections for disk|
| **clickhouse.disk.connections.reset.total** <br>(gauge) | Number of reset connections for disk|
| **clickhouse.disk.connections.reused.count** <br>(count) | Number of reused connections for disk|
| **clickhouse.disk.connections.reused.total** <br>(gauge) | Number of reused connections for disk|
| **clickhouse.disk.connections.stored** <br>(gauge) | Total count of sessions stored in the session pool for disks|
| **clickhouse.disk.read.size.count** <br>(count) | The number of bytes read from disks or block devices during the last interval. Doesn't include bytes read from page cache. May include excessive data due to block size, readahead, etc.<br>_Shown as byte_ |
| **clickhouse.disk.read.size.total** <br>(gauge) | The total number of bytes read from disks or block devices. Doesn't include bytes read from page cache. May include excessive data due to block size, readahead, etc.<br>_Shown as byte_ |
| **clickhouse.disk.write.size.count** <br>(count) | The number of bytes written to disks or block devices during the last interval. Doesn't include bytes that are in page cache dirty pages. May not include data that was written by OS asynchronously.<br>_Shown as byte_ |
| **clickhouse.disk.write.size.total** <br>(gauge) | The total number of bytes written to disks or block devices. Doesn't include bytes that are in page cache dirty pages. May not include data that was written by OS asynchronously.<br>_Shown as byte_ |
| **clickhouse.disk_s3.abort_multipart_upload.count** <br>(count) | Number of DiskS3 API AbortMultipartUpload calls.|
| **clickhouse.disk_s3.abort_multipart_upload.total** <br>(gauge) | Number of DiskS3 API AbortMultipartUpload calls.|
| **clickhouse.disk_s3.copy_object.count** <br>(count) | Number of DiskS3 API CopyObject calls.|
| **clickhouse.disk_s3.copy_object.total** <br>(gauge) | Number of DiskS3 API CopyObject calls.|
| **clickhouse.disk_s3.create_multipart_upload.count** <br>(count) | Number of DiskS3 API CreateMultipartUpload calls.|
| **clickhouse.disk_s3.create_multipart_upload.total** <br>(gauge) | Number of DiskS3 API CreateMultipartUpload calls.|
| **clickhouse.disk_s3.delete_object.count** <br>(count) | Number of DiskS3 API DeleteObject(s) calls.|
| **clickhouse.disk_s3.delete_object.total** <br>(gauge) | Number of DiskS3 API DeleteObject(s) calls.|
| **clickhouse.disk_s3.get_object.count** <br>(count) | Number of DiskS3 API GetObject calls.|
| **clickhouse.disk_s3.get_object.total** <br>(gauge) | Number of DiskS3 API GetObject calls.|
| **clickhouse.disk_s3.get_object_attributes.count** <br>(count) | Number of DiskS3 API GetObjectAttributes calls.|
| **clickhouse.disk_s3.get_object_attributes.total** <br>(gauge) | Number of DiskS3 API GetObjectAttributes calls.|
| **clickhouse.disk_s3.get_request.throttler.time** <br>(gauge) | Total time a query was sleeping to conform DiskS3 GET and SELECT request throttling.<br>_Shown as microsecond_ |
| **clickhouse.disk_s3.head_objects.count** <br>(count) | Number of DiskS3 API HeadObject calls.|
| **clickhouse.disk_s3.head_objects.total** <br>(gauge) | Number of DiskS3 API HeadObject calls.|
| **clickhouse.disk_s3.list_objects.count** <br>(count) | Number of DiskS3 API ListObjects calls.|
| **clickhouse.disk_s3.list_objects.total** <br>(gauge) | Number of DiskS3 API ListObjects calls.|
| **clickhouse.disk_s3.put_object.count** <br>(count) | Number of DiskS3 API PutObject calls.|
| **clickhouse.disk_s3.put_object.total** <br>(gauge) | Number of DiskS3 API PutObject calls.|
| **clickhouse.disk_s3.put_request.throttler.time** <br>(gauge) | Total time a query was sleeping to conform DiskS3 PUT, COPY, POST and LIST request throttling.<br>_Shown as microsecond_ |
| **clickhouse.disk_s3.read.requests.count** <br>(count) | Number of GET and HEAD requests to DiskS3 storage.|
| **clickhouse.disk_s3.read.requests.errors.count** <br>(count) | Number of non-throttling errors in GET and HEAD requests to DiskS3 storage.|
| **clickhouse.disk_s3.read.requests.errors.total** <br>(gauge) | Number of non-throttling errors in GET and HEAD requests to DiskS3 storage.|
| **clickhouse.disk_s3.read.requests.redirects.count** <br>(count) | Number of redirects in GET and HEAD requests to DiskS3 storage.|
| **clickhouse.disk_s3.read.requests.redirects.total** <br>(gauge) | Number of redirects in GET and HEAD requests to DiskS3 storage.|
| **clickhouse.disk_s3.read.requests.throttling.count** <br>(count) | Number of 429 and 503 errors in GET and HEAD requests to DiskS3 storage.|
| **clickhouse.disk_s3.read.requests.throttling.total** <br>(gauge) | Number of 429 and 503 errors in GET and HEAD requests to DiskS3 storage.|
| **clickhouse.disk_s3.read.requests.total** <br>(gauge) | Number of GET and HEAD requests to DiskS3 storage.|
| **clickhouse.disk_s3.read.time** <br>(gauge) | Time of GET and HEAD requests to DiskS3 storage.<br>_Shown as microsecond_ |
| **clickhouse.disk_s3.upload_part.count** <br>(count) | Number of DiskS3 API UploadPart calls.|
| **clickhouse.disk_s3.upload_part.total** <br>(gauge) | Number of DiskS3 API UploadPart calls.|
| **clickhouse.disk_s3.upload_part_copy.count** <br>(count) | Number of DiskS3 API UploadPartCopy calls.|
| **clickhouse.disk_s3.upload_part_copy.total** <br>(gauge) | Number of DiskS3 API UploadPartCopy calls.|
| **clickhouse.disk_s3.write.requests.count** <br>(count) | Number of POST, DELETE, PUT and PATCH requests to DiskS3 storage.|
| **clickhouse.disk_s3.write.requests.errors.count** <br>(count) | Number of non-throttling errors in POST, DELETE, PUT and PATCH requests to DiskS3 storage.|
| **clickhouse.disk_s3.write.requests.errors.total** <br>(gauge) | Number of non-throttling errors in POST, DELETE, PUT and PATCH requests to DiskS3 storage.|
| **clickhouse.disk_s3.write.requests.redirects.count** <br>(count) | Number of redirects in POST, DELETE, PUT and PATCH requests to DiskS3 storage.|
| **clickhouse.disk_s3.write.requests.redirects.total** <br>(gauge) | Number of redirects in POST, DELETE, PUT and PATCH requests to DiskS3 storage.|
| **clickhouse.disk_s3.write.requests.total** <br>(gauge) | Number of POST, DELETE, PUT and PATCH requests to DiskS3 storage.|
| **clickhouse.disk_s3.write.time** <br>(gauge) | Time of POST, DELETE, PUT and PATCH requests to DiskS3 storage.<br>_Shown as microsecond_ |
| **clickhouse.distributed.connection.fail_at_all.count** <br>(count) | Count when distributed connection fails after all retries finished<br>_Shown as connection_ |
| **clickhouse.distributed.connection.fail_at_all.total** <br>(gauge) | Total count when distributed connection fails after all retries finished<br>_Shown as connection_ |
| **clickhouse.distributed.connection.fail_try.count** <br>(count) | Count when distributed connection fails with retry<br>_Shown as connection_ |
| **clickhouse.distributed.connection.fail_try.total** <br>(gauge) | Total count when distributed connection fails with retry<br>_Shown as connection_ |
| **clickhouse.distributed.connection.successful.count** <br>(count) | Total count of successful distributed connections to a usable server (with required table, but maybe stale).|
| **clickhouse.distributed.connection.successful.total** <br>(gauge) | Total count of successful distributed connections to a usable server (with required table, but maybe stale).|
| **clickhouse.distributed.connection.tries.count** <br>(count) | Total count of distributed connection attempts.|
| **clickhouse.distributed.connection.tries.total** <br>(gauge) | Total count of distributed connection attempts.|
| **clickhouse.distributed.delayed.inserts.time** <br>(gauge) | Total number of milliseconds spent while the INSERT of a block to a Distributed table was throttled due to high number of pending bytes.<br>_Shown as microsecond_ |
| **clickhouse.distributed.inserts.delayed.count** <br>(count) | Number of times the INSERT of a block to a Distributed table was throttled due to high number of pending bytes.<br>_Shown as query_ |
| **clickhouse.distributed.inserts.delayed.total** <br>(gauge) | Total number of times the INSERT of a block to a Distributed table was throttled due to high number of pending bytes.<br>_Shown as query_ |
| **clickhouse.distributed.inserts.rejected.count** <br>(count) | Number of times the INSERT of a block to a Distributed table was rejected with 'Too many bytes' exception due to high number of pending bytes.<br>_Shown as query_ |
| **clickhouse.distributed.inserts.rejected.total** <br>(gauge) | Total number of times the INSERT of a block to a Distributed table was rejected with 'Too many bytes' exception due to high number of pending bytes.<br>_Shown as query_ |
| **clickhouse.distributed_cache.clickhouse_server.connections.open** <br>(gauge) | Number of open connections to ClickHouse server from Distributed Cache|
| **clickhouse.distributed_cache.connections.open.total** <br>(gauge) | The number of open connections to distributed cache|
| **clickhouse.distributed_cache.connections.open.used** <br>(gauge) | Number of currently used connections to Distributed Cache|
| **clickhouse.distributed_cache.read.requests** <br>(gauge) | Number of executed Read requests to Distributed Cache|
| **clickhouse.distributed_cache.write.requests** <br>(gauge) | Number of executed Write requests to Distributed Cache|
| **clickhouse.drained_connections.async** <br>(gauge) | Number of connections drained asynchronously.<br>_Shown as connection_ |
| **clickhouse.drained_connections.async.active** <br>(gauge) | Number of active connections drained asynchronously.<br>_Shown as connection_ |
| **clickhouse.drained_connections.sync** <br>(gauge) | Number of connections drained synchronously.<br>_Shown as connection_ |
| **clickhouse.drained_connections.sync.active** <br>(gauge) | Number of active connections drained synchronously.<br>_Shown as connection_ |
| **clickhouse.error.dns.count** <br>(count) |  Number of errors in DNS resolution<br>_Shown as error_ |
| **clickhouse.error.dns.total** <br>(gauge) | Total count of errors in DNS resolution<br>_Shown as error_ |
| **clickhouse.file.open.count** <br>(count) | The number of files opened during the last interval.<br>_Shown as file_ |
| **clickhouse.file.open.read** <br>(gauge) | The number of files open for reading<br>_Shown as file_ |
| **clickhouse.file.open.total** <br>(gauge) | The total number of files opened.<br>_Shown as file_ |
| **clickhouse.file.open.write** <br>(gauge) | The number of files open for writing<br>_Shown as file_ |
| **clickhouse.file.read.count** <br>(count) | The number of reads (read/pread) from a file descriptor during the last interval. Does not include sockets.<br>_Shown as read_ |
| **clickhouse.file.read.fail.count** <br>(count) | The number of times the read (read/pread) from a file descriptor have failed during the last interval.<br>_Shown as read_ |
| **clickhouse.file.read.fail.total** <br>(gauge) | The total number of times the read (read/pread) from a file descriptor have failed.<br>_Shown as read_ |
| **clickhouse.file.read.size.count** <br>(count) | The number of bytes read from file descriptors during the last interval. If the file is compressed, this will show the compressed data size.<br>_Shown as byte_ |
| **clickhouse.file.read.size.total** <br>(gauge) | The total number of bytes read from file descriptors. If the file is compressed, this will show the compressed data size.<br>_Shown as byte_ |
| **clickhouse.file.read.slow.count** <br>(count) | The number of reads from a file that were slow during the last interval. This indicates system overload. Thresholds are controlled by read_backoff\_\* settings.<br>_Shown as read_ |
| **clickhouse.file.read.slow.total** <br>(gauge) | The total number of reads from a file that were slow. This indicates system overload. Thresholds are controlled by read_backoff\_\* settings.<br>_Shown as read_ |
| **clickhouse.file.read.total** <br>(gauge) | The total number of reads (read/pread) from a file descriptor. Does not include sockets.<br>_Shown as read_ |
| **clickhouse.file.seek.count** <br>(count) | The number of times the `lseek` function was called during the last interval.<br>_Shown as operation_ |
| **clickhouse.file.seek.total** <br>(gauge) | The total number of times the `lseek` function was called.<br>_Shown as operation_ |
| **clickhouse.file.write.count** <br>(count) | The number of writes (write/pwrite) to a file descriptor during the last interval. Does not include sockets.<br>_Shown as write_ |
| **clickhouse.file.write.fail.count** <br>(count) | The number of times the write (write/pwrite) to a file descriptor have failed during the last interval.<br>_Shown as write_ |
| **clickhouse.file.write.fail.total** <br>(gauge) | The total number of times the write (write/pwrite) to a file descriptor have failed.<br>_Shown as write_ |
| **clickhouse.file.write.size.count** <br>(count) | The number of bytes written to file descriptors during the last interval. If the file is compressed, this will show compressed data size.<br>_Shown as byte_ |
| **clickhouse.file.write.size.total** <br>(gauge) | The total number of bytes written to file descriptors during the last interval. If the file is compressed, this will show compressed data size.<br>_Shown as byte_ |
| **clickhouse.file.write.total** <br>(gauge) | The total number of writes (write/pwrite) to a file descriptor. Does not include sockets.<br>_Shown as write_ |
| **clickhouse.file_segment.cache.complete.time** <br>(gauge) | Duration of FileSegment::complete() in filesystem cache<br>_Shown as microsecond_ |
| **clickhouse.file_segment.cache.predownload.time** <br>(gauge) | Metric per file segment. Time spent pre-downloading data to cache (pre-downloading - finishing file segment download (after someone who failed to do that) up to the point current thread was requested to do)<br>_Shown as microsecond_ |
| **clickhouse.file_segment.cache.write.time** <br>(gauge) | Metric per file segment. Time spend writing data to cache<br>_Shown as microsecond_ |
| **clickhouse.file_segment.download.wait_time.count** <br>(count) | Wait on DOWNLOADING state|
| **clickhouse.file_segment.download.wait_time.total** <br>(gauge) | Wait on DOWNLOADING state|
| **clickhouse.file_segment.holder.complete.time** <br>(gauge) | File segments holder complete() time<br>_Shown as microsecond_ |
| **clickhouse.file_segment.lock.time** <br>(gauge) | Lock file segment time<br>_Shown as microsecond_ |
| **clickhouse.file_segment.read.time** <br>(gauge) | Metric per file segment. Time spend reading from file<br>_Shown as microsecond_ |
| **clickhouse.file_segment.remove.time** <br>(gauge) | File segment remove() time<br>_Shown as microsecond_ |
| **clickhouse.file_segment.use.bytes.count** <br>(count) | Metric per file segment. How many bytes were actually used from current file segment|
| **clickhouse.file_segment.use.bytes.total** <br>(gauge) | Metric per file segment. How many bytes were actually used from current file segment|
| **clickhouse.file_segment.use.time** <br>(gauge) | File segment use() time<br>_Shown as microsecond_ |
| **clickhouse.file_segment.write.timex.count** <br>(count) | File segment write() time|
| **clickhouse.file_segment.write.timex.total** <br>(gauge) | File segment write() time|
| **clickhouse.filesystem.cache.buffers.active** <br>(gauge) | Number of active cache buffers<br>_Shown as buffer_ |
| **clickhouse.filesystem.cache.cleanup.queue** <br>(gauge) | Filesystem cache elements in background cleanup queue|
| **clickhouse.filesystem.cache.download.queue** <br>(gauge) | Filesystem cache elements in download queue|
| **clickhouse.filesystem.cache.elements** <br>(gauge) | Filesystem cache elements (file segments)|
| **clickhouse.filesystem.cache.eviction.bytes.count** <br>(count) | Number of bytes evicted from filesystem cache|
| **clickhouse.filesystem.cache.eviction.bytes.total** <br>(gauge) | Number of bytes evicted from filesystem cache|
| **clickhouse.filesystem.cache.eviction.time** <br>(gauge) | Filesystem cache eviction time<br>_Shown as microsecond_ |
| **clickhouse.filesystem.cache.filesegments.hold** <br>(gauge) | Filesystem cache file segments count, which were hold|
| **clickhouse.filesystem.cache.get.time** <br>(gauge) | Filesystem cache get() time<br>_Shown as microsecond_ |
| **clickhouse.filesystem.cache.get_set.time** <br>(gauge) | Filesystem cache getOrSet() time<br>_Shown as microsecond_ |
| **clickhouse.filesystem.cache.limit** <br>(gauge) | Filesystem cache size limit in bytes|
| **clickhouse.filesystem.cache.lock.key.time** <br>(gauge) | Lock cache key time<br>_Shown as microsecond_ |
| **clickhouse.filesystem.cache.lock.metadata.time** <br>(gauge) | Lock filesystem cache metadata time<br>_Shown as microsecond_ |
| **clickhouse.filesystem.cache.lock.time** <br>(gauge) | Lock filesystem cache time<br>_Shown as microsecond_ |
| **clickhouse.filesystem.cache.metadata.load.time** <br>(gauge) | Time spent loading filesystem cache metadata<br>_Shown as microsecond_ |
| **clickhouse.filesystem.cache.reserve.time** <br>(gauge) | Filesystem cache space reservation time<br>_Shown as microsecond_ |
| **clickhouse.filesystem.cache.size** <br>(gauge) | Filesystem cache size in bytes|
| **clickhouse.filesystem.remote.aysnc.read.prefetches.count** <br>(count) | Number of prefetches made with asynchronous reading from remote filesystem|
| **clickhouse.filesystem.remote.aysnc.read.prefetches.total** <br>(gauge) | Number of prefetches made with asynchronous reading from remote filesystem|
| **clickhouse.filesystem.remote.buffer.seeks.count** <br>(count) | Total number of seeks for async buffer|
| **clickhouse.filesystem.remote.buffer.seeks.reset.count** <br>(count) | Number of seeks which lead to a new connection|
| **clickhouse.filesystem.remote.buffer.seeks.reset.total** <br>(gauge) | Number of seeks which lead to a new connection|
| **clickhouse.filesystem.remote.buffer.seeks.total** <br>(gauge) | Total number of seeks for async buffer|
| **clickhouse.filesystem.remote.buffers.count** <br>(count) | Number of buffers created for asynchronous reading from remote filesystem|
| **clickhouse.filesystem.remote.buffers.total** <br>(gauge) | Number of buffers created for asynchronous reading from remote filesystem|
| **clickhouse.filesystem.remote.lazy_seeks.count** <br>(count) | Number of lazy seeks|
| **clickhouse.filesystem.remote.lazy_seeks.total** <br>(gauge) | Number of lazy seeks|
| **clickhouse.filesystem.remote.prefetched.reads.count** <br>(count) | Number of reads from prefecthed buffer|
| **clickhouse.filesystem.remote.prefetched.reads.total** <br>(gauge) | Number of reads from prefecthed buffer|
| **clickhouse.filesystem.remote.prefetched.size.count** <br>(count) | Number of bytes from prefecthed buffer|
| **clickhouse.filesystem.remote.prefetched.size.total** <br>(gauge) | Number of bytes from prefecthed buffer|
| **clickhouse.filesystem.remote.prefetches.pending.count** <br>(count) | Number of prefetches pending at buffer destruction|
| **clickhouse.filesystem.remote.prefetches.pending.total** <br>(gauge) | Number of prefetches pending at buffer destruction|
| **clickhouse.filesystem.remote.unprefetched.size.count** <br>(count) | Number of bytes from unprefetched buffer|
| **clickhouse.filesystem.remote.unprefetched.size.total** <br>(gauge) | Number of bytes from unprefetched buffer|
| **clickhouse.fs.read.size.count** <br>(count) | The number of bytes read from filesystem (including page cache) during the last interval.<br>_Shown as byte_ |
| **clickhouse.fs.read.size.total** <br>(gauge) | The total number of bytes read from filesystem (including page cache).<br>_Shown as byte_ |
| **clickhouse.fs.write.size.count** <br>(count) | The number of bytes written to filesystem (including page cache) during the last interval.<br>_Shown as byte_ |
| **clickhouse.fs.write.size.total** <br>(gauge) | The total number of bytes written to filesystem (including page cache).<br>_Shown as byte_ |
| **clickhouse.function.filesync.count** <br>(count) | Number of times the F_FULLFSYNC/fsync/fdatasync function was called for files.|
| **clickhouse.function.filesync.time** <br>(gauge) | Total time spent waiting for F_FULLFSYNC/fsync/fdatasync syscall for files.<br>_Shown as microsecond_ |
| **clickhouse.function.filesync.total** <br>(gauge) | Number of times the F_FULLFSYNC/fsync/fdatasync function was called for files.|
| **clickhouse.hash_table.elements.allocated.aggregation.count** <br>(count) | How many elements were preallocated in hash tables for aggregation.|
| **clickhouse.hash_table.elements.allocated.aggregation.total** <br>(gauge) | How many elements were preallocated in hash tables for aggregation.|
| **clickhouse.http_connection.addresses.expired.count** <br>(count) | Total count of expired addresses which is no longer presented in dns resolve results for http connections|
| **clickhouse.http_connection.addresses.expired.total** <br>(gauge) | Total count of expired addresses which is no longer presented in dns resolve results for http connections|
| **clickhouse.http_connection.addresses.faulty.count** <br>(count) | Total count of addresses which has been marked as faulty due to connection errors for http connections|
| **clickhouse.http_connection.addresses.faulty.total** <br>(gauge) | Total count of addresses which has been marked as faulty due to connection errors for http connections|
| **clickhouse.http_connection.addresses.new.count** <br>(count) | Total count of new addresses in dns resolve results for http connections|
| **clickhouse.http_connection.addresses.new.total** <br>(gauge) | Total count of new addresses in dns resolve results for http connections|
| **clickhouse.index.usearch.distance.compute.count** <br>(count) | Number of times distance was computed when adding vectors to usearch indexes.|
| **clickhouse.index.usearch.distance.compute.total** <br>(gauge) | Number of times distance was computed when adding vectors to usearch indexes.|
| **clickhouse.index.usearch.search.node.visit.count** <br>(count) | Number of nodes visited when searching in usearch indexes.|
| **clickhouse.index.usearch.search.node.visit.total** <br>(gauge) | Number of nodes visited when searching in usearch indexes.|
| **clickhouse.index.usearch.search.operation.count** <br>(count) | Number of search operations performed in usearch indexes.|
| **clickhouse.index.usearch.search.operation.total** <br>(gauge) | Number of search operations performed in usearch indexes.|
| **clickhouse.index.usearch.vector.add.count** <br>(count) | Number of vectors added to usearch indexes.|
| **clickhouse.index.usearch.vector.add.total** <br>(gauge) | Number of vectors added to usearch indexes.|
| **clickhouse.index.usearch.vector.node.visit.count** <br>(count) | Number of nodes visited when adding vectors to usearch indexes.|
| **clickhouse.index.usearch.vector.node.visit.total** <br>(gauge) | Number of nodes visited when adding vectors to usearch indexes.|
| **clickhouse.insert.query.time** <br>(gauge) | Total time of INSERT queries.<br>_Shown as microsecond_ |
| **clickhouse.insert_queue.async.size** <br>(gauge) | Number of pending bytes in the AsynchronousInsert queue.|
| **clickhouse.insert_queue.async.total** <br>(gauge) | Number of pending tasks in the AsynchronousInsert queue.|
| **clickhouse.insert_threads.async.active** <br>(gauge) | Number of threads in the AsynchronousInsert thread pool running a task.|
| **clickhouse.insert_threads.async.scheduled** <br>(gauge) | Number of queued or active jobs in the AsynchronousInsert thread pool.|
| **clickhouse.insert_threads.async.total** <br>(gauge) | Number of threads in the AsynchronousInsert thread pool.|
| **clickhouse.inserts.async.flush.pending** <br>(gauge) | Number of asynchronous inserts that are waiting for flush.|
| **clickhouse.interface.http.received.bytes.count** <br>(count) | Number of bytes received through HTTP interfaces|
| **clickhouse.interface.http.received.bytes.total** <br>(gauge) | Number of bytes received through HTTP interfaces|
| **clickhouse.interface.http.sent.bytes.count** <br>(count) | Number of bytes sent through HTTP interfaces|
| **clickhouse.interface.http.sent.bytes.total** <br>(gauge) | Number of bytes sent through HTTP interfaces|
| **clickhouse.interface.mysql.received.bytes.count** <br>(count) | Number of bytes received through MySQL interfaces|
| **clickhouse.interface.mysql.received.bytes.total** <br>(gauge) | Number of bytes received through MySQL interfaces|
| **clickhouse.interface.mysql.sent.bytes.count** <br>(count) | Number of bytes sent through MySQL interfaces|
| **clickhouse.interface.mysql.sent.bytes.total** <br>(gauge) | Number of bytes sent through MySQL interfaces|
| **clickhouse.interface.native.received.bytes.count** <br>(count) | Number of bytes received through native interfaces|
| **clickhouse.interface.native.received.bytes.total** <br>(gauge) | Number of bytes received through native interfaces|
| **clickhouse.interface.native.sent.bytes.count** <br>(count) | Number of bytes sent through native interfaces|
| **clickhouse.interface.native.sent.bytes.total** <br>(gauge) | Number of bytes sent through native interfaces|
| **clickhouse.interface.postgresql.sent.bytes.count** <br>(count) | Number of bytes sent through PostgreSQL interfaces|
| **clickhouse.interface.postgresql.sent.bytes.total** <br>(gauge) | Number of bytes sent through PostgreSQL interfaces|
| **clickhouse.interface.prometheus.sent.bytes.count** <br>(count) | Number of bytes sent through Prometheus interfaces|
| **clickhouse.interface.prometheus.sent.bytes.total** <br>(gauge) | Number of bytes sent through Prometheus interfaces|
| **clickhouse.io_buffer.allocated.bytes.count** <br>(count) | Number of bytes allocated for IO buffers (for ReadBuffer/WriteBuffer).<br>_Shown as byte_ |
| **clickhouse.io_buffer.allocated.bytes.total** <br>(gauge) | Number of bytes allocated for IO buffers (for ReadBuffer/WriteBuffer).<br>_Shown as byte_ |
| **clickhouse.io_buffer.allocated.count** <br>(count) | Number of allocations of IO buffers (for ReadBuffer/WriteBuffer).|
| **clickhouse.io_buffer.allocated.total** <br>(gauge) | Number of allocations of IO buffers (for ReadBuffer/WriteBuffer).|
| **clickhouse.io_uring.cqe.completed.count** <br>(count) | Total number of successfully completed io_uring CQEs|
| **clickhouse.io_uring.cqe.completed.total** <br>(gauge) | Total number of successfully completed io_uring CQEs|
| **clickhouse.io_uring.cqe.failed.count** <br>(count) | Total number of completed io_uring CQEs with failures|
| **clickhouse.io_uring.cqe.failed.total** <br>(gauge) | Total number of completed io_uring CQEs with failures|
| **clickhouse.io_uring.sqe.resubmitted.count** <br>(count) | Total number of io_uring SQE resubmits performed|
| **clickhouse.io_uring.sqe.resubmitted.total** <br>(gauge) | Total number of io_uring SQE resubmits performed|
| **clickhouse.io_uring.sqe.submitted.count** <br>(count) | Total number of io_uring SQEs submitted|
| **clickhouse.io_uring.sqe.submitted.total** <br>(gauge) | Total number of io_uring SQEs submitted|
| **clickhouse.jemalloc.active** <br>(gauge) | (EXPERIMENTAL)<br>_Shown as byte_ |
| **clickhouse.jemalloc.allocated** <br>(gauge) | The amount of memory allocated by ClickHouse.<br>_Shown as byte_ |
| **clickhouse.jemalloc.background_thread.num_runs** <br>(gauge) | (EXPERIMENTAL)<br>_Shown as byte_ |
| **clickhouse.jemalloc.background_thread.num_threads** <br>(gauge) | (EXPERIMENTAL)<br>_Shown as thread_ |
| **clickhouse.jemalloc.background_thread.run_interval** <br>(gauge) | (EXPERIMENTAL)<br>_Shown as byte_ |
| **clickhouse.jemalloc.mapped** <br>(gauge) | The amount of memory in active extents mapped by the allocator.<br>_Shown as byte_ |
| **clickhouse.jemalloc.metadata** <br>(gauge) | The amount of memory dedicated to metadata, which comprise base allocations used for bootstrap-sensitive allocator metadata structures and internal allocations.<br>_Shown as byte_ |
| **clickhouse.jemalloc.metadata_thp** <br>(gauge) | (EXPERIMENTAL)<br>_Shown as byte_ |
| **clickhouse.jemalloc.resident** <br>(gauge) | The amount of memory in physically resident data pages mapped by the allocator, comprising all pages dedicated to allocator metadata, pages backing active allocations, and unused dirty pages.<br>_Shown as byte_ |
| **clickhouse.jemalloc.retained** <br>(gauge) | The amount of memory in virtual memory mappings that were retained rather than being returned to the operating system.<br>_Shown as byte_ |
| **clickhouse.kafka.background.reads** <br>(gauge) | Number of background reads currently working (populating materialized views from Kafka)<br>_Shown as read_ |
| **clickhouse.kafka.background.reads.count** <br>(count) | Number of background reads currently working (populating materialized views from Kafka)|
| **clickhouse.kafka.background.reads.total** <br>(gauge) | Number of background reads currently working (populating materialized views from Kafka)|
| **clickhouse.kafka.commit.failed.count** <br>(count) | Number of failed commits of consumed offsets to Kafka (usually is a sign of some data duplication)|
| **clickhouse.kafka.commit.failed.total** <br>(gauge) | Number of failed commits of consumed offsets to Kafka (usually is a sign of some data duplication)|
| **clickhouse.kafka.commit.success.count** <br>(count) | Number of successful commits of consumed offsets to Kafka (normally should be the same as KafkaBackgroundReads)|
| **clickhouse.kafka.commit.success.total** <br>(gauge) | Number of successful commits of consumed offsets to Kafka (normally should be the same as KafkaBackgroundReads)|
| **clickhouse.kafka.consumer.errors.count** <br>(count) | Number of errors reported by librdkafka during polls|
| **clickhouse.kafka.consumer.errors.total** <br>(gauge) | Number of errors reported by librdkafka during polls|
| **clickhouse.kafka.consumers.active** <br>(gauge) | Number of active Kafka consumers|
| **clickhouse.kafka.consumers.assigned** <br>(gauge) | Number of active Kafka consumers which have some partitions assigned.|
| **clickhouse.kafka.consumers.in_use** <br>(gauge) | Number of consumers which are currently used by direct or background reads|
| **clickhouse.kafka.direct.read.count** <br>(count) | Number of direct selects from Kafka tables since server start|
| **clickhouse.kafka.direct.read.total** <br>(gauge) | Number of direct selects from Kafka tables since server start|
| **clickhouse.kafka.inserts.running** <br>(gauge) | Number of writes (inserts) to Kafka tables <br>_Shown as write_ |
| **clickhouse.kafka.messages.failed.count** <br>(count) | Number of Kafka messages ClickHouse failed to parse|
| **clickhouse.kafka.messages.failed.total** <br>(gauge) | Number of Kafka messages ClickHouse failed to parse|
| **clickhouse.kafka.messages.polled.count** <br>(count) | Number of Kafka messages polled from librdkafka to ClickHouse|
| **clickhouse.kafka.messages.polled.total** <br>(gauge) | Number of Kafka messages polled from librdkafka to ClickHouse|
| **clickhouse.kafka.messages.produced.count** <br>(count) | Number of messages produced to Kafka|
| **clickhouse.kafka.messages.produced.total** <br>(gauge) | Number of messages produced to Kafka|
| **clickhouse.kafka.messages.read.count** <br>(count) | Number of Kafka messages already processed by ClickHouse|
| **clickhouse.kafka.messages.read.total** <br>(gauge) | Number of Kafka messages already processed by ClickHouse|
| **clickhouse.kafka.partitions.assigned** <br>(gauge) | Number of partitions Kafka tables currently assigned to|
| **clickhouse.kafka.producer.errors.count** <br>(count) | Number of errors during producing the messages to Kafka|
| **clickhouse.kafka.producer.errors.total** <br>(gauge) | Number of errors during producing the messages to Kafka|
| **clickhouse.kafka.producer.flushes.count** <br>(count) | Number of explicit flushes to Kafka producer|
| **clickhouse.kafka.producer.flushes.total** <br>(gauge) | Number of explicit flushes to Kafka producer|
| **clickhouse.kafka.producers.active** <br>(gauge) | Number of active Kafka producer created|
| **clickhouse.kafka.rebalance.assignments.count** <br>(count) | Number of partition assignments (the final stage of consumer group rebalance)|
| **clickhouse.kafka.rebalance.assignments.total** <br>(gauge) | Number of partition assignments (the final stage of consumer group rebalance)|
| **clickhouse.kafka.rebalance.errors.count** <br>(count) | Number of failed consumer group rebalances|
| **clickhouse.kafka.rebalance.errors.total** <br>(gauge) | Number of failed consumer group rebalances|
| **clickhouse.kafka.rebalance.revocations.count** <br>(count) | Number of partition revocations (the first stage of consumer group rebalance)|
| **clickhouse.kafka.rebalance.revocations.total** <br>(gauge) | Number of partition revocations (the first stage of consumer group rebalance)|
| **clickhouse.kafka.rows.read.count** <br>(count) | Number of rows parsed from Kafka messages|
| **clickhouse.kafka.rows.read.total** <br>(gauge) | Number of rows parsed from Kafka messages|
| **clickhouse.kafka.rows.rejected.count** <br>(count) | Number of parsed rows which were later rejected (due to rebalances / errors or similar reasons). Those rows will be consumed again after the rebalance.|
| **clickhouse.kafka.rows.rejected.total** <br>(gauge) | Number of parsed rows which were later rejected (due to rebalances / errors or similar reasons). Those rows will be consumed again after the rebalance.|
| **clickhouse.kafka.rows.written.count** <br>(count) | Number of rows inserted into Kafka tables|
| **clickhouse.kafka.rows.written.total** <br>(gauge) | Number of rows inserted into Kafka tables|
| **clickhouse.kafkta.table.writes.count** <br>(count) | Number of writes (inserts) to Kafka tables|
| **clickhouse.kafkta.table.writes.total** <br>(gauge) | Number of writes (inserts) to Kafka tables|
| **clickhouse.keeper.cache.hit.count** <br>(count) | Number of times an object storage metadata request was answered from cache without making request to Keeper|
| **clickhouse.keeper.cache.hit.total** <br>(gauge) | Number of times an object storage metadata request was answered from cache without making request to Keeper|
| **clickhouse.keeper.cache.miss.count** <br>(count) | Number of times an object storage metadata request had to be answered from Keeper|
| **clickhouse.keeper.cache.miss.total** <br>(gauge) | Number of times an object storage metadata request had to be answered from Keeper|
| **clickhouse.keeper.cache.update.time** <br>(gauge) | Total time spent in updating the cache including waiting for responses from Keeper<br>_Shown as microsecond_ |
| **clickhouse.keeper.check.requests.count** <br>(count) | Number of check requests|
| **clickhouse.keeper.check.requests.total** <br>(gauge) | Number of check requests|
| **clickhouse.keeper.commits.count** <br>(count) | Number of successful commits|
| **clickhouse.keeper.commits.failed.count** <br>(count) | Number of failed commits|
| **clickhouse.keeper.commits.failed.total** <br>(gauge) | Number of failed commits|
| **clickhouse.keeper.commits.total** <br>(gauge) | Number of successful commits|
| **clickhouse.keeper.create.requests.count** <br>(count) | Number of create requests|
| **clickhouse.keeper.create.requests.total** <br>(gauge) | Number of create requests|
| **clickhouse.keeper.exists.requests.count** <br>(count) | Number of exists requests|
| **clickhouse.keeper.exists.requests.total** <br>(gauge) | Number of exists requests|
| **clickhouse.keeper.get.requests.count** <br>(count) | Number of get requests|
| **clickhouse.keeper.get.requests.total** <br>(gauge) | Number of get requests|
| **clickhouse.keeper.latency.count** <br>(count) | Keeper latency|
| **clickhouse.keeper.latency.total** <br>(gauge) | Keeper latency|
| **clickhouse.keeper.list.requests.count** <br>(count) | Number of list requests|
| **clickhouse.keeper.list.requests.total** <br>(gauge) | Number of list requests|
| **clickhouse.keeper.log_entry.file.prefetched.count** <br>(count) | Number of log entries in Keeper being prefetched from the changelog file|
| **clickhouse.keeper.log_entry.file.prefetched.total** <br>(gauge) | Number of log entries in Keeper being prefetched from the changelog file|
| **clickhouse.keeper.log_entry.file.read.count** <br>(count) | Number of log entries in Keeper being read directly from the changelog file|
| **clickhouse.keeper.log_entry.file.read.total** <br>(gauge) | Number of log entries in Keeper being read directly from the changelog file|
| **clickhouse.keeper.multi.requests.count** <br>(count) | Number of multi requests|
| **clickhouse.keeper.multi.requests.total** <br>(gauge) | Number of multi requests|
| **clickhouse.keeper.multi_read.requests.count** <br>(count) | Number of multi read requests|
| **clickhouse.keeper.multi_read.requests.total** <br>(gauge) | Number of multi read requests|
| **clickhouse.keeper.packets.received.count** <br>(count) | Packets received by keeper server|
| **clickhouse.keeper.packets.received.total** <br>(gauge) | Packets received by keeper server|
| **clickhouse.keeper.packets.sent.count** <br>(count) | Packets sent by keeper server|
| **clickhouse.keeper.packets.sent.total** <br>(gauge) | Packets sent by keeper server|
| **clickhouse.keeper.reconfig.requests.count** <br>(count) | Number of reconfig requests|
| **clickhouse.keeper.reconfig.requests.total** <br>(gauge) | Number of reconfig requests|
| **clickhouse.keeper.reconnects.count** <br>(count) | Number of times a reconnect to Keeper was done|
| **clickhouse.keeper.reconnects.total** <br>(gauge) | Number of times a reconnect to Keeper was done|
| **clickhouse.keeper.remove.requests.count** <br>(count) | Number of remove requests|
| **clickhouse.keeper.remove.requests.total** <br>(gauge) | Number of remove requests|
| **clickhouse.keeper.requests.count** <br>(count) | Number of times a request was made to Keeper|
| **clickhouse.keeper.requests.total** <br>(gauge) | Number of times a request was made to Keeper|
| **clickhouse.keeper.requests.total.count** <br>(count) | Total requests number on keeper server|
| **clickhouse.keeper.requests.total.total** <br>(gauge) | Total requests number on keeper server|
| **clickhouse.keeper.set.requests.count** <br>(count) | Number of set requests|
| **clickhouse.keeper.set.requests.total** <br>(gauge) | Number of set requests|
| **clickhouse.keeper.snapshot.apply.count** <br>(count) | Number of snapshot applying|
| **clickhouse.keeper.snapshot.apply.failed.count** <br>(count) | Number of failed snapshot applying|
| **clickhouse.keeper.snapshot.apply.failed.total** <br>(gauge) | Number of failed snapshot applying|
| **clickhouse.keeper.snapshot.apply.total** <br>(gauge) | Number of snapshot applying|
| **clickhouse.keeper.snapshot.create.count** <br>(count) | Number of snapshots creations|
| **clickhouse.keeper.snapshot.create.total** <br>(gauge) | Number of snapshots creations|
| **clickhouse.keeper.snapshot.read.count** <br>(count) | Number of snapshot read(serialization)|
| **clickhouse.keeper.snapshot.read.total** <br>(gauge) | Number of snapshot read(serialization)|
| **clickhouse.keeper.snapshot.save.count** <br>(count) | Number of snapshot save|
| **clickhouse.keeper.snapshot.save.total** <br>(gauge) | Number of snapshot save|
| **clickhouse.keerper.snapshot.create.failed.count** <br>(count) | Number of failed snapshot creations|
| **clickhouse.keerper.snapshot.create.failed.total** <br>(gauge) | Number of failed snapshot creations|
| **clickhouse.lock.context.acquisition.count** <br>(count) | The number of times the lock of Context was acquired or tried to acquire during the last interval. This is global lock.<br>_Shown as event_ |
| **clickhouse.lock.context.acquisition.total** <br>(gauge) | The total number of times the lock of Context was acquired or tried to acquire. This is global lock.<br>_Shown as event_ |
| **clickhouse.lock.context.wait_time.count** <br>(count) | Context lock wait time in microseconds|
| **clickhouse.lock.context.wait_time.total** <br>(gauge) | Context lock wait time in microseconds|
| **clickhouse.lock.read.rwlock.acquired.count** <br>(count) | Number of times a read lock was acquired (in a heavy RWLock).|
| **clickhouse.lock.read.rwlock.acquired.time** <br>(gauge) | Total time spent waiting for a read lock to be acquired (in a heavy RWLock).<br>_Shown as microsecond_ |
| **clickhouse.lock.read.rwlock.acquired.total** <br>(gauge) | Number of times a read lock was acquired (in a heavy RWLock).|
| **clickhouse.lock.write.rwlock.acquired.count** <br>(count) | Number of times a write lock was acquired (in a heavy RWLock).|
| **clickhouse.lock.write.rwlock.acquired.time** <br>(gauge) | Total time spent waiting for a write lock to be acquired (in a heavy RWLock).<br>_Shown as microsecond_ |
| **clickhouse.lock.write.rwlock.acquired.total** <br>(gauge) | Number of times a write lock was acquired (in a heavy RWLock).|
| **clickhouse.log.entry.merge.created.count** <br>(count) | Successfully created log entry to merge parts in ReplicatedMergeTree.<br>_Shown as event_ |
| **clickhouse.log.entry.merge.created.total** <br>(gauge) | Total successfully created log entryies to merge parts in ReplicatedMergeTree.<br>_Shown as event_ |
| **clickhouse.log.entry.merge.not_created.count** <br>(count) | Log entry to merge parts in ReplicatedMergeTree is not created due to concurrent log update by another replica.<br>_Shown as event_ |
| **clickhouse.log.entry.merge.not_created.total** <br>(gauge) | Total log entries to merge parts in ReplicatedMergeTree not created due to concurrent log update by another replica.<br>_Shown as event_ |
| **clickhouse.log.entry.mutation.created.count** <br>(count) | Successfully created log entry to mutate parts in ReplicatedMergeTree.<br>_Shown as event_ |
| **clickhouse.log.entry.mutation.created.total** <br>(gauge) | Total successfully created log entry to mutate parts in ReplicatedMergeTree.<br>_Shown as event_ |
| **clickhouse.log.entry.mutation.not_created.count** <br>(count) | Log entry to mutate parts in ReplicatedMergeTree is not created due to concurrent log update by another replica.<br>_Shown as event_ |
| **clickhouse.log.entry.mutation.not_created.total** <br>(gauge) | Total log entries to mutate parts in ReplicatedMergeTree not created due to concurrent log update by another replica.<br>_Shown as event_ |
| **clickhouse.log.messages.debug.count** <br>(count) | Number of log messages with level Debug|
| **clickhouse.log.messages.debug.total** <br>(gauge) | Number of log messages with level Debug|
| **clickhouse.log.messages.error.count** <br>(count) | Number of log messages with level Error|
| **clickhouse.log.messages.error.total** <br>(gauge) | Number of log messages with level Error|
| **clickhouse.log.messages.fatal.count** <br>(count) | Number of log messages with level Fatal|
| **clickhouse.log.messages.fatal.total** <br>(gauge) | Number of log messages with level Fatal|
| **clickhouse.log.messages.info.count** <br>(count) | Number of log messages with level Info|
| **clickhouse.log.messages.info.total** <br>(gauge) | Number of log messages with level Info|
| **clickhouse.log.messages.test.count** <br>(count) | Number of log messages with level Test|
| **clickhouse.log.messages.test.total** <br>(gauge) | Number of log messages with level Test|
| **clickhouse.log.messages.trace.count** <br>(count) | Number of log messages with level Trace|
| **clickhouse.log.messages.trace.total** <br>(gauge) | Number of log messages with level Trace|
| **clickhouse.log.messages.warning.count** <br>(count) | Number of log messages with level Warning|
| **clickhouse.log.messages.warning.total** <br>(gauge) | Number of log messages with level Warning|
| **clickhouse.marks.load.time** <br>(gauge) | Time spent loading marks<br>_Shown as microsecond_ |
| **clickhouse.marks.loaded.bytes.count** <br>(count) | Size of in-memory representations of loaded marks.|
| **clickhouse.marks.loaded.bytes.total** <br>(gauge) | Size of in-memory representations of loaded marks.|
| **clickhouse.marks.loaded.count.count** <br>(count) | Number of marks loaded (total across columns).|
| **clickhouse.marks.loaded.count.total** <br>(gauge) | Number of marks loaded (total across columns).|
| **clickhouse.memory.allocator.purge.count** <br>(count) | Total number of times memory allocator purge was requested|
| **clickhouse.memory.allocator.purge.time** <br>(gauge) | Total number of times memory allocator purge was requested<br>_Shown as microsecond_ |
| **clickhouse.memory.allocator.purge.total** <br>(gauge) | Total number of times memory allocator purge was requested|
| **clickhouse.memory.allocator.purge.wait.time** <br>(gauge) | Total time spent in waiting for memory to be freed in OvercommitTracker.<br>_Shown as microsecond_ |
| **clickhouse.memory.arena.bytes.count** <br>(count) | Number of bytes allocated for memory Arena (used for GROUP BY and similar operations)<br>_Shown as byte_ |
| **clickhouse.memory.arena.bytes.total** <br>(gauge) | Number of bytes allocated for memory Arena (used for GROUP BY and similar operations)<br>_Shown as byte_ |
| **clickhouse.memory.arena.chunks.count** <br>(count) | Number of chunks allocated for memory Arena (used for GROUP BY and similar operations)|
| **clickhouse.memory.arena.chunks.total** <br>(gauge) | Number of chunks allocated for memory Arena (used for GROUP BY and similar operations)|
| **clickhouse.memory.external.join.files.merged.count** <br>(count) | Number of times temporary files were merged for JOIN in external memory.|
| **clickhouse.memory.external.join.files.merged.total** <br>(gauge) | Number of times temporary files were merged for JOIN in external memory.|
| **clickhouse.memory.external.join.files.num_written.count** <br>(count) | Number of times a temporary file was written to disk for JOIN in external memory.|
| **clickhouse.memory.external.join.files.num_written.total** <br>(gauge) | Number of times a temporary file was written to disk for JOIN in external memory.|
| **clickhouse.memory.external.sort.files.num_written.count** <br>(count) | Number of times a temporary file was written to disk for sorting in external memory.|
| **clickhouse.memory.external.sort.files.num_written.total** <br>(gauge) | Number of times a temporary file was written to disk for sorting in external memory.|
| **clickhouse.merge.active** <br>(gauge) | The number of executing background merges<br>_Shown as merge_ |
| **clickhouse.merge.count** <br>(count) | The number of launched background merges during the last interval.<br>_Shown as merge_ |
| **clickhouse.merge.disk.reserved** <br>(gauge) | Disk space reserved for currently running background merges. It is slightly more than the total size of currently merging parts.<br>_Shown as byte_ |
| **clickhouse.merge.memory** <br>(gauge) | Total amount of memory allocated for background merges. Included in MemoryTrackingInBackgroundProcessingPool. Note that this value may include a drift when the memory was allocated in a context of background processing pool and freed in other context or vice-versa. This happens naturally due to caches for tables indexes and doesn't indicate memory leaks.<br>_Shown as byte_ |
| **clickhouse.merge.parts.compact.count** <br>(count) | Number of parts merged into Compact format.|
| **clickhouse.merge.parts.compact.total** <br>(gauge) | Number of parts merged into Compact format.|
| **clickhouse.merge.parts.wide.count** <br>(count) | Number of parts merged into Wide format.|
| **clickhouse.merge.parts.wide.total** <br>(gauge) | Number of parts merged into Wide format.|
| **clickhouse.merge.read.size.uncompressed.count** <br>(count) | The number of uncompressed bytes (for columns as they are stored in memory) that was read for background merges during the last interval. This is the number before merge.<br>_Shown as byte_ |
| **clickhouse.merge.read.size.uncompressed.total** <br>(gauge) | The total number of uncompressed bytes (for columns as they are stored in memory) that was read for background merges. This is the number before merge.<br>_Shown as byte_ |
| **clickhouse.merge.row.read.count** <br>(count) | The number of rows read for background merges during the last interval. This is the number of rows before merge.<br>_Shown as row_ |
| **clickhouse.merge.row.read.total** <br>(gauge) | The total number of rows read for background merges. This is the number of rows before merge.<br>_Shown as row_ |
| **clickhouse.merge.time** <br>(gauge) | The percentage of time spent for background merges during the last interval.<br>_Shown as percent_ |
| **clickhouse.merge.total** <br>(gauge) | The total number of launched background merges.<br>_Shown as merge_ |
| **clickhouse.merge_tree.announcements.sent** <br>(gauge) | The number of announcements sent from the remote server to the initiator server about the set of data parts (for MergeTree tables). Measured on the remote server side.|
| **clickhouse.merge_tree.read_task.requests.sent** <br>(gauge) | The number of callbacks requested from the remote server back to the initiator server to choose the read task (for MergeTree tables). Measured on the remote server side.|
| **clickhouse.merges_mutations.bytes.total** <br>(gauge) | Total amount of memory (bytes) allocated by background tasks (merges and mutations).|
| **clickhouse.mmapped.file.current** <br>(gauge) | Total number of mmapped files.<br>_Shown as file_ |
| **clickhouse.mmapped.file.size** <br>(gauge) | Sum size of mmapped file regions.<br>_Shown as byte_ |
| **clickhouse.moves.executing.currently** <br>(gauge) | Number of currently executing moves|
| **clickhouse.network.receive.elapsed.time** <br>(gauge) | Total time spent waiting for data to receive or receiving data from the network.<br>_Shown as microsecond_ |
| **clickhouse.network.receive.size.count** <br>(count) | The number of bytes received from network.<br>_Shown as byte_ |
| **clickhouse.network.receive.size.total** <br>(gauge) | The total number of bytes received from network.<br>_Shown as byte_ |
| **clickhouse.network.send.elapsed.time** <br>(gauge) | Total time spent waiting for data to send to network or sending data to network.<br>_Shown as microsecond_ |
| **clickhouse.network.send.size.count** <br>(count) | The number of bytes sent to the network.<br>_Shown as byte_ |
| **clickhouse.network.send.size.total** <br>(gauge) | The total number of bytes sent to the network.<br>_Shown as byte_ |
| **clickhouse.network.threads.receive** <br>(gauge) | Number of threads receiving data from the network.<br>_Shown as thread_ |
| **clickhouse.network.threads.send** <br>(gauge) | Number of threads sending data to the network.<br>_Shown as thread_ |
| **clickhouse.node.remove.count** <br>(count) | The number of times an error happened while trying to remove ephemeral node during the last interval. This is usually not an issue, because ClickHouse's implementation of ZooKeeper library guarantees that the session will expire and the node will be removed.<br>_Shown as error_ |
| **clickhouse.node.remove.total** <br>(gauge) | The total number of times an error happened while trying to remove ephemeral node. This is usually not an issue, because ClickHouse's implementation of ZooKeeper library guarantees that the session will expire and the node will be removed.<br>_Shown as error_ |
| **clickhouse.part.max** <br>(gauge) | The maximum number of active parts in partitions.<br>_Shown as item_ |
| **clickhouse.parts.active** <br>(gauge) | \[Only versions >= 22.7.1\] Active data part used by current and upcoming SELECTs.<br>_Shown as item_ |
| **clickhouse.parts.committed** <br>(gauge) | Active data part, used by current and upcoming SELECTs.<br>_Shown as item_ |
| **clickhouse.parts.compact** <br>(gauge) | Compact parts.<br>_Shown as item_ |
| **clickhouse.parts.compact.inserted.count** <br>(count) | Number of parts inserted in Compact format.<br>_Shown as item_ |
| **clickhouse.parts.compact.inserted.total** <br>(gauge) | Number of parts inserted in Compact format.<br>_Shown as item_ |
| **clickhouse.parts.delete_on_destroy** <br>(gauge) | Part was moved to another disk and should be deleted in own destructor.<br>_Shown as item_ |
| **clickhouse.parts.deleting** <br>(gauge) | Not active data part with identity refcounter, it is deleting right now by a cleaner.<br>_Shown as item_ |
| **clickhouse.parts.inmemory** <br>(gauge) | In-memory parts.<br>_Shown as item_ |
| **clickhouse.parts.mutations.applied.fly.count** <br>(count) | Total number of parts for which there was any mutation applied on fly|
| **clickhouse.parts.mutations.applied.fly.total** <br>(gauge) | Total number of parts for which there was any mutation applied on fly|
| **clickhouse.parts.outdated** <br>(gauge) | Not active data part, but could be used by only current SELECTs, could be deleted after SELECTs finishes.<br>_Shown as item_ |
| **clickhouse.parts.pre_active** <br>(gauge) | \[Only versions >= 22.7.1\] The part is in data_parts but not used for SELECTs.<br>_Shown as item_ |
| **clickhouse.parts.precommitted** <br>(gauge) | The part is in data_parts, but not used for SELECTs.<br>_Shown as item_ |
| **clickhouse.parts.temporary** <br>(gauge) | The part is generating now, it is not in data_parts list.<br>_Shown as item_ |
| **clickhouse.parts.wide** <br>(gauge) | Wide parts.<br>_Shown as item_ |
| **clickhouse.parts.wide.inserted.count** <br>(count) | Number of parts inserted in Wide format.|
| **clickhouse.parts.wide.inserted.total** <br>(gauge) | Number of parts inserted in Wide format.|
| **clickhouse.perf.alignment.faults.count** <br>(count) | Number of alignment faults. These happen when unaligned memory accesses happen; the kernel can handle these but it reduces performance. This happens only on some architectures (never on x86).<br>_Shown as event_ |
| **clickhouse.perf.alignment.faults.total** <br>(gauge) | Total number of alignment faults. These happen when unaligned memory accesses happen; the kernel can handle these but it reduces performance. This happens only on some architectures (never on x86).<br>_Shown as event_ |
| **clickhouse.perf.branch.instructions.count** <br>(count) | Retired branch instructions. Prior to Linux 2.6.35, this used the wrong event on AMD processors.<br>_Shown as unit_ |
| **clickhouse.perf.branch.instructions.total** <br>(gauge) | Total retired branch instructions. Prior to Linux 2.6.35, this used the wrong event on AMD processors.<br>_Shown as unit_ |
| **clickhouse.perf.branch.misses.count** <br>(count) | Mispredicted branch instructions.<br>_Shown as unit_ |
| **clickhouse.perf.branch.misses.total** <br>(gauge) | Total mispredicted branch instructions.<br>_Shown as unit_ |
| **clickhouse.perf.bus.cycles.count** <br>(count) | Bus cycles, which can be different from total cycles.<br>_Shown as unit_ |
| **clickhouse.perf.bus.cycles.total** <br>(gauge) | Total bus cycles, which can be different from total cycles.<br>_Shown as unit_ |
| **clickhouse.perf.cache.misses.count** <br>(count) | Cache misses. Usually this indicates Last Level Cache misses; this is intended to be used in conjunction with the PERFCOUNTHWCACHEREFERENCES event to calculate cache miss rates.<br>_Shown as miss_ |
| **clickhouse.perf.cache.misses.total** <br>(gauge) | Cache misses. Usually this indicates total Last Level Cache misses; this is intended to be used in conjunction with the PERFCOUNTHWCACHEREFERENCES event to calculate cache miss rates.<br>_Shown as miss_ |
| **clickhouse.perf.cache.references.count** <br>(count) | Cache accesses. Usually this indicates Last Level Cache accesses but this may vary depending on your CPU. This may include prefetches and coherency messages; again this depends on the design of your CPU.<br>_Shown as unit_ |
| **clickhouse.perf.cache.references.total** <br>(gauge) | Cache accesses. Usually this indicates total Last Level Cache accesses but this may vary depending on your CPU. This may include prefetches and coherency messages; again this depends on the design of your CPU.<br>_Shown as unit_ |
| **clickhouse.perf.context.switches.count** <br>(count) | Number of context switches|
| **clickhouse.perf.context.switches.total** <br>(gauge) | Total number of context switches|
| **clickhouse.perf.cpu.clock** <br>(gauge) | The CPU clock, a high-resolution per-CPU timer.<br>_Shown as unit_ |
| **clickhouse.perf.cpu.cycles.count** <br>(count) | CPU cycles. Be wary of what happens during CPU frequency scaling.<br>_Shown as unit_ |
| **clickhouse.perf.cpu.cycles.total** <br>(gauge) | Total CPU cycles. Be wary of what happens during CPU frequency scaling.<br>_Shown as unit_ |
| **clickhouse.perf.cpu.migrations.count** <br>(count) | Number of times the process has migrated to a new CPU<br>_Shown as unit_ |
| **clickhouse.perf.cpu.migrations.total** <br>(gauge) | Total number of times the process has migrated to a new CPU<br>_Shown as unit_ |
| **clickhouse.perf.cpu.ref_cycles.count** <br>(count) | CPU cycles; not affected by CPU frequency scaling.<br>_Shown as unit_ |
| **clickhouse.perf.cpu.ref_cycles.total** <br>(gauge) | Total cycles; not affected by CPU frequency scaling.<br>_Shown as unit_ |
| **clickhouse.perf.data.tlb.misses.count** <br>(count) | Data TLB misses<br>_Shown as miss_ |
| **clickhouse.perf.data.tlb.misses.total** <br>(gauge) | Total data TLB misses<br>_Shown as miss_ |
| **clickhouse.perf.data.tlb.references.count** <br>(count) | Data TLB references<br>_Shown as unit_ |
| **clickhouse.perf.data.tlb.references.total** <br>(gauge) | Total data TLB references<br>_Shown as unit_ |
| **clickhouse.perf.emulation.faults.count** <br>(count) | Number of emulation faults. The kernel sometimes traps on unimplemented instructions and emulates them for user space. This can negatively impact performance.<br>_Shown as fault_ |
| **clickhouse.perf.emulation.faults.total** <br>(gauge) | Total number of emulation faults. The kernel sometimes traps on unimplemented instructions and emulates them for user space. This can negatively impact performance.<br>_Shown as fault_ |
| **clickhouse.perf.instruction.tlb.misses.count** <br>(count) | Instruction TLB misses<br>_Shown as miss_ |
| **clickhouse.perf.instruction.tlb.misses.total** <br>(gauge) | Total instruction TLB misses<br>_Shown as miss_ |
| **clickhouse.perf.instruction.tlb.references.count** <br>(count) | Instruction TLB references<br>_Shown as unit_ |
| **clickhouse.perf.instruction.tlb.references.total** <br>(gauge) | Total instruction TLB references<br>_Shown as unit_ |
| **clickhouse.perf.instructions.count** <br>(count) | Retired instructions. Be careful, these can be affected by various issues, most notably hardware interrupt counts.<br>_Shown as unit_ |
| **clickhouse.perf.instructions.total** <br>(gauge) | Total retired instructions. Be careful, these can be affected by various issues, most notably hardware interrupt counts.<br>_Shown as unit_ |
| **clickhouse.perf.local_memory.misses.count** <br>(count) | Local NUMA node memory read misses<br>_Shown as miss_ |
| **clickhouse.perf.local_memory.misses.total** <br>(gauge) | Total local NUMA node memory read misses<br>_Shown as miss_ |
| **clickhouse.perf.local_memory.references.count** <br>(count) | Local NUMA node memory reads<br>_Shown as unit_ |
| **clickhouse.perf.local_memory.references.total** <br>(gauge) | Total local NUMA node memory reads<br>_Shown as unit_ |
| **clickhouse.perf.min_enabled.min_time** <br>(gauge) | For all events, minimum time that an event was enabled. Used to track event multiplexing influence.<br>_Shown as microsecond_ |
| **clickhouse.perf.min_enabled.running_time** <br>(gauge) | Running time for event with minimum enabled time. Used to track the amount of event multiplexing<br>_Shown as microsecond_ |
| **clickhouse.perf.stalled_cycles.backend.count** <br>(count) | Stalled cycles during retirement.<br>_Shown as unit_ |
| **clickhouse.perf.stalled_cycles.backend.total** <br>(gauge) | Total stalled cycles during retirement.<br>_Shown as unit_ |
| **clickhouse.perf.stalled_cycles.frontend.count** <br>(count) | Stalled cycles during issue.<br>_Shown as unit_ |
| **clickhouse.perf.stalled_cycles.frontend.total** <br>(gauge) | Total stalled cycles during issue.<br>_Shown as unit_ |
| **clickhouse.perf.task.clock** <br>(gauge) | A clock count specific to the task that is running|
| **clickhouse.pool.polygon.added.count** <br>(count) | A polygon has been added to the cache (pool) for the 'pointInPolygon' function.|
| **clickhouse.pool.polygon.added.total** <br>(gauge) | A polygon has been added to the cache (pool) for the 'pointInPolygon' function.|
| **clickhouse.pool.polygon.bytes.count** <br>(count) | The number of bytes for polygons added to the cache (pool) for the 'pointInPolygon' function.|
| **clickhouse.pool.polygon.bytes.total** <br>(gauge) | The number of bytes for polygons added to the cache (pool) for the 'pointInPolygon' function.|
| **clickhouse.postgresql.connection** <br>(gauge) | Number of client connections using PostgreSQL protocol<br>_Shown as connection_ |
| **clickhouse.processing.external.files.total.count** <br>(count) | Number of files used by external processing (sorting/aggragating/joining)|
| **clickhouse.processing.external.files.total.total** <br>(gauge) | Number of files used by external processing (sorting/aggragating/joining)|
| **clickhouse.queries.read.new_parts.ignored.count** <br>(count) | See setting ignore_cold_parts_seconds. Number of times read queries ignored very new parts that weren't pulled into cache by CacheWarmer yet.|
| **clickhouse.queries.read.new_parts.ignored.total** <br>(gauge) | See setting ignore_cold_parts_seconds. Number of times read queries ignored very new parts that weren't pulled into cache by CacheWarmer yet.|
| **clickhouse.queries.read.outdated.parts.count** <br>(count) | See setting prefer_warmed_unmerged_parts_seconds. Number of times read queries used outdated pre-merge parts that are in cache instead of merged part that wasn't pulled into cache by CacheWarmer yet.|
| **clickhouse.queries.read.outdated.parts.total** <br>(gauge) | See setting prefer_warmed_unmerged_parts_seconds. Number of times read queries used outdated pre-merge parts that are in cache instead of merged part that wasn't pulled into cache by CacheWarmer yet.|
| **clickhouse.query.active** <br>(gauge) | The number of executing queries<br>_Shown as query_ |
| **clickhouse.query.async.insert.bytes.count** <br>(count) | Data size in bytes of asynchronous INSERT queries.|
| **clickhouse.query.async.insert.bytes.total** <br>(gauge) | Data size in bytes of asynchronous INSERT queries.|
| **clickhouse.query.async.insert.count** <br>(count) | Same as InsertQuery, but only for asynchronous INSERT queries.|
| **clickhouse.query.async.insert.failed.count** <br>(count) | Number of failed ASYNC INSERT queries.|
| **clickhouse.query.async.insert.failed.total** <br>(gauge) | Number of failed ASYNC INSERT queries.|
| **clickhouse.query.async.insert.hash_id.duplicate.count** <br>(count) | Number of times a duplicate hash id has been found in asynchronous INSERT hash id cache.|
| **clickhouse.query.async.insert.hash_id.duplicate.total** <br>(gauge) | Number of times a duplicate hash id has been found in asynchronous INSERT hash id cache.|
| **clickhouse.query.async.insert.rows.count** <br>(count) | Number of rows inserted by asynchronous INSERT queries.|
| **clickhouse.query.async.insert.rows.total** <br>(gauge) | Number of rows inserted by asynchronous INSERT queries.|
| **clickhouse.query.async.insert.total** <br>(gauge) | Same as InsertQuery, but only for asynchronous INSERT queries.|
| **clickhouse.query.async.loader.wait.time** <br>(gauge) | Total time a query was waiting for async loader jobs.<br>_Shown as microsecond_ |
| **clickhouse.query.count** <br>(count) | The number of queries to be interpreted and potentially executed during the last interval. Does not include queries that failed to parse or were rejected due to AST size limits, quota limits or limits on the number of simultaneously running queries. May include internal queries initiated by ClickHouse itself. Does not count subqueries.<br>_Shown as query_ |
| **clickhouse.query.failed.count** <br>(count) | Number of failed queries.<br>_Shown as query_ |
| **clickhouse.query.failed.total** <br>(gauge) | Total number of failed queries.<br>_Shown as query_ |
| **clickhouse.query.initial.count** <br>(count) | Same as Query, but only counts initial queries (see is_initial_query).|
| **clickhouse.query.initial.total** <br>(gauge) | Same as Query, but only counts initial queries (see is_initial_query).|
| **clickhouse.query.insert.count** <br>(count) | The number of INSERT queries to be interpreted and potentially executed during the last interval. Does not include queries that failed to parse or were rejected due to AST size limits, quota limits or limits on the number of simultaneously running queries. May include internal queries initiated by ClickHouse itself. Does not count subqueries.<br>_Shown as query_ |
| **clickhouse.query.insert.delayed** <br>(gauge) | The number of INSERT queries that are throttled due to high number of active data parts for partition in a MergeTree table.<br>_Shown as query_ |
| **clickhouse.query.insert.failed.count** <br>(count) | Same as FailedQuery, but only for INSERT queries.<br>_Shown as query_ |
| **clickhouse.query.insert.failed.total** <br>(gauge) | Same as FailedQuery, but only for INSERT queries.<br>_Shown as query_ |
| **clickhouse.query.insert.subqueries.count** <br>(count) | Count INSERT queries with all subqueries|
| **clickhouse.query.insert.subqueries.total** <br>(gauge) | Count INSERT queries with all subqueries|
| **clickhouse.query.insert.total** <br>(gauge) | The total number of INSERT queries to be interpreted and potentially executed. Does not include queries that failed to parse or were rejected due to AST size limits, quota limits or limits on the number of simultaneously running queries. May include internal queries initiated by ClickHouse itself. Does not count subqueries.<br>_Shown as query_ |
| **clickhouse.query.local_timers.active** <br>(gauge) | Number of Created thread local timers in QueryProfiler|
| **clickhouse.query.mask.match.count** <br>(count) | The number of times query masking rules were successfully matched during the last interval.<br>_Shown as occurrence_ |
| **clickhouse.query.mask.match.total** <br>(gauge) | The total number of times query masking rules were successfully matched.<br>_Shown as occurrence_ |
| **clickhouse.query.memory** <br>(gauge) | Total amount of memory allocated in currently executing queries. Note that some memory allocations may not be accounted.<br>_Shown as byte_ |
| **clickhouse.query.memory.limit_exceeded.count** <br>(count) | Number of times when memory limit exceeded for query.|
| **clickhouse.query.memory.limit_exceeded.total** <br>(gauge) | Total number of times when memory limit exceeded for query.|
| **clickhouse.query.mutation** <br>(gauge) | The number of mutations (ALTER DELETE/UPDATE)<br>_Shown as query_ |
| **clickhouse.query.other.time** <br>(gauge) | Total time of queries that are not SELECT or INSERT.<br>_Shown as microsecond_ |
| **clickhouse.query.overflow.any.count** <br>(count) | Number of times approximate GROUP BY was in effect: when aggregation was performed only on top of first 'max_rows_to_group_by' unique keys and other keys were ignored due to 'group_by_overflow_mode' = 'any'.|
| **clickhouse.query.overflow.any.total** <br>(gauge) | Number of times approximate GROUP BY was in effect: when aggregation was performed only on top of first 'max_rows_to_group_by' unique keys and other keys were ignored due to 'group_by_overflow_mode' = 'any'.|
| **clickhouse.query.overflow.break.count** <br>(count) | Number of times, data processing was cancelled by query complexity limitation with setting '*\_overflow_mode' = 'break' and the result is incomplete.|
| **clickhouse.query.overflow.break.total** <br>(gauge) | Number of times, data processing was cancelled by query complexity limitation with setting '*\_overflow_mode' = 'break' and the result is incomplete.|
| **clickhouse.query.overflow.throw.count** <br>(count) | Number of times, data processing was cancelled by query complexity limitation with setting '*\_overflow_mode' = 'throw' and exception was thrown.|
| **clickhouse.query.overflow.throw.total** <br>(gauge) | Number of times, data processing was cancelled by query complexity limitation with setting '*\_overflow_mode' = 'throw' and exception was thrown.|
| **clickhouse.query.profiler.runs.count** <br>(count) | Number of times QueryProfiler had been run.|
| **clickhouse.query.profiler.runs.total** <br>(gauge) | Number of times QueryProfiler had been run.|
| **clickhouse.query.read.backoff.count** <br>(count) | The number of times the number of query processing threads was lowered due to slow reads during the last interval.<br>_Shown as occurrence_ |
| **clickhouse.query.read.backoff.total** <br>(gauge) | The total number of times the number of query processing threads was lowered due to slow reads.<br>_Shown as occurrence_ |
| **clickhouse.query.select.count** <br>(count) | The number of SELECT queries to be interpreted and potentially executed during the last interval. Does not include queries that failed to parse or were rejected due to AST size limits, quota limits or limits on the number of simultaneously running queries. May include internal queries initiated by ClickHouse itself. Does not count subqueries.<br>_Shown as query_ |
| **clickhouse.query.select.subqueries.count** <br>(count) | Count SELECT queries with all subqueries|
| **clickhouse.query.select.subqueries.total** <br>(gauge) | Count SELECT queries with all subqueries|
| **clickhouse.query.select.time** <br>(gauge) | Total time of SELECT queries.<br>_Shown as microsecond_ |
| **clickhouse.query.select.total** <br>(gauge) | The total number of SELECT queries to be interpreted and potentially executed. Does not include queries that failed to parse or were rejected due to AST size limits, quota limits or limits on the number of simultaneously running queries. May include internal queries initiated by ClickHouse itself. Does not count subqueries.<br>_Shown as query_ |
| **clickhouse.query.signal.dropped.count** <br>(count) | The number of times the processing of a signal was dropped due to overrun plus the number of signals that the OS has not delivered due to overrun during the last interval.<br>_Shown as occurrence_ |
| **clickhouse.query.signal.dropped.total** <br>(gauge) | The total number of times the processing of a signal was dropped due to overrun plus the number of signals that the OS has not delivered due to overrun.<br>_Shown as occurrence_ |
| **clickhouse.query.sleep.time** <br>(gauge) | The percentage of time a query was sleeping to conform to the `max_network_bandwidth` setting during the last interval.<br>_Shown as percent_ |
| **clickhouse.query.subqueries.count** <br>(count) | Count queries with all subqueries|
| **clickhouse.query.subqueries.total** <br>(gauge) | Count queries with all subqueries|
| **clickhouse.query.time** <br>(gauge) | Total time of all queries.<br>_Shown as microsecond_ |
| **clickhouse.query.timers.active** <br>(gauge) | Number of Active thread local timers in QueryProfiler|
| **clickhouse.query.total** <br>(gauge) | The total number of queries to be interpreted and potentially executed. Does not include queries that failed to parse or were rejected due to AST size limits, quota limits or limits on the number of simultaneously running queries. May include internal queries initiated by ClickHouse itself. Does not count subqueries.<br>_Shown as query_ |
| **clickhouse.query.waiting** <br>(gauge) | The number of queries that are stopped and waiting due to 'priority' setting.<br>_Shown as query_ |
| **clickhouse.read.buffer.mmap.created.count** <br>(count) | Number of times a read buffer using 'mmap' was created for reading data (while choosing among other read methods).|
| **clickhouse.read.buffer.mmap.created.total** <br>(gauge) | Number of times a read buffer using 'mmap' was created for reading data (while choosing among other read methods).|
| **clickhouse.read.buffer.mmap.failed.count** <br>(count) | Number of times a read buffer with 'mmap' was attempted to be created for reading data (while choosing among other read methods), but the OS did not allow it (due to lack of filesystem support or other reasons) and we fallen back to the ordinary reading method.|
| **clickhouse.read.buffer.mmap.failed.total** <br>(gauge) | Number of times a read buffer with 'mmap' was attempted to be created for reading data (while choosing among other read methods), but the OS did not allow it (due to lack of filesystem support or other reasons) and we fallen back to the ordinary reading method.|
| **clickhouse.read.buffer.o_direct.created.count** <br>(count) | Number of times a read buffer with O_DIRECT was created for reading data (while choosing among other read methods).|
| **clickhouse.read.buffer.o_direct.created.total** <br>(gauge) | Number of times a read buffer with O_DIRECT was created for reading data (while choosing among other read methods).|
| **clickhouse.read.buffer.o_direct.failed.count** <br>(count) | Number of times a read buffer with O_DIRECT was attempted to be created for reading data (while choosing among other read methods), but the OS did not allow it (due to lack of filesystem support or other reasons) and we fallen back to the ordinary reading method.|
| **clickhouse.read.buffer.o_direct.failed.total** <br>(gauge) | Number of times a read buffer with O_DIRECT was attempted to be created for reading data (while choosing among other read methods), but the OS did not allow it (due to lack of filesystem support or other reasons) and we fallen back to the ordinary reading method.|
| **clickhouse.read.buffer.ordinary.created.count** <br>(count) | Number of times ordinary read buffer was created for reading data (while choosing among other read methods).|
| **clickhouse.read.buffer.ordinary.created.total** <br>(gauge) | Number of times ordinary read buffer was created for reading data (while choosing among other read methods).|
| **clickhouse.read.compressed.block.count** <br>(count) | The number of compressed blocks (the blocks of data that are compressed independent of each other) read from compressed sources (files, network) during the last interval.<br>_Shown as block_ |
| **clickhouse.read.compressed.block.total** <br>(gauge) | The total number of compressed blocks (the blocks of data that are compressed independent of each other) read from compressed sources (files, network).<br>_Shown as block_ |
| **clickhouse.read.compressed.raw.size.count** <br>(count) | The number of uncompressed bytes (the number of bytes after decompression) read from compressed sources (files, network) during the last interval.<br>_Shown as byte_ |
| **clickhouse.read.compressed.raw.size.total** <br>(gauge) | The total number of uncompressed bytes (the number of bytes after decompression) read from compressed sources (files, network).<br>_Shown as byte_ |
| **clickhouse.read.compressed.size.count** <br>(count) | The number of bytes (the number of bytes before decompression) read from compressed sources (files, network) during the last interval.<br>_Shown as byte_ |
| **clickhouse.read.compressed.size.total** <br>(gauge) | The total number of bytes (the number of bytes before decompression) read from compressed sources (files, network).<br>_Shown as byte_ |
| **clickhouse.read.connections.new.count** <br>(count) | Number of seeks which lead to new connection (s3, http)|
| **clickhouse.read.connections.new.total** <br>(gauge) | Number of seeks which lead to new connection (s3, http)|
| **clickhouse.read.synchronous.wait.time** <br>(gauge) | Time spent in waiting for synchronous reads in asynchronous local read.<br>_Shown as microsecond_ |
| **clickhouse.remote.query.read_throttler.sleep.time** <br>(gauge) | Total time a query was sleeping to conform 'max_remote_read_network_bandwidth_for_server'/'max_remote_read_network_bandwidth' throttling.<br>_Shown as microsecond_ |
| **clickhouse.remote.query.write_throttler.sleep.time** <br>(gauge) | Total time a query was sleeping to conform 'max_remote_write_network_bandwidth_for_server'/'max_remote_write_network_bandwidth' throttling.<br>_Shown as microsecond_ |
| **clickhouse.remote.read.synchronous.wait.time** <br>(gauge) | Time spent in waiting for synchronous remote reads.<br>_Shown as microsecond_ |
| **clickhouse.remote.read_throttler.bytes.count** <br>(count) | Bytes passed through 'max_remote_read_network_bandwidth_for_server'/'max_remote_read_network_bandwidth' throttler.|
| **clickhouse.remote.read_throttler.bytes.total** <br>(gauge) | Bytes passed through 'max_remote_read_network_bandwidth_for_server'/'max_remote_read_network_bandwidth' throttler.|
| **clickhouse.remote.write_throttler.bytes.count** <br>(count) | Bytes passed through 'max_remote_write_network_bandwidth_for_server'/'max_remote_write_network_bandwidth' throttler.|
| **clickhouse.remote.write_throttler.bytes.total** <br>(gauge) | Bytes passed through 'max_remote_write_network_bandwidth_for_server'/'max_remote_write_network_bandwidth' throttler.|
| **clickhouse.remote_reader.total** <br>(gauge) | Number of read with remote reader in fly|
| **clickhouse.replica.delay.absolute** <br>(gauge) | The maximum replica queue delay relative to current time.<br>_Shown as millisecond_ |
| **clickhouse.replica.delay.relative** <br>(gauge) | The maximum difference of absolute delay from any other replica.<br>_Shown as millisecond_ |
| **clickhouse.replica.leader.election** <br>(gauge) | The number of Replicas participating in leader election. Equals to total number of replicas in usual cases.<br>_Shown as shard_ |
| **clickhouse.replica.queue.size** <br>(gauge) | The number of replication tasks in queue.<br>_Shown as task_ |
| **clickhouse.replicas.parralel.announcement.handle.time** <br>(gauge) | Time spent processing replicas announcements<br>_Shown as microsecond_ |
| **clickhouse.replicas.parralel.available.count** <br>(count) | Number of replicas available to execute a query with task-based parallel replicas|
| **clickhouse.replicas.parralel.available.total** <br>(gauge) | Number of replicas available to execute a query with task-based parallel replicas|
| **clickhouse.replicas.parralel.collect_segment.time** <br>(gauge) | Time spent collecting segments meant by hash<br>_Shown as microsecond_ |
| **clickhouse.replicas.parralel.hash.stealing.time** <br>(gauge) | Time spent collecting segments meant for stealing by hash<br>_Shown as microsecond_ |
| **clickhouse.replicas.parralel.leftover_segment.stealing.time** <br>(gauge) | Time spent collecting orphaned segments<br>_Shown as microsecond_ |
| **clickhouse.replicas.parralel.processing.time** <br>(gauge) | Time spent processing data parts<br>_Shown as microsecond_ |
| **clickhouse.replicas.parralel.request.handle.time** <br>(gauge) | Time spent processing requests for marks from replicas<br>_Shown as microsecond_ |
| **clickhouse.replicas.parralel.requests.count** <br>(count) | Number of requests to the initiator.|
| **clickhouse.replicas.parralel.requests.total** <br>(gauge) | Number of requests to the initiator.|
| **clickhouse.replicas.parralel.used.count** <br>(count) | Number of replicas used to execute a query with task-based parallel replicas|
| **clickhouse.replicas.parralel.used.total** <br>(gauge) | Number of replicas used to execute a query with task-based parallel replicas|
| **clickhouse.s3.abort_multipart_upload.count** <br>(count) | Number of S3 API AbortMultipartUpload calls.|
| **clickhouse.s3.abort_multipart_upload.total** <br>(gauge) | Number of S3 API AbortMultipartUpload calls.|
| **clickhouse.s3.client.copy.reuse.count** <br>(count) | Number of S3 clients copies which reuse an existing auth provider from another client.|
| **clickhouse.s3.client.copy.reuse.total** <br>(gauge) | Number of S3 clients copies which reuse an existing auth provider from another client.|
| **clickhouse.s3.clients.created.count** <br>(count) | Number of created S3 clients.|
| **clickhouse.s3.clients.created.total** <br>(gauge) | Number of created S3 clients.|
| **clickhouse.s3.complete_multipart_upload.count** <br>(count) | Number of S3 API CompleteMultipartUpload calls.|
| **clickhouse.s3.complete_multipart_upload.total** <br>(gauge) | Number of S3 API CompleteMultipartUpload calls.|
| **clickhouse.s3.connect.time** <br>(gauge) | Time spent initializing connection to S3.<br>_Shown as microsecond_ |
| **clickhouse.s3.copy_object.count** <br>(count) | Number of S3 API CopyObject calls.|
| **clickhouse.s3.copy_object.total** <br>(gauge) | Number of S3 API CopyObject calls.|
| **clickhouse.s3.create_multipart_upload.count** <br>(count) | Number of S3 API CreateMultipartUpload calls.|
| **clickhouse.s3.create_multipart_upload.total** <br>(gauge) | Number of S3 API CreateMultipartUpload calls.|
| **clickhouse.s3.delete_obkect.count** <br>(count) | Number of S3 API DeleteObject(s) calls.|
| **clickhouse.s3.delete_obkect.total** <br>(gauge) | Number of S3 API DeleteObject(s) calls.|
| **clickhouse.s3.get_object.count** <br>(count) | Number of S3 API GetObject calls.|
| **clickhouse.s3.get_object.total** <br>(gauge) | Number of S3 API GetObject calls.|
| **clickhouse.s3.get_object_attribute.count** <br>(count) | Number of S3 API GetObjectAttributes calls.|
| **clickhouse.s3.get_object_attribute.total** <br>(gauge) | Number of S3 API GetObjectAttributes calls.|
| **clickhouse.s3.get_request.throttled.count** <br>(count) | Number of S3 GET and SELECT requests passed through throttler.|
| **clickhouse.s3.get_request.throttled.time** <br>(gauge) | Total time a query was sleeping to conform S3 GET and SELECT request throttling.<br>_Shown as microsecond_ |
| **clickhouse.s3.get_request.throttled.total** <br>(gauge) | Number of S3 GET and SELECT requests passed through throttler.|
| **clickhouse.s3.head_object.count** <br>(count) | Number of S3 API HeadObject calls.|
| **clickhouse.s3.head_object.total** <br>(gauge) | Number of S3 API HeadObject calls.|
| **clickhouse.s3.list_object.count** <br>(count) | Number of S3 API ListObjects calls.|
| **clickhouse.s3.list_object.total** <br>(gauge) | Number of S3 API ListObjects calls.|
| **clickhouse.s3.lock_localfile_status.time** <br>(gauge) | Time spent to lock local file statuses<br>_Shown as microsecond_ |
| **clickhouse.s3.put_object.count** <br>(count) | Number of S3 API PutObject calls.|
| **clickhouse.s3.put_object.total** <br>(gauge) | Number of S3 API PutObject calls.|
| **clickhouse.s3.put_request.throttled.count** <br>(count) | Number of S3 PUT, COPY, POST and LIST requests passed through throttler.|
| **clickhouse.s3.put_request.throttled.time** <br>(gauge) | Total time a query was sleeping to conform S3 PUT, COPY, POST and LIST request throttling.<br>_Shown as microsecond_ |
| **clickhouse.s3.put_request.throttled.total** <br>(gauge) | Number of S3 PUT, COPY, POST and LIST requests passed through throttler.|
| **clickhouse.s3.read.bytes.count** <br>(count) | Read bytes (incoming) in GET and HEAD requests to S3 storage.<br>_Shown as byte_ |
| **clickhouse.s3.read.bytes.total** <br>(gauge) | Total read bytes (incoming) in GET and HEAD requests to S3 storage.<br>_Shown as byte_ |
| **clickhouse.s3.read.errors.count** <br>(count) | Number of exceptions while reading from S3.|
| **clickhouse.s3.read.errors.total** <br>(gauge) | Number of exceptions while reading from S3.|
| **clickhouse.s3.read.file.time** <br>(gauge) | Time spent to read file data<br>_Shown as microsecond_ |
| **clickhouse.s3.read.requests.count** <br>(count) | Number of GET and HEAD requests to S3 storage.<br>_Shown as request_ |
| **clickhouse.s3.read.requests.errors.count** <br>(count) | Number of non-throttling errors in GET and HEAD requests to S3 storage.<br>_Shown as error_ |
| **clickhouse.s3.read.requests.errors.total** <br>(gauge) | Total number of non-throttling errors in GET and HEAD requests to S3 storage.<br>_Shown as error_ |
| **clickhouse.s3.read.requests.redirects.count** <br>(count) | Number of redirects in GET and HEAD requests to S3 storage.<br>_Shown as unit_ |
| **clickhouse.s3.read.requests.redirects.total** <br>(gauge) | Total number of redirects in GET and HEAD requests to S3 storage.<br>_Shown as unit_ |
| **clickhouse.s3.read.requests.throttling.count** <br>(count) | Number of 429 and 503 errors in GET and HEAD requests to S3 storage.<br>_Shown as error_ |
| **clickhouse.s3.read.requests.throttling.total** <br>(gauge) | Total number of 429 and 503 errors in GET and HEAD requests to S3 storage.<br>_Shown as error_ |
| **clickhouse.s3.read.requests.total** <br>(gauge) | Total number of GET and HEAD requests to S3 storage.<br>_Shown as request_ |
| **clickhouse.s3.read.reset.count** <br>(count) | Number of HTTP sessions that were reset in ReadBufferFromS3.|
| **clickhouse.s3.read.reset.total** <br>(gauge) | Number of HTTP sessions that were reset in ReadBufferFromS3.|
| **clickhouse.s3.read.sessions.preserved..count** <br>(count) | Number of HTTP sessions that were preserved in ReadBufferFromS3.|
| **clickhouse.s3.read.sessions.preserved..total** <br>(gauge) | Number of HTTP sessions that were preserved in ReadBufferFromS3.|
| **clickhouse.s3.read.size.count** <br>(count) | Bytes read from S3.|
| **clickhouse.s3.read.size.total** <br>(gauge) | Bytes read from S3.|
| **clickhouse.s3.read.time** <br>(gauge) | Time spent on reading from S3.<br>_Shown as microsecond_ |
| **clickhouse.s3.requests.count** <br>(gauge) | S3 requests count<br>_Shown as request_ |
| **clickhouse.s3.set.file.failed.time** <br>(gauge) | Time spent to set file as failed<br>_Shown as microsecond_ |
| **clickhouse.s3.set.file.processed.time** <br>(gauge) | Time spent to set file as processed<br>_Shown as microsecond_ |
| **clickhouse.s3.set.file.processing.time** <br>(gauge) | Time spent to set file as processing<br>_Shown as microsecond_ |
| **clickhouse.s3.set_file.failed.time** <br>(gauge) | Time spent to set file as failed<br>_Shown as microsecond_ |
| **clickhouse.s3.upload_part.count** <br>(count) | Number of S3 API UploadPart calls.|
| **clickhouse.s3.upload_part.total** <br>(gauge) | Number of S3 API UploadPart calls.|
| **clickhouse.s3.upload_part_copy.count** <br>(count) | Number of S3 API UploadPartCopy calls.|
| **clickhouse.s3.upload_part_copy.total** <br>(gauge) | Number of S3 API UploadPartCopy calls.|
| **clickhouse.s3.write.bytes.count** <br>(count) | Write bytes (outgoing) in POST, DELETE, PUT and PATCH requests to S3 storage.<br>_Shown as byte_ |
| **clickhouse.s3.write.bytes.total** <br>(gauge) | Total write bytes (outgoing) in POST, DELETE, PUT and PATCH requests to S3 storage.<br>_Shown as byte_ |
| **clickhouse.s3.write.errors.count** <br>(count) | Number of exceptions while writing to S3.|
| **clickhouse.s3.write.errors.total** <br>(gauge) | Number of exceptions while writing to S3.|
| **clickhouse.s3.write.requests.count** <br>(count) | Number of POST, DELETE, PUT and PATCH requests to S3 storage.<br>_Shown as request_ |
| **clickhouse.s3.write.requests.errors.count** <br>(count) | Number of non-throttling errors in POST, DELETE, PUT and PATCH requests to S3 storage.<br>_Shown as request_ |
| **clickhouse.s3.write.requests.errors.total** <br>(gauge) | Total number of non-throttling errors in POST, DELETE, PUT and PATCH requests to S3 storage.<br>_Shown as request_ |
| **clickhouse.s3.write.requests.redirects.count** <br>(count) | Number of redirects in POST, DELETE, PUT and PATCH requests to S3 storage.<br>_Shown as request_ |
| **clickhouse.s3.write.requests.redirects.total** <br>(gauge) | Total number of redirects in POST, DELETE, PUT and PATCH requests to S3 storage.<br>_Shown as request_ |
| **clickhouse.s3.write.requests.throttling.count** <br>(count) | Number of 429 and 503 errors in POST, DELETE, PUT and PATCH requests to S3 storage.<br>_Shown as request_ |
| **clickhouse.s3.write.requests.throttling.total** <br>(gauge) | Total number of 429 and 503 errors in POST, DELETE, PUT and PATCH requests to S3 storage.<br>_Shown as request_ |
| **clickhouse.s3.write.requests.total** <br>(gauge) | Total number of POST, DELETE, PUT and PATCH requests to S3 storage.<br>_Shown as request_ |
| **clickhouse.s3.write.size.count** <br>(count) | Bytes written to S3.|
| **clickhouse.s3.write.size.total** <br>(gauge) | Bytes written to S3.|
| **clickhouse.s3.write.time** <br>(gauge) | Time spent on writing to S3.<br>_Shown as microsecond_ |
| **clickhouse.s3.write.wait.time** <br>(gauge) | Time spent on waiting while some of the current requests are done when its number reached the limit defined by s3_max_inflight_parts_for_one_file.<br>_Shown as microsecond_ |
| **clickhouse.select.query.select.failed.count** <br>(count) | Same as FailedQuery, but only for SELECT queries.<br>_Shown as query_ |
| **clickhouse.select.query.select.failed.total** <br>(gauge) | Same as FailedQuery, but only for SELECT queries.<br>_Shown as query_ |
| **clickhouse.selected.bytes.count** <br>(count) | Number of bytes (uncompressed; for columns as they stored in memory) SELECTed from all tables.<br>_Shown as byte_ |
| **clickhouse.selected.bytes.total** <br>(gauge) | Total number of bytes (uncompressed; for columns as they stored in memory) SELECTed from all tables.<br>_Shown as byte_ |
| **clickhouse.selected.rows.count** <br>(count) | Total number of rows SELECTed from all tables.<br>_Shown as row_ |
| **clickhouse.selected.rows.total** <br>(gauge) | Number of rows SELECTed from all tables.<br>_Shown as row_ |
| **clickhouse.server.startup.time** <br>(gauge) | Time elapsed from starting server to listening to sockets in milliseconds<br>_Shown as microsecond_ |
| **clickhouse.sessions_pool.storage.active** <br>(gauge) | Total count of all sessions: stored in the pool and actively used right now for storages|
| **clickhouse.sessions_pool.storage.total** <br>(gauge) | Total count of sessions stored in the session pool for storages|
| **clickhouse.shard.send_query.suspend.count** <br>(count) | Total count when sending query to shard was suspended when async_query_sending_for_remote is enabled.|
| **clickhouse.shard.send_query.suspend.total** <br>(gauge) | Total count when sending query to shard was suspended when async_query_sending_for_remote is enabled.|
| **clickhouse.shared_merge_tree.fetches.total** <br>(gauge) | Number of fetches in progress|
| **clickhouse.shell_command.executions.count** <br>(count) | Number of shell command executions.|
| **clickhouse.shell_command.executions.total** <br>(gauge) | Number of shell command executions.|
| **clickhouse.sleep_function.sleep.time** <br>(gauge) | Time spent sleeping in a sleep function (sleep, sleepEachRow).<br>_Shown as microsecond_ |
| **clickhouse.sqe.io_uring.inflight** <br>(gauge) | Number of io_uring SQEs in flight|
| **clickhouse.sqe.io_uring.waiting** <br>(gauge) | Number of io_uring SQEs waiting to be submitted|
| **clickhouse.sql.ordinary.function.calls.count** <br>(count) | Number of SQL ordinary function calls (SQL functions are called on per-block basis, so this number represents the number of blocks).<br>_Shown as block_ |
| **clickhouse.sql.ordinary.function.calls.total** <br>(gauge) | Number of SQL ordinary function calls (SQL functions are called on per-block basis, so this number represents the number of blocks).<br>_Shown as block_ |
| **clickhouse.storage.buffer.flush.count** <br>(count) | Number of times a buffer in a 'Buffer' table was flushed.|
| **clickhouse.storage.buffer.flush.total** <br>(gauge) | Number of times a buffer in a 'Buffer' table was flushed.|
| **clickhouse.storage.buffer.flush_error.count** <br>(count) | Number of times a buffer in the 'Buffer' table has not been able to flush due to error writing in the destination table.|
| **clickhouse.storage.buffer.flush_error.total** <br>(gauge) | Number of times a buffer in the 'Buffer' table has not been able to flush due to error writing in the destination table.|
| **clickhouse.storage.connection.create.error.count** <br>(count) | Number of cases when creation of a connection for storage is failed|
| **clickhouse.storage.connection.create.error.total** <br>(gauge) | Number of cases when creation of a connection for storage is failed|
| **clickhouse.storage.connection.create.expired.count** <br>(count) | Number of expired connections for storages|
| **clickhouse.storage.connection.create.expired.total** <br>(gauge) | Number of expired connections for storages|
| **clickhouse.storage.connection.created.count** <br>(count) | Number of created connections for storages|
| **clickhouse.storage.connection.created.time** <br>(gauge) | Total time spend on creating connections for storages<br>_Shown as microsecond_ |
| **clickhouse.storage.connection.created.total** <br>(gauge) | Number of created connections for storages|
| **clickhouse.storage.connection.preserved.count** <br>(count) | Number of preserved connections for storages|
| **clickhouse.storage.connection.preserved.total** <br>(gauge) | Number of preserved connections for storages|
| **clickhouse.storage.connection.reused.count** <br>(count) | Number of reused connections for storages|
| **clickhouse.storage.connection.reused.total** <br>(gauge) | Number of reused connections for storages|
| **clickhouse.storeage.connection.reset.count** <br>(count) | Number of reset connections for storages|
| **clickhouse.storeage.connection.reset.total** <br>(gauge) | Number of reset connections for storages|
| **clickhouse.subquery.scalar.read.cache.miss.count** <br>(count) | Number of times a read from a scalar subquery was not cached and had to be calculated completely|
| **clickhouse.subquery.scalar.read.cache.miss.total** <br>(gauge) | Number of times a read from a scalar subquery was not cached and had to be calculated completely|
| **clickhouse.syscall.directory.sync.count** <br>(count) | Number of times the F_FULLFSYNC/fsync/fdatasync function was called for directories.|
| **clickhouse.syscall.directory.sync.time** <br>(gauge) | Total time spent waiting for F_FULLFSYNC/fsync/fdatasync syscall for directories.<br>_Shown as microsecond_ |
| **clickhouse.syscall.directory.sync.total** <br>(gauge) | Number of times the F_FULLFSYNC/fsync/fdatasync function was called for directories.|
| **clickhouse.syscall.read** <br>(gauge) | The number of read (read, pread, io_getevents, etc.) syscalls in fly.<br>_Shown as read_ |
| **clickhouse.syscall.read.wait** <br>(gauge) | The percentage of time spent waiting for read syscall during the last interval. This includes reads from page cache.<br>_Shown as percent_ |
| **clickhouse.syscall.write** <br>(gauge) | The number of write (write, pwrite, io_getevents, etc.) syscalls in fly.<br>_Shown as write_ |
| **clickhouse.syscall.write.wait** <br>(gauge) | The percentage of time spent waiting for write syscall during the last interval. This include writes to page cache.<br>_Shown as percent_ |
| **clickhouse.table.buffer.row** <br>(gauge) | The number of rows in buffers of Buffer tables.<br>_Shown as row_ |
| **clickhouse.table.buffer.size** <br>(gauge) | Size of buffers of Buffer tables.<br>_Shown as byte_ |
| **clickhouse.table.distributed.bytes.insert.broken** <br>(gauge) | Number of bytes for asynchronous insertion into Distributed tables that has been marked as broken. Number of bytes for every shard is summed.|
| **clickhouse.table.distributed.bytes.insert.pending** <br>(gauge) | Number of pending bytes to process for asynchronous insertion into Distributed tables. Number of bytes for every shard is summed.|
| **clickhouse.table.distributed.connection.inserted** <br>(gauge) | The number of connections to remote servers sending data that was INSERTed into Distributed tables. Both synchronous and asynchronous mode.<br>_Shown as connection_ |
| **clickhouse.table.distributed.file.insert.broken** <br>(gauge) | Number of files for asynchronous insertion into Distributed tables that has been marked as broken. This metric will starts from 0 on start. Number of files for every shard is summed.<br>_Shown as file_ |
| **clickhouse.table.distributed.file.insert.pending** <br>(gauge) | The number of pending files to process for asynchronous insertion into Distributed tables. Number of files for every shard is summed.<br>_Shown as file_ |
| **clickhouse.table.function.count** <br>(count) | Number of table function calls.|
| **clickhouse.table.function.total** <br>(gauge) | Number of table function calls.|
| **clickhouse.table.insert.row.count** <br>(count) | The number of rows INSERTed to all tables during the last interval.<br>_Shown as row_ |
| **clickhouse.table.insert.row.total** <br>(gauge) | The total number of rows INSERTed to all tables.<br>_Shown as row_ |
| **clickhouse.table.insert.size.count** <br>(count) | The number of bytes (uncompressed; for columns as they stored in memory) INSERTed to all tables during the last interval.<br>_Shown as byte_ |
| **clickhouse.table.insert.size.total** <br>(gauge) | The total number of bytes (uncompressed; for columns as they stored in memory) INSERTed to all tables.<br>_Shown as byte_ |
| **clickhouse.table.mergetree.announcements.sent.time** <br>(gauge) | Time spent in sending the announcement from the remote server to the initiator server about the set of data parts (for MergeTree tables). Measured on the remote server side.<br>_Shown as microsecond_ |
| **clickhouse.table.mergetree.calculating.projections.time** <br>(gauge) | Time spent calculating projections<br>_Shown as microsecond_ |
| **clickhouse.table.mergetree.calculating.skip_indices.time** <br>(gauge) | Time spent calculating skip indices<br>_Shown as microsecond_ |
| **clickhouse.table.mergetree.calculating.sorting.time** <br>(gauge) | Time spent sorting blocks<br>_Shown as microsecond_ |
| **clickhouse.table.mergetree.calculating.statistics.time** <br>(gauge) | Time spent calculating statistics<br>_Shown as microsecond_ |
| **clickhouse.table.mergetree.insert.block.already_sorted.count** <br>(count) | The number of blocks INSERTed to MergeTree tables that appeared to be already sorted during the last interval.<br>_Shown as block_ |
| **clickhouse.table.mergetree.insert.block.already_sorted.projection.total** <br>(gauge) | Total number of blocks INSERTed to MergeTree tables projection that appeared to be already sorted.<br>_Shown as block_ |
| **clickhouse.table.mergetree.insert.block.already_sorted.total** <br>(gauge) | The total number of blocks INSERTed to MergeTree tables that appeared to be already sorted.<br>_Shown as block_ |
| **clickhouse.table.mergetree.insert.block.count** <br>(count) | The number of blocks INSERTed to MergeTree tables during the last interval. Each block forms a data part of level zero.<br>_Shown as block_ |
| **clickhouse.table.mergetree.insert.block.projection.count** <br>(count) | Number of blocks INSERTed to MergeTree tables projection. Each block forms a data part of level zero.<br>_Shown as block_ |
| **clickhouse.table.mergetree.insert.block.projection.total** <br>(gauge) | Total number of blocks INSERTed to MergeTree tables projection. Each block forms a data part of level zero.<br>_Shown as block_ |
| **clickhouse.table.mergetree.insert.block.rejected.count** <br>(count) | The number of times the INSERT of a block to a MergeTree table was rejected with `Too many parts` exception due to high number of active data parts for partition during the last interval.<br>_Shown as block_ |
| **clickhouse.table.mergetree.insert.block.rejected.total** <br>(gauge) | The total number of times the INSERT of a block to a MergeTree table was rejected with `Too many parts` exception due to high number of active data parts for partition.<br>_Shown as block_ |
| **clickhouse.table.mergetree.insert.block.size.compressed.projection.count** <br>(count) | Number of blocks INSERTed to MergeTree tables projection that appeared to be already sorted.<br>_Shown as block_ |
| **clickhouse.table.mergetree.insert.block.total** <br>(gauge) | The total number of blocks INSERTed to MergeTree tables. Each block forms a data part of level zero.<br>_Shown as block_ |
| **clickhouse.table.mergetree.insert.delayed.count** <br>(count) | The number of times the INSERT of a block to a MergeTree table was throttled due to high number of active data parts for partition during the last interval.<br>_Shown as throttle_ |
| **clickhouse.table.mergetree.insert.delayed.time** <br>(gauge) | The percentage of time spent while the INSERT of a block to a MergeTree table was throttled due to high number of active data parts for partition during the last interval.<br>_Shown as percent_ |
| **clickhouse.table.mergetree.insert.delayed.total** <br>(gauge) | The total number of times the INSERT of a block to a MergeTree table was throttled due to high number of active data parts for partition.<br>_Shown as throttle_ |
| **clickhouse.table.mergetree.insert.row.count** <br>(count) | The number of rows INSERTed to MergeTree tables during the last interval.<br>_Shown as row_ |
| **clickhouse.table.mergetree.insert.row.total** <br>(gauge) | The total number of rows INSERTed to MergeTree tables.<br>_Shown as row_ |
| **clickhouse.table.mergetree.insert.write.row.projection.count** <br>(count) | Number of rows INSERTed to MergeTree tables projection.<br>_Shown as row_ |
| **clickhouse.table.mergetree.insert.write.row.projection.total** <br>(gauge) | Total number of rows INSERTed to MergeTree tables projection.<br>_Shown as row_ |
| **clickhouse.table.mergetree.insert.write.size.compressed.count** <br>(count) | The number of bytes written to filesystem for data INSERTed to MergeTree tables during the last interval.<br>_Shown as byte_ |
| **clickhouse.table.mergetree.insert.write.size.compressed.total** <br>(gauge) | The total number of bytes written to filesystem for data INSERTed to MergeTree tables.<br>_Shown as byte_ |
| **clickhouse.table.mergetree.insert.write.size.uncompressed.count** <br>(count) | The number of uncompressed bytes (for columns as they are stored in memory) INSERTed to MergeTree tables during the last interval.<br>_Shown as byte_ |
| **clickhouse.table.mergetree.insert.write.size.uncompressed.projection.count** <br>(count) | Uncompressed bytes (for columns as they stored in memory) INSERTed to MergeTree tables projection.<br>_Shown as byte_ |
| **clickhouse.table.mergetree.insert.write.size.uncompressed.projection.total** <br>(gauge) | Total uncompressed bytes (for columns as they stored in memory) INSERTed to MergeTree tables projection.<br>_Shown as byte_ |
| **clickhouse.table.mergetree.insert.write.size.uncompressed.total** <br>(gauge) | The total number of uncompressed bytes (for columns as they are stored in memory) INSERTed to MergeTree tables.<br>_Shown as byte_ |
| **clickhouse.table.mergetree.mark.selected.count** <br>(count) | The number of marks (index granules) selected to read from a MergeTree table during the last interval.<br>_Shown as index_ |
| **clickhouse.table.mergetree.mark.selected.total** <br>(gauge) | The total number of marks (index granules) selected to read from a MergeTree table.<br>_Shown as index_ |
| **clickhouse.table.mergetree.merging.blocks.time** <br>(gauge) | Time spent merging input blocks (for special MergeTree engines)<br>_Shown as microsecond_ |
| **clickhouse.table.mergetree.merging.projection.time** <br>(gauge) | Time spent merging blocks<br>_Shown as microsecond_ |
| **clickhouse.table.mergetree.mutation.delayed.count** <br>(count) | Number of times the mutation of a MergeTree table was throttled due to high number of unfinished mutations for table.|
| **clickhouse.table.mergetree.mutation.delayed.total** <br>(gauge) | Number of times the mutation of a MergeTree table was throttled due to high number of unfinished mutations for table.|
| **clickhouse.table.mergetree.mutation.rejected.count** <br>(count) | Number of times the mutation of a MergeTree table was rejected with 'Too many mutations' exception due to high number of unfinished mutations for table.|
| **clickhouse.table.mergetree.mutation.rejected.total** <br>(gauge) | Number of times the mutation of a MergeTree table was rejected with 'Too many mutations' exception due to high number of unfinished mutations for table.|
| **clickhouse.table.mergetree.part.current** <br>(gauge) | The total number of data parts of a MergeTree table.<br>_Shown as object_ |
| **clickhouse.table.mergetree.part.selected.count** <br>(count) | The number of data parts selected to read from a MergeTree table during the last interval.<br>_Shown as item_ |
| **clickhouse.table.mergetree.part.selected.total** <br>(gauge) | The total number of data parts selected to read from a MergeTree table.<br>_Shown as item_ |
| **clickhouse.table.mergetree.partslock.hold.time** <br>(gauge) | Total time spent holding data parts lock in MergeTree tables<br>_Shown as microsecond_ |
| **clickhouse.table.mergetree.partslock.wait.time** <br>(gauge) | Total time spent waiting for data parts lock in MergeTree tables<br>_Shown as microsecond_ |
| **clickhouse.table.mergetree.prefetched_read_pool.tasks.time** <br>(gauge) | Time spent preparing tasks in MergeTreePrefetchedReadPool<br>_Shown as microsecond_ |
| **clickhouse.table.mergetree.range.selected.count** <br>(count) | The number of non-adjacent ranges in all data parts selected to read from a MergeTree table during the last interval.<br>_Shown as item_ |
| **clickhouse.table.mergetree.range.selected.total** <br>(gauge) | The total number of non-adjacent ranges in all data parts selected to read from a MergeTree table.<br>_Shown as item_ |
| **clickhouse.table.mergetree.read_task_requests.sent.time** <br>(gauge) | Time spent in callbacks requested from the remote server back to the initiator server to choose the read task (for MergeTree tables). Measured on the remote server side.<br>_Shown as microsecond_ |
| **clickhouse.table.mergetree.replicated.fetch.merged.count** <br>(count) | The number of times ClickHouse prefers to download already merged part from replica of ReplicatedMergeTree table instead of performing a merge itself (usually it prefers doing a merge itself to save network traffic) during the last interval. This happens when ClickHouse does not have all source parts to perform a merge or when the data part is old enough.<br>_Shown as fetch_ |
| **clickhouse.table.mergetree.replicated.fetch.merged.total** <br>(gauge) | The total number of times ClickHouse prefers to download already merged part from replica of ReplicatedMergeTree table instead of performing a merge itself (usually it prefers doing a merge itself to save network traffic). This happens when ClickHouse does not have all source parts to perform a merge or when the data part is old enough.<br>_Shown as fetch_ |
| **clickhouse.table.mergetree.replicated.fetch.replica.count** <br>(count) | The number of times a data part was downloaded from replica of a ReplicatedMergeTree table during the last interval.<br>_Shown as fetch_ |
| **clickhouse.table.mergetree.replicated.fetch.replica.fail.count** <br>(count) | The number of times a data part was failed to download from replica of a ReplicatedMergeTree table during the last interval.<br>_Shown as byte_ |
| **clickhouse.table.mergetree.replicated.fetch.replica.fail.total** <br>(gauge) | The total number of times a data part was failed to download from replica of a ReplicatedMergeTree table.<br>_Shown as byte_ |
| **clickhouse.table.mergetree.replicated.fetch.replica.total** <br>(gauge) | The total number of times a data part was downloaded from replica of a ReplicatedMergeTree table.<br>_Shown as fetch_ |
| **clickhouse.table.mergetree.replicated.insert.deduplicate.count** <br>(count) | The number of times the INSERTed block to a ReplicatedMergeTree table was deduplicated during the last interval.<br>_Shown as operation_ |
| **clickhouse.table.mergetree.replicated.insert.deduplicate.total** <br>(gauge) | The total number of times the INSERTed block to a ReplicatedMergeTree table was deduplicated.<br>_Shown as operation_ |
| **clickhouse.table.mergetree.replicated.leader.elected.count** <br>(count) | The number of times a ReplicatedMergeTree table became a leader during the last interval. Leader replica is responsible for assigning merges, cleaning old blocks for deduplications and a few more bookkeeping tasks.<br>_Shown as event_ |
| **clickhouse.table.mergetree.replicated.leader.elected.total** <br>(gauge) | The total number of times a ReplicatedMergeTree table became a leader. Leader replica is responsible for assigning merges, cleaning old blocks for deduplications and a few more bookkeeping tasks.<br>_Shown as event_ |
| **clickhouse.table.mergetree.replicated.merge.count** <br>(count) | The number of times data parts of ReplicatedMergeTree tables were successfully merged during the last interval.<br>_Shown as byte_ |
| **clickhouse.table.mergetree.replicated.merge.total** <br>(gauge) | The total number of times data parts of ReplicatedMergeTree tables were successfully merged.<br>_Shown as byte_ |
| **clickhouse.table.mergetree.replicated.mutated.count** <br>(count) | Number of times data parts of ReplicatedMergeTree tables were successfully mutated.|
| **clickhouse.table.mergetree.replicated.mutated.total** <br>(gauge) | Number of times data parts of ReplicatedMergeTree tables were successfully mutated.|
| **clickhouse.table.mergetree.row.current** <br>(gauge) | The total number of rows in a MergeTree table.<br>_Shown as row_ |
| **clickhouse.table.mergetree.size** <br>(gauge) | The total size of all data part files of a MergeTree table.<br>_Shown as byte_ |
| **clickhouse.table.mergetree.sorting.projection.time** <br>(gauge) | Time spent sorting blocks (for projection it might be a key different from table's sorting key)<br>_Shown as microsecond_ |
| **clickhouse.table.mergetree.storage.mark.cache** <br>(gauge) | The size of the cache of `marks` for StorageMergeTree.<br>_Shown as byte_ |
| **clickhouse.table.replica.change.hedged_requests.count** <br>(gauge) | Count when timeout for changing replica expired in hedged requests.<br>_Shown as timeout_ |
| **clickhouse.table.replica.change.hedged_requests.total** <br>(gauge) | Total count when timeout for changing replica expired in hedged requests.<br>_Shown as timeout_ |
| **clickhouse.table.replica.partial.shutdown.count** <br>(count) | How many times Replicated table has to deinitialize its state due to session expiration in ZooKeeper. The state is reinitialized every time when ZooKeeper is available again.|
| **clickhouse.table.replica.partial.shutdown.total** <br>(gauge) | Total times Replicated table has to deinitialize its state due to session expiration in ZooKeeper. The state is reinitialized every time when ZooKeeper is available again.|
| **clickhouse.table.replicated.active** <br>(gauge) | The number of replicas of this table that have a session in ZooKeeper (i.e., the number of functioning replicas).<br>_Shown as table_ |
| **clickhouse.table.replicated.leader** <br>(gauge) | The number of Replicated tables that are leaders. Leader replica is responsible for assigning merges, cleaning old blocks for deduplications and a few more bookkeeping tasks. There may be no more than one leader across all replicas at one moment of time. If there is no leader it will be elected soon or it indicate an issue.<br>_Shown as table_ |
| **clickhouse.table.replicated.leader.yield.count** <br>(count) | The number of times Replicated table yielded its leadership due to large replication lag relative to other replicas during the last interval.<br>_Shown as event_ |
| **clickhouse.table.replicated.leader.yield.total** <br>(gauge) | The total number of times Replicated table yielded its leadership due to large replication lag relative to other replicas.<br>_Shown as event_ |
| **clickhouse.table.replicated.log.max** <br>(gauge) | Maximum entry number in the log of general activity.<br>_Shown as item_ |
| **clickhouse.table.replicated.log.pointer** <br>(gauge) | Maximum entry number in the log of general activity that the replica copied to its execution queue, plus one. If this is much smaller than `clickhouse.table.replicated.log.max`, something is wrong.<br>_Shown as item_ |
| **clickhouse.table.replicated.part.check** <br>(gauge) | The number of data parts checking for consistency<br>_Shown as item_ |
| **clickhouse.table.replicated.part.check.count** <br>(count) | The number of data parts checking for consistency<br>_Shown as item_ |
| **clickhouse.table.replicated.part.check.failed.count** <br>(count) | Number of times the advanced search for a data part on replicas did not give result or when unexpected part has been found and moved away.|
| **clickhouse.table.replicated.part.check.failed.total** <br>(gauge) | Number of times the advanced search for a data part on replicas did not give result or when unexpected part has been found and moved away.|
| **clickhouse.table.replicated.part.check.total** <br>(gauge) | The number of data parts checking for consistency<br>_Shown as item_ |
| **clickhouse.table.replicated.part.fetch** <br>(gauge) | The number of data parts being fetched from replica<br>_Shown as item_ |
| **clickhouse.table.replicated.part.future** <br>(gauge) | The number of data parts that will appear as the result of INSERTs or merges that haven't been done yet.<br>_Shown as item_ |
| **clickhouse.table.replicated.part.loss.count** <br>(count) | The number of times a data part we wanted doesn't exist on any replica (even on replicas that are offline right now) during the last interval. Those data parts are definitely lost. This is normal due to asynchronous replication (if quorum inserts were not enabled), when the replica on which the data part was written failed and when it became online after fail it doesn't contain that data part.<br>_Shown as item_ |
| **clickhouse.table.replicated.part.loss.total** <br>(gauge) | The total number of times a data part that we wanted doesn't exist on any replica (even on replicas that are offline right now). That data parts are definitely lost. This is normal due to asynchronous replication (if quorum inserts were not enabled), when the replica on which the data part was written failed and when it became online after fail it doesn't contain that data part.<br>_Shown as item_ |
| **clickhouse.table.replicated.part.send** <br>(gauge) | The number of data parts being sent to replicas<br>_Shown as item_ |
| **clickhouse.table.replicated.part.suspect** <br>(gauge) | The number of data parts in the queue for verification. A part is put in the verification queue if there is suspicion that it might be damaged.<br>_Shown as item_ |
| **clickhouse.table.replicated.queue.insert** <br>(gauge) | The number of inserts of blocks of data that need to be made. Insertions are usually replicated fairly quickly. If this number is large, it means something is wrong.<br>_Shown as operation_ |
| **clickhouse.table.replicated.queue.merge** <br>(gauge) | The number of merges waiting to be made. Sometimes merges are lengthy, so this value may be greater than zero for a long time.<br>_Shown as merge_ |
| **clickhouse.table.replicated.queue.size** <br>(gauge) | Size of the queue for operations waiting to be performed. Operations include inserting blocks of data, merges, and certain other actions. It usually coincides with `clickhouse.table.replicated.part.future`.<br>_Shown as operation_ |
| **clickhouse.table.replicated.readonly** <br>(gauge) | The number of Replicated tables that are currently in readonly state due to re-initialization after ZooKeeper session loss or due to startup without ZooKeeper configured.<br>_Shown as table_ |
| **clickhouse.table.replicated.total** <br>(gauge) | The total number of known replicas of this table.<br>_Shown as table_ |
| **clickhouse.table.replicated.version** <br>(gauge) | Version number of the table structure indicating how many times ALTER was performed. If replicas have different versions, it means some replicas haven't made all of the ALTERs yet.<br>_Shown as operation_ |
| **clickhouse.table.total** <br>(gauge) | The current number of tables.<br>_Shown as table_ |
| **clickhouse.table_engines.files.read.count** <br>(count) | Number of files read in table engines working with files (like File/S3/URL/HDFS).|
| **clickhouse.table_engines.files.read.total** <br>(gauge) | Number of files read in table engines working with files (like File/S3/URL/HDFS).|
| **clickhouse.tables_to_drop.queue.total** <br>(gauge) | Number of dropped tables, that are waiting for background data removal.<br>_Shown as table_ |
| **clickhouse.task.mutate.calculate.projections.time** <br>(gauge) | Time spent calculating projections<br>_Shown as microsecond_ |
| **clickhouse.task.prefetch.reader.wait.time** <br>(gauge) | Time spend waiting for prefetched reader<br>_Shown as microsecond_ |
| **clickhouse.task.read.requests.received.count** <br>(count) | The number of callbacks requested from the remote server back to the initiator server to choose the read task (for s3Cluster table function and similar). Measured on the initiator server side.|
| **clickhouse.task.read.requests.received.total** <br>(gauge) | The number of callbacks requested from the remote server back to the initiator server to choose the read task (for s3Cluster table function and similar). Measured on the initiator server side.|
| **clickhouse.task.read.requests.sent.count** <br>(count) | The number of callbacks requested from the remote server back to the initiator server to choose the read task (for s3Cluster table function and similar). Measured on the remote server side.|
| **clickhouse.task.read.requests.sent.time** <br>(gauge) | Time spent in callbacks requested from the remote server back to the initiator server to choose the read task (for s3Cluster table function and similar). Measured on the remote server side.<br>_Shown as microsecond_ |
| **clickhouse.task.read.requests.sent.total** <br>(gauge) | The number of callbacks requested from the remote server back to the initiator server to choose the read task (for s3Cluster table function and similar). Measured on the remote server side.|
| **clickhouse.task.requests.callback** <br>(gauge) | The number of callbacks requested from the remote server back to the initiator server to choose the read task (for s3Cluster table function and similar). Measured on the remote server side.|
| **clickhouse.task.thread_pool_reader.cache.time** <br>(gauge) | How much time we spent checking if content is cached<br>_Shown as microsecond_ |
| **clickhouse.task.thread_pool_reader.read.count** <br>(count) | Bytes read from a threadpool task in asynchronous reading|
| **clickhouse.task.thread_pool_reader.read.size.count** <br>(count) | Bytes read from a threadpool task in asynchronous reading|
| **clickhouse.task.thread_pool_reader.read.size.total** <br>(gauge) | Bytes read from a threadpool task in asynchronous reading|
| **clickhouse.task.thread_pool_reader.read.sync.time** <br>(gauge) | How much time we spent reading synchronously<br>_Shown as microsecond_ |
| **clickhouse.task.thread_pool_reader.read.time** <br>(gauge) | Time spent getting the data in asynchronous reading<br>_Shown as microsecond_ |
| **clickhouse.task.thread_pool_reader.read.total** <br>(gauge) | Bytes read from a threadpool task in asynchronous reading|
| **clickhouse.tasks.background.loading_marks.count** <br>(count) | Number of background tasks for loading marks|
| **clickhouse.tasks.background.loading_marks.total** <br>(gauge) | Number of background tasks for loading marks|
| **clickhouse.temporary_files.aggregation.total** <br>(gauge) | Number of temporary files created for external aggregation|
| **clickhouse.temporary_files.join.total** <br>(gauge) | Number of temporary files created for JOIN|
| **clickhouse.temporary_files.sort.total** <br>(gauge) | Number of temporary files created for external sorting|
| **clickhouse.temporary_files.total** <br>(gauge) | Number of temporary files created|
| **clickhouse.temporary_files.unknown.total** <br>(gauge) | Number of temporary files created without known purpose|
| **clickhouse.thread.cpu.wait** <br>(gauge) | The percentage of time a thread was ready for execution but waiting to be scheduled by OS (from the OS point of view) during the last interval.<br>_Shown as percent_ |
| **clickhouse.thread.global.active** <br>(gauge) | The number of threads in global thread pool running a task.<br>_Shown as thread_ |
| **clickhouse.thread.global.scheduled** <br>(gauge) | Number of queued or active jobs in global thread pool.|
| **clickhouse.thread.global.total** <br>(gauge) | The number of threads in global thread pool.<br>_Shown as thread_ |
| **clickhouse.thread.io.wait** <br>(gauge) | The percentage of time a thread spent waiting for a result of IO operation (from the OS point of view) during the last interval. This is real IO that doesn't include page cache.<br>_Shown as percent_ |
| **clickhouse.thread.local.active** <br>(gauge) | The number of threads in local thread pools running a task.<br>_Shown as thread_ |
| **clickhouse.thread.local.scheduled** <br>(gauge) | Number of queued or active jobs in local thread pools.|
| **clickhouse.thread.local.total** <br>(gauge) | The number of threads in local thread pools. Should be similar to GlobalThreadActive.<br>_Shown as thread_ |
| **clickhouse.thread.lock.context.waiting** <br>(gauge) | The number of threads waiting for lock in Context. This is global lock.<br>_Shown as thread_ |
| **clickhouse.thread.lock.rw.active.read** <br>(gauge) | The number of threads holding read lock in a table RWLock.<br>_Shown as thread_ |
| **clickhouse.thread.lock.rw.active.write** <br>(gauge) | The number of threads holding write lock in a table RWLock.<br>_Shown as thread_ |
| **clickhouse.thread.lock.rw.waiting.read** <br>(gauge) | The number of threads waiting for read on a table RWLock.<br>_Shown as thread_ |
| **clickhouse.thread.lock.rw.waiting.write** <br>(gauge) | The number of threads waiting for write on a table RWLock.<br>_Shown as thread_ |
| **clickhouse.thread.process_time** <br>(gauge) | The percentage of time spent processing (queries and other tasks) threads during the last interval.<br>_Shown as percent_ |
| **clickhouse.thread.query** <br>(gauge) | The number of query processing threads<br>_Shown as thread_ |
| **clickhouse.thread.system.process_time** <br>(gauge) | The percentage of time spent processing (queries and other tasks) threads executing CPU instructions in OS kernel space during the last interval. This includes time CPU pipeline was stalled due to cache misses, branch mispredictions, hyper-threading, etc.<br>_Shown as percent_ |
| **clickhouse.thread.user.process_time** <br>(gauge) | The percentage of time spent processing (queries and other tasks) threads executing CPU instructions in user space during the last interval. This includes time CPU pipeline was stalled due to cache misses, branch mispredictions, hyper-threading, etc.<br>_Shown as percent_ |
| **clickhouse.threads.async.disk_object_storage.active** <br>(gauge) | Obsolete metric, shows nothing.|
| **clickhouse.threads.async.disk_object_storage.total** <br>(gauge) | Obsolete metric, shows nothing.|
| **clickhouse.threads.async.read** <br>(gauge) | Number of threads waiting for asynchronous read.<br>_Shown as thread_ |
| **clickhouse.threads.azure_object_storage.active** <br>(gauge) | Number of threads in the AzureObjectStorage thread pool running a task.|
| **clickhouse.threads.azure_object_storage.scheduled** <br>(gauge) | Number of queued or active jobs in the AzureObjectStorage thread pool.|
| **clickhouse.threads.azure_object_storage.total** <br>(gauge) | Number of threads in the AzureObjectStorage thread pool.|
| **clickhouse.threads.database_catalog.active** <br>(gauge) | Number of threads in the DatabaseCatalog thread pool running a task.|
| **clickhouse.threads.database_catalog.scheduled** <br>(gauge) | Number of queued or active jobs in the DatabaseCatalog thread pool.|
| **clickhouse.threads.database_catalog.total** <br>(gauge) | Number of threads in the DatabaseCatalog thread pool.|
| **clickhouse.threads.database_ondisk.active** <br>(gauge) | Number of threads in the DatabaseOnDisk thread pool running a task.|
| **clickhouse.threads.database_ondisk.scheduled** <br>(gauge) | Number of queued or active jobs in the DatabaseOnDisk thread pool.|
| **clickhouse.threads.database_ondisk.total** <br>(gauge) | Number of threads in the DatabaseOnDisk thread pool.|
| **clickhouse.threads.database_replicated.active** <br>(gauge) | Number of active threads in the threadpool for table creation in DatabaseReplicated.|
| **clickhouse.threads.database_replicated.scheduled** <br>(gauge) | Number of queued or active jobs in the threadpool for table creation in DatabaseReplicated.|
| **clickhouse.threads.database_replicated.total** <br>(gauge) | Number of threads in the threadpool for table creation in DatabaseReplicated.|
| **clickhouse.threads.ddl_worker.active** <br>(gauge) | Number of threads in the DDLWORKER thread pool for ON CLUSTER queries running a task.|
| **clickhouse.threads.ddl_worker.scheduled** <br>(gauge) | Number of queued or active jobs in the DDLWORKER thread pool for ON CLUSTER queries.|
| **clickhouse.threads.ddl_worker.total** <br>(gauge) | Number of threads in the DDLWorker thread pool for ON CLUSTER queries.|
| **clickhouse.threads.destroy_aggregates.active** <br>(gauge) | Number of threads in the thread pool for destroy aggregate states running a task.|
| **clickhouse.threads.destroy_aggregates.scheduled** <br>(gauge) | Number of queued or active jobs in the thread pool for destroy aggregate states.|
| **clickhouse.threads.destroy_aggregates.total** <br>(gauge) | Number of threads in the thread pool for destroy aggregate states.|
| **clickhouse.threads.distribured.insert.active** <br>(gauge) | Number of threads used for INSERT into Distributed running a task.|
| **clickhouse.threads.distribured.insert.scheduled** <br>(gauge) | Number of queued or active jobs used for INSERT into Distributed.|
| **clickhouse.threads.distribured.insert.total** <br>(gauge) | Number of threads used for INSERT into Distributed.|
| **clickhouse.threads.dwarf.active** <br>(gauge) | Number of threads in the DWARFBlockInputFormat thread pool running a task.|
| **clickhouse.threads.dwarf.scheduled** <br>(gauge) | Number of queued or active jobs in the DWARFBlockInputFormat thread pool.|
| **clickhouse.threads.dwarf.total** <br>(gauge) | Number of threads in the DWARFBlockInputFormat thread pool.|
| **clickhouse.threads.hashed_dictionary.active** <br>(gauge) | Number of threads in the HashedDictionary thread pool running a task.|
| **clickhouse.threads.hashed_dictionary.scheduled** <br>(gauge) | Number of queued or active jobs in the HashedDictionary thread pool.|
| **clickhouse.threads.hashed_dictionary.total** <br>(gauge) | Number of threads in the HashedDictionary thread pool.|
| **clickhouse.threads.idisk.copier.active** <br>(gauge) | Number of threads for copying data between disks of different types running a task.|
| **clickhouse.threads.idisk.copier.scheduled** <br>(gauge) | Number of queued or active jobs for copying data between disks of different types.|
| **clickhouse.threads.idisk.copier.total** <br>(gauge) | Number of threads for copying data between disks of different types.|
| **clickhouse.threads.in_overcommit_tracker.total** <br>(gauge) | Number of waiting threads inside of OvercommitTracker|
| **clickhouse.threads.io.active** <br>(gauge) | Number of threads in the IO thread pool running a task.|
| **clickhouse.threads.io.scheduled** <br>(gauge) | Number of queued or active jobs in the IO thread pool.|
| **clickhouse.threads.io.total** <br>(gauge) | Number of threads in the IO thread pool.|
| **clickhouse.threads.io_prefetch.active** <br>(gauge) | Number of threads in the IO prefetch thread pool running a task.|
| **clickhouse.threads.io_prefetch.scheduled** <br>(gauge) | Number of queued or active jobs in the IO prefetch thread pool.|
| **clickhouse.threads.io_prefetch.total** <br>(gauge) | Number of threads in the IO prefetch thread pool.|
| **clickhouse.threads.io_writer.active** <br>(gauge) | Number of threads in the IO writer thread pool running a task.|
| **clickhouse.threads.io_writer.scheduled** <br>(gauge) | Number of queued or active jobs in the IO writer thread pool.|
| **clickhouse.threads.io_writer.total** <br>(gauge) | Number of threads in the IO writer thread pool.|
| **clickhouse.threads.librdkafka.active** <br>(gauge) | Number of active librdkafka threads<br>_Shown as thread_ |
| **clickhouse.threads.marks_loader.active** <br>(gauge) | Number of threads in the thread pool for loading marks running a task.|
| **clickhouse.threads.marks_loader.scheduled** <br>(gauge) | Number of queued or active jobs in the thread pool for loading marks.|
| **clickhouse.threads.marks_loader.total** <br>(gauge) | Number of threads in thread pool for loading marks.|
| **clickhouse.threads.merge_tree_background_executor.active** <br>(gauge) | Number of threads in the MergeTreeBackgroundExecutor thread pool running a task.|
| **clickhouse.threads.merge_tree_background_executor.scheduled** <br>(gauge) | Number of queued or active jobs in the MergeTreeBackgroundExecutor thread pool.|
| **clickhouse.threads.merge_tree_background_executor.total** <br>(gauge) | Number of threads in the MergeTreeBackgroundExecutor thread pool.|
| **clickhouse.threads.merge_tree_data_selector_executor.active** <br>(gauge) | Number of threads in the MergeTreeDataSelectExecutor thread pool running a task.|
| **clickhouse.threads.merge_tree_data_selector_executor.scheduled** <br>(gauge) | Number of queued or active jobs in the MergeTreeDataSelectExecutor thread pool.|
| **clickhouse.threads.merge_tree_data_selector_executor.total** <br>(gauge) | Number of threads in the MergeTreeDataSelectExecutor thread pool.|
| **clickhouse.threads.merge_tree_outdated_parts_loader.active** <br>(gauge) | Number of active threads in the threadpool for loading Outdated data parts.|
| **clickhouse.threads.merge_tree_outdated_parts_loader.scheduled** <br>(gauge) | Number of queued or active jobs in the threadpool for loading Outdated data parts.|
| **clickhouse.threads.merge_tree_outdated_parts_loader.total** <br>(gauge) | Number of threads in the threadpool for loading Outdated data parts.|
| **clickhouse.threads.merge_tree_parts_cleaner.active** <br>(gauge) | Number of threads in the MergeTree parts cleaner thread pool running a task.|
| **clickhouse.threads.merge_tree_parts_cleaner.scheduled** <br>(gauge) | Number of queued or active jobs in the MergeTree parts cleaner thread pool.|
| **clickhouse.threads.merge_tree_parts_cleaner.total** <br>(gauge) | Number of threads in the MergeTree parts cleaner thread pool.|
| **clickhouse.threads.merge_tree_parts_loader.active** <br>(gauge) | Number of threads in the MergeTree parts loader thread pool running a task.|
| **clickhouse.threads.merge_tree_parts_loader.scheduled** <br>(gauge) | Number of queued or active jobs in the MergeTree parts loader thread pool.|
| **clickhouse.threads.merge_tree_parts_loader.total** <br>(gauge) | Number of threads in the MergeTree parts loader thread pool.|
| **clickhouse.threads.outdated_parts_loading.active** <br>(gauge) | Number of active threads in the threadpool for loading Outdated data parts.|
| **clickhouse.threads.outdated_parts_loading.scheduled** <br>(gauge) | Number of queued or active jobs in the threadpool for loading Outdated data parts.|
| **clickhouse.threads.outdated_parts_loading.total** <br>(gauge) | Number of threads in the threadpool for loading Outdated data parts.|
| **clickhouse.threads.parallel_formatting_output.active** <br>(gauge) | Number of threads in the ParallelFormattingOutputFormatThreads thread pool running a task.|
| **clickhouse.threads.parallel_formatting_output.scheduled** <br>(gauge) | Number of queued or active jobs in the ParallelFormattingOutputFormatThreads thread pool.|
| **clickhouse.threads.parallel_formatting_output.total** <br>(gauge) | Number of threads in the ParallelFormattingOutputFormatThreads thread pool.|
| **clickhouse.threads.parallel_parsing_input.active** <br>(gauge) | Number of threads in the ParallelParsingInputFormat thread pool running a task.|
| **clickhouse.threads.parallel_parsing_input.scheduled** <br>(gauge) | Number of queued or active jobs in the ParallelParsingInputFormat thread pool.|
| **clickhouse.threads.parallel_parsing_input.total** <br>(gauge) | Number of threads in the ParallelParsingInputFormat thread pool.|
| **clickhouse.threads.parquet_decoder.active** <br>(gauge) | Number of threads in the ParquetBlockInputFormat thread pool running a task.|
| **clickhouse.threads.parquet_decoder.scheduled** <br>(gauge) | Number of queued or active jobs in the ParquetBlockInputFormat thread pool.|
| **clickhouse.threads.parquet_decoder.total** <br>(gauge) | Number of threads in the ParquetBlockInputFormat thread pool.|
| **clickhouse.threads.parquet_encoder.active** <br>(gauge) | Number of threads in ParquetBlockOutputFormat thread pool running a task.|
| **clickhouse.threads.parquet_encoder.scheduled** <br>(gauge) | Number of queued or active jobs in ParquetBlockOutputFormat thread pool.|
| **clickhouse.threads.parquet_encoder.total** <br>(gauge) | Number of threads in ParquetBlockOutputFormat thread pool.|
| **clickhouse.threads.pool.fs_reader.active** <br>(gauge) | Number of threads in the thread pool for local_filesystem_read_method=threadpool running a task.|
| **clickhouse.threads.pool.fs_reader.scheduled** <br>(gauge) | Number of queued or active jobs in the thread pool for local_filesystem_read_method=threadpool.|
| **clickhouse.threads.pool.fs_reader.total** <br>(gauge) | Number of threads in the thread pool for local_filesystem_read_method=threadpool.|
| **clickhouse.threads.pool.remote_fs_reader.active** <br>(gauge) | Number of threads in the thread pool for remote_filesystem_read_method=threadpool running a task.|
| **clickhouse.threads.pool.remote_fs_reader.scheduled** <br>(gauge) | Number of queued or active jobs in the thread pool for remote_filesystem_read_method=threadpool.|
| **clickhouse.threads.pool.remote_fs_reader.total** <br>(gauge) | Number of threads in the thread pool for remote_filesystem_read_method=threadpool.|
| **clickhouse.threads.query.execution.hard_page_faults.count** <br>(count) | The number of hard page faults in query execution threads. High values indicate either that you forgot to turn off swap on your server, or eviction of memory pages of the ClickHouse binary during very high memory pressure, or successful usage of the 'mmap' read method for the tables data.<br>_Shown as thread_ |
| **clickhouse.threads.query.execution.hard_page_faults.total** <br>(gauge) | The number of hard page faults in query execution threads. High values indicate either that you forgot to turn off swap on your server, or eviction of memory pages of the ClickHouse binary during very high memory pressure, or successful usage of the 'mmap' read method for the tables data.<br>_Shown as thread_ |
| **clickhouse.threads.query.soft_page_faults.count** <br>(count) | The number of soft page faults in query execution threads. Soft page fault usually means a miss in the memory allocator cache, which requires a new memory mapping from the OS and subsequent allocation of a page of physical memory.|
| **clickhouse.threads.query.soft_page_faults.total** <br>(gauge) | The number of soft page faults in query execution threads. Soft page fault usually means a miss in the memory allocator cache, which requires a new memory mapping from the OS and subsequent allocation of a page of physical memory.|
| **clickhouse.threads.query_pipeline_executor.active** <br>(gauge) | Number of threads in the PipelineExecutor thread pool running a task.|
| **clickhouse.threads.query_pipeline_executor.scheduled** <br>(gauge) | Number of queued or active jobs in the PipelineExecutor thread pool.|
| **clickhouse.threads.query_pipeline_executor.total** <br>(gauge) | Number of threads in the PipelineExecutor thread pool.|
| **clickhouse.threads.restart_replica.active** <br>(gauge) | Number of threads in the RESTART REPLICA thread pool running a task.|
| **clickhouse.threads.restart_replica.scheduled** <br>(gauge) | Number of queued or active jobs in the RESTART REPLICA thread pool.|
| **clickhouse.threads.restore.active** <br>(gauge) | Number of threads in the thread pool for RESTORE running a task.|
| **clickhouse.threads.restore.scheduled** <br>(gauge) | Number of queued or active jobs for RESTORE.|
| **clickhouse.threads.restore.total** <br>(gauge) | Number of threads in the thread pool for RESTORE.|
| **clickhouse.threads.s3_object_storage.active** <br>(gauge) | Number of threads in the S3ObjectStorage thread pool running a task.|
| **clickhouse.threads.s3_object_storage.scheduled** <br>(gauge) | Number of queued or active jobs in the S3ObjectStorage thread pool.|
| **clickhouse.threads.s3_object_storage.total** <br>(gauge) | Number of threads in the S3ObjectStorage thread pool.|
| **clickhouse.threads.shared_merge_tree.active** <br>(gauge) | Number of threads in the thread pools in internals of SharedMergeTree running a task|
| **clickhouse.threads.shared_merge_tree.scheduled** <br>(gauge) | Number of queued or active threads in the thread pools in internals of SharedMergeTree|
| **clickhouse.threads.shared_merge_tree.total** <br>(gauge) | Number of threads in the thread pools in internals of SharedMergeTree|
| **clickhouse.threads.startup_system_tables.active** <br>(gauge) | Number of threads in the StartupSystemTables thread pool running a task.|
| **clickhouse.threads.startup_system_tables.scheduled** <br>(gauge) | Number of queued or active jobs in the StartupSystemTables thread pool.|
| **clickhouse.threads.startup_system_tables.total** <br>(gauge) | Number of threads in the StartupSystemTables thread pool.|
| **clickhouse.threads.storage_buffer_flush.active** <br>(gauge) | Number of threads for background flushes in StorageBuffer running a task|
| **clickhouse.threads.storage_buffer_flush.scheduled** <br>(gauge) | Number of queued or active threads for background flushes in StorageBuffer|
| **clickhouse.threads.storage_buffer_flush.total** <br>(gauge) | Number of threads for background flushes in StorageBuffer|
| **clickhouse.threads.storage_distributed.active** <br>(gauge) | Number of threads in the StorageDistributed thread pool running a task.|
| **clickhouse.threads.storage_distributed.scheduled** <br>(gauge) | Number of queued or active jobs in the StorageDistributed thread pool.|
| **clickhouse.threads.storage_distributed.total** <br>(gauge) | Number of threads in the StorageDistributed thread pool.|
| **clickhouse.threads.storage_hive.active** <br>(gauge) | Number of threads in the StorageHive thread pool running a task.|
| **clickhouse.threads.storage_hive.scheduled** <br>(gauge) | Number of queued or active jobs in the StorageHive thread pool.|
| **clickhouse.threads.storage_hive.total** <br>(gauge) | Number of threads in the StorageHive thread pool.|
| **clickhouse.threads.storage_s3.active** <br>(gauge) | Number of threads in the StorageS3 thread pool running a task.|
| **clickhouse.threads.storage_s3.scheduled** <br>(gauge) | Number of queued or active jobs in the StorageS3 thread pool.|
| **clickhouse.threads.storage_s3.total** <br>(gauge) | Number of threads in the StorageS3 thread pool.|
| **clickhouse.threads.system_replicas.active** <br>(gauge) | Number of threads in the system.replicas thread pool running a task.|
| **clickhouse.threads.system_replicas.scheduled** <br>(gauge) | Number of queued or active jobs in the system.replicas thread pool.|
| **clickhouse.threads.system_replicas.total** <br>(gauge) | Number of threads in the system.replicas thread pool.|
| **clickhouse.threads.tables_loader_background.active** <br>(gauge) | Number of threads in the tables loader background thread pool running a task.|
| **clickhouse.threads.tables_loader_background.scheduled** <br>(gauge) | Number of queued or active jobs in the tables loader background thread pool.|
| **clickhouse.threads.tables_loader_background.total** <br>(gauge) | Number of threads in the tables loader background thread pool.|
| **clickhouse.threads.tables_loader_foreground.active** <br>(gauge) | Number of threads in the tables loader foreground thread pool running a task.|
| **clickhouse.threads.tables_loader_foreground.scheduled** <br>(gauge) | Number of queued or active jobs in the tables loader foreground thread pool.|
| **clickhouse.threads.tables_loader_foreground.total** <br>(gauge) | Number of threads in the tables loader foreground thread pool.|
| **clickhouse.throttler.local_read.bytes.count** <br>(count) | Bytes passed through 'max_local_read_bandwidth_for_server'/'max_local_read_bandwidth' throttler.|
| **clickhouse.throttler.local_read.bytes.total** <br>(gauge) | Bytes passed through 'max_local_read_bandwidth_for_server'/'max_local_read_bandwidth' throttler.|
| **clickhouse.throttler.local_read.sleep.time** <br>(gauge) | Total time a query was sleeping to conform 'max_local_read_bandwidth_for_server'/'max_local_read_bandwidth' throttling.<br>_Shown as microsecond_ |
| **clickhouse.throttler.local_write.bytes.count** <br>(count) | Bytes passed through 'max_local_write_bandwidth_for_server'/'max_local_write_bandwidth' throttler.|
| **clickhouse.throttler.local_write.bytes.total** <br>(gauge) | Bytes passed through 'max_local_write_bandwidth_for_server'/'max_local_write_bandwidth' throttler.|
| **clickhouse.throttler.local_write.sleep.time** <br>(gauge) | Total time a query was sleeping to conform 'max_local_write_bandwidth_for_server'/'max_local_write_bandwidth' throttling.<br>_Shown as microsecond_ |
| **clickhouse.uptime** <br>(gauge) | The amount of time ClickHouse has been active.<br>_Shown as second_ |
| **clickhouse.views.refreshing.current** <br>(gauge) | Number of materialized views currently executing a refresh|
| **clickhouse.views.refreshing.total** <br>(gauge) | Number materialized views with periodic refreshing (REFRESH)|
| **clickhouse.zk.check.count** <br>(count) | Number of 'check' requests to ZooKeeper. Usually they don't make sense in isolation, only as part of a complex transaction.|
| **clickhouse.zk.check.total** <br>(gauge) | Number of 'check' requests to ZooKeeper. Usually they don't make sense in isolation, only as part of a complex transaction.|
| **clickhouse.zk.close.count** <br>(count) | Number of times connection with ZooKeeper has been closed voluntary.|
| **clickhouse.zk.close.total** <br>(gauge) | Number of times connection with ZooKeeper has been closed voluntary.|
| **clickhouse.zk.connection** <br>(gauge) | The number of sessions (connections) to ZooKeeper. Should be no more than one, because using more than one connection to ZooKeeper may lead to bugs due to lack of linearizability (stale reads) that ZooKeeper consistency model allows.<br>_Shown as connection_ |
| **clickhouse.zk.connection.established.count** <br>(count) | Number of times connection with ZooKeeper has been established.|
| **clickhouse.zk.connection.established.total** <br>(gauge) | Number of times connection with ZooKeeper has been established.|
| **clickhouse.zk.create.count** <br>(count) | Number of 'create' requests to ZooKeeper.<br>_Shown as request_ |
| **clickhouse.zk.create.total** <br>(gauge) | Number of 'create' requests to ZooKeeper.<br>_Shown as request_ |
| **clickhouse.zk.data.exception.count** <br>(count) | Number of exceptions while working with ZooKeeper related to the data (no node, bad version or similar).|
| **clickhouse.zk.data.exception.total** <br>(gauge) | Number of exceptions while working with ZooKeeper related to the data (no node, bad version or similar).|
| **clickhouse.zk.ddl_entry.max** <br>(gauge) | Max DDL entry of DDLWorker that pushed to zookeeper.|
| **clickhouse.zk.exist.count** <br>(count) | Number of 'exists' requests to ZooKeeper.<br>_Shown as request_ |
| **clickhouse.zk.exist.total** <br>(gauge) | Number of 'exists' requests to ZooKeeper.<br>_Shown as request_ |
| **clickhouse.zk.get.count** <br>(count) | Number of 'get' requests to ZooKeeper.<br>_Shown as request_ |
| **clickhouse.zk.get.total** <br>(gauge) | Number of 'get' requests to ZooKeeper.<br>_Shown as request_ |
| **clickhouse.zk.list.count** <br>(count) | Number of 'list' (getChildren) requests to ZooKeeper.<br>_Shown as request_ |
| **clickhouse.zk.list.total** <br>(gauge) | Number of 'list' (getChildren) requests to ZooKeeper.<br>_Shown as request_ |
| **clickhouse.zk.multi.count** <br>(count) | Number of 'multi' requests to ZooKeeper (compound transactions).<br>_Shown as request_ |
| **clickhouse.zk.multi.total** <br>(gauge) | Number of 'multi' requests to ZooKeeper (compound transactions).<br>_Shown as request_ |
| **clickhouse.zk.network.exception.count** <br>(count) | Number of exceptions while working with ZooKeeper related to network (connection loss or similar).|
| **clickhouse.zk.network.exception.total** <br>(gauge) | Number of exceptions while working with ZooKeeper related to network (connection loss or similar).|
| **clickhouse.zk.node.ephemeral** <br>(gauge) | The number of ephemeral nodes hold in ZooKeeper.<br>_Shown as node_ |
| **clickhouse.zk.operation.count** <br>(count) | Number of ZooKeeper operations, which include both read and write operations as well as multi-transactions.<br>_Shown as operation_ |
| **clickhouse.zk.operation.total** <br>(gauge) | Number of ZooKeeper operations, which include both read and write operations as well as multi-transactions.<br>_Shown as operation_ |
| **clickhouse.zk.other.exception.count** <br>(count) | Number of exceptions while working with ZooKeeper other than ZooKeeperUserExceptions and ZooKeeperHardwareExceptions.|
| **clickhouse.zk.other.exception.total** <br>(gauge) | Number of exceptions while working with ZooKeeper other than ZooKeeperUserExceptions and ZooKeeperHardwareExceptions.|
| **clickhouse.zk.parts.covered.count** <br>(count) | For debugging purposes. Number of parts in ZooKeeper that have a covering part, but doesn't exist on disk. Checked on server start.|
| **clickhouse.zk.parts.covered.total** <br>(gauge) | For debugging purposes. Number of parts in ZooKeeper that have a covering part, but doesn't exist on disk. Checked on server start.|
| **clickhouse.zk.received.size.count** <br>(count) | Number of bytes received over network while communicating with ZooKeeper.<br>_Shown as byte_ |
| **clickhouse.zk.received.size.total** <br>(gauge) | Number of bytes received over network while communicating with ZooKeeper.<br>_Shown as byte_ |
| **clickhouse.zk.reconfig.count** <br>(count) | Number of 'reconfig' requests to ZooKeeper.|
| **clickhouse.zk.reconfig.total** <br>(gauge) | Number of 'reconfig' requests to ZooKeeper.|
| **clickhouse.zk.remove.count** <br>(count) | Number of 'remove' requests to ZooKeeper.<br>_Shown as request_ |
| **clickhouse.zk.remove.total** <br>(gauge) | Number of 'remove' requests to ZooKeeper.<br>_Shown as request_ |
| **clickhouse.zk.request** <br>(gauge) | The number of requests to ZooKeeper in fly.<br>_Shown as request_ |
| **clickhouse.zk.sent.size.count** <br>(count) | Number of bytes send over network while communicating with ZooKeeper.<br>_Shown as byte_ |
| **clickhouse.zk.sent.size.total** <br>(gauge) | Number of bytes send over network while communicating with ZooKeeper.<br>_Shown as byte_ |
| **clickhouse.zk.set.count** <br>(count) | Number of 'set' requests to ZooKeeper.<br>_Shown as request_ |
| **clickhouse.zk.set.total** <br>(gauge) | Number of 'set' requests to ZooKeeper.<br>_Shown as request_ |
| **clickhouse.zk.sync.count** <br>(count) | Number of 'sync' requests to ZooKeeper. These requests are rarely needed or usable.|
| **clickhouse.zk.sync.total** <br>(gauge) | Number of 'sync' requests to ZooKeeper. These requests are rarely needed or usable.|
| **clickhouse.zk.wait.time** <br>(gauge) | Number of microseconds spent waiting for responses from ZooKeeper after creating a request, summed across all the requesting threads.<br>_Shown as microsecond_ |
| **clickhouse.zk.watch** <br>(gauge) | The number of watches (event subscriptions) in ZooKeeper.<br>_Shown as event_ |
| **clickhouse.zk.watch.count** <br>(count) | The number of watches (event subscriptions) in ZooKeeper.<br>_Shown as event_ |
| **clickhouse.zk.watch.total** <br>(gauge) | The number of watches (event subscriptions) in ZooKeeper.<br>_Shown as event_ |

### 이벤트

ClickHouse 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**clickhouse.can_connect**

Returns `CRITICAL` if the Agent is unable to connect to the monitored ClickHouse database, otherwise returns `OK`.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.