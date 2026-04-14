---
aliases:
- /ja/agent/kubernetes/log
further_reading:
- link: /agent/kubernetes/apm/
  tag: ドキュメント
  text: アプリケーショントレースの収集
- link: /agent/kubernetes/prometheus/
  tag: ドキュメント
  text: Prometheus メトリクスの収集
- link: /agent/kubernetes/integrations/
  tag: ドキュメント
  text: アプリケーションのメトリクスとログを自動で収集
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/kubernetes/tag/
  tag: ドキュメント
  text: コンテナから送信された全データにタグを割り当て
title: Kubernetes ログの収集
---

このページでは、Kubernetes ログファイルからのログの収集について説明します。

When your containerized applications write their logs to standard output and error (`stdout`/`stderr`), the container runtime and Kubernetes automatically manage the logs for you. The default pattern is that [Kubernetes stores these log streams as files][13] on the host in the `/var/log/pods` folder and subfolders for each Pod and container.

The Datadog Agent can collect these Kubernetes log files for these containers using the instructions below. This option scales well for the ephemeral nature of the Pods that Kubernetes creates, and is more resource-efficient than collecting logs from the Docker socket. Datadog recommends this method for log collection in Kubernetes.

Alternatively, the Datadog Agent can also collect logs by repeated requests to the Docker API through the Docker socket. However, this requires Docker as the container runtime for your Kubernetes cluster. This is also more resource-intensive than using log files. To see how to collect logs using the Docker socket, see [Log collection with Docker socket][1]. If your containerized applications are writing to log files stored in the container, this can complicate log collection. See [log collection from a file](#from-a-container-local-log-file).

## セットアップ

### ログ収集

Before you start collecting application logs, ensure that you are running the Datadog Agent in your Kubernetes cluster.

To configure log collection manually in the DaemonSet, see [DaemonSet Log Collection][9]. Otherwise, follow the instructions below:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` マニフェストを次のように更新します。

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

See the sample [manifest with logs, metrics, and APM collection enabled][1] for an additional example. You can set `features.logCollection.containerCollectAll` to `true` to collect logs from all discovered containers by default. When set to `false` (default), you need to specify Autodiscovery log configurations to enable log collection.

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
{{% /tab %}}
{{% tab "Helm" %}}

To enable log collection with Helm, update your [datadog-values.yaml][1] file with the following log collection configuration. Then, upgrade your Datadog Helm chart:

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```

`datadog.logs.containerCollectAll` を `true` に設定すると、デフォルトで検出されたすべてのコンテナからログを収集することができます。`false` (デフォルト) に設定すると、ログ収集を有効にするためにオートディスカバリーのログ構成を指定する必要があります。

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

### 非特権

{{< tabs >}}
{{% tab "Datadog Operator" %}}
(Optional) To run an unprivileged installation, add the following to the [DatadogAgent custom resource][1]:

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
- `<DOCKER_GROUP_ID>` を Docker または containerd ソケットを所有するグループ ID に置き換えます。

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

- `<USER_ID>` を Agent を実行する UID に変更します。
- `<DOCKER_GROUP_ID>` を Docker または containerd ソケットを所有するグループ ID に置き換えます。

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">
<strong>Warning for unprivileged installations</strong>
<br/><br/>
When running an unprivileged installation, the Agent needs to be able to read log files in <code>/var/log/pods</code>.
<br/><br/>
If you are using the containerd runtime, the log files in <code>/var/log/pods</code> are readable by members of the <code>root</code> group. With the above instructions, the Agent runs with the <code>root</code> group. No action is required.
<br/><br/>
If you are using the Docker runtime, the log files in <code>/var/log/pods</code> are symbolic links to <code>/var/lib/docker/containers</code>, which is traversable only by the <code>root</code> user. Consequently, with the Docker runtime, it is not possible for a non-<code>root</code> Agent to read logs in <code>/var/log/pods</code>. The Docker socket must be mounted in the Agent container, so that it can get Pod logs through the Docker daemon.
<br/><br/>
To collect logs from <code>/var/log/pods</code> when the Docker socket is mounted, set the environment variable <code>DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE</code> (or <code>logs_config.k8s_container_use_file</code> in <code>datadog.yaml</code>) to <code>true</code>. This forces the Agent to use file collection mode.
</div>

## Log discovery

The Datadog Agent in Kubernetes is deployed by a DaemonSet (managed by the Datadog Operator or Helm). This DaemonSet schedules one replica of the Agent Pod on each node of the cluster. Each Agent Pod is then responsible for reporting the logs of the other Pods and containers on its respective node. When the "Container Collect All" feature is enabled, the Agent reports the logs from every discovered container with a default set of tags.

### フィルタリング

You can configure which containers you want to collect logs from. This can be useful to prevent the collection of the Datadog Agent logs, if desired. You can do this by passing configurations to the Datadog Agent to control what it pulls, or by passing configurations to the Kubernetes Pod to exclude certain logs more explicitly.

See [Container Discovery Management][8] to learn more.

### タグ付け

The Datadog Agent tags the logs from the Kubernetes containers with the default [Kubernetes tags][14], as well as any custom extracted tags. When "Container Collect All" is enabled, the Agent reports the logs for a container with a `source` and `service` tag matching the container short image name. For example, the logs from a container using the `gcr.io/owner/example-image:latest` container image would have `example-image` as the `source`, `service`, and `short_image` tag value.

The `service` tag can also be set by the [Unified Service Tagging][4] Pod label `tags.datadoghq.com/service: "<SERVICE>"`. For more information about `source` and `service` attributes, see [Reserved Attributes][11].

The `source` tag can be important for your logs, as the [out of box log pipelines][15] are filtered using this tag. However, these pipelines can be completely customized as desired. You can see the steps in the [Integration Logs](#integration-logs) section below for customizing the tags on your logs further.

## インテグレーションログ

[Autodiscovery][10] enables you to use templates to configure log collection (and other capabilities) on containers. This can be used to enable log collection, customize tagging, and add advanced collection rules. To configure log collection for an integration with Autodiscovery you can either:

- Specify a log configuration as Autodiscovery Annotations on a given Pod, to configure the rules for a given container *(Recommended)*
- Specify a log configuration as a configuration file, to configure the rules for each matching container by image

At minimum, these log configurations require a `source` and `service` tag. You may want to match the `source` tag to one of Datadog's [out-of-the-box log pipelines][15] to help automatically enrich your logs. You can also find a [library of pipelines in Datadog][16].

### オートディスカバリーアノテーション

With Autodiscovery, the Agent automatically searches all Pod annotations for integration templates.

To apply a specific configuration to a given container, add the annotation `ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs` to your Pod with the JSON formatted log configuration. 

**Note**: Autodiscovery annotations identify containers by name, **not** image. It tries to match `<CONTAINER_IDENTIFIER>` to the `.spec.containers[i].name`, not `.spec.containers[i].image`.

<div class="alert alert-info">
If you define your Kubernetes Pods <i>directly</i> (with <code>kind:Pod</code>), add each Pod's annotations in its <code>metadata</code> section, as shown in the following section.
<br/><br/>
If you define your Kubernetes Pods <i>indirectly</i> (with replication controllers, ReplicaSets, or Deployments), add Pod annotations to the Pod template under <code>.spec.template.metadata</code>.</div>

#### 単一コンテナの構成
To configure log collection for a given `<CONTAINER_IDENTIFIER>` within your Pod, add the following annotations to your Pod:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<ポッド名>'
  annotations:
    ad.datadoghq.com/<コンテナ識別子>.logs: '[<ログ_コンフィグ>]'
    # (...)
spec:
  containers:
    - name: '<コンテナ識別子>'
# (...)
```

#### Example log Autodiscovery annotations

The following Pod annotation defines the integration template for an example container. It is defined within the Pod template's annotations, rather than on the Deployment itself. This log configuration sets all the logs from the `app` container with the tags `source:java`, `service:example-app`, and the extra tag `foo:bar`.

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

#### 2 つの異なるコンテナの構成
To apply two different integration templates to two different containers within your Pod, `<CONTAINER_IDENTIFIER_1>` and `<CONTAINER_IDENTIFIER_2>`, add the following annotations to your Pod:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<ポッド名>'
  annotations:
    ad.datadoghq.com/<コンテナ識別子_1>.logs: '[<ログ_コンフィグ_1>]'
    # (...)
    ad.datadoghq.com/<コンテナ識別子_2>.logs: '[<ログ_コンフィグ_2>]'
spec:
  containers:
    - name: '<コンテナ識別子_1>'
    # (...)
    - name: '<コンテナ識別子_2>'
# (...)
```

### オートディスカバリーコンフィギュレーションファイル
You can provide the Datadog Agent with configuration files to have the Agent run a specified integration when it discovers a container using the matching image identifier. This allows you to create a generic log configuration that applies to a set of container images.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
You can customize logs collection per integration with an override in the `override.nodeAgent.extraConfd.configDataMap`. This method creates the ConfigMap and mounts the desired configuration file onto the Agent container.

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
            - <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

            logs:
            - source: example-source
              service: example-service
```

The `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` should match the container short image name that you want this to apply towards. See the sample manifest [with ConfigMap mapping][1] for an additional example.

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-extraconfd.yaml
{{% /tab %}}

{{% tab "Helm" %}}
You can customize logs collection per integration within `datadog.confd`. This method creates the ConfigMap and mounts the desired configuration file onto the Agent container.

```yaml
datadog:
  #(...)
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
      - <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

      logs:
      - source: example-source
        service: example-service
```

The `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` should match the container short image name that you want this to apply towards.

{{% /tab %}}

{{% tab "Key-value store" %}}
The following etcd commands create a Redis integration template with a custom `password` parameter and tags logs with the correct `source` and `service` attributes:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": ["env:prod"]}]'
```

Notice that each of the three values is a list. Autodiscovery assembles list items into the integration configurations based on shared list indexes. In this case, it composes the first (and only) check configuration from `check_names[0]`, `init_configs[0]`, and `instances[0]`.

auto-conf ファイルとは異なり、**key-value ストアの場合は、コンテナ識別子として短いイメージ名 (`redis` など) も長いイメージ名 (`redis:latest` など) も使用できます**。

Autodiscovery can use [Consul][1], Etcd, and Zookeeper as integration template sources.

key-value ストアを使用するには、Agent の `datadog.yaml` コンフィギュレーションファイルでストアを構成し、このファイルをコンテナ化 Agent 内にマウントします。または、key-value ストアを環境変数としてコンテナ化 Agent に渡します。

#### `datadog.yaml` の場合

`datadog.yaml` ファイルで、key-value ストアの `<KEY_VALUE_STORE_IP>` アドレスと `<KEY_VALUE_STORE_PORT>` を以下のように設定します。

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

#### 環境変数の場合

key-value ストアがテンプレートソースとして有効になっている場合、Agent はキー `/datadog/check_configs` の下でテンプレートを探します。オートディスカバリーは、以下のような key-value 階層を前提とします。

```yaml
/datadog/
  check_configs/
    <コンテナ識別子>/
      - logs: ["<ログ_コンフィグ>"]
    ...
```

**注**: key-value ストアを使用している場合、オートディスカバリーは特定の構成を特定のコンテナに適用するために、`<CONTAINER_IDENTIFIER>` と `.spec.containers[0].image` の一致を試みることで、コンテナを**イメージ**で識別します。

[1]: /ja/integrations/consul/
[2]: /ja/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

## 高度なログの収集

オートディスカバリーログラベルを使用し、高度なログ収集の処理ロジックを適用します。たとえば、

* [Datadog へ送信する前にログを絞り込む][5]。
* [ログの機密データのスクラビング][6]。
* [複数行の集約の実行][7]。

### From a container local log file

Datadog recommends that you use the `stdout` and `stderr` output streams for containerized applications, so that you can more automatically set up log collection.

However, the Agent can also directly collect logs from a file based on an annotation. To collect these logs, use `ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs` with a `type: file` and `path` configuration. Logs collected from files with such an annotation are automatically tagged with the same set of tags as logs coming from the container itself.

These file paths are **relative** to the Agent container. Therefore, the directory containing the log file needs to be mounted into both the application and Agent container so the Agent can have proper visibility.

例えば、共有の `hostPath` ボリュームを使用してこれを行うことができます。下記の Pod は `/var/log/example/app.log` というファイルにログを出力しています。これは `/var/log/example` ディレクトリで行われ、ボリュームと volumeMount がこれを `hostPath` として設定しています。

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

**Note**: This strategy can work for a given pod, but can become cumbersome with multiple apps using this strategy, as well run into issues if multiple replicas are using the same log path. If possible, Datadog recommends taking advantage of the [Autodiscovery template variable][17] `%%kube_pod_name%%`. For example, you can set your `path` to reference this variable: `"path": "/var/log/example/%%kube_pod_name%%/app.log"`.

Your application pod then needs to write its log files with respect to this new path as well. You can use the [Downward API][18] to help your application determine its Pod name.

**Note**: When using this kind of annotation with a container, `stdout` and `stderr` logs are not collected automatically from the container. If collection from both the container output streams and file are needed,  explicitly enable this in the annotation. For example:

```yaml
ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: |
  [
    {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
    {"source":"container","service":"example-service"}
  ]
```

この種の組み合わせを使用する場合、`source` と `service` にはファイルから収集されたログのデフォルト値がないため、アノテーションで明示的に設定する必要があります。

## トラブルシューティング

#### 存続期間が短いコンテナ

デフォルトでは、Agent は 5 秒ごとに新しいコンテナを探します。

Agent v6.12+ では、K8s ファイルログ収集方法 (`/var/log/pods` 経由) を使用している場合、存続期間の短いコンテナのログ (停止またはクラッシュ) が自動的に収集されます。これには、収集初期化コンテナログも含まれます。

#### Missing tags on new containers or Pods

When sending logs to Datadog from newly created containers or Pods, the Datadog Agent's internal tagger may not yet have the related container/pod tags. As a result, tags may be missing from these logs.

To remediate this issue, you can use the environment variable `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION` to configure a duration (in seconds) for the Datadog Agent to wait before it begins to send logs from newly created containers and Pods. The default value is `0`.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
          value: "5"
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
      value: "5"
```
{{% /tab %}}
{{< /tabs >}}

#### 新しいホストまたはノードでホストレベルのタグが欠落している場合

ホストレベルタグは、特定のホストのインフラストラクチャーリストに表示されるタグで、クラウドプロバイダーまたは Datadog Agent のいずれかから供給されます。代表的なホストレベルタグは、`kube_cluster_name`、`region`、`instance-type`、`autoscaling-group` などです。

When sending logs to Datadog from a newly created host or node, it can take a few minutes for host-level tags to be [inherited][12]. As a result, host-level tags may be missing from these logs.

To remediate this issue, you can use the environment variable `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` to configure a duration (in minutes). For this duration, the Datadog Agent manually attaches the host-level tags that it knows about to each sent log. After this duration, the Agent reverts to relying on tag inheritance at intake.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
          value: "10m"
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
      value: "10m"
```
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

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