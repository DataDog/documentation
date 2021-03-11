---
assets:
  dashboards:
    OpenTelemetry Dashboard: assets/dashboards/dashboard.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - OS & システム
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/otel/README.md'
display_name: OTel
draft: true
git_integration_title: otel
guid: 7e87e1cc-df3b-4aa1-a6c0-3489f8296f86
integration_id: otel
integration_title: OpenTelemetry
is_public: false
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: otel.
metric_to_check:
  - otel.datadog_exporter.metrics.running
  - otel.datadog_exporter.traces.running
name: OTel
public_title: OpenTelemetry
short_description: OpenTelemetry コレクターからテレメトリーデータを取得
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## OpenTelemetry コレクター

## 概要

OpenTelemetry コレクターはベンダーに依存せず使える Agent のプロセスで、Datadog のエクスポーターを介して Datadog サーバーにテレメトリーデータを直接エクスポートすることができます。
また、インスツルメンテーションされたアプリケーションと汎用システムメトリクスからのメトリクスとトレースを報告します。

ホストメトリクスは既定のダッシュボードに表示されますが、OpenTelemetry コレクターを使用して任意のメトリクスを Datadog に送信することができます。コレクターにより報告されたすべてのメトリクスは、その他の Datadog インテグレーションからのメトリクスとの競合を防ぐために `otel.` 下のネームスペースに保存されます。

## セットアップ

### インストール

[OpenTelemetry コレクターのドキュメント][1]に従って `opentelemetry-collector-contrib` ディストリビューションをインストールするか、Datadog エクスポーターを含むその他のディストリビューションを使用してください。

Datadog にテレメトリーデータをエクスポートする際に Datadog Agent は**使用しません**。

### コンフィギュレーション

OpenTelemetry コレクターからテレメトリーデータを Datadog にエクスポートするには、Datadog エクスポーターをお使いのメトリクスおよびトレースパイプラインに追加します。
この時必要な設定は[API キー][2]のみです。


システムメトリクスの取得に最低限必要なコンフィギュレーションファイルは以下の通りです。

``` yaml
receivers:
  hostmetrics:
    scrapers:
      load:
      cpu:
      disk:
      filesystem:
      memory:
      network:
      paging:
      process:

processors:
  batch:
    timeout: 10s

exporters:
  datadog:
    api:
      key: "<Your API key goes here>"

service:
  pipelines:
    metrics:
      receivers: [hostmetrics]
      processors: [batch]
      exporters: [datadog]
```

Datadog エクスポーターの設定とパイプラインの構成方法についての詳細は、[OpenTelemetry コレクター向け Datadog エクスポーターに関するドキュメント][3]をご覧ください。


### 検証

OpenTelemetry コレクターのログで Datadog エクスポーターが有効化されており、正常に起動したことを確認してください。
たとえば、上記のコンフィギュレーションの場合は以下のようなログメッセージを確認することができます。

``` 
Exporter is enabled.    {"component_kind": "exporter", "exporter": "datadog"}
Exporter is starting... {"component_kind": "exporter", "component_type": "datadog", "component_name": "datadog"}
Exporter started.   {"component_kind": "exporter", "component_type": "datadog", "component_name": "datadog"}
Everything is ready. Begin running and processing data.
```

## 収集データ

### メトリクス
{{< get-metrics-from-git "otel" >}}


### サービスのチェック

OpenTelemetry コレクターには、サービスのチェック機能は含まれません。

### イベント

OpenTelemetry コレクターには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://opentelemetry.io/docs/collector/getting-started/
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.datadoghq.com/ja/tracing/setup_overview/open_standards/#opentelemetry-collector-datadog-exporter
[4]: https://github.com/open-telemetry/opentelemetry-collector/tree/master/receiver/hostmetricsreceiver
[5]: https://github.com/DataDog/integrations-core/blob/master/opentelemetry/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/