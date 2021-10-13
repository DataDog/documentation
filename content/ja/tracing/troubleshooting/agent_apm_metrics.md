---
title: Datadog Agent によって送信された APM メトリクス
kind: ドキュメント
aliases:
  - /ja/agent/faq/agent-apm-metrics/
  - /ja/tracing/send_traces/agent-apm-metrics/
---
以下で、 [APM が有効化された際に][1] Datadog Agent により送信され、すぐに使えるトレーシングメトリクスの一覧をご覧いただけます。お使いの Datadog アカウントに [APM モニタリングダッシュボード][2]をインポートすれば、ダッシュボードでこれらのメトリクスの大半を利用できるようになります。



`datadog.trace_agent.cpu_percent`
: **タイプ**: ゲージ<br>
CPU 使用量 (コア単位): 例えば 50 (1 コアの半分)、200 (2 コア)、250 (2.5 コア)

`datadog.trace_agent.events.max_eps.current_rate`
: **タイプ**: ゲージ<br>
Agent が受信した 1 秒あたりの APM イベントの数

`datadog.trace_agent.events.max_eps.max_rate`
: **タイプ**: ゲージ<br>
Agent が構成する max_events_per_second パラメーターと同一


`datadog.trace_agent.events.max_eps.reached_max`
: **タイプ**: ゲージ<br>
max_events_per_second に到達するたびに `1` に設定 (それ以外は `0`)


`datadog.trace_agent.events.max_eps.sample_rate`
: **タイプ**: ゲージ<br>
Agent が受信したイベントに適用されるサンプルレート

`datadog.trace_agent.heap_alloc`
: **タイプ**: ゲージ<br>
GO のランタイムで報告されたヒープ割り当て。

`datadog.trace_agent.heartbeat`
: **タイプ**: ゲージ<br>
10 秒ごとに 1 増加。

`datadog.trace_agent.normalizer.spans_malformed`
: **タイプ**: カウント<br>
システムがフィールドを受け入れるため変更する必要がある不正フィールドを持つスパンの数

`datadog.trace_agent.obfuscations`
: **タイプ**: カウント<br>
SQL の難読化が発生するたびに 1 増加。

`datadog.trace_agent.panic`
: **タイプ**: ゲージ<br>
コードパニックごとに 1 増加。

`datadog.trace_agent.ratelimit`
: **タイプ**: ゲージ<br>
`1` 未満の場合、リソース使用量 (CPU またはメモリ) が多いためにペイロードが拒否されていることを意味します。

`datadog.trace_agent.receiver.error`
: **タイプ**: カウント<br>
デコード、フォーマット、またはその他のエラーが原因で API がペイロードを拒否した回数。

`datadog.trace_agent.receiver.events_extracted`
: **タイプ**: カウント<br>
サンプリングされた APM イベントの合計。

`datadog.trace_agent.receiver.events_sampled`
: **タイプ**: カウント<br>
`max_events_per_second` パラメーターサンプラーでサンプリングされた APM イベントの合計。

`datadog.trace_agent.receiver.oom_kill`
: **タイプ**: カウント<br>
メモリ使用量の上限 (max_memory の 150%) 超過が原因で Agent が自動的に強制終了した回数。

`datadog.trace_agent.receiver.out_chan_fill`
: **タイプ**: ゲージ<br>
内部メトリクス。受信機の出力チャンネルのフィルの割合。

`datadog.trace_agent.receiver.payload_accepted`
: **タイプ**: カウント<br>
Agent が受け入れたペイロード数。

`datadog.trace_agent.receiver.payload_refused`
: **タイプ**: カウント<br>
サンプリングが原因で受信者に拒否されたペイロードの数。

`datadog.trace_agent.receiver.spans_dropped`
: **タイプ**: カウント<br>
Agent で削除されたペイロードの合計バイト数。

`datadog.trace_agent.receiver.spans_filtered`
: **タイプ**: カウント<br>
Agent でフィルタリングされたペイロードの合計バイト数

`datadog.trace_agent.receiver.spans_received`
: **タイプ**: カウント<br>
Agent が受信したペイロードの合計バイト数。

`datadog.trace_agent.receiver.tcp_connections`
: **タイプ**: カウント<br>
Agent に対して接続された TCP 接続の数。

`datadog.trace_agent.receiver.trace`
: **タイプ**: カウント<br>
受信済みおよび承認済みのトレース数。

`datadog.trace_agent.receiver.traces_bytes`
: **タイプ**: カウント<br>
Agent が承認したペイロードの合計バイト数。

`datadog.trace_agent.receiver.traces_dropped`
: **タイプ**: カウント<br>
正規化エラーが原因で削除されたトレース。

`datadog.trace_agent.receiver.traces_filtered`
: **タイプ**: カウント<br>
無視されたリソースによってフィルター処理されたトレース (`datadog.yaml` ファイルで定義)。

`datadog.trace_agent.receiver.traces_priority`
: **タイプ**: カウント<br>
priority タグを持つ優先度サンプラーで処理されたトレース。

`datadog.trace_agent.receiver.traces_received`
: **タイプ**: カウント<br>
受信済みおよび承認済みのトレース数。

`datadog.trace_agent.service_writer.services`
: **タイプ**: カウント<br>
フラッシュしたサービス数。

`datadog.trace_agent.started`
: **タイプ**: カウント<br>
Agent が起動するたびに 1 増加。

`datadog.trace_agent.stats_writer.bytes`
: **タイプ**: カウント<br>
送信されたバイト数 (GZIP 後に計算)。

`datadog.trace_agent.stats_writer.connection_fill`
: **タイプ**: ヒストグラム <br>
使用する発信接続の割合。

`datadog.trace_agent.stats_writer.dropped`
: **タイプ**: カウント<br>
再試行不可能な HTTP のエラーが原因でドロップされたペイロード数。

`datadog.trace_agent.stats_writer.dropped_bytes`
: **タイプ**: カウント<br>
リトライできない HTTP エラーによって削除されたバイト数。

`datadog.trace_agent.stats_writer.encode_ms`
: **タイプ**: ヒストグラム <br>
統計データペイロードのエンコード時間。

`datadog.trace_agent.stats_writer.errors`
: **タイプ**: カウント<br>
リトライできなかったエラー。

`datadog.trace_agent.stats_writer.queue_fill`
: **タイプ**: ヒストグラム <br>
いっぱいになったキューの割合。

`datadog.trace_agent.stats_writer.retries`
: **タイプ**: カウント<br>
Datadog API でのエラーに対するリトライ回数

`datadog.trace_agent.stats_writer.splits`
: **タイプ**: カウント<br>
ペイロードが複数に分割された回数。

`datadog.trace_agent.stats_writer.stats_buckets`
: **タイプ**: カウント<br>
フラッシュされた統計バケット数。

`datadog.trace_agent.trace_writer.bytes`
: **タイプ**: カウント<br>
送信されたバイト数 (GZIP 後に計算)。

`datadog.trace_agent.trace_writer.bytes_estimated`
: **タイプ**: カウント<br>
Agent の内部アルゴリズムで推定されたバイト数。

`datadog.trace_agent.trace_writer.bytes_uncompressed `
: **タイプ**: カウント<br>
送信されたバイト数 (GZIP 前に計算)。

`datadog.trace_agent.trace_writer.compress_ms`
: **タイプ**: ゲージ<br>
エンコードされたトレースペイロードの圧縮にかかったミリ秒数。

`datadog.trace_agent.trace_writer.connection_fill`
: **タイプ**: ヒストグラム <br>
トレースライターが使用する発信接続の割合。

`datadog.trace_agent.trace_writer.dropped`
: **タイプ**: カウント<br>
リトライできない HTTP エラーによってドロップされたペイロード数。

`datadog.trace_agent.trace_writer.dropped_bytes`
: **タイプ**: カウント<br>
リトライできない HTTP エラーによってドロップされたバイト数。

`datadog.trace_agent.trace_writer.encode_ms`
: **タイプ**: ゲージ<br>
トレースペイロードのエンコードにかかったミリ秒数。

`datadog.trace_agent.trace_writer.errors`
: **タイプ**: カウント<br>
リトライできなかったエラー。

`datadog.trace_agent.trace_writer.events`
: **タイプ**: カウント<br>
処理されたイベント数。

`datadog.trace_agent.trace_writer.flush_duration`
: **タイプ**: ゲージ<br>
ペイロードを Datadog API にフラッシュするのにかかった時間。

`datadog.trace_agent.trace_writer.payloads`
: **タイプ**: カウント<br>
処理されたペイロード数。

`datadog.trace_agent.trace_writer.payloads`
: **タイプ**: カウント<br>
発信ペイロード数。

`datadog.trace_agent.trace_writer.queue_fill`
: **タイプ**: ヒストグラム <br>
発信ペイロードキューがいっぱいになる割合。

`datadog.trace_agent.trace_writer.retries`
: **タイプ**: カウント<br>
Datadog API でのエラーに対するリトライ回数。

`datadog.trace_agent.trace_writer.spans`
: **タイプ**: カウント<br>
処理されたスパン数。

`datadog.trace_agent.trace_writer.traces`
: **タイプ**: カウント<br>
処理されたトレース数。

[1]: /ja/tracing/setup/
[2]: /resources/json/APM_monitoring_dashboard.json