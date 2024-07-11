---
aliases:
- /ja/tracing/troubleshooting/apm_rate_limits
title: Agent 率制限
---

## 最大接続制限

Agent ログに以下のエラーメッセージが表示される場合、デフォルトの APM 接続制限である 2000 を超えています。

```
ERROR | (pkg/trace/logutil/throttled.go:38 in log) | http.Server: http: Accept error: request has been rate-limited; retrying in 80ms
```

Agent の APM 接続制限を増やすには、Agent のコンフィギュレーションファイル (`apm_config:` セクションの下) 内で `connection_limit` 属性を構成します。コンテナ化されたデプロイメント (Docker、Kubernetes など) の場合は、`DD_APM_CONNECTION_LIMIT` 環境変数を使用します。

## 最大メモリ制限

Agent のログに以下のエラーメッセージが表示された場合、Agent の最大メモリ使用量が 150% を超えたことを意味します。

```
CRITICAL | (pkg/trace/api/api.go:703 in watchdog) | Killing process. Memory threshold exceeded: 8238.08M / 715.26M
CRITICAL | (pkg/trace/osutil/file.go:39 in Exitf) | OOM
```

Agent の最大メモリ制限を増やすには、Agent のコンフィギュレーションファイルの `apm_config` セクションで `max_memory` 属性を構成します。コンテナ型のデプロイメント (例えば、Docker や Kubernetes) の場合は、環境変数 `DD_APM_MAX_MEMORY` を使用します。

Kubernetes などのオーケストレーターでメモリ制限を処理したい場合、Datadog Agent 7.23.0 以降、この制限を `0` に設定することで無効にすることができます。

## 最大 CPU 使用率

この設定は、APM Agent が使用する最大 CPU パーセントを定義します。Kubernetes 以外の環境では、デフォルトで 50 に設定されており、これは 0.5 コアに相当します (100 = 1 コア)。この制限に達すると、CPU 使用量が再び制限を下回るまでペイロードは拒否されます。これは `datadog.trace_agent.receiver.ratelimit` によって反映され、現在ドロップされているペイロードの割合を表します (値が 1 の場合は、トレースがドロップされていないことを意味します)。これは、[Service Table View][1] で、`Limited Resource` という警告として表示されることもあります。

オーケストレーター (または外部サービス) に Datadog Agent のリソース制限を管理させたい場合、Datadog では環境変数 `DD_APM_MAX_CPU_PERCENT` を `0` に設定してこれを無効にすることを推奨します (Datadog Agent 7.23.0 からサポートされるようになりました)。

[1]: /ja/tracing/trace_pipeline/ingestion_controls/#service-table-view