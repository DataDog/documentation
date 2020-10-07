---
title: Envoy
kind: documentation
further_reading:
  - link: /tracing/visualization/
    tag: APM の UI を利用する
    text: サービス、リソース、トレースを調査する
  - link: 'https://www.envoyproxy.io/'
    tag: Documentation
    text: Envoy Web サイト
  - link: 'https://www.envoyproxy.io/docs/envoy/latest/'
    tag: Documentation
    text: Envoy ドキュメント
  - link: 'https://github.com/DataDog/dd-opentracing-cpp'
    tag: ソースコード
    text: Datadog OpenTracing C++ クライアント
aliases:
  - /ja/tracing/proxies/envoy
  - /ja/tracing/envoy/
---
Datadog APM は Envoy v1.9.0 以降に含まれています。

## Datadog APM を有効にする

**注**: 以下のコンフィギュレーション例は、Envoy v1.14 用です。
古いバージョンのコンフィギュレーション例は[こちら][1]にあります。

Datadog APM を Envoy で使用するには、以下の 3 つを設定する必要があります。

- トレースを Datadog Agent に送信するためのクラスター
- Datadog APM 拡張機能を有効にするための `tracing` コンフィギュレーション
- トレースをアクティブにするための `http_connection_manager` コンフィギュレーション

トレースを Datadog Agent に送信するために、クラスターを追加する必要があります。

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

Envoy がコンテナまたはオーケストレーション環境で稼働している場合は、`address` 値の変更が必要になる場合もあります。

Envoy の `tracing` コンフィギュレーションが Datadog APM 拡張機能を使用するように設定する必要があります。

```yaml
tracing:
  http:
    name: envoy.tracers.datadog
    typed_config:
      "@type": type.googleapis.com/envoy.config.trace.v2.DatadogConfig
      collector_cluster: datadog_agent   # 名前付きクラスターと照合
      service_name: envoy-example        # ユーザー定義のサービス名
```

`collector_cluster` の値は、Datadog Agent クラスターに付けられた名前と一致している必要があります。
`service_name` は、Envoy の使用を表す別の値に変えることもできます。

最後に、`http_connection_manager` セクションに、トレースを有効にするためのコンフィギュレーションを追加する必要があります。

```yaml
      - name: envoy.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.config.filter.network.http_connection_manager.v2.HttpConnectionManager
          tracing: {}
```

このコンフィギュレーションが完了すると、Envoy への HTTP リクエストが起動し、Datadog トレースに伝播して、リクエストが APM UI に表示されます。

## Envoy コンフィギュレーションの例 (Envoy v1.14 用)

Datadog APM を使用してトレースを実行するために必要な各項目の配置を示すために、コンフィギュレーションの例を紹介します。

```yaml
static_resources:
  listeners:
  - address:
      socket_address:
        address: 0.0.0.0
        port_value: 80
    traffic_direction: OUTBOUND
    filter_chains:
    - filters:
      - name: envoy.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.config.filter.network.http_connection_manager.v2.HttpConnectionManager
          generate_request_id: true
          tracing: {}
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
          http_filters:
          # ヘルスチェックリクエストのトレースはサンプリングしないでください。
          - name: envoy.filters.http.health_check
            typed_config:
              "@type": type.googleapis.com/envoy.config.filter.http.health_check.v2.HealthCheck
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
    http2_protocol_options: {}
    load_assignment:
      cluster_name: service1
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: service1
                port_value: 80
  # トレースを送信するための datadog Agent のアドレスを使用して、
  # このクラスターを構成します。
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

tracing:
  # datadog トレーサーを使用します
  http:
    name: envoy.tracers.datadog
    typed_config:
      "@type": type.googleapis.com/envoy.config.trace.v2.DatadogConfig
      collector_cluster: datadog_agent   # 名前付きクラスターと照合
      service_name: envoy-example        # ユーザー定義のサービス名

admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
```

## メトリクスの除外

Envoy の `dog_statsd` コンフィギュレーションを使用してメトリクスを送信している場合、以下のコンフィギュレーションを追加することで、`datadog_agent` クラスターからのアクティビティを_除外_できます。

```yaml
stats_config:
  stats_matcher:
    exclusion_list:
      patterns:
      - prefix: "cluster.datadog_agent."
```

## 環境変数

利用可能な[環境変数][2]は、Envoy に埋め込まれた C++ トレーサーのバージョンによって異なります。

**注**: Datadog Agent のアドレスは `cluster` 設定を使用して構成されているため、変数 `DD_AGENT_HOST`、`DD_TRACE_AGENT_PORT`、`DD_TRACE_AGENT_URL` は  Envoy に適用されません。

| Envoy バージョン | C++ トレーサーバージョン |
|---------------|--------------------|
| v1.14 | v1.1.3 |
| v1.13 | v1.1.1 |
| v1.12 | v1.1.1 |
| v1.11 | v0.4.2 |
| v1.10 | v0.4.2 |
| v1.9 | v0.3.6 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-opentracing-cpp/tree/master/examples/envoy-tracing
[2]: /ja/tracing/setup/cpp/#environment-variables