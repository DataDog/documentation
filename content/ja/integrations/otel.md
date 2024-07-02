---
"app_id": "otel"
"app_uuid": "ca08ac68-f4a4-4d84-9c21-8f645733d62c"
"assets":
  "dashboards":
    "OpenTelemetry Collector Metrics Dashboard": assets/dashboards/otel_collector_metrics_dashboard.json
    "OpenTelemetry Dashboard": assets/dashboards/otel_host_metrics_dashboard.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check":
      - otel.datadog_exporter.metrics.running
      - otel.datadog_exporter.traces.running
      "metadata_path": metadata.csv
      "prefix": otel.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "312"
    "source_type_name": OTel
  "monitors":
    "OpenTelemetry Refused Spans": assets/monitors/otel_refused_spans.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- developer tools
- network
- os & system
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/otel/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "otel"
"integration_id": "otel"
"integration_title": "OpenTelemetry"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "otel"
"public_title": "OpenTelemetry"
"short_description": "Get telemetry data from the OpenTelemetry Collector"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Developer Tools"
  - "Category::Network"
  - "Category::OS & System"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Get telemetry data from the OpenTelemetry Collector
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": OpenTelemetry
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## OpenTelemetry Collector
## Overview

<div class="alert alert-danger">
  <strong>Important:</strong> OpenTelemetry Collector Contrib v0.95.0 introduces a breaking change that disables Trace Metrics computation in the Datadog Exporter. Follow Datadog's <a href="https://docs.datadoghq.com/opentelemetry/guide/migration/">migration guide</a> when upgrading.
</div>

OpenTelemetry は、テレメトリーデータのベンダーに依存しない標準です。Datadog は、OpenTelemetry コレクターと Datadog Agent を通じて、OpenTelemetry データの取り込みをサポートしています。このタイルでは、Datadog Exporter [OpenTelemetry コレクター Datadog エクスポーター][1]を使用して OpenTelemetry コレクターから Datadog にデータをエクスポートする方法を説明します。また、Datadog Agent で OTLP トレースを取り込む方法については、[Datadog Agent における OTLP の取り込み][2]を参照してください。

OpenTelemetry コレクターは、ベンダーに依存しない Agent プロセスで、Datadog エクスポーターを通じてテレメトリーデータを Datadog サーバーに直接エクスポートします (Agent のインストールは必要ありません)。インスツルメンテーションされたアプリケーションからのメトリクスとトレース、および一般的なシステムメトリクスをレポートします。

ホストメトリクスは OpenTelemetry ホストメトリクスのデフォルトダッシュボードに表示されますが、OpenTelemetry コレクターを使用して任意のメトリクスを Datadog に送信することができます。ホストメトリクスレシーバーで生成されるような `system.*` や `process.*` 以下のメトリクスは、Datadog Agent からのメトリクスと衝突しないように、`otel.system.*` や `otel.process.*` に名前変更されています。さらに、OpenTelemetry コレクターのメトリクスは、OpenTelemetry コレクターメトリクスのデフォルトダッシュボードに表示されます。

## セットアップ

### インストール

[OpenTelemetry コレクターのドキュメント][3]に従って `opentelemetry-collector-contrib` ディストリビューションをインストールするか、Datadog Exporter を含むその他のディストリビューションを使用してください。

このセットアップでテレメトリーデータを Datadog にエクスポートするには、Datadog Agent は**必要ありません**。Datadog Agent を使用する場合は、[Datadog Agent における OTLP の取り込み][2]を参照してください。
### 構成

OpenTelemetry コレクターからテレメトリーデータを Datadog にエクスポートするには、Datadog エクスポーターをお使いのメトリクスおよびトレースパイプラインに追加します。
この時必要な設定は [API キー][4]のみです。

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

Datadog エクスポーターの設定とパイプラインの構成方法についての詳細は、[OpenTelemetry コレクター向け Datadog エクスポーター][1]をご覧ください。

メトリクスの種類については[メトリクスセクション][5]を、このチェックで提供されるメトリクスの一覧については [metadata.csv][6] を参照してください。上記のサンプル構成のように `hostmetrics` レシーバーを使用している場合、他のOpenTelemetry Collector のコンポーネントで任意のメトリクスを送信することができます。

[ホストメトリクスレシーバーの説明][7]に従って、異なるグループのメトリクスを有効にし、カスタマイズすることができます。
CPU とディスクのメトリクスは、macOS では利用できません。

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


### サービスチェック

OpenTelemetry コレクターには、サービスのチェック機能は含まれません。

### イベント

OpenTelemetry コレクターには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://docs.datadoghq.com/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
[2]: https://docs.datadoghq.com/tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/collector/getting-started/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/metrics/otlp/
[6]: https://github.com/DataDog/integrations-core/blob/master/otel/metadata.csv
[7]: https://github.com/open-telemetry/opentelemetry-collector/tree/master/receiver/
[8]: https://docs.datadoghq.com/help/

