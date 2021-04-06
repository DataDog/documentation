---
title: NGINX
kind: documentation
further_reading:
  - link: /tracing/visualization/
    tag: APM の UI を利用する
    text: サービス、リソース、トレースを調査する
  - link: 'https://www.nginx.com/'
    tag: Documentation
    text: NGINX ウェブサイト
  - link: 'https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentracing/'
    tag: Documentation
    text: NGINX Ingress Controller OpenTracing
  - link: 'https://github.com/opentracing-contrib/nginx-opentracing'
    tag: ソースコード
    text: OpenTracing 対応 NGINX プラグイン
  - link: 'https://github.com/DataDog/dd-opentracing-cpp'
    tag: ソースコード
    text: Datadog OpenTracing C++ クライアント
aliases:
  - /ja/tracing/proxies/nginx
  - /ja/tracing/nginx/
---
プラグインとコンフィギュレーションを組み合わせて使用することで、NGINX で Datadog APM に対応できます。
公式 [Linux レポジトリ][1]の NGINX を使用して、プラグインのバイナリを事前構築する手順を以下に記載しました。

## オープンソース NGINX

### プラグインのインストール

**注**: このプラグインは、古いバージョンの `libstdc++` を使用する Linux ディストリビューションでは機能しません。これには、RHEL/Centos 7 および AmazonLinux 1 が含まれます。
これの回避策は、Docker コンテナから NGINX を実行することです。Dockerfile の例が[こちら][2]にあります。

次のプラグインをインストールする必要があります。

- OpenTracing 対応 NGINX プラグイン - [linux-amd64-nginx-${NGINX_VERSION}-ot16-ngx_http_module.so.tgz][3] - `/usr/lib/nginx/modules` にインストール
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
wget https://github.com/opentracing-contrib/nginx-opentracing/releases/download/${OPENTRACING_NGINX_VERSION}/linux-amd64-nginx-${NGINX_VERSION}-ot16-ngx_http_module.so.tgz
tar zxf linux-amd64-nginx-${NGINX_VERSION}-ot16-ngx_http_module.so.tgz -C /usr/lib/nginx/modules
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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://nginx.org/en/linux_packages.html#stable
[2]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/Dockerfile
[3]: https://github.com/opentracing-contrib/nginx-opentracing/releases/latest
[4]: https://github.com/DataDog/dd-opentracing-cpp/releases/latest
[5]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/nginx.conf
[6]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/dd-config.json
[7]: https://github.com/kubernetes/ingress-nginx
