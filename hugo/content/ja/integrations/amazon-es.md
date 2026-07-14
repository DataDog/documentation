---
aliases:
- /ja/integrations/amazon_es
app_id: amazon-es
categories:
- aws
- metrics
custom_kind: integration
description: Amazon OpenSearch Service を使うと、OpenSearch を簡単にデプロイして運用できます。
media: []
title: Amazon OpenSearch Service
---
## 概要

Amazon OpenSearch Service は、AWS Cloud 上で OpenSearch クラスターを簡単にデプロイ、運用、スケールできるマネージド サービスです。OpenSearch は、ログ分析、リアル タイムのアプリケーション監視、クリック ストリーム分析などの用途に適した、完全なオープン ソースの検索および分析エンジンです。

このインテグレーションを有効にすると、OpenSearch Service のカスタム タグをすべて Datadog で確認できます。なお、このインテグレーションは AWS 上の Amazon OpenSearch Service 向けであり、AWS 外でホストされているスタンドアロンの Elasticsearch インスタンス向けではありません。(そのようなインスタンスでは、代わりに [Elasticsearch インテグレーション](https://docs.datadoghq.com/integrations/elastic) を使用してください。)

注: このインテグレーションを完全に有効にするには、'es:ListTags'、'es:ListDomainNames'、'es:DescribeElasticsearchDomains' の権限が必要です。

## セットアップ

### インストール

まだ設定していない場合は、先に [Amazon Web Services インテグレーション](https://docs.datadoghq.com/integrations/amazon_web_services/) を設定してください。

### メトリクス収集

1. [AWS integration ページ](https://app.datadoghq.com/integrations/amazon-web-services) の `Metric Collection` タブで、`ES` が有効になっていることを確認します。
1. [Datadog - Amazon OpenSearch Service インテグレーション](https://app.datadoghq.com/integrations/amazon-es) をインストールします。

### ログ収集

#### ログを有効にする

Amazon OpenSearch Service がログを S3 バケットまたは CloudWatch に送信するよう設定します。

**注**: S3 バケットにログを出力する場合は、_Target prefix_ に `amazon_elasticsearch` が設定されていることを確認してください。

#### ログを Datadog に送信する

1. まだ設定していない場合は、[Datadog Forwarder Lambda 関数](https://docs.datadoghq.com/logs/guide/forwarder/) を設定してください。

1. Lambda 関数をインストールしたら、AWS コンソールで Amazon Elasticsearch ログが保存されている S3 バケットまたは CloudWatch Log Group に、手動でトリガーを追加します:

   - [S3 バケットに手動でトリガーを追加する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [CloudWatch Log Group に手動でトリガーを追加する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#manually-set-up-triggers)

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.es.2xx** <br>(count) | HTTP 応答コード 2xx を返したドメインへのリクエスト数<br>_単位は request_ |
| **aws.es.2xx.average** <br>(gauge) | HTTP 応答コード 2xx を返したドメインへの平均リクエスト数<br>_単位は request_ |
| **aws.es.3xx** <br>(count) | HTTP 応答コード 3xx を返したドメインへのリクエスト数<br>_単位は request_ |
| **aws.es.3xx.average** <br>(gauge) | HTTP 応答コード 3xx を返したドメインへの平均リクエスト数<br>_単位は request_ |
| **aws.es.4xx** <br>(count) | HTTP 応答コード 4xx を返したドメインへのリクエスト数<br>_単位は request_ |
| **aws.es.4xx.average** <br>(gauge) | HTTP 応答コード 4xx を返したドメインへの平均リクエスト数<br>_単位は request_ |
| **aws.es.5xx** <br>(count) | HTTP 応答コード 5xx を返したドメインへのリクエスト数<br>_単位は request_ |
| **aws.es.5xx.average** <br>(gauge) | HTTP 応答コード 5xx を返したドメインへの平均リクエスト数<br>_単位は request_ |
| **aws.es.alerting_degraded** <br>(gauge) | ES アラート サービスが劣化状態にあるかどうかを示します。値が 0 の場合は 'No'、1 の場合は 'Yes' です。|
| **aws.es.alerting_index_exists** <br>(gauge) | 値が 1 の場合、.opendistro-alerting-config インデックスが存在します。初めてアラート機能を使用するまでは 0 のままです。|
| **aws.es.alerting_index_statusgreen** <br>(gauge) | インデックスの状態を示します。値が 1 の場合は green、0 の場合はインデックスが存在しないか、green ではありません。|
| **aws.es.alerting_index_statusred** <br>(gauge) | インデックスの状態を示します。値が 1 の場合は red、0 の場合はインデックスが存在しないか、red ではありません。|
| **aws.es.alerting_index_statusyellow** <br>(gauge) | インデックスの状態を示します。値が 1 の場合は yellow、0 の場合はインデックスが存在しないか、yellow ではありません。|
| **aws.es.alerting_nodes_on_schedule** <br>(gauge) | 値が 1 の場合、すべてのアラート ジョブがスケジュールどおりに実行されています (またはアラート ジョブが存在しません)。|
| **aws.es.alerting_nodes_not_on_schedule** <br>(gauge) | 値が 1 の場合、一部のジョブがスケジュールどおりに実行されていません。|
| **aws.es.alerting_scheduled_job_enabled** <br>(gauge) | 値が 1 の場合、opendistro.scheduled_jobs.enabled クラスター設定が true であることを示します。値が 0 の場合は false で、スケジュール ジョブは無効です。|
| **aws.es.anomaly_detection_failure_count** <br>(count) | 異常検知に失敗したリクエスト数<br>_単位は error_ |
| **aws.es.anomaly_detection_plugin_unhealthy** <br>(gauge) | 値が 1 の場合、異常検知プラグインが正常に機能していません。|
| **aws.es.anomaly_detection_request_count** <br>(count) | 異常検知リクエスト数<br>_単位は request_ |
| **aws.es.anomaly_detectors_index_status_index_exists** <br>(gauge) | 値が 1 の場合、.opendistro-anomaly-detectors インデックスが存在します。初めて異常検知機能を使用するまでは、この値は 0 のままです。|
| **aws.es.anomaly_detectors_index_statusred** <br>(gauge) | 値が 1 の場合、.opendistro-anomaly-detectors インデックスは red です。初めて異常検知機能を使用するまでは、この値は 0 のままです。|
| **aws.es.anomaly_results_index_status_index_exists** <br>(gauge) | 値が 1 の場合、.opendistro-anomaly-results エイリアスが指すインデックスが存在します。初めて異常検知機能を使用するまでは、この値は 0 のままです。|
| **aws.es.automated_snapshot_failure** <br>(gauge) | クラスターで失敗した自動スナップショット数<br>_単位は error_ |
| **aws.es.automated_snapshot_failure.minimum** <br>(gauge) | クラスターで失敗した自動スナップショット数の最小値<br>_単位は error_ |
| **aws.es.cluster_index_writes_blocked** <br>(gauge) | クラスターが受信した書き込みリクエストを受け付けているか、ブロックしているかを示します。値が 0 の場合は受け付けており、1 の場合はブロックしています。|
| **aws.es.cluster_statusgreen** <br>(gauge) | すべてのインデックス シャードがクラスター内のノードに割り当てられているかどうかを示します。|
| **aws.es.cluster_statusgreen.maximum** <br>(gauge) | すべてのインデックス シャードがクラスター内のノードに割り当てられている状態の最大値を示します。|
| **aws.es.cluster_statusgreen.minimum** <br>(gauge) | すべてのインデックス シャードがクラスター内のノードに割り当てられている状態の最小値を示します。|
| **aws.es.cluster_statusred** <br>(gauge) | 少なくとも 1 つのインデックスで、プライマリ シャードとレプリカ シャードの両方がクラスター内のノードに割り当てられていないかどうかを示します。|
| **aws.es.cluster_statusred.maximum** <br>(gauge) | 少なくとも 1 つのインデックスで、プライマリ シャードとレプリカ シャードの両方がクラスター内のノードに割り当てられていない状態の最大値を示します。|
| **aws.es.cluster_statusred.minimum** <br>(gauge) | 少なくとも 1 つのインデックスで、プライマリ シャードとレプリカ シャードの両方がクラスター内のノードに割り当てられていない状態の最小値を示します。|
| **aws.es.cluster_statusyellow** <br>(gauge) | レプリカ シャードがクラスター内のノードに割り当てられていないかどうかを示します。|
| **aws.es.cluster_statusyellow.maximum** <br>(gauge) | レプリカ シャードがクラスター内のノードに割り当てられていない状態の最大値を示します。|
| **aws.es.cluster_statusyellow.minimum** <br>(gauge) | レプリカ シャードがクラスター内のノードに割り当てられていない状態の最小値を示します。|
| **aws.es.cluster_used_space** <br>(gauge) | クラスターの使用済み総容量 (MiB)<br>_単位は mebibyte_ |
| **aws.es.cluster_used_space.average** <br>(gauge) | クラスターの平均使用容量 (MiB)<br>_単位は mebibyte_ |
| **aws.es.cluster_used_space.minimum** <br>(gauge) | クラスターの最小使用容量 (MiB)<br>_単位は mebibyte_ |
| **aws.es.cpucredit_balance** <br>(gauge) | クラスター内のデータ ノードで利用可能な残りの CPU クレジット|
| **aws.es.cpuutilization** <br>(gauge) | クラスター内の全ノードにおける CPU 使用率の平均<br>_単位は percent_ |
| **aws.es.cpuutilization.maximum** <br>(gauge) | クラスター内のいずれかのノードにおける CPU 使用率の最大値<br>_単位は percent_ |
| **aws.es.cpuutilization.minimum** <br>(gauge) | クラスター内のいずれかのノードにおける CPU 使用率の最小値<br>_単位は percent_ |
| **aws.es.cross_cluster_inbound_requests** <br>(count) | 宛先ドメイン側のメトリクス。送信元ドメインから受信した接続リクエスト数<br>_単位は request_ |
| **aws.es.cross_cluster_outbound_connections** <br>(gauge) | 送信元ドメイン側のメトリクス。接続済みノード数。この数が 0 になると、その接続は正常ではありません。|
| **aws.es.cross_cluster_outbound_requests** <br>(count) | 送信元ドメイン側のメトリクス。宛先ドメインに送信した検索リクエスト数<br>_単位は request_ |
| **aws.es.deleted_documents** <br>(gauge) | クラスター内のすべてのインデックスで削除対象としてマークされたドキュメント総数<br>_単位は document_ |
| **aws.es.deleted_documents.maximum** <br>(gauge) | クラスター内のすべてのインデックスで削除対象としてマークされたドキュメント数の最大値<br>_単位は document_ |
| **aws.es.deleted_documents.minimum** <br>(gauge) | クラスター内のすべてのインデックスで削除対象としてマークされたドキュメント数の最小値<br>_単位は document_ |
| **aws.es.disk_queue_depth** <br>(gauge) | クラスター内の全ノードにおける、EBS ボリュームへの保留中の入出力 (I/O) リクエスト数の平均<br>_単位は request_ |
| **aws.es.disk_queue_depth.maximum** <br>(gauge) | クラスター内の各ノードにおける、EBS ボリュームへの保留中の入出力 (I/O) リクエスト数の最大値<br>_単位は request_ |
| **aws.es.disk_queue_depth.minimum** <br>(gauge) | クラスター内の各ノードにおける、EBS ボリュームへの保留中の入出力 (I/O) リクエスト数の最小値<br>_単位は request_ |
| **aws.es.elasticsearch_requests** <br>(count) | Elasticsearch クラスターに送られたリクエスト数<br>_単位は request_ |
| **aws.es.elasticsearch_requests.average** <br>(gauge) | Elasticsearch クラスターに送られた平均リクエスト数<br>_単位は request_ |
| **aws.es.free_storage_space** <br>(gauge) | クラスター内の全データ ノードにおける平均空き容量 (メガバイト)<br>_単位は mebibyte_ |
| **aws.es.free_storage_space.maximum** <br>(gauge) | クラスター内で最も空き容量が多い単一のデータ ノードの空き容量 (メガバイト)<br>_単位は mebibyte_ |
| **aws.es.free_storage_space.minimum** <br>(gauge) | クラスター内で最も空き容量が少ない単一のデータ ノードの空き容量 (メガバイト)<br>_単位は mebibyte_ |
| **aws.es.free_storage_space.sum** <br>(gauge) | クラスター内の全データ ノードの空き容量合計 (メガバイト)<br>_単位は mebibyte_ |
| **aws.es.hot_storage_space_utilization** <br>(gauge) | クラスターで使用している hot ストレージの総容量<br>_単位は mebibyte_ |
| **aws.es.hot_to_warm_migration_queue_size** <br>(gauge) | 現在 hot ストレージから warm ストレージへ移行中のインデックス数|
| **aws.es.indexing_latency** <br>(gauge) | シャードがインデックス処理を完了するまでにかかる平均時間 (ミリ秒)<br>_単位は millisecond_ |
| **aws.es.indexing_rate** <br>(count) | 1 分あたりのインデックス処理数<br>_単位は operation_ |
| **aws.es.invalid_host_header_requests** <br>(count) | 無効な (または欠落した) host ヘッダーを含む、Elasticsearch クラスターへの HTTP リクエスト数<br>_単位は request_ |
| **aws.es.invalid_host_header_requests.average** <br>(gauge) | 無効な (または欠落した) host ヘッダーを含む、Elasticsearch クラスターへの HTTP リクエストの平均数<br>_単位は request_ |
| **aws.es.jvmgcold_collection_count** <br>(gauge) | 'old generation' のガベージ コレクションが実行された回数。十分なリソースがあるクラスターでは、この値は小さいままで、増加頻度も低いはずです。<br>_単位は garbage collection_ |
| **aws.es.jvmgcold_collection_time** <br>(gauge) | クラスターが 'old generation' のガベージ コレクションに費やした時間 (ミリ秒)<br>_単位は millisecond_ |
| **aws.es.jvmgcyoung_collection_count** <br>(gauge) | 'young generation' のガベージ コレクションが実行された回数。実行回数が多く、継続的に増えていても、クラスター運用では通常の挙動です。<br>_単位は garbage collection_ |
| **aws.es.jvmgcyoung_collection_time** <br>(gauge) | クラスターが 'young generation' のガベージ コレクションに費やした時間 (ミリ秒)<br>_単位は millisecond_ |
| **aws.es.jvmmemory_pressure** <br>(gauge) | クラスター内の全データ ノードにおける Java ヒープ使用率の平均<br>_単位は percent_ |
| **aws.es.jvmmemory_pressure.maximum** <br>(gauge) | クラスター内のいずれかのデータ ノードにおける Java ヒープ使用率の最大値<br>_単位は percent_ |
| **aws.es.jvmmemory_pressure.minimum** <br>(gauge) | クラスター内のいずれかのデータ ノードにおける Java ヒープ使用率の最小値<br>_単位は percent_ |
| **aws.es.kibana_healthy_nodes** <br>(gauge) | Kibana のヘルス チェック。値が 1 の場合は正常です。値が 0 の場合は Kibana にアクセスできません。|
| **aws.es.kmskey_error** <br>(gauge) | 値が 1 の場合、保管時暗号化に使用している KMS カスタマー マスター キーが無効化されています。保管時暗号化を有効にしているドメインでのみ利用できます。|
| **aws.es.kmskey_inaccessible** <br>(gauge) | 値が 1 の場合、保管時暗号化に使用している KMS カスタマー マスター キーが削除されているか、Amazon ES への付与権限が取り消されています。保管時暗号化を有効にしているドメインでのみ利用できます。|
| **aws.es.master_cpucredit_balance** <br>(gauge) | クラスター内の専用マスター ノードで利用可能な残りの CPU クレジット|
| **aws.es.master_cpuutilization** <br>(gauge) | 専用マスター ノードで使用されている CPU 使用率の最大値<br>_単位は percent_ |
| **aws.es.master_free_storage_space** <br>(gauge) | このメトリクスは無関係なため、無視してかまいません。サービスではマスター ノードをデータ ノードとして使用しません。<br>_単位は mebibyte_ |
| **aws.es.master_jvmmemory_pressure** <br>(gauge) | クラスター内の全専用マスター ノードにおける Java ヒープ使用率の最大値<br>_単位は percent_ |
| **aws.es.master_reachable_from_node** <br>(gauge) | MasterNotDiscovered 例外を検知するためのヘルス チェック。値が 1 の場合は正常です。値が 0 の場合は /\_cluster/health/ が失敗しています。|
| **aws.es.master_reachable_from_node.maximum** <br>(gauge) | MasterNotDiscovered 例外を検知するためのヘルス チェック。値が 1 の場合は正常です。値が 0 の場合は /\_cluster/health/ が失敗しています。|
| **aws.es.master_sys_memory_utilization** <br>(gauge) | インスタンス メモリの使用率<br>_単位は percent_ |
| **aws.es.models_checkpoint_index_status_index_exists** <br>(gauge) | 値が 1 の場合、.opendistro-anomaly-checkpoints インデックスが存在します。初めて異常検知機能を使用するまでは、この値は 0 のままです。|
| **aws.es.models_checkpoint_index_statusred** <br>(gauge) | 値が 1 の場合、.opendistro-anomaly-checkpoints インデックスは red です。初めて異常検知機能を使用するまでは、この値は 0 のままです。|
| **aws.es.nodes** <br>(gauge) | Amazon ES クラスター内のノード数<br>_単位は node_ |
| **aws.es.nodes.maximum** <br>(gauge) | Amazon ES クラスター内のノード数の最大値<br>_単位は node_ |
| **aws.es.nodes.minimum** <br>(gauge) | Amazon ES クラスター内のノード数の最小値<br>_単位は node_ |
| **aws.es.open_search_dashboards_healthy_nodes** <br>(gauge) | OpenSearch Dashboards のヘルス チェック。値が 1 の場合は正常です。値が 0 の場合は Dashboards ノードにアクセスできません。|
| **aws.es.open_search_requests** <br>(count) | OpenSearch クラスターに送られたリクエスト数<br>_単位は request_ |
| **aws.es.open_search_requests.average** <br>(gauge) | OpenSearch クラスターに送られた平均リクエスト数<br>_単位は request_ |
| **aws.es.read_iops** <br>(gauge) | EBS ボリュームの読み取り処理における 1 秒あたりの入出力 (I/O) 操作数<br>_単位は operation_ |
| **aws.es.read_iops.maximum** <br>(gauge) | 各ノードにおける、EBS ボリュームの読み取り処理に対する 1 秒あたりの入出力 (I/O) 操作数の最大値<br>_単位は operation_ |
| **aws.es.read_iops.minimum** <br>(gauge) | 各ノードにおける、EBS ボリュームの読み取り処理に対する 1 秒あたりの入出力 (I/O) 操作数の最小値<br>_単位は operation_ |
| **aws.es.read_latency** <br>(gauge) | EBS ボリュームの読み取り処理における遅延時間 (秒)<br>_単位は second_ |
| **aws.es.read_latency.maximum** <br>(gauge) | EBS ボリュームの読み取り処理における、いずれかのノードでの最大遅延時間 (秒)<br>_単位は second_ |
| **aws.es.read_latency.minimum** <br>(gauge) | EBS ボリュームの読み取り処理における、いずれかのノードでの最小遅延時間 (秒)<br>_単位は second_ |
| **aws.es.read_throughput** <br>(gauge) | EBS ボリュームの読み取り処理におけるスループット (byte/秒)<br>_単位は byte_ |
| **aws.es.read_throughput.maximum** <br>(gauge) | EBS ボリュームの読み取り処理における、いずれかのノードでの最大スループット (byte/秒)<br>_単位は byte_ |
| **aws.es.read_throughput.minimum** <br>(gauge) | EBS ボリュームの読み取り処理における、いずれかのノードでの最小スループット (byte/秒)<br>_単位は byte_ |
| **aws.es.search_latency** <br>(gauge) | シャードが検索処理を完了するまでにかかる平均時間 (ミリ秒)<br>_単位は millisecond_ |
| **aws.es.search_rate** <br>(count) | ノード上のすべてのシャードに対する 1 分あたりの検索リクエスト総数<br>_単位は request_ |
| **aws.es.searchable_documents** <br>(gauge) | クラスター内のすべてのインデックスにまたがる検索可能なドキュメント総数<br>_単位は document_ |
| **aws.es.searchable_documents.maximum** <br>(gauge) | クラスター内のすべてのインデックスにまたがる検索可能なドキュメント数の最大値<br>_単位は document_ |
| **aws.es.searchable_documents.minimum** <br>(gauge) | クラスター内のすべてのインデックスにまたがる検索可能なドキュメント数の最小値<br>_単位は document_ |
| **aws.es.sqldefault_cursor_request_count** <br>(count) | \_opendistro/\_sql API へのページネーション リクエスト数<br>_単位は request_ |
| **aws.es.sqlfailed_request_count_by_cus_err** <br>(count) | クライアント側の問題により失敗した \_opendistro/\_sql API へのリクエスト数<br>_単位は request_ |
| **aws.es.sqlfailed_request_count_by_sys_err** <br>(count) | サーバー側の問題または機能上の制限により失敗した \_opendistro/\_sql API へのリクエスト数<br>_単位は request_ |
| **aws.es.sqlrequest_count** <br>(count) | \_opendistro/\_sql API へのリクエスト数<br>_単位は request_ |
| **aws.es.sqlunhealthy** <br>(gauge) | 値が 1 の場合、特定のリクエストに対して SQL プラグインが 5xx 応答コードを返しているか、無効なクエリ DSL を Elasticsearch に渡していることを示します。|
| **aws.es.sys_memory_utilization** <br>(gauge) | インスタンスのメモリ使用率<br>_単位は percent_ |
| **aws.es.sys_memory_utilization.maximum** <br>(gauge) | インスタンスのメモリ使用率の最大値<br>_単位は percent_ |
| **aws.es.sys_memory_utilization.minimum** <br>(gauge) | インスタンスのメモリ使用率の最小値<br>_単位は percent_ |
| **aws.es.threadpool_bulk_queue** <br>(count) | bulk スレッド プール内でキュー待ちとなっているタスク数<br>_単位は task_ |
| **aws.es.threadpool_bulk_rejected** <br>(count) | bulk スレッド プールで拒否されたタスク数<br>_単位は task_ |
| **aws.es.threadpool_bulk_threads** <br>(gauge) | bulk スレッド プールのサイズ|
| **aws.es.threadpool_forcemerge_queue** <br>(count) | force merge スレッド プール内でキュー待ちとなっているタスク数<br>_単位は task_ |
| **aws.es.threadpool_forcemerge_rejected** <br>(count) | force merge スレッド プールで拒否されたタスク数<br>_単位は task_ |
| **aws.es.threadpool_forcemerge_threads** <br>(gauge) | force merge スレッド プールのサイズ|
| **aws.es.threadpool_index_queue** <br>(count) | index スレッド プール内でキュー待ちとなっているタスク数<br>_単位は task_ |
| **aws.es.threadpool_index_rejected** <br>(count) | index スレッド プールで拒否されたタスク数<br>_単位は task_ |
| **aws.es.threadpool_index_threads** <br>(gauge) | index スレッド プールのサイズ|
| **aws.es.threadpool_merge_queue** <br>(count) | merge スレッド プール内でキュー待ちとなっているタスク数<br>_単位は task_ |
| **aws.es.threadpool_merge_rejected** <br>(count) | merge スレッド プールで拒否されたタスク数<br>_単位は task_ |
| **aws.es.threadpool_merge_threads** <br>(gauge) | merge スレッド プールのサイズ|
| **aws.es.threadpool_search_queue** <br>(count) | search スレッド プール内でキュー待ちとなっているタスク数<br>_単位は task_ |
| **aws.es.threadpool_search_rejected** <br>(count) | search スレッド プールで拒否されたタスク数<br>_単位は task_ |
| **aws.es.threadpool_search_threads** <br>(gauge) | search スレッド プールのサイズ|
| **aws.es.threadpool_write_queue** <br>(count) | write スレッド プール内でキュー待ちとなっているタスク数<br>_単位は task_ |
| **aws.es.threadpool_write_rejected** <br>(count) | write スレッド プールで拒否されたタスク数<br>_単位は task_ |
| **aws.es.threadpool_write_threads** <br>(gauge) | write スレッド プールのサイズ|
| **aws.es.warm_cpuutilization** <br>(gauge) | クラスター内の UltraWarm ノードにおける CPU 使用率<br>_単位は percent_ |
| **aws.es.warm_free_storage_space** <br>(gauge) | 空き warm ストレージ容量 (MiB)<br>_単位は mebibyte_ |
| **aws.es.warm_jvmmemory_pressure** <br>(gauge) | UltraWarm ノードにおける Java ヒープ使用率の最大値<br>_単位は percent_ |
| **aws.es.warm_search_latency** <br>(gauge) | UltraWarm ノード上のシャードが検索処理を完了するまでにかかる平均時間 (ミリ秒)<br>_単位は millisecond_ |
| **aws.es.warm_search_rate** <br>(count) | UltraWarm ノード上のすべてのシャードに対する 1 分あたりの検索リクエスト総数<br>_単位は request_ |
| **aws.es.warm_searchable_documents** <br>(gauge) | クラスター内のすべての warm インデックスにまたがる検索可能なドキュメント総数<br>_単位は document_ |
| **aws.es.warm_storage_space_utilization** <br>(gauge) | クラスターが使用している warm ストレージの総容量<br>_単位は mebibyte_ |
| **aws.es.warm_sys_memory_utilization** <br>(gauge) | warm ノードのメモリ使用率<br>_単位は percent_ |
| **aws.es.warm_to_hot_migration_queue_size** <br>(gauge) | 現在 warm ストレージから hot ストレージへ移行中のインデックス数|
| **aws.es.write_iops** <br>(gauge) | EBS ボリュームの書き込み処理における 1 秒あたりの入出力 (I/O) 操作数<br>_単位は operation_ |
| **aws.es.write_iops.maximum** <br>(gauge) | EBS ボリュームの書き込み処理における、いずれかのノードでの 1 秒あたりの入出力 (I/O) 操作数の最大値<br>_単位は operation_ |
| **aws.es.write_iops.minimum** <br>(gauge) | EBS ボリュームの書き込み処理における、いずれかのノードでの 1 秒あたりの入出力 (I/O) 操作数の最小値<br>_単位は operation_ |
| **aws.es.write_latency** <br>(gauge) | EBS ボリュームの書き込み処理における遅延時間 (秒)<br>_単位は second_ |
| **aws.es.write_latency.maximum** <br>(gauge) | EBS ボリュームの書き込み処理における、いずれかのノードでの最大遅延時間 (秒)<br>_単位は second_ |
| **aws.es.write_latency.minimum** <br>(gauge) | EBS ボリュームの書き込み処理における、いずれかのノードでの最小遅延時間 (秒)<br>_単位は second_ |
| **aws.es.write_throughput** <br>(gauge) | EBS ボリュームの書き込み処理におけるスループット (byte/秒)<br>_単位は byte_ |
| **aws.es.write_throughput.maximum** <br>(gauge) | EBS ボリュームの書き込み処理における、いずれかのノードでの最大スループット (byte/秒)<br>_単位は byte_ |
| **aws.es.write_throughput.minimum** <br>(gauge) | EBS ボリュームの書き込み処理における、いずれかのノードでの最小スループット (byte/秒)<br>_単位は byte_ |

### イベント

Amazon OpenSearch Service インテグレーションにはイベントは含まれません。

### サービス チェック

Amazon OpenSearch Service インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。