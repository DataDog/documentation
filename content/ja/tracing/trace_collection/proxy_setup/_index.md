---
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
- /ja/tracing/setup_overview/proxy_setup/
further_reading:
- link: /tracing/glossary/
  tag: APM の UI を利用する
  text: サービス、リソース、トレースを調査する
- link: https://www.envoyproxy.io/
  tag: ドキュメント
  text: Envoy Web サイト
- link: https://www.envoyproxy.io/docs/envoy/latest/
  tag: ドキュメント
  text: Envoy ドキュメント
- link: https://www.nginx.com/
  tag: ドキュメント
  text: Nginx Web サイト
- link: https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentracing/
  tag: ドキュメント
  text: Nginx Ingress Controller OpenTracing
- link: https://github.com/opentracing-contrib/nginx-opentracing
  tag: ソースコード
  text: OpenTracing 対応 Nginx プラグイン
- link: https://istio.io/
  tag: ドキュメント
  text: Istio ウェブサイト
- link: https://istio.io/docs/
  tag: ドキュメント
  text: Istio ドキュメント
- link: https://github.com/DataDog/dd-opentracing-cpp
  tag: ソースコード
  text: Datadog OpenTracing C++ クライアント
kind: documentation
title: プロキシのトレース
---

プロキシに関するトレース情報の収集を含めるよう、トレースを設定することができます。

{{< tabs >}}
{{% tab "Envoy" %}}

Datadog APM は Envoy v1.9.0 以降に含まれています。

## Datadog APM を有効にする

**注**: 以下のコンフィギュレーション例は、Envoy v1.19 用です。
他のバージョンのコンフィギュレーション例は[`dd-opentracing-cpp`GitHub リポジトリ][1]にあります。

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

[Datadog Agent が算出したサンプリングレート][2] (10 トレース/秒/Agent) を使用し、100% に設定されたデフォルトのサンプリングルールを無視するには、パラメーター `DD_TRACE_SAMPLING_RULES` を空の配列に設定します。

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

利用可能な[環境変数][3]は、Envoy に埋め込まれた C++ トレーサーのバージョンによって異なります。

**注**: Datadog Agent のアドレスは `cluster` 設定を使用して構成されているため、変数 `DD_AGENT_HOST`、`DD_TRACE_AGENT_PORT`、`DD_TRACE_AGENT_URL` は  Envoy に適用されません。

| Envoy バージョン | C++ トレーサーバージョン |
|---------------|--------------------|
| v1.19 | v1.2.1 |
| v1.18 | v1.2.1 |
| v1.17 | v1.1.5 |
| v1.16 | v1.1.5 |
| v1.15 | v1.1.5 |
| v1.14 | v1.1.3 |
| v1.13 | v1.1.1 |
| v1.12 | v1.1.1 |
| v1.11 | v0.4.2 |
| v1.10 | v0.4.2 |
| v1.9 | v0.3.6 |

[1]: https://github.com/DataDog/dd-opentracing-cpp/tree/master/examples/envoy-tracing
[2]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[3]: /ja/tracing/setup/cpp/#environment-variables
{{% /tab %}}
{{% tab "Nginx" %}}

プラグインとコンフィギュレーションを組み合わせて使用することで、Nginx で Datadog APM に対応できます。
公式 [Linux レポジトリ][1]の Nginx を使用して、プラグインのバイナリを事前構築する手順を以下に記載しました。

## Nginx オープンソース

### プラグインのインストール

**注**: このプラグインは、古いバージョンの `libstdc++` を使用する Linux ディストリビューションでは機能しません。これには、RHEL/Centos 7 および AmazonLinux 1 が含まれます。
これの回避策は、Docker コンテナから Nginx を実行することです。Dockerfile の例が[こちら][2]にあります。

次のプラグインをインストールする必要があります。

- OpenTracing 対応 Nginx プラグイン - [linux-amd64-nginx-${NGINX_VERSION}-ot16-ngx_http_module.so.tgz][3] - `/usr/lib/nginx/modules` にインストール
- Datadog OpenTracing C++ プラグイン - [linux-amd64-libdd_opentracing_plugin.so.gz][4] - `/usr/local/lib` など、Nginx にアクセス可能な場所にインストール

次のコマンドを使用してモジュールをダウンロードしてインストールします。

```bash
# GitHub から最新のリリースバージョン番号を取得します。
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
NGINX_VERSION=1.17.3
OPENTRACING_NGINX_VERSION="$(get_latest_release opentracing-contrib/nginx-opentracing)"
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
# OpenTracing 用の Nginx プラグインをインストールします
wget https://github.com/opentracing-contrib/nginx-opentracing/releases/download/${OPENTRACING_NGINX_VERSION}/linux-amd64-nginx-${NGINX_VERSION}-ot16-ngx_http_module.so.tgz
tar zxf linux-amd64-nginx-${NGINX_VERSION}-ot16-ngx_http_module.so.tgz -C /usr/lib/nginx/modules
# Datadog Opentracing C++ プラグインをインストールします
wget https://github.com/DataDog/dd-opentracing-cpp/releases/download/${DD_OPENTRACING_CPP_VERSION}/linux-amd64-libdd_opentracing_plugin.so.gz
gunzip linux-amd64-libdd_opentracing_plugin.so.gz -c > /usr/local/lib/libdd_opentracing_plugin.so
```

### Nginx の構成

OpenTracing モジュールを Nginx コンフィギュレーションに読み込む必要があります。

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

`log_format with_trace_id` ブロックは、ログとトレースの相関関係を構築するためのものです。完全なフォーマットについては、[Nginx config][5] のサンプルファイルを参照してください。値 `$opentracing_context_x_datadog_trace_id` はトレース ID をキャプチャし、`$opentracing_context_x_datadog_parent_id` はスパン ID をキャプチャします。

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

`service` 値は Nginx の使用に合わせて意味のある値に変更できます。
Nginx をコンテナまたはオーケストレーション環境で使用している場合は、`agent_host` 値を変更する必要があります。

完成例

* [nginx.conf][5]
* [dd-config.json][6]

このコンフィギュレーションが完了すると、Nginx への HTTP リクエストが開始し Datadog トレースを伝達します。リクエストは APM UI に表示されます。

### Nginx サンプリング

Datadog に送信される Nginx トレースの量を制御するには、コンフィギュレーションファイル `dd-config.json` で `sample_rate` パラメータを `0.0` (0%) から `1.0` (100%) の間の値に設定して、サンプリングレートを指定します。

```json
{
  "environment": "prod",
  "service": "nginx",
  "agent_host": "localhost",
  "agent_port": 8126,
  "sample_rate": 0.2
}
```

値を指定しない場合、[Datadog Agent が算出したサンプリングレート][7] (10 トレース/秒/Agent) が適用されます。

`sampling_rules` 構成パラメータで、**サービスごとの**サンプリングレートを設定します。パラメータ `sampling_limit_per_second` を設定して、サービスインスタンスごとに秒あたりのトレース数を設定することで、レート制限を設定します。`sampling_limit_per_second` が設定されていない場合、1 秒間に 100 個のトレースという制限が適用されます。

例えば、`nginx` というサービスのトレースの 50% を送信するには (1 秒間に最大 `50` トレース)

```json
{
  "environment": "prod",
  "service": "nginx",
  "agent_host": "localhost",
  "agent_port": 8126,
  "sampling_rules": [{"service":"nginx", "sample_rate":0.5}],
  "sampling_limit_per_second":50
}
```

[dd-opentracing-cpp][8] ライブラリのサンプリング構成オプションについては、[リポジトリドキュメント][9]で詳しく説明しています。

### Nginx および FastCGI

場所が HTTP ではなく FastCGI バックエンドを提供している場合、`location` ブロックは `opentracing_propagate_context` ではなく `opentracing_fastcgi_propagate_context` を使用する必要があります。

## Kubernetes 対応 Nginx Ingress コントローラー

[Kubernetes ingress-nginx][10] コントローラーのバージョン 0.23.0 以降には、OpenTracing 対応 Nginx プラグインが含まれています。

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

### Ingress Controller サンプリング
Nginx Ingress Controller for Kubernetes は、Datadog のトレーシングライブラリである `dd-opentracing-cpp` の [v1.2.1][11] を使用しています。

Datadog に送信される Ingress Controller のトレースの量を制御するには、全てのトレースにマッチするサンプリングルールを指定します。ルールに構成された `sample_rate` は、サンプリングされるトレースの比率を決定します。ルールが指定されていない場合、サンプリングはデフォルトで 100% になります。

環境変数 `DD_TRACE_SAMPLING_RULES` を使って、サンプリングルールを指定します。Ingress Controller でサンプリングルールを定義するには、以下のようにします。

1. Ingress Controller の `ConfigMap` の `data` セクションに以下の [main-snippet][11] を追加して、環境変数をワーカープロセスに転送するよう Nginx に指示を出します。
   ```yaml
   data:
     main-snippet: "env DD_TRACE_SAMPLING_RULES;"
   ```

2. Ingress Controller の `Deployment` の `env` セクションで、環境変数に値を指定します。 例えば、Ingress Controller から発信されるトレースを 10% 保つようにするには
   ```yaml
   env:
   - name: DD_TRACE_SAMPLING_RULES
     value: '[{"sample_rate": 0.1}]'
   ```
   [Datadog Agent が算出したサンプリングレート][7] (デフォルトで Agent あたり 10 トレース/秒) を使用するには、サンプリングルールの空の配列を指定します。
   ```yaml
   env:
   - name: DD_TRACE_SAMPLING_RULES
     value: '[]'
   ```

[1]: http://nginx.org/en/linux_packages.html#stable
[2]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/Dockerfile
[3]: https://github.com/opentracing-contrib/nginx-opentracing/releases/latest
[4]: https://github.com/DataDog/dd-opentracing-cpp/releases/latest
[5]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/nginx.conf
[6]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/dd-config.json
[7]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[8]: https://github.com/DataDog/dd-opentracing-cpp/
[9]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/doc/sampling.md
[10]: https://github.com/kubernetes/ingress-nginx
[11]: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#main-snippet
{{% /tab %}}
{{% tab "Istio" %}}

Datadog は、Istio 環境のあらゆる側面を監視するため、以下を実現できます。
- APM でメッシュを実行してアプリケーションの個々の分散型トレースを表示 (以下を参照)。
- [ログ][1]を使用して、Envoy および Istio の Control Plane の健全性を評価。
- リクエスト、帯域幅、リソース消費の[メトリクス][1]でサービスメッシュのパフォーマンスを詳しく確認。
- [ネットワークパフォーマンスモニタリング][2]で、コンテナ、ポッド、サービス間のネットワークコミュニケーションをメッシュ状にマッピング。

Istio 環境での Datadog の使用について、詳細は [Istio のブログをご参照ください][3]。

Datadog APM は Istio v1.1.3 以降のバージョンに対応しており、Kubernetes クラスター上でご利用いただけます。

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

使用可能な[環境変数][11]は、Istio サイドカーのプロキシに埋め込まれた C++ トレーサーのバージョンによって異なります。

| Istio バージョン | C++ トレーサーバージョン |
|---------------|--------------------|
| v1.12.x | v1.2.1 |
| v1.11.x | v1.2.1 |
| v1.10.x | v1.2.1 |
| v1.9.x | v1.2.1 |
| v1.8.x | v1.1.5 |
| v1.7.x | v1.1.5 |
| v1.6.x | v1.1.3 |
| v1.5.x | v1.1.1 |
| v1.4.x | v1.1.1 |
| v1.3.x | v1.1.1 |
| v1.2.x | v0.4.2 |
| v1.1.3 | v0.4.2 |


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
[11]: /ja/tracing/setup/cpp/#environment-variables
[12]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/#manual-protocol-selection
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}