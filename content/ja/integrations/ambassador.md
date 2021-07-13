---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - Cloud
  - orchestration
  - containers
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/ambassador/README.md'
display_name: Ambassador
draft: false
git_integration_title: ambassador
guid: 71936a65-1a8c-4f6e-a18e-f71d4236182b
integration_id: ambassador
integration_title: Ambassador API Gateway
is_public: true
kind: インテグレーション
maintainer: hello@datawire.io
manifest_version: 1.0.0
metric_prefix: envoy.
metric_to_check: envoy.listener.downstream_cx_total
name: ambassador
public_title: Datadog-Ambassador API Gateway インテグレーション
short_description: Ambassador は、Envoy 上に構築された Kubernetes ネイティブのオープンソース API ゲートウェイです
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

[Ambassador][1] からリアルタイムにメトリクスを取得すると、以下のことができます。

- マイクロサービスのパフォーマンスを視覚化できます。

- Ambassador を使用してカナリアロールアウトを行うことができるため、サービスの新しいバージョンの影響を把握できます。

![スナップショット][2]

## セットアップ

Agent Daemonset で DogStatsD を有効にし、Ambassador ポッドで次の環境変数を設定します。

```
name: STATSD_HOST
valueFrom:
  fieldRef:    
    fieldPath: status.hostIP
```

この設定では、StatsD メトリクスがホストの IP に送信され、トラフィックが Agent ポート 8125 にリダイレクトされます。

詳細については、[Ambassador に関するドキュメント][3]を参照してください。

Ambassador から Datadog APM へトレースデータを送信することも可能です。詳しくは、[Ambassador Datadog APM トレースドキュメント][4]をご参照ください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ambassador" >}}


### イベント

Ambassador チェックには、イベントは含まれません。

### サービスのチェック

Ambassador チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://www.getambassador.io
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ambassador/images/upstream-req-time.png
[3]: https://www.getambassador.io/docs/latest/topics/running/statistics/#exposing-statistics-via-statsd
[4]: https://www.getambassador.io/docs/latest/howtos/tracing-datadog/
[5]: https://github.com/DataDog/integrations-extras/blob/master/ambassador/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/