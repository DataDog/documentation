---
aliases:
- /ja/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /ja/tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /ja/opentelemetry/otel_collector_datadog_exporter/
- /ja/opentelemetry/collector_exporter/otel_collector_datadog_exporter
description: Datadog Exporter および Datadog Connector を使用して OpenTelemetry データを Datadog
  に送信する
further_reading:
- link: /opentelemetry/setup/collector_exporter/deploy/
  tag: ドキュメント
  text: Datadog Exporter を使用して OpenTelemetry Collector をデプロイする
- link: /opentelemetry/integrations/datadog_extension/
  tag: ドキュメント
  text: Datadog 拡張機能を有効にして Fleet Automation のコレクター設定を検査する
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: ブログ
  text: Datadog Exporter を使用して OpenTelemetry Collector から Datadog にメトリクス、トレース、ログを送信する
- link: https://www.datadoghq.com/blog/native-otel-with-datadog/
  tag: ブログ
  text: 取り込みから調査まで、Datadog で OpenTelemetry ネイティブの監視可能性を使用する
- link: https://opentelemetry.io/docs/collector/
  tag: 外部サイト
  text: Collector ドキュメント
title: Datadog Exporter と Connector を設定する
---
## 概要 {#overview}

OpenTelemetry Collector は、ベンダーに依存しない方法でアプリケーションからテレメトリデータを収集、処理、エクスポートすることを可能にします。[Datadog Exporter][1] と [Datadog Connector][29] を使って構成すると、Datadog Agent を使用せずにトレース、ログ、メトリクスを Datadog に送信できます。

<div class="alert alert-info">新しい OpenTelemetry Collector 構成の場合、Datadog は <a href="/opentelemetry/setup/collector_exporter/">OTLP HTTP エクスポーターと <code>span_metrics</code> コネクタのセットアップ</a>を推奨します。Datadog Exporter および Datadog Connector は引き続きサポートされており、既存の構成を移行する必要はありません。</div>

- **Datadog Exporter**: OpenTelemetry SDK が生成するトレース、メトリクス、ログデータを Datadog に (Datadog Agent なしで) 転送します
- **Datadog Connector**: 収集したスパンデータからトレースメトリクスを計算します

{{< img src="/opentelemetry/setup/otel-collector.png" alt="図: コード内の OpenTelemetry SDK が OpenTelemetry Collector と Datadog Exporter を実行しているホストに OTLP を介してデータを送信し、このホストは Datadog の監視可能性プラットフォームにデータを転送します。" style="width:100%;" >}}

## インストールと構成 {#install-and-configure}

### 1 - OpenTelemetry Collector をダウンロードします {#1-download-the-opentelemetry-collector}

OpenTelemetry Collector Contrib ディストリビューションの最新リリースを[プロジェクトのリポジトリ][3]からダウンロードします。

### 2 - Datadog Exporter と Datadog Connector を構成します {#2-configure-the-datadog-exporter-and-connector}

Datadog Exporter と Datadog Connector を使用するには、次の手順を実行して [OpenTelemetry Collector の設定][4]に組み込みます。

1. `collector.yaml` という名前の構成ファイルを作成します。
1. 次のサンプルファイルを使用して開始します。
1. Datadog の API キーを `DD_API_KEY` 環境変数として設定します。

{{% otel-endpoint-note %}}

<div class="alert alert-warning">AWS EKS Fargate は、現時点では OpenTelemetry Collector をサポートする環境ではありません。EKS Fargate にコレクターをデプロイすると、インフラストラクチャーホストの請求が不正確になります。</div>

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
      grpc:
        endpoint: 0.0.0.0:4317
  # The hostmetrics receiver is required to get correct infrastructure metrics in Datadog.
  hostmetrics:
    collection_interval: 10s
    scrapers:
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
      disk:
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load:
      memory:
      network:
      processes:
  # The prometheus receiver scrapes metrics needed for the OpenTelemetry Collector Dashboard.
  prometheus:
    config:
      scrape_configs:
      - job_name: 'otelcol'
        scrape_interval: 10s
        static_configs:
        - targets: ['0.0.0.0:8888']

  filelog:
    include_file_path: true
    poll_interval: 500ms
    include:
      - /var/log/**/*example*/*.log

processors:
  batch:
    send_batch_max_size: 100
    send_batch_size: 10
    timeout: 10s

connectors:
  datadog/connector:

exporters:
  datadog/exporter:
    api:
      site: {{< region-param key="dd_site" >}}
      key: ${env:DD_API_KEY}

service:
  pipelines:
    metrics:
      receivers: [hostmetrics, prometheus, otlp, datadog/connector]
      processors: [batch]
      exporters: [datadog/exporter]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/connector, datadog/exporter]
    logs:
      receivers: [otlp, filelog]
      processors: [batch]
      exporters: [datadog/exporter]
```

この基本的な設定では、HTTP および gRPC 経由で OTLP データを受信できるようになり、[バッチプロセッサー][5]が設定されます。

Datadog Exporter の構成オプションの完全なリストについては、[完全にドキュメント化されたサンプル構成ファイル][8]を参照してください。デプロイメントによっては、`api::site` や `host_metadata` の設定などの追加オプションが関連する場合があります。

#### バッチプロセッサーの構成 {#batch-processor-configuration}

バッチプロセッサーは、開発環境以外の環境では必須です。詳細な構成は、対象のワークロードと信号タイプによって異なります。

次に示す Datadog のインテーク上限に合わせてバッチプロセッサーを構成してください。

- トレースインテーク: 3.2MB
- ログインテーク: [5MB 非圧縮][6]
- メトリクス V2 インテーク: [500KB または解凍後 5MB][7]

バッチプロセッサーでテレメトリデータをまとめすぎると、`413 - Request Entity Too Large` エラーが発生することがあります。

### 3 - アプリケーションを構成する {#3-configure-your-application}

トレースのメタデータを充実させ、Datadog とのインテグレーションを円滑に行うには、次の手順を実行します。

- **リソース検出システムを使用する**: 言語 SDK によって提供されている場合、コンテナ情報をリソース属性としてアタッチします。たとえば、Go では、[`WithContainer()`][9] リソースオプションを使用します。

- **[Unified Service Tagging][10] を適用する**: Unified Service Tagging のために、適切なリソース属性でアプリケーションを設定していることを確認してください。これにより、サービス名、デプロイ環境、サービスバージョンのタグと Datadog テレメトリが結び付きます。アプリケーションは、OpenTelemetry のセマンティック規約である `service.name`、`deployment.environment.name`、`service.version` を使用してこれらのタグを設定する必要があります。

### 4 - アプリケーションのロガーを構成する {#4-configure-the-logger-for-your-application}

{{< img src="logs/log_collection/otel_collector_logs.png" alt="ホスト、コンテナ、またはアプリケーションがコレクター内の filelog レシーバーにデータを送信し、コレクター内の Datadog Exporter が Datadog バックエンドにデータを送信する様子を示した図" style="width:100%;">}}

OpenTelemetry SDK のロギング機能は完全にはサポートされていないため (詳細はご自分の言語の [OpenTelemetry ドキュメント][11]を参照)、Datadog はアプリケーションに標準のロギングライブラリを使用することを推奨します。言語固有の[ログ収集ドキュメント][12]に従って、アプリケーションに適切なロガーを設定してください。Datadog は、[カスタムのパースルール][13]を作成する必要がないようにするために、ログを JSON 形式で出力するようにロギングライブラリをセットアップすることを強くお勧めします。

#### filelog レシーバーを構成する {#configure-the-filelog-receiver}

[演算子][14]を使用して filelog レシーバーを構成します。たとえば、`checkoutservice` というサービスが `/var/log/pods/services/checkout/0.log` にログを書き込んでいる場合、サンプルログは次のようになります。

```
{"level":"info","message":"order confirmation email sent to \"jack@example.com\"","service":"checkoutservice","span_id":"197492ff2b4e1c65","timestamp":"2022-10-10T22:17:14.841359661Z","trace_id":"e12c408e028299900d48a9dd29b0dc4c"}
```

filelog の構成例

```
filelog:
   include:
     - /var/log/pods/**/*checkout*/*.log
   start_at: end
   poll_interval: 500ms
   operators:
     - id: parse_log
       type: json_parser
       parse_from: body
     - id: trace
       type: trace_parser
       trace_id:
         parse_from: attributes.trace_id
       span_id:
         parse_from: attributes.span_id
   attributes:
     ddtags: env:staging
```

- `include`: レシーバーが追跡するファイルのリスト
- `start_at: end`: 新しく書き込まれたコンテンツを読み取るための信号
- `poll_internal`: ポーリング頻度を設定
- 演算子:
    - `json_parser`: JSON ログを解析します。デフォルトでは、filelog レシーバーは各ログ行をログレコードに変換します。これはログの[データモデル][15]の `body` です。次に、`json_parser` は JSON 本文をデータモデルの属性に変換します。
    - `trace_parser`: Datadog でログとトレースを相関させるために、ログから `trace_id` と `span_id` を抽出します。

#### OTel の `service.name` 属性をログの `service` にマップし直す {#remap-otels-servicename-attribute-to-service-for-logs}

Datadog エクスポーターのバージョン 0.83.0 以降の場合、OTel ログの `service` フィールドは [OTel のセマンティック規約][25]である `service.name` に基づいて設定されます。ただし、`service.name` は Datadog のログ前処理におけるデフォルトの[サービス属性][26]の 1 つではありません。

ログの `service` フィールドを正しく設定するため、[log service remapper プロセッサー][27]を設定して、`service.name` をログのサービスの取り込み元として指定することができます。

{{% collapse-content title="オプション: Kubernetes を使用する" level="h4" %}}

<div class="alert alert-warning">AWS EKS Fargate は、現時点では OpenTelemetry Collector をサポートする環境ではありません。EKS Fargate にコレクターをデプロイすると、インフラストラクチャーホストの請求が不正確になります。</div>

Kubernetes インフラストラクチャーに OpenTelemetry Collector と Datadog Exporter をデプロイする方法はいくつかあります。filelog レシーバーが機能するためには、[Agent/DaemonSet としてデプロイする][16]方法が推奨されます。

コンテナ化された環境では、アプリケーションはログを `stdout` または `stderr` に書き込みます。Kubernetes はログを収集し、標準の場所に書き込みます。filelog レシーバーのために、ホストノードの場所をコレクターにマウントする必要があります。以下は、ログを送信するために必要なマウント設定を追加した[拡張例][17]です。

```
apiVersion: apps/v1
metadata:
  name: otel-agent
  labels:
    app: opentelemetry
    component: otel-collector
spec:
  template:
    metadata:
      labels:
        app: opentelemetry
        component: otel-collector
    spec:
      containers:
        - name: collector
          command:
            - "/otelcol-contrib"
            - "--config=/conf/otel-agent-config.yaml"
          image: otel/opentelemetry-collector-contrib:0.154.0
          env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            # The k8s.pod.ip is used to associate pods for k8sattributes
            - name: OTEL_RESOURCE_ATTRIBUTES
              value: "k8s.pod.ip=$(POD_IP)"
          ports:
            - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
              hostPort: 4318
            - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
              hostPort: 4317
            - containerPort: 8888 # Default endpoint for querying metrics.
          volumeMounts:
            - name: otel-agent-config-vol
              mountPath: /conf
            - name: varlogpods
              mountPath: /var/log/pods
              readOnly: true
            - name: varlibdockercontainers
              mountPath: /var/lib/docker/containers
              readOnly: true
      volumes:
        - name: otel-agent-config-vol
          configMap:
            name: otel-agent-conf
            items:
              - key: otel-agent-config
                path: otel-agent-config.yaml
        # Mount nodes log file location.
        - name: varlogpods
          hostPath:
            path: /var/log/pods
        - name: varlibdockercontainers
          hostPath:
            path: /var/lib/docker/containers
```

{{% /collapse-content %}}

## Datadog Exporter の例 {#datadog-exporter-examples}

OpenTelemetry Collector Contrib リポジトリには、一般的な構成タスクのための実行可能な Datadog Exporter のサンプルが用意されています。以下のリンクは、例が予期せず変更されることがないように、バージョン v0.154.0 に固定されています。

- [完全な Collector 構成][8]
- [ホストのメトリクス][34]
- [Docker のメトリクス][35]
- [Kafka のメトリクス][36]
- [ログ収集][37]
- [バッチおよびメモリ制限][38]
- [EC2 のすぐに使える構成][30]

別の Collector バージョンを使用している場合は、そのリリースに含まれる例を参照してください。コンテナ化されたアプリケーションについては、[デプロイメントのドキュメント][33]を参照してください。

以下の各コンポーネントをニーズに合わせて構成してください。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/config/otlp_receiver/" >}}OTLP レシーバー{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/hostname_tagging/" >}}ホスト名とタグ付け{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/collector_batch_memory/" >}}コレクターのメモリ制限{{< /nextlink >}}
{{< /whatsnext >}}

## Fleet Automation でコレクター設定を検証する {#validate-your-collector-configurations-in-fleet-automation}

Datadog 拡張機能を有効にして、Fleet Automation で OpenTelemetry Collector 構成を検査およびトラブルシューティングします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: /ja/api/latest/logs/
[7]: /ja/api/latest/metrics/#submit-metrics
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/collector.yaml
[9]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainer
[10]: /ja/getting_started/tagging/unified_service_tagging/
[11]: https://opentelemetry.io/docs/instrumentation/
[12]: /ja/logs/log_collection/?tab=host
[13]: /ja/logs/log_configuration/parsing/
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/stanza/docs/operators
[15]: https://opentelemetry.io/docs/reference/specification/logs/data-model/
[16]: https://opentelemetry.io/docs/collector/deployment/#agent
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml
[25]: https://opentelemetry.io/docs/specs/semconv/resource/#service
[26]: /ja/logs/log_configuration/pipelines/?tab=service#service-attribute
[27]: /ja/logs/log_configuration/processors/service_remapper/
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/ootb-ec2.yaml
[33]: /ja/opentelemetry/setup/collector_exporter/deploy/
[34]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/host-metrics.yaml
[35]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/docker-stats.yaml
[36]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/kafka.yaml
[37]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/logs.yaml
[38]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/batch-memory.yaml