---
aliases:
- /ja/agent/kubernetes/log
description: Kubernetes 上で Datadog Agent を使用して、コンテナ化されたアプリケーションからのログ収集を構成します。
further_reading:
- link: https://www.datadoghq.com/blog/eks-fargate-logs-datadog
  tag: ブログ
  text: Datadog を使用して Fargate 上の Amazon EKS のログを監視します。
- link: /agent/kubernetes/apm/
  tag: よくあるご質問
  text: アプリケーショントレースの収集
- link: /agent/kubernetes/prometheus/
  tag: よくあるご質問
  text: Prometheus メトリクスの収集
- link: /agent/kubernetes/integrations/
  tag: よくあるご質問
  text: アプリケーションのメトリクスとログを自動で収集
- link: /agent/guide/autodiscovery-management/
  tag: よくあるご質問
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/kubernetes/tag/
  tag: よくあるご質問
  text: コンテナから送信された全データにタグを割り当て
- link: /containers/troubleshooting/log-collection
  tag: よくあるご質問
  text: コンテナログ収集のトラブルシューティング
title: Kubernetes ログの収集
---
このページでは、Kubernetes ログファイルからのログの収集について説明します。

コンテナ化されたアプリケーションが標準出力と標準エラー出力 (`stdout`/`stderr`) にログを書き込むと、コンテナランタイムと Kubernetes が自動的にログを管理します。デフォルトのパターンは、[Kubernetes がこれらのログストリームをファイルとしてホスト上の `/var/log/pods` フォルダーおよび各 Pod とコンテナのサブフォルダーに保存する][13] ことです。

Datadog Agent は、以下の手順に従ってこれらの Kubernetes ログファイルを収集できます。このオプションは、Kubernetes が作成する Pod の一時的な性質に対してスケールしやすく、Docker ソケットからログを収集するよりもリソース効率に優れています。Datadog は Kubernetes におけるログ収集方法としてこの方法を推奨します。

また、Datadog Agent は Docker ソケットを通じて Docker API に対して繰り返しリクエストを行うことでログを収集することもできます。ただし、これには Kubernetes クラスターのコンテナランタイムとして Docker が必要です。これはログファイルを使用する方法よりもリソースを多く消費します。Docker ソケットを使用したログ収集については、[Docker ソケットによるログ収集][1] を参照してください。コンテナ化されたアプリケーションがコンテナ内のログファイルに書き込んでいる場合、ログ収集が複雑になる可能性があります。[log collection from a file](#from-a-container-local-log-file) を参照してください。

## セットアップ{#setup}

### ログ収集{#log-collection}

アプリケーションログの収集を開始する前に、Kubernetes クラスターで Datadog Agent が実行されていることを確認してください。

DaemonSet で手動でログ収集を構成するには、[DaemonSet ログ収集][9] を参照してください。そうでない場合は、以下の手順に従ってください。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` マニフェストを以下のように更新します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

次に、新しいコンフィギュレーションを適用します。

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

追加の例については、[ログ、メトリクス、および APM 収集が有効なサンプルマニフェスト][1] を参照してください。デフォルトで、検出されたすべてのコンテナからログを収集するには、`features.logCollection.containerCollectAll` を `true` に設定できます。`false` (デフォルト) に設定されている場合、ログ収集を有効にするには Autodiscovery のログ構成を指定する必要があります。詳細については、[Log discovery - Filtering](#filtering) を参照してください。

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
{{% /tab %}}
{{% tab "Helm" %}}

Helm でログ収集を有効にするには、次のログ収集構成で [datadog-values.yaml][1] ファイルを更新します。次に、Datadog Helm チャートをアップグレードします。

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```

デフォルトで、検出されたすべてのコンテナからログを収集するには、`datadog.logs.containerCollectAll` を `true` に設定できます。`false` (デフォルト) に設定されている場合、ログ収集を有効にするには Autodiscovery のログ構成を指定する必要があります。詳細については、[Log discovery - Filtering](#filtering) を参照してください。

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

### 非特権{#unprivileged}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
(オプション) 非特権インストールを実行するには、[DatadogAgent カスタムリソース][1] に以下を追加します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

  override:
    nodeAgent:
      securityContext:
        runAsUser: <USER_ID>
        supplementalGroups:
          - <DOCKER_GROUP_ID>
```

- `<USER_ID>` を Agent を実行する UID に置き換えます。
- `<DOCKER_GROUP_ID>` を Docker または containerd ソケットを所有するグループ ID に変更します。

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

(オプション) 非特権インストールを実行するには、`values.yaml` ファイルに以下を追加します。

```yaml
datadog:
  securityContext:
    runAsUser: <USER_ID>
    supplementalGroups:
      - <DOCKER_GROUP_ID>
```

- `<USER_ID>` を Agent を実行する UID に置き換えます。
- `<DOCKER_GROUP_ID>` を Docker または containerd ソケットを所有するグループ ID に変更します。

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">
<strong>非特権インストールの警告</strong>
<br/><br/>
非特権インストールを実行する場合、Agent は次の場所にあるログファイルを読み取る必要があります。 <code>/var/log/pods</code>。
<br/><br/>
containerd ランタイムを使用している場合、 <code>/var/log/pods</code> にあるログファイルは、 <code>root</code> グループのメンバーが読み取り可能です。上記の手順に従うと、Agent は <code>root</code> グループで実行されます。特にアクションは必要ありません。
<br/><br/>
Docker ランタイムを使用している場合、 <code>/var/log/pods</code> にあるログファイルは <code>/var/lib/docker/containers</code>へのシンボリックリンクであり、これは <code>root</code> ユーザーのみがたどることができます。したがって、Docker ランタイムを使用する場合、<code>root</code> 以外の Agent が <code>/var/log/pods</code>内のログを読み取ることはできません。Docker ソケットを Agent コンテナにマウントする必要があります。これにより、Agent は Docker デーモン経由で Pod のログを取得できるようになります。
<br/><br/>
Docker ソケットがマウントされている環境で <code>/var/log/pods</code> からログを収集するには、環境変数 <code>DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE</code> (または <code>logs_config.k8s_container_use_file</code> ( <code>datadog.yaml</code>内の)) を <code>true</code>に設定してください。これにより、Agent はファイル収集モードを使用するように強制されます。
</div>

## ログの検出{#log-discovery}

Kubernetes の Datadog Agent は、DaemonSet によってデプロイされます (Datadog Operator または Helm によって管理されます)。この DaemonSet は、クラスターの各ノードに Agent Pod のレプリカを 1 つスケジュールします。各 Agent Pod は、それぞれのノード上の他の Pod およびコンテナのログを報告します。「Container Collect All」機能が有効になっていると、Datadog Agent はデフォルトのタグセットを使用して、検出されたすべてのコンテナのログを報告します。

### フィルタリング{#filtering}

「Container Collect All」が有効になっている場合、ログを収集するコンテナを設定できます。これは、必要に応じて Datadog Agent のログの収集を防ぐのに役立ちます。これは、Datadog Agent に取得対象を制御する設定を渡すか、特定のログをより明示的に除外するための設定を Kubernetes Pod に渡すことで実現できます。

`DD_CONTAINER_EXCLUDE_LOGS` や `ad.datadoghq.com/logs_exclude` のような方法でログをフィルタリングする場合、Datadog Agent は [Autodiscovery アノテーション][19] や [Autodiscovery 構成ファイル][20] で明示的に定義されたログ収集設定に関係なく、ログ収集を無視します。

「Container Collect All」が無効 (デフォルト) の場合、すべてがデフォルトで除外されるため、フィルタリングを追加する必要はありません。選択した Pod のみを収集対象に含めるには、目的の Pod に対して [Autodiscovery アノテーション][19] または [Autodiscovery 構成ファイル][20] でログ設定を有効にできます。

フィルタリングの詳細については、[コンテナ検出の管理][8] を参照してください。

### タグ付け{#tagging}

Datadog Agent は、Kubernetes コンテナからのログにデフォルトの [Kubernetes タグ][14] およびカスタムで抽出されたタグを付与します。「Container Collect All」が有効な場合、Datadog Agent はコンテナのショートイメージ名に一致する `source` および `service` タグを持つコンテナのログを報告します。たとえば、`gcr.io/owner/example-image:latest` コンテナイメージを使用しているコンテナからのログは、`example-image` が`source`、`service`、および `short_image` タグの値になります。

`service`タグは、[Unified Service Tagging][4] Pod ラベル `tags.datadoghq.com/service: "<SERVICE>"` によって設定することもできます。`source` および `service` 属性の詳細については、[予約済み属性][11] を参照してください。

`source`タグは、[標準のログパイプライン][15] がこのタグを使用してフィルタリングされるため、ログにとって重要です。ただし、これらのパイプラインは必要に応じて完全にカスタマイズできます。ログのタグをさらにカスタマイズする手順については、以下の [Integration Logs](#integration-logs) セクションを参照してください。

## インテグレーションログ{#integration-logs}

[Autodiscovery][10] では、テンプレートを使ってコンテナ上でログ収集 (およびその他の機能) の構成を行うことができます。これを使用して、ログ収集の有効化、タグ付けのカスタマイズ、および高度な収集ルールの追加を行えます。Autodiscovery を使用してインテグレーションのログ収集を構成するには、次のいずれかを実行します。

- 特定の Pod に Autodiscovery アノテーションとしてログ設定を指定し、特定のコンテナのルールを構成します *(推奨)*
- 構成ファイルとしてログ設定を指定し、イメージごとに一致する各コンテナのルールを構成します。

最低限、これらのログ設定には `source` および `service` タグが必要です。`source` タグを Datadog の [標準のログパイプライン][15] のいずれかに一致させることで、ログを自動的に強化できます。Datadog の [パイプラインライブラリ][16] も参照できます。

### Autodiscovery アノテーション{#autodiscovery-annotations}

Autodiscovery では、Agent が自動的にすべてのポッドアノテーションを対象にインテグレーションテンプレートを検索します。

特定のコンテナに特定の構成を適用するには、JSON 形式のログ構成を含むアノテーション `ad.datadoghq.com/<CONTAINER_NAME>.logs` を Pod に追加します。

**注**: Autodiscovery アノテーションはコンテナを名前で識別し、イメージでは識別**しません**。それは `<CONTAINER_NAME>` を `.spec.containers[i].name` に一致させようとし、`.spec.containers[i].image` には一致させません。

<div class="alert alert-info">
Kubernetes Pod を <i>直接</i> ( <code>kind:Pod</code>を使用して) 定義する場合は、以下のセクションに示すように、各 Pod のアノテーションをその <code>metadata</code> セクションに追加してください。
<br/><br/>
Kubernetes Pod を<i>間接的</i> (ReplicationController、ReplicaSet、または Deployment を使用) に定義する場合は、Pod アノテーションを <code>.spec.template.metadata</code>下の Pod テンプレートに追加してください。</div>

#### 単一コンテナの構成{#configure-a-single-container}
Pod 内の特定のコンテナについてログ収集を構成するには、次のアノテーションを Pod に追加します。

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.logs: '[<LOG_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```

#### ログ Autodiscovery アノテーションの例{#example-log-autodiscovery-annotations}

次の Pod アノテーションは、サンプルコンテナのインテグレーションテンプレートを定義します。これは Deployment 自体ではなく、Pod テンプレートのアノテーションで定義されます。このログ構成は、`app` コンテナからのすべてのログに対して、`source:java`、`service:example-app` および追加のタグ `foo:bar` を付与します。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
  labels:
    app: example-app
spec:
  selector:
    matchLabels:
      app: example-app
  template:
    metadata:
      labels:
        app: example-app
      annotations:
        ad.datadoghq.com/app.logs: '[{"source":"java", "service":"example-app", "tags":["foo:bar"]}]'
    spec:
      containers:
        - name: app
          image: owner/example-image:latest
```

#### 2 つの異なるコンテナの構成{#configure-two-different-containers}
Pod 内の 2 つの異なるコンテナ `<CONTAINER_NAME_1>` と `<CONTAINER_NAME_2>` に 2 つの異なるインテグレーションテンプレートを適用するには、次のアノテーションを Pod に追加します。

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME_1>.logs: '[<LOG_CONFIG_1>]'
    # (...)
    ad.datadoghq.com/<CONTAINER_NAME_2>.logs: '[<LOG_CONFIG_2>]'
spec:
  containers:
    - name: '<CONTAINER_NAME_1>'
    # (...)
    - name: '<CONTAINER_NAME_2>'
# (...)
```

### Autodiscovery 構成ファイル{#autodiscovery-configuration-files}
Datadog Agent に構成ファイルを提供することで、Agent は一致するイメージ識別子を使用するコンテナを検出したときに、指定されたインテグレーションを実行できます。これにより、一連のコンテナイメージに適用される汎用的なログ構成を作成できます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`override.nodeAgent.extraConfd.configDataMap` でオーバーライドすることで、インテグレーションごとにログ収集をカスタマイズできます。このメソッドは、ConfigMap を作成し、必要な構成ファイルを Agent コンテナにマウントします。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
            - <CONTAINER_IMAGE>
        
            logs:
            - source: example-source
              service: example-service
```

`<CONTAINER_IMAGE>` は、この設定を適用したいコンテナのショートイメージ名と一致する必要があります。追加の例については、[ConfigMap マッピングを含む][1] サンプルマニフェストを参照してください。

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-extraconfd.yaml
{{% /tab %}}

{{% tab "Helm" %}}
`datadog.confd` 内でインテグレーションごとにログ収集をカスタマイズできます。このメソッドは、ConfigMap を作成し、必要な構成ファイルを Agent コンテナにマウントします。

```yaml
datadog:
  #(...)
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
      - <CONTAINER_IMAGE>
      
      logs:
      - source: example-source
        service: example-service
```

`<CONTAINER_IMAGE>` は、この設定を適用したいコンテナのショートイメージ名と一致する必要があります。

{{% /tab %}}

{{% tab "key-value ストア" %}}
以下の etcd コマンドは、カスタム `password` パラメーターを使用して Redis インテグレーションテンプレートを作成し、正しい `source` および `service` 属性でログにタグ付けします。

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": ["env:prod"]}]'
```

3 つの値はいずれもリストであることに注意してください。Autodiscovery は、共有リストインデックスに基づいてインテグレーション構成にリスト項目を組み立てます。この場合、`check_names[0]`、`init_configs[0]`、および `instances[0]` から最初 (かつ唯一) のチェック構成を構成します。

auto-conf ファイルとは異なり、**key-value ストアはコンテナ識別子としてショートイメージ名またはロングイメージ名を使用できます**。たとえば、`redis` または `redis:latest` です。

Autodiscovery では、[Consul][1]、Etcd、および Zookeeper をインテグレーションテンプレートソースとして使用できます。

key-value ストアを使用するには、Agent の `datadog.yaml` 構成ファイルでそれを構成し、このファイルをコンテナ化された Agent 内にマウントします。または、コンテナ化された Agent に key-value ストアを環境変数として渡します。

#### `datadog.yaml` において{#in-datadogyaml}

`datadog.yaml` ファイルで、key-value ストアの `<KEY_VALUE_STORE_IP>` アドレスと `<KEY_VALUE_STORE_PORT>` を設定します:

  ```yaml
  config_providers:
    - name: etcd
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:

    - name: consul
      polling: true
      template_dir: datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      ca_file:
      ca_path:
      cert_file:
      key_file:
      username:
      password:
      token:

    - name: zookeeper
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:
  ```

次に、[Agent を再起動][2] して、構成の変更を適用します。

#### 環境変数の場合{#in-environment-variables}

key-value ストアがテンプレートソースとして有効になっている場合、Agent はキー `/datadog/check_configs` の下にテンプレートを探します。Autodiscovery は、このような key-value 階層を期待します。

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**注**: key-value ストアを使用している場合、Autodiscovery は特定の構成を特定のコンテナに適用するために、`<CONTAINER_IMAGE>` と `.spec.containers[0].image` の一致を試みることで、コンテナを**イメージ**で識別します。

[1]: /ja/integrations/consul/
[2]: /ja/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

コンテナのショートイメージ名よりも細かい単位でログ構成を一連のコンテナに一致させるには、[Autodiscovery コンテナ識別子][22] を参照してください。

## 高度なログの収集{#advanced-log-collection}

Autodiscovery ログラベルを使用して、高度なログ収集の処理ロジックを適用します。たとえば、以下のようにします。

* [Datadog へ送信する前にログを絞り込む][5]。
* [ログの機密データのスクラビング][6]。
* [複数行の集約の実行][7]。

### コンテナのローカルログファイルから{#from-a-container-local-log-file}

Datadog は、コンテナ化されたアプリケーションにおいて `stdout` と `stderr` の出力ストリームを使用することを推奨しています。これにより、ログ収集をより自動的に設定できます。

ただし、Agent はアノテーションに基づいてファイルから直接ログを収集することもできます。これらのログを収集するには、`ad.datadoghq.com/<CONTAINER_NAME>.logs` を使用し、`type: file` および `path` の設定を行ってください。そのようなアノテーションを持つファイルから収集されたログは、コンテナ自体のログと同じタグセットで自動的にタグ付けされます。Datadog は、コンテナ化されたアプリケーションにおいて `stdout` と `stderr` の出力ストリームを使用することを推奨しています。これにより、ログ収集を自動的に設定できます。詳細については、[Recommended configurations](#recommended-configurations) を参照してください。

これらのファイルパスは、Agent に対して **相対的** なものです。したがって、ログファイルを含むディレクトリをアプリケーションと Agent コンテナの両方にマウントして、Agent が適切に可視化できるようにする必要があります。

たとえば、共有 `hostPath` ボリュームを使用してこれを行うことができます。以下の Pod は、ファイル `/var/log/example/app.log` にログを出力しています。これは `/var/log/example` ディレクトリで行われており、ボリュームと volumeMount がこれを `hostPath` として設定しています。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: logger
  annotations:
    ad.datadoghq.com/busybox.logs: |
      [{
          "type": "file",
          "path": "/var/log/example/app.log",
          "source": "example-source",
          "service": "example-service"
      }]
spec:
  containers:
   - name: busybox
     image: busybox
     command: [ "/bin/sh", "-c", "--" ]
     args: [ "while true; do sleep 1; echo `date` example file log >> /var/log/example/app.log; done;" ]
     volumeMounts:
     - name: applogs
       mountPath: /var/log/example
  volumes:
     - name: applogs
       hostPath:
         path: /var/log/example
```

Agent コンテナに同等のボリュームと VolumeMount パスを設定し、同じログファイルを読み込むことができるようにする必要があります。

```yaml
  containers:
  - name: agent
    # (...)
    volumeMounts:
    - mountPath: /var/log/example
      name: applogs
    # (...)
  volumes:
  - name: applogs
    hostPath:
      path: /var/log/example
    # (...)
```
#### 推奨される構成{#recommended-configurations}
- この戦略は特定の Pod では有効ですが、複数のアプリケーションで使用すると煩雑になる可能性があります。複数のレプリカが同じログパスを使用している場合にも、問題が発生する可能性があります。可能であれば、Datadog は [Autodiscovery テンプレート変数][17] `%%kube_pod_name%%` を活用することを推奨しています。たとえば、`path` をこの変数を参照するように設定できます。`"path": "/var/log/example/%%kube_pod_name%%/app.log"`アプリケーション Pod は、この新しいパスを使用してログファイルを書き込む必要があります。[Downward API][18] を使用して、アプリケーションがその Pod 名を特定するのに役立てることができます。

- この種のアノテーションをコンテナで使用する場合、`stdout`および `stderr` のログはコンテナから自動的に収集されません。コンテナの出力ストリームとファイルの両方からの収集が必要な場合は、アノテーションでこれを明示的に有効にしてください。たとえば、以下のとおりです。
  ```yaml
  ad.datadoghq.com/<CONTAINER_IMAGE>.logs: |
    [
      {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
      {"source":"container","service":"example-service"}
    ]
  ```

- この種の組み合わせを使用する場合、`source` と `service` にはファイルから収集されたログのデフォルト値がないため、アノテーションで明示的に設定する必要があります。

## トラブルシューティング{#troubleshooting}

トラブルシューティング手順については、[コンテナログ収集トラブルシューティング][21] を参照してください。

##  参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/log-collection-with-docker-socket/
[2]: /ja/agent/kubernetes/
[3]: /ja/integrations/#cat-autodiscovery
[4]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[5]: /ja/agent/logs/advanced_log_collection/?tab=kubernetes#filter-logs
[6]: /ja/agent/logs/advanced_log_collection/?tab=kubernetes#scrub-sensitive-data-from-your-logs
[7]: /ja/agent/logs/advanced_log_collection/?tab=kubernetes#multi-line-aggregation
[8]: /ja/agent/guide/autodiscovery-management/
[9]: /ja/containers/guide/kubernetes_daemonset/#log-collection
[10]: /ja/getting_started/containers/autodiscovery
[11]: /ja/logs/log_configuration/attributes_naming_convention/
[12]: /ja/getting_started/tagging/assigning_tags/#integration-inheritance
[13]: https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-location-node
[14]: /ja/containers/kubernetes/tag
[15]: /ja/logs/log_configuration/pipelines/?tab=source#integration-pipelines
[16]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[17]: /ja/containers/guide/template_variables/
[18]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/
[19]: /ja/containers/kubernetes/log/?tab=helm#autodiscovery-annotations
[20]: /ja/containers/kubernetes/log/?tab=helm#autodiscovery-configuration-files
[21]: /ja/containers/troubleshooting/log-collection/?tab=datadogoperator
[22]: /ja/containers/guide/ad_identifiers/