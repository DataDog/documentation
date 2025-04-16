---
aliases:
- /ja/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /ja/tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /ja/opentelemetry/otel_collector_datadog_exporter/
- /ja/opentelemetry/collector_exporter/
- /ja/opentelemetry/collector_exporter/otel_collector_datadog_exporter
description: OpenTelemetry のデータを OpenTelemetry Collector と Datadog Exporter に送信する
further_reading:
- link: tracing/glossary/
  tag: 外部サイト
  text: Collectorドキュメント
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: ブログ
  text: OpenTelemetry コレクターを使用して Datadog エクスポーター経由で Datadog にメトリクス、トレース、ログを送信する
title: OpenTelemetry Collector をセットアップする
---

## 概要

OpenTelemetry Collector を使用すると、アプリケーションからのテレメトリーデータをベンダーに依存しない方法で収集、処理、エクスポートできます。[Datadog Exporter][1] と [Datadog Connector][29] を設定すると、Datadog Agent を使用せずにトレース、ログ、およびメトリクスを Datadog に送信できます。

- **Datadog Exporter**: OpenTelemetry SDK が生成するトレース、メトリクス、ログデータを Datadog (Datadog Agent 不要) に転送する
- **Datadog Connector**: 収集したスパンデータからトレースメトリクスを計算する

{{< img src="/opentelemetry/setup/otel-collector.png" alt="図: コード内の OpenTelemetry SDK が OTLP を通じてデータを、Datadog Exporter を組み込んだ OpenTelemetry Collector が稼働するホストへ送信し、さらに Datadog の Observability Platform へ転送する様子を示す図。" style="width:100%;" >}}

<div class="alert alert-info">このセットアップでサポートされる Datadog 機能を確認するには、<a href="/opentelemetry/compatibility/">機能の互換性テーブル</a>の <b>Full OTel</b> を参照してください。</div> 

## インストールと設定 

### 1 - OpenTelemetry Collector をダウンロードする 

OpenTelemetry Collector Contribute の最新リリースを[プロジェクトのリポジトリ][3]からダウンロードします。

### 2 - Datadog Exporter と Connector を設定する 

Datadog Exporter と Datadog Connector を使用するには、[OpenTelemetry Collector の設定][4]に組み込みます。 

1. `collector.yaml` という名前の設定ファイルを作成します。 
1. 次のサンプルファイルを使用して始めることができます。 
1. Datadog の API キーを `DD_API_KEY` 環境変数として設定してください。 

{{% otel-endpoint-note %}}

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
      grpc:
        endpoint: 0.0.0.0:4317
  # Datadogで正確なインフラストラクチャメトリクスを取得するには、hostmetrics レシーバーが必要です。
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
  # prometheus レシーバーは、OpenTelemetry Collector ダッシュボードに必要なメトリクスをスクレイプします。
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

この基本的な設定では、HTTP および gRPC 経由で OTLP データを受信できるようになり、[バッチプロセッサ][5]が設定されます。

Datadog Exporter の設定オプションの完全なリストについては、[ドキュメント化されたサンプル設定ファイル][8]を参照してください。デプロイ方法によっては、`api::site` や `host_metadata` といった追加オプションが必要になる場合があります。

#### バッチプロセッサの設定

本番環境 (開発環境以外) では、バッチプロセッサが必要です。具体的な設定はワークロードや扱うシグナルタイプによって異なります。

Datadog のインテーク上限に合わせてバッチプロセッサを設定してください:

- トレースインテーク: 3.2MB
- ログインテーク: [5MB 非圧縮][6]
- メトリクス V2 インテーク: [500KB または解凍後 5MB][7]

バッチプロセッサでまとめるテレメトリーデータが多すぎる場合、`413 - Request Entity Too Large` エラーが発生することがあります。

### 3 - アプリケーションを設定する

トレースのメタデータを充実させ、Datadog とのインテグレーションを円滑に行うには

- **リソース検出システム**を使用する: 言語 SDK で提供されている場合、コンテナ情報をリソース属性としてアタッチします。例えば、Go の場合、[`WithContainer()`][9] リソースオプションを使用します。

- **[統合サービスタグ付け][10]**を適用する: 統合サービスタグ付けに適切なリソース属性をアプリケーションに構成していることを確認してください。これは、Datadog のテレメトリーを、サービス名、デプロイ環境、サービスバージョンなどのタグで結びつけます。アプリケーションはこれらのタグを OpenTelemetry のセマンティック規則 (`service.name`、`deployment.environment`、`service.version`) を使用して設定する必要があります。

### 4 - アプリケーションのロガーを設定する

{{< img src="logs/log_collection/otel_collector_logs.png" alt="コレクター内の filelog レシーバーにデータを送信するホスト、コンテナ、アプリケーション、コレクター内の Datadog Exporter が Datadog バックエンドにデータを送信する様子を示した図" style="width:100%;">}}

OpenTelemetry SDK のログ機能はまだ完全にはサポートされていません (詳細は [OpenTelemetry のドキュメント][11]でご利用の言語の項目を参照) 。Datadog では、アプリケーション用の標準的なロギングライブラリの使用を推奨しています。言語別の[ログ収集ドキュメント][12]に従い、アプリケーションに適切なロガーを設定してください。Datadog では、[カスタムパーシングルール][13]を回避するため、ロギングライブラリを JSON 出力するように強く推奨しています。

#### filelog レシーバーの構成

[演算子][14]を使って、filelog レシーバーを構成します。例えば、`checkoutservice` というサービスがあり、それが `/var/log/pods/services/checkout/0.log` にログを書き込んでいるとしたら、ログのサンプルは以下のようになります。

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
- `start_at: end`: 追記された新しいログを読み込む指定
- `poll_internal`: ポーリングの頻度
- 演算子:
    - `json_parser`: JSON ログをパースします。デフォルトでは、filelog レシーバーは各ログ行をログレコードに変換し、それがログの[データモデル][15]の `body` となります。次に、`json_parser` が JSON の本文をデータモデルの属性に変換します。
    - `trace_parser`: ログから `trace_id` と `span_id` を抽出し、Datadog 内でログとトレースを関連付ける。

#### OTel の `service.name` 属性をログの `service` に再マップする

Datadog Exporter バージョン 0.83.0 以降では、OTel ログの `service` フィールドは [OTel のセマンティック規約][25]である `service.name` を参照しています。ただし `service.name` は Datadog のログ前処理で使われる[サービス属性][26]のデフォルト項目には含まれていません。

ログの `service` フィールドを正しく反映させるためには、[log service remapper プロセッサ][27]を設定し、`service.name` をログの service 取り込み元として指定することができます。

{{% collapse-content title="オプション: Kubernetes を使用する" level="h4" %}}

Kubernetes インフラクチャーに OpenTelemetry Collector と Datadog Exporter をデプロイする方法は複数存在します。filelog レシーバーを動作させるためには、[Agent/DaemonSet のデプロイメント][16]を推奨します。

コンテナ化された環境では、アプリケーションは通常 `stdout` や `stderr` にログを書き出し、Kubernetes がそれを標準的なパスに出力します。そのため、filelog レシーバーでそれらを取り込むには、ホストノード上のディレクトリを Collector にマウントする必要があります。下記はログ送信に必要なマウントを含む[拡張設定例][17]です。

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
          image: otel/opentelemetry-collector-contrib:0.71.0
          env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            # k8s.pod.ip は k8sattributes でポッドを関連付けるために使用されます
            - name: OTEL_RESOURCE_ATTRIBUTES
              value: "k8s.pod.ip=$(POD_IP)"
          ports:
            - containerPort: 4318 # OpenTelemetry HTTP レシーバーのデフォルトポート
              hostPort: 4318
            - containerPort: 4317 # OpenTelemetry gRPC レシーバーのデフォルトポート
              hostPort: 4317
            - containerPort: 8888 # メトリクス取得用のデフォルトエンドポイント
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
        # ノード上のログファイルディレクトリをマウント
        - name: varlogpods
          hostPath:
            path: /var/log/pods
        - name: varlibdockercontainers
          hostPath:
            path: /var/lib/docker/containers
```

{{% /collapse-content %}}

## すぐに使える Datadog Exporter の構成

OpenTelemetry Collector Contrib プロジェクトの [`exporter/datadogexporter/examples` フォルダー][31]には、Datadog Exporter の標準的な設定例が掲載されています。完全な設定例としては [`ootb-ec2.yaml`][30] を参照してください。それぞれのコンポーネントを環境に合わせて設定してください。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/collector_exporter/otlp_receiver/" >}}OTLP Receiver{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/hostname_tagging/" >}}ホスト名とタグ{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/collector_batch_memory/" >}}バッチとメモリ設定{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: /ja/api/latest/logs/
[7]: /ja/api/latest/metrics/#submit-metrics
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[9]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainer
[10]: /ja/getting_started/tagging/unified_service_tagging/
[11]: https://opentelemetry.io/docs/instrumentation/
[12]: /ja/logs/log_collection/?tab=host
[13]: /ja/logs/log_configuration/parsing/
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/stanza/docs/operators
[15]: https://opentelemetry.io/docs/reference/specification/logs/data-model/
[16]: https://opentelemetry.io/docs/collector/deployment/#agent
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml
[25]: https://opentelemetry.io/docs/specs/semconv/resource/#service
[26]: /ja/logs/log_configuration/pipelines/?tab=service#service-attribute
[27]: /ja/logs/log_configuration/processors/?tab=ui#service-remapper
[28]: /ja/opentelemetry/schema_semantics/hostname/
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[31]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/
[32]: /ja/opentelemetry/compatibility/