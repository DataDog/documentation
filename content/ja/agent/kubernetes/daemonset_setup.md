---
title: Kubernetes DaemonSet のセットアップ
kind: documentation
further_reading:
  - link: agent/autodiscovery
    tag: documentation
    text: Docker Agent オートディスカバリー
  - link: agent/kubernetes/host_setup
    tag: documentation
    text: Kubernetes DaemonSet のセットアップ
  - link: agent/kubernetes/integrations
    tag: documentation
    text: カスタムインテグレーション
aliases:
  - agent/kubernetes/host_setup
  - /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
---
DaemonSet を利用して、すべてのノード (または [nodeSelectors を使用して][1]特定のノード) に Datadog Agent をデプロイします。

ご使用の Kubernetes クラスターのオプションに DaemonSet がない場合は、各 Kubernetes ノードにデプロイとして [Datadog Agent をインストール][2]します。

## RBAC アクセス許可の構成

Kubernetes で RBAC (ロールベースのアクセス制御) が有効になっている場合は、Datadog Agent サービスアカウントに対する RBAC アクセス許可を構成します。Kubernetes 1.6 以降では、RBAC はデフォルトで有効になっています。

適切な ClusterRole、ServiceAccount、および ClusterRoleBinding を作成します。

```shell
kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
```

## マニフェストの作成

次の `datadog-agent.yaml` マニフェストを作成します。（このマニフェストは、Docker を使用していることを前提としています。Containerd を使用している場合は、[この例][3]を参照してください。）

シークレットを使用している場合は、必ず `base64` を使用して API キーをエンコードしてください。

```shell
echo -n <DATADOG_API_キー> | base64
```

**注**: `kube-state-metrics` を使用している場合、または DogStatsD の使用率が高い場合は、より高いメモリ制限が必要になる場合があります。

```yaml
# datadog-agent.yaml

# Kubernetes シークレットを使用して Datadog API キーを構成するには、このセクションのコメントを解除します

# apiVersion: v1
# kind: Secret
# metadata:
#   name: datadog-secret
#   labels:
#     app: "datadog"
# type: Opaque
# data:
#   api-key: "<BASE64_エンコード_API_キー>"
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog-agent
  namespace: default
spec:
  selector:
    matchLabels:
      app: datadog-agent
  template:
    metadata:
      labels:
        app: datadog-agent
      name: datadog-agent
    spec:
      serviceAccountName: datadog-agent
      containers:
      - image: datadog/agent:latest
        imagePullPolicy: Always
        name: datadog-agent
        ports:
          - containerPort: 8125
            ## DogStatsD 経由のカスタムメトリクス - このセクションのコメントを解除して、
            ## カスタムメトリクスコレクションを有効にします。
            ## DD_DOGSTATSD_NON_LOCAL_TRAFFIC を "true" に設定して、
            ## 他のコンテナから StatsD メトリクスを収集します。
            #
            # hostPort: 8125
            name: dogstatsdport
            protocol: UDP
          - containerPort: 8126
            ## トレース収集（APM）- このセクションのコメントを解除して、APM を有効にします
            # hostPort: 8126
            name: traceport
            protocol: TCP
        env:
          ## 組織に関連する Datadog API キーを設定します
          ## Kubernetes Secret を使用する場合、次の環境変数を使用します:
          ## - {name: DD_API_KEY, valueFrom: { secretKeyRef: { name: datadog-secret, key: api-key }}}
          - {name: DD_API_KEY, value: "<DATADOG_API_キー>"}

          ## DD_SITE を "datadoghq.eu" に設定して、Agent データを Datadog EU サイトに送信します
          - {name: DD_SITE, value: "datadoghq.com"}

          ## StatsD の収集を許可するには、DD_DOGSTATSD_NON_LOCAL_TRAFFIC を true に設定します。
          - {name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC, value: "false" }
          - {name: KUBERNETES, value: "true"}
          - {name: DD_HEALTH_PORT, value: "5555"}
          - {name: DD_COLLECT_KUBERNETES_EVENTS, value: "true" }
          - {name: DD_LEADER_ELECTION, value: "true" }
          - {name: DD_APM_ENABLED, value: "true" }

          - name: DD_KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP

          - {name: DD_CRI_SOCKET_PATH, value: /host/var/run/docker.sock}
          - {name: DOCKER_HOST, value: unix:///host/var/run/docker.sock}

        ## これらは、リクエストと制限の最小推奨値です。
        ## Agent が必要とするリソースの量は、以下によって異なります。
        ## * チェックの数
        ## * 有効なインテグレーションの数
        ## * 有効な機能の数
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        volumeMounts:
          - {name: dockersocketdir, mountPath: /host/var/run}
          - {name: procdir, mountPath: /host/proc, readOnly: true}
          - {name: cgroups, mountPath: /host/sys/fs/cgroup, readOnly: true}
          - {name: s6-run, mountPath: /var/run/s6}
          - {name: logpodpath, mountPath: /var/log/pods}
          ## Docker ランタイムディレクトリ、このパスをコンテナランタイムログディレクトリに
          ## 置き換えるか、`/var/log/pods` が他のディレクトリへのシンボリックリンクでない
          ## 場合、この構成を削除します。
          - {name: logcontainerpath, mountPath: /var/lib/docker/containers}
        livenessProbe:
          httpGet:
            path: /health
            port: 5555
          initialDelaySeconds: 15
          periodSeconds: 15
          timeoutSeconds: 5
          successThreshold: 1
          failureThreshold: 3
      volumes:
        - {name: dockersocketdir, hostPath: {path: /var/run}}
        - {name: procdir, hostPath: {path: /proc}}
        - {name: cgroups, hostPath: {path: /sys/fs/cgroup}}
        - {name: s6-run, emptyDir: {}}
        - {name: logpodpath, hostPath: {path: /var/log/pods}}
        ## Docker ランタイムディレクトリ、このパスをコンテナランタイムログディレクトリに
        ## 置き換えるか、`/var/log/pods` が他のディレクトリへのシンボリックリンクでない
        ## 場合、この構成を削除します。
        - {name: logcontainerpath, hostPath: {path: /var/lib/docker/containers}}
```

`<DATADOG_API_キー>` を [Datadog API キー][4]に置き換えるか、[Kubernetes シークレット][5]を使用して API キーを[環境変数][6]として設定します。Kubernetes シークレットを使用する場合は、Datadog の [Kubernetes シークレットを使用した API キーの設定手順][7]を参照してください。すべての構成オプションについては、[Docker インテグレーション][8]を参照してください。

次のコマンドで DaemonSet をデプロイします。

```shell
kubectl create -f datadog-agent.yaml
```

**注**: このマニフェストは、オートディスカバリーの自動構成機能を有効にします。オートディスカバリーの構成方法については、[オートディスカバリーのドキュメント][9]を参照してください。

### 検証

現在の環境で Datadog Agent が DaemonSet として動作していることを検証するには、次を実行します。

```shell
kubectl get daemonset
```

Agent がデプロイされた場合は、以下のようなテキスト出力が表示されます。`DESIRED` と `CURRENT` はクラスター内で実行中のノードの数と等しくなります。

```shell
NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2         2            2           <none>          16h
```

### Kubernetes クラスター名の自動検出

Agent v6.11+ の場合、Datadog Agent は Google GKE、Azure AKS、AWS EKS で Kubernetes クラスター名を自動検出できます。検出された場合、ノード名のサフィックスとしてクラスター名を含むエイリアスが収集されたすべてのデータに追加され、Kubernetes クラスター全体のノードの識別が容易になります。Google GKE および Azure AKS では、クラスター名はクラウドプロバイダー API から取得されます。AWS EKS の場合、クラスター名は EC2 インスタンスタグから取得されます。AWS では、Agent が EC2 インスタンスタグをクエリできるように、Datadog IAM ポリシーに `ec2:DescribeInstances` [アクセス許可][10]を追加する必要があります。

**注**: Agent v6.5+ では、Agent 構成パラメーター [`clusterName`][11] または `DD_CLUSTER_NAME` 環境変数のおかげで、このクラスター名の値を手動で設定できます。

## 機能の有効化

### ログの収集

DaemonSet による[ログ収集][12]を有効にするには

1. env セクション内の `DD_LOGS_ENABLED` および `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` 変数を true に設定します。

    ```
    (...)
      env:
        (...)
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_AC_EXCLUDE
          value: "name:datadog-agent"
    (...)
    ```

   **注**: `DD_AC_EXCLUDE` を設定すると、Datadog Agent が独自のログを収集および送信できなくなります。Datadog Agent ログを収集する場合は、このパラメーターを削除します。

2. tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)

    ```
      (...)
        volumeMounts:
          (...)
          - name: pointdir
            mountPath: /opt/datadog-agent/run
      (...)
      volumes:
        (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointdir
      (...)
    ```

   `pointdir` は、Agent がログを収集するすべてのコンテナへのポインターを含むファイルを格納するために使用されます。これは、Agent が再起動したり、ネットワークに問題があった場合でも、何も失われないようにするためです。

Agent がログを収集する方法には、Docker ソケットから収集する方法と、Kubernetes ログファイルから収集する方法 (Kubernetes によって自動的に処理されます) の 2 つがあります。次の場合にログファイル収集を使用します。

* Docker がランタイムではない
* 各ポッド内で 10 個を超えるコンテナが使用されている

Docker API は、一度に 1 つのコンテナからログを取得するように最適化されています。同じポッドに多数のコンテナがある場合、Docker ソケットからのログ収集は、ファイルからの収集よりはるかに多くのリソースを消費する可能性があります。

{{< tabs >}}
{{% tab "K8s File" %}}

`/var/log/pods` はこのディレクトリへのシンボリックリンクなので、`/var/lib/docker/containers` もマウントします。

```
  (...)
    volumeMounts:
      (...)
      - name: logpodpath
        mountPath: /var/log/pods
      # Docker ランタイムディレクトリ、このパスをコンテナランタイムログディレクトリに
      # 置き換えるか、`/var/log/pods` が他のディレクトリへのシンボリックリンクでない場合、この構成を削除します。
      - name: logcontainerpath
        mountPath: /var/lib/docker/containers
  (...)
  volumes:
   (...)
    - hostPath:
        path: /var/log/pods
      name: logpodpath
    # Docker ランタイムディレクトリ、このパスをコンテナランタイムログディレクトリに
    # 置き換えるか、`/var/log/pods` が他のディレクトリへのシンボリックリンクでない場合、この構成を削除します。
    - hostPath:
        path: /var/lib/docker/containers
      name: logcontainerpath
  (...)
```

{{% /tab %}}
{{% tab "Docker Socket" %}}

Docker ソケットを Datadog Agent にマウントします。

```
  (...)
    env:
      - {name: DD_CRI_SOCKET_PATH, value: /host/var/run/docker.sock}
      - {name: DOCKER_HOST, value: unix:///host/var/run/docker.sock}
  (...)
    volumeMounts:
      (...)
      - name: dockersocketdir
        mountPath: /host/var/run
  (...)
  volumes:
    (...)
    - hostPath:
        path: /var/run
      name: dockersocketdir
  (...)
```

**注**: Docker デーモンの再起動後、ソケットが含まれるディレクトリ全体ではなく、`docker.sock` ソケットのみをマウントすると、Agent が回復できなくなります。

{{% /tab %}}
{{< /tabs >}}

Datadog Agent は次のロジックに基づいて、どこからログをピックアップするかを把握します。

1. Agent は Docker ソケットを探します。ソケットがあれば、そこからログを収集します。
2. 利用可能な Docker ソケットがない場合、Agent は `/var/log/pods` を探し、そこからログを収集します。

**注**: Docker ソケットがマウントされていても、`/var/log/pods` からログを収集したい場合は、Agent にファイル収集モードを強制するために環境変数 `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` (または `datadog.yaml` 内の `logs_config.k8s_container_use_file`) を `true` に設定します。

最後に、[ポッドアノテーション付きのオートディスカバリー][13]を使用して、コンテナのログ収集を強化します。

#### 存続期間が短いコンテナ

{{< tabs >}}
{{% tab "K8s File" %}}

デフォルトでは、Agent は 5 秒ごとに新しいコンテナを探します。

Agent v6.12+ では、K8s ファイルログ収集方法 (`/var/log/pods` 経由) を使用している場合、存続期間の短いコンテナのログ (停止またはクラッシュ) が自動的に収集されます。これには、収集初期化コンテナログも含まれます。

{{% /tab %}}
{{% tab "Docker Socket" %}}

Docker 環境では、Agent は Docker イベントによりコンテナのアップデートをリアルタイムに受け取ります。Agent は 1 秒ごとにコンテナラベル（オートディスカバリー）からコンフィギュレーションを抽出しアップデートします。
Agent v6.14 以降、Agent はすべてのコンテナ（実行中かは問わず）のログを収集します。つまり、直近の 1 秒間に開始し停止した存続期間の短いコンテナのログは、削除されるまで収集されます。

{{% /tab %}}
{{< /tabs >}}

### APM と分散型トレーシング

ポート 8126 からの受信データを許可して APM を有効にするには、env セクション内の `DD_APM_NON_LOCAL_TRAFFIC` 変数を true に設定します。

```text
(...)
      env:
        (...)
        - name: DD_APM_NON_LOCAL_TRAFFIC
          value: "true"
(...)
```

次に、Agent のポートをホストに転送します。

```text
(...)
      ports:
        (...)
        - containerPort: 8126
          hostPort: 8126
          name: traceport
          protocol: TCP
(...)
```

Downward API を使用してホスト IP を取得します。アプリケーションコンテナは `status.hostIP` を指す環境変数を必要とし、Datadog コンテナ Agent はその名前が `DD_AGENT_HOST` であることを前提とします。

```text
apiVersion: apps/v1
kind: Deployment
...
    spec:
      containers:
      - name: <コンテナ名>
        image: <コンテナイメージ>/<TAG>
        env:
          - name: DD_AGENT_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
```

最後に、環境変数 `DD_AGENT_HOST` を使用して、アプリケーションレベルのトレーサーが Datadog Agent ホストの場所を指すようにします。たとえば、Python では次のようにします。

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)
```

その他の例については、[言語ごとの APM インスツルメンテーションドキュメント][14]を参照してください。

**注**: minikube では、`Unable to detect the kubelet URL automatically`（キューブレット URL を自動的に検出できません）というエラーが表示される場合があります。この場合、`DD_KUBELET_TLS_VERIFY=false` を設定します。

### プロセス収集

[Kubernetes のプロセス収集][15]を参照してください。

### DogStatsD

DogStatsD からカスタムメトリクスを送信するには、env セクション内の `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` 変数を true に設定します。

```text
(...)
      env:
        (...)
        - name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC
          value: "true"
(...)
```

詳細については、[Kubernetes DogStatsD ドキュメント][16]を参照してください。

アプリケーションポッドから DogStatsD 経由でカスタムメトリクスを送信するには、`datadog-agent.yaml` マニフェスト内の `# hostPort: 8125` の行のコメントを解除します。これで、各 Kubernetes ノードで DogStatsD ポートが公開されます。

**警告**: `hostPort` パラメーターを指定すると、ホストのポートが開かれます。アプリケーションまたは信頼できるソースからのみアクセスを許可するように、ファイアウォールを設定してください。
その他の注意: `hostPorts` をまだサポートしていない一部のネットワークプラグインは、動作しません。
これを回避するには、`hostNetwork: true` を Agent ポッド仕様に追加してください。ホストのネットワークネームスペースが Datadog Agent と共有されます。つまり、コンテナで開かれたすべてのポートはホストでも開きます。ポートがホストとコンテナの両方で使用されると、競合し (同じネットワークネームスペースを共有するので)、ポッドが開始しません。これを許可しない Kubernetes インストールもあります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: https://hub.docker.com/r/datadog/agent
[3]: /ja/integrations/containerd/#installation-on-containers
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://kubernetes.io/docs/concepts/configuration/secret
[6]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information
[7]: /ja/agent/faq/kubernetes-secrets
[8]: /ja/agent/docker/#environment-variables
[9]: /ja/agent/autodiscovery/?tab=agent#how-to-set-it-up
[10]: /ja/integrations/amazon_ec2/#configuration
[11]: https://github.com/helm/charts/blob/a744ff8c90730d6d36698412150875fa96882b9d/stable/datadog/values.yaml#L58
[12]: /ja/logs
[13]: /ja/agent/autodiscovery/integrations/?tab=kubernetes
[14]: /ja/tracing/setup
[15]: /ja/infrastructure/process/?tab=kubernetes#installation
[16]: /ja/developers/dogstatsd