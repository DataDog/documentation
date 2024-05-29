---
aliases:
- /ja/agent/kubernetes/control_plane
further_reading:
- link: agent/kubernetes/log
  tag: ドキュメント
  text: アプリケーションログの収集
- link: agent/kubernetes/host_setup
  tag: ドキュメント
  text: アプリケーショントレースの収集
- link: /agent/kubernetes/prometheus
  tag: ドキュメント
  text: Prometheus メトリクスの収集
- link: /agent/kubernetes/integrations
  tag: ドキュメント
  text: アプリケーションのメトリクスとログを自動で収集
- link: /agent/guide/autodiscovery-management
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/kubernetes/tag
  tag: ドキュメント
  text: コンテナから送信された全データにタグを割り当て
kind: documentation
title: Kubernetes Control Plane モニタリング
---

## 概要

このセクションの目的は、特異性を文書化し、Kubernetes Control Plane を監視するための適切な基本コンフィギュレーションを提供することです。次に、このコンフィギュレーションをカスタマイズして、Datadog 機能を追加できます。

[API サーバー][1]、[Etcd][2]、[Controller Manager][3]、[Scheduler][4] の Datadog インテグレーションにより、Kubernetes Control Plane の 4 つのコンポーネントすべてから主要なメトリクスを収集できます。

* [Kubernetes と Kubeadm](#Kubeadm)
* [Amazon EKS で Kubernetes を使用](#EKS)
* [OpenShift 4 上の Kubernetes](#OpenShift4)
* [OpenShift 3 上の Kubernetes](#OpenShift3)
* [Rancher Kubernetes Engine (v2.5+) 上の Kubernetes](#RKE)
* [Rancher Kubernetes Engine (\<v2.5) 上の Kubernetes](#RKEBefore2_5)
* [マネージドサービス (AKS、GKE) で Kubernetes を使用](#ManagedServices)

## Kubernetes と Kubeadm {#Kubeadm}

次のコンフィギュレーションは、Kubernetes `v1.18+` でテストされています。

### API サーバー

API サーバーインテグレーションは自動的に構成されます。Datadog Agent はこれを自動的に検出します。

### Etcd

ホストにある Etcd 証明書への読み取りアクセスを提供することにより、Datadog Agent チェックは Etcd と通信し、Etcd メトリクスの収集を開始できます。

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  ignoreAutoConfig:
  - etcd
  confd:
    etcd.yaml: |-
      ad_identifiers:
        - etcd
      instances:
        - prometheus_url: https://%%host%%:2379/metrics
          tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
          tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
          tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
agents:
  volumes:
    - hostPath:
        path: /etc/kubernetes/pki/etcd
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/kubernetes/pki/etcd
      readOnly: true
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
    operator: Exists
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:latest
      extraConfd:
        configMap:
          name: datadog-checks
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/etc/kubernetes/pki/etcd
            - name: disable-etcd-autoconf
              mountPath: /etc/datadog-agent/conf.d/etcd.d
      volumes:
        - name: etcd-certs
          hostPath:
            path: /etc/kubernetes/pki/etcd
        - name: disable-etcd-autoconf
          emptyDir: {}
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: datadog-checks
data:
  etcd.yaml: |-
    ad_identifiers:
      - etcd
    init_config:
    instances:
      - prometheus_url: https://%%host%%:2379/metrics
        tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
        tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
        tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
```

{{% /tab %}}
{{< /tabs >}}

### Controller Manager と Scheduler

#### 安全でないポート

Controller Manager インスタンスと Scheduler インスタンスの安全でないポートが有効になっている場合、Datadog Agent はインテグレーションを検出し、追加のコンフィギュレーションなしでメトリクスの収集を開始します。

#### 安全なポート

安全なポートにより、認証と承認が可能になり、Control Plane コンポーネントを保護できます。Datadog Agent は、安全なポートをターゲットにすることで、Controller Manager と Scheduler のメトリクスを収集できます。

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  ignoreAutoConfig:
  - etcd
  - kube_scheduler
  - kube_controller_manager
  confd:
    etcd.yaml: |-
      ad_identifiers:
        - etcd
      instances:
        - prometheus_url: https://%%host%%:2379/metrics
          tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
          tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
          tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
    kube_scheduler.yaml: |-
      ad_identifiers:
        - kube-scheduler
      instances:
        - prometheus_url: https://%%host%%:10259/metrics
          ssl_verify: false
          bearer_token_auth: true
    kube_controller_manager.yaml: |-
      ad_identifiers:
        - kube-controller-manager
      instances:
        - prometheus_url: https://%%host%%:10257/metrics
          ssl_verify: false
          bearer_token_auth: true
agents:
  volumes:
    - hostPath:
        path: /etc/kubernetes/pki/etcd
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/kubernetes/pki/etcd
      readOnly: true
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
    operator: Exists
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:latest
      extraConfd:
        configMap:
          name: datadog-checks
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/etc/kubernetes/pki/etcd
            - name: disable-etcd-autoconf
              mountPath: /etc/datadog-agent/conf.d/etcd.d
            - name: disable-scheduler-autoconf
              mountPath: /etc/datadog-agent/conf.d/kube_scheduler.d
            - name: disable-controller-manager-autoconf
              mountPath: /etc/datadog-agent/conf.d/kube_controller_manager.d
      volumes:
        - name: etcd-certs
          hostPath:
            path: /etc/kubernetes/pki/etcd
        - name: disable-etcd-autoconf
          emptyDir: {}
        - name: disable-scheduler-autoconf
          emptyDir: {}
        - name: disable-controller-manager-autoconf
          emptyDir: {}
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: datadog-checks
data:
  etcd.yaml: |-
    ad_identifiers:
      - etcd
    init_config:
    instances:
      - prometheus_url: https://%%host%%:2379/metrics
        tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
        tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
        tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
  kube_scheduler.yaml: |-
    ad_identifiers:
      - kube-scheduler
    instances:
      - prometheus_url: https://%%host%%:10259/metrics
        ssl_verify: false
        bearer_token_auth: true
  kube_controller_manager.yaml: |-
    ad_identifiers:
      - kube-controller-manager
    instances:
      - prometheus_url: https://%%host%%:10257/metrics
        ssl_verify: false
        bearer_token_auth: true
```

{{% /tab %}}
{{< /tabs >}}

**注:**

- 自己署名証明書を使用する場合は、`kube_controller_manager` および `kube_scheduler` コンフィギュレーションの `ssl_verify` フィールドを `false` に設定する必要があります。
- 安全なポートをターゲットにする場合、Controller Manager および Scheduler コンフィギュレーションの `bind-address` オプションは、Datadog Agent から到達可能である必要があります。例:

```yaml
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
controllerManager:
  extraArgs:
    bind-address: 0.0.0.0
scheduler:
  extraArgs:
    bind-address: 0.0.0.0
```

## Amazon EKS で Kubernetes を使用 {#EKS}

Amazon Elastic Kubernetes Service (EKS) では、[API サーバーメトリクスが公開されています][5]。これにより、Datadog Agent は [Kubernetes API サーバーメトリクスチェックに関するドキュメント][1]に記載されているように、エンドポイントチェックを使用して API サーバーメトリクスを取得することができます。チェックを設定するには、以下のアノテーションを `default/kubernetes` サービスに追加します。

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances:
    '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

その他の Control Plane コンポーネントは EKS で公開されていないため、監視することはできません。


## OpenShift 4 上の Kubernetes {#OpenShift4}

OpenShift 4 では、エンドポイントチェックを使用してすべてのコントロールプレーン コンポーネントを監視できます。

### 前提条件

1. Datadog [Cluster Agent][6] の有効化
1. [Cluster チェック][7]の有効化
1. [Endpoint チェック][8]の有効化
1. サービスの編集およびシークレットの作成には、ログイン済みで十分な権限を保持していることをご確認ください。

### API サーバー

API サーバーは、`default` ネームスペースで `kubernetes` サービスの背面で動作します。このサービスを `kube_apiserver_metrics` コンフィギュレーションでアノテーションします。

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

最後のアノテーション `ad.datadoghq.com/endpoints.resolve` は、サービスが静的ポッドの前面にあるため必要となります。Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。実行しているノードは、以下で識別されます。

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd

Etcd サービスと通信するには証明書が必要で、これは `openshift-monitoring` ネームスペースのシークレット `kube-etcd-client-certs` にあります。Datadog Agent にこの証明書へのアクセスを許可するには、Datadog Agent が実行しているのと同じネームスペースにこれをコピーします。

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

これらの証明書は、以下のように volumes および volumeMounts を追加してクラスターチェックランナーポッドにマウントする必要があります。

**注**: またマウントは、Agent にパッケージ化されている Etcd チェックの自動コンフィギュレーションファイルを無効化するために含まれています。


{{< tabs >}}
{{% tab "Helm" %}}

```yaml
...
clusterChecksRunner:
  volumes:
    - name: etcd-certs
      secret:
        secretName: kube-etcd-client-certs
    - name: disable-etcd-autoconf
      emptyDir: {}
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/etcd
      readOnly: true
    - name: disable-etcd-autoconf
      mountPath: /etc/datadog-agent/conf.d/etcd.d
```

{{% /tab %}}
{{% tab "Operator" %}}

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    clusterChecksRunner:
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /etc/etcd-certs
            - name: disable-etcd-autoconf
              mountPath: /etc/datadog-agent/conf.d/etcd.d
      volumes:
        - name: etcd-certs
          secret:
            secretName: kube-etcd-client-certs
        - name: disable-etcd-autoconf
          emptyDir: {}
```

{{% /tab %}}
{{< /tabs >}}


次に、Etcd の前で実行しているサービスをアノテーションします。

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。


### Controller Manager

Controller Manager は、`openshift-kube-controller-manager` ネームスペースで `kube-controller-manager` サービスの背面で実行します。サービスをチェックコンフィギュレーションでアノテーションします。


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。



### Scheduler

Scheduler は、`openshift-kube-scheduler` ネームスペースで `scheduler` サービスの背面で実行します。サービスをチェックコンフィギュレーションでアノテーションします。


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。


## OpenShift 3 上の Kubernetes {#OpenShift3}

OpenShift 3 では、エンドポイントチェックを使用してすべてのコントロールプレーン コンポーネントを監視できます。

### 前提条件

1. Datadog [Cluster Agent][6] の有効化
1. [Cluster チェック][7]の有効化
1. [Endpoint チェック][8]の有効化
1. サービスの作成および編集には、ログイン済みで十分な権限を保持していることをご確認ください。

### API サーバー

API サーバーは、`default` ネームスペースで `kubernetes` サービスの背面で動作します。このサービスを `kube_apiserver_metrics` コンフィギュレーションでアノテーションします。

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

最後のアノテーション `ad.datadoghq.com/endpoints.resolve` は、サービスが静的ポッドの前面にあるため必要となります。Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。実行しているノードは、以下で識別されます。

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd

Etcd サービスと通信するには証明書が必要で、これはホストにあります。これらの証明書は、以下のように volumes および volumeMounts を追加してクラスターチェックランナーポッドにマウントする必要があります。

**注**: またマウントは、Agent にパッケージ化されている Etcd チェックの自動コンフィギュレーションファイルを無効化するために含まれています。

{{< tabs >}}
{{% tab "Helm" %}}

```yaml
...
clusterChecksRunner:
  volumes:
    - hostPath:
        path: /etc/etcd
      name: etcd-certs
    - name: disable-etcd-autoconf
      emptyDir: {}
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/etcd
      readOnly: true
    - name: disable-etcd-autoconf
      mountPath: /etc/datadog-agent/conf.d/etcd.d
```

{{% /tab %}}
{{% tab "Operator" %}}

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    clusterChecksRunner:
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/etc/etcd
            - name: disable-etcd-autoconf
              mountPath: /etc/datadog-agent/conf.d/etcd.d
      volumes:
        - name: etcd-certs
          hostPath:
            path: /etc/etcd
        - name: disable-etcd-autoconf
          emptyDir: {}
```

{{% /tab %}}
{{< /tabs >}}

このサービスに直接行った編集は永続的ではないため、Etcd サービスのコピーを作成します。

```shell
oc get service etcd -n kube-system -o yaml | sed 's/name: etcd/name: etcd-copy/'  | oc create -f -

```

チェックコンフィギュレーションでコピーしたサービスをアノテーションします。

```shell
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/host/etc/etcd/ca/ca.crt", "tls_cert": "/host/etc/etcd/server.crt",
      "tls_private_key": "/host/etc/etcd/server.key"}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。


### Controller Manager と Scheduler

Controller Manager および Scheduler は、同じサービス、つまり `kube-system` ネームスペースの `kube-controllers` の背面で実行します。サービスに直接行った編集は永続的ではないため、このサービスのコピーを作成します。

```shell
oc get service kube-controllers -n kube-system -o yaml | sed 's/name: kube-controllers/name: kube-controllers-copy/'  | oc create -f -

```

チェックコンフィギュレーションでコピーしたサービスをアノテーションします。

```shell
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager", "kube_scheduler"]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.init_configs=[{}, {}]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.instances=[{ "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }, { "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。



## [Rancher Kubernetes Engine (v2.5+) 上の Kubernetes] {#RKE}

Rancher v2.5 は、[PushProx][9] に依存してコントロールプレーンのメトリクスエンドポイントを公開し、これにより Datadog Agent はコントロールプレーンチェックを実行しメトリクスを収集することができます。

### 前提条件

1. [rancher-monitoring チャート][10]で Datadog Agent をインストールします。
2. `pushprox` DaemonSets は `rancher-monitoring` でデプロイされ、`cattle-monitoring-system` ネームスペースで実行しています。

### API サーバー

`kube_apiserver_metrics` チェックを続行するには、以下のアノテーションを `default/kubernetes` サービスに追加します。

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Kubernetes サービスを追加し自動ディスカバリーチェックを構成します

ヘッドレス Kubernetes サービスを追加してチェックのコンフィギュレーションを定義することで、Datadog Agent は `pushprox` ポッドをターゲットとしてメトリクスを収集できます。

`rancher-control-plane-services.yaml` を適用します。

```yaml
apiVersion: v1
kind: Service
metadata:
  name: pushprox-kube-scheduler-datadog
  namespace: cattle-monitoring-system
  labels:
    component: kube-scheduler
    k8s-app: pushprox-kube-scheduler-client
  annotations:
    ad.datadoghq.com/endpoints.check_names: '["kube_scheduler"]'
    ad.datadoghq.com/endpoints.init_configs: '[{}]'
    ad.datadoghq.com/endpoints.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:10251/metrics"
        }
      ]
spec:
  clusterIP: None
  selector:
    k8s-app: pushprox-kube-scheduler-client
---
apiVersion: v1
kind: Service
metadata:
  name: pushprox-kube-controller-manager-datadog
  namespace: cattle-monitoring-system
  labels:
    component: kube-controller-manager
    k8s-app: pushprox-kube-controller-manager-client
  annotations:
    ad.datadoghq.com/endpoints.check_names: '["kube_controller_manager"]'
    ad.datadoghq.com/endpoints.init_configs: '[{}]'
    ad.datadoghq.com/endpoints.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:10252/metrics"
        }
      ]
spec:
  clusterIP: None
  selector:
    k8s-app: pushprox-kube-controller-manager-client
---
apiVersion: v1
kind: Service
metadata:
  name: pushprox-kube-etcd-datadog
  namespace: cattle-monitoring-system
  labels:
    component: kube-etcd
    k8s-app: pushprox-kube-etcd-client
  annotations:
    ad.datadoghq.com/endpoints.check_names: '["etcd"]'
    ad.datadoghq.com/endpoints.init_configs: '[{}]'
    ad.datadoghq.com/endpoints.instances: |
      [
        {
          "prometheus_url": "https://%%host%%:2379/metrics",
          "tls_ca_cert": "/host/opt/rke/etc/kubernetes/ssl/kube-ca.pem",
          "tls_cert": "/host/opt/rke/etc/kubernetes/ssl/kube-etcd-<node-ip>.pem",
          "tls_private_key": "/host/opt/rke/etc/kubernetes/ssl/kube-etcd-<node-ip>.pem"
        }
      ]
spec:
  clusterIP: None
  selector:
    k8s-app: pushprox-kube-etcd-client
```

以下のコンフィギュレーションに基づき、マニフェストで Datadog Agent をデプロイします。

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
agents:
  volumes:
    - hostPath:
        path: /opt/rke/etc/kubernetes/ssl
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/opt/rke/etc/kubernetes/ssl
      readOnly: true
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/controlplane
    operator: Exists
  - effect: NoExecute
    key: node-role.kubernetes.io/etcd
    operator: Exists
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    nodeAgent:
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/opt/rke/etc/kubernetes/ssl
      volumes:
        - name: etcd-certs
          hostPath:
            path: /opt/rke/etc/kubernetes/ssl
      tolerations:
        - key: node-role.kubernetes.io/controlplane
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/etcd
          operator: Exists
          effect: NoExecute
```

{{% /tab %}}
{{< /tabs >}}


## Rancher Kubernetes Engine (v2.5 より前) 上の Kubernetes {#RKEBefore2_5}

### API Server、Controller Manager、Scheduler

[rancher-monitoring チャート][10]で Datadog Agent をインストールします。

コントロールプレーンのコンポーネントは、Kubernetes の外の Docker 上で実行されます。Kubernetes 内では、`default` ネームスペースにある `kubernetes` サービスがコントロールプレーンノードの IP をターゲットにしています。これは `$ kubectl describe endpoints kubernetes` を実行することで確認することができます。

このサービスにエンドポイントチェック (Datadog Cluster Agent で管理) をアノテーションすることで、API Server、Controller Manager、Scheduler を監視することが可能です。

```shell
kubectl edit service kubernetes
```


```yaml
metadata:
  annotations:
    ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics", "kube_controller_manager", "kube_scheduler"]'
    ad.datadoghq.com/endpoints.init_configs: '[{},{},{}]'
    ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" },
      {"prometheus_url": "http://%%host%%:10252/metrics"},
      {"prometheus_url": "http://%%host%%:10251/metrics"}]'
```

### Etcd

Etcd は Kubernetes 外の Docker で実行され、Etcd サービスとの通信には証明書が必要です。Etcd モニタリングのセットアップに推奨される手順では、Etcd を実行しているコントロールプレーンノードへの SSH アクセスが必要です。

1. [Rancher ドキュメント][9]に従って、コントロールプレーンノードに SSH 接続します。Docker コンテナで Etcd が起動していることを `$ docker ps` で確認し、`$ docker inspect etcd` で実行コマンド (`"Cmd"`) で使用した証明書の場所と、マウントのホストパスを確認します。

コマンドで探すのは、3 つのフラグです。

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. `$ docker inspect etcd` の出力にあるマウント情報を使って、Datadog Agent のコンフィギュレーションに `volumes` と `volumeMounts` を設定します。また、Datadog Agent がコントロールプレーンノードで実行できるように、許容範囲も含めてください。

以下は、Helm と Datadog Operator で Datadog Agent を構成する例です。


{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
agents:
  volumes:
    - hostPath:
        path: /opt/rke/etc/kubernetes/ssl
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/opt/rke/etc/kubernetes/ssl
      readOnly: true
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/controlplane
    operator: Exists
  - effect: NoExecute
    key: node-role.kubernetes.io/etcd
    operator: Exists
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    nodeAgent:
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/opt/rke/etc/kubernetes/ssl
      volumes:
        - name: etcd-certs
          hostPath:
            path: /opt/rke/etc/kubernetes/ssl
      tolerations:
        - key: node-role.kubernetes.io/controlplane
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/etcd
          operator: Exists
          effect: NoExecute
```

{{% /tab %}}
{{< /tabs >}}


3. Etcd が動作しているノードで Etcd チェックを実行するために、pause コンテナを持つ DaemonSet をセットアップします。この DaemonSet は、Etcd サービスにアクセスできるように、ホストネットワーク上で実行されます。また、コントロールプレーンノードで実行するために必要なチェックの設定と許容範囲も備えています。マウントされた証明書ファイルのパスがインスタンスで設定したものと一致していることを確認し、それに応じて `<...>` の部分を置き換えてください。

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: etcd-pause
spec:
  selector:
    matchLabels:
      app: etcd-pause
  updateStrategy:
    type: RollingUpdate
  template:
    metadata:
      annotations:
        ad.datadoghq.com/pause.check_names: '["etcd"]'
        ad.datadoghq.com/pause.init_configs: '[{}]'
        ad.datadoghq.com/pause.instances: |
          [{
            "prometheus_url": "https://%%host%%:2379/metrics",
            "tls_ca_cert": "/host/etc/kubernetes/ssl/kube-ca.pem",
            "tls_cert": "/host/etc/kubernetes/ssl/kube-etcd-<...>.pem",
            "tls_private_key": "/host/etc/kubernetes/ssl/kube-etcd-<...>-key.pem"
          }]
      labels:
        app: etcd-pause
      name: etcd-pause
    spec:
      hostNetwork: true
      containers:
      - name: pause
        image: k8s.gcr.io/pause:3.0
      tolerations:
      - effect: NoExecute
        key: node-role.kubernetes.io/etcd
        operator: Exists
      - effect: NoSchedule
        key: node-role.kubernetes.io/controlplane
        operator: Exists
```

DaemonSet とチェックコンフィギュレーションをデプロイするには、以下を実行します。

```shell
kubectl apply -f <filename>
```


## マネージドサービス (AKS、GKE) で Kubernetes を使用 {#ManagedServices}

Azure Kubernetes Service (AKS) や Google Kubernetes Engine (GKE) などのその他のマネージドサービスでは、ユーザーは Control Plane コンポーネントにアクセスできません。そのため、これらの環境では `kube_apiserver`、`kube_controller_manager`、`kube_scheduler`、または `etcd` チェックを実行することができません。


[1]: https://docs.datadoghq.com/ja/integrations/kube_apiserver_metrics/
[2]: https://docs.datadoghq.com/ja/integrations/etcd/?tab=containerized
[3]: https://docs.datadoghq.com/ja/integrations/kube_controller_manager/
[4]: https://docs.datadoghq.com/ja/integrations/kube_scheduler/
[5]: https://aws.github.io/aws-eks-best-practices/reliability/docs/controlplane/#monitor-control-plane-metrics
[6]: https://docs.datadoghq.com/ja/agent/cluster_agent/setup
[7]: https://docs.datadoghq.com/ja/agent/cluster_agent/clusterchecks/
[8]: https://docs.datadoghq.com/ja/agent/cluster_agent/endpointschecks/
[9]: https://rancher.com/docs/rancher/v2.0-v2.4/en/cluster-admin/nodes
[10]: https://github.com/DataDog/helm-charts/blob/main/examples/datadog/agent_on_rancher_values.yaml