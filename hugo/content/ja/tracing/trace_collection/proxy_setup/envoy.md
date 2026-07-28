---
aliases:
- /ja/tracing/proxies/envoy
- /ja/tracing/envoy/
- /ja/tracing/setup/envoy/
- /ja/tracing/setup_overview/envoy/
- /ja/tracing/setup_overview/proxy_setup/
code_lang: envoy
code_lang_weight: 20
further_reading:
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
- link: https://www.envoyproxy.io/
  tag: 外部サイト
  text: Envoy Web サイト
- link: https://www.envoyproxy.io/docs/envoy/latest/api-v3/config/trace/v3/datadog.proto
  text: Envoy 用 Datadog トレーサー構成
- link: https://www.envoyproxy.io/docs/envoy/latest/
  tag: 外部サイト
  text: Envoy ドキュメント
title: Envoy のインスツルメンテーション
type: multi-code-lang
---

Datadog APM は Envoy v1.9.0 以降に含まれています。

## Datadog APM を有効にする

**注**: 以下の構成例は Envoy v1.19 用です。

Datadog APM を Envoy で使用するには、以下の設定をする必要があります。

- トレースを Datadog Agent に送信するためのクラスター
- トレースをアクティブにするための `http_connection_manager` コンフィギュレーション

1. トレースを Datadog Agent に送信するためのクラスターを追加します:

   ```yaml
    clusters:
    ... existing cluster configs ...
    - name: datadog_agent
      connect_timeout: 1s
      type: strict_dns
      lb_policy: round_robin
      load_assignment:
        cluster_name: datadog_agent
        endpoints:
        - lb_endpoints:
          - endpoint:
              address:
                socket_address:
                  address: localhost
                  port_value: 8126
   ```

   Envoy がコンテナやオーケストレーション環境で動作している場合は、`address` の値を変更します。

2. トレースを有効にするには、`http_connection_manager` セクションに以下の追加構成を含めます。

{{< highlight yaml "hl_lines=9-15" >}}
    - name: envoy.filters.network.http_connection_manager
      typed_config:
        "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
        generate_request_id: true
        request_id_extension:
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.request_id.uuid.v3.UuidRequestIdConfig
            use_request_id_for_trace_sampling: false
        tracing:
          provider:
            name: envoy.tracers.datadog
            typed_config:
              "@type": type.googleapis.com/envoy.config.trace.v3.DatadogConfig
              collector_cluster: datadog_agent
              service_name: envoy-v1.19
{{< /highlight >}}

   `collector_cluster` の値は Datadog Agent クラスターに指定した名前と一致させる必要があります。`service_name` は、Envoy の用途に合わせて意味のある値に変更できます。

このコンフィギュレーションにより、Envoy への HTTP リクエストが起動し、Datadog トレースに伝播して、リクエストが APM UI に表示されます。

## Envoy v1.19 コンフィギュレーションの例

以下の構成例では、Datadog APM を使用してトレースを有効にするために必要な項目の配置を示します。

{{< highlight yaml "hl_lines=18-24 66-78" >}}
static_resources:
  listeners:
  - address:
      socket_address:
        address: 0.0.0.0
        port_value: 80
    traffic_direction: OUTBOUND
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          generate_request_id: true
          request_id_extension:
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.request_id.uuid.v3.UuidRequestIdConfig
              use_request_id_for_trace_sampling: false
          tracing:
            provider:
              name: envoy.tracers.datadog
              typed_config:
                "@type": type.googleapis.com/envoy.config.trace.v3.DatadogConfig
                collector_cluster: datadog_agent   # 名前付きクラスターに一致させます
                service_name: envoy-v1.19          # ユーザー定義のサービス名
          codec_type: auto
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: backend
              domains:
              - "*"
              routes:
              - match:
                  prefix: "/"
                route:
                  cluster: service1
          # ヘルス チェック リクエストのトレースはサンプリングしないでください。
          http_filters:
          - name: envoy.filters.http.health_check
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.health_check.v3.HealthCheck
              pass_through_mode: false
              headers:
                - exact_match: /healthcheck
                  name: :path
          - name: envoy.filters.http.router
            typed_config: {}
          use_remote_address: true
  clusters:
  - name: service1
    connect_timeout: 0.250s
    type: strict_dns
    lb_policy: round_robin
    load_assignment:
      cluster_name: service1
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: service1
                port_value: 80
  # トレースを送信するために、このクラスターには Datadog Agent のアドレスを設定してください。
  # for sending traces.
  - name: datadog_agent
    connect_timeout: 1s
    type: strict_dns
    lb_policy: round_robin
    load_assignment:
      cluster_name: datadog_agent
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: localhost
                port_value: 8126

admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
{{< /highlight >}}

## メトリクスの除外

Envoy の `dog_statsd` コンフィギュレーションを使用してメトリクスを送信している場合、以下のコンフィギュレーションを追加することで、`datadog_agent` クラスターからのアクティビティを_除外_できます。

```yaml
stats_config:
  stats_matcher:
    exclusion_list:
      patterns:
      - prefix: "cluster.datadog_agent."
```

## Envoy サンプリング

Envoy トレースの Datadog への送信量を制御するには、パラメーター `DD_TRACE_SAMPLING_RULES` を `0.0` (0%) から `1.0` (100%) の間の値に設定し、サンプリングレートを指定してください。値を指定しない場合、Envoy から始まるトレースの 100% が送信されます。

[Datadog Agent が算出したサンプリングレート][1] (Agent ごとに 1 秒あたり 10 トレース) を使用し、100% に設定されたデフォルトのサンプリングルールを無視するには、パラメーター `DD_TRACE_SAMPLING_RULES` を空の配列に設定します。

```
DD_TRACE_SAMPLING_RULES=[]
```

また、サービスごとに `0.0` (0%) から `1.0` (100%) の間で明示的にサンプリングレートを定義することができます。例えば、サービス `envoy-proxy` のサンプリングレートを 10% に設定するには、以下のようにします。

```
DD_TRACE_SAMPLING_RULES=[{"service": "envoy-proxy","sample_rate": 0.1}]
```


`DD_TRACE_SAMPLING_RULES` でサンプリングレートを構成するには、Envoy の実行方法に応じて、以下の方法のいずれかを使用します。

- **シェルスクリプト**: スクリプトで `envoy` を実行する直前に環境変数を設定します。

  ```
  #!/bin/sh
  export DD_TRACE_SAMPLING_RULES=[]
  envoy -c envoy-config.yaml
  ```

- **Docker Compose のセットアップ**: サービス定義の `environment` セクションに環境変数を設定します。

  ```
  services:
    envoy:
      image: envoyproxy/envoy:v1.19-latest
      entrypoint: []
      command:
          - envoy
          - -c
          - /etc/envoy/envoy.yaml
      volumes:
          - './envoy.yaml:/etc/envoy/envoy.yaml:ro'
      environment:
          - DD_TRACE_SAMPLING_RULES=[]
  ```

- **Kubernetes ポッド内のコンテナとして**: ポッド仕様の対応する `containers` エントリの `env` セクションに環境変数を指定します。

  ```
  apiVersion: v1
  kind: Pod
  metadata:
    name: envoy
  spec:
    containers:
    - name: envoy
      image: envoyproxy/envoy:v1.20-latest
      env:
      - name: DD_TRACE_SAMPLING_RULES
        value: "[]"
  ```

## 環境変数

<div class="alert alert-danger">
  <strong>注:</strong> Datadog Agent のアドレスは <code>cluster</code> 設定を使用して構成されているため、変数 <code>DD_AGENT_HOST</code>、<code>DD_TRACE_AGENT_PORT</code>、<code>DD_TRACE_AGENT_URL</code> は Envoy に適用されません。
</div>

利用可能な[環境変数][2]は、Envoy に組み込まれている C++ トレーサーのバージョンに依存します。
C++ トレーサーのバージョンは、"DATADOG TRACER CONFIGURATION" で始まる行で示されるログで確認できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[2]: /ja/tracing/setup/cpp/#environment-variables