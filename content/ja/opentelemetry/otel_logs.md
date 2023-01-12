---
aliases:
- /ja/logs/log_collection/opentelemetry/
kind: documentation
title: OpenTelemetry から Datadog にログを送信する
---

<div class="alert alert-warning"><a href="https://opentelemetry.io/docs/reference/specification/logs/">OpenTelemetry のロギング</a>と Datadog Exporter の Datadog にログを送信する機能は、アルファ版です。</div>

## 概要

[OpenTelemetry][1] (OTel) は、オープンソースの観測可能性フレームワークで、IT チームにテレメトリーデータを収集しルーティングするための標準化されたプロトコルとツールを提供します。Cloud Native Computing Foundation][2] (CNCF) によってインキュベータープロジェクトとして作成された OTel は、アプリケーションテレメトリーデータ (メトリクス、ログ、トレースなど) をインスツルメント、生成、収集、エクスポートし、分析および洞察するための監視プラットフォームに対して一貫したフォーマットを提供するものです。

OpenTelemetry Collector は、あらゆるベンダーに対応するエージェントプロセスで、さまざまなプロセスにより送信されたテレメトリデータを収集、エクスポートします。Datadog には、OpenTelemetry Collector で使える [Exporter][3] があり、OpenTelemetry から Datadog にトレース、メトリクス、ログデータを転送することができます。

ログを収集する場合、Datadog は Collector の [filelog レシーバー][4]の使用を推奨しています。filelog レシーバーは、指定したログファイルを追跡します。その後、Datadog Exporter (Collector で設定) がログデータを Datadog に送信します。

{{< img src="logs/log_collection/otel_collector_logs.png" alt="データを送信するホスト、コンテナ、アプリケーション、コレクター内の filelog レシーバー、コレクター内の Datadog Exporter が Datadog バックエンドにデータを送信する様子を示した図" style="width:100%;">}}

## Collector と Datadog Exporter のセットアップ

[Collector の実行][5]と [Datadog Exporter の構成][6]を参照してください。

#### ログとトレースの相関

Datadog Exporter を使って OpenTelemetry のトレースも Datadog に送る場合、`trace_parser` 演算子を使って各トレースから `trace_id` を抽出し、それを関連するログに追加してください。Datadog は関連するログとトレースを自動的に関連付けます。詳細は [OpenTelemetry のトレースとログの接続][7]を参照してください。

{{< img src="logs/log_collection/logs_traces_correlation.png" alt="トレースと相関のあるログの一覧を表示するトレースパネル" style="width:70%;">}}

## アプリケーションに合わせたロガーの構成

OpenTelemetry SDK のロギング機能は完全にサポートされていないため (詳細は [OpenTelemetry ドキュメント][8]の各言語を参照)、Datadog ではアプリケーションに標準のロギングライブラリを使用することを推奨しています。言語固有の[ログ収集のドキュメント][9]に従って、アプリケーションに適切なロガーをセットアップしてください。Datadog は、[カスタムパースルール][10]の必要性を避けるために、JSON でログを出力するようにロギングライブラリを設定することを強く推奨しています。

## filelog レシーバーの構成

[演算子][11]を使って、filelog レシーバーを構成します。例えば、`checkoutservice` というサービスがあり、それが `/var/log/pods/services/checkout/0.log` にログを書き込んでいるとしたら、ログのサンプルは以下のようになります。

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
- `start_at: end`: 書き込まれている新しいコンテンツを読むことを示します
- `poll_internal`: ポーリング頻度を設定します
- 演算子:
    - `json_parser`: JSON ログをパースします。デフォルトでは、filelog レシーバーは各ログ行をログレコードに変換し、それがログの[データモデル][12]の `body` となります。次に、`json_parser` が JSON の本文をデータモデルの属性に変換します。
    - `trace_parser`: Datadog でログとトレースを関連付けるために、ログから `trace_id` と `span_id` を抽出します。

## Kubernetes を使用する

Kubernetes インフラクチャーに OpenTelemetry Collector と Datadog Exporter をデプロイする方法は複数存在します。filelog レシーバーを動作させるためには、[Agent/DaemonSet のデプロイメント][13]を推奨します。

コンテナ環境では、アプリケーションはログを `stdout` または `stderr` に書き込みます。Kubernetes はログを収集し、標準的な場所に書き込みます。filelog レシーバーには、ホストノード上のロケーションを Collector にマウントする必要があります。以下は、ログを送信するために必要なマウントを持つ[拡張機能例][14]です。

```
apiVersion: apps/v1
kind: DaemonSet
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
          image: otel/opentelemetry-collector-contrib:0.61.0
          env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            # k8s.pod.ip は、k8sattributes のポッドを関連付けるために使用されます
            - name: OTEL_RESOURCE_ATTRIBUTES
              value: "k8s.pod.ip=$(POD_IP)"
          ports:
            - containerPort: 4318 # OpenTelemetry HTTP レシーバーのデフォルトポート。
              hostPort: 4318
            - containerPort: 4317 # OpenTelemetry gRPC レシーバーのデフォルトポート。
              hostPort: 4317
            - containerPort: 8888 # メトリクスをクエリするためのデフォルトのエンドポイント。
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
        # マウントノードのログファイルの場所。
        - name: varlogpods
          hostPath:
            path: /var/log/pods
        - name: varlibdockercontainers
          hostPath:
            path: /var/lib/docker/containers
```

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[4]: https://opentelemetry.io/docs/reference/specification/logs/overview/#third-party-application-logs
[5]: /ja/opentelemetry/otel_collector_datadog_exporter/#running-the-collector
[6]: /ja/opentelemetry/otel_collector_datadog_exporter/#configuring-the-datadog-exporter
[7]: /ja/tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
[8]: https://opentelemetry.io/docs/instrumentation/
[9]: /ja/logs/log_collection/?tab=host
[10]: /ja/logs/log_configuration/parsing/
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/stanza/docs/operators
[12]: https://opentelemetry.io/docs/reference/specification/logs/data-model/
[13]: https://opentelemetry.io/docs/collector/deployment/#agent
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml