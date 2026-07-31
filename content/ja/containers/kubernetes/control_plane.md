---
aliases:
- /ja/agent/kubernetes/control_plane
description: API サーバー、etcd、コントローラーマネージャー、スケジューラーなど、Kubernetes Control Plane コンポーネントをモニタリングします。
further_reading:
- link: agent/kubernetes/log
  tag: Documentation
  text: アプリケーションログの収集
- link: /agent/kubernetes/apm
  tag: Documentation
  text: アプリケーショントレースの収集
- link: /agent/kubernetes/prometheus
  tag: Documentation
  text: Prometheus メトリクスの収集
- link: /agent/kubernetes/integrations
  tag: Documentation
  text: アプリケーションのメトリクスとログを自動で収集
- link: /agent/guide/autodiscovery-management
  tag: Documentation
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/kubernetes/tag
  tag: Documentation
  text: コンテナから送信された全データにタグを割り当て
title: Kubernetes Control Plane モニタリング
---
## 概要

このセクションの目的は、特異性を文書化し、Kubernetes Control Plane をモニタリングするための適切な基本設定を提供することです。次に、この設定をカスタマイズして、Datadog 機能を追加できます。

[API サーバー][1]、[Etcd][2]、[Controller Manager][3]、[Scheduler][4] の Datadog インテグレーションにより、Kubernetes Control Plane の 4 つのコンポーネントすべてから主要なメトリクスを収集できます。

* [Kubernetes と Kubeadm](#Kubeadm)
* [Amazon EKS 上の Kubernetes](#EKS)
* [OpenShift 4 上の Kubernetes](#OpenShift4)
* [OpenShift 3 上の Kubernetes](#OpenShift3)
* [Talos Linux 上の Kubernetes](#TalosLinux)
* [Rancher Kubernetes Engine (v2.5+) 上の Kubernetes](#RKE)
* [Rancher Kubernetes Engine (\&lt;v2.5) 上の Kubernetes](#RKEBefore2_5)
* [マネージドサービス (AKS、GKE) 上の Kubernetes](#ManagedServices)

## Kubernetes と Kubeadm {#Kubeadm}

次の設定は、Kubernetes `v1.18+` でテストされています。

### API サーバー

API サーバーのインテグレーションは自動的に設定されます。Datadog Agent ではそれが自動的に検出されます。

### Etcd

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

### Controller Manager と Scheduler

#### 安全でないポート

Controller Manager インスタンスと Scheduler インスタンスの安全でないポートが有効になっている場合、Datadog Agent はインテグレーションを検出し、追加の設定なしでメトリクスの収集を開始します。

#### 安全なポート

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

 自己署名証明書を使用する場合は、`kube_controller_manager` および `kube_scheduler` 設定の `ssl_verify` フィールドを `false` に設定する必要があります。
安全なポートをターゲットにする場合、Controller Manager および Scheduler 設定の `bindaddress` オプションは、Datadog Agent から到達可能である必要があります。例:

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

### 推奨方法

<div class="alert alert-info">この機能はプレビュー中です。</div>

Datadog では、API サーバー、Controller Manager、Scheduler を含む Kubernetes Control Plane コンポーネントのモニタリングがサポートされています。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

#### 前提条件

1. Datadog Operator が `v1.18.0` 以上であること
1. Datadog Agent が `v7.69` 以上であること

#### 一般的なセットアップ

コントロールプレーンのモニタリングはデフォルトで有効ですが、イントロスペクションを有効にする必要があります。

[datadogoperator Helm チャート](https://github.com/DataDog/helmcharts/tree/main/charts/datadogoperator) を使用してイントロスペクションを有効にできます。

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

コマンドラインを使用します。

```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

この機能はデフォルトで有効になっているため、最小限の DatadogAgent スペックをデプロイできます。

{{% /tab %}}

{{% tab "Helm" %}}

#### 前提条件

1. Helm チャートバージョンが `3.152.0` 以上であること
1. Datadog Agent が `v7.69` 以上であること

#### 一般的なセットアップ

`providers.eks.controlPlaneMonitoring` オプションを使用してコントロールプレーンのモニタリングを有効にします。

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

#### 検証
チェックが実行されていることを確認します。

```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

次を確認してください。
 `kube_apiserver_metrics`
 `kube_controller_manager`
 `kube_scheduler`

Datadog でコントロールプレーンのメトリクスが確認できるはずです。たとえば、以下のものが含まれます。
 `kube_apiserver.*`
 `kube_controller_manager.*`
 `kube_scheduler.*`

### レガシーセットアップ

Amazon Elastic Kubernetes Service (EKS) では、クラスターチェックを使用したすべての Control Plane コンポーネントのモニタリングがサポートされています。

#### 前提条件
 EKS クラスターが Kubernetes バージョン 1.28 以上で実行されていること
 次のいずれかを使用して Agent をデプロイすること
   Helm チャートバージョン `3.90.1` 以上
   Datadog Operator `v1.13.0` 以上
 Datadog [Cluster Agent][6] を有効化すること

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
 Amazon は、[`metrics.eks.amazonaws.com`][11] API グループの下で、`kube_controller_manager` および `kube_scheduler` メトリクスを公開しています。
`"extra_headers":{"accept":"*/*"}` の追加により、EKS メトリクス API をクエリする際に `HTTP 406` エラーが防止されます。

## OpenShift 4 上の Kubernetes {#OpenShift4}

<div class="alert alert-info">この機能はプレビュー中です。</div>

Datadog では、API サーバー、etcd、Controller Manager、Scheduler を含む Kubernetes Control Plane コンポーネントのモニタリングがサポートされています。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

#### 前提条件

1. Datadog Operator が `v1.18.0` 以上であること
1. Datadog Agent が `v7.69` 以上であること

**注**: `etcd` はバージョン 4.04.13 ではサポートされていません。

#### 一般的なセットアップ

コントロールプレーンのモニタリングはデフォルトで有効ですが、イントロスペクションを有効にする必要があります。

[datadogoperator Helmチャート][12] を使用してイントロスペクションを有効にできます。

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

コマンドラインを使用します。

```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

また、OperatorHub/Marketplace を通じて Operator をインストールした**OpenShift ユーザー**の場合は ([推奨の方法] (installopenshift.md))、オペレーターのクラスターサービスバージョンにパッチを適用することで対応できます。

```shell
oc patch csv <datadog-operator.VERSION> -n <datadog-operator-namespace> \
  --type='json' \
  -p='[{"op": "add", "path": "/spec/install/spec/deployments/0/spec/template/spec/containers/0/args/-", "value": "--introspectionEnabled=true"}]'
```

この機能はデフォルトで有効になっているため、最小限の DatadogAgent スペックをデプロイできます。

`features.clusterChecks.useClusterChecksRunners` を有効にして、そこでチェックをスケジュールします。そうでない場合、コントロールプレーンのチェックは Node Agent で実行されます。

OpenShift 4.14 以降では、etcd をモニタリングするには etcd 証明書をコピーする必要があります。正確なコマンドについては、オペレーターのログを確認してください。次の例を参照してください (必要に応じてネームスペースを調整してください)。

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | \
  sed 's/namespace: openshift-etcd-operator/namespace: datadog/' | \
  oc apply -f -
```

[12]: https://github.com/DataDog/helmcharts/tree/main/charts/datadogoperator

{{% /tab %}}
{{% tab "Helm" %}}

#### 前提条件

1. Helm チャートのバージョンが `3.150.0` 以上であること
1. Datadog Agent が `v7.69` 以上であること

**注**: `etcd` はバージョン 4.04.13 ではサポートされていません。

#### 一般的なセットアップ

`providers.openshift.controlPlaneMonitoring`オプションを使用してコントロールプレーンのモニタリングを有効にします。

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

#### 検証
チェックが実行されていることを確認します。

```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

次を確認してください。
 `kube_apiserver_metrics`
 `kube_controller_manager`
 `kube_scheduler`
 `etcd`

Datadog でコントロールプレーンのメトリクスが確認できるはずです。たとえば、以下のものが含まれます。
 `kube_apiserver.*`
 `kube_controller_manager.*`
 `kube_scheduler.*`
 `etcd.*`

### レガシーセットアップ

OpenShift 4 では、エンドポイントチェックを使用してすべての Control Plane コンポーネントをモニタリングできます。

#### 前提条件

1. Datadog [Cluster Agent][6] の有効化
1. [Cluster チェック][7] の有効化
1. [Endpoint チェック][8] の有効化
1. サービスの編集およびシークレットの作成には、ログイン済みで十分な権限を保持していることをご確認ください。

#### API サーバー

API サーバーは、`default` ネームスペースで `kubernetes` サービスの背面で動作します。このサービスを `kube_apiserver_metrics` 設定でアノテーションします。

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

最後のアノテーション `ad.datadoghq.com/endpoints.resolve` は、サービスが静的な Pod の前面にあるため、必要となります。Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。実行されているノードは、次のように特定できます。

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```
#### Etcd

{{% collapse-content title="Etcd OpenShift 4.0  4.13" level="h4" %}}
Etcd サービスと通信するには証明書が必要で、これは `openshiftmonitoring` ネームスペースのシークレット `kubeetcdclientcerts` にあります。Datadog Agent にこの証明書へのアクセスを許可するには、Datadog Agent が実行されているのと同じネームスペースにこれをコピーします。

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

これらの証明書は、以下のように volumes および volumeMounts を追加してクラスターチェックランナー Pod にマウントする必要があります。

**注**: またマウントは、Agent にパッケージ化されている Etcd チェックの自動構成ファイルを無効化するために含まれています。


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


{{% collapse-content title="Etcd OpenShift 4.14 以降" level="h4" %}}

Etcd サービスと通信するには証明書が必要で、これは `openshiftetcdoperator` ネームスペースのシークレット `etcdmetricclient` にあります。Datadog Agent にこの証明書へのアクセスを許可するには、Datadog Agent が実行されているのと同じネームスペースにこれをコピーします。

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

これらの証明書は、以下のように volumes および volumeMounts を追加してクラスターチェックランナー Pod にマウントする必要があります。

**注**: またマウントは、Agent にパッケージ化されている Etcd チェックの自動構成ファイルを無効化するために含まれています。


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


#### Controller Manager

Controller Manager は、`openshiftkubecontrollermanager` ネームスペースで `kubecontrollermanager` サービスの背後で実行されます。サービスをチェックコンフィギュレーションでアノテーションします。


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。



#### Scheduler

Scheduler は、`openshiftkubescheduler` ネームスペースで `scheduler` サービスの背後で実行されます。サービスをチェックコンフィギュレーションでアノテーションします。


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。


## OpenShift 3 上の Kubernetes {#OpenShift3}

OpenShift 3 では、エンドポイントチェックを使用してすべての Control Plane コンポーネントをモニタリングできます。

### 前提条件

1. Datadog [Cluster Agent][6] の有効化
1. [Cluster チェック][7] の有効化
1. [Endpoint チェック][8] の有効化
1. サービスの作成および編集には、ログイン済みで十分な権限を保持していることをご確認ください。

### API サーバー

API サーバーは、`default` ネームスペースで `kubernetes` サービスの背面で動作します。このサービスを `kube_apiserver_metrics` 設定でアノテーションします。

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

最後のアノテーション `ad.datadoghq.com/endpoints.resolve` は、サービスが静的な Pod の前面にあるため、必要となります。Datadog Cluster Agent では、チェックをエンドポイントチェックとしてスケジュールし、クラスターチェックランナーにディスパッチします。実行されているノードは、次のように特定できます。

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd

Etcd サービスと通信するためには、ホスト上にある証明書が必要です。これらの証明書は、以下のように volumes および volumeMounts を追加してクラスターチェックランナー Pod にマウントする必要があります。

**注**: またマウントは、Agent にパッケージ化されている Etcd チェックの自動構成ファイルを無効化するために含まれています。

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

Controller Manager と Scheduler は、`kubesystem` ネームスペースで同じサービス `kubecontrollers` の背後で実行されます。このサービスに直接行った編集は永続的ではないため、サービスのコピーを作成します。

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

## Talos Linux 上の Kubernetes {#TalosLinux}

Talos Linux の推奨インストール方法は Helm です。フラグ `providers.talos.enabled` を `true` に設定して Helm を使用します。

### API サーバー

API サーバーのインテグレーションは自動的に設定されます。Datadog Agent ではそれが自動的に検出されます。

### Etcd

ホストにある Etcd 証明書への読み取りアクセスを提供することにより、Datadog Agent チェックは Etcd と通信し、Etcd メトリクスの収集を開始できます。

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

### Controller Manager と Scheduler

#### 安全なポート

安全なポートにより、Control Plane コンポーネントを保護するための認証と認可が可能になります。Datadog Agent は、安全なポートをターゲットにすることで、Controller Manager および Scheduler のメトリクスを収集できます。

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

 自己署名証明書を使用する場合は、`kube_controller_manager` および `kube_scheduler` 設定の `ssl_verify` フィールドを `false` に設定する必要があります。
安全なポートをターゲットにする場合、Controller Manager および Scheduler 設定の `bindaddress` オプションは、Datadog Agent から到達可能である必要があります。クラスター生成時にコントロールプレーンノードに以下のパッチを適用するか、Talos ノードを実行している場合は、`talosctl patch mc n &lt;controlplanenode1,controlplanenode2> patch @controlplanedatadogmonitoringpatch.yaml` を実行します。

{{< code-block lang="yaml" filename="controlplane-datadog-monitoring-patch.yaml" >}}
cluster:
  controllerManager:
    extraArgs:
      bind-address: 0.0.0.0
  scheduler:
    extraArgs:
      bind-address: 0.0.0.0
{{< /code-block >}}

## Rancher Kubernetes Engine (v2.5+) 上の Kubernetes {#RKE}

Rancher v2.5 は、[PushProx][9] に依存してコントロールプレーンのメトリクスエンドポイントを公開し、これにより Datadog Agent はコントロールプレーンチェックを実行しメトリクスを収集することができます。

### 前提条件

1. [ranchermonitoring チャート][10] を使用して Datadog Agent をインストールします。
2. `pushprox` DaemonSets が `ranchermonitoring` と共にデプロイされ、`cattlemonitoringsystem` ネームスペースで実行されていること。

### API サーバー

`kube_apiserver_metrics` チェックを設定するには、次のアノテーションを `default/kubernetes` サービスに追加します。

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Kubernetes サービスを追加して Autodiscovery チェックを設定

ヘッドレス Kubernetes サービスを追加してチェックコンフィギュレーションを定義することで、Datadog Agent は `pushprox` Pod をターゲットとしてメトリクスを収集できます。

`ranchercontrolplaneservices.yaml` を適用します。

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

### API Server、Controller Manager、Scheduler

[ranchermonitoring チャート][10] で Datadog Agent をインストールします。

Control Plane コンポーネントは、Kubernetes の外の Docker 上で実行されます。Kubernetes 内では、`default` ネームスペースにある `kubernetes` サービスが、コントロールプレーンノードの IP アドレスをターゲットにしています。これは、`$ kubectl describe endpoints kubernetes` を実行することで確認できます。

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

### Etcd

Etcd は Kubernetes 外の Docker で実行され、Etcd サービスとの通信には証明書が必要です。Etcd モニタリングのセットアップに推奨される手順では、Etcd を実行しているコントロールプレーンノードへの SSH アクセスが必要です。

1. [Rancher ドキュメント][9] に従って、コントロールプレーンノードに SSH 接続します。Docker コンテナで Etcd が動作していることを `$ docker ps` で確認し、`$ docker inspect etcd` で実行コマンド (`"Cmd"`) で使用した証明書の場所と、マウントのホストパスを確認します。

コマンドで探すのは、3 つのフラグです。

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. `$ docker inspect etcd` の出力にあるマウント情報を使用して、Datadog Agent の設定に `volumes` と `volumeMounts` を設定します。また、Datadog Agent がコントロールプレーンノードで実行できるように、許容範囲も含めてください。

以下は、Helm と Datadog Operator で Datadog Agent を設定する例です。


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


3. Etcd が動作しているノードで Etcd チェックを実行するために、pause コンテナを持つ DaemonSet をセットアップします。この DaemonSet は、Etcd サービスにアクセスできるように、ホストネットワーク上で実行されます。また、コントロールプレーンノードで実行するために必要なチェックのコンフィギュレーションと許容範囲も備えています。マウントされた証明書ファイルのパスがインスタンスで設定したものと一致していることを確認し、それに応じて `&lt;...>` の部分を置き換えてください。

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


## マネージドサービス (AKS、GKE) 上の Kubernetes {#ManagedServices}

Azure Kubernetes Service (AKS) や Google Kubernetes Engine (GKE) などのその他のマネージドサービスでは、ユーザーは Control Plane コンポーネントにアクセスできません。そのため、これらの環境では `kube_apiserver`、`kube_controller_manager`、`kube_scheduler`、または `etcd` チェックを実行することができません。


[1]: https://docs.datadoghq.com/ja/integrations/kube_apiserver_metrics/
[2]: https://docs.datadoghq.com/ja/integrations/etcd/?tab=containerized
[3]: https://docs.datadoghq.com/ja/integrations/kube_controller_manager/
[4]: https://docs.datadoghq.com/ja/integrations/kube_scheduler/
[5]: https://aws.github.io/awseksbestpractices/reliability/docs/controlplane/#monitorcontrolplanemetrics
[6]: https://docs.datadoghq.com/ja/agent/cluster_agent/setup
[7]: https://docs.datadoghq.com/ja/agent/cluster_agent/clusterchecks/
[8]: https://docs.datadoghq.com/ja/agent/cluster_agent/endpointschecks/
[9]: https://ranchermanager.docs.rancher.com/howtoguides/newuserguides/manageclusters/nodesandnodepools
[10]: https://github.com/DataDog/helmcharts/blob/main/examples/datadog/agent_on_rancher_values.yaml
[11]: https://docs.aws.amazon.com/eks/latest/userguide/viewrawmetrics.html