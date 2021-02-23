---
title: Agent v5 を使用したオートディスカバリー
kind: ガイド
private: true
aliases:
  - /ja/agent/faq/agent-5-autodiscovery
---
<div class="alert alert-info">
オートディスカバリーは、これまでのサービスディスカバリーのことです。Agent のコード内や一部の構成オプションでは、引き続きサービスディスカバリーと呼びます。
</div>

Docker は[急速に導入が進んでいます][1]。Docker Swarm、Kubernetes、Amazon ECS などのオーケストレーションプラットフォームは、複数のホスト間のオーケストレーションとレプリケーションを管理することで、Docker 化されたサービスの実行を容易にし、回復性を高めます。しかし、監視はより困難になっています。ホスト間を予測不可能に移動するサービスを、どうすれば高い信頼性で監視できるでしょうか。

Datadog Agent は、オートディスカバリー機能を使用して、どのサービスがどこで実行されているかを自動的に追跡できます。オートディスカバリーを使用すると、Agent チェックの構成テンプレートを定義し、各チェックをどのコンテナに適用するかを指定できます。

Agent は、コンテナの状態が移り変わるにしたがって、静的チェック構成を有効化、無効化、またはテンプレートから再生成します。たとえば、NGINX コンテナが 10.0.0.6 から 10.0.0.17 に移動すると、Agent は、オートディスカバリー機能を利用して、NGINX チェック構成を新しい IP アドレスに更新します。このため、ユーザー側から操作をせずに、NGINX メトリクスを収集し続けることができます。

## 概要

従来の非コンテナ環境では、Datadog Agent の設定は、その環境と同じく静的です。Agent は、起動時にディスクからチェック構成を読み取り、実行中に構成されているすべてのチェックを継続的に実行します。

構成ファイルは静的です。構成ファイル内で構成されているネットワーク関連オプションは、監視対象サービスのインスタンス (10.0.0.61:6379 の Redis インスタンスなど) を特定するために使用されます。Agent チェックが目的のサービスに接続できない場合、ユーザーによって問題が解決されるまで、メトリクスは提供されません。Agent チェックは、管理者が監視対象サービスを回復させるか、チェックの構成を修正するまで、失敗した接続を再試行します。

オートディスカバリーを有効にした場合、Agent は異なる方法でチェックを実行します。

### 異なるコンフィギュレーション

静的構成ファイルは、常に変化するネットワークエンドポイントからデータを収集するチェックには適していません。そこでオートディスカバリーは、チェック構成に**テンプレート**を使用します。Agent は、各テンプレートで 2 つのテンプレート変数 `%%host%%` および `%%port%%` を探します。これらは、通常はハードコードされるネットワークオプションの代わりに置かれています。たとえば、Agent の [Go Expvar チェック][2]のテンプレートには、オプション `expvar_url: http://%%host%%:%%port%%` が含まれます。複数の IP アドレスまたは公開ポートを持つコンテナの場合は、オートディスカバリーが[テンプレート変数インデックス](#supported-template-variables)を使用して正しいアドレス/ポートを選択するように指示することができます。

テンプレートは監視対象サービスのインスタンス (どの `%%host%%` のどの `%%port%%` か) を特定しないため、オートディスカバリーは、テンプレートに代入する IP とポートを判断できるように、テンプレートごとに 1 つ以上の**コンテナ識別子**を必要とします。Docker の場合、コンテナ識別子はイメージ名またはコンテナラベルです。

最後に、オートディスカバリーは、チェックテンプレートをディスク以外の場所からロードできます。他の**テンプレートソース**としては、Consul などの key-value ストアや、Kubernetes で実行されている場合はポッドアノテーションがあります。

### 異なる実行方法

オートディスカバリーを有効にして Agent を起動すると、Agent は、[いずれかの](#template-source-precedence)ではなく、使用可能なすべてのテンプレートソースから、チェックテンプレートをテンプレートのコンテナ識別子と共にロードします。従来の Agent 設定とは異なり、Agent は常にすべてのチェックを実行するわけではありません。Agent は、Agent として同じホスト上で現在実行されているすべてのコンテナを調査して、有効にするチェックを決定します。

Agent は、実行中のコンテナを調査する際に、ロードしたいずれかのテンプレートのいずれかのコンテナ識別子にそのコンテナが一致するかどうかをチェックします。そして、一致するごとに、そのコンテナの IP アドレスとポートを代入した静的チェック構成を生成します。さらに、その静的構成を使用してチェックを有効にします。

Agent は、Docker のイベント (コンテナの作成、廃棄、起動、停止) を監視し、イベント発生時に静的チェック構成を有効化、無効化、または再生成します。

## 設定方法

### Agent コンテナの実行

どのコンテナオーケストレーションプラットフォームを使用する場合でも、クラスター内の各ホストで、初めに 1 つの [docker-dd-agent コンテナ][3]を実行します。Kubernetes を使用している場合、docker-dd-agent の実行手順については、[Kubernetes インテグレーションのページ][4]を参照してください。Amazon ECS を使用している場合は、[Amazon ECS インテグレーションのページ][5]を参照してください。

Docker Swarm を使用する場合は、マネージャーノードのいずれかで以下のコマンドを実行します。

    docker service create \
      --name dd-agent \
      --mode global \
      --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
      --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
      --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
      -e API_KEY=<YOUR_DATADOG_API_KEY> \
      -e SD_BACKEND=docker \
      gcr.io/datadoghq/docker-dd-agent:latest

その他の場合は、docker-dd-agent ドキュメントで詳細な手順およびサポートされている[環境変数][6]の一覧を参照してください。

**Agent で JMX ベースのチェックを自動検出するには**

1. `gcr.io/datadoghq/docker-dd-agent:latest-jmx` イメージを使用します。このイメージは `latest` に基づいていますが、Agent が [jmxfetch][7] を実行するために必要な JVM を含んでいます。
2. `gcr.io/datadoghq/docker-dd-agent:latest-jmx` の起動時に、環境変数 `SD_JMX_ENABLE=yes` を渡します。

## チェックテンプレート

以下の各**テンプレートソース**セクションで、チェックテンプレートとそのコンテナ識別子を構成する方法を示します。

### ファイル (Auto-conf)

テンプレートをローカルファイルとして保存する方法はわかりやすく、外部サービスやオーケストレーションプラットフォームを必要としません。この方法の欠点は、テンプレートを変更、追加、または削除するたびに、Agent コンテナを再起動する必要がある点です。

Agent は、自分の `conf.d/auto_conf` ディレクトリでオートディスカバリーテンプレートを探します。以下のチェックのデフォルトテンプレートはここに置かれます。

- [Apache][8]
- [Consul][9]
- [CouchDB][10]
- [Couchbase][11]
- [Elasticsearch][12]
- [Etcd][13]
- [Kubernetes_state][14]
- [Kube_dns][15]
- [Kyototycoon][16]
- [Memcached][17]
- [Redis][18]
- [Riak][19]

基本的にはこれらのテンプレートで十分ですが、その他のチェックオプションを有効にする場合、複数のコンテナ識別子を使用する場合、[テンプレート変数インデックス](#supported-template-variables)を使用する場合などは、カスタム Agent チェック構成を使用する必要があります。その際、独自の auto-conf ファイルを記述します。このファイルは、以下の方法で提供できます。

1. docker-dd-agent を実行する各ホストにファイルを追加し、docker-dd-agent コンテナの起動時にコンテナに[そのファイルを含むディレクトリをマウント][20]する
2. docker-dd-agent に基づいて独自の Docker イメージをビルドし、カスタムテンプレートを `/etc/dd-agent/conf.d/auto_conf` に追加する
3. Kubernetes で、ConfigMap を使用してファイルを追加する

### Apache チェック

以下に、docker-dd-agent を使用してパッケージ化された `apache.yaml` テンプレートを示します。

```yaml
docker_images:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
```

これは、最小の [Apache チェック構成][21]とほぼ同じですが、`docker_images` オプションがあることがわかります。この必須オプションを使用して、コンテナ識別子を指定できます。オートディスカバリーは、同じホスト上で `httpd` イメージを実行するすべてのコンテナにこのテンプレートを適用します。

_すべての_ `httpd` イメージです。あるコンテナが `library/httpd:latest` を実行し、別のコンテナが `yourusername/httpd:v2` を実行しているとします。オートディスカバリーは、上記のテンプレートを両方のコンテナに適用します。オートディスカバリーは、auto-conf ファイルをロードする際に、ソースが異なる、またはタグが異なる同じ名前のイメージを区別できません。**コンテナイメージには、`library/httpd:latest` ではなく `httpd` などの短い名前を指定する必要があります**。

この制限が問題になる場合、つまり同じイメージを実行する複数のコンテナにそれぞれ異なるチェック構成を適用する必要がある場合は、ラベルを使用してコンテナを特定します。各コンテナに異なるラベルを指定し、各ラベルをテンプレートファイルの `docker_images` リストに追加します。`docker_images` は、イメージに限らず、すべての種類のコンテナ識別子を配置する場所です。

### key-value ストア

オートディスカバリーは、Consul、etcd、および Zookeeper をテンプレートソースとして使用できます。key-value ストアを使用するには、`datadog.conf` で構成するか、docker-dd-agent コンテナに渡される環境変数で構成する必要があります。

#### datadog.conf での構成

`datadog.conf` ファイルで、`sd_config_backend`、`sd_backend_host`、および `sd_backend_port` オプションをそれぞれ、key-value ストアの種類 (`etcd`、`consul`、または `zookeeper`)、IP アドレス、およびポートに設定します。

```conf
# 現時点では Docker のみがサポートされているため、この行のみコメント解除してください。
service_discovery_backend: docker

# コンフィギュレーションテンプレートの検索に使用する key/value ストアを定義します。
# デフォルト値は etcd です。 Consul もサポートされています。
sd_config_backend: etcd

# バックエンドに接続するための設定です。以下はデフォルト値です。異なる構成を使用する場合は編集してください。
sd_backend_host: 127.0.0.1
sd_backend_port: 4001

# デフォルトでは、Agent はバックエンドの `/datadog/check_configs` キー下で
コンフィギュレーションテンプレートを検索します。
# これを変更する場合は、次のオプションをコメント解除し、値を変更してください。
# sd_template_dir: /datadog/check_configs

# Consul ストアによりサービスディスカバリーのトークン認証が求められる場合は、ここでトークンを定義できます。
# consul_token: f45cbd0b-5022-samp-le00-4eaa7c1f40f1
```

Consul を使用し、Consul クラスターが認証を要求する場合は、`consul_token` を設定します。

[Agent を再起動][22]して、構成の変更を適用します。

#### 環境変数での構成

環境変数を使用する場合は、コンテナの起動時に、同じオプションをコンテナに渡します。

```shell
docker service create \
  --name dd-agent \
  --mode global \
  --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
  --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
  --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
  -e API_KEY=<YOUR API KEY> \
  -e SD_BACKEND=docker \
  -e SD_CONFIG_BACKEND=etcd \
  -e SD_BACKEND_HOST=127.0.0.1 \
  -e SD_BACKEND_PORT=4001 \
  gcr.io/datadoghq/docker-dd-agent:latest
```

オートディスカバリーを有効にするためのオプションの名前は、`datadog.conf` では `service_discovery_backend` ですが、環境変数では `SD_BACKEND` です。

---

key-value ストアがテンプレートソースとして有効になっている場合、Agent はキー `/datadog/check_configs` の下でテンプレートを探します。オートディスカバリーは、以下のような key-value 階層を前提とします。

```text
/datadog/
  check_configs/
    docker_image_1/                 # container identifier, e.g. httpd
      - check_names: [<CHECK_NAME>] # e.g. apache
      - init_configs: [<INIT_CONFIG>]
      - instances: [<INSTANCE_CONFIG>]
    ...
```

各テンプレートは、チェック名、`init_config`、`instances` の 3 つが組になっています。ここでは、前のセクションのようにオートディスカバリーにコンテナ識別子を指定するための `docker_images` オプションは必要ありません。key-value ストアの場合は、コンテナ識別子が `check_config` の最初のレベルのキーになります。(また、前のセクションで説明したファイルベースのテンプレートでは、この例のようなチェック名は必要なく、Agent はチェック名をファイル名から推測していました。)

#### Apache チェック

以下の etcd コマンドを実行すると、前のセクションの例と同等の Apache チェックテンプレートが作成されます。

```text
etcdctl mkdir /datadog/check_configs/httpd
etcdctl set /datadog/check_configs/httpd/check_names '["apache"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}]'
etcdctl set /datadog/check_configs/httpd/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
```

3 つの値がそれぞれリストであることに注目してください。オートディスカバリーは、共有リストインデックスに基づいて、リスト項目をチェック構成に集約します。この例の場合は、`check_names[0]`、`init_configs[0]`、および `instances[0]` から最初 (かつ唯一) のチェック構成が作成されます。

auto-conf ファイルとは異なり、**key-value ストアの場合は、コンテナ識別子として短いイメージ名 (`httpd` など) も長いイメージ名 (`library/httpd:latest` など) も使用できます**。以下の例では、長いイメージ名が使用されています。

#### Web サイトの可用性を監視する Apache チェック

以下の etcd コマンドを実行すると、同じ Apache テンプレートが作成され、Apache コンテナによって作成された Web サイトが使用可能かどうかを監視する [HTTP チェック][23]テンプレートが追加されます。

```text
etcdctl set /datadog/check_configs/library/httpd:latest/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/library/httpd:latest/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/library/httpd:latest/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
```

ここでも、各リストの順番が重要です。Agent は、構成の各部分が 3 つのリストの同じインデックスにある場合にのみ、HTTP チェック構成を正しく生成します (この例では、同じインデックス 1)。

### Kubernetes ポッドアノテーション

バージョン 5.12 以降の Datadog Agent では、チェックテンプレートを Kubernetes ポッドアノテーションに保存できます。オートディスカバリーが有効な場合、Agent は、Kubernetes 上で実行されているかどうかを検出し、実行されている場合はすべてのポッドアノテーションから自動的にチェックテンプレートを検索します。key-value ストアの場合のように、テンプレートソースとして Kubernetes を (`SD_CONFIG_BACKEND` で) 構成する必要はありません。

オートディスカバリーは、以下のようなアノテーションを前提とします。

```text
annotations:
  service-discovery.datadoghq.com/<container identifier>.check_names: '[<CHECK_NAME>]'
  service-discovery.datadoghq.com/<container identifier>.init_configs: '[<INIT_CONFIG>]'
  service-discovery.datadoghq.com/<container identifier>.instances: '[<INSTANCE_CONFIG>]'
```

形式は、key-value ストアの形式に似ています。異なる点は以下のとおりです。

* アノテーションの先頭には `service-discovery.datadoghq.com/` が必要です (key-value ストアの場合、先頭は `/datadog/check_configs/`)。
* アノテーションの場合、オートディスカバリーは、コンテナをイメージではなく**名前**で識別します (auto-conf ファイルおよび key-value ストアの場合と同様)。つまり、`<container identifier>` は `.spec.containers[0].image` ではなく `.spec.containers[0].name` と比較されます。

Kubernetes ポッドを直接定義する (`kind: Pod`) 場合は、各ポッドアノテーションをその `metadata` セクションの直下に追加します (以下の最初の例を参照)。ポッドを Replication Controller、Replica Set、または Deployment を介して**間接的に**定義する場合は、ポッドアノテーションを `.spec.templates.metadata` の下に追加します (以下の 2 つめの例を参照)。

#### Web サイトの可用性を監視する Apache チェック

以下のポッドアノテーションは、`apache` コンテナ用の 2 つのテンプレート (前のセクションの最後のテンプレートと同等) を定義します。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    service-discovery.datadoghq.com/apache.check_names: '["apache","http_check"]'
    service-discovery.datadoghq.com/apache.init_configs: '[{},{}]'
    service-discovery.datadoghq.com/apache.instances: '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
  labels:
    name: apache
spec:
  containers:
    - name: apache # これがアノテーションでコンテナ識別子として使用されます
      image: httpd # これで無く
      ports:
        - containerPort: 80
```

#### Apache チェックと HTTP チェック

Deployment からポッドを定義する場合は、テンプレートアノテーションを Deployment のメタデータに追加しないでください。Agent はこれを参照しません。以下のように指定して、アノテーションを追加します。

```yaml
apiVersion: apps/v1beta1
kind: Deployment
metadata: # ここにテンプレートを追加しないでください
  name: apache-deployment
spec:
  replicas: 2
  template:
    metadata:
      labels:
        name: apache
      annotations:
        service-discovery.datadoghq.com/apache.check_names: '["apache","http_check"]'
        service-discovery.datadoghq.com/apache.init_configs: '[{},{}]'
        service-discovery.datadoghq.com/apache.instances: '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
    spec:
      containers:
      - name: apache # これがアノテーションでコンテナ識別子として使用されます
        image: httpd # これで無く
        ports:
        - containerPort: 80
```

### Docker ラベルアノテーション

バージョン 5.17 以降の Datadog Agent では、チェックテンプレートを Docker ラベルに保存できます。オートディスカバリーが有効な場合、Agent は、Docker 上で実行されているかどうかを検出し、すべてのラベルから自動的にチェックテンプレートを検索します。key-value ストアの場合のように、テンプレートソースを (`SD_CONFIG_BACKEND` で) 構成する必要はありません。

オートディスカバリーは、ファイルの種類に応じて、ラベルが以下の例のようになっていることを前提とします。

**Dockerfile**

```text
LABEL "com.datadoghq.ad.check_names"='[<CHECK_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
```

**docker-compose.yaml**

```text
labels:
  com.datadoghq.ad.check_names: '[<CHECK_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
```

**docker run コマンド**

```text
-l com.datadoghq.ad.check_names='[<CHECK_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]'
```

#### NGINX Dockerfile

以下の Dockerfile は、オートディスカバリーを有効にして NGINX コンテナを起動します。

```text
FROM nginx

EXPOSE 8080
COPY nginx.conf /etc/nginx/nginx.conf
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
```

## リファレンス

### サポートされているテンプレート変数

以下のテンプレート変数が Agent によって処理されます。

- コンテナ IP: `host`
  - `%%host%%`: ネットワークを自動検出します。存在する場合は、`bridge` ネットワーク IP を返します。**ソートされた**最後のネットワークの IP にフォールバックします。
  - `%%host_<NETWORK NAME>%%`: 複数のネットワークにアタッチされている場合に、使用するネットワーク名を指定します (`%%host_bridge%%`、`%%host_swarm%%` など)。指定されたネットワーク名が見つからない場合は、`%%host%%` と同様に動作します。

- コンテナポート: `port`
  - `%%port%%`: 公開ポートを**数値として昇順にソート**した場合に最大のポートが使用されます。たとえば、ポート 80、443、8443 を公開しているコンテナの場合は、ポート 8443 が使用されます。
  - `%%port_0%%`: ポートを**数値として昇順にソート**した場合に最初のポートが使用されます。前述のコンテナの場合、`%%port_0%%` はポート 80、`%%port_1%%` はポート 443 を表します。
  - 使用するポートが変わらない場合は、`port` 変数を使用しないでポートを直接指定することをお勧めします。

- コンテナ PID: `pid` (5.15.x で追加)
  - `%%pid%%`: `docker inspect --format '{{.State.Pid}}' <CONTAINER>` から返されたコンテナプロセス ID を取得します。

- コンテナ名: `container_name` (5.15.x で追加)
  - `%%container_name%%`: コンテナ名を取得します。

### ラベル

コンテナは、コンテナの名前やイメージではなく、ラベルで識別できます。それには、コンテナに `com.datadoghq.sd.check.id: <SOME_LABEL>` というラベルを付け、通常はコンテナの名前やイメージを置く場所に `<SOME_LABEL>` を置きます。たとえば、コンテナに `com.datadoghq.sd.check.id: special-container` というラベルを付けた場合、オートディスカバリーは、`docker_images` リストに `special-container` を含む auto-conf テンプレートをそのコンテナに適用します。

オートディスカバリーは、各コンテナをラベルまたはイメージ/名前 (のいずれか) でのみ識別し、ラベルが優先されます。`com.datadoghq.sd.check.id: special-nginx` というラベルが付き、`nginx` イメージを実行するコンテナに対して、Agent は、コンテナ識別子として `nginx` のみを含むテンプレートを適用しません。

### テンプレートソースの優先度

複数のテンプレートソースから同じチェックタイプのテンプレートを提供する場合、Agent は、以下の順番でテンプレートを検索し、最初に見つかったテンプレートを使用します。

* Kubernetes アノテーション
* key-value ストア
* ファイル

したがって、`redisdb` テンプレートを Consul 内で構成し、かつファイル (`conf.d/auto_conf/redisdb.yaml`) としても構成した場合、Agent は Consul のテンプレートを使用します。

## トラブルシューティング

オートディスカバリーで、構成したチェックのいくつかがロードされているかどうかが不明な場合は、Agent の `configcheck` 初期化スクリプトコマンドを使用します。たとえば、Redis テンプレートがデフォルトの `auto_conf/redisdb.yaml` ファイルではなく、Kubernetes アノテーションからロードされていることを確認するには、次のようにします。

```text
# docker exec -it <AGENT_CONTAINER_NAME> /etc/init.d/datadog-agent configcheck
.
..
...
Check "redisdb":
  source --> Kubernetes Pod Annotation
  config --> {'instances': [{u'host': u'10.244.1.32', u'port': u'6379', 'tags': [u'image_name:kubernetes/redis-slave', u'kube_namespace:guestbook', u'app:redis', u'role:slave', u'docker_image:kubernetes/redis-slave:v2', u'image_tag:v2', u'kube_replication_controller:redis-slave']}], 'init_config': {}}
```

オートディスカバリーが JMX ベースのチェックをロードしているかどうかを確認するには、次のようにします。

```text
# docker exec -it <AGENT_CONTAINER_NAME> cat /opt/datadog-agent/run/jmx_status.yaml
timestamp: 1499296559130
checks:
  failed_checks: {}
  initialized_checks:
    SD-jmx_0:
    - {message: null, service_check_count: 0, status: OK, metric_count: 13, instance_name: SD-jmx_0-10.244.2.45-9010}
```

[1]: https://www.datadoghq.com/docker-adoption
[2]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example
[3]: https://gcr.io/datadoghq/docker-dd-agent
[4]: /ja/agent/kubernetes/
[5]: /ja/integrations/amazon_ecs/#installation
[6]: https://github.com/DataDog/docker-dd-agent#environment-variables
[7]: https://github.com/DataDog/jmxfetch
[8]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/auto_conf.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[10]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[14]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[16]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[17]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[18]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[20]: https://github.com/DataDog/docker-dd-agent#configuration-files
[21]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[22]: /ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[23]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example