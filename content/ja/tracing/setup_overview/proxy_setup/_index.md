---
title: プロキシのトレース
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
  - link: 'https://www.nginx.com/'
    tag: Documentation
    text: NGINX ウェブサイト
  - link: 'https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentracing/'
    tag: Documentation
    text: NGINX Ingress Controller OpenTracing
  - link: 'https://github.com/opentracing-contrib/nginx-opentracing'
    tag: ソースコード
    text: OpenTracing 対応 NGINX プラグイン
  - link: 'https://istio.io/'
    tag: Documentation
    text: Istio ウェブサイト
  - link: 'https://istio.io/docs/'
    tag: Documentation
    text: Istio ドキュメント
  - link: 'https://github.com/DataDog/dd-opentracing-cpp'
    tag: ソースコード
    text: Datadog OpenTracing C++ クライアント
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
---
プロキシに関するトレース情報の収集を含めるよう、トレースを設定することができます。

{{< tabs >}}
{{% tab "Envoy" %}}

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




[1]: https://github.com/DataDog/dd-opentracing-cpp/tree/master/examples/envoy-tracing
[2]: /ja/tracing/setup/cpp/#environment-variables
{{% /tab %}}
{{% tab "NGINX" %}}

プラグインとコンフィギュレーションを組み合わせて使用することで、NGINX で Datadog APM に対応できます。
公式 [Linux レポジトリ][1]の NGINX を使用して、プラグインのバイナリを事前構築する手順を以下に記載しました。

## オープンソース NGINX

### プラグインのインストール

**注**: このプラグインは、古いバージョンの `libstdc++` を使用する Linux ディストリビューションでは機能しません。これには、RHEL/Centos 7 および AmazonLinux 1 が含まれます。
これの回避策は、Docker コンテナから NGINX を実行することです。Dockerfile の例が[こちら][2]にあります。

次のプラグインをインストールする必要があります。

- OpenTracing 対応 NGINX プラグイン - [linux-amd64-nginx-${NGINX_VERSION}-ngx_http_module.so.tgz][3] - `/usr/lib/nginx/modules` にインストール
- Datadog OpenTracing C++ プラグイン - [linux-amd64-libdd_opentracing_plugin.so.gz][4] - `/usr/local/lib` など、NGINX にアクセス可能な場所にインストール

次のコマンドを使用してモジュールをダウンロードしてインストールします。

```bash
# Github から最新のリリースバージョン番号を取得します。
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
NGINX_VERSION=1.17.3
OPENTRACING_NGINX_VERSION="$(get_latest_release opentracing-contrib/nginx-opentracing)"
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
# OpenTracing 用の NGINX プラグインをインストールします
wget https://github.com/opentracing-contrib/nginx-opentracing/releases/download/${OPENTRACING_NGINX_VERSION}/linux-amd64-nginx-${NGINX_VERSION}-ngx_http_module.so.tgz
tar zxf linux-amd64-nginx-${NGINX_VERSION}-ngx_http_module.so.tgz -C /usr/lib/nginx/modules
# Datadog Opentracing C++ プラグインをインストールします
wget https://github.com/DataDog/dd-opentracing-cpp/releases/download/${DD_OPENTRACING_CPP_VERSION}/linux-amd64-libdd_opentracing_plugin.so.gz
gunzip linux-amd64-libdd_opentracing_plugin.so.gz -c > /usr/local/lib/libdd_opentracing_plugin.so
```

### NGINX コンフィギュレーション

OpenTracing モジュールを NGINX コンフィギュレーションに読み込む必要があります。

```nginx
# OpenTracing モジュールを読み込む
load_module modules/ngx_http_opentracing_module.so;
```

`http` ブロックにより OpenTracing モジュールを有効化し、Datadog トレーサーを読み込みます。

```nginx
    opentracing on; # OpenTracing を有効化
    opentracing_tag http_user_agent $http_user_agent; # 各トレースにタグを追加。
    opentracing_trace_locations off; # 各リクエストにつき 1 スパンのみ送信。

    # Datadog トレーシングの実装と既定のコンフィグファイルを読み込む。
    opentracing_load_tracer /usr/local/lib/libdd_opentracing_plugin.so /etc/nginx/dd-config.json;
```

トレーシングが必要なサーバー内の `location` ブロックに次の指示を追加します。

```nginx
            opentracing_operation_name "$request_method $uri";
            opentracing_propagate_context;
```

Datadog トレーシングの実装コンフィグファイルには、次の指示も必要です。

```json
{
  "environment": "prod",
  "service": "nginx",
  "operation_name_override": "nginx.handle",
  "agent_host": "localhost",
  "agent_port": 8126
}
```

`service` 値は NGINX の使用に合わせて意味のある値に変更できます。
NGINX をコンテナまたはオーケストレーション環境で使用している場合は、`agent_host` 値を変更する必要があります。

完成例

* [nginx.conf][5]
* [dd-config.json][6]

このコンフィギュレーションが完了すると、NGINX への HTTP リクエストが開始し Datadog トレースを伝達します。リクエストは APM UI に表示されます。

#### NGINX および FastCGI

場所が HTTP ではなく FastCGI バックエンドを提供している場合、`location` ブロックは `opentracing_propagate_context` ではなく `opentracing_fastcgi_propagate_context` を使用する必要があります。

## Kubernetes 対応 NGINX Ingress コントローラー

[Kubernetes ingress-nginx][7] コントローラーのバージョン 0.23.0 以降には、OpenTracing 対応 NGINX プラグインが含まれています。

このプラグインを有効化するには、ConfigMap を作成または編集して `enable-opentracing: "true"` と、トレースの送信先となる `datadog-collector-host` に設定します。
ConfigMap 名は nginx-ingress コントローラーコンテナのコマンドライン引数により明示的に引用し、`--configmap=$(POD_NAMESPACE)/nginx-configuration` をデフォルトに設定します。
ingress-nginx が Helm チャートからインストールされた場合は、この ConfigMap の名前は `Release-Name-nginx-ingress-controller` となります。 

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
```

また、nginx-ingress コントローラーのポッド仕様に `HOST_IP` 環境変数セットが含まれていることを確認してください。環境変数 `POD_NAME` と `POD_NAMESPACE` を含む `env:` ブロックに下記のエントリを追加します。

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



[1]: http://nginx.org/en/linux_packages.html#stable
[2]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/Dockerfile
[3]: https://github.com/opentracing-contrib/nginx-opentracing/releases/latest
[4]: https://github.com/DataDog/dd-opentracing-cpp/releases/latest
[5]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/nginx.conf
[6]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/dd-config.json
[7]: https://github.com/kubernetes/ingress-nginx
{{% /tab %}}
{{% tab "Istio" %}}

Datadog は、Istio 環境のあらゆる側面を監視するため、以下を実現できます。
- APM でメッシュを実行してアプリケーションの分散型トレースの詳細を確認（以下を参照）。
- [ログ][1]を使用して、Envoy および Istio の Control Plane の健全性を評価。
- リクエスト、帯域幅、リソース消費の[メトリクス][1]でサービスメッシュのパフォーマンスを詳しく確認。
- [ネットワークパフォーマンスモニタリング][2]で、コンテナ、ポッド、サービス間のネットワークコミュニケーションをメッシュ状にマッピング。

Datadog を使用した Istio 環境の監視について、詳しくは [Istio ブログ][10]を参照してください。

## コンフィギュレーション

Datadog APM は、Kubernetes クラスターの Istio v1.1.3 以降で使用可能です。

### Datadog Agent のインストール

1. [Agent のインストール][3]
2. [Agent に APM が有効になっていることを確認します][4]。
3. `hostPort` 設定のコメントを解除し、Istio のサイドカーが Agent に接続してトレースを送信できるようにします。


### Istio のコンフィギュレーションとインストール

Datadog APM を有効にするには、[Istio をカスタムインストール][5]して、Istio のインストール時に 2 つの追加オプションを設定する必要があります。

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
デフォルトで、Istio は自動的にこれを検出します。アプリケーションのデプロイメントおよびサービスでポートに名前を付けることで、手動で構成することも可能です。詳細は、Istio のドキュメントの[プロトコルの選択][6]をご確認ください。

デフォルトの場合、トレース作成時に用いられるサービス名はデプロイ名とネームスペースをもとに生成されます。これは
デプロイのポッドテンプレートに `app` ラベルを追加することで手動で設定できます。

```yaml
template:
  metadata:
    labels:
      app: <SERVICE_NAME>
```

[CronJobs][7] の場合、生成された名前がより高レベルの `CronJob` ではなく `Job` から来る場合があるため、`app` ラベルをジョブテンプレートに追加する必要があります

### 環境変数

Istio サイドカーの環境変数は `apm.datadoghq.com/env` アノテーションを使用してデプロイごとに設定することができます。
```yaml
    metadata:
      annotations:
        apm.datadoghq.com/env: '{ "DD_ENV": "prod", "DD_TRACE_ANALYTICS_ENABLED": "true" }'
```

使用可能な[環境変数][8]は、Istio サイドカーのプロキシに埋め込まれた C++ トレーサーのバージョンによって異なります。

| Istio バージョン | C++ トレーサーバージョン |
|---------------|--------------------|
| v1.7.x | v1.1.5 |
| v1.6.x | v1.1.3 |
| v1.5.x | v1.1.1 |
| v1.4.x | v1.1.1 |
| v1.3.x | v1.1.1 |
| v1.2.x | v0.4.2 |
| v1.1.3 | v0.4.2 |


### Agent をデプロイおよびサービスとして実行

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
この機能は、この特定のサービスについての[プロトコルの手動選択][9]を使用することで無効にすることが可能です。`datadog-agent` サービス内のポート名は `tcp-traceport` に変更できます。
Kubernetes 1.18+ を使用している場合は、ポートの指定に `appProtocol: tcp` を追加できます。




[1]: /ja/integrations/istio/
[2]: /ja/network_monitoring/performance/setup/#istio
[3]: /ja/agent/kubernetes/
[4]: /ja/agent/kubernetes/apm/
[5]: https://istio.io/docs/setup/install/istioctl/
[6]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/
[7]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
[8]: /ja/tracing/setup/cpp/#environment-variables
[9]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/#manual-protocol-selection
[10]: https://www.datadoghq.com/blog/istio-datadog/
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}