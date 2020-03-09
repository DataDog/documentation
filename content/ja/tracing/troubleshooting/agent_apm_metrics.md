---
title: Datadog Agent によって送信された APM メトリクス
kind: ドキュメント
aliases:
  - /ja/agent/faq/agent-apm-metrics/
  - /ja/tracing/send_traces/agent-apm-metrics/
---
以下は、[APM が有効][1] の場合に Datadog Agent によって送信される既定のメトリクスのリストです。

| メトリクス名                                           | 種類      | 説明                                                                                              |
|-------------------------------------------------------|-----------|----------------------------------------------------------------------------------------------------------|
| `datadog.trace_agent.obfuscations`                    | カウント     | SQL の難読化が発生するたびに 1 増加。                                                  |
| `datadog.trace_agent.started`                         | カウント     | Agent が起動するたびに 1 増加。                                                            |
| `datadog.trace_agent.panic`                           | ゲージ     | コードパニックごとに 1 増加。                                                                    |
| `datadog.trace_agent.heartbeat`                       | ゲージ     | 10 秒ごとに 1 増加。                                                                       |
| `datadog.trace_agent.heap_alloc`                      | ゲージ     | GO のランタイムで報告されたヒープ割り当て。                                                          |
| `datadog.trace_agent.cpu_percent`                     | ゲージ     | CPU 使用量 (コア単位): 例えば 50 (1 コアの半分)、200 (2 コア)、250 (2.5 コア)                            |
| `datadog.trace_agent.ratelimit`                       | ゲージ     | 1 未満の場合、リソース使用量（CPU またはメモリ）が多いためにペイロードが拒否されていることを意味します。         |
| `datadog.trace_agent.normalizer.spans_malformed`      | カウント     | システムがフィールドを受け入れるため変更する必要がある不正フィールドを持つスパンの数    |
| `datadog.trace_agent.receiver.trace`                  | カウント     | 受信済みおよび承認済みのトレース数。                                                                  |
| `datadog.trace_agent.receiver.traces_received`        | カウント     | 同上                                                                                            |
| `datadog.trace_agent.receiver.traces_dropped`         | カウント     | 正規化エラーが原因で削除されたトレース。                                                              |
| `datadog.trace_agent.receiver.traces_filtered`        | カウント     | 無視されたリソースによってフィルター処理されたトレース (`datadog.yaml` ファイルで定義)。                                |
| `datadog.trace_agent.receiver.traces_priority`        | カウント     | `priority` タグを持つ優先度サンプラーで処理されたトレース。                                       |
| `datadog.trace_agent.receiver.traces_bytes`           | カウント     | Agent が承認したペイロードの合計バイト数。                                                           |
| `datadog.trace_agent.receiver.spans_received`         | カウント     | Agent が受信したペイロードの合計バイト数。                                                           |
| `datadog.trace_agent.receiver.spans_dropped`          | カウント     | Agent で削除されたペイロードの合計バイト数。                                                            |
| `datadog.trace_agent.receiver.spans_filtered`         | カウント     | Agent でフィルタリングされたペイロードの合計バイト数                                                            |
| `datadog.trace_agent.receiver.events_extracted`       | カウント     | サンプリングされた APM イベントの合計。                                                                                |
| `datadog.trace_agent.receiver.events_sampled`         | カウント     | `max_events_per_second` パラメーターサンプラーでサンプリングされた APM イベントの合計。                               |
| `datadog.trace_agent.receiver.payload_accepted`       | カウント     | Agent が受け入れたペイロード数。                                                                |
| `datadog.trace_agent.receiver.payload_refused`        | カウント     | サンプリングが原因で受信者に拒否されたペイロードの数。                                     |
| `datadog.trace_agent.receiver.error`                  | カウント     | デコード、フォーマット、またはその他のエラーが原因で API がペイロードを拒否した回数。 |
| `datadog.trace_agent.receiver.oom_kill`               | カウント     | メモリ使用量の上限（max_memory の 150％）超過が原因で Agent が自動的に強制終了した回数。                |
| `datadog.trace_agent.receiver.tcp_connections`        | カウント     | Agent に対して接続された TCP 接続の数。                                                        |
| `datadog.trace_agent.receiver.out_chan_fill`          | ゲージ     | 内部メトリクス。受信機の出力チャンネルのフィルの割合                                    |
| `datadog.trace_agent.trace_writer.flush_duration`     | ゲージ     | ペイロードを Datadog API にフラッシュするのにかかった時間。                                                      |
| `datadog.trace_agent.trace_writer.encode_ms`          | ゲージ     | トレースペイロードのエンコードにかかったミリ秒数。                                                 |
| `datadog.trace_agent.trace_writer.compress_ms`        | ゲージ     | エンコードされたトレースペイロードの圧縮にかかったミリ秒数。                                      |
| `datadog.trace_agent.trace_writer.payloads`           | カウント     | 処理されたペイロード数。                                                                            |
| `datadog.trace_agent.trace_writer.connection_fill`    | ヒストグラム | トレースライターが使用する発信接続の割合。                                             |
| `datadog.trace_agent.trace_writer.queue_fill`         | ヒストグラム | 発信ペイロードキューがいっぱいになる割合。                                                               |
| `datadog.trace_agent.trace_writer.dropped`            | カウント     | リトライできない HTTP エラーによってドロップされたペイロード数。                                             |
| `datadog.trace_agent.trace_writer.dropped_bytes`      | カウント     | リトライできない HTTP エラーによってドロップされたバイト数。                                                |
| `datadog.trace_agent.trace_writer.payloads`           | カウント     | 発信ペイロード数。                                                                                 |
| `datadog.trace_agent.trace_writer.traces`             | カウント     | 処理されたトレース数。                                                                              |
| `datadog.trace_agent.trace_writer.events`             | カウント     | 処理されたイベント数。                                                                              |
| `datadog.trace_agent.trace_writer.spans`              | カウント     | 処理されたスパン数。                                                                               |
| `datadog.trace_agent.trace_writer.bytes`              | カウント     | 送信されたバイト数（GZIP 後に計算）。                                                            |
| `datadog.trace_agent.trace_writer.bytes_uncompressed` | カウント     | 送信されたバイト数（GZIP 前に計算）。                                                           |
| `datadog.trace_agent.trace_writer.bytes_estimated`    | カウント     | Agent の内部アルゴリズムで推定されたバイト数                                                   |
| `datadog.trace_agent.trace_writer.retries`            | カウント     | Datadog API でのエラーに対するリトライ回数。                                                        |
| `datadog.trace_agent.trace_writer.errors`             | カウント     | リトライできなかったエラー。                                                                        |
| `datadog.trace_agent.stats_writer.stats_buckets`      | カウント     | フラッシュされた統計バケット数。                                                                         |
| `datadog.trace_agent.stats_writer.bytes`              | カウント     | 送信されたバイト数（GZIP 後に計算）。                                                            |
| `datadog.trace_agent.stats_writer.retries`            | カウント     | Datadog API での失敗に対するエラー回数                                                         |
| `datadog.trace_agent.stats_writer.splits`             | カウント     | ペイロードが複数に分割された回数。                                                  |
| `datadog.trace_agent.stats_writer.errors`             | カウント     | リトライできなかったエラー。                                                                        |
| `datadog.trace_agent.stats_writer.encode_ms`          | ヒストグラム | 統計データペイロードのエンコード時間。                                                                  |
| `datadog.trace_agent.stats_writer.connection_fill`    | ヒストグラム | 使用する発信接続の割合。                                                                 |
| `datadog.trace_agent.stats_writer.queue_fill`         | ヒストグラム | いっぱいになったキューの割合。                                                                              |
| `datadog.trace_agent.stats_writer.dropped`            | カウント     | 再試行不可能な HTTP のエラーが原因でドロップされたペイロード数。                                             |
| `datadog.trace_agent.stats_writer.dropped_bytes`      | カウント     | リトライできない HTTP エラーによって削除されたバイト数。                                                |
| `datadog.trace_agent.service_writer.services`         | カウント     | フラッシュしたサービス数                                                                              |
| `datadog.trace_agent.events.max_eps.max_rate`         | ゲージ     | Agent が構成する `max_events_per_second` パラメーターと同一                                            |
| `datadog.trace_agent.events.max_eps.reached_max`      | ゲージ     | `max_events_per_second` に到達するたびに `1` に設定（それ以外は `0`）                         |
| `datadog.trace_agent.events.max_eps.current_rate`     | ゲージ     | Agent が受信した 1 秒あたりの APM イベント数                                                     |
| `datadog.trace_agent.events.max_eps.sample_rate`      | ゲージ     | Agent が受信したイベントに適用されるサンプルレート                                                   |

[1]: /ja/tracing/setup