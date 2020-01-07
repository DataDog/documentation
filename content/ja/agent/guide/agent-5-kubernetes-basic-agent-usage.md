---
title: Agent v5 と Kubernetes での基本的な Agent の利用方法
kind: ガイド
private: true
aliases:
  - /agent/faq/agent-5-kubernetes-basic-agent-usage
---
{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Kubernetes Dashboard"  >}}

## 概要

Kubernetes からメトリクスをリアルタイムに取得すると、以下のことが可能になります。

* Kubernetes の状態を視覚化および監視できます。
* Kubernetes のフェイルオーバーとイベントの通知を受けることができます。

Kubernetes の場合は、[DaemonSet で Agent を実行][1]することをお勧めします。Docker と Kubernetes 両方のインテグレーションを有効にして、[Docker イメージ][2]を作成しました。

[ホストで Datadog Agent を実行][3]して構成するだけで、Kubernetes メトリクスを収集できます。

## Kubernetes のセットアップ
### インストール
#### コンテナのインストール

Kubernetes では、DaemonSet を利用して、すべてのノード (または nodeSelectors を使用して特定のノード) に Datadog Agent を自動的にデプロイできます。

DaemonSet がご使用の Kubernetes クラスターのオプションになっていない場合は、各 Kubernetes ノードにデプロイとして [Datadog Agent をインストール][4]します。

Kubernetes で RBAC が有効になっている場合は、[Datadog-Kubernetes インテグレーションで RBAC アクセス許可を設定する方法に関するドキュメント][5]を参照してください。

* 次の `dd-agent.yaml` マニフェストを作成します。

≪```yaml

apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: dd-agent
spec:
  template:
    metadata:
      labels:
        app: dd-agent
      name: dd-agent
    spec:
      containers:
      - image: datadog/docker-dd-agent:latest
        imagePullPolicy: Always
        name: dd-agent
        ports:
          - containerPort: 8125
            name: dogstatsdport
            protocol: UDP
        env:
          - name: API_KEY
            value: "YOUR_API_KEY"
          - name: KUBERNETES
            value: "yes"
        volumeMounts:
          - name: dockersocket
            mountPath: /var/run/docker.sock
          - name: procdir
            mountPath: /host/proc
            readOnly: true
          - name: cgroups
            mountPath: /host/sys/fs/cgroup
            readOnly: true
      volumes:
        - hostPath:
            path: /var/run/docker.sock
          name: dockersocket
        - hostPath:
            path: /proc
          name: procdir
        - hostPath:
            path: /sys/fs/cgroup
          name: cgroups
```≫

`YOUR_API_KEY` を [api キー][6]に置き換えるか、[Kubernetes シークレット][7]を使用して API キーを[環境変数][8]として設定します。

* 次のコマンドで DaemonSet をデプロイします。
  ```
  kubectl create -f dd-agent.yaml
  ```

**注**: このマニフェストは、オートディスカバリーの自動構成機能を有効にします。無効にするには、`SD_BACKEND` 環境変数の定義を削除します。オートディスカバリーの構成方法については、[オートディスカバリーのドキュメント][9]を参照してください。

#### ホストインストール

`dd-check-kubernetes` パッケージを手動または任意の構成マネージャーを使用してインストールします。

### コンフィグレーション

`kubernetes.yaml` ファイルを編集して、サーバーとポートを指定し、監視するマスターを設定します。

≪```yaml

instances:
    host: localhost
    port: 4194
    method: http
```≫

使用可能なすべての構成オプションの詳細については、[kubernetes.yaml のサンプル][10] を参照してください。

### 検証
#### コンテナの実行

現在の環境で Datadog Agent が DaemonSet として動作していることを検証するには、次を実行します。

    kubectl get daemonset

Agent がデプロイされている場合は、以下のような出力が表示されます。ここで、**desired** と **current** は、クラスター内で実行中のノードの数と一致します。

    NAME       DESIRED   CURRENT   NODE-SELECTOR   AGE
    dd-agent   3         3         <none>          11h

#### Agent チェックの実行

[Agent の `info` サブコマンドを実行][11]し、Checks セクションの `kubernetes` を探します。

    Checks
    ======

        Kubernetes
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Kubernetes Stateのセットアップ
### インストール
#### コンテナのインストール

Kubernetes 1.2.0 以降を実行している場合は、[kube-state-metrics][12] プロジェクトを使用して、追加のメトリクス (下のメトリクスリストでは `kubernetes_state` プレフィックスで識別) を Datadog に提供できます。

kube-state-metrics を実行するには、次のマニフェストを使用して `kube-state-metrics.yaml` ファイルを作成し、kube-state-metrics サービスをデプロイします。

≪```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: kube-state-metrics
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: kube-state-metrics
    spec:
      containers:
      - name: kube-state-metrics
        image: gcr.io/google_containers/kube-state-metrics:v1.2.0
        ports:
        - name: metrics
          containerPort: 8080
        resources:
          requests:
            memory: 30Mi
            cpu: 100m
          limits:
            memory: 50Mi
            cpu: 200m
---
apiVersion: v1
kind: Service
metadata:
  annotations:
    prometheus.io/scrape: 'true'
  labels:
    app: kube-state-metrics
  name: kube-state-metrics
spec:
  ports:
  - name: metrics
    port: 8080
    targetPort: metrics
    protocol: TCP
  selector:
    app: kube-state-metrics
```≫

次に、以下を実行して、これをデプロイします。
≪```
kubectl create -f kube-state-metrics.yaml
```≫

上記のマニフェストでは、Google が公開している `kube-state-metrics` コンテナを使用していますが、[Quay][13] も利用できます。このコンテナを手動でビルドする場合は、[プロジェクトの公式ドキュメント][12]を参照してください。

Kubernetes State Metrics サービスを別の URL またはポートで実行するように構成する場合は、`conf.d/kubernetes_state.yaml` で `kube_state_url` パラメーターを設定し、Datadog Agent を再起動することで構成を行います。
詳細については、[kubernetes_state.yaml.example ファイル][14]を参照してください。[オートディスカバリー][9]を有効にしている場合は、kube state URL が自動的に構成および管理されます。

#### ホストインストール

`dd-check-kubernetes_state` パッケージを手動または任意の構成マネージャーを使用してインストールします (CentOS/AWS 上)。[こちらで rpm パッケージを検索][15]できます。インストールの詳細については、[こちらのページ][16]を参照してください。
次に、`kubernetes_state.yaml` ファイルを編集して、サーバーとポートを指定し、監視するマスターを設定します。使用可能なすべての構成オプションの詳細については、[kubernetes_state.yaml のサンプル][14] を参照してください。

### 検証
#### コンテナの検証
現在の環境で Datadog Agent が DaemonSet として動作していることを検証するには、次を実行します。

    kubectl get daemonset

Agent がデプロイされている場合、以下のような出力が表示されます。ここで、**desired** と **current** は、クラスター内で実行中のノードの数と一致します。

    NAME       DESIRED   CURRENT   NODE-SELECTOR   AGE
    dd-agent   3         3         <none>          11h

#### Agent チェックの検証

[Agent の info サブコマンドを実行][17]し、Checks セクションの `kubernetes_state` を探します。

    Checks
    ======

        kubernetes_state
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Kubernetes DNS のセットアップ
### インストール

`dd-check-kube_dns` パッケージを手動または任意の構成マネージャーを使用してインストールします。

### コンフィグレーション

`kube_dns.yaml` ファイルを編集して、サーバーとポートを指定し、監視するマスターを設定します。使用可能なすべての構成オプションの詳細については、[kube_dns.yaml のサンプル][18] を参照してください。

#### サービスディスカバリーの使用

Kubernetes ワーカーノードごとに 1 つの `dd-agent` ポッドを使用している場合は、kube-dns ポッドで以下のアノテーションを使用して、データを自動的に取得できます。

≪```yaml

apiVersion: v1
kind: Pod
metadata:
  annotations:
    service-discovery.datadoghq.com/kubedns.check_names: '["kube_dns"]'
    service-discovery.datadoghq.com/kubedns.init_configs: '[{}]'
    service-discovery.datadoghq.com/kubedns.instances: '[[{"prometheus_endpoint":"http://%%host%%:10055/metrics", "tags":["dns-pod:%%host%%"]}]]'
```≫

**備考:**

 - "dns-pod" タグは、対象の DNS ポッド IP を追跡します。他のタグは、サービスディスカバリーを使用して情報をポーリングする `dd-agent` に関連します。
 - ポッドにサービスディスカバリーアノテーションを適用する必要があります。デプロイの場合は、テンプレートの spec のメタデータにアノテーションを追加します。

### 検証

[Agent の info サブコマンドを実行][17]し、Checks セクションの `kube_dns` を探します。

    Checks
    ======

        kube_dns
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

[1]: https://github.com/DataDog/docker-dd-agent
[2]: https://hub.docker.com/r/datadog/docker-dd-agent
[3]: /ja/#host-setup
[4]: /ja/integrations/docker_daemon
[5]: /ja/integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://kubernetes.io/docs/concepts/configuration/secret
[8]: https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables
[9]: /ja/agent/autodiscovery
[10]: https://github.com/DataDog/integrations-core/blob/master/kubernetes/datadog_checks/kubernetes/data/conf.yaml.example
[11]: /ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/kubernetes/kube-state-metrics
[13]: https://quay.io/coreos/kube-state-metrics
[14]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example
[15]: https://yum.datadoghq.com/stable/6/x86_64
[16]: /ja/agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity
[17]: /ja/agent/guide/agent-commands/#agent-status-and-information
[18]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/conf.yaml.example