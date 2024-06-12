---
app_id: ambassador
app_uuid: eb591405-8cda-486a-8cf5-a06af769a3d7
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: envoy.listener.downstream_cx_total
      metadata_path: metadata.csv
      prefix: envoy.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10010
    source_type_name: Ambassador
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Ambassador
  sales_email: hello@datawire.io
  support_email: hello@datawire.io
categories:
- cloud
- containers
- kubernetes
- orchestration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ambassador/README.md
display_on_public_website: true
draft: false
git_integration_title: ambassador
integration_id: ambassador
integration_title: Ambassador API Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: ambassador
public_title: Ambassador API Gateway
short_description: Ambassador は、Envoy 上に構築された Kubernetes ネイティブのオープンソース API ゲートウェイです
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::クラウド
  - Category::コンテナ
  - Category::Kubernetes
  - Category::オーケストレーション
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Ambassador は、Envoy 上に構築された Kubernetes ネイティブのオープンソース API ゲートウェイです
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Ambassador API Gateway
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Ambassador][1] からリアルタイムにメトリクスを取得すると、以下のことができます。

- マイクロサービスのパフォーマンスを視覚化できます。

- Ambassador を使用してカナリアロールアウトを行うことができるため、サービスの新しいバージョンの影響を把握できます。

![スナップショット][2]

## 計画と使用

Agent Daemonset で DogStatsD を有効にし、Ambassador ポッドで次の環境変数を設定します。

```
name: STATSD_HOST
valueFrom:
  fieldRef:    
    fieldPath: status.hostIP
```

この設定では、StatsD メトリクスがホストの IP に送信され、トラフィックが Agent ポート 8125 にリダイレクトされます。

詳しくは、[StatsD による Envoy 統計][3]をご覧ください。

Ambassador から Datadog APM へトレースデータを送信することも可能です。詳しくは、[Datadog による分散型トレース][4]をご参照ください。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "ambassador" >}}


### ヘルプ

Ambassador チェックには、イベントは含まれません。

### ヘルプ

Ambassador チェックには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://www.getambassador.io
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ambassador/images/upstream-req-time.png
[3]: https://www.getambassador.io/docs/edge-stack/latest/topics/running/statistics/envoy-statsd/
[4]: https://www.getambassador.io/docs/latest/howtos/tracing-datadog/
[5]: https://github.com/DataDog/integrations-extras/blob/master/ambassador/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/