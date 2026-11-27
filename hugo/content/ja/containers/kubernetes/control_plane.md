---
aliases:
- /ja/agent/kubernetes/control_plane
description: API サーバー、etcd、コントローラーマネージャー、スケジューラーなど、Kubernetes Control Plane コンポーネントをモニタリングします。
further_reading:
- link: agent/kubernetes/log
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /agent/kubernetes/apm
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
  text: コンテナから送信された全データにタグを割り当てる
title: Kubernetes Control Plane モニタリング
---
## 概要 {#overview}

このセクションの目的は、特異性を文書化し、Kubernetes Control Plane をモニタリングするための適切な基本設定を提供することです。次に、この設定をカスタマイズして、Datadog 機能を追加できます。

[API サーバー][1]、[Etcd][2]、[Controller Manager][3]、[Scheduler][4] の Datadog インテグレーションにより、Kubernetes Control Plane の 4 つのコンポーネントすべてから主要なメトリクスを収集できます。

* [Kubernetes と Kubeadm](#Kubeadm)
* [Amazon EKS 上の Kubernetes](#EKS)
* [OpenShift 4 上の Kubernetes](#OpenShift4)
* [OpenShift 3 上の Kubernetes](#OpenShift3)
* [Talos Linux 上の Kubernetes](#TalosLinux)
* [Rancher Kubernetes Engine (v2.5 以上) 上の Kubernetes](#RKE)
* [Rancher Kubernetes Engine (v2.5 未満) 上の Kubernetes](#RKEBefore2_5)
* [マネージドサービス (AKS、GKE) 上の Kubernetes](#ManagedServices)

## Kubernetes と Kubeadm {#Kubeadm}

次の設定は、Kubernetes `v1.18+` でテストされています。

### API サーバー {#api-server}

API サーバーのインテグレーションは自動的に設定されます。Datadog Agent ではそれが自動的に検出されます。

### Etcd {#etcd}

ホストにある Etcd 証明書への読み取りアクセスを提供することにより、Datadog Agent チェックは Etcd と通信し、Etcd メトリクスの収集を開始できます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
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
        name: registry.datadoghq.com/cluster-agent:latest
    nodeAgent:
      image:
        name: registry.datadoghq.com/agent:latest
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
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
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
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

### Controller Manager と Scheduler {#controller-manager-and-scheduler}

#### 安全でないポート {#insecure-ports}

Controller Manager インスタンスと Scheduler インスタンスの安全でないポートが有効になっている場合、Datadog Agent はインテグレーションを検出し、追加の設定なしでメトリクスの収集を開始します。

#### 安全なポート {#secure-ports}

安全なポートにより、Control Plane コンポーネントを保護するための認証と認可が可能になります。Datadog Agent は、安全なポートをターゲットにすることで、Controller Manager および Scheduler のメトリクスを収集できます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
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
        name: registry.datadoghq.com/cluster-agent:latest
    nodeAgent:
      image:
        name: registry.datadoghq.com/agent:latest
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
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
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
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

**注:**

- 自己署名証明書を使用する場合、`kube_controller_manager` および `kube_scheduler` の設定で `ssl_verify` フィールドを `false` に設定する必要があります。
- 安全なポートをターゲットにする場合、Controller Manager および Scheduler 設定の `bind-address` オプションは、Datadog Agent から到達可能である必要があります。例:

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

## Amazon EKS 上の Kubernetes {#EKS}

### 推奨方法 {#recommended-method}

<div class="alert alert-info">この機能はプレビュー中です。</div>

Datadog では、API サーバー、Controller Manager、Scheduler を含む Kubernetes Control Plane コンポーネントのモニタリングがサポートされています。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

#### 前提条件 {#prerequisites}

1. Datadog Operator `v1.18.0` 以上
1. Datadog Agent `v7.69` 以上

#### 一般的なセットアップ {#general-setup}

Datadog Operator `v1.29.0` 以降では、Operator がノードラベルから EKS を検出し、コントロールプレーンのモニタリングを自動的に有効にするため、最小限の `DatadogAgent` 仕様で十分です。追加の設定は必要ありません。

{{% collapse-content title="Datadog Operator v1.18.0 から v1.28.x" level="h5" %}}

これらのバージョンでは、コントロールプレーンのモニタリングはデフォルトで有効ですが、イントロスペクションが必要です。[datadog-operator Helm チャート][1]を使用して、イントロスペクションを有効にします。

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

コマンドラインを使用します。

```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

次に、最小限の `DatadogAgent` 仕様をデプロイします。

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Helm" %}}

#### 前提条件 {#prerequisites-1}

1. Helm チャートバージョン `3.152.0` 以上
1. Datadog Agent `v7.69` 以上

#### 一般的なセットアップ {#general-setup-1}

`providers.eks.controlPlaneMonitoring` オプションを使用して、コントロールプレーンのモニタリングを有効にします。

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
providers:
  eks:
    controlPlaneMonitoring: true
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

#### 検証 {#validation}
チェックが実行されていることを確認します。

```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

次を確認してください。
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`

Datadog で、以下のようなコントロールプレーンのメトリクスを確認できるはずです。
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`

### レガシーセットアップ {#legacy-setup}

Amazon Elastic Kubernetes Service (EKS) では、クラスターチェックを使用したすべての Control Plane コンポーネントのモニタリングがサポートされています。

#### 前提条件 {#prerequisites-2}
- EKS クラスターが Kubernetes バージョン 1.28 以上で実行されていること
- 次のいずれかを使用して Agent をデプロイすること:
  - Helm チャートバージョン `3.90.1` 以上
  - Datadog Operator `v1.13.0` 以上
- Datadog [Cluster Agent][6] を有効にしていること

`default/kubernetes` サービスに次のアノテーションを追加します。

```yaml
annotations:
  ad.datadoghq.com/endpoints.checks: |-
    {
      "kube_apiserver_metrics": {
        "init_config": {},
        "instances": [
          {
            "prometheus_url": "https://%%host%%:%%port%%/metrics",
            "bearer_token_auth": "true"
          }
        ]
      }
    }
  ad.datadoghq.com/service.checks: |-
    {
      "kube_controller_manager": {
        "init_config": {},
        "instances": [
          {
            "prometheus_url": "https://%%host%%:%%port%%/apis/metrics.eks.amazonaws.com/v1/kcm/container/metrics",
            "extra_headers": {"accept":"*/*"},
            "bearer_token_auth": "true",
            "tls_ca_cert": "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
          }
        ]
      },
      "kube_scheduler": {
        "init_config": {},
        "instances": [
          {
            "prometheus_url": "https://%%host%%:%%port%%/apis/metrics.eks.amazonaws.com/v1/ksh/container/metrics",
            "extra_headers": {"accept":"*/*"},
            "bearer_token_auth": "true",
            "tls_ca_cert": "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
          }
        ]
      }
    }
```

**注:**
- Amazon は、[`metrics.eks.amazonaws.com`][11] API グループで `kube_controller_manager` および `kube_scheduler` メトリクスを公開します。
- `"extra_headers":{"accept":"*/*"}` を追加すると、EKS メトリクス API をクエリする際の `HTTP 406` エラーの発生を防ぐことができます。

## OpenShift 4 上の Kubernetes {#OpenShift4}

<div class="alert alert-info">この機能はプレビュー中です。</div>

Datadog では、API サーバー、etcd、Controller Manager、Scheduler を含む Kubernetes Control Plane コンポーネントのモニタリングがサポートされています。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

#### 前提条件 {#prerequisites-3}

1. Datadog Operator `v1.18.0` 以上
1. Datadog Agent `v7.69` 以上

**注**: `etcd` はバージョン 4.0 から 4.13 ではサポートされていません。

#### 一般的なセットアップ {#general-setup-2}

Datadog Operator `v1.29.0` 以降では、Operator が `node.openshift.io/os_id` ノードラベルから OpenShift を検出し、コントロールプレーンのモニタリングを自動的に有効にするため、最小限の `DatadogAgent` 仕様で十分です。追加の設定は必要ありません。

{{% collapse-content title="Datadog Operator v1.18.0 から v1.28.x" level="h5" %}}

これらのバージョンでは、コントロールプレーンのモニタリングはデフォルトで有効ですが、イントロスペクションが必要です。[datadog-operator Helm チャート][1]を使用して、イントロスペクションを有効にします。

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

コマンドラインを使用します。

```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

OperatorHub または Marketplace を介して Operator をインストールした場合は (これが[推奨される方法][2]です)、代わりに Operator クラスターサービスバージョンにパッチを適用します。

```shell
oc patch csv <datadog-operator.VERSION> -n <datadog-operator-namespace> \
  --type='json' \
  -p='[{"op": "add", "path": "/spec/install/spec/deployments/0/spec/template/spec/containers/0/args/-", "value": "--introspectionEnabled=true"}]'
```

次に、最小限の `DatadogAgent` 仕様をデプロイします。

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/install-openshift.md

{{% /collapse-content %}}

`features.clusterChecks.useClusterChecksRunners` を有効にして、そこでチェックが行われるようにスケジュールします。有効にしない場合は、Node Agent でコントロールプレーンのチェックが実行されます。

OpenShift 4.14 以降では、etcd をモニタリングするには etcd 証明書をコピーする必要があります。正確なコマンドについては、オペレーターのログを確認してください。次の例を参照してください (必要に応じてネームスペースを調整してください)。

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | \
  sed 's/namespace: openshift-etcd-operator/namespace: datadog/' | \
  oc apply -f -
```

{{% /tab %}}
{{% tab "Helm" %}}

#### 前提条件 {#prerequisites-4}

1. Helm チャートバージョン `3.150.0` 以上
1. Datadog Agent `v7.69` 以上

**注**: `etcd` はバージョン 4.0 から 4.13 ではサポートされていません。

#### 一般的なセットアップ {#general-setup-3}

`providers.openshift.controlPlaneMonitoring` オプションを使用して、コントロールプレーンのモニタリングを有効にします。

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
providers:
  openshift:
    controlPlaneMonitoring: true
{{< /code-block >}}

OpenShift 4.14 以降では、etcd をモニタリングするには etcd 証明書をコピーする必要があります。それらを Datadog Agent と同じネームスペースにコピーするには、次のように入力します。

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

{{% /tab %}}
{{< /tabs >}}

#### 検証 {#validation-1}
チェックが実行されていることを確認します。

```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

次を確認してください。
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`
- `etcd`

Datadog で、以下のようなコントロールプレーンのメトリクスを確認できるはずです。
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`
- `etcd.*`

### レガシーセットアップ {#legacy-setup-1}

OpenShift 4 では、エンドポイントチェックを使用してすべての Control Plane コンポーネントをモニタリングできます。

#### 前提条件 {#prerequisites-5}

1. Datadog [Cluster Agent][6] を有効にしていること
1. [Cluster チェック][7]を有効にしていること
1. [エンドポイントチェック][8]を有効にしていること
1. サービスを編集し、シークレットを作成するために十分な権限のあるアカウントでログインしていることを確認します。

#### API サーバー {#api-server-1}

API サーバーは `default` ネームスペースの `kubernetes` サービスの背後で動作します。このサービスに、`kube_apiserver_metrics` 設定をアノテーションとして追加します。

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

最後の `ad.datadoghq.com/endpoints.resolve` アノテーションは、サービスが静的ポッドの前面にあるために必要です。Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。実行されているノードは、次のように特定できます。

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```
#### Etcd {#etcd-1}

{{% collapse-content title="Etcd OpenShift 4.0 から 4.13" level="h5" %}}
Etcd サービスと通信するには証明書が必要です。これは `openshift-monitoring` ネームスペースの `kube-etcd-client-certs` シークレットにあります。Datadog Agent にこの証明書へのアクセスを許可するには、まず、Datadog Agent が実行されているのと同じネームスペースにこれをコピーします。

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

これらの証明書は、以下のように volumes および volumeMounts を追加してクラスターチェックランナー Pod にマウントする必要があります。

**注**: マウントは、Agent にパッケージ化されている Etcd チェックの自動構成ファイルを無効化するためにも含まれています。


{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
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
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
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
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

次に、Etcd の前で実行されているサービスをアノテーションします。

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。

{{% /collapse-content %}}


{{% collapse-content title="Etcd OpenShift 4.14 以降" level="h5" %}}

Etcd サービスと通信するには証明書が必要です。これは `openshift-etcd-operator` ネームスペースの `etcd-metric-client` シークレットにあります。Datadog Agent にこの証明書へのアクセスを許可するには、Datadog Agent が実行されているのと同じネームスペースにこれをコピーします。

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

これらの証明書は、以下のように volumes および volumeMounts を追加してクラスターチェックランナー Pod にマウントする必要があります。

**注**: マウントは、Agent にパッケージ化されている Etcd チェックの自動構成ファイルを無効化するためにも含まれています。


{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
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
            secretName: etcd-metric-client
        - name: disable-etcd-autoconf
          emptyDir: {}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
...
clusterChecksRunner:
  volumes:
    - name: etcd-certs
      secret:
        secretName: etcd-metric-client
    - name: disable-etcd-autoconf
      emptyDir: {}
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/etcd
      readOnly: true
    - name: disable-etcd-autoconf
      mountPath: /etc/datadog-agent/conf.d/etcd.d

{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

次に、Etcd の前で実行されているサービスをアノテーションします。

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'
```

Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。

{{% /collapse-content %}}


#### Controller Manager {#controller-manager}

Controller Manager は、`openshift-kube-controller-manager` ネームスペースの `kube-controller-manager` サービスの背後で動作します。このサービスに、チェック設定をアノテーションとして追加します。


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。



#### Scheduler {#scheduler}

Scheduler は `openshift-kube-scheduler` ネームスペースの `scheduler` サービスの背後で動作します。このサービスに、チェック設定をアノテーションとして追加します。


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。


## OpenShift 3 上の Kubernetes {#OpenShift3}

OpenShift 3 では、エンドポイントチェックを使用してすべての Control Plane コンポーネントをモニタリングできます。

### 前提条件 {#prerequisites-6}

1. Datadog [Cluster Agent][6] を有効にしていること
1. [Cluster チェック][7]を有効にしていること
1. [エンドポイントチェック][8]を有効にしていること
1. サービスを作成および編集するために十分な権限のあるアカウントでログインしていることを確認します。

### API サーバー {#api-server-2}

API サーバーは `kubernetes` ネームスペースの `default` サービスの背後で動作します。このサービスに、`kube_apiserver_metrics` 設定をアノテーションとして追加します。

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

最後の `ad.datadoghq.com/endpoints.resolve` アノテーションは、サービスが静的ポッドの前面にあるために必要です。Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。実行されているノードは、次のように特定できます。

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd {#etcd-2}

Etcd サービスと通信するためには、ホスト上にある証明書が必要です。これらの証明書は、以下のように volumes および volumeMounts を追加してクラスターチェックランナー Pod にマウントする必要があります。

**注**: マウントは、Agent にパッケージ化されている Etcd チェックの自動構成ファイルを無効化するためにも含まれています。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
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
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
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
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

このサービスに直接行った編集は永続的ではないため、Etcd サービスのコピーを作成します。

```shell
oc get service etcd -n kube-system -o yaml | sed 's/name: etcd/name: etcd-copy/'  | oc create -f -

```

コピーしたサービスに、チェック設定をアノテーションとして追加します。

```shell
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/host/etc/etcd/ca/ca.crt", "tls_cert": "/host/etc/etcd/server.crt",
      "tls_private_key": "/host/etc/etcd/server.key"}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。


### Controller Manager と Scheduler {#controller-manager-and-scheduler-1}

Controller Manager と Scheduler はどちらも、`kube-system` ネームスペースで同じサービスの `kube-controllers` の背後で動作します。このサービスに直接行った編集は永続的ではないため、サービスのコピーを作成します。

```shell
oc get service kube-controllers -n kube-system -o yaml | sed 's/name: kube-controllers/name: kube-controllers-copy/'  | oc create -f -

```

コピーしたサービスに、チェック設定をアノテーションとして追加します。

```shell
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager", "kube_scheduler"]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.init_configs=[{}, {}]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.instances=[{ "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }, { "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。

## Talos Linux 上の Kubernetes {#TalosLinux}

Datadog Operator と Helm はどちらも Talos Linux をサポートしています。

Datadog Operator を使用する場合、Talos 上のコントロールプレーンのモニタリングにはバージョン 1.32.0 以降が必要です。これは、ノードの OS イメージから Talos を検出して、自動的にチェックを構成します。Helm を使用する場合は、`providers.talos.enabled` を `true` に設定し、各チェックを自分で宣言します。

Agent をデプロイする前に、[Kubernetes ディストリビューションの Talos Linux セクション][13]に記載されているように、`privileged` Pod セキュリティ標準を使用するターゲットネームスペースにラベルを付けます。

### API サーバー {#api-server-3}

API サーバーのインテグレーションは自動的に設定されます。Datadog Agent ではそれが自動的に検出されます。

### Etcd {#TalosEtcd}

ホストにある Etcd 証明書への読み取りアクセスを提供することにより、Datadog Agent チェックは Etcd と通信し、Etcd メトリクスの収集を開始できます。

Talos では、これらの証明書はコントロールプレーンノード上にのみ存在するため、etcd チェックを実行するには Agent がコントロールプレーンのテイントを許容する必要があります。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator バージョン 1.32.0 以降では、コントロールプレーンのモニタリングがデフォルトで有効になっているため、Operator が etcd チェック設定を作成して、ホスト証明書を自動的にマウントします。標準の Datadog Agent に追加されるのは、コントロールプレーンの許容のみです。

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
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
    nodeAgent:
      # Required for the etcd check only. Without it, the API server,
      # Controller Manager, and Scheduler checks still run as cluster checks.
      tolerations:
        - key: node-role.kubernetes.io/control-plane
          operator: Exists
          effect: NoSchedule
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
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
      # You can configure the Agent to only run this check on the host where etcd is running
      # by using `ad_identifiers` for a pod that would only be running on a control-plane node.
      # This is to avoid errors when the Agent is running on worker nodes.
      # Another approach is to run a minimal pod on the control-plane node and use it for `ad_identifiers`.
      ad_identifiers:
        - kube-scheduler
      instances:
          # This is the node IP where metrics are exposed because kube-scheduler runs in host network mode.
          # Otherwise, the IP could be hardcoded to the master node IP (also in the environment variable `DD_KUBERNETES_KUBELET_HOST`).
        - prometheus_url: https://%%host%%:2379/metrics
          tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
          tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
          tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
agents:
  # Tolerations are needed to be scheduled on control-plane nodes running etcd
  tolerations:
  - key: node-role.kubernetes.io/control-plane
    operator: Exists
    effect: NoSchedule
  volumes:
    # On Talos, etcd certificates are stored in /system/secrets/etcd
    - hostPath:
        path: /system/secrets/etcd
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/kubernetes/pki/etcd
      readOnly: true
providers:
  talos:
    enabled: true
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Controller Manager と Scheduler {#controller-manager-and-scheduler-2}

#### 安全なポート {#secure-ports-1}

安全なポートにより、Control Plane コンポーネントを保護するための認証と認可が可能になります。Datadog Agent は、安全なポートをターゲットにすることで、Controller Manager および Scheduler のメトリクスを収集できます。

Datadog Operator バージョン 1.32.0 以降では、Operator が API サーバー、Controller Manager、および Scheduler のチェックをクラスターチェックとして実行するため、許容や Agent の設定は不要です。[Etcd](#TalosEtcd) セクションの許容は、etcd チェックにのみ適用されます。Controller Manager と Scheduler では、引き続き `bind-address` を `0.0.0.0` に設定する必要があります。

Helm を使用する場合は、次のようにチェックを宣言します。

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
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
        - kube-scheduler
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
  tolerations:
  - key: node-role.kubernetes.io/control-plane
    operator: Exists
    effect: NoSchedule
  volumes:
    - hostPath:
        path: /system/secrets/etcd
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/kubernetes/pki/etcd
      readOnly: true
providers:
  talos:
    enabled: true
{{< /code-block >}}

**注:**

- 自己署名証明書を使用する場合、`kube_controller_manager` および `kube_scheduler` の設定で `ssl_verify` フィールドを `false` に設定する必要があります。Datadog Operator バージョン 1.32.0 以降では、これは自動的に設定されます。
- 安全なポートをターゲットにする場合、Controller Manager および Scheduler 設定の `bind-address` オプションは、Datadog Agent から到達可能である必要があります。クラスター生成時にコントロールプレーンノードに以下のパッチを適用するか、実行中の Talos ノードに対して `talosctl patch mc -n <control-plane-node1,control-plane-node2> --patch @controlplane-datadog-monitoring-patch.yaml` を実行します。

{{< code-block lang="yaml" filename="controlplane-datadog-monitoring-patch.yaml" >}}
cluster:
  controllerManager:
    extraArgs:
      bind-address: 0.0.0.0
  scheduler:
    extraArgs:
      bind-address: 0.0.0.0
{{< /code-block >}}

## Rancher Kubernetes Engine (v2.5 以上) 上の Kubernetes {#RKE}

Rancher v2.5 は、[PushProx][9] に依存してコントロールプレーンのメトリクスエンドポイントを公開し、これにより Datadog Agent はコントロールプレーンチェックを実行しメトリクスを収集することができます。

### 前提条件 {#prerequisites-7}

1. [rancher-monitoring チャート][10]を使用して Datadog Agent をインストールします。
2. `pushprox` Daemonsets は `rancher-monitoring` でデプロイされ、`cattle-monitoring-system` ネームスペースで実行されます。

### API サーバー {#api-server-4}

`kube_apiserver_metrics` チェックを設定するには、`default/kubernetes` サービスに次のアノテーションを追加します。

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Kubernetes サービスを追加して Autodiscovery チェックを構成する {#add-kubernetes-services-to-configure-autodiscovery-checks}

ヘッドレス Kubernetes サービスを追加してチェック設定を定義することで、Datadog Agent は `pushprox` Pod を対象としてメトリクスを収集できるようになります。

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

以下の設定に基づき、マニフェストで Datadog Agent をデプロイします。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
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
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
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
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## Rancher Kubernetes Engine (v2.5 より前) 上の Kubernetes {#RKEBefore2_5}

### API サーバー、Controller Manager、Scheduler {#api-server-controller-manager-and-scheduler}

[rancher-monitoring チャート][10]を使用して Datadog Agent をインストールします。

コントロールプレーンコンポーネントは、Kubernetes 外部の Docker 上で実行されます。Kubernetes 内では、`default` ネームスペースにある `kubernetes` サービスは、コントロールプレーンノードの IP をターゲットにしています。これは `$ kubectl describe endpoints kubernetes` を実行することで確認できます。

このサービスにエンドポイントチェック (Datadog Cluster Agent で管理) をアノテーションすることで、API Server、Controller Manager、Scheduler をモニタリングすることが可能です。

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

### Etcd {#etcd-3}

Etcd は Kubernetes 外の Docker で実行され、Etcd サービスとの通信には証明書が必要です。Etcd モニタリングのセットアップに推奨される手順では、Etcd を実行しているコントロールプレーンノードへの SSH アクセスが必要です。

1. [Rancher ドキュメント][9]に従って、コントロールプレーンノードに SSH 接続します。`$ docker ps` を使用して Docker コンテナで Etcd が動作していることを確認し、`$ docker inspect etcd` を使用して実行コマンド (`"Cmd"`) で使用した証明書の場所と、マウントのホストパスを確認します。

コマンドで探すのは、3 つのフラグです。

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. `$ docker inspect etcd` の出力に示されているマウント情報を使用して、Datadog Agent の設定で `volumes` と `volumeMounts` を設定します。また、Datadog Agent がコントロールプレーンノードで実行できるように、許容も含めます。

以下に、Helm と Datadog Operator での Datadog Agent の設定例を示します。


{{< tabs >}}
{{% tab "Datadog Operator" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
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
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
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
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


3. Etcd が動作しているノードで Etcd チェックを実行するために、pause コンテナを持つ DaemonSet をセットアップします。この DaemonSet は、Etcd サービスにアクセスできるように、ホストネットワーク上で実行されます。また、コントロールプレーンノードで実行するために必要なチェック設定と許容も備えています。マウントされた証明書ファイルのパスがインスタンスで設定したものと一致していることを確認し、それに応じて `<...>` の部分を置き換えてください。

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

DaemonSet とチェック設定をデプロイするには、以下を実行します。

```shell
kubectl apply -f <filename>
```


## マネージドサービス (AKS、GKE) 上の Kubernetes {#ManagedServices}

Azure Kubernetes Service (AKS) や Google Kubernetes Engine (GKE) などのその他のマネージドサービスでは、ユーザーはコントロールプレーンコンポーネントにアクセスできません。そのため、これらの環境では `kube_apiserver`、`kube_controller_manager`、`kube_scheduler`、または `etcd` チェックを実行することはできません。


[1]: https://docs.datadoghq.com/ja/integrations/kube_apiserver_metrics/
[2]: https://docs.datadoghq.com/ja/integrations/etcd/?tab=containerized
[3]: https://docs.datadoghq.com/ja/integrations/kube_controller_manager/
[4]: https://docs.datadoghq.com/ja/integrations/kube_scheduler/
[5]: https://aws.github.io/aws-eks-best-practices/reliability/docs/controlplane/#monitor-control-plane-metrics
[6]: https://docs.datadoghq.com/ja/agent/cluster_agent/setup
[7]: https://docs.datadoghq.com/ja/agent/cluster_agent/clusterchecks/
[8]: https://docs.datadoghq.com/ja/agent/cluster_agent/endpointschecks/
[9]: https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/manage-clusters/nodes-and-node-pools
[10]: https://github.com/DataDog/helm-charts/blob/main/examples/datadog/agent_on_rancher_values.yaml
[11]: https://docs.aws.amazon.com/eks/latest/userguide/view-raw-metrics.html
[13]: /ja/containers/kubernetes/distributions/#Talos