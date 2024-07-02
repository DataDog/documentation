---
title: Tracing a Proxy
kind: documentation
further_reading:
- link: /tracing/glossary/
  tag: ドキュメント
  text: Explore your services, resources and traces
- link: "https://www.envoyproxy.io/"
  tag: 外部サイト
  text: Envoy website
- link: "https://www.envoyproxy.io/docs/envoy/latest/"
  tag: 外部サイト
  text: Envoy documentation
- link: "https://www.nginx.com/"
  tag: 外部サイト
  text: NGINX website
- link: "https://istio.io/"
  tag: 外部サイト
  text: Istio website
- link: "https://istio.io/docs/"
  tag: 外部サイト
  text: Istio documentation
- link: "https://docs.konghq.com/gateway/latest/"
  tag: 外部サイト
  text: Kong website
- link: "https://github.com/DataDog/dd-trace-cpp"
  tag: Source Code
  text: Datadog C++ Client
- link: "https://github.com/DataDog/kong-plugin-ddtrace/"
  tag: Source Code
  text: Datadog APM Plugin for Kong
- link: "https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentelemetry/"
  tag: 外部サイト
  text: OpenTelemetry for Ingress-NGINX Controller
- link: "https://github.com/DataDog/httpd-datadog"
  tag: ソースコード
  text: Datadog Module for Apache HTTP Server
aliases:
- /tracing/proxies/envoy
- /tracing/envoy/
- /tracing/proxies/nginx
- /tracing/nginx/
- /tracing/istio/
- /tracing/setup/envoy/
- /tracing/setup/nginx/
- /tracing/setup/istio/
- /tracing/proxies
- /tracing/setup_overview/envoy/
- /tracing/setup_overview/nginx/
- /tracing/setup_overview/istio/
- /tracing/setup_overview/httpd/
- /tracing/setup_overview/proxy_setup/
algolia:
  tags: [proxies,tracing proxies,proxy]
---

プロキシに関するトレース情報の収集を含めるよう、トレースを設定することができます。

{{< tabs >}}
{{% tab "Envoy" %}}

Datadog APM は Envoy v1.9.0 以降に含まれています。

## Datadog APM を有効にする

**Note**: The example configuration below is for Envoy v1.19.

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

   ```yaml
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
   ```
   `collector_cluster` の値は、Datadog Agent クラスターに付けられた名前と一致している必要があります。`service_name` は、Envoy の使用を表す別の値に変えることもできます。

このコンフィギュレーションにより、Envoy への HTTP リクエストが起動し、Datadog トレースに伝播して、リクエストが APM UI に表示されます。

## Envoy v1.19 コンフィギュレーションの例

以下の構成例では、Datadog APM を使用してトレースを有効にするために必要な項目の配置を示します。

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
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          generate_request_id: true
          request_id_extension:
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.request_id.uuid.v3.UuidRequestIdConfig
              use_request_id_for_trace_sampling: false
          tracing:
          # Datadog トレーサーを使用します
            provider:
              name: envoy.tracers.datadog
              typed_config:
                "@type": type.googleapis.com/envoy.config.trace.v3.DatadogConfig
                collector_cluster: datadog_agent   # 指定されたクラスターと一致
                service_name: envoy-v1.19          # ユーザー定義サービス名
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
          # ヘルスチェックのリクエストのトレースはサンプリングされるべきではありません。
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
  # トレースを送信するための Datadog Agent のアドレスで
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

## Envoy サンプリング

Envoy トレースの Datadog への送信量を制御するには、パラメーター `DD_TRACE_SAMPLING_RULES` を `0.0` (0%) から `1.0` (100%) の間の値に設定し、サンプリングレートを指定してください。値を指定しない場合、Envoy から始まるトレースの 100% が送信されます。

To use the [Datadog Agent calculated sampling rates][1] (10 traces per second per Agent) and ignore the default sampling rule set to 100%, set the parameter `DD_TRACE_SAMPLING_RULES` to an empty array:

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

<div class="alert alert-warning">
  <strong>Note:</strong> The variables <code>DD_AGENT_HOST</code>, <code>DD_TRACE_AGENT_PORT</code> and <code>DD_TRACE_AGENT_URL</code> do not apply to Envoy, as the address of the Datadog Agent is configured using the <code>cluster</code> settings.
</div>

The available [environment variables][2] depend on the version of the C++ tracer embedded in Envoy.
The version of the C++ tracer can be found in the logs, indicated by the line starting with "DATADOG TRACER CONFIGURATION".

[1]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[2]: /tracing/setup/cpp/#environment-variables
{{% /tab %}}
{{% tab "NGINX" %}}

Datadog APM は、2 つの構成で NGINX をサポートしています。
- Datadog モジュールによって提供されるトレースで、プロキシとして動作する NGINX。
- Kubernetes の Ingress コントローラーとしての NGINX。

## NGINX と Datadog モジュールの組み合わせ
Datadog は分散型トレーシングのために NGINX モジュールを提供しています。

### モジュールのインストール
To install the Datadog NGINX module, follow these instructions:
1. Download the appropriate version from the [latest nginx-datadog GitHub release][1]
2. Choose the tarball corresponding to the specific NGINX version and CPU architecture.

Each release includes two tarballs per combination of NGINX version and CPU architecture.
The main tarball contains a single file, `ngx_http_datadog_module.so`, which is the Datadog NGINX module. The second one is debug symbols, it is optional.

For simplicity, the following script downloads only the module for the latest release:

```bash
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}

get_architecture() {
  case "$(uname -m)" in
    aarch64)
      echo "arm64"
      ;;
    arm64)
      echo "arm64"
      ;;
    x86_64)
      echo "amd64"
      ;;
    amd64)
      echo "amd64"
      ;;
    *)
      echo ""
      ;;
  esac
}

ARCH=$(get_architecture)

if [ -z "$ARCH" ]; then
    echo 1>&2 "ERROR: Architecture $(uname -m) is not supported."
    exit 1
fi

NGINX_VERSION="1.26.0"
RELEASE_TAG=$(get_latest_release DataDog/nginx-datadog)
TARBALL="ngx_http_datadog_module-${ARCH}-${NGINX_VERSION}.so.tgz"

curl -Lo ${TARBALL} "https://github.com/DataDog/nginx-datadog/releases/download/${RELEASE_TAG}/${TARBALL}"
```

Extract the `ngx_http_datadog_module.so` file from the downloaded tarball using `tar` and place it in the NGINX modules directory, typically locaated at `/usr/lib/nginx/modules`.

### NGINX 構成と Datadog モジュールの組み合わせ
NGINX 構成の一番上のセクションで、Datadog モジュールをロードします。

```nginx
load_module modules/ngx_http_datadog_module.so;
```

The default configuration connects to a local Datadog Agent and produces traces
for all NGINX locations. Specify custom configuration using the dedicated
`datadog_*` directives described in the Datadog module's [API documentation][4].

例えば、以下の NGINX の構成では、サービス名を `usage-internal-nginx` に、サンプリング量を 10% に設定しています。

```nginx
load_module modules/ngx_http_datadog_module.so;

http {
  datadog_service_name usage-internal-nginx;
  datadog_sample_rate 0.1;

  # サーバー、ロケーション...
}
```

## Ingress-NGINX Controller for Kubernetes

### Controller v1.10.0+

<div class="alert alert-warning">
  <strong>Important Note:</strong> With the release of <b>v1.10.0</b>, the Ingress controller's OpenTracing and Datadog integration have been deprecated. As an alternative, the OpenTelemetry integration is recommended.<br><br>
  For older versions, see the <a href="#controller-v190-and-older">OpenTracing-based instructions</a>.
</div>

**1. Prepare the Datadog Agent:** Ensure that your Datadog Agent has [gRPC OTLP Ingestion enabled][5] to act as an OpenTelemetry Collector.

**2. Configure the Ingress controller:** To begin, verify that your Ingress controller's pod spec has the `HOST_IP` environment variable set. If not, add the following entry to the `env` block within the pod's specification:
```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
- name: OTEL_EXPORTER_OTLP_ENDPOINT
  value: "http://$(HOST_IP):4318"
```

Next, enable OpenTelemetry instrumentation for the controller. Create or edit a ConfigMap with the following details:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx
data:
  enable-opentelemetry: "true"
  otel-sampler: AlwaysOn
  # Defaults
  # otel-service-name: "nginx"
  # otel-sampler-ratio: 0.01
```

### Controller v1.9.0 and older
To enable Datadog tracing, create or edit a ConfigMap to set `enable-opentracing: "true"` and the `datadog-collector-host` to which traces should be sent.
The name of the ConfigMap is cited explicitly by the Ingress-NGINX Controller container's command line argument, defaulting to `--configmap=<POD_NAMESPACE>/nginx-configuration`.
If `ingress-nginx` was installed via Helm chart, the ConfigMap's name will follow the pattern `<RELEASE_NAME>-nginx-ingress-controller`.

The Ingress controller manages both the `nginx.conf` and `/etc/nginx/opentracing.json` files. Tracing is enabled for all `location` blocks.

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: nginx-configuration
  namespace: ingress-nginx
  labels:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
data:
  enable-opentracing: "true"
  datadog-collector-host: $HOST_IP
  # Defaults
  # datadog-service-name: "nginx"
  # datadog-collector-port: "8126"
  # datadog-operation-name-override: "nginx.handle"
  # datadog-sample-rate: "1.0"
```

Additionally, ensure that your controller's pod spec has the `HOST_IP` environment variable set. Add this entry to the `env:` block that contains the environment variables `POD_NAME` and `POD_NAMESPACE`.

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
```

アノテーションを使用して Ingress ごとに異なるサービス名を設定するには

```yaml
  nginx.ingress.kubernetes.io/configuration-snippet: |
      opentracing_tag "service.name" "custom-service-name";
```
上記はデフォルトの `nginx-ingress-controller.ingress-nginx` サービス名をオーバーライドします。

[1]: https://github.com/DataDog/nginx-datadog/releases/latest
[2]: https://hub.docker.com/layers/library/nginx/1.23.2-alpine/images/sha256-0f2ab24c6aba5d96fcf6e7a736333f26dca1acf5fa8def4c276f6efc7d56251f?context=explore
[3]: https://hub.docker.com/layers/library/amazonlinux/2.0.20230119.1/images/sha256-db0bf55c548efbbb167c60ced2eb0ca60769de293667d18b92c0c089b8038279?context=explore
[4]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[5]: /opentelemetry/otlp_ingest_in_the_agent/
{{% /tab %}}

{{% tab "Istio" %}}

Datadog は、Istio 環境のあらゆる側面を監視するため、以下を実現できます。
- APM でメッシュを実行してアプリケーションの個々の分散型トレースを表示 (以下を参照)。
- [ログ][1]を使用して、Envoy および Istio の Control Plane の健全性を評価。
- リクエスト、帯域幅、リソース消費の[メトリクス][1]でサービスメッシュのパフォーマンスを詳しく確認。
- [ネットワークパフォーマンスモニタリング][2]で、コンテナ、ポッド、サービス間のネットワークコミュニケーションをメッシュ状にマッピング。

Istio 環境での Datadog の使用について、詳細は [Istio のブログをご参照ください][3]。

Datadog APM は、[対応する Istio のリリース][13]で利用できます。

## Datadog Agent のインストール

1. [Agent のインストール][4]
2. [Agent に APM が有効になっていることを確認します][5]。
3. `hostPort` 設定のコメントを解除し、Istio のサイドカーが Agent に接続してトレースを送信できるようにします。


## Istio のコンフィギュレーションとインストール

Datadog APM を有効にするには、[Istio をカスタムインストール][6]して、Istio のインストール時に 2 つの追加オプションを設定する必要があります。

- `--set values.global.proxy.tracer=datadog`
- `--set values.pilot.traceSampling=100.0`

```shell
istioctl manifest apply --set values.global.proxy.tracer=datadog --set values.pilot.traceSampling=100.0
```

ポッドのネームスペースでサイドカーインジェクションが有効化されると、トレースが生成されます。これを行うには `istio-injection=enabled` ラベルを追加する必要があります。

```shell
kubectl label namespace example-ns istio-injection=enabled
```

Istio で、トラフィックが HTTP ベースのプロトコルを使用していることが判断できると、トレースが生成されます。
デフォルトで、Istio は自動的にこれを検出します。アプリケーションのデプロイメントおよびサービスでポートに名前を付けることで、手動で構成することも可能です。詳細は、Istio のドキュメントの[プロトコルの選択][7]をご確認ください。

デフォルトの場合、トレース作成時に用いられるサービス名はデプロイ名とネームスペースをもとに生成されます。これは
デプロイのポッドテンプレートに `app` ラベルを追加することで手動で設定できます。

```yaml
template:
  metadata:
    labels:
      app: <SERVICE_NAME>
```

[CronJobs][8] の場合、生成された名前がより高レベルの `CronJob` ではなく `Job` から来る場合があるため、`app` ラベルをジョブテンプレートに追加する必要があります

## Istio サンプリング

Datadog に送信される Istio トレースの量を制御するには、`"sample_rate"` を `0.0` (0%) から `1.0` (100%) の間の値に設定したサンプリングルールを構成します。サンプリングルールの構成は、環境変数 `DD_TRACE_SAMPLING_RULES` で設定します。`DD_TRACE_SAMPLING_RULES` が指定されていない場合は、Istio のトレースが 100% Datadog に送信されます。

**注**: これらの環境変数は `values.pilot.traceSampling` の設定によって示されるトレースのサブセットにのみ適用されます。したがって、Istio の構成中に `--set values.pilot.traceSampling=100.0` が必要です。

[Datadog Agent が算出したサンプリングレート][9] (10 トレース/秒/Agent) を使用し、100% に設定されたデフォルトのサンプリングルールを無視するには、パラメーター `DD_TRACE_SAMPLING_RULES` を空の配列に設定します。

```bash
DD_TRACE_SAMPLING_RULES='[]'
```

ルールの空の配列を明示的に指定することと、ルールを指定しないこととは異なります。

`DD_TRACE_SAMPLING_RULES` を構成するには、ネームスペースが `istio-injection=enabled` となっている各デプロイで、デプロイ仕様テンプレートの `apm.datadoghq.com/env` アノテーションの一部として、環境変数を設定します。
```
apiVersion: apps/v1
...
kind: Deployment
...
spec:
  template:
    metadata:
      annotations:
        apm.datadoghq.com/env: '{"DD_ENV": "prod", "DD_SERVICE": "my-service", "DD_VERSION": "v1.1", "DD_TRACE_SAMPLING_RULES": "[]"}'
```
`apm.datadoghq.com/env` は文字列で、その中身は環境変数名と値を対応させた JSON オブジェクトです。環境変数の値はそれ自体が文字列であり、`DD_TRACE_SAMPLING_RULES` の場合、文字列の値はオブジェクトの JSON 配列です。

## 環境変数

Istio サイドカー用の環境変数は `apm.datadoghq.com/env` アノテーションを使用して、デプロイメントごとに設定することができます。これは、Istio サイドカーを採用したデプロイメントに固有のもので、[統合サービスタグ付け用ラベル][10]に加えて設定されます。
```yaml
apiVersion: apps/v1
...
kind: Deployment
...
spec:
  template:
    metadata:
      annotations:
        apm.datadoghq.com/env: '{ "DD_ENV": "prod", "DD_SERVICE": "my-service", "DD_VERSION": "v1.1"}'
```

## デプロイおよびサービス

クラスター上の Agent がデフォルトの DaemonSet ではなくデプロイおよびサービスとして実行されている場合は、DNS アドレスと Agent のポートを指定するための追加オプションが必要です。
`default` ネームスペース内のサービス `datadog-agent` の場合、アドレスは `datadog-agent.default.svc.cluster.local:8126` のようになります。

- `--set values.global.tracer.datadog.address=datadog-agent.default:8126`

クラスターで Mutual TLS が有効化されている場合は、Agent のデプロイでサイドカーインジェクションを無効化し、TLS を無効にするトラフィックポリシーを追加する必要があります。

このアノテーションを Agent のデプロイテンプレートに追加します。
```
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
```

Istio v1.4.x の場合、トラフィックポリシーは DestinationRule を使用して構成することができます。Istio v1.5.x 以上ではトラフィックポリシーの追加は不要です。
```
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: datadog-agent
  namespace: istio-system
spec:
  host: datadog-agent.default.svc.cluster.local
  trafficPolicy:
    tls:
      mode: DISABLE
```

プロトコルの自動選択でサイドカーと Agent 間のトラフィックが HTTP であることを確認し、トレーシングを有効にすることができます。
この機能は、この特定のサービスについての[プロトコルの手動選択][12]を使用することで無効にすることが可能です。`datadog-agent` サービス内のポート名は `tcp-traceport` に変更できます。
Kubernetes 1.18+ を使用している場合は、ポートの指定に `appProtocol: tcp` を追加できます。

[1]: /integrations/istio/
[2]: /network_monitoring/performance/setup/#istio
[3]: https://www.datadoghq.com/blog/istio-datadog/
[4]: /agent/kubernetes/
[5]: /agent/kubernetes/apm/
[6]: https://istio.io/docs/setup/install/istioctl/
[7]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/
[8]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
[9]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[10]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[12]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/#manual-protocol-selection
[13]: https://istio.io/latest/docs/releases/supported-releases/#support-status-of-istio-releases
{{% /tab %}}
{{% tab "Kong" %}}

Datadog APM は、[Kong Gateway][1] で [kong-plugin-ddtrace][2] プラグインを利用して利用できます。

## インストール

プラグインは `luarocks` を使ってインストールします。
```
luarocks install kong-plugin-ddtrace
```

Kong Gateway はバンドルされているプラグインではないので、有効にする前に構成する必要があります。有効にするには、環境変数 `KONG_PLUGINS` に `bundled` と `ddtrace` を含めるか、`/etc/kong/kong.conf` に `plugins=bundled,ddtrace` を設定してください。次に、Kong Gateway を再起動すると変更が適用されます。

```
# KONG_PLUGINS 環境変数を設定するか、/etc/kong/kong.conf を編集して ddtrace プラグインを有効にします
export KONG_PLUGINS=bundled,ddtrace
kong restart
```

## 構成

プラグインは、グローバルまたは Kong Gateway の特定のサービスで有効にすることができます。

```
# グローバルに有効
curl -i -X POST --url http://localhost:8001/plugins/ --data 'name=ddtrace'
# 特定のサービスのみ有効
curl -i -X POST --url http://localhost:8001/services/example-service/plugins/ --data 'name=ddtrace'
```

プラグイン内のサービス名や環境などを設定するためのオプションが用意されています。
以下の例では、`prod` 環境に `mycorp-internal-api` というサービス名を設定しています。
```
curl -i -X POST --url http://localhost:8001/plugins/ --data 'name=ddtrace' --data 'config.service_name=mycorp-internal-api' --data 'config.environment=prod'
```

その他の構成オプションは、[kong-plugin-ddtrace][3] のプラグインドキュメントに記載されています。


[1]: https://docs.konghq.com/gateway/latest/
[2]: https://github.com/DataDog/kong-plugin-ddtrace
[3]: https://github.com/DataDog/kong-plugin-ddtrace#configuration

{{% /tab %}}

{{% tab "Apache HTTP Server" %}}

Datadog provides an HTTPd [module][1] to enhance [Apache HTTP Server][2] and [IHS HTTP Server][3] capabilities with APM Tracing.

### 互換性

Since IHS HTTP Server is essentially a wrapper of the Appache HTTP Server, the module can also be used with IHS without any modifications.

### インストール

<div class="alert alert-warning">
  <strong>Note</strong>: Only Apache HTTP Server 2.4.x for x86_64 architecture is supported.
</div>

The module is provided as a shared library for dynamic loading by HTTPd. Each supported platform
and architecture has its own artifact hosted on [httpd-datadog's repository][1].

To install the module:

1. Run the following script to download the latest version of the module:

   ```bash
   curl -s https://api.github.com/repos/DataDog/httpd-datadog/releases/latest \
   | grep "mod_datadog-linux-x86_64.tar.gz" \
   | cut -d : -f 2,3 \
   | tr -d \" \
   | wget -qi -
   ```

   When unpacking the tarball, the resulting file is `mod_datadog.so`, the shared library that must
   be loaded by the server.

1. Place the file in the directory where HTTPd searches for modules, typically `/usr/local/apache2/modules`.

1. Load the module by adding the following line in the configuration file:

   ```nginx
   LoadModule datadog_module modules/mod_datadog.so
   ```

1. To enable the module, make sure to restart or reload HTTPd.

### 構成

By default, all requests are traced and sent to the Datadog Agent.

To change the module default behavior, use `Datadog*` directives described in the Datadog module's [API documentation][3].

For example, the following configuration sets the service name to `my-service` and the sampling rate to 10%:

```nginx
LoadModule datadog_module modules/mod_datadog.so

DatadogServiceName my-app
DatadogSamplingRate 0.1
```

[1]: https://github.com/DataDog/httpd-datadog
[2]: https://httpd.apache.org/
[3]: https://github.com/DataDog/httpd-datadog/blob/main/doc/configuration.md
{{% /tab %}}

{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
