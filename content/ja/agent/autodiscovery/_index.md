---
title: Kubernetes と Docker でオートディスカバリーを使用する
kind: documentation
aliases:
  - /ja/guides/servicediscovery/
  - /ja/guides/autodiscovery/
further_reading:
  - link: /videos/autodiscovery/
    tag: ビデオ
    text: Agent v6/v5 とラベルを使用した Docker での Datadog オートディスカバリー
  - link: logs/
    tag: Documentation
    text: ログの収集
  - link: graphing/infrastructure/process
    tag: Documentation
    text: プロセスの収集
  - link: tracing
    tag: Documentation
    text: トレースの収集
---
## QuickStart

このページは、Agent 6 のオートディスカバリーについて説明しています。[Agent 5 のオートディスカバリーを設定する方法][1]については、個別にドキュメントをご用意していますのでそちらをご参照ください。

以下の 5 分間のビデオでは、Datadog Agent v6 のオートディスカバリー機能の概要を説明しています。

{{< wistia mlxx0j6txw >}}

## オートディスカバリーの動作

従来の非コンテナ環境では、Datadog Agent の設定は、それが実行される環境と同じく静的です。Agent は、起動時にディスクからチェック構成を読み取り、実行中は、構成されているすべてのチェックを継続的に実行します。
構成ファイルは静的です。構成ファイル内で構成されているネットワーク関連オプションは、監視対象サービスのインスタンス (10.0.0.61:6379 の Redis インスタンスなど) を特定するために使用されます。
Agent チェックが目的のサービスに接続できない場合は、ユーザーによって問題が解決されるまで、メトリクスは提供されません。Agent チェックは、管理者が監視対象サービスを回復させるか、チェックの構成を修正するまで、失敗した接続を再試行します。

オートディスカバリーを有効にした場合、Agent は異なる方法でチェックを実行します。

### 異なる構成

静的構成ファイルは、常に変化するネットワークエンドポイントからデータを収集するチェックには適していません。そこで、オートディスカバリーは、チェック構成に**テンプレート**を使用します。Agent は、各テンプレートで 2 つのテンプレート変数 `%%host%%` および `%%port%%` を探します。これらは、通常はハードコードされるネットワークオプションの代わりに置かれています。たとえば、Agent の [Go Expvar チェック][2]のテンプレートには、オプション `expvar_url: http://%%host%%:%%port%%` が含まれます。複数の IP アドレスまたは公開ポートを持つコンテナの場合は、オートディスカバリーが[テンプレート変数インデックス](#supported-template-variables)を使用して正しいアドレス/ポートを選択するように指示します。

テンプレートは監視対象サービスのインスタンス (どの `%%host%%` のどの `%%port%%` か) を特定しないため、オートディスカバリーは、テンプレートに代入する IP とポートを判断できるように、テンプレートごとに 1 つ以上の**コンテナ識別子**を必要とします。Docker の場合、コンテナ識別子はイメージ名またはコンテナラベルです。

最後に、オートディスカバリーは、チェックテンプレートをディスク以外の場所からロードします。他の**テンプレートソース**としては、Consul、Kubernetes ポッドアノテーション、Docker ラベルアノテーションなどの key-value ストアがあります。

### 異なる実行方法

オートディスカバリーを有効にして Agent を起動すると、Agent は、[いずれかの](#template-source-precedence)ではなく、使用可能なすべてのテンプレートソースから、チェックテンプレートをテンプレートのコンテナ識別子と共にロードします。従来の Agent 設定とは異なり、Agent は常にすべてのチェックを実行するわけではありません。Agent は、Agent として同じホスト上で現在実行されているすべてのコンテナを調査して、有効にするチェックを決定します。

Agent は、実行中のコンテナを調査する際に、ロードしたいずれかのテンプレートのいずれかのコンテナ識別子にそのコンテナが一致するかどうかをチェックします。そして、一致するたびに、そのコンテナの IP アドレスとポートを代入した静的チェック構成を生成します。さらに、その静的構成を使用してチェックを有効にします。

Agent は、Docker のイベント (コンテナの作成、廃棄、起動、停止) を監視し、イベント発生時に静的チェック構成を有効化、無効化、または再生成します。

## 設定方法

Datadog Docker Agent は、他のコンテナを自動検出します。

Datadog **Host** Agent でオートディスカバリーを使用するには、以下の設定を `datadog.yaml` 構成ファイルに追加します。

```
# Datadog Host Agent 用のオートディスカバリー設定
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```

**Note**: For Kubernetes users, both a [CRI integration][3] and a [CRI-O integration][4] are available.

### タグの抽出

{{< tabs >}}
{{% tab "Docker" %}}

**注**: この機能は、Agent v6.5 以降で使用できます。

Datadog Agent は、`datadog.yaml` ファイルを以下のように構成することで、コンテナラベルと環境変数をメトリクスタグとして抽出できます。

```
docker_labels_as_tags:
  <LABEL_NAME>: <TAG_NAME>

docker_env_as_tags:
  <ENVVAR_NAME>: <TAG_NAME>
```

たとえば、以下のように設定します。

```
docker_labels_as_tags:
  com.docker.compose.service: service_name
```

注: タグは、コンテナの起動時にのみ設定されます。

{{% /tab %}}
{{% tab "Kubernetes" %}}

**注**: この機能は、Agent v6.10 以降で使用できます。

Datadog Agent は、ポッドアノテーションからタグを自動検出できます。このため、タグをポッド全体または個別コンテナに関連付けることができます。この形式をアノテーションのオートディスカバリーに使用します。

```
annotations:
  ad.datadoghq.com/tags: '{"<TAG_NAME>": "<TAG_VALUE>", ...}'
  ad.datadoghq.com/<CONTAINER_IDENTIFIER>.tags: '{"<TAG_NAME>": "<TAG_VALUE>", ...}'
```

オートディスカバリーは、コンテナを**名前**で識別します。__

Datadog Agent は、ポッドのラベルやアノテーションをメトリクスタグとして抽出することもできます。
それには、`datadog.yaml` ファイルを以下のように構成します。

```
kubernetes_pod_labels_as_tags:
  <POD_LABEL>: <TAG_NAME>

kubernetes_pod_annotations_as_tags:
  <POD_ANNOTATIONS>: <TAG_NAME>
```

たとえば、以下のように設定します。

```
kubernetes_pod_labels_as_tags:
  app: kube_app

kubernetes_pod_annotations_as_tags:
  app: kube_app
```

注: タグは、ポッドの起動時にのみ設定されます。

{{% /tab %}}
{{< /tabs >}}

## チェックテンプレートの設定

以下の各**テンプレートソース**セクションで、チェックテンプレートとそのコンテナ識別子を構成する方法を示します。

{{< tabs >}}
{{% tab "Files" %}}

### テンプレートソース: ファイル (Auto-conf)

テンプレートをローカルファイルとして保存する方法はわかりやすく、外部サービスやオーケストレーションプラットフォームを必要としません。この方法の欠点は、テンプレートを変更、追加、または削除するたびに、Agent コンテナを再起動する必要があるという点です。

Agent は、`/conf.d` ディレクトリでオートディスカバリーテンプレートを探します。以下のチェックのデフォルトテンプレートはここに置かれます。

- [Apache][1]
- [Consul][2]
- [CouchDB][3]
- [Couchbase][4]
- [Elasticsearch][5]
- [Etcd][6]
- [Kubernetes_state][7]
- [Kube_dns][8]
- [Kube_proxy][9]
- [Kyototycoon][10]
- [Memcached][11]
- [Redis][12]
- [Riak][13]

6.2.0 (および 5.24.0) 以降、デフォルトテンプレートは、ポートを自動検出するのではなく、監視対象ソフトウェアのデフォルトポートを使用します。別のポートを使用する必要がある場合は、[Docker コンテナラベル](#template-source-docker-label-annotations)または [Kubernetes ポッドアノテーション](#template-source-kubernetes-pod-annotations)で、カスタムオートディスカバリーテンプレートを指定します。

基本的にはこれらのテンプレートで十分ですが、その他のチェックオプションを有効にする場合、複数のコンテナ識別子を使用する場合、テンプレート変数インデックスを使用する場合などは、カスタム Agent チェック構成を使用する必要があります。その場合は、独自の auto-conf ファイルを作成します。これは、以下の方法で用意できます。

1. `docker-datadog-agent` を実行する各ホストにファイルを追加し、datadog-agent コンテナの起動時にコンテナに[そのファイルを含むディレクトリをマウント][14]します。
2. Kubernetes では、[ConfigMaps を使用して][15]ファイルを追加します。

チェック名は、テンプレートファイル名から抽出されます。`checkname` インテグレーションを実行するには、テンプレートファイルを以下のように設定します。

  - `checkname.yaml` という名前を付け、直接 `conf.d` フォルダーに置きます。
  - `conf.d/checkname.d/` フォルダーに置き、ファイル名の最後に `.yaml` を付けます。


### 例: Apache チェック

以下に、`datadog-agent` を使用してパッケージ化された `apache.yaml` テンプレートを示します。

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
```

これは、最小の [Apache チェック構成][16]とほぼ同じですが、`ad_identifiers` オプションがあることがわかります。この必須オプションを使用して、コンテナ識別子を指定できます。オートディスカバリーは、同じホスト上で `httpd` イメージを実行するすべてのコンテナにこのテンプレートを適用します。

_すべての_ `httpd` イメージです。あるコンテナが `library/httpd:latest` を実行し、別のコンテナが `yourusername/httpd:v2` を実行しているとします。オートディスカバリーは、上記のテンプレートを両方のコンテナに適用します。オートディスカバリーは、auto-conf ファイルをロードする際に、ソースが異なる、またはタグが異なる同じ名前のイメージを区別できません。**コンテナイメージには、`library/httpd:latest` ではなく `httpd` などの短い名前を指定する必要があります**。

この制限が問題になる場合、つまり同じイメージを実行する複数のコンテナにそれぞれ異なるチェック構成を適用する必要がある場合は、[ラベルを使用してコンテナを特定][17]します。各コンテナに異なるラベルを指定し、各ラベルをテンプレートファイルの `ad_identifiers` リストに追加します。`ad_identifiers` は、イメージに限らず、_すべて_の種類のコンテナ識別子を配置する場所です。


[1]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/auto_conf.yaml
[2]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[4]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[5]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[6]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[7]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[8]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/kube_proxy/datadog_checks/kube_proxy/data/conf.yaml.example
[10]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[14]: https://github.com/DataDog/datadog-agent
[15]: /ja/agent/basic_agent_usage/kubernetes/#configmap
[16]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[17]: /ja/agent/autodiscovery/#template-source-kubernetes-pod-annotations
{{% /tab %}}
{{% tab "Key-value Store" %}}

### テンプレートソース: key-value ストア

オートディスカバリーでは、[Consul][1]、etcd、および Zookeeper をテンプレートソースとして使用できます。key-value ストアを使用するには、`datadog.yaml` で構成するか、`datadog-agent` コンテナに渡される環境変数で構成する必要があります。

#### datadog.yaml での構成

`datadog.yaml` ファイルで、key-value ストアの `<KV_STORE_IP>` アドレスと `<KV_STORE_PORT>` を以下のように設定します。

```
# Agent がチェック構成を収集するために呼び出すプロバイダー。
# ファイル構成プロバイダーはデフォルトで有効です。設定することは
# できません。
# config_providers:
#   - name: etcd
#     polling: true
#     template_dir: /datadog/check_configs
#     template_url: <KV_STORE_IP>:<KV_STORE_PORT>
#     username:
#     password:

#   - name: consul
#     polling: true
#     template_dir: datadog/check_configs
#     template_url: <KV_STORE_IP>:<KV_STORE_PORT>
#     ca_file:
#     ca_path:
#     cert_file:
#     key_file:
#     username:
#     password:
#     token:

#   - name: zookeeper
#     polling: true
#     template_dir: /datadog/check_configs
#     template_url: <KV_STORE_IP>:<KV_STORE_PORT>
#     username:
#     password:
```

[Agent を再起動][2]して、構成の変更を適用します。

#### 環境変数での構成

key-value ストアがテンプレートソースとして有効になっている場合、Agent はキー `/datadog/check_configs` の下でテンプレートを探します。オートディスカバリーは、以下のような key-value 階層を前提とします。

```
/datadog/
  check_configs/
    <CONTAINER_IDENTIFIER>/
      - check_names: [<CHECK_NAME>]
      - init_configs: [<INIT_CONFIG>]
      - instances: [<INSTANCE_CONFIG>]
    ...
```

各テンプレートは、チェック名、`init_configs`、`instances` の 3 つが組になっています。ここでは、前のセクションのようにオートディスカバリーにコンテナ識別子を指定するための `ad_identifiers` オプションは必要ありません。key-value ストアの場合は、コンテナ識別子が `check_configs` の最初のレベルのキーになります。(また、前のセクションで説明したファイルベースのテンプレートでは、この例のようなチェック名は必要なく、Agent はチェック名をファイル名から推測していました。)

#### 例: Apache チェック

以下の etcd コマンドを実行すると、前のセクションの例と同等の Apache チェックテンプレートが作成されます。

```
etcdctl mkdir /datadog/check_configs/httpd
etcdctl set /datadog/check_configs/httpd/check_names '["apache"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}]'
etcdctl set /datadog/check_configs/httpd/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
```

3 つの値がそれぞれリストであることに注目してください。オートディスカバリーは、共有リストインデックスに基づいて、リスト項目をチェック構成に集約します。この例の場合は、`check_names[0]`、`init_configs[0]`、および `instances[0]` から最初 (かつ唯一) のチェック構成が作成されます。

auto-conf ファイルとは異なり、**key-value ストアの場合は、コンテナ識別子として短いイメージ名 (`httpd` など) も長いイメージ名 (`library/httpd:latest` など) も使用できます**。以下の例では、長いイメージ名が使用されています。

#### 例: Web サイトの可用性を監視する Apache チェック

以下の etcd コマンドを実行すると、同じ Apache テンプレートが作成され、Apache コンテナによって作成された Web サイトが使用可能かどうかを監視する [HTTP チェック][3]テンプレートが追加されます。

```
etcdctl set /datadog/check_configs/library/httpd:latest/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/library/httpd:latest/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/library/httpd:latest/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
```

ここでも、各リストの順番が重要です。Agent は、構成の各部分が 3 つのリストの同じインデックスにある場合にのみ、HTTP チェック構成を正しく生成します (この例では、同じインデックス 1)。


[1]: /ja/integrations/consul
[2]: /ja/agent/guide/agent-commands
[3]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example
{{% /tab %}}
{{% tab "Kubernetes" %}}

### テンプレートソース: Kubernetes ポッドアノテーション

チェックテンプレートを Kubernetes ポッドアノテーションに保存します。オートディスカバリーが有効な場合、Agent は。Kubernetes 上で実行されているかどうかを検出し、チェックテンプレートのすべてのポッドアノテーションを自動的に探します。

Datadog Agent バージョン 6.5 以降では、Kubernetes ポッドアノテーションでログ収集も構成できます。

オートディスカバリーは、以下のようなアノテーションを前提とします。

```yaml
# (...)
metadata:
#(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: '[<CHECK_NAME>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[<INIT_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[<INSTANCE_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: '[<LOG_CONFIG>]'
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
# (...)
```

形式は、key-value ストアの形式に似ています。異なる点は以下のとおりです。

- アノテーションの先頭には `ad.datadoghq.com/` が必要です (key-value ストアの場合、先頭は `/datadog/check_configs/`)。
- アノテーションの場合、オートディスカバリーは、コンテナを**イメージではなく名前**で識別します (auto-conf ファイルおよび key-value ストアの場合と同様)。つまり、`<CONTAINER_IDENTIFIER>` は `.spec.containers[0].image` ではなく `.spec.containers[0].name` と比較されます。__

Kubernetes ポッドを直接定義する (`kind: Pod`) 場合は、各ポッドアノテーションをその `metadata` セクションの直下に追加します (以下の最初の例を参照)。ポッドを Replication Controller、Replica Set、または Deployment を介して_間接的に_定義する場合は、ポッドアノテーションを `.spec.templates.metadata` の下に追加します (以下の 2 つめの例を参照)。

#### ポッドの例: Web サイトの可用性を監視する Apache チェック

以下のポッドアノテーションは、`apache` コンテナ用の 2 つのテンプレート (前のセクションの最後のテンプレートと同等) を定義します。

* `<CONTAINER_IDENTIFIER>` は `apache` です。
* チェック名は `apache` および `http_check` となります。これらのチェックの `<INIT_CONFIG>` 構成、 `<INSTANCE_CONFIG>` 構成、`<LOG_CONFIG>` 構成については個別にドキュメントをご用意しています。 [Apache インテグレーション][1]、または [HTTP チェックインテグレーション][2]のページをご覧ください。

```
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: |
      [
        "apache",
        "http_check"
      ]
    ad.datadoghq.com/apache.init_configs: |
      [
        {},
        {}
      ]
    ad.datadoghq.com/apache.instances: |
      [
        {
          "apache_status_url": "http://%%host%%/server-status?auto"
        },
        {
          "name": "My service",
          "url": "http://%%host%%",
          timeout: 1
        }
      ]
    ad.datadoghq.com/apache.logs: |
      [
        {
          "source":"apache",
          "service":"webapp"
        }
      ]
  labels:
    name: apache
spec:
  containers:
    - name: apache
      image: httpd
      ports:
        - containerPort: 80
```

#### Deployment の例: Apache チェックと HTTP チェック

Deployment からポッドを定義する場合は、テンプレートアノテーションを Deployment のメタデータに追加しないでください。Agent はこれを参照しません。以下のように指定して、アノテーションを追加します。

```
apiVersion: apps/v1beta1
kind: Deployment
metadata: # Don't add templates here
  name: apache-deployment
spec:
  replicas: 2
  template:
    metadata:
      labels:
        name: apache
      annotations:
        ad.datadoghq.com/apache.check_names: |
          [
            "apache",
            "http_check"
          ]
        ad.datadoghq.com/apache.init_configs: |
          [
            {},
            {}
          ]
        ad.datadoghq.com/apache.instances: |
          [
            {
              "apache_status_url": "http://%%host%%/server-status?auto"
            },
            {
              "name": "My service",
              "url": "http://%%host%%",
              timeout: 1
            }
          ]
        ad.datadoghq.com/apache.logs: |
          [
            {
              "source":"apache",
              "service":"webapp"
            }
          ]
    spec:
      containers:
      - name: apache
        image: httpd
        ports:
        - containerPort: 80
```

[1]: /ja/integrations/apache/#setup
[2]: /ja/integrations/http_check/#setup
{{% /tab %}}
{{% tab "Docker" %}}

### テンプレートソース: Docker ラベルアノテーション

Agent は。Docker 上で実行されているかどうかを検出し、チェックテンプレートのすべてのラベルを自動的に探します。

Datadog Agent バージョン 6.2 以降では、コンテナラベルで Docker ログ収集も構成できます。
設定の詳細については、[Docker ログ収集ガイド][1]を参照してください。

オートディスカバリーは、ファイルの種類に応じて、ラベルが以下の例のようになっていることを前提とします。

**Dockerfile**
```
LABEL "com.datadoghq.ad.check_names"='[<CHECK_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

**docker-compose.yaml**
```yaml
labels:
  com.datadoghq.ad.check_names: '[<CHECK_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
  com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
```

**docker run コマンド**
```
-l com.datadoghq.ad.check_names='[<CHECK_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]' -l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

#### Docker の例: NGINX Dockerfile

以下の Dockerfile は、オートディスカバリーを有効にして NGINX コンテナを起動します。

```
FROM nginx

EXPOSE 8080
COPY nginx.conf /etc/nginx/nginx.conf
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

#### Docker Swarm

Docker Cloud の Swarm モードを使用する場合は、以下のようにラベルをイメージに適用する必要があります。

```yaml

version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.check_names: '[<CHECK_NAME>]'
      com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
      com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
      com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'

```


[1]: /ja/agent/docker/log
{{% /tab %}}
{{% tab "Cluster Checks" %}}

### テンプレートソース: Cluster Agent によるクラスターチェック

[クラスターチェック機能][1]は、クラスター外の非コンテナ化リソースを監視します。

[1]: /ja/agent/autodiscovery/clusterchecks
{{% /tab %}}
{{< /tabs >}}

**Note**: Some supported integrations require additional steps for Autodiscovery to work: [Ceph][5], [Varnish][6], [Postfix][7], [Cassandra Nodetools][8], and [Gunicorn][9]. Contact [Datadog support][10] for assistance.

## リファレンス

### サポートされているテンプレート変数

以下のテンプレート変数が Agent によって処理されます。

- コンテナ IP: `host`
  - `"%%host%%"`: ネットワークを自動検出します。単一ネットワークコンテナの場合は、対応する IP を返します。`bridge` ネットワーク IP にフォールバックします。
  - `"%%host_<NETWORK NAME>%%"`: 複数のネットワークにアタッチされている場合に、使用するネットワーク名を指定します (`"%%host_bridge%%"`、`"%%host_myredisnetwork%%"` など)。指定されたネットワーク名が見つからない場合は、`"%%host%%"` と同様に動作します。

- コンテナポート: `port`
  - `"%%port%%"`: 公開ポートを**数値として昇順にソート**した場合に最大のポートが使用されます。たとえば、ポート 80、443、8443 を公開しているコンテナの場合は、ポート 8443 が使用されます。
  - `"%%port_0%%"`: ポートを**数値として昇順にソート**した場合に最初のポートが使用されます。前述のコンテナの場合、`"%%port_0%%` はポート 80、`"%%port_1%%"` はポート 443 を表します。
  - 使用するポートが変わらない場合は、`port` 変数を使用しないでポートを直接指定します。

- コンテナ PID: `pid`
  - `"%%pid%%"`: `docker inspect --format '{{.State.Pid}}' <container>` から返されたコンテナプロセス ID を取得します。

- コンテナホスト名: `hostname` (Agent 6.4 で追加、Docker リスナーのみ)
  - `"%%hostname%%"`: retrieves the `hostname` value from the container configuration. Only use it if the `"%%host%%"` variable cannot fetch a reliable IP (example: [ECS awsvpc mode][11]

- 環境変数: `env` (Agent 6.1 で追加)
  - `"%%env_MYENVVAR%%"`: **Agent プロセスから参照される** `$MYENVVAR` 環境変数の内容を使用します。

### 代替コンテナ識別子: ラベル

コンテナは、コンテナの名前やイメージではなく、ラベルで識別されます。それには、コンテナに `com.datadoghq.ad.check.id: <SOME_LABEL>` というラベルを付け、通常はコンテナの名前やイメージを置く場所に `<SOME_LABEL>` を置きます。たとえば、コンテナに `com.datadoghq.ad.check.id: special-container` というラベルを付けた場合、オートディスカバリーは、`ad_identifiers` リストに `special-container` を含む auto-conf テンプレートをそのコンテナに適用します。

オートディスカバリーは、各コンテナをラベルまたはイメージ/名前 (のいずれか) でのみ識別し、ラベルが優先されます。`com.datadoghq.ad.check.id: special-nginx` というラベルが付き、`nginx` イメージを実行するコンテナに対して、Agent は、コンテナ識別子として `nginx` のみを含むテンプレートを適用しません。

### テンプレートソースの優先度

複数のテンプレートソースから同じチェックタイプのテンプレートを提供する場合、Agent は、以下の順番でテンプレートを検索し、最初に見つかったテンプレートを使用します。

* Kubernetes アノテーション
* ファイル

### コンテナを対象に入れる/除外する

コンテナをオートディスカバリーの対象に入れる、または除外するには、以下の環境変数を使用します。

* `DD_AC_INCLUDE`: 常に対象に入れるコンテナのホワイトリスト規則
* `DD_AC_EXCLUDE`: 除外するコンテナのブラックリスト規則

規則は、コンテナの `image` または `name` に適用される正規表現です。ブラックリスト規則に一致するコンテナは、ホワイトリスト規則に一致するまで、オートディスカバリーの対象になりません。

リストは、スペース区切り文字列形式です。たとえば、`ubuntu` または `debian` イメージのみを監視し、他のイメージを除外する場合は、以下のようにします。

```
DD_AC_EXCLUDE = "image:.*"
DD_AC_INCLUDE = "image:ubuntu, image:debian"
```

特定のコンテナ名を除外するには、以下のようにします。

```
DD_AC_EXCLUDE = "name:dd-agent"
```

**注**: `docker.containers.running`、`.stopped`、`.running.total`、
`.stopped.total` の各メトリクスは、この設定の影響を受けず、常にすべてのコンテナを対象とします。コンテナごとの課金にも影響しません。

#### Docker Cloud にあるデフォルトのコンテナを除外する

以下の構成は、Docker Cloud にあるこれらのコンテナを除外するように Agent に指示します。収集したいコンテナは、ここから削除できます。

```
DD_AC_EXCLUDE = "image:dockercloud/network-daemon, image:dockercloud/cleanup, image:dockercloud/logrotate, image:dockercloud/events, image:dockercloud/ntpd"

DD_AC_INCLUDE = ""
```

注: また、正規表現 `DD_AC_EXCLUDE = "image:dockercloud/*"` を使用してすべてのコンテナを無視することもできます。

## トラブルシューティング

オートディスカバリーで、構成したチェックのいくつかがロードされているかどうかが不明な場合は、Agent の `configcheck` 初期化スクリプトコマンドを使用します。たとえば、デフォルトの `redisdb.d/auto_conf.yaml` ファイルではなく、Docker ラベルアノテーションから Redis テンプレートがロードされていることを確認するには、以下のようにします。

```
# docker exec -it <agent_container_name> agent configcheck
.
..
...
=== Provider: Docker container labels ===

--- redisdb check ---
Instance 1:
host: 172.17.0.3
port: "6379"
tags:
- short_image:redis
- image_tag:latest
- docker_image:redis:latest
- image_name:redis
~
Auto-discovery IDs:
* docker://81e66fd4c948a502b4428417d8cf2ebc58caaff55a6e5879a41887057342aec2
```

**注**: ロードされたが解決されなかったテンプレートをすべて表示するには、`-v` オプションを使用します。

```
# docker exec -it <agent_container_name> agent configcheck -v
.
..
...
=== Resolve warnings ===

redisdb
* No service found with this AD identifier: redis
* Can't resolve the template for redisdb at this moment.

=== Unresolved Configs ===

Auto-discovery IDs: redis
Template:
init_config:
instances:
- host: '%%host%%'
  port: '%%port%%'
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/agent-5-autodiscovery
[2]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example
[3]: /ja/integrations/cri
[4]: /ja/integrations/crio
[5]: /ja/integrations/ceph
[6]: /ja/integrations/varnish/#autodiscovery
[7]: /ja/integrations/postfix
[8]: /ja/integrations/cassandra/#agent-check-cassandra-nodetool
[9]: /ja/integrations/gunicorn
[10]: /ja/help
[11]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking.html
