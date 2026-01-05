---
app_id: cloudquery
categories:
- コスト管理
- data stores
- 開発ツール
- security
custom_kind: インテグレーション
description: CloudQuery の同期を監視する
integration_version: 1.0.0
media:
- caption: CloudQuery の同期に関するインサイト
  image_url: images/dashboard.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: CloudQuery
---
![datadog-integration](https://raw.githubusercontent.com/DataDog/integrations-extras/master/cloudquery/images/cloudquery_logo_png_dark_background.png)

## 概要

[CloudQuery](https://www.cloudquery.io/) は、開発者向けに構築された[オープンソース](https://github.com/cloudquery/cloudquery)の高性能データインテグレーションフレームワークで、幅広いプラグインをサポートしています。

CloudQuery はクラウド API から構成情報を抽出、変換、ロードし、データベース、データ レイク、ストリーミング プラットフォームなどのさまざまな対応先に送ってさらに分析できるようにします。

## セットアップ

### インストール

CloudQuery から OpenTelemetry トレース、メトリクス、およびログを取り込むには、[Datadog Agent](https://docs.datadoghq.com/agent/) バージョン >=6.48.0 または >=7.48.0 をインストールしてください。
または、以下に説明するように、OpenTelemetry Collector と Datadog Exporter を使用することもできます。

### 設定

CloudQuery は [OpenTelemetry](https://opentelemetry.io/) のトレース、メトリクス、ログを標準でサポートしています。
Datadog で OpenTelemetry を構成する方法は複数存在します。

- [OpenTelemetry コレクターを使用する](#OpenTelemetry-collector)
- [構成ファイルを通じた Datadog Agent による OpenTelemetry 直接取り込み](#datadog-agent-OpenTelemetry-ingestion-through-a-configuration-file)
- [環境変数を通じた Datadog Agent による OpenTelemetry 直接取り込み](#datadog-agent-otel-ingestion-through-environment-variables)

詳細については、[Datadog の OpenTelemetry](https://docs.datadoghq.com/opentelemetry/) を参照してください。

#### OpenTelemetry コレクター

Datadog で OpenTelemetry コレクターを構成するには:

1. 構成ファイルを作成します。例えば、以下の内容で`otel_collector_config.yaml` ファイルを作成します。

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: "0.0.0.0:4318"

processors:
  batch/datadog:
    send_batch_max_size: 1000
    send_batch_size: 100
    timeout: 10s

exporters:
  datadog:
    api:
      site: ${env:DATADOG_SITE}
      key: ${env:DATADOG_API_KEY}

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [batch/datadog]
      exporters: [datadog]
    traces:
      receivers: [otlp]
      processors: [batch/datadog]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [batch/datadog]
      exporters: [datadog]
```

2. 次のコマンドでコレクターを実行します (`DATADOG_SITE` と `DATADOG_API_KEY` は独自の値で置き換えます)。

```bash
docker run \
    -p 4318:4318 \
    -e DATADOG_SITE=$DATADOG_SITE \
    -e DATADOG_API_KEY=$DATADOG_API_KEY \
    --hostname $(hostname) \
    -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
    otel/opentelemetry-collector-contrib:0.104.0
```

3. コレクターの準備ができたら、ソースの仕様でエンドポイントを指定します。

```yaml
kind: source
spec:
  name: "aws"
  path: "cloudquery/aws"
  # AWS ソースプラグインのバージョンで置き換えます
  version: "<VERSION_SOURCE_AWS>"
  tables: ["aws_s3_buckets"]
  destinations: ["postgresql"]
  otel_endpoint: "0.0.0.0:4318"
  otel_endpoint_insecure: true
  spec:
```

コレクターを実行するその他の方法については、[OpenTelemetry のデプロイ](https://docs.datadoghq.com/opentelemetry/collector_exporter/deployment#running-the-collector)を参照してください。

#### 構成ファイルを通じた Datadog Agent による OpenTelemetry 取り込み

1. [`datadog.yaml` Agent 構成ファイル](https://docs.datadoghq.com/agent/configuration/agent-configuration-files/)を探し、次の構成を追加します。

```yaml
otlp_config:
  receiver:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
  logs:
    enabled: true
logs_enabled: true
```

2. 変更を有効にするために Datadog Agent を[再起動](https://docs.datadoghq.com/agent/configuration/agent-commands/#restart-the-agent)します。

1. Agent の準備ができたら、ソースの仕様でエンドポイントを指定します。

```yaml
kind: source
spec:
  name: "aws"
  path: "cloudquery/aws"
  # AWS ソースプラグインのバージョンで置き換えます
  version: "<VERSION_SOURCE_AWS>"
  tables: ["aws_s3_buckets"]
  destinations: ["postgresql"]
  otel_endpoint: "0.0.0.0:4318"
  otel_endpoint_insecure: true
  spec:
```

#### 環境変数を通じた Datadog Agent による OpenTelemetry 取り込み

1. Datadog Agent に環境変数 `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` を渡し、その値を `0.0.0.0:4318` とします。
   Docker Compose を使用している場合は、以下の例を参照してください。

```yaml
version: "3.0"
services:
  agent:
    image: gcr.io/datadoghq/agent:7
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
    environment:
      DD_API_KEY: redacted
      DD_SITE: "datadoghq.eu"
      DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT: "0.0.0.0:4318"
      DD_LOGS_ENABLED: "true"
      DD_OTLP_CONFIG_LOGS_ENABLED: "true"
    ports:
      - "4318:4318"
```

2. 変更を有効にするために Datadog Agent を[再起動]https://docs.datadoghq.com/agent/configuration/agent-commands/#restart-the-agent)します。

1. Agent の準備ができたら、ソースの仕様でエンドポイントを指定します。

```yaml
kind: source
spec:
  name: "aws"
  path: "cloudquery/aws"
  # AWS ソースプラグインのバージョンで置き換えます
  version: "<VERSION_SOURCE_AWS>"
  tables: ["aws_s3_buckets"]
  destinations: ["postgresql"]
  otel_endpoint: "0.0.0.0:4318"
  otel_endpoint_insecure: true
  spec:
```

Datadog Agent のその他の構成方法については、[Datadog Agent による OTLP の取り込み](https://docs.datadoghq.com/opentelemetry/interoperability/otlp_ingest_in_the_agent#enabling-otlp-ingestion-on-the-datadog-agent)を参照してください。

### 検証

`cloudquery sync spec.yml` を実行します。
取り込みが開始されると、Datadog の [**APM Traces Explorer**](https://app.datadoghq.com/apm/traces) にトレースが表示されるようになります。
また、[**Metrics Summary**](https://app.datadoghq.com/metric/summary) と [**Log Explorer**](https://app.datadoghq.com/logs) でメトリクスとログを確認できます。

## 収集データ

### メトリクス

CloudQuery には、メトリクスは含まれません。

### サービス チェック

CloudQuery には、サービスのチェック機能は含まれません。

### イベント

CloudQuery には、イベントは含まれません。

## アンインストール

OpenTelemetry コレクターを使用している場合は、`docker stop <container_id>` を実行することで停止することができます。
Datadog Agent を使用している場合は、追加した構成または環境変数を削除し、Agent を[再起動](https://docs.datadoghq.com/agent/configuration/agent-commands/#restart-the-agent) します。
最後に、Datadog アカウントからダッシュボードを削除します。

## サポート

サポートが必要な場合は、[CloudQuery](https://www.cloudquery.io/pricing) にお問い合わせください。