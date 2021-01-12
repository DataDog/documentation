---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - コラボレーション
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/concourse_ci/README.md'
display_name: Concourse CI
draft: false
git_integration_title: concourse_ci
guid: 054cc9fb-01c4-4f05-98b5-fae828746787
integration_id: concourse-ci
integration_title: Concourse-CI
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: concourse.ci.
metric_to_check: concourse.ci.goroutines
name: concourse_ci
public_title: Datadog-Concourse-CI インテグレーション
short_description: Concourse CI から送信されるメトリクスを収集
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Concourse CI で Datadog メトリクスエミッターを構成すると、以下のことができます。

- パイプラインの処理時間、コンテナの数、およびマウントされたワーカーボリュームを可視化できます。
- 低速なリクエストを識別してルートを構築できます。

## セットアップ

### インストール

Concourse CI には Datadog メトリクスエミッターが付属しています。起動時にメトリクスを送信するように [ATC][1] を構成するには、[Datadog Agent][2] がインストールされていることが前提条件です。

### コンフィギュレーション

以下のオプションを設定して、Datadog エミッターを使用するように ATC を構成します。[カスタムメトリクス][3]を送信しないように、`concourse.ci` というプレフィックスを使用することが重要です。

### Datadog メトリクスエミッターのオプション

詳細については、Concourse CI の[ドキュメント][4]を参照してください。

```text
Metric Emitter (Datadog):
    --datadog-agent-host=       Datadog agent host to expose dogstatsd metrics [$CONCOURSE_DATADOG_AGENT_HOST]
    --datadog-agent-port=       Datadog agent port to expose dogstatsd metrics [$CONCOURSE_DATADOG_AGENT_PORT]
    --datadog-prefix=           Prefix for all metrics to easily find them in Datadog [$CONCOURSE_DATADOG_PREFIX]
```

## 収集データ

### メトリクス
{{< get-metrics-from-git "concourse_ci" >}}


### イベント

このインテグレーションは、イベントをサポートしていません。

### サービス

このインテグレーションは、サービスチェックを収集しません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://concourse-ci.org/concepts.html
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics/
[4]: https://concourse-ci.org/metrics.html#configuring-metrics
[5]: https://github.com/DataDog/integrations-extras/blob/master/concourse_ci/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/