---
title: Agent 率制限
kind: Documentation
aliases:
  - /ja/tracing/troubleshooting/apm_rate_limits
---
## 1 秒あたりの最大イベント制限

Agent ログに以下のエラーメッセージが表示される場合、アプリケーションは、デフォルトで APM で許可されている毎秒 200 件を超えるトレースイベントを発行しています。

```
Max events per second reached (current=300.00/s, max=200.00/s). Some events are now being dropped (sample rate=0.54). Consider adjusting event sampling rates.

```

Agent の APM レート制限を増やすには、Agent のコンフィギュレーションファイル (`apm_config:` セクションの下) 内で `max_events_per_second` 属性を構成します。コンテナ化されたデプロイメント (Docker、Kubernetes など) の場合は、`DD_APM_MAX_EPS` 環境変数を使用します。

**注**: APM レート制限を増やすと、App Analytics のコストが増加する可能性があります。

## 最大接続制限

Agent ログに以下のエラーメッセージが表示される場合、デフォルトの APM 接続制限である 2000 を超えています。

```
ERROR | (pkg/trace/logutil/throttled.go:38 in log) | http.Server: http: Accept error: request has been rate-limited; retrying in 80ms
```

Agent の APM 接続制限を増やすには、Agent のコンフィギュレーションファイル (`apm_config:` セクションの下) 内で `connection_limit` 属性を構成します。コンテナ化されたデプロイメント (Docker、Kubernetes など) の場合は、`DD_APM_CONNECTION_LIMIT` 環境変数を使用します。