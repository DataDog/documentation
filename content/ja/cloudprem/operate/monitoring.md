---
description: CloudPrem デプロイメントで監視すべき主なメトリクスを確認する
title: CloudPrem を監視する
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## ダッシュボード

CloudPrem には、主要メトリクスを監視するための標準ダッシュボードが用意されています。

### セットアップ

これらのメトリクスは [DogStatsD][1] からエクスポートされます。利用方法は次のいずれかです:

- DogStatsD をスタンドアロン サービスとして実行する
- Datadog Agent を実行する (DogStatsD は既定で含まれています)

どちらの方法でも、組織の API キーを設定することで、これらのメトリクスをエクスポートできます。CloudPrem クラスターが Datadog に接続されると、標準ダッシュボードが自動的に作成され、[Dashboards 一覧][2] からアクセスできるようになります。

<div class="alert alert-info">ダッシュボードに distribution メトリクスを表示するには、<a href="/metrics/distributions/#enabling-advanced-query-functionality">高度なクエリ機能を有効にする</a> 必要があります。</div>

### 収集データ

| メトリクス | 説明 |
|---|---|
| **indexed_events.count**<br/>(Counter) | インデックス化されたイベント数 |
| **indexed_events_bytes.count**<br/>(Counter) | インデックス化されたバイト数 |
| **ingest_requests.count**<br/>(Counter) | 取り込みリクエスト数 |
| **ingest_requests.duration_seconds**<br/>(Histogram) | 取り込みリクエストのレイテンシ |
| **object_storage_delete_requests.count**<br/>(Counter) | オブジェクト ストレージに対する削除リクエスト数 |
| **object_storage_get_requests.count**<br/>(Counter) | オブジェクト ストレージに対する GET リクエスト数 |
| **object_storage_get_requests_bytes.count**<br/>(Counter) | GET リクエストでオブジェクト ストレージから読み取った総バイト数 |
| **object_storage_put_requests.count**<br/>(Counter) | オブジェクト ストレージに対する PUT リクエスト数 |
| **object_storage_put_requests_bytes.count**<br/>(Counter) | PUT リクエストでオブジェクト ストレージに書き込んだ総バイト数 |
| **pending_merge_ops.gauge**<br/>(Gauge) | 保留中のマージ処理数 |
| **search_requests.count**<br/>(Counter) | 検索リクエスト数 |
| **search_requests.duration_seconds**<br/>(Histogram) | 検索リクエストのレイテンシ |
| **metastore_requests.count**<br/>(Counter) | metastore リクエスト数 |
| **metastore_requests.duration_seconds**<br/>(Histogram) | metastore リクエストのレイテンシ |
| **cpu.usage.gauge**<br/>(Gauge) | CPU 使用率 |
| **uptime.gauge**<br/>(Gauge) | サービス稼働時間 (秒) |
| **memory.allocated_bytes.gauge**<br/>(Gauge) | 割り当て済みメモリ量 (バイト) |
| **disk.bytes_read.counter**<br/>(Counter) | ディスクから読み取った総バイト数 |
| **disk.bytes_written.counter**<br/>(Counter) | ディスクに書き込んだ総バイト数 |
| **disk.available_space.gauge**<br/>(Gauge) | 利用可能なディスク空き容量 (バイト) |
| **disk.total_space.gauge**<br/>(Gauge) | ディスク総容量 (バイト) |
| **network.bytes_recv.counter**<br/>(Counter) | ネットワーク経由で受信した総バイト数 |
| **network.bytes_sent.counter**<br/>(Counter) | ネットワーク経由で送信した総バイト数 |

<!-- ## アラート、自動スケーリング、アップグレード

近日公開予定。 -->

[1]: https://docs.datadoghq.com/ja/extend/dogstatsd/?tab=hostagent
[2]: https://app.datadoghq.com/dashboard/lists?q=cloudprem&p=1