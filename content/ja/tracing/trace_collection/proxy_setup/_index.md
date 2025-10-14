---
algolia:
  tags:
  - プロキシ
  - トレーシングプロキシ
  - プロキシ
aliases:
- /ja/tracing/proxies/envoy
- /ja/tracing/envoy/
- /ja/tracing/proxies/nginx
- /ja/tracing/nginx/
- /ja/tracing/istio/
- /ja/tracing/setup/envoy/
- /ja/tracing/setup/nginx/
- /ja/tracing/setup/istio/
- /ja/tracing/proxies
- /ja/tracing/setup_overview/envoy/
- /ja/tracing/setup_overview/nginx/
- /ja/tracing/setup_overview/istio/
- /ja/tracing/setup_overview/httpd/
- /ja/tracing/setup_overview/proxy_setup/
further_reading:
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
- link: https://www.envoyproxy.io/
  tag: 外部サイト
  text: Envoy Web サイト
- link: https://www.envoyproxy.io/docs/envoy/latest/
  tag: 外部サイト
  text: Envoy ドキュメント
- link: https://www.nginx.com/
  tag: 外部サイト
  text: NGINX ウェブサイト
- link: https://istio.io/
  tag: 外部サイト
  text: Istio ウェブサイト
- link: https://istio.io/docs/
  tag: 外部サイト
  text: Istio ドキュメント
- link: https://docs.konghq.com/gateway/latest/
  tag: 外部サイト
  text: Kong Web サイト
- link: https://github.com/DataDog/dd-trace-cpp
  tag: ソースコード
  text: Datadog C++ クライアント
- link: https://github.com/DataDog/kong-plugin-ddtrace/
  tag: ソースコード
  text: Kong 用 Datadog APM プラグイン
- link: https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentelemetry/
  tag: 外部サイト
  text: Ingress-NGINX コントローラ用 OpenTelemetry
- link: https://github.com/DataDog/httpd-datadog
  tag: ソースコード
  text: Apache HTTP Server 用 Datadog モジュール
title: プロキシのトレース
---

プロキシに関するトレース情報の収集を含めるよう、トレースを設定することができます。

{{< tabs >}}
{{% tab "Envoy" %}}

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

[1]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[2]: /ja/tracing/setup/cpp/#environment-variables
{{% /tab %}}
{{% tab "NGINX" %}}

Datadog APM は、2 つの構成で NGINX をサポートしています。
- Datadog モジュールによって提供されるトレースで、プロキシとして動作する NGINX。
- Kubernetes の Ingress コントローラーとしての NGINX。

## NGINX と Datadog モジュールの組み合わせ
Datadog は分散型トレーシングのために NGINX モジュールを提供しています。

### モジュールのインストール
Datadog NGINX モジュールをインストールするには、以下の手順に従ってください。
1. [最新の nginx-datadog GitHub リリース][1]から適切なバージョンをダウンロードします。
2. 特定の NGINX バージョンと CPU アーキテクチャに対応する tarball を選択します。

各リリースには、NGINX のバージョンと CPU アーキテクチャの組み合わせごとに 2 つの tarball が含まれています。
メインの tarball には、Datadog NGINX モジュールである `ngx_http_datadog_module.so` というファイルが 1 つ含まれています。2 つ目のファイルはデバッグシンボルで、これはオプションです。

簡便のため、以下のスクリプトは最新リリースのモジュールのみをダウンロードします。

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

ダウンロードした tarball から `tar` を使用して `ngx_http_datadog_module.so` ファイルを解凍し、NGINX モジュールディレクトリ (通常は `/usr/lib/nginx/modules`) に配置します。

### NGINX 構成と Datadog モジュールの組み合わせ
NGINX 構成の一番上のセクションで、Datadog モジュールをロードします。

```nginx
load_module modules/ngx_http_datadog_module.so;
```

デフォルトの構成では、ローカルの Datadog Agent に接続し、すべての NGINX ロケーションのトレースを生成します。Datadog モジュールの [API ドキュメント][4]で説明されている専用の `datadog_*` ディレクティブを使用して、カスタム構成を指定します。

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

### コントローラ v1.10.0 以降

<div class="alert alert-danger">
  <strong>重要:</strong> <b>v1.10.0</b> のリリースに伴い、Ingress コントローラの OpenTracing と Datadog のインテグレーションは廃止されました。代替として、OpenTelemetry インテグレーションが推奨されます。<br><br>
  古いバージョンについては、<a href="#controller-v190-and-older">OpenTracing ベースの説明</a>を参照してください。
</div>

**1. Datadog Agent の準備:** Datadog Agent が [gRPC OTLP Ingestion を有効にして][5] OpenTelemetry Collector として動作するようにします。

**2. Ingress コントローラの構成:** はじめに、Ingress コントローラのポッド仕様に `HOST_IP` 環境変数が設定されていることを確認します。設定されていない場合は、ポッドの仕様内の `env` ブロックに以下のエントリを追加します。
```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
- name: OTEL_EXPORTER_OTLP_ENDPOINT
  value: "http://$(HOST_IP):4317"
```

次に、コントローラの OpenTelemetry インスツルメントを有効にします。ConfigMap を作成または編集して、以下の詳細を追加します。

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx
data:
  enable-opentelemetry: "true"
  otel-sampler: AlwaysOn
  # デフォルト
  # otel-service-name: "nginx"
  # otel-sampler-ratio: 0.01
```

### コントローラ v1.9.0 以前
Datadog トレーシングを有効化するには、ConfigMap を作成または編集して `enable-opentracing: "true"` と、トレースの送信先となる `datadog-collector-host` を設定します。
ConfigMap 名は Ingress-NGINX Controller コンテナのコマンドライン引数により明示的に引用し、`--configmap=<POD_NAMESPACE>/nginx-configuration` をデフォルトに設定します。
`ingress-nginx` が Helm チャートからインストールされた場合は、この ConfigMap の名前は `<RELEASE_NAME>-nginx-ingress-controller` のパターンに従います。

Ingress コントローラーは `nginx.conf` と `/etc/nginx/opentracing.json` 双方のファイルを管理します。すべての `location` ブロックでトレーシングが有効化されます。

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
  # デフォルト
  # datadog-service-name: "nginx"
  # datadog-collector-port: "8126"
  # datadog-operation-name-override: "nginx.handle"
  # datadog-sample-rate: "1.0"
```

また、コントローラーのポッド仕様に `HOST_IP` 環境変数セットが含まれていることを確認してください。環境変数 `POD_NAME` と `POD_NAMESPACE` を含む `env:` ブロックに下記のエントリを追加します。

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
[5]: /ja/opentelemetry/otlp_ingest_in_the_agent/
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

[1]: /ja/integrations/istio/
[2]: /ja/network_monitoring/performance/setup/#istio
[3]: https://www.datadoghq.com/blog/istio-datadog/
[4]: /ja/agent/kubernetes/
[5]: /ja/agent/kubernetes/apm/
[6]: https://istio.io/docs/setup/install/istioctl/
[7]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/
[8]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
[9]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[10]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
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

Datadog は、[Apache HTTP Server][2] と [IHS HTTP Server][3] の機能を APM トレーシングで拡張するための HTTPd [モジュール][1]を提供しています。

### 互換性

IHS HTTP Server は基本的に Apache HTTP Server のラッパーなので、このモジュールは IHS でもそのまま使用できます。

### インストール

<div class="alert alert-danger">
  <strong>注</strong>: Apache HTTP Server 2.4.x (x86_64 アーキテクチャ) のみサポートしています。
</div>

このモジュールは HTTPd による動的ロードのための共有ライブラリとして提供されます。各サポートプラットフォームとアーキテクチャは、[httpd-datadog のリポジトリ][1]でホストされている独自のアーティファクトを持っています。

モジュールをインストールするには

1. 以下のスクリプトを実行して最新バージョンのモジュールをダウンロードしてください。

   ```bash
   curl -s https://api.github.com/repos/DataDog/httpd-datadog/releases/latest \
   | grep "mod_datadog-linux-x86_64.tar.gz" \
   | cut -d : -f 2,3 \
   | tr -d \" \
   | wget -qi -
   ```

   tarball を解凍すると、`mod_datadog.so` というサーバーに読み込ませる必要がある共有ライブラリが
   生成されます。

1. このファイルを HTTPd がモジュールを探すディレクトリ (通常は `/usr/local/apache2/modules`) に置きます。

1. コンフィギュレーションファイルに以下の行を追加して、モジュールをロードします。

   ```nginx
   LoadModule datadog_module modules/mod_datadog.so
   ```

1. モジュールを有効にするには、HTTPd を再起動するかリロードしてください。

### 構成

デフォルトでは、すべてのリクエストがトレースされ、Datadog Agent に送信されます。

モジュールのデフォルトの動作を変更するには、Datadog モジュールの [API ドキュメント][3]で説明されている `Datadog*` ディレクティブを使用します。

例えば、以下の構成では、サービス名を `my-service` に、サンプリング量を 10% に設定しています。

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