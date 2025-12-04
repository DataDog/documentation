---
title: Kubernetes Control Plane Monitoring
description: Monitor Kubernetes control plane components including API server, etcd, controller manager, and scheduler
aliases:
- /agent/kubernetes/control_plane
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
* [Kubernetes on OpenShift 4](#OpenShift4)
* [Kubernetes on OpenShift 3](#OpenShift3)
* [Kubernetes on Talos Linux](#TalosLinux)
* [Kubernetes on Rancher Kubernetes Engine (v2.5+)](#RKE)
* [Kubernetes on Rancher Kubernetes Engine (\<v2.5)](#RKEBefore2_5)
* [Kubernetes on Managed Services (AKS, GKE)](#ManagedServices)

## Kubernetes with Kubeadm {#Kubeadm}

The following configurations are tested on Kubernetes `v1.18+`.

### API server

The API server integration is automatically configured. The Datadog Agent discovers it automatically.

### Etcd

By providing read access to the Etcd certificates located on the host, the Datadog Agent check can communicate with Etcd and start collecting Etcd metrics.

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

### Controller Manager and Scheduler

#### Insecure ports

If the insecure ports of your Controller Manager and Scheduler instances are enabled, the Datadog Agent discovers the integrations and starts collecting metrics without any additional configuration.

#### Secure ports

Secure ports allow authentication and authorization to protect your Control Plane components. The Datadog Agent can collect Controller Manager and Scheduler metrics by targeting their secure ports.

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

**Notes:**

- The `ssl_verify` field in the `kube_controller_manager` and `kube_scheduler` configuration needs to be set to `false` when using self-signed certificates.
- When targeting secure ports, the `bind-address` option in your Controller Manager and Scheduler configuration must be reachable by the Datadog Agent. Example:

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

## Kubernetes on Amazon EKS {#EKS}

### Recommended Method

<div class="alert alert-info">This feature is in Preview.</div>

Datadog supports monitoring Kubernetes Control Plane components, including the API Server, Controller Manager, and Scheduler.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

#### Prerequisites

1. Datadog Operator >= `v1.18.0`
1. Datadog Agent >= `v7.69`

#### General setup

Control plane monitoring is enabled by default, but requires introspection to be enabled.

You can enable introspection using the [datadog-operator Helm chart](https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator):

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

Using the command line:
```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Since this feature is enabled by default, you can deploy a minimal DatadogAgent spec.

{{% /tab %}}

{{% tab "Helm" %}}

#### Prerequisites

1. Helm chart version >= `3.150.0`
1. Datadog Agent >= `v7.69`

#### General setup

Enable control plane monitoring using the `providers.eks.controlPlaneMonitoring` option:

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

#### Validation
Verify that checks are running:
```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Look for:
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`

You should see control plane metrics in Datadog including:
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`

### Legacy setup

Amazon Elastic Kubernetes Service (EKS) supports monitoring all control plane components using cluster checks.

#### Prerequisites
- An EKS Cluster running on Kubernetes version >= 1.28
- Deploy the Agent using one of:
  - Helm chart version >= `3.90.1`
  - Datadog Operator >= `v1.13.0`
- Enable the Datadog [Cluster Agent][6]

Add the following annotations to the `default/kubernetes` service:

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

**Notes:**
- Amazon exposes `kube_controller_manager` and `kube_scheduler` metrics under the [`metrics.eks.amazonaws.com`][11] API Group.
- The addition of `"extra_headers":{"accept":"*/*"}` prevents `HTTP 406` errors when querying the EKS metrics API.

## Kubernetes on OpenShift 4 {#OpenShift4}

<div class="alert alert-info">This feature is in Preview.</div>

Datadog supports monitoring Kubernetes Control Plane components, including the API Server, etcd, Controller Manager, and Scheduler.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

#### Prerequisites

1. Datadog Operator >= `v1.18.0`
1. Datadog Agent >= `v7.69`

**Note**: `etcd` is not supported on versions 4.0-4.13.

#### General setup

Control plane monitoring is enabled by default, but requires introspection to be enabled.

You can enable introspection using the [datadog-operator Helm chart][12]:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

Using the command line:
```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Or, for **OpenShift users** who installed the operator through OperatorHub/Marketplace (the [recommended method](install-openshift.md)), by patching the operator cluster service version:

```shell
oc patch csv <datadog-operator.VERSION> -n <datadog-operator-namespace> \
  --type='json' \
  -p='[{"op": "add", "path": "/spec/install/spec/deployments/0/spec/template/spec/containers/0/args/-", "value": "--introspectionEnabled=true"}]'
```

Since this feature is enabled by default, you can deploy a minimal DatadogAgent spec.

Enable `features.clusterChecks.useClusterChecksRunners` to schedule checks there; otherwise, control plane checks run on the Node Agent.

For OpenShift 4.14 and higher, etcd monitoring requires copying certificates. Check the operator logs for the exact command. See the following example (adjust namespace as needed):

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | \
  sed 's/namespace: openshift-etcd-operator/namespace: datadog/' | \
  oc apply -f -
```

{{% /tab %}}
{{% tab "Helm" %}}

#### Prerequisites

1. Helm chart version >= `3.150.0`
1. Datadog Agent >= `v7.69`

**Note**: `etcd` is not supported on versions 4.0-4.13.

#### General setup

Enable control plane monitoring using the `providers.openshift.controlPlaneMonitoring` option:

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
providers:
  openshift:
    controlPlaneMonitoring: true
{{< /code-block >}}

For OpenShift 4.14 and higher, etcd monitoring requires copying certificates. To copy them into the same namespace the Datadog Agent is running in:

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

{{% /tab %}}
{{< /tabs >}}

#### Validation
Verify that checks are running:
```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Look for:
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`
- `etcd`

You should see control plane metrics in Datadog including:
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`
- `etcd.*`

### Legacy setup

On OpenShift 4, all control plane components can be monitored using endpoint checks.

#### Prerequisites

1. Enable the Datadog [Cluster Agent][6]
1. Enable [Cluster checks][7]
1. Enable [Endpoint checks][8]
1. Ensure that you are logged in with sufficient permissions to edit services and create secrets.

#### API server

The API server runs behind the service `kubernetes` in the `default` namespace. Annotate this service with the `kube_apiserver_metrics` configuration:

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

The last annotation `ad.datadoghq.com/endpoints.resolve` is needed because the service is in front of static pods. The Datadog Cluster Agent schedules the checks as endpoint checks and dispatches them to Cluster Check Runners. The nodes they are running on can be identified with:

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```
#### Etcd

{{% collapse-content title="Etcd OpenShift 4.0 - 4.13" level="h4" %}}
Certificates are needed to communicate with the Etcd service, which can be found in the secret `kube-etcd-client-certs` in the `openshift-monitoring` namespace. To give the Datadog Agent access to these certificates, first copy them into the same namespace the Datadog Agent is running in:

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

These certificates should be mounted on the Cluster Check Runner pods by adding the volumes and volumeMounts as below.

**Note**: Mounts are also included to disable the Etcd check autoconfiguration file packaged with the agent.


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

Then, annotate the service running in front of Etcd:

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

The Datadog Cluster Agent schedules the checks as endpoint checks and dispatches them to Cluster Check Runners.

{{% /collapse-content %}}


{{% collapse-content title="Etcd OpenShift 4.14 and higher" level="h4" %}}

Certificates are needed to communicate with the Etcd service, which can be found in the secret `etcd-metric-client` in the `openshift-etcd-operator` namespace. To give the Datadog Agent access to these certificates, first copy them into the same namespace the Datadog Agent is running in:

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

These certificates should be mounted on the Cluster Check Runner pods by adding the volumes and volumeMounts as below.

**Note**: Mounts are also included to disable the Etcd check autoconfiguration file packaged with the agent.


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

Then, annotate the service running in front of Etcd:

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'
```

The Datadog Cluster Agent schedules the checks as endpoint checks and dispatches them to Cluster Check Runners.

{{% /collapse-content %}}


#### Controller Manager

The Controller Manager runs behind the service `kube-controller-manager` in the `openshift-kube-controller-manager` namespace. Annotate the service with the check configuration:


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

The Datadog Cluster Agent schedules the checks as endpoint checks and dispatches them to Cluster Check Runners.



#### Scheduler

The Scheduler runs behind the service `scheduler` in the `openshift-kube-scheduler` namespace. Annotate the service with the check configuration:


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

The Datadog Cluster Agent schedules the checks as endpoint checks and dispatches them to Cluster Check Runners.


## Kubernetes on OpenShift 3 {#OpenShift3}

On OpenShift 3, all control plane components can be monitored using endpoint checks.

### Prerequisites

1. Enable the Datadog [Cluster Agent][6]
1. Enable [Cluster checks][7]
1. Enable [Endpoint checks][8]
1. Ensure that you are logged in with sufficient permissions to create and edit services.

### API server

The API server runs behind the service `kubernetes` in the `default` namespace. Annotate this service with the `kube_apiserver_metrics` configuration:

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

The last annotation `ad.datadoghq.com/endpoints.resolve` is needed because the service is in front of static pods. The Datadog Cluster Agent schedules the checks as endpoint checks and dispatches them to Cluster Check Runners. The nodes they are running on can be identified with:

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd

Certificates are needed to communicate with the Etcd service, which are located on the host. These certificates should be mounted on the Cluster Check Runner pods by adding the volumes and volumeMounts as below.

**Note**: Mounts are also included to disable the Etcd check autoconfiguration file packaged with the agent.

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

Direct edits of this service are not persisted, so make a copy of the Etcd service:

```shell
oc get service etcd -n kube-system -o yaml | sed 's/name: etcd/name: etcd-copy/'  | oc create -f -

```

Annotate the copied service with the check configuration:

```shell
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/host/etc/etcd/ca/ca.crt", "tls_cert": "/host/etc/etcd/server.crt",
      "tls_private_key": "/host/etc/etcd/server.key"}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

The Datadog Cluster Agent schedules the checks as endpoint checks and dispatches them to Cluster Check Runners.


### Controller Manager and Scheduler

The Controller Manager and Scheduler run behind the same service, `kube-controllers` in the `kube-system` namespace. Direct edits of the service are not persisted, so make a copy of the service:

```shell
oc get service kube-controllers -n kube-system -o yaml | sed 's/name: kube-controllers/name: kube-controllers-copy/'  | oc create -f -

```

Annotate the copied service with the check configurations:

```shell
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager", "kube_scheduler"]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.init_configs=[{}, {}]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.instances=[{ "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }, { "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.resolve=ip'

```

The Datadog Cluster Agent schedules the checks as endpoint checks and dispatches them to Cluster Check Runners.

## Kubernetes on Talos Linux {#TalosLinux}

Helm is the recommended installation method for Talos Linux. Use Helm by setting the flag `providers.talos.enabled` to `true`.

### API server

The API server integration is automatically configured. The Datadog Agent discovers it automatically.

### Etcd

By providing read access to the etcd certificates located on the host, the Datadog Agent check can communicate with etcd and start collecting etcd metrics.

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

### Controller Manager and Scheduler

#### Secure ports

Secure ports allow authentication and authorization to protect your Control Plane components. The Datadog Agent can collect Controller Manager and Scheduler metrics by targeting their secure ports.

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

**Notes:**

- The `ssl_verify` field in the `kube_controller_manager` and `kube_scheduler` configuration needs to be set to `false` when using self-signed certificates.
- When targeting secure ports, the `bind-address` option in your Controller Manager and Scheduler configuration must be reachable by the Datadog Agent. Apply the patch below to control-plane nodes at cluster generation; or, for running Talos nodes, run `talosctl patch mc -n <control-plane-node1,control-plane-node2> --patch @controlplane-datadog-monitoring-patch.yaml`.

{{< code-block lang="yaml" filename="controlplane-datadog-monitoring-patch.yaml" >}}
cluster:
  controllerManager:
    extraArgs:
      bind-address: 0.0.0.0
  scheduler:
    extraArgs:
      bind-address: 0.0.0.0
{{< /code-block >}}

## Kubernetes on Rancher Kubernetes Engine (v2.5+) {#RKE}

Rancher v2.5 relies on [PushProx][9] to expose control plane metric endpoints, this allows the Datadog Agent to run control plane checks and collect metrics.

### Prerequisites

1. Install the Datadog Agent with the [rancher-monitoring chart][10].
2. The `pushprox` daemonsets are deployed with `rancher-monitoring` and running in the `cattle-monitoring-system` namespace.

### API server

To configure the `kube_apiserver_metrics` check, add the following annotations to the `default/kubernetes` service:

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Add Kubernetes services to configure Autodiscovery checks

By adding headless Kubernetes services to define check configurations, the Datadog Agent is able to target the `pushprox` pods and collect metrics.

Apply `rancher-control-plane-services.yaml`:

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

Deploy the Datadog Agent with manifests based on the following configurations:

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


## Kubernetes on Rancher Kubernetes Engine (before v2.5) {#RKEBefore2_5}

### API Server, Controller Manager, and Scheduler

Install the Datadog Agent with the [rancher-monitoring chart][10].

The control plane components run on Docker outside of Kubernetes. Within Kubernetes, the `kubernetes` service in the `default` namespace targets the control plane node IP(s). You can confirm this by running `$ kubectl describe endpoints kubernetes`.

You can annotate this service with endpoint checks (managed by the Datadog Cluster Agent) to monitor the API Server, Controller Manager, and Scheduler:

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

Etcd is run in Docker outside of Kubernetes, and certificates are required to communicate with the Etcd service. The suggested steps to set up Etcd monitoring require SSH access to a control plane node running Etcd.

1. SSH into the control plane node by following the [Rancher documentation][9]. Confirm that Etcd is running in a Docker container with `$ docker ps`, and then use `$ docker inspect etcd` to find the location of the certificates used in the run command (`"Cmd"`), as well as the host path of the mounts.

The three flags in the command to look for are:

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. Using the mount information available in the `$ docker inspect etcd` output, set `volumes` and `volumeMounts` in the Datadog Agent configuration. Also include tolerations so that the Datadog Agent can run on the control plane nodes.

The following are examples of how to configure the Datadog Agent with Helm and the Datadog Operator:


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


3. Set up a DaemonSet with a pause container to run the Etcd check on the nodes running Etcd. This DaemonSet runs on the host network so that it can access the Etcd service. It also has the check configuration and the tolerations needed to run on the control plane node(s). Make sure that the mounted certificate file paths match what you set up on your instance, and replace the `<...>` portion accordingly.

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

To deploy the DaemonSet and the check configuration, run

```shell
kubectl apply -f <filename>
```


## Kubernetes on managed services (AKS, GKE) {#ManagedServices}

On other managed services, such as Azure Kubernetes Service (AKS) and Google Kubernetes Engine (GKE), the user cannot access the control plane components. As a result, it is not possible to run the `kube_apiserver`, `kube_controller_manager`, `kube_scheduler`, or `etcd` checks in these environments.


[1]: https://docs.datadoghq.com/integrations/kube_apiserver_metrics/
[2]: https://docs.datadoghq.com/integrations/etcd/?tab=containerized
[3]: https://docs.datadoghq.com/integrations/kube_controller_manager/
[4]: https://docs.datadoghq.com/integrations/kube_scheduler/
[5]: https://aws.github.io/aws-eks-best-practices/reliability/docs/controlplane/#monitor-control-plane-metrics
[6]: https://docs.datadoghq.com/agent/cluster_agent/setup
[7]: https://docs.datadoghq.com/agent/cluster_agent/clusterchecks/
[8]: https://docs.datadoghq.com/agent/cluster_agent/endpointschecks/
[9]: https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/manage-clusters/nodes-and-node-pools
[10]: https://github.com/DataDog/helm-charts/blob/main/examples/datadog/agent_on_rancher_values.yaml
[11]: https://docs.aws.amazon.com/eks/latest/userguide/view-raw-metrics.html
[12]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
