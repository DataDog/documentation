---
aliases:
- /ja/agent/kubernetes/log
description: Kubernetes 上で Datadog エージェントを使用してコンテナ化されたアプリケーションからログ収集を構成します。
further_reading:
- link: https://www.datadoghq.com/blog/eks-fargate-logs-datadog
  tag: ブログ
  text: Datadog を使用して Fargate 上の Amazon EKS からログを監視します。
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

コンテナ化されたアプリケーションが標準出力とエラー (`stdout`/`stderr`) にログを書き込むと、コンテナランタイムと Kubernetes が自動的にログを管理します。デフォルトでは、[Kubernetes がこれらのログストリームをファイルとして保存する][13]ため、ホスト上の `/var/log/pods` フォルダ及び各 Pod とコンテナのサブフォルダに格納されます。

Datadog エージェントは、以下の手順を使用してこれらの Kubernetes ログファイルを収集できます。このオプションは、Kubernetes が作成する Pod の一時的な性質に対してスケーラブルであり、Docker ソケットからログを収集するよりもリソース効率が良いです。Datadog は Kubernetes におけるログ収集のためにこの方法を推奨しています。

また、Datadog エージェントは Docker ソケットを通じて Docker API への繰り返しのリクエストによってもログを収集できます。ただし、これには Kubernetes クラスターのコンテナランタイムとして Docker が必要です。これはログファイルを使用するよりもリソースを多く消費します。Docker ソケットを使用してログを収集する方法については、[Docker ソケットを使用したログ収集][1]を参照してください。コンテナ化されたアプリケーションがコンテナ内に保存されたログファイルに書き込んでいる場合、ログ収集が複雑になる可能性があります。[ファイルからのログ収集](#from-a-container-local-log-file)を参照してください。

## セットアップ {#setup}

### ログ収集 {#log-collection}

アプリケーションログの収集を開始する前に、Kubernetes クラスターで Datadog Agent が実行されていることを確認してください。

DaemonSet で手動でログ収集を構成するには、[DaemonSet ログ収集][9]を参照してください。そうでない場合は、以下の手順に従ってください：

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` マニフェストを以下のように更新します：

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

追加の例については、[ログ、メトリクス、および APM 収集が有効なサンプルマニフェスト][1]を参照してください。デフォルトで、すべての発見されたコンテナからログを収集するには、`features.logCollection.containerCollectAll` を `true` に設定できます。`false`（デフォルト）に設定されている場合、ログ収集を有効にするために Autodiscovery ログ構成を指定する必要があります。詳細については、[ログの発見 - フィルタリング](#filtering)を参照してください。

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
{{% /tab %}}
{{% tab "Helm" %}}

Helm でログの収集を有効にするには、次のログ収集構成で [datadog-values.yaml][1] ファイルを更新してください。次に、Datadog Helm チャートをアップグレードします：

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```

デフォルトで、すべての発見されたコンテナからログを収集するには、`datadog.logs.containerCollectAll` を `true` に設定できます。`false`（デフォルト）に設定されている場合、ログ収集を有効にするために Autodiscovery ログ構成を指定する必要があります。詳細については、[ログの発見 - フィルタリング](#filtering)を参照してください。

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

### 非特権 {#unprivileged}

{{< tabs >}}
{{% tab "Datadog OperatorDatadog オペレーター" %}}
（オプション）非特権インストールを実行するには、[DatadogAgent カスタムリソース][1] に以下を追加してください：

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

-  `<USER_ID>` をエージェントを実行する UID に置き換えます。
-  `<DOCKER_GROUP_ID>` を Docker または containerd ソケットを所有するグループ ID に置き換えます。

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

（オプション）非特権インストールを実行するには、`values.yaml` ファイルに以下を追加してください：

```yaml
datadog:
  securityContext:
    runAsUser: <USER_ID>
    supplementalGroups:
      - <DOCKER_GROUP_ID>
```

-  `<USER_ID>` をエージェントを実行する UID に置き換えます。
-  `<DOCKER_GROUP_ID>` を Docker または containerd ソケットを所有するグループ ID に置き換えます。

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">
<strong>非特権インストールに関する警告</strong>
<br/><br/>
非特権インストールを実行する場合、エージェントはログファイルを読み取る必要があります。 <code>/var/log/pods</code>です。
<br/><br/>
containerd ランタイムを使用している場合、ログファイルは <code>/var/log/pods</code> のメンバーが読み取ることができます。 <code>root</code> グループ。上記の手順に従うことで、Agent は <code>root</code> グループ。特別な操作は必要ありません。
<br/><br/>
Docker ランタイムを使用している場合、ログファイルは <code>/var/log/pods</code> のシンボリックリンクです。 <code>/var/lib/docker/containers</code>、これは特定のユーザーのみがアクセス可能です。 <code>root</code> ユーザー。その結果、Docker ランタイムでは、非-<code>root</code> その結果、Docker ランタイムでは、Agent 以外のプロセスがログを読み取ることはできません。 <code>/var/log/pods</code>Docker ソケットはエージェントコンテナにマウントする必要があります。そうすることで、Docker デーモンを通じて Pod ログを取得できます。
<br/><br/>
からログを収集するには、 <code>/var/log/pods</code> Docker ソケットがマウントされているときに、環境変数を設定します。 <code>DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE</code> （または <code>logs_config.k8s_container_use_file</code> に <code>datadog.yaml</code>) を <code>true</code>に設定します。これにより、エージェントはファイル収集モードを使用することが強制されます。
</div>

## ログ発見 {#log-discovery}

Kubernetes の Datadog エージェントは、DaemonSet によってデプロイされます（Datadog オペレーターまたは Helm によって管理されます）。この DaemonSet は、クラスターの各ノードにエージェント Pod のレプリカを 1 つスケジュールします。各エージェント Pod は、それぞれのノード上の他の Pod およびコンテナのログを報告する責任があります。「コンテナすべてを収集」機能が有効になっていると、Datadog Agentはデフォルトのタグのセットを使用して、発見されたすべてのコンテナのログを報告します。

### フィルタリング {#filtering}

「コンテナすべてを収集」が有効になっていると、ログを収集したいコンテナを設定できます。これは、必要に応じて Datadog エージェントのログの収集を防ぐのに役立ちます。これは、Datadog エージェントに何を取得するかを制御するための設定を渡すか、特定のログをより明示的に除外するための設定を Kubernetes Pod に渡すことで実行できます。

`DD_CONTAINER_EXCLUDE_LOGS`や`ad.datadoghq.com/logs_exclude`のような方法でログをフィルタリングする際、Datadog Agentは[Autodiscoveryアノテーション][19]や[Autodiscovery設定ファイル][20]で明示的に定義されたログ収集設定に関係なく、ログ収集を無視します。

「コンテナすべてを収集」が無効（デフォルト）になっている場合、すべてがデフォルトで除外されるため、フィルタリングを追加する必要はありません。選択した Pod のみの収集を行うには、対象の Pod に対して [Autodiscovery アノテーション][19] または [Autodiscovery 設定ファイル][20] でログ設定を有効にできます。

フィルタリングの詳細については、[Container Discovery Management][8]を参照してください。

### タグ付け{#tagging}

Datadog Agentは、Kubernetesコンテナからのログにデフォルトの[Kubernetesタグ][14]を付け、カスタムで抽出されたタグも付けます。「コンテナすべてを収集」が有効になっている場合、エージェントはコンテナのショートイメージ名に一致する`source`および`service`タグを持つコンテナのログを報告します。例えば、`gcr.io/owner/example-image:latest`コンテナイメージを使用しているコンテナからのログは、`example-image`が`source`、`service`、および`short_image`タグの値になります。

`service`タグは、[Unified Service Tagging][4] Podラベル `tags.datadoghq.com/service: "<SERVICE>"` によっても設定できます。`source`および`service`属性の詳細については、[予約済み属性][11]を参照してください。

`source`タグは、[ログパイプライン][15]がこのタグを使用してフィルタリングされるため、ログにとって重要です。ただし、これらのパイプラインは必要に応じて完全にカスタマイズできます。ログのタグをさらにカスタマイズするためのステップは、下の[インテグレーションログ](#integration-logs)セクションで確認できます。

## インテグレーションログ{#integration-logs}

[オートディスカバリー][10]では、テンプレートを使ってコンテナ上でログ収集 (およびその他の機能) の構成を行うことができます。これを使用して、ログ収集を有効にし、タグのカスタマイズを行い、高度な収集ルールを追加できます。Autodiscovery を使用してインテグレーションのログ収集を構成するには、次のいずれかを行うことができます：

- 特定の Pod に Autodiscovery アノテーションとしてログ設定を指定し、特定のコンテナ*のルールを構成します（推奨）*
- 設定ファイルとしてログ設定を指定し、イメージごとに一致するコンテナごとにルールを構成します。

最低限、これらのログ設定には `source` および `service` タグが必要です。`source`タグをDatadogの[あらかじめ用意されたログパイプライン][15]のいずれかに一致させることで、ログを自動的に強化するのに役立つかもしれません。Datadog の [パイプラインライブラリ][16] も参照できます。

### Autodiscovery アノテーション {#autodiscovery-annotations}

Autodiscovery では、Agent が自動的にすべての Pod アノテーションを対象にインテグレーションテンプレートを検索します。

特定のコンテナに特定の構成を適用するには、JSON 形式のログ構成を含むアノテーション `ad.datadoghq.com/<CONTAINER_NAME>.logs` を Pod に追加します。

**注意**: Autodiscovery アノテーションは、コンテナを名前で識別します。 **イメージではありません。**それは `<CONTAINER_NAME>` を `.spec.containers[i].name` に一致させようとし、`.spec.containers[i].image` には一致させません。

<div class="alert alert-info">
Kubernetes Pods を <i>直接</i> 定義する場合（ <code>kind:Pod</code>）、各 Pod のアノテーションをその <code>metadata</code> セクションに追加します（以下のセクションに示すように）。
<br/><br/>
Kubernetes Pods を <i>間接的に</i> 定義する場合（レプリケーションコントローラー、ReplicaSets、または Deployments を使用）、Pod テンプレートの下に Pod アノテーションを追加します。 <code>.spec.template.metadata</code>.</div>

#### 単一コンテナの構成 {#configure-a-single-container}
Pod 内の特定のコンテナについてログ収集を構成するには、次のアノテーションを Pod に追加します:

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

#### 例のログ Autodiscovery アノテーション {#example-log-autodiscovery-annotations}

以下の Pod アノテーションは、例のコンテナのインテグレーションテンプレートを定義します。これは、Deployment 自体ではなく、Pod テンプレートのアノテーション内で定義されています。このログ構成は、`app` コンテナからのすべてのログを、タグ `source:java`、`service:example-app`、および追加のタグ `foo:bar` で設定します。

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

#### 2つの異なるコンテナの構成 {#configure-two-different-containers}
Pod 内の 2 つの異なるコンテナ `<CONTAINER_NAME_1>` と `<CONTAINER_NAME_2>` に 2 つの異なるインテグレーションテンプレートを適用するには、次のアノテーションを Pod に追加します:

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

### Autodiscovery構成ファイル {#autodiscovery-configuration-files}
Datadog Agent に構成ファイルを提供することで、Agent が一致するイメージ識別子を使用してコンテナを発見したときに指定されたインテグレーションを実行するようにできます。これにより、一連のコンテナイメージに適用される汎用ログ構成を作成できます。

{{< tabs >}}
{{% tab "Datadog OperatorDatadog オペレーター" %}}
内で`override.nodeAgent.extraConfd.configDataMap`オーバーライドを使用して、統合ごとにログ収集をカスタマイズできます。このメソッドは、ConfigMapを作成し、希望する構成ファイルをエージェントコンテナにマウントします。

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

`<CONTAINER_IMAGE>`は、これを適用したいコンテナのショートイメージ名と一致する必要があります。追加の例については、サンプルマニフェスト[ConfigMapマッピング][1]を参照してください。

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-extraconfd.yaml
{{% /tab %}}

{{% tab "Helm" %}}
内で`datadog.confd`統合ごとにログ収集をカスタマイズできます。このメソッドは、ConfigMapを作成し、希望する構成ファイルをエージェントコンテナにマウントします。

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

`<CONTAINER_IMAGE>`は、これを適用したいコンテナのショートイメージ名と一致する必要があります。

{{% /tab %}}

{{% tab "key-value ストア" %}}
以下のetcdコマンドは、カスタム`password`パラメーターを使用してRedisインテグレーションテンプレートを作成し、正しい`source`および`service`属性でログにタグを付けます:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": ["env:prod"]}]'
```

3つの値のそれぞれがリストであることに注意してください。Autodiscoveryは、共有リストインデックスに基づいて統合構成にリスト項目を組み立てます。この場合、`check_names[0]`、`init_configs[0]`、および`instances[0]`から最初（かつ唯一）のチェック構成を構成します。

auto-confファイルとは異なり、**key-valueストアは、コンテナ識別子としてショートイメージまたは長いイメージ名を使用できます**。例えば、`redis`または`redis:latest`です。

オートディスカバリーでは、[Consul][1]、Etcd、および Zookeeper をインテグレーションテンプレートソースとして使用できます。

key-valueストアを使用するには、エージェント`datadog.yaml`構成ファイルで設定し、このファイルをコンテナ化されたエージェント内にマウントします。または、コンテナ化されたエージェントに環境変数としてkey-valueストアを渡します。

####  `datadog.yaml` {#in-datadogyaml}において

ファイル`datadog.yaml`内で、key-valueストアの`<KEY_VALUE_STORE_IP>`アドレスと`<KEY_VALUE_STORE_PORT>`を設定します:

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

次に、[Agent を再起動][2]して、構成の変更を適用します。

#### 環境変数として{#in-environment-variables}

key-valueストアがテンプレートソースとして有効になっている場合、エージェントはキー`/datadog/check_configs`の下でテンプレートを探します。Autodiscoveryは、このようなkey-value階層を期待しています:

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**注**: 特定の構成を特定のコンテナに適用するために、Autodiscoveryはkey-valueストアを使用する際に**イメージ**でコンテナを識別し、`<CONTAINER_IMAGE>`を`.spec.containers[0].image`に一致させることを試みます。

[1]: /ja/integrations/consul/
[2]: /ja/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

コンテナのショートイメージ名よりも細かくログ構成を一連のコンテナに一致させるには、[Autodiscoveryコンテナ識別子][22]を参照してください。

## 高度なログ収集 {#advanced-log-collection}

オートディスカバリーログラベルを使用し、高度なログ収集の処理ロジックを適用します。たとえば、

* [Datadog へ送信する前にログを絞り込む][5].
* [ログの機密データを削除][6].
* [複数行の集約の実行][7].

### コンテナのローカルログファイルから {#from-a-container-local-log-file}

Datadog は、ログ収集をより自動的に設定できるように、コンテナ化されたアプリケーションには `stdout` と `stderr` の出力ストリームを使用することを推奨しています。

ただし、Agent はアノテーションに基づいてファイルから直接ログを収集することもできます。これらのログを収集するには、`ad.datadoghq.com/<CONTAINER_NAME>.logs` を使用し、`type: file` および `path` の設定を行ってください。そのようなアノテーションを持つファイルから収集されたログは、コンテナ自体からのログと同じタグセットで自動的にタグ付けされます。Datadog は、ログ収集を自動的に設定できるように、コンテナ化されたアプリケーションには `stdout` と `stderr` の出力ストリームを使用することを推奨しています。詳細については、[推奨されるコンフィギュレーション](#recommended-configurations) を参照してください。

これらのファイルパスは、Agent コンテナに対して **相対的** です。したがって、ログファイルを含むディレクトリをアプリケーションと Agent コンテナの両方にマウントして、Agent が適切に可視化できるようにする必要があります。

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
#### 推奨されるコンフィギュレーション {#recommended-configurations}
- この戦略は特定の Pod に対して機能しますが、この戦略を使用する複数のアプリケーションでは煩雑になる可能性があります。複数のレプリカが同じログパスを使用している場合、問題が発生することもあります。可能であれば、Datadog は [Autodiscovery テンプレート変数][17] `%%kube_pod_name%%` を活用することを推奨しています。例えば、`path`をこの変数を参照するように設定できます：`"path": "/var/log/example/%%kube_pod_name%%/app.log"`。アプリケーションPodは、この新しいパスに従ってログファイルを書き込む必要があります。[Downward API][18]を使用して、アプリケーションがそのPod名を特定するのに役立てることができます。

- この種のアノテーションをコンテナで使用する場合、`stdout` および `stderr`のログはコンテナから自動的に収集されません。コンテナの出力ストリームとファイルの両方からの収集が必要な場合は、アノテーションでこれを明示的に有効にしてください。たとえば、以下のとおりです。
  ```yaml
  ad.datadoghq.com/<CONTAINER_IMAGE>.logs: |
    [
      {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
      {"source":"container","service":"example-service"}
    ]
  ```

- この種の組み合わせを使用する場合、`source`と`service`にはファイルから収集されたログのデフォルト値がないため、アノテーションで明示的に設定する必要があります。

## トラブルシューティング {#troubleshooting}

トラブルシューティング手順については、[コンテナログ収集トラブルシューティング][21]を参照してください。

## 参考資料 {#further-reading}

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