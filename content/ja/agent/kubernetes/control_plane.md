---
title: Kubernetes Control Plane モニタリング
kind: documentation
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
---
## 概要

このセクションの目的は、特異性を文書化し、Kubernetes Control Plane を監視するための適切な基本コンフィギュレーションを提供することです。次に、このコンフィギュレーションをカスタマイズして、Datadog 機能を追加できます。

[API サーバー][1]、[Etcd][2]、[Controller Manager][3]、[Scheduler][4] の Datadog インテグレーションにより、Kubernetes Control Plane の 4 つのコンポーネントすべてから主要なメトリクスを収集できます。

* [Kubernetes と Kubeadm](#Kubeadm)
* [Amazon EKS で Kubernetes を使用](#EKS)
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

```
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

```
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  credentials:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
    config:
      confd:
        configMapName: datadog-checks
      kubelet:
        tlsVerify: false
      volumes:
        - hostPath:
            path: /etc/kubernetes/pki/etcd
          name: etcd-certs
        - name: disable-etcd-autoconf
          emptyDir: {}
      volumeMounts:
        - name: etcd-certs
          mountPath: /host/etc/kubernetes/pki/etcd
          readOnly: true
        - name: disable-etcd-autoconf
          mountPath: /etc/datadog-agent/conf.d/etcd.d
      tolerations:
      - effect: NoSchedule
        key: node-role.kubernetes.io/master
        operator: Exists
  clusterAgent:
    image:
      name: "gcr.io/datadoghq/cluster-agent:latest"
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

```
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

```
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  credentials:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
    config:
      confd:
        configMapName: datadog-checks
      kubelet:
        tlsVerify: false
      volumes:
        - hostPath:
            path: /etc/kubernetes/pki/etcd
          name: etcd-certs
        - name: disable-etcd-autoconf
          emptyDir: {}
        - name: disable-scheduler-autoconf
          emptyDir: {}
        - name: disable-controller-manager-autoconf
          emptyDir: {}
      volumeMounts:
        - name: etcd-certs
          mountPath: /host/etc/kubernetes/pki/etcd
          readOnly: true
        - name: disable-etcd-autoconf
          mountPath: /etc/datadog-agent/conf.d/etcd.d
        - name: disable-scheduler-autoconf
          mountPath: /etc/datadog-agent/conf.d/kube_scheduler.d
        - name: disable-controller-manager-autoconf
          mountPath: /etc/datadog-agent/conf.d/kube_controller_manager.d
      tolerations:
      - effect: NoSchedule
        key: node-role.kubernetes.io/master
        operator: Exists
  clusterAgent:
    image:
      name: "gcr.io/datadoghq/cluster-agent:latest"
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

```
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

Amazon Elastic Kubernetes Service (EKS) では、[API サーバーメトリクスが公開されています][5]。これにより、Datadog Agent は [Kubernetes API サーバーメトリクスチェックに関するドキュメント][6]に記載されているように、エンドポイントチェックを使用して API サーバーメトリクスを取得することができます。チェックを設定するには、以下のアノテーションをサービスに追加します。

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances:
    '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

その他の Control Plane コンポーネントは EKS で公開されていないため、監視することはできません。

## マネージドサービス (AKS、GKE) で Kubernetes を使用 {#ManagedServices}

Azure Kubernetes Service (AKS) や Google Kubernetes Engine (GKE) などのその他のマネージドサービスでは、ユーザーは Control Plane コンポーネントにアクセスできません。そのため、これらの環境では `kube_apiserver`、`kube_controller_manager`、`kube_scheduler`、`etcd` チェックを実行することができません。


[1]: https://docs.datadoghq.com/ja/integrations/kube_apiserver_metrics/
[2]: https://docs.datadoghq.com/ja/integrations/etcd/?tab=containerized
[3]: https://docs.datadoghq.com/ja/integrations/kube_controller_manager/
[4]: https://docs.datadoghq.com/ja/integrations/kube_scheduler/
[5]: https://aws.github.io/aws-eks-best-practices/reliability/docs/controlplane.html#monitor-control-plane-metrics
[6]: https://docs.datadoghq.com/ja/integrations/kube_apiserver_metrics/