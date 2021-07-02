---
title: Kubernetes Control Plane Monitoring
kind: documentation
further_reading:
    - link: 'agent/kubernetes/log'
      tag: 'Documentation'
      text: 'Collect your application logs'
    - link: '/agent/kubernetes/apm'
      tag: 'Documentation'
      text: 'Collect your application traces'
    - link: '/agent/kubernetes/prometheus'
      tag: 'Documentation'
      text: 'Collect your Prometheus metrics'
    - link: '/agent/kubernetes/integrations'
      tag: 'Documentation'
      text: 'Collect automatically your application metrics and logs'
    - link: '/agent/guide/autodiscovery-management'
      tag: 'Documentation'
      text: 'Limit data collection to a subset of containers only'
    - link: '/agent/kubernetes/tag'
      tag: 'Documentation'
      text: 'Assign tags to all data emitted by a container'
---

## Overview

This section aims to document specificities and to provide good base configurations for monitoring the Kubernetes Control Plane. You can then customize these configurations to add any Datadog feature.

With Datadog integrations for the [API server][1], [Etcd][2], [Controller Manager][3], and [Scheduler][4], you can collect key metrics from all four components of the Kubernetes Control Plane.

* [Kubernetes with Kubeadm](#Kubeadm)
* [Kubernetes on Amazon EKS](#EKS)
* [Kubernetes on Managed Services (AKS, GKE)](#ManagedServices)

## Kubernetes with Kubeadm {#Kubeadm}

The following configurations are tested on Kubernetes `v1.18+`.

### API server

The API server integration is automatically configured. The Datadog Agent discovers it automatically.

### Etcd

By providing read access to the Etcd certificates located on the host, the Datadog Agent check can communicate with Etcd and start collecting Etcd metrics.

{{< tabs >}}
{{% tab "Helm" %}}

Custom `values.yaml`:

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

### Controller Manager and Scheduler

#### Insecure ports

If the insecure ports of your Controller Manager and Scheduler instances are enabled, the Datadog Agent discovers the integrations and starts collecting metrics without any additional configuration. 

#### Secure ports

Secure ports allow authentication and authorization to protect your Control Plane components. The Datadog Agent can collect Controller Manager and Scheduler metrics by targeting their secure ports.

{{< tabs >}}
{{% tab "Helm" %}}

Custom `values.yaml`:

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

**Notes:**

- The `ssl_verify` field in the `kube_controller_manager` and `kube_scheduler` configuration needs to be set to `false` when using self-signed certificates.
- When targeting secure ports, the `bind-address` option in your Controller Manager and Scheduler configuration must be reachable by the Datadog Agent. Example:

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

## Kubernetes on Amazon EKS {#EKS}

On Elastic Kubernetes Service (EKS), AWS exposes API server metrics on a [single endpoint][5]. This allows the Datadog Agent to obtain API server metrics using endpoint checks as described in the [Kubernetes API server metrics check documentation][6]. To configure the check, add the following annotations to the `default/kubernetes` service:

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances:
    '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

Other control plane components are not exposed in EKS and cannot be monitored.

## Kubernetes on managed services (AKS, GKE) {#ManagedServices}

On other managed services, such as Azure Kubernetes Service (AKS) and Google Kubernetes Engine (GKE), the user cannot access the control plane components. As a result, it is not possible to run the `kube_apiserver`, `kube_controller_manager`, `kube_scheduler`, and `etcd` checks in these environments.


[1]: https://docs.datadoghq.com/integrations/kube_apiserver_metrics/
[2]: https://docs.datadoghq.com/integrations/etcd/?tab=containerized
[3]: https://docs.datadoghq.com/integrations/kube_controller_manager/
[4]: https://docs.datadoghq.com/integrations/kube_scheduler/
[5]: https://aws.github.io/aws-eks-best-practices/reliability/docs/controlplane/#monitor-control-plane-metrics
[6]: https://docs.datadoghq.com/integrations/kube_apiserver_metrics/