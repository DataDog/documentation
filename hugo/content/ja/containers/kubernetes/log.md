---
aliases:
- /ja/agent/kubernetes/log
description: Datadog Agent を使用して、Kubernetes 上で実行されているコンテナ化されたアプリケーションからログを収集するよう構成します。
further_reading:
- link: https://www.datadoghq.com/blog/eks-fargate-logs-datadog
  tag: ブログ
  text: Datadog を使用して Amazon EKS on Fargate のログを監視する
- link: /agent/kubernetes/apm/
  tag: ドキュメント
  text: アプリケーションのトレースを収集する
- link: /agent/kubernetes/prometheus/
  tag: ドキュメント
  text: Prometheus のメトリクスを収集する
- link: /agent/kubernetes/integrations/
  tag: ドキュメント
  text: アプリケーションのメトリクスやログを自動的に収集する
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集を一部のコンテナのみに制限する
- link: /agent/kubernetes/tag/
  tag: ドキュメント
  text: コンテナから出力されるすべてのデータにタグを付ける
- link: /containers/troubleshooting/log-collection
  tag: ドキュメント
  text: コンテナのログ収集のトラブルシューティング
- link: https://www.datadoghq.com/architecture/monitoring-container-apps-logs/
  tag: アーキテクチャセンター
  text: 'コンテナアプリの監視: ログ'
title: Kubernetes のログ収集
---
このページでは、Kubernetes のログファイルからログを収集する方法について説明します。

コンテナ化されたアプリケーションが標準出力および標準エラー (`stdout`/`stderr`) にログを書き込む場合、コンテナランタイムと Kubernetes が自動的にログを管理します。デフォルトでは、[Kubernetes はこれらのログストリームをファイルとして保存します][13]。保存先はホスト上の `/var/log/pods` フォルダと、各 Pod およびコンテナのサブフォルダです。

Datadog Agent は、以下の手順でこれらのコンテナの Kubernetes のログファイルを収集できます。このオプションは、Kubernetes が作成する Pod の一時的な性質に適しており、Docker ソケットからログを収集するよりもリソース効率が高くなります。Datadog は、Kubernetes でのログ収集にこの方法を推奨しています。

また、Datadog Agent は、Docker ソケット経由で Docker API に繰り返しリクエストを送信してログを収集することもできます。ただし、Kubernetes クラスターのコンテナランタイムとして Docker が必要です。これには、ログファイルを使用する場合よりも多くのリソースが必要です。Docker ソケットを使用してログを収集する方法については、[Docker ソケットを使用したログの収集][1] を参照してください。コンテナ化されたアプリケーションがコンテナ内に保存されたログファイルに書き込んでいる場合、ログ収集が複雑になる可能性があります。[ファイルからのログ収集](#from-a-container-local-log-file)を参照してください。

## セットアップ {#setup}

### ログ収集 {#log-collection}

アプリケーションログの収集を開始する前に、Kubernetes クラスターで Datadog Agent が実行されていることを確認してください。

DaemonSet でログ収集を手動で構成する方法については、[DaemonSet ログ収集][9] を参照してください。それ以外の場合は、以下の手順に従ってください。

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

次に、新しい構成を適用します。

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

追加の例については、[ログ、メトリクス、APM 収集が有効なサンプルマニフェスト][1] を参照してください。`features.logCollection.containerCollectAll` を `true` に設定すると、デフォルトですべての検出されたコンテナからログを収集できます。`false` (デフォルト) に設定されている場合、ログ収集を有効にするには Autodiscovery のログ構成を指定する必要があります。詳細については、[ログの検出 - フィルタリング](#filtering)を参照してください。

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
{{% /tab %}}
{{% tab "Helm" %}}

Helm でログ収集を有効にするには、[datadog-values.yaml][1] ファイルを以下のログ収集構成で更新します。次に、Datadog Helm チャートをアップグレードします。

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```

`datadog.logs.containerCollectAll` を `true` に設定すると、デフォルトですべての検出されたコンテナからログを収集できます。`false` (デフォルト) に設定されている場合、ログ収集を有効にするには Autodiscovery のログ構成を指定する必要があります。詳細については、[ログの検出 - フィルタリング](#filtering)を参照してください。

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

### 非特権 {#unprivileged}

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

-  `<USER_ID>` を Agent の実行に使用する UID に置き換えます。
-  `<DOCKER_GROUP_ID>` を Docker または containerd ソケットを所有するグループ ID に置き換えます。

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

-  `<USER_ID>` を Agent を実行する UID に置き換えます。
-  `<DOCKER_GROUP_ID>` を Docker または containerd ソケットを所有するグループ ID に置き換えます。

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">
<strong>非特権インストールに関する警告</strong>
<br/><br/>
非特権インストールを実行する場合、Agent は <code>/var/log/pods</code>のログファイルを読み取れる必要があります。
<br/><br/>
containerd ランタイムを使用している場合、 <code>/var/log/pods</code> のログファイルは <code>root</code> グループのメンバーが読み取れます。上記の手順では、Agent は <code>root</code> グループで実行されます。操作は不要です。
<br/><br/>
Docker ランタイムを使用している場合、 <code>/var/log/pods</code> のログファイルは <code>/var/lib/docker/containers</code>へのシンボリックリンクであり、 <code>root</code> ユーザーのみがそのリンク先をたどることができます。そのため、Docker ランタイムでは、<code>root</code> 以外の Agent は <code>/var/log/pods</code>のログを読み取れません。Docker ソケットを Agent コンテナにマウントする必要があります。これにより、Docker デーモンを介して Pod ログを取得できるようになります。
<br/><br/>
Docker ソケットがマウントされている場合に <code>/var/log/pods</code> からログを収集するには、環境変数 <code>DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE</code> ( <code>logs_config.k8s_container_use_file</code> は <code>datadog.yaml</code>におけるもの) を <code>true</code>に設定します。これにより、Agent は強制的にファイル収集モードを使用します。
</div>

## ログの検出 {#log-discovery}

Kubernetes の Datadog Agent は、DaemonSet (Datadog Operator または Helm によって管理) によってデプロイされます。この DaemonSet は、クラスターの各ノードに Agent Pod のレプリカを 1 つずつスケジュールします。各 Agent Pod は、それぞれのノードにある他の Pod やコンテナのログを報告します。[Container Collect All] 機能が有効な場合、Agent は検出されたすべてのコンテナのログをデフォルトのタグセットとともに報告します。

### フィルタリング {#filtering}

[Container Collect All] が有効な場合、ログの収集対象とするコンテナを設定できます。これは、必要に応じて Datadog Agent のログが収集されるのを防ぐのに役立ちます。これを行うには、Datadog Agent に構成を渡して収集対象を制御するか、Kubernetes Pod に構成を渡して特定のログをより明示的に除外します。

`DD_CONTAINER_EXCLUDE_LOGS` や `ad.datadoghq.com/logs_exclude` のような方法でログをフィルタリングする場合、[Autodiscovery アノテーション][19]、[`DatadogInstrumentation` CRD][23]、または [Autodiscovery 構成ファイル][20] で明示的に定義されたログ収集構成に関係なく、Agent はログ収集を無視します。

[Container Collect All] が無効 (デフォルト) の場合、すべてがデフォルトで除外されるため、フィルタリングを追加する必要はありません。選択した Pod のみを収集対象にするには、対象の Pod に対して [Autodiscovery アノテーション][19]、[`DatadogInstrumentation` CRD][23]、または [Autodiscovery 構成ファイル][20] を使用してログ構成を有効にします。

フィルタリングの詳細については、[コンテナ検出の管理][8] を参照してください。

### タグ付け {#tagging}

Datadog Agent は、Kubernetes コンテナからのログにデフォルトの [Kubernetes タグ][14] と、抽出されたカスタムタグを付与します。[Container Collect All] が有効な場合、Agent はコンテナのショートイメージ名と一致する `source` タグおよび `service` タグを持つコンテナのログを報告します。例えば、`gcr.io/owner/example-image:latest` コンテナイメージを使用するコンテナからのログには、`source`、`service`、および `short_image` タグの値として `example-image` が設定されます。

`service` タグは、[Unified Service Tagging][4] の Pod ラベル `tags.datadoghq.com/service: "<SERVICE>"` によって設定することもできます。`source` および `service` 属性について詳しくは、[予約済み属性][11] を参照してください。

`source` タグはログにとって重要です。これは、[すぐに使用できるログパイプライン][15] がこのタグを使用してフィルタリングされるためです。ただし、これらのパイプラインは必要に応じて完全にカスタマイズできます。ログのタグをさらにカスタマイズする手順については、以下の[インテグレーションログ](#integration-logs)セクションを参照してください。

## インテグレーションログ {#integration-logs}

[Autodiscovery][10] を使用すると、テンプレートを使用してコンテナのログ収集やその他の機能を構成できます。ログ収集を構成するには、次のいずれかの方法を使用します。

- [Autodiscovery アノテーション](#autodiscovery-annotations) (推奨)
- [`DatadogInstrumentation`CRD](#datadoginstrumentation-crd) (新規)
- [Autodiscovery 構成ファイル](#autodiscovery-configuration-files)

これらのログ構成に `source` タグおよび `service` タグを設定することを強く推奨します。`source` タグを Datadog の [すぐに使用できるログパイプライン][15] のいずれかに一致させると、ログが自動的に強化されます。また、[Datadog のパイプラインライブラリ][16] も参照できます。`service` タグは [Unified Service Tagging][4] を強化し、ログを同じサービスのメトリクスやトレースとリンクさせます。`source` と `service` が省略された場合、Agent は (設定されている場合は) Unified Service Tagging の `service` タグにフォールバックし、それ以外の場合はコンテナのショートイメージ名を使用します。

### Autodiscovery アノテーション {#autodiscovery-annotations}

Autodiscovery を使用すると、Agent はすべての Pod アノテーションからインテグレーションテンプレートを自動的に検索します。

特定のコンテナに特定の構成を適用するには、JSON 形式のログ構成を含むアノテーション `ad.datadoghq.com/<CONTAINER_NAME>.logs` を Pod に追加します。

**注**: Autodiscovery アノテーションは、イメージ**ではなく**、名前でコンテナを識別します。`<CONTAINER_NAME>` を `.spec.containers[i].name` と照合しようとします。`.spec.containers[i].image` とは照合しません。

<div class="alert alert-info">
Kubernetes Pod を<i>直接</i>定義する場合 ( <code>kind:Pod</code>を使用)、次のセクションに示すように、各 Pod の <code>metadata</code> セクションにアノテーションを追加します。
<br/><br/>
Kubernetes Pod を<i>間接的に</i>定義する場合 (レプリケーションコントローラー、ReplicaSet、または Deployment を使用)、 <code>.spec.template.metadata</code>の下にある Pod テンプレートに Pod アノテーションを追加します。</div>

#### 単一のコンテナを構成する{#configure-a-single-container}
Pod 内の特定のコンテナのログ収集を構成するには、Pod に次のアノテーションを追加します。

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

#### ログ Autodiscovery アノテーションの例 {#example-log-autodiscovery-annotations}

次の Pod アノテーションは、例として示すコンテナのインテグレーションテンプレートを定義します。これは Deployment 自体ではなく、Pod テンプレートのアノテーション内で定義されます。このログ構成は、`app` コンテナからのすべてのログに、`source:java`、`service:example-app`、および追加タグ `foo:bar` を設定します。

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

#### 2 つの異なるコンテナを構成する {#configure-two-different-containers}
Pod 内の 2 つの異なるコンテナ `<CONTAINER_NAME_1>` および `<CONTAINER_NAME_2>` に 2 つの異なるインテグレーションテンプレートを適用するには、Pod に次のアノテーションを追加します。

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

### DatadogInstrumentation CRD{#datadoginstrumentation-crd}

Pod や Deployment にアノテーションを付ける代わりに、[`DatadogInstrumentation` カスタムリソース][23] を使用してログ収集を構成できます。次の例は、`app` Deployment の一部である `example` コンテナ用です。

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: example-logs
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: example
  config:
    logs:
      - containerName: app
        source: java
        service: example-app
        tags:
          - foo:bar
```

### Autodiscovery 構成ファイル {#autodiscovery-configuration-files}
Datadog Agent に構成ファイルを提供することで、一致するイメージ識別子を使用するコンテナを検出した際に、Agent が指定されたインテグレーションを実行するようにできます。これにより、一連のコンテナイメージに適用される汎用的なログ構成を作成できます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`override.nodeAgent.extraConfd.configDataMap` でオーバーライドすることにより、インテグレーションごとにログ収集をカスタマイズできます。このメソッドは ConfigMap を作成し、目的の構成ファイルを Agent コンテナにマウントします。

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

`<CONTAINER_IMAGE>` は、これを適用する対象のコンテナのショートイメージ名と一致させる必要があります。その他の例については、[ConfigMap マッピングを使用した][1] サンプルマニフェストを参照してください。

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-extraconfd.yaml
{{% /tab %}}

{{% tab "Helm" %}}
`datadog.confd` 内でインテグレーションごとにログ収集をカスタマイズできます。このメソッドは ConfigMap を作成し、目的の構成ファイルを Agent コンテナにマウントします。

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

`<CONTAINER_IMAGE>` は、これを適用する対象のコンテナのショートイメージ名と一致させる必要があります。

{{% /tab %}}

{{% tab "キーバリューストア" %}}
以下の etcd コマンドは、カスタム `password` パラメータを持つ Redis インテグレーションテンプレートを作成し、正しい `source` および `service` 属性でログにタグを付けます。

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": ["env:prod"]}]'
```

3 つの値はそれぞれリストであることに注意してください。Autodiscovery は、共有リストインデックスに基づいて、リストの項目をインテグレーション構成に組み立てます。この場合、`check_names[0]`、`init_configs[0]`、および `instances[0]` から最初 (かつ唯一) のチェック構成を作成します。

auto-conf ファイルとは異なり、**キーバリューストアでは、コンテナ識別子として短いイメージ名または長いイメージ名を使用できます。**例えば、`redis` または `redis:latest` などです。

Autodiscovery では、[Consul][1]、Etcd、および Zookeeper をインテグレーションテンプレートのソースとして使用できます。

キーバリューストアを使用するには、Agent の `datadog.yaml` 構成ファイルで設定し、このファイルをコンテナ化された Agent 内にマウントします。または、キーバリューストアを環境変数としてコンテナ化された Agent に渡すこともできます。

#### `datadog.yaml` 内{#in-datadogyaml}

`datadog.yaml` ファイルで、キーバリューストアの `<KEY_VALUE_STORE_IP>` アドレスと `<KEY_VALUE_STORE_PORT>` を設定します。

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

その後、[Agent を再起動][2] して構成の変更を適用します。

#### 環境変数では {#in-environment-variables}

キーバリューストアをテンプレートソースとして有効にすると、Agent は `/datadog/check_configs` というキーの下でテンプレートを探します。Autodiscovery は、次のようなキーバリュー階層を想定しています。

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**注**: 特定のコンテナに特定の構成を適用する場合、キーバリューストアを使用すると、Autodiscovery は `<CONTAINER_IMAGE>` と `.spec.containers[0].image` を照合して、**image** によってコンテナを識別します。

[1]: /ja/integrations/consul/
[2]: /ja/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

コンテナのショートイメージ名よりも細かい粒度でログ構成を一連のコンテナに適用するには、[Autodiscovery コンテナ識別子][22] を参照してください。

## 高度なログ収集 {#advanced-log-collection}

Autodiscovery ログラベルを使用して、高度なログ収集処理ロジックを適用します。例:

* [Datadog に送信する前にログをフィルタリング][5]。
* [ログから機密データを削除][6]。
* [複数行の集約に進む][7]。

### コンテナのローカルログファイルから {#from-a-container-local-log-file}

Datadog では、コンテナ化されたアプリケーションに対して `stdout` および `stderr` 出力ストリームを使用することを推奨しています。これにより、ログ収集をより自動的に設定できます。

ただし、Agent はアノテーションに基づいてファイルから直接ログを収集することもできます。これらのログを収集するには、`ad.datadoghq.com/<CONTAINER_NAME>.logs` および `type: file` 構成で `path` を使用します。このようなアノテーションが付いたファイルから収集されたログには、コンテナ自体から送信されるログと同じタグセットが自動的に付与されます。Datadog では、コンテナ化されたアプリケーションに対して `stdout` および `stderr` 出力ストリームを使用することを推奨しています。これにより、ログ収集を自動的に設定できます。詳細については、[推奨構成](#recommended-configurations)を参照してください。

これらのファイルパスは、Agent コンテナからの**相対パス**です。そのため、Agent が適切にログファイルを参照できるように、ログファイルを含むディレクトリをアプリケーションコンテナと Agent コンテナの両方にマウントする必要があります。

例えば、共有 `hostPath` ボリュームを使用してこれを行うことができます。以下の Pod は、`/var/log/example/app.log` というファイルにログを出力しています。これは `/var/log/example` ディレクトリで行われ、volume と volumeMount によってこれが `hostPath` として設定されています。

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

Agent コンテナが同じログファイルを読み取れるように、対応する volume および volumeMount パスを Agent コンテナに設定する必要があります。

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
#### 推奨構成 {#recommended-configurations}
- この方法は特定の Pod では有効ですが、この方法を使用するアプリケーションが複数あると煩雑になる可能性があります。複数のレプリカが同じログパスを使用している場合も、問題が発生する可能性があります。可能であれば、Datadog は [Autodiscovery テンプレート変数][17] `%%kube_pod_name%%` を活用することを推奨します。例えば、`path` を設定して、この変数 `"path": "/var/log/example/%%kube_pod_name%%/app.log"` を参照させることができます。その場合、アプリケーション Pod もこの新しいパスに合わせてログファイルを書き込む必要があります。[Downward API][18] を使用して、アプリケーションが自身の Pod 名を特定できるようにします。

- コンテナでこの種のアノテーションを使用する場合、`stdout` および `stderr` のログはコンテナから自動的に収集されません。コンテナの出力ストリームとファイルの両方から収集する必要がある場合は、アノテーションでこれを明示的に有効にします。例:
  ```yaml
  ad.datadoghq.com/<CONTAINER_IMAGE>.logs: |
    [
      {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
      {"source":"container","service":"example-service"}
    ]
  ```

- この種の組み合わせを使用する場合、`source` および `service` にはファイルから収集されるログのデフォルト値がないため、アノテーションで明示的に設定する必要があります。

## トラブルシューティング {#troubleshooting}

トラブルシューティングの手順については、[コンテナログ収集のトラブルシューティング][21] を参照してください。

## 詳細情報 {#further-reading}

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
[23]: /ja/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/